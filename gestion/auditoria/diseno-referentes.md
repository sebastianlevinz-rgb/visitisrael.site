# Diseño comparado — referentes vs. visitisrael.site

**Fecha**: 2026-09-16
**Método**: WebFetch + navegador headless sobre cada referente (fuentes y elementos fijos leídos con `getComputedStyle`, texto con `innerText`), lectura de `src/components/*`, `src/styles/global.css`, `src/pages/*` y producción (`https://visitisrael.site`, desktop 1024px y móvil 375x812). Lo que no pude ver está marcado. Ningún archivo de `src/` fue tocado.

**Limitaciones honestas**
- Condé Nast Traveler bloquea el crawler y las URLs `/destinations/jerusalem` e `/destinations/israel` dan 404. Solo vi la nav, las fuentes y el pie del 404 (https://www.cntraveler.com/destinations/jerusalem).
- Israel21c ya no existe como sitio: `israel21c.org` redirige 301 a `unpacked.media/israel21c` (plataforma de video/podcast, fondo oscuro, sin guías). No es competidor.
- Never Ending Footsteps: la guía de Israel/Tel Aviv da 404 (https://www.neverendingfootsteps.com/tel-aviv-israel-itinerary/). Usé la plantilla idéntica de Egipto (https://www.neverendingfootsteps.com/egypt-itinerary/).
- Salt in our Hair no tiene guía de Israel. Usé Jordania (https://www.saltinourhair.com/jordan/), mismo template.
- Capturas de pantalla fallaron en varios sitios (panel oculto); los datos de fuente/colores salen del DOM, no de imagen.
- **Trabajo en curso en paralelo**: mientras escribía esto, `git status` muestra 20 archivos de `src/` modificados sin commit (Header, RegionPage, i18n/ui.ts +132 líneas, global.css +48, itinerarios) que agregan el locale `he`, propiedades lógicas (`start-3`, `end-0`, `padding-inline-start`) y fuentes hebreas. No son míos. Las observaciones de la sección 2 son contra **producción** y contra el working tree tal como estaba al leerlo; lo que ya cubre ese diff está señalado en la sección 4.

---

## 1. Qué hacen los referentes

| Sitio (URL vista) | Header / nav | Hero | CTAs afiliado | Confianza (autor / fecha / disclosure) | TOC / at-a-glance / mapa | Tipografía (body → títulos) |
|---|---|---|---|---|---|---|
| Lonely Planet (lonelyplanet.com/destinations/jerusalem) | Destinations, Books, Trips, Inspiration + buscador, carrito, login | Bloque verde oscuro, H1 88px compressed, foto a la derecha, "Read more" | Bloque final "IN PARTNERSHIP WITH GETYOURGUIDE — Book popular activities in Jerusalem" (7 menciones a GYG en el HTML, 0 Booking) | Disclosure pegado al bloque GYG: "may earn a commission… recommendations reflect our own independent opinions". Autor+fecha solo en artículos | Sin TOC. Grilla de atracciones con botón SAVE + DISCOVER | ABC Monument Grotesk 18px → American Grotesk Compressed |
| Time Out (timeout.com/israel/things-to-do/the-top-things-to-do-in-tel-aviv) | 9 categorías (Things to do, Restaurants, Hotels…) + selector de ciudad + newsletter arriba | Foto full-width, H1 48px, standfirst, fecha, "Written by Time Out Israel" | Casi nada (2 menciones a GYG). Modelo publicidad, no afiliado | Fecha + firma editorial; sin "updated"; sin disclosure visible | Sin TOC. Listicle H3 numerado "1. Take a stroll…" con foto por ítem | Franklin Gothic 20px → Franklin Gothic |
| Culture Trip (theculturetrip.com/israel/articles/the-best-things-to-see-and-do-in-israel/) | Guides, Trips, Discover + moneda + login; barra sticky 113px | Foto, H1, byline "by Ben Jakob · Published April 11, 2018 · 5 mins read" | Empuja sus propios Trips (175 menciones a "trips"), 0 Booking/GYG | Disclosure: "affiliate revenue. All recommendations have been independently sourced" | Sin TOC, sin key facts, sin mapa | Figtree 16px → Figtree |
| Atlas Obscura (atlasobscura.com/things-to-do/jerusalem-israel) | PLACES, FOODS, STORIES, NEWSLETTERS; sub-nav sticky 42px: ATTRACTIONS / FOOD & DRINK / MAP / LEADERBOARDS | Kicker "The Atlas Obscura Guide To", H1, "UPDATED NOVEMBER 6, 2023" | Ninguno de tours; cada lugar tiene "Been Here? / Want to Visit? / Add to List" | Fecha "UPDATED" en mayúsculas arriba; sin autor en la landing | Sub-nav de anclas = TOC; pestaña MAP (2 refs a mapa en el HTML) | Platform Web 16px → Platform Web |
| Nomadic Matt (nomadicmatt.com/travel-blogs/things-to-see-and-do-israel/) | Logo + búsqueda + hamburguesa; "Advertiser Disclosure" arriba a la derecha | Sin hero: H1, "Updated: February 3, 2026", foto | Links inline + caja final "Book Your Trip to Israel: Logistical Tips and Tricks" con Skyscanner (7 refs), Booking (4), Hostelworld (2), GYG (3), SafetyWing | "Updated" bajo el título; disclosure global en header | Sin TOC en este post. Sin mapa | Metropolis 20px / interlineado 33px → Fjalla One. Link color #2DA1C4 |
| The Points Guy (thepointsguy.com/travel/48-hours-jerusalem/) | Menú, suscripción, búsqueda | H1, foto de autor + nombre + "Contributor" + fecha (2019) | Tarjeta de crédito con "Apply now"; hoteles con precio y programa Amex | Disclosure antes del cuerpo; nota "some offers no longer available" | Jump links + share. Sin mapa | No verificado (fetch solo texto) |
| Earth Trekkers (earthtrekkers.com/30-things-to-do-jerusalem-israel/) | About, Destinations, Itineraries (por continente), US National Parks, Hiking | H1 57px, "Julie · Last updated: December 3, 2025", 11 Comments | Disclosure a 3 líneas del H1; "Where We Stayed" y "Plan Your Trip to Israel" como H2 finales; 0 menciones a Booking/GYG en el HTML (afiliados propios/Amazon) | Autor + "Last updated" + disclosure, todo arriba del primer párrafo | "Table of Contents" presente. "Israel Stats" en la guía país (idioma, población, moneda, enchufe). 43 imágenes | Lato 16/24 → Helvetica |
| Never Ending Footsteps (neverendingfootsteps.com/egypt-itinerary/) | HOME, ABOUT, BLOG, DESTINATIONS, TRAVEL EXPENSE REPORTS + barra de continentes | H1 mayúsculas, "LAUREN JULIFF · NOVEMBER 28, 2025" | Inline: Booking 6, GYG 6, Viator 1. Sin cajas ni botones | Autor + fecha; bio "founded … in 2011"; sin disclosure visible en texto | Sin TOC; H2 por día ("DAY 1: …"). 24 imágenes, 5.752 palabras | Arial 18/24 → Oswald |
| Salt in our Hair (saltinourhair.com/jordan/) | Nav por continente sticky ("page-nav") | Título + kicker "TRAVEL GUIDE", frase de 1 línea | Inline "Find Hotels via Booking.com / Find Flights via Skyscanner / Book Tours via GetYourGuide" (GYG 5, Skyscanner 5, Booking 3) + bloque "Best Travel Insurance" | "Hi, we're Nick & Hannah! We write these guides from places we've actually been" + Instagram; sin fecha | "IN THIS GUIDE: Itineraries · Map · Best time · Hotels · Car rental" (jump links); "Best time: May–Nov" como dato suelto; tira mensual Best/Good/Mixed/Poor con temperatura; sección "Map of Jordan" | Montserrat 16/26 → fuente propia "headings" |
| Tourist Israel (touristisrael.com/jerusalem/) | Logo centrado amarillo, hamburguesa, breadcrumb "Home > Jerusalem" | Foto full-width con H1 "JERUSALEM" en blanco | Listas de links a SUS tours ("Best Of Jerusalem Day Tour", "See All Tours"); sin precio ni rating en el listado (tampoco en /tours/) | Sin autor, sin fecha, sin disclosure | Sin TOC, sin facts, sin mapa. 539 palabras | HK Grotesk 16/20 → Bebas Neue Pro Expanded. Fondo crema #FDFCED |
| Secret Tel Aviv (secrettelaviv.com) | 7 menús: Calendar, Lifestyle, Food & Drink, Hotels, Tours, Jobs, Social | Logo centrado + "Israel's largest English speaking community" | Newsletter y grupo de Facebook; tours como categoría de nav | Fechas relativas ("6 days ago") por post; sin disclosure | Feed cronológico, sin TOC | No verificado |
| GetYourGuide (getyourguide.com/jerusalem-l97/) | Header fijo 80px | "Jerusalem Tours" + chips de filtro (Walking tours, Private tours, Multi-day…) | Tarjeta = foto, título, 2 líneas, "4.4 (827)", "From $108 per person", badges "Guided tour / Day trip / Pickup available / Skip the line" | — | H2: Top activities, All activities, Go beyond Jerusalem, Essential travel guides, FAQ, Top Attractions | GT Eesti 16px |
| Booking.com (booking.com/city/il/jerusalem.html → redirige a searchresults) | — | "Jerusalem: 479 properties found" | Tarjeta = barrio + "0.6 km from downtown" + descripción + "Scored 8.7 · Excellent · 1,838 reviews · Location 9.3" + "Select dates" | — | Filtros como H2 (Review score, Neighborhood, Distance from center…) | Sistema (Segoe/Roboto) 14px → Blue Sans |
| Condé Nast Traveler (404 en /destinations/jerusalem) | PLAN YOUR TRIP, INSPIRATION, DESTINATIONS, PLACES TO STAY, NEWS & ADVICE, CURATED ESCAPES, SHOPPING | No visto | No visto | Pie: "may earn a portion of sales… Affiliate Partnerships with retailers" | No visto | Farnham Display (serif) 18px → Freight (serif) |

### Patrones que se repiten en los mejores

1. **"Updated" con fecha real, arriba del primer párrafo.** Nomadic Matt ("Updated: February 3, 2026"), Earth Trekkers ("Last updated: December 3, 2025"), Atlas Obscura ("UPDATED NOVEMBER 6, 2023"). Los que muestran solo fecha de publicación vieja (Time Out 2023, Culture Trip 2018, TPG 2019) se ven abandonados.
2. **Persona con nombre y cara, no "equipo editorial".** Earth Trekkers (Julie), NEF (Lauren Juliff + bio "founded in 2011"), Salt in our Hair ("Hi, we're Nick & Hannah… places we've actually been"), Culture Trip (Ben Jakob), TPG (foto + "Contributor").
3. **Un solo disclosure global, corto, cerca del título; no uno por tarjeta.** Earth Trekkers lo pone en la tercera línea; Nomadic Matt lo lleva al header ("Advertiser Disclosure"); LP lo pega al bloque de partner.
4. **Afiliados como texto inline con nombre de partner, no como botón gritón.** NEF (6 Booking + 6 GYG inline), Salt in our Hair ("Find Hotels via Booking.com"), Nomadic Matt. Solo LP usa un bloque de partner, y lo marca "IN PARTNERSHIP WITH GETYOURGUIDE".
5. **Caja "Book your trip" al final del artículo con vuelos / hotel / seguro.** Nomadic Matt ("Book Your Trip to Israel: Logistical Tips and Tricks"), Earth Trekkers ("Plan Your Trip to Israel"), Salt in our Hair ("Best Travel Insurance").
6. **TOC o jump-nav visible.** Earth Trekkers ("Table of Contents"), Salt in our Hair ("IN THIS GUIDE"), Atlas Obscura (sub-nav sticky), TPG (jump links).
7. **Listicle numerado con H3 por ítem y foto por ítem.** Time Out ("1. Take a stroll down Rothschild Boulevard"), Nomadic Matt ("1. Tel Aviv"), Earth Trekkers (30 ítems, 43 imágenes), NEF (H2 por día).
8. **Datos duros del destino en una caja.** Earth Trekkers "Israel Stats" (idioma, población, moneda, enchufe), Salt in our Hair "Best time: May–Nov" + tira mensual de clima con semáforo.
9. **Mapa como sección propia.** Salt in our Hair ("Map of Jordan"), Atlas Obscura (pestaña MAP). Nadie más lo tiene: no es obligatorio, pero los dos que lo tienen lo tratan como contenido, no como widget.
10. **Cuerpo grande y aireado.** Nomadic Matt 20px/33px, Time Out 20px, NEF 18px, LP 18px, CNT 18px. Nadie de la lista baja de 16px.
11. **Sans-serif casi unánime.** Solo CNT usa serif (Farnham/Freight). El resto: grotescas (LP, Time Out, Atlas), geométricas (Salt in our Hair, Tourist Israel) o condensadas para títulos (Nomadic Matt Fjalla One, NEF Oswald, Tourist Israel Bebas Neue).
12. **Densidad real.** Las guías que rankean son largas: NEF 5.752 palabras, Earth Trekkers 3.893, Nomadic Matt 3.044. Tourist Israel (539) es la excepción y se sostiene por su inventario propio de tours.

---

## 2. Dónde estamos nosotros

### Lo que ya está bien (no tocar)
- **Sistema de tokens** en `src/styles/global.css`: escala tipográfica fluida con `clamp`, `--spacing-section`, sombras, radios, `prefers-reduced-motion`, `tabular-nums`, foco visible. Ninguno de los referentes tiene algo tan ordenado.
- **Fuentes self-hosted** (`@fontsource`), sin request a Google Fonts. Verificado en producción: `document.fonts` carga "Playfair Display 700" y "Source Sans 3 Variable 200-900".
- **Hero con overlay** (`.photo-overlay` + `.photo-title`): legible sobre cualquier foto. En móvil el H1 baja a 43.9px y no se rompe.
- **KeyFacts** (`KeyFacts.astro`): "Jerusalem at a glance" con 6 datos concretos es exactamente lo que hacen Earth Trekkers y Salt in our Hair, y mejor implementado (dl semántico).
- **BestTimeTable** con semáforo Best/Hot/Quiet: equivalente a la tira mensual de Salt in our Hair.
- **TourVerdict** (`TourVerdict.astro`): caja de veredicto con "✓ Worth it" y razones. Ningún referente tiene algo así de directo. Buen diferencial.
- **StickyCTA móvil** (Vuelos / Hoteles / Tours, 60px, `lg:hidden`): ningún referente lo tiene. Riesgo bajo, potencial alto; medir antes de decidir.
- **FaqSection** con `<details>` nativo + JSON-LD.
- **Disclosure que precede al link en el DOM** (`AffiliateCard.astro`): correcto legalmente. El problema es la cantidad, no la existencia.
- **Header sticky con blur** (65px) y menú móvil con `<details>` sin JS obligatorio.

### Lo que falta
- **TOC.** `grep -ri toc src/` no devuelve nada. Las regiones tienen 21 H2 (`/jerusalem`) y 22.076px de alto en móvil; sin anclas, nadie llega a "Jerusalem on Shabbat".
- **Autor con nombre.** `src/data/authors.ts` tiene un solo autor: "The Visit Israel Editorial Team", avatar "VI". Contra el patrón 2, esto lee como sitio de contenido generado.
- **Caja "Book your trip" al final** del artículo (patrón 5). Hoy el `AuthorByline` se repite al pie (`RegionPage.astro` línea final) y no hay cierre comercial.
- **Fecha "updated" visible antes del contenido en móvil.** En 375px el byline queda debajo de un hero de 633px + breadcrumb; el usuario ve "Jerusalem / Israel's spiritual heart" y nada más. Key facts a y=1651, primer CTA afiliado a y=2712.
- **Rating y precio en tarjetas de tour.** GYG muestra "4.4 (827) · From $108"; nosotros "Live prices & reviews on GetYourGuide". Es honesto, pero es la tarjeta más débil de la comparación. Sin API no se puede mostrar precio real; sí se puede mostrar duración, tipo ("Walking tour · 3 h · Small group") que son datos estables.
- **Foto del autor / "about" corto en las guías.** Salt in our Hair lo resuelve en dos líneas.

### Lo que está mal
- **Header a 1024–1279px se recorta.** Verificado en producción con viewport 1024: el botón "Plan your trip" mide `w=38px, h=39px` (`getBoundingClientRect`), o sea que `whitespace-nowrap` + `shrink-0` evitan el salto de línea pero el contenido se sale del contenedor `max-w-6xl` y se corta. El arreglo anterior cambió el síntoma, no la causa: a `lg` entran 6 links de nav + 4 idiomas + búsqueda + botón + logo.
- **Disclosure repetido 4 veces en la misma pantalla** (`AffiliateCard.astro` → `<AffiliateDisclosure compact />` por tarjeta). Verificado en `/jerusalem`: 4 ocurrencias de "Affiliate link — we may earn…" en la grilla de tours. Ningún referente lo hace.
- **Secciones duplicadas en región.** H2 de `/jerusalem`: "Best places to stay in Jerusalem" (template) y "Where to Stay in Jerusalem" (markdown); "Best time to visit Jerusalem" (BestTimeTable) y "When to Visit Jerusalem" (markdown); "Frequently Asked Questions" (markdown) y "Frequently asked questions" (`FaqSection`). Dos veces cada tema.
- **Inglés colado en fr/de/es**, más allá de `regions.ts`:
  - `DestinationCard.astro:43` → "Explore" hardcodeado (7 veces por home traducida).
  - `AffiliateCard.astro:24` → `cta = 'Book now'`, "Live prices & reviews on", "via {partner}".
  - `HotelCard.astro:37` → "Check rates & availability", "via Booking.com", tiers "Luxury/Best value/Hostel".
  - `AffiliateDisclosure.astro` → solo EN.
  - `AuthorByline.astro:24` → "By … · Last updated" con `toLocaleDateString('en-GB')`.
  - `FaqSection.astro:14` → "Frequently asked questions".
  - `BestTimeTable.astro` → "Season / Verdict / What to expect".
  - `TourVerdict.astro` → todo EN.
  - `Footer.astro` → "About us / Contact / Affiliate disclosure / Privacy / Accessibility" (por diseño, pero se ve).
- **Contenido traducido a un tercio.** Panel interno (`localhost:4321`, foto del build 2026-09-16): `/jerusalem` EN 2.193 palabras vs FR 738 / DE 642 / ES 831. `/tel-aviv` EN 2.383 vs DE 577. Con el patrón 12 en la mano, las versiones DE/FR de región no compiten.
- **Dos bylines por página** (arriba y abajo en `RegionPage.astro`), ambos con el mismo "VI" genérico.
- **Tarjeta de región con blurb de 2 líneas sobre foto en móvil** (`DestinationCard.astro`, `aspect-[4/5]`, grid 2 columnas en `LocaleHome.astro`): a 375px cada tarjeta tiene ~170px de ancho y mete kicker + H3 + blurb + "Explore". Se apila texto sobre foto oscurecida; los referentes (LP, Time Out) ponen el texto debajo de la foto.
- **Hero de región `height="tall"` (78vh) sin CTA ni dato.** LP pone el "Read more" y la grilla en la primera pantalla; nosotros gastamos 633 de 812px en foto + 2 palabras.
- **`data-reveal` casi sin uso** (1 ocurrencia en `/jerusalem`, 4 en home): el sistema de scroll-reveal está, pero solo lo usa la home EN. No es un bug; es peso muerto o inconsistencia.

---

## 3. Mejoras priorizadas

### Aplicar ya (bajo riesgo, alto impacto)

| # | Mejora | Impacto | Esfuerzo | Archivos | Implementación |
|---|---|---|---|---|---|
| 1 | Arreglar el header a 1024–1279px | Alto | Chico | `Header.astro` | Mostrar la nav de regiones recién en `xl` (`hidden xl:flex`), no en `lg`; entre `lg` y `xl` dejar logo + idiomas + búsqueda + botón + hamburguesa. Alternativa: sacar los 4 códigos de idioma del header y meterlos en un `<details>` con el código actual ("EN ▾"), que libera ~120px. Verificar con `getBoundingClientRect` del botón ≥ 120px en 1024. |
| 2 | Un solo disclosure por sección, no por tarjeta | Alto | Chico | `AffiliateCard.astro`, `RegionPage.astro`, `pages/[...slug].astro`, `index.astro` | Quitar `<AffiliateDisclosure compact />` de la tarjeta. Poner `<AffiliateDisclosure />` (versión larga) una vez antes de la grilla `#tours` y una vez antes de `#where-to-stay`. En la tarjeta dejar solo "via GetYourGuide" (`text-[11px]`). El DOM sigue precediendo al link. |
| 3 | Traducir strings hardcodeados de componentes | Alto | Chico | `i18n/ui.ts`, `DestinationCard.astro`, `AffiliateCard.astro`, `HotelCard.astro`, `AffiliateDisclosure.astro`, `AuthorByline.astro`, `FaqSection.astro`, `BestTimeTable.astro`, `TourVerdict.astro` | Agregar claves `card.explore`, `card.bookNow`, `card.livePrices`, `card.via`, `hotel.checkRates`, `hotel.tier.*`, `disclosure.compact`, `disclosure.full`, `byline.by`, `byline.updated`, `faq.title`, `bestTime.*`, `verdict.*`. Cada componente ya puede hacer `useTranslations(getLocaleFromPath(Astro.url.pathname))` como hace `StickyCTA.astro`. En `AuthorByline` pasar `locale` a `toLocaleDateString`. |
| 4 | Traducir `regions.ts` (tagline + blurb) | Alto | Chico | `src/data/regions.ts` o nuevo `src/data/regions.i18n.ts`, `DestinationCard.astro`, `LocaleHome.astro`, `PlanYourTripPage.astro` | `tagline: Record<Locale,string>`, `blurb: Record<Locale,string>`; `DestinationCard` recibe `locale` y resuelve. 7 regiones × 3 idiomas × 2 strings = 42 frases. |
| 5 | TOC en regiones y guías largas | Alto | Medio | nuevo `components/Toc.astro`, `RegionPage.astro`, `pages/[...slug].astro` | Astro `render()` devuelve `headings`; filtrar `depth === 2`, renderizar `<nav aria-label="On this page" class="my-8 rounded-card border border-border bg-sand-deep p-5"><p class="eyebrow">In this guide</p><ol class="mt-3 columns-1 sm:columns-2 gap-x-6 text-sm">…</ol></nav>` con `<a href="#slug" class="no-underline text-ink hover:text-primary">`. `scroll-margin-top` ya está en `.prose-content h2`. Colocarlo justo después de `KeyFacts`. Sin JS. |
| 6 | Sacar las secciones duplicadas de región | Medio | Chico | `RegionPage.astro` + markdown de `content/regions/*` | Decidir una sola fuente: si el markdown tiene "Where to Stay"/"When to Visit"/"FAQ", el template no repite el H2 (o se quita del markdown). Para FAQ: quitar el H2 del markdown y dejar solo `FaqSection` (que genera el JSON-LD). |
| 7 | Byline arriba con fecha en móvil, uno solo | Medio | Chico | `RegionPage.astro`, `AuthorByline.astro` | Quitar el segundo `<AuthorByline>` al pie. Bajar el hero de región a `height="standard"` (52vh) para que breadcrumb + byline entren en la primera pantalla de 812px. |
| 8 | Datos estables en tarjetas de tour | Medio | Chico | `data/regionData.ts` (`TourSeed`), `AffiliateCard.astro` | Agregar `duration?: string; type?: string` al seed ("3 h · Walking tour · Small group") y renderizar como `<p class="text-xs text-ink-muted">` bajo el título. Sin precios ni ratings inventados. |

### Aplicar con aprobación (cambia el look)

| # | Mejora | Impacto | Esfuerzo | Archivos | Implementación |
|---|---|---|---|---|---|
| 9 | Caja "Plan your trip to X" al final del artículo | Alto | Medio | nuevo `components/BookYourTrip.astro`, `RegionPage.astro`, `pages/[...slug].astro` | Reemplaza el byline de abajo. Tres filas con ícono (mismos paths SVG de `StickyCTA`): Vuelos → Skyscanner, Hotel → Booking, Tours → GetYourGuide, más seguro (SafetyWing) y auto (DiscoverCars) cuando haya ID. Estructura: `<aside class="my-12 rounded-card border border-border bg-sand-deep p-6"><h2 class="font-display text-2xl">…</h2><ul class="mt-4 divide-y divide-border">` con `<a rel="sponsored nofollow noopener" class="flex items-center justify-between py-3 no-underline">`. Es el patrón 5 de Nomadic Matt / Earth Trekkers. |
| 10 | Autor con nombre y foto | Alto | Medio (editorial, no técnico) | `data/authors.ts`, `AuthorByline.astro`, `/about` | Necesita una persona real o un seudónimo sostenido con bio y foto. `AuthorByline` pasa a `<img class="h-9 w-9 rounded-full">` + nombre + "Israel travel writer since 20XX" + "Updated {date}". Sin esto, el patrón 2 no se cumple y el resto de las señales de confianza rinde menos. |
| 11 | Tarjeta de región: texto debajo de la foto en móvil | Medio | Chico | `DestinationCard.astro` | En `< sm` usar layout apilado: `<a class="block rounded-card bg-card shadow-card overflow-hidden"><div class="aspect-[4/3] img-zoom">foto</div><div class="p-4"><p class="eyebrow text-xs">tagline</p><h3 class="font-display text-xl">name</h3><p class="mt-1 text-sm text-ink-muted line-clamp-2">blurb</p></div></a>`; mantener el overlay solo desde `sm:`. En `LocaleHome.astro` pasar de `grid-cols-2` a `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (la home EN ya usa 1 columna en móvil). |
| 12 | Hero de región más bajo + dato en el hero | Medio | Chico | `Hero.astro`, `RegionPage.astro` | `height="standard"` en regiones y agregar bajo el subtítulo una línea `photo-title text-sm` con 2 key facts ("Best: Mar–May · 2–4 days") tomados de `data.keyFacts[0]` y `[2]`. LP resuelve la primera pantalla con contenido, no con foto. |
| 13 | Bloque de partner estilo LP para tours | Medio | Chico | `RegionPage.astro` | Kicker "In partnership with GetYourGuide" (`eyebrow`) encima de la grilla `#tours` en lugar de "Hand-picked", con el disclosure largo debajo. Es más honesto que "Hand-picked" cuando los 4 seeds son búsquedas genéricas. |
| 14 | Cuerpo a 18px en artículo | Bajo/Medio | Chico | `global.css` | `body { font-size: 1.125rem }` y `.prose-content p, li { font-size: var(--text-base) }`. Hoy el body es 17px con `--text-base` fluido hasta 20px; los referentes están en 18–20px. Cambio pequeño, pero afecta todas las páginas. |

### No vale la pena

- **Mapa Stay22** (`Stay22Map.astro`): ya está gateado por `STAY22_AID`; sin ID no renderiza y está bien así. No agregar Google Maps embebido: solo 2 de 14 referentes tienen mapa y ninguno lo usa para vender.
- **Ratings/precios en tarjetas sin API**: no inventar. GYG y Booking los muestran porque son los dueños del dato.
- **Ken Burns y scroll-reveal**: están bien implementados pero no los tiene ningún referente y no mueven conversión. No invertir más; tampoco sacarlos.
- **Newsletter**: Time Out, Culture Trip, LP y Nomadic Matt la tienen, pero es un modelo de audiencia propia. Sin un lead magnet real es un widget más.
- **Listicle numerado en regiones**: el contenido de región es guía, no lista. Aplica a "things to do" solamente si se crea ese tipo de página.
- **Sacar el StickyCTA móvil**: ningún referente lo tiene, pero tampoco hay dato en contra. Medir clics cuando haya IDs y decidir con números.

---

## 4. Paleta y tipografía

### Veredicto sobre lo actual
- **Paleta** (`global.css`): arena `#faf8f5`, tinta `#1f2421`, azul `#1a6985`, oro `#c8a951`. Funciona: contraste de texto sobre arena ≈ 15:1, azul sobre blanco ≈ 5.9:1 (AA para texto normal). Es la misma dirección que Tourist Israel (crema `#FDFCED`) pero con más disciplina. No cambiar. Única observación: el oro solo se usa en badges de "Luxury" y blockquotes; o se usa más (kicker de sección, iconos del StickyCTA) o se saca del sistema.
- **Playfair Display + Source Sans 3**: contra la muestra, el sitio es el único junto a CNT que usa serif para títulos. Eso lo separa de los blogs (Oswald/Fjalla/Bebas) y lo acerca a la revista. Es una decisión válida y coherente con `--radius-card` y las sombras. **Conviene mantenerla**, con dos ajustes: (a) Playfair a 700 en H2 de 28px es pesada; probar 600 (ya está importado) para H2/H3 y dejar 700 solo en H1; (b) `letter-spacing: -0.01em` en h1–h4 está bien, pero el H1 de hero fuerza `-0.02em` inline (`Hero.astro`); mover eso a un token `--tracking-display` en `global.css`.
- **Cuerpo**: 17px/1.7 es correcto; el borde inferior de la muestra es 16px (Earth Trekkers, Culture Trip, Atlas) y la mediana 18px. Subir a 18px es opcional (mejora 14).

### Hebreo (RTL)
Playfair Display y Source Sans 3 no tienen glifos hebreos; sin par hebreo el navegador cae a Arial/Times y el look se rompe en todas las páginas `/he/`. El diff sin commit que hay en el working tree ya resuelve esto en `global.css`: `html[lang='he']` re-apunta `--font-display` a **Frank Ruhl Libre Variable** y `--font-body` a **Heebo Variable**, con `letter-spacing: 0` y sin itálica sintética. Veredicto sobre esa elección:

| Rol | Lo que hay en el diff | Veredicto |
|---|---|---|
| Títulos | Frank Ruhl Libre (variable) | Correcto. Es el serif hebreo con más carácter y latín incluido; el equivalente más cercano al contraste de Playfair. Noto Serif Hebrew sería más neutro y peor. |
| Cuerpo | Heebo (variable) | Aceptable, pero Heebo deriva de Roboto: más geométrica y fría que Source Sans. **Assistant** (`@fontsource-variable/assistant`, 200–800) es la adaptación hebrea de Source Sans Pro y mantiene la misma voz humanista en `/he/`. Si el diff todavía no está commiteado, cambiar Heebo por Assistant cuesta dos líneas; si ya está, no vale la pena reabrirlo. |
| Mecánica | Tokens bajo `html[lang='he']`, `unicode-range` para no bajar los woff2 en otros idiomas, propiedades lógicas (`padding-inline-start`, `text-align: start`, `start-3`, `end-0`), `rtl:rotate-180` en la flecha de `DestinationCard` | Es la forma correcta; no requiere tocar componentes. Quedan físicas en `Breadcrumbs.astro`, `BestTimeTable.astro` y `TourVerdict.astro` (`text-left`, `ml-auto`, `pl-`) y el chevron de `Hero.astro`; revisar antes de publicar `/he/`. |
