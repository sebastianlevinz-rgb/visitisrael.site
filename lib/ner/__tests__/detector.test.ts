/**
 * Plan 09 — Task 2: detectMentions behavioral tests (FND-07).
 *
 * Pins all 9 PLAN.md behaviors:
 *   1. Hotel hit (Abraham Hostel) returns correct entity/class/span
 *   2. Nearby <AffiliateCard partner=> → suggestedAction='no-action'
 *   3. No <AffiliateCard> nearby AND class hotel/tour/transport → 'add-affiliate'
 *   4. Nearby <Link href=> AND class museum/religious_site → 'no-action'
 *   5. No <Link> nearby AND class museum → 'add-internal-link'
 *   6. Hebrew text body runs without crashing (no Hebrew entities yet → no hits)
 *   7. Same entity mentioned twice → two distinct Mentions with different spans
 *   8. Empty body → []
 *   9. Body without any known entities → []
 *
 * Plus boundary regressions that are easy to silently break later:
 *   - Case insensitivity: 'abraham hostel' (lowercase) also hits
 *   - Word boundaries: 'Eggedmania' (substring of "Egged") does NOT hit
 *   - contextSample ±50 chars
 *   - Spans correctly index into the body
 */
import { describe, it, expect } from 'vitest';
import { detectMentions } from '../detector';
import type { Mention } from '../types';

describe('detectMentions — hotel/tour/transport (add-affiliate policy)', () => {
  it('finds "Abraham Hostel" in EN body and tags it as hotel', () => {
    const body = 'We stayed at Abraham Hostel for two nights.';
    const mentions = detectMentions(body, 'en');
    expect(mentions.length).toBeGreaterThanOrEqual(1);

    const hit = mentions.find((m) => m.entity === 'Abraham Hostel');
    expect(hit, 'expected an Abraham Hostel mention').toBeDefined();
    expect(hit!.class).toBe('hotel');

    // Span matches the substring in the source body
    const [start, end] = hit!.span;
    expect(body.slice(start, end)).toBe('Abraham Hostel');
  });

  it('suggestedAction = "add-affiliate" when no <AffiliateCard> nearby (hotel)', () => {
    const body = 'We stayed at Abraham Hostel for two nights.';
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Abraham Hostel',
    )!;
    expect(hit.suggestedAction).toBe('add-affiliate');
  });

  it('suggestedAction = "no-action" when <AffiliateCard partner=> within ±300 chars (hotel)', () => {
    const body = `We stayed at Abraham Hostel for two nights.

<AffiliateCard partner="hostelworld" sku="abraham-hostel-jlm" />`;
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Abraham Hostel',
    )!;
    expect(hit.suggestedAction).toBe('no-action');
  });

  it('suggestedAction = "add-affiliate" for tour class without AffiliateCard', () => {
    const body = 'The Abraham Tours guide met us at the gate of the Old City.';
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Abraham Tours',
    )!;
    expect(hit.class).toBe('tour');
    expect(hit.suggestedAction).toBe('add-affiliate');
  });

  it('suggestedAction = "add-affiliate" for transport class without AffiliateCard', () => {
    const body = 'Take Egged bus 405 from Tel Aviv to Jerusalem.';
    const hit = detectMentions(body, 'en').find((m) => m.entity === 'Egged')!;
    expect(hit.class).toBe('transport');
    expect(hit.suggestedAction).toBe('add-affiliate');
  });
});

describe('detectMentions — museum/religious_site/restaurant (add-internal-link policy)', () => {
  it('suggestedAction = "add-internal-link" for museum without <Link> nearby', () => {
    const body = 'We spent three hours at Yad Vashem the next morning.';
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Yad Vashem',
    )!;
    expect(hit.class).toBe('museum');
    expect(hit.suggestedAction).toBe('add-internal-link');
  });

  it('suggestedAction = "no-action" when <Link href=> within ±300 chars (museum)', () => {
    const body = `We spent three hours at Yad Vashem the next morning.

<Link href="/jerusalem/yad-vashem">Read our full Yad Vashem guide</Link>`;
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Yad Vashem',
    )!;
    expect(hit.suggestedAction).toBe('no-action');
  });

  it('suggestedAction = "add-internal-link" for religious_site without <Link>', () => {
    const body = 'The Western Wall is open 24 hours a day.';
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Western Wall',
    )!;
    expect(hit.class).toBe('religious_site');
    expect(hit.suggestedAction).toBe('add-internal-link');
  });

  it('suggestedAction = "no-action" for religious_site with nearby <Link>', () => {
    const body = `The Western Wall is open 24 hours a day.

<Link href="/jerusalem/western-wall">Visitor guide to the Western Wall</Link>`;
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Western Wall',
    )!;
    expect(hit.suggestedAction).toBe('no-action');
  });

  it('suggestedAction = "add-internal-link" for restaurant without <Link>', () => {
    const body = 'Dinner at Machneyuda was the highlight of the trip.';
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Machneyuda',
    )!;
    expect(hit.class).toBe('restaurant');
    expect(hit.suggestedAction).toBe('add-internal-link');
  });
});

describe('detectMentions — Hebrew handling', () => {
  it('Hebrew body runs without crashing (no Hebrew entities at seed time → no hits)', () => {
    // Sample HE text: "We stayed at the Abraham Hostel hostel"
    // Dictionary entries are English at Phase 1 seed; the detector must NOT
    // crash on Hebrew text and must return an array (empty or otherwise).
    const body = 'התאכסנו באכסניית אברהם הוסטל לשני לילות.';
    expect(() => detectMentions(body, 'he')).not.toThrow();
    const mentions = detectMentions(body, 'he');
    expect(Array.isArray(mentions)).toBe(true);
  });

  it('Hebrew body with an English brand name embedded still finds it', () => {
    // Real-world case: Hebrew copy that quotes the English brand name.
    const body = 'התאכסנו ב-Abraham Hostel לשני לילות.';
    const mentions = detectMentions(body, 'he');
    expect(mentions.some((m) => m.entity === 'Abraham Hostel')).toBe(true);
  });
});

describe('detectMentions — repeated entities + edge cases', () => {
  it('returns two Mentions with distinct spans when the same entity appears twice', () => {
    const body =
      'Abraham Hostel has two locations. The Jerusalem Abraham Hostel is on HaNeviim Street.';
    const hits = detectMentions(body, 'en').filter(
      (m) => m.entity === 'Abraham Hostel',
    );
    expect(hits.length).toBe(2);
    expect(hits[0]!.span[0]).not.toBe(hits[1]!.span[0]);
    // Both spans index back to the original substring
    for (const h of hits) {
      expect(body.slice(h.span[0], h.span[1])).toBe('Abraham Hostel');
    }
  });

  it('empty body returns []', () => {
    expect(detectMentions('', 'en')).toEqual([]);
    expect(detectMentions('', 'he')).toEqual([]);
  });

  it('body with no known entities returns []', () => {
    expect(
      detectMentions(
        'A generic paragraph about traveling somewhere with no named entities.',
        'en',
      ),
    ).toEqual([]);
  });

  it('case-insensitive matching: lowercase "abraham hostel" still hits', () => {
    const body = 'we stayed at abraham hostel for two nights.';
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Abraham Hostel',
    );
    expect(hit, 'lowercase mention should still hit').toBeDefined();
    expect(hit!.class).toBe('hotel');
  });

  it('word-boundary respected: "Eggedmania" does NOT match "Egged"', () => {
    const body = 'The fictional festival Eggedmania happens every March.';
    const hits = detectMentions(body, 'en').filter((m) => m.entity === 'Egged');
    expect(hits).toEqual([]);
  });

  it('contextSample is ±50 chars around the mention', () => {
    const body =
      'Some leading text before the mention here. Yad Vashem is open today and the visit was moving for everyone.';
    const hit = detectMentions(body, 'en').find(
      (m) => m.entity === 'Yad Vashem',
    )!;
    expect(hit.contextSample.length).toBeGreaterThan(0);
    expect(hit.contextSample).toContain('Yad Vashem');
    // Window is clamped to body bounds; should never exceed 50+entity+50 chars.
    expect(hit.contextSample.length).toBeLessThanOrEqual(
      50 + 'Yad Vashem'.length + 50,
    );
  });

  it('mentions are returned in source order (by start span ascending)', () => {
    const body =
      'First we hit Yad Vashem, then drove to Israel Museum, ending at Tower of David Museum.';
    const mentions: Mention[] = detectMentions(body, 'en');
    const spans = mentions.map((m) => m.span[0]);
    const sorted = [...spans].sort((a, b) => a - b);
    expect(spans).toEqual(sorted);
  });
});
