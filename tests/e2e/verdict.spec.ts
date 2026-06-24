import { test, expect } from '@playwright/test';

test.describe('TourVerdict component — attraction pages', () => {
  test('verdict box is visible on an attraction page', async ({ page }) => {
    await page.goto('/dead-sea/masada');
    const verdict = page.locator('[data-tour-verdict]');
    await expect(verdict).toBeVisible();
    // Heading must name the attraction.
    await expect(verdict.locator('#verdict-heading')).toContainText('Masada');
    // CTA link must have correct rel attributes.
    const cta = verdict.locator('a[rel]');
    await expect(cta).toHaveAttribute('rel', /sponsored/);
    await expect(cta).toHaveAttribute('rel', /nofollow/);
    await expect(cta).toHaveAttribute('rel', /noopener/);
    await expect(cta).toHaveAttribute('target', '_blank');
  });

  test('verdict box is visible on a second attraction page', async ({ page }) => {
    await page.goto('/jerusalem/western-wall');
    const verdict = page.locator('[data-tour-verdict]');
    await expect(verdict).toBeVisible();
    await expect(verdict.locator('#verdict-heading')).toContainText('Western Wall');
  });
});

test.describe('TourVerdict component — tour guide pages', () => {
  test('verdict box appears on day-trips-from-jerusalem guide', async ({ page }) => {
    await page.goto('/day-trips-from-jerusalem');
    const verdict = page.locator('[data-tour-verdict]');
    await expect(verdict).toBeVisible();
    await expect(verdict.locator('#verdict-heading')).toContainText('Jerusalem');
    // "Worth it" badge must be present.
    await expect(verdict.getByLabel('Verdict: yes, worth booking')).toBeVisible();
  });

  test('verdict box appears on masada-dead-sea-day-trip guide', async ({ page }) => {
    await page.goto('/masada-dead-sea-day-trip');
    const verdict = page.locator('[data-tour-verdict]');
    await expect(verdict).toBeVisible();
    await expect(verdict.locator('#verdict-heading')).toContainText('Masada');
  });

  test('verdict box does NOT appear on non-tour guides', async ({ page }) => {
    await page.goto('/first-time-in-israel');
    await expect(page.locator('[data-tour-verdict]')).not.toBeVisible();
  });
});

test.describe('TourVerdict a11y', () => {
  test('verdict aside has accessible label', async ({ page }) => {
    await page.goto('/dead-sea/masada');
    const verdict = page.locator('[data-tour-verdict]');
    await expect(verdict).toHaveAttribute('aria-labelledby', 'verdict-heading');
    // Reasons list has accessible label.
    const reasonsList = verdict.locator('ul[aria-label]');
    await expect(reasonsList).toBeVisible();
  });
});
