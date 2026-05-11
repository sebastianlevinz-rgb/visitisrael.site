/**
 * Footer — A11Y-05 wiring: accessibility-statement link in current locale.
 *
 * Verifies that <Footer /> renders the locale-correct accessibility-statement
 * href by delegating to lib/seo/accessibility-link.ts. Plan 10 audit
 * dashboard's AUD-028 rule scans for this exact href.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

const getLocaleMock = vi.fn();
const getTranslationsMock = vi.fn();

vi.mock('next-intl/server', () => ({
  getLocale: () => getLocaleMock(),
  getTranslations: (...args: unknown[]) => getTranslationsMock(...args),
}));

import { Footer } from '@/components/layout/Footer';

beforeEach(() => {
  getLocaleMock.mockReset();
  getTranslationsMock.mockReset();
  // Stub t() — return key + interpolated year for copyright.
  getTranslationsMock.mockResolvedValue(
    (key: string, vars?: Record<string, unknown>) => {
      if (vars && 'year' in vars) return `${key} ${String(vars.year)}`;
      return key;
    },
  );
});

afterEach(() => {
  cleanup();
});

describe('Footer — A11Y-05 / AUD-028', () => {
  it('renders accessibility-statement link on HE locale (no prefix)', async () => {
    getLocaleMock.mockResolvedValueOnce('he');
    const ui = await Footer();
    render(ui as React.ReactElement);
    const link = screen.getByText('accessibility');
    expect(link.getAttribute('href')).toBe('/accessibility-statement');
  });

  it('renders accessibility-statement link on EN locale (/en/ prefix)', async () => {
    getLocaleMock.mockResolvedValueOnce('en');
    const ui = await Footer();
    render(ui as React.ReactElement);
    const link = screen.getByText('accessibility');
    expect(link.getAttribute('href')).toBe('/en/accessibility-statement');
  });

  it('renders all 5 footer links (privacy, about, contact, affiliate, accessibility)', async () => {
    getLocaleMock.mockResolvedValueOnce('he');
    const ui = await Footer();
    render(ui as React.ReactElement);
    const expected = [
      'privacy',
      'about',
      'contact',
      'affiliate',
      'accessibility',
    ];
    for (const key of expected) {
      expect(screen.getByText(key)).toBeInTheDocument();
    }
  });

  it('uses semantic <footer role="contentinfo">', async () => {
    getLocaleMock.mockResolvedValueOnce('he');
    const ui = await Footer();
    render(ui as React.ReactElement);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
