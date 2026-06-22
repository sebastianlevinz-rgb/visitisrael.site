import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/jerusalem',
  '/jerusalem/western-wall',
  '/itineraries',
  '/itineraries/7-days-in-israel',
  '/first-time-in-israel',
  '/israeli-food-cuisine-guide',
  '/plan-your-trip',
  '/build-your-trip',
  '/israel-map',
  '/israel-trip-cost-calculator',
  '/israel-tipping-currency',
  '/israel-packing-list',
  '/which-israel-region-quiz',
  '/israel-distance-calculator',
  '/where-to-stay/jerusalem',
  '/where-to-stay/tel-aviv',
  '/where-to-stay/dead-sea',
  '/transport/jerusalem-to-dead-sea',
  '/transport/tel-aviv-to-haifa',
  '/transport/tel-aviv-to-eilat',
  '/transport/tel-aviv-to-dead-sea',
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
