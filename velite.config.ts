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
    // Phase 2 plan 05: legal pages render their bodies (about/contact/
    // privacy/affiliate-disclosure are prose-driven; accessibility-statement
    // is prose + frontmatter-driven coordinator block). Velite compiles the
    // MDX body to a function-body string that `<MDXContent>` evaluates with
    // the shared mdxComponents map.
    body: s.mdx(),
    // A11Y-04 / IS 5568 — accessibility-statement.mdx ships a named
    // coordinator (real name + reachable phone + monitored email) plus a
    // last_audit_date within the last 90 days. The fields are declared as
    // optional so the other 4 legal pages (about/contact/privacy/
    // affiliate-disclosure) don't have to carry them, but when present
    // they survive Velite's Zod strip-unknown default behavior.
    accessibility_coordinator: s
      .object({
        name: s.string().min(1),
        phone: s.string().min(7),
        email: s.string().email(),
      })
      .optional(),
    // Keep last_audit_date as raw YYYY-MM-DD string (NOT `s.isodate()` which
    // normalizes to a full ISO datetime). The coordinator-format Vitest test
    // asserts the literal `^\d{4}-\d{2}-\d{2}$` shape per A11Y-04 contract.
    last_audit_date: s
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'last_audit_date must be YYYY-MM-DD')
      .optional(),
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

/**
 * West Bank collection (REG-04 — Phase 3 plan 03-11 Bethlehem).
 *
 * Distinct route family at Israel-proper level:
 *   /west-bank/<slug>/ — separate from /regions/ + /sub-destinations/.
 *
 * Pattern picks up `content/{he,en,fr}/west-bank/<slug>.mdx`. The schema
 * REQUIRES `administrativeStatus: 'palestinian-authority'` — Velite Zod
 * parse fails if missing, providing the first of three defense layers
 * (Velite → AUD-019 → AUD-020 — see PITFALLS §3.3).
 *
 * Why Option B (distinct collection) over Option A (extend regions):
 *   - Aligns 1:1 with the distinct `/west-bank/` URL family
 *   - Mirrors future v2 expansion (Jericho, Aida camp, Shepherd's Field
 *     if cleared) — they slot into the SAME collection
 *   - Cleaner separation in audit walker — west-bank entries cannot be
 *     mistaken for regions by detectProfile()
 *   - administrativeStatus is REQUIRED here but irrelevant in `regions`
 */
const westBank = defineCollection({
  name: 'WestBank',
  pattern: '{he,en,fr}/west-bank/**/*.mdx',
  schema: s.object({
    ...baseFrontmatter,
    region: s.string().min(1),
    administrativeStatus: s.enum(['palestinian-authority']),
    heroImage: s.string().min(1),
    primaryKeyword: s.string().optional(),
    secondaryKeywords: s.array(s.string()).optional(),
    latitude: s.number().optional(),
    longitude: s.number().optional(),
    // Optional religious-site marker — when set, the west-bank renderer
    // ALSO emits PlaceOfWorship schema. For Bethlehem this carries
    // 'church-of-the-nativity'.
    religiousSiteId: s.string().optional(),
    faqs: s.array(faqEntry).min(5).max(10),
    body: s.mdx(),
  }),
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
  collections: {
    regions,
    subDestinations,
    guides,
    legal,
    itineraries,
    westBank,
  },
});
