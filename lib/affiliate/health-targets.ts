// Partner test URLs for weekly affiliate-health cron (lives here so AFF-04
// "no hardcoded partner URLs outside lib/affiliate/**" rule allows them).
// Consumed by app/api/cron/affiliate-health/route.ts via HEAD requests.

export const HEALTH_CHECK_TARGETS: Record<string, string> = {
  booking: 'https://www.booking.com/index.en-gb.html',
  civitatis: 'https://www.civitatis.com/en/israel/',
  viator: 'https://www.viator.com/Israel/d52',
  getYourGuide: 'https://www.getyourguide.com/israel-l245/',
  rentalcars: 'https://www.rentalcars.com/en/country/il/',
  safetyWing: 'https://safetywing.com/nomad-insurance',
  skyscanner: 'https://www.skyscanner.net/transport/flights-to/tlv/',
  hostelworld: 'https://www.hostelworld.com/hostels/israel',
  discoverCars: 'https://www.discovercars.com/israel',
};
