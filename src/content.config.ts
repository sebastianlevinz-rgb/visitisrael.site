import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = z.object({ question: z.string(), answer: z.string() });

// Shared fields across region + attraction content.
const base = {
  title: z.string(),
  description: z.string(),
  slug: z.string().optional(),
  region: z.string(),
  heroImage: z.string(),
  tagline: z.string().optional(),
  lang: z.string().optional(),
  primaryKeyword: z.string().optional(),
  secondaryKeywords: z.array(z.string()).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  faqs: z.array(faq).optional(),
  gallery: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
};

const regions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/regions' }),
  schema: z.object(base),
});

const ticketInfo = z.object({
  freeEntry: z.boolean().optional(),
  priceRange: z.string().optional(),
  bookingRecommended: z.boolean().optional(),
  bookingRequired: z.boolean().optional(),
  tipText: z.string(),
  tiqetsQuery: z.string().optional(),
  gygTicketsQuery: z.string().optional(),
});

const attractions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/attractions' }),
  schema: z.object({
    ...base,
    parentRegion: z.string().optional(),
    religiousSiteId: z.string().optional(),
    ticketInfo: ticketInfo.optional(),
  }),
});

const itineraries = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/itineraries' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    days: z.number().optional(),
    heroImage: z.string().optional(),
    lang: z.string().optional(),
    startRegion: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    faqs: z.array(faq).optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lang: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const affiliateCta = z.object({
  partner: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  query: z.string().optional(),
  destination: z.string().optional(),
  priceFrom: z.number().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  cta: z.string().optional(),
});

const guideEvent = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  locationName: z.string(),
  locationLocality: z.string(),
  url: z.string().optional(),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    category: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
    faqs: z.array(faq).optional(),
    // Money-page CTA cards rendered by the guide template from central config.
    ctaHeading: z.string().optional(),
    affiliateCtas: z.array(affiliateCta).optional(),
    // "Is a guided tour worth it?" verdict box.
    verdictName: z.string().optional(),
    verdictQuery: z.string().optional(),
    // Event schema for pages with schedulable annual experiences.
    events: z.array(guideEvent).optional(),
  }),
});

export const collections = { regions, attractions, itineraries, legal, guides };
