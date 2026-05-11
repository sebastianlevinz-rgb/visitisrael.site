#!/usr/bin/env node
/**
 * scripts/qa/hebrew-content.mjs
 *
 * Phase 2 plan 02-02 Wave 0: Hebrew-content QA checker.
 *
 * Reads `.velite/regions.json` (and other compiled collections when present),
 * filters entries to `lang === 'he'`, and applies three Hebrew-specific
 * editorial rules on the COMPILED MDX body string:
 *
 *   1. Ktiv maleh consistency
 *      For each known ktiv-chaser / ktiv-maleh pair, flag if BOTH spellings
 *      appear on the same page (signals editorial drift). Threshold: ≤5
 *      inconsistencies/page (mirrors AUD-025).
 *
 *   2. Paired religious naming on first reference
 *      For each religious site in `data/religious-sites.json` (HE primary
 *      name = `name.he`, paired alternate = `alternateName.he`), if the
 *      primary HE name appears AND the site is `contested === true`, the
 *      alternate must appear within 300 chars of the FIRST occurrence
 *      (Hebrew parallel of `lib/seo/naming.ts` detectTempleMountPaired).
 *      Strictly enforced for `temple-mount` (paired with אל-חרם א-שריף).
 *
 *   3. Wailing-Wall HE equivalent forbidden
 *      The string `כותל הדמעות` must NEVER appear (HE-parallel of AUD-017).
 *
 * Output:
 *   - Per-page report to stdout
 *   - JSON summary at `data/hebrew-content-results.json` (consumed by Phase
 *     2.6 Quality Gate + downstream audit dashboards)
 *
 * Exit:
 *   - 0 if all HE pages pass
 *   - 1 if any violations
 *
 * Greenfield-tolerant: missing `.velite/regions.json` or zero HE entries
 * = no-op, exit 0. The script is greenfield-safe so it can be wired into
 * pre-commit hooks immediately.
 *
 * Pure-helpers-exported-for-Vitest pattern (Phase 1 lock, plan 11):
 *   - main() runs only when import.meta.url === process.argv[1]
 *   - checkPage() + checkAllPages() + KTIV_PAIRS exported for unit tests
 *
 * Cross-platform: pure node, no shell. Windows + macOS + Linux.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const REPO_ROOT = process.cwd();
const REGIONS_JSON = resolve(REPO_ROOT, '.velite/regions.json');
const SUB_DEST_JSON = resolve(REPO_ROOT, '.velite/subDestinations.json');
const ITINERARIES_JSON = resolve(REPO_ROOT, '.velite/itineraries.json');
const RELIGIOUS_SITES_JSON = resolve(REPO_ROOT, 'data/religious-sites.json');
const OUT_PATH = resolve(REPO_ROOT, 'data/hebrew-content-results.json');

/**
 * Known ktiv-chaser → ktiv-maleh pairs (Phase 2 starter set; expandable).
 * Match Phase 1 AUD-025 starter dict + hebrew-grammar-quick-ref.md table.
 *
 * Strategy: detect when BOTH spellings appear on the same page (editorial
 * drift signal). Single-spelling pages pass even if the page uses ktiv
 * chaser (we don't have ground-truth on which word is being targeted).
 */
export const KTIV_PAIRS = [
  ['תכנה', 'תוכנה'], // software (tochnah)
  ['שרות', 'שירות'], // service (sherut)
  ['קדם', 'קודם'], // before (kodem) — careful: קדם is also "ancient"
  ['חדש', 'חידוש'], // innovation (chidush) — overlap with adj. "new" risk
  ['ברור', 'בירור'], // clarification (berur)
  ['גדלות', 'גדולות'], // big (pl. fem.)
  ['ילדם', 'ילדים'], // children
];

/** HE-parallel of AUD-017: "כותל הדמעות" (Hebrew for "Wailing Wall") banned. */
export const WAILING_WALL_HE_REGEX = /כותל\s+הדמעות/;

/** Pairing window for religious-site dual-naming (HE-parallel of AUD-019). */
export const HE_PAIRING_WINDOW = 300;

/**
 * Locate the first occurrence of `needle` (regex) inside `text`. Returns
 * `{ index, match }` or null. Centralizes the regex.exec dance.
 */
function firstOccurrence(text, needle) {
  if (!needle) return null;
  const re = needle instanceof RegExp ? needle : new RegExp(needle);
  const m = re.exec(text);
  if (m === null) return null;
  return { index: m.index, match: m[0] };
}

/**
 * Check a single HE page for the three Hebrew editorial rules.
 *
 * @param {object} page - Velite Region entry: { lang, region, body, ... }
 * @param {object[]} sitesPaired - Array of religious sites where `contested
 *    === true` so the HE primary + alternate names must appear together.
 * @returns {object} { slug, violations: [...], inconsistencies: number }
 */
export function checkPage(page, sitesPaired) {
  const body = typeof page.body === 'string' ? page.body : '';
  const violations = [];

  // Rule 3 (run first — clearest forbidden string): כותל הדמעות
  const wailing = firstOccurrence(body, WAILING_WALL_HE_REGEX);
  if (wailing !== null) {
    violations.push({
      rule: 'WAILING_WALL_HE',
      severity: 'major',
      message:
        'Found "כותל הדמעות" — use "הכותל המערבי" (HE parallel of AUD-017).',
      match: wailing.match,
    });
  }

  // Rule 2: paired religious naming on first reference
  for (const site of sitesPaired) {
    const primary = site.name?.he;
    const alternate = site.alternateName?.he;
    if (!primary || !alternate) continue;
    const primaryHit = firstOccurrence(body, new RegExp(escapeRegExp(primary)));
    if (primaryHit === null) continue; // not mentioned → vacuously paired
    const windowText = body.slice(
      primaryHit.index,
      primaryHit.index + HE_PAIRING_WINDOW,
    );
    if (!windowText.includes(alternate)) {
      violations.push({
        rule: 'HE_PAIRED_NAMING',
        severity: 'major',
        message: `Contested HE site "${primary}" first reference unpaired with alternate "${alternate}" within ${HE_PAIRING_WINDOW} chars.`,
        match: primary,
      });
    }
  }

  // Rule 1: ktiv maleh consistency (both forms on same page = inconsistency)
  let inconsistencies = 0;
  for (const [chaser, maleh] of KTIV_PAIRS) {
    if (chaser === maleh) continue;
    const reChaser = new RegExp(`(?<![א-ת])${escapeRegExp(chaser)}(?![א-ת])`);
    const reMaleh = new RegExp(`(?<![א-ת])${escapeRegExp(maleh)}(?![א-ת])`);
    const hasChaser = reChaser.test(body);
    const hasMaleh = reMaleh.test(body);
    if (hasChaser && hasMaleh) {
      inconsistencies++;
      violations.push({
        rule: 'KTIV_MALEH_DRIFT',
        severity: 'minor',
        message: `Mixed ktiv: "${chaser}" (chaser) AND "${maleh}" (maleh) both appear — pick one consistently.`,
        match: chaser,
      });
    }
  }

  if (inconsistencies > 5) {
    violations.push({
      rule: 'KTIV_THRESHOLD',
      severity: 'major',
      message: `${inconsistencies} ktiv-maleh inconsistencies on page (threshold 5; matches AUD-025).`,
      match: String(inconsistencies),
    });
  }

  return {
    slug: page.slug ?? page.region ?? 'unknown',
    region: page.region ?? null,
    lang: page.lang,
    violations,
    inconsistencies,
  };
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Read Velite regions.json (+ subDestinations when present), filter HE,
 * apply checkPage to each. Returns { pages: [...], totalViolations }.
 */
export function checkAllPages(regions, religiousSites) {
  // Sites for paired-naming enforcement: contested OR has alternateName.he.
  // Phase 2 strict scope: only `contested === true` triggers HE-pairing
  // (matches the EN-side AUD-019 contract for Temple Mount).
  const sitesPaired = Object.values(religiousSites ?? {}).filter(
    (s) =>
      s && typeof s === 'object' && s.contested === true && s.alternateName?.he,
  );

  const heRegions = (regions ?? []).filter((r) => r.lang === 'he');
  const pages = heRegions.map((r) => checkPage(r, sitesPaired));
  const totalViolations = pages.reduce(
    (acc, p) => acc + p.violations.length,
    0,
  );
  return { pages, totalViolations };
}

/** Read a JSON file, return parsed contents or fallback on any error. */
async function readJsonSafe(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** Print human-readable report; return summary object for json output. */
function printReport(result) {
  const { pages, totalViolations } = result;
  if (pages.length === 0) {
    console.log(
      'qa:hebrew-content: no HE pages found in .velite/regions.json — skipping.',
    );
    return;
  }
  for (const p of pages) {
    const head = `  ${p.lang}/${p.slug}`;
    if (p.violations.length === 0) {
      console.log(`${head} — PASS`);
    } else {
      console.log(`${head} — ${p.violations.length} violation(s):`);
      for (const v of p.violations) {
        console.log(`    [${v.severity}] ${v.rule}: ${v.message}`);
      }
    }
  }
  console.log(
    `qa:hebrew-content: ${pages.length} HE page(s) scanned, ${totalViolations} violation(s) total.`,
  );
}

async function ensureDir(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

async function main() {
  const regions = await readJsonSafe(REGIONS_JSON, []);
  const subDests = await readJsonSafe(SUB_DEST_JSON, []);
  const itins = await readJsonSafe(ITINERARIES_JSON, []);
  const sites = await readJsonSafe(RELIGIOUS_SITES_JSON, {});
  // Phase 2.3+2.4: sub-destinations + itineraries carry the same HE editorial
  // rules as regions (paired naming on contested sites + forbidden כותל הדמעות
  // + ktiv maleh). Concatenating them through checkAllPages keeps the rule
  // logic single-source.
  const result = checkAllPages([...regions, ...subDests, ...itins], sites);

  await ensureDir(OUT_PATH);
  await writeFile(
    OUT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalPages: result.pages.length,
        totalViolations: result.totalViolations,
        pages: result.pages,
      },
      null,
      2,
    ) + '\n',
    'utf8',
  );

  printReport(result);

  if (result.totalViolations > 0) {
    console.error(
      `qa:hebrew-content: ${result.totalViolations} violation(s) — see data/hebrew-content-results.json.`,
    );
    process.exit(1);
  }
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
    console.error('qa:hebrew-content: failed:', e);
    process.exit(1);
  });
}
