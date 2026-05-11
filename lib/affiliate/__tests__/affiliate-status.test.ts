/**
 * affiliate-status + affiliate-availability — 4-test data contract.
 *
 * AFF-07 contract:
 *   - 12 entries (9 real + 2 stubs + travelpayouts) in BOTH JSON files
 *   - status entries have {aidEnvVar, aidReceivedAt, appliedAt, lastReviewedAt}
 *   - availability entries have {state, regions, notes}
 *   - klook + goCity state === 'absent' (Conflict D)
 *   - barrel re-exports affiliateAvailability + allPartners + State
 */
import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import availability from '../../../data/affiliate-availability.json';
import status from '../../../data/affiliate-status.json';
import {
  affiliateAvailability,
  allPartners,
  type State,
} from '../availability';

const EXPECTED_PARTNERS = [
  'booking',
  'civitatis',
  'viator',
  'getYourGuide',
  'rentalcars',
  'safetyWing',
  'skyscanner',
  'hostelworld',
  'discoverCars',
  'klook',
  'goCity',
  'travelpayouts',
] as const;

describe('affiliate-availability.json + affiliate-status.json', () => {
  it('availability JSON enumerates 12 partners (9 real + 2 stubs + travelpayouts) and validates against Zod', () => {
    const StateZ = z.enum(['pending', 'applied', 'active', 'sparse', 'absent']);
    const Entry = z.object({
      state: StateZ,
      regions: z.array(z.string()),
      notes: z.string(),
    });
    const Availability = z.record(z.string(), Entry);

    const parsed = Availability.parse(availability);
    const keys = Object.keys(parsed).sort();
    expect(keys).toEqual([...EXPECTED_PARTNERS].sort());
  });

  it('status JSON enumerates 12 partners with {aidEnvVar, aidReceivedAt, appliedAt, lastReviewedAt}', () => {
    const Entry = z.object({
      aidEnvVar: z.string(),
      aidReceivedAt: z.string().nullable(),
      appliedAt: z.string().nullable(),
      lastReviewedAt: z.string(),
    });
    const Status = z.record(z.string(), Entry);

    const parsed = Status.parse(status);
    const keys = Object.keys(parsed).sort();
    expect(keys).toEqual([...EXPECTED_PARTNERS].sort());
    // AUD-031 — every partner has a tracked AID env var name (codemod can read it)
    for (const partner of EXPECTED_PARTNERS) {
      expect(parsed[partner]?.aidEnvVar).toMatch(/^NEXT_PUBLIC_/);
    }
  });

  it('klook + goCity = "absent" (Conflict D); travelpayouts = "pending" (AFF-08)', () => {
    expect(affiliateAvailability('klook')).toBe('absent');
    expect(affiliateAvailability('goCity')).toBe('absent');
    expect(affiliateAvailability('travelpayouts')).toBe('pending');
    // Type-check: State union is exposed.
    const s: State = affiliateAvailability('booking');
    expect(['pending', 'applied', 'active', 'sparse', 'absent']).toContain(s);
  });

  it('allPartners() returns the 12-entry list (per-partner state transitions readable)', () => {
    const partners = allPartners();
    expect(partners.length).toBe(12);
    expect([...partners].sort()).toEqual([...EXPECTED_PARTNERS].sort());
    // Unknown partner falls through to 'absent' (defensive fallback).
    expect(affiliateAvailability('unknown-partner')).toBe('absent');
  });
});
