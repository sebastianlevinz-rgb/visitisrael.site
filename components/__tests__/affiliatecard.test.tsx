/**
 * AffiliateCard — plan 06 wired contract.
 *
 * Replaces the plan-05 stub test (`affiliatecard-stub.test.tsx`).
 *
 * Locks four contracts:
 *   1. Real partner (`booking`) renders an <a href> containing booking.com
 *      (helper is invoked; no more `#TODO-PLAN-06` sentinel)
 *   2. AFF-06: `<AffiliateDisclosure>` DOM-precedes the affiliate <a>
 *   3. Conflict D: Klook + GoCity render null (availability check short-circuits)
 *   4. data-aff-disclosed="true" + rel="sponsored nofollow noopener" + target="_blank"
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(async () => 'en'),
}));

import { AffiliateCard } from '@/components/travel/AffiliateCard';

afterEach(() => cleanup());

/**
 * Helper — async RSC component, must be invoked + awaited before render.
 */
async function renderCard(props: Parameters<typeof AffiliateCard>[0]) {
  const element = await AffiliateCard(props);
  if (element === null) return null;
  return render(element);
}

describe('AffiliateCard — plan 06 wired contract', () => {
  it('booking partner → href contains booking.com (real helper invoked)', async () => {
    const result = await renderCard({
      partner: 'booking',
      destination: 'Jerusalem',
    });
    expect(result).not.toBeNull();
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toContain('booking.com');
    expect(link.getAttribute('href')).toContain('ss=Jerusalem');
    expect(link.getAttribute('href')).not.toBe('#TODO-PLAN-06');
  });

  it('viator partner → href contains viator.com (different helper dispatches correctly)', async () => {
    const result = await renderCard({
      partner: 'viator',
      destination: 'd919',
    });
    expect(result).not.toBeNull();
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toContain('viator.com');
  });

  it('AFF-06 — disclosure DOM-precedes the affiliate <a>', async () => {
    await renderCard({
      partner: 'getYourGuide',
      destination: 'israel-l169033',
      productId: 'tour-x',
    });
    const disclosure = screen.getByRole('note');
    const link = screen.getByRole('link');
    const position = disclosure.compareDocumentPosition(link);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeGreaterThan(0);
    expect(position & Node.DOCUMENT_POSITION_PRECEDING).toBe(0);
  });

  it('rel/target/data-aff-disclosed attributes present on the link', async () => {
    await renderCard({ partner: 'rentalcars', destination: 'Tel Aviv' });
    const link = screen.getByRole('link');
    expect(link.getAttribute('rel')).toBe('sponsored nofollow noopener');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('data-aff-disclosed')).toBe('true');
  });

  it('Conflict D — Klook partner renders null (availability=absent)', async () => {
    const element = await AffiliateCard({
      partner: 'klook',
      destination: 'Jerusalem',
    });
    expect(element).toBeNull();
  });

  it('Conflict D — GoCity partner renders null (availability=absent)', async () => {
    const element = await AffiliateCard({
      partner: 'goCity',
      destination: 'Jerusalem',
    });
    expect(element).toBeNull();
  });

  it('no #TODO-PLAN-06 sentinel anywhere in the wired output', async () => {
    await renderCard({ partner: 'discoverCars', destination: 'Eilat' });
    const wrapper = document.querySelector('[data-component="affiliate-card"]');
    expect(wrapper?.outerHTML).not.toContain('#TODO-PLAN-06');
  });
});
