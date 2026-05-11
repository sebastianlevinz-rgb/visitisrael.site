/**
 * Dynamic sub-destination renderer — /[locale]/[region]/[subdest]
 *
 * Phase 2 plan 03 Wave 0 — sub-destination route renderer.
 *
 * Mirrors the region renderer at `app/[locale]/[region]/page.tsx` and adds:
 *
 *   - Sub-destination Velite collection lookup by (lang, parentRegion,
 *     region-prefixed slug). The Velite `slug` field is stored as
 *     "jerusalem-western-wall" (region-prefixed, so the on-disk collection
 *     stays flat), but the URL path uses just the short slug:
 *     `/jerusalem/western-wall/`. We derive the short slug by stripping
 *     `^<parentRegion>-` from the Velite slug when emitting URLs, and
 *     reconstruct the Velite slug as `${parentRegion}-${subdest}` when
 *     looking up.
 *
 *   - Religious-site dual schema: when frontmatter `religiousSiteId` is set
 *     (e.g. "western-wall" matching data/religious-sites.json), we emit a
 *     second JSON-LD payload of PlaceOfWorship (or Place when contested)
 *     IN ADDITION to TouristAttraction. The `buildReligiousBuilding` helper
 *     drives the paired-naming logic (AUD-019).
 *
 *   - 3-segment BreadcrumbList: Home → Jerusalem → <subdest>, satisfying
 *     SUB_DESTINATION profile's required-schema-types contract.
 *
 * The 1+ AffiliateCard placement contract (AUD-031 + SUB_DESTINATION
 * minAffiliates: 1) is enforced at the content layer (MDX), not the
 * renderer. The renderer still injects <AffiliateDisclosure> once before
 * the first card so AUD-009 holds.
 *
 * `generateStaticParams` enumerates every sub-destination from Velite for
 * SSG. `generateMetadata` uses `generateMetadataFor` with a "<region>/
 * <short-slug>" canonical path.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { subDestinations } from '#site/content';
import { JsonLd } from '@/components/JsonLd';
import { RegionHero } from '@/components/travel/RegionHero';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { MDXContent } from '@/components/MDXContent';
import {
  buildTouristAttraction,
  buildBreadcrumb,
  buildReligiousBuilding,
} from '@/lib/schema';
import { generateMetadataFor } from '@/lib/seo/metadata';
import { canonicalUrl } from '@/lib/seo/canonical';
import { locales, defaultLocale, type Locale } from '@/i18n-config';

interface SubDestPageProps {
  params: Promise<{ locale: Locale; region: string; subdest: string }>;
}

/**
 * Strip the `${parentRegion}-` prefix from a region-prefixed Velite slug
 * (e.g. "jerusalem-western-wall" + "jerusalem" → "western-wall").
 *
 * If the slug doesn't start with `${parentRegion}-` (defensive), the slug
 * is returned unchanged.
 */
export function toShortSlug(veliteSlug: string, parentRegion: string): string {
  const prefix = `${parentRegion}-`;
  return veliteSlug.startsWith(prefix)
    ? veliteSlug.slice(prefix.length)
    : veliteSlug;
}

/**
 * Find the Velite SubDestination for (locale, parentRegion, short-slug).
 * `region` here is the parent region from the URL path ("jerusalem"),
 * `subdest` is the URL-segment short slug ("western-wall"). We
 * reconstruct the Velite slug ("jerusalem-western-wall") and look up.
 */
function findSubDest(locale: Locale, region: string, subdest: string) {
  const veliteSlug = `${region}-${subdest}`;
  return subDestinations.find(
    (s) =>
      s.lang === locale && s.parentRegion === region && s.slug === veliteSlug,
  );
}

export function generateStaticParams(): Array<{
  locale: Locale;
  region: string;
  subdest: string;
}> {
  const params: Array<{ locale: Locale; region: string; subdest: string }> = [];
  for (const s of subDestinations) {
    if ((locales as readonly string[]).includes(s.lang)) {
      params.push({
        locale: s.lang as Locale,
        region: s.parentRegion,
        subdest: toShortSlug(s.slug, s.parentRegion),
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: SubDestPageProps): Promise<Metadata> {
  const { locale, region, subdest } = await params;
  const r = findSubDest(locale, region, subdest);
  if (!r) {
    return { title: 'Not found' };
  }
  // Canonical path uses the short slug under the region: /jerusalem/western-wall.
  const canonicalPath = `${region}/${subdest}`;
  return generateMetadataFor(canonicalPath, locale, {
    title: r.title,
    description: r.description,
  });
}

export default async function SubDestinationPage({ params }: SubDestPageProps) {
  const { locale, region, subdest } = await params;
  const r = findSubDest(locale, region, subdest);
  if (!r) {
    notFound();
  }

  const canonicalPath = `${region}/${subdest}`;
  const pageUrl = canonicalUrl(canonicalPath, locale);
  void pageUrl;

  // 1) TouristAttraction — every SUB_DESTINATION emits this (profile contract).
  const touristAttractionSchema = buildTouristAttraction({
    slug: canonicalPath,
    name: r.title,
    description: r.description,
    lang: locale,
    images: [r.heroImage],
  });

  // 2) BreadcrumbList — 3 segments: Home → Region → SubDest.
  const breadcrumbSchema = buildBreadcrumb({
    lang: locale,
    segments: [
      { slug: '', name: locale === 'he' ? 'דף הבית' : 'Home' },
      {
        slug: region,
        name: locale === 'he' ? 'ירושלים' : 'Jerusalem',
      },
      { slug: canonicalPath, name: r.title },
    ],
  });

  // 3) Religious-site schema — emitted ONLY when frontmatter declares
  //    `religiousSiteId` matching a data/religious-sites.json key.
  //    Examples: western-wall, holy-sepulchre. For NON-religious sub-dests
  //    (Mahane Yehuda, Yad Vashem in this dataset, Mount of Olives) the
  //    `religiousSiteId` field is omitted and only TouristAttraction fires.
  let religiousSchema: ReturnType<typeof buildReligiousBuilding> | null = null;
  if (r.religiousSiteId) {
    try {
      religiousSchema = buildReligiousBuilding({
        siteId: r.religiousSiteId,
        slug: canonicalPath,
        lang: locale,
        description: r.description,
        images: [r.heroImage],
      });
    } catch {
      // Defensive: if religiousSiteId points to a missing entry, fall back
      // to TouristAttraction-only rather than crashing the render.
      religiousSchema = null;
    }
  }

  // Resolve the async disclosure inline so the tree is fully synchronous.
  const disclosure = await AffiliateDisclosure({});

  return (
    <>
      <JsonLd schema={touristAttractionSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {religiousSchema ? <JsonLd schema={religiousSchema} /> : null}
      <RegionHero
        imageSrc={r.heroImage}
        title={r.title}
        subtitle={r.description}
      />
      <main id="subdest-main" className="mx-auto max-w-3xl px-4 py-8">
        {/* AUD-009: disclosure DOM-precedes the first AffiliateCard. */}
        {disclosure}
        <article className="prose prose-lg mt-6 max-w-none">
          <MDXContent code={r.body} />
        </article>
      </main>
    </>
  );
}

export const dynamicParams = false;
void defaultLocale;
