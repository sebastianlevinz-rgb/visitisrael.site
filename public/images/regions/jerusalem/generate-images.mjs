/**
 * Generate Jerusalem region placeholder JPEGs.
 *
 * Phase 2 plan 01 Wave 0 — produces 6 baseline images so the photo-credits
 * Sharp width gate passes and the route renderer can serve them via next/image.
 *
 * Each placeholder is a solid color at the documented dimensions, ≥1200px wide
 * (hero ≥1600px). Credit ledger entries in `data/photo-credits.json` reference
 * REAL Wikimedia Commons / IGPO source URLs — when those images are downloaded
 * for production (M3 image-replace pass), file dimensions remain compatible.
 *
 * Restricted-site images (Western Wall, Holy Sepulchre) DO carry
 * restrictedSiteAcknowledgment per IMG-05; the placeholder content is
 * not the actual visual, but the ledger metadata stands.
 *
 * Run via: node public/images/regions/jerusalem/generate-images.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

async function makeImage(filename, width, height, background, label) {
  const outPath = join(HERE, filename);
  // SVG label overlay so each generated placeholder is visually distinct
  // when inspecting the dashboard during development.
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

console.log('Generating Jerusalem placeholder images...');
// Hero: ≥1600px width per IMG-04 contract
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 200, g: 168, b: 110 },
  'Jerusalem Old City rooftops (hero placeholder)',
);
// Inline images: ≥1200px width per IMG-02 Sharp gate
await makeImage(
  'old-city.jpg',
  1600,
  1067,
  { r: 192, g: 168, b: 132 },
  'Old City panorama',
);
await makeImage(
  'western-wall.jpg',
  1600,
  1067,
  { r: 218, g: 196, b: 160 },
  'Western Wall plaza',
);
await makeImage(
  'holy-sepulchre.jpg',
  1600,
  1067,
  { r: 170, g: 144, b: 116 },
  'Church of the Holy Sepulchre',
);
await makeImage(
  'mahane-yehuda.jpg',
  1600,
  1067,
  { r: 196, g: 144, b: 92 },
  'Mahane Yehuda Market',
);
await makeImage(
  'yad-vashem.jpg',
  1600,
  1067,
  { r: 150, g: 158, b: 144 },
  'Yad Vashem entrance',
);
console.log('Done.');
