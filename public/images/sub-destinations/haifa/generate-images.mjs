/**
 * Generate Haifa sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 07 (Wave 4) — 5 sub-destinations:
 *   - bahai-gardens.jpg (Bahá'í-subject — ledger entry MUST carry
 *     restrictedSiteAcknowledgment per AUD-026)
 *   - german-colony.jpg (Templer architecture — non-restricted)
 *   - stella-maris.jpg (Catholic monastery — non-restricted)
 *   - wadi-nisnas.jpg (Arab-Christian quarter — non-restricted)
 *   - carmel-national-park.jpg (nature park — non-restricted)
 *
 * Run via: node public/images/sub-destinations/haifa/generate-images.mjs
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

console.log('Generating Haifa sub-destination placeholder images...');

// 5 sub-dest hero images: 1600x1067 (>=1200px per IMG-04).
await makeImage(
  'bahai-gardens.jpg',
  1600,
  1067,
  { r: 86, g: 162, b: 108 },
  'Bahá’í Gardens lower terrace (placeholder)',
);
await makeImage(
  'german-colony.jpg',
  1600,
  1067,
  { r: 198, g: 162, b: 110 },
  'German Colony Ben-Gurion Avenue (placeholder)',
);
await makeImage(
  'stella-maris.jpg',
  1600,
  1067,
  { r: 168, g: 138, b: 102 },
  'Stella Maris Monastery (placeholder)',
);
await makeImage(
  'wadi-nisnas.jpg',
  1600,
  1067,
  { r: 158, g: 102, b: 78 },
  'Wadi Nisnas market lane (placeholder)',
);
await makeImage(
  'carmel-national-park.jpg',
  1600,
  1067,
  { r: 78, g: 124, b: 88 },
  'Mount Carmel National Park (placeholder)',
);

console.log('Done.');
