/**
 * <AffiliateDisclosure> — FTC-compliant inline disclosure.
 *
 * Per AFF-06 (PITFALLS §1.4): must appear within 1 viewport-height of the
 * FIRST affiliate link on every monetized page. NOT footer-only.
 *
 * Plan 06 (affiliate helpers) renders this component DOM-preceding every
 * <AffiliateCard>. Plan 10 (audit dashboard) detects this component via
 * the `data-component="affiliate-disclosure"` attribute as part of AUD-009
 * enforcement.
 *
 * Hebrew: "גילוי נאות: הקישורים שלהלן הם קישורי שותפים..."
 * English: "Disclosure: The links below are affiliate links..."
 */
import { getLocale } from 'next-intl/server';
import type { Locale } from '@/i18n-config';
import { cn } from '@/lib/cn';

const DISCLOSURE_TEXT: Record<Locale, string> = {
  he: 'גילוי נאות: הקישורים שלהלן הם קישורי שותפים. אנו עשויים לקבל עמלה אם תזמינו דרכם, ללא עלות נוספת לכם.',
  en: 'Disclosure: The links below are affiliate links. We may earn a commission if you book through them, at no extra cost to you.',
};

export interface AffiliateDisclosureProps {
  className?: string;
}

export async function AffiliateDisclosure({
  className,
}: AffiliateDisclosureProps) {
  const locale = (await getLocale()) as Locale;
  const text = DISCLOSURE_TEXT[locale] ?? DISCLOSURE_TEXT.en;

  return (
    <p
      role="note"
      data-component="affiliate-disclosure"
      className={cn(
        'rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-ink-muted)] italic',
        className,
      )}
    >
      {text}
    </p>
  );
}
