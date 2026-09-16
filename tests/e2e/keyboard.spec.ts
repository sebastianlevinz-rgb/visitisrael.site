import { test, expect } from '@playwright/test';

test('skip link is first focusable element and moves focus to #main', async ({ page }) => {
  await page.goto('/');
  // First Tab from the top of the page focuses the skip link (sr-only but visible on focus)
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    return { tag: el.tagName.toLowerCase(), href: el.getAttribute('href') };
  });
  expect(focused.tag, 'first tab target should be an anchor').toBe('a');
  expect(focused.href, 'skip link must point to #main').toBe('#main');

  // Activating the skip link moves focus into the main landmark
  await page.keyboard.press('Enter');
  const mainId = await page.evaluate(() => (document.activeElement as HTMLElement)?.id);
  expect(mainId, 'focus should land on #main after skip link activation').toBe('main');
});

test('mobile menu opens, lists the plan links and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const summary = page.locator('#mobile-menu summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#mobile-menu')).toHaveAttribute('open', '');
  await expect(page.locator('#mobile-menu a[href="/visa-information"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).not.toHaveAttribute('open', '');
});
