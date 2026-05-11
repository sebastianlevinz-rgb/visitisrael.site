/**
 * Place generator — generic Place (hubs, natural landmarks, non-religious historical sites).
 *
 * Use TouristDestination/TouristAttraction for tourism-categorized entities;
 * Place is the fallback for entities that don't fit those (e.g., Masada, Mount Sodom).
 *
 * Cast via `as unknown as WithContext<T>` — see organization.ts note re: inLanguage.
 */
import type { Place, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import type { PlaceInput } from './types';

export function buildPlace(i: PlaceInput): WithContext<Place> {
  const url = canonicalUrl(i.slug, i.lang);
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${url}#place`,
    name: i.name,
    description: i.description,
    inLanguage: i.lang,
    url,
  };
  if (i.image !== undefined) {
    schema['image'] = i.image;
  }
  if (i.lat !== undefined && i.lng !== undefined) {
    schema['geo'] = {
      '@type': 'GeoCoordinates',
      latitude: i.lat,
      longitude: i.lng,
    };
  }
  return schema as unknown as WithContext<Place>;
}
