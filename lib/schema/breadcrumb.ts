/**
 * BreadcrumbList generator — every content page emits one.
 *
 * Input: ordered list of segments from root → leaf. The last segment's
 * canonical URL drives the @id for de-duplication.
 *
 * Each ListItem.position is 1-indexed per schema.org spec.
 */
import type { BreadcrumbList, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import type { BreadcrumbInput } from './types';

export function buildBreadcrumb(
  i: BreadcrumbInput,
): WithContext<BreadcrumbList> {
  if (i.segments.length < 1) {
    throw new Error('buildBreadcrumb requires at least 1 segment');
  }

  const items = i.segments.map((seg, idx) => ({
    '@type': 'ListItem' as const,
    position: idx + 1,
    name: seg.name,
    item: canonicalUrl(seg.slug, i.lang),
  }));

  const lastSeg = i.segments[i.segments.length - 1]!;
  const deepestUrl = canonicalUrl(lastSeg.slug, i.lang);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${deepestUrl}#breadcrumb`,
    inLanguage: i.lang,
    itemListElement: items,
  } as WithContext<BreadcrumbList>;
}
