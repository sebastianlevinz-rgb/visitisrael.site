/**
 * discoverCarsLink — 4-test contract (AUD-031: Israel rental).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { discoverCarsLink } from '../discoverCars';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('discoverCarsLink', () => {
  it('returns URL with a_aid when env var present (365-day cookie)', () => {
    vi.stubEnv('NEXT_PUBLIC_DISCOVERCARS_AID', 'DC-12345');
    const url = discoverCarsLink({ city: 'israel' });
    expect(url).toContain('a_aid=DC-12345');
    expect(url).toContain('discovercars.com/israel');
  });

  it('gracefully degrades without a_aid', () => {
    vi.stubEnv('NEXT_PUBLIC_DISCOVERCARS_AID', '');
    const url = discoverCarsLink({ city: 'israel' });
    expect(url).not.toContain('a_aid=');
    expect(url).toContain('discovercars.com/israel');
  });

  it('URL-encodes city with spaces (Tel Aviv → tel-aviv)', () => {
    const url = discoverCarsLink({ city: 'Tel Aviv' });
    expect(url).toContain('/tel-aviv');
  });

  it('rejects empty city via Zod', () => {
    expect(() => discoverCarsLink({ city: '' } as never)).toThrow();
  });
});
