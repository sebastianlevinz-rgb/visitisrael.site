/**
 * WebPage generator — minimal fallback used by UTILITY profile
 * (privacy policy, affiliate disclosure, accessibility statement).
 *
 * Cast via `as unknown as WithContext<T>` — parity with siblings.
 */
import type { WebPage, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import type { BaseInput } from './types';

export function buildWebPage(i: BaseInput): WithContext<WebPage> {
  const url = canonicalUrl(i.slug, i.lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: i.name,
    description: i.description,
    inLanguage: i.lang,
    url,
  } as unknown as WithContext<WebPage>;
}
