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

/**
 * Reciprocal hreflang alternates for the home pages (all four exist).
 * Other pages add their own set as translations ship.
 */
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
    'nav.thingsToDo': 'Things to do',
    'nav.buildTrip': 'Build your trip',
    'nav.tours': 'Tours',
    'nav.costCalculator': 'Cost calculator',
    'nav.distanceCalculator': 'Distance calculator',
    'nav.howManyDays': 'How many days?',
    'nav.map': 'Map',
    'nav.home': 'Home',
    'plan.title': 'Plan Your Trip to Israel: Guides, Itineraries & Regions',
    'plan.description':
      'Everything you need to plan a trip to Israel in one place: practical guides, ready-made itineraries and in-depth guides to all 11 regions.',
    'plan.heroTitle': 'Plan Your Trip',
    'plan.heroSubtitle': 'Practical guides, itineraries and the 11 regions — start here.',
    'plan.guidesHeading': 'Practical guides',
    'plan.toolsHeading': 'Free travel tools',
    'plan.itinerariesHeading': 'Itineraries',
    'plan.itinerariesIntro': 'Ready-made routes from 3 days to a full week —',
    'plan.browseAll': 'browse all itineraries →',
    'plan.regionsHeading': 'The 11 regions',
    'tool.buildTrip': 'Build your trip',
    'tool.costCalc': 'Trip cost calculator',
    'tool.currency': 'Currency & tipping',
    'tool.packing': 'Packing checklist',
    'tool.quiz': 'Which region quiz',
    'tool.map': 'Travel map',
    'tool.distance': 'Distance calculator',
    'tool.days': 'How many days?',
    'tool.weather': 'Weather & packing',
    'tool.restaurantFinder': 'Kosher & vegan restaurants',
    'tool.shabbatCalendar': 'Shabbat & holiday calendar',
    'tool.visaEtaChecker': 'Visa & ETA-IL checker',
    'tool.travelTime': 'Travel time calculator',
    'tool.holidayPlanner': 'Holiday impact planner',
    'tool.parksCalc': 'Parks pass calculator',
    'tool.carQuiz': 'Should I rent a car?',
    'tool.goldenHour': 'Sunrise & golden hour calculator',
    'tool.shabbatCountdown': 'Is it Shabbat right now?',
    'tool.experienceFinder': 'What type of traveler am I?',
    'tool.effectiveDays': 'Effective touring days calculator',
    'tool.seasonPicker': 'Best time to visit — season picker',
    'tool.itineraryChecker': 'Itinerary feasibility checker',
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
    'nav.thingsToDo': 'Que faire',
    'nav.buildTrip': 'Composer mon voyage',
    'nav.tours': 'Excursions',
    'nav.costCalculator': 'Calculateur de budget',
    'nav.distanceCalculator': 'Calculateur de distances',
    'nav.howManyDays': 'Combien de jours ?',
    'nav.map': 'Carte',
    'nav.home': 'Accueil',
    'plan.title': 'Préparer votre voyage en Israël : guides, itinéraires et régions',
    'plan.description':
      'Tout ce qu’il faut pour préparer un voyage en Israël au même endroit : guides pratiques, itinéraires prêts à l’emploi et guides détaillés des 11 régions.',
    'plan.heroTitle': 'Préparez votre voyage',
    'plan.heroSubtitle': 'Guides pratiques, itinéraires et les 11 régions — commencez ici.',
    'plan.guidesHeading': 'Guides pratiques',
    'plan.toolsHeading': 'Outils de voyage gratuits',
    'plan.itinerariesHeading': 'Itinéraires',
    'plan.itinerariesIntro': 'Des itinéraires prêts à l’emploi, de 3 jours à une semaine —',
    'plan.browseAll': 'voir tous les itinéraires →',
    'plan.regionsHeading': 'Les 11 régions',
    'tool.buildTrip': 'Composer mon voyage',
    'tool.costCalc': 'Calculateur de budget',
    'tool.currency': 'Monnaie et pourboires',
    'tool.packing': 'Liste de bagages',
    'tool.quiz': 'Quiz : quelle région ?',
    'tool.map': 'Carte de voyage',
    'tool.distance': 'Calculateur de distances',
    'tool.days': 'Combien de jours ?',
    'tool.weather': 'Météo & bagages',
    'tool.restaurantFinder': 'Restaurants kasher & végétaliens',
    'tool.shabbatCalendar': 'Calendrier Shabbat & fêtes',
    'tool.visaEtaChecker': 'Vérificateur de visa & ETA-IL',
    'tool.travelTime': 'Calculateur de durées de trajet',
    'tool.holidayPlanner': 'Planificateur de jours fériés',
    'tool.parksCalc': 'Calculateur de pass parcs nationaux',
    'tool.carQuiz': 'Faut-il louer une voiture ?',
    'tool.goldenHour': 'Calculateur lever du soleil & heure dorée',
    'tool.shabbatCountdown': 'Est-ce Shabbat en ce moment ?',
    'tool.experienceFinder': 'Quel type de voyageur suis-je ?',
    'tool.effectiveDays': 'Calculateur de jours de visite effectifs',
    'tool.seasonPicker': 'Meilleure période de visite — sélecteur de saison',
    'tool.itineraryChecker': 'Vérificateur de faisabilité d\'itinéraire',
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
    'nav.thingsToDo': 'Sehenswertes',
    'nav.buildTrip': 'Reise zusammenstellen',
    'nav.tours': 'Touren',
    'nav.costCalculator': 'Budgetrechner',
    'nav.distanceCalculator': 'Entfernungsrechner',
    'nav.howManyDays': 'Wie viele Tage?',
    'nav.map': 'Karte',
    'nav.home': 'Startseite',
    'plan.title': 'Reise nach Israel planen: Reiseführer, Reiserouten & Regionen',
    'plan.description':
      'Alles für die Planung einer Israel-Reise an einem Ort: praktische Reiseführer, fertige Reiserouten und ausführliche Guides zu allen 11 Regionen.',
    'plan.heroTitle': 'Planen Sie Ihre Reise',
    'plan.heroSubtitle': 'Praktische Reiseführer, Reiserouten und die 11 Regionen — fangen Sie hier an.',
    'plan.guidesHeading': 'Praktische Reiseführer',
    'plan.toolsHeading': 'Kostenlose Reise-Tools',
    'plan.itinerariesHeading': 'Reiserouten',
    'plan.itinerariesIntro': 'Fertige Routen von 3 Tagen bis zu einer Woche —',
    'plan.browseAll': 'alle Reiserouten ansehen →',
    'plan.regionsHeading': 'Die 11 Regionen',
    'tool.buildTrip': 'Reise zusammenstellen',
    'tool.costCalc': 'Reisekostenrechner',
    'tool.currency': 'Währung & Trinkgeld',
    'tool.packing': 'Packliste',
    'tool.quiz': 'Welche Region passt?',
    'tool.map': 'Reisekarte',
    'tool.distance': 'Entfernungsrechner',
    'tool.days': 'Wie viele Tage?',
    'tool.weather': 'Wetter & Packliste',
    'tool.restaurantFinder': 'Koscher- & Vegan-Restaurants',
    'tool.shabbatCalendar': 'Schabbat- & Feiertagskalender',
    'tool.visaEtaChecker': 'Visum- & ETA-IL-Prüfer',
    'tool.travelTime': 'Reisezeit-Rechner',
    'tool.holidayPlanner': 'Feiertagsplaner',
    'tool.parksCalc': 'Nationalpark-Pass-Rechner',
    'tool.carQuiz': 'Mietwagen nötig?',
    'tool.goldenHour': 'Sonnenaufgang & goldene Stunde',
    'tool.shabbatCountdown': 'Ist jetzt Schabbat?',
    'tool.experienceFinder': 'Welcher Reisetyp bin ich?',
    'tool.effectiveDays': 'Rechner für effektive Besichtigungstage',
    'tool.seasonPicker': 'Beste Reisezeit — Saisonpicker',
    'tool.itineraryChecker': 'Reiseplan-Machbarkeits-Checker',
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
  es: {
    'home.heroTitle': 'Visitar Israel',
    'home.heroSubtitle':
      'Una guía independiente de las 11 regiones — desde Jerusalén hasta el Mar Rojo — con itinerarios, atracciones y enlaces de reserva de confianza.',
    'home.regionsHeading': 'Explorar las regiones',
    'home.planHeading': 'Planifica tu viaje',
    'home.rolloutNotice':
      'Nuestras guías detalladas están actualmente en inglés mientras ampliamos el contenido en español. Explora las regiones a continuación o lee las guías completas en inglés.',
    'home.englishCta': 'Ver la guía completa en inglés',
    'nav.regions': 'Regiones',
    'nav.itineraries': 'Itinerarios',
    'nav.plan': 'Planifica tu viaje',
    'nav.planShort': 'Planifica',
    'nav.search': 'Buscar',
    'nav.openMenu': 'Abrir menú',
    'nav.language': 'Idioma',
    'nav.thingsToDo': 'Qué hacer',
    'nav.buildTrip': 'Crea tu viaje',
    'nav.tours': 'Excursiones',
    'nav.costCalculator': 'Calculadora de presupuesto',
    'nav.distanceCalculator': 'Calculadora de distancias',
    'nav.howManyDays': '¿Cuántos días?',
    'nav.map': 'Mapa',
    'nav.home': 'Inicio',
    'plan.title': 'Planifica tu viaje a Israel: guías, itinerarios y regiones',
    'plan.description':
      'Todo lo que necesitas para planificar un viaje a Israel: guías prácticas, itinerarios listos y guías detalladas de las 11 regiones.',
    'plan.heroTitle': 'Planifica tu viaje',
    'plan.heroSubtitle': 'Guías prácticas, itinerarios y las 11 regiones — empieza aquí.',
    'plan.guidesHeading': 'Guías prácticas',
    'plan.toolsHeading': 'Herramientas de viaje gratuitas',
    'plan.itinerariesHeading': 'Itinerarios',
    'plan.itinerariesIntro': 'Rutas listas de 3 días a una semana —',
    'plan.browseAll': 'ver todos los itinerarios →',
    'plan.regionsHeading': 'Las 11 regiones',
    'tool.buildTrip': 'Crea tu viaje',
    'tool.costCalc': 'Calculadora de presupuesto',
    'tool.currency': 'Moneda y propinas',
    'tool.packing': 'Lista de equipaje',
    'tool.quiz': 'Quiz: ¿qué región te espera?',
    'tool.map': 'Mapa de viaje',
    'tool.distance': 'Calculadora de distancias',
    'tool.days': '¿Cuántos días?',
    'tool.weather': 'Tiempo y equipaje',
    'tool.restaurantFinder': 'Restaurantes kosher y veganos',
    'tool.shabbatCalendar': 'Calendario Shabat y festividades',
    'tool.visaEtaChecker': 'Verificador de visa y ETA-IL',
    'tool.travelTime': 'Calculadora de tiempos de viaje',
    'tool.holidayPlanner': 'Planificador de días festivos',
    'tool.parksCalc': 'Calculadora de pase de parques',
    'tool.carQuiz': '¿Necesito alquilar un coche?',
    'tool.goldenHour': 'Calculadora de amanecer y hora dorada',
    'tool.shabbatCountdown': '¿Es Shabat ahora?',
    'tool.experienceFinder': '¿Qué tipo de viajero soy?',
    'tool.effectiveDays': 'Calculadora de días de visita efectivos',
    'tool.seasonPicker': 'Mejor época para visitar — selector de temporada',
    'tool.itineraryChecker': 'Verificador de viabilidad del itinerario',
    'footer.tagline':
      'Una guía de viaje independiente en inglés sobre Israel — regiones, atracciones, itinerarios y enlaces de reserva de confianza.',
    'footer.dayTrips': 'Excursiones de un día',
    'footer.essentials': 'Esenciales',
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
