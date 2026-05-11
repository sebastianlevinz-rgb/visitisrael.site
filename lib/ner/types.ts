/**
 * lib/ner/types.ts — Plan 09 (FND-07).
 *
 * Type contract published to:
 *   - lib/ner/detector.ts          (producer)
 *   - scripts/audit/scan-ner.ts    (integration script, plan 09 Task 3)
 *   - scripts/audit/run.mjs        (consumer, plan 10 audit dashboard)
 *
 * Argentina lesson #6 fix: every mention of a known entity in published MDX
 * gets a structured Mention record; if it isn't covered by an <AffiliateCard>
 * or an <Link> in the ±300 char window around it, the suggestedAction flags
 * the monetization gap for the audit dashboard.
 *
 * Suggestion policy (see detector.ts for the implementation):
 *   - hotel | tour | transport      → no <AffiliateCard partner=> nearby ⇒ 'add-affiliate'
 *   - museum | religious_site |
 *     restaurant                    → no <Link href=> nearby ⇒ 'add-internal-link'
 *   - otherwise                     → 'no-action'
 *
 * The window is ±300 chars (RESEARCH §1.11 outline). Tighten/loosen as Phase 2
 * MDX reveals real cases.
 */
export type EntityClass =
  | 'tour'
  | 'hotel'
  | 'restaurant'
  | 'museum'
  | 'transport'
  | 'religious_site';

export type SuggestedAction =
  | 'add-affiliate'
  | 'add-internal-link'
  | 'no-action';

export interface Mention {
  /** Canonical entity name as it appears in data/entity-dict.json. */
  entity: string;
  /** Class bucket — drives the suggestedAction policy. */
  class: EntityClass;
  /** [start, end) UTF-16 code-unit offsets into the body. */
  span: [number, number];
  /** Audit dashboard hint. */
  suggestedAction: SuggestedAction;
  /** ±50 char window around the mention, for audit-dashboard context surfacing. */
  contextSample: string;
}

/**
 * Output entry written by scripts/audit/scan-ner.ts to data/ner-results.json.
 * Plan 10 audit dashboard reads this file shape.
 */
export interface NerResultEntry {
  slug: string;
  lang: 'he' | 'en';
  mentions: Mention[];
}
