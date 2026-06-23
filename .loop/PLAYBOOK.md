# Visit Israel — Autonomous SEO Enrichment Loop · PLAYBOOK

You are running **one bounded iteration** of an overnight autonomous loop whose mission is
to make visitisrael.site the best Israel-travel SEO site on the web: study competitors,
bring their profitable/valuable features here, implement them end-to-end, **test them**,
ship them, and keep discovering more — while also periodically reviewing what's already done.

This file is the single source of truth for HOW to run an iteration. Read it fully each time.
All operational memory lives in `.loop/` (gitignored). Ground truth is git history + CI.

---

## 0. HARD SAFETY RULES (never violate)

1. **STOP flag**: if `.loop/STOP` exists, do NOTHING — write one line to JOURNAL ("stopped: STOP flag present") and end the turn immediately. Do not schedule more work.
2. **One item per iteration.** Implement exactly one backlog item (or one research pass, or one review pass). Keep it bounded so it fits a single context/token budget and is easy to revert.
3. **Full gate before anything reaches master.** A change may only merge to master if `pnpm check` AND `pnpm build` AND `pnpm test:e2e` (e2e + a11y) ALL pass locally. No exceptions. master auto-deploys to PRODUCTION.
4. **Atomic + reversible.** Do feature work on a short-lived branch `auto/<slug>`. Never `git add -A` (`.loop/` is gitignored but still scope adds to real files). Squash-merge to master.
5. **Post-deploy verification + auto-revert.** After merging to master, confirm the Vercel PRODUCTION deployment for the new master SHA succeeds (§5). If it fails, immediately `git revert` the merge, push, send a PushNotification, and journal the incident.
6. **Honesty (project rule).** Never fabricate ratings, review counts, prices presented as exact, or fake testimonials. Price RANGES in prose are fine. Affiliate links only via `src/config/affiliates.ts` helpers.
7. **Never touch**: secrets/env, `vercel.json` security headers, the CI workflows' core gates, `.loop/PLAYBOOK.md` (this file), or delete existing content/pages. Don't disable tests to make them pass.
8. **Higgsfield budget.** Only generate images if `config.json.higgsfield.enabled` and spend-so-far < `creditCapPerNight`. Track spend in STATE. QA every generated image for hallucinated text before use (the soul_location model sometimes bakes in garbled text — reject & regenerate). If the MCP is disconnected, skip image work and queue it in BACKLOG.
9. If unsure whether a change is safe/correct, DON'T ship it — leave it as a branch + note in JOURNAL and BACKLOG for human review instead of merging.

---

## 1. START-OF-ITERATION CHECKLIST

```bash
cd E:/visitisrael.site
test -f .loop/STOP && echo "STOP" && exit   # (in practice: read the file; if present, stop)
git checkout master && git pull --ff-only
git status --short                            # must be clean; if dirty, see §1a
```

### 1a. Recover from a crashed previous iteration
- If the working tree is dirty or an `auto/*` branch exists unmerged: a prior fire likely died (token cutoff).
  - If the leftover branch has a clean, gate-passing change → finish it (re-run gate → merge per §4–5).
  - Otherwise → discard it: `git checkout -- . ; git checkout master ; git branch -D auto/<slug>`. Note the abandon in JOURNAL.
- Always begin the real work from a clean `master` synced to origin.

---

## 2. ORIENT (read memory, pick the mode)

Read: `.loop/STATE.md`, the top of `.loop/BACKLOG.md`, recent `.loop/DONE.md`, last ~20 lines of `.loop/JOURNAL.md`, and `.loop/config.json`.

Determine this iteration's **mode** from the rotation counter in STATE (`iteration` number), cycling:

- iteration % 5 == 0 → **RESEARCH/DISCOVERY** (no shipping): web-research 1–2 competitors for profitable features/content we lack; append concrete, prioritized items to BACKLOG and findings to COMPETITORS. (See §3a.)
- iteration % 5 == 4 → **REVIEW** (no new feature): pick a slice of already-shipped work and audit it (correctness, SEO, a11y, perf, dead links, schema validity, honesty). File any fixes as new BACKLOG items (or do one quick safe fix end-to-end through the gate).
- otherwise → **BUILD**: take the highest-priority BACKLOG item whose `category` matches the balanced rotation (cycle monetization → seo-content → tools → technical), and implement it end-to-end. If the chosen category has nothing ready, fall through to the next category; if BACKLOG is thin overall, switch to RESEARCH mode this iteration.

Balanced rotation across categories over the night is the goal — don't do four content pages in a row if tools/monetization/technical items are waiting.

### 3a. RESEARCH mode specifics
- Use WebSearch/WebFetch on competitors: Tourist Israel, goisrael, Lonely Planet, GetYourGuide, Viator, TripAdvisor, Rough Guides, Bein Harim/Abraham Tours, The Points Guy / Nomadic Matt (format ideas). Look for **profitable** patterns: money pages, comparison tables, booking widgets, calculators, high-intent content, schema types, internal-link structures, link-bait tools.
- For each opportunity, append to BACKLOG with: title, category, why-it's-valuable (SEO/revenue), rough effort (S/M/L), and a 1-line implementation sketch. De-dupe against DONE and COMPETITORS.
- Cap research output ~6–10 new items/iteration so the backlog stays curated, not bloated.

---

## 3. IMPLEMENT (BUILD mode)

1. `git checkout -b auto/<slug>` (slug from the item).
2. Build the feature **end-to-end**, matching existing patterns:
   - Reuse components: `<Pic>` (AVIF/WebP images), `<Hero>`, `<Breadcrumbs>`, `<JsonLd>`, `<AffiliateCard>`/`<InlineTourCTA>`, design tokens/classes (`.btn`, `.eyebrow`, `rounded-card`, etc.). Read a sibling file before authoring.
   - Content frontmatter must match `src/content.config.ts` exactly; bodies have NO H1 (layout owns it); .md files = Markdown only (no Astro components in body).
   - New pages: unique SEO title/description, breadcrumb + FAQ JSON-LD where apt, dense internal links, a reused existing `/images/...` hero (verify it exists) or a Higgsfield image (within budget, QA'd).
   - New interactive tools: vanilla JS island, on-brand, accessible (labels, aria-live, focus-visible, `prefers-reduced-motion`), AND **add Playwright tests** in `tests/e2e/tools.spec.ts` (or a new spec) so the gate covers them.
   - Wire discoverability: header/footer/home/plan-your-trip/related links as appropriate (these are shared files — edit carefully).
3. Keep the change focused on the one item.

---

## 4. GATE (must be green to ship)

```bash
pnpm check        # 0 errors required
pnpm build        # must complete
pnpm test:e2e     # 37+ e2e + a11y; all must pass (a11y = 0 WCAG violations)
```
- If something fails: attempt ONE focused fix, re-run. If still failing → abandon: `git checkout master ; git branch -D auto/<slug>`; mark the item `blocked` in BACKLOG with the error; JOURNAL it; end iteration (do NOT merge).
- If a new tool/page needs a new test and you didn't add one, add it now and re-gate.

---

## 5. SHIP (only if gate green) + VERIFY PROD

```bash
git checkout master
git merge --squash auto/<slug>
git commit -m "<type>(<scope>): <what> [auto-loop]"   # honest, descriptive; end body with the Co-Authored-By line
git push
git branch -D auto/<slug>
```
Co-author line for commit bodies:
`Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

Then verify the production deploy of the new master SHA:
```bash
sha=$(git rev-parse --short HEAD)
# poll up to ~5 min:
gh api repos/sebastianlevinz-rgb/visitisrael.site/commits/master/status --jq '.state'
```
- `state == success` (Vercel) → done; record success.
- `state == failure` → **auto-revert**: `git revert --no-edit HEAD && git push`; send PushNotification ("prod deploy failed for <item>, reverted"); JOURNAL the incident with the failing deployment URL; mark item `blocked`.
- still `pending` after ~5 min → leave it; next iteration's start-check will confirm. Do not merge anything else until confirmed.

---

## 6. UPDATE MEMORY (every iteration, even research/review/abandon)

- `STATE.md`: bump `iteration`, set `lastMode`, `lastItem`, `lastResult`, `higgsfieldSpent`, timestamp, and `nextRotationCategory`.
- `JOURNAL.md`: append one block: `## <ISO time> · iter N · <mode> · <item>` then 2–6 lines (what, gate result, merge SHA or abandon reason, prod-deploy result).
- `BACKLOG.md`: remove shipped item; add discovered items; update blocked notes.
- `DONE.md`: append shipped item (title + SHA + one-line value) so future iterations don't repeat it.
- `COMPETITORS.md`: append research findings (research mode).

End the turn. The cron fires the next iteration in ~2h; a fresh context will re-read this playbook and continue. Do not loop within a single turn.

---

## 7. Quick facts
- Stack: Astro 6 SSG, Tailwind v4, TS 6, Node 22. `pnpm` (v10). Content Layer (`glob()` + `render()`).
- Tests: `pnpm test:e2e` (Playwright; webServer runs `pnpm preview` on built dist — run `pnpm build` first).
- Repo: github.com/sebastianlevinz-rgb/visitisrael.site · master auto-deploys to Vercel prod.
- 6 existing tools: cost calculator, currency/tipping, packing list, region quiz, Leaflet map, build-your-trip. 14 guides, 63 attractions, 4 itineraries, 11 regions.
- Audit reports for ideas: `.audit/01..06` (gitignored). Competitor gaps: `.audit/06`.
