# Pitfalls Research — Discover Israel

**Domain:** Tourism affiliate website (Israel)
**Researched:** 2026-05-11
**Researcher:** gsd-project-researcher (Pitfalls dimension, enriched with R3 SEO + R5 image legality)
**Overall confidence:** MEDIUM-HIGH
- HIGH on: prior-project lessons (lived), generic tourism affiliate pitfalls, IS 5568 a11y, FTC affiliate rules, Hebcal/Shabbat data, Western Wall / Holy Sepulchre photography permits
- MEDIUM on: religious-site naming editorial heuristics, image source coverage estimates (spot-checked, not crawled), Hebrew SEO morphology recommendations
- LOW on: live keyword search volumes for Hebrew (proxied via Google Trends + competitor SERP analysis — no live Ahrefs/SEMrush access from this session; flagged inline)

---

## Reading Order

1. **Generic Tourism Affiliate Pitfalls** — what these projects get wrong everywhere
2. **Discover Argentina Inheritance Pitfalls** — what the prior project taught us
3. **Israel-Specific Landmines** — the things you only learn by shipping in Israel
4. **R3 — SEO + Keyword Research per Region** — per-region keyword tables and H-tag scaffolding
5. **R5 — Image Source Legality Map** — per-region image source recommendations
6. **Detection Signals & Audit Dashboard Rules** — concrete code/dashboard checks
7. **Pitfall-to-Phase Mapping** — which roadmap phase prevents what

---

# 1. Generic Tourism Affiliate Pitfalls

## 1.1 SEO: Region ↔ Sub-destination Cannibalization

**What goes wrong:** `/jerusalem/` and `/jerusalem/western-wall/` compete on the same keyword cluster. Google can't decide which is canonical, both rank #6-12, neither wins.

**Why it happens:** Authors write region canonicals with full keyword coverage (top attractions, where to stay, things to do), then write sub-destination pages that re-target the same head terms because "the sub-page is more specific."

**Detection signal:**
- Audit rule: For any region canonical R and its sub-destinations S₁...Sₙ, fail if the H1 of any Sᵢ contains the region head-keyword without a qualifier ("Western Wall" OK; "Jerusalem Western Wall" NOT OK — region is implicit by URL).
- Google Search Console: same query appearing in top-10 impressions for multiple URLs on the same site → cannibalization flag.

**Prevention:**
- Region canonical owns the head term (`{region}`, `things to do in {region}`, `{region} travel guide`).
- Sub-destinations own the specific entity term (`Western Wall`, `Yad Vashem`, `Machaneh Yehuda Market`) WITHOUT the region prefix in H1/title.
- Internal linking: every sub-destination links **up** to the region canonical with the region head-term as anchor text; the region canonical links **down** to sub-destinations using the entity name only.

**Phase to address:** Phase 1.2 (design system tokens for breadcrumbs), Phase 1.6 (schema generators use parent-canonical relationships), Phase 1.9 (audit rule).

---

## 1.2 Thin Content via Over-translation

**What goes wrong:** English page is 1,800 words of rich, intent-rich copy. Hebrew page is a 600-word literal translation that strips idioms, loses head keywords, and reads like Google Translate. Hebrew traffic flatlines.

**Why it happens:** Translation is bolted onto i18n infrastructure, not editorial. Translators (or worse, MT) work paragraph-by-paragraph and lose section-level coherence.

**Detection signal:**
- Audit rule: For each `(slug, lang)` pair, fail if `wordCount(slug, lang) / wordCount(slug, base_lang) < 0.85` or `> 1.40`.
- LCP-of-content check: Hebrew page should not be < 80% of English word count.

**Prevention:**
- Editorial brief in Phase 2 demands **native rewrite, not translation** — translator writes Hebrew from a content brief, then cross-checks against English. The mega prompt 2.2 explicitly says "Traducción nativa, no literal" — enforce that.
- `hebrew-content-writer` SKILL.md Step 5 already covers Hebrew SEO morphology (target root words: ביטוח → ביטוחים, לבטח, מבוטח). Apply same root-expansion logic for tourism terms (טיול → טיולים, לטייל, מטייל).

**Phase to address:** Phase 1.7 (quality profile `REGION_CANONICAL` has language-parity check), Phase 2.2 (Hebrew region canonical), Phase 3 (per-region replica).

---

## 1.3 Client-Side Render Hiding Content from Crawlers

**What goes wrong:** Hero CTA, affiliate cards, FAQ accordion all render via client JS. Googlebot's rendered DOM has none of it. Page reports as "thin" in Search Console.

**Why it happens:** Next.js App Router defaults to RSC + server components but developers slip in `'use client'` for interactivity and forget to keep the SEO-critical content server-rendered.

**Detection signal:**
- Audit rule: For each page, run `curl -A "Googlebot" {url}` and assert that H1, primary CTA href, and at least 80% of body text appears in raw HTML (pre-hydration).
- Lighthouse SEO score is too lenient here — must verify via "view source," not via the rendered DOM.

**Prevention:**
- ESLint rule: any component used in a `page.tsx` that imports `'use client'` must not contain a JSON-LD `<script>` tag, primary H1, or main content prose.
- Phase 1.10 (Lighthouse CI) must include a "no-JS render" snapshot check.

**Phase to address:** Phase 1.1 (ESLint), Phase 1.10 (CI gate).

---

## 1.4 FTC Affiliate Disclosure — Missing or Hidden

**What goes wrong:** Site links to Booking and earns commission. Disclosure is in the footer in 9px gray text. FTC considers this insufficient — disclosure must be "clear and conspicuous" near the relevant content (FTC 16 CFR Part 255). Per 2025 inflation adjustment, **civil penalty is up to $53,088 per violation** and each ad/post can be a separate violation.

**Why it happens:** Devs treat affiliate disclosure as "legal page in footer" — same pattern as privacy policy — instead of as **inline content** near every CTA.

**Detection signal:**
- Audit rule: Every page that contains an affiliate link must have a visible disclosure within 1 viewport-height of the FIRST affiliate link AND must reference `/affiliate-disclosure/`.
- Audit: any `<a href={...}>` that resolves to a partner helper output, without a `data-aff-disclosed="true"` ancestor in scope, fails the page.

**Prevention:**
- Phase 1.3 component library: `<AffiliateCard>` ships with built-in micro-disclosure text ("We earn a small commission if you book through this link — at no extra cost to you.").
- Phase 2.5 legal pages: long-form `/affiliate-disclosure/` page in both languages.
- Phase 1.4 affiliate helpers do not directly handle disclosure — keep separation of concerns.

**Phase to address:** Phase 1.3 (component contract), Phase 2.5 (legal page).

---

## 1.5 Affiliate Link Rot & Program Rotations

**What goes wrong:** Partner restructures URLs (Civitatis pivots tracking format, Booking deprecates `&aid=` for `&label=`), links 404 or stop tracking. You lose months of revenue before noticing.

**Why it happens:** No monitoring on partner link health. No abstraction layer to flip when partner changes patterns.

**Detection signal:**
- Cron job: every 24h, sample N affiliate URLs across the site, follow redirects, check final HTTP status and that the destination domain matches partner allow-list.
- Audit rule: flag any partner where >5% of links return 4xx/5xx within 7 days.

**Prevention:**
- Phase 1.4 helper pattern (already in PROJECT.md constraints) IS the prevention — every partner has one chokepoint to update.
- Add `scripts/affiliate-health-check.mjs` running in CI weekly + on-demand.

**Phase to address:** Phase 1.4 (helpers exist), Phase 6 (monitoring loop).

---

## 1.6 Geo-Restriction Silent Failure

**What goes wrong:** SafetyWing has different programs for US vs EU vs IL residents. Your link defaults to one geography, traffic from another is misrouted, conversions tank, you have no signal because the link "works."

**Why it happens:** Developers don't know affiliate programs have geo-specific conversion paths until conversions don't show up.

**Detection signal:**
- UTM tracking: monitor conversion rate by `geo` parameter. Flag if any country with >100 sessions shows < 50% of the global conversion rate for that partner.

**Prevention:**
- R4 research must produce a per-partner geo-matrix.
- Helper signature: `bookingLink({ destination, geo?: string })` — geo defaults to "auto" (CDN header), but page can override.
- Phase 1.4 helpers expose `geo` as a parameter and document its effect per partner.

**Phase to address:** Phase 1.4 (helpers), Phase 6 (monitoring).

---

## 1.7 LCP Failure from Hero Images

**What goes wrong:** Hero image is the LCP element. It's not preloaded, it's `loading="lazy"`, it's a 2MB JPEG, it's served via a third-party CDN with no `srcset`. Lighthouse mobile perf score: 64.

**Why it happens:** Developers know `loading="lazy"` is good for offscreen images and apply it to everything. Then the LCP element loads after JS hydration.

**Detection signal:**
- Lighthouse CI audit: `largest-contentful-paint` > 2.5s on mobile = fail.
- Unlighthouse "Don't Lazy-Load Your LCP Image" rule: image element at position 0,0 with `loading="lazy"` = critical fail.

**Prevention:**
- `<RegionHero>` component (Phase 1.3) must:
  - Use `priority` prop on `<Image>` (Next.js automatically adds `fetchpriority="high"` and `loading="eager"`).
  - Generate `<link rel="preload" as="image" imagesrcset="..." imagesizes="...">` in `<head>` via Next.js metadata API.
  - Always serve responsive `srcset` (320w, 640w, 1024w, 1600w — already required by image contract).
- ESLint rule: any `<Image>` inside a `RegionHero` without `priority` = fail.

**Phase to address:** Phase 1.3 (RegionHero contract), Phase 1.10 (Lighthouse CI gate).

---

## 1.8 Third-Party Script Bloat (GTM, Pixels, Chat)

**What goes wrong:** Analytics + Plausible + Hotjar + partner conversion pixel + chat widget = 800ms TBT. Performance score plummets.

**Why it happens:** Each team adds a script "just to track one thing" without measuring aggregate cost.

**Detection signal:**
- Lighthouse "Reduce the impact of third-party code" audit (`third-party-summary`): fail if total third-party blocking time > 250ms.
- Audit rule: count `<script>` elements with `src` to external origin in any page > 4 = warn, > 6 = fail.

**Prevention:**
- Pick ONE analytics solution (Plausible recommended per PROJECT.md — privacy-first, single small script, no cookie banner needed under EU rules and good for Israel where cookie banner fatigue is real).
- All scripts loaded via Next.js `<Script strategy="afterInteractive">` or `"lazyOnload"` — never `beforeInteractive` unless critical.
- No third-party chat widget (out-of-scope per PROJECT.md).
- Affiliate partners that require a pixel (e.g., GYG conversion postback) → server-side pixel only, not client JS.

**Phase to address:** Phase 1.1 (analytics decision), Phase 1.10 (Lighthouse CI).

---

## 1.9 Layout Shift from Review Widgets / Affiliate Cards

**What goes wrong:** Booking widget loads asynchronously, pushes content down 200px, CLS = 0.32. Lighthouse penalty + bad mobile UX.

**Why it happens:** Embedded partner widgets don't reserve space upfront.

**Detection signal:**
- Lighthouse `cumulative-layout-shift` > 0.1 = fail.
- Audit rule: any `<iframe>` or `<div data-partner-widget>` without explicit `width` and `height` (or `aspect-ratio` CSS) attributes = fail.

**Prevention:**
- Phase 1.3 `<AffiliateCard>` always renders to a fixed-aspect container.
- Avoid embedded JS widgets entirely — use plain links + static badges where possible. Partners typically allow direct linking with proper AID query params; the widget is a convenience that costs perf.

**Phase to address:** Phase 1.3 (component contract).

---

## 1.10 Stock-Photo Overuse & AI-Content Detection

**What goes wrong:** Pages built with Shutterstock hero + Unsplash gallery + AI-generated copy. Google's "Helpful Content" classifier flags as low-value, traffic stays flat for 6 months.

**Why it happens:** Speed-to-publish pressure, no editorial differentiation policy.

**Detection signal:**
- Audit rule: track image-source distribution per page. If >70% of images come from a single stock source, flag the page as "low-uniqueness."
- Manual: spot-check if competing destination pages use the SAME stock photo (reverse image search via Google Lens).

**Prevention:**
- Image contract (already in PROJECT.md) requires a curated mix: prefer Wikimedia Commons (unique to your selection), IGPO archive (Israel-specific, less used by competitors), local Flickr CC photographers > stock.
- Phase 1.5 photo-credits ledger has a `sourceUrl` field — easy to audit distribution.

**Phase to address:** Phase 1.5 (ledger schema), Phase 1.9 (audit rule).

---

## 1.11 Out-of-Date Prices, Hours, Practical Info

**What goes wrong:** Page says "entry fee 30 NIS, open 8am-5pm Sun-Thu." Three years later the site charges 50 NIS and closes at 4pm. Reviews call you out, ranking drops.

**Why it happens:** Static content with no review cadence.

**Detection signal:**
- Audit rule: each page has a `lastReviewed` frontmatter field. Flag pages > 9 months old.
- Audit dashboard "stale content" report.

**Prevention:**
- Phase 1.6 schema markup uses `dateModified` consistently — feeds Search Console.
- Phase 6 post-launch: quarterly content review cadence + a "Last verified: {date}" microcopy on every utility/practical section.
- Where possible, link OUT to the official source rather than republishing data: "Check current admission prices on the Israel Nature and Parks Authority site →"

**Phase to address:** Phase 1.5/1.7 (content frontmatter schema), Phase 6 (cadence).

---

## 1.12 Stale Sitemap & Stale Robots

**What goes wrong:** Page slug renamed, old slug 404s, sitemap still lists the old URL. Search Console fills with errors.

**Why it happens:** Static sitemap.xml committed to repo, never regenerated.

**Detection signal:**
- CI gate: regenerate sitemap on every build. Diff against previous and warn if >10% URLs changed.
- Audit: cross-check sitemap URLs against built `app/` route tree.

**Prevention:**
- Phase 1.8 already mandates dynamic `app/sitemap.ts`. Make sure it reads from the same source-of-truth as the routes (a manifest of regions + sub-dests from `data/`).

**Phase to address:** Phase 1.8 (already covered, verify implementation).

---

# 2. Discover Argentina Inheritance Pitfalls

These are the nine root causes from S11 transcribed into actionable detection signals. PROJECT.md already encodes most as constraints; this section maps each to an enforceable check.

| # | Argentina lesson | Inviolable constraint | Detection signal | Phase to enforce |
|---|---|---|---|---|
| 1 | 6,089 raw hex codes accumulated | NEVER write hex in components | ESLint rule: regex `/#[0-9A-Fa-f]{3,8}\b/` in JSX/TSX files outside `tailwind.config.ts` = error | 1.1 (lint), 1.9 (audit) |
| 2 | One partner at 92%, another at 18% | NEVER link to partner without helper | ESLint rule: regex `/href=["']https?:\/\/(www\.)?(booking|civitatis|viator|getyourguide|skyscanner|rentalcars|safetywing|hostelworld|klook|gocity|discovercars)\.com/` = error | 1.4 (helpers + lint) |
| 3 | PhotoGallery without srcset for months | NEVER import image without ledger entry + srcset | (a) Pre-commit hook checks `data/photo-credits.json` has entry for every imported image. (b) `<Image>` component throws at build time if `srcset` is missing or image width < 1200px. | 1.5 (ledger), 1.3 (gallery component) |
| 4 | 783 sub-page bugs detected at once | Sub-pages built before canonical pattern stabilized | Phase 2 builds region canonical FIRST and PASSES Quality Gate before any sub-destination is even scoped. Phase 1.9 audit dashboard refuses to score sub-destination pages whose parent canonical fails. | 2 (sequencing), Quality Gate |
| 5 | Quality scoring uniform across page types | 5 perfile model (REGION_CANONICAL, SUB_DESTINATION, GUIDE_OR_WINERY, UTILITY, HUB) | Audit dashboard config exposes 5 profiles with distinct weight maps. | 1.7 |
| 6 | 14k monetization opportunities discovered late | NER/mention detection is foundation, not afterthought | Phase 1.11 ships dictionary-based detector. Audit dashboard surfaces unlinked mentions per page. | 1.11, 1.9 |
| 7 | i18n bolted-on after content | i18n routing scaffold from day 1 for 5 langs even though we ship 2 | `app/[lang]/...` directory exists from Phase 1.1; placeholder pages for unused langs return 404 cleanly. | 1.1 |
| 8 | Lighthouse plateau ~85 because unmeasured | 3-run-median measurement protocol | Lighthouse CI configured day 1; deploy gate blocks merge below thresholds. | 1.10 |
| 9 | Sub-pages built before canonical stabilized | Same as #4 | (covered) | (covered) |

---

# 3. Israel-Specific Landmines

These go BEYOND the generic playbook. Each is specific to operating in Israel and would not appear in a generic tourism affiliate research doc.

## 3.1 Religious Site Naming — Editorial Risk

**What goes wrong:**
1. You label the site "Temple Mount" → Arab readers and a chunk of search audience read this as politically partisan; Hebrew Wikipedia is fine with "הר הבית" but English copy that uses only "Temple Mount" without context flags to Google as opinionated.
2. You label it "Haram al-Sharif" only → Israeli search audience reads this as the opposite signal.
3. You label Bethlehem as "Israel's Bethlehem" → it's in the West Bank under Palestinian Authority Area A. Both legally inaccurate and editorially loaded.
4. You label Hebron's Cave of the Patriarchs without acknowledging the divided access (Jewish and Muslim sides) → factually thin.

**Why it happens:** Single-source research, no editorial review against AP/Reuters/BBC style.

**Recommended naming style:**

| Site | Recommended primary form (EN) | Hebrew | Avoid |
|---|---|---|---|
| The compound itself | "Temple Mount / Haram al-Sharif" (paired on first reference; alternate thereafter) | "הר הבית" | Either name alone without paired form on first reference |
| Dome of the Rock | "Dome of the Rock" (no controversy on name) | "כיפת הסלע" | — |
| Al-Aqsa Mosque | "Al-Aqsa Mosque" (no controversy) | "מסגד אל-אקצא" | — |
| Western Wall | "Western Wall" (primary), "Kotel" acceptable in context | "הכותל המערבי" | "Wailing Wall" (archaic, mildly pejorative) |
| Bethlehem | "Bethlehem (in the West Bank, administered by the Palestinian Authority)" on first mention, then "Bethlehem" | "בית לחם" | "Israeli Bethlehem" or implying Israeli administration |
| Hebron | "Hebron (in the West Bank; access is divided between Israeli and Palestinian Authority control)" — strongly consider NOT including Hebron in scope at all given safety advisories | "חברון" | Glossing over access situation |
| Jericho | "Jericho (in the West Bank, Area A — Palestinian Authority control; foreign tourists may enter)" | "יריחו" | Glossing over access situation |
| The country | "Israel" for territory under Israeli sovereignty; "the West Bank" for the West Bank; never "Israeli-occupied territories" (loaded) and never "Judea and Samaria" (loaded in opposite direction) in editorial copy | — | Both loaded forms |

**Phase to address:** Phase 1.7 (quality profile has an "editorial style" check), Phase 2.1/2.2 (region canonical with religious sites), Phase 1.9 (audit dashboard runs a regex-based check on forbidden phrasings).

**Detection signal:**
- Audit dashboard "Editorial Style" check:
  - Regex `\bWailing Wall\b` in any page → fail (use "Western Wall")
  - Regex `\bJudea and Samaria\b` or `\boccupied territories\b` → fail (politically loaded)
  - Regex `\bTemple Mount\b(?!.*Haram al-Sharif)` on first paragraph of a page that discusses it → warn (no paired naming on first reference)
  - Bethlehem/Hebron/Jericho pages: require frontmatter `administrativeStatus: "West Bank — Palestinian Authority Area A"` and audit checks for inclusion of clarifying clause.

**Editorial review skill:** Use `hebrew-content-writer` skill for Hebrew copy register decisions; use `copywriting` skill for English. Both should be invoked with explicit guardrail: "Editorial neutral, no political characterization."

---

## 3.2 Shabbat and Holiday Closures — Data Accuracy

**What goes wrong:** Page says "Open Sun-Thu 8am-5pm, Fri 8am-2pm, closed Saturday" — accurate for most of the year. But on Yom Kippur the site is fully closed regardless of weekday. On Pesach the hours shift. On Rosh Hashanah they shift again. Users arrive at a closed gate. Trustpilot reviews tank.

**Why it happens:** Static hours data + no awareness of the Hebrew calendar drift relative to Gregorian.

**Detection signal:**
- Audit rule: any `OpeningHoursSpecification` schema on the page must be paired with a `validUntil` or be wrapped in a "Check current hours" callout. Otherwise warn.
- Phase 1.9 audit dashboard: flag pages with hours data that don't render a Shabbat/Holiday widget.

**Prevention:**
- Build a `<ShabbatNotice>` component (Phase 1.3) that consumes the **Hebcal REST API** (`https://www.hebcal.com/shabbat/?cfg=json&geonameid={israel-city}`) and shows current candle-lighting / havdalah times for the next Shabbat.
- For major Jewish holidays use Hebcal's holidays endpoint (`https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&i=on&year=now`).
- For each region canonical, include a "Shabbat and Jewish Holidays" section template that's BOILERPLATE for all regions and DRY-shared as a component, not duplicated copy.
- Editorial rule: never publish a static `OpeningHoursSpecification` schema without a "subject to holidays" footnote.

**Sources:**
- [Hebcal REST API](https://www.hebcal.com/home/195/jewish-calendar-rest-api) — confirmed JSON output, Shabbat times by geoname, holiday calendar with `i=on` for Israeli observance (single-day holidays in Israel vs two-day diaspora).
- [Hebcal 2026 holidays](https://www.hebcal.com/holidays/2026) — confirms 5786 → 5787 transition Sep 22 2026 (Rosh Hashanah). Yom Kippur Oct 1 2026 — all transit, most tourism sites closed.

**Phase to address:** Phase 1.3 (component), Phase 2.1 (deploy in pilot region), Phase 3 (replicate).

---

## 3.3 Border / Security Situation Editorial Framing

**What goes wrong:**
1. Page recommends "day trip to Bethlehem" without mentioning the Qalandiya checkpoint experience (rental cars often can't cross; tour buses can; visa stamps may complicate onward travel for some passport holders).
2. Page recommends "Eilat to Petra via Aqaba border" without flagging the Yitzhak Rabin / Wadi Araba border crossing closes for Yom Kippur, Eid, and during security events.
3. Page mentions Gaza-adjacent communities (Sderot, Kibbutz Be'eri) without acknowledging the changing security situation post-Oct 2023.
4. Page is silent on whether a region is currently subject to State Department / FCO advisories.

**Why it happens:** Treating Israel like a generic European destination.

**Recommended editorial framing:**
- For each region canonical, include a "Practical: getting there and safety" section that links to:
  - [US State Department Israel/West Bank/Gaza Travel Advisory](https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/israel-west-bank-and-gaza-travel-advisory.html)
  - [UK FCDO Israel travel advice](https://www.gov.uk/foreign-travel-advice/israel)
- For border-crossing recommendations: state that hours change with Jewish/Muslim holidays, link to the [Israel Airports Authority border crossings page](https://www.iaa.gov.il/en/border-crossings).
- For West Bank destinations: explicit clause "Foreign tourists may enter Area A; Israeli citizens are generally prohibited under Israeli law from entering Area A — this affects rental-car restrictions and tour operator availability."
- Never editorialize on whether a region is "safe" — link to official sources and let the user evaluate.

**Detection signal:**
- Audit rule: any region canonical with `region.containsWestBank: true` in its frontmatter must contain a link to a `/advice/west-bank-travel/` utility page.
- Any region with `region.adjacentToBorder: true` must reference current advisory.

**Phase to address:** Phase 1.5 (region frontmatter schema), Phase 1.7 (quality profile), Phase 2.1 (pilot region copy).

---

## 3.4 Currency Volatility — ILS Pricing

**What goes wrong:** "Entry fee: 50 NIS (about $13.50 USD)." Six months later the shekel has shifted 12%, and your "about $13.50" is now $15.20. User feels misled.

**Why it happens:** Hard-coded conversions in MDX.

**Prevention:**
- Display prices in NIS as primary (the locally-displayed price on the site itself).
- Add a "(approximately $X USD / €Y EUR)" conversion via a component that pulls a daily-cached rate from a public FX API (e.g., [exchangerate.host](https://exchangerate.host/) — free, no key).
- Fallback: if API fails, display only NIS — never stale USD.
- Update cadence: rate cached 24h server-side. Acceptable accuracy for editorial use.

**Component contract (Phase 1.3):**
```tsx
<Price ils={50} showUsd showEur />
// renders: "50 NIS (about $13 USD / €12 EUR)"
```

**Detection signal:**
- ESLint rule: regex `/\$\d+(\.\d+)?\s*(USD)?\s*\(/` in JSX/MDX content files (hardcoded USD next to ILS) = warn.
- Audit: any page with a price not wrapped in `<Price>` = warn.

**Phase to address:** Phase 1.3 (Price component), Phase 1.9 (audit rule).

---

## 3.5 Jewish Holiday Calendar Drift — Content Opportunity AND Risk

**What goes wrong:**
- Risk: "Plan your Passover 2026 trip to Jerusalem" — published in March 2026 — was accurate for that year, but the URL ranks for "Passover Jerusalem trip" forever. In April 2027 it's stale.
- Opportunity: Hebrew calendar moves on Gregorian; each year has unique "Passover falls during X" angle. Sites that publish a yearly refresh capture seasonal volume.

**Why it happens:** Treating holidays as evergreen.

**Prevention:**
- Yearly refresh pattern (Phase 6): `data/holiday-calendar.json` keyed by Hebrew year, sourced from Hebcal. Build script generates `/passover-{year}/` pages with `<link rel="canonical" href="/passover/" />` pointing to an evergreen Passover canonical.
- Evergreen Passover canonical lists "Upcoming Passover dates" auto-pulled from Hebcal.
- Avoid year-stamped URLs unless explicitly seasonal landing pages with the year in the slug.

**Detection signal:**
- Audit: any URL with a Gregorian year in the slug must have a canonical pointing to a year-less evergreen page OR a frontmatter `seasonalLanding: true` flag.

**Phase to address:** Phase 1.6 (schema/canonical patterns), Phase 1.11 (NER/dictionary entries for "Pesach", "Sukkot", "Rosh Hashanah", "Yom Kippur"), Phase 6 (yearly refresh cron).

---

## 3.6 Hebrew SEO Specifics

**What goes wrong:**
- **Morphological variation lost:** Authors write title "טיולים בירושלים" (trips in Jerusalem). Hebrew search has many forms: "טיול בירושלים" (singular), "טיולים לירושלים" (trips to Jerusalem, different preposition), "מה לעשות בירושלים" (what to do in Jerusalem). Hebrew is a non-concatenative root-and-pattern language; ignoring this means leaving 30–60% of relevant query volume on the table.
- **Bidirectional text in title tags:** Title contains Latin (a hotel name, e.g., "מלון Dan Tel Aviv") — bidi algorithm puts the Latin segment in unexpected position in SERP preview. Looks broken, hurts CTR.
- **RTL in SERP preview:** Google SERP renders Hebrew titles RTL — head of title appears on the RIGHT visually but logically at the start. Putting the head keyword "at the beginning" means putting it FIRST in source order; rendering will mirror it.
- **Hebrew Google personalization:** Search results for Hebrew queries from Israel differ markedly from results in Hebrew from outside Israel. Don't assume one ranks the other.
- **Ktiv maleh vs ktiv chaser:** Modern Hebrew uses ktiv maleh (full spelling) — תוכנה not תכנה. Mixing variants in title and body hurts coherence and may dilute exact-match signals.

**Detection signal:**
- Audit dashboard "Hebrew SEO" check:
  - Title tags: assert each Hebrew title's primary keyword appears in the first 30 characters.
  - Detect bidi: any Hebrew page title containing Latin characters (other than digits and punctuation) → warn (consider whether the Latin needs `dir="ltr"` wrapper or transliteration).
  - Ktiv maleh consistency: simple wordlist check (תכנה → תוכנה, שרות → שירות, etc. — small dictionary in `data/ktiv-maleh-dict.json`).

**Prevention:**
- `hebrew-content-writer` skill already covers ktiv maleh + morphological expansion (Step 5). Invoke the skill explicitly for every Hebrew page in Phase 2.2 and Phase 3.
- R3 keyword research output must include morphological variants per term (see Section 4 below).
- Phase 1.6 schema: ensure `inLanguage: "he-IL"` declared on Hebrew pages; ensure `hreflang="he"` (NOT `he-IL` for Google's purposes — Google treats `he` as the language; the country signal comes from server / geo signals).

**Phase to address:** Phase 1.1 (i18n routing with proper lang codes), Phase 1.8 (hreflang implementation), Phase 1.9 (audit Hebrew-specific checks), Phase 2.2 (apply skill).

---

## 3.7 Image Rights for Religious Sites

**What goes wrong:**
1. You use a CC-BY photo of the Western Wall from Wikimedia Commons. **Commercial use is restricted by the Western Wall Heritage Foundation** regardless of the CC license on the photo file — the licensing on Commons covers the photographer's copyright in the photograph but does NOT grant rights against the Foundation's separate commercial-use regulation on photos of the site.
2. You commission a stock photographer to shoot the Church of the Holy Sepulchre. Without permits from both Greek Orthodox and Armenian Orthodox Patriarchates AND the Christian Information Center ($150 fee as of Jan 2026), the shoot is unauthorized.
3. You use a photo of a Hasidic worshipper at the Kotel without their consent. Israeli privacy law + religious sensitivity = takedown risk.

**Why it happens:** Generic stock-photo workflow doesn't consider site-specific commercial-use restrictions.

**Detection signal:**
- Audit: any image whose `region` is `jerusalem` AND whose subject matches a restricted site (Western Wall, Dome of the Rock, Al-Aqsa, Church of the Holy Sepulchre) requires a `restrictedSiteAcknowledgment: "{permit-ref-or-public-archive-source}"` field in `photo-credits.json`.
- For Dome of the Rock interior: any photo claiming to be interior must be flagged (non-Muslims can't enter; interior photos are either old/restricted/uncommon).

**Prevention strategy by site:**

| Site | Strategy |
|---|---|
| Western Wall (Kotel) | Use exterior architecture shots only. Source: IGPO archive or Wikimedia Commons photos NOT depicting commercial use of the site itself (e.g., wide shots from a distance). Never use a portrait of an identifiable worshipper. The [Western Wall Heritage Foundation's filming regulation](https://thekotel.org/en/visitor_information/filming-regulations/) explicitly requires advance approval for commercial photography at the plaza. Public archive photos from IGPO are pre-cleared. |
| Dome of the Rock | Exterior only. Source: Wikimedia Commons has strong coverage. No interior shots needed in editorial copy; if used, must cite museum/archive source explicitly. |
| Al-Aqsa Mosque | Exterior only, same as Dome of the Rock. |
| Church of the Holy Sepulchre | Exterior or public-archive interior shots only. [Christian Information Center](https://www.cicts.org/en/authorization-filming) handles permits. Do NOT commission a shoot; rely on IGPO or Wikimedia Commons archive. |
| Tomb of the Patriarchs (Hebron) | Editorial care advised. If covered at all, use historical archive images, not modern photos that might depict worshippers. |
| Bahai Gardens (Haifa & Akko) | Bahai authorities are very protective of imagery — they prohibit photography of their faithful during pilgrimage. Architectural/garden photography from public viewing terraces is generally OK. Use Wikimedia Commons; spot-check the Bahai community's stated policies. |

**Phase to address:** Phase 1.5 (photo credits ledger schema includes `restrictedSiteAcknowledgment` field), Phase 1.9 (audit rule).

---

## 3.8 IS 5568 Accessibility — Beyond WCAG 2.1 AA

**What goes wrong:** Site passes Lighthouse a11y ≥95 (WCAG 2.1 AA). Site is still NOT IS 5568 compliant because:
- No published `הצהרת נגישות` (Hatzaharat Negishut) page
- No named accessibility coordinator with phone + email
- Error messages on forms are in English on Hebrew pages
- Skip-nav uses physical CSS positioning (`left: -9999px`) not logical (`inset-inline-start: -9999px`) — invisible to RTL screen readers on first tab
- Accessibility statement page is not linked from every page footer

**Statutory damages: up to 50,000 NIS per violation** under the Equal Rights for Persons with Disabilities Act, **without proof of harm needed**. Plaintiff-driven litigation is common — there are Israeli firms that specialize in suing non-compliant sites.

**Detection signal:**
- Audit rule: `/he/accessibility-statement` page must exist (build fails if missing).
- Audit: every page's `<footer>` must include a link to `/he/accessibility-statement` (or `/{lang}/accessibility-statement`).
- Audit: every `<form>` on a Hebrew page must have at least one Hebrew error message (regex-detect Hebrew Unicode range U+0590–U+05FF in elements with `role="alert"`).
- Skip-nav CSS check (build step): any `*-9999px` rule for the skip-nav must use `inset-inline-start`, not `left`.

**Prevention:**
- Use the `israeli-accessibility-compliance` skill (already installed). Step 6 in SKILL.md has the exact accessibility statement template.
- Phase 1.3 component library includes:
  - `<SkipNav>` using `inset-inline-start: -9999px` + focus reveal.
  - `<AccessibilityCoordinator>` displayed on `/accessibility-statement` and linked from footer.
  - `<FormError role="alert">` for inline Hebrew validation messages.
- Designate accessibility coordinator (name + phone + email) BEFORE Phase 2 ships. This is a real legal exposure.

**Anti-pattern reminder (already in the SKILL):** Don't ship an accessiBe/UserWay/AudioEye-style overlay. FTC fined accessiBe $1M in April 2025; the Israeli Commission has not endorsed any overlay product. If you ship a Reg-35 preferences widget, it's a user-preference COMFORT tool only — never claim it grants compliance.

**Phase to address:** Phase 1.1 (i18n + RTL CSS scaffold), Phase 1.3 (components), Phase 2.5 (accessibility statement page legal), Phase 1.9 (audit rules).

---

## 3.9 RTL Mirror-Layout Component Drift

**What goes wrong:** PhotoGallery component built LTR — left-arrow goes to previous, right-arrow to next. In RTL the visual direction is mirrored but the keyboard handler still treats left=previous. Hebrew users hit right-arrow expecting next and go to previous instead.

**Why it happens:** Components are tested in English first; RTL is a translation, not a co-equal target.

**Detection signal:**
- Manual: every Phase 1.3 component must have a Storybook example in `dir="rtl"` mode. Audit checks the existence of both stories.
- Visual regression: snapshot diff every component in both dirs.

**Prevention:**
- Tailwind logical properties only — `ps-4` not `pl-4`, `ms-auto` not `ml-auto`, `start-0` not `left-0`. ESLint rule: ban `(?:^|\s)(?:pl|pr|ml|mr|left|right)-` in className strings in components used in localized routes.
- Use the `hebrew-rtl-best-practices` skill for review (already installed).
- For keyboard handlers in carousels: use `e.code` with `KeyArrowLeft`/`KeyArrowRight` but interpret them via `getComputedStyle(el).direction === 'rtl'` to swap semantic meaning.

**Phase to address:** Phase 1.1 (Tailwind config + ESLint), Phase 1.3 (component contract), Phase 1.9 (audit existence-of-RTL-story check).

---

## 3.10 Affiliate Program Operation Verification (Israel)

**What goes wrong:** You ship `safetywingLink()` only to discover SafetyWing's affiliate program excludes residents of certain countries — and one of those countries is where a meaningful share of your traffic originates. Or: GetYourGuide's Israel inventory is sparse outside Tel Aviv / Jerusalem; you have helper buttons on Negev / Galilee pages that return empty results.

**Why it happens:** Assumed parity with other markets.

**Detection signal:**
- R4 research output must have a per-partner ✓/✗ matrix for Israel — confirm in research phase before Phase 1.4 helper is built.
- Phase 1.4 helper unit tests: each helper has a test that requests a representative Israeli destination and asserts the partner returns at least 1 result (manual screenshot evidence in test fixture acceptable).

**Prevention:**
- Phase 0 R4 verifies operation. If a partner is sparse (e.g., GYG Negev), the helper still exists and is wired but with a content-side flag: `affiliateAvailability.gyg = "sparse" | "robust" | "absent"` per region. UI hides the partner card if `absent`.

**Phase to address:** Phase 0 R4 (verification), Phase 1.4 (helpers + fixtures).

---

## 3.11 Russian / French Language Strategy Premature Lock-in

**What goes wrong:** R6 confirms EN+HE is right but speculation about Russian-speaking Israeli market or French Christian pilgrimage market leads to half-implemented Russian/French routes that never get content. SEO discovers `/ru/` 404s. Bad signals.

**Why it happens:** Scaffolding 5 langs feels safer than scaffolding 2.

**Detection signal:**
- Audit: any `/{lang}/{slug}` route that returns 404 OR a placeholder = fail.
- Search Console: 404 reports on `/ru/*` or `/fr/*` URLs.

**Prevention:**
- Phase 1.1 i18n routing scaffold supports 5 langs ARCHITECTURALLY but only registers 2 (EN + HE) in `i18n-config.ts`. Adding RU/FR later = single-line change, plus content.
- Don't add hreflang entries for langs that have no real page.

**Phase to address:** Phase 1.1 (routing scaffold + i18n config gate).

---

# 4. R3 — SEO + Keyword Research per Region

## Methodology and Limitations

**Confidence: MEDIUM-LOW for absolute volume numbers, MEDIUM-HIGH for relative ordering and intent classification.**

Live keyword research access (Ahrefs / SEMrush / DataForSEO API / Google Keyword Planner with active campaign) was not available in this research session. The numbers below are derived from:

1. **Google Trends relative interest** for English-language head terms (5-year window, geo=Worldwide; geo=US for US-origin search; geo=IL for Hebrew search)
2. **SERP top-10 analysis** (manual SERP inspection of representative competitor pages — tourist-israel.com, lonelyplanet.com/israel, viator.com Israel landing, etc.)
3. **Public competitor backlink/keyword inventories** from publicly-disclosed case studies
4. **Hebcal/Wikipedia entity search frequency** as a directional proxy

**Recommendation: BEFORE Phase 2.1 starts the pilot region canonical, the team should buy 1 month of Ahrefs OR DataForSEO API access to validate the numbers below.** Cost: ~$100-200. Without this validation, treat volumes as "directional, within ±50%" — the rankings (which region is biggest) are reliable; the absolute volumes are not.

**Volume buckets used below:**
- **MASSIVE (≥100k/mo global EN)** — head term, fierce SEO
- **LARGE (10k–100k/mo)** — strong commercial intent zone
- **MEDIUM (1k–10k/mo)** — typical region/attraction terms
- **SMALL (100–1k/mo)** — long-tail
- **NICHE (<100/mo)** — micro-long-tail

**Intent classifications:**
- **I** — Informational (what is, where, history) — content-heavy, low commercial value
- **C** — Commercial Investigation (best, things to do, top X) — high affiliate value
- **T** — Transactional (book, tickets, tours, hotels) — highest affiliate value, hardest SEO

---

## 4.1 Jerusalem

**Pilot suitability: STRONG.** Highest informational volume, deepest entity coverage available, strong affiliate inventory across all partners. Religious-tourism complexity is a moat: sites that handle it well differentiate from generic content farms.

**Top 30 keywords (English):**

| Rank | Keyword | Volume bucket | Intent | Difficulty | Notes |
|---|---|---|---|---|---|
| 1 | jerusalem | MASSIVE | I/C | Very high | News/political queries dominate; tourism is a fraction |
| 2 | things to do in jerusalem | LARGE | C | High | Primary commercial head term |
| 3 | jerusalem old city | LARGE | I/C | High | Strong commercial intent under informational guise |
| 4 | jerusalem tour | LARGE | T | High | Affiliate gold |
| 5 | jerusalem hotels | LARGE | T | Very high | Booking.com dominates SERP |
| 6 | western wall | LARGE | I | Medium | Religious search, informational |
| 7 | dome of the rock | MEDIUM | I | Medium | Image search significant |
| 8 | church of the holy sepulchre | MEDIUM | I | Medium | — |
| 9 | jerusalem itinerary | MEDIUM | C | Medium | Long-form commercial intent |
| 10 | jerusalem day trips | MEDIUM | C | Medium | — |
| 11 | mount of olives | MEDIUM | I | Low-medium | — |
| 12 | yad vashem | MEDIUM | I | Low | Strong informational |
| 13 | mahane yehuda market | MEDIUM | C | Low-medium | Food-tourism intent |
| 14 | jerusalem walking tour | MEDIUM | T | Medium | Affiliate strong |
| 15 | tower of david | SMALL | I/C | Low | — |
| 16 | israel museum | MEDIUM | I/C | Low-medium | — |
| 17 | jerusalem to dead sea tour | MEDIUM | T | Medium | High-converting |
| 18 | best time to visit jerusalem | MEDIUM | C | Medium | — |
| 19 | jerusalem shabbat | SMALL | I | Low | Differentiator opportunity |
| 20 | jerusalem old city map | MEDIUM | I | Low | Featured-snippet opportunity |
| 21 | via dolorosa | MEDIUM | I | Low | Pilgrim-route |
| 22 | jerusalem light rail | SMALL | I | Low | Practical |
| 23 | jerusalem food tour | SMALL | T | Low-medium | Affiliate |
| 24 | jerusalem airport | SMALL | I | Very low | (Note: Ben Gurion is the airport for Jerusalem; mention IDF/Ramon for southern access) |
| 25 | machaneh yehuda | SMALL | I/C | Low | (Alt spelling of #13) |
| 26 | mount zion | SMALL | I | Low | — |
| 27 | garden tomb | SMALL | I | Low | Pilgrim-route |
| 28 | armenian quarter | SMALL | I | Low | — |
| 29 | mea shearim | SMALL | I | Low | Sensitive — Haredi neighborhood, photography restrictions |
| 30 | jerusalem to bethlehem | SMALL | C/T | Low | West Bank crossing — handle with R3.1/3.3 framing |

**Top 15 keywords (Hebrew) — proxied volume:**

| Keyword | Romanized | Volume (proxy) | Intent | Notes |
|---|---|---|---|---|
| ירושלים | yerushalayim | MASSIVE | I/C | Head term |
| מה לעשות בירושלים | ma laasot beyerushalayim | LARGE | C | Primary commercial intent |
| טיולים בירושלים | tiyulim beyerushalayim | LARGE | C/T | — |
| הכותל המערבי | hakotel hama'aravi | LARGE | I | — |
| העיר העתיקה ירושלים | ha'ir ha'atika yerushalayim | LARGE | I/C | — |
| מלונות בירושלים | melonot beyerushalayim | LARGE | T | Affiliate primary |
| יד ושם | yad vashem | LARGE | I | — |
| שוק מחנה יהודה | shuk machane yehuda | MEDIUM | C | — |
| מסלולים בירושלים | maslulim beyerushalayim | MEDIUM | C | Long-form intent |
| תחבורה בירושלים | tachbura beyerushalayim | SMALL | I | Practical |
| הר הזיתים | har hazeitim | MEDIUM | I | — |
| כנסיית הקבר | kneset hakever | SMALL-MEDIUM | I | — |
| כיפת הסלע | kipat hasela | MEDIUM | I | — |
| ביקור בכותל | bikur bakotel | SMALL | C | — |
| ירושלים עם ילדים | yerushalayim im yeladim | MEDIUM | C | Family-travel intent |

**Recommended primary keyword (canonical EN):** `things to do in jerusalem`
**Recommended primary keyword (canonical HE):** `מה לעשות בירושלים` (with body content covering morphological variants: לעשות / לבקר / לטייל / לראות + בירושלים / ירושלים)

**Suggested H-tag structure (EN canonical):**
```
H1: Things to Do in Jerusalem: A Complete Travel Guide
H2: When to Visit Jerusalem (best time, weather, Shabbat & holiday calendar)
H2: Where to Stay in Jerusalem (Old City / German Colony / Mamilla / outside the walls)
H2: Top Things to Do in the Old City
  H3: Western Wall (Kotel) — Visiting the Western Wall Plaza
  H3: Church of the Holy Sepulchre
  H3: Temple Mount / Haram al-Sharif — visiting hours and access
  H3: Via Dolorosa
  H3: Jewish, Christian, Muslim, and Armenian Quarters
H2: Top Things to Do in West Jerusalem
  H3: Mahane Yehuda Market
  H3: Yad Vashem
  H3: Israel Museum
  H3: Mount Herzl
H2: Top Day Trips from Jerusalem
  H3: Dead Sea & Masada
  H3: Bethlehem (West Bank — practical notes)
  H3: Tel Aviv
H2: How to Get Around Jerusalem (light rail, walking, taxis, parking)
H2: Where to Eat in Jerusalem
H2: Jerusalem on Shabbat: What's Open
H2: FAQ
```

---

## 4.2 Tel Aviv

**Pilot suitability: STRONG.** Highest commercial-intent volume for hotels/nightlife. Less religious-tourism complexity than Jerusalem. Mediterranean-beach + tech-hub angle. Lower editorial sensitivity overall.

**Top 25 keywords (English):**

| Rank | Keyword | Volume bucket | Intent | Difficulty |
|---|---|---|---|---|
| 1 | tel aviv | MASSIVE | I/C | Very high |
| 2 | things to do in tel aviv | LARGE | C | High |
| 3 | tel aviv hotels | LARGE | T | Very high (Booking dominates) |
| 4 | tel aviv beach | LARGE | I/C | Medium |
| 5 | tel aviv nightlife | LARGE | C | Medium |
| 6 | tel aviv restaurants | LARGE | C | Medium |
| 7 | jaffa | MEDIUM | I/C | Low-medium |
| 8 | tel aviv itinerary | MEDIUM | C | Medium |
| 9 | white city tel aviv | MEDIUM | I/C | Low (Bauhaus UNESCO) |
| 10 | tel aviv to jerusalem | MEDIUM | C/T | Medium |
| 11 | carmel market | MEDIUM | C | Low |
| 12 | tel aviv airbnb | MEDIUM | T | Medium |
| 13 | tel aviv neighborhoods | SMALL | I | Low |
| 14 | tel aviv boutique hotels | SMALL | T | Medium |
| 15 | tel aviv beaches map | SMALL | I | Low |
| 16 | tel aviv gay scene | SMALL | C | Low (Pride pilgrimage market) |
| 17 | tel aviv food tour | SMALL | T | Medium |
| 18 | tel aviv bike tour | SMALL | T | Low |
| 19 | sarona market | SMALL | C | Low |
| 20 | tel aviv museum of art | SMALL | I | Low |
| 21 | rothschild boulevard | SMALL | I | Low |
| 22 | tel aviv day trip | SMALL | C/T | Low |
| 23 | tel aviv brunch | SMALL | C | Low |
| 24 | tel aviv shabbat | NICHE | I | Very low (differentiator) |
| 25 | tel aviv to dead sea | SMALL | T | Low |

**Top 12 keywords (Hebrew):**

| Keyword | Romanized | Volume (proxy) | Intent |
|---|---|---|---|
| תל אביב | tel aviv | MASSIVE | I/C |
| מה לעשות בתל אביב | ma laasot betel aviv | LARGE | C |
| מלונות בתל אביב | melonot betel aviv | LARGE | T |
| חופים בתל אביב | chofim betel aviv | MEDIUM | I/C |
| מסעדות בתל אביב | misadot betel aviv | LARGE | C |
| יפו | yafo | MEDIUM | I/C |
| העיר הלבנה | ha'ir halevana | SMALL | I |
| שוק הכרמל | shuk hacarmel | MEDIUM | C |
| בילויים בתל אביב | biluyim betel aviv | MEDIUM | C |
| תל אביב יפו | tel aviv yafo | MEDIUM | I |
| חיי לילה תל אביב | chayei layla tel aviv | SMALL | C |
| תל אביב עם ילדים | tel aviv im yeladim | MEDIUM | C |

**Recommended primary keyword (canonical EN):** `things to do in tel aviv`
**Recommended primary keyword (canonical HE):** `מה לעשות בתל אביב`

**Suggested H-tag structure:** Adapted from Jerusalem pattern but emphasis on beaches, neighborhoods, nightlife, day trips. Replace religious-site H3s with neighborhood H3s (Florentin, Neve Tzedek, North Tel Aviv, Jaffa).

---

## 4.3 Dead Sea

**Pilot suitability: MEDIUM.** High informational volume for the head term but volume splits between health-tourism (spa, mud, mineral) and adventure/historic (Masada, Ein Gedi). Affiliate inventory thinner here than Jerusalem/Tel Aviv — tours mainly originate from Jerusalem/Tel Aviv as day trips.

**Top 20 keywords (English):**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | dead sea | MASSIVE | I |
| 2 | dead sea tour | LARGE | T |
| 3 | masada | LARGE | I/C |
| 4 | masada and dead sea tour | LARGE | T |
| 5 | dead sea hotels | LARGE | T |
| 6 | ein gedi | MEDIUM | I/C |
| 7 | dead sea spa | MEDIUM | C/T |
| 8 | dead sea mud | MEDIUM | I |
| 9 | float in dead sea | MEDIUM | I |
| 10 | dead sea level | MEDIUM | I (geological news) |
| 11 | masada sunrise | MEDIUM | C/T |
| 12 | qumran | SMALL | I |
| 13 | dead sea from jerusalem | MEDIUM | C/T |
| 14 | dead sea from tel aviv | MEDIUM | C/T |
| 15 | ein bokek | MEDIUM | I/C (resort area) |
| 16 | masada cable car | SMALL | I |
| 17 | snake path masada | SMALL | I |
| 18 | dead sea beach | SMALL | I |
| 19 | dead sea salt | MEDIUM | C (product) — handle, don't target |
| 20 | ein gedi nature reserve | MEDIUM | I/C |

**Recommended primary keyword:** `dead sea tour` (commercial intent, affiliate-strong) for the canonical; sub-destinations for Masada, Ein Gedi, Qumran.

---

## 4.4 Eilat

**Pilot suitability: MEDIUM.** Strong commercial intent (resort destination, diving). Israel-only audience is strong. International EN audience smaller than for Jerusalem/Tel Aviv.

**Top 18 keywords:**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | eilat | LARGE | I/C |
| 2 | eilat hotels | LARGE | T |
| 3 | things to do in eilat | LARGE | C |
| 4 | eilat beach | MEDIUM | I/C |
| 5 | red sea diving | MEDIUM | C/T |
| 6 | coral beach eilat | MEDIUM | I/C |
| 7 | eilat to petra | LARGE | C/T (high-intent cross-border) |
| 8 | eilat aquarium | MEDIUM | C |
| 9 | timna park | MEDIUM | C |
| 10 | dolphin reef eilat | MEDIUM | C |
| 11 | underwater observatory eilat | SMALL | C |
| 12 | eilat all inclusive | MEDIUM | T |
| 13 | eilat snorkeling | MEDIUM | C/T |
| 14 | eilat weather | MEDIUM | I |
| 15 | eilat from tel aviv | MEDIUM | C/T (flight or drive) |
| 16 | ramon airport | SMALL | I |
| 17 | wadi araba border crossing | SMALL | I (R3.3 framing required) |
| 18 | eilat dive shops | SMALL | T |

**Recommended primary keyword:** `things to do in eilat`

---

## 4.5 Galilee (Tiberias, Sea of Galilee)

**Pilot suitability: MEDIUM.** Christian pilgrimage market is significant (potential FR/IT/PT audience). Lower hotel inventory than Tel Aviv.

**Top 18 keywords:**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | sea of galilee | LARGE | I |
| 2 | galilee | MEDIUM | I |
| 3 | tiberias | MEDIUM | I/C |
| 4 | nazareth (separate region — see 4.7) | LARGE | I/C |
| 5 | capernaum | MEDIUM | I |
| 6 | mount of beatitudes | MEDIUM | I |
| 7 | tabgha | SMALL | I |
| 8 | jesus boat | SMALL | I/C |
| 9 | tiberias hotels | MEDIUM | T |
| 10 | hot springs tiberias | SMALL | C |
| 11 | safed (tzfat) | MEDIUM | I/C |
| 12 | hula valley | SMALL | I/C (birding) |
| 13 | galilee tour | MEDIUM | T |
| 14 | jesus trail | SMALL | I/C |
| 15 | sea of galilee map | SMALL | I |
| 16 | mount tabor | SMALL | I |
| 17 | kinneret | MEDIUM | I (Hebrew name, mixed audience) |
| 18 | galilee from tel aviv | SMALL | C/T |

**Recommended primary keyword:** `sea of galilee` for the canonical; `tiberias` + `safed` + `capernaum` as sub-destinations.

---

## 4.6 Negev Desert (Masada caveat — see 4.3; Mitzpe Ramon, Sde Boker)

**Pilot suitability: WEAK.** Lower aggregate volume; high-quality niche (Mitzpe Ramon glamping, dark-sky tourism). Worth covering for editorial differentiation but unlikely to be the pilot.

**Top 14 keywords:**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | negev desert | MEDIUM | I |
| 2 | mitzpe ramon | MEDIUM | I/C |
| 3 | ramon crater | MEDIUM | I/C |
| 4 | makhtesh ramon | SMALL-MEDIUM | I (Hebrew name) |
| 5 | beer sheva | MEDIUM | I (mixed: tourism is a small fraction) |
| 6 | sde boker | SMALL | I (Ben-Gurion grave) |
| 7 | negev tour | SMALL | T |
| 8 | mitzpe ramon hotels | SMALL | T |
| 9 | desert glamping israel | SMALL | T |
| 10 | dimona | SMALL | I (mostly news) |
| 11 | avdat | SMALL | I (Nabatean UNESCO) |
| 12 | ein avdat | SMALL | I/C |
| 13 | dark sky negev | NICHE | C (astrotourism) |
| 14 | bedouin experience israel | SMALL | C/T |

**Recommended primary keyword:** `negev desert` for canonical; `mitzpe ramon` + `makhtesh ramon` as sub-destinations.

---

## 4.7 Nazareth

**Pilot suitability: WEAK.** Strong pilgrimage-tourism, narrow audience, lower hotel inventory.

**Top 12 keywords:**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | nazareth | LARGE | I |
| 2 | nazareth israel | MEDIUM | I (disambiguation) |
| 3 | basilica of the annunciation | MEDIUM | I |
| 4 | nazareth tour | MEDIUM | T |
| 5 | nazareth hotels | SMALL | T |
| 6 | nazareth old city | SMALL | I |
| 7 | jesus's hometown | SMALL | I |
| 8 | st joseph's church nazareth | SMALL | I |
| 9 | nazareth from tel aviv | SMALL | C/T |
| 10 | nazareth restaurants | SMALL | C |
| 11 | mary's well | SMALL | I |
| 12 | nazareth christmas | SMALL | I (seasonal) |

**Recommended primary keyword:** `things to do in nazareth`

---

## 4.8 Caesarea

**Pilot suitability: WEAK.** Strong day-trip volume, mostly informational.

**Top 10 keywords:**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | caesarea | MEDIUM | I |
| 2 | caesarea national park | MEDIUM | I |
| 3 | caesarea maritima | SMALL | I |
| 4 | caesarea ruins | SMALL | I |
| 5 | caesarea tour | SMALL | T |
| 6 | caesarea amphitheater | SMALL | I |
| 7 | caesarea from tel aviv | SMALL | C/T |
| 8 | caesarea beach | SMALL | C |
| 9 | caesarea golf | NICHE | C |
| 10 | caesarea harbor | SMALL | I |

**Recommended primary keyword:** `caesarea national park`

---

## 4.9 Acre (Akko)

**Pilot suitability: WEAK.** UNESCO site, growing interest. Bahai-Gardens overlap with Haifa (different gardens, same Bahai connection).

**Top 12 keywords:**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | acre israel | MEDIUM | I |
| 2 | akko | MEDIUM | I (Hebrew name) |
| 3 | old city acre | MEDIUM | I/C |
| 4 | acre crusader | SMALL | I |
| 5 | bahai gardens akko | SMALL | I/C |
| 6 | acre tour | SMALL | T |
| 7 | hospitaller fortress | SMALL | I |
| 8 | acre from tel aviv | SMALL | C/T |
| 9 | acre restaurants | SMALL | C |
| 10 | underground city acre | SMALL | I |
| 11 | knights halls acre | NICHE | I |
| 12 | acre beach | SMALL | C |

**Recommended primary keyword:** `things to do in acre israel` (note: disambiguate from "acre" as unit of land — include "israel" qualifier)

---

## 4.10 Haifa (Bahai Gardens)

**Pilot suitability: MEDIUM.** Strong "what to do" + Bahai Gardens is a UNESCO draw. Tech-hub angle.

**Top 14 keywords:**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | haifa | LARGE | I |
| 2 | bahai gardens | LARGE | I/C |
| 3 | bahai gardens haifa | LARGE | I/C |
| 4 | things to do in haifa | MEDIUM | C |
| 5 | mount carmel | MEDIUM | I |
| 6 | haifa hotels | MEDIUM | T |
| 7 | german colony haifa | SMALL | I/C |
| 8 | haifa port | SMALL | I |
| 9 | stella maris | SMALL | I |
| 10 | haifa beach | SMALL | C |
| 11 | haifa from tel aviv | SMALL | C/T |
| 12 | wadi nisnas | SMALL | I/C |
| 13 | shrine of the bab | SMALL | I |
| 14 | haifa cable car | SMALL | C |

**Recommended primary keyword:** `things to do in haifa` (Bahai Gardens as primary H2)

---

## 4.11 Golan Heights

**Pilot suitability: WEAK.** Editorial sensitivity (international-status dispute) + lower commercial inventory + smaller search volume = not a pilot but useful for breadth.

**Top 10 keywords:**

| Rank | Keyword | Volume | Intent |
|---|---|---|---|
| 1 | golan heights | MEDIUM | I (significant news fraction) |
| 2 | mount hermon | MEDIUM | I/C (ski + hiking) |
| 3 | golan wine | SMALL | C |
| 4 | banias waterfall | SMALL | I/C |
| 5 | nimrod fortress | SMALL | I |
| 6 | katzrin | NICHE | I |
| 7 | golan heights tour | SMALL | T |
| 8 | mount hermon ski | SMALL | T (seasonal) |
| 9 | hula valley birding (overlap with Galilee) | SMALL | C |
| 10 | golan heights wineries | SMALL | C |

**Recommended primary keyword:** `golan heights` (with explicit "in the Golan Heights, a region administered by Israel since 1967" editorial framing — keep neutral).

---

## 4.12 Optional — Bethlehem (West Bank)

**Decision: INCLUDE as a separate region page under `/west-bank/bethlehem/` (NOT under `/israel/` hierarchy), with explicit administrative framing per R3.1 and R3.3.**

**Top 8 keywords:**

| Keyword | Volume | Intent |
|---|---|---|
| bethlehem | LARGE | I (heavy religious/biblical mix) |
| church of the nativity | MEDIUM | I |
| bethlehem tour | MEDIUM | T (cross-checkpoint tour) |
| bethlehem from jerusalem | MEDIUM | C/T |
| bethlehem christmas | SMALL | I (seasonal) |
| manger square | SMALL | I |
| banksy wall bethlehem | SMALL | I/C |
| bethlehem hotels | SMALL | T |

**Editorial requirement:** Every Bethlehem page MUST link to the Israel-West Bank-Gaza travel advisory and include the administrative-status clause.

---

## 4.13 Optional — Hebron

**Decision: RECOMMEND EXCLUSION from initial 5–15 region scope.** Safety advisories, divided access, photography sensitivity, and political risk outweigh the keyword opportunity. Revisit post-launch if needed.

---

# 5. R5 — Image Source Legality Map

## 5.1 Source Inventory & Licensing

| Source | License | Attribution | Bulk download | Commercial use | Notes |
|---|---|---|---|---|---|
| [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Israel) | Per-file (mostly CC-BY, CC-BY-SA, PD; some non-free flagged) | YES per CC terms | API + dump | YES (per file license) | Strongest single source for Jerusalem, Tel Aviv, Masada. Sparser on Negev/Galilee. Always verify per-file licence; CC-BY-SA propagates copyleft to derived works (matters if you composite). |
| [Israel Government Press Office (IGPO) / National Photo Collection](https://gpophoto.gov.il/) | Stated "free for commercial use, no attribution required" per Wikimedia Israel partnership (verify per-image on official portal) | Recommended but not required for partnership-released images | Some images via official portal; partnership released ~thousands to Wikimedia | YES per partnership-released set | 160,000+ image archive. Pre-state Israel set of 28,000 photos released 2017 via Wikimedia Israel — all public-domain in Israel. |
| [Israel Ministry of Tourism / `israel.travel` gallery](https://israel.travel/gallery-2/) + [Flickr stream](https://www.flickr.com/photos/israelphotogallery/) | Some on Flickr under CC; some "all rights reserved" | YES per CC | Flickr (~895 photos) | YES for CC-licensed subset only | Verify each photo's Flickr license badge — mix of CC-BY and "All rights reserved." Coverage is editorial-oriented (events, beach scenes, food). Modest volume. |
| [Wikimedia Commons "Photos by the Ministry of Tourism (Israel)"](https://commons.wikimedia.org/wiki/Category:Photos_by_the_Ministry_of_Tourism_(Israel)) | CC (per Commons import — typically CC-BY-2.0 from Flickr) | YES | Commons API | YES | Limited set (~22 files at last spot check). Important: only Flickr-licensed photos were imported; not all Ministry photos are CC. |
| [Unsplash](https://unsplash.com/s/photos/israel) | Unsplash License (~CC0 with restrictions; commercial OK, no attribution required but appreciated) | Optional | Yes | YES | ~750+ Israel photos. Strong on Tel Aviv, Jerusalem skylines; weaker on specific monuments. Risk: same photos appear on many competing sites (uniqueness penalty). |
| [Pexels](https://www.pexels.com/search/israel/) | Pexels License (similar to Unsplash) | Optional | Yes | YES | ~5,000+ Israel photos. Similar uniqueness-risk to Unsplash. |
| Flickr (CC pool) | Per-photo (CC-BY, CC-BY-SA, etc.) | YES | Flickr API | Per license | Better long-tail coverage for Negev, Golan, Acre than Wikimedia. Verify each photo. |
| `israel-in-photos.com`, similar fan sites | All rights reserved typically | N/A | N/A | NO unless explicit license | Avoid unless explicit licensing acquired. |

---

## 5.2 Per-Region Coverage Estimates

**Methodology:** Spot-check of Wikimedia Commons category landing pages + Unsplash search results. Numbers are estimates: "% usable" means CC-BY/CC-BY-SA OR public-domain, ≥1200px wide, no watermark, no obvious political graffiti/banners, no identifiable minor or non-consenting subjects.

| Region | Wikimedia % usable (est.) | Volume | Primary source recommendation | Secondary | Gap risk |
|---|---|---|---|---|---|
| Jerusalem (Old City) | 70–80% | Very high (>10k files) | Wikimedia Commons | IGPO | LOW. Strongest single region for free imagery. Restricted-site rule (5.4) still applies to Western Wall / Holy Sepulchre. |
| Tel Aviv | 60–70% | High (>5k files) | Wikimedia Commons | Unsplash (curated) | LOW. Lots of Bauhaus / White City coverage. |
| Dead Sea | 65–75% | Medium-high | Wikimedia Commons | Flickr CC | MEDIUM. Masada is well-covered; Ein Bokek resort area is thinner. |
| Eilat | 50–60% | Medium | Wikimedia Commons | IGPO + Flickr CC | MEDIUM. Coral Beach and Red Sea diving are thin on CC; consider commissioning. |
| Galilee | 50–60% | Medium | Wikimedia Commons | Flickr CC | MEDIUM-HIGH. Capernaum, Mt. Beatitudes, Tabgha well-covered (pilgrim tradition); Tiberias urban is thinner. |
| Negev | 40–50% | Medium-low | Flickr CC | Wikimedia Commons | HIGH. Significant gap. Mitzpe Ramon and Ramon Crater have some great CC photos but limited quantity. Strong candidate for commissioning. |
| Nazareth | 55–65% | Medium-low | Wikimedia Commons | Flickr CC | MEDIUM. Basilica of the Annunciation well-covered. |
| Caesarea | 60–70% | Medium | Wikimedia Commons | Flickr CC | MEDIUM-LOW. UNESCO site → good archaeological coverage. |
| Acre (Akko) | 50–60% | Medium | Wikimedia Commons | Flickr CC | MEDIUM. UNESCO old city. Underground tunnels have limited CC. |
| Haifa | 65–75% | Medium-high | Wikimedia Commons | Unsplash | LOW-MEDIUM. Bahai Gardens have many photos (verify Bahai community position on commercial use — see 5.4). |
| Golan Heights | 45–55% | Medium | Wikimedia Commons + Flickr CC | — | HIGH. Mount Hermon, Banias well-photographed; many shots include military installations — must filter. |
| Bethlehem (West Bank) | 60–70% | Medium-high | Wikimedia Commons | Flickr CC | MEDIUM. Church of the Nativity, Manger Square, "Banksy wall" all have abundant CC photos. Filter for politically-loaded graffiti unless intentional. |

**Overall image strategy:** Wikimedia Commons is the spine. IGPO supplements with editorial-quality archive shots. Flickr fills Negev / Galilee gaps. Unsplash/Pexels reserved for "abstract Israel" hero shots (Mediterranean sunset, generic desert) where uniqueness matters less.

**Commissioning recommendation:** Budget for ~$1,500–$3,000 of commissioned photography focused on the Negev, Galilee back-country, and specific affiliate-relevant scenes (boutique hotels, tour guide portraits) where CC inventory is weak. Negotiate full commercial rights + perpetual non-exclusive license. Document in `data/photo-credits.json` with `license: "Commissioned-NonExclusive-Perpetual"`.

---

## 5.3 IGPO Specifics (per official sources)

**Confidence: MEDIUM-HIGH** — based on multi-source convergence:
- [Government Press Office Photography Department](https://www.gov.il/en/departments/units/photography) confirms photo distribution operation.
- [IGPO photo portal](https://gpophoto.gov.il/) is the public-facing archive (Hebrew-first; English supported).
- Wikimedia Israel partnership (per [Times of Israel reporting](https://www.timesofisrael.com/wikipedia-uploads-28000-photos-of-pre-state-israel-for-all-to-use/)) confirms commercial-use clearance for the 28,000 pre-state photos and an ongoing release process for portions of the modern collection.

**Practical workflow:**
1. Search the IGPO portal in Hebrew (much deeper indexing) or English.
2. For each photo: verify the photo metadata states free-for-commercial OR check if it's in the Wikimedia Commons "National Photo Collection (Israel)" category (which means it's been pre-cleared and re-licensed under CC).
3. Always cite "Source: Israel Government Press Office, Photographer: {name}" — even when attribution isn't required, the citation builds trust and audit trail.
4. For modern (post-1948) photos, when in doubt, email gpo-photo@pmo.gov.il and request explicit confirmation. Keep the email in the `data/photo-credits.json` `licenseProof` field for audit.

---

## 5.4 Religious-Site Photography Restrictions (Detail)

Reproduced from R3.7 with specific source URLs and permit costs verified.

### Western Wall (Kotel)
- **Casual photo by visitor:** OK for personal use.
- **Commercial photography (including editorial website use):** REQUIRES advance approval from the Western Wall Heritage Foundation. Apply via [thekotel.org filming regulations page](https://thekotel.org/en/visitor_information/filming-regulations/). 48-hour notice required.
- **Practical strategy for the site:** Use IGPO-archived photos (pre-cleared) or wide-context architectural shots from Wikimedia Commons — do NOT commission new commercial photography at the plaza without permit. Never publish a photo identifying a worshipper without explicit consent.

### Dome of the Rock / Al-Aqsa
- **Interior:** Non-Muslims cannot enter. Any interior photo must be sourced from museum/archive collections; cite explicitly.
- **Exterior:** Wikimedia Commons has extensive coverage. No special commercial-use restriction beyond standard CC license terms.
- **Sensitive content:** Avoid photos depicting tensions, military presence, or political symbols.

### Church of the Holy Sepulchre
- **Casual photo:** Generally permitted in most chapels; one chapel prohibits.
- **Commercial photography:** Requires permits from BOTH Greek Orthodox Patriarchate AND Armenian Orthodox Patriarchate, AND payment of **$150 non-refundable fee** to [Christian Information Center](https://www.cicts.org/en/authorization-filming) (current as of Jan 2026 per the CIC page).
- **Practical strategy:** Use existing IGPO / Wikimedia archive photos. Do not commission new shoots.

### Bahai Gardens (Haifa and Akko)
- **Architectural / garden photography from public terraces:** Generally permitted.
- **Photographing Bahai faithful during pilgrimage:** Prohibited.
- **Practical strategy:** Use exterior architectural / landscape shots only. Wikimedia Commons coverage is solid. Verify the Bahai International Community's current policy by emailing the Bahai World Centre press office before any commercial commissioning.

### Mea Shearim (Hasidic neighborhood, Jerusalem)
- **Casual photography of identifiable Haredi residents:** Strongly discouraged by the community; some streets have prominent signs prohibiting it on Shabbat in particular.
- **Practical strategy:** If you must depict the neighborhood, use streetscape / architecture shots without identifiable people.

---

## 5.5 Photo Credits Ledger Schema (Phase 1.5 input)

Recommended `photo-credits.json` schema extending the mega-prompt minimum:

```json
{
  "src": "/images/jerusalem/old-city-rooftops.jpg",
  "author": "Andrew Shiva",
  "license": "CC-BY-SA-4.0",
  "sourceUrl": "https://commons.wikimedia.org/wiki/File:...",
  "region": "jerusalem",
  "slug": "old-city-rooftops",
  "width": 2400,
  "height": 1600,
  "captureDate": "2018-07-12",
  "subjectType": "architecture",
  "restrictedSiteAcknowledgment": null,
  "licenseProof": "Wikimedia Commons file page accessed 2026-05-11",
  "watermarkChecked": true,
  "containsIdentifiablePerson": false
}
```

Fields beyond the mega-prompt minimum:
- `width`, `height` — enforce ≥1200px width
- `subjectType` — `architecture`, `landscape`, `portrait`, `food`, `religious-site`, `urban`, `nature`
- `restrictedSiteAcknowledgment` — non-null only for restricted religious sites; references the permit or pre-cleared archive citation
- `licenseProof` — URL or attestation method
- `watermarkChecked` — boolean; CI runs a small image-classifier (pHash + watermark heuristics) and sets this
- `containsIdentifiablePerson` — boolean; if true, requires `personConsentProof` (path to release form or archive citation)

---

# 6. Detection Signals & Audit Dashboard Rules

Consolidating detection signals from all sections into concrete audit dashboard rules. These become inputs for Phase 1.9 audit dashboard implementation.

| Rule ID | Section | Severity | Detection | Pass criterion |
|---|---|---|---|---|
| `AUD-001` | 2 / Argentina #1 | Critical | Regex `/#[0-9A-Fa-f]{3,8}\b/` in `.tsx`/`.jsx` outside `tailwind.config.ts` | 0 matches |
| `AUD-002` | 2 / Argentina #2 | Critical | Regex partner-domain href without helper wrapper | 0 matches |
| `AUD-003` | 2 / Argentina #3 | Critical | `<Image src=...>` whose `src` has no entry in `data/photo-credits.json` | 0 matches |
| `AUD-004` | 2 / Argentina #3 | Critical | Image file width < 1200px | 0 matches |
| `AUD-005` | 2 / Argentina #3 | Major | Image without `srcset` (or Next `<Image>` without `sizes`) | 0 matches |
| `AUD-006` | 1.1 | Major | H1 of sub-destination contains region head-keyword without entity qualifier | 0 matches per region |
| `AUD-007` | 1.2 | Major | Hebrew/EN page word-count ratio outside [0.85, 1.40] | 100% of pages within band |
| `AUD-008` | 1.3 | Critical | Page HTML pre-hydration missing H1 OR primary CTA href | 100% of pages have both |
| `AUD-009` | 1.4 | Critical | Page with affiliate link missing visible disclosure within first viewport-height | 0 violations |
| `AUD-010` | 1.4 | Major | Affiliate URL returns 4xx/5xx in weekly health check | <5% per partner |
| `AUD-011` | 1.6 | Major | Geo-tracked conversion-rate anomaly: country with >100 sessions <50% of global per-partner CR | Manual review when flagged |
| `AUD-012` | 1.7 | Major | LCP element with `loading="lazy"` | 0 occurrences |
| `AUD-013` | 1.8 | Major | Third-party blocking time > 250ms (Lighthouse `third-party-summary`) | <250ms |
| `AUD-014` | 1.8 | Major | More than 6 external `<script>` tags in any page | ≤6 |
| `AUD-015` | 1.9 | Major | `<iframe>` or partner widget without explicit width/height/aspect-ratio | 0 occurrences |
| `AUD-016` | 1.11 | Minor | Page `lastReviewed` > 9 months | <10% of pages |
| `AUD-017` | 3.1 | Major | Regex `\bWailing Wall\b` | 0 matches |
| `AUD-018` | 3.1 | Major | Regex `\b(Judea and Samaria\|occupied territories)\b` | 0 matches |
| `AUD-019` | 3.1 | Minor | First-paragraph Temple Mount mention without paired "Haram al-Sharif" | 0 violations |
| `AUD-020` | 3.1 | Major | Bethlehem/Hebron/Jericho page missing `administrativeStatus` frontmatter or clarifying clause | 0 violations |
| `AUD-021` | 3.2 | Major | `OpeningHoursSpecification` schema without paired "subject to holidays" note | 0 violations |
| `AUD-022` | 3.4 | Minor | Hardcoded USD adjacent to ILS in MDX (regex) | 0 matches |
| `AUD-023` | 3.5 | Minor | URL with Gregorian year in slug missing canonical to evergreen page | 0 violations |
| `AUD-024` | 3.6 | Major | Hebrew page title containing Latin chars outside `dir="ltr"` wrapper | 0 violations |
| `AUD-025` | 3.6 | Minor | Ktiv chaser variant detected against ktiv-maleh dictionary | <5 per page |
| `AUD-026` | 3.7 | Critical | Image of restricted religious site without `restrictedSiteAcknowledgment` | 0 violations |
| `AUD-027` | 3.8 | Critical | `/he/accessibility-statement` page missing | exists |
| `AUD-028` | 3.8 | Critical | Footer missing link to `/he/accessibility-statement` (or `/{lang}/accessibility-statement`) | 100% pages |
| `AUD-029` | 3.8 | Major | Hebrew form `<input required>` without Hebrew `role="alert"` sibling | 0 violations |
| `AUD-030` | 3.9 | Major | Component className using physical CSS direction props (pl-, pr-, ml-, mr-, left-, right-) in localized routes | 0 matches |
| `AUD-031` | 3.10 | Major | Partner helper unit test missing an Israel-destination fixture | 100% have fixture |
| `AUD-032` | 3.11 | Major | Hreflang reference to lang without registered route | 0 violations |
| `AUD-033` | All | Major | Page missing one of: `<link rel="canonical">`, JSON-LD schema, meta description, OG tags, hreflang | 100% complete |
| `AUD-034` | 1.7 | Major | Lighthouse mobile 3-run-median below profile threshold (90 perf, 95 a11y/best-prac, 100 SEO for canonicals; soft 85 for replicas) | passes |

**Recommendation: Phase 1.9 implements rules `AUD-001` through `AUD-016` (universal generic) first, then layers `AUD-017` through `AUD-034` (Israel-specific + accessibility).** The first batch is portable from Argentina lessons; the second batch is Israel-specific authority.

---

# 7. Pitfall-to-Phase Mapping

Compact mapping of every named pitfall to the roadmap phase that prevents it. Useful as Quality Gate input.

| Pitfall ID | Pitfall | Prevention phase | Verification phase | Audit rule |
|---|---|---|---|---|
| 1.1 | SEO cannibalization | 1.6 (schema), 1.9 (audit) | 2.3 (sub-destinations) | AUD-006 |
| 1.2 | Thin content via over-translation | 1.7, 2.2 | 2.6 (QA) | AUD-007 |
| 1.3 | Client-side render hiding content | 1.1 (lint), 1.10 (CI) | 2.6 | AUD-008 |
| 1.4 | FTC affiliate disclosure | 1.3 (component), 2.5 (legal page) | 2.6 | AUD-009 |
| 1.5 | Affiliate link rot | 1.4 (helpers), 6 (monitoring) | ongoing | AUD-010 |
| 1.6 | Geo-restriction silent failure | 0 (R4), 1.4 (helpers), 6 (monitoring) | ongoing | AUD-011 |
| 1.7 | LCP failure from hero | 1.3 (RegionHero contract), 1.10 (Lighthouse) | 2.6 | AUD-012, AUD-034 |
| 1.8 | Third-party script bloat | 1.1 (analytics decision), 1.10 (Lighthouse) | 2.6 | AUD-013, AUD-014 |
| 1.9 | Layout shift from widgets | 1.3 (component contract) | 2.6 | AUD-015 |
| 1.10 | Stock-photo overuse | 1.5 (ledger), 1.9 (audit) | 2.6 | manual review |
| 1.11 | Out-of-date prices/hours | 1.5 / 1.7 (frontmatter), 6 (cadence) | 6 quarterly | AUD-016 |
| 1.12 | Stale sitemap | 1.8 (dynamic) | 2.6 | manual |
| Argentina #1–#9 | Per row above | per row | per row | AUD-001 through AUD-005 |
| 3.1 | Religious-site naming | 1.7 (profile), 2.1 (pilot copy), 1.9 (audit) | Quality Gate | AUD-017, AUD-018, AUD-019, AUD-020 |
| 3.2 | Shabbat / holiday closures | 1.3 (`<ShabbatNotice>`), 2.1 (pilot) | 2.6 | AUD-021 |
| 3.3 | Border / security framing | 1.5 (frontmatter), 2.1 (pilot copy) | Quality Gate | manual + AUD-020 |
| 3.4 | ILS currency volatility | 1.3 (`<Price>`), 1.9 (audit) | 2.6 | AUD-022 |
| 3.5 | Hebrew calendar drift | 1.6 (canonical pattern), 6 (yearly refresh) | annual | AUD-023 |
| 3.6 | Hebrew SEO morphology | 1.1 (lang config), 2.2 (apply skill) | 2.6 | AUD-024, AUD-025 |
| 3.7 | Religious-site image rights | 1.5 (ledger schema), 1.9 (audit) | Quality Gate | AUD-026 |
| 3.8 | IS 5568 a11y | 1.1 (RTL), 1.3 (components), 2.5 (legal) | Quality Gate (a11y ≥95) | AUD-027, AUD-028, AUD-029 |
| 3.9 | RTL mirror-layout drift | 1.1 (Tailwind+ESLint), 1.3 (components) | 2.6 | AUD-030 |
| 3.10 | Affiliate Israel-operation | 0 R4, 1.4 (helpers) | Quality Gate | AUD-031 |
| 3.11 | RU/FR premature lock-in | 1.1 (i18n config) | 2.6 | AUD-032 |

---

# 8. Technical Debt Patterns (acceptable shortcuts vs. never-acceptable)

| Shortcut | Immediate benefit | Long-term cost | Acceptable when |
|---|---|---|---|
| Skip Storybook RTL story for a component | Saves 30min during Phase 1.3 | Hebrew users hit visual bugs; codemod sprint | NEVER (per PROJECT.md i18n-from-day-1 constraint) |
| Hard-code one partner without helper | "Just shipping the pilot" | 92%-vs-18% disaster recurs | NEVER (per inviolable constraint) |
| Use a `loading="lazy"` on hero "for the perf score" | 5min faster shipping | LCP fail, Quality Gate fail | NEVER |
| Stock photo (Unsplash) on hero | 0min sourcing | Generic look; uniqueness penalty | Only for "abstract Israel" hero shots; never for region-specific landmark heroes |
| English-only error messages on a Hebrew page | 30min faster | IS 5568 violation, 50k NIS exposure per claim | NEVER |
| Skip `restrictedSiteAcknowledgment` for a Western Wall photo from IGPO | 0min | Manageable risk because IGPO is pre-cleared, BUT trail is lost | Only when source is IGPO AND `licenseProof` field cites the specific archive page |
| `EN-only` initial launch, Hebrew "next sprint" | Half the content cost | i18n bolted-on, Hebrew traffic plateau | NEVER (per PROJECT.md mandatory parity) |
| One language pair MVP and add second later | Faster ship | Argentina pattern; refactor sprint | NEVER for EN+HE; ACCEPTABLE for any 3rd lang (RU/FR) decided post-launch |
| Use a third-party a11y overlay | "Instant compliance" claim | FTC suit risk; Israeli Commission non-endorsement | NEVER |

---

# 9. Integration Gotchas

| Integration | Common mistake | Correct approach |
|---|---|---|
| Booking.com affiliate | Hard-code AID in JSX | Helper `bookingLink({destination, geo, aid})` reading `process.env.NEXT_PUBLIC_BOOKING_AID` |
| GetYourGuide | Use embedded widget for inventory | Static partner card with helper-generated URL; widget breaks CLS |
| Civitatis | Mix `&aid=` and `&partner=` params | One canonical URL pattern per helper; codemod-ready |
| Hebcal API | Hit on every page render | Server-side fetch with 24h cache; client-side widget reads from cache |
| Google Search Console | Submit sitemap once and forget | CI regenerates sitemap; SC re-submission on slug changes (manual quarterly check) |
| Israel.travel / IGPO photo portal | Hotlink images directly | Always download, verify license, re-host on your CDN with credits entry |
| Vercel deploy | Skip Lighthouse CI on preview deploys | Run on every preview; block merge if fail |
| Cloudflare / CDN | Cache hreflang variations under same key | Vary by `accept-language` AND URL prefix; Next.js handles when configured correctly |

---

# 10. Performance Traps

| Trap | Symptom | Prevention | Scale where it breaks |
|---|---|---|---|
| Hero images served from origin (not CDN) | LCP 4s+ on 3G | Vercel Image Optimization / Cloudinary | Any production traffic |
| Hebrew web fonts loaded without `font-display: swap` | FOUT on RTL, layout shift | `next/font` with appropriate swap strategy + preload critical weights | 1k+ daily Hebrew sessions |
| `getStaticProps` regenerates entire site on each ISR revalidate | Build slow, cold deploys | Use Next.js App Router + per-page revalidate | 50+ pages |
| Photo gallery loads all images on mount | Bandwidth cost, FID lag | Intersection-observer lazy load (except LCP) + responsive `sizes` | 10+ images per gallery |
| Multiple analytics scripts (GA4 + Plausible + Hotjar) | TBT > 600ms | Pick ONE; defer or remove others | Any traffic |
| Hebrew RTL recalculates layout on every scroll | Jank on iOS Safari | Avoid `inset-inline-start` animations; use `transform` | Any iOS Hebrew traffic |

---

# 11. Security Mistakes (domain-specific, beyond OWASP basics)

| Mistake | Risk | Prevention |
|---|---|---|
| Storing affiliate AIDs in client-side env vars (`NEXT_PUBLIC_*`) | AIDs are public anyway, but rotation is hard if leaked | Acceptable for `NEXT_PUBLIC_*` (they ARE public) — just plan for rotation in `lib/affiliate/` helpers |
| Accepting user content (reviews, comments) | XSS, libel risk | Out of scope per PROJECT.md — confirm no input fields on the site beyond contact form |
| Contact form spam → IP block lists | Lost contact, missed user feedback | Use a third-party form (Formspree, FormSubmit) with built-in spam filter; never roll your own |
| Image hotlinking from third-party domains | Privacy leak (referrer), broken images on partner changes | Always self-host images per image contract |
| Linking to West-Bank-related sources without explicit framing | Editorial / legal risk vector in some jurisdictions | Always frame administrative status; never editorialize |
| Identifying ultra-Orthodox / Haredi individuals in photos | Cultural / privacy violation; site removal demands | Strict no-identifiable-individuals rule for Mea Shearim and similar |
| Accidentally publishing a photo with IDF personnel in identifying detail | Operational security; explicit Israeli law on certain installations | Visual-screening step in image review; spot-check for uniforms/insignia in any "landscape" shot |

---

# 12. UX Pitfalls

| Pitfall | User impact | Better approach |
|---|---|---|
| Hebrew page with English-only navigation | Hebrew users feel "second class" | 100% nav parity (PROJECT.md mandate) |
| Currency picker that resets on every page load | Confusing | Persist in cookie + URL state |
| Map embed without lazy-load | Mobile data drain, slow LCP | Static map image with "click to open interactive" pattern |
| Booking widget hijacks page scroll | Frustration on mobile | Plain partner link, never widget |
| "Best time to visit" doesn't acknowledge Shabbat/holidays | Trip planning failure | `<ShabbatNotice>` + holiday calendar awareness |
| Accessibility widget that REWRITES content (overlay) | Screen reader confusion + legal exposure | User-preference COMFORT widget only — see `israeli-accessibility-compliance` skill |
| RTL skip-nav positioned with physical `left:-9999px` | Hebrew users tab into it visually broken | `inset-inline-start: -9999px` |

---

# 13. "Looks Done But Isn't" Checklist

Pre-Quality-Gate audit items that demos pass but production fails:

- [ ] **Hebrew page parity** — verify 100% of EN pages have HE equivalents, not 95%
- [ ] **Hreflang reciprocity** — every EN page's HE link must be reciprocated; broken if one-way
- [ ] **Image credits 100%** — `data/photo-credits.json` covers every image, including OG/social-share images and favicon variants
- [ ] **Accessibility statement page** — `/he/accessibility-statement` AND `/en/accessibility-statement` both exist and are linked from EVERY footer
- [ ] **Accessibility coordinator** — real name, real phone, real email, all in `accessibility-statement` page
- [ ] **Affiliate disclosure inline** — every affiliate link page has visible disclosure within first viewport-height
- [ ] **`<ShabbatNotice>` on every region page** — not just the pilot
- [ ] **Schema validates on Schema.org validator AND Google's Rich Results test** — both, not just one
- [ ] **Lighthouse mobile 3-run-median ≥90 on EVERY page**, not just home
- [ ] **Sitemap submitted to Search Console**, not just generated
- [ ] **404 page is helpful** — RTL-correct, has search box, links to key regions
- [ ] **Privacy policy in Hebrew** — not just English with a "Hebrew coming soon"
- [ ] **Partner helper unit tests** — at least 4 per partner per PROJECT.md
- [ ] **Codemod for partner AID flip exists** — file in `scripts/codemods/` per partner
- [ ] **Photo widths verified ≥1200px** — script scans actual file dimensions, not metadata claims
- [ ] **No watermarks on any image** — script + manual spot check
- [ ] **No raw hex codes in any commit** — ESLint AND audit dashboard both pass
- [ ] **OpeningHours schema flagged for holiday subjection** — not unqualified
- [ ] **West Bank pages have administrativeStatus frontmatter** — Bethlehem, Jericho if covered

---

# 14. Recovery Strategies

When pitfalls occur despite prevention, recovery playbook:

| Pitfall | Recovery cost | Recovery steps |
|---|---|---|
| Raw hex codes detected post-launch | LOW (codemod) | (1) Run `scripts/codemods/hex-to-token.mjs` (2) Manual review tokenless-color cases (3) Add to ESLint deny list (4) Re-run audit |
| Cannibalization detected | MEDIUM | (1) Run audit AUD-006 (2) Identify offending pairs (3) Rename sub-destination H1 + canonical (4) Add 301 if URL changes (5) Wait 4–8 weeks for SERP re-ranking |
| FTC disclosure missing on page | HIGH (legal) | (1) Immediate site-wide audit (2) Inline disclosure component injection on every affiliate page (3) Document remediation timeline (4) Consider proactive notification to legal counsel |
| Western Wall commercial photo without permit | HIGH (legal + relations) | (1) Immediate removal (2) Replace from IGPO archive (3) Document incident in `data/incident-log.md` (4) Consider proactive notice to Western Wall Heritage Foundation if photo had wide distribution |
| Hebrew translation gap (>30% word-count delta) | MEDIUM | (1) Re-engage translator with `hebrew-content-writer` skill briefing (2) Rewrite, not edit (3) Re-run AUD-007 |
| Schema validation failure | LOW | (1) Re-run `scripts/qa/validate-schema.mjs` (2) Fix offending generator (3) Re-deploy |
| Lighthouse perf drop post-launch | MEDIUM | (1) Run Lighthouse CI history diff (2) Identify regression commit (3) Revert or fix; common culprits = new third-party script, hero image regression, new font weight |
| IS 5568 lawsuit threat | VERY HIGH | (1) Engage Israeli a11y counsel immediately (2) Do not engage plaintiff directly without counsel (3) Run audit a11y SKILL `scripts/audit_a11y.py` (4) Remediate findings (5) Document compliance work for defense |

---

# 15. Sources

## Confirmed (HIGH confidence)
- [Wikimedia Commons Israel category](https://commons.wikimedia.org/wiki/Category:Israel) — image inventory
- [Wikimedia Israel free image collection project](https://meta.wikimedia.org/wiki/Wikimedia_Israel/Free_image_collection_project) — partnership and licensing context
- [Wikimedia Commons "Photos by the Ministry of Tourism (Israel)"](https://commons.wikimedia.org/wiki/Category:Photos_by_the_Ministry_of_Tourism_(Israel)) — Ministry of Tourism CC photo subset
- [Wikimedia Commons "National Photo Collection (Israel)"](https://commons.wikimedia.org/wiki/Category:The_National_Photo_Collection_(Israel)) — IGPO release category
- [Wikimedia Commons Golan Heights category](https://commons.wikimedia.org/wiki/Category:Golan_Heights) — Golan coverage
- [Wikimedia Commons Historical images of Israel by location](https://commons.wikimedia.org/wiki/Category:Historical_images_of_Israel_by_location) — Acre (28 files), Eilat (29 files), Galilee (113 files) confirmed
- [Times of Israel — Wikipedia uploads 28,000 photos of pre-state Israel](https://www.timesofisrael.com/wikipedia-uploads-28000-photos-of-pre-state-israel-for-all-to-use/) — IGPO partnership context
- [ISRAEL21c — "Let my photos go..."](https://www.israel21c.org/after-stealth-operation-28000-photos-of-pre-state-israel-released-to-public/) — IGPO release confirmation
- [Government Press Office (Israel) — Wikipedia](https://en.wikipedia.org/wiki/Government_Press_Office_(Israel)) — institutional background
- [National Photo Collection (Israel) — Wikipedia](https://en.wikipedia.org/wiki/The_National_Photo_Collection_(Israel)) — 160k+ photo archive size
- [GPO photo portal](https://gpophoto.gov.il/) — public access portal
- [Government Press Office Photography Department](https://www.gov.il/en/departments/units/photography) — official source
- [Israel Ministry of Tourism Flickr stream](https://www.flickr.com/photos/israelphotogallery/) — 895 photos, mixed licensing
- [Israel.travel gallery](https://israel.travel/gallery-2/) — official tourism imagery
- [Western Wall Heritage Foundation filming regulations](https://thekotel.org/en/visitor_information/filming-regulations/) — commercial photography permit requirement
- [Christian Information Center authorization for filming](https://www.cicts.org/en/authorization-filming) — $150 fee (Jan 2026) for Holy Sepulchre permits
- [Hebcal — Jewish Calendar REST API](https://www.hebcal.com/home/195/jewish-calendar-rest-api) — Shabbat times, holidays API
- [Hebcal 2026 holidays](https://www.hebcal.com/holidays/2026) — calendar
- [Hebcal Developer APIs](https://www.hebcal.com/home/developer-apis) — Zmanim, Shabbat, Holidays
- [Termly — FTC Affiliate Disclosure](https://termly.io/resources/articles/ftc-affiliate-disclosure/) — disclosure requirement structure
- [ReferralCandy — FTC Affiliate Disclosure 2026 Checklist](https://www.referralcandy.com/blog/ftc-affiliate-disclosure) — current guidance
- [SEVA — FTC Guidelines for Affiliates 2025](https://www.heyseva.com/blog-posts/ftc-guidelines-for-affiliates-creators-and-brands-2025) — $53,088 per-violation civil penalty (2025)
- [US State Department Israel/West Bank/Gaza Travel Advisory](https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/israel-west-bank-and-gaza-travel-advisory.html) — current advisory
- [Unsplash Israel photos](https://unsplash.com/s/photos/israel) — ~750+ photos
- [Pexels Israel photos](https://www.pexels.com/search/israel/) — ~5,000+ photos
- [Unlighthouse — Don't Lazy-Load Your LCP Image](https://unlighthouse.dev/learn-lighthouse/lcp/lcp-lazy-loaded) — LCP best practice
- [Chrome Lighthouse third-party-summary](https://developer.chrome.com/docs/lighthouse/performance/third-party-summary) — third-party impact audit
- [Hashmeta — Hreflang mistakes](https://hashmeta.com/blog/why-multilingual-hreflang-mistakes-destroy-rankings-the-hidden-seo-crisis/) — reciprocity requirements

## Editorial / Style references (MEDIUM confidence; informed by multiple sources)
- [Temple Mount — Wikipedia](https://en.wikipedia.org/wiki/Temple_Mount) — paired-naming convention used by major media
- [CAMERA — BBC terminology mapping for Temple Mount](https://camera-uk.org/2016/06/23/mapping-changes-in-the-terminology-used-by-the-bbc-to-describe-temple-mount/) — institutional editorial practice
- [Tourist Israel — Places in Jerusalem Open on Shabbat](https://www.touristisrael.com/places-in-jerusalem-open-on-shabbat/17001/) — Shabbat tourism context

## Internal project sources (HIGH confidence — lived experience)
- `E:\visitisrael.site\.planning\PROJECT.md` — Argentina lessons, Israel-specific complexity, inviolable constraints
- `E:\visitisrael.site\MEGA-PROMPT-NEW-COUNTRY.md` — full mega-prompt with phase structure
- `E:\visitisrael.site\.agents\skills\israeli-accessibility-compliance\SKILL.md` — IS 5568 legal authority, anti-overlay patterns
- `E:\visitisrael.site\.agents\skills\hebrew-content-writer\SKILL.md` — Hebrew SEO morphology, ktiv maleh, register guidance

## Recommended next-step research (gaps)
- **Live keyword volumes:** Buy 1-month Ahrefs ($129/mo Lite) OR DataForSEO API ($50 deposit) before Phase 2.1. Validate Section 4 numbers within ±50% bands.
- **Bahai International Community current photography policy:** Email press@bahai.org before commissioning any Bahai Gardens photography for Phase 3 Haifa region.
- **IGPO modern collection licensing:** Email gpo-photo@pmo.gov.il to confirm CC license terms on post-1948 photos used outside the Wikimedia Israel partnership set.
- **R4 partner availability matrix:** Sister research (R4) should verify each affiliate partner operates in Israel and which geos are restricted. This pitfalls doc assumed all 7 named partners operate; R4 must confirm.

---

*PITFALLS research for: Discover Israel tourism affiliate website*
*Researched: 2026-05-11*
*Researcher: gsd-project-researcher (Pitfalls dimension, enriched with R3 SEO + R5 image legality)*
*Document version: 1.0*
