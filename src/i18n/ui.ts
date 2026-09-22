/**
 * i18n: locale list, routing helpers and the UI-string dictionary with a typed t().
 *
 * English lives at the root; French, German, Spanish and Hebrew under /fr/, /de/,
 * /es/, /he/. Since the v3 rebuild every content page exists in all locales, so
 * every locale link resolves to a real translated page.
 */
export const locales = ['en', 'fr', 'de', 'es', 'he'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
/** Locales served under a URL prefix (everything except the default). */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale) as Exclude<Locale, 'en'>[];

/** Right-to-left locales — drive <html dir> and the logical-property layout. */
export const rtlLocales: readonly Locale[] = ['he'];
export const isRtl = (locale: Locale): boolean => rtlLocales.includes(locale);
/** <html dir> value for a locale. */
export const textDirection = (locale: Locale): 'ltr' | 'rtl' => (isRtl(locale) ? 'rtl' : 'ltr');

/** Endonym shown in the language switcher (same in every locale). */
export const languageNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  he: 'עברית',
};

/** <html lang> / og:locale value per locale. */
export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES',
  he: 'he_IL',
};

const SITE = 'https://visitisrael.site';

/** True for any non-default locale code (type guard over the `locales` list). */
export function isPrefixedLocale(seg: string | undefined): seg is Exclude<Locale, 'en'> {
  return seg !== undefined && seg !== defaultLocale && (locales as readonly string[]).includes(seg);
}

/** Locale from a URL pathname: /fr/… → 'fr', /he/… → 'he', …, otherwise 'en'. */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return isPrefixedLocale(seg) ? seg : defaultLocale;
}

/**
 * Locale of a content-collection entry id ('fr/jerusalem' → 'fr', 'jerusalem' → 'en')
 * plus the id without its locale prefix. Translations live in `<locale>/<slug>`.
 */
export function splitEntryId(id: string): { locale: Locale; slug: string } {
  const [first, ...rest] = id.split('/');
  if (rest.length > 0 && isPrefixedLocale(first)) return { locale: first, slug: rest.join('/') };
  return { locale: defaultLocale, slug: id };
}

/** Content id for a slug in a locale: en → slug, others → '<locale>/<slug>'. */
export function entryIdFor(locale: Locale, slug: string): string {
  return locale === defaultLocale ? slug : `${locale}/${slug}`;
}

/** Regex matching a leading locale prefix in a pathname, e.g. /^\/(fr|de|es|he)(?=\/|$)/. */
export const localePrefixRe = new RegExp(`^\\/(${prefixedLocales.join('|')})(?=\\/|$)`);

/** Home URL for a locale: en → '/', others → '/<locale>/'. */
export function localeHome(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}

/** Path prefix for a locale: en → '', others → '/<locale>'. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

/** Reciprocal hreflang alternates for the home pages (one per locale). */
export function homeAlternates(): { hreflang: string; href: string }[] {
  return [
    ...locales.map((l) => ({ hreflang: l, href: `${SITE}${localeHome(l)}` })),
    { hreflang: 'x-default', href: `${SITE}/` },
  ];
}

/**
 * Reciprocal hreflang alternates for a content page that exists in all locales.
 * `slug` has no leading slash (e.g. 'plan-your-trip'); en lives at the root.
 */
export function pageAlternates(slug: string): { hreflang: string; href: string }[] {
  return [
    ...locales.map((l) => ({ hreflang: l, href: `${SITE}${localePrefix(l)}/${slug}` })),
    { hreflang: 'x-default', href: `${SITE}/${slug}` },
  ];
}

/**
 * hreflang alternates for a content page from the locales it actually exists in.
 * `available` lists the locales that have a translation (en included when present).
 * Returns [] when the page has no translation at all (an en-only page needs none).
 */
export function alternatesFor(slug: string, available: readonly Locale[]): { hreflang: string; href: string }[] {
  const present = locales.filter((l) => available.includes(l));
  if (present.length < 2) return [];
  const out: { hreflang: string; href: string }[] = present.map((l) => ({
    hreflang: l,
    href: `${SITE}${localePrefix(l)}/${slug}`,
  }));
  if (present.includes(defaultLocale)) out.push({ hreflang: 'x-default', href: `${SITE}/${slug}` });
  return out;
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
    'nav.hotelsEilat': 'Hotels in Eilat',
    'nav.masada': 'Masada: visiting & tours',
    'nav.bethlehem': 'Bethlehem from Jerusalem',
    'nav.petra': 'Petra from Israel',
    'nav.nazareth': 'Nazareth & Sea of Galilee',
    'nav.northCoast': 'Caesarea, Haifa & Akko day trip',
    'nav.foodTours': 'Tel Aviv food tours',
    'nav.packages': 'Multi-day tour packages',
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
      'An independent travel guide to Israel in five languages — regions, itineraries, hotel and tour guides with clearly disclosed booking links.',
    'footer.planning': 'Planning',
    'footer.stayTours': 'Stay & tours',
    'footer.about': 'About',
    'footer.copyright':
      'An independent travel guide. Photography by Pexels and Wikimedia Commons contributors, credited on every photo. This site contains affiliate links.',
    'photo.credit': 'Photo: {author} · {source} · {license}',
    'photo.creditsLink': 'Photo credits',
    'cta.flights': 'Flights',
    'cta.hotels': 'Hotels',
    'cta.tours': 'Tours',
    'cta.quickBooking': 'Quick booking',
    'cta.checkAvailability': 'Check availability',
    'card.explore': 'Explore',
    'card.bookNow': 'Book now',
    'card.livePrices': 'Live prices & reviews on {partner}',
    'card.via': 'via {partner}',
    'card.badge.tour': 'Tour',
    'card.badge.stay': 'Stay',
    'card.imgAlt': '{name}, Israel — {tagline}',
    'hotel.checkRates': 'Check rates & availability',
    'hotel.tier.luxury': 'Luxury',
    'hotel.tier.value': 'Best value',
    'hotel.tier.hostel': 'Hostel',
    'disclosure.compact': 'Affiliate link — we may earn a commission at no extra cost to you.',
    'disclosure.fullLabel': 'Affiliate disclosure:',
    'disclosure.full':
      'some links below are affiliate links. If you book through them we may earn a small commission at no extra cost to you. It helps keep this guide free.',
    'byline.by': 'By',
    'byline.updated': 'Last updated',
    'faq.title': 'Frequently asked questions',
    'bestTime.season': 'Season',
    'bestTime.verdict': 'Verdict',
    'bestTime.expect': 'What to expect',
    'bestTime.v.best': 'Best',
    'bestTime.v.great': 'Great',
    'bestTime.v.hot': 'Hot',
    'bestTime.v.warm': 'Warm',
    'bestTime.v.mild': 'Mild',
    'bestTime.v.cool': 'Cool',
    'bestTime.v.quiet': 'Quiet',
    'bestTime.v.extreme': 'Extreme',
    'bestTime.v.variable': 'Variable',
    'verdict.kicker': 'Tour verdict',
    'verdict.question': 'Is a guided tour of {name} worth it?',
    'verdict.badge': '✓ Worth it',
    'verdict.badgeLabel': 'Verdict: yes, worth booking',
    'verdict.reasonsLabel': 'Reasons to book a tour',
    'verdict.reason1': 'Transport, tickets and logistics all handled in one booking',
    'verdict.reason2': 'Expert local guide adds context that signage and apps can’t match',
    'verdict.reason3': 'Small groups let you ask questions and set the pace',
    'verdict.cta': 'See tours for {name}',
    'keyFacts.title': 'Know before you go',
    'a11y.breadcrumb': 'Breadcrumb',
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
    'nav.hotelsEilat': 'Hôtels à Eilat',
    'nav.masada': 'Massada : visite et circuits',
    'nav.bethlehem': 'Bethléem depuis Jérusalem',
    'nav.petra': 'Pétra depuis Israël',
    'nav.nazareth': 'Nazareth et lac de Tibériade',
    'nav.northCoast': 'Césarée, Haïfa et Acre en un jour',
    'nav.foodTours': 'Circuits gastronomiques à Tel Aviv',
    'nav.packages': 'Circuits de plusieurs jours',
    'plan.title': 'Organiser un voyage en Israël : guides et itinéraires',
    'plan.description':
      'Organiser un voyage en Israël au même endroit : guides pratiques, hôtels et circuits, itinéraires prêts à l’emploi et guides détaillés de 7 régions.',
    'plan.heroTitle': 'Préparez votre voyage',
    'plan.heroSubtitle': 'Guides pratiques, hébergement, circuits, itinéraires et 7 régions — commencez ici.',
    'plan.practicalHeading': 'Guides pratiques',
    'plan.stayHeading': 'Où dormir',
    'plan.toursHeading': 'Circuits & excursions',
    'plan.itinerariesHeading': 'Itinéraires',
    'plan.regionsHeading': 'Les 7 régions',
    'footer.tagline':
      'Un guide de voyage indépendant sur Israël en cinq langues — régions, itinéraires, guides des hôtels et circuits avec des liens de réservation clairement signalés.',
    'footer.planning': 'Préparer',
    'footer.stayTours': 'Hôtels & circuits',
    'footer.about': 'À propos',
    'footer.copyright':
      'Un guide de voyage indépendant. Photographies de contributeurs Pexels et Wikimedia Commons, créditées sur chaque photo. Ce site contient des liens d’affiliation.',
    'photo.credit': 'Photo : {author} · {source} · {license}',
    'photo.creditsLink': 'Crédits photo',
    'cta.flights': 'Vols',
    'cta.hotels': 'Hôtels',
    'cta.tours': 'Visites',
    'cta.quickBooking': 'Réservation rapide',
    'cta.checkAvailability': 'Voir les disponibilités',
    'card.explore': 'Découvrir',
    'card.bookNow': 'Réserver',
    'card.livePrices': 'Prix et avis en direct sur {partner}',
    'card.via': 'via {partner}',
    'card.badge.tour': 'Visite',
    'card.badge.stay': 'Hébergement',
    'card.imgAlt': '{name}, Israël — {tagline}',
    'hotel.checkRates': 'Voir les tarifs et disponibilités',
    'hotel.tier.luxury': 'Luxe',
    'hotel.tier.value': 'Bon rapport qualité-prix',
    'hotel.tier.hostel': 'Auberge de jeunesse',
    'disclosure.compact': 'Lien d’affiliation — nous pouvons toucher une commission, sans surcoût pour vous.',
    'disclosure.fullLabel': 'Transparence :',
    'disclosure.full':
      'certains liens ci-dessous sont des liens d’affiliation. Si vous réservez via ces liens, nous pouvons toucher une petite commission, sans surcoût pour vous. Cela nous aide à garder ce guide gratuit.',
    'byline.by': 'Par',
    'byline.updated': 'Dernière mise à jour le',
    'faq.title': 'Questions fréquentes',
    'bestTime.season': 'Saison',
    'bestTime.verdict': 'Verdict',
    'bestTime.expect': 'À quoi s’attendre',
    'bestTime.v.best': 'Idéal',
    'bestTime.v.great': 'Excellent',
    'bestTime.v.hot': 'Très chaud',
    'bestTime.v.warm': 'Chaud',
    'bestTime.v.mild': 'Doux',
    'bestTime.v.cool': 'Frais',
    'bestTime.v.quiet': 'Calme',
    'bestTime.v.extreme': 'Extrême',
    'bestTime.v.variable': 'Variable',
    'verdict.kicker': 'Notre verdict',
    'verdict.question': 'Une visite guidée de {name} vaut-elle le coup ?',
    'verdict.badge': '✓ Ça vaut le coup',
    'verdict.badgeLabel': 'Verdict : oui, à réserver',
    'verdict.reasonsLabel': 'Pourquoi réserver une visite',
    'verdict.reason1': 'Transport, billets et logistique réglés en une seule réservation',
    'verdict.reason2': 'Un guide local apporte un contexte que ni les panneaux ni les applis ne donnent',
    'verdict.reason3': 'Les petits groupes permettent de poser des questions et de choisir le rythme',
    'verdict.cta': 'Voir les visites à {name}',
    'keyFacts.title': 'À savoir avant de partir',
    'a11y.breadcrumb': 'Fil d’Ariane',
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
    'nav.hotelsEilat': 'Hotels in Eilat',
    'nav.masada': 'Masada: Besuch & Touren',
    'nav.bethlehem': 'Bethlehem ab Jerusalem',
    'nav.petra': 'Petra ab Israel',
    'nav.nazareth': 'Nazareth & See Genezareth',
    'nav.northCoast': 'Caesarea, Haifa & Akko Tagesausflug',
    'nav.foodTours': 'Food-Touren in Tel Aviv',
    'nav.packages': 'Mehrtägige Rundreisen',
    'plan.title': 'Israel-Reise planen: Reiseführer, Reiserouten & Regionen',
    'plan.description':
      'Israel-Reise planen an einem Ort: praktische Reiseführer, Hotels und Touren, fertige Reiserouten und ausführliche Guides zu 7 Regionen.',
    'plan.heroTitle': 'Planen Sie Ihre Reise',
    'plan.heroSubtitle': 'Praktische Reiseführer, Unterkünfte, Touren, Reiserouten und 7 Regionen — fangen Sie hier an.',
    'plan.practicalHeading': 'Praktische Reiseführer',
    'plan.stayHeading': 'Unterkunft',
    'plan.toursHeading': 'Touren & Tagesausflüge',
    'plan.itinerariesHeading': 'Reiserouten',
    'plan.regionsHeading': 'Die 7 Regionen',
    'footer.tagline':
      'Ein unabhängiger Reiseführer für Israel in fünf Sprachen — Regionen, Reiserouten, Hotel- und Tourguides mit klar gekennzeichneten Buchungslinks.',
    'footer.planning': 'Planung',
    'footer.stayTours': 'Hotels & Touren',
    'footer.about': 'Über uns',
    'footer.copyright':
      'Ein unabhängiger Reiseführer. Fotos von Pexels- und Wikimedia-Commons-Fotografen, bei jedem Foto genannt. Diese Website enthält Affiliate-Links.',
    'photo.credit': 'Foto: {author} · {source} · {license}',
    'photo.creditsLink': 'Bildnachweise',
    'cta.flights': 'Flüge',
    'cta.hotels': 'Hotels',
    'cta.tours': 'Touren',
    'cta.quickBooking': 'Schnellbuchung',
    'cta.checkAvailability': 'Verfügbarkeit prüfen',
    'card.explore': 'Entdecken',
    'card.bookNow': 'Jetzt buchen',
    'card.livePrices': 'Aktuelle Preise & Bewertungen auf {partner}',
    'card.via': 'über {partner}',
    'card.badge.tour': 'Tour',
    'card.badge.stay': 'Unterkunft',
    'card.imgAlt': '{name}, Israel — {tagline}',
    'hotel.checkRates': 'Preise & Verfügbarkeit prüfen',
    'hotel.tier.luxury': 'Luxus',
    'hotel.tier.value': 'Preis-Leistung',
    'hotel.tier.hostel': 'Hostel',
    'disclosure.compact': 'Affiliate-Link — wir erhalten ggf. eine Provision, ohne Mehrkosten für Sie.',
    'disclosure.fullLabel': 'Hinweis zu Affiliate-Links:',
    'disclosure.full':
      'einige der folgenden Links sind Affiliate-Links. Wenn Sie darüber buchen, erhalten wir ggf. eine kleine Provision — ohne Mehrkosten für Sie. Das hilft, diesen Reiseführer kostenlos zu halten.',
    'byline.by': 'Von',
    'byline.updated': 'Zuletzt aktualisiert am',
    'faq.title': 'Häufige Fragen',
    'bestTime.season': 'Jahreszeit',
    'bestTime.verdict': 'Fazit',
    'bestTime.expect': 'Was Sie erwartet',
    'bestTime.v.best': 'Ideal',
    'bestTime.v.great': 'Sehr gut',
    'bestTime.v.hot': 'Heiß',
    'bestTime.v.warm': 'Warm',
    'bestTime.v.mild': 'Mild',
    'bestTime.v.cool': 'Kühl',
    'bestTime.v.quiet': 'Ruhig',
    'bestTime.v.extreme': 'Extrem',
    'bestTime.v.variable': 'Wechselhaft',
    'verdict.kicker': 'Unser Fazit',
    'verdict.question': 'Lohnt sich eine geführte Tour in {name}?',
    'verdict.badge': '✓ Lohnt sich',
    'verdict.badgeLabel': 'Fazit: ja, buchenswert',
    'verdict.reasonsLabel': 'Gründe für eine Tour',
    'verdict.reason1': 'Transport, Tickets und Logistik in einer einzigen Buchung',
    'verdict.reason2': 'Ein lokaler Guide liefert Hintergründe, die Schilder und Apps nicht bieten',
    'verdict.reason3': 'Kleine Gruppen lassen Raum für Fragen und ein eigenes Tempo',
    'verdict.cta': 'Touren in {name} ansehen',
    'keyFacts.title': 'Gut zu wissen',
    'a11y.breadcrumb': 'Brotkrumennavigation',
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
    'nav.hotelsEilat': 'Hoteles en Eilat',
    'nav.masada': 'Masada: visita y tours',
    'nav.bethlehem': 'Belén desde Jerusalén',
    'nav.petra': 'Petra desde Israel',
    'nav.nazareth': 'Nazaret y Mar de Galilea',
    'nav.northCoast': 'Cesarea, Haifa y Acre en un día',
    'nav.foodTours': 'Tours gastronómicos en Tel Aviv',
    'nav.packages': 'Circuitos de varios días',
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
      'Una guía de viaje independiente sobre Israel en cinco idiomas — regiones, itinerarios, guías de hoteles y tours con enlaces de reserva claramente señalados.',
    'footer.planning': 'Planificar',
    'footer.stayTours': 'Hoteles y tours',
    'footer.about': 'Acerca de',
    'footer.copyright':
      'Una guía de viaje independiente. Fotografías de colaboradores de Pexels y Wikimedia Commons, acreditadas en cada foto. Este sitio contiene enlaces de afiliados.',
    'photo.credit': 'Foto: {author} · {source} · {license}',
    'photo.creditsLink': 'Créditos fotográficos',
    'cta.flights': 'Vuelos',
    'cta.hotels': 'Hoteles',
    'cta.tours': 'Tours',
    'cta.quickBooking': 'Reserva rápida',
    'cta.checkAvailability': 'Ver disponibilidad',
    'card.explore': 'Explorar',
    'card.bookNow': 'Reservar',
    'card.livePrices': 'Precios y opiniones actualizados en {partner}',
    'card.via': 'a través de {partner}',
    'card.badge.tour': 'Tour',
    'card.badge.stay': 'Alojamiento',
    'card.imgAlt': '{name}, Israel — {tagline}',
    'hotel.checkRates': 'Ver precios y disponibilidad',
    'hotel.tier.luxury': 'Lujo',
    'hotel.tier.value': 'Mejor relación calidad-precio',
    'hotel.tier.hostel': 'Hostal',
    'disclosure.compact': 'Enlace de afiliado: podemos recibir una comisión sin coste adicional para ti.',
    'disclosure.fullLabel': 'Aviso de afiliados:',
    'disclosure.full':
      'algunos de los enlaces de abajo son enlaces de afiliado. Si reservas a través de ellos, podemos recibir una pequeña comisión sin coste adicional para ti. Ayuda a mantener esta guía gratuita.',
    'byline.by': 'Por',
    'byline.updated': 'Actualizado el',
    'faq.title': 'Preguntas frecuentes',
    'bestTime.season': 'Temporada',
    'bestTime.verdict': 'Veredicto',
    'bestTime.expect': 'Qué esperar',
    'bestTime.v.best': 'Ideal',
    'bestTime.v.great': 'Muy buena',
    'bestTime.v.hot': 'Calor',
    'bestTime.v.warm': 'Cálida',
    'bestTime.v.mild': 'Suave',
    'bestTime.v.cool': 'Fresca',
    'bestTime.v.quiet': 'Tranquila',
    'bestTime.v.extreme': 'Extrema',
    'bestTime.v.variable': 'Variable',
    'verdict.kicker': 'Nuestro veredicto',
    'verdict.question': '¿Merece la pena un tour guiado por {name}?',
    'verdict.badge': '✓ Merece la pena',
    'verdict.badgeLabel': 'Veredicto: sí, merece la pena reservar',
    'verdict.reasonsLabel': 'Razones para reservar un tour',
    'verdict.reason1': 'Transporte, entradas y logística resueltos en una sola reserva',
    'verdict.reason2': 'Un guía local aporta un contexto que los carteles y las apps no dan',
    'verdict.reason3': 'Los grupos pequeños permiten preguntar y marcar el ritmo',
    'verdict.cta': 'Ver tours en {name}',
    'keyFacts.title': 'Antes de ir',
    'a11y.breadcrumb': 'Ruta de navegación',
    'a11y.skipToContent': 'Ir al contenido',
  },
  he: {
    'home.heroTitle': 'לבקר בישראל',
    'home.heroSubtitle':
      'מדריך עצמאי ל-7 אזורים — מירושלים ועד ים סוף — עם מסלולי טיול, מדריכי מלונות וקישורי הזמנה אמינים.',
    'home.regionsHeading': 'גלו את האזורים',
    'home.planHeading': 'תכננו את הטיול',
    'nav.regions': 'אזורים',
    'nav.itineraries': 'מסלולי טיול',
    'nav.plan': 'תכנון הטיול',
    'nav.planShort': 'תכנון',
    'nav.search': 'חיפוש',
    'nav.openMenu': 'פתיחת תפריט',
    'nav.language': 'שפה',
    'nav.home': 'דף הבית',
    'nav.firstTime': 'פעם ראשונה בישראל',
    'nav.visa': 'ויזה ו-ETA',
    'nav.bestTime': 'מתי כדאי לבקר',
    'nav.safety': 'האם בטוח לטייל בישראל?',
    'nav.carRental': 'השכרת רכב',
    'nav.hotelsJerusalem': 'מלונות בירושלים',
    'nav.hotelsTelAviv': 'מלונות בתל אביב',
    'nav.hotelsDeadSea': 'מלונות בים המלח',
    'nav.toursJerusalem': 'סיורים בירושלים',
    'nav.toursDeadSea': 'סיורים לים המלח ומצדה',
    'nav.dayTripsTelAviv': 'טיולי יום מתל אביב',
    'nav.hotelsEilat': 'מלונות באילת',
    'nav.masada': 'מצדה: ביקור וסיורים',
    'nav.bethlehem': 'בית לחם מירושלים',
    'nav.petra': 'פטרה מישראל',
    'nav.nazareth': 'נצרת והכנרת',
    'nav.northCoast': 'קיסריה, חיפה ועכו ביום אחד',
    'nav.foodTours': 'סיורי אוכל בתל אביב',
    'nav.packages': 'חבילות טיול של כמה ימים',
    'plan.title': 'תכנון טיול בישראל: מדריכים, מסלולים ואזורים',
    'plan.description':
      'כל מה שצריך לתכנון טיול בישראל במקום אחד: מדריכים מעשיים, מדריכי מלונות וסיורים, מסלולי טיול מוכנים ומדריכים מעמיקים ל-7 אזורים.',
    'plan.heroTitle': 'תכננו את הטיול',
    'plan.heroSubtitle': 'מדריכים מעשיים, איפה לישון, סיורים, מסלולי טיול ו-7 אזורים — מתחילים כאן.',
    'plan.practicalHeading': 'מדריכים מעשיים',
    'plan.stayHeading': 'איפה לישון',
    'plan.toursHeading': 'סיורים וטיולי יום',
    'plan.itinerariesHeading': 'מסלולי טיול',
    'plan.regionsHeading': '7 האזורים',
    'footer.tagline':
      'מדריך טיולים עצמאי לישראל בחמש שפות — אזורים, מסלולי טיול, מדריכי מלונות וסיורים, עם קישורי הזמנה מסומנים בבירור.',
    'footer.planning': 'תכנון',
    'footer.stayTours': 'לינה וסיורים',
    'footer.about': 'אודות',
    'footer.copyright':
      'מדריך טיולים עצמאי. צילומים של צלמי Pexels ו-Wikimedia Commons, עם קרדיט על כל תמונה. האתר מכיל קישורי שותפים (אפיליאציה).',
    'photo.credit': 'צילום: {author} · {source} · {license}',
    'photo.creditsLink': 'קרדיט לצילומים',
    'cta.flights': 'טיסות',
    'cta.hotels': 'מלונות',
    'cta.tours': 'סיורים',
    'cta.quickBooking': 'הזמנה מהירה',
    'cta.checkAvailability': 'בדיקת זמינות',
    'card.explore': 'גלו עוד',
    'card.bookNow': 'הזמינו עכשיו',
    'card.livePrices': 'מחירים וביקורות עדכניים באתר {partner}',
    'card.via': 'דרך {partner}',
    'card.badge.tour': 'סיור',
    'card.badge.stay': 'לינה',
    'card.imgAlt': '{name}, ישראל — {tagline}',
    'hotel.checkRates': 'בדיקת מחירים וזמינות',
    'hotel.tier.luxury': 'יוקרה',
    'hotel.tier.value': 'משתלם',
    'hotel.tier.hostel': 'הוסטל',
    'disclosure.compact': 'קישור שותפים — ייתכן שנקבל עמלה, ללא עלות נוספת עבורכם.',
    'disclosure.fullLabel': 'גילוי נאות:',
    'disclosure.full':
      'חלק מהקישורים בהמשך הם קישורי שותפים. אם תזמינו דרכם, ייתכן שנקבל עמלה קטנה, ללא עלות נוספת עבורכם. זה עוזר לנו להשאיר את המדריך חינמי.',
    'byline.by': 'מאת',
    'byline.updated': 'עודכן לאחרונה:',
    'faq.title': 'שאלות נפוצות',
    'bestTime.season': 'עונה',
    'bestTime.verdict': 'השורה התחתונה',
    'bestTime.expect': 'למה לצפות',
    'bestTime.v.best': 'מומלץ',
    'bestTime.v.great': 'מצוין',
    'bestTime.v.hot': 'חם',
    'bestTime.v.warm': 'חמים',
    'bestTime.v.mild': 'נעים',
    'bestTime.v.cool': 'קריר',
    'bestTime.v.quiet': 'שקט',
    'bestTime.v.extreme': 'חום קיצוני',
    'bestTime.v.variable': 'משתנה',
    'verdict.kicker': 'השורה התחתונה',
    'verdict.question': 'האם שווה לקחת סיור מודרך ב{name}?',
    'verdict.badge': '✓ שווה',
    'verdict.badgeLabel': 'השורה התחתונה: כן, שווה להזמין',
    'verdict.reasonsLabel': 'למה כדאי להזמין סיור',
    'verdict.reason1': 'הסעות, כרטיסים ולוגיסטיקה — הכול בהזמנה אחת',
    'verdict.reason2': 'מדריך מקומי נותן הקשר שאף שלט או אפליקציה לא יספקו',
    'verdict.reason3': 'קבוצות קטנות מאפשרות לשאול שאלות ולקבוע את הקצב',
    'verdict.cta': 'לסיורים ב{name}',
    'keyFacts.title': 'כדאי לדעת לפני שיוצאים',
    'a11y.breadcrumb': 'ניווט',
    'a11y.skipToContent': 'דילוג לתוכן',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];

/** Returns a t(key) bound to the given locale, falling back to English. */
export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key] ?? ui.en[key] ?? key;
}

/** Fills `{name}`-style placeholders in a UI string: fill('via {partner}', { partner: 'Booking.com' }). */
export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);
}

/** BCP-47 tag per locale for Intl formatting (dates, numbers). */
export const intlLocale: Record<Locale, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  he: 'he-IL',
};

/**
 * The site's page groups (the v3 taxonomy), shared by the header, footer, home and
 * plan-your-trip hub so every navigation surface lists the same, existing pages.
 * Paths have no locale prefix; every page exists in all locales.
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
    { slug: 'eilat-hotels-guide', key: 'nav.hotelsEilat' },
  ],
  tours: [
    { slug: 'jerusalem-tours-compared', key: 'nav.toursJerusalem' },
    { slug: 'dead-sea-tours-compared', key: 'nav.toursDeadSea' },
    { slug: 'day-trips-from-tel-aviv', key: 'nav.dayTripsTelAviv' },
    { slug: 'masada-visitor-guide', key: 'nav.masada' },
    { slug: 'jerusalem-bethlehem-day-trip', key: 'nav.bethlehem' },
    { slug: 'petra-from-israel', key: 'nav.petra' },
    { slug: 'nazareth-sea-of-galilee-day-trip', key: 'nav.nazareth' },
    { slug: 'caesarea-haifa-akko-day-trip', key: 'nav.northCoast' },
    { slug: 'tel-aviv-food-tours', key: 'nav.foodTours' },
    { slug: 'israel-tour-packages', key: 'nav.packages' },
  ],
} as const satisfies Record<string, readonly { slug: string; key: UiKey }[]>;
