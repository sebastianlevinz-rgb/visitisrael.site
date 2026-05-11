/**
 * <SkipNav> — first focusable element on every page (A11Y-02 / WCAG 2.4.1).
 *
 * - Hebrew text on HE locale: "דלג לתוכן הראשי"
 * - English text on EN locale: "Skip to main content"
 * - Visually hidden until focused (`sr-only focus:not-sr-only`)
 * - Targets `#main-content` — must exist in the locale layout
 *
 * Per israeli-accessibility-compliance/SKILL.md §3 and the locked decision
 * in CONTEXT.md (A11Y-02). RSC — `useLocale()` is server-safe in next-intl.
 *
 * Note on positioning: the focused state uses `start-2 top-2` (logical
 * `inset-inline-start`) so the link appears in the document-flow corner
 * regardless of HE/EN direction.
 */
import { getLocale } from 'next-intl/server';

const SKIP_LABEL: Record<'he' | 'en', string> = {
  he: 'דלג לתוכן הראשי',
  en: 'Skip to main content',
};

export async function SkipNav() {
  const locale = (await getLocale()) as 'he' | 'en';
  const label = SKIP_LABEL[locale] ?? SKIP_LABEL.en;

  return (
    <a
      href="#main-content"
      data-skip-link
      className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-[var(--button-bg-primary)] focus:px-4 focus:py-2 focus:text-[var(--button-text-primary)] focus:shadow-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:outline-none"
    >
      {label}
    </a>
  );
}
