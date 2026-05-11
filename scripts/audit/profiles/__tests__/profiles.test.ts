/**
 * profiles.test.ts — FND-05 profile-distinctness contract.
 *
 * Argentina lesson #5: every page scored against the same generic rubric
 * → no signal about what kind of page it was. This test suite enforces
 * that the 5 profiles ARE distinct on every meaningful axis:
 *
 *   - weight matrices (different per profile)
 *   - minWordCount     (REGION > SUB > GUIDE; UTILITY/HUB unenforced)
 *   - minAffiliates    (REGION 5 > SUB/GUIDE 1; UTILITY/HUB 0)
 *   - requiredSchemaTypes (each profile expects different schema.org types)
 *
 * Plus invariants:
 *   - every profile's weights sum ≤ 100 (worst score is 0, never negative)
 *   - every profile lists same scoreCutoffs (85/80) — only weights & rules
 *     differ; cutoffs are project-wide policy.
 */
import { describe, it, expect } from 'vitest';
import { profiles } from '../index';
import type { ProfileId, ProfileSpec } from '../types';

const ALL_IDS: readonly ProfileId[] = [
  'REGION_CANONICAL',
  'SUB_DESTINATION',
  'GUIDE_OR_WINERY',
  'UTILITY',
  'HUB',
] as const;

function sumWeights(spec: ProfileSpec): number {
  return spec.weights.reduce((acc, w) => acc + w.weight, 0);
}

describe('profiles invariants', () => {
  it('exports exactly 5 profiles', () => {
    expect(Object.keys(profiles)).toHaveLength(5);
    for (const id of ALL_IDS) {
      expect(profiles[id]).toBeDefined();
      expect(profiles[id].id).toBe(id);
    }
  });

  it('every profile has weights summing to ≤ 100', () => {
    for (const id of ALL_IDS) {
      const sum = sumWeights(profiles[id]);
      expect(
        sum,
        `${id} weights sum to ${sum} — must be ≤ 100 so worst score is 0`,
      ).toBeLessThanOrEqual(100);
    }
  });

  it('every profile shares pilot/replicated cutoffs of 85/80', () => {
    for (const id of ALL_IDS) {
      expect(profiles[id].scoreCutoffPilot).toBe(85);
      expect(profiles[id].scoreCutoffReplicated).toBe(80);
    }
  });
});

describe('profiles distinctness', () => {
  it('minWordCount is monotonically ordered: REGION > SUB > GUIDE; UTILITY=HUB=0', () => {
    expect(profiles.REGION_CANONICAL.minWordCount).toBe(1500);
    expect(profiles.SUB_DESTINATION.minWordCount).toBe(800);
    expect(profiles.GUIDE_OR_WINERY.minWordCount).toBe(600);
    expect(profiles.UTILITY.minWordCount).toBe(0);
    expect(profiles.HUB.minWordCount).toBe(0);

    // Strict ordering for the content profiles:
    expect(profiles.REGION_CANONICAL.minWordCount).toBeGreaterThan(
      profiles.SUB_DESTINATION.minWordCount,
    );
    expect(profiles.SUB_DESTINATION.minWordCount).toBeGreaterThan(
      profiles.GUIDE_OR_WINERY.minWordCount,
    );
  });

  it('minAffiliates: REGION (5) > SUB (1) === GUIDE (1) > UTILITY (0) === HUB (0)', () => {
    expect(profiles.REGION_CANONICAL.minAffiliates).toBe(5);
    expect(profiles.SUB_DESTINATION.minAffiliates).toBe(1);
    expect(profiles.GUIDE_OR_WINERY.minAffiliates).toBe(1);
    expect(profiles.UTILITY.minAffiliates).toBe(0);
    expect(profiles.HUB.minAffiliates).toBe(0);

    expect(profiles.REGION_CANONICAL.minAffiliates).toBeGreaterThan(
      profiles.SUB_DESTINATION.minAffiliates,
    );
  });

  it('requiredSchemaTypes — each profile demands a distinct schema set', () => {
    // REGION_CANONICAL is the only profile requiring TouristDestination + FAQPage.
    expect(profiles.REGION_CANONICAL.requiredSchemaTypes).toContain(
      'TouristDestination',
    );
    expect(profiles.REGION_CANONICAL.requiredSchemaTypes).toContain('FAQPage');
    expect(profiles.REGION_CANONICAL.requiredSchemaTypes).toContain(
      'BreadcrumbList',
    );

    // SUB_DESTINATION uses TouristAttraction (not TouristDestination).
    expect(profiles.SUB_DESTINATION.requiredSchemaTypes).toContain(
      'TouristAttraction',
    );
    expect(profiles.SUB_DESTINATION.requiredSchemaTypes).not.toContain(
      'TouristDestination',
    );

    // GUIDE_OR_WINERY uses Article + LocalBusiness.
    expect(profiles.GUIDE_OR_WINERY.requiredSchemaTypes).toContain('Article');
    expect(profiles.GUIDE_OR_WINERY.requiredSchemaTypes).toContain(
      'LocalBusiness',
    );

    // UTILITY uses WebPage MINIMAL — must NOT carry TouristDestination/Attraction.
    expect(profiles.UTILITY.requiredSchemaTypes).toContain('WebPage');
    expect(profiles.UTILITY.requiredSchemaTypes).not.toContain(
      'TouristDestination',
    );
    expect(profiles.UTILITY.requiredSchemaTypes).not.toContain(
      'TouristAttraction',
    );

    // HUB uses CollectionPage — must NOT carry TouristDestination/Attraction.
    expect(profiles.HUB.requiredSchemaTypes).toContain('CollectionPage');
    expect(profiles.HUB.requiredSchemaTypes).not.toContain(
      'TouristDestination',
    );
    expect(profiles.HUB.requiredSchemaTypes).not.toContain('TouristAttraction');
  });

  it('weight matrices are distinct across the 5 profiles (no two identical)', () => {
    // Serialize each profile's weights as a comparable string. Two profiles
    // with byte-identical weights would defeat the purpose of having
    // separate profiles (the lesson #5 anti-pattern).
    const fingerprints = new Set<string>();
    for (const id of ALL_IDS) {
      const fp = JSON.stringify(profiles[id].weights);
      fingerprints.add(fp);
    }
    expect(
      fingerprints.size,
      `Expected 5 distinct weight matrices, got ${fingerprints.size} — some profiles are duplicates`,
    ).toBe(5);
  });

  it('UTILITY profile omits AUD-009 (FTC disclosure) — no affiliates on utility pages', () => {
    // Design constraint: utility pages don't host affiliate links. Plan 10's
    // scorer must NOT fire AUD-009 against them. We encode this by omitting
    // AUD-009 from UTILITY.weights entirely (absent → weight 0).
    const aud009 = profiles.UTILITY.weights.find((w) => w.rule === 'AUD-009');
    expect(aud009).toBeUndefined();

    // Sanity: REGION_CANONICAL DOES weight AUD-009 (and heavily).
    const regionAud009 = profiles.REGION_CANONICAL.weights.find(
      (w) => w.rule === 'AUD-009',
    );
    expect(regionAud009).toBeDefined();
    expect(regionAud009?.required).toBe(true);
  });

  it('HUB profile omits AUD-009 (no affiliates) but retains image-rights weights', () => {
    expect(
      profiles.HUB.weights.find((w) => w.rule === 'AUD-009'),
    ).toBeUndefined();
    // Hubs care MORE about AUD-026 (restricted-site image rights) than
    // REGION_CANONICAL because hub tiles ARE the thumbnail surface.
    const hubAud026 = profiles.HUB.weights.find((w) => w.rule === 'AUD-026');
    const regionAud026 = profiles.REGION_CANONICAL.weights.find(
      (w) => w.rule === 'AUD-026',
    );
    expect(hubAud026).toBeDefined();
    expect(regionAud026).toBeDefined();
    expect(hubAud026!.weight).toBeGreaterThan(regionAud026!.weight);
  });

  it('UTILITY heavily weights AUD-027/028/033 — a11y + canonical-bundle compliance', () => {
    // These three rules together must dominate UTILITY scoring because that
    // IS the value-add of legal/a11y pages.
    const u = profiles.UTILITY;
    const aud027 = u.weights.find((w) => w.rule === 'AUD-027');
    const aud028 = u.weights.find((w) => w.rule === 'AUD-028');
    const aud033 = u.weights.find((w) => w.rule === 'AUD-033');
    expect(aud027?.weight).toBeGreaterThanOrEqual(10);
    expect(aud028?.weight).toBeGreaterThanOrEqual(10);
    expect(aud033?.weight).toBeGreaterThanOrEqual(10);
  });

  it('SUB_DESTINATION boosts AUD-006 vs REGION_CANONICAL (cannibalization risk)', () => {
    // Argentina lesson #4: sub-destinations cannibalized their parent
    // region's H1 ranking. AUD-006 weight must be HIGHER on SUB than REGION.
    const subAud006 = profiles.SUB_DESTINATION.weights.find(
      (w) => w.rule === 'AUD-006',
    );
    const regionAud006 = profiles.REGION_CANONICAL.weights.find(
      (w) => w.rule === 'AUD-006',
    );
    expect(subAud006?.weight).toBeGreaterThan(regionAud006?.weight ?? 0);
  });
});
