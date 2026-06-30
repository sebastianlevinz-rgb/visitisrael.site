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

- Current phase: **Phase 2 BATCH 18 IN PROGRESS (iter 182, SHA f84cedd)**: tiberias-guide + masada-tours-compared + galilee-tours-compared + jerusalem-tours-compared (iter166) + jerusalem-food-guide + day-trips-from-haifa (iter167) + petra-from-israel + dead-sea-israel-vs-jordan + tel-aviv-to-jerusalem (iter168) + ben-gurion-airport-transfers + rav-kav-israel + israel-esim + tel-aviv-light-rail (iter172) + eilat-tours-compared + tel-aviv-tours-compared + eilat-diving-snorkeling (iter177) + cruise-shore-excursions-israel + israel-base-city-guide + israel-evening-activities (iter182) shipped in fr+de (38 locale pages total batch 18 so far). smoke.spec.ts +8 routes (iter182). fr 75/~147, de 75/~147 (home + plan-your-trip + 73 guides each). 361 pages built. Remaining batch 18 (7 original EN guides untranslated): israel-tour-packages, israel-travel-apps, israel-wine-wineries, israel-zimmer-guide, petra-from-eilat-vs-amman, petra-tours-compared, private-tours-israel. Also new EN guides needing FR+DE: 1-day-jerusalem-itinerary (iter173), free-things-to-do-israel (iter178), cheap-flights-to-israel (iter181) = 3 more. Total remaining: 10 guides. Next pick: 3–4 guides from remaining list.
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
- fr pages shipped: 75 / ~147 (home + plan-your-trip + 73 guides) · de pages shipped: 75 / ~147 (same)
- Notes: language decision = fr+de (user, 2026-06-22). Arabic explicitly NOT chosen (avoids RTL +
  contested-naming load). Hebrew not requested (audience is foreign tourists; old bilingual he/en site
  is on backup branch if ever revived).

## Rotation note

The i18n epic is large. To keep balance, the loop should interleave i18n phases with the normal
monetization→seo→tools→technical rotation — e.g. take an i18n phase roughly every other BUILD iteration
until the backlog of i18n phases is drained, rather than doing only i18n. STATE.nextRotationCategory
still drives non-i18n BUILD picks.
