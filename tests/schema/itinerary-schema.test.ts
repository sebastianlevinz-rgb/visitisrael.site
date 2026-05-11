/**
 * Phase 2 plan 04 — itinerary schema generator behavior tests.
 *
 * Validates `itinerarySchema()` from `@/lib/schema/itinerary`:
 *
 *   1. Returns a TouristTrip with `@context: 'https://schema.org'`
 *      and `@type: 'TouristTrip'`
 *   2. `itinerary[]` contains TouristAttraction entries with name +
 *      description + url
 *   3. `inLanguage` reflects the input lang
 *   4. `additionalProperty[]` includes a PropertyValue carrying
 *      `durationDays`
 *   5. Stops with lat/lng emit GeoCoordinates; stops without
 *      omit `geo`
 *   6. Empty `itinerary[]` is accepted and emits an empty array
 *      (the renderer-side stops the page from rendering an empty
 *      itinerary; the generator stays permissive)
 *   7. The returned object satisfies the WithContext<TouristTrip>
 *      shape (typed assertion via cast, runtime via shape check)
 */
import { describe, it, expect } from 'vitest';
import { itinerarySchema } from '@/lib/schema/itinerary';

const baseInput = {
  name: '3 Days in Jerusalem: A Complete Itinerary',
  description:
    'A complete 3-day Jerusalem itinerary covering the Old City, West Jerusalem, and one day-trip option.',
  url: 'https://visitisrael.site/en/itineraries/3-days-in-jerusalem',
  inLanguage: 'en' as const,
  durationDays: 3,
};

describe('itinerarySchema()', () => {
  it('returns a TouristTrip with @context and @type set', () => {
    const schema = itinerarySchema({ ...baseInput, itinerary: [] });
    const s = schema as unknown as {
      '@context': string;
      '@type': string;
    };
    expect(s['@context']).toBe('https://schema.org');
    expect(s['@type']).toBe('TouristTrip');
  });

  it('emits @id including the page url and a #trip fragment', () => {
    const schema = itinerarySchema({ ...baseInput, itinerary: [] });
    const s = schema as unknown as { '@id': string };
    expect(s['@id']).toBe(`${baseInput.url}#trip`);
  });

  it('includes name + description + url + inLanguage from input', () => {
    const schema = itinerarySchema({ ...baseInput, itinerary: [] });
    const s = schema as unknown as {
      name: string;
      description: string;
      url: string;
      inLanguage: string;
    };
    expect(s.name).toBe(baseInput.name);
    expect(s.description).toBe(baseInput.description);
    expect(s.url).toBe(baseInput.url);
    expect(s.inLanguage).toBe('en');
  });

  it('itinerary[] contains TouristAttraction stops with name/description/url', () => {
    const schema = itinerarySchema({
      ...baseInput,
      itinerary: [
        {
          name: 'Western Wall',
          description: 'Surviving retaining wall of the Second Temple.',
          url: 'https://visitisrael.site/en/jerusalem/western-wall',
        },
        {
          name: 'Mahane Yehuda Market',
          description: 'The city food market and evening bar district.',
          url: 'https://visitisrael.site/en/jerusalem/mahane-yehuda',
        },
      ],
    });
    const s = schema as unknown as {
      itinerary: Array<{
        '@type': string;
        name: string;
        description: string;
        url: string;
      }>;
    };
    expect(s.itinerary).toHaveLength(2);
    expect(s.itinerary[0]?.['@type']).toBe('TouristAttraction');
    expect(s.itinerary[0]?.name).toBe('Western Wall');
    expect(s.itinerary[0]?.url).toMatch(/\/jerusalem\/western-wall$/);
    expect(s.itinerary[1]?.name).toBe('Mahane Yehuda Market');
  });

  it('stops with lat/lng emit GeoCoordinates; stops without omit geo', () => {
    const schema = itinerarySchema({
      ...baseInput,
      itinerary: [
        {
          name: 'Western Wall',
          description: 'Surviving retaining wall.',
          url: 'https://visitisrael.site/en/jerusalem/western-wall',
          latitude: 31.7767,
          longitude: 35.2345,
        },
        {
          name: 'Mahane Yehuda Market',
          description: 'Market and bar district.',
          url: 'https://visitisrael.site/en/jerusalem/mahane-yehuda',
        },
      ],
    });
    const s = schema as unknown as {
      itinerary: Array<{
        geo?: {
          '@type': string;
          latitude: number;
          longitude: number;
        };
      }>;
    };
    expect(s.itinerary[0]?.geo).toBeDefined();
    expect(s.itinerary[0]?.geo?.['@type']).toBe('GeoCoordinates');
    expect(s.itinerary[0]?.geo?.latitude).toBe(31.7767);
    expect(s.itinerary[0]?.geo?.longitude).toBe(35.2345);
    expect(s.itinerary[1]?.geo).toBeUndefined();
  });

  it('additionalProperty[] carries durationDays as a PropertyValue', () => {
    const schema = itinerarySchema({ ...baseInput, itinerary: [] });
    const s = schema as unknown as {
      additionalProperty: Array<{
        '@type': string;
        name: string;
        value: number;
      }>;
    };
    expect(s.additionalProperty).toHaveLength(1);
    expect(s.additionalProperty[0]?.['@type']).toBe('PropertyValue');
    expect(s.additionalProperty[0]?.name).toBe('durationDays');
    expect(s.additionalProperty[0]?.value).toBe(3);
  });

  it('respects inLanguage=he for Hebrew variant', () => {
    const schema = itinerarySchema({
      ...baseInput,
      inLanguage: 'he',
      url: 'https://visitisrael.site/itineraries/3-days-in-jerusalem',
      itinerary: [],
    });
    const s = schema as unknown as { inLanguage: string };
    expect(s.inLanguage).toBe('he');
  });

  it('empty itinerary[] is accepted and emits an empty array (renderer enforces non-empty)', () => {
    const schema = itinerarySchema({ ...baseInput, itinerary: [] });
    const s = schema as unknown as { itinerary: unknown[] };
    expect(Array.isArray(s.itinerary)).toBe(true);
    expect(s.itinerary).toHaveLength(0);
  });
});
