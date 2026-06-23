/**
 * i18n foundation (Phase 0).
 *
 * The site is English-first (en at the root). French and German are being added
 * progressively under /fr/ and /de/. This module holds the locale list, helpers
 * to read/route by locale, and a small UI-string dictionary with a typed t().
 *
 * Translation rollout is phased — see .loop/I18N-PLAN.md. Until a given page has
 * a translation, links should resolve to the locale home (no broken routes).
 */
export const locales = ['en', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Endonym shown in the language switcher (same in every locale). */
export const languageNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
};

/** <html lang> / og:locale value per locale. */
export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
};

const SITE = 'https://visitisrael.site';

/** Locale from a URL pathname: /fr/… → 'fr', /de/… → 'de', otherwise 'en'. */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return seg === 'fr' || seg === 'de' ? seg : 'en';
}

/** Home URL for a locale: en → '/', others → '/<locale>/'. */
export function localeHome(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}

/**
 * Reciprocal hreflang alternates for the home pages (all three exist).
 * Other pages add their own set as translations ship.
 */
export function homeAlternates(): { hreflang: string; href: string }[] {
  return [
    { hreflang: 'en', href: `${SITE}/` },
    { hreflang: 'fr', href: `${SITE}/fr/` },
    { hreflang: 'de', href: `${SITE}/de/` },
    { hreflang: 'x-default', href: `${SITE}/` },
  ];
}

/** UI strings. Keys are shared across locales; en is the fallback. */
const ui = {
  en: {
    'home.heroTitle': 'Visit Israel',
    'home.heroSubtitle':
      'An independent guide to 11 regions — from Jerusalem to the Red Sea — with itineraries, attractions and trusted booking links.',
    'home.regionsHeading': 'Explore the regions',
    'home.planHeading': 'Plan your trip',
    'home.rolloutNotice':
      'Our in-depth guides are currently in English while we expand our French and German coverage. Explore the regions below, or read the full guides in English.',
    'home.englishCta': 'Browse the full English guide',
    'nav.regions': 'Regions',
    'nav.itineraries': 'Itineraries',
    'nav.plan': 'Plan your trip',
    'nav.planShort': 'Plan',
    'nav.search': 'Search',
    'nav.openMenu': 'Open menu',
    'nav.language': 'Language',
    'footer.tagline':
      'An independent English-language travel guide to Israel — regions, attractions, itineraries and trusted booking links.',
    'footer.dayTrips': 'Day trips',
    'footer.essentials': 'Essentials',
    'footer.about': 'About',
    'footer.copyright':
      'An independent travel guide. Photography via Wikimedia Commons and original AI-assisted artwork. This site contains affiliate links.',
    'cta.flights': 'Flights',
    'cta.hotels': 'Hotels',
    'cta.tours': 'Tours',
    'cta.quickBooking': 'Quick booking',
    'a11y.skipToContent': 'Skip to content',
  },
  fr: {
    'home.heroTitle': 'Visiter Israël',
    'home.heroSubtitle':
      'Un guide indépendant des 11 régions — de Jérusalem à la mer Rouge — avec des itinéraires, des sites à voir et des liens de réservation fiables.',
    'home.regionsHeading': 'Explorer les régions',
    'home.planHeading': 'Préparer votre voyage',
    'home.rolloutNotice':
      'Nos guides détaillés sont actuellement en anglais, le temps que nous développions nos contenus en français et en allemand. Découvrez les régions ci-dessous ou consultez les guides complets en anglais.',
    'home.englishCta': 'Consulter le guide complet en anglais',
    'nav.regions': 'Régions',
    'nav.itineraries': 'Itinéraires',
    'nav.plan': 'Préparer votre voyage',
    'nav.planShort': 'Préparer',
    'nav.search': 'Rechercher',
    'nav.openMenu': 'Ouvrir le menu',
    'nav.language': 'Langue',
    'footer.tagline':
      'Un guide de voyage indépendant, en anglais, sur Israël — régions, sites, itinéraires et liens de réservation fiables.',
    'footer.dayTrips': 'Excursions',
    'footer.essentials': 'Essentiel',
    'footer.about': 'À propos',
    'footer.copyright':
      'Un guide de voyage indépendant. Photographies via Wikimedia Commons et illustrations originales assistées par IA. Ce site contient des liens d’affiliation.',
    'cta.flights': 'Vols',
    'cta.hotels': 'Hôtels',
    'cta.tours': 'Visites',
    'cta.quickBooking': 'Réservation rapide',
    'a11y.skipToContent': 'Aller au contenu',
  },
  de: {
    'home.heroTitle': 'Israel besuchen',
    'home.heroSubtitle':
      'Ein unabhängiger Reiseführer für 11 Regionen — von Jerusalem bis zum Roten Meer — mit Reiserouten, Sehenswürdigkeiten und vertrauenswürdigen Buchungslinks.',
    'home.regionsHeading': 'Die Regionen entdecken',
    'home.planHeading': 'Reise planen',
    'home.rolloutNotice':
      'Unsere ausführlichen Reiseführer sind derzeit auf Englisch, während wir unsere französischen und deutschen Inhalte ausbauen. Entdecken Sie unten die Regionen oder lesen Sie die vollständigen Reiseführer auf Englisch.',
    'home.englishCta': 'Den vollständigen englischen Reiseführer ansehen',
    'nav.regions': 'Regionen',
    'nav.itineraries': 'Reiserouten',
    'nav.plan': 'Reise planen',
    'nav.planShort': 'Planen',
    'nav.search': 'Suchen',
    'nav.openMenu': 'Menü öffnen',
    'nav.language': 'Sprache',
    'footer.tagline':
      'Ein unabhängiger englischsprachiger Reiseführer für Israel — Regionen, Sehenswürdigkeiten, Reiserouten und vertrauenswürdige Buchungslinks.',
    'footer.dayTrips': 'Tagesausflüge',
    'footer.essentials': 'Wissenswertes',
    'footer.about': 'Über uns',
    'footer.copyright':
      'Ein unabhängiger Reiseführer. Fotos über Wikimedia Commons und originale KI-gestützte Grafiken. Diese Website enthält Affiliate-Links.',
    'cta.flights': 'Flüge',
    'cta.hotels': 'Hotels',
    'cta.tours': 'Touren',
    'cta.quickBooking': 'Schnellbuchung',
    'a11y.skipToContent': 'Zum Inhalt springen',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];

/** Returns a t(key) bound to the given locale, falling back to English. */
export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key] ?? ui.en[key] ?? key;
}
