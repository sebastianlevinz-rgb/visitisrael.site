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
      const rel = p.slice(base.length).replace(/\\/g, '/').replace(/\/index\.html$/, '');
      out.push(rel === '' ? '/' : rel);
    }
  }
  return out;
}
const distDir = new URL('dist/', ROOT).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const NEW = new Set(builtUrls(distDir));
const OLD = read('gestion/rebuild/urls-viejas.txt').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

// ---------------------------------------------------------------------------
// Reglas de destino por URL vieja (sin prefijo de idioma). Devuelve un path EN.
const KEPT_REGIONS = ['jerusalem', 'tel-aviv', 'dead-sea', 'galilee', 'eilat', 'negev', 'haifa'];
const MERGED_REGIONS = { akko: 'haifa', caesarea: 'haifa', golan: 'galilee', nazareth: 'galilee' };

const has = (slug, re) => re.test(slug);

function targetFor(rest) {
  const segs = rest.split('/').filter(Boolean);
  const first = segs[0] ?? '';

  // Páginas internas que nunca debieron ser públicas.
  if (['dashboard', 'pitch', 'competitors', 'content-library'].includes(first)) return '/';

  // Dónde dormir por ciudad → guía de hoteles de esa ciudad.
  if (first === 'where-to-stay') {
    const city = segs[1] ?? '';
    if (city === 'jerusalem') return '/best-hotels-jerusalem';
    if (city === 'tel-aviv') return '/best-hotels-tel-aviv';
    if (city === 'dead-sea') return '/dead-sea-hotels-guide';
    return '/first-time-in-israel';
  }

  // Rutas de transporte → primera vez (sección cómo moverse).
  if (first === 'transport') return '/first-time-in-israel';

  // Itinerarios dados de baja → el más parecido.
  if (first === 'itineraries' && segs[1]) {
    const it = segs[1];
    if (it === '3-days-in-jerusalem') return '/jerusalem';
    if (it === '2-days-in-tel-aviv') return '/tel-aviv';
    if (it === '5-days-in-israel') return '/itineraries/7-days-in-israel';
    if (it === '14-days-in-israel') return '/itineraries/10-days-in-israel';
  }

  // Regiones y sus atracciones.
  if (KEPT_REGIONS.includes(first)) return `/${first}`;
  if (MERGED_REGIONS[first]) return `/${MERGED_REGIONS[first]}`;

  // Guías y herramientas (un solo segmento): por intención.
  const s = first;
  const city = (fallback) => {
    if (has(s, /jerusalem|bethlehem|jericho|old-city|western-wall|mount-of-olives|yad-vashem/)) return '/jerusalem';
    if (has(s, /tel-aviv|jaffa|neve-tzedek|carmel-market/)) return '/tel-aviv';
    if (has(s, /dead-sea|masada|ein-gedi|ein-bokek|qumran/)) return '/dead-sea';
    if (has(s, /eilat|red-sea|timna|petra|aqaba/)) return '/eilat';
    if (has(s, /negev|mitzpe|ramon|beersheba|be-er-sheva|arava|arad|sde-boker|avdat/)) return '/negev';
    if (has(s, /galilee|nazareth|tiberias|golan|safed|tzfat|kinneret|capernaum|jordan-river|hermon/)) return '/galilee';
    if (has(s, /haifa|akko|acre|caesarea|carmel|bahai|zichron|netanya|rosh-hanikra/)) return '/haifa';
    return fallback;
  };

  if (has(s, /visa|(^|-)eta(-|$)|passport|border|customs|entry-requirement|working-holiday|immigration/)) return '/visa-information';
  if (has(s, /safe|safety|security|emergency|scam/)) return '/is-israel-safe';
  if (has(s, /hotel|hostel|accommodation|where-to-stay|airbnb|guesthouse|kibbutz-hotel|resort|zimmer/)) {
    if (has(s, /tel-aviv|jaffa/)) return '/best-hotels-tel-aviv';
    if (has(s, /jerusalem/)) return '/best-hotels-jerusalem';
    if (has(s, /dead-sea|ein-bokek/)) return '/dead-sea-hotels-guide';
    return city('/best-hotels-jerusalem');
  }
  if (has(s, /tour|day-trip|excursion|guided|shore/)) {
    if (has(s, /dead-sea|masada|ein-gedi/)) return '/dead-sea-tours-compared';
    if (has(s, /tel-aviv|jaffa|caesarea|haifa|cruise|shore/)) return '/day-trips-from-tel-aviv';
    return '/jerusalem-tours-compared';
  }
  if (has(s, /car-|-car|driving|drive|road-trip|rental|parking|(^|-)ev(-|$)|motorhome|scenic/)) return '/car-rental-israel';
  if (has(s, /january|february|march|april|may|june|july|august|september|october|november|december|season|weather|when-to|best-time|festival|holiday|passover|purim|rosh-hashanah|sukkot|hanukkah|shavuot|yom-|easter|christmas|ramadan|tu-bishvat|lag-baomer|golden-hour|shabbat-calendar|shabbat-countdown|wildflower|bloom/)) return city('/best-time-to-visit-israel');
  if (has(s, /itinerary|days-in|day-in|(^|-)\d+-day|how-many-days|effective-days|trip-length|build-your-trip/)) return '/itineraries/7-days-in-israel';
  return city('/first-time-in-israel');
}

// ---------------------------------------------------------------------------
// Asignación URL vieja → destino (con idioma)
const mapping = []; // { from, to }
for (const url of OLD) {
  if (NEW.has(url)) continue; // sigue existiendo
  const m = url.match(/^\/(fr|de|es)(\/.*|$)/);
  const lang = m ? m[1] : '';
  const rest = m ? m[2] || '/' : url;
  if (rest === '/' ) continue; // home de cada idioma sigue existiendo
  const en = targetFor(rest);
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
const rest = mapping.filter((e) => !regionRuleCovers(e.rest));
pushGrouped('', (e) => e.en, rest.filter((e) => !e.lang));
const allLocales = (en) => LOCALES.every((l) => NEW.has(en === '/' ? `/${l}` : `/${l}${en}`));
const loc = rest.filter((e) => e.lang);
pushGrouped('/:lang(fr|de|es)', (e) => (allLocales(e.en) ? (e.en === '/' ? '/:lang' : `/:lang${e.en}`) : e.en), loc);

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
