/**
 * ReligiousBuilding generator with paired-naming logic — the SEO-04 critical builder.
 *
 * Reference: RESEARCH §1.6 verbatim example + PITFALLS §3.1 paired-naming convention.
 *
 * Naming/typing rules (locked):
 *   - `contested === true`  → @type = 'Place' (NOT 'PlaceOfWorship'),
 *                             name = "{primary} / {alternate}" (paired first-reference)
 *   - `contested === false` → @type = 'PlaceOfWorship',
 *                             name = primary localized name
 *   - alternateName[] always emits {he, en, ar} from name + alternateName fields
 *     (falsy values filtered, de-duped).
 *   - `sameAs: ['https://www.wikidata.org/wiki/Q...']` when Wikidata ID present.
 *   - `religion` and `religiousOrder` only emitted for non-contested sites.
 *
 * Source of truth: data/religious-sites.json (loaded at build/test time).
 *
 * AUD-017..AUD-020 enforcement begins here at the data layer:
 *   - AUD-017: "Wailing Wall" string banned → Western Wall entry has
 *              alternateName.en = "Kotel" (NEVER "Wailing Wall").
 *   - AUD-019: Temple Mount first-reference without Haram al-Sharif → builder
 *              forces paired name for contested sites.
 *   - AUD-020: Bethlehem/Hebron/Jericho carry administrativeStatus → wired here.
 *
 * NOTE on type choice: `schema-dts` v2 dropped the historical `ReligiousBuilding`
 * vocabulary in favor of `PlaceOfWorship`. Both are accepted by Google's Rich
 * Results test. We use PlaceOfWorship for non-contested holy sites; contested
 * sites use Place (intentionally neutral) per RESEARCH §1.6 + PITFALLS §3.1.
 */
import type { Place, PlaceOfWorship, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import religiousSites from '../../data/religious-sites.json' with { type: 'json' };
import type { ReligiousBuildingInput, ReligiousSiteEntry } from './types';

const SITES = religiousSites as unknown as Record<string, ReligiousSiteEntry>;

/**
 * @throws Error if siteId is not in the dictionary
 */
export function buildReligiousBuilding(
  i: ReligiousBuildingInput,
): WithContext<PlaceOfWorship> | WithContext<Place> {
  const site = SITES[i.siteId];
  if (!site) {
    throw new Error(`Unknown religious site: ${i.siteId}`);
  }

  const url = canonicalUrl(i.slug, i.lang);

  // Contested → Place (avoids partisan framing per PITFALLS §3.1)
  const type: 'Place' | 'PlaceOfWorship' = site.contested
    ? 'Place'
    : 'PlaceOfWorship';

  // Resolve primary name for this locale (fallback to EN if missing).
  const primaryName: string = site.name[i.lang] ?? site.name.en;
  // Resolve alternate name for this locale.
  const altForLocale = site.alternateName[i.lang];

  // For contested sites, pair on first reference: "Primary / Alternate".
  const name: string =
    site.contested && altForLocale ? `${primaryName} / ${altForLocale}` : primaryName;

  // alternateName aggregates ALL paired translations (he/en/ar), filtered.
  const altCollected: string[] = [];
  if (site.alternateName.he) altCollected.push(site.alternateName.he);
  if (site.alternateName.en) altCollected.push(site.alternateName.en);
  if (site.alternateName.ar) altCollected.push(site.alternateName.ar);
  // Include name in OTHER locales so the alternate-name array reflects cross-lingual
  // pairing (AUD-018: every contested site has paired naming surfaced as alternateName).
  if (i.lang !== 'he' && site.name.he) altCollected.push(site.name.he);
  if (i.lang !== 'en' && site.name.en) altCollected.push(site.name.en);
  if (site.name.ar && !altCollected.includes(site.name.ar)) altCollected.push(site.name.ar);
  // De-dupe (preserve order of first occurrence).
  const alternateName: string[] = Array.from(new Set(altCollected));

  // Shared base.
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#religious-site`,
    name,
    alternateName,
    inLanguage: i.lang,
    url,
  };

  if (i.description !== undefined) {
    base['description'] = i.description;
  }
  if (i.images !== undefined && i.images.length > 0) {
    base['image'] = i.images;
  }

  // Wikidata cross-reference (SEO-02 supplemental).
  if (site.wikidataId) {
    base['sameAs'] = [`https://www.wikidata.org/wiki/${site.wikidataId}`];
  }

  // Religious metadata only on non-contested sites (avoids partisan framing).
  if (!site.contested) {
    if (site.religion) {
      base['religion'] = site.religion;
    }
    // `religiousOrder` only emitted for non-contested + non-null denomination.
    if (site.denomination) {
      base['religiousOrder'] = site.denomination;
    }
  }

  // Carry administrative status as an `additionalProperty` for AUD-020 enforcement
  // by downstream tooling (plan 09 NER / audit). Schema.org allows this on Thing.
  if (site.administrativeStatus) {
    base['additionalProperty'] = {
      '@type': 'PropertyValue',
      name: 'administrativeStatus',
      value: site.administrativeStatus,
    };
  }

  return base as unknown as WithContext<PlaceOfWorship> | WithContext<Place>;
}
