# Visit Israel — Claude Code Project Notes

> Read this before editing. Captures non-obvious patterns + lessons that will trip up a fresh session.

## Project shape

- Next.js 15.5 + TS strict + Tailwind v4 + next-intl v3
- 2 locales registered (`he` default at root, `en` at `/en/`); filesystem allows `fr` for future
- Velite-compiled MDX content under `content/{en,he}/{regions,sub-destinations,itineraries,legal,west-bank}/`
- All affiliate links route through `lib/affiliate/<partner>.ts` helpers — never hardcode partner URLs (ESLint AFF-04 enforces)
- All images need `data/photo-credits.json` ledger entries with `sourceUrl`, `license`, `author`, and `restrictedSiteAcknowledgment` for Western Wall / Holy Sepulchre / Dome of the Rock / Bahá'í Gardens
- 34 audit rules under `scripts/audit/rules/AUD-*.ts`; quality gate at `scripts/audit/quality-gate.ts`; per-region soft gate at `scripts/qa/region-gate.mjs`

## Things that will bite you

### Prettier auto-escapes `*` in markdown text content

Pre-commit `lint-staged` runs prettier on `.md`/`.mdx` files. Prettier treats `*` as a markdown-emphasis meta-character and adds a backslash escape — **even inside `<automated>` HTML-like tags in plan files**. This silently corrupted a Phase 3 verify regex: `PASS\s*\|` kept reverting to `PASS\s\*\|` (which matches a literal asterisk, not whitespace).

**Workaround:** if you need `\s*` in an inline JS regex inside a plan file's `<automated>` tag, switch to a literal-space match (`PASS \|`) or any pattern without `*`. The report-row template guarantees `| PASS |` with one space, so literal-space works. See commit `799d5b0` for the full lesson.

### Phase 3 parallel-write coordination

Waves 2/3/4 ran 3 plans in parallel each. All 3 touched shared files (`data/photo-credits.json`, `app/sitemap.ts`, `data/region-replication-report.md`, `data/religious-sites.json`). The trivial-merge model — each agent appends region-tagged entries, last-write-wins on uniquely-keyed rows — worked at production scale with zero merge conflicts.

Pre-commit `pnpm qa:credits` Zod schema gates malformed JSON merges. If you spawn parallel agents touching these files: stay with the trivial-merge pattern, do NOT introduce explicit locking.

### React component prop contracts

The travel composites use specific prop shapes that differ from what PLAN.md examples sometimes show:

- `<AffiliateCard partner="X" destination="Y" label="Z" />` — NOT `data={{...}}`
- `<WhereToStay partner="booking" city="..." />` — check signature in `components/travel/`
- `<TransportInfo partner="skyscanner" />` — bare prop, no destination

Phase 2.1 caught this (Plan deviation Rule 3); Phase 3 plans 03/05/10 each hit it again. Verify component signature before authoring MDX that invokes it.

### MDX rendering pattern

Velite compiles MDX to JS; rendering uses `new Function(code)({...runtime})` with a direct default-export invocation — NOT a wrapped component. See `components/MDXContent.tsx`. The page H1 is owned by the RSC layout (e.g., `<RegionHero>`); MDX body must have ZERO H1 nodes (AUD-008 enforces).

### Hebrew content patterns

- Word count target: 0.85–1.40 ratio of EN; aim for 0.90–1.05 mid-band
- First draft typically lands at 0.76–0.87 — budget 120–180w native HE expansion per page (NOT translation — re-author in business-casual register, ktiv maleh, gender-neutral where the meaning permits)
- Brand names inside HE text: wrap in `<span dir="ltr" lang="en">` — bidi isolation
- Paired naming on contested sites: HE pairing-window 300 chars (`qa:hebrew-content` enforces)
- HE titles must avoid Latin runs — if you need `WCAG 2.1 AA` in a title, drop it (body content can use `<span dir="ltr">` wrapping)

### Lighthouse on Windows

`pnpm qa:lighthouse` hits EPERM on Win10 due to Chrome's user-data-dir lock. The canonical Lighthouse gate path is `.github/workflows/lighthouse.yml` (treosh/lighthouse-ci-action@v12). Quality Gate Criterion 1 + AUD-013/034 gracefully DEFER when `data/lighthouse-results.json` is `[]` (empty baseline) — that's intentional, NOT a regression.

### Region-gate consumer pattern (Phase 3 lesson)

Plan 03-01 ships `scripts/qa/region-gate.mjs` with pure-helpers exported (`evaluateRegion`, `loadAuditResults`, etc.); plans 02–11 consume it via `pnpm qa:region-gate <slug>`. The script writes `data/region-gates/<slug>.md` with a `Verdict: PASS|FAIL` line. Soft-gate thresholds: REGION_CANONICAL ≥80, SUB_DESTINATION ≥75 (relaxed from Phase 2 pilot's ≥85).

## Workflow gotchas

### Pure helpers exported for Vitest

CLI scripts in `scripts/` export their math/lifecycle helpers AND check `import.meta.url === argv[1]` (with drive-letter case-normalize for Windows) before running `main()`. This lets Vitest unit-test deterministic logic without spawning subprocesses. See `scripts/qa/region-gate.mjs`, `scripts/audit/quality-gate.ts`, `scripts/qa/persist-lhci.mjs`.

### Auto-fix rules

During execution, agents apply Rule 1 (PLAN bug fix), Rule 2 (missing minor functionality), Rule 3 (blocking architectural change requires user). Rules 1-2 auto-apply; Rule 3+ halts with explicit prompt. See `.planning/research/` lessons.

### Commit message style

- `feat(NN-MM): ...` for task implementations
- `test(NN-MM): ...` for RED-phase TDD commits
- `fix(NN-MM): ...` for bug fixes
- `docs(NN-MM): ...` for plan/SUMMARY/state metadata
- `docs(phase-N): ...` for phase-level completion / setup

Where NN = phase number, MM = plan number. Atomic commits per task; never bundle.

## Out-of-scope reminders

- **Hebron** explicitly excluded from sitemap + content (PROJECT.md)
- **FR locale** filesystem ready, not in i18n-config; v2
- **Klook + GoCity** stubs throw `NoIsraelInventoryError`; quarterly Israel-inventory re-check
- **R3 keyword data** deferred ($50 DataForSEO / $129 Ahrefs Lite); Phase 4 substantive long-tail blocked until purchase

See `data/post-launch-backlog.md` for the full deferred-items list with reactivation triggers.

## Quick commands

```bash
pnpm dev                    # Next.js dev server (port 3000)
pnpm build                  # production build
pnpm test --run             # Vitest one-shot
pnpm qa:audit               # 34-rule audit across built pages
pnpm qa:schema              # JSON-LD validation
pnpm qa:credits             # photo-credits Zod validation
pnpm qa:hebrew-content      # HE word-count + paired-naming + ktiv maleh
pnpm qa:region-gate <slug>  # per-region soft gate (audit + parity)
pnpm qa:quality-gate        # full 10-criterion launch gate
```
