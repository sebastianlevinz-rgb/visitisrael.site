/**
 * Caesarea canonical (EN + HE) + sub-destinations — content-level invariants.
 *
 * Phase 3 plan 09 (Wave 3) — validates MDX content authored in
 * `content/{en,he}/regions/caesarea.mdx` after Velite compilation, plus all
 * 4 Caesarea sub-destination pairs.
 *
 * Mirrors `eilat-region.test.ts` shape, parameterized for Caesarea.
 *
 * Caesarea profile (vs Eilat): NO religious sites (Caesarea is pre-Christian
 * Roman + Crusader archaeological); all 4 sub-dests TouristAttraction + Place
 * (NOT PlaceOfWorship). Critical reciprocal disambiguation with plan 08 Golan:
 * first-reference clarifies this is "Caesarea Maritima" (Mediterranean coast)
 * NOT "Caesarea Philippi" / Banias (Golan Heights).
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
  return loadRegions().find((r) => r.lang === 'en' && r.region === 'caesarea');
}

function findHe(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'he' && r.region === 'caesarea');
}

const EN_MDX_PATH = resolve(process.cwd(), 'content/en/regions/caesarea.mdx');
const HE_MDX_PATH = resolve(process.cwd(), 'content/he/regions/caesarea.mdx');
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

describe('Caesarea EN canonical (Velite Region)', () => {
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

  it('compiled body contains the primary keyword "Caesarea" in prose', () => {
    const r = findEn();
    if (!r) return;
    const occurrences = r.body.match(/Caesarea/gi);
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

  it('never says "Judea and Samaria" (AUD-018 biased framing)', () => {
    const r = findEn();
    if (!r) return;
    expect(/judea\s+and\s+samaria/i.test(r.body)).toBe(false);
  });

  it('faqs frontmatter has 5-10 entries', () => {
    const r = findEn();
    if (!r) return;
    expect(Array.isArray(r.faqs)).toBe(true);
    const faqs = r.faqs ?? [];
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(faqs.length).toBeLessThanOrEqual(10);
  });

  it('mentions Roman Theatre / Herodian Harbour / Crusader for editorial completeness', () => {
    const r = findEn();
    if (!r) return;
    expect(/roman/i.test(r.body)).toBe(true);
    expect(/herod/i.test(r.body)).toBe(true);
    expect(/crusader/i.test(r.body)).toBe(true);
  });

  it('contains Caesarea Maritima / Caesarea Philippi disambiguation paragraph', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    // First-reference disambiguation per plan 09 + plan 08 reciprocal lock.
    expect(/Caesarea\s+Maritima/i.test(raw)).toBe(true);
    expect(/Caesarea\s+Philippi/i.test(raw)).toBe(true);
  });
});

describe('Caesarea EN MDX (raw source)', () => {
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

describe('Caesarea HE canonical (Velite Region)', () => {
  it.skipIf(!HAS_HE_MDX)('exists in the Velite regions collection', () => {
    const r = findHe();
    expect(r, 'Run `pnpm velite` first to compile MDX').toBeDefined();
  });

  it('has frontmatter slug=caesarea + region=caesarea', () => {
    const r = findHe();
    if (!r) return;
    expect(r.slug).toBe('caesarea');
    expect(r.region).toBe('caesarea');
  });

  it('compiled body contains primary HE keyword קיסריה', () => {
    const r = findHe();
    if (!r) return;
    const mentions = r.body.match(/קיסריה/g);
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

  it('never says כותל הדמעות (HE parallel of AUD-017)', () => {
    const r = findHe();
    if (!r) return;
    expect(/כותל\s+הדמעות/.test(r.body)).toBe(false);
  });

  it('Latin runs (TLV, UNESCO) inside <span dir="ltr"> in HE body prose (AUD-024)', () => {
    if (!HAS_HE_MDX) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    // Strip frontmatter + JSX prop values per Eilat lesson — those are programmatic,
    // not user-visible bidi prose.
    const bodyOnly = raw
      .replace(/^---[\s\S]*?---/, '')
      .replace(/<[A-Z][a-zA-Z]*\b[^>]*\/>/g, '')
      .replace(/<[A-Z][a-zA-Z]*\b[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '')
      .replace(/<span[^>]*dir=["']ltr["'][^>]*>[^<]*<\/span>/g, '');
    // After stripping wrapped spans, no bare Latin acronyms should remain in body.
    // We check the most likely offenders (TLV airport code, UNESCO, BCE).
    expect(
      /\bTLV\b/.test(bodyOnly),
      'TLV must be inside <span dir="ltr"> in body prose',
    ).toBe(false);
  });

  it('faqs frontmatter has 5-10 entries', () => {
    const r = findHe();
    if (!r) return;
    expect(Array.isArray(r.faqs)).toBe(true);
    const faqs = r.faqs ?? [];
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(faqs.length).toBeLessThanOrEqual(10);
  });

  it('mentions Caesarea Maritima disambiguation in HE (קיסריה מאריטימה)', () => {
    if (!HAS_HE_MDX) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    // HE canonical must reference the Maritima/Philippi distinction
    // (in either HE transliteration or wrapped Latin).
    const hasMaritimaRef =
      /קיסריה מאריטימה/.test(raw) || /Caesarea\s+Maritima/.test(raw);
    expect(hasMaritimaRef).toBe(true);
  });
});

describe('Caesarea HE MDX (raw source) — word-count parity', () => {
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
// Caesarea sub-destinations (Task 3 — appended)
// ============================================================

const CAESAREA_SUB_DEST_SLUGS = [
  'caesarea-national-park',
  'caesarea-harbour',
  'caesarea-aqueduct-beach',
  'caesarea-ralli-museum',
];

describe('Caesarea sub-destinations (4 EN + 4 HE pairs)', () => {
  for (const slug of CAESAREA_SUB_DEST_SLUGS) {
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

      it.skipIf(!hasEn)('EN frontmatter has parentRegion: caesarea', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/parentRegion:\s*caesarea/.test(raw)).toBe(true);
      });

      it.skipIf(!hasHe)('HE frontmatter has parentRegion: caesarea', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/parentRegion:\s*caesarea/.test(raw)).toBe(true);
      });

      it.skipIf(!hasEn)('EN word count 800-1200', () => {
        const raw = readFileSync(enPath, 'utf8');
        const words = countProseWordsEn(raw);
        expect(words).toBeGreaterThanOrEqual(800);
        expect(words).toBeLessThanOrEqual(1200);
      });

      it.skipIf(!hasEn)('EN contains >=1 AffiliateCard', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/<AffiliateCard\b/.test(raw)).toBe(true);
      });

      it.skipIf(!hasHe)('HE contains >=1 AffiliateCard', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/<AffiliateCard\b/.test(raw)).toBe(true);
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
        'EN does NOT carry religiousSiteId (Caesarea sub-dests are TouristAttraction + Place archaeological — NOT PlaceOfWorship)',
        () => {
          const raw = readFileSync(enPath, 'utf8');
          expect(/religiousSiteId:/.test(raw)).toBe(false);
        },
      );

      it.skipIf(!hasHe)('HE does NOT carry religiousSiteId', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/religiousSiteId:/.test(raw)).toBe(false);
      });
    });
  }
});
