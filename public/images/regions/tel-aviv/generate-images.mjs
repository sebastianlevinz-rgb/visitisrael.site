/**
 * Generate Tel Aviv region placeholder JPEGs.
 *
 * Phase 3 plan 01 — produces 5 hero/inline images so the photo-credits Sharp
 * width gate passes and the region route renderer can serve them.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 Jerusalem pattern. Credit ledger
 * entries reference REAL Wikimedia Commons / Unsplash URLs; when those
 * binaries are downloaded for production (M6 image-replace pass),
 * dimensions remain compatible.
 *
 * Tel Aviv has NO restricted-site subjects (Jaffa heritage + Bauhaus +
 * beaches + market all CC-BY-SA-friendly per PITFALLS §5).
 *
 * Run via: node public/images/regions/tel-aviv/generate-images.mjs
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

console.log('Generating Tel Aviv region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04).
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 88, g: 156, b: 196 },
  'Tel Aviv-Jaffa skyline (placeholder)',
);

// 4 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'jaffa.jpg',
  1600,
  1067,
  { r: 196, g: 158, b: 112 },
  'Old Jaffa Port at golden hour',
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
  'Bauhaus White City — Rothschild',
);
await makeImage(
  'beaches.jpg',
  1600,
  1067,
  { r: 112, g: 188, b: 220 },
  'Tayelet beach promenade',
);

console.log('Done.');
