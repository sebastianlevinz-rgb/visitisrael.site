---
phase: 02-pilot-region-jerusalem-m2
plan: 05
type: execute
wave: 5
depends_on:
  - 02-04-itinerary
files_modified:
  - app/[locale]/page.tsx
  - app/[locale]/regions/page.tsx
  - app/[locale]/about/page.tsx
  - app/[locale]/contact/page.tsx
  - app/[locale]/privacy/page.tsx
  - app/[locale]/affiliate-disclosure/page.tsx
  - app/[locale]/accessibility-statement/page.tsx
  - content/en/legal/about.mdx
  - content/en/legal/contact.mdx
  - content/en/legal/privacy.mdx
  - content/en/legal/affiliate-disclosure.mdx
  - content/en/legal/accessibility-statement.mdx
  - content/he/legal/about.mdx
  - content/he/legal/contact.mdx
  - content/he/legal/privacy.mdx
  - content/he/legal/affiliate-disclosure.mdx
  - content/he/legal/accessibility-statement.mdx
  - .husky/pre-commit
  - tests/content/legal-pages.test.ts
  - tests/content/coordinator-format.test.ts
  - tests/content/accessibility-statement.test.ts
  - app/sitemap.ts
autonomous: false
requirements:
  - CNT-06
  - CNT-07
  - A11Y-03
  - A11Y-04
  - A11Y-05
must_haves:
  truths:
    - 'Homepage renders at / (HE) and /en/ with RegionHero (Jerusalem) + region grid (Jerusalem live, 10 placeholders for Phase 3 regions)'
    - '/regions/ and /en/regions/ index pages render the 11 region cards (Jerusalem live, others stub or hidden)'
    - 'All 5 legal pages exist in both EN and HE (10 MDX files): about, contact, privacy, affiliate-disclosure, accessibility-statement'
    - 'Accessibility statement contains all IS 5568 sections: commitment, standard ref (IS 5568:2020 / WCAG 2.1 AA), features, known limitations, coordinator (name + phone + email), feedback (mailto), last-audit date'
    - 'Accessibility coordinator fields contain REAL values (not __REQUIRES_USER_INPUT__ placeholder) — user-supplied at the checkpoint task'
    - 'Pre-commit hook rejects any commit containing __REQUIRES_USER_INPUT__ in content/**/accessibility-statement*.mdx'
    - 'Footer of every Jerusalem page links to the locale-appropriate accessibility statement (AUD-028 = 0 violations site-wide)'
    - 'HE accessibility statement routes to /הצהרת-נגישות OR /he/accessibility-statement (fallback per CONTEXT.md)'
    - 'pnpm qa:audit reports UTILITY profile score ≥85 on all 5 legal pages × 2 langs; HUB profile score ≥85 on homepage + /regions/'
  artifacts:
    - path: 'app/[locale]/page.tsx'
      provides: 'Homepage RSC — RegionHero + region grid + 3 CTAs'
      min_lines: 50
    - path: 'app/[locale]/regions/page.tsx'
      provides: 'Regions index — 11-card grid (1 live + 10 stub)'
      min_lines: 30
    - path: 'app/[locale]/{about,contact,privacy,affiliate-disclosure,accessibility-statement}/page.tsx'
      provides: '5 legal-page route renderers consuming Velite Legal collection by slug'
    - path: 'content/{en,he}/legal/accessibility-statement.mdx'
      provides: 'IS 5568 Hatzaharat Negishut content with coordinator block + feedback + last-audit date'
      contains: 'accessibility_coordinator'
    - path: '.husky/pre-commit'
      provides: 'Augmented hook rejecting __REQUIRES_USER_INPUT__ in accessibility-statement MDX'
      contains: 'REQUIRES_USER_INPUT'
  key_links:
    - from: 'app/[locale]/page.tsx'
      to: '/<locale>/jerusalem/'
      via: 'next/link href on Jerusalem RegionCard'
      pattern: 'href=[''"]/jerusalem|href=[''"]/en/jerusalem'
    - from: 'components/layout/Footer.tsx'
      to: 'lib/seo/accessibility-link.ts → accessibilityStatementHref(locale)'
      via: 'Footer.tsx (Phase 1.8 wired); verified live on Jerusalem pages this plan'
      pattern: 'accessibilityStatementHref'
    - from: '.husky/pre-commit'
      to: 'content/**/accessibility-statement*.mdx'
      via: "grep -rE '__REQUIRES_USER_INPUT__'"
      pattern: 'REQUIRES_USER_INPUT'
---

<objective>
Plan 02-05 — Hub + Legal pages (Wave 5).

Author the homepage, `/regions/` index, and 5 legal pages × 2 langs (= 10 MDX + 7 route renderers). The Accessibility Statement (Hatzaharat Negishut) requires a NAMED ACCESSIBILITY COORDINATOR with real name + phone + email — this plan is **NOT autonomous** because the coordinator data is `__REQUIRES_USER_INPUT__` until the user provides values. The executor MUST halt at the coordinator task and surface a structured question.

Wave 0 work:

- Scaffold 7 route renderers (homepage + regions index + 5 legal page renderers)
- Augment `.husky/pre-commit` to reject `__REQUIRES_USER_INPUT__` placeholders in accessibility MDX (statutory defense-in-depth per IS 5568)
- Decision: HE accessibility statement slug — try `/הצהרת-נגישות` first; if next-intl rewrite is fragile, fall back to `/he/accessibility-statement` per CONTEXT.md authorization

Purpose: Ship CNT-06 (hubs) + CNT-07 (legal pages) + A11Y-03 (statement page) + A11Y-04 (named coordinator) + A11Y-05 (footer accessibility link verified live via AUD-028), closing the operational blocker from STATE.md (`Phase 2.5 operational blocker (Gap §6.7): Named accessibility coordinator must be designated`).

Output: 7 route renderers + 10 legal MDX files + 1 augmented pre-commit hook + 3 Vitest tests + sitemap updates.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/02-pilot-region-jerusalem-m2/02-CONTEXT.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-RESEARCH.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-VALIDATION.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-04-SUMMARY.md
@.planning/research/PITFALLS.md
@.agents/skills/israeli-accessibility-compliance/SKILL.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@velite.config.ts
@components/travel/RegionHero.tsx
@components/layout/Footer.tsx
@lib/seo/accessibility-link.ts
@scripts/audit/profiles/hub.ts
@scripts/audit/profiles/utility.ts
@scripts/audit/rules/AUD-027.ts
@scripts/audit/rules/AUD-028.ts

<interfaces>
<!-- Velite Legal collection contract + accessibility frontmatter shape + Footer wiring. -->

Velite Legal collection (from velite.config.ts):

```ts
type Legal = {
  lang: 'he' | 'en' | 'fr';
  title: string;
  description: string;
  slug: string;
  page: string; // semantic id: about, contact, privacy, affiliate-disclosure, accessibility-statement
  publishedAt?: string;
  updatedAt?: string;
  body: string;
};
import { legal } from '.velite';
```

The Accessibility Statement MDX uses EXTENDED frontmatter (Velite Zod is open by default — extra fields pass):

```yaml
---
lang: he
title: 'הצהרת נגישות — Discover Israel'
description: '...'
slug: accessibility-statement
page: accessibility-statement
accessibility_coordinator:
  name: __REQUIRES_USER_INPUT__
  phone: __REQUIRES_USER_INPUT__
  email: __REQUIRES_USER_INPUT__
last_audit_date: __REQUIRES_USER_INPUT__
---
```

Phase 1 already wired Footer.tsx → `accessibilityStatementHref(locale)` from lib/seo/accessibility-link.ts. The function returns:

- locale='en' → '/en/accessibility-statement'
- locale='he' → '/accessibility-statement' (will resolve to Hebrew slug via next-intl rewrite IF Hebrew slug routing works; else '/he/accessibility-statement')

AUD-027 (accessibility statement page presence): scans built HTML for the statement page in each locale. PASS if both /en/accessibility-statement AND /accessibility-statement (or HE equivalent) exist.

AUD-028 (footer accessibility-link presence): scans every built page for a footer link to the locale-correct accessibility statement. PASS if every page has the link.

Audit profiles:

- HUB (homepage + regions index): score ≥85; no affiliate minimum; AUD-009 (FTC inline) waived; AUD-027/028 required
- UTILITY (legal pages): score ≥85; no affiliate minimum; AUD-009 waived; AUD-027 + AUD-028 still required (footer link applies to ALL pages)

IS 5568 statement template (israeli-accessibility-compliance skill Step 6) — required sections:

1. Commitment / מחויבות לנגישות
2. Standard reference: IS 5568:2020 + WCAG 2.1 AA
3. Features implemented (keyboard nav, screen reader support, skip nav, alt text, 4.5:1 contrast)
4. Known limitations (be explicit; statute requires disclosure)
5. Accessibility coordinator (name + phone + email — real, NOT placeholder)
6. Feedback mechanism (mailto: or form)
7. Last audit date (within 90 days)
   </interfaces>

<placeholder_pause_pattern>

<!-- RESEARCH.md §6 — defense-in-depth executor pause flow. -->

Phase 2.5 cannot ship the accessibility statement until the user provides real coordinator data. Three detection layers:

1. **Pre-commit hook** (this plan augments it):

```bash
# In .husky/pre-commit:
if git diff --cached --name-only | grep -E 'content/.+/legal/accessibility-statement\.mdx$' > /dev/null; then
  if git diff --cached -U0 content/**/legal/accessibility-statement*.mdx | grep -E '\+.*__REQUIRES_USER_INPUT__' > /dev/null; then
    echo "BLOCKED: accessibility-statement contains __REQUIRES_USER_INPUT__ placeholder."
    echo "Real coordinator name + phone + email required per IS 5568 / A11Y-04."
    exit 1
  fi
fi
```

2. **Vitest test** `tests/content/coordinator-format.test.ts`:
   - Parses both EN+HE accessibility-statement MDX via `.velite/legal.json`
   - Asserts: name non-empty + != '**REQUIRES_USER_INPUT**'; phone matches `^\+?[0-9 \-()]{7,}$`; email matches RFC 5322 simple regex; last_audit_date is ISO date AND within last 90 days

3. **Executor pause flow** (the autonomous=false signal in this plan):
   When the coordinator-population task runs and finds the placeholder, executor HALTS and surfaces:

   ```
   ## PAUSED: Accessibility Coordinator Required (A11Y-04)

   Phase 2.5 plan task: populate `content/{en,he}/legal/accessibility-statement.mdx` frontmatter.

   IS 5568 / Equal Rights for Persons with Disabilities Act mandates a named accessibility coordinator with reachable contact. Statutory exposure: up to 50,000 NIS per violation.

   Please provide:
     1. Coordinator name (real person responsible for accessibility complaints):
     2. Phone (international format, e.g., +972-2-555-0100):
     3. Email (e.g., accessibility@visitisrael.site):
     4. Last accessibility audit date (ISO format, within 90 days, e.g., 2026-05-01):

   These values will be committed to the public site. Placeholder values are not legally acceptable.
   ```

   User responds → executor replaces the 4 placeholders in BOTH the EN and HE accessibility-statement MDX → commits.
   </placeholder_pause_pattern>
   </context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Scaffold 7 route renderers + augment pre-commit hook + write Vitest test scaffolds</name>
  <files>
    app/[locale]/page.tsx,
    app/[locale]/regions/page.tsx,
    app/[locale]/about/page.tsx,
    app/[locale]/contact/page.tsx,
    app/[locale]/privacy/page.tsx,
    app/[locale]/affiliate-disclosure/page.tsx,
    app/[locale]/accessibility-statement/page.tsx,
    .husky/pre-commit,
    tests/content/legal-pages.test.ts,
    tests/content/coordinator-format.test.ts,
    tests/content/accessibility-statement.test.ts
  </files>
  <action>
**1. Scaffold homepage `app/[locale]/page.tsx`** (Phase 1 may have a placeholder — verify with `Read` first; if it's a minimal placeholder, replace; if it has real structure, augment):

Async RSC:

- Read locale; render `<RegionHero image={jerusalemHero} title={…locale-aware…} priority />` (use the Jerusalem hero image from plan 02-01)
- Render a region grid: 11 cards. ONLY Jerusalem links to `/<locale>/jerusalem/`; the other 10 (Tel Aviv, Dead Sea, Galilee, Eilat, Negev, Nazareth, Haifa, Golan Heights, Caesarea, Akko) are stub cards with `aria-disabled="true"` + `class="opacity-50 pointer-events-none"` and text "Coming soon" / "בקרוב" — OR are entirely omitted via conditional rendering keyed on a `regionStatus` map. Planner choice; recommend the stub-card approach for visual completeness.
- 3 primary CTAs: "Explore Jerusalem" / "Find Tours" / "Plan Itinerary" — each next/link to the matching content
- HUB profile (no affiliate minimum); inject minimal Organization schema is already in root layout from Phase 1
- `generateMetadata` with title 50-60 chars, description 120-160 chars

**2. Scaffold `app/[locale]/regions/page.tsx`** (regions index):

- 11-card grid (1 live + 10 stub) — same data as homepage region grid
- BreadcrumbList: Home → Regions
- HUB profile

**3. Scaffold 5 legal page renderers** (`app/[locale]/{about,contact,privacy,affiliate-disclosure,accessibility-statement}/page.tsx`):

Each is async RSC:

- Read `import { legal } from '.velite'`; lookup by `lang === locale && page === '<slug>'`
- Inject `<JsonLd schema={webPageSchema({ ..., inLanguage: locale })} />` (use existing `webPage.ts` generator from plan 04)
- Inject `<JsonLd schema={breadcrumbSchema([{name: 'Home', item:'…'}, {name: title, item: '…'}])} />`
- For accessibility-statement specifically: ALSO inject coordinator data into the rendered HTML (the renderer reads `frontmatter.accessibility_coordinator` and renders the contact block with `mailto:` and `tel:` anchors; if frontmatter still has `__REQUIRES_USER_INPUT__`, throw at render time — additional defense)
- Render: title `<h1>` + MDX body
- `generateMetadata` per page

**4. Augment `.husky/pre-commit`** per `<placeholder_pause_pattern>` block 1. Add to existing hook BEFORE the existing lint-staged invocation:

```bash
# A11Y-04 statutory defense — reject __REQUIRES_USER_INPUT__ in accessibility-statement MDX
if git diff --cached --name-only | grep -E 'content/.+/legal/accessibility-statement\.mdx$' > /dev/null; then
  if git diff --cached -U0 content/**/legal/accessibility-statement*.mdx 2>/dev/null | grep -E '^\+.*__REQUIRES_USER_INPUT__' > /dev/null; then
    echo "BLOCKED: accessibility-statement contains __REQUIRES_USER_INPUT__ placeholder."
    echo "Real coordinator name + phone + email required per IS 5568 / A11Y-04."
    exit 1
  fi
fi
```

(Cross-platform note: Husky on Windows uses Git Bash for hooks — `grep` and `git diff --cached` both work. Test with a deliberate placeholder commit attempt.)

**5. Vitest test scaffolds:**

- `tests/content/legal-pages.test.ts` — for each of 5 legal pages × 2 langs, asserts the Velite Legal entry exists; word count band reasonable for legal copy; H1 present
- `tests/content/coordinator-format.test.ts` — per `<placeholder_pause_pattern>` block 2 (4 assertions on name/phone/email/last_audit_date)
- `tests/content/accessibility-statement.test.ts` — IS 5568 content-presence: body contains "IS 5568:2020", "WCAG 2.1 AA", a section labeled "Known Limitations" (or HE equivalent), the coordinator name appears in body or rendered HTML, last_audit_date present

All test scaffolds use `it.skip` until task 2 ships the MDX content; un-skip incrementally.

Avoid: scaffolding renderers with hardcoded copy (consume Velite); making the homepage region grid a static array buried in TSX (extract to `data/regions.json` or similar so Phase 3 plans can add live entries without TSX edits); using physical Tailwind utilities.
</action>
<verify>
<automated>pnpm typecheck</automated>
<automated>pnpm lint app/[locale]/page.tsx app/[locale]/regions/page.tsx app/[locale]/about/page.tsx app/[locale]/contact/page.tsx app/[locale]/privacy/page.tsx app/[locale]/affiliate-disclosure/page.tsx app/[locale]/accessibility-statement/page.tsx</automated>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('.husky/pre-commit','utf8'); if(!c.includes('REQUIRES_USER_INPUT'))process.exit(1)"</automated>
<automated>pnpm test --run tests/content/legal-pages.test.ts tests/content/coordinator-format.test.ts tests/content/accessibility-statement.test.ts</automated>
</verify>
<done>7 route renderers scaffolded (homepage + regions + 5 legal); .husky/pre-commit has the placeholder-rejection block; 3 Vitest test files exist with skipped groups; typecheck + lint green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author 8 legal MDX files (about, contact, privacy, affiliate-disclosure × 2 langs) + homepage/regions content + un-skip non-accessibility tests</name>
  <files>
    content/en/legal/about.mdx,
    content/en/legal/contact.mdx,
    content/en/legal/privacy.mdx,
    content/en/legal/affiliate-disclosure.mdx,
    content/he/legal/about.mdx,
    content/he/legal/contact.mdx,
    content/he/legal/privacy.mdx,
    content/he/legal/affiliate-disclosure.mdx,
    tests/content/legal-pages.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    For each of 8 (4 pages × 2 langs):
    - Test: frontmatter has lang, title 50-60 chars, description 120-160 chars, slug, page=<semantic-id>
    - Test: word count 300-1200 (legal copy ranges from terse Contact ~300w to longer Affiliate Disclosure ~1000w)
    - Test: H1 present and matches page topic
    - Test: HE/EN ratio in [0.85, 1.40] per pair
    - Test (privacy specifically): mentions Plausible cookieless analytics + no cookies + no personal data tracking
    - Test (affiliate-disclosure specifically): FTC-compliant disclosure language; cross-links to inline `<AffiliateDisclosure>` pattern; lists which partners are real vs stubs (Conflict D documented)
    - Test (contact specifically): mailto: link present (real address; can be `hello@visitisrael.site` or similar — user can confirm or change)
    - Test (about specifically): editorial standards + team disclosure (solo developer at v1; affiliate-not-marketplace stance)
  </behavior>
  <action>
**Author 4 legal pages × 2 langs (skipping accessibility-statement — that's task 3 with the pause).**

For each page:

1. **EN authoring** (invoke `copywriting` skill):
   - **about.mdx:** Mission ("Every tourist who lands on the site finds a credible, monetized path to booking what they came to research"); team disclosure (solo developer at v1; document this honestly); editorial standards (paired religious naming, IS 5568, no AI itineraries, no political content); no cookies / privacy-respecting Plausible analytics. ~600-1000w.
   - **contact.mdx:** mailto: (placeholder `hello@visitisrael.site` — user can override during review); accessibility coordinator cross-reference link to /accessibility-statement/. ~300-500w.
   - **privacy.mdx:** Plausible cookieless analytics; no user accounts; no personal data; affiliate-link clickthrough is tracked by affiliate partners per their own policies (linked); GDPR mention because EU visitors hit the site; no data retained server-side. ~600-1000w.
   - **affiliate-disclosure.mdx:** FTC-compliant disclosure — "Some links on this site are affiliate links; we earn commission at no cost to you." List the 11 partners (9 real, 2 stubs); explain Travelpayouts aggregator role; cross-link to inline `<AffiliateDisclosure>` component pattern used on monetized pages. ~600-1000w.

2. **Frontmatter (same shape for all 4):**

   ```yaml
   ---
   lang: en
   title: '<title>' # 50-60 chars
   description: '...' # 120-160 chars
   slug: <semantic-id>
   page: <semantic-id> # about | contact | privacy | affiliate-disclosure
   publishedAt: 2026-05-11
   updatedAt: 2026-05-11
   ---
   ```

3. **HE authoring** via `hebrew-content-writer` skill:
   - Same 4 pages in Hebrew (אודות / יצירת קשר / מדיניות פרטיות / חשיפת שותפים)
   - Native rewrite (NOT translation); register: business-casual; ktiv maleh
   - Word count ≥85% of EN

4. **Update `app/sitemap.ts`** with all 10 legal paths (5 pages × 2 langs).

5. **Un-skip the Vitest tests for the 4 non-accessibility pages** in `tests/content/legal-pages.test.ts`.

6. **Validation:**

   ```
   pnpm velite && pnpm qa:credits && pnpm qa:schema
   pnpm qa:hebrew-content     # HE pages pass ktiv maleh + paired naming
   pnpm build
   pnpm qa:audit              # UTILITY profile ≥85 on all 8 pages
   pnpm test --run tests/content/legal-pages.test.ts
   ```

   Each page must score ≥85 on UTILITY profile; AUD-028 (footer accessibility-link) must report 0 violations on every built page (Phase 1 Footer wired; just verify live).

Avoid: legal boilerplate copied from other sites (write fresh; legal copy is a trust signal); HE machine-translated text; missing FTC disclosure on affiliate-disclosure page.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const pages=['about','contact','privacy','affiliate-disclosure']; const langs=['en','he']; const bad=[]; pages.forEach(p=>langs.forEach(l=>{const e=r.find(x=>x.slug===p&&x.lang===l); if(!e||e.score<85)bad.push(l+'/'+p);})); if(bad.length){console.error('bad:',bad);process.exit(1);} console.log('all 8 legal pages >=85')"</automated>
<automated>pnpm test --run tests/content/legal-pages.test.ts</automated>
</verify>
<done>8 legal MDX files exist (4 × 2 langs); all score ≥85 on UTILITY; all HE pages pass qa:hebrew-content; sitemap updated; Vitest legal-pages tests green for the 8 non-accessibility pages.</done>
</task>

<task type="checkpoint:human-action" gate="blocking">
  <name>Task 3 (PAUSE — A11Y-04): Populate accessibility coordinator real values</name>
  <files>
    content/en/legal/accessibility-statement.mdx,
    content/he/legal/accessibility-statement.mdx
  </files>
  <action>
HALT and surface the structured question in <how-to-verify> below. Do NOT proceed to task 4 until the user has supplied all four values (coordinator name, phone, email, last_audit_date). Capture the user response verbatim; do NOT modify or improve the values. If the user responds "use placeholders", refuse and re-issue the question (the pre-commit hook will reject placeholders — letting them through wastes a commit cycle).
  </action>
  <verify>
    <automated>node -e "process.exit(0)"</automated>
    <manual>User has supplied all four values (name, phone, email, last_audit_date). Each value is non-empty and is not the literal string __REQUIRES_USER_INPUT__. Phone matches international format. Email matches RFC 5322 simple regex. Date is ISO YYYY-MM-DD within last 90 days.</manual>
  </verify>
  <done>User has supplied the 4 real coordinator values; values captured and ready for task 4 to insert into both MDX files.</done>
  <what-built>
    Drafted both EN and HE accessibility-statement MDX files with full IS 5568 content (commitment, standard, features, limitations, feedback, last-audit-date placeholder) and frontmatter `accessibility_coordinator: { name, phone, email }` populated with `__REQUIRES_USER_INPUT__` placeholders.
  </what-built>
  <how-to-verify>
    **Required user input (4 values):**

    Phase 2.5 plan task: populate `content/{en,he}/legal/accessibility-statement.mdx` frontmatter.

    IS 5568 / Equal Rights for Persons with Disabilities Act mandates a named accessibility coordinator with reachable contact. Statutory exposure: up to 50,000 NIS per violation. Placeholder values are NOT legally acceptable and will be rejected by the pre-commit hook.

    Please provide:
      1. **Coordinator name** (real person responsible for accessibility complaints):
      2. **Phone** (international format, e.g., +972-2-555-0100):
      3. **Email** (e.g., accessibility@visitisrael.site):
      4. **Last accessibility audit date** (ISO format, within 90 days — e.g., 2026-05-01):

    These values will be committed to the public site and become part of the legal compliance footprint.

    **What will happen after you respond:**
      - The 4 `__REQUIRES_USER_INPUT__` tokens in both EN and HE accessibility-statement MDX will be replaced with your values
      - For HE: name will be transliterated to Hebrew script (or kept in Latin per your preference); phone uses `<span dir="ltr">+972-…</span>` wrapper inside Hebrew prose (AUD-024); email uses `<span dir="ltr">…</span>` wrapper
      - Pre-commit hook + Vitest test (coordinator-format.test.ts) will gate the commit — if any value is invalid, commit fails and we iterate
      - mailto: and tel: anchors will be added to the rendered statement so the contact is one-click

  </how-to-verify>
  <resume-signal>Provide the 4 values above (name / phone / email / last_audit_date), OR type "use placeholders" to commit a v0 build with intentional placeholders for later replacement (NOT recommended — pre-commit hook will reject).</resume-signal>
</task>

<task type="auto" tdd="true">
  <name>Task 4: Author EN + HE accessibility-statement.mdx with REAL coordinator values, un-skip coordinator-format + accessibility-statement tests, verify pre-commit hook</name>
  <files>
    content/en/legal/accessibility-statement.mdx,
    content/he/legal/accessibility-statement.mdx,
    tests/content/coordinator-format.test.ts,
    tests/content/accessibility-statement.test.ts
  </files>
  <behavior>
    Both EN + HE accessibility-statement MDX:
    - Test: frontmatter has lang, title, description, slug=accessibility-statement (EN) or accessibility-statement (HE — Velite slug can be Latin even if URL is Hebrew), page=accessibility-statement
    - Test: frontmatter accessibility_coordinator.{name,phone,email} all non-empty and != '__REQUIRES_USER_INPUT__'
    - Test: phone matches /^\+?[0-9 \-()]{7,}$/
    - Test: email matches simple RFC 5322 regex (e.g., /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    - Test: last_audit_date is ISO date within last 90 days
    - Test: body contains "IS 5568:2020" (EN) / "IS 5568:2020" or "ת"י 5568" (HE)
    - Test: body contains "WCAG 2.1 AA"
    - Test: body has a section labeled "Known Limitations" (EN) / "מגבלות ידועות" (HE)
    - Test: body has a feedback mechanism — either a mailto: link or a form reference
    - Test: HE body uses <span dir="ltr"> wraps around phone + email (AUD-024)
    - Test: pnpm qa:audit reports AUD-027 = 0 violations (statement exists in both locales) AND AUD-028 = 0 violations site-wide
  </behavior>
  <action>
**User has responded with real coordinator values (task 3 resume-signal).** Use those exact values.

1. **Author EN `content/en/legal/accessibility-statement.mdx`** following israeli-accessibility-compliance skill Step 6:

   Frontmatter:

   ```yaml
   ---
   lang: en
   title: 'Accessibility Statement'
   description: 'Discover Israel is committed to IS 5568:2020 / WCAG 2.1 AA accessibility. Read our commitment, features, limitations, and accessibility coordinator contact.'
   slug: accessibility-statement
   page: accessibility-statement
   publishedAt: 2026-05-11
   updatedAt: 2026-05-11
   accessibility_coordinator:
     name: '<USER-PROVIDED-NAME>'
     phone: '<USER-PROVIDED-PHONE>'
     email: '<USER-PROVIDED-EMAIL>'
   last_audit_date: '<USER-PROVIDED-ISO-DATE>'
   ---
   ```

   Body sections (per israeli-accessibility-compliance skill Step 6):
   - H2: Our Commitment to Accessibility
   - H2: Standard: IS 5568:2020 / WCAG 2.1 AA
   - H2: Accessibility Features (keyboard nav, screen reader support, skip-nav `דלג לתוכן הראשי`, alt text on all images, 4.5:1 contrast, focus indicators, ARIA labels in Hebrew on HE pages)
   - H2: Known Limitations (be explicit — e.g., "Some affiliate-partner widgets are loaded from third-party domains and may not meet all WCAG 2.1 AA criteria; we are working with partners to improve")
   - H2: Accessibility Coordinator
     ```mdx
     **Name:** <USER-PROVIDED-NAME>
     **Phone:** [<phone>](tel:<phone>)
     **Email:** [<email>](mailto:<email>)
     ```
   - H2: Submit Accessibility Feedback (mailto: link or form description)
   - H2: Last Audit
     "This statement was last reviewed on <USER-PROVIDED-DATE>."

2. **Author HE `content/he/legal/accessibility-statement.mdx`**:

   Frontmatter same shape with HE strings. The Velite slug can remain `accessibility-statement` (English slug for the collection key); the URL routing may map to `/הצהרת-נגישות` via next-intl rewrites OR fall back to `/he/accessibility-statement` per CONTEXT.md. Test which works:

   ```
   curl -I http://localhost:3000/הצהרת-נגישות
   ```

   If next-intl rewrite serves it (200) → use the Hebrew slug in the URL via a `rewrite` in next.config.ts or i18n config; otherwise fall back to `/he/accessibility-statement`. Document the decision in the SUMMARY.

   Body in Hebrew per skill Step 6 template:
   - H2: מחויבותנו לנגישות
   - H2: התקן: ת"י 5568:2020 / WCAG 2.1 AA
   - H2: תכונות נגישות
   - H2: מגבלות ידועות
   - H2: רכז/ת נגישות
     ```mdx
     **שם:** <NAME-HE-or-Latin>
     **טלפון:** [<span dir="ltr"><phone></span>](tel:<phone>)
     **דוא"ל:** [<span dir="ltr"><email></span>](mailto:<email>)
     ```
   - H2: שליחת משוב נגישות
   - H2: ביקורת אחרונה
     `הצהרה זו נסקרה לאחרונה ב-<DATE>.`

3. **Un-skip** `tests/content/coordinator-format.test.ts` and `tests/content/accessibility-statement.test.ts` — they should all pass now with real values.

4. **Verify pre-commit hook FIRES on a placeholder:** Temporarily insert `__REQUIRES_USER_INPUT__` into a copy of the file (e.g., `content/en/legal/accessibility-statement.mdx.bak`) and run `git add` + `git commit`. The hook MUST reject. Restore the real version before completing the task.

5. **Run validation pipeline:**
   ```
   pnpm velite
   pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content
   pnpm build
   pnpm qa:audit       # AUD-027 = 0 (both statement pages exist); AUD-028 = 0 site-wide
   pnpm test --run     # coordinator-format + accessibility-statement tests green
   ```

Avoid: storing the coordinator data anywhere outside the MDX frontmatter (single source of truth); skipping the pre-commit hook validation step (the hook MUST be proven to fire); using `__REQUIRES_USER_INPUT__` anywhere in any committed file after this task.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const issues=r.flatMap(p=>p.issues||[]); const aud027=issues.filter(i=>i.rule==='AUD-027'); const aud028=issues.filter(i=>i.rule==='AUD-028'); if(aud027.length||aud028.length){console.error('AUD-027:',aud027.length,'AUD-028:',aud028.length);process.exit(1);} console.log('AUD-027 + AUD-028 both 0')"</automated>
<automated>pnpm test --run tests/content/coordinator-format.test.ts tests/content/accessibility-statement.test.ts</automated>
<automated>node -e "const fs=require('fs'); const files=['content/en/legal/accessibility-statement.mdx','content/he/legal/accessibility-statement.mdx']; const bad=files.filter(f=>fs.readFileSync(f,'utf8').includes('**REQUIRES_USER_INPUT**')); if(bad.length){console.error('placeholder found in:',bad);process.exit(1);}"</automated>
</verify>
<done>Both accessibility-statement MDX files contain real coordinator values; coordinator-format + accessibility-statement Vitest tests green; AUD-027 (page presence) + AUD-028 (footer link) both 0 violations site-wide; pre-commit hook proven to fire on placeholder reintroduction; no **REQUIRES_USER_INPUT** anywhere in repo.</done>
</task>

</tasks>

<verification>
- Homepage renders at `/` (HE) and `/en/` with `<RegionHero>` (Jerusalem image) + region grid (1 live + 10 stub) + 3 CTAs
- `/regions/` and `/en/regions/` render the 11-card region grid
- All 5 legal pages exist in both locales (10 MDX files); UTILITY profile audit score ≥85 each
- Accessibility statement frontmatter has REAL coordinator values (no `__REQUIRES_USER_INPUT__` anywhere)
- Pre-commit hook (`.husky/pre-commit`) blocks `__REQUIRES_USER_INPUT__` reintroduction (proven by deliberate attempt)
- `tests/content/coordinator-format.test.ts` green (all 4 format assertions on EN + HE)
- `tests/content/accessibility-statement.test.ts` green (IS 5568 sections + WCAG 2.1 AA + mailto: + tel: + last_audit_date)
- AUD-027 reports 0 violations (statement exists in both locales)
- AUD-028 reports 0 violations site-wide (footer link present on every page — A11Y-05 verified live)
- `pnpm qa:audit` reports HUB profile ≥85 on homepage + /regions/; UTILITY ≥85 on all 10 legal pages
- HE statement slug routing decision documented (either `/הצהרת-נגישות` works OR `/he/accessibility-statement` fallback applied)
</verification>

<success_criteria>
Hub pages (homepage + /regions/ index) live in both locales. 5 legal pages × 2 langs shipped with proper IS 5568 content on the accessibility statement (real coordinator values; pre-commit hook + Vitest format test both gate the contract). Footer accessibility-link wired live on every Jerusalem page (AUD-028 = 0 → A11Y-05 satisfied). A11Y-04 statutory blocker (STATE.md Gap §6.7) resolved: named coordinator on record.
</success_criteria>

<output>
After completion, create `.planning/phases/02-pilot-region-jerusalem-m2/02-05-SUMMARY.md` summarizing:
- Homepage region-grid pattern (data source — JSON file vs inline TSX)
- Legal page word counts (per page) + register choices
- Accessibility coordinator data committed (name only — phone/email omitted from SUMMARY for surface-area minimization; they're in the MDX)
- HE statement slug routing decision (`/הצהרת-נגישות` works OR `/he/accessibility-statement` fallback)
- Pre-commit hook augmentation test results (deliberate placeholder commit attempt — was it rejected?)
- AUD-027 + AUD-028 final audit verification
- Wall-clock time
- Any HE typography edge cases for Latin-wrapped phone/email observed
</output>
</output>
