/**
 * <LanguageSwitcher> — HE↔EN toggle.
 *
 * Server Component. Reads current locale via next-intl. Renders two
 * `<a>` tags pointing at the locale-prefixed counterpart of the current
 * pathname. In Phase 2 this becomes a `next/link`-based client component
 * that preserves query strings; the Phase 1 baseline is fine because we
 * have no dynamic route segments yet.
 *
 * Phase 1 contract: the component MUST exist and render both labels
 * (FND-03 ships it as a primitive; FND-06 wires the real toggle).
 */
import { getLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n-config';

const LABELS: Record<Locale, string> = {
  he: 'עברית',
  en: 'English',
};

function altHref(current: Locale, target: Locale): string {
  // Default locale (he) has no prefix; en lives at /en/.
  // This Phase 1 stub returns the root for each locale (no path preservation).
  // Phase 2 swaps this for a `next/link` client component using `usePathname`.
  if (target === 'he') return '/';
  return `/${target}`;
}

export async function LanguageSwitcher() {
  const current = (await getLocale()) as Locale;

  return (
    <nav
      aria-label={current === 'he' ? 'בחר שפה' : 'Select language'}
      className="flex items-center gap-2 text-sm"
    >
      {locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <a
            key={locale}
            href={altHref(current, locale)}
            hrefLang={locale}
            aria-current={isCurrent ? 'true' : undefined}
            className={
              isCurrent
                ? 'font-semibold text-[var(--color-primary)] underline'
                : 'text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]'
            }
          >
            {LABELS[locale]}
          </a>
        );
      })}
    </nav>
  );
}
