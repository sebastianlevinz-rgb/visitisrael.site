/**
 * Dynamic sitemap generator.
 *
 * Iterates `locales` — the REGISTERED set from `i18n-config.ts` (`['he','en']`).
 * Never iterates `allowedLangs` (the filesystem-ready superset that includes
 * `fr`), so the FR scaffold cannot leak into Google's discoverable surface.
 * Conflict A enforced at the sitemap layer.
 *
 * Phase 1: content is empty — emit static paths only. Phase 2+ extends this
 * generator with Velite-collected slugs.
 *
 * Per RESEARCH §1.8 (Phase 1.8) and FND-06.
 */
import type { MetadataRoute } from 'next';

import { locales, defaultLocale } from '../i18n-config';

const ORIGIN = 'https://visitisrael.site';

/** Phase 1 placeholder paths. Phase 2+ pulls from `content/{he,en}/**` via Velite. */
const STATIC_PATHS = [
  '', // homepage
  '/about',
  '/contact',
  '/privacy',
  '/affiliate-disclosure',
  '/accessibility-statement',
  // Phase 2.1 — Jerusalem canonical (config-driven addition; replicates to
  // /jerusalem (HE root) and /en/jerusalem via the localizedUrl loop below).
  '/jerusalem',
  // Phase 2.3 — Jerusalem sub-destinations (7 short slugs under /jerusalem).
  // Each replicates to /jerusalem/<slug> + /en/jerusalem/<slug> via the loop.
  '/jerusalem/old-city',
  '/jerusalem/western-wall',
  '/jerusalem/holy-sepulchre',
  '/jerusalem/yad-vashem',
  '/jerusalem/mahane-yehuda',
  '/jerusalem/mount-of-olives',
  '/jerusalem/city-of-david',
];

/** Convert a (locale, path) pair to a fully-qualified URL string. */
function localizedUrl(lang: (typeof locales)[number], rawPath: string): string {
  const cleanPath = rawPath.replace(/\/+$/, '');
  if (lang === defaultLocale) {
    return cleanPath === '' ? `${ORIGIN}/` : `${ORIGIN}${cleanPath}`;
  }
  return cleanPath === ''
    ? `${ORIGIN}/${lang}`
    : `${ORIGIN}/${lang}${cleanPath}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const p of STATIC_PATHS) {
      const url = localizedUrl(lang, p);
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = localizedUrl(l, p);
      }
      urls.push({
        url,
        alternates: { languages },
      });
    }
  }

  return urls;
}
