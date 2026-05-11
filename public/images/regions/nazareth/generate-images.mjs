/**
 * Generate Nazareth region placeholder JPEGs.
 *
 * Phase 3 plan 06 Task 1 — produces 4 hero/inline images so the photo-credits
 * Sharp width gate passes and the region route renderer can serve them.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 Jerusalem + Phase 3.1 Tel Aviv +
 * Phase 3.3 Galilee pattern. Credit ledger entries reference REAL
 * Wikimedia Commons URLs; when those binaries are downloaded for production
 * (M6 image-replace pass), dimensions remain compatible.
 *
 * Nazareth subject mix: largest Arab city in Israel + Christian pilgrimage
 * (Basilica of the Annunciation, Greek Orthodox Church of the Annunciation,
 * Old City + souq, Mount of Precipice panorama). Wikimedia coverage is good
 * (Basilica and Old City both well-photographed at CC-BY-SA-3.0/4.0).
 *
 * Run via: node public/images/regions/nazareth/generate-images.mjs
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

console.log('Generating Nazareth region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04).
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 188, g: 156, b: 108 },
  'Nazareth Old City rooftops (placeholder)',
);

// 3 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'basilica.jpg',
  1600,
  1067,
  { r: 168, g: 144, b: 100 },
  'Basilica of the Annunciation facade',
);
await makeImage(
  'old-city.jpg',
  1600,
  1067,
  { r: 200, g: 172, b: 124 },
  'Nazareth Old City souq',
);
await makeImage(
  'mount-of-precipice.jpg',
  1600,
  1067,
  { r: 140, g: 168, b: 124 },
  'Mount of Precipice panorama over Jezreel Valley',
);

console.log('Done.');
