---
phase: 04-long-tail-sweep-m4
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - data/long-tail-backlog.md
  - data/long-tail-trigger.md
  - .planning/phases/04-long-tail-sweep-m4/01-long-tail-backlog-SUMMARY.md
autonomous: true
requirements:
  - SUB-V2-01
must_haves:
  truths:
    - 'data/long-tail-backlog.md exists with per-region long-tail candidate list (10 regions + Bethlehem context), each entry tagged with proxied composite score and the data source (PITFALLS / FEATURES / research baseline) NOT a measured volume'
    - 'data/long-tail-backlog.md explicitly states `status: DEFERRED-AWAITING-R3-VALIDATION` at top and documents the substring `$50` (DataForSEO option) or `$129` (Ahrefs Lite option) as the trigger for substantive execution'
    - 'data/long-tail-trigger.md exists with the operational handoff: when R3 data lands, run `/gsd:plan-phase 4 --gaps` against this backlog to produce real long-tail plans'
    - 'Backlog enumerates ≥3 candidate long-tail entries per region (proxied), totaling ≥30 candidates across 10 regions, with: short slug, parent region, proxied composite, justification (1-line), affiliate-monetization angle'
    - 'NO new MDX content created in this phase — strictly documentation/backlog scaffolding (Argentina lesson #9 — do NOT compete on SEO with proxied volumes; await real data)'
  artifacts:
    - path: 'data/long-tail-backlog.md'
      provides: 'Per-region long-tail expansion backlog with proxied composite scores; DEFERRED until R3 keyword purchase'
      min_lines: 80
      contains: 'DEFERRED-AWAITING-R3-VALIDATION'
    - path: 'data/long-tail-trigger.md'
      provides: 'Operational handoff: how to unblock substantive Phase 4 execution after R3 purchase'
      min_lines: 20
      contains: 'gsd:plan-phase 4 --gaps'
  key_links:
    - from: 'data/long-tail-backlog.md'
      to: '.planning/research/FEATURES.md + .planning/research/PITFALLS.md'
      via: 'Each backlog entry cites the research doc that produced its proxied score'
      pattern: 'FEATURES|PITFALLS'
---

<objective>
Plan 04-01 — Long-tail backlog deferral (single plan; closes Phase 4 minimally pending R3 keyword validation).

**Context for this plan:** Phase 4's success criteria #1 requires "validated keyword volume" (R3 data — Ahrefs Lite $129 or DataForSEO $50). That purchase is **DEFERRED with rationale** per Phase 2 STATE.md (Gap §6.1). Substantively building long-tail content with proxied volumes would replicate **Argentina lesson #9** ("compete on SEO with shaky volumes — pages rank for wrong intent, churn rebuild").

**This plan ships:**

- `data/long-tail-backlog.md` — per-region candidate enumeration with proxied composite scores, sourced explicitly from `.planning/research/FEATURES.md` + `.planning/research/PITFALLS.md` (NOT measured search volumes)
- `data/long-tail-trigger.md` — operational handoff: when R3 data is purchased, run `/gsd:plan-phase 4 --gaps` against the backlog to generate REAL plans with measured volumes
- Phase 4 formally completes (1/1 plans done); Phase 5 (Legal + Launch Prep) unblocks

**This plan does NOT ship MDX content.** All sub-destination authoring is intentionally deferred. The backlog is a structured queue, not a roadmap to write.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/research/FEATURES.md
@.planning/research/PITFALLS.md
@.planning/research/SUMMARY.md
@.planning/phases/03-region-replication-m3/03-CONTEXT.md
@data/region-replication-report.md
</context>

<tasks>

<task>
<name>Task 1: Author data/long-tail-backlog.md with proxied per-region candidate lists</name>
<action>
1. Create `data/long-tail-backlog.md` with frontmatter:
   ```
   ---
   status: DEFERRED-AWAITING-R3-VALIDATION
   created: 2026-05-11
   reactivation_trigger: R3 keyword data purchased (Ahrefs Lite $129 OR DataForSEO API $50) per Phase 2 STATE.md Gap §6.1
   gap_closure_command: /gsd:plan-phase 4 --gaps
   ---
   ```
2. Document the deferral rationale up top — Argentina lesson #9 reference, explicit acknowledgment that proxied volumes from FEATURES.md/PITFALLS.md/composite scoring are MEDIUM-LOW confidence and not suitable for production long-tail expansion (since long-tail SEO depends on getting the volume distribution right per cluster — proxied data is fine for "is this region worth building" but inadequate for "which 5 long-tail slugs to write among 30 candidates").
3. For each of the 10 Phase 3 regions, list 3-5 proxied long-tail candidates per region. Use research/PITFALLS.md + research/FEATURES.md + the Phase 3 sub-destination sets as input — these are slugs that were considered for Phase 3 but cut to stay within the 3-8 sub-dest band, OR adjacent topics that surfaced in research but lack pilot validation. Format each entry:
   ```
   ### Tel Aviv (parent: tel-aviv)
   - **slug:** tel-aviv-bauhaus-architecture-tour | proxied composite: ~7 | source: FEATURES §3.1 | justification: Bauhaus UNESCO 2003 — White City; commercial-tour intent; affiliate: getYourGuide architecture tours
   - **slug:** tel-aviv-shabbat-tlv | proxied composite: ~6 | source: PITFALLS §6.2 | justification: niche but valuable — Shabbat-aware TLV nightlife pivot; affiliate: booking weekend stays
   - **slug:** tel-aviv-jaffa-flea-market | proxied composite: ~6 | source: FEATURES §3.1 | justification: editorial gem from FEATURES; vintage shopping; affiliate: civitatis market tours
   ... (3-5 per region)
   ```
4. Repeat for: Dead Sea, Galilee, Eilat, Negev, Nazareth, Haifa, Golan Heights, Caesarea, Akko. (Bethlehem stays canonical-only per CONTEXT — no long-tail in v1.)
5. Total target: 30-50 candidate entries enumerated.
6. Close with a "When R3 data lands" section: explicit pointer to data/long-tail-trigger.md.
</action>
<verify>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/long-tail-backlog.md','utf8'); if(!/DEFERRED-AWAITING-R3-VALIDATION/.test(c))process.exit(1); if(!/(\$50|\$129)/.test(c))process.exit(1); const sections=c.match(/^### /gm)||[]; if(sections.length<10)process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/long-tail-backlog.md','utf8'); const slugs=c.match(/\*\*slug:\*\*/g)||[]; if(slugs.length<30)process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/long-tail-backlog.md','utf8'); if(c.length<3000)process.exit(1)"</automated>
</verify>
<done>data/long-tail-backlog.md ships with frontmatter + deferral rationale + ≥10 region sections + ≥30 candidate slugs, each tagged with proxied composite + source citation + justification.</done>
</task>

<task>
<name>Task 2: Author data/long-tail-trigger.md operational handoff</name>
<action>
Create `data/long-tail-trigger.md` (≥20 lines) documenting:
1. **Reactivation trigger:** R3 keyword data purchased AND landed in `data/keyword-data.json` (or equivalent — DataForSEO API output OR Ahrefs Lite CSV export)
2. **Decision:** which option to purchase
   - DataForSEO API ($50, single-shot batch) — recommended for one-shot validation
   - Ahrefs Lite ($129, monthly) — recommended if quarterly re-runs are planned
3. **Once data lands, execute:**
   ```
   /gsd:plan-phase 4 --gaps
   ```
   This reads `data/long-tail-backlog.md` + measured volumes + writes real Phase 4 plans (per-region long-tail expansion plans, ~5-10 plans).
4. **Selection rubric:** sort backlog candidates by (measured_volume × difficulty^-1) descending; pick top N per region where N = ⌈existing_sub_dest_count × 0.5⌉ per Phase 4 success criteria #1.
5. **Anti-pattern to avoid:** do NOT execute long-tail content writing without measured volumes — Argentina lesson #9 (~70% of long-tail pages ranked for wrong intent and required rewrite within 3 months).
6. **Quarterly re-run cadence:** if R3 budget approved, re-run every 90 days to catch keyword landscape shifts (e.g., new "Eilat marine diving" cluster emergence post-pandemic).
</action>
<verify>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/long-tail-trigger.md','utf8'); if(!/gsd:plan-phase 4 --gaps/.test(c))process.exit(1); if(!/DataForSEO|Ahrefs/.test(c))process.exit(1); if(c.split('\\n').length<20)process.exit(1)"</automated>
</verify>
<done>data/long-tail-trigger.md exists with reactivation trigger + decision rubric + gsd:plan-phase 4 --gaps invocation + Argentina-lesson-9 anti-pattern + cadence note.</done>
</task>

</tasks>

<success_criteria>
Phase 4 minimally complete: backlog scaffolded, trigger documented, NO premature long-tail content shipped. Phase 5 (Legal + Launch Prep) unblocks per ROADMAP. Substantive Phase 4 execution awaits R3 keyword purchase (user-input wall: $50-129).
</success_criteria>

<output>
After completion, create `.planning/phases/04-long-tail-sweep-m4/01-long-tail-backlog-SUMMARY.md` summarizing:
- Total backlog entries enumerated (per region breakdown)
- Proxied composite score distribution
- Decision lock: deferral over substantive execution (Argentina lesson #9 reference)
- Phase 4 status: 1/1 plans complete (minimal deferral)
- Phase 5 unblock confirmation
</output>
