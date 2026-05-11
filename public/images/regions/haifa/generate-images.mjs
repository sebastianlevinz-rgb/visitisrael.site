/**
 * Generate Haifa region placeholder JPEGs.
 *
 * Phase 3 plan 07 (Wave 4) — Haifa is the policy-gap canary region for REG-05:
 *   - Bahá'í World Centre photography policy is the SENSITIVE subject (see
 *     data/haifa-bahai-policy.md). v1 uses Wikimedia-only architectural/garden
 *     public-terrace shots; Phase 6 commercial commissioning is gated on
 *     written permission from press@bahai.org.
 *   - ALL Bahá'í Gardens placeholders carry restrictedSiteAcknowledgment in the
 *     credit ledger (AUD-026 enforces — Zod superRefine fires on missing field).
 *   - Bahá'í Gardens emits Place (the MDX omits religiousSiteId) — NOT
 *     PlaceOfWorship; per Bahá'í convention the Shrine of the Báb (terrace 11)
 *     is the actual holy site (closed to non-Bahá'ís) while the gardens
 *     themselves are landscape architecture (UNESCO 2008).
 *   - Stella Maris Monastery emits PlaceOfWorship (Carmelite Catholic).
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 / Phase 3.1 Tel Aviv pattern. Credit
 * ledger entries reference REAL Wikimedia Commons URLs; binaries swap in the
 * M6 image-replace pass (Phase 6 commission gated on press@bahai.org for
 * Bahá'í subjects only — non-Bahá'í subjects can swap immediately).
 *
 * Run via: node public/images/regions/haifa/generate-images.mjs
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

console.log('Generating Haifa region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04). Bahá'í Gardens panorama
// from top terrace — Wikimedia abundant for architectural/garden wide shots.
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 60, g: 138, b: 92 },
  'Haifa Bahá’í Gardens terraces (placeholder)',
);

// 4 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'bahai-gardens.jpg',
  1600,
  1067,
  { r: 86, g: 162, b: 108 },
  'Bahá’í Gardens terrace detail',
);
await makeImage(
  'german-colony.jpg',
  1600,
  1067,
  { r: 198, g: 162, b: 110 },
  'Haifa German Colony Templer architecture',
);
await makeImage(
  'stella-maris.jpg',
  1600,
  1067,
  { r: 168, g: 138, b: 102 },
  'Stella Maris Carmelite Monastery (Mount Carmel)',
);
await makeImage(
  'carmel.jpg',
  1600,
  1067,
  { r: 78, g: 124, b: 88 },
  'Mount Carmel National Park overlook',
);

console.log('Done.');
