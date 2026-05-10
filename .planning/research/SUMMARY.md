# Project Research Summary — Discover Israel

**Project:** Discover Israel (visitisrael.site)
**Domain:** Tourism affiliate website, bilingual EN+HE minimum, Vercel deploy
**Researched:** 2026-05-11
**Synthesizer:** gsd-project-research-synthesizer
**Overall confidence:** HIGH on stack/architecture/pitfalls; MEDIUM on R3 keyword volumes (proxied, not Ahrefs-measured); MEDIUM-HIGH on R6 language strategy (2023 baseline solid, 2025 recovery data noisy)

This summary synthesizes the four parallel research outputs — STACK.md (45KB), FEATURES.md (45KB), ARCHITECTURE.md (51KB), PITFALLS.md (91KB) — across both GSD's 4-dimension research and the mega-prompt's 6 R-dimensions (R1 tourism, R2 competitors, R3 SEO, R4 affiliates, R5 image legality, R6 language). Its purpose is **to feed requirements + roadmap decisions** — not to recap findings. Where files independently converged, that's a HIGH-confidence input. Where they conflicted, this document flags resolution.

---

## 1. Headline Decisions

The 8 decisions the roadmap should treat as inputs, not open questions:

1. **Pilot region = Jerusalem** (composite score 9.4, all three region-aware files independently selected it). Tel Aviv (8.7) is a one-way-door fallback if editorial complexity creates Phase 2 schedule risk; checkpoint at Phase 2.2.
2. **Launch with EN + HE only; scaffold for 3 locales (he/en/fr).** Architecturally support `fr` from Phase 1.1 so adding FR later is a content task, not a refactor. **Do NOT register hreflang for unbuilt locales** (resolves the STACK/ARCH vs PITFALLS conflict — see §3).
3. **Next.js 15.5.x + App Router + TypeScript 5.6+ + Tailwind v4 + next-intl v3 + schema-dts + @lhci/cli.** No Next.js 16 until Phase 3 (avoid mid-foundation migration noise). No accessiBe/UserWay/EqualWeb overlays — FTC fined accessiBe $1M; IS 5568 statutory damages up to ₪50k/violation.
4. **URL structure: HE at root (`/jerusalem/`), EN prefixed (`/en/jerusalem/`).** English slugs in both locales at launch (defer Hebrew slug aliases to v2). No trailing slash. Self-referential canonicals, never cross-locale.
5. **Foundation before content is inviolable.** Phase 1.1–1.11 sub-phases (scaffold, design tokens, components, affiliate helpers, photo-credits ledger, schema lib, quality profiles, SEO config, audit dashboard, Lighthouse CI gate, NER detection) all complete and Quality-Gate green before any region canonical is written. This is the structural fix to Discover Argentina's 9 root causes.
6. **9 of 11 affiliate partners are verified-operational in Israel.** Booking, Civitatis, Viator, GetYourGuide, Rentalcars, SafetyWing, Skyscanner, Hostelworld, DiscoverCars — build helpers Phase 1.4. **Klook (thin Israel SKU) and GoCity (no Israel destination yet) defer to Phase 2.5/3 monitoring.**
7. **34 audit rules (AUD-001..AUD-034) are the Phase 1.9 audit dashboard spec.** AUD-001..AUD-016 = generic/Argentina-inherited; AUD-017..AUD-034 = Israel-specific (religious-site naming, Shabbat, RTL, IS 5568, image rights). The dashboard is the Quality Gate operational tool.
8. **Photo-credits ledger with CI gate is the single highest-leverage build.** Build it in Phase 1.5 before any image import. Schema includes width≥1200px, license, author, sourceUrl, and `restrictedSiteAcknowledgment` for Western Wall / Holy Sepulchre / Bahá'í photos (the R5 enrichment to the mega-prompt minimum).

---

## 2. Convergences Across Research Files

Where ≥2 files independently reached the same conclusion. These are the safest inputs to requirements.

| # | Convergence | Source files | Confidence |
|---|-------------|--------------|------------|
| 1 | **Jerusalem is the pilot.** Composite 9.4 (volume + opportunity + competitor weakness); strongest schema testing surface (`ReligiousBuilding`, contested-naming patterns); densest affiliate inventory; religious-tourism complexity is a moat. | FEATURES §9, ARCHITECTURE §4.4, PITFALLS §4.1 | **HIGH** |
| 2 | **next-intl v3 is the correct i18n library for Next.js 15 App Router.** Native RSC support, on-demand message loading, `localePrefix: 'as-needed'` enables HE-at-root + EN-at-/en/. | STACK §1.1+§2, ARCHITECTURE §2.1 | **HIGH** |
| 3 | **No accessibility overlays — ever.** FTC fined accessiBe $1M (2024); 25% of 2024 a11y lawsuits targeted overlay sites; IS 5568 statutory damages up to ₪50k/violation. Native semantic HTML + ARIA + Hatzaharat Negishut is the only defensible path. | STACK §0/§10, FEATURES §3, ARCHITECTURE §9.7, PITFALLS §3.8 | **HIGH** |
| 4 | **Affiliate helpers are the single chokepoint** for every partner URL. ESLint rule blocks raw partner URLs site-wide (covers Booking, Civitatis, Viator, GYG, Rentalcars, SafetyWing, Skyscanner, Hostelworld, Klook, GoCity, DiscoverCars). Helper returns public URL gracefully when AID absent. ≥4 Vitest tests per helper. | STACK §3.4+§7.2, FEATURES §6, ARCHITECTURE §9.5, PITFALLS §1.5+§3.10 | **HIGH** |
| 5 | **Image contract: 1200px+ minimum, srcset [320/640/1024/1600], AVIF+WebP, photo-credits ledger CI gate.** Wikimedia Commons + IGPO are the primary sources; Unsplash/Pexels reserved for abstract heroes. Religious-site `restrictedSiteAcknowledgment` field required for Western Wall / Holy Sepulchre / Bahá'í imagery. | STACK §4, FEATURES §3, ARCHITECTURE §6.3, PITFALLS §3.7+§5 | **HIGH** |
| 6 | **schema-dts + native `<script type="application/ld+json">` injection over `next-seo`.** next-seo is Pages-Router-era; App Router pattern from Next.js docs is native injection. Page-level (not layout) injection, except `Organization` schema in root layout. | STACK §6, ARCHITECTURE §4.2 | **HIGH** |
| 7 | **Lighthouse CI via @lhci/cli, 3-run-median, hard gate.** Single-sample Lighthouse lied in Argentina S11. Thresholds: perf ≥90, a11y ≥95, best-practices ≥95, SEO =100 on mobile. | STACK §5, FEATURES §4 (differentiator), ARCHITECTURE §7.2, PITFALLS §1.7+AUD-034 | **HIGH** |
| 8 | **Religious-site dual naming as editorial policy.** "Temple Mount / Haram al-Sharif" paired on first reference. Western Wall (not "Wailing Wall"). Bethlehem/Hebron/Jericho require `administrativeStatus` frontmatter. | STACK §6.5, ARCHITECTURE §4.4, PITFALLS §3.1+AUD-017..AUD-020 | **HIGH** |
| 9 | **Build-order: Foundation phases before any content.** Phase 1.1 scaffold → 1.2/1.5/1.6 parallel → 1.3 → 1.4 → 1.7/1.8 → 1.11 → 1.9 → 1.10. Sub-pages only after canonical pattern stabilizes (Argentina lesson #9). | FEATURES §6, ARCHITECTURE §8, PITFALLS §2 | **HIGH** |
| 10 | **Tailwind v4 with `@theme` 3-layer tokens + logical properties (ms-/me-/ps-/pe-/start-/end-).** Banned: physical directional utilities, raw hex codes. ESLint enforces both via `no-restricted-syntax`. | STACK §7.1+§7.3, ARCHITECTURE §5.1, PITFALLS §3.9+AUD-001+AUD-030 | **HIGH** |
| 11 | **FTC disclosure must be inline, not footer-only.** Within 1 viewport-height of FIRST affiliate link. Civil penalty up to $53,088/violation (2025 inflation adjustment). | STACK §3.3, FEATURES §3, PITFALLS §1.4+AUD-009 | **HIGH** |
| 12 | **MDX-in-repo (Velite) over headless CMS.** One-writer team, affiliate components embeddable inline, git-versioned, atomic deploys. Contentlayer is abandoned. Payload/Sanity deferred unless content team grows >3. | ARCHITECTURE §6.1, FEATURES §5 (no CMS as anti-feature) | **MEDIUM-HIGH** |
| 13 | **Shabbat awareness is a differentiator.** Hebcal API (`hebcal.com/shabbat/?cfg=json&geonameid=`) feeds `<ShabbatNotice>` component. Every region canonical with hours data must pair with a Shabbat/holiday callout (AUD-021). | FEATURES §4, ARCHITECTURE (skill-referenced), PITFALLS §3.2 | **HIGH** |

---

## 3. Conflicts to Resolve

Where files disagree. The roadmap needs an unambiguous resolution before Phase 1.1 starts.

### Conflict A — Number of locales scaffolded

| File | Position |
|---|---|
| **ARCHITECTURE §3.4** | Wire `next-intl` for 3 locales (he/en/fr) so routing, hreflang, schema, and sitemap accommodate FR from day one. |
| **PITFALLS §3.11 + AUD-032** | Phase 1.1 i18n routing scaffold supports 5 langs architecturally but only registers 2 (EN + HE) in `i18n-config.ts`. Don't add hreflang entries for langs without real pages. |

**The conflict:** ARCHITECTURE wants 3 locales wired; PITFALLS wants 2 locales registered with architectural support for more.

**Proposed resolution (RECOMMENDED for requirements):** **PITFALLS wins on `i18n-config.ts` registration; ARCHITECTURE wins on filesystem and helper readiness.**

- **Filesystem & types ready for 3 locales**: `content/fr/` directory exists empty, Velite collection allows `lang: z.enum(['he','en','fr'])`, schema/sitemap iterate the REGISTERED locales array.
- **`i18n-config.ts` registers only `he` and `en` at launch.** Single source of truth for middleware + hreflang + sitemap + language switcher.
- **Adding FR is a one-line change** + content — exactly the Argentina lesson #7 fix without violating AUD-032.

### Conflict B — Hebrew slugs in URLs

| File | Position |
|---|---|
| **ARCHITECTURE §1.3** | English slugs in BOTH locales at launch. Defer transliterated Hebrew slugs to v2. |
| **PITFALLS §3.6** | R3 keyword research must include morphological variants per term. |

**Resolution:** Not actually a conflict — different concerns. EN slugs in both locales (architectural); Hebrew morphological coverage in body content + title tags + H-tags (editorial). Both files agree implicitly via `hebrew-content-writer` skill. No action needed.

### Conflict C — Pilot region certainty

| File | Position |
|---|---|
| **FEATURES §9** | Jerusalem (9.4), but Tel Aviv fallback if Phase 2.2 checkpoint flags editorial risk. |
| **PITFALLS §4.1** | Pilot suitability STRONG — religious-tourism complexity is the moat. |

**Resolution (RECOMMENDED):** Commit to Jerusalem. Define Phase 2.2 checkpoint criteria explicitly:
- AUD-017..AUD-020 editorial style checks pass
- Photo sourcing for Old City confirmed (`restrictedSiteAcknowledgment` cleared per restricted site)
- Hebrew translation throughput estimable for 2.3 within budgeted time
- If any criterion fails → switch to Tel Aviv (only ~1 phase of work redone)
- Past Phase 2.3 (HE canonical written), switch is no longer reversible cheaply.

### Conflict D — Klook / GoCity helpers

| File | Position |
|---|---|
| **STACK §3.1** | Defer Klook (thin SKU) and GoCity (no Israel destination) helpers to Phase 2.5/3. |
| **PITFALLS §3.10** | Wire all helpers with a coverage flag; UI hides partner if `absent`. |

**Resolution (RECOMMENDED):** **Wire helpers for all 9 verified-operational partners in Phase 1.4** (Booking, Civitatis, Viator, GYG, Rentalcars, SafetyWing, Skyscanner, Hostelworld, DiscoverCars). **Klook/GoCity helpers scaffolded as stubs that throw a "no Israel inventory" error** with env-var placeholders in `.env.example` and `data/affiliate-availability.json` set to `'absent'`. Phase 2 content authors get a clean signal without the codemod cost of adding two helpers post-launch.

---

## 4. Confidence Map

| Decision area | Confidence | Risk if wrong |
|---|---|---|
| Stack choice (Next.js 15.5 / Tailwind v4 / next-intl v3 / schema-dts / @lhci/cli) | **HIGH** | Low — proven stack at this scale. |
| URL structure (HE at root, EN prefixed, EN slugs) | **HIGH** | Low. |
| 9-partner affiliate matrix operational | **HIGH** | Low; AID parameters partner-controlled. |
| Klook + GoCity status | **MEDIUM** | Stub-and-monitor mitigates. |
| 12-region taxonomy + Jerusalem pilot | **HIGH** | Low. |
| **R3 keyword volumes (absolute)** | **MEDIUM-LOW** | **Action: BEFORE Phase 2.1, buy ~1 month Ahrefs ($129) or DataForSEO API ($50) to validate.** |
| R5 image legality (Wikimedia + IGPO + religious permits) | **HIGH** | Low. |
| R6 language strategy (EN+HE launch; FR scaffold; RU defer) | **MEDIUM-HIGH** | Re-evaluate at Phase 3. |
| 34 audit rules | **HIGH** | Low. |
| Lighthouse ≥90 mobile achievable | **HIGH** | Low. |
| Velite + MDX over Payload/Sanity | **MEDIUM-HIGH** | Migrating is bounded work if content team scales. |
| Build-order dependency graph | **HIGH** | Low. |

**Overall: HIGH.** Biggest residual is R3 — bounded $50–$200 mitigation.

---

## 5. Pilot Region Recommendation (Consolidated)

**Jerusalem.** Composite score 9.4/10.

### 4 compounding reasons

1. **Volume.** #1 international destination; ~60% of inbound tourists. Highest search volume for "things to do in [city] Israel" by 2x+. Owning Jerusalem = owning the headline organic query for Israel tourism.

2. **Opportunity.** Densest affiliate inventory: every hotel chain, Civitatis/Viator/GYG each 50+ products; highest tour AOV (pilgrimage packages). All 9 verified affiliates operate.

3. **Competitor weakness.** iTravelJerusalem is institutional design, no IS 5568, dated UX, Jerusalem-only. Lonely Planet/Frommer's are slow to update and weak on transactional widgets. **No peer offers native Hebrew + IS 5568 + 2026-quality Lighthouse perf.** Our differentiator stack exactly matches Jerusalem's competitive gap.

4. **Religious-tourism complexity is a feature, not a bug.** Jerusalem is where every Israel-specific differentiator (paired religious naming, `<ShabbatNotice>`, premium image discipline, rich `ReligiousBuilding` + `Place` schema for contested sites) has the highest payoff. If we ship Jerusalem to production depth, every other region is strictly easier.

### Phase 2.2 fallback condition

Switch to Tel Aviv if at end of Phase 2.2 (EN canonical complete):
- AUD-017..AUD-020 editorial style fails due to brief, not tooling
- >30% Old City restricted-site images lack cleared sources
- Hebrew translation throughput >2x budgeted time

Past Phase 2.3, no cheap switch.

---

## 6. Open Data Gaps

| # | Gap | Action | Phase | Cost |
|---|---|---|---|---|
| 1 | **Live keyword volumes for all 12 regions** | Buy Ahrefs Lite ($129) OR DataForSEO ($50) | **Before Phase 2.1** | $50–$200 |
| 2 | AID-parameter timing for 9 partners | Submit applications Phase 1.4; track `data/affiliate-status.json`; Travelpayouts as fallback | 1.4 apply, 6 monitor | 0 |
| 3 | Bahá'í photography policy | Email press@bahai.org before Phase 3 Haifa | Phase 3 | 0 |
| 4 | IGPO modern collection licensing | Email gpo-photo@pmo.gov.il | Phase 1.5 | 0 |
| 5 | Klook SKU / GoCity Israel launch | Quarterly check `data/affiliate-status.json` | Phase 6 | 0 |
| 6 | CJ vs Awin for Booking IL | Apply both; pick first approved | Phase 1.4 | 0 |
| 7 | Accessibility coordinator (real name + phone + email) | Designate before Phase 2.5 (IS 5568 mandate) | Before Phase 2.5 | 0 |
| 8 | Plausible vs PostHog | Lock in Phase 1.1 | Phase 1.1 | 0 |
| 9 | Legal entity name for footer | Confirm Phase 2.5 | Phase 2.5 | 0 |

**Only Gap #1 should block phase progression.** Others are parallel-trackable.

---

## 7. Quick Reference — File → Section Map

For roadmapper, requirements writer, and per-phase researchers. Don't re-read 232KB — go to the canonical section.

| Topic | Canonical file | Section(s) |
|---|---|---|
| Stack technology choices | STACK.md | §1, §11, §13 |
| Affiliate matrix (9 + 2) | STACK.md | §3 — §3.1, §3.4 |
| Image pipeline + credits CI gate | STACK.md | §4 — §4.4 |
| Lighthouse CI config | STACK.md | §5 — §5.2 |
| schema-dts pattern | STACK.md | §6 — §6.3, §6.5 |
| ESLint rules | STACK.md | §7 — §7.1, §7.2, §7.3 |
| Git hooks | STACK.md | §8 |
| What NOT to use | STACK.md | §10 |
| 12-region taxonomy | FEATURES.md | §1 |
| 17 competitors 3 tiers | FEATURES.md | §2 |
| Table stakes | FEATURES.md | §3 |
| Differentiators | FEATURES.md | §4 |
| Anti-features | FEATURES.md | §5 |
| Feature dependency graph | FEATURES.md | §6 |
| MVP scope (v1 / v1.x / v2) | FEATURES.md | §7 |
| Pilot scoring | FEATURES.md | §9 |
| URL structure + hreflang | ARCHITECTURE.md | §1 |
| i18n (next-intl) | ARCHITECTURE.md | §2 |
| R6 language decision | ARCHITECTURE.md | §3 — §3.4 |
| Schema topology | ARCHITECTURE.md | §4 — §4.1, §4.2, §4.4 |
| Design system (3 layers + CVA) | ARCHITECTURE.md | §5 — §5.1, §5.3 |
| Content pipeline (Velite) | ARCHITECTURE.md | §6 |
| Audit dashboard | ARCHITECTURE.md | §7 |
| Build-order DAG | ARCHITECTURE.md | §8 |
| Anti-patterns | ARCHITECTURE.md | §9 |
| Generic tourism pitfalls (12) | PITFALLS.md | §1 |
| Argentina inheritance (9) | PITFALLS.md | §2 |
| Israel landmines (11) | PITFALLS.md | §3 |
| R3 per-region keyword tables + H-tags | PITFALLS.md | §4 (12 sub-sections) |
| R5 image source map per region | PITFALLS.md | §5 |
| 34 audit rules AUD-001..AUD-034 | PITFALLS.md | §6 |
| Pitfall → phase mapping | PITFALLS.md | §7 |
| Acceptable shortcuts | PITFALLS.md | §8 |
| Integration gotchas | PITFALLS.md | §9 |
| Recovery strategies | PITFALLS.md | §14 |
| Pre-Quality-Gate checklist | PITFALLS.md | §13 |

---

## 8. Suggested Roadmap Phase Structure

The roadmapper should treat this as a starting structure, not a literal phase list.

### Phase 1 — Foundation (mega-prompt's Fase 1)

11 sub-phases enforcing foundation-before-content discipline. No research needed — well-defined by ARCHITECTURE §8 DAG.

Build order:
- **1.1** Scaffold (Next.js 15.5 + TS strict + Tailwind v4 + next-intl with 2 locales registered + ESLint flat config + Vercel) ← Conflict A resolution
- **1.2 / 1.5 / 1.6 parallel** (design tokens / photo-credits ledger / schema baseline)
- **1.3** Component lib (primitives + travel composites + `<ShabbatNotice>` + `<Price>` + `<SkipNav>` + `/admin/components/` noindex)
- **1.4** Affiliate helpers (9 real + 2 stubs per Conflict D) + ESLint enforcement + Vitest 4+ per helper
- **1.7** Quality scoring profiles (5 perfiles)
- **1.8** SEO config (dynamic sitemap, robots, hreflang, canonical, 301 middleware)
- **1.11** NER / dictionary mention detection
- **1.9** Audit dashboard at `/admin/audit/` (AUD-001..AUD-034 rules)
- **1.10** Lighthouse CI gate (3-run-median, mobile, hard thresholds)

### Phase 2 — Pilot Jerusalem

- **2.1** EN region canonical — `/gsd:research-phase` BEFORE to buy keyword data (Gap #1)
- **2.2** HE region canonical via `hebrew-content-writer` skill — pilot-switch checkpoint at end
- **2.3** Sub-destinations (5–10, EN + HE) after canonical stabilizes
- **2.4** Itinerary content (Jerusalem + day-trips)
- **2.5** Legal pages — named accessibility coordinator REQUIRED
- **2.6** Pilot QA + **Quality Gate (hard stop)**

### Phase 3 — Region Replication

Order by composite score: Tel Aviv → Dead Sea → Galilee → Eilat → Negev → Nazareth → Haifa → Golan → Caesarea → Akko → Masada. Bethlehem with administrative-status framing; Hebron excluded.

Research flags: Haifa (Bahá'í photos), Negev ($1,500–$3,000 image commissioning).

### Phase 4 — Long-tail Sub-destinations

Optional `/gsd:research-phase` per region if Ahrefs data shifts.

### Phase 5 — Legal + Final QA + Launch Prep

Includes "Looks done but isn't" checklist (PITFALLS §13).

### Phase 6 — Post-Launch Monitoring

Affiliate health, content freshness, AID activation, Klook/GoCity re-evaluation.

### Phase Ordering Rationale

- **Foundation first** prevents Argentina 9-root-cause cascade — non-negotiable.
- **Single pilot before replication** isolates risk — Argentina lesson #4.
- **Jerusalem before all others** because editorial complexity sets the highest bar — every other region strictly easier after.
- **Sub-destinations only after canonical stabilizes** — Argentina lesson #9.

---

## 9. Sources Consolidated

### Primary (HIGH confidence)

Official Next.js / Vercel / Google docs; affiliate program official pages (9 verified); Israel tourism statistics (Tourist Israel, JNS, Ministry of Tourism reports); Lonely Planet; Western Wall Heritage Foundation; Christian Information Center; Hebcal Jewish Calendar REST API; Government Press Office; Wikimedia Commons Israel categories; US State Department travel advisory; FTC accessiBe $1M action; BOIA IS 5568 overview; CTech accessiBe coverage; Accessibility.Works 2024 overlay lawsuits; project skills (hebrew-rtl-best-practices, hebrew-tailwind-preset, israeli-accessibility-compliance, hebrew-content-writer, next-best-practices).

### Secondary (MEDIUM confidence)

Roadgenius; DEV.to i18n comparison; Locize next-intl/next-i18next; Mavik Labs design tokens; Velite docs; Wisp CMS Contentlayer abandonment; CVA docs; Catholic World Report religious tourism; CAMERA-UK BBC terminology; Bahá'í Gardens policies.

### Tertiary (LOW confidence — needs validation)

- **R3 keyword volumes** — proxied via Google Trends + SERP top-10 + competitor backlink case studies. Relative ordering reliable; absolute ±50%. **Mitigation: Ahrefs Lite ($129) OR DataForSEO ($50) before Phase 2.1.**
- Klook Israel SKU breadth
- GoCity Israel destination launch timing
- Per-region Wikimedia coverage % (spot-checked, not crawled)
- Similarweb traffic for Tier 3 north-star benchmarks
- 2025 Israel inbound source-country splits (noisy recovery year)

---

*Synthesis completed: 2026-05-11*
*Synthesized from: STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md, PROJECT.md, MEGA-PROMPT-NEW-COUNTRY.md*
*Ready for: requirements definition + roadmap creation*
