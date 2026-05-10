# Stack Research — Discover Israel

**Domain:** Tourism affiliate website (Israel, bilingual EN+HE minimum, Vercel deploy)
**Researched:** 2026-05-11
**Overall confidence:** HIGH (Next.js, i18n, image pipeline, schema, ESLint) / MEDIUM (affiliate URL templates — verified via official docs but AID parameters are partner-controlled and may change) / LOW only for Klook & GoCity Israel SKU breadth (operate globally but Israel inventory thin)

> Downstream consumers: Phase 1.1 (scaffold), 1.4 (affiliate infra), 1.5 (photo credits ledger), 1.10 (Lighthouse CI gate). Every recommendation in this doc is prescriptive — "Use X because Y," not "Consider X or Y."

---

## 0. Executive Summary

| Layer | Recommendation | Confidence |
|---|---|---|
| **Framework** | Next.js **15.5.x** (LTS-class, App Router) — NOT Next.js 16 | HIGH |
| **Language** | TypeScript 5.6+, `strict: true` | HIGH |
| **Styling** | Tailwind CSS **v4** (CSS-first `@theme`) | HIGH |
| **i18n** | `next-intl` v3.x (RSC-native, App Router-first) | HIGH |
| **RTL** | Native `dir="rtl"` on `<html>` per locale + Tailwind logical utilities (`ms-/me-/ps-/pe-/start-/end-`) + `rtl:` variant for icon mirroring | HIGH |
| **Image pipeline** | `next/image` with `deviceSizes: [320,640,1024,1600]`, AVIF+WebP, custom credits-ledger CI gate | HIGH |
| **Schema** | `schema-dts` (Google) for type-safe JSON-LD; rendered via native `<script type="application/ld+json">` in RSC | HIGH |
| **Lighthouse CI** | `@lhci/cli` (official Google), 3-run median, GitHub Actions gate | HIGH |
| **Linting** | ESLint flat config + `eslint-plugin-tailwindcss` (`no-arbitrary-value`) + custom `no-restricted-syntax` rules for partner URLs | HIGH |
| **Git hooks** | `husky` + `lint-staged` (fast pre-commit) + custom Node script for photo-credits validation | HIGH |
| **Affiliates** | 9 of 11 verified operational in Israel; **Klook and GoCity have weak Israel inventory** — defer to Phase 2.5 (see §3) | MEDIUM |

**One non-negotiable: NO accessibility overlays (accessiBe, UserWay, EqualWeb).** The FTC fined accessiBe $1M in 2024 for false WCAG claims; 25% of 2024 a11y lawsuits targeted sites *using* overlays. IS 5568 enforces statutory damages of up to ~NIS 50,000 per violation without proof of harm. Native semantic HTML + ARIA + a Hebrew-language Accessibility Statement page is the only defensible path. (Source: [accessiBe FTC fine — CTech](https://www.calcalistech.com/ctechnews/article/8t638u9lm), [Accessibility.Works on overlay lawsuits](https://www.accessibility.works/blog/avoid-accessibility-overlay-tools-toolbar-plugins/), [BOIA on IS 5568](https://www.boia.org/blog/israels-digital-accessibility-laws-an-overview))

---

## 1. Stack Components

### 1.1 Core Technologies

| Technology | Version | Purpose | Why |
|---|---|---|---|
| **Next.js** | 15.5.x (App Router) | Framework | Stable, production-proven, full App Router maturity, native i18n routing, native JSON-LD pattern documented. Next.js 16 (Oct 2025) is stable but introduces middleware → proxy rename and Turbopack default, which adds migration noise during foundation. Lock at 15.5.x through Phase 2 (pilot), revisit at Phase 3. |
| **React** | 19.x | UI runtime | Bundled with Next.js 15 via canary, includes Server Components, Server Actions, `use()` hook. Tree-shaking improvements measurably help LCP. |
| **TypeScript** | 5.6+ | Type system | `strict: true` is non-negotiable per project constraints. `verbatimModuleSyntax: true` reduces import bugs. |
| **Tailwind CSS** | **v4.0+** | Styling | v4 introduces CSS-first `@theme` configuration which is what `hebrew-tailwind-preset` skill targets. v4 also has full RTL logical-property support built-in (v3 needed plugins). Bundles via Lightning CSS — faster, smaller. |
| **next-intl** | 3.x | i18n | Purpose-built for App Router, RSC-native, type-safe message keys. ~4× growth in 2025. Better DX than `next-i18next` (Pages-Router legacy) or hand-rolled. ICU message format handles Hebrew plurals and grammatical gender natively. |
| **schema-dts** | 1.x | JSON-LD types | Maintained by Google. ~100k+ weekly downloads. Provides TypeScript discriminated unions for every Schema.org type including `TouristAttraction`, `TouristDestination`, `ReligiousBuilding`, `LocalBusiness`. Catches schema mistakes at build-time instead of in Search Console months later. |
| **@lhci/cli** | 0.14+ (Lighthouse 12.x) | Lighthouse CI | Google-official. Native support for `numberOfRuns: 3` + `aggregationMethod: median`. ~2M monthly npm downloads. Renders historical reports in Vercel preview comments. |

### 1.2 Supporting Libraries

| Library | Version | Purpose | When to Use |
|---|---|---|---|
| `next/image` | (built-in) | Responsive images with srcset | Always. Configure `deviceSizes` to `[320, 640, 1024, 1600]` and `formats: ['image/avif', 'image/webp']` in `next.config.ts`. |
| `next/font` | (built-in) | Hebrew web font self-hosting | Load Heebo + Assistant via `next/font/google` with `display: 'swap'` and subsets `['hebrew', 'latin']`. Self-hosting avoids the CLS hit + the GDPR concerns of Google Fonts CDN. |
| `clsx` + `tailwind-merge` | latest | Class composition | For conditional Tailwind classes in components. Pair with `tw()` helper to dedupe conflicting classes. |
| `zod` | 3.x | Runtime validation | Validate `data/photo-credits.json` entries at build time. Validate affiliate helper input options. |
| `eslint` | 9.x (flat config) | Linting | ESLint 9 flat config is required for current `eslint-plugin-tailwindcss` and TypeScript-ESLint 8. |
| `eslint-plugin-tailwindcss` | 3.18+ | Tailwind lint rules | Enables `no-arbitrary-value` (banning `bg-[#abc]`), `classnames-order`, `no-unnecessary-arbitrary-value`. |
| `@typescript-eslint/*` | 8.x | TS lint | Strict + stylistic + type-checked configs. |
| `husky` | 9.x | Git hooks | Pre-commit gate. |
| `lint-staged` | 15.x | Hook runner | Run ESLint + Prettier only on staged files (fast). |
| `vitest` | 2.x | Unit tests | Test affiliate helpers (mega prompt requires 4+ tests per helper). Faster than Jest, ESM-native, no Babel. |
| `playwright` | 1.48+ | E2E (Phase 2.6) | Lighthouse CI alone doesn't catch hreflang/canonical/schema correctness end-to-end. Light usage — smoke per page. |
| `sharp` | (auto via next/image) | Image optimization | Bundled by Next.js Image Optimization API. Don't install separately unless on a custom build pipeline. |

### 1.3 Development Tools

| Tool | Purpose | Notes |
|---|---|---|
| `pnpm` | Package manager | Strict node_modules layout catches phantom dependency bugs. Vercel native support. |
| `Vercel CLI` | Deploy | `vercel env pull` for AID env var sync. |
| `Lighthouse User Flow API` (via `@lhci/cli`) | Performance probe | 3-run median; report artifacts uploaded to LHCI server (free Vercel-hosted endpoint). |

### 1.4 Installation

```bash
# Core framework (Phase 1.1)
pnpm add next@^15.5 react@^19 react-dom@^19 typescript@^5.6
pnpm add next-intl@^3
pnpm add schema-dts

# Styling (Phase 1.1 + 1.2)
pnpm add -D tailwindcss@^4 @tailwindcss/postcss
pnpm add clsx tailwind-merge

# Utilities
pnpm add zod

# Lint + format + hooks (Phase 1.1)
pnpm add -D eslint@^9 @typescript-eslint/eslint-plugin@^8 @typescript-eslint/parser@^8
pnpm add -D eslint-plugin-tailwindcss eslint-plugin-react eslint-plugin-react-hooks
pnpm add -D eslint-config-next  # Next.js 15 rules
pnpm add -D prettier prettier-plugin-tailwindcss
pnpm add -D husky lint-staged

# Test (Phase 1.4 — affiliate helpers)
pnpm add -D vitest @vitest/coverage-v8

# Lighthouse CI (Phase 1.10)
pnpm add -D @lhci/cli

# E2E (Phase 2.6)
pnpm add -D @playwright/test
```

---

## 2. RTL + i18n Canon for Hebrew + English (2026)

Confirming the assumption: **Next.js 15 App Router + `next-intl` is correct.** Three findings:

1. **`dir` attribute belongs on `<html>`, not on per-page wrappers.** Set in `app/[locale]/layout.tsx` based on `params.locale`:
   ```tsx
   const isRtl = locale === 'he';
   return <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>...</html>;
   ```
   Per `hebrew-tailwind-preset` skill: do NOT use `direction: rtl` in CSS. The HTML attribute is what Tailwind's `rtl:` variant and CSS logical properties read from.

2. **Use logical Tailwind utilities exclusively.** Replace every `ml-/mr-/pl-/pr-/text-left/text-right/border-l/border-r/rounded-l/rounded-r` with the start/end equivalents. The ESLint config (§6) will catch violations. Test: rendering the homepage with `dir="rtl"` on `<html>` should flip the entire layout with zero per-component logic.

3. **`space-x-*` does NOT respect direction.** Use `gap-*` with flex/grid instead. (Documented gotcha in `hebrew-tailwind-preset`.) Codify in the component library.

4. **Hebrew font stack:** Heebo (UI) + Assistant (body) + Frank Ruhl Libre (display headings only). Load via `next/font/google` with `display: 'swap'` and explicit `subsets: ['hebrew', 'latin']` to avoid FOIT.

5. **Bidirectional content:** When embedding Latin text inside Hebrew (e.g., a hotel name "Dan Tel Aviv" inside a Hebrew sentence), wrap in `<span dir="ltr">`. The Hebrew Tailwind preset's typography example covers this.

6. **`next-intl` routing config:** Use locale-prefix `'always'` even for the default locale. Without it, Google indexes `/about` and `/en/about` as duplicates. Set the `localePrefix` config and validate hreflang in the audit dashboard.

---

## 3. Affiliate Matrix for Israel (R4 enrichment)

**Verification methodology:** WebSearched each partner's affiliate program page + Israel inventory page in 2026. Confidence ratings reflect URL stability and Israel SKU breadth.

### 3.1 Operational matrix

| # | Partner | Operates in Israel? | Israeli traffic OK? | Network | Env var | URL template | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | **Booking.com** | ✓ YES — 28M+ accommodations globally, Israeli market active | ✓ YES via **CJ Affiliate** (their Middle East region) | CJ Affiliate (Eastern Europe / Middle East), Awin (other regions), or direct Partner Hub | `NEXT_PUBLIC_BOOKING_AID` | `https://www.booking.com/searchresults.html?ss={destination}&aid={AID}&label={SLUG}` | HIGH | URL param is `aid` (confirmed from Booking affiliate KB). Add `label` param per page for granular tracking. |
| 2 | **Civitatis** | ✓ YES — extensive Jerusalem + Tel Aviv + multi-day Israel tours catalog | ✓ YES, no Israeli traffic restriction documented | Direct (Civitatis Partners) | `NEXT_PUBLIC_CIVITATIS_AID` | `https://www.civitatis.com/en/{city-slug}/?aid={AID}` (deep-link to product also supported) | HIGH | Direct program, EUR-denominated payouts. URL slugs: `israel`, `jerusalem`, `tel-aviv`. |
| 3 | **Viator (Tripadvisor)** | ✓ YES — Israel tours catalog active (Tel Aviv, Haifa, Jerusalem, Bethlehem-from-Haifa-Port) | ✓ YES, global program accepts Israel traffic | Direct via `partnerresources.viator.com` (auto-join if Tripadvisor account exists) | `NEXT_PUBLIC_VIATOR_PID` | `https://www.viator.com/Israel/d919-ttd?pid={PID}&mcid={MCID}` (PID + optional MCID per campaign) | HIGH | `d919` = Israel destination ID; `d920` = Tel Aviv; `d921` = Jerusalem. 8% std, 10% holiday boost. |
| 4 | **GetYourGuide** | ✓ YES — Israel L169033 destination active with 2026 tours | ✓ YES, global program | Direct via `partner.getyourguide.com` or Awin (`merchant 18925`) | `NEXT_PUBLIC_GYG_PARTNER_ID` | `https://www.getyourguide.com/israel-l169033/?partner_id={PARTNER_ID}` | HIGH | 8% min commission. L-codes: Israel=l169033, Jerusalem=l97, Tel Aviv=l487. |
| 5 | **Rentalcars.com** | ✓ YES — Booking.com subsidiary, Israeli pickup locations (BGN, TLV, JRS) | ✓ YES via Booking's network consolidation | CJ Affiliate (global) or Awin | `NEXT_PUBLIC_RENTALCARS_AFFILIATE_CODE` | `https://www.rentalcars.com/?affiliateCode={CODE}&preflang=en&dropCountry=il` | HIGH | 6% commission. Note Booking is consolidating Rentalcars → unified Awin distribution. |
| 6 | **SafetyWing** | ✓ YES — 180+ countries; Israel NOT in their exclusion list (only NK, Syria, Cuba, Iran are excluded) | ✓ YES — global program | Direct (SafetyWing Ambassador / Impact) | `NEXT_PUBLIC_SAFETYWING_REFERRAL_ID` | `https://safetywing.com/nomad-insurance?referenceID={REF_ID}` | HIGH | Hebrew checkout not provided; consider an EN-only CTA on HE pages. Nomad Insurance is the right SKU (Travel SKU also available). |
| 7 | **Skyscanner** | ✓ YES — global flight metasearch, Israeli airports indexed (TLV, ETM, HFA) | ✓ YES via **Impact** | Impact Radius | `NEXT_PUBLIC_SKYSCANNER_AID` | `https://www.skyscanner.net/transport/flights/{origin}/{tlv}/?associateid={AID}` | HIGH | Eligibility threshold: 5,000 monthly visitors. Apply post-launch when traffic exists. Until then, helper returns public URL (codemod-ready per mega-prompt pattern). |
| 8 | **Hostelworld** | ✓ YES — 36,000+ properties; multiple Tel Aviv (Abraham, Spot, 180 Boutique) + Jerusalem (Abraham, Heritage House) hostels listed | ✓ YES via **Partnerize** (primary) or CJ Affiliate (Europe) | Partnerize / CJ / Awin (regional) | `NEXT_PUBLIC_HOSTELWORLD_PARTNER_ID` | `https://www.hostelworld.com/hostels/asia/israel/{city}/?dateFrom={iso}&dateTo={iso}&affId={ID}` | HIGH | 18–22% commission — among the highest. Apply via `partners.hostelworld.com`. Good fit for Phase 2 Tel Aviv pilot (backpacker traffic). |
| 9 | **Discover Cars** | ✓ YES — 8 Israel suppliers in 2026, dedicated `/israel`, `/israel/jerusalem`, `/israel/tel-aviv` pages | ✓ YES — global program, accepts worldwide traffic | Direct or Travelpayouts | `NEXT_PUBLIC_DISCOVERCARS_PARTNER_ID` | `https://www.discovercars.com/israel/{city}?a_aid={PARTNER_ID}` | HIGH | **365-day cookie** (longest in the matrix) — $20–50/sale, ~$2,500/100k visitors. Strong alternative to Rentalcars for car-rental pages. |
| 10 | **Klook** | ⚠ PARTIAL — Klook lists Israel tours but inventory is THIN compared to Viator/GYG; primary Klook market is APAC | ✓ YES — global program | Direct or Travelpayouts (2–5% commission) | `NEXT_PUBLIC_KLOOK_AID` | `https://www.klook.com/en-US/experiences/list/israel-tours/g52-cate9/?aid={AID}` | MEDIUM | **Defer to Phase 2.5 or Phase 3.** Klook's Israel SKU coverage is shallow; embedding it on canonical pages risks empty / low-quality results pages. Use only if a specific tour ID is available and the alternative (Viator/GYG) is absent. |
| 11 | **GoCity** | ⚠ NO Israel pass currently — GoCity has Jerusalem + Tel Aviv on their roadmap but no active Israel destination card on `gocity.com` as of May 2026 | N/A | (n/a until destination launches) | `NEXT_PUBLIC_GOCITY_PARTNER_ID` (placeholder) | (no template until destination launches) | LOW | **Defer to monitoring.** A separate "Jerusalem City Pass" exists from the Jerusalem Development Authority (separate product), and Viator sells a `Jerusalem-City-Pass/d921-59443P1`. Recommend not building a GoCity helper until they publish an Israel destination — scaffolding the env var as a placeholder is OK, but the helper should hard-fail with a clear "no Israel destination yet" message. |

### 3.2 Aggregator escape hatch

If individual partner applications stall, **Travelpayouts** aggregates Booking, GetYourGuide, Viator, Klook, GoCity, Hostelworld, and DiscoverCars under a single contract. Commissions are slightly lower but the application bar is also lower (no traffic minimums). Useful for the pre-launch / pre-traffic phase to keep helpers populated. Document in `.env.example`.

### 3.3 Disclosure obligation

FTC + ICO + Israeli Consumer Protection Law all require affiliate disclosure to be **prominent and proximate to the affiliate links**. A footer-only disclosure is not sufficient. Best practice (mega-prompt § Fase 2.5):

- Persistent banner or section on every page with affiliate links: "Some links on this page are affiliate links. If you book through them we may earn a commission at no extra cost to you."
- Hebrew version of the disclosure must be reviewed by a Hebrew-native writer (use `hebrew-content-writer` skill) — "תוכן שיווקי" / "קישורי שותפים" — never a direct machine translation of "affiliate links."
- Dedicated `/affiliate-disclosure` page (and `/he/affiliate-disclosure`) with full disclosure language. Link from footer + from each affiliate CTA's `aria-describedby`.

### 3.4 Codemod pattern (mega-prompt § 1.4)

Every helper must follow the pattern below so that activating an AID later is a single env var edit, not a codemod:

```ts
// lib/affiliate/booking.ts
import { z } from 'zod';

const OptsSchema = z.object({
  destination: z.string().min(1),
  checkin: z.date().optional(),
  checkout: z.date().optional(),
  label: z.string().optional(), // for per-page tracking
});

export type BookingLinkOpts = z.infer<typeof OptsSchema>;

export function bookingLink(opts: BookingLinkOpts): string {
  const parsed = OptsSchema.parse(opts);
  const aid = process.env.NEXT_PUBLIC_BOOKING_AID;
  const url = new URL('https://www.booking.com/searchresults.html');
  url.searchParams.set('ss', parsed.destination);
  if (parsed.checkin) url.searchParams.set('checkin', parsed.checkin.toISOString().slice(0, 10));
  if (parsed.checkout) url.searchParams.set('checkout', parsed.checkout.toISOString().slice(0, 10));
  if (aid) url.searchParams.set('aid', aid);
  if (aid && parsed.label) url.searchParams.set('label', parsed.label);
  return url.toString();
}
```

Vitest minimum 4 tests per helper: (a) returns valid URL with AID, (b) returns valid URL without AID (graceful degrade), (c) URL-encodes destination correctly, (d) rejects invalid input via Zod.

---

## 4. Image Pipeline

### 4.1 Configuration

`next.config.ts`:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [320, 640, 1024, 1600], // matches PhotoGallery contract
  imageSizes: [16, 32, 64, 96, 128, 256], // thumbnails, blurs
  minimumCacheTTL: 31536000, // 1 year — images are immutable per ledger
  remotePatterns: [
    { protocol: 'https', hostname: 'upload.wikimedia.org' },
    { protocol: 'https', hostname: 'images.unsplash.com' }, // if used
    // explicit allowlist — no wildcards
  ],
}
```

### 4.2 Why this works for Lighthouse mobile ≥90

- **AVIF first, WebP fallback, JPEG/PNG as last resort.** Next.js negotiates based on `Accept` header. AVIF cuts ~30% over WebP for photographs.
- **`deviceSizes: [320, 640, 1024, 1600]`** is the exact srcset breakpoint set the mega prompt requires. Next.js generates a srcset that picks the right one per viewport × DPR. Matches mobile-first reality (most Israeli mobile traffic is iPhone Safari + Galaxy Chrome at 360–414 logical px → 720–1242 physical px → 1024w variant served).
- **`sizes` attribute on every `<Image>`.** Without `sizes`, Next.js defaults to `100vw` and serves the largest. Codify a `<ResponsiveImage>` wrapper that requires `sizes`.
- **`priority={true}` on the hero image of every page** for LCP. Codify in `<RegionHero>` so it can't be forgotten.
- **`placeholder="blur"` with `blurDataURL`** generated at build time (10×10 base64 LQIP) — eliminates CLS. Use a build script to populate the ledger entry with the LQIP.

### 4.3 CDN choice

**Use Vercel's built-in image optimization** for Phase 1 and Phase 2. It is included with the Vercel Pro plan ($20/mo) and handles AVIF/WebP negotiation automatically. Cost cap to plan — if image transformations exceed plan limits in Phase 3+, migrate to Cloudinary (better CDN POPs in the Middle East via Akamai) or Cloudflare Images.

**Do NOT use** the Vercel Hobby plan for production deploy — its image optimization limits will bottleneck a 70-page bilingual site within weeks.

### 4.4 Credits ledger CI gate (mega-prompt § 1.5)

This is the single highest-leverage gate to prevent the Discover Argentina "PhotoGallery without srcset for months" / "patched credits ledger" debt. Build it in Phase 1.5 and never remove it.

**Architecture:**

```
data/photo-credits.json  ← canonical ledger (one entry per image used)
lib/photo-credits.ts     ← getCredit(src) lookup; throws on miss
scripts/qa/check-credits.mjs  ← CI gate (described below)
```

**Schema (validate with Zod):**

```ts
const CreditEntry = z.object({
  src: z.string().regex(/^\/images\/.+\.(avif|webp|jpg|png)$/),
  width: z.number().min(1200),     // contract: ≥1200px min
  height: z.number().min(1),
  author: z.string().min(1),
  license: z.enum(['CC0', 'CC-BY-2.0', 'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0', 'PD', 'IGPO-CC', 'OWN']),
  sourceUrl: z.string().url(),
  region: z.string(),
  slug: z.string(),
  blurDataURL: z.string().startsWith('data:image/'),
});
```

**CI gate** (`scripts/qa/check-credits.mjs`) — runs in GitHub Actions before deploy AND in pre-push husky hook:

1. Walk `app/**/*.{tsx,mdx}` and `components/**/*.tsx`; extract every `src` reference passed to `next/image` or `<ResponsiveImage>`.
2. Walk `public/images/**` and list every file.
3. Parse `data/photo-credits.json` and validate with Zod.
4. **Fail build if:**
   - Any `<Image src="...">` references a file not in `photo-credits.json` ("undocumented image").
   - Any file in `public/images/` is not in `photo-credits.json` ("orphaned image — license unclear").
   - Any entry in `photo-credits.json` has `width < 1200`.
   - Any entry's actual image file (probed with `sharp.metadata()`) has dimensions that disagree with the ledger.
   - Any entry has missing `author` or `license` field.
5. Generate `data/photo-credits-report.html` with counts per region, license distribution, % credited — published to `/admin/photo-credits/` (noindex).

**Why not use an existing skill?** The `image-optimization` and `responsive-images` skills in the inventory cover transformation, not licensing. No off-the-shelf CI gate exists for this — hand-roll in `scripts/qa/`. It's ~150 LOC and is the single most important gate in the project.

### 4.5 What NOT to use

| Avoid | Why | Use instead |
|---|---|---|
| `<img>` tags | No srcset, no AVIF, no lazy by default, easy to forget alt | `next/image` always |
| External image hosts without `remotePatterns` allowlist | Vercel will refuse the request; also a CSP risk | Explicit allowlist for Wikimedia / Unsplash only |
| `unoptimized: true` per-image | Skips srcset + format negotiation | Never. If an asset can't be optimized (SVG), it's not a photo — use `<svg>` or set `<Image priority unoptimized />` only for the OG-image asset |
| Custom srcset markup | Reinvents what `next/image` does correctly | `<Image sizes="..." />` is the contract |

---

## 5. Lighthouse CI (mega-prompt § 1.10)

### 5.1 Decision: `@lhci/cli` (Google official)

`@lhci/cli` wins over Unlighthouse and PageSpeed Insights API because:

1. **Native 3-run median support.** `numberOfRuns: 3` + the default `aggregationMethod: 'median'` is the exact behavior the mega prompt requires (single-sample lied in S11-E''). Unlighthouse runs once per URL by design — wrong for a pre-deploy gate.
2. **Threshold-based hard gating.** `assertions` config can fail the build on `performance: 0.90`, `accessibility: 0.95`, `best-practices: 0.95`, `seo: 1.0`. PageSpeed Insights API has no built-in gating — you'd have to wrap it.
3. **GitHub Actions integration.** `treosh/lighthouse-ci-action` is well-maintained, posts PR comments with deltas, archives reports as artifacts.
4. **Free public LHCI server.** Hosted by Google — store historical reports without infra.

### 5.2 Configuration

`.lighthouserc.cjs`:

```js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/he',
        'http://localhost:3000/en/regions/tel-aviv',  // pilot pages
        'http://localhost:3000/he/regions/tel-aviv',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop', // override per-run; mobile is the gate
        chromeFlags: '--no-sandbox',
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false,
        },
        throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 },
      },
    },
    assert: {
      assertions: {
        'categories:performance':    ['error', { minScore: 0.90, aggregationMethod: 'median' }],
        'categories:accessibility':  ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:best-practices': ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:seo':            ['error', { minScore: 1.00, aggregationMethod: 'median' }],
      },
    },
    upload: { target: 'temporary-public-storage' }, // or self-hosted LHCI server URL
  },
};
```

### 5.3 Why not Unlighthouse / PageSpeed Insights API / Treo

| Tool | Why not (for gating) |
|---|---|
| **Unlighthouse** | Site-crawler, designed for *audit reports*, not pre-deploy gates. Single run per URL. Useful as a secondary audit dashboard view ("crawl the whole site once a week"), not as a CI gate. Could install as a **complement** in Phase 1.9 audit dashboard, but never as the gate. |
| **PageSpeed Insights API** | Free, official, but no built-in gating logic, no 3-run median (it's a single-shot lab + field merge), and rate-limited. Wrap it as a *post-deploy* health check, not a pre-deploy gate. |
| **Treo** | Commercial ($30+/mo) — overkill for a Phase 1 gate when `@lhci/cli` + Vercel's free LHCI is enough. Revisit at Phase 6 if historical analysis becomes painful. |

### 5.4 Where it runs

- **GitHub Action** on every PR to `main`. Block merge if assertions fail.
- **Vercel pre-deploy hook** (via `vercel build` + `lhci collect`) for production deploys. Block deploy if assertions fail.
- **Local pre-push** (husky) — optional, slow; skip for sub-2-page changes via `lint-staged` selectivity.

---

## 6. Schema / JSON-LD

### 6.1 Decision: `schema-dts` + native `<script>` injection

**Not `next-seo`.** Next-seo's `next-seo/pages` import path signals Pages-Router legacy. The maintainer's GitHub issue #1293 (open since 2023) acknowledges App Router is not first-class. Next.js's own documentation now recommends rendering JSON-LD with a native `<script type="application/ld+json">` in a Server Component — which is what we'll do.

**Not hand-rolled untyped objects.** schema-dts is maintained by Google, has discriminated unions for every Schema.org type, catches mistakes like `dateModified` vs `dateUpdated` at build time. ~100k+ weekly downloads, stable since v1.0 (2021).

### 6.2 Types we need for Israel tourism

| Schema.org type | Used on | Required properties |
|---|---|---|
| `WebSite` | Root layout | `name`, `url`, `inLanguage`, `potentialAction` (SearchAction) |
| `TouristDestination` | Region canonical pages (e.g., `/jerusalem`) | `name`, `description`, `image`, `geo` (lat/lng), `includesAttraction[]` |
| `TouristAttraction` | Sub-destination pages (e.g., `/jerusalem/western-wall`) | `name`, `description`, `image`, `geo`, `touristType`, `isAccessibleForFree` |
| `Place` + `ReligiousBuilding` | Religious sites (Western Wall, Holy Sepulchre, Al-Aqsa, Bahá'í Gardens) | `name`, `address`, `geo`, `religion`, `containedInPlace` (the city) |
| `LocalBusiness` (incl. `Hotel`, `Restaurant`) | Where embedded in tour pages | `name`, `address`, `priceRange`, `aggregateRating`, `acceptsReservations` |
| `FAQPage` | All region canonicals (mega-prompt § 2.1) | `mainEntity[]` of `Question` + `Answer` |
| `BreadcrumbList` | Every non-home page | `itemListElement[]` of `ListItem` |

### 6.3 Implementation pattern

```ts
// lib/schema/builders.ts
import type { TouristDestination, WithContext } from 'schema-dts';

export function buildTouristDestination(input: {...}): WithContext<TouristDestination> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: input.name,
    description: input.description,
    image: input.images,
    geo: { '@type': 'GeoCoordinates', latitude: input.lat, longitude: input.lng },
    includesAttraction: input.attractions.map(a => ({ '@type': 'TouristAttraction', name: a.name, url: a.url })),
  };
}
```

```tsx
// components/JsonLd.tsx (Server Component)
export function JsonLd<T>({ schema }: { schema: T }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

### 6.4 Validation

Build a `scripts/qa/validate-schema.mjs` that:
1. Crawls the built site (`out/` after `next build`).
2. Extracts every `<script type="application/ld+json">`.
3. Validates against schema.org's structured-data testing-tool JSON schema (the published spec, not the deprecated UI tool).
4. Optionally pings Google's Rich Results Test API as a Phase 6 health check.

Fail build if any page is missing required schema for its page profile (mega-prompt § 1.7 quality profiles).

### 6.5 Religious-site naming sensitivity

This is editorial-policy-meets-schema. For example, the site at the top of Jerusalem's Old City:

- `@type`: `Place` (NOT `ReligiousBuilding` alone, because two religions claim the same coordinates)
- `name`: `"Temple Mount / Haram al-Sharif"` (both names, slash-separated)
- `alternateName`: `["Har HaBayit", "الحرم الشريف", "Temple Mount", "Haram al-Sharif"]`
- Do NOT use `religion` field for shared sites — overspecifies one tradition's claim.

Document this in `lib/schema/builders.ts` JSDoc so the pattern is reused for similar contested sites.

---

## 7. Linting (the inviolable constraints)

### 7.1 Banning raw hex codes

**Two enforcement layers** — defense in depth.

**Layer A — `eslint-plugin-tailwindcss/no-arbitrary-value`:**

```js
// eslint.config.mjs (flat config)
import tailwind from 'eslint-plugin-tailwindcss';

export default [
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/no-arbitrary-value': 'error', // bans bg-[#fff], text-[#abc]
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': ['error', {
        whitelist: ['^font-hebrew', '^leading-hebrew', '^font-hebrew-serif'], // allow our preset classes
      }],
    },
    settings: {
      tailwindcss: {
        config: 'tailwind.config.ts', // or v4 CSS file
      },
    },
  },
];
```

**Layer B — `no-restricted-syntax` to catch inline-style hex codes:**

```js
{
  'no-restricted-syntax': ['error',
    {
      selector: "JSXAttribute[name.name='style'] Property[key.name=/^(color|backgroundColor|borderColor|fill|stroke)$/] Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
      message: 'Raw hex codes are banned in inline styles. Use Tailwind design tokens from tailwind.config.ts.',
    },
    {
      selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{6}/]",
      message: 'Raw hex code detected in template literal. Use a design token.',
    },
  ],
}
```

**Why two layers:** `eslint-plugin-tailwindcss` catches `className="bg-[#fff]"` but not `style={{ color: '#fff' }}`. The AST selector catches the latter.

### 7.2 Banning direct partner URLs in JSX

```js
{
  'no-restricted-syntax': ['error',
    {
      selector: "JSXAttribute[name.name='href'][value.value=/booking\\.com|civitatis\\.com|getyourguide\\.com|viator\\.com|rentalcars\\.com|safetywing\\.com|skyscanner\\.|hostelworld\\.com|klook\\.com|gocity\\.com|discovercars\\.com/]",
      message: 'Direct partner URL in JSX href is banned. Use the corresponding affiliate helper from lib/affiliate/ (e.g., bookingLink, civitatisLink).',
    },
    // Catch in template literals too (e.g., href={`https://www.booking.com/...`})
    {
      selector: "Literal[value=/^https?:\\/\\/(www\\.)?(booking|civitatis|getyourguide|viator|rentalcars|safetywing|skyscanner|hostelworld|klook|gocity|discovercars)\\./]",
      message: 'Hard-coded partner URL detected. Use an affiliate helper from lib/affiliate/.',
    },
  ],
}
```

**Escape hatch:** the affiliate helpers themselves construct these URLs. Use an ESLint override to exempt `lib/affiliate/**`:

```js
{
  files: ['lib/affiliate/**/*.ts'],
  rules: { 'no-restricted-syntax': 'off' },
},
```

### 7.3 Banning physical Tailwind directional utilities (RTL safety)

```js
{
  'no-restricted-syntax': ['error',
    {
      selector: "JSXAttribute[name.name='className'] Literal[value=/\\b(ml-|mr-|pl-|pr-|left-|right-|border-l\\b|border-r\\b|rounded-l\\b|rounded-r\\b|text-left|text-right|scroll-ml-|scroll-mr-)\\d?/]",
      message: 'Physical directional utility used. Use logical equivalent (ms-, me-, ps-, pe-, start-, end-, border-s, border-e, rounded-s, rounded-e, text-start, text-end) for RTL safety. See hebrew-tailwind-preset skill.',
    },
  ],
}
```

**Escape hatch:** allow physical utilities in components explicitly wrapped in `<LTR>` only (e.g., phone-number inputs, code blocks). Use an `// eslint-disable-next-line` with a required justification comment.

### 7.4 Other rules to enable

| Rule | Why |
|---|---|
| `@next/next/no-img-element` | Forces `next/image` over `<img>`. |
| `react/jsx-no-target-blank` | Affiliate links open in new tabs — must include `rel="noopener noreferrer"`. The helper-returned JSX can set this by default. |
| `react/no-unstable-nested-components` | Prevents performance regressions. |
| `@typescript-eslint/no-floating-promises` | Catches unawaited async in Server Components. |
| `eslint-plugin-jsx-a11y/recommended` | Cross-checks against IS 5568. Required complement to manual testing. |
| `eslint-plugin-jsx-a11y/lang` | Enforces `lang` attribute on `<html>` — easy to forget when scaffolding i18n. |

---

## 8. Git hooks + pre-commit

```json
// package.json
{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint .",
    "qa:credits": "node scripts/qa/check-credits.mjs",
    "qa:schema": "node scripts/qa/validate-schema.mjs",
    "lhci": "lhci autorun"
  },
  "lint-staged": {
    "*.{ts,tsx,mjs,cjs,js}": ["eslint --fix", "prettier --write"],
    "*.{json,md,mdx,css}": ["prettier --write"],
    "public/images/**": ["node scripts/qa/check-credits.mjs --staged"],
    "data/photo-credits.json": ["node scripts/qa/check-credits.mjs --full"]
  }
}
```

`.husky/pre-commit`:
```sh
pnpm lint-staged
```

`.husky/pre-push`:
```sh
pnpm qa:credits
pnpm qa:schema
```

CI (GitHub Actions) runs the full suite + Lighthouse CI on every PR.

---

## 9. Alternatives Considered

| Recommended | Alternative | Why not the alternative |
|---|---|---|
| Next.js 15.5 | Next.js 16 | Stable but introduces breaking changes (middleware → proxy, Turbopack default, React Compiler default) that add risk during foundation. Migrate at Phase 3 if Phase 2 closes cleanly. |
| `next-intl` v3 | `next-i18next` | Pages-Router legacy. App Router support requires manual wiring. ~flat adoption in 2025 vs. next-intl's 4× growth. |
| `next-intl` v3 | `react-i18next` directly | More boilerplate per page, no first-class Next.js routing integration. |
| `schema-dts` | `next-seo` | next-seo is Pages-Router-first; App Router support is community-patched. The native `<script type="application/ld+json">` pattern is now Next.js's documented approach. |
| `schema-dts` | Hand-rolled untyped JSON-LD | Untyped means schema typos ship to production and surface in Search Console months later. Build-time type safety is high-ROI. |
| `@lhci/cli` | Unlighthouse | Unlighthouse runs once per URL by design; no native 3-run median. Use as a *complementary* full-site crawl in audit dashboard, not as the deploy gate. |
| `@lhci/cli` | Treo | $30+/mo for what `@lhci/cli` + temporary-public-storage does free. Revisit at Phase 6 if historical analysis becomes painful. |
| Vercel Image Optimization | Cloudinary | Cloudinary is great but adds an external dependency. Vercel's built-in is sufficient through Phase 3. Re-evaluate at 5+ regions if transformation costs exceed plan. |
| Tailwind v4 | Tailwind v3 | v4's CSS-first `@theme` is what `hebrew-tailwind-preset` skill targets. v3 needs an RTL plugin; v4 has logical properties built-in. |
| pnpm | npm or yarn | Strict layout catches phantom deps. Vercel native support. ~2× faster install. |
| Vitest | Jest | Vitest is ESM-native (no Babel), faster, and uses the same `expect` API as Jest. No reason to add Babel in 2026. |

---

## 10. What NOT to Use

| Avoid | Why | Use Instead |
|---|---|---|
| **accessiBe / UserWay / EqualWeb overlays** | FTC fined accessiBe $1M (2024). 25% of 2024 a11y lawsuits targeted overlay sites. Overlays cannot fix structural HTML, ARIA, or keyboard issues. IS 5568 is stricter than WCAG and overlays do not satisfy it. | Native semantic HTML + ARIA + manual axe-core audits + `eslint-plugin-jsx-a11y` + Hebrew Accessibility Statement page |
| **`<img>` tags** | No srcset, no AVIF negotiation, no lazy by default | `next/image` (with `@next/next/no-img-element` ESLint rule) |
| **`next-seo` package** | Pages-Router-first; App Router support patchy and maintainer-acknowledged-incomplete | `schema-dts` + Next.js native metadata API (`generateMetadata`) + native `<script type="application/ld+json">` |
| **Direct partner URLs in JSX** | Can't be tracked, can't be updated when AID arrives, breaks audit dashboard | Affiliate helpers in `lib/affiliate/` with ESLint enforcement |
| **Single-sample Lighthouse measurements** | Lied in Discover Argentina S11. Standard deviation in Lighthouse runs is ~5 points. | `@lhci/cli` with `numberOfRuns: 3` + `aggregationMethod: median` |
| **`space-x-*` Tailwind utilities** | Don't respect RTL `dir` attribute. | `gap-*` on flex/grid parent |
| **Physical Tailwind directional utilities (`ml-`, `pr-`, `border-l`, etc.)** | Break RTL on Hebrew pages | Logical utilities (`ms-`, `pe-`, `border-s`, `text-start`, `start-0`) |
| **Google Fonts CDN `<link>`** | GDPR concern (IP transmitted to Google), CLS hit, font-display:swap can't be controlled | `next/font/google` with self-hosting + `display: 'swap'` |
| **`unoptimized={true}` on `<Image>`** | Skips Next.js's entire optimization pipeline. | Only acceptable for OG-image generation; never for content imagery |
| **Hand-rolled hex codes in components** | Discover Argentina accumulated 6,089 to clean retroactively | Design tokens via `tailwind.config.ts` / `@theme` block; ESLint enforcement |
| **Vercel Hobby plan** | Image optimization limits are too low for a 70+ page bilingual site | Vercel Pro plan ($20/mo) at minimum |
| **`@types/schema-org` packages older than 1.0** | Several outdated alternatives float in npm. | `schema-dts` (Google-maintained) only |

---

## 11. Version Compatibility Matrix

| Package A | Compatible With | Notes |
|---|---|---|
| `next@15.5.x` | `react@^19`, `react-dom@^19` | React 19 stable is bundled. |
| `next@15.5.x` | `tailwindcss@^4` | Tailwind v4 PostCSS plugin works. Avoid `tailwindcss@3` + v4 PostCSS plugin (incompatible). |
| `next-intl@^3` | `next@15` and `next@16` | Both supported; same API. |
| `eslint@^9` | `eslint-plugin-tailwindcss@^3.18` | Earlier versions don't support flat config. |
| `eslint@^9` | `@typescript-eslint@^8` | Flat config support required. |
| `@lhci/cli@^0.14` | Lighthouse 12.x | Bundled. Don't install `lighthouse` separately. |
| `schema-dts@^1` | TypeScript 5.x | Discriminated unions need TS 4.6+; we require 5.6+ anyway. |
| `husky@^9` | Node.js ≥20 | Node 20 is the project's stated min. |
| `pnpm@^9` | Node.js ≥18.12 | Use latest stable. |

---

## 12. Stack Patterns by Variant

**If R6 confirms RU or FR as a third language:** keep `next-intl` v3. Add `subsets: ['hebrew', 'latin', 'cyrillic']` to `next/font` for RU; FR is already in Latin subset. Add hreflang entries automatically via the existing pipeline. No structural change required.

**If photo CDN load exceeds Vercel Pro limits in Phase 3:** migrate `next/image` `loader` to Cloudinary loader. Vercel docs cover this. Affiliate-helper pattern is unaffected.

**If a partner application is rejected:** scaffold the helper anyway (`bookingLink()` returns public URL without AID). Apply via Travelpayouts aggregator as the fallback path. Document in `.env.example`.

**If Lighthouse mobile median lands at 88–89 in Phase 2.6:** the canonical fixes (in order of leverage) are: (1) inline critical CSS for above-the-fold, (2) `priority` on hero image only, (3) defer all third-party scripts via `next/script` `strategy="lazyOnload"`, (4) audit fonts with `display: 'swap'` + `preload: true`. Do NOT swap frameworks; the gap is always a configuration issue at this scale.

---

## 13. Sources

| Source | URL | Confidence given |
|---|---|---|
| Next.js 15 blog | https://nextjs.org/blog/next-15 | HIGH |
| Next.js 16 vs 15 comparison (Descope) | https://www.descope.com/blog/post/nextjs15-vs-nextjs16 | HIGH |
| Next.js JSON-LD guide | https://nextjs.org/docs/app/guides/json-ld | HIGH |
| Next.js Image docs | https://nextjs.org/docs/app/api-reference/components/image | HIGH |
| Booking.com Affiliate KB — Links | https://affiliates.support.booking.com/kb/s/article/Links | HIGH |
| Booking.com Affiliate KB — AID | https://affiliates.support.booking.com/kb/s/article/Affiliate-IDs-AID-everything-you-need-to-know | HIGH |
| Booking.com partnerships hub | https://partnerships.booking.com/ | HIGH |
| Civitatis Israel destinations | https://www.civitatis.com/en/israel/ | HIGH |
| Viator partner resources | https://partnerresources.viator.com/ | HIGH |
| Viator Israel destination (d919) | https://www.viator.com/Israel/d919-ttd | HIGH |
| GetYourGuide partner program | https://partner.getyourguide.com/ | HIGH |
| GetYourGuide Israel destination (l169033) | https://www.getyourguide.com/israel-l169033/ | HIGH |
| Rentalcars.com program (Awin) | https://www.awin.com/us/news-and-events/interviews/advertiser-spotlight-rentalcars.com | HIGH |
| SafetyWing Nomad Insurance coverage policy | https://safetywing.com/nomad-insurance/policy | HIGH |
| Skyscanner Affiliate Programme | https://www.partners.skyscanner.net/product/affiliates | HIGH |
| Hostelworld partner signup (Partnerize) | https://signup.partnerize.com/signup/en/hostelworld | HIGH |
| Hostelworld partner page | https://partners.hostelworld.com/ | HIGH |
| Klook affiliate (Travelpayouts) | https://www.travelpayouts.com/blog/klook-affiliate-program/ | MEDIUM (Israel SKU breadth not officially documented) |
| Klook Israel tours | https://www.klook.com/en-US/experiences/list/israel-tours/g52-cate9/ | MEDIUM |
| Go City affiliate | https://gocity.com/en/affiliate-program | LOW (no Israel destination found in May 2026) |
| DiscoverCars affiliate | https://www.discovercars.com/affiliate | HIGH |
| DiscoverCars Israel | https://www.discovercars.com/israel | HIGH |
| Travelpayouts aggregator | https://www.travelpayouts.com/ | HIGH |
| schema-dts (Google) | https://github.com/google/schema-dts | HIGH |
| Lighthouse CI (`@lhci/cli`) docs (via Unlighthouse explainer) | https://unlighthouse.dev/learn-lighthouse/lighthouse-ci | HIGH |
| `eslint-plugin-tailwindcss` no-arbitrary-value | https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-arbitrary-value.md | HIGH |
| ESLint `no-restricted-syntax` rule | https://eslint.org/docs/latest/rules/no-restricted-syntax | HIGH |
| ESLint AST selectors | https://eslint.org/docs/latest/extend/selectors | HIGH |
| `next-intl` getting started (App Router) | https://next-intl.dev/docs/getting-started/app-router | HIGH |
| `next-intl` vs `next-i18next` (Locize) | https://www.locize.com/blog/next-intl-vs-next-i18next/ | HIGH |
| AccessiBe FTC $1M fine (CTech) | https://www.calcalistech.com/ctechnews/article/8t638u9lm | HIGH |
| Overlay lawsuits (Accessibility.Works) | https://www.accessibility.works/blog/avoid-accessibility-overlay-tools-toolbar-plugins/ | HIGH |
| IS 5568 overview (BOIA) | https://www.boia.org/blog/israels-digital-accessibility-laws-an-overview | HIGH |
| Tailwind RTL config (project skill `hebrew-tailwind-preset`) | `.agents/skills/hebrew-tailwind-preset/SKILL.md` | HIGH |
| Next.js skill (`next-best-practices`) | `.agents/skills/next-best-practices/SKILL.md` | HIGH |

---

## 14. Open Questions & Confidence Caveats

- **Klook Israel inventory breadth.** Confirmed Klook *operates* in Israel but its SKU count is small relative to Viator/GYG. We can't quantify it without an API call to their catalog. **Mitigation:** scaffold the helper, gate its embed on a per-tour-ID basis (don't show a Klook CTA if no matching tour exists for the page's destination). Defer broad rollout to Phase 3.
- **GoCity Jerusalem/Tel Aviv pass.** No active GoCity destination found as of May 2026 (only Jerusalem Development Authority's own pass + Viator's reselling thereof). **Mitigation:** placeholder env var only; helper hard-fails until a destination launches.
- **Skyscanner traffic threshold.** Their public docs state 5,000 monthly visitors as the bar. New site won't qualify on day 1. **Mitigation:** helper returns public URL until AID arrives; design dashboard tracker for AID-activation eligibility.
- **CJ Affiliate vs Awin for Booking in Israel.** Booking's docs say CJ for Middle East, Awin for APAC/LATAM/North America. Israel sits at the regional boundary — verify with both networks at signup. Both work; the difference is payout currency (USD via CJ, EUR via Awin).
- **`schema-dts` v1 currency.** v1.0 shipped in 2021; the Schema.org vocabulary has added types since. For Israel-specific niches (e.g., wineries, archaeological sites), spot-check the latest types against `schema.org/version` and fall back to typed `unknown` if a type isn't yet in `schema-dts`. Low-priority gotcha — affects <5% of pages.

---

*Stack research for: Tourism affiliate website, Israel, bilingual, Vercel*
*Researched: 2026-05-11*
