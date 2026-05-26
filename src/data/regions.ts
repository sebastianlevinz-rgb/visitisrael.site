/**
 * The 11 Israel regions — single source for the home grid and primary nav.
 * English-only. Each region's hero lives at /images/regions/<slug>/hero.jpg
 * (real, free-licensed photography sourced via scripts/photos/fetch-commons.mjs).
 */
export interface Region {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  hero: string;
}

export const REGIONS: Region[] = [
  {
    slug: 'jerusalem',
    name: 'Jerusalem',
    tagline: "Israel's spiritual heart",
    blurb:
      'Old City quarters, the Western Wall and the Church of the Holy Sepulchre, with day trips to the Dead Sea.',
    hero: '/images/regions/jerusalem/hero.jpg',
  },
  {
    slug: 'tel-aviv',
    name: 'Tel Aviv',
    tagline: 'Mediterranean cool',
    blurb:
      'Golden beaches, Bauhaus architecture and a 24-hour food, art and nightlife scene.',
    hero: '/images/regions/tel-aviv/hero.jpg',
  },
  {
    slug: 'dead-sea',
    name: 'Dead Sea',
    tagline: 'The lowest place on Earth',
    blurb:
      'Float on mineral-rich water, climb Masada at sunrise and hike the Ein Gedi oasis.',
    hero: '/images/regions/dead-sea/hero.jpg',
  },
  {
    slug: 'galilee',
    name: 'Galilee',
    tagline: 'Green hills and holy water',
    blurb:
      'The Sea of Galilee, Christian pilgrimage routes, hilltop Tzfat and boutique wineries.',
    hero: '/images/regions/galilee/hero.jpg',
  },
  {
    slug: 'eilat',
    name: 'Eilat',
    tagline: 'Red Sea sunshine',
    blurb:
      'Coral-reef diving, year-round sun and a launchpad for day trips to Petra.',
    hero: '/images/regions/eilat/hero.jpg',
  },
  {
    slug: 'negev',
    name: 'Negev',
    tagline: 'Desert and stars',
    blurb:
      'The Makhtesh Ramon crater, Bedouin hospitality and ancient Nabatean trade routes.',
    hero: '/images/regions/negev/hero.jpg',
  },
  {
    slug: 'nazareth',
    name: 'Nazareth',
    tagline: "Jesus's hometown",
    blurb:
      'The Basilica of the Annunciation, a bustling old market and superb Arab-Israeli cuisine.',
    hero: '/images/regions/nazareth/hero.jpg',
  },
  {
    slug: 'haifa',
    name: 'Haifa',
    tagline: 'Gardens on the sea',
    blurb:
      'The terraced Bahá’í Gardens, the German Colony and the green slopes of Mount Carmel.',
    hero: '/images/regions/haifa/hero.jpg',
  },
  {
    slug: 'golan',
    name: 'Golan Heights',
    tagline: 'Volcanic high country',
    blurb:
      'Wineries, hiking trails, Nimrod Fortress and panoramic viewpoints over the north.',
    hero: '/images/regions/golan/hero.jpg',
  },
  {
    slug: 'caesarea',
    name: 'Caesarea',
    tagline: 'Roman ruins by the sea',
    blurb:
      'A Herodian harbour, a seaside Roman theatre and a Mediterranean aqueduct beach.',
    hero: '/images/regions/caesarea/hero.jpg',
  },
  {
    slug: 'akko',
    name: 'Akko (Acre)',
    tagline: 'Crusader port city',
    blurb:
      'A UNESCO-listed Old City, Crusader halls, Ottoman walls and a vibrant Turkish bazaar.',
    hero: '/images/regions/akko/hero.jpg',
  },
];

export const getRegion = (slug: string): Region | undefined =>
  REGIONS.find((r) => r.slug === slug);
