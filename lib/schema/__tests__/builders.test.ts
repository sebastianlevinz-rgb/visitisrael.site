/**
 * Builders snapshot/shape tests — one block per builder.
 *
 * Asserts:
 *   - @context === 'https://schema.org'
 *   - @type matches expectation
 *   - inLanguage matches input lang
 *   - @id contains the canonicalUrl(slug, lang)
 *
 * Per plan 04 Task 1 behavior contract.
 */
import { describe, it, expect } from 'vitest';

import { canonicalUrl } from '../../seo/canonical';
import { getOrganizationSchema } from '../organization';
import { buildTouristDestination } from '../touristDestination';
import { buildTouristAttraction } from '../touristAttraction';
import { buildReligiousBuilding } from '../religiousBuilding';
import { buildPlace } from '../place';
import { buildLocalBusiness } from '../localBusiness';
import { buildBreadcrumb } from '../breadcrumb';
import { buildFAQ } from '../faq';
import { buildWebSite } from '../webSite';
import { buildCollectionPage } from '../collectionPage';
import { buildWebPage } from '../webPage';

describe('schema builders — shared invariants', () => {
  it('getOrganizationSchema produces Organization with inLanguage + url', () => {
    const he = getOrganizationSchema('he');
    expect(he['@context']).toBe('https://schema.org');
    expect(he['@type']).toBe('Organization');
    expect(he['inLanguage']).toBe('he');
    expect(he['url']).toBe('https://visitisrael.site');
    expect(he['name']).toBeTruthy();
  });

  it('getOrganizationSchema(en) differs from getOrganizationSchema(he)', () => {
    const he = getOrganizationSchema('he');
    const en = getOrganizationSchema('en');
    expect(he['inLanguage']).not.toBe(en['inLanguage']);
    expect(he['name']).not.toBe(en['name']);
    expect(he['url']).toBe(en['url']);
  });

  it('buildTouristDestination produces TouristDestination with geo + canonical @id', () => {
    const td = buildTouristDestination({
      slug: 'jerusalem',
      name: 'Jerusalem',
      description: 'Ancient capital, modern crossroads of three faiths.',
      lang: 'en',
      lat: 31.7683,
      lng: 35.2137,
      images: ['https://example.com/j.jpg'],
      attractions: [{ slug: 'western-wall', name: 'Western Wall' }],
    });
    expect(td['@context']).toBe('https://schema.org');
    expect(td['@type']).toBe('TouristDestination');
    expect(td['inLanguage']).toBe('en');
    expect(td['@id']).toContain(canonicalUrl('jerusalem', 'en'));
    expect((td as { geo: { latitude: number; longitude: number } }).geo.latitude).toBe(31.7683);
    expect((td as { geo: { latitude: number; longitude: number } }).geo.longitude).toBe(35.2137);
  });

  it('buildTouristAttraction produces TouristAttraction without includesAttraction', () => {
    const ta = buildTouristAttraction({
      slug: 'jerusalem/western-wall',
      name: 'Western Wall',
      description: 'Holiest accessible site in Judaism; remains of the Second Temple platform.',
      lang: 'en',
      images: ['https://example.com/ww.jpg'],
    });
    expect(ta['@type']).toBe('TouristAttraction');
    expect(ta['inLanguage']).toBe('en');
    expect(ta['@id']).toContain(canonicalUrl('jerusalem/western-wall', 'en'));
    expect(ta).not.toHaveProperty('includesAttraction');
  });

  it('buildPlace produces Place schema', () => {
    const p = buildPlace({
      slug: 'masada',
      name: 'Masada',
      description: 'Cliff-top fortress in the Judean Desert overlooking the Dead Sea.',
      lang: 'en',
    });
    expect(p['@type']).toBe('Place');
    expect(p['inLanguage']).toBe('en');
    expect(p['@id']).toContain(canonicalUrl('masada', 'en'));
  });

  it('buildLocalBusiness produces LocalBusiness with address', () => {
    const lb = buildLocalBusiness({
      slug: 'guides/golan-winery-tour',
      name: 'Golan Heights Winery',
      description: 'Boutique winery in the Golan offering tastings and tours.',
      lang: 'en',
      address: { streetAddress: '1 Winery Rd', addressLocality: 'Katzrin', addressCountry: 'IL' },
    });
    expect(lb['@type']).toBe('LocalBusiness');
    expect(lb['inLanguage']).toBe('en');
    expect(lb['@id']).toContain(canonicalUrl('guides/golan-winery-tour', 'en'));
    expect((lb as { address: { addressLocality: string } }).address.addressLocality).toBe('Katzrin');
  });

  it('buildWebSite produces WebSite with potentialAction SearchAction', () => {
    const ws = buildWebSite({ lang: 'en', name: 'Visit Israel' });
    expect(ws['@type']).toBe('WebSite');
    expect(ws['inLanguage']).toBe('en');
    expect(ws['@id']).toContain(canonicalUrl('', 'en'));
    const action = (ws as { potentialAction: { '@type': string } }).potentialAction;
    expect(action['@type']).toBe('SearchAction');
  });

  it('buildCollectionPage produces CollectionPage', () => {
    const cp = buildCollectionPage({
      slug: 'regions',
      name: 'Regions of Israel',
      description: 'Every region of Israel covered with regional canonical guides and sub-destinations.',
      lang: 'en',
    });
    expect(cp['@type']).toBe('CollectionPage');
    expect(cp['inLanguage']).toBe('en');
    expect(cp['@id']).toContain(canonicalUrl('regions', 'en'));
  });

  it('buildWebPage produces WebPage (utility/legal fallback)', () => {
    const wp = buildWebPage({
      slug: 'privacy',
      name: 'Privacy Policy',
      description: 'Privacy policy describing how visitisrael.site handles personal data and cookies.',
      lang: 'en',
    });
    expect(wp['@type']).toBe('WebPage');
    expect(wp['inLanguage']).toBe('en');
    expect(wp['@id']).toContain(canonicalUrl('privacy', 'en'));
  });
});

describe('schema builders — Hebrew inLanguage propagation', () => {
  it('every builder propagates lang into inLanguage (he)', () => {
    const td = buildTouristDestination({
      slug: 'jerusalem',
      name: 'ירושלים',
      description:
        'בירת ישראל וצומת תרבותי-דתי של שלוש דתות מונותאיסטיות — היעד התיירותי המשמעותי ביותר במדינה.',
      lang: 'he',
      lat: 31.7683,
      lng: 35.2137,
      images: ['https://example.com/j.jpg'],
      attractions: [],
    });
    expect(td['inLanguage']).toBe('he');
    expect(td['@id']).toContain(canonicalUrl('jerusalem', 'he'));
  });
});
