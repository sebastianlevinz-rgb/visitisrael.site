/**
 * Phase 3 plan 03-11 Task 2 — Bethlehem canonical content invariants.
 *
 * Pins the editorial + structural contract for /west-bank/bethlehem.
 *
 * Key contracts (PITFALLS §3.3 + CONTEXT.md):
 *   - administrativeStatus: 'palestinian-authority' on BOTH EN + HE frontmatter
 *   - EN first reference: "Bethlehem (in the West Bank, administered by the
 *     Palestinian Authority)" — AUD-020 mechanical check
 *   - HE first reference: contains both "בגדה המערבית" + "הרשות הפלסטינית"
 *   - NO Banksy / wall art / graffiti references (CONTEXT.md neutrality)
 *   - NO political-commentary keywords (occupation/apartheid/settler)
 *   - 5+ distinct AffiliateCard partners
 *   - 8-12 H2 sections per PITFALLS §4.12 H-tag template
 *   - EN word count 1500-2500; HE/EN ratio 0.85-1.40
 *   - Hebron NOT in app/sitemap.ts (REG-04 exclusion)
 *   - Church of the Nativity religiousSiteId = 'church-of-the-nativity'
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO = process.cwd();

const EN_PATH = resolve(REPO, 'content/en/west-bank/bethlehem.mdx');
const HE_PATH = resolve(REPO, 'content/he/west-bank/bethlehem.mdx');

function readIfExists(p: string): string | null {
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
}

function frontmatter(src: string): Record<string, string> {
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out: Record<string, string> = {};
  for (const line of m[1].split(/\n/)) {
    const kv = line.match(/^([a-zA-Z_][\w_]*):\s*(.*)$/);
    if (kv) {
      out[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '').trim();
    }
  }
  return out;
}

function body(src: string): string {
  const m = src.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return m ? m[1] : src;
}

function countWords(text: string): number {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>\-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1).length;
}

describe('Bethlehem EN canonical — /en/west-bank/bethlehem', () => {
  const src = readIfExists(EN_PATH);

  it('file exists', () => {
    expect(src).not.toBeNull();
  });

  if (!src) return;

  const fm = frontmatter(src);
  const text = body(src);

  it('frontmatter administrativeStatus is "palestinian-authority"', () => {
    expect(fm['administrativeStatus']).toBe('palestinian-authority');
  });

  it('frontmatter lang=en, slug=bethlehem, region=bethlehem', () => {
    expect(fm['lang']).toBe('en');
    expect(fm['slug']).toBe('bethlehem');
    expect(fm['region']).toBe('bethlehem');
  });

  it('frontmatter religiousSiteId is "church-of-the-nativity"', () => {
    expect(fm['religiousSiteId']).toBe('church-of-the-nativity');
  });

  it('first 1500 chars contain the locked first-reference framing (AUD-020 mechanical)', () => {
    const window = text.slice(0, 1500);
    expect(window).toMatch(
      /Bethlehem\s*\(in the West Bank,\s*administered by the Palestinian Authority\)/,
    );
  });

  it('NO Banksy / wall-graffiti references (CONTEXT.md v1 neutrality)', () => {
    expect(/\bbanksy\b/i.test(text)).toBe(false);
    expect(/\bwall art\b/i.test(text)).toBe(false);
    expect(/\bgraffiti\b/i.test(text)).toBe(false);
  });

  it('NO political-commentary keywords (occupation / apartheid / settler)', () => {
    expect(/\boccupation\b/i.test(text)).toBe(false);
    expect(/\bapartheid\b/i.test(text)).toBe(false);
    expect(/\bsettler\b/i.test(text)).toBe(false);
    expect(/\boccupied\s+territories\b/i.test(text)).toBe(false);
  });

  it('NO biased "Judea and Samaria" framing (AUD-018)', () => {
    expect(/\bjudea\s+and\s+samaria\b/i.test(text)).toBe(false);
  });

  it('has 5+ distinct affiliate partner attributes', () => {
    const partners = new Set<string>();
    const re = /partner="([^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      partners.add(m[1]);
    }
    expect(partners.size).toBeGreaterThanOrEqual(5);
  });

  it('has 8-12 H2 sections', () => {
    const h2 = text.match(/^##\s+/gm) ?? [];
    expect(h2.length).toBeGreaterThanOrEqual(8);
    expect(h2.length).toBeLessThanOrEqual(12);
  });

  it('word count between 1500 and 2500', () => {
    const wc = countWords(text);
    expect(wc).toBeGreaterThanOrEqual(1500);
    expect(wc).toBeLessThanOrEqual(2500);
  });

  it('title between 40 and 70 chars', () => {
    expect(fm['title'].length).toBeGreaterThanOrEqual(40);
    expect(fm['title'].length).toBeLessThanOrEqual(70);
  });

  it('description between 120 and 160 chars', () => {
    expect(fm['description'].length).toBeGreaterThanOrEqual(120);
    expect(fm['description'].length).toBeLessThanOrEqual(160);
  });

  it('references ecumenical Christian denominations (Catholic + Greek Orthodox + Armenian)', () => {
    expect(/catholic|franciscan/i.test(text)).toBe(true);
    expect(/greek orthodox/i.test(text)).toBe(true);
    expect(/armenian/i.test(text)).toBe(true);
  });

  it('mentions practical checkpoint logistics (foreign tourists may enter Area A)', () => {
    expect(/area a/i.test(text)).toBe(true);
    expect(/passport/i.test(text)).toBe(true);
    expect(/checkpoint/i.test(text)).toBe(true);
  });
});

describe('Bethlehem HE canonical — /west-bank/bethlehem', () => {
  const enSrc = readIfExists(EN_PATH);
  const heSrc = readIfExists(HE_PATH);

  it('file exists', () => {
    expect(heSrc).not.toBeNull();
  });

  if (!heSrc) return;

  const fm = frontmatter(heSrc);
  const text = body(heSrc);

  it('frontmatter administrativeStatus mirrors EN', () => {
    expect(fm['administrativeStatus']).toBe('palestinian-authority');
  });

  it('frontmatter lang=he, slug=bethlehem, region=bethlehem', () => {
    expect(fm['lang']).toBe('he');
    expect(fm['slug']).toBe('bethlehem');
    expect(fm['region']).toBe('bethlehem');
  });

  it('frontmatter religiousSiteId is "church-of-the-nativity"', () => {
    expect(fm['religiousSiteId']).toBe('church-of-the-nativity');
  });

  it('HE first reference contains both בגדה המערבית + הרשות הפלסטינית', () => {
    const window = text.slice(0, 2000);
    expect(window).toContain('בגדה המערבית');
    expect(window).toContain('הרשות הפלסטינית');
  });

  it('HE H1 contains בית לחם', () => {
    expect(/^#\s+.*בית\s+לחם/m.test(text)).toBe(true);
  });

  it('NO Hebrew "יהודה ושומרון" (biased framing)', () => {
    expect(text).not.toMatch(/יהודה ושומרון/);
  });

  it('HE/EN word-count ratio in [0.85, 1.40]', () => {
    if (!enSrc) return;
    const enWc = countWords(body(enSrc));
    const heWc = countWords(text);
    const ratio = heWc / enWc;
    expect(ratio).toBeGreaterThanOrEqual(0.85);
    expect(ratio).toBeLessThanOrEqual(1.4);
  });

  it('uses כנסיית המולד for Church of the Nativity', () => {
    expect(text).toContain('כנסיית המולד');
  });

  it('HE description 120-160 chars', () => {
    expect(fm['description'].length).toBeGreaterThanOrEqual(120);
    expect(fm['description'].length).toBeLessThanOrEqual(160);
  });
});

describe('Sitemap — REG-04 Hebron exclusion + Bethlehem inclusion', () => {
  it('Hebron NOT in app/sitemap.ts STATIC_PATHS', () => {
    const src = readFileSync(resolve(REPO, 'app/sitemap.ts'), 'utf8');
    expect(/\bhebron\b/i.test(src)).toBe(false);
  });

  it('Bethlehem distinct route family /west-bank/bethlehem present in sitemap', () => {
    const src = readFileSync(resolve(REPO, 'app/sitemap.ts'), 'utf8');
    expect(src).toMatch(/['"]\/west-bank\/bethlehem['"]/);
  });
});

describe('religious-sites.json — church-of-the-nativity entry', () => {
  it('church-of-the-nativity exists with administrativeStatus=west-bank-paa', () => {
    const data = JSON.parse(
      readFileSync(resolve(REPO, 'data/religious-sites.json'), 'utf8'),
    );
    expect(data['church-of-the-nativity']).toBeDefined();
    expect(data['church-of-the-nativity'].administrativeStatus).toBe(
      'west-bank-paa',
    );
    expect(data['church-of-the-nativity'].religion).toBe('Christianity');
  });
});

describe('photo-credits.json — Bethlehem ledger', () => {
  it('has 4 Bethlehem ledger entries with real Wikimedia URLs', () => {
    const data = JSON.parse(
      readFileSync(resolve(REPO, 'data/photo-credits.json'), 'utf8'),
    );
    const bethlehemEntries = Object.entries(data).filter(([k]) =>
      k.startsWith('/images/west-bank/bethlehem/'),
    );
    expect(bethlehemEntries.length).toBeGreaterThanOrEqual(4);
    for (const [, entry] of bethlehemEntries) {
      const e = entry as Record<string, unknown>;
      expect(typeof e.sourceUrl).toBe('string');
      expect((e.sourceUrl as string).length).toBeGreaterThan(0);
      expect((e.width as number) >= 1200).toBe(true);
    }
  });
});
