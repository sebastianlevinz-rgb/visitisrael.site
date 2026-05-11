/**
 * Dynamic itinerary renderer — /[locale]/itineraries/[slug]
 *
 * Phase 2 plan 04 Wave 0 — first itinerary route on the site.
 *
 * Mirrors the region renderer at `app/[locale]/[region]/page.tsx` and the
 * sub-destination renderer at `app/[locale]/[region]/[subdest]/page.tsx`
 * with two specific deltas:
 *
 *   1. Reads from the Velite `itineraries` collection (Plan 04 Wave 0 add),
 *      not `regions` / `subDestinations`. Itinerary slug is flat (no
 *      region prefix needed because itineraries live under their own
 *      top-level segment).
 *
 *   2. Injects a TouristTrip JSON-LD payload via
 *      `itinerarySchema({...})`. The schema's `itinerary[]` is built by
 *      cross-referencing frontmatter `stops: [{ slug, day, period }]`
 *      against the Velite `subDestinations` collection — each stop's
 *      sub-destination provides `name` (title), `description`, optional
 *      `latitude` / `longitude`, and a canonical URL via the
 *      `canonicalUrl()` helper. Missing sub-destinations are filtered
 *      out gracefully so a stop that points to a deferred Phase 4 page
 *      doesn't break the schema.
 *
 *   3. BreadcrumbList: Home → Itineraries (hub-only segment, no
 *      canonical page yet — Phase 2.5 ships the /itineraries/ hub) →
 *      <Itinerary title>. We keep the breadcrumb 3-deep so the schema
 *      reflects the actual URL hierarchy.
 *
 * Audit-profile dispatch: the itinerary uses `GUIDE_OR_WINERY` (Plan
 * 04 lock — start with existing profile per RESEARCH §8 OQ2). See
 * scripts/audit/profiles/detect.ts for the `itineraries` → `GUIDE_OR_WINERY`
 * case.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { itineraries, subDestinations } from '#site/content';
import { JsonLd } from '@/components/JsonLd';
import { RegionHero } from '@/components/travel/RegionHero';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { MDXContent } from '@/components/MDXContent';
import {
  itinerarySchema,
  buildBreadcrumb,
  type ItineraryStopInput,
} from '@/lib/schema';
import { generateMetadataFor } from '@/lib/seo/metadata';
import { canonicalUrl } from '@/lib/seo/canonical';
import { locales, defaultLocale, type Locale } from '@/i18n-config';

interface ItineraryPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

interface ItineraryStopFrontmatter {
  slug: string;
  day: number;
  period: 'morning' | 'afternoon' | 'evening' | 'all-day';
}

/**
 * Find the Velite Itinerary for (locale, slug).
 */
function findItinerary(locale: Locale, slug: string) {
  return itineraries.find((i) => i.lang === locale && i.slug === slug);
}

/**
 * Resolve the Velite SubDestination (lang, parentRegion, slug)
 * corresponding to an itinerary stop. Each stop's `slug` is the
 * short slug under the itinerary's `startRegion` (e.g.
 * "western-wall" under startRegion "jerusalem"), matching the
 * sub-destination renderer's `toShortSlug()` convention.
 *
 * Returns `null` when the target sub-dest hasn't been shipped yet
 * (Phase 4 long-tail) so the schema emits a partial itinerary
 * rather than throwing.
 */
function resolveStop(
  locale: Locale,
  startRegion: string,
  shortSlug: string,
): {
  name: string;
  description: string;
  url: string;
  latitude?: number;
  longitude?: number;
} | null {
  const veliteSlug = `${startRegion}-${shortSlug}`;
  const subDest = subDestinations.find(
    (s) =>
      s.lang === locale &&
      s.parentRegion === startRegion &&
      s.slug === veliteSlug,
  );
  if (!subDest) return null;
  const stopUrl = canonicalUrl(`${startRegion}/${shortSlug}`, locale);
  const stop: {
    name: string;
    description: string;
    url: string;
    latitude?: number;
    longitude?: number;
  } = {
    name: subDest.title,
    description: subDest.description,
    url: stopUrl,
  };
  if (typeof subDest.latitude === 'number') stop.latitude = subDest.latitude;
  if (typeof subDest.longitude === 'number') stop.longitude = subDest.longitude;
  return stop;
}

export function generateStaticParams(): Array<{
  locale: Locale;
  slug: string;
}> {
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const i of itineraries) {
    if ((locales as readonly string[]).includes(i.lang)) {
      params.push({ locale: i.lang as Locale, slug: i.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const i = findItinerary(locale, slug);
  if (!i) {
    return { title: 'Not found' };
  }
  const canonicalPath = `itineraries/${slug}`;
  return generateMetadataFor(canonicalPath, locale, {
    title: i.title,
    description: i.description,
  });
}

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const { locale, slug } = await params;
  const i = findItinerary(locale, slug);
  if (!i) {
    notFound();
  }

  const canonicalPath = `itineraries/${slug}`;
  const pageUrl = canonicalUrl(canonicalPath, locale);

  // 1) Resolve each frontmatter stop → TouristAttraction entry via Velite
  //    subDestinations lookup. Missing entries (Phase 4 long-tail) are
  //    filtered so the schema reflects shipped pages only.
  const stops = (i.stops as ItineraryStopFrontmatter[]) ?? [];
  const resolvedStops: ItineraryStopInput[] = [];
  for (const s of stops) {
    const r = resolveStop(locale, i.startRegion, s.slug);
    if (r) resolvedStops.push(r);
  }

  // 2) TouristTrip JSON-LD (Plan 2.4 lock — single trip schema; no
  //    parallel ItemList — the audit GUIDE_OR_WINERY profile is fine
  //    with TouristTrip as the page's primary schema).
  const tripSchema = itinerarySchema({
    name: i.title,
    description: i.description,
    url: pageUrl,
    inLanguage: locale,
    itinerary: resolvedStops,
    durationDays: i.durationDays,
  });

  // 3) BreadcrumbList: Home → Itineraries → <Itinerary>.
  //    The /itineraries/ hub page lands in Phase 2.5; for now the
  //    middle segment is a virtual path used only for breadcrumb
  //    structure. Phase 2.5 hub renderer will own the same URL.
  const breadcrumbSchema = buildBreadcrumb({
    lang: locale,
    segments: [
      { slug: '', name: locale === 'he' ? 'דף הבית' : 'Home' },
      {
        slug: 'itineraries',
        name: locale === 'he' ? 'מסלולי טיול' : 'Itineraries',
      },
      { slug: canonicalPath, name: i.title },
    ],
  });

  // Resolve the async disclosure inline so the tree is fully synchronous.
  const disclosure = await AffiliateDisclosure({});

  return (
    <>
      <JsonLd schema={tripSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <RegionHero
        imageSrc={i.heroImage}
        title={i.title}
        subtitle={i.description}
      />
      <main id="itinerary-main" className="mx-auto max-w-3xl px-4 py-8">
        {/* AUD-009: disclosure DOM-precedes the first AffiliateCard. */}
        {disclosure}
        <article className="prose prose-lg mt-6 max-w-none">
          <MDXContent code={i.body} />
        </article>
      </main>
    </>
  );
}

export const dynamicParams = false;
void defaultLocale;
