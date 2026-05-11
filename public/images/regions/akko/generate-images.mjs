/**
 * Generate Akko (Acre) region placeholder JPEGs.
 *
 * Phase 3 plan 10 (Wave 4, parallel with Haifa + Golan) — Akko is the
 * UNESCO Crusader-Ottoman heritage city on Israel's northern Mediterranean
 * coast: Phoenician → Roman → Crusader (Hospitaller + Templar HQ; capital
 * after Jerusalem fell in 1187) → Mamluk (destroyed 1291) → Ottoman
 * (Ahmed Pasha al-Jazzar period; Khan al-Umdan 1785) → British Mandate
 * (Acre Prison + 1947 escape) → modern Israeli mixed-city. UNESCO
 * inscription 2001 covers the Old City + underground Crusader citadel.
 *
 * Per PITFALLS §4.9 + CONTEXT.md image strategy:
 *   - Wikimedia 50-60% MEDIUM gap. Old City + sea walls + Khan al-Umdan
 *     have strong CC coverage. Hospitaller Knights' Halls (underground)
 *     and Templar Tunnel are CC-thin — Sharp placeholders + real Wikimedia
 *     sourceUrls remain valid per Phase 2.1 pattern.
 *   - Bahá'í Mansion of Bahjí (4km north of Old City) is a sensitive
 *     Bahá'í pilgrimage subject — same Bahá'í International Community
 *     photo policy as Haifa Plan 07. ALL Bahá'í images carry
 *     restrictedSiteAcknowledgment in the ledger (AUD-026 enforced).
 *     Architectural wide shots OK; NO pilgrims/worshippers visible.
 *
 * Each placeholder is a solid color + SVG label overlay at the documented
 * dimensions, matching the Phase 2.1 / Phase 3.x pattern. Credit ledger
 * entries reference REAL Wikimedia Commons URLs; binaries swap in the M6
 * image-replace pass.
 *
 * Run via: node public/images/regions/akko/generate-images.mjs
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

console.log('Generating Akko (Acre) region placeholder images...');

// Hero: 1920x1080 (region hero >=1600px per IMG-04). Akko sea wall + Old City rampart panorama.
await makeImage(
  'hero.jpg',
  1920,
  1080,
  { r: 70, g: 122, b: 158 },
  'Akko (Acre) Old City sea walls (placeholder)',
);

// 3 inline images: 1600x1067 (region inline >=1200px per IMG-04).
await makeImage(
  'old-city.jpg',
  1600,
  1067,
  { r: 188, g: 158, b: 110 },
  'Akko Old City souq + alleys',
);
await makeImage(
  'hospitaller.jpg',
  1600,
  1067,
  { r: 92, g: 84, b: 76 },
  'Akko Hospitaller Knights underground halls',
);
await makeImage(
  'bahai-mansion.jpg',
  1600,
  1067,
  { r: 132, g: 156, b: 116 },
  "Bahá'í Mansion of Bahjí (architectural)",
);

console.log('Done.');
