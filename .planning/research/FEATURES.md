# Feature Research — Discover Israel

**Domain:** Tourism affiliate website (destination editorial + monetization)
**Researched:** 2026-05-11
**Confidence:** HIGH on regions/competitors/feature taxonomy; MEDIUM on per-region visitor counts (Israeli Central Bureau of Statistics doesn't publish per-site arrival counts — competitor coverage used as proxy)

This document covers four research dimensions in one file because they are tightly coupled:
1. Israel tourism landscape (R1 — regions ranked)
2. Competitor analysis (R2 — three tiers)
3. Table-stakes vs differentiator vs anti-features
4. Pilot region recommendation (volume × opportunity × competitor weakness)

---

## 1. Tourism Landscape — Regions Ranked

### Context

Israel welcomed ~1.3M international tourists in 2025 (recovery year from 2024's war-disrupted ~961K). Pre-war (2019) peak was ~4.55M. Top source markets in 2025: USA (~400K), France (~160K), UK (~100K), Russia, Ukraine. Spring (Mar–May) and fall (Sep–Nov) are peak; summer is hottest and most crowded; winter is rainy in the north but mild on the Red Sea.

The country is small (≈22,000 km²) — most tourists do a multi-region trip, which makes **inter-region itinerary content** unusually high-value vs single-destination countries.

### Region Ranking — 12 Regions

Ranked by **composite score** = (tourism volume signal × 0.4) + (competitor coverage depth × 0.3) + (sub-destination breadth × 0.3). Volume signal derived from: TripAdvisor "Things to Do" review counts (proxy), Lonely Planet/Frommer's chapter weight, Google Trends "Things to do in [region] Israel", and per-region competitor URL counts on touristisrael.com.

| # | Region | Slug | Volume Signal | Editorial Hook | Best Season | Sub-Dest Count | Religious/Political Sensitivity |
|---|--------|------|---------------|----------------|-------------|----------------|--------------------------------|
| 1 | **Jerusalem** | `jerusalem` | VERY HIGH — #1 destination, ~60% of inbound tourists visit | "Three faiths, one city — and the most contested square mile on Earth" | Mar–May, Oct–Nov (avoid Aug, ~32°C; avoid major holiday weeks unless intentional) | 12–15 (Old City Quarters, Western Wall, Holy Sepulchre, Temple Mount, Mt of Olives, Yad Vashem, Mahane Yehuda, City of David, Israel Museum, Mount Zion, Garden Tomb, Mea Shearim, Tower of David) | **YES — HIGH.** Temple Mount/Haram al-Sharif naming must be paired; East Jerusalem editorial requires neutrality; Mount of Olives partly in disputed territory |
| 2 | **Tel Aviv–Jaffa** | `tel-aviv` | VERY HIGH — gateway airport, beach + nightlife capital | "Mediterranean Bauhaus by day, world-class nightlife by night — the city that doesn't stop" | Apr–Jun, Sep–Oct (Jun–Aug humid 28–32°C but beach season) | 8–10 (Old Jaffa, White City Bauhaus, Carmel Market, Neve Tzedek, Florentin, Rothschild Blvd, Tel Aviv Port, Tayelet beach promenade, HaTachana, Sarona) | **NO** — secular city, low sensitivity. Jaffa has Arab heritage to honor editorially |
| 3 | **Dead Sea** | `dead-sea` | HIGH — ~1M visitors/year reported; spa + Masada bundled | "Float in the lowest place on Earth — the sea that's literally disappearing" | Oct–Apr (Jun–Sep is 38–42°C, dangerous) | 5–7 (Ein Bokek resort strip, Ein Gedi nature reserve, Masada, Qumran, Mineral Beach, Neve Zohar, Dead Sea spas) | **MEDIUM** — northern shore is in West Bank Area C; mention sites by name, avoid political framing. Climate change angle (sea shrinking) is editorially safe and high-engagement |
| 4 | **Galilee (Lower + Sea of Galilee)** | `galilee` | HIGH — Christian pilgrimage core + nature | "Where Jesus walked on water — and where you'll eat the best fish in Israel" | Mar–May, Sep–Nov (Galilee is greenest after winter rains) | 10–12 (Tiberias, Capernaum, Mt of Beatitudes, Tabgha, Magdala, Nazareth-adjacent, Yardenit, Hammat Tiberias, Arbel, Hula Valley, Jesus Trail) | **LOW–MEDIUM** — Christian-pilgrimage tone is widely accepted; some sites have Jewish/Christian dual significance |
| 5 | **Eilat & Red Sea** | `eilat` | HIGH — Israel's beach/diving capital, separate airport (ETM) | "Year-round summer at the southern tip — coral reefs and the Negev's last stop" | Oct–May ideal; Jun–Sep is 38–42°C but pool/sea moderates it | 5–7 (Coral Beach Reserve, Underwater Observatory, Dolphin Reef, Timna Park, Red Canyon, Yotvata, Eilat Mountains) | **NO** — tourism enclave, very low sensitivity |
| 6 | **Negev Desert** | `negev-desert` | MEDIUM–HIGH — emerging adventure destination | "Mars on Earth — Israel's biggest secret is its biggest landscape" | Oct–Apr (peak Nov–Mar; summer dangerous) | 7–9 (Makhtesh Ramon/Mitzpe Ramon, Sde Boker/Ben-Gurion, Avdat, Mamshit, Shivta, Ein Avdat, Yeruham, Bedouin hospitality experiences) | **LOW** — sensitive only re: Bedouin communities; respectful framing required |
| 7 | **Nazareth & Lower Galilee West** | `nazareth` | MEDIUM — Christian pilgrimage essential but compact | "Jesus' hometown — and the cultural heart of Arab Israel" | Mar–May, Sep–Nov | 4–6 (Basilica of the Annunciation, Mary's Well, Nazareth Village, Mt Precipice, Mt Tabor/Church of Transfiguration, Cana/Kafr Kanna) | **MEDIUM** — Arab-Israeli city; editorial must respect Christian, Muslim, and secular Arab residents |
| 8 | **Haifa & Mt Carmel** | `haifa` | MEDIUM — Bahá'í Gardens + UNESCO site, often day-trip | "Israel's third city — terraced gardens, mixed communities, and the Bahá'í World Centre" | Mar–Jun, Sep–Nov | 5–7 (Bahá'í Gardens, German Colony, Stella Maris, Wadi Nisnas, Druze villages of Daliyat al-Karmel & Isfiya, Ein Hod artists' village, Caves of Carmel) | **LOW** — most ethnically mixed Israeli city, often presented as coexistence model |
| 9 | **Golan Heights** | `golan-heights` | MEDIUM — nature + wineries + Israel's only ski | "Hike volcanic craters, taste world-class wines, ski Mount Hermon — Israel's Wild North" | Apr–Jun (wildflowers), Oct–Nov (wine harvest); Dec–Feb if skiing | 7–9 (Banias waterfall & spring, Mt Hermon, Mt Bental, Nimrod Fortress, Gamla, Golan Heights Winery, Odem Forest, Katzrin, Majdal Shams) | **MEDIUM–HIGH** — internationally disputed territory (UN considers Israeli-occupied Syrian); US recognized Israeli sovereignty in 2019. Use "Golan Heights" without political adjective; mention Druze community respectfully |
| 10 | **Caesarea & Northern Coast** | `caesarea` | MEDIUM — Herodian/Roman archaeology + coastal | "Herod's Roman port — 2,000 years of Mediterranean civilization" | Mar–Jun, Sep–Nov | 4–6 (Caesarea National Park, Caesarea Harbour, Roman Theatre, Aqueduct Beach, Ralli Museum, Zichron Yaakov, Bet She'arim) | **NO** |
| 11 | **Akko (Acre) & Western Galilee** | `akko` | MEDIUM — UNESCO World Heritage Crusader city | "Crusader tunnels under an Ottoman seafront — 4,000 years of port history" | Mar–Jun, Sep–Nov | 4–6 (Old City of Akko, Knights' Halls, Templar Tunnel, Khan al-Umdan, Rosh HaNikra grottos, Achziv Beach, Bahá'í Gardens of Bahjí, Nahariya) | **LOW** — mixed Arab–Jewish city; editorial care for Crusader/Ottoman/British/Israeli layered history |
| 12 | **Masada & Judaean Desert** | `masada` | MEDIUM — almost always bundled with Dead Sea, but high search volume as standalone | "Sunrise on the fortress where Rome won and history remembered" | Oct–Apr (sunrise hikes year-round; midday summer is hazardous) | 3–5 (Masada fortress, Ein Gedi, Wadi David, Wadi Arugot, Sodom Mountain, Lot's Wife pillar) | **LOW** — sensitive re: contested Masada myth/historiography; tour content should stay factual |

**Regions deliberately excluded** (below the volume threshold or politically risky):
- **Bethlehem** — West Bank, requires Palestinian Authority crossing; editorially sensitive. Cover as a sub-destination of Jerusalem only, or as cross-border day-trip with clear "Palestinian Territories" labeling.
- **Hebron** — too politically charged for a tourism affiliate; high reputational risk.
- **Gaza Strip** — currently inaccessible; obvious exclusion.
- **Beersheba** — has tourism (Bedouin market, Negev capital) but easier folded into Negev Desert canonical.
- **Ashkelon / Ashdod** — coastal but mid-tier, low international search volume; possible v2 expansion.

**Total**: 12 regions, all within the mega-prompt's 5–15 constraint.

### Sources (R1)

- [Israel Tourism Report 2025 — Travel And Tour World](https://www.travelandtourworld.com/news/article/israel-tourism-report-2025-1-3m-visitors-high-satisfaction/) — 1.3M visitors 2025, source-market breakdown
- [Israel Tourism Statistics — RoadGenius](https://roadgenius.com/statistics/tourism/israel/) — historical arrivals, top destinations
- [Lonely Planet — Israel & the Palestinian Territories](https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories) — canonical region taxonomy: Jerusalem, Tel Aviv-Jaffa, Haifa & North Coast, Lower Galilee & Sea of Galilee, Upper Galilee & Golan, West Bank, Dead Sea, Negev
- [Tourist Israel — destination index](https://www.touristisrael.com/) — proxy for competitor-coverage depth per region (2000+ guides)
- [Dead Sea ~1M visitors](https://www.touristisrael.com/dead-sea/289/) — order-of-magnitude reference
- [Tel Aviv tourism seasonality — Holidify](https://www.holidify.com/places/tel-aviv/best-time-to-visit.html)
- [Israel best time to visit — Audley Travel](https://www.audleytravel.com/us/israel/best-time-to-visit)
- [Galilee sub-destinations — Laidback Trip / Viator](https://www.laidbacktrip.com/posts/sea-of-galilee-travel-guide), [Viator Galilee](https://www.viator.com/Galilee/d24328)
- [Golan Heights — Tourist Israel](https://www.touristisrael.com/visit-golan-heights/12401/)
- [Caesarea & Akko — Tourist Israel](https://www.touristisrael.com/caesarea-guide/33412/)

---

## 2. Competitor Analysis — Three Tiers

### Tier 1 — Direct Peers (Israel-specific affiliate / editorial sites)

These are the businesses we are directly competing with for the "I'm going to Israel, where do I research?" query.

| # | Site | URL | Monetization | Strengths | Gaps to Exploit |
|---|------|-----|--------------|-----------|-----------------|
| 1 | **Tourist Israel** | [touristisrael.com](https://www.touristisrael.com/) | Affiliate (Civitatis/Viator-style booking widgets) + own tour packages + display | 2000+ guides, deep destination coverage, strong SEO, own tours = high LTV per click | English-only (no Hebrew/RTL); dated UI ~2018 aesthetic; weak Lighthouse mobile scores; affiliate widgets feel bolted-on; no Shabbat-aware content widgets; no a11y statement visible; image quality inconsistent |
| 2 | **iTravelJerusalem** | [itraveljerusalem.com](https://www.itraveljerusalem.com/) | Official tourism portal (Jerusalem Development Authority) + affiliate links + sponsored tours | 5 languages, official Jerusalem brand, Jerusalem-deep content, app | Jerusalem-only (no broader Israel), portal feels institutional (low conversion design), affiliate selection narrow, no transparent FTC disclosure, no IS 5568 compliance evident |
| 3 | **Bein Harim Tours** | [beinharimtours.com](https://www.beinharimtours.com/) | Own-tour operator (not pure affiliate) with editorial blog | Strong own-tour conversion, editorial blog ranks well, professional photography | Not really a comparison — they're an operator, but they DO compete for SEO. Gaps: rigid product structure, no affiliate links to competitor inventory, only English |
| 4 | **Israel Travel Secrets** | [israel-travel-secrets.com](https://israel-travel-secrets.com/) | Affiliate + display | "Local Lisa" voice, personal narrative SEO, decent ranking on long-tail keywords | Single-author site (capacity ceiling), inconsistent design system, no Hebrew, no schema, basic affiliate stack |
| 5 | **My Israel Guide** | [myisraelguide.com](https://myisraelguide.com/) | Mixed (affiliate + tour bookings) | Tripadvisor Travelers Choice 2019–2025; respectable trust signals | Old-school portal design; English-only; weak mobile performance |
| 6 | **inisrael.com** | [inisrael.com](https://www.inisrael.com/) | Affiliate (hotels heavy) + display | Long-established (10+ years), broad coverage | Visibly aging UI; weak content depth; light tour/experience inventory |

**Tier 1 takeaway:** The peer set is English-dominant, mostly built pre-2020, weak on Lighthouse + a11y, and almost none have Hebrew. A modern Next.js 15 site with EN + HE, IS 5568 compliance, and a clean affiliate stack is a defensible competitive position before writing a single page.

### Tier 2 — Benchmark (Established editorial sites with Israel coverage)

These are the "credibility ceiling" — what experienced travelers compare us against on editorial depth.

| # | Site | URL | Monetization | Strengths | Gaps to Exploit |
|---|------|-----|--------------|-----------|-----------------|
| 7 | **Lonely Planet — Israel & the Palestinian Territories** | [lonelyplanet.com/destinations/israel-and-the-palestinian-territories](https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories) | Book sales + affiliate (Booking embed) + sponsored | Authoritative tone, gold-standard region taxonomy, brand trust, broad backlink profile | Limited tour/experience monetization, slow content refresh cycle (post-2020 layoffs hurt update cadence), no IS 5568, no Hebrew, generic affiliate widgets |
| 8 | **Frommer's — Israel** | [frommers.com/destinations/israel](https://www.frommers.com/destinations/israel/) | Display + affiliate (some hotel links) + book | Editorial heritage, "expert local journalists" positioning, suggested-itinerary content depth | Aging UX, low mobile Lighthouse, no Hebrew, weak tour/activity coverage, light schema |
| 9 | **Time Out (Israel coverage)** | [timeout.com/israel](https://www.timeout.com/israel) | Display + affiliate + sponsored + tickets | Editorial voice ("hottest restaurants/bars"), strong on Tel Aviv nightlife, photography | Coverage is patchy outside Tel Aviv/Jerusalem; "list-icle" format limits canonical depth; ads-heavy; no Hebrew |
| 10 | **Rough Guides — Israel** | [roughguides.com](https://www.roughguides.com/articles/budget-travel-tel-aviv-israel/) | Book sales + affiliate | Backpacker/budget angle, decent itinerary content | Site barely updated since Rough Guides pivot; many Israel pages are 5+ years old; low content velocity |
| 11 | **Atlas Obscura — Israel** | [atlasobscura.com/things-to-do/israel](https://www.atlasobscura.com/things-to-do/israel) | Affiliate + own-tours + display + sponsored | 86 Israel entries, "obscure" niche owns long-tail ("weird things to do") queries | Doesn't cover canonical "best of" queries; user-contributed content quality varies; not built for transactional intent |

**Tier 2 takeaway:** These outrank Tier 1 on brand-trust queries but underperform on transactional intent ("best hotels in Jerusalem under $150", "Masada sunrise tour booking"). The editorial-trust + transactional-conversion sweet spot is our opening.

### Tier 3 — North Star (Best-in-class destination affiliate operators globally)

These are who we should aspire to in execution quality.

| # | Site | URL | Monetization | Strengths | What to Learn |
|---|------|-----|--------------|-----------|---------------|
| 12 | **Touropia** | [touropia.com](https://www.touropia.com/) | Display + affiliate + YouTube monetization | ~250K+ monthly visits, "Best places to visit in X" listicle format owns its keyword set, clean photography-heavy templates, well-monetized | Template-driven content scaling (programmatic SEO done right); strong image discipline; YouTube as content multiplier. Caveat: light on transactional integrations (mostly display + light affiliate) |
| 13 | **The Crazy Tourist** | [thecrazytourist.com](https://www.thecrazytourist.com/) | Display + affiliate + sponsored | High-velocity "15 best things to do in [city]" content factory across hundreds of destinations; ranks Page 1 on countless long-tail queries | Programmatic SEO at scale; tight content template; strong internal linking. Caveat: thin per-page depth — we should aim for higher per-page authority |
| 14 | **PlanetWare** | [planetware.com](https://www.planetware.com/) | Affiliate + display | Polished destination guides with affiliate hotel/tour integrations, strong photography, evergreen content | Image-first design; "where to stay" panels with affiliate widgets done elegantly; multi-region itinerary structure |
| 15 | **The Broke Backpacker** | [thebrokebackpacker.com](https://www.thebrokebackpacker.com/) | Affiliate-heavy (hostels, insurance, gear) + sponsored + own products | Personality-driven content + aggressive but tasteful affiliate placement; ~10M monthly visits across categories; very high affiliate coverage per page | Best-in-class affiliate density without feeling spammy; strong post-COVID Israel coverage; convincing photo galleries |
| 16 | **Earth Trekkers** | [earthtrekkers.com](https://www.earthtrekkers.com/) | Affiliate + display + own products | Family-of-four travel niche; immaculate itinerary content; very high mobile Lighthouse scores; gold standard for "X days in Y" itinerary pages | Itinerary template structure is industry-leading for transactional intent |
| 17 | **Nomadic Matt** | [nomadicmatt.com](https://www.nomadicmatt.com/) | Affiliate + own books + courses + sponsored | Personal brand authority; mature affiliate stack with full disclosure | FTC-compliant affiliate disclosure done well; trust-signal patterns to emulate |

**Tier 3 takeaway:** The bar for "good" is well above Tier 1 peers. Earth Trekkers + PlanetWare set the visual/conversion bar; Touropia + The Crazy Tourist set the programmatic-SEO scaling bar; Nomadic Matt + Broke Backpacker set the affiliate-disclosure-while-still-converting bar.

### Sources (R2)

- [15 Best Israel Travel Blogs — Feedspot](https://bloggers.feedspot.com/israel_travel_blogs/) — Tier 1 discovery
- [iTravelJerusalem — official Jerusalem portal](https://www.itraveljerusalem.com/)
- [Touropia About](https://www.touropia.com/about/)
- [TheCrazyTourist competitors — Similarweb](https://www.similarweb.com/website/thecrazytourist.com/competitors/)
- [Lonely Planet Israel](https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories)
- [Frommer's Israel](https://www.frommers.com/destinations/israel/)
- [Atlas Obscura — Israel](https://www.atlasobscura.com/categories/israel)

---

## 3. Table-Stakes Features (Users Will Leave Without These)

Confidence: HIGH (cross-validated against Tier 1 + Tier 3 competitor feature inventories)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Region canonical pages** (hero + 8–12 sections) | Every Tier 2 site has them; this is the unit of organic search ranking | MEDIUM | 1500–2500 words; schema `TouristDestination` + `BreadcrumbList` + `FAQPage`. Pattern from MEGA-PROMPT Phase 2.1 |
| **Sub-destination pages** (per attraction/town) | Long-tail SEO requires per-entity pages; every Tier 1 has them | MEDIUM | 800–1200 words; schema `TouristAttraction` |
| **Hub / index pages** | `/regions/`, homepage, sitemap-style navigation | LOW | Schema `WebSite` + `CollectionPage` |
| **Hotel listings with affiliate booking widgets** | Booking.com integration is universal; users abandon if no booking option | LOW (helper exists) | Pass through `bookingLink()` per the helper contract |
| **Tour/experience listings (Civitatis / GYG / Viator)** | Confirmed all three operate in Israel; affiliate-confirmed in R4 | LOW (helpers) | 8% commission baseline; Civitatis stronger in Spain-speaking markets but operates Israel |
| **Flight search/affiliate (Skyscanner / Kiwi)** | Inbound queries always include "how to get to Israel"; flights are the entry point | LOW | Skyscanner has Israel coverage; widget or deep-link |
| **Car rental affiliate (RentalCars / Discover Cars)** | Israel rewards independent road trips (Negev, Golan); car rental is a high-AOV affiliate | LOW | RentalCars + Discover Cars both have Israel coverage |
| **Travel insurance affiliate (SafetyWing / WorldNomads)** | Israel = perceived-risk destination; insurance has near-100% click rate on relevant pages | LOW | SafetyWing covers Israel; required affiliate per MEGA-PROMPT |
| **Maps integration** (Mapbox or Google Maps) | Every Tier 3 site embeds maps on destination pages; spatial context is non-negotiable | MEDIUM | Mapbox free tier suffices for our volume; Google Maps if simpler |
| **"Best time to visit" content** | Universal user query; ranks well as featured snippet | LOW | Month-by-month tables; widget component already in MEGA-PROMPT 1.3 |
| **FAQ blocks** | Schema `FAQPage` = featured snippets; users skim before booking | LOW | 5–8 Q&A per region canonical |
| **Itinerary content** ("3 days in X", "7 days in Israel") | Highest-intent queries on Israel; Earth Trekkers proves the model | MEDIUM | Schema `ItemList` + `TouristTrip`; minimum 1 itinerary per region |
| **Photo galleries with `srcset`** | Image-first is table stakes in 2026; CLS/LCP score depends on it | LOW (PhotoGallery exists) | 320w / 640w / 1024w / 1600w per MEGA-PROMPT image contract |
| **Accessibility statement page** (Hatzaharat Negishot) | **LEGALLY MANDATORY in Israel under IS 5568 / Equal Rights for Persons with Disabilities Act**; statutory damages up to ₪50,000/violation | LOW | Hebrew + English; named accessibility coordinator; contact method |
| **Affiliate disclosure** (FTC-grade) | US is our #1 source market — FTC enforcement risk if missing; sets trust signal | LOW | Top-of-page disclosure + per-link disclosure near affiliate widgets |
| **About / Contact / Privacy** | Trust signals; required by Google for E-E-A-T ranking | LOW | Standard legal pages; Privacy must be GDPR-compliant (significant EU traffic from France) |
| **Schema markup** (JSON-LD) on every page | Without it, Lonely Planet beats us by default | LOW (lib exists in 1.6) | `TouristDestination`, `TouristAttraction`, `Place`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`, `WebSite` |
| **hreflang for all language variants** | Bilingual minimum (EN + HE) requires correct hreflang or we cannibalize ourselves | LOW | Auto-injected per MEGA-PROMPT 1.8 |
| **OG tags + canonical URL** | Social sharing + Google canonical signal | LOW | Per-page checklist in MEGA-PROMPT |

---

## 4. Differentiating Features (Competitive Advantage)

Confidence: HIGH on which differentiators exist; MEDIUM on which to ship in v1 (depends on R6 language strategy and R4 affiliate confirmation)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Hebrew-first bilingual content (EN + HE, 100% parity)** | None of the Tier 1 peers offer Hebrew; iTravelJerusalem has 5 langs but is Jerusalem-only. Local-traffic upside + Google E-E-A-T boost from native-language depth | HIGH | RTL Tailwind config + Hebrew Tailwind preset already installed; native translation (not LLM) for region canonicals |
| **IS 5568 accessibility compliance** (beyond WCAG 2.1 AA) | Israeli law mandates it; **no Tier 1 competitor visibly complies**. Reduces legal-risk attack surface and earns trust from Israeli + a11y-conscious users | MEDIUM | Hatzaharat Negishot statement, named coordinator, Hebrew error messages, RTL skip-nav. Audit gate ≥95 a11y |
| **Real-time Shabbat closures widget** | Friday-PM-to-Saturday-PM closures are confusing for tourists; no peer ships a live widget. High utility, high shareability | MEDIUM | Server-rendered Friday sundown calculation per location; manual override list per attraction; can be a `<ShabbatStatus>` component |
| **Religious-site naming with sensitivity** | "Temple Mount / Haram al-Sharif" paired naming; respectful Christian/Jewish/Muslim/Druze/Bahá'í coverage; signals editorial integrity | LOW (editorial discipline) | Style guide + naming registry; codify in `hebrew-content-writer` skill prompts |
| **Premium image discipline** (1200px+, credited, srcset) | Tier 1 peers have inconsistent image quality; Earth Trekkers/PlanetWare prove image-first wins on engagement metrics → Lighthouse → ranking | MEDIUM | Photo credits ledger contract per MEGA-PROMPT 1.5 |
| **Lighthouse mobile ≥90 (3-run-median)** | None of the Tier 1 peers hit this; we get a measurable speed advantage that compounds into ranking | HIGH | Lighthouse CI gate per MEGA-PROMPT 1.10 |
| **Itinerary-as-a-feature** ("3 days in Jerusalem", "7 days in Israel", "Negev road trip") | Earth Trekkers' main moat; weakly covered by Tier 1 peers | MEDIUM | `ItineraryCard` component exists; schema `TouristTrip` |
| **Inter-region multi-day trip content** | Israel is small enough that 7-day-itinerary content beats any single region canonical for some queries | MEDIUM | Cross-link 3+ region canonicals into curated trip pages |
| **Programmatic NER monetization** | Lesson from Discover Argentina S11: scan every page for entity mentions and surface affiliate suggestions | MEDIUM | Dictionary + regex per MEGA-PROMPT 1.11; surface in audit dashboard |
| **Quality scoring profiles** (5 perfiles) | Lesson from Argentina: uniform scoring punishes utility/hub pages. Differentiated scoring per page type = better internal QA = more pages shipped | LOW (already specced) | Per MEGA-PROMPT 1.7 |

### Deliberately considered and rejected as differentiators

- **Local fixer / guide marketplace** — too operationally complex for v1; affiliate funnel via Civitatis/Viator already covers tours
- **User-curated itineraries** — see anti-features below (account complexity, content quality risk)
- **Live tour-availability widgets** — depends on partner API depth; defer to v2 if R4 confirms feasibility with GYG/Viator API

---

## 5. Anti-Features (Deliberately NOT Building)

Confidence: HIGH (these are explicitly out-of-scope in PROJECT.md and reinforced by MEGA-PROMPT)

| Anti-Feature | Why Requested | Why Problematic | Alternative |
|--------------|---------------|-----------------|-------------|
| **User accounts / saved trips** | Personalization is on-trend; bookmarking is convenient | Adds GDPR scope, requires auth/email/password stack, no affiliate-revenue justification, increases attack surface | Anonymous local-storage favorites only (no server state); export-to-PDF itinerary if user wants persistence |
| **OAuth / authentication** | "Sign in with Google" is a common ask | Same as above; affiliate funnel doesn't need user state | None — affiliate-only model |
| **Real-time chat / community features** | Live customer service is reassuring | Operational cost (staffing), low conversion lift on affiliate sites, moderation burden | Comprehensive FAQs + linked Tripadvisor forums |
| **Hotel inventory ownership / payment processing** | Higher margins than affiliate | We're an affiliate, not a marketplace; PCI compliance, fraud, customer service obligations, inventory management. The Tourist Israel "own tours" route adds 10x complexity | Affiliate-only via Booking, Civitatis, Viator, GYG |
| **AI-generated travel itineraries** | LLM-powered itinerary builders are trendy in 2026 | Quality risk (hallucinated attractions, dead closures), low E-E-A-T, Google AI-content penalty risk | Human-curated itineraries with explicit author byline; defer LLM-assist to v2 with curation layer |
| **Video content production** | Touropia's YouTube channel works | Storage/bandwidth costs, production overhead, doesn't fit Phase 1 timeline | Embed existing YouTube content (official tourism boards) where useful; defer indefinitely |
| **Editorial blog content** (news, opinion, listicles) | Blogs drive organic | Affiliates carry the funnel; blog content adds writing cost without affiliate density; political/news risks Google Discover deplatforming | Only if SEO R3 detects competitive gap. Default: skip |
| **Political / news content** | High traffic potential | Israel = highest-risk geopolitical content category for Google News distribution penalties; tonal mistake = brand damage | Editorial neutrality on geopolitical situation; tourist editorial only |
| **Mobile native apps** | "There's an app for that" | Doesn't fit affiliate funnel (web → partner site); install friction kills conversion | PWA only if it measurably helps install rate; default: web-first responsive |
| **Real-time hotel availability checking** | Premium booking flow | Requires partner API access (often gated); abandon-rate is brutal when "no availability" shows; affiliate model only requires deep-link | Static affiliate deep-links to partner search pages |
| **User reviews / TripAdvisor-style ratings** | Trust signals | Moderation burden, fake-review attacks, requires accounts | Link to Tripadvisor reviews via affiliate; embed schema `AggregateRating` from third-party where licensed |
| **Currency converter widget** | Convenience | Adds JS bundle, third-party API dependency, minimal conversion lift | Static "ILS ≈ $0.27" copy with last-updated date; link to XE.com |

---

## 6. Feature Dependencies

```
Affiliate helpers (Phase 1.4)
    └──required-by──> Hotel listings / Tour listings / Flights / Car rental / Insurance widgets
                           └──required-by──> Region canonical pages
                                                  └──required-by──> Sub-destination pages

Design system tokens (Phase 1.2)
    └──required-by──> All components → all pages

Photo credits ledger (Phase 1.5)
    └──required-by──> PhotoGallery → Region canonicals (image-heavy)

Schema lib (Phase 1.6)
    └──required-by──> All page types (different schemas per profile)

i18n routing (Phase 1.1)
    └──required-by──> hreflang correctness → EN/HE parity

Lighthouse CI (Phase 1.10)
    └──gates──> Phase 2 Quality Gate (mobile ≥90)

IS 5568 compliance (Hatzaharat Negishot statement)
    └──required-by──> Launch (legal mandate)
    └──depends-on──> Hebrew translation completed
    └──depends-on──> Named accessibility coordinator (operational, not technical)

Shabbat widget (differentiator)
    └──depends-on──> Sundown calculation lib + per-attraction closure registry
    └──enhances──> Region canonical pages (especially Jerusalem)

NER detection (Phase 1.11)
    └──surfaces-opportunities-in──> Audit dashboard → affiliate density improvements
```

### Key dependency rules

- **Affiliate helpers before any page mentioning a partner** — the inviolable constraint from MEGA-PROMPT (lesson from Argentina's 18% → 92% codemod nightmare)
- **Photo credits before any image import** — CI must fail otherwise (lesson from Argentina's PhotoGallery retrofitting)
- **Design tokens before any component build** — ESLint must block raw hex (lesson from Argentina's 6,089 hex retrofit)
- **Hebrew parity before launch** — bolt-on i18n was Argentina pain point #7
- **Sub-destination pages built AFTER canonical pattern stabilizes** — lesson #9 from Argentina

---

## 7. MVP Definition

### Launch With (v1 — Phase 2 Pilot region complete + Phase 3 replication)

**Per pilot region (Phase 2, hard quality gate):**
- [ ] Region canonical (1500–2500w, EN + HE)
- [ ] 5–10 sub-destination pages (EN + HE)
- [ ] 5+ active affiliate widgets per region canonical (Booking, Civitatis OR Viator OR GYG, RentalCars, SafetyWing, Skyscanner)
- [ ] Photo gallery with 4 srcset widths, all credited
- [ ] FAQ block (5–8 Q&A, schema `FAQPage`)
- [ ] "Best time to visit" widget
- [ ] At least 1 itinerary page tied to this region
- [ ] Schema validated (`TouristDestination`, `BreadcrumbList`, `TouristAttraction`, `FAQPage`)
- [ ] Lighthouse mobile (3-run-median) ≥90

**Global v1 (Phase 1 Foundation + Phase 2 Pilot + Phase 5 Legal):**
- [ ] Homepage with regions index (EN + HE)
- [ ] `/regions/` hub
- [ ] About, Contact, Privacy, Affiliate Disclosure (EN + HE)
- [ ] **Accessibility Statement (Hatzaharat Negishot)** — required by IS 5568
- [ ] hreflang correct sitewide
- [ ] Audit dashboard at `/admin/audit/` (basic auth)
- [ ] Lighthouse CI gating deploys

### Add After Validation (v1.x — Phase 3+ replication)

- [ ] Remaining 11 regions replicated from pilot template (audit ≥80, Lighthouse ≥85 per region)
- [ ] Sub-destination long-tail sweep (priority order from R3 keyword research)
- [ ] Shabbat closures widget (differentiator)
- [ ] Cross-region itinerary pages ("7 days in Israel", "Negev + Dead Sea road trip")

### Future Consideration (v2)

- [ ] Russian or French language (post-R6, post-launch traffic analysis)
- [ ] LLM-assisted itinerary builder with human curation layer
- [ ] Programmatic city-pair pages ("Tel Aviv to Jerusalem")
- [ ] Editorial blog (only if R3 detected competitive gap)
- [ ] Newsletter / email capture (only if conversion data justifies)
- [ ] Affiliate API integration (live availability) where partner APIs permit

---

## 8. Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Region canonical pages | HIGH | MEDIUM | **P1** |
| Affiliate helpers + widgets | HIGH | LOW (foundation exists) | **P1** |
| Photo galleries with srcset | HIGH | LOW | **P1** |
| Schema markup | HIGH (SEO) | LOW | **P1** |
| IS 5568 accessibility statement | HIGH (legal) | LOW | **P1** |
| FTC affiliate disclosure | HIGH (legal) | LOW | **P1** |
| hreflang | HIGH (SEO) | LOW | **P1** |
| Hebrew bilingual content | HIGH (differentiator) | HIGH (translation cost) | **P1** |
| Sub-destination pages | HIGH | MEDIUM | **P1** (pilot only); P2 (other regions) |
| Lighthouse mobile ≥90 | MEDIUM (SEO compounding) | HIGH (perf work) | **P1** |
| "Best time to visit" widget | MEDIUM | LOW | **P1** |
| FAQ blocks | MEDIUM | LOW | **P1** |
| Itinerary pages | HIGH (transactional intent) | MEDIUM | **P1** (1 per region); P2 (cross-region) |
| Maps integration | MEDIUM | MEDIUM | **P2** |
| Shabbat closures widget | MEDIUM (differentiator) | MEDIUM | **P2** |
| NER monetization detection | MEDIUM (revenue lift) | MEDIUM | **P2** |
| Cross-region itineraries | HIGH | MEDIUM | **P2** |
| Russian/French content | LOW (post-launch data) | HIGH | **P3** |
| LLM itinerary builder | LOW (risk-heavy) | HIGH | **P3** |
| Newsletter | LOW | LOW | **P3** |

---

## 9. Pilot Region Recommendation

### Methodology

Auto-elect by `volume × opportunity × competitor-weakness`. Volume from competitor coverage depth + Lonely Planet emphasis + Google Trends proxy. Opportunity from affiliate-program density (hotels + tours + activities both available). Competitor weakness from Tier 1 audit (UX age, mobile perf, Hebrew presence, a11y compliance).

### Scoring

| Region | Volume (×0.4) | Opportunity (×0.3) | Competitor Weakness (×0.3) | Composite |
|--------|---------------|---------------------|-----------------------------|-----------|
| **Jerusalem** | 10 (4.0) | 10 (3.0) | 8 (2.4) | **9.4** |
| **Tel Aviv** | 9 (3.6) | 10 (3.0) | 7 (2.1) | **8.7** |
| Dead Sea | 8 (3.2) | 8 (2.4) | 8 (2.4) | 8.0 |
| Galilee | 7 (2.8) | 7 (2.1) | 7 (2.1) | 7.0 |
| Eilat | 6 (2.4) | 9 (2.7) | 6 (1.8) | 6.9 |
| Negev Desert | 5 (2.0) | 6 (1.8) | 9 (2.7) | 6.5 |

### Recommendation: **Jerusalem as primary pilot**

**Why Jerusalem (rationale tied to volume × opportunity × competitor weakness):**

1. **Volume:** #1 international destination in Israel; ~60% of inbound tourists visit. Highest search volume for "things to do in [city] Israel" by a 2x+ margin (per Google Trends qualitative comparison via Tier 1 competitor URL count). Owning Jerusalem = owning the headline organic query.

2. **Opportunity:** Densest affiliate inventory in Israel — most hotels (every chain operates), most tours/experiences (Civitatis, Viator, GYG all have 50+ Jerusalem products each), highest tour AOV (pilgrimage packages, multi-day). Confirmed: all 7 mandatory MEGA-PROMPT affiliates operate.

3. **Competitor weakness:** iTravelJerusalem is the most direct competitor BUT it's English-dominant (5 langs is portal-style not native-quality), institutional in design (low conversion), no IS 5568 visibility, dated UX. Tier 2 (Lonely Planet, Frommer's) is slow to update and weak on transactional widgets. **Critical: no peer offers native Hebrew + IS 5568 + 2026-quality Lighthouse perf.** Our differentiator stack matches Jerusalem's competitive gap perfectly.

4. **Religious-tourism complexity is a feature, not a bug:** Jerusalem is where our "religious site naming with sensitivity" + "Shabbat closures widget" + "premium image discipline" differentiators have the highest payoff. If we can ship Jerusalem to production depth without editorial mistakes, every other region is easier.

5. **Schema richness:** Jerusalem has the densest opportunity for rich schema (`ReligiousBuilding`, `LandmarksOrHistoricalBuildings`, `Place`, `TouristAttraction`) — perfect for testing the schema baseline from Phase 1.6 at maximum complexity.

### Secondary candidate: **Tel Aviv (fallback / second pilot)**

If Jerusalem editorial sensitivity creates Phase 2 schedule risk, **Tel Aviv** is the strong fallback:

- Nearly identical volume score
- Lower religious/political sensitivity — easier editorial
- Strongest beach/nightlife/food affiliate density (high AOV for hotel bookings, lower for tours but high for restaurants if we add OpenTable later)
- UNESCO White City angle gives schema richness
- **Lower differentiation lift** — Tier 1 peers cover Tel Aviv reasonably well already; less competitive gap

### Recommended approach: Pilot Jerusalem, schedule-aware fallback

Phase 2 should be scoped to Jerusalem. If at the Phase 2 mid-checkpoint the editorial complexity (Temple Mount/Haram al-Sharif sensitivity, photo-license complexity for Old City sites, Hebrew translation depth) is creating schedule risk for the Quality Gate, switch the pilot to Tel Aviv. This is a one-way door though — once you commit to Jerusalem and break the Quality Gate, recovering to Tel Aviv is expensive. Recommend a hard checkpoint at Phase 2.2 (EN canonical complete) to assess.

### Note for R3 (SEO research)

R3 will produce keyword-volume-backed validation of this recommendation. If R3's `volume × difficulty` data contradicts this composite scoring (e.g., Jerusalem keyword difficulty is so high that we'd rank only on page 3 for 12 months while Negev keywords are achievable), reconsider. But on current evidence Jerusalem is the highest-leverage pilot.

---

## 10. Competitor Feature Analysis (Selected Pairs)

| Feature | Tourist Israel (Tier 1) | Lonely Planet (Tier 2) | Earth Trekkers (Tier 3) | Our Approach |
|---------|--------------------------|--------------------------|-----------------------|--------------|
| **Hebrew content** | None | None | None | **EN + HE, 100% parity, RTL fully supported** |
| **IS 5568 compliance** | Not visible | Not visible | N/A (not Israel-focused) | **Hatzaharat Negishot + named coordinator from day 1** |
| **Affiliate density per page** | ~3–5 (Civitatis, own tours, light Booking) | ~2 (Booking embed) | ~5–8 (very high) | **Target ≥5 active affiliates per region canonical** |
| **Lighthouse mobile** | ~55–70 (estimated, dated build) | ~70–80 | 85–95 | **≥90 (3-run-median), hard gate** |
| **Photo quality** | Inconsistent; some sub-1200px | Decent | Excellent | **All ≥1200px, srcset, credited (CI-enforced)** |
| **Schema markup depth** | Minimal | Basic Article schema | Rich | **TouristDestination + TouristAttraction + FAQ + Breadcrumb + Place validated** |
| **Itinerary content** | Yes (own-tour pages bias) | Yes (suggested itineraries section) | **Best-in-class** | **`ItineraryCard` template, one per region minimum** |
| **Shabbat awareness in content** | Yes (text) | Yes (text) | N/A | **Live `<ShabbatStatus>` widget on region pages** |
| **Religious-site dual naming** | Inconsistent | Yes (LP house style) | N/A | **Style guide: paired naming where applicable** |
| **FTC disclosure** | Buried | Yes | Yes (top + per-link) | **Top + per-affiliate-link, EN + HE** |

---

## Sources (consolidated)

### Tourism volume & regions (R1)
- [Israel Tourism Report 2025 — Travel And Tour World](https://www.travelandtourworld.com/news/article/israel-tourism-report-2025-1-3m-visitors-high-satisfaction/)
- [Israel Tourism Statistics — RoadGenius](https://roadgenius.com/statistics/tourism/israel/)
- [1.3M tourists visited Israel in 2025 — JNS](https://www.jns.org/1-3-million-tourists-visited-israel-in-2025/)
- [Lonely Planet — Israel & Palestinian Territories](https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories)
- [Tourist Israel — destination index](https://www.touristisrael.com/) (used as competitor-depth proxy)
- [Dead Sea — Tourist Israel](https://www.touristisrael.com/dead-sea/289/)
- [Eilat — Tourist Israel](https://www.touristisrael.com/eilat/303/)
- [Galilee guide — Laidback Trip](https://www.laidbacktrip.com/posts/sea-of-galilee-travel-guide)
- [Galilee attractions — EL AL](https://www.elal.com/magazine/en/portfolio-items/travel/galilee/galilee-attractions/)
- [Golan Heights guide — Tourist Israel](https://www.touristisrael.com/visit-golan-heights/12401/)
- [Golan Heights — Time Out](https://www.timeout.com/israel/attractions/the-best-attractions-in-the-golan-heights)
- [Caesarea — Tourist Israel](https://www.touristisrael.com/caesarea-guide/33412/)
- [Best time to visit Israel — Audley Travel](https://www.audleytravel.com/us/israel/best-time-to-visit)
- [Best time to visit Tel Aviv — Holidify](https://www.holidify.com/places/tel-aviv/best-time-to-visit.html)

### Competitors (R2)
- [Tourist Israel](https://www.touristisrael.com/)
- [iTravelJerusalem](https://www.itraveljerusalem.com/)
- [Bein Harim Tours](https://www.beinharimtours.com/)
- [Israel Travel Secrets](https://israel-travel-secrets.com/)
- [My Israel Guide](https://myisraelguide.com/)
- [inisrael.com](https://www.inisrael.com/)
- [Lonely Planet](https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories)
- [Frommer's](https://www.frommers.com/destinations/israel/)
- [Time Out Israel](https://www.timeout.com/israel)
- [Rough Guides Israel](https://www.roughguides.com/articles/budget-travel-tel-aviv-israel/)
- [Atlas Obscura Israel](https://www.atlasobscura.com/categories/israel)
- [Touropia](https://www.touropia.com/)
- [The Crazy Tourist](https://www.thecrazytourist.com/)
- [PlanetWare](https://www.planetware.com/)
- [Earth Trekkers](https://www.earthtrekkers.com/)
- [Nomadic Matt](https://www.nomadicmatt.com/)
- [The Broke Backpacker](https://www.thebrokebackpacker.com/)
- [15 Best Israel Travel Blogs — Feedspot](https://bloggers.feedspot.com/israel_travel_blogs/)
- [TheCrazyTourist competitors — Similarweb](https://www.similarweb.com/website/thecrazytourist.com/competitors/)

### Affiliate & legal landscape
- [Civitatis affiliate program review](https://articlesbase.com/business/marketing-and-advertising/affiliate-marketing/civitatis-affiliate-program-review-earnings-benefits-and-risks/) (8% baseline, 30-day cookie)
- [Viator vs GetYourGuide — Trekksoft](https://www.trekksoft.com/en/blog/viator-vs-get-your-guide)
- [Civitatis Israel listings](https://www.civitatis.com/en/israel/)
- [FTC Affiliate Disclosure Guide — Termly](https://termly.io/resources/articles/ftc-affiliate-disclosure/)
- [Shabbat travel guide — Tourist Israel (Jerusalem)](https://www.touristisrael.com/shabbat-in-jerusalem/11023/)
- [Shabbat in Israel guide — P.S. I'm On My Way](https://www.psimonmyway.com/shabbat-in-israel-travel/)

### Source notes / confidence flags

- **HIGH confidence:** Region taxonomy (Lonely Planet + Frommer's + Tourist Israel cross-validate); affiliate program rates (Civitatis 8%, Viator 8%, GYG 8% confirmed); FTC disclosure requirements (official guidance); Shabbat closures pattern (multiple competitor + official sources)
- **MEDIUM confidence:** Tier 1 competitor monetization specifics (inferred from visible affiliate widgets, not internal data); per-region tourism volume (Israel CBS doesn't publish per-site arrival counts, so used competitor-coverage-depth + LP chapter weight as proxy); Lighthouse mobile scores cited for competitors (estimated; would need PSI run to verify)
- **LOW confidence:** Specific Touropia / Crazy Tourist monthly traffic numbers (cited from Similarweb estimates, which themselves are estimates)

---

*Feature research for: Israel tourism affiliate website*
*Researched: 2026-05-11*
*Next research consumed by: REQUIREMENTS.md (table stakes → v1), ROADMAP.md (region phases derived from R1 ranking), Phase 2 scoping (pilot = Jerusalem, fallback Tel Aviv)*
