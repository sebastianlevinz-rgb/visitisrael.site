/**
 * Cliente compartido de DataForSEO y Firecrawl para scripts/seo/keywords.mjs y competitors.mjs.
 *
 * - Caché por hash de request en data/seo/cache/ (gitignored): re-correr no vuelve a pagar
 *   salvo con --force.
 * - Presupuesto: acumula `cost` de cada respuesta de DataForSEO y lo registra en
 *   data/seo/costs.json ({ runs: [{ script, at, usd, calls }] }). Corta con BudgetError al
 *   llegar al tope acumulado (US$8 entre todas las corridas de estos scripts).
 * - Firecrawl: tope de 100 scrapes acumulados (créditos), también contados en costs.json.
 *
 * Nunca imprime ni escribe las keys.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DATA_DIR, fetchRetry, readEnv, sleep } from './lib.mjs';

export const CACHE_DIR = join(DATA_DIR, 'cache');
export const COSTS_FILE = join(DATA_DIR, 'costs.json');
/** Tope acumulado en USD para keywords.mjs + competitors.mjs (todas las corridas). */
export const BUDGET_USD = 8;
/** Tope acumulado de scrapes de Firecrawl (créditos). */
export const FIRECRAWL_MAX_SCRAPES = 100;
const DFS_BASE = 'https://api.dataforseo.com/v3/';
const FIRECRAWL_URL = 'https://api.firecrawl.dev/v1/scrape';

export const FORCE = process.argv.includes('--force');

export class BudgetError extends Error {}

/* ------------------------------------------------------------------ costs.json */

function readCosts() {
  try {
    const parsed = JSON.parse(readFileSync(COSTS_FILE, 'utf8'));
    if (parsed && Array.isArray(parsed.runs)) return parsed;
  } catch {
    /* no existe todavía */
  }
  return { runs: [] };
}

/** USD ya gastados por los scripts de keywords/competidores en corridas anteriores. */
export function spentSoFar() {
  return readCosts()
    .runs.filter((r) => /^(keywords|competitors)\.mjs$/.test(r.script))
    .reduce((acc, r) => acc + (Number(r.usd) || 0), 0);
}

/** USD gastados por un script concreto en corridas anteriores (costo real del dato generado). */
export function spentByScript(script) {
  return readCosts()
    .runs.filter((r) => r.script === script)
    .reduce((acc, r) => acc + (Number(r.usd) || 0), 0);
}

/** Scrapes de Firecrawl ya consumidos en corridas anteriores. */
export function firecrawlScrapesSoFar() {
  return readCosts().runs.reduce((acc, r) => acc + (Number(r.firecrawlScrapes) || 0), 0);
}

/**
 * Registra una corrida en costs.json (append).
 * @param {{ script: string, usd: number, calls: number, firecrawlScrapes?: number }} run
 */
export function appendRun(run) {
  const costs = readCosts();
  costs.runs.push({ at: new Date().toISOString(), ...run, usd: round4(run.usd) });
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(COSTS_FILE, JSON.stringify(costs, null, 2) + '\n', 'utf8');
}

const round4 = (n) => Math.round((Number(n) || 0) * 10000) / 10000;

/* ------------------------------------------------------------------ caché */

function cacheKey(kind, payload) {
  return createHash('sha1').update(kind + '\n' + JSON.stringify(payload)).digest('hex');
}

function cacheRead(key) {
  if (FORCE) return null;
  const file = join(CACHE_DIR, `${key}.json`);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function cacheWrite(key, data) {
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(join(CACHE_DIR, `${key}.json`), JSON.stringify(data), 'utf8');
}

/* ------------------------------------------------------------------ tracker */

/**
 * Crea el tracker de gasto de una corrida. `script` es el nombre del archivo que corre.
 */
export function createTracker(script) {
  const state = {
    script,
    usd: 0,
    calls: 0,
    cachedCalls: 0,
    firecrawlScrapes: 0,
    /** @type {{ endpoint: string, code: number, message: string }[]} */
    errors: [],
    spentBefore: spentSoFar(),
    firecrawlBefore: firecrawlScrapesSoFar(),
  };

  const totalUsd = () => state.spentBefore + state.usd;

  return {
    state,
    totalUsd,
    remainingUsd: () => Math.max(0, BUDGET_USD - totalUsd()),
    remainingScrapes: () => Math.max(0, FIRECRAWL_MAX_SCRAPES - state.firecrawlBefore - state.firecrawlScrapes),
    addCost(usd) {
      state.usd += Number(usd) || 0;
      if (totalUsd() >= BUDGET_USD) {
        throw new BudgetError(`Presupuesto DataForSEO agotado: US$${totalUsd().toFixed(4)} ≥ ${BUDGET_USD}`);
      }
    },
    addError(endpoint, code, message) {
      state.errors.push({ endpoint, code, message: String(message).slice(0, 300) });
    },
    /** Escribe la corrida en costs.json. Idempotente por corrida (se llama una vez al final). */
    flush() {
      appendRun({
        script,
        usd: state.usd,
        calls: state.calls,
        cachedCalls: state.cachedCalls,
        firecrawlScrapes: state.firecrawlScrapes,
        errors: state.errors.length,
      });
    },
  };
}

/* ------------------------------------------------------------------ DataForSEO */

let dfsAuth = null;
function dfsHeaders() {
  if (!dfsAuth) {
    const env = readEnv();
    const login = env.DATAFORSEO_LOGIN;
    const password = env.DATAFORSEO_PASSWORD;
    if (!login || !password) throw new Error('Faltan DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD en .env');
    dfsAuth = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
  }
  return { Authorization: dfsAuth, 'Content-Type': 'application/json' };
}

/**
 * POST a un endpoint de DataForSEO con un array de tasks. Devuelve
 * { tasks: [...], cost, cached, ok, code, message }.
 * - Una respuesta HTTP no-ok o status_code ≠ 20000 se registra en el tracker y devuelve ok:false.
 * - Cada task puede fallar por separado (status_code 40xxx): quien llame revisa `task.status_code`.
 * @param {ReturnType<typeof createTracker>} tracker
 * @param {string} endpoint  p. ej. "dataforseo_labs/google/bulk_keyword_difficulty/live"
 * @param {object[]} tasks
 */
export async function dfsPost(tracker, endpoint, tasks) {
  const key = cacheKey(`dfs:${endpoint}`, tasks);
  const cached = cacheRead(key);
  if (cached) {
    tracker.state.cachedCalls++;
    return { ...cached, cached: true, cost: 0 };
  }
  if (tracker.remainingUsd() <= 0) {
    throw new BudgetError('Sin presupuesto restante antes de llamar a ' + endpoint);
  }

  let res;
  let body;
  let cost = 0;
  // 40101 "Internal SE Server Error" es transitorio del lado de Google: un reintento suele alcanzar.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      res = await fetchRetry(DFS_BASE + endpoint, {
        retries: 2,
        timeoutMs: 120_000,
        init: { method: 'POST', headers: dfsHeaders(), body: JSON.stringify(tasks) },
      });
    } catch (err) {
      tracker.addError(endpoint, 0, err?.message ?? err);
      return { ok: false, code: 0, message: String(err?.message ?? err), tasks: [], cost: 0, cached: false };
    }
    try {
      body = await res.json();
    } catch {
      tracker.addError(endpoint, res.status, `HTTP ${res.status} sin JSON`);
      return { ok: false, code: res.status, message: `HTTP ${res.status}`, tasks: [], cost: 0, cached: false };
    }
    tracker.state.calls++;
    cost += Number(body?.cost) || 0;
    const transient = Array.isArray(body?.tasks) && body.tasks.length > 0 && body.tasks.every((t) => t?.status_code === 40101);
    if (!transient) break;
    await sleep(3000);
  }
  const ok = res.ok && body?.status_code === 20000;
  const out = {
    ok,
    code: body?.status_code ?? res.status,
    message: body?.status_message ?? res.statusText,
    cost,
    tasks: Array.isArray(body?.tasks) ? body.tasks : [],
    cached: false,
  };

  // Errores por task (40xxx: no habilitado, sin crédito, parámetros inválidos...)
  for (const t of out.tasks) {
    if (t?.status_code !== 20000) tracker.addError(endpoint, t?.status_code ?? 0, t?.status_message ?? 'task error');
  }
  if (!ok) tracker.addError(endpoint, out.code, out.message);

  // Solo cacheamos respuestas útiles: al menos una task OK.
  if (out.tasks.some((t) => t?.status_code === 20000)) cacheWrite(key, out);

  // El costo se suma después de cachear para que el BudgetError no pierda la respuesta.
  tracker.addCost(cost);
  await sleep(250);
  return out;
}

/** Items de la primera task OK (result[0].items) o [], según endpoints Labs/SERP. */
export function firstItems(resp) {
  const t = resp?.tasks?.find((x) => x?.status_code === 20000);
  const r = t?.result?.[0];
  if (!r) return [];
  return Array.isArray(r.items) ? r.items : [];
}

/** result completo (array) de la primera task OK, o []. */
export function firstResult(resp) {
  const t = resp?.tasks?.find((x) => x?.status_code === 20000);
  return Array.isArray(t?.result) ? t.result : [];
}

/* ------------------------------------------------------------------ Firecrawl */

let fcHeaders = null;
function firecrawlHeaders() {
  if (!fcHeaders) {
    const key = readEnv().FIRECRAWL_API_KEY;
    if (!key) throw new Error('Falta FIRECRAWL_API_KEY en .env');
    fcHeaders = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  }
  return fcHeaders;
}

/**
 * Scrape de una URL con Firecrawl (markdown, solo contenido principal).
 * Devuelve { ok, markdown, title, cached, status } — nunca lanza por errores HTTP.
 * Respeta el tope de scrapes: si no queda crédito devuelve { ok:false, skipped:true }.
 */
export async function firecrawlScrape(tracker, url) {
  const payload = { url, formats: ['markdown'], onlyMainContent: true };
  const key = cacheKey('firecrawl', payload);
  const cached = cacheRead(key);
  if (cached) return { ...cached, cached: true };
  if (tracker.remainingScrapes() <= 0) return { ok: false, skipped: true, reason: 'firecrawl budget' };

  let res;
  try {
    res = await fetchRetry(FIRECRAWL_URL, {
      retries: 1,
      timeoutMs: 90_000,
      init: { method: 'POST', headers: firecrawlHeaders(), body: JSON.stringify({ ...payload, timeout: 45_000 }) },
    });
  } catch (err) {
    tracker.addError('firecrawl', 0, `${url}: ${err?.message ?? err}`);
    return { ok: false, status: 0, reason: String(err?.message ?? err) };
  }
  tracker.state.firecrawlScrapes++;
  let body = null;
  try {
    body = await res.json();
  } catch {
    /* sin json */
  }
  if (!res.ok || !body?.success) {
    const msg = body?.error ?? `HTTP ${res.status}`;
    tracker.addError('firecrawl', res.status, `${url}: ${msg}`);
    return { ok: false, status: res.status, reason: String(msg) };
  }
  const out = {
    ok: true,
    status: res.status,
    markdown: body.data?.markdown ?? '',
    title: body.data?.metadata?.title ?? '',
    cached: false,
  };
  cacheWrite(key, out);
  await sleep(300);
  return out;
}
