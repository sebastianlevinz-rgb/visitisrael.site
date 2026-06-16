import sharp from 'sharp';
import { readdirSync, statSync, existsSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public/images';
const SAMPLES = '.audit/hf-samples';

// 1) AI heroes → region hero.jpg (optimized JPEG, keep filename = no ref churn)
const heroes = {
  'regions/jerusalem/hero.jpg': `${SAMPLES}/jerusalem-1.png`,
  'regions/tel-aviv/hero.jpg': `${SAMPLES}/telaviv-2.png`,
  'regions/dead-sea/hero.jpg': `${SAMPLES}/deadsea-1.png`,
  'regions/galilee/hero.jpg': `${SAMPLES}/galilee.png`,
  'regions/negev/hero.jpg': `${SAMPLES}/negev.png`,
};
for (const [dest, src] of Object.entries(heroes)) {
  const out = join(ROOT, dest);
  if (!existsSync(src)) {
    console.log('MISSING SRC', src);
    continue;
  }
  const buf = await sharp(src)
    .resize(1600, 1000, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 74, mozjpeg: true })
    .toBuffer();
  await sharp(buf).toFile(out);
  console.log(`hero  ${dest}  ${(buf.length / 1024).toFixed(0)}KB`);
}

// 2) Re-encode every jpg in place: cap width 1600, mozjpeg q72 (only if smaller)
function listJpg(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) listJpg(p, acc);
    else if (/\.jpe?g$/i.test(p)) acc.push(p);
  }
  return acc;
}

let cnt = 0;
let before = 0;
let after = 0;
let failed = 0;
for (const p of listJpg(ROOT)) {
  const bsz = statSync(p).size;
  try {
    const meta = await sharp(p).metadata();
    let pipe = sharp(p);
    if ((meta.width || 0) > 1600) pipe = pipe.resize({ width: 1600 });
    const buf = await pipe.jpeg({ quality: 72, mozjpeg: true }).toBuffer();
    if (buf.length < bsz) {
      const tmp = `${p}.tmp`;
      await sharp(buf).toFile(tmp);
      rmSync(p);
      renameSync(tmp, p);
      after += buf.length;
    } else {
      after += bsz;
    }
  } catch (e) {
    failed++;
    after += bsz;
    console.log('skip', p, e.message);
  }
  before += bsz;
  cnt++;
}
console.log(`failures: ${failed}`);
console.log(
  `reencoded ${cnt} jpgs: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`
);
