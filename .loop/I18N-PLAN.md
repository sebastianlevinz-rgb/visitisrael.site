# I18N / TRANSLATION EPIC — fr + de

> Added 2026-06-22 (iter 11) at user request: translate the whole site into 2 more
> languages and run it through the loop automatically. Languages chosen: **French (fr)**
> and **German (de)**. English (en) stays the default at the root.
>
> This reverses the deliberate "English-only Astro rebuild" — so it ships PHASED through
> the normal gate (pnpm check && build && test:e2e), one bounded slice per loop iteration.
> NEVER bulk-translate + force-push the whole site in one shot.

## Target architecture (decide/lock in Phase 0)

- Astro i18n config: `i18n: { locales: ['en','fr','de'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } }`.
  → en at `/`, fr at `/fr/...`, de at `/de/...`.
- UI strings (header/footer/nav/breadcrumbs/CTA labels) via a typed dictionary in `src/i18n/`
  (e.g. `ui.ts` with `en/fr/de` maps + a `t(locale, key)` helper). No hard-coded English in shared components.
- Content: locale-specific markdown. Prefer per-locale subfolders or a `lang` field the Content Layer
  globs (mirror the old Next.js `content/{en,he}/...` pattern). A `[lang]` segment routes translated pages.
- `<html lang>` per locale; **hreflang alternates** (en/fr/de + x-default) in <head>; per-locale OG locale.
- Sitemap: emit all locale URLs with hreflang links (extend the existing serialize hook).
- Language switcher in the header (links to the same page in each locale; falls back to home if a
  translation doesn't exist yet).
- Keep affiliate links working unchanged (links route through src/config/affiliates.ts regardless of locale).

## Honesty + quality rules (HARD)

- Machine-translation drafts are OK for fr/de prose, but:
  - **Do not translate brand/partner names, place proper-nouns that have a standard exonym only when one
    genuinely exists** (e.g. de "Totes Meer" for Dead Sea is fine; keep "Tel Aviv", "Masada" as-is).
  - **Religious/contested sites**: carry over the EN paired-naming and neutral framing exactly; do not
    let MT invent or take sides. Flag these pages (Western Wall, Holy Sepulchre, Temple Mount/Dome of
    the Rock, Bahá'í, Bethlehem/West Bank) for extra care.
  - No fabricated prices/ratings (same rule as EN); keep ₪/$ + add local formatting only if trivially safe.
  - Each translated page must keep exactly one H1, valid hreflang, working internal links (locale-correct),
    and pass the a11y gate. Add representative fr/de routes to smoke + a11y specs as they ship.

## Phasing (each phase = ONE bounded, gated loop iteration; counts as a BUILD item)

- **Phase 0 — infra (no page content yet, or homepage-only vertical slice):** astro i18n config + `src/i18n/`
  UI dictionary (en/fr/de) + `t()` helper + language switcher in Header + hreflang in BaseLayout +
  `<html lang>` per locale + sitemap hreflang. Prove the pipeline on ONE page (home). Gate + ship.
- **Phase 1 — core navigational pages:** home, plan-your-trip, tools landing copy, 404, footer/nav strings
  fully wired. fr + de. Gate + ship.
- **Phase 2..N — guides, in batches of ~4–6 per iteration per locale** (39 guides). Prioritise highest-intent
  first: first-time, visa/ETA, best-time, transportation, cost-budget, tours, day-trips.
- **Phase — regions (11) in 2–3 batches.**
- **Phase — attractions (63) in batches of ~8–10.** (largest chunk; many iterations.)
- **Phase — itineraries (4) + legal (5, or keep legal en-only with a note).**
- **Phase — tools UI** (calculators/quiz/packing/map/distance/build-your-trip island strings).
- **Phase — QA sweep:** hreflang coverage, no-missing-translation fallbacks, per-locale sitemap, a11y on
  fr/de routes, dead-link check across locales.

## Progress tracker (loop updates this each i18n iteration)

- Current phase: **Phase 4 BATCH 11 DONE (iter393, SHA 2dadb40)**: 4 Nazareth attractions × FR+DE (8 locale pages): nazareth/basilica-of-the-annunciation (religiousSiteId preserved FR+DE), nazareth/marys-well (religiousSiteId preserved FR+DE), nazareth/mount-of-precipice, nazareth/old-city. smoke.spec.ts + a11y.spec.ts +8 routes. 629 pages. 872/872 e2e pass. FR+DE Nazareth attractions 4/4 COMPLETE. fr pages: ~132/~158. de pages: ~132/~158. Next: Phase 4 Batch 12 — Negev (5: avdat, bedouin-hospitality, ein-avdat, mitzpe-ramon, sde-boker). Remaining: 5 ready + 2 deferred (jerusalem/holy-sepulchre, jerusalem/temple-mount).
- Previous phase: **Phase 4 BATCH 10 DONE (iter388, SHA 2739d22)**: 5 Eilat attractions × FR+DE (10 locale pages): eilat/coral-beach, eilat/dolphin-reef (ticketInfo preserved: ~₪75 adulte/Erwachsene, bookingRequired: true), eilat/red-canyon, eilat/timna-park, eilat/underwater-observatory (ticketInfo preserved: ~₪119/~₪99, bookingRequired: false). smoke.spec.ts + a11y.spec.ts +10 routes. 619 pages. 852/852 e2e pass. FR+DE Eilat attractions 5/5 COMPLETE. fr pages: ~124/~158. de pages: ~124/~158.
- Previous phase: **Phase 4 BATCH 9 DONE (iter383, SHA 06bbb72)**: 3 Dead Sea attractions × FR+DE (6 locale pages): dead-sea/ein-gedi (ticketInfo preserved), dead-sea/mineral-beach, dead-sea/qumran. smoke.spec.ts + a11y.spec.ts +6 routes. 607 pages. 831/831 e2e pass. FR+DE Dead Sea attractions 5/5 COMPLETE (masada + ein-bokek from Batch 3, ein-gedi + mineral-beach + qumran now). fr pages: ~114/~158. de pages: ~114/~158.
- Previous phase: **Phase 4 BATCH 7 DONE (iter373, SHA c212fa5)**: 5 Akko attractions × FR+DE (10 locale pages): akko/bahai-mansion (religiousSiteId preserved), akko/hospitaller-knights, akko/khan-al-umdan (DE YAML quote bug fixed — FAQ reworded), akko/old-city, akko/templar-tunnel. smoke.spec.ts + a11y.spec.ts +10 routes. 589 pages. 796/796 e2e pass. FR+DE Akko attractions 5/5 COMPLETE. fr pages: ~100/~158. de pages: ~100/~158.
- Previous phase: **Phase 4 BATCH 6 DONE (iter368, SHA 523dea6)**: 5 Golan attractions × FR+DE (10 locale pages): golan/banias, golan/druze-villages, golan/mount-bental, golan/mount-hermon, golan/nimrod-fortress. Also: EN golan-nimrod-fortress.md Rule 1 fix (Crusader→Ayyubid). smoke.spec.ts + a11y.spec.ts +10 routes. 577 pages. 772/772 e2e pass. FR+DE Golan attractions 5/5 COMPLETE.
- Current phase: **Phase 4 BATCH 5 DONE (iter358, SHA c617f68)**: 5 Haifa attractions × FR+DE (10 locale pages): haifa/bahai-gardens (ticketInfo preserved), haifa/carmel-national-park, haifa/german-colony, haifa/stella-maris (religiousSiteId: stella-maris preserved), haifa/wadi-nisnas. smoke.spec.ts + a11y.spec.ts +10 routes. 562 pages. 750/750 e2e pass.
- Current phase: **Phase 4 BATCH 4 DONE (iter352, SHA e1a65c0)**: 6 Galilee attractions × FR+DE (12 locale pages): galilee/capernaum, galilee/magdala, galilee/mount-of-beatitudes, galilee/mount-arbel, galilee/tiberias, galilee/yardenit. religiousSiteId preserved on capernaum/mount-of-beatitudes/yardenit (FR+DE). YAML typographic-quote bug fixed in de/galilee-magdala + de/galilee-mount-of-beatitudes (U+201E „…" closings must use U+201C not ASCII U+0022). smoke.spec.ts + a11y.spec.ts +12 routes. 549 pages. 726/726 e2e pass.
- Current phase: **Phase 4 BATCH 3 DONE (iter348, SHA 107ae07)**: 5 Tel Aviv + Dead Sea attractions × FR+DE (10 locale pages). tel-aviv/carmel-market, tel-aviv/florentin, tel-aviv/tel-aviv-museum, dead-sea/ein-bokek, dead-sea/masada. masada ticketInfo block preserved in FR+DE. smoke.spec.ts + a11y.spec.ts +10 routes. 536 pages. 701/701 e2e pass.
- Current phase: **Phase 4 BATCH 2 DONE (iter343, SHA df43b40)**: 8 attractions × FR+DE (16 locale pages). Jerusalem: city-of-david, tower-of-david (ticketInfo), israel-museum, garden-tomb (religiousSiteId). Tel Aviv: old-jaffa, neve-tzedek, tayelet, rothschild. smoke.spec.ts + a11y.spec.ts +16 routes. 524 pages. 677/677 e2e pass. YAML safety: FR possessives/apostrophes in double-quoted strings throughout. Tower-of-david includes ticketInfo block (FR+DE). Garden-tomb preserves religiousSiteId: garden-tomb (FR+DE). Next: Phase 4 Batch 3 — remaining EN attractions not yet in FR+DE (holy-sepulchre + temple-mount need extra care with paired naming; defer to dedicated iteration). Survey remaining EN attractions for batch 3.
- Current phase: **Phase 4 BATCH 1 DONE (iter342, SHA 0d74524)**: 6 Jerusalem attractions (Western Wall, Old City, Yad Vashem, Mount of Olives, Via Dolorosa, Mahane Yehuda) in FR+DE (12 locale pages). New /fr/[region]/[attraction].astro + /de/[region]/[attraction].astro route templates. attractionsForRegion(locale?) + locale-aware attractionUrl/attractionSlug. FR/DE region pages now link to locale attractions. hreflang on all 12 new pages + EN attraction pages. smoke.spec.ts +12. 508 pages. Bug: DE via-dolorosa YAML ASCII \" inside double-quoted string — replaced with U+201C. 645/645 e2e pass. Next: Phase 4 Batch 2 — remaining Jerusalem attractions + Tel Aviv attractions.
- Current phase: **Phase 3 BATCH 3 DONE (iter332, SHA c273ad2)**: akko, caesarea, golan, nazareth shipped in FR+DE (8 locale pages). Caesarea Maritima/Philippi disambiguation in caesarea.md + golan.md (FR+DE). Golan international status note preserved. Bahá'í photography policy in akko.md. smoke.spec.ts +8 routes. 491 pages built (+8). 625/625 e2e pass. Regions now in FR+DE: jerusalem, tel-aviv, dead-sea, galilee, haifa, eilat, negev, akko, caesarea, golan, nazareth (11/11). **Phase 3 COMPLETE.** Next: Phase 4 — attractions ×63 in FR+DE (batches of ~8–10 per iteration).
- Current phase: **Phase 3 BATCH 2 DONE (iter327, SHA 04863a4)**: galilee, haifa, eilat, negev shipped in FR+DE (8 locale pages). Fix: DestinationCard.astro gains optional `href` prop; FR/DE home pages dynamically query content collection and link to `/fr/{slug}` / `/de/{slug}` for translated regions — resolves link-checker "8 unreachable" failure. smoke.spec.ts +8 routes. 481 pages built. Regions now in FR+DE: jerusalem, tel-aviv, dead-sea, galilee, haifa, eilat, negev (7/11). Next: Phase 3 Batch 3 — remaining 4 regions (akko, caesarea, golan-heights, tel-megiddo or similar) in fr+de, OR continue Phase 2 with remaining untranslated EN guides.
- Current phase: **Phase 3 BATCH 1 DONE (iter323, SHA c1c388f)**: Top 3 regions shipped in FR+DE: jerusalem, tel-aviv, dead-sea (6 locale pages). Infrastructure shipped: regions glob **/*.md, [region]/index.astro hreflang + language switcher, fr/[region]/index.astro + de/[region]/index.astro route templates. Bug: glob-loader used frontmatter slug as ID — fixed by removing slug from locale files. smoke.spec.ts +6 routes; a11y.spec.ts +6 routes. fr 92/~147, de 92/~147 (home + plan-your-trip + 87 guides + 3 regions each). 472 pages built. Next: Phase 3 Batch 2 — next 4 regions (galilee, haifa, eilat, negev) in fr+de; or continue Phase 2 with remaining untranslated EN guides.
- Current phase: **Phase 2 BATCH 18 DONE (iter196, SHA 0a8b047)**: All batch 18 guides shipped. Final 5 in iter196: petra-from-eilat-vs-amman + private-tours-israel + cheap-flights-to-israel + church-holy-sepulchre-guide + jerusalem-old-city-walking-tour (fr+de, 10 locale pages). Total batch 18: ~54 locale pages across all sub-iterations. smoke.spec.ts +10 routes (iter196); a11y.spec.ts +5 routes (iter196). fr 87/~147, de 87/~147 (home + plan-your-trip + 87 guides each). 390 pages built. Next: Phase 2 continues with remaining untranslated guides (regions + new EN guides not yet in fr/de), or Phase 3 regions.
- Phase 2 BATCH 17 DONE (iter 163, SHA 213083c): jewish-heritage-israel + lgbtq-travel-israel + israel-food-tours-cooking-classes shipped in fr+de (6 new locale pages). Paired naming: Mur des Lamentations/Kotel (FR), Klagemauer/Kotel (DE). STALE PLAN NOTE: prior batch 17 candidates (israel-gluten-free-guide, israel-in-summer, israel-yoga-retreats, solo-female-travel-israel) were invalid — EN guides don't exist or were already translated; always derive next batch by diffing EN guides vs fr/ directory. fr 56/~147, de 56/~147 (home + plan-your-trip + 54 guides each). 319 pages built.
- Phase 2 BATCH 15 DONE (iter 152, SHA b1cb4cc): qumran-guide + tel-aviv-white-city + israeli-street-food-guide + luxury-travel-israel shipped in fr+de (8 new locale pages). YAML typographic-quote bug re-confirmed: German „quotes" in YAML double-quoted strings must use U+201C (not ASCII U+0022) as closing character. Broken-link lesson: do not link to /fr/<slug> or /de/<slug> if the translated page doesn't exist yet — fall back to unprefixed /slug. fr 49/~147, de 49/~147 (home + plan-your-trip + 49 guides each). 303 pages built.
- Phase 2 BATCH 14 DONE (iter 147, SHA 56f45be): nazareth-travel-guide + caesarea-guide + akko-acre-guide + safed-tzfat-guide shipped in fr+de (8 new locale pages). Bulk locale-link correction (iter 148): 219 cross-locale links upgraded. fr 45/~147, de 45/~147 (home + plan-your-trip + 45 guides each). 293 pages built.
- Phase 2 BATCH 13 DONE (iter 142, SHA d8cf8f3): jordan-river-baptism + nazareth-sea-of-galilee-day-trip + jerusalem-bethlehem-day-trip + tel-aviv-nightlife + israel-accommodation-guide shipped in fr+de (10 new locale pages). YAML fix: German typographic „quotes" must use U+201C (not ASCII ") as closing in YAML double-quoted strings. fr 44/~147, de 44/~147 (home + plan-your-trip + 44 guides each). 285 pages built.
- Phase 2 BATCH 12 DONE (iter 137, SHA 63b8ad9): jaffa-travel-guide + tel-aviv-food-guide + israeli-food-cuisine-guide + masada-dead-sea-day-trip + israel-money-guide shipped in fr+de (10 new locale pages). YAML apostrophe fix for all FR files (French contractions break single-quoted YAML). Broken link /tel-aviv/white-city → /tel-aviv-white-city patched. fr 39/~147, de 39/~147 (home + plan-your-trip + 37 guides each). 273 pages built.
- Phase 2 BATCH 11 DONE (iter 132, SHA 815e5bb): solo-female-travel-israel + israel-with-kids + tel-aviv-vs-jerusalem + israel-events-festivals shipped in fr+de (8 new locale pages). Paired naming at contested sites: Mur des Lamentations/Kotel (fr), Klagemauer/Kotel (de). fr 34/~147, de 34/~147.
- Phase 1c — DONE (iter 22): mobile-menu nav labels. Phase 1a/1b/leak — chrome. NOTE: /plan-your-trip + 404 body copy need /fr/ + /de/ ROUTE VARIANTS (static host serves one /404.html for all 404s; root .astro pages have no locale variant) → fold into Phase 2 as .astro page clones (same proven pattern as the fr/de home pages). Page-aware switcher still deferred until ≥1 content page exists per locale.
- Phase 1a/1b — DONE (iters 15/17): Header + Footer chrome.
- Phase 1a — DONE (iter 15, 83379f9): Header chrome.
- Phase 0 — DONE (iter 12, 5b80c35); og:locale:alternate added iter14 (1dc48a5).
- Shipped in Phase 0: astro i18n config; src/i18n/ui.ts (locales/t()/helpers/dict); BaseLayout <html lang> + og:locale + reciprocal hreflang via `alternates` prop; header language switcher (desktop+mobile); /fr/ + /de/ localized landing pages (Hero + rollout notice + regions grid + plan CTA); homeAlternates() reciprocity on en home; smoke hreflang test + /fr/ a11y. Live: /fr/ + /de/ 200, lang+4 hreflang verified in prod.
- DEFERRED (later phases, not regressions): sitemap hreflang; page-aware language switcher (currently → locale home); translated header/footer nav strings (en pages unaffected; fr/de pages still show EN chrome); per-collection content translation.
- fr pages shipped: 95 / ~158 (home + plan-your-trip + 87 guides + 3 region pages + 3 new EN guides not yet in fr) · de pages shipped: 95 / ~158 (same)
- Notes: language decision = fr+de (user, 2026-06-22). Arabic explicitly NOT chosen (avoids RTL +
  contested-naming load). Hebrew not requested (audience is foreign tourists; old bilingual he/en site
  is on backup branch if ever revived).

## Rotation note

The i18n epic is large. To keep balance, the loop should interleave i18n phases with the normal
monetization→seo→tools→technical rotation — e.g. take an i18n phase roughly every other BUILD iteration
until the backlog of i18n phases is drained, rather than doing only i18n. STATE.nextRotationCategory
still drives non-i18n BUILD picks.
