/**
 * PageSpeed Insights (API v5, sin key) sobre 6 URLs de producción → data/seo/psi.json
 *
 *   node scripts/seo/psi.mjs            # móvil (default)
 *   node scripts/seo/psi.mjs --desktop  # escritorio
 *
 *   node scripts/seo/psi.mjs --local    # Lighthouse en esta máquina (Chrome headless), sin cuota
 *
 * Guarda scores (performance, seo, accessibility), LCP, CLS, TBT, INP (campo, si hay),
 * FCP, Speed Index y las 5 oportunidades principales con su ahorro estimado. Una
 * llamada por vez con 1 s de espera; ante 429/5xx o error de red reintenta una vez y
 * si vuelve a fallar registra el error sin cortar el script.
 *
 * Sin key, la cuota anónima es compartida y suele estar agotada ("Queries per day",
 * HTTP 429). Con `PSI_API_KEY=` en .env (gratis: Google Cloud → APIs → PageSpeed
 * Insights API → credenciales) se usa esa key y la cuota es de 25.000/día. La key
 * nunca se imprime ni se escribe en el JSON.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SITE, fetchRetry, readEnv, readJson, sleep, writeJson } from './lib.mjs';

const PATHS = ['/', '/jerusalem', '/best-hotels-jerusalem', '/es', '/he', '/itineraries/7-days-in-israel'];
const strategy = process.argv.includes('--desktop') ? 'desktop' : 'mobile';
const local = process.argv.includes('--local');
const API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const apiKey = readEnv().PSI_API_KEY || readEnv().PAGESPEED_API_KEY || '';

/** @param {string} path */
function apiUrl(path) {
  const u = new URL(API);
  u.searchParams.set('url', `${SITE}${path}`);
  u.searchParams.set('strategy', strategy);
  for (const c of ['performance', 'seo', 'accessibility']) u.searchParams.append('category', c);
  if (apiKey) u.searchParams.set('key', apiKey);
  return u.toString();
}

const score = (cat) => (cat?.score == null ? null : Math.round(cat.score * 100));
const ms = (audit) => (audit?.numericValue == null ? null : Math.round(audit.numericValue));

/** @param {any} lhr */
function extract(lhr) {
  const a = lhr.audits ?? {};
  const cats = lhr.categories ?? {};
  const opportunities = Object.values(a)
    .filter((x) => x?.details?.type === 'opportunity' && x.score != null && x.score < 1)
    .map((x) => ({
      id: x.id,
      title: x.title,
      savingsMs: x.details?.overallSavingsMs != null ? Math.round(x.details.overallSavingsMs) : null,
      savingsBytes: x.details?.overallSavingsBytes != null ? Math.round(x.details.overallSavingsBytes) : null,
      displayValue: x.displayValue ?? null,
      score: x.score,
    }))
    .sort((p, q) => (q.savingsMs ?? 0) - (p.savingsMs ?? 0) || (q.savingsBytes ?? 0) - (p.savingsBytes ?? 0))
    .slice(0, 5);
  const failing = (catId) =>
    (cats[catId]?.auditRefs ?? [])
      .map((r) => a[r.id])
      .filter((x) => x && x.score != null && x.score < 1 && x.scoreDisplayMode !== 'informative')
      .map((x) => ({ id: x.id, title: x.title }))
      .slice(0, 8);
  return {
    scores: { performance: score(cats.performance), seo: score(cats.seo), accessibility: score(cats.accessibility) },
    metrics: {
      lcpMs: ms(a['largest-contentful-paint']),
      cls: a['cumulative-layout-shift']?.numericValue != null ? Number(a['cumulative-layout-shift'].numericValue.toFixed(3)) : null,
      tbtMs: ms(a['total-blocking-time']),
      fcpMs: ms(a['first-contentful-paint']),
      speedIndexMs: ms(a['speed-index']),
      ttiMs: ms(a['interactive']),
    },
    opportunities,
    seoFailing: failing('seo'),
    accessibilityFailing: failing('accessibility'),
    lighthouseVersion: lhr.lighthouseVersion ?? null,
    fetchTime: lhr.fetchTime ?? null,
  };
}

/** Datos de campo (CrUX) si existen: INP, LCP, CLS reales. @param {any} json */
function fieldData(json) {
  const m = json.loadingExperience?.metrics;
  if (!m) return null;
  const pick = (k) => (m[k] ? { p75: m[k].percentile, category: m[k].category } : null);
  return {
    overall: json.loadingExperience.overall_category ?? null,
    inp: pick('INTERACTION_TO_NEXT_PAINT'),
    lcp: pick('LARGEST_CONTENTFUL_PAINT_MS'),
    cls: pick('CUMULATIVE_LAYOUT_SHIFT_SCORE'),
    originFallback: Boolean(json.loadingExperience.origin_fallback),
  };
}

/**
 * `--local`: corre Lighthouse en esta máquina (pnpm dlx lighthouse + Chrome headless)
 * en vez de la API. Sirve cuando la cuota anónima de PSI está agotada. Sin datos de
 * campo (CrUX). @param {string} url
 */
function runLocal(url) {
  const outPath = join(tmpdir(), `lh-${Date.now()}.json`);
  const args = [
    'dlx', 'lighthouse', url, '--output=json', `--output-path=${outPath}`, '--quiet',
    '--chrome-flags=--headless=new', '--only-categories=performance,seo,accessibility',
    ...(strategy === 'desktop' ? ['--preset=desktop'] : ['--form-factor=mobile']),
  ];
  try {
    execFileSync('pnpm', args, { stdio: 'ignore', shell: true, timeout: 180_000 });
  } catch (err) {
    // En Windows, chrome-launcher falla al borrar su carpeta temporal (EPERM) después
    // de escribir el informe: si el JSON está, el análisis terminó bien.
    if (!existsSync(outPath)) throw err;
  }
  const lhr = JSON.parse(readFileSync(outPath, 'utf8'));
  unlinkSync(outPath);
  return lhr;
}

const results = [];
for (const [i, path] of PATHS.entries()) {
  if (i > 0) await sleep(1000);
  const url = `${SITE}${path}`;
  process.stdout.write(`psi ${strategy}${local ? ' (lighthouse local)' : ''}: ${url} ... `);
  if (local) {
    try {
      const data = extract(runLocal(url));
      results.push({ url, path, ok: true, ...data, field: null, source: 'lighthouse-local' });
      console.log(`perf ${data.scores.performance} · seo ${data.scores.seo} · a11y ${data.scores.accessibility}`);
    } catch (err) {
      results.push({ url, path, ok: false, error: err instanceof Error ? err.message : String(err) });
      console.log(`error: ${err instanceof Error ? err.message : err}`);
    }
    continue;
  }
  try {
    const res = await fetchRetry(apiUrl(path), { retries: 1, timeoutMs: 120_000, waitMs: 5000 });
    if (!res.ok) {
      let detail = '';
      try {
        detail = (await res.json())?.error?.message ?? '';
      } catch {
        // sin cuerpo legible
      }
      results.push({ url, path, ok: false, error: `HTTP ${res.status}${detail ? `: ${detail}` : ''}` });
      console.log(`error HTTP ${res.status}`);
      continue;
    }
    const json = await res.json();
    const data = extract(json.lighthouseResult ?? {});
    results.push({ url, path, ok: true, ...data, field: fieldData(json) });
    console.log(`perf ${data.scores.performance} · seo ${data.scores.seo} · a11y ${data.scores.accessibility}`);
  } catch (err) {
    results.push({ url, path, ok: false, error: err instanceof Error ? err.message : String(err) });
    console.log(`error: ${err instanceof Error ? err.message : err}`);
  }
}

const ok = results.filter((r) => r.ok);
const avg = (fn) => (ok.length ? Math.round(ok.reduce((a, r) => a + (fn(r) ?? 0), 0) / ok.length) : null);
const summary = {
  strategy,
  urls: results.length,
  ok: ok.length,
  failed: results.length - ok.length,
  avgScores: { performance: avg((r) => r.scores.performance), seo: avg((r) => r.scores.seo), accessibility: avg((r) => r.scores.accessibility) },
  avgLcpMs: avg((r) => r.metrics.lcpMs),
  avgTbtMs: avg((r) => r.metrics.tbtMs),
  worstPerformance: ok.length ? ok.reduce((w, r) => (r.scores.performance < w.scores.performance ? r : w)).path : null,
};

// Si no anduvo ninguna URL y hay datos anteriores válidos, se conservan y se anota el
// intento fallido: mejor un dato viejo con fecha que ninguno.
const previous = readJson('psi');
let out;
if (!ok.length && previous?.summary?.ok > 0) {
  out = writeJson('psi', {
    ...previous,
    generatedAt: previous.generatedAt,
    lastFailedAttempt: { at: new Date().toISOString(), errors: results.map((r) => `${r.path}: ${r.error}`) },
  });
  console.log(`psi: 0/${results.length} URLs OK; se conservan los datos del ${previous.generatedAt} → ${out}`);
} else {
  out = writeJson('psi', { site: SITE, strategy, withApiKey: Boolean(apiKey), summary, results });
  console.log(`psi: ${ok.length}/${results.length} URLs OK (${apiKey ? 'con' : 'sin'} PSI_API_KEY) → ${out}`);
}
if (!ok.length && results.some((r) => /429/.test(r.error ?? ''))) {
  console.log('psi: cuota agotada (429). Cargar PSI_API_KEY en .env o reintentar más tarde.');
}
