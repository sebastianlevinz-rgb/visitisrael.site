import { getCollection, type CollectionEntry } from 'astro:content';

export type RegionEntry = CollectionEntry<'regions'>;
export type AttractionEntry = CollectionEntry<'attractions'>;

/** The region slug an attraction belongs to (frontmatter region/parentRegion). */
export const attractionRegion = (a: AttractionEntry): string =>
  a.data.region ?? a.id.split('-')[0]!;

/** URL slug segment for an attraction (strips locale prefix + region prefix). */
export function attractionSlug(a: AttractionEntry): string {
  const region = attractionRegion(a);
  const baseId = a.id.includes('/') ? a.id.slice(a.id.indexOf('/') + 1) : a.id;
  return baseId.startsWith(`${region}-`) ? baseId.slice(region.length + 1) : baseId;
}

export const attractionUrl = (a: AttractionEntry): string => {
  const region = attractionRegion(a);
  const slug = attractionSlug(a);
  if (a.id.includes('/')) {
    const locale = a.id.slice(0, a.id.indexOf('/'));
    return `/${locale}/${region}/${slug}`;
  }
  return `/${region}/${slug}`;
};

/** Human-readable attraction name (title before any colon/dash subtitle). */
export const attractionName = (a: AttractionEntry): string =>
  a.data.title.split(/[:(]/)[0]!.trim();

/**
 * Attractions for a region. Pass `locale` to get locale-specific entries (falls back
 * to EN if none exist for that locale+region). Omit locale for EN-only entries.
 */
export async function attractionsForRegion(
  region: string,
  locale?: string,
): Promise<AttractionEntry[]> {
  const all = await getCollection('attractions');
  if (locale) {
    const prefix = `${locale}/`;
    const localeEntries = all.filter(
      (a) => a.id.startsWith(prefix) && attractionRegion(a) === region && !a.data.draft,
    );
    if (localeEntries.length > 0) {
      return localeEntries.sort((x, y) => x.data.title.localeCompare(y.data.title));
    }
  }
  return all
    .filter((a) => !a.id.includes('/') && attractionRegion(a) === region && !a.data.draft)
    .sort((x, y) => x.data.title.localeCompare(y.data.title));
}
