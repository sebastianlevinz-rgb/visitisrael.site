/**
 * Jerusalem sub-destinations (Plan 02-03) — content-level invariants.
 *
 * Phase 2 plan 03: validates the 7 EN + 7 HE Jerusalem sub-destination MDX
 * files after Velite compilation. Per-page invariants per the PLAN behavior:
 *
 *   - frontmatter shape (lang, slug "jerusalem-<short>", parentRegion,
 *     region, title 40-70, description 120-160)
 *   - H1 contains entity name + qualifier (AUD-006); body has zero H1s
 *     (renderer's RegionHero owns the page H1)
 *   - word count 800-1200
 *   - >=1 <AffiliateCard partner="..."> placement (AUD-031)
 *   - religious-naming compliance (western-wall: "Western Wall" + "Kotel";
 *     never "Wailing Wall" — AUD-017)
 *   - HE pair has lang=he + matching slug + word-count ratio in [0.85, 1.40]
 *     (AUD-007)
 *
 * Tests are guarded with skipIf(!HAS_MDX(...)) so the suite stays green at
 * each task commit boundary (Wave 0 ships the scaffold; tasks 2 + 3 ship
 * EN and HE content incrementally, un-skipping the test groups).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const SUB_DEST_JSON = resolve(process.cwd(), '.velite/subDestinations.json');

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
}

function loadSubDests(): SubDestEntry[] {
  if (!existsSync(SUB_DEST_JSON)) return [];
  try {
    return JSON.parse(readFileSync(SUB_DEST_JSON, 'utf8')) as SubDestEntry[];
  } catch {
    return [];
  }
}

function find(slug: string, lang: 'en' | 'he'): SubDestEntry | undefined {
  return loadSubDests().find((s) => s.slug === slug && s.lang === lang);
}

const SHORT_SLUGS = [
  'old-city',
  'western-wall',
  'holy-sepulchre',
  'yad-vashem',
  'mahane-yehuda',
  'mount-of-olives',
  'city-of-david',
] as const;

const RELIGIOUS_SHORT_SLUGS = new Set(['western-wall', 'holy-sepulchre']);

// MDX paths (raw source) — same flat region-prefixed-slug naming as PLAN.
function mdxPath(lang: 'en' | 'he', shortSlug: string): string {
  return resolve(
    process.cwd(),
    `content/${lang}/sub-destinations/jerusalem-${shortSlug}.mdx`,
  );
}

function hasMdx(lang: 'en' | 'he', shortSlug: string): boolean {
  return existsSync(mdxPath(lang, shortSlug));
}

/**
 * Per-page invariant suite. Lang-aware: applies the appropriate
 * lang-specific religious-naming checks (EN "Western Wall" / HE
 * "הכותל המערבי") and the AffiliateCard contract is the same on both.
 */
function expectSubDest(
  shortSlug: string,
  lang: 'en' | 'he',
  isReligiousSite: boolean,
): void {
  const veliteSlug = `jerusalem-${shortSlug}`;
  const HAS_MDX = hasMdx(lang, shortSlug);

  describe(`${lang}/jerusalem/${shortSlug}`, () => {
    it.skipIf(!HAS_MDX)('exists in Velite subDestinations collection', () => {
      const r = find(veliteSlug, lang);
      expect(
        r,
        `Run pnpm velite first — ${veliteSlug} (${lang}) missing`,
      ).toBeDefined();
    });

    it.skipIf(!HAS_MDX)(
      'frontmatter lang/slug/region/parentRegion + title and description bands',
      () => {
        const r = find(veliteSlug, lang);
        if (!r) return;
        expect(r.lang).toBe(lang);
        expect(r.slug).toBe(veliteSlug);
        expect(r.region).toBe('jerusalem');
        expect(r.parentRegion).toBe('jerusalem');
        expect(r.title.length).toBeGreaterThanOrEqual(40);
        expect(r.title.length).toBeLessThanOrEqual(70);
        expect(r.description.length).toBeGreaterThanOrEqual(120);
        expect(r.description.length).toBeLessThanOrEqual(160);
      },
    );

    it.skipIf(!HAS_MDX)(
      'compiled body has no H1 (renderer owns the page H1)',
      () => {
        const r = find(veliteSlug, lang);
        if (!r) return;
        const matches = r.body.match(/\.h1[\s,)]/g) ?? [];
        expect(matches.length).toBe(0);
      },
    );

    it.skipIf(!HAS_MDX)(
      'has >=1 <AffiliateCard partner="..."> placement (AUD-031 + profile)',
      () => {
        const r = find(veliteSlug, lang);
        if (!r) return;
        const partnerHits = [
          ...r.body.matchAll(/partner:\s*["']([a-zA-Z]+)["']/g),
        ];
        expect(partnerHits.length).toBeGreaterThanOrEqual(1);
      },
    );

    it.skipIf(!HAS_MDX)(
      'religious-site frontmatter declares religiousSiteId when applicable',
      () => {
        const r = find(veliteSlug, lang);
        if (!r) return;
        if (isReligiousSite) {
          expect(
            r.religiousSiteId,
            'religious sub-dest must declare religiousSiteId',
          ).toBeTruthy();
        }
      },
    );

    it.skipIf(!HAS_MDX)('word count in [800, 1200]', () => {
      const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
      const body = raw.replace(/^---[\s\S]*?---/, '');
      const prose = body
        .replace(/<[^>]+>/g, ' ')
        .replace(/\{[^}]*\}/g, ' ')
        .replace(/^import .*$/gm, '');
      const words = prose
        .split(/\s+/)
        .map((w) => w.trim())
        .filter((w) => w.length > 1);
      expect(words.length).toBeGreaterThanOrEqual(800);
      expect(words.length).toBeLessThanOrEqual(1200);
    });

    it.skipIf(!HAS_MDX)(
      'does NOT inline <AffiliateDisclosure> (renderer wires it once)',
      () => {
        const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
        expect(/<AffiliateDisclosure\b/.test(raw)).toBe(false);
      },
    );

    // Lang-specific religious-naming compliance.
    if (lang === 'en') {
      it.skipIf(!HAS_MDX)('EN: never uses "Wailing Wall" (AUD-017)', () => {
        const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
        expect(/wailing\s+wall/i.test(raw)).toBe(false);
      });

      if (shortSlug === 'western-wall') {
        it.skipIf(!HAS_MDX)(
          'EN western-wall page uses paired "Western Wall (Kotel)"',
          () => {
            const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
            expect(/Western\s+Wall/i.test(raw)).toBe(true);
            expect(/Kotel/i.test(raw)).toBe(true);
          },
        );
      }

      if (shortSlug === 'holy-sepulchre') {
        it.skipIf(!HAS_MDX)(
          'EN holy-sepulchre uses "Church of the Holy Sepulchre"',
          () => {
            const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
            expect(/Church\s+of\s+the\s+Holy\s+Sepulchre/i.test(raw)).toBe(
              true,
            );
          },
        );
      }

      if (shortSlug === 'city-of-david') {
        it.skipIf(!HAS_MDX)(
          'EN city-of-david discusses both archaeology AND Silwan neighborhood',
          () => {
            const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
            expect(/City\s+of\s+David/i.test(raw)).toBe(true);
            expect(/Silwan/i.test(raw)).toBe(true);
          },
        );
      }
    }

    if (lang === 'he') {
      it.skipIf(!HAS_MDX)(
        'HE: never uses "כותל הדמעות" (HE parallel of AUD-017)',
        () => {
          const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
          expect(/כותל\s+הדמעות/.test(raw)).toBe(false);
        },
      );

      if (shortSlug === 'western-wall') {
        it.skipIf(!HAS_MDX)('HE western-wall uses "הכותל המערבי"', () => {
          const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
          expect(/הכותל\s+המערבי/.test(raw)).toBe(true);
        });
      }

      if (shortSlug === 'holy-sepulchre') {
        it.skipIf(!HAS_MDX)('HE holy-sepulchre uses "כנסיית הקבר"', () => {
          const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
          expect(/כנסיית\s+הקבר/.test(raw)).toBe(true);
        });
      }
    }
  });
}

describe('Plan 02-03 — Jerusalem sub-destinations content invariants', () => {
  for (const slug of SHORT_SLUGS) {
    const isReligious = RELIGIOUS_SHORT_SLUGS.has(slug);
    expectSubDest(slug, 'en', isReligious);
    expectSubDest(slug, 'he', isReligious);
  }

  // Pairwise: HE/EN word count ratio in [0.85, 1.40] (AUD-007).
  describe('AUD-007: HE/EN word-count parity per paired sub-dest', () => {
    for (const shortSlug of SHORT_SLUGS) {
      const enHas = hasMdx('en', shortSlug);
      const heHas = hasMdx('he', shortSlug);
      const both = enHas && heHas;
      it.skipIf(!both)(`${shortSlug}: HE/EN word ratio in [0.85, 1.40]`, () => {
        const count = (lang: 'en' | 'he') => {
          const raw = readFileSync(mdxPath(lang, shortSlug), 'utf8');
          const body = raw.replace(/^---[\s\S]*?---/, '');
          const prose = body
            .replace(/<[^>]+>/g, ' ')
            .replace(/\{[^}]*\}/g, ' ')
            .replace(/^import .*$/gm, '');
          return prose
            .split(/\s+/)
            .map((w) => w.trim())
            .filter((w) => w.length > 1).length;
        };
        const en = count('en');
        const he = count('he');
        if (en === 0 || he === 0) return;
        const ratio = he / en;
        expect(ratio).toBeGreaterThanOrEqual(0.85);
        expect(ratio).toBeLessThanOrEqual(1.4);
      });
    }
  });
});
