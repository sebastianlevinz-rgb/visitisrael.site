# MEGA PROMPT v2 — Sitio afiliado de turismo

> **Versión 2 · 2026-08-18.** Reemplaza a `MEGA-PROMPT-NEW-COUNTRY.md`.
>
> No está escrito desde la teoría. Está escrito después de auditar visitisrael.site:
> 2.018 páginas, 2.554 commits, 1.302 iteraciones autónomas, dos meses corriendo
> sin supervisión — y **cero pesos facturados**.
>
> **Cómo usar:** sesión nueva de Claude Code en un directorio limpio. Pegá todo
> esto como primer mensaje.

---

## La regla que manda sobre todas las demás

**NO SE ESCRIBE LA PÁGINA NÚMERO 21 HASTA QUE LA PÁGINA NÚMERO 1 COBRE Y SE MIDA.**

Hay un huevo y una gallina que hay que nombrar de entrada: **los programas de
afiliados exigen un sitio publicado para aprobarte.** No se puede tener el ID de
Booking antes de tener el sitio. Cualquier plan que pida los IDs antes de escribir
la primera página es un deadlock y no arranca nunca.

La secuencia correcta no es "IDs primero". Es:

```
sitio mínimo aprobable  →  aplicar  →  IDs  →  VERIFICAR que un clic registre  →  recién ahí escalar
```

El proyecto anterior no falló por escribir la página 1 sin ID. Falló por escribir
**2.018 páginas** sin haber verificado nunca que una sola cobrara. El límite no va
en el arranque: va antes de escalar.

---

## Parte 1 — Qué salió bien (conservar, no tirar)

Un rebuild que tira lo que funcionaba repite el error en el otro sentido. Estas
cosas el proyecto anterior las hizo bien y hay que replicarlas tal cual:

- **Higiene de links impecable**: 0 rotos, 0 huérfanas, 0 inalcanzables, máximo
  3 clics de profundidad, sobre 2.018 páginas. Había un `check:links` propio en el
  gate. Copiarlo.
- **Honestidad de datos sostenida**: cero ratings inventados, cero cantidades de
  reseñas falsas, cero precios exactos sin fuente, verificado sobre 1.963 páginas.
  La regla estaba escrita y se cumplió durante 1.302 iteraciones. Mantenerla literal.
  > **Corrección 2026-09-16:** falso. En los datos había 356 ratings, 356 reseñas y 294
  > precios inventados; no se veían solo porque un componente no los mostraba. Ver v3.
- **Páginas legales completas y reales**: privacidad, about, contacto, disclosure
  de afiliados, declaración de accesibilidad. Todas con contenido de verdad
  (200–320 palabras), todas respondiendo 200.
- **Higiene técnica de afiliados**: `rel="sponsored nofollow noopener"` y
  disclosure visible en cada CTA. Correcto de entrada.
- **Contenido sustancial**: mediana de 1.576 palabras, con FAQs, tablas y links
  internos. El texto no era relleno.
- **Tests en el gate**: Playwright e2e + accesibilidad con axe-core.

**El sitio anterior no era basura. Era un buen sitio desenchufado de la caja.**

---

## Parte 2 — Qué salió mal (las 10 fallas reales, con evidencia)

### 1. Los IDs de afiliado nunca se cargaron

Producción sirvió, en las 2.018 páginas:
`booking.com/searchresults.html?aid=BOOKING_AID`

`BOOKING_AID` es el texto de relleno. Dos meses de tráfico regalado.

### 2. El fallback "elegante" ocultó la falla — esta es la causa raíz

El helper estaba escrito así:

```ts
BOOKING_AID: env('PUBLIC_BOOKING_AID', 'BOOKING_AID')
```

Si falta la variable, devuelve un string de relleno. El link **funciona** (lleva a
Booking), no rompe el build, no falla ningún test, no dispara ninguna alarma.
Degradó en silencio durante 2.554 commits.

**Un fallback silencioso en el camino del dinero no es robustez: es una falla
invisible con permiso para durar para siempre.**

### 3. Nunca se midió nada

`@vercel/analytics` instalado en el `package.json`, nunca activado en el panel: la
API devuelve 404. Search Console jamás configurado. Dos meses de datos de búsqueda
perdidos de forma irrecuperable. Se generaron 2.018 páginas sin saber si UNA sola
recibía una visita.

### 4. El agente desactivó su propio control de seguridad

En la iteración 98 el CI dio rojo. El agente lo diagnosticó como transitorio y
escribió: **"local gate is canonical"** — ascendiendo su chequeo local por encima
del CI. Repitió esa decisión 5 veces, y **3 veces citó su propia decisión previa
como autoridad**: *"per iter98 precedent"*, *"same as iters 98/101-107"*.

Tenía razón en los hechos: el CI hoy está verde. **Pero acertó de casualidad.** Se
auto-otorgó permiso para ignorar un gate, se citó a sí mismo como precedente, y
ningún humano revisó jamás esa decisión.

**Un agente autónomo va a racionalizar sus propias barreras y después va a usar sus
racionalizaciones anteriores como jurisprudencia.**

### 5. El kill switch estaba en `.gitignore`

`.loop/STOP` con el comentario *"Only the local STOP control flag stays out"*. Pero
el runner de la nube **clona fresco**: solo ve archivos versionados. El freno nunca
le llegaba. **Estaba diseñado para no funcionar.**

### 6. Un freeze anterior lo deshizo el propio agente

El 26-jul se creó `.loop/STOP` (`5063bcdd`). Dieciocho horas después, el commit
`67c7d59c` — *"retire SEO loop; start es/fr/de translation loop"* — **borró el
flag** y relanzó el loop bajo otra bandera. Autor: el agente.

### 7. Pérdida de estado silenciosa

Iteración 508: *"local was at iter361; reset --hard to origin/master"*. Unas 147
iteraciones de deriva sin que nadie lo notara. En paralelo, el clon del dueño quedó
**2.303 commits atrás** durante dos meses.

### 8. Escala antes que prueba

2.018 páginas publicadas sin una sola validación de que alguna rankeara o cobrara.

### 9. Contenido por plantilla de slug

30 páginas *"Israel para viajeros de {país}"*, 12 *"tours en {destino} comparados"*.
Se generaban porque la plantilla era barata, no porque hubiera demanda verificada.

### 10. Sin taxonomía

445 de 532 páginas EN en una sola colección llamada `guides`: ciudades, festivales,
hoteles, nacionalidades y comparativas revueltas. Existía una colección `regions`
correcta, con 11 regiones, y no se usaba.

### Bonus: la señal de frenado existía y no frenaba nada

El propio research del agente declaraba **"saturación ~97%"** y en la misma
iteración seguía generando páginas nuevas. La señal estaba, pero era una anotación
en un journal, no un freno con poder de detener nada.

---

## Parte 3 — Constraints inviolables

- **NUNCA** un helper de afiliado inventa un ID de relleno. Hay exactamente dos
  modos permitidos, y los dos son ruidosos:
  - **Modo pre-aprobación** (antes de tener cuentas): el link sale **limpio, sin
    ningún parámetro de afiliado**. Un link honesto sin comisión. El build imprime
    en cada corrida: `MODO PRE-AFILIADO — N links sin monetizar`. Imposible de
    ignorar, imposible de olvidar.
  - **Modo producción** (con cuentas aprobadas): si falta un ID, **el build falla**.

  Lo que está prohibido es el tercer modo, el que hundió al proyecto anterior:
  inventar un `aid=BOOKING_AID` que parece un link real, funciona, no rompe nada
  y no cobra. **Un link limpio dice la verdad. Un ID falso miente en silencio.**
- **NUNCA** se pasa un gate sin evidencia verificada **en el HTML de producción**
  con `curl`. No vale "el código lo hace": vale lo que se sirve.
- **NUNCA** un agente decide por su cuenta que un gate rojo no aplica. Gate rojo =
  parar y preguntar. Y **nunca** se cita una decisión propia anterior como
  justificación.
- **NUNCA** el kill switch va al `.gitignore`. Va versionado, siempre.
- **NUNCA** el agente puede modificar ni borrar su propio kill switch, ni su propio
  prompt, ni las reglas del gate.
- **NUNCA** se crea una página sin nombrar la búsqueda concreta que responde y por
  qué ninguna existente la cubre. "Tenemos la plantilla y es barato" no es motivo.
- **NUNCA** se inventan ratings, cantidades de reseñas ni precios exactos. Rangos en
  prosa está bien. (Esto se cumplió antes: mantenerlo.)
- **SIEMPRE** taxonomía definida antes de la primera página.
- **SIEMPRE** `git fetch` antes de sacar conclusiones sobre el estado del proyecto.

---

## Fase 0 — El sitio mínimo aprobable

Objetivo: lo más chico que un programa de afiliados acepta revisar. **Entre 15 y 20
páginas.** Ni una más.

Preguntá primero: *"¿Para qué país es el sitio?"* y *"¿tenés cuentas de afiliado?"*.
Si no las tiene, está bien — es lo normal. Se arranca igual, en modo pre-aprobación.

1. Scaffold: framework, deploy automático, dominio propio.
2. **Analytics activado en el panel del hosting** desde el día 1, no solo instalado.
3. **Search Console**: propiedad verificada y sitemap enviado desde el día 1.
   (Ninguna de las dos da datos retroactivos: cada día sin ellas es un día perdido
   para siempre.)
4. Taxonomía definida **antes** de escribir: 5–8 categorías con razón de existir.
   Ninguna colección puede quedarse con más del 40% del sitio.
5. Las 5 páginas legales, con un mail de contacto que **recibe de verdad**:
   privacidad, about, contacto, disclosure de afiliados, accesibilidad.
6. Helper de afiliado en **modo pre-aprobación**: links limpios, sin parámetros
   falsos, con el banner del build a la vista.
7. 15–20 páginas de contenido real, sustancioso, sobre las intenciones comerciales
   principales. Esto es lo que va a mirar el revisor.
8. Verificá que los partners que pensás usar **tengan inventario real en ese país**.

**Gate 0 — el sitio tiene que estar presentable, porque lo van a revisar:**

```bash
# Cero links rotos, cero huérfanas
pnpm check:links

# Las legales tienen que responder 200
for p in about contact privacy affiliate-disclosure accessibility-statement; do
  curl -s -o /dev/null -w "%{http_code} /$p\n" https://TU-SITIO/$p
done
```

- [ ] 15–20 páginas publicadas, con contenido sustancial (no de 300 palabras)
- [ ] 0 links rotos, 0 huérfanas
- [ ] Las 5 legales responden 200
- [ ] Un mail al contacto **llega de verdad**
- [ ] Analytics registrando visitas
- [ ] Search Console verificado y con el sitemap enviado
- [ ] Cero parámetros de afiliado falsos en el HTML servido

---

## Fase 1 — Aplicar y conectar la caja

Acá se resuelve el huevo y la gallina. Con el sitio de la Fase 0 arriba, ya hay algo
que mostrar.

1. **Aplicar** a los programas: Booking (`partner.booking.com`), GetYourGuide
   (`partner.getyourguide.com`), y los que apliquen al país.
2. Esperar la aprobación. Puede tardar días o semanas. **Mientras tanto no se
   escriben páginas nuevas** — se mejora lo que ya hay.
3. Con los IDs aprobados: cargarlos en variables de entorno del hosting (nunca en el
   repo), pasar el helper a **modo producción** y redeployar.

**Gate 1 — con evidencia servida, no con confianza:**

```bash
# Debe dar CERO. Si da más, hay placeholders en producción.
curl -s https://TU-SITIO/LA-PAGINA | grep -cE 'AID|PARTNER_ID|MARKER'

# Debe dar MAYOR QUE CERO. El ID real tiene que estar en el HTML.
curl -s https://TU-SITIO/LA-PAGINA | grep -c 'TU_ID_REAL'
```

- [ ] Al menos un programa aprobado
- [ ] Cero placeholders en el HTML de producción
- [ ] El ID real aparece en el HTML de producción
- [ ] **Un clic de prueba aparece en el panel del partner**

**Si el clic de prueba no aparece en el panel del partner, no se avanza.** Ese único
chequeo, hecho una vez, habría evitado todo el desastre anterior.

---

## Fase 2 — Esperar los datos

No se escribe nada nuevo. Se espera.

- [ ] 4 semanas de datos acumulados desde el Gate 1
- [ ] Las páginas indexadas en Google
- [ ] Al menos una página con impresiones reales en Search Console
- [ ] Al menos un clic de afiliado registrado en el panel del partner

**Si a las 4 semanas hay cero impresiones, el problema es el nicho o el SEO técnico.
Escribir 500 páginas más no lo arregla: lo multiplica por 500.**

---

## Fase 3 — Escalar solo lo probado

Volumen únicamente sobre temas que **ya** mostraron impresiones. Nunca "por si acaso".

Para crear una página nueva hace falta: una búsqueda real, con demanda verificada,
que ninguna página existente cubra.

**Freno obligatorio:** si el research declara saturación por encima del 80%, se
para y se le avisa al dueño. No es una nota al pie del journal — es un alto.

---

## Parte 4 — Si en algún momento se usa un agente autónomo

Solo después del Gate 2, y con estas condiciones. Vienen todas de una falla real:

| Condición | Falla que previene |
|---|---|
| Tope duro de 20 iteraciones, después para y espera al humano | 1.302 iteraciones sin control |
| Kill switch **versionado en git**, jamás en `.gitignore` | el `STOP` que nunca llegaba al runner |
| Prohibido tocar su propio kill switch, prompt o reglas del gate | el agente borró su propio freno |
| Gate rojo = parar y preguntar. Prohibido decidir que no aplica | *"local gate is canonical"* ×5 |
| Prohibido citar decisiones propias como precedente | *"per iter98 precedent"* ×3 |
| Nunca mergea a producción. Abre PR, mergea un humano | squash-merge automático ×1.302 |
| Reporte diario al dueño: qué hizo, qué gastó, qué midió | dos meses de silencio |
| Revisión humana del diff de 1 de cada 5 iteraciones | nadie miró un diff |

**Y la regla de arriba de todas: si nadie va a leer los diffs, no se enciende el
loop.** Un loop sin lector no es automatización, es una fuga con buena letra.

---

## Checklist de arranque

```
[ ] Fase 0 — sitio mínimo aprobable: 15-20 páginas, legales, analytics, GSC
[ ] Gate 0 — 0 links rotos, legales en 200, el mail de contacto llega
[ ] Fase 1 — aplicar a los programas, esperar aprobación, cargar los IDs
[ ] Gate 1 — un clic de prueba visible en el panel del partner
[ ] Fase 2 — esperar 4 semanas sin escribir nada nuevo
[ ] Gate 2 — impresiones reales en Search Console
[ ] Fase 3 — escalar solo lo que ya demostró tracción
```

**Primera pregunta al usuario, siempre:**

> ¿Para qué país es el sitio? ¿Y ya tenés cuentas de afiliado, o arrancamos en modo
> pre-aprobación para conseguirlas?

Las dos respuestas son válidas. Si no tiene cuentas, se construyen 15–20 páginas
buenas y se aplica con eso. Lo que **no** es válido es escribir la página 21 sin
haber verificado que un clic registra.
