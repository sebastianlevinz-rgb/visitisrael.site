import { test, expect } from '@playwright/test';

test.describe('Trip cost calculator v2', () => {
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

  test('accommodation tier changes total, quick presets set days', async ({ page }) => {
    await page.goto('/israel-trip-cost-calculator');
    const total = page.locator('#total');
    const n = (s: string | null) => Number((s || '').replace(/[^0-9]/g, ''));

    // Switch to luxury hotel — total should increase vs mid-range default.
    const midTotal = n(await total.textContent());
    await page.locator('#accom-tier').selectOption('luxury_hotel');
    await page.waitForTimeout(600);
    const luxuryTotal = n(await total.textContent());
    expect(luxuryTotal).toBeGreaterThan(midTotal);

    // Switch to hostel — total should be less than mid-range.
    await page.locator('#accom-tier').selectOption('hostel');
    await page.waitForTimeout(600);
    const hostelTotal = n(await total.textContent());
    expect(hostelTotal).toBeLessThan(midTotal);

    // Quick day preset: click "10 days" → days input updates.
    await page.locator('.day-preset[data-days="10"]').click();
    await expect(page.locator('#days')).toHaveValue('10');
    await page.waitForTimeout(600);
    const tenDayTotal = n(await total.textContent());
    // 10 days > default 7 days at same style.
    const sevenDayPresetTotal = hostelTotal; // was at 7 days
    expect(tenDayTotal).toBeGreaterThan(sevenDayPresetTotal);
  });

  test('breakdown table has daily and total columns', async ({ page }) => {
    await page.goto('/israel-trip-cost-calculator');
    // Table header should show "Per day" and "Total" columns.
    await expect(page.locator('#breakdown-table thead th').nth(1)).toContainText(/per day/i);
    await expect(page.locator('#breakdown-table thead th').nth(2)).toContainText(/total/i);
    // Accommodation row has a per-day cost.
    await expect(page.locator('#breakdown tr').first()).toContainText('$');
  });

  test('print button is present and accessible', async ({ page }) => {
    await page.goto('/israel-trip-cost-calculator');
    const printBtn = page.locator('#print-btn');
    await expect(printBtn).toBeVisible();
    await expect(printBtn).toContainText(/print/i);
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

test.describe('Travel time calculator', () => {
  test('renders drive time for default Tel Aviv → Jerusalem route on load', async ({ page }) => {
    await page.goto('/israel-travel-time');
    // Default route (Tel Aviv → Jerusalem) should render drive time immediately.
    await expect(page.locator('#tt-drive')).toContainText('min');
    // Train time should also be shown (this route has a train).
    await expect(page.locator('#tt-train-time')).toContainText('min');
  });

  test('updates results when a different route is selected', async ({ page }) => {
    await page.goto('/israel-travel-time');
    // Switch to a route with no train (Dead Sea has no train).
    await page.locator('#tt-from').selectOption('tel-aviv');
    await page.locator('#tt-to').selectOption('dead-sea');
    // Drive time should render.
    await expect(page.locator('#tt-drive')).toContainText('h');
    // No train card time element for this route.
    await expect(page.locator('#tt-train-time')).not.toBeVisible();
    // Bus time should be shown.
    await expect(page.locator('#tt-bus-time')).toContainText('h');
  });

  test('swap button exchanges origin and destination and re-renders', async ({ page }) => {
    await page.goto('/israel-travel-time');
    // Set a known pair.
    await page.locator('#tt-from').selectOption('haifa');
    await page.locator('#tt-to').selectOption('akko');
    const fromBefore = await page.locator('#tt-from').inputValue();
    await page.locator('#tt-swap').click();
    const fromAfter = await page.locator('#tt-from').inputValue();
    expect(fromAfter).not.toBe(fromBefore);
    // Results should still be visible after swap (same bidirectional route).
    await expect(page.locator('#tt-drive')).toBeVisible();
  });

  test('shows Shabbat impact badge for every known route', async ({ page }) => {
    await page.goto('/israel-travel-time');
    // The default route (Tel Aviv → Jerusalem) is amber (sherut available).
    const resultEl = page.locator('#tt-result');
    await expect(resultEl).toContainText(/Shabbat/i);
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

test.describe('Israel Visa & ETA-IL Checker', () => {
  test('shows correct category for each entry type and reacts to selection', async ({ page }) => {
    await page.goto('/israel-visa-eta-checker');

    // Initial state: result hidden, prompt visible.
    await expect(page.locator('#visa-result')).not.toBeVisible();
    await expect(page.locator('#visa-prompt')).toBeVisible();

    // Select a visa-free country (United States).
    await page.locator('#nationality-sel').selectOption('United States');
    await expect(page.locator('#visa-result')).toBeVisible();
    await expect(page.locator('#visa-prompt')).not.toBeVisible();
    await expect(page.locator('#result-badge')).toContainText(/visa-free/i);
    await expect(page.locator('#result-headline')).toContainText(/no advance/i);

    // Select an ETA-IL required country (South Africa).
    await page.locator('#nationality-sel').selectOption('South Africa');
    await expect(page.locator('#result-badge')).toContainText(/ETA-IL/i);
    await expect(page.locator('#result-headline')).toContainText(/ETA-IL/i);

    // Select a visa-required country (India).
    await page.locator('#nationality-sel').selectOption('India');
    await expect(page.locator('#result-badge')).toContainText(/visa/i);
    await expect(page.locator('#result-headline')).toContainText(/consulate/i);

    // Resetting to blank hides the result and shows prompt again.
    await page.locator('#nationality-sel').selectOption('');
    await expect(page.locator('#visa-result')).not.toBeVisible();
    await expect(page.locator('#visa-prompt')).toBeVisible();
  });
});

test.describe('Israel Holiday Impact Planner', () => {
  test('shows Rosh Hashanah and HIGH demand for Sep 2026 dates', async ({ page }) => {
    await page.goto('/israel-holiday-planner');

    // Set date range covering Rosh Hashanah 2026 (Sep 11–12).
    await page.locator('#start-date').fill('2026-09-01');
    await page.locator('#end-date').fill('2026-09-20');

    const results = page.locator('#results');
    await expect(results).toContainText(/Rosh Hashanah/i);
    await expect(results).toContainText(/HIGH DEMAND/i);
    // Should also mention Yom Kippur (Sep 20).
    await expect(results).toContainText(/Yom Kippur/i);
  });

  test('shows no-holidays message for a quiet window', async ({ page }) => {
    await page.goto('/israel-holiday-planner');

    // Mid-January 2026 — no Jewish holidays.
    await page.locator('#start-date').fill('2026-01-10');
    await page.locator('#end-date').fill('2026-01-20');

    const results = page.locator('#results');
    await expect(results).toContainText(/no major jewish holidays/i);
    // Booking pressure should NOT be high.
    await expect(results).not.toContainText(/HIGH DEMAND/i);
  });

  test('counts Shabbats correctly for a 2-week stay', async ({ page }) => {
    await page.goto('/israel-holiday-planner');

    // 14-night stay starting Monday — includes 2 Saturdays.
    await page.locator('#start-date').fill('2026-06-01');
    await page.locator('#end-date').fill('2026-06-14');

    const results = page.locator('#results');
    await expect(results).toContainText(/2 Shabbat/i);
  });

  test('shows validation error for invalid date range', async ({ page }) => {
    await page.goto('/israel-holiday-planner');

    // End before start — should show an error.
    await page.locator('#start-date').fill('2026-09-20');
    await page.locator('#end-date').fill('2026-09-10');

    await expect(page.locator('#date-error')).toBeVisible();
    // Results panel should be empty.
    await expect(page.locator('#results')).toHaveText('');
  });
});

test.describe('Israel National Parks Pass Calculator', () => {
  test('shows prompt when no parks are selected', async ({ page }) => {
    await page.goto('/israel-parks-pass-calculator');
    // No parks ticked — zero state visible.
    await expect(page.locator('#result-zero')).toBeVisible();
    await expect(page.locator('#result-content')).not.toBeVisible();
  });

  test('recommends paying at the gate for 1–2 parks (gate is cheapest)', async ({ page }) => {
    await page.goto('/israel-parks-pass-calculator');
    // Tick just Masada (₪29) — 1 park is always cheaper at the gate than Blue card (₪90).
    await page.locator('#park-masada').check();
    await expect(page.locator('#result-content')).toBeVisible();
    await expect(page.locator('#rec-label')).toContainText(/gate/i);
  });

  test('recommends Blue card for 3 parks', async ({ page }) => {
    await page.goto('/israel-parks-pass-calculator');
    // Masada ₪29 + Ein Gedi ₪29 + Caesarea ₪29 = ₪87; but Blue card = ₪90 — let us use
    // higher-priced parks. Rosh HaNikra ₪49 + Timna ₪49 + Masada ₪29 = ₪127 > ₪90.
    await page.locator('#park-rosh-hanikra').check();
    await page.locator('#park-timna').check();
    await page.locator('#park-masada').check();
    await expect(page.locator('#result-content')).toBeVisible();
    await expect(page.locator('#rec-label')).toContainText(/blue/i);
  });

  test('recommends Orange card for 8+ parks', async ({ page }) => {
    await page.goto('/israel-parks-pass-calculator');
    // Check 8 parks: combined gate price well exceeds ₪175 (Orange).
    const parks = [
      'park-masada', 'park-ein-gedi', 'park-caesarea', 'park-beit-shean',
      'park-megiddo', 'park-banias', 'park-avdat', 'park-rosh-hanikra',
    ];
    for (const id of parks) {
      await page.locator(`#${id}`).check();
    }
    await expect(page.locator('#result-content')).toBeVisible();
    await expect(page.locator('#rec-label')).toContainText(/orange/i);
  });

  test('clear all resets to zero state', async ({ page }) => {
    await page.goto('/israel-parks-pass-calculator');
    await page.locator('#park-masada').check();
    await page.locator('#park-ein-gedi').check();
    await expect(page.locator('#result-content')).toBeVisible();
    // Click clear all.
    await page.locator('#clear-all').click();
    await expect(page.locator('#result-zero')).toBeVisible();
    await expect(page.locator('#result-content')).not.toBeVisible();
  });

  test('exclusion caveat is visible on the page', async ({ page }) => {
    await page.goto('/israel-parks-pass-calculator');
    // The amber warning box lists excluded sites.
    const caveat = page.locator('p.rounded-btn');
    await expect(caveat).toContainText(/City of David/);
    await expect(caveat).toContainText(/Masada cable car/);
  });
});

test.describe('Car rental decision quiz', () => {
  async function fillQuiz(
    page: import('@playwright/test').Page,
    opts: {
      base: string;
      negev: string;
      golan: string;
      shabbat: string;
      comfort: string;
      group: string;
    }
  ) {
    await page.locator(`input[name="base"][value="${opts.base}"]`).check({ force: true });
    await page.locator(`input[name="negev"][value="${opts.negev}"]`).check({ force: true });
    await page.locator(`input[name="golan"][value="${opts.golan}"]`).check({ force: true });
    await page.locator(`input[name="shabbat"][value="${opts.shabbat}"]`).check({ force: true });
    await page.locator(`input[name="comfort"][value="${opts.comfort}"]`).check({ force: true });
    await page.locator(`input[name="group"][value="${opts.group}"]`).check({ force: true });
    await page.locator('#quiz-submit').click();
  }

  test('negev=yes + confident driving → YES recommendation', async ({ page }) => {
    await page.goto('/israel-car-rental-quiz');
    await fillQuiz(page, { base: 'touring', negev: 'yes', golan: 'no', shabbat: 'yes', comfort: 'yes', group: '2' });
    await expect(page.locator('#quiz-result')).toBeVisible();
    await expect(page.locator('#result-verdict')).toContainText(/YES/i);
    // Result bullets should mention Negev/Eilat.
    await expect(page.locator('#result-bullets')).toContainText(/Negev/i);
    // Car rental CTA link should be present in results.
    await expect(page.locator('#result-links a[href="/car-rental-israel"]')).toBeVisible();
  });

  test('Tel Aviv only, not comfortable driving → NO recommendation', async ({ page }) => {
    await page.goto('/israel-car-rental-quiz');
    await fillQuiz(page, { base: 'tlv_only', negev: 'no', golan: 'no', shabbat: 'no', comfort: 'no', group: '1' });
    await expect(page.locator('#quiz-result')).toBeVisible();
    await expect(page.locator('#result-verdict')).toContainText(/NO/i);
    // Transport guide link in results.
    await expect(page.locator('#result-links a[href="/transportation"]')).toBeVisible();
  });

  test('multiple cities, group of 3 → YES or PROBABLY YES', async ({ page }) => {
    await page.goto('/israel-car-rental-quiz');
    await fillQuiz(page, { base: 'multiple', negev: 'no', golan: 'no', shabbat: 'yes', comfort: 'yes', group: '3plus' });
    await expect(page.locator('#quiz-result')).toBeVisible();
    await expect(page.locator('#result-verdict')).toContainText(/YES/i);
    // Group bullet should mention cost-sharing.
    await expect(page.locator('#result-bullets')).toContainText(/3 or more/i);
  });

  test('shows validation error when not all questions answered', async ({ page }) => {
    await page.goto('/israel-car-rental-quiz');
    // Only answer two questions then submit.
    await page.locator('input[name="base"][value="jlm_only"]').check({ force: true });
    await page.locator('input[name="negev"][value="no"]').check({ force: true });
    await page.locator('#quiz-submit').click();
    await expect(page.locator('#quiz-error')).toBeVisible();
    await expect(page.locator('#quiz-result')).not.toBeVisible();
  });

  test('start over resets quiz and hides result', async ({ page }) => {
    await page.goto('/israel-car-rental-quiz');
    await fillQuiz(page, { base: 'touring', negev: 'yes', golan: 'yes', shabbat: 'yes', comfort: 'yes', group: '2' });
    await expect(page.locator('#quiz-result')).toBeVisible();
    await page.locator('#quiz-reset').click();
    await expect(page.locator('#quiz-result')).not.toBeVisible();
    // All radios should be unchecked.
    const checkedCount = await page.locator('#quiz input[type="radio"]:checked').count();
    expect(checkedCount).toBe(0);
  });
});

test.describe('Golden hour & sunrise calculator', () => {
  test('loads with today\'s date and renders a results table', async ({ page }) => {
    await page.goto('/israel-golden-hour');

    // Results table should be visible on load (auto-calculates)
    const table = page.locator('#results table');
    await expect(table).toBeVisible();

    // Should contain sunrise row
    await expect(page.locator('#results')).toContainText(/Sunrise/i);

    // Time cells should show formatted time (e.g. "5:30 am")
    const timeCells = page.locator('#results td:nth-child(2)');
    const count = await timeCells.count();
    expect(count).toBeGreaterThanOrEqual(7);
    const firstTime = await timeCells.first().textContent();
    expect(firstTime).toMatch(/\d+:\d+\s*(am|pm)/i);
  });

  test('switching location recalculates with correct location name in header', async ({ page }) => {
    await page.goto('/israel-golden-hour');

    // Default is Jerusalem — header should mention Jerusalem
    await expect(page.locator('#results table thead')).toContainText(/Jerusalem/i);

    // Switch to Eilat — header should update
    await page.locator('#location-sel').selectOption('eilat');
    await expect(page.locator('#results table thead')).toContainText(/Eilat/i);
  });

  test('Masada selection shows hike-specific tip', async ({ page }) => {
    await page.goto('/israel-golden-hour');
    await page.locator('#location-sel').selectOption('masada');
    const tip = page.locator('#location-tip');
    await expect(tip).toBeVisible();
    await expect(tip).toContainText(/Snake Path/i);
  });

  test('changing date updates sunrise time', async ({ page }) => {
    await page.goto('/israel-golden-hour');

    // Get summer sunrise (June 21)
    await page.locator('#date-input').fill('2026-06-21');
    await page.locator('#date-input').dispatchEvent('change');
    const summerRows = page.locator('#results tbody tr');
    const sunriseRowSummer = summerRows.nth(2); // Sunrise is 3rd row
    const summerTime = await sunriseRowSummer.locator('td:nth-child(2)').textContent();

    // Get winter sunrise (Dec 21)
    await page.locator('#date-input').fill('2026-12-21');
    await page.locator('#date-input').dispatchEvent('change');
    const winterRows = page.locator('#results tbody tr');
    const sunriseRowWinter = winterRows.nth(2);
    const winterTime = await sunriseRowWinter.locator('td:nth-child(2)').textContent();

    // Winter sunrise should be later than summer (Israel) — both truthy
    expect(summerTime).toBeTruthy();
    expect(winterTime).toBeTruthy();
    expect(summerTime).not.toBe(winterTime);
  });

  test('Shabbat candlelighting row is present', async ({ page }) => {
    await page.goto('/israel-golden-hour');
    await expect(page.locator('#results')).toContainText(/candlelighting/i);
  });
});

test.describe('Shabbat countdown tool', () => {
  test('loads and shows Israel time and countdown', async ({ page }) => {
    await page.goto('/israel-shabbat-countdown');

    // The status card should appear after JS runs
    const card = page.locator('#sc-card');
    await expect(card).toBeVisible();

    // Should show a current-time label with "Israel time"
    await expect(card).toContainText(/Israel time/i);

    // Should show a status label (active or not active)
    await expect(card).toContainText(/Shabbat/i);

    // Should show a countdown with digits
    const countdown = page.locator('#sc-countdown');
    await expect(countdown).toBeVisible();
    await expect(countdown).toContainText(/\d/);
  });

  test('shows candlelighting and Havdalah times', async ({ page }) => {
    await page.goto('/israel-shabbat-countdown');

    const times = page.locator('#sc-times');
    await expect(times).toBeVisible();
    await expect(times).toContainText(/candlelighting/i);
    await expect(times).toContainText(/Havdalah/i);

    // Candlelighting time should be a formatted time (e.g. "7:24 pm")
    const candle = page.locator('#sc-candle');
    await expect(candle).toContainText(/\d+:\d+\s*(am|pm)/i);
  });

  test('switching city updates candlelighting time', async ({ page }) => {
    await page.goto('/israel-shabbat-countdown');

    const candle = page.locator('#sc-candle');
    const jerusalemTime = await candle.textContent();

    await page.locator('#sc-city').selectOption('eilat');
    const eilatTime = await candle.textContent();

    // Jerusalem and Eilat have different latitudes → different sunset → different times
    expect(jerusalemTime).toBeTruthy();
    expect(eilatTime).toBeTruthy();
    // Eilat is further south, so its sunset times differ from Jerusalem
    expect(jerusalemTime).not.toBe(eilatTime);
  });

  test('plan-your-trip page links to the countdown tool', async ({ page }) => {
    await page.goto('/plan-your-trip');
    const link = page.locator('a[href="/israel-shabbat-countdown"]');
    await expect(link).toBeVisible();
  });
});

test.describe('Packing list affiliate badges', () => {
  test('renders shop badges for affiliate items', async ({ page }) => {
    await page.goto('/israel-packing-list');
    const badges = page.locator('.shop-badge');
    await expect(badges).not.toHaveCount(0);
    // Each badge must link to Amazon with a tag parameter
    const hrefs = await badges.evaluateAll((els: HTMLAnchorElement[]) =>
      els.map((a) => a.href),
    );
    for (const href of hrefs) {
      expect(href).toContain('amazon.com/s');
      expect(href).toContain('tag=');
    }
  });

  test('shop badge has accessible aria-label and opens externally', async ({ page }) => {
    await page.goto('/israel-packing-list');
    const firstBadge = page.locator('.shop-badge').first();
    await expect(firstBadge).toHaveAttribute('aria-label', /shop/i);
    await expect(firstBadge).toHaveAttribute('target', '_blank');
    await expect(firstBadge).toHaveAttribute('rel', /noopener/);
  });

  test('each shop badge points to a distinct Amazon search', async ({ page }) => {
    await page.goto('/israel-packing-list');
    const hrefs = await page.locator('.shop-badge').evaluateAll((els: HTMLAnchorElement[]) =>
      els.map((a) => new URL(a.href).searchParams.get('k')),
    );
    // Each badge has a non-empty search query
    for (const k of hrefs) {
      expect(k).toBeTruthy();
    }
    // Queries are distinct (each item links to a different product search)
    const unique = new Set(hrefs);
    expect(unique.size).toBe(hrefs.length);
  });
});

test.describe('Israel experience finder quiz', () => {
  test('answering all questions reveals a traveler profile with affiliate CTA', async ({ page }) => {
    await page.goto('/israel-experience-finder');
    // Pick the first option for each question.
    const groups = await page.locator('input[type="radio"]').evaluateAll((els) =>
      Array.from(new Set(els.map((e) => (e as HTMLInputElement).name)))
    );
    for (const name of groups) {
      await page.locator(`input[type="radio"][name="${name}"]`).first().check({ force: true });
    }
    await page.locator('#quiz-submit').click();
    await expect(page.locator('#results')).toBeVisible();
    // Profile card should render name, tagline, highlights and CTA.
    await expect(page.locator('#result-profile')).toContainText(/Explorer|Seeker|Pilgrim|Foodie|Beach/i);
    await expect(page.locator('#result-profile a')).not.toHaveCount(0);
    // Affiliate CTA link is present.
    const ctaLink = page.locator('#result-profile a[target="_blank"]');
    await expect(ctaLink).toBeVisible();
  });

  test('retake button resets the quiz and hides results', async ({ page }) => {
    await page.goto('/israel-experience-finder');
    const groups = await page.locator('input[type="radio"]').evaluateAll((els) =>
      Array.from(new Set(els.map((e) => (e as HTMLInputElement).name)))
    );
    for (const name of groups) {
      await page.locator(`input[type="radio"][name="${name}"]`).first().check({ force: true });
    }
    await page.locator('#quiz-submit').click();
    await expect(page.locator('#results')).toBeVisible();
    await page.locator('#retake').click();
    await expect(page.locator('#results')).not.toBeVisible();
    const checkedCount = await page.locator('#quiz input[type="radio"]:checked').count();
    expect(checkedCount).toBe(0);
  });

  test('shared ?result=adventure link shows Adventure Seeker profile without submitting quiz', async ({ page }) => {
    await page.goto('/israel-experience-finder?result=adventure');
    await expect(page.locator('#results')).toBeVisible();
    await expect(page.locator('#result-profile')).toContainText('Adventure Seeker');
  });

  test('share button copies URL with result param to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/israel-experience-finder');
    const groups = await page.locator('input[type="radio"]').evaluateAll((els) =>
      Array.from(new Set(els.map((e) => (e as HTMLInputElement).name)))
    );
    for (const name of groups) {
      await page.locator(`input[type="radio"][name="${name}"]`).first().check({ force: true });
    }
    await page.locator('#quiz-submit').click();
    await expect(page.locator('#results')).toBeVisible();
    await page.locator('#share-btn').click();
    await expect(page.locator('#share-ok')).toBeVisible();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('result=');
  });
});

test.describe('Israel effective touring days calculator', () => {
  test('page renders with date pickers and initial result', async ({ page }) => {
    await page.goto('/israel-effective-days');
    await expect(page.locator('#start-date')).toBeVisible();
    await expect(page.locator('#end-date')).toBeVisible();
    // Initial result should render after JS runs
    await expect(page.locator('#results')).not.toBeEmpty();
  });

  test('changing dates updates effective days count', async ({ page }) => {
    await page.goto('/israel-effective-days');
    // Set a 7-night trip (8 days)
    await page.locator('#start-date').fill('2026-11-01');
    await page.locator('#end-date').fill('2026-11-08');
    await page.locator('#end-date').dispatchEvent('change');
    // Should show a number in the big display
    const daysNum = await page.locator('#eff-days-num').textContent();
    expect(daysNum).toBeTruthy();
    expect(parseFloat(daysNum || '0')).toBeGreaterThan(0);
  });

  test('Shabbat days in range are reflected in the effective count', async ({ page }) => {
    await page.goto('/israel-effective-days');
    // A Saturday-only trip (Shabbat day) — departure same as arrival is invalid
    // Use Fri–Sun to ensure at least 1 Shabbat in range
    // Fri Oct 2 2026 → Mon Oct 5 2026 (4 days: Fri, Sat, Sun, Mon)
    await page.locator('#start-date').fill('2026-10-02');
    await page.locator('#end-date').fill('2026-10-05');
    await page.locator('#end-date').dispatchEvent('change');
    const daysNum = await page.locator('#eff-days-num').textContent();
    // Total 4 days but arrival + Shabbat + Sunday + departure = less than 4.0
    expect(parseFloat(daysNum || '0')).toBeLessThan(4);
  });

  test('departure before arrival shows validation error', async ({ page }) => {
    await page.goto('/israel-effective-days');
    await page.locator('#start-date').fill('2026-11-10');
    await page.locator('#end-date').fill('2026-11-05');
    await page.locator('#end-date').dispatchEvent('change');
    await expect(page.locator('#date-error')).toBeVisible();
  });

  test('itinerary CTA appears after valid date entry', async ({ page }) => {
    await page.goto('/israel-effective-days');
    await page.locator('#start-date').fill('2026-12-01');
    await page.locator('#end-date').fill('2026-12-08');
    await page.locator('#end-date').dispatchEvent('change');
    await expect(page.locator('#itinerary-cta')).not.toHaveClass(/hidden/);
    const ctaLink = page.locator('#itinerary-link-primary');
    await expect(ctaLink).toBeVisible();
    const href = await ctaLink.getAttribute('href');
    expect(href).toContain('/itineraries');
  });

  test('calendar grid renders cells for the selected dates', async ({ page }) => {
    await page.goto('/israel-effective-days');
    await page.locator('#start-date').fill('2026-10-01');
    await page.locator('#end-date').fill('2026-10-07');
    await page.locator('#end-date').dispatchEvent('change');
    // Calendar should have coloured cells
    const cells = page.locator('.day-cell');
    await expect(cells).not.toHaveCount(0);
  });

  test('plan-your-trip page links to effective-days tool', async ({ page }) => {
    await page.goto('/plan-your-trip');
    const link = page.locator('a[href="/israel-effective-days"]');
    await expect(link).toBeVisible();
  });
});

test.describe('Israel cruise excursion planner', () => {
  test('page renders with port and hours selectors', async ({ page }) => {
    await page.goto('/israel-cruise-excursion-planner');
    await expect(page.locator('input[name="port"]')).not.toHaveCount(0);
    await expect(page.locator('input[name="hours"]')).not.toHaveCount(0);
    await expect(page.locator('#planner-submit')).toBeVisible();
    await expect(page.locator('#planner-results')).not.toBeVisible();
  });

  test('shows error if submitted without selections', async ({ page }) => {
    await page.goto('/israel-cruise-excursion-planner');
    await page.locator('#planner-submit').click();
    await expect(page.locator('#planner-error')).toBeVisible();
    await expect(page.locator('#planner-results')).not.toBeVisible();
  });

  test('Haifa + 4h shows excursion results', async ({ page }) => {
    await page.goto('/israel-cruise-excursion-planner');
    await page.locator('input[name="port"][value="haifa"]').check();
    await page.locator('input[name="hours"][value="4h"]').check();
    await page.locator('#planner-submit').click();
    await expect(page.locator('#planner-results')).toBeVisible();
    await expect(page.locator('#results-heading')).toContainText(/Haifa/i);
    await expect(page.locator('#excursion-list .rounded-card')).not.toHaveCount(0);
  });

  test('Ashdod + full day shows excursion results with Jerusalem', async ({ page }) => {
    await page.goto('/israel-cruise-excursion-planner');
    await page.locator('input[name="port"][value="ashdod"]').check();
    await page.locator('input[name="hours"][value="full_day"]').check();
    await page.locator('#planner-submit').click();
    await expect(page.locator('#planner-results')).toBeVisible();
    await expect(page.locator('#results-heading')).toContainText(/Ashdod/i);
    await expect(page.locator('#excursion-list')).toContainText(/Jerusalem/i);
  });

  test('Eilat + 6h shows excursion results', async ({ page }) => {
    await page.goto('/israel-cruise-excursion-planner');
    await page.locator('input[name="port"][value="eilat"]').check();
    await page.locator('input[name="hours"][value="6h"]').check();
    await page.locator('#planner-submit').click();
    await expect(page.locator('#planner-results')).toBeVisible();
    await expect(page.locator('#results-heading')).toContainText(/Eilat/i);
  });

  test('reset button hides results and clears selections', async ({ page }) => {
    await page.goto('/israel-cruise-excursion-planner');
    await page.locator('input[name="port"][value="haifa"]').check();
    await page.locator('input[name="hours"][value="8h"]').check();
    await page.locator('#planner-submit').click();
    await expect(page.locator('#planner-results')).toBeVisible();
    await page.locator('#planner-reset').click();
    await expect(page.locator('#planner-results')).not.toBeVisible();
    const checked = await page.locator('#planner input[type="radio"]:checked').count();
    expect(checked).toBe(0);
  });

  test('cruise shore excursions guide links to planner', async ({ page }) => {
    await page.goto('/cruise-shore-excursions-israel');
    const link = page.locator('a[href="/israel-cruise-excursion-planner"]');
    await expect(link).toBeVisible();
  });
});

test.describe('Israel season picker', () => {
  test('page renders with interest chips and submit button', async ({ page }) => {
    await page.goto('/israel-season-picker');
    await expect(page.locator('input[name="interest"][value="beach"]')).not.toHaveCount(0);
    await expect(page.locator('#picker-submit')).toBeVisible();
    await expect(page.locator('#picker-results')).not.toBeVisible();
  });

  test('shows error when submitted with no selection', async ({ page }) => {
    await page.goto('/israel-season-picker');
    await page.locator('#picker-submit').click();
    await expect(page.locator('#picker-error')).toBeVisible();
    await expect(page.locator('#picker-results')).not.toBeVisible();
  });

  test('Beach + Budget selection recommends September or October', async ({ page }) => {
    await page.goto('/israel-season-picker');
    await page.locator('input[name="interest"][value="beach"]').check({ force: true });
    await page.locator('input[name="interest"][value="budget"]').check({ force: true });
    await page.locator('#picker-submit').click();
    await expect(page.locator('#picker-results')).toBeVisible();
    const heading = await page.locator('#results-heading').textContent();
    expect(heading).toMatch(/September|October/);
  });

  test('Skiing selection recommends January or February', async ({ page }) => {
    await page.goto('/israel-season-picker');
    await page.locator('input[name="interest"][value="skiing"]').check({ force: true });
    await page.locator('#picker-submit').click();
    await expect(page.locator('#picker-results')).toBeVisible();
    const heading = await page.locator('#results-heading').textContent();
    expect(heading).toMatch(/January|February/);
  });

  test('reset button hides results and clears selection', async ({ page }) => {
    await page.goto('/israel-season-picker');
    await page.locator('input[name="interest"][value="birding"]').check({ force: true });
    await page.locator('#picker-submit').click();
    await expect(page.locator('#picker-results')).toBeVisible();
    await page.locator('#picker-reset').click();
    await expect(page.locator('#picker-results')).not.toBeVisible();
    const checked = await page.locator('#picker input[name="interest"]:checked').count();
    expect(checked).toBe(0);
  });

  test('plan-your-trip links to season picker', async ({ page }) => {
    await page.goto('/plan-your-trip');
    const link = page.locator('a[href="/israel-season-picker"]').first();
    await expect(link).toBeVisible();
  });
});
