/**
 * Dead Sea canonical (EN + HE) + 5 sub-destination pair invariants.
 *
 * Phase 3 plan 02 Task 2 + Task 3: validates MDX content authored in
 * `content/{en,he}/regions/dead-sea.mdx` plus
 * `content/{en,he}/sub-destinations/dead-sea-*.mdx` after Velite compilation.
 *
 * Mirrors `tel-aviv-region.test.ts` shape, parameterized for Dead Sea.
 *
 * Special invariants for Dead Sea (per plan 02 critical_context):
 *   - AUD-018 biased framing 0 violations: NO "Judea and Samaria" / NO "occupied territories"
 *   - Masada + Qumran are archaeological (Place schema), NOT religious buildings
 *     (no religiousSiteId frontmatter on any sub-dest)
 *   - "Dead Sea northern shore" is the neutral phrasing for West Bank Area C edge
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const REGIONS_JSON = resolve(process.cwd(), '.velite/regions.json');

interface RegionEntry {
  lang: string;
  region: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  body: string;
  faqs?: Array<{ question: string; answer: string }>;
}

function loadRegions(): RegionEntry[] {
  if (!existsSync(REGIONS_JSON)) return [];
  try {
    return JSON.parse(readFileSync(REGIONS_JSON, 'utf8')) as RegionEntry[];
  } catch {
    return [];
  }
}

function findEn(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'en' && r.region === 'dead-sea');
}

function findHe(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'he' && r.region === 'dead-sea');
}

const EN_MDX_PATH = resolve(process.cwd(), 'content/en/regions/dead-sea.mdx');
const HE_MDX_PATH = resolve(process.cwd(), 'content/he/regions/dead-sea.mdx');
const HAS_EN_MDX = existsSync(EN_MDX_PATH);
const HAS_HE_MDX = existsSync(HE_MDX_PATH);

function countProseWordsEn(raw: string): number {
  const body = raw.replace(/^---[\s\S]*?---/, '');
  const prose = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/^import .*$/gm, '');
  return prose
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && /[a-zA-Z]/.test(w)).length;
}

function countProseWordsHe(raw: string): number {
  const body = raw.replace(/^---[\s\S]*?---/, '');
  const prose = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/^import .*$/gm, '');
  return prose
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && /[֐-׿]/.test(w)).length;
}

describe('Dead Sea EN canonical (Velite Region)', () => {
  it.skipIf(!HAS_EN_MDX)('exists in the Velite regions collection', () => {
    const r = findEn();
    expect(r, 'Run `pnpm velite` first to compile MDX').toBeDefined();
  });

  it('has frontmatter title 40-70 chars and description 120-160 chars', () => {
    const r = findEn();
    if (!r) return;
    expect(r.title.length).toBeGreaterThanOrEqual(40);
    expect(r.title.length).toBeLessThanOrEqual(70);
    expect(r.description.length).toBeGreaterThanOrEqual(120);
    expect(r.description.length).toBeLessThanOrEqual(160);
  });

  it('compiled body contains the primary keyword "Dead Sea" in prose', () => {
    const r = findEn();
    if (!r) return;
    const occurrences = r.body.match(/Dead\s*Sea/gi);
    expect(occurrences, 'primary keyword missing from prose').not.toBeNull();
    expect((occurrences as RegExpMatchArray).length).toBeGreaterThanOrEqual(5);
  });

  it('compiled body has NO H1 (page H1 is owned by RegionHero)', () => {
    const r = findEn();
    if (!r) return;
    const matches = r.body.match(/\.h1[\s,)]/g) ?? [];
    expect(matches.length).toBe(0);
  });

  it('compiled body declares 7-12 H2 sections', () => {
    const r = findEn();
    if (!r) return;
    const matches = r.body.match(/\.h2[\s,)]/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(7);
    expect(matches.length).toBeLessThanOrEqual(12);
  });

  it('contains >=5 AffiliateCard placements across >=5 distinct partners', () => {
    const r = findEn();
    if (!r) return;
    const partnerHits = [...r.body.matchAll(/partner:\s*["']([a-zA-Z]+)["']/g)];
    expect(partnerHits.length).toBeGreaterThanOrEqual(5);
    const distinct = new Set(partnerHits.map((m) => m[1]));
    expect(distinct.size).toBeGreaterThanOrEqual(5);
  });

  it('never says "Wailing Wall" (AUD-017 global rule)', () => {
    const r = findEn();
    if (!r) return;
    expect(/wailing\s+wall/i.test(r.body)).toBe(false);
  });

  it('never says "Judea and Samaria" (AUD-018 biased framing — Dead Sea-critical)', () => {
    const r = findEn();
    if (!r) return;
    expect(/judea\s+and\s+samaria/i.test(r.body)).toBe(false);
  });

  it('never says "occupied territories" (AUD-018 biased framing — Dead Sea-critical)', () => {
    const r = findEn();
    if (!r) return;
    expect(/occupied\s+territories/i.test(r.body)).toBe(false);
  });

  it('faqs frontmatter has 5-10 entries', () => {
    const r = findEn();
    if (!r) return;
    expect(Array.isArray(r.faqs)).toBe(true);
    const faqs = r.faqs ?? [];
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(faqs.length).toBeLessThanOrEqual(10);
  });
});

describe('Dead Sea EN MDX (raw source)', () => {
  it.skipIf(!HAS_EN_MDX)('raw MDX file exists', () => {
    expect(existsSync(EN_MDX_PATH)).toBe(true);
  });

  it('word count between 1500 and 2500', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    const words = countProseWordsEn(raw);
    expect(words).toBeGreaterThanOrEqual(1500);
    expect(words).toBeLessThanOrEqual(2500);
  });

  it('does NOT inline <AffiliateDisclosure> (renderer wires it once)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    expect(/<AffiliateDisclosure\b/.test(raw)).toBe(false);
  });
});

describe('Dead Sea HE canonical (Velite Region)', () => {
  it.skipIf(!HAS_HE_MDX)('exists in the Velite regions collection', () => {
    const r = findHe();
    expect(r, 'Run `pnpm velite` first to compile MDX').toBeDefined();
  });

  it('has frontmatter slug=dead-sea + region=dead-sea', () => {
    const r = findHe();
    if (!r) return;
    expect(r.slug).toBe('dead-sea');
    expect(r.region).toBe('dead-sea');
  });

  it('compiled body contains primary HE keyword ים המלח', () => {
    const r = findHe();
    if (!r) return;
    const mentions = r.body.match(/ים\s*המלח/g);
    expect(mentions, 'primary HE entity missing').not.toBeNull();
    expect((mentions as RegExpMatchArray).length).toBeGreaterThanOrEqual(5);
  });

  it('compiled body has NO H1', () => {
    const r = findHe();
    if (!r) return;
    const matches = r.body.match(/\.h1[\s,)]/g) ?? [];
    expect(matches.length).toBe(0);
  });

  it('declares 7-12 H2 sections', () => {
    const r = findHe();
    if (!r) return;
    const matches = r.body.match(/\.h2[\s,)]/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(7);
    expect(matches.length).toBeLessThanOrEqual(12);
  });

  it('contains >=5 AffiliateCard placements across >=5 distinct partners', () => {
    const r = findHe();
    if (!r) return;
    const partnerHits = [...r.body.matchAll(/partner:\s*["']([a-zA-Z]+)["']/g)];
    expect(partnerHits.length).toBeGreaterThanOrEqual(5);
    const distinct = new Set(partnerHits.map((m) => m[1]));
    expect(distinct.size).toBeGreaterThanOrEqual(5);
  });

  it('never uses biased HE framing יהודה ושומרון (HE-parallel of AUD-018)', () => {
    const r = findHe();
    if (!r) return;
    expect(/יהודה\s+ושומרון/.test(r.body)).toBe(false);
  });

  it('Latin brand names wrapped in <span dir="ltr"> (AUD-024)', () => {
    if (!HAS_HE_MDX) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    const hasUnwrappedBookingCom = /Booking\.com(?![^<]*<\/span>)/.test(
      raw.replace(/<span[^>]*dir=["']ltr["'][^>]*>[^<]*<\/span>/g, ''),
    );
    expect(hasUnwrappedBookingCom).toBe(false);
  });

  it('faqs frontmatter has 5-10 entries', () => {
    const r = findHe();
    if (!r) return;
    expect(Array.isArray(r.faqs)).toBe(true);
    const faqs = r.faqs ?? [];
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(faqs.length).toBeLessThanOrEqual(10);
  });
});

describe('Dead Sea HE MDX (raw source) — word-count parity', () => {
  it('HE/EN ratio in [0.85, 1.40] (AUD-007 band; mid-band 0.90-1.05 target)', () => {
    if (!HAS_EN_MDX || !HAS_HE_MDX) return;
    const enRaw = readFileSync(EN_MDX_PATH, 'utf8');
    const heRaw = readFileSync(HE_MDX_PATH, 'utf8');
    const enWords = countProseWordsEn(enRaw);
    const heWords = countProseWordsHe(heRaw);
    expect(enWords).toBeGreaterThan(0);
    expect(heWords).toBeGreaterThan(0);
    const ratio = heWords / enWords;
    expect(ratio).toBeGreaterThanOrEqual(0.85);
    expect(ratio).toBeLessThanOrEqual(1.4);
  });
});

// ============================================================
// Dead Sea sub-destinations (Task 3 — 5 EN + 5 HE pairs)
// ============================================================

const DEAD_SEA_SUB_DEST_SLUGS = [
  'dead-sea-masada',
  'dead-sea-ein-gedi',
  'dead-sea-qumran',
  'dead-sea-mineral-beach',
  'dead-sea-ein-bokek',
];

describe('Dead Sea sub-destinations (5 EN + 5 HE pairs)', () => {
  for (const slug of DEAD_SEA_SUB_DEST_SLUGS) {
    const enPath = resolve(
      process.cwd(),
      `content/en/sub-destinations/${slug}.mdx`,
    );
    const hePath = resolve(
      process.cwd(),
      `content/he/sub-destinations/${slug}.mdx`,
    );
    const hasEn = existsSync(enPath);
    const hasHe = existsSync(hePath);

    describe(slug, () => {
      it.skipIf(!hasEn)('EN MDX file exists', () => {
        expect(hasEn).toBe(true);
      });

      it.skipIf(!hasHe)('HE MDX file exists', () => {
        expect(hasHe).toBe(true);
      });

      it.skipIf(!hasEn)('EN frontmatter has parentRegion: dead-sea', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/parentRegion:\s*dead-sea/.test(raw)).toBe(true);
      });

      it.skipIf(!hasHe)('HE frontmatter has parentRegion: dead-sea', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/parentRegion:\s*dead-sea/.test(raw)).toBe(true);
      });

      it.skipIf(!hasEn)('EN word count 800-1200', () => {
        const raw = readFileSync(enPath, 'utf8');
        const words = countProseWordsEn(raw);
        expect(words).toBeGreaterThanOrEqual(800);
        expect(words).toBeLessThanOrEqual(1200);
      });

      it.skipIf(!hasEn)('EN contains >=1 AffiliateCard or WhereToStay', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/<(AffiliateCard|WhereToStay)\b/.test(raw)).toBe(true);
      });

      it.skipIf(!hasHe)('HE contains >=1 AffiliateCard or WhereToStay', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/<(AffiliateCard|WhereToStay)\b/.test(raw)).toBe(true);
      });

      it.skipIf(!hasEn || !hasHe)(
        'HE/EN word-count ratio in [0.85, 1.40]',
        () => {
          const enRaw = readFileSync(enPath, 'utf8');
          const heRaw = readFileSync(hePath, 'utf8');
          const enWords = countProseWordsEn(enRaw);
          const heWords = countProseWordsHe(heRaw);
          if (enWords === 0) return;
          const ratio = heWords / enWords;
          expect(ratio).toBeGreaterThanOrEqual(0.85);
          expect(ratio).toBeLessThanOrEqual(1.4);
        },
      );

      it.skipIf(!hasEn)(
        'EN does NOT carry religiousSiteId (Masada+Qumran are archaeological Place, not PlaceOfWorship)',
        () => {
          const raw = readFileSync(enPath, 'utf8');
          expect(/religiousSiteId:/.test(raw)).toBe(false);
        },
      );

      it.skipIf(!hasHe)('HE does NOT carry religiousSiteId', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/religiousSiteId:/.test(raw)).toBe(false);
      });

      it.skipIf(!hasEn)('EN never says "Judea and Samaria" (AUD-018)', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/judea\s+and\s+samaria/i.test(raw)).toBe(false);
      });

      it.skipIf(!hasEn)(
        'EN never says "occupied territories" (AUD-018)',
        () => {
          const raw = readFileSync(enPath, 'utf8');
          expect(/occupied\s+territories/i.test(raw)).toBe(false);
        },
      );

      it.skipIf(!hasHe)(
        'HE never uses biased framing יהודה ושומרון (AUD-018 HE)',
        () => {
          const raw = readFileSync(hePath, 'utf8');
          expect(/יהודה\s+ושומרון/.test(raw)).toBe(false);
        },
      );
    });
  }
});
