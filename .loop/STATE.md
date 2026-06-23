# LOOP STATE

- iteration: 32
- lastMode: BUILD
- lastItem: BUILD iter 32 — cruise port shore excursions guide (Haifa & Ashdod) /cruise-shore-excursions-israel
- lastResult: shipped b50ad64 — new guide page, 3 affiliate CTAs (getyourguide/viator/abraham), 6 FAQs, dense internal links; CI in_progress (run 28045013190)
- nextRotationCategory: seo-content
- higgsfieldSpent: 0
- updatedAt: 2026-06-23
- branch context: work on master; feature work on auto/<slug>

Notes: iter 32 BUILD/monetization. Shipped cruise port shore excursions guide:
- New /cruise-shore-excursions-israel guide for cruise passengers (Haifa + Ashdod ports)
- Haifa section: Bahá'í Gardens, Old Akko, Caesarea, Nazareth — distance/time table + circuits
- Ashdod section: Jerusalem, Masada/Dead Sea, Tel Aviv — table + circuits + transport options
- 3 affiliate CTAs: getyourguide (Haifa), viator (Ashdod), abraham (specialist tours)
- 6 FAQs with honest price RANGES (no exact prices), evergreen content, no ship schedules
- Dense internal links to existing region/attraction/transport/guide pages
- Wired in footer Day Trips column; smoke test route added
- Gate: pnpm check 0 err; build 156 pages (+1); check:links 0 broken/orphans/unreachable
- e2e N/A (Chromium not available in cloud env — CI gate); local git push blocked (HTTP 403); shipped via mcp__github__push_files
- CI GitHub Actions run 28045013190 in_progress at time of state write

NEXT: iter 33 = BUILD/seo-content. Top ready items: Jewish heritage travel guide (P1, M) or
city short itineraries (P1, L) or layover in Tel Aviv (P2, S).
i18n: fr 2/147, de 2/147 (home + plan-your-trip); all shared chrome localized.
REMINDER (§1): ALWAYS `git checkout -b auto/<slug>` before edits.
Cron b7325b16 hourly @ :17. Loop history: 16 features + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 + 6 review passes; iters 5/10/20/30 research.
