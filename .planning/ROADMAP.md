# Roadmap: Discover Israel

## Overview

Six-phase delivery of a production-ready, bilingual (EN+HE) tourism affiliate website covering 11 Israeli regions, ~30-80 sub-destinations, and full IS 5568 accessibility compliance. The roadmap is **prescribed by `MEGA-PROMPT-NEW-COUNTRY.md`** (Fase 1-6) and **validated by `.planning/research/SUMMARY.md §8`** — phases are NOT derived from scratch; they encode a structural fix to the nine Discover Argentina root causes. Foundation-before-content is inviolable. Pilot-before-replication is inviolable. The hard **Quality Gate** between Phase 2 and Phase 3 either advances the workflow or writes `data/quality-gate-failure.md` and stops.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3, 4, 5, 6): Planned milestone work
- Decimal phases (e.g., 2.1, 2.2): Urgent insertions only (none planned)

- [ ] **Phase 1: Foundation (M1)** — 11 sub-phase plans that build scaffold, design tokens, components, affiliate helpers, photo-credits ledger, schema lib, quality profiles, SEO config, audit dashboard, Lighthouse CI gate, NER detection — BEFORE any region page is written
- [ ] **Phase 2: Pilot Region Jerusalem (M2)** — Production-depth Jerusalem in EN+HE with 5-10 sub-destinations, hub pages, legal pages; ends in hard Quality Gate
- [ ] **Phase 3: Region Replication (M3)** — 10 more regions (Tel Aviv → Akko) using pilot template, each at audit ≥80 / Lighthouse ≥85 soft gate
- [ ] **Phase 4: Long-tail Sub-destination Sweep (M4)** — Additional sub-destinations beyond the 30-80 of Phase 3, prioritized by Ahrefs/DataForSEO keyword volume
- [ ] **Phase 5: Legal + Launch Prep + Final QA (M5)** — IS 5568 statement final form, legal pages parity check, "Looks done but isn't" PITFALLS §13 checklist, deploy prep
- [ ] **Phase 6: Production Deploy + Monitoring (M6)** — Vercel prod, GSC + sitemap submit, affiliate health monitor, Lighthouse CI history, post-launch backlog

## Quality Gate (Hard Stop — Between Phase 2 and Phase 3)

The Quality Gate is NOT a phase. It is a **conditional advance** between Phase 2 (Pilot Jerusalem) and Phase 3 (Region Replication). All ten criteria below must PASS on the pilot region (EN+HE) before Phase 3 begins. Source: PROJECT.md "Quality Gate" + REQUIREMENTS.md AUD-05 + MEGA-PROMPT Quality Gate table.

| #   | Criterion                                  | Threshold                                                                                  | Source                      |
| --- | ------------------------------------------ | ------------------------------------------------------------------------------------------ | --------------------------- |
| 1   | Lighthouse mobile (3-run median)           | perf ≥0.90 / a11y ≥0.95 / best-practices ≥0.95 / SEO 1.00                                  | AUD-003                     |
| 2   | Audit dashboard per-page score             | ≥85 on every pilot page using its profile                                                  | AUD-002                     |
| 3   | Critical bugs                              | 0                                                                                          | manual + AUD scan           |
| 4   | Affiliate coverage of applicable partners  | ≥80% of applicable per page (5+ active on region canonical)                                | AUD-031 + AFF-01            |
| 5   | EN + HE parity                             | 100% — every EN page has HE counterpart and vice-versa                                     | I18N-05 + AUD-032           |
| 6   | Credited images ≥1200px                    | 100% of imported images have ledger entry, ≥1200px, srcset                                 | IMG-01, IMG-02, IMG-03      |
| 7   | Raw hex codes in components                | 0 (excluding `tailwind.config.ts` / `@theme` foundation layer)                             | AFF-05 + AUD-001            |
| 8   | hreflang valid (bidirectional + x-default) | every page emits `he` + `en` + `x-default`; reciprocal; canonical never cross-locale       | I18N-05 + AUD-032 + AUD-033 |
| 9   | Schema validated                           | 100% of pages pass `scripts/qa/validate-schema.mjs`; sample Google Rich Results Test green | SEO-03 + AUD-033            |
| 10  | Internal links broken                      | 0 (audit dashboard scanner)                                                                | AUD-01 broken-link rule     |

**Pass:** Write `data/quality-gate-pass.md` summarizing each criterion + result. Advance to Phase 3.
**Fail (any criterion):** Write `data/quality-gate-failure.md` with the failing criterion, suspected cause, and proposed fix. **Stop. Do not advance to Phase 3.** Await human input.

Generator: `AUD-05` (`/admin/audit/quality-gate` route or `pnpm qa:quality-gate` CLI).

## Phase Details

### Phase 1: Foundation (M1)

**Goal**: Scaffold and structurally fix every Argentina root cause so that no Phase 2 content page can be written without (a) a typed schema generator, (b) a registered affiliate helper, (c) a photo-credits ledger entry, (d) ESLint-enforced design tokens, (e) RTL-safe components, (f) a measurable audit + Lighthouse CI gate.

**Depends on**: Nothing (first phase).

**Requirements**: FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07, FND-08, AFF-01, AFF-02, AFF-03, AFF-04, AFF-05, AFF-06, AFF-07, AFF-08, I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06, A11Y-01, A11Y-02, A11Y-06, A11Y-07, A11Y-08, SEO-01, SEO-02, SEO-03, SEO-05, SEO-06, IMG-01, IMG-02, IMG-03, IMG-06, AUD-01, AUD-02, AUD-03, AUD-04, AUD-05.

**Research flag**: `needs_research: false` — Phase 1 is fully specified by ARCHITECTURE §8 DAG, STACK §1-§8, and the mega-prompt Fase 1 sub-phases. No external data gap blocks execution.

**Success Criteria** (observable, verifiable by `gsd-verifier`):

1. `pnpm dev` boots a Next.js 15.5 + TS strict + Tailwind v4 + next-intl v3 app at `localhost:3000` with HE at root and EN at `/en/`; both render with `<html lang dir>` correctly set per route.
2. `pnpm lint` fails (non-zero exit) on a test file containing `bg-[#abc]` AND on a test file containing `<a href="https://www.booking.com/...">` outside `lib/affiliate/**` (ESLint rules AFF-04, AFF-05).
3. `pnpm test lib/affiliate` reports 44+ passing helper tests (9 real × 4 minimum) plus 4+ stub-throw tests for Klook/GoCity; coverage report shows 100% of `lib/affiliate/*.ts` exported functions exercised.
4. `/admin/components/` route renders all 7 primitives and 12 travel composites in both `dir="ltr"` and `dir="rtl"` modes without console errors; physical directional utilities absent (AUD-030 audit scan returns 0).
5. `/admin/audit/` route renders behind basic auth and shows the 34 audit rules (AUD-001..AUD-034) executed against a sample empty build, with per-rule pass/fail/skip status persisted to `data/audit-results.json`.
6. `pnpm lhci autorun` against a 2-page sample build returns 3-run-median scores stored to `data/lighthouse-results.json` with thresholds asserted; deploy is blocked on assertion failure (verified by intentionally introducing a perf regression).

**Plans** (11 sub-phases per MEGA-PROMPT Fase 1, ordered per ARCHITECTURE §8 build-order DAG):

```
                  ┌─────────────────────────────┐
                  │ 1.1 Scaffold                │
                  └────────────┬────────────────┘
                               │ depends on
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       1.2 Design tokens   1.5 Photo ledger   1.6 Schema baseline
              │                    │                   │
              ▼                    │                   │
       1.3 Component lib ◄─────────┘                   │
              │                                        │
              ├────────────────────────┬───────────────┤
              ▼                        ▼               ▼
       1.4 Affiliate infra      1.7 Quality profiles   1.8 SEO config
              │                       │           │
              └─────────┬─────────────┘           │
                        ▼                         │
                  1.11 NER detection              │
                        │                         │
                        ▼                         │
                  1.9 Audit dashboard ◄───────────┘
                        │
                        ▼
                  1.10 Lighthouse CI gate
```

Plans:

- [ ] 01-01: Scaffold — Next.js 15.5 + TS strict + Tailwind v4 + next-intl v3 (2 locales registered per Conflict A, 3-locale filesystem) + ESLint flat config + Vercel deploy config + Plausible decision lock-in
- [x] 01-02: Design tokens — 3-layer (`@theme` foundation → semantic → component); Hebrew Tailwind preset; logical CSS properties only; ESLint enforcement for raw hex (AFF-05 layer A+B) ✓ Completed 2026-05-11
- [ ] 01-03: Component library — 7 primitives + 12 travel composites (incl. `<RegionHero>`, `<PhotoGallery>`, `<AffiliateCard>`, `<ShabbatNotice>`, `<Price>`, `<SkipNav>`) + `/admin/components/` noindex playground
- [ ] 01-04: Affiliate helpers — 9 real (`bookingLink`, `civitatisLink`, `viatorLink`, `getYourGuideLink`, `rentalcarsLink`, `safetyWingLink`, `skyscannerLink`, `hostelworldLink`, `discoverCarsLink`) + 2 stubs (`klookLink`, `goCityLink`) per Conflict D; Zod validation; 4+ Vitest tests each; ESLint `no-restricted-syntax` for raw partner URLs (AFF-04); `data/affiliate-status.json` + `data/affiliate-availability.json`; Travelpayouts aggregator scaffolded; FTC `<AffiliateDisclosure>` inline component (AFF-06)
- [ ] 01-05: Photo credits ledger — `data/photo-credits.json` Zod schema (width≥1200, license, author, sourceUrl, blurDataURL, restrictedSiteAcknowledgment for Western Wall/Holy Sepulchre/Dome of the Rock/Bahá'í); `scripts/qa/check-credits.mjs` CI gate; IGPO + Wikimedia source allowlist in `next.config.ts` remotePatterns
- [ ] 01-06: Schema baseline — `schema-dts` + `lib/schema/{organization,touristDestination,touristAttraction,religiousBuilding,place,localBusiness,breadcrumb,faq,webSite,collectionPage,webPage}.ts` builders; `<JsonLd>` RSC component; `data/religious-sites.json` with paired naming; `scripts/qa/validate-schema.mjs`
- [ ] 01-07: Quality scoring profiles — 5 profiles (`REGION_CANONICAL`, `SUB_DESTINATION`, `GUIDE_OR_WINERY`, `UTILITY`, `HUB`) with distinct weight matrices; `scripts/audit/profiles/*.ts`
- [ ] 01-08: SEO config — Dynamic `app/sitemap.ts` (registered-locales only), `app/robots.ts` (disallow `/admin/`, `/api/`), hreflang generator (bidirectional + `x-default`), self-referential canonical generator, 301 redirect map in `middleware.ts`
- [ ] 01-09: Audit dashboard — `/admin/audit/` behind middleware basic-auth; runs AUD-001..AUD-034 over built pages; per-page score by profile; cached JSON + sortable HTML view; `AUD-05` quality-gate report generator at `/admin/audit/quality-gate`
- [ ] 01-10: Lighthouse CI gate — `@lhci/cli` with `numberOfRuns: 3` + `aggregationMethod: median`; mobile thresholds perf≥0.90/a11y≥0.95/best-practices≥0.95/seo=1.00; GitHub Action `treosh/lighthouse-ci-action` blocks merge; `data/lighthouse-results.json` persisted
- [ ] 01-11: NER detection — `data/entity-dict.json` (tour/hotel/restaurant/museum/transport classes); regex-based detector scans MDX; surfaces unmonetized mentions in audit dashboard

---

### Phase 2: Pilot Region Jerusalem (M2)

**Goal**: Build Jerusalem to production depth in EN + HE (region canonical 1500-2500w, 5-10 sub-destinations 800-1200w each, ≥1 itinerary, hub pages, legal pages) so that every Israel-specific differentiator (paired religious naming, Shabbat awareness, premium image discipline, IS 5568 accessibility, rich religious-site schema) is exercised at maximum complexity before scaling.

**Depends on**: Phase 1 complete (`/gsd:audit-milestone M1` green).

**Requirements**: CNT-01, CNT-02, CNT-03, CNT-04, CNT-05, CNT-06, CNT-07, A11Y-03, A11Y-04, A11Y-05, SEO-04, IMG-04, IMG-05.

**Research flag**: `needs_research: true` — **Mandatory before Phase 2.1**: validate R3 keyword volumes via Ahrefs Lite ($129) or DataForSEO API ($50) to confirm Jerusalem keyword cluster targets per SUMMARY §6 Gap #1. R3 proxied volumes are MEDIUM-LOW confidence; absolute spend on Jerusalem canonical word count + sub-dest selection depends on validated volumes. Secondary: confirm Jerusalem Old City `restrictedSiteAcknowledgment` cleared per restricted site (Western Wall Heritage Foundation, Christian Information Center, Waqf) before image import in Phase 2.1.

**Success Criteria** (observable, verifiable by `gsd-verifier`):

1. Both `/en/jerusalem/` and `/jerusalem/` (HE at root) render with full schema validation passing (`TouristDestination` + `BreadcrumbList` + `FAQPage` + `Organization` in layout); Google Rich Results Test on a sampled snapshot shows zero errors; `inLanguage` field matches route locale on every JSON-LD block.
2. The Jerusalem region canonical has 5+ active affiliate widgets routed through helpers (Booking, Civitatis OR Viator OR GYG, RentalCars OR DiscoverCars, SafetyWing, Skyscanner); FTC disclosure renders inline within 1 viewport-height of the FIRST affiliate link on both EN and HE versions (AUD-009).
3. `/accessibility-statement` (EN) and `/הצהרת-נגישות` or transliterated-slug HE counterpart render with named accessibility coordinator (real name + phone + email — A11Y-04), commitment, standard, features, limitations, last-audit-date; footer of every Jerusalem page links to the locale-appropriate statement (AUD-027 + AUD-028 pass).
4. Phase 2.2 checkpoint report at `data/pilot-checkpoint.md` shows: AUD-017..AUD-020 (Wailing Wall regex, "Judea and Samaria" regex, Temple Mount paired-naming, administrativeStatus frontmatter) all pass on the EN canonical; Old City restricted-site images all have cleared `restrictedSiteAcknowledgment` per IMG-05; Hebrew translation throughput estimated within budgeted time for sub-destinations.
5. Quality Gate report at `data/quality-gate-pass.md` exists with all 10 Quality Gate criteria explicitly marked PASS (or `data/quality-gate-failure.md` exists with detailed failure analysis and workflow halts).

**Plans** (6 sub-phases per MEGA-PROMPT Fase 2, with Phase 2.2 pilot-switch checkpoint):

Plans:

- [ ] 02-01: Jerusalem EN canonical (`/en/jerusalem/`) — 1500-2500w, 8-12 sections (hero, best time, top attractions, where to stay, tours, how to get there, food, day trips, FAQ); 5+ helper-routed affiliate widgets; schema `TouristDestination` + `BreadcrumbList` + `FAQPage`; hero image with `priority` + `fetchpriority="high"` (AUD-012). **Prereq: R3 keyword validation purchased and Ahrefs/DataForSEO data committed to `.planning/research/R3-validated.md` BEFORE writing.**
- [ ] 02-02: Jerusalem HE canonical (`/jerusalem/`) + **pilot-switch checkpoint** — Native Hebrew rewrite via `hebrew-content-writer` skill (NOT literal translation), ≥85% of EN word count, full schema parity; paired religious naming on first reference. **Checkpoint at end:** if AUD-017..AUD-020 fail OR >30% Old City images lack cleared sources OR Hebrew translation throughput >2× budget → switch pilot to Tel Aviv (only Phase 2.1 + 2.2 redone). Past this checkpoint, switch is no longer cheap.
- [ ] 02-03: Jerusalem sub-destinations (5-10, EN + HE) — 800-1200w each; schema `TouristAttraction` + `BreadcrumbList` (+ `ReligiousBuilding` for Western Wall, Holy Sepulchre, Dome of the Rock); ≥1 affiliate per page; credited photos; breadcrumb back to Jerusalem canonical. Targets per FEATURES §1: Old City Quarters, Western Wall, Holy Sepulchre, Temple Mount/Haram al-Sharif, Mt of Olives, Yad Vashem, Mahane Yehuda, City of David, Israel Museum, Tower of David — narrow to 5-10 based on R3 validated volume.
- [ ] 02-04: Jerusalem itinerary content (≥1 page, EN + HE) — e.g., "3 days in Jerusalem" or "7 days in Israel including Jerusalem"; schema `TouristTrip` or `ItemList`; ties Jerusalem canonical to day-trip neighbors (Bethlehem under `/west-bank/` framing per REG-04, Dead Sea, Tel Aviv).
- [ ] 02-05: Hub + legal pages — Homepage (region grid + main CTAs), `/regions/` index, `/en/regions/`; About, Contact, Privacy, Affiliate Disclosure, Accessibility Statement in EN + HE (A11Y-03, A11Y-04, A11Y-05, CNT-07); legal entity name confirmed for footer (SUMMARY §6 Gap #9); named accessibility coordinator designated and live (SUMMARY §6 Gap #7).
- [ ] 02-06: Pilot QA + **Quality Gate execution** — Run audit dashboard against all pilot pages; run Lighthouse CI 3-run-median against every page; fix all findings; execute `pnpm qa:quality-gate` which writes `data/quality-gate-pass.md` (all 10 criteria pass) or `data/quality-gate-failure.md` (any fail → HARD STOP, no Phase 3).

---

### Phase 3: Region Replication (M3)

**Goal**: Replicate the pilot template across 10 more regions (Tel Aviv, Dead Sea, Galilee, Eilat, Negev, Nazareth, Haifa, Golan Heights, Caesarea, Akko) at audit ≥80 / Lighthouse ≥85 soft gate per region, growing total live page count to ~200 (11 regions × 2 langs + 30-80 sub-destinations × 2 langs + hubs + legal).

**Depends on**: Phase 2 Quality Gate PASS (`data/quality-gate-pass.md` exists). If Quality Gate failed, this phase does not begin.

**Requirements**: REG-01, REG-02, REG-03, REG-04, REG-05.

**Research flag**: `needs_research: true` — Region-specific research blocks: (a) **Haifa Bahá'í photography policy** — email `press@bahai.org` and obtain written permission BEFORE Phase 3 Haifa region canonical photo import; if denied, source from IGPO archive or commission alternative imagery. (b) **Negev image commissioning** — $1,500–$3,000 budget approved OR IGPO archive sourcing complete BEFORE Phase 3 Negev canonical (REG-05). Other regions follow ARCHITECTURE / FEATURES templates without additional research blocks.

**Success Criteria** (observable, verifiable by `gsd-verifier`):

1. All 10 region canonicals (EN + HE = 20 pages) exist, each at audit score ≥80 and Lighthouse mobile 3-run-median ≥85, scoring with their `REGION_CANONICAL` profile; replication order honored: Tel Aviv → Dead Sea → Galilee → Eilat → Negev → Nazareth → Haifa → Golan Heights → Caesarea → Akko.
2. 30-80 total sub-destination pages exist (EN + HE), prioritized by R3 validated keyword volume; each at audit ≥80 with `SUB_DESTINATION` profile; breadcrumb back to parent region canonical; ≥1 affiliate per sub-dest page.
3. `/west-bank/bethlehem/` (EN + HE) exists with `administrativeStatus: "palestinian-authority"` frontmatter and editorial framing per REG-04 (AUD-020 passes); Hebron page absent from sitemap (out-of-scope exclusion holds).
4. `data/region-replication-report.md` shows per-region: pages built, affiliate coverage %, Lighthouse 3-run-median, audit score, image sources verified, religious-site naming compliance (AUD-017..AUD-020 per region where applicable — Galilee, Nazareth, Haifa Bahá'í, Golan Druze).
5. Haifa Bahá'í photography policy decision recorded at `data/baha-i-photo-policy.md` (permission obtained OR alternative sources documented); Negev image commissioning result recorded at `data/negev-images.md` (budget spent OR IGPO archive list with license proofs).

**Plans**:

- [ ] 03-01: Tel Aviv canonical + sub-destinations (EN + HE)
- [ ] 03-02: Dead Sea canonical + sub-destinations (incl. Masada per FEATURES taxonomy decision)
- [ ] 03-03: Galilee canonical + sub-destinations
- [ ] 03-04: Eilat canonical + sub-destinations
- [ ] 03-05: Negev Desert canonical + sub-destinations (gated on REG-05 image budget)
- [ ] 03-06: Nazareth canonical + sub-destinations
- [ ] 03-07: Haifa canonical + sub-destinations (gated on Bahá'í photography policy decision)
- [ ] 03-08: Golan Heights canonical + sub-destinations
- [ ] 03-09: Caesarea canonical + sub-destinations
- [ ] 03-10: Akko canonical + sub-destinations
- [ ] 03-11: Bethlehem (`/west-bank/bethlehem/`) with editorial framing per REG-04

(Plans may run in parallel per ARCHITECTURE §8 parallelizable bundles; `/gsd:autonomous` with `parallelization=true` is appropriate given coarse granularity.)

---

### Phase 4: Long-tail Sub-destination Sweep (M4)

**Goal**: Build additional long-tail sub-destinations beyond the 30-80 from Phase 3, prioritized by validated keyword volume, to capture remaining commercial-intent search traffic.

**Depends on**: Phase 3 complete (all 11 regions live with their Phase-3 sub-destinations).

**Requirements**: SUB-V2-01 (promoted from v2 to v1-execution scope at this phase; long-tail is essential to the "compete on SEO" core value but only after canonicals stabilize per Argentina lesson #9).

**Research flag**: `needs_research: false` (standard) — Optional re-run of Ahrefs/DataForSEO on a per-region basis if keyword landscape has shifted since Phase 2; otherwise execute against the existing R3-validated dataset.

**Success Criteria** (observable, verifiable by `gsd-verifier`):

1. Long-tail sub-destination count grown by ≥50% over Phase 3 (e.g., 30→45 or 80→120), ordered by `volume × difficulty^-1` from validated R3 data; each at audit ≥80 / Lighthouse mobile ≥85.
2. Internal-link graph density (links per page to other site pages) increased: every long-tail sub-dest links back to its parent region canonical AND to ≥2 sibling sub-destinations; broken-link scanner returns 0.
3. NER detection (Phase 1.11) re-run across the full content set surfaces no unmonetized entity-mention opportunities in the audit dashboard above a configured threshold (e.g., 0 unmonetized mentions on canonical pages, ≤2 on long-tail pages).
4. `data/m4-completion-report.md` enumerates added pages by region, affiliate density delta, keyword cluster coverage achieved vs. R3 target.

**Plans**:

- [ ] 04-01: Per-region long-tail expansion (parallelizable per region; one plan per region or one consolidated sweep — TBD during plan-phase based on validated volume distribution)

---

### Phase 5: Legal + Launch Prep + Final QA (M5)

**Goal**: Combine the mega-prompt's Fase 5 (editorial gap-filling if needed) and Fase 6 (deploy prep) into a single launch-readiness milestone. Final form on legal pages, IS 5568 statement notarization, "Looks done but isn't" PITFALLS §13 checklist sweep, DNS + HTTPS + HSTS verification, monitoring scaffolding.

**Depends on**: Phase 4 complete.

**Requirements**: A11Y-03 (final form), A11Y-04 (coordinator notarized), DEP-01 (Vercel prod ready), DEP-03 (audit dashboard auth verified), partial DEP-02 (sitemap submission prepared but not executed — that's Phase 6).

**Research flag**: `needs_research: false` (standard) — Confirm legal entity name on footer if not finalized in Phase 2.5 (SUMMARY §6 Gap #9); confirm accessibility coordinator details unchanged.

**Success Criteria** (observable, verifiable by `gsd-verifier`):

1. PITFALLS §13 "Pre-Quality-Gate / pre-launch checklist" report at `data/pre-launch-checklist.md` shows every item PASS (covers items beyond the Phase 2 Quality Gate — full-site versions of those checks plus launch-specific items like 404 page existence, sitemap XML valid, robots.txt correct, OG-image existence per page).
2. `/admin/audit/` full-site sweep (all ~200+ pages) shows: 0 raw hex codes, 0 physical directional utilities, 0 unmonetized partner-URL hardcodes, 0 missing alt text, 0 broken internal links, 0 missing hreflang, 100% credited images, all schema validated.
3. Accessibility statement (HE + EN) shows real coordinator name, phone, email; last-audit date within 90 days; tested via `mailto:` and `tel:` links resolve correctly.
4. Vercel preview deploy on production-equivalent config (Pro plan, HTTPS + HSTS enabled, basic-auth middleware on `/admin/*`, env vars for affiliate AIDs populated where issued) passes full Lighthouse CI suite on a 10-page representative sample.

**Plans**:

- [ ] 05-01: Editorial gap-fill (skip if PITFALLS §13 finds no editorial gaps; otherwise targeted content insertion to address competitive blind-spots surfaced by audit)
- [ ] 05-02: IS 5568 final form (statement notarization, coordinator details verified live, locale-specific footer links sweep AUD-027/AUD-028 across all 200+ pages)
- [ ] 05-03: Pre-launch QA sweep (PITFALLS §13 checklist execution, full-site audit, full Lighthouse CI sample, broken-link scan, schema validation across every built page)
- [ ] 05-04: Deploy prep (Vercel Pro provisioning, production env vars, HTTPS + HSTS verification, basic-auth credentials issuance, monitoring scaffold)

---

### Phase 6: Production Deploy + Monitoring (M6)

**Goal**: Ship to production, complete Google indexing setup, activate ongoing monitoring (affiliate health, Lighthouse history, link rot), document post-launch backlog.

**Depends on**: Phase 5 complete.

**Requirements**: DEP-01, DEP-02, DEP-03, DEP-04, DEP-05, DEP-06.

**Research flag**: `needs_research: false` (standard) — Quarterly re-check of Klook SKU breadth and GoCity Israel destination launch (SUMMARY §6 Gap #5) is operational monitoring, not research.

**Success Criteria** (observable, verifiable by `gsd-verifier`):

1. `https://visitisrael.site` resolves to the production deploy with HTTPS + HSTS; `curl -I https://visitisrael.site/jerusalem/` returns `200 OK` with correct `Content-Language: he` and `Link: <https://visitisrael.site/en/jerusalem/>; rel="alternate"; hreflang="en"` headers; `/en/jerusalem/` similarly serves with `Content-Language: en`.
2. Google Search Console verified for `visitisrael.site`; XML sitemap submitted and accepted (no parse errors); IndexNow ping configured and emitting on content changes; `data/search-console-verification.md` records verification method + date.
3. `/admin/audit/` accessible to user behind basic auth using credentials in `data/admin-credentials.md` (encrypted or referenced — NOT committed); Lighthouse CI history retained 90 days at the configured LHCI endpoint with at least one historical run captured post-deploy.
4. Affiliate health monitor cron job runs weekly via Vercel Cron Jobs; HEAD-checks every helper-emitted URL pattern; writes failures to `data/affiliate-health.json`; first run completes successfully with all 9 real helpers green.
5. `data/post-launch-backlog.md` enumerates everything punted (FR locale activation, Hebrew slug aliases, RU locale, Klook activation criterion, GoCity activation criterion, user accounts, AI itineraries, real-time `<ShabbatNotice>` widget, Reg-35 a11y preferences widget) with rationale and re-evaluation trigger per item.

**Plans**:

- [ ] 06-01: Production deploy (Vercel prod, domain DNS, HTTPS + HSTS, env var population)
- [ ] 06-02: Google indexing setup (Search Console verify, sitemap submit, IndexNow ping, robots.txt verify in prod)
- [ ] 06-03: Monitoring activation (affiliate health cron via Vercel Cron Jobs, Lighthouse CI history retention, audit dashboard auth verification)
- [ ] 06-04: Post-launch backlog + executive summary (`data/post-launch-backlog.md` + `data/m6-completion-report.md`)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → [Quality Gate hard stop] → 3 → 4 → 5 → 6

Quality Gate failure between 2 and 3 halts the workflow; no auto-advance to Phase 3.

| Phase                                  | Plans Complete | Status      | Completed |
| -------------------------------------- | -------------- | ----------- | --------- |
| 1. Foundation (M1)                     | 3/11           | In Progress | -         |
| 2. Pilot Jerusalem (M2)                | 0/6            | Not started | -         |
| — Quality Gate (hard stop)             | —              | Not reached | -         |
| 3. Region Replication (M3)             | 0/11           | Not started | -         |
| 4. Long-tail Sweep (M4)                | 0/1 (TBD)      | Not started | -         |
| 5. Legal + Launch Prep (M5)            | 0/4            | Not started | -         |
| 6. Production Deploy + Monitoring (M6) | 0/4            | Not started | -         |

---

_Roadmap created: 2026-05-11_
_Source: MEGA-PROMPT-NEW-COUNTRY.md + .planning/research/SUMMARY.md §8 + REQUIREMENTS.md (53 v1 requirements mapped) + conflict resolutions §3 (Conflict A locales, Conflict C Jerusalem pilot, Conflict D affiliates)_
_Granularity: coarse (6 integer phases — fits coarse 3-5 target via mega-prompt prescription with M4 added per SUMMARY §8)_
_Coverage: 53/53 v1 requirements mapped (see REQUIREMENTS.md Traceability)_
