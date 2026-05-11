/**
 * bookingLink — 4-test contract:
 *   1. AID-set → URL contains `aid=` + label
 *   2. AID-unset → graceful degrade to public URL (no `aid=`)
 *   3. URL-encodes free-text destination ("Tel Aviv")
 *   4. Zod rejects empty destination
 *
 * AUD-031 covered: Israel-destination fixtures (Jerusalem, Tel Aviv).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bookingLink } from '../booking';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('bookingLink', () => {
  it('returns URL with aid + label when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_BOOKING_AID', '1234567');
    const url = bookingLink({
      destination: 'Jerusalem',
      label: 'jerusalem-canonical',
    });
    expect(url).toContain('aid=1234567');
    expect(url).toContain('label=jerusalem-canonical');
    expect(url).toContain('ss=Jerusalem');
  });

  it('gracefully degrades to public URL without aid', () => {
    vi.stubEnv('NEXT_PUBLIC_BOOKING_AID', '');
    const url = bookingLink({ destination: 'Jerusalem' });
    expect(url).not.toContain('aid=');
    expect(url).toContain('ss=Jerusalem');
    expect(url).toContain('booking.com');
  });

  it('URL-encodes destination with spaces (Tel Aviv)', () => {
    const url = bookingLink({ destination: 'Tel Aviv' });
    expect(url).toMatch(/ss=Tel(\+|%20)Aviv/);
  });

  it('rejects empty destination via Zod', () => {
    expect(() => bookingLink({ destination: '' } as never)).toThrow();
  });
});
