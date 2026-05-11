/**
 * Shared input prop shapes for schema generators.
 *
 * Per RESEARCH §1.6, schema generators are typed by `schema-dts`; this file
 * defines the application-side input contracts (what the caller passes in).
 *
 * Plain TS interfaces — Zod validation can be layered on per builder if needed,
 * but is intentionally not enforced at the type level to keep generators simple.
 */
import type { Locale } from '../../i18n-config';

export type SchemaLang = Locale;

export interface BaseInput {
  slug: string;
  name: string;
  description: string;
  lang: SchemaLang;
}

export interface TouristDestinationInput extends BaseInput {
  lat: number;
  lng: number;
  images: string[];
  attractions: Array<{ slug: string; name: string }>;
}

export interface TouristAttractionInput extends BaseInput {
  images: string[];
}

export interface PlaceInput extends BaseInput {
  lat?: number;
  lng?: number;
  image?: string | string[];
}

export interface LocalBusinessAddress {
  streetAddress?: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
}

export interface LocalBusinessInput extends BaseInput {
  address: LocalBusinessAddress;
  telephone?: string;
  priceRange?: string;
  image?: string | string[];
}

export interface BreadcrumbSegment {
  slug: string;
  name: string;
}

export interface BreadcrumbInput {
  lang: SchemaLang;
  segments: BreadcrumbSegment[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqInput {
  slug: string;
  lang: SchemaLang;
  questions: FaqItem[];
}

export interface WebSiteInput {
  lang: SchemaLang;
  name: string;
}

export interface CollectionPageInput extends BaseInput {
  image?: string | string[];
}

export interface ReligiousBuildingInput {
  siteId: string;
  slug: string;
  lang: SchemaLang;
  description?: string;
  images?: string[];
}

/**
 * Religious site dictionary entry shape — matches data/religious-sites.json.
 *
 * `contested = true` triggers paired-naming rendering ("Temple Mount / Haram al-Sharif")
 * AND forces @type = 'Place' (rather than 'ReligiousBuilding') per ARCHITECTURE §4.
 *
 * `administrativeStatus` is non-null for sites in disputed/PA-controlled areas;
 * downstream AUD-020 enforcement (plan 09) reads this for Bethlehem/Hebron/Jericho.
 */
export interface ReligiousSiteEntry {
  contested: boolean;
  name: { he: string; en: string; ar?: string };
  alternateName: { he?: string; en?: string; ar?: string };
  denomination: string | null;
  religion: string | null;
  wikidataId: string | null;
  administrativeStatus:
    | 'israel-proper'
    | 'east-jerusalem'
    | 'west-bank-paa'
    | 'west-bank-area-c'
    | 'golan-heights'
    | null;
  notes: string;
}
