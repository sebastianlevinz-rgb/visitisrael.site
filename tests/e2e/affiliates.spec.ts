import { test, expect } from '@playwright/test';
import { PLACEHOLDER_TOKENS } from '../../scripts/qa/affiliate-guard.mjs';

/**
 * Affiliate links as a visitor sees them. The previous site served
 * `aid=BOOKING_AID` on every page; these checks read the rendered DOM.
 * (The build-time guard in astro.config.mjs covers every page; this covers the
 * rendered attributes and disclosure on the money pages.)
 */
const MONEY_PAGES = ['/', '/jerusalem', '/best-hotels-jerusalem', '/jerusalem-tours-compared', '/fr/dead-sea-hotels-guide'];

for (const route of MONEY_PAGES) {
  test(`${route}: partner links carry no placeholder IDs and are marked sponsored`, async ({ page }) => {
    await page.goto(route);
    const cards = page.locator('[data-affiliate-card] a[href^="http"]');
    expect(await cards.count(), 'affiliate cards on the page').toBeGreaterThan(0);

    const hrefs = await page.locator('a[href^="http"]').evaluateAll((as) => as.map((a) => a.getAttribute('href') ?? ''));
    for (const href of hrefs) {
      for (const token of PLACEHOLDER_TOKENS) expect(href, `placeholder in ${href}`).not.toContain(token);
    }

    for (const a of await cards.all()) {
      await expect(a).toHaveAttribute('rel', /sponsored/);
      await expect(a).toHaveAttribute('rel', /nofollow/);
      await expect(a).toHaveAttribute('target', '_blank');
    }
  });
}

test('affiliate cards show the disclosure before the link and no invented ratings', async ({ page }) => {
  await page.goto('/best-hotels-jerusalem');
  const card = page.locator('[data-affiliate-card]').first();
  await expect(card).toContainText(/Affiliate link/i);
  await expect(card).not.toContainText(/★|\b\d\.\d\s*\/\s*5\b|\d[\d,]*\s+reviews/i);
});
