/**
 * getYourGuideLink — 4-test contract (AUD-031: israel-l169033).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getYourGuideLink } from '../getYourGuide';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('getYourGuideLink', () => {
  it('returns URL with partner_id when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_GYG_PARTNER_ID', 'GYG-ISR-001');
    const url = getYourGuideLink({ locationCode: 'israel-l169033' });
    expect(url).toContain('partner_id=GYG-ISR-001');
    expect(url).toContain('israel-l169033');
  });

  it('gracefully degrades without partner_id', () => {
    vi.stubEnv('NEXT_PUBLIC_GYG_PARTNER_ID', '');
    const url = getYourGuideLink({ locationCode: 'israel-l169033' });
    expect(url).not.toContain('partner_id=');
    expect(url).toContain('getyourguide.com');
  });

  it('URL-encodes locationCode with productId (Jerusalem tour)', () => {
    const url = getYourGuideLink({
      locationCode: 'jerusalem-l173',
      productId: 'tour 123',
    });
    expect(url).toMatch(/jerusalem-l173/);
    expect(url).toMatch(/tour%20123|tour-123/);
  });

  it('rejects empty locationCode via Zod', () => {
    expect(() => getYourGuideLink({ locationCode: '' } as never)).toThrow();
  });
});
