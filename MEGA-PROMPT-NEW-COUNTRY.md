# MEGA PROMPT — Tourism Affiliate Site (Any Country)

> **Cómo usar:** Abrí una nueva sesión de Claude Code en un directorio limpio. Pegá TODO este prompt como primer mensaje. Cuando te pregunte el país, respondé con una palabra (ej: "Marruecos"). De ahí en adelante NO interrumpas a menos que el prompt te pida explícitamente input. El único punto de stop obligatorio es el Quality Gate al final de la Fase 2.

---

## Misión

Construí un sitio web tipo afiliado de turismo, production-ready, para el país que te indique el usuario. El sitio debe:

- Operar en 2 idiomas: local + inglés (si el local ES inglés, usar EN + segundo idioma según research SEO)
- Cubrir las 5–15 regiones turísticas más relevantes del país
- Monetizar vía afiliados (Booking, Civitatis, Viator, GetYourGuide, RentalCars, SafetyWing, Skyscanner, otros aplicables)
- Pasar Lighthouse mobile ≥90 (3-run-median) y un audit de calidad ≥85 antes de escalar
- Estructura limpia desde el día 1 — cero deuda estructural, cero hex sueltos, cero afiliados sin tracking, cero imágenes sin crédito

## Contexto crítico — errores del proyecto anterior (NO repetir)

El proyecto previo (Discover Argentina) entregó 70 páginas core × 5 langs pero acumuló deuda estructural que requirió un sprint entero de correcciones (S11). Los errores root-cause fueron:

1. **Sin design system formalizado desde día 1** → 6,089 hex codes a limpiar retroactivamente
2. **Sin estrategia de afiliados desde día 1** → un partner llegó al 92%, otro al 18% — codemods masivos a posteriori
3. **Sin contrato de imágenes** → PhotoGallery sin srcset por meses, watermarks, low-res, ledger de créditos parchado
4. **Sub-pages legacy** → 783 bugs detectados de golpe, codemod de emergencia
5. **Quality scoring uniforme** → castigaba utility/hub pages injustamente hasta que se introdujeron 5 perfiles
6. **NER/mention detection como afterthought** → 14k oportunidades de monetización descubiertas tarde
7. **i18n bolted-on** → idioma core primero, otros agregados en sprints separados
8. **Lighthouse no medido hasta sprint 11** → plateau ~85, múltiples iteraciones para llegar a 90+
9. **Sub-pages built before the canonical pattern stabilized** → tuvieron que regenerarse

**Constraint operativo:** todo lo anterior debe estar resuelto en Fase 1 (Foundation) antes de escribir la primera página de contenido.

## Constraints inviolables

- **NUNCA** escribir hex codes raw en componentes — solo design tokens
- **NUNCA** linkear a un partner afiliado sin pasar por su helper (`bookingLink()`, `civitatisLink()`, etc.) — los helpers leen env vars; si no hay AID, el helper devuelve la URL pública pero deja el codemod listo para flip
- **NUNCA** importar una imagen sin: (a) entrada en `photo-credits.json` con autor + licencia + URL fuente, (b) ≥1200px de ancho, (c) `srcset` responsive
- **NUNCA** publicar una página sin: hreflang, JSON-LD schema, meta description, OG tags, canonical
- **NUNCA** avanzar a Fase 3 si la Fase 2 no pasa el Quality Gate
- **NUNCA** asumir que un partner afiliado opera en el país sin verificarlo en Fase 0
- **SIEMPRE** medir Lighthouse con 3-run-median (single-sample miente — aprendido en S11-E'')
- **SIEMPRE** correr el audit dashboard antes de declarar una página completa

---

## Fase -1: Bootstrap

1. Preguntá al usuario: _"¿Para qué país construyo el sitio? (una palabra)"_
2. Una vez que responda, confirmá: _"Confirmá: ¿{país}? Una vez que digas sí, no te interrumpo hasta el Quality Gate de la Fase 2."_
3. Verificá ambiente local:
   - `node --version` (≥20)
   - `git --version`
   - `gh --version` (opcional, para PRs)
   - GSD instalado (`/gsd:help` debe responder)
4. Crear workspace aislado:
   ```
   /gsd:new-workspace discover-{country-slug}
   ```
5. Crear el proyecto dentro del workspace:
   ```
   /gsd:new-project
   ```
   Cuando GSD pida nombre del proyecto: `Discover {Country}`.
   Cuando pida descripción: usar la Misión de arriba sustituyendo el país.

## Fase 0: Research paralela (6 agentes simultáneos)

Spawneá los 6 agentes en una sola tool call (`Agent` tool con `subagent_type: gsd-project-researcher` o `general-purpose`). Cada agente escribe su output en `.planning/research/{slug}.md`. Después un agente sintetizador (`gsd-research-synthesizer`) consolida todo en `.planning/research/COUNTRY-BRIEF.md`.

| Agente                              | Output esperado                                                                                                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **R1 — Tourism landscape**          | Top 5–15 regiones turísticas del país rankeadas por tourism volume (Google Trends + arrivals data + competitor coverage). Incluir slug sugerido, hook editorial, mejor temporada.                         |
| **R2 — Competitor analysis 3-tier** | Tier 1 (peers directos), Tier 2 (benchmark establecido), Tier 3 (north star). Mínimo 9 competidores totales. Para cada uno: URL, modelo de revenue, fortalezas, gaps.                                     |
| **R3 — SEO + keyword research**     | Top 50 keywords per región (volumen, dificultad, intent). Auto-detectar la región piloto = mayor producto (volumen × oportunidad × competidor débil).                                                     |
| **R4 — Affiliate matrix**           | Tabla ✓/✗ × país de Booking, Civitatis, Viator, GetYourGuide, RentalCars, SafetyWing, Skyscanner, HostelWorld, Klook, GoCity, Discover Cars. Incluir URL del programa de afiliados de cada uno.           |
| **R5 — Image source legality**      | Cobertura Wikimedia Commons del país (% regiones con fotos ≥1200px CC-BY). Alternativas: Unsplash, Pexels, gobiernos turísticos con licencia liberada. Lista de fotógrafos locales con CC license activa. |
| **R6 — Language strategy**          | Search volume turístico hacia ese país por idioma de origen. Confirma o desafía la asunción "local + EN". Si los datos sugieren otra cosa (ej: Marruecos donde FR > EN), reportá la discrepancia.         |

**Output consolidado** (`COUNTRY-BRIEF.md`):

- Lista final de regiones (5–15 con orden de prioridad)
- Región piloto auto-elegida por volumen × oportunidad
- Top 3 competidores por tier
- Top 50 keywords agrupadas por región
- Matriz de afiliados con env vars sugeridas
- Image strategy con sources verificadas
- Decisión final de idiomas (con datos)

**No avancés a Fase 1 hasta que `COUNTRY-BRIEF.md` exista y esté completo.**

## Fase 1: Foundation (sin escribir páginas todavía)

Correr `/gsd:new-milestone` con nombre `M1 Foundation`. Definir las siguientes phases en el roadmap, en este orden:

### 1.1 Tech stack scaffold

- Next.js 15 + App Router + TypeScript strict
- Tailwind CSS con tokens en `tailwind.config.ts` (cero hex en componentes)
- i18n via routing (`/[lang]/...`) preparado para 5 langs aunque arranquemos con 2
- Vercel deploy config + dominio placeholder
- ESLint con regla custom: prohibir `bg-[#...]` y `style={{ color: '#...' }}`

### 1.2 Design system formalizado

- Paleta extraída del briefing cultural (R1+R5) — tokens semánticos (primary, accent, neutral, surface, ink) NO color names
- Type scale (display, h1-h6, body, caption) con line-heights y tracking
- Spacing scale 4px base
- Component primitives: Button (3 variants), Card, Tag, Badge, Section, Container, Grid
- Documentar en `/admin/design-system/` (noindex)

### 1.3 Component library

- `RegionHero` — hero con foto, breadcrumb, CTA
- `AttractionGrid` — grid de cards de atracciones
- `AffiliateCard` — card monetizada con tracking implícito vía helper
- `PhotoGallery` con srcset obligatorio (320w, 640w, 1024w, 1600w)
- `StickyCTA` con UTM tracking
- `ItineraryCard`, `WhereToStay`, `TransportInfo`, `BestTimeToVisit`
- Storybook-style examples en `/admin/components/` (noindex)

### 1.4 Affiliate infrastructure

Crear `lib/affiliate/` con un helper por partner detectado en R4. Patrón:

```ts
export function bookingLink(opts: {
  destination: string;
  checkin?: Date;
  checkout?: Date;
}) {
  const aid = process.env.NEXT_PUBLIC_BOOKING_AID;
  const base = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(opts.destination)}`;
  return aid ? `${base}&aid=${aid}` : base;
}
```

- Test unitario por helper (Vitest) — mínimo 4 tests cada uno
- Env vars en `.env.example` con TODOs claros
- Codemods listos en `scripts/codemods/` para flipear partner cuando llegue el AID
- ESLint rule: prohibir `href="https://www.booking.com/..."` directo — debe pasar por helper

### 1.5 Photo credits ledger

- `data/photo-credits.json` con schema `{ src, author, license, sourceUrl, region, slug }`
- Helper `getCredit(src)` que lookup el ledger y arroja `Error` si falta entrada
- CI check: importar imagen sin crédito = build fail

### 1.6 Schema markup baseline

- `lib/schema/` con generators para `TouristDestination`, `TouristAttraction`, `Place`, `LocalBusiness`, `BreadcrumbList`, `WebSite`, `FAQPage`
- Componente `<JsonLd schema={...}/>` para inyectar
- Validador local (`scripts/qa/validate-schema.mjs`) usando schema.org JSON-LD validator

### 1.7 Quality scoring profiles

Definir 5 perfiles con pesos distintos (lección S11-V'):

- `REGION_CANONICAL` — exige todo: schema, afiliados, fotos, length 1500w+, hreflang
- `SUB_DESTINATION` — schema, afiliados, fotos, length 800w+, parent canonical
- `GUIDE_OR_WINERY` — schema (Article + LocalBusiness), 1 afiliado mínimo
- `UTILITY` — schema mínimo (WebPage), no exige afiliados
- `HUB` — listing, no exige afiliados ni length

Implementar en `scripts/audit/` y exponer en `/admin/audit/` (noindex).

### 1.8 SEO config

- `app/sitemap.ts` dinámico con prioridades por perfil
- `app/robots.ts` con disallow para `/admin/`, `/api/`
- `hreflang` automático en `<head>` para cada lang
- `next-seo` o equivalent para metas
- `canonical` URL en cada página
- 301 redirects map (`middleware.ts`) para slugs renombrados

### 1.9 Audit dashboard

Recrear el patrón de `/admin/audit/` con:

- Scan de todas las páginas built
- Score 0-100 por perfil
- Detección de: missing schema, missing afiliados (según perfil), missing alt text, broken internal links, missing hreflang, hex codes raw, images <1200px
- Output JSON cacheable + UI HTML

### 1.10 Lighthouse CI gate

- `lighthouse-ci` corriendo 3-run-median en pre-deploy
- Thresholds: mobile perf ≥90, a11y ≥95, best-practices ≥95, SEO ≥100
- Deploy bloqueado si fail

### 1.11 NER / mention detection (foundation, no monetización aún)

- Diccionario expandible `data/entity-dict.json` (tour, hotel, restaurant, museum, transport)
- Regex-based detector que identifica menciones en MDX y sugiere afiliado correspondiente
- Surface en audit dashboard

**Cierre Fase 1:** `/gsd:audit-milestone M1` debe pasar verde.

## Fase 2: Región piloto (DEEP)

Correr `/gsd:new-milestone M2 Pilot {pilot-region}`. Esta milestone construye SOLO la región piloto pero a profundidad de producción.

Phases:

### 2.1 Region canonical (local lang)

- Hero con foto editorial elegida del ledger
- 8–12 secciones: best time, top attractions, where to stay (afiliados Booking), tours (afiliados Civitatis/Viator/GYG), how to get there (afiliados Skyscanner/RentalCars), food, day trips, FAQ
- 1500–2500 palabras
- 5+ afiliados activos (con env-var placeholder OK)
- Schema: TouristDestination + BreadcrumbList + FAQPage

### 2.2 Region canonical (EN lang)

Traducción nativa, no literal. Mismo schema.

### 2.3 Sub-destinations de la piloto (5–10)

Cada uno: 800–1200 palabras, schema TouristAttraction, afiliados Civitatis/Viator embebidos, fotos creditadas.

### 2.4 EN translation de los sub-destinations.

### 2.5 Hub pages

- Homepage (lista de regiones, CTAs principales)
- Region index `/regions/`
- About, Contact, Privacy, Affiliate Disclosure (legal)

### 2.6 QA + audit

- Correr audit dashboard
- Correr Lighthouse CI 3-run-median en cada página
- Fix de cualquier hallazgo

## QUALITY GATE (HARD STOP)

Antes de iniciar Fase 3, verificar TODOS estos criterios:

| Criterio                            | Threshold                      | Si falla |
| ----------------------------------- | ------------------------------ | -------- |
| Lighthouse mobile (3-run-median)    | ≥90 todas las páginas piloto   | Stop     |
| Audit score                         | ≥85 cada página                | Stop     |
| Bugs críticos                       | 0                              | Stop     |
| Afiliados activados (con o sin AID) | ≥80% de los aplicables al país | Stop     |
| Idiomas                             | local + EN, 100% paridad       | Stop     |
| Imágenes ≥1200px con crédito        | 100%                           | Stop     |
| Hex raw en componentes              | 0                              | Stop     |
| hreflang válido                     | sí                             | Stop     |
| Schema validado                     | sí, todas las páginas          | Stop     |
| Internal links rotos                | 0                              | Stop     |

**Si alguno falla:** detené todo, generá un report en `data/quality-gate-failure.md` con cada falla, su causa probable, y plan de fix. Esperá input humano. NO escalá a Fase 3.

**Si todos pasan:** generá `data/quality-gate-pass.md` celebrando la región piloto y procedé a Fase 3.

## Fase 3: Replicar a las demás regiones

Correr `/gsd:autonomous` para que GSD ejecute en serie un milestone por región restante (M3, M4, ...). Cada milestone replica el patrón M2 pero usando templates derivados del piloto. Quality Gate aplica per-región pero soft (audit ≥80, Lighthouse ≥85) — el gate hard era validar el modelo, no cada réplica.

## Fase 4: Sub-destinations sweep

Una vez completas todas las regiones canonicals, milestone dedicada a sub-destinations long-tail. Priorizá por keyword volume del research R3.

## Fase 5: Editorial content (opcional)

Si SEO research detecta gaps competitivos en blog content, milestone editorial. Skip si afiliados ya cubren el funnel.

## Fase 6: Deploy + monitoring

- Vercel production deploy
- Google Search Console submit + sitemap submit
- Plausible o GA4 + UTM tracking en CTAs
- Lighthouse CI continuo
- Audit dashboard accesible (auth básica) para vos
- Backlog de optimizaciones en `data/post-launch-backlog.md`

---

## Skills a usar (auto-detect + invoke)

**Paso 0 — Instalar `find-skills`:** Antes de Fase 0, corré en la terminal:

```
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

Esto instala la skill `find-skills` del repo `vercel-labs/skills`. Verificá que quedó disponible (debería aparecer al listar skills o invocarla con `/find-skills`).

**Paso 1 — Buscar skills útiles para el proyecto:** Una vez instalada, usá la skill para descubrir qué otras skills relevantes existen en el ecosistema. Corré como mínimo estas búsquedas (una por dominio del proyecto):

```
/find-skills tourism affiliate SEO
/find-skills nextjs i18n
/find-skills schema markup JSON-LD
/find-skills lighthouse performance accessibility
/find-skills image optimization srcset
/find-skills copywriting content marketing
```

**Búsquedas específicas para Israel** (si el país objetivo es Israel — caso de este proyecto):

```
/find-skills hebrew RTL localization
/find-skills israel travel middle east
/find-skills religious tourism jerusalem
/find-skills kosher jewish heritage
/find-skills unesco world heritage sites
/find-skills currency shekel ILS
```

Israel agrega complejidad sobre el patrón base:

- **RTL (Hebreo):** Tailwind debe configurarse con `dir="rtl"` por idioma; varios componentes (PhotoGallery, ItineraryCard, navegación) requieren mirror layout. Buscá skills que automaticen esto.
- **Turismo religioso:** Jerusalén, Belén (West Bank — issue editorial), Nazaret, Mar de Galilea. Schema enriquecido con `ReligiousBuilding`/`Place` + sensibilidad de naming (ej. "Temple Mount / Haram al-Sharif").
- **Idiomas:** la decisión "local + EN" probablemente cambie. R6 va a sugerir **EN + HE** mínimo, posiblemente + RU (turistas rusos/ucranianos) o + FR (peregrinaje). Confirmá con datos antes de scaffold i18n.
- **Afiliados:** verificar en R4 que Booking/Civitatis/Viator/GYG operan en Israel (sí lo hacen, pero confirmar AID disponibility). Skyscanner y RentalCars funcionan; SafetyWing tiene cobertura.
- **Imágenes:** Wikimedia tiene buena cobertura de Jerusalén/Tel Aviv/Masada; el Negev y Galilea menos. Israel Government Press Office tiene fotos CC. Verificar en R5.
- **Geopolítica del contenido:** evitar lenguaje que invite penalizaciones de Google News/Discover. Mantener tono editorial neutro y turístico, no político.

Verificá disponibilidad de (al menos) las siguientes, y si aparecen en los resultados, instalalas con `npx skills add ... --skill <name>`:

- `seo-audit` — para validación retroactiva
- `programmatic-seo` — para scaling de páginas template
- `schema-markup` — para JSON-LD en Fase 1
- `seo-geo` — para optimización Generative Engine (ChatGPT/Perplexity citations)
- `accessibility` — para a11y ≥95 en Lighthouse
- `performance` — para perf ≥90 mobile
- `copywriting` — para region canonicals que conviertan
- `ai-seo` — si está disponible

Anotá en `data/skills-inventory.md` qué skills quedaron instaladas, cuáles faltan, y en qué fase planeás invocar cada una.

Invocá cada skill cuando corresponda en su fase. Si una skill no existe pero la necesitás, sugerí instalarla (`npx skills add <repo> --skill <name>`) y seguí con la mejor alternativa.

## Comandos GSD usados (referencia)

```
/gsd:new-workspace discover-{country}
/gsd:new-project
/gsd:new-milestone M1 Foundation
/gsd:plan-phase
/gsd:execute-phase
/gsd:audit-milestone M1
/gsd:new-milestone M2 Pilot {region}
/gsd:audit-milestone M2  # ANTES del Quality Gate
/gsd:autonomous          # Fase 3 en adelante
/gsd:ship                # cada PR
```

## Deliverable final

Cuando completés Fase 6, devolvé al usuario:

1. **URL del sitio** en producción
2. **Sitemap completo** — lista de TODOS los URLs (canonicals + sub-destinations + hubs) por idioma
3. **Affiliate coverage report** — % por partner, links totales, env vars pendientes de flipear
4. **Audit dashboard URL** (auth) — para que vea scores en vivo
5. **Lighthouse CI dashboard** — historiales
6. **Backlog post-launch** — qué quedó fuera de scope y por qué
7. **Resumen ejecutivo** — qué se construyó, decisiones clave, riesgos identificados

Formato del sitemap final (ejemplo):

```
discover{country}.{tld}/
├── /                          (home, 2 langs)
├── /regions/                  (hub)
├── /{region-1}/               (canonical local)
├── /en/{region-1}/            (canonical EN)
│   ├── /{region-1}/{sub-1}/
│   ├── /{region-1}/{sub-2}/
│   └── ...
├── /{region-2}/
│   └── ...
├── /about/
├── /contact/
├── /privacy/
├── /affiliate-disclosure/
└── ...
```

---

## Reglas de operación durante el run

- **Modo YOLO:** una vez confirmado el país en Fase -1, no interrumpás al usuario hasta el Quality Gate. Si encontrás un blocker, intentá 3 vías de resolución antes de pedir ayuda. Si seguís bloqueado, generá un report en `data/blocker-{date}.md` y pedí input específico.
- **Commits:** atómicos, conventional commits (`feat(M1.3):`, `fix(M2.4):`, etc.). Co-author = Claude.
- **Branches:** una por phase. Merge a `main` solo cuando phase termine + audit pase.
- **Memory:** guardá lecciones en `~/.claude/projects/.../memory/` para que futuros agentes no repitan errores.
- **Reportes de progreso:** después de cada milestone, escribí `data/m{n}-completion-report.md` con: scope vs entregado, métricas, deudas, próxima milestone.

## Empezá ahora

Decile al usuario: _"¿Para qué país construyo el sitio? (respondé con una palabra)"_ y esperá su respuesta.
