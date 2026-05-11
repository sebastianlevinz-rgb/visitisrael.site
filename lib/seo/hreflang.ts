/**
 * Hreflang alternates generator.
 *
 * For a given content slug, emits the full set of `<link rel="alternate">`
 * tags Google expects: one entry per REGISTERED locale plus an `x-default`
 * pointing at the EN canonical (per RESEARCH §1.8 + ARCHITECTURE §6.2 +
 * I18N-05 + Argentina lesson #4).
 *
 * Iterates `locales` from `i18n-config.ts` (he, en at launch) — never the
 * `allowedLangs` superset (he, en, fr). Adding FR later is a one-line
 * change in `i18n-config.ts`; nothing here needs to change.
 *
 * Output shape is intentionally lightweight `{ hreflang, href }[]` so it
 * can feed either Next.js Metadata `alternates.languages` or a manual
 * `<link>` tag emitter.
 */
import { locales } from '../../i18n-config';

import { canonicalUrl } from './canonical';

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

/**
 * Returns `[{ he, … }, { en, … }, { x-default, EN-URL }]` for the given slug.
 *
 * x-default → EN per ARCHITECTURE §6.2 (English is the global fallback for
 * an Israel-focused property; HE is the default-locale prefix-less surface).
 */
export function hreflangAlternates(slug: string): HreflangAlternate[] {
  const out: HreflangAlternate[] = locales.map((l) => ({
    hreflang: l,
    href: canonicalUrl(slug, l),
  }));
  out.push({ hreflang: 'x-default', href: canonicalUrl(slug, 'en') });
  return out;
}
