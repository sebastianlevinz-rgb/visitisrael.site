/**
 * One-shot script that generates the two fixture JPGs used by
 * `tests/photo-credits/check-credits.test.ts`. Run via:
 *
 *   node data/photo-credits-fixtures/generate-fixtures.mjs
 *
 * Outputs:
 *   - valid-1600w.jpg       (1600x900, blue, ~10KB) — passes width check
 *   - undersized-800w.jpg   (800x450,  red,  ~3KB)  — fails width check
 *
 * Both files are committed; this script exists for reproducibility if a
 * fixture ever needs regenerating.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

async function makeFixture(filename, width, height, background) {
  const outPath = join(HERE, filename);
  await sharp({
    create: { width, height, channels: 3, background },
  })
    .jpeg({ quality: 70 })
    .toFile(outPath);
  const meta = await sharp(outPath).metadata();
  console.log(
    `  -> ${filename}: ${meta.width}x${meta.height} (${meta.size} bytes)`,
  );
}

console.log('Generating photo-credits fixture images...');
await makeFixture('valid-1600w.jpg', 1600, 900, { r: 60, g: 120, b: 180 });
await makeFixture('undersized-800w.jpg', 800, 450, { r: 200, g: 60, b: 60 });
console.log('Done.');
