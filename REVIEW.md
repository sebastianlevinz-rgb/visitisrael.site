# REVIEW.md — Estándar de calidad de página

Esto es la vara. Se aplica a cualquier página que se toque, se fusione o se evalúe.
No es una guía de estilo: es un criterio de aprobación.

**Cómo se usa**: una página que falla cualquier punto de *Bloqueante* no se publica y no
sobrevive a la consolidación. Los puntos de *Debería* se anotan en el informe. Los de
*Detalle* se arreglan si ya estás con el archivo abierto.

---

## 1. Razón de existir — BLOQUEANTE

Antes de mirar el contenido: **¿por qué esta página es una página?**

- [ ] Responde una intención de búsqueda propia, no un subconjunto de otra página del sitio.
- [ ] No hay otra página del sitio que responda lo mismo. Si la hay, esta se fusiona.
- [ ] Un lector que llegó buscando esto se va con la respuesta, no con un índice de links.

**Señal de canibalización**: si dos páginas comparten intención y se diferencian solo por
una variante del keyword, son la misma página con dos URLs. Compiten entre sí en Google y
pierden las dos.

**Señal de página thin**: si el contenido único —sacando plantilla, nav, CTAs y FAQs
genéricas— no sostiene la promesa del título, es thin. El largo en palabras es un indicio,
no el criterio. Una página de 1.200 palabras que repite en cuatro secciones lo mismo es
más thin que una de 500 que resuelve.

---

## 2. Hechos verificables — BLOQUEANTE

Heredado del playbook viejo y no se negocia:

- [ ] **Cero ratings inventados.** Nada de "4,8 estrellas" si no salió de una fuente.
- [ ] **Cero cantidades de reseñas inventadas.** Nada de "más de 2.000 opiniones".
- [ ] **Cero precios exactos inventados.** Rangos en prosa está bien ("entre ₪40 y ₪70").
      Un precio exacto sin fuente es una promesa que el sitio no puede cumplir.
- [ ] Horarios, días de cierre y requisitos de visa son datos que **caducan**. Si están,
      tienen que ser correctos hoy o estar marcados como aproximados.
- [ ] Nada de eventos con fecha futura presentada como confirmada si es un placeholder.

Si un dato no se puede verificar: se omite. No se rellena.

---

## 3. Afiliados — BLOQUEANTE

- [ ] Todos los links salen de `src/config/affiliates.ts`. **Ninguna URL de partner
      hardcodeada** en la página.
- [ ] El link resuelve. Un afiliado roto es peor que no tener afiliado: quema confianza y
      no cobra.
- [ ] Hay atribución/disclosure visible. Es requisito legal en varios mercados y de los
      programas mismos (Booking, Skyscanner, GetYourGuide, Viator, Civitatis).
- [ ] El CTA es pertinente a la página. Un CTA de alquiler de autos en una guía de un
      museo urbano es relleno.
- [ ] No hay apilamiento de CTAs. Si hay más CTAs que secciones de contenido, la página es
      un embudo disfrazado de guía.

---

## 4. Links internos — BLOQUEANTE

- [ ] Cero links rotos. Se verifica con `pnpm check:links`.
- [ ] La página no es huérfana: algo del sitio la enlaza.
- [ ] Los links relevantes son **bidireccionales**. Si A manda a B por un tema, B debería
      reconocer a A.
- [ ] Los links salen del cuerpo del texto por relevancia, no en un bloque final de
      "también te puede interesar" con quince entradas.

---

## 5. SEO técnico — DEBERÍA

- [ ] `<title>` y meta description dentro de largo (lo valida `pnpm check`).
- [ ] Un solo H1, y lo pone el layout. El cuerpo arranca en H2.
- [ ] Canonical correcta.
- [ ] Si tiene traducciones, los `hreflang` se corresponden en las dos direcciones.
- [ ] Structured data válido si lo declara. Un `EventSchema` con fecha inventada es peor
      que ninguno.

---

## 6. Idioma y traducción — DEBERÍA

- [ ] La versión traducida dice lo mismo que la EN, no una versión recortada.
- [ ] Nada de traducción automática cruda en contenido religioso o de sitios en disputa.
      Ahí va nomenclatura pareja y redacción cuidada.
- [ ] Sin fugas de idioma en el chrome (menú, footer, CTAs, skip links).

---

## 7. Accesibilidad y performance — DEBERÍA

- [ ] Pasa el suite de axe-core (`pnpm test:e2e`).
- [ ] Imágenes con `alt` que describe, no que repite el keyword.
- [ ] Imágenes servidas en AVIF/WebP con variantes responsive (las genera el build).
- [ ] Contraste y navegación por teclado sin trampas.

---

## 8. Tono editorial — DETALLE

- [ ] Neutro y aspiracional. Gastronomía, cultura, lugares.
- [ ] No se opina de política ni de conflicto.
- [ ] Sin superlativos vacíos: "impresionante", "imperdible", "joya escondida" no dicen
      nada. Un dato concreto sí.
- [ ] Sin relleno de introducción. La primera oración ya responde algo.

---

## Veredicto

Cada página auditada cierra con uno de estos tres:

- **`must fix`** — falla algo bloqueante. Se arregla o se fusiona o se da de baja con 301.
- **`should fix`** — pasa lo bloqueante, falla algo de "debería". Sobrevive, entra en cola.
- **`okay así como está`** — pasa todo lo bloqueante y lo relevante de "debería". Se deja quieta.

El veredicto va con la razón al lado. "must fix" sin motivo escrito no sirve para nada.
