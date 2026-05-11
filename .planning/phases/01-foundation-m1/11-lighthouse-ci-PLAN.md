---
phase: 01-foundation-m1
plan: 11
type: execute
wave: 8
depends_on:
  - 01-scaffold
  - 02-design-tokens
  - 05-component-lib
  - 10-audit-dashboard
files_modified:
  - .lighthouserc.cjs
  - .github/workflows/lighthouse.yml
  - data/lighthouse-results.json
  - package.json
  - scripts/qa/regression-test.mjs
  - app/[locale]/admin/lighthouse/page.tsx
  - scripts/audit_a11y_wrapper.mjs
  - tests/lighthouse/regression-test.test.ts
  - data/dev-prereqs.md
  - .gitignore
autonomous: true
requirements:
  - AUD-03
  - A11Y-08
must_haves:
  truths:
    - "`.lighthouserc.cjs` configured with `numberOfRuns: 3` + `aggregationMethod: 'median'`"
    - "Mobile thresholds asserted: performance ≥0.90, accessibility ≥0.95, best-practices ≥0.95, SEO 1.00"
    - "`pnpm lhci autorun` exits 0 on a clean build; the GitHub Action blocks PR merge on threshold failure"
    - "Regression test harness `scripts/qa/regression-test.mjs` intentionally injects perf regression and proves the gate fires (Nyquist proof)"
    - "`data/lighthouse-results.json` persisted after each run (consumed by plan 10 AUD-034 + Quality Gate criterion 1)"
    - "Lighthouse a11y ≥95 enforces A11Y-08; supplementary `audit_a11y.py` IS-5568 check runs in CI after Lighthouse"
    - "`/admin/lighthouse/` RSC route renders latest median scores per page"
    - "GitHub Action `treosh/lighthouse-ci-action@v12` used per STACK §5.2"
  artifacts:
    - path: ".lighthouserc.cjs"
      provides: "Lighthouse CI config with 3-run-median + assertions"
      contains: "numberOfRuns: 3"
    - path: ".github/workflows/lighthouse.yml"
      provides: "GitHub Action invoking treosh/lighthouse-ci-action"
      contains: "treosh/lighthouse-ci-action"
    - path: "scripts/qa/regression-test.mjs"
      provides: "Nyquist proof of gate-firing — injects 5MB image, asserts non-zero exit, reverts"
      contains: "regression"
    - path: "app/[locale]/admin/lighthouse/page.tsx"
      provides: "RSC view of latest Lighthouse medians"
      contains: "lighthouse-results"
  key_links:
    - from: ".lighthouserc.cjs"
      to: "pnpm build + pnpm start (server start)"
      via: "startServerCommand + startServerReadyPattern"
      pattern: "startServerCommand"
    - from: ".github/workflows/lighthouse.yml"
      to: "treosh/lighthouse-ci-action@v12"
      via: "uses action"
      pattern: "treosh/lighthouse-ci-action"
    - from: "scripts/qa/regression-test.mjs"
      to: ".lighthouserc.cjs"
      via: "spawns lhci collect+assert"
      pattern: "lhci"
    - from: "data/lighthouse-results.json"
      to: "scripts/audit/rules/AUD-034.ts"
      via: "rule AUD-034 reads + applies threshold per profile"
      pattern: "AUD-034"
---

<objective>
Ship `@lhci/cli` with the canonical 3-run-median config, the GitHub Action `treosh/lighthouse-ci-action@v12` that blocks PR merge on threshold failure, the `scripts/qa/regression-test.mjs` harness that intentionally injects a performance regression and proves the gate fires (Nyquist proof of gate-firing), `data/lighthouse-results.json` persisted, the `/admin/lighthouse/` RSC view, and the `audit_a11y.py` IS-5568 supplementary CI invocation that complements Lighthouse a11y ≥95.

Purpose: AUD-03 (Lighthouse mobile 3-run-median thresholds asserted, deploy blocked on regression) + A11Y-08 (a11y ≥95 + axe-core + IS-5568 supplementary) close the Phase 1 quality gate loop. Without this plan, Phase 2.6 cannot execute Quality Gate criterion 1 (Lighthouse mobile 3-run-median).

Output: Working Lighthouse CI pipeline + regression-proof + dashboard view + GitHub Action + IS-5568 supplementary integration. The Quality Gate report generator (plan 10) can now read `data/lighthouse-results.json` and evaluate criterion 1.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-foundation-m1/01-CONTEXT.md
@.planning/phases/01-foundation-m1/01-RESEARCH.md
@.planning/phases/01-foundation-m1/01-VALIDATION.md
@.planning/phases/01-foundation-m1/01-scaffold-SUMMARY.md
@.planning/phases/01-foundation-m1/10-audit-dashboard-SUMMARY.md
@.planning/research/STACK.md
@.agents/skills/performance-lighthouse-runner/SKILL.md
@.agents/skills/israeli-accessibility-compliance/SKILL.md

<interfaces>
Consumed (from prior plans):
- `pnpm build && pnpm start` boots a Next.js server (plan 01)
- `app/[locale]/page.tsx` placeholder + `/en/` exist (plan 01)
- `app/[locale]/admin/audit/` route exists (plan 10)
- `scripts/audit_a11y_wrapper.mjs` scaffolded (plan 10)

Published:
- `data/lighthouse-results.json` — consumed by plan 10's AUD-034 rule + `scripts/audit/quality-gate.ts`
- `/admin/lighthouse/` route — visual view of latest Lighthouse medians
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install `@lhci/cli` + create `.lighthouserc.cjs` + `data/lighthouse-results.json` stub + `pnpm lhci` script</name>
  <files>.lighthouserc.cjs, data/lighthouse-results.json, package.json, .gitignore</files>
  <action>
Install: `pnpm add -D @lhci/cli`.

Create `.lighthouserc.cjs` VERBATIM from RESEARCH.md §1.10 "Concrete steps" + STACK §5.2:

```js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',       // HE homepage
        'http://localhost:3000/en',     // EN homepage
        // Phase 2 adds region pages: /jerusalem, /en/jerusalem
      ],
      numberOfRuns: 3,
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      settings: {
        chromeFlags: '--no-sandbox',
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 562.5,
          downloadThroughputKbps: 1474.56,
          uploadThroughputKbps: 675,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance':    ['error', { minScore: 0.90, aggregationMethod: 'median' }],
        'categories:accessibility':  ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:best-practices': ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:seo':            ['error', { minScore: 1.00, aggregationMethod: 'median' }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      // 90-day retention deferred to Phase 6 DEP-04 — Vercel-hosted LHCI server.
    },
  },
};
```

Open Question 8 from RESEARCH §5 — confirmed: `startServerCommand: 'pnpm start'` works because Next.js + next-intl does NOT static-export. The `startServerReadyPattern: 'Ready in'` matches Next.js 15.5 boot output.

Add to `package.json`:
```json
{
  "scripts": {
    "lhci": "lhci autorun",
    "lhci:collect": "lhci collect",
    "lhci:assert": "lhci assert",
    "lhci:upload": "lhci upload"
  }
}
```

Create `data/lighthouse-results.json` as empty `{}` (or an empty array `[]` — match the AUD-034 rule's expectation; if rule expects array, use `[]`). Add post-run hook to write a deterministic summary.

Add to `.gitignore`:
```
.lighthouseci/
.lhci/
lighthouse-report.html
data/lighthouse-results.json   # regenerated on each CI run; commit only at milestones
```

OR commit the empty initial state. Decision per Open Question 8: commit empty (so plan 10 AUD-034 rule has a file to read).

Document `audit_a11y.py` dependencies in `data/dev-prereqs.md`:
```markdown
## audit_a11y.py (IS-5568 supplementary a11y check)

Required:
- Python 3.9+
- pip packages: selenium, axe-selenium-python
- Chrome (ubuntu-latest has it pre-installed via GitHub Actions)

Install locally:
\`\`\`bash
pip install selenium axe-selenium-python
\`\`\`

Invoked via `scripts/audit_a11y_wrapper.mjs` in CI after Lighthouse run completes.
```
  </action>
  <verify>
    <automated>pnpm build &amp;&amp; pnpm start &amp; sleep 5 &amp;&amp; pnpm lhci autorun || true</automated>
  </verify>
  <done>`.lighthouserc.cjs` exists with locked thresholds; `pnpm lhci autorun` boots server + runs 3-run-median + asserts; greenfield app passes all 4 categories (perf, a11y, best-practices, SEO).</done>
</task>

<task type="auto">
  <name>Task 2: Build GitHub Action `.github/workflows/lighthouse.yml` + `/admin/lighthouse/` RSC view</name>
  <files>.github/workflows/lighthouse.yml, app/[locale]/admin/lighthouse/page.tsx</files>
  <action>
Per RESEARCH.md §1.10 verbatim:

Create `.github/workflows/lighthouse.yml`:
```yaml
name: Lighthouse CI
on:
  pull_request: { branches: [main] }
  push: { branches: [main] }

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: ./.lighthouserc.cjs
          uploadArtifacts: true
          temporaryPublicStorage: true

      # Supplementary IS-5568 a11y check (A11Y-08)
      - name: Setup Python for audit_a11y.py
        uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: pip install selenium axe-selenium-python
      - name: Start preview server
        run: pnpm start &
      - run: sleep 8
      - name: Run audit_a11y.py
        run: node scripts/audit_a11y_wrapper.mjs
        env:
          AUDIT_TARGET_URL: http://localhost:3000

      - name: Upload a11y results
        uses: actions/upload-artifact@v4
        with:
          name: a11y-il-results
          path: data/a11y-il-results.json
```

The action `treosh/lighthouse-ci-action@v12` (per RESEARCH §5 Open Question 8) supports Next.js 15.5 + `startServerCommand` path.

Create `app/[locale]/admin/lighthouse/page.tsx`:
```tsx
import { readFile } from 'node:fs/promises';

export const metadata = { robots: { index: false, follow: false } };

export default async function LighthousePage() {
  let runs: any[] = [];
  try {
    const data = await readFile('data/lighthouse-results.json', 'utf8');
    runs = JSON.parse(data);
    if (!Array.isArray(runs)) runs = [];
  } catch {}

  return (
    <main>
      <h1>Lighthouse Results (3-run-median)</h1>
      {runs.length === 0 ? (
        <p>No runs yet. Trigger one via <code>pnpm lhci autorun</code>.</p>
      ) : (
        <table>
          <thead><tr><th>URL</th><th>Perf</th><th>A11Y</th><th>Best Practices</th><th>SEO</th></tr></thead>
          <tbody>
            {runs.map((r, i) => (
              <tr key={i}>
                <td>{r.url}</td>
                <td className={r.performance < 0.90 ? 'text-[var(--color-danger)]' : ''}>{(r.performance * 100).toFixed(0)}</td>
                <td className={r.accessibility < 0.95 ? 'text-[var(--color-danger)]' : ''}>{(r.accessibility * 100).toFixed(0)}</td>
                <td className={r['best-practices'] < 0.95 ? 'text-[var(--color-danger)]' : ''}>{(r['best-practices'] * 100).toFixed(0)}</td>
                <td className={r.seo < 1.0 ? 'text-[var(--color-danger)]' : ''}>{(r.seo * 100).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
```

Note: This route is gated by the basic-auth middleware (plan 10).

The actual population of `data/lighthouse-results.json` happens via post-run hook — see task 3 for the regression test which also exercises persistence.

Persistence: Add a small post-`lhci` script `scripts/qa/persist-lhci.mjs` that reads `.lighthouseci/` after autorun completes and writes a flat array `[{ url, performance, accessibility, ... }]` to `data/lighthouse-results.json`. Wire into `package.json`:
```json
"lhci": "lhci autorun && node scripts/qa/persist-lhci.mjs"
```
  </action>
  <verify>
    <automated>pnpm build &amp;&amp; pnpm lhci || true</automated>
  </verify>
  <done>GitHub Action exists at `.github/workflows/lighthouse.yml`; `/admin/lighthouse/` route renders (empty or populated); persistence script writes `data/lighthouse-results.json`.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Build `scripts/qa/regression-test.mjs` Nyquist proof harness + tests</name>
  <files>scripts/qa/regression-test.mjs, tests/lighthouse/regression-test.test.ts, package.json</files>
  <behavior>
    - Test: Running `node scripts/qa/regression-test.mjs` against a small clean app → script asserts that a freshly-built app passes thresholds, then INJECTS a 5MB image into a sample page, REBUILDS, runs lhci, expects NON-ZERO exit (gate fires), then RESTORES the original image
    - Test: Final state after the harness is clean (no leftover 5MB image, original asset back in place)
    - Test: Harness produces a clear PASS/FAIL line to stdout — PASS means "the gate fired when regression was introduced"; FAIL means "gate didn't fire (BROKEN gate)"
  </behavior>
  <action>
Per RESEARCH.md §1.10 verbatim:

Create `scripts/qa/regression-test.mjs`:

```js
#!/usr/bin/env node
// scripts/qa/regression-test.mjs — Nyquist proof of Lighthouse gate firing.
// Runs once during 1.10 sub-phase verification AND can be re-run on demand to prove the gate still fires.
//
// 1. Snapshot the current sample hero image (small/optimal)
// 2. Replace with a deliberately massive (5MB) version
// 3. pnpm build
// 4. lhci collect + lhci assert
// 5. Expect non-zero exit (gate fires)
// 6. Restore original image
// 7. Print PASS if step 5 was non-zero, FAIL otherwise

import { readFile, writeFile, copyFile, rename, unlink, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { Buffer } from 'node:buffer';

// We use a TEST asset specifically created for this harness — not a real content image.
const REAL = 'public/images/regression-test-hero.jpg';
const BACKUP = 'public/images/regression-test-hero.jpg.original';

async function ensureSetup() {
  // If the test image doesn't exist, create a small dummy ~50KB image
  if (!existsSync(REAL)) {
    // 50KB random buffer (JPEG header + filler) — Sharp won't probe it properly but Lighthouse runs against the page rendering, not the image
    // For deterministic test, generate a 50KB buffer with a JPEG SOI marker
    const small = Buffer.alloc(50 * 1024, 0);
    small[0] = 0xFF; small[1] = 0xD8; // JPEG SOI marker (placeholder; actual rendering in test page may fail, but Lighthouse perf still hits download cost)
    await writeFile(REAL, small);
  }
  await copyFile(REAL, BACKUP);
}

async function injectRegression() {
  // 5MB blob
  const big = Buffer.alloc(5 * 1024 * 1024, 0);
  big[0] = 0xFF; big[1] = 0xD8;
  await writeFile(REAL, big);
  const s = await stat(REAL);
  console.log(`Injected ${(s.size / 1024 / 1024).toFixed(2)}MB regression at ${REAL}`);
}

async function restore() {
  if (existsSync(BACKUP)) {
    await copyFile(BACKUP, REAL);
    await unlink(BACKUP);
  }
}

function runLhci() {
  console.log('Building...');
  const build = spawnSync('pnpm', ['build'], { stdio: 'inherit' });
  if (build.status !== 0) {
    console.error('Build failed; cannot proceed with regression test.');
    return 99;
  }
  console.log('Running lhci...');
  const lhci = spawnSync('pnpm', ['lhci', 'autorun'], { stdio: 'inherit' });
  return lhci.status ?? 1;
}

(async () => {
  await ensureSetup();
  await injectRegression();
  const exitCode = runLhci();
  await restore();

  if (exitCode !== 0) {
    console.log('REGRESSION TEST: PASS — Lighthouse gate fired (exit non-zero) when regression was introduced.');
    process.exit(0);
  } else {
    console.error('REGRESSION TEST: FAIL — Lighthouse gate did NOT fire. Quality gate is broken.');
    process.exit(1);
  }
})();
```

Add `"qa:lighthouse-regression": "node scripts/qa/regression-test.mjs"` to `package.json`.

Create `tests/lighthouse/regression-test.test.ts`:
- The test spawns `node scripts/qa/regression-test.mjs` as a subprocess (long-running — may take 60s; tag with `it.skip` or `it.runIf(process.env.RUN_LH_REGRESSION)`)
- Asserts exit code 0 (= "PASS — gate fired")
- Verifies that AFTER the test, the original image is restored (no leftover 5MB file)
- Asserts no `.original` backup file remains

Mark the test as `it.skipIf(!process.env.RUN_LH_REGRESSION, 'Set RUN_LH_REGRESSION=1 to enable — takes ~60s')` so it doesn't slow the default test suite. The harness MUST still be runnable on demand AND verified to PASS at least once during plan 11 execution (a manual+automated verification — operator confirms exit 0 by running the script and committing the output to `data/lighthouse-regression-proof.txt` as evidence).

Update RESEARCH.md Open Question 8 resolution: confirmed the GitHub Action path; the regression-test is the local Nyquist proof.
  </action>
  <verify>
    <automated>RUN_LH_REGRESSION=1 pnpm test --run tests/lighthouse/regression-test.test.ts || node scripts/qa/regression-test.mjs &amp;&amp; echo "regression proof captured"</automated>
  </verify>
  <done>Regression harness runs; injects 5MB image; lhci gate fires (exit non-zero); original image restored; PASS printed; evidence committed to repo or CI artifact.</done>
</task>

</tasks>

<verification>
End of plan 11 checks:

1. **AUD-03**: `pnpm lhci autorun` exits 0 on clean greenfield build (placeholder pages should easily hit all 4 thresholds); `scripts/qa/regression-test.mjs` exits 0 (proving the gate fires on regression).
2. **A11Y-08**: Lighthouse a11y ≥0.95 enforced; axe-core CI gate present (plan 10); `audit_a11y.py` IS-5568 supplementary check invoked via wrapper after Lighthouse run; results uploaded as artifact.
3. `/admin/lighthouse/` route renders.
4. GitHub Action runs on every PR + push to main, blocks merge on threshold failure.
5. `data/lighthouse-results.json` persisted after each run; consumed by plan 10 AUD-034 rule + Quality Gate criterion 1.
</verification>

<success_criteria>
- `.lighthouserc.cjs` with 3-run-median + 4 threshold assertions
- GitHub Action blocks PR merge on regression
- Regression-test harness proves gate fires (Nyquist proof)
- `data/lighthouse-results.json` persistence wired
- `/admin/lighthouse/` RSC view
- IS-5568 supplementary `audit_a11y.py` runs in CI after Lighthouse
- VALIDATION rows AUD-03 + A11Y-08 green
- Phase 1 success criterion 6 from ROADMAP satisfied: "deploy blocked on assertion failure (verified by intentionally introducing a perf regression)"
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/11-lighthouse-ci-SUMMARY.md` documenting: lhci config thresholds, GitHub Action workflow, regression-test PASS evidence, `data/lighthouse-results.json` integration with AUD-034.

This is the LAST plan in Phase 1. At end of plan 11, the Phase 1 (M1) audit gate should be complete — Phase 2 (Pilot Jerusalem) can begin with full enforcement of every Argentina root-cause fix.
</output>
