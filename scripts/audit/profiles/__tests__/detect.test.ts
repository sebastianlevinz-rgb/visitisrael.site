/**
 * detect.test.ts — FND-05 contract test for `detectProfile`.
 *
 * Verifies the 7 dispatch behaviors locked in detect.ts:
 *   1. regions          → REGION_CANONICAL
 *   2. subDestinations  → SUB_DESTINATION
 *   3. guides           → GUIDE_OR_WINERY
 *   4. legal            → UTILITY
 *   5. isUtility=true   → UTILITY (overrides collection)
 *   6. isHub=true       → HUB (overrides collection)
 *   7. unknown          → THROW (never default silently)
 *
 * Argentina lesson #5: silent defaults masked the fact that hubs and
 * utilities were being scored against the regional rubric. detectProfile
 * THROWS on unknown collections so the audit dashboard fails loudly when
 * a new content type lands without a profile.
 */
import { describe, it, expect } from 'vitest';
import { detectProfile } from '../detect';

describe('detectProfile', () => {
  it('returns REGION_CANONICAL for regions collection', () => {
    expect(detectProfile({ collection: 'regions' })).toBe('REGION_CANONICAL');
  });

  it('returns SUB_DESTINATION for subDestinations collection', () => {
    expect(detectProfile({ collection: 'subDestinations' })).toBe(
      'SUB_DESTINATION',
    );
  });

  it('returns GUIDE_OR_WINERY for guides collection', () => {
    expect(detectProfile({ collection: 'guides' })).toBe('GUIDE_OR_WINERY');
  });

  it('returns UTILITY for legal collection', () => {
    expect(detectProfile({ collection: 'legal' })).toBe('UTILITY');
  });

  it('isUtility=true overrides regions → UTILITY', () => {
    // A "draft" legal page filed under regions/ should still score as utility.
    expect(detectProfile({ collection: 'regions', isUtility: true })).toBe(
      'UTILITY',
    );
  });

  it('isHub=true overrides regions → HUB', () => {
    // The /regions/ index page lives in the regions collection but is a hub.
    expect(detectProfile({ collection: 'regions', isHub: true })).toBe('HUB');
  });

  it('isUtility takes precedence over isHub when both true', () => {
    // Defensive: if both flags set, UTILITY wins (a11y/legal compliance is the
    // stricter rubric). Frontmatter shouldn't set both, but if it does we pick
    // the more restrictive profile rather than throw.
    expect(
      detectProfile({ collection: 'regions', isUtility: true, isHub: true }),
    ).toBe('UTILITY');
  });

  it('throws for unknown collection without override flags', () => {
    // Fail-loud: never silently fall back to a default profile.
    expect(() => detectProfile({ collection: 'unknown' })).toThrowError(
      /Cannot detect profile for collection=unknown/,
    );
  });

  it('throws for empty-string collection without override flags', () => {
    expect(() => detectProfile({ collection: '' })).toThrowError(
      /Cannot detect profile/,
    );
  });
});
