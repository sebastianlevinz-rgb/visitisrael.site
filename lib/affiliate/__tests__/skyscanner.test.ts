/**
 * skyscannerLink — 4-test contract (AUD-031: TLV destination).
 *
 * Note: Skyscanner partner program has a 5K visitors/mo gate; until the
 * AID arrives, helper returns public URL — Travelpayouts (AFF-08) is the
 * documented aggregator fallback.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { skyscannerLink } from '../skyscanner';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('skyscannerLink', () => {
  it('returns URL with associateid when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_SKYSCANNER_AID', 'SKY-IL-7');
    const url = skyscannerLink({ origin: 'JFK', destination: 'TLV' });
    expect(url).toContain('associateid=SKY-IL-7');
    expect(url).toContain('/transport/flights/jfk/tlv/');
  });

  it('gracefully degrades without associateid (Travelpayouts fallback)', () => {
    vi.stubEnv('NEXT_PUBLIC_SKYSCANNER_AID', '');
    const url = skyscannerLink({ origin: 'JFK', destination: 'TLV' });
    expect(url).not.toContain('associateid=');
    expect(url).toContain('skyscanner.com');
  });

  it('URL-encodes / lowercases origin + destination (Tel Aviv)', () => {
    const url = skyscannerLink({ origin: 'LHR', destination: 'Tel Aviv' });
    // destination is lowercased then encoded; space → %20 (or +)
    expect(url).toMatch(/tel(\+|%20)aviv/);
    expect(url).toContain('/lhr/');
  });

  it('rejects empty origin via Zod', () => {
    expect(() =>
      skyscannerLink({ origin: '', destination: 'TLV' } as never),
    ).toThrow();
  });
});
