/**
 * Central affiliate configuration — the ONLY place partner IDs live.
 *
 * Every affiliate URL on the site is built here. Nothing is hardcoded in pages
 * or components.
 *
 * Two modes, both loud, never a third:
 *
 *  - PRE-APPROVAL (default, `PUBLIC_AFFILIATE_MODE` unset or "pre"): partners
 *    whose ID is missing get a CLEAN link — no affiliate parameter at all. An
 *    honest link that earns nothing. `scripts/qa/affiliate-guard.mjs` prints
 *    "MODO PRE-AFILIADO — N links sin monetizar" on every build.
 *
 *  - PRODUCTION (`PUBLIC_AFFILIATE_MODE=production`): a missing ID for any partner
 *    the site links to throws, and the build fails.
 *
 * Forbidden: a placeholder ID such as `aid=BOOKING_AID`. It looks real, works,
 * breaks nothing and earns nothing. The previous site served exactly that on
 * 2,018 pages for two months. The build guard fails if a placeholder is served.
 */

export type AffiliateMode = 'pre' | 'production';

const readEnv = (key: string): string => {
  const v = import.meta.env?.[key];
  return typeof v === 'string' ? v.trim() : '';
};

export const AFFILIATE_MODE: AffiliateMode =
  readEnv('PUBLIC_AFFILIATE_MODE') === 'production' ? 'production' : 'pre';

/** Real IDs from env vars. Empty string = not approved yet. No placeholders. */
export const AFFILIATE_IDS = {
  BOOKING_AID: readEnv('PUBLIC_BOOKING_AID'),
  GYG_PARTNER_ID: readEnv('PUBLIC_GYG_PARTNER_ID'),
  VIATOR_ID: readEnv('PUBLIC_VIATOR_ID'),
  CIVITATIS_AID: readEnv('PUBLIC_CIVITATIS_AID'),
  SKYSCANNER_MARKER: readEnv('PUBLIC_SKYSCANNER_MARKER'),
  RENTALCARS_AID: readEnv('PUBLIC_RENTALCARS_AID'),
  SAFETYWING_REF: readEnv('PUBLIC_SAFETYWING_REF'),
  STAY22_AID: readEnv('PUBLIC_STAY22_AID'),
  AIRALO_REF: readEnv('PUBLIC_AIRALO_REF'),
  HOSTELWORLD_AID: readEnv('PUBLIC_HOSTELWORLD_AID'),
  ABRAHAM_TOURS_ID: readEnv('PUBLIC_ABRAHAM_TOURS_ID'),
  TOURRADAR_AID: readEnv('PUBLIC_TOURRADAR_AID'),
  WELCOMEPICKUPS_REF: readEnv('PUBLIC_WELCOMEPICKUPS_REF'),
  KIWITAXI_MARKER: readEnv('PUBLIC_KIWITAXI_MARKER'),
  DISCOVERCARS_AID: readEnv('PUBLIC_DISCOVERCARS_AID'),
  TIQETS_PARTNER: readEnv('PUBLIC_TIQETS_PARTNER'),
  AMAZON_ASSOCIATE_TAG: readEnv('PUBLIC_AMAZON_ASSOCIATE_TAG'),
  INSUREMYTRIP_AID: readEnv('PUBLIC_INSUREMYTRIP_AID'),
  SQUAREMOUTH_AID: readEnv('PUBLIC_SQUAREMOUTH_AID'),
} as const;

type IdKey = keyof typeof AFFILIATE_IDS;

export type Partner =
  | 'booking'
  | 'getyourguide'
  | 'viator'
  | 'civitatis'
  | 'skyscanner'
  | 'rentalcars'
  | 'safetywing'
  | 'stay22'
  | 'airalo'
  | 'hostelworld'
  | 'abraham'
  | 'tourradar'
  | 'welcomepickups'
  | 'kiwitaxi'
  | 'discovercars'
  | 'tiqets'
  | 'insuremytrip'
  | 'squaremouth';

export interface PartnerMeta {
  id: Partner;
  label: string; // shown on the "via X" badge
  idKey: IdKey;
  category:
    | 'hotels'
    | 'tours'
    | 'flights'
    | 'car'
    | 'insurance'
    | 'esim'
    | 'packages'
    | 'transfers'
    | 'tickets';
}

export const PARTNERS: Record<Partner, PartnerMeta> = {
  booking: { id: 'booking', label: 'Booking.com', idKey: 'BOOKING_AID', category: 'hotels' },
  getyourguide: { id: 'getyourguide', label: 'GetYourGuide', idKey: 'GYG_PARTNER_ID', category: 'tours' },
  viator: { id: 'viator', label: 'Viator', idKey: 'VIATOR_ID', category: 'tours' },
  civitatis: { id: 'civitatis', label: 'Civitatis', idKey: 'CIVITATIS_AID', category: 'tours' },
  abraham: { id: 'abraham', label: 'Abraham Tours', idKey: 'ABRAHAM_TOURS_ID', category: 'tours' },
  skyscanner: { id: 'skyscanner', label: 'Skyscanner', idKey: 'SKYSCANNER_MARKER', category: 'flights' },
  rentalcars: { id: 'rentalcars', label: 'Rentalcars', idKey: 'RENTALCARS_AID', category: 'car' },
  safetywing: { id: 'safetywing', label: 'SafetyWing', idKey: 'SAFETYWING_REF', category: 'insurance' },
  stay22: { id: 'stay22', label: 'Stay22', idKey: 'STAY22_AID', category: 'hotels' },
  airalo: { id: 'airalo', label: 'Airalo', idKey: 'AIRALO_REF', category: 'esim' },
  hostelworld: { id: 'hostelworld', label: 'Hostelworld', idKey: 'HOSTELWORLD_AID', category: 'hotels' },
  tourradar: { id: 'tourradar', label: 'TourRadar', idKey: 'TOURRADAR_AID', category: 'packages' },
  welcomepickups: { id: 'welcomepickups', label: 'Welcome Pickups', idKey: 'WELCOMEPICKUPS_REF', category: 'transfers' },
  kiwitaxi: { id: 'kiwitaxi', label: 'Kiwitaxi', idKey: 'KIWITAXI_MARKER', category: 'transfers' },
  discovercars: { id: 'discovercars', label: 'DiscoverCars', idKey: 'DISCOVERCARS_AID', category: 'car' },
  tiqets: { id: 'tiqets', label: 'Tiqets', idKey: 'TIQETS_PARTNER', category: 'tickets' },
  insuremytrip: { id: 'insuremytrip', label: 'InsureMyTrip', idKey: 'INSUREMYTRIP_AID', category: 'insurance' },
  squaremouth: { id: 'squaremouth', label: 'Squaremouth', idKey: 'SQUAREMOUTH_AID', category: 'insurance' },
};

/** True once the partner's real ID has been configured. */
export function hasAffiliateId(partner: Partner): boolean {
  return AFFILIATE_IDS[PARTNERS[partner].idKey].length > 0;
}

/**
 * The partner's ID, or '' in pre-approval mode. In production mode a missing ID
 * throws, which fails the static build.
 */
function idFor(partner: Partner): string {
  const { idKey, label } = PARTNERS[partner];
  const id = AFFILIATE_IDS[idKey];
  if (!id && AFFILIATE_MODE === 'production') {
    throw new Error(
      `[affiliates] PUBLIC_AFFILIATE_MODE=production pero falta PUBLIC_${idKey} (${label}). ` +
        'Cargá el ID real en Vercel o volvé a modo pre-aprobación.',
    );
  }
  return id;
}

/** Query string that includes the affiliate param only when a real ID exists. */
function qs(params: Record<string, string>, idParam?: [string, string]): string {
  const all: Record<string, string> = {};
  if (idParam && idParam[1]) all[idParam[0]] = idParam[1];
  for (const [k, v] of Object.entries(params)) if (v) all[k] = v;
  const s = new URLSearchParams(all).toString();
  return s ? `?${s}` : '';
}

/** Build a partner URL from the central config. */
export function affiliateUrl(
  partner: Partner,
  opts: { destination?: string; query?: string; productId?: string } = {},
): string {
  const dest = opts.destination ?? '';
  const search = opts.query ?? dest;
  const id = idFor(partner);
  switch (partner) {
    case 'booking':
      return `https://www.booking.com/searchresults.html${qs({ ss: search }, ['aid', id])}`;
    case 'getyourguide':
      return `https://www.getyourguide.com/s/${qs({ q: search }, ['partner_id', id])}`;
    case 'viator':
      return `https://www.viator.com/searchResults/all${qs({ text: search }, ['pid', id])}`;
    case 'civitatis':
      return `https://www.civitatis.com/en/search/${qs({ q: search }, ['aid', id])}`;
    case 'abraham':
      return `https://abrahamtours.com/${qs({ s: search }, ['ref', id])}`;
    case 'skyscanner':
      return `https://www.skyscanner.net/transport/flights-to/tlv/${qs({}, ['associateid', id])}`;
    case 'rentalcars':
      return `https://www.rentalcars.com/SearchResults.do${qs({ location: dest }, ['affiliateCode', id])}`;
    case 'safetywing':
      return `https://safetywing.com/nomad-insurance/${qs({}, ['referenceID', id])}`;
    case 'stay22':
      return id ? `https://www.stay22.com/embed/${id}` : 'https://www.stay22.com/';
    case 'airalo':
      return `https://www.airalo.com/israel-esim/${qs({}, ['ref', id])}`;
    case 'hostelworld':
      return `https://www.hostelworld.com/search${qs({ search }, ['aid', id])}`;
    case 'tourradar':
      return `https://www.tourradar.com/d/israel${qs({ q: search }, ['a_aid', id])}`;
    case 'welcomepickups':
      return `https://www.welcomepickups.com/israel/${qs({}, ['ref', id])}`;
    case 'kiwitaxi':
      return `https://kiwitaxi.com/${qs({}, ['marker', id])}`;
    case 'discovercars':
      return `https://www.discovercars.com/israel${qs({ city: dest }, ['a_aid', id])}`;
    case 'tiqets':
      return `https://www.tiqets.com/en/search${qs({ q: search }, ['partner', id])}`;
    case 'insuremytrip':
      return `https://www.insuremytrip.com/search-results/${qs({ destination: 'Israel' }, ['affiliateID', id])}`;
    case 'squaremouth':
      return `https://www.squaremouth.com/search/${qs({ destination: 'Israel' }, ['affiliateID', id])}`;
  }
}

/** Build an Amazon product search URL; the associate tag only when configured. */
export function amazonSearchUrl(keywords: string): string {
  const tag = AFFILIATE_IDS.AMAZON_ASSOCIATE_TAG;
  if (!tag && AFFILIATE_MODE === 'production') {
    throw new Error('[affiliates] PUBLIC_AFFILIATE_MODE=production pero falta PUBLIC_AMAZON_ASSOCIATE_TAG.');
  }
  return `https://www.amazon.com/s${qs({ k: keywords }, ['tag', tag])}`;
}
