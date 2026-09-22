# Auditoría SEO — 2026-09-22

**Para**: Sebastian. **Cómo se hizo**: cuatro fuentes, todas re-ejecutables desde el repo
(`pnpm seo:refresh`): (1) análisis on-page de las 160 páginas públicas del build; (2)
Lighthouse sobre 6 URLs de producción en móvil; (3) DataForSEO: volumen, dificultad e
intención de 150 keywords objetivo (una por página y por idioma), el top 10 real de Google
para cada una, las keywords por las que el dominio rankea hoy, y las de 10 competidores;
(4) DataForSEO backlinks: quién nos enlaza y quién enlaza a los competidores. Más 100
páginas de los que rankean #1–#3 en inglés y español, leídas con Firecrawl para medir
cuánto escriben. Costo total de datos: US$2,24 de DataForSEO y 100 créditos de Firecrawl.
Los datos crudos están en `data/seo/*.json` y se ven en `/gestion/seo`.

Lo que no se pudo medir: Search Console (no está conectado; es la única fuente real de
impresiones y clics), y la cuota anónima de PageSpeed Insights estaba agotada (se usó
Lighthouse local, sin datos de campo de usuarios reales).

---

## 0. Diagnóstico en diez líneas

1. **Técnicamente el sitio está limpio**: 0 títulos duplicados, 0 H1 faltantes, hreflang
   recíproco al 100 % en 5 idiomas, canonical, JSON-LD y og:image en todas, 0 imágenes sin
   alt, sitemap con 161 URLs correctas, Lighthouse SEO 100/100 y accesibilidad 100/100 en
   las 6 URLs medidas, rendimiento 88–95.
2. **Google todavía ve el sitio viejo.** Rankeamos por 178 keywords, todas de URLs de 2018
   que hoy redirigen (`/jerusalem-coffee-guide`, `/caesarea`, `/best-holy-land-tours`…).
   Ninguna en el top 10; tres en el top 20. **Ninguna de las 150 keywords objetivo del sitio
   nuevo aparece en el top 10 real.** Tiene una semana: es normal, pero hay que empujar la
   reindexación (Search Console, sitemap enviado, IndexNow para Bing).
3. **Los backlinks son 16 y los 16 son basura**: casinos, farmacia y "PBN links" con
   anchors tipo "High Quality Dofollow Backlinks DA 50". Perfil orgánico: cero. Rank de
   dominio 0 contra 151–325 de los competidores. Hay que desautorizarlos (archivo listo
   en `gestion/seo/disavow.txt`) y empezar de cero a conseguir enlaces reales.
4. **Los que rankean escriben 2 a 4 veces más que nosotros** en las páginas que importan:
   `/jerusalem` 2.968 palabras contra 6.913 de promedio del top 3; `/is-israel-safe` 827
   contra 7.314; `/jerusalem-tours-compared` 942 contra 7.049; la home 436 contra 3.881.
   En las regiones chicas (Galilea, Néguev, Mar Muerto) estamos por encima.
5. **24 páginas thin**: los cinco índices de itinerarios tienen ~100 palabras; las homes
   traducidas 230–330; `/plan-your-trip` 404; `/day-trips-from-tel-aviv` 673.
6. **63 meta descriptions demasiado largas** (Google las corta) y 16 títulos > 60
   caracteres, casi todos en FR/DE/ES. 8 títulos demasiado cortos (legales y `/de`, `/he`).
7. **Las keywords "de guía" tienen poco volumen**: `things to do in jerusalem` 1.000/mes en
   EE. UU., `israel travel guide` 110. Lo grande son consultas de lugar (`sea of galilee`
   40.500, `masada` 14.800, `negev desert` 14.800) donde gana Wikipedia, y hoteles en
   hebreo (`מלונות באילת` 49.500) donde ganan las cadenas (Fattal, Isrotel). No vamos a
   ganar ninguna de las dos con contenido: la estrategia es long-tail de intención de viaje
   y cobertura completa por tema.
8. **AI Overviews en 99 de 150 SERPs y "People also ask" en 124**: Google responde antes
   del primer resultado. Cada página necesita respuesta directa en las primeras 60 palabras
   y FAQ con las preguntas reales del SERP.
9. **477 keywords donde un competidor está en el top 10 y nosotros no**, casi todas con
   página existente para cubrirlas (`/jerusalem`, `/tel-aviv`, `/galilee`, `/haifa`).
   28 pedirían página nueva (Petra desde Jordania, hoteles del Carmel): solo se listan.
10. **Rendimiento**: bien en general, pero CLS de 0,13 en `/best-hotels-jerusalem` y 0,18
    en `/itineraries/7-days-in-israel` (umbral: 0,1). Algo salta al cargar en las guías con
    tarjetas.

---

## 1. Técnico

| Chequeo | Resultado |
|---|---|
| Páginas públicas / en sitemap | 160 / 161 (la diferencia es `/photo-credits`, correcto) |
| Títulos duplicados / faltantes | 0 / 0 |
| Descriptions duplicadas / faltantes | 0 / 0 |
| H1 único | 160/160 |
| Canonical correcto | 160/160 |
| hreflang recíproco (5 idiomas) | 100 % |
| JSON-LD | todas (Article, BreadcrumbList, FAQPage donde hay FAQ, WebSite/Organization en la home) |
| og:image | todas |
| Imágenes sin alt | 0 |
| Links internos entrantes mínimos | 10 (umbral de alerta: 3) |
| Páginas noindex en el sitemap | 0 |
| robots.txt | permite todo, apunta al sitemap; no bloquea `/gestion` (lo cubre el noindex) |
| Lighthouse móvil (6 URLs) | SEO 100 · accesibilidad 100 · rendimiento 88–95 |
| LCP / TBT | 2,4–3,3 s / 0–252 ms |
| CLS | 0,00–0,03 salvo `/best-hotels-jerusalem` 0,13 y `/itineraries/7-days-in-israel` 0,18 |

**Lo que hay que corregir** (todo mecánico, sin decisiones):

- 63 descriptions > 155 caracteres → recortar a 120–155. Por idioma: EN 15, DE 14, ES 16,
  FR 18. El lint `scripts/lint-meta-length.mjs` existe pero el umbral está más laxo que el
  de Google: bajarlo a 155 para que `pnpm check` lo frene.
- 16 títulos > 60 caracteres (FR/DE/ES traducidos, `/galilee`) → acortar sin perder la
  keyword. 8 títulos < 30 (`/about`, `/contact`, `/privacy`, `/de`, `/he`, `/de/tel-aviv`…)
  → alargar con la marca y el tema.
- CLS en guías con tarjetas: reservar alto de `AffiliateCard`/imágenes y de la `Toc`.
- `robots.txt`: sumar `Disallow: /gestion` y `/mariluz` por prolijidad (el noindex ya
  alcanza).

## 2. Indexación: el sitio viejo sigue en Google

DataForSEO ve al dominio rankeando por 178 keywords en 47 URLs, todas viejas (redirigen
con 301 a las nuevas). Las mejores: `unesco sites in israel` #18 (`/israel-unesco-sites`),
`spring season in israel` #21, `israel zimmer` #25, `masada to dead sea` #35. Ninguna
URL nueva aparece todavía.

Qué significa: Google no reindexó el rebuild (una semana). Los 301 transfieren señal, pero
esas URLs viejas rankeaban por temas que el sitio nuevo no cubre con página propia (café en
Jerusalén, UNESCO, transporte, buceo en Eilat). Se redirigen a la región o guía más cercana,
que es lo correcto; van a bajar hasta que las nuevas suban.

Qué hacer (solo Sebastian puede):
1. **Search Console**: verificar el dominio, enviar `sitemap-index.xml`, pedir indexación
   de las 30 páginas EN principales. Sin esto estamos a ciegas: es la única fuente de
   impresiones, clics y errores de rastreo reales.
2. **Bing Webmaster Tools** + IndexNow (hay `INDEXNOW_KEY` en `.env.example`, no cargada).
3. Después de conectar Search Console, `pnpm seo:refresh` cada mes y comparar posiciones.

## 3. Backlinks: cero orgánicos, 16 tóxicos

| Dominio | Rank | Backlinks | Dominios referentes |
|---|---:|---:|---:|
| **visitisrael.site** | **0** | **16** | **16** |
| touristisrael.com | 325 | 18.677 | 5.164 |
| viajeroscallejeros.com | 313 | 39.381 | 2.460 |
| sommertage.com | 290 | 9.744 | 2.347 |
| kommwirmachendaseinfach.de | 265 | 5.122 | 2.514 |
| beinharimtours.com | 261 | 9.270 | 1.608 |
| funinjerusalem.com | 261 | 2.617 | 796 |
| secrettelaviv.com | 252 | 4.116 | 1.920 |
| losviajesdedomi.com | 243 | 8.257 | 917 |
| hike-israel.com | 212 | 1.823 | 427 |
| backpackisrael.com | 151 | 545 | 128 |

Los 16 que nos enlazan: `pecah77gacor.site`, `betwinnermirror.com`,
`bestenglishonlinecasino.online`, `clonidine01mg.store`, cuatro `.shop` de "seo growth" y
ocho más del mismo estilo (lista completa en `data/seo/backlinks.json` → `ourReferring`).
Spam score 60–75. No apuntan a URLs viejas ni rotas (0 links perdidos): apuntan a la home.
Probablemente alguien compró "backlinks" en algún momento o son spam automático.

Qué hacer:
1. Subir `gestion/seo/disavow.txt` en Search Console → Disavow links (Sebastian).
2. Enlaces reales, por orden de facilidad (65 oportunidades en el JSON):
   - Listas donde se pide inclusión: `bloggers.feedspot.com/israel_travel_blogs/`,
     `masaisrael.org` ("12 Best Israel Travel Blogs"), `israelitravelbloggers.com`.
   - Sitios que enlazan a 2–3 competidores y no a nosotros: `airial.travel`,
     `wanderlog.com`, `tripomatic.com`, `israelactive.com`.
   - Páginas de recursos y "write for us": `jfedwcnj.org/.../israel-travel-resources`,
     `travellersquest.com/write-for-us`, `yeahthatskosher.com/writers-tools/`.
   - ES/DE: `monoviajero.com/guia-israel/`, `viel-unterwegs.de/reiseziele/israel/`,
     `israel-reiseleiter.com/blog`.
   Nada de esto se contactó; requiere una persona con nombre (ver competidores.md §4).

## 4. Keywords: qué vale la pena y qué no

Volumen mensual (Google Ads) en el país objetivo de cada idioma (EE. UU., España, Francia,
Alemania, Israel). Datos completos por página en `/gestion/seo` → Keywords.

### Inglés

| Página | Keyword | Vol. | KD | #1 hoy | Nuestras palabras / top 3 |
|---|---|---:|---:|---|---:|
| /galilee | sea of galilee | 40.500 | 8 | faith.nd.edu | 3.353 / 1.571 |
| /negev | negev desert | 14.800 | 9 | britannica | 3.145 / 2.244 |
| /masada-visitor-guide | masada | 14.800 | 22 | unesco | 2.260 / 3.112 |
| /is-israel-safe | is israel safe to visit | 4.400 | 15 | travel.state.gov | **827 / 7.314** |
| /visa-information | israel visa | 1.600 | 32 | piba.gov.il | **1.342 / 4.153** |
| /dead-sea | dead sea israel | 1.300 | 17 | touristisrael | 3.206 / 1.145 |
| /car-rental-israel | car rental israel | 1.300 | 0 | enterprise | 1.139 / 636 |
| /jerusalem | things to do in jerusalem | 1.000 | 0 | culturetrekking | **2.968 / 6.913** |
| /tel-aviv | things to do in tel aviv | 880 | 0 | mywanderlust.pl | **3.259 / 5.992** |
| /jerusalem-tours-compared | jerusalem tours | 880 | 15 | touristisrael | **942 / 7.049** |
| /best-time-to-visit-israel | best time to visit israel | 720 | 0 | travelingisrael | **729 / 1.616** |
| /best-hotels-tel-aviv | best hotels in tel aviv | 720 | 0 | theluxuryeditor | 2.475 / 1.507 |
| /dead-sea-hotels-guide | dead sea hotels | 720 | 4 | isrotel | 2.145 / 1.314 |
| /israel-tour-packages | israel tour packages | 480 | 14 | beinharimtours | **1.831 / 4.893** |
| / | israel travel guide | 110 | 33 | touristisrael | **436 / 3.881** |
| /day-trips-from-tel-aviv | day trips from tel aviv | 70 | 0 | colorfulsisters | **673 / 4.841** |

Lectura: **KD 0–15 en casi todo**: son keywords ganables por un sitio nuevo. La diferencia
con el top 3 no es autoridad, es profundidad. Las cuatro páginas con más déficit y más
valor comercial: `/is-israel-safe` (4.400/mes, 827 palabras), `/jerusalem-tours-compared`
(afiliado directo, 942 palabras), `/jerusalem` (2.968 vs 6.913) y la home (436).

Las de volumen enorme (`sea of galilee`, `masada`, `negev desert`) son consultas de lugar:
gana Wikipedia/Britannica/UNESCO. Se cubren igual (ya estamos largos) pero no son el
objetivo: el objetivo son las variantes de intención de viaje (`sea of galilee tours`,
`masada sunrise tour`, `how to get to masada`) que salen en "People also ask".

### Español, francés, alemán

- ES: `mar de galilea` 1.600, `masada israel` 590, `viajar a israel` 480, `eilat israel`
  320, `desierto del neguev` 210, `es seguro viajar a israel` 110, `que ver en tel aviv` 90.
  KD 0–3 en todas. El competidor real (Viajeros Callejeros, 83.657 keywords) rankea con
  contenido de 2012: se gana con fecha y profundidad.
- DE: `see genezareth` 5.400 (KD 0), `masada` 1.900, `eilat israel` 880, `negev wüste` 880,
  `jerusalem sehenswürdigkeiten` 320, `israel visum` 320. Gap contra
  kommwirmachendaseinfach.de: `währung von israel` 2.900 (moneda: va en `/de` o en la
  guía práctica), `eilat` 2.400.
- FR: `massada` 2.400, `lac de tibériade` 1.300, `voyage israël` 260, `désert du néguev`
  260, `visa israël` 170. Routard tiene 49 gaps contra nosotros: `galilee region` 5.400,
  `monnaies israel` 2.400, `carte palestine israël` 3.600.
- 35 de las 150 primarias no tienen volumen medible: casi todas las excursiones combinadas
  (Cesarea–Haifa–Acre, Nazaret–Galilea, Belén) y los itinerarios de 7/10 días en ES/FR/DE/HE.
  Esas páginas viven de long-tail y de links internos, no de una keyword principal.

### Hebreo

`מלונות באילת` 49.500, `מלונות בירושלים` 27.100, `ים המלח` 22.200, `מלונות בתל אביב`
22.200, `מצדה` 14.800. Todo transaccional o de lugar, dominado por Fattal, Isrotel y
parks.org.il. Confirma lo del estudio de competidores: el hebreo es turismo interno. No
invertir contenido ahí hasta tener datos de Search Console.

## 5. Lo que hace Google en estas SERPs

De 150 resultados: **AI Overview en 99**, People also ask en 124, top sights en 38, video
en 23, hotels pack en 20 (todas las de hoteles), knowledge graph en 23. Consecuencias:

- El primer párrafo de cada página tiene que responder la pregunta (Google lo cita en el
  AI Overview con link). Hoy las páginas abren con contexto histórico.
- Las preguntas de "People also ask" de cada SERP son la lista de H2/FAQ que faltan. Están
  guardadas por keyword en `keywords.json` → `serpFeatures` (falta extraer el texto de las
  preguntas: próxima iteración del script).
- En hoteles, el pack de Google ocupa la primera pantalla: la guía compite recién debajo.
  Ahí el diferencial es el criterio ("cuál elegir según…"), no la lista.

## 6. Competidores: 477 huecos

Keywords donde un competidor está en el top 10 y nosotros en ningún lado (vol ≥ 100):
touristisrael.com 150, funinjerusalem.com 118, secrettelaviv.com 93, routard 49,
kommwirmachendaseinfach.de 24, viajeroscallejeros 23, lonelyplanet 14, backpackisrael 5,
losviajesdedomi 1, sommertage 0. Ejemplos con página nuestra existente: `city of david
jerusalem` 5.400 → `/jerusalem`; `bars in jaffa` 9.900 y `art museum tel aviv` 6.600 →
`/tel-aviv`; `restaurants in haifa` 4.400 → `/haifa`; `caves in israel` 3.600 → sin página
clara. 28 pedirían página nueva (casi todas Petra desde Jordania y hoteles del Carmel): se
listan en `/gestion/seo`, no se crean (regla 2).

Ojo con el matcheo automático: `suggestedPage` es por tema con regex; revisar a mano antes
de ampliar una página.

---

## 7. Plan, en orden

| # | Acción | Quién | Esfuerzo | Efecto |
|---|---|---|---|---|
| 1 | Search Console + sitemap + pedir indexación; Bing + IndexNow | Sebastian (15 min) | trivial | Sin esto no hay datos ni reindexación rápida |
| 2 | Subir `gestion/seo/disavow.txt` | Sebastian (5 min) | trivial | Limpia el perfil antes de conseguir links reales |
| 3 | Recortar 63 descriptions y 24 títulos; bajar umbral del lint a 155 | Claude | 1 tanda | Snippets completos en Google |
| 4 | Arreglar CLS en guías con tarjetas | Claude | chico | Core Web Vitals en verde |
| 5 | Profundizar las 4 páginas con más déficit: `/is-israel-safe`, `/jerusalem-tours-compared`, `/jerusalem`, home; respuesta directa arriba + FAQ con las preguntas del SERP | Claude, 1 página por tanda | medio | Son las de mayor valor y KD ≤ 15 |
| 6 | Índices de itinerarios (100 palabras) y `/plan-your-trip` (404): texto real, no solo links | Claude | chico | Saca 6 páginas de "thin" |
| 7 | Cubrir los gaps con página existente (`/jerusalem`: Ciudad de David, Santo Sepulcro; `/tel-aviv`: Jaffa, museos; `/haifa`: restaurantes) como secciones nuevas | Claude, con lista aprobada | medio | 477 keywords sin crear páginas |
| 8 | Extraer las preguntas de "People also ask" por keyword y generar FAQ | Claude (script) | chico | AI Overviews y PAA |
| 9 | Pedir inclusión en las 3 listas de blogs de Israel + 4 sitios que enlazan a competidores | Sebastian (con nombre y cara) | 2 h | Primeros links reales |
| 10 | `pnpm seo:refresh` mensual y comparar en `/gestion/seo` | Claude | automático | Ver si sube |

Lo que no vale la pena ahora: perseguir `sea of galilee` / `masada` como keyword principal
(Wikipedia), hoteles en hebreo (cadenas), crear páginas nuevas para los 28 gaps sin página.

## 8. Cómo se mantiene

- `pnpm seo:onpage` — análisis del build (gratis, corre después de `pnpm build`).
- `pnpm seo:psi` — PageSpeed; `node scripts/seo/psi.mjs --local` usa Lighthouse local si la
  cuota anónima está agotada (o cargar `PSI_API_KEY` en `.env`).
- `node scripts/seo/keywords.mjs` / `competitors.mjs` / `backlinks.mjs` — DataForSEO, con
  caché en `data/seo/cache/`: re-correr sin `--force` cuesta US$0; con `--force`, ~US$2,30
  todo. Tope por script en `api-client.mjs`. Saldo al 22-09: US$31.
- `pnpm seo:refresh` — todo en orden. Los JSON en `data/seo/` se versionan: cada corrida
  queda en el historial de git y `/gestion/seo` muestra la última.
- Este documento se actualiza a mano después de cada corrida mensual, con fecha.
