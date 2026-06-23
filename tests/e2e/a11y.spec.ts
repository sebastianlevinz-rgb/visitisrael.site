import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Representative of every template type + each interactive tool.
const ROUTES = [
  '/',
  '/fr/',
  '/fr/plan-your-trip',
  '/jerusalem',
  '/jerusalem/western-wall',
  '/itineraries/7-days-in-israel',
  '/first-time-in-israel',
  '/fr/first-time-in-israel',
  '/build-your-trip',
  '/israel-map',
  '/israel-trip-cost-calculator',
  '/israel-tipping-currency',
  '/israel-packing-list',
  '/israel-weather-packing',
  '/which-israel-region-quiz',
  '/israel-distance-calculator',
  '/israel-how-many-days',
  '/best-things-to-do-in-israel',
  '/where-to-stay/jerusalem',
  '/transport/jerusalem-to-dead-sea',
  '/search',
  '/404',
];

for (const route of ROUTES) {
  test(`no WCAG 2A/2AA violations on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'load' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    // Surface a readable summary if anything regresses.
    const summary = results.violations.map(
      (v) => `${v.impact} · ${v.id} (${v.nodes.length}) — ${v.help}`
    );
    expect(summary, summary.join('\n')).toEqual([]);
  });
}
