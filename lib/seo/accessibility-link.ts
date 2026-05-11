/**
 * Locale-aware accessibility-statement link generator (A11Y-05 / A11Y-03).
 *
 * The accessibility statement is a legal artifact under Israeli IS 5568.
 * Every page MUST link to the locale-correct version from the footer (A11Y-05)
 * and the audit dashboard's AUD-028 rule (plan 10) consumes this generator
 * directly — single source of truth.
 *
 * Per A11Y-03 (Hebrew slug deferred to v2 — `/הצהרת-נגישות/` redirect map
 * lands when paid keyword data justifies it), HE and EN both use the
 * English slug `accessibility-statement` at launch. The href differs by
 * locale prefix only.
 *
 * Examples:
 *   accessibilityStatementHref('he') → '/accessibility-statement'
 *   accessibilityStatementHref('en') → '/en/accessibility-statement'
 */
import { defaultLocale, type Locale } from '../../i18n-config';

export const ACCESSIBILITY_SLUG = 'accessibility-statement' as const;

/**
 * Returns the bare slug (no leading slash, no locale prefix). Used by Velite
 * collections + the page-level route generators.
 */
export function accessibilityStatementSlug(_lang: Locale): string {
  return ACCESSIBILITY_SLUG;
}

/**
 * Returns the locale-aware href consumed by `<Footer>` + AUD-028 scanner.
 *
 * HE (default locale) → no prefix. EN → `/en/`. Pattern mirrors
 * `canonicalUrl` so both routing layers stay aligned.
 */
export function accessibilityStatementHref(lang: Locale): string {
  const slug = accessibilityStatementSlug(lang);
  return lang === defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
}
