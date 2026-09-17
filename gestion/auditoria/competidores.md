# Competidores — estudio de mercado

**Fecha**: 2026-09-17. **Para**: Sebastian. **Método**: cuatro relevamientos en paralelo el mismo día (fetch del HTML crudo con UA de Chrome, WebFetch, navegador headless para lo que es React o móvil, búsqueda web). Tráfico: SimilarWeb versión gratuita (dato de agosto 2026), HypeStat (estimaciones de terceros, fiabilidad baja, a veces con años de atraso) y cifras que los propios sitios publican. Semrush devolvió 404 en todos los dominios. Conteo de partners = ocurrencias de la cadena (getyourguide, viator, booking, civitatis, tiqets, amazon, iati, heymondo, holafly…) en el HTML crudo: incluye scripts y footer, no son "links únicos".

**Qué no repite este informe**: las cifras de facturación de blogs comparables (Never Ending Footsteps, Salt in our Hair, Two Wandering Soles, Top Travel Sights, Hannah on Horizon, Living the Dream) y las comisiones de cada programa están en `gestion/negocio/benchmarks.md`, secciones 1 y 2. El análisis fino de tipografía, TOC, disclosure y byline de Lonely Planet, Time Out, Nomadic Matt, Earth Trekkers, Never Ending Footsteps, Salt in our Hair, Tourist Israel, Atlas Obscura, GetYourGuide y Booking está en `gestion/auditoria/diseno-referentes.md`, sección 1. Acá se extiende con lo que faltaba (hero, menú, tarjetas, monetización, móvil, tráfico) y se agregan los que no estaban.

**Advertencia sobre SimilarWeb**: la versión gratuita muestra un "Total visits" que el resumen etiqueta como "últimos 3 meses" pero que, comparado contra Semrush donde hubo dato (Viajeros Callejeros: 3,8M SimilarWeb vs 1,68M Semrush julio; Sommertage 141,9K vs 103,9K), se comporta como cifra mensual inflada. Dos relevadores leyeron el mismo número de dos formas distintas para Secret Tel Aviv, Bein Harim y Abraham. **Tomar todas las cifras como orden de magnitud, con un margen de ×3 hacia abajo.**

---

## 0. Resumen en diez líneas

1. **Nadie combina las cuatro cosas**: contenido de guía en 5 idiomas + widgets de tours con precio real + autor visible + fecha de actualización. Nosotros tenemos la primera y la última; las del medio (widgets con ID, autor con nombre) todavía no. El Ministerio (goisrael.com) tiene 8 idiomas pero cero monetización, contenido de 2019 y ~11–17K visitas/mes. Tourist Israel tiene la mejor UX de venta pero solo inglés. Petit Futé y Civitatis son multi-idioma pero directorio/marketplace, no guía.
2. **El mercado en inglés está en manos de operadores, no de afiliados**: Tourist Israel (~105K visitas/mes, DR 69, vende tours propios), Bein Harim (~14–42K), Abraham. Los blogs de nicho de afiliados están muertos o cerrando (Israel Travel Secrets cerró el 4-sep-2026; israelbyfoot.com está en venta), o son de una persona con Booking vía Travelpayouts y Ko-fi (Backpack Israel).
3. **Los medios grandes abandonaron Israel**: Time Out Israel tiene artículos de 2022 y 0 links de afiliado (`numAffiliateLinksOnPage: 0` en su dataLayer); Lonely Planet tiene una página país sin texto editorial; Israel21c ya no existe; Culture Trip tiene contenido de 2020; The Planet D tiene un top 10 sin monetizar. Ninguno de los blogs genéricos (Blonde Abroad, Two Wandering Soles, Along Dusty Roads, Wandering Wheatleys) tiene guía de Israel.
4. **En español el estándar es una batería fija**: Civitatis (aid propio) + Booking + seguro con código de 5% (IATI o Heymondo) + Holafly eSIM + Skyscanner, repetida en cada post. Viajeros Callejeros (1,7–3,8M visitas/mes en todo el sitio) rankea con un viaje de 2012 reciclado. Nosotros no tenemos ni seguro ni eSIM ni códigos.
5. **En alemán mandan GetYourGuide con widgets nativos** (Sommertage, 28 menciones en la landing de Israel), Booking, Skyscanner, Airalo, y la marca obligatoria "enthält Werbung". En francés mandan Routard y Petit Futé con guías 2019–2023: hueco claro para una guía FR actualizada.
6. **Hebreo no es mercado receptivo**: tiuli.com (418K visitas/mes) y masa.co.il (~130K) son turismo interno. Nuestra versión HE compite contra eso, no contra afiliados. Ojo con dónde ponemos el esfuerzo.
7. **Todo el tráfico de Israel cayó 10–29% en agosto 2026 vs julio** (SimilarWeb): es el efecto guerra que ya está en benchmarks.md §5. No es culpa de nadie; es el mercado.
8. **Lo que rinde de verdad en sitios de una persona es la persona**: Backpack Israel (guía certificado con cara en el hero), Real Greek Experiences ("nacida en Atenas"), Julie Dawn Fox (servicios de planificación + códigos FOX10), Greece Travel Secrets (página de códigos de descuento negociados con 16 operadores chicos). Todos convierten tráfico informativo en servicio propio, no solo en comisión.
9. **El único dato duro de ingresos por reserva de un sitio chico es Petra On The Way**: ~€8 por reserva de GetYourGuide en 2025 (ya en benchmarks.md). El único income report de un sitio nuevo es Bachelor of Travel: **US$38,56 en agosto 2025 con 4.000 sesiones y 120 posts**. Ese es nuestro punto de partida realista, no Nomadic Matt.
10. **Veredicto corto**: tenemos la estructura de un sitio que factura y ninguna de las tres cosas que hacen facturar: IDs cargados, una cara con nombre, y medición de qué caja convierte. Detalle en §4.

---

## 1. Los principales players

Cifras de tráfico: SimilarWeb versión gratuita, dato de agosto 2026, consultado 2026-09-17, salvo que se indique otra fuente. Facturación: estimación por tráfico × RPM de afiliados US$3–15 por 1.000 visitas (rango de benchmarks.md §1), **solo para sitios cuyo modelo es afiliación**; para operadores, editoriales y organismos públicos no hay base y se dice.

### 1.1 Oficiales

| Sitio | Qué es | Idiomas | Tráfico estimado | Modelo | Facturación |
|---|---|---|---|---|---|
| goisrael.com | Ministerio de Turismo, SPA React, versión geo-localizada | EN, DE, FR, ES, IT, RU, PT, AR (sin hebreo) | ~11,3K/mes (SimilarWeb; HypeStat decía 463K en 2018, obsoleto) | Institucional; deriva a operadores del país del visitante | Sin base (público) |
| israel.travel | Segundo sitio del Ministerio, WordPress, meta description habla de 2019 | Solo EN (es.israel.travel devuelve cPanel) | ~16,5K/mes (SimilarWeb); HypeStat 79K | Institucional; "deals" de operadores (US$1.495–4.159) con logo de Booking/Expedia sin afiliación visible | Sin base |
| itraveljerusalem.com | Portal oficial de Jerusalén (JDA + Ministerio + Municipalidad) | HE, EN | ~90K/mes (SimilarWeb; Ahrefs 76,8K orgánico, DR 56) | Público, pero **revende tours de Bein Harim por afiliación** (35 ocurrencias de `affiliate_id=1264` en el HTML) | Sin base |

### 1.2 Medios grandes con sección Israel

| Sitio | Qué es | Idiomas | Tráfico estimado | Modelo | Facturación |
|---|---|---|---|---|---|
| lonelyplanet.com/destinations/israel | Página país de LP (Red Ventures), Astro + Shopify | EN | Sección: sin dato. Dominio ~3,1M/mes (HypeStat) | Widget GetYourGuide (ID MH9NGR8, 3 ítems) + 4 slots de ads + tienda (560 links a shop) + Elsewhere (sin Israel) | Sin base para la sección |
| timeout.com/israel | Sección país de Time Out Group | EN (timeout.co.il es otro dominio, hebreo, ~779K/mes) | Sección: sin dato. Dominio ~12,5M/mes | Display (Rubicon) + newsletter. **0 links de afiliado en Israel** | Sin base |
| lonelyplanet.es (Israel y los Territorios Palestinos) | Edición española (geoPlaneta) | ES | ~110,6K/mes (todo el dominio) | Venta de guía (26,90 €) + widget Booking + display; contenido 2017–2020 | Sin base (editorial) |
| routard.com (Israël, Palestine) | Guide du Routard (Hachette) | FR | ~2,6M/mes (SimilarWeb); Semrush 1,74M (jun-26) | Venta de guía 2022/23 + afiliación (IATI 23, Rentalcars 6, Booking 5, Civitatis 3) + display + foros | Sin base |
| petitfute.com/p155-israel | Editor de guías, fichas por localidad | FR, EN, ES, DE, ZH (hreflang) | ~4,6M/mes (SimilarWeb); Semrush 2,8M | Venta de guía "2019/2020" + display + fichas pagas + Booking/Expedia marginal | Sin base |
| atlasobscura.com/things-to-do/israel | Directorio de lugares, 88 ítems, "Updated July 29, 2026" | EN | Sección: sin dato. Dominio ~3M/mes (HypeStat) | Widget GetYourGuide (ID 1SQ97RY, 4 ítems) + ads + membresía + newsletter | Sin base |
| theculturetrip.com/asia/israel | Culture Trip (UK); la URL /middle-east/israel da 404 | EN | No verificado | Afiliación de hoteles + Trips propios (ninguno de Israel); contenido 2020 | Sin base |
| israel21c.org | **Ya no existe**: 301 a unpacked.media/israel21c (OpenDor Media). Archivo en archive.israel21c.org | EN | No aplica | Non-profit, donaciones | No aplica |
| civitatis.com/es/jerusalen | OTA de tours en español (Madrid) | ES, EN, FR, IT, PT + variantes AR/MX | 8,1M/mes (todo el dominio; 49% España, 5,4% Argentina) | Marketplace; es el partner que usan casi todos los blogs ES | Sin base (marketplace) |

### 1.3 Operadores israelíes con contenido (los que facturan de verdad)

| Sitio | Qué es | Idiomas | Tráfico estimado | Modelo | Facturación |
|---|---|---|---|---|---|
| touristisrael.com | DMC fundado en 2008 como sitio de contenido, hoy "parte del Mondarine Travel Collective"; 150 empleados según ellos | EN, 6 monedas | ~104,7K/mes (SimilarWeb, −15,8% m/m; 70% orgánico; DR 69, 72K orgánico según Ahrefs). HypeStat 209K | Venta directa de tours, paquetes, transfers, hoteles. **0 afiliados** (ellos son proveedor en GetYourGuide) | Sin base. Claim propio: "150.000 personas viajan con nosotros al año"; a US$69 el tour más barato serían ~US$10M solo en tours de día. Es marketing, no dato |
| beinharimtours.com | Operador (Tel Aviv), blog con bylines | EN, ES, DE, FR | 41,9K (SimilarWeb; leído como ~14K/mes si es trimestral); Ahrefs 16,2K orgánico, DR 41 | Tours propios + **programa de afiliados público: 15%, cookie 90 días, ShareASale ID 48735 o directo** | Sin base |
| abrahamtours.com | Operador + hostels (Tel Aviv, Eilat, Bohol Filipinas) | EN, precios en ILS | ~8,2K/mes (SimilarWeb; 29% Filipinas) | Tours propios + hostels + programa de afiliados (TourCMS, comisión no publicada, mínimo 1.000 ILS) | Sin base |

### 1.4 Blogs de nicho sobre Israel en inglés

| Sitio | Qué es | Tráfico estimado | Modelo | Facturación estimada |
|---|---|---|---|---|
| backpackisrael.com | Lior, israelí, guía certificado desde 2019, blog desde 2016 | Sin cifra en SimilarWeb (rank #2.053.933, 66% EE. UU.); HypeStat jul-2023 ~29,6K/mes; inferencia por rank 8–15K | Tours privados + planificación + Booking vía Travelpayouts + Ko-fi | US$24–225/mes por afiliados (inferencia por rank); tours: sin base |
| hike-israel.com (ex israelbyfoot.com, hoy en venta en GoDaddy) | Erez Speiser, senderismo autoguiado, desde 2018 | Sin cifra (rank #1.970.824, 50% EE. UU., 37% Israel); inferencia 8–15K | Mapas + tracks GPS a US$5, treks inn-to-inn, consultoría, Ezoic/AdSense | US$24–225/mes por ads+afiliados; mapas: sin base |
| funinjerusalem.com | Joanna Shebson, directorio de actividades para familias en Jerusalén | ~25,7K/mes (SimilarWeb, −28,7% m/m; 5 págs/visita, 3:20 min). Claim propio: 40.000/mes | **Listados pagos a proveedores** (B2B), 0 afiliados | Sin base (precios a pedido). Si fuera afiliado: US$77–385/mes |
| secrettelaviv.com | Comunidad anglófona de Tel Aviv (Secret Garden Media, desde 2011), 500K miembros según ellos | 110K (SimilarWeb; ~37K/mes si es trimestral; 64% Israel); HypeStat 388K (2020) | Ads (Advanced Ads) + jobs board + afiliados en guías hijas de hoteles + app | US$110–1.650/mes por ads/afiliados según lectura del tráfico; jobs y partners: sin base |
| easttowestrms.com (sección Israel) | Rachel Shulman, blog personal multi-destino, vive en Tel Aviv | ~4,9K/mes (todo el sitio) | Amazon (9 links), World Nomads, Abraham Hostels `ref=15` | US$15–74/mes (todo el sitio) |
| israel-travel-secrets.com | Lisa Erez; **cerrado**, anuncio fechado 4-sep-2026 | ~6K/mes residual | Histórico: tours hand-picked (no verificado) | Residual |
| Buscados y no encontrados | "Jerusalem Traveller", "Wander Israel": sin resultados. "Israel with kids": solo posts sueltos en blogs generalistas. Blogs de comida de Tel Aviv: bestrestaurantsintelaviv.com muerto (2019), deliciousisrael.com parado (mar-2024) | — | — | — |

### 1.5 Español

| Sitio | Qué es | Tráfico estimado | Partners (ocurrencias HTML) | Facturación estimada (todo el sitio) |
|---|---|---|---|---|
| viajeroscallejeros.com (Israel) | Vane y Roger (Barcelona), cientos de destinos con plantilla idéntica | 3,8M (SimilarWeb) / 1,68M (Semrush jul-26); 78% orgánico; 83,6% España, 4,5% Argentina | Holafly 23 (código 5%), Civitatis 17 (aid=1051), Heymondo 11, Skyscanner 5, Booking 4, Klook 2 | US$5.000–57.000/mes (rango enorme; Israel es una fracción). Sin income report |
| viajes.chavetas.es (guía Israel y Palestina) | Isaac y Paula, desde 2006; diario de 2013 | ~107,5K/mes; 66,7% orgánico | IATI 28, Holafly 24, Civitatis 17 (aid=1029), Tiqets 14, Rentalcars 13, Booking 2. **Miden clics por caja** (14 eventos `affiliate` con `localizacion_afiliado`) | US$300–1.600/mes |
| losviajesdedomi.com (qué ver en Israel) | Domi Ramos (Sevilla), desde 2013; seguros como producto ancla | ~89,2K/mes; 81% orgánico; 57,8% España + Perú, México, Colombia, Argentina | IATI 24, Civitatis 22 (aid=1810), Booking 7 (widgets por ciudad), DiscoverCars, Skyscanner | US$270–1.300/mes; probablemente más por ticket de seguros |
| monoviajero.com/guia-israel | Guía país | No verificado | Chapka 8, Skyscanner 6, Holafly 6, Civitatis 6, Booking 4, IATI 4 | Sin base |
| Otros vistos, no analizados | mibauldeblogs.com, losviajesdemary.com, vdeviajar.com, viajeconpablo.com, locosxlosviajes.com, undiaporelmundo.com, tatianamastroiani.com, cronicoviajero.com, greca.co (agencia) | — | — | — |

### 1.6 Francés

| Sitio | Qué es | Tráfico | Modelo |
|---|---|---|---|
| routard.com | Ver 1.2 | ~2,6M/mes | Guía + afiliación + foros |
| petitfute.com | Ver 1.2 | ~4,6M/mes | Guía + directorio |
| guide-israel.info | Isabelle Cohen, guía francófona privada en Jerusalén; blog 2014–2026 | Sin dato (bajo el umbral de SimilarWeb) | Tours privados + libro infantil (69 ILS); Booking 3, Amazon 2, IATI 2 |
| Otros vistos | lustinherworld.com/fr/blog/israel, gtla.net, visiterisrael.home.blog, passporterapp.com. "voyage-israel.com" e "israel-voyage": no aparecieron | — | — |

### 1.7 Alemán

| Sitio | Qué es | Tráfico | Partners | Facturación estimada (todo el sitio) |
|---|---|---|---|---|
| sommertage.com/reiseblog/israel | Pareja austríaca; DE con toggle EN | 141,9K (SimilarWeb) / 103,9K (Semrush jul-26, +143% m/m, Authority Score 42); 34% DE, 9,6% EE. UU. | **GetYourGuide 28 con `widget.getyourguide.com` y `data-gyg-href`** (widgets nativos) | US$300–2.100/mes |
| kommwirmachendaseinfach.de/land/israel | Bolle y Marco, hub con 15 posts prácticos (Einreise, Kosten, Sicherheit, Mietwagen) | ~127,8K/mes; 71% orgánico; 83% DE | GetYourGuide 11, Amazon 9, Airalo 4, Skyscanner 2, Booking 1; links con asterisco y "enthält Werbung" | US$400–1.900/mes |
| viel-unterwegs.de/reiseziele/israel | Katrin Lehr; "Updated 25-07-2023" | ~102,2K/mes; 68% orgánico | GYG 3, Skyscanner 3, Booking 2, Amazon 2, Airalo 2 (código VU10), Check24, TF Bank Mastercard, Go City | US$300–1.500/mes |
| Otros vistos | woanderssein.com/reisetipp/israel, meikereist.de/israel-rundreise, travelingisrael.com/israel-reisetipps (guía israelí licenciado con versión DE). "israel-reise", "reisen-israel", "Israelmagazin": no aparecieron | — | — | — |

### 1.8 Hebreo

No hay sitios de turismo receptivo en hebreo para turistas del exterior. El hebreo es turismo interno: **tiuli.com** (grupo Lametayel; solo hebreo; Semrush 418,5K visitas jul-26; reservas, cupones, listados pagos) y **masa.co.il** (~130K/mes, 87,6% Israel; mapas, guías, seguros, hoteles). israelhiking.osm.org.il es un mapa, no un medio. Lo más cercano a "receptivo en hebreo" son operadores que venden tours a israelíes que reciben visitas (beetravel.co.il, israeliguide.co.il, check-in-out.com). El propio Ministerio no tiene versión hebrea de goisrael.com. **Conclusión**: nuestra versión HE compite con contenido interno de tiuli y masa, no con afiliados; no es donde se gana plata con Booking y GetYourGuide.

### 1.9 Sitios genéricos de afiliados con sección Israel

| Sitio | Estado de la cobertura de Israel | Tráfico (todo el sitio) | Facturación estimada |
|---|---|---|---|
| nomadicmatt.com | Guía viva, "Updated February 3, 2026" (ya en diseno-referentes.md) | ~236,2K/mes (SimilarWeb; HypeStat 319K abr-26) | Sin income report reciente |
| earthtrekkers.com | 30 things to do Jerusalem, "Last updated Dec 3, 2025" (ya en diseno-referentes.md) | ~376,7K/mes (−10,9% m/m) | Sin income report |
| theplanetd.com | Un "Top 10 Things to Do in Israel" con fecha refrescada (mar-2024) y comentarios 2017–2021; **0 afiliados** en el post. About dice "1M personas/mes"; SimilarWeb ~37,4K | ~37,4K/mes (−9,9% m/m) | US$100–560/mes; el negocio fue sponsorship |
| theblondeabroad.com | **No tiene Israel** (la guía de Medio Oriente lista Egipto, Jordania, Turquía, EAU) | ~141,2K/mes (−11,8% m/m) | US$400–2.100/mes por afiliación; vive de presets y shop |
| twowanderingsoles.com | **No tiene Israel** (solo Mar Muerto lado Jordania; Booking 11, DiscoverCars 3, GYG 2 en ese post) | ~67,1K/mes (−10% m/m). Income reports hasta Q4 2019 (US$74K/trimestre, ya en benchmarks.md) | US$200–1.000/mes hoy; los reports de 2019 no son extrapolables |
| alongdustyroads.com, wanderingwheatleys.com | **No tienen Israel** (solo Jordania) | — | — |

---

## 2. Análisis de diseño, uno por uno

Formato uniforme. Móvil: solo Tourist Israel se vio renderizado a 375 px; en el resto se infiere de clases del HTML y se marca. "KB" = tamaño del HTML que devolvió el servidor, sin imágenes ni JS. Lo que ya está en diseno-referentes.md (tipografía, TOC, disclosure) no se repite.

### 2.1 Tourist Israel — touristisrael.com

- **Hero**: foto de callejón de piedra de la Ciudad Vieja sobre fondo amarillo. Texto en Bebas: "OVER 150,000 PEOPLE VISIT ISRAEL WITH US EVERY YEAR. LET US MAKE YOUR TRIP PERFECT". Debajo, **buscador tipo OTA** con radio Tours / Packages / Hotels, input "Where would you like to go?", botón "SEARCH", y accesos "Tours tomorrow | Tours this weekend | Choose a Date". Franja de logos de prensa. El H1 real está más abajo: "We're Tourist Israel, the Israel tours & travel experts".
- **Navegación**: dos mega-menús. "Israel Tours": por destino (10) × por tipo (Day, Package, Private, Cruise) × punto de partida (Tel Aviv, Jerusalem, Eilat) × servicios (transfers, VIP fast track, auto, transporte privado, seguro). "Package Tours": por tema (Highlights, Christian, Jewish, Budget, Private, Mini) × duración (2 / 3–5 / 6–8 / 9–13 / 14–16 días) × región × multi-país. Buscador sí, breadcrumb sí.
- **Tarjetas**: en región (carrusel Glide.js) foto + título, sin precio, rating ni duración. En el listado de tours (39 en Day Tours): foto, título, badge ("Bestseller", "Recommended for first-time visitors", "Tourist Israel's top pick", "Small Group"), "Starts in Tel Aviv, Jerusalem", días disponibles, "From US$69 Per Person" (inyectado por JS según moneda), botón "See Details". Filtros: fecha, lugares, salida, idioma, duración, tipo, tema, público, orden por precio.
- **Afiliados**: ninguno; venden directo con checkout propio ("START MY BOOKING"). Página de tour: galería, chips de atributos, "from US$69 per person", "ASK A QUESTION", "Instant confirmation", tabs Overview / Itinerary / Availability / Pricing / Important Details, 3 testimonios con nombre y país, bloque "WHY TOURIST ISRAEL?" (Book Direct, 7 Days a Week, Hand Picked Guides, Best Price Guaranteed, Easy Cancellation).
- **Autor / confianza**: sin bylines ni fechas. "Since 2008, over 500,000 visitors", TripAdvisor Certificate of Excellence, widget Tint de reseñas sociales, teléfono, WhatsApp, chat flotante, newsletter, "100% Secure Payment".
- **Móvil (verificado a 375 px)**: header amarillo con logo centrado y hamburguesa; el buscador ocupa la primera pantalla; en página de tour **barra sticky inferior con "START MY BOOKING" + "From US$69/person"**; sub-nav horizontal scrolleable.
- **Velocidad**: 205 KB / 32 scripts (home), 426 KB / 28 (tours). Imágenes vía CDN de Jetpack.
- **Modelo**: operador. Lo que mejor les funciona: la arquitectura destino × tipo × salida × duración captura toda la long-tail; los badges de tarjeta; el sticky de precio en móvil. Debilidad: contenido de destino de 539 palabras, sin autor ni fecha, cero idiomas.

### 2.2 Ministerio de Turismo — goisrael.com e israel.travel

- **Hero (goisrael.com, versión geo "UK")**: playa de Tel Aviv con skyline y bandera. Sin H1 (es una SPA React que sin JS no muestra nada). Primer bloque "COOL INFORMATION" con tarjetas **FLIGHT TIME 4H50 / WATER TEMP 25°C / TEL AVIV 31°C / JERUSALEM 26°C / DEAD SEA 34°C** geo-localizadas. Luego "PLAN YOUR TRIP": Where to go / Things to do / Tourist info / Videos.
- **Hero (israel.travel)**: sin H1; primer H2 "BOOK YOUR HOLIDAY NOW"; meta description "2019's ultimate destination". Seis tarjetas de "deals" de operadores con precio grande (US$1.495 a 4.159) y "BOOK NOW".
- **Navegación**: HOME | WHERE TO GO | THINGS TO DO | GALLERY | VIDEOS | TOURIST INFO + selector país/idioma. Sin buscador, sin breadcrumb.
- **Tarjetas**: carruseles por ciudad con foto + título en mayúsculas + "READ MORE"; 40+ tarjetas "Things to do"; 30+ videos; galería de 150+ fotos de Instagram de celebridades.
- **Afiliados**: ninguno. Logos de Booking y Expedia con link genérico (`label=gen173nr`, no parece afiliado); links a operadores del país del visitante (travelisrael.co.uk, cyplon.co.uk, elal.com/UK).
- **Autor / confianza**: sin bylines ni fechas; footer institucional, oficinas de turismo, estadísticas, créditos de fotógrafos, redes @visit_israel.
- **Móvil**: no verificado.
- **Velocidad**: goisrael.com 27 KB de shell + bundle JS de 1.250 KB; israel.travel 286 KB / 50 scripts.
- **Modelo**: institucional. Lo copiable: la tarjeta de "tiempo de vuelo + temperatura del agua" según de dónde viene el usuario. El resto es contenido viejo.

### 2.3 Lonely Planet — lonelyplanet.com/destinations/israel (extiende diseno-referentes.md)

- **Hero**: H1 "Israel" con tarjeta de producto en el hero: "Lonely Planet's Best in Travel 2026 - Book — Shop $19.99 USD" y botón "App".
- **Navegación**: Destinations (mega-menú por región + Trending) | Books | Trips | Inspiration | Account + buscador.
- **Estructura de la página país** (es corta): "Top places to visit in Israel" (carrusel, 4 por fila, snap scroll) → ads → **"Book popular activities in Israel — in partnership with getyourguide"** → "Israel and beyond" (tarjeta Tel Aviv) → newsletter. En Jerusalén: mismo patrón sin "and beyond". **Cero texto editorial, cero mapa, cero artículos locales.**
- **Tarjetas**: foto + "Attraction in Israel" + título + "Discover" + "Save" (exige login). Sin precio ni rating.
- **Afiliados**: widget oficial `widget.getyourguide.com/default/activities.frame`, `data-gyg-partner-id="MH9NGR8"`, `data-gyg-number-of-items="3"`, `data-gyg-q="Israel"`, `data-gyg-cmp="destination-hub"`. Disclosure debajo, una línea. 4 slots de ads GPT. 560 links a shop.lonelyplanet.com; 128 a elsewhere.io (sin Israel).
- **Autor / confianza**: sin byline ni fecha en país/ciudad.
- **Móvil**: hamburguesa; carruseles con snap. No verificado.
- **Velocidad**: **1.509 KB** de HTML por página (el mega-menú con 560 links viene inline), 32 scripts.
- **Lo copiable**: el bloque "Top places → widget GYG de 3 ítems + disclosure → destino relacionado" es exactamente lo que podemos poner con nuestro partner ID.

### 2.4 Time Out Israel — timeout.com/israel (extiende diseno-referentes.md)

- **Hero**: H1 "Your ultimate guide to Israel"; H2 "Discover the best events, things to do, restaurants, music and nightlife in Israel"; destacado "The best beaches in Israel". CTA: newsletter "Subscribe". Sin buscador visible.
- **Navegación**: Things to do | Restaurants & Cafés | Music & Nightlife | Arts & Culture | Shopping | Hotels | City & Area Guides | LGBTQ | News.
- **Tarjetas**: foto + título + etiqueta de categoría; sin autor, fecha, precio ni rating.
- **Afiliados**: **0**. El dataLayer del artículo dice `"affiliatesOnPage":"","numAffiliateLinksOnPage":0`, aunque lleva el disclaimer estándar "This article includes affiliate links". Slots de ads (Rubicon).
- **Autor / confianza**: byline "Written by Jennifer Greenberg" con perfil; datePublished 2022-03-22, dateModified 2022-03-23. La home menciona cruceros kosher 2020.
- **Móvil**: hamburguesa; no verificado.
- **Velocidad**: 186 KB / 25 scripts (home), 251 KB / 33 (artículo).
- **Lectura**: la marca y el listicle numerado con foto grande funcionan; el contenido está abandonado y sin monetizar. Hueco directo para "things to do in Tel Aviv" actualizado.

### 2.5 Secret Tel Aviv — secrettelaviv.com

- **Hero**: no hay. Logo + mega-menú + feed cronológico. `<h1 id="site-title">` vacío. CTAs: "Subscribe to our EVENTS Newsletter", "Join our facebook GROUP".
- **Navegación**: 7 menús con submenús largos: Calendar (parties, live music, meetups…) | Lifestyle (things to do, dating, tourist tips, learn Hebrew) | Food & Drink (13 subcategorías) | Hotels (por lujo/boutique/playa/hostel y por ciudad) | Tours (Jerusalem, Tel Aviv, Dead Sea, Petra, West Bank, Christian, North) | Jobs | Our Socials. Buscador sí.
- **Tarjetas**: feed: foto + título + categoría + extracto + "Read More" + "7 days ago" + tag de ciudad; 205 páginas de paginación. /tours: 8–9 tarjetas foto + título a guías internas. /hotels → "Top Hotels in Israel 2026": índice de 23 guías por ciudad × estilo.
- **Afiliados**: 0 en índices; en la página de hoteles hay disclosure amigable ("Some links may be affiliate links – they help us keep creating great local guides at no extra cost to you!") y los links están en las guías hijas (no vistas; una dio 404). bit.ly ×5, datenight.ai, app propia.
- **Autor / confianza**: sin bylines; "Last updated September 14th 2026" en posts; "written by locals, regularly updated"; grupo de Facebook de 400–500K; WhatsApp; newsletter semanal; "Advertise With Us".
- **Móvil**: hamburguesa; 12 menciones de WhatsApp. No verificado.
- **Velocidad**: 126–138 KB pero **60 scripts**.
- **Lo copiable**: guías "Best X in Tel Aviv 2026" con año en el título y "last updated" fresco; el índice de hoteles ciudad × estilo como silo de afiliación limpio. Lo no copiable: la comunidad de 14 años.

### 2.6 Bein Harim — beinharimtours.com

- **Hero**: paisaje; H1 "Bein Harim Israel Tours" + "Your Travel, Our Expertise"; CTA azul "Book Now!" repetido.
- **Navegación**: Day Tours | Tour Packages | Custom & Private | Destination (12) | Petra Tours | Shore Excursions | Blog (Activities, Culture, Practical Info, Jordan). Buscador con filtros (tipo, fecha, duración, salida, destino).
- **Tarjetas**: foto, título, **"$75 Per Person", duración ("1 Day")**, botón "Book Now!". 4+ columnas. Precios visibles: Jerusalem Full Day $75; Masada & Dead Sea $115; Caesarea/Acre/Rosh Hanikra $95; Nazareth & Galilee $98.
- **Afiliados**: venta directa. Blog `/news/` con **bylines reales ("By Sarah Mann")** y links a tours dentro de los posts.
- **Autor / confianza**: bylines en blog; TripAdvisor Certificate of Excellence; dirección, teléfono, WhatsApp, "24/7 support"; portal de reservas.
- **Móvil**: no verificado.
- **Velocidad**: 223 KB / 25 scripts, **el más liviano de los operadores**.
- **Modelo**: operador con **programa de afiliados abierto: 15%, cookie 90 días, API, iFrame, ShareASale o directo, pago mensual** (partner-with-us). Hasta el portal oficial de Jerusalén los usa. Es el partner israelí más fácil de integrar y **no está en `src/config/affiliates.ts`** (está Abraham, que no publica comisión). Ver acción 1 en §4.

### 2.7 Backpack Israel — backpackisrael.com

- **Hero**: retrato de Lior. H1 "Shalom and welcome to Backpack Israel!". CTA "Subscribe".
- **Navegación**: Destinations (10) | Travel Tips (8) | Itineraries | Planning Service | My Tours | Contact me | Subscribe. Buscador sí.
- **Tarjetas**: 8 tarjetas de categoría con contador ("Free things to do (61 Posts)", "Hiking in Israel (56)"). En posts, hoteles como links inline en párrafos; 1 mapa de Google embebido.
- **Afiliados**: Booking ×2 vía Travelpayouts (`booking.tpm.li`), Ko-fi ×4, menciones de Vrbo y Airbnb. 0 GetYourGuide/Viator. Disclosure estándar en cada post.
- **Autor / confianza**: byline "by backpackisrael"; **"Published: September 28, 2022 | Updated: September 10, 2026"**; "9 minutes read"; About con bio y credencial de guía certificado; comentarios abiertos.
- **Móvil**: 16 "sticky", 6 "position:fixed", botones de compartir por WhatsApp. No verificado.
- **Velocidad**: 466–485 KB / 67–72 scripts. Pesado.
- **Lo copiable**: cara y credencial en el hero; "Published / Updated" doble y visible; convertir tráfico informativo en servicio propio (planificación + tours) en vez de depender del afiliado.

### 2.8 Viajeros Callejeros — viajeroscallejeros.com (español)

- **Hero**: foto de Jerusalén; H1 "10 consejos para viajar a Israel imprescindibles"; entradilla de una línea; sin CTA en hero (los CTA van dentro del cuerpo: "BUSCA LAS MEJORES OFERTAS DE HOTELES").
- **Navegación**: no legible en el fetch; buscador sí; breadcrumb Home > post. **No hay hub /israel/** (404): organizan por posts enlazados entre sí.
- **Tarjetas**: no hay grilla; lista numerada de 10 consejos; al final, relacionados ("10 lugares que ver en Israel", "…en Jerusalén", "…en Tel Aviv", "free tours en Jerusalén en español", "Israel y Palestina por libre en 12 días").
- **Afiliados**: links inline + **una caja por sección**: vuelos → Skyscanner, hoteles → Booking (aid=393491), coche → AutoEurope, tours → Civitatis (aid=1051), eSIM → Holafly (código VIAJEROSCALLEJEROS 5%), seguro → Heymondo 5%, tarjetas → Revolut/N26.
- **Autor / confianza**: byline "Vane y Roger"; fecha 22-11-2024; el post de 12 días es de 2021 sobre un viaje de dic-2012 / ene-2013.
- **Móvil**: 38 "menu-toggle", 3 "mobile-nav". No verificado.
- **Velocidad**: 379 KB.
- **Lo copiable**: la misma batería de cajas en cada post, con código de descuento propio (el código es también medición). Lo que no: contenido de 2012.

### 2.9 Chavetas — viajes.chavetas.es/guia/israel-palestina (español)

- **Hero**: H1 "Israel y Palestina" + "Planificación paso a paso. Mapas e Itinerarios. Diarios de Viaje". Sin CTA de compra en hero.
- **Navegación**: por continente; buscador; breadcrumb Home | Guía | Israel y Palestina.
- **Tarjetas**: tarjeta destacada del viaje de 11 días; tarjetas de diario día por día (Día 1–11); grilla "Lo mejor de Israel y Palestina" con 15 lugares.
- **Afiliados**: bloque "descuentos" con Booking (aid=392382, "10/15%"), Civitatis (aid=1029, "10–25%"), Tiqets, IATI "5%", Holafly código CHAVETAS, N26, Revolut, Kayak, Rentalcars "15%", GuruWalk, Motorhome Republic, VRBO. **14 eventos `'affiliate','localizacion_afiliado'` en el tracking: miden qué caja convierte.**
- **Autor / confianza**: Isaac Martín; diario de 2013; "©2006–2026 Isaac y Paula"; "Hecho 100% con cariño y corazón, como nunca te lo contará una Inteligencia Artificial".
- **Móvil**: no verificado. **Velocidad**: 261 KB.
- **Lo copiable**: la página-guía país como hub que enlaza diario + "lo mejor de" + bloque de descuentos; y sobre todo **medir clics por ubicación de caja**.

### 2.10 Civitatis Jerusalén — civitatis.com/es/jerusalen (el partner que usan todos en ES)

- **Hero**: banner grande de Jerusalén; H1 "Jerusalén".
- **Navegación**: Nuestros destinos | Civitatis Magazine | Sostenibilidad | Prensa; buscador; breadcrumb Israel > Jerusalén; carrito.
- **Tarjeta de producto** (18 actividades): título, nota "8,2 / 10", "29 opiniones", "414 viajeros", descripción corta, duración "10 horas", idioma, "desde 85 US$", "Cancelación gratuita", corazón, "Ver detalles".
- **Confianza**: "25.443 viajeros ya han disfrutado de este destino", "7,7 / 10 así nos puntúan", opiniones recientes con nombre; footer "9,1/10, +5.000.000 opiniones".
- **Velocidad**: 349 KB.
- **Lección**: es el formato de tarjeta que el lector hispano espera. Nosotros no podemos inventar nota ni "viajeros"; sí podemos mostrar duración, idioma y cancelación (datos estables) y dejar precio y nota al widget/link.

### 2.11 Sommertage — sommertage.com/reiseblog/israel (alemán)

- **Hero**: header "Israel Reiseblog"; H1 "Israel"; CTA formulario de newsletter (nombre, email, consentimiento).
- **Navegación**: Über uns | Reiseziele | Reisearten | Planung & Tipps; buscador modal; breadcrumb Home › Naher Osten › Israel; **toggle DE/EN** (la versión EN trae ~25% del tráfico desde EE. UU./UK).
- **Tarjetas**: 2 (Tel Aviv, Tagesausflug Jerusalem) con etiquetas destino/categoría.
- **Afiliados**: **widgets nativos de GetYourGuide** (28 ocurrencias, `widget.getyourguide.com`, `data-gyg-href`) en la landing por destino. Sin Booking en la landing.
- **Autor / confianza**: sin byline ni fecha en la landing; Impressum y Datenschutz (obligatorios en DE/AT).
- **Móvil**: 8 "sticky". No verificado. **Velocidad**: 308 KB.
- **Lo copiable**: widget GYG en la landing de destino, no solo link de texto.

### 2.12 Routard — routard.com (Israël, Palestine) (francés)

- **Hero**: Muro Occidental con la Cúpula de la Roca; H1 "Voyage Israël, Palestine"; CTA "ACHETER LE GUIDE" (edición 2022/23).
- **Navegación**: Destinations | Inspirations | Réserver | Forums; breadcrumb Guide de voyage > Moyen-Orient > Israël, Palestine.
- **Tarjetas**: grilla "Incontournables" con 13 lugares; grilla "Reportages"; sección "Réserver" con banners Hébergement / Location de voitures / Billets d'avion / Séjours; listados de hoteles por ciudad.
- **Afiliados**: IATI 23, Rentalcars 6, Booking 5, Civitatis 3 (hrefs de partner vía redirect propio).
- **Autor / confianza**: sin byline ni fecha; foros muy activos (transporte, itinerarios, compañeros de viaje) son el UGC que sostiene el tráfico.
- **Velocidad**: 498 KB.
- **Lección**: FR está dominado por marcas editoriales con guías de 2019–2023. Una guía FR de Israel con fecha 2026 y datos de entrada (ETA-IL, seguridad, aerolíneas) no tiene competencia fresca.

### 2.13 Atlas Obscura — atlasobscura.com/things-to-do/israel (extiende diseno-referentes.md)

- **Estructura**: H1 "The Atlas Obscura Guide To Israel"; H2 "88 Cool, Hidden, and Unusual Things to Do in Israel — Updated July 29, 2026". Sub-nav sticky Attractions | Food & Drink | Map | Leaderboards | Stories | Lists.
- **Tarjeta**: foto + ciudad + nombre + frase gancho de una línea ("You can row a boat through this ancient underground reservoir."). **Mapa interactivo** (Apple MapKit). Leaderboard de usuarios (gamificación).
- **Afiliados**: widget GetYourGuide (`data-gyg-partner-id="1SQ97RY"`, 4 ítems) bajo "In partnership with GetYourGuide — Unforgettable Experiences Nearby", antes del mapa. Ads + membresía.
- **Velocidad**: 367 KB / 43 scripts.
- **Lección**: LP y Atlas usan el mismo widget con el mismo patrón (título + 3–4 ítems + disclosure de una línea). Es el estándar de la industria para "tours en X" sin inventar datos.

### Patrones nuevos que no estaban en diseno-referentes.md

1. **Widget nativo de GetYourGuide en la landing de destino** (LP, Atlas Obscura, Sommertage): 3–4 ítems con precio y rating reales del partner, más disclosure de una línea. Es la forma honesta de mostrar precio y rating sin inventarlos.
2. **Batería fija de cajas por post en ES** (Viajeros Callejeros, Chavetas, Domi): vuelos, hotel, coche, tours, eSIM, seguro con código propio. El código es descuento para el lector y atribución para el sitio.
3. **Medición de clics por caja** (Chavetas, 14 eventos con ubicación). Nadie más lo hace visiblemente; nosotros tampoco.
4. **Precio y duración en la tarjeta de tour** (Bein Harim "$75 · 1 Day", Tourist Israel "From US$69", Civitatis "desde 85 US$ · 10 horas"). Los operadores lo tienen porque son dueños del dato; los blogs lo delegan al widget.
5. **Sticky inferior con precio + CTA en móvil** (Tourist Israel, verificado). Nuestro StickyCTA tiene tres botones sin precio; el de ellos tiene un precio y un botón.
6. **"Published / Updated" doble y visible** (Backpack Israel) y **año en el título** ("Best Hotels in Israel 2026", Secret Tel Aviv; "[2026]", We Travel Portugal). Nosotros ya ponemos el año en varios títulos; falta la fecha visible arriba en móvil (ya señalado en diseno-referentes.md).
7. **Tarjeta geo-localizada de "tiempo de vuelo + clima"** (goisrael.com). Simple, y nadie más lo tiene.
8. **Marca "enthält Werbung" y links con asterisco en DE** (los tres blogs alemanes). Es obligación legal en Alemania y Austria; nuestra versión DE no la tiene.

---

## 3. Sitios que están empezando o a nuestro nivel

Ocho sitios de una o dos personas, de un solo país (Jordania, Grecia, Portugal) o de nicho, con lo que hacen bien con pocos recursos. Tráfico: SimilarWeb agosto 2026, consultado 2026-09-17.

| Sitio | Quién | Tráfico | Cómo monetiza | Qué hace bien con pocos recursos |
|---|---|---|---|---|
| **petraontheway.com** (CZ/EN/ES; no es de Jordania, es Petra Větrovská de Praga, multi-destino) | 1 persona | ~85,7K/mes (62% España, 3,9 págs/visita, 3:15 min) | GetYourGuide (text links, widgets, calendarios, banners) + Booking; **€8 promedio por reserva GYG en 2025** (dato ya en benchmarks.md) | Cara y nombre en cada artículo con contador "59 países / 84 artículos"; **tagging propio de campañas GYG (WEB–Artículo–Actividad–Tipo de link)** para saber qué convierte; trilingüe con switcher en footer; TOC, tiempo de lectura y mapas de Google embebidos |
| **jordantraveler.com** | Valerie (The Kolibro Group LLC, varios sitios de nicho) | ~8,4K/mes (29% EE. UU., 27% UK, 22% Jordania); bounce 57% | Booking (aid=1633261) + Hotels.com + venta de su propio tour grupal 1–2 veces al año | **Tabla "día × actividad" al inicio de cada itinerario**; rango de precio de hotel por noche ("$89–$149") al lado de cada recomendación; "published July 2021 / updated March 2024"; responde 20+ comentarios por post |
| **realgreekexperiences.com** | Vanessa Foudouli, ateniense, desde 2016, full-time desde 2018 | Sin cifra (rank #4,7M) | Ferryhopper + Ferryscanner en paralelo, GYG, Viator, Booking, DiscoverCars, Welcome Pickups, Amazon (libros propios) + planificación por mail + walking tours propios | "Nacida en Atenas" como marca en cada página; dos afiliados de ferries en el artículo que lo necesita; **doble embudo: tour propio y, si no hay fecha, GYG**; CTA principal = mail para itinerario a medida, sin herramienta cara |
| **greecetravelsecrets.com** | Sandy Papas (Brisbane) + John; "9 partners locales" | ~41,3K/mes (58% EE. UU.) | GYG (12 links por itinerario), Booking (15+), Ferryhopper, Viator + consultas privadas pagas + retiros hosteados 2027 + **página "Discount Codes" con 16 operadores chicos al 5–15%** | La página de códigos es un activo propio: negocia 10% con operadores locales y se vuelve "el lugar" antes de reservar; "FREE ITINERARY" como lead magnet en el menú; "300+ consultas cara a cara" como prueba social sin reseñas; escalera post gratis → código → consulta paga → retiro |
| **greeceandbeyond.com** | Chrysoula, ateniense, "casi una década" | Sin cifra (rank #8,25M, 1,11 págs/visita) | Itinerarios a medida + transfers privados (comisión con operador, no verificado) | **Ejemplo de lo que no alcanza**: local con nombre, 6 destinos en tarjetas, dos CTAs de servicio, pero sin fecha "updated", sin disclosure, sin buscador, y rank de 8 millones |
| **portugalist.com** | James Cave, desde 2016 | ~69,5K/mes (26% EE. UU.); en 2019 dijo 100K/mes en entrevista con Mediavine | Antes ads (Mediavine desde jun-2018; "los afiliados de hoteles no alcanzaban para vivir") + hoy leads de relocación + libro + podcast | **Pivot de "qué ver" (saturado, RPM bajo porque el tráfico venía de Portugal) a "cómo mudarse" (intención alta, servicios que pagan)**; 152 reseñas de Google embebidas con nombre; logos de NYT/Forbes arriba del fold; "consulta gratuita" como captura de lead |
| **juliedawnfox.com** | Julie Dawn Fox, británica en Portugal desde 2007, blog desde 2010 | ~49,3K/mes (33% EE. UU., 12% UK); una entrevista vieja decía 12K/mes | Servicios pagos (consulta, revisión de itinerario, itinerario a medida) + tienda de itinerarios DIY + Viator (~8 en un post), GYG, operadores directos con **códigos FOX5 / FOX10** + newsletter | **Cada artículo de tours termina en una caja comparativa "Which X tour is best for you?" con 3–4 opciones y botón** (es lo que hacen nuestras guías comparativas, con mejor cierre); "Starter Pack" gratis en el menú; disclosure uniforme y "Last updated May 2026" en cada página |
| **wetravelportugal.com** | Ana Veiga + Ollie Richards, Lisboa, desde 2018 | ~43,1K/mes (+8% m/m; 29% EE. UU., 18% UK) | GYG (5+ por guía), Booking/Stay22, Viator + itinerarios personalizados + newsletter semanal | **Fotografía propia como diferencial en el H1** ("Go Beyond the Usual Portugal Guide", contraste directo con stock); guías "ultimate" por pueblo con "[2026]" en el título, TOC y precios "desde" en texto; Stay22 para hoteles sin armar widgets; menú regional profundo que ordena 80+ páginas |

**Benchmark de ingresos de sitios nuevos** (complementa benchmarks.md §1, que ya tiene Top Travel Sights, Hannah on Horizon y Living the Dream):

- **Bachelor of Travel** (Rania Kalogirou, 1 persona, relanzado jul-2025): **agosto 2025 = US$38,56** (GetYourGuide 20,50; DiscoverCars 9,84; Stay22 7,61; Amazon 0,61) con ~4.000 sesiones y 120 posts. Fuente: bacheloroftravel.com/travel-blog-income-report-august-2025 (2026-09-17). Es el punto de partida más parecido al nuestro.
- Regla práctica que sale de Top Travel Sights: ~€100 por trimestre de GetYourGuide con 25K usuarios/mes multi-destino.
- Living the Dream: el 90% de sus US$10.800 viene del blog **hiperlocal** de Pittsburgh (140K páginas vistas), no del blog global de viajes (24K). Lo hiperlocal monetiza mejor que lo genérico.
- Escalera de redes de ads que citan varios: AdSense → Ezoic (10K sesiones) → Mediavine (50K) → Raptive (100K). No verificado contra las páginas oficiales.

Descartados: portugalthings.com (2 personas, sin afiliados visibles, sin datos), greeking.me (agencia con licencia, no blog), greecetravelideas.com (error SSL), greekingit.com (no existe).

---

## 4. Nosotros contra ellos

Datos nuestros al 2026-09-17: 163 páginas públicas en 5 idiomas (EN base + FR, DE, ES, HE), 7 regiones, 19 guías, 2 itinerarios (7 y 10 días), 32 fotos con crédito (stock: Pexels, Wikimedia, Unsplash), un solo autor genérico ("The Visit Israel Editorial Team", avatar "VI"), sin reseñas, sin tours propios, sin widgets de tours (links limpios sin ID, modo pre-aprobación), 11 partners definidos en `src/config/affiliates.ts` y 0 IDs cargados, guías comparativas de tours con `TourVerdict`, `KeyFacts`, `BestTimeTable`, `Toc`, `BookYourTrip`, `StickyCTA` móvil, FAQ con JSON-LD, búsqueda Pagefind, fuentes self-hosted, HTML liviano. Jerusalén EN ~2.600 palabras; traducciones de región a un tercio (diseno-referentes.md §2).

### 4.1 Tabla comparativa

| Criterio | Tourist Israel | Lonely Planet / Atlas | Blogs ES (Callejeros, Chavetas, Domi) | Blogs DE (Sommertage, KWMDE) | Blogs chicos que funcionan (Backpack Israel, Julie Dawn Fox, Greece Travel Secrets) | **visitisrael.site** |
|---|---|---|---|---|---|---|
| Idiomas | 1 | 1 | 1 | 1 (Sommertage 2) | 1 (Petra 3) | **5** |
| Contenido de guía (palabras por destino) | ~540 | ~0 (solo tarjetas) | 1.500–3.000, viejo (2012–2013) | 1.000–2.000, "Stand 2023" | 2.000–4.000, "updated 2026" | ~2.600 EN; **600–800 en FR/DE/ES** |
| Fecha "updated" visible arriba | No | Atlas sí; LP no | Publicación sí, viaje viejo | Sí (2023) | **Sí, published + updated** | Byline existe; en móvil queda bajo el hero |
| Autor con nombre y cara | No (testimonios) | No | Sí (pareja, sin cara en post) | Sí | **Sí, con credencial** | **No** (equipo genérico) |
| Reseñas / prueba social | TripAdvisor, testimonios, "500.000 visitantes" | "Save", leaderboard | Comentarios | Comentarios | Google Reviews (Portugalist 152), "300 consultas", comentarios | **Nada** |
| Precio y rating en tarjeta de tour | Sí (propio) | **Sí (widget GYG)** | Vía Civitatis (link) | **Sí (widget GYG)** | Vía links; Julie: caja comparativa | **No** ("Live prices on GetYourGuide") |
| Partners activos | 0 (vende) | GYG | Civitatis, Booking, IATI/Heymondo, Holafly, Skyscanner, Tiqets | GYG, Booking, Skyscanner, Airalo, Amazon | GYG, Viator, Booking, Stay22, DiscoverCars, operadores con código | **11 definidos, 0 con ID** |
| Seguro / eSIM / auto con código | Seguro propio | No | **Sí, los tres, con código 5%** | eSIM (código), auto, tarjeta bancaria | Códigos con operadores locales | SafetyWing, Airalo y Rentalcars en config, **sin ID ni código** |
| Medición de clics por caja | Sí (VWO) | Sí (tagular) | **Chavetas: 14 eventos por ubicación** | No visible | Petra: tagging de campañas GYG | **No** (Vercel Analytics sin eventos) |
| Widget / bloque "in partnership with" | No | **Sí** | Cajas | **Sí** | Cajas comparativas | `BookYourTrip` + `AffiliateCard` con links limpios |
| Sticky CTA móvil | **Sí, con precio** | No | No | No | No | Sí, 3 botones sin precio |
| Fotos | Propias | Propias / agencia | Propias | Propias | **Propias, como diferencial** | **Stock con crédito** |
| Servicio propio (tours, planificación, códigos) | Todo | Libros, trips | No | Shop, podcast | **Sí: planificación, tours, códigos** | No (propuesta Mariluz en `gestion/negocio/`) |
| Peso HTML / scripts | 205 KB / 32 | 1.509 KB / 32 | 261–379 KB | 253–308 KB | 166–485 KB / hasta 72 scripts | **Liviano, self-hosted** |
| Tráfico (ago-2026) | ~105K | Sección: sin dato | 90K–3,8M | 100–140K | 8–86K | **Sin medición** |

### 4.2 Qué nos falta y qué nos sobra

**Falta** (en orden de cuánto afecta la caja):
1. IDs de afiliado. Sin eso, el resto de la tabla es decorativo. Incluye Booking vía CJ/Awin (el programa directo cerró en junio 2025, benchmarks.md §2) y Bein Harim (15% / 90 días, no está en `affiliates.ts`).
2. Una persona con nombre, cara y credencial. Es el patrón único de todos los sitios chicos que rinden; el "Editorial Team" lee como contenido generado.
3. Precio y rating reales en las tarjetas de tour: solo se consiguen con el widget del partner, como LP, Atlas y Sommertage. Nuestra tarjeta hoy es la más débil de la comparación (ya dicho en diseno-referentes.md).
4. La batería de partners que el lector de cada idioma espera: ES → Civitatis + seguro con código + Holafly; DE → "enthält Werbung" + Airalo; FR → nada especial, pero contenido con fecha 2026.
5. Medición de clics por caja y por página (Chavetas, Petra). Sin eso no vamos a saber si el StickyCTA, el `BookYourTrip` o las tarjetas convierten.
6. Prueba social de algún tipo: comentarios abiertos, reseñas de Google, o una cifra honesta ("X lectores en 2026") cuando exista.
7. Traducciones completas de región (hoy a un tercio): con 600 palabras, FR/DE/ES no compiten ni con Chavetas 2013.

**Sobra**:
1. **Hebreo como mercado de afiliados**: compite contra tiuli y masa (turismo interno), no contra Booking. 28 páginas HE que hay que mantener con un partner set que no aplica. No borrar (regla 3: nunca borrado seco), pero no invertir más hasta tener datos.
2. **11 partners en config**: los sitios que rinden usan 3–5. Skyscanner directo exige 5.000 únicos/mes; Stay22, Hostelworld y Rentalcars suman complejidad sin contenido que los sostenga.
3. **163 páginas para una persona sin cara**: Backpack Israel tiene ~200 posts con un guía detrás; Bachelor of Travel tiene 120 posts y US$38/mes. La cantidad no es la variable.
4. Ken Burns, scroll-reveal y otros adornos que ningún competidor tiene (ya dicho en diseno-referentes.md §3).

### 4.3 Veredicto

Tenemos la estructura de un sitio que factura y ninguna de las tres cosas que hacen facturar. La estructura (KeyFacts, TourVerdict, Toc, BookYourTrip, FAQ con schema, HTML liviano, 5 idiomas) está por encima de todos los blogs de nicho de Israel y a la par de los sitios chicos que funcionan en Grecia y Portugal. Pero esos sitios cobran porque tienen IDs cargados, una persona con nombre que responde comentarios y vende un servicio propio, y miden qué caja convierte. Nosotros tenemos cero de las tres. El mercado en inglés no tiene ningún afiliado fuerte vivo (los blogs de nicho cerraron o están en venta; los medios grandes abandonaron Israel; los que facturan son operadores), así que el hueco existe. En español el hueco es de calidad (contenido de 2012 con cajas de afiliado) y en francés de fecha (guías 2019–2023). El punto de partida realista es el de Bachelor of Travel (US$38/mes con 4.000 sesiones), no el de Nomadic Matt, y el tráfico de Israel cayó 10–29% en agosto por la guerra: la recuperación real la ponen en Pésaj 2027 (benchmarks.md §5). Esto se gana en 2027, con una cara y con datos, no con más páginas.

### 4.4 Cinco acciones, en orden

1. **Cargar los IDs de GetYourGuide, Civitatis y Viator, sumar Bein Harim (15%, 90 días, ShareASale 48735) a `affiliates.ts` y entrar a Booking por CJ o Awin.** Es la fase 3 del ROADMAP y depende solo de Sebastian. Hasta que un clic registre, nada de lo demás se puede evaluar. Bajar los partners activos a 5: GYG, Civitatis (ES), Viator, Bein Harim, Booking.
2. **Poner una persona con nombre, foto y credencial en `authors.ts` y en `/about`**, y que el byline diga "Israel travel writer since…" o "guía licenciada" (si la propuesta con Mariluz avanza, es ella; si no, Sebastian con su rol real). Es la mejora 10 de diseno-referentes.md y la única que todos los sitios chicos que rinden comparten.
3. **Reemplazar la grilla de tours de región por el widget nativo de GetYourGuide (3–4 ítems, `data-gyg-q` por destino) con el kicker "In partnership with GetYourGuide" y un solo disclosure**, como LP, Atlas y Sommertage. Muestra precio y rating reales sin inventarlos, y se puede hacer con el `TourVerdict` encima. En ES, el mismo bloque con el widget de Civitatis. Necesita aprobación (cambia el look) y el ID del paso 1.
4. **Medir clics por caja y por página con eventos de Vercel Analytics** (`StickyCTA`, `BookYourTrip`, `AffiliateCard`, `InlineTourCTA`, widget), con un nombre de ubicación por evento como hace Chavetas. Sin esto, en la fase 4 ("esperar datos") no va a haber datos. Costo: dos tardes.
5. **Completar la batería de partners por idioma en las páginas que ya existen, sin crear páginas nuevas**: en ES, caja de seguro con código (IATI o Heymondo, 5%) y Holafly en `plan-your-trip` y en las guías prácticas ("Is Israel safe", "Visa & ETA-IL", "Renting a car"); en DE, la marca "enthält Werbung" y links con asterisco (obligación legal); en FR, fecha "mis à jour 2026" visible arriba. Y completar las traducciones de región a por lo menos 1.500 palabras antes de traducir nada nuevo.

Lo que no vale la pena ahora: fotos propias (ayuda, pero no antes de los IDs), newsletter sin lead magnet, mapa interactivo, más páginas, más idiomas.

---

## 5. Fuentes

Todas consultadas el 2026-09-17 salvo indicación. Tráfico: `similarweb.com/website/<dominio>/` (dato de agosto 2026), `hypestat.com/info/<dominio>`, `semrush.com/website/<dominio>/overview/` (404 en casi todos; funcionó para viajeroscallejeros.com, routard.com, petitfute.com, sommertage.com, tiuli.com).

**Oficiales y medios**: goisrael.com; es/fr/de/it/ru.goisrael.com; israel.travel; es.israel.travel; itraveljerusalem.com; touristisrael.com, /jerusalem/, /tours/, /type/day-tours/, /tours/jerusalem-day-tour/, /about/; timeout.com/israel, /israel/things-to-do, /israel/attractions/the-best-things-to-do-in-tel-aviv; lonelyplanet.com/destinations/israel, /destinations/jerusalem, /destinations/israel/tel-aviv; lonelyplanet.es/asia/israel-y-los-territorios-palestinos; secrettelaviv.com, /tours, /tourists/top-hotels-in-israel, /about-us, /partners; israel21c.org → unpacked.media/israel21c; theculturetrip.com/asia/israel; atlasobscura.com/things-to-do/israel; civitatis.com/es/jerusalen; routard.com/fr/guide/moyen-orient/israel-palestine; petitfute.com/p155-israel; jpost.com/travel; israelhayom.com/category/travel (403).

**Operadores**: beinharimtours.com, /news/, /partner-with-us/; abrahamtours.com, /best-travel-guides-for-the-middle-east/, /affiliate/; getlasso.co/affiliate/bein-harim.

**Blogs de nicho Israel**: backpackisrael.com, /about/, /where-to-stay-in-jerusalem/; hike-israel.com, /about/; israelbyfoot.com (→ forsale.godaddy.com); funinjerusalem.com, /about-us/, /get-listed/; easttowestrms.com/middleeast/israel/; israel-travel-secrets.com; bestrestaurantsintelaviv.com; deliciousisrael.com/blog; bloggers.feedspot.com/israel_travel_blogs/.

**Español / francés / alemán / hebreo**: viajeroscallejeros.com/consejos-para-viajar-israel/; viajes.chavetas.es/guia/israel-palestina/; losviajesdedomi.com/que-ver-en-israel/; monoviajero.com/guia-israel/; guide-israel.info/blog/; sommertage.com/reiseblog/israel/; kommwirmachendaseinfach.de/land/israel/; viel-unterwegs.de/reiseziele/israel/; tiuli.com; masa.co.il; israelhiking.osm.org.il.

**Genéricos**: theblondeabroad.com/ultimate-middle-east-travel-guide/ (la búsqueda `?s=israel` dio 403 Cloudflare); twowanderingsoles.com/?s=israel, /income-reports (último 2020-02-06); theplanetd.com/top-10-things-to-do-in-israel/, /about-dave-and-deb/; alongdustyroads.com/search?q=israel; wanderingwheatleys.com/?s=israel.

**Sitios chicos**: petraontheway.com, /en/, /en/spain-finisterre, /en/review-getyourguide-affiliate-program (actualizado 2026-08-20); jordantraveler.com, /about/, /things-to-do-jordan/, /jordan-5-day-itinerary/; realgreekexperiences.com, /vanessa-and-dave-real-greek-experiences, /greek-ferry-tips, /athens-walking-tours-with-a-local; greecetravelsecrets.com, /about/meet-the-greece-travel-secrets-team/, /discount-codes-for-greece/, /3-day-santorini-itinerary/, /hosted-tours-and-retreats-in-the-greek-islands/; greeceandbeyond.com, /about-us/; portugalist.com, /about/, /lisbon/; mediavine.com/blog/publisher-interview-james-cave-of-portugalist/ (2019-12-17); juliedawnfox.com, /about-julie-dawn-fox/, /best-portugal-tours/, /benagil-caves-tours/, /toolkit/; wetravelportugal.com, /about-us/, /lagos-portugal/; bacheloroftravel.com/travel-blog-income-report-august-2025/; toptravelsights.com/travel-blog-income-report-q2-2026/; hannahonhorizon.com/blogging-income-report-2024/; livingthedreamrtw.com/income-and-traffic-report.

---

## 6. No pude verificar

- **Móvil real** (barra inferior, hamburguesa, sticky) de todos los sitios salvo Tourist Israel: solo indicios por clases CSS en el HTML.
- **Número de columnas** de las grillas: no se ve en HTML estático.
- **Si la cifra de SimilarWeb gratuito es mensual o trimestral**: afecta a Secret Tel Aviv (110K vs 37K), Bein Harim (42K vs 14K) y Abraham (24,6K vs 8,2K). Las de Viajeros Callejeros y Sommertage, contrastadas con Semrush, parecen mensuales infladas.
- **Semrush**: 404 en la mayoría de los dominios. **Ahrefs**: redirige a ahrefstop.com, dominio no oficial; los datos de DR y orgánico de Tourist Israel, Bein Harim e iTravelJerusalem salen de ahí y valen poco.
- **HypeStat**: sin metodología pública, con datos de 2018–2023 en varios casos (goisrael.com 463K es de 2018).
- **Tráfico de las secciones Israel** de Time Out, Lonely Planet, Atlas Obscura y Culture Trip: no hay desglose.
- **Facturación real** de cualquier sitio: nadie publica income reports actuales salvo los cuatro citados en §3; Two Wandering Soles solo hasta 2019. Todas las cifras de "facturación estimada" son tráfico × RPM y sirven para comparar, no para planificar.
- **Tourist Israel**: hero visual y tarjetas en desktop (403 en WebFetch; visto por curl y móvil); la cifra "101,4K visitas nov-2024" salió de un snippet; sus claims de 150.000 pax/año y 500.000 desde 2008 no se pueden contrastar.
- **The Planet D**: el "1 millón de personas al mes" del About lo contradice SimilarWeb (~37K).
- **goisrael.com**: solo se vio la versión geo "UK"; H1 real inexistente (SPA); comportamiento móvil.
- **israel.travel**: si los logos de Booking/Expedia llevan parámetro de afiliado.
- **Secret Tel Aviv**: contenido de las guías hijas de hoteles/tours (una URL dio 404); tamaño del grupo de Facebook (400K vs 500K según fuente); bylines.
- **Culture Trip**: conteo de partners (curl no conectó), tráfico, peso de página.
- **Petit Futé**: hero, menú, tarjetas (403; solo curl parcial).
- **The Blonde Abroad**: `?s=israel` bloqueado por Cloudflare; se confirmó por búsqueda site: que no hay post de Israel.
- **Sommertage**: la integración GYG dentro de posts (el artículo de Tel Aviv dio 404); solo se vio la landing.
- **Comisión** de Abraham Tours (no publicada); precios de listados de Fun in Jerusalem (a pedido); precios de los servicios de Julie Dawn Fox y Real Greek Experiences.
- **Visitas exactas** de backpackisrael.com, hike-israel.com, realgreekexperiences.com, greeceandbeyond.com, guide-israel.info (SimilarWeb gratuito no las muestra); israelbyfoot.com sin dato en ninguna fuente.
- **Candidatos que no aparecieron en ninguna búsqueda**: "Jerusalem Traveller", "Wander Israel", mochileandoporelmundo.com (Israel), elviajedesofi, "salta conmigo", "Israel en español", El Viajero (El País) Israel, voyage-israel.com, israel-voyage, israel-reise, reisen-israel, Israelmagazin, greekingit.com, "Athens and beyond".
- **Israel Hayom** /category/travel/: titulares (403 en fetch y en feed).
- **Datos de terceros citados por búsqueda y no vistos en fuente primaria**: IG 42K de Greece Travel Secrets; colaboraciones de prensa de Julie Dawn Fox; "12.000 personas/mes" de una entrevista vieja a Julie Dawn Fox.
