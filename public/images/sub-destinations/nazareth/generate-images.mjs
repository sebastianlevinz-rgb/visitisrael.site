/**
 * Generate Nazareth sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 06 Task 3 — produces 4 sub-dest hero images (one per
 * sub-destination), 1600x1067 each.
 *
 * Subjects:
 *   - basilica-of-the-annunciation: PlaceOfWorship (Catholic Franciscan; 1969)
 *   - old-city: TouristAttraction (souq market + alleys)
 *   - marys-well: PlaceOfWorship (Greek Orthodox tradition + church)
 *   - mount-of-precipice: Place (outdoor cliff over Jezreel Valley)
 *
 * Real-image binaries land in Phase 6 via Wikimedia download script (the
 * ledger sourceUrls in data/photo-credits.json are already production-ready).
 *
 * Run via: node public/images/sub-destinations/nazareth/generate-images.mjs
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
      <text x="50%" y="50%" font-family="sans-serif" font-size="${Math.floor(width / 20)}" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${label}</text>
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

console.log('Generating Nazareth sub-destination placeholder images...');

await makeImage(
  'basilica-of-the-annunciation.jpg',
  1600,
  1067,
  { r: 168, g: 144, b: 100 },
  'Basilica of the Annunciation Catholic interior',
);
await makeImage(
  'old-city.jpg',
  1600,
  1067,
  { r: 200, g: 172, b: 124 },
  'Nazareth Old City souq alley',
);
await makeImage(
  'marys-well.jpg',
  1600,
  1067,
  { r: 148, g: 158, b: 132 },
  "Mary's Well + Greek Orthodox Church",
);
await makeImage(
  'mount-of-precipice.jpg',
  1600,
  1067,
  { r: 140, g: 168, b: 124 },
  'Mount of Precipice cliff over Jezreel Valley',
);

console.log('Done.');
