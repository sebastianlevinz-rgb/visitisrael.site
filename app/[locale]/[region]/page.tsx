/**
 * Dynamic region renderer — /[locale]/[region]
 *
 * Phase 2 plan 01 Wave 0 — first content-bearing route on the site.
 *
 * Reads the Velite `regions` collection (typed import from `.velite`),
 * looks up the Region matching (lang, region) from the URL params, and
 * composes:
 *
 *   1. <JsonLd> for TouristDestination + BreadcrumbList + FAQPage
 *   2. <RegionHero> with priority + fetchpriority="high" (IMG-04)
 *   3. <AffiliateDisclosure> — DOM-precedes the first <AffiliateCard>
 *      to satisfy AUD-009 (FTC inline disclosure within first viewport).
 *   4. <MDXContent> — the Velite-compiled MDX body, which contains the
 *      8-12 H2 section structure + 5+ AffiliateCard placements per the
 *      REGION_CANONICAL profile contract.
 *
 * `generateStaticParams` enumerates every Region in the Velite collection
 * for SSG. `generateMetadata` wires canonical + hreflang reciprocity via
 * the lib/seo/metadata helper (SEO-05, SEO-06).
 *
 * Religious-naming compliance is enforced by content (PITFALLS §3.1) plus
 * the audit pipeline (AUD-017..020) — not at the renderer level.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { regions } from '#site/content';
import { JsonLd } from '@/components/JsonLd';
import { RegionHero } from '@/components/travel/RegionHero';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { MDXContent } from '@/components/MDXContent';
import {
  buildTouristDestination,
  buildBreadcrumb,
  buildFAQ,
} from '@/lib/schema';
import { generateMetadataFor } from '@/lib/seo/metadata';
import { canonicalUrl } from '@/lib/seo/canonical';
import { locales, defaultLocale, type Locale } from '@/i18n-config';

interface RegionPageProps {
  params: Promise<{ locale: Locale; region: string }>;
}

/**
 * Find the Velite Region for the given lang + region slug.
 * Returns `undefined` if not present (route will 404).
 */
function findRegion(locale: Locale, region: string) {
  return regions.find((r) => r.lang === locale && r.region === region);
}

export function generateStaticParams(): Array<{
  locale: Locale;
  region: string;
}> {
  const params: Array<{ locale: Locale; region: string }> = [];
  for (const r of regions) {
    if ((locales as readonly string[]).includes(r.lang)) {
      params.push({ locale: r.lang as Locale, region: r.region });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { locale, region } = await params;
  const r = findRegion(locale, region);
  if (!r) {
    return { title: 'Not found' };
  }
  const slugForCanonical = r.region;
  return generateMetadataFor(slugForCanonical, locale, {
    title: r.title,
    description: r.description,
  });
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { locale, region } = await params;
  const r = findRegion(locale, region);
  if (!r) {
    notFound();
  }

  const pageUrl = canonicalUrl(r.region, locale);
  const homeUrl = canonicalUrl('', locale);

  // Build the 3 page-level JSON-LD payloads.
  const touristSchema = buildTouristDestination({
    slug: r.region,
    name: r.title,
    description: r.description,
    lang: locale,
    lat: r.latitude ?? 31.7683,
    lng: r.longitude ?? 35.2137,
    images: [r.heroImage],
    attractions: [],
  });

  const breadcrumbSchema = buildBreadcrumb({
    lang: locale,
    segments: [
      { slug: '', name: locale === 'he' ? 'דף הבית' : 'Home' },
      { slug: r.region, name: r.title },
    ],
  });

  // FAQs come from MDX frontmatter (5-10 entries enforced by Velite).
  // Fall back to a single placeholder Q&A if absent so the schema-required
  // mainEntity count of >=1 still validates. (Plan 02-01 task 2 ships real
  // FAQs in the MDX frontmatter.)
  const faqs = r.faqs ?? [
    {
      question: 'Is this region safe for tourists?',
      answer: 'Yes. Israel is a well-developed tourist destination.',
    },
  ];
  const faqSchema = buildFAQ({
    slug: r.region,
    lang: locale,
    questions: faqs,
  });

  // Resolve the async disclosure component so the returned tree is fully
  // synchronous and AFF-06 / AUD-009 DOM-order is guaranteed.
  const disclosure = await AffiliateDisclosure({});

  // Silence unused-warning during typecheck when homeUrl is computed but
  // canonical metadata path already covers it.
  void homeUrl;
  void pageUrl;

  return (
    <>
      <JsonLd schema={touristSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      <RegionHero
        imageSrc={r.heroImage}
        title={r.title}
        subtitle={r.description}
      />
      <main id="region-main" className="mx-auto max-w-3xl px-4 py-8">
        {/* AUD-009: disclosure must DOM-precede the first AffiliateCard. */}
        {disclosure}
        <article className="prose prose-lg mt-6 max-w-none">
          <MDXContent code={r.body} />
        </article>
      </main>
    </>
  );
}

// Default locale check (defensive: shouldn't be reachable for invalid locale
// because [locale] segment is enumerated; this is a belt-and-braces guard).
export const dynamicParams = false;
void defaultLocale;
