/**
 * `/regions/` (HE) and `/en/regions/` — Regions index hub page (HUB profile).
 *
 * Phase 2 plan 05 Wave 0.
 *
 * Same region list as the homepage (data/regions.json) — the homepage shows
 * the grid below a hero + CTAs; /regions/ is the pure index. CollectionPage
 * schema + BreadcrumbList (Home → Regions). HUB profile, no affiliate
 * requirement.
 *
 * Live cards link to /<locale>/<slug>. "coming-soon" cards have
 * aria-disabled + opacity styling per the homepage convention so the page
 * structure is visually complete from M2 launch (Phase 3 plans flip the
 * status flag as they ship).
 */
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { buildCollectionPage, buildBreadcrumb } from '@/lib/schema';
import { generateMetadataFor } from '@/lib/seo/metadata';
import type { Locale } from '@/i18n-config';

import regionsData from '@/data/regions.json';

interface RegionsIndexProps {
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

const REGIONS_COPY = {
  he: {
    title: 'אזורי הטיולים — מדריך הטיולים לישראל',
    description:
      'אחד עשר אזורי תיירות בישראל: ירושלים פעילה היום; תל אביב, ים המלח, הגליל, אילת, הנגב, נצרת, חיפה, רמת הגולן, קיסריה ועכו ייפרסו בקרוב.',
    heading: 'אזורי הטיולים בישראל',
    intro:
      'אנו מציעים אחד עשר אזורי תיירות. ירושלים פעילה מהיום הראשון; שאר האזורים יושקו בשלבים הבאים של המיזם.',
    comingSoon: 'בקרוב',
    home: 'דף הבית',
    regions: 'אזורים',
  },
  en: {
    title: 'Regions of Israel — Travel Guide',
    description:
      "Eleven Israeli travel regions: Jerusalem, Tel Aviv, the Dead Sea, the Galilee, Eilat, the Negev, Nazareth, Haifa, the Golan Heights, Caesarea and Akko.",
    heading: 'Travel Regions of Israel',
    intro:
      'Eleven travel regions are on the roadmap. Jerusalem is live today; the rest will roll out in subsequent waves of the project.',
    comingSoon: 'Coming soon',
    home: 'Home',
    regions: 'Regions',
  },
} as const;

function regionHref(slug: string, locale: Locale): string {
  return locale === 'he' ? `/${slug}` : `/${locale}/${slug}`;
}

export async function generateMetadata({
  params,
}: RegionsIndexProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = REGIONS_COPY[locale];
  return generateMetadataFor('regions', locale, {
    title: copy.title,
    description: copy.description,
  });
}

export default async function RegionsIndexPage({ params }: RegionsIndexProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = REGIONS_COPY[locale];

  const collectionSchema = buildCollectionPage({
    slug: 'regions',
    name: copy.title,
    description: copy.description,
    lang: locale,
  });

  const breadcrumbSchema = buildBreadcrumb({
    lang: locale,
    segments: [
      { slug: '', name: copy.home },
      { slug: 'regions', name: copy.regions },
    ],
  });

  return (
    <>
      <JsonLd schema={collectionSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <main id="regions-main" className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-bold text-[var(--color-ink)]">
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--color-ink-muted)]">
          {copy.intro}
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                    <h2 className="text-xl font-semibold text-[var(--color-ink)]">
                      {name}
                    </h2>
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
                  <h2 className="text-xl font-semibold text-[var(--color-ink)]">
                    {name}{' '}
                    <span className="ms-2 text-xs font-normal text-[var(--color-ink-muted)]">
                      ({copy.comingSoon})
                    </span>
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                    {blurb}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
