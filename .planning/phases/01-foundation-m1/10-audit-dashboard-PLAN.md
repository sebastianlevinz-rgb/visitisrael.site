---
phase: 01-foundation-m1
plan: 10
type: execute
wave: 7
depends_on:
  - 01-scaffold
  - 02-design-tokens
  - 03-photo-credits
  - 04-schema-baseline
  - 05-component-lib
  - 06-affiliate-helpers
  - 07-quality-profiles
  - 08-seo-config
  - 09-ner-detection
files_modified:
  - scripts/audit/run.mjs
  - scripts/audit/score.ts
  - scripts/audit/quality-gate.mjs
  - scripts/audit/rules/index.ts
  - scripts/audit/rules/AUD-001.ts
  - scripts/audit/rules/AUD-002.ts
  - scripts/audit/rules/AUD-003.ts
  - scripts/audit/rules/AUD-004.ts
  - scripts/audit/rules/AUD-005.ts
  - scripts/audit/rules/AUD-006.ts
  - scripts/audit/rules/AUD-007.ts
  - scripts/audit/rules/AUD-008.ts
  - scripts/audit/rules/AUD-009.ts
  - scripts/audit/rules/AUD-010.ts
  - scripts/audit/rules/AUD-011.ts
  - scripts/audit/rules/AUD-012.ts
  - scripts/audit/rules/AUD-013.ts
  - scripts/audit/rules/AUD-014.ts
  - scripts/audit/rules/AUD-015.ts
  - scripts/audit/rules/AUD-016.ts
  - scripts/audit/rules/AUD-017.ts
  - scripts/audit/rules/AUD-018.ts
  - scripts/audit/rules/AUD-019.ts
  - scripts/audit/rules/AUD-020.ts
  - scripts/audit/rules/AUD-021.ts
  - scripts/audit/rules/AUD-022.ts
  - scripts/audit/rules/AUD-023.ts
  - scripts/audit/rules/AUD-024.ts
  - scripts/audit/rules/AUD-025.ts
  - scripts/audit/rules/AUD-026.ts
  - scripts/audit/rules/AUD-027.ts
  - scripts/audit/rules/AUD-028.ts
  - scripts/audit/rules/AUD-029.ts
  - scripts/audit/rules/AUD-030.ts
  - scripts/audit/rules/AUD-031.ts
  - scripts/audit/rules/AUD-032.ts
  - scripts/audit/rules/AUD-033.ts
  - scripts/audit/rules/AUD-034.ts
  - app/[locale]/admin/audit/page.tsx
  - app/[locale]/admin/audit/[slug]/page.tsx
  - app/[locale]/admin/audit/quality-gate/page.tsx
  - app/api/admin/audit/route.ts
  - middleware.ts
  - lib/auth/basic.ts
  - scripts/audit/__tests__/rules.test.ts
  - tests/audit-fixtures/violations.html
  - tests/audit-fixtures/clean.html
  - scripts/audit_a11y_wrapper.mjs
  - package.json
autonomous: true
requirements:
  - AUD-01
  - AUD-02
  - AUD-04
  - AUD-05
  - A11Y-06
  - A11Y-07
must_haves:
  truths:
    - "34 audit rule files exist (AUD-001..AUD-034); each exports `{id, severity, description, scan(html, $, fm, lang)}`"
    - "`pnpm qa:audit` walks built HTML, applies all 34 rules, writes `data/audit-results.json` + `data/audit-results.html`"
    - "Each rule has at least one Vitest test using `tests/audit-fixtures/violations.html` synthetic HTML"
    - "`/admin/audit/` route renders sortable HTML view of the JSON (basic-auth via middleware)"
    - "`/admin/audit/quality-gate/` route runs `pnpm qa:quality-gate` and renders the report"
    - "`pnpm qa:quality-gate` writes `data/quality-gate-pass.md` OR `data/quality-gate-failure.md`; exits non-zero on failure"
    - "Per-page score 0-100 using detected profile from plan 07"
    - "axe-core CI gate runs over sample pages and surfaces violations as severity=critical in audit-results"
    - "`audit_a11y.py` from skills/israeli-accessibility-compliance is invoked via wrapper script and results merged"
    - "Basic auth middleware blocks `/admin/*` without `ADMIN_USER/ADMIN_PASS` correct"
    - "AUD-04 pre-commit hook fires on a violation fixture (verifies plan 01 hooks still active end-to-end)"
  artifacts:
    - path: "scripts/audit/run.mjs"
      provides: "Orchestrator: walks built HTML, applies rules, computes scores, writes JSON+HTML"
      contains: "cheerio"
    - path: "scripts/audit/quality-gate.mjs"
      provides: "Quality Gate report generator — writes pass/failure MD"
      contains: "quality-gate-pass.md"
    - path: "app/[locale]/admin/audit/page.tsx"
      provides: "RSC dashboard rendering audit-results.json"
      contains: "audit-results"
    - path: "middleware.ts"
      provides: "Basic-auth for /admin/* + 301 redirects + i18n"
      contains: "WWW-Authenticate"
    - path: "scripts/audit/rules/"
      provides: "34 rule files with consistent scan() interface"
      contains: "scan"
  key_links:
    - from: "scripts/audit/run.mjs"
      to: "scripts/audit/profiles (plan 07)"
      via: "detectProfile + profiles[id] for scoring"
      pattern: "detectProfile"
    - from: "scripts/audit/run.mjs"
      to: "data/ner-results.json (plan 09)"
      via: "merges NER suggestions into per-page issue list"
      pattern: "ner-results"
    - from: "scripts/audit/run.mjs"
      to: "scripts/audit/rules/*.ts"
      via: "iterates all 34 rules per page"
      pattern: "rules.map"
    - from: "scripts/audit/quality-gate.mjs"
      to: "data/audit-results.json + data/lighthouse-results.json"
      via: "evaluates 10 Quality Gate criteria"
      pattern: "ten criteria"
---

<objective>
Stand up the hybrid build-time scanner + RSC route at `/admin/audit/` that runs all 34 audit rules (AUD-001..AUD-034) against built HTML, computes per-page 0-100 score using plan 07's 5 quality profiles, merges NER suggestions from plan 09, integrates `audit_a11y.py` from `israeli-accessibility-compliance` skill, runs axe-core in CI, persists JSON+HTML, and ships the `AUD-05` Quality Gate report generator that writes `data/quality-gate-{pass|failure}.md`. Add basic-auth middleware for `/admin/*`.

Purpose: The audit dashboard is the engine of the Quality Gate hard stop between Phase 2 and Phase 3. Without this in place, the Quality Gate has no scoring substrate. Plan 11 (Lighthouse CI) then provides the deploy-blocking 3-run-median assertions; together they form the complete gate.

Output: 34 rule files + orchestrator + scoring + Quality Gate generator + RSC dashboard + basic-auth middleware + axe-core CI + `audit_a11y.py` integration + violation/clean HTML fixtures + Vitest tests.
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
@.planning/phases/01-foundation-m1/04-schema-baseline-SUMMARY.md
@.planning/phases/01-foundation-m1/06-affiliate-helpers-SUMMARY.md
@.planning/phases/01-foundation-m1/07-quality-profiles-SUMMARY.md
@.planning/phases/01-foundation-m1/08-seo-config-SUMMARY.md
@.planning/phases/01-foundation-m1/09-ner-detection-SUMMARY.md
@.planning/research/PITFALLS.md
@.planning/research/ARCHITECTURE.md
@.agents/skills/israeli-accessibility-compliance/SKILL.md
@.agents/skills/israeli-accessibility-compliance/references/is-5568.md
@.agents/skills/accessibility/SKILL.md

<rules_table>
Per PITFALLS §6 (AUD-001..AUD-034). All 34 rules MUST be implemented. Rule definitions:

| Rule | Severity | Description |
|------|----------|-------------|
| AUD-001 | Critical | Regex `/#[0-9A-Fa-f]{3,8}\b/` outside `tailwind.config.ts` or `app/globals.css` |
| AUD-002 | Critical | Partner-domain href without helper wrapper (uses lib/seo/naming patterns) |
| AUD-003 | Critical | `<Image>` whose `src` has no entry in `data/photo-credits.json` |
| AUD-004 | Critical | Image file width <1200px (Sharp probe at build time — output saved) |
| AUD-005 | Major | Image without srcset (or `<Image>` without `sizes`) |
| AUD-006 | Major | H1 of sub-destination contains region head-keyword without entity qualifier |
| AUD-007 | Major | HE/EN page word-count ratio outside [0.85, 1.40] |
| AUD-008 | Critical | Page HTML pre-hydration missing H1 OR primary CTA href |
| AUD-009 | Critical | Page with affiliate link missing visible disclosure within first viewport-height (DOM-precedence check) |
| AUD-010 | Major | Affiliate URL returns 4xx/5xx in weekly health check (deferred to Phase 6 cron; rule stub) |
| AUD-011 | Major | Geo-tracked conversion-rate anomaly (deferred to Phase 6 monitoring; rule stub) |
| AUD-012 | Major | LCP element with `loading="lazy"` |
| AUD-013 | Major | Third-party blocking time >250ms (consumes Lighthouse JSON from plan 11) |
| AUD-014 | Major | More than 6 external `<script>` tags |
| AUD-015 | Major | `<iframe>` or partner widget without explicit width/height/aspect-ratio |
| AUD-016 | Minor | Page `lastReviewed` > 9 months (read from frontmatter) |
| AUD-017 | Major | Regex `\bWailing Wall\b` — use Western Wall (consumes lib/seo/naming) |
| AUD-018 | Major | Regex `\b(Judea and Samaria\|occupied territories)\b` (consumes lib/seo/naming) |
| AUD-019 | Minor | First-paragraph Temple Mount mention without paired "Haram al-Sharif" (consumes lib/seo/naming) |
| AUD-020 | Major | Bethlehem/Hebron/Jericho page missing `administrativeStatus` frontmatter (consumes lib/seo/naming) |
| AUD-021 | Major | `OpeningHoursSpecification` schema without paired "subject to holidays" note |
| AUD-022 | Minor | Hardcoded USD adjacent to ILS in MDX |
| AUD-023 | Minor | URL with Gregorian year in slug missing canonical to evergreen page |
| AUD-024 | Major | Hebrew page title containing Latin chars outside `<bdo dir="ltr">` wrapper |
| AUD-025 | Minor | Ktiv chaser variant detected against ktiv-maleh dictionary |
| AUD-026 | Critical | Image of restricted religious site without `restrictedSiteAcknowledgment` (consumes lib/photo-credits-schema) |
| AUD-027 | Critical | `/he/accessibility-statement` page missing OR `<html>` missing `lang`+`dir` |
| AUD-028 | Critical | Footer missing link to accessibility-statement |
| AUD-029 | Major | Hebrew form `<input required>` without Hebrew `role="alert"` sibling |
| AUD-030 | Major | className using physical CSS direction props (pl-, pr-, ml-, mr-, left-, right-) |
| AUD-031 | Major | Partner helper unit test missing Israel-destination fixture (read tests/ to verify) |
| AUD-032 | Major | Hreflang reference to lang without registered route (no fr-IL hreflang despite content/fr) |
| AUD-033 | Major | Page missing one of: `<link rel="canonical">`, JSON-LD schema, meta description, OG tags, hreflang |
| AUD-034 | Major | Lighthouse mobile 3-run-median below profile threshold (consumes data/lighthouse-results.json) |
</rules_table>

<interfaces>
Consumed:
- `lib/photo-credits-schema.ts` (plan 03) — for AUD-003, AUD-004, AUD-026
- `lib/schema/` (plan 04) — for AUD-021, AUD-033
- `lib/seo/naming.ts` (plan 08) — for AUD-017..AUD-020
- `lib/seo/canonical.ts` (plan 04) — for AUD-033
- `scripts/audit/profiles/` (plan 07) — for scoring
- `data/ner-results.json` (plan 09) — merged into per-page issues
- `data/lighthouse-results.json` (plan 11; populated AFTER this plan, but consumed by AUD-034)

Published:
- `data/audit-results.json` — consumed by `/admin/audit/` RSC + Quality Gate
- `data/quality-gate-pass.md` OR `data/quality-gate-failure.md` — Phase 2.6 gate
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Build 34 rule files with scan() interface + scoring helper + violation/clean fixtures</name>
  <files>scripts/audit/rules/AUD-001.ts through scripts/audit/rules/AUD-034.ts, scripts/audit/rules/index.ts, scripts/audit/score.ts, tests/audit-fixtures/violations.html, tests/audit-fixtures/clean.html, scripts/audit/__tests__/rules.test.ts, package.json</files>
  <action>
Install cheerio if not yet: `pnpm add -D cheerio`.

Per RESEARCH.md §1.9 verbatim and PITFALLS §6 (34 rules table):

Create each rule file `scripts/audit/rules/AUD-XXX.ts` with this consistent interface:
```ts
import type { CheerioAPI } from 'cheerio';

export interface Issue {
  rule: string;
  severity: 'minor' | 'major' | 'critical';
  message: string;
  selector?: string;
}

export interface Rule {
  id: string;
  severity: 'minor' | 'major' | 'critical';
  description: string;
  scan(html: string, $: CheerioAPI, fm: Record<string, unknown>, lang: 'he' | 'en'): Issue[];
}

export default {
  id: 'AUD-017',
  severity: 'major',
  description: 'No "Wailing Wall" — use "Western Wall" or pair-name with "Kotel".',
  scan(html) {
    if (/\bWailing Wall\b/.test(html)) {
      return [{ rule: 'AUD-017', severity: 'major', message: 'Found "Wailing Wall" — use "Western Wall".' }];
    }
    return [];
  },
} satisfies Rule;
```

Implement each of 34 rules per the PITFALLS table. Notable specifics:

- **AUD-001 (raw hex)**: regex against `html` body, EXCLUDING `<style>` blocks that are Tailwind-generated; check is best-effort — primary enforcement is at lint time. Real signal: look for `style="color:#..."` inline attributes.
- **AUD-002 (raw partner URL)**: regex partner domains against `<a href>` attributes; helpers in `lib/affiliate/` produce URLs in built HTML, so the rule should be SMART — only flag when an `<a>` appears with a partner domain BUT the link has no `data-aff-disclosed="true"` attribute (which our `<AffiliateCard>` always sets).
- **AUD-003 (undocumented image)**: load `data/photo-credits.json`; for each `<img src>` or `next/image` rendered src in HTML, check ledger. Reuses logic from `scripts/qa/check-credits.mjs`.
- **AUD-004 (image width <1200)**: requires Sharp probe at build time; emit issue when ledger.width < 1200 OR actual file < 1200. Already enforced by `scripts/qa/check-credits.mjs` — this rule emits the result for dashboard display.
- **AUD-005 (no srcset)**: scan `<img>` tags; if no `srcset` attribute, emit issue. `next/image` always emits one — so this only fires on raw `<img>`.
- **AUD-008 (pre-hydration missing H1 or CTA)**: parse HTML, find `<h1>` count (must be 1); find primary CTA (data-cta="primary" attribute) — emit issue if missing.
- **AUD-009 (FTC disclosure DOM-precedence)**: find first `<a data-aff-disclosed>` and check `<AffiliateDisclosure>`-rendered element (look for `[data-component="affiliate-disclosure"]`) precedes it within the same viewport (~first 1000px of HTML).
- **AUD-012 (LCP lazy)**: parse `<img>` first-paint candidates (those above the fold); flag if `loading="lazy"` set.
- **AUD-013 (third-party blocking)**: reads from Lighthouse JSON; in Phase 1, may produce stub "deferred until Lighthouse run".
- **AUD-014 (>6 external scripts)**: count `<script src="https://...">` blocks.
- **AUD-017..020 (Israel-specific naming)**: use `lib/seo/naming.ts` regexes + helpers; AUD-020 reads frontmatter for administrativeStatus.
- **AUD-026 (restricted-site image)**: cross-reference `data/photo-credits.json` entries with subjectType ∈ restricted set; emit if `restrictedSiteAcknowledgment` missing (mirrors plan 03 Zod validation but emits to dashboard).
- **AUD-027 (lang/dir + statement page)**: check `<html lang dir>` on page; check accessibility-statement exists in built output.
- **AUD-028 (footer link)**: scan `<footer>` for `<a href>` matching `/accessibility-statement` (or `/he/accessibility-statement`).
- **AUD-030 (physical utility classes)**: regex `\b(ml-|pr-|text-left|border-l)` in built className strings.
- **AUD-031 (helper test Israel fixture)**: read `lib/affiliate/__tests__/*.test.ts`; assert each contains "Jerusalem" or "Tel Aviv" or "Israel" — read filesystem at scan time.
- **AUD-032 (hreflang reciprocity)**: parse `<link rel="alternate" hreflang>`; assert no fr-IL emitted; assert reciprocity.
- **AUD-033 (canonical+schema+meta+OG+hreflang)**: check presence of all 5 on every page.
- **AUD-034 (Lighthouse threshold)**: reads `data/lighthouse-results.json` (plan 11 populates); produces stub "deferred until lhci runs" if file missing.

For DEFERRED rules (AUD-010 weekly health, AUD-011 geo anomaly, AUD-013/034 Lighthouse-dependent at end of Phase 1), the scan() function returns:
```ts
return [{ rule: 'AUD-010', severity: 'major', message: 'Deferred: weekly health monitor (Phase 6)' }];
```
(emits an informational entry so the dashboard knows the rule was attempted)

Create `scripts/audit/rules/index.ts`:
```ts
import AUD_001 from './AUD-001';
import AUD_002 from './AUD-002';
// ... all 34
export const rules = [AUD_001, AUD_002, /* ... */, AUD_034] as const;
```

Create `scripts/audit/score.ts`:
```ts
import type { ProfileSpec } from '../audit/profiles/types';
import type { Issue } from './rules/AUD-001';  // (Issue type is canonical across rules)

export function computeScore(issues: Issue[], spec: ProfileSpec): number {
  let score = 100;
  for (const issue of issues) {
    const weight = spec.weights.find(w => w.rule === issue.rule);
    if (weight) score -= weight.weight;
  }
  return Math.max(0, score);
}
```

Create `tests/audit-fixtures/violations.html` — synthetic HTML deliberately containing ONE violation per rule (or as many as fit):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Violations Fixture (no canonical, no schema)</title>
</head>
<body>
  <div style="color: #abc">Inline hex — AUD-001</div>
  <a href="https://www.booking.com/x">Raw partner URL — AUD-002</a>
  <img src="/images/uncredited.jpg" loading="lazy" />  <!-- AUD-003, AUD-005, AUD-012 -->
  <p>Visit the Wailing Wall</p>  <!-- AUD-017 -->
  <p>Explored Judea and Samaria</p>  <!-- AUD-018 -->
  <p>Visit the Temple Mount alone</p>  <!-- AUD-019 — no paired naming nearby -->
  <div class="ml-4 pr-2 text-left">Physical utility — AUD-030</div>
  <iframe src="https://example.com" />  <!-- AUD-015 — no width/height -->
  <!-- AUD-033 — no canonical, no schema, no meta description, no OG, no hreflang -->
</body>
</html>
```

Create `tests/audit-fixtures/clean.html` — minimal clean HTML that should pass all rules (canonical, schema, hreflang, lang+dir, etc.).

Create `scripts/audit/__tests__/rules.test.ts`:
- For each of 34 rules: feed `violations.html` (or rule-specific fixture); assert at least one Issue returned
- For each rule: feed `clean.html`; assert no Issues returned
- Skip deferred rules (AUD-010, AUD-011, AUD-013, AUD-034) — assert they return a "deferred" message issue (1 entry) for both fixtures

Add scripts to `package.json`: `"qa:audit": "tsx scripts/audit/run.ts"`, `"qa:quality-gate": "tsx scripts/audit/quality-gate.ts"`, `"qa:audit-a11y": "node scripts/audit_a11y_wrapper.mjs"`.

For tsx invocation: this plan converts `scripts/audit/run.mjs` to `scripts/audit/run.ts` since rules are .ts files. Same for `quality-gate.ts`.
  </action>
  <verify>
    <automated>pnpm test --run scripts/audit/__tests__/rules.test.ts &amp;&amp; pnpm typecheck</automated>
  </verify>
  <done>34 rule files exported; each has scan() interface; violations.html triggers each rule (or marks deferred for the 4 Lighthouse/cron-dependent); clean.html passes; typecheck clean.</done>
</task>

<task type="auto">
  <name>Task 2: Build orchestrator `scripts/audit/run.ts` + Quality Gate generator `scripts/audit/quality-gate.ts` + RSC dashboard routes</name>
  <files>scripts/audit/run.ts, scripts/audit/quality-gate.ts, app/[locale]/admin/audit/page.tsx, app/[locale]/admin/audit/[slug]/page.tsx, app/[locale]/admin/audit/quality-gate/page.tsx, app/api/admin/audit/route.ts</files>
  <action>
Per RESEARCH.md §1.9:

Create `scripts/audit/run.ts`:
```ts
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import { readFile, writeFile } from 'node:fs/promises';
import { rules } from './rules/index';
import { profiles, detectProfile } from './profiles/index';
import { computeScore } from './score';

interface PageResult { slug: string; lang: 'he' | 'en'; profile: string; score: number; issues: Issue[]; }

function inferLang(file: string): 'he' | 'en' {
  return file.includes('/en/') || file.includes('/server/app/en/') ? 'en' : 'he';
}

function inferSlug(file: string): string {
  const m = file.match(/server\/app\/(?:en\/)?(.+?)\.html$/);
  return m?.[1] ?? 'index';
}

// Phase 1: limited content; Phase 2+ exercises this fully
const htmlFiles = await glob('.next/server/app/**/*.html');
const results: PageResult[] = [];

// Try to load NER results — if absent, ignore
let ner: any[] = [];
try { ner = JSON.parse(await readFile('data/ner-results.json', 'utf8')); } catch {}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const $ = cheerio.load(html);
  const slug = inferSlug(file);
  const lang = inferLang(file);

  // Read frontmatter from Velite output if available
  let fm: any = {};
  // ... lookup from .velite/

  const profileId = (() => {
    try { return detectProfile(fm); } catch { return 'UTILITY'; }
  })();
  const spec = profiles[profileId];

  const issues = [];
  for (const rule of rules) {
    try {
      const found = rule.scan(html, $, fm, lang);
      issues.push(...found);
    } catch (e) {
      issues.push({ rule: rule.id, severity: 'critical', message: `Rule scan error: ${(e as Error).message}` });
    }
  }

  // Merge NER suggestions
  const nerForPage = ner.find((n: any) => n.slug === slug && n.lang === lang);
  if (nerForPage?.mentions) {
    for (const m of nerForPage.mentions) {
      if (m.suggestedAction !== 'no-action') {
        issues.push({ rule: 'NER', severity: 'minor', message: `${m.entity} (${m.class}): ${m.suggestedAction}` });
      }
    }
  }

  const score = computeScore(issues, spec);
  results.push({ slug, lang, profile: profileId, score, issues });
}

await writeFile('data/audit-results.json', JSON.stringify(results, null, 2));

// Also write a static HTML view (fallback if RSC route fails)
const html = `<html><body><h1>Audit Results</h1><pre>${JSON.stringify(results, null, 2)}</pre></body></html>`;
await writeFile('data/audit-results.html', html);

console.log(`Audit OK: ${results.length} pages, ${results.reduce((s, r) => s + r.issues.length, 0)} issues.`);
```

Create `scripts/audit/quality-gate.ts` per RESEARCH §1.9:

Reads `data/audit-results.json` + `data/lighthouse-results.json` (may be empty), evaluates 10 Quality Gate criteria from ROADMAP.md, writes:
- `data/quality-gate-pass.md` if all 10 pass — markdown table with each criterion + result
- `data/quality-gate-failure.md` if ANY fails — markdown table + suspected cause + proposed fix

10 criteria from ROADMAP:
1. Lighthouse mobile (3-run-median) ≥0.90 perf / ≥0.95 a11y / ≥0.95 best-practices / =1.00 SEO
2. Audit dashboard per-page score ≥85
3. Critical bugs = 0
4. Affiliate coverage ≥80% applicable
5. EN+HE parity = 100%
6. Credited images ≥1200px = 100%
7. Raw hex codes = 0
8. Hreflang valid (bidirectional + x-default)
9. Schema validated = 100%
10. Broken internal links = 0

Exits non-zero on failure (blocks any phase-advance script).

Create `app/[locale]/admin/audit/page.tsx` (RSC):
```tsx
import { readFile } from 'node:fs/promises';

export const metadata = { robots: { index: false, follow: false } };

export default async function AuditPage() {
  let results: any[] = [];
  try { results = JSON.parse(await readFile('data/audit-results.json', 'utf8')); } catch {}

  return (
    <main>
      <h1>Audit Dashboard</h1>
      <p>{results.length} pages scanned</p>
      <table>
        <thead><tr><th>Slug</th><th>Lang</th><th>Profile</th><th>Score</th><th>Issues</th></tr></thead>
        <tbody>
          {results.map(r => (
            <tr key={`${r.slug}-${r.lang}`}>
              <td><a href={`/admin/audit/${r.slug}`}>{r.slug}</a></td>
              <td>{r.lang}</td>
              <td>{r.profile}</td>
              <td className={r.score < 85 ? 'text-[var(--color-danger)]' : ''}>{r.score}</td>
              <td>{r.issues.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
```

Create `app/[locale]/admin/audit/[slug]/page.tsx` — per-page drill-down showing each issue with severity, rule, message.

Create `app/[locale]/admin/audit/quality-gate/page.tsx` — runs `pnpm qa:quality-gate` via server-side child_process, renders the resulting markdown file.

Create `app/api/admin/audit/route.ts`:
```ts
export const dynamic = 'force-dynamic';
import { readFile } from 'node:fs/promises';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await readFile('data/audit-results.json', 'utf8');
  return new NextResponse(data, { headers: { 'content-type': 'application/json' } });
}
```

Note: All `/admin/*` routes use noindex meta and basic-auth (added in next task).
  </action>
  <verify>
    <automated>pnpm build &amp;&amp; pnpm qa:audit &amp;&amp; test -f data/audit-results.json &amp;&amp; pnpm qa:quality-gate || true</automated>
  </verify>
  <done>Orchestrator writes `data/audit-results.json`; Quality Gate generator writes pass/failure MD; RSC dashboard renders JSON; drill-down works; API route returns JSON.</done>
</task>

<task type="auto">
  <name>Task 3: Add basic-auth middleware + axe-core CI + audit_a11y.py wrapper + AUD-04 hook verification</name>
  <files>middleware.ts, lib/auth/basic.ts, scripts/audit_a11y_wrapper.mjs, package.json, scripts/audit/__tests__/rules.test.ts</files>
  <action>
Per RESEARCH.md §1.9 "Basic-auth middleware":

Update `middleware.ts` to add basic-auth on `/admin/*` BEFORE the i18n middleware:

```ts
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n-config';

const intl = createMiddleware({ locales: [...locales], defaultLocale, localePrefix: 'as-needed', localeDetection: true });

const REDIRECTS: Record<string, string> = {};

function verifyBasicAuth(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const expected = 'Basic ' + Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString('base64');
  return auth === expected;
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. 301 redirects (plan 08)
  if (REDIRECTS[path]) {
    return NextResponse.redirect(new URL(REDIRECTS[path], req.url), 301);
  }

  // 2. Admin basic-auth
  if (path.startsWith('/admin') || path.startsWith('/en/admin') || path.startsWith('/api/admin')) {
    if (!verifyBasicAuth(req)) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }
  }

  // 3. i18n
  return intl(req);
}

export const config = {
  matcher: ['/((?!_next|api(?!/admin)|favicon.ico|images|.*\\..*).*)'],
};
```

Create `lib/auth/basic.ts` with the helper if not already inline:
```ts
import type { NextRequest } from 'next/server';

export function verifyBasicAuth(req: NextRequest): boolean {
  // (same as middleware inline) — exports for testing
}
```

Install axe-core: `pnpm add -D @axe-core/playwright` or `axe-core` for CLI:
`pnpm add -D axe-core puppeteer`

Create script to run axe over sample pages (extend qa:audit-a11y):
- Boot dev server
- Use puppeteer + @axe-core to scan `/admin/components` and `/admin/tokens` and `/`
- Write violations to a part of `data/audit-results.json` (severity: critical for any violations)

For Phase 1 simplicity: ship the wrapper that documents the CI invocation, even if axe-core runs in CI only (not pre-commit):

Create `scripts/audit_a11y_wrapper.mjs` per RESEARCH.md §1.10 (deferred to Lighthouse plan but the wrapper is appropriate here so plan 10's audit dashboard can merge IS-5568-specific results):

```js
#!/usr/bin/env node
// scripts/audit_a11y_wrapper.mjs — invokes audit_a11y.py from israeli-accessibility-compliance skill
// Runs against preview URL or localhost in CI
import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

const url = process.env.AUDIT_TARGET_URL || 'http://localhost:3000';
const result = spawnSync('python3', [
  '.agents/skills/israeli-accessibility-compliance/scripts/audit_a11y.py',
  '--url', url,
  '--output', 'json',
], { encoding: 'utf8' });

if (result.status !== 0) {
  console.error('audit_a11y.py failed:', result.stderr);
  await writeFile('data/a11y-il-results.json', JSON.stringify({ error: result.stderr, status: 'fail' }, null, 2));
  process.exit(0);  // don't crash CI — surface to dashboard
}

await writeFile('data/a11y-il-results.json', result.stdout);
console.log('IS-5568 a11y check OK (results in data/a11y-il-results.json).');
```

Note: `audit_a11y.py` requires Python 3.9+ + Selenium + axe.min.js — documented in `data/dev-prereqs.md` (plan 01).

**AUD-04 hook verification:**

Add a test inside `scripts/audit/__tests__/rules.test.ts` (the existing test file from task 1) that:
- Simulates `lint-staged` invocation against the `violations.html` fixture
- Verifies that `.husky/pre-commit` exists, contains `lint-staged`, and that lint-staged.config.js references `scripts/qa/check-credits.mjs`, `scripts/qa/validate-schema.mjs`, etc.
- This is a "hook present" assertion — actually running git commit against fixtures is a manual verification per VALIDATION.md (Manual-Only Verifications table)

Update `.env.example` to confirm:
```
ADMIN_USER=
ADMIN_PASS=
```
(Already added in plan 01.)
  </action>
  <verify>
    <automated>pnpm build &amp;&amp; pnpm typecheck &amp;&amp; pnpm test --run scripts/audit/__tests__/rules.test.ts</automated>
  </verify>
  <done>Basic-auth middleware blocks /admin/* without correct env; lib/auth/basic.ts exports helper; axe-core + audit_a11y.py wrapper scripts present; AUD-04 hook verification test passes; all paths smoke-tested in build.</done>
</task>

</tasks>

<verification>
End of plan 10 checks:

1. **AUD-01**: `pnpm qa:audit` runs 34 rules against built HTML; `/admin/audit/` route renders results; basic-auth blocks unauthenticated access.
2. **AUD-02**: Per-page score 0-100 using detected profile from plan 07.
3. **AUD-04**: Pre-commit hooks verified via test; lint-staged config references all relevant validators.
4. **AUD-05**: `pnpm qa:quality-gate` writes pass/failure MD with 10-criterion result; exits non-zero on failure.
5. **A11Y-06**: axe-core CI gate scaffolded; runs over sample pages.
6. **A11Y-07**: `! grep -rE '(accessibe\.com|userway\.org|equalweb\.com|audioeye\.com)' src/ public/` returns 0 matches.
7. `audit_a11y.py` wrapper exists; documented prereqs in `data/dev-prereqs.md`.
8. 34 rule unit tests pass against violation/clean fixtures.
</verification>

<success_criteria>
- 34 rule files (AUD-001..AUD-034) with consistent scan() interface
- Orchestrator + scoring + Quality Gate generator
- `/admin/audit/` RSC dashboard with index + drill-down + Quality Gate page
- Basic-auth middleware (works on Vercel Hobby)
- axe-core CI + `audit_a11y.py` IS-5568 wrapper
- VALIDATION rows AUD-01, AUD-02, AUD-04, AUD-05, A11Y-06, A11Y-07 all green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/10-audit-dashboard-SUMMARY.md` documenting: 34 rules wired, dashboard URL, Quality Gate command, basic-auth config, axe-core + audit_a11y integration points.
</output>
