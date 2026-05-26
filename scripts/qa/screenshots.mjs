/**
 * Visual QA screenshots — desktop (1440x900) + mobile (390x844).
 *
 * Usage:
 *   node scripts/qa/screenshots.mjs <path> [<path> ...]
 * Paths are site-relative (e.g. "/", "/jerusalem"). Requires a running server
 * (astro preview / dev) at BASE_URL (default http://localhost:4321).
 *
 * Output: dist-screenshots/<slug>.<desktop|mobile>.png
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { argv, env } from 'node:process';

const BASE = env.BASE_URL ?? 'http://localhost:4321';
const paths = argv.slice(2);
if (paths.length === 0) paths.push('/');

const OUT = 'dist-screenshots';
await mkdir(OUT, { recursive: true });

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\/+|\/+$/g, '').replace(/\//g, '-'));

const browser = await chromium.launch();
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

for (const p of paths) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.name === 'mobile' ? 2 : 1,
    });
    const page = await ctx.newPage();
    const url = new URL(p, BASE).href;
    // domcontentloaded, not load/networkidle: external embeds (Stay22) with a
    // placeholder ID never fire load, which would stall the page. Tolerate a
    // goto timeout and screenshot whatever rendered.
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    } catch {
      /* proceed to screenshot what loaded */
    }
    // Scroll the full page in steps so loading="lazy" images enter the
    // viewport and decode before the full-page capture.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
    });
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map((img) => new Promise((res) => (img.onload = img.onerror = res))),
      ),
    );
    await page.waitForTimeout(400); // settle
    const file = `${OUT}/${slug(p)}.${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`shot  ${file}  (${url})`);
    await ctx.close();
  }
}
await browser.close();
console.log('done');
