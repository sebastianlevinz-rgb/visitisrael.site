# Plan 02-05 WIP — Accessibility Coordinator Checkpoint

**Status:** PAUSED at Task 3 — awaiting user input for 4 coordinator values
**Last activity:** 2026-05-11
**Resume target:** Task 4 (swap placeholders → real values → commit)

## What's in the working tree (uncommitted, blocked by pre-commit hook)

- `content/en/legal/accessibility-statement.mdx`
- `content/he/legal/accessibility-statement.mdx`

Both files contain full IS 5568 / WCAG 2.1 AA mandatory body content (commitment, standard reference, features, known limitations, feedback, last audit), with `accessibility_coordinator.{name,phone,email}` and `last_audit_date` set to `__REQUIRES_USER_INPUT__`. The pre-commit hook (`scripts/qa/check-no-placeholder.mjs`, wired in `.husky/pre-commit`) correctly rejects any commit that contains the sentinel.

## Required user input (4 values)

1. **Coordinator full name** — the named human accountable for accessibility complaints (e.g. "Sebastián Levinz" or the legal-entity contact).
2. **Coordinator phone** — international format, e.g. `+972-50-555-0100`. Must be reachable via `tel:` link and answered.
3. **Coordinator email** — e.g. `accessibility@visitisrael.site`. Must be reachable via `mailto:` and monitored.
4. **Last accessibility audit date** — ISO `YYYY-MM-DD`, within the last 90 days. For v1 launch, today's date (`2026-05-11`) is acceptable.

## Resolution flow when the user responds

1. Swap each of the 4 `__REQUIRES_USER_INPUT__` placeholders with the user's verbatim values in BOTH `content/en/legal/accessibility-statement.mdx` and `content/he/legal/accessibility-statement.mdx`.
2. Re-stage both files.
3. Commit — the pre-commit hook will now PASS because the sentinel string is gone.
4. Run `pnpm velite && pnpm build && pnpm qa:audit && pnpm test --run tests/content/coordinator-format.test.ts tests/content/accessibility-statement.test.ts` to confirm:
   - AUD-027 (statement-page presence) reports 0 violations
   - AUD-028 (footer accessibility-link presence) reports 0 violations site-wide
   - coordinator-format Vitest assertions pass (name + phone + email + date shape)
   - accessibility-statement Vitest assertions pass (IS 5568 mandatory sections)
5. Verify the pre-commit hook still fires correctly by attempting a deliberate placeholder reintroduction in a `.bak` file (then deleting the `.bak`).
6. Continue to Task 4 — un-skip the coordinator-format + accessibility-statement tests in their `it.skipIf(...)` gates (they auto-flip once entries exist).

## Files committed so far in this plan

- `89f8a81` — Wave 0: 7 route renderers + pre-commit hook + 3 Vitest test scaffolds
- `9d410c7` — Task 2: 8 legal MDX files (about/contact/privacy/affiliate-disclosure × EN+HE) + HUB-profile scoring for homepage + /regions/

## Files NOT YET committed

- `content/en/legal/accessibility-statement.mdx` (placeholder-blocked)
- `content/he/legal/accessibility-statement.mdx` (placeholder-blocked)

## Why the executor halted

The plan's `autonomous: false` flag and the Task 3 `type="checkpoint:human-action"` gate exist specifically because IS 5568 (Israeli Standard for Web Accessibility) and the Equal Rights for Persons with Disabilities Act mandate a NAMED accessibility coordinator with real, reachable contact details. Statutory exposure is up to 50,000 NIS per violation, with no requirement to prove harm.

Synthetic placeholder values that "look real" are NOT legally acceptable. The executor cannot invent these values; the user must supply them.
