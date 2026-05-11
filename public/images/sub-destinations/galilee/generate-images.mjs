/**
 * Generate Galilee sub-destination placeholder JPEGs.
 *
 * Phase 3 plan 03 Task 3 — produces 6 sub-dest hero images (one per
 * sub-destination), 1600x1067 each.
 *
 * Subjects:
 *   - tiberias: urban TouristAttraction (lakeside city)
 *   - capernaum: PlaceOfWorship (synagogue + Peter's house)
 *   - mount-of-beatitudes: PlaceOfWorship (Catholic Franciscan church)
 *   - magdala: Place (archaeological — 1st-century synagogue)
 *   - yardenit: PlaceOfWorship (baptismal site)
 *   - mount-arbel: TouristAttraction (hiking + cliff caves)
 *
 * Real-image binaries land in Phase 6 via Wikimedia download script (the
 * ledger sourceUrls in data/photo-credits.json are already production-ready).
 *
 * Run via: node public/images/sub-destinations/galilee/generate-images.mjs
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

console.log('Generating Galilee sub-destination placeholder images...');

await makeImage(
  'tiberias.jpg',
  1600,
  1067,
  { r: 132, g: 174, b: 200 },
  'Tiberias lakeside promenade',
);
await makeImage(
  'capernaum.jpg',
  1600,
  1067,
  { r: 196, g: 168, b: 124 },
  'Capernaum ancient synagogue ruins',
);
await makeImage(
  'mount-of-beatitudes.jpg',
  1600,
  1067,
  { r: 174, g: 198, b: 138 },
  'Mount of Beatitudes octagonal church',
);
await makeImage(
  'magdala.jpg',
  1600,
  1067,
  { r: 200, g: 178, b: 138 },
  'Magdala archaeological 1st-c synagogue',
);
await makeImage(
  'yardenit.jpg',
  1600,
  1067,
  { r: 108, g: 152, b: 132 },
  'Yardenit Jordan River baptismal site',
);
await makeImage(
  'mount-arbel.jpg',
  1600,
  1067,
  { r: 158, g: 168, b: 124 },
  'Mount Arbel cliff and caves',
);

console.log('Done.');
