# Phase 2: Pilot Region Jerusalem (M2) - Context

**Gathered:** 2026-05-11
**Status:** Ready for planning
**Mode:** YOLO auto — phase exhaustively pre-decided by upstream research (SUMMARY §5 + PITFALLS §4.1) + Phase 1 foundation operational

<domain>
## Phase Boundary

Build the Jerusalem region to production depth (EN + HE) — the ONE region against which the Foundation infrastructure is proven. Pass the hard Quality Gate (10 criteria) before any other region is built. Phase 2 ends with `data/quality-gate-pass.md` (or `data/quality-gate-failure.md` if any criterion fails, in which case work stops for human review).

**In scope:** 6 sub-phases covering 9 v1 requirements (CNT-01..07, A11Y-03/04, SEO-04 per-page application, IMG-04/05).

**Out of scope (this phase, addressed elsewhere):**

- Tel Aviv and 10 other regions (Phase 3 replication)
- Long-tail sub-destinations beyond Jerusalem's 5–10 (Phase 4)
- Editorial blog content (deferred or Phase 5)
- Production deploy (Phase 5/6)
- Quality Gate criteria already verified in Phase 1 (ESLint rules, photo-credits CI gate, schema validator, Lighthouse CI infra) — those carry forward
- Hebron coverage (explicitly out of scope per PROJECT.md)
- Bethlehem coverage (deferred to Phase 3 with `/west-bank/bethlehem/` admin-status framing)

</domain>

<decisions>
## Implementation Decisions

All decisions below are LOCKED by upstream research + user decisions on 2026-05-11.

### Sub-phase decomposition (6 plans)

Per ROADMAP.md Phase 2 section + mega-prompt Fase 2:

| Sub-phase  | Goal                                                                                                                                                                                                                                                                                                          | Wave                        | Maps to req IDs                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------ |
| 2.1        | EN region canonical (Jerusalem) — `/en/jerusalem/`, 1500–2500 words, 8–12 sections, 5+ active affiliates, schema TouristDestination + BreadcrumbList + FAQPage, photo gallery with restricted-site acknowledgments                                                                                            | 1                           | CNT-01, SEO-04 (Jerusalem application), IMG-04, IMG-05 |
| 2.2        | HE region canonical (`/jerusalem/`) — native rewrite via `hebrew-content-writer` skill (NOT literal translation), ≥85% of EN word count, full schema parity, paired religious naming applied                                                                                                                  | 2 (after 2.1)               | CNT-02                                                 |
| Checkpoint | **Phase 2.2 pilot-switch checkpoint** — evaluate before advancing to 2.3. If any of 3 criteria fails → switch to Tel Aviv (Phase 2.1+2.2 redo, no Quality Gate impact yet). Past 2.3 the door closes.                                                                                                         | —                           | CNT-03                                                 |
| 2.3        | Jerusalem sub-destinations (5–10, EN + HE pairs) — Old City Quarters (Jewish/Christian/Muslim/Armenian), Western Wall, Holy Sepulchre, Yad Vashem, Mahane Yehuda, Mount of Olives, City of David. Each 800–1200 words, schema TouristAttraction (+ ReligiousBuilding where applicable), ≥1 affiliate per page | 3 (after checkpoint passes) | CNT-04                                                 |
| 2.4        | Itinerary content — ≥1 "X days in Jerusalem" or "7 days in Israel anchored on Jerusalem" page tying pilot to day-trip neighbors (Dead Sea, Bethlehem-flagged, Masada)                                                                                                                                         | 4                           | CNT-05                                                 |
| 2.5        | Hub + legal pages (EN + HE) — homepage region grid, `/regions/`, About, Contact, Privacy, Affiliate Disclosure, Accessibility Statement (Hatzaharat Negishut) with named coordinator                                                                                                                          | 5 (parallel to 2.4 OK)      | CNT-06, CNT-07, A11Y-03, A11Y-04                       |
| 2.6        | Pilot QA + **Quality Gate** — audit dashboard run, Lighthouse CI 3-run-median per page, axe-core, audit_a11y.py, manual SERP review per region (compensates for proxied R3 data), Quality Gate report generator runs                                                                                          | 6 (final)                   | All Phase 2 reqs verified                              |

### Pilot region choice — LOCKED: Jerusalem

- Composite score 9.4 (all 3 region-aware research files converged independently)
- Highest international tourism volume + densest affiliate inventory + best competitor-weakness gap (no peer offers native Hebrew + IS 5568 + 2026 Lighthouse perf)
- Religious-tourism complexity is THE moat — Jerusalem exhausts every Israel-specific differentiator; every other region strictly easier after

### Pilot-switch checkpoint (end of 2.2, before 2.3) — LOCKED

If any of these fails after 2.2 (EN + HE canonicals complete), pivot to Tel Aviv (composite 8.7):

1. **Editorial style passes AUD-017..AUD-020** — religious-site dual naming applied; `Western Wall` (not "Wailing Wall"); `Bethlehem/Hebron/Jericho` carry `administrativeStatus`; no political tone
2. **Old City restricted-site images sourced** — ≥80% of restricted-site (Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í Gardens) images have cleared `restrictedSiteAcknowledgment` field (Wikimedia CC-BY or IGPO archive)
3. **Hebrew translation throughput acceptable** — 2.2 took ≤2× the time budgeted for the EN canonical. If 3× or worse, pivot.

Checkpoint outcome documented at `data/pilot-checkpoint.md` (pass/switch + rationale). Past Phase 2.3 (HE sub-destinations written), the switch is no longer reversible cheaply.

### R3 keyword data strategy — LOCKED: PROXIED (2026-05-11 user decision)

- **Use `PITFALLS.md §4.1` Jerusalem H-tag scaffolding VERBATIM** — primary keyword "things to do in Jerusalem" (informational); secondary cluster ("Jerusalem itinerary", "Jerusalem hotels", "Jerusalem tours", "best time to visit Jerusalem"); H2/H3 structure already drafted in research
- **NO Ahrefs/DataForSEO purchase** — accept ±50% margin on absolute volumes; relative ordering is reliable
- **Compensating control:** Phase 2.6 manual SERP review per region — for each of the top 5 Jerusalem primary keywords, manually inspect top-10 Google results and confirm our H-tag structure aligns with intent + entity coverage
- **Trigger for retroactive Ahrefs buy:** if Phase 6 monitoring shows Jerusalem rankings underperform (>position 30 at 90 days post-launch for the primary keyword), THEN buy DataForSEO ($50) and re-tune

### Language strategy at content time — LOCKED

- **EN authored first** (2.1) — gives the canonical structure
- **HE authored second as native rewrite** (2.2) — invoke `hebrew-content-writer` skill explicitly. NOT a literal translation. Ktiv maleh, morphological keyword variants, gender-inclusive patterns per the skill's `references/hebrew-grammar-quick-ref.md`
- **No FR / RU / AR at launch.** FR scaffold remains filesystem-only. Phase 3+ may add FR per pilgrimage SEO data.

### Affiliate density per page — LOCKED (per quality profile REGION_CANONICAL)

- Region canonical (2.1, 2.2): minimum 5 active affiliate placements (Booking + Civitatis OR Viator OR GYG + Skyscanner + RentalCars OR DiscoverCars + SafetyWing). Klook/GoCity helpers throw → no UI for those partners (Conflict D)
- Sub-destination (2.3): minimum 1 active affiliate per page
- Itinerary (2.4): minimum 3 affiliates (lodging + transport + tour)
- Hub pages (2.5): no affiliate requirement (HUB profile)
- AIDs may be placeholders at launch (helpers return public URLs gracefully) — flip when AIDs arrive

### Photo sourcing strategy — LOCKED

- **Primary source:** Wikimedia Commons CC-BY/CC-BY-SA
- **Supplementary:** IGPO (Israel Government Press Office) archive
- **Restricted sites (Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í Gardens):** every image MUST have `restrictedSiteAcknowledgment` field per IMG-06; use IGPO archive shots or Wikimedia wide architectural shots — never commission new shoots without written permits
- **Cover image:** ≥1200px width (enforced by Sharp width gate from Phase 1.5), ideally 1600px+ for hero usage
- **Credit ledger compliance:** every imported image MUST have entry in `data/photo-credits.json` — CI blocks otherwise

### Accessibility statement (2.5 — A11Y-03 + A11Y-04)

- Page slugs: `/accessibility-statement` (EN) and `/הצהרת-נגישות` (HE) — fallback to `/he/accessibility-statement` if Hebrew slug routing turns out tricky in Phase 2.5 execution
- Required content per `israeli-accessibility-compliance` skill: commitment, standard (IS 5568:2020 / WCAG 2.1 AA), features, known limitations, named coordinator, contact (`mailto:` + `tel:`), last-audit date, accessibility feedback form
- Footer link to statement in current locale on every page (already wired in Phase 1.8 via `accessibility-link.ts`)

### Accessibility coordinator (A11Y-04) — UNRESOLVED

- **Phase 2.5 will PAUSE** if no real coordinator value provided
- Required fields: name, phone, email — placeholder values NOT acceptable (IS 5568 statutory exposure)
- Mitigation: planner adds explicit user-prompt in 2.5 plan at the "populate coordinator" step; executor sees `<value>__REQUIRES_USER_INPUT__</value>` placeholder and halts with a clear question

### Religious site naming (per SEO-04 audit rules) — LOCKED

Applied site-wide (Phase 1.8 detector exists; 2.1+ enforce):

- **Temple Mount / Haram al-Sharif** — paired on first reference in every page; subsequent references can use either
- **Western Wall** (NOT "Wailing Wall")
- **Church of the Holy Sepulchre** (standard naming)
- **City of David / Silwan** — paired when discussing archaeology vs neighborhood
- **Bethlehem / Hebron / Jericho** — `administrativeStatus: "palestinian-authority"` frontmatter when covered (Bethlehem deferred to Phase 3)

### Claude's Discretion

Planner + executor flexibility:

- **Word count within band** — 1500–2500w for region canonical; 800–1200w for sub-destination. Optimize for reader value, not target.
- **Section ordering within canonical** — best-time → top-attractions → where-to-stay → tours → how-to-get-there → food → day-trips → FAQ is the suggested order from mega prompt, but planner can reorder if reader flow demands
- **Specific sub-destinations chosen for 2.3** — pick from FEATURES.md / PITFALLS.md §4.1.1 Jerusalem sub-destination list (Old City Quarters, Western Wall, Holy Sepulchre, Yad Vashem, Mahane Yehuda, Mount of Olives, City of David, Mount Zion, Armenian Quarter). Aim for 7±2 to leave room for Phase 4 long-tail.
- **Itinerary length** — 1 itinerary minimum; planner may write a second if it fits the wave timeline without bloating
- **Image quantity per page** — 3-6 photos for canonical hero+inline + 1-2 per sub-destination; per IMG-04 hero `priority` + `fetchpriority="high"`
- **FAQ count** — 5-10 questions in canonical's FAQPage schema
- **`<ShabbatNotice>` invocation** — every page touching opening hours data triggers it; planner may decide static prop values per page (canonical: general "many sites close Fri PM"; specific sub-dest: site-specific close times)

</decisions>

<specifics>
## Specific Ideas

References from research that anchor execution:

- **PITFALLS.md §4.1 Jerusalem H-tag scaffolding** is the template — `H1: Things to do in Jerusalem (2026 Guide)` / H2 sections covering: Best time to visit / Top 10 attractions / Where to stay / Tours and day trips / How to get there / Food in Jerusalem / Day trips from Jerusalem / FAQ
- **`hebrew-content-writer` skill** is the canonical Hebrew authoring skill — invoke explicitly at start of 2.2 for register selection (default: business-casual for marketing/UX), ktiv maleh adherence, morphological keyword expansion
- **Earth Trekkers as inspiration for itinerary structure** (FEATURES.md §2 Tier 3) — "X days in Jerusalem" pages there hit Lighthouse 85+ and clear affiliate monetization without being spammy
- **AffiliateDisclosure component must appear within first viewport of FIRST affiliate link on every monetized page** (Phase 1.5 component has `data-component="affiliate-disclosure"` — audit rule AUD-009 enforces position)
- **Plausible script (Phase 1.1) tracks pageviews automatically** — no per-page work needed for analytics; UTM tracking on CTAs via affiliate helpers
- **Schema injection pattern** — page-level `<JsonLd schema={...}/>` from RSC in each Jerusalem page; root layout already injects `Organization` schema
- **religious-sites.json** has Wikidata IDs + paired HE/EN/AR names — schema generators consume directly for `alternateName[]`
- **Hebcal API** is available for `<ShabbatNotice>` — Phase 2 uses STATIC props per page (Hebcal runtime widget is DIF-V2-01, deferred); copy specifies general Shabbat hours, not site-specific live data

</specifics>

<code_context>

## Existing Code Insights

Phase 1 left a complete foundation. Phase 2 is content-on-infrastructure.

### Reusable Assets (all operational from Phase 1)

| Asset                                                                                                  | Used in Phase 2 sub-phase                             |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `app/[locale]/layout.tsx` (root layout, lang+dir + Organization schema + Plausible + SkipNav + Footer) | All — every page inherits                             |
| `components/travel/RegionHero`                                                                         | 2.1, 2.2 hero                                         |
| `components/travel/AttractionGrid`                                                                     | 2.1, 2.2 top-attractions section                      |
| `components/travel/AffiliateCard` (wired with 9 real helpers + AffiliateDisclosure)                    | 2.1, 2.2, 2.3, 2.4 — every monetized placement        |
| `components/travel/PhotoGallery` (srcset + AVIF/WebP, consumes `getCredit`)                            | All pages with photos                                 |
| `components/travel/ItineraryCard`                                                                      | 2.4 itinerary                                         |
| `components/travel/WhereToStay` (Booking + Hostelworld wrapped)                                        | 2.1, 2.2 stay section                                 |
| `components/travel/TransportInfo` (Skyscanner + RentalCars + DiscoverCars wrapped)                     | 2.1, 2.2 transport section                            |
| `components/travel/BestTimeToVisit`                                                                    | 2.1, 2.2 best-time section                            |
| `components/travel/ShabbatNotice` (static, props-driven)                                               | Pages with hours data                                 |
| `components/travel/Price` (multi-currency static)                                                      | All affiliate placements showing price                |
| `components/travel/StickyCTA`                                                                          | All pages with primary CTA                            |
| `components/layout/Footer` (async, getLocale; renders accessibility-link)                              | All pages                                             |
| `lib/affiliate/{9 real, 2 stubs}`                                                                      | 2.1, 2.2, 2.3, 2.4                                    |
| `lib/schema/{11 generators}` + `<JsonLd>` RSC component                                                | All pages                                             |
| `lib/seo/{canonical, hreflang, metadata, naming, accessibility-link}`                                  | All pages                                             |
| `lib/photo-credits` (getCredit, validate) + Sharp gate                                                 | All image usage                                       |
| `data/religious-sites.json` (25 sites, paired HE/EN/AR + Wikidata)                                     | 2.1, 2.2, 2.3 schema generators                       |
| `data/entity-dict.json` (113 entities) + `lib/ner/detector`                                            | 2.6 QA — verify content has zero unmonetized mentions |
| `scripts/audit/run.ts` + 34 AUD rules + `scripts/audit/quality-gate.ts`                                | 2.6 QA + Quality Gate                                 |
| `scripts/qa/check-credits.mjs` (pre-commit)                                                            | All content commits                                   |
| `scripts/qa/validate-schema.mjs` (pre-commit)                                                          | All schema-using commits                              |
| `.lighthouserc.cjs` + GH Actions                                                                       | 2.6 perf gate                                         |
| `.agents/skills/hebrew-content-writer/SKILL.md`                                                        | 2.2 invoked explicitly                                |
| `.agents/skills/copywriting/SKILL.md`                                                                  | 2.1 (EN authoring)                                    |
| `.agents/skills/affiliate-marketing/SKILL.md`                                                          | 2.1, 2.2 monetization placement                       |
| `.agents/skills/affiliate-page-generator/SKILL.md`                                                     | 2.1, 2.2 page structure                               |
| `.agents/skills/israeli-accessibility-compliance/SKILL.md`                                             | 2.5 accessibility statement                           |

### Established Patterns

- **MDX content lives in `content/{he,en}/regions/jerusalem.mdx` etc.** Velite (Phase 1.6) compiles to typed collections
- **Schema injection per page:** import generator, build schema object, pass to `<JsonLd schema={...}/>` in page component (NOT layout, except `Organization`)
- **Affiliate placements via component, not raw links:** every monetized URL goes through `<AffiliateCard partner={...} data={...}/>` — ESLint enforces
- **Hreflang reciprocity:** `generateMetadata` in each page exports alternates correctly; ESLint catches missing reciprocal tags via audit dashboard

### Integration Points

- **Content dir:** `content/{he,en}/regions/jerusalem.mdx`, `content/{he,en}/sub-destinations/{slug}.mdx`, `content/{he,en}/itineraries/{slug}.mdx`, `content/{he,en}/legal/{slug}.mdx`
- **Routes:** `app/[locale]/[region]/page.tsx` (renders region canonical from Velite); `app/[locale]/[region]/[subdest]/page.tsx` (sub-destinations); `app/[locale]/itineraries/[slug]/page.tsx`; `app/[locale]/{about,contact,privacy,affiliate-disclosure,accessibility-statement}/page.tsx`
- **Photo credits:** Every image goes into `public/images/jerusalem/{slug}.{ext}` + entry in `data/photo-credits.json`
- **Audit:** `pnpm qa:audit && pnpm qa:quality-gate` after every commit; gate writes pass/fail markdown

</code_context>

<deferred>
## Deferred Ideas

- **Hebrew slug aliases** — Phase 2 ships EN slugs in both locales. Hebrew aliases like `/ירושלים/` redirecting to `/jerusalem/` deferred to v2 (per PROJECT.md key decision)
- **FR locale content** — scaffold-only; FR pages not built. Re-evaluate per Phase 3 pilgrimage SEO signal
- **RU locale** — deferred further; not in Phase 2 or 3
- **Hebcal API runtime widget** — `<ShabbatNotice>` static props in Phase 2; runtime API integration is DIF-V2-01
- **Real-time price/FX conversion** — `<Price>` uses static daily-cached FX; no runtime conversion service
- **Reg-35 accessibility preferences widget** — Phase 2.5 ships only the Hatzaharat Negishut page; the toggleable widget per `israeli-accessibility-compliance/references/widget-implementation.md` is DIF-V2-02 (defer unless legal exposure changes; <25 employees not required)
- **Live affiliate inventory display** — Phase 2 affiliate cards link out without showing live availability/prices. Real-time API integration deferred indefinitely (we're not a marketplace)
- **Bethlehem region content** — explicitly Phase 3 with `/west-bank/bethlehem/` admin-status framing; mentioned in Jerusalem day-trips section but no canonical page in Phase 2
- **AI-generated itineraries** — `<ItineraryCard>` consumes hand-written content only; no LLM generation in Phase 2 or v1
- **Manual SERP review automation** — Phase 2.6 manual SERP review is human-driven; automation deferred (would require paid SERP API like SerpAPI or DataForSEO — same buy we declined)
- **User accounts / saved trips** — out of scope per PROJECT.md (no user state)
- **Tel Aviv content** — fallback only; if Phase 2.2 checkpoint flips pilot, then 2.1+2.2 redo as Tel Aviv. Otherwise Tel Aviv is Phase 3.1.
- **Plausible domain decision** — currently placeholder `visitisrael.site`; if real domain differs, codemod swap during Phase 6 deploy
- **Booking CJ vs Awin application** — application submitted in Phase 1.4 stub state; activation timeline outside our control. Affiliate link works without AID at launch.

</deferred>

---

_Phase: 02-pilot-region-jerusalem-m2_
_Context gathered: 2026-05-11_
_Mode: YOLO auto — pre-extracted from research convergence; user confirmed proxied R3 data strategy_
