/**
 * Global 404 page (no locale context).
 *
 * Phase 2 plan 05 Task 4 — Rule 2 deviation (auto-add missing critical
 * functionality): the audit found `_not-found.html` was being auto-generated
 * by Next.js with a bare `<html>` element (no lang, no dir, no footer link),
 * violating AUD-027 (WCAG 3.1.1 + IS-5568 §3.1) and AUD-028 (IS-5568 footer
 * link mandate) site-wide.
 *
 * The Phase 1 layout structure puts `<html>` inside `app/[locale]/layout.tsx`,
 * so there is no root `app/layout.tsx`. Next.js consequently auto-generates
 * a minimal HTML scaffold for the bare `/_not-found` route. This file owns
 * that scaffold explicitly: `<html lang="he" dir="rtl">` (the project's
 * `defaultLocale`) plus a single anchor to `/accessibility-statement` so the
 * IS-5568 footer-link mandate is satisfied even on the global 404.
 *
 * In practice middleware adds a locale prefix to bare requests (`localePrefix:
 * 'as-needed'` + `localeDetection: true`), so production 404 traffic almost
 * always hits a locale-routed not-found instead. This file is the safety net
 * for the static build artifact + any edge case where middleware is bypassed.
 *
 * No next-intl context is available here (we are outside `[locale]/`), so
 * copy is bilingual inline (HE primary, EN secondary) and links are plain
 * anchors to the HE-default URLs.
 */
import Link from 'next/link';
import { ACCESSIBILITY_SLUG } from '@/lib/seo/accessibility-link';
import { defaultLocale, localeDirection } from '@/i18n-config';

export default function NotFound() {
  // Bilingual labels — HE primary per defaultLocale.
  const heading = 'הדף לא נמצא — Page not found';
  const description =
    'הקישור שביקשתם אינו קיים או הוסר. / The link you requested does not exist or was moved.';
  const homeLabel = 'חזרה לעמוד הבית / Return home';
  const accessibilityLabel = 'הצהרת נגישות / Accessibility statement';

  return (
    <html lang={defaultLocale} dir={localeDirection[defaultLocale]}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 — הדף לא נמצא / Page not found</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <main
          id="main-content"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
            {heading}
          </h2>
          <p style={{ maxWidth: '32rem', margin: '0 0 2rem 0' }}>
            {description}
          </p>
          <Link
            href="/"
            style={{
              color: 'blue',
              textDecoration: 'underline',
              padding: '0.5rem 1rem',
            }}
          >
            {homeLabel}
          </Link>
        </main>
        <footer
          role="contentinfo"
          style={{
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '1px solid lightgray',
            fontSize: '0.875rem',
          }}
        >
          <a
            href={`/${ACCESSIBILITY_SLUG}`}
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            {accessibilityLabel}
          </a>
        </footer>
      </body>
    </html>
  );
}
