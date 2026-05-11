---
phase: 1
slug: foundation-m1
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

Phase 1 is special: **it builds the test infrastructure it then uses**. Wave 0 work (Vitest, ESLint flat config, Husky, lint-staged) is collapsed into sub-phase 1.1 — by the end of Wave 1, the lint/typecheck/test pipeline is operational and every subsequent sub-phase exercises it.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x (unit + integration) + `@lhci/cli` (perf gate) + `axe-core` (a11y CI) + `audit_a11y.py` (IS 5568 specifics from `israeli-accessibility-compliance` skill) |
| **Config file** | `vitest.config.ts` (created in sub-phase 1.1) + `eslint.config.js` (flat config, created in sub-phase 1.1) + `.lighthouserc.cjs` (created in sub-phase 1.10) |
| **Quick run command** | `pnpm test --run` |
| **Full suite command** | `pnpm lint && pnpm typecheck && pnpm test --run && pnpm validate:schema && pnpm validate:credits` |
| **Estimated runtime** | ~30s quick, ~90s full (Phase 1 — no E2E yet); ~3min+ once Lighthouse CI runs in 1.10 |

---

## Sampling Rate

- **After every task commit:** Run `pnpm test --run` (quick — Vitest only)
- **After every plan wave:** Run full suite (lint + typecheck + tests + validators)
- **Before `/gsd:verify-work`:** Full suite green + Lighthouse CI run green (after 1.10 lands)
- **Max feedback latency:** 30 seconds for unit tests; 90 seconds for full pre-commit gate; ~3 minutes for full pre-deploy gate (Lighthouse adds the 3-run-median latency)

---

## Per-Task Verification Map

> Populated by `gsd-planner` as PLAN.md files are written. Each row maps to a task in the sub-phase plans, with the verification command extracted from `01-RESEARCH.md` §3 (Validation Architecture).
>
> The 41 phase requirement IDs are the canonical row set. Each row gets one Test Type + Automated Command at planning time.

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-* | 01 (scaffold) | 1 | FND-01 | smoke | `pnpm dev` boots + `pnpm build` succeeds | ❌ W0 | ⬜ pending |
| 1-01-* | 01 (scaffold) | 1 | FND-08 | smoke | `grep -r 'data-domain' src/app/layout.tsx` (Plausible script present) | ❌ W0 | ⬜ pending |
| 1-01-* | 01 (scaffold) | 1 | I18N-01 | smoke | `curl localhost:3000/jerusalem 200` AND `curl localhost:3000/en/jerusalem 200` (placeholder pages) | ❌ W0 | ⬜ pending |
| 1-01-* | 01 (scaffold) | 1 | I18N-02 | unit | `pnpm test src/i18n` — verifies `locales = ['he','en']` registered, `'fr'` allowed in type union | ❌ W0 | ⬜ pending |
| 1-01-* | 01 (scaffold) | 1 | I18N-04 | unit | `pnpm test src/i18n` — verifies `<html lang="he" dir="rtl">` rendered for HE routes | ❌ W0 | ⬜ pending |
| 1-01-* | 01 (scaffold) | 1 | I18N-05 | unit | `pnpm test src/lib/hreflang` — emits 3 alternates only for built locales | ❌ W0 | ⬜ pending |
| 1-01-* | 01 (scaffold) | 1 | AFF-04 (partial) | fixture | `pnpm lint __fixtures__/raw-partner-url.tsx` exits non-zero | ❌ W0 | ⬜ pending |
| 1-01-* | 01 (scaffold) | 1 | AFF-05 | fixture | `pnpm lint __fixtures__/raw-hex.tsx` exits non-zero; `pnpm lint __fixtures__/physical-direction.tsx` exits non-zero | ❌ W0 | ⬜ pending |
| 1-02-* | 02 (tokens) | 2 | FND-02 | unit | `pnpm test src/lib/tokens` — verifies all semantic tokens resolve to HSL foundation values; zero raw hex via AST scan of `src/components` | ❌ | ⬜ pending |
| 1-03-* | 03 (components) | 3 | FND-03 | unit | `pnpm test src/components` — primitives + composites render in both `dir="ltr"` and `dir="rtl"` modes without console errors | ❌ | ⬜ pending |
| 1-03-* | 03 (components) | 3 | FND-04 | smoke | `curl localhost:3000/admin/components 200` AND `<meta name="robots" content="noindex">` present | ❌ | ⬜ pending |
| 1-03-* | 03 (components) | 3 | I18N-03 | unit | AST scan: zero physical Tailwind directional utilities in `src/components/**` | ❌ | ⬜ pending |
| 1-03-* | 03 (components) | 3 | A11Y-02 | unit | `pnpm test src/components/SkipNav` — first focusable element on every page; uses `inset-inline-start` | ❌ | ⬜ pending |
| 1-04-* | 04 (affiliates) | 4 | AFF-01 | unit | `pnpm test lib/affiliate` — 36 tests pass (4 per × 9 real helpers) | ❌ | ⬜ pending |
| 1-04-* | 04 (affiliates) | 4 | AFF-02 | unit | `pnpm test lib/affiliate/{klook,gocity}` — 4 stub-throw tests pass (`expect(() => klookLink()).toThrow('no Israel inventory')`) | ❌ | ⬜ pending |
| 1-04-* | 04 (affiliates) | 4 | AFF-03 | unit | Test count check: `pnpm test lib/affiliate | grep '44 passed'` | ❌ | ⬜ pending |
| 1-04-* | 04 (affiliates) | 4 | AFF-04 (full) | fixture | `pnpm lint __fixtures__/raw-partner-url-{booking,civitatis,viator,gyg,rentalcars,safetywing,skyscanner,hostelworld,discovercars}.tsx` — all 9 fail | ❌ | ⬜ pending |
| 1-04-* | 04 (affiliates) | 4 | AFF-06 | unit | `pnpm test src/components/AffiliateCard` — FTC inline disclosure renders within first viewport AND on every monetized page (snapshot scan) | ❌ | ⬜ pending |
| 1-04-* | 04 (affiliates) | 4 | AFF-07 | unit | `pnpm test data/affiliate-status` — schema validates; all 11 partners present | ❌ | ⬜ pending |
| 1-04-* | 04 (affiliates) | 4 | AFF-08 | smoke | `data/affiliate-status.json` shows `travelpayouts.state ∈ {pending, applied, active}` | ❌ | ⬜ pending |
| 1-05-* | 05 (photo ledger) | 2 | IMG-01 | unit | `pnpm test scripts/validate-credits` — Zod schema rejects malformed entries; round-trip works | ❌ | ⬜ pending |
| 1-05-* | 05 (photo ledger) | 2 | IMG-02 | fixture | `pnpm validate:credits __fixtures__/uncredited-image.tsx` exits non-zero; same for width <1200px | ❌ | ⬜ pending |
| 1-05-* | 05 (photo ledger) | 2 | IMG-03 | unit | `pnpm test src/components/PhotoGallery` — srcset attribute emits `320w/640w/1024w/1600w`; `<Image>` instances use `formats={['avif','webp']}` | ❌ | ⬜ pending |
| 1-05-* | 05 (photo ledger) | 2 | IMG-06 | unit | `pnpm validate:credits` — `restrictedSiteAcknowledgment` required for `subjectType ∈ {western-wall, holy-sepulchre, dome-of-the-rock, bahai-gardens}` | ❌ | ⬜ pending |
| 1-06-* | 06 (schema) | 2 | SEO-01 | unit | `pnpm test lib/schema` — `<script type="application/ld+json">` rendered from RSC for sample page; `Organization` from root layout only | ❌ | ⬜ pending |
| 1-06-* | 06 (schema) | 2 | SEO-02 | unit | `pnpm test lib/schema` — 11 generators all callable with required fields; produce schema-dts-typed objects | ❌ | ⬜ pending |
| 1-06-* | 06 (schema) | 2 | SEO-03 | smoke | `pnpm validate:schema` — runs against sample page output, exits 0 | ❌ | ⬜ pending |
| 1-06-* | 06 (schema) | 2 | SEO-05 | unit | `pnpm test lib/seo/meta` — title length 50–60 chars; meta-desc 120–160; single H1; H2 cadence per 200–300w | ❌ | ⬜ pending |
| 1-06-* | 06 (schema) | 2 | SEO-06 | unit | `pnpm test lib/seo/canonical` — self-referential per locale; never cross-locale | ❌ | ⬜ pending |
| 1-06-* | 06 (schema) | 2 | I18N-06 | unit | `pnpm test velite.config` — `lang: z.enum(['he','en','fr'])`; collections per locale resolve | ❌ | ⬜ pending |
| 1-07-* | 07 (quality profiles) | 5 | FND-05 | unit | `pnpm test lib/quality-profiles` — 5 profile objects export distinct weights for the 5 categories | ❌ | ⬜ pending |
| 1-08-* | 08 (seo config) | 5 | FND-06 | smoke | `curl localhost:3000/sitemap.xml` lists only HE+EN URLs; `curl /robots.txt` disallows `/admin/` + `/api/` | ❌ | ⬜ pending |
| 1-08-* | 08 (seo config) | 5 | A11Y-01 | unit | `pnpm test src/app/layout` — every page renders `lang` + `dir` (AUD-027 fires) | ❌ | ⬜ pending |
| 1-08-* | 08 (seo config) | 5 | A11Y-05 | unit | `pnpm test src/components/Footer` — accessibility-statement link renders in current locale (AUD-028) | ❌ | ⬜ pending |
| 1-08-* | 08 (seo config) | 5 | SEO-04 | unit | `pnpm test lib/schema/naming` — religious-site dual-naming regex catches "Wailing Wall" but not "Western Wall"; `administrativeStatus` present for Bethlehem/Hebron/Jericho | ❌ | ⬜ pending |
| 1-11-* | 09 (NER) | 6 | FND-07 | unit | `pnpm test src/ner` — given sample MDX, detector emits expected mention objects with class labels; surfaces to audit dashboard JSON | ❌ | ⬜ pending |
| 1-09-* | 10 (audit dash) | 7 | AUD-01 | smoke | `curl -u $BASIC_AUTH localhost:3000/admin/audit 200` returns rendered dashboard; JSON cache at `.planning/audit/results.json` exists | ❌ | ⬜ pending |
| 1-09-* | 10 (audit dash) | 7 | AUD-02 | unit | `pnpm test src/lib/audit` — 34 rules wired (AUD-001..034); per-page score computed using one of the 5 quality profiles | ❌ | ⬜ pending |
| 1-09-* | 10 (audit dash) | 7 | A11Y-06 | smoke | `pnpm test:axe` (axe-core CLI over sample pages) — zero violations | ❌ | ⬜ pending |
| 1-09-* | 10 (audit dash) | 7 | A11Y-07 | smoke | `grep -r "accessibe\|userway\|equalweb\|audioeye" src/ public/` returns empty | ❌ | ⬜ pending |
| 1-09-* | 10 (audit dash) | 7 | A11Y-08 | smoke | `python .agents/skills/israeli-accessibility-compliance/scripts/audit_a11y.py --url http://localhost:3000` returns `Status: AUTOMATED CHECKS PASSED` | ❌ | ⬜ pending |
| 1-09-* | 10 (audit dash) | 7 | AUD-04 | smoke | `git commit` against a test commit containing raw hex or missing credits — pre-commit hook blocks; `git log` shows no failed commit recorded | ❌ | ⬜ pending |
| 1-10-* | 11 (lighthouse) | 8 | AUD-03 | smoke | `pnpm lhci autorun` — exits 0 with `numberOfRuns: 3` + `aggregationMethod: 'median'`; thresholds asserted | ❌ | ⬜ pending |
| 1-10-* | 11 (lighthouse) | 8 | AUD-05 | smoke | `pnpm gate:report` — writes `data/quality-gate-{pass\|failure}.md` with 10-criterion result; non-zero exit on `failure` | ❌ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Coverage check:** 41/41 phase requirement IDs mapped to verification commands. ✓

---

## Wave 0 Requirements

Wave 0 work is collapsed into sub-phase 1.1 (the scaffold). After 1.1 completes, every subsequent sub-phase has a working test pipeline.

- [ ] `package.json` includes `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` (test deps)
- [ ] `vitest.config.ts` — JSDOM env, `setupFiles: ['./vitest.setup.ts']`, alias `@/` → `src/`
- [ ] `vitest.setup.ts` — extends `expect` with jest-dom matchers
- [ ] `tsconfig.json` strict flags: `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`, `noFallthroughCasesInSwitch: true`
- [ ] `eslint.config.js` flat config with all three custom rules (no arbitrary hex, no raw partner URLs, no physical directional utilities) and `eslint-plugin-tailwindcss`
- [ ] `package.json` scripts: `dev`, `build`, `start`, `lint`, `lint:fix`, `typecheck`, `test`, `test:watch`, `validate:schema`, `validate:credits`, `gate:report`
- [ ] Husky v9 init via `pnpm exec husky init` → `.husky/pre-commit` runs `pnpm lint-staged`
- [ ] `lint-staged.config.js` — runs ESLint on staged `*.{ts,tsx,js,jsx}` and Prettier on `*.{md,json,css}`
- [ ] `__fixtures__/` directory exists with at minimum: `raw-hex.tsx`, `physical-direction.tsx`, `raw-partner-url.tsx` — each is a deliberately-failing test file that ESLint rejects (used by Per-Task Verification Map rows above)

If after 1.1 the full suite fails to run, halt Phase 1 — every downstream wave depends on the pipeline.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `/admin/components/` visual review of every primitive/composite in both LTR + RTL | FND-04, I18N-03 | Visual regression requires human eye until Phase 6 adds Percy/Chromatic | Open `http://localhost:3000/admin/components/` in Chrome + Firefox; toggle `dir` attribute; confirm no visual breakage |
| Plausible analytics dashboard receives pageviews from preview deploy | FND-08 | Requires Plausible account access and real network traffic | Deploy to Vercel preview, visit deploy URL, verify pageview appears in Plausible within 60s |
| Vercel preview deploy serves both `/jerusalem` (HE) and `/en/jerusalem` (EN) placeholder pages | FND-01, I18N-01 | Requires Vercel deploy succeed | `vercel --prod` (or preview); curl both URLs from external network |
| Pre-commit hook actually fires on a real commit | AUD-04 | CI cannot verify local hook installation | Make a test commit with raw hex; verify Husky blocks; verify pre-commit log surfaced the rule violation |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies (the 4 manual items above are explicit exceptions, justified)
- [x] Sampling continuity: no 3 consecutive tasks without automated verify (every sub-phase has at least 2 automated rows)
- [x] Wave 0 covers all MISSING references (Vitest, ESLint, Husky, fixtures — all explicit in Wave 0 list)
- [x] No watch-mode flags (`pnpm test --run` not `pnpm test` which defaults to watch)
- [x] Feedback latency < 90 seconds (full pre-commit gate; Lighthouse gate is pre-deploy not pre-commit)
- [ ] `nyquist_compliant: true` set in frontmatter — flip after plans written and per-task map filled

**Approval:** pending — flip `nyquist_compliant: true` after `gsd-plan-checker` confirms all 41 req IDs have working verification commands in their PLAN.md files.
