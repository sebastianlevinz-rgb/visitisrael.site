/**
 * civitatisLink — 4-test contract (AUD-031: Jerusalem / Tel Aviv fixtures).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { civitatisLink } from '../civitatis';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('civitatisLink', () => {
  it('returns URL with aid when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_CIVITATIS_AID', 'ABC123');
    const url = civitatisLink({ city: 'jerusalem' });
    expect(url).toContain('aid=ABC123');
    expect(url).toContain('/en/jerusalem/');
  });

  it('gracefully degrades to public URL without aid', () => {
    vi.stubEnv('NEXT_PUBLIC_CIVITATIS_AID', '');
    const url = civitatisLink({ city: 'jerusalem' });
    expect(url).not.toContain('aid=');
    expect(url).toContain('civitatis.com/en/jerusalem');
  });

  it('URL-encodes city with spaces (Tel Aviv)', () => {
    const url = civitatisLink({ city: 'Tel Aviv' });
    expect(url).toContain('/en/tel-aviv/');
  });

  it('rejects empty city via Zod', () => {
    expect(() => civitatisLink({ city: '' } as never)).toThrow();
  });
});
