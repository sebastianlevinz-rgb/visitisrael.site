# Manual SERP Review Checklist — Phase 2.6 Compensating Control

**Why this exists:** Phase 2 used proxied R3 keyword data (PITFALLS §4.1
verbatim H-tag scaffolding) instead of an Ahrefs/DataForSEO purchase. This
checklist captures top-10 SERP entity-coverage validation for top-5 EN +
top-3 HE Jerusalem keywords. It is the compensating-control deliverable
referenced by Phase 02 CONTEXT.md (R3 keyword data strategy — LOCKED:
PROXIED).

**How to fill (manual, human-driven):** for each keyword below, open
[google.com](https://google.com) in an incognito window (language=en for
EN keywords, language=he for HE keywords), inspect the top 10 organic
results, list each result's title + URL, then complete the
entity-coverage table per keyword.

**Verdict rules:**

- **PASS:** ≥7/10 of the top-10 main entities/topics are covered in our
  H-tag structure (H1/H2/H3) on `/jerusalem/` (HE) or `/en/jerusalem/`
  (EN) — or in linked sub-destinations / itinerary.
- **REWORK:** <7/10 — cycle back to plan 02-01/02/03 with the specific
  missing entity, add it to an appropriate H-tag, re-run the SERP
  review for that keyword, update verdict to PASS.

**Compensating-control sequence:**

1. Fill this template into `data/serp-review.md` (the filled instance —
   this file is the template that remains pristine for re-use).
2. Address any REWORK verdicts before running `pnpm qa:quality-gate`.
3. Quality Gate criterion 10 references `data/manual-serp-review-checklist.md`
   existence; the substantive review lives in `data/serp-review.md`.

**Trigger for retroactive Ahrefs buy:** if Phase 6 monitoring shows
Jerusalem rankings underperform (>position 30 at 90 days post-launch for
the primary keyword "things to do in Jerusalem"), THEN buy DataForSEO
($50) and re-tune.

---

## Keyword 1: `things to do in jerusalem` (EN primary canonical)

**Inspected:** YYYY-MM-DD
**Search settings:** google.com, incognito, language=en, location-neutral
**Our page:** `/en/jerusalem/`

**Top 10 Google results:**

1. [title] — [url]
2. [title] — [url]
3. [title] — [url]
4. [title] — [url]
5. [title] — [url]
6. [title] — [url]
7. [title] — [url]
8. [title] — [url]
9. [title] — [url]
10. [title] — [url]

**Our entity coverage (anchor entities from the top-10):**

| Entity from SERP top-10                   | In our H-tag structure? | Section / Page |
| ----------------------------------------- | ----------------------- | -------------- |
| Western Wall                              | ☐                       |                |
| Old City Quarters                         | ☐                       |                |
| Church of the Holy Sepulchre              | ☐                       |                |
| Mahane Yehuda Market                      | ☐                       |                |
| Yad Vashem                                | ☐                       |                |
| Mount of Olives                           | ☐                       |                |
| City of David                             | ☐                       |                |
| Day trips (Dead Sea / Bethlehem / Masada) | ☐                       |                |
| Tower of David / Citadel                  | ☐                       |                |
| Garden Tomb                               | ☐                       |                |

**Coverage count:** \_/10
**Verdict:** PASS | REWORK
**REWORK note (if any):**

---

## Keyword 2: `jerusalem itinerary` (EN secondary)

**Inspected:** YYYY-MM-DD
**Search settings:** google.com, incognito, language=en, location-neutral
**Our page:** `/en/itineraries/3-days-in-jerusalem/` + `/en/jerusalem/`

**Top 10 Google results:**

1. [title] — [url]
2. [title] — [url]
3. [title] — [url]
4. [title] — [url]
5. [title] — [url]
6. [title] — [url]
7. [title] — [url]
8. [title] — [url]
9. [title] — [url]
10. [title] — [url]

**Our entity coverage:**

| Entity from SERP top-10         | In our H-tag structure? | Section / Page |
| ------------------------------- | ----------------------- | -------------- |
| 1-day itinerary                 | ☐                       |                |
| 2-day itinerary                 | ☐                       |                |
| 3-day itinerary                 | ☐                       |                |
| 4+ day extended itinerary       | ☐                       |                |
| Old City walking tour           | ☐                       |                |
| Where to stay (neighbourhoods)  | ☐                       |                |
| Tours (guided / private / free) | ☐                       |                |
| Day trip suggestions            | ☐                       |                |
| Best time to visit              | ☐                       |                |
| Getting there / from airport    | ☐                       |                |

**Coverage count:** \_/10
**Verdict:** PASS | REWORK
**REWORK note (if any):**

---

## Keyword 3: `jerusalem hotels` (EN secondary)

**Inspected:** YYYY-MM-DD
**Search settings:** google.com, incognito, language=en, location-neutral
**Our page:** `/en/jerusalem/` (Where to Stay section)

**Top 10 Google results:**

1. [title] — [url]
2. [title] — [url]
3. [title] — [url]
4. [title] — [url]
5. [title] — [url]
6. [title] — [url]
7. [title] — [url]
8. [title] — [url]
9. [title] — [url]
10. [title] — [url]

**Our entity coverage:**

| Entity from SERP top-10                       | In our H-tag structure? | Section / Page |
| --------------------------------------------- | ----------------------- | -------------- |
| Old City hotels                               | ☐                       |                |
| Mamilla / city-centre hotels                  | ☐                       |                |
| Budget hostels                                | ☐                       |                |
| Mid-range hotels                              | ☐                       |                |
| Luxury hotels (King David, Waldorf, etc.)     | ☐                       |                |
| Boutique hotels                               | ☐                       |                |
| Best neighbourhoods                           | ☐                       |                |
| Booking platforms (Booking.com / Hostelworld) | ☐                       |                |
| Family-friendly options                       | ☐                       |                |
| Kosher-certified hotels                       | ☐                       |                |

**Coverage count:** \_/10
**Verdict:** PASS | REWORK
**REWORK note (if any):**

---

## Keyword 4: `jerusalem tours` (EN secondary)

**Inspected:** YYYY-MM-DD
**Search settings:** google.com, incognito, language=en, location-neutral
**Our page:** `/en/jerusalem/` (Tours section) + sub-dest pages

**Top 10 Google results:**

1. [title] — [url]
2. [title] — [url]
3. [title] — [url]
4. [title] — [url]
5. [title] — [url]
6. [title] — [url]
7. [title] — [url]
8. [title] — [url]
9. [title] — [url]
10. [title] — [url]

**Our entity coverage:**

| Entity from SERP top-10                            | In our H-tag structure? | Section / Page |
| -------------------------------------------------- | ----------------------- | -------------- |
| Old City walking tour                              | ☐                       |                |
| Free walking tour                                  | ☐                       |                |
| Underground tunnels / Western Wall tunnels         | ☐                       |                |
| City of David tour                                 | ☐                       |                |
| Yad Vashem guided tour                             | ☐                       |                |
| Mahane Yehuda food tour                            | ☐                       |                |
| Half-day vs full-day                               | ☐                       |                |
| Private guide options                              | ☐                       |                |
| Day trips from Jerusalem                           | ☐                       |                |
| Tour operators (Civitatis / GetYourGuide / Viator) | ☐                       |                |

**Coverage count:** \_/10
**Verdict:** PASS | REWORK
**REWORK note (if any):**

---

## Keyword 5: `best time to visit jerusalem` (EN secondary)

**Inspected:** YYYY-MM-DD
**Search settings:** google.com, incognito, language=en, location-neutral
**Our page:** `/en/jerusalem/` (Best Time to Visit section)

**Top 10 Google results:**

1. [title] — [url]
2. [title] — [url]
3. [title] — [url]
4. [title] — [url]
5. [title] — [url]
6. [title] — [url]
7. [title] — [url]
8. [title] — [url]
9. [title] — [url]
10. [title] — [url]

**Our entity coverage:**

| Entity from SERP top-10                          | In our H-tag structure? | Section / Page |
| ------------------------------------------------ | ----------------------- | -------------- |
| Spring (Mar–May)                                 | ☐                       |                |
| Summer (Jun–Aug, heat)                           | ☐                       |                |
| Autumn (Sep–Nov)                                 | ☐                       |                |
| Winter (Dec–Feb, rain)                           | ☐                       |                |
| Jewish holidays (Passover / Sukkot / Yom Kippur) | ☐                       |                |
| Christmas / Easter                               | ☐                       |                |
| Ramadan                                          | ☐                       |                |
| Shabbat (Fri PM – Sat PM closures)               | ☐                       |                |
| Weather averages                                 | ☐                       |                |
| Crowds (peak vs shoulder)                        | ☐                       |                |

**Coverage count:** \_/10
**Verdict:** PASS | REWORK
**REWORK note (if any):**

---

## Keyword 6: `מה לעשות בירושלים` (HE primary)

**Inspected:** YYYY-MM-DD
**Search settings:** google.co.il, incognito, language=he
**Our page:** `/jerusalem/`

**Top 10 Google results:**

1. [title] — [url]
2. [title] — [url]
3. [title] — [url]
4. [title] — [url]
5. [title] — [url]
6. [title] — [url]
7. [title] — [url]
8. [title] — [url]
9. [title] — [url]
10. [title] — [url]

**Our entity coverage:**

| Entity from SERP top-10       | In our H-tag structure? | Section / Page |
| ----------------------------- | ----------------------- | -------------- |
| הכותל המערבי                  | ☐                       |                |
| העיר העתיקה                   | ☐                       |                |
| כנסיית הקבר                   | ☐                       |                |
| שוק מחנה יהודה                | ☐                       |                |
| יד ושם                        | ☐                       |                |
| הר הזיתים                     | ☐                       |                |
| עיר דוד                       | ☐                       |                |
| טיולים יומיים (ים המלח, מצדה) | ☐                       |                |
| מגדל דוד                      | ☐                       |                |
| מסעדות / אוכל ירושלמי         | ☐                       |                |

**Coverage count:** \_/10
**Verdict:** PASS | REWORK
**REWORK note (if any):**

---

## Keyword 7: `טיולים בירושלים` (HE secondary)

**Inspected:** YYYY-MM-DD
**Search settings:** google.co.il, incognito, language=he
**Our page:** `/jerusalem/` (tours section) + `/itineraries/3-days-in-jerusalem/`

**Top 10 Google results:**

1. [title] — [url]
2. [title] — [url]
3. [title] — [url]
4. [title] — [url]
5. [title] — [url]
6. [title] — [url]
7. [title] — [url]
8. [title] — [url]
9. [title] — [url]
10. [title] — [url]

**Our entity coverage:**

| Entity from SERP top-10 | In our H-tag structure? | Section / Page |
| ----------------------- | ----------------------- | -------------- |
| סיורי מורי דרך מוסמכים  | ☐                       |                |
| סיורי רגל בעיר העתיקה   | ☐                       |                |
| סיורי לילה              | ☐                       |                |
| סיורי אוכל              | ☐                       |                |
| סיורי שורש (משפחות)     | ☐                       |                |
| טיולי יום מירושלים      | ☐                       |                |
| מנהרות הכותל            | ☐                       |                |
| סיור בעיר דוד           | ☐                       |                |
| סיור ביד ושם            | ☐                       |                |
| מסלולים בני 1-3 ימים    | ☐                       |                |

**Coverage count:** \_/10
**Verdict:** PASS | REWORK
**REWORK note (if any):**

---

## Keyword 8: `העיר העתיקה ירושלים` (HE secondary)

**Inspected:** YYYY-MM-DD
**Search settings:** google.co.il, incognito, language=he
**Our page:** `/jerusalem/` (sections on Old City Quarters) + 5
sub-destination pages within the Old City

**Top 10 Google results:**

1. [title] — [url]
2. [title] — [url]
3. [title] — [url]
4. [title] — [url]
5. [title] — [url]
6. [title] — [url]
7. [title] — [url]
8. [title] — [url]
9. [title] — [url]
10. [title] — [url]

**Our entity coverage:**

| Entity from SERP top-10            | In our H-tag structure? | Section / Page |
| ---------------------------------- | ----------------------- | -------------- |
| הרובע היהודי                       | ☐                       |                |
| הרובע המוסלמי                      | ☐                       |                |
| הרובע הנוצרי                       | ☐                       |                |
| הרובע הארמני                       | ☐                       |                |
| הכותל המערבי                       | ☐                       |                |
| כנסיית הקבר                        | ☐                       |                |
| הר הבית / חרם א-שריף               | ☐                       |                |
| ויה דולורוזה                       | ☐                       |                |
| שערי העיר העתיקה (יפו, דמשק, ציון) | ☐                       |                |
| שוק העיר העתיקה (קרדו)             | ☐                       |                |

**Coverage count:** \_/10
**Verdict:** PASS | REWORK
**REWORK note (if any):**

---

## Compensating-Control Summary

| #   | Keyword                      | Lang | Status   |
| --- | ---------------------------- | ---- | -------- |
| 1   | things to do in jerusalem    | EN   | template |
| 2   | jerusalem itinerary          | EN   | template |
| 3   | jerusalem hotels             | EN   | template |
| 4   | jerusalem tours              | EN   | template |
| 5   | best time to visit jerusalem | EN   | template |
| 6   | מה לעשות בירושלים            | HE   | template |
| 7   | טיולים בירושלים              | HE   | template |
| 8   | העיר העתיקה ירושלים          | HE   | template |

When all 8 verdicts are PASS (or all REWORK paths resolved + re-verified
PASS), the compensating control is satisfied and `pnpm qa:quality-gate`
may run. The Quality Gate generator does NOT block on this checklist's
verdict values — it merely confirms the checklist FILE exists; the
substantive review is human-driven and out of scope for automated
gating.

**Trigger for retroactive Ahrefs buy:** if Phase 6 monitoring shows
Jerusalem rankings underperform (>position 30 at 90 days post-launch for
the primary keyword), THEN buy DataForSEO ($50) and re-tune.
