/**
 * accessibility-statement link generator — A11Y-05 / AUD-028 data layer.
 *
 * Plan 10's AUD-028 rule will scan every built page for a footer link to
 * the locale-appropriate accessibility statement. This module exports the
 * helper that BOTH the Footer and the audit-dashboard scanner consume —
 * single source of truth.
 */
import { describe, it, expect } from 'vitest';

import {
  accessibilityStatementSlug,
  accessibilityStatementHref,
  ACCESSIBILITY_SLUG,
} from '../accessibility-link';

describe('accessibilityStatementSlug — A11Y-05 / A11Y-03', () => {
  it('returns the same English slug for both locales (Hebrew slug deferred to v2 per A11Y-03)', () => {
    expect(accessibilityStatementSlug('he')).toBe('accessibility-statement');
    expect(accessibilityStatementSlug('en')).toBe('accessibility-statement');
  });

  it('exports the constant ACCESSIBILITY_SLUG matching the default', () => {
    expect(ACCESSIBILITY_SLUG).toBe('accessibility-statement');
  });
});

describe('accessibilityStatementHref — locale-aware URL builder', () => {
  it('returns /accessibility-statement on HE (default locale — no prefix)', () => {
    expect(accessibilityStatementHref('he')).toBe('/accessibility-statement');
  });

  it('returns /en/accessibility-statement on EN', () => {
    expect(accessibilityStatementHref('en')).toBe(
      '/en/accessibility-statement',
    );
  });

  it('the two locales NEVER produce the same href', () => {
    expect(accessibilityStatementHref('he')).not.toBe(
      accessibilityStatementHref('en'),
    );
  });
});
