/**
 * Jerusalem HE canonical — content-level invariants.
 *
 * Phase 2 plan 02-02: validates the native Hebrew rewrite at
 * `content/he/regions/jerusalem.mdx` after Velite compilation.
 *
 * Behavior assertions (per PLAN §<behavior>):
 *   1. exists in Velite regions collection (lang=he, region=jerusalem)
 *   2. frontmatter title HE-width-aware (40-70 chars; tighter than EN's
 *      50-60 to account for denser HE characters) + description 120-160 chars
 *   3. body contains the primary HE keyword "מה לעשות בירושלים"
 *   4. body word count within 0.85-1.40 of EN canonical word count (AUD-007)
 *   5. paired religious naming — first reference of הר הבית within 300 chars
 *      of אל-חרם א-שריף (HE-parallel of AUD-019)
 *   6. body contains הכותל המערבי; does NOT contain כותל הדמעות
 *   7. body has 8-12 H2 sections (matches HE template)
 *   8. >=5 AffiliateCard partner mix as EN (Booking + tour aggregator
 *      Civitatis/Viator/GYG + Skyscanner + RentalCars/DiscoverCars + SafetyWing)
 *   9. faqs frontmatter has 5-10 entries
 *  10. ktiv maleh consistency — pnpm qa:hebrew-content exits 0
 *      (verified separately as a pnpm script; here we pin that the page
 *      itself does not introduce the forbidden כותל הדמעות string)
 *
 * The Velite collection is consulted directly so we test the compiled
 * artifact (frontmatter + body code string) not the raw .mdx source.
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
  const raw = readFileSync(REGIONS_JSON, 'utf8');
  try {
    return JSON.parse(raw) as RegionEntry[];
  } catch {
    return [];
  }
}

function findRegion(lang: string, region: string): RegionEntry | undefined {
  return loadRegions().find((r) => r.lang === lang && r.region === region);
}

// HE MDX lands during Task 2 of plan 02-02; until then, the file does not
// exist and skip-if-absent keeps the Vitest run green for the per-task commit
// pattern (matches the EN canonical Wave-0 skip pattern from plan 02-01).
const HE_MDX_PATH = resolve(process.cwd(), 'content/he/regions/jerusalem.mdx');
const HAS_HE_MDX = existsSync(HE_MDX_PATH);

describe('Jerusalem HE canonical (Velite Region)', () => {
  it.skipIf(!HAS_HE_MDX)('exists in the Velite regions collection', () => {
    const r = findRegion('he', 'jerusalem');
    expect(r, 'Run `pnpm velite` first to compile HE MDX').toBeDefined();
  });

  it('has frontmatter title 40-70 chars and description 120-160 chars', () => {
    const r = findRegion('he', 'jerusalem');
    if (!r) return;
    expect(r.title.length).toBeGreaterThanOrEqual(40);
    expect(r.title.length).toBeLessThanOrEqual(70);
    expect(r.description.length).toBeGreaterThanOrEqual(120);
    expect(r.description.length).toBeLessThanOrEqual(160);
  });

  it('compiled body contains the primary HE keyword "מה לעשות בירושלים"', () => {
    const r = findRegion('he', 'jerusalem');
    if (!r) return;
    // Page-level H1 is owned by RegionHero (from frontmatter title); body
    // surfaces the primary keyword in prose so HE SEO keyword density still
    // serves the canonical.
    const occurrences = r.body.match(/מה לעשות בירושלים/g);
    expect(occurrences, 'primary HE keyword missing from prose').not.toBeNull();
    expect((occurrences as RegExpMatchArray).length).toBeGreaterThanOrEqual(1);
  });

  it('compiled body has NO H1 (page H1 is owned by RegionHero)', () => {
    const r = findRegion('he', 'jerusalem');
    if (!r) return;
    // Mirror of the EN invariant: AUD-008 single-H1 fires across both
    // locales. Velite minifies to `.h1[ ,)` accessor pattern.
    const matches = r.body.match(/\.h1[\s,)]/g) ?? [];
    expect(matches.length).toBe(0);
  });

  it('compiled body declares 8-12 H2 sections', () => {
    const r = findRegion('he', 'jerusalem');
    if (!r) return;
    const matches = r.body.match(/\.h2[\s,)]/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(8);
    expect(matches.length).toBeLessThanOrEqual(12);
  });

  it('contains >=5 AffiliateCard placements across >=5 distinct partners', () => {
    const r = findRegion('he', 'jerusalem');
    if (!r) return;
    const partnerHits = [...r.body.matchAll(/partner:\s*["']([a-zA-Z]+)["']/g)];
    expect(partnerHits.length).toBeGreaterThanOrEqual(5);
    const distinct = new Set(partnerHits.map((m) => m[1]));
    expect(distinct.size).toBeGreaterThanOrEqual(5);
  });

  it('uses הכותל המערבי and never כותל הדמעות', () => {
    const r = findRegion('he', 'jerusalem');
    if (!r) return;
    expect(/כותל\s+הדמעות/.test(r.body)).toBe(false);
    expect(r.body.includes('הכותל המערבי')).toBe(true);
  });

  it('pairs "הר הבית" with "אל-חרם א-שריף" within 300 chars on first reference', () => {
    const r = findRegion('he', 'jerusalem');
    if (!r) return;
    const idx = r.body.indexOf('הר הבית');
    if (idx === -1) return; // Not mentioned → vacuously paired.
    const windowText = r.body.slice(idx, idx + 300);
    // Accept both the dictionary-canonical "אל-חרם א-שריף" and the looser
    // "חראם א-שריף" common transliteration so editorial register isn't pinned
    // to one orthography.
    const paired =
      windowText.includes('אל-חרם א-שריף') ||
      windowText.includes('חראם א-שריף');
    expect(paired).toBe(true);
  });

  it('faqs frontmatter has 5-10 entries', () => {
    const r = findRegion('he', 'jerusalem');
    if (!r) return;
    expect(Array.isArray(r.faqs)).toBe(true);
    const faqs = r.faqs ?? [];
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(faqs.length).toBeLessThanOrEqual(10);
  });
});

describe('Jerusalem HE / EN word-count parity (AUD-007 0.85-1.40)', () => {
  it('HE body word count is between 0.85 and 1.40 of EN body word count', () => {
    const he = findRegion('he', 'jerusalem');
    const en = findRegion('en', 'jerusalem');
    if (!he || !en) return;

    // Count words from compiled body — Hebrew or Latin letter runs ≥2.
    const countWords = (s: string): number =>
      (s.match(/[A-Za-z֐-׿]{2,}/g) ?? []).length;
    const heWords = countWords(he.body);
    const enWords = countWords(en.body);
    expect(heWords).toBeGreaterThan(0);
    expect(enWords).toBeGreaterThan(0);
    const ratio = heWords / enWords;
    expect(
      ratio,
      `HE/EN word-count ratio ${ratio.toFixed(2)} outside [0.85, 1.40]; HE=${heWords}, EN=${enWords}`,
    ).toBeGreaterThanOrEqual(0.85);
    expect(ratio).toBeLessThanOrEqual(1.4);
  });
});

describe('Jerusalem HE MDX (raw source, AffiliateDisclosure placement)', () => {
  it.skipIf(!HAS_HE_MDX)('raw HE MDX file exists', () => {
    expect(existsSync(HE_MDX_PATH)).toBe(true);
  });

  it('does NOT inline <AffiliateDisclosure> (renderer wires it once)', () => {
    if (!existsSync(HE_MDX_PATH)) return;
    const raw = readFileSync(HE_MDX_PATH, 'utf8');
    expect(/<AffiliateDisclosure\b/.test(raw)).toBe(false);
  });
});
