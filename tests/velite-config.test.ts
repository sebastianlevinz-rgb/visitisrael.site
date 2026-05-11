import { describe, it, expect } from 'vitest';
import { z } from 'zod';

/**
 * Velite uses its own `s` schema builder (a thin wrapper over Zod).
 * To verify the schema *shape* without spinning up Velite's build pipeline,
 * we re-derive the schema as a plain Zod object that mirrors `velite.config.ts`.
 *
 * Conflict A: `lang` enum is the FILESYSTEM-READY superset (he/en/fr),
 * even though `i18n-config.locales` registers only [he, en] at launch.
 */
const collectionSchema = z.object({
  lang: z.enum(['he', 'en', 'fr']),
  title: z.string().max(70),
  description: z.string().min(120).max(160),
});

describe('velite collection schema (Conflict A — FR filesystem-ready)', () => {
  const baseValid = {
    lang: 'he' as const,
    title: 'A reasonable title',
    description: 'a'.repeat(140),
  };

  it('accepts lang: "he"', () => {
    expect(collectionSchema.safeParse(baseValid).success).toBe(true);
  });

  it('accepts lang: "en"', () => {
    expect(
      collectionSchema.safeParse({ ...baseValid, lang: 'en' }).success,
    ).toBe(true);
  });

  it('accepts lang: "fr" (filesystem-ready for cheap FR addition)', () => {
    expect(
      collectionSchema.safeParse({ ...baseValid, lang: 'fr' }).success,
    ).toBe(true);
  });

  it('rejects unknown lang: "ru"', () => {
    const result = collectionSchema.safeParse({ ...baseValid, lang: 'ru' });
    expect(result.success).toBe(false);
  });

  it('rejects title longer than 70 chars', () => {
    const result = collectionSchema.safeParse({
      ...baseValid,
      title: 'a'.repeat(71),
    });
    expect(result.success).toBe(false);
  });

  it('rejects description shorter than 120 chars', () => {
    const result = collectionSchema.safeParse({
      ...baseValid,
      description: 'a'.repeat(119),
    });
    expect(result.success).toBe(false);
  });

  it('rejects description longer than 160 chars', () => {
    const result = collectionSchema.safeParse({
      ...baseValid,
      description: 'a'.repeat(161),
    });
    expect(result.success).toBe(false);
  });

  it('accepts description in [120, 160]', () => {
    expect(
      collectionSchema.safeParse({
        ...baseValid,
        description: 'a'.repeat(120),
      }).success,
    ).toBe(true);
    expect(
      collectionSchema.safeParse({
        ...baseValid,
        description: 'a'.repeat(160),
      }).success,
    ).toBe(true);
  });
});
