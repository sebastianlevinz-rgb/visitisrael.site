/**
 * WebSite generator — homepage only.
 *
 * Emits a SearchAction (sitelinks searchbox) per Google's documented pattern.
 * The action target uses the site search route which will exist post-MVP;
 * for Phase 1 it points at the locale-aware search slug placeholder.
 *
 * Cast via `as unknown as WithContext<T>` — see organization.ts note re: inLanguage.
 * Also covers `query-input` (Google extension not in stock schema-dts types).
 */
import type { WebSite, WithContext } from 'schema-dts';

import { canonicalUrl, ORIGIN } from '../seo/canonical';
import type { WebSiteInput } from './types';

export function buildWebSite(i: WebSiteInput): WithContext<WebSite> {
  const url = canonicalUrl('', i.lang);
  const searchTarget =
    i.lang === 'he'
      ? `${ORIGIN}/search?q={search_term_string}`
      : `${ORIGIN}/${i.lang}/search?q={search_term_string}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name: i.name,
    url,
    inLanguage: i.lang,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchTarget,
      },
      'query-input': 'required name=search_term_string',
    },
  } as unknown as WithContext<WebSite>;
}
