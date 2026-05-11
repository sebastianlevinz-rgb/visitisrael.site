/**
 * Generate Jerusalem sub-destination placeholder JPEGs.
 *
 * Phase 2 plan 03 — produces 7 hero images so the photo-credits Sharp
 * width gate passes and the sub-destination route renderer can serve them.
 *
 * Each placeholder is a solid color + SVG label overlay at >=1600px wide,
 * matching the plan-02-01 pattern. Credit ledger entries in
 * `data/photo-credits.json` reference REAL Wikimedia Commons / IGPO URLs;
 * when those binaries are downloaded for production (M3 image-replace pass),
 * dimensions remain compatible.
 *
 * Restricted-site images (Western Wall, Holy Sepulchre) carry
 * `restrictedSiteAcknowledgment` per IMG-05 / IMG-06.
 *
 * Run via: node public/images/sub-destinations/jerusalem/generate-images.mjs
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

console.log('Generating Jerusalem sub-destination placeholder images...');

// 7 sub-destinations, each 1600x1067 (sub-dest hero ≥1200px per IMG-04).
await makeImage(
  'old-city.jpg',
  1600,
  1067,
  { r: 188, g: 162, b: 124 },
  'Jerusalem Old City — four quarters (placeholder)',
);
await makeImage(
  'western-wall.jpg',
  1600,
  1067,
  { r: 216, g: 198, b: 162 },
  'Western Wall (Kotel) plaza',
);
await makeImage(
  'holy-sepulchre.jpg',
  1600,
  1067,
  { r: 168, g: 142, b: 114 },
  'Church of the Holy Sepulchre',
);
await makeImage(
  'yad-vashem.jpg',
  1600,
  1067,
  { r: 148, g: 156, b: 142 },
  'Yad Vashem Holocaust Remembrance',
);
await makeImage(
  'mahane-yehuda.jpg',
  1600,
  1067,
  { r: 196, g: 142, b: 90 },
  'Mahane Yehuda Market (shuk)',
);
await makeImage(
  'mount-of-olives.jpg',
  1600,
  1067,
  { r: 156, g: 174, b: 130 },
  'Mount of Olives — Jerusalem panorama',
);
await makeImage(
  'city-of-david.jpg',
  1600,
  1067,
  { r: 174, g: 148, b: 112 },
  'City of David — Silwan archaeological park',
);
console.log('Done.');
