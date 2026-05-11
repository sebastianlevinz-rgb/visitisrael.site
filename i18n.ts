import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from './i18n-config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Next.js 15 / next-intl v3: `requestLocale` is async (see next-best-practices async-patterns).
  const requested = await requestLocale;
  const locale: Locale = (locales as readonly string[]).includes(
    requested ?? '',
  )
    ? (requested as Locale)
    : (() => {
        notFound();
      })() as never;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
