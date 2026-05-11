import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n-config';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageBody />;
}

function HomePageBody() {
  const t = useTranslations('common');

  return (
    <main>
      <h1>{t('siteName')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
