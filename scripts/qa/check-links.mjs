/**
 * Broken-link + orphan-page checker.
 *
 * Reads the built `dist/` tree (run `pnpm build` first), collects every page
 * route and asset file, then scans each page's internal href targets:
 *   - any internal link that resolves to no page/asset → BROKEN (exit 1)
 *   - any content page with zero inbound internal links → ORPHAN (warning)
 *
 * Standalone, no deps. Used by tests/e2e/links.spec.ts so the e2e gate covers it.
 * Run directly with `pnpm check:links`.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `pnpm build` first.');
  process.exit(2);
}

/** Recursively list every file under a directory as dist-relative POSIX paths. */
function walk(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else {
      const rel = full.slice(base.length).split('\\').join('/').replace(/^\/+/, '');
      out.push('/' + rel);
    }
  }
  return out;
}

const allFiles = walk(DIST);

// Page routes: every <dir>/index.html → "/<dir>"; root index.html → "/".
// Also top-level "*.html" (e.g. 404.html) → "/<name>".
const pageRoutes = new Set();
for (const f of allFiles) {
  if (f === '/index.html') pageRoutes.add('/');
  else if (f.endsWith('/index.html')) pageRoutes.add(f.slice(0, -'/index.html'.length));
  else if (f.endsWith('.html')) pageRoutes.add(f.slice(0, -'.html'.length));
}
// Asset files (rss.xml, sitemap, images, favicon…) checked by exact path.
const assetFiles = new Set(allFiles);

/** Normalise a link to a route key: drop hash/query + trailing slash (root stays "/"). */
function normRoute(href) {
  let p = href.split('#')[0].split('?')[0];
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
}

function isValid(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '' ) return true; // pure "#anchor"
  if (assetFiles.has(clean)) return true;
  const r = normRoute(href);
  return pageRoutes.has(r);
}

// Pages excluded from the orphan check (entry points / intentionally unlinked /
// noindex utility routes).
const ORPHAN_EXCLUDE = new Set(['/', '/404', '/search']);
const ORPHAN_EXCLUDE_PREFIX = ['/dashboard', '/pitch', '/competitors', '/content-library'];

const htmlPages = allFiles.filter((f) => f.endsWith('.html'));
const broken = []; // { page, href }
const inbound = new Map(); // route → count
const outbound = new Map(); // route → Set(target routes) — for click-depth BFS

const HREF_RE = /href="([^"]*)"/g;

for (const file of htmlPages) {
  const route =
    file === '/index.html'
      ? '/'
      : file.endsWith('/index.html')
        ? file.slice(0, -'/index.html'.length)
        : file.slice(0, -'.html'.length);
  const html = readFileSync(join(DIST, file.slice(1)), 'utf8');
  let m;
  while ((m = HREF_RE.exec(html)) !== null) {
    const href = m[1];
    // Only internal absolute links (skip external, mailto, tel, protocol-relative).
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (!isValid(href)) broken.push({ page: route, href });
    const target = normRoute(href);
    if (pageRoutes.has(target) && target !== route) {
      inbound.set(target, (inbound.get(target) || 0) + 1);
      if (!outbound.has(route)) outbound.set(route, new Set());
      outbound.get(route).add(target);
    }
  }
}

// Click-depth from the home page (BFS over the page-link graph). Goal: every
// content page reachable in a few clicks. Advisory (warns), never fails.
const DEPTH_WARN = 3;
const depth = new Map([['/', 0]]);
let frontier = ['/'];
while (frontier.length) {
  const next = [];
  for (const node of frontier) {
    for (const target of outbound.get(node) || []) {
      if (!depth.has(target)) {
        depth.set(target, depth.get(node) + 1);
        next.push(target);
      }
    }
  }
  frontier = next;
}
const reachExclude = (r) =>
  ORPHAN_EXCLUDE.has(r) || ORPHAN_EXCLUDE_PREFIX.some((p) => r === p || r.startsWith(p + '/'));
const unreachable = [...pageRoutes].filter((r) => !depth.has(r) && !reachExclude(r));
const deep = [...pageRoutes]
  .filter((r) => depth.has(r) && depth.get(r) > DEPTH_WARN && !reachExclude(r))
  .sort((a, b) => depth.get(b) - depth.get(a));
const maxDepth = Math.max(0, ...[...depth.values()]);

const orphans = [...pageRoutes].filter((r) => {
  if (inbound.get(r)) return false;
  if (ORPHAN_EXCLUDE.has(r)) return false;
  if (ORPHAN_EXCLUDE_PREFIX.some((p) => r === p || r.startsWith(p + '/'))) return false;
  return true;
});

// De-dupe broken (page,href) pairs and report.
const seen = new Set();
const brokenUnique = broken.filter((b) => {
  const k = b.page + ' → ' + b.href;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

if (brokenUnique.length) {
  console.error('\nBROKEN internal links:');
  for (const b of brokenUnique) console.error(`  ${b.page}  →  ${b.href}`);
}
if (orphans.length) {
  console.warn('\nORPHAN pages (no inbound internal link — review):');
  for (const o of orphans.sort()) console.warn(`  ${o}`);
}
if (unreachable.length) {
  console.warn('\nUNREACHABLE from home (not in the click graph — review):');
  for (const u of unreachable.sort()) console.warn(`  ${u}`);
}
if (deep.length) {
  console.warn(`\nDEEP pages (> ${DEPTH_WARN} clicks from home — consider a closer cross-link):`);
  for (const d of deep) console.warn(`  ${depth.get(d)} clicks  ${d}`);
}

console.log(
  `\nRESULT: ${brokenUnique.length} broken link(s), ${orphans.length} orphan page(s), ` +
    `${unreachable.length} unreachable, ${deep.length} deep (>${DEPTH_WARN} clicks); ` +
    `max depth ${maxDepth} across ${htmlPages.length} pages.`
);

// Broken links fail the build; orphans/depth are advisory only.
process.exit(brokenUnique.length > 0 ? 1 : 0);
