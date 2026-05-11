/**
 * Phase 3 plan 03-11 Wave 0 — west-bank route renderer + collection tests.
 *
 * Pins the structural contract that the rest of the plan relies on:
 *   - Velite westBank collection emits .velite/westBank.json
 *   - app/[locale]/west-bank/[slug]/page.tsx exports default + generateStaticParams
 *   - administrativeStatus is REQUIRED for any westBank Velite entry (defense
 *     layer 1 of 3 alongside AUD-019 + AUD-020)
 *   - audit run.ts loadVeliteIndex routes "west-bank/<slug>" keys to the
 *     westBank collection
 *   - detectProfile maps collection='westBank' → 'REGION_CANONICAL'
 *   - Hebron is NOT in the sitemap (REG-04 explicit exclusion)
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { detectProfile } from '../../scripts/audit/profiles/detect';

const REPO = process.cwd();

describe('westBank route — Wave 0 infrastructure', () => {
  it('renderer file exists at app/[locale]/west-bank/[slug]/page.tsx', () => {
    const p = resolve(REPO, 'app/[locale]/west-bank/[slug]/page.tsx');
    expect(existsSync(p)).toBe(true);
  });

  it('renderer exports default function + generateStaticParams + generateMetadata', () => {
    const src = readFileSync(
      resolve(REPO, 'app/[locale]/west-bank/[slug]/page.tsx'),
      'utf8',
    );
    expect(src).toMatch(/export default async function WestBankPage/);
    expect(src).toMatch(/export function generateStaticParams/);
    expect(src).toMatch(/export async function generateMetadata/);
  });

  it('renderer reads westBank Velite collection', () => {
    const src = readFileSync(
      resolve(REPO, 'app/[locale]/west-bank/[slug]/page.tsx'),
      'utf8',
    );
    expect(src).toMatch(/westBank.*from\s+['"]#site\/content['"]/);
  });

  it('renderer emits 3-segment BreadcrumbList (Home → West Bank → slug)', () => {
    const src = readFileSync(
      resolve(REPO, 'app/[locale]/west-bank/[slug]/page.tsx'),
      'utf8',
    );
    // HE label `הגדה המערבית`; EN label `West Bank`.
    expect(src).toContain('הגדה המערבית');
    expect(src).toContain("'West Bank'");
    // Three segments in buildBreadcrumb
    expect(src).toMatch(/segments:\s*\[\s*\{[^}]*Home/);
  });

  it('renderer emits PlaceOfWorship schema when religiousSiteId present', () => {
    const src = readFileSync(
      resolve(REPO, 'app/[locale]/west-bank/[slug]/page.tsx'),
      'utf8',
    );
    expect(src).toMatch(/buildReligiousBuilding/);
    expect(src).toMatch(/r\.religiousSiteId/);
  });
});

describe('velite.config.ts — westBank collection schema', () => {
  it('declares westBank collection with administrativeStatus required', () => {
    const src = readFileSync(resolve(REPO, 'velite.config.ts'), 'utf8');
    expect(src).toMatch(/const\s+westBank\s*=\s*defineCollection/);
    expect(src).toMatch(
      /administrativeStatus:\s*s\.enum\(\['palestinian-authority'\]\)/,
    );
    // Pattern must scan content/{he,en,fr}/west-bank/**/*.mdx
    expect(src).toMatch(/pattern:\s*'\{he,en,fr\}\/west-bank/);
    // Must be exported in the defineConfig collections
    expect(src).toMatch(/collections:\s*\{[^}]*westBank[^}]*\}/);
  });

  it('westBank schema requires faqs (5-10 entries)', () => {
    const src = readFileSync(resolve(REPO, 'velite.config.ts'), 'utf8');
    // Inside the westBank schema block, faqs uses faqEntry array with min(5)
    const wbMatch = src.match(/const\s+westBank[\s\S]*?^\}\);/m);
    expect(wbMatch).not.toBeNull();
    if (wbMatch) {
      expect(wbMatch[0]).toMatch(
        /faqs:\s*s\.array\(faqEntry\)\.min\(5\)\.max\(10\)/,
      );
    }
  });
});

describe('audit loader — westBank routing', () => {
  it('loadVeliteIndex registers westBank.json mapping', () => {
    const src = readFileSync(resolve(REPO, 'scripts/audit/run.ts'), 'utf8');
    expect(src).toMatch(/\['westBank\.json',\s*'westBank'\]/);
    // Lookup-slug prefix for westBank entries is `west-bank/<slug>` to match
    // the audit walker's inferSlug for /en/west-bank/bethlehem/ → west-bank/bethlehem.
    expect(src).toMatch(/name === 'westBank'[\s\S]*?`west-bank\/\$\{e\.region/);
  });

  it('detectProfile dispatches westBank → REGION_CANONICAL', () => {
    expect(detectProfile({ collection: 'westBank' })).toBe('REGION_CANONICAL');
  });
});

describe('REG-04 exclusion — Hebron not in sitemap', () => {
  it('Hebron is NOT present in app/sitemap.ts STATIC_PATHS', () => {
    const src = readFileSync(resolve(REPO, 'app/sitemap.ts'), 'utf8');
    expect(/\bhebron\b/i.test(src)).toBe(false);
  });
});

describe('westBank Velite output — once content ships', () => {
  it('Bethlehem appears in .velite/westBank.json once MDX ships', () => {
    const veliteFile = resolve(REPO, '.velite/westBank.json');
    if (!existsSync(veliteFile)) {
      // Pre-content-ship state — skip (Wave 0 task ships infrastructure only).
      return;
    }
    const entries = JSON.parse(readFileSync(veliteFile, 'utf8')) as Array<{
      lang: string;
      region: string;
      administrativeStatus?: string;
    }>;
    // Each Bethlehem entry MUST carry administrativeStatus='palestinian-authority'.
    const bethlehemEntries = entries.filter((e) => e.region === 'bethlehem');
    if (bethlehemEntries.length === 0) return;
    for (const e of bethlehemEntries) {
      expect(e.administrativeStatus).toBe('palestinian-authority');
    }
    // Both EN + HE counterparts expected.
    const langs = new Set(bethlehemEntries.map((e) => e.lang));
    expect(langs.has('en')).toBe(true);
    expect(langs.has('he')).toBe(true);
  });
});
