/**
 * Central affiliate configuration — the ONLY place partner IDs live.
 *
 * Every affiliate URL on the site is built from these placeholders by the
 * link builders below. Nothing is hardcoded in pages or components, and the
 * raw partner URLs never appear in authored content. To go live, replace the
 * placeholder IDs here (or set the matching PUBLIC_* env vars) and every link
 * across the site updates automatically.
 */

/** Read an env override (Astro exposes PUBLIC_* to the build) or fall back. */
const env = (key: string, fallback: string): string => {
  const v = import.meta.env?.[key];
  return typeof v === 'string' && v.length > 0 ? v : fallback;
};

export const AFFILIATE_IDS = {
  BOOKING_AID: env('PUBLIC_BOOKING_AID', 'BOOKING_AID'),
  GYG_PARTNER_ID: env('PUBLIC_GYG_PARTNER_ID', 'GYG_PARTNER_ID'),
  VIATOR_ID: env('PUBLIC_VIATOR_ID', 'VIATOR_ID'),
  CIVITATIS_AID: env('PUBLIC_CIVITATIS_AID', 'CIVITATIS_AID'),
  SKYSCANNER_MARKER: env('PUBLIC_SKYSCANNER_MARKER', 'SKYSCANNER_MARKER'),
  RENTALCARS_AID: env('PUBLIC_RENTALCARS_AID', 'RENTALCARS_AID'),
  SAFETYWING_REF: env('PUBLIC_SAFETYWING_REF', 'SAFETYWING_REF'),
  STAY22_AID: env('PUBLIC_STAY22_AID', 'STAY22_AID'),
  AIRALO_REF: env('PUBLIC_AIRALO_REF', 'AIRALO_REF'),
  HOSTELWORLD_AID: env('PUBLIC_HOSTELWORLD_AID', 'HOSTELWORLD_AID'),
  ABRAHAM_TOURS_ID: env('PUBLIC_ABRAHAM_TOURS_ID', 'ABRAHAM_TOURS_ID'),
} as const;

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
  | 'abraham';

export interface PartnerMeta {
  id: Partner;
  label: string; // shown on the "via X" badge
  category: 'hotels' | 'tours' | 'flights' | 'car' | 'insurance' | 'esim';
}

export const PARTNERS: Record<Partner, PartnerMeta> = {
  booking: { id: 'booking', label: 'Booking.com', category: 'hotels' },
  getyourguide: { id: 'getyourguide', label: 'GetYourGuide', category: 'tours' },
  viator: { id: 'viator', label: 'Viator', category: 'tours' },
  civitatis: { id: 'civitatis', label: 'Civitatis', category: 'tours' },
  abraham: { id: 'abraham', label: 'Abraham Tours', category: 'tours' },
  skyscanner: { id: 'skyscanner', label: 'Skyscanner', category: 'flights' },
  rentalcars: { id: 'rentalcars', label: 'Rentalcars', category: 'car' },
  safetywing: { id: 'safetywing', label: 'SafetyWing', category: 'insurance' },
  stay22: { id: 'stay22', label: 'Stay22', category: 'hotels' },
  airalo: { id: 'airalo', label: 'Airalo', category: 'esim' },
  hostelworld: { id: 'hostelworld', label: 'Hostelworld', category: 'hotels' },
};

const q = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

/** Build a partner URL from the central config. */
export function affiliateUrl(
  partner: Partner,
  opts: { destination?: string; query?: string; productId?: string } = {},
): string {
  const dest = opts.destination ?? '';
  const search = opts.query ?? dest;
  switch (partner) {
    case 'booking':
      return `https://www.booking.com/searchresults.html?${q({
        aid: AFFILIATE_IDS.BOOKING_AID,
        ss: search,
      })}`;
    case 'getyourguide':
      return `https://www.getyourguide.com/s/?${q({
        partner_id: AFFILIATE_IDS.GYG_PARTNER_ID,
        q: search,
      })}`;
    case 'viator':
      return `https://www.viator.com/searchResults/all?${q({
        pid: AFFILIATE_IDS.VIATOR_ID,
        text: search,
      })}`;
    case 'civitatis':
      return `https://www.civitatis.com/en/search/?${q({
        aid: AFFILIATE_IDS.CIVITATIS_AID,
        q: search,
      })}`;
    case 'abraham':
      return `https://abrahamtours.com/?${q({
        ref: AFFILIATE_IDS.ABRAHAM_TOURS_ID,
        s: search,
      })}`;
    case 'skyscanner':
      return `https://www.skyscanner.net/transport/flights-to/tlv/?${q({
        associateid: AFFILIATE_IDS.SKYSCANNER_MARKER,
      })}`;
    case 'rentalcars':
      return `https://www.rentalcars.com/SearchResults.do?${q({
        affiliateCode: AFFILIATE_IDS.RENTALCARS_AID,
        location: dest,
      })}`;
    case 'safetywing':
      return `https://safetywing.com/nomad-insurance/?${q({
        referenceID: AFFILIATE_IDS.SAFETYWING_REF,
      })}`;
    case 'stay22':
      return `https://www.stay22.com/embed/${AFFILIATE_IDS.STAY22_AID}`;
    case 'airalo':
      return `https://www.airalo.com/israel-esim/?${q({
        ref: AFFILIATE_IDS.AIRALO_REF,
      })}`;
    case 'hostelworld':
      return `https://www.hostelworld.com/search?${q({
        aid: AFFILIATE_IDS.HOSTELWORLD_AID,
        search,
      })}`;
  }
}
