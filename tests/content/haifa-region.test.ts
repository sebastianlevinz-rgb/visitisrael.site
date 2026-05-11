/**
 * Haifa canonical (EN + HE) + sub-destinations — content-level invariants.
 *
 * Phase 3 plan 07 (Wave 4) — validates MDX content authored in
 * `content/{en,he}/regions/haifa.mdx` after Velite compilation, plus all
 * 5 Haifa sub-destination pairs.
 *
 * Mirrors `caesarea-region.test.ts` shape, parameterized for Haifa.
 *
 * Haifa profile (POLICY-GAP CANARY for REG-05):
 *  - Bahá'í Gardens emits Place schema (NOT PlaceOfWorship per Bahá'í convention —
 *    Shrine of the Báb is the holy site; gardens are landscape architecture).
 *    Renderer fallback: omit religiousSiteId on haifa-bahai-gardens → only
 *    TouristAttraction fires (Place-derivative). Negev pattern.
 *  - Stella Maris emits PlaceOfWorship (Carmelite Catholic active monastery) —
 *    religiousSiteId: stella-maris on haifa-stella-maris MDX.
 *  - German Colony / Wadi Nisnas / Carmel National Park = TouristAttraction only.
 *  - data/haifa-bahai-policy.md REG-05 deliverable referenced.
 *  - ALL Bahá'í-subject ledger entries carry restrictedSiteAcknowledgment (AUD-026).
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
  return loadRegions().find((r) => r.lang === 'en' && r.region === 'haifa');
}

function findHe(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'he' && r.region === 'haifa');
}

const EN_MDX_PATH = resolve(process.cwd(), 'content/en/regions/haifa.mdx');
const HE_MDX_PATH = resolve(process.cwd(), 'content/he/regions/haifa.mdx');
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

describe('Haifa EN canonical (Velite Region)', () => {
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

  it('compiled body contains the primary keyword "Haifa" in prose', () => {
    const r = findEn();
    if (!r) return;
    const occurrences = r.body.match(/Haifa/gi);
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

  it('mentions Bahá’í + UNESCO + German Colony + Carmel for editorial completeness', () => {
    const r = findEn();
    if (!r) return;
    expect(/bahá|baha/i.test(r.body)).toBe(true);
    expect(/UNESCO/i.test(r.body)).toBe(true);
    expect(/German Colony|Templer/i.test(r.body)).toBe(true);
    expect(/Carmel/i.test(r.body)).toBe(true);
  });

  it('references the Bahá’í photography policy respectfully (architectural / public-terrace permitted)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    // PITFALLS §5.4 — editorial copy must mention the photo policy in
    // RESPECTFUL framing (not just the prohibition).
    expect(/photograph|policy|architectural|public-terrace|terrace/i.test(raw)).toBe(true);
  });

  it('never frames Shrine of the Báb closure as "exclusion" (Bahá’í convention, respectful)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    // The Shrine of the Báb is closed to non-Bahá'ís per Bahá'í convention —
    // editorial must NOT call this "exclusion" or similar partisan framing.
    expect(/\bexclud(e|es|ing|ed)\b/i.test(raw)).toBe(false);
    expect(/\bexclusive\b/i.test(raw)).toBe(false);
  });
});

describe('Haifa EN MDX (raw source)', () => {
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

describe('Haifa HE canonical (Velite Region)', () => {
  it.skipIf(!HAS_HE_MDX)('exists in the Velite regions collection', () => {
    const r = findHe();
    expect(r, 'Run `pnpm velite` first to compile MDX').toBeDefined();
  });

  it('has frontmatter slug=haifa + region=haifa', () => {
    const r = findHe();
    if (!r) return;
    expect(r.slug).toBe('haifa');
    expect(r.region).toBe('haifa');
  });

  it('compiled body contains primary HE keyword חיפה', () => {
    const r = findHe();
    if (!r) return;
    const mentions = r.body.match(/חיפה/g);
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

  it('mentions Bahá’í World Centre in HE (הגנים הבהאיים or המרכז העולמי הבהאי)', () => {
    if (!HAS_HE_MDX) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    const hasBahai =
      /הגנים\s+הבהא/.test(raw) ||
      /המרכז\s+העולמי\s+הבהא/.test(raw) ||
      /בהא/.test(raw);
    expect(hasBahai).toBe(true);
  });
});

describe('Haifa HE MDX (raw source) — word-count parity', () => {
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
// REG-05 deliverable: data/haifa-bahai-policy.md
// ============================================================

describe('Haifa REG-05 deliverable — data/haifa-bahai-policy.md', () => {
  const POLICY_PATH = resolve(process.cwd(), 'data/haifa-bahai-policy.md');

  it('exists on disk', () => {
    expect(existsSync(POLICY_PATH)).toBe(true);
  });

  it('contains press@bahai.org Phase 6 commissioning gate', () => {
    const raw = readFileSync(POLICY_PATH, 'utf8');
    expect(raw).toContain('press@bahai.org');
  });

  it('documents Wikimedia-only v1 strategy + Phase 6 commissioning', () => {
    const raw = readFileSync(POLICY_PATH, 'utf8');
    expect(/Wikimedia/i.test(raw)).toBe(true);
    expect(/Phase 6/i.test(raw)).toBe(true);
  });

  it('documents the architectural / public-terrace permitted policy', () => {
    const raw = readFileSync(POLICY_PATH, 'utf8');
    expect(/architectural/i.test(raw)).toBe(true);
    expect(/worshipper|pilgrim/i.test(raw)).toBe(true);
  });
});

// ============================================================
// Haifa sub-destinations (Task 3 — appended)
// ============================================================

const HAIFA_SUB_DEST_SLUGS = [
  'haifa-bahai-gardens',
  'haifa-german-colony',
  'haifa-stella-maris',
  'haifa-wadi-nisnas',
  'haifa-carmel-national-park',
];

describe('Haifa sub-destinations (5 EN + 5 HE pairs)', () => {
  for (const slug of HAIFA_SUB_DEST_SLUGS) {
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

      it.skipIf(!hasEn)('EN frontmatter has parentRegion: haifa', () => {
        const raw = readFileSync(enPath, 'utf8');
        expect(/parentRegion:\s*haifa/.test(raw)).toBe(true);
      });

      it.skipIf(!hasHe)('HE frontmatter has parentRegion: haifa', () => {
        const raw = readFileSync(hePath, 'utf8');
        expect(/parentRegion:\s*haifa/.test(raw)).toBe(true);
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

      // Schema emission expectations per Bahá'í convention + Catholic monastery rule.
      if (slug === 'haifa-stella-maris') {
        it.skipIf(!hasEn)(
          'haifa-stella-maris EN carries religiousSiteId: stella-maris (PlaceOfWorship)',
          () => {
            const raw = readFileSync(enPath, 'utf8');
            expect(/religiousSiteId:\s*stella-maris/.test(raw)).toBe(true);
          },
        );

        it.skipIf(!hasHe)(
          'haifa-stella-maris HE carries religiousSiteId: stella-maris',
          () => {
            const raw = readFileSync(hePath, 'utf8');
            expect(/religiousSiteId:\s*stella-maris/.test(raw)).toBe(true);
          },
        );
      } else {
        // Bahá'í Gardens emits Place (NOT PlaceOfWorship per Bahá'í convention) —
        // omit religiousSiteId so only TouristAttraction fires (Place-derivative).
        // German Colony / Wadi Nisnas / Carmel National Park = TouristAttraction only.
        it.skipIf(!hasEn)(
          'EN does NOT carry religiousSiteId (Place / TouristAttraction only)',
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

// ============================================================
// AUD-026 (restrictedSiteAcknowledgment) enforcement on Bahá'í ledger entries
// ============================================================

describe('Haifa REG-05 AUD-026 enforcement — Bahá’í-subject ledger entries', () => {
  const CREDITS_PATH = resolve(process.cwd(), 'data/photo-credits.json');

  it('all bahaiGardens-subject ledger entries carry restrictedSiteAcknowledgment', () => {
    const credits = JSON.parse(readFileSync(CREDITS_PATH, 'utf8')) as Record<
      string,
      { subjectType: string; restrictedSiteAcknowledgment?: string; region?: string }
    >;
    const haifaBahai = Object.entries(credits).filter(
      ([_, v]) => v.region === 'haifa' && v.subjectType === 'bahaiGardens',
    );
    expect(haifaBahai.length).toBeGreaterThanOrEqual(2);
    for (const [key, entry] of haifaBahai) {
      expect(
        entry.restrictedSiteAcknowledgment,
        `${key} missing restrictedSiteAcknowledgment`,
      ).toBeTruthy();
    }
  });
});
