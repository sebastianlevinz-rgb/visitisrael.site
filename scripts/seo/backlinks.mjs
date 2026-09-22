/**
 * Auditoría de backlinks con DataForSEO → data/seo/backlinks.json
 *
 *   node scripts/seo/backlinks.mjs            # usa caché en data/seo/cache/ (gitignored)
 *   node scripts/seo/backlinks.mjs --no-cache # fuerza llamadas nuevas (cuesta plata)
 *   node scripts/seo/backlinks.mjs --skip-verify  # no verifica URLs contra producción
 *
 * Qué hace:
 *  1. backlinks/summary/live de nuestro dominio y 10 competidores.
 *  2. referring_domains/live + backlinks/live (one_per_domain) de visitisrael.site;
 *     cruza cada URL enlazada con gestion/rebuild/mapa-redirects.csv y vercel.json y
 *     la verifica contra producción: 200 directo, redirect a 200, o 404 (link perdido).
 *  3. referring_domains/live (50) de 3 competidores → topReferring y dominios que
 *     enlazan a 2+ competidores y no a nosotros.
 *  4. serp/google/organic/live/regular en EN y ES para listas de blogs/recursos donde
 *     pedir un enlace (máximo 15 consultas).
 *
 * Presupuesto duro: US$3 por corrida (BUDGET_USD). Cada respuesta trae `cost`; se acumula
 * y se registra en data/seo/costs.json. Las keys (DATAFORSEO_LOGIN/PASSWORD) se leen de
 * .env y NUNCA se imprimen ni se escriben.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// lib.mjs (contrato compartido) con fallback si su dependencia no está instalada
// ---------------------------------------------------------------------------
const ROOT_LOCAL = fileURLToPath(new URL('../../', import.meta.url));

function readEnvLocal() {
  const out = { ...process.env };
  for (const file of ['.env', '.env.local']) {
    let text;
    try {
      text = readFileSync(join(ROOT_LOCAL, file), 'utf8');
    } catch {
      continue;
    }
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m) continue;
      let value = m[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (out[m[1]] === undefined) out[m[1]] = value;
    }
  }
  return out;
}

function writeJsonLocal(name, data) {
  const file = /[\\/]/.test(name) ? join(ROOT_LOCAL, name) : join(ROOT_LOCAL, 'data', 'seo', name.endsWith('.json') ? name : `${name}.json`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ generatedAt: new Date().toISOString(), ...data }, null, 2) + '\n', 'utf8');
  return file;
}

let lib;
try {
  lib = await import('./lib.mjs');
} catch (err) {
  console.warn(`[backlinks] lib.mjs no se pudo importar (${err?.message?.split('\n')[0]}); uso fallback local.`);
  lib = { readEnv: readEnvLocal, writeJson: writeJsonLocal, ROOT: ROOT_LOCAL, DATA_DIR: join(ROOT_LOCAL, 'data', 'seo'), SITE: 'https://visitisrael.site' };
}
const { readEnv, writeJson } = lib;
const ROOT = lib.ROOT ?? ROOT_LOCAL;
const DATA_DIR = lib.DATA_DIR ?? join(ROOT, 'data', 'seo');
const SITE = lib.SITE ?? 'https://visitisrael.site';
const CACHE_DIR = join(DATA_DIR, 'cache');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const OUR_DOMAIN = 'visitisrael.site';
const DOMAINS = [
  OUR_DOMAIN,
  'touristisrael.com',
  'backpackisrael.com',
  'secrettelaviv.com',
  'funinjerusalem.com',
  'viajeroscallejeros.com',
  'losviajesdedomi.com',
  'kommwirmachendaseinfach.de',
  'sommertage.com',
  'hike-israel.com',
  'beinharimtours.com',
];
const COMPETITORS_TOP = ['touristisrael.com', 'backpackisrael.com', 'secrettelaviv.com'];
const SERP_QUERIES = [
  { keyword: 'israel travel blogs', lang: 'en' },
  { keyword: 'best israel travel blogs', lang: 'en' },
  { keyword: '"israel travel resources" links', lang: 'en' },
  { keyword: 'israel travel blog list 2026', lang: 'en' },
  { keyword: '"write for us" israel travel', lang: 'en' },
  { keyword: 'intitle:"israel" "travel blogs"', lang: 'en' },
  { keyword: 'blogs de viajes israel', lang: 'es' },
  { keyword: '"guía israel" recursos', lang: 'es' },
  { keyword: 'mejores blogs de viajes a israel', lang: 'es' },
  { keyword: 'israel reiseblog liste', lang: 'de' },
];
const SERP_LOCALES = {
  en: { location_code: 2840, language_code: 'en' }, // Estados Unidos
  es: { location_code: 2724, language_code: 'es' }, // España
  de: { location_code: 2276, language_code: 'de' }, // Alemania
};
const BUDGET_USD = 3;
const MAX_SERP = 15;
const API = 'https://api.dataforseo.com/v3/';

const args = new Set(process.argv.slice(2));
const USE_CACHE = !args.has('--no-cache');
const VERIFY = !args.has('--skip-verify');

// ---------------------------------------------------------------------------
// Cliente DataForSEO con caché y contador de costo
// ---------------------------------------------------------------------------
const env = readEnv();
const login = env.DATAFORSEO_LOGIN;
const password = env.DATAFORSEO_PASSWORD;
if (!login || !password) {
  console.error('Faltan DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD en .env');
  process.exit(1);
}
const AUTH = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');

const state = { costUsd: 0, calls: 0, cachedCalls: 0, errors: [] };

function cacheKey(path, body) {
  return createHash('sha1').update(path + '\n' + JSON.stringify(body)).digest('hex');
}

/**
 * POST a DataForSEO. Devuelve { ok, result, error, cached }.
 * `result` es tasks[0].result (array) cuando la tarea salió 20000.
 */
async function dfs(path, body, label) {
  const key = cacheKey(path, body);
  const cacheFile = join(CACHE_DIR, `${key}.json`);
  if (USE_CACHE && existsSync(cacheFile)) {
    try {
      const cached = JSON.parse(readFileSync(cacheFile, 'utf8'));
      state.cachedCalls++;
      return { ...interpret(cached.response, label), cached: true };
    } catch {
      /* caché corrupta: seguimos a la red */
    }
  }
  if (state.costUsd >= BUDGET_USD) {
    const msg = `Presupuesto agotado (US$${state.costUsd.toFixed(3)} >= ${BUDGET_USD}); se omite ${label}`;
    state.errors.push({ where: label, message: msg });
    return { ok: false, error: msg, cached: false };
  }
  let res, json;
  try {
    res = await fetch(API + path, {
      method: 'POST',
      headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000),
    });
    json = await res.json();
  } catch (err) {
    const msg = `${label}: error de red/parse: ${err?.message ?? err}`;
    state.errors.push({ where: label, message: msg });
    return { ok: false, error: msg, cached: false };
  }
  state.calls++;
  const cost = Number(json?.cost ?? 0);
  if (Number.isFinite(cost)) state.costUsd += cost;
  console.log(`[dfs] ${label} → ${json?.status_code} ${json?.status_message ?? ''} (US$${cost.toFixed(4)}, acumulado US$${state.costUsd.toFixed(4)})`);
  const out = interpret(json, label);
  if (out.ok || json?.status_code === 20000) {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cacheFile, JSON.stringify({ path, body, at: new Date().toISOString(), response: json }, null, 2), 'utf8');
  }
  return { ...out, cached: false };
}

function interpret(json, label) {
  if (!json || json.status_code !== 20000) {
    const msg = `${label}: ${json?.status_code ?? '?'} ${json?.status_message ?? 'sin respuesta'}`;
    state.errors.push({ where: label, message: msg });
    return { ok: false, error: msg };
  }
  const task = json.tasks?.[0];
  if (!task || task.status_code !== 20000) {
    const msg = `${label}: tarea ${task?.status_code ?? '?'} ${task?.status_message ?? ''}`.trim();
    state.errors.push({ where: label, message: msg });
    return { ok: false, error: msg, taskStatus: task?.status_code };
  }
  return { ok: true, result: task.result ?? [] };
}

// ---------------------------------------------------------------------------
// Redirects: mapa CSV + reglas de vercel.json
// ---------------------------------------------------------------------------
function loadRedirectMap() {
  const map = new Map();
  try {
    const csv = readFileSync(join(ROOT, 'gestion', 'rebuild', 'mapa-redirects.csv'), 'utf8');
    for (const line of csv.split(/\r?\n/).slice(1)) {
      if (!line.trim()) continue;
      const [from, to] = line.split(',').map((s) => s.trim());
      if (from) map.set(from, to);
    }
  } catch (err) {
    state.errors.push({ where: 'mapa-redirects.csv', message: String(err?.message ?? err) });
  }
  return map;
}

/** Convierte un `source` de vercel.json (path-to-regexp) a RegExp aproximada. */
function vercelSourceToRegex(source) {
  let re = '';
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    if (ch === ':') {
      let j = i + 1;
      while (j < source.length && /[A-Za-z0-9_]/.test(source[j])) j++;
      let pattern = '[^/]+';
      if (source[j] === '(') {
        let depth = 0;
        let k = j;
        for (; k < source.length; k++) {
          if (source[k] === '(') depth++;
          else if (source[k] === ')') {
            depth--;
            if (depth === 0) break;
          }
        }
        pattern = source.slice(j + 1, k);
        j = k + 1;
      }
      const mod = source[j];
      if (mod === '+') {
        re += `(?:${pattern})(?:/(?:${pattern}))*`;
        j++;
      } else if (mod === '*') {
        // `/:rest*` → la barra previa también es opcional
        if (re.endsWith('/')) re = re.slice(0, -1);
        re += `(?:/(?:${pattern})(?:/(?:${pattern}))*)?`;
        j++;
      } else if (mod === '?') {
        re += `(?:${pattern})?`;
        j++;
      } else {
        re += `(?:${pattern})`;
      }
      i = j;
    } else {
      re += ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      i++;
    }
  }
  return new RegExp(`^${re}/?$`, 'i');
}

function loadVercelRules() {
  try {
    const json = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
    return (json.redirects ?? []).map((r) => ({ re: vercelSourceToRegex(r.source), destination: r.destination, source: r.source }));
  } catch (err) {
    state.errors.push({ where: 'vercel.json', message: String(err?.message ?? err) });
    return [];
  }
}

function pathOfUrl(url) {
  try {
    const u = new URL(url);
    let p = decodeURIComponent(u.pathname);
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  } catch {
    return null;
  }
}

/** Sigue redirects a mano contra producción; devuelve la cadena de códigos y el estado final. */
async function probe(url, maxHops = 6) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop < maxHops; hop++) {
    let res;
    try {
      res = await fetch(current, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(20_000), headers: { 'User-Agent': 'visitisrael-seo-audit/1.0' } });
      if (res.status === 405 || res.status === 403) {
        res = await fetch(current, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(20_000), headers: { 'User-Agent': 'visitisrael-seo-audit/1.0' } });
      }
    } catch (err) {
      chain.push(0);
      return { chain, finalUrl: current, status: 0, error: String(err?.message ?? err) };
    }
    chain.push(res.status);
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      current = new URL(res.headers.get('location'), current).toString();
      continue;
    }
    return { chain, finalUrl: current, status: res.status };
  }
  return { chain, finalUrl: current, status: chain.at(-1) ?? 0, error: 'demasiados saltos' };
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i], i);
      }
    }),
  );
  return out;
}

// ---------------------------------------------------------------------------
// 1. Resumen de backlinks por dominio
// ---------------------------------------------------------------------------
const domains = [];
let backlinksApiDown = false;
for (const domain of DOMAINS) {
  const r = await dfs('backlinks/summary/live', [{ target: domain, include_subdomains: true, backlinks_status_type: 'live', internal_list_limit: 10 }], `summary ${domain}`);
  const entry = {
    domain,
    rank: null,
    backlinks: null,
    referringDomains: null,
    referringMainDomains: null,
    brokenBacklinks: null,
    referringIps: null,
    internalLinksCount: null,
    externalLinksCount: null,
    firstSeen: null,
    topReferring: [],
  };
  if (r.ok) {
    const s = r.result?.[0] ?? {};
    entry.rank = s.rank ?? null;
    entry.backlinks = s.backlinks ?? null;
    entry.referringDomains = s.referring_domains ?? null;
    entry.referringMainDomains = s.referring_main_domains ?? null;
    entry.brokenBacklinks = s.broken_backlinks ?? null;
    entry.referringIps = s.referring_ips ?? null;
    entry.internalLinksCount = s.internal_links_count ?? null;
    entry.externalLinksCount = s.external_links_count ?? null;
    entry.firstSeen = s.first_seen ?? null;
  } else {
    entry.error = r.error;
    // 40200 = sin crédito / endpoint no habilitado, 40100 = sin acceso
    if (r.taskStatus && [40100, 40200, 40201, 40202, 40203, 40204].includes(r.taskStatus)) backlinksApiDown = true;
  }
  domains.push(entry);
  if (backlinksApiDown) break;
}

// Fallback si el API de backlinks no está disponible: domain_rank_overview (Labs)
if (backlinksApiDown) {
  state.errors.push({ where: 'backlinks API', message: 'API de backlinks no disponible; se usa dataforseo_labs/google/domain_rank_overview/live como aproximación (sin conteo de backlinks).' });
  for (const domain of DOMAINS) {
    if (domains.some((d) => d.domain === domain && d.rank !== null)) continue;
    const r = await dfs('dataforseo_labs/google/domain_rank_overview/live', [{ target: domain, location_code: 2840, language_code: 'en' }], `rank_overview ${domain}`);
    let entry = domains.find((d) => d.domain === domain);
    if (!entry) {
      entry = { domain, rank: null, backlinks: null, referringDomains: null, referringMainDomains: null, brokenBacklinks: null, topReferring: [] };
      domains.push(entry);
    }
    if (r.ok) {
      const item = r.result?.[0]?.items?.[0]?.metrics?.organic ?? {};
      entry.labsOrganic = { etv: item.etv ?? null, count: item.count ?? null, pos_1: item.pos_1 ?? null, pos_2_3: item.pos_2_3 ?? null, pos_4_10: item.pos_4_10 ?? null };
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Quién nos enlaza + cruce con redirects + verificación en producción
// ---------------------------------------------------------------------------
const ourReferring = [];
const ourBacklinks = [];
const lostLinks = [];
let redirectedCount = 0;
let liveCount = 0;
let toxicCount = 0;
/** Anchors/títulos típicos de venta de backlinks, PBN, casino, farmacia. */
const SPAM_ANCHOR = /backlink|pbn|niche edit|link building|buy links|\bDA\s?\d+|casino|gacor|slot|viagra|clonidine|betwinner/i;

if (!backlinksApiDown) {
  const rd = await dfs(
    'backlinks/referring_domains/live',
    [{ target: OUR_DOMAIN, include_subdomains: true, backlinks_status_type: 'live', limit: 100, order_by: ['rank,desc'] }],
    `referring_domains ${OUR_DOMAIN}`,
  );
  if (rd.ok) {
    for (const it of rd.result?.[0]?.items ?? []) {
      const nofollow = it.referring_links_attributes?.nofollow ?? 0;
      const spam = it.backlinks_spam_score ?? 0;
      ourReferring.push({
        toxic: spam >= 50,
        domain: it.domain,
        rank: it.rank ?? null,
        backlinks: it.backlinks ?? null,
        referringPages: it.referring_pages ?? null,
        firstSeen: it.first_seen ?? null,
        lostDate: it.lost_date ?? null,
        dofollow: (it.backlinks ?? 0) - nofollow > 0,
        nofollowLinks: nofollow,
        spamScore: it.backlinks_spam_score ?? null,
        brokenBacklinks: it.broken_backlinks ?? null,
        countries: it.referring_links_countries ? Object.keys(it.referring_links_countries) : [],
      });
    }
  }

  const bl = await dfs(
    'backlinks/backlinks/live',
    [{ target: OUR_DOMAIN, include_subdomains: true, backlinks_status_type: 'live', mode: 'one_per_domain', limit: 200, order_by: ['rank,desc'] }],
    `backlinks ${OUR_DOMAIN}`,
  );
  if (bl.ok) {
    const redirectMap = loadRedirectMap();
    const vercelRules = loadVercelRules();
    const items = bl.result?.[0]?.items ?? [];
    const distinctTargets = [...new Set(items.map((it) => it.url_to).filter(Boolean))];

    const probes = new Map();
    if (VERIFY) {
      console.log(`[verify] ${distinctTargets.length} URLs enlazadas contra producción…`);
      const results = await mapLimit(distinctTargets, 6, async (u) => [u, await probe(u)]);
      for (const [u, p] of results) probes.set(u, p);
    }

    for (const it of items) {
      const path = pathOfUrl(it.url_to);
      const inCsv = path !== null && redirectMap.has(path);
      const vercelRule = path !== null ? vercelRules.find((r) => r.re.test(path)) : null;
      const p = probes.get(it.url_to);
      let status = p?.status ?? null;
      let classification;
      if (!p) classification = inCsv || vercelRule ? 'redirected (sin verificar)' : 'sin verificar';
      else if (p.chain[0] === 200) classification = 'live';
      else if (p.status === 200) classification = 'redirected';
      else if (p.status === 404 || p.status === 410) classification = 'lost';
      else classification = `otro (${p.status})`;

      if (classification === 'live') liveCount++;
      if (classification === 'redirected') redirectedCount++;

      const toxic = (it.backlink_spam_score ?? 0) >= 50 || SPAM_ANCHOR.test(it.anchor ?? '') || SPAM_ANCHOR.test(it.page_from_title ?? '');
      if (toxic) toxicCount++;

      const row = {
        toxic,
        fromDomain: it.domain_from,
        fromUrl: it.url_from,
        fromTitle: it.page_from_title ?? null,
        anchor: it.anchor ?? null,
        rank: it.rank ?? null,
        domainRank: it.domain_from_rank ?? null,
        spamScore: it.backlink_spam_score ?? null,
        dofollow: it.dofollow ?? null,
        firstSeen: it.first_seen ?? null,
        lastSeen: it.last_seen ?? null,
        linkedUrl: it.url_to,
        linkedPath: path,
        inRedirectMap: inCsv,
        vercelRule: vercelRule?.source ?? null,
        expectedDestination: inCsv ? redirectMap.get(path) : vercelRule?.destination ?? null,
        chain: p?.chain ?? null,
        finalUrl: p?.finalUrl ?? null,
        status,
        classification,
      };
      ourBacklinks.push(row);
      if (classification === 'lost' || (p && p.status === 0)) {
        lostLinks.push({ linkedUrl: it.url_to, fromDomain: it.domain_from, fromUrl: it.url_from, status: p?.status ?? 0, anchor: it.anchor ?? null, domainRank: it.domain_from_rank ?? null });
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Top referring de 3 competidores → oportunidades por intersección
// ---------------------------------------------------------------------------
const referringByCompetitor = new Map();
if (!backlinksApiDown) {
  for (const comp of COMPETITORS_TOP) {
    const r = await dfs(
      'backlinks/referring_domains/live',
      [{ target: comp, include_subdomains: true, backlinks_status_type: 'live', limit: 50, order_by: ['rank,desc'] }],
      `referring_domains ${comp}`,
    );
    const list = [];
    if (r.ok) {
      for (const it of r.result?.[0]?.items ?? []) {
        list.push({ domain: it.domain, rank: it.rank ?? null, backlinks: it.backlinks ?? null });
      }
    }
    referringByCompetitor.set(comp, list);
    const entry = domains.find((d) => d.domain === comp);
    if (entry) entry.topReferring = list;
  }
}

const ourReferringSet = new Set(ourReferring.map((r) => r.domain.toLowerCase()));
const compDomains = new Set(DOMAINS.map((d) => d.toLowerCase()));
const GENERIC = new Set([
  'google.com', 'youtube.com', 'facebook.com', 'instagram.com', 'pinterest.com', 'twitter.com', 'x.com', 'tiktok.com', 'linkedin.com',
  'reddit.com', 'quora.com', 'wikipedia.org', 'amazon.com', 'tripadvisor.com', 'blogspot.com', 'wordpress.com', 'medium.com', 'wix.com',
  'tumblr.com', 'flickr.com', 'yelp.com', 'apple.com', 'microsoft.com', 'bing.com', 'yahoo.com', 'vk.com', 't.me', 'whatsapp.com',
]);
const isGeneric = (d) => [...GENERIC].some((g) => d === g || d.endsWith('.' + g));

const intersect = new Map();
for (const [comp, list] of referringByCompetitor) {
  for (const it of list) {
    const d = it.domain.toLowerCase();
    if (!intersect.has(d)) intersect.set(d, { rank: it.rank, linksTo: new Set() });
    const e = intersect.get(d);
    e.linksTo.add(comp);
    e.rank = Math.max(e.rank ?? 0, it.rank ?? 0);
  }
}
const opportunities = [];
const oppDomains = new Set();
for (const [d, e] of [...intersect].sort((a, b) => (b[1].rank ?? 0) - (a[1].rank ?? 0))) {
  if (e.linksTo.size < 2 || ourReferringSet.has(d) || compDomains.has(d) || isGeneric(d)) continue;
  const list = [...e.linksTo];
  opportunities.push({
    url: `https://${d}`,
    title: d,
    why: `enlaza a ${list.slice(0, -1).join(', ')} y a ${list.at(-1)} (rank ${e.rank})`,
    source: 'competitors',
    rank: e.rank,
  });
  oppDomains.add(d);
}

// ---------------------------------------------------------------------------
// 4. SERP: listas de blogs / recursos donde pedir un enlace
// ---------------------------------------------------------------------------
const serp = [];
for (const q of SERP_QUERIES.slice(0, MAX_SERP)) {
  const loc = SERP_LOCALES[q.lang];
  const r = await dfs('serp/google/organic/live/regular', [{ keyword: q.keyword, ...loc, depth: 10 }], `serp ${q.lang} ${q.keyword}`);
  const results = [];
  if (r.ok) {
    for (const it of r.result?.[0]?.items ?? []) {
      if (it.type !== 'organic') continue;
      results.push({ position: it.rank_absolute ?? it.rank_group ?? null, url: it.url, title: it.title ?? null, domain: it.domain ?? null });
      if (results.length >= 10) break;
    }
  }
  serp.push({ keyword: q.keyword, lang: q.lang, location_code: loc.location_code, results });
  for (const it of results) {
    const d = (it.domain ?? '').toLowerCase().replace(/^www\./, '');
    if (!d || d === OUR_DOMAIN || isGeneric(d) || oppDomains.has(d) || ourReferringSet.has(d)) continue;
    oppDomains.add(d);
    opportunities.push({
      url: it.url,
      title: it.title ?? d,
      why: `aparece #${it.position} en Google (${q.lang.toUpperCase()}) para "${q.keyword}"${compDomains.has(d) ? ' — es competidor' : ''}`,
      source: 'serp',
      keyword: q.keyword,
    });
  }
}

// ---------------------------------------------------------------------------
// Salida
// ---------------------------------------------------------------------------
const ours = domains.find((d) => d.domain === OUR_DOMAIN);
const summary = {
  ourRank: ours?.rank ?? null,
  ourBacklinks: ours?.backlinks ?? null,
  ourReferringDomains: ours?.referringDomains ?? null,
  backlinksChecked: ourBacklinks.length,
  live: liveCount,
  redirected: redirectedCount,
  lost: lostLinks.length,
  toxic: toxicCount,
  unverified: ourBacklinks.filter((b) => b.classification.includes('sin verificar')).length,
  other: ourBacklinks.filter((b) => b.classification.startsWith('otro')).length,
  apiCalls: state.calls,
  cachedCalls: state.cachedCalls,
};

const notes = [
  'Índice de DataForSEO (arranca 2019). Se consultó también backlinks_status_type "all" (live + perdidos) el 2026-09-22: mismo resultado, sin enlaces históricos a URLs de 2017-2018. Google Search Console puede tener otra foto.',
  'toxic = spam score >= 50 o anchor/título de venta de backlinks, PBN, casino o farmacia. Candidatos a disavow, no a conservar.',
  'La verificación de estado se hace siguiendo redirects a mano contra producción (HEAD, fallback GET): chain[0] es el primer código y status el final.',
];

const outFile = writeJson('backlinks', {
  costUsd: Number(state.costUsd.toFixed(4)),
  summary,
  notes,
  domains,
  ourReferring,
  ourBacklinks,
  lostLinks,
  opportunities: opportunities.map(({ url, title, why, source }) => ({ url, title, why, source })),
  serp,
  errors: state.errors,
});

// costs.json: append
const costsFile = join(DATA_DIR, 'costs.json');
let costs = { runs: [] };
try {
  const parsed = JSON.parse(readFileSync(costsFile, 'utf8'));
  if (parsed && Array.isArray(parsed.runs)) costs = parsed;
} catch {
  /* no existe todavía */
}
costs.runs.push({ script: 'backlinks.mjs', at: new Date().toISOString(), usd: Number(state.costUsd.toFixed(4)), calls: state.calls, cachedCalls: state.cachedCalls });
mkdirSync(dirname(costsFile), { recursive: true });
writeFileSync(costsFile, JSON.stringify(costs, null, 2) + '\n', 'utf8');

console.log(`\n[backlinks] escrito ${outFile}`);
console.log(`[backlinks] costo de esta corrida: US$${state.costUsd.toFixed(4)} (${state.calls} llamadas, ${state.cachedCalls} desde caché)`);
console.log(`[backlinks] ${OUR_DOMAIN}: rank ${summary.ourRank}, ${summary.ourBacklinks} backlinks, ${summary.ourReferringDomains} dominios`);
console.log(`[backlinks] links verificados ${summary.backlinksChecked}: ${summary.live} directos, ${summary.redirected} redirigidos, ${summary.lost} perdidos (404), ${summary.other} otros, ${summary.toxic} tóxicos`);
console.log(`[backlinks] oportunidades: ${opportunities.length}; errores: ${state.errors.length}`);
