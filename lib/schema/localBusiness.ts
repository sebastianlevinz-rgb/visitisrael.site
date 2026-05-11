/**
 * LocalBusiness generator — used by GUIDE_OR_WINERY profile pages
 * (boutique wineries, tour operators, restaurants with affiliate angle).
 *
 * Always pairs with an Article in practice (the guide content).
 *
 * Cast via `as unknown as WithContext<T>` — see organization.ts note re: inLanguage.
 */
import type { LocalBusiness, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import type { LocalBusinessInput } from './types';

export function buildLocalBusiness(
  i: LocalBusinessInput,
): WithContext<LocalBusiness> {
  const url = canonicalUrl(i.slug, i.lang);
  const address: Record<string, unknown> = {
    '@type': 'PostalAddress',
    addressLocality: i.address.addressLocality,
    addressCountry: i.address.addressCountry,
  };
  if (i.address.streetAddress) address['streetAddress'] = i.address.streetAddress;
  if (i.address.addressRegion) address['addressRegion'] = i.address.addressRegion;
  if (i.address.postalCode) address['postalCode'] = i.address.postalCode;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#business`,
    name: i.name,
    description: i.description,
    inLanguage: i.lang,
    url,
    address,
  };
  if (i.image !== undefined) schema['image'] = i.image;
  if (i.telephone !== undefined) schema['telephone'] = i.telephone;
  if (i.priceRange !== undefined) schema['priceRange'] = i.priceRange;

  return schema as unknown as WithContext<LocalBusiness>;
}
