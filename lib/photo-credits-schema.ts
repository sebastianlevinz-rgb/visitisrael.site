/**
 * Zod schema for `data/photo-credits.json` — IMG-01 / IMG-02 / IMG-06.
 *
 * Anchored on RESEARCH.md §1.5 "Concrete steps" + PITFALLS.md §5.5.
 *
 * Locked design:
 *   - License: 11-entry allowlist (Wikimedia CC family, IGPO-CC, Unsplash/Pexels
 *     watermarks for abstract heroes only, OWN/PD for self-shot/public-domain).
 *   - SubjectType: four RESTRICTED religious sites + six general categories.
 *     The first four trigger a Zod `superRefine` that requires
 *     `restrictedSiteAcknowledgment` (per RESEARCH §1.5 + IMG-05/IMG-06).
 *   - `width >= 1200`: hard floor for any committed image — Discover Argentina's
 *     PhotoGallery shipped without srcset/widths for months; this rules that
 *     class of debt out structurally.
 *   - `src` must live under `/images/` with one of the allowed extensions —
 *     keeps remote URLs out of the ledger (those live in next.config.ts
 *     remotePatterns and are wired via PhotoGallery in plan 05).
 */
import { z } from 'zod';

export const License = z.enum([
  'CC0',
  'CC-BY-2.0',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'CC-BY-SA-3.0',
  'CC-BY-SA-4.0',
  'PD',
  'IGPO-CC',
  'OWN',
  'UNSPLASH',
  'PEXELS',
]);

export const SubjectType = z.enum([
  // Restricted religious sites — require restrictedSiteAcknowledgment.
  'westernWall',
  'holySepulchre',
  'domeOfTheRock',
  'bahaiGardens',
  // General categories — acknowledgment optional.
  'religious-general',
  'landscape',
  'cityscape',
  'food',
  'people',
  'abstract',
]);

const RESTRICTED_SUBJECTS = new Set([
  'westernWall',
  'holySepulchre',
  'domeOfTheRock',
  'bahaiGardens',
]);

export const CreditEntry = z
  .object({
    src: z
      .string()
      .regex(
        /^\/images\/.+\.(avif|webp|jpg|jpeg|png)$/,
        'src must be /images/... with .avif/.webp/.jpg/.jpeg/.png extension',
      ),
    author: z.string().min(1, 'author is required'),
    license: License,
    sourceUrl: z.string().url('sourceUrl must be a valid URL'),
    region: z.string().min(1, 'region is required'),
    slug: z.string().min(1, 'slug is required'),
    width: z.number().int().min(1200, 'width must be >= 1200px'),
    height: z.number().int().min(1, 'height must be a positive integer'),
    subjectType: SubjectType,
    restrictedSiteAcknowledgment: z.string().min(1).optional(),
    licenseProof: z.string().min(1).optional(),
  })
  .superRefine((entry, ctx) => {
    if (
      RESTRICTED_SUBJECTS.has(entry.subjectType) &&
      !entry.restrictedSiteAcknowledgment
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['restrictedSiteAcknowledgment'],
        message: `restrictedSiteAcknowledgment REQUIRED for subjectType=${entry.subjectType}`,
      });
    }
  });

/**
 * Top-level shape of `data/photo-credits.json`: a record keyed by web-path
 * (e.g. `/images/jerusalem/old-city.jpg`) → CreditEntry.
 */
export const Ledger = z.record(z.string(), CreditEntry);

export type License = z.infer<typeof License>;
export type SubjectType = z.infer<typeof SubjectType>;
export type CreditEntry = z.infer<typeof CreditEntry>;
export type Ledger = z.infer<typeof Ledger>;
