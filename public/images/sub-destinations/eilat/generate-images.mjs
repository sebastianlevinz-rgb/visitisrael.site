/**
 * Generate Eilat sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 04 Task 3 — produces 5 hero images for the 5 Eilat sub-dests.
 *
 * Each placeholder is 1600x1067 (sub-dest hero >=1200px per IMG-04).
 * Credit ledger entries reference REAL Wikimedia / Unsplash URLs.
 *
 * Eilat sub-dests are ALL TouristAttraction only — no religious-site
 * subjects, no restricted permits required (Coral Beach Reserve allows
 * standard tourist photography; Dolphin Reef + Underwater Observatory
 * operate commercial photo policies open to visitors).
 *
 * Run via: node public/images/sub-destinations/eilat/generate-images.mjs
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

console.log('Generating Eilat sub-destination placeholder images...');

await makeImage(
  'coral-beach.jpg',
  1600,
  1067,
  { r: 240, g: 140, b: 120 },
  'Coral Beach Nature Reserve',
);
await makeImage(
  'underwater-observatory.jpg',
  1600,
  1067,
  { r: 48, g: 138, b: 196 },
  'Underwater Observatory Marine Park',
);
await makeImage(
  'timna-park.jpg',
  1600,
  1067,
  { r: 184, g: 96, b: 60 },
  'Timna Park — geology + Bronze Age',
);
await makeImage(
  'dolphin-reef.jpg',
  1600,
  1067,
  { r: 72, g: 148, b: 188 },
  'Dolphin Reef — interactive marine sanctuary',
);
await makeImage(
  'red-canyon.jpg',
  1600,
  1067,
  { r: 200, g: 84, b: 56 },
  'Red Canyon — geology hike',
);

console.log('Done.');
