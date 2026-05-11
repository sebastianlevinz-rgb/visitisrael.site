/**
 * Generate Dead Sea region placeholder JPEGs.
 *
 * Phase 3 plan 02 — produces 5 hero/inline images so the photo-credits Sharp
 * width gate passes and the region route renderer can serve them.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 / Phase 3.1 Tel Aviv pattern. Credit
 * ledger entries reference REAL Wikimedia Commons URLs; when those binaries
 * are downloaded for production (Phase 6 image-replace pass), dimensions
 * remain compatible.
 *
 * Dead Sea has NO restricted-site subjects (Dead Sea floating + salt
 * formations + Masada UNESCO archaeological + Ein Gedi nature reserve +
 * Qumran archaeological + Ein Bokek hotel strip all CC-BY-SA-friendly per
 * PITFALLS §5). Masada + Qumran are archaeological (Place schema), not
 * religious buildings.
 *
 * Run via: node public/images/regions/dead-sea/generate-images.mjs
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
  console.log(
    `  -> ${filename}: ${meta.width}x${meta.height} (${meta.size} bytes)`,
  );
}

console.log('Generating Dead Sea region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04).
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 178, g: 198, b: 192 },
  'Dead Sea salt formations + horizon (placeholder)',
);

// 4 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'masada.jpg',
  1600,
  1067,
  { r: 196, g: 158, b: 112 },
  'Masada plateau (UNESCO archaeological)',
);
await makeImage(
  'ein-gedi.jpg',
  1600,
  1067,
  { r: 124, g: 156, b: 96 },
  'Ein Gedi waterfall + canyon',
);
await makeImage(
  'qumran.jpg',
  1600,
  1067,
  { r: 188, g: 152, b: 108 },
  'Qumran caves — Dead Sea Scrolls',
);
await makeImage(
  'ein-bokek.jpg',
  1600,
  1067,
  { r: 156, g: 188, b: 200 },
  'Ein Bokek hotel resort strip',
);

console.log('Done.');
