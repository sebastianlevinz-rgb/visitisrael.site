import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import {
  buildReport,
  imageRefsInHtml,
  imageRefsInSource,
  ledgerKey,
  listPublicImages,
  scanDist,
  FORBIDDEN_LICENSE,
} from '../photo-guard.mjs';

let root;
let publicDir;
const img = (rel) => join(publicDir, 'images', rel);

const entry = (path, extra = {}) => ({
  path,
  source: 'pexels',
  sourceId: '1',
  sourceUrl: 'https://www.pexels.com/photo/1/',
  author: 'Someone',
  authorUrl: 'https://www.pexels.com/@someone',
  license: 'Pexels License',
  licenseUrl: 'https://www.pexels.com/license/',
  ...extra,
});

before(async () => {
  root = mkdtempSync(join(tmpdir(), 'photo-guard-'));
  publicDir = join(root, 'public');
  mkdirSync(join(publicDir, 'images', 'regions', 'x'), { recursive: true });
  // A "real" photo: 1600 px of gaussian noise compresses to well over 60 KB.
  await sharp({ create: { width: 1600, height: 1000, channels: 3, noise: { type: 'gaussian', mean: 128, sigma: 60 } } })
    .jpeg({ quality: 82 })
    .toFile(img('regions/x/real.jpg'));
  // The old beige placeholder: flat colour at 1600 px is ~20 KB.
  await sharp({ create: { width: 1600, height: 1067, channels: 3, background: '#e8dcc8' } })
    .jpeg({ quality: 82 })
    .toFile(img('regions/x/placeholder.jpg'));
  // Too narrow, even if heavy enough.
  await sharp({ create: { width: 800, height: 500, channels: 3, noise: { type: 'gaussian', mean: 128, sigma: 60 } } })
    .jpeg({ quality: 100 })
    .toFile(img('regions/x/narrow.jpg'));
});

after(() => rmSync(root, { recursive: true, force: true }));

test('ledgerKey maps every served variant back to the .jpg', () => {
  assert.equal(ledgerKey('/images/regions/x/real-400w.avif'), '/images/regions/x/real.jpg');
  assert.equal(ledgerKey('/images/regions/x/real-800w.webp'), '/images/regions/x/real.jpg');
  assert.equal(ledgerKey('/images/regions/x/real.webp'), '/images/regions/x/real.jpg');
  assert.equal(ledgerKey('/images/regions/x/real.jpeg?v=2'), '/images/regions/x/real.jpg');
  assert.equal(ledgerKey('/images/regions/x/real.jpg'), '/images/regions/x/real.jpg');
});

test('imageRefsInHtml reads src, srcset, og:image content and hrefs', () => {
  const html = `
    <meta property="og:image" content="https://visitisrael.site/images/regions/x/real.jpg">
    <source srcset="/images/regions/x/real-400w.avif 400w, /images/regions/x/real-800w.avif 800w" type="image/avif">
    <img src="/images/regions/x/real.jpg" alt="">
    <a href="/images/regions/x/other.jpg">x</a>
    <img src="/favicon.svg"><img src="https://upload.wikimedia.org/x.jpg">`;
  const refs = imageRefsInHtml(html);
  assert.deepEqual(
    [...refs].sort(),
    ['/images/regions/x/other.jpg', '/images/regions/x/real-400w.avif', '/images/regions/x/real-800w.avif', '/images/regions/x/real.jpg']
  );
});

test('imageRefsInSource finds paths in markdown, ts and astro', () => {
  const src = join(root, 'src');
  mkdirSync(join(src, 'content'), { recursive: true });
  writeFileSync(join(src, 'content', 'a.md'), 'heroImage: /images/regions/x/real.jpg\n');
  writeFileSync(join(src, 'data.ts'), "export const t = { image: '/images/regions/x/other.jpg' };\n");
  writeFileSync(join(src, 'page.astro'), '<Hero image="/images/regions/x/real.jpg" />\n');
  assert.deepEqual([...imageRefsInSource(src)].sort(), ['/images/regions/x/other.jpg', '/images/regions/x/real.jpg']);
});

test('a real, ledgered, referenced photo passes', async () => {
  const ledger = { '/images/regions/x/real.jpg': entry('/images/regions/x/real.jpg') };
  const report = await buildReport({
    refs: ['/images/regions/x/real.jpg', '/images/regions/x/real-400w.webp'],
    ledger,
    publicDir,
    publicImages: ['/images/regions/x/real.jpg'],
  });
  assert.deepEqual(report.errors, []);
  assert.equal(report.ok, true);
  assert.equal(report.verified, 1);
});

test('a referenced image missing from the ledger fails', async () => {
  const report = await buildReport({ refs: ['/images/regions/x/unknown.jpg'], ledger: {}, publicDir, publicImages: [] });
  assert.equal(report.ok, false);
  assert.match(report.errors[0], /referencia sin crédito/);
});

test('empty, AI, generated and IGPO-CC licences fail', async () => {
  for (const license of ['', 'AI-generated', 'Generated with Higgsfield', 'IGPO-CC', 'GFDL 1.2']) {
    const ledger = { '/images/regions/x/real.jpg': entry('/images/regions/x/real.jpg', { license }) };
    const report = await buildReport({ refs: [], ledger, publicDir, publicImages: ['/images/regions/x/real.jpg'] });
    assert.equal(report.ok, false, `license "${license}" should fail`);
  }
  assert.equal(FORBIDDEN_LICENSE.test('CC BY-SA 4.0'), false);
  assert.equal(FORBIDDEN_LICENSE.test('Pexels License'), false);
});

test('a placeholder-sized JPEG fails on weight and a narrow one on width', async () => {
  const ledger = {
    '/images/regions/x/placeholder.jpg': entry('/images/regions/x/placeholder.jpg'),
    '/images/regions/x/narrow.jpg': entry('/images/regions/x/narrow.jpg'),
  };
  const report = await buildReport({
    refs: [],
    ledger,
    publicDir,
    publicImages: ['/images/regions/x/placeholder.jpg', '/images/regions/x/narrow.jpg'],
  });
  assert.equal(report.ok, false);
  assert.ok(report.errors.some((e) => /placeholder\.jpg: pesa/.test(e)), report.errors.join('\n'));
  assert.ok(report.errors.some((e) => /narrow\.jpg: mide 800 px/.test(e)), report.errors.join('\n'));
});

test('a ledger entry whose file is missing fails', async () => {
  const ledger = { '/images/regions/x/gone.jpg': entry('/images/regions/x/gone.jpg') };
  const report = await buildReport({ refs: [], ledger, publicDir, publicImages: [] });
  assert.equal(report.ok, false);
  assert.match(report.errors[0], /no existe/);
});

test('orphan files and stale variants under public/images fail', async () => {
  const ledger = { '/images/regions/x/real.jpg': entry('/images/regions/x/real.jpg') };
  const report = await buildReport({
    refs: [],
    ledger,
    publicDir,
    publicImages: ['/images/regions/x/real.jpg', '/images/regions/x/real.avif', '/images/regions/x/placeholder.jpg', '/images/regions/x/old-800w.webp'],
  });
  assert.equal(report.ok, false);
  assert.equal(report.orphans, 2);
  assert.ok(report.errors.some((e) => e.includes('huérfano en public/images/regions/x/placeholder.jpg')));
  assert.ok(report.errors.some((e) => e.includes('huérfano en public/images/regions/x/old-800w.webp')));
});

test('listPublicImages returns site paths for every image file', () => {
  const list = listPublicImages(join(publicDir, 'images')).sort();
  assert.deepEqual(list, ['/images/regions/x/narrow.jpg', '/images/regions/x/placeholder.jpg', '/images/regions/x/real.jpg']);
});

test('scanDist reads the HTML people receive', async () => {
  const dist = join(root, 'dist');
  mkdirSync(join(dist, 'jerusalem'), { recursive: true });
  writeFileSync(join(dist, 'jerusalem', 'index.html'), '<img src="/images/regions/x/real.jpg"><img src="/images/regions/x/nope.jpg">');
  const ledger = { '/images/regions/x/real.jpg': entry('/images/regions/x/real.jpg') };
  const report = await scanDist(dist, { publicDir, ledger });
  assert.equal(report.pages, 1);
  assert.equal(report.refs, 2);
  assert.ok(report.errors.some((e) => e.includes('nope.jpg')));
  // placeholder.jpg and narrow.jpg are on disk but not in the ledger → orphans.
  assert.equal(report.orphans, 2);
});
