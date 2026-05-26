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
    publisher: {
      '@type': 'Organization',
      name: 'Visit Israel',
      url: SITE,
    },
    ...(opts.datePublished ? { datePublished: opts.datePublished.toISOString() } : {}),
    dateModified: (opts.dateModified ?? new Date()).toISOString(),
  };
}

export interface HotelRef {
  name: string;
  url: string;
  rating?: number;
  priceRange?: string;
}

export function hotelList(hotels: HotelRef[], regionName: string) {
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
        ...(h.rating
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: h.rating,
                bestRating: 5,
              },
            }
          : {}),
        address: { '@type': 'PostalAddress', addressLocality: regionName, addressCountry: 'IL' },
      },
    })),
  };
}
