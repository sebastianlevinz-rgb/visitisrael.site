# I18N / TRANSLATION EPIC — en · fr · de · es

> Updated 2026-07-27: user request to ensure full translation into **es (Spanish)**, plus
> complete the fr + de guide catch-up (307 guides each were added to EN after Phase 6 closed).
> English (en) is the default at root. fr at /fr/..., de at /de/..., es at /es/...
>
> One bounded slice per loop iteration. NEVER bulk-translate in one shot.

## Current status snapshot (2026-07-28)

| Locale | Guides | Attractions | Regions | Itineraries |
|--------|--------|-------------|---------|-------------|
| en     | 396    | 65          | 11      | 6           |
| fr     | 87     | 61          | 11      | 6           |
| de     | 87     | 61          | 11      | 6           |
| es     | 50     | 61          | 11      | 6           |

**Gaps to close:**
- es guides: **346 missing** (50/396 done — ongoing, highest priority)
- fr guides: **307 missing** (EN guides added after Phase 2 Batch 18, iter408)
- de guides: **307 missing** (same)
- fr/de/es attractions: **4 missing each** (the 4 EN attractions added after Phase 4)

## Architecture (already shipped, do not re-do)

- Astro i18n: `locales: ['en','fr','de','es']`, `defaultLocale: 'en'`
- UI strings: `src/i18n/ui.ts` with `t(locale, key)` helper
- Hreflang: emitted in BaseLayout + sitemap
- Language switcher: in Header (desktop + mobile)
- Content: `src/content/guides/{fr,de,es}/`, `src/content/attractions/{fr,de,es}/`,
  `src/content/regions/{fr,de,es}/`, `src/content/itineraries/{fr,de,es}/`
- Route templates: `/src/pages/{fr,de,es}/[region].astro`,
  `/src/pages/{fr,de,es}/[region]/[attraction].astro`, etc.

## Honesty + quality rules (HARD)

- Machine-translation drafts are fine but:
  - Keep brand/partner names, proper nouns, place names as-is or use the standard exonym
    only when one genuinely exists (e.g. es "Mar Muerto" for Dead Sea is fine; keep
    "Tel Aviv", "Masada" as-is).
  - **Religious/contested sites** (Western Wall, Holy Sepulchre, Temple Mount/Dome of the
    Rock, Bahá'í, Bethlehem/West Bank): carry over the EN paired-naming and neutral framing
    exactly; do not let MT invent or take sides.
  - No fabricated prices/ratings. Keep ₪/$ + add local formatting only if trivially safe.
  - Each page: exactly one H1, valid hreflang, working internal links (locale-correct),
    passes the a11y gate. Add representative es/fr/de routes to smoke + a11y specs as
    they ship.
- For es: use neutral Latin-American Spanish register (not Spain-specific vosotros).

## Batching strategy

- **Batch size: 5 guides per run.** One locale per batch.
- **Priority order:**
  1. ES guides (0 → 394): highest priority, largest gap, new requirement
  2. FR guide catch-up (87 → 394): 307 remaining
  3. DE guide catch-up (87 → 394): 307 remaining
  4. FR/DE/ES attraction catch-up (4 missing each): small, do at end
- Within each locale, prioritise by EN guide SEO priority: high-traffic evergreen guides
  first (visa, best-time, cost, accommodation, transport, first-timer, tours, day-trips),
  then region guides, then seasonal/niche guides.

## How to find the next batch

```bash
# List EN guides not yet translated into a locale (example: es)
comm -23 \
  <(ls src/content/guides/*.md | xargs -n1 basename | sort) \
  <(ls src/content/guides/es/*.md 2>/dev/null | xargs -n1 basename | sort) \
  | head -5
```

Take the top 5 by priority (or head -5 if priority not obvious), translate each one.

## Progress tracker

### ES guides (45 / 396)
- Phase ES-0 — DONE. iter799 shipped 5/394:
  first-time-in-israel, visa-information, best-time-to-visit-israel,
  israel-cost-budget, transportation (02b1058).
- Phase ES-1 — DONE. iter801 shipped 5/394 (a0394fab):
  shabbat-guide, is-israel-safe, israel-accommodation-guide,
  israel-travel-tips, ben-gurion-airport-guide.
- Phase ES-2 — DONE. iter803 shipped 5/394 (1af15a0):
  ben-gurion-airport-transfers, car-rental-israel, driving-in-israel,
  israel-travel-insurance, israel-money-guide.
- Phase ES-3 — DONE. iter806 shipped 5/394 (d76ed3b):
  1-day-jerusalem-itinerary, 1-day-tel-aviv-itinerary, 3-days-in-eilat,
  3-days-in-galilee, 3-days-in-haifa.
- Phase ES-4 — DONE. iter808 shipped 5/394 (903b747):
  day-trips-from-jerusalem, day-trips-from-tel-aviv, best-tours-in-israel,
  dead-sea-guide, best-holy-land-tours.
- Phase ES-5 — DONE. iter812 shipped 5/394 (9609531):
  backpacking-israel, best-beaches-israel, cheap-flights-to-israel,
  kosher-food-guide, israel-packing-list-guide.
- Phase ES-6 — DONE. iter816 shipped 5/396 (c03d53e):
  3-days-in-israel, 3-days-in-tel-aviv, airlines-flying-israel-2026,
  3-days-in-negev, akko-acre-guide.
- Phase ES-7 — DONE. iter822 shipped 5/396 (eac9c25):
  christian-pilgrimage-holy-land, bethlehem-travel-guide, border-crossings,
  haifa-travel-guide, day-trips-from-eilat. LATAM Catholic + logistics market.
  Careful neutral framing on Bethlehem/separation barrier/Holy Sepulchre/Western Wall.
  ES guides: 35→40/396. 1265/1265 e2e pass.
- Phase ES-8 — DONE. iter823 shipped 5/396 (9557827):
  masada-visitor-guide, best-hotels-jerusalem, best-hotels-tel-aviv,
  eilat-travel-guide, tel-aviv-beach-guide. LATAM accommodation + iconic destination market.
  Honest caveats on Six Senses TLV/Nobu TLV openings; InterContinental Jerusalem "late summer 2026".
  ES guides: 40→45/396. 1275/1275 e2e pass.
- Phase ES-9 — DONE. iter826 shipped 5/396 (f8bdb180):
  church-holy-sepulchre-guide, christmas-in-israel, caesarea-guide,
  bar-bat-mitzvah-israel, bedouin-experience-israel.
  LATAM Catholic pilgrimage + diaspora + adventure market.
  Status Quo six-denomination framing (Greek Orthodox, Roman Catholic/Franciscan,
  Armenian Apostolic, Coptic, Syriac, Ethiopian Tewahedo); Checkpoint 300 logistics;
  Ministry of Tourism bus "not guaranteed each year"; Western Wall egalitarian Ezrat Yisrael;
  no fabricated ceremony prices or ratings.
  ES guides: 45→50/396. 1285/1285 e2e pass.

### FR guide catch-up (92 / 396 = 304 remaining)
- Phase FR-1 — DONE. iter828 shipped ff27fd98:
  3-days-in-israel, 3-days-in-galilee, airlines-flying-israel-2026,
  backpacking-israel, best-beaches-israel. Metropolitan French;
  YAML apostrophes double-quoted; /fr/* broken links → EN fallbacks.
  FR guides: 87→92/396. 1295/1295 e2e pass.
- Phase FR-2 — PENDING. Next FR BUILD iteration (iter829+):
  cheap-flights-to-israel, shabbat-guide, first-time-in-israel,
  is-israel-safe, ben-gurion-airport-guide.
  Target: FR guides 92→97/396.

### DE guide catch-up (87 / 396 = 309 remaining)
- Phase DE-1 — DEFINED iter825. After FR-1:
  3-days-in-israel, 3-days-in-galilee, airlines-flying-israel-2026,
  backpacking-israel, best-beaches-israel. Standard Hochdeutsch.
  Target: DE guides 87→92/396.

### Attraction catch-up (4 missing per locale)
- NOT STARTED. Low priority; do after guide catch-up is well underway.

### Previously completed (do not repeat)
- Infra (Phase 0–6, iters 12–408): Astro i18n config, UI dict, hreflang, language
  switcher, sitemap hreflang — ALL DONE.
- FR+DE regions (11/11 each): ALL DONE (Phase 3, iters 323–332).
- FR+DE attractions (61/65 each): DONE through Phase 4 Batch 12 (iter398).
- FR+DE itineraries (6/6 each): DONE (Phase 5, iter403).
- FR+DE guides batch 1–18 (87/394 each): DONE (Phase 2, iters ~22–408).
- ES regions (11/11): DONE (when added unclear, but present).
- ES attractions (61/65): DONE (partial — 4 still missing).
- ES itineraries (6/6): DONE.
