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

const attractions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/attractions' }),
  schema: z.object({
    ...base,
    parentRegion: z.string().optional(),
    religiousSiteId: z.string().optional(),
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

export const collections = { regions, attractions, itineraries, legal };
