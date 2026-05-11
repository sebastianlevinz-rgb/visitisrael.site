/**
 * Organization schema — emitted from root layout ONLY (per ARCHITECTURE §4.2).
 *
 * Brand info for visitisrael.site. Logo URL is a TODO until Phase 6 brand-asset
 * finalization; documented placeholder used at launch.
 *
 * NOTE: schema-dts v2 does NOT type `inLanguage` on Organization (it's on
 * CreativeWork in the spec). Per RESEARCH §1.6 Open Question 5, we use the
 * documented `as unknown as WithContext<T>` cast — Google's JSON-LD validator
 * accepts `inLanguage` on Organization since it's a Thing-level extension.
 */
import type { Organization, WithContext } from 'schema-dts';

import type { SchemaLang } from './types';
import { ORIGIN } from '../seo/canonical';

// Localized brand strings.
const BRAND: Record<SchemaLang, { name: string; description: string }> = {
  he: {
    name: 'Visit Israel — מדריך התיירות',
    description:
      'מדריך תיירות עברי-אנגלי מקיף לישראל — אזורים, אתרי ביקור, מסלולים והזמנות מאומתות.',
  },
  en: {
    name: 'Visit Israel',
    description:
      'Bilingual (English + Hebrew) tourism guide to Israel — regions, attractions, itineraries, and verified booking options.',
  },
};

// TODO(phase-6): replace placeholder logo URL with finalized brand asset.
const LOGO_PLACEHOLDER_URL = `${ORIGIN}/static/logo-placeholder.png`;

export function getOrganizationSchema(
  lang: SchemaLang,
): WithContext<Organization> {
  const brand = BRAND[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${ORIGIN}#organization`,
    name: brand.name,
    description: brand.description,
    url: ORIGIN,
    inLanguage: lang,
    logo: LOGO_PLACEHOLDER_URL,
  } as unknown as WithContext<Organization>;
}
