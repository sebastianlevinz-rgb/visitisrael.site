/**
 * Homepage — `/` (HE, default locale) and `/en/`.
 *
 * Phase 2 plan 05 Wave 0 — first hub page on the site (HUB profile).
 *
 * Composition:
 *   1. <RegionHero> — Jerusalem hero image, frontmatter-free copy from translations
 *      (homepage doesn't read Velite; it owns its own copy via i18n + regions.json).
 *      `priority` + `fetchpriority="high"` per IMG-04 (RegionHero contract).
 *   2. <JsonLd> — CollectionPage schema (HUB profile required type).
 *      No BreadcrumbList: the homepage IS the root, Schema.org requires
 *      itemListElement.length >= 2 (Plan 06 fix-forward of the Plan 05
 *      deferred BreadcrumbList <2 schema error).
 *   3. Region grid — 11 cards from `data/regions.json`. Status "live" → next/link
 *      to /<locale>/<slug>; Status "coming-soon" → aria-disabled card with the
 *      "Coming soon" / "בקרוב" label. Locale-aware blurbs.
 *   4. Three primary CTAs: Explore Jerusalem / Find Tours / Plan Itinerary.
 *
 * The hub profile (scripts/audit/profiles/hub.ts) is dispatched via the
 * frontmatter override `isHub: true` — there's no Velite collection for the
 * homepage. The audit-walker inject path checks `slug === 'index'` and falls
 * through to the override (see scripts/audit/run.ts — Phase 2.5 enhancement).
 *
 * Religious-naming compliance: blurbs reference "Western Wall" (NOT
 * "Wailing Wall"); homepage does not surface Temple Mount in v1 (deferred
 * to /jerusalem canonical).
 */
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { RegionHero } from '@/components/travel/RegionHero';
import { buildCollectionPage } from '@/lib/schema';
import { generateMetadataFor } from '@/lib/seo/metadata';
import { canonicalUrl } from '@/lib/seo/canonical';
import type { Locale } from '@/i18n-config';

import regionsData from '@/data/regions.json';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

interface RegionEntry {
  slug: string;
  name: { en: string; he: string };
  blurb: { en: string; he: string };
  image: string;
  status: 'live' | 'coming-soon';
}

const REGIONS = (regionsData.regions ?? []) as ReadonlyArray<RegionEntry>;

const HOMEPAGE_COPY = {
  he: {
    title: 'ביקור בישראל — מדריך התיירות הדו-לשוני',
    description:
      'מדריכי תיירות לישראל מאת מומחים מקומיים: ירושלים, תל אביב, ים המלח, הגליל ועוד. אחד עשר אזורים, מסלולים בני שלושה ימים והזמנות אמינות.',
    hero: {
      title: 'ביקור בישראל',
      subtitle:
        'מדריך תיירות דו-לשוני: אחד עשר אזורים, מסלולי טיול וטיפים מעשיים.',
    },
    regionsHeading: 'אזורי הביקור',
    ctaExploreJerusalem: 'לטיול בירושלים',
    ctaFindTours: 'מציאת סיורים',
    ctaPlanItinerary: 'תכנון מסלול',
    comingSoon: 'בקרוב',
    home: 'דף הבית',
  },
  en: {
    title: 'Visit Israel — Bilingual Travel Guide',
    description:
      'Local-expert Israel travel guides: Jerusalem, Tel Aviv, the Dead Sea, the Galilee and more. Eleven regions, three-day itineraries and trusted booking links.',
    hero: {
      title: 'Visit Israel',
      subtitle:
        'A bilingual guide to Israel: eleven regions, day-by-day itineraries, practical tips.',
    },
    regionsHeading: 'Explore the Regions',
    ctaExploreJerusalem: 'Explore Jerusalem',
    ctaFindTours: 'Find Tours',
    ctaPlanItinerary: 'Plan Itinerary',
    comingSoon: 'Coming soon',
    home: 'Home',
  },
} as const;

function regionHref(slug: string, locale: Locale): string {
  return locale === 'he' ? `/${slug}` : `/${locale}/${slug}`;
}

function itineraryHref(slug: string, locale: Locale): string {
  return locale === 'he'
    ? `/itineraries/${slug}`
    : `/${locale}/itineraries/${slug}`;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = HOMEPAGE_COPY[locale];
  return generateMetadataFor('', locale, {
    title: copy.title,
    description: copy.description,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  void t; // primary copy is locally-owned; keeps the next-intl bootstrap warm.

  const copy = HOMEPAGE_COPY[locale];
  const pageUrl = canonicalUrl('', locale);
  const homeUrl = pageUrl;

  // CollectionPage schema (HUB profile requiredSchemaTypes). AUD-033
  // schema-presence is satisfied by CollectionPage alone — no BreadcrumbList
  // emitted because the homepage is the root and Schema.org requires
  // BreadcrumbList.itemListElement.length >= 2 (Plan 05 deferred-items.md →
  // Plan 06 fix-forward).
  const collectionSchema = buildCollectionPage({
    slug: '',
    name: copy.title,
    description: copy.description,
    lang: locale,
    image: '/images/regions/jerusalem/hero.jpg',
  });

  return (
    <>
      <JsonLd schema={collectionSchema} />
      <RegionHero
        imageSrc="/images/regions/jerusalem/hero.jpg"
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        alt={
          locale === 'he'
            ? 'תמונת נושא ירושלים — מבט אווירי על העיר העתיקה'
            : 'Jerusalem hero — aerial view of the Old City'
        }
      />
      <main id="home-main" className="mx-auto max-w-6xl px-4 py-12">
        <section aria-labelledby="primary-ctas" className="mb-12">
          <h2 id="primary-ctas" className="sr-only">
            {copy.hero.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={regionHref('jerusalem', locale)}
              className="rounded-md bg-[var(--button-bg-primary)] px-6 py-3 text-[var(--button-text-primary)] hover:bg-[var(--color-primary-hover)]"
            >
              {copy.ctaExploreJerusalem}
            </Link>
            <Link
              href={`${regionHref('jerusalem', locale)}#tours`}
              className="rounded-md border border-[var(--color-primary)] bg-[var(--card-bg)] px-6 py-3 text-[var(--color-primary)] hover:bg-[var(--color-surface-elevated)]"
            >
              {copy.ctaFindTours}
            </Link>
            <Link
              href={itineraryHref('3-days-in-jerusalem', locale)}
              className="rounded-md border border-[var(--color-primary)] bg-[var(--card-bg)] px-6 py-3 text-[var(--color-primary)] hover:bg-[var(--color-surface-elevated)]"
            >
              {copy.ctaPlanItinerary}
            </Link>
          </div>
        </section>

        <section aria-labelledby="regions-heading">
          <h2
            id="regions-heading"
            className="mb-6 text-3xl font-bold text-[var(--color-ink)]"
          >
            {copy.regionsHeading}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r) => {
              const name = r.name[locale];
              const blurb = r.blurb[locale];
              if (r.status === 'live') {
                return (
                  <li key={r.slug}>
                    <Link
                      href={regionHref(r.slug, locale)}
                      className="block rounded-md border border-[var(--color-border)] bg-[var(--card-bg)] p-5 hover:border-[var(--color-primary)] hover:shadow-md"
                      data-region-status="live"
                    >
                      <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                        {name}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                        {blurb}
                      </p>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={r.slug}>
                  <div
                    className="rounded-md border border-[var(--color-border)] bg-[var(--card-bg)] p-5 opacity-50"
                    aria-disabled="true"
                    data-region-status="coming-soon"
                  >
                    <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                      {name}{' '}
                      <span className="ms-2 text-xs font-normal text-[var(--color-ink-muted)]">
                        ({copy.comingSoon})
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                      {blurb}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      {/* Defensive: silence the homeUrl computed-but-unused warning when the
          breadcrumbSchema covers it via canonicalUrl internally. */}
      <span className="hidden" data-page-url={homeUrl} />
    </>
  );
}
