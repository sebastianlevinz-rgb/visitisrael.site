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

test('the section holding affiliate cards carries one disclosure before them, and cards show no invented ratings', async ({ page }) => {
  await page.goto('/best-hotels-jerusalem');
  const card = page.locator('[data-affiliate-card]').first();
  // One disclosure per section (not per card), placed before the cards in the DOM.
  const section = card.locator('xpath=ancestor::section[1]');
  await expect(section).toContainText(/Affiliate disclosure/i);
  const disclosureIsBefore = await section.evaluate((s) => {
    const d = s.querySelector('p strong');
    const c = s.querySelector('[data-affiliate-card]');
    return !!d && !!c && Boolean(d.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(disclosureIsBefore).toBe(true);
  await expect(card).not.toContainText(/★|\b\d\.\d\s*\/\s*5\b|\d[\d,]*\s+reviews/i);
});
