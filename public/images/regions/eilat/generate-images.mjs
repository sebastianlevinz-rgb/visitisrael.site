/**
 * Generate Eilat region placeholder JPEGs.
 *
 * Phase 3 plan 04 (Wave 2) — Eilat is the southern Red Sea tourism enclave.
 * 5 hero/inline images so the photo-credits Sharp width gate passes and the
 * region route renderer can serve them.
 *
 * Per PITFALLS §4.4 + CONTEXT.md image strategy:
 *   - Wikimedia 50-60% MEDIUM gap; Red Sea diving photography thin —
 *     supplement with Unsplash/Pexels (uniqueness less critical for beach
 *     destinations).
 *   - NO restricted-site subjects — Eilat has zero religious sites in the
 *     restricted set; Coral Beach Reserve + Underwater Observatory + Timna Park
 *     + Dolphin Reef are all freely photographable per Wikimedia Commons.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 / Phase 3.1 Tel Aviv pattern. Credit
 * ledger entries reference REAL Wikimedia / Unsplash URLs; binaries swap
 * in the M6 image-replace pass.
 *
 * Run via: node public/images/regions/eilat/generate-images.mjs
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

console.log('Generating Eilat region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04). Red Sea horizon framing.
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 32, g: 124, b: 188 },
  'Eilat Red Sea skyline (placeholder)',
);

// 4 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'coral-beach.jpg',
  1600,
  1067,
  { r: 240, g: 140, b: 120 },
  'Coral Beach Nature Reserve',
);
await makeImage(
  'red-sea.jpg',
  1600,
  1067,
  { r: 28, g: 110, b: 168 },
  'Red Sea + Sinai mountains',
);
await makeImage(
  'timna-park.jpg',
  1600,
  1067,
  { r: 184, g: 96, b: 60 },
  'Timna Park — Solomon Pillars',
);
await makeImage(
  'dolphin-reef.jpg',
  1600,
  1067,
  { r: 72, g: 148, b: 188 },
  'Dolphin Reef Eilat',
);

console.log('Done.');
