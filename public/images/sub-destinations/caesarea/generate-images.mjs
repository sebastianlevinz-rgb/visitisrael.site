/**
 * Generate Caesarea sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 09 (Wave 3) — 4 sub-dests, ALL TouristAttraction + Place
 * (NO PlaceOfWorship — archaeological/cultural; pre-Christian Roman/Crusader).
 *
 *   - caesarea-national-park: Roman + Crusader ruins on Mediterranean coast
 *   - caesarea-harbour: Herodian engineering, first artificial deep-water port
 *   - caesarea-aqueduct-beach: Roman aqueduct + swimming
 *   - caesarea-ralli-museum: Contemporary Latin-American + European art
 *
 * Run via: node public/images/sub-destinations/caesarea/generate-images.mjs
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

console.log('Generating Caesarea sub-destination placeholder images...');

// 4 sub-dest images: 1600x1067 (sub-dest hero >=1200px per IMG-04).
await makeImage(
  'national-park.jpg',
  1600,
  1067,
  { r: 188, g: 154, b: 102 },
  'Caesarea National Park — Roman + Crusader',
);
await makeImage(
  'harbour.jpg',
  1600,
  1067,
  { r: 54, g: 130, b: 172 },
  'Caesarea Herodian Harbour',
);
await makeImage(
  'aqueduct-beach.jpg',
  1600,
  1067,
  { r: 198, g: 174, b: 134 },
  'Caesarea Aqueduct Beach',
);
await makeImage(
  'ralli-museum.jpg',
  1600,
  1067,
  { r: 168, g: 142, b: 172 },
  'Ralli Museum Caesarea',
);

console.log('Done.');
