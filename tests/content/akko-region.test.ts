/**
 * Akko (Acre) canonical (EN + HE) + sub-destinations — content-level invariants.
 *
 * Phase 3 plan 10 (Wave 4, parallel with Haifa + Golan) — validates MDX content
 * authored in `content/{en,he}/regions/akko.mdx` after Velite compilation, plus
 * all 5 Akko sub-destination pairs.
 *
 * Mirrors `caesarea-region.test.ts` shape, parameterized for Akko.
 *
 * Akko profile: dual-named city "Akko (Acre)" on first reference (locked in
 * CONTEXT.md; both names internationally used). UNESCO 2001 Crusader Old City
 * heritage; mixed Arab-Jewish demographics (~50K residents, ~30% Arab); layered
 * history (Phoenician → Roman → Crusader/Hospitaller+Templar → Mamluk →
 * Ottoman/Khan al-Umdan 1785 → British Mandate/Acre Prison → modern Israeli).
 *
 * Bahá'í Mansion of Bahjí (4km north of Old City) is the SECOND Bahá'í
 * pilgrimage site after Haifa Plan 07. The Bahá'í Mansion sub-dest carries
 * religiousSiteId: bahai-mansion (renderer emits Place, NOT PlaceOfWorship
 * per Bahá'í convention — Bahjí is the holy site/grave of Bahá'u'lláh).
 *
 * All 4 other Akko sub-dests (Old City, Hospitaller Knights, Templar Tunnel,
 * Khan al-Umdan) are archaeological/heritage TouristAttraction + Place
 * (no religiousSiteId).
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
  return loadRegions().find((r) => r.lang === 'en' && r.region === 'akko');
}

function findHe(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'he' && r.region === 'akko');
}

const EN_MDX_PATH = resolve(process.cwd(), 'content/en/regions/akko.mdx');
const HE_MDX_PATH = resolve(process.cwd(), 'content/he/regions/akko.mdx');
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

describe('Akko EN canonical (Velite Region)', () => {
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

  it('compiled body contains the primary keyword "Akko" in prose', () => {
    const r = findEn();
    if (!r) return;
    const occurrences = r.body.match(/Akko/gi);
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

  it('mentions Crusader / Hospitaller / Ottoman for layered-history editorial', () => {
    const r = findEn();
    if (!r) return;
    expect(/crusader/i.test(r.body)).toBe(true);
    expect(/hospitaller/i.test(r.body)).toBe(true);
    expect(/ottoman/i.test(r.body)).toBe(true);
  });

  it('mentions UNESCO inscription (2001 Old City)', () => {
    const r = findEn();
    if (!r) return;
    expect(/unesco/i.test(r.body)).toBe(true);
  });

  it('contains "Akko (Acre)" dual-naming on first reference (FEATURES §1)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    // Dual-naming locked in CONTEXT.md — "Akko (Acre)" must appear somewhere
    // in the body or title for FEATURES §1 compliance.
    const hasDualNaming =
      /Akko\s*\(\s*Acre\s*\)/i.test(raw) || /Acre\s*\(\s*Akko\s*\)/i.test(raw);
    expect(hasDualNaming).toBe(true);
  });

  it("mentions Bahá'í Mansion of Bahjí context (cross-references Haifa Plan 07)", () => {
    const r = findEn();
    if (!r) return;
    // Bahá'í Mansion is the second Bahá'í pilgrimage site after Haifa.
    expect(/bah[aá]\W?[ií]/i.test(r.body)).toBe(true);
    expect(/bahj[ií]/i.test(r.body)).toBe(true);
  });
});

describe('Akko EN MDX (raw source)', () => {
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

describe('Akko HE canonical (Velite Region)', () => {
  it.skipIf(!HAS_HE_MDX)('exists in the Velite regions collection', () => {
    const r = findHe();
    expect(r, 'Run `pnpm velite` first to compile MDX').toBeDefined();
  });

  it('has frontmatter slug=akko + region=akko', () => {
    const r = findHe();
    if (!r) return;
    expect(r.slug).toBe('akko');
    expect(r.region).toBe('akko');
  });

  it('compiled body contains primary HE keyword עכו', () => {
    const r = findHe();
    if (!r) return;
    const mentions = r.body.match(/עכו/g);
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
    const bodyOnly = raw
      .replace(/^---[\s\S]*?---/, '')
      .replace(/<[A-Z][a-zA-Z]*\b[^>]*\/>/g, '')
      .replace(/<[A-Z][a-zA-Z]*\b[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '')
      .replace(/<span[^>]*dir=["']ltr["'][^>]*>[^<]*<\/span>/g, '');
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

  it('mentions Crusader / Ottoman in HE (צלבני / עות׳מאני)', () => {
    const r = findHe();
    if (!r) return;
    expect(/צלבני/i.test(r.body)).toBe(true);
    expect(/עות['׳]?מאני/i.test(r.body)).toBe(true);
  });
});

describe('Akko HE MDX (raw source) — word-count parity', () => {
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
// Akko sub-destinations (Task 3 — appended)
// ============================================================

const AKKO_SUB_DEST_SLUGS = [
  'akko-old-city',
  'akko-hospitaller-knights',
  'akko-templar-tunnel',
  'akko-khan-al-umdan',
  'akko-bahai-mansion',
];

describe('Akko sub-destinations (5 EN + 5 HE pairs)', () => {
  for (const slug of AKKO_SUB_DEST_SLUGS) {
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

      it.skipIf(!hasEn)('EN frontmatter has parentRegion: akko', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/parentRegion:\s*akko/.test(raw)).toBe(true);
      });

      it.skipIf(!hasHe)('HE frontmatter has parentRegion: akko', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/parentRegion:\s*akko/.test(raw)).toBe(true);
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

      // Per-page schema-emission contract:
      //  - akko-bahai-mansion: religiousSiteId=bahai-mansion (renderer emits
      //    Place, NOT PlaceOfWorship per Bahá'í convention)
      //  - All 4 other Akko sub-dests: NO religiousSiteId (TouristAttraction +
      //    Place archaeological)
      if (slug === 'akko-bahai-mansion') {
        it.skipIf(!hasEn)('EN has religiousSiteId: bahai-mansion', () => {
          const raw = readFileSync(enPath, 'utf8');
          expect(/religiousSiteId:\s*bahai-mansion/.test(raw)).toBe(true);
        });

        it.skipIf(!hasHe)('HE has religiousSiteId: bahai-mansion', () => {
          const raw = readFileSync(hePath, 'utf8');
          expect(/religiousSiteId:\s*bahai-mansion/.test(raw)).toBe(true);
        });
      } else {
        it.skipIf(!hasEn)(
          'EN does NOT carry religiousSiteId (archaeological TouristAttraction + Place)',
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
