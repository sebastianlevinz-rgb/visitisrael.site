/**
 * Auditoría on-page sobre dist/ → data/seo/onpage.json
 *
 *   pnpm build && node scripts/seo/onpage.mjs
 *
 * Por cada página pública (excluye /dashboard, /gestion*, /mariluz, /search, /404,
 * /photo-credits): title, description, H1/H2/H3, canonical, hreflang y su
 * reciprocidad, og:image, JSON-LD, palabras del contenido principal, imágenes sin alt,
 * links internos y externos, noindex y presencia en el sitemap. Después agrega los
 * problemas (duplicados, largos, thin, hreflang rotos, pocas entrantes) y chequea
 * robots.txt y el sitemap. Sin APIs: todo local y gratis.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, SITE, loadDist, parseHtml, textOf, wordCount, writeJson } from './lib.mjs';

// Internas (noindex): nunca deberían estar en el sitemap. /photo-credits es pública
// pero se excluye del análisis on-page (es un listado generado, no contenido).
const INTERNAL = [/^\/dashboard(\/|$)/, /^\/gestion(\/|$)/, /^\/mariluz(\/|$)/, /^\/search(\/|$)/, /^\/404(\/|$)/];
const EXCLUDE = [...INTERNAL, /^\/photo-credits(\/|$)/];
const isInternal = (path) => INTERNAL.some((re) => re.test(path));
const isPublic = (path) => !EXCLUDE.some((re) => re.test(path));

/** Normaliza una URL absoluta o relativa del sitio a ruta sin barra final. */
function normalizePath(href) {
  if (!href) return null;
  let url;
  try {
    url = new URL(href, SITE);
  } catch {
    return null;
  }
  if (url.origin !== SITE) return null;
  let p = url.pathname.replace(/\/index\.html$/, '');
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

// --- Sitemap y robots --------------------------------------------------------------
function readSitemapPaths() {
  const files = ['sitemap-0.xml', 'sitemap.xml'].map((f) => join(DIST, f)).filter(existsSync);
  const paths = new Set();
  for (const file of files) {
    const xml = readFileSync(file, 'utf8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const p = normalizePath(m[1].trim());
      if (p) paths.add(p);
    }
  }
  return { file: files[0] ?? null, paths };
}

function readRobots() {
  const file = join(DIST, 'robots.txt');
  if (!existsSync(file)) return { exists: false, disallow: [], sitemap: null, allowsAll: false };
  const text = readFileSync(file, 'utf8');
  const disallow = [...text.matchAll(/^Disallow:\s*(\S*)/gim)].map((m) => m[1]).filter(Boolean);
  const sitemap = text.match(/^Sitemap:\s*(\S+)/im)?.[1] ?? null;
  const starBlock = text.split(/User-agent:\s*\*/i)[1]?.split(/User-agent:/i)[0] ?? '';
  return { exists: true, disallow, sitemap, allowsAll: /Allow:\s*\/\s*$/m.test(starBlock) && !/Disallow:\s*\/\s*$/m.test(starBlock) };
}

// --- Análisis de una página --------------------------------------------------------
function analyze(entry, sitemapPaths) {
  const html = readFileSync(entry.file, 'utf8');
  const root = parseHtml(html);
  const head = root.querySelector('head');
  const attr = (sel, name) => head?.querySelector(sel)?.getAttribute(name) ?? null;

  const title = textOf(head?.querySelector('title')?.text ?? '');
  const description = attr('meta[name="description"]', 'content')?.trim() ?? '';
  const canonical = normalizePath(attr('link[rel="canonical"]', 'href'));
  const robots = (attr('meta[name="robots"]', 'content') ?? '').toLowerCase();
  const noindex = robots.includes('noindex');
  const ogImage = attr('meta[property="og:image"]', 'content');

  const hreflang = (head?.querySelectorAll('link[rel="alternate"][hreflang]') ?? []).map((l) => ({
    lang: l.getAttribute('hreflang'),
    path: normalizePath(l.getAttribute('href')),
  }));

  const jsonLdTypes = [];
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(s.text);
      const items = Array.isArray(data) ? data : data['@graph'] ?? [data];
      for (const it of items) {
        const t = it?.['@type'];
        if (t) jsonLdTypes.push(...(Array.isArray(t) ? t : [t]));
      }
    } catch {
      jsonLdTypes.push('(inválido)');
    }
  }

  const h1s = root.querySelectorAll('h1').map((h) => textOf(h.text));
  const h2Count = root.querySelectorAll('h2').length;
  const h3Count = root.querySelectorAll('h3').length;

  // Contenido principal: <main> (o <article>, o <body>) sin nav/script/style/noscript.
  const mainNode = root.querySelector('main') ?? root.querySelector('article') ?? root.querySelector('body');
  let words = 0;
  if (mainNode) {
    const clone = parseHtml(mainNode.toString());
    for (const n of clone.querySelectorAll('nav, script, style, noscript, template, svg')) n.remove();
    words = wordCount(clone.text);
  }

  const images = root.querySelectorAll('img');
  const imagesWithoutAlt = images.filter((img) => !img.hasAttribute('alt')).length;
  const imagesEmptyAlt = images.filter((img) => img.hasAttribute('alt') && !img.getAttribute('alt')?.trim()).length;

  // Links del body (sin <head>): internos vs externos.
  const internal = [];
  const externalSet = new Set();
  for (const a of root.querySelectorAll('body a[href]')) {
    const href = a.getAttribute('href') ?? '';
    if (/^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    let url;
    try {
      url = new URL(href, SITE);
    } catch {
      continue;
    }
    if (url.origin === SITE) {
      const p = normalizePath(url.href);
      if (p && p !== entry.path) internal.push({ path: p, anchor: textOf(a.text) || (a.querySelector('img') ? '(imagen)' : '') });
    } else {
      externalSet.add(url.hostname);
    }
  }
  const uniqueInternal = [...new Set(internal.map((l) => l.path))];

  return {
    path: entry.path,
    locale: entry.locale,
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    h1: h1s,
    h1Count: h1s.length,
    h2Count,
    h3Count,
    canonical,
    canonicalOk: canonical === entry.path,
    hreflang,
    hreflangOk: true, // se completa en la segunda pasada
    hreflangIssues: [],
    ogImage: Boolean(ogImage),
    jsonLd: [...new Set(jsonLdTypes)],
    words,
    images: images.length,
    imagesWithoutAlt,
    imagesEmptyAlt,
    internalLinks: internal.length,
    internalTargets: uniqueInternal,
    internalAnchors: [...new Set(internal.map((l) => l.anchor).filter(Boolean))].slice(0, 40),
    externalLinks: externalSet.size,
    externalDomains: [...externalSet].sort(),
    noindex,
    inSitemap: sitemapPaths.has(entry.path),
    inboundLinks: 0, // segunda pasada
    inboundFrom: [],
  };
}

// --- Main ----------------------------------------------------------------------------
const all = loadDist();
const sitemap = readSitemapPaths();
const robots = readRobots();

const pages = all.filter((e) => isPublic(e.path)).map((e) => analyze(e, sitemap.paths));
const byPath = new Map(pages.map((p) => [p.path, p]));
const allPaths = new Set(all.map((e) => e.path));

// Entrantes (solo desde páginas públicas; un link por página origen).
for (const p of pages) {
  for (const target of p.internalTargets) {
    const t = byPath.get(target);
    if (t) t.inboundFrom.push(p.path);
  }
}
for (const p of pages) {
  p.inboundFrom = [...new Set(p.inboundFrom)].sort();
  p.inboundLinks = p.inboundFrom.length;
}

// Reciprocidad de hreflang: cada alternate existe y devuelve un alternate hacia acá.
for (const p of pages) {
  const issues = [];
  if (p.hreflang.length === 0) {
    p.hreflangOk = true; // legales solo EN: sin hreflang no es un error
    continue;
  }
  const self = p.hreflang.find((h) => h.lang !== 'x-default' && h.path === p.path);
  if (!self) issues.push('no se incluye a sí misma');
  if (!p.hreflang.some((h) => h.lang === 'x-default')) issues.push('sin x-default');
  for (const h of p.hreflang) {
    if (!h.path) {
      issues.push(`${h.lang}: href inválido`);
      continue;
    }
    if (!allPaths.has(h.path)) {
      issues.push(`${h.lang} → ${h.path} no existe en dist`);
      continue;
    }
    if (h.path === p.path) continue;
    const other = byPath.get(h.path);
    if (!other) {
      issues.push(`${h.lang} → ${h.path} es una página excluida`);
    } else if (!other.hreflang.some((x) => x.path === p.path)) {
      issues.push(`${h.lang} → ${h.path} no devuelve hreflang a ${p.path}`);
    }
  }
  p.hreflangIssues = issues;
  p.hreflangOk = issues.length === 0;
}

// --- Agregados ---------------------------------------------------------------------
const groupDupes = (key) => {
  const map = new Map();
  for (const p of pages) {
    const v = p[key];
    if (!v) continue;
    if (!map.has(v)) map.set(v, []);
    map.get(v).push(p.path);
  }
  return [...map.entries()].filter(([, paths]) => paths.length > 1).map(([value, paths]) => ({ value, paths }));
};
const pick = (fn) => pages.filter(fn).map((p) => p.path);

const issues = {
  duplicateTitles: groupDupes('title'),
  duplicateDescriptions: groupDupes('description'),
  missingTitles: pick((p) => !p.title),
  shortTitles: pick((p) => p.title && p.titleLength < 30),
  longTitles: pick((p) => p.titleLength > 60),
  missingDescriptions: pick((p) => !p.description),
  shortDescriptions: pick((p) => p.description && p.descriptionLength < 70),
  longDescriptions: pick((p) => p.descriptionLength > 155),
  thin: pick((p) => p.words < 600 && p.words >= 300),
  veryThin: pick((p) => p.words < 300),
  noUniqueH1: pick((p) => p.h1Count !== 1),
  brokenHreflang: pages.filter((p) => !p.hreflangOk).map((p) => ({ path: p.path, issues: p.hreflangIssues })),
  badCanonical: pick((p) => !p.canonicalOk),
  missingOgImage: pick((p) => !p.ogImage),
  noJsonLd: pick((p) => p.jsonLd.length === 0),
  imagesWithoutAlt: pages.filter((p) => p.imagesWithoutAlt > 0).map((p) => ({ path: p.path, count: p.imagesWithoutAlt })),
  fewInbound: pages.filter((p) => p.inboundLinks < 3).map((p) => ({ path: p.path, inbound: p.inboundLinks })),
  noindexInSitemap: pick((p) => p.noindex && p.inSitemap),
  indexableNotInSitemap: pick((p) => !p.noindex && !p.inSitemap),
};

const sitemapCheck = {
  file: sitemap.file ? sitemap.file.replace(DIST, 'dist') : null,
  urls: sitemap.paths.size,
  urlsNotInDist: [...sitemap.paths].filter((p) => !allPaths.has(p)),
  internalPagesInSitemap: [...sitemap.paths].filter(isInternal),
  noindexInSitemap: issues.noindexInSitemap,
  indexableMissing: issues.indexableNotInSitemap,
};

const perLocale = {};
for (const p of pages) {
  perLocale[p.locale] ??= { pages: 0, words: 0, thin: 0 };
  perLocale[p.locale].pages++;
  perLocale[p.locale].words += p.words;
  if (p.words < 600) perLocale[p.locale].thin++;
}
for (const l of Object.values(perLocale)) l.avgWords = Math.round(l.words / l.pages);

const summary = {
  pagesAnalyzed: pages.length,
  pagesInDist: all.length,
  excludedInternal: all.length - pages.length,
  avgWords: Math.round(pages.reduce((a, p) => a + p.words, 0) / Math.max(pages.length, 1)),
  perLocale,
  issueCounts: Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.length])),
  robots: { ...robots, coversGestion: robots.disallow.some((d) => d.startsWith('/gestion')) },
  sitemap: { urls: sitemapCheck.urls, urlsNotInDist: sitemapCheck.urlsNotInDist.length, internalPages: sitemapCheck.internalPagesInSitemap.length },
  thresholds: { title: [30, 60], description: [70, 155], thin: 600, veryThin: 300, fewInbound: 3 },
};

const out = writeJson('onpage', { site: SITE, summary, issues, sitemap: sitemapCheck, robots, pages });

console.log(`onpage: ${pages.length} páginas analizadas (${all.length} en dist) → ${out}`);
for (const [k, v] of Object.entries(summary.issueCounts)) if (v) console.log(`  ${k}: ${v}`);
