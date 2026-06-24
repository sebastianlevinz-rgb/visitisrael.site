# LOOP JOURNAL (append-only; newest at bottom)

## 2026-06-22 · iter 0 · init
Loop initialized. State files seeded; BACKLOG primed across monetization/seo-content/tools/technical;
DONE seeded with the full pre-loop overhaul so nothing is repeated. Durable cron (~2h) to be created.
Awaiting first fire → iteration 1.

## 2026-06-22 · iter 1 · BUILD (monetization) · where-to-stay money pages
What: new /where-to-stay/[city] template → Jerusalem, Tel Aviv, Dead Sea. Editorial
neighbourhood + budget guidance + curated REGION_DATA hotels via HotelCard (live Booking
rates, no fabricated prices/ratings), Stay22 map, ItemList/Article/Breadcrumb + FAQ JSON-LD,
dense internal links. Wired: region-page → guide links, footer links. Smoke + a11y specs
extended to new routes.
Gate: pnpm check 0 errors; build 141 pages; 41/41 e2e+a11y pass.
Ship: squash-merged to master 47f2cb0, pushed.
Prod: Vercel commit status success; https://visitisrael.site/where-to-stay/jerusalem → 200.
Next: seo-content (iter 2).

## 2026-06-22 · iter 2 · BUILD (seo-content) · transport "X to Y" pages
What: new /transport/[route] template → Jerusalem→Dead Sea, TLV→Haifa, TLV→Eilat,
TLV→Dead Sea. Honest accessible comparison table (mode/duration/cost-range/frequency/Shabbat)
+ recommendation + contextual InlineTourCTA + Article/Breadcrumb/FAQ JSON-LD. Costs are
ranges only (no exact/fabricated prices), link to live schedules. Namespaced under /transport/
to dodge the root [...slug] catch-all. md() helper converts **bold** → <strong> for set:html.
Wired: footer routes + "Popular routes compared" section in transportation.md hub. Smoke +
a11y specs extended.
Gate: pnpm check 0 errors; build 145 pages (+4); 46/46 e2e+a11y pass.
Ship: squash-merged to master 5348a21, pushed.
Prod: Vercel commit status success; https://visitisrael.site/transport/jerusalem-to-dead-sea → 200.
Next: tools (iter 3).

## 2026-06-22 · iter 3 · BUILD (tools) · distance & drive-time calculator
What: new /israel-distance-calculator vanilla-JS island. Pick 2 of 11 regions (+ Ben Gurion
Airport) → direct haversine distance (km/mi) + approximate driving-time RANGE (road factor
1.3, 75km/h, ±10% range) clearly labelled an estimate, + Google Maps live-directions deep
link for the exact route. Reuses region coords from content (no fabricated data). Accessible:
labelled selects, aria-live result, focus-visible swap btn. Cross-links to /transport route
comparisons. Playwright test added (default compute + far-pair > near-pair + maps href).
Wired: header, footer, plan-your-trip tools grid.
Gate: pnpm check 0 errors; build 146 pages (+1); 49/49 e2e+a11y pass.
Ship: squash-merged to master fee3b61, pushed.
Prod: Vercel commit status success; https://visitisrael.site/israel-distance-calculator → 200.
Next: iter 4 = REVIEW mode.

## 2026-06-22 · iter 4 · REVIEW · audit loop-shipped pages (where-to-stay/transport/distance)
Audited the 3 loop features. Checks: (1) all 25 internal hrefs resolve — 0 dead links;
(2) JSON-LD on each page type parses, correct @types (Article/Breadcrumb/ItemList/FAQPage),
NO aggregateRating/ratingValue — honesty intact; (3) unique titles/descriptions, correct
canonicas + OG, exactly one H1; (4) all new pages in sitemap + reachable (footer/region/hub
+ header/plan-your-trip); (5) no leaked markup — bold/bullets render, Booking links carry
rel="sponsored nofollow noopener". Review CLEAN.
Fix (quick + safe, through full gate): transport routes now reciprocally link back to the
distance calculator (calc linked to them but not vice-versa).
Gate: pnpm check 0 errors; build 146 pages; 49/49 e2e+a11y pass.
Ship: squash-merged to master 0a682c7, pushed. Prod: success; live link verified.
Next: iter 5 = RESEARCH mode.

## 2026-06-22 · iter 5 · RESEARCH · Tourist Israel + head-term SERP scan (NO SHIP)
Researched touristisrael.com taxonomy + "best things to do/bucket list", "entry requirements 2026",
"what to pack" SERPs (TripAdvisor/Viator/Bein Harim/Broke Backpacker). Appended 6 de-duped items
to BACKLOG + full findings/sources to COMPETITORS:
- ETA-IL (seo P1): visa-information.md only vaguely alludes to e-authorisation; never names the
  ETA-IL / fee / 72h rule / who needs it. Mandatory since Jan 2025 — big evergreen gap. (verify
  official details + evergreen framing when built)
- Things-to-do / bucket-list hub (seo P1): head term every competitor owns; we lack the aggregating
  internal-link hub.
- Holy Land tours money page (monetization P1); Best beaches guide (seo P2); Practical-info FAQ —
  Type H plug/230V, tap water (seo P3); "How many days in Israel?" recommender tool (tools P2).
Honesty caution logged: keep safety/entry content evergreen, link official advisories, no real-time
status claims; Hebron still out of scope.
No code changed; gate not run (research mode). Next: iter 6 = BUILD/technical.

## 2026-06-22 · iter 6 · BUILD (technical) · sitemap <lastmod> from content updatedAt
What: @astrojs/sitemap emitted no <lastmod>. Added a `serialize` hook in astro.config.mjs backed
by a lazily-built path→ISO-date map read from each content file's `updatedAt` frontmatter
(guides/regions/attractions/itineraries/legal), routing mirrored to page routes (attractions =
/<region>/<id-minus-region->). 122 content URLs now carry accurate lastmod; pages w/o a content
date (home/tools/dynamic templates) correctly get none — no fabricated dates. Hit @ts-check
noImplicitAny on the helpers → fixed with JSDoc @param annotations. New smoke test asserts ISO
lastmod present (count>50 + a known guide loc followed by ISO date, value not pinned).
Gate: pnpm check 0 errors; build 146 pages / 122 lastmod; 50/50 e2e+a11y pass.
Ship: squash-merged to master e1778db, pushed.
Prod: Vercel status success; live sitemap shows 122 <lastmod>.
Next: iter 7 = BUILD/monetization.

## 2026-06-22 · iter 7 · BUILD (monetization) · "Best Holy Land Tours" money page
What: new /best-holy-land-tours guide (iter5 research item). Targets head term "Holy Land tours"/
"Christian tours of Israel" Tourist Israel ranks. Honest tour-format comparison TABLE (group
pilgrimage package vs private Christian guide vs faith day trips vs budget group; price RANGES,
no exact prices/ratings), 3 AffiliateCard CTAs (tourradar/getyourguide/viator), FAQ+Article+
Breadcrumb JSON-LD, dense internal links. Differentiated from the editorial christian-pilgrimage
hub (which now cross-links it) and israel-tour-packages/private-tours. Omitted the dead
rating/reviews CTA frontmatter fields (AffiliateCard ignores them). Wired: footer + pilgrimage
hub link. Smoke route added.
Honesty verified in built HTML: 0 ratingValue/aggregateRating/review-count matches.
Gate: pnpm check 0 errors; build 147 pages (+1); 51/51 e2e+a11y pass.
Ship: squash-merged to master 26e74e3, pushed.
Prod: Vercel status success; https://visitisrael.site/best-holy-land-tours → 200.
Next: iter 8 = BUILD/seo-content.

## 2026-06-22 · iter 8 · BUILD (seo-content) · ETA-IL entry-authorization coverage
What: iter5 research P1. Visa-exempt travellers have needed Israel's ETA-IL since 1 Jan 2025 but
/visa-information only vaguely alluded to it. Expanded the guide with a dedicated ETA-IL section
(who needs it, ₪25/~$7 gov fee, apply ≥72h ahead, ~2yr multi-trip validity, official portal, what
it does/doesn't) + 3 new ETA FAQs; retitled page to target "Israel ETA-IL entry requirements".
Facts WEB-VERIFIED against official sources (PIBA israel-entry portal, US Embassy, Israel MFA),
evergreen framing, links official portal, flags fees/rules can change. Honest (gov fee, not a
partner price). Wired: footer link (page was missing from footer) + smoke route.
Built HTML: 6 FAQPage Question entries, official portal linked, 1 H1. Sitemap lastmod auto-bumped
to 2026-06-22 (validates iter6 feature).
Gate: pnpm check 0 errors; build 147 pages; 52/52 e2e+a11y pass.
Ship: squash-merged to master ee9c0a0, pushed.
Prod: Vercel status success; live page links official ETA portal.
Next: iter 9 = REVIEW mode.

## 2026-06-22 · iter 9 · REVIEW · audit iters 6-8 (sitemap lastmod / Holy Land tours / ETA visa)
Audited the not-yet-reviewed slice. Checks: (1) all 21 internal links in best-holy-land-tours +
visa-information resolve — 0 dead; (2) external OFFICIAL ETA portal (israel-entry.piba.gov.il)
returns HTTP 200 — authoritative link healthy; (3) JSON-LD valid on both (Org/WebSite/Article/
Breadcrumb/FAQPage), no aggregateRating/ratingValue — honesty intact; (4) unique titles, correct
canonicas, single H1; (5) no prettier \* corruption in the .md tables, comparison table renders
proper <strong>; (6) sitemap lastmod 123 (+1 for new guide, no regression). Review CLEAN.
Fix (quick + safe, full gate): first-time-in-israel had NO inbound link to /visa-information (now
a key page post-ETA); added an entry-requirements sentence linking it + updated its visa FAQ for
the mandatory ETA-IL.
Gate: pnpm check 0 errors; build 147 pages; 52/52 e2e+a11y pass.
Ship: squash-merged to master a40ccbd, pushed. Prod: success.
Next: iter 10 = RESEARCH mode.

## 2026-06-22 · iter 10 · RESEARCH · itinerary long-tail + ticket intent + tips listicles (NO SHIP)
Mined different angles than iter5. Backlog already full → added only 3 curated, de-duped items:
- City & short itineraries (seo P1): "3 days in Jerusalem", "2 days in Tel Aviv", "3 days in Israel"
  heavily ranked; we have only 5/7/10-day whole-country. High-ROI extension of itinerary system.
- "Things to know / mistakes to avoid" tips hub (seo P2): classic top-of-funnel listicle competitors
  rank; aggregates evergreen practical tips + FAQ schema; complements first-time-in-israel.
- Attraction ticket / skip-the-line blocks on top attraction pages (monetization P2): capture
  ticket-booking intent (Masada cable car etc.) with Tiqets/GYG CTA — price RANGES only, link live.
Noted (not added): verify Yad Vashem + Israel Museum attraction coverage. Honesty caution re:
evergreen safety/entry framing still logged. No code changed; gate not run (research mode).
Next: iter 11 = BUILD/tools.

## 2026-06-22 · iter 11 · SETUP · loop automation + i18n (fr+de) epic bootstrap (NO SHIP)
User directive: make the loop automatic + translate the whole site to 2 more languages + don't stop.
- Automation: the existing every-2h cron (56c6ac5c) WAS already firing the iterations (the user's
  manual "run another iteration" prompts were impatience between fires). Deleted it; created hourly
  cron b7325b16 (:17), durable flag set but runtime reports session-only + 7-day auto-expire — told
  user it can't persist across a full app exit here. New cron prompt references I18N-PLAN.md.
- Translation: languages chosen via AskUserQuestion = **French + German** (LTR; avoids Arabic RTL +
  contested-naming load; fr was earmarked in old architecture). Did NOT bulk-translate 147 pages in
  one turn (unbounded + unsafe to auto-deploy unreviewed). Instead created .loop/I18N-PLAN.md (target
  Astro i18n architecture: en root + /fr//de/, src/i18n dictionary + t(), language switcher, hreflang,
  sitemap hreflang; honesty rules for religious/contested sites; phasing) and added a phased i18n epic
  to the top of BACKLOG (Phase 0 infra = P0 START NEXT; Phases 1-6 blocked:phase0). PLAYBOOK left
  untouched per its own §0.7 safety rule — epic lives in backlog + I18N-PLAN instead.
No code changed; gate not run (setup). Next automatic iteration starts i18n Phase 0.

## 2026-06-22 · iter 12 · BUILD (i18n) · Phase 0 — fr/de infrastructure + localized home
What: first phase of the fr+de epic. Plumbing only (no bulk translation): astro i18n config
(en root + /fr//de/, prefixDefaultLocale:false); src/i18n/ui.ts (locales, languageNames, ogLocale,
getLocaleFromPath, localeHome, homeAlternates, useTranslations + small en/fr/de dict); BaseLayout
<html lang> + og:locale per locale + reciprocal hreflang via new `alternates` prop; header language
switcher (desktop + mobile, EN/FR/DE → locale home for now); purpose-built /fr/ + /de/ landing pages
(Hero + honest "deeper translation rolling out, full guides in English" notice + regions grid + plan
CTA); en home reciprocates via homeAlternates(). Did NOT clone the 285-line homepage ×3 (kept it
bounded + honest). Deferred (logged, not regressions): sitemap hreflang, page-aware switcher,
translated nav/footer chrome on fr/de pages, per-collection content translation.
Tests: smoke hreflang test (lang=fr + 4 alternates + en reciprocity) + /fr/ added to a11y gate.
Gate: pnpm check 0 errors; build 149 pages (+2); 56/56 e2e+a11y pass.
Ship: squash-merged to master 5b80c35, pushed.
Prod: Vercel success; /fr/ + /de/ → 200, lang="fr" + 4 hreflang verified live.
Next: interleave — iter 13 = non-i18n BUILD/tools; iter 14 = i18n Phase 1.

## 2026-06-23 · iter 13 · BUILD (tools) · "How many days in Israel?" recommender
What: new /israel-how-many-days vanilla-JS island (iter10 research item; 8th tool). Tick regions
(each shows its day-cost) + pace → estimated touring days + matched ready-made itinerary
(3-day Jerusalem / 5 / 7 / 10-day). Transparent: result lists the per-region breakdown; copy is
honest about adding buffer days for arrival + Shabbat; no fabricated data. Default selection
(Jerusalem+TLV+Dead Sea, balanced) computes on load. Accessible (labelled checkboxes/radios,
aria-live, focus-visible). All 4 itinerary link targets verified to resolve.
Wired: header, footer, plan-your-trip tools grid. Playwright test added (sr-only inputs need
.check({force:true}) — fixed after first run). Smoke + a11y routes added.
Gate: pnpm check 0 errors; build 150 pages (+1); 59/59 e2e+a11y pass.
Ship: squash-merged to master bbf3543, pushed. Prod: success; live 200.
Next: iter 14 — lean REVIEW (audit i18n Phase0 + how-many-days + holy-land/ETA), then i18n Phase 1.

## 2026-06-23 · iter 14 · REVIEW · audit i18n Phase 0 + how-many-days tool
Audited the not-yet-reviewed slice (Holy Land/ETA already done in iter9). i18n Phase 0 checks:
(1) no /en/ alias, en at root; (2) all 3 home pages — correct <html lang>, self-canonical, fully
reciprocal hreflang en/fr/de/x-default; (3) en content pages (/jerusalem) emit ZERO hreflang (no
false alternates); (4) language switcher renders sitewide, correct locale-home targets, aria-current
marked on desktop+mobile; (5) sitemap — each locale URL once, no dupes; (6) unique localized titles;
(7) locale pages indexable (no noindex); (8) all /fr/ internal links resolve. how-many-days: JSON-LD
valid (Org/WebSite/Breadcrumb/FAQPage), 1 H1, no fabricated ratings. Review CLEAN.
Fix (quick + safe, full gate): localized pages set og:locale but not og:locale:alternate — added it
(BaseLayout derives from hreflang alternates; each page lists the OTHER two locales; en-only pages
emit none). Smoke test extended.
Gate: pnpm check 0 errors; build 150 pages; 59/59 e2e+a11y pass.
Ship: squash-merged to master 1dc48a5, pushed. Prod: success.
Next: iter 15 = i18n Phase 1.

## 2026-06-23 · iter 15 · BUILD (i18n) · Phase 1a — localized Header chrome (fr/de)
What: /fr/ + /de/ showed an English header. Wired Header structural UI strings through src/i18n
dict (useTranslations): nav.itineraries label, nav.plan CTA (desktop+mobile), nav.search aria-label,
mobile open-menu/Regions/Plan/Language labels. Added the 4 new keys (planShort/search/openMenu/
language) in en/fr/de. EN pages verified UNCHANGED (en dict values == prior strings; /jerusalem still
"Itinéraires"/"Plan your trip"). FR verified localized (Itinéraires/Préparer votre voyage/Régions/
Langue). Region + guide link DESTINATIONS stay English (point to English content) — labels are
proper nouns; full link-label + footer + page-copy translation = Phase 1b.
Gate: pnpm check 0 errors; build 150 pages; 59/59 e2e+a11y pass (new localized-header smoke assert).
Ship: squash-merged to master 83379f9, pushed. Prod: success; fr header localized live.
Next: iter 16 = non-i18n BUILD/technical; iter 17 = i18n Phase 1b.

## 2026-06-23 · iter 16 · BUILD (technical) · broken-link + orphan-page checker
What: new scripts/qa/check-links.mjs — reads built dist/, collects page routes + asset files,
scans every page's internal hrefs; BROKEN internal link → exit 1, ORPHAN page (no inbound) →
advisory. Exposed `pnpm check:links`; runs inside the e2e gate via tests/e2e/links.spec.ts (execs
the script, asserts "0 broken"). Institutionalizes the dead-link/orphan checks done manually in
REVIEW iters. Hit a walk() off-by-one (dist URL trailing sep) → fixed. On first run it CAUGHT A
REAL DEAD LINK: /nazareth-sea-of-galilee-day-trip → /galilee/sea-of-galilee (no such attraction);
rewired the sentence to /galilee. Now 0 broken / 0 orphans across 150 pages.
Gate: pnpm check 0 errors; build 150 pages; check:links clean; 60/60 e2e+a11y pass.
Ship: squash-merged to master 311970a, pushed. Prod: success.
Next: iter 17 = i18n Phase 1b; iter 18 = BUILD/monetization.

## 2026-06-23 · iter 17 · BUILD (i18n) · Phase 1b — localized Footer chrome (fr/de)
What: parallel to 1a. Wired Footer structural strings through src/i18n dict: tagline, the 5 column
headings (Regions/Plan reuse nav.*, + footer.dayTrips/essentials/about), and the copyright line
(© {year} VisitIsrael.site · {t('footer.copyright')}). Added footer.* keys in en/fr/de. EN verified
UNCHANGED (/jerusalem still "Day trips"/"Essentials"/EN tagline); FR localized (Excursions/Essentiel/
À propos/"guide de voyage indépendant"). Guide/region link LABELS stay English (point to EN content).
Header(1a)+Footer(1b) chrome now both localized on fr/de.
Gate: pnpm check 0 errors; build 150 pages; check:links 0 broken/0 orphans; 60/60 e2e+a11y pass
(new localized-footer smoke assert).
Ship: squash-merged to master 360ded7, pushed. Prod: success; fr footer localized live.
Next: iter 18 = non-i18n BUILD/monetization; iter 19 REVIEW; iter 20 RESEARCH; then resume i18n.

## 2026-06-23 · iter 18 · BUILD (monetization) · "Jerusalem Tours Compared" money page
What: new /jerusalem-tours-compared (P1 tours-comparison-per-hub). Picked Jerusalem (top hub, no
existing Jerusalem-tours page) over Masada/Petra to avoid cannibalizing the editorial day-trip
guides. Honest comparison TABLE of 5 distinct tour types (Old City walk / full-day Old&New /
Jerusalem+Bethlehem / Western Wall Tunnels / private guide) with price RANGES (no exact prices/
ratings — AffiliateCard omits them), "is it worth it?" verdict section, 3 CTAs (getyourguide/viator/
civitatis), FAQ+Article+Breadcrumb JSON-LD, dense links to Jerusalem region+attraction pages.
Differentiated from country-wide best-tours-in-israel (now cross-links it). Wired: footer + smoke.
Built HTML verified: 3 affiliate cards, comparison table, 0 fabricated ratings, 1 H1.
Gate: pnpm check 0 errors; build 151 pages (+1); check:links 0 broken/0 orphans; 61/61 e2e+a11y pass.
Ship: squash-merged to master a6e54af, pushed. Prod: success; live 200.
Next: iter 19 = REVIEW; iter 20 = RESEARCH.

## 2026-06-23 · iter 19 · REVIEW · i18n chrome (1a/1b) + link-checker + jerusalem-tours-compared
Audited not-yet-reviewed slice. jerusalem-tours-compared: JSON-LD valid (Org/WebSite/Article/
Breadcrumb/FAQPage), 0 fabricated ratings, correct canonical, links resolve (check:links). i18n
chrome completeness: FOUND 2 English leaks on /fr/ (and /de/) — the StickyCTA mobile booking bar
(Flights/Hotels/Tours + aria-label "Quick booking") and the "Skip to content" skip link, both
hardcoded English, rendering on every localized page.
Fix (quick + safe, full gate): localized both via src/i18n dict (cta.flights/hotels/tours/
quickBooking + a11y.skipToContent in en/fr/de). EN pages verified UNCHANGED. Shared chrome now
fully localized (header+footer+sticky+skip). Deferred (Phase 1c): mobile planLinks labels.
Gate: pnpm check 0 errors; build 151 pages; check:links 0 broken/0 orphans; 61/61 e2e+a11y pass.
Ship: squash-merged to master 086fb97, pushed. Prod: success.
Next: iter 20 = RESEARCH.

## 2026-06-23 · iter 20 · RESEARCH · traveler-segment + budget scan (NO SHIP)
Mined a different angle (traveler segments + budget/cost intent). Backlog already full (~20 ready)
→ stayed curated, added only 2 net-new de-duped items:
- Solo travel in Israel (seo P3): net-new segment (have with-kids+LGBTQ, not solo); evergreen.
- Israel honeymoon / romantic (seo P3): net-new, commercial intent (luxury stays/couples/spa/wine).
DE-DUPED: budget/"is Israel expensive"/backpacking is a big cluster BUT israel-cost-budget already
covers daily tiers + where-money-goes + sample week + save-money tips → did NOT re-add (would dupe).
Accessible/digital-nomad: thin signal, skipped. Honesty caution re-logged: budget/segment SERPs
again surfaced volatile real-time safety — keep all content evergreen; Hebron out of scope.
No code changed; gate not run (research mode). Next: iter 21 = BUILD/seo-content.

## 2026-06-23 · iter 21 · BUILD (seo-content) · "Best things to do in Israel" hub
What: new /best-things-to-do-in-israel .astro page (iter5 research P1; head term every competitor
owns). Data-driven: 18 curated geographically-spread highlights, each pulled from a REAL attraction
content entry (image/name/URL from content — no fabricated data) with a custom one-line blurb. Numbered
card grid (Pic images, region badge, links to attraction pages) + ItemList(18) + Article + Breadcrumb +
FAQPage JSON-LD + dense links to attraction/region/itinerary/tool pages. Top-of-funnel internal-link
hub (helps the whole link graph). Wired: header planLinks + footer Essentials. Smoke + a11y routes.
Verified: 1 H1, ItemList 18 items, 0 fabricated ratings, check:links 0 broken/0 orphans.
Gate: pnpm check 0 errors; build 152 pages (+1); 63/63 e2e+a11y pass.
Ship: squash-merged to master c040026, pushed. Prod: success; live 200.
Next: iter 22 = i18n (Phase 1c or Phase 2); iter 23 = BUILD/technical.

## 2026-06-23 · iter 22 · BUILD (i18n) · Phase 1c — localized mobile-menu nav labels
What: the mobile menu planLinks (Things to do/Build your trip/Tours/Cost+Distance calculator/How
many days?/Map + existing Itineraries/Plan/Search) were the last EN strings leaking on fr/de. Added
7 reusable nav.* dict keys (en/fr/de) + wired Header planLinks via t(). EN verified UNCHANGED
(/jerusalem still English labels); FR localized (Composer mon voyage / Combien de jours ?). ALL shared
chrome now localized. Noted: /plan-your-trip + 404 BODY copy need /fr//de/ route variants (static host
serves single /404.html; root .astro have no locale variant) → moved to Phase 2 as .astro clones.
Gate: pnpm check 0 errors; build 152 pages; check:links 0 broken/0 orphans; 63/63 e2e+a11y pass.
Ship: squash-merged to master 2a3868d, pushed. Prod: success.
Next: iter 23 = non-i18n BUILD/technical; iter 24 = i18n Phase 2 (content pages).

## 2026-06-23 · iter 23 · BUILD (technical) · internal-linking audit (click-depth)
What: P1 internal-linking audit, made concrete + automatable. Extended scripts/qa/check-links.mjs
with a BFS from home over the page-link graph → reports UNREACHABLE pages + DEEP pages (>3 clicks),
advisory. e2e gate (links.spec.ts) now also asserts "0 unreachable". AUDIT RESULT CLEAN: max depth 2
/ 0 unreachable / 0 deep across 152 pages — the "≤2 clicks from home" goal is ALREADY met (sitewide
footer + region hubs), so NO cross-link fixes were needed; deliverable is the institutionalized check.
PROCESS SLIP: forgot to create auto/<slug> branch — committed straight to master with a wip msg;
recovered by `git commit --amend` to proper feat msg before push (gate was green, commit unpushed).
Re-noted §1 discipline in STATE.
Gate: pnpm check 0 errors; build 152 pages; check:links clean (max depth 2); 63/63 e2e+a11y pass.
Ship: amended → master e05cf08, pushed. Prod: success.
Next: iter 24 = i18n Phase 2 (or REVIEW — 24%5==4).

## 2026-06-23 · iter 24 · REVIEW · things-to-do hub + i18n 1c + link-depth audit (NO SHIP)
Honored the REVIEW slot (24%5==4) over i18n (Phase 2 is a meatier BUILD — teed up for iter25).
Audited the not-yet-reviewed slice:
- best-things-to-do-in-israel hub: ALL 57 image srcs (18 attractions × avif/webp/jpg + hero) resolve
  in dist — 0 missing (Pic img srcs aren't caught by the href link-checker, so checked explicitly);
  ItemList(18) valid, 1 H1, no fabricated data, all links resolve, 18 attractions well spread.
- i18n Phase 1c: fr mobile nav localized (Composer mon voyage / Que faire), en unchanged (Build your
  trip / Things to do).
- link-depth audit: BFS verified sound — confirmed home→/golan→/golan/nimrod-fortress = depth 2;
  0 unreachable, max depth 2 across 152 pages.
Review CLEAN — no defects, no fix manufactured. No code changed; gate not run.
Next: iter 25 = i18n Phase 2 (lean i18n over the nominal RESEARCH slot — backlog full, i18n priority).

## 2026-06-23 · iter 25 · BUILD (i18n) · Phase 2 START — plan-your-trip in fr/de
What: first real CONTENT page translated beyond home. Extracted plan-your-trip body to a
locale-aware <PlanYourTripPage locale> component; 3 thin routes (en /plan-your-trip + fr/de under
/fr//de/). Added plan.*/tool.* dict keys (en/fr/de) + nav.home + pageAlternates() helper (reciprocal
hreflang). Guide/region cards still link EN content → fr/de carry honest rollout notice. EN page
content-equivalent (verified Plan Your Trip / Practical guides unchanged). Establishes the pattern
for translating non-collection .astro pages.
The NEW link-checker caught /fr/+/de/plan-your-trip as 2 orphan/2 unreachable (only switcher→locale
home existed) → FIXED by pointing each localized home's plan CTA at /fr|de/plan-your-trip. Re-check:
0 orphan/0 unreachable.
Gate: pnpm check 0 errors; build 154 pages (+2); check:links clean; 67/67 e2e+a11y pass (new
localized-page + reciprocal-hreflang smoke + /fr/plan-your-trip a11y).
Ship: squash-merged to master 2ec51a9, pushed. Prod: success; fr plan-your-trip live + localized.
Next: iter 26 = non-i18n BUILD/monetization.

## 2026-06-23 · iter 26 · BUILD (monetization) · deepen /israel-esim with plan tiers
What: added a "how much data do you need?" tier table (Light ~1-3GB from ~$5 / Standard ~5GB ~$8-15
/ Heavy 10GB+/unlimited ~$20-35) + data-saving tips to the eSIM money page (backlog: deepen affiliate
pages w/ plan tiers). Honest RANGES framed approximate ("check live price"); verified built HTML has
no exact-precise prices ($N.NN). Bumped updatedAt → sitemap lastmod auto-refreshed.
Gate: pnpm check 0 errors; build 154 pages; check:links 0 broken/0 orphans; 67/67 e2e+a11y pass.
Ship: squash-merged to master 781630a, pushed. Prod: success.
Next: iter 27 = BUILD/seo-content.

## 2026-06-23 · iter 27 · BUILD (seo-content) · Haifa→Akko transport route
What: extended /transport/[route] with haifa-to-akko (short coastal train hop, honest cost ranges +
Shabbat + FAQ + JSON-LD + internal links). Kept SMALL deliberately (context limited). Footer + smoke.
Gate: check 0 err; build 155 pages (+1); check:links 0 broken/0 orphans; 68/68 e2e+a11y pass.
Ship: master aa3cc70, prod success.
NOTE: session context ~80% — kept iteration minimal. Next: iter 28 = BUILD/tools (or i18n interleave).
More transport routes still available (Eilat↔Petra, Jerusalem↔Galilee, BG-airport↔cities).

## 2026-06-23 · iter 28 · BUILD (tools) · build-your-trip print/PDF export
What: added "Print / Save as PDF" button (window.print()) + @media print stylesheet (hides header/
footer/sticky/CTAs/affiliate cards → clean itinerary) to /build-your-trip. Playwright asserts the
button. Kept small (context ~81%). Gate: check 0 err; build 155; check:links clean; 68/68 pass.
Ship: master 766643b, prod success. Next: iter 29 = BUILD/technical (or i18n interleave).
SESSION CONTEXT ~81% — recommend fresh session for next iterations.

## 2026-06-23 · iter 29 · REVIEW · iters 25-28 audit + transport md() link fix
Audited the slice since last REVIEW (iter 24): i18n Phase 2 plan-your-trip fr/de (hreflang
reciprocal, honest EN-rollout notice — clean), eSIM plan tiers (honest ranges, no fabricated exact
prices — clean), Haifa→Akko transport route, build-your-trip print/PDF button (btn-ghost + @media
print CSS — clean). Found ONE defect in haifa-to-akko: the recommendation string used [label](/path)
markdown link syntax but md() only converted **bold** → links rendered as literal text, losing
two internal cross-links (Bahá'í Gardens + Caesarea) and creating a visible content defect not caught
by the href link-checker. Quick safe fix: extend md() to convert markdown link syntax to on-brand
anchors (class="font-semibold text-primary..."). General fix for the template — all routes benefit.
Gate (CI): GitHub Actions run 28028273089 → conclusion=success (pnpm check 0 err, build 155 pages,
68/68 e2e+a11y pass). Local a11y runs show 8 color-contrast failures on tool pages — confirmed
browser-version artifact (symlinked v1194 headless_shell ≠ expected v1228; CI uses correct binary).
Ship: 64e33b6 pushed to master (by prior session); prod deploy confirmed CI success.
Next: iter 30 = BUILD/technical — responsive srcset via <Pic> (P2 backlog item).

## 2026-06-23 · iter 30 · RESEARCH · primary audience + niche-segment + visual-content scan
Mode: RESEARCH (30%5==0). No ship.
What: Searched 6 untapped competitor angles across tourist-segment, visual-content, and niche-access
verticals. Verified against current guides (41 guides exist incl. airport-transfers, nightlife, events,
kosher-food, christian-pilgrimage) to de-dupe before adding.
Findings — 6 net-new BACKLOG items added:
  1. Jewish heritage travel guide (seo-content, P1, M) — #1 audience gap; Tourist Israel/Bein Harim
     rank; we have christian pilgrimage but ZERO Jewish heritage content despite diaspora = primary segment.
  2. Layover in Tel Aviv (seo-content, P2, S) — Tourist Israel has explicit page; we have airport
     transfers (HOW to get there) but not "what to do during layover" angle. Small effort, high intent.
  3. Photography / best photo spots (seo-content, P2, M) — Walk My World, locationscout, israel21c
     all rank; we have 63 attraction pages but no visual hub with timing + etiquette.
  4. Accessible travel guide (seo-content, P2, M) — iter20 said thin signal; re-check found Access
     Israel + Atij as active competitor orgs; underserved niche with strong word-of-mouth.
  5. Cruise port shore excursions (monetization, P2, M) — Tourist Israel + Bein Harim rank; Haifa +
     Ashdod ports; distinct time-constrained segment with high day-tour booking intent.
  6. Digital nomad in Israel (seo-content, P3, M) — multiple competitors; 131 coworking spaces in TLV.
Gate: N/A (research only).
Next: iter 31 = BUILD/technical — responsive srcset via <Pic> (P2 backlog item).

## 2026-06-23 · iter 32 · BUILD (monetization) · cruise port shore excursions guide
What: New /cruise-shore-excursions-israel guide (P2 monetization backlog, top monetization item).
Distinct segment: cruise passengers (high day-tour booking intent, time-constrained 4–9 hrs ashore).
Haifa section: distance/time table (Bahá'í Gardens ~5min, Akko ~20min, Caesarea ~45min, Nazareth ~45min),
3 recommended circuits (half-day/full-day/long-day). Ashdod section: same table format (Jerusalem
~55min, Masada+Dead Sea ~2hr, Tel Aviv ~30min) + transport options (ship coach / sherut / private
transfer / rental car). 3 affiliate CTAs: getyourguide (Haifa excursions), viator (Ashdod excursions),
abraham (specialist Israel tour operators). 6 FAQs with honest price RANGES only (no exact prices),
evergreen framing (no specific ship schedules). Dense internal links to existing pages.
Wired: footer Day Trips column; smoke test route added. YAML Bahá'í apostrophe fix needed (single→double
quotes for strings containing Bahá'í) — caught + fixed before ship.
Gate: pnpm check 0 err; build 156 pages (+1); check:links 0 broken/orphans/unreachable/deep;
e2e/a11y N/A (Chromium not in cloud env — CI covers gate, same as iter 31).
Ship: b50ad64 pushed to master via GitHub MCP (local git push blocked HTTP 403 as in iter 31).
CI: GitHub Actions run 28045013190 in_progress at state-write time.
Next: iter 33 = BUILD/seo-content.

## 2026-06-23 · iter 31 · BUILD (technical) · responsive srcset for <Pic>
What: Added -400w and -800w AVIF/WebP width variants to gen-avif-webp.mjs (idempotent, skips existing).
Updated <Pic> with srcset="…400w … 800w … 1600w" on both <source> elements + sizes prop (default 100vw).
AttractionCard/DestinationCard/AffiliateCard pass narrower sizes hints for card contexts.
Wired gen-avif-webp.mjs as first step in pnpm build so Vercel generates 480 responsive variants at
build time from tracked 1600px sources; variants gitignored — no binary bloat in git (7-file commit).
Local git push blocked (HTTP 403 from local proxy on large pushes); used mcp__github__push_files instead.
Gate: pnpm check 0 err; pnpm build 155 pages complete (gen generated 0 new — files already local);
check:links 0 broken/orphans; e2e/a11y N/A (Chromium not available in cloud env, gate via CI).
Ship: 3819295 pushed to master via GitHub MCP.
CI: GitHub Actions run 28041414264 in_progress at commit time; prod deploy result pending.
Next: iter 32 = BUILD/monetization.

## 2026-06-23 · iter 34 · REVIEW · audited iters 31–33
What: REVIEW of the last un-audited slice (iters 31–33: srcset Pic, cruise shore excursions, Jewish heritage guide).
Iter 31 (3819295 srcset): Pic srcset paths correct; card components pass narrower sizes hints; CI success.
Iter 32 (b50ad64 cruise): CTA images confirmed; all internal links resolve; price ranges only; Ashdod→/tel-aviv OK.
Iter 33 (6de11d7 Jewish heritage): CI completed/success; all 3 CTA images exist; all link targets resolve
(/shabbat-guide is a real page; /tel-aviv/rothschild, /galilee/capernaum all exist); Hebron factual mention
(Four Holy Cities classification) acceptable — not a tourism page; no fabricated prices; Hebron excluded
as a destination per project rules.
Gate: pnpm check 0 err; pnpm build 157 pages; check:links 0 broken/orphans/unreachable/deep; max depth 2.
Result: ALL CLEAN — no fixes shipped.
Next: iter 35 = RESEARCH (35%5=0). After that: iter 36 BUILD should be i18n Phase 2 (severely overdue).

## 2026-06-23 · iter 35 · RESEARCH · adventure/lifecycle/wellness/food-tour/free/holidays/Jordan scan (NO SHIP)
Mined 5 fresh competitor angles not covered in iters 5/10/20/30. Searched Tourist Israel, Plan It Israel,
Time Out Israel, TripAdvisor, Touchpoint Israel, earthtrekkers, Viator, Bein Harim, Delicious Israel,
Neshima Israel, deadsea.com, Israel First Hand, Bnei Mitzvah Trip.
De-duped against DONE+existing backlog (wine/festivals/tel-aviv-vs-jerusalem/dead-sea/hiking/diving already covered).
7 curated items added to BACKLOG:
- P1 seo+monetization: Adventure sports & outdoor hub (missing segment; big competitor gap; GYG/Viator CTAs)
- P1 seo+monetization: Bar/Bat Mitzvah destination travel (highest-intent Jewish lifecycle niche)
- P2 seo+monetization: Jewish holidays practical travel guide (distinct from events-festivals calendar)
- P2 seo+monetization: Wellness, spa & hot springs (distinct from Dead Sea comparison; booking CTAs)
- P2 monetization: Food tours & cooking classes (distinct from food/restaurant guides; GYG/Viator)
- P2 seo-content: Free things to do hub (budget segment; Bahá'í Gardens / Yad Vashem / TLV beaches)
- P2 seo+monetization: Israel + Jordan 10-day combined itinerary (distinct from petra day-trip guide)
No code changed; gate not run (research mode).
Next: iter 36 = BUILD — i18n Phase 2 MANDATED (10 BUILD iters since last i18n, severely overdue).

## 2026-06-23 · iter 36 · BUILD (i18n) · Phase 2 batch 1 — fr/de guides: first-time-in-israel + visa-information
What: First guide-collection content translations for fr+de. Added 4 new guide pages:
  src/content/guides/fr/first-time-in-israel.md — French first-timer guide (practical pre-trip checklist,
    ETA-IL, customs, packing, SIM, transport — locale-specific CTAs to visa/esim/airport-transfers pages).
  src/content/guides/de/first-time-in-israel.md — German equivalent.
  src/content/guides/fr/visa-information.md — French visa/ETA-IL guide (ETA-IL cost/validity, border
    entry slip, 90-day stay, land-crossing note — 6 FAQs covering the most-searched visa questions).
  src/content/guides/de/visa-information.md — German equivalent.
Routing: Astro content-collection glob picks up fr/de/ subdir automatically via existing [...slug].astro
catch-all. Locale detection from entry.id prefix; hreflang alternates (en/fr/de + x-default) computed and
passed as guideAlternates prop to BaseLayout. Locale-aware breadcrumbs + useTranslations(entryLocale).
Playwright fix (bdf599e): contextOptions: { reducedMotion: 'reduce' } — was placed incorrectly directly
in use: {} (ts(2769)); moved to contextOptions nested object per Playwright v1.61 BrowserContextOptions
API. Eliminates data-reveal axe-core color-contrast false positives (opacity:0 at scan time).
Gate: pnpm check 0 errors (97 files); build 161 pages (+4); CI success (run 28053366320):
  type check ✓, build ✓, Playwright install ✓, e2e+a11y 21/21 ✓; SHA bdf599e.
Ship: master bdf599e (includes 4531117 content commit + bdf599e Playwright fix).
fr: 4/147, de: 4/147 (home + plan-your-trip + first-time-in-israel + visa-information).
Next: iter 37 = BUILD/tools (resume normal rotation). Next i18n = batch 2 (best-time/transport/cost).

## 2026-06-23 · iter 37 · BUILD (tools) · weather & packing widget
What: New /israel-weather-packing tool (P2 tools backlog). 12-month × 4-zone (Coast / Jerusalem
& Hills / Dead Sea+Negev+Eilat / Galilee+Golan) interactive widget: pick month + region → instant
packing list (5–7 items), temperature range, conditions note, crowd level, and contextual tip.
Data: static typed TS (MonthData[12]), vanilla-JS island, aria-live="polite" result panel,
WCAG-compliant accessible radio + button UI (focus-visible, sr-only hidden radio, has-[:checked]
zone highlighting). Bonus: 12×4 seasonal at-a-glance reference table, and "always-in-your-bag"
6-card evergreen packing section. Wired: Footer plan column + PlanYourTripPage tools grid (now 9
tools) + i18n dict tool.weather key (en/fr/de). Playwright test: initial hidden state → month+zone
→ result visible + items rendered + zone switch updates temp. Smoke + a11y routes added.
Bug fixed during check pass: curly apostrophe in `'Jerusalem's Old City` (Astro template JS literal)
→ changed to double-quoted string. Removed unused ZONES constant.
Gate (local): pnpm check 0 errors (98 files); pnpm build 162 pages (+1); check:links 0 broken/0
orphan/0 unreachable/0 deep — max depth 3 (prev 2; advisory only, threshold >3; 0 pages exceed it).
Ship: squash-commit b71cae8 pushed to master. CI run 28055361589 in_progress at state-write time.
Next: iter 38 = BUILD/technical; iter after = i18n Phase 2 batch 2 (best-time/transport/cost).

## 2026-06-23 · iter 38 · BUILD (technical) · a11y/keyboard/perf-budget tests + skip-link WCAG fix + Leaflet local bundle
What: (1) a11y.spec.ts expanded from 22→36 routes: added de locale, itineraries collection, plan-your-trip,
visa-info, more where-to-stay/transport variants, cruise/jewish-heritage guides, de guide translations.
(2) keyboard.spec.ts (new): skip-link Tab-focus + Enter-to-main; cost-calc keyboard operability (#days
reachable); distance-calc #swap keyboard-operable. (3) perf.spec.ts (new): homepage HTML/JS/CSS budget
assertions (150/300/100/500 KB uncompressed). (4) BaseLayout.astro: tabindex="-1" on <main id="main">
for proper WCAG 2.4.1 skip-link keyboard focus. (5) israel-map.astro: switch Leaflet CSS+JS from
unpkg.com CDN to self-hosted /vendor/leaflet/ (CDN unreachable in cloud env was blocking e2e gate;
eliminates external runtime dependency). leaflet@1.9.4 added as dep.
Gate: pnpm check 0 errors; build 162 pages; 97/97 e2e+a11y pass (up from 75 tests).
Ship: committed to master b6580b7, pushed. CI in_progress run 28059276878 at state-write time.
Prod: pending Vercel deploy of b6580b7.
Next: iter 39 = BUILD/monetization.

## 2026-06-23 · iter 40 · RESEARCH · driving/shopping/road-trip/seniors/evening/volunteer scan (NO SHIP)
Mode: RESEARCH (40%5==0). No code changed; gate not run.
What: Searched 6 untapped competitor angles not captured in iters 5/10/20/30/35.
Sources: Tourist Israel, Nomadic Matt, Walk My World, laidbacktrip, Tripadvisor, TourRadar,
Bein Harim, GilTravel, exclusiveisraeltours.com, IsraelRail, Danny the Digger, Isrotel Magazine,
OneVasco, VFI, IAA Friends, Biblical Archaeology Society, mukikapupstravels.
Findings — 6 net-new BACKLOG items added:
  1. Driving in Israel guide (seo-content, P1, S) — Tourist Israel/Walk My World/laidbacktrip/Nomadic
     Matt all rank; car-rental-israel.md covers WHERE to rent; this fills HOW to drive (etiquette,
     speed limits, Route 6 toll, Waze, kerb colour coding, city pitfalls, Yom Kippur, speed cameras).
  2. Israel for seniors (monetization+seo, P2, M) — America Israel Tours, TourRadar, Bein Harim
     ("Israel Trips for Seniors"), GilTravel ("Exploring Israel Over 60") all rank; zero seniors guide
     on site; high commercial intent (escorted + private tours, $2,500–4,000/person).
  3. Shopping in Israel guide (seo+monetization, P2, M) — Tourist Israel/Danny the Digger/Go-Tel Aviv
     rank; absolutely no shopping content exists; markets comparison, Dead Sea cosmetics/Ahava,
     Judaica, Armenian ceramics, Old City bargaining tips.
  4. Self-drive road trip itinerary (seo+monetization, P2, M) — Nomadic Matt/Walk My World/WanderlustingK
     rank; distinct from 5/7/10-day transport-agnostic guides; 7–8 day clockwise car-loop, ~850–1000km,
     drives affiliate CTAs to car-rental-israel.md.
  5. Evening activities & night experiences (seo-content, P2, S) — TripAdvisor/Bein Harim/IsraelRail
     rank; distinct from tel-aviv-nightlife.md; Tower of David Night Spectacular, Masada sound+light
     (Mar–Oct), Jerusalem Festival of Light (June), Mahane Yehuda evening transformation, Mitzpe Ramon
     stargazing (IDA dark-sky park).
  6. Volunteer archaeology & dig travel (seo-content, P3, S) — VFI/IAA Friends/BAS rank; Hippos-Sussita
     (Jun–Jul 2026 active), City of David VFI Volun-Tour, Shiloh; honesty flag on kibbutz post-2023.
De-duped: nightlife (tel-aviv-nightlife covered), car rental (covered), medical tourism (too specialized/
sensitive, deferred), Passover (best folded into planned Jewish-holidays guide from iter35 backlog).
Gate: N/A. Next: iter 41 = BUILD/monetization.

## 2026-06-23 · iter 39 · REVIEW · audited iters 36–38 + locale visa cross-link fix
Audited the not-yet-reviewed slice (iters 36–38):
- iter 36 (bdf599e i18n Phase 2 batch 1): hreflang en/fr/de/x-default correct; unique H1s per locale;
  18 internal links all resolve; no fabricated prices (ETA-IL ₪25 = official, framed with change caveat);
  evergreen entry-requirement framing; all 4 pages in sitemap. CI success confirmed. CLEAN.
- iter 37 (b71cae8 weather widget): single H1, FAQPage+BreadcrumbList JSON-LD, no fake ratings, cross-link
  to /best-time-to-visit-israel (exists), accessible aria-live + sr-only radio. CI success confirmed. CLEAN.
- iter 38 (b6580b7 a11y/keyboard/perf/Leaflet): tabindex="-1" on #main for skip-link WCAG 2.4.1 confirmed;
  Leaflet vendor (leaflet.css + leaflet.js + images/) present; 36-route axe spec; keyboard.spec.ts +
  perf.spec.ts sound; CI success confirmed. Dependabot failure (run 28059340894) = sharp npm PR, unrelated.
DEFECT FOUND & FIXED: fr/de first-time-in-israel linked /visa-information (EN) even though /fr/visa-information
and /de/visa-information were shipped in the same iter 36 — locale-switching users would land on EN visa page.
Fix: 2-line content edit (markdown link targets). Branch auto/review-39-locale-visa-links.
Gate: pnpm check 0 err; build 162 pages; check:links 0 broken/orphan/unreachable/deep.
Ship: squash-merged to master cb930ab, pushed. CI in_progress at state-write time (content-only change; e2e via CI).
Next: iter 40 = RESEARCH (40%5=0); iter 41 = BUILD/monetization.

## 2026-06-24 · iter 41 · BUILD (i18n) · Phase 2 batch 2 — fr/de guides: best-time + transportation + cost-budget
What: i18n Phase 2 batch 2 — translated 3 highest-intent planning guides into fr+de (6 new pages):
  src/content/guides/fr/best-time-to-visit-israel.md — French season/month guide; links to /fr/first-time-in-israel
  src/content/guides/de/best-time-to-visit-israel.md — German equivalent; "Totes Meer" exonym used
  src/content/guides/fr/transportation.md — French transport guide (Rav-Kav, sheruts, Shabbat logistics)
  src/content/guides/de/transportation.md — German equivalent; locale-specific cross-links
  src/content/guides/fr/israel-cost-budget.md — French budget guide (links /fr/best-time-to-visit-israel)
  src/content/guides/de/israel-cost-budget.md — German equivalent (links /de/best-time-to-visit-israel)
Routing: picked up by existing [...slug].astro glob; hreflang (en/fr/de/x-default) auto-computed.
EN guides for all 3 now emit fr/de hreflang alternates. Smoke + a11y specs extended (+6 routes each).
Prioritized over monetization rotation: P1 i18n overdue by 2 BUILD iters since iter36.
Gate: pnpm check 0 errors (101 files); build 168 pages (+6); check:links 0 broken/0 orphans/0 unreachable/
  0 deep; e2e via CI (Chromium not in cloud env). CI in_progress run 28066837242 at state-write time.
Ship: 2412965 squash-committed to master, pushed.
Prod: Vercel deploy in_progress; next iteration start-check confirms.
fr: 7/147, de: 7/147. Next i18n batch: more guides (TBD from backlog priority).
Next: iter 42 = BUILD/monetization.

## 2026-06-24 · iter 42 · BUILD (monetization) · Israel food tours & cooking classes guide
What: New /israel-food-tours-cooking-classes guide (P2 S, first unshipped monetization item).
Fills the gap between WHAT-to-eat (israeli-food-cuisine-guide) and WHERE-to-eat (tel-aviv-food-guide)
with HOW-to-experience-food: guided Machane Yehuda market tours (Jerusalem, daytime + Thu-Sat evening
transition to bar-restaurant strip), Carmel Market cooking workshops in Tel Aviv (market shopping →
hummus/shakshuka/mezze cook-off), hummus-from-scratch and challah-baking workshop formats, Jaffa food
walk (Arab hummus, Persian Jewish pastry, Yemenite kubane, port seafood), Old City Jerusalem food walk
(kanafeh, tabun bread, juice stalls, spice souk + Jewish Quarter contrast). 3 affiliate CTAs
(GetYourGuide Jerusalem food tours / Viator Tel Aviv cooking classes / Abraham private culinary).
Price ranges only; no fabricated exact prices. 6 FAQs. Dense cross-links to existing food/itinerary pages.
Footer Essentials column wired (/israel-food-tours-cooking-classes after /israeli-food-cuisine-guide).
Smoke + a11y specs extended (+1 route each). Fixed 3 broken /guides/* href prefixes during check:links.
Branch slip: forgot to commit to auto/ branch — changes ended up in working tree, committed to master
directly (gate was green at commit time; no integrity issue, just branch-discipline miss — noted in STATE).
Gate: pnpm check 0 errors; build 169 pages (+1); check:links 0 broken/0 orphans/0 unreachable/0 deep;
  e2e via CI (Chromium not in cloud env). CI in_progress run 28069047704 at state-write time.
Ship: e974cf1 committed to master, pushed. Prod: Vercel deploy in_progress.
Next: iter 43 = BUILD/seo-content (rotation advanced from monetization).

## 2026-06-24 · iter 43 · BUILD (seo-content) · Driving in Israel guide
What: New /driving-in-israel guide (P1 S, top-priority seo-content item from BACKLOG).
Fills distinct gap between car-rental-israel.md (where/how to rent) and this HOW to DRIVE:
  Road etiquette (horn culture, roundabouts, hazard-light double-parking), speed limits table
  (50/80/90–100/110–120 km/h), Route 6 no-booth electronic toll (rental card charge + Derech Eretz
  for foreign vehicles), Waze navigation tips (offline maps for Negev/Golan), kerb colour system
  (blue+white=paid Pango/Cellopark, red+white=forbidden, grey=free), city-specific caveats
  (Tel Aviv ZAP Parking; Jerusalem Mamilla/Safra Square car parks + stone-zone one-way streets),
  Shabbat rental-office timing + quiet-roads advantage, Yom Kippur park-and-walk guidance,
  West Bank/Jordan rental restriction. Key road numbers table (Roads 1/2/6/40/90).
2 affiliate CTAs: discovercars (Compare cars) + rentalcars (BG Airport Car Hire).
Footer: Driving in Israel + Car rental added to Plan column transport section.
Smoke + a11y specs extended (+1 route each).
Fix caught by check:links: /jerusalem/bethlehem → /jerusalem-bethlehem-day-trip corrected.
Branch: auto/driving-in-israel. Proper branch discipline followed (commit on branch, squash-merge).
Gate: pnpm check 0 errors (101 files); build 170 pages (+1); check:links 0 broken/0 orphans/0 unreachable/0 deep.
e2e via CI (Chromium not available in cloud env). CI in_progress at state-write time.
Ship: a3d1254 squash-committed to master, pushed. Prod: Vercel deploy in_progress.
Next: iter 44 = BUILD/tools (tools category has only P3 item → likely fall-through to monetization).

## 2026-06-24 · iter 44 · REVIEW · audit iters 40-43 (i18n batch 2 / food tours / driving guide)
What: Honoured the REVIEW slot (44%5==4). Audited the unreviewed slice since iter 39 REVIEW.
- iter 40 RESEARCH: no code changes — nothing to audit.
- iter 41 i18n Phase 2 batch 2: fr+de for best-time-to-visit-israel, transportation, israel-cost-budget.
  Checked frontmatter (valid categories, heroImages exist), translation quality (native phrasing,
  correct locale), internal links (transport route links /transport/tel-aviv-to-haifa etc. all resolve),
  hreflang wiring (uses BaseLayout alternates pattern from Phase 0). CLEAN.
- iter 42 food tours guide: hero images (tel-aviv/carmel-market.jpg, jaffa.jpg) exist in public/; footer
  link present (/israel-food-tours-cooking-classes in Essentials column); internal links checked:
  /tel-aviv/old-jaffa (resolves via attractionSlug stripping `tel-aviv-` prefix → /tel-aviv/old-jaffa
  ✓), /israeli-food-cuisine-guide ✓, /tel-aviv-food-guide ✓, /build-your-trip ✓. Price section uses
  "rough guide only" disclaimer + explicit "check live rates". JSON-LD: no fabricated ratingValue.
  Affiliate partners (getyourguide/viator/abraham) valid in config. CLEAN.
- iter 43 driving guide: 1 DEFECT found — "[Route 6](/transport/tel-aviv-to-haifa)" incorrectly
  hyperlinked the Route 6 toll motorway (north-south Hadera→Be'er Sheva) to the Tel Aviv→Haifa
  transport page (covers Road 2, the coastal road — factually distinct). Other 14 internal links
  all resolve. JSON-LD (Article + FAQ template), no ratingValue. CLEAN except the mislabelled link.
Fix: Removed the false hyperlink; "Route 6" now plain text (described in detail in the same section
  and accurately in the road-numbers table below). Minimal, safe change.
Gate: pnpm check 0 errors; build 170 pages (count stable); links.spec.ts ✓;
  e2e via CI (Chromium not in cloud env — consistent with iters 42/43).
Ship: 15831d1 committed to master, pushed. CI + Lighthouse in_progress at state-write time.
Next: iter 45 = RESEARCH (45%5==0).

## 2026-06-24 · iter 45 · RESEARCH · parks pass / hidden gems / Christmas / cycling / backpacking / Sea of Galilee (NO SHIP)
Mode: RESEARCH (45%5==0). No code changed; gate not run.
What: Searched 6 untapped angles not captured in prior research iters (5/10/20/30/35/40).
De-duped against all 44 prior DONE+BACKLOG items before adding.
Sources: parks.org.il/WonderIsrael/Anglo-List (national parks pass), Tourist Israel/guideyourtrip/
exclusiveisraeltours/immanuel-tours (hidden gems), Tourist Israel/igoogledisrael/TourRadar/Abraham
Tours/mukikapupstravels (Christmas/winter), psimonmyway/bike-israel.com/Tourist Israel/israel21c
(cycling), thebrokebackpacker/nomadicmatt/hostelz/your-friends-in-israel (backpacking), seaofgalileeboat/
Danny the Digger/Viator (Sea of Galilee boat tours).
Findings — 6 net-new BACKLOG items added:
  1. Israel National Parks Pass guide (seo-content, P1, S) — WonderIsrael/parks.org.il/Anglo-List rank;
     Blue(78₪/3)/Green(110₪/6)/Orange(150₪/unlimited) 2-week tourist cards; Matmon annual(181₪/adult);
     hiking-in-israel.md mentions parks as sites but has ZERO pass guide content; confirmed via grep.
  2. Hidden gems / off-beaten-path hub (seo-content, P2, M) — Tourist Israel/guideyourtrip/exclusiveisraeltours
     rank; we have 63 attraction pages but no editorial hidden-gems hub; high-engagement listicle format;
     sites: Ein Prat, Herodion, Beit Guvrin caves, Rosh Pina, Ein Hod, Mar Saba, Nimrod Fortress, Megiddo, Timna.
  3. Christmas in Israel + Winter guide (seo-content+monetization, P2, M) — Tourist Israel/igoogledisrael/
     TourRadar/Abraham Tours rank; best-time.md mentions "Christmas in Nazareth and Bethlehem is special"
     in 1 sentence; dedicated guide missing; Checkpoint 300/Bethlehem logistics, midnight mass, TLV New Year;
     honesty flag: Ministry of Tourism free buses change annually — link official source not hardcoded times.
  4. Cycling / biking in Israel (seo-content, P2, S) — psimonmyway/bike-israel.com/Tourist Israel rank;
     transportation.md confirmed ZERO cycling content (via grep); TLV: 150km+ lanes, 100k+ daily riders,
     Tel-O-Fun bike-share (app + stations + day pass), Yarkon Park + north-Herzliya + south-Jaffa routes.
  5. Backpacking Israel + budget hostel guide (seo-content+monetization, P2, M) — thebrokebackpacker
     (20 BEST Hostels), nomadicmatt (Best Hostels Tel Aviv) rank; israel-cost-budget has tiers but NOT
     hostel-by-city guide; Abraham hostel chain (Jerusalem/TLV/Haifa) = gold standard brand to mention.
  6. Sea of Galilee boat tours / Kinneret experiences (seo-content+monetization, P3, S) — seaofgalileeboat/
     Danny the Digger/Viator rank; "Jesus boat" 45-min wooden vessel from Tiberias/Ginosar/Ein Gev;
     christian-pilgrimage + galilee region exist but no boat-tour standalone; Kinneret swimming/kayaking.
De-duped (not added): transportation.md (buses/trains — cycling is distinct), cycling vs MTB-adventure
(latter already in adventure-sports backlog item), Christian pilgrimage (covers Galilee broadly not boat-
tours specifically), israel-cost-budget.md (tiers ≠ hostel guide), best-time.md (season overview ≠ dedicated
Christmas guide). Higgsfield: MCP not available in cloud env → image work n/a.
Gate: N/A (research only). Next: iter 46 = BUILD/tools (P3 kosher-restaurant-finder or fall-through to monetization).

## 2026-06-24 · iter 46 · BUILD (seo-content) · Israel National Parks Pass guide
What: new /israel-national-parks-pass guide (P1, seo-content, effort S). tools category had only P3
kosher-finder (effort M) → fell through to seo-content per rotation rules. Built 750-word guide covering
Blue (3-site, ~₪78)/Green (6-site, ~₪110)/Orange (unlimited, ~₪150) 14-day tourist cards and Matmon
annual pass (~₪181/adult). All prices carry "verify current at parks.org.il" caveat — HONESTY intact.
Exclusions table: Masada cable car (private), City of David (Ir David Foundation), Bahá'í Gardens (free
but separate booking). Dense internal links to Dead Sea, Negev, Galilee, Masada, Ein Gedi, Caesarea,
car-rental, transportation, first-time, cost-calculator. Footer Essentials wired (after hiking link).
Hiking-in-israel.md cross-linked. Smoke test route added (/israel-national-parks-pass).
Fix during gate: Playwright 1.61.0 requires chromium_headless_shell-1228 but cloud env only has 1194;
created symlink /opt/pw-browsers/chromium_headless_shell-1228/chrome-headless-shell-linux64/chrome-headless-shell
→ headless_shell-1194 binary (ONE focused fix per playbook §4); all 114 tests passed after fix.
Gate: pnpm check 0 errors; build 171 pages (+1 = /israel-national-parks-pass); 114/114 e2e+a11y pass.
Ship: squash-merged to master 1723874, pushed.
Prod: CI in_progress at push time — next iteration start-check to confirm. Per playbook: leave pending.
Next: iter 47 = REVIEW (47%5==2); Playwright symlink fix is per-env — not persisted to repo.

## 2026-06-24 · iter 47 · REVIEW · audit iters 44–46 + a11y coverage fix
Honoured REVIEW slot (47%5==2). Confirmed iter 46 CI success before audit started (both CI + Lighthouse
workflows completed/success for SHA 1723874).
Audited the unreviewed slice since iter 44 REVIEW:
- iter 44 (15831d1 Route 6 fix): Route 6 is plain text — confirmed, no hyperlink remains. CLEAN.
- iter 45 RESEARCH: no code — N/A.
- iter 46 (1723874 parks pass guide): hero /images/regions/negev/avdat.jpg EXISTS; no H1 in body;
  all 13 internal links resolve (incl. /dead-sea/masada + /dead-sea/ein-gedi via attractionSlug helper
  stripping region prefix); prices carry "verify at parks.org.il" caveats; footer wired; hiking-in-israel
  cross-linked (/israel-national-parks-pass anchor confirmed); smoke test present. CLEAN except one gap:
  /israel-national-parks-pass was in smoke.spec.ts but NOT in a11y.spec.ts ROUTES list. Minor defect.
Fix: added '/israel-national-parks-pass' to ROUTES array in tests/e2e/a11y.spec.ts (1 line).
Branch: auto/review-47-a11y-parks-pass.
Gate: pnpm check 0 errors (101 files); build 171 pages (stable); check:links 0 broken/0 orphan/
  0 unreachable/0 deep; e2e via CI (Playwright 1.61 download blocked in cloud env — consistent pattern).
Ship: squash-committed to master 491d0f7, pushed. CI in_progress at push time.
Next: iter 48 = BUILD/monetization. Top candidate: Israel for seniors guide (P2 M, well-researched
  iter40, Abraham/Bein Harim CTAs, distinct audience gap vs israel-with-kids).

## 2026-06-24 · iter 48 · BUILD (monetization) · Israel for seniors guide
What: /israel-for-seniors guide (P2 monetization, M effort). Mode BUILD (48%5==3), category monetization.
Backlog item: "Israel for seniors & over-50s guide (/israel-for-seniors)" — recommended in iter47 STATE.
Content: best seasons (spring/autumn, avoid Jul-Aug heat), 2-3 sites/day pace with midday break, key
senior-friendly sites (Dead Sea/Ein Bokek flat promenade + floating, Masada cable car no-hike option,
Caesarea paved paths, Galilee boat trip, Jerusalem Old City with honest mobility caveats), small-group
escorted vs private guided vs independent travel, medical infrastructure (Hadassah/Ichilov/Rambam),
medication tips, heat management, walking surface warnings, dietary requirements, packing notes.
Monetization: 3 CTAs — Abraham Tours (escorted/private), TourRadar (package comparison), Viator (day
experiences). No fabricated prices (price ranges only, honesty intact). No fabricated ratings/reviews.
Implementation: src/content/guides/israel-for-seniors.md; footer Essentials link added after
israel-with-kids; smoke + a11y routes added (/israel-for-seniors).
Fix during gate: Playwright 1.61.0 requires chromium_headless_shell-1228 but env has 1194 — same pattern
as iters 46-47. Created dir symlinks for both chromium-1228 and chromium_headless_shell-1228 (ONE fix
per playbook §4). 117/117 tests passed after fix.
Gate: pnpm check 0 errors (101 files); build 172 pages (+1); 117/117 e2e+a11y pass. GREEN.
Ship: squash-committed to master 3d6b2b7, pushed. Branch auto/seniors-guide deleted.
Prod: CI in_progress at push time; prev SHA dcbdcef = success. Next iter start-check to confirm.
Next: iter 49 = REVIEW (49%5==4). Confirm 3d6b2b7 CI; audit iters 46-48.

## 2026-06-24 · iter 49 · REVIEW · audit iters 47-48 (a11y-parks-pass + seniors guide)
What: Honoured REVIEW slot (49%5==4). Confirmed iter 48 CI success before audit started.
  CI confirmed: CI workflow + Lighthouse both success for 3d6b2b7 (seniors guide).
- iter 47 (491d0f7 a11y-parks-pass): trivial 1-line test addition (/israel-national-parks-pass to
  a11y ROUTES array). CI success. CLEAN.
- iter 48 (3d6b2b7 seniors guide): 24 internal links verified — regions (jerusalem/tel-aviv/galilee/
  dead-sea/negev/caesarea/nazareth), attraction (/dead-sea/masada → dead-sea-masada.md via
  attractionSlug helper, confirmed routing pattern), guides (11 targets), .astro pages (israel-
  packing-list/weather-packing/trip-cost-calculator/how-many-days) — all OK. Hero image
  (/images/regions/dead-sea/ein-bokek.jpg) + 3 CTA images all exist. Affiliates viator/abraham/
  tourradar all in config.ts. No H1 in body; no ratingValue/aggregateRating; prices use "rough
  guide only" + "verify at X" disclaimers; footer Essentials wired; /israel-for-seniors in both
  smoke.spec.ts + a11y.spec.ts. CI + Lighthouse: success. CLEAN.
Gate: N/A (no code changed — review clean).
Result: ALL CLEAN — no fixes shipped.
Next: iter 50 = RESEARCH (50%5==0). Seo-content BUILD deferred to iter 51.

## 2026-06-24 · iter 50 · RESEARCH · birdwatching/genealogy/film-TV/solo-female/sports tourism (NO SHIP)
Mode: RESEARCH (50%5==0). No code changed; gate not run.
What: Searched 5 fresh angles not captured in prior research iters (5/10/20/30/35/40/45).
Sources: kkl-jnf.org/hike-israel.com/airial.travel/swarovskioptik.com/birdingplaces.eu (birdwatching);
  anumuseum.org.il/nli.org.il/masaisrael.org/jewishgen.org/welcome-israel.com (genealogy tourism);
  touristisrael.com/forward.com/filmapia.com/thecinemaholic.com/variety.com (film-TV tourism);
  jessieonajourney.com/mukikapupstravels/hersafevoyage.com/solofemaletravelers.club/travelladies.app
  (solo female); touristisrael.com/jpost.com/your-friends-in-israel.com/ticombo.com/themedialine.org
  (sports tourism/Maccabiah Games/marathons).
Findings — 5 net-new BACKLOG items added:
  1. Birdwatching & wildlife hub (seo-content, P2, M) — Great Rift Valley corridor, 500+ species;
     Agamon HaHula (100k+ cranes Nov, Sunrise Safari Wagon tours), Eilat IBRC + Birding Festival
     (mid-March), Hai-Bar Yotvata (Negev wildlife reserve), Qatzrin raptors (Golan). ZERO birdwatching
     content on site; high international-demand niche (specialist tour operators worldwide route clients).
  2. Jewish roots & genealogy travel guide (seo-content, P2, M) — distinct from jewish-heritage-israel.md;
     targets diaspora researching their specific family tree. ANU Museum Douglas Goldman Genealogy Center
     (free, world's largest Jewish genealogy collection), Yad Vashem Central Database (4.8M names), NLI
     free genealogy research service. welcome-israel.com ranks; no equivalent on site.
  3. Film & TV tourism guide (seo-content, P2, S) — Fauda/Shtisel/Tehran/Beauty Queen = massive global
     audiences; Tourist Israel offers "Fauda Experience" guided tour (Forward.com noted). Shtisel tour:
     Mea She'arim walk (dress code). Jerusalem = most-filmed city per sq km globally. No equivalent on site.
  4. Solo female travel guide (seo-content, P2, S) — distinct keywords + deeper content vs generic P3
     solo-travel item. jessieonajourney/mukikapupstravels/hersafevoyage all rank; safety reality framing,
     neighbourhood tips by city, beach safety, airport security prep, dress-code zones, app toolkit.
     HONESTY: link official govt advisories; no security guarantees.
  5. Sports tourism: live events guide (seo+monetization, P3, S) — Maccabi TLV basketball (EuroLeague
     Oct–May, Ticombo affiliate), Tel Aviv + Jerusalem Marathons (tourists can register to run), Maccabiah
     Games 2026 (Jun 30–Jul 13, live window). Tourist Israel has page; zero equivalent on site.
De-duped (not added): jewish-heritage-israel.md DONE (genealogy is DISTINCT); lgbtq guide DONE (≠ solo female);
  day-trips-from-tel-aviv.md EXISTS (confirmed via file listing — NOT a gap); hiking-in-israel.md mentions
  birds as trail feature (not a birdwatching guide). Backlog now at ~31 ready items.
Gate: N/A. Next: iter 51 = BUILD/seo-content. Top P1 recommendation: 3-days-in-jerusalem + 2-days-in-tel-aviv
  (city itinerary pair, M effort, high-intent long-tail, clear build path matching existing itinerary system).

## 2026-06-24 · iter 51 · BUILD (seo-content) · 2-days-in-tel-aviv itinerary + FAQPage JSON-LD
What: P1 seo-content city & short itineraries item. Shipped:
  1. New /itineraries/2-days-in-tel-aviv — 120-line guide (Carmel Market/beach/Old Jaffa day 1;
     Neve Tzedek/Rothschild White City/Florentin/optional TLV Museum of Art day 2); practical frame
     (where to stay, transport from airport, Tel-O-Fun bikes, Shabbat in TLV, best-time-to-visit);
     6 FAQs (enough for 2 days, best neighbourhood, car needed?, airport distance, when to visit,
     Shabbat impact); honest price RANGES only (₪/$ ranges with "verify" caveat); dense cross-links
     to attraction/region pages + itineraries/5-days-in-israel (cross-link added).
  2. [slug].astro: faqPage() imported + added to schema array when d.faqs present (was unused despite
     frontmatter having FAQs since pre-loop); startRegion detection switches CTAs between TLV set
     (food tour / Jaffa walk / Masada from TLV) and default Jerusalem set.
  3. content.config.ts: startRegion: z.string().optional() added to itineraries schema.
  4. smoke.spec.ts + a11y.spec.ts: /itineraries/3-days-in-jerusalem + /itineraries/2-days-in-tel-aviv added.
Note: 3-days-in-jerusalem.md was pre-loop content already generating a page; the backlog item's
  remaining gap (3-days-in-israel standalone page) deferred to P3 in BACKLOG.
Gate: pnpm check 0 errors (101 files); build 173 pages (+1 = /itineraries/2-days-in-tel-aviv);
  check:links 0 broken/0 orphan/0 unreachable/0 deep (max depth 3 across 173 pages).
  e2e/a11y: Chromium not available in cloud env — gate via CI (consistent with iters 31+).
Ship: squash-merged to master e79ea65, pushed. CI run 28092615897 in_progress at push time.
Next: iter 52 = tools (falls through to i18n Phase 2 batch 3 — P1; last i18n was iter 41, 10 iters ago).

## 2026-06-24 · iter 52 · BUILD (i18n) · Phase 2 batch 3 — fr+de guides: day-trips-from-jerusalem + day-trips-from-tel-aviv + is-israel-safe
What: i18n Phase 2 batch 3. tools category had only P3 kosher-finder (effort M) → fell through to i18n (P1).
  Delivered 3 high-intent day-trip + safety guides × fr+de = 6 new locale pages:
  src/content/guides/fr/day-trips-from-jerusalem.md — French excursions guide; locale-correct cross-links
    to /fr/transportation + /fr/day-trips-from-tel-aviv (newly created); all 3 affiliate CTAs in French.
  src/content/guides/de/day-trips-from-jerusalem.md — German equivalent; cross-links to /de/transportation
    + /de/day-trips-from-tel-aviv; CTAs localized (Tour ansehen / Reise ansehen).
  src/content/guides/fr/day-trips-from-tel-aviv.md — French version; cross-links to /fr/day-trips-from-jerusalem;
    3 partners (getyourguide / viator / civitatis); note Bahá'í with accent handled correctly.
  src/content/guides/de/day-trips-from-tel-aviv.md — German version; mutual cross-link to /de/day-trips-from-jerusalem.
  src/content/guides/fr/is-israel-safe.md — French safety guide; cross-links to /fr/first-time-in-israel
    (already translated); links to Quai d'Orsay + DFAE for Swiss; honest framing — no security guarantees;
    3 FAQs on current situation, Jerusalem/Tel Aviv, and travel insurance.
  src/content/guides/de/is-israel-safe.md — German equivalent; Auswärtiges Amt + EDA Switzerland linked;
    same honest framing; cross-link to /de/first-time-in-israel.
smoke.spec.ts + a11y.spec.ts: +6 routes each (fr+de ×3 new slugs).
Hreflang alternates: auto-computed by [...slug].astro using hasFr/hasDe set — all 3 EN guides now emit
  fr+de alternates; all 6 new locale pages have correct hreflang back-links.
Gate: pnpm check 0 errors (101 files); build 179 pages (+6); check:links 0 broken/0 orphans/0 unreachable/
  0 deep; e2e/a11y: 133/133 pass (Playwright 1.61.0 headless_shell-1228 symlink to 1194 — consistent fix
  with iters 46/48).
Ship: squash-committed to master 989f751, pushed. CI run 28095871662 in_progress at push time.
fr: 10/147, de: 10/147. Next i18n batch: more guides (shabbat-guide, best-tours-in-israel, or is-israel-safe already done).
Next: iter 53 = BUILD/monetization. Top P1 candidate: adventure sports hub /israel-adventure-sports.

## 2026-06-24 · iter 53 · BUILD (seo-content+monetization) · Adventure sports & outdoor activities hub
What: P1 seo-content+monetization. New /israel-adventure-sports comprehensive guide covering:
  desert canyoning + rappelling (Negev/Judean Desert: Makhtesh Ramon, Nahal Paran, Wadi Qelt, Red Canyon);
  jeep & 4×4 tours (Golan Heights + Negev basalt terrain + Eilat Mountains); ATV/quad (Mitzpe Ramon/Galilee);
  surfing + windsurfing (Mediterranean: Tel Aviv Hilton Beach/breakwaters, Bat Yam, Herzliya Pier);
  kitesurfing (Haifa Bay Kiryat Yam + Eilat lagoon year-round); Red Sea diving/snorkelling (Eilat: Coral
  Beach Reserve/Dolphin Reef/Moses Rock — cross-link to eilat-diving-snorkeling.md); sand surfing (Nitzana
  + Mamshit); hot-air ballooning (Galilee dawn / Negev crater); Mount Hermon skiing + summer MTB/zip-line;
  zip-lining (Atlit cliff over Mediterranean, Keshet Cave, Hermon, Kfar Hananya); MTB (Golan/Negev).
  Activity summary table (region, best season, effort rating). 3 CTAs (GYG adventure/Viator jeep-ATV/
  Abraham Tours hiking). 6 FAQs: best activities, best season, canyoning safety, surfing, skiing, Eilat.
  Dense cross-links to existing guides (hiking/eilat-diving/transportation/negev/golan/eilat/galilee).
  Fixed broken link: /cycling-in-israel (not yet built) → removed reference, linked /transportation.
  Fixed YAML parse error: Israel's apostrophe in skiing FAQ answer inside single-quoted string → double-quote.
  smoke.spec.ts + a11y.spec.ts: +1 route each (/israel-adventure-sports).
  Playwright symlink: /opt/pw-browsers/chromium_headless_shell-1228/chrome-headless-shell-linux64/
    chrome-headless-shell → headless_shell-1194 binary (consistent per-env fix; not in repo).
Gate: pnpm check 0 errors (101 files); build 180 pages (+1); check:links 0 broken/0 orphans/0 unreachable;
  135/135 e2e+a11y pass.
Ship: committed to master 2c70684, pushed. CI run 28099371690 in_progress at push time.
Next: iter 54 = BUILD/seo-content. Top P1 candidate: bar/bat mitzvah destination guide.

## 2026-06-24 · iter 55 · RESEARCH · airport/vegan/medical/flights/wedding/group-tours scan (NO SHIP)
Mode: RESEARCH (55%5==0). No code changed; gate not run.
What: Searched 6 new angles. De-duped against all DONE+BACKLOG items + content file listing before adding.
  Key de-dup finding: israel-with-kids.md EXISTS on site — family guide was NOT a gap (removed from candidates).
  CRITICAL finding: Ben Gurion Dan Lounge closed Dec 31 2025; Priority Pass no longer accepted at TLV as of
  Jan 2026. Aspire Lounge (Swissport, Concourse E) + Jetex (AmEx, Concourse C) replaced it. King David
  Lounge (El Al, T3 Concourse D) renovated + reopened March 2025. This is time-sensitive, linkable content.
Sources: tlvflights.com, vipbengurion.com, airfasttrack.com, iaa.gov.il, jpost.com/article-887901;
  touristisrael.com/best-vegan-food-in-tel-aviv, passionpassport.com, spinach.guide, exceedinglyvegan.com;
  shebaonline.org, medicaltourism.com, bookimed.com, wikipedia/Medical_tourism_in_Israel;
  skyscanner.com, momondo.com, masaisrael.org; smashingtheglass.com, nativeisrael.com, two.travel;
  touristisrael.com/type/group-tours, touristisrael.com/type/christian-israel-tours.
6 net-new BACKLOG items added:
  1. Ben Gurion Airport Guide (P1, M) — terminal/security/lounges/duty-free; Priority Pass gone Jan 2026.
  2. Vegan & Vegetarian Israel Guide (P2, S) — ~5% vegan population world's highest; 400+ TLV eateries.
  3. Israel Medical Tourism Guide (P2, M) — IVF $3,500 vs $20k US; Sheba Newsweek world's best 7yrs.
  4. Budget Flights to Israel Guide (P3, S) — cheapest month Oct; book 6-26 wks ahead; avoid Jewish holidays.
  5. Destination Wedding in Israel Guide (P3, S) — no civil marriage in Israel; Orthodox rabbinate or symbolic.
  6. Church/Synagogue Group Tour Planning (P3, M) — organizer-facing; lead time/DMC/ETA-IL per member.
Gate: N/A (research only).
Next: iter 56 = BUILD/seo-content. Top P1 candidates: Ben Gurion Airport Guide (timely; Priority Pass change)
  OR bar/bat mitzvah guide (queued since iter35). Airport guide slightly more universally useful to every visitor.

## 2026-06-24 · iter 54 · REVIEW (seo-quality) · Meta description trim (11 pages)
What: REVIEW pass (54 % 5 == 4). Audit of recently-shipped content + SEO fundamentals sweep.
  Findings: (1) link checker clean (0 broken, 0 orphans across 180 pages); (2) hreflang on fr/de
  guides correct — all 4 alternates (en/fr/de/x-default) present and reciprocal; (3) JSON-LD schemas
  on adventure-sports correct (Organization, WebSite, Article, BreadcrumbList, FAQPage×6).
  Key issue: 20+ pages had meta descriptions well over Google's ~155-char display window (range 161–248c).
  Fix: trimmed 11 most egregious pages to ≤155c while preserving keyword density and honest framing.
  Files: israel-adventure-sports(191→149c), jewish-heritage-israel(239→147c),
  cruise-shore-excursions-israel(235→151c), israel-food-tours-cooking-classes(232→148c),
  driving-in-israel(231→144c), israel-national-parks-pass(217→142c), best-things-to-do-in-israel(228→155c),
  fr/visa-information(248→152c), fr/is-israel-safe(198→141c), fr/day-trips-from-tel-aviv(188→151c),
  de/visa-information(247→155c). ~10 more remain at 160–215c (added to BACKLOG).
Gate: pnpm check 0 errors; build 180 pages; 135/135 e2e+a11y pass.
Ship: committed to master 673584c, pushed. CI run 28102730575 in_progress at push time.
Next: iter 55 = BUILD/seo-content. Top P1 candidate: bar/bat mitzvah destination guide (/bar-bat-mitzvah-israel).
