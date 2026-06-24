import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Representative of every template type + each interactive tool.
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
  '/visa-information',
  '/plan-your-trip',
  '/best-holy-land-tours',
  '/fr/first-time-in-israel',
  '/fr/visa-information',
  '/fr/best-time-to-visit-israel',
  '/fr/transportation',
  '/fr/israel-cost-budget',
  '/fr/day-trips-from-jerusalem',
  '/fr/day-trips-from-tel-aviv',
  '/fr/is-israel-safe',
  '/de/first-time-in-israel',
  '/de/visa-information',
  '/de/best-time-to-visit-israel',
  '/de/transportation',
  '/de/israel-cost-budget',
  '/de/day-trips-from-jerusalem',
  '/de/day-trips-from-tel-aviv',
  '/de/is-israel-safe',
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
  '/where-to-stay/tel-aviv',
  '/where-to-stay/dead-sea',
  '/transport/jerusalem-to-dead-sea',
  '/transport/tel-aviv-to-haifa',
  '/cruise-shore-excursions-israel',
  '/jewish-heritage-israel',
  '/israel-food-tours-cooking-classes',
  '/driving-in-israel',
  '/israel-national-parks-pass',
  '/israel-for-seniors',
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
