/**
 * Generate Jerusalem itinerary placeholder JPEGs.
 *
 * Phase 2 plan 04 — produces 1 hero image so the photo-credits Sharp
 * width gate passes and the itinerary route renderer can serve it.
 *
 * The placeholder is a solid color + SVG label overlay at >=1600px wide,
 * matching the plan-02-01 / plan-02-03 pattern. Credit ledger entry in
 * `data/photo-credits.json` references a REAL Wikimedia Commons URL;
 * when the binary is downloaded for production (M3 image-replace pass),
 * dimensions remain compatible.
 *
 * Run via: node public/images/itineraries/jerusalem/generate-images.mjs
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

console.log('Generating Jerusalem itinerary placeholder images...');

// 1 hero, 1920x1080 (matches plan-02-01 hero dimensions for canonical-tier
// pages — itineraries lean closer to canonical than sub-dest in visual weight).
await makeImage(
  '3-days-in-jerusalem.jpg',
  1920,
  1080,
  { r: 215, g: 188, b: 138 },
  '3 Days in Jerusalem (Wikimedia placeholder)',
);

console.log('Done.');
