import { test, expect } from '@playwright/test';

test.describe('TourVerdict component — tour comparison guides', () => {
  for (const route of ['/dead-sea-tours-compared', '/day-trips-from-tel-aviv']) {
    test(`verdict box is visible on ${route} with correct affiliate rel`, async ({ page }) => {
      await page.goto(route);
      const verdict = page.locator('[data-tour-verdict]');
      await expect(verdict).toBeVisible();
      await expect(verdict.locator('#verdict-heading')).not.toBeEmpty();
      const cta = verdict.locator('a[rel]');
      await expect(cta).toHaveAttribute('rel', /sponsored/);
      await expect(cta).toHaveAttribute('rel', /nofollow/);
      await expect(cta).toHaveAttribute('rel', /noopener/);
      await expect(cta).toHaveAttribute('target', '_blank');
    });
  }
});
