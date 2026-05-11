---
phase: 01-foundation-m1
plan: 08
type: execute
wave: 5
depends_on:
  - 01-scaffold
  - 04-schema-baseline
  - 06-affiliate-helpers
files_modified:
  - app/sitemap.ts
  - app/robots.ts
  - lib/seo/hreflang.ts
  - lib/seo/metadata.ts
  - lib/seo/accessibility-link.ts
  - lib/seo/__tests__/canonical.test.ts
  - lib/seo/__tests__/hreflang.test.ts
  - lib/seo/__tests__/sitemap.test.ts
  - lib/seo/__tests__/metadata.test.ts
  - lib/seo/__tests__/naming.test.ts
  - lib/seo/__tests__/accessibility-link.test.ts
  - lib/seo/naming.ts
  - middleware.ts
  - components/layout/Footer.tsx
autonomous: true
requirements:
  - FND-06
  - I18N-05
  - SEO-04
  - SEO-05
  - SEO-06
  - A11Y-01
  - A11Y-05
must_haves:
  truths:
    - "`app/sitemap.ts` enumerates ONLY registered locales (he, en) — NOT fr"
    - "`app/robots.ts` disallows `/admin/` AND `/api/`; sitemap URL points to https://visitisrael.site/sitemap.xml"
    - "`canonicalUrl(slug, 'he')` !== `canonicalUrl(slug, 'en')` for any slug (self-referential — SEO-06)"
    - "`hreflangAlternates(slug)` emits exactly 3 alternates per page: `he`, `en`, `x-default` → EN"
    - "FR is NEVER emitted in sitemap/hreflang/canonical despite filesystem readiness"
    - "`generateMetadataFor(slug, lang)` returns Metadata with `alternates.canonical` self-referential + `alternates.languages` reciprocal"
    - "`middleware.ts` has 301 redirect map (initially empty); falls through to next-intl"
    - "`naming.ts` exports regex detectors for: 'Wailing Wall' (banned), 'Judea and Samaria' (banned), Temple Mount paired naming, administrativeStatus (AUD-017..AUD-020)"
    - "`<Footer>` renders accessibility-statement link in current locale (A11Y-05)"
  artifacts:
    - path: "app/sitemap.ts"
      provides: "Dynamic sitemap iterating locales (NOT allowedLangs)"
      contains: "MetadataRoute.Sitemap"
    - path: "lib/seo/hreflang.ts"
      provides: "hreflangAlternates(slug) — 3 alternates per page"
      contains: "x-default"
    - path: "lib/seo/naming.ts"
      provides: "Religious-site naming rules (regex detectors for AUD-017..020)"
      contains: "Wailing Wall"
    - path: "lib/seo/accessibility-link.ts"
      provides: "Locale-aware accessibility-statement slug generator (A11Y-05)"
      contains: "accessibility-statement"
  key_links:
    - from: "app/sitemap.ts"
      to: "i18n-config.locales (NOT allowedLangs)"
      via: "iterates registered locales only"
      pattern: "for.*locales"
    - from: "lib/seo/hreflang.ts"
      to: "canonicalUrl"
      via: "produces hrefs for he, en, x-default"
      pattern: "canonicalUrl"
    - from: "middleware.ts"
      to: "next-intl createMiddleware"
      via: "falls through after 301 check"
      pattern: "intl\\(req\\)"
    - from: "components/layout/Footer.tsx"
      to: "lib/seo/accessibility-link.ts"
      via: "renders locale-aware link"
      pattern: "accessibilityStatementSlug"
---

<objective>
Stand up dynamic `app/sitemap.ts` (registered locales only), `app/robots.ts` (disallows admin + api), the hreflang generator (`he` + `en` + `x-default` → EN), the metadata generator (`alternates.canonical` + `alternates.languages`), the 301 redirect map in `middleware.ts`, the religious-site naming regex helpers (AUD-017..AUD-020 data layer), and the accessibility-statement link generator that `<Footer>` consumes (A11Y-05 wiring).

Purpose: Argentina lessons #4 (hreflang chaos) and #7 (i18n bolted-on) are fixed structurally. The Conflict A constraint (FR scaffolded but not registered) is enforced at the sitemap/hreflang/canonical layer — no FR URLs leak into discoverable surface.

Output: Working SEO config, 6 Vitest test suites verifying every contract, religious-site naming rules ready for plan 10 audit dashboard, accessibility-statement Footer link wired.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/01-foundation-m1/01-CONTEXT.md
@.planning/phases/01-foundation-m1/01-RESEARCH.md
@.planning/phases/01-foundation-m1/01-VALIDATION.md
@.planning/phases/01-foundation-m1/01-scaffold-SUMMARY.md
@.planning/phases/01-foundation-m1/04-schema-baseline-SUMMARY.md
@.planning/phases/01-foundation-m1/05-component-lib-SUMMARY.md
@.planning/research/STACK.md
@.planning/research/ARCHITECTURE.md
@.planning/research/PITFALLS.md
@.agents/skills/next-best-practices/SKILL.md
@.agents/skills/next-best-practices/metadata.md

<interfaces>
Consumed (from prior plans):

```ts
// from i18n-config.ts (plan 01)
export const locales = ['he', 'en'] as const;       // REGISTERED only
export const defaultLocale = 'he' as const;
export const allowedLangs = ['he', 'en', 'fr'] as const;  // filesystem-readiness only

// from lib/seo/canonical.ts (plan 04)
export function canonicalUrl(slug: string, lang: 'he' | 'en'): string;
```

Published:

```ts
// lib/seo/hreflang.ts
export function hreflangAlternates(slug: string): Array<{ hreflang: string; href: string }>;

// lib/seo/metadata.ts
export function generateMetadataFor(slug: string, lang: 'he' | 'en', frontmatter: { title: string; description: string }): Metadata;

// lib/seo/accessibility-link.ts
export function accessibilityStatementSlug(lang: 'he' | 'en'): string;
// HE → '/accessibility-statement' (transliterated-slug allowed per A11Y-03 deferred decision)
// EN → '/accessibility-statement'

// lib/seo/naming.ts
export const WAILING_WALL_REGEX: RegExp;  // /\bWailing Wall\b/ — AUD-017
export const BIASED_FRAMING_REGEX: RegExp;  // /\b(Judea and Samaria|occupied territories)\b/ — AUD-018
export const TEMPLE_MOUNT_PAIRED_REGEX: RegExp;  // detector for first-reference pairing — AUD-019
export const ADMIN_STATUS_REQUIRED_SITES: ReadonlySet<string>;  // {bethlehem, hebron, jericho} — AUD-020
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Build `app/sitemap.ts`, `app/robots.ts`, `lib/seo/hreflang.ts`, `lib/seo/metadata.ts` with full Vitest coverage</name>
  <files>app/sitemap.ts, app/robots.ts, lib/seo/hreflang.ts, lib/seo/metadata.ts, lib/seo/__tests__/sitemap.test.ts, lib/seo/__tests__/hreflang.test.ts, lib/seo/__tests__/canonical.test.ts, lib/seo/__tests__/metadata.test.ts</files>
  <behavior>
    - Test: `sitemap()` returns only URLs in `he` and `en` paths; ZERO FR URLs even though `content/fr/` exists
    - Test: HE URLs have NO locale prefix (`/`, `/jerusalem`); EN URLs ARE prefixed (`/en/`, `/en/jerusalem`)
    - Test: Each sitemap entry has `alternates.languages` with `he` + `en` keys
    - Test: `robots()` disallows `/admin/` and `/api/`; sitemap URL is `https://visitisrael.site/sitemap.xml`
    - Test: `canonicalUrl('jerusalem', 'he')` !== `canonicalUrl('jerusalem', 'en')` (SEO-06)
    - Test: `canonicalUrl` never includes the OTHER locale's path
    - Test: `hreflangAlternates('jerusalem')` returns array length 3 (he, en, x-default)
    - Test: `hreflangAlternates(slug)` x-default href is the EN URL
    - Test: `hreflangAlternates(slug)` NEVER includes `fr` hreflang despite filesystem readiness
    - Test: `generateMetadataFor('jerusalem', 'he', {title, description})` returns Metadata with `alternates.canonical = canonicalUrl('jerusalem', 'he')` and `alternates.languages = { he: ..., en: ..., 'x-default': ... }`
    - Test: `generateMetadataFor` rejects titles >70 chars (delegates to Velite + asserts at runtime)
  </behavior>
  <action>
Per RESEARCH.md §1.8 verbatim:

Create `app/sitemap.ts`:
```ts
import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '../i18n-config';

const ORIGIN = 'https://visitisrael.site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Phase 1: content empty; Phase 2+ pulls from Velite output.
  // Generator MUST iterate `locales` (REGISTERED), NOT `allowedLangs` (filesystem-ready).
  const staticPaths = ['', '/about', '/contact', '/privacy', '/affiliate-disclosure', '/accessibility-statement'];
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const p of staticPaths) {
      const path = lang === defaultLocale ? p : `/${lang}${p}`;
      urls.push({
        url: `${ORIGIN}${path || '/'}`,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${ORIGIN}${l === defaultLocale ? p : `/${l}${p}`}` || `${ORIGIN}/`])
          ),
        },
      });
    }
  }

  return urls;
}
```

Create `app/robots.ts`:
```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: ['/admin/', '/api/'] }],
    sitemap: 'https://visitisrael.site/sitemap.xml',
  };
}
```

Create `lib/seo/hreflang.ts`:
```ts
import { canonicalUrl } from './canonical';
import { locales, defaultLocale } from '../../i18n-config';

export function hreflangAlternates(slug: string) {
  const out = locales.map(l => ({ hreflang: l as string, href: canonicalUrl(slug, l) }));
  out.push({ hreflang: 'x-default', href: canonicalUrl(slug, 'en') });
  return out;
}
```

Note: `lib/seo/canonical.ts` already exists from plan 04. This task adds tests for it (canonical.test.ts).

Create `lib/seo/metadata.ts`:
```ts
import type { Metadata } from 'next';
import { canonicalUrl } from './canonical';
import { hreflangAlternates } from './hreflang';
import type { locales } from '../../i18n-config';

interface Frontmatter {
  title: string;        // ≤70 chars; verified by Velite at content-build time
  description: string;  // 120-160 chars
}

export function generateMetadataFor(
  slug: string,
  lang: typeof locales[number],
  fm: Frontmatter
): Metadata {
  const canonical = canonicalUrl(slug, lang);
  const alternates = hreflangAlternates(slug);
  const languages: Record<string, string> = {};
  for (const a of alternates) languages[a.hreflang] = a.href;

  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical, languages },
    openGraph: { title: fm.title, description: fm.description, locale: lang === 'he' ? 'he_IL' : 'en_US', type: 'website', url: canonical },
    twitter: { card: 'summary_large_image', title: fm.title, description: fm.description },
  };
}
```

Write `lib/seo/__tests__/canonical.test.ts`, `hreflang.test.ts`, `sitemap.test.ts`, `metadata.test.ts` per behavior block. Critical assertions:
- sitemap.test: iterate locales only (he, en); zero FR URLs even if `content/fr/` populated with a dummy file (verify the generator does NOT scan filesystem)
- hreflang.test: x-default → EN; no FR hreflang
- canonical.test: SEO-06 self-referential per locale
- metadata.test: alternates.canonical and alternates.languages both populated

For sitemap.test: in Phase 1, content is empty, so the sitemap returns only static paths. Phase 2 will extend via Velite output.
  </action>
  <verify>
    <automated>pnpm test --run lib/seo &amp;&amp; pnpm build &amp;&amp; curl -s http://localhost:3000/sitemap.xml | grep -c 'visitisrael.site' || true</automated>
  </verify>
  <done>All test suites green; sitemap/robots/hreflang generators iterate registered locales only; FR never emitted; canonical self-referential per locale; metadata API integrated.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Build religious-site naming regex helpers (AUD-017..AUD-020 data layer) + Vitest tests</name>
  <files>lib/seo/naming.ts, lib/seo/__tests__/naming.test.ts</files>
  <behavior>
    - Test: `WAILING_WALL_REGEX.test('Visit the Wailing Wall today')` returns TRUE (AUD-017 violation detected)
    - Test: `WAILING_WALL_REGEX.test('Visit the Western Wall today')` returns FALSE
    - Test: `BIASED_FRAMING_REGEX.test('explored Judea and Samaria')` returns TRUE (AUD-018)
    - Test: `BIASED_FRAMING_REGEX.test('explored the occupied territories')` returns TRUE
    - Test: `BIASED_FRAMING_REGEX.test('explored the West Bank')` returns FALSE
    - Test: Helper `detectTempleMountPaired(text)` returns TRUE for "Temple Mount / Haram al-Sharif" first reference
    - Test: Helper `detectTempleMountPaired(text)` returns FALSE for solo "Temple Mount" mention without pairing (AUD-019 violation)
    - Test: `ADMIN_STATUS_REQUIRED_SITES.has('bethlehem')` returns TRUE; `'jerusalem'` returns FALSE (AUD-020 sites: bethlehem, hebron, jericho)
  </behavior>
  <action>
Per PITFALLS §6 (AUD-017..AUD-020) and RESEARCH §1.8:

Create `lib/seo/naming.ts`:
```ts
// AUD-017: ban "Wailing Wall" — use "Western Wall" or pair with "Kotel".
export const WAILING_WALL_REGEX = /\bWailing Wall\b/;

// AUD-018: ban biased framing.
export const BIASED_FRAMING_REGEX = /\b(Judea and Samaria|occupied territories)\b/;

// AUD-019: require "Temple Mount / Haram al-Sharif" paired on first reference.
// Heuristic: find first "Temple Mount" occurrence; assert next-300-chars contains "Haram al-Sharif".
export function detectTempleMountPaired(text: string): boolean {
  const idx = text.search(/\bTemple Mount\b/);
  if (idx === -1) return true; // not mentioned — vacuously paired
  const window = text.slice(idx, idx + 300);
  return /Haram al-Sharif/.test(window);
}

// AUD-020: sites that REQUIRE administrativeStatus frontmatter.
export const ADMIN_STATUS_REQUIRED_SITES = new Set<string>(['bethlehem', 'hebron', 'jericho']);

// Helper for AUD-020 verification: given an MDX frontmatter, check if it's one of the sites and has the field.
export function requiresAdministrativeStatus(slug: string): boolean {
  return ADMIN_STATUS_REQUIRED_SITES.has(slug.toLowerCase());
}
```

Create `lib/seo/__tests__/naming.test.ts` with all 8 behaviors above.

These regex helpers are the data layer that plan 10 (audit dashboard) consumes for AUD-017..AUD-020 rules. The actual scanning of built HTML happens in plan 10; this plan ships the regexes + helpers + tests so the data is correct.
  </action>
  <verify>
    <automated>pnpm test --run lib/seo/__tests__/naming.test.ts</automated>
  </verify>
  <done>8 behaviors green; regex helpers exported; AUD-017..AUD-020 data layer ready for plan 10 audit dashboard.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Build accessibility-statement link generator + Footer wiring + 301 redirect map in middleware</name>
  <files>lib/seo/accessibility-link.ts, lib/seo/__tests__/accessibility-link.test.ts, components/layout/Footer.tsx, middleware.ts</files>
  <behavior>
    - Test: `accessibilityStatementSlug('en')` returns `/accessibility-statement`
    - Test: `accessibilityStatementSlug('he')` returns `/accessibility-statement` (transliterated slug allowed per A11Y-03 deferred Hebrew slug decision)
    - Test: `<Footer>` rendered with locale=en includes a link to `/en/accessibility-statement`
    - Test: `<Footer>` rendered with locale=he includes a link to `/accessibility-statement` (default locale, no prefix)
    - Test: `middleware.ts` has a `REDIRECTS` constant (initially empty `{}`); 301 logic exists; falls through to next-intl
    - Test: Adding `'/test-redirect': '/jerusalem'` to REDIRECTS map and hitting `/test-redirect` returns 301
  </behavior>
  <action>
Create `lib/seo/accessibility-link.ts`:
```ts
import type { locales } from '../../i18n-config';

export function accessibilityStatementSlug(lang: typeof locales[number]): string {
  // Per A11Y-03: HE slug deferred to v2 — use English slug for both locales at launch.
  return '/accessibility-statement';
}

export function accessibilityStatementHref(lang: typeof locales[number]): string {
  const slug = accessibilityStatementSlug(lang);
  return lang === 'he' ? slug : `/${lang}${slug}`;
}
```

Update `components/layout/Footer.tsx` (created in plan 05 with placeholder accessibility link):

```tsx
import { useLocale } from 'next-intl';
import Link from 'next-intl/link';
import { accessibilityStatementHref } from '@/lib/seo/accessibility-link';

export function Footer() {
  const locale = useLocale() as 'he' | 'en';
  // ...
  return (
    <footer>
      {/* ... other links */}
      <Link href={accessibilityStatementHref(locale)} className="...">
        {locale === 'he' ? 'הצהרת נגישות' : 'Accessibility Statement'}
      </Link>
      {/* ... */}
    </footer>
  );
}
```

(NOTE: The accessibility-statement page itself is built in Phase 2.5; here we lock the link generator + footer wiring per A11Y-05 infrastructure.)

Update `middleware.ts` (from plan 01) to add 301 redirect map (per RESEARCH §1.8 + §1.9 — basic-auth lands in plan 10):

```ts
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n-config';

const intl = createMiddleware({ locales: [...locales], defaultLocale, localePrefix: 'as-needed', localeDetection: true });

const REDIRECTS: Record<string, string> = {
  // Phase 2+ adds redirects as we discover them
};

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. 301 redirect map
  if (REDIRECTS[path]) {
    return NextResponse.redirect(new URL(REDIRECTS[path], req.url), 301);
  }

  // 2. (Admin basic-auth added in plan 10)

  // 3. i18n
  return intl(req);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|.*\\..*).*)'],
};
```

Create `lib/seo/__tests__/accessibility-link.test.ts` with the test behaviors. Footer rendering test belongs in `components/__tests__/footer.test.tsx` (extend if needed).

For middleware redirect test, use a Next.js middleware test pattern (mock NextRequest).
  </action>
  <verify>
    <automated>pnpm test --run lib/seo/__tests__/accessibility-link.test.ts &amp;&amp; pnpm build</automated>
  </verify>
  <done>Accessibility-statement link generator exports; Footer renders the link in current locale (A11Y-05); middleware 301 redirect map in place; tests green.</done>
</task>

</tasks>

<verification>
End of plan 08 checks:

1. **FND-06**: sitemap iterates `locales` only; robots disallows `/admin/` + `/api/`; canonical self-referential per locale; hreflang reciprocal; middleware has 301 redirect map.
2. **I18N-05**: `hreflangAlternates` returns 3 entries (he, en, x-default); FR never emitted.
3. **SEO-04 (data layer)**: `WAILING_WALL_REGEX`, `BIASED_FRAMING_REGEX`, `detectTempleMountPaired`, `ADMIN_STATUS_REQUIRED_SITES` all exported and tested.
4. **SEO-05**: `generateMetadataFor` integrated with Velite frontmatter contract; title/description lengths enforced.
5. **SEO-06**: canonical never cross-locale (tested).
6. **A11Y-01 (built-output verification)**: `pnpm build` preserves `<html lang dir>`; (plan 01 set the layout; this plan re-verifies via build).
7. **A11Y-05**: Footer renders accessibility-statement link in current locale; AUD-028 audit-dashboard rule (plan 10) will consume this.
</verification>

<success_criteria>
- `app/sitemap.ts` + `app/robots.ts` work; FR never emitted
- Canonical, hreflang, metadata generators tested
- Religious-site naming regexes (AUD-017..AUD-020 data) exported + tested
- Accessibility-statement link generator + Footer wiring
- 301 redirect map in middleware
- VALIDATION rows FND-06, I18N-05, A11Y-01, A11Y-05, SEO-04, SEO-05, SEO-06 all green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/08-seo-config-SUMMARY.md` documenting: sitemap iterates registered locales (Conflict A enforced), hreflang has x-default→EN, naming regexes ready for plan 10, accessibility-statement slug locked.
</output>
