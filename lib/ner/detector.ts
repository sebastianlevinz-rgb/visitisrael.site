/**
 * lib/ner/detector.ts — Plan 09 Task 2 (FND-07).
 *
 * Dictionary-backed regex mention detector. Reads data/entity-dict.json,
 * walks every (class, entity) pair against the MDX body, and tags each match
 * with a suggestedAction the audit dashboard (plan 10) uses to surface
 * monetization gaps.
 *
 * Argentina lesson #6: pages mentioned partners by name (e.g., "Hostelworld"
 * three times) but never linked. detectMentions makes those mentions visible
 * in the audit JSON so the writer fixes them before publish.
 *
 * Suggestion policy:
 *   class ∈ { hotel, tour, transport }       → no <AffiliateCard partner=> nearby ⇒ 'add-affiliate'
 *   class ∈ { museum, religious_site,
 *             restaurant }                   → no <Link href=> nearby ⇒ 'add-internal-link'
 *   otherwise (or coverage present)          → 'no-action'
 *
 * Nearby = ±300 char window around the mention (RESEARCH §1.11 outline).
 * Phase 2 MDX content will tell us if 300 is right — adjust then.
 *
 * Hebrew: the seed dict is English at Phase 1, so an HE-only body yields zero
 * hits, but the detector must not crash. The `lang` parameter is reserved for
 * Phase 2 expansion (Hebrew transliterations, RTL-aware boundary tweaks);
 * Phase 1 logic is the same for both languages.
 *
 * Consumers:
 *   - lib/ner/__tests__/detector.test.ts (this plan)
 *   - scripts/audit/scan-ner.ts          (plan 09 Task 3 — integration script)
 *   - scripts/audit/run.mjs              (plan 10 — audit dashboard scorer)
 */
import dict from '../../data/entity-dict.json';
import type { EntityClass, Mention, SuggestedAction } from './types';

/** Regex-safe escape for entity names with special characters. */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Window around a span used for the AffiliateCard/Link nearby heuristic. */
const COVERAGE_WINDOW_CHARS = 300;
/** Window around a span exposed to the audit dashboard for context. */
const CONTEXT_SAMPLE_WINDOW_CHARS = 50;

/** Classes whose mentions should be backed by an <AffiliateCard partner=>. */
const AFFILIATE_CLASSES: ReadonlySet<EntityClass> = new Set([
  'hotel',
  'tour',
  'transport',
]);
/** Classes whose mentions should be backed by an internal <Link href=>. */
const INTERNAL_LINK_CLASSES: ReadonlySet<EntityClass> = new Set([
  'museum',
  'religious_site',
  'restaurant',
]);

/** Affiliate card pattern: <AffiliateCard partner="..."> (any whitespace). */
const AFFILIATE_CARD_RE = /<AffiliateCard\s+[^>]*partner\s*=/i;
/** Internal link pattern: <Link href="..."> (any whitespace). */
const INTERNAL_LINK_RE = /<Link\s+[^>]*href\s*=/i;

/**
 * Type-narrowed dict entries. The `_meta` key in entity-dict.json is
 * documentation; everything else is a {EntityClass: string[]} pair.
 */
function dictEntries(): Array<[EntityClass, string[]]> {
  const out: Array<[EntityClass, string[]]> = [];
  for (const [key, value] of Object.entries(dict)) {
    if (key === '_meta') continue;
    if (!Array.isArray(value)) continue;
    // Trust the entity-dict.test.ts structural pin: every non-_meta key is
    // one of the 6 EntityClass values.
    out.push([key as EntityClass, value as string[]]);
  }
  return out;
}

function suggestActionFor(klass: EntityClass, ctx: string): SuggestedAction {
  if (AFFILIATE_CLASSES.has(klass)) {
    return AFFILIATE_CARD_RE.test(ctx) ? 'no-action' : 'add-affiliate';
  }
  if (INTERNAL_LINK_CLASSES.has(klass)) {
    return INTERNAL_LINK_RE.test(ctx) ? 'no-action' : 'add-internal-link';
  }
  return 'no-action';
}

/**
 * Scan an MDX body for known entity mentions.
 *
 * @param body  Raw MDX content (after frontmatter is stripped — Velite's
 *              `body` field, or any string).
 * @param _lang Reserved for Phase 2 expansion (RTL-aware boundary tweaks,
 *              Hebrew dictionary lookup). Currently unused — same logic for
 *              both 'he' and 'en'; included in the signature so callers don't
 *              have to be updated when Phase 2 adds it.
 * @returns     Mentions in source order (ascending start span).
 */
export function detectMentions(body: string, _lang: 'he' | 'en'): Mention[] {
  if (body.length === 0) return [];

  const found: Mention[] = [];
  for (const [klass, entities] of dictEntries()) {
    for (const ent of entities) {
      const re = new RegExp(`\\b${escapeRegex(ent)}\\b`, 'gi');
      for (const m of body.matchAll(re)) {
        if (m.index === undefined) continue;
        const start = m.index;
        // m[0] preserves the actual matched length (entity may contain
        // multi-byte chars that diverge from `ent.length` in code points;
        // UTF-16 code units are what matchAll reports, so this is safe).
        const end = start + m[0].length;
        const span: [number, number] = [start, end];

        const ctxStart = Math.max(0, start - COVERAGE_WINDOW_CHARS);
        const ctxEnd = Math.min(body.length, end + COVERAGE_WINDOW_CHARS);
        const coverageCtx = body.slice(ctxStart, ctxEnd);

        const suggestedAction = suggestActionFor(klass, coverageCtx);

        const sampleStart = Math.max(0, start - CONTEXT_SAMPLE_WINDOW_CHARS);
        const sampleEnd = Math.min(
          body.length,
          end + CONTEXT_SAMPLE_WINDOW_CHARS,
        );
        const contextSample = body.slice(sampleStart, sampleEnd);

        found.push({
          entity: ent,
          class: klass,
          span,
          suggestedAction,
          contextSample,
        });
      }
    }
  }

  // Sort by start span ascending. We walked the dict in class-iteration
  // order, which is NOT source order — consumers (especially plan 10's
  // dashboard rendering) expect source-ordered mentions for readability.
  found.sort((a, b) => a.span[0] - b.span[0]);
  return found;
}
