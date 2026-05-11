/**
 * Generate Akko (Acre) sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 10 (Wave 4) — 5 sub-destinations: Old City (UNESCO),
 * Hospitaller Knights' Halls (underground Crusader citadel), Templar Tunnel
 * (12th-c underground passage to harbour), Khan al-Umdan (1785 Ottoman
 * caravanserai), Bahá'í Mansion of Bahjí (Bahá'í pilgrimage site 4km north).
 *
 * Bahá'í Mansion image MUST carry restrictedSiteAcknowledgment in the
 * data/photo-credits.json ledger entry (AUD-026 — same Bahá'í International
 * Community policy as Haifa Plan 07).
 *
 * Run via: node public/images/sub-destinations/akko/generate-images.mjs
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

console.log('Generating Akko sub-destination placeholder images...');

// 5 sub-dest images: 1600x1067 (sub-dest hero >=1200px per IMG-04).
await makeImage(
  'old-city.jpg',
  1600,
  1067,
  { r: 188, g: 158, b: 110 },
  'Akko Old City alleys + souq',
);
await makeImage(
  'hospitaller-knights.jpg',
  1600,
  1067,
  { r: 92, g: 84, b: 76 },
  "Akko Hospitaller Knights' Halls",
);
await makeImage(
  'templar-tunnel.jpg',
  1600,
  1067,
  { r: 64, g: 72, b: 86 },
  'Akko Templar Tunnel',
);
await makeImage(
  'khan-al-umdan.jpg',
  1600,
  1067,
  { r: 162, g: 138, b: 102 },
  'Khan al-Umdan caravanserai',
);
await makeImage(
  'bahai-mansion.jpg',
  1600,
  1067,
  { r: 132, g: 156, b: 116 },
  "Bahá'í Mansion of Bahjí (architectural)",
);

console.log('Done.');
