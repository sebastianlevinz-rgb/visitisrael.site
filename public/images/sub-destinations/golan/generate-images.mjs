/**
 * Generate Golan Heights sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 08 (Wave 4) — 5 sub-destinations, each TouristAttraction (Mount
 * Bental, Druze villages, Mount Hermon) OR TouristAttraction + Place (Banias
 * archaeological Pan grotto, Nimrod Fortress Crusader/Mamluk).
 *
 * NO PlaceOfWorship anywhere (Banias is pre-Christian Roman cult site, not an
 * active religious building; Druze religious tradition is private and not
 * photographed here).
 *
 * **CRITICAL FILTER:** No military installations, soldiers, IDF tanks, or
 * border-zone fortifications in any subject. Mount Bental viewpoint OK
 * (tourism viewpoint over Quneitra valley, not a military site).
 *
 * Run via: node public/images/sub-destinations/golan/generate-images.mjs
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

console.log('Generating Golan Heights sub-destination placeholder images...');

// 5 sub-dest heroes: 1600x1067 each (>=1200px per IMG-04).
await makeImage(
  'mount-bental.jpg',
  1600,
  1067,
  { r: 96, g: 110, b: 92 },
  'Mount Bental (volcanic crater + viewpoint)',
);
await makeImage(
  'banias.jpg',
  1600,
  1067,
  { r: 48, g: 122, b: 96 },
  'Banias / Caesarea Philippi (waterfall + Pan grotto)',
);
await makeImage(
  'nimrod-fortress.jpg',
  1600,
  1067,
  { r: 130, g: 116, b: 88 },
  'Nimrod Fortress (Crusader/Mamluk 13c)',
);
await makeImage(
  'druze-villages.jpg',
  1600,
  1067,
  { r: 174, g: 158, b: 120 },
  'Druze villages (Majdal Shams, Masʻade)',
);
await makeImage(
  'mount-hermon.jpg',
  1600,
  1067,
  { r: 200, g: 210, b: 220 },
  'Mount Hermon (winter ski + summer cable car)',
);

console.log('Done.');
