/**
 * /admin/components/[component] — per-component drill-down.
 *
 * Static-generated for every component name. Renders a single primitive
 * or composite in isolation (default + variants if applicable + RTL pair).
 *
 * Phase 1 ships the contract; Phase 2 can attach prop-table docs.
 * `/admin/*` basic-auth lands in plan 10.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n-config';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';

import { ItineraryCard } from '@/components/travel/ItineraryCard';
import { ShabbatNotice } from '@/components/travel/ShabbatNotice';
import { Price } from '@/components/travel/Price';
import { WhereToStay } from '@/components/travel/WhereToStay';
import { TransportInfo } from '@/components/travel/TransportInfo';
import { BestTimeToVisit } from '@/components/travel/BestTimeToVisit';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { AffiliateCard } from '@/components/travel/AffiliateCard';
import { StickyCTA } from '@/components/travel/StickyCTA';
import { Icon } from '@/components/layout/Icon';
import { Ltr } from '@/components/layout/Ltr';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { SkipNav } from '@/components/layout/SkipNav';

const COMPONENTS = [
  'button',
  'card',
  'tag',
  'badge',
  'section',
  'container',
  'grid',
  'affiliate-disclosure',
  'affiliate-card',
  'itinerary-card',
  'where-to-stay',
  'transport-info',
  'best-time-to-visit',
  'shabbat-notice',
  'price',
  'sticky-cta',
  'icon',
  'ltr',
  'language-switcher',
  'skip-nav',
] as const;

type ComponentName = (typeof COMPONENTS)[number];

export function generateStaticParams(): Array<{ component: ComponentName }> {
  return COMPONENTS.map((c) => ({ component: c }));
}

interface PageProps {
  params: Promise<{ locale: Locale; component: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { component } = await params;
  return {
    title: `Component — ${component}`,
    robots: { index: false, follow: false },
  };
}

async function renderComponent(
  name: ComponentName,
): Promise<React.ReactElement | null> {
  switch (name) {
    case 'button':
      return (
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      );
    case 'card':
      return (
        <Card variant="elevated">Demo card content with elevated shadow.</Card>
      );
    case 'tag':
      return (
        <div className="flex gap-2">
          <Tag variant="neutral">Neutral</Tag>
          <Tag variant="success">Success</Tag>
        </div>
      );
    case 'badge':
      return (
        <div className="flex gap-2">
          <Badge variant="neutral">3</Badge>
          <Badge variant="danger">!</Badge>
        </div>
      );
    case 'section':
      return <Section padded={false}>Section element</Section>;
    case 'container':
      return (
        <Container size="md" className="bg-[var(--color-surface-elevated)] p-3">
          Container md
        </Container>
      );
    case 'grid':
      return (
        <Grid cols={3} gap="md">
          <Card>A</Card>
          <Card>B</Card>
          <Card>C</Card>
        </Grid>
      );
    case 'affiliate-disclosure':
      return await AffiliateDisclosure({});
    case 'affiliate-card':
      return await AffiliateCard({
        partner: 'booking',
        destination: 'Jerusalem',
      });
    case 'itinerary-card':
      return (
        <ItineraryCard
          title="Sample itinerary"
          days={[
            { day: 1, title: 'Arrival', summary: 'Land at TLV; check in.' },
            { day: 2, title: 'Old City', summary: 'Western Wall + quarters.' },
          ]}
        />
      );
    case 'where-to-stay':
      return (
        <WhereToStay
          priceRange="₪400-1200"
          neighborhoods={[{ name: 'Old City', blurb: 'Inside the walls.' }]}
        />
      );
    case 'transport-info':
      return (
        <TransportInfo
          airport={{ code: 'TLV', name: 'Ben Gurion' }}
          transportOptions={[
            { mode: 'Train', description: 'Direct rail.', durationMinutes: 30 },
          ]}
        />
      );
    case 'best-time-to-visit':
      return (
        <BestTimeToVisit
          months={[2, 3, 4]}
          seasonHighlights={[
            {
              season: 'Spring',
              monthsIndex: [2, 3, 4],
              highlights: 'Mild + green.',
            },
          ]}
        />
      );
    case 'shabbat-notice':
      return <ShabbatNotice closesAt="Fri 18:00" reopensAt="Sat 19:30" />;
    case 'price':
      return <Price ils={250} usd={70} eur={65} />;
    case 'sticky-cta':
      return <StickyCTA href="#top">Demo CTA</StickyCTA>;
    case 'icon':
      return (
        <Icon directional label="next">
          <polyline points="9 18 15 12 9 6" />
        </Icon>
      );
    case 'ltr':
      return <Ltr>+972-2-555-0123</Ltr>;
    case 'language-switcher':
      return await LanguageSwitcher();
    case 'skip-nav':
      return await SkipNav();
    default: {
      // Exhaustiveness check.
      const _exhaustive: never = name;
      void _exhaustive;
      throw new Error(`Unhandled component: ${String(name)}`);
    }
  }
}

export default async function ComponentDrillDown({ params }: PageProps) {
  const { component } = await params;
  if (!(COMPONENTS as readonly string[]).includes(component)) {
    notFound();
  }
  const name = component as ComponentName;
  const rendered = await renderComponent(name);

  return (
    <main>
      <Container size="xl" className="py-8">
        <a
          href="../components"
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          ← All components
        </a>
        <h1 className="mt-2 text-3xl font-bold text-[var(--color-ink)]">
          {name}
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div
            dir="ltr"
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <p className="mb-2 text-xs tracking-wide text-[var(--color-ink-muted)] uppercase">
              LTR
            </p>
            {rendered}
          </div>
          <div
            dir="rtl"
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <p className="mb-2 text-xs tracking-wide text-[var(--color-ink-muted)] uppercase">
              RTL
            </p>
            {rendered}
          </div>
        </div>
      </Container>
    </main>
  );
}
