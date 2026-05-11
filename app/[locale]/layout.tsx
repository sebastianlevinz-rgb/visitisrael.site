import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Heebo, Assistant, Frank_Ruhl_Libre } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import PlausibleProvider from 'next-plausible';
import { locales, localeDirection, type Locale } from '@/i18n-config';
import '../globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-heebo',
});
const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-assistant',
});
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-frank-ruhl',
});

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Visit Israel — placeholder',
  description:
    'Bilingual (EN+HE) tourism guide to Israel. Foundation scaffold — content populated in Phase 2.',
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const plausibleDomain = process.env['NEXT_PUBLIC_PLAUSIBLE_DOMAIN'];

  const body = (
    <body>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only"
          data-skip-link
        >
          {locale === 'he' ? 'דלג לתוכן הראשי' : 'Skip to main content'}
        </a>
        <div id="main-content">{children}</div>
      </NextIntlClientProvider>
    </body>
  );

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={`${heebo.variable} ${assistant.variable} ${frankRuhl.variable}`}
    >
      <head>
        {plausibleDomain ? (
          <PlausibleProvider
            domain={plausibleDomain}
            trackOutboundLinks
            taggedEvents
          />
        ) : null}
      </head>
      {body}
    </html>
  );
}
