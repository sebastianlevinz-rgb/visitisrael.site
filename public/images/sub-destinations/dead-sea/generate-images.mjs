/**
 * Generate Dead Sea sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 02 Task 3 — produces 5 hero images so the photo-credits Sharp
 * width gate passes and the sub-destination route renderer can serve them.
 *
 * Each placeholder is 1600x1067 (sub-dest hero >=1200px per IMG-04).
 * Credit ledger entries reference REAL Wikimedia URLs.
 *
 * Dead Sea sub-dests:
 *   - dead-sea-masada (UNESCO archaeological — Place schema)
 *   - dead-sea-ein-gedi (nature reserve)
 *   - dead-sea-qumran (Dead Sea Scrolls — Place schema)
 *   - dead-sea-mineral-beach (public beach access)
 *   - dead-sea-ein-bokek (hotel-resort strip)
 *
 * NO restricted-site subjects (Masada + Qumran are archaeological, NOT
 * religious buildings — Place schema, no Western-Wall-style permit caveat).
 *
 * Run via: node public/images/sub-destinations/dead-sea/generate-images.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

async function makeImage(filename, width, height, background, label) {
  const outPath = join(HERE, filename);
  const labelSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.25)" />
      <text x="50%" y="50%" font-family="sans-serif" font-size="${Math.floor(width / 18)}" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${label}</text>
    </svg>`,
  );
  await sharp({
    create: { width, height, channels: 3, background },
  })
    .composite([{ input: labelSvg, top: 0, left: 0 }])
    .jpeg({ quality: 78 })
    .toFile(outPath);
  const meta = await sharp(outPath).metadata();
  console.log(`  -> ${filename}: ${meta.width}x${meta.height}`);
}

console.log('Generating Dead Sea sub-destination placeholder images...');

await makeImage(
  'masada.jpg',
  1600,
  1067,
  { r: 196, g: 158, b: 112 },
  'Masada — UNESCO Roman-era fortress',
);
await makeImage(
  'ein-gedi.jpg',
  1600,
  1067,
  { r: 124, g: 156, b: 96 },
  'Ein Gedi Nature Reserve waterfall',
);
await makeImage(
  'qumran.jpg',
  1600,
  1067,
  { r: 188, g: 152, b: 108 },
  'Qumran caves + Dead Sea Scrolls site',
);
await makeImage(
  'mineral-beach.jpg',
  1600,
  1067,
  { r: 168, g: 200, b: 208 },
  'Dead Sea mineral beach + floating',
);
await makeImage(
  'ein-bokek.jpg',
  1600,
  1067,
  { r: 156, g: 188, b: 200 },
  'Ein Bokek hotel-resort strip',
);

console.log('Done.');
