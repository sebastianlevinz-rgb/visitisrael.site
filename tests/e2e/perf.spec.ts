import { test, expect } from '@playwright/test';

// Uncompressed size budgets (decodedBodySize) for HTML + JS + CSS (no images).
// Astro SSG + Tailwind purge keeps bundles lean; these catch accidental bloat.
const BUDGETS_KB = { html: 150, js: 300, css: 100, total: 500 };

test('homepage page weight stays within budget (HTML + JS + CSS)', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const sizes = await page.evaluate(() => {
    const nav = (
      performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    )[0];
    const resources = performance.getEntriesByType(
      'resource'
    ) as PerformanceResourceTiming[];

    const html = nav?.decodedBodySize ?? 0;
    const js = resources
      .filter((r) => r.initiatorType === 'script' && r.decodedBodySize > 0)
      .reduce((sum, r) => sum + r.decodedBodySize, 0);
    const css = resources
      .filter(
        (r) =>
          (r.initiatorType === 'link' || r.initiatorType === 'css') &&
          r.name.includes('.css') &&
          r.decodedBodySize > 0
      )
      .reduce((sum, r) => sum + r.decodedBodySize, 0);

    return { html, js, css, total: html + js + css };
  });

  const kb = (b: number) => `${(b / 1024).toFixed(1)} KB`;

  expect(
    sizes.html,
    `HTML body ${kb(sizes.html)} exceeds ${BUDGETS_KB.html} KB budget`
  ).toBeLessThan(BUDGETS_KB.html * 1024);

  expect(
    sizes.js,
    `JS payload ${kb(sizes.js)} exceeds ${BUDGETS_KB.js} KB budget`
  ).toBeLessThan(BUDGETS_KB.js * 1024);

  expect(
    sizes.css,
    `CSS payload ${kb(sizes.css)} exceeds ${BUDGETS_KB.css} KB budget`
  ).toBeLessThan(BUDGETS_KB.css * 1024);

  expect(
    sizes.total,
    `Total HTML+JS+CSS ${kb(sizes.total)} exceeds ${BUDGETS_KB.total} KB budget`
  ).toBeLessThan(BUDGETS_KB.total * 1024);
});
