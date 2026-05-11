/**
 * <Header> — top navigation bar.
 *
 * Phase 1 baseline: site name + LanguageSwitcher. Phase 2 fills in the
 * primary menu (regions / about / contact). RTL-safe — uses flexbox +
 * `justify-between`, which respects writing direction.
 */
import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n-config';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export async function Header() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('common');

  return (
    <header
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
      role="banner"
    >
      <Container size="xl">
        <div className="flex items-center justify-between py-4">
          <a
            href={locale === 'he' ? '/' : '/en'}
            className="text-lg font-semibold text-[var(--color-ink)]"
          >
            {t('siteName')}
          </a>
          {await LanguageSwitcher()}
        </div>
      </Container>
    </header>
  );
}
