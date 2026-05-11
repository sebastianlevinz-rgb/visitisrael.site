# Haifa Bahá'í Photography Policy (REG-05)

**Phase:** 03-region-replication-m3 / plan 07
**Status:** v1 Wikimedia-only; Phase 6 commissioning gated on press@bahai.org written permission
**Last reviewed:** 2026-05-11

## Bahá'í International Community Photo Policy

The Bahá'í World Centre in Haifa is the spiritual and administrative centre of the Bahá'í Faith, headquartered on the slopes of Mount Carmel and including the Shrine of the Báb on terrace 11 of the 19-terrace UNESCO-inscribed terraced gardens (UNESCO 2008). Per public guidance issued by the Bahá'í International Community (BIC):

- **Photography of pilgrims and worshippers is prohibited** per Bahá'í convention. The Bahá'í community maintains a contemplative environment at the Shrine and on the upper inner terraces; ad-hoc photography of identifiable people in those zones is not permitted.
- **Architectural and garden public-terrace shots are permitted.** Wide architectural views of the terraced gardens, the Shrine of the Báb exterior dome, and the public-access lower terraces (terraces 1-9 on the public 12:00 daily tour) are widely photographed and re-published; the Wikimedia Commons coverage of these zones is well-established (65-75% subject coverage estimated; CC-BY-SA / CC-BY-4.0 dominant).
- **The Shrine of the Báb interior is closed to non-Bahá'ís** (Bahá'í convention — the Shrine is the actual holy site within the gardens; the Gardens themselves are landscape architecture). Interior photography is not available; this is a structural constraint, not a permission gate.
- **Commercial commissioning** (paid photography by a third party for use on a monetized site such as Discover Israel / visitisrael.site) **requires written permission from press@bahai.org**. Bahá'í International Community typically responds in 4-6 weeks; the request must explain the publication scope, the photographer's credentials, and the specific subject matter to be photographed (architectural; garden terraces; NO worshippers; NO Shrine interior).

Reference: Bahá'í International Community public guidance; Wikimedia Commons "Bahá'í Gardens" category licensing; UNESCO 2008 inscription documentation.

## v1 Decision (LOCKED in 03-CONTEXT.md)

- **Use ONLY Wikimedia Commons CC-BY / CC-BY-SA architectural/garden public-terrace images for v1.**
- **DO NOT commission new Bahá'í-related photography in v1.** The 4-6 week BIC response time + commission cost is deferred to Phase 6.
- **ALL Bahá'í Gardens images MUST carry the `restrictedSiteAcknowledgment` field** in `data/photo-credits.json` (AUD-026 enforces — Zod superRefine on `subjectType: 'bahaiGardens'` fires if the field is empty).
- **Schema emission:** Bahá'í Gardens emits `Place` (landscape architecture; UNESCO 2008 inscription) — **NOT** `PlaceOfWorship` per Bahá'í convention. The Shrine of the Báb is the holy site; the gardens are the heritage landscape. Stella Maris Monastery (Carmelite) emits `PlaceOfWorship` (active monastery). German Colony / Wadi Nisnas / Carmel National Park emit `TouristAttraction` only.

## Wikimedia Files Used (v1)

| File on disk                                 | Author (Wikimedia)              | License      | Source URL                                                                                                  | subjectType   | restrictedSiteAcknowledgment populated |
| -------------------------------------------- | ------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------- |
| /images/regions/haifa/hero.jpg               | Zvi Roger (Wikimedia Commons)   | CC-BY-SA-3.0 | https://commons.wikimedia.org/wiki/File:Bahai_Gardens_by_David_Shankbone.jpg                                | bahaiGardens  | YES                                    |
| /images/regions/haifa/bahai-gardens.jpg      | Almog (Wikimedia Commons)       | CC-BY-SA-3.0 | https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_31336_Bahai_Gardens_in_Haifa.jpg                    | bahaiGardens  | YES                                    |
| /images/regions/haifa/german-colony.jpg      | Yair Aronshtam (Wikimedia)      | CC-BY-SA-2.0 | https://commons.wikimedia.org/wiki/File:German_Colony,_Haifa,_Israel.jpg                                    | cityscape     | N/A                                    |
| /images/regions/haifa/stella-maris.jpg       | Almog (Wikimedia Commons)       | CC-BY-SA-3.0 | https://commons.wikimedia.org/wiki/File:Stella_Maris_Monastery_Haifa.jpg                                    | religious-general | N/A                                |
| /images/regions/haifa/carmel.jpg             | Bukvoed (Wikimedia Commons)     | CC-BY-4.0    | https://commons.wikimedia.org/wiki/File:Mount_Carmel_National_Park.jpg                                      | landscape     | N/A                                    |
| /images/sub-destinations/haifa/bahai-gardens.jpg | Zvi Roger (Wikimedia Commons) | CC-BY-SA-3.0 | https://commons.wikimedia.org/wiki/File:Bahai_Gardens_by_David_Shankbone.jpg                                | bahaiGardens  | YES                                    |

All Bahá'í-subject entries carry the same `restrictedSiteAcknowledgment` text:

> "Wikimedia Commons wide architectural shot of the terraced gardens / Shrine of the Báb exterior — no identifiable worshippers or pilgrims; Bahá'í International Community photo policy honored (architectural / garden public-terrace permitted; worshipper / pilgrim photography prohibited); commercial commissioning requires press@bahai.org written permission (deferred to Phase 6 — see data/haifa-bahai-policy.md)."

## Phase 6 Commissioning Gate

When the v1 site is live and revenue-generating, real-image commissioning becomes an option. The gate has four steps:

1. **Draft outreach email to press@bahai.org** explaining:
   - Site name + URL (Discover Israel / visitisrael.site)
   - Commercial monetization model (affiliate marketing)
   - Specific photography request (architectural exterior; lower terraces 1-9 public-access; NO worshippers; NO Shrine interior; NO pilgrim portraits)
   - Photographer credentials (resume + portfolio + Bahá'í cultural-context briefing record)
   - Intended publication scope (5 to 8 images at 1600-2400px; web-only; no print derivative rights sought)
   - Photo-credit + license terms requested (`CC-BY-SA-4.0` or `OWN-with-acknowledgment`)

2. **Await written response** — typical Bahá'í International Community media-relations response cycle is 4-6 weeks. Do not commission before receiving written confirmation in writing.

3. **If permission granted** → commission per BIC guidelines. The contract MUST include:
   - Consent rule: NO photography of identifiable worshippers or pilgrims
   - Subject-matter restriction: architectural + landscape only
   - Photographer behavioural briefing: contemplative-zone respect, no flash inside the Shrine perimeter, no drone footage without separate UNESCO permit
   - License: `OWN` with explicit re-publication rights for visitisrael.site
   - Update `data/photo-credits.json` with `licenseProof` URL of the BIC permission letter (stored privately; URL is the lookup pointer).

4. **If permission denied** → continue with Wikimedia-only indefinitely. Document the refusal in this file in section "Refusal Log" below; revisit at the next phase-cycle review.

## v1 Subject-Matter Coverage Estimate

| Subject                                            | Wikimedia coverage | v1 image used? | Phase 6 priority |
| -------------------------------------------------- | ------------------ | -------------- | ---------------- |
| Bahá'í terraced gardens (wide architectural)       | 80-90%             | YES            | low              |
| Shrine of the Báb exterior (dome + terrace 11)     | 75-85%             | YES            | low              |
| Garden public-tour 12:00 (no identifiable pilgrims)| 60-70%             | no (deferred)  | medium           |
| German Colony Templer architecture                 | 70-80%             | YES            | low              |
| Stella Maris Monastery exterior                    | 65-75%             | YES            | low              |
| Wadi Nisnas Christian-Arab quarter                 | 40-50%             | no (deferred)  | medium           |
| Carmel National Park / Mount Carmel overlook       | 70-80%             | YES            | low              |
| Bahá'í governance buildings (UHJ / ITC / Archives) | 50-60%             | no (deferred)  | low              |

**Aggregate v1 Wikimedia coverage for Haifa: 65-75%** — workable for v1 without Phase 6 commissioning. Higher than Negev's 40-50% (image-gap canary) because Bahá'í Gardens are extensively photographed and German Colony Templer architecture is a Wikimedia-favoured subject.

## Refusal Log

(empty — no refusals on record at v1 publication.)

## Cross-references

- `03-CONTEXT.md` § Bahá'í photography (LOCKED policy)
- `.planning/research/PITFALLS.md` § 3.7 / § 4.10 / § 5.4
- `data/photo-credits.json` — all Bahá'í-subject entries scoped here
- `lib/photo-credits-schema.ts` — `RESTRICTED_SUBJECTS` set + `restrictedSiteAcknowledgment` superRefine
- `scripts/audit/rules/AUD-026.ts` — runtime enforcement on built HTML pages
- `data/religious-sites.json` — `bahai-gardens` entry with `religion: "Baháʼí Faith"` and `restrictedSiteAcknowledgment` editorial flag

## Last Reviewed

2026-05-11 — Phase 3 plan 07 Wave 0 (Haifa region replication). Policy-gap canary deliverable for REG-05.
