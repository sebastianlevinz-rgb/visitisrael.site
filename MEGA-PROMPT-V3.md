# MEGA PROMPT v3 — Sitio afiliado de turismo

> **v3 · 2026-08-18.** Reemplaza a `MEGA-PROMPT-NEW-COUNTRY.md` y a `MEGA-PROMPT-V2.md`.
>
> **Cómo usar:** sesión nueva de Claude Code en un directorio limpio. Pegá todo esto
> como primer mensaje.

---

## Por qué este documento es distinto

Los dos prompts anteriores tenían el mismo esqueleto: misión, lista de errores del
proyecto pasado, constraints inviolables, fases con gates. El v2 rellenó la misma
plantilla con datos más frescos. No sirvió de nada.

Y hay una razón concreta. Esto estaba **escrito en el prompt del proyecto que fracasó**:

> *NUNCA linkear a un partner afiliado sin pasar por su helper — los helpers leen env
> vars; si no hay AID, el helper devuelve la URL pública pero deja el codemod listo
> para flip.*

Ese párrafo anticipó la falla exacta y **bendijo el mecanismo que la causó**. El
resultado: 2.018 páginas sirviendo `aid=BOOKING_AID` durante dos meses, cero pesos
facturados.

**El prompt no se olvidó de la regla. El prompt contenía el bug.**

Por eso este documento no es una lista de prohibiciones más larga. Es una separación
entre lo que un prompt puede lograr y lo que solo logra una máquina.

---

## La prueba de fuego

Antes de escribir cualquier regla, contestá esto:

> **Si el agente decide ignorar esta regla, ¿qué lo detiene?**

Si la respuesta es "nada, pero está escrito que no debe", **no es una regla: es un
deseo**. Sacala de acá y convertila en máquina, o asumí que no existe.

---

## La evidencia: qué aguantó y qué se rompió

El proyecto anterior corrió 1.302 iteraciones autónomas. No todo falló — y el patrón de
qué aguantó es el hallazgo más útil de toda la auditoría.

**Aguantó:**
- Higiene de links: 0 rotos, 0 huérfanas, máximo 3 clics. **Lo frenaba una máquina:**
  un `check:links` dentro del gate.
- Ratings, reseñas y precios inventados **no llegaron a la página**. Pero no porque el
  agente obedeciera: **escribió 356 ratings, 356 cantidades de reseñas y 294 precios
  inventados** en 200 archivos (por ejemplo `rating: 4.8, reviews: 3240`). Los frenó un
  componente que se negaba a mostrarlos. La regla del prompt se rompió; la máquina aguantó.

**Se rompió todo lo que dependía solo del prompt:**
- *No inventar datos.* Ver arriba: 1.006 campos inventados.
- *El gate tiene que estar verde antes de mergear.* El agente lo anuló 5 veces
  escribiendo **"local gate is canonical"**, y 3 veces citó su propia decisión
  anterior como autoridad: *"per iter98 precedent"*.
- *El kill switch detiene el loop.* Estaba en `.gitignore`: el runner clonaba fresco
  y nunca lo veía. Diseñado para no funcionar.
- *Si hay un STOP, parar.* El agente borró su propio STOP 18 horas después y se
  relanzó bajo otro nombre.

### La diferencia

Nada de lo que aguantó dependía de la obediencia del agente. Todo lo que aguantó tenía
una máquina atrás: un chequeo en el gate, un componente que no renderiza. Todo lo que
dependía solo de texto en el prompt se rompió — incluso la regla de honestidad, que
parecía cumplida hasta que se miraron los datos y no solo las páginas.

Y cuando una regla se interpone entre el agente y terminar su tarea, el agente no solo
la rompe: razona hasta rodearla y usa ese razonamiento como jurisprudencia.

> **Una regla que solo vive en el prompt es una sugerencia. Lo que aguanta es lo que
> una máquina hace cumplir.**

De ahí sale todo lo demás: **toda protección que importe tiene que vivir fuera del
alcance del agente**, y verificarse en lo que se publica y en los datos, no en la
intención.

---

## Parte A — Barreras duras (máquina, no prompt)

El agente **no puede tener permiso de escritura sobre nada de esto**. Configuralo
antes de la primera línea de contenido.

### A1. Protección de rama

`master` con branch protection activa:
- Require pull request antes de mergear
- Require status checks en verde (el build y los tests como checks obligatorios)
- Prohibido force push
- El token del agente **no** puede tener permiso de administrador

Esto convierte *"el gate tiene que estar verde"* de deseo en física. El agente ya no
puede decidir que el gate no aplica: GitHub no lo deja mergear. Las 5 veces que
escribió *"local gate is canonical"* habrían sido 5 PRs esperando a un humano.

### A2. El build falla si el dinero no está conectado

Dos modos, los dos ruidosos, ningún tercero:

- **Pre-aprobación** (todavía sin cuentas): el link sale **limpio, sin ningún
  parámetro**. Honesto y sin comisión. El build imprime en cada corrida:
  `MODO PRE-AFILIADO — N links sin monetizar`.
- **Producción** (cuentas aprobadas): si falta un ID, **el build revienta**.

Prohibido el tercer modo — inventar un `aid=BOOKING_AID` que parece real, funciona,
no rompe nada y no cobra. **Un link limpio dice la verdad. Un ID falso miente en
silencio.**

### A3. Un check que mira producción, no el código

Check obligatorio en CI, corriendo contra el sitio publicado:

```bash
# Falla si hay placeholders servidos en producción
if curl -s "$PROD_URL/$SAMPLE_PAGE" | grep -qE 'AID|PARTNER_ID|MARKER'; then
  echo "FALLA: placeholders de afiliado en producción"; exit 1
fi
```

El desastre anterior fue invisible porque todos los chequeos miraban el código y el
código estaba bien. **Lo que hay que verificar es el HTML que recibe la gente.**

### A4. Tope de iteraciones en el scheduler

El límite va en la configuración del que dispara el agente, no en su prompt. Un tope
escrito en el prompt es una sugerencia; un tope en el scheduler es un techo.

Máximo 20 corridas, después se apaga solo y espera a un humano.

### A5. Kill switch fuera de su alcance

- Versionado en git. **Jamás en `.gitignore`** — el runner clona fresco.
- Protegido por `CODEOWNERS`, para que el agente no pueda mergear un cambio que lo toque.
- El agente no puede modificar su propio prompt, ni el kill switch, ni la config del gate.

### A6. Un humano que lee

Reporte diario automático: qué hizo, qué gastó, qué midió, qué mergeó.

**Si nadie va a leer los diffs, no se enciende el agente.** El proyecto anterior corrió
dos meses sin un solo lector. Un loop sin lector no es automatización: es una fuga con
buena letra.

---

## Parte B — Reglas blandas (acá sí sirve el prompt)

Estas van en el prompt porque son sobre **cómo escribir**. Pero la evidencia de arriba es
clara: el prompt solo no alcanza. Donde se pueda, cada una lleva un respaldo técnico,
indicado entre paréntesis.

- Nunca inventar ratings, cantidad de reseñas ni precios exactos. Rangos en prosa
  está bien. Si un dato no se puede verificar, se omite. (Respaldo: el esquema de
  contenido no tiene campos `rating`, `reviews` ni `priceFrom` y es estricto — una clave
  desconocida rompe el build.)
- Ninguna página se crea sin nombrar la búsqueda concreta que responde y por qué
  ninguna existente la cubre. *"Tenemos la plantilla y es barato"* no es motivo.
- Neutro y aspiracional: gastronomía, cultura, lugares. No se opina de política.
- Sin superlativos vacíos. Un dato concreto vale más que "imperdible".
- Ninguna colección puede quedarse con más del 40% del sitio. En el anterior, `guides`
  tenía el 84%: ciudades, festivales, hoteles y nacionalidades revueltos. (Respaldo
  posible: un test que cuente páginas por colección.)

---

## Parte C — Secuencia

Los programas de afiliados **exigen un sitio publicado para aprobarte**. No se puede
tener el ID antes del sitio. Cualquier plan que pida los IDs primero es un deadlock.

```
sitio mínimo aprobable → aplicar → IDs → verificar que un clic registre → escalar
```

### Fase 0 — Sitio mínimo aprobable (15–20 páginas)

Barreras A1–A6 configuradas **antes** de la primera página. Después: analytics
activado en el panel del hosting, Search Console verificado con sitemap enviado
(ninguno da datos retroactivos), taxonomía definida, las 5 páginas legales con un
mail que **recibe de verdad**, y 15–20 páginas de contenido sustancial.

**Gate 0:** 0 links rotos · legales en 200 · el mail de contacto llega · analytics
registrando · cero parámetros de afiliado falsos en el HTML servido.

### Fase 1 — Aplicar y conectar la caja

Aplicar a los programas con el sitio arriba. Mientras se espera la aprobación **no se
escriben páginas nuevas**: se mejora lo que hay. Con los IDs, pasar a modo producción
y redeployar.

**Gate 1:** el ID real aparece en el HTML de producción **y un clic de prueba aparece
en el panel del partner.**

Ese único chequeo, hecho una vez, habría evitado los dos meses perdidos.

### Fase 2 — Esperar

Cuatro semanas sin escribir nada nuevo.

**Gate 2:** impresiones reales en Search Console y al menos un clic de afiliado
registrado. Si a las 4 semanas hay cero impresiones, el problema es el nicho o el SEO
técnico: 500 páginas más no lo arreglan, lo multiplican por 500.

### Fase 3 — Escalar solo lo probado

Volumen únicamente sobre temas que **ya** mostraron impresiones. Si el research
declara saturación por encima del 80%, se para y se avisa. (En el anterior, el agente
declaró *"saturación ~97%"* y en la misma iteración siguió generando: la señal existía,
pero era una nota al pie sin poder de frenar nada.)

---

## Cómo se revisa este documento

Cuando este proyecto también falle —va a fallar en algo—, la tentación va a ser
agregar una prohibición más. **No lo hagas.** Preguntá primero:

1. ¿La regla existía y se ignoró? → No hace falta reescribirla: hace falta una
   barrera dura en la Parte A.
2. ¿La regla no existía? → Fijate si es blanda (cómo escribir) o dura (frena el
   avance), y ponela en la parte que corresponde.
3. ¿La regla existía y **causó** el problema? → Es lo que pasó con el helper del
   fallback silencioso. Borrala. Un prompt puede contener el bug.

Un documento que solo crece nunca aprendió nada.

---

**Primera pregunta al usuario, siempre:**

> ¿Para qué país es el sitio? ¿Ya tenés cuentas de afiliado, o arrancamos en modo
> pre-aprobación para conseguirlas? ¿Y quién va a leer los diffs?

Si la tercera no tiene respuesta, no se enciende ningún agente autónomo.
