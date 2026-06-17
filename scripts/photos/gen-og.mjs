/**
 * Generate the branded default Open Graph card (1200×630) used for the
 * homepage and any page without its own hero image. Composites the Jerusalem
 * hero + a dark gradient + the Visit Israel wordmark/tagline.
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;
const BASE = 'public/images/regions/jerusalem/hero.jpg';
const OUT = 'public/og-default.jpg';

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="rgba(15,18,16,0.86)"/>
      <stop offset="55%" stop-color="rgba(15,18,16,0.45)"/>
      <stop offset="100%" stop-color="rgba(15,18,16,0.05)"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="72" y="392" font-family="Georgia, 'Times New Roman', serif" font-size="104" font-weight="700" fill="#ffffff" letter-spacing="-2">Visit Israel</text>
  <rect x="76" y="424" width="92" height="6" rx="3" fill="#c8a951"/>
  <text x="76" y="486" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="#faf8f5">The English travel guide to Israel</text>
  <text x="76" y="556" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#c8a951">11 regions · itineraries · trusted tours · visitisrael.site</text>
</svg>`);

const base = await sharp(BASE)
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .toBuffer();

await sharp(base)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

const { size } = await sharp(OUT).metadata().then(async () => {
  const fs = await import('node:fs');
  return fs.statSync(OUT);
});
console.log(`wrote ${OUT} (${(size / 1024).toFixed(0)}KB, ${W}x${H})`);
