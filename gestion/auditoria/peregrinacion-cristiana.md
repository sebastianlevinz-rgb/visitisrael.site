# Turismo religioso cristiano — estudio de mercado y arquitectura

**Fecha**: 2026-09-23. **Para**: Sebastian. **Por qué se hizo**: Mariluz dice que muchos de sus
clientes son cristianos que vienen a ver Jerusalén y las iglesias, y el sitio no tiene una sola
página dedicada a eso.

**Método**: (1) lectura directa de los catálogos de 30+ operadores con WebFetch y búsqueda web,
todo el 2026-09-23, con URL y fecha en cada dato; (2) keywords propias con DataForSEO
(`scripts/seo/peregrinacion.mjs` → `data/seo/peregrinacion.json`), 116 filas en 7 mercados,
20 SERPs reales a profundidad 10, **costo US$1,5575 de un tope de US$3**, registrado en
`data/seo/costs.json`; (3) controles de homonimia para las keywords de volumen alto, que es lo
que más cambió las conclusiones.

**Honestidad de datos**: ningún precio de este informe está estimado. Cada cifra es la que
publica el operador en su página, con la URL. Lo que no se pudo verificar está marcado como tal
y listado en §8. **Postura editorial**: neutra. Acá se describe producto turístico y logística
de visitante; no hay teología ni política, y los sitios en disputa van con nomenclatura pareja.

**Qué no repite este informe**: el calendario litúrgico básico ya está en
`src/content/guides/shabbat-and-holidays-israel.md` (Semana Santa 2027, las tres Navidades de
Belén, Fuego Santo). §3 marca qué de eso ya está cubierto y qué falta; no lo duplica.

---

## 0. Los hallazgos que cambian la decisión

1. **El volumen en español y portugués es casi todo homónimo, y por poco lo compramos.**
   `tierra santa` da 33.100/mes en Argentina: el #1 es **tierrasanta.com.ar**, el parque temático
   religioso de Buenos Aires, y el #4 es el sitio de turismo de la Ciudad. La consulta que
   realmente busca Israel, `tierra santa israel`, son **140/mes**. En Brasil `terra santa` da
   8.100 y el #1 es **terrasanta.pa.gov.br**, la prefectura del municipio de Terra Santa, en
   Pará; `terra santa israel` son **140**. En México `getsemani` da 9.900 pero compite con el
   barrio de Cartagena (`getsemani cartagena` 590) y `getsemani israel` son **30**. Una página
   `/es/tierra-santa` optimizada para "tierra santa" habría apuntado a un parque de diversiones.
2. **Google Ads también infló el inglés, por agregación de variantes.** `mount tabor israel`
   marca 27.100 — exactamente lo mismo que `mount tabor` a secas, que incluye el Mount Tabor
   Park de Portland (`mount tabor portland` 3.600). `mount of olives jerusalem` marca 27.100,
   idéntico a `mount of olives`. Son el volumen del término amplio, no del calificado. Los
   únicos números grandes que sobreviven al control son **`church of the holy sepulchre` 49.500**
   (la variante `holy sepulchre` da 12.100, o sea que acá el calificado es el que manda),
   `garden of gethsemane` 22.200 y `church of the nativity bethlehem` 14.800.
3. **La demanda real es de LUGAR, no de TOUR, y por un factor de 15 a 50.** `church of the holy
   sepulchre` 49.500 contra `holy land tour` 2.900, `christian tours israel` 390, `pilgrimage to
   israel` 170. En España `viaje a tierra santa` son 320/mes; en Italia `pellegrinaggio terra
   santa` 260; en Francia `pèlerinage terre sainte` 110; en Brasil `viagem a terra santa` 90.
   **La página que se paga sola no es "peregrinación a Tierra Santa": son las páginas de sitio.**
4. **Las SERP comerciales están cerradas por operadores, sin un solo afiliado ni blog.** En
   `holy land tour`, `christian tours israel`, `viaje a tierra santa`, `pellegrinaggio terra
   santa`, `pèlerinage terre sainte` y `viagem a terra santa`, los 5 primeros son **siempre**
   operadores que venden su propio paquete (holylandtourstravel, pilgrimtours,
   israelchristiantours, btravel, operaromanapellegrinaggi, ictusvoyages, domusviagens). Ni un
   blog, ni un marketplace arriba. Competir ahí con links de afiliado es perder.
5. **Las SERP informativas, en cambio, están abiertas — y las gana un operador haciendo
   contenido, con un dominio por idioma.** `holylandtourstravel.com`,
   `israeltourismconsultants.com` y `tierrasantaisrael.com` **son la misma empresa** (Israel
   Tourism Consultants / Vacations For Less, mismo teléfono +1 800 933 4421, mismos precios).
   Entre los tres ocupan **#1, #2 y #4 de `holy land tour`**, **#3 de `mount of olives
   jerusalem`** (27.100), **#4 de `via dolorosa`** (8.100) y **#2 de `viaje a tierra santa`**.
   Bein Harim hace lo mismo en chico: #4 en `garden of gethsemane` (22.200) y #3 en `monte de los
   olivos` (es-MX) con fichas de atracción que terminan en un carrusel de tours con precio. Ese es
   exactamente el movimiento que nos corresponde: **ganar el lugar y derivar al tour**.
6. **Arriba de casi todo está Wikipedia, y la dificultad es baja igual.** Wikipedia es #1 en 9 de
   los 12 SERP de más volumen, pero la KD es **0–10 en la mayoría** y el resto del top 10 son
   dominios batibles (britannica, quora, gotquestions, elal.com, blogs de parroquia). Hay
   `ai_overview` en **12 de los 20** SERP y `people_also_ask` en **los 20**: el primer párrafo
   tiene que responder la pregunta, porque es lo que Google cita.
7. **El capellán es la línea que parte el mercado en dos, y define el texto.** De un lado Halcón
   (franciscano incluido, desde 1.495 €), Peregrinaciones.mx (sacerdote acompañante), San Juan
   del Hospital (misa diaria, incluida una a las 6:00 en el Calvario). Del otro, producto
   turístico sin acompañamiento: Peregrinaciones.com, Antía, Travel Viajes, toursatierrasanta.
   Éxodo es el caso incómodo: capellán **solo si el grupo llega a 20 personas**. Un lector que
   busca lo primero y cae en lo segundo se va.
8. **Los precios publicados no son comparables entre sí, y nadie lo aclara.** Halcón 1.495 €
   incluye el vuelo desde Madrid; toursatierrasanta USD 1.403 **empieza en Tel Aviv**; Éxodo
   2.860 € y Peregrino.travel **no incluyen el vuelo**. Una tabla comparativa que no normalice
   "con aéreo / sin aéreo" es engañosa. Es un hueco editorial evidente y barato de llenar.
9. **2027 tiene las dos Pascuas separadas por las 5 semanas máximas, y nadie lo está
   comunicando.** Semana Santa católica 28 de marzo, Pascua ortodoxa 2 de mayo, Fuego Santo el
   1 de mayo, Pentecostés el 16 de mayo. O sea: **dos picos, no uno**, y el "mayo tranquilo" que
   recomiendan todos los operadores **no existe en 2027**. Ninguna de las páginas relevadas
   ajustó ese discurso. Nuestra guía de Shabat y fiestas ya tiene las fechas correctas: es
   ventaja construida que hoy no está señalizada desde ninguna página cristiana.
10. **Las dos mejores oportunidades del estudio están en idiomas que el sitio no tiene.**
    `mar da galileia` 9.900 con **KD 0** y `via dolorosa jerusalem` 4.400 con **KD 0** son
    portugués de Brasil; `terra santa` 3.600 (KD 4), `santo sepolcro gerusalemme` 2.400 (KD 0) y
    `lago di tiberiade` 2.400 (KD 0) son italiano. El sitio corre en `en, fr, de, es, he`
    (`src/i18n/ui.ts`). Abrir PT o IT es una decisión de crecimiento que contradice la fase
    actual del `ROADMAP.md`, así que **acá se deja anotada y no se recomienda ahora** — pero es
    el número más grande que dejamos sobre la mesa, y conviene que esté escrito antes de que
    alguien proponga un sexto idioma por intuición.
11. **El piso técnico del sector es bajísimo y es nuestra ventaja real.** De 10+ páginas de
    operadores hispanos relevadas, **ninguna tiene mapa**, dos tienen itinerario día por día
    completo, dos tienen FAQ, y 4tourists.com.ar sigue publicando un producto "inactivo" con
    fechas de 2021–2023. Nosotros ya tenemos TOC, FAQ con JSON-LD, tablas comparativas y fecha de
    actualización visible. Lo que falta no es formato: es la página.

---

## 1. Qué venden los competidores

Todo consultado el **2026-09-23**. Los precios son los que publica cada sitio, textuales. Donde
dice "no publica precio" es porque se revisó la página de producto y no hay cifra.

### 1.1 Operadores especializados en peregrinación (los que dominan el nicho)

| Operador | Producto | Días | Precio publicado | Aéreo | Régimen | Capellán + misa diaria | Confesión | ¿LatAm/España? |
|---|---|---|---|---|---|---|---|---|
| **206 Tours** (`206tours.com`) | Tour 111 "Walk Where He Walked" | 10 (catálogo 6–34) | **No publica.** Solo depósito de US$500 | Sí, 200+ aeropuertos EE. UU./Canadá | Pensión completa | **Sí, explícito** | Católica | Sitio en español (`206viajes.com`) pero **sale de EE. UU./Canadá** |
| **Pilgrim Tours** (`pilgrimtours.com`) | Best of Israel | 9 | **US$2.579** p/p doble (anticipada 2.479); 2027 desde 2.379 | **No** (land only) | Media pensión | **No** | Protestante / evangélica | No |
| **Pilgrim Tours** | Israel in Detail | 11 | **US$2.699–3.249** según mes | No | Media pensión | No | Protestante | No |
| **EO / Educational Opportunities** (`eo.travelwithus.com`) | Holy Land Classic | 10 | **US$3.598** desde Nueva York | **Sí, desde NY** | Media pensión | **No** | Protestante / evangélica | No |
| **EO** | Catálogo 2027 | 9–15 | **US$3.048 a 4.048** | Sí | Media pensión | No | Protestante | No |
| **Franciscan Pilgrimage Programs** (`franciscanpilgrimages.com`) | Holy Land Classic | 9 | **US$3.700** (+350 individual) | **No** (encuentro en Ben Gurión) | **Pensión completa, propinas incluidas** | **Sí, explícito (frailes + Eucaristía diaria)** | Católica franciscana | No |
| **Nawas** (`nawas.com`) | The Holy Land | 10 | **No publica** | No verificado | No verificado | No verificado | **Católica Y protestante, en líneas separadas** | No |
| **Custodia Terrae Sanctae** (`custodia.org`) | Itinerarios modelo | 7–10 | **No publica** | — | — | Es quien **reserva** las misas | Católica | Vía comisariatos |
| **Magi Travel** | — | — | `magitravel.com` **no responde**; `magitravelinc.com/holy-land` es un placeholder ("Future Trip Dates – To Be Announced") | — | — | — | No declarada | — |
| **Israel Travel Center** | — | — | **Dominio estacionado en GoDaddy.** No existe como operador | — | — | — | — | — |

**Aclaración sobre el bloque franciscano**, que el brief agrupaba y son tres cosas distintas:
- `custodia.org` **dice de sí misma que no es agencia** ("This website IS NOT A TRAVEL AGENCY").
  Deriva a los Comisariatos de Tierra Santa de cada país y aloja en las casas franciscanas.
- El **Franciscan Pilgrims Office** (Puerta de Jaffa, `fpo@cicts.org`, +972 2 6272697) **no vende
  paquetes**: gestiona los turnos de misa en los santuarios de la Custodia. Es **infraestructura,
  no competencia** — todo operador que promete "misa diaria" pasa por ahí.
- `cmc-terrasanta.org` (Christian Media Center) es **un medio**, con streaming 24 h desde las
  basílicas de Nazaret y Belén. Sin productos ni precios; único CTA, "Donate".

### 1.2 Operadores y marketplaces masivos

| Canal | Qué vende de cristiano | Precio publicado | Idiomas |
|---|---|---|---|
| **Bein Harim** (`beinharimtours.com/christian-day-tours/`) | **El catálogo cristiano más profundo.** 15 días sueltos + 8 productos de 2–3 días + 6 paquetes de 7–12 días | Día: **US$50** (Jerusalén medio día) a **US$125**; privado **US$999/grupo**. Paquetes: **US$1.459** (7 d) a **US$2.499** (12 d). El de 8 días, **US$1.629 turista / 2.819 lujo** | **EN, ES, DE, FR** en buena parte del catálogo |
| **Tourist Israel** (`touristisrael.com/type/christian-israel-tours/`) | Escalera de 1 a 9 días de "Christian Holy Land" | "from **US$99**" (día) a "from **US$1.449**" (9 días). **403 al fetch: precios vía buscador, no verificados en página** | No verificado |
| **Abraham Tours** | No es confesional. Holy City Tour (multi-fe), Belén, Galilea, y **Jesus Trail 5 días autoguiado** | **170 ILS** (Holy City) a **2.800 ILS** (Jesus Trail) | Inglés |
| **Civitatis** (`civitatis.com/es/jerusalen/`) | 18 actividades en Jerusalén, 44 en Israel | **45 US$** (Monte de los Olivos) a **125 US$**; circuito 5 días **964 US$** | Vende en español, **opera casi todo en inglés** |
| **GetYourGuide** | Jerusalén **187** actividades, Belén **60**, Nazaret **34** | **US$40** (medio día cristiano desde Belén) a **US$4.148** (Holy Land + Jordania 10 días) | Producto de Bein Harim con guía en vivo en **ES, FR, DE** |
| **Viator** | Jerusalén **200+**, Belén **27**, **Nazaret solo 8** | ₪124 a ₪7.729/grupo. Filtro **"Religious Tours"** | Listado de Nazaret marcado **"Auto-translated"** |

**Tres cosas que saltan de esta tabla:**

1. **Nadie vende día suelto en el segmento de peregrinación.** Los siete especializados venden
   paquete de 7 a 12 días como unidad mínima, con un núcleo muy consistente en **9–10 días**. El
   día suelto es territorio de Bein Harim, Abraham, GYG, Viator y Civitatis.
2. **Bein Harim está atrás del producto estrella de las dos plataformas masivas.** El
   "Jerusalem and Bethlehem Day Trip from Tel Aviv" es el mismo tour en GetYourGuide (t22202,
   US$121, 4,3 con 1.339 reseñas) y en Viator (d920-5209JERBETH, ₪376,33, 4,3 con 736 reseñas), y
   directo en Bein Harim sale **US$106**. Y se vende distinto: **GYG lo lista con entradas
   incluidas y cuatro idiomas; Viator lo lista sin entradas**, con Santa Catalina marcada como
   ticket aparte. Para nosotros importa doble, porque **Bein Harim es nuestro afiliado al 15 %
   con cookie de 90 días** y ya está en `affiliates.ts`.
3. **Ninguno de los siete especializados tiene salida real desde España ni LatAm.** 206 Tours es
   el único con producto en castellano y sale de Norteamérica. Las salidas hispanas las cubren
   las agencias locales del §1.3.

### 1.3 Español: España y LatAm

| Operador | Días | Precio publicado | Aéreo | Capellán + misa | Salida |
|---|---|---|---|---|---|
| **Halcón Viajes** (`halconviajes.com/oferta/peregrinaciones/`) | 8 | **desde 1.495 €** (Madrid) / **1.580 €** (Barcelona); con Jordania **2.230 €** | **Sí** | **Sí: guía franciscano + eucaristías**, alojamiento en **casas franciscanas** | Madrid / Barcelona |
| **Peregrinaciones.com** (Málaga) | 8 | **2.572 – 2.790 €** según tamaño de grupo | Sí (Iberia) | **No**, y no promete misa diaria | Málaga |
| **Éxodo Peregrinaciones** (Madrid) | 11 | **2.860 – 5.730 €** según habitación | **No, ni el Madrid–Tel Aviv** | **Solo desde 20 peregrinos** | Madrid |
| **Peregrino.travel** (Murcia) | 8 | **No publica** (reserva con 100 €) | **No** | **"Misa diaria cuando sea posible"**, coordinación con la Custodia | — |
| **Antía Viajes** (España) | 8 | **1.290 €** base / **1.690 €** con vuelos | Opcional | No | España |
| **San Juan del Hospital** (parroquia, Valencia) | 8 | **1.865 – 1.930 €** (+550 individual) | Sí | **Sí: misa diaria, incluida una a las 6:00 en el Calvario** | Valencia |
| **Peregrinaciones.mx** (Guadalajara) | 9–16 | **US$3.595** (9 d) a **US$5.550** (14 d); Semana Santa 11 d **US$4.867** | **Sí, desde CDMX** | **Sí: guías católicos y sacerdote acompañante** | Ciudad de México |
| **Travel Viajes** (Colombia) | 7–18 | **US$1.391** (7 d) a **US$6.750** (18 d); "Circuito Evangélico" 8 d **US$1.870** | Sí | **No** | Bogotá, Medellín, Cali |
| **toursatierrasanta.com** (empresa de California, producto en español) | 7–8 | **US$1.403 – 1.534** | **No: empieza en Tel Aviv** | No | — |
| **Peregrinación Católica** (Colombia/Ecuador) | 13 | **US$4.580 – 6.290** *(403 al fetch: vía snippets, no verificado en página)* | Sí | **Sí, y publican el PDF con el nombre del sacerdote** | Bogotá / Quito |

**El hallazgo de precios**: esas cifras **no son comparables entre sí** y ningún sitio lo aclara.
Halcón 1.495 € incluye el vuelo desde Madrid; toursatierrasanta US$1.403 **empieza en Tel Aviv**;
Éxodo 2.860 € y Peregrino.travel **no incluyen el vuelo**; Pilgrim Tours US$2.579 y Franciscan
US$3.700 son **land only**; EO US$3.598 **sí trae el vuelo desde Nueva York**. Y las propinas
entran o no según operador: Pilgrim las cobra aparte y las declara (**US$110–140 por persona**),
206 Tours y Franciscan las incluyen, EO incluye solo las de hotel.

**Patrón de canal**: en España lo normal es "desde X €" o directamente formulario; en LatAm el
precio va **en la tarjeta del listado, con fecha y lugares disponibles** (Peregrinaciones.mx llega
a mostrar "6 lugares disponibles"). Es diferencia de canal, no de producto.

---

## 2. Las rutas y los sitios que se repiten

Conteo sobre los **12 itinerarios en los que se pudo leer el detalle completo**: 206 Tours 111,
Pilgrim Tours 9 d, Pilgrim Tours 11 d, Franciscan Classic 9 d, Bein Harim Christian 8 d,
Peregrinaciones.com 8 d, Peregrino.travel 8 d, Peregrinaciones.mx CF1228, Antía 8 d, Éxodo 11 d,
San Juan del Hospital 8 d y Nawas 10 d (este último solo a nivel índice).

**Advertencia de método**: un "no" significa **que la página no lo listaba**, no que el tour no
pase por ahí. Varias páginas resumen y no desglosan. El número sirve para ordenar prioridades, no
como censo.

| Sitio | Aparece en | Lectura |
|---|---:|---|
| **Nazaret – Anunciación** | **12 / 12** | Universal |
| **Mar de Galilea** | **12 / 12** | Universal (casi siempre con paseo en barco) |
| **Belén – Natividad** | **11 / 12** | Universal, y siempre con aviso de pasaporte |
| **Santo Sepulcro** | **10 / 12** | Falta en el itinerario protestante corto de Pilgrim Tours |
| **Vía Dolorosa** | **10 / 12** | |
| **Monte de los Olivos** | **10 / 12** | |
| **Cafarnaúm** | 9 / 12 | |
| **Jordán (Yardenit o Qasr el Yahud)** | 9 / 12 | Muchos dicen solo "Jordan River", sin decir cuál |
| **Getsemaní** | 8 / 12 | |
| **Caná** | 8 / 12 | Marcador católico |
| **Monte Tabor** | 8 / 12 | Marcador católico |
| **Masada / Mar Muerto** | 8 / 12 | Va como día "libre" o de paisaje |
| **Jericó** | 7 / 12 | |
| **Monte Sión / Cenáculo** | 6 / 12 | Casi nunca como parada principal |
| **Monte de las Bienaventuranzas** | 5 / 12 | |
| **Ein Karem** | 4 / 12 | Solo en itinerarios católicos |
| **Tabgha** | 3 / 12 | Menos de lo que su fama sugiere |
| **Garden Tomb** | 2 / 12 | **Solo en los protestantes** |
| **Emaús** | **0 / 12** | **No aparece en ningún itinerario relevado** |

**Y tampoco aparece en los marketplaces**: en GetYourGuide, Viator y Civitatis, **Ein Karem y
Emaús no figuran en ningún itinerario**, y Monte Sión / Cenáculo aparece de forma marginal.

### 2.1 Las diferencias por tradición, tratadas como logística de visita

Esto cambia el itinerario y cambia el texto, así que va explícito. **Se describe como diferencia
de recorrido y de reserva, no de doctrina.**

| | Católico | Protestante / evangélico | Ortodoxo |
|---|---|---|---|
| **Dónde termina el recorrido de Jerusalén** | **Santo Sepulcro** | **Garden Tomb** (y ahí se hace el servicio de comunión) | Santo Sepulcro |
| **Bautismo en el Jordán** | Renovación de promesas, habitualmente en **Qasr el Yahud** | **Inmersión**, un servicio programado del itinerario | Qasr el Yahud, con fuerte peso en Teofanía |
| **Misa / servicio diario** | **Sí**, prometido por escrito en 206 Tours y Franciscan | **No se menciona nunca** en Pilgrim Tours ni EO | — |
| **Paradas que casi solo aparecen acá** | Caná, Monte Tabor, Ein Karem, Cenáculo, Tabgha | Meguido, Dan, Cesarea de Filipo, Corazín, Monte Arbel, Ciudad de David, Masada | — |
| **Fecha de Pascua 2027** | 28 de marzo | 28 de marzo | **2 de mayo** |
| **Navidad en Belén** | 25 de diciembre | 25 de diciembre | 7 de enero (griega) / 19 de enero (armenia) |

**El itinerario delata la tradición mejor que el texto de venta.** Pilgrim Tours no dice en
ninguna parte que es protestante: lo dice el hecho de que el clímax sea el Garden Tomb y no el
Santo Sepulcro, y que no haya una sola mención de misa.

**El hueco comercial más claro del estudio**: **nadie vende segmentación confesional en un
catálogo con precio.** Ni GetYourGuide, ni Viator, ni Civitatis tienen filtro por tradición. La
única excepción es Bein Harim, que tiene páginas separadas de peregrinación católica, evangélica
y ortodoxa — **sin precio publicado**, como grupo a medida, prometiendo "misa diaria coordinada
con las iglesias locales, según disponibilidad". En el catálogo transaccional, "cristiano" es una
sola etiqueta indiferenciada.

### 2.2 Cómo trata cada uno a Belén, que está en Cisjordania

Esto es directamente nuestra postura editorial, así que se relevó con cuidado. **Seis estrategias
distintas y ninguna consistente:**

- **Viator** es el único que lo resuelve en la **navegación**: "Inicio › Territorios Palestinos ›
  Cisjordania › Belén", más un banner de seguridad. Pero la ficha de su producto estrella cuelga
  de "Israel › Jerusalén › Belén", contradiciendo su propia taxonomía.
- **Tourist Israel** tiene un destino propio llamado **"Bethlehem & West Bank"** y un artículo
  "Is it Safe to Visit the West Bank?".
- **Bein Harim** es inconsistente entre secciones: las fichas dicen "Palestinian Authority", la
  sección de destino se llama "West Bank Tours", y su guía editorial pone las dos denominaciones
  en paralelo ("an occupied territory, or a part of Israel called Judea and Samaria").
- **GetYourGuide** lo evita en la taxonomía y lo resuelve en la letra chica operativa (pasaporte,
  cambio de vehículo, guía palestino que espera en el paso), **desdramatizándolo activamente**:
  "these are routine", "very safe for visitors".
- **Abraham Tours** es el más frontal: vende el muro como parada del itinerario, junto al Walled
  Off Hotel.
- **Civitatis es el peor del grupo**: sus fichas de Jerusalén **no mencionan Cisjordania, ni
  muro, ni checkpoint, ni pasaporte**. El aviso del cruce aparece únicamente en reseñas de
  usuarios.

**El pasaporte lo exigen todos** los que entran a Belén. La restricción a titulares de pasaporte
israelí la declaran por escrito **Abraham Tours, GetYourGuide y Tourist Israel**; Bein Harim y
Civitatis, no.

**Nuestra posición ya es mejor que la de todos ellos**: `/jerusalem-bethlehem-day-trip` explica el
cruce, el pasaporte y que el auto de alquiler no pasa, con nomenclatura pareja. Es una ventaja
construida que no está señalizada desde ninguna página cristiana.

---

## 3. Calendario

### 3.1 Qué ya está cubierto y no hay que repetir

`src/content/guides/shabbat-and-holidays-israel.md` (solo lectura para este informe) **ya tiene,
y correcto**: Semana Santa occidental 2027 (Ramos 21 mar, Viernes Santo 26 mar con la procesión
franciscana en la Vía Dolorosa, Pascua 28 mar); Pascua ortodoxa 2 de mayo con Fuego Santo el
1 de mayo; las tres Navidades de Belén (24–25 dic latina con la procesión del Patriarca y la
Misa de Gallo en Santa Catalina; 6–7 ene ortodoxa griega; 18–19 ene armenia); el aviso de que la
Misa de Gallo se saca por el Patriarcado Latino y se agota; y el párrafo de acceso al Fuego Santo
(cupo controlado por la policía, mirar desde las terrazas del Barrio Cristiano o cerca de New
Gate). **Nada de eso se reescribe.** Una página cristiana nueva enlaza ahí.

### 3.2 Lo que falta y sí hay que agregar

| Fecha 2027 | Qué es | Sitio asociado | ¿Está en la guía de fiestas? |
|---|---|---|---|
| **21–28 marzo** | Semana Santa católica/protestante | Vía Dolorosa, Santo Sepulcro | Sí |
| **5 de abril** | **Anunciación trasladada** | Basílica de la Anunciación, Nazaret | **No** |
| **25 abril – 2 mayo** | Semana Santa ortodoxa | Santo Sepulcro | Sí |
| **1 de mayo** | Fuego Santo (Sábado Santo ortodoxo) | Santo Sepulcro | Sí |
| **6 de mayo** | Ascensión (occidental) | Monte de los Olivos | **No** |
| **16 de mayo** | **Pentecostés occidental** | Monte Sión / Cenáculo | **No** |
| **20 de junio** | Pentecostés ortodoxo | Monte Sión / Cenáculo | **No** |
| **15 de agosto** | Asunción / Dormición | Abadía de la Dormición, Monte Sión | **No** |
| **8 de septiembre** | Natividad de María | Santa Ana, Jerusalén | **No** |
| **25 dic / 7 ene / 19 ene** | Las tres Navidades de Belén | Basílica de la Natividad | Sí |

**El dato que nadie publicó**: el 25 de marzo de 2027 (Anunciación) **cae en Jueves Santo**, así
que la solemnidad se traslada al **lunes 5 de abril de 2027**, el lunes de la segunda semana de
Pascua. Verificado en el calendario litúrgico 2027 de la USCCB
(`usccb.org/resources/2027cal.pdf`) y en calendarios diocesanos, consultado 2026-09-23. Para un
visitante que viaja a Nazaret por esa fiesta, es la diferencia entre llegar y no llegar.

**Las dos Pascuas de 2027**: separación de **35 días exactos**, el máximo posible. Vuelven a
coincidir el 16 de abril de 2028 (en 2026 coincidieron, ambas el 5 de abril). Fuentes:
`en.wikipedia.org/wiki/List_of_dates_for_Easter`, `calendardate.com/orthodox_easter_2027.htm`,
consultadas 2026-09-23.

### 3.3 Temporadas altas, según los propios operadores

- **Picos declarados**: Semana Santa y Navidad–Epifanía. Los operadores avisan de tarifas más
  altas y demanda por encima de la oferta, y piden reservar con mucha anticipación.
- **La ventana que todos recomiendan es mayo**, pasada la Semana Santa. **En 2027 ese consejo es
  falso**: el 2 de mayo es la Pascua ortodoxa y el 16 Pentecostés.
- **Dónde están las salidas reales del catálogo relevado**: septiembre–noviembre (Éxodo,
  Peregrino.travel, Peregrinaciones.mx) y febrero–marzo (Peregrinaciones.com, con la "Semana
  Blanca" española como gancho). Es decir: **los operadores venden fuera del pico**, porque en el
  pico no consiguen camas.
- **Ventana navideña de Belén: del 25 de diciembre al 19 de enero.** Son tres micro-temporadas
  vendibles y casi ningún operador hispano las explota: todos venden "Navidad" = 25 de diciembre.

---

## 4. Keywords

Datos propios: `data/seo/peregrinacion.json`, generado el 2026-09-23 con
`node scripts/seo/peregrinacion.mjs`. 116 filas de keyword en 7 mercados (EE. UU. 2840, España
2724, México 2484, Argentina 2032, Brasil 2076, Italia 2380, Francia 2250), volumen de Google
Ads, dificultad de DataForSEO Labs, intención, y 20 SERP reales a profundidad 10. **Costo total
US$1,5575** sobre un tope de US$3, registrado en `data/seo/costs.json` (de esos, US$0,36 se
pagaron dos veces por un fallo de caché mío al integrar la sonda de homónimos al script; está
dicho para que el número cierre).

### 4.1 Top 15 por volumen, con quién rankea #1

| # | Keyword | Mercado | Vol. | KD | Intención | #1 hoy | ¿Sirve? |
|---:|---|---|---:|---:|---|---|---|
| 1 | church of the holy sepulchre | EE. UU. | 49.500 | 25 | info | en.wikipedia.org | **Sí** |
| 2 | ~~tierra santa~~ | Argentina | 33.100 | 8 | info | **tierrasanta.com.ar** (parque temático, Buenos Aires) | **No: homónimo** |
| 3 | mount of olives jerusalem | EE. UU. | 27.100 | 7 | info | en.wikipedia.org | Sí, pero el número es el de `mount of olives` |
| 4 | mount tabor israel | EE. UU. | 27.100 | 10 | info | en.wikipedia.org | Parcial: mismo volumen que `mount tabor` (incluye Portland) |
| 5 | garden of gethsemane | EE. UU. | 22.200 | 6 | info | en.wikipedia.org | **Sí** |
| 6 | church of the nativity bethlehem | EE. UU. | 14.800 | 24 | info | en.wikipedia.org | **Sí** |
| 7 | ~~getsemani~~ | México | 9.900 | 0 | info | es.wikipedia.org | Dudoso: `getsemani israel` = 30 |
| 8 | mar da galileia | Brasil | 9.900 | 0 | info | pt.wikipedia.org | **Sí** |
| 9 | via dolorosa | EE. UU. | 8.100 | 5 | info | en.wikipedia.org | **Sí** |
| 10 | ~~terra santa~~ | Brasil | 8.100 | 22 | info | **terrasanta.pa.gov.br** (municipio de Pará) | **No: homónimo** |
| 11 | monte de los olivos | México | 6.600 | 0 | info | es.wikipedia.org | **Sí** |
| 12 | via dolorosa jerusalem | Brasil | 4.400 | 0 | info | pt.wikipedia.org | **Sí** |
| 13 | garden tomb | EE. UU. | 3.600 | 6 | info | gardentomb.com | **Sí** |
| 14 | terra santa | Italia | 3.600 | 4 | info | (no se pidió SERP) | Revisar homonimia |
| 15 | holy land tour | EE. UU. | 2.900 | 25 | info | **holylandtourstravel.com** | **Sí, comercial** |

Tabla completa de las 116 filas en `data/seo/peregrinacion.json`.

### 4.2 Los controles de homonimia (lo que salvó el estudio)

| Keyword de control | Mercado | Volumen | Lectura |
|---|---|---:|---|
| mount tabor | EE. UU. | **27.100** | Idéntico a `mount tabor israel`: Google agrega variantes |
| mount tabor portland | EE. UU. | 3.600 | Parte del volumen anterior es Oregon |
| mount of olives | EE. UU. | **27.100** | Idéntico a `mount of olives jerusalem` |
| holy sepulchre | EE. UU. | 12.100 | Acá manda el calificado (49.500), no el corto |
| tierra santa buenos aires | Argentina | 2.900 | El parque tiene demanda propia |
| **tierra santa israel** | Argentina | **140** | La demanda real argentina por Israel |
| **terra santa israel** | Brasil | **140** | Idem Brasil |
| **getsemani israel** | México | **30** | Idem México |

### 4.3 Lectura por idioma

- **Inglés (EE. UU.)**: el único mercado con volumen real. Los sitios concentran todo
  (49.500 + 22.200 + 14.800 + 8.100 + 3.600 + 2.900). Lo comercial es chico pero existe:
  `holy land tour`/`holy land tours` 2.900 cada uno (KD 25), `christian tours israel` 390 con
  **intención comercial** y CPC US$1,32, `holy land tour packages` 170. `holy fire jerusalem` 880
  y `qasr el yahud` 720 con KD 3 y 7: regalados.
- **Español**: el mercado está hueco una vez descontado el homónimo. Lo aprovechable son los
  sitios: `santo sepulcro` 2.900 (ES) / 1.900 (MX) / 1.600 (AR), `mar de galilea` 1.600/2.900/880,
  `monte de los olivos` 1.300/6.600/880, `huerto de getsemani` 1.900 (MX). Lo comercial es
  marginal: `viaje a tierra santa` 320 (ES), 170 (MX), 40 (AR); `peregrinacion a tierra santa`
  20/10/10. **En español no hay negocio en la keyword de producto.**
- **Portugués (Brasil)**: `mar da galileia` 9.900 y `via dolorosa jerusalem` 4.400 con KD 0 son
  las dos mejores oportunidades individuales de todo el estudio por relación volumen/dificultad.
  Lo comercial, 90 y 20.
- **Italiano**: `terra santa` 3.600 (KD 4), `santo sepolcro gerusalemme` 2.400 (KD 0), `lago di
  tiberiade` 2.400 (KD 0), `monte degli ulivi` 720. `pellegrinaggio terra santa` 260.
- **Francés**: `terre sainte` 1.900 (CPC US$6,42, el más alto del set), `mont des oliviers`
  1.300, `lac de tibériade` 1.000. `pèlerinage terre sainte` 110.
- **Alemán (agregado el 2026-09-23, US$0,12; cerraba el agujero de §8)**: mejor de lo esperado.
  `grabeskirche jerusalem` **2.900 con KD 0** — la mejor relación volumen/dificultad del estudio
  después del portugués, y el alemán **sí es uno de los cinco idiomas del sitio**. Le siguen
  `via dolorosa jerusalem` 1.300 (KD 0), `kapernaum` 1.300 (KD 0), `garten gethsemane` 1.000
  (KD 16), `geburtskirche bethlehem` 720 (KD 0), `berg der seligpreisungen` 210 (KD 0). Lo
  comercial no existe: `pilgerreise israel` 30, `israel rundreise christlich` 30,
  `pilgerreise heiliges land` 10, `israel pilgerreise katholisch` 0. Mismo patrón que en todos
  los idiomas: demanda de lugar, no de producto.
- **Nosotros no aparecemos en ninguno de los 20 SERP.** Cero posiciones.

### 4.4 Intención: el set entero es informativo

De las 116 filas, **solo 14 salen como comerciales o transaccionales**, y la mayor es
`christian tours israel` con 390/mes. El resto del volumen es informativo puro. Traducido: el
lector de este nicho **no llega buscando un tour, llega buscando un lugar**, y la conversión hay
que construirla dentro de la página de lugar. Es lo mismo que hace holylandtourstravel.com, y es
lo contrario de lo que haríamos si armáramos una landing de "peregrinaciones".

`top_sights` aparece en `mar da galileia`, `monte de los olivos` y `christian tours israel`: en
esas tres Google ya muestra un carrusel de lugares arriba del orgánico.

### 4.5 Quién ocupa estos 20 SERP, contado

Apariciones de cada dominio en los 200 resultados (20 SERP × top 10):

| Apariciones | Dominio | Qué es |
|---:|---|---|
| 10 | youtube.com | Video. Confirma lo de `contenido-video.md`: el nicho se mira |
| 8 | en.wikipedia.org | Enciclopedia |
| **8** | **holylandtourstravel.com** | **Operador. Empata con Wikipedia** |
| 7 | tripadvisor.com | Marketplace |
| 6 | facebook.com | Redes |
| 5 | britannica.com | Enciclopedia |
| 4 | touristisrael.com | Operador |
| 4 + 4 | es/pt.wikipedia.org | Enciclopedia |
| 2 | bibleplaces.com, holylandsite.com | Contenido de sitios bíblicos |
| 2 | beinharimtours.com | Operador (afiliado nuestro, 15 %) |
| 2 | pilgrimtours.com, israeltourismconsultants.com | Operadores de peregrinación |
| 2 | gardentomb.com | El sitio, oficial |
| 2 | elal.com | Aerolínea haciendo contenido |

**Un operador empata con Wikipedia en cobertura de SERP.** No es un blog, no es un medio: es una
empresa que vende tours y escribió las páginas de lugar. Ese es el modelo a copiar.

---

## 5. Cómo son las páginas que rankean

Se abrieron los tres primeros orgánicos de los 20 SERP, salteando marketplaces, redes y
Wikipedia. Todo el 2026-09-23.

### 5.1 Primero, una corrección: no son 20 competidores, son menos

**Tres de los dominios del top son el mismo operador.** Verificado por firma legal y teléfono
compartido (**+1 800 933 4421**) y por catálogo con precios idénticos:

| Dominio | Rol | Firma legal publicada |
|---|---|---|
| `holylandtourstravel.com` | Contenido EN + venta | "Operated by Israel Tourism Consultants (DBA Vacations For Less, Inc., established March 1995)" |
| `israeltourismconsultants.com` | Marca madre EN | Misma DBA |
| `tierrasantaisrael.com` | Réplica en español | "Israel Tourism Consultants, DBA de Vacations For Less, Inc." |

Ese operador ocupa **#1, #2 y #4 de `holy land tour`**, **#3 de `mount of olives jerusalem`**
(27.100), **#4 de `via dolorosa`** (8.100) y **#2 de `viaje a tierra santa`** (es-ES). La
estrategia visible es **un dominio de contenido separado del corporativo, más un dominio por
idioma**. No es un blog que monetiza: es un operador que trata el contenido como canal.

Y **`tudosobrejerusalem.com` es propiedad de Civitatis**: rankea #2 en `via dolorosa jerusalem`
(pt-BR, 4.400) con una guía de destino cuyo único fin es empujar reservas del marketplace, con
los precios de Civitatis embebidos en el texto.

### 5.2 El dato incómodo

`holylandtourstravel.com` rankea **#4 para 8.100 búsquedas/mes** con una página de Vía Dolorosa
de ~1.200 palabras **sin mapa, sin horarios, sin autor, sin fecha y sin la lista de las catorce
estaciones**. Lo que sí tiene: URL con la keyword exacta, un silo de ~150 fichas de sitio
enlazadas entre sí, y enlazado interno denso hacia el producto. **La barrera de entrada es más
baja de lo que parece, y lo que gana no es la profundidad sino la estructura de silo.**

El otro extremo: `vamosparaisrael.com.br` rankea **#2 para `mar da galileia` (9.900/mes)** con un
**post de 350–400 palabras** de una agencia de Joinville, con autor y foto ("Ernesto e Rita"),
fecha visible (3 de enero de 2022) y dos números de WhatsApp. En portugués la barrera es
bajísima.

### 5.3 Las 10 prácticas copiables

1. **Bloque fijo "datos de visita" arriba de cada ficha de sitio.** `seetheholyland.net` (#3 en
   `mount of beatitudes`) pone cinco campos: coordenadas (`32°53'11"N, 35°33'11"E`), horario con
   variación estacional (`8-11.45am, 2.30-5pm (4pm Oct-Mar)`), **quién administra el sitio**,
   teléfono del lugar y precio de entrada. **Ningún operador grande lo tiene.**
2. **El horario merece su propia página corta.** `churchoftheholysepulchre.net` rankea **#2 para
   49.500 búsquedas/mes** con una `/visitor-information/` de **200 palabras**: horario, "admission
   is free", cómo llegar, "dress modestly" y el aviso de que la espera llega a una hora. Es el
   mejor ratio esfuerzo/resultado de todo el corpus.
3. **Agrupá las listas largas por tema en vez de enumerarlas.** Civitatis parte las catorce
   estaciones en Condena / Caídas / Encuentros / Muerte y Crucifixión, no en 1–14. Más escaneable
   y más citable por el AI Overview.
4. **Cerrá cada ficha con "lugares cercanos" + módulo de producto.** Bein Harim enlaza 45+
   atracciones y después mete un carrusel "Tours You May Like" con precio (`from $75`) y botón.
   Convierte una guía en embudo sin romper la lectura. **Es exactamente lo que hace nuestro
   `BookYourTrip`, pero ellos lo ponen después de un bloque de navegación interna.**
5. **Precio con la fecha de salida al lado, nunca un "desde" suelto.** Pilgrim Tours publica la
   tabla completa (`$2.429` para el 27 nov–6 dic 2026 contra `$2.679` en octubre) y marca
   `"Wait-list only"` en las agotadas: responde la consulta y genera escasez sin inventarla.
   **Nosotros no podemos publicar precios propios, pero sí podemos explicar que el precio varía
   por fecha y cuánto**, que es el dato que nadie da.
6. **Desglosá los extras en vez de esconderlos.** Brevivet lista aparte `quota d'iscrizione
   € 39`, `tasse aeroportuali € 230`, single `€ 360` y suplemento por aeropuerto; Pilgrim declara
   las propinas prepagas (`$125 por persona`); Holy Land Tours declara las tasas de cruce
   (~`$37` Egipto, ~`$16` Jordania). **El desglose es nuestra tabla normalizada de §6.1.**
7. **Nombrá el organismo que acredita al guía, no el adjetivo.** Compará *"expert Biblical
   guides"* con **"Guida biblica italiana abilitata dalla Commissione Episcopale dei
   Pellegrinaggi Cristiani in Terra Santa"** (Opera Romana Pellegrinaggi) o **"Guía Franciscano o
   Sacerdote Guía Titulado (Custodia Franciscana)"** (btravel). La credencial nombrada es gratis y
   es el único diferenciador verificable. **Es literalmente el activo de Mariluz.**
8. **Cubrí el hueco de Belén que nadie cubre.** De los 20 dominios, **ninguno explica el
   procedimiento del cruce**. La única mención (FAQ de holylandtourstravel) existe para desactivar
   la pregunta: *"direct, easy and no prior authorization is required"*, y no dice que el auto de
   alquiler israelí no pasa. **Nosotros ya lo tenemos escrito en
   `/jerusalem-bethlehem-day-trip`** — es la brecha más grande del corpus y ya la ganamos.
9. **FAQ construida sobre las preguntas que ya sabemos que se hacen.** La FAQ de
   holylandtourstravel tiene 19 preguntas en acordeón, y las cuatro que nadie contesta bien son:
   **qué llevar · código de vestimenta por sitio · si se puede asistir a misa y cómo se reserva ·
   cuánto cuesta de verdad**. Modelo de tono para "¿es seguro?": Terra Santa Brasil responde con
   un dato verificable (*"32 anos sem incidentes com passageiros"*), no con un adjetivo.
10. **Autor con nombre, cara y fecha visible.** Los tres sitios del corpus que lo hacen
    (Dr. Todd Fink en holylandsite, Pat McCarthy en seetheholyland, "Ernesto e Rita" en
    vamosparaisrael) rankean top-3 **con menos autoridad de dominio que los operadores**.
    seetheholyland suma bibliografía de cinco fuentes académicas y créditos de foto en una ficha
    de 1.800 palabras. Es la acción 2 de `competidores.md` §4.4, otra vez.

**Una práctica extra que no aplica ahora pero conviene tener anotada**: el producto B2B para
líderes de grupo. `ictusvoyages.com` deja **filtrar viajes por acompañante entre 400+ sacerdotes
nominados**; Terres de la Bible tiene un "Kit du chef de groupe"; Inspiration Travel tiene una
sección de navegación llamada "Headliners"; Opera Romana publica **un PDF descargable por fecha
de salida** (el activo que el líder de grupo reenvía a su parroquia). Ninguna guía de viaje
generalista hace esto, y es donde está el ticket alto. Si la propuesta con Mariluz avanza hacia
grupos, este es el molde.

### 5.4 Lo que casi nadie hace (o sea, el hueco)

| Práctica | Cuántos de los ~20 dominios la tienen |
|---|---|
| Horarios de apertura por sitio | 3 |
| Código de vestimenta | 2, y en una línea |
| **Tabla comparativa de cualquier cosa** | **0** |
| FAQ que cubra "qué llevar" / "cuánto cuesta" / "¿puedo ir a misa?" | 1, parcial |
| Fecha de actualización visible | 1 |
| Créditos de foto | 1 |
| **Explicación del cruce a Belén** | **0** |
| Mapa | 3 |

**Tenemos seis de las ocho ya construidas en el sitio** (tablas comparativas, FAQ con JSON-LD,
fecha de actualización, créditos de foto obligatorios por `photo-guard`, el cruce a Belén, y
horarios en varias guías). Lo que falta no es capacidad: es la página.

---

## 6. Arquitectura recomendada

**Restricción previa, que no se salta**: la regla 2 del `CLAUDE.md` prohíbe crear páginas sin
aprobación explícita de Sebastian, y el `ROADMAP.md` dice que en la fase 3 **no se escriben
páginas nuevas** hasta que un clic de afiliado registre. Entonces esto es una **propuesta**, y va
partida en dos: lo que se puede hacer ya sin crear nada, y lo que espera aprobación.

Convención confirmada: los slugs son iguales en los cinco idiomas, con prefijo
(`/es/jerusalem`, `/fr/galilee`). No se inventan slugs traducidos.

### 6.1 Lo que se amplía ya, sin crear ninguna página

| Página | Qué se le agrega | Por qué |
|---|---|---|
| `/israel-tour-packages` | Tabla comparativa **normalizada por aéreo** (con vuelo / land only / sin vuelo) + fila "capellán y misa diaria: sí / no / solo desde N personas" + las propinas como costo oculto (Pilgrim US$110–140) | Es el hueco #8: **nadie** normaliza, y es la comparación que el lector no puede hacer solo |
| `/jerusalem` | Horarios de misa verificables y cómo reserva un grupo; bloque "la mañana clásica" (Monte de los Olivos → Getsemaní → Vía Dolorosa → Santo Sepulcro) | Ya tiene 7.063 palabras y todos los sitios; le falta la capa de logística que nadie publica |
| `/shabbat-and-holidays-israel` | Anunciación **trasladada al 5 de abril de 2027**, Ascensión 6 may, Pentecostés 16 may / 20 jun, Asunción 15 ago, Natividad de María 8 sep | Completa el calendario cristiano, que hoy llega hasta Semana Santa y Navidad |
| `/nazareth-sea-of-galilee-day-trip` | Caná, Magdala y Monte Tabor como paradas; y la diferencia práctica **Yardenit vs. Qasr el Yahud** | Son paradas de 8–9 de cada 12 itinerarios y hoy faltan; y 9 de 12 catálogos dicen "Jordan River" sin aclarar cuál |
| `/jerusalem-bethlehem-day-trip` | La ventana navideña completa (25 dic / 7 ene / 19 ene) en vez de "Navidad" | Tres micro-temporadas vendibles en vez de una |
| `/galilee` | Sección de los sitios cristianos del lago, con horarios | `mar da galileia` 9.900 y `lac de tibériade` 1.000, KD 0 |

### 6.2 Páginas nuevas propuestas (esperan aprobación)

**Inglés — tres, en este orden.**

**1. `/church-of-the-holy-sepulchre`** — keyword `church of the holy sepulchre`,
**49.500/mes (EE. UU.), KD 25**. Es el número más grande y más sólido del estudio: sobrevive al
control de homonimia (la variante corta `holy sepulchre` da 12.100, o sea que acá manda el
calificado). Hoy es una sección de ~500 palabras dentro de `/jerusalem`.
- Secciones: qué hay adentro, sitio por sitio · horarios reales y **la regla de la primera hora**
  · cuánto se espera para entrar a la Tumba según el horario · código de vestimenta · **misas:
  horarios, idiomas y cómo reserva un grupo** · las comunidades que comparten el templo, contado
  como lo que le cambia al visitante · cómo llegar desde cada puerta · FAQ.
- FAQ objetivo (sale de `people_also_ask`, presente en los 20 SERP): ¿es gratis? · ¿a qué hora
  conviene ir? · ¿se puede asistir a misa? · ¿se pueden sacar fotos? · ¿cuánto lleva? · ¿abre en
  Shabat? (sí — y ya lo tenemos escrito).
- Afiliado: GetYourGuide y Viator (Ciudad Vieja), **Bein Harim** (vende tours cristianos y paga
  15 % con cookie de 90 días), Booking para hospedaje cerca de las puertas.
- **Riesgo**: canibaliza `/jerusalem`. En `/jerusalem` queda un resumen de ~150 palabras y un
  link; nada de dejar las dos versiones largas.

**2. `/via-dolorosa`** — keyword `via dolorosa`, **8.100/mes, KD 5**: la dificultad más baja del
set con volumen alto. Las catorce estaciones con dónde está cada una y a cuál se entra · **la
procesión franciscana de los viernes** · cuánto lleva · solo vs. con guía · qué pasa el Viernes
Santo · el tramo que es souk. Afiliado: GetYourGuide; Civitatis en `/es/`. Hoy son ~200 palabras
dentro de `/jerusalem`.

**3. `/christian-sites-israel`** (hub) — keywords `holy land tour` 2.900 (KD 25) y
`christian tours israel` 390, **la única con intención comercial** y el CPC más alto del set
(US$1,32). Secciones: **mapa** de los sitios por región (ningún competidor hispano tiene uno) ·
**la tabla de frecuencia de §2** · el calendario de §3, enlazando a la guía de fiestas · **las
diferencias entre tradiciones como logística de visita** (Santo Sepulcro y Garden Tomb como dos
sitios que se visitan distinto; Yardenit y Qasr el Yahud como dos lugares de bautismo; misa
diaria como algo que un itinerario incluye o no) · **la tabla de paquetes normalizada por aéreo**
· por tu cuenta vs. paquete. Deriva a `/jerusalem`, `/galilee`, los dos day trips y
`/israel-tour-packages`. Afiliado: **Bein Harim primero** — es el único partner que literalmente
vende "Christian day tours" en cuatro idiomas.

**Español — los mismos tres slugs bajo `/es/`.** Volumen menor (`santo sepulcro` 2.900 España /
1.900 México / 1.600 Argentina; `monte de los olivos` 6.600 México) pero **KD 0** en casi todo, y
el competidor hispano tiene el piso técnico que se ve en §5. Si hay que recortar: el Santo
Sepulcro y el hub, y la Vía Dolorosa queda como sección.

**Francés — ninguna página nueva.** El head cristiano es chico (`saint sépulcre jérusalem` 170;
lo que tiene volumen, `terre sainte` 1.900 y `mont des oliviers` 1.300, son consultas de
enciclopedia).

**Alemán — medido el 2026-09-23 (§4.3) y sí da: `grabeskirche jerusalem` 2.900 con KD 0.** Es
menos volumen que el inglés pero con la cuarta parte de dificultad, y el alemán ya es uno de los
cinco idiomas del sitio. **Recomendación corregida**: cuando el Santo Sepulcro en inglés muestre
que mueve, la primera traducción que conviene no es la del hub sino
`/de/church-of-the-holy-sepulchre`, y detrás `/de/via-dolorosa` (1.300, KD 0). Lo comercial en
alemán no existe (`pilgerreise israel` 30), así que el hub en DE no.

**Hebreo — ninguna.** Ya está dicho en `competidores.md` §4.2.

### 6.3 Lo que NO vale la pena crear, y por qué

| Página descartada | Motivo |
|---|---|
| `/holy-land-pilgrimage`, `/es/peregrinacion-tierra-santa` | 880 y 20/mes. La SERP está cerrada por operadores que venden paquete con capellán. No tenemos producto que poner ahí |
| `/es/tierra-santa` | **Trampa de homónimo**: el #1 es el parque temático de Buenos Aires. `tierra santa israel` son 140/mes |
| `/mount-tabor` | Los 27.100 son el volumen de `mount tabor` a secas, que incluye el parque de Portland |
| `/catholic-tours-israel`, `/evangelical-tours-israel`, `/orthodox-tours-israel` | Sin volumen medible. Van como secciones del hub, tratadas como diferencias de itinerario |
| `/garden-tomb` | 3.600/mes, pero el sitio oficial ocupa el **#1 y el #3**. Sección del hub y de `/jerusalem` |
| `/ein-karem` (480), `/emmaus-israel` (320), `/capernaum` (2.400 con KD 27) | Muy chicas para página propia. Secciones de `/jerusalem` y `/galilee` |
| Un sexto y séptimo idioma (PT, IT) | Donde están los mejores números (KD 0 con 9.900 y 4.400), pero abrir idiomas contradice la fase del ROADMAP. Anotado, no recomendado ahora |

### 6.4 Orden sugerido

1. Todo lo de **§6.1**, que no necesita aprobación y mejora páginas que ya existen.
2. **Correr el set de keywords en alemán** (`location_code` 2276) para cerrar el agujero.
3. Cuando la fase 3 cierre: `/church-of-the-holy-sepulchre` en EN. Es la apuesta individual más
   grande del sitio entero, por volumen y por solidez del dato.
4. **Medir esa página sola durante un ciclo** antes de escribir las otras dos. Si no mueve, las
   otras dos tampoco van a mover, y nos ahorramos seis páginas en dos idiomas.

### 6.5 Afiliados, por página

Hoy hay **11 partners definidos en `src/config/affiliates.ts` y 0 IDs cargados**. Para este
nicho los que sirven son cuatro, y el orden importa:

| Partner | Por qué acá | Dónde |
|---|---|---|
| **Bein Harim** (15 %, cookie 90 días) | **El único partner que vende "Christian day tours" con catálogo propio en EN, ES, DE y FR**, de US$50 a US$2.499, y está atrás del producto estrella de GYG y Viator. Comprar directo ahí sale **US$106** contra US$121 en GYG: el lector paga menos y nosotros cobramos más | Hub, Santo Sepulcro, Vía Dolorosa, los dos day trips, `/israel-tour-packages` |
| **GetYourGuide** | 187 actividades en Jerusalén, 60 en Belén, 34 en Nazaret. Widget nativo con precio y rating reales (el patrón de LP, Atlas Obscura y Sommertage, ya documentado en `competidores.md` §2) | Todas |
| **Civitatis** | Es el partner que el lector hispano espera. **Pero ojo**: su Excursión a Belén tiene 6,8/10 con 182 opiniones y un desajuste declarado de idioma del guía. Recomendarlo sin decir eso sería deshonesto | Solo `/es/` |
| **Booking** | Hospedaje cerca de las puertas de la Ciudad Vieja, Nazaret y Tiberíades | Hub y Santo Sepulcro |

**Viator queda cuarto**: mismo producto, más caro, ficha sin entradas incluidas y listados
auto-traducidos al español.

**Un límite que hay que decirle al lector hispano**: Bein Harim ofrece español en unos ocho días
sueltos, pero **en ninguno de sus paquetes Christian Holy Land de 7 a 12 días** — todos son solo
en inglés. Y **no se encontró un solo tour ofrecido en portugués en ninguna de las seis
plataformas**. O sea: en `/es/`, la recomendación honesta es "día suelto con guía en español sí,
paquete largo en español no; para eso están las agencias de §1.3". Decirlo es exactamente el tipo
de dato que nos diferencia de Civitatis, que vende en español y ejecuta en inglés sin avisar.

**Lo que no se puede hacer**: publicar los precios de esta auditoría como si fueran precios
vigentes del sitio. Son del 2026-09-23 y son "desde". En prosa, rangos; el precio exacto lo pone
el widget del partner. Es la regla de honestidad de datos del `CLAUDE.md` y es además lo que
evita los 1.006 datos inventados del agente viejo.

---

## 7. Fuentes

Todas consultadas el **2026-09-23**.

**Datos propios**: `data/seo/peregrinacion.json` (generado por `scripts/seo/peregrinacion.mjs`),
`data/seo/costs.json`. Leídos, no modificados: `src/content/guides/shabbat-and-holidays-israel.md`,
`src/content/regions/jerusalem.md`, `src/content/guides/{israel-tour-packages,
jerusalem-bethlehem-day-trip, nazareth-sea-of-galilee-day-trip}.md`, `src/i18n/ui.ts`,
`src/config/affiliates.ts`, `scripts/seo/targets.json`, `ROADMAP.md`,
`gestion/auditoria/{competidores,seo}.md`, `gestion/negocio/{propuesta-mariluz,contenido-video}.md`.

**Operadores de peregrinación**: 206tours.com (/holyland/, /cms/tour111/) y 206viajes.com;
pilgrimtours.com/israel-tours/ (best-of-israel-9, -10, israel-detail-11);
eo.travelwithus.com/holy-land y /tours/hl27a/; franciscanpilgrimages.com; nawas.com
(/catholic-pilgrimages/, /protestant-programs/); custodia.org/en/pilgrimages-holy-land/;
cicts.org (/en/welcome, /en/catholic-masses-jerusalem-0); cmc-terrasanta.org;
magitravelinc.com/holy-land; israeltravelcenter.com (dominio estacionado).

**Masivos**: beinharimtours.com (/christian-day-tours/, /tour-packages/, /west-bank-tours/,
/christian-8-days-tour/, /garden-of-gethsemane/, /es/mount-of-olives/,
/catholic-pilgrimage-tours-to-holy-land/, /traveling-to-west-bank/); touristisrael.com
(/type/christian-israel-tours/, /bethlehem-west-bank/ — **403, vía buscador**);
abrahamtours.com/tours/; civitatis.com/es/ (israel, jerusalen, tel-aviv y fichas);
getyourguide.com (jerusalem-l97, bethlehem-l13226, nazareth-l211, t22202, t213663, t21501) y
getyourguide.es/belen-l13226; viator.com (d921, d22419, d36686, d920-5209JERBETH).

**Español**: halconviajes.com/oferta/peregrinaciones/; peregrinaciones.com (/tierra-santa/,
/viaje/tierra-santa/); exodoperegrinaciones.com; peregrino.travel; antiaviajes.com;
sanjuandelhospital.es; peregrinaciones.mx; travelviajes.com.co; toursatierrasanta.com;
peregrinacioncatolica.com (**403**); diocesisvitoria.org; 4tourists.com.ar (producto inactivo);
israeltogether.org (**404**).

**Páginas que rankean**: holylandtourstravel.com (Mount of Olives, Via Dolorosa, FAQ, catálogo);
israeltourismconsultants.com; tierrasantaisrael.com; holylandsite.com/via-dolorosa;
seetheholyland.net/mount-of-beatitudes/; bibleplaces.com (/mtbeatitudes/, /mounttabor/);
churchoftheholysepulchre.net (+ /visitor-information/); holysepulchre.com; gardentomb.com
(+ /book-visit/); israelchristiantours.com; inspirationtravel.com (**tours/israel = 404**);
btravel.com; operaromanapellegrinaggi.org; brevivet.it; ictusvoyages.com; terresdelabible.com;
domusviagens.com.br; terrasantabrasil.com.br; tudosobrejerusalem.com/via-dolorosa;
vamosparaisrael.com.br.

**Calendario**: usccb.org/resources/2027cal.pdf (Anunciación trasladada al 5 de abril de 2027);
en.wikipedia.org/wiki/List_of_dates_for_Easter; calendardate.com (orthodox_easter_2027,
pentecost_2027); travelpalestine.ps (las tres Navidades de Belén); holysepulchre.com/holy-fire.

---

## 8. Lo que no pude verificar

- **Precios de 206 Tours y de Nawas**: ninguno de los dos publica cifra en su página de producto.
  206 Tours solo muestra el depósito de US$500; Nawas, nada. Circula un "US$4.199 desde San
  Francisco" atribuido a Nawas: **proviene de folletos parroquiales de terceros de 2023, no del
  sitio**, así que no se toma como precio.
- **Tourist Israel**: 403 en todos los fetch. Los diez precios de §1.2 salen de snippets de
  buscador y **no se confirmaron abriendo la página**. Sus idiomas y su segmentación confesional
  quedaron sin verificar.
- **Precios de peregrinacioncatolica.com** (403) y de **Inspiration Travel** (su página de tours
  de Israel da 404). **Diócesis de Vitoria** y **New Gate Tours**: no publican precio.
- **Horarios del Garden Tomb**: la home dice `9:00–13:00` y "cerrado viernes y domingos"; un
  snippet del mismo dominio dice lunes a sábado 8:00–12:00 y 14:00–17:30, cerrado domingo.
  **Contradictorio: no publicar ninguno de los dos sin chequear en vivo.**
- **EO Holy Land Classic**: los días 4, 5, 6, 8 y 9 del itinerario no se pudieron desglosar, así
  que no sé si incluye Santo Sepulcro, Vía Dolorosa, Caná, Monte Tabor, Ein Karem o Masada.
- **La tabla de frecuencia de §2** es un conteo de menciones en páginas públicas, no un censo de
  itinerarios reales. Un "no" puede significar "la página no lo listaba".
- **Volúmenes deprimidos por la guerra**: todo el tráfico de Israel cayó 10–29 % en agosto 2026
  (`competidores.md` §0.7). Estos volúmenes son de ese contexto y **probablemente subestimen** la
  demanda normal. No hay forma de corregirlo con los datos que tenemos.
- ~~**Alemán: no se midió.**~~ **Cerrado el 2026-09-23**: se corrió el set con `location_code`
  2276 por US$0,12 y el resultado está en §4.3 y §6.2. `grabeskirche jerusalem` 2.900 con KD 0.
- **Italiano**: no se corrió el control de homonimia para `terra santa` (3.600). Dado lo que pasó
  en Argentina y Brasil, **hay que correrlo antes de usar ese número**.
- **`getsemani` (es-MX, 9.900)**: el control da `getsemani israel` = 30 y `getsemani cartagena`
  = 590, pero `huerto de getsemani` = 1.900. La consulta genérica probablemente mezcla el barrio
  de Cartagena, la canción y el lugar. **El número real aprovechable está más cerca de 1.900 que
  de 9.900.**
- **Fecha de traslado de la Anunciación fuera del rito romano** (ortodoxos, armenios): no se
  verificó.
- **Cupo del Fuego Santo**: las cifras varían mucho entre años y fuentes (1.800+200 según
  recomendaciones de las iglesias, 4.200 aplicado en 2024). **No hay un número estable que se
  pueda publicar como dato firme.**
- **Costo del dato**: US$1,5575 de un tope de US$3. De eso, **US$0,36 se pagaron dos veces** por
  un fallo de caché al integrar la sonda de homónimos al script (el orden de las claves del JSON
  cambió el hash). Está corregido en el script; se dice para que el número cierre.

