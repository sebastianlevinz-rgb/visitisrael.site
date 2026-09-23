# Contenido en video para traer tráfico a visitisrael.site

**Fecha**: 2026-09-23. **Para**: Sebastian. **Qué es**: research de qué funciona hoy en video
sobre Israel (YouTube con datos; TikTok/Instagram con lo que se pudo verificar) y una propuesta
de formato, 30 ideas, top 10 para arrancar, plan de las dos primeras jornadas de rodaje con Mari,
y cómo cada video manda tráfico al sitio.

**Cómo se hizo**: 46 consultas al SERP de YouTube vía DataForSEO (24 en inglés desde EE. UU.,
16 en español desde España, 4 desde Argentina, 2 desde México), 20 resultados por consulta, el
2026-09-23. 523 videos únicos; 54 descartados por no ser turismo (bandas llamadas "Tierra Santa",
Eurovision, noticieros). Para los 15 con más vistas se pidió `video_info` (likes, comentarios).
Costo: **US$0,18** (+ US$0,002 de un probe), registrado en `data/seo/costs.json` bajo
`video/youtube.mjs`. Datos crudos en `data/video/youtube.json`; creators y cuentas de
TikTok/Instagram en `data/video/social.json`. Script re-ejecutable:
`node scripts/video/youtube.mjs --info` (desde caché: US$0).

**Límites de los datos**: las vistas son las que YouTube mostraba en el SERP ese día. Las fechas
de videos con más de un año vienen como "hace N años" y quedan con precisión anual; las de los
SERPs en español las estimé yo del texto (marcadas `publishedAtEstimated`). El SERP de México
devolvió vistas en cero (DataForSEO no parseó el formato) y se ignora. "Vistas por mes" es
vistas ÷ meses desde publicación, mínimo medio mes: sirve para comparar, no para proyectar.
Suscriptores de canales medianos no se pudieron verificar (YouTube sin JS, vidIQ 429, Social
Blade 403). TikTok e Instagram: sin API; solo snippets y rankings de terceros, marcados en
`social.json` como verificado / parcial / no verificado.

---

## 1. Qué muestran los datos

1. **El video turístico sobre Israel con más vistas de todo el set es un food tour de 41 minutos**
   (Mark Wiens, Jerusalén, 15,2 M). Le siguen Luisito Comunica en Jerusalén (14,9 M, 14 min,
   2018) y su comida callejera (12,8 M). Comida y "un día en Jerusalén" son el techo.
2. **Los que más rinden son largos**: de los 30 turísticos con más vistas, 19 duran más de 30
   minutos y la mediana es 39 min. En todo el set (sin shorts) la mediana es 14–17 min.
   Long-form de 15–40 min no es un riesgo, es la norma del nicho.
3. **En español hay 3,5 veces más vistas por video con menos oferta**: mediana 68.421 vistas
   (España) y 453.637 (SERP argentino) contra 19.155 en EE. UU. El SERP hispano lo ocupan cuatro
   mega-youtubers de paso (Luisito 2018, Lethal Crysis, Araya, Oscar Alejandro), series de
   peregrinación católica (P. José de Jesús Aguilar, 17 videos en el set) y un puñado de
   residentes con 5K–200K por video (Israel con Aline, Gini, Gastón y Oxana, JudeoHistoria).
   El video de Luisito aparece en 13 de 22 consultas ES: nadie lo reemplazó en ocho años.
4. **El género más viral en español es el que no vamos a hacer**: "barrio ultraortodoxo /
   vida oculta" suma 24 M en tres videos de Lethal Crysis más 7,8 M de Araya. Es morbo, no
   utilidad, y para una guía licenciada que vive en Jerusalén es reputación quemada.
5. **En inglés, lo que más corre en 2026 es "me dijeron que no vaya y fui"**: Harry Jaggard 5 M
   en tres meses (1,6 M/mes, el más rápido del set), Seal On Tour 454K en un mes, Piers Travels
   228K en tres semanas, Phils Guide 400K. Tráfico de controversia. Tampoco es nuestro género,
   pero dice que la audiencia EN está mirando Israel otra vez.
6. **Las consultas de guía están casi vacías de contenido fresco**: "israel itinerary 7 days"
   (top: 41K, de 2020), "jerusalem shabbat" (top: 22K), "masada sunrise" (top real: 3K),
   "petra from israel" (229K de un canal cristiano, después 9K), "things to do in jerusalem"
   (#1 de 2022 con 794K, después 36K). Volumen de búsqueda web de esas keywords: 1.000, 480,
   14.800 (masada), 50. Nadie con licencia y cámara está cubriendo esto en 2026.
7. **El formato lista "X things you should NEVER do" sigue vivo**: Anna Goldman 200K (2023, en 4
   consultas), Milk & Honey 70K en dos semanas (sep-2026), travelingisrael "6 Tourist Pitfalls"
   97K, Lifeder "lo que No debes hacer" 4,75 M en ES. Mediana del formato lista: 70K, 3,5 veces
   la mediana general EN.
8. **Costos y seguridad son las preguntas**: "Living costs in Israel" 130K, "How expensive is
   traveling in Israel" 352K, "Israel vs Palestine: cost" 548K; en ES "¿Cuánto dinero necesito
   para viajar a Israel?" 143K, "¿Cuánto cuesta un viaje a Jerusalén?" 132K. Y la keyword
   `is israel safe to visit` tiene 4.400 búsquedas/mes con casi cero video fresco en EN
   (travelingisrael 32K, ene-2026); en ES el gancho "¿Es seguro venir?" le dio 2,25 M a Oscar
   Alejandro.
9. **El walking tour con explicación le gana al mudo**: HolyLandSite "Full Walking Tour with
   Maps & Explanations" 481K contra walking4k 279K y ExploreTheWorld 389K en el mismo recorrido.
   jeruwalks (texto en pantalla, cinematográfico) 1,42 M y 425K. Narración experta suma.
10. **Ya existen guías licenciados con canal y rankean**: travelingisrael.com (Oren, ~445K
    suscriptores según su IG, 15 videos en el set, #1 en costos/errores/itinerarios EN, videos de
    3–8 años), JudeoHistoria (Ariel Kanievsky, 76K en "9 consejos", en 7 consultas ES) e Israel
    con Aline (guía brasileña, **un canal por idioma**: el PT y el ES rinden, el EN 30 veces
    menos). Es el modelo Mari, ya validado por otros, con hueco en español y en 2026.

En TikTok/Instagram (`social.json`): no existe una cuenta de turismo receptivo de Israel con
escala. @visit_israel (Ministerio) 274K en IG; @israel (Estado) 1,5 M en TikTok pero es
político; Secret Tel Aviv 39K en IG (~40K vistas por reel, según ellos); Tourist Israel 21K.
Los rankings de "travel TikTokers de Israel" los encabezan cuentas de lifestyle y baile. Lo que
sí escala es comida israelí en receta corta (BenGingi 1,2 M TikTok). El hueco de short-form es
mayor que el de YouTube.

---

## 2. Formato

### Pilar: YouTube long-form, 12–25 minutos

- **Duración**: 12–25 min para listas, costos, seguridad, Shabat, itinerarios; 35–60 min para
  walk tours guiados (los que rinden en el nicho son largos: 39 min de mediana en el top 30).
  No hacer nada de 5–8 min salvo los de "un lugar, una pregunta" (Masada al amanecer, cómo
  flotar): ahí 8–10.
- **Estructura fija** (para que la edición sea repetible):
  1. 0:00–0:25 gancho: Mari a cámara, en el lugar, con el dato o el error que el video resuelve.
     Sin intro de marca.
  2. 0:25–0:45 qué va a ver y a dónde está la guía completa ("todo con precios de hoy en
     visitisrael.site/…", tarjeta).
  3. Cuerpo en bloques de 2–4 min, uno por punto de la lista o parada del recorrido. Cada
     bloque: Mari en cámara (30–60 s) → B-roll con voz en off (60–90 s) → pieza IA de apoyo
     (mapa animado, línea de tiempo, comparativa de precios; 15–30 s).
  4. Cierre 45 s: resumen de 3 puntos, CTA a la guía, pantalla final 20 s con el próximo video.
- **Ritmo**: corte cada 3–6 s en B-roll, plano fijo de 20–40 s cuando Mari explica. Subtítulos
  quemados en el idioma del video, siempre (la mitad de la audiencia de viajes mira sin sonido
  en el celular).
- **Mari a cámara**: todo lo que es criterio y experiencia. Qué evitar, en qué orden ir, qué
  horario, qué se paga y qué no, qué dice el guía que no dice el libro. Nada de leer historia
  de Wikipedia a cámara.
- **IA / motion**: mapas animados de recorrido, líneas de tiempo históricas, tablas de precios y
  horarios, comparativas (tour vs. por tu cuenta), pantallas de "dato". Regla del repo: nada de
  imágenes generadas de lugares ni personas reales; sí mapas, gráficos, tipografía, iconos.
  Voz en off: Mari graba la voz (una hora de estudio por tanda); no clonar voz.
- **Miniatura**: cara de Mari + un objeto del lugar + 3 palabras máximo. Los que rinden en el
  nicho (Anna Goldman, travelingisrael, Aline) usan cara + texto grande.

### De cada long-form salen 5–8 shorts (TikTok, Reels, Shorts, mismo archivo 9:16)

Momentos que se recortan, en orden de rendimiento esperado según lo que rankea:

1. **El dato sorprendente** (por qué las puertas de la Ciudad Vieja están en ángulo; cuánto
   baja el Mar Muerto por año; por qué Masada se sube de noche en verano).
2. **El error típico** ("no vengas al Muro el sábado con cámara", "no tomes taxi sin taxímetro
   del aeropuerto").
3. **El precio** ("esto cuesta X shekels, esto es gratis"), con la cifra en pantalla.
4. **El "no hagas esto"** (vestimenta en sitios religiosos, fotos a personas, horarios de
   Shabat).
5. **El lugar escondido** (azotea, cisterna, callejón, puesto del mercado).
6. **El momento visual puro** (flotar en el Mar Muerto, amanecer en Masada, sirena de Shabat
   con la ciudad vaciándose): sin voz, texto en pantalla, música.
7. **La pregunta directa a cámara** ("¿es seguro? te lo digo en 40 segundos").
8. **El antes/después o comparativa** (tour US$75 vs. por tu cuenta US$12).

Cada short lleva el mismo texto fijo en la descripción/comentario: "Guía completa con precios:
visitisrael.site/es/…" (TikTok no deja link en el caption hasta cierto umbral: va en la bio,
con un link por campaña y se rota).

### Idioma: español primero, inglés como segundo canal cuando haya biblioteca

Lo que muestran los datos: en español hay menos oferta, medianas 3,5 veces más altas, cero
guías licenciados hispanohablantes con canal grande, y el que rankea en toda la intención de
viaje es un video de 2018. En inglés hay más volumen de búsqueda (`is israel safe` 4.400,
`things to do in jerusalem` 1.000, `masada` 14.800) pero ya hay un guía licenciado con ~445K
suscriptores cubriendo exactamente el formato Mari, y la ola de 2026 es de controversia.

Israel con Aline es el caso de control: misma persona, un canal por idioma; el nativo (PT) y el
ES rinden, el EN casi no. Mezclar idiomas en un canal parte la audiencia y el algoritmo no sabe
a quién mostrarlo.

Recomendación:
- **Canal principal en español** ("VisitIsrael en español" o con el nombre de Mari), subtítulos
  EN quemados o como pista, títulos y descripciones bilingües. Arrancar acá.
- **Canal en inglés** recién con 12–15 videos ES publicados y medidos: se regraban a cámara los
  bloques de Mari en inglés sobre el mismo B-roll y las mismas piezas IA (el costo marginal es
  una tarde de grabación por cada 3–4 videos, no un rodaje nuevo).
- **Hebreo**: no en YouTube long-form (turismo interno, ya lo dice `competidores.md` §1.8). Sí
  como shorts ocasionales si Mari quiere, sin invertir edición.
- Shorts: el mismo recorte se publica en ES y EN (dos exports con subtítulos distintos), porque
  en vertical el costo marginal es cero.

---

## 3. Treinta ideas de video

Columnas: título de trabajo ES / EN · tipo · keyword y volumen mensual (`keywords.json` de
Google Ads: EE. UU. para EN, España para ES; "YT" cuando el dato es del SERP de YouTube) · guía
del sitio a la que manda tráfico (las páginas existen; no se crean nuevas, regla 2) · shorts que
salen · referencia real que funciona en ese formato (URL, vistas, duración).

| # | Título ES / EN | Tipo | Keyword · volumen | Guía que linkea | Shorts | Referencia |
|---|---|---|---|---|---|---|
| 1 | Jerusalén en un día con una guía licenciada / One day in Jerusalem with a licensed guide | walk guiado 35–45' | `que ver en jerusalén` 40 ES; `things to do in jerusalem` 1.000 EN | `/es/jerusalem`, `/jerusalem` | orden del recorrido; puerta en ángulo; azotea; precio entradas; error del sábado; el callejón | Island Hopper TV, 794K, 25' — youtube.com/watch?v=UkrWHk7bcIY |
| 2 | 12 errores que cometen los turistas en Israel / 12 mistakes tourists make in Israel | lista 14–18' | `israel travel tips` 30 EN; YT "mistakes/never do" mediana 70K | `/first-time-in-israel`, `/es/first-time-in-israel` | uno por error (6–8 shorts) | Anna Goldman, 200K, 15' — youtube.com/watch?v=R_qA4clR9aY; Milk & Honey 70K en 2 semanas — watch?v=PXVtMCt88wI |
| 3 | ¿Es seguro viajar a Israel en 2026? Te lo dice una guía que vive acá / Is Israel safe to visit in 2026? | safety 12–15' | `is israel safe to visit` 4.400 EN; `es seguro viajar a israel` 110 ES | `/is-israel-safe`, `/es/is-israel-safe` | respuesta en 40 s; qué pasa cuando suena una sirena; qué zonas; seguro de viaje | Oscar Alejandro "¿Es seguro venir?" 2,25 M, 42' — watch?v=Zg1eAn2qj78; travelingisrael 32K (ene-2026) — watch?v=e8cP0fnF_0A |
| 4 | Cuánto cuesta viajar a Israel: presupuesto real por día / What Israel really costs per day | costos 12–15' | `cuanto cuesta viajar a israel` (YT #1 143K); `israel travel cost` YT 130–548K | `/plan-your-trip`, `/es/plan-your-trip` | precio del hummus; taxi aeropuerto; entrada Masada; hotel vs hostel; SIM | Vamos A Recorrer El Mundo 143K, 10:37 — watch?v=QcJUxmgJAlU; Gabriel Traveler 352K, 18' — watch?v=Sq3e8gZltSQ |
| 5 | Shabat en Jerusalén: qué abre, qué cierra, qué hacer / Shabbat in Jerusalem: what to do when the city stops | fiestas 12–15' | `jerusalem shabbat` YT (top 22K) | `/jerusalem`, `/best-time-to-visit-israel` | la sirena; el Muro el viernes; qué transporte hay; dónde comer | Zahi Shaked (guía) 22K, 7:38 — watch?v=0gYxY9C0x8A: hueco total |
| 6 | Masada al amanecer: cómo subir, cuándo y por qué de noche / Masada at sunrise: the guide's way up | lugar 10–12' | `masada` 14.800 EN / `masada israel` 590 ES | `/masada-visitor-guide`, `/es/masada-visitor-guide` | amanecer timelapse; rampa romana vs sendero; precio teleférico; qué llevar | Paige Brasington 3,3K, 12:39 — watch?v=02Zw6qG6NrM (vlog amateur): no hay referencia fuerte, hueco |
| 7 | Mar Muerto: cómo flotar sin arruinarte los ojos / Dead Sea: how to float (and what nobody tells you) | lugar 8–10' | `dead sea israel` 1.300 EN / `mar muerto israel` 70 ES; `dead sea float` YT 14 M (Conan) | `/dead-sea`, `/dead-sea-tours-compared`, `/es/dead-sea` | flotar (visual puro); barro; qué playa es gratis; cuánto baja por año | Conan 14 M, 2:08 — watch?v=kze1JkPl5_8; Araya "¿Cómo es FLOTAR?" 568K, 17:34 — watch?v=Ro8w0XcKU34 |
| 8 | Tour del mercado Mahane Yehuda: 10 puestos y qué pedir / Machane Yehuda market food tour | food 18–25' | `israel food tour` YT 15 M (Wiens); `tel aviv food tour` 40 EN | `/tel-aviv-food-tours`, `/jerusalem` | cada puesto es un short (precio + bocado) | Mark Wiens 15,2 M, 41' — watch?v=FLmNLrog6dQ; travelingisrael "Professional Tour" 83K, 16' — watch?v=rq1S3jXNM80 |
| 9 | Comida callejera de Tel Aviv: sabich, hummus, shawarma / Tel Aviv street food: what to eat and where | food 15–20' | `tel aviv street food` YT 130–350K | `/tel-aviv-food-tours`, `/tel-aviv` | un plato por short | LivingBobby 350K, 10:41 — watch?v=ZbhDObUUW6w; Allan Eland 140K, 18' — watch?v=WX-WhDYVHYA |
| 10 | Itinerario de 7 días en Israel armado por una guía / 7 days in Israel: a licensed guide's itinerary | itinerario 15–18' | `israel itinerary 7 days` 30 EN (YT top 41K, 2020); `israel itinerary` 90 | `/itineraries/7-days-in-israel`, `/es/itineraries/7-days-in-israel` | mapa animado del recorrido; día 1; el error de orden | travelingisrael 41K, 11' (2020) — watch?v=ZkEaD65Viqk: hueco |
| 11 | 10 días en Israel: el itinerario completo / 10 days in Israel | itinerario 18–22' | `israel itinerary 10 days` 50 EN | `/itineraries/10-days-in-israel` | idem | idem |
| 12 | Primera vez en Israel: lo que hay que saber antes de volar / First time in Israel: what to know before you fly | lista 15–18' | `first time in israel tips` YT (Julia Bautd 292K); `traveling to israel` 1.600 EN | `/first-time-in-israel`, `/visa-information` | ETA-IL; aduana; SIM; efectivo; enchufes | Island Hopper TV "Everything You NEED TO KNOW" 156K, 12:43 — watch?v=YoQ5hAEggDM; Julia Bautd 292K, 25' (2026) — watch?v=lm9M87jtT6k |
| 13 | Ciudad Vieja de Jerusalén: los 4 barrios explicados caminando / Old City walking tour: the four quarters | walk guiado 45–60' | `jerusalem old city walk` / `jerusalem walking tour 4k` YT 279–481K; `old city jerusalem tour` 480 EN | `/jerusalem`, `/jerusalem-tours-compared` | 6–8 momentos de lugar | HolyLandSite "Every Site with Maps & Explanations" 481K, 116' — watch?v=k8kxakd06bg |
| 14 | Tel Aviv en un día: playa, Jaffa, Rothschild / Tel Aviv in one day | walk guiado 25–35' | `things to do in tel aviv` 880 EN; `que ver en tel aviv` 90 ES; `tel aviv que hacer` YT #1 92K | `/tel-aviv`, `/es/tel-aviv` | Jaffa al atardecer; bicis; precio del brunch | Before You Go (ES) 92K, 8:30 — watch?v=YW_b1SKeSMo; Kara and Nate 3,45 M, 12' — watch?v=OdwAOnWTaqE |
| 15 | Tours de Jerusalén: cuál elegir y cuál evitar / Jerusalem tours compared: which to take, which to skip | comparativa 12–15' | `jerusalem tours` 880 EN (afiliado directo) | `/jerusalem-tours-compared` | tour vs por tu cuenta (precio); qué incluye; cuándo conviene guía privada | travelingisrael "Which to TAKE and which to AVOID" 57K, 11' |
| 16 | Petra desde Israel en un día: ¿vale la pena? / Petra from Israel in one day: is it worth it? | comparativa 12–15' | `petra from israel` 50 EN; `tel aviv to petra` 70 | `/petra-from-israel` | frontera Eilat; costo real; horarios | HolyLandSite 229K, 46' — watch?v=PMwS37-f9Zc; Aline 9K: hueco |
| 17 | Lo que NO debés hacer en sitios religiosos (Muro, Santo Sepulcro, Explanada) / What not to do at holy sites | lista 10–12' | YT "never do" | `/jerusalem` | vestimenta; fotos; horarios de rezo | Aline "10 cosas que jamás debes hacer" 32K, 9' — watch?v=swUDNJNhPrQ; Anna Goldman 200K |
| 18 | Cuándo viajar a Israel: mes por mes, fiestas incluidas / Best time to visit Israel, month by month | práctico 12–15' | `best time to visit israel` 720 EN; `clima en israel` 50 ES | `/best-time-to-visit-israel`, `/es/best-time-to-visit-israel` | Pésaj; Yom Kipur (la ciudad sin autos); agosto; lluvias | World Festa "Yom Kippur 2026" 100K en 2 semanas, 24' — watch?v=2MZevSOg4cY |
| 19 | Belén desde Jerusalén: cómo ir por tu cuenta / Bethlehem from Jerusalem on your own | day trip 12–15' | `bethlehem tour` 170 EN | `/jerusalem-bethlehem-day-trip` | el bus 231; checkpoint (nomenclatura neutra); precio | Wolters World "What NOT to Do in Bethlehem" 12K: hueco |
| 20 | Nazaret y Mar de Galilea en un día / Nazareth and the Sea of Galilee in a day | day trip 15–20' | `sea of galilee` 40.500 EN; `mar de galilea` 1.600 ES | `/nazareth-sea-of-galilee-day-trip`, `/galilee`, `/es/galilee` | Cafarnaúm; el barco; cuánto cuesta el auto | P. José de Jesús "Nazaret" 547K, 52' (peregrinación) |
| 21 | Cesarea, Haifa y Acre: la costa en un día / Caesarea, Haifa and Akko | day trip 15–20' | `haifa israel` 6.600 EN; `bahai gardens haifa` 590; `acre israel` 390 ES | `/caesarea-haifa-akko-day-trip`, `/haifa` | jardines Bahá'í (horario gratis); túnel templario | P. José de Jesús "Cesarea" 556K |
| 22 | Alquilar auto en Israel: lo que hay que saber / Renting a car in Israel | práctico 10–12' | `car rental israel` 1.300 EN | `/car-rental-israel` | peaje ruta 6; estacionar en Tel Aviv; Shabat | sin referencia fuerte en el set: hueco |
| 23 | Cómo moverse en Israel sin auto: tren, bus, Rav-Kav / Getting around Israel without a car | práctico 10–12' | YT "budget travel" 97K (travelingisrael) | `/plan-your-trip`, `/day-trips-from-tel-aviv` | Rav-Kav en 30 s; tren aeropuerto; sherut | travelingisrael "How to travel for less" 97K |
| 24 | Eilat y el Néguev: desierto, cráter y Mar Rojo / Eilat and the Negev | región 15–20' | `eilat israel` 4.400 EN / 320 ES; `negev desert` 14.800; `mitzpe ramon` 1.900 | `/eilat`, `/negev`, `/es/negev` | cráter Ramón al amanecer; snorkel; precios | sin referencia turística fuerte: hueco |
| 25 | Dónde dormir en Jerusalén: barrio por barrio / Where to stay in Jerusalem | hoteles 10–12' | `jerusalem hotels` 2.900 EN; `hoteles en jerusalén` 50 ES | `/best-hotels-jerusalem` | un barrio por short con rango de precio en prosa | sin referencia; el pack de hoteles de Google ocupa el SERP web |
| 26 | Dónde dormir en Tel Aviv / Where to stay in Tel Aviv | hoteles 10–12' | `tel aviv hotels` 5.400 EN | `/best-hotels-tel-aviv` | idem | idem |
| 27 | Fiestas judías para el viajero: qué cambia cada una / Jewish holidays explained for travelers | fiestas 12–15' (pieza IA + Mari) | `israel weather by month` 260 EN | `/best-time-to-visit-israel` | una fiesta por short (Pésaj, Sucot, Yom Kipur, Purim) | All Israel News "Yom Kippur 2026" 66K en 2 semanas |
| 28 | Semana Santa en Jerusalén: dónde estar cada día / Holy Week in Jerusalem | fiestas 15–20' | `christian tour israel` 390 EN; `tierra santa peregrinacion` YT (P. José) | `/jerusalem`, `/nazareth-sea-of-galilee-day-trip` | Vía Dolorosa el viernes; fuego santo; horarios | 206 Tours "Holy Week: Where it Happened" 3 M, 36' — watch?v=Uq56ectzwno |
| 29 | Israel con chicos: qué funciona y qué no / Israel with kids | familia 12–15' | `israel with kids` YT (contaminado; Travel Kids 20K) | `/plan-your-trip` | museo de ciencias; playa; Mar Muerto con niños | Travel Kids 20K, 28' — watch?v=Ip0xabr1y_k: hueco pero demanda dudosa |
| 30 | Un día en el Muro Occidental: qué pasa, qué se puede, qué no / A day at the Western Wall | lugar 10–12' | `visit jerusalem` 210 EN | `/jerusalem` | bar mitzvá del lunes/jueves; papelitos; horarios | jeruwalks 1,42 M, 39' (cinematográfico) — watch?v=61ExOy36b_g |

Nota de nomenclatura para los títulos 19, 28 y 30: "Belén / Bethlehem", "Muro Occidental /
Western Wall", "Explanada de las Mezquitas – Monte del Templo / Haram al-Sharif – Temple Mount",
siempre las dos formas cuando aplica (postura editorial del `CLAUDE.md`).

---

## 4. Top 10 para arrancar, por jornada de grabación

Criterio: búsqueda (web + YouTube) × hueco (nadie fresco con criterio) × grabable por Mari en
Jerusalén en dos jornadas × que mande tráfico a una guía con valor comercial (`/is-israel-safe`,
`/jerusalem-tours-compared`, `/jerusalem` son las tres con más déficit en `seo.md` §4).

**Jornada A — Ciudad Vieja (un día completo)**

1. **#1 Jerusalén en un día con una guía licenciada** (35–45'). El video ancla del canal: es el
   recorrido que Mari hace de memoria, cubre `things to do in jerusalem` (1.000) y `que ver en
   jerusalén`, y produce B-roll para otros seis videos. Referencia 794K.
2. **#13 Ciudad Vieja, los cuatro barrios caminando** (45–60'). Sale del mismo material con otro
   corte: continuo, con mapa animado y explicación (HolyLandSite 481K contra 279K del mudo).
3. **#17 Lo que NO hay que hacer en sitios religiosos** (10–12'). Mari a cámara en cada sitio,
   30 segundos por regla. Formato "never do" con mediana 70K.
4. **#30 Un día en el Muro Occidental** (10–12'). Grabado en la misma mañana; short casi
   garantizado (jeruwalks 1,42 M con material de ahí).
5. **#2 12 errores que cometen los turistas en Israel** (14–18'). Los errores se ilustran con
   B-roll de la jornada; los bloques a cámara se graban en 40 minutos en una azotea.

**Jornada B — Mahane Yehuda, ciudad nueva y viernes hacia Shabat**

6. **#8 Mahane Yehuda: 10 puestos y qué pedir** (18–25'). Comida es el formato con más vistas
   totales del set (38 M) y cada puesto es un short.
7. **#4 Cuánto cuesta viajar a Israel** (12–15'). Se filma comprando: cada precio real a cámara
   en el mercado, el tranvía, el hostel, el taxi. En ES el top tiene 143K con calidad amateur.
8. **#5 Shabat en Jerusalén** (12–15'). Viernes a la tarde: la ciudad vaciándose, la sirena, el
   Muro llenándose. Hueco total (top 22K) y es el tema que solo alguien de adentro cuenta bien.
9. **#3 ¿Es seguro viajar a Israel en 2026?** (12–15'). A cámara, en la calle, con el mercado de
   fondo. Keyword de 4.400 con la guía más deficitaria del sitio (827 palabras). Se graba en 30
   minutos al final de la jornada B con luz de tarde.
10. **#15 Tours de Jerusalén: cuál elegir** (12–15'). Mari explica desde el criterio de guía qué
    incluye cada formato y cuándo conviene privado. Manda tráfico a la guía de afiliación
    directa. Se graba a cámara en la jornada B; el B-roll ya está.

Diez videos de dos jornadas: los cinco primeros comparten el rodaje de la Ciudad Vieja; los
cinco siguientes, el del mercado y el viernes. Después vienen Masada + Mar Muerto (#6, #7:
una jornada con salida 4:00) y Tel Aviv (#14, #9: una jornada).

---

## 5. Plan de rodaje, dos jornadas

Equipo mínimo: un celular reciente o cámara con gimbal, micrófono de solapa inalámbrico (dos
cápsulas), batería externa, un trípode chico. Formato 4K 25/30 fps horizontal; los shorts se
recortan de ahí (grabar a Mari centrada, con aire a los costados, para que el 9:16 funcione).
Audio limpio de Mari es lo que más importa: sin eso no hay video.

### Jornada A — Ciudad Vieja (martes o miércoles; no viernes, no sábado, no festivo)

| Hora | Lugar | Qué se graba | Para qué videos |
|---|---|---|---|
| 06:45 | Puerta de Jaffa, exterior | Apertura a cámara (#1, #13); plano de la puerta en ángulo (dato) | 1, 13, shorts |
| 07:00–08:00 | Barrio armenio → barrio judío → Cardo → plaza Hurva | Walk continuo con gimbal (13); Mari explica 3 paradas (1) | 1, 13 |
| 08:00–09:00 | Muro Occidental | Muro antes de la multitud; reglas a cámara (17); si es lunes/jueves, bar mitzvá | 30, 17, 1 |
| 09:00–09:45 | Rampa a la Explanada (si está abierta a visitantes; horarios de mañana) | Solo exteriores, sin personas de frente, nomenclatura doble a cámara | 1, 17 |
| 09:45–11:00 | Vía Dolorosa → Santo Sepulcro | Walk; reglas de vestimenta (17); dato de las escaleras (short) | 1, 13, 17 |
| 11:00–12:00 | Mercado del barrio musulmán → Puerta de Damasco | B-roll de puestos; precios (4) | 1, 13, 4 |
| 12:00–13:00 | Almuerzo en el barrio cristiano | Hummus a cámara con precio (4, 8); descanso | 4, shorts |
| 13:00–14:00 | Azotea (Austrian Hospice o similar) | Bloques a cámara de #2 (12 errores), 40 min de corrido con luz plana | 2 |
| 14:00–15:00 | Ciudad de David / Yemin Moshe (opcional según energía) | B-roll de vistas; molino | 1 |
| 16:30–18:00 | Monte de los Olivos | Atardecer sobre la Ciudad Vieja: cierre de #1 y #13; plano largo para pantalla final de todos | todos |

### Jornada B — Mercado, ciudad nueva y entrada de Shabat (viernes)

| Hora | Lugar | Qué se graba | Para qué videos |
|---|---|---|---|
| 08:30–09:00 | Estación de tranvía / Rav-Kav | Cómo se compra y carga, precio a cámara | 4, 23 |
| 09:00–11:30 | Mahane Yehuda (viernes: el mercado a pleno) | 10 puestos: bocado + precio + qué pedir (8); B-roll intenso; precios (4) | 8, 4, shorts |
| 11:30–12:30 | Calle Jaffa / Ben Yehuda | Bloques a cámara de #4 (presupuesto) y #15 (tours) | 4, 15 |
| 12:30–13:30 | Almuerzo | — | — |
| 13:30–14:30 | Hostel/hotel amigo (pedir permiso): habitación y precio | Rango de precio en prosa a cámara | 4, 25 |
| 14:30–15:30 | Calle, mercado cerrando | Bloque a cámara de #3 (seguridad), con gente y comercio de fondo | 3 |
| 15:30–16:30 | Mercado cerrando, sirena (~20–40 min antes de la puesta del sol, según fecha) | La ciudad que se apaga: B-roll clave de #5; sirena con sonido directo | 5, shorts |
| 16:30–17:30 | Camino al Muro | Familias yendo al Muro; Mari explica qué se puede y qué no en Shabat (sin filmar de frente a quien reza; sin flash) | 5 |
| Puesta del sol | Muro Occidental, desde la explanada alta | Plano general del Muro llenándose; cierre de #5 a cámara antes de que empiece Shabat, después la cámara se guarda | 5 |

Reglas de rodaje que Mari va a conocer mejor que nadie y se respetan sin discusión: no filmar
personas religiosas de frente sin permiso, nada de cámara en barrios ortodoxos en Shabat,
guardar el equipo cuando ella lo indique, vestimenta acorde en cada sitio. Es parte del mensaje
del canal (#17), no una limitación.

---

## 6. Cómo cada video manda tráfico al sitio

- **Una página del sitio por video, decidida antes de grabar** (columna "Guía que linkea"). El
  video se graba diciendo el URL en voz alta en el minuto 0:30 y en el cierre: "la guía
  completa, con precios y horarios de hoy, está en visitisrael.site/es/jerusalen".
- **Descripción**: las dos primeras líneas son el link a la guía con UTM
  (`?utm_source=youtube&utm_medium=video&utm_campaign=<slug-del-video>`) y una frase. Después
  los capítulos (timestamps) y recién al final los links de afiliado del sitio (no directos: que
  el clic pase por la guía, donde está el widget con precio real y la medición por caja de
  `competidores.md` §4.4).
- **Comentario fijado** con el mismo link, actualizado si cambia la URL.
- **Pantalla final** de 20 s: QR grande a la guía + tarjeta al siguiente video + suscribir. El
  QR también va superpuesto 5 s cada vez que se menciona un precio ("precios actualizados en la
  guía").
- **Tarjetas de YouTube** en el momento del dato (minuto del precio, minuto del error).
- **Shorts/TikTok/Reels**: link en bio rotativo (un link por campaña, cambiado cada dos
  semanas) + texto fijo "guía completa en visitisrael.site/es/…". En Instagram, sticker de link
  en la story del día de publicación.
- **En el sitio**: cada guía linkeada embebe el video arriba del primer H2 (la página gana
  tiempo en página y el video gana vistas desde Google), con el mismo `utm` de vuelta para medir
  el circuito. Sin crear páginas nuevas: si un tema no tiene guía (Shabat, fiestas), embebe en la
  más cercana (`/jerusalem`, `/best-time-to-visit-israel`) y se anota como candidata a página
  para aprobación de Sebastian, no se crea.
- **Medición**: Vercel Analytics por `utm_campaign` (ya hay eventos pendientes de configurar
  según `competidores.md` §4.4, acción 4) + YouTube Studio (clics en tarjetas y pantalla final).
  A los 30 días de cada video: vistas, % de retención al minuto 1 y al 50 %, clics al sitio,
  clics a afiliados desde la página linkeada.

---

## 7. Qué no hacer

- **Nada de política ni conflicto**: ni opinión, ni "la verdad que no te cuentan", ni el
  título con "controversial / odiado / peligroso" que hoy da vistas en inglés. Es tráfico que no
  reserva nada y quema la marca ante los operadores locales.
- **Sitios en disputa con nomenclatura pareja**, en título, voz y subtítulos: Explanada de las
  Mezquitas – Monte del Templo / Haram al-Sharif – Temple Mount; Belén con su realidad
  administrativa contada de forma neutra ("hay un control de entrada; llevá pasaporte"). Foco en
  el visitante: horarios, vestimenta, cómo llegar.
- **No copiar el género "barrio ultraortodoxo / vida oculta"** aunque sea el más viral en
  español. Es voyeurismo sobre una comunidad que no pidió cámara; Mari vive ahí.
- **Nada generado sin curaduría**: cada pieza IA (mapa, línea de tiempo, dato) pasa por Mari
  antes de salir; nada de imágenes generadas de lugares o personas reales (misma regla que las
  fotos del sitio); no clonar la voz de Mari; no inventar precios, ratings ni "el 80 % de los
  turistas…". Rangos en prosa y "a septiembre de 2026" dicho a cámara.
- **No filmar personas religiosas de frente sin permiso, no filmar en Shabat dentro de barrios
  religiosos, no drones sobre la Ciudad Vieja** (prohibido).
- **No mezclar idiomas en un canal** ni doblar con IA: dos canales, dos grabaciones a cámara.
- **No arrancar por Tel Aviv nightlife ni hoteles**: bajo volumen en YouTube y el SERP web de
  hoteles lo ocupa el pack de Google. Van después, cuando el canal tenga base.
- **No prometer números a Mari**: el primer mes de un canal nuevo en este nicho son cientos de
  vistas por video, no miles (los residentes con años de canal están en 5K–200K). Lo que se
  mide en los primeros 90 días es retención y clics al sitio, no vistas.

---

## 8. Herramientas para ir más allá (con costo)

| Herramienta | Para qué | Costo |
|---|---|---|
| **YouTube Data API v3** (key en Google Cloud) | Vistas exactas, likes, comentarios y fecha real de cualquier video; suscriptores y crecimiento de canales (jeruwalks, HolyLandSite, Aline); búsqueda por keyword. Reemplaza al SERP de DataForSEO para seguimiento mensual | **US$0**: 10.000 unidades/día. `videos.list` cuesta 1 unidad (miles de videos por día); `search.list` 100 (100 búsquedas/día). No se puede comprar más cuota, solo pedir extensión |
| **DataForSEO YouTube SERP** (lo que ya tenemos) | Qué rankea por consulta y país, con caché | US$0,002 por consulta de 20 resultados; `video_info` US$0,006. Las 46 consultas + 15 infos costaron US$0,18 |
| **Apify** (TikTok Scraper, Instagram Scraper) | Vistas y likes por video, seguidores, hashtags de TikTok/IG; lo que no pudimos verificar en `social.json` | US$0,30–5 por 1.000 resultados según actor; US$5 de crédito gratis al empezar. Un relevamiento de 20 cuentas × 50 posts ≈ US$1–5 |
| **vidIQ** o **TubeBuddy** | Volumen de búsqueda dentro de YouTube por keyword, competencia, sugerencias de título/tags, A/B de miniaturas | vidIQ US$7,50–17,50/mes; TubeBuddy US$4,50–14,50/mes (anual). Alcanza el plan base de uno de los dos |
| **YouTube Studio** del canal propio | Retención, fuentes de tráfico, clics en tarjetas y pantalla final, CTR de miniaturas | US$0 una vez publicado |
| **Social Blade** (web) | Histórico de suscriptores de canales ajenos | US$0 (a mano; bloquea scraping) |
| **Search Console** (pendiente de `seo.md` §2) | Cuánto tráfico de Google trae el video embebido en cada guía | US$0 |

Total razonable para medir en serio: **US$0–20/mes** (YouTube API gratis + un plan base de
vidIQ) y **US$5–10 por trimestre** de Apify para TikTok/IG.

---

## 9. Fuentes y archivos

- `data/video/youtube.json`: 46 consultas, 523 videos con vistas, fecha, duración, canal, URL;
  top 30 por vistas y por velocidad (totales y solo turismo), por mercado, canales, formatos por
  regex, duraciones, `video_info` de los 15 mayores.
- `data/video/social.json`: 22 creators/cuentas con estado de verificación.
- `scripts/video/youtube.mjs`: re-ejecutable; `--probe` para una consulta, `--info` para pedir
  likes/comentarios.
- `data/seo/costs.json`: corridas `video/youtube.mjs` (US$0,18 + US$0,002).
- `data/seo/keywords.json` y `gestion/auditoria/seo.md` §4: volúmenes de keywords web.
- `gestion/auditoria/competidores.md` §1–§3 y §4.4: contexto de mercado y acciones pendientes
  (IDs de afiliado, autor con nombre, medición por caja) que este plan asume.
- `gestion/negocio/propuesta-mariluz.md`: roles (Mari cara y curadora; Sebastian tecnología;
  sin pauta).
