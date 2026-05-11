---
status: ACTIVE
created: 2026-05-11
purpose: Enumerate every v1-deferred item with rationale + reactivation trigger + estimated effort + priority
review_cadence: quarterly OR when reactivation trigger fires
phase: 06-production-deploy-m6
plan: 01
sources:
  - .planning/PROJECT.md (Key Decisions + Out of Scope)
  - .planning/ROADMAP.md (Phase 6 success criterion #5)
  - .planning/research/SUMMARY.md (§3 Conflicts, §6 Gap list, §7 Confidence Map)
  - .planning/phases/02-pilot-region-jerusalem-m2/06-quality-gate-SUMMARY.md (editorial polish sweep)
  - .planning/phases/02-pilot-region-jerusalem-m2/deferred-items.md
  - .planning/phases/05-legal-launch-prep-m5/01-launch-readiness-audit-SUMMARY.md
  - .planning/phases/05-legal-launch-prep-m5/02-pre-deploy-handoff-SUMMARY.md
  - data/long-tail-backlog.md (Phase 4 deferral artifact)
  - data/long-tail-trigger.md (R3-data reactivation handoff)
  - data/serp-review.md (8 keywords DEFERRED — post-launch human-review SLA)
  - data/negev-images.md (Phase 6 commission gate; $1,500-$3,000 budget)
  - data/haifa-bahai-policy.md (press@bahai.org commission gate)
  - data/affiliate-availability.json (Klook + GoCity stubs)
  - data/pre-deploy-checklist.md (Phase 5 Plan 02 operator handoff)
---

# Post-Launch Backlog — Visit Israel v1.0

> **Scope:** Every workstream that v1.0 consciously deferred. Each entry has 6 structured fields (Source + Rationale + Reactivation trigger + Estimated effort + Priority + Dependencies) so a future planning cycle (`/gsd:plan-phase 6 --gaps` or a manual triage session) can pick the next batch without re-reading 232KB of research.
>
> **What this is NOT:** a bug tracker. Bugs go to GitHub Issues / Linear. This file enumerates _planned deferrals_ — items the project consciously moved out of v1 scope, not items that broke.

---

## Reactivation Convention

Every entry below declares a **reactivation_trigger** — an observable event after which the item is worth doing. Triggers are written in the form _"when X happens"_ where X is verifiable from project state (a data artifact landed, a partner approval arrived, a traffic threshold crossed, a calendar date passed). The quarterly grooming session walks this list, evaluates each trigger against current state, and promotes triggered items to the live tracker.

**Effort scale:**

- **S** = small (≤1 day single-author)
- **M** = medium (1-5 days; may involve coordination)
- **L** = large (1+ weeks; usually involves external dependencies, design work, or multi-plan workstream)

**Priority scale:** high / medium / low — for product backlog grooming. Priority is a v1-grooming snapshot; quarterly grooming re-evaluates against observed launch data.

---

## Locale Expansion

## FR locale activation

- **Source:** PROJECT.md "Key Decisions" — language strategy deferred to R6; research/SUMMARY.md §3 Conflict A resolution (filesystem ready, `i18n-config.ts` registers only `he` + `en` at launch).
- **Rationale:** Architecture wired `next-intl` for 3 locales (he/en/fr) so adding FR is a content task, not a refactor — but registering hreflang for an unbuilt locale violates AUD-032 and confuses Google's locale detection. Decision: scaffold the filesystem, defer the content + registration to v2.
- **Reactivation trigger:** When inbound FR-speaking pilgrimage / Catholic-tourism traffic exceeds ~5% of organic sessions OR a partner explicitly requests FR coverage for Jerusalem + Bethlehem religious-tourism funnel.
- **Estimated effort:** L — translating ~30 content pages (region canonicals + key sub-destinations + legal) via `hebrew-content-writer`-style FR-author skill + adding `fr` to `i18n-config.ts` + adding FR sitemap + hreflang entries + smoke-testing schema `inLanguage` field across every page.
- **Priority:** medium — pilgrimage audience is real (Jerusalem + Bethlehem + Nazareth + Sea of Galilee) but EN already serves the FR-speaking decision-maker minority; gain is incremental.
- **Dependencies:** none (architecture ready); soft dependency on having an FR copywriter or `find-skills` invocation for FR content skill.

## Hebrew slug aliases for top regions

- **Source:** PROJECT.md Key Decisions (URL structure section: "English slugs in both locales at launch; defer transliterated Hebrew slugs to v2"); research/SUMMARY.md §1 decision 4; ROADMAP Phase 6 success criterion #5.
- **Rationale:** EN slugs in both locales at launch is the simplest URL contract — no transliteration disagreement (is it `yerushalayim` or `yerushalaim`?), no redirect map maintenance, no canonical-cross-locale risk. Hebrew slugs are a v2 SEO optimization for native-Hebrew organic queries that include the slug verbatim (`/jerusalem` vs `/ירושלים`).
- **Reactivation trigger:** When ≥3 months of Search Console data shows >1000 Hebrew-language queries / month landing on `/jerusalem/` or `/tel-aviv/` AND post-click engagement (scroll depth / affiliate CTR) is materially lower than EN traffic — suggesting Hebrew users find the EN slug a friction.
- **Estimated effort:** M — adopt slug-alias pattern (Velite frontmatter + `middleware.ts` 301 redirect map), translate slugs for 11 regions + top 20 sub-destinations, update hreflang generator to handle slug-asymmetry across locales, write reciprocal-canonical assertions.
- **Priority:** medium — affects HE organic rankings for region-level queries; v1 ships HE _content_ at root URLs, just not HE _slugs_.
- **Dependencies:** depends on having Search Console data accumulated post-launch (gates the trigger evaluation).

## RU locale

- **Source:** PROJECT.md PITFALLS §10.2 (Russian for post-Soviet diaspora was floated in R6 research); research/SUMMARY.md §4 R6 line ("RU defer — re-evaluate at Phase 3").
- **Rationale:** Russian was raised as a possible third locale due to Israel's ~1.2M Russian-speaking population — but the inbound _tourism_ traffic in Russian is uncertain (most Russian-speaking Israelis travel domestically; the Russian _diaspora_ tourism to Israel is a smaller segment than the post-Soviet aliyah cohort). R6 confidence MEDIUM-HIGH but not strong enough to justify launch-scope inclusion.
- **Reactivation trigger:** Inbound RU-speaking organic sessions exceed 2-3% AND post-Soviet diaspora travel-spend recovers from 2022-2024 geopolitical disruption (signal: Russian outbound tourism statistics from independent sources like UNWTO).
- **Estimated effort:** L — same scope as FR locale activation (~30 pages + i18n-config + sitemap + hreflang), plus RU-specific glossary work for religious-site naming (Russian-Orthodox tradition has its own toponyms for some sites — e.g., "Стена плача" for Western Wall).
- **Priority:** low — defer until clear demand signal.
- **Dependencies:** post-launch Search Console + analytics for traffic mix; geopolitical stability indicator (tourism-spend recovery).

---

## Affiliate Inventory

## Klook Israel activation

- **Source:** Conflict D resolution in research/SUMMARY.md §3; data/affiliate-availability.json (Klook entry: `availability: "absent"`); STACK §3.1; data/env-vars-template.md (`NEXT_PUBLIC_KLOOK_AID` marked STUB - DO NOT populate for v1).
- **Rationale:** Klook is a leading Asia-Pacific activity marketplace but its Israel SKU breadth is currently thin (~10-30 SKUs vs Civitatis 50+, Viator 50+, GetYourGuide 50+). Helper is scaffolded as a stub (`klookLink` throws `NoIsraelInventoryError`) so activation is a one-flag toggle when SKU count crosses a usable threshold.
- **Reactivation trigger:** Klook Israel SKU breadth exceeds ~40 products (manual check on klook.com/israel each quarter) OR Klook publishes an Israel destination press release.
- **Estimated effort:** S — flip `data/affiliate-availability.json` `klook.availability: "absent" -> "active"`, remove the stub throw in `lib/affiliate/klook.ts`, ship AID env var to Vercel, add Klook AffiliateCards to relevant region canonicals.
- **Priority:** low — current 9 active partners cover the inventory gaps Klook would fill (Civitatis/Viator/GetYourGuide overlap heavily with Klook's tour-and-activity inventory in Israel).
- **Dependencies:** Klook expanding Israel inventory (external; not actionable from inside the project).

## GoCity Israel destination launch

- **Source:** Conflict D resolution in research/SUMMARY.md §3; data/affiliate-availability.json (GoCity entry: `availability: "absent"`); STACK §3.1.
- **Rationale:** GoCity (formerly The Leisure Pass Group) operates multi-attraction city passes (London Pass, New York Pass, etc.). At v1 planning time GoCity had no Israel destination. Like Klook, helper is scaffolded as a stub so activation is one-flag when GoCity launches an Israel pass.
- **Reactivation trigger:** GoCity launches an Israel city pass product (signal: gocity.com/cities lists "Tel Aviv" or "Jerusalem"; press release; affiliate-program email announcement).
- **Estimated effort:** S — same shape as Klook activation (flip availability JSON, remove stub, ship AID, add cards).
- **Priority:** low — city-pass model is high-conversion for short-stay tourists (3-5 days) but addressable via existing per-attraction Civitatis / Viator inventory until pass exists.
- **Dependencies:** GoCity launching Israel destination (external).

## Skyscanner 5K visitors/mo threshold

- **Source:** data/pre-deploy-checklist.md Step 6; data/env-vars-template.md (Skyscanner section); STACK §3 + research/SUMMARY.md §1 decision 6.
- **Rationale:** Skyscanner affiliate program requires 5,000 visitors/month proven traffic before AID-tier approval. Helper is wired with graceful fallback (returns public URL when AID absent) AND Travelpayouts is registered as a 12th availability entry (AFF-08 aggregator marker) to provide a fallback flight-search affiliate path until Skyscanner direct activates.
- **Reactivation trigger:** When Plausible analytics confirms 5,000+ monthly visitors for two consecutive months — submit Skyscanner application; their team reviews within 1-2 weeks.
- **Estimated effort:** S — submit Skyscanner application, populate `NEXT_PUBLIC_SKYSCANNER_AID` env var when approved, no code change required.
- **Priority:** medium — flight-search is a top-of-funnel revenue lever; closing this gap unlocks the first-touch commission rather than ceding it to whichever aggregator the user lands on.
- **Dependencies:** post-launch traffic accumulation.

## Quarterly affiliate-availability re-evaluation

- **Source:** research/SUMMARY.md §6 Gap #5 (quarterly check Klook + GoCity); data/affiliate-availability.json convention; this backlog (Klook + GoCity entries above).
- **Rationale:** Affiliate-program availability shifts quietly — partners launch destinations without press releases, restructure programs, get acquired. A scheduled review prevents the project from missing activation moments.
- **Reactivation trigger:** Quarterly calendar fires (Q1 / Q2 / Q3 / Q4 first week) — operator runs through Klook + GoCity + Skyscanner threshold + any other "absent" entries in `data/affiliate-availability.json`.
- **Estimated effort:** S — 30-60 minutes per quarter: visit each partner's affiliate-program page, check Israel inventory, update availability JSON if status changed, file activation issues if applicable.
- **Priority:** medium — low-cost insurance against missing opportunities.
- **Dependencies:** none (operational cadence).

---

## Content Backlog

## Long-tail sub-destination substantive execution

- **Source:** data/long-tail-backlog.md (53 proxied candidates across 11 regions, status: DEFERRED-AWAITING-R3-VALIDATION); data/long-tail-trigger.md (operator handoff with `/gsd:plan-phase 4 --gaps` re-entry command); ROADMAP Phase 4 success criteria.
- **Rationale:** Phase 4 closed minimal-deferral: backlog and trigger artifacts shipped; NO MDX authored. Argentina lesson #9 explicitly precludes substantive long-tail authoring against proxied composites (~70% wrong-intent ranking risk within 3 months). Reactivation gated on R3 keyword purchase ($50 DataForSEO default, $129 Ahrefs Lite alternative).
- **Reactivation trigger:** R3 keyword data lands in `data/keyword-data.json` (or equivalent vendor export) — operator runs `/gsd:plan-phase 4 --gaps` to re-rank candidates by validated `volume × difficulty^-1` and select N=⌈existing_subdest × 0.5⌉ for v1.x execution.
- **Estimated effort:** L — purchase keyword data ($50-$129), re-rank backlog, author ~50 long-tail sub-destinations (EN + HE pair) at audit ≥80 each. Multi-week workstream.
- **Priority:** high — long-tail is the structural completion of the "compete on SEO" core value (PROJECT.md). v1 canonicals capture head-of-funnel; long-tail captures the long-tail volume that compounds over time.
- **Dependencies:** R3 keyword purchase ($50-$129); see data/long-tail-trigger.md for vendor decision rationale.

## Phase 2 editorial polish backlog

- **Source:** Phase 2.6 quality-gate SUMMARY "Editorial polish sweep on Phase 2 deferred-items.md" recommendation; .planning/phases/02-pilot-region-jerusalem-m2/deferred-items.md.
- **Rationale:** Non-gate-failing editorial drift surfaced during Phase 2 QA that did not warrant blocking the Quality Gate but should be cleaned up. Items: about/en Wailing Wall + Judea & Samaria descriptive references (AUD-017+018 hits in descriptive context where the regex is technically correct but the editorial intent is to document rather than use the biased name); accessibility-statement/he `<bdo>`-wrap on `WCAG 2.1 AA` (AUD-024 RTL acronym wrap); 3 Jerusalem sub-destinations missing `<Price>` wrappers on entry-fee strings (AUD-022 partial).
- **Reactivation trigger:** Next time a documentation-sweep plan runs OR before v1.1 marketing push — whichever comes first; alternatively roll into the first Phase 3.x re-plan that touches editorial style guide.
- **Estimated effort:** S — single-session editorial pass; <30 minutes per item, ~10 items total.
- **Priority:** low — every item is sub-gate-threshold; non-blocking.
- **Dependencies:** none.

## Manual SERP review (Phase 2.6 compensating control)

- **Source:** data/serp-review.md (8 keywords DEFERRED with per-keyword confidence proxy); Phase 02 CONTEXT.md proxied-R3 strategy lock; Phase 2.6 SUMMARY post-launch human-review SLA.
- **Rationale:** Phase 02 CONTEXT locked proxied R3 keyword data + manual SERP review as the compensating control. The manual review is structurally a human-eyes task (SERP is JS-rendered, captcha-gated, locale-personalisation-sensitive) so the autonomous Phase 2.6 executor deferred all 8 keywords to a post-launch human-review session.
- **Reactivation trigger:** Within 2 weeks of v1.0 launch — operator sets aside a 60-minute block, opens data/manual-serp-review-checklist.md, runs through each of 8 keywords (5 EN + 3 HE) on incognito google.com, fills entity-coverage table, sets PASS / REWORK verdict.
- **Estimated effort:** S — 60-minute review block + ~30-90 minutes per REWORK item if any surface.
- **Priority:** high — within-2-weeks SLA is structural to the proxied-R3 strategy.
- **Dependencies:** v1.0 live (so SERPs reflect post-launch state, not pre-launch staging).

## Bethlehem long-tail (deferred to v2)

- **Source:** data/long-tail-backlog.md notes; Phase 4 Plan 01 decision in STATE.md.
- **Rationale:** 2 Bethlehem long-tail candidates surfaced in the Phase 4 backlog (Shepherds Field, Manger Square Christmas season). Editorial sensitivity (West Bank administrative status + religious-tourism framing) requires more review depth than v1 mitigation budget allows. `/gsd:plan-phase 4 --gaps` in v1 must explicitly NOT pick these up.
- **Reactivation trigger:** Bethlehem-region canonical's first-year revenue + traffic data confirms editorial framing approach is durable AND post-launch grooming explicitly elevates these candidates.
- **Estimated effort:** M — 2 EN + 2 HE pages with extra editorial review cycle for administrative-status framing.
- **Priority:** low — editorial sensitivity cost > expected revenue lift in v1 timeframe.
- **Dependencies:** Bethlehem canonical post-launch performance data.

---

## Image Commission (Real Photography)

## Negev professional photography

- **Source:** data/negev-images.md (Phase 3 plan 05 image-gap canary documentation); ROADMAP Phase 3 success criterion #5; CONTEXT.md / PITFALLS §5.2 Wikimedia coverage estimate.
- **Rationale:** Negev's Wikimedia coverage is 40-50% (image-gap canary) vs Jerusalem 80-90%. Phase 3 accepted thinner 3-4 photo gallery with Sharp-generated placeholders anchored to real Wikimedia/IGPO sourceUrls. Real-photo commission is a Phase 6 / v1.1 workstream when revenue justifies the spend.
- **Reactivation trigger:** Negev region canonical generates ≥$X/month in affiliate revenue (operator-defined threshold; suggested $200-500/mo as the inflection point) OR strategic decision to deepen Negev coverage for desert-tourism / Bedouin-hospitality / Mitzpe Ramon stargazing audiences.
- **Estimated effort:** L — budget $1,500-$3,000 USD photography commission (~5-8 subjects at 1600-2400px), 4-6 weeks photographer coordination, photo-credits ledger updates, image-replace pass swapping placeholders for real binaries (dimensions already documented so swap is lossless).
- **Priority:** medium — image quality is a visible-to-user quality signal; placeholders are functional but not aspirational.
- **Dependencies:** budget approval; photographer selection; Bedouin-hospitality scenes require respectful-coverage briefing.

## Bahá'í Gardens commissioned imagery

- **Source:** data/haifa-bahai-policy.md (Phase 6 commissioning gate with 4-step process); research/SUMMARY.md §6 Gap #3; ROADMAP Phase 3 success criterion #5.
- **Rationale:** Bahá'í International Community photo policy restricts commercial commissioning to press@bahai.org written-permission cases. v1 ships Wikimedia-only (CC-BY / CC-BY-SA architectural/garden public-terrace shots, ~65-75% subject coverage). Commercial commissioning requires 4-6 week BIC response cycle + commission cost + photographer cultural-context briefing — deferred to Phase 6 / v1.1.
- **Reactivation trigger:** Haifa region canonical generates ≥$X/month in affiliate revenue (threshold-driven) AND strategic decision to deepen Bahá'í Gardens / Haifa coverage for UNESCO-pilgrimage audience.
- **Estimated effort:** L — draft outreach email per data/haifa-bahai-policy.md "Phase 6 Commissioning Gate" 4-step process, await BIC response (4-6 weeks), commission shoot if approved, photographer cultural-context briefing, photo-credits ledger updates with new `restrictedSiteAcknowledgment` per shot.
- **Priority:** medium — same shape as Negev commission.
- **Dependencies:** press@bahai.org written permission; photographer selection; budget approval.

## Region-by-region binary image swap

- **Source:** Phase 3 STATE.md notes; data/negev-images.md "Sharp-generated placeholder JPEGs at documented dimensions with REAL Wikimedia/IGPO URLs in ledger" pattern.
- **Rationale:** Phase 2 + 3 shipped with Sharp-generated placeholder JPEGs at documented dimensions, each anchored to a real Wikimedia/IGPO sourceUrl in `data/photo-credits.json`. The swap from placeholder to real binary is lossless at the page-render layer (dimensions identical) but requires downloading the real files, optimizing, and updating ledger checksums.
- **Reactivation trigger:** Per region — when image-replace work is bundled into a Phase 6 quality-uplift pass OR when operator decides to enrich a specific high-performing region. Could also be event-driven (e.g., when commissioned photography for Negev / Bahá'í lands and the operator does a "while we're at it" sweep).
- **Estimated effort:** M — ~2-4 hours per region (download from Wikimedia / IGPO, run through `next/image` pipeline, update blurDataURL + width + height fields in ledger, smoke-test).
- **Priority:** low — placeholders are functional; the swap is a polish task that compounds quality over time but isn't a launch-blocker.
- **Dependencies:** none structurally; opportunistically batched with commissioned-photography landing events.

---

## Feature Backlog (v2+)

## User accounts (login + saved itineraries)

- **Source:** PROJECT.md "Out of Scope" — `User accounts / saved trips — affiliate model doesn't require accounts; adds GDPR scope`; PROJECT.md "Key Decisions" implicit (no OAuth, no auth needed).
- **Rationale:** Affiliate model doesn't require user state — every conversion path is anonymous-friendly. Adding accounts pulls in GDPR + IL Privacy Protection Law data-controller obligations, password storage liability, OAuth surface area, account-recovery flows. Cost-benefit unfavorable for v1.
- **Reactivation trigger:** v1.0 + v1.1 launch data shows ≥20% of repeat visitors return >3 times within 90 days (signal: cookie-less Plausible analytics — return-visitor estimation via direct-traffic share) AND user-research surfaces a clear unmet need (e.g., "I want to save my Jerusalem itinerary for offline access").
- **Estimated effort:** L — auth provider selection (NextAuth.js / Auth.js / Clerk / Supabase), session management, GDPR compliance (consent, data export, deletion), saved-itinerary data model, account-recovery flow, password reset email pipeline, ≥4 weeks.
- **Priority:** low — large scope, unclear demand signal in v1 affiliate model.
- **Dependencies:** legal review (GDPR + IL Privacy law); analytics platform supporting return-visitor measurement.

## AI-generated travel itineraries

- **Source:** PROJECT.md "Out of Scope" — `AI-generated travel itineraries — quality risk, defer until v2 with curation layer`.
- **Rationale:** AI itineraries are tempting but high-risk: hallucinated attractions, outdated hours, incorrect Shabbat closures, biased religious-site framing. Quality control would require a human-curation layer that swallows the cost savings. Out-of-scope until LLM-as-tool patterns mature AND quality-floor is enforceable.
- **Reactivation trigger:** User accounts ship (dependency); user-research surfaces "I want a personalized itinerary based on my interests and dates" as top unmet need; LLM tooling matures (project-specific RAG over our own Velite content + structured data + Shabbat-awareness) AND quality-floor patterns are auditable.
- **Estimated effort:** L — RAG architecture (vector DB + embedding pipeline over content/), LLM provider integration, prompt engineering for Shabbat-awareness + religious-naming-policy, human-curation review queue, ~6-8 weeks.
- **Priority:** low — large scope, high quality risk, blocked on user accounts.
- **Dependencies:** user accounts; LLM budget; quality-control pattern + human review capacity.

## Real-time ShabbatNotice widget

- **Source:** PROJECT.md (`<ShabbatNotice>` listed as STATIC in Phase 1.3 component spec); research/SUMMARY.md §2 Convergence #13 (Hebcal API integration); ROADMAP Phase 6 success criterion #5 (real-time ShabbatNotice widget enumerated as v2 candidate).
- **Rationale:** v1 ships ShabbatNotice as a STATIC component — regions with hours data display a generic "Shabbat closures apply Friday afternoon to Saturday evening" callout. Real-time integration with Hebcal API (`hebcal.com/shabbat/?cfg=json&geonameid=`) would show next-Shabbat exact start/end times per region geolocation. Adds runtime API dependency + caching strategy + locale-aware time formatting.
- **Reactivation trigger:** Static notice user-research signals confusion or low utility ("I don't know when Shabbat actually starts this week") OR a region operator explicitly requests dynamic times for booking-aware copy.
- **Estimated effort:** M — Hebcal API integration + Vercel KV cache + per-region geonameid lookup table + locale-aware time formatting (HE = 24-hour Israel time; EN = local or 12-hour depending on visitor settings) + fallback when API unavailable + tests.
- **Priority:** medium — Shabbat awareness is a project differentiator (research §2 Convergence #13); dynamic strengthens it.
- **Dependencies:** Hebcal API uptime + ToS review; Vercel KV provisioning (or alternative cache layer).

## Reg-35 a11y preferences widget

- **Source:** PROJECT.md ("Reg-35 preferences widget (consider, not required)"); A11Y-08 statutory-hint requirement; ROADMAP Phase 6 success criterion #5.
- **Rationale:** Israeli accessibility regulations Reg-35 contemplate (but do not require) a user-controlled accessibility preferences widget — font-size scaling, contrast modes, reduced motion, screen-reader optimization mode. v1 ships with the statutory-mandated Hatzaharat Negishut accessibility statement + named coordinator + 0 AUD-027/028 violations across 200 pages, satisfying IS 5568 statutory bar. The preferences widget is a "consider" item — explicit v2 candidate when audience signals justify the UX cost.
- **Reactivation trigger:** Accessibility coordinator (Sebastian Levin) receives ≥3 user requests for preference controls within 12 months post-launch OR Israeli regulatory landscape shifts toward Reg-35 widget being required (regulatory monitoring).
- **Estimated effort:** M — design + implement preferences UI (font-size buttons, contrast toggle, reduced-motion toggle), persist via localStorage (no account dependency), CSS variable wiring for runtime adjustment, RTL parity (HE), test matrix.
- **Priority:** low — statutory bar is met; widget is "consider" not "require".
- **Dependencies:** none structural; demand-signal-driven.

## Editorial blog content

- **Source:** PROJECT.md "Out of Scope" — `Editorial blog content — only if SEO R3 detects competitive gaps; otherwise affiliates carry the funnel`.
- **Rationale:** v1 strategy is "affiliates carry the funnel" — region canonicals + sub-destinations + itineraries are the SEO+monetization unit. Editorial blog content (think "10 things to know before visiting Jerusalem in summer") is a separate content-type with separate quality bar and separate maintenance burden. Out-of-scope unless R3 explicitly surfaces competitive gaps.
- **Reactivation trigger:** R3 keyword data (when purchased) surfaces high-volume informational-intent keywords NOT addressable by canonical / sub-destination / itinerary content types — e.g., "is it safe to travel to Israel in 2026" (a perennial high-volume query that doesn't fit a destination page).
- **Estimated effort:** L — editorial style guide for blog content type, Velite collection extension, MDX template, NER + audit-rule extensions for blog-specific patterns, ~10-20 initial posts.
- **Priority:** low — affiliates carry the funnel in v1; revisit when R3 data lands.
- **Dependencies:** R3 keyword purchase (same as long-tail substantive execution).

---

## Operational Ongoing

## Affiliate health monitor weekly (Vercel Cron)

- **Source:** ROADMAP Phase 6 success criterion #4 (affiliate health monitor cron); data/pre-deploy-checklist.md Step 9 (deferred-by-design to Phase 6 plan 02); Phase 5 Plan 02 SUMMARY.
- **Rationale:** Weekly HEAD-check across all 9 helper-emitted URL patterns surfaces partner-side breakage early (URL pattern changes, AID format changes, geo-blocking). Vercel Cron Jobs is the canonical mechanism — Step 9 of pre-deploy-checklist is deferred-by-design because the vercel.json cron block + route handler are Phase 6 plan 02 work.
- **Reactivation trigger:** Phase 6 plan 02 ships (vercel.json cron block + `app/api/cron/affiliate-health/route.ts`); operator toggles cron in Vercel dashboard post-deploy.
- **Estimated effort:** S — cron toggle in Vercel dashboard + first-run verification + alert routing decision (email / Slack / Linear / etc).
- **Priority:** high — early warning is structurally cheap; loss of monetization from broken helpers compounds quickly.
- **Dependencies:** Phase 6 plan 02 code surface.

## Lighthouse CI history retention

- **Source:** ROADMAP Phase 6 success criterion #3; data/pre-deploy-checklist.md Step 10 (marked optional — default temporary-public-storage is fine for per-PR diffs + 7-day retention); data/env-vars-template.md `LHCI_TOKEN` + `LHCI_SERVER` server-only vars.
- **Rationale:** `.github/workflows/lighthouse.yml` runs `treosh/lighthouse-ci-action@v12` on every push/PR; default storage is temporary-public-storage with 7-day retention — sufficient for per-PR diff comments. Self-hosted LHCI Server provides 90-day historical trend analysis — marked optional because the upgrade path is "stand up another service" which has ops cost.
- **Reactivation trigger:** Operator decision that 90-day historical trends are needed for regression-hunting or executive reporting OR Lighthouse CI history references appear in `data/m6-completion-report.md` as a gap.
- **Estimated effort:** M — provision LHCI Server (self-hosted on small VPS or managed service), populate `LHCI_TOKEN` + `LHCI_SERVER` env vars in Vercel, update `.lighthouserc.cjs` upload target.
- **Priority:** low — per-PR diffs cover regression-on-merge; historical trends are nice-to-have.
- **Dependencies:** Vercel Pro provisioned (Step 1); LHCI Server hosting decision.

## Quarterly R3 keyword data refresh (Ahrefs / DataForSEO)

- **Source:** research/SUMMARY.md §4 Confidence Map ("R3 keyword volumes — MEDIUM-LOW — buy ~1 month Ahrefs ($129) or DataForSEO API ($50) to validate"); ROADMAP Phase 4 Research flag ("Optional re-run of Ahrefs/DataForSEO on a per-region basis if keyword landscape has shifted").
- **Rationale:** Initial R3 purchase unlocks long-tail substantive execution. Subsequent quarterly refreshes track keyword-landscape drift (new events, new attractions, seasonal shifts). DataForSEO $50 one-shot is the v1 default; Ahrefs Lite $129/mo is the upgrade-cadence option for operators who want quarterly automated runs.
- **Reactivation trigger:** Quarterly calendar fires post-launch (Q1 / Q2 / Q3 / Q4); operator evaluates if keyword-landscape drift warrants $50 spend that quarter.
- **Estimated effort:** S — $50 DataForSEO purchase + export + ingest + re-rank existing long-tail-backlog.
- **Priority:** medium — ties directly to long-tail execution velocity (separate entry above).
- **Dependencies:** budget approval per quarter; operator decision on Ahrefs Lite quarterly subscription vs DataForSEO one-shot cadence.

## Klook / GoCity quarterly inventory check

- **Source:** research/SUMMARY.md §6 Gap #5 ("Klook SKU / GoCity Israel launch — Quarterly check `data/affiliate-status.json`"); see also Klook + GoCity entries in Affiliate Inventory section above.
- **Rationale:** Both stubs are quiet-by-design (no error surface unless content page tries to instantiate them); only a deliberate quarterly check surfaces activation events.
- **Reactivation trigger:** Same as "Quarterly affiliate-availability re-evaluation" entry above (consolidates Klook + GoCity into one cadence).
- **Estimated effort:** S — included in quarterly affiliate-availability re-evaluation cadence (~15 minutes per partner within that broader session).
- **Priority:** medium — same as parent quarterly cadence.
- **Dependencies:** consolidated under quarterly affiliate-availability re-evaluation.

## WCAG 2.2 upgrade pass

- **Source:** Phase 5 Plan 01 SUMMARY "DEFER items" list ("WCAG 2.2 + accessibility preferences widget + HE slug → v2 milestone").
- **Rationale:** v1 targets WCAG 2.1 AA per IS 5568 statutory requirement. WCAG 2.2 (October 2023 W3C recommendation) adds 9 new success criteria (focus appearance, dragging movements, target size, etc.). Not currently statutory in Israel but is the direction of travel for accessibility regulation.
- **Reactivation trigger:** Israeli accessibility regulation references WCAG 2.2 OR international audience grows (>20% non-IL traffic) and US/EU regulatory drift toward WCAG 2.2 raises the bar.
- **Estimated effort:** M — audit current site against WCAG 2.2 9 new criteria, remediate findings, update accessibility statement to reference WCAG 2.2 AA compliance, re-test.
- **Priority:** low — statutory bar (WCAG 2.1 AA + IS 5568) is met; this is forward-looking.
- **Dependencies:** none; regulatory-monitoring-driven.

---

## Closing — Review Cadence

**Quarterly grooming session** (suggested cadence — Q1 / Q2 / Q3 / Q4 first week):

1. Walk this file top-to-bottom; for each entry, evaluate `reactivation_trigger` against current project state (analytics data, partner status, calendar date, budget posture).
2. Promote triggered items to the active product issue tracker (TBD by operator — GitHub Issues / Linear / Jira / etc.) with priority assignment matching this file.
3. Update entries in-place when context shifts (new dependency surfaced, effort estimate refined, priority changes).
4. Add new entries when v1.x execution surfaces additional deferrals — every plan SUMMARY's "Deferred Issues" section is the input stream.

**Ad-hoc grooming** triggers:

- Any plan SUMMARY adds a "Deferred Issues" entry that meets v1.x scope criteria.
- External event fires a reactivation trigger between quarterly sessions (e.g., Klook publishes Israel destination press release in mid-quarter — promote Klook activation immediately rather than waiting for next quarterly session).

**Tracker mapping:** High-priority items in this file should mirror to product issue tracker within 1 quarter of being marked high. Low-priority items can stay in this file as planning surface only until triggered. Medium-priority items are quarterly-grooming-eligible.

---

_Last reviewed: 2026-05-11 (initial authoring at v1.0 milestone close — Phase 6 plan 01)._
_Next scheduled review: Q3 2026 (first quarterly grooming post-launch)._
