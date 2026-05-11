/**
 * viatorLink — 4-test contract (AUD-031: Israel destination code d919).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { viatorLink } from '../viator';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('viatorLink', () => {
  it('returns URL with pid + mcid when env vars present', () => {
    vi.stubEnv('NEXT_PUBLIC_VIATOR_PID', 'P12345');
    vi.stubEnv('NEXT_PUBLIC_VIATOR_MCID', 'MC42');
    const url = viatorLink({ destinationCode: 'd919' });
    expect(url).toContain('pid=P12345');
    expect(url).toContain('mcid=MC42');
    expect(url).toContain('viator.com');
  });

  it('gracefully degrades without pid (Israel d919 still in path)', () => {
    vi.stubEnv('NEXT_PUBLIC_VIATOR_PID', '');
    const url = viatorLink({ destinationCode: 'd919' });
    expect(url).not.toContain('pid=');
    expect(url).toContain('d919-ttd');
  });

  it('URL-encodes destinationCode + productId (Jerusalem product path)', () => {
    const url = viatorLink({ destinationCode: 'd6053', productId: '12345P1' });
    expect(url).toContain('/d6053/');
    expect(url).toContain('12345P1');
  });

  it('rejects empty destinationCode via Zod', () => {
    expect(() => viatorLink({ destinationCode: '' } as never)).toThrow();
  });
});
