/**
 * SkipNav specifics — A11Y-02.
 *
 * - Hebrew text on HE locale: "דלג לתוכן הראשי"
 * - English text on EN locale: "Skip to main content"
 * - href targets #main-content
 * - First focusable element on the page (verified via structural position
 *   in app/[locale]/layout.tsx — first child of body)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const getLocaleMock = vi.fn();

vi.mock('next-intl/server', () => ({
  getLocale: () => getLocaleMock(),
}));

import { SkipNav } from '@/components/layout/SkipNav';

beforeEach(() => {
  getLocaleMock.mockReset();
});

afterEach(() => {
  cleanup();
});

describe('SkipNav — A11Y-02', () => {
  it('renders Hebrew label on HE locale', async () => {
    getLocaleMock.mockResolvedValueOnce('he');
    const ui = await SkipNav();
    render(ui as React.ReactElement);
    const link = screen.getByRole('link');
    expect(link.textContent).toBe('דלג לתוכן הראשי');
    expect(link.getAttribute('href')).toBe('#main-content');
  });

  it('renders English label on EN locale', async () => {
    getLocaleMock.mockResolvedValueOnce('en');
    const ui = await SkipNav();
    render(ui as React.ReactElement);
    const link = screen.getByRole('link');
    expect(link.textContent).toBe('Skip to main content');
    expect(link.getAttribute('href')).toBe('#main-content');
  });

  it('uses logical positioning (focus:start-* not focus:left-*)', async () => {
    getLocaleMock.mockResolvedValueOnce('he');
    const ui = await SkipNav();
    render(ui as React.ReactElement);
    const link = screen.getByRole('link');
    const cls = link.getAttribute('class') ?? '';
    // Logical inset-inline-start utility — focus:start-*
    expect(cls).toMatch(/focus:start-/);
    // Physical inset rule MUST NOT appear
    expect(cls).not.toMatch(/focus:left-\d/);
    expect(cls).not.toMatch(/focus:right-\d/);
  });
});

describe('SkipNav — structural placement in layout', () => {
  it('is the first child of the locale layout body', () => {
    const layout = readFileSync(
      join(process.cwd(), 'app/[locale]/layout.tsx'),
      'utf8',
    );
    // <body> contains <SkipNav /> BEFORE <div id="main-content"> and <Footer />
    const bodyStartIdx = layout.indexOf('<body>');
    const skipNavIdx = layout.indexOf('<SkipNav', bodyStartIdx);
    const mainContentIdx = layout.indexOf('id="main-content"', bodyStartIdx);
    const footerIdx = layout.indexOf('<Footer', bodyStartIdx);

    expect(skipNavIdx).toBeGreaterThan(bodyStartIdx);
    expect(skipNavIdx).toBeLessThan(mainContentIdx);
    expect(skipNavIdx).toBeLessThan(footerIdx);
  });
});
