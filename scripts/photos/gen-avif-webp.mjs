/**
 * Generate AVIF + WebP siblings for every JPEG under public/images.
 * Also generates responsive srcset widths (-400w, -800w) so <Pic> can use
 * srcset for better mobile performance. Re-runnable: skips already-current files.
 */
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public/images';
// Responsive widths generated in addition to the original (which is the 1600w slot).
const SRCSET_WIDTHS = [400, 800];

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

  // Responsive width variants — only when original is wider than the target.
  const { width: origWidth } = await sharp(p).metadata();
  for (const rw of SRCSET_WIDTHS) {
    if ((origWidth ?? 0) > rw) {
      const ra = `${base}-${rw}w.avif`;
      const rwd = `${base}-${rw}w.webp`;
      if (!existsSync(ra)) {
        await sharp(p).resize(rw).avif({ quality: 55 }).toFile(ra);
        avif++;
      }
      avBytes += statSync(ra).size;
      if (!existsSync(rwd)) {
        await sharp(p).resize(rw).webp({ quality: 75 }).toFile(rwd);
        webp++;
      }
      wpBytes += statSync(rwd).size;
    }
  }
}
const mb = (n) => (n / 1048576).toFixed(1);
console.log(`generated ${avif} avif, ${webp} webp`);
console.log(`jpg ${mb(jpgBytes)}MB · webp ${mb(wpBytes)}MB · avif ${mb(avBytes)}MB`);
