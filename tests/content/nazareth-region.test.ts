/**
 * Nazareth canonical (EN + HE) — content-level invariants.
 *
 * Phase 3 plan 06 Task 2 + Task 3: validates MDX content authored in
 * `content/{en,he}/regions/nazareth.mdx` and 4 sub-destinations
 * `nazareth-{basilica-of-the-annunciation,old-city,marys-well,mount-of-precipice}`.
 *
 * Mirrors `galilee-region.test.ts` shape parameterized for Nazareth.
 *
 * Nazareth-SPECIFIC invariants:
 *   - Ecumenical Christian-pilgrimage editorial tone (Catholic Franciscan
 *     custody at Basilica + Greek Orthodox at Mary's Well) — single-tradition
 *     framing is an anti-pattern per Phase 3 lesson #2 from plan 03 Galilee
 *   - Largest Arab city in Israel framing — factual + respectful (no political
 *     coding); avoid biased framing per AUD-018
 *   - 2 sub-dests (basilica-of-the-annunciation, marys-well) MUST carry
 *     religiousSiteId frontmatter (triggers PlaceOfWorship schema emission)
 *   - 2 sub-dests (old-city, mount-of-precipice) MUST NOT carry religiousSiteId
 *     (TouristAttraction / Place only — Mount of Precipice is outdoor cliff)
 *   - Nazareth has NO contested-compound paired naming (AUD-019 n/a for
 *     Nazareth itself; AUD-017 + AUD-018 still apply globally)
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
  return loadRegions().find((r) => r.lang === 'en' && r.region === 'nazareth');
}

function findHe(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'he' && r.region === 'nazareth');
}

const EN_MDX_PATH = resolve(process.cwd(), 'content/en/regions/nazareth.mdx');
const HE_MDX_PATH = resolve(process.cwd(), 'content/he/regions/nazareth.mdx');
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

describe('Nazareth EN canonical (Velite Region)', () => {
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

  it('compiled body mentions "Nazareth" >= 5 times', () => {
    const r = findEn();
    if (!r) return;
    const occurrences = r.body.match(/Nazareth/gi);
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

describe('Nazareth EN MDX (raw source)', () => {
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

  it('mentions Basilica of the Annunciation + Mount of Precipice', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    expect(/Basilica of the Annunciation/.test(raw)).toBe(true);
    expect(/Mount of Precipice/.test(raw)).toBe(true);
  });

  it('uses ecumenical Christian framing — names Catholic AND Greek Orthodox', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    expect(/Catholic|Franciscan/i.test(raw)).toBe(true);
    expect(/Greek Orthodox/i.test(raw)).toBe(true);
  });

  it('Arab-Israeli framing is factual + respectful (no biased phrasing)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    // Factual phrasing required
    expect(/largest Arab|Arab-Israeli|Arab city/i.test(raw)).toBe(true);
    // Forbidden politicized phrasings (AUD-018 biased framing)
    expect(/Israeli Arab town|occupied Arab/i.test(raw)).toBe(false);
  });
});

describe('Nazareth HE canonical (Velite Region)', () => {
  it.skipIf(!HAS_HE_MDX)('exists in the Velite regions collection', () => {
    const r = findHe();
    expect(r, 'Run `pnpm velite` first to compile MDX').toBeDefined();
  });

  it('has frontmatter slug=nazareth + region=nazareth', () => {
    const r = findHe();
    if (!r) return;
    expect(r.slug).toBe('nazareth');
    expect(r.region).toBe('nazareth');
  });

  it('compiled body contains primary HE entity "נצרת" mention density >=5', () => {
    const r = findHe();
    if (!r) return;
    const mentions = r.body.match(/נצרת/g);
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

  it('mentions בזיליקת הבשורה (Basilica) + הר הקפיצה (Mount of Precipice)', () => {
    if (!HAS_HE_MDX) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    expect(/בזיליקת הבשורה|כנסיית הבשורה/.test(raw)).toBe(true);
    expect(/הר הקפיצה/.test(raw)).toBe(true);
  });
});

describe('Nazareth HE MDX (raw source) — word-count parity', () => {
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
// Nazareth sub-destinations (Task 3 — same file, paired EN+HE)
// ============================================================

const NAZARETH_SUB_DEST_SLUGS = [
  'nazareth-basilica-of-the-annunciation',
  'nazareth-old-city',
  'nazareth-marys-well',
  'nazareth-mount-of-precipice',
];

// Sub-dests that MUST carry religiousSiteId frontmatter (PlaceOfWorship schema)
const PLACE_OF_WORSHIP_SUB_DESTS = new Set([
  'nazareth-basilica-of-the-annunciation',
  'nazareth-marys-well',
]);

describe('Nazareth sub-destinations (4 EN + 4 HE pairs)', () => {
  for (const slug of NAZARETH_SUB_DEST_SLUGS) {
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

      it.skipIf(!hasEn)('EN frontmatter has parentRegion: nazareth', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/parentRegion:\s*nazareth/.test(raw)).toBe(true);
      });

      it.skipIf(!hasHe)('HE frontmatter has parentRegion: nazareth', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/parentRegion:\s*nazareth/.test(raw)).toBe(true);
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
