/**
 * Photo credits Zod schema tests — IMG-01, IMG-06.
 *
 * Verifies:
 *   - License enum allowlist (IMG-06: Wikimedia/IGPO/Unsplash/Pexels/OWN/PD)
 *   - SubjectType enum + restricted-site superRefine
 *     (IMG-06: westernWall/holySepulchre/domeOfTheRock/bahaiGardens require
 *      `restrictedSiteAcknowledgment`)
 *   - Width ≥ 1200 (IMG-02)
 *   - getCredit(src) helper — throws on missing entry (IMG-01)
 *
 * Anchored on RESEARCH.md §1.5 "Concrete steps" + PITFALLS.md §5.5.
 */
import { describe, it, expect } from 'vitest';
import {
  CreditEntry,
  Ledger,
  License,
  SubjectType,
} from '@/lib/photo-credits-schema';
import { getCredit } from '@/lib/photo-credits';

const VALID_BASE = {
  src: '/images/jerusalem/old-city-rooftops.jpg',
  author: 'Andrew Shiva',
  license: 'CC-BY-SA-4.0' as const,
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:Old_City_Rooftops.jpg',
  region: 'jerusalem',
  slug: 'old-city-rooftops',
  width: 1600,
  height: 1066,
  subjectType: 'landscape' as const,
};

describe('photo-credits Zod schema — IMG-01 / IMG-02 / IMG-06', () => {
  it('accepts a fully-valid CC-BY-4.0 landscape entry (1600w, no acknowledgment)', () => {
    const result = CreditEntry.safeParse({
      ...VALID_BASE,
      license: 'CC-BY-4.0',
    });
    expect(result.success).toBe(true);
  });

  it('REJECTS width=800 (under 1200 minimum) — IMG-02', () => {
    const result = CreditEntry.safeParse({ ...VALID_BASE, width: 800 });
    expect(result.success).toBe(false);
    if (!result.success) {
      const widthIssue = result.error.issues.find((i) =>
        i.path.includes('width'),
      );
      expect(widthIssue).toBeDefined();
    }
  });

  it('REJECTS license="STOLEN" (not in allowlist enum) — IMG-06', () => {
    const result = CreditEntry.safeParse({ ...VALID_BASE, license: 'STOLEN' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const licIssue = result.error.issues.find((i) =>
        i.path.includes('license'),
      );
      expect(licIssue).toBeDefined();
    }
  });

  it('REJECTS subjectType=westernWall WITHOUT restrictedSiteAcknowledgment — IMG-06', () => {
    const result = CreditEntry.safeParse({
      ...VALID_BASE,
      subjectType: 'westernWall',
      // restrictedSiteAcknowledgment intentionally omitted
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const ackIssue = result.error.issues.find((i) =>
        i.path.includes('restrictedSiteAcknowledgment'),
      );
      expect(ackIssue).toBeDefined();
    }
  });

  it('ACCEPTS subjectType=westernWall WITH non-empty restrictedSiteAcknowledgment — IMG-06', () => {
    const result = CreditEntry.safeParse({
      ...VALID_BASE,
      subjectType: 'westernWall',
      restrictedSiteAcknowledgment:
        'IGPO archive — pre-cleared; ref D-12345 accessed 2026-05-11',
    });
    expect(result.success).toBe(true);
  });

  it('ACCEPTS subjectType=landscape WITHOUT restrictedSiteAcknowledgment (optional unless restricted)', () => {
    const result = CreditEntry.safeParse({
      ...VALID_BASE,
      subjectType: 'landscape',
    });
    expect(result.success).toBe(true);
  });

  it('REJECTS each restricted subjectType (holySepulchre, domeOfTheRock, bahaiGardens) without acknowledgment', () => {
    for (const subj of [
      'holySepulchre',
      'domeOfTheRock',
      'bahaiGardens',
    ] as const) {
      const result = CreditEntry.safeParse({
        ...VALID_BASE,
        subjectType: subj,
      });
      expect(
        result.success,
        `subjectType=${subj} should fail without acknowledgment`,
      ).toBe(false);
    }
  });

  it('Ledger.safeParse accepts an empty object {}', () => {
    expect(Ledger.safeParse({}).success).toBe(true);
  });

  it('Ledger.safeParse rejects a record containing an invalid entry', () => {
    const bad = { '/images/foo.jpg': { ...VALID_BASE, width: 800 } };
    expect(Ledger.safeParse(bad).success).toBe(false);
  });

  it('License enum contains exactly the 11 allowlisted values', () => {
    const expected = [
      'CC0',
      'CC-BY-2.0',
      'CC-BY-3.0',
      'CC-BY-4.0',
      'CC-BY-SA-3.0',
      'CC-BY-SA-4.0',
      'PD',
      'IGPO-CC',
      'OWN',
      'UNSPLASH',
      'PEXELS',
    ];
    expect([...License.options]).toEqual(expected);
  });

  it('SubjectType enum contains the four restricted sites and six general categories', () => {
    const opts = [...SubjectType.options];
    for (const restricted of [
      'westernWall',
      'holySepulchre',
      'domeOfTheRock',
      'bahaiGardens',
    ]) {
      expect(opts).toContain(restricted);
    }
    for (const general of [
      'religious-general',
      'landscape',
      'cityscape',
      'food',
      'people',
      'abstract',
    ]) {
      expect(opts).toContain(general);
    }
  });
});

describe('getCredit(src) helper — IMG-01', () => {
  it('THROWS Error when src has no ledger entry', () => {
    expect(() => getCredit('/images/does-not-exist.jpg')).toThrow(
      /Missing photo-credits entry/,
    );
  });

  it('error message names the missing src and instructs how to fix', () => {
    let err: Error | undefined;
    try {
      getCredit('/images/unknown.jpg');
    } catch (e) {
      err = e as Error;
    }
    expect(err).toBeDefined();
    expect(err!.message).toContain('/images/unknown.jpg');
    expect(err!.message).toContain('data/photo-credits.json');
  });
});
