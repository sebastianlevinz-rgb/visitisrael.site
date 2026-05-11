/**
 * hreflangAlternates(slug) — Phase 1.8 contract.
 *
 * - Emits 3 alternates per page: `he`, `en`, `x-default`.
 * - `x-default` → the EN URL (Argentina lesson #4 fix).
 * - NEVER emits `fr` despite filesystem readiness (Conflict A).
 * - Reciprocal: HE/EN both point at each other via the same array.
 */
import { describe, it, expect } from 'vitest';

import { hreflangAlternates } from '../hreflang';
import { canonicalUrl } from '../canonical';

describe('hreflangAlternates — I18N-05 / SEO-06', () => {
  it('returns exactly 3 alternates per page (he, en, x-default)', () => {
    const out = hreflangAlternates('jerusalem');
    expect(out.length).toBe(3);
    const langs = out.map((a) => a.hreflang).sort();
    expect(langs).toEqual(['en', 'he', 'x-default']);
  });

  it('x-default href is the EN URL', () => {
    const out = hreflangAlternates('jerusalem');
    const xDefault = out.find((a) => a.hreflang === 'x-default');
    expect(xDefault).toBeDefined();
    expect(xDefault!.href).toBe(canonicalUrl('jerusalem', 'en'));
  });

  it('he alternate uses HE canonical (no prefix)', () => {
    const out = hreflangAlternates('jerusalem');
    const he = out.find((a) => a.hreflang === 'he');
    expect(he!.href).toBe('https://visitisrael.site/jerusalem');
  });

  it('en alternate uses EN canonical (/en/ prefix)', () => {
    const out = hreflangAlternates('jerusalem');
    const en = out.find((a) => a.hreflang === 'en');
    expect(en!.href).toBe('https://visitisrael.site/en/jerusalem');
  });

  it('NEVER includes fr hreflang despite filesystem readiness', () => {
    const out = hreflangAlternates('jerusalem');
    const langs = out.map((a) => a.hreflang);
    expect(langs).not.toContain('fr');
  });

  it('works for the homepage (empty slug)', () => {
    const out = hreflangAlternates('');
    expect(out.length).toBe(3);
    const he = out.find((a) => a.hreflang === 'he');
    const en = out.find((a) => a.hreflang === 'en');
    const xd = out.find((a) => a.hreflang === 'x-default');
    expect(he!.href).toBe('https://visitisrael.site');
    expect(en!.href).toBe('https://visitisrael.site/en');
    expect(xd!.href).toBe('https://visitisrael.site/en');
  });

  it('works for nested slugs', () => {
    const out = hreflangAlternates('jerusalem/western-wall');
    const he = out.find((a) => a.hreflang === 'he');
    const en = out.find((a) => a.hreflang === 'en');
    expect(he!.href).toBe('https://visitisrael.site/jerusalem/western-wall');
    expect(en!.href).toBe(
      'https://visitisrael.site/en/jerusalem/western-wall',
    );
  });
});
