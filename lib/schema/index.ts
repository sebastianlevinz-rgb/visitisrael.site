/**
 * Barrel export — 11 schema generators + <JsonLd> component.
 *
 * Per ARCHITECTURE §4.1, the 11 generators cover the full content surface:
 *   - Organization      → root layout only (ARCHITECTURE §4.2)
 *   - TouristDestination → region canonicals (REGION_CANONICAL profile)
 *   - TouristAttraction  → sub-destination canonicals (SUB_DESTINATION profile)
 *   - ReligiousBuilding  → contested/non-contested holy sites (paired-naming)
 *   - Place              → generic / non-touristy entities (Masada, Mount Sodom)
 *   - LocalBusiness      → wineries, tour ops, guides (GUIDE_OR_WINERY profile)
 *   - BreadcrumbList     → every content page
 *   - FAQPage            → page-level FAQ blocks
 *   - WebSite            → homepage SearchAction
 *   - CollectionPage     → hub pages (HUB profile)
 *   - WebPage            → utility/legal fallback (UTILITY profile)
 */
export { getOrganizationSchema } from './organization';
export { buildTouristDestination } from './touristDestination';
export { buildTouristAttraction } from './touristAttraction';
export { buildReligiousBuilding } from './religiousBuilding';
export { buildPlace } from './place';
export { buildLocalBusiness } from './localBusiness';
export { buildBreadcrumb } from './breadcrumb';
export { buildFAQ } from './faq';
export { buildWebSite } from './webSite';
export { buildCollectionPage } from './collectionPage';
export { buildWebPage } from './webPage';
export { itinerarySchema } from './itinerary';
export type { ItinerarySchemaInput, ItineraryStopInput } from './itinerary';

// Re-export shared input types so callers get a single import surface.
export type {
  SchemaLang,
  BaseInput,
  TouristDestinationInput,
  TouristAttractionInput,
  PlaceInput,
  LocalBusinessInput,
  LocalBusinessAddress,
  BreadcrumbInput,
  BreadcrumbSegment,
  FaqInput,
  FaqItem,
  WebSiteInput,
  CollectionPageInput,
  ReligiousBuildingInput,
  ReligiousSiteEntry,
} from './types';
