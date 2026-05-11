/**
 * TouristAttraction generator — sub-destination canonicals
 * (e.g., Mahane Yehuda, Yad Vashem, generic attractions).
 *
 * Differs from TouristDestination: no `includesAttraction` (leaf node).
 * Religious-specific attractions should use `buildReligiousBuilding` instead.
 *
 * Cast via `as unknown as WithContext<T>` — see organization.ts note re: inLanguage.
 */
import type { TouristAttraction, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import type { TouristAttractionInput } from './types';

export function buildTouristAttraction(
  i: TouristAttractionInput,
): WithContext<TouristAttraction> {
  const url = canonicalUrl(i.slug, i.lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${url}#attraction`,
    name: i.name,
    description: i.description,
    inLanguage: i.lang,
    url,
    image: i.images,
  } as unknown as WithContext<TouristAttraction>;
}
