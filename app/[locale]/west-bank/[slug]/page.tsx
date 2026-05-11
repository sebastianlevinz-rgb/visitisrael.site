/**
 * Dynamic west-bank renderer — /[locale]/west-bank/[slug]
 *
 * Phase 3 plan 03-11 Wave 0 — distinct route family for REG-04.
 *
 * Mirrors the region renderer at `app/[locale]/[region]/page.tsx` but reads
 * the Velite `westBank` collection (Option B per RESEARCH §5) instead of
 * `regions`. The collection schema REQUIRES `administrativeStatus:
 * 'palestinian-authority'` — Velite parse fails if missing (defense layer 1
 * of 3; AUD-019 + AUD-020 are layers 2 + 3 per PITFALLS §3.3).
 *
 * BreadcrumbList has 3 segments: Home → West Bank → <Slug>. The "West Bank"
 * label is locale-aware: `הגדה המערבית` (HE) / `West Bank` (EN).
 *
 * Religious-site dual schema: when frontmatter `religiousSiteId` is set
 * (Bethlehem carries `church-of-the-nativity`), we emit PlaceOfWorship
 * IN ADDITION to TouristDestination. The renderer falls back to
 * TouristDestination-only if the religiousSiteId points to a missing entry.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { westBank } from '#site/content';
import { JsonLd } from '@/components/JsonLd';
import { RegionHero } from '@/components/travel/RegionHero';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { MDXContent } from '@/components/MDXContent';
import {
  buildTouristDestination,
  buildBreadcrumb,
  buildFAQ,
  buildReligiousBuilding,
} from '@/lib/schema';
import { generateMetadataFor } from '@/lib/seo/metadata';
import { canonicalUrl } from '@/lib/seo/canonical';
import { locales, defaultLocale, type Locale } from '@/i18n-config';

interface WestBankPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

/**
 * Find the Velite WestBank entry for the given (locale, slug). Returns
 * `undefined` if not present — caller triggers `notFound()`.
 */
function findWestBank(locale: Locale, slug: string) {
  return westBank.find((r) => r.lang === locale && r.region === slug);
}

export function generateStaticParams(): Array<{
  locale: Locale;
  slug: string;
}> {
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const r of westBank) {
    if ((locales as readonly string[]).includes(r.lang)) {
      params.push({ locale: r.lang as Locale, slug: r.region });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: WestBankPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const r = findWestBank(locale, slug);
  if (!r) {
    return { title: 'Not found' };
  }
  // Canonical path uses the distinct route family: /west-bank/<slug>.
  return generateMetadataFor(`west-bank/${r.region}`, locale, {
    title: r.title,
    description: r.description,
  });
}

export default async function WestBankPage({ params }: WestBankPageProps) {
  const { locale, slug } = await params;
  const r = findWestBank(locale, slug);
  if (!r) {
    notFound();
  }

  const canonicalPath = `west-bank/${r.region}`;
  const pageUrl = canonicalUrl(canonicalPath, locale);
  void pageUrl;

  // 1) TouristDestination — REGION_CANONICAL profile contract.
  const touristSchema = buildTouristDestination({
    slug: canonicalPath,
    name: r.title,
    description: r.description,
    lang: locale,
    lat: r.latitude ?? 31.7042,
    lng: r.longitude ?? 35.2076,
    images: [r.heroImage],
    attractions: [],
  });

  // 2) BreadcrumbList — 3 segments: Home → West Bank → Slug.
  //    HE label `הגדה המערבית`; EN label `West Bank`.
  const westBankLabel = locale === 'he' ? 'הגדה המערבית' : 'West Bank';
  const breadcrumbSchema = buildBreadcrumb({
    lang: locale,
    segments: [
      { slug: '', name: locale === 'he' ? 'דף הבית' : 'Home' },
      { slug: 'west-bank', name: westBankLabel },
      { slug: canonicalPath, name: r.title },
    ],
  });

  // 3) FAQPage — Velite schema enforces 5-10 entries.
  const faqSchema = buildFAQ({
    slug: canonicalPath,
    lang: locale,
    questions: r.faqs,
  });

  // 4) Religious-site schema — emitted ONLY when frontmatter declares
  //    religiousSiteId. Bethlehem carries `church-of-the-nativity`
  //    (UNESCO 2012; major Christian pilgrimage; PlaceOfWorship per
  //    schema-dts v2 vocabulary). Defensive: fall back to no extra
  //    schema if the religiousSiteId points to a missing entry.
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
      religiousSchema = null;
    }
  }

  // Resolve disclosure inline (AUD-009 DOM-order guarantee).
  const disclosure = await AffiliateDisclosure({});

  return (
    <>
      <JsonLd schema={touristSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      {religiousSchema ? <JsonLd schema={religiousSchema} /> : null}
      <RegionHero
        imageSrc={r.heroImage}
        title={r.title}
        subtitle={r.description}
      />
      <main id="west-bank-main" className="mx-auto max-w-3xl px-4 py-8">
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
