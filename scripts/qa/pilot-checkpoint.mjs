#!/usr/bin/env node
/**
 * scripts/qa/pilot-checkpoint.mjs
 *
 * Phase 2 plan 02-02 Wave 0: Pilot-Switch Checkpoint Evaluator.
 *
 * This is the cheapest-to-execute, highest-leverage checkpoint in Phase 2.
 * Past Phase 2.3, switching pilots costs ~10 HE sub-destination pages of
 * rework. The 3 criteria here are MECHANICAL — exit-code-driven, not
 * judgment-driven (per CONTEXT.md §Pilot-switch checkpoint).
 *
 * Inputs read (all must exist):
 *   - data/audit-results.json — for criterion 1 (editorial-style audits)
 *   - data/photo-credits.json — for criterion 2 (restricted-site image clearances)
 *   - .planning/phases/02-pilot-region-jerusalem-m2/timing.log — for criterion 3
 *     (HE throughput vs EN baseline)
 *
 * Criteria (LOCKED from RESEARCH §4 + CONTEXT.md §Pilot-switch checkpoint):
 *
 *   1. Editorial style — AUD-017/018/019/020 ALL report 0 violations on
 *      /en/jerusalem AND /jerusalem (both EN + HE pair). FAIL if any rule
 *      has ≥1 violation on either page.
 *
 *   2. Restricted-site images — Of photo-credits entries where:
 *        - subjectType ∈ { westernWall, holySepulchre, domeOfTheRock, bahaiGardens }
 *        - region === 'jerusalem'
 *        - slug === 'jerusalem'
 *      ≥80% must have a non-empty `restrictedSiteAcknowledgment` field.
 *      FAIL otherwise.
 *
 *   3. HE throughput — Parse timing.log lines `2.1 EN canonical: <N>min` +
 *      `2.2 HE canonical: <M>min`. Compute M/N. PASS if ≤2.0. FAIL if >2.0.
 *
 * Output:
 *   - data/pilot-checkpoint.md — always written, contains per-criterion
 *     details + verdict (PASS | SWITCH | OVERRIDE) + suggested next action
 *
 * Exit:
 *   - 0 if all 3 criteria PASS (advance to Wave 3)
 *   - 1 if any criterion FAILS (halt phase; user reads report + decides
 *     switch-to-Tel-Aviv vs override)
 *
 * Pure-helpers-exported-for-Vitest pattern:
 *   - main() runs only when import.meta.url === process.argv[1]
 *   - evaluateCriterion1/2/3, writeReport exported for unit testing
 *
 * Cross-platform: pure node, no shell. Windows + macOS + Linux.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const REPO_ROOT = process.cwd();
const AUDIT_PATH = resolve(REPO_ROOT, 'data/audit-results.json');
const CREDITS_PATH = resolve(REPO_ROOT, 'data/photo-credits.json');
const TIMING_PATH = resolve(
  REPO_ROOT,
  '.planning/phases/02-pilot-region-jerusalem-m2/timing.log',
);
const OUT_PATH = resolve(REPO_ROOT, 'data/pilot-checkpoint.md');

/** Subject types treated as restricted sites for criterion 2. */
export const RESTRICTED_SUBJECTS = new Set([
  'westernWall',
  'holySepulchre',
  'domeOfTheRock',
  'bahaiGardens',
]);

/** Rules whose 0-violation status is gated by criterion 1. */
export const EDITORIAL_RULES = ['AUD-017', 'AUD-018', 'AUD-019', 'AUD-020'];

/** Throughput ratio threshold for criterion 3 (M2/M1 ≤ this PASSES). */
export const HE_THROUGHPUT_RATIO_MAX = 2.0;

/**
 * Criterion 1 — Editorial style.
 *
 * Walks audit-results entries for `/en/jerusalem` AND `/jerusalem` (HE), counts
 * AUD-017/018/019/020 violations on either page. PASS = all four rules = 0
 * violations across both pages.
 *
 * @param {Array} audit - data/audit-results.json contents (flat array)
 * @returns {{ pass: boolean, details: object, summary: string }}
 */
export function evaluateCriterion1(audit) {
  if (!Array.isArray(audit)) {
    return {
      pass: false,
      details: { error: 'audit-results.json missing or not an array' },
      summary: 'FAIL — audit-results.json missing or malformed',
    };
  }

  const enPage = audit.find((p) => p.slug === 'jerusalem' && p.lang === 'en');
  const hePage = audit.find((p) => p.slug === 'jerusalem' && p.lang === 'he');

  if (!enPage) {
    return {
      pass: false,
      details: { error: '/en/jerusalem not found in audit-results.json' },
      summary:
        'FAIL — /en/jerusalem not audited (run pnpm qa:audit after build)',
    };
  }

  // /jerusalem HE may be absent until Task 2 of this plan lands; treat absent
  // as a "deferred fail" so the checkpoint flags the missing page explicitly.
  const perRule = {};
  for (const rule of EDITORIAL_RULES) {
    const enCount = countViolations(enPage, rule);
    const heCount = hePage ? countViolations(hePage, rule) : null;
    perRule[rule] = { en: enCount, he: heCount };
  }

  const enClean = EDITORIAL_RULES.every((r) => perRule[r].en === 0);
  const heMissing = hePage === undefined;
  const heClean =
    !heMissing && EDITORIAL_RULES.every((r) => perRule[r].he === 0);

  const pass = enClean && heClean;
  const summary = pass
    ? 'PASS — all AUD-017..020 rules report 0 violations on both /en/jerusalem and /jerusalem'
    : heMissing
      ? 'FAIL — /jerusalem HE page absent from audit (rerun pnpm qa:audit after Task 2)'
      : `FAIL — ${describeRuleFailures(perRule)}`;

  return {
    pass,
    details: { perRule, hePageMissing: heMissing },
    summary,
  };
}

/** Count violations of a specific rule on an audit page (severity != info). */
function countViolations(page, rule) {
  if (!page || !Array.isArray(page.issues)) return 0;
  return page.issues.filter((i) => i.rule === rule && i.severity !== 'info')
    .length;
}

function describeRuleFailures(perRule) {
  const failed = [];
  for (const [rule, counts] of Object.entries(perRule)) {
    const enFail = counts.en > 0;
    const heFail = counts.he !== null && counts.he > 0;
    if (enFail || heFail) {
      failed.push(
        `${rule} (EN=${counts.en}, HE=${counts.he === null ? 'n/a' : counts.he})`,
      );
    }
  }
  return failed.length > 0
    ? `editorial rules with violations: ${failed.join(', ')}`
    : 'unknown failure';
}

/**
 * Criterion 2 — Restricted-site image sourcing clearance.
 *
 * Walks photo-credits.json for Jerusalem-region restricted-site images,
 * computes coverage of `restrictedSiteAcknowledgment` field. PASS ≥ 80%.
 *
 * @param {object} credits - data/photo-credits.json (keyed by src)
 * @returns {{ pass: boolean, details: object, summary: string }}
 */
export function evaluateCriterion2(credits) {
  if (!credits || typeof credits !== 'object') {
    return {
      pass: false,
      details: { error: 'photo-credits.json missing or malformed' },
      summary: 'FAIL — photo-credits.json missing or malformed',
    };
  }

  const entries = Object.values(credits).filter(
    (e) => e && typeof e === 'object',
  );
  const restricted = entries.filter(
    (e) =>
      RESTRICTED_SUBJECTS.has(e.subjectType) &&
      e.region === 'jerusalem' &&
      e.slug === 'jerusalem',
  );

  if (restricted.length === 0) {
    // No restricted-site images yet → vacuously pass. The pilot canonical
    // ships with at least 2 (western-wall + holy-sepulchre) per plan 2.1.
    // This branch primarily covers the greenfield case + sub-dest-only photos.
    return {
      pass: true,
      details: {
        total: 0,
        cleared: 0,
        coverage: 1.0,
        note: 'no restricted-site Jerusalem images present (vacuously passes)',
      },
      summary: 'PASS — no restricted-site Jerusalem images present (vacuous)',
    };
  }

  const cleared = restricted.filter(
    (e) =>
      typeof e.restrictedSiteAcknowledgment === 'string' &&
      e.restrictedSiteAcknowledgment.trim().length > 0,
  );
  const coverage = cleared.length / restricted.length;
  const pass = coverage >= 0.8;

  return {
    pass,
    details: {
      total: restricted.length,
      cleared: cleared.length,
      coverage,
      uncleared: restricted
        .filter(
          (e) =>
            !e.restrictedSiteAcknowledgment ||
            String(e.restrictedSiteAcknowledgment).trim().length === 0,
        )
        .map((e) => e.src),
    },
    summary: pass
      ? `PASS — ${cleared.length}/${restricted.length} restricted-site Jerusalem images cleared (${pctStr(coverage)})`
      : `FAIL — coverage ${pctStr(coverage)} < 80% threshold`,
  };
}

function pctStr(ratio) {
  if (!Number.isFinite(ratio)) return 'n/a';
  return `${(ratio * 100).toFixed(0)}%`;
}

/**
 * Criterion 3 — HE translation throughput.
 *
 * Parses `timing.log`:
 *   2.1 EN canonical: <M1>min
 *   2.2 HE canonical: <M2>min
 *
 * Computes M2/M1. PASS if ≤2.0 (HE throughput within 2× of EN baseline).
 *
 * @param {string} timingLog - raw text of timing.log
 * @returns {{ pass: boolean, details: object, summary: string }}
 */
export function evaluateCriterion3(timingLog) {
  if (typeof timingLog !== 'string' || timingLog.length === 0) {
    return {
      pass: false,
      details: { error: 'timing.log missing or empty' },
      summary: 'FAIL — timing.log missing or empty',
    };
  }

  const enMatch = timingLog.match(/2\.1\s+EN\s+canonical:\s*(\d+)\s*min/i);
  const heMatch = timingLog.match(/2\.2\s+HE\s+canonical:\s*(\d+)\s*min/i);

  if (!enMatch) {
    return {
      pass: false,
      details: { error: 'EN canonical line absent from timing.log' },
      summary: 'FAIL — "2.1 EN canonical: <N>min" line not found in timing.log',
    };
  }

  if (!heMatch) {
    return {
      pass: false,
      details: { error: 'HE canonical line absent from timing.log' },
      summary:
        'FAIL — "2.2 HE canonical: <N>min" line not found (append after Task 2 completes)',
    };
  }

  const m1 = Number(enMatch[1]);
  const m2 = Number(heMatch[1]);
  if (!Number.isFinite(m1) || m1 <= 0 || !Number.isFinite(m2) || m2 <= 0) {
    return {
      pass: false,
      details: { m1, m2, error: 'non-positive minutes parsed' },
      summary: 'FAIL — non-positive minute values parsed from timing.log',
    };
  }

  const ratio = m2 / m1;
  const pass = ratio <= HE_THROUGHPUT_RATIO_MAX;
  return {
    pass,
    details: { m1, m2, ratio: Number(ratio.toFixed(2)) },
    summary: pass
      ? `PASS — HE/EN ratio ${ratio.toFixed(2)} ≤ ${HE_THROUGHPUT_RATIO_MAX.toFixed(1)}`
      : `FAIL — HE/EN ratio ${ratio.toFixed(2)} > ${HE_THROUGHPUT_RATIO_MAX.toFixed(1)} threshold`,
  };
}

/**
 * Compose the pilot-checkpoint.md report. Always written regardless of
 * verdict so the artifact documents PASS advancement OR SWITCH pivot.
 *
 * @param {object} results - { criterion1, criterion2, criterion3, verdict }
 * @param {string} outPath - destination .md file
 */
export async function writeReport(results, outPath) {
  const md = renderReportMd(results);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, md, 'utf8');
}

export function renderReportMd(results) {
  const { criterion1, criterion2, criterion3, verdict } = results;
  const isoDate = new Date().toISOString();

  const c1Rules = criterion1?.details?.perRule ?? {};
  const c1Lines = EDITORIAL_RULES.map((r) => {
    const c = c1Rules[r];
    if (!c) return `- ${r}: n/a`;
    const heVal = c.he === null ? 'n/a' : c.he;
    return `- ${r} (${ruleLabel(r)}): EN=${c.en} violations, HE=${heVal} violations`;
  }).join('\n');

  const c2 = criterion2?.details ?? {};
  const c2Coverage = pctStr(c2.coverage ?? 0);
  const c2Lines =
    typeof c2.total === 'number'
      ? `- Total restricted-site Jerusalem images: ${c2.total}\n` +
        `- With cleared restrictedSiteAcknowledgment: ${c2.cleared ?? 0} (${c2Coverage})`
      : `- ${criterion2?.summary ?? 'n/a'}`;

  const c3 = criterion3?.details ?? {};
  const c3Lines =
    typeof c3.m1 === 'number'
      ? `- 2.1 EN wall-clock: ${c3.m1} min\n` +
        `- 2.2 HE wall-clock: ${c3.m2} min\n` +
        `- Ratio: ${(c3.ratio ?? c3.m2 / c3.m1).toFixed(2)}×`
      : `- ${criterion3?.summary ?? 'n/a'}`;

  const verdictBlock = renderVerdictBlock(verdict, results);
  const nextAction = renderNextAction(verdict, results);

  return `# Pilot-Switch Checkpoint (Phase 2.2 → 2.3)

**Evaluated:** ${isoDate}
**Verdict:** ${verdict}

## Criterion 1: Editorial Style (AUD-017..AUD-020)

${c1Lines}
**Result:** ${criterion1?.summary ?? 'n/a'}

## Criterion 2: Restricted-Site Image Sourcing

${c2Lines}
**Result:** ${criterion2?.summary ?? 'n/a'}

## Criterion 3: Hebrew Translation Throughput

${c3Lines}
**Result:** ${criterion3?.summary ?? 'n/a'}

## Verdict

${verdictBlock}

## Suggested next action

${nextAction}
`;
}

function ruleLabel(rule) {
  switch (rule) {
    case 'AUD-017':
      return 'Wailing Wall regex';
    case 'AUD-018':
      return 'biased framing';
    case 'AUD-019':
      return 'Temple Mount paired';
    case 'AUD-020':
      return 'administrativeStatus frontmatter';
    default:
      return rule;
  }
}

function renderVerdictBlock(verdict, results) {
  if (verdict === 'PASS') {
    return (
      'All 3 criteria PASS. Phase 2.3 (Jerusalem sub-destinations EN+HE pairs)\n' +
      'is unblocked. Jerusalem remains the pilot region; the Israel-specific\n' +
      'differentiators (paired religious naming in Hebrew, RTL rendering,\n' +
      'native-Hebrew register, restricted-site image clearance) all functioned\n' +
      'end-to-end at production depth.'
    );
  }
  // SWITCH verdict — surface every failing criterion with details so the
  // user can decide switch-to-Tel-Aviv vs override.
  const failing = [];
  if (results.criterion1 && !results.criterion1.pass)
    failing.push(`- Criterion 1: ${results.criterion1.summary}`);
  if (results.criterion2 && !results.criterion2.pass)
    failing.push(`- Criterion 2: ${results.criterion2.summary}`);
  if (results.criterion3 && !results.criterion3.pass)
    failing.push(`- Criterion 3: ${results.criterion3.summary}`);
  return (
    `One or more checkpoint criteria FAILED. Past Phase 2.3 the switch\n` +
    `becomes expensive (~10 HE sub-destination pages of rework). Halting\n` +
    `Phase 2 now keeps the cost contained.\n\n` +
    `Failing criteria:\n\n${failing.join('\n')}`
  );
}

function renderNextAction(verdict, results) {
  if (verdict === 'PASS') {
    return (
      'Proceed to Phase 2.3 (Jerusalem sub-destinations). The pilot region\n' +
      'is locked as Jerusalem; Tel Aviv remains the documented v2 fallback\n' +
      'only if a future Quality Gate flags rework needs.'
    );
  }
  // SWITCH options
  const c1Failing = results.criterion1 && !results.criterion1.pass;
  const c2Failing = results.criterion2 && !results.criterion2.pass;
  const c3Failing = results.criterion3 && !results.criterion3.pass;
  const causes = [];
  if (c1Failing) causes.push('editorial-style audits flagged violations');
  if (c2Failing) causes.push('restricted-site image clearance < 80%');
  if (c3Failing) causes.push('HE throughput > 2× EN baseline');
  return (
    `**Option 1 — SWITCH to Tel Aviv (recommended)**\n` +
    `Rename .planning/phases/02-pilot-region-jerusalem-m2 → 02-pilot-region-tel-aviv-m2;\n` +
    `restart Wave 1 with Tel Aviv H-tag scaffolding from PITFALLS §4.2. ~4-6h\n` +
    `of rework; no Quality Gate impact yet (gate has not run). Cause(s): ${causes.join(', ')}.\n\n` +
    `**Option 2 — OVERRIDE** (continue with Jerusalem despite signal)\n` +
    `Append rationale to this file under "Verdict: OVERRIDE" and proceed to\n` +
    `Phase 2.3. Acknowledged risk: failing criteria carry forward into the\n` +
    `pre-Phase-3 Quality Gate where they will fire again at higher cost.`
  );
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

async function readTextSafe(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    return await readFile(path, 'utf8');
  } catch {
    return fallback;
  }
}

async function main() {
  const audit = await readJsonSafe(AUDIT_PATH, null);
  const credits = await readJsonSafe(CREDITS_PATH, null);
  const timing = await readTextSafe(TIMING_PATH, '');

  const criterion1 = evaluateCriterion1(audit);
  const criterion2 = evaluateCriterion2(credits);
  const criterion3 = evaluateCriterion3(timing);

  const allPass = criterion1.pass && criterion2.pass && criterion3.pass;
  const verdict = allPass ? 'PASS' : 'SWITCH';

  await writeReport({ criterion1, criterion2, criterion3, verdict }, OUT_PATH);

  console.log('qa:pilot-checkpoint:');
  console.log(`  Criterion 1: ${criterion1.summary}`);
  console.log(`  Criterion 2: ${criterion2.summary}`);
  console.log(`  Criterion 3: ${criterion3.summary}`);
  console.log(`  Verdict: ${verdict} — see data/pilot-checkpoint.md`);

  if (!allPass) process.exit(1);
}

// Only invoke main when this is the entrypoint (not when imported by tests).
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
    console.error('qa:pilot-checkpoint: failed:', e);
    process.exit(1);
  });
}
