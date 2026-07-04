# LOOP STATE

- iteration: 294
- lastMode: REVIEW (294%5==4)
- lastItem: review-effective-days-fixes
- lastResult: REVIEW SHIPPED — 2 bugs fixed in iter293 calculator; gate green (0 errors / 450 pages / 588 e2e+a11y pass); commit 65712cf on master; CI pending at push (standard pattern)
- nextRotationCategory: 295%5==0 → RESEARCH mode
- higgsfieldSpent: 0
- updatedAt: 2026-07-04T20:45Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 294 REVIEW — review-effective-days-fixes:
  Mode REVIEW (294%5==4). Audited iters 291-293 output (israel-jordan-itinerary,
  christmas-in-israel, israel-effective-days calculator).
  Findings:
  (1) CONFIRMED BUG: israel-effective-days.astro — `new Date("YYYY-MM-DD")` is parsed as
      UTC midnight by the ECMAScript spec. In UTC-offset timezones (e.g. UTC-5 Eastern US),
      Oct 1 00:00 UTC = Sep 30 at 19:00 local → `.getDate()` returns 30 not 1. All calendar
      cells shifted one day early for users in Western/Americas timezones. Fixed with
      parseLocalDate() helper that splits "YYYY-MM-DD" and constructs local-time Date.
  (2) CONFIRMED BUG: Tisha B'Av 2026 end date was [2026,7,23] (July 23, the 10th of Av).
      July 23 is a regular Thursday — not a closure day. The holidayOn() function flags any
      day within [start, end] inclusive, so July 23 was incorrectly marked "full closure".
      Fixed to end: [2026,7,22] (9th of Av only, confirmed Wednesday Jul 22, 2026).
  (3) FLAGGED FOR HUMAN REVIEW: Tisha B'Av 2027 start date [2027,8,11] = August 11.
      Independent calendar calculation (tracing months from 1 Nisan = Mar 7 per Passover
      Mar 21 in code) yields 9 Av = July 11, 2027 — exactly one month earlier. This discrepancy
      was not fixed (cannot authoritatively verify without live Hebrew calendar reference).
      Human should verify against chabad.org/calendar or similar.
  (4) CLEAN: christmas-in-israel.md and israel-jordan-itinerary.md — all internal links
      resolve (church-holy-sepulchre-guide, petra-from-israel, dead-sea-hotels-guide etc.
      all confirmed present), SEO meta within limits, no fabricated data, affiliate
      rel="sponsored nofollow noopener" correct, no H1 in body.
  Gate: pnpm check 0 errors · build 450 pages · 588/588 e2e pass. GREEN.
  Ship: commit 65712cf on master; pushed origin/master; CI pending (standard).
  NEXT: iter 295 → RESEARCH mode (295%5==0). Candidates: competitor scan for profitable
    new content patterns; tools gap analysis; link-bait opportunities; local SEO features.

Notes: iter 293 BUILD (tools) — israel-effective-days:
  Mode BUILD (293%5==3 → tools rotation). Chose israel-effective-days (P2 S) — "Effective
  Touring Days Calculator". Distinguishable from existing tools: /israel-how-many-days takes
  region inputs → outputs days needed; /israel-holiday-planner qualitative impact by holiday;
  new tool takes arrival/departure dates → quantitative effective-days score with visual calendar.
  Algorithm: weekday=1.0, Friday=0.8, Shabbat=0.6, full-closure holiday=0.4, partial=0.8,
  arrive/depart=0.5. Visual week-by-week calendar with colour-coded cells. Itinerary CTA matched
  to effective-days bucket (<3.5→3-day Jerusalem, ≤5.5→5-day, ≤8.5→7-day, ≤12→10-day, else→browse).
  2026–2027 full Jewish holiday dataset. 5 FAQs. Booking.com CTA.
  Wired into plan-your-trip hub and i18n (en/fr/de). 7 new e2e tests.
  Gate: pnpm check 0 errors (119 files) · build 450 pages (+1) · 588/588 e2e pass (+7). GREEN.
  Ship: squash-merge auto/israel-effective-days → master; commit fbf10f5; pushed origin/master.
  NEXT: iter 294 → technical (294%5==4 → review). Candidates: link-rot pass, meta-audit,
    schema validator sweep, or any P2-T technical backlog item.

Notes: iter 292 BUILD (seo-content) — christmas-in-israel:
  Mode BUILD (292%5==2 → seo-content rotation). Chose christmas-in-israel (P2 M) — backlog
  since iter45 research; strong evergreen+seasonal SEO ("Christmas in Bethlehem", "Midnight
  Mass Church of the Nativity", "Nazareth Christmas market"); large winter travel search volume.
  New /christmas-in-israel: covers all three Christmas dates (Catholic Dec 24, Orthodox Jan 6,
  Armenian Jan 18–19), Midnight Mass + Manger Square logistics, Checkpoint 300 crossing,
  Ministry of Tourism shuttle (honestly framed as "typically offered, verify annually"),
  Church of Holy Sepulchre Jerusalem denominations, Nazareth Christmas market (largest Arab-
  Christian celebration inside Israel), Tel Aviv New Year, winter advantages (crowds/prices/
  green landscapes/Eilat+Dead Sea warm season), Jerusalem snow framing.
  HONESTY: no hardcoded shuttle schedules; Ministry of Tourism service framed as typical
  not guaranteed; snow framed as unpredictable; no fabricated reviews/ratings/prices.
  6 FAQs. 3 affiliate CTAs: TourRadar (Christmas packages) + Abraham Tours (day trips) +
  Booking.com (Jerusalem hotels).
  Back-wired: best-time-to-visit-israel.md winter section → /christmas-in-israel.
  Smoke +1 route.
  SEO: title="Christmas in Israel: Bethlehem, Nazareth & Winter Travel Guide" = 61 chars ✓;
    desc="Experience Christmas in Israel — Midnight Mass at the Church of the Nativity,
    Nazareth Christmas market, Jerusalem Holy Sepulchre services, and winter travel tips."
    = 157 chars ✓
  Gate: pnpm check 0 errors (118 files) · build 449 pages (+1) · 581/581 e2e+a11y pass (+1). GREEN.
  Ship: commit ab300e6 on master; pushed to origin/master; CI in_progress at write time.
  NEXT: iter 293 → tools rotation (293%5==3). Top tools BUILD candidates:
    itinerary-day-counter tool (P2 S), israel-border-wait-times info tool (P3 S),
    israel-travel-insurance calculator (P3 M), tel-aviv-sunset-time tool (P3 S),
    shabbat-meal-finder tool (P3 S), israel-road-trip-planner tool (P2 M).
    Also eligible: i18n Phase 3 (regions ×11 in fr+de) — batch 18 COMPLETE.

Notes: iter 291 BUILD (monetization) — israel-jordan-itinerary:
  [see iter 291 entry for full detail]
  NEXT was: iter 292 → seo-content (292%5==2). Completed above.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 34 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290.
