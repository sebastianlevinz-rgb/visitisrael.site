/**
 * Generate AVIF + WebP siblings for every JPEG under public/images.
 * Components serve them via <picture> with the original .jpg as fallback,
 * so paths/refs never change. Re-runnable: skips siblings already current.
 */
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public/images';

function listJpg(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) listJpg(p, acc);
    else if (/\.jpe?g$/i.test(p)) acc.push(p);
  }
  return acc;
}

let avif = 0;
let webp = 0;
let avBytes = 0;
let wpBytes = 0;
let jpgBytes = 0;
for (const p of listJpg(ROOT)) {
  const base = p.replace(/\.jpe?g$/i, '');
  jpgBytes += statSync(p).size;
  const a = `${base}.avif`;
  const w = `${base}.webp`;
  if (!existsSync(a)) {
    await sharp(p).avif({ quality: 50 }).toFile(a);
    avif++;
  }
  avBytes += statSync(a).size;
  if (!existsSync(w)) {
    await sharp(p).webp({ quality: 72 }).toFile(w);
    webp++;
  }
  wpBytes += statSync(w).size;
}
const mb = (n) => (n / 1048576).toFixed(1);
console.log(`generated ${avif} avif, ${webp} webp`);
console.log(`jpg ${mb(jpgBytes)}MB · webp ${mb(wpBytes)}MB · avif ${mb(avBytes)}MB`);
