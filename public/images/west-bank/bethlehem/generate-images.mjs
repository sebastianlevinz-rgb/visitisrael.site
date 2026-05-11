#!/usr/bin/env node
/**
 * Sharp-generated placeholder JPEGs for Bethlehem at documented dimensions.
 *
 * Phase 3 plan 03-11. The photo-credits ledger entries reference REAL
 * Wikimedia Commons source URLs; these placeholder binaries get swapped
 * with the actual commissioned/Wikimedia photos in Phase 6.
 *
 * Editorial filter (CONTEXT.md v1 neutrality):
 *   - Tourism + Christian pilgrimage subjects ONLY
 *   - EXCLUDE Banksy wall art / political graffiti / separation-barrier
 *     photography
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const images = [
  { name: 'hero.jpg', width: 1920, height: 1080, color: '#7d5a3c' },
  {
    name: 'church-of-the-nativity.jpg',
    width: 1600,
    height: 1067,
    color: '#967959',
  },
  { name: 'manger-square.jpg', width: 1600, height: 1067, color: '#a98869' },
  { name: 'old-city.jpg', width: 1600, height: 1067, color: '#8a6e4f' },
];

async function generate() {
  await mkdir(__dirname, { recursive: true });
  for (const img of images) {
    const out = resolve(__dirname, img.name);
    await sharp({
      create: {
        width: img.width,
        height: img.height,
        channels: 3,
        background: img.color,
      },
    })
      .jpeg({ quality: 80 })
      .toFile(out);
    console.log(`wrote ${out} (${img.width}x${img.height})`);
  }
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
