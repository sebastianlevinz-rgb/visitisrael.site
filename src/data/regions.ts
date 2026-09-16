/**
 * The 7 Israel regions — single source for the home grid and primary nav.
 * Each region's hero lives at /images/regions/<slug>/hero.jpg
 * (real, free-licensed photography sourced via scripts/photos/fetch-commons.mjs).
 *
 * `names`, `taglines` and `blurbs` carry all five locales. `name`, `tagline` and
 * `blurb` are the English copies kept for older consumers (header, footer,
 * RegionPage, 404): new code should call regionName / regionTagline / regionBlurb.
 */
import type { Locale } from '@/i18n/ui';

export type Localized = Record<Locale, string>;

export interface Region {
  slug: string;
  /** English name (alias of names.en). */
  name: string;
  /** English tagline (alias of taglines.en). */
  tagline: string;
  /** English blurb (alias of blurbs.en). */
  blurb: string;
  names: Localized;
  taglines: Localized;
  blurbs: Localized;
  hero: string;
}

interface RegionSeed {
  slug: string;
  names: Localized;
  taglines: Localized;
  blurbs: Localized;
}

const region = (seed: RegionSeed): Region => ({
  ...seed,
  name: seed.names.en,
  tagline: seed.taglines.en,
  blurb: seed.blurbs.en,
  hero: `/images/regions/${seed.slug}/hero.jpg`,
});

export const REGIONS: Region[] = [
  region({
    slug: 'jerusalem',
    names: { en: 'Jerusalem', fr: 'Jérusalem', de: 'Jerusalem', es: 'Jerusalén', he: 'ירושלים' },
    taglines: {
      en: "Israel's spiritual heart",
      fr: 'Le cœur spirituel d’Israël',
      de: 'Das spirituelle Herz Israels',
      es: 'El corazón espiritual de Israel',
      he: 'הלב הרוחני של ישראל',
    },
    blurbs: {
      en: 'Old City quarters, the Western Wall and the Church of the Holy Sepulchre, with day trips to the Dead Sea.',
      fr: 'Les quartiers de la Vieille Ville, le mur des Lamentations et le Saint-Sépulcre, avec des excursions vers la mer Morte.',
      de: 'Die Viertel der Altstadt, die Klagemauer und die Grabeskirche, dazu Tagesausflüge ans Tote Meer.',
      es: 'Los barrios de la Ciudad Vieja, el Muro de las Lamentaciones y el Santo Sepulcro, con excursiones al Mar Muerto.',
      he: 'רובעי העיר העתיקה, הכותל המערבי וכנסיית הקבר, עם טיולי יום לים המלח.',
    },
  }),
  region({
    slug: 'tel-aviv',
    names: { en: 'Tel Aviv', fr: 'Tel Aviv', de: 'Tel Aviv', es: 'Tel Aviv', he: 'תל אביב' },
    taglines: {
      en: 'Mediterranean cool',
      fr: 'L’esprit méditerranéen',
      de: 'Mediterrane Lässigkeit',
      es: 'Estilo mediterráneo',
      he: 'שיק ים תיכוני',
    },
    blurbs: {
      en: 'Golden beaches, Bauhaus architecture and a 24-hour food, art and nightlife scene.',
      fr: 'Plages dorées, architecture Bauhaus et une scène gastronomique, artistique et nocturne qui ne s’arrête jamais.',
      de: 'Goldene Strände, Bauhaus-Architektur und eine Food-, Kunst- und Nachtszene rund um die Uhr.',
      es: 'Playas doradas, arquitectura Bauhaus y una escena gastronómica, artística y nocturna que no para.',
      he: 'חופים זהובים, אדריכלות באוהאוס וסצנת אוכל, אמנות וחיי לילה שלא נעצרת.',
    },
  }),
  region({
    slug: 'dead-sea',
    names: { en: 'Dead Sea', fr: 'Mer Morte', de: 'Totes Meer', es: 'Mar Muerto', he: 'ים המלח' },
    taglines: {
      en: 'The lowest place on Earth',
      fr: 'Le point le plus bas de la Terre',
      de: 'Der tiefste Punkt der Erde',
      es: 'El punto más bajo de la Tierra',
      he: 'המקום הנמוך בעולם',
    },
    blurbs: {
      en: 'Float on mineral-rich water, climb Masada at sunrise and hike the Ein Gedi oasis.',
      fr: 'Flottez sur une eau riche en minéraux, grimpez à Massada au lever du soleil et randonnez dans l’oasis d’Ein Gedi.',
      de: 'Auf mineralreichem Wasser treiben, bei Sonnenaufgang auf Masada steigen und durch die Oase Ein Gedi wandern.',
      es: 'Flota en aguas ricas en minerales, sube a Masada al amanecer y recorre el oasis de Ein Gedi.',
      he: 'לצוף במים עשירים במינרלים, לטפס למצדה בזריחה ולטייל בנווה המדבר עין גדי.',
    },
  }),
  region({
    slug: 'galilee',
    names: { en: 'Galilee', fr: 'Galilée', de: 'Galiläa', es: 'Galilea', he: 'הגליל' },
    taglines: {
      en: 'Green hills and holy water',
      fr: 'Collines vertes et eaux sacrées',
      de: 'Grüne Hügel und heiliges Wasser',
      es: 'Colinas verdes y aguas sagradas',
      he: 'גבעות ירוקות ומים קדושים',
    },
    blurbs: {
      en: 'The Sea of Galilee, Christian pilgrimage routes, hilltop Tzfat and boutique wineries.',
      fr: 'Le lac de Tibériade, les routes de pèlerinage chrétiennes, Safed perchée sur sa colline et des caves boutique.',
      de: 'Der See Genezareth, christliche Pilgerwege, das Bergstädtchen Safed und kleine Boutique-Weingüter.',
      es: 'El mar de Galilea, rutas de peregrinación cristiana, Safed en lo alto de la colina y bodegas boutique.',
      he: 'הכינרת, מסלולי עלייה לרגל נוצריים, צפת שעל ההר ויקבי בוטיק.',
    },
  }),
  region({
    slug: 'eilat',
    names: { en: 'Eilat', fr: 'Eilat', de: 'Eilat', es: 'Eilat', he: 'אילת' },
    taglines: {
      en: 'Red Sea sunshine',
      fr: 'Le soleil de la mer Rouge',
      de: 'Sonne am Roten Meer',
      es: 'Sol del mar Rojo',
      he: 'שמש על ים סוף',
    },
    blurbs: {
      en: 'Coral-reef diving, year-round sun and a launchpad for day trips to Petra.',
      fr: 'Plongée sur les récifs coralliens, soleil toute l’année et point de départ pour une journée à Pétra.',
      de: 'Tauchen am Korallenriff, Sonne das ganze Jahr und Ausgangspunkt für Tagesausflüge nach Petra.',
      es: 'Buceo en arrecifes de coral, sol todo el año y punto de partida para excursiones a Petra.',
      he: 'צלילה בשונית האלמוגים, שמש כל השנה ונקודת זינוק לטיולי יום לפטרה.',
    },
  }),
  region({
    slug: 'negev',
    names: { en: 'Negev', fr: 'Néguev', de: 'Negev', es: 'Néguev', he: 'הנגב' },
    taglines: {
      en: 'Desert and stars',
      fr: 'Désert et étoiles',
      de: 'Wüste und Sterne',
      es: 'Desierto y estrellas',
      he: 'מדבר וכוכבים',
    },
    blurbs: {
      en: 'The Makhtesh Ramon crater, Bedouin hospitality and ancient Nabatean trade routes.',
      fr: 'Le cratère de Makhtesh Ramon, l’hospitalité bédouine et les anciennes routes commerciales nabatéennes.',
      de: 'Der Makhtesh-Ramon-Krater, beduinische Gastfreundschaft und alte nabatäische Handelsrouten.',
      es: 'El cráter Majtesh Ramón, la hospitalidad beduina y las antiguas rutas comerciales nabateas.',
      he: 'מכתש רמון, הכנסת אורחים בדואית ודרכי המסחר הנבטיות העתיקות.',
    },
  }),
  region({
    slug: 'haifa',
    names: { en: 'Haifa', fr: 'Haïfa', de: 'Haifa', es: 'Haifa', he: 'חיפה' },
    taglines: {
      en: 'Gardens on the sea',
      fr: 'Des jardins face à la mer',
      de: 'Gärten am Meer',
      es: 'Jardines frente al mar',
      he: 'גנים מול הים',
    },
    blurbs: {
      en: 'The terraced Bahá’í Gardens, the German Colony and the green slopes of Mount Carmel.',
      fr: 'Les jardins bahá’ís en terrasses, la Colonie allemande et les pentes vertes du mont Carmel.',
      de: 'Die terrassierten Bahá’í-Gärten, die Deutsche Kolonie und die grünen Hänge des Karmel.',
      es: 'Los jardines bahá’ís en terrazas, la Colonia Alemana y las laderas verdes del monte Carmelo.',
      he: 'הגנים הבהאיים המדורגים, המושבה הגרמנית ומדרונות הכרמל הירוקים.',
    },
  }),
];

export const getRegion = (slug: string): Region | undefined =>
  REGIONS.find((r) => r.slug === slug);

/** Region name in a locale (falls back to English). */
export const regionName = (r: Region, locale: Locale): string => r.names[locale] ?? r.names.en;
/** Region tagline in a locale (falls back to English). */
export const regionTagline = (r: Region, locale: Locale): string => r.taglines[locale] ?? r.taglines.en;
/** Region blurb in a locale (falls back to English). */
export const regionBlurb = (r: Region, locale: Locale): string => r.blurbs[locale] ?? r.blurbs.en;
