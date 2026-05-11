/**
 * Plan 03-01 Task 1 — Unit tests for scripts/qa/region-gate.mjs.
 *
 * The script implements the per-region soft gate that fires for each Phase 3
 * region (plans 01-11). Tests pin the per-criterion evaluation logic +
 * filtering rules + report rendering schema. Real file IO is mocked via
 * synthetic fixtures.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

// .mjs helper module — Vite resolver handles the extension.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const helpers: any = await import('../../scripts/qa/region-gate.mjs');

interface AuditEntry {
  slug: string;
  lang: 'en' | 'he';
  profile: string;
  score: number;
  issues: Array<{ rule: string; severity: string; message: string }>;
  blocking: string[];
  totalRules?: number;
  rulesFired?: number;
}

function makeRegionEntry(
  slug: string,
  lang: 'en' | 'he',
  score = 90,
): AuditEntry {
  return {
    slug,
    lang,
    profile: 'REGION_CANONICAL',
    score,
    issues: [],
    blocking: [],
    totalRules: 34,
    rulesFired: 0,
  };
}

function makeSubDestEntry(
  slug: string,
  lang: 'en' | 'he',
  score = 85,
): AuditEntry {
  return {
    slug,
    lang,
    profile: 'SUB_DESTINATION',
    score,
    issues: [],
    blocking: [],
    totalRules: 34,
    rulesFired: 0,
  };
}

describe('region-gate constants', () => {
  it('DEFAULT_THRESHOLDS locked at canonical=80 / subDest=75', () => {
    expect(helpers.DEFAULT_THRESHOLDS.canonical).toBe(80);
    expect(helpers.DEFAULT_THRESHOLDS.subDest).toBe(75);
  });

  it('exports the documented public helpers', () => {
    expect(typeof helpers.filterByRegionPrefix).toBe('function');
    expect(typeof helpers.classifyEntry).toBe('function');
    expect(typeof helpers.evaluateRegion).toBe('function');
    expect(typeof helpers.evaluateParity).toBe('function');
    expect(typeof helpers.evaluateLighthouse).toBe('function');
    expect(typeof helpers.renderReport).toBe('function');
    expect(typeof helpers.writeReport).toBe('function');
  });
});

describe('filterByRegionPrefix', () => {
  it('matches the region canonical slug (en-prefixed and unprefixed)', () => {
    const audit = [
      makeRegionEntry('tel-aviv', 'en'),
      makeRegionEntry('tel-aviv', 'he'),
      makeRegionEntry('en/tel-aviv', 'en'),
    ];
    const matched = helpers.filterByRegionPrefix(audit, 'tel-aviv');
    expect(matched).toHaveLength(3);
  });

  it('matches sub-destinations under the region prefix', () => {
    const audit = [
      makeRegionEntry('tel-aviv', 'en'),
      makeSubDestEntry('tel-aviv/old-jaffa', 'en'),
      makeSubDestEntry('tel-aviv/old-jaffa', 'he'),
      makeSubDestEntry('en/tel-aviv/carmel-market', 'en'),
    ];
    const matched = helpers.filterByRegionPrefix(audit, 'tel-aviv');
    expect(matched).toHaveLength(4);
  });

  it('does NOT false-match similar prefixes (tel-aviv vs tel-aviv-museum)', () => {
    // The "tel-aviv" region must NOT swallow a hypothetical "tel-aviv-museum"
    // region slug (which would be a single-page region, not a sub-dest).
    const audit = [
      makeRegionEntry('tel-aviv-museum', 'en'),
      makeRegionEntry('tel-aviv-museum', 'he'),
    ];
    const matched = helpers.filterByRegionPrefix(audit, 'tel-aviv');
    expect(matched).toHaveLength(0);
  });

  it('does NOT match unrelated regions', () => {
    const audit = [
      makeRegionEntry('jerusalem', 'en'),
      makeSubDestEntry('jerusalem/western-wall', 'en'),
    ];
    const matched = helpers.filterByRegionPrefix(audit, 'tel-aviv');
    expect(matched).toHaveLength(0);
  });

  it('handles nested region slugs like west-bank/bethlehem', () => {
    const audit = [
      makeRegionEntry('west-bank/bethlehem', 'en'),
      makeRegionEntry('west-bank/bethlehem', 'he'),
      makeRegionEntry('en/west-bank/bethlehem', 'en'),
      makeRegionEntry('west-bank/hebron', 'en'), // different region under same family
    ];
    const matched = helpers.filterByRegionPrefix(audit, 'west-bank/bethlehem');
    expect(matched).toHaveLength(3);
    expect(matched.every((e: AuditEntry) => e.slug.includes('bethlehem'))).toBe(
      true,
    );
  });

  it('returns empty array for null / undefined / empty inputs', () => {
    expect(helpers.filterByRegionPrefix(null, 'tel-aviv')).toEqual([]);
    expect(helpers.filterByRegionPrefix([], 'tel-aviv')).toEqual([]);
    expect(
      helpers.filterByRegionPrefix([makeRegionEntry('tel-aviv', 'en')], ''),
    ).toEqual([]);
  });
});

describe('classifyEntry', () => {
  it('classifies the region canonical', () => {
    expect(
      helpers.classifyEntry(makeRegionEntry('tel-aviv', 'en'), 'tel-aviv'),
    ).toBe('canonical');
    expect(
      helpers.classifyEntry(makeRegionEntry('en/tel-aviv', 'en'), 'tel-aviv'),
    ).toBe('canonical');
  });

  it('classifies sub-destinations', () => {
    expect(
      helpers.classifyEntry(
        makeSubDestEntry('tel-aviv/old-jaffa', 'en'),
        'tel-aviv',
      ),
    ).toBe('subDest');
    expect(
      helpers.classifyEntry(
        makeSubDestEntry('en/tel-aviv/carmel-market', 'he'),
        'tel-aviv',
      ),
    ).toBe('subDest');
  });

  it('returns unknown for unrelated entries', () => {
    expect(
      helpers.classifyEntry(makeRegionEntry('jerusalem', 'en'), 'tel-aviv'),
    ).toBe('unknown');
    expect(
      helpers.classifyEntry(
        makeRegionEntry('tel-aviv-museum', 'en'),
        'tel-aviv',
      ),
    ).toBe('unknown');
  });

  it('handles null/missing input', () => {
    expect(helpers.classifyEntry(null, 'tel-aviv')).toBe('unknown');
    expect(helpers.classifyEntry({}, 'tel-aviv')).toBe('unknown');
  });
});

describe('evaluateParity', () => {
  it('detects missing HE counterpart', () => {
    const entries = [
      makeRegionEntry('tel-aviv', 'en'),
      makeRegionEntry('tel-aviv', 'he'),
      makeSubDestEntry('tel-aviv/old-jaffa', 'en'),
      // HE missing for tel-aviv/old-jaffa
    ];
    const result = helpers.evaluateParity(entries);
    expect(result.missingHe).toEqual(['tel-aviv/old-jaffa']);
    expect(result.missingEn).toEqual([]);
  });

  it('detects missing EN counterpart', () => {
    const entries = [
      makeRegionEntry('tel-aviv', 'en'),
      makeRegionEntry('tel-aviv', 'he'),
      makeSubDestEntry('tel-aviv/old-jaffa', 'he'),
      // EN missing for tel-aviv/old-jaffa
    ];
    const result = helpers.evaluateParity(entries);
    expect(result.missingEn).toEqual(['tel-aviv/old-jaffa']);
    expect(result.missingHe).toEqual([]);
  });

  it('PASS when all pages paired', () => {
    const entries = [
      makeRegionEntry('tel-aviv', 'en'),
      makeRegionEntry('tel-aviv', 'he'),
      makeSubDestEntry('tel-aviv/old-jaffa', 'en'),
      makeSubDestEntry('tel-aviv/old-jaffa', 'he'),
    ];
    const result = helpers.evaluateParity(entries);
    expect(result.missingHe).toEqual([]);
    expect(result.missingEn).toEqual([]);
  });

  it('handles en/ prefix normalization in parity check', () => {
    const entries = [
      makeRegionEntry('en/tel-aviv', 'en'),
      makeRegionEntry('tel-aviv', 'he'),
    ];
    const result = helpers.evaluateParity(entries);
    expect(result.missingHe).toEqual([]);
    expect(result.missingEn).toEqual([]);
  });
});

describe('evaluateRegion', () => {
  it('PASS scenario: 1 canonical EN + 1 HE + 7 sub-dest pairs all ≥ thresholds', () => {
    const audit = [
      makeRegionEntry('tel-aviv', 'en', 92),
      makeRegionEntry('tel-aviv', 'he', 91),
      makeSubDestEntry('tel-aviv/old-jaffa', 'en', 85),
      makeSubDestEntry('tel-aviv/old-jaffa', 'he', 85),
      makeSubDestEntry('tel-aviv/carmel-market', 'en', 88),
      makeSubDestEntry('tel-aviv/carmel-market', 'he', 87),
      makeSubDestEntry('tel-aviv/rothschild', 'en', 90),
      makeSubDestEntry('tel-aviv/rothschild', 'he', 89),
      makeSubDestEntry('tel-aviv/tel-aviv-museum', 'en', 80),
      makeSubDestEntry('tel-aviv/tel-aviv-museum', 'he', 80),
      makeSubDestEntry('tel-aviv/florentin', 'en', 78),
      makeSubDestEntry('tel-aviv/florentin', 'he', 78),
      makeSubDestEntry('tel-aviv/tayelet', 'en', 82),
      makeSubDestEntry('tel-aviv/tayelet', 'he', 82),
      makeSubDestEntry('tel-aviv/neve-tzedek', 'en', 85),
      makeSubDestEntry('tel-aviv/neve-tzedek', 'he', 85),
    ];
    const result = helpers.evaluateRegion(audit, 'tel-aviv');
    expect(result.verdict).toBe('PASS');
    expect(result.failures).toHaveLength(0);
    expect(result.canonicalScores.en).toBe(92);
    expect(result.canonicalScores.he).toBe(91);
    expect(result.subDestScores).toHaveLength(14);
    expect(result.missingHe).toEqual([]);
    expect(result.missingEn).toEqual([]);
  });

  it('FAIL when canonical EN score is 78 (below 80 threshold)', () => {
    const audit = [
      makeRegionEntry('tel-aviv', 'en', 78),
      makeRegionEntry('tel-aviv', 'he', 88),
    ];
    const result = helpers.evaluateRegion(audit, 'tel-aviv');
    expect(result.verdict).toBe('FAIL');
    expect(
      result.failures.some(
        (f: { kind: string; lang: string }) =>
          f.kind === 'canonical-below-threshold' && f.lang === 'en',
      ),
    ).toBe(true);
  });

  it('FAIL when a sub-destination scores 70 (below 75 threshold)', () => {
    const audit = [
      makeRegionEntry('tel-aviv', 'en', 90),
      makeRegionEntry('tel-aviv', 'he', 90),
      makeSubDestEntry('tel-aviv/old-jaffa', 'en', 70),
      makeSubDestEntry('tel-aviv/old-jaffa', 'he', 85),
    ];
    const result = helpers.evaluateRegion(audit, 'tel-aviv');
    expect(result.verdict).toBe('FAIL');
    expect(
      result.failures.some(
        (f: { kind: string }) => f.kind === 'sub-dest-below-threshold',
      ),
    ).toBe(true);
  });

  it('FAIL when blocking issues are present', () => {
    const audit = [
      makeRegionEntry('tel-aviv', 'en', 90),
      makeRegionEntry('tel-aviv', 'he', 90),
    ];
    audit[0].blocking = ['AUD-008: page has 2 H1 elements'];
    const result = helpers.evaluateRegion(audit, 'tel-aviv');
    expect(result.verdict).toBe('FAIL');
    expect(result.blocking).toBe(1);
    expect(
      result.failures.some(
        (f: { kind: string }) => f.kind === 'blocking-issues',
      ),
    ).toBe(true);
  });

  it('FAIL when canonical EN is missing entirely', () => {
    const audit = [makeRegionEntry('tel-aviv', 'he', 90)];
    const result = helpers.evaluateRegion(audit, 'tel-aviv');
    expect(result.verdict).toBe('FAIL');
    expect(result.canonicalScores.en).toBeNull();
    expect(
      result.failures.some(
        (f: { kind: string; lang: string }) =>
          f.kind === 'canonical-missing' && f.lang === 'en',
      ),
    ).toBe(true);
  });

  it('FAIL on parity miss: 7 EN sub-dest, 6 HE → 1 missing', () => {
    const audit = [
      makeRegionEntry('tel-aviv', 'en', 90),
      makeRegionEntry('tel-aviv', 'he', 90),
      makeSubDestEntry('tel-aviv/old-jaffa', 'en', 85),
      makeSubDestEntry('tel-aviv/old-jaffa', 'he', 85),
      makeSubDestEntry('tel-aviv/carmel-market', 'en', 85),
      // No HE counterpart for carmel-market
    ];
    const result = helpers.evaluateRegion(audit, 'tel-aviv');
    expect(result.verdict).toBe('FAIL');
    expect(result.missingHe).toContain('tel-aviv/carmel-market');
    expect(
      result.failures.some(
        (f: { kind: string }) => f.kind === 'parity-missing-he',
      ),
    ).toBe(true);
  });

  it('custom thresholds: stricter canonical=90', () => {
    const audit = [
      makeRegionEntry('tel-aviv', 'en', 88),
      makeRegionEntry('tel-aviv', 'he', 88),
    ];
    const result = helpers.evaluateRegion(audit, 'tel-aviv', {
      canonical: 90,
      subDest: 80,
    });
    expect(result.verdict).toBe('FAIL');
    expect(result.failures.length).toBeGreaterThan(0);
  });
});

describe('evaluateLighthouse', () => {
  it('DEFERRED-file-absent when null passed', () => {
    const result = helpers.evaluateLighthouse(null, 'tel-aviv');
    expect(result.status).toBe('DEFERRED-file-absent');
    expect(result.detail).toMatch(/absent/i);
  });

  it('DEFERRED-CI-owns when empty array passed', () => {
    const result = helpers.evaluateLighthouse([], 'tel-aviv');
    expect(result.status).toBe('DEFERRED-CI-owns');
    expect(result.detail).toMatch(/empty baseline/i);
  });

  it('PASS when all regional runs ≥ 0.85 mobile-perf', () => {
    const lh = [
      {
        url: 'https://visitisrael.site/tel-aviv',
        categories: { performance: 0.92 },
      },
      {
        url: 'https://visitisrael.site/en/tel-aviv',
        categories: { performance: 0.88 },
      },
    ];
    const result = helpers.evaluateLighthouse(lh, 'tel-aviv');
    expect(result.status).toBe('PASS');
  });

  it('FAIL when any regional run < 0.85 mobile-perf', () => {
    const lh = [
      {
        url: 'https://visitisrael.site/tel-aviv',
        categories: { performance: 0.78 },
      },
    ];
    const result = helpers.evaluateLighthouse(lh, 'tel-aviv');
    expect(result.status).toBe('FAIL');
  });

  it('DEFERRED-CI-owns when no regional runs in baseline', () => {
    const lh = [
      {
        url: 'https://visitisrael.site/jerusalem',
        categories: { performance: 0.95 },
      },
    ];
    const result = helpers.evaluateLighthouse(lh, 'tel-aviv');
    expect(result.status).toBe('DEFERRED-CI-owns');
  });
});

describe('renderReport schema', () => {
  it('emits a Verdict: PASS|FAIL line + standard sections', () => {
    const result = {
      entries: [],
      canonicalScores: { en: 90, he: 88 },
      subDestScores: [],
      failures: [],
      missingHe: [],
      missingEn: [],
      blocking: 0,
      verdict: 'PASS',
    };
    const lh = { status: 'DEFERRED-CI-owns', detail: 'baseline empty' };
    const md = helpers.renderReport(result, lh, 'tel-aviv');
    expect(md).toMatch(/^# Region Gate Report: tel-aviv/m);
    expect(md).toMatch(/\*\*Verdict:\*\* PASS/);
    expect(md).toMatch(/## Pages Audited/);
    expect(md).toMatch(/## Failures/);
    expect(md).toMatch(/## EN\+HE Parity/);
    expect(md).toMatch(/## Lighthouse/);
  });

  it('FAIL verdict surfaces every failure with kind + slug + reason', () => {
    const result = {
      entries: [],
      canonicalScores: { en: 78, he: 88 },
      subDestScores: [],
      failures: [
        {
          kind: 'canonical-below-threshold',
          slug: 'tel-aviv',
          lang: 'en',
          reason: 'score 78 < 80',
        },
      ],
      missingHe: [],
      missingEn: [],
      blocking: 0,
      verdict: 'FAIL',
    };
    const lh = { status: 'PASS', detail: '2 runs ≥ 0.85' };
    const md = helpers.renderReport(result, lh, 'tel-aviv');
    expect(md).toMatch(/\*\*Verdict:\*\* FAIL/);
    expect(md).toMatch(/canonical-below-threshold/);
    expect(md).toMatch(/score 78 < 80/);
  });
});

describe('writeReport file IO', () => {
  let tmp: string;

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), 'region-gate-'));
  });

  it('writes {region}.md at given outDir', async () => {
    const outPath = await helpers.writeReport('# test\n', 'tel-aviv', tmp);
    expect(existsSync(outPath)).toBe(true);
    expect(outPath.endsWith('tel-aviv.md')).toBe(true);
    expect(readFileSync(outPath, 'utf8')).toBe('# test\n');
  });

  it('flattens nested slug (west-bank/bethlehem → west-bank-bethlehem.md)', async () => {
    const outPath = await helpers.writeReport(
      '# test\n',
      'west-bank/bethlehem',
      tmp,
    );
    expect(existsSync(outPath)).toBe(true);
    expect(outPath.endsWith('west-bank-bethlehem.md')).toBe(true);
  });

  it('creates the parent directory if missing', async () => {
    const nested = resolve(tmp, 'nested', 'dir');
    const outPath = await helpers.writeReport('# test\n', 'tel-aviv', nested);
    expect(existsSync(outPath)).toBe(true);
  });
});

describe('main entrypoint contract (import-time)', () => {
  it('importing the module does NOT invoke main()', () => {
    // If main() ran on import we'd have hit a side-effect (file write or exit).
    expect(process.exitCode).not.toBe(1);
  });
});
