/**
 * <JsonLd> — RSC component that injects native JSON-LD via
 * <script type="application/ld+json"> with JSON-stringified payload.
 *
 * Page-level injection per ARCHITECTURE §4.2:
 *   - Content schemas (TouristDestination/Attraction/ReligiousBuilding/etc.) → page-level
 *   - Organization schema → root layout ONLY
 *
 * Per RESEARCH §1.6: NOT next-seo — its App Router support is patchy.
 * RSC native injection is the documented path.
 *
 * Server Component — does NOT need 'use client'. Schema serialization happens
 * at render time on the server.
 */
import type { Thing, WithContext } from 'schema-dts';

interface JsonLdProps<T extends Thing> {
  schema: WithContext<T>;
}

export function JsonLd<T extends Thing>({ schema }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
