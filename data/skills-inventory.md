# Skills Inventory — Visit Israel Project

> Generated 2026-05-11 via `find-skills` (vercel-labs/skills). Re-run before scaffolding to catch newer releases.

## Top finds (install in this order)

### Tier 1 — Install before Fase 1 starts

| Skill                                                      | Installs  | Why critical                                                                                                                                                      |
| ---------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `skills-il/localization@hebrew-rtl-best-practices`         | 81        | RTL strategy for Hebrew. Must inform tailwind config and component primitives BEFORE component library is written (Fase 1.3).                                     |
| `skills-il/localization@hebrew-tailwind-preset`            | 23        | Tailwind preset for RTL/Hebrew. Drops into Fase 1.1 tech stack scaffold.                                                                                          |
| `skills-il/localization@israeli-accessibility-compliance`  | 26        | IL has stricter a11y law (Equal Rights Law 5758 + Standard 5568). Lighthouse a11y ≥95 may not be enough for Israeli market — this skill encodes local compliance. |
| `addyosmani/web-quality-skills@accessibility`              | **21.5K** | Addy Osmani (Google Chrome team). Gold standard. Use as cross-check against `israeli-accessibility-compliance`.                                                   |
| `wshobson/agents@tailwind-design-system`                   | **40.4K** | Top design-system skill. Use to formalize tokens in Fase 1.2 (root cause of S11 hex-debt issue).                                                                  |
| `vercel/nextjs-skills@next-best-practices`                 | 627       | **Official Vercel.** Trumps everything else for Next.js 15 patterns. Use in Fase 1.1.                                                                             |
| `sickn33/antigravity-awesome-skills@nextjs-best-practices` | 5.1K      | Community-validated complement.                                                                                                                                   |

### Tier 2 — Install before Fase 2 (region piloto)

| Skill                                                                           | Installs | Use in                                                            |
| ------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `kostja94/marketing-skills@affiliate-marketing`                                 | 681      | Fase 1.4 affiliate infra strategy + Fase 2 copy.                  |
| `kostja94/marketing-skills@affiliate-page-generator`                            | 621      | Fase 2.1 region canonical template.                               |
| `kostja94/marketing-skills@copywriting`                                         | 1K       | Fase 2 region copy.                                               |
| `skills-il/localization@hebrew-content-writer`                                  | 29       | Fase 2.1 Hebrew canonical (if R6 confirms HE > local-equivalent). |
| `jeremylongshore/claude-code-plugins-plus-skills@performance-lighthouse-runner` | 383      | Fase 1.10 Lighthouse CI gate + Fase 2.6 QA.                       |
| `aj-geddes/useful-ai-prompts@image-optimization`                                | 418      | Fase 1.5 photo credits + PhotoGallery srcset.                     |
| `secondsky/claude-skills@image-optimization`                                    | 220      | Complement above.                                                 |
| `oakoss/agent-skills@responsive-images`                                         | 39       | Specific to srcset patterns.                                      |

### Tier 3 — Israel niche (install opportunistically)

| Skill                                                  | Installs | When useful                                                                                         |
| ------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------- |
| `hoodini/ai-agents-skills@shabbat-times`               | 82       | "Best time to visit" sections, opening hours of Jewish quarter sites. Could power a runtime widget. |
| `skills-il/localization@shabbat-aware-scheduler`       | 19       | Tour scheduling content (Civitatis/Viator copy that warns Shabbat closures).                        |
| `microck/ordinary-claude-skills@judaism-hebrew-wisdom` | 11       | Background context for religious-site editorial. Low installs — verify before use.                  |
| `besoeasy/open-skills@city-tourism-website-builder`    | 29       | Direct domain match — review for ideas even if not installing.                                      |
| `travisjneuman/.claude@travel-planner`                 | 140      | Itinerary copy for "X-day Israel trip" sub-pages.                                                   |
| `skills-il/government-services@israel-gov-api`         | 18       | Possibly tourism data from MoT (Ministry of Tourism). Investigate.                                  |

### Tier 4 — Schema (lower-quality pool, pick one)

All three have <40 installs — treat with skepticism. Cross-reference with hand-rolled JSON-LD from `lib/schema/`:

- `norahe0304-art/30x-seo@30x-seo-schema` (33)
- `boraoztunc/skills@schema-markup` (28)
- `canatufkansu/claude-skills@json-ld-schemas` (23)

**Recommendation:** Hand-roll using schema.org spec + validator. These skills are reference only.

## Install commands (Tier 1 — run now)

```powershell
npx --yes skills add skills-il/localization@hebrew-rtl-best-practices -y
npx --yes skills add skills-il/localization@hebrew-tailwind-preset -y
npx --yes skills add skills-il/localization@israeli-accessibility-compliance -y
npx --yes skills add addyosmani/web-quality-skills@accessibility -y
npx --yes skills add wshobson/agents@tailwind-design-system -y
npx --yes skills add vercel/nextjs-skills@next-best-practices -y
npx --yes skills add sickn33/antigravity-awesome-skills@nextjs-best-practices -y
```

## Searched but rejected

- `dmend3z/tribo-skills@affiliate-motivation-and-training` (10) — sounds like sales coaching, not affiliate-link engineering. Skip.
- `hack23/riksdagsmonitor@seo-optimization` (10) — Swedish-parliament-monitoring repo. Wrong domain.
- `microck/ordinary-claude-skills@islam-sufism-wisdom` (12) — could be relevant for Acre/East Jerusalem editorial but very low installs.
- All sub-100-install schema/i18n skills — replaced by hand-rolled patterns.

## Cross-cutting findings

1. **`skills-il` org exists and is active** — Israeli developer community has packaged the country's specific concerns (RTL, IL a11y law, Shabbat scheduling). This is a major shortcut vs hand-rolling.
2. **No skill exists for "tourism affiliate site"** end-to-end. Best match (`city-tourism-website-builder`, 29 installs) is generic. The mega-prompt itself is filling this gap.
3. **No skill for "seo-geo" / Generative Engine optimization** appeared in searches — may need to hand-roll for Fase 1.8 or search again later.
4. **Vercel has an official `nextjs-skills` repo** with `next-best-practices`. Higher trust than community alternatives.

## Re-run guidance

Re-run `find-skills` searches before each milestone — the ecosystem is growing fast. Especially:

- Before Fase 2: re-search "affiliate booking" and "travel content"
- Before Fase 3: re-search "programmatic SEO" (none surfaced yet)
- Before Fase 6: re-search "vercel deploy monitoring"
