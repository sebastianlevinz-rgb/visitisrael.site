/**
 * generateMetadataFor — Next.js Metadata builder for a content page.
 *
 * Consumes a frontmatter contract (title, description) and a (slug, lang)
 * pair, and returns a Metadata object that wires up:
 *
 *   - alternates.canonical    → self-referential per locale (SEO-06)
 *   - alternates.languages    → reciprocal { he, en, x-default } (I18N-05)
 *   - openGraph.locale        → he_IL / en_US
 *   - openGraph.url           → canonical
 *   - twitter card            → summary_large_image
 *
 * Title (50-60 chars) and meta-description (120-160 chars) length contracts
 * are PRIMARILY enforced at build time by Velite frontmatter validators
 * (SEO-05). This runtime guard is a defense-in-depth `console.warn` for
 * frontmatter that slips through — never silent.
 *
 * Per RESEARCH §1.8 + SEO-05 + SEO-06.
 */
import type { Metadata } from 'next';

import type { Locale } from '../../i18n-config';

import { canonicalUrl } from './canonical';
import { hreflangAlternates } from './hreflang';

export interface MetadataFrontmatter {
  /** SEO-05: 50-60 chars (Velite enforces; runtime warns if >70). */
  title: string;
  /** SEO-05: 120-160 chars (Velite enforces; runtime warns if outside). */
  description: string;
}

/** Open Graph locale tag per BCP-47-ish convention. */
const OG_LOCALE: Record<Locale, string> = {
  he: 'he_IL',
  en: 'en_US',
};

const TITLE_MAX = 70;
const DESC_MIN = 120;
const DESC_MAX = 160;

export function generateMetadataFor(
  slug: string,
  lang: Locale,
  fm: MetadataFrontmatter,
): Metadata {
  // Defense-in-depth length guards. Primary enforcement is Velite at build
  // time; these console.warn calls catch drift between Velite and runtime.
  if (fm.title.length > TITLE_MAX) {
    console.warn(
      `[seo/metadata] title exceeds ${TITLE_MAX} chars (slug="${slug}", lang="${lang}", length=${fm.title.length})`,
    );
  }
  if (fm.description.length < DESC_MIN || fm.description.length > DESC_MAX) {
    console.warn(
      `[seo/metadata] description outside ${DESC_MIN}-${DESC_MAX} char window (slug="${slug}", lang="${lang}", length=${fm.description.length})`,
    );
  }

  const canonical = canonicalUrl(slug, lang);
  const alternates = hreflangAlternates(slug);
  const languages: Record<string, string> = {};
  for (const a of alternates) {
    languages[a.hreflang] = a.href;
  }

  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: fm.title,
      description: fm.description,
      locale: OG_LOCALE[lang],
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: fm.title,
      description: fm.description,
    },
  };
}
