# Rutina: auditar una página contra REVIEW.md

**Cuándo**: al evaluar si una página sobrevive, se fusiona o se da de baja.

---

## Prompt

```
Auditá la página <RUTA> contra el estándar de REVIEW.md.

Recorré los 8 bloques en orden y para cada uno decime si pasa, con la evidencia concreta
(cita, número, nombre de archivo). No me des adjetivos: si decís "thin", decime cuánto
contenido único tiene sacando plantilla, nav, CTAs y FAQs.

Cerrá con:
- Veredicto: must fix / should fix / okay así como está
- El motivo en una línea
- Si es must fix: qué se hace (arreglar / fusionar en cuál / baja con 301 a dónde)

No edites nada. Esto es diagnóstico.
```

---

## Recordatorio del orden

Los bloques 1 a 4 son **bloqueantes**. Si falla uno, el veredicto ya es `must fix` y no
hace falta seguir con los demás para decidir — pero sí conviene anotarlos para el informe.

1. Razón de existir (¿por qué es una página?)
2. Hechos verificables (ratings/reseñas/precios inventados)
3. Afiliados (`src/config/affiliates.ts`, resuelven, atribución)
4. Links internos (rotos, huérfana, bidireccionalidad)
5. SEO técnico · 6. Idioma · 7. A11y y performance · 8. Tono

## Para auditar en lote

Mismo prompt pero pasando una lista o un glob. Pedir la salida como tabla:
`ruta | veredicto | bloque que falla | acción propuesta`.

Con lotes grandes, cortar en tandas y entregar una tabla por tanda. Un informe de 400
filas no lo lee nadie.
