/**
 * Self-referential canonical URL generator per locale.
 *
 * SEO-06: HE-canonical pages NEVER point to EN counterparts and vice versa.
 *
 * Conflict A is honored: `locales` is the REGISTERED set (he/en at launch).
 * Adding FR later flips it without touching this function.
 *
 * Examples:
 *   canonicalUrl('jerusalem', 'he')         => 'https://visitisrael.site/jerusalem'
 *   canonicalUrl('jerusalem', 'en')         => 'https://visitisrael.site/en/jerusalem'
 *   canonicalUrl('', 'he')                  => 'https://visitisrael.site'
 *   canonicalUrl('', 'en')                  => 'https://visitisrael.site/en'
 *   canonicalUrl('/jerusalem/', 'en')       => 'https://visitisrael.site/en/jerusalem'
 *   canonicalUrl('regions/galilee', 'he')   => 'https://visitisrael.site/regions/galilee'
 */
import { defaultLocale, type Locale } from '../../i18n-config';

export const ORIGIN = 'https://visitisrael.site';

export function canonicalUrl(slug: string, lang: Locale): string {
  // Normalize: strip leading + trailing slashes
  const cleanSlug = slug.replace(/^\/+/, '').replace(/\/+$/, '');

  let path: string;
  if (cleanSlug === '') {
    path = lang === defaultLocale ? '' : `/${lang}`;
  } else {
    path = lang === defaultLocale ? `/${cleanSlug}` : `/${lang}/${cleanSlug}`;
  }

  return `${ORIGIN}${path}`;
}
