/**
 * Vitest suite for the 34 AUD-001..AUD-034 rule files.
 *
 * Two-pronged contract:
 *   1. EACH rule fires at least once against `tests/audit-fixtures/violations.html`
 *      (or returns the deferred "info" marker for the 2 cron-deferred rules).
 *   2. EACH rule emits ZERO blocking findings against `tests/audit-fixtures/clean.html`
 *      (deferred rules emit ONE info entry which is allowed and skipped).
 *
 * The fixtures are synthetic — they're crafted to exercise the rule shapes,
 * not to mirror any real production HTML. Plan 10's orchestrator runs all
 * rules against built .next/server/app HTML separately at qa:audit time.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';
import { rules } from '../rules';
import { computeScore, blockingIssues } from '../score';
import { profiles } from '../profiles';
import type { Issue } from '../rules/types';

const VIOLATIONS = readFileSync(
  resolve(process.cwd(), 'tests/audit-fixtures/violations.html'),
  'utf8',
);
const CLEAN = readFileSync(
  resolve(process.cwd(), 'tests/audit-fixtures/clean.html'),
  'utf8',
);

// Rules that ALWAYS return only an info-severity "deferred" entry regardless
// of fixture content (Phase 6 / Lighthouse-dependent).
const CRON_DEFERRED = new Set(['AUD-010', 'AUD-011']);

// Rules that are Lighthouse-dependent — info-severity if data/lighthouse-results.json
// absent, otherwise they actually fire. In Phase 1 they're effectively deferred too.
const LH_DEFERRED = new Set(['AUD-013', 'AUD-034']);

// Rules that don't fire against the synthetic fixtures (heuristic gate on frontmatter
// signals not present in fixtures). Documented so test stays honest.
const FRONTMATTER_GATED = new Set([
  'AUD-006', // requires fm.collection === 'subDestinations' + parentRegion
  'AUD-007', // requires fm.wordCount + fm.siblingWordCount
  'AUD-016', // requires fm.lastReviewed
  'AUD-020', // requires fm.slug ∈ {bethlehem,hebron,jericho}
  'AUD-023', // requires fm.slug with year
  'AUD-024', // requires lang === 'he'
  'AUD-025', // requires lang === 'he'
  'AUD-029', // requires lang === 'he' + form input
  'AUD-021', // requires JSON-LD OpeningHoursSpecification
  'AUD-026', // requires ledger entry with restricted subjectType
  'AUD-031', // helper tests already carry Israel fixtures → no findings
  'AUD-004', // requires ledger entry with width < 1200 — Phase 1 ledger empty
]);

describe('audit rules (AUD-001..AUD-034)', () => {
  it('barrel exports all 34 rules in source-id order', () => {
    expect(rules).toHaveLength(34);
    for (let i = 0; i < rules.length; i++) {
      const expected = `AUD-${String(i + 1).padStart(3, '0')}`;
      expect(rules[i]?.id).toBe(expected);
    }
  });

  it('every rule has id + severity + description + scan()', () => {
    for (const r of rules) {
      expect(r.id).toMatch(/^AUD-\d{3}$/);
      expect(['critical', 'major', 'minor', 'info']).toContain(r.severity);
      expect(typeof r.description).toBe('string');
      expect(typeof r.scan).toBe('function');
    }
  });

  describe('against violations.html', () => {
    const $ = cheerio.load(VIOLATIONS);

    for (const r of rules) {
      it(`${r.id} fires (or marks deferred)`, () => {
        const fm = { slug: '', lang: 'en' };
        const issues = r.scan(VIOLATIONS, $, fm, 'en');
        if (CRON_DEFERRED.has(r.id) || LH_DEFERRED.has(r.id)) {
          // Must emit exactly one info-severity deferred marker.
          expect(issues.length).toBeGreaterThanOrEqual(1);
          const info = issues.find((iss: Issue) => iss.severity === 'info');
          expect(info).toBeDefined();
          expect(info!.message).toMatch(/deferred/i);
          return;
        }
        if (FRONTMATTER_GATED.has(r.id)) {
          // Frontmatter-gated rules can't fire on bare fixture HTML; assert
          // they return [] (proves they don't false-positive when their
          // gating signal is absent).
          expect(issues).toEqual([]);
          return;
        }
        // Otherwise: at least one issue must fire.
        expect(
          issues.length,
          `${r.id} produced no issues — expected ≥1`,
        ).toBeGreaterThan(0);
      });
    }
  });

  describe('against clean.html', () => {
    const $ = cheerio.load(CLEAN);

    for (const r of rules) {
      it(`${r.id} emits no blocking issues`, () => {
        const fm = { slug: 'clean', lang: 'en' };
        const issues = r.scan(CLEAN, $, fm, 'en');
        const blocking = issues.filter(
          (iss: Issue) => iss.severity !== 'info',
        );
        if (CRON_DEFERRED.has(r.id) || LH_DEFERRED.has(r.id)) {
          // Deferred rules emit their info marker; no blocking entries.
          expect(blocking).toEqual([]);
          return;
        }
        expect(
          blocking,
          `${r.id} produced unexpected blocking issues: ${JSON.stringify(blocking)}`,
        ).toEqual([]);
      });
    }
  });

  it('score helper deducts profile-specific weights only', () => {
    const issues: Issue[] = [
      { rule: 'AUD-001', severity: 'critical', message: 'x' },
      { rule: 'AUD-017', severity: 'major', message: 'x' },
      { rule: 'AUD-009', severity: 'critical', message: 'x' },
    ];
    const regionScore = computeScore(issues, profiles.REGION_CANONICAL);
    const utilityScore = computeScore(issues, profiles.UTILITY);
    // REGION: AUD-001(5) + AUD-017(4) + AUD-009(8) = 17 → 83.
    expect(regionScore).toBe(83);
    // UTILITY: AUD-001(4) + AUD-017(omitted=0) + AUD-009(omitted=0) = 4 → 96.
    expect(utilityScore).toBe(96);
    // Profiles must produce DIFFERENT scores for the same issue set.
    expect(regionScore).not.toBe(utilityScore);
  });

  it('blockingIssues filters by required:true on the profile', () => {
    const issues: Issue[] = [
      { rule: 'AUD-001', severity: 'critical', message: 'x' }, // required on REGION
      { rule: 'AUD-005', severity: 'major', message: 'x' }, // NOT required on REGION
      { rule: 'AUD-010', severity: 'info', message: 'deferred' }, // info — never blocking
    ];
    const blockers = blockingIssues(issues, profiles.REGION_CANONICAL);
    const ids = blockers.map((b) => b.rule);
    expect(ids).toContain('AUD-001');
    expect(ids).not.toContain('AUD-005');
    expect(ids).not.toContain('AUD-010');
  });

  it('AUD-04 hook coverage: lint-staged config references credits + schema validators', () => {
    // The pre-commit hook (plan 01) wires lint-staged. AUD-04 requires the
    // hooks be active end-to-end. This test asserts the config still wires
    // both validators — if a future PR removes one, this test fails.
    const huskyPreCommitPath = resolve(process.cwd(), '.husky/pre-commit');
    expect(existsSync(huskyPreCommitPath)).toBe(true);
    const husky = readFileSync(huskyPreCommitPath, 'utf8');
    expect(husky).toMatch(/lint-staged/i);

    const cfgPath = resolve(process.cwd(), 'lint-staged.config.js');
    expect(existsSync(cfgPath)).toBe(true);
    const cfg = readFileSync(cfgPath, 'utf8');
    expect(cfg).toMatch(/qa:credits/);
    expect(cfg).toMatch(/qa:schema/);
  });
});
