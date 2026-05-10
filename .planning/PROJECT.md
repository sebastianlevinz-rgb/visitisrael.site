# Discover Israel

## What This Is

A production-ready tourism affiliate website for Israel covering 5–15 tourist regions, operating in at least 2 languages (English + Hebrew, with Russian and/or French to be confirmed by SEO research R6). The site monetizes every page via affiliate partners (Booking, Civitatis, Viator, GetYourGuide, RentalCars, SafetyWing, Skyscanner, plus others verified per R4) and competes with established destination editorial sites on SEO, performance, and a11y.

## Core Value

**Every tourist who lands on the site finds a credible, monetized path to booking what they came to research — without the structural debt that plagued the prior Discover Argentina project.** If everything else fails, page-level affiliate coverage + Lighthouse mobile ≥90 + IS 5568 a11y compliance must be true on day-one of launch.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Foundation built before content** — design system, affiliate infra, photo credits ledger, schema markup baseline, audit dashboard, Lighthouse CI gate, NER detection — all in place BEFORE first region canonical is written
- [ ] **Bilingual minimum (EN + HE)** — 100% page parity, hreflang correct, RTL fully supported (Hebrew Tailwind preset, ARIA in Hebrew, skip-nav in Hebrew)
- [ ] **Pilot region built to production depth** — region canonical (1500–2500 words), 5+ sub-destinations, 5+ active affiliates per page, hub pages, legal pages, all schema validated
- [ ] **Quality Gate passes before scaling** — Lighthouse mobile ≥90 (3-run-median), audit ≥85 per page, 0 critical bugs, ≥80% affiliate coverage of applicable partners, 100% credited images ≥1200px, 0 raw hex codes
- [ ] **5–15 regions replicated from pilot template** — each at audit ≥80, Lighthouse ≥85 (soft gate per region; hard gate was at pilot)
- [ ] **Sub-destinations long-tail sweep** — prioritized by keyword volume from R3 research
- [ ] **IS 5568 accessibility compliance** — beyond WCAG 2.1 AA, including mandatory Hatzaharat Negishot statement page, named accessibility coordinator, Hebrew error messages, RTL-aware skip nav, Reg-35 preferences widget (consider, not required)
- [ ] **Affiliate disclosure + legal pages** — about, contact, privacy, affiliate disclosure (FTC-grade)
- [ ] **Production deploy on Vercel** with Google Search Console, sitemap submitted, analytics + UTM tracking, audit dashboard accessible behind basic auth

### Out of Scope

- **Real-time chat / community features** — not core to affiliate value, high complexity
- **Video content production** — storage/bandwidth costs, defer indefinitely; embedded YouTube OK if existing
- **Hotel/tour inventory ownership** — we are an affiliate, not a marketplace; never store availability or process payments
- **Mobile native apps** — web-first responsive design covers the use case; PWA only if it helps install rate
- **Editorial blog content** — only if SEO R3 detects competitive gaps; otherwise affiliates carry the funnel
- **AI-generated travel itineraries** — quality risk, defer until v2 with curation layer
- **User accounts / saved trips** — affiliate model doesn't require accounts; adds GDPR scope
- **OAuth / authentication** — no user state means no auth needed
- **Political content** — neutral travel editorial only; no commentary on geopolitical situation (Google News distribution risk)

## Context

### Prior project: Discover Argentina (lessons codified)

The previous project (Discover Argentina) delivered 70 core pages × 5 languages but accumulated structural debt that required an entire sprint (S11) of corrections. Root causes are encoded as inviolable constraints below. Specific incidents:

| # | Root cause | Cost incurred |
|---|---|---|
| 1 | No formalized design system day-1 | 6,089 raw hex codes to clean retroactively |
| 2 | No affiliate strategy day-1 | One partner reached 92% coverage, another 18% — massive codemod |
| 3 | No image contract | PhotoGallery without srcset for months, watermarks, low-res, patched credits ledger |
| 4 | Legacy sub-pages | 783 bugs detected at once, emergency codemod |
| 5 | Uniform quality scoring | Punished utility/hub pages unfairly until 5 profiles were introduced |
| 6 | NER detection as afterthought | 14k monetization opportunities discovered late |
| 7 | i18n bolted-on | Core language first, others added in separate sprints |
| 8 | Lighthouse unmeasured until S11 | Plateau ~85, multiple iterations to reach 90+ |
| 9 | Sub-pages built before canonical pattern stabilized | Had to be regenerated |

### Israel-specific complexity (beyond the generic playbook)

- **RTL (Hebrew):** Tailwind requires `dir="rtl"` per language; PhotoGallery, ItineraryCard, navigation, breadcrumbs all need mirror layout. Address in Phase 1.2 design system, not bolted-on.
- **Religious tourism:** Jerusalem, Bethlehem (West Bank — editorial sensitivity), Nazareth, Sea of Galilee. Schema enriched with `ReligiousBuilding`/`Place`. Naming requires care (e.g., "Temple Mount / Haram al-Sharif"), avoid political tone.
- **Israeli accessibility law (IS 5568):** stricter than WCAG 2.1 AA in places — mandatory accessibility statement, named accessibility coordinator, Hebrew error messages, accessibility contact method. Statutory damages up to 50,000 NIS per violation under the Equal Rights for Persons with Disabilities Act. Lighthouse a11y ≥95 alone is not sufficient.
- **Shabbat closures:** many religious sites + transit close Friday afternoon → Saturday evening. "Best time to visit" and "opening hours" copy must reflect this; consider runtime widget.
- **Language strategy uncertainty:** mega prompt assumed "local + EN" but R6 research will likely confirm Hebrew + English + (possibly Russian for the post-Soviet diaspora or French for pilgrimage) is the right cut. Final decision after R6.
- **Affiliate availability:** confirm in R4 that Booking, Civitatis, Viator, GYG, Skyscanner, RentalCars, SafetyWing all operate in Israel and have active affiliate programs.
- **Image source asymmetry:** Wikimedia has strong coverage of Jerusalem/Tel Aviv/Masada but weaker on Negev, Galilee. Israel Government Press Office (IGPO) has CC-licensed photos. Verify in R5.

### Skills installed (15 total) — to inform planning, not derive structure

- Israel-specific (skills-il org): `hebrew-rtl-best-practices`, `hebrew-tailwind-preset`, `israeli-accessibility-compliance`, `hebrew-content-writer`
- Frameworks/quality: `next-best-practices` (Vercel official), `nextjs-best-practices` (community), `tailwind-design-system` (40.4K installs), `accessibility` (addyosmani, 21.5K installs)
- Marketing/content: `affiliate-marketing`, `affiliate-page-generator`, `copywriting`
- Performance: `performance-lighthouse-runner`
- Images: `image-optimization` (aj-geddes), `responsive-images`
- Meta: `find-skills`

See `data/skills-inventory.md` for full audit, install commands, and re-run guidance.

## Constraints

- **Tech stack**: Next.js 15 + App Router + TypeScript strict + Tailwind. No exceptions to React 18+; no Vue/Svelte/other frameworks. Vercel deploy target.
- **Affiliate helpers required**: NEVER link to a partner directly in component JSX — must pass through `bookingLink()`, `civitatisLink()`, etc. Helpers read env vars; if no AID is set, the helper returns the public URL but is codemod-ready to flip when AID arrives.
- **Image contract**: NEVER import an image without (a) entry in `data/photo-credits.json` with author + license + source URL, (b) minimum width 1200px, (c) responsive `srcset` (320w/640w/1024w/1600w). CI must fail on violation.
- **Page checklist**: NEVER publish a page without hreflang, JSON-LD schema, meta description, OG tags, canonical URL.
- **Quality Gate is hard**: NEVER advance to Phase 3 (region replication) if Phase 2 (pilot) fails the Quality Gate. Hard stop — write `data/quality-gate-failure.md`, wait for human input.
- **Lighthouse measurement protocol**: NEVER report Lighthouse from a single sample — must be 3-run-median. Single-sample lied in S11.
- **Audit before declaring complete**: NEVER mark a page complete without running the audit dashboard.
- **Color tokens only**: NEVER write raw hex codes in components. Use design tokens from `tailwind.config.ts`. ESLint rule must enforce.
- **Affiliate operation verified**: NEVER assume a partner operates in Israel — confirm in R4 research before building helper.
- **Performance target**: Lighthouse mobile (3-run-median) ≥90 across performance, ≥95 a11y, ≥95 best-practices, =100 SEO.
- **Audit target**: ≥85 per page on the pilot region; ≥80 per page on replicated regions.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Country = Israel | User's explicit project goal; directory name `visitisrael.site` reflects this | — Pending |
| Operating mode = YOLO until Quality Gate Phase 2 | User explicitly committed; mega prompt is well-specified enough to autonomously execute Phases 0–2 | — Pending |
| Granularity = Coarse | 6 milestones in mega prompt fit Coarse's 3–5 phases; sub-phases become plans within each | — Pending |
| Model profile = Quality (Opus for research/roadmap) | Scope of project (50+ pages × 2 langs) justifies higher per-token cost on planning agents | — Pending |
| Skills foundation pre-installed | 15 skills audited and installed before Phase 0 so research and planning can invoke them | ✓ Good |
| Mega prompt is the primary requirements doc | `MEGA-PROMPT-NEW-COUNTRY.md` is more specific than what GSD's normal questioning would produce — skip interactive questioning | — Pending |
| Language strategy deferred to R6 | Default "EN + HE" assumed but Russian/French may displace one if data warrants | — Pending |
| Pilot region selection deferred to R3 | Auto-elected by `volume × opportunity × competitor-weakness` from keyword research | — Pending |

---
*Last updated: 2026-05-11 after initialization*
