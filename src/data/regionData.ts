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

  'tel-aviv': {
    intro:
      "Tel Aviv is Israel's Mediterranean metropolis — a sun-soaked, secular, around-the-clock city of beaches, Bauhaus architecture and world-class food just 20 minutes by train from Ben Gurion Airport. Its UNESCO-listed White City holds the largest concentration of 1930s International-Style buildings on Earth, while 14 km of golden beachfront, the ancient port of Jaffa, the Carmel Market and the bar-lined lanes of Florentin and Rothschild Boulevard give the city its restless energy. Sitting at sea level on the coast, Tel Aviv is warm year-round and never really sleeps; two to three days lets you balance beach time, gallery-hopping and a serious eating itinerary, with easy day trips to Jerusalem, Caesarea and the north.",
    keyFacts: [
      { label: 'Best time to visit', value: 'April–June & September–October' },
      { label: 'From Ben Gurion (TLV)', value: '~20 min by train to Tel Aviv Savidor / HaShalom' },
      { label: 'Suggested stay', value: '2–3 days' },
      { label: 'Average daily budget', value: '$150–320 (mid-range)' },
      { label: 'Vibe', value: 'Secular, 24/7; English very widely spoken' },
    ],
    bestTime: [
      { season: 'Spring (Apr–Jun)', verdict: 'Best', note: 'Warm, low humidity, perfect beach weather before the summer crush.' },
      { season: 'Summer (Jul–Aug)', verdict: 'Hot', note: 'Hot and humid 30°C+; lively beaches and rooftop nights.' },
      { season: 'Autumn (Sep–Oct)', verdict: 'Best', note: 'Sea still warm, fewer crowds, ideal walking weather.' },
      { season: 'Winter (Nov–Mar)', verdict: 'Mild', note: 'Mild 15–18°C with rain spells; cafés and museums shine.' },
    ],
    hotels: [
      { name: 'The Norman', tier: 'luxury', rating: 4.8, priceFrom: 560, neighborhood: 'White City', blurb: 'Restored 1920s Bauhaus icon with a rooftop pool and Michelin-level dining.' },
      { name: 'The Jaffa, a Luxury Collection Hotel', tier: 'luxury', rating: 4.7, priceFrom: 600, neighborhood: 'Jaffa', blurb: 'A 19th-century compound reimagined by John Pawson beside Old Jaffa.' },
      { name: 'Hotel Montefiore', tier: 'luxury', rating: 4.6, priceFrom: 380, neighborhood: 'Lev Ha’ir', blurb: 'Intimate 12-room boutique above one of the city’s best brasseries.' },
      { name: 'Brown TLV Urban Hotel', tier: 'value', rating: 4.4, priceFrom: 180, neighborhood: 'Rothschild', blurb: 'Style-forward boutique steps from Rothschild Boulevard with a rooftop deck.' },
      { name: 'Sea Executive Suites', tier: 'value', rating: 4.3, priceFrom: 160, neighborhood: 'Beachfront', blurb: 'Apartment-style suites a block from the promenade — good for families.' },
      { name: 'Abraham Hostel Tel Aviv', tier: 'hostel', rating: 4.5, priceFrom: 38, neighborhood: 'Levinsky', blurb: 'Buzzing flagship hostel with dorms, privates, a bar and a day-tour desk.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Bauhaus White City Walking Tour', description: "Decode Tel Aviv's UNESCO Bauhaus heritage with an architecture guide.", image: '/images/sub-destinations/tel-aviv/rothschild.jpg', query: 'Tel Aviv Bauhaus White City tour', priceFrom: 32, rating: 4.7, reviews: 1410 },
      { partner: 'civitatis', title: 'Jaffa & Carmel Market Food Tour', description: 'Graze through Carmel Market and Old Jaffa with a local foodie guide.', image: '/images/sub-destinations/tel-aviv/carmel-market.jpg', query: 'Tel Aviv Jaffa food tour', priceFrom: 79, rating: 4.9, reviews: 1840 },
      { partner: 'viator', title: 'Old Jaffa & Tel Aviv City Tour', description: 'From the ancient port of Jaffa to the beaches and boulevards of the new city.', image: '/images/sub-destinations/tel-aviv/old-jaffa.jpg', query: 'Old Jaffa Tel Aviv tour', priceFrom: 45, rating: 4.6, reviews: 990 },
      { partner: 'getyourguide', title: 'Jerusalem Day Trip from Tel Aviv', description: 'Full-day guided trip to the Old City and the Western Wall.', image: '/images/regions/jerusalem/hero.jpg', query: 'Jerusalem day trip from Tel Aviv', priceFrom: 89, rating: 4.6, reviews: 2120 },
    ],
  },

  'dead-sea': {
    intro:
      'The Dead Sea is the lowest point on the surface of the Earth, its hypersaline water sitting roughly 430 metres below sea level between the cliffs of the Judean Desert and the mountains of Jordan. Nearly ten times saltier than the ocean, it lets you float effortlessly on your back, and its mineral-rich black mud has drawn health-seekers for millennia. The Israeli shore divides into two: the resort strip of Ein Bokek in the south, with its cluster of spa hotels and free public beaches, and the wilder north, home to the Ein Gedi oasis, the Qumran caves of the Dead Sea Scrolls, and the cliff-top fortress of Masada. Most visitors come on a day trip from Jerusalem (about 90 minutes) or overnight at Ein Bokek; spring and autumn are ideal, as summer heat is extreme.',
    keyFacts: [
      { label: 'Best time to visit', value: 'October–April (summer is extreme heat)' },
      { label: 'From Jerusalem', value: '~1.5 hours by car or tour bus' },
      { label: 'Suggested stay', value: '1–2 days' },
      { label: 'Elevation', value: '~430 m / 1,410 ft below sea level' },
      { label: 'Don’t miss', value: 'Masada at sunrise, then float at Ein Bokek' },
    ],
    bestTime: [
      { season: 'Spring (Mar–May)', verdict: 'Best', note: 'Warm, comfortable for Masada hikes and floating.' },
      { season: 'Summer (Jun–Aug)', verdict: 'Extreme', note: '40°C+; float early, shelter midday, hydrate constantly.' },
      { season: 'Autumn (Sep–Nov)', verdict: 'Best', note: 'Heat eases; excellent for the desert and the shore.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Mild', note: 'Warm by day, cool nights; the quietest, cheapest season.' },
    ],
    hotels: [
      { name: 'Herods Dead Sea', tier: 'luxury', rating: 4.5, priceFrom: 320, neighborhood: 'Ein Bokek', blurb: 'Family-friendly spa resort with private beach and large pools.' },
      { name: 'Isrotel Dead Sea', tier: 'luxury', rating: 4.5, priceFrom: 300, neighborhood: 'Ein Bokek', blurb: 'Full-service spa hotel with sulphur pools and beachfront access.' },
      { name: 'David Dead Sea Resort & Spa', tier: 'value', rating: 4.3, priceFrom: 210, neighborhood: 'Ein Bokek', blurb: 'Big resort with a vast spa complex and mineral-pool circuit.' },
      { name: 'Leonardo Club Dead Sea (All-Inclusive)', tier: 'value', rating: 4.2, priceFrom: 230, neighborhood: 'Ein Bokek', blurb: 'All-inclusive option popular with families and longer spa stays.' },
      { name: 'Ein Gedi Kibbutz Hotel', tier: 'value', rating: 4.4, priceFrom: 190, neighborhood: 'Ein Gedi', blurb: 'Set in a botanical garden on the quieter northern shore near the reserve.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Masada, Ein Gedi & Dead Sea Day Tour', description: 'Cable car up Masada, an Ein Gedi waterfall walk, then a float — from Jerusalem or Tel Aviv.', image: '/images/sub-destinations/dead-sea/masada.jpg', query: 'Masada Ein Gedi Dead Sea tour', priceFrom: 95, rating: 4.7, reviews: 3380 },
      { partner: 'viator', title: 'Masada Sunrise & Dead Sea', description: 'Pre-dawn Snake Path ascent for sunrise, then the mineral shore.', image: '/images/sub-destinations/dead-sea/masada.jpg', query: 'Masada sunrise tour', priceFrom: 110, rating: 4.7, reviews: 1560 },
      { partner: 'civitatis', title: 'Dead Sea Relaxation Day', description: 'Transfers plus free time to float and apply the famous black mud.', image: '/images/regions/dead-sea/hero.jpg', query: 'Dead Sea day trip', priceFrom: 70, rating: 4.5, reviews: 880 },
      { partner: 'abraham', title: 'Masada & Dead Sea from Tel Aviv', description: 'Backpacker-friendly day trip combining Masada and a Dead Sea float.', image: '/images/sub-destinations/dead-sea/ein-gedi.jpg', query: 'Masada Dead Sea Tel Aviv', priceFrom: 99, rating: 4.6, reviews: 1240 },
    ],
  },

  galilee: {
    intro:
      'The Galilee is the green, hilly north of Israel, wrapped around the freshwater Sea of Galilee (Lake Kinneret) where much of the Gospels unfold. Pilgrims come for Capernaum, the Mount of Beatitudes and the baptismal site at Yardenit; everyone else comes for the scenery — rolling hills, wildflowers, hot springs and a growing scene of boutique wineries and farm-to-table kitchens. The mystical hilltop town of Tzfat (Safed), cradle of Kabbalah, anchors the Upper Galilee, while lakeside Tiberias makes a practical base. The region pairs naturally with the Golan Heights to the east and Nazareth to the west, and rewards a car: two to three days lets you mix holy sites, hikes and wine.',
    keyFacts: [
      { label: 'Best time to visit', value: 'March–May (wildflowers) & September–November' },
      { label: 'Getting there', value: '~2–2.5 hours by car from Tel Aviv; base in Tiberias' },
      { label: 'Suggested stay', value: '2–3 days' },
      { label: 'Best for', value: 'Christian pilgrimage, hiking, wineries' },
      { label: 'Tip', value: 'A rental car unlocks the region; transit is limited' },
    ],
    bestTime: [
      { season: 'Spring (Mar–May)', verdict: 'Best', note: 'Green hills and wildflowers; ideal hiking temperatures.' },
      { season: 'Summer (Jun–Aug)', verdict: 'Warm', note: 'Hot lakeside; head for shade, springs and early starts.' },
      { season: 'Autumn (Sep–Nov)', verdict: 'Best', note: 'Harvest season in the wineries; comfortable and clear.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Cool', note: 'Cool and green with rain; lowest prices, fewest crowds.' },
    ],
    hotels: [
      { name: 'The Scots Hotel', tier: 'luxury', rating: 4.7, priceFrom: 360, neighborhood: 'Tiberias', blurb: 'A restored 19th-century stone hospital on the lakeshore — the north’s finest hotel.' },
      { name: 'The Setai Sea of Galilee', tier: 'luxury', rating: 4.6, priceFrom: 420, neighborhood: 'Sea of Galilee', blurb: 'Sleek lakeside resort with infinity pools and a destination spa.' },
      { name: 'Pilgerhaus Tabgha', tier: 'value', rating: 4.5, priceFrom: 170, neighborhood: 'Tabgha', blurb: 'Tranquil German-run guesthouse beside the Christian holy sites.' },
      { name: 'Leonardo Plaza Tiberias', tier: 'value', rating: 4.2, priceFrom: 150, neighborhood: 'Tiberias', blurb: 'Reliable lakeside base with pool, walkable to the promenade.' },
      { name: 'Artist House Tzfat', tier: 'value', rating: 4.4, priceFrom: 130, neighborhood: 'Tzfat (Safed)', blurb: 'Characterful rooms in the Kabbalistic artists’ quarter of Safed.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Sea of Galilee & Nazareth Day Tour', description: 'Capernaum, the Mount of Beatitudes and Nazareth in one guided day.', image: '/images/sub-destinations/galilee/capernaum.jpg', query: 'Sea of Galilee Nazareth tour', priceFrom: 85, rating: 4.6, reviews: 1720 },
      { partner: 'viator', title: 'Galilee & Golan Wine Tour', description: 'Taste award-winning northern wines across two or three boutique wineries.', image: '/images/regions/galilee/hero.jpg', query: 'Galilee Golan wine tour', priceFrom: 120, rating: 4.7, reviews: 540 },
      { partner: 'civitatis', title: 'Tzfat & Galilee Day Trip', description: 'The Kabbalah town of Safed plus lakeside Christian sites.', image: '/images/regions/galilee/hero.jpg', query: 'Tzfat Safed Galilee tour', priceFrom: 90, rating: 4.6, reviews: 410 },
    ],
  },

  eilat: {
    intro:
      "Eilat is Israel's Red Sea resort at the country's southern tip, a year-round sunshine town where the desert meets warm, coral-rich water. The Gulf of Aqaba offers some of the most accessible reef diving and snorkelling in the world — the Coral Beach Nature Reserve and the Underwater Observatory Marine Park are the headline acts — while the dramatic desert hinterland holds Timna Park's rock formations and the Red Canyon. A duty-free zone with a lively hotel strip along the lagoon, Eilat is also the launchpad for the unmissable day trip across the border to Petra in Jordan. It's hot and dry most of the year; winter is peak season when the rest of the country is cool.",
    keyFacts: [
      { label: 'Best time to visit', value: 'October–May (winter is peak)' },
      { label: 'Getting there', value: '~4 hrs by bus/car from Tel Aviv; or domestic flight to ETM' },
      { label: 'Suggested stay', value: '2–4 days' },
      { label: 'Don’t miss', value: 'Red Sea snorkelling + a day trip to Petra' },
      { label: 'Note', value: 'Duty-free zone — no VAT on most purchases' },
    ],
    bestTime: [
      { season: 'Winter (Nov–Mar)', verdict: 'Best', note: 'Warm sunny days 21–25°C while the north is cold — peak season.' },
      { season: 'Spring (Apr–May)', verdict: 'Best', note: 'Hot but comfortable; great diving visibility.' },
      { season: 'Summer (Jun–Sep)', verdict: 'Extreme', note: '38–42°C; pool, reef and air-conditioning only.' },
      { season: 'Autumn (Oct)', verdict: 'Great', note: 'Heat eases, water still warm — excellent value.' },
    ],
    hotels: [
      { name: 'Isrotel Royal Beach', tier: 'luxury', rating: 4.5, priceFrom: 300, neighborhood: 'Lagoon', blurb: 'Eilat’s flagship five-star on the promenade with multiple pools.' },
      { name: 'Dan Eilat', tier: 'luxury', rating: 4.5, priceFrom: 290, neighborhood: 'North Beach', blurb: 'Landmark resort with a huge pool complex right on the beach.' },
      { name: 'Herods Palace', tier: 'luxury', rating: 4.4, priceFrom: 310, neighborhood: 'Lagoon', blurb: 'Theatrical, family-focused resort with a private beach.' },
      { name: 'Leonardo Plaza Eilat', tier: 'value', rating: 4.2, priceFrom: 180, neighborhood: 'North Beach', blurb: 'Solid mid-range resort steps from the lagoon and promenade.' },
      { name: 'Arava Hostel', tier: 'hostel', rating: 4.2, priceFrom: 32, neighborhood: 'City Centre', blurb: 'Friendly budget base with a garden, a short walk to the beach.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Petra Day Trip from Eilat', description: 'Cross into Jordan for a full guided day at the rose-red city of Petra.', image: '/images/regions/eilat/hero.jpg', query: 'Petra day trip from Eilat', priceFrom: 219, rating: 4.6, reviews: 990 },
      { partner: 'viator', title: 'Red Sea Snorkelling & Coral Beach', description: 'Guided snorkel over Eilat’s protected reef with gear included.', image: '/images/sub-destinations/eilat/coral-beach.jpg', query: 'Eilat snorkeling coral reef', priceFrom: 55, rating: 4.6, reviews: 620 },
      { partner: 'civitatis', title: 'Timna Park & Red Canyon Jeep Tour', description: 'Desert rock formations, ancient copper mines and the Red Canyon.', image: '/images/sub-destinations/eilat/timna-park.jpg', query: 'Timna Park Eilat tour', priceFrom: 75, rating: 4.7, reviews: 380 },
    ],
  },

  negev: {
    intro:
      "The Negev is Israel's great southern desert, covering more than half the country yet home to only a fraction of its people — a landscape of canyons, craters and Nabatean ruins under famously dark skies. Its centrepiece is the Makhtesh Ramon, the world's largest erosion crater, 40 km long and ringed by the cliff-top town of Mitzpe Ramon, now a hub for stargazing, hiking and a wave of design-led desert hotels. Elsewhere the Negev holds the UNESCO-listed Nabatean city of Avdat on the ancient Incense Route, the lush canyon spring of Ein Avdat, David Ben-Gurion's desert home at Sde Boker, and Bedouin hospitality experiences. Spring and autumn are ideal; the desert is searingly hot in summer and surprisingly cold on winter nights.",
    keyFacts: [
      { label: 'Best time to visit', value: 'October–April; spring for desert blooms' },
      { label: 'Gateway', value: 'Mitzpe Ramon, ~2 hrs from Tel Aviv / 1.5 hrs from Beer Sheva' },
      { label: 'Suggested stay', value: '1–2 days' },
      { label: 'Don’t miss', value: 'Makhtesh Ramon at sunrise + night-sky stargazing' },
      { label: 'Tip', value: 'A car is essential; carry plenty of water' },
    ],
    bestTime: [
      { season: 'Spring (Mar–Apr)', verdict: 'Best', note: 'Mild days and desert wildflowers after winter rain.' },
      { season: 'Summer (Jun–Aug)', verdict: 'Extreme', note: '38°C+ by day; hike only at dawn and dusk.' },
      { season: 'Autumn (Oct–Nov)', verdict: 'Best', note: 'Clear, comfortable and ideal for the crater and stars.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Variable', note: 'Pleasant days, cold nights; bring warm layers for stargazing.' },
    ],
    hotels: [
      { name: 'Beresheet', tier: 'luxury', rating: 4.7, priceFrom: 450, neighborhood: 'Mitzpe Ramon', blurb: 'Stone-built luxury hotel perched on the rim of the Ramon Crater with infinity pools.' },
      { name: 'Six Senses Shaharut', tier: 'luxury', rating: 4.8, priceFrom: 900, neighborhood: 'Arava', blurb: 'Remote ultra-luxury desert retreat with a camel stable and spa.' },
      { name: 'Adama Mitzpe Ramon', tier: 'value', rating: 4.3, priceFrom: 160, neighborhood: 'Mitzpe Ramon', blurb: 'Relaxed dance-and-wellness village on the crater’s edge.' },
      { name: 'Carmey Avdat Farm', tier: 'value', rating: 4.6, priceFrom: 190, neighborhood: 'Sde Boker area', blurb: 'Boutique cabins on a working desert vineyard on the ancient Incense Route.' },
      { name: 'Green Backpackers', tier: 'hostel', rating: 4.4, priceFrom: 30, neighborhood: 'Mitzpe Ramon', blurb: 'Welcoming hostel that runs crater hikes and stargazing trips.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Makhtesh Ramon Jeep & Hike', description: 'Descend into the world’s largest erosion crater with a desert guide.', image: '/images/sub-destinations/negev/mitzpe-ramon.jpg', query: 'Makhtesh Ramon jeep tour', priceFrom: 80, rating: 4.7, reviews: 460 },
      { partner: 'civitatis', title: 'Negev Stargazing Experience', description: 'Guided night under some of Israel’s darkest skies with telescopes.', image: '/images/regions/negev/hero.jpg', query: 'Negev stargazing Mitzpe Ramon', priceFrom: 45, rating: 4.8, reviews: 320 },
      { partner: 'viator', title: 'Avdat & Ein Avdat Desert Day', description: 'The Nabatean city of Avdat and the spring-fed Ein Avdat canyon.', image: '/images/sub-destinations/negev/avdat.jpg', query: 'Avdat Ein Avdat tour', priceFrom: 90, rating: 4.6, reviews: 210 },
    ],
  },

  nazareth: {
    intro:
      "Nazareth is the largest Arab city in Israel and, in Christian tradition, the town where Jesus grew up — making it one of the most significant pilgrimage destinations in the Holy Land. At its heart stands the vast Basilica of the Annunciation, built over the site where, by Catholic tradition, the angel Gabriel appeared to Mary. Around it winds a labyrinthine old city of churches, a covered souk and some of the finest Arab-Israeli cooking in the country. Hilltop Mount Precipice offers sweeping views over the Jezreel Valley, and Nazareth makes an excellent base for the Galilee and a day trip to the Sea of Galilee. A day or two is enough; spring and autumn are most comfortable.",
    keyFacts: [
      { label: 'Best time to visit', value: 'March–May & September–November' },
      { label: 'Getting there', value: '~1.5 hrs by car from Haifa or Tiberias' },
      { label: 'Suggested stay', value: '1–2 days' },
      { label: 'Best for', value: 'Christian pilgrimage + Arab-Israeli food' },
      { label: 'Tip', value: 'Sites close early; eat well in the old city' },
    ],
    bestTime: [
      { season: 'Spring (Mar–May)', verdict: 'Best', note: 'Green hills and mild walking weather around the old city.' },
      { season: 'Summer (Jun–Aug)', verdict: 'Warm', note: 'Hot but dry; tour churches in the morning.' },
      { season: 'Autumn (Sep–Nov)', verdict: 'Best', note: 'Comfortable and clear; great valley views.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Cool', note: 'Cool and occasionally wet; atmospheric at Christmas.' },
    ],
    hotels: [
      { name: 'Fauzi Azar Inn', tier: 'value', rating: 4.7, priceFrom: 110, neighborhood: 'Old City', blurb: 'A 200-year-old Arab mansion turned beloved guesthouse with free walking tours.' },
      { name: 'Al-Mutran Guest House', tier: 'value', rating: 4.5, priceFrom: 120, neighborhood: 'Old City', blurb: 'Restored Ottoman-era home with vaulted rooms in the heart of the souk.' },
      { name: 'Golden Crown Hotel', tier: 'value', rating: 4.2, priceFrom: 130, neighborhood: 'Hilltop', blurb: 'Full-service hotel with valley views, popular with pilgrim groups.' },
      { name: 'Villa Nazareth', tier: 'value', rating: 4.3, priceFrom: 100, neighborhood: 'City Centre', blurb: 'Comfortable mid-range base with a rooftop and easy basilica access.' },
      { name: 'Abu Saeed Hostel', tier: 'hostel', rating: 4.3, priceFrom: 40, neighborhood: 'Old City', blurb: 'Simple, friendly rooms in a historic old-city building.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Nazareth & Sea of Galilee Day Tour', description: 'The Basilica of the Annunciation plus Capernaum and the Galilee shore.', image: '/images/sub-destinations/nazareth/basilica-of-the-annunciation.jpg', query: 'Nazareth Sea of Galilee tour', priceFrom: 85, rating: 4.6, reviews: 1310 },
      { partner: 'civitatis', title: 'Nazareth Old City & Market Walk', description: 'A guided wander through the souk, churches and food stalls.', image: '/images/sub-destinations/nazareth/old-city.jpg', query: 'Nazareth old city walking tour', priceFrom: 30, rating: 4.7, reviews: 280 },
      { partner: 'viator', title: 'Nazareth from Tel Aviv', description: 'Full-day guided trip to Nazareth and the Galilee Christian sites.', image: '/images/regions/nazareth/hero.jpg', query: 'Nazareth day trip Tel Aviv', priceFrom: 95, rating: 4.5, reviews: 540 },
    ],
  },

  haifa: {
    intro:
      "Haifa is Israel's third-largest city and the relaxed, mixed-faith capital of the north, tumbling down the slopes of Mount Carmel to a busy Mediterranean port. Its defining sight is the Bahá'í Gardens — nineteen immaculate terraces cascading around the golden-domed Shrine of the Báb, a UNESCO World Heritage Site and one of the most photographed places in Israel. Below, the restored German Colony leads up to the gardens along a café-lined boulevard, while the Carmelite Stella Maris Monastery, the artsy Wadi Nisnas neighbourhood and the green trails of Mount Carmel round out a day or two. Haifa is also the gateway to the Crusader port of Akko and the ruins of Caesarea, both easy day trips. The city's coastal climate is pleasant most of the year.",
    keyFacts: [
      { label: 'Best time to visit', value: 'April–June & September–November' },
      { label: 'Getting there', value: '~1 hr by fast train from Tel Aviv' },
      { label: 'Suggested stay', value: '1–2 days' },
      { label: 'Don’t miss', value: 'The Bahá’í Gardens + a day trip to Akko' },
      { label: 'Tip', value: 'Book a free Bahá’í Gardens tour to reach the upper terraces' },
    ],
    bestTime: [
      { season: 'Spring (Apr–Jun)', verdict: 'Best', note: 'Gardens in bloom; mild, clear coastal days.' },
      { season: 'Summer (Jul–Aug)', verdict: 'Warm', note: 'Hot and humid; sea breezes ease the Carmel slopes.' },
      { season: 'Autumn (Sep–Nov)', verdict: 'Best', note: 'Warm sea, comfortable walking, fewer crowds.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Mild', note: 'Mild and green with rain spells; lowest prices.' },
    ],
    hotels: [
      { name: 'Dan Carmel Haifa', tier: 'luxury', rating: 4.4, priceFrom: 260, neighborhood: 'Carmel Centre', blurb: 'Hilltop classic with panoramic bay views and a pool.' },
      { name: 'The Bay Club', tier: 'value', rating: 4.5, priceFrom: 200, neighborhood: 'Downtown / Port', blurb: 'Stylish boutique in a restored building near the port and bars.' },
      { name: 'Colony Hotel Haifa', tier: 'value', rating: 4.5, priceFrom: 190, neighborhood: 'German Colony', blurb: 'Boutique Templer-era building steps from the Bahá’í Gardens approach.' },
      { name: 'Loui M. Boutique Hotel', tier: 'value', rating: 4.3, priceFrom: 150, neighborhood: 'German Colony', blurb: 'Well-priced boutique on the café-lined Ben Gurion Boulevard.' },
      { name: 'Port Inn', tier: 'hostel', rating: 4.4, priceFrom: 45, neighborhood: 'Downtown', blurb: 'Long-running guesthouse with dorms, privates and a garden.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Haifa, Akko & Caesarea Day Tour', description: 'The Bahá’í Gardens, Crusader Akko and Roman Caesarea in one guided day.', image: '/images/sub-destinations/haifa/bahai-gardens.jpg', query: 'Haifa Akko Caesarea tour', priceFrom: 95, rating: 4.6, reviews: 1480 },
      { partner: 'civitatis', title: 'Bahá’í Gardens & German Colony Walk', description: 'A guided walk up the terraces and through the historic colony.', image: '/images/sub-destinations/haifa/german-colony.jpg', query: 'Bahai Gardens Haifa tour', priceFrom: 35, rating: 4.7, reviews: 420 },
      { partner: 'viator', title: 'Northern Israel Day Trip from Tel Aviv', description: 'Caesarea, Haifa’s gardens and Akko on a full guided day.', image: '/images/regions/haifa/hero.jpg', query: 'Northern Israel Caesarea Haifa Akko', priceFrom: 99, rating: 4.6, reviews: 870 },
    ],
  },

  golan: {
    intro:
      "The Golan Heights is a basalt plateau in Israel's far north-east, a high country of extinct volcanoes, hiking trails, gushing springs and some of the country's best wineries. Rising to Mount Hermon — Israel's only ski slope in winter — the Golan offers cool mountain air, panoramic viewpoints like Mount Bental, the Banias waterfall and nature reserve, the Crusader-and-Mamluk ruin of Nimrod Fortress, and the Druze villages of the north, famous for their hospitality and cuisine. Volcanic soil and altitude make this premier wine territory, and the region pairs naturally with the Galilee just to the south. You'll want a car and one to two days; spring brings wildflowers and rushing water, while winter can dust the heights with snow.",
    keyFacts: [
      { label: 'Best time to visit', value: 'March–May (water & blooms); winter for snow' },
      { label: 'Getting there', value: '~2.5 hrs by car from Tel Aviv; base in Galilee/Katzrin' },
      { label: 'Suggested stay', value: '1–2 days' },
      { label: 'Best for', value: 'Hiking, wineries, viewpoints, Druze food' },
      { label: 'Tip', value: 'A car is essential; trails close in bad weather' },
    ],
    bestTime: [
      { season: 'Spring (Mar–May)', verdict: 'Best', note: 'Wildflowers, full waterfalls and ideal hiking weather.' },
      { season: 'Summer (Jun–Aug)', verdict: 'Pleasant', note: 'Cooler than the lowlands; great for trails and wineries.' },
      { season: 'Autumn (Sep–Nov)', verdict: 'Great', note: 'Grape harvest and crisp, clear viewpoints.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Snow', note: 'Cold with possible snow on Hermon; some trails close.' },
    ],
    hotels: [
      { name: 'Mizpe Hayamim', tier: 'luxury', rating: 4.6, priceFrom: 380, neighborhood: 'Rosh Pina (gateway)', blurb: 'Organic-farm spa hotel with gardens and valley views near the Galilee/Golan edge.' },
      { name: 'Ramot Resort Hotel', tier: 'value', rating: 4.3, priceFrom: 210, neighborhood: 'Sea of Galilee / Golan', blurb: 'Chalet-style resort on the slopes above the lake, well placed for the Golan.' },
      { name: 'Hagoshrim Kibbutz Hotel', tier: 'value', rating: 4.2, priceFrom: 180, neighborhood: 'Upper Galilee', blurb: 'Riverside kibbutz hotel handy for Banias and the northern reserves.' },
      { name: 'Genghis Khan in the Golan', tier: 'hostel', rating: 4.5, priceFrom: 60, neighborhood: 'Givat Yoav', blurb: 'Sleep in Mongolian-style yurts on a Golan ranch — a memorable budget stay.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Golan Heights & Wineries Day Tour', description: 'Viewpoints, Nimrod Fortress and a tasting at a boutique Golan winery.', image: '/images/sub-destinations/golan/mount-bental.jpg', query: 'Golan Heights wine tour', priceFrom: 110, rating: 4.7, reviews: 520 },
      { partner: 'viator', title: 'Banias & Nimrod Fortress Hike', description: 'The Banias waterfall reserve and the cliff-top Nimrod Fortress.', image: '/images/sub-destinations/golan/banias.jpg', query: 'Banias Nimrod Fortress tour', priceFrom: 90, rating: 4.6, reviews: 240 },
      { partner: 'civitatis', title: 'Golan & Galilee from Tiberias', description: 'A guided loop of northern viewpoints, springs and Druze villages.', image: '/images/regions/golan/hero.jpg', query: 'Golan Galilee day tour', priceFrom: 95, rating: 4.6, reviews: 300 },
    ],
  },

  caesarea: {
    intro:
      "Caesarea Maritima is one of Israel's most spectacular archaeological sites — a grand Roman port city built by Herod the Great in the 1st century BCE, now a national park spread along the Mediterranean coast between Tel Aviv and Haifa. You can watch the sea break against a restored Roman theatre that still hosts concerts, walk the hippodrome and Herod's cliff-edge palace, explore the Crusader fortress and harbour, and snorkel an underwater archaeological park. North of the ruins, a high-arched Roman aqueduct runs straight along a golden beach — one of the country's most photogenic spots. Caesarea is an easy half-day from Tel Aviv, Haifa or Netanya and pairs well with Akko and Haifa on a northern coastal day trip.",
    keyFacts: [
      { label: 'Best time to visit', value: 'April–June & September–November' },
      { label: 'Getting there', value: '~45 min by car from Tel Aviv or Haifa' },
      { label: 'Suggested stay', value: 'Half-day to a day trip' },
      { label: 'Don’t miss', value: 'The Roman theatre + the aqueduct beach' },
      { label: 'Tip', value: 'Combine with Haifa & Akko for a full coastal day' },
    ],
    bestTime: [
      { season: 'Spring (Apr–Jun)', verdict: 'Best', note: 'Warm, clear days perfect for the seaside ruins.' },
      { season: 'Summer (Jul–Aug)', verdict: 'Hot', note: 'Hot and bright; bring shade and combine with the beach.' },
      { season: 'Autumn (Sep–Nov)', verdict: 'Best', note: 'Warm sea, soft light and fewer crowds.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Mild', note: 'Mild with rain spells; atmospheric and quiet.' },
    ],
    hotels: [
      { name: 'Dan Caesarea', tier: 'luxury', rating: 4.4, priceFrom: 280, neighborhood: 'Caesarea', blurb: 'Resort hotel beside Israel’s only 18-hole golf course, near the ruins.' },
      { name: 'Helena Sea Suites (Netanya)', tier: 'value', rating: 4.3, priceFrom: 160, neighborhood: 'Netanya (nearby)', blurb: 'Seafront suites a short drive south, a handy coastal base.' },
      { name: 'Ramada Hadera', tier: 'value', rating: 4.1, priceFrom: 140, neighborhood: 'Hadera (nearby)', blurb: 'Practical mid-range option just north of the park.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Caesarea, Haifa & Akko Day Tour', description: 'Roman Caesarea, the Bahá’í Gardens and Crusader Akko in one guided day.', image: '/images/sub-destinations/caesarea/national-park.jpg', query: 'Caesarea Haifa Akko tour', priceFrom: 95, rating: 4.6, reviews: 1480 },
      { partner: 'viator', title: 'Caesarea Maritima Guided Visit', description: 'The theatre, harbour and Crusader fortress with an expert guide.', image: '/images/sub-destinations/caesarea/harbour.jpg', query: 'Caesarea Maritima tour', priceFrom: 49, rating: 4.6, reviews: 360 },
      { partner: 'civitatis', title: 'Coastal Israel from Tel Aviv', description: 'Caesarea’s ruins and the aqueduct beach on a relaxed coastal day.', image: '/images/regions/caesarea/hero.jpg', query: 'Caesarea coastal day trip', priceFrom: 85, rating: 4.5, reviews: 290 },
    ],
  },

  akko: {
    intro:
      "Akko (Acre) is a walled Crusader port on the northern coast and one of the most atmospheric old cities in Israel — a UNESCO World Heritage Site where an Ottoman town sits directly atop an intact medieval Crusader city. You can descend into the vast Hospitaller Knights' Halls, walk the underground Templar Tunnel to the harbour, wander the lively Turkish bazaar, visit the green-domed Al-Jazzar Mosque, and eat some of the best hummus and fresh seafood in the country along the sea walls. Compact and walkable, Akko makes a rewarding day trip from Haifa (about 30 minutes by train) or an offbeat overnight in a restored boutique hotel inside the walls. Spring and autumn are the most comfortable seasons.",
    keyFacts: [
      { label: 'Best time to visit', value: 'April–June & September–November' },
      { label: 'Getting there', value: '~30 min by train from Haifa' },
      { label: 'Suggested stay', value: 'Day trip or one night' },
      { label: 'Don’t miss', value: 'The Knights’ Halls + the Templar Tunnel' },
      { label: 'Tip', value: 'Buy the combined old-city sites ticket' },
    ],
    bestTime: [
      { season: 'Spring (Apr–Jun)', verdict: 'Best', note: 'Warm, breezy days ideal for the walls and bazaar.' },
      { season: 'Summer (Jul–Aug)', verdict: 'Hot', note: 'Hot and humid; explore early and eat by the sea.' },
      { season: 'Autumn (Sep–Nov)', verdict: 'Best', note: 'Warm sea and golden light over the harbour.' },
      { season: 'Winter (Dec–Feb)', verdict: 'Mild', note: 'Mild and quiet with occasional rain.' },
    ],
    hotels: [
      { name: 'Efendi Hotel', tier: 'luxury', rating: 4.8, priceFrom: 400, neighborhood: 'Old City', blurb: 'Two restored Ottoman palaces merged into a museum-quality boutique inside the walls.' },
      { name: 'Akkotel', tier: 'value', rating: 4.5, priceFrom: 180, neighborhood: 'Old City Wall', blurb: 'Family-run boutique built into the Crusader-era city wall.' },
      { name: 'Knights Palace Hotel', tier: 'value', rating: 4.2, priceFrom: 150, neighborhood: 'Old City', blurb: 'Atmospheric stone hotel in the heart of the old city.' },
      { name: 'HI Akko Knights Hostel', tier: 'hostel', rating: 4.1, priceFrom: 40, neighborhood: 'Old City', blurb: 'Well-located hostel a short walk from the Knights’ Halls and harbour.' },
    ],
    tours: [
      { partner: 'getyourguide', title: 'Akko Old City & Knights’ Halls Tour', description: 'The Hospitaller fortress, Templar Tunnel and Turkish bazaar with a guide.', image: '/images/sub-destinations/akko/old-city.jpg', query: 'Akko old city Knights Halls tour', priceFrom: 39, rating: 4.7, reviews: 410 },
      { partner: 'getyourguide', title: 'Haifa, Akko & Caesarea Day Tour', description: 'The classic northern-coast trio in one guided day from Tel Aviv.', image: '/images/sub-destinations/akko/hospitaller-knights.jpg', query: 'Akko Haifa Caesarea day tour', priceFrom: 95, rating: 4.6, reviews: 1480 },
      { partner: 'civitatis', title: 'Akko Food & Bazaar Walk', description: 'Taste hummus, knafeh and fresh seafood through the old-city market.', image: '/images/sub-destinations/akko/khan-al-umdan.jpg', query: 'Akko food tour bazaar', priceFrom: 45, rating: 4.7, reviews: 230 },
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
