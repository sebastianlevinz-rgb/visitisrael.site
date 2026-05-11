/**
 * `/accessibility-statement` (HE) and `/en/accessibility-statement` —
 * Hatzaharat Negishut (IS 5568:2020 / WCAG 2.1 AA).
 *
 * Phase 2 plan 05 Wave 0 — UTILITY profile + statutory compliance page.
 *
 * Defense-in-depth contract (per RESEARCH.md §6 + israeli-accessibility-compliance
 * skill SKILL.md Step 6):
 *
 *   - Reads the Velite Legal entry by (lang, page='accessibility-statement').
 *     Velite is open-frontmatter by default, so the entry carries the
 *     EXTENDED fields `accessibility_coordinator: { name, phone, email }`
 *     and `last_audit_date`.
 *
 *   - At RENDER TIME the renderer checks every coordinator field + the
 *     last_audit_date for the literal string `__REQUIRES_USER_INPUT__`.
 *     If any placeholder slips past the pre-commit hook + Vitest contract,
 *     the page THROWS rather than ships placeholder data to the public
 *     site. IS 5568 statutory exposure (up to 50,000 NIS per violation)
 *     warrants the third defensive layer.
 *
 *   - The coordinator block is rendered as a dedicated section with
 *     `mailto:` + `tel:` anchors. HE pages wrap the phone/email in
 *     `<span dir="ltr">` so Hebrew bidi-text doesn't reverse Latin runs
 *     (AUD-024).
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { legal } from '#site/content';
import { JsonLd } from '@/components/JsonLd';
import { MDXContent } from '@/components/MDXContent';
import { buildWebPage, buildBreadcrumb } from '@/lib/schema';
import { generateMetadataFor } from '@/lib/seo/metadata';
import type { Locale } from '@/i18n-config';

const PAGE_SLUG = 'accessibility-statement';
const REQUIRES_USER_INPUT = '__REQUIRES_USER_INPUT__';

interface AccessibilityCoordinator {
  name?: string;
  phone?: string;
  email?: string;
}

interface AccessibilityLegalEntry {
  lang: 'he' | 'en' | 'fr';
  title: string;
  description: string;
  slug: string;
  page: string;
  body: string;
  // Extended frontmatter — Velite is open-by-default; these pass through
  // even though the Velite Legal schema doesn't declare them.
  accessibility_coordinator?: AccessibilityCoordinator;
  last_audit_date?: string;
}

interface AccessibilityStatementProps {
  params: Promise<{ locale: Locale }>;
}

function findEntry(locale: Locale): AccessibilityLegalEntry | undefined {
  return (legal as ReadonlyArray<AccessibilityLegalEntry>).find(
    (e) => e.lang === locale && e.page === PAGE_SLUG,
  );
}

/**
 * Hard-fail defensive guard: if any coordinator field OR last_audit_date
 * still contains the placeholder sentinel, throw. The pre-commit hook
 * should have prevented this from ever landing in a commit, but the
 * render-time check is the final line of defense before publishing.
 */
function assertNoPlaceholders(e: AccessibilityLegalEntry): void {
  const fields: Array<[string, string | undefined]> = [
    ['accessibility_coordinator.name', e.accessibility_coordinator?.name],
    ['accessibility_coordinator.phone', e.accessibility_coordinator?.phone],
    ['accessibility_coordinator.email', e.accessibility_coordinator?.email],
    ['last_audit_date', e.last_audit_date],
  ];
  for (const [path, value] of fields) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(
        `Accessibility-statement frontmatter field "${path}" is missing or empty. ` +
          `IS 5568 / A11Y-04 requires a real value.`,
      );
    }
    if (value.includes(REQUIRES_USER_INPUT)) {
      throw new Error(
        `Accessibility-statement frontmatter field "${path}" still contains ` +
          `${REQUIRES_USER_INPUT}. Real values are required per IS 5568 / A11Y-04.`,
      );
    }
  }
}

export async function generateMetadata({
  params,
}: AccessibilityStatementProps): Promise<Metadata> {
  const { locale } = await params;
  const e = findEntry(locale);
  if (!e) return { title: 'Accessibility Statement' };
  return generateMetadataFor(PAGE_SLUG, locale, {
    title: e.title,
    description: e.description,
  });
}

export default async function AccessibilityStatementPage({
  params,
}: AccessibilityStatementProps) {
  const { locale } = await params;
  const e = findEntry(locale);
  if (!e) notFound();

  // Third-layer defense: render-time placeholder check.
  assertNoPlaceholders(e);
  // After assertNoPlaceholders, all four values are non-empty strings.
  const c = e.accessibility_coordinator as Required<AccessibilityCoordinator>;
  const lastAuditDate = e.last_audit_date as string;

  const webPageSchema = buildWebPage({
    slug: PAGE_SLUG,
    name: e.title,
    description: e.description,
    lang: locale,
  });

  const breadcrumbSchema = buildBreadcrumb({
    lang: locale,
    segments: [
      { slug: '', name: locale === 'he' ? 'דף הבית' : 'Home' },
      { slug: PAGE_SLUG, name: e.title },
    ],
  });

  const labels =
    locale === 'he'
      ? {
          coordinatorHeading: 'רכז/ת נגישות',
          nameLabel: 'שם',
          phoneLabel: 'טלפון',
          emailLabel: 'דוא"ל',
          lastAuditHeading: 'ביקורת אחרונה',
          lastAuditPrefix: 'הצהרה זו נסקרה לאחרונה ב-',
        }
      : {
          coordinatorHeading: 'Accessibility Coordinator',
          nameLabel: 'Name',
          phoneLabel: 'Phone',
          emailLabel: 'Email',
          lastAuditHeading: 'Last Audit',
          lastAuditPrefix: 'This statement was last reviewed on ',
        };

  // HE pages wrap phone/email in <span dir="ltr"> per AUD-024 + the
  // israeli-accessibility-compliance skill Step 6 template. EN keeps them
  // inline.
  const phoneAnchor = (
    <a
      href={`tel:${c.phone.replace(/\s+/g, '')}`}
      className="text-[var(--color-primary)] hover:underline"
    >
      {locale === 'he' ? <span dir="ltr">{c.phone}</span> : c.phone}
    </a>
  );
  const emailAnchor = (
    <a
      href={`mailto:${c.email}`}
      className="text-[var(--color-primary)] hover:underline"
    >
      {locale === 'he' ? <span dir="ltr">{c.email}</span> : c.email}
    </a>
  );

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <main id="legal-main" className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-[var(--color-ink)]">{e.title}</h1>
        <article className="prose prose-lg mt-6 max-w-none text-[var(--color-ink)]">
          <MDXContent code={e.body} />

          <section
            aria-labelledby="accessibility-coordinator-heading"
            className="mt-8 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
            data-section="accessibility-coordinator"
          >
            <h2
              id="accessibility-coordinator-heading"
              className="text-2xl font-semibold"
            >
              {labels.coordinatorHeading}
            </h2>
            <dl className="mt-4 grid gap-2">
              <div>
                <dt className="inline font-semibold">{labels.nameLabel}: </dt>
                <dd className="inline">{c.name}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">{labels.phoneLabel}: </dt>
                <dd className="inline">{phoneAnchor}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">{labels.emailLabel}: </dt>
                <dd className="inline">{emailAnchor}</dd>
              </div>
            </dl>
          </section>

          <section
            aria-labelledby="last-audit-heading"
            className="mt-6"
            data-section="last-audit"
          >
            <h2 id="last-audit-heading" className="text-2xl font-semibold">
              {labels.lastAuditHeading}
            </h2>
            <p className="mt-2">
              {labels.lastAuditPrefix}
              {locale === 'he' ? (
                <span dir="ltr">{lastAuditDate}</span>
              ) : (
                lastAuditDate
              )}
              .
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
