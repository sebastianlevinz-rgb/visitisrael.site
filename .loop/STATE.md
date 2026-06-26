# LOOP STATE

- iteration: 106
- lastMode: BUILD/monetization
- lastItem: Where to Stay in Israel accommodation hub (/israel-accommodation-guide)
- lastResult: SHIPPED 2195040. New accommodation types hub comparing 7 accommodation categories (hotel/kibbutz/zimmer/hostel/apartment/glamping/Bedouin tent) with comparison table, traveller profiles, and 3 Booking.com + Hostelworld affiliate CTAs. Gate: 0 type errors, 223 pages built, 240/240 e2e+a11y pass. CI in GitHub Actions has a pre-existing failure (Playwright Chrome download fails in GHA env); local gate is canonical.
- nextRotationCategory: 107%5==2 → BUILD/seo-content; 108%5==3 → BUILD/tools; 109%5==4 → REVIEW; 110%5==0 → RESEARCH
- higgsfieldSpent: 0
- updatedAt: 2026-06-26
- branch context: work on master; feature work on auto/<slug>

Notes: iter 106 BUILD/monetization — shipped /israel-accommodation-guide.
  Comparison table: hotel | kibbutz guesthouse | zimmer/B&B | hostel | serviced apartment | glamping | Bedouin tent.
  Monetization: Booking.com (hotels, luxury tier), Hostelworld/Abraham.
  Hub links to israel-zimmer-guide (existing), backpacking-israel (backlog), car-rental-israel, transportation.
  Competitor gap: thebrokebackpacker.com ranks #4 for "where to stay in Israel" — this page targets same query.

NEXT: iter 107 = BUILD/seo-content. Top ready seo-content items:
  - [P2] Israel travel apps guide (/israel-travel-apps, S effort) — quick S-effort content, high pre-trip intent
  - [P2] Tel Aviv Light Rail tourist guide (/tel-aviv-light-rail, S effort) — Red Line opened 2023, no dedicated guide
  - [P2] Israel eSIM & SIM card guide (already exists as israel-esim.md — check if it needs expansion)
  - [P2] Caesarea complete day trip guide (/caesarea-guide, S effort) — strong GYG/Viator tour CTAs
  - [P2] Free things to do in Israel (/free-things-to-do-israel, S effort) — high SEO volume
  Recommend: Israel travel apps guide (S effort, evergreen pre-trip intent, dense cross-links to transportation/airport).
i18n: fr 20/~147, de 20/~147. Next BUILD/i18n: Batch 8 (israel-for-seniors or other high-intent guides).
Cron b7325b16 hourly @ :17. Loop history: 15 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 + 6 review passes; research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105.
