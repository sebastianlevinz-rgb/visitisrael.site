/**
 * fetch-commons.mjs — source REAL, freely-licensed photography from Wikimedia
 * Commons for the Visit Israel rebuild.
 *
 * Why this exists: the legacy `data/photo-credits.json` ledger referenced
 * Commons file URLs that are mostly hallucinated (only ~1 in 4 resolve). The
 * on-disk images were solid-color Sharp placeholders. This script instead
 * SEARCHES Commons per subject, validates the file genuinely exists, filters
 * to free licenses + adequate resolution, downloads the real pixels at a
 * target width, and writes a verified attribution ledger.
 *
 * Usage:
 *   node scripts/photos/fetch-commons.mjs <manifest.json> [--out data/credits.generated.json]
 *
 * Manifest entry shape:
 *   { "outPath": "public/images/regions/jerusalem/hero.jpg",
 *     "query": "Jerusalem Old City aerial",
 *     "width": 1920,
 *     "note": "optional restricted-site acknowledgment / curation hint" }
 *
 * Re-runnable: skips an outPath that already holds a real (>80KB) JPEG unless
 * --force is passed.
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { argv } from 'node:process';
import sharp from 'sharp';

const API = 'https://commons.wikimedia.org/w/api.php';
const UA =
  'VisitIsraelBot/1.0 (https://visitisrael.site; contact@visitisrael.site) photo-curation';

const FREE_LICENSE = /(^cc[ -]?by)|(^cc0)|(public domain)|(^cc[ -]?by[ -]?sa)/i;
const MIN_SRC_WIDTH = 1000; // reject thumbnails / icons
const MIN_SRC_HEIGHT = 700; // reject panorama "banner" crops
const MAX_ASPECT = 2.1; // reject ultra-wide banners (w/h)
const MIN_ASPECT = 0.55; // reject very tall scans (w/h)

const args = argv.slice(2);
const manifestPath = args.find((a) => !a.startsWith('--'));
const outIdx = args.indexOf('--out');
const ledgerOut =
  outIdx !== -1 ? args[outIdx + 1] : 'data/photo-credits.generated.json';
const force = args.includes('--force');

if (!manifestPath) {
  console.error('Usage: node fetch-commons.mjs <manifest.json> [--out ledger.json] [--force]');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', ...params })}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`API ${res.status} for ${params.srsearch ?? params.titles}`);
  return res.json();
}

/** Strip HTML tags from Commons extmetadata Artist field. */
function clean(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Search Commons for candidate files, return the best free, high-res match. */
async function findImage(query, width) {
  const search = await api({
    action: 'query',
    list: 'search',
    srsearch: `${query} filetype:bitmap`,
    srnamespace: '6',
    srlimit: '15',
  });
  const hits = search?.query?.search ?? [];
  if (hits.length === 0) return null;

  const titles = hits.map((h) => h.title).join('|');
  const info = await api({
    action: 'query',
    titles,
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: String(width),
  });
  const pages = Object.values(info?.query?.pages ?? {});

  // Preserve search-rank order (Object.values loses it), so re-sort by hit rank.
  const rank = new Map(hits.map((h, i) => [h.title, i]));
  pages.sort((a, b) => (rank.get(a.title) ?? 99) - (rank.get(b.title) ?? 99));

  for (const page of pages) {
    const ii = page?.imageinfo?.[0];
    if (!ii) continue;
    if (!/^image\/(jpeg|png)$/.test(ii.mime ?? '')) continue;
    if ((ii.width ?? 0) < MIN_SRC_WIDTH) continue;
    if ((ii.height ?? 0) < MIN_SRC_HEIGHT) continue;
    const aspect = (ii.width ?? 0) / (ii.height ?? 1);
    if (aspect > MAX_ASPECT || aspect < MIN_ASPECT) continue;
    if (/\bbanner\b/i.test(page.title)) continue; // Commons banner crops
    const meta = ii.extmetadata ?? {};
    const license = clean(meta.LicenseShortName?.value);
    if (!FREE_LICENSE.test(license)) continue;
    return {
      title: page.title,
      downloadUrl: ii.thumburl || ii.url, // thumburl = scaled to target width
      fullWidth: ii.width,
      fullHeight: ii.height,
      author: clean(meta.Artist?.value) || 'Unknown (Wikimedia Commons)',
      license,
      licenseUrl: clean(meta.LicenseUrl?.value) || '',
      descriptionUrl: ii.descriptionurl,
      mime: ii.mime,
    };
  }
  return null;
}

async function alreadyReal(outPath) {
  try {
    const s = await stat(outPath);
    return s.size > 80 * 1024; // >80KB ⇒ assume real photo, not placeholder
  } catch {
    return false;
  }
}

async function download(url, outPath, crop) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 20 * 1024) throw new Error(`too small (${buf.length}B) — likely error page`);
  const isJpeg = buf.slice(0, 3).toString('hex') === 'ffd8ff';
  const isPng = buf.slice(0, 8).toString('hex') === '89504e470d0a1a0a';
  if (!isJpeg && !isPng) throw new Error('not a JPEG/PNG (bad magic bytes)');
  await mkdir(dirname(outPath), { recursive: true });

  // Normalize every image to a consistent crop + strip EXIF + re-encode JPEG.
  // `cover` + `attention` keeps the salient subject when changing aspect ratio.
  let pipeline = sharp(buf).rotate(); // honor EXIF orientation, then strip it
  if (crop?.w && crop?.h) {
    pipeline = pipeline.resize(crop.w, crop.h, {
      fit: 'cover',
      position: sharp.strategy.attention,
    });
  }
  const out = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await writeFile(outPath, out);
  return out.length;
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const ledger = {};
const results = { ok: [], skip: [], fail: [] };

for (const entry of manifest) {
  const outPath = resolve(entry.outPath);
  const webPath = '/' + entry.outPath.replace(/^public\//, '');
  if (!force && (await alreadyReal(outPath))) {
    results.skip.push(entry.outPath);
    console.log(`SKIP  ${entry.outPath} (already real)`);
    continue;
  }
  try {
    const found = await findImage(entry.query, entry.width);
    if (!found) {
      results.fail.push({ path: entry.outPath, why: 'no free match' });
      console.log(`FAIL  ${entry.outPath} — no free match for "${entry.query}"`);
      continue;
    }
    const bytes = await download(found.downloadUrl, outPath, entry.crop);
    ledger[webPath] = {
      src: webPath,
      author: found.author,
      license: found.license,
      licenseProof: found.licenseUrl,
      sourceUrl: found.descriptionUrl,
      query: entry.query,
      ...(entry.note ? { restrictedSiteAcknowledgment: entry.note } : {}),
    };
    results.ok.push(entry.outPath);
    console.log(
      `OK    ${entry.outPath} ← ${found.title} [${found.license}] ${(bytes / 1024).toFixed(0)}KB`,
    );
  } catch (err) {
    results.fail.push({ path: entry.outPath, why: String(err.message ?? err) });
    console.log(`FAIL  ${entry.outPath} — ${err.message ?? err}`);
  }
  await sleep(350); // be polite to the Commons API
}

// Merge into any existing generated ledger so partial runs accumulate.
let existing = {};
try {
  existing = JSON.parse(await readFile(ledgerOut, 'utf8'));
} catch {
  /* first run */
}
await mkdir(dirname(resolve(ledgerOut)), { recursive: true });
await writeFile(ledgerOut, JSON.stringify({ ...existing, ...ledger }, null, 2) + '\n');

console.log(
  `\nDONE  ok=${results.ok.length} skip=${results.skip.length} fail=${results.fail.length}  → ledger: ${ledgerOut}`,
);
if (results.fail.length) {
  console.log('Failures:');
  for (const f of results.fail) console.log(`  - ${f.path}: ${f.why}`);
}
