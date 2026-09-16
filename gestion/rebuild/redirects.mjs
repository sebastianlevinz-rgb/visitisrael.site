/**
 * Generador del mapa de redirects 301 del rebuild v3.
 *
 * Entrada:
 *   gestion/rebuild/urls-viejas.txt  — las 2.017 URLs del sitio de 2.018 páginas
 *   dist/                            — el build del sitio nuevo (URLs que existen)
 *
 * Salida:
 *   vercel.json → bloque "redirects" (reemplazado entero)
 *   gestion/rebuild/mapa-redirects.csv — URL vieja → destino, una por línea, revisable
 *
 * Verificación (el script falla si algo no cierra):
 *   1. Toda URL vieja que ya no existe queda cubierta por exactamente un redirect.
 *   2. Todo destino existe en el sitio nuevo.
 *   3. Ninguna URL del sitio nuevo es capturada por un redirect.
 *   4. Menos de 1.000 reglas (Vercel acepta 2.048 rutas en total).
 *
 * Uso: node gestion/rebuild/redirects.mjs   (después de `pnpm build`)
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { targetFor, KEPT_REGIONS, MERGED_REGIONS } from './destinos.mjs';

const ROOT = new URL('../../', import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), 'utf8');
const LOCALES = ['fr', 'de', 'es'];

// ---------------------------------------------------------------------------
// URLs nuevas (lo que existe después del recorte)
function builtUrls(dir, base = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...builtUrls(p, base));
    else if (name === 'index.html') {
      const rel = p.slice(base.length).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '');
      out.push(rel === '' ? '/' : `/${rel.replace(/^\/+/, '')}`);
    }
  }
  return out;
}
const distDir = new URL('dist/', ROOT).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const NEW = new Set(builtUrls(distDir));
const OLD = read('gestion/rebuild/urls-viejas.txt').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

// ---------------------------------------------------------------------------
// Asignación URL vieja → destino (con idioma)
const mapping = []; // { from, to }
for (const url of OLD) {
  if (NEW.has(url)) continue; // sigue existiendo
  const m = url.match(/^\/(fr|de|es)(\/.*|$)/);
  const lang = m ? m[1] : '';
  const rest = m ? m[2] || '/' : url;
  if (rest === '/' ) continue; // home de cada idioma sigue existiendo
  const en = targetFor(rest).to;
  const localized = lang ? (en === '/' ? `/${lang}` : `/${lang}${en}`) : en;
  const to = lang && NEW.has(localized) ? localized : en;
  mapping.push({ from: url, to, lang, rest, en });
}

// ---------------------------------------------------------------------------
// Compresión en reglas de Vercel
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rules = [];
const MAX_SOURCE = 3500;

// 1) Regiones y sus subpáginas, con patrón (en vez de una regla por atracción).
const regionAlt = KEPT_REGIONS.join('|');
const mergedByTarget = {};
for (const [from, to] of Object.entries(MERGED_REGIONS)) (mergedByTarget[to] ??= []).push(from);
const regionRuleCovers = (rest) => {
  const segs = rest.split('/').filter(Boolean);
  return (KEPT_REGIONS.includes(segs[0]) && segs.length > 1) || Boolean(MERGED_REGIONS[segs[0]]);
};
rules.push({ source: `/:region(${regionAlt})/:rest+`, destination: '/:region', permanent: true });
rules.push({ source: `/:lang(fr|de|es)/:region(${regionAlt})/:rest+`, destination: '/:lang/:region', permanent: true });
for (const [to, froms] of Object.entries(mergedByTarget)) {
  rules.push({ source: `/:old(${froms.join('|')})/:rest*`, destination: `/${to}`, permanent: true });
  rules.push({ source: `/:lang(fr|de|es)/:old(${froms.join('|')})/:rest*`, destination: `/:lang/${to}`, permanent: true });
}

// 2) Resto: agrupado por destino EN; los de idioma usan /:lang/destino si existe en los 3 idiomas.
const pushGrouped = (prefixSource, destinationFor, entries) => {
  const byDest = {};
  for (const e of entries) (byDest[destinationFor(e)] ??= new Set()).add(e.rest);
  for (const [dest, rests] of Object.entries(byDest)) {
    let chunk = [];
    const flush = () => {
      if (!chunk.length) return;
      rules.push({ source: `${prefixSource}/:old(${chunk.map((r) => esc(r.slice(1))).join('|')})`, destination: dest, permanent: true });
      chunk = [];
    };
    for (const r of [...rests].sort()) {
      const candidate = [...chunk, r];
      const len = prefixSource.length + candidate.join('|').length + 12;
      if (len > MAX_SOURCE) flush();
      chunk.push(r);
    }
    flush();
  }
};
const allLocales = (en) => LOCALES.every((l) => NEW.has(en === '/' ? `/${l}` : `/${l}${en}`));
const localizedDest = (e) => (allLocales(e.en) ? (e.en === '/' ? '/:lang' : `/:lang${e.en}`) : e.en);
const rest = mapping.filter((e) => !regionRuleCovers(e.rest));

// Rutas de varios segmentos (/transport/x, /itineraries/x, /where-to-stay/x, /dashboard/x):
// una regla literal por ruta — una "/" dentro de una alternativa rompería la regla entera.
const multi = rest.filter((e) => e.rest.split('/').filter(Boolean).length > 1);
const seen = new Set();
for (const e of multi) {
  const key = `${e.lang ? 'loc' : 'en'}${e.rest}`;
  if (seen.has(key)) continue;
  seen.add(key);
  if (e.lang) rules.push({ source: `/:lang(fr|de|es)${e.rest}`, destination: localizedDest(e), permanent: true });
  else rules.push({ source: e.rest, destination: e.en, permanent: true });
}

// Un solo segmento: agrupado por destino.
const single = rest.filter((e) => e.rest.split('/').filter(Boolean).length === 1);
pushGrouped('', (e) => e.en, single.filter((e) => !e.lang));
pushGrouped('/:lang(fr|de|es)', localizedDest, single.filter((e) => e.lang));

// ---------------------------------------------------------------------------
// Simulador del subconjunto de sintaxis emitido (path-to-regexp):
//   /:name(alt|alt)  /:name+  /:name*   y texto literal
function compile(source) {
  const names = [];
  let re = '^';
  const parts = source.split('/').filter(Boolean);
  for (const part of parts) {
    const m = part.match(/^:(\w+)(?:\((.*)\))?([+*])?$/);
    if (!m) { re += `/${esc(part)}`; continue; }
    const [, name, alt, mod] = m;
    names.push(name);
    if (mod === '+') re += `/(.+)`;
    else if (mod === '*') re += `(?:/(.*))?`;
    else re += `/(${alt ?? '[^/]+'})`;
  }
  return { re: new RegExp(`${re}$`), names };
}
const compiled = rules.map((r) => ({ ...r, ...compile(r.source) }));
function resolve(url) {
  const hits = [];
  for (const r of compiled) {
    const m = url.match(r.re);
    if (!m) continue;
    const vals = Object.fromEntries(r.names.map((n, i) => [n, m[i + 1] ?? '']));
    hits.push(r.destination.replace(/:(\w+)/g, (_, n) => vals[n]));
  }
  return hits;
}

// ---------------------------------------------------------------------------
// Verificación
const errors = [];
for (const e of mapping) {
  const hits = resolve(e.from);
  if (hits.length !== 1) errors.push(`${e.from}: ${hits.length} reglas coinciden (${hits.join(', ')})`);
  else if (!NEW.has(hits[0])) errors.push(`${e.from} → ${hits[0]} (el destino no existe)`);
}
for (const url of NEW) {
  const hits = resolve(url);
  if (hits.length) errors.push(`URL nueva capturada por un redirect: ${url} → ${hits[0]}`);
}
if (rules.length >= 1000) errors.push(`${rules.length} reglas: demasiadas`);

const oldGone = OLD.filter((u) => !NEW.has(u));
console.log(`URLs viejas: ${OLD.length} · siguen existiendo: ${OLD.length - oldGone.length} · redirigidas: ${mapping.length}`);
console.log(`Sitio nuevo: ${NEW.size} URLs · reglas de redirect: ${rules.length}`);
const byDest = {};
for (const e of mapping) byDest[resolve(e.from)[0]] = (byDest[resolve(e.from)[0]] ?? 0) + 1;
for (const [d, n] of Object.entries(byDest).sort((a, b) => b[1] - a[1]).slice(0, 12)) console.log(`  ${String(n).padStart(4)} → ${d}`);

if (errors.length) {
  console.error(`\nFALLA: ${errors.length} problema(s)`);
  for (const e of errors.slice(0, 25)) console.error(`  · ${e}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Escritura
const vercel = JSON.parse(read('vercel.json'));
vercel.redirects = rules.map(({ source, destination, permanent }) => ({ source, destination, permanent }));
writeFileSync(new URL('vercel.json', ROOT), `${JSON.stringify(vercel, null, 2)}\n`);
writeFileSync(
  new URL('gestion/rebuild/mapa-redirects.csv', ROOT),
  ['url_vieja,destino', ...mapping.map((e) => `${e.from},${resolve(e.from)[0]}`)].join('\n') + '\n',
);
console.log('\nOK: vercel.json y gestion/rebuild/mapa-redirects.csv escritos. Cada URL vieja tiene un destino que existe.');
