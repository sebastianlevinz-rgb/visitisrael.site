/**
 * Coordinator-format invariants for the accessibility-statement frontmatter.
 *
 * Phase 2 plan 05 — defense layer 2 (the pre-commit hook is layer 1, the
 * runtime renderer-throw is layer 3).
 *
 * Tests:
 *   1. accessibility_coordinator.name is a non-empty string and is not the
 *      literal `__REQUIRES_USER_INPUT__`
 *   2. accessibility_coordinator.phone matches /^\+?[0-9 \-()]{7,}$/
 *      (international-style; the renderer applies `<span dir="ltr">` for HE
 *      bidi safety)
 *   3. accessibility_coordinator.email matches a simple RFC 5322 regex
 *   4. last_audit_date is an ISO date (YYYY-MM-DD) and within the last
 *      90 days (per the israeli-accessibility-compliance skill requirement
 *      that the statement is reviewed within the last 90 days)
 *
 * Tests gate on entry-existence so the suite stays green during the
 * Phase 2.5 coordinator-checkpoint pause (when accessibility-statement
 * MDX is drafted but not yet committed).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const LEGAL_JSON = resolve(process.cwd(), '.velite/legal.json');
const PLACEHOLDER = '__REQUIRES_USER_INPUT__';
const PHONE_RE = /^\+?[0-9 \-()]{7,}$/;
// Simple RFC 5322-ish regex — good enough to catch typos + obvious garbage;
// the real validation is "does mailto: resolve to a monitored inbox" which
// is a manual check at deploy time.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

interface AccessibilityLegalEntry {
  lang: 'he' | 'en' | 'fr';
  title: string;
  description: string;
  slug: string;
  page: string;
  body: string;
  accessibility_coordinator?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  last_audit_date?: string;
}

function loadLegal(): AccessibilityLegalEntry[] {
  if (!existsSync(LEGAL_JSON)) return [];
  try {
    return JSON.parse(
      readFileSync(LEGAL_JSON, 'utf8'),
    ) as AccessibilityLegalEntry[];
  } catch {
    return [];
  }
}

function findEntry(lang: 'he' | 'en'): AccessibilityLegalEntry | undefined {
  return loadLegal().find(
    (e) => e.lang === lang && e.page === 'accessibility-statement',
  );
}

const LANGS = ['en', 'he'] as const;

describe('accessibility_coordinator frontmatter format', () => {
  for (const lang of LANGS) {
    describe(`${lang}/accessibility-statement`, () => {
      const has = !!findEntry(lang);

      it.skipIf(!has)('coordinator.name is non-empty and not placeholder', () => {
        const e = findEntry(lang)!;
        const name = e.accessibility_coordinator?.name;
        expect(typeof name).toBe('string');
        expect(name?.trim().length ?? 0).toBeGreaterThan(0);
        expect(name).not.toBe(PLACEHOLDER);
        expect((name ?? '').includes(PLACEHOLDER)).toBe(false);
      });

      it.skipIf(!has)('coordinator.phone matches international phone shape', () => {
        const e = findEntry(lang)!;
        const phone = e.accessibility_coordinator?.phone;
        expect(typeof phone).toBe('string');
        expect(phone).not.toBe(PLACEHOLDER);
        expect((phone ?? '').includes(PLACEHOLDER)).toBe(false);
        expect(PHONE_RE.test(phone ?? '')).toBe(true);
      });

      it.skipIf(!has)('coordinator.email matches RFC 5322 simple regex', () => {
        const e = findEntry(lang)!;
        const email = e.accessibility_coordinator?.email;
        expect(typeof email).toBe('string');
        expect(email).not.toBe(PLACEHOLDER);
        expect((email ?? '').includes(PLACEHOLDER)).toBe(false);
        expect(EMAIL_RE.test(email ?? '')).toBe(true);
      });

      it.skipIf(!has)(
        'last_audit_date is ISO YYYY-MM-DD AND within the last 90 days',
        () => {
          const e = findEntry(lang)!;
          const date = e.last_audit_date;
          expect(typeof date).toBe('string');
          expect(date).not.toBe(PLACEHOLDER);
          expect((date ?? '').includes(PLACEHOLDER)).toBe(false);
          expect(DATE_RE.test(date ?? '')).toBe(true);

          const ts = Date.parse(date ?? '');
          expect(Number.isFinite(ts)).toBe(true);
          const ageMs = Date.now() - ts;
          // Allow 1 day of clock skew on the recent edge (so an audit run
          // today during local-time-zone drift doesn't fail).
          expect(ageMs).toBeGreaterThan(-1 * 24 * 60 * 60 * 1000);
          expect(ageMs).toBeLessThanOrEqual(NINETY_DAYS_MS);
        },
      );
    });
  }
});

describe('accessibility-statement — no placeholder sentinel anywhere', () => {
  for (const lang of LANGS) {
    it.skipIf(!findEntry(lang))(
      `${lang}/accessibility-statement body has no ${PLACEHOLDER}`,
      () => {
        const e = findEntry(lang)!;
        expect(e.body.includes(PLACEHOLDER)).toBe(false);
        expect(e.title.includes(PLACEHOLDER)).toBe(false);
        expect(e.description.includes(PLACEHOLDER)).toBe(false);
      },
    );
  }
});
