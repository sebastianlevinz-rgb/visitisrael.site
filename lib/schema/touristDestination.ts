/**
 * TouristDestination generator — region canonicals (Jerusalem, Tel Aviv, Galilee, etc.).
 *
 * Reference: RESEARCH §1.6 verbatim example.
 *
 * Emits geo coordinates + includesAttraction[] sub-references that point to
 * sub-destination canonical URLs. Each attraction reference uses canonical
 * URL + '#attraction' fragment as @id (matches ARCHITECTURE §4 conventions).
 *
 * NOTE: schema-dts v2 does not type `inLanguage` on TouristDestination (it's
 * inherited from CreativeWork in the spec but not propagated to PlaceBase in
 * the v2 generated types). Per RESEARCH §1.6 Open Question 5, we use the
 * documented `as unknown as WithContext<T>` cast.
 */
import type { TouristDestination, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import type { TouristDestinationInput } from './types';

export function buildTouristDestination(
  i: TouristDestinationInput,
): WithContext<TouristDestination> {
  const url = canonicalUrl(i.slug, i.lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${url}#destination`,
    name: i.name,
    description: i.description,
    inLanguage: i.lang,
    url,
    image: i.images,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: i.lat,
      longitude: i.lng,
    },
    includesAttraction: i.attractions.map((a) => ({
      '@type': 'TouristAttraction',
      '@id': `${canonicalUrl(`${i.slug}/${a.slug}`, i.lang)}#attraction`,
      name: a.name,
    })),
  } as unknown as WithContext<TouristDestination>;
}
