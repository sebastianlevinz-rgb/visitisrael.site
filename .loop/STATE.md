# LOOP STATE

- iteration: 111
- lastMode: BUILD
- lastItem: Caesarea complete day-trip guide (/caesarea-guide) — seo-content+monetization, S effort
- lastResult: SHIPPED 2acd952. New /caesarea-guide page: Roman Theatre, Herodian harbour, Crusader walls, Aqueduct Beach, Ralli Museum, where to eat, combos with Haifa/Akko/Zichron Yaakov, getting there. 3 affiliate CTAs (GYG/Viator/Civitatis). 6 FAQs. Dense cross-links to 4 attraction sub-pages, day-trips-from-tel-aviv, akko-acre-guide, car-rental, national-parks-pass. 251/251 e2e pass. CI GitHub Actions showing pre-existing failure (every commit for 30+ iters; cloud env runner issue, not a regression).
- nextRotationCategory: 112%5==2 → BUILD/seo-content; 113%5==3 → BUILD/tools; 114%5==4 → REVIEW; 115%5==0 → RESEARCH; 116%5==1 → BUILD/monetization
- higgsfieldSpent: 0
- updatedAt: 2026-06-27
- branch context: work on master; feature work on auto/<slug>

Notes: iter 111 BUILD/monetization — Caesarea guide fills the gap between 4 existing attraction
  sub-pages and no guide-format visitor page. Same pattern as akko-acre-guide (iter72 precedent).
  Images used from existing /public/images/regions/caesarea/ and /sub-destinations/caesarea/.
  YAML apostrophe issue in frontmatter fixed (Bahai in single-quoted YAML strings; body
  content retains Bahá'í with proper diacritics). Gate: 0 check errors, 226 pages built, 251/251 e2e pass.

NEXT: iter 112 = BUILD/seo-content. Top seo-content candidates:
  - Israel "where to base yourself" guide (/israel-base-city-guide) — P2, S
  - Israel eSIM & SIM card guide (/israel-esim-sim-card) — P2, S
  - Tel Aviv Light Rail guide (/tel-aviv-light-rail) — P2, S
  - Tel Aviv Carmel Market guide (/tel-aviv-carmel-market) — P2, S
i18n: fr 20/~147, de 20/~147. Next BUILD/i18n: Batch 8.
Cron b7325b16 hourly @ :17. Loop history: 16 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 + 7 review passes; research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110.
