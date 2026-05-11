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
  // Phase 2.5 — hub + legal pages. All five legal pages ship in plan 2.5.
  // accessibility-statement ships AFTER the coordinator-data checkpoint.
  '/regions',
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
  // Phase 2.4 — Jerusalem itinerary. Replicates to
  // /itineraries/3-days-in-jerusalem (HE root) + /en/itineraries/...
  '/itineraries/3-days-in-jerusalem',
  // Phase 3.1 — Tel Aviv canonical + 7 sub-destinations.
  '/tel-aviv',
  '/tel-aviv/old-jaffa',
  '/tel-aviv/carmel-market',
  '/tel-aviv/rothschild',
  '/tel-aviv/tel-aviv-museum',
  '/tel-aviv/florentin',
  '/tel-aviv/tayelet',
  '/tel-aviv/neve-tzedek',
  // Phase 3.2 — Dead Sea canonical + 5 sub-destinations.
  '/dead-sea',
  '/dead-sea/masada',
  '/dead-sea/ein-gedi',
  '/dead-sea/qumran',
  '/dead-sea/mineral-beach',
  '/dead-sea/ein-bokek',
  // Phase 3.3 — Galilee canonical + 6 sub-destinations.
  '/galilee',
  '/galilee/tiberias',
  '/galilee/capernaum',
  '/galilee/mount-of-beatitudes',
  '/galilee/magdala',
  '/galilee/yardenit',
  '/galilee/mount-arbel',
  // Phase 3.4 — Eilat canonical + 5 sub-destinations (Wave 2; Red Sea tourism
  // enclave; all TouristAttraction-only — no religious sites in Eilat).
  '/eilat',
  '/eilat/coral-beach',
  '/eilat/underwater-observatory',
  '/eilat/timna-park',
  '/eilat/dolphin-reef',
  '/eilat/red-canyon',
  // Phase 3.5 — Negev canonical + 5 sub-destinations (Wave 3; image-gap canary
  // for REG-05; all TouristAttraction-only — Avdat is Nabataean archaeological
  // not PlaceOfWorship; Ben-Gurion grave at Sde Boker is national-memorial;
  // Bedouin hospitality is experiential community-partnership).
  '/negev',
  '/negev/mitzpe-ramon',
  '/negev/avdat',
  '/negev/sde-boker',
  '/negev/ein-avdat',
  '/negev/bedouin-hospitality',
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
