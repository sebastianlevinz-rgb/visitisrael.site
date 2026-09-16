# ROADMAP — visitisrael.site

**Fase actual: CONECTAR LA CAJA Y MEDIR.** No crecimiento.
Última actualización: 2026-09-16.

---

## Dónde estamos

| Fase | Estado |
|---|---|
| 0 — Matar el loop | ✅ 2026-08-17 — routine borrada, `.loop/STOP` versionado |
| 1 — Auditoría | ✅ 2026-08-17, corregida 2026-09-16 — `gestion/auditoria/estado-del-sitio.md` |
| 2 — Rebuild v3 | ✅ 2026-09-16 — 99 páginas, 1.919 redirects verificados |
| 3 — Cuentas de afiliado y medición | 🔄 **ACÁ** |
| 4 — Esperar datos | ⏸ |
| 5 — Crecer solo lo probado | ⏸ |

La secuencia sale de `MEGA-PROMPT-V3.md`:

```
sitio mínimo aprobable → aplicar → IDs → verificar que un clic registre → esperar datos → escalar
```

---

## Fase 2 — Rebuild v3 ✅

- De 2.018 a 99 páginas: 20 páginas de contenido × 4 idiomas + 5 legales + hubs.
- 1.919 URLs viejas → 65 reglas de redirect, probadas una por una contra el preview real.
- Links de afiliado sin IDs de relleno: modo pre-aprobación que avisa en cada build, modo
  producción que falla si falta un ID, y un chequeo diario sobre el sitio publicado.
- 1.006 ratings, reseñas y precios inventados eliminados; esquema estricto.
- Snapshot del sitio viejo en el tag `sitio-2018-paginas`.

---

## Fase 3 — Cuentas de afiliado y medición 🔄

Solo Sebastian puede hacer los tres primeros puntos: son sus cuentas.

- [ ] Activar **Vercel Analytics** (panel del proyecto → Analytics → Enable)
- [ ] Verificar **Google Search Console** y enviar el sitemap
- [ ] Comprobar que `hello@visitisrael.site` **recibe** mails
- [ ] Aplicar a **Booking** (`partner.booking.com`) y **GetYourGuide** (`partner.getyourguide.com`)
- [ ] Cargar los IDs aprobados en Vercel y pasar a `PUBLIC_AFFILIATE_MODE=production`
- [ ] **Gate:** un clic de prueba aparece en el panel del partner

Mientras se espera la aprobación **no se escriben páginas nuevas**: se mejora lo que hay.

---

## Hecho el 2026-09-16 (después del rebuild)

- [x] Hebreo (he, RTL) como quinto idioma: 28 páginas de contenido + hubs.
- [x] 8 guías nuevas aprobadas por cobertura de afiliados (Masada, Belén, Petra, Nazaret y
      Galilea, costa norte, food tours Tel Aviv, hoteles Eilat, tours multidía), en 5 idiomas.
- [x] Pasada de diseño: header arreglado (causa raíz: `--spacing-block`), índice "En esta
      guía", un aviso de afiliado por sección, caja "Planificá tu viaje" al final, hero de
      región más bajo con dos datos, tarjetas de región apiladas en móvil y traducidas,
      cuerpo a 18 px, componentes sin inglés colado, secciones duplicadas y notas internas
      del loop fuera de las regiones.
- [x] Panel de control en `/dashboard`.
- [x] Estudios: diseño (`gestion/auditoria/diseno-referentes.md`), cobertura de afiliados
      (`cobertura-afiliados.md`), fotos (`fotos.md`), negocio (`gestion/negocio/`).

## Pendientes de calidad (se pueden hacer sin datos)

- [ ] **Fotos**: 10 de 11 heroes de región son imágenes generadas por IA y 47 de 120
      imágenes son placeholders; ninguna foto muestra crédito. Reemplazar con Pexels /
      Commons / Unsplash según `gestion/auditoria/fotos.md` (necesita key de Pexels).
- [ ] **Autor con nombre y foto** (`src/data/authors.ts`, `AuthorByline.astro`): falta que
      Sebastian defina quién firma (nombre, bio de dos líneas, foto).
- [ ] Traducir `src/data/regionData.ts`: key facts, tours, hoteles y temporadas salen en
      inglés en fr/de/es/he.
- [ ] Traducciones de región a un tercio del inglés (Jerusalén: EN 2.193 palabras, DE 642).
      Ampliar fr/de/es/he de las 7 regiones.
- [ ] 214 links convertidos en texto dejaron frases tipo "nuestra guía de X" sin guía
      detrás. Revisar la redacción (`gestion/rebuild/links-arreglados.csv`).
- [ ] Revisar los redirects que van a `/first-time-in-israel` por no tener equivalente:
      Google puede tratar redirecciones masivas a una página no relacionada como soft 404.
- [ ] Branch protection en `master` (checks obligatorios, sin force push).
- [ ] Verificar vigencia de datos que caducan: horarios, precios de entrada, requisitos de visa.
- [ ] Instalar el navegador de Playwright en esta máquina para correr `test:e2e` en local.

---

## Fase 4 — Esperar datos ⏸

Cuatro semanas desde el Gate de la Fase 3, sin escribir nada nuevo.

**Gate:** impresiones reales en Search Console y al menos un clic de afiliado registrado.
Si a las 4 semanas hay cero impresiones, el problema es el nicho o el SEO técnico: más
páginas no lo arreglan.

---

## Fase 5 — Crecer solo lo probado ⏸

Volumen únicamente sobre temas que **ya** mostraron impresiones. Cada página nueva nombra
la búsqueda que responde y entra en `PAGE_GROUPS`.

Candidato ya discutido: **hebreo para turismo interno**, empezando por las 30–50 páginas
que le sirven a un israelí, no traduciendo todo.

---

## Fuera de alcance hasta nuevo aviso

- Páginas, categorías o idiomas nuevos
- Cualquier agente autónomo o routine
- Seguir el `BACKLOG.md` de `.loop/`
