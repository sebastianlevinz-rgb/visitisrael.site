/**
 * Jerusalem "3 Days in Jerusalem" itinerary — content-level invariants.
 *
 * Phase 2 plan 04: validates the EN + HE itinerary MDX files after
 * Velite compilation. Per-page invariants per the PLAN behavior:
 *
 *   - frontmatter shape (lang, slug "3-days-in-jerusalem", durationDays=3,
 *     regions includes "jerusalem", startRegion=jerusalem, title 40-70,
 *     description 120-160)
 *   - 3 H2 day sections (Day 1 / Day 2 / Day 3 in EN; יום 1 / יום 2 / יום 3
 *     in HE)
 *   - ≥3 markdown links to /jerusalem/<sub-dest>/ paths from plan 02-03 set
 *   - ≥3 <AffiliateCard partner="..." invocations across ≥3 partners
 *     (lodging + transport + tour)
 *   - word count band per locale (EN: 1500-2500; HE per-pair ratio)
 *   - Bethlehem mention includes admin-status framing (PITFALLS §3.3); NO
 *     link to /west-bank/bethlehem/ (deferred to Phase 3)
 *   - For HE: Bethlehem framed via "תחת מינהל הרשות הפלסטינית"
 *
 * Tests are guarded with skipIf(!HAS_MDX) so the suite stays green at the
 * Wave 0 / per-task commit boundary.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ITINERARIES_JSON = resolve(process.cwd(), '.velite/itineraries.json');

interface ItineraryEntry {
  lang: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  durationDays: number;
  regions: string[];
  startRegion: string;
  body: string;
  stops?: Array<{ slug: string; day: number; period: string }>;
}

function loadItineraries(): ItineraryEntry[] {
  if (!existsSync(ITINERARIES_JSON)) return [];
  try {
    return JSON.parse(
      readFileSync(ITINERARIES_JSON, 'utf8'),
    ) as ItineraryEntry[];
  } catch {
    return [];
  }
}

function find(slug: string, lang: 'en' | 'he'): ItineraryEntry | undefined {
  return loadItineraries().find((i) => i.slug === slug && i.lang === lang);
}

const ITINERARY_SLUG = '3-days-in-jerusalem';

const SHIPPED_SUB_DESTS = [
  'old-city',
  'western-wall',
  'holy-sepulchre',
  'yad-vashem',
  'mahane-yehuda',
  'mount-of-olives',
  'city-of-david',
] as const;

function mdxPath(lang: 'en' | 'he'): string {
  return resolve(
    process.cwd(),
    `content/${lang}/itineraries/${ITINERARY_SLUG}.mdx`,
  );
}

function hasMdx(lang: 'en' | 'he'): boolean {
  return existsSync(mdxPath(lang));
}

function readBody(lang: 'en' | 'he'): string {
  const raw = readFileSync(mdxPath(lang), 'utf8');
  return raw.replace(/^---[\s\S]*?---/, '');
}

function countWords(lang: 'en' | 'he'): number {
  const raw = readFileSync(mdxPath(lang), 'utf8');
  const body = raw.replace(/^---[\s\S]*?---/, '');
  const prose = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/^import .*$/gm, '');
  return prose
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1).length;
}

describe('Jerusalem 3-day itinerary (Velite Itinerary)', () => {
  // ---------- EN ----------
  const EN_HAS = hasMdx('en');

  describe('en/itineraries/3-days-in-jerusalem', () => {
    it.skipIf(!EN_HAS)('exists in Velite itineraries collection', () => {
      const r = find(ITINERARY_SLUG, 'en');
      expect(r, 'Run pnpm velite first').toBeDefined();
    });

    it.skipIf(!EN_HAS)(
      'frontmatter has lang=en, slug, durationDays=3, regions includes jerusalem, startRegion=jerusalem',
      () => {
        const r = find(ITINERARY_SLUG, 'en');
        if (!r) return;
        expect(r.lang).toBe('en');
        expect(r.slug).toBe(ITINERARY_SLUG);
        expect(r.durationDays).toBe(3);
        expect(r.regions).toContain('jerusalem');
        expect(r.startRegion).toBe('jerusalem');
      },
    );

    it.skipIf(!EN_HAS)('title length 40-70, description length 120-160', () => {
      const r = find(ITINERARY_SLUG, 'en');
      if (!r) return;
      expect(r.title.length).toBeGreaterThanOrEqual(40);
      expect(r.title.length).toBeLessThanOrEqual(70);
      expect(r.description.length).toBeGreaterThanOrEqual(120);
      expect(r.description.length).toBeLessThanOrEqual(160);
    });

    it.skipIf(!EN_HAS)(
      'body has 3 H2 day sections matching "Day 1/2/3"',
      () => {
        const body = readBody('en');
        expect(/^##\s+Day\s*1\b/im.test(body)).toBe(true);
        expect(/^##\s+Day\s*2\b/im.test(body)).toBe(true);
        expect(/^##\s+Day\s*3\b/im.test(body)).toBe(true);
      },
    );

    it.skipIf(!EN_HAS)(
      'body has ≥3 markdown links to /jerusalem/<sub-dest>/ paths from plan 02-03 set',
      () => {
        const body = readBody('en');
        const matches = [...body.matchAll(/\]\(\/jerusalem\/([a-z-]+)\/?\)/g)];
        const linkedSlugs = new Set(matches.map((m) => m[1]).filter(Boolean));
        // All linked sub-dests must be from the shipped Phase 2.3 set.
        for (const slug of linkedSlugs) {
          expect(
            SHIPPED_SUB_DESTS.includes(
              slug as (typeof SHIPPED_SUB_DESTS)[number],
            ),
            `Unknown sub-dest linked: /jerusalem/${slug}/`,
          ).toBe(true);
        }
        expect(linkedSlugs.size).toBeGreaterThanOrEqual(3);
      },
    );

    it.skipIf(!EN_HAS)(
      'body has ≥3 <AffiliateCard partner="..."> invocations across ≥3 distinct partners',
      () => {
        const body = readBody('en');
        const matches = [
          ...body.matchAll(/<AffiliateCard\s[^>]*partner="([^"]+)"/g),
        ];
        expect(matches.length).toBeGreaterThanOrEqual(3);
        const partners = new Set(matches.map((m) => m[1]));
        expect(partners.size).toBeGreaterThanOrEqual(3);
      },
    );

    it.skipIf(!EN_HAS)(
      'AffiliateCard partner mix includes lodging + transport + tour categories',
      () => {
        const body = readBody('en');
        const matches = [
          ...body.matchAll(/<AffiliateCard\s[^>]*partner="([^"]+)"/g),
        ];
        const partners = new Set(matches.map((m) => m[1]));
        // Lodging: booking | hostelworld
        const lodging = ['booking', 'hostelworld'].some((p) => partners.has(p));
        // Transport: skyscanner | rentalcars | discoverCars
        const transport = ['skyscanner', 'rentalcars', 'discoverCars'].some(
          (p) => partners.has(p),
        );
        // Tour: civitatis | viator | getYourGuide
        const tour = ['civitatis', 'viator', 'getYourGuide'].some((p) =>
          partners.has(p),
        );
        expect(
          lodging,
          'Expected ≥1 lodging partner (booking/hostelworld)',
        ).toBe(true);
        expect(
          transport,
          'Expected ≥1 transport partner (skyscanner/rentalcars/discoverCars)',
        ).toBe(true);
        expect(tour, 'Expected ≥1 tour partner (civitatis/viator/gyg)').toBe(
          true,
        );
      },
    );

    it.skipIf(!EN_HAS)(
      'word count between 1500 and 2500 (GUIDE_OR_WINERY band)',
      () => {
        const words = countWords('en');
        expect(words).toBeGreaterThanOrEqual(1500);
        expect(words).toBeLessThanOrEqual(2500);
      },
    );

    it.skipIf(!EN_HAS)(
      'Bethlehem mention includes "Palestinian Authority" framing (PITFALLS §3.3)',
      () => {
        const raw = readFileSync(mdxPath('en'), 'utf8');
        if (/bethlehem/i.test(raw)) {
          expect(/Palestinian\s+Authority/i.test(raw)).toBe(true);
        }
      },
    );

    it.skipIf(!EN_HAS)(
      'NO direct link to /west-bank/bethlehem/ (deferred to Phase 3)',
      () => {
        const raw = readFileSync(mdxPath('en'), 'utf8');
        expect(/\/west-bank\/bethlehem/i.test(raw)).toBe(false);
      },
    );

    it.skipIf(!EN_HAS)('never uses "Wailing Wall" (AUD-017)', () => {
      const raw = readFileSync(mdxPath('en'), 'utf8');
      expect(/wailing\s+wall/i.test(raw)).toBe(false);
    });

    it.skipIf(!EN_HAS)(
      'does NOT inline <AffiliateDisclosure> (renderer wires it once)',
      () => {
        const raw = readFileSync(mdxPath('en'), 'utf8');
        expect(/<AffiliateDisclosure\b/.test(raw)).toBe(false);
      },
    );

    it.skipIf(!EN_HAS)(
      'frontmatter.stops references only shipped sub-destinations',
      () => {
        const r = find(ITINERARY_SLUG, 'en');
        if (!r || !r.stops) return;
        for (const s of r.stops) {
          expect(
            SHIPPED_SUB_DESTS.includes(
              s.slug as (typeof SHIPPED_SUB_DESTS)[number],
            ),
            `Stop slug "${s.slug}" is not in the shipped Phase 2.3 set`,
          ).toBe(true);
          expect(s.day).toBeGreaterThanOrEqual(1);
          expect(s.day).toBeLessThanOrEqual(3);
        }
      },
    );
  });

  // ---------- HE ----------
  const HE_HAS = hasMdx('he');

  describe('he/itineraries/3-days-in-jerusalem', () => {
    it.skipIf(!HE_HAS)('exists in Velite itineraries collection', () => {
      const r = find(ITINERARY_SLUG, 'he');
      expect(r, 'Run pnpm velite first').toBeDefined();
    });

    it.skipIf(!HE_HAS)(
      'frontmatter lang=he with same slug + durationDays + regions',
      () => {
        const r = find(ITINERARY_SLUG, 'he');
        if (!r) return;
        expect(r.lang).toBe('he');
        expect(r.slug).toBe(ITINERARY_SLUG);
        expect(r.durationDays).toBe(3);
        expect(r.regions).toContain('jerusalem');
        expect(r.startRegion).toBe('jerusalem');
      },
    );

    it.skipIf(!HE_HAS)('title 40-70, description 120-160', () => {
      const r = find(ITINERARY_SLUG, 'he');
      if (!r) return;
      expect(r.title.length).toBeGreaterThanOrEqual(40);
      expect(r.title.length).toBeLessThanOrEqual(70);
      expect(r.description.length).toBeGreaterThanOrEqual(120);
      expect(r.description.length).toBeLessThanOrEqual(160);
    });

    it.skipIf(!HE_HAS)('body has 3 H2 day sections matching יום 1/2/3', () => {
      const body = readBody('he');
      expect(/^##\s+יום\s*1\b/im.test(body)).toBe(true);
      expect(/^##\s+יום\s*2\b/im.test(body)).toBe(true);
      expect(/^##\s+יום\s*3\b/im.test(body)).toBe(true);
    });

    it.skipIf(!HE_HAS)(
      'body has ≥3 markdown links to /jerusalem/<sub-dest>/ paths',
      () => {
        const body = readBody('he');
        const matches = [...body.matchAll(/\]\(\/jerusalem\/([a-z-]+)\/?\)/g)];
        const linkedSlugs = new Set(matches.map((m) => m[1]).filter(Boolean));
        for (const slug of linkedSlugs) {
          expect(
            SHIPPED_SUB_DESTS.includes(
              slug as (typeof SHIPPED_SUB_DESTS)[number],
            ),
            `Unknown sub-dest linked (HE): /jerusalem/${slug}/`,
          ).toBe(true);
        }
        expect(linkedSlugs.size).toBeGreaterThanOrEqual(3);
      },
    );

    it.skipIf(!HE_HAS)(
      'body has ≥3 AffiliateCard placements across ≥3 distinct partners',
      () => {
        const body = readBody('he');
        const matches = [
          ...body.matchAll(/<AffiliateCard\s[^>]*partner="([^"]+)"/g),
        ];
        expect(matches.length).toBeGreaterThanOrEqual(3);
        const partners = new Set(matches.map((m) => m[1]));
        expect(partners.size).toBeGreaterThanOrEqual(3);
      },
    );

    it.skipIf(!HE_HAS)(
      'Bethlehem framing in Hebrew: תחת מינהל הרשות הפלסטינית',
      () => {
        const raw = readFileSync(mdxPath('he'), 'utf8');
        if (/בית\s+לחם/.test(raw)) {
          expect(/הרשות\s+הפלסטינית/.test(raw)).toBe(true);
        }
      },
    );

    it.skipIf(!HE_HAS)(
      'NO link to /west-bank/bethlehem/ (HE; deferred to Phase 3)',
      () => {
        const raw = readFileSync(mdxPath('he'), 'utf8');
        expect(/\/west-bank\/bethlehem/i.test(raw)).toBe(false);
      },
    );

    it.skipIf(!HE_HAS)(
      'never uses כותל הדמעות (HE parallel of AUD-017)',
      () => {
        const raw = readFileSync(mdxPath('he'), 'utf8');
        expect(/כותל\s+הדמעות/.test(raw)).toBe(false);
      },
    );
  });

  // ---------- AUD-007 word-count parity ----------
  describe('AUD-007: HE/EN word count parity for itinerary pair', () => {
    it.skipIf(!EN_HAS || !HE_HAS)('HE/EN ratio in [0.85, 1.40]', () => {
      const en = countWords('en');
      const he = countWords('he');
      const ratio = he / en;
      expect(ratio).toBeGreaterThanOrEqual(0.85);
      expect(ratio).toBeLessThanOrEqual(1.4);
    });
  });
});
