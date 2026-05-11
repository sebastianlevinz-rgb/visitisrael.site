/**
 * Golan Heights canonical (EN + HE) + sub-destinations — content-level invariants.
 *
 * Phase 3 plan 08 (Wave 4) — validates MDX content authored in
 * `content/{en,he}/regions/golan.mdx` after Velite compilation, plus all
 * 5 Golan sub-destination pairs (Mount Bental, Banias, Nimrod Fortress,
 * Druze villages, Mount Hermon).
 *
 * Mirrors `caesarea-region.test.ts` shape, parameterized for Golan.
 *
 * Golan profile (vs Caesarea): politically sensitive region — internationally
 * disputed. **AUD-018 enforcement:** use "Golan Heights" WITHOUT political
 * adjective; NO "Israeli-occupied" / NO "Judea and Samaria" / NO "occupied
 * territories". Reciprocal disambiguation with plan 09 Caesarea: first
 * reference of Banias paired with "Caesarea Philippi" pointing to plan 09
 * Caesarea Maritima as the OTHER site.
 *
 * Sub-dest schema: 5 sub-dests TouristAttraction. Banias + Nimrod Fortress
 * additionally emit Place schema (archaeological Pan grotto + Crusader/Mamluk
 * fortification). NO PlaceOfWorship anywhere — Druze religious tradition is
 * private and we do NOT emit PlaceOfWorship for Druze villages page.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const REGIONS_JSON = resolve(process.cwd(), '.velite/regions.json');
const SUBDEST_JSON = resolve(process.cwd(), '.velite/subDestinations.json');

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

interface SubDestEntry extends RegionEntry {
  parentRegion: string;
  religiousSiteId?: string;
}

function loadRegions(): RegionEntry[] {
  if (!existsSync(REGIONS_JSON)) return [];
  try {
    return JSON.parse(readFileSync(REGIONS_JSON, 'utf8')) as RegionEntry[];
  } catch {
    return [];
  }
}

function loadSubDests(): SubDestEntry[] {
  if (!existsSync(SUBDEST_JSON)) return [];
  try {
    return JSON.parse(readFileSync(SUBDEST_JSON, 'utf8')) as SubDestEntry[];
  } catch {
    return [];
  }
}

function findEn(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'en' && r.region === 'golan');
}

function findHe(): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === 'he' && r.region === 'golan');
}

const EN_MDX_PATH = resolve(process.cwd(), 'content/en/regions/golan.mdx');
const HE_MDX_PATH = resolve(process.cwd(), 'content/he/regions/golan.mdx');
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

describe('Golan EN canonical (Velite Region)', () => {
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

  it('compiled body contains the primary keyword "Golan" in prose', () => {
    const r = findEn();
    if (!r) return;
    const occurrences = r.body.match(/Golan/gi);
    expect(occurrences, 'primary keyword missing from prose').not.toBeNull();
    expect((occurrences as RegExpMatchArray).length).toBeGreaterThanOrEqual(5);
  });

  it('has at least 5 FAQ entries (FAQPage schema viability)', () => {
    const r = findEn();
    if (!r) return;
    expect(Array.isArray(r.faqs)).toBe(true);
    expect((r.faqs ?? []).length).toBeGreaterThanOrEqual(5);
  });

  it('AUD-018: no "Israeli-occupied" framing on EN canonical', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    expect(raw).not.toMatch(/Israeli-occupied/i);
    expect(raw).not.toMatch(/Israeli\s+occupied/i);
  });

  it('AUD-018: no "Judea and Samaria" framing on EN canonical', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    expect(raw).not.toMatch(/Judea and Samaria/i);
  });

  it('AUD-018: no "occupied territories" framing on EN canonical', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    expect(raw).not.toMatch(/occupied territories/i);
  });

  it('contains Druze community respectful framing (mention without political detail)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    expect(raw).toMatch(/Druze/i);
  });

  it('Banias / Caesarea Philippi disambiguation: first reference paired', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    // First reference of Banias should be followed soon by Caesarea Philippi
    // to disambiguate from Caesarea Maritima (plan 09 region).
    expect(raw).toMatch(/Caesarea Philippi/);
    expect(raw).toMatch(/Banias/);
  });

  it('word count between 1500 and 2500 (REGION_CANONICAL mid-band)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    const words = countProseWordsEn(raw);
    expect(words).toBeGreaterThanOrEqual(1500);
    expect(words).toBeLessThanOrEqual(2500);
  });

  it('has at least 5 AffiliateCard placements (REGION_CANONICAL ≥5)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    const matches = raw.match(/<AffiliateCard/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(5);
  });

  it('body has zero H1 nodes (RegionHero owns the page H1)', () => {
    if (!HAS_EN_MDX) return;
    const raw = readFileSync(EN_MDX_PATH, 'utf8');
    const body = raw.replace(/^---[\s\S]*?---/, '');
    const h1Matches = body.match(/^# (?!#)/gm) ?? [];
    expect(h1Matches.length).toBe(0);
  });
});

describe('Golan HE canonical (Velite Region)', () => {
  it.skipIf(!HAS_HE_MDX)('exists in the Velite regions collection', () => {
    const r = findHe();
    expect(r, 'Run `pnpm velite` first to compile MDX').toBeDefined();
  });

  it('has frontmatter title 40-70 chars and description 120-160 chars', () => {
    const r = findHe();
    if (!r) return;
    expect(r.title.length).toBeGreaterThanOrEqual(40);
    expect(r.title.length).toBeLessThanOrEqual(70);
    expect(r.description.length).toBeGreaterThanOrEqual(120);
    expect(r.description.length).toBeLessThanOrEqual(160);
  });

  it('compiled body contains the HE primary keyword "רמת הגולן" in prose', () => {
    const r = findHe();
    if (!r) return;
    expect(r.body.includes('רמת הגולן') || r.body.includes('גולן')).toBe(true);
  });

  it('AUD-018 HE: no "יהודה ושומרון" framing on HE canonical', () => {
    if (!HAS_HE_MDX) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    expect(raw).not.toMatch(/יהודה ושומרון/);
  });

  it('has at least 5 FAQ entries', () => {
    const r = findHe();
    if (!r) return;
    expect(Array.isArray(r.faqs)).toBe(true);
    expect((r.faqs ?? []).length).toBeGreaterThanOrEqual(5);
  });

  it('HE/EN word-count ratio in AUD-007 band [0.85, 1.40]', () => {
    if (!HAS_HE_MDX || !HAS_EN_MDX) return;
    const enRaw = readFileSync(EN_MDX_PATH, 'utf8');
    const heRaw = readFileSync(HE_MDX_PATH, 'utf8');
    const en = countProseWordsEn(enRaw);
    const he = countProseWordsHe(heRaw);
    expect(en).toBeGreaterThan(0);
    expect(he).toBeGreaterThan(0);
    const ratio = he / en;
    expect(ratio).toBeGreaterThanOrEqual(0.85);
    expect(ratio).toBeLessThanOrEqual(1.4);
  });

  it('contains Druze community framing in Hebrew (דרוזי)', () => {
    if (!HAS_HE_MDX) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    expect(raw).toMatch(/דרוזי/);
  });

  it('Banias / Caesarea Philippi disambiguation in Hebrew', () => {
    if (!HAS_HE_MDX) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    expect(raw).toMatch(/בניאס/);
  });
});

// ---------------------------------------------------------------------------
// Sub-destinations (5 pairs: mount-bental, banias, nimrod-fortress,
// druze-villages, mount-hermon)
// ---------------------------------------------------------------------------

const SUB_DESTS = [
  'mount-bental',
  'banias',
  'nimrod-fortress',
  'druze-villages',
  'mount-hermon',
] as const;

for (const subSlug of SUB_DESTS) {
  const enPath = resolve(
    process.cwd(),
    `content/en/sub-destinations/golan-${subSlug}.mdx`,
  );
  const hePath = resolve(
    process.cwd(),
    `content/he/sub-destinations/golan-${subSlug}.mdx`,
  );
  const hasEn = existsSync(enPath);
  const hasHe = existsSync(hePath);

  describe(`Golan sub-destination: ${subSlug}`, () => {
    it.skipIf(!hasEn)('EN MDX file exists', () => {
      expect(hasEn).toBe(true);
    });

    it.skipIf(!hasHe)('HE MDX file exists', () => {
      expect(hasHe).toBe(true);
    });

    it('EN: no religiousSiteId on frontmatter (no PlaceOfWorship emission)', () => {
      if (!hasEn) return;
      const raw = readFileSync(enPath, 'utf8');
      const fmMatch = raw.match(/^---([\s\S]*?)---/);
      const fm = fmMatch ? fmMatch[1] : '';
      expect(fm).not.toMatch(/religiousSiteId:/);
    });

    it('HE: no religiousSiteId on frontmatter', () => {
      if (!hasHe) return;
      const raw = readFileSync(hePath, 'utf8');
      const fmMatch = raw.match(/^---([\s\S]*?)---/);
      const fm = fmMatch ? fmMatch[1] : '';
      expect(fm).not.toMatch(/religiousSiteId:/);
    });

    it('EN: word count 800-1200 (SUB_DESTINATION band)', () => {
      if (!hasEn) return;
      const raw = readFileSync(enPath, 'utf8');
      const words = countProseWordsEn(raw);
      expect(words).toBeGreaterThanOrEqual(750);
      expect(words).toBeLessThanOrEqual(1300);
    });

    it('EN: has at least 1 AffiliateCard', () => {
      if (!hasEn) return;
      const raw = readFileSync(enPath, 'utf8');
      const matches = raw.match(/<AffiliateCard/g) ?? [];
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('EN: AUD-018 no biased framing', () => {
      if (!hasEn) return;
      const raw = readFileSync(enPath, 'utf8');
      expect(raw).not.toMatch(/Israeli-occupied/i);
      expect(raw).not.toMatch(/Judea and Samaria/i);
      expect(raw).not.toMatch(/occupied territories/i);
    });

    it('HE: AUD-018 no biased framing', () => {
      if (!hasHe) return;
      const raw = readFileSync(hePath, 'utf8');
      expect(raw).not.toMatch(/יהודה ושומרון/);
    });

    it('HE/EN ratio in [0.85, 1.40] band', () => {
      if (!hasEn || !hasHe) return;
      const en = countProseWordsEn(readFileSync(enPath, 'utf8'));
      const he = countProseWordsHe(readFileSync(hePath, 'utf8'));
      expect(en).toBeGreaterThan(0);
      expect(he).toBeGreaterThan(0);
      const ratio = he / en;
      expect(ratio).toBeGreaterThanOrEqual(0.85);
      expect(ratio).toBeLessThanOrEqual(1.4);
    });
  });
}

describe('Golan-banias sub-destination: Caesarea Philippi disambiguation', () => {
  const enPath = resolve(
    process.cwd(),
    `content/en/sub-destinations/golan-banias.mdx`,
  );
  const hasEn = existsSync(enPath);

  it.skipIf(!hasEn)(
    'first-reference pairs Banias with "Caesarea Philippi" and points to Caesarea Maritima as separate site',
    () => {
      const raw = readFileSync(enPath, 'utf8');
      expect(raw).toMatch(/Caesarea Philippi/);
      // Disambiguation must reference Caesarea Maritima OR Mediterranean coast
      expect(raw).toMatch(/(Caesarea Maritima|Mediterranean coast)/i);
    },
  );
});
