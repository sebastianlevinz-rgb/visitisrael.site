/**
 * ReligiousBuilding generator tests — paired-naming + administrativeStatus.
 *
 * Reference: PITFALLS §3.1 (paired naming) + AUD-017..AUD-020 enforcement.
 *
 * SEO-04 critical assertions:
 *   - Temple Mount (contested=true) → paired name 'Temple Mount / Haram al-Sharif'
 *   - Western Wall (contested=false) → 'Western Wall' (NEVER 'Wailing Wall'),
 *     alternateName includes 'Kotel'
 *   - Church of Nativity → administrativeStatus = 'west-bank-paa' for AUD-020
 *   - Unknown siteId → throws Error('Unknown religious site: …')
 */
import { describe, it, expect } from 'vitest';

import { buildReligiousBuilding } from '../religiousBuilding';

type JsonLdShape = Record<string, unknown>;

describe('buildReligiousBuilding — paired naming (SEO-04, AUD-017..AUD-020)', () => {
  it('Temple Mount (contested) — EN: returns @type=Place + paired name', () => {
    const s = buildReligiousBuilding({
      siteId: 'temple-mount',
      slug: 'jerusalem/temple-mount',
      lang: 'en',
    }) as unknown as JsonLdShape;
    expect(s['@type']).toBe('Place');
    expect(s['name']).toBe('Temple Mount / Haram al-Sharif');
    expect(s['inLanguage']).toBe('en');
  });

  it('Temple Mount (contested) — HE: returns paired Hebrew name', () => {
    const s = buildReligiousBuilding({
      siteId: 'temple-mount',
      slug: 'jerusalem/temple-mount',
      lang: 'he',
    }) as unknown as JsonLdShape;
    expect(s['@type']).toBe('Place');
    expect(s['name']).toBe('הר הבית / אל-חרם א-שריף');
  });

  it('Temple Mount (contested) — religion is NOT emitted (neutral framing)', () => {
    const s = buildReligiousBuilding({
      siteId: 'temple-mount',
      slug: 'jerusalem/temple-mount',
      lang: 'en',
    }) as unknown as JsonLdShape;
    expect(s).not.toHaveProperty('religion');
  });

  it('Western Wall (non-contested) — @type=PlaceOfWorship + primary name', () => {
    const s = buildReligiousBuilding({
      siteId: 'western-wall',
      slug: 'jerusalem/western-wall',
      lang: 'en',
    }) as unknown as JsonLdShape;
    expect(s['@type']).toBe('PlaceOfWorship');
    expect(s['name']).toBe('Western Wall');
    expect(s['religion']).toBe('Judaism');
  });

  it('Western Wall — alternateName includes "Kotel" and NEVER "Wailing Wall"', () => {
    const s = buildReligiousBuilding({
      siteId: 'western-wall',
      slug: 'jerusalem/western-wall',
      lang: 'en',
    }) as unknown as JsonLdShape;
    const alt = s['alternateName'] as string[];
    expect(alt).toContain('Kotel');
    expect(alt).not.toContain('Wailing Wall');
  });

  it('Church of the Nativity — administrativeStatus surfaces as additionalProperty', () => {
    const s = buildReligiousBuilding({
      siteId: 'church-of-nativity',
      slug: 'church-of-nativity',
      lang: 'en',
    }) as unknown as JsonLdShape;
    const addl = s['additionalProperty'] as {
      '@type': string;
      name: string;
      value: string;
    };
    expect(addl['@type']).toBe('PropertyValue');
    expect(addl.name).toBe('administrativeStatus');
    expect(addl.value).toBe('west-bank-paa');
  });

  it('Mount Bental — Golan administrativeStatus surfaces (AUD-020 transparency)', () => {
    const s = buildReligiousBuilding({
      siteId: 'mount-bental',
      slug: 'golan-heights/mount-bental',
      lang: 'en',
    }) as unknown as JsonLdShape;
    const addl = s['additionalProperty'] as { value: string };
    expect(addl.value).toBe('golan-heights');
  });

  it('Western Wall — sameAs cross-references Wikidata', () => {
    const s = buildReligiousBuilding({
      siteId: 'western-wall',
      slug: 'jerusalem/western-wall',
      lang: 'en',
    }) as unknown as JsonLdShape;
    const sameAs = s['sameAs'] as string[];
    expect(sameAs).toContain('https://www.wikidata.org/wiki/Q134821');
  });

  it('Unknown siteId throws Error', () => {
    expect(() =>
      buildReligiousBuilding({
        siteId: 'not-a-real-site',
        slug: 'fake/slug',
        lang: 'en',
      }),
    ).toThrow(/Unknown religious site: not-a-real-site/);
  });

  it('Baháʼí Gardens (non-contested) — emits PlaceOfWorship and religion=Baháʼí Faith', () => {
    const s = buildReligiousBuilding({
      siteId: 'bahai-gardens',
      slug: 'haifa/bahai-gardens',
      lang: 'en',
    }) as unknown as JsonLdShape;
    expect(s['@type']).toBe('PlaceOfWorship');
    expect(s['religion']).toBe('Baháʼí Faith');
  });

  it('Yad Vashem (non-contested, religion=null) — religion field NOT emitted', () => {
    const s = buildReligiousBuilding({
      siteId: 'yad-vashem',
      slug: 'jerusalem/yad-vashem',
      lang: 'en',
    }) as unknown as JsonLdShape;
    expect(s['@type']).toBe('PlaceOfWorship');
    expect(s).not.toHaveProperty('religion');
  });

  it('alternateName includes paired translations across locales (de-duped)', () => {
    const s = buildReligiousBuilding({
      siteId: 'temple-mount',
      slug: 'jerusalem/temple-mount',
      lang: 'en',
    }) as unknown as JsonLdShape;
    const alt = s['alternateName'] as string[];
    // Should include the Hebrew names + the Arabic name + the alternateName.he
    expect(alt).toContain('הר הבית');
    expect(alt).toContain('Haram al-Sharif');
    expect(alt).toContain('الحرم القدسي الشريف');
    // Dedup: no value appears twice
    expect(new Set(alt).size).toBe(alt.length);
  });
});

describe('religious-sites.json — dictionary completeness', () => {
  it('contains ≥25 entries (excluding _meta key)', () => {
    // Importing the raw JSON for assertions.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const dict: Record<string, unknown> = require('../../../data/religious-sites.json');
    const entries = Object.keys(dict).filter((k) => k !== '_meta');
    expect(entries.length).toBeGreaterThanOrEqual(25);
  });

  it('every entry has the required structural fields', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const dict: Record<string, unknown> = require('../../../data/religious-sites.json');
    const entries = Object.entries(dict).filter(([k]) => k !== '_meta');
    for (const [id, raw] of entries) {
      const entry = raw as {
        contested: boolean;
        name: { he: string; en: string };
        alternateName: Record<string, string | undefined>;
        denomination: string | null;
        religion: string | null;
        wikidataId: string | null;
        administrativeStatus: string | null;
        notes: string;
      };
      expect(typeof entry.contested, `${id}.contested`).toBe('boolean');
      expect(typeof entry.name.he, `${id}.name.he`).toBe('string');
      expect(typeof entry.name.en, `${id}.name.en`).toBe('string');
      expect(typeof entry.notes, `${id}.notes`).toBe('string');
    }
  });
});
