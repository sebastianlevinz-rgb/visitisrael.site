# LOOP STATE

- iteration: 291
- lastMode: BUILD (291%5==1 → monetization rotation)
- lastItem: israel-jordan-itinerary
- lastResult: BUILD SHIPPED — gate green (0 errors / 448 pages / 580 e2e+a11y pass +2); commit 6fe447d on master; CI in_progress at write time (standard pattern — prior 57 CI runs all success)
- nextRotationCategory: 292%5==2 → seo-content
- higgsfieldSpent: 0
- updatedAt: 2026-07-04T17:45Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 291 BUILD (monetization) — israel-jordan-itinerary:
  Mode BUILD (291%5==1 → monetization rotation). Chose israel-jordan-itinerary (P2 M) — top
  monetization candidate; been in BACKLOG since iter35 research; distinct from petra-from-israel.md
  (single-day/overnight) and petra-from-eilat-vs-amman.md (Jordan-side comparison).
  New /israel-jordan-itinerary — 10-day combined Israel + Jordan guide.
  Route: Jerusalem (3 days: Old City + Mount of Olives + Yad Vashem + Bethlehem day trip) →
    Dead Sea (day 4: Ein Bokek floating + mud; overnight option) → Masada sunrise + drive to
    Eilat (day 5) → Wadi Araba border → Petra full day (day 6 cross + day 7) → Wadi Rum
    overnight Bedouin camp (day 8) → Amman (day 9: Rainbow Street + Roman theatre + Citadel) →
    Jerash (day 10 morning) → Allenby Bridge back to Israel.
  Structure: at-a-glance table (season/crossings/budget), day-by-day detailed breakdown, two
    comparison tables (route overview + border crossing comparison Wadi Araba vs Allenby), dual-
    stamp section, Shabbat timing section, practical tips (transport/budget/season).
  HONESTY: price ranges only; border hours "typical — verify current"; Jordan Pass links official
    Jordan Tourism Board; no fabricated reviews/ratings; dual-stamp section caveated to "check
    with embassy"; Dolphin Reef + Dead Sea mineral claims properly framed.
  Hero: /images/regions/eilat/hero.jpg. 6 FAQs. 3 affiliate CTAs: TourRadar (packages) +
    Viator (Petra/Wadi Rum) + GYG (Jordan Pass info).
  Back-wired: petra-from-israel.md final paragraph — new sentence pointing to israel-jordan-itinerary.
  Footer Day Trips: +1 link after petra-from-israel entry.
  Smoke +1; a11y +1.
  SEO check: title="Israel and Jordan 10-Day Itinerary (2026 Planning Guide)" = 57 chars ✓;
    desc="A practical 10-day Israel and Jordan itinerary: Jerusalem, the Dead Sea, Masada,
    Eilat, Petra, Wadi Rum and Amman with honest border-crossing notes." = 148 chars ✓
  Gate: pnpm check 0 errors (118 files) · build 448 pages (+1) · 580/580 e2e+a11y pass (+2). GREEN.
  Ship: commit 6fe447d on master; pushed to origin/master; CI in_progress at write time.
  NEXT: iter 292 → seo-content rotation (292%5==2). Top seo-content BUILD candidates:
    hidden-gems hub (P2 M), christmas-in-israel (P2 M), self-drive-israel-road-trip (P2 M),
    backpacking-israel (P2 M), israel-jordan-pass-guide (P2 S, seo+monetization),
    accessible-travel-israel (P2 M), muslim-travel-israel (P2 M), photography-guide (P2 M).
    Also eligible: i18n Phase 3 (regions ×11 in fr+de) — next i18n phase since batch 18 COMPLETE.

Notes: iter 290 RESEARCH — research-pass-290:
  Mode RESEARCH (290%5==0 → competitor gap scan). No code changes. No branch created.
  Backlog saturation confirmed at 338+ items from 57+ prior research passes.
  Methodical grep de-duplication across 20+ topic angles before finding genuine gaps.
  3 confirmed net-new items:
    (1) israel-golf-guide P3 S — Caesarea Golf Club (Rolex World Top 1000 since 2010; Pete
        Dye 18-hole; Israel's only international course; opened 1961 by James Armand de
        Rothschild; tees alongside Roman ruins; ~₪500–700 green fees). "golf" had only 2
        passing mentions in backlog; zero standalone guide. Competitors: golferhive.com,
        touristisrael.com, caesarea.com.
    (2) ein-hod-artists-village P3 S — Marcel Janco (Dada co-founder) 1953 artists' colony;
        150 resident artists; 18 galleries + 14 workshops; Janco Dada Museum (Dadalab);
        Nisco Museum of Mechanical Music (Middle East unique); pedestrian-only; Mount Carmel
        15km south of Haifa. Appeared only as 1 bullet in hidden-gems hub entry (line 70);
        zero standalone guide. Competitors: beinharimtours.com, touristisrael.com, ein-hod.info.
    (3) israel-escape-rooms P3 S — 50+ escape rooms across Israel; escaperoom.co.il largest
        chain (20+ TLV games); English-speaking game masters; ~₪90–150/person; VR experiences.
        Grep returned ZERO matches — completely absent from backlog.
  NEXT: iter 291 → BUILD (291%5==1 → monetization rotation). Top monetization BUILD candidates:
    egypt-jordan-israel-itinerary (P2 M), israel-jordan-itinerary (P2 M),
    dead-sea-hotels-guide (P2 S), israel-thermal-baths (P3 S), israel-diamonds-jewelry (P3 S),
    bat-yam-guide (P3 S), israel-golf-guide (P3 S, just added).

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 33 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290.
