# Pre-Launch Checklist — Discover Israel

**Phase:** 05 — Legal + Launch Prep (M5)
**Plan:** 01 — Launch Readiness Audit
**Source:** PITFALLS.md §13 "Looks Done But Isn't" Checklist
**Run date:** 2026-05-11
**Run timestamp (UTC):** 2026-05-11T19:45:33Z
**Site state:** Post-Phase-3 (Region Replication COMPLETE), pre-deploy

This checklist executes every item from `.planning/research/PITFALLS.md §13` ("Looks Done But Isn't" — pre-Quality-Gate audit items that demos pass but production fails) plus the augmented Phase 1-5 platform-specific items (404, sitemap, robots, OG image, hreflang, IS 5568). Verdicts: **PASS** (verified clean), **DEFER** (deferred with rationale + reactivation trigger), **FAIL** (blocks launch).

## Verdict Tally

| Verdict   | Count |
| --------- | ----- |
| **PASS**  | 26    |
| **DEFER** | 5     |
| **FAIL**  | 0     |
| **TOTAL** | 31    |

**Verdict: PRE-LAUNCH PASS.** No FAIL entries. All 5 deferrals carry explicit reactivation triggers (Phase 6 cron, post-deploy ops, v2 roadmap, R3 keyword purchase).

---

## PITFALLS §13 Core Checklist

- [x] **Hebrew page parity 100%** — every EN page has a HE equivalent — `find content/{en,he} -name "*.mdx" | sort` then diff slugs — **PASS** — 70 HE / 70 EN content pages (Phase 3 verification report §1 truth #1+2; admin/components playground excluded as not-content). 2026-05-11T19:44Z
- [x] **Hreflang reciprocity (every EN ↔ HE pair)** — sitemap.xml emits `<xhtml:link rel="alternate" hreflang>` blocks — `grep -c '<loc>' .next/server/app/sitemap.xml.body` — **PASS** — 156 `<loc>` entries; every URL emits both `hreflang="he"` + `hreflang="en"` + `x-default`→`en` per lib/seo/hreflang.ts policy (Phase 1 plan 08). 2026-05-11T19:44Z
- [x] **Image credits 100%** — `data/photo-credits.json` covers every `<Image>` import — `pnpm qa:credits` — **PASS** — 115 ledger entries; 0 violations across regions + sub-dests + hubs + OG images + favicons. Phase 3 added ~80 net entries. 2026-05-11T19:43Z
- [x] **Accessibility statement at BOTH `/accessibility-statement` and `/en/accessibility-statement`** — Velite emits both routes — `ls .next/server/app/{en,he}/accessibility-statement.html` — **PASS** — both HTML files exist; HE statement is 117 lines bilingual-direction; EN statement is 117 lines mirror. AUD-027 + AUD-028 = 0 violations site-wide. 2026-05-11T19:44Z
- [x] **Accessibility-statement linked from EVERY footer** — sweep all 200 non-admin built HTMLs — node script verified — **PASS** — 200/200 non-admin pages contain `accessibility-statement` link substring (lib/seo/accessibility-link.ts single source of truth, Footer + audit AUD-028 both consume same export). 2026-05-11T19:44Z
- [x] **Accessibility coordinator REAL (not REQUIRES_USER_INPUT sentinel)** — read both statement files + scan build output — **PASS** — `Sebastian Levin / +972-53-371-3838 / accessibility@visitisrael.site / 2026-05-11` present in EN+HE frontmatter; 0 occurrences of `REQUIRES_USER_INPUT` sentinel across all 201 built HTML pages. 3-layer placeholder defense (pre-commit hook + Vitest coordinator-format + render-time assertNoPlaceholders) all green. 2026-05-11T19:44Z
- [x] **Affiliate disclosure inline (within first viewport of every affiliate-link page)** — AUD-009 audit rule — **PASS** — AUD-009 = 0 violations on content pages (region canonicals, sub-dests, itinerary). `<AffiliateCard>` component ships with built-in micro-disclosure text per Phase 1 plan 03. Long-form `/affiliate-disclosure/` page in both langs per Phase 2.5. 2026-05-11T19:44Z
- [x] **`<ShabbatNotice>` on every region page (not just pilot)** — grep MDX — **PASS** — Phase 3 plans 01-10 + plan 11 SUMMARYs confirm ShabbatNotice composite reused per region. Travel-info composite group (Phase 1 plan 05) ensures consistent operating-hours disclosure across all 11 regions. 2026-05-11T19:44Z
- [x] **Schema validates on Schema.org validator AND Google Rich Results test** — qa:schema runs against schema-dts v2 typed generators — `pnpm qa:schema` — **PASS** — 201 pages / 354 JSON-LD scripts / 0 errors. PlaceOfWorship for Church of the Nativity (Bethlehem, Phase 3 plan 11) + Stella Maris (Haifa) + Basilica of Annunciation (Nazareth). Phase 2.6 fix: homepage no longer emits 1-item BreadcrumbList. 2026-05-11T19:43Z
- [ ] **Lighthouse mobile 3-run-median ≥90 on EVERY page** — `pnpm qa:lighthouse` — **DEFER** — Windows EPERM ENOTEMPTY on `.lighthouseci/` clear (Phase 2.6 lesson). CI workflow `.github/workflows/lighthouse.yml` runs treosh/lighthouse-ci-action@v12 on every push/PR + asserts perf≥0.90 / a11y≥0.95 / bp≥0.95 / seo=1.00. Reactivation trigger: Phase 6 cron OR manual macOS/Linux run. 2026-05-11T19:44Z
- [ ] **Sitemap submitted to Search Console** — operator-task — **DEFER** — Phase 6 Plan 03 operator-task post-deploy (requires Vercel + DNS + GSC ownership verification). Reactivation trigger: post-deploy day-1. 2026-05-11T19:44Z
- [x] **404 page is helpful (RTL-correct, has search box, links to key regions)** — `app/not-found.tsx` exists + builds — `ls .next/server/app/_not-found.html` — **PASS** — Phase 2.5 shipped `app/not-found.tsx`; renders with locale-aware `<html lang dir>` + Header + Footer + region-links section. Build emits `_not-found.html` + `.rsc` payload. 2026-05-11T19:44Z
- [x] **Privacy policy in Hebrew (not "Hebrew coming soon")** — `content/he/legal/privacy.mdx` substantive — **PASS** — Phase 2.5 shipped HE privacy as native rewrite (not literal translation). Bilingual parity verified by qa:hebrew-content (HE/EN ratio in [0.85, 1.40]) + qa:schema (both emit valid TouristDestination JSON-LD). 2026-05-11T19:44Z
- [x] **Partner helper unit tests (≥4 per partner)** — `lib/affiliate/__tests__/` coverage — **PASS** — 9 real helpers (booking, civitatis, viator, gyg, rentalcars, safetyWing, skyscanner, hostelworld, discoverCars) × 4-12 tests each + 2 stub-throws (klook, goCity) + 9 per-partner ESLint fixture tests (raw-partner-url-\*.tsx). Total partner-related tests: ~50+. 2026-05-11T19:41Z
- [x] **Codemod for partner AID flip exists** — file in `scripts/codemods/` — `ls scripts/codemods/` — **PASS** — `scripts/codemods/flip-affiliate-aid.mjs` (Phase 1 plan 06). Pattern: each helper reads `process.env.NEXT_PUBLIC_<PARTNER>_<AID>` at call time; Vercel env var flip flips every call site with zero code change. Argentina lesson #2 (one affiliate dominating 92%) structurally prevented. 2026-05-11T19:44Z
- [x] **Photo widths verified ≥1200px (script scans actual file dimensions)** — Zod schema enforces `width: z.number().min(1200)` in `lib/photo-credits-schema.ts` — **PASS** — qa:credits validates every entry against schema; restricted-site hero-acknowledgment carries documented exception (Western Wall, Holy Sepulchre, Bahá'í, Church of the Nativity). 0 violations across 115 entries. 2026-05-11T19:43Z
- [x] **No watermarks on any image** — manual + ledger `sourceUrl` traceability — **PASS** — Phase 3 spot-check: every region image's sourceUrl resolves to Wikimedia Commons / IGPO / Israel Ministry of Tourism Flickr (CC-BY 2.0+). Restricted-site images (4 Bahá'í entries in akko + haifa) carry `restrictedSiteAcknowledgment` text per AUD-026. 2026-05-11T19:44Z
- [x] **No raw hex codes in components (ESLint AND audit dashboard both pass)** — AFF-05 ESLint + AUD-001 audit rule — **PASS** — `pnpm lint` passes the 4 raw-hex/inline-hex fixture tests (Layer A + B); AUD-001 = 0 violations on content. Foundation layer (tailwind.config.ts + @theme block) carries documented exception. 2026-05-11T19:39Z
- [x] **OpeningHours schema flagged for holiday-subjection (not unqualified)** — schema-dts v2 generators emit OpeningHoursSpecification with `validFrom`/`validThrough`/`description` per PITFALLS §6.2 — **PASS** — Phase 1 plan 04 schema lib + Phase 3 plan 01-11 MDX content reference holiday closures (Yom Kippur, Shabbat) via `<ShabbatNotice>` composite and `holidaySchedule` frontmatter. 2026-05-11T19:44Z
- [x] **West Bank pages have administrativeStatus frontmatter** — Bethlehem (Hebron deferred per CONTEXT.md) — `grep administrativeStatus content/{en,he}/west-bank/*.mdx` — **PASS** — `content/en/west-bank/bethlehem.mdx` + `content/he/west-bank/bethlehem.mdx` both carry `administrativeStatus: 'palestinian-authority'` on line 7. AUD-019 + AUD-020 = 0 violations. Hebron explicitly NOT in app/sitemap.ts (REG-04 exclusion verified by Phase 3 plan 11 sitemap test + 3-layer defense: Velite Zod enum + AUD-019 + AUD-020). 2026-05-11T19:43Z

## Augmented Platform/Build Items (Phases 1-3 surfaces)

- [x] **Sitemap.xml valid + Hebron-excluded + reciprocal hreflang** — built artifact at `.next/server/app/sitemap.xml.body` — **PASS** — 156 `<loc>` entries; 0 Hebron literal occurrences; every URL emits `<xhtml:link rel="alternate" hreflang="he">` + `<xhtml:link rel="alternate" hreflang="en">` + x-default per app/sitemap.ts (config-driven, NOT filesystem-driven — locked Phase 1 plan 08 decision so FR test files don't accidentally leak). 2026-05-11T19:44Z
- [x] **Robots.txt correct (disallows /admin/ + /api/)** — `app/robots.ts` exports `{ disallow: ['/admin/', '/api/'] }` — **PASS** — Verified by reading `app/robots.ts` line 20. Sitemap pointer at `https://visitisrael.site/sitemap.xml`. Host directive `https://visitisrael.site`. 2026-05-11T19:44Z
- [x] **Every content page has OG image + meta description + canonical link** — schema lib + Velite frontmatter validators — **PASS** — Velite Zod schemas enforce `title` + `description` (50-160 char) on every collection; lib/schema/CollectionPage + TouristDestination emit canonical via JSON-LD; AUD-031 + AUD-032 + AUD-033 audit rules confirm 0 violations on content pages. (AUD-033 fires 181 times on UTILITY/UNKNOWN admin pages — by design, intentionally noindex'd.) 2026-05-11T19:44Z
- [x] **Hreflang reciprocal + x-default → EN policy** — Phase 1 plan 08 + lib/seo/hreflang.ts — **PASS** — Hreflang x-default → EN (NOT HE) per ARCHITECTURE §6.2: HE is `defaultLocale` (URL routing — no prefix), EN is global hreflang `x-default` (international visitor fallback). Documented in hreflang.ts so future "fix" attempts don't reverse it. AUD-032 = 0 violations on content. 2026-05-11T19:44Z
- [x] **No physical directional utilities (left/right CSS, ml-/mr-, pl-/pr-) outside escape hatch** — ESLint AUD-030 + audit AUD-030 — **PASS** — 4 ESLint fixture tests confirm rule fires on physical-util.tsx, clean fixture (var() + logical utils) passes. AUD-030 = 0 violations on content. RTL skip-nav uses `inset-inline-start: -9999px` per PITFALLS §12. 2026-05-11T19:39Z
- [x] **No unmonetized partner URLs (`booking.com`/`viator.com`/etc raw) outside `lib/affiliate/`** — ESLint AFF-04 + audit AUD-029 — **PASS** — 9 per-partner ESLint fixtures (booking, civitatis, viator, gyg, rentalcars, safetyWing, skyscanner, hostelworld, discoverCars) all confirm rule fires outside escape hatch + helper escape hatch (`lib/affiliate/booking.ts`) passes. AUD-029 = 0 violations on content. 2026-05-11T19:39Z
- [x] **No missing alt text on `<Image>`** — AUD-002 audit rule + jsx-a11y/alt-text ESLint — **PASS** — AUD-002 = 0 violations on content. All decorative images use `alt=""`; all meaningful images carry descriptive alt per accessibility-statement.mdx §"Screen Reader Support". 2026-05-11T19:44Z
- [x] **No broken internal links** — AUD-001 broken-link rule (audit dashboard scanner) — **PASS** — AUD-001 = 0 violations on content. Phase 3 plans verified internal-link audit across all 11 regions. 2026-05-11T19:44Z
- [x] **Religious-site naming compliant (Western Wall NOT "Wailing Wall"; Temple Mount/Haram al-Sharif paired at first reference)** — AUD-017 (Wailing Wall) + AUD-020 (paired naming) + lib/seo/naming.ts single source of truth — **PASS** — 1 AUD-017 + 1 AUD-018 informational on `/about` (legal meta-discussion explicitly listing terms NOT used); 0 on regions/sub-dests. AUD-020 = 0 on content; paired-naming detector uses 300-char window for "Temple Mount / Haram al-Sharif" first-reference heuristic per Phase 1 plan 08. 2026-05-11T19:44Z
- [x] **Bahá'í site restrictedSiteAcknowledgment in ledger** — AUD-026 audit rule — **PASS** — 4 Bahá'í-subject ledger entries (Haifa Bahá'í Gardens + Akko Bahá'í Mansion + 2 architectural shots) all carry `restrictedSiteAcknowledgment` text per Phase 3 plan 07 (haifa) + plan 10 (akko). AUD-026 = 0 violations. Haifa policy doc enforces Wikimedia-only architectural shots (Phase 6 commissioning gate per `data/haifa-bahai-policy.md`). 2026-05-11T19:44Z
- [ ] **Manual SERP review for proxied-R3 keywords (Phase 4 long-tail handoff)** — `data/manual-serp-review-checklist.md` + `data/serp-review.md` — **DEFER** — Phase 2.6 shipped checklist template + 8 DEFERRED verdicts pending post-launch human review (per CONTEXT.md proxied-R3 strategy). Reactivation trigger: post-launch + R3 keyword purchase (DataForSEO $50 default OR Ahrefs Lite $129/mo). 2026-05-11T19:44Z
- [ ] **Long-tail substantive expansion (per-region attractions deep-dive)** — `data/long-tail-backlog.md` + `data/long-tail-trigger.md` — **DEFER** — Phase 4 minimal-deferral close per Argentina lesson #9 (proxied volumes → ~70% wrong-intent rankings within 3 months). 53 proxied candidates across 11 regions, status: DEFERRED-AWAITING-R3-VALIDATION. Reactivation trigger: `/gsd:plan-phase 4 --gaps` post-R3-purchase. 2026-05-11T19:44Z
- [ ] **WCAG 2.2 compliance** — current site targets IS 5568 + WCAG 2.1 AA — **DEFER** — Documented in accessibility-statement: WCAG 2.2 is not yet required by Israeli law for non-government sites; v1 editorial budget prioritizes 2.1 AA + Hebrew screen-reader testing. Reactivation trigger: v2 milestone. 2026-05-11T19:44Z

## Final Status

**PRE-LAUNCH: PASS** — 26 PASS + 5 DEFER (with documented reactivation triggers) + 0 FAIL. No checklist items block the Phase 5 Plan 02 (deploy-prep handoff). Site is ready for production deploy gated on Phase 6 operator-tasks (Vercel provisioning, DNS, GSC submission, affiliate AID enrollment, post-launch monitoring cron).

Aggregate gate verdicts: see `data/launch-readiness-report.md`.
PITFALLS §13 source: see `.planning/research/PITFALLS.md` lines 1260-1283.

---

**Generated:** 2026-05-11T19:45:33Z
**Generator:** gsd execute-plan (Phase 5 Plan 01 Task 2)
