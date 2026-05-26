/**
 * audit.mjs — post-build site audit over dist/.
 * Checks: broken internal links, <title> length (50–60 ideal, flag >65),
 * meta description length (150–160 ideal, flag <120 or >170), missing meta
 * description, and multiple <h1> per page.
 *
 * Usage: node scripts/qa/audit.mjs   (after `pnpm build`)
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = 'dist';

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = await walk(DIST);

// Build the set of valid routes from index.html locations.
const routes = new Set();
for (const f of files) {
  let r = '/' + relative(DIST, f).replace(/\\/g, '/');
  r = r.replace(/index\.html$/, '').replace(/\.html$/, '');
  if (r.length > 1) r = r.replace(/\/$/, '');
  routes.add(r === '' ? '/' : r);
}

const brokenLinks = new Map(); // href -> [pages]
const titleIssues = [];
const descIssues = [];
const h1Issues = [];

const decode = (s) =>
  s
    .replace(/&#39;|&#x27;|&rsquo;|&lsquo;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&[a-z]+;/g, '?'); // any remaining named entity = 1 visible glyph

const isAsset = (h) =>
  /^(\/_astro\/|\/images\/|\/fonts\/|\/sitemap|\/robots|\/llms|\/favicon|#)/.test(h) ||
  /\.(png|jpe?g|webp|avif|svg|xml|txt|ico|css|js|woff2?)$/i.test(h);

for (const f of files) {
  const html = await readFile(f, 'utf8');
  const page = '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '');

  // internal links
  const hrefs = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);
  for (let h of hrefs) {
    h = h.replace(/[?#].*$/, '');
    if (h.length > 1) h = h.replace(/\/$/, '');
    if (isAsset(h)) continue;
    if (!routes.has(h)) {
      if (!brokenLinks.has(h)) brokenLinks.set(h, new Set());
      brokenLinks.get(h).add(page);
    }
  }

  // title length (decode entities for an accurate, rendered-length count)
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  if (title.length === 0) titleIssues.push(`${page} — MISSING title`);
  else if (title.length > 65) titleIssues.push(`${page} — title ${title.length} chars: "${title}"`);

  // meta description (skip noindex internal modules — they intentionally omit it)
  const noindex = /name="robots"\s+content="noindex/.test(html);
  if (!noindex) {
    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
    if (desc.length === 0) descIssues.push(`${page} — MISSING description`);
    else if (desc.length < 110 || desc.length > 170)
      descIssues.push(`${page} — desc ${desc.length} chars`);
  }

  // multiple h1
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) h1Issues.push(`${page} — ${h1s} <h1>`);
}

const section = (name, arr) => {
  console.log(`\n## ${name} (${arr.length})`);
  arr.slice(0, 40).forEach((x) => console.log('  ' + x));
  if (arr.length > 40) console.log(`  …and ${arr.length - 40} more`);
};

console.log(`Audited ${files.length} pages; ${routes.size} routes.`);
console.log(`\n## BROKEN internal links (${brokenLinks.size})`);
for (const [h, pages] of brokenLinks) console.log(`  ${h}  ← ${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? ` (+${pages.size - 3})` : ''}`);
section('Title length issues', titleIssues);
section('Meta description issues', descIssues);
section('H1 count issues', h1Issues);

const problems = brokenLinks.size + titleIssues.length + descIssues.length + h1Issues.length;
console.log(`\nTOTAL flags: ${problems}`);
