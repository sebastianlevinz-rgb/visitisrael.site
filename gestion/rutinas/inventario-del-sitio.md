# Rutina: inventario del sitio

**Cuándo**: para levantar los números base de la auditoría, y para re-medir después de
cada tanda de consolidación y comprobar que el sitio efectivamente se achicó.

---

## Prompt

```
Levantá el inventario de visitisrael.site. Números concretos, sin estimaciones:

1. Total de páginas del build (pnpm build las reporta al final)
2. Páginas por idioma: EN, FR, DE, ES
3. Páginas por categoría / colección (src/content/*, src/pages/*)
4. Páginas de herramienta sueltas en src/pages/ (calculadoras, quizzes, planners)
5. Cuántas páginas existen en EN pero no en FR / DE / ES

Decime CÓMO contaste cada número (qué comando, qué directorio). Si un número no lo pude
verificar, marcalo como no verificado en vez de estimarlo.

Guardá el resultado en gestion/auditoria/ con la fecha en el nombre.
```

---

## Base de comparación (2026-08-17, al cortar el loop)

| Métrica | Valor |
|---|---|
| Páginas en el build | 2.018 |
| EN | 447 |
| FR | 398 |
| DE | 398 |
| ES | 401 |
| Faltantes FR vs. baseline | 4 |
| Faltantes DE vs. baseline | 4 |
| Faltantes ES vs. baseline | 0 |

Fuente: `.loop/STATE.md` de la iteración 1302. **Son los números que declaraba el loop, no
un recuento propio.** El primer inventario tiene que verificarlos de cero: si el loop
contaba mal, todo lo demás arrastra el error.

## Ojo con

- `content/en/` (raíz) es residuo de la era Velite/Next.js. Confirmar si está muerto antes
  de contarlo. Si está muerto, no va en el inventario y es candidato a baja.
- `src/content/` es lo vivo. Ahí están `attractions`, `guides`, `itineraries`, `legal`,
  `regions`.
- Las ~30 páginas de herramienta en `src/pages/` no son contenido editorial y conviene
  contarlas aparte: se evalúan por uso, no por calidad de texto.
- `src/pages/[region]/` y `[...slug].astro` generan rutas dinámicas. El conteo de archivos
  no equivale al conteo de páginas: el número que manda es el del build.
