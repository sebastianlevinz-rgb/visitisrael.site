/**
 * Generate Tel Aviv sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 01 Task 3 — produces 7 hero images so the photo-credits Sharp
 * width gate passes and the sub-destination route renderer can serve them.
 *
 * Each placeholder is 1600x1067 (sub-dest hero >=1200px per IMG-04).
 * Credit ledger entries reference REAL Wikimedia / Pexels URLs.
 *
 * Tel Aviv sub-dests are ALL TouristAttraction only — no restricted-site
 * subjects (St. Peter's mention in Jaffa narrative is editorial, not
 * a schema-emission target).
 *
 * Run via: node public/images/sub-destinations/tel-aviv/generate-images.mjs
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

console.log('Generating Tel Aviv sub-destination placeholder images...');

await makeImage(
  'old-jaffa.jpg',
  1600,
  1067,
  { r: 196, g: 158, b: 112 },
  'Old Jaffa Port + Flea Market',
);
await makeImage(
  'carmel-market.jpg',
  1600,
  1067,
  { r: 222, g: 144, b: 92 },
  'Carmel Market (Shuk HaCarmel)',
);
await makeImage(
  'rothschild.jpg',
  1600,
  1067,
  { r: 240, g: 234, b: 218 },
  'Rothschild Boulevard + Bauhaus White City',
);
await makeImage(
  'tel-aviv-museum.jpg',
  1600,
  1067,
  { r: 124, g: 130, b: 158 },
  'Tel Aviv Museum of Art',
);
await makeImage(
  'florentin.jpg',
  1600,
  1067,
  { r: 168, g: 96, b: 78 },
  'Florentin — street art + nightlife',
);
await makeImage(
  'tayelet.jpg',
  1600,
  1067,
  { r: 112, g: 188, b: 220 },
  'Tayelet beach promenade',
);
await makeImage(
  'neve-tzedek.jpg',
  1600,
  1067,
  { r: 218, g: 198, b: 168 },
  'Neve Tzedek — oldest neighbourhood',
);

console.log('Done.');
