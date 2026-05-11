#!/usr/bin/env node
/**
 * scripts/qa/persist-lhci.mjs
 *
 * Post-`lhci autorun` hook: walks `.lighthouseci/` (LHCI default output dir)
 * for `lhr-*.json` files, computes the 3-run median for each URL across the
 * 4 Lighthouse categories, then writes a flat-array JSON to
 * `data/lighthouse-results.json`.
 *
 * Output schema (consumed by `scripts/audit/rules/AUD-013.ts` + `AUD-034.ts`
 * + `scripts/audit/quality-gate.ts` criterion 1):
 *
 *   [
 *     {
 *       slug: string,           // path-derived slug ("" for root, "en" for /en/, etc.)
 *       lang: 'he' | 'en',      // inferred from URL path (`/en/...` → en, else he)
 *       url: string,            // full URL audited
 *       performance: number,    // 0..1
 *       accessibility: number,  // 0..1
 *       bestPractices: number,  // 0..1
 *       seo: number,            // 0..1
 *       thirdPartyBlockingMs: number, // total-blocking-time audit metric (ms)
 *       runCount: number,       // expected: 3 (numberOfRuns)
 *       capturedAt: string,     // ISO-8601 timestamp
 *     },
 *     ...
 *   ]
 *
 * Greenfield-tolerant: if `.lighthouseci/` does not exist (e.g. lhci was
 * never run), writes `[]` and exits 0 — the AUD-013/AUD-034 rules already
 * gracefully degrade with the empty-array case (info-severity "deferred").
 *
 * Cross-platform: pure node, no shell. Runs on Windows + macOS + Linux.
 */

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const REPO_ROOT = process.cwd();
const LHCI_DIR = resolve(REPO_ROOT, '.lighthouseci');
const OUT_PATH = resolve(REPO_ROOT, 'data/lighthouse-results.json');

/**
 * Median of a numeric array (3 runs → return the middle value after sort).
 * Returns NaN for empty input.
 */
export function median(values) {
  if (!Array.isArray(values) || values.length === 0) return NaN;
  const sorted = [...values].filter((v) => typeof v === 'number' && !Number.isNaN(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return NaN;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/**
 * Derive `{ slug, lang }` from a Lighthouse-audited URL.
 *  - `http://localhost:3000/` → { slug: '', lang: 'he' }  (HE default, no prefix)
 *  - `http://localhost:3000/en` → { slug: '', lang: 'en' }
 *  - `http://localhost:3000/en/jerusalem` → { slug: 'jerusalem', lang: 'en' }
 *  - `http://localhost:3000/jerusalem/old-city` → { slug: 'jerusalem/old-city', lang: 'he' }
 *  - `http://localhost:3000/admin/components` → { slug: 'admin/components', lang: 'he' }
 */
export function deriveSlugAndLang(rawUrl) {
  let pathname;
  try {
    pathname = new URL(rawUrl).pathname;
  } catch {
    pathname = String(rawUrl);
  }
  // Strip leading slash, trailing slash.
  let p = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  // Lang inference: explicit /en or /en/... → en; else he (default locale).
  let lang = 'he';
  if (p === 'en' || p.startsWith('en/')) {
    lang = 'en';
    p = p === 'en' ? '' : p.slice(3); // strip "en/" prefix
  } else if (p === 'he' || p.startsWith('he/')) {
    // HE explicit prefix is also possible in some builds — strip too.
    lang = 'he';
    p = p === 'he' ? '' : p.slice(3);
  }
  return { slug: p, lang };
}

/**
 * Parse one Lighthouse report JSON (LHR shape).
 * Returns null if the file is malformed.
 */
async function parseLhr(filePath) {
  try {
    const raw = await readFile(filePath, 'utf8');
    const lhr = JSON.parse(raw);
    if (!lhr || typeof lhr !== 'object') return null;
    const url = lhr.finalUrl || lhr.requestedUrl;
    if (!url) return null;
    const cats = lhr.categories || {};
    const audits = lhr.audits || {};
    const tbt = audits['total-blocking-time'];
    const tbtMs = tbt && typeof tbt.numericValue === 'number' ? tbt.numericValue : NaN;
    return {
      url: String(url),
      performance: typeof cats.performance?.score === 'number' ? cats.performance.score : NaN,
      accessibility: typeof cats.accessibility?.score === 'number' ? cats.accessibility.score : NaN,
      bestPractices:
        typeof cats['best-practices']?.score === 'number' ? cats['best-practices'].score : NaN,
      seo: typeof cats.seo?.score === 'number' ? cats.seo.score : NaN,
      thirdPartyBlockingMs: Number.isFinite(tbtMs) ? tbtMs : 0,
    };
  } catch {
    return null;
  }
}

/**
 * Group runs by URL and reduce to median entries.
 */
export function aggregate(runs) {
  const byUrl = new Map();
  for (const r of runs) {
    if (!byUrl.has(r.url)) byUrl.set(r.url, []);
    byUrl.get(r.url).push(r);
  }
  const out = [];
  for (const [url, list] of byUrl.entries()) {
    const { slug, lang } = deriveSlugAndLang(url);
    out.push({
      slug,
      lang,
      url,
      performance: Number(median(list.map((r) => r.performance)).toFixed(4)),
      accessibility: Number(median(list.map((r) => r.accessibility)).toFixed(4)),
      bestPractices: Number(median(list.map((r) => r.bestPractices)).toFixed(4)),
      seo: Number(median(list.map((r) => r.seo)).toFixed(4)),
      thirdPartyBlockingMs: Math.round(median(list.map((r) => r.thirdPartyBlockingMs))),
      runCount: list.length,
      capturedAt: new Date().toISOString(),
    });
  }
  // Stable order: by slug then lang
  out.sort((a, b) => a.slug.localeCompare(b.slug) || a.lang.localeCompare(b.lang));
  return out;
}

async function listLhrFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && /^lhr-.*\.json$/.test(e.name))
    .map((e) => join(dir, e.name));
}

async function main() {
  await mkdir(dirname(OUT_PATH), { recursive: true });

  const files = await listLhrFiles(LHCI_DIR);
  if (files.length === 0) {
    // Greenfield: no lhci run yet — write empty array. AUD-013/AUD-034 + Quality Gate
    // already handle this gracefully (deferred-info entries).
    await writeFile(OUT_PATH, '[]\n', 'utf8');
    console.log(`persist-lhci: no .lighthouseci/lhr-*.json found — wrote empty array to ${OUT_PATH}.`);
    return;
  }

  const parsed = [];
  for (const f of files) {
    const lhr = await parseLhr(f);
    if (lhr) parsed.push(lhr);
  }

  const entries = aggregate(parsed);
  await writeFile(OUT_PATH, JSON.stringify(entries, null, 2) + '\n', 'utf8');
  console.log(
    `persist-lhci: parsed ${parsed.length} run(s) across ${entries.length} URL(s) → ${OUT_PATH}`,
  );
  for (const e of entries) {
    console.log(
      `  ${e.lang}/${e.slug || '(root)'} — perf ${(e.performance * 100).toFixed(0)} / a11y ${(
        e.accessibility * 100
      ).toFixed(0)} / bp ${(e.bestPractices * 100).toFixed(0)} / seo ${(e.seo * 100).toFixed(0)}`,
    );
  }
}

// Only invoke main when this is the entrypoint (not when imported by tests).
const isMain = (() => {
  try {
    const argv1 = process.argv[1] ? resolve(process.argv[1]) : '';
    const here = resolve(new URL(import.meta.url).pathname.replace(/^\//, ''));
    // Normalize Windows drive-letter case (D: vs d:) before compare.
    return argv1.toLowerCase() === here.toLowerCase();
  } catch {
    return false;
  }
})();

if (isMain) {
  main().catch((e) => {
    console.error('persist-lhci: failed:', e);
    process.exit(1);
  });
}
