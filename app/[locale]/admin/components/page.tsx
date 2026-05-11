/**
 * /admin/components — design-system playground.
 *
 * Renders every primitive + composite + layout component twice: once in
 * default direction (locale-determined) and once in the OPPOSITE
 * direction wrapped in <div dir="…">. Designers / QA / Phase 2 authors
 * can scroll the page in one shot to verify every component.
 *
 * FND-04: this is the noindex playground; production users never see it.
 * `/admin/*` basic-auth middleware lands in plan 10.
 *
 * Per RESEARCH §1.3:
 *   - tabbed/sectioned page (here: sectioned, anchor-linkable)
 *   - default + each variant of each variant-having primitive
 *   - edge cases: long text, RTL mode
 *   - composites: realistic sample props
 */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { Locale } from '@/i18n-config';

// UI primitives
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';

// Travel composites
import { AffiliateCard } from '@/components/travel/AffiliateCard';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { ItineraryCard } from '@/components/travel/ItineraryCard';
import { WhereToStay } from '@/components/travel/WhereToStay';
import { TransportInfo } from '@/components/travel/TransportInfo';
import { BestTimeToVisit } from '@/components/travel/BestTimeToVisit';
import { ShabbatNotice } from '@/components/travel/ShabbatNotice';
import { Price } from '@/components/travel/Price';
import { StickyCTA } from '@/components/travel/StickyCTA';

// Layout
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { SkipNav } from '@/components/layout/SkipNav';
import { Icon } from '@/components/layout/Icon';
import { Ltr } from '@/components/layout/Ltr';

export const metadata: Metadata = {
  title: 'Component Playground — Internal',
  description:
    'Visual review surface for every primitive + composite + layout component. Each rendered in both LTR and RTL.',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Section wrapper — renders a heading anchor + the slot in two directions.
 * Renders LTR + RTL side-by-side so a designer can scan for mirror bugs.
 */
function ComponentSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Section
      as="section"
      padded={false}
      className="border-t border-[var(--color-border)] py-6"
    >
      <Container size="xl">
        <h2 id={id} className="mb-4 text-2xl font-bold text-[var(--color-ink)]">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div
            dir="ltr"
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <p className="mb-2 text-xs tracking-wide text-[var(--color-ink-muted)] uppercase">
              LTR
            </p>
            {children}
          </div>
          <div
            dir="rtl"
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <p className="mb-2 text-xs tracking-wide text-[var(--color-ink-muted)] uppercase">
              RTL
            </p>
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default async function ComponentsPlayground({ params }: PageProps) {
  await params;

  // Resolve async components once each so JSX trees stay flat.
  const affiliateCardBooking = await AffiliateCard({
    partner: 'booking',
    destination: 'Jerusalem',
    label: 'Find a hotel in Jerusalem',
  });
  const affiliateCardCivitatis = await AffiliateCard({
    partner: 'civitatis',
    destination: 'Tel Aviv',
    label: 'Book a Tel Aviv day tour',
  });
  const disclosure = await AffiliateDisclosure({});
  const languageSwitcher = await LanguageSwitcher();
  const skipNav = await SkipNav();

  return (
    <main className="pb-16">
      <Container size="xl" className="py-8">
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">
          Component Playground
        </h1>
        <p className="mt-2 text-[var(--color-ink-muted)]">
          Every primitive + composite + layout component, rendered in both LTR
          and RTL.
        </p>
        <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
          Noindex / nofollow. Basic-auth gate ships in plan 10 (audit
          dashboard).
        </p>
      </Container>

      {/* === PRIMITIVES === */}
      <ComponentSection id="button" title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">
            Primary sm
          </Button>
          <Button variant="primary" size="md">
            Primary md
          </Button>
          <Button variant="primary" size="lg">
            Primary lg
          </Button>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </ComponentSection>

      <ComponentSection id="card" title="Card">
        <div className="flex flex-col gap-3">
          <Card>Default card — surface elevated, soft border.</Card>
          <Card variant="elevated">Elevated card — shadow-md.</Card>
          <Card variant="interactive">
            Interactive card — hover for shadow shift.
          </Card>
        </div>
      </ComponentSection>

      <ComponentSection id="tag" title="Tag">
        <div className="flex flex-wrap gap-2">
          <Tag variant="neutral">Neutral</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="danger">Danger</Tag>
        </div>
      </ComponentSection>

      <ComponentSection id="badge" title="Badge">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">3</Badge>
          <Badge variant="success">OK</Badge>
          <Badge variant="warning">!</Badge>
          <Badge variant="danger">99+</Badge>
        </div>
      </ComponentSection>

      <ComponentSection id="section" title="Section">
        <Section
          padded={false}
          className="rounded bg-[var(--color-surface-elevated)] p-3"
        >
          A semantic &lt;section&gt;. Padded variant adds vertical breathing.
        </Section>
      </ComponentSection>

      <ComponentSection id="container" title="Container">
        <Container
          size="md"
          className="rounded bg-[var(--color-surface-elevated)] p-3 text-sm"
        >
          Centered max-width container (size=md here). Use xl on regions.
        </Container>
      </ComponentSection>

      <ComponentSection id="grid" title="Grid">
        <Grid cols={3} gap="md">
          {['A', 'B', 'C', 'D', 'E', 'F'].map((cell) => (
            <Card key={cell} variant="default" className="text-center">
              {cell}
            </Card>
          ))}
        </Grid>
      </ComponentSection>

      {/* === TRAVEL COMPOSITES === */}
      <ComponentSection id="affiliate-disclosure" title="AffiliateDisclosure">
        {disclosure}
      </ComponentSection>

      <ComponentSection
        id="affiliate-card"
        title="AffiliateCard (wired: real bookingLink / civitatisLink helpers)"
      >
        <div className="flex flex-col gap-4">
          {affiliateCardBooking}
          {affiliateCardCivitatis}
        </div>
      </ComponentSection>

      <ComponentSection id="itinerary-card" title="ItineraryCard">
        <ItineraryCard
          title="3 days in Jerusalem"
          summary="Old City, Mount of Olives, Yad Vashem"
          days={[
            {
              day: 1,
              title: 'Old City quarters',
              summary: 'Walk all four quarters; Western Wall + Holy Sepulchre.',
            },
            {
              day: 2,
              title: 'Mount of Olives',
              summary:
                'Sunrise panorama, Garden of Gethsemane, Russian compound.',
            },
            {
              day: 3,
              title: 'Yad Vashem + Israel Museum',
              summary: 'Holocaust memorial + Dead Sea Scrolls.',
            },
          ]}
        />
      </ComponentSection>

      <ComponentSection id="where-to-stay" title="WhereToStay">
        <WhereToStay
          priceRange="₪400–1200 / $110–330"
          neighborhoods={[
            {
              name: 'Old City',
              blurb: 'Inside the walls; high atmosphere, quiet by night.',
            },
            {
              name: 'German Colony',
              blurb: 'Boutique, leafy streets, walkable to center.',
            },
            {
              name: 'Mamilla',
              blurb: 'Modern mall + 5-star hotels next to Jaffa Gate.',
            },
          ]}
        />
      </ComponentSection>

      <ComponentSection id="transport-info" title="TransportInfo">
        <TransportInfo
          airport={{ code: 'TLV', name: 'Ben Gurion International Airport' }}
          transportOptions={[
            {
              mode: 'Train (Yitzhak Navon)',
              description: 'Direct rail to Jerusalem city centre.',
              durationMinutes: 30,
            },
            {
              mode: 'Sherut (shared taxi)',
              description: 'Door-to-door; runs 24/7 including Shabbat.',
              durationMinutes: 60,
            },
            {
              mode: 'Rental car',
              description: 'Best for day trips to Dead Sea / Galilee.',
            },
          ]}
        />
      </ComponentSection>

      <ComponentSection id="best-time-to-visit" title="BestTimeToVisit">
        <BestTimeToVisit
          months={[2, 3, 4, 9, 10]}
          seasonHighlights={[
            {
              season: 'Spring (Mar–May)',
              monthsIndex: [2, 3, 4],
              highlights: 'Wildflowers in the Negev; mild Jerusalem days.',
            },
            {
              season: 'Autumn (Oct)',
              monthsIndex: [9, 10],
              highlights: 'Best Mediterranean swim weather + dry trails.',
            },
          ]}
          monthLocale="en"
        />
      </ComponentSection>

      <ComponentSection id="shabbat-notice" title="ShabbatNotice (STATIC)">
        <ShabbatNotice
          closesAt="Fri 18:00"
          reopensAt="Sat 19:30"
          notes="Public transport is largely suspended; pre-book taxis or use Sherut."
        />
      </ComponentSection>

      <ComponentSection id="price" title="Price (STATIC ILS+USD+EUR)">
        <div className="flex flex-col gap-2">
          <Price ils={250} usd={70} eur={65} />
          <Price ils={45} usd={12} prefix="from" />
          <Price ils={1200} />
        </div>
      </ComponentSection>

      <ComponentSection
        id="sticky-cta"
        title="StickyCTA (preview — actual position is fixed)"
      >
        <p className="text-sm text-[var(--color-ink-muted)]">
          In production, StickyCTA pins to bottom-end of viewport. Preview only:
        </p>
        <Button variant="primary" size="lg">
          Book your trip →
        </Button>
        {/* Render the real fixed-position component once per page. */}
        <StickyCTA href="#playground-bottom">Book your trip</StickyCTA>
      </ComponentSection>

      {/* RegionHero + AttractionGrid + PhotoGallery deliberately omitted —
          they need real ledgered images (plan 03 ledger is empty in Phase 1).
          Phase 2 region pages will exercise them. */}

      {/* === LAYOUT === */}
      <ComponentSection id="language-switcher" title="LanguageSwitcher">
        {languageSwitcher}
      </ComponentSection>

      <ComponentSection
        id="skip-nav"
        title="SkipNav (focus the link to reveal it)"
      >
        {skipNav}
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Tab into the page to see the SkipNav — it&apos;s the first focusable
          element on every page (A11Y-02).
        </p>
      </ComponentSection>

      <ComponentSection id="icon" title="Icon (directional vs non-directional)">
        <div className="flex flex-wrap items-center gap-3">
          <Icon directional label="next">
            <polyline points="9 18 15 12 9 6" />
          </Icon>
          <Icon label="info">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </Icon>
        </div>
      </ComponentSection>

      <ComponentSection
        id="ltr"
        title="Ltr (bidi-isolated digits inside RTL paragraph)"
      >
        <p>
          Call us at <Ltr>+972-2-555-0123</Ltr> from any local landline.
        </p>
      </ComponentSection>

      <span id="playground-bottom" />
    </main>
  );
}

// Statically generate /he/admin/components and /en/admin/components.
// The `locale` segment is provided by the parent [locale] layout.
export function generateStaticParams(): Array<{ component?: string }> {
  return [];
}
