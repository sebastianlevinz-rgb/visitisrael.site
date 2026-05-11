/**
 * Focused BreadcrumbList tests — itemListElement shape (position + name + item).
 */
import { describe, it, expect } from 'vitest';

import { buildBreadcrumb } from '../breadcrumb';
import { canonicalUrl } from '../../seo/canonical';

type JsonLdShape = Record<string, unknown>;

describe('buildBreadcrumb', () => {
  it('produces BreadcrumbList with at least 2 items', () => {
    const bc = buildBreadcrumb({
      lang: 'en',
      segments: [
        { slug: '', name: 'Home' },
        { slug: 'jerusalem', name: 'Jerusalem' },
        { slug: 'jerusalem/western-wall', name: 'Western Wall' },
      ],
    }) as unknown as JsonLdShape;
    expect(bc['@context']).toBe('https://schema.org');
    expect(bc['@type']).toBe('BreadcrumbList');
    const items = bc['itemListElement'] as unknown[];
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it('each item has @type=ListItem with position + name + item URL', () => {
    const bc = buildBreadcrumb({
      lang: 'en',
      segments: [
        { slug: '', name: 'Home' },
        { slug: 'jerusalem', name: 'Jerusalem' },
      ],
    }) as unknown as JsonLdShape;
    const items = bc['itemListElement'] as Array<{
      '@type': string;
      position: number;
      name: string;
      item: string;
    }>;
    expect(items[0]?.['@type']).toBe('ListItem');
    expect(items[0]?.position).toBe(1);
    expect(items[0]?.name).toBe('Home');
    expect(items[0]?.item).toBe(canonicalUrl('', 'en'));
    expect(items[1]?.position).toBe(2);
    expect(items[1]?.item).toBe(canonicalUrl('jerusalem', 'en'));
  });

  it('propagates inLanguage', () => {
    const bcHe = buildBreadcrumb({
      lang: 'he',
      segments: [
        { slug: '', name: 'בית' },
        { slug: 'jerusalem', name: 'ירושלים' },
      ],
    }) as unknown as JsonLdShape;
    expect(bcHe['inLanguage']).toBe('he');
  });

  it('@id includes the deepest segment canonical URL', () => {
    const bc = buildBreadcrumb({
      lang: 'en',
      segments: [
        { slug: '', name: 'Home' },
        { slug: 'jerusalem', name: 'Jerusalem' },
      ],
    }) as unknown as JsonLdShape;
    expect(bc['@id'] as string).toContain(canonicalUrl('jerusalem', 'en'));
  });
});
