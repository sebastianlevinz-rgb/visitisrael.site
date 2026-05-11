/**
 * Focused BreadcrumbList tests — itemListElement shape (position + name + item).
 */
import { describe, it, expect } from 'vitest';

import { buildBreadcrumb } from '../breadcrumb';
import { canonicalUrl } from '../../seo/canonical';

describe('buildBreadcrumb', () => {
  it('produces BreadcrumbList with at least 2 items', () => {
    const bc = buildBreadcrumb({
      lang: 'en',
      segments: [
        { slug: '', name: 'Home' },
        { slug: 'jerusalem', name: 'Jerusalem' },
        { slug: 'jerusalem/western-wall', name: 'Western Wall' },
      ],
    });
    expect(bc['@context']).toBe('https://schema.org');
    expect(bc['@type']).toBe('BreadcrumbList');
    const items = (bc as { itemListElement: unknown[] }).itemListElement;
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it('each item has @type=ListItem with position + name + item URL', () => {
    const bc = buildBreadcrumb({
      lang: 'en',
      segments: [
        { slug: '', name: 'Home' },
        { slug: 'jerusalem', name: 'Jerusalem' },
      ],
    });
    const items = (
      bc as {
        itemListElement: Array<{
          '@type': string;
          position: number;
          name: string;
          item: string;
        }>;
      }
    ).itemListElement;
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
    });
    expect((bcHe as { inLanguage: string }).inLanguage).toBe('he');
  });

  it('@id includes the deepest segment canonical URL', () => {
    const bc = buildBreadcrumb({
      lang: 'en',
      segments: [
        { slug: '', name: 'Home' },
        { slug: 'jerusalem', name: 'Jerusalem' },
      ],
    });
    expect(bc['@id']).toContain(canonicalUrl('jerusalem', 'en'));
  });
});
