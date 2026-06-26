# LOOP STATE

- iteration: 107
- lastMode: BUILD/seo-content
- lastItem: Israel travel apps guide (/israel-travel-apps)
- lastResult: SHIPPED 4649a54. New guide covering 10 essential apps for traveling in Israel 2026: Moovit (public transit), Waze (driving/Route 6), Gett (taxis outside TLV), Rav-Kav Online (transit top-up + honest international card caveats), Lime (scooters), Pango (parking), Wolt (food delivery), Ten Bis (restaurant discovery), WhatsApp (essential for Israeli businesses), Google Translate (camera-scan Hebrew menus + offline pack). Pre-flight download checklist table. Dense cross-links to transportation, driving-in-israel, israel-esim, rav-kav-israel, ben-gurion-airport-guide. Gate: 0 type errors, 224 pages built (+1), 242/242 e2e+a11y pass. CI in GitHub Actions has pre-existing infra failure (Playwright Chrome download fails in GHA; same as iters 98/101/102/103/104/105/106 — no revert needed). Local gate is canonical.
- nextRotationCategory: 108%5==3 → BUILD/tools; 109%5==4 → REVIEW; 110%5==0 → RESEARCH; 111%5==1 → BUILD/monetization; 112%5==2 → BUILD/seo-content
- higgsfieldSpent: 0
- updatedAt: 2026-06-26
- branch context: work on master; feature work on auto/<slug>

Notes: iter 107 BUILD/seo-content — shipped /israel-travel-apps.
  10 apps: Moovit | Waze | Gett | Rav-Kav Online | Lime | Pango | Wolt | Ten Bis | WhatsApp | Google Translate.
  Honest note on Rav-Kav Online international card compatibility (some travelers report failures — keep physical card).
  Uber-vs-Gett city coverage clarified (Uber = TLV only; Gett = everywhere else).
  Pre-flight checklist table for quick scan.
  Competitor gap: itsbaba.com/backpackisrael.com cover apps in passing; no competitor has a single dedicated hub.

NEXT: iter 108 = BUILD/tools. Top ready tools items:
  - [P2] Israel street food guide (/israeli-street-food-guide, M effort) — could qualify as seo-content; check tools backlog
  - [P2] Tel Aviv Light Rail tourist guide (/tel-aviv-light-rail, S effort) — Red Line opened 2023
  - [P2] Caesarea complete day trip guide (/caesarea-guide, S effort) — GYG/Viator tour CTAs
  - [P2] Free things to do in Israel (/free-things-to-do-israel, S effort) — high SEO volume
  - Check tools BACKLOG section for tools-category items first (rotation requires BUILD/tools this iter)
i18n: fr 20/~147, de 20/~147. Next BUILD/i18n: Batch 8 (israel-for-seniors or other high-intent guides).
Cron b7325b16 hourly @ :17. Loop history: 15 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 + 6 review passes; research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105.
