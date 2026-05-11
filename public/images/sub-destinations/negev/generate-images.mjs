/**
 * Generate Negev Desert sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 05 Task 3 — produces 5 hero images so the photo-credits Sharp
 * width gate passes and the sub-destination route renderer can serve them.
 *
 * Each placeholder is 1600x1067 (sub-dest hero >=1200px per IMG-04).
 * Credit ledger entries reference REAL Wikimedia URLs.
 *
 * Negev sub-dests:
 *   - negev-mitzpe-ramon (Makhtesh Ramon — largest erosion crater)
 *   - negev-avdat (Nabataean UNESCO Spice Route — Place schema)
 *   - negev-sde-boker (Ben-Gurion's kibbutz + grave memorial)
 *   - negev-ein-avdat (canyon hike)
 *   - negev-bedouin-hospitality (FLAGGED — Phase 6 real-commission priority)
 *
 * NO restricted-site subjects (Avdat is archaeological NOT religious; Ben-
 * Gurion's grave is a national memorial NOT PlaceOfWorship; Bedouin
 * hospitality needs REAL photography commission for Phase 6 with consensual
 * portraiture + fair-wage community-partnership photographer).
 *
 * Run via: node public/images/sub-destinations/negev/generate-images.mjs
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

console.log('Generating Negev sub-destination placeholder images...');

await makeImage(
  'mitzpe-ramon.jpg',
  1600,
  1067,
  { r: 178, g: 138, b: 100 },
  'Mitzpe Ramon — Makhtesh Ramon crater',
);
await makeImage(
  'avdat.jpg',
  1600,
  1067,
  { r: 198, g: 168, b: 124 },
  'Avdat — Nabataean UNESCO archaeological',
);
await makeImage(
  'sde-boker.jpg',
  1600,
  1067,
  { r: 158, g: 162, b: 118 },
  'Sde Boker kibbutz + Ben-Gurion memorial',
);
await makeImage(
  'ein-avdat.jpg',
  1600,
  1067,
  { r: 148, g: 168, b: 142 },
  'Ein Avdat canyon hike',
);
await makeImage(
  'bedouin-hospitality.jpg',
  1600,
  1067,
  { r: 168, g: 132, b: 88 },
  'Bedouin hospitality (Phase 6 real-photo commission flagged)',
);

console.log('Done. (5 Negev sub-dest images — 1 flagged for Phase 6 commission)');
