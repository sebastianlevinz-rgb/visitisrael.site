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
  '/itineraries/3-days-in-jerusalem',
  '/itineraries/2-days-in-tel-aviv',
  '/first-time-in-israel',
  '/israeli-food-cuisine-guide',
  '/best-holy-land-tours',
  '/jerusalem-tours-compared',
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
  '/israel-how-many-days',
  '/where-to-stay/jerusalem',
  '/where-to-stay/tel-aviv',
  '/where-to-stay/dead-sea',
  '/transport/jerusalem-to-dead-sea',
  '/transport/tel-aviv-to-haifa',
  '/transport/tel-aviv-to-eilat',
  '/transport/tel-aviv-to-dead-sea',
  '/transport/haifa-to-akko',
  '/cruise-shore-excursions-israel',
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
  '/search',
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
