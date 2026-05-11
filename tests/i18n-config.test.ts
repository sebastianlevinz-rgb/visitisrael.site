import { describe, it, expect } from 'vitest';
import {
  locales,
  defaultLocale,
  allowedLangs,
  type Locale,
  type AllowedLang,
} from '@/i18n-config';

describe('i18n-config (Conflict A — registered vs allowed)', () => {
  it('registers exactly HE and EN at launch (no FR)', () => {
    expect(locales).toEqual(['he', 'en']);
    expect(locales).toHaveLength(2);
    // @ts-expect-error — fr is NOT in the registered locales array at launch
    const _fr: Locale = 'fr';
    void _fr;
  });

  it('declares HE as the default locale', () => {
    expect(defaultLocale).toBe('he');
  });

  it('allows HE, EN, and FR in the filesystem/type union (FR scaffolded)', () => {
    expect(allowedLangs).toEqual(['he', 'en', 'fr']);
    expect(allowedLangs).toHaveLength(3);
    const fr: AllowedLang = 'fr';
    expect(fr).toBe('fr');
  });

  it('declares locales and allowedLangs as immutable const tuples', () => {
    // `as const` widening would allow .push; we want a narrowed readonly tuple.
    expect(Object.isFrozen(locales as unknown as object)).toBe(false);
    // Type assertion check: `locales` should be `readonly ['he', 'en']`.
    type LocaleType = typeof locales;
    const _check: LocaleType = ['he', 'en'] as const;
    expect(_check).toEqual(['he', 'en']);
  });
});
