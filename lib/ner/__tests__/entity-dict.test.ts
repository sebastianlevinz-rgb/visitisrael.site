/**
 * Plan 09 — Task 1: entity-dict.json structural tests (FND-07).
 *
 * Pins the seed dictionary shape so the detector (Task 2) and the audit
 * dashboard consumer (plan 10) can rely on:
 *   - All 6 entity classes present (`tour | hotel | restaurant | museum | transport | religious_site`)
 *   - Each class has >= 10 starter entries (CONTEXT §Decisions allows seed-size flexibility;
 *     PLAN.md must_haves require >= 10 each)
 *   - religious_site overlaps data/religious-sites.json EN names (plan 04 paired-naming
 *     dictionary) — proves single-source-of-truth coherence between the two consumers
 *
 * The `_meta` key in the JSON is documentation, not a class. Tests must ignore it
 * (`Object.keys(dict).filter(k => k !== '_meta')`).
 */
import { describe, it, expect } from 'vitest';
import dictRaw from '../../../data/entity-dict.json';
import religiousSitesRaw from '../../../data/religious-sites.json';

type Dict = Record<string, unknown>;
const dict = dictRaw as Dict;
const religiousSites = religiousSitesRaw as Record<
  string,
  { name?: { en?: string } }
>;

const REQUIRED_CLASSES = [
  'tour',
  'hotel',
  'restaurant',
  'museum',
  'transport',
  'religious_site',
] as const;

function classKeys(): string[] {
  return Object.keys(dict).filter((k) => k !== '_meta');
}

describe('entity-dict.json structure (FND-07)', () => {
  it('contains all 6 required entity classes', () => {
    const keys = classKeys();
    for (const cls of REQUIRED_CLASSES) {
      expect(keys, `missing class: ${cls}`).toContain(cls);
    }
  });

  it('has only the 6 required classes (no extras)', () => {
    const keys = classKeys().sort();
    expect(keys).toEqual([...REQUIRED_CLASSES].sort());
  });

  it.each([...REQUIRED_CLASSES])(
    'class "%s" has >= 10 entities (seed-size floor)',
    (cls) => {
      const entries = dict[cls];
      expect(Array.isArray(entries), `class "${cls}" must be string[]`).toBe(
        true,
      );
      const arr = entries as unknown[];
      expect(arr.length).toBeGreaterThanOrEqual(10);
    },
  );

  it.each([...REQUIRED_CLASSES])(
    'class "%s" contains only non-empty unique strings',
    (cls) => {
      const arr = dict[cls] as unknown[];
      const strs = arr.map((v) => {
        expect(typeof v).toBe('string');
        return v as string;
      });
      for (const s of strs) {
        expect(s.length, 'empty entity name').toBeGreaterThan(0);
        expect(s, 'leading/trailing whitespace').toEqual(s.trim());
      }
      expect(new Set(strs).size, `duplicate entries in "${cls}"`).toBe(
        strs.length,
      );
    },
  );

  it('religious_site overlaps data/religious-sites.json EN names', () => {
    // Build the EN-name set from the paired-naming dictionary (plan 04).
    const religiousNames = new Set(
      Object.entries(religiousSites)
        .filter(([k]) => k !== '_meta')
        .map(([, v]) => v?.name?.en)
        .filter((n): n is string => typeof n === 'string'),
    );

    const dictReligious = dict.religious_site as string[];
    const overlap = dictReligious.filter((n) => religiousNames.has(n));

    // Coherence floor: at least 8 entries shared between the two dictionaries.
    // Both consumers (NER detector + religious-naming audit) refer to the same
    // canonical entities; drift between them would silently disable cross-rule
    // gating in plan 10.
    expect(
      overlap.length,
      `religious_site overlap with religious-sites.json too small: ${overlap.length} found`,
    ).toBeGreaterThanOrEqual(8);
  });

  it('Abraham Hostel present in hotel class (FND-07 canonical example)', () => {
    // PLAN.md must_haves call out "Abraham Hostel" specifically as the
    // suggestedAction='add-affiliate' anchor case. Pin its presence so the
    // detector test in Task 2 is guaranteed a hit.
    const hotels = dict.hotel as string[];
    expect(hotels).toContain('Abraham Hostel');
  });

  it('Yad Vashem present in museum class (FND-07 add-internal-link anchor)', () => {
    const museums = dict.museum as string[];
    expect(museums).toContain('Yad Vashem');
  });
});
