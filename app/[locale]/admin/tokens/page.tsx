import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * Visual design-token review route — every semantic + component token from
 * `app/globals.css` rendered in one place for design QA, IS 5568 contrast
 * spot-check, and Hebrew typography validation.
 *
 * Plan 02 (design tokens) ships this; plan 10 (audit dashboard) will gate
 * `/admin/*` behind basic-auth middleware.
 *
 * Per RESEARCH §1.2 + plan task 3:
 *   - noindex/nofollow at the page level (it is NOT linked from public nav)
 *   - rendered as a Server Component (no client interactivity required)
 *   - lints clean — only logical utilities (ms-/me-/ps-/pe-/start-/end-/
 *     text-start/text-end) and semantic tokens via `bg-[var(--color-…)]`
 *     bracket notation; ZERO raw hex; ZERO physical directional utilities
 *
 * Visited at `/admin/tokens/` (HE root) and `/en/admin/tokens/` (EN prefix).
 */

export const metadata: Metadata = {
  title: 'Design Tokens — Visual Review',
  description:
    'Internal design-token review surface. Renders every semantic + component token in app/globals.css for design QA.',
  robots: { index: false, follow: false },
};

// All tokens live in `app/globals.css` under @theme {}. Render them via
// `bg-[var(--color-…)]` so the page itself exercises the SAME consumption
// pattern downstream components will use.

interface Swatch {
  name: string;
  cssVar: string;
  note?: string;
}

const colorSwatches: Array<Swatch> = [
  { name: 'primary', cssVar: '--color-primary', note: 'blue-700 (action)' },
  {
    name: 'primary-hover',
    cssVar: '--color-primary-hover',
    note: 'blue-800',
  },
  { name: 'accent', cssVar: '--color-accent', note: 'sand-600' },
  { name: 'surface', cssVar: '--color-surface', note: 'stone-50 (page bg)' },
  {
    name: 'surface-elevated',
    cssVar: '--color-surface-elevated',
    note: 'pure white (cards)',
  },
  { name: 'ink', cssVar: '--color-ink', note: 'stone-900 (body text)' },
  {
    name: 'ink-muted',
    cssVar: '--color-ink-muted',
    note: 'stone-600 (secondary)',
  },
  { name: 'border', cssVar: '--color-border', note: 'stone-200' },
  { name: 'success', cssVar: '--color-success', note: 'olive-600' },
  { name: 'warning', cssVar: '--color-warning', note: 'sand-700' },
  { name: 'danger', cssVar: '--color-danger', note: 'oklch warm red' },
];

const componentSwatches: Array<Swatch> = [
  { name: 'button-bg-primary', cssVar: '--button-bg-primary' },
  {
    name: 'button-text-primary',
    cssVar: '--button-text-primary',
    note: 'white on primary',
  },
  { name: 'card-bg', cssVar: '--card-bg' },
  { name: 'card-border', cssVar: '--card-border' },
  { name: 'hero-overlay', cssVar: '--hero-overlay', note: '35% black' },
];

const spacingTokens: Array<{ name: string; cssVar: string }> = [
  { name: 'spacing-1', cssVar: '--spacing-1' },
  { name: 'spacing-2', cssVar: '--spacing-2' },
  { name: 'spacing-3', cssVar: '--spacing-3' },
  { name: 'spacing-4', cssVar: '--spacing-4' },
  { name: 'spacing-5', cssVar: '--spacing-5' },
  { name: 'spacing-6', cssVar: '--spacing-6' },
  { name: 'spacing-7', cssVar: '--spacing-7' },
  { name: 'spacing-8', cssVar: '--spacing-8' },
  { name: 'spacing-9', cssVar: '--spacing-9' },
  { name: 'spacing-10', cssVar: '--spacing-10' },
  { name: 'spacing-11', cssVar: '--spacing-11' },
  { name: 'spacing-12', cssVar: '--spacing-12' },
  { name: 'spacing-card', cssVar: '--spacing-card' },
  { name: 'spacing-section', cssVar: '--spacing-section' },
  { name: 'spacing-hero', cssVar: '--spacing-hero' },
];

const radiusTokens: Array<{ name: string; cssVar: string }> = [
  { name: 'radius-xs', cssVar: '--radius-xs' },
  { name: 'radius-sm', cssVar: '--radius-sm' },
  { name: 'radius-md', cssVar: '--radius-md' },
  { name: 'radius-lg', cssVar: '--radius-lg' },
  { name: 'radius-xl', cssVar: '--radius-xl' },
  { name: 'radius-full', cssVar: '--radius-full' },
];

const leadingTokens: Array<{ name: string; cssVar: string; sample: string }> = [
  {
    name: 'leading-hebrew-tight',
    cssVar: '--leading-hebrew-tight',
    sample:
      'לורם איפסום דולור סיט אמת. ירושלים היא בירת ישראל וביתם של אתרים קדושים לשלוש דתות.',
  },
  {
    name: 'leading-hebrew',
    cssVar: '--leading-hebrew',
    sample:
      'לורם איפסום דולור סיט אמת. ירושלים היא בירת ישראל וביתם של אתרים קדושים לשלוש דתות.',
  },
  {
    name: 'leading-hebrew-relaxed',
    cssVar: '--leading-hebrew-relaxed',
    sample:
      'לורם איפסום דולור סיט אמת. ירושלים היא בירת ישראל וביתם של אתרים קדושים לשלוש דתות.',
  },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12 border-b border-[var(--color-border)] pb-8">
      <h2 className="mb-4 text-2xl font-semibold text-[var(--color-ink)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ColorSwatchTile({ name, cssVar, note }: Swatch) {
  return (
    <li className="flex items-center gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3">
      <div
        aria-hidden
        className="h-12 w-12 shrink-0 rounded-md border border-[var(--color-border)]"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="text-sm">
        <div className="font-mono text-[var(--color-ink)]">{cssVar}</div>
        <div className="text-[var(--color-ink-muted)]">
          {name}
          {note ? ` — ${note}` : ''}
        </div>
      </div>
    </li>
  );
}

export default function TokensPage() {
  return (
    <main className="mx-auto max-w-5xl py-12 ps-6 pe-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">
          Design Tokens — Visual Review
        </h1>
        <p className="mt-2 text-[var(--color-ink-muted)]">
          Every semantic + component token from{' '}
          <code className="font-mono">app/globals.css</code> rendered in one
          place for design QA, IS 5568 contrast spot-check, and Hebrew
          typography validation. This route is <strong>noindex/nofollow</strong>{' '}
          and not linked from public navigation (plan 10 will add basic-auth
          middleware to <code className="font-mono">/admin/*</code>).
        </p>
      </header>

      <Section title="Colors — semantic layer">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {colorSwatches.map((s) => (
            <ColorSwatchTile key={s.cssVar} {...s} />
          ))}
        </ul>
      </Section>

      <Section title="Colors — component layer">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {componentSwatches.map((s) => (
            <ColorSwatchTile key={s.cssVar} {...s} />
          ))}
        </ul>
      </Section>

      <Section title="Typography — Hebrew (Heebo / Assistant / Noto Sans Hebrew)">
        <div
          className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
          style={{ fontFamily: 'var(--font-hebrew)' }}
        >
          <p className="text-4xl text-[var(--color-ink)]">לבקר בישראל</p>
          <p className="mt-2 text-2xl text-[var(--color-ink)]">
            ירושלים, תל אביב, חיפה
          </p>
          <p className="mt-2 text-base text-[var(--color-ink-muted)]">
            לורם איפסום דולור סיט אמת — Heebo at 16px / base
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            לורם איפסום — Heebo at 14px / sm
          </p>
        </div>
      </Section>

      <Section title="Typography — Hebrew serif (Frank Ruhl Libre)">
        <div
          className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
          style={{ fontFamily: 'var(--font-hebrew-serif)' }}
        >
          <p className="text-4xl text-[var(--color-ink)]">העיר העתיקה</p>
          <p className="mt-2 text-base text-[var(--color-ink-muted)]">
            לורם איפסום — Frank Ruhl Libre at base for editorial / quotation
            use.
          </p>
        </div>
      </Section>

      <Section title="Leading — Hebrew scale">
        <div className="space-y-4">
          {leadingTokens.map((l) => (
            <div
              key={l.cssVar}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4"
            >
              <div className="mb-2 font-mono text-xs text-[var(--color-ink-muted)]">
                {l.cssVar}
              </div>
              <p
                className="text-[var(--color-ink)]"
                style={{
                  fontFamily: 'var(--font-hebrew)',
                  lineHeight: `var(${l.cssVar})`,
                }}
              >
                {l.sample}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing scale">
        <ul className="space-y-2">
          {spacingTokens.map((s) => (
            <li
              key={s.cssVar}
              className="flex items-center gap-4 text-sm text-[var(--color-ink)]"
            >
              <span className="w-40 font-mono text-xs text-[var(--color-ink-muted)]">
                {s.cssVar}
              </span>
              <span
                aria-hidden
                className="block h-3 rounded-sm bg-[var(--color-primary)]"
                style={{ width: `var(${s.cssVar})` }}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Radius scale">
        <ul className="flex flex-wrap gap-4">
          {radiusTokens.map((r) => (
            <li key={r.cssVar} className="flex flex-col items-center gap-2">
              <span
                aria-hidden
                className="block h-16 w-16 bg-[var(--color-accent)]"
                style={{ borderRadius: `var(${r.cssVar})` }}
              />
              <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                {r.name}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Component samples">
        <div className="flex flex-wrap items-start gap-6">
          {/* Sample button using --button-bg-primary + --button-text-primary */}
          <button
            type="button"
            className="rounded-md bg-[var(--button-bg-primary)] px-5 py-2 font-medium text-[var(--button-text-primary)] hover:bg-[var(--color-primary-hover)]"
          >
            Primary button
          </button>

          {/* Sample card using --card-bg + --card-border */}
          <article className="max-w-sm rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
            <h3 className="text-lg font-semibold text-[var(--color-ink)]">
              Sample card
            </h3>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Uses <code className="font-mono">--card-bg</code> +{' '}
              <code className="font-mono">--card-border</code>. This is the
              shape every region / sub-destination card will adopt in plan 05.
            </p>
          </article>

          {/* Sample hero with --hero-overlay */}
          <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg bg-[var(--color-accent)]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ backgroundColor: 'var(--hero-overlay)' }}
            />
            <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-[var(--button-text-primary)]">
              Hero with --hero-overlay
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
