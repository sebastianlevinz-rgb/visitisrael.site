---
phase: 2
slug: pilot-region-jerusalem-m2
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-11
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

Phase 2 is **content-on-infrastructure**: Phase 1's 34 AUD rules, 11 schema generators, 9 affiliate helpers, Lighthouse CI gate, Quality Gate generator, photo-credits CI gate, schema validator, hreflang generator, and audit dashboard are all operational. Phase 2 plans **consume**, never **invent**. The Quality Gate at end of 2.6 is the hard stop.

---

## Test Infrastructure

| Property               | Value                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**          | Vitest 2.x (unit + integration; from Phase 1) + `@lhci/cli` (perf, real run now with content) + `axe-core` (a11y CI) + `audit_a11y.py` (IS 5568 specifics) |
| **Config file**        | `vitest.config.ts` + `eslint.config.js` + `.lighthouserc.cjs` (all from Phase 1, no new infra)                                                             |
| **Quick run command**  | `pnpm test --run`                                                                                                                                          |
| **Full suite command** | `pnpm lint && pnpm typecheck && pnpm test --run && pnpm qa:credits && pnpm qa:schema && pnpm qa:audit && pnpm qa:quality-gate`                             |
| **Per-page perf gate** | `pnpm qa:lighthouse` (3-run-median; only meaningful from 2.6 onward when content exists)                                                                   |
| **Estimated runtime**  | ~90s full (sans Lighthouse); ~5min including Lighthouse on 12 sample pages                                                                                 |

---

## Sampling Rate

- **After every task commit:** `pnpm test --run` (≤30s)
- **After every plan wave:** full suite minus Lighthouse (≤90s)
- **Before `/gsd:verify-work`:** full suite INCLUDING Lighthouse 3-run-median
- **Before Quality Gate (2.6):** all 10 Quality Gate criteria must be green per the report generator
- **Max feedback latency:** 30s unit tests · 90s pre-commit gate · 5min pre-deploy gate

---

## Per-Task Verification Map

> Populated from RESEARCH.md §3 (Validation Architecture). 13 req IDs × (plan-check + execute-check + proof artifact). The planner refines per-task as PLAN.md files are written; this table is the canonical req-ID→command mapping.

| Plan                 | Wave    | Requirement            | Test Type | Automated Command                                                                                                                                                                                                                     | Status     |
| -------------------- | ------- | ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 02-01 (EN canonical) | 1       | CNT-01                 | smoke     | `pnpm qa:audit` reports `/en/jerusalem/` page exists, schema `TouristDestination` + `BreadcrumbList` + `FAQPage` validate; word count 1500–2500 via Velite frontmatter                                                                | ⬜ pending |
| 02-01                | 1       | SEO-04 (Jerusalem app) | unit      | `pnpm test lib/seo/naming` against jerusalem.mdx — no "Wailing Wall", paired "Temple Mount / Haram al-Sharif" on first reference, religious sites carry correct frontmatter                                                           | ⬜ pending |
| 02-01                | 1       | IMG-04                 | unit      | `pnpm test components/PhotoGallery` against built page — hero image has `priority` + `fetchpriority="high"`; all <Image> srcset has 320/640/1024/1600 widths                                                                          | ⬜ pending |
| 02-01                | 1       | IMG-05                 | smoke     | `pnpm qa:credits` against jerusalem hero + section images — every entry from Western Wall/Holy Sepulchre/Dome of the Rock has `restrictedSiteAcknowledgment` field populated; non-restricted entries don't claim it                   | ⬜ pending |
| 02-02 (HE canonical) | 2       | CNT-02                 | smoke     | `pnpm qa:audit` reports `/jerusalem/` HE page exists; schema parity with EN; word count ≥85% of EN; `pnpm qa:hebrew-content` (new Wave 0 of 2.2) checks ktiv maleh consistency + paired naming                                        | ⬜ pending |
| Checkpoint           | 2.2→2.3 | CNT-03                 | smoke     | `pnpm qa:pilot-checkpoint` writes `data/pilot-checkpoint.md` with PASS/SWITCH verdict; exit 0 = pass, exit 1 = switch; 3 criteria from CONTEXT.md                                                                                     | ⬜ pending |
| 02-03 (sub-dests)    | 3       | CNT-04                 | smoke     | `pnpm qa:audit` reports 5–10 sub-dest pages exist (EN + HE pairs); each has schema `TouristAttraction` (+ ReligiousBuilding where applicable); each has ≥1 affiliate placement; word count 800–1200 per page                          | ⬜ pending |
| 02-04 (itinerary)    | 4       | CNT-05                 | smoke     | `pnpm qa:audit` reports ≥1 itinerary page at `/en/itineraries/{slug}/` + HE pair; uses `ItineraryCard`; links to Jerusalem canonical + day-trip neighbors; schema TripAction or WebPage with sections                                 | ⬜ pending |
| 02-05 (hubs+legal)   | 5       | CNT-06                 | smoke     | `curl /` (homepage) renders region grid with Jerusalem card; `/regions/` index lists Jerusalem; `/en/` and `/en/regions/` mirror                                                                                                      | ⬜ pending |
| 02-05                | 5       | CNT-07                 | smoke     | Each legal page (about, contact, privacy, affiliate-disclosure) exists in EN + HE; routable; schema WebPage; meta description present                                                                                                 | ⬜ pending |
| 02-05                | 5       | A11Y-03                | unit      | `pnpm test app/[locale]/accessibility-statement` — page renders with all IS 5568 required sections (commitment, standard ref, features list, limitations, coordinator block, last-audit date, feedback form); Hebrew page renders RTL | ⬜ pending |
| 02-05                | 5       | A11Y-04                | unit      | **Pre-commit hook** rejects any commit containing `__REQUIRES_USER_INPUT__` placeholder in accessibility frontmatter; `pnpm test legal/coordinator-format` validates name/phone/email shape (real values, not placeholders)           | ⬜ pending |
| 02-05                | 5       | A11Y-05                | smoke     | Footer of every page (run audit dashboard over built output) links to locale-correct accessibility statement; AUD-028 passes                                                                                                          | ⬜ pending |
| 02-06 (QA + Gate)    | 6       | All Phase 2 reqs       | gate      | `pnpm qa:quality-gate` (not in `phase1StructuralOnly` mode anymore) writes `data/quality-gate-pass.md` if all 10 Quality Gate criteria pass; else `data/quality-gate-failure.md` and halts                                            | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

**Coverage check:** 13/13 phase requirement IDs mapped to verification commands. ✓

---

## Wave 0 Requirements

Wave 0 items the planner schedules as the FIRST tasks within their sub-phase (before content authoring):

### For Plan 2.1 (Wave 0)

- [ ] Create `app/[locale]/[region]/page.tsx` — dynamic RSC reading Velite region collection by slug+lang, rendering `RegionHero` + sections + `JsonLd` + `AffiliateDisclosure` + composites
- [ ] Velite collection `regions` already exists (Phase 1.6 final); confirm frontmatter shape supports Jerusalem's required fields (slug, lang, title, description, heroImage, primaryKeyword, secondaryKeywords[], sections[])
- [ ] Image sourcing workflow: ≥6 Jerusalem photos in `public/images/regions/jerusalem/{hero,old-city,western-wall,holy-sepulchre,mahane-yehuda,city-of-david}.{jpg|webp|avif}` + entries in `data/photo-credits.json` (each restricted-site image with `restrictedSiteAcknowledgment` populated)

### For Plan 2.2 (Wave 0)

- [ ] `pnpm qa:hebrew-content` script — checks ktiv maleh consistency, religious-naming paired-on-first-reference in HE, optional morphological keyword coverage check
- [ ] `pnpm qa:pilot-checkpoint` script — implements the 3-criteria check from CONTEXT.md §Pilot-switch checkpoint; writes `data/pilot-checkpoint.md`; exit 0 (pass) or 1 (switch)

### For Plan 2.3 (Wave 0)

- [ ] `app/[locale]/[region]/[subdest]/page.tsx` — sub-destination route renderer

### For Plan 2.4 (Wave 0)

- [ ] `app/[locale]/itineraries/[slug]/page.tsx` — itinerary route renderer
- [ ] Velite `itineraries` collection added if not present (Phase 1.6 may have stubbed; verify)
- [ ] Decision: use existing `GUIDE_OR_WINERY` profile or add new `ITINERARY` profile to plan 07's profile set. Research recommends start with GUIDE_OR_WINERY; promote to its own profile only if scoring misleads.

### For Plan 2.5 (Wave 0)

- [ ] `app/[locale]/{about,contact,privacy,affiliate-disclosure,accessibility-statement}/page.tsx` — 5 legal page route renderers
- [ ] Velite `legal` collection finalized for these 5 page types
- [ ] **Pre-commit hook augmented** to reject `__REQUIRES_USER_INPUT__` placeholder in accessibility frontmatter (catch IS 5568 statutory exposure before merge)
- [ ] **HE accessibility statement slug:** test `/הצהרת-נגישות` actually routes; if fragile, ship `/he/accessibility-statement` (CONTEXT.md authorizes the fallback)

### For Plan 2.6 (Wave 0)

- [ ] Flip Quality Gate generator OUT of `phase1StructuralOnly` mode — content-aware gate now active
- [ ] Manual SERP review checklist for top 5 Jerusalem keywords (compensating control for proxied R3 data) — documented in `data/manual-serp-review-2026-05-11.md` or similar
- [ ] `pnpm qa:quality-gate` evaluates all 10 criteria, writes pass/failure report

If after Wave 0 of any sub-phase the dynamic route + Velite collection isn't operational, that sub-phase's content tasks halt — fix infra first.

---

## Manual-Only Verifications

| Behavior                                            | Requirement                                       | Why Manual                                                                                                                                                              | Test Instructions                                                                                                                                                                                                                                                                               |
| --------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hebrew typography renders correctly in real browser | CNT-02, I18N-04                                   | Vitest jsdom can verify HTML structure but not actual font rendering / kerning / RTL layout glitches                                                                    | Open `/jerusalem/` in Chrome + Firefox + Safari (or BrowserStack); verify no overflow, mixed-direction artifacts, font fallback to Heebo/Assistant/Frank Ruhl Libre                                                                                                                             |
| Manual SERP review for top 5 Jerusalem keywords     | SEO-04 (compensating control for proxied R3 data) | No paid Ahrefs/DataForSEO — human inspection of top-10 Google SERPs required                                                                                            | For each of: "things to do in Jerusalem", "Jerusalem itinerary", "Jerusalem hotels", "Jerusalem tours", "best time to visit Jerusalem" — inspect Google.com top-10, confirm our H-tag structure aligns with searcher intent. Document in `data/manual-serp-review-{date}.md`                    |
| Image sourcing approval for restricted sites        | IMG-05                                            | Restricted-site images (Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í Gardens) require human verification of CC license + restrictedSiteAcknowledgment content | For each restricted-site image: confirm Wikimedia source page shows correct CC-BY/CC-BY-SA license; verify `restrictedSiteAcknowledgment` text references the actual permit/exemption (e.g., "Pre-1948 IGPO archive, public domain"); spot-check via `getCredit(src)` returns expected metadata |
| Hebrew translation linguistic quality review        | CNT-02                                            | `hebrew-content-writer` skill catches register + grammar but native-speaker review catches naturalness                                                                  | Optional: native Hebrew speaker reviews `/jerusalem/` HE content for natural phrasing, idiom accuracy, religious-site naming sensitivity. If unavailable, accept skill-driven output as v1 quality; revisit if user feedback or rankings indicate.                                              |
| Lighthouse actual gate execution                    | AUD-03 (Phase 1) re-verified in 2.6 context       | Requires Chrome + running Next.js server                                                                                                                                | `pnpm build && pnpm start` in one shell; `pnpm lhci autorun` in another — verify 3-run median per page meets thresholds (perf ≥0.90, a11y ≥0.95, best-practices ≥0.95, SEO 1.00). Captured in `data/lighthouse-results.json`.                                                                   |
| Pilot-switch checkpoint verdict review              | CNT-03                                            | If `qa:pilot-checkpoint` writes SWITCH, the user must decide: switch-to-Tel-Aviv or override-with-acknowledged-risk                                                     | If `data/pilot-checkpoint.md` shows `verdict: SWITCH`, executor halts. User reads the rationale (which criterion failed and why) and decides. Override allowed only if compensating mitigation documented.                                                                                      |
| Accessibility coordinator data validation           | A11Y-04                                           | Real coordinator name/phone/email cannot be auto-generated                                                                                                              | User provides values; executor populates frontmatter; pre-commit hook + Vitest format test verify shape; manual verification of `mailto:` and `tel:` links actually work                                                                                                                        |

---

## Validation Sign-Off

- [x] All tasks have automated verify OR Wave 0 dependencies OR documented manual verification (7 manual items above are explicit exceptions justified by content/legal/browser-rendering nature)
- [x] Sampling continuity: each sub-phase has at least 1 automated verify per task; no 3 consecutive tasks without automated coverage
- [x] Wave 0 covers all missing references (route renderers, qa scripts for hebrew-content + pilot-checkpoint, profile decision)
- [x] No watch-mode flags (`pnpm test --run` not `pnpm test` default-watch)
- [x] Feedback latency < 90s (full pre-commit gate); ≤5min for pre-deploy Lighthouse gate
- [ ] `nyquist_compliant: true` set in frontmatter — flip after plans written and per-task map filled

**Approval:** pending — flip `nyquist_compliant: true` after `gsd-plan-checker` confirms all 13 req IDs have working verification commands across their PLAN.md files.
