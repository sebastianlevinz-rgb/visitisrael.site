import { defineConfig, defineCollection, s } from 'velite';

/**
 * Conflict A (locked):
 *   Velite `lang` enum accepts the FILESYSTEM-READY superset (he/en/fr).
 *   `i18n-config.locales` registers only ['he','en'] at launch.
 *   Adding FR later = no schema change.
 *
 * SEO-05 enforcement:
 *   - title: max 70 chars (matches plan VALIDATION row)
 *   - description: 120-160 chars (Google snippet sweet spot)
 */

const baseFrontmatter = {
  lang: s.enum(['he', 'en', 'fr']),
  title: s.string().max(70),
  description: s.string().min(120).max(160),
  slug: s.string().min(1),
  publishedAt: s.isodate().optional(),
  updatedAt: s.isodate().optional(),
};

const regions = defineCollection({
  name: 'Region',
  pattern: '{he,en,fr}/regions/**/*.mdx',
  schema: s
    .object({
      ...baseFrontmatter,
      region: s.string().min(1),
    })
    .transform((data, { meta }) => ({
      ...data,
      // Strip the locale dir prefix so we get region/<slug>
      path: meta.path,
    })),
});

const subDestinations = defineCollection({
  name: 'SubDestination',
  pattern: '{he,en,fr}/sub-destinations/**/*.mdx',
  schema: s.object({
    ...baseFrontmatter,
    region: s.string().min(1),
    parentRegion: s.string().min(1),
  }),
});

const guides = defineCollection({
  name: 'Guide',
  pattern: '{he,en,fr}/guides/**/*.mdx',
  schema: s.object({
    ...baseFrontmatter,
    topic: s.string().min(1),
  }),
});

const legal = defineCollection({
  name: 'Legal',
  pattern: '{he,en,fr}/legal/**/*.mdx',
  schema: s.object({
    ...baseFrontmatter,
    page: s.string().min(1),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:8].[ext]',
    clean: true,
  },
  collections: { regions, subDestinations, guides, legal },
});
