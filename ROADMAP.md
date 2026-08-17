# ROADMAP — visitisrael.site

**Fase actual: CONSOLIDACIÓN.** No crecimiento.
Última actualización: 2026-08-17.

---

## Por qué esta fase

Un loop autónomo corrió sin supervisión desde el 2026-06-23 hasta el 2026-08-17.
Números al momento del corte:

| Métrica | Valor |
|---|---|
| Iteraciones del loop | 1.302 |
| Commits en `master` | 2.554 |
| Ritmo sostenido | ~42 commits/día (21 días seguidos sin bajar de 37) |
| Páginas en el build | 2.018 |
| Pasadas de research | 290 |
| Backlog vivo al cortar | ~18 páginas nuevas en cola |

El propio loop declaraba **"saturación ~97%"** en sus notas de research y seguía
generando igual: `israel-for-nepali-travelers`, `israel-for-georgian-travelers`,
`israel-for-maltese-travelers`, `israel-for-baltic-travelers`. Nadie revisó un diff en
casi dos meses.

El problema del sitio no es que le falten páginas. Es que tiene demasiadas, con
categorías que se pisan y calidad sin verificar.

**Regla que define la fase: por cada página que se toca, no entra ninguna nueva.**

---

## Fase 0 — Matar el loop ✅ HECHO

Cerrada el 2026-08-17.

- [x] Identificar el disparador (routine cloud `trig_01T9XFcuEQq8fBQa2M2yTEVX`, cron `23 * * * *`)
- [x] Desactivar la routine (`enabled: false`)
- [x] Versionar `.loop/STOP` y sacarlo del `.gitignore` que lo volvía inútil
- [x] Verificar que no entren commits nuevos
- [x] Dejar constancia en `gestion/auditoria/loop-detenido.md`

---

## Fase 1 — Auditoría 🔄 EN CURSO

Objetivo: saber qué hay, con números, antes de tocar nada.

- [ ] Inventario total de páginas por idioma y por categoría
- [ ] Detectar categorías redundantes o canibalizadas entre sí
- [ ] Detectar páginas thin (poco contenido) y duplicadas
- [ ] Detectar contenido sin hechos verificables
- [ ] Auditar links de afiliados: rotos, sin atribución, fuera de `src/config/affiliates.ts`
- [ ] Confirmar si `content/en/` (residuo Velite) está muerto
- [ ] Ranking de categorías: consolidar / fusionar / eliminar

**Entregable**: `gestion/auditoria/estado-del-sitio.md`

**Nada se borra en esta fase.** Solo se mide.

---

## Fase 2 — Plan de consolidación ⏸ ESPERA APROBACIÓN

Objetivo: estructura objetivo con muchas menos categorías que hoy.

- [ ] Estructura de categorías propuesta
- [ ] Qué páginas se fusionan y en cuál queda el contenido
- [ ] Qué páginas se eliminan
- [ ] **Mapa de redirects 301 completo** — sin esto el plan no se aprueba
- [ ] Separación en `must fix` / `should fix` / `okay así como está`

Se entrega en plan mode. **No se ejecuta una sola línea hasta que Sebastian apruebe.**

---

## Fase 3 — Ejecución ⏸ BLOQUEADA

Se desbloquea con la Fase 2 aprobada.

- [ ] Crear el bloque `redirects` en `vercel.json` (hoy no existe)
- [ ] Ejecutar fusiones y bajas **en tandas chicas**, cada una revisable en el diff
- [ ] Verificar después de cada tanda: `pnpm check && pnpm build && pnpm test:e2e` + `pnpm check:links`
- [ ] Confirmar que ningún 301 quedó colgado ni encadenado

Cada tanda se aprueba por separado. Cada push a `master` es un deploy a producción.

---

## Fase 4 — Calidad ⏸ BLOQUEADA

Con el sitio ya podado, recién ahí se sube la vara de lo que queda.

- [ ] Pasar las páginas sobrevivientes por el estándar de `REVIEW.md`
- [ ] Verificar atribución y funcionamiento de afiliados en las que quedan
- [ ] Cerrar huecos reales de idioma (FR/DE tenían faltantes contra EN)

---

## Fuera de alcance hasta nuevo aviso

- Páginas nuevas de cualquier tipo
- Categorías nuevas
- Idiomas nuevos
- Reactivar el loop, total o parcialmente
- Seguir el `BACKLOG.md` de `.loop/`
- Reestructurar la app (sigue siendo Astro; no se migra nada)

---

## Criterio de salida

La consolidación cierra cuando:

1. La cantidad de categorías bajó de forma significativa y cada una tiene una razón de existir.
2. Ninguna URL que existía devuelve 404 sin un 301 que la cubra.
3. Las páginas que quedaron pasan el estándar de `REVIEW.md`.
4. Los afiliados que quedaron funcionan y están atribuidos.

Recién con esos cuatro puntos cerrados se discute volver a crecer — y si se vuelve, con
revisión humana del diff, no con un loop de 42 commits por día.
