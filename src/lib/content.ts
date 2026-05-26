import { getCollection, type CollectionEntry } from 'astro:content';

export type RegionEntry = CollectionEntry<'regions'>;
export type AttractionEntry = CollectionEntry<'attractions'>;

/** The region slug an attraction belongs to (frontmatter region/parentRegion). */
export const attractionRegion = (a: AttractionEntry): string =>
  a.data.region ?? a.id.split('-')[0]!;

/** URL slug segment for an attraction (id minus the "<region>-" prefix). */
export function attractionSlug(a: AttractionEntry): string {
  const region = attractionRegion(a);
  return a.id.startsWith(`${region}-`) ? a.id.slice(region.length + 1) : a.id;
}

export const attractionUrl = (a: AttractionEntry): string =>
  `/${attractionRegion(a)}/${attractionSlug(a)}`;

/** Human-readable attraction name (title before any colon/dash subtitle). */
export const attractionName = (a: AttractionEntry): string =>
  a.data.title.split(/[:(]/)[0]!.trim();

/** All attractions for a region, sorted by title. */
export async function attractionsForRegion(
  region: string,
): Promise<AttractionEntry[]> {
  const all = await getCollection('attractions');
  return all
    .filter((a) => attractionRegion(a) === region && !a.data.draft)
    .sort((x, y) => x.data.title.localeCompare(y.data.title));
}
