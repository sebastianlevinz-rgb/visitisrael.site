# Phase 2: Pilot Region Jerusalem (M2) — Research

**Researched:** 2026-05-11
**Domain:** Content authoring on operational infrastructure (EN+HE MDX, schema, affiliate placement, IS 5568 a11y, photo licensing, audit/Lighthouse Quality Gate)
**Confidence:** HIGH — Phase 1 left a fully-instrumented foundation; Phase 2 reuses verified primitives. The only LOW-confidence input is R3 keyword volume, which CONTEXT.md locked as PROXIED (compensating control: manual SERP review in 2.6).

## Summary

Phase 2 is **content-on-infrastructure**. Every component, schema generator, audit rule, helper, validator, and CI gate needed to write a region canonical is shipped, tested, and verifiable (`pnpm test --run` = 503/504 green; `pnpm qa:audit` = 47 pages × 34 rules; `pnpm qa:quality-gate` = pass-in-structural-mode). Six sub-phases write ~14–20 MDX files (Jerusalem canonical EN+HE, 5–10 sub-destination pairs, ≥1 itinerary pair, 5 legal pages × 2 langs, hub pages), produce ~30–40 ledgered images with restricted-site clearances, and end in a 10-criterion Quality Gate that either writes `data/quality-gate-pass.md` (advance to Phase 3) or `data/quality-gate-failure.md` (HARD STOP).

The research below answers two questions the planner needs: (1) what concrete steps does each sub-phase decompose into, and (2) how is every Phase-2 requirement verified before the Quality Gate. Most "what to build" decisions are pre-locked by CONTEXT.md, PITFALLS §4.1 (verbatim Jerusalem H-tag scaffolding), and the operational primitives; the planner's job is to convert these into ordered Plan tasks with verification commands.

**Primary recommendation:** Lean entirely on existing infrastructure. The Phase 1 audit dashboard, photo-credits ledger, schema generators, and Lighthouse CI ARE the verification layer — every Phase-2 plan should specify (a) which MDX files to write, (b) which images to ledger, (c) which schema generators to invoke, and (d) which `pnpm qa:*` command proves the requirement is satisfied. Do not invent new infrastructure in Phase 2.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Sub-phase decomposition (6 plans):**

| Sub-phase  | Goal                                                                                                                                                                                               | Wave                   | Maps to req IDs                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------ |
| 2.1        | EN region canonical (`/en/jerusalem/`) — 1500–2500w, 8–12 sections, 5+ active affiliates, schema TouristDestination + BreadcrumbList + FAQPage, photo gallery with restricted-site acknowledgments | 1                      | CNT-01, SEO-04 (Jerusalem application), IMG-04, IMG-05 |
| 2.2        | HE region canonical (`/jerusalem/`) — native rewrite via `hebrew-content-writer`, ≥85% of EN word count, schema parity, paired religious naming                                                    | 2 (after 2.1)          | CNT-02                                                 |
| Checkpoint | Pilot-switch evaluation (3 criteria)                                                                                                                                                               | —                      | CNT-03                                                 |
| 2.3        | 5–10 Jerusalem sub-destinations (EN+HE pairs), 800–1200w, TouristAttraction schema (+ ReligiousBuilding where applicable), ≥1 affiliate per page                                                   | 3 (after checkpoint)   | CNT-04                                                 |
| 2.4        | ≥1 Jerusalem itinerary page (EN+HE) tying pilot to day-trip neighbors                                                                                                                              | 4                      | CNT-05                                                 |
| 2.5        | Hub + legal pages (homepage, /regions/, About, Contact, Privacy, Affiliate Disclosure, Accessibility Statement with named coordinator)                                                             | 5 (parallel to 2.4 OK) | CNT-06, CNT-07, A11Y-03, A11Y-04                       |
| 2.6        | Pilot QA + Quality Gate (audit dashboard, Lighthouse 3-run-median, axe-core, audit_a11y.py, manual SERP review, Quality Gate generator)                                                            | 6 (final)              | All Phase 2 reqs verified                              |

**Pilot region:** Jerusalem (composite 9.4); fallback Tel Aviv (composite 8.7) only if 2.2 checkpoint fails.

**Pilot-switch checkpoint (end of 2.2, before 2.3):** Pivot to Tel Aviv if ANY of:

1. AUD-017..AUD-020 editorial-style audits fail on the EN canonical (Wailing Wall regex, biased framing, Temple Mount pairing, administrativeStatus frontmatter)
2. <80% of restricted-site (Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í) images have cleared `restrictedSiteAcknowledgment`
3. 2.2 HE translation throughput >2× the time budgeted for 2.1 EN canonical (signals 2.3 will exceed budget)

Outcome documented at `data/pilot-checkpoint.md`. Past 2.3, switch is no longer reversible cheaply.

**R3 keyword data strategy:** PROXIED (no Ahrefs/DataForSEO purchase). Use PITFALLS §4.1 Jerusalem H-tag scaffolding VERBATIM. Compensating control: 2.6 manual SERP review of top-10 Google results for top-5 primary keywords. Retroactive Ahrefs buy only if Phase 6 monitoring shows rankings underperform.

**Language strategy:** EN authored first (2.1) → HE native rewrite second (2.2) via `hebrew-content-writer` skill. NOT literal translation. Ktiv maleh, morphological keyword variants, gender-inclusive patterns. No FR/RU/AR at launch.

**Affiliate density per page (REGION_CANONICAL profile):**

- Region canonical (2.1, 2.2): minimum 5 active affiliate placements (Booking + Civitatis OR Viator OR GYG + Skyscanner + RentalCars OR DiscoverCars + SafetyWing). Klook/GoCity helpers throw — no UI for those partners.
- Sub-destination (2.3): minimum 1 active affiliate per page
- Itinerary (2.4): minimum 3 affiliates (lodging + transport + tour)
- Hub pages (2.5): no affiliate requirement (HUB profile)
- AIDs may be placeholders at launch — helpers return public URLs gracefully.

**Photo sourcing:**

- Primary: Wikimedia Commons CC-BY/CC-BY-SA
- Supplementary: IGPO archive
- Restricted sites (Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í): every image MUST have `restrictedSiteAcknowledgment` field per IMG-06; use IGPO archive or Wikimedia wide architectural shots — NEVER commission new shoots without written permits.
- Cover image ≥1200px (enforced by Sharp width gate); ideally 1600px+ for hero usage
- Credit-ledger compliance: every image MUST have entry in `data/photo-credits.json`

**Accessibility statement (2.5):**

- Slugs: `/accessibility-statement` (EN) + `/הצהרת-נגישות` HE (fallback `/he/accessibility-statement` if Hebrew slug proves tricky)
- Required: commitment, standard (IS 5568:2020 / WCAG 2.1 AA), features, known limitations, named coordinator (name + phone + email — placeholder NOT acceptable, IS 5568 statutory exposure), feedback form, last-audit date
- Coordinator UNRESOLVED — 2.5 will PAUSE if no real coordinator provided (placeholder `__REQUIRES_USER_INPUT__`)

**Religious-site naming (SEO-04):**

- Temple Mount / Haram al-Sharif — paired on first reference
- Western Wall (NOT "Wailing Wall")
- Church of the Holy Sepulchre
- City of David / Silwan — paired when discussing archaeology vs neighborhood
- Bethlehem / Hebron / Jericho — `administrativeStatus: "palestinian-authority"` frontmatter when covered (Bethlehem deferred to Phase 3)

### Claude's Discretion

- Word count within band (1500–2500w canonical; 800–1200w sub-destination) — optimize for reader value, not target
- Section ordering within canonical (suggested: best-time → top-attractions → where-to-stay → tours → how-to-get-there → food → day-trips → FAQ; can reorder if reader flow demands)
- Specific sub-destinations chosen for 2.3 — pick 7±2 from: Old City Quarters (Jewish/Christian/Muslim/Armenian), Western Wall, Holy Sepulchre, Yad Vashem, Mahane Yehuda, Mount of Olives, City of David, Mount Zion, Tower of David, Israel Museum
- Itinerary length — 1 itinerary minimum; planner may write a second if it fits the wave timeline
- Image quantity per page — 3–6 photos canonical hero+inline + 1–2 per sub-destination; hero `priority` + `fetchpriority="high"` per IMG-04
- FAQ count — 5–10 questions in canonical's FAQPage schema
- `<ShabbatNotice>` static prop values per page (general for canonical; site-specific for sub-dest)

### Deferred Ideas (OUT OF SCOPE)

- Hebrew slug aliases (Phase 2 ships EN slugs in both locales; HE aliases → v2)
- FR locale content (scaffold-only)
- RU locale (not Phase 2 or 3)
- Hebcal API runtime widget (DIF-V2-01)
- Real-time price/FX conversion
- Reg-35 accessibility preferences widget (DIF-V2-02)
- Live affiliate inventory display
- Bethlehem region content (Phase 3, `/west-bank/bethlehem/`; mentioned in Jerusalem day-trips but no canonical page)
- AI-generated itineraries
- Manual SERP review automation
- User accounts / saved trips
- Tel Aviv content (fallback only)
- Plausible domain swap (Phase 6)
- Booking CJ vs Awin activation timeline
  </user_constraints>

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                                                                                                                                | Research Support                                                                                                                                                                  |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CNT-01  | Jerusalem region canonical EN (`/en/jerusalem/`) — 1500-2500w, 8-12 sections, 5+ active affiliates, schema TouristDestination + BreadcrumbList + FAQPage                                                   | §1 sub-phase 2.1 skeleton; PITFALLS §4.1 H-tag scaffolding; 11 schema generators from lib/schema/; 9 affiliate helpers wired in `<AffiliateCard>`                                 |
| CNT-02  | Jerusalem region canonical HE (`/jerusalem/`) — native rewrite via hebrew-content-writer, ≥85% of EN word count, schema parity, paired religious naming                                                    | §1 sub-phase 2.2 skeleton; hebrew-content-writer SKILL.md (ktiv maleh, business-casual register, morphological variants); AUD-007 word-count parity gate enforces 0.85-1.40 ratio |
| CNT-03  | Phase 2.2 pilot-switch checkpoint — 3 criteria evaluated, `data/pilot-checkpoint.md` written                                                                                                               | §4 pilot-switch mechanics; `pnpm qa:pilot-checkpoint` script (new in 2.2) reads audit results + image ledger + 2.1/2.2 timing                                                     |
| CNT-04  | 5-10 Jerusalem sub-destination pages (EN+HE) — 800-1200w each, schema TouristAttraction (+ ReligiousBuilding for Western Wall/Holy Sepulchre/Dome of the Rock), ≥1 affiliate, breadcrumb back to canonical | §1 sub-phase 2.3 skeleton; data/religious-sites.json has 25 paired-naming entries the schema generators consume directly                                                          |
| CNT-05  | ≥1 Jerusalem itinerary page (EN+HE) tying pilot to day-trip neighbors                                                                                                                                      | §1 sub-phase 2.4 skeleton; `<ItineraryCard>` component shipped; **Wave 0 gap: Velite has no Itinerary collection — add to velite.config.ts**                                      |
| CNT-06  | Hub pages: homepage (region grid + main CTAs), `/regions/` index, `/en/regions/`                                                                                                                           | §1 sub-phase 2.5 skeleton; HUB profile in quality-profiles (no affiliate requirement); `<RegionHero>` consumed                                                                    |
| CNT-07  | Legal pages in EN+HE: About, Contact, Privacy, Affiliate Disclosure, Accessibility Statement                                                                                                               | §1 sub-phase 2.5 skeleton; Legal collection in velite.config.ts; UTILITY profile                                                                                                  |
| A11Y-03 | `/accessibility-statement` (EN) + `/הצהרת-נגישות` (HE) exist with IS 5568 required content                                                                                                                 | §6 a11y coordinator pause mechanism; israeli-accessibility-compliance SKILL.md template; AUD-027 enforces existence                                                               |
| A11Y-04 | Named coordinator with real name + phone + email — placeholder NOT acceptable                                                                                                                              | §6 pause-on-`__REQUIRES_USER_INPUT__` pattern; pre-commit hook + executor halt                                                                                                    |
| A11Y-05 | Footer of every page links to accessibility statement in current locale                                                                                                                                    | Phase 1 wired (Footer imports `accessibilityStatementHref` from lib/seo/accessibility-link.ts); AUD-028 audit rule enforces; Phase 2 verifies live on every Jerusalem page        |
| SEO-04  | Religious-site naming convention applied site-wide on first-reference                                                                                                                                      | Phase 1 detectors operational (AUD-017..AUD-020); Phase 2 first editorial application — PITFALLS §3.1 pairing rules baked into H-tag scaffolding                                  |
| IMG-04  | Hero images use `priority` + `fetchpriority="high"` on canonical pages                                                                                                                                     | `<RegionHero>` component contract honors this (per FND-03 plan 05); AUD-012 enforces                                                                                              |
| IMG-05  | `restrictedSiteAcknowledgment` field populated for every image from Western Wall/Holy Sepulchre/Dome of the Rock/Bahá'í Gardens                                                                            | Phase 1 Zod schema enforces (lib/photo-credits-schema.ts RESTRICTED_SUBJECTS); AUD-026 enforces; PITFALLS §5.4 sourcing strategy locked                                           |

</phase_requirements>

## 1. Per-Sub-Phase Implementation Skeleton

### Sub-phase 2.1 — Jerusalem EN Canonical

- **Goal:** Author `content/en/regions/jerusalem.mdx` to production depth (1500–2500w, 8–12 sections, 5+ affiliates, schema TouristDestination + BreadcrumbList + FAQPage)
- **Maps to:** CNT-01, SEO-04 (Jerusalem application), IMG-04, IMG-05
- **Wave:** 1
- **Inputs from prior phases:** All Phase 1 components/helpers/schema/validators operational; `data/religious-sites.json` (25 sites paired naming + Wikidata IDs); `lib/schema/{touristDestination,breadcrumb,faq}.ts`; 9 affiliate helpers + `<AffiliateCard>`; `<JsonLd>` RSC injector; Velite Region collection
- **Outputs:**
  - `content/en/regions/jerusalem.mdx`
  - `app/[locale]/[region]/page.tsx` (if not yet generated by Phase 1 — verify in Wave 0)
  - 3–6 image files in `public/images/jerusalem/` (hero + 2–5 inline)
  - 3–6 new entries in `data/photo-credits.json` (hero with width≥1600; restricted-site images with `restrictedSiteAcknowledgment`)
  - 1 new entry in `app/sitemap.ts` static path list (if config-driven approach requires explicit registration — verify in Wave 0)
- **Concrete steps (planner converts to tasks):**
  1. **Wave 0 verification:** Confirm Velite `Region` collection compiles current empty `content/en/regions/*.mdx`; confirm `app/[locale]/[region]/page.tsx` route renderer exists (NOT shipped by Phase 1 per ROADMAP plan 08 self-check — Phase 1 has only `/admin/*`, sitemap, robots; **Wave 0 task: scaffold the region page renderer that reads Velite output, injects JsonLd, renders RegionHero + sections**); confirm `pnpm qa:audit` recognizes the route. If route missing, add it as the FIRST task of 2.1.
  2. **Image sourcing (parallel with copy drafting):**
     - Source hero shot from Wikimedia Commons (Old City rooftops or Tower of David), width ≥1600px, CC-BY or CC-BY-SA, no identifiable subjects
     - Source 2–5 inline shots covering: Western Wall plaza (IGPO archive — restricted), Holy Sepulchre exterior (Wikimedia wide architectural — restricted), Mahane Yehuda market, Mount of Olives panorama, Yad Vashem entrance
     - For each restricted site (Western Wall, Holy Sepulchre, Dome of the Rock): populate `restrictedSiteAcknowledgment` field per PITFALLS §5.4 (cite IGPO partnership clearance OR Wikimedia wide-architectural-shot exemption OR explicit permit URL)
     - Run `pnpm qa:credits` — must exit 0 before any commit including images
  3. **Copy authoring (invoke `copywriting` skill + `affiliate-page-generator` skill):**
     - H-tag structure VERBATIM from PITFALLS §4.1:
       - H1: Things to Do in Jerusalem: A Complete Travel Guide
       - H2: When to Visit Jerusalem (best time, weather, Shabbat & holiday calendar)
       - H2: Where to Stay in Jerusalem (Old City / German Colony / Mamilla / outside the walls) — wrap with `<WhereToStay partner="booking" />`
       - H2: Top Things to Do in the Old City (H3 Western Wall, H3 Holy Sepulchre, H3 Temple Mount / Haram al-Sharif — PAIRED on first reference, H3 Via Dolorosa, H3 Quarters)
       - H2: Top Things to Do in West Jerusalem (H3 Mahane Yehuda, H3 Yad Vashem, H3 Israel Museum, H3 Mount Herzl)
       - H2: Top Day Trips from Jerusalem (Dead Sea & Masada, Bethlehem with admin-status framing, Tel Aviv) — wrap with `<AffiliateCard partner="viator" />` or Civitatis or GYG (one of three required)
       - H2: How to Get Around Jerusalem (light rail, walking, taxis, parking) — wrap with `<TransportInfo partner="skyscanner" />` for flights, `<AffiliateCard partner="rentalcars" />` or DiscoverCars
       - H2: Where to Eat in Jerusalem
       - H2: Jerusalem on Shabbat: What's Open — invoke `<ShabbatNotice>` with general props
       - H2: FAQ (5–10 questions, schema-driven)
     - Religious-naming: every first reference of restricted sites uses correct name (`Western Wall` NOT "Wailing Wall"; `Church of the Holy Sepulchre`; `Temple Mount / Haram al-Sharif` paired within 300 chars). `lib/seo/naming.ts` detectors will catch violations.
     - Bethlehem mentions in day-trips section MUST include the "West Bank — practical notes" framing per PITFALLS §3.3 (no canonical page per CONTEXT.md deferred list — link is editorial reference only)
     - Affiliate placements: minimum 5 active. **AffiliateDisclosure component must render DOM-before the first `<AffiliateCard>`** — Phase 1 wired this via `await AffiliateDisclosure({})` resolution; verify it lands within first viewport-height (AUD-009).
     - Word count target: 1800–2200w (mid-band for safety; AUD-007 enforces 0.85-1.40 ratio with HE; staying mid-band leaves headroom for HE rewrite to land within band)
     - Frontmatter: `lang: "en"`, `title` (50–60 chars, primary keyword early), `description` (120–160 chars), `slug: "jerusalem"`, `region: "jerusalem"`, `publishedAt`, `updatedAt`
  4. **Schema injection:** In `app/[locale]/[region]/page.tsx` (route renderer), build schemas via:
     - `touristDestinationSchema({ name, description, geo, image, inLanguage: 'en' })`
     - `breadcrumbSchema([{name: 'Home', item: '/en'}, {name: 'Jerusalem', item: '/en/jerusalem'}])`
     - `faqSchema(faqQuestions)` consumed from MDX frontmatter or page-component constant
     - Wrap with `<JsonLd schema={...} />` (RSC pattern)
  5. **Validation (must pass before commit):**
     - `pnpm qa:credits` — all images ledgered; restricted sites have `restrictedSiteAcknowledgment`
     - `pnpm qa:schema` — JSON-LD validates
     - `pnpm qa:ner` — surfaces unmonetized mentions (must be 0 on canonical per Phase 4 long-tail target)
     - `pnpm build` — Next.js prerender succeeds
     - `pnpm qa:audit` — REGION_CANONICAL profile score ≥85 on `/en/jerusalem`
     - `pnpm lint` and `pnpm test --run` — green
- **Skill invocations:**
  - `copywriting` (Step 3, before authoring) — for headline + CTA + section-opener structure
  - `affiliate-page-generator` (Step 3, during affiliate placement) — for monetization placement within editorial flow
  - `affiliate-marketing` (Step 3, while choosing partners) — for the Booking/Civitatis-vs-Viator-vs-GYG/Skyscanner mix decision per section
- **Manual review touchpoints:**
  - **R3 keyword validation (manual SERP review):** per CONTEXT.md proxied-data strategy, planner can defer the bulk SERP review to 2.6, but should validate during 2.1 that "things to do in jerusalem" SERP top-10 doesn't reveal a missing entity that PITFALLS §4.1's H-tag scaffolding omits
  - **Restricted-site image legal review:** human reads `restrictedSiteAcknowledgment` for Western Wall + Holy Sepulchre + Dome of the Rock images and confirms the citation is defensible (cleared archive OR wide-architectural exemption). Phase 1.5 schema enforces presence; human must verify content.

### Sub-phase 2.2 — Jerusalem HE Canonical

- **Goal:** Native Hebrew rewrite of `content/he/regions/jerusalem.mdx` via `hebrew-content-writer` skill — NOT literal translation. ≥85% of EN word count, full schema parity, paired religious naming.
- **Maps to:** CNT-02 (+ checkpoint CNT-03 evaluated at end)
- **Wave:** 2 (after 2.1)
- **Inputs from prior phases:** EN canonical complete (2.1); Hebrew Tailwind preset already wired (Phase 1 plan 02); SkipNav Hebrew text wired (Phase 1 plan 05); html[lang="he"][dir="rtl"] rendered by layout (Phase 1 plan 01); `<ShabbatNotice>` static-prop component shipped; data/religious-sites.json contains HE paired names (e.g., הכותל המערבי for Western Wall, כיפת הסלע for Dome of the Rock)
- **Outputs:**
  - `content/he/regions/jerusalem.mdx` — native Hebrew rewrite
  - Same 3–6 image references (reused from 2.1; `<PhotoGallery>` srcset/alt content updates to Hebrew)
  - `data/pilot-checkpoint.md` — written by `pnpm qa:pilot-checkpoint` after 2.2 commit
- **Concrete steps:**
  1. **Invoke `hebrew-content-writer` skill** — register selection: business-casual (marketing copy for general public, persuasive + benefit-focused + concise). NOT formal (gvoha — would feel sterile to Israeli readers). Skill SKILL.md is canonical source of truth.
  2. **Apply ktiv maleh consistently throughout** — vav and yod for vowels (תוכנה not תכנה; שירות not שרות). The skill references `hebrew-grammar-quick-ref.md` for edge cases.
  3. **Native rewrite, NOT translation** — work from the EN canonical's STRUCTURE (H-tags, section purposes, affiliate placements) but author each section in fresh Hebrew prose. Primary keyword: `מה לעשות בירושלים` (per PITFALLS §4.1 HE keyword table). Morphological variants worked into body: לעשות / לבקר / לטייל / לראות + בירושלים / ירושלים.
  4. **Paired religious naming on first reference (Hebrew names from religious-sites.json):**
     - הכותל המערבי (Western Wall) — never "כותל הדמעות" (Hebrew for "Wailing Wall" — would also trigger AUD-017 if transliterated; verify Hebrew detector covers HE equivalent)
     - כנסיית הקבר (Church of the Holy Sepulchre)
     - הר הבית / חראם א-שריף (Temple Mount paired with Haram al-Sharif Hebrew transliteration)
  5. **Gender handling:** Use Option C from skill SKILL.md (gender-neutral rewording) for UX copy and CTAs. Body prose can use Option B (slash notation) where natural. NEVER masculine default for mixed groups.
  6. **Affiliate placements:** Same 5+ partners as 2.1, same helper-routed pattern. `<AffiliateCard>` renders the same data-component regardless of locale; AffiliateDisclosure bilingual text is already wired (Phase 1 plan 05).
  7. **Schema parity:** Reuse same schema generator calls with `inLanguage: 'he'`. The schema generators support `inLanguage` per Phase 1 plan 04 (`as unknown as WithContext<T>` cast applied uniformly).
  8. **Word count:** Target ≥85% of EN word count (AUD-007 enforces 0.85–1.40 ratio). If EN = 1800w, HE = 1530–2520w. Native Hebrew tends to be denser; mid-band target = ~1700w in HE for 1800w EN.
  9. **Validation:**
     - `pnpm qa:credits && pnpm qa:schema && pnpm qa:ner && pnpm qa:audit && pnpm lint && pnpm test --run` — all green
     - Specifically verify AUD-017 (Wailing Wall regex), AUD-018 (biased framing), AUD-019 (Temple Mount paired), AUD-020 (administrativeStatus for Bethlehem mentions), AUD-024 (Hebrew page title with Latin chars outside dir="ltr"), AUD-025 (ktiv chaser variants <5/page) all 0 violations
  10. **Run pilot-switch checkpoint:** `pnpm qa:pilot-checkpoint` — script reads audit results, image ledger, and 2.1/2.2 timing, writes `data/pilot-checkpoint.md` with PASS/SWITCH verdict. See §4 for full spec.
- **Skill invocations:**
  - `hebrew-content-writer` (Step 1, before any writing) — read SKILL.md + references/hebrew-grammar-quick-ref.md before drafting
  - `affiliate-marketing` (Step 6) — re-confirm partner mix is identical to 2.1 (no Israel-locale variant rules)
- **Manual review touchpoints:**
  - **Native-speaker review** — IF available, human native-Hebrew reader passes the canonical for register/ktiv maleh/idiomaticity. If unavailable, document the gap in `data/pilot-checkpoint.md` as a known limitation.
  - **Throughput timing capture:** record minutes-from-start to "all tests green for HE canonical". Compare against 2.1 baseline. >2× ratio triggers checkpoint switch criterion #3.

### Checkpoint (between 2.2 and 2.3) — Pilot-Switch Evaluation

See §4 for full mechanics. Briefly: `pnpm qa:pilot-checkpoint` reads audit results + image ledger + timing log, evaluates 3 criteria, writes `data/pilot-checkpoint.md`. If all 3 PASS → proceed to 2.3. If any FAIL → halt, write rationale, await human decision (switch to Tel Aviv = redo 2.1 + 2.2, no Quality Gate impact yet; or override = continue with Jerusalem despite signal).

### Sub-phase 2.3 — Jerusalem Sub-Destinations (EN + HE Pairs)

- **Goal:** Author 5–10 sub-destination pages (EN+HE pairs) covering Old City Quarters, Western Wall, Holy Sepulchre, Yad Vashem, Mahane Yehuda, Mount of Olives, City of David, Mount Zion, Tower of David, Israel Museum (planner selects 7±2 per CONTEXT.md discretion)
- **Maps to:** CNT-04
- **Wave:** 3 (after checkpoint PASS)
- **Inputs from prior phases:** Region canonical EN+HE complete; data/religious-sites.json provides paired naming + Wikidata IDs; `lib/schema/{touristAttraction,religiousBuilding,breadcrumb}.ts`; `<AttractionGrid>` composite shipped; Velite SubDestination collection
- **Outputs:**
  - 7±2 MDX files in `content/en/sub-destinations/jerusalem-{slug}.mdx`
  - 7±2 MDX files in `content/he/sub-destinations/jerusalem-{slug}.mdx` (paired)
  - 1–2 images per sub-destination → 7–20 new image files + ledger entries
  - `app/[locale]/[region]/[subdest]/page.tsx` route renderer (Wave 0 verify — may need to scaffold)
  - Sitemap updated (config-driven enumeration via Velite output)
- **Concrete steps (per sub-destination; planner replicates):**
  1. **Wave 0 verification:** Confirm `app/[locale]/[region]/[subdest]/page.tsx` route exists (likely needs scaffolding in Phase 2.3 task 1 — Phase 1 did not ship dynamic sub-dest routes); confirm sub-dest page renders breadcrumb + TouristAttraction schema + ReligiousBuilding (where applicable, see religious-sites.json `category` field).
  2. **For each sub-destination (per CONTEXT.md discretion + R3 ranking from PITFALLS §4.1 Top 30 EN):**
     - Source 1–2 images (restricted-site rules apply for Western Wall, Holy Sepulchre, Dome of the Rock); ledger entries
     - Author EN MDX (800–1200w):
       - H1 with full entity name + qualifier (e.g., "Western Wall (Kotel) — A Visitor's Guide to Jerusalem's Holiest Site"; AUD-006 enforces head-keyword + entity qualifier)
       - 5–7 H2 sections: What is it / History / Visiting today (hours, dress code, access) / Nearby attractions / Tours / Practical info / FAQ
       - ≥1 affiliate placement (Viator/Civitatis/GYG tour OR Booking nearby hotel OR Skyscanner flights for Yad Vashem region)
       - Religious-naming compliance: Western Wall (NOT "Wailing Wall"); first paragraph references Hebrew name (Kotel) parenthetically
       - Breadcrumb back to `/en/jerusalem/` (BreadcrumbList schema)
       - Frontmatter: `lang: "en"`, `region: "jerusalem"`, `parentRegion: "jerusalem"`, `slug: "western-wall"`, etc.
     - Author HE MDX (≥85% word count of EN per AUD-007):
       - Invoke `hebrew-content-writer` skill again (lighter touch — register already established in 2.2)
       - Reuse images; alt text in Hebrew
       - Same schema, `inLanguage: 'he'`
  3. **Per-page validation:**
     - `pnpm qa:credits && pnpm qa:schema && pnpm qa:ner && pnpm qa:audit && pnpm lint && pnpm test --run` after each page commit
     - SUB_DESTINATION profile score ≥85 per page on pilot (per AUD-002)
  4. **Image-budget guard:** Track running total in `data/photo-credits.json`; if total Jerusalem-region images > ~25, flag for review (avoids accidental ledger bloat)
- **Skill invocations:** `copywriting` (each EN page), `hebrew-content-writer` (each HE page), `affiliate-marketing` (per-page partner choice — sub-destinations skew toward Viator/Civitatis tours over hotel bookings)
- **Manual review touchpoints:**
  - First sub-destination of each "type" (religious / market / museum / archaeology) receives extra review — sets the template for the rest
  - Restricted-site image clearances re-verified for each new image landing

### Sub-phase 2.4 — Jerusalem Itinerary Content

- **Goal:** Author ≥1 itinerary page (EN+HE) tying Jerusalem to day-trip neighbors (Dead Sea, Bethlehem-flagged-with-admin-status, Masada)
- **Maps to:** CNT-05
- **Wave:** 4 (after 2.3 — itinerary references sub-destinations)
- **Inputs from prior phases:** All Jerusalem content complete; `<ItineraryCard>` composite shipped; **Wave 0 gap: Velite has NO Itinerary collection — must add to velite.config.ts before 2.4 can ship**
- **Outputs:**
  - `content/en/itineraries/3-days-in-jerusalem.mdx` (or `7-days-in-israel-anchored-jerusalem.mdx` — planner picks)
  - `content/he/itineraries/3-days-in-jerusalem.mdx`
  - `app/[locale]/itineraries/[slug]/page.tsx` route renderer (Wave 0 scaffold)
  - Velite `itineraries` collection added (Wave 0 task)
- **Concrete steps:**
  1. **Wave 0 tasks (BEFORE writing content):**
     - Add `itineraries` collection to `velite.config.ts`:
       ```ts
       const itineraries = defineCollection({
         name: 'Itinerary',
         pattern: '{he,en,fr}/itineraries/**/*.mdx',
         schema: s.object({
           ...baseFrontmatter,
           durationDays: s.number().int().positive(),
           regions: s.array(s.string()).min(1),
           startRegion: s.string().min(1),
         }),
       });
       ```
     - Add `lib/schema/itinerary.ts` generator (or extend touristTrip — schema-dts has TouristTrip type; verify against existing 11 generators)
     - Scaffold `app/[locale]/itineraries/[slug]/page.tsx`
  2. **Author EN itinerary (e.g., "3 Days in Jerusalem"):**
     - H1: "3 Days in Jerusalem: A Complete Itinerary"
     - Day 1 H2 / Day 2 H2 / Day 3 H2 structure
     - Each day: morning / afternoon / evening with embedded `<AffiliateCard>` for tour bookings (Viator/Civitatis/GYG) + `<WhereToStay>` for lodging (Booking) + `<TransportInfo>` for transport (Skyscanner/RentalCars)
     - Bethlehem day-trip section MUST carry administrativeStatus framing per PITFALLS §3.3 (no canonical page — link is editorial reference)
     - Minimum 3 affiliates per CONTEXT.md (lodging + transport + tour); typical itinerary ships 6–8
     - Schema: TouristTrip (or ItemList of TouristAttraction) + BreadcrumbList
     - Frontmatter: `lang`, `title`, `description`, `slug`, `durationDays: 3`, `regions: ["jerusalem"]`, `startRegion: "jerusalem"`
  3. **Author HE itinerary:** Same flow, invoke `hebrew-content-writer`
  4. **Validation:** `pnpm qa:credits && pnpm qa:schema && pnpm qa:ner && pnpm qa:audit && pnpm lint && pnpm test --run` — score against GUIDE_OR_WINERY profile (closest match for itineraries — see plan 07 self-check; planner may add ITINERARY as a 6th profile if GUIDE feel wrong, but check first whether GUIDE works)
- **Manual review touchpoints:**
  - Day-1/Day-2/Day-3 pacing realism check (humans + claude verify the itinerary is physically walkable / drivable + accommodates Shabbat)
  - Bethlehem section editorial framing reviewed by human for political neutrality (PITFALLS §3.3)

### Sub-phase 2.5 — Hub + Legal Pages

- **Goal:** Author homepage (region grid + main CTAs), `/regions/` + `/en/regions/` indexes, and 5 legal pages × 2 langs (About, Contact, Privacy, Affiliate Disclosure, Accessibility Statement with named coordinator)
- **Maps to:** CNT-06, CNT-07, A11Y-03, A11Y-04
- **Wave:** 5 (parallel with 2.4 OK — no content dependency)
- **Inputs from prior phases:** Velite Legal collection ready; `<RegionHero>`, `<Container>`, `<Grid>` composites; lib/seo/accessibility-link.ts single source of truth for footer link; israeli-accessibility-compliance skill
- **Outputs:**
  - `app/[locale]/page.tsx` (homepage — Phase 1 may already have a placeholder; Wave 0 verify)
  - `app/[locale]/regions/page.tsx` (regions index)
  - `content/{en,he}/legal/about.mdx`
  - `content/{en,he}/legal/contact.mdx`
  - `content/{en,he}/legal/privacy.mdx`
  - `content/{en,he}/legal/affiliate-disclosure.mdx`
  - `content/{en,he}/legal/accessibility-statement.mdx` (HE may live at `הצהרת-נגישות` slug per CONTEXT.md fallback)
  - `app/[locale]/{about,contact,privacy,affiliate-disclosure,accessibility-statement}/page.tsx` route renderers (Wave 0 scaffold)
- **Concrete steps:**
  1. **Wave 0 verification:** Confirm Velite Legal collection compiles; confirm homepage `app/[locale]/page.tsx` exists (Phase 1 plan 01 likely shipped placeholder; verify it consumes `<RegionHero>` + region grid OR Wave 0 scaffold replaces it)
  2. **Homepage:**
     - `<RegionHero>` with Jerusalem hero image (cover image from 2.1 ledger)
     - Region grid showing Jerusalem (live) + 10 placeholder cards for Phase 3 regions (Tel Aviv, Dead Sea, Galilee, Eilat, Negev, Nazareth, Haifa, Golan Heights, Caesarea, Akko) — placeholder cards link to `#coming-soon` or are hidden with `aria-hidden` until Phase 3
     - Primary CTAs: "Explore Jerusalem" / "Find Tours" / "Plan Itinerary"
     - HUB profile (no affiliate minimum)
  3. **/regions/ + /en/regions/ index:**
     - List all 11 v1 regions; Jerusalem links live; rest are stub cards or hidden
     - HUB profile
  4. **Legal pages — write 4 standard pages (About, Contact, Privacy, Affiliate Disclosure) in EN+HE:**
     - About: company mission, team disclosure, editorial standards
     - Contact: contact form (or `mailto:`) + accessibility coordinator (cross-link to A11Y page)
     - Privacy: data collection (Plausible cookieless analytics — no cookies, no personal data; explicit), no user accounts
     - Affiliate Disclosure: FTC-compliant disclosure of monetization model; cross-links to AffiliateDisclosure inline component pattern
     - All UTILITY profile (no affiliate minimum)
  5. **Accessibility Statement (A11Y-03 + A11Y-04) — CRITICAL: invoke pause mechanism:**
     - Use template from `israeli-accessibility-compliance` skill SKILL.md Step 6
     - Required sections: Commitment / Standard (IS 5568:2020 + WCAG 2.1 AA) / Features (keyboard nav, screen reader support, skip nav, alt text, 4.5:1 contrast) / Known Limitations / Coordinator (name + phone + email) / Feedback form (or mailto:) / Last-audit date
     - **Frontmatter placeholder:** When drafting, use `accessibility_coordinator: { name: "__REQUIRES_USER_INPUT__", phone: "__REQUIRES_USER_INPUT__", email: "__REQUIRES_USER_INPUT__" }` — executor's pre-commit hook (added in 2.5) detects the literal and HALTS with structured question to user (see §6)
     - HE version uses Hebrew slug `/הצהרת-נגישות` if i18n routing supports; fallback `/he/accessibility-statement` per CONTEXT.md
  6. **Validation:** `pnpm qa:credits && pnpm qa:schema && pnpm qa:audit && pnpm lint && pnpm test --run`
     - AUD-027 enforces `/he/accessibility-statement` (or HE-slug equivalent) exists
     - AUD-028 enforces footer link in every locale (Phase 1 already wired; verify in audit)
     - AUD-009 inline FTC disclosure verified on every monetized page (zero on hub/legal/non-monetized)
- **Skill invocations:**
  - `israeli-accessibility-compliance` (Step 5) — template + IS 5568 clause-by-clause requirements
  - `copywriting` (Steps 2, 4) — homepage hero copy + CTAs + legal-page intros
  - `hebrew-content-writer` (Steps 2, 4, 5) — HE versions of all pages
- **Manual review touchpoints:**
  - **A11Y-04 coordinator designation — HARD HUMAN BLOCKER:** user MUST provide real name + phone + email before 2.5 can close. Pause mechanism in §6.
  - **Legal entity name** for footer (SUMMARY §6 Gap #9): if not finalized, footer may show placeholder organization name → flag at end of 2.5 for resolution in Phase 5

### Sub-phase 2.6 — Pilot QA + Quality Gate

- **Goal:** Verify all 13 Phase-2 requirements pass; run full audit dashboard + Lighthouse CI 3-run-median + axe-core + audit_a11y.py + manual SERP review; execute Quality Gate report generator; write `data/quality-gate-{pass,failure}.md`
- **Maps to:** All Phase 2 reqs verified
- **Wave:** 6 (final — depends on 2.1–2.5 complete)
- **Inputs from prior phases:** All Jerusalem content complete (region canonical EN+HE + 5–10 sub-dest pairs + itinerary pair + hub + legal); audit dashboard operational; Lighthouse CI workflow on every PR; quality-gate.ts script ready (flips from `phase1StructuralOnly` to content mode automatically once content pages exist)
- **Outputs:**
  - `data/audit-results.json` — full Jerusalem-site sweep
  - `data/lighthouse-results.json` — 3-run-median per Jerusalem page (canonical + sub-dests + itinerary + hub + legal)
  - `data/axe-results.json` — axe-core full-site sweep
  - `data/a11y-il-results.json` — audit_a11y.py IS 5568 supplementary sweep
  - `data/serp-review.md` — manual SERP review for top-5 Jerusalem primary keywords (compensating control per CONTEXT.md proxied-R3 strategy)
  - `data/quality-gate-pass.md` (if all 10 criteria pass) OR `data/quality-gate-failure.md` (if any fail — HARD STOP)
- **Concrete steps:**
  1. **Full build:** `pnpm build` — every Jerusalem page prerenders
  2. **Full audit:** `pnpm qa:audit` — 34 rules × all Jerusalem pages → `data/audit-results.json`; per-page score by profile
  3. **Lighthouse CI 3-run-median:** push to triggering CI workflow OR locally `pnpm lhci` — populates `data/lighthouse-results.json`; AUD-013/AUD-034 flip from `info: deferred` to real severity
  4. **Axe-core full-site:** `pnpm qa:axe` (plan 11 may have wired real axe-core invocation by now; if still stub, plan 2.6 task: swap stub for real)
  5. **IS 5568 supplementary:** `pnpm qa:audit-a11y` — Python wrapper invokes audit_a11y.py from skill bundle
  6. **Manual SERP review (humans + claude):** for top-5 Jerusalem EN primary keywords (`things to do in jerusalem`, `jerusalem old city`, `jerusalem tour`, `jerusalem hotels`, `jerusalem itinerary`) AND top-3 HE keywords (`מה לעשות בירושלים`, `טיולים בירושלים`, `העיר העתיקה ירושלים`):
     - Inspect top-10 Google results
     - Confirm our H-tag structure aligns with intent + entity coverage
     - Document findings in `data/serp-review.md` with per-keyword PASS/FAIL/REWORK verdict
     - REWORK verdict → cycle back to 2.1/2.2/2.3 for targeted edits BEFORE Quality Gate runs
  7. **Quality Gate generator:** `pnpm qa:quality-gate` — reads audit-results.json + lighthouse-results.json + the 5 Phase-2 verification artifacts; evaluates 10 criteria (see §5); writes pass or failure markdown
  8. **Outcome:**
     - PASS → Phase 3 unblocked; commit `data/quality-gate-pass.md`
     - FAIL → STOP. Write `data/quality-gate-failure.md` with failing criterion, suspected cause, proposed fix. Await human decision (rework specific sub-phase + retry, or abandon pilot).
- **Skill invocations:** None (verification phase — no new content authored unless SERP review triggers rework)
- **Manual review touchpoints:**
  - **SERP review (Step 6)** is the primary human input
  - **A11Y-04 coordinator details FINAL CHECK:** verify `mailto:` and `tel:` links resolve (per ROADMAP Phase 5 §5.04 success criterion 3, but worth pre-checking here)
  - **Legal entity name on footer** — if still placeholder, flag for Phase 5 resolution

## 2. Wave Assignments

| Wave   | Sub-phase(s)                                                                 | Why this order                                                                                                                                                                                                                                                                                                        |
| ------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wave 0 | Velite Itinerary collection + region/subdest/itinerary/legal route scaffolds | Must exist BEFORE any content lands — Phase 1 did not ship dynamic route renderers per ROADMAP plan 08 self-check; can run as a single setup task at start of 2.1 or as its own micro-wave                                                                                                                            |
| Wave 1 | 2.1 (EN canonical)                                                           | Foundational content from which HE rewrite derives; nothing else depends on it directly except 2.2                                                                                                                                                                                                                    |
| Wave 2 | 2.2 (HE canonical)                                                           | Sequential after 2.1 (native rewrite needs EN structure); ends with pilot-switch checkpoint                                                                                                                                                                                                                           |
| Wave 3 | 2.3 (5–10 sub-destination EN+HE pairs)                                       | Depends on checkpoint PASS; sub-destinations breadcrumb to canonical so canonical must be live first. **Internal parallelism:** each sub-destination is independent — planner may parallelize ALL pairs within wave 3 (one sub-dest = one independent unit; per-pair EN→HE is sequential, but pairs run in parallel). |
| Wave 4 | 2.4 (itinerary)                                                              | Itinerary references sub-destinations in the day-by-day breakdown; needs 2.3 complete OR at minimum the 3–5 sub-dests it references                                                                                                                                                                                   |
| Wave 5 | 2.5 (hub + legal)                                                            | Parallel-eligible with 2.4 per CONTEXT.md — no content dependency on itinerary; CAN start as early as Wave 3 if planner judges hub+legal work doesn't compete with sub-dest authoring for human review bandwidth. Recommend Wave 5 to keep 2.4 reviewer mind on itinerary pacing realism.                             |
| Wave 6 | 2.6 (Pilot QA + Quality Gate)                                                | Final — depends on 2.1–2.5 complete                                                                                                                                                                                                                                                                                   |

**Granularity setting:** coarse (per config.json). Each wave = one sub-phase except Wave 3 (which can internally parallelize 5–10 sub-destination pairs).

## 3. Validation Architecture (REQUIRED)

Phase 2 has 13 requirements. Each has a planner-checkable PLAN.md goal AND an executor-checkable implementation, both verified by a concrete proof artifact (command exit code or file existence + content).

### Test Framework

| Property           | Value                                                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework          | Vitest (already configured; 503/504 tests green at Phase 1 close) + `pnpm` CLI scripts                                                                         |
| Config file        | `vitest.config.ts` (existing); `.lighthouserc.cjs` (existing); 34 audit rule files (existing)                                                                  |
| Quick run command  | `pnpm test --run` (Vitest unit/integration), `pnpm qa:audit && pnpm qa:quality-gate` (audit + gate)                                                            |
| Full suite command | `pnpm lint && pnpm typecheck && pnpm build && pnpm test --run && pnpm qa:credits && pnpm qa:schema && pnpm qa:ner && pnpm qa:audit && pnpm qa:quality-gate`    |
| Phase 2 additions  | `pnpm qa:pilot-checkpoint` (NEW — created in 2.2 Wave 0 or 2.6 prep); `pnpm qa:serp-review` (NEW — optional helper that opens template for manual fill in 2.6) |

### Phase Requirements → Test Map

| Req ID  | Behavior                                                                                                                                                                               | Test Type            | Automated Command (or proof artifact)                                                                                                                                                                                                       | File Exists?                                                          |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| CNT-01  | Jerusalem EN canonical exists with 1500–2500w, 8–12 H2 sections, 5+ affiliates, schema TouristDestination+Breadcrumb+FAQ                                                               | content + audit      | `pnpm qa:audit` (REGION_CANONICAL profile, ≥85 score on `/en/jerusalem`) + word-count check (AUD-007 ratio) + schema validation (`pnpm qa:schema` on built page) + affiliate count (Vitest test inspecting MDX for `<AffiliateCard>` count) | ❌ Wave 0 (Vitest test for affiliate count + section count)           |
| CNT-02  | Jerusalem HE canonical exists with ≥85% EN word count, schema parity, paired religious naming, native rewrite                                                                          | content + audit      | `pnpm qa:audit` (REGION_CANONICAL, ≥85 on `/jerusalem`) + AUD-007 word-count parity gate (0.85–1.40 ratio enforced) + AUD-017/018/019/020 all 0 violations + schema validation (HE inLanguage)                                              | ✅ existing (AUD-007 ships in Phase 1)                                |
| CNT-03  | Pilot-switch checkpoint executed; `data/pilot-checkpoint.md` written with verdict                                                                                                      | gate                 | `pnpm qa:pilot-checkpoint` exits 0 with PASS verdict OR exits non-zero with SWITCH verdict                                                                                                                                                  | ❌ Wave 0 (`scripts/qa/pilot-checkpoint.mjs`)                         |
| CNT-04  | 5–10 Jerusalem sub-destination pages exist (EN+HE), each 800–1200w, TouristAttraction schema, ≥1 affiliate, breadcrumb to canonical                                                    | content + audit      | `pnpm qa:audit` (SUB_DESTINATION profile, ≥85 score per page) + AUD-006 (head-keyword + entity qualifier) + AUD-007 parity + Vitest test counting Velite SubDestination collection entries ≥5 per locale                                    | ❌ Wave 0 (Vitest count test)                                         |
| CNT-05  | ≥1 Jerusalem itinerary page exists (EN+HE) with TouristTrip/ItemList schema, ≥3 affiliates                                                                                             | content + audit      | `pnpm qa:audit` (GUIDE_OR_WINERY profile or new ITINERARY profile, ≥85) + Velite Itinerary collection entries ≥1 per locale                                                                                                                 | ❌ Wave 0 (Velite collection + Vitest count)                          |
| CNT-06  | Hub pages exist: homepage + `/regions/` + `/en/regions/`                                                                                                                               | content + build      | `pnpm build` succeeds + `app/[locale]/page.tsx` + `app/[locale]/regions/page.tsx` exist + render `<RegionHero>` + region grid                                                                                                               | ❌ Wave 0 (route scaffolds + Vitest existence test)                   |
| CNT-07  | Legal pages exist in EN+HE: About, Contact, Privacy, Affiliate Disclosure, Accessibility Statement                                                                                     | content + audit      | `pnpm qa:audit` (UTILITY profile) + Velite Legal collection has ≥5 entries per locale + AUD-027 (a11y statement exists)                                                                                                                     | ✅ existing (AUD-027 ships in Phase 1)                                |
| A11Y-03 | `/accessibility-statement` (EN) + `/הצהרת-נגישות` (HE, or `/he/accessibility-statement` fallback) exist with IS 5568 required content                                                  | audit + content      | AUD-027 (page exists) + Vitest content-presence test (commitment / standard / features / limitations / coordinator / last-audit date all present in MDX body)                                                                               | ❌ Wave 0 (Vitest content-presence test for IS 5568 sections)         |
| A11Y-04 | Named accessibility coordinator with real name + phone + email (placeholder NOT acceptable)                                                                                            | content + pre-commit | Pre-commit hook regex `__REQUIRES_USER_INPUT__` → exit 1 if found in `content/**/accessibility-statement.mdx` + Vitest test verifying `mailto:` and `tel:` resolve to real values (not `tel:000` or empty)                                  | ❌ Wave 0 (pre-commit hook + Vitest format test)                      |
| A11Y-05 | Footer of every page links to accessibility statement in current locale                                                                                                                | audit                | AUD-028 (footer accessibility-link presence) — Phase 1 wired; Phase 2 verifies live on every Jerusalem page; `pnpm qa:audit` reports 0 violations of AUD-028                                                                                | ✅ existing (AUD-028 + lib/seo/accessibility-link.ts ship in Phase 1) |
| SEO-04  | Religious-site naming convention applied on first reference (Western Wall / Temple Mount paired / no "Wailing Wall" / no biased framing / administrativeStatus for Bethlehem mentions) | audit                | `pnpm qa:audit` reports 0 violations of AUD-017, AUD-018, AUD-019, AUD-020 across all Jerusalem pages                                                                                                                                       | ✅ existing (4 rules + lib/seo/naming.ts ship in Phase 1)             |
| IMG-04  | Hero images use `priority` + `fetchpriority="high"` on canonical pages                                                                                                                 | audit                | `pnpm qa:audit` reports 0 violations of AUD-012 on `/en/jerusalem` and `/jerusalem` (and `<RegionHero>` component contract honors this)                                                                                                     | ✅ existing (AUD-012 ships in Phase 1)                                |
| IMG-05  | `restrictedSiteAcknowledgment` populated for every image from Western Wall / Holy Sepulchre / Dome of the Rock / Bahá'í Gardens                                                        | audit + ledger       | `pnpm qa:credits` (Zod schema requires `restrictedSiteAcknowledgment` for `subjectType: "religious-site"` matching restricted-sites set) + `pnpm qa:audit` reports 0 violations of AUD-026                                                  | ✅ existing (Zod + AUD-026 ship in Phase 1)                           |

### Sampling Rate (Nyquist Validation)

- **Per task commit:** `pnpm qa:credits && pnpm qa:schema && pnpm lint && pnpm test --run` (quick, runs in <30s)
- **Per wave merge:** `pnpm qa:audit` (full 34-rule sweep across all built pages — ~2–10s) + `pnpm qa:ner` (Velite walker — fast)
- **Phase gate (end of 2.6):** Full suite — `pnpm lint && pnpm typecheck && pnpm build && pnpm test --run && pnpm qa:credits && pnpm qa:schema && pnpm qa:ner && pnpm qa:audit && pnpm lhci && pnpm qa:axe && pnpm qa:audit-a11y && pnpm qa:quality-gate` (all green; gate writes pass MD)

### Wave 0 Gaps (must close before 2.1 ships)

Each gap is a Wave 0 task the planner creates in plan 02-01. None require new research — they're scaffolding that Phase 1 didn't include because no content existed yet.

- [ ] **`app/[locale]/[region]/page.tsx`** — dynamic region page renderer (consumes Velite Region output, injects JsonLd, renders RegionHero + MDX body)
- [ ] **`app/[locale]/[region]/[subdest]/page.tsx`** — dynamic sub-destination renderer (for Wave 3)
- [ ] **`app/[locale]/itineraries/[slug]/page.tsx`** — dynamic itinerary renderer (for Wave 4)
- [ ] **`app/[locale]/{about,contact,privacy,affiliate-disclosure,accessibility-statement}/page.tsx`** — static legal-page renderers (for Wave 5)
- [ ] **`velite.config.ts` — add `itineraries` collection** (for Wave 4)
- [ ] **`lib/schema/itinerary.ts` or extend touristTrip generator** — schema for itinerary pages (for Wave 4)
- [ ] **`scripts/qa/pilot-checkpoint.mjs`** — reads audit results, image ledger, timing log; writes `data/pilot-checkpoint.md` (for Wave 2 — see §4 spec)
- [ ] **Vitest tests:** affiliate-count test (CNT-01); Velite collection count tests (CNT-04, CNT-05, CNT-07); IS 5568 content-presence test (A11Y-03); coordinator-format test (A11Y-04)
- [ ] **Pre-commit hook addition** in `.husky/pre-commit` or lint-staged: regex `__REQUIRES_USER_INPUT__` in `content/**/*.mdx` → exit 1 (for A11Y-04)
- [ ] **`package.json` scripts:** `qa:pilot-checkpoint`, optional `qa:serp-review` template-opener

## 4. Pilot-Switch Checkpoint Mechanics

The checkpoint sits between Wave 2 (2.2 complete) and Wave 3 (2.3 start). It is the LAST cheap point to switch pilots — past 2.3, ~10 HE sub-destination pages would also need redoing.

### Checkpoint Script: `pnpm qa:pilot-checkpoint`

Implemented as `scripts/qa/pilot-checkpoint.mjs` (Wave 0 task in 2.2). Reads three inputs and evaluates three criteria.

**Inputs:**

1. `data/audit-results.json` (written by `pnpm qa:audit` against Jerusalem canonical EN+HE)
2. `data/photo-credits.json` (image ledger)
3. `.planning/phases/02-pilot-region-jerusalem-m2/timing.log` (per-sub-phase wall-clock budget — appended at end of 2.1 and 2.2; format: `2.1 EN canonical: 240min` / `2.2 HE canonical: 380min`)

**Pass/fail rules per criterion:**

| #   | Criterion                                                | PASS condition                                                                                                                                                                                                                         | FAIL condition                                                                          | Data source                                          |
| --- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1   | Editorial style passes AUD-017..AUD-020                  | All 4 rules report 0 violations on both `/en/jerusalem` and `/jerusalem` (Wailing Wall regex, biased framing, Temple Mount paired, administrativeStatus)                                                                               | Any rule reports ≥1 violation on either canonical                                       | `data/audit-results.json` → filter by rule ID + slug |
| 2   | Old City restricted-site images sourced (≥80%)           | Of images in `data/photo-credits.json` where `subjectType === "religious-site"` AND region matches Jerusalem AND subject matches `{westernWall, holySepulchre, domeOfRock, baha-i}`, ≥80% have non-null `restrictedSiteAcknowledgment` | <80% have cleared field                                                                 | `data/photo-credits.json`                            |
| 3   | Hebrew translation throughput acceptable (≤2× EN budget) | 2.2 wall-clock ≤ 2× 2.1 wall-clock                                                                                                                                                                                                     | 2.2 wall-clock > 2× 2.1 wall-clock (signals 2.3 HE sub-destinations will exceed budget) | `timing.log`                                         |

**Outputs:**

`data/pilot-checkpoint.md` — always written. Schema:

```markdown
# Pilot-Switch Checkpoint (Phase 2.2 → 2.3)

**Evaluated:** {ISO date}
**Verdict:** {PASS | SWITCH | OVERRIDE}

## Criterion 1: Editorial Style (AUD-017..AUD-020)

- AUD-017 (Wailing Wall regex): {0 | N} violations on /en/jerusalem, {0 | N} on /jerusalem
- AUD-018 (biased framing): ...
- AUD-019 (Temple Mount paired): ...
- AUD-020 (administrativeStatus): ...
- **Result:** {PASS | FAIL with details}

## Criterion 2: Restricted-Site Image Sourcing

- Total restricted-site images: {N}
- With cleared `restrictedSiteAcknowledgment`: {N} ({P}%)
- **Result:** {PASS | FAIL — coverage P% < 80% threshold}

## Criterion 3: Hebrew Translation Throughput

- 2.1 EN canonical wall-clock: {M1} min
- 2.2 HE canonical wall-clock: {M2} min
- Ratio: {M2/M1}×
- **Result:** {PASS | FAIL — ratio exceeds 2× threshold}

## Verdict

{PASS: All 3 criteria PASS. Proceed to Phase 2.3 (sub-destinations).}
{SWITCH: Criterion N failed. Recommend switching pilot to Tel Aviv per CONTEXT.md. Phase 2.1 + 2.2 redo as Tel Aviv. No Quality Gate impact yet.}
{OVERRIDE (human decision): Criterion N failed but proceed with Jerusalem anyway. Rationale: <user input>. Document in Phase 2 retrospective.}

## Suggested next action

{action text}
```

**Exit code:**

- PASS verdict → exit 0 → executor advances to Wave 3 (2.3)
- SWITCH verdict → exit 1 → executor HALTS, surfaces `data/pilot-checkpoint.md` to user, asks: "All 3 criteria evaluated. Criterion N failed: [details]. Switch pilot to Tel Aviv (recommended — redo 2.1 + 2.2 as Tel Aviv) OR override and continue with Jerusalem despite signal?"
- User responds → either:
  - "switch" → executor creates `.planning/phases/02-pilot-region-tel-aviv-m2/` (rename), restarts Wave 1 with Tel Aviv H-tag scaffolding (PITFALLS §4.2)
  - "override" → user provides rationale → executor appends to `data/pilot-checkpoint.md` under "Verdict: OVERRIDE" + proceeds to Wave 3

**Why this design:**

- Single command, single artifact — replicable, auditable
- Three orthogonal signals — editorial (audit), operational (ledger), throughput (timing)
- Each signal is mechanical (no human judgment in the criteria themselves) — preserves the "do we switch?" decision quality
- Override path exists for cases where the signal is misleading (e.g., timing exceeds 2× because of unrelated infrastructure delay)

## 5. Quality Gate Generator Behavior in Phase 2.6

`pnpm qa:quality-gate` already exists from Phase 1 plan 10. Its Phase-2 behavior differs only in that `contentPages.length > 0` (Jerusalem pages now exist), so `phase1StructuralOnly` flag flips to `false` automatically, and all 10 criteria fire normally (no DEFER).

The 10 criteria, per ROADMAP.md + PROJECT.md:

| #   | Criterion                                                                               | Jerusalem-specific check                                                                                                                                                                                                                                                                                                                                                                                                     | Data source                                                                                                                                     |
| --- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Lighthouse mobile 3-run-median: perf ≥0.90, a11y ≥0.95, best-practices ≥0.95, SEO =1.00 | Every Jerusalem page (canonical EN+HE + 5-10 sub-dest EN+HE + ≥1 itinerary EN+HE + hub + 5 legal × 2) must have a Lighthouse entry with all 4 categories above threshold                                                                                                                                                                                                                                                     | `data/lighthouse-results.json` (populated by `pnpm lhci` 3-run-median)                                                                          |
| 2   | Audit dashboard per-page score ≥85                                                      | Every Jerusalem page must score ≥85 against its profile (REGION_CANONICAL for canonical; SUB_DESTINATION for sub-dests; GUIDE_OR_WINERY for itinerary; HUB for homepage/index; UTILITY for legal)                                                                                                                                                                                                                            | `data/audit-results.json` — per-page score computed by scripts/audit/score.ts                                                                   |
| 3   | 0 critical bugs                                                                         | All 34 audit rules with `severity: "critical"` report 0 violations across all Jerusalem pages                                                                                                                                                                                                                                                                                                                                | `data/audit-results.json` — filter issues by severity=critical                                                                                  |
| 4   | Affiliate coverage ≥80% of applicable partners (5+ active on region canonical)          | Canonical EN + HE each have ≥5 distinct `<AffiliateCard>` partners rendered (Booking + one of Civitatis/Viator/GYG + Skyscanner + one of RentalCars/DiscoverCars + SafetyWing); sub-dests ≥1; itinerary ≥3. Klook/GoCity excluded from denominator (stubs absent — not against coverage). Quality Gate computes: 9 real applicable partners; if ≥7/9 have ≥1 placement across the Jerusalem pages overall, criterion passes. | `data/audit-results.json` — AUD-031 + per-page affiliate-count tally                                                                            |
| 5   | EN+HE 100% parity                                                                       | Every EN Jerusalem page has HE counterpart and vice versa; schema parity (same generator types, only `inLanguage` differs); hreflang reciprocal                                                                                                                                                                                                                                                                              | Sitemap walker compares EN+HE slug sets per route; AUD-032 reports hreflang mismatches; AUD-007 enforces word-count ratio 0.85–1.40             |
| 6   | 100% credited images ≥1200px                                                            | Every image referenced by any Jerusalem page has ledger entry + width ≥1200; restricted-site images have `restrictedSiteAcknowledgment` populated                                                                                                                                                                                                                                                                            | `data/photo-credits.json` + `pnpm qa:credits` exit code; AUD-003/004/026 all 0 violations                                                       |
| 7   | 0 raw hex codes in components                                                           | Phase 1 ESLint rule already enforces this; Phase 2 verifies no Jerusalem content MDX introduces inline-styled raw hex (unlikely but Quality Gate checks)                                                                                                                                                                                                                                                                     | AUD-001 reports 0 violations; `pnpm lint` exits 0                                                                                               |
| 8   | hreflang valid (bidirectional + x-default)                                              | Every Jerusalem page emits `he` + `en` + `x-default` (→EN per Phase 1 lock); reciprocal; canonical never cross-locale                                                                                                                                                                                                                                                                                                        | AUD-032 + AUD-033 report 0 violations; sample manual Google Rich Results Test                                                                   |
| 9   | Schema validated on every page                                                          | Every Jerusalem page passes `scripts/qa/validate-schema.mjs`; sample Google Rich Results Test green                                                                                                                                                                                                                                                                                                                          | `pnpm qa:schema` exits 0; AUD-033 reports 0 violations; manual spot-check of Google Rich Results Test on Jerusalem canonical EN+HE + 1 sub-dest |
| 10  | 0 broken internal links                                                                 | All internal links (e.g., from Jerusalem canonical to sub-destinations, from itinerary to attractions, breadcrumbs back, footer to accessibility statement) resolve                                                                                                                                                                                                                                                          | AUD-001 broken-link rule (or dedicated check during Quality Gate scan); audit dashboard's internal-link traversal reports 0 dangling            |

**Generator output:**

- All 10 criteria PASS → `data/quality-gate-pass.md` written (markdown table of criterion + result + evidence link) — exit 0 — Phase 3 unblocked
- Any criterion FAIL → `data/quality-gate-failure.md` written (failing criterion + suspected cause + proposed fix per criterion) — exit 1 — workflow halts → human decision required

**Additional Phase-2.6 manual artifact** (NOT a Quality Gate criterion but referenced in the report): `data/serp-review.md` — manual SERP review per CONTEXT.md compensating control. Quality Gate doesn't fail on SERP review alone (it's informational), but the gate report appends the SERP review summary so reviewers see whether content alignment is plausible.

## 6. Accessibility Coordinator Pause Mechanism

A11Y-04 is the only Phase-2 requirement that DEPENDS ON HUMAN INPUT and cannot be satisfied by Claude or by automation. IS 5568 statutory exposure makes placeholder values legally toxic (up to 50,000 NIS per violation). Pattern below ensures the executor halts cleanly when the coordinator is missing.

### Placeholder format

In the Accessibility Statement MDX frontmatter:

```yaml
---
lang: he
slug: accessibility-statement
title: הצהרת נגישות — Discover Israel
description: ...
page: accessibility-statement
accessibility_coordinator:
  name: __REQUIRES_USER_INPUT__
  phone: __REQUIRES_USER_INPUT__
  email: __REQUIRES_USER_INPUT__
last_audit_date: __REQUIRES_USER_INPUT__
---
```

The literal token `__REQUIRES_USER_INPUT__` is the pause signal.

### Detection layers (defense in depth)

1. **Pre-commit hook (Wave 0 task in 2.5):** add to `.husky/pre-commit` or `lint-staged.config.js`:
   ```bash
   if grep -rE '__REQUIRES_USER_INPUT__' content/**/accessibility-statement*.mdx; then
     echo "BLOCKED: accessibility-statement contains __REQUIRES_USER_INPUT__ placeholder."
     echo "Real coordinator name + phone + email required per IS 5568 / A11Y-04."
     exit 1
   fi
   ```
2. **Vitest test (Wave 0 task in 2.5):** `tests/content/coordinator-format.test.ts` parses both EN+HE accessibility-statement MDX frontmatter via Velite output, asserts:
   - `name` is non-empty string, not equal to `__REQUIRES_USER_INPUT__`
   - `phone` matches international format regex (e.g., `^\+?[0-9 \-()]{7,}$`)
   - `email` matches RFC 5322 simple regex
   - `last_audit_date` is ISO date and within last 90 days
3. **Audit rule (AUD-027 already exists for page presence):** consider adding AUD-035 in Phase 2.5 → "coordinator placeholder presence" but the pre-commit hook + Vitest already cover this (audit rule would be defense-in-depth; planner can decide whether to land or skip).

### Executor pause flow

When Plan 2.5 executor reaches the "populate coordinator" task:

1. Executor finds the placeholder `__REQUIRES_USER_INPUT__` in draft frontmatter
2. Executor HALTS the plan (does NOT commit)
3. Executor writes a clear, structured question to the user:

   ```
   ## PAUSED: Accessibility Coordinator Required (A11Y-04)

   Phase 2.5 plan task: populate `content/{en,he}/legal/accessibility-statement.mdx` frontmatter.

   IS 5568 / Equal Rights for Persons with Disabilities Act mandates a named accessibility coordinator with reachable contact. Statutory exposure: up to 50,000 NIS per violation.

   Please provide:
   1. Coordinator name (real person responsible for accessibility complaints):
   2. Phone (international format, e.g., +972-2-555-0100):
   3. Email (e.g., accessibility@visitisrael.site):
   4. Last accessibility audit date (ISO format, within 90 days):

   These values will be committed to the public site. Placeholder values are not legally acceptable.
   ```

4. User responds with the 4 values
5. Executor replaces `__REQUIRES_USER_INPUT__` tokens with real values in both EN + HE MDX frontmatter; updates HE coordinator text accordingly (Hebrew name spelling, Hebrew phone format display); commits.
6. Pre-commit hook + Vitest test both pass → commit succeeds → plan resumes.

### Why this pattern is robust

- Pre-commit hook is the LAST defense — even if executor forgets, the commit physically cannot land
- Vitest test catches the rare case where someone bypasses pre-commit hooks with `--no-verify` (which Phase 1 SUMMARYs note has happened during development)
- AUD-027 covers page-existence (independent of content); placeholder check covers content-correctness
- Executor's structured question is a single, copy-paste-able artifact — user provides 4 values in one go, not a back-and-forth

## 7. Content-Specific Gotchas

Surfacing only items genuinely additive beyond CONTEXT.md + PITFALLS + skills:

### MDX frontmatter shapes (Velite collection schemas)

Phase 1 shipped 4 collections in `velite.config.ts`: Region, SubDestination, Guide, Legal. Phase 2 needs ONE more: Itinerary. Wave 0 task in 2.4:

```ts
// Add to velite.config.ts
const itineraries = defineCollection({
  name: 'Itinerary',
  pattern: '{he,en,fr}/itineraries/**/*.mdx',
  schema: s.object({
    ...baseFrontmatter,
    durationDays: s.number().int().positive(),
    regions: s.array(s.string()).min(1),
    startRegion: s.string().min(1),
  }),
});
```

Existing collections (per `velite.config.ts` inspected):

- **Region** `{he,en,fr}/regions/**/*.mdx` — requires `lang`, `title`, `description`, `slug`, `region`
- **SubDestination** `{he,en,fr}/sub-destinations/**/*.mdx` — requires `lang`, `title`, `description`, `slug`, `region`, `parentRegion`
- **Guide** `{he,en,fr}/guides/**/*.mdx` — requires `lang`, `title`, `description`, `slug`, `topic`
- **Legal** `{he,en,fr}/legal/**/*.mdx` — requires `lang`, `title`, `description`, `slug`, `page`

The Accessibility Statement MDX extends Legal frontmatter with the `accessibility_coordinator` object and `last_audit_date` — schema-wise these are EXTRA fields Velite will accept (Zod by default is open) but the planner should consider extending the Legal schema to accept-and-validate these for the accessibility-statement specifically. Alternatively: keep Legal flexible, push validation to Vitest test from §6.

### Image-sourcing workflow for restricted sites

`lib/photo-credits-schema.ts` requires `restrictedSiteAcknowledgment` (string) for entries where `subjectType === "religious-site"` matching the restricted set (Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í). Phase 1 schema enforces presence; Phase 2 content commits MUST populate with one of:

- `"IGPO archive image — pre-cleared per Wikimedia Israel partnership 2017"` (for IGPO-sourced; cite source URL)
- `"Wikimedia Commons wide architectural shot — no identifiable worshippers, no permit required per [thekotel.org filming-regulations](URL)"` (for Wikimedia wide shots; cite policy URL)
- `"Permit #XXXX from [Western Wall Heritage Foundation / Christian Information Center / Bahá'í Press Office] dated YYYY-MM-DD"` (if a permit was actually obtained — rare; document the email or PDF in `licenseProof` field)

NEVER acceptable: empty string, "TBD", `null`, "to be verified".

PITFALLS §5.4 has full per-site sourcing guidance. Practical strategy for Phase 2: lean on Wikimedia wide shots + IGPO archive; do not commission new shoots.

### Manual SERP review checklist (compensating control)

For each of these 8 keywords (5 EN + 3 HE), Phase 2.6 must produce a `data/serp-review.md` entry:

```markdown
### `things to do in jerusalem` (EN, primary canonical KW)

**SERP top-10 inspected:** 2026-MM-DD
**Top 5 results titles + URLs:** ...
**Entity coverage check:**

- Western Wall: ✓ in our H3
- Old City Quarters: ✓ in our H2
- Mahane Yehuda: ✓ in our H3
- Day trips (Dead Sea, Bethlehem, Tel Aviv): ✓ in our H2
- Missing from our H-tag structure: [entity X] ← potential rework signal
  **Verdict:** PASS | REWORK (with specific edit suggestion)
```

Replicate for: `jerusalem old city`, `jerusalem tour`, `jerusalem hotels`, `jerusalem itinerary`, `מה לעשות בירושלים`, `טיולים בירושלים`, `העיר העתיקה ירושלים`.

REWORK verdicts trigger targeted edits to 2.1 / 2.2 / 2.3 BEFORE Quality Gate runs — Quality Gate is a one-shot gate.

### Hebrew typography concerns

Already wired in Phase 1 (Hebrew Tailwind preset, --font-hebrew CSS var, html[lang][dir]). Phase 2 content authoring concerns:

- **Hebrew + Latin in same paragraph:** wrap Latin runs with `<span dir="ltr" lang="en">…</span>` to prevent visual flip — AUD-024 enforces; matters for affiliate brand names like "Booking.com" inside Hebrew prose
- **Phone/ID numbers in Hebrew prose:** wrap with `<span dir="ltr">…</span>` for left-to-right rendering of digits (per israeli-accessibility-compliance SKILL.md examples)
- **Line-height for Hebrew:** Hebrew renders denser than Latin; Phase 1 plan 02 design tokens already configured leading scale per Hebrew Tailwind preset; planner needn't intervene unless visual review flags an issue
- **RTL test cases for paginated content:** all Jerusalem pages need browser test (per ROADMAP Phase 1 success criterion 4 — already verified at Phase 1 close for `/admin/components`; Phase 2.6 manually re-verifies on real content)

## 8. References

Pointers to canonical sources. Don't duplicate content here.

### Locked decisions

- `.planning/phases/02-pilot-region-jerusalem-m2/02-CONTEXT.md` — full sub-phase decomposition, R3 strategy, checkpoint criteria, deferred list (primary)
- `.planning/PROJECT.md` — Quality Gate 10 criteria (referenced by ROADMAP)
- `.planning/REQUIREMENTS.md` — 13 Phase-2 req IDs with traceability
- `.planning/ROADMAP.md` Phase 2 section — success criteria + per-plan summary
- `.planning/STATE.md` — Phase 1 close state (503/504 tests, all infra operational)

### Domain research (already digested)

- `.planning/research/PITFALLS.md` §4.1 — Jerusalem H-tag scaffolding verbatim, Top 30 EN keywords, Top 15 HE keywords (primary source for content structure)
- `.planning/research/PITFALLS.md` §3.1 — religious-site naming convention (paired naming detail)
- `.planning/research/PITFALLS.md` §5.4 — restricted-site photography permits + sourcing detail
- `.planning/research/PITFALLS.md` §5 — full per-region image coverage estimates and source allowlist
- `.planning/research/PITFALLS.md` §6 — 34 AUD rules table with detection + pass criterion
- `.planning/research/SUMMARY.md` §5 — Jerusalem pilot rationale + Phase 2.2 fallback condition
- `.planning/research/SUMMARY.md` §6 — Phase 2 research gaps (R3 keyword validation, accessibility coordinator, etc.)

### Phase 1 verification (what's operational)

- `.planning/phases/01-foundation-m1/01-VERIFICATION.md` — 41 requirements verified, 15 observable truths, all infra ready
- `.planning/phases/01-foundation-m1/05-component-lib-SUMMARY.md` — 25 components shipped with contracts
- `.planning/phases/01-foundation-m1/10-audit-dashboard-SUMMARY.md` — 34 AUD rules + Quality Gate generator + phase1StructuralOnly mode (Phase 2 turns off automatically)
- `.planning/phases/01-foundation-m1/11-lighthouse-ci-SUMMARY.md` — Lighthouse CI 3-run-median config + data/lighthouse-results.json schema

### Skills (consulted during execution, not yet now)

- `.agents/skills/hebrew-content-writer/SKILL.md` + `references/hebrew-grammar-quick-ref.md` — CRITICAL for 2.2; register selection (business-casual), ktiv maleh, smichut rules, gender handling Option C, SEO for Hebrew
- `.agents/skills/copywriting/SKILL.md` — for 2.1 EN authoring (PAS/AIDA/BAB/FAB frameworks; headline + CTA structure)
- `.agents/skills/affiliate-marketing/SKILL.md` — commission models, ROI framing, partner selection rationale per page
- `.agents/skills/affiliate-page-generator/SKILL.md` — affiliate-program page structure (overlap modest with our usage — we're an affiliate, not running a program — but page-structure principles transfer)
- `.agents/skills/israeli-accessibility-compliance/SKILL.md` — IS 5568 clauses + Hatzaharat Negishut template (Step 6 of skill) + audit_a11y.py wrapper

### Existing Phase 1 code consumed (NOT re-derived)

- `velite.config.ts` — 4 collections + `s.enum(['he','en','fr'])` lang; ADD Itinerary in Wave 0 for 2.4
- `lib/schema/index.ts` — 11 generators (touristDestination, touristAttraction, religiousBuilding, place, localBusiness, breadcrumb, faq, webSite, collectionPage, webPage, organization)
- `lib/affiliate/{9 real, 2 stubs}.ts` + `<AffiliateCard>` dispatcher
- `lib/seo/{canonical, hreflang, metadata, naming, accessibility-link}.ts`
- `lib/photo-credits.ts` + `lib/photo-credits-schema.ts` (Zod + Sharp gate)
- `data/religious-sites.json` — 25 paired-naming entries
- `data/entity-dict.json` — 113-entry NER dict
- `scripts/audit/run.ts` + 34 rule files + `scripts/audit/quality-gate.ts`
- `scripts/qa/{check-credits.mjs, validate-schema.mjs, persist-lhci.mjs}`
- `.lighthouserc.cjs` + `.github/workflows/lighthouse.yml`

---

## Sources

### Primary (HIGH confidence)

- `.planning/phases/02-pilot-region-jerusalem-m2/02-CONTEXT.md` — locked user decisions (2026-05-11)
- `.planning/REQUIREMENTS.md` — 13 Phase-2 req IDs (2026-05-11)
- `.planning/ROADMAP.md` Phase 2 + Quality Gate (2026-05-11)
- `.planning/phases/01-foundation-m1/01-VERIFICATION.md` — 41 req SATISFIED, 15 observable truths VERIFIED
- `velite.config.ts` (current state) — 4 collections operational, Itinerary missing
- `.planning/research/PITFALLS.md` §4.1 (Jerusalem H-tag scaffolding + keywords), §3.1 (religious-naming), §5 (image sourcing), §6 (34 AUD rules) — convergent research from 2026-05-11
- `.agents/skills/hebrew-content-writer/SKILL.md`, `israeli-accessibility-compliance/SKILL.md` — canonical skill source-of-truth

### Secondary (MEDIUM confidence)

- `.planning/phases/01-foundation-m1/{05-component-lib,10-audit-dashboard}-SUMMARY.md` — Phase 1 plan-completion artifacts (high-quality but project-internal)

### Tertiary (LOW confidence — flagged for validation)

- Manual SERP review (`data/serp-review.md`) is the compensating control for proxied R3 keyword data per CONTEXT.md — actual SERP top-10 not yet sampled; planner should not pre-bake assumptions about competitor entity coverage. PITFALLS §4.1 H-tag scaffolding is the working hypothesis; 2.6 SERP review validates or invalidates.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — Phase 1 verified, all infrastructure operational, contracts documented
- Architecture (sub-phase decomposition + wave order): HIGH — CONTEXT.md locked
- Pitfalls: HIGH — PITFALLS.md research is exhaustive; Israel-specific detectors already in Phase 1 audit dashboard
- Validation Architecture: HIGH — all 13 req IDs map to existing audit rules + commands, with explicit Wave 0 gaps listed
- Checkpoint mechanics: HIGH — locked criteria from CONTEXT.md, script spec self-contained
- A11Y coordinator pause: HIGH — pattern is conventional (`__REQUIRES_USER_INPUT__` + pre-commit + Vitest); IS 5568 statutory weight makes the layering justified
- Manual SERP review process: MEDIUM — pattern documented but unrun; compensating control depends on human judgment quality during 2.6

**Research date:** 2026-05-11
**Valid until:** 2026-08-11 (3 months — stable since most decisions are locked + Phase 1 is shipped; revisit if any Phase 2 sub-phase reveals an infrastructure gap not enumerated in Wave 0 above)

---

_Phase: 02-pilot-region-jerusalem-m2_
_Research completed: 2026-05-11_
_Mode: YOLO auto — built on CONTEXT.md locked decisions + Phase 1 verification artifacts + PITFALLS research convergence_
