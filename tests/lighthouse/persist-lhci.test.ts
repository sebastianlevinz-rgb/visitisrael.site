/**
 * Plan 11 Task 3 — Unit tests for scripts/qa/persist-lhci.mjs.
 *
 * The script is a deterministic helper that:
 *   1. Computes a 3-run median across N runs
 *   2. Derives `{ slug, lang }` from a URL using the i18n-config convention
 *   3. Aggregates raw run records into per-URL median entries
 *
 * These tests pin the math + the URL→slug derivation that AUD-013/AUD-034 rely
 * on to look up entries by `slug + lang`.
 */
import { describe, it, expect } from 'vitest';

// The persist-lhci helper is .mjs but exports its pure helpers — Vitest's
// vite resolver handles the .mjs extension fine.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const helpers: any = await import('../../scripts/qa/persist-lhci.mjs');

describe('persist-lhci median()', () => {
  it('returns NaN for empty input', () => {
    expect(Number.isNaN(helpers.median([]))).toBe(true);
  });

  it('returns the only value for a single-element array', () => {
    expect(helpers.median([0.92])).toBe(0.92);
  });

  it('returns the middle value for a 3-element array (canonical lhci case)', () => {
    expect(helpers.median([0.85, 0.92, 0.95])).toBe(0.92);
    // Unsorted input — the helper sorts internally.
    expect(helpers.median([0.95, 0.85, 0.92])).toBe(0.92);
  });

  it('averages middle two for even-length arrays', () => {
    expect(helpers.median([0.8, 0.9, 0.95, 1.0])).toBeCloseTo(0.925, 5);
  });

  it('ignores NaN entries when computing median', () => {
    expect(helpers.median([0.85, NaN, 0.95])).toBeCloseTo(0.9, 5);
    expect(helpers.median([NaN, NaN])).toBeNaN();
  });
});

describe('persist-lhci deriveSlugAndLang()', () => {
  it('treats / as HE root (default locale, no prefix)', () => {
    expect(helpers.deriveSlugAndLang('http://localhost:3000/')).toEqual({
      slug: '',
      lang: 'he',
    });
  });

  it('treats /en as EN root', () => {
    expect(helpers.deriveSlugAndLang('http://localhost:3000/en')).toEqual({
      slug: '',
      lang: 'en',
    });
  });

  it('derives slug + en for /en/jerusalem', () => {
    expect(
      helpers.deriveSlugAndLang('http://localhost:3000/en/jerusalem'),
    ).toEqual({ slug: 'jerusalem', lang: 'en' });
  });

  it('derives slug + he for /jerusalem (no /he prefix at root)', () => {
    expect(
      helpers.deriveSlugAndLang('http://localhost:3000/jerusalem/old-city'),
    ).toEqual({ slug: 'jerusalem/old-city', lang: 'he' });
  });

  it('handles explicit /he/ prefix gracefully', () => {
    expect(helpers.deriveSlugAndLang('http://localhost:3000/he/jerusalem')).toEqual({
      slug: 'jerusalem',
      lang: 'he',
    });
  });

  it('handles admin routes', () => {
    expect(
      helpers.deriveSlugAndLang('http://localhost:3000/admin/components'),
    ).toEqual({ slug: 'admin/components', lang: 'he' });
    expect(
      helpers.deriveSlugAndLang('http://localhost:3000/en/admin/components'),
    ).toEqual({ slug: 'admin/components', lang: 'en' });
  });

  it('strips trailing slash', () => {
    expect(helpers.deriveSlugAndLang('http://localhost:3000/en/')).toEqual({
      slug: '',
      lang: 'en',
    });
  });
});

describe('persist-lhci aggregate()', () => {
  const fakeRuns = [
    // 3 runs for HE root
    {
      url: 'http://localhost:3000/',
      performance: 0.92,
      accessibility: 0.97,
      bestPractices: 0.96,
      seo: 1.0,
      thirdPartyBlockingMs: 120,
    },
    {
      url: 'http://localhost:3000/',
      performance: 0.95,
      accessibility: 0.97,
      bestPractices: 0.96,
      seo: 1.0,
      thirdPartyBlockingMs: 100,
    },
    {
      url: 'http://localhost:3000/',
      performance: 0.94,
      accessibility: 0.96,
      bestPractices: 0.97,
      seo: 1.0,
      thirdPartyBlockingMs: 110,
    },
    // 3 runs for EN root
    {
      url: 'http://localhost:3000/en',
      performance: 0.88,
      accessibility: 0.95,
      bestPractices: 0.95,
      seo: 1.0,
      thirdPartyBlockingMs: 300,
    },
    {
      url: 'http://localhost:3000/en',
      performance: 0.92,
      accessibility: 0.95,
      bestPractices: 0.95,
      seo: 1.0,
      thirdPartyBlockingMs: 280,
    },
    {
      url: 'http://localhost:3000/en',
      performance: 0.9,
      accessibility: 0.96,
      bestPractices: 0.94,
      seo: 1.0,
      thirdPartyBlockingMs: 290,
    },
  ];

  it('groups by URL and computes 3-run median per category', () => {
    const out = helpers.aggregate(fakeRuns);
    expect(out).toHaveLength(2);
    const heRoot = out.find((e: { lang: string }) => e.lang === 'he');
    const enRoot = out.find((e: { lang: string }) => e.lang === 'en');
    expect(heRoot).toBeDefined();
    expect(enRoot).toBeDefined();
    // HE root: median(0.92, 0.94, 0.95) = 0.94
    expect(heRoot.performance).toBeCloseTo(0.94, 4);
    // EN root: median(0.88, 0.90, 0.92) = 0.90
    expect(enRoot.performance).toBeCloseTo(0.9, 4);
    // EN root TBT median: 280, 290, 300 → 290
    expect(enRoot.thirdPartyBlockingMs).toBe(290);
  });

  it('attaches runCount and capturedAt timestamp', () => {
    const out = helpers.aggregate(fakeRuns);
    for (const entry of out) {
      expect(entry.runCount).toBe(3);
      expect(typeof entry.capturedAt).toBe('string');
      expect(entry.capturedAt).toMatch(/\d{4}-\d{2}-\d{2}T/); // ISO-8601
    }
  });

  it('output schema matches AUD-013/AUD-034 consumer contract', () => {
    const out = helpers.aggregate(fakeRuns);
    const sample = out[0];
    // Required keys per data/lighthouse-results.json schema (see AUD-013.ts + AUD-034.ts)
    expect(sample).toHaveProperty('slug');
    expect(sample).toHaveProperty('lang');
    expect(sample).toHaveProperty('performance');
    expect(sample).toHaveProperty('accessibility');
    expect(sample).toHaveProperty('bestPractices');
    expect(sample).toHaveProperty('seo');
    expect(sample).toHaveProperty('thirdPartyBlockingMs');
  });

  it('handles single-run case (numberOfRuns: 1 fallback) gracefully', () => {
    const out = helpers.aggregate([fakeRuns[0]]);
    expect(out).toHaveLength(1);
    expect(out[0].performance).toBe(0.92);
    expect(out[0].runCount).toBe(1);
  });
});
