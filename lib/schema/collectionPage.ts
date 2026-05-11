/**
 * CollectionPage generator — hub pages (`/regions/`, `/guides/`, etc.).
 *
 * Distinct from TouristDestination/Attraction: CollectionPage signals that
 * the page is an index of sub-resources, not a destination/attraction in
 * its own right. Used by HUB quality profile.
 *
 * CollectionPage extends CreativeWork so `inLanguage` IS in the stock types,
 * but we keep the cast for parity with siblings.
 */
import type { CollectionPage, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import type { CollectionPageInput } from './types';

export function buildCollectionPage(
  i: CollectionPageInput,
): WithContext<CollectionPage> {
  const url = canonicalUrl(i.slug, i.lang);
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: i.name,
    description: i.description,
    inLanguage: i.lang,
    url,
  };
  if (i.image !== undefined) schema['image'] = i.image;
  return schema as unknown as WithContext<CollectionPage>;
}
