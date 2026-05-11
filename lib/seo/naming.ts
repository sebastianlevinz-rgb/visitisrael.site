/**
 * Religious-site naming detectors (AUD-017..AUD-020 data layer).
 *
 * This module ships the regex helpers + heuristics that plan 10's audit
 * dashboard consumes when scanning built HTML. Keeping the rules data-side
 * (here) keeps a single source of truth — the audit-dashboard scanner just
 * walks DOM and applies these detectors.
 *
 * Audit rules (from PITFALLS §6):
 *
 *   - AUD-017: "Wailing Wall" is banned. Use "Western Wall" (or Hebrew
 *              "Kotel" / "הכותל המערבי") on every reference.
 *   - AUD-018: "Judea and Samaria" and "occupied territories" are biased
 *              framings — use neutral "West Bank" instead.
 *   - AUD-019: "Temple Mount" must be paired with "Haram al-Sharif" on
 *              first reference; subsequent references may use either name
 *              alone. We approximate with a 300-character pairing window.
 *   - AUD-020: Sites in administered/disputed territory (Bethlehem, Hebron,
 *              Jericho) must carry `administrativeStatus` frontmatter so
 *              the page can render the editorial context strip.
 *
 * Per CONTEXT.md §SEO + RESEARCH §1.8 + SEO-04 + Argentina lessons #6 + #9.
 */

/** AUD-017: "Wailing Wall" must never appear — case-insensitive ban. */
export const WAILING_WALL_REGEX = /\bwailing\s+wall\b/i;

/**
 * AUD-018: biased framing — "Judea and Samaria" OR "occupied territories".
 * Case-insensitive so headers/uppercase don't slip through.
 */
export const BIASED_FRAMING_REGEX =
  /\b(judea\s+and\s+samaria|occupied\s+territories)\b/i;

/** Pairing window for AUD-019 first-reference dual-naming check. */
const TEMPLE_MOUNT_PAIRING_WINDOW = 300;

const TEMPLE_MOUNT_REGEX = /\bTemple\s+Mount\b/i;
const HARAM_AL_SHARIF_REGEX = /\bHaram\s+al-?Sharif\b/i;

/**
 * AUD-019 heuristic.
 *
 * Returns `true` if either (a) "Temple Mount" never appears, or (b) it
 * appears AND "Haram al-Sharif" appears within {@link TEMPLE_MOUNT_PAIRING_WINDOW}
 * characters after the first "Temple Mount" hit.
 *
 * The exact PITFALLS §3.1 contract is "first reference" pairing; the 300-char
 * heuristic is a deliberate approximation — generous enough to allow a
 * full bilingual lead paragraph but tight enough to catch unpaired
 * subsequent paragraphs.
 */
export function detectTempleMountPaired(text: string): boolean {
  const match = TEMPLE_MOUNT_REGEX.exec(text);
  if (match === null) return true; // not mentioned → vacuously paired
  const startIdx = match.index;
  const windowText = text.slice(
    startIdx,
    startIdx + TEMPLE_MOUNT_PAIRING_WINDOW,
  );
  return HARAM_AL_SHARIF_REGEX.test(windowText);
}

/**
 * AUD-020: sites that REQUIRE `administrativeStatus` frontmatter (e.g.
 * `administrativeStatus: 'west-bank-paa'`). The audit dashboard reads this
 * set and fails AUD-020 if a page about one of these sites omits the field.
 */
export const ADMIN_STATUS_REQUIRED_SITES: ReadonlySet<string> = new Set([
  'bethlehem',
  'hebron',
  'jericho',
]);

/** Case-insensitive convenience wrapper for the slug lookup. */
export function requiresAdministrativeStatus(slug: string): boolean {
  return ADMIN_STATUS_REQUIRED_SITES.has(slug.toLowerCase());
}

/** A single AUD-017..AUD-020 violation surfaced by the aggregated detector. */
export interface ReligiousNamingViolation {
  rule: 'AUD-017' | 'AUD-018' | 'AUD-019';
  message: string;
  /** Matched substring (for spot-fixing). May be empty for heuristic rules. */
  match: string;
}

/**
 * Aggregated detector — runs all banned-phrase + pairing checks against a
 * single text block and returns every violation it finds.
 *
 * Plan 10's audit dashboard calls this once per scanned HTML block.
 */
export function detectUnpairedReligiousNaming(
  text: string,
): ReligiousNamingViolation[] {
  const violations: ReligiousNamingViolation[] = [];

  const wailing = WAILING_WALL_REGEX.exec(text);
  if (wailing !== null) {
    violations.push({
      rule: 'AUD-017',
      message:
        'Use "Western Wall" (or paired with "Kotel") — never "Wailing Wall".',
      match: wailing[0],
    });
  }

  const biased = BIASED_FRAMING_REGEX.exec(text);
  if (biased !== null) {
    violations.push({
      rule: 'AUD-018',
      message:
        'Use neutral "West Bank" — avoid "Judea and Samaria" or "occupied territories".',
      match: biased[0],
    });
  }

  if (!detectTempleMountPaired(text)) {
    violations.push({
      rule: 'AUD-019',
      message:
        '"Temple Mount" must be paired with "Haram al-Sharif" on first reference.',
      match: 'Temple Mount',
    });
  }

  return violations;
}
