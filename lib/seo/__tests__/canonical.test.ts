/**
 * canonicalUrl tests — self-referential per locale; never cross-locale.
 *
 * Per SEO-06 + plan 04 Task 1 behavior contract.
 */
import { describe, it, expect } from 'vitest';

import { canonicalUrl } from '../canonical';

describe('canonicalUrl', () => {
  it('returns HE default-locale URL without prefix for he', () => {
    expect(canonicalUrl('jerusalem', 'he')).toBe(
      'https://visitisrael.site/jerusalem',
    );
  });

  it('returns EN-prefixed URL for en', () => {
    expect(canonicalUrl('jerusalem', 'en')).toBe(
      'https://visitisrael.site/en/jerusalem',
    );
  });

  it('strips leading and trailing slashes from slug', () => {
    expect(canonicalUrl('/jerusalem/', 'he')).toBe(
      'https://visitisrael.site/jerusalem',
    );
    expect(canonicalUrl('/jerusalem/', 'en')).toBe(
      'https://visitisrael.site/en/jerusalem',
    );
  });

  it('handles nested slugs', () => {
    expect(canonicalUrl('jerusalem/western-wall', 'he')).toBe(
      'https://visitisrael.site/jerusalem/western-wall',
    );
    expect(canonicalUrl('jerusalem/western-wall', 'en')).toBe(
      'https://visitisrael.site/en/jerusalem/western-wall',
    );
  });

  it('homepage slug "" resolves to origin for he and origin+/en for en', () => {
    expect(canonicalUrl('', 'he')).toBe('https://visitisrael.site');
    expect(canonicalUrl('', 'en')).toBe('https://visitisrael.site/en');
  });

  it('never returns the same URL for he vs en (SEO-06: never cross-locale)', () => {
    const slugs = ['jerusalem', 'tel-aviv', 'guides/golan-winery-tour', ''];
    for (const slug of slugs) {
      expect(canonicalUrl(slug, 'he')).not.toBe(canonicalUrl(slug, 'en'));
    }
  });
});
