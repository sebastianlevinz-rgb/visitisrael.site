# Estado del sitio — auditoría completa

**Fecha**: 2026-08-17
**Alcance**: inventario, categorías, canibalización, contenido thin, honestidad de datos, afiliados
**Método**: recuento sobre el filesystem del repo (`master` @ `77873a95`) + verificación contra
producción con `curl`. Cada número dice cómo se obtuvo. Lo que no se pudo verificar está
marcado como no verificado.

---

## 0. Lo primero: el sitio no cobra y no mide

Esto sale antes que el inventario porque cambia el orden de todo lo demás.

### El sitio no monetiza. Ningún link de afiliado tiene ID real.

`src/config/affiliates.ts` define los IDs de partner con valores de reemplazo:

```ts
BOOKING_AID: env('PUBLIC_BOOKING_AID', 'BOOKING_AID')
```

Si la variable de entorno `PUBLIC_BOOKING_AID` no está seteada, el fallback es el string
literal `'BOOKING_AID'`. **Las variables nunca se setearon en Vercel.** Verificado contra
producción:

```
curl https://visitisrael.site/best-hotels-jerusalem
→ href="https://www.booking.com/searchresults.html?aid=BOOKING_AID&ss=Jerusalem"
→ href="https://www.getyourguide.com/s/?partner_id=GYG_PARTNER_ID&q=..."
→ href="https://www.skyscanner.net/transport/flights-to/tlv/?associateid=SKYSCANNER_MARKER"
```

Sistémico, no un caso aislado:

| Página en producción | Placeholders servidos |
|---|---|
| `/` (home) | 7 |
| `/best-hotels-jerusalem` | 6 |
| `/jerusalem-tours-compared` | 7 |
| `/fr/plan-your-trip` | 3 |
| `/israel-esim` | 4 |

**2.018 páginas, 19 partners cableados, 2.554 commits, dos meses de generación autónoma —
monetizando cero.** Cada clic que el sitio mandó a Booking, GetYourGuide o Skyscanner desde
que salió a producción se fue sin atribución y no volvió como comisión.

**Lo bueno**: la plomería está bien hecha. Los links salen con `rel="sponsored nofollow
noopener"` y el disclosure ("Affiliate link — we may earn a commission at no extra cost to
you") está presente. No hay que rehacer nada. **Solo faltan los IDs.** Es cargar ~19
variables de entorno en Vercel. Es la corrección más barata y de mayor impacto de todo este
informe.

### El sitio no mide

- **Vercel Web Analytics**: la API devuelve `404 — Web Analytics not found`. El paquete
  `@vercel/analytics` está instalado en el código, pero la función nunca se activó.
- **Google Search Console**: no hay etiqueta de verificación en `src/layouts/`. (No prueba
  definitiva — la verificación también puede ir por DNS —, pero es el indicio disponible.)

Consecuencia directa sobre esta auditoría: **el ranking de categorías que sigue es
estructural.** Puedo probar que dos páginas compiten por la misma intención; no puedo decir
cuál gana. Ninguna de las dos herramientas da datos retroactivos, así que cada día sin
activarlas es un día que no se recupera.

---

## 1. Inventario

Recuento de archivos de contenido (`.md`/`.mdx`) en `src/content/`. EN vive en la raíz de
cada colección; las traducciones en subcarpetas `fr/`, `de/`, `es/`.

| Colección | EN | FR | DE | ES |
|---|---:|---:|---:|---:|
| guides | **445** | 398 | 398 | 401 |
| attractions | 65 | 61 | 61 | 61 |
| regions | 11 | 11 | 11 | 11 |
| itineraries | 6 | 6 | 6 | 6 |
| legal | 5 | 0 | 0 | 0 |
| **Total** | **532** | **476** | **476** | **479** |

Más las páginas `.astro`:

| Tipo | Cantidad |
|---|---:|
| Herramientas sueltas EN (`src/pages/*.astro`) | 33 |
| Herramientas localizadas (`{fr,de,es}/`, 6 c/u) | 18 |

**Total ≈ 2.014**, que reconcilia con las **2.018** que declaraba el build del loop. El
número del loop era correcto.

### El hallazgo estructural

**445 de 532 páginas EN (84%) están en una sola colección: `guides`.**

`guides` no es una categoría. Es un depósito. Ahí adentro conviven guías de ciudad,
comparativas de tours, calendarios de festivales, páginas por nacionalidad, guías de hotel y
de comida. El sitio no tiene un problema de "demasiadas categorías": **tiene un problema de
ninguna categoría.** Las categorías reales están implícitas en los slugs y nunca se
formalizaron.

---

## 2. Clusters detectados

Agrupando los 445 slugs de `guides` por patrón:

| Cluster | Páginas EN | Diagnóstico |
|---|---:|---|
| `israel-for-X-travelers` (nacionalidades) | **30** | Plantilla. Canibalización severa. |
| `X-tours-compared` | **12** | Plantilla generada por destino. |
| Festivales | 15 | Fragmentado; uno por evento. |
| `israel-in-MES` (calendario) | 12 | Uno por mes; se solapan entre sí. |
| `israel-vs-X` (comparativas) | 11 | Solapamiento alto. |
| Hoteles | 11–14 | Uno por ciudad + generales. |
| Comida y bebida | 23 | Solapamiento medio. |
| Religioso / peregrinaje | 17 | Solapamiento medio. |
| Visa / burocracia | 9 | Núcleo legítimo. |
| Transporte | 7 | Núcleo legítimo. |

Y por ciudad/región (los slugs se acumulan sin jerarquía):

| Destino | Páginas EN que lo mencionan |
|---|---:|
| Jerusalén | 33 |
| Tel Aviv | 27 |
| Eilat | 22 |
| Galilea | 14 |
| Haifa | 12 |
| Negev | 9 |
| Mar Muerto | 9 |
| Golán | 6 |

Existe `src/content/regions/` con **11 regiones**, pero las 33 páginas de Jerusalén no
cuelgan de la región: están sueltas en `guides`. La jerarquía existe en el modelo de datos y
no se usa.

---

## 3. Canibalización — casos concretos

### Tours: cuatro páginas peleando por la misma búsqueda

```
best-tours-in-israel        (421 palabras)
best-holy-land-tours
israel-small-group-tours
private-tours-israel        (347 palabras)
israel-tour-packages        (217 palabras)
```

Cinco URLs para "tours en Israel". Compiten entre sí en Google y se reparten la autoridad.
**Y son las páginas más cortas del sitio.** Las páginas con mayor intención comercial —las
que deberían cobrar— son las peor trabajadas.

Encima de eso, 12 páginas `X-tours-compared` (Jerusalén, Tel Aviv, Masada, Petra, Nazaret,
Belén, Eilat, Haifa, Galilea, Negev, Golán, Mar Muerto), todas de la misma plantilla.

### Nacionalidades: 30 páginas de la misma plantilla

`israel-for-nepali-travelers`, `israel-for-georgian-travelers`, `israel-for-maltese-travelers`,
`israel-for-thai-travelers`… El loop las producía hasta el último día. Cambia el país, el
requisito de visa y la ruta de vuelo; el resto del texto es común.

### Jerusalén: 33 páginas sin jerarquía

Solapamientos evidentes dentro del cluster:

- Caminatas: `jerusalem-old-city-walking-tour` · `jerusalem-ramparts-walk` · `jerusalem-trail` · `jerusalem-pilgrimage-road`
- Museos: `jerusalem-museums` · `israel-museum-jerusalem` · `museum-of-tolerance-jerusalem`
- Barrios: `jerusalem-neighborhoods-guide` · `jerusalem-armenian-quarter` · `jewish-quarter-jerusalem-guide` · `jerusalem-mount-zion-guide` · `ein-kerem-jerusalem-guide`
- Excursiones: `day-trips-from-jerusalem` · `jerusalem-bethlehem-day-trip` · `jericho-day-trip-from-jerusalem`

Y dos que no pertenecen a un sitio de turismo afiliado: `schottenstein-campus-jerusalem` y
`ammunition-hill-jerusalem`.

### Herramientas contra guías

De las 33 herramientas, varias compiten con guías existentes o entre sí:

- `israel-shabbat-calendar` y `israel-shabbat-countdown` — dos herramientas casi iguales
- `israel-travel-time` y `israel-distance-calculator` — se solapan
- `israel-itinerary-checker` contra 5 guías de itinerario
- `israel-trip-cost-calculator` contra `israel-cost-budget`

---

## 4. Contenido thin — no es el problema

Distribución de largo de las 445 guías EN (sin frontmatter):

| Rango | Páginas |
|---|---:|
| < 400 palabras | 10 |
| 400–699 | 17 |
| 700–999 | 29 |
| 1.000–1.499 | 142 |
| ≥ 1.500 | **247** |

**Mediana: 1.576 palabras.**

Hay que decirlo con todas las letras: **el loop escribía bien.** Páginas largas,
estructuradas, con FAQs y links internos. El problema no es la calidad de redacción página
por página — es que escribió 445 de ellas sobre un tema que no da para 445.

Las 10 más cortas, en cambio, son casi todas comerciales (`israel-tour-packages` 217,
`tel-aviv-vs-jerusalem` 205, `dead-sea-israel-vs-jordan` 234, `private-tours-israel` 347).
El patrón es consistente y contraintuitivo: **donde hay plata, hay menos trabajo.**

---

## 5. Honestidad de datos — limpio

Se buscaron ratings inventados, cantidades de reseñas y precios exactos sin fuente en las
1.963 páginas de contenido.

**Resultado: 2 coincidencias, ambas legítimas** — escalas de dificultad de senderos
(`3,5/5`, `4,5/5`) en la guía de bicicleta en francés. No son reseñas.

La regla de honestidad del playbook viejo se respetó de punta a punta. Es lo mejor que
encontré en esta auditoría.

**Salvedad**: no verifiqué si los datos *sí* citados (horarios, precios de entrada,
requisitos de visa) siguen vigentes. Eso es caducidad, no invención, y requiere chequeo
contra fuente. Queda pendiente.

---

## 6. Deuda técnica

### `content/en/` está muerto — confirmado

Residuo de la era Next.js/Velite (`sub-destinations/`, `west-bank/`, `regions/`).
**Cero referencias desde `src/`.** No lo importa nadie, no entra al build. Se puede borrar
sin redirect: nunca generó URLs en el sitio Astro.

### 15 URLs de partner hardcodeadas en contenido

Violan la regla de "todo afiliado sale de `src/config/affiliates.ts`". Archivos afectados
incluyen `cheap-flights-to-israel` (EN/FR/DE/ES), `israel-road-trip`, `israeli-breakfast-guide`,
`best-hotels-jerusalem`, `israel-ev-road-trip`. Son 15 ocurrencias en 15 archivos — chico y
acotado.

### 45 ramas `auto/*` abandonadas en el remoto

Sobras del loop (`auto/de-58-batch`, `auto/es-phase-37`, etc.). Ruido, no riesgo.

### No verificado en esta pasada

- **Links rotos y páginas huérfanas**: requiere correr `pnpm check:links` sobre un build
  completo (~2.000 páginas). No se corrió. El loop reportaba 0 rotos en su última revisión,
  pero es su propio reporte, sin auditar.
- **Vigencia de datos con fecha de caducidad** (horarios, precios, visas).

---

## 7. Ranking de categorías

> ### ⚠ CORRECCIÓN — 2026-08-17, posterior a la primera versión de este informe
>
> **La reducción estimada más abajo está mal y no se debe ejecutar.**
>
> Agrupé las páginas por patrón de slug y asumí que compartir plantilla de nombre
> significaba contenido repetido. Medí el solapamiento real de texto (5-gramas, Jaccard)
> y el supuesto se cae:
>
> | Par | Solapamiento real |
> |---|---:|
> | `israel-for-nepali` vs `israel-for-georgian` | 7,4% |
> | `israel-for-thai` vs `israel-for-filipino` | 13,9% |
> | `israel-for-american` vs `israel-for-british` | 17,7% |
> | `jerusalem-tours-compared` vs `haifa-tours-compared` | **0,1%** |
> | `masada-tours-compared` vs `nazareth-tours-compared` | 0,5% |
> | `israel-in-march` vs `israel-in-april` | 0,2% |
> | `best-tours-in-israel` vs `best-holy-land-tours` | 1,7% |
>
> No son duplicados: son páginas con texto propio que apuntan a búsquedas distintas.
> `israel-in-march` no le compite a `israel-in-april`. Las 12 `X-tours-compared` son, con
> 0,1–0,5% de solapamiento, doce páginas completamente diferentes.
>
> **Conclusión que se dio vuelta:** el problema del sitio no es exceso de páginas. Es que
> 2.018 páginas de contenido único y decente **no cobran, no se miden y no están
> organizadas**. El activo no está roto — está desconectado de la caja. Borrarlo destruye
> lo único que hay.
>
> Lo que sigue siendo cierto: la falta de taxonomía (84% en una colección), los IDs de
> afiliado placeholder, la ausencia de medición, las páginas comerciales thin y el código
> muerto. Lo que cambia es el remedio: **reorganizar y conectar, no borrar.**
>
> La tabla de abajo se conserva como registro del error, no como plan.

### Reducción estimada (ERRÓNEA — no ejecutar)

### ELIMINAR / FUSIONAR A UN HUB — prioridad alta

| Cluster | Hoy | Propuesta | Ahorro EN |
|---|---:|---|---:|
| `israel-for-X-travelers` | 30 | 1 hub con tabla de visa/vuelos por país | −29 |
| `X-tours-compared` | 12 | absorber en la página de cada destino | −12 |
| Tours generales | 5 | 1 página de tours | −4 |
| `israel-vs-X` | 11 | 1 hub comparativo | −10 |
| `israel-in-MES` | 12 | 1 "cuándo viajar" + 4 estaciones | −7 |
| Festivales | 15 | 1–2 calendarios de eventos | −13 |

**Ahorro: ~75 páginas EN ≈ 300 con los cuatro idiomas.**

### CONSOLIDAR BAJO REGIÓN — prioridad media

Los clusters de ciudad (Jerusalén 33, Tel Aviv 27, Eilat 22) tienen que colgar de
`src/content/regions/`, que ya existe y no se usa. No es tanto borrar como **reorganizar**:
menos páginas hermanas compitiendo, más jerarquía.

### DEJAR COMO ESTÁ

- `regions` (11), `itineraries` (6), `legal` (5) — sanas y proporcionadas
- `attractions` (65) — una por atracción real, es la estructura correcta
- Visa/burocracia (9) y transporte (7) — núcleo útil, sin solapamiento grave

### REVISAR APARTE

Las 33 herramientas se juzgan por uso, no por texto. Sin analytics no hay criterio.
**Decisión pospuesta hasta tener datos** — salvo los duplicados obvios
(`shabbat-calendar`/`shabbat-countdown`, `travel-time`/`distance-calculator`).

---

## 8. Veredicto

### must fix

1. **Cargar los 18 IDs de afiliado en Vercel.** El sitio no cobra. Todo lo demás es
   secundario frente a esto. Lista completa en la sección 10.
2. **Activar Vercel Analytics y Search Console.** Sin medición no se puede decidir qué
   páginas valen, y cualquier poda es a ciegas.
3. **Las 15 URLs de partner pegadas a mano** (`[Skyscanner](https://www.skyscanner.net)`).
   No son links de afiliado rotos: son links **pelados**, sin ningún parámetro. Aunque se
   carguen los IDs, estos 15 siguen regalando el clic.

### should fix

4. **Taxonomía**: 445 de 532 páginas EN en una sola colección. El arreglo es reorganizar
   bajo `regions`/categorías reales, con redirects. No es borrar.
5. **Páginas comerciales thin**: `israel-tour-packages` (217 palabras),
   `tel-aviv-vs-jerusalem` (205), `private-tours-israel` (347), `best-tours-in-israel` (421).
   Se **mejoran**, no se borran: son las de mayor intención de compra y las peor trabajadas.
6. Herramientas duplicadas: `israel-shabbat-calendar` / `israel-shabbat-countdown` y
   `israel-travel-time` / `israel-distance-calculator`. Verificar y unificar.
7. Correr `check:links` sobre un build completo para cerrar el punto de links rotos.
8. ~~Borrar `content/en/`~~ — **HECHO** en la rama `consolidacion/limpieza-segura`.

### NO hacer

9. **No borrar los clusters de nacionalidades, meses, festivales ni comparativas.** Miden
   0,1–18% de solapamiento entre sí: son páginas distintas. Sin datos de tráfico, darlas de
   baja es destruir inventario a ciegas.

### okay así como está

10. Largo y calidad de redacción del contenido — mediana 1.576 palabras, bien estructurado.
11. Honestidad de datos — limpio.
12. Higiene técnica de afiliados (`rel`, disclosure) — correcta, solo faltan los IDs.
13. `regions`, `itineraries`, `legal`, `attractions` — proporcionadas.
14. Paridad de idiomas — EN 532 / FR 476 / DE 476 / ES 479, pareja.

---

## 9. Qué sigue

El orden correcto, después de la corrección de la sección 7:

1. **Conectar la caja** — cargar los 18 IDs (sección 10). El sitio empieza a cobrar ese día.
2. **Empezar a medir** — Vercel Analytics + Search Console. Los datos arrancan ese día.
3. **Esperar 4–8 semanas** de datos reales.
4. **Recién ahí decidir qué se poda**, con impresiones y clics por URL en la mano.

Podar antes del paso 3 es tirar una moneda sobre 2.018 páginas.

Mientras tanto, lo que sí se puede hacer sin datos: taxonomía, mejorar las páginas
comerciales thin, y las 15 URLs pegadas a mano.

---

## 10. Las 18 variables de entorno

Van en Vercel → proyecto `visitisrael-site` → **Settings** → **Environment Variables**,
alcance **Production**. El valor de cada una es el ID que da el panel de cada partner.

```
PUBLIC_BOOKING_AID              PUBLIC_TOURRADAR_AID
PUBLIC_GYG_PARTNER_ID           PUBLIC_WELCOMEPICKUPS_REF
PUBLIC_VIATOR_ID                PUBLIC_KIWITAXI_MARKER
PUBLIC_CIVITATIS_AID            PUBLIC_DISCOVERCARS_AID
PUBLIC_SKYSCANNER_MARKER        PUBLIC_TIQETS_PARTNER
PUBLIC_RENTALCARS_AID           PUBLIC_AMAZON_ASSOCIATE_TAG
PUBLIC_SAFETYWING_REF           PUBLIC_INSUREMYTRIP_AID
PUBLIC_STAY22_AID               PUBLIC_SQUAREMOUTH_AID
PUBLIC_AIRALO_REF               PUBLIC_ABRAHAM_TOURS_ID
PUBLIC_HOSTELWORLD_AID
```

No hace falta cargarlas todas de una: cada variable que se carga arregla los links de ese
partner. Las que faltan siguen sirviendo el placeholder. Empezar por las tres que más
tráfico reciben: `PUBLIC_BOOKING_AID`, `PUBLIC_GYG_PARTNER_ID`, `PUBLIC_SKYSCANNER_MARKER`.

Después de cargarlas hay que **redeployar** para que el build las tome (son `PUBLIC_*`, se
inyectan en tiempo de build, no de request).
