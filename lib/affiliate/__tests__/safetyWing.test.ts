/**
 * safetyWingLink — 4-test contract (AUD-031: Israel travel insurance).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { safetyWingLink } from '../safetyWing';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('safetyWingLink', () => {
  it('returns URL with referenceID + utm_campaign when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_SAFETYWING_REF', 'SW-12345');
    const url = safetyWingLink({
      destination: 'Israel',
      label: 'jerusalem-canonical',
    });
    expect(url).toContain('referenceID=SW-12345');
    expect(url).toContain('utm_campaign=jerusalem-canonical');
  });

  it('gracefully degrades without referenceID', () => {
    vi.stubEnv('NEXT_PUBLIC_SAFETYWING_REF', '');
    const url = safetyWingLink({ destination: 'Israel' });
    expect(url).not.toContain('referenceID=');
    expect(url).toContain('safetywing.com/nomad-insurance');
  });

  it('URL-encodes destination (Tel Aviv)', () => {
    vi.stubEnv('NEXT_PUBLIC_SAFETYWING_REF', 'SW-X');
    const url = safetyWingLink({ destination: 'Tel Aviv' });
    expect(url).toMatch(/destination=Tel(\+|%20)Aviv/);
  });

  it('accepts empty opts (default = global insurance landing)', () => {
    // SafetyWing helper is the only one where opts are fully optional
    // (insurance is destination-agnostic). Validates Zod doesn't require
    // a destination; remains a 4th distinct test.
    const url = safetyWingLink({});
    expect(url).toContain('safetywing.com');
  });
});
