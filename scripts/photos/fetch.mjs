/**
 * fetch.mjs — download the curated photos in scripts/photos/manifest.json and
 * write the ONLY photo ledger, data/photo-credits.json.
 *
 *   node scripts/photos/fetch.mjs              # idempotent: skips what is already in place
 *   node scripts/photos/fetch.mjs --force      # re-download everything
 *   node scripts/photos/fetch.mjs --only haifa # only paths containing "haifa"
 *   node scripts/photos/fetch.mjs --dry-run    # resolve + verify, download nothing
 *   node scripts/photos/fetch.mjs --sync       # also write API author/authorUrl/sourceUrl back into the manifest
 *
 * Per entry: resolve the photo at its source (Pexels /photos/:id, Unsplash
 * /photos/:id + /download registration, Commons imageinfo+extmetadata), verify the
 * licence is one of the closed list and matches the manifest, verify the original
 * is landscape and ≥ MIN_SOURCE_WIDTH px wide, download the original into memory,
 * resize to `outputWidth` (default 1600) JPEG q82 with sharp, save to public/<path>.
 *
 * Idempotence: an entry is skipped when the destination file exists AND the ledger
 * already holds the same source+sourceId for that path. Ledger entries whose path
 * is no longer in the manifest are dropped (the manifest is the source of truth).
 * Originals are never stored on disk; only the 1600 px JPEG is committed.
 *
 * Rate limits live in sources.mjs (Pexels 200 req/h, Unsplash 50 req/h, Commons
 * ~1 req/s). API keys are read by env.mjs and never printed.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { SOURCES, ALLOWED_LICENSES, sleep } from './sources.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const MANIFEST_PATH = resolve(ROOT, 'scripts/photos/manifest.json');
export const LEDGER_PATH = resolve(ROOT, 'data/photo-credits.json');
const PUBLIC = resolve(ROOT, 'public');
const MIN_SOURCE_WIDTH = 2500;
const UA = 'VisitIsraelPhotoPipeline/2.0 (https://visitisrael.site; contact@visitisrael.site)';

const args = process.argv.slice(2);
const force = args.includes('--force');
const dryRun = args.includes('--dry-run');
const sync = args.includes('--sync');
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

const readJson = (p, fallback) => {
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return fallback;
  }
};

/** Attribution is a licence condition for CC BY / CC BY-SA; we credit everything anyway. */
const attributionRequired = (license) => /^CC BY/.test(license);

async function download(url) {
  await sleep(1000);
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`descarga HTTP ${res.status}: ${url.slice(0, 120)}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const manifest = readJson(MANIFEST_PATH, null);
  if (!manifest?.images?.length) throw new Error(`manifest vacío o ilegible: ${MANIFEST_PATH}`);
  const outputWidth = manifest.outputWidth ?? 1600;
  const quality = manifest.quality ?? 82;
  const oldLedger = readJson(LEDGER_PATH, {});
  const ledger = {};
  const stats = { verified: 0, downloaded: 0, skipped: 0, bySource: {} };
  const problems = [];

  for (const entry of manifest.images) {
    const { path, source, sourceId } = entry;
    if (!path?.startsWith('/images/') || !SOURCES[source] || !sourceId) {
      problems.push(`${path}: entrada incompleta (path/source/sourceId)`);
      continue;
    }
    if (only && !path.includes(only)) {
      if (oldLedger[path]) ledger[path] = oldLedger[path];
      continue;
    }
    const dest = resolve(PUBLIC, `.${path}`);
    const prev = oldLedger[path];
    stats.bySource[source] = (stats.bySource[source] ?? 0) + 1;

    if (!force && existsSync(dest) && prev && prev.source === source && prev.sourceId === sourceId) {
      ledger[path] = { ...prev, alt: entry.alt ?? prev.alt, usedBy: entry.usedBy ?? prev.usedBy, note: entry.note ?? prev.note };
      stats.skipped++;
      stats.verified++;
      console.log(`= ${path} (ya está: ${source} ${sourceId})`);
      continue;
    }

    let c;
    try {
      c = await SOURCES[source].resolve(sourceId);
    } catch (e) {
      problems.push(`${path}: ${e.message}`);
      continue;
    }
    // Licence: closed list, and it must be what the curator verified.
    if (!ALLOWED_LICENSES.has(c.license) || c.licenseOk === false) {
      problems.push(`${path}: licencia no permitida en la fuente: "${c.license}"`);
      continue;
    }
    if (entry.license && entry.license !== c.license) {
      problems.push(`${path}: el manifiesto dice "${entry.license}" pero la fuente dice "${c.license}"`);
      continue;
    }
    if (c.premium) {
      problems.push(`${path}: es Unsplash+ (premium), no vale la Unsplash License`);
      continue;
    }
    if (!c.width || c.width < MIN_SOURCE_WIDTH) {
      problems.push(`${path}: original de ${c.width}px de ancho (< ${MIN_SOURCE_WIDTH})`);
      continue;
    }
    if (c.height > c.width && !entry.allowPortrait) {
      problems.push(`${path}: original vertical ${c.width}x${c.height} (poné allowPortrait:true si es a propósito)`);
      continue;
    }
    if (entry.author && entry.author !== c.author) {
      console.warn(`  aviso ${path}: autor en manifiesto "${entry.author}" ≠ fuente "${c.author}" (se usa la fuente)`);
    }
    if (sync) {
      entry.author = c.author;
      entry.authorUrl = c.authorUrl;
      entry.sourceUrl = c.sourceUrl;
      entry.license = c.license;
      entry.licenseUrl = c.licenseUrl;
    }

    const record = {
      path,
      source,
      sourceId: c.sourceId,
      sourceUrl: c.sourceUrl,
      title: c.title,
      author: c.author,
      authorUrl: c.authorUrl,
      license: c.license,
      licenseUrl: c.licenseUrl,
      attributionRequired: attributionRequired(c.license),
      alt: entry.alt ?? '',
      usedBy: entry.usedBy ?? [],
      origWidth: c.width,
      origHeight: c.height,
      width: prev?.width,
      height: prev?.height,
      bytes: prev?.bytes,
      modified: true,
      downloadedAt: prev?.downloadedAt,
      ...(entry.note ? { note: entry.note } : {}),
    };

    if (dryRun) {
      console.log(`? ${path} ← ${source} ${c.sourceId} · ${c.author} · ${c.license} · ${c.width}x${c.height}`);
      ledger[path] = record;
      stats.verified++;
      continue;
    }

    try {
      if (source === 'unsplash' && c.downloadLocation) await SOURCES.unsplash.registerDownload(c.downloadLocation);
      const original = await download(c.downloadUrl);
      mkdirSync(dirname(dest), { recursive: true });
      const info = await sharp(original)
        .rotate()
        .resize({ width: outputWidth, withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true })
        .toFile(dest);
      record.width = info.width;
      record.height = info.height;
      record.bytes = info.size;
      record.downloadedAt = new Date().toISOString();
      ledger[path] = record;
      stats.downloaded++;
      stats.verified++;
      console.log(`↓ ${path} ← ${source} ${c.sourceId} · ${c.author} · ${c.license} · ${c.width}x${c.height} → ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
    } catch (e) {
      problems.push(`${path}: ${e.message}`);
    }
  }

  if (!dryRun) {
    const sorted = Object.fromEntries(Object.entries(ledger).sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(LEDGER_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
    if (sync) writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  const src = Object.entries(stats.bySource)
    .map(([k, v]) => `${k} ${v}`)
    .join(', ');
  console.log(`\n${stats.verified} verificadas (${src}) · ${stats.downloaded} descargadas · ${stats.skipped} ya estaban · ledger: ${Object.keys(ledger).length} entradas`);
  if (problems.length) {
    console.error(`\n${problems.length} problema(s):`);
    for (const p of problems) console.error(`  · ${p}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
