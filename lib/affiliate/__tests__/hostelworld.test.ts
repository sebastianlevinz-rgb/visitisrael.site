/**
 * hostelworldLink — 4-test contract (AUD-031: Tel Aviv / Jerusalem hostels).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hostelworldLink } from '../hostelworld';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('hostelworldLink', () => {
  it('returns URL with affiliateID when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_HOSTELWORLD_AID', 'HW-IL-42');
    const url = hostelworldLink({ city: 'tel-aviv' });
    expect(url).toContain('affiliateID=HW-IL-42');
    expect(url).toContain('hostelworld.com/hostels/tel-aviv');
  });

  it('gracefully degrades without affiliateID', () => {
    vi.stubEnv('NEXT_PUBLIC_HOSTELWORLD_AID', '');
    const url = hostelworldLink({ city: 'jerusalem' });
    expect(url).not.toContain('affiliateID=');
    expect(url).toContain('hostels/jerusalem');
  });

  it('URL-encodes city with spaces (Tel Aviv → tel-aviv)', () => {
    const url = hostelworldLink({ city: 'Tel Aviv' });
    expect(url).toContain('/hostels/tel-aviv');
  });

  it('rejects empty city via Zod', () => {
    expect(() => hostelworldLink({ city: '' } as never)).toThrow();
  });
});
