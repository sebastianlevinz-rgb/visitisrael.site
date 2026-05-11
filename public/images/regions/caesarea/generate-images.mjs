/**
 * Generate Caesarea region placeholder JPEGs.
 *
 * Phase 3 plan 09 (Wave 3) — Caesarea is the layered-history archaeological
 * region on Israel's Mediterranean coast: Phoenician → Roman → Byzantine →
 * Crusader → Ottoman → modern. UNESCO Antiquities Park 2010.
 *
 * Per PITFALLS §4.8 + CONTEXT.md image strategy:
 *   - Wikimedia 60-70% MEDIUM-LOW gap; UNESCO archaeological coverage strong
 *     (Roman Theatre + Crusader walls + Herodian harbour all freely
 *     photographable per Wikimedia Commons abundance).
 *   - NO restricted-site subjects — Caesarea is pre-Christian Roman + Crusader
 *     archaeological; even the Crusader cathedral is a ruin reconstruction.
 *     No PlaceOfWorship subjects.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 / Phase 3.1 Tel Aviv pattern + Phase 3.4
 * Eilat pattern. Credit ledger entries reference REAL Wikimedia Commons URLs;
 * binaries swap in the M6 image-replace pass.
 *
 * Run via: node public/images/regions/caesarea/generate-images.mjs
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

console.log('Generating Caesarea region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04). Caesarea Maritima coast + ruins panorama.
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 60, g: 110, b: 158 },
  'Caesarea Maritima coast + ruins (placeholder)',
);

// 3 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'roman-theatre.jpg',
  1600,
  1067,
  { r: 178, g: 142, b: 96 },
  'Caesarea Roman Theatre (restored)',
);
await makeImage(
  'harbour.jpg',
  1600,
  1067,
  { r: 48, g: 124, b: 168 },
  'Caesarea Herodian Harbour ruins',
);
await makeImage(
  'aqueduct.jpg',
  1600,
  1067,
  { r: 196, g: 168, b: 128 },
  'Caesarea Roman Aqueduct + beach',
);

console.log('Done.');
