/**
 * <Footer> — site footer with legal-page links.
 *
 * Phase 1 baseline: link generator for Privacy, About, Contact, Affiliate
 * Disclosure, and Accessibility Statement. The accessibility-statement
 * link MUST be locale-aware (A11Y-05) — HE pages link to /accessibility,
 * EN pages link to /en/accessibility. Actual pages land in Phase 2.5;
 * Phase 1 ships the generator + footer surface.
 */
import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n-config';
import { Container } from '@/components/ui/Container';
import {
  ACCESSIBILITY_SLUG,
  accessibilityStatementHref,
} from '@/lib/seo/accessibility-link';

type FooterLink = {
  /** Path WITHOUT locale prefix (e.g. 'privacy'). */
  slug: string;
  /** Key into translation namespace `footer` (e.g. 'privacy'). */
  i18nKey: 'privacy' | 'about' | 'contact' | 'affiliate' | 'accessibility';
};

const FOOTER_LINKS: ReadonlyArray<FooterLink> = [
  { slug: 'privacy', i18nKey: 'privacy' },
  { slug: 'about', i18nKey: 'about' },
  { slug: 'contact', i18nKey: 'contact' },
  { slug: 'affiliate-disclosure', i18nKey: 'affiliate' },
  { slug: ACCESSIBILITY_SLUG, i18nKey: 'accessibility' },
];

/**
 * Build a locale-aware URL.
 * HE (default) has no prefix; EN lives at /en/.
 * Exported so plan-10 audit dashboard can validate the rule (AUD-028).
 *
 * For the accessibility-statement specifically, callers should prefer
 * `accessibilityStatementHref` from `lib/seo/accessibility-link.ts` — it's
 * the single source of truth that the AUD-028 scanner consumes directly.
 */
export function footerLinkHref(slug: string, locale: Locale): string {
  if (slug === ACCESSIBILITY_SLUG) {
    return accessibilityStatementHref(locale);
  }
  if (locale === 'he') return `/${slug}`;
  return `/${locale}/${slug}`;
}

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('footer');

  return (
    <footer
      className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] py-8"
      role="contentinfo"
    >
      <Container size="xl">
        <nav
          aria-label={t('navLabel')}
          className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--color-ink-muted)]"
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.slug}
              href={footerLinkHref(link.slug, locale)}
              className="hover:text-[var(--color-primary)] hover:underline"
            >
              {t(link.i18nKey)}
            </a>
          ))}
        </nav>
        <p className="mt-4 text-center text-xs text-[var(--color-ink-muted)]">
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
      </Container>
    </footer>
  );
}
