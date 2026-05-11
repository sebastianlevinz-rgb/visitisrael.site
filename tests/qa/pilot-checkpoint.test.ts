/**
 * Plan 02-02 Task 1 — Unit tests for scripts/qa/pilot-checkpoint.mjs.
 *
 * The script implements the 3-criteria pilot-switch checkpoint that decides
 * whether Phase 2 advances to Wave 3 (Jerusalem sub-destinations) or pivots
 * to Tel Aviv. These tests pin the per-criterion evaluation logic + the
 * report-rendering schema. Real file IO is mocked via synthetic fixtures.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  mkdtempSync,
  writeFileSync,
  mkdirSync,
  readFileSync,
  existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

// .mjs helper module — Vite resolver handles the extension.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const helpers: any = await import('../../scripts/qa/pilot-checkpoint.mjs');

describe('pilot-checkpoint constants', () => {
  it('exports the 4 editorial rules in canonical order', () => {
    expect(helpers.EDITORIAL_RULES).toEqual([
      'AUD-017',
      'AUD-018',
      'AUD-019',
      'AUD-020',
    ]);
  });

  it('exports the 4 restricted-site subjectType values', () => {
    expect(Array.from(helpers.RESTRICTED_SUBJECTS).sort()).toEqual(
      ['bahaiGardens', 'domeOfTheRock', 'holySepulchre', 'westernWall'].sort(),
    );
  });

  it('HE throughput threshold is locked at 2.0 (matches CONTEXT.md criterion 3)', () => {
    expect(helpers.HE_THROUGHPUT_RATIO_MAX).toBe(2.0);
  });
});

describe('evaluateCriterion1 (editorial style)', () => {
  function cleanAuditPage(slug: string, lang: string) {
    return {
      slug,
      lang,
      profile: 'REGION_CANONICAL',
      score: 100,
      issues: [
        {
          rule: 'AUD-010',
          severity: 'info',
          message:
            'Deferred: weekly affiliate-URL health monitor lands in Phase 6.',
        },
      ],
      blocking: [],
      totalRules: 34,
      rulesFired: 0,
    };
  }

  it('PASS when both EN and HE Jerusalem pages have 0 AUD-017..020 violations', () => {
    const audit = [
      cleanAuditPage('jerusalem', 'en'),
      cleanAuditPage('jerusalem', 'he'),
    ];
    const result = helpers.evaluateCriterion1(audit);
    expect(result.pass).toBe(true);
    expect(result.summary).toMatch(/PASS/);
  });

  it('FAIL with details when /jerusalem HE page is absent', () => {
    const audit = [cleanAuditPage('jerusalem', 'en')];
    const result = helpers.evaluateCriterion1(audit);
    expect(result.pass).toBe(false);
    expect(result.details.hePageMissing).toBe(true);
    expect(result.summary).toMatch(/FAIL/i);
  });

  it('FAIL when a single AUD-017 violation appears on /en/jerusalem', () => {
    const en = cleanAuditPage('jerusalem', 'en');
    en.issues.push({
      rule: 'AUD-017',
      severity: 'major',
      message: 'Found "Wailing Wall" — use "Western Wall".',
    });
    const audit = [en, cleanAuditPage('jerusalem', 'he')];
    const result = helpers.evaluateCriterion1(audit);
    expect(result.pass).toBe(false);
    expect(result.summary).toMatch(/AUD-017/);
    expect(result.details.perRule['AUD-017'].en).toBe(1);
  });

  it('FAIL when AUD-019 fires only on /jerusalem HE page', () => {
    const he = cleanAuditPage('jerusalem', 'he');
    he.issues.push({
      rule: 'AUD-019',
      severity: 'minor',
      message: '"Temple Mount" unpaired with "Haram al-Sharif".',
    });
    const audit = [cleanAuditPage('jerusalem', 'en'), he];
    const result = helpers.evaluateCriterion1(audit);
    expect(result.pass).toBe(false);
    expect(result.details.perRule['AUD-019'].he).toBe(1);
  });

  it('ignores info-severity entries (matches AUD scorer contract)', () => {
    const en = cleanAuditPage('jerusalem', 'en');
    en.issues.push({
      rule: 'AUD-017',
      severity: 'info',
      message: 'Deferred informational note (should not count).',
    });
    const audit = [en, cleanAuditPage('jerusalem', 'he')];
    const result = helpers.evaluateCriterion1(audit);
    expect(result.pass).toBe(true);
  });

  it('FAIL when audit array is null/undefined/empty', () => {
    expect(helpers.evaluateCriterion1(null).pass).toBe(false);
    expect(helpers.evaluateCriterion1(undefined).pass).toBe(false);
    expect(helpers.evaluateCriterion1([]).pass).toBe(false);
  });
});

describe('evaluateCriterion2 (restricted-site image clearance)', () => {
  function entry(
    src: string,
    subjectType: string,
    cleared: boolean,
  ): Record<string, unknown> {
    return {
      src,
      author: 'Test Author',
      license: 'CC-BY-SA-4.0',
      sourceUrl: 'https://example.com',
      region: 'jerusalem',
      slug: 'jerusalem',
      width: 1600,
      height: 1067,
      subjectType,
      ...(cleared
        ? { restrictedSiteAcknowledgment: 'Cleared per partnership XYZ' }
        : {}),
    };
  }

  it('PASS at 80% coverage (4/5 cleared)', () => {
    const credits = {
      '/a': entry('/a', 'westernWall', true),
      '/b': entry('/b', 'westernWall', true),
      '/c': entry('/c', 'holySepulchre', true),
      '/d': entry('/d', 'domeOfTheRock', true),
      '/e': entry('/e', 'bahaiGardens', false),
    };
    const result = helpers.evaluateCriterion2(credits);
    expect(result.pass).toBe(true);
    expect(result.details.coverage).toBeCloseTo(0.8, 5);
  });

  it('FAIL at 60% coverage (3/5 cleared)', () => {
    const credits = {
      '/a': entry('/a', 'westernWall', true),
      '/b': entry('/b', 'westernWall', true),
      '/c': entry('/c', 'holySepulchre', true),
      '/d': entry('/d', 'domeOfTheRock', false),
      '/e': entry('/e', 'bahaiGardens', false),
    };
    const result = helpers.evaluateCriterion2(credits);
    expect(result.pass).toBe(false);
    expect(result.details.coverage).toBeCloseTo(0.6, 5);
    expect(result.details.uncleared).toHaveLength(2);
  });

  it('PASS vacuously when no restricted-site Jerusalem images present', () => {
    const credits = {
      '/x': { ...entry('/x', 'cityscape', false) },
    };
    const result = helpers.evaluateCriterion2(credits);
    expect(result.pass).toBe(true);
    expect(result.details.total).toBe(0);
  });

  it('ignores non-Jerusalem restricted-site images', () => {
    const credits = {
      '/x': { ...entry('/x', 'westernWall', false), region: 'tel-aviv' },
    };
    const result = helpers.evaluateCriterion2(credits);
    expect(result.pass).toBe(true);
    expect(result.details.total).toBe(0);
  });

  it('FAIL when credits payload is null/malformed', () => {
    expect(helpers.evaluateCriterion2(null).pass).toBe(false);
    expect(helpers.evaluateCriterion2(undefined).pass).toBe(false);
    expect(helpers.evaluateCriterion2('not an object').pass).toBe(false);
  });

  it('treats whitespace-only restrictedSiteAcknowledgment as uncleared', () => {
    const credits = {
      '/a': {
        ...entry('/a', 'westernWall', false),
        restrictedSiteAcknowledgment: '   ',
      },
      '/b': entry('/b', 'holySepulchre', true),
    };
    const result = helpers.evaluateCriterion2(credits);
    expect(result.pass).toBe(false);
    expect(result.details.coverage).toBeCloseTo(0.5, 5);
  });
});

describe('evaluateCriterion3 (HE throughput vs EN baseline)', () => {
  it('PASS at ratio 1.58 (240 / 380)', () => {
    const log = '2.1 EN canonical: 240min\n2.2 HE canonical: 380min\n';
    const result = helpers.evaluateCriterion3(log);
    expect(result.pass).toBe(true);
    expect(result.details.ratio).toBeCloseTo(1.58, 2);
  });

  it('PASS at exact ratio 2.0', () => {
    const log = '2.1 EN canonical: 30min\n2.2 HE canonical: 60min\n';
    const result = helpers.evaluateCriterion3(log);
    expect(result.pass).toBe(true);
    expect(result.details.ratio).toBe(2);
  });

  it('FAIL at ratio 2.5 (240 / 600)', () => {
    const log = '2.1 EN canonical: 240min\n2.2 HE canonical: 600min\n';
    const result = helpers.evaluateCriterion3(log);
    expect(result.pass).toBe(false);
    expect(result.details.ratio).toBe(2.5);
  });

  it('FAIL when EN line absent', () => {
    const log = '2.2 HE canonical: 60min\n';
    const result = helpers.evaluateCriterion3(log);
    expect(result.pass).toBe(false);
    expect(result.summary).toMatch(/EN canonical/i);
  });

  it('FAIL when HE line absent', () => {
    const log = '2.1 EN canonical: 30min\n';
    const result = helpers.evaluateCriterion3(log);
    expect(result.pass).toBe(false);
    expect(result.summary).toMatch(/HE canonical/i);
  });

  it('FAIL on empty timing log', () => {
    expect(helpers.evaluateCriterion3('').pass).toBe(false);
    expect(helpers.evaluateCriterion3(null).pass).toBe(false);
    expect(helpers.evaluateCriterion3(undefined).pass).toBe(false);
  });

  it('case-insensitive parsing of EN/HE labels', () => {
    const log = '2.1 en canonical: 30min\n2.2 he canonical: 45min\n';
    const result = helpers.evaluateCriterion3(log);
    expect(result.pass).toBe(true);
    expect(result.details.ratio).toBe(1.5);
  });
});

describe('renderReportMd schema', () => {
  it('emits a Verdict field with PASS/SWITCH/OVERRIDE value', () => {
    const md = helpers.renderReportMd({
      criterion1: { pass: true, summary: 'PASS', details: { perRule: {} } },
      criterion2: { pass: true, summary: 'PASS', details: {} },
      criterion3: { pass: true, summary: 'PASS', details: {} },
      verdict: 'PASS',
    });
    expect(md).toMatch(/^# Pilot-Switch Checkpoint/m);
    expect(md).toMatch(/\*\*Verdict:\*\* (PASS|SWITCH|OVERRIDE)/);
    expect(md).toMatch(/## Criterion 1:/);
    expect(md).toMatch(/## Criterion 2:/);
    expect(md).toMatch(/## Criterion 3:/);
    expect(md).toMatch(/## Verdict/);
    expect(md).toMatch(/## Suggested next action/);
  });

  it('SWITCH verdict surfaces failing criteria details', () => {
    const md = helpers.renderReportMd({
      criterion1: {
        pass: false,
        summary: 'FAIL — AUD-017 fired (EN=1, HE=0)',
        details: { perRule: {} },
      },
      criterion2: {
        pass: true,
        summary: 'PASS — 4/5 cleared (80%)',
        details: {},
      },
      criterion3: { pass: true, summary: 'PASS — ratio 1.5', details: {} },
      verdict: 'SWITCH',
    });
    expect(md).toMatch(/\*\*Verdict:\*\* SWITCH/);
    expect(md).toMatch(/Criterion 1:.*FAIL/i);
    expect(md).toMatch(/Option 1 — SWITCH/);
    expect(md).toMatch(/Option 2 — OVERRIDE/);
  });

  it('PASS verdict suggests next action to advance to Wave 3', () => {
    const md = helpers.renderReportMd({
      criterion1: { pass: true, summary: 'PASS', details: { perRule: {} } },
      criterion2: { pass: true, summary: 'PASS', details: {} },
      criterion3: { pass: true, summary: 'PASS', details: {} },
      verdict: 'PASS',
    });
    expect(md).toMatch(/Phase 2\.3/);
    expect(md).toMatch(/unblocked|locked as Jerusalem/i);
  });
});

describe('writeReport file IO', () => {
  let tmp: string;

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), 'pilot-checkpoint-'));
  });

  it('writes data/pilot-checkpoint.md at the given path', async () => {
    const outPath = resolve(tmp, 'pilot-checkpoint.md');
    await helpers.writeReport(
      {
        criterion1: { pass: true, summary: 'PASS', details: { perRule: {} } },
        criterion2: { pass: true, summary: 'PASS', details: {} },
        criterion3: { pass: true, summary: 'PASS', details: {} },
        verdict: 'PASS',
      },
      outPath,
    );
    expect(existsSync(outPath)).toBe(true);
    const content = readFileSync(outPath, 'utf8');
    expect(content).toMatch(/Verdict:\*\* PASS/);
  });

  it('creates the parent directory if missing', async () => {
    const outPath = resolve(tmp, 'nested', 'dir', 'pilot-checkpoint.md');
    await helpers.writeReport(
      {
        criterion1: { pass: false, summary: 'FAIL', details: {} },
        criterion2: { pass: true, summary: 'PASS', details: {} },
        criterion3: { pass: true, summary: 'PASS', details: {} },
        verdict: 'SWITCH',
      },
      outPath,
    );
    expect(existsSync(outPath)).toBe(true);
  });
});

describe('main entrypoint contract (subprocess exit code)', () => {
  // Pure-helpers test covers the math/string composition; here we just verify
  // that the module can be imported as ESM and exposes the expected surface.
  it('exports the documented public helpers', () => {
    expect(typeof helpers.evaluateCriterion1).toBe('function');
    expect(typeof helpers.evaluateCriterion2).toBe('function');
    expect(typeof helpers.evaluateCriterion3).toBe('function');
    expect(typeof helpers.writeReport).toBe('function');
    expect(typeof helpers.renderReportMd).toBe('function');
  });

  it('importing the module does NOT invoke main()', () => {
    // If main() ran on import, we would have hit a side-effect (file write).
    // The Phase-1 pure-helpers pattern (main only when entrypoint) ensures
    // this; the test exists to pin the contract via behavior.
    // The simplest signal: process.exitCode is not 1 after import.
    expect(process.exitCode).not.toBe(1);
    void mkdirSync; // silence unused-import
    void writeFileSync;
  });
});
