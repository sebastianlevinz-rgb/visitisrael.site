/**
 * JSON-LD schema builders. Each returns a plain object rendered by
 * <JsonLd> into a <script type="application/ld+json">.
 */
export const SITE = 'https://visitisrael.site';
const abs = (path: string) =>
  path.startsWith('http') ? path : `${SITE}${path.startsWith('/') ? '' : '/'}${path}`;

export interface Faq {
  question: string;
  answer: string;
}

/** Stable @id for the publisher entity — referenced from Article publisher. */
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
const LOGO = abs('/logo.png');

/** Publisher entity. Emit once sitewide; reference elsewhere via {'@id': ORG_ID}. */
export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Visit Israel',
    url: SITE,
    logo: {
      '@type': 'ImageObject',
      url: LOGO,
      width: 512,
      height: 512,
    },
    description:
      'An independent English-language travel guide to Israel — regions, attractions, itineraries and trusted booking links.',
    sameAs: [],
  };
}

/** WebSite entity with SearchAction. Emit once sitewide. */
export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Visit Israel',
    url: SITE,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

interface PlaceOpts {
  type: 'TouristDestination' | 'TouristAttraction' | 'LandmarksOrHistoricalBuildings';
  name: string;
  description: string;
  image: string;
  path: string;
  latitude?: number;
  longitude?: number;
}

export function place(opts: PlaceOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type,
    name: opts.name,
    description: opts.description,
    image: abs(opts.image),
    url: abs(opts.path),
    ...(opts.latitude && opts.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: opts.latitude,
            longitude: opts.longitude,
          },
        }
      : {}),
    address: { '@type': 'PostalAddress', addressCountry: 'IL' },
  };
}

interface ArticleOpts {
  headline: string;
  description: string;
  image: string;
  path: string;
  authorName: string;
  authorUrl: string;
  datePublished?: Date;
  dateModified?: Date;
}

export function article(opts: ArticleOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    image: abs(opts.image),
    mainEntityOfPage: abs(opts.path),
    author: { '@type': 'Person', name: opts.authorName, url: abs(opts.authorUrl) },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    ...(opts.datePublished ? { datePublished: opts.datePublished.toISOString() } : {}),
    dateModified: (opts.dateModified ?? new Date()).toISOString(),
  };
}

export interface EventSchemaOpts {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  locationLocality: string;
  url?: string;
}

export function eventSchema(opts: EventSchemaOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: opts.name,
    description: opts.description,
    startDate: opts.startDate,
    ...(opts.endDate ? { endDate: opts.endDate } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: opts.locationName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: opts.locationLocality,
        addressCountry: 'IL',
      },
    },
    ...(opts.url ? { url: abs(opts.url) } : {}),
    organizer: { '@id': ORG_ID },
  };
}

export interface HotelRef {
  name: string;
  url: string;
  priceRange?: string;
}

export function hotelList(hotels: HotelRef[], regionName: string) {
  // NOTE: no aggregateRating — we don't host our own hotel reviews, so emitting
  // a ratingValue would be a fabricated, self-serving rating (Google policy
  // violation). Ratings live on the partner (Booking.com) page we link to.
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Where to stay in ${regionName}`,
    itemListElement: hotels.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Hotel',
        name: h.name,
        ...(h.priceRange ? { priceRange: h.priceRange } : {}),
        address: { '@type': 'PostalAddress', addressLocality: regionName, addressCountry: 'IL' },
      },
    })),
  };
}
