/**
 * Single source of truth for i18n locales.
 *
 * Conflict A resolution (locked):
 *   - `locales`       = REGISTERED at launch. Middleware, hreflang generators,
 *                       sitemap, and language switcher iterate THIS array.
 *   - `allowedLangs`  = FILESYSTEM-READY superset. Velite collections,
 *                       `content/{he,en,fr}/`, and type unions accept this.
 *
 * Adding FR later = flip `locales = ['he','en','fr']`. No other code change.
 */

export const locales = ['he', 'en'] as const;
export const defaultLocale: (typeof locales)[number] = 'he';
export const allowedLangs = ['he', 'en', 'fr'] as const;

export type Locale = (typeof locales)[number];
export type AllowedLang = (typeof allowedLangs)[number];

/** RTL direction lookup for `<html dir>` attribute. */
export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  he: 'rtl',
  en: 'ltr',
};
