---
phase: 02-pilot-region-jerusalem-m2
plan: 02
type: execute
wave: 2
depends_on:
  - 02-01-en-canonical
files_modified:
  - content/he/regions/jerusalem.mdx
  - scripts/qa/hebrew-content.mjs
  - scripts/qa/pilot-checkpoint.mjs
  - package.json
  - tests/qa/pilot-checkpoint.test.ts
  - tests/content/jerusalem-he-canonical.test.ts
  - .planning/phases/02-pilot-region-jerusalem-m2/timing.log
  - data/pilot-checkpoint.md
autonomous: true
requirements:
  - CNT-02
  - CNT-03
must_haves:
  truths:
    - 'Visiting /jerusalem/ (HE at root, no prefix) returns 200 with html[lang=he][dir=rtl]'
    - 'HE canonical word count is between 0.85 and 1.40 of EN canonical word count (AUD-007 ratio)'
    - 'HE schema parity: TouristDestination + BreadcrumbList + FAQPage emit with inLanguage=he'
    - 'Paired religious naming on first reference: הכותל המערבי (Western Wall), כנסיית הקבר (Holy Sepulchre), הר הבית / חראם א-שריף (Temple Mount paired)'
    - 'Ktiv maleh consistent throughout (no random ktiv chaser variants — AUD-025 <5 per page)'
    - 'pnpm qa:audit reports REGION_CANONICAL score >=85 on /jerusalem with AUD-017..020 all 0 violations'
    - 'pnpm qa:hebrew-content custom checker exits 0'
    - 'pnpm qa:pilot-checkpoint writes data/pilot-checkpoint.md with PASS/SWITCH verdict; exit 0 = PASS (advance), exit 1 = SWITCH (halt)'
    - "timing.log entry '2.2 HE canonical: <N>min' written for criterion 3 evaluation"
  artifacts:
    - path: 'content/he/regions/jerusalem.mdx'
      provides: 'Native Hebrew rewrite of Jerusalem canonical; NOT literal translation; ≥85% EN word count; full schema parity'
      min_lines: 150
    - path: 'scripts/qa/hebrew-content.mjs'
      provides: 'Hebrew-content QA checker — ktiv maleh consistency + paired religious naming on HE pages + morphological keyword presence'
      min_lines: 60
    - path: 'scripts/qa/pilot-checkpoint.mjs'
      provides: 'Pilot-switch checkpoint script — evaluates 3 criteria, writes data/pilot-checkpoint.md, exits 0=PASS / 1=SWITCH'
      min_lines: 100
    - path: 'data/pilot-checkpoint.md'
      provides: 'Pilot-switch verdict report (written by qa:pilot-checkpoint)'
      contains: 'Verdict:'
  key_links:
    - from: 'content/he/regions/jerusalem.mdx'
      to: 'data/religious-sites.json (nameHe + nameAr fields)'
      via: 'schema generators reading inLanguage=he'
      pattern: 'הכותל המערבי|כנסיית הקבר|הר הבית'
    - from: 'scripts/qa/pilot-checkpoint.mjs'
      to: 'data/audit-results.json + data/photo-credits.json + .planning/phases/02-pilot-region-jerusalem-m2/timing.log'
      via: 'fs.readFile (consumes three inputs, evaluates 3 criteria)'
      pattern: "readFile.*(audit-results|photo-credits|timing\\.log)"
    - from: 'package.json scripts'
      to: 'scripts/qa/{hebrew-content,pilot-checkpoint}.mjs'
      via: 'npm script registration: qa:hebrew-content + qa:pilot-checkpoint'
      pattern: '"qa:(hebrew-content|pilot-checkpoint)":'
---

<objective>
Plan 02-02 — Jerusalem HE region canonical + Pilot-switch checkpoint (Wave 2).

Author `content/he/regions/jerusalem.mdx` as a NATIVE Hebrew rewrite via the `hebrew-content-writer` skill — NOT a literal translation. ≥85% of EN word count (AUD-007 parity gate enforces 0.85-1.40 ratio), full schema parity with `inLanguage=he`, paired religious naming on first reference, ktiv maleh consistent throughout, gender-inclusive patterns per skill SKILL.md Option C.

Ship the two QA scripts the rest of Phase 2 depends on:

- `scripts/qa/hebrew-content.mjs` — content-specific HE checker (ktiv maleh consistency + paired naming verification)
- `scripts/qa/pilot-checkpoint.mjs` — the 3-criteria pilot-switch evaluator that decides whether Phase 2.3 proceeds or Jerusalem pivots to Tel Aviv

End the plan by running `pnpm qa:pilot-checkpoint`. If exit 0 (PASS), downstream plans (02-03..06) proceed. If exit 1 (SWITCH), the orchestrator halts and presents the verdict report to the user.

Purpose: Prove that Israel-specific differentiators (paired religious naming in Hebrew, RTL rendering, native Hebrew register) work end-to-end at production depth, and that the pilot-switch escape hatch is mechanical rather than judgment-only.

Output: 1 HE MDX content file + 2 QA scripts registered in package.json + 2 Vitest tests + pilot-checkpoint.md artifact + timing.log entry.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/02-pilot-region-jerusalem-m2/02-CONTEXT.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-RESEARCH.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-VALIDATION.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-01-SUMMARY.md
@.planning/research/PITFALLS.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/hebrew-content-writer/references/hebrew-grammar-quick-ref.md
@.agents/skills/affiliate-marketing/SKILL.md
@content/en/regions/jerusalem.mdx
@app/[locale]/[region]/page.tsx
@data/religious-sites.json
@data/photo-credits.json
@data/audit-results.json
@lib/seo/naming.ts

<interfaces>
<!-- Phase 1 outputs the HE rewrite + scripts consume directly. -->

religious-sites.json HE names (already paired in Phase 1.6):

```json
[
  { "id": "western-wall", "nameEn": "Western Wall", "nameHe": "הכותל המערבי", "nameAr": "حائط البراق", ... },
  { "id": "holy-sepulchre", "nameEn": "Church of the Holy Sepulchre", "nameHe": "כנסיית הקבר", ... },
  { "id": "temple-mount", "nameEn": "Temple Mount", "nameHe": "הר הבית", "nameAr": "حرم الشريف / Haram al-Sharif", ... },
  { "id": "dome-of-rock", "nameEn": "Dome of the Rock", "nameHe": "כיפת הסלע", ... }
]
```

Schema generators support `inLanguage: 'he'` per plan 04 SUMMARY (`as unknown as WithContext<T>` cast applied uniformly).

AUD-007 word-count parity gate (from scripts/audit/rules/AUD-007.ts):

- Compares EN+HE pair (same slug+region) word counts
- PASS: ratio HE/EN in [0.85, 1.40] (Hebrew is denser; range accommodates both shorter and slightly longer)
- FAIL: emits violation

AUD-024 (Hebrew+Latin direction):

- Latin runs inside HE prose must be wrapped: `<span dir="ltr" lang="en">Booking.com</span>`
- Phone numbers / digit-runs inside HE: wrap with `<span dir="ltr">+972-2-555-0100</span>`

AUD-025 (ktiv chaser variants):

- Flags >5 ktiv-chaser spellings on a single HE page (skill mandates ktiv maleh consistency)

Existing checkpoint inputs (read by pilot-checkpoint.mjs):

- `data/audit-results.json` — flat array; each entry has `{ slug, lang, profile, score, issues: [{ rule, severity, message }] }`
- `data/photo-credits.json` — entries with `region`, `subjectType`, `restrictedSiteAcknowledgment`
- `.planning/phases/02-pilot-region-jerusalem-m2/timing.log` — two-line file: `2.1 EN canonical: <min>min\n2.2 HE canonical: <min>min`

Pilot-checkpoint pass/fail rules (LOCKED from RESEARCH §4):

- **Criterion 1 (editorial style):** AUD-017/018/019/020 ALL report 0 violations on both `/en/jerusalem` and `/jerusalem`. FAIL if any rule has ≥1 violation on either page.
- **Criterion 2 (restricted-site images):** Of credits where `subjectType === 'religious-site'` AND `region === 'jerusalem'` AND `slug.includes('jerusalem')` AND subject ∈ {western-wall, holy-sepulchre, dome-of-rock, baha-i}, ≥80% must have a non-null+non-empty `restrictedSiteAcknowledgment` field. FAIL otherwise.
- **Criterion 3 (HE throughput):** Parse timing.log, compute `m2/m1`. PASS if ≤2.0. FAIL if >2.0.

Verdict logic:

- All 3 PASS → verdict=PASS, exit 0
- Any FAIL → verdict=SWITCH, exit 1 (executor halts; user reads report and decides "switch" or "override")
  </interfaces>

<hebrew_content_template>

<!-- Sketch — executor refines via hebrew-content-writer skill at draft time. -->

H1: מה לעשות בירושלים — מדריך טיולים מלא
(Native phrasing; primary keyword "מה לעשות בירושלים" early)

H2: מתי לבקר בירושלים
Morphological variants: לבקר / לטייל / לראות
<ShabbatNotice variant="general" />

H2: היכן ללון בירושלים
<WhereToStay partner="booking" city="Jerusalem" />

H2: הדברים הטובים ביותר לעשות בעיר העתיקה
H3: הכותל המערבי (Western Wall — NEVER "כותל הדמעות")
H3: כנסיית הקבר
H3: הר הבית / חראם א-שריף (PAIRED on first reference within 300 chars)
H3: ויה דולורוזה
H3: ארבעת הרבעים (היהודי / הנוצרי / המוסלמי / הארמני)

H2: הדברים הטובים ביותר במערב ירושלים
H3: שוק מחנה יהודה
H3: יד ושם
H3: מוזיאון ישראל
H3: הר הרצל

H2: טיולי יום מירושלים
H3: ים המלח ומצדה
H3: בית לחם (תחת מינהל הרשות הפלסטינית — ראה הערות מעשיות; אין דף קנוני בפאזה 2)
H3: תל אביב
<AffiliateCard partner="viator" data={{ city: 'Jerusalem', label: 'טיולים מירושלים' }} />

H2: איך להגיע לירושלים
<TransportInfo partner="skyscanner" />
<AffiliateCard partner="rentalcars" data={{ city: 'Tel Aviv', label: 'השכרת רכב ב-TLV' }} />

H2: היכן לאכול בירושלים

H2: ירושלים בשבת — מה פתוח
<ShabbatNotice variant="restaurants-and-sites" />

H2: שאלות נפוצות
5-10 שאלות (consumed by faqSchema(inLanguage='he'))
</hebrew_content_template>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Build scripts/qa/hebrew-content.mjs + scripts/qa/pilot-checkpoint.mjs + register npm scripts + Vitest unit test for pilot-checkpoint</name>
  <files>
    scripts/qa/hebrew-content.mjs,
    scripts/qa/pilot-checkpoint.mjs,
    package.json,
    tests/qa/pilot-checkpoint.test.ts
  </files>
  <action>
Build the two QA scripts the rest of Phase 2 depends on. Both are `.mjs` (consistent with Phase 1 plan 03/11 patterns — no tsx spawn cost).

**1. `scripts/qa/hebrew-content.mjs`** (consumed by HE content commits):

Reads `.velite/regions.json` filtered to `lang === 'he'`. For each HE entry:

- **Ktiv maleh consistency check:** count occurrences of known ktiv-chaser/maleh pairs (e.g., תכנה vs תוכנה, שרות vs שירות, מסכן vs מסוכן). If both spellings appear in the same page → flag. Threshold: ≤5 inconsistencies per page (matches AUD-025).
- **Paired religious naming on first reference:** for each religious site in `data/religious-sites.json`, the page's first reference of `nameHe` must occur — for `temple-mount`, the Hebrew name `הר הבית` must appear within 300 chars of `חראם א-שריף` (paired). Mirror of `lib/seo/naming.ts` detector but for HE strings.
- **Wailing-Wall HE equivalent forbidden:** the string `כותל הדמעות` MUST NOT appear anywhere (Hebrew equivalent of "Wailing Wall" — AUD-017 HE-parallel).
- **Output:** prints per-page report; exits 0 if all HE pages pass, 1 otherwise.

Export pure helper `checkHebrewContent(regions)` (Phase 1 pattern from persist-lhci.mjs — exported for Vitest, plus `main()` runs only when `import.meta.url === process.argv[1]` (Windows drive-letter case-normalized)).

**2. `scripts/qa/pilot-checkpoint.mjs`** (consumed AT END of plan 02-02; gates Wave 3):

Reads three inputs:

- `data/audit-results.json` — for criterion 1
- `data/photo-credits.json` — for criterion 2
- `.planning/phases/02-pilot-region-jerusalem-m2/timing.log` — for criterion 3 (two-line file `2.1 EN canonical: <min>min` / `2.2 HE canonical: <min>min`)

Evaluates the 3 criteria per `<interfaces>` rules. Always writes `data/pilot-checkpoint.md` with the exact schema from RESEARCH §4 (sections for each criterion + verdict + suggested next action). Exits 0 on PASS, 1 on SWITCH.

Schema for `data/pilot-checkpoint.md`:

```markdown
# Pilot-Switch Checkpoint (Phase 2.2 → 2.3)

**Evaluated:** <ISO date>
**Verdict:** PASS | SWITCH | OVERRIDE

## Criterion 1: Editorial Style (AUD-017..AUD-020)

- AUD-017 (Wailing Wall regex): <N> violations on /en/jerusalem, <M> on /jerusalem
- AUD-018 (biased framing): ...
- AUD-019 (Temple Mount paired): ...
- AUD-020 (administrativeStatus): ...
  **Result:** PASS | FAIL with details

## Criterion 2: Restricted-Site Image Sourcing

- Total restricted-site Jerusalem images: <N>
- With cleared restrictedSiteAcknowledgment: <N> (<P>%)
  **Result:** PASS | FAIL — coverage <P>% < 80% threshold

## Criterion 3: Hebrew Translation Throughput

- 2.1 EN wall-clock: <M1> min
- 2.2 HE wall-clock: <M2> min
- Ratio: <M2/M1>×
  **Result:** PASS | FAIL — ratio exceeds 2× threshold

## Verdict

<text per RESEARCH §4>

## Suggested next action

<text>
```

Export pure helpers `evaluateCriterion1(audit)`, `evaluateCriterion2(credits)`, `evaluateCriterion3(timingLog)`, `writeReport(results, outPath)` for Vitest unit testing. Main runs only via `import.meta.url === process.argv[1]` check.

**3. Register npm scripts in `package.json`:**

```json
"qa:hebrew-content": "node scripts/qa/hebrew-content.mjs",
"qa:pilot-checkpoint": "node scripts/qa/pilot-checkpoint.mjs"
```

**4. Vitest unit test `tests/qa/pilot-checkpoint.test.ts`:**

- Test criterion 1: synthetic audit-results.json with 0 violations of AUD-017..020 → PASS; with 1 violation → FAIL
- Test criterion 2: synthetic credits with 4/5 restricted-site entries cleared (80%) → PASS; with 3/5 (60%) → FAIL
- Test criterion 3: timing log "240min / 380min" (ratio 1.58) → PASS; "240min / 600min" (ratio 2.5) → FAIL
- Test writeReport produces valid markdown matching schema
- Test main() PASS path exits 0; SWITCH path exits 1

Avoid: TypeScript in scripts (Phase 1 lock — .mjs only); hardcoding paths (use `process.cwd()` + `path.join`); skipping the pure-helper export pattern (breaks Vitest).
</action>
<verify>
<automated>pnpm test --run tests/qa/pilot-checkpoint.test.ts</automated>
<automated>node scripts/qa/pilot-checkpoint.mjs --help 2>&1 || true</automated>
<automated>node -e "require('./package.json').scripts['qa:pilot-checkpoint'] && require('./package.json').scripts['qa:hebrew-content'] || process.exit(1)"</automated>
<automated>pnpm lint scripts/qa/hebrew-content.mjs scripts/qa/pilot-checkpoint.mjs</automated>
</verify>
<done>scripts/qa/hebrew-content.mjs + scripts/qa/pilot-checkpoint.mjs exist with pure helpers exported and main() invocation pattern; package.json has qa:hebrew-content + qa:pilot-checkpoint scripts; Vitest test for pilot-checkpoint has all 3-criteria-evaluation cases green; lint clean.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/he/regions/jerusalem.mdx — native Hebrew rewrite via hebrew-content-writer skill</name>
  <files>
    content/he/regions/jerusalem.mdx,
    tests/content/jerusalem-he-canonical.test.ts,
    .planning/phases/02-pilot-region-jerusalem-m2/timing.log
  </files>
  <behavior>
    - Test: frontmatter has lang=he, slug=jerusalem, region=jerusalem, title 50-60 chars (HE width-aware), description 120-160 chars
    - Test: body contains H1 starting with "מה לעשות בירושלים" (primary HE keyword)
    - Test: body word count between 0.85 and 1.40 of EN canonical word count
    - Test: paired religious naming — first reference of הר הבית within 300 chars of חראם א-שריף
    - Test: body contains הכותל המערבי; does NOT contain כותל הדמעות
    - Test: body has 8-12 H2 sections matching the HE template
    - Test: same 5+ AffiliateCard partner mix as EN (Booking + Civitatis OR Viator OR GYG + Skyscanner + RentalCars OR DiscoverCars + SafetyWing)
    - Test: faqs frontmatter has 5-10 entries (HE strings)
    - Test: ktiv maleh consistency — pnpm qa:hebrew-content exits 0
  </behavior>
  <action>
**Invoke the `hebrew-content-writer` skill BEFORE drafting.** Read SKILL.md + references/hebrew-grammar-quick-ref.md. Register: business-casual (skill Step 1 row "Marketing / Ads"). Gender handling: Option C (gender-neutral rewording) for UX/CTA copy; Option B (slash notation) acceptable in body where natural.

1. **Native rewrite, NOT translation:**
   - Work from `content/en/regions/jerusalem.mdx` STRUCTURE (H-tag sequence, section purposes, affiliate placements) but author each Hebrew section in fresh Hebrew prose
   - Primary keyword: `מה לעשות בירושלים` (per PITFALLS §4.1 HE keyword table)
   - Morphological variants worked into body: לעשות / לבקר / לטייל / לראות + בירושלים / ירושלים
   - Apply ktiv maleh consistently (תוכנה not תכנה; שירות not שרות)

2. **H-tag scaffolding** per `<hebrew_content_template>` above. Use Hebrew names from `data/religious-sites.json`:
   - הכותל המערבי (NEVER `כותל הדמעות` — AUD-017 HE-parallel fires)
   - כנסיית הקבר
   - הר הבית / חראם א-שריף (paired within 300 chars on first reference)
   - כיפת הסלע (if Dome of the Rock referenced)

3. **Schema parity:** the route renderer (app/[locale]/[region]/page.tsx from plan 02-01) already passes `inLanguage: locale`. No code changes needed — schemas auto-emit with `inLanguage: 'he'` when the route is `/jerusalem/`.

4. **Affiliate placements:** Same 5+ partners as EN (Booking + one tour aggregator + Skyscanner + one car-rental + SafetyWing). `<AffiliateCard>` data props in Hebrew labels (e.g., `label: 'מצא מלונות בירושלים'`).

5. **Frontmatter:**

   ```yaml
   ---
   lang: he
   title: 'מה לעשות בירושלים — מדריך טיולים מלא 2026' # 50-60 chars HE width-aware
   description: '...' # 120-160 chars
   slug: jerusalem
   region: jerusalem
   publishedAt: 2026-05-11
   updatedAt: 2026-05-11
   faqs:
     - question: 'כמה ימים כדאי לבלות בירושלים?'
       answer: '...'
     # 5-10 total
   ---
   ```

6. **Bethlehem mention in day-trips** must carry the framing per PITFALLS §3.3 in Hebrew: "תחת מינהל הרשות הפלסטינית; ביקור באמצעות סיור יום מירושלים; הביאו דרכון." NO link to canonical page (deferred to Phase 3).

7. **Hebrew + Latin direction handling** (AUD-024):
   - Brand names like "Booking.com" inside Hebrew prose → wrap `<span dir="ltr" lang="en">Booking.com</span>`
   - Phone numbers / digit-runs → `<span dir="ltr">+972-2-555-0100</span>`

8. **Word count target:** ≥85% of EN canonical (e.g., if EN = 1800w, HE = 1530-2520w). Native Hebrew tends denser; mid-band ~1700w in HE for 1800w EN.

9. **Run validation pipeline:**

   ```
   pnpm velite
   pnpm qa:hebrew-content        # custom HE checker (task 1)
   pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
   pnpm build
   pnpm qa:audit                  # REGION_CANONICAL >=85 on /jerusalem; AUD-017..020 all 0
   pnpm test --run                # all content tests green
   pnpm lint && pnpm typecheck
   ```

10. **Append timing to `.planning/phases/02-pilot-region-jerusalem-m2/timing.log`:**
    ```
    2.2 HE canonical: <wall-clock-min>min
    ```
    (Used by pilot-checkpoint criterion 3.)

Avoid: literal translation from EN MDX (`hebrew-content-writer` skill rejects this — produces wooden Hebrew); masculine-default verbs for mixed-audience CTAs (use Option C neutral rewording); ktiv chaser inconsistency (AUD-025 flags >5/page); Latin brand names without `<span dir="ltr">` wrap (AUD-024).
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:ner</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const he=r.find(p=>p.slug==='jerusalem'&&p.lang==='he'); if(!he||he.score<85)process.exit(1); const en=r.find(p=>p.slug==='jerusalem'&&p.lang==='en'); const ratio=he.wordCount/en.wordCount; if(ratio<0.85||ratio>1.40)process.exit(1); console.log('score',he.score,'ratio',ratio.toFixed(2))"</automated>
<automated>pnpm test --run tests/content/jerusalem-he-canonical.test.ts</automated>
<automated>pnpm lint && pnpm typecheck</automated>
</verify>
<done>content/he/regions/jerusalem.mdx exists; native rewrite (not translation); REGION_CANONICAL score >=85 on /jerusalem; AUD-007 ratio in [0.85, 1.40]; AUD-017/018/019/020/024/025 all 0 violations; 5+ AffiliateCard placements; all 9 behavior assertions pass; pnpm qa:hebrew-content green; timing.log line appended.</done>
</task>

<task type="auto">
  <name>Task 3 (CHECKPOINT): Run pnpm qa:pilot-checkpoint — gates Wave 3 advance</name>
  <files>
    data/pilot-checkpoint.md
  </files>
  <action>
This is the cheapest-to-execute, highest-leverage checkpoint in Phase 2. Past this point, switching pilots costs ~10 HE sub-destination pages of rework.

1. **Ensure all prerequisites are present:**
   - `data/audit-results.json` is fresh from a recent `pnpm qa:audit` after Task 2 commit
   - `data/photo-credits.json` reflects all 6 Jerusalem images from plan 02-01
   - `.planning/phases/02-pilot-region-jerusalem-m2/timing.log` has both `2.1 EN canonical: <M1>min` and `2.2 HE canonical: <M2>min` lines

2. **Run the checkpoint:**

   ```
   pnpm qa:pilot-checkpoint
   ```

3. **Interpret outcome:**
   - **Exit 0 (PASS)** — All 3 criteria pass. `data/pilot-checkpoint.md` written with `Verdict: PASS`. Commit the report. Wave 3 (plan 02-03) is unblocked. Continue.
   - **Exit 1 (SWITCH)** — One or more criteria fail. `data/pilot-checkpoint.md` written with `Verdict: SWITCH` and per-criterion failure details. The executor MUST HALT the phase and surface the report to the user with a clear question:

     ```
     ## CHECKPOINT FAILED — Pilot-switch required
     Phase 2.2 → 2.3 checkpoint failed: Criterion <N> did not pass.
     See: data/pilot-checkpoint.md for full rationale.

     Options:
       1. SWITCH to Tel Aviv (recommended). I will rename the phase directory to
          02-pilot-region-tel-aviv-m2/, restart Wave 1 with the Tel Aviv H-tag
          scaffolding from PITFALLS §4.2. Roughly 4-6 hours of rework, no Quality
          Gate impact yet (we haven't run it).
       2. OVERRIDE — provide rationale and continue with Jerusalem despite the
          signal. I will append your rationale to data/pilot-checkpoint.md under
          "Verdict: OVERRIDE" and proceed to Wave 3.

     Which option?
     ```

4. **Commit the report** regardless of verdict (PASS reports document advancement; SWITCH reports document the pivot decision; OVERRIDE reports document the risk acknowledged).

5. **Update STATE.md** with the checkpoint outcome under "Last activity" so subsequent plans see it.

Avoid: continuing to Wave 3 with exit-1; treating SWITCH as advisory (it's not — the criteria are mechanical); allowing override without rationale appended to the report.
</action>
<verify>
<automated>pnpm qa:pilot-checkpoint</automated>
<automated>test -f data/pilot-checkpoint.md && grep -E "Verdict: (PASS|SWITCH|OVERRIDE)" data/pilot-checkpoint.md</automated>
</verify>
<done>data/pilot-checkpoint.md exists with Verdict field populated. Exit 0 → PASS verdict; downstream plans (02-03..06) unblocked. Exit 1 → SWITCH verdict; orchestrator halts Phase 2 and surfaces the report to the user for switch-vs-override decision.</done>
</task>

</tasks>

<verification>
- `pnpm qa:hebrew-content` exits 0 (HE canonical passes ktiv maleh + paired naming + no כותל הדמעות)
- `pnpm qa:audit` reports REGION_CANONICAL score >=85 on `/jerusalem` (HE); AUD-007 word-count ratio in [0.85, 1.40]; AUD-017/018/019/020/024/025 all 0 violations
- `pnpm test --run` green including tests/qa/pilot-checkpoint.test.ts (3 criteria evaluation cases) and tests/content/jerusalem-he-canonical.test.ts (9 behavior assertions)
- `pnpm qa:pilot-checkpoint` writes `data/pilot-checkpoint.md` with Verdict field; exit code matches verdict (PASS=0, SWITCH=1)
- `package.json` registers both `qa:hebrew-content` and `qa:pilot-checkpoint`
- `.planning/phases/02-pilot-region-jerusalem-m2/timing.log` has both EN + HE lines
- Pure-helper export pattern in both .mjs files (Phase 1 lock; required for Vitest)
</verification>

<success_criteria>
HE Jerusalem canonical lives at `/jerusalem/` with full schema parity (inLanguage=he), 5+ affiliate placements, native Hebrew register, ktiv maleh consistent, paired religious naming, REGION_CANONICAL score ≥85. Pilot-switch checkpoint script ships and runs; produces verdict-bearing report. If verdict=PASS, Wave 3 proceeds with Jerusalem. If verdict=SWITCH, the orchestrator halts and the user makes the switch-vs-override call.
</success_criteria>

<output>
After completion, create `.planning/phases/02-pilot-region-jerusalem-m2/02-02-SUMMARY.md` summarizing:
- HE register choice (business-casual) + gender-handling approach (Option C / Option B mix)
- Ktiv maleh decisions (specific pairs picked; any borderline cases resolved per skill quick-ref)
- Paired religious naming verification (which Hebrew terms used + first-reference offsets)
- Word-count ratio achieved (HE/EN)
- Audit score breakdown (per AUD rule on /jerusalem)
- Pilot-checkpoint verdict + per-criterion details
- Wall-clock time vs EN baseline (criterion 3 ratio)
- Any deviations from EN structure (justify; ratio gate requires close parity)
</output>
