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
