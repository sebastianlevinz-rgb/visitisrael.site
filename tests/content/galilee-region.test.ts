/**
 * Galilee canonical (EN + HE) — content-level invariants.
 *
 * Phase 3 plan 03 Task 2 + Task 3: validates MDX content authored in
 * `content/{en,he}/regions/galilee.mdx` and 6 sub-destinations
 * `galilee-{tiberias,capernaum,mount-of-beatitudes,magdala,yardenit,mount-arbel}`.
 *
 * Mirrors `tel-aviv-region.test.ts` shape parameterized for Galilee.
 *
 * Galilee-SPECIFIC invariants:
 *   - Sea of Galilee preferred over "Lake Tiberias" in EN prose
 *   - Christian-pilgrimage editorial tone (ecumenical — acknowledges Catholic +
 *     Greek Orthodox + Protestant traditions where relevant)
 *   - 3 sub-dests (capernaum, mount-of-beatitudes, yardenit) MUST carry
 *     religiousSiteId frontmatter (triggers PlaceOfWorship schema emission)
 *   - 3 sub-dests (tiberias, magdala, mount-arbel) MUST NOT carry religiousSiteId
 *     (TouristAttraction / Place only)
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const REGIONS_JSON = resolve(process.cwd(), '.velite/regions.json');
const SUB_DEST_JSON = resolve(process.cwd(), '.velite/subDestinations.json');

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

interface SubDestEntry {
  lang: string;
  region: string;
  parentRegion: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  body: string;
  religiousSiteId?: string;
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

function loadSubDestinations(): SubDestEntry[] {
  if (!existsSync(SUB_DEST_JSON)) return [];
  try {
    return JSON.parse(readFileSync(SUB_DEST_JSON, 'utf8')) as SubDestEntry[];
  } catch {
    return [];
  }
}

function findEn(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'en' && r.region === 'galilee');
}

function findHe(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'he' && r.region === 'galilee');
}

const EN_MDX_PATH = resolve(process.cwd(), 'content/en/regions/galilee.mdx');
const HE_MDX_PATH = resolve(process.cwd(), 'content/he/regions/galilee.mdx');
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

describe('Galilee EN canonical (Velite Region)', () => {
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

  it('compiled body mentions "Sea of Galilee" or "Galilee" >= 5 times', () => {
    const r = findEn();
    if (!r) return;
    const occurrences = r.body.match(/Galilee/gi);
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
});

describe('Galilee EN MDX (raw source)', () => {
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

  it('mentions Christian-pilgrimage sites Capernaum + Mount of Beatitudes', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    expect(/Capernaum/.test(raw)).toBe(true);
    expect(/Mount of Beatitudes/.test(raw)).toBe(true);
  });
});

describe('Galilee HE canonical (Velite Region)', () => {
  it.skipIf(!HAS_HE_MDX)('exists in the Velite regions collection', () => {
    const r = findHe();
    expect(r, 'Run `pnpm velite` first to compile MDX').toBeDefined();
  });

  it('has frontmatter slug=galilee + region=galilee', () => {
    const r = findHe();
    if (!r) return;
    expect(r.slug).toBe('galilee');
    expect(r.region).toBe('galilee');
  });

  it('compiled body contains primary HE entity "גליל" mention density >=5', () => {
    const r = findHe();
    if (!r) return;
    const mentions = r.body.match(/גליל|כנרת/g);
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

describe('Galilee HE MDX (raw source) — word-count parity', () => {
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
// Galilee sub-destinations (Task 3 — same file, paired EN+HE)
// ============================================================

const GALILEE_SUB_DEST_SLUGS = [
  'galilee-tiberias',
  'galilee-capernaum',
  'galilee-mount-of-beatitudes',
  'galilee-magdala',
  'galilee-yardenit',
  'galilee-mount-arbel',
];

// Sub-dests that MUST carry religiousSiteId frontmatter (PlaceOfWorship schema)
const PLACE_OF_WORSHIP_SUB_DESTS = new Set([
  'galilee-capernaum',
  'galilee-mount-of-beatitudes',
  'galilee-yardenit',
]);

describe('Galilee sub-destinations (6 EN + 6 HE pairs)', () => {
  for (const slug of GALILEE_SUB_DEST_SLUGS) {
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
    const isPlaceOfWorship = PLACE_OF_WORSHIP_SUB_DESTS.has(slug);

    describe(slug, () => {
      it.skipIf(!hasEn)('EN MDX file exists', () => {
        expect(hasEn).toBe(true);
      });

      it.skipIf(!hasHe)('HE MDX file exists', () => {
        expect(hasHe).toBe(true);
      });

      it.skipIf(!hasEn)('EN frontmatter has parentRegion: galilee', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/parentRegion:\s*galilee/.test(raw)).toBe(true);
      });

      it.skipIf(!hasHe)('HE frontmatter has parentRegion: galilee', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/parentRegion:\s*galilee/.test(raw)).toBe(true);
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

      if (isPlaceOfWorship) {
        it.skipIf(!hasEn)(
          'EN carries religiousSiteId (Christian-pilgrimage site → PlaceOfWorship)',
          () => {
            const raw = readFileSync(enPath, 'utf8');
            expect(/religiousSiteId:/.test(raw)).toBe(true);
          },
        );

        it.skipIf(!hasHe)('HE carries religiousSiteId', () => {
          const raw = readFileSync(hePath, 'utf8');
          expect(/religiousSiteId:/.test(raw)).toBe(true);
        });
      } else {
        it.skipIf(!hasEn)(
          'EN does NOT carry religiousSiteId (TouristAttraction / Place only)',
          () => {
            const raw = readFileSync(enPath, 'utf8');
            expect(/religiousSiteId:/.test(raw)).toBe(false);
          },
        );

        it.skipIf(!hasHe)('HE does NOT carry religiousSiteId', () => {
          const raw = readFileSync(hePath, 'utf8');
          expect(/religiousSiteId:/.test(raw)).toBe(false);
        });
      }
    });
  }
});
