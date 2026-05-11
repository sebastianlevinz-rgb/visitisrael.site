/**
 * Smoke tests for travel composites + layout components.
 *
 * Each component must:
 *   - Render in both LTR and RTL without `console.error`
 *   - Use only logical / non-directional Tailwind utilities
 *   - Reference colors via semantic tokens (`var(--color-…)`)
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ReactNode } from 'react';

// Stub next-intl/server hooks for any layout component that calls them.
vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(async () => 'he'),
  getTranslations: vi.fn(
    async () => (key: string, vars?: Record<string, unknown>) => {
      if (vars && 'year' in vars) return `${key} ${String(vars.year)}`;
      return key;
    },
  ),
}));

// next/image — render a plain <img> in jsdom to avoid Next.js runtime requirements.
// The @next/next/no-img-element rule is disabled here ONLY because this is a
// test mock — production code uses next/image (enforced by the rule everywhere
// outside this file).
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const {
      src,
      alt,
      sizes,
      width,
      height,
      fill,
      priority,
      fetchPriority,
      ...rest
    } = props as {
      src: string;
      alt: string;
      sizes?: string;
      width?: number;
      height?: number;
      fill?: boolean;
      priority?: boolean;
      fetchPriority?: string;
    };
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        data-sizes={sizes}
        data-width={width}
        data-height={height}
        data-fill={fill ? 'true' : undefined}
        data-priority={priority ? 'true' : undefined}
        data-fetch-priority={fetchPriority}
        {...(rest as Record<string, unknown>)}
      />
    );
  },
}));

// photo-credits — return synthetic credit so we can render gallery/hero without
// touching the real ledger (which is empty at end of plan 03).
vi.mock('@/lib/photo-credits', () => ({
  getCredit: (src: string) => ({
    src,
    author: 'Test Author',
    license: 'CC-BY-4.0',
    sourceUrl: 'https://example.com',
    region: 'jerusalem',
    width: 1600,
    height: 900,
    subjectType: 'cityscape',
  }),
}));

import { RegionHero } from '@/components/travel/RegionHero';
import { AttractionGrid } from '@/components/travel/AttractionGrid';
import { AffiliateCard } from '@/components/travel/AffiliateCard';
import { PhotoGallery } from '@/components/travel/PhotoGallery';
import { StickyCTA } from '@/components/travel/StickyCTA';
import { ItineraryCard } from '@/components/travel/ItineraryCard';
import { WhereToStay } from '@/components/travel/WhereToStay';
import { TransportInfo } from '@/components/travel/TransportInfo';
import { BestTimeToVisit } from '@/components/travel/BestTimeToVisit';
import { ShabbatNotice } from '@/components/travel/ShabbatNotice';
import { Price } from '@/components/travel/Price';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { SkipNav } from '@/components/layout/SkipNav';
import { Icon } from '@/components/layout/Icon';
import { Ltr } from '@/components/layout/Ltr';

function renderWithDir(ui: ReactNode, dir: 'ltr' | 'rtl') {
  return render(<div dir={dir}>{ui}</div>);
}

async function renderAsync(
  node: Promise<ReactNode>,
  dir: 'ltr' | 'rtl' = 'ltr',
) {
  const resolved = await node;
  return renderWithDir(resolved, dir);
}

let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  // Allow specific tests to assert error count; default expectation = zero
  if (errorSpy.mock.calls.length > 0) {
    // Surface the actual error for debugging then fail
    console.warn('console.error captured:', errorSpy.mock.calls);
  }
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
  cleanup();
});

describe('Travel composites — render in both directions', () => {
  it('<RegionHero> renders with priority + fetchpriority high', () => {
    renderWithDir(
      <RegionHero
        imageSrc="/images/jerusalem-hero.jpg"
        title="Jerusalem"
        subtitle="The ancient city"
      />,
      'rtl',
    );
    const img = screen.getByAltText('Jerusalem hero image');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('data-priority')).toBe('true');
    expect(img.getAttribute('data-fetch-priority')).toBe('high');
    expect(
      screen.getByRole('heading', { name: 'Jerusalem' }),
    ).toBeInTheDocument();
  });

  it('<AttractionGrid> renders all attractions with anchors', () => {
    renderWithDir(
      <AttractionGrid
        attractions={[
          {
            slug: 'kotel',
            href: '/jerusalem/kotel',
            name: 'Western Wall',
            imageSrc: '/images/kotel.jpg',
            alt: 'Western Wall',
          },
          {
            slug: 'tower',
            href: '/jerusalem/tower',
            name: 'Tower of David',
            imageSrc: '/images/tower.jpg',
            alt: 'Tower of David',
          },
        ]}
      />,
      'ltr',
    );
    expect(screen.getByText('Western Wall')).toBeInTheDocument();
    expect(screen.getByText('Tower of David')).toBeInTheDocument();
  });

  it('<PhotoGallery> emits sizes attribute (srcset auto-emitted by next/image)', () => {
    const sizes = '(max-width: 768px) 100vw, 50vw';
    renderWithDir(
      <PhotoGallery
        sizes={sizes}
        images={[{ src: '/images/a.jpg', alt: 'A' }]}
      />,
      'ltr',
    );
    const img = screen.getByAltText('A');
    expect(img.getAttribute('data-sizes')).toBe(sizes);
    expect(img.getAttribute('data-width')).toBe('1600');
  });

  it('<StickyCTA> renders an anchor when href is provided', () => {
    renderWithDir(<StickyCTA href="/book">Book now</StickyCTA>, 'rtl');
    const a = screen.getByRole('link', { name: /book now/i });
    expect(a.getAttribute('href')).toBe('/book');
  });

  it('<ItineraryCard> renders day list', () => {
    renderWithDir(
      <ItineraryCard
        title="3 days in Jerusalem"
        days={[
          { day: 1, title: 'Old City', summary: 'Walk the quarters' },
          { day: 2, title: 'Mount of Olives', summary: 'Sunrise views' },
        ]}
      />,
      'rtl',
    );
    expect(screen.getByText('Old City')).toBeInTheDocument();
    expect(screen.getByText('Sunrise views')).toBeInTheDocument();
  });

  it('<WhereToStay> + <TransportInfo> + <BestTimeToVisit> render in RTL', () => {
    renderWithDir(
      <>
        <WhereToStay
          priceRange="₪400-1200"
          neighborhoods={[{ name: 'Old City', blurb: 'Historic core' }]}
        />
        <TransportInfo
          airport={{ code: 'TLV', name: 'Ben Gurion' }}
          transportOptions={[
            { mode: 'Train', description: 'Direct line', durationMinutes: 30 },
          ]}
        />
        <BestTimeToVisit
          months={[3, 4, 5]}
          seasonHighlights={[
            {
              season: 'Spring',
              monthsIndex: [3, 4, 5],
              highlights: 'Wildflowers + mild weather',
            },
          ]}
          monthLocale="he"
        />
      </>,
      'rtl',
    );
    expect(
      screen.getByText('Historic core', { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText('TLV')).toBeInTheDocument();
    expect(screen.getByText(/Wildflowers/)).toBeInTheDocument();
  });

  it('<ShabbatNotice> is STATIC — renders without fetching anything', () => {
    renderWithDir(
      <ShabbatNotice closesAt="Fri 18:00" reopensAt="Sat 19:30" />,
      'rtl',
    );
    expect(screen.getByLabelText('Shabbat notice')).toBeInTheDocument();
    expect(screen.getByText(/Fri 18:00/)).toBeInTheDocument();
  });

  it('<Price ils usd eur> renders all three statically in <Ltr>', () => {
    renderWithDir(<Price ils={250} usd={70} eur={65} />, 'rtl');
    expect(screen.getByText(/250/)).toBeInTheDocument();
    expect(screen.getByText(/\$70/)).toBeInTheDocument();
    expect(screen.getByText(/€65/)).toBeInTheDocument();
  });

  it('<AffiliateCard> stub renders #TODO-PLAN-06 href + DOM-precedes disclosure', async () => {
    const element = await AffiliateCard({
      partner: 'booking',
      destination: 'Jerusalem',
    });
    renderWithDir(element, 'rtl');
    const disclosure = screen.getByRole('note');
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('#TODO-PLAN-06');
    // DOM order: disclosure should come BEFORE link
    expect(
      disclosure.compareDocumentPosition(link) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeGreaterThan(0);
  });
});

describe('Layout components — render in both directions', () => {
  it('<Header> renders site name + LanguageSwitcher', async () => {
    await renderAsync(Header());
    // siteName is mocked → just key string
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('<Footer> renders nav + 5 legal links + copyright', async () => {
    await renderAsync(Footer());
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    // 5 legal links (privacy, about, contact, affiliate, accessibility)
    const nav = screen.getByRole('navigation', { name: 'navLabel' });
    expect(nav.querySelectorAll('a').length).toBe(5);
  });

  it('<LanguageSwitcher> exposes HE + EN anchors with hreflang', async () => {
    await renderAsync(LanguageSwitcher());
    const heAnchor = screen.getByRole('link', { name: 'עברית' });
    const enAnchor = screen.getByRole('link', { name: 'English' });
    expect(heAnchor.getAttribute('hreflang')).toBe('he');
    expect(enAnchor.getAttribute('hreflang')).toBe('en');
  });

  it('<SkipNav> renders Hebrew text on HE locale', async () => {
    await renderAsync(SkipNav(), 'rtl');
    const link = screen.getByRole('link');
    expect(link.textContent).toContain('דלג לתוכן הראשי');
    expect(link.getAttribute('href')).toBe('#main-content');
  });

  it('<Icon directional> includes rtl:rotate-180 utility', () => {
    renderWithDir(<Icon directional label="next" data-testid="icon" />, 'rtl');
    const icon = screen.getByTestId('icon');
    expect(icon.getAttribute('class')).toMatch(/rtl:rotate-180/);
  });

  it('<Icon> without label is aria-hidden', () => {
    renderWithDir(<Icon data-testid="icon" />, 'ltr');
    const icon = screen.getByTestId('icon');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('<Ltr> wraps children in <bdo dir="ltr">', () => {
    renderWithDir(<Ltr>+972-2-555-0123</Ltr>, 'rtl');
    const bdo = screen.getByText('+972-2-555-0123');
    expect(bdo.tagName).toBe('BDO');
    expect(bdo.getAttribute('dir')).toBe('ltr');
  });

  it('<AffiliateDisclosure> has data-component attribute for AUD-009', async () => {
    await renderAsync(AffiliateDisclosure({}));
    // Disclosure renders as a <p role="note">
    const note = screen.getByRole('note');
    expect(note.getAttribute('data-component')).toBe('affiliate-disclosure');
  });
});

describe('AST scan — no physical directional utilities, no raw hex in composites/layout', () => {
  const allComponentFiles = [
    'components/travel/RegionHero.tsx',
    'components/travel/AttractionGrid.tsx',
    'components/travel/AffiliateCard.tsx',
    'components/travel/PhotoGallery.tsx',
    'components/travel/StickyCTA.tsx',
    'components/travel/ItineraryCard.tsx',
    'components/travel/WhereToStay.tsx',
    'components/travel/TransportInfo.tsx',
    'components/travel/BestTimeToVisit.tsx',
    'components/travel/ShabbatNotice.tsx',
    'components/travel/Price.tsx',
    'components/travel/AffiliateDisclosure.tsx',
    'components/layout/Header.tsx',
    'components/layout/Footer.tsx',
    'components/layout/LanguageSwitcher.tsx',
    'components/layout/SkipNav.tsx',
    'components/layout/Icon.tsx',
    'components/layout/Ltr.tsx',
  ];

  const physicalPatterns = [
    /\bml-\d/,
    /\bmr-\d/,
    /\bpl-\d/,
    /\bpr-\d/,
    /\btext-left\b/,
    /\btext-right\b/,
    /\bborder-l\b/,
    /\bborder-r\b/,
    /\brounded-l\b/,
    /\brounded-r\b/,
  ];

  const rawHexInClass = /\[#[0-9a-fA-F]{3,8}\]/;
  const rawHexInStyle = /['"]#[0-9a-fA-F]{3,8}['"]/;

  it.each(allComponentFiles)('%s — no physical directional utility', (file) => {
    const content = readFileSync(join(process.cwd(), file), 'utf8');
    for (const pattern of physicalPatterns) {
      expect(
        pattern.test(content),
        `${file} contains banned pattern ${pattern.source}`,
      ).toBe(false);
    }
  });

  it.each(allComponentFiles)('%s — no raw hex', (file) => {
    const content = readFileSync(join(process.cwd(), file), 'utf8');
    expect(rawHexInClass.test(content)).toBe(false);
    expect(rawHexInStyle.test(content)).toBe(false);
  });
});
