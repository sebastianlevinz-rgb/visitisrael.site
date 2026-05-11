/**
 * AffiliateCard STUB — AFF-06 DOM-order contract.
 *
 * Plan 06 wires the real affiliate helper to the `href`. Plan 05's job is
 * to LOCK two contracts:
 *
 *   1. `<AffiliateDisclosure>` DOM-precedes the affiliate `<a>` on every
 *      AffiliateCard instance (proven via `compareDocumentPosition`).
 *   2. The current `href` is the stub fragment `#TODO-PLAN-06` so plan 06
 *      can grep for the marker and swap it without ambiguity.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(async () => 'en'),
}));

import { AffiliateCard } from '@/components/travel/AffiliateCard';

afterEach(() => cleanup());

/**
 * Helper — RSC async components (React 19) are not auto-resolved by RTL's
 * sync render. Pattern: invoke as a plain function, await the promise,
 * then render the returned element.
 */
async function renderAffiliateCard(props: Parameters<typeof AffiliateCard>[0]) {
  const element = await AffiliateCard(props);
  return render(element);
}

describe('AffiliateCard — STUB contract (plan 06 wires real helpers)', () => {
  it('renders an inert href = #TODO-PLAN-06', async () => {
    await renderAffiliateCard({ partner: 'booking', destination: 'Jerusalem' });
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('#TODO-PLAN-06');
  });

  it('sets rel="sponsored nofollow noopener" + target="_blank"', async () => {
    await renderAffiliateCard({ partner: 'viator', destination: 'Jerusalem' });
    const link = screen.getByRole('link');
    expect(link.getAttribute('rel')).toBe('sponsored nofollow noopener');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('disclosure DOM-precedes the affiliate <a> (AFF-06)', async () => {
    await renderAffiliateCard({
      partner: 'getYourGuide',
      destination: 'Tel Aviv',
      productId: 'abc',
    });
    const disclosure = screen.getByRole('note');
    const link = screen.getByRole('link');

    // disclosure.compareDocumentPosition(link) bits:
    //   2 (DOCUMENT_POSITION_PRECEDING) - link is before disclosure
    //   4 (DOCUMENT_POSITION_FOLLOWING) - link is after disclosure  ← we want this
    const position = disclosure.compareDocumentPosition(link);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeGreaterThan(0);
    expect(position & Node.DOCUMENT_POSITION_PRECEDING).toBe(0);
  });

  it('partner + destination + productId surface as data attributes / label', async () => {
    await renderAffiliateCard({
      partner: 'rentalcars',
      destination: 'Eilat',
      productId: 'xyz',
    });
    const wrapper = document.querySelector('[data-component="affiliate-card"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute('data-partner')).toBe('rentalcars');
    // Default label includes partner + destination + productId
    expect(screen.getByRole('link').textContent).toContain('rentalcars');
    expect(screen.getByRole('link').textContent).toContain('Eilat');
    expect(screen.getByRole('link').textContent).toContain('xyz');
  });
});
