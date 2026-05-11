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

/**
 * FAQ entry — used by FAQPage JSON-LD generator. Velite consumes from
 * MDX frontmatter as an array of {question, answer} pairs.
 */
const faqEntry = s.object({
  question: s.string().min(5),
  answer: s.string().min(10),
});

const regions = defineCollection({
  name: 'Region',
  pattern: '{he,en,fr}/regions/**/*.mdx',
  schema: s
    .object({
      ...baseFrontmatter,
      region: s.string().min(1),
      heroImage: s.string().min(1),
      primaryKeyword: s.string().optional(),
      secondaryKeywords: s.array(s.string()).optional(),
      latitude: s.number().optional(),
      longitude: s.number().optional(),
      faqs: s.array(faqEntry).min(5).max(10).optional(),
      // Velite compiles MDX body to function-body JS string for runtime eval.
      body: s.mdx(),
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
    heroImage: s.string().min(1),
    primaryKeyword: s.string().optional(),
    secondaryKeywords: s.array(s.string()).optional(),
    latitude: s.number().optional(),
    longitude: s.number().optional(),
    // Religious-site marker: when set, the [subdest] renderer ALSO emits
    // PlaceOfWorship / Place schema in addition to TouristAttraction.
    // Value is a religious-sites.json key (e.g. "western-wall", "holy-sepulchre").
    religiousSiteId: s.string().optional(),
    // Optional FAQ block — sub-destinations may carry 3-7 Q&A pairs.
    faqs: s.array(faqEntry).min(3).max(10).optional(),
    // Velite compiles MDX body to function-body JS string for runtime eval.
    body: s.mdx(),
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

/**
 * Itinerary stop — schema-driven entry for a single attraction/location
 * surfaced inside an itinerary. Drives TouristTrip.itinerary[]
 * (TouristAttraction sub-nodes) at schema-emission time.
 *
 * `slug` — short slug under the parent region (e.g. "western-wall")
 *           that the renderer joins with the parent region to
 *           construct the canonical `/jerusalem/western-wall/` link.
 * `day`  — 1-indexed day number (1..durationDays).
 * `period` — morning / afternoon / evening (or "all-day" for day-trip).
 */
const itineraryStop = s.object({
  slug: s.string().min(1),
  day: s.number().int().positive(),
  period: s.enum(['morning', 'afternoon', 'evening', 'all-day']),
});

const itineraries = defineCollection({
  name: 'Itinerary',
  pattern: '{he,en,fr}/itineraries/**/*.mdx',
  schema: s.object({
    ...baseFrontmatter,
    /** Total days covered (1..N). Drives TouristTrip duration property. */
    durationDays: s.number().int().positive(),
    /** Regions referenced. First entry is the canonical starting region. */
    regions: s.array(s.string()).min(1),
    /** Primary starting region (must be in `regions`). */
    startRegion: s.string().min(1),
    /** Hero image (≥1200px wide; Sharp gate enforces). */
    heroImage: s.string().min(1),
    primaryKeyword: s.string().optional(),
    secondaryKeywords: s.array(s.string()).optional(),
    /** Stops the itinerary visits — drives TouristTrip.itinerary[]. */
    stops: s.array(itineraryStop).min(1),
    /** Optional FAQ block. */
    faqs: s.array(faqEntry).min(3).max(10).optional(),
    body: s.mdx(),
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
  collections: { regions, subDestinations, guides, legal, itineraries },
});
