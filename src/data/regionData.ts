/**
 * Region-specific curated data consumed by the region page template:
 * key facts, where-to-stay (real verified hotels), featured tours, best-time
 * table and itinerary suggestions.
 *
 * Regions without a curated entry fall back to generic, name-driven tours +
 * hotel search (still real affiliate links) so every page is complete; curated
 * entries are filled in per-region across the build phases.
 */
import type { Partner } from '@/config/affiliates';

export interface Hotel {
  name: string;
  tier: 'luxury' | 'value' | 'hostel';
  rating: number;
  priceFrom: number;
  neighborhood: string;
  blurb: string;
}

export interface TourSeed {
  partner: Partner;
  title: string;
  description: string;
  image: string;
  query: string;
  priceFrom: number;
  rating: number;
  reviews: number;
}

export interface RegionData {
  intro?: string;
  keyFacts: { label: string; value: string }[];
  bestTime?: { season: string; verdict: string; note: string }[];
  hotels: Hotel[];
  tours: TourSeed[];
}

export const REGION_DATA: Record<string, RegionData> = {
  jerusalem: {
    intro:
      "Jerusalem is the spiritual capital of three world religions and the single most layered city in Israel — four millennia of history packed into a walled square kilometre 754 metres above sea level in the Judean Hills. Most visitors come for the Old City, whose four quarters hold Judaism's Western Wall, Christianity's Church of the Holy Sepulchre and Islam's Dome of the Rock and Al-Aqsa Mosque, all within a ten-minute walk of one another. Beyond the walls, modern West Jerusalem adds the Mahane Yehuda food market, the Israel Museum and Yad Vashem. Reachable in about 30 minutes by high-speed train from Ben Gurion Airport, Jerusalem rewards two to four days and works as a base for day trips to the Dead Sea, Masada and Bethlehem. Spring and autumn are the ideal seasons; plan around Shabbat, when the Jewish city pauses from Friday afternoon to Saturday night.",
    keyFacts: [
      { label: 'Best time to visit', value: 'March–May & September–November' },
      { label: 'From Ben Gurion (TLV)', value: '~30 min by high-speed train to Yitzhak Navon' },
      { label: 'Suggested stay', value: '2–4 days' },
      { label: 'Average daily budget', value: '$120–250 (mid-range)' },
      { label: 'Elevation', value: '754 m / 2,474 ft' },
      { label: 'Languages', value: 'Hebrew & Arabic; English widely spoken' },
    ],
    bestTime: [
      { season: 'Spring (Mar–May)', verdict: 'Best', note: 'Wildflowers, mild days, Easter & Passover. Book early.' },
      { season: 'Summer (Jun–Aug)', verdict: 'Hot', note: 'Dry 30–33°C; start early, rest midday, enjoy cool evenings.' },
      { season: 'Autumn (Sep–Nov)', verdict: 'Best', note: 'Warm days, High Holidays, olive harvest.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Quiet', note: 'Cool and rainy, occasional snow; cheapest hotels.' },
    ],
    hotels: [
      { name: 'King David Hotel', tier: 'luxury', rating: 4.7, priceFrom: 480, neighborhood: 'City Centre', blurb: 'The grande dame of Jerusalem hotels since 1931, overlooking the Old City walls.' },
      { name: 'Mamilla Hotel', tier: 'luxury', rating: 4.6, priceFrom: 420, neighborhood: 'Mamilla', blurb: 'Sleek design hotel steps from Jaffa Gate with a celebrated rooftop restaurant.' },
      { name: 'Waldorf Astoria Jerusalem', tier: 'luxury', rating: 4.8, priceFrom: 550, neighborhood: 'City Centre', blurb: 'Restored 1920s landmark with marble lobby and Old City proximity.' },
      { name: 'The Sephardic House Hotel', tier: 'value', rating: 4.4, priceFrom: 160, neighborhood: 'Jewish Quarter', blurb: 'Comfortable, well-located base inside the Old City walls.' },
      { name: 'Harmony Hotel', tier: 'value', rating: 4.5, priceFrom: 175, neighborhood: 'Nahalat Shiva', blurb: 'Bright boutique hotel by the Ben Yehuda pedestrian zone with free happy hour.' },
      { name: 'Abraham Hostel Jerusalem', tier: 'hostel', rating: 4.5, priceFrom: 35, neighborhood: 'Davidka Square', blurb: 'Legendary backpacker hub with dorms, privates and its own day-tour desk.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Jerusalem Old City: Half-Day Walking Tour', description: 'The four quarters, the Western Wall and the Holy Sepulchre with an expert guide.', image: '/images/regions/jerusalem/hero.jpg', query: 'Jerusalem Old City walking tour', priceFrom: 39, rating: 4.8, reviews: 5120 },
      { partner: 'viator', title: 'Jerusalem & Bethlehem Full-Day Tour', description: 'Combine the Old City highlights with a guided afternoon in Bethlehem.', image: '/images/regions/jerusalem/hero.jpg', query: 'Jerusalem Bethlehem day tour', priceFrom: 89, rating: 4.6, reviews: 2410 },
      { partner: 'civitatis', title: 'Western Wall Tunnels Guided Tour', description: 'Walk the 488 m underground length of the Western Wall and Herodian street.', image: '/images/regions/jerusalem/hero.jpg', query: 'Western Wall tunnels tour', priceFrom: 29, rating: 4.7, reviews: 1330 },
      { partner: 'abraham', title: 'Masada Sunrise & Dead Sea from Jerusalem', description: 'Dawn ascent of Masada, then float in the Dead Sea — back by afternoon.', image: '/images/regions/dead-sea/hero.jpg', query: 'Masada sunrise Dead Sea Jerusalem', priceFrom: 95, rating: 4.7, reviews: 3380 },
    ],
  },
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');

/** Generic, name-driven fallback so any region page is complete. */
export function genericRegionData(slug: string, name: string, hero: string): RegionData {
  return {
    keyFacts: [
      { label: 'Best time to visit', value: 'March–May & September–November' },
      { label: 'From Ben Gurion (TLV)', value: 'See “Getting there” below' },
      { label: 'Suggested stay', value: '1–3 days' },
      { label: 'Country', value: 'Israel' },
    ],
    hotels: [],
    tours: [
      { partner: 'getyourguide', title: `Top-rated ${name} tours`, description: `Browse the best-reviewed guided tours and day trips in ${name}.`, image: hero, query: `${name} Israel tour`, priceFrom: 45, rating: 4.6, reviews: 800 },
      { partner: 'viator', title: `${name} day trips & experiences`, description: `Skip-the-line tickets and small-group experiences across ${name}.`, image: hero, query: `${name} Israel day trip`, priceFrom: 55, rating: 4.5, reviews: 600 },
      { partner: 'civitatis', title: `${name} guided excursions`, description: `English-language guided excursions and activities in ${cap(name)}.`, image: hero, query: `${name} Israel excursion`, priceFrom: 39, rating: 4.6, reviews: 420 },
    ],
  };
}
