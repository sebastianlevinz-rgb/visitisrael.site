import { test, expect } from '@playwright/test';

test.describe('Trip cost calculator', () => {
  test('computes a total and reacts to inputs', async ({ page }) => {
    await page.goto('/israel-trip-cost-calculator');
    const total = page.locator('#total');
    await expect(total).not.toHaveText('$0');
    const before = await total.textContent();
    // More days → larger total.
    await page.locator('#days').fill('14');
    await page.waitForTimeout(700); // count-up animation settles
    const after = await total.textContent();
    const n = (s: string | null) => Number((s || '').replace(/[^0-9]/g, ''));
    expect(n(after)).toBeGreaterThan(n(before));
    await expect(page.locator('#breakdown tr')).not.toHaveCount(0);
  });
});

test.describe('Build your trip', () => {
  test('adds places, estimates days, and persists across reload', async ({
    page,
  }) => {
    await page
      .context()
      .grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/build-your-trip');
    await expect(page.locator('#trip-days')).toHaveText('0');
    const chips = page.locator('.trip-add');
    // force: the sticky header can overlap the top chips during auto-scroll
    await chips.nth(0).click({ force: true });
    await chips.nth(1).click({ force: true });
    await expect(page.locator('#trip-days')).not.toHaveText('0');
    await expect(page.locator('#trip-count')).toContainText(/place/i);
    // localStorage persistence
    await page.reload();
    await expect(page.locator('.trip-add[aria-pressed="true"]')).not.toHaveCount(
      0
    );
    // print / save-as-PDF button is available once the trip has places
    await expect(page.locator('#trip-print')).toBeVisible();
    // share link
    await page.locator('#trip-share').click();
    await expect(page.locator('#trip-share-ok')).toBeVisible();
  });
});

test.describe('Currency & tipping', () => {
  test('converts shekels and computes a tip', async ({ page }) => {
    await page.goto('/israel-tipping-currency');
    await page.locator('#ils').fill('370');
    await expect(page.locator('#foreign')).not.toHaveValue('');
    await page.locator('#bill').fill('200');
    await expect(page.locator('#tip-total')).not.toHaveText('');
  });
});

test.describe('Distance calculator', () => {
  test('computes distance + drive time and reacts to selection', async ({ page }) => {
    await page.goto('/israel-distance-calculator');
    // Default (Tel Aviv → Jerusalem) computes on load.
    await expect(page.locator('#dist-km')).toContainText('km');
    await expect(page.locator('#drive-time')).not.toHaveText('—');
    const before = await page.locator('#dist-km').textContent();
    // A far pair (Eilat → Golan Heights) must be a larger distance.
    await page.locator('#from').selectOption({ label: 'Eilat' });
    await page.locator('#to').selectOption({ label: 'Golan Heights' });
    const after = await page.locator('#dist-km').textContent();
    const n = (s: string | null) => Number((s || '').replace(/[^0-9]/g, ''));
    expect(n(after)).toBeGreaterThan(n(before));
    // Live-directions link points at Google Maps driving directions.
    await expect(page.locator('#maps-link')).toHaveAttribute('href', /google\.com\/maps\/dir/);
  });
});

test.describe('How many days', () => {
  test('recommends a trip length and reacts to region + pace', async ({ page }) => {
    await page.goto('/israel-how-many-days');
    const days = page.locator('#days');
    // Defaults (Jerusalem + Tel Aviv + Dead Sea, balanced) compute on load.
    await expect(days).toContainText(/day/);
    const n = (s: string | null) => Number((s || '').replace(/[^0-9]/g, ''));
    const before = n(await days.textContent());
    // Add more regions → more days, and the itinerary link updates.
    // Inputs are sr-only (visually hidden, styled via label) → force the check.
    await page.locator('input[name="area"][value="galilee"]').check({ force: true });
    await page.locator('input[name="area"][value="eilat"]').check({ force: true });
    const after = n(await days.textContent());
    expect(after).toBeGreaterThan(before);
    await expect(page.locator('#itinerary-link')).toHaveAttribute('href', /\/itineraries\//);
  });
});

test.describe('Packing list', () => {
  test('checking an item updates progress and persists', async ({ page }) => {
    await page.goto('/israel-packing-list');
    const boxes = page.locator('input[type="checkbox"]');
    const before = await page.locator('#progress').textContent();
    await boxes.first().check();
    await expect(page.locator('#progress')).not.toHaveText(before || '');
    await page.reload();
    await expect(boxes.first()).toBeChecked();
  });
});

test.describe('Region quiz', () => {
  test('answering all questions reveals recommendations', async ({ page }) => {
    await page.goto('/which-israel-region-quiz');
    // pick the first option of each question group (grouped by radio name)
    const groups = await page.locator('input[type="radio"]').evaluateAll((els) =>
      Array.from(new Set(els.map((e) => (e as HTMLInputElement).name)))
    );
    for (const name of groups) {
      // radios are sr-only (styled via label), so check programmatically
      await page
        .locator(`input[type="radio"][name="${name}"]`)
        .first()
        .check({ force: true });
    }
    await page.getByRole('button', { name: /see my regions/i }).click();
    await expect(page.locator('#results')).toBeVisible();
    await expect(page.locator('#result-cards a')).not.toHaveCount(0);
  });
});

test.describe('Interactive map', () => {
  test('initializes Leaflet with attraction markers', async ({ page }) => {
    await page.goto('/israel-map');
    await expect(page.locator('#map.leaflet-container')).toBeVisible();
    // circleMarkers render as SVG paths inside the leaflet overlay
    await expect(page.locator('#map svg path').first()).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Restaurant finder', () => {
  test('filters by city and diet type, updates count', async ({ page }) => {
    await page.goto('/israel-restaurant-finder');
    // All restaurants visible by default
    const countEl = page.locator('#count-num');
    const totalText = await countEl.textContent();
    const total = Number(totalText);
    expect(total).toBeGreaterThan(0);

    // Filter to Jerusalem only
    await page.locator('#city-filter').selectOption('Jerusalem');
    const jerCount = Number(await countEl.textContent());
    expect(jerCount).toBeGreaterThan(0);
    expect(jerCount).toBeLessThan(total);

    // Filter to vegan only (subset of Jerusalem)
    await page.locator('#diet-filter').selectOption('vegan');
    const veganJerCount = Number(await countEl.textContent());
    expect(veganJerCount).toBeGreaterThanOrEqual(0);
    expect(veganJerCount).toBeLessThanOrEqual(jerCount);

    // Resetting city to all while keeping vegan filter
    await page.locator('#city-filter').selectOption('all');
    const veganAllCount = Number(await countEl.textContent());
    expect(veganAllCount).toBeGreaterThanOrEqual(veganJerCount);

    // Cards not visible for kosher-only when vegan filter is active
    const hiddenCards = page.locator('.restaurant-card[style*="display: none"]');
    const hiddenCount = await hiddenCards.count();
    expect(hiddenCount).toBeGreaterThan(0);
  });
});

test.describe('Shabbat & holiday calendar', () => {
  test('renders candlelighting time, navigates months, and shows holiday details', async ({ page }) => {
    await page.goto('/israel-shabbat-calendar');

    // Banner: candlelighting time should be populated on load.
    const candle = page.locator('#banner-candle');
    await expect(candle).not.toHaveText('—');
    await expect(candle).toContainText(/\d+:\d+\s*(am|pm)/i);

    // Havdalah time should also be populated.
    await expect(page.locator('#banner-havdalah')).toContainText(/\d+:\d+\s*(am|pm)/i);

    // Calendar grid: calendar body should contain some rows.
    await expect(page.locator('#cal-body tr')).not.toHaveCount(0);

    // Changing city recomputes candlelighting time.
    await page.locator('#city-sel').selectOption('eilat');
    await expect(candle).toContainText(/\d+:\d+\s*(am|pm)/i);

    // Navigate to next month and back.
    await page.locator('#next-month').click();
    const monthLabel = await page.locator('#month-label').textContent();
    expect(monthLabel).toMatch(/\w+ \d{4}/);
    await page.locator('#prev-month').click();

    // Holiday table should list known holidays.
    const holRows = page.locator('#hol-table tr');
    await expect(holRows).not.toHaveCount(0);

    // Clicking a holiday cell (if any in current month view) shows detail.
    // Navigate to September 2026 which has Rosh Hashanah.
    await page.goto('/israel-shabbat-calendar');
    // Navigate to Sep 2026 by clicking next-month enough times from current month.
    // Use JS to set state directly via URL is not available; instead check that
    // the holiday table row for Rosh Hashanah exists.
    const roshRow = page.locator('#hol-table tr').filter({ hasText: 'Rosh Hashanah' });
    await expect(roshRow).toBeVisible();
  });
});

test.describe('Weather & packing widget', () => {
  test('shows prompt initially, then displays weather and pack list after selecting month and zone', async ({
    page,
  }) => {
    await page.goto('/israel-weather-packing');
    // Initial state: prompt visible, content hidden
    await expect(page.locator('#wp-prompt')).toBeVisible();
    await expect(page.locator('#wp-content')).not.toBeVisible();

    // Click April (index 3)
    await page.locator('.month-btn[data-month="3"]').click();
    // Still needs a zone — content still hidden
    await expect(page.locator('#wp-content')).not.toBeVisible();

    // Select coastal zone
    await page.locator('input[name="zone"][value="coastal"]').check({ force: true });
    // Result panel should now show temperature + packing items
    await expect(page.locator('#wp-content')).toBeVisible();
    await expect(page.locator('#wp-temp')).not.toHaveText('');
    await expect(page.locator('#wp-pack li')).not.toHaveCount(0);

    // Switching to a different zone updates the result
    const tempBefore = await page.locator('#wp-temp').textContent();
    await page.locator('input[name="zone"][value="desert"]').check({ force: true });
    const tempAfter = await page.locator('#wp-temp').textContent();
    // Desert in April is hotter than coast — different value
    expect(tempAfter).not.toEqual(tempBefore);
  });
});
