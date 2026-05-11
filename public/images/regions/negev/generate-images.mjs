/**
 * Generate Negev Desert region placeholder JPEGs.
 *
 * Phase 3 plan 05 — IMAGE-GAP CANARY for REG-05.
 *
 * CONTEXT.md estimates 40-50% Wikimedia coverage for Negev — significantly
 * thinner than Jerusalem/Tel Aviv. This generator produces a 3-4 photo
 * gallery (vs Jerusalem's 6+) which is acceptable per soft-gate criteria.
 * The thinner gallery is documented in `data/negev-images.md` along with
 * the Phase 6 commission budget ($1,500-$3,000 USD) for real-image
 * sourcing of underserved subjects.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 / Phase 3.1 Tel Aviv / Phase 3.2 Dead
 * Sea pattern. Credit ledger entries reference REAL Wikimedia Commons URLs;
 * when those binaries are downloaded for production (Phase 6 image-replace
 * pass), dimensions remain compatible.
 *
 * Negev images:
 *   - hero.jpg: Makhtesh Ramon crater overlook (Wikimedia abundant)
 *   - mitzpe-ramon.jpg: Crater + visitor center
 *   - avdat.jpg: Nabataean UNESCO ruins
 *   - desert.jpg: Generic Negev landscape (placeholder; Phase 6 swap to
 *     Bedouin hospitality photography with consensual portraiture +
 *     fair-wage community-partnership photographer)
 *
 * NO restricted-site subjects (Negev has zero PITFALLS §5.4-equivalent
 * subjects — Makhtesh Ramon crater + Avdat archaeological + generic desert
 * are all CC-BY-SA-friendly. Bedouin hospitality scenes need REAL photo
 * commission for Phase 6, NOT restrictedSiteAcknowledgment.)
 *
 * Run via: node public/images/regions/negev/generate-images.mjs
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

console.log('Generating Negev Desert region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04).
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 188, g: 142, b: 92 },
  'Makhtesh Ramon crater overlook (placeholder)',
);

// 3 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'mitzpe-ramon.jpg',
  1600,
  1067,
  { r: 178, g: 138, b: 100 },
  'Mitzpe Ramon crater rim + visitor center',
);
await makeImage(
  'avdat.jpg',
  1600,
  1067,
  { r: 198, g: 168, b: 124 },
  'Avdat — Nabataean UNESCO Spice Route',
);
await makeImage(
  'desert.jpg',
  1600,
  1067,
  { r: 168, g: 132, b: 88 },
  'Negev desert landscape (Phase 6 swap → Bedouin hospitality)',
);

console.log('Done. (4 Negev region images — image-gap canary thin gallery)');
