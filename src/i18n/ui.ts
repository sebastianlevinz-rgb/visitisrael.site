/**
 * i18n: locale list, routing helpers and the UI-string dictionary with a typed t().
 *
 * English lives at the root; French, German and Spanish under /fr/, /de/, /es/.
 * Since the v3 rebuild every content page exists in all four locales, so every
 * locale link resolves to a real translated page.
 */
export const locales = ['en', 'fr', 'de', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Endonym shown in the language switcher (same in every locale). */
export const languageNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
};

/** <html lang> / og:locale value per locale. */
export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES',
};

const SITE = 'https://visitisrael.site';

/** Locale from a URL pathname: /fr/… → 'fr', /de/… → 'de', /es/… → 'es', otherwise 'en'. */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg === 'fr' || seg === 'de' || seg === 'es') return seg;
  return 'en';
}

/** Home URL for a locale: en → '/', others → '/<locale>/'. */
export function localeHome(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}

/** Path prefix for a locale: en → '', others → '/<locale>'. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

/** Reciprocal hreflang alternates for the home pages (all four exist). */
export function homeAlternates(): { hreflang: string; href: string }[] {
  return [
    { hreflang: 'en', href: `${SITE}/` },
    { hreflang: 'fr', href: `${SITE}/fr/` },
    { hreflang: 'de', href: `${SITE}/de/` },
    { hreflang: 'es', href: `${SITE}/es/` },
    { hreflang: 'x-default', href: `${SITE}/` },
  ];
}

/**
 * Reciprocal hreflang alternates for a content page that exists in all locales.
 * `slug` has no leading slash (e.g. 'plan-your-trip'); en lives at the root.
 */
export function pageAlternates(slug: string): { hreflang: string; href: string }[] {
  return [
    { hreflang: 'en', href: `${SITE}/${slug}` },
    { hreflang: 'fr', href: `${SITE}/fr/${slug}` },
    { hreflang: 'de', href: `${SITE}/de/${slug}` },
    { hreflang: 'es', href: `${SITE}/es/${slug}` },
    { hreflang: 'x-default', href: `${SITE}/${slug}` },
  ];
}

/** UI strings. Keys are shared across locales; en is the fallback. */
const ui = {
  en: {
    'home.heroTitle': 'Visit Israel',
    'home.heroSubtitle':
      'An independent guide to 7 regions — from Jerusalem to the Red Sea — with itineraries, hotel guides and trusted booking links.',
    'home.regionsHeading': 'Explore the regions',
    'home.planHeading': 'Plan your trip',
    'nav.regions': 'Regions',
    'nav.itineraries': 'Itineraries',
    'nav.plan': 'Plan your trip',
    'nav.planShort': 'Plan',
    'nav.search': 'Search',
    'nav.openMenu': 'Open menu',
    'nav.language': 'Language',
    'nav.home': 'Home',
    'nav.firstTime': 'First time in Israel',
    'nav.visa': 'Visa & ETA',
    'nav.bestTime': 'Best time to visit',
    'nav.safety': 'Is Israel safe?',
    'nav.carRental': 'Car rental',
    'nav.hotelsJerusalem': 'Hotels in Jerusalem',
    'nav.hotelsTelAviv': 'Hotels in Tel Aviv',
    'nav.hotelsDeadSea': 'Dead Sea hotels',
    'nav.toursJerusalem': 'Jerusalem tours',
    'nav.toursDeadSea': 'Dead Sea & Masada tours',
    'nav.dayTripsTelAviv': 'Day trips from Tel Aviv',
    'plan.title': 'Plan Your Trip to Israel: Guides, Itineraries & Regions',
    'plan.description':
      'Everything to plan a trip to Israel in one place: practical guides, hotel and tour guides, ready-made itineraries and in-depth guides to 7 regions.',
    'plan.heroTitle': 'Plan Your Trip',
    'plan.heroSubtitle': 'Practical guides, where to stay, tours, itineraries and 7 regions — start here.',
    'plan.practicalHeading': 'Practical guides',
    'plan.stayHeading': 'Where to stay',
    'plan.toursHeading': 'Tours & day trips',
    'plan.itinerariesHeading': 'Itineraries',
    'plan.regionsHeading': 'The 7 regions',
    'footer.tagline':
      'An independent travel guide to Israel in four languages — regions, itineraries, hotel and tour guides with clearly disclosed booking links.',
    'footer.planning': 'Planning',
    'footer.stayTours': 'Stay & tours',
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
      'Un guide indépendant de 7 régions — de Jérusalem à la mer Rouge — avec itinéraires, guides des hôtels et liens de réservation fiables.',
    'home.regionsHeading': 'Explorer les régions',
    'home.planHeading': 'Préparer votre voyage',
    'nav.regions': 'Régions',
    'nav.itineraries': 'Itinéraires',
    'nav.plan': 'Préparer votre voyage',
    'nav.planShort': 'Préparer',
    'nav.search': 'Rechercher',
    'nav.openMenu': 'Ouvrir le menu',
    'nav.language': 'Langue',
    'nav.home': 'Accueil',
    'nav.firstTime': 'Premier voyage en Israël',
    'nav.visa': 'Visa & ETA',
    'nav.bestTime': 'Meilleure période',
    'nav.safety': 'Israël est-il sûr ?',
    'nav.carRental': 'Location de voiture',
    'nav.hotelsJerusalem': 'Hôtels à Jérusalem',
    'nav.hotelsTelAviv': 'Hôtels à Tel Aviv',
    'nav.hotelsDeadSea': 'Hôtels de la mer Morte',
    'nav.toursJerusalem': 'Circuits à Jérusalem',
    'nav.toursDeadSea': 'Circuits mer Morte & Massada',
    'nav.dayTripsTelAviv': 'Excursions depuis Tel Aviv',
    'plan.title': 'Préparer votre voyage en Israël : guides, itinéraires et régions',
    'plan.description':
      'Tout pour préparer un voyage en Israël au même endroit : guides pratiques, hôtels et circuits, itinéraires prêts à l’emploi et guides détaillés de 7 régions.',
    'plan.heroTitle': 'Préparez votre voyage',
    'plan.heroSubtitle': 'Guides pratiques, hébergement, circuits, itinéraires et 7 régions — commencez ici.',
    'plan.practicalHeading': 'Guides pratiques',
    'plan.stayHeading': 'Où dormir',
    'plan.toursHeading': 'Circuits & excursions',
    'plan.itinerariesHeading': 'Itinéraires',
    'plan.regionsHeading': 'Les 7 régions',
    'footer.tagline':
      'Un guide de voyage indépendant sur Israël en quatre langues — régions, itinéraires, guides des hôtels et circuits avec des liens de réservation clairement signalés.',
    'footer.planning': 'Préparer',
    'footer.stayTours': 'Hôtels & circuits',
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
      'Ein unabhängiger Reiseführer für 7 Regionen — von Jerusalem bis zum Roten Meer — mit Reiserouten, Hotelguides und vertrauenswürdigen Buchungslinks.',
    'home.regionsHeading': 'Die Regionen entdecken',
    'home.planHeading': 'Reise planen',
    'nav.regions': 'Regionen',
    'nav.itineraries': 'Reiserouten',
    'nav.plan': 'Reise planen',
    'nav.planShort': 'Planen',
    'nav.search': 'Suchen',
    'nav.openMenu': 'Menü öffnen',
    'nav.language': 'Sprache',
    'nav.home': 'Startseite',
    'nav.firstTime': 'Erste Israel-Reise',
    'nav.visa': 'Visum & ETA',
    'nav.bestTime': 'Beste Reisezeit',
    'nav.safety': 'Ist Israel sicher?',
    'nav.carRental': 'Mietwagen',
    'nav.hotelsJerusalem': 'Hotels in Jerusalem',
    'nav.hotelsTelAviv': 'Hotels in Tel Aviv',
    'nav.hotelsDeadSea': 'Hotels am Toten Meer',
    'nav.toursJerusalem': 'Touren in Jerusalem',
    'nav.toursDeadSea': 'Touren Totes Meer & Masada',
    'nav.dayTripsTelAviv': 'Ausflüge ab Tel Aviv',
    'plan.title': 'Reise nach Israel planen: Reiseführer, Reiserouten & Regionen',
    'plan.description':
      'Alles für die Planung einer Israel-Reise an einem Ort: praktische Reiseführer, Hotels und Touren, fertige Reiserouten und ausführliche Guides zu 7 Regionen.',
    'plan.heroTitle': 'Planen Sie Ihre Reise',
    'plan.heroSubtitle': 'Praktische Reiseführer, Unterkünfte, Touren, Reiserouten und 7 Regionen — fangen Sie hier an.',
    'plan.practicalHeading': 'Praktische Reiseführer',
    'plan.stayHeading': 'Unterkunft',
    'plan.toursHeading': 'Touren & Tagesausflüge',
    'plan.itinerariesHeading': 'Reiserouten',
    'plan.regionsHeading': 'Die 7 Regionen',
    'footer.tagline':
      'Ein unabhängiger Reiseführer für Israel in vier Sprachen — Regionen, Reiserouten, Hotel- und Tourguides mit klar gekennzeichneten Buchungslinks.',
    'footer.planning': 'Planung',
    'footer.stayTours': 'Hotels & Touren',
    'footer.about': 'Über uns',
    'footer.copyright':
      'Ein unabhängiger Reiseführer. Fotos über Wikimedia Commons und originale KI-gestützte Grafiken. Diese Website enthält Affiliate-Links.',
    'cta.flights': 'Flüge',
    'cta.hotels': 'Hotels',
    'cta.tours': 'Touren',
    'cta.quickBooking': 'Schnellbuchung',
    'a11y.skipToContent': 'Zum Inhalt springen',
  },
  es: {
    'home.heroTitle': 'Visitar Israel',
    'home.heroSubtitle':
      'Una guía independiente de 7 regiones — desde Jerusalén hasta el Mar Rojo — con itinerarios, guías de hoteles y enlaces de reserva de confianza.',
    'home.regionsHeading': 'Explorar las regiones',
    'home.planHeading': 'Planifica tu viaje',
    'nav.regions': 'Regiones',
    'nav.itineraries': 'Itinerarios',
    'nav.plan': 'Planifica tu viaje',
    'nav.planShort': 'Planifica',
    'nav.search': 'Buscar',
    'nav.openMenu': 'Abrir menú',
    'nav.language': 'Idioma',
    'nav.home': 'Inicio',
    'nav.firstTime': 'Primer viaje a Israel',
    'nav.visa': 'Visado y ETA',
    'nav.bestTime': 'Mejor época',
    'nav.safety': '¿Es seguro Israel?',
    'nav.carRental': 'Alquiler de coche',
    'nav.hotelsJerusalem': 'Hoteles en Jerusalén',
    'nav.hotelsTelAviv': 'Hoteles en Tel Aviv',
    'nav.hotelsDeadSea': 'Hoteles del Mar Muerto',
    'nav.toursJerusalem': 'Tours en Jerusalén',
    'nav.toursDeadSea': 'Tours Mar Muerto y Masada',
    'nav.dayTripsTelAviv': 'Excursiones desde Tel Aviv',
    'plan.title': 'Planifica tu viaje a Israel: guías, itinerarios y regiones',
    'plan.description':
      'Todo para planificar un viaje a Israel: guías prácticas, hoteles y tours, itinerarios listos y guías detalladas de 7 regiones.',
    'plan.heroTitle': 'Planifica tu viaje',
    'plan.heroSubtitle': 'Guías prácticas, alojamiento, tours, itinerarios y 7 regiones — empieza aquí.',
    'plan.practicalHeading': 'Guías prácticas',
    'plan.stayHeading': 'Dónde dormir',
    'plan.toursHeading': 'Tours y excursiones',
    'plan.itinerariesHeading': 'Itinerarios',
    'plan.regionsHeading': 'Las 7 regiones',
    'footer.tagline':
      'Una guía de viaje independiente sobre Israel en cuatro idiomas — regiones, itinerarios, guías de hoteles y tours con enlaces de reserva claramente señalados.',
    'footer.planning': 'Planificar',
    'footer.stayTours': 'Hoteles y tours',
    'footer.about': 'Acerca de',
    'footer.copyright':
      'Una guía de viaje independiente. Fotografías a través de Wikimedia Commons e ilustraciones originales asistidas por IA. Este sitio contiene enlaces de afiliados.',
    'cta.flights': 'Vuelos',
    'cta.hotels': 'Hoteles',
    'cta.tours': 'Tours',
    'cta.quickBooking': 'Reserva rápida',
    'a11y.skipToContent': 'Ir al contenido',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];

/** Returns a t(key) bound to the given locale, falling back to English. */
export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key] ?? ui.en[key] ?? key;
}

/**
 * The site's page groups (the v3 taxonomy), shared by the header, footer, home and
 * plan-your-trip hub so every navigation surface lists the same, existing pages.
 * Paths have no locale prefix; every page exists in all four locales.
 */
export const PAGE_GROUPS = {
  practical: [
    { slug: 'first-time-in-israel', key: 'nav.firstTime' },
    { slug: 'visa-information', key: 'nav.visa' },
    { slug: 'best-time-to-visit-israel', key: 'nav.bestTime' },
    { slug: 'is-israel-safe', key: 'nav.safety' },
    { slug: 'car-rental-israel', key: 'nav.carRental' },
  ],
  stay: [
    { slug: 'best-hotels-jerusalem', key: 'nav.hotelsJerusalem' },
    { slug: 'best-hotels-tel-aviv', key: 'nav.hotelsTelAviv' },
    { slug: 'dead-sea-hotels-guide', key: 'nav.hotelsDeadSea' },
  ],
  tours: [
    { slug: 'jerusalem-tours-compared', key: 'nav.toursJerusalem' },
    { slug: 'dead-sea-tours-compared', key: 'nav.toursDeadSea' },
    { slug: 'day-trips-from-tel-aviv', key: 'nav.dayTripsTelAviv' },
  ],
} as const satisfies Record<string, readonly { slug: string; key: UiKey }[]>;
