import { test, expect } from '@playwright/test';

test.describe('TicketBlock component — paid admission attractions', () => {
  test('ticket block appears on Masada with price and Tiqets CTA', async ({ page }) => {
    await page.goto('/dead-sea/masada');
    const block = page.locator('[data-ticket-block]');
    await expect(block).toBeVisible();
    await expect(block.locator('#ticket-heading')).toContainText('Masada');
    // Price range badge must be shown (not free).
    await expect(block.getByText(/₪/)).toBeVisible();
    // At least one affiliate CTA link with correct rel.
    const links = block.locator('a[rel]');
    await expect(links.first()).toHaveAttribute('rel', /sponsored/);
    await expect(links.first()).toHaveAttribute('rel', /nofollow/);
    await expect(links.first()).toHaveAttribute('rel', /noopener/);
    await expect(links.first()).toHaveAttribute('target', '_blank');
  });

  test('ticket block appears on Tower of David with booking-required badge', async ({ page }) => {
    await page.goto('/jerusalem/tower-of-david');
    const block = page.locator('[data-ticket-block]');
    await expect(block).toBeVisible();
    await expect(block.getByText(/Advance booking required/i)).toBeVisible();
  });
});

test.describe('TicketBlock component — free-entry attractions', () => {
  test('ticket block on Bahá\'í Gardens shows free entry badge', async ({ page }) => {
    await page.goto('/haifa/bahai-gardens');
    const block = page.locator('[data-ticket-block]');
    await expect(block).toBeVisible();
    await expect(block.getByText(/Free entry/i)).toBeVisible();
    // No paid CTA buttons on a free-entry walk-in attraction.
    await expect(block.locator('a[rel*="sponsored"]')).not.toBeVisible();
  });

  test('ticket block on Yad Vashem shows free entry + GYG tours link', async ({ page }) => {
    await page.goto('/jerusalem/yad-vashem');
    const block = page.locator('[data-ticket-block]');
    await expect(block).toBeVisible();
    await expect(block.getByText(/Free entry/i)).toBeVisible();
    // Guided-tour CTA should be present (gygTicketsQuery set).
    await expect(block.locator('a[rel*="sponsored"]')).toBeVisible();
  });
});

test.describe('TicketBlock a11y', () => {
  test('ticket block aside has accessible label', async ({ page }) => {
    await page.goto('/dead-sea/masada');
    const block = page.locator('[data-ticket-block]');
    await expect(block).toHaveAttribute('aria-labelledby', 'ticket-heading');
  });

  test('attraction without ticketInfo has no ticket block', async ({ page }) => {
    // Western Wall is a religious site with no ticketInfo set.
    await page.goto('/jerusalem/western-wall');
    await expect(page.locator('[data-ticket-block]')).not.toBeVisible();
  });
});
