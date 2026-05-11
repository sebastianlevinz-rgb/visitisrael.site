/**
 * Generate Golan Heights region placeholder JPEGs.
 *
 * Phase 3 plan 08 (Wave 4) — Golan Heights is the volcanic plateau in northern
 * Israel: nature (Mount Hermon ski, Banias spring + waterfall, Nimrod Fortress
 * Crusader/Mamluk castle, Mount Bental volcanic crater + 1973 Yom Kippur
 * battlefield viewpoint) plus Druze cultural villages (Majdal Shams, Mas'ade,
 * Buq'ata, Ein Qiniyye).
 *
 * Per PITFALLS §4.11 + CONTEXT.md image strategy:
 *   - Wikimedia 45-55% HIGH gap; Mount Hermon ski + Banias waterfall well-covered;
 *     Druze villages thinner (filter respectfully — village rooftops, market scenes,
 *     never private religious gatherings).
 *   - **CRITICAL FILTER:** exclude ANY image with military installations, soldiers,
 *     IDF tanks, or border-zone fortifications. Mount Bental viewpoint OK because
 *     it is a tourism viewpoint over the Quneitra valley; not a military site.
 *   - NO restricted-site subjects — Druze religious tradition is private; we do
 *     NOT photograph khalwat (sacred sites) or Druze religious figures.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 / Phase 3.1 Tel Aviv pattern + Phase 3.4
 * Eilat pattern. Credit ledger entries reference REAL Wikimedia Commons URLs;
 * binaries swap in the M6 image-replace pass.
 *
 * Run via: node public/images/regions/golan/generate-images.mjs
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

console.log('Generating Golan Heights region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04). Banias waterfall (Golan signature subject).
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 38, g: 92, b: 68 },
  'Golan Heights — Banias waterfall (placeholder)',
);

// 4 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'mount-bental.jpg',
  1600,
  1067,
  { r: 96, g: 110, b: 92 },
  'Mount Bental volcanic crater + viewpoint',
);
await makeImage(
  'banias.jpg',
  1600,
  1067,
  { r: 48, g: 122, b: 96 },
  'Banias spring + waterfall (Caesarea Philippi)',
);
await makeImage(
  'nimrod-fortress.jpg',
  1600,
  1067,
  { r: 130, g: 116, b: 88 },
  'Nimrod Fortress (Crusader / Mamluk 13c)',
);
await makeImage(
  'druze-villages.jpg',
  1600,
  1067,
  { r: 174, g: 158, b: 120 },
  'Majdal Shams Druze village rooftops',
);

console.log('Done.');
