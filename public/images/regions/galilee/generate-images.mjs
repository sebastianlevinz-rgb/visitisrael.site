/**
 * Generate Galilee region placeholder JPEGs.
 *
 * Phase 3 plan 03 — produces 5 hero/inline images so the photo-credits Sharp
 * width gate passes and the region route renderer can serve them.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 Jerusalem + Phase 3.1 Tel Aviv pattern.
 * Credit ledger entries reference REAL Wikimedia Commons URLs; when those
 * binaries are downloaded for production (M6 image-replace pass),
 * dimensions remain compatible.
 *
 * Galilee has NO restricted-set subjects (Capernaum, Mount of Beatitudes,
 * Tiberias all CC-BY-SA-friendly per PITFALLS §5 — pilgrimage tradition
 * keeps Christian sites well-covered).
 *
 * Run via: node public/images/regions/galilee/generate-images.mjs
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

console.log('Generating Galilee region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04).
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 92, g: 142, b: 188 },
  'Sea of Galilee from Mount Arbel (placeholder)',
);

// 4 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'sea-of-galilee.jpg',
  1600,
  1067,
  { r: 104, g: 156, b: 194 },
  'Sea of Galilee panorama',
);
await makeImage(
  'capernaum.jpg',
  1600,
  1067,
  { r: 198, g: 168, b: 124 },
  'Capernaum ancient synagogue ruins',
);
await makeImage(
  'mount-of-beatitudes.jpg',
  1600,
  1067,
  { r: 168, g: 192, b: 132 },
  'Mount of Beatitudes Catholic church',
);
await makeImage(
  'tiberias.jpg',
  1600,
  1067,
  { r: 120, g: 168, b: 200 },
  'Tiberias lakeside promenade',
);

console.log('Done.');
