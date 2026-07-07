import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/fr/',
  '/de/',
  '/fr/plan-your-trip',
  '/de/plan-your-trip',
  '/jerusalem',
  '/jerusalem/western-wall',
  '/itineraries',
  '/itineraries/7-days-in-israel',
  '/itineraries/14-days-in-israel',
  '/itineraries/3-days-in-jerusalem',
  '/itineraries/2-days-in-tel-aviv',
  '/first-time-in-israel',
  '/israeli-food-cuisine-guide',
  '/best-holy-land-tours',
  '/jerusalem-tours-compared',
  '/masada-tours-compared',
  '/galilee-tours-compared',
  '/petra-tours-compared',
  '/tel-aviv-tours-compared',
  '/eilat-tours-compared',
  '/dead-sea-tours-compared',
  '/israel-tour-operators-guide',
  '/best-things-to-do-in-israel',
  '/visa-information',
  '/plan-your-trip',
  '/build-your-trip',
  '/israel-map',
  '/israel-trip-cost-calculator',
  '/israel-tipping-currency',
  '/israel-packing-list',
  '/israel-weather-packing',
  '/which-israel-region-quiz',
  '/israel-distance-calculator',
  '/israel-travel-time',
  '/israel-how-many-days',
  '/where-to-stay/jerusalem',
  '/where-to-stay/tel-aviv',
  '/where-to-stay/dead-sea',
  '/transport/jerusalem-to-dead-sea',
  '/transport/tel-aviv-to-haifa',
  '/transport/tel-aviv-to-eilat',
  '/transport/tel-aviv-to-dead-sea',
  '/transport/haifa-to-akko',
  '/transport/ben-gurion-to-jerusalem',
  '/transport/ben-gurion-to-tel-aviv',
  '/transport/jerusalem-to-nazareth',
  '/cruise-shore-excursions-israel',
  '/luxury-travel-israel',
  '/jewish-heritage-israel',
  '/bar-bat-mitzvah-israel',
  '/israel-food-tours-cooking-classes',
  '/driving-in-israel',
  '/israel-national-parks-pass',
  '/israel-for-seniors',
  '/israel-adventure-sports',
  '/ben-gurion-airport-guide',
  '/israel-restaurant-finder',
  '/israel-travel-insurance',
  '/car-rental-israel',
  '/water-hiking-israel',
  '/akko-acre-guide',
  '/caesarea-guide',
  '/safed-tzfat-guide',
  '/nazareth-travel-guide',
  '/dead-sea-guide',
  '/qumran-guide',
  '/israel-accommodation-guide',
  '/israel-base-city-guide',
  '/rav-kav-israel',
  '/israel-travel-apps',
  '/israel-holiday-planner',
  '/israel-visa-eta-checker',
  '/israel-parks-pass-calculator',
  '/israel-car-rental-quiz',
  '/tel-aviv-white-city',
  '/jaffa-travel-guide',
  '/jaffa-food-guide',
  '/mahane-yehuda-market-guide',
  '/jerusalem-food-guide',
  '/day-trips-from-haifa',
  '/israeli-street-food-guide',
  '/israeli-breakfast-guide',
  '/netanya-guide',
  '/herzliya-guide',
  '/tel-aviv-beach-guide',
  '/solo-female-travel-israel',
  '/jordan-river-baptism',
  '/israel-shabbat-countdown',
  '/fr/first-time-in-israel',
  '/fr/visa-information',
  '/fr/best-time-to-visit-israel',
  '/fr/transportation',
  '/fr/israel-cost-budget',
  '/fr/day-trips-from-jerusalem',
  '/fr/day-trips-from-tel-aviv',
  '/fr/is-israel-safe',
  '/fr/shabbat-guide',
  '/fr/best-tours-in-israel',
  '/fr/border-crossings',
  '/fr/car-rental-israel',
  '/de/first-time-in-israel',
  '/de/visa-information',
  '/de/best-time-to-visit-israel',
  '/de/transportation',
  '/de/israel-cost-budget',
  '/de/day-trips-from-jerusalem',
  '/de/day-trips-from-tel-aviv',
  '/de/is-israel-safe',
  '/de/shabbat-guide',
  '/de/best-tours-in-israel',
  '/de/border-crossings',
  '/de/car-rental-israel',
  '/fr/bar-bat-mitzvah-israel',
  '/fr/hiking-in-israel',
  '/fr/kosher-food-guide',
  '/de/bar-bat-mitzvah-israel',
  '/de/hiking-in-israel',
  '/de/kosher-food-guide',
  '/fr/water-hiking-israel',
  '/fr/israel-adventure-sports',
  '/fr/ben-gurion-airport-guide',
  '/de/water-hiking-israel',
  '/de/israel-adventure-sports',
  '/de/ben-gurion-airport-guide',
  '/fr/israel-for-seniors',
  '/fr/whats-open-on-shabbat',
  '/fr/holy-sites-dress-code-etiquette',
  '/de/israel-for-seniors',
  '/de/whats-open-on-shabbat',
  '/de/holy-sites-dress-code-etiquette',
  '/fr/israel-5-vs-7-vs-10-days',
  '/fr/best-holy-land-tours',
  '/fr/dead-sea-guide',
  '/fr/israel-travel-insurance',
  '/de/israel-5-vs-7-vs-10-days',
  '/de/best-holy-land-tours',
  '/de/dead-sea-guide',
  '/de/israel-travel-insurance',
  '/fr/christian-pilgrimage-holy-land',
  '/de/christian-pilgrimage-holy-land',
  '/fr/israel-national-parks-pass',
  '/de/israel-national-parks-pass',
  '/fr/driving-in-israel',
  '/de/driving-in-israel',
  '/fr/jaffa-travel-guide',
  '/de/jaffa-travel-guide',
  '/fr/tel-aviv-food-guide',
  '/de/tel-aviv-food-guide',
  '/fr/israeli-food-cuisine-guide',
  '/de/israeli-food-cuisine-guide',
  '/fr/masada-dead-sea-day-trip',
  '/de/masada-dead-sea-day-trip',
  '/fr/israel-money-guide',
  '/de/israel-money-guide',
  '/fr/jordan-river-baptism',
  '/de/jordan-river-baptism',
  '/fr/nazareth-sea-of-galilee-day-trip',
  '/de/nazareth-sea-of-galilee-day-trip',
  '/fr/jerusalem-bethlehem-day-trip',
  '/de/jerusalem-bethlehem-day-trip',
  '/fr/tel-aviv-nightlife',
  '/de/tel-aviv-nightlife',
  '/fr/israel-accommodation-guide',
  '/de/israel-accommodation-guide',
  '/fr/nazareth-travel-guide',
  '/de/nazareth-travel-guide',
  '/fr/caesarea-guide',
  '/de/caesarea-guide',
  '/fr/akko-acre-guide',
  '/de/akko-acre-guide',
  '/fr/safed-tzfat-guide',
  '/de/safed-tzfat-guide',
  '/fr/qumran-guide',
  '/de/qumran-guide',
  '/fr/tel-aviv-white-city',
  '/de/tel-aviv-white-city',
  '/fr/israeli-street-food-guide',
  '/de/israeli-street-food-guide',
  '/fr/luxury-travel-israel',
  '/de/luxury-travel-israel',
  '/fr/israel-after-birthright',
  '/de/israel-after-birthright',
  '/fr/tel-aviv-carmel-market',
  '/de/tel-aviv-carmel-market',
  '/fr/tel-aviv-neighborhoods-guide',
  '/de/tel-aviv-neighborhoods-guide',
  '/fr/jewish-heritage-israel',
  '/de/jewish-heritage-israel',
  '/fr/lgbtq-travel-israel',
  '/de/lgbtq-travel-israel',
  '/fr/israel-food-tours-cooking-classes',
  '/de/israel-food-tours-cooking-classes',
  '/fr/tiberias-guide',
  '/de/tiberias-guide',
  '/fr/masada-tours-compared',
  '/de/masada-tours-compared',
  '/fr/galilee-tours-compared',
  '/de/galilee-tours-compared',
  '/fr/jerusalem-tours-compared',
  '/de/jerusalem-tours-compared',
  '/fr/jerusalem-food-guide',
  '/de/jerusalem-food-guide',
  '/fr/day-trips-from-haifa',
  '/de/day-trips-from-haifa',
  '/fr/petra-from-israel',
  '/de/petra-from-israel',
  '/fr/dead-sea-israel-vs-jordan',
  '/de/dead-sea-israel-vs-jordan',
  '/fr/tel-aviv-to-jerusalem',
  '/de/tel-aviv-to-jerusalem',
  '/fr/ben-gurion-airport-transfers',
  '/de/ben-gurion-airport-transfers',
  '/fr/rav-kav-israel',
  '/de/rav-kav-israel',
  '/fr/israel-esim',
  '/de/israel-esim',
  '/fr/tel-aviv-light-rail',
  '/de/tel-aviv-light-rail',
  '/fr/eilat-tours-compared',
  '/de/eilat-tours-compared',
  '/fr/tel-aviv-tours-compared',
  '/de/tel-aviv-tours-compared',
  '/fr/eilat-diving-snorkeling',
  '/de/eilat-diving-snorkeling',
  '/fr/cruise-shore-excursions-israel',
  '/de/cruise-shore-excursions-israel',
  '/fr/israel-base-city-guide',
  '/de/israel-base-city-guide',
  '/fr/israel-evening-activities',
  '/de/israel-evening-activities',
  '/tel-aviv-carmel-market',
  '/tel-aviv-neighborhoods-guide',
  '/israel-evening-activities',
  '/1-day-jerusalem-itinerary',
  '/1-day-tel-aviv-itinerary',
  '/free-things-to-do-israel',
  '/cheap-flights-to-israel',
  '/jerusalem-old-city-walking-tour',
  '/church-holy-sepulchre-guide',
  '/yad-vashem-visitor-guide',
  '/haifa-travel-guide',
  '/haifa-neighborhoods-guide',
  '/israel-stargazing',
  '/israel-horseback-riding',
  '/masada-visitor-guide',
  '/bahai-world-center-guide',
  '/jerusalem-neighborhoods-guide',
  '/druze-villages-carmel',
  '/fr/1-day-jerusalem-itinerary',
  '/de/1-day-jerusalem-itinerary',
  '/fr/israel-tour-packages',
  '/de/israel-tour-packages',
  '/fr/petra-tours-compared',
  '/de/petra-tours-compared',
  '/fr/israel-travel-apps',
  '/de/israel-travel-apps',
  '/fr/israel-wine-wineries',
  '/de/israel-wine-wineries',
  '/fr/israel-zimmer-guide',
  '/de/israel-zimmer-guide',
  '/fr/free-things-to-do-israel',
  '/de/free-things-to-do-israel',
  '/fr/petra-from-eilat-vs-amman',
  '/de/petra-from-eilat-vs-amman',
  '/fr/private-tours-israel',
  '/de/private-tours-israel',
  '/fr/cheap-flights-to-israel',
  '/de/cheap-flights-to-israel',
  '/fr/church-holy-sepulchre-guide',
  '/de/church-holy-sepulchre-guide',
  '/fr/jerusalem-old-city-walking-tour',
  '/de/jerusalem-old-city-walking-tour',
  '/layover-tel-aviv',
  '/israel-experience-finder',
  '/search',
  '/israel-vat-refund',
  '/israel-museum-jerusalem',
  '/golan-heights-guide',
  '/traveling-israel-jewish-holidays',
  '/western-wall-tunnels-guide',
  '/tower-of-david-guide',
  '/jericho-day-trip-from-jerusalem',
  '/herodion-guide',
  '/galilee-christian-sites-circuit',
  '/israel-eta-guide',
  '/tel-aviv-things-to-do',
  '/layover-jerusalem',
  '/eilat-travel-guide',
  '/ein-gedi-guide',
  '/israel-with-teenagers',
  '/israel-craft-beer',
  '/israel-in-summer',
  '/cycling-in-israel',
  '/vegan-vegetarian-israel',
  '/best-hotels-tel-aviv',
  '/dead-sea-hotels-guide',
  '/best-beaches-israel',
  '/israel-wellness-spa',
  '/kibbutz-hotels-israel',
  '/israel-rooftop-bars',
  '/israel-travel-tips',
  '/glamping-israel',
  '/israel-film-tv-tourism',
  '/sea-of-galilee-boat-tour',
  '/shopping-in-israel',
  '/rosh-hashanah-in-israel',
  '/kerem-hateimanim-tel-aviv',
  '/neve-tzedek-guide',
  '/israel-hummus-trail',
  '/israel-agritourism-guide',
  '/israel-jordan-itinerary',
  '/christmas-in-israel',
  '/maccabiah-games-2026',
  '/israel-hidden-gems',
  '/jerusalem-nightlife',
  '/galilee-vs-golan-weekend',
  '/dead-sea-vs-eilat',
  '/beer-sheva-guide',
  '/ein-kerem-jerusalem-guide',
  '/tel-arad-guide',
  '/eilat-nightlife',
  '/city-of-david-jerusalem',
  '/gamla-nature-reserve-guide',
  '/jerusalem-mount-zion-guide',
  '/mitzpe-ramon-guide',
  '/fr/jerusalem',
  '/fr/tel-aviv',
  '/fr/dead-sea',
  '/fr/galilee',
  '/fr/haifa',
  '/fr/eilat',
  '/fr/negev',
  '/fr/akko',
  '/fr/caesarea',
  '/fr/golan',
  '/fr/nazareth',
  '/de/jerusalem',
  '/de/tel-aviv',
  '/de/dead-sea',
  '/de/galilee',
  '/de/haifa',
  '/de/eilat',
  '/de/negev',
  '/de/akko',
  '/de/caesarea',
  '/de/golan',
  '/de/nazareth',
  '/fr/jerusalem/western-wall',
  '/fr/jerusalem/old-city',
  '/fr/jerusalem/yad-vashem',
  '/fr/jerusalem/mount-of-olives',
  '/fr/jerusalem/via-dolorosa',
  '/fr/jerusalem/mahane-yehuda',
  '/de/jerusalem/western-wall',
  '/de/jerusalem/old-city',
  '/de/jerusalem/yad-vashem',
  '/de/jerusalem/mount-of-olives',
  '/de/jerusalem/via-dolorosa',
  '/de/jerusalem/mahane-yehuda',
  '/fr/jerusalem/city-of-david',
  '/fr/jerusalem/tower-of-david',
  '/fr/jerusalem/israel-museum',
  '/fr/jerusalem/garden-tomb',
  '/fr/tel-aviv/old-jaffa',
  '/fr/tel-aviv/neve-tzedek',
  '/fr/tel-aviv/tayelet',
  '/fr/tel-aviv/rothschild',
  '/de/jerusalem/city-of-david',
  '/de/jerusalem/tower-of-david',
  '/de/jerusalem/israel-museum',
  '/de/jerusalem/garden-tomb',
  '/de/tel-aviv/old-jaffa',
  '/de/tel-aviv/neve-tzedek',
  '/de/tel-aviv/tayelet',
  '/de/tel-aviv/rothschild',
  '/fr/tel-aviv/carmel-market',
  '/fr/tel-aviv/florentin',
  '/fr/tel-aviv/tel-aviv-museum',
  '/fr/dead-sea/ein-bokek',
  '/fr/dead-sea/masada',
  '/de/tel-aviv/carmel-market',
  '/de/tel-aviv/florentin',
  '/de/tel-aviv/tel-aviv-museum',
  '/de/dead-sea/ein-bokek',
  '/de/dead-sea/masada',
];

for (const route of ROUTES) {
  test(`loads ${route} with exactly one H1 and a nav`, async ({ page }) => {
    const res = await page.goto(route, { waitUntil: 'load' });
    expect(res?.status(), `status for ${route}`).toBeLessThan(400);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('header nav, header a').first()).toBeVisible();
  });
}

test('404 page is branded and helpful', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist-xyz', {
    waitUntil: 'load',
  });
  expect(res?.status()).toBe(404);
  await expect(page.getByText('Error 404')).toBeVisible();
  await expect(page.getByRole('link', { name: /back home/i })).toBeVisible();
});

test('RSS feed is valid XML with items', async ({ request }) => {
  const res = await request.get('/rss.xml');
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('<rss');
  expect(body).toContain('<item>');
  expect(body).toContain('Visit Israel');
});

test('sitemap carries <lastmod> dates from content updatedAt', async ({ request }) => {
  const res = await request.get('/sitemap-0.xml');
  expect(res.status()).toBe(200);
  const body = await res.text();
  // Most content pages (guides, regions, attractions, itineraries, legal) emit one.
  const count = (body.match(/<lastmod>/g) || []).length;
  expect(count).toBeGreaterThan(50);
  // A known guide URL is followed by an ISO lastmod (value not pinned — content drifts).
  expect(body).toMatch(/\/tel-aviv-to-jerusalem\/<\/loc><lastmod>\d{4}-\d{2}-\d{2}T/);
});

test('localized home sets <html lang> and reciprocal hreflang', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  // hreflang alternates for all three locales + x-default.
  for (const hl of ['en', 'fr', 'de', 'x-default']) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${hl}"]`)).toHaveCount(1);
  }
  // og:locale is fr; the two other locales appear as og:locale:alternate.
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'fr_FR');
  await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveCount(2);
  // Header chrome is localized (Phase 1): French nav label + CTA.
  await expect(page.locator('header')).toContainText('Itinéraires');
  await expect(page.locator('header')).toContainText('Préparer votre voyage');
  // Footer chrome is localized too (Phase 1b): French column heading.
  await expect(page.locator('footer')).toContainText('Excursions');
  // Sitewide chrome (skip link + sticky booking bar) is localized, no EN leak.
  await expect(page.locator('body')).toContainText('Aller au contenu');
  await expect(page.locator('nav[aria-label="Réservation rapide"]')).toHaveCount(1);
  // Mobile-menu nav labels are localized too (Phase 1c).
  await expect(page.locator('header')).toContainText('Composer mon voyage');
  // The English home reciprocates (required for valid hreflang).
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
    'href',
    /\/fr\/$/
  );
});

test('localized plan-your-trip is translated with reciprocal hreflang', async ({ page }) => {
  await page.goto('/fr/plan-your-trip');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('h1')).toHaveText('Préparez votre voyage');
  // hreflang points back to the en + de versions of THIS page.
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    'href',
    /\/plan-your-trip$/
  );
  await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
    'href',
    /\/de\/plan-your-trip$/
  );
  // The English page reciprocates.
  await page.goto('/plan-your-trip');
  await expect(page.locator('h1')).toHaveText('Plan Your Trip');
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
    'href',
    /\/fr\/plan-your-trip$/
  );
});

test('translated guide sets lang, hreflang alternates, and reciprocates from EN', async ({ page }) => {
  // French guide has correct lang + hreflang
  await page.goto('/fr/first-time-in-israel');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  for (const hl of ['en', 'fr', 'de', 'x-default']) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${hl}"]`)).toHaveCount(1);
  }
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    'href',
    /\/first-time-in-israel$/
  );
  // German guide has lang=de
  await page.goto('/de/visa-information');
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
    'href',
    /\/fr\/visa-information$/
  );
  // EN guide reciprocates with hreflang to fr + de
  await page.goto('/first-time-in-israel');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
    'href',
    /\/fr\/first-time-in-israel$/
  );
  await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
    'href',
    /\/de\/first-time-in-israel$/
  );
});

test('homepage exposes branded OG image + RSS link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /og-default\.jpg$/
  );
  await expect(
    page.locator('link[type="application/rss+xml"]')
  ).toHaveAttribute('href', '/rss.xml');
});
