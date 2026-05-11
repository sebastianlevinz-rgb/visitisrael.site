/**
 * generateMetadataFor(slug, lang, frontmatter) — Phase 1.8 contract.
 *
 * - Returns Next.js Metadata with:
 *   - title: frontmatter.title (50-60 chars enforced upstream by Velite; runtime warns if >70)
 *   - description: frontmatter.description (120-160 chars enforced upstream)
 *   - alternates.canonical → canonicalUrl(slug, lang) — self-referential per locale
 *   - alternates.languages: { he, en, x-default } reciprocal
 *   - openGraph.locale: 'he_IL' for he, 'en_US' for en
 *   - openGraph.url: canonical
 *   - twitter card present
 *
 * SEO-05 + SEO-06.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';

import { generateMetadataFor } from '../metadata';
import { canonicalUrl } from '../canonical';

const validFrontmatter = {
  title: 'Jerusalem Travel Guide — 2026 Edition by Visit',
  description:
    'Plan your Jerusalem trip with our 2026 guide — top attractions, where to stay, day trips, kosher restaurants, and Old City etiquette tips inside.',
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('generateMetadataFor — SEO-05 / SEO-06 / I18N-05', () => {
  it('returns canonical self-referential to the requested locale', () => {
    const heMeta = generateMetadataFor('jerusalem', 'he', validFrontmatter);
    const enMeta = generateMetadataFor('jerusalem', 'en', validFrontmatter);
    expect(heMeta.alternates?.canonical).toBe(canonicalUrl('jerusalem', 'he'));
    expect(enMeta.alternates?.canonical).toBe(canonicalUrl('jerusalem', 'en'));
    expect(heMeta.alternates?.canonical).not.toBe(
      enMeta.alternates?.canonical,
    );
  });

  it('alternates.languages is reciprocal (he + en + x-default)', () => {
    const meta = generateMetadataFor('jerusalem', 'he', validFrontmatter);
    const langs = meta.alternates?.languages as Record<string, string>;
    expect(langs).toBeDefined();
    expect(Object.keys(langs).sort()).toEqual(['en', 'he', 'x-default']);
    expect(langs['he']).toBe(canonicalUrl('jerusalem', 'he'));
    expect(langs['en']).toBe(canonicalUrl('jerusalem', 'en'));
    expect(langs['x-default']).toBe(canonicalUrl('jerusalem', 'en'));
  });

  it('alternates.languages NEVER includes fr', () => {
    const meta = generateMetadataFor('jerusalem', 'he', validFrontmatter);
    const langs = meta.alternates?.languages as Record<string, string>;
    expect(langs['fr']).toBeUndefined();
  });

  it('openGraph.locale is he_IL for he, en_US for en', () => {
    const heMeta = generateMetadataFor('jerusalem', 'he', validFrontmatter);
    const enMeta = generateMetadataFor('jerusalem', 'en', validFrontmatter);
    expect(heMeta.openGraph?.locale).toBe('he_IL');
    expect(enMeta.openGraph?.locale).toBe('en_US');
  });

  it('openGraph.url matches the canonical URL', () => {
    const meta = generateMetadataFor('jerusalem', 'en', validFrontmatter);
    // Next.js Metadata typing narrows openGraph.url to `string | URL` when set.
    expect(String(meta.openGraph?.url)).toBe(
      canonicalUrl('jerusalem', 'en'),
    );
  });

  it('passes title + description through unchanged', () => {
    const meta = generateMetadataFor('jerusalem', 'he', validFrontmatter);
    expect(meta.title).toBe(validFrontmatter.title);
    expect(meta.description).toBe(validFrontmatter.description);
  });

  it('twitter card is summary_large_image', () => {
    const meta = generateMetadataFor('jerusalem', 'he', validFrontmatter);
    // Next.js Metadata.twitter narrows to a discriminated union; reach the
    // `card` field via an object cast for the assertion.
    const twitter = meta.twitter as { card?: string } | null | undefined;
    expect(twitter?.card).toBe('summary_large_image');
  });

  it('warns at runtime when title exceeds 70 chars (SEO-05 length guard)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const overLong = {
      title:
        'A really very excessively long title that absolutely exceeds the seventy character cap for SEO',
      description: validFrontmatter.description,
    };
    generateMetadataFor('jerusalem', 'en', overLong);
    expect(warn).toHaveBeenCalled();
    expect(warn.mock.calls[0]?.[0]).toMatch(/title/i);
  });

  it('warns at runtime when description outside 120-160 char window', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    generateMetadataFor('jerusalem', 'en', {
      title: validFrontmatter.title,
      description: 'too short',
    });
    expect(warn).toHaveBeenCalled();
    expect(warn.mock.calls[0]?.[0]).toMatch(/description/i);
  });
});
