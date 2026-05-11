/**
 * Itinerary generator — multi-day trips (e.g., "3 Days in Jerusalem").
 *
 * Emits a `TouristTrip` schema with:
 *   - core trip fields (name, description, url, inLanguage)
 *   - `itinerary[]` of `TouristAttraction` stops (each carrying its own
 *     canonical URL for internal-link graph density)
 *   - `additionalProperty[]` carrying `durationDays` as a
 *     PropertyValue so plan 10 audit + downstream consumers can read
 *     the structured value without parsing the body
 *
 * `as unknown as WithContext<TouristTrip>` cast applied uniformly with
 * the other 11 generators — schema-dts v2 doesn't type `inLanguage`
 * cleanly on every PlaceBase-derived shape, so the cast is the locked
 * escape hatch (Plan 1.4 decision). See organization.ts for the
 * canonical justification.
 *
 * Reference: Plan 2.4 interfaces block + RESEARCH §8 Open Question 2
 * (use existing GUIDE_OR_WINERY audit profile; do NOT add an ITINERARY
 * profile yet — promote only if scoring misleads).
 */
import type { TouristTrip, WithContext } from 'schema-dts';

import type { SchemaLang } from './types';

export interface ItineraryStopInput {
  name: string;
  description: string;
  url: string;
  latitude?: number;
  longitude?: number;
}

export interface ItinerarySchemaInput {
  name: string;
  description: string;
  url: string;
  inLanguage: SchemaLang;
  itinerary: ItineraryStopInput[];
  durationDays: number;
}

export function itinerarySchema(
  input: ItinerarySchemaInput,
): WithContext<TouristTrip> {
  const trip = {
    '@context': 'https://schema.org' as const,
    '@type': 'TouristTrip' as const,
    '@id': `${input.url}#trip`,
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.inLanguage,
    itinerary: input.itinerary.map((i) => ({
      '@type': 'TouristAttraction' as const,
      name: i.name,
      description: i.description,
      url: i.url,
      ...(typeof i.latitude === 'number' && typeof i.longitude === 'number'
        ? {
            geo: {
              '@type': 'GeoCoordinates' as const,
              latitude: i.latitude,
              longitude: i.longitude,
            },
          }
        : {}),
    })),
    additionalProperty: [
      {
        '@type': 'PropertyValue' as const,
        name: 'durationDays',
        value: input.durationDays,
      },
    ],
  };
  return trip as unknown as WithContext<TouristTrip>;
}
