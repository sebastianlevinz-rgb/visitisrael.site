/**
 * rentalcarsLink — 4-test contract (AUD-031: Tel Aviv / Jerusalem pickup).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rentalcarsLink } from '../rentalcars';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('rentalcarsLink', () => {
  it('returns URL with affiliateCode when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_RENTALCARS_AID', 'AWIN-9999');
    const url = rentalcarsLink({ pickupLocation: 'Tel Aviv Airport' });
    expect(url).toContain('affiliateCode=AWIN-9999');
    expect(url).toMatch(/pickupLocation=Tel(\+|%20)Aviv/);
  });

  it('gracefully degrades without affiliateCode', () => {
    vi.stubEnv('NEXT_PUBLIC_RENTALCARS_AID', '');
    const url = rentalcarsLink({ pickupLocation: 'Jerusalem' });
    expect(url).not.toContain('affiliateCode=');
    expect(url).toContain('rentalcars.com');
  });

  it('URL-encodes free-text pickup + dropoff (Tel Aviv → Eilat)', () => {
    const url = rentalcarsLink({
      pickupLocation: 'Tel Aviv',
      dropoffLocation: 'Eilat Airport',
    });
    expect(url).toMatch(/pickupLocation=Tel(\+|%20)Aviv/);
    expect(url).toMatch(/dropoffLocation=Eilat(\+|%20)Airport/);
  });

  it('rejects empty pickupLocation via Zod', () => {
    expect(() => rentalcarsLink({ pickupLocation: '' } as never)).toThrow();
  });
});
