# Visit Israel

Bilingual (Hebrew + English) travel guide covering 11 Israeli regions. Built as an affiliate site — every page routes commercial intent through partner helpers (Booking, Civitatis, Viator, GetYourGuide, RentalCars, SafetyWing, Skyscanner, Hostelworld, DiscoverCars) with FTC-compliant inline disclosure.

**Status:** v1.0 launch-ready (autonomous build complete 2026-05-11). Awaiting user-driven deploy chain — see [`data/pre-deploy-checklist.md`](./data/pre-deploy-checklist.md).

## Stack

- **Next.js 15.5** (App Router) + **TypeScript strict**
- **Tailwind v4** (CSS-first `@theme`)
- **next-intl v3** (HE at root, EN at `/en/`, FR filesystem-ready)
- **Velite** MDX content pipeline
- **Vitest** (1648 tests) + **Lighthouse CI** (`.github/workflows/lighthouse.yml`) + 34-rule custom audit dashboard
- **Plausible** analytics (privacy-friendly, no cookies)
- **Vercel** target (Pro plan for cron + basic-auth on `/admin/*`)

## Project structure

```
app/                # Next.js App Router routes
├── [locale]/       # Bilingual region/sub-dest/itinerary/legal pages
│   ├── [region]/[subdest]/
│   ├── itineraries/[slug]/
│   ├── west-bank/[slug]/   # Bethlehem (distinct route family for REG-04)
│   └── legal/{about,contact,privacy,affiliate-disclosure,accessibility-statement}/
├── admin/          # Internal audit dashboard (basic-auth gated)
├── api/cron/       # Vercel Cron handlers (affiliate-health weekly)
└── sitemap.ts, robots.ts, not-found.tsx

components/         # 7 primitives + 12 travel composites + 6 layout
├── travel/         # AffiliateCard, WhereToStay, TransportInfo, ShabbatNotice, etc.
└── ...

content/            # Velite-managed MDX
├── en/{regions,sub-destinations,itineraries,legal,west-bank}/
└── he/{...same shape...}

lib/
├── affiliate/      # 9 real helpers + 2 stubs (Klook, GoCity) — AFF-04 enforced
├── schema/         # 11 JSON-LD generators (TouristDestination, PlaceOfWorship, etc.)
├── seo/            # naming.ts (paired religious names), accessibility-link.ts
└── indexnow.ts     # IndexNow ping helper

scripts/
├── audit/          # 34 AUD rules + quality-gate + dashboard generator
└── qa/             # check-credits, hebrew-content, region-gate, validate-schema, persist-lhci

data/               # JSON ledgers + reports + handoff docs
├── photo-credits.json
├── audit-results.json, region-replication-report.md, launch-readiness-report.md
├── pre-deploy-checklist.md  ← read this first when deploying
├── env-vars-template.md     ← every required prod env var
└── post-launch-backlog.md   ← v1-deferred items + reactivation triggers

.planning/          # GSD methodology artifacts (phase plans, summaries, verification reports)
```

## Quick start

```bash
pnpm install
pnpm dev                    # localhost:3000 — HE at /, EN at /en/
```

## Quality gates

```bash
pnpm typecheck              # tsc --noEmit
pnpm lint                   # ESLint flat config — AFF-04 + AFF-05 + no-restricted-syntax
pnpm test --run             # Vitest one-shot (1648 tests, ~140s)
pnpm build                  # 201 routes prerendered

pnpm qa:credits             # photo-credits Zod schema + width≥1200 + license/source/author
pnpm qa:schema              # JSON-LD validation on every built page
pnpm qa:audit               # 34-rule sweep, writes data/audit-results.json
pnpm qa:hebrew-content      # HE word-count (0.85-1.40) + paired naming + ktiv maleh
pnpm qa:region-gate <slug>  # per-region soft gate (REGION_CANONICAL ≥80 / SUB_DESTINATION ≥75)
pnpm qa:quality-gate        # 10-criterion launch gate
```

## Conventions

- **Affiliate links:** never hardcode partner URLs. Use `lib/affiliate/<partner>.ts` helpers. ESLint AFF-04 enforces this. Test URLs for the health-check cron live in `lib/affiliate/health-targets.ts` (the documented escape hatch).
- **Religious-site naming:** "Western Wall" (never the colonial-era variant); "Temple Mount / Haram al-Sharif" paired on first reference within 300 chars; "Bethlehem (in the West Bank, administered by the Palestinian Authority)" — see [`.planning/research/PITFALLS.md`](./.planning/research/PITFALLS.md) §3.
- **Hebrew content:** native rewrite (NOT translation); 0.85–1.40 word-count ratio of EN (mid-band 0.90–1.05); brand names wrapped in `<span dir="ltr" lang="en">`.
- **Images:** every binary needs a ledger entry in `data/photo-credits.json` (width ≥1200px, license, author, sourceUrl, `restrictedSiteAcknowledgment` for Western Wall / Holy Sepulchre / Dome of the Rock / Bahá'í sites).
- **Schema:** every content page emits typed JSON-LD via `lib/schema/*.ts` generators. PlaceOfWorship for active religious buildings; Place for archaeological sites; TouristAttraction baseline.

## Architecture decisions

See `.planning/research/SUMMARY.md` §1 (Headline Decisions) and `.planning/research/ARCHITECTURE.md`. Key locks:

- 2 registered locales at v1 (HE, EN); FR scaffolded but not registered
- One plan per region in Phase 3 (vs consolidated sweep) — localized recovery from failure
- Jerusalem as pilot (Phase 2) before scale (Phase 3)
- Photo placeholders OK with REAL ledger metadata at v1; binary swap deferred to Phase 6
- Synthetic SEO data is forbidden — R3 keyword volumes deferred until real Ahrefs/DataForSEO purchase

## Deploying

Follow [`data/pre-deploy-checklist.md`](./data/pre-deploy-checklist.md). 12 ordered steps covering Vercel Pro provisioning, DNS, env vars (template at [`data/env-vars-template.md`](./data/env-vars-template.md)), affiliate AID enrollment, Search Console verification, Lighthouse production sample, smoke tests.

After deploy completes: fill [`data/m6-completion-report-template.md`](./data/m6-completion-report-template.md), rename to `m6-completion-report.md`, commit.

## Contributing

This is currently a single-developer project (per `content/en/legal/about.mdx` Team Disclosure). If that changes:

- Every author bio is public + geographically disclosed
- Editorial standards in `content/en/legal/about.mdx` apply to every contributor
- Religious-site naming is enforced by AUD-017..AUD-020 audit rules — read `.planning/research/PITFALLS.md` §3 first

Security disclosures: see [`SECURITY.md`](./SECURITY.md).

## License

See [`LICENSE`](./LICENSE).

## Acknowledgements

- Image sources: Wikimedia Commons CC-BY / CC-BY-SA + Israel Government Press Office (IGPO)
- Accessibility standard: IS 5568:2020 (Israel) / WCAG 2.1 AA
- Built with the [GSD methodology](https://github.com/Bklieger/get-shit-done) for plan-driven LLM development
