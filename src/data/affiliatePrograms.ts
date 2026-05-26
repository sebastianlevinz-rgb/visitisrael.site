/**
 * Affiliate-program registry for the internal dashboard: where to sign up for
 * each partner and the current activation status. The live link IDs live in
 * src/config/affiliates.ts — this is the operator's to-do list for getting
 * approved and pasting the real IDs in.
 */
export interface AffiliateProgram {
  partner: string;
  category: 'Hotels' | 'Tours' | 'Flights' | 'Car' | 'Insurance' | 'eSIM' | 'Hostels';
  signupUrl: string;
  idKey: string; // matching key in AFFILIATE_IDS
  status: 'pending' | 'applied' | 'live';
  notes: string;
}

export const AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  { partner: 'Booking.com', category: 'Hotels', signupUrl: 'https://www.booking.com/affiliate-program/v2/index.html', idKey: 'BOOKING_AID', status: 'pending', notes: 'Apply for an affiliate partner ID (AID); large hotel inventory in Israel.' },
  { partner: 'Stay22', category: 'Hotels', signupUrl: 'https://www.stay22.com/partners', idKey: 'STAY22_AID', status: 'pending', notes: 'Interactive hotel map widget; aggregates Booking/Expedia/Airbnb.' },
  { partner: 'GetYourGuide', category: 'Tours', signupUrl: 'https://partner.getyourguide.com/', idKey: 'GYG_PARTNER_ID', status: 'pending', notes: 'Strong Israel tour inventory; partner_id from the partner portal.' },
  { partner: 'Viator', category: 'Tours', signupUrl: 'https://www.viator.com/partner/affiliateProgram', idKey: 'VIATOR_ID', status: 'pending', notes: 'Tripadvisor-owned; apply via Viator/Partnerize for a PID.' },
  { partner: 'Civitatis', category: 'Tours', signupUrl: 'https://www.civitatis.com/en/affiliates/', idKey: 'CIVITATIS_AID', status: 'pending', notes: 'Spanish-language-strong but good English tours; aid parameter.' },
  { partner: 'Abraham Tours', category: 'Tours', signupUrl: 'https://abrahamtours.com/affiliates/', idKey: 'ABRAHAM_TOURS_ID', status: 'pending', notes: 'Israel/Palestine specialist day tours and hostels; backpacker audience.' },
  { partner: 'Skyscanner', category: 'Flights', signupUrl: 'https://www.partners.skyscanner.net/affiliates', idKey: 'SKYSCANNER_MARKER', status: 'pending', notes: 'Flight meta-search; usually via Travelpayouts; marker/associate ID.' },
  { partner: 'Rentalcars', category: 'Car', signupUrl: 'https://www.rentalcars.com/Affiliate.do', idKey: 'RENTALCARS_AID', status: 'pending', notes: 'Booking-owned car rental; essential for Galilee/Golan/Negev pages.' },
  { partner: 'SafetyWing', category: 'Insurance', signupUrl: 'https://safetywing.com/affiliates', idKey: 'SAFETYWING_REF', status: 'pending', notes: 'Nomad travel-medical insurance; recurring commissions.' },
  { partner: 'Airalo', category: 'eSIM', signupUrl: 'https://www.airalo.com/affiliate-program', idKey: 'AIRALO_REF', status: 'pending', notes: 'Israel eSIM data plans; via Partnerize.' },
  { partner: 'Hostelworld', category: 'Hostels', signupUrl: 'https://www.hostelworld.com/affiliateprogram', idKey: 'HOSTELWORLD_AID', status: 'pending', notes: 'Hostels (Abraham, etc.); budget audience.' },
];
