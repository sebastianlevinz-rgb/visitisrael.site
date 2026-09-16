# Cobertura de afiliados — qué inventario hay y qué nos falta

**Fecha de relevamiento**: 2026-09-16 (todos los números de esta fecha, salvo que se indique otra).
**Método**: número de resultados que muestra cada página de destino en el sitio del partner, leído en
el navegador (GetYourGuide y Viator bloquean el fetch directo; Civitatis y Booking se leyeron por fetch).
Cuando la página no muestra número, se dice "sin número". No hay ratings ni precios exactos: solo rangos.
**Sitio nuestro**: 7 regiones + 11 guías + 2 itinerarios (lista en `src/content/`), links limpios sin ID.

---

## (a) Destino × partner: listados y URL

GYG = "N results" en la página de destino (`getyourguide.com/<slug>/`). Viator = "N results" en la página
`viator.com/<Destino>/dNNN-ttd`; la búsqueda libre de Viator devuelve "200+" para casi todo porque mezcla
resultados globales (para "Akko" trajo cruceros en Grecia), así que **no se usa como conteo**. Civitatis solo
tiene 5 ciudades para Israel; el resto de destinos son tours dentro de Jerusalén/Tel Aviv. Booking = hoteles.

| Destino | GetYourGuide | Viator | Civitatis EN / ES | Booking (hoteles) |
|---|---:|---:|---:|---:|
| **Israel (país)** | 382 · `/israel-l169033/` | 500+ · `/Israel/d919-ttd` | 43 / 44 · `/en/israel/` `/es/israel/` | 7.293 · `/country/il.en-gb.html` |
| **Jerusalem** | 188 · `/jerusalem-l97/` | 200+ · `/Jerusalem/d921-ttd` | 18 / 18 · `/en/jerusalem/` | 673 (pág. país) |
| **Tel Aviv** | 172 · `/tel-aviv-l487/` | 200+ · `/Tel-Aviv/d920-ttd` | 21 / 22 · `/en/tel-aviv/` | 1.541 (país) / 1.179 (`/city/il/tel-aviv`) |
| **Dead Sea** | 104 · `/dead-sea-l214/` (mezcla lado Jordania) | 64 · `/Jerusalem-attractions/Dead-Sea/d921-a2919` | sin página; 4-5 tours dentro de JLM/TLV | 89 · `/region/il/dead-sea` |
| **Masada** | sin número (página POI `/masada-l1765/`, 10+ tours listados) | 66 · `/Jerusalem-attractions/Masada/d921-a2929` | sin página; 2 tours (desde JLM y TLV) | — |
| **Bethlehem** | 60 · `/bethlehem-l13226/` | 27 · `/Bethlehem/d22419-ttd` | sin página; 4 tours en JLM/TLV | 34 · `/city/ps/bethlehem` |
| **Nazareth** | 34 · `/nazareth-l211/` | 8 · `/Nazareth/d36686-ttd` | sin página; 3 tours (JLM/TLV/Haifa) | 42 · `/city/il/nazareth` |
| **Galilee / Sea of Galilee** | 64 · `/galilee-l32441/` (Sea of Galilee POI sin número) | Tiberias 14 · `/Tiberias/d24329-ttd` | ídem Nazareth | Tiberias 262 (país) / 201 (ciudad) |
| **Haifa** | 31 · `/haifa-l2051/` | 32 · `/Haifa/d4472-ttd` | 1 / 1 · `/en/haifa/` | 502 (país) / 352 (ciudad) |
| **Akko / Acre** | 54 · `/akko-l33279/` (inflado: mezcla tours de JLM/Jaffa) | sin página de destino encontrada | sin página; 1 tour combinado | 70 · `/city/il/akko` |
| **Caesarea** | 18 · `/caesarea-l1515/` | sin página de destino encontrada | ídem Akko | — |
| **Eilat** | 27 · `/eilat-l2663/` (5 de los 10 primeros son Petra) | 26 · `/Eilat/d23242-ttd` | 2 / 2 · `/en/eilat/` (ambos Petra) | 1.451 (país) |
| **Petra desde Israel** | sin número propio (POI `/petra-l1624/` es Jordania) | sin número propio; aparece en Eilat y Tel Aviv | 2 en Eilat + 3-4 en TLV/JLM | — |
| **Negev / Mitzpe Ramon** | 8 · `/negev-desert-l88147/` | sin página de destino encontrada | 0 | Mitzpe Ramon 73 |
| **Golan** | 14 · `/golan-heights-l33277/` | sin página de destino encontrada | 0 | — |
| **Jaffa** | 12 · `/jaffa-port-l164504/` | sin página de destino; tours dentro de Tel Aviv | 1-2 dentro de Tel Aviv | — |
| Yad Vashem | 4 · `/yad-vashem-holocaust-memorial-l3845/` | — | 0 | — |
| Western Wall | sin número (POI `/western-wall-l3838/`) | — | — | — |

Notas: los "results" de GYG en páginas de región incluyen tours que solo pasan por ahí (Dead Sea suma tours
desde Ammán; Akko suma tours de Jerusalén). Los números de Booking difieren entre la página de país y la de
ciudad (radio distinto); se anotan los dos.

---

## (b) Tipos de tour por inventario (ranking)

Orden por cuántas veces aparece el tipo en los primeros resultados de GYG/Viator/Civitatis y por los conteos
de arriba. Precios = rango "desde" visto el 2026-09-16, en US$.

| # | Tipo de tour | Evidencia de inventario | Precio típico |
|---|---|---|---|
| 1 | **Masada + Ein Gedi + Dead Sea day trip** (desde JLM o TLV, versión sunrise) | GYG Dead Sea 104, Viator Masada 66 / Dead Sea 64; primer producto de Israel en GYG, Viator y Civitatis | 85–135 |
| 2 | **Jerusalem Old City** (walking tour, full-day, desde Tel Aviv) | GYG JLM 188, Viator JLM 200+, Civitatis 18 | 45–120 |
| 3 | **Bethlehem** (medio día, o + Jericó + Río Jordán) | GYG 60, Viator 27, Civitatis 4 SKUs en JLM y TLV | 75–150 |
| 4 | **Nazareth + Sea of Galilee (tour cristiano)** | GYG Galilee 64 + Nazareth 34, Viator Tiberias 14 + Nazareth 8, Civitatis 3 | 94–125 |
| 5 | **Caesarea + Haifa + Akko (+ Rosh Hanikra) day trip** | GYG Haifa 31 / Caesarea 18 / Akko 54, Civitatis en JLM y TLV | 99–125 |
| 6 | **Petra desde Eilat / Tel Aviv** (1 día, o 2 días con Wadi Rum) | mitad del top-10 de Eilat en GYG y Viator; 100% de Civitatis Eilat | 199–500 (el ticket más alto) |
| 7 | **Tel Aviv / Jaffa: food tour, Carmel Market, graffiti, pub crawl** | GYG Jaffa Port 12 + categoría "Local food tours"; Civitatis 5 SKUs | 29–90 |
| 8 | **Golan Heights day trip** | GYG 14 | 99–130 |
| 9 | **Negev / Timna / Eilat jeep y desierto** | GYG Negev 8 + jeeps en Eilat | 65–90 |
| 10 | **Multi-day 2 a 10 días (Israel, Israel + Jordania)** | aparecen en todas las páginas de país | 700–4.100+ |
| — | Yad Vashem (4 en GYG), Western Wall tunnels (sin conteo) | inventario chico; van dentro de Jerusalén | 50–110 |

---

## (c) Comisiones por programa (fuente y fecha)

| Programa | Comisión publicada | Cookie / condiciones | Fuente (2026-09-16) |
|---|---|---|---|
| **GetYourGuide** | "Earn a minimum commission rate of 8%, paid monthly" | cookie no publicada en la página oficial (terceros dicen 30 días) | partner.getyourguide.com |
| **Viator** | 8% sobre reserva completada | 30 días; banco: mensual con mínimo US$50; PayPal: semanal sin mínimo | partnerresources.viator.com |
| **Civitatis** | 8% a 10% según volumen mensual; €1 por participante de free tour | 30 días; exige web/blog de viajes activo (no solo redes) | civitatis.com/en/affiliates/ |
| **Booking.com** (vía CJ) | arranca en 4% alojamiento, 6% autos, 4% atracciones, €2 por vuelo | **por sesión, sin cookie**; rechaza perfiles solo-redes | cj.com/en-gb/publisher/partners/booking.com (el hub partner.booking.com devuelve 403) |
| **Skyscanner directo** | "flexible rate structure based on performance", sin % publicado | 30 días; exige **>5.000 visitantes únicos/mes** y HTTPS | partners.skyscanner.net/product/affiliates |
| **Skyscanner vía Travelpayouts** | CPC: 20–50% del ingreso de Skyscanner, ~US$0,40–1 por click-out | 30 días | travelpayouts.com/blog/skyscanner-flight-affiliate-program/ (artículo del 2022-07-03) |
| **DiscoverCars** | 70% de la ganancia del alquiler + 30% del Full Coverage; "~$20 per booking" | **365 días** | discovercars.com/affiliate |
| **Abraham Tours** | % **no publicado**; tracking vía TourCMS | pago por fecha de salida; mínimo 1.500 ILS (Israel) / 1.000 ILS PayPal (exterior) | abrahamtours.com/affiliate/ y abraham.travel/affiliate-terms-of-use/ |

Lectura rápida: un Masada+Dead Sea de US$110 deja ~US$9 en GYG/Viator/Civitatis; un Petra de US$300–500 deja
US$24–40. Un hotel de US$150/noche × 3 noches deja ~US$18 en Booking al 4% base. Tours y hoteles pesan parecido
por conversión; Petra es la venta unitaria más rentable del catálogo.

---

## (d) Recomendación: páginas nuevas imprescindibles y páginas flojas

### Lo que NO tiene página propia y tiene inventario grande

| Prioridad | Página nueva (EN/FR/DE/ES) | Justificación numérica | Tour/partner que monetiza |
|---|---|---|---|
| 1 | **Masada** (`masada-tours` o `masada-dead-sea-tours`) | Viator 66 productos en atracción Masada; GYG Dead Sea 104; es el #1 de cada catálogo. Hoy solo aparece adentro de `dead-sea-tours-compared` | Masada+Ein Gedi+Dead Sea, sunrise hike, desde JLM vs TLV; 85–135 |
| 2 | **Bethlehem desde Jerusalem** | GYG 60 + Viator 27 + Civitatis 4 SKUs; es el 3er tipo de tour más ofertado y ninguna página nuestra lo tiene como tema | medio día, Belén+Jericó+Río Jordán; 75–150 |
| 3 | **Petra desde Eilat / desde Israel** | ticket 199–500 (3–4× cualquier otro tour); es la mitad del inventario de Eilat en GYG y Viator y el 100% de Civitatis Eilat; comisión unitaria US$24–40 | 1 día desde Eilat, 2 días Wadi Rum, 1 día con vuelo desde TLV |
| 4 | **Nazareth + Sea of Galilee (tour cristiano)** | GYG Galilee 64 + Nazareth 34; Civitatis lo ofrece desde JLM, TLV y Haifa; nuestra región `galilee` no compara tours | day trip desde TLV/JLM; 94–125 |
| 5 | **Caesarea + Haifa + Akko day trip** | GYG Haifa 31 + Caesarea 18 + Akko 54; Civitatis en las dos ciudades; hoy está diluido en `day-trips-from-tel-aviv` y en la región `haifa` | día completo costa norte; 99–125 |
| 6 | **Tel Aviv food tours / Jaffa** | Tel Aviv es #2 en volumen (GYG 172, Viator 200+, Civitatis 21-22) y no tenemos ninguna página de tours de Tel Aviv; GYG Jaffa Port 12 + Civitatis 5 SKUs a 29–49 | Carmel Market, Jaffa walking, graffiti, pub crawl |
| 7 | **Best hotels Eilat** | Booking: 1.451 hoteles, 2° destino de Israel, sin página nuestra de hoteles (tenemos JLM 673 y TLV 1.541) | Booking 4%+; combinar con Petra |
| 8 (opcional) | **Multi-day tours Israel (2–10 días)** | presentes en todos los catálogos, ticket 700–4.100; encaja con nuestros itinerarios de 7 y 10 días | GYG/Viator/TourRadar |

No recomiendo página propia para: **Yad Vashem** (GYG 4), **Western Wall tunnels** (sin conteo separado),
**Golan** (GYG 14; va como sección dentro de Galilee), **Akko/Caesarea sueltos** (van dentro de la página 5).

### Páginas actuales con poco inventario detrás

- **`negev`**: GYG 8 productos, Civitatis 0, Viator sin página de destino. Booking Mitzpe Ramon 73. Es la región
  más floja para monetizar; conviene apoyarla en alquiler de auto (DiscoverCars, cookie 365 días) más que en tours.
- **`haifa`**: Civitatis 1, GYG 31 / Viator 32 pero casi todo son tours que *pasan* por Haifa desde TLV/JLM.
  Como región vive de hoteles (352–502); los tours se monetizan mejor desde la página 5.
- **`galilee`**: GYG 64 está bien, pero Civitatis no tiene página y Viator solo Tiberias 14 / Nazareth 8.
  Sin la página 4 (tour cristiano) la región no capta la intención de compra.
- **`eilat`**: tours propios pocos (27/26) y la mitad es Petra. Sin la página 3 y la 7 está subaprovechada.
- **`dead-sea-tours-compared` y `dead-sea-hotels-guide`**: bien respaldadas (GYG 104, Viator 64, Booking 89),
  pero el hotel inventory es chico (89) comparado con el tráfico que atrae el tema.
- **`day-trips-from-tel-aviv`**: canibaliza con las páginas 1, 2, 4 y 5 propuestas; cuando existan, esta pasa a
  ser un índice que las enlaza.

---

## (e) A qué programas aplicar primero y por qué

1. **GetYourGuide** — 8% mínimo, 382 productos en Israel con página para cada destino de la tabla, pago mensual.
   Cubre las 8 páginas propuestas. Es el que más inventario tiene por destino individual.
2. **Viator** — 8%, 500+ en Israel y 200+ en JLM y TLV (los más profundos), Masada y Dead Sea con 60+ cada uno.
   PayPal semanal sin mínimo: cobra antes que nadie.
3. **Civitatis** — 8–10% (el % más alto de los tres), solo 43–44 productos pero en **ES/FR/DE nativos**,
   exactamente nuestras versiones. Exige web de viajes activa: ya cumplimos. Prioridad para Petra (2/2 en Eilat)
   y para el tráfico hispano.
4. **Booking.com (vía CJ)** — 4% base y sin cookie (por sesión), pero 7.293 hoteles y es el único partner de
   alojamiento serio. Necesario para `best-hotels-*`, `dead-sea-hotels-guide` y la página 7.
5. **DiscoverCars** — ~US$20 por reserva, cookie 365 días. Ya tenemos `car-rental-israel` y es la salida natural de
   Negev/Galilee, que son flojas en tours.
6. **Skyscanner vía Travelpayouts** — el programa directo pide >5.000 únicos/mes (hoy no medimos tráfico; ver
   `estado-del-sitio.md`), así que la vía viable es Travelpayouts a CPC (~US$0,40–1 por click-out). Ingreso chico.
7. **Abraham Tours** — sin % publicado y mínimo de cobro 1.000–1.500 ILS. Aplicar después de tener tráfico;
   sirve como alternativa "local" en Masada, Petra y West Bank, no como base.

Regla práctica: no publicar ninguna de las 8 páginas nuevas hasta tener al menos GYG o Viator aprobados, porque
son las dos únicas fuentes que cubren todos los destinos y hoy los links salen sin ID.
