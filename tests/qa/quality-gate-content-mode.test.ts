/**
 * tests/qa/quality-gate-content-mode.test.ts
 *
 * Pins the auto-flip from `phase1StructuralOnly` to content mode based on
 * contentPages.length. Plan 06 (Phase 2.6) Wave 0 contract.
 *
 * Three families of assertions:
 *   1. Mode auto-detection — empty content → structural; ≥1 content page → content
 *   2. Criterion 2 / 3 / 5 / 9 only fire in content mode (DEFER in structural)
 *   3. Report markdown reflects both mode and pass/fail outcome correctly
 */
import { describe, it, expect } from 'vitest';
import {
  evaluateCriteria,
  composeReport,
  isAdminOrUtility,
  type AuditResult,
} from '../../scripts/audit/quality-gate';

function makeAuditResult(
  partial: Partial<AuditResult> & Pick<AuditResult, 'slug' | 'lang'>,
): AuditResult {
  return {
    score: 100,
    issues: [],
    blocking: [],
    ...partial,
  };
}

describe('quality-gate — content-mode auto-detection', () => {
  it('returns mode=structural when no content pages present (admin/_not-found only)', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'admin/components', lang: 'en' }),
      makeAuditResult({ slug: 'admin/components', lang: 'he' }),
      makeAuditResult({ slug: '_not-found', lang: 'he', score: 0 }),
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.mode).toBe('structural');
  });

  it('returns mode=content when ≥1 content page present', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'admin/components', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.mode).toBe('content');
  });
});

describe('quality-gate — criteria 2/3/5/9 defer in structural mode', () => {
  it('DEFERs criteria 2, 3, 5, 9 when structural', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'admin/components', lang: 'en' }),
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.mode).toBe('structural');
    for (const id of [2, 3, 5, 9]) {
      const c = result.criteria.find((cc) => cc.id === id);
      expect(c, `criterion ${id} should be present`).toBeDefined();
      expect(c!.status, `criterion ${id} should DEFER in structural`).toBe(
        'deferred',
      );
    }
  });

  it('FIREs criteria 2, 3, 5, 9 in content mode (pass when clean)', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'jerusalem', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.mode).toBe('content');
    for (const id of [2, 3, 5, 9]) {
      const c = result.criteria.find((cc) => cc.id === id);
      expect(c, `criterion ${id} should be present`).toBeDefined();
      expect(
        c!.status,
        `criterion ${id} should PASS or FAIL (not defer)`,
      ).not.toBe('deferred');
    }
  });
});

describe('quality-gate — full-PASS content mode produces outcome=pass + writes pass markdown', () => {
  it('all criteria PASS in clean content mode (deferred only for cron-deferred items if any)', () => {
    const audit: AuditResult[] = [
      makeAuditResult({
        slug: 'jerusalem',
        lang: 'en',
        profile: 'REGION_CANONICAL',
      }),
      makeAuditResult({
        slug: 'jerusalem',
        lang: 'he',
        profile: 'REGION_CANONICAL',
      }),
      makeAuditResult({ slug: 'jerusalem/western-wall', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem/western-wall', lang: 'he' }),
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.outcome).toBe('pass');
    const failures = result.criteria.filter((c) => c.status === 'fail');
    expect(failures).toEqual([]);
  });

  it('composeReport renders PASS markdown with mode + every criterion line', () => {
    const audit: AuditResult[] = [
      makeAuditResult({
        slug: 'jerusalem',
        lang: 'en',
        profile: 'REGION_CANONICAL',
      }),
      makeAuditResult({
        slug: 'jerusalem',
        lang: 'he',
        profile: 'REGION_CANONICAL',
      }),
    ];
    const result = evaluateCriteria(audit, []);
    const md = composeReport(result);
    expect(md).toContain('# Quality Gate Report — PASS');
    expect(md).toContain('Mode: **content**');
    for (let id = 1; id <= 10; id += 1) {
      expect(md, `criterion ${id} row missing`).toMatch(
        new RegExp(`\\| ${id} \\|`),
      );
    }
  });
});

describe('quality-gate — content mode with criterion failure', () => {
  it('FAILs criterion 2 when content page <85 score', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'jerusalem', lang: 'en', score: 60 }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he', score: 100 }),
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.outcome).toBe('fail');
    const c2 = result.criteria.find((c) => c.id === 2);
    expect(c2!.status).toBe('fail');
    expect(c2!.detail).toContain('jerusalem/en=60');
  });

  it('FAILs criterion 3 when critical-severity issue present on content page', () => {
    const audit: AuditResult[] = [
      makeAuditResult({
        slug: 'jerusalem',
        lang: 'en',
        issues: [
          {
            rule: 'AUD-001',
            severity: 'critical',
            message: 'raw hex #abc found',
          },
        ],
      }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.outcome).toBe('fail');
    const c3 = result.criteria.find((c) => c.id === 3);
    expect(c3!.status).toBe('fail');
    expect(c3!.detail).toContain('1 critical');
  });

  it('FAILs criterion 5 when EN page has no HE sibling', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'jerusalem', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem/western-wall', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
      // jerusalem/western-wall missing HE sibling
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.outcome).toBe('fail');
    const c5 = result.criteria.find((c) => c.id === 5);
    expect(c5!.status).toBe('fail');
    expect(c5!.detail).toContain('jerusalem/western-wall');
  });

  it('FAILs criterion 9 when AUD-033 schema issue present on content page', () => {
    const audit: AuditResult[] = [
      makeAuditResult({
        slug: 'jerusalem',
        lang: 'en',
        issues: [
          {
            rule: 'AUD-033',
            severity: 'major',
            message: 'BreadcrumbList itemListElement must have ≥2 items',
          },
        ],
      }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
    ];
    const result = evaluateCriteria(audit, []);
    expect(result.outcome).toBe('fail');
    const c9 = result.criteria.find((c) => c.id === 9);
    expect(c9!.status).toBe('fail');
  });

  it('composeReport includes Failures section listing each failing criterion', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'jerusalem', lang: 'en', score: 50 }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he', score: 50 }),
    ];
    const result = evaluateCriteria(audit, []);
    const md = composeReport(result);
    expect(md).toContain('# Quality Gate Report — FAIL');
    expect(md).toContain('## Failures + Proposed Fixes');
    expect(md).toContain('### Criterion 2');
  });
});

describe('quality-gate — Lighthouse criterion 1', () => {
  it('DEFERs criterion 1 when lhci=null (file absent)', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'jerusalem', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
    ];
    const result = evaluateCriteria(audit, null);
    const c1 = result.criteria.find((c) => c.id === 1);
    expect(c1!.status).toBe('deferred');
    expect(c1!.detail).toContain('absent');
  });

  it('DEFERs criterion 1 when lhci=[] (empty baseline)', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'jerusalem', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
    ];
    const result = evaluateCriteria(audit, []);
    const c1 = result.criteria.find((c) => c.id === 1);
    expect(c1!.status).toBe('deferred');
  });

  it('PASSes criterion 1 when lhci entries meet all 4 thresholds', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'jerusalem', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
    ];
    const lhci = [
      {
        url: 'http://localhost:3000/en/jerusalem',
        scores: {
          performance: 0.95,
          accessibility: 0.98,
          'best-practices': 1.0,
          seo: 1.0,
        },
      },
    ];
    const result = evaluateCriteria(audit, lhci);
    const c1 = result.criteria.find((c) => c.id === 1);
    expect(c1!.status).toBe('pass');
  });

  it('FAILs criterion 1 when a URL falls below any threshold', () => {
    const audit: AuditResult[] = [
      makeAuditResult({ slug: 'jerusalem', lang: 'en' }),
      makeAuditResult({ slug: 'jerusalem', lang: 'he' }),
    ];
    const lhci = [
      {
        url: 'http://localhost:3000/en/jerusalem',
        scores: {
          performance: 0.7, // < 0.9
          accessibility: 0.98,
          'best-practices': 1.0,
          seo: 1.0,
        },
      },
    ];
    const result = evaluateCriteria(audit, lhci);
    const c1 = result.criteria.find((c) => c.id === 1);
    expect(c1!.status).toBe('fail');
    expect(result.outcome).toBe('fail');
  });
});

describe('quality-gate — isAdminOrUtility', () => {
  it('matches admin/api/_not-found/index prefixes', () => {
    expect(isAdminOrUtility('admin/components')).toBe(true);
    expect(isAdminOrUtility('admin/components/affiliate-card')).toBe(true);
    expect(isAdminOrUtility('api/admin/whatever')).toBe(true);
    expect(isAdminOrUtility('_not-found')).toBe(true);
    expect(isAdminOrUtility('index')).toBe(true);
  });

  it('does NOT match real content slugs', () => {
    expect(isAdminOrUtility('jerusalem')).toBe(false);
    expect(isAdminOrUtility('jerusalem/western-wall')).toBe(false);
    expect(isAdminOrUtility('itineraries/3-days-in-jerusalem')).toBe(false);
    expect(isAdminOrUtility('about')).toBe(false);
    expect(isAdminOrUtility('regions')).toBe(false);
  });
});
