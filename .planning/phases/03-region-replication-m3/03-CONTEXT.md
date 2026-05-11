# Phase 3: Region Replication (M3) - Context

**Gathered:** 2026-05-11
**Status:** Ready for planning
**Mode:** YOLO auto — Jerusalem pilot proven Phase 2; template stabilized; this phase scales the pattern

<domain>
## Phase Boundary

Replicate the Jerusalem pilot pattern across 10 additional regions. Each region passes a SOFT per-region gate (audit ≥80, Lighthouse mobile ≥85) — Phase 2's hard gate was the model-validation; per-region replication uses softer thresholds since the template is proven.

**In scope:**

- 10 region canonicals (EN + HE pairs) = 20 region pages
- Per region: 3–8 sub-destinations (EN + HE pairs) = 30–80 sub-dest pages total
- Bethlehem coverage with `administrativeStatus: 'palestinian-authority'` framing at `/west-bank/bethlehem/`
- 5 v1 requirements: REG-01..05

**Out of scope:**

- Hebron (explicitly excluded per PROJECT.md — editorial sensitivity beyond mitigation budget)
- Gaza-adjacent communities (out of scope per PROJECT.md)
- Long-tail sub-destinations beyond the 3–8 per region (Phase 4 sweep)
- Real photography commissioning for Negev/Galilee (deferred to Phase 6 budget approval)
- Bahá'í Gardens commissioned imagery (Phase 6 — requires press@bahai.org confirmation)
- Production deploy (Phase 5/6)

</domain>

<decisions>
## Implementation Decisions

### Region replication order (per FEATURES.md composite scoring)

| #     | Region                   | Composite | Sub-destinations target | Notes                                                                                                                                    |
| ----- | ------------------------ | --------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Tel Aviv-Jaffa           | 8.7       | 6-8                     | Jaffa Old City, Carmel Market, Rothschild, Tel Aviv Museum, Florentin, beaches, Old Jaffa Port                                           |
| 2     | Dead Sea                 | 8.4       | 5-6                     | Masada, Ein Gedi, Qumran, Mineral beaches, Ein Bokek resorts                                                                             |
| 3     | Galilee (Sea of Galilee) | 8.2       | 6-7                     | Tiberias, Capernaum, Mt of Beatitudes, Magdala, Yardenit, Mt Arbel                                                                       |
| 4     | Eilat                    | 7.9       | 4-5                     | Red Sea reef, Timna Park, Underwater Observatory, Coral Beach                                                                            |
| 5     | Negev Desert             | 7.7       | 5-6                     | Mitzpe Ramon (Makhtesh), Avdat, Sde Boker, Ben Gurion's grave, ALPACA farm                                                               |
| 6     | Nazareth                 | 7.5       | 4-5                     | Basilica of the Annunciation, Old City market, Mt of Precipice, Mary's Well                                                              |
| 7     | Haifa                    | 7.4       | 4-6                     | Bahá'í Gardens (images Wikimedia-only), German Colony, Stella Maris, Wadi Nisnas, Carmel                                                 |
| 8     | Golan Heights            | 7.2       | 4-5                     | Mount Bental, Banias, Nimrod Fortress, Druze villages, Hermon ski                                                                        |
| 9     | Caesarea                 | 7.0       | 3-4                     | Roman ruins, Crusader port, aqueduct, Ralli Museum                                                                                       |
| 10    | Akko (Acre)              | 6.8       | 4-5                     | Old City UNESCO, Hospitaller Knights, Turkish Bath, port, Bahá'í Mansion                                                                 |
| (sep) | Bethlehem                | n/a       | 0 (canonical only)      | West Bank — `administrativeStatus: 'palestinian-authority'`; `/west-bank/bethlehem/` route. Single canonical, no sub-destinations in v1. |

Masada deferred → covered as Dead Sea sub-destination.

### Plan batching strategy — LOCKED: one plan per region (Strategy A)

Trade-off accepted: 11 plans vs Coarse's "1-3 plans per phase" target. Rationale:

- Per-region soft gate (audit ≥80 / Lighthouse ≥85) naturally aligns with one-plan-per-region
- Recovery from a failed region is localized (e.g., if Haifa's Bahá'í imagery blocks, only the Haifa plan halts)
- Parallel-execution opportunity within waves: regions in the same wave can run side-by-side (e.g., wave 1 could run Tel Aviv + Dead Sea + Galilee in parallel since they don't share image sources or content dependencies)

Plan structure:

- Plan 01: Tel Aviv (highest composite — first to validate replication template)
- Plan 02: Dead Sea (includes Masada as sub-dest)
- Plan 03: Galilee
- Plan 04: Eilat
- Plan 05: Negev Desert
- Plan 06: Nazareth
- Plan 07: Haifa (with Bahá'í policy caveat)
- Plan 08: Golan Heights
- Plan 09: Caesarea
- Plan 10: Akko
- Plan 11: Bethlehem (canonical only, separate `/west-bank/` route family)

### Wave assignment

Per the parallel-execution config, group regions into waves:

| Wave | Plans (regions)             | Rationale                                                                                                 |
| ---- | --------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1    | Tel Aviv                    | Solo — first replication, validate template before parallelizing                                          |
| 2    | Dead Sea ‖ Galilee ‖ Eilat  | 3 in parallel — all distinct image sources, no shared content                                             |
| 3    | Negev ‖ Nazareth ‖ Caesarea | 3 in parallel — moderate sub-dest counts                                                                  |
| 4    | Haifa ‖ Golan ‖ Akko        | 3 in parallel — Haifa has Bahá'í caveat; the 3 share UNESCO/heritage themes (low editorial conflict risk) |
| 5    | Bethlehem                   | Solo — distinct route family `/west-bank/`; requires admin-status framing review                          |

5 waves wall-clock, ~5 executors per wave average.

### Per-region content pattern (from Jerusalem pilot — proven)

Each region gets:

- **EN canonical** at `/en/{region-slug}/` — 1500–2500 words, 8–12 sections, REGION_CANONICAL profile, schema TouristDestination + BreadcrumbList + FAQPage, ≥5 affiliate placements (Booking + Civitatis OR Viator OR GYG + Skyscanner + RentalCars + SafetyWing)
- **HE canonical** at `/{region-slug}/` — native rewrite via `hebrew-content-writer` skill, ≥85% EN word count, schema parity
- **3-8 sub-destinations** EN + HE pairs at `/{region-slug}/{subdest}/` — each 800–1200w, TouristAttraction schema (+ ReligiousBuilding for Nazareth's Basilica, Haifa's Bahá'í, etc.), ≥1 affiliate per page, photo with credits ledger entry
- **Religious-site naming applied** where relevant (Nazareth, Akko, Caesarea historical sites — apply same paired-naming rule from Phase 2)
- **Hreflang reciprocal** with `x-default` to EN

### Image sourcing strategy — LOCKED

Inherits Phase 2 pattern. Per region:

- **Primary source:** Wikimedia Commons CC-BY/CC-BY-SA — sufficient for Tel Aviv (80%+), Jerusalem-adjacent regions, Galilee tourist sites
- **Supplementary:** IGPO archive for restricted/historical sites
- **Synthetic placeholders OK for v1** — Phase 2 shipped placeholder JPEGs for restricted-site images (Sharp-generated 1600px PNG/JPG); same pattern applies here. CI gate validates width + ledger entry; ACTUAL imagery is Phase 6 swap
- **Haifa (Bahá'í Gardens):** Wikimedia ONLY for v1. Do NOT commission new shoots. Note in `data/baha-i-photo-policy.md` that real commissioning requires `press@bahai.org` written permission (Phase 6 task)
- **Negev:** Wikimedia 40-50% coverage estimate from PITFALLS §5.2. Accept thinner gallery for v1 (3-4 photos vs Jerusalem's 6+). Synthetic placeholder for unsourceable subjects. Document gap in `data/negev-images.md` for Phase 6 commissioning ($1,500-$3,000).
- **Restricted-site `restrictedSiteAcknowledgment` field** applies anywhere a CC-licensed photo depicts a site with commercial-photo restrictions (Bahá'í shrines, religious interiors)

### Per-region soft gate criteria — LOCKED (per ROADMAP)

Each region's plan ends with a per-region audit:

- `pnpm qa:audit` reports region pages with profile-appropriate score:
  - REGION_CANONICAL: audit ≥80 (Phase 2 was ≥85 for pilot; relaxed for replication)
  - SUB_DESTINATION: audit ≥75
- Lighthouse mobile (3-run-median if CI available; deferred to GH Actions if not): perf ≥85, a11y ≥95, best-practices ≥95, SEO 1.00
- 0 critical bugs
- EN+HE parity (every EN region+sub-dest has HE counterpart)
- Schema validates
- Credits ledger entries for all images

If any region's soft gate fails: 3 fix attempts within the plan, then halt that region (don't cascade to others in same wave; other regions can still proceed).

### Bethlehem treatment — LOCKED

- Route: `/en/west-bank/bethlehem/` and `/west-bank/bethlehem/` (HE) — distinct from Israel-proper regions
- Frontmatter: `administrativeStatus: 'palestinian-authority'`
- Content: factual, traveler-focused, neutral tone. Mentions Church of the Nativity, Manger Square, separation barrier as practical-info (transport via Jerusalem checkpoint), but no political commentary
- Internal links: from Jerusalem canonical's "Day Trips" section (already present from Phase 2.1) AND from Jerusalem itinerary "Day 3" (already present from Phase 2.4 with PA framing)
- No sub-destinations in v1 (deferred — Aida camp, Shepherd's Field, etc. all carry sensitivity beyond v1 scope)
- AUD-019 (administrativeStatus frontmatter required for West Bank/Hebron/Jericho) MUST pass

### Affiliate strategy per region — LOCKED

Same as Phase 2 pilot:

- REGION_CANONICAL: ≥5 affiliate placements (Booking lodging + Civitatis/Viator/GYG tours + Skyscanner/RentalCars/DiscoverCars transport + SafetyWing insurance)
- SUB_DESTINATION: ≥1 affiliate (typically Civitatis or Viator tour for that specific site)
- Affiliates use Phase 1.4 helpers — no direct partner URLs
- FTC inline disclosure on every monetized page (AUD-009 enforces)

### Quality Gate aggregate (end of Phase 3)

Phase 3 ends when:

- All 10 regions + Bethlehem soft-gate-passed
- `data/phase-3-region-report.md` aggregates per-region results
- `pnpm qa:audit && pnpm qa:quality-gate` full site run shows ≥30 regions+sub-dests scoring above their profile thresholds
- No need for a "hard gate" repeat — Phase 2 already validated the model; Phase 3 is execution at scale

### Claude's Discretion (planner + executor flexibility)

- **Specific sub-destinations chosen per region** — pick from the suggestions above OR substitute equivalent if research surfaces a better candidate
- **Word count within band** — 1500-2500 region canonical, 800-1200 sub-dest, optimized for reader value
- **Image quantity per page** — Jerusalem used 6 hero+inline. Other regions can use 4-6 for canonicals, 1-2 per sub-dest, more if Wikimedia coverage allows
- **Itinerary content** — out of scope for Phase 3 individual plans (Jerusalem was the only one in Phase 2); Phase 4 long-tail sweep covers per-region itineraries if SEO data supports
- **Wave boundary timing** — planner can collapse waves if executors return faster than expected (e.g., merge wave 2 and 3 if wave 2 finishes fast)
- **Per-region plan structure** — 2-3 tasks per plan (Wave 0 / EN+HE canonical / sub-destinations) OR 4-5 tasks (split EN/HE/sub-dests/audit)

</decisions>

<specifics>
## Specific Ideas

- **Tel Aviv reuses Phase 2 pattern almost identically** — best first replication test; if Tel Aviv passes its soft gate cleanly, parallelize the rest with confidence
- **Galilee is a region with 6+ candidate sub-destinations** spanning religious (Capernaum, Mt of Beatitudes) AND nature (Sea of Galilee, Mt Arbel) — exercise both ReligiousBuilding AND TouristAttraction schema generators
- **Negev is the image-gap canary** — if Negev's audit passes with 3-4 photos vs Jerusalem's 6, that proves the system handles photo-poor regions; if it fails, surfaces a gap to fix in Phase 6
- **Haifa is the policy-gap canary** — same role for the Bahá'í commercial-photo restriction; uses Wikimedia-only photos; if audit passes, the workflow handles restricted-source regions correctly
- **Bethlehem at `/west-bank/bethlehem/`** validates the AUD-019 administrativeStatus enforcement — if the route works and audit accepts the framing, future West Bank coverage (post-v1) has a proven path
- **Re-use Phase 2 patterns:** the executor agents should literally copy-adapt `content/{en,he}/regions/jerusalem.mdx` structure to each new region — H-tag scaffolding is the same template, content swaps per-region
- **Religious sites for Nazareth, Akko, Caesarea** — paired naming applies (Basilica of the Annunciation has no Arabic exonym typically used; Akko/Acre dual-naming for the city itself — "Akko (Acre)" first reference; Caesarea Maritima vs Caesarea Philippi distinction)

</specifics>

<code_context>

## Existing Code Insights

Phase 1 + Phase 2 left full operational foundation. Phase 3 = content scale.

### Reusable Assets (all proven in Phase 2 pilot)

| Asset                                             | Used in every Phase 3 region                                  |
| ------------------------------------------------- | ------------------------------------------------------------- |
| `app/[locale]/[region]/page.tsx`                  | Renders every region canonical                                |
| `app/[locale]/[region]/[subdest]/page.tsx`        | Renders every sub-destination                                 |
| `app/[locale]/itineraries/[slug]/page.tsx`        | Phase 4 may add per-region itineraries; Phase 3 does NOT      |
| Velite `regions` + `subDestinations` collections  | Content authoring                                             |
| All 25 components from Phase 1.3                  | Content rendering                                             |
| 9 affiliate helpers + 2 stubs                     | Monetization                                                  |
| 11 schema generators                              | JSON-LD                                                       |
| 34 AUD audit rules + Quality Gate generator       | Per-region soft gates                                         |
| `scripts/qa/check-credits.mjs` + Sharp width gate | Image enforcement                                             |
| `scripts/qa/hebrew-content.mjs`                   | HE rewrite quality (ktiv maleh, paired naming)                |
| `scripts/qa/validate-schema.mjs`                  | Schema integrity                                              |
| `data/religious-sites.json` (25 entries)          | Paired naming for religious sub-destinations                  |
| `lib/seo/naming.ts`                               | Religious naming + administrativeStatus detection (Bethlehem) |
| `.lighthouserc.cjs` + GH Actions                  | Perf gate on PR                                               |
| `app/not-found.tsx` (added in Phase 2.5)          | Global 404 with lang+dir                                      |

### Established Patterns (from Phase 2)

- **Image placeholder pattern:** Sharp script generates 1600w PNG/JPG for unsourceable images; ledger entry valid; flagged in `data/photo-credits-fixtures/` or per-region fixtures dir
- **Hebrew word-count target:** 0.85-1.40 ratio of EN (per AUD-007); aim for 0.92-1.05 mid-band
- **Religious-site detection runs on every content commit** via pre-commit; auto-catches "Wailing Wall" or unpaired "Temple Mount"
- **Region+sub-dest internal linking:** canonical's AttractionGrid pulls sub-dests by parentRegion; each sub-dest breadcrumb links back via BreadcrumbList schema
- **AffiliateCard pattern:** `<AffiliateCard partner="booking" destination="Tel Aviv" />` — simple prop; component dispatches helper + injects disclosure
- **Profile assignment:** region canonical = REGION_CANONICAL (audit ≥85/80), sub-dest = SUB_DESTINATION (≥75), itinerary = GUIDE_OR_WINERY (≥75), hub = HUB (no length req), legal = UTILITY (minimal)

### Integration Points

- **Content directories:**
  - `content/en/regions/{tel-aviv,dead-sea,galilee,eilat,negev,nazareth,haifa,golan,caesarea,akko}.mdx`
  - `content/he/regions/{...same slugs}.mdx`
  - `content/en/sub-destinations/{region-slug}-{subdest-slug}.mdx` (Phase 2 used naming pattern `jerusalem-old-city.mdx`, etc.)
  - `content/{en,he}/west-bank/bethlehem.mdx` (new directory for Bethlehem)
- **Images:**
  - `public/images/regions/{region-slug}/{hero,inline-{n}}.jpg`
  - `public/images/sub-destinations/{region-slug}-{subdest-slug}.jpg`
  - `public/images/west-bank/bethlehem-{hero,...}.jpg`
- **Audit run:**
  - `pnpm qa:audit` after each region's commit
  - Region soft gate criteria checked at end of each region's plan

</code_context>

<deferred>
## Deferred Ideas

- **Real photography commissioning for Negev / Galilee / etc.** — Phase 6 budget approval ($1,500-$3,000 for Negev specifically); document gap in per-region note files
- **Bahá'í Gardens commissioned imagery (Haifa)** — Phase 6 after press@bahai.org confirmation
- **Per-region itineraries (e.g., "2 Days in Tel Aviv", "Galilee road trip")** — Phase 4 long-tail sweep if SEO research supports
- **Hebron coverage** — out of scope per PROJECT.md; not in v1 or v2
- **Gaza-adjacent towns (Sderot, Ashkelon proximate)** — out of scope per PROJECT.md travel-advisory framing
- **Per-region sub-destination expansion beyond 3-8** — Phase 4 long-tail sweep
- **Israel-wide multi-day itineraries** — Phase 4 (e.g., "10 Days in Israel", "7-day Christian Pilgrimage")
- **Manual SERP review for non-Jerusalem regions** — deferred to post-launch monitoring (Phase 6); Phase 2's checklist template applies but verdicts come from real ranking data
- **Hebrew slug aliases for top regions** — v2 (per PROJECT.md key decision)
- **FR locale content** — Phase 3 does NOT add FR content; scaffold remains filesystem-only

</deferred>

---

_Phase: 03-region-replication-m3_
_Context gathered: 2026-05-11_
_Mode: YOLO auto — Jerusalem pilot pattern proven; 10 regions + Bethlehem replicated; soft gates per region_
