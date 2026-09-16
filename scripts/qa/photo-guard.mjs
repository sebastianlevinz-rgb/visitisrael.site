/**
 * Photo guard — every image the site serves must be a real, licensed, credited
 * photo. Companion of affiliate-guard.mjs: it reads what ships (dist/ HTML and
 * public/images), not what the code says.
 *
 * It FAILS when:
 *   - an image referenced from the HTML (src/srcset/href/content) or from the
 *     source tree (--src) is not in the ledger data/photo-credits.json;
 *   - a ledger entry has no licence, a licence outside the closed list, or one
 *     that smells of AI / "generated" / the invented "IGPO-CC";
 *   - a ledger JPEG is missing, weighs < 60 KB or is < 1200 px wide (the beige
 *     placeholders were 17–28 KB at 1600 px; real photos at q82 are 150–400 KB);
 *   - a file under public/images (JPEG/PNG or an AVIF/WebP/-400w/-800w variant)
 *     has no ledger entry — an orphan: delete it or add it to the manifest.
 *
 * Usage:
 *   node scripts/qa/photo-guard.mjs            # dist/ if it exists, plus src/
 *   node scripts/qa/photo-guard.mjs --src      # source references only (pnpm check)
 *   node scripts/qa/photo-guard.mjs --dist out # a specific build directory
 *
 * Also runs inside the Astro build via the integration in astro.config.mjs.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const MIN_BYTES = 60 * 1024;
export const MIN_WIDTH = 1200;
/** Closed licence list — mirrors scripts/photos/sources.mjs LICENSES. */
export const ALLOWED_LICENSES = new Set([
  'Pexels License',
  'Unsplash License',
  'CC BY 4.0',
  'CC BY 3.0',
  'CC BY 2.0',
  'CC BY-SA 4.0',
  'CC BY-SA 3.0',
  'CC BY-SA 2.0',
  'CC0',
]);
/** Anything that looks like the old ledger's fake values. */
export const FORBIDDEN_LICENSE = /\bai\b|generated|igpo/i;

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/** Map any served variant back to its ledger key: -400w.avif, .webp, .jpeg → .jpg */
export function ledgerKey(path) {
  return path
    .split('?')[0]
    .split('#')[0]
    .replace(/-(400|800)w(?=\.[a-z]+$)/i, '')
    .replace(/\.(avif|webp|jpeg)$/i, '.jpg');
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#38;/g, '&').replace(/&quot;/g, '"').replace(/&#x2F;/gi, '/');

/** Image paths (/images/…) referenced by one HTML document. */
export function imageRefsInHtml(html) {
  const refs = new Set();
  const attr = /\b(?:src|srcset|href|content|data-src)\s*=\s*"([^"]*)"/gi;
  let m;
  while ((m = attr.exec(html))) {
    for (const piece of decode(m[1]).split(',')) {
      const url = piece.trim().split(/\s+/)[0];
      const path = url.replace(/^https?:\/\/[^/]+/i, '');
      if (path.startsWith('/images/') && IMAGE_EXT.test(path.split('?')[0])) refs.add(path.split('?')[0]);
    }
  }
  return refs;
}

/** Image paths referenced anywhere in the source tree (content, data, pages, components). */
export function imageRefsInSource(srcDir) {
  const refs = new Set();
  const re = /\/images\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp|avif)/g;
  for (const file of walk(srcDir, /\.(md|mdx|ts|astro|json)$/i)) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(re)) refs.add(m[0]);
  }
  return refs;
}

/** Recursively list files under dir matching `filter`. */
export function walk(dir, filter = /./, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, filter, out);
    else if (filter.test(name)) out.push(p);
  }
  return out;
}

/** Site paths (/images/…) of every image file under public/images. */
export function listPublicImages(publicImagesDir) {
  return walk(publicImagesDir, IMAGE_EXT).map((f) => '/images/' + f.slice(publicImagesDir.length).replace(/\\/g, '/').replace(/^\/+/, ''));
}

/** Default probe: size + width via sharp. Injectable for tests. */
export async function probeImage(file) {
  const bytes = statSync(file).size;
  const { width } = await sharp(file).metadata();
  return { bytes, width: width ?? 0 };
}

/**
 * Build the guard report.
 * @param {{ refs: Iterable<string>, ledger: Record<string, any>, publicDir: string, publicImages?: string[], probe?: typeof probeImage, pages?: number }} input
 */
export async function buildReport({ refs, ledger, publicDir, publicImages, probe = probeImage, pages = 0 }) {
  const errors = [];
  const keys = new Set(Object.keys(ledger));
  const publicImagesDir = join(publicDir, 'images');
  const served = publicImages ?? listPublicImages(publicImagesDir);

  // 1. Ledger integrity + the files it points at.
  let verified = 0;
  for (const [key, entry] of Object.entries(ledger)) {
    const where = `ledger ${key}`;
    if (!key.startsWith('/images/')) errors.push(`${where}: la clave no es una ruta /images/…`);
    if (entry.path && entry.path !== key) errors.push(`${where}: path "${entry.path}" no coincide con la clave`);
    const license = String(entry.license ?? '').trim();
    if (!license) errors.push(`${where}: licencia vacía`);
    else if (FORBIDDEN_LICENSE.test(license)) errors.push(`${where}: licencia prohibida "${license}" (IA / inventada)`);
    else if (!ALLOWED_LICENSES.has(license)) errors.push(`${where}: licencia fuera de la lista cerrada: "${license}"`);
    if (!String(entry.author ?? '').trim()) errors.push(`${where}: sin autor`);
    if (!String(entry.sourceUrl ?? '').trim()) errors.push(`${where}: sin sourceUrl`);
    if (!String(entry.licenseUrl ?? '').trim()) errors.push(`${where}: sin licenseUrl`);
    const file = join(publicDir, key);
    if (!existsSync(file)) {
      errors.push(`${where}: el archivo public${key} no existe`);
      continue;
    }
    if (/\.jpe?g$/i.test(key)) {
      const { bytes, width } = await probe(file);
      if (bytes < MIN_BYTES) errors.push(`${where}: pesa ${(bytes / 1024).toFixed(0)} KB (< ${MIN_BYTES / 1024} KB: placeholder)`);
      if (width < MIN_WIDTH) errors.push(`${where}: mide ${width} px de ancho (< ${MIN_WIDTH})`);
    }
    verified++;
  }

  // 2. Every referenced image resolves to a ledger entry.
  const refList = [...new Set(refs)].sort();
  for (const ref of refList) {
    if (!keys.has(ledgerKey(ref))) errors.push(`referencia sin crédito: ${ref}`);
  }

  // 3. No orphans in public/images (including stale variants).
  const orphans = served.filter((p) => !keys.has(ledgerKey(p))).sort();
  for (const o of orphans) errors.push(`huérfano en public${o}: no está en el ledger (borrarlo o agregarlo al manifiesto)`);

  return {
    pages,
    refs: refList.length,
    ledger: keys.size,
    files: served.length,
    verified,
    orphans: orphans.length,
    errors,
    ok: errors.length === 0,
  };
}

/** Human-readable summary lines for a report. */
export function formatReport(report) {
  const lines = [
    `PHOTO-GUARD — ${report.verified} imágenes verificadas en el ledger` +
      ` · ${report.refs} referencias en ${report.pages} páginas/archivos · ${report.files} archivos servidos` +
      ` · ${report.errors.length} fallas`,
  ];
  for (const e of report.errors.slice(0, 40)) lines.push(`FALLA: ${e}`);
  if (report.errors.length > 40) lines.push(`… y ${report.errors.length - 40} más`);
  return lines;
}

export function loadLedger(ledgerPath = resolve(ROOT, 'data/photo-credits.json')) {
  if (!existsSync(ledgerPath)) return {};
  return JSON.parse(readFileSync(ledgerPath, 'utf8'));
}

/** Scan a built dist directory (HTML refs) + public/images + ledger. */
export async function scanDist(distDir, { publicDir = resolve(ROOT, 'public'), ledger = loadLedger() } = {}) {
  const htmlFiles = walk(distDir, /\.html$/);
  const refs = new Set();
  for (const f of htmlFiles) for (const r of imageRefsInHtml(readFileSync(f, 'utf8'))) refs.add(r);
  return buildReport({ refs, ledger, publicDir, pages: htmlFiles.length });
}

/** Scan source references (no build needed) + public/images + ledger. */
export async function scanSource(srcDir = resolve(ROOT, 'src'), { publicDir = resolve(ROOT, 'public'), ledger = loadLedger() } = {}) {
  const refs = imageRefsInSource(srcDir);
  const files = walk(srcDir, /\.(md|mdx|ts|astro|json)$/i).length;
  return buildReport({ refs, ledger, publicDir, pages: files });
}

async function main() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const distDir = resolve(ROOT, get('--dist') ?? 'dist');
  const srcOnly = args.includes('--src');
  const reports = [];
  if (!srcOnly && existsSync(distDir)) reports.push(['dist', await scanDist(distDir)]);
  reports.push(['src', await scanSource()]);
  let ok = true;
  for (const [label, report] of reports) {
    for (const line of formatReport(report)) (report.ok ? console.log : console.error)(`[${label}] ${line}`);
    ok &&= report.ok;
  }
  process.exit(ok ? 0 : 1);
}

// Run only when executed directly (not when imported by astro.config.mjs).
const self = fileURLToPath(import.meta.url).toLowerCase();
if (process.argv[1] && resolve(process.argv[1]).toLowerCase() === self) main();
