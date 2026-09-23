import { test, expect } from '@playwright/test';
import { ROUTES } from './routes';
import { PAGE_GROUPS, PARTIAL_LOCALE_PAGES, locales } from '../../src/i18n/ui';

const prefixes = locales.map((l) => (l === 'en' ? '' : `/${l}`));

test('the build contains the expected v3 page set', () => {
  // Per locale: 30 content pages (7 regions + 21 guides + 2 itineraries) + home + plan-your-trip
  // + itineraries index. Plus 6 legal/credits pages (EN only) and 8 internal/utility routes:
  // /search, /dashboard, /gestion, /gestion/competidores, /gestion/seo, /mariluz and
  // /mariluz/paquetes and the static /gestion/video. 404.html is not an index route.
  const contentPerLocale = 7 + 21 + 2;
  // The Christian-pilgrimage guides do NOT exist in all five locales (EN + ES only, see
  // PARTIAL_LOCALE_PAGES in src/i18n/ui.ts), so they cannot ride on the per-locale term:
  // multiplying them by locales.length would expect fr/de/he routes that are not built.
  // They get their own term, summed over the locales each one actually has.
  const partialLocaleRoutes = PARTIAL_LOCALE_PAGES.reduce((n, p) => n + p.locales.length, 0);
  const expected = locales.length * (contentPerLocale + 3) + partialLocaleRoutes + 6 + 8;
  expect(ROUTES.length, ROUTES.join('\n')).toBe(expected);
});

for (const route of ROUTES) {
  test(`loads ${route} with exactly one H1 and a nav`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status(), `status for ${route}`).toBeLessThan(400);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('header nav, header a').first()).toBeVisible();
  });
}

test('every page group exists in all four locales', () => {
  const slugs = [...PAGE_GROUPS.practical, ...PAGE_GROUPS.stay, ...PAGE_GROUPS.tours].map((p) => p.slug);
  for (const slug of slugs) {
    for (const prefix of prefixes) {
      expect(ROUTES, `${prefix}/${slug}`).toContain(`${prefix}/${slug}`);
    }
  }
});

test('the five legal pages exist', () => {
  for (const p of ['/about', '/contact', '/privacy', '/affiliate-disclosure', '/accessibility-statement', '/photo-credits']) {
    expect(ROUTES).toContain(p);
  }
});

test('footer links to every legal page', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  for (const p of ['/about', '/contact', '/privacy', '/affiliate-disclosure', '/accessibility-statement', '/photo-credits']) {
    await expect(footer.locator(`a[href="${p}"]`)).toHaveCount(1);
  }
});

test('404 page is branded and helpful', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist');
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
  const count = (body.match(/<loc>/g) ?? []).length;
  expect(count).toBeGreaterThan(50);
  expect(body).toMatch(/\/first-time-in-israel\/<\/loc><lastmod>\d{4}-\d{2}-\d{2}T/);
});

test('sitemap carries xhtml:link hreflang entries for translated pages', async ({ request }) => {
  const res = await request.get('/sitemap-0.xml');
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('xmlns:xhtml=');
  expect(body).toContain('hreflang="fr"');
  expect(body).toContain('hreflang="de"');
  expect(body).toContain('hreflang="es"');
});

test('localized region sets lang, hreflang alternates, and reciprocates', async ({ page }) => {
  await page.goto('/fr/jerusalem');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  for (const hl of [...locales, 'x-default']) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${hl}"]`)).toHaveCount(1);
  }
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', /\/jerusalem$/);
  await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute('href', /\/de\/jerusalem$/);
  await page.goto('/jerusalem');
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute('href', /\/fr\/jerusalem$/);
});

test('localized home sets <html lang>, reciprocal hreflang and localized chrome', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  for (const hl of [...locales, 'x-default']) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${hl}"]`)).toHaveCount(1);
  }
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'fr_FR');
  await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveCount(locales.length - 1);
  await expect(page.locator('header')).toContainText('Itinéraires');
  await expect(page.locator('header')).toContainText('Préparer votre voyage');
  await expect(page.locator('header')).toContainText('Premier voyage en Israël');
  await expect(page.locator('footer')).toContainText('Hôtels & circuits');
  await expect(page.locator('body')).toContainText('Aller au contenu');
  await expect(page.locator('nav[aria-label="Réservation rapide"]')).toHaveCount(1);
  // No "guides are English-only" notice: every linked page exists in French.
  await expect(page.locator('body')).not.toContainText('en anglais');
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute('href', /\/fr\/$/);
});

test('language switcher keeps the reader on the same page', async ({ page }) => {
  await page.goto('/best-hotels-jerusalem');
  await expect(page.locator('nav[aria-label="Language"] a[hreflang="de"]')).toHaveAttribute(
    'href',
    '/de/best-hotels-jerusalem',
  );
  await page.goto('/contact');
  // Legal pages are English-only, so the switcher falls back to the locale home.
  await expect(page.locator('nav[aria-label="Language"] a[hreflang="es"]')).toHaveAttribute('href', '/es/');
});

test('localized plan-your-trip is translated with reciprocal hreflang', async ({ page }) => {
  await page.goto('/fr/plan-your-trip');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('h1')).toHaveText('Préparez votre voyage');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', /\/plan-your-trip$/);
  await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute('href', /\/de\/plan-your-trip$/);
  await page.goto('/plan-your-trip');
  await expect(page.locator('h1')).toHaveText('Plan Your Trip');
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute('href', /\/fr\/plan-your-trip$/);
});

test('translated guide sets lang, hreflang alternates, and reciprocates from EN', async ({ page }) => {
  await page.goto('/fr/first-time-in-israel');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  for (const hl of [...locales, 'x-default']) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${hl}"]`)).toHaveCount(1);
  }
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', /\/first-time-in-israel$/);
  await page.goto('/de/visa-information');
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute('href', /\/fr\/visa-information$/);
  await page.goto('/first-time-in-israel');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  for (const l of locales.filter((x) => x !== 'en')) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveAttribute(
      'href',
      new RegExp(`/${l}/first-time-in-israel$`),
    );
  }
});

test('homepage exposes branded OG image + RSS link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-default\.jpg$/);
  await expect(page.locator('link[type="application/rss+xml"]')).toHaveAttribute('href', '/rss.xml');
});

test('Hebrew pages are RTL with Hebrew fonts and localized chrome', async ({ page }) => {
  await page.goto('/he/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'he');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'he_IL');
  await expect(page.locator('header')).toContainText('מסלולי טיול');
  await page.goto('/he/jerusalem');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', /\/jerusalem$/);
  await page.goto('/jerusalem');
  await expect(page.locator('html')).not.toHaveAttribute('dir', 'rtl');
  await expect(page.locator('link[rel="alternate"][hreflang="he"]')).toHaveAttribute('href', /\/he\/jerusalem$/);
});
