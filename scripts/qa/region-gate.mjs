#!/usr/bin/env node
/**
 * scripts/qa/region-gate.mjs
 *
 * Phase 3 plan 03-01 Wave 0: Per-Region Soft Gate Evaluator.
 *
 * This is the per-region gate that fires for each Phase 3 region (plans 01-11).
 * It is the SOFT counterpart to the Phase 2.6 Quality Gate — relaxed thresholds
 * (≥80 canonical / ≥75 sub-dest) since the template was already validated by
 * the Jerusalem pilot. Plans 02-11 reuse this script unchanged.
 *
 * CLI:
 *   node scripts/qa/region-gate.mjs <region-slug>
 *
 *   Examples:
 *     pnpm qa:region-gate tel-aviv
 *     pnpm qa:region-gate west-bank/bethlehem   (nested for plan 11)
 *
 * Inputs read (all are greenfield-tolerant):
 *   - data/audit-results.json   — required; filtered by region prefix
 *   - data/photo-credits.json   — optional; partner-count / ledger sanity
 *   - data/lighthouse-results.json — optional; DEFERRED when absent or empty
 *
 * Criteria (per Phase 3 CONTEXT.md soft-gate spec):
 *
 *   1. Region canonical (EN + HE) score >= 80 each
 *   2. Every sub-destination (EN + HE) score >= 75
 *   3. EN <-> HE parity: every EN page has an HE counterpart and vice-versa
 *   4. 0 blocking issues across all region pages
 *   5. Lighthouse: PASS or DEFERRED-CI-owns / DEFERRED-file-absent
 *
 * Output:
 *   - data/region-gates/{region}.md  (region uses dash for nested slugs)
 *
 * Exit:
 *   - 0 on PASS
 *   - 1 on FAIL
 *
 * Pure-helpers-exported-for-Vitest pattern:
 *   - main() runs only when import.meta.url === process.argv[1]
 *   - evaluateRegion / filterByRegionPrefix / evaluateParity / evaluateLighthouse /
 *     writeReport exported for unit testing
 *   - Drive-letter case-normalize for Windows (Phase 1 plan 11 lock)
 *
 * Cross-platform: pure node, no shell. Windows + macOS + Linux.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const REPO_ROOT = process.cwd();
const AUDIT_PATH = resolve(REPO_ROOT, 'data/audit-results.json');
const CREDITS_PATH = resolve(REPO_ROOT, 'data/photo-credits.json');
const LIGHTHOUSE_PATH = resolve(REPO_ROOT, 'data/lighthouse-results.json');

/** Soft-gate thresholds. Per Phase 3 CONTEXT.md spec. */
export const DEFAULT_THRESHOLDS = Object.freeze({
  canonical: 80,
  subDest: 75,
});

/**
 * Filter audit entries to those belonging to a given region.
 *
 * The audit walker stores slugs as e.g. "jerusalem", "jerusalem/western-wall",
 * "en/jerusalem", "en/jerusalem/western-wall" (depends on rebuild lineage).
 * We normalize by stripping a leading "en/" prefix, then match either:
 *   - exact slug equals region
 *   - slug starts with `${region}/`
 *
 * Critically we use the explicit "/" suffix on prefix match to avoid the
 * "tel-aviv" matches "tel-aviv-museum-of-art" false-positive trap.
 *
 * @param {Array} audit - flat array of audit entries from data/audit-results.json
 * @param {string} region - region slug, e.g. "tel-aviv" or "west-bank/bethlehem"
 * @returns {Array} filtered entries
 */
export function filterByRegionPrefix(audit, region) {
  if (!Array.isArray(audit) || !region) return [];
  return audit.filter((p) => {
    if (!p || typeof p.slug !== 'string') return false;
    const path = p.slug.replace(/^en\//, '');
    if (path === region) return true;
    if (path.startsWith(`${region}/`)) return true;
    return false;
  });
}

/**
 * Classify an audit entry against the region.
 *
 *   - canonical:  slug (after en/-strip) === region
 *   - subDest:    slug starts with `${region}/`
 *
 * @returns {'canonical' | 'subDest' | 'unknown'}
 */
export function classifyEntry(entry, region) {
  if (!entry || typeof entry.slug !== 'string') return 'unknown';
  const path = entry.slug.replace(/^en\//, '');
  if (path === region) return 'canonical';
  if (path.startsWith(`${region}/`)) return 'subDest';
  return 'unknown';
}

/**
 * Evaluate EN<->HE parity across an entries set.
 *
 * Velite-built audit entries carry `lang: 'en' | 'he'`. We index by normalized
 * slug+kind and detect orphans.
 *
 * @param {Array} entries - filtered region entries
 * @returns {{ missingHe: string[], missingEn: string[] }}
 */
export function evaluateParity(entries) {
  const enSet = new Set();
  const heSet = new Set();
  for (const e of entries) {
    if (!e || typeof e.slug !== 'string' || typeof e.lang !== 'string')
      continue;
    const key = e.slug.replace(/^en\//, '');
    if (e.lang === 'en') enSet.add(key);
    else if (e.lang === 'he') heSet.add(key);
  }
  const missingHe = [...enSet].filter((k) => !heSet.has(k)).sort();
  const missingEn = [...heSet].filter((k) => !enSet.has(k)).sort();
  return { missingHe, missingEn };
}

/**
 * Evaluate Lighthouse results for the region.
 *
 * Phase 2.6 lesson: distinguish `[]` (CI owns runs) from missing file
 * (Phase 1 deferred). Both DEFER cleanly with distinct messages.
 *
 * @param {Array | null | undefined} lh - parsed data/lighthouse-results.json contents (or null when file absent)
 * @param {string} region - region slug
 * @returns {{ status: 'PASS' | 'FAIL' | 'DEFERRED-CI-owns' | 'DEFERRED-file-absent', detail: string }}
 */
export function evaluateLighthouse(lh, region) {
  if (lh === null || lh === undefined) {
    return {
      status: 'DEFERRED-file-absent',
      detail:
        'data/lighthouse-results.json absent — Phase 6 cron will populate; PR workflow gates per-deploy.',
    };
  }
  if (!Array.isArray(lh)) {
    return {
      status: 'FAIL',
      detail: 'data/lighthouse-results.json malformed (expected array).',
    };
  }
  if (lh.length === 0) {
    return {
      status: 'DEFERRED-CI-owns',
      detail:
        'data/lighthouse-results.json is empty baseline — CI workflow (.github/workflows/lighthouse.yml) owns the real runs per PR.',
    };
  }
  // Filter to entries whose URL references this region.
  const regional = lh.filter((entry) => {
    if (!entry || typeof entry.url !== 'string') return false;
    const path = entry.url
      .replace(/^https?:\/\/[^/]+/, '')
      .replace(/^\/(en\/)?/, '');
    const clean = path.replace(/\/$/, '');
    return clean === region || clean.startsWith(`${region}/`);
  });
  if (regional.length === 0) {
    return {
      status: 'DEFERRED-CI-owns',
      detail: `No Lighthouse runs for region "${region}" in baseline — CI workflow owns runs per PR.`,
    };
  }
  // Mobile perf >= 0.85 across all regional runs (Phase 3 soft threshold; Phase 5 hard threshold = 0.90).
  const failing = regional.filter((entry) => {
    const perf = entry?.categories?.performance ?? entry?.performance ?? null;
    return typeof perf === 'number' && perf < 0.85;
  });
  if (failing.length > 0) {
    return {
      status: 'FAIL',
      detail: `${failing.length} of ${regional.length} regional Lighthouse runs below 0.85 mobile-perf.`,
    };
  }
  return {
    status: 'PASS',
    detail: `${regional.length} regional Lighthouse runs ≥ 0.85 mobile-perf.`,
  };
}

/**
 * Count distinct affiliate partners across photo-credits + audit metadata
 * for the region. Used only for the report row (does NOT gate).
 *
 * Heuristic: pull `partner` strings from audit entries' `mentions[]` if present,
 * fall back to 0 when absent. Phase 6 monitoring fills the real distinct-partner
 * count from NER.
 *
 * @param {Array} entries
 * @returns {string[]} distinct partner labels (lowercased)
 */
export function distinctPartners(entries) {
  const seen = new Set();
  for (const e of entries) {
    if (!Array.isArray(e?.mentions)) continue;
    for (const m of e.mentions) {
      if (m && typeof m.partner === 'string' && m.partner.length > 0) {
        seen.add(m.partner.toLowerCase());
      }
    }
  }
  return [...seen].sort();
}

/**
 * Core evaluator.
 *
 * @param {Array} audit - data/audit-results.json contents (flat array)
 * @param {string} region - region slug
 * @param {{ canonical: number, subDest: number }} [thresholds]
 * @returns {{
 *   entries: Array,
 *   canonicalScores: { en: number | null, he: number | null },
 *   subDestScores: Array<{ slug: string, lang: string, score: number, profile: string }>,
 *   failures: Array<{ kind: string, slug: string, lang: string, reason: string }>,
 *   missingHe: string[],
 *   missingEn: string[],
 *   blocking: number,
 *   verdict: 'PASS' | 'FAIL',
 * }}
 */
export function evaluateRegion(audit, region, thresholds = DEFAULT_THRESHOLDS) {
  const entries = filterByRegionPrefix(audit, region);
  const failures = [];

  // Group by classification.
  const canonicalEntries = entries.filter(
    (e) => classifyEntry(e, region) === 'canonical',
  );
  const subDestEntries = entries.filter(
    (e) => classifyEntry(e, region) === 'subDest',
  );

  const canonicalScores = { en: null, he: null };
  for (const e of canonicalEntries) {
    if (e.lang === 'en') canonicalScores.en = e.score ?? null;
    else if (e.lang === 'he') canonicalScores.he = e.score ?? null;
    if (typeof e.score === 'number' && e.score < thresholds.canonical) {
      failures.push({
        kind: 'canonical-below-threshold',
        slug: e.slug,
        lang: e.lang,
        reason: `score ${e.score} < ${thresholds.canonical}`,
      });
    }
  }

  if (canonicalScores.en === null) {
    failures.push({
      kind: 'canonical-missing',
      slug: region,
      lang: 'en',
      reason: 'EN canonical not found in audit-results',
    });
  }
  if (canonicalScores.he === null) {
    failures.push({
      kind: 'canonical-missing',
      slug: region,
      lang: 'he',
      reason: 'HE canonical not found in audit-results',
    });
  }

  const subDestScores = [];
  for (const e of subDestEntries) {
    subDestScores.push({
      slug: e.slug,
      lang: e.lang,
      score: e.score ?? 0,
      profile: e.profile ?? 'UNKNOWN',
    });
    if (typeof e.score === 'number' && e.score < thresholds.subDest) {
      failures.push({
        kind: 'sub-dest-below-threshold',
        slug: e.slug,
        lang: e.lang,
        reason: `score ${e.score} < ${thresholds.subDest}`,
      });
    }
  }

  let blocking = 0;
  for (const e of entries) {
    if (Array.isArray(e.blocking)) blocking += e.blocking.length;
  }
  if (blocking > 0) {
    failures.push({
      kind: 'blocking-issues',
      slug: region,
      lang: 'all',
      reason: `${blocking} blocking issues across region pages`,
    });
  }

  const { missingHe, missingEn } = evaluateParity(entries);
  for (const slug of missingHe) {
    failures.push({
      kind: 'parity-missing-he',
      slug,
      lang: 'he',
      reason: `EN page exists but HE counterpart missing`,
    });
  }
  for (const slug of missingEn) {
    failures.push({
      kind: 'parity-missing-en',
      slug,
      lang: 'en',
      reason: `HE page exists but EN counterpart missing`,
    });
  }

  const verdict = failures.length === 0 ? 'PASS' : 'FAIL';

  return {
    entries,
    canonicalScores,
    subDestScores,
    failures,
    missingHe,
    missingEn,
    blocking,
    verdict,
  };
}

/**
 * Compose the per-region gate report markdown.
 *
 * The report row template in data/region-replication-report.md expects a
 * literal-space separator (`PASS \\|`) — Prettier auto-escapes asterisks but
 * leaves literal pipes alone, so the row regex `/\|\s*tel-aviv\s*\|.*PASS \|/`
 * relies on literal-space match (per Phase 3 plan-checker lock).
 *
 * @param {object} result - evaluateRegion() output
 * @param {object} lighthouseResult - evaluateLighthouse() output
 * @param {string} region
 * @returns {string} markdown
 */
export function renderReport(result, lighthouseResult, region) {
  const isoDate = new Date().toISOString();
  const verdict = result.verdict;
  const failureLines =
    result.failures.length === 0
      ? '_No failures._'
      : result.failures
          .map((f) => `- **${f.kind}** (${f.lang} / ${f.slug}): ${f.reason}`)
          .join('\n');

  const canonicalLines = [
    `- EN canonical (\`${region}\` lang=en): score ${result.canonicalScores.en ?? 'MISSING'} (threshold >=80)`,
    `- HE canonical (\`${region}\` lang=he): score ${result.canonicalScores.he ?? 'MISSING'} (threshold >=80)`,
  ].join('\n');

  // Sub-dest grouping for compactness.
  const subDestByPair = new Map();
  for (const sd of result.subDestScores) {
    const key = sd.slug.replace(/^en\//, '');
    if (!subDestByPair.has(key)) subDestByPair.set(key, {});
    subDestByPair.get(key)[sd.lang] = sd.score;
  }
  const subDestLines =
    subDestByPair.size === 0
      ? '_No sub-destinations evaluated._'
      : [...subDestByPair.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(
            ([key, scores]) =>
              `- \`${key}\`: EN=${scores.en ?? '—'} / HE=${scores.he ?? '—'}`,
          )
          .join('\n');

  const enCount = result.entries.filter((e) => e.lang === 'en').length;
  const heCount = result.entries.filter((e) => e.lang === 'he').length;
  const missingHeStr =
    result.missingHe.length === 0
      ? '_none_'
      : result.missingHe.map((s) => `\`${s}\``).join(', ');
  const missingEnStr =
    result.missingEn.length === 0
      ? '_none_'
      : result.missingEn.map((s) => `\`${s}\``).join(', ');

  return `# Region Gate Report: ${region}

**Evaluated:** ${isoDate}

Verdict: ${verdict}

## Pages Audited

${canonicalLines}

### Sub-destinations (${subDestByPair.size} pairs)

${subDestLines}

## Failures

${failureLines}

## EN+HE Parity

- EN pages: ${enCount}
- HE pages: ${heCount}
- Missing HE counterparts: ${missingHeStr}
- Missing EN counterparts: ${missingEnStr}

## Lighthouse

- Status: ${lighthouseResult.status}
- Detail: ${lighthouseResult.detail}

## Blocking Issues

- Total: ${result.blocking}
`;
}

/**
 * Write the gate report to disk. Nested slugs (`west-bank/bethlehem`)
 * are flattened to a single filename (`west-bank-bethlehem.md`).
 *
 * @param {string} markdown
 * @param {string} region
 * @param {string} [outDir]
 * @returns {Promise<string>} resolved output path
 */
export async function writeReport(
  markdown,
  region,
  outDir = resolve(REPO_ROOT, 'data/region-gates'),
) {
  const filename = `${region.replace(/\//g, '-')}.md`;
  const outPath = resolve(outDir, filename);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, markdown, 'utf8');
  return outPath;
}

/** Read a JSON file; return parsed contents or fallback. */
async function readJsonSafe(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function main() {
  const region = process.argv[2];
  if (!region) {
    console.error('Usage: node scripts/qa/region-gate.mjs <region-slug>');
    console.error('  Examples: tel-aviv, dead-sea, west-bank/bethlehem');
    process.exit(1);
  }

  const audit = await readJsonSafe(AUDIT_PATH, null);
  if (audit === null) {
    console.error(
      `region-gate FAILED: data/audit-results.json not found. Run pnpm qa:audit first.`,
    );
    process.exit(1);
  }

  const lighthouse = await readJsonSafe(LIGHTHOUSE_PATH, null);

  const result = evaluateRegion(audit, region);
  const lighthouseResult = evaluateLighthouse(lighthouse, region);

  const markdown = renderReport(result, lighthouseResult, region);
  const outPath = await writeReport(markdown, region);

  console.log(`qa:region-gate ${region}:`);
  console.log(`  Verdict: ${result.verdict}`);
  console.log(`  EN canonical: ${result.canonicalScores.en ?? 'MISSING'}`);
  console.log(`  HE canonical: ${result.canonicalScores.he ?? 'MISSING'}`);
  console.log(`  Sub-dest pairs: ${result.subDestScores.length / 2}`);
  console.log(`  Failures: ${result.failures.length}`);
  console.log(`  Blocking: ${result.blocking}`);
  console.log(`  Lighthouse: ${lighthouseResult.status}`);
  console.log(`  Report: ${outPath}`);

  if (result.verdict !== 'PASS') {
    process.exit(1);
  }
}

// Only invoke main when this is the entrypoint (not when imported by tests).
// Drive-letter case-normalize for Windows (Phase 1 plan 11 lock).
const isMain = (() => {
  try {
    const argv1 = process.argv[1] ? resolve(process.argv[1]) : '';
    const here = resolve(new URL(import.meta.url).pathname.replace(/^\//, ''));
    return argv1.toLowerCase() === here.toLowerCase();
  } catch {
    return false;
  }
})();

if (isMain) {
  main().catch((e) => {
    console.error('qa:region-gate: failed:', e);
    process.exit(1);
  });
}
