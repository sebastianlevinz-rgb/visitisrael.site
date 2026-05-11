/**
 * `/privacy` (HE) and `/en/privacy` — Privacy policy.
 *
 * Phase 2 plan 05 Wave 0 — UTILITY profile legal page.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { legal } from '#site/content';
import { JsonLd } from '@/components/JsonLd';
import { MDXContent } from '@/components/MDXContent';
import { buildWebPage, buildBreadcrumb } from '@/lib/schema';
import { generateMetadataFor } from '@/lib/seo/metadata';
import type { Locale } from '@/i18n-config';

const PAGE_SLUG = 'privacy';

interface PrivacyPageProps {
  params: Promise<{ locale: Locale }>;
}

interface LegalEntry {
  lang: 'he' | 'en' | 'fr';
  title: string;
  description: string;
  slug: string;
  page: string;
  body: string;
}

function findEntry(locale: Locale): LegalEntry | undefined {
  return (legal as ReadonlyArray<LegalEntry>).find(
    (e) => e.lang === locale && e.page === PAGE_SLUG,
  );
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const e = findEntry(locale);
  if (!e) return { title: 'Privacy' };
  return generateMetadataFor(PAGE_SLUG, locale, {
    title: e.title,
    description: e.description,
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const e = findEntry(locale);
  if (!e) notFound();

  const webPageSchema = buildWebPage({
    slug: PAGE_SLUG,
    name: e.title,
    description: e.description,
    lang: locale,
  });

  const breadcrumbSchema = buildBreadcrumb({
    lang: locale,
    segments: [
      { slug: '', name: locale === 'he' ? 'דף הבית' : 'Home' },
      { slug: PAGE_SLUG, name: e.title },
    ],
  });

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <main id="legal-main" className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-[var(--color-ink)]">{e.title}</h1>
        <article className="prose prose-lg mt-6 max-w-none text-[var(--color-ink)]">
          <MDXContent code={e.body} />
        </article>
      </main>
    </>
  );
}
