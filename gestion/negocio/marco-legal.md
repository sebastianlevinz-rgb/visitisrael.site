# Marco legal de VisitIsrael: qué hace falta para cobrar

**Fecha**: 2026-09-24
**Para**: Sebastian
**Contexto**: Sebastian es residente fiscal en Israel. Socia prevista: Mariluz, guía licenciada por
el Ministerio de Turismo de Israel. Modelo elegido: ser el frente de marca de una licencia ajena —
vender con la marca VisitIsrael tours operados por un operador israelí. Clientes: LatAm hispano,
España/UE, EE. UU./Canadá. Capital disponible: hasta US$5.000. Hoy el sitio no cobra nada y no hay
estructura societaria.

**Esto no es asesoramiento legal.** Es un mapa de la normativa con fuente y fecha de consulta.
Al final está la lista de qué consultar con un profesional y cuándo.

**Documento hermano**: `white-label.md` (misma carpeta, misma fecha) cubre el lado **comercial** del
white label — qué operadores israelíes existen, qué comisiones publican y cuáles no, y qué programas
permiten marca propia con cobro propio. Este documento cubre solo el lado **legal y fiscal**. Si hay
contradicción entre los dos sobre una cifra, gana el que cite fuente primaria.

**Tipo de cambio usado**: 1 US$ ≈ 3,0 ₪ (rango 3,01–3,06 en septiembre 2026, según
[exchange-rates.org](https://www.exchange-rates.org/exchange-rate-history/usd-ils-2026), consultado
2026-09-24). Toda conversión de este informe usa 3,0 y es aproximada.

---

## 0. Los ocho hallazgos que cambian la decisión

1. **En Israel no existe la licencia de agencia de viajes.** Fue abolida el 1 de enero de 2002.
   No hay trámite, ni examen, ni garantía bancaria, ni tasa, ni registro de agencias licenciadas.
   La premisa de "ser el frente de marca de una licencia ajena" **no tiene objeto en Israel**:
   no hay licencia que pedir prestada.
2. **Lo que sí queda en Israel es una obligación de garantizar el dinero de los clientes** (art. 12א
   de la Ley de Servicios de Turismo) que **nunca se reglamentó** y que, según el propio Contralor
   del Estado, nadie cumple desde 2002. El sector está de hecho desregulado. Lo único operativo es
   el **deber de información veraz** (reglamento de 2003).
3. **La licencia de guía (מורה דרך) de Mariluz sí es obligatoria y sí sirve** — pero solo la habilita
   a guiar. No es la que te falta para vender: no falta ninguna.
4. **El IVA cero a turistas existe, y cubre "servicios de agencia de viajes prestados a un turista"** —
   pero sobrevivió por poco a dos intentos de derogación (planes económicos 2025 y 2026). Es un
   riesgo vivo para 2027.
5. **La comisión que le factures a un operador israelí lleva IVA 18%, no cero.** El beneficio exige
   que el servicio se preste *al turista* y que tengas su pasaporte y domicilio. Una factura B2B a
   una empresa israelí no puede cumplirlo. Es neutral para el operador (lo recupera), pero destruye
   el argumento fiscal a favor del modelo "que cobre él".
6. **España cierra el agujero del white label.** El art. 164.1 del TRLGDCU obliga a constituir
   garantía de insolvencia a organizadores **y minoristas** no establecidos en la UE que dirijan
   actividades a España. Poner al operador israelí como organizador te saca del art. 20 de la
   Directiva, pero **no te saca del perímetro español**.
7. **California y Florida alcanzan expresamente a vendedores extranjeros.** California considera que
   hacés negocios en el estado si simplemente *solicitás* compradores ubicados ahí; Florida dice
   literalmente "resident or nonresident". Registro barato (US$100 y US$300/año), pero Florida suma
   fianza de US$25.000.
8. **Stripe no opera en Israel.** El plan de cobro tiene que armarse sin Stripe: PayPal (caro,
   6,9–7,9% efectivo), Payoneer (hasta 3,99%), Grow (4,25–4,5% con el recargo de tarjeta de turista),
   o que cobre el operador.

**La conclusión que sale de estos ocho**: el cuello de botella no es Israel, es el país del
comprador. Y el modo de esquivarlo no es la estructura societaria, es **no ser el vendedor**.

---

## 1. Israel: ¿cuándo hace falta licencia?

### 1.1 La licencia de agencia de viajes no existe desde 2002

La **Ley de Servicios de Turismo (חוק שירותי תיירות, תשל"ו-1976)** creaba un régimen de licencias.
La **Enmienda N.º 4 (תיקון מס' 4, התשס"ב-2002)**, aprobada en la Knesset el 6 de febrero de 2002 en
ejecución de una decisión de la Ley de Arreglos de 1999, lo desmontó.

Evidencia, por orden de peso:

| Fuente | Qué dice | Consultado |
|---|---|---|
| [Texto consolidado de la ley, nevo.co.il](https://www.nevo.co.il/law_html/law00/5115.htm) | Las definiciones de "סוכנות נסיעות" (agencia de viajes) y "משרד לתיור" figuran como **"(נמחקה)" = borradas**. Varios artículos aparecen como "(בוטל)" = derogados | 2026-09-24 |
| [Texto en Wikisource](https://he.wikisource.org/wiki/חוק_שירותי_תיירות) | Ídem, con el texto completo del capítulo ב'1 que lo reemplazó | 2026-09-24 |
| [Reglamento de agencias de 2000, Wikisource](https://he.wikisource.org/wiki/תקנות_שירותי_תיירות_(סוכנויות)) | Art. 31: vigencia **hasta el 31 de diciembre de 2001** | 2026-09-24 |
| [TheMarker, 4/1/2002](https://www.themarker.com/technation/2002-01-04/ty-article/0000017f-e5f7-da9b-a1ff-edff779b0001) | "Desde el 1 de enero no se requiere licencia para vender servicios turísticos" | 2026-09-24 |
| [tourism-law.co.il](https://www.tourism-law.co.il/LICENSE.htm) | "ממועד 1.1.2002 הופסקה הדרישה להחזיק ברישיון" | 2026-09-24 |

El PDF primario de la Enmienda 4 está en la Knesset
([fs.knesset.gov.il/15/law/15_lsr_300463.pdf](https://fs.knesset.gov.il/15/law/15_lsr_300463.pdf))
pero es un **escaneo sin capa de texto**: no se pudo leer automáticamente. El contenido se reconstruyó
desde nevo y Wikisource.

**Consecuencia directa**: no hay trámite en gov.il para "רישיון סוכנות נסיעות" porque no existe.
No hay garantía bancaria exigible, ni capital mínimo, ni examen, ni tasa, ni plazo de trámite.
Los montos históricos del reglamento derogado (US$125.000 para agencia de viajes, US$30.000 para
turismo interno, US$10.000 para oficina de turismo, según Wikisource) **no tienen efecto hoy** y
solo sirven de contexto.

### 1.2 Lo que sí rige: garantizar el dinero del cliente e informar

El capítulo ב'1 (arts. 12א a 12ה) reemplazó la licencia por dos obligaciones sobre el
**"נותן שירותי סוכנות נסיעות"** (prestador de servicios de agencia de viajes).

**Definición legal de "servicios de agencia de viajes"** (art. 1, traducida del hebreo; texto
verificado en [nevo](https://www.nevo.co.il/law_html/law00/5115.htm) y
[Wikisource](https://he.wikisource.org/wiki/חוק_שירותי_תיירות), 2026-09-24):

> Cada uno de los siguientes:
> (1) Organización y venta de un tour a Israel o a países extranjeros, o la reserva de servicios a
> los fines de dicho tour;
> (2) Reserva o venta de pasajes o vouchers de viaje hacia fuera de Israel — excluyendo la venta
> realizada directamente por una compañía aérea;
> (3) Reserva de servicios de alojamiento en hoteles en Israel o fuera de Israel;
> (4) Gestión para la obtención de visas a los fines de dicho tour o viaje;
> (5) **Prestación de asesoramiento profesional en cualquier asunto de los incisos (1) a (4).**

Y "סיור" (tour) se define ampliamente: *"לרבות ביצוע סיור והצעה או הסכמה לבצעו"* — incluye ejecutar
un tour y **ofrecer o acordar ejecutarlo**.

**Art. 12א(א)**: quien preste, a cambio de remuneración o sin ella pero de manera habitual
(דרך קבע), alguno de esos servicios, **debe garantizar el dinero de los clientes que reciben de él
el servicio** para el caso de insolvencia, mediante membresía en un fondo de garantía o póliza de
seguro.

**Art. 12ג + [Reglamento de información veraz de 2003](https://www.nevo.co.il/law_html/law01/999_121.htm)**
(consultado 2026-09-24): quien vende un paquete turístico debe entregar **por escrito** el
alojamiento (nombre, categoría, dirección, teléfono), el itinerario, los medios de transporte
incluida **la identidad del transportista o del organizador**, las comidas, el precio total con
intereses de cuotas, las condiciones de cancelación y reembolso, **la forma en que está protegido
el dinero del cliente**, requisitos de visa y pasaporte, advertencias sanitarias, contacto del
representante y qué servicios puede rechazar. No aplica si la compra se hace dentro de las **72
horas** previas a la salida.

### 1.3 Pero la garantía nunca se implementó

- El **Contralor del Estado** (Informe Anual 57b, 2006, informe 1846,
  [library.mevaker.gov.il](https://library.mevaker.gov.il/sites/DigitalLibrary/Pages/Reports/1846-35.aspx),
  consultado 2026-09-24) constató: *"משנת 2002 סוכנויות התיירות אינן מפקידות כספים בקרן ואף אינן
  מבטחות את כספי לקוחותיהם"* — desde 2002 las agencias **no depositan fondos en el fondo de garantía
  ni aseguran el dinero de sus clientes**.
- No encontré que se hayan dictado nunca los reglamentos de הבטחת כספי לקוחות que el art. 12א delega
  en el Ministro. Búsquedas dirigidas no arrojaron ninguno. **No verificado en sentido contrario**:
  no puedo probar que no existan, solo que no los encontré.
- El propio fondo voluntario de la asociación de agencias
  ([ittaa.org.il](https://ittaa.org.il/), consultado 2026-09-24) aparece **en proceso de disolución**,
  discutido en asamblea general con aviso de febrero de 2025.

**Traducción**: Israel no te va a frenar. El riesgo regulatorio del modelo no está acá.

### 1.4 La licencia de guía sí sigue vigente

**תקנות שירותי תיירות (מורי דרך), תשכ"ז-1967**
([PDF oficial del Ministerio](https://www.gov.il/BlobFolder/legalinfo/sherutei-tayarut_1967/he/takanot-sherutei-tayarut.pdf),
[nevo](https://www.nevo.co.il/law_html/law00/5116.htm), consultados 2026-09-24).

Art. 9ג, texto literal traducido:

> Ninguna persona actuará como guía turístico a cambio de remuneración, ningún transportista
> remunerado actuará como guía turístico, y **ninguna persona ofrecerá sus servicios** como guía
> turístico a cambio de remuneración, salvo que tenga en su poder una licencia.

Requisitos: residente de Israel, 21 años, sin antecedentes penales por delito con ignominia (קלון),
curso de formación aprobado, examen escrito y examen oral ante comité, y pago de tasa. Renovación
**cada dos años** con **dos capacitaciones** en el bienio
([נוהל רישוי מורי דרך, 14/07/2025](https://www.gov.il/BlobFolder/guide/files-for-site-links/he/licensing-procedure-2025.pdf)).
Tres tipos: nacional, regional y local; el guía debe actuar y presentarse conforme al tipo que tiene
(art. 9ד). Debe portar la licencia visible sobre la ropa mientras guía (art. 13).

**Tasa**: no verificada para 2026. Tres fuentes dan 224 ₪, 261 ₪ y 267 ₪ por bienio, porque el
reglamento la indexa al IPC con base junio 1990 y cada consolidación muestra una base distinta.
Orden de magnitud: 260–290 ₪. La página de servicio de gov.il devolvió 403.

**Art. 9ה: una agencia no puede emplear a un guía sin licencia vigente.** Es el único punto donde la
licencia de Mariluz es legalmente necesaria para la operación: los tours que vendas tienen que
guiarlos guías licenciados.

**Qué NO habilita la licencia de guía**: nada relativo a vender. Mariluz puede vender y organizar
tours y facturarlos — pero no porque su licencia la habilite, sino porque **no existe licencia de
agencia que se lo impida**. Si lo hace, pasa a ser "prestador de servicios de agencia de viajes" y
quedan sobre ella el art. 12א y el deber de información. **Esto es interpretación del texto legal:
no encontré dictamen del Ministerio ni jurisprudencia que lo confirme.**

### 1.5 ¿Marketing puro y derivación requieren licencia?

**No hay licencia que requerir.** La pregunta correcta es si el marketing cae dentro de "servicios
de agencia de viajes" y activa las obligaciones del capítulo ב'1. Mi lectura del texto:

| Actividad | ¿Cae en la definición? |
|---|---|
| Publicidad y contenido, sin cobrar al cliente ni reservar | Probablemente **no**. Ninguno de los cinco incisos cubre la mera promoción, y el art. 12א se dispara sobre "el dinero de los clientes" — si no hay dinero del cliente en tu poder, la obligación no tiene objeto |
| Generación de leads y derivación al operador, sin cobrar | Probablemente **no**, por lo mismo |
| **Asesorar al cliente sobre destinos, fechas o paquetes** | **Riesgo real: inciso (5)**, "asesoramiento profesional". Es notablemente amplio y es el flanco débil del modelo "solo marketing" |
| Cobrar al cliente y armar el viaje | **Sí**, incisos (1) y (3) |

**No encontré jurisprudencia ni dictamen oficial** que resuelva el caso "marketing puro / lead-gen".
La única exclusión explícita del texto es la venta de pasajes directamente por una aerolínea.
Este es el punto 1 para el abogado israelí.

### 1.6 Sanciones

Art. 13 de la ley: operar un servicio turístico sin la licencia requerida, multa de 20.000 **liras
israelíes** o 6 meses de prisión (80.000 para persona jurídica). La moneda salió de circulación en
1980 y **no pude verificar el equivalente actualizado en shekels**. Art. 13(ה), agregado en 2002:
6 meses de prisión por no garantizar el dinero de clientes o no cumplir el deber de información en
asunto sustancial. Art. 15: quien alega tener licencia debe probarlo.

Sanción administrativa (עיצום כספי, art. 12ד): notificación con 30 días para subsanar, doble para
personas jurídicas, +1/50 por día de infracción continuada, +50% por reincidencia dentro de 2 años,
apelable ante juzgado de paz en 30 días. **Monto base no confirmado**: Wikisource indica hasta
10.000 ₪; [ynet](https://www.ynet.co.il/articles/0,7340,L-1645429,00.html) menciona 49.800 ₪ como
multa por incumplir la garantía y el deber de información. Las cifras no cierran entre sí y no pude
resolver la discrepancia.

**Enforcement real: débil.** El Contralor encontró guías operando sin licencia y el Ministerio solo
emitió advertencias, sin aplicar las multas administrativas que ya estaban vigentes desde 2004.

### 1.7 Registro público

- **De agencias: no existe.** El art. 12ב lo prevé; según el Contralor nunca se puso en marcha.
- **De guías: sí existe**, en [data.gov.il](https://data.gov.il/dataset/moreh-dereh-eng) y en la
  colección del Ministerio en gov.il. **Ambos devolvieron HTTP 403** y no pude inspeccionarlos.
  Hay además un dataset [tour-operator](https://data.gov.il/dataset/tour-operator) que también dio
  403 y que conviene mirar a mano desde un navegador: puede ser un registro de operadores.

---

## 2. Israel: estructura societaria barata

### 2.1 Las tres opciones

| | עוסק פטור (osek patur) | עוסק מורשה (osek murshe) | חברה בע"מ (Ltd) |
|---|---|---|---|
| Tope de facturación | **122.833 ₪/año (2026)** | Sin tope | Sin tope |
| ¿Cobra IVA? | No | Sí, 18% | Sí, 18% |
| ¿Recupera IVA de compras? | **No** | Sí | Sí |
| Declaración de IVA | Anual (הצהרת מחזור) | Bimestral hasta 1,5M ₪; mensual arriba | Mensual/bimestral |
| Responsabilidad limitada | No | No | **Sí** |
| Auditoría anual obligatoria | No | No | **Sí** |
| Costo de contador | ~150–230 ₪/mes | ~150–230 ₪/mes | 800–1.500 ₪/mes |

Umbral del osek patur: **120.000 ₪ en 2024–2025, 122.833 ₪ en 2026**, reindexado cada 1 de enero.
**Fuentes secundarias concordantes** (contadores israelíes: eddiecpa.com, bizportal.co.il,
greeninvoice.co.il, consultados 2026-09-24); **no encontré la publicación oficial de רשות המסים**.
Una fuente dice 122.883 — parece error tipográfico. Confirmalo con contador antes de usarlo como
límite operativo.

**Una חברה בע"מ nunca puede ser osek patur**: debe registrarse como osek murshe sin importar cuánto
facture ([greeninvoice](https://www.greeninvoice.co.il/magazine/who-can-be-exempt-dealer/),
consultado 2026-09-24).

### 2.2 El detalle que importa: qué rubro declarás

La **תקנה 13** excluye del osek patur a una lista de profesiones, y la **תקנה 6א** agrega servicios
como conferencias, **enseñanza e instrucción/guiado (הדרכה)**, traducción, escritura y edición.

- **"שיווק" (marketing), publicidad y relaciones públicas NO están en la lista.** Un negocio de
  marketing turístico, en principio, sí puede ser osek patur.
- **Pero "יועץ לניהול" (consultor de gestión) y "כלכלן" (economista) sí están excluidos**, y
  "הדרכה" también. Si describís el rubro como consultoría o como guiado, te quedás afuera.

**Cómo describís la actividad al abrir el tik importa más que la actividad misma.** Punto 2 para el
contador.

### 2.3 Cuánto cuesta una Ltd

| Concepto | Monto | Fuente |
|---|---|---|
| Tasa de registro, trámite online | **2.559 ₪** (~US$850) | [mena.co.il](https://www.mena.co.il/), [ucan2.co.il](https://www.ucan2.co.il/אגרת-רישום-חברה/) — secundarias |
| Tasa de registro, trámite en papel | 3.123 ₪ | ídem |
| Tasa anual 2026, hasta el 31/3 | **1.338 ₪** | [PKF Amit Halfon](https://ahcpa.co.il/), [Gabbay & Shlafman](https://cpa-gs.co.il/), [Brit Pikuach](https://britcpa.co.il/) — secundarias concordantes |
| Tasa anual 2026, desde el 1/4 | **1.777 ₪** | ídem |
| Contabilidad mensual, empresa chica | 800–1.500 ₪/mes = 9.600–18.000 ₪/año | [Baker Tilly Israel](https://bakertilly.co.il/cpa-price-2026.html) — secundaria |
| Auditoría anual, empresa chica | 8.000–15.000 ₪/año | ídem |

**Total de compliance anual de una Ltd: 19.000–34.000 ₪ ≈ US$6.300–11.300.** Antes de impuestos y
sin contar honorarios de constitución de abogado, que **no pude verificar con fuente confiable** y
por eso no estimo.

**Eso solo ya supera los US$5.000 de capital disponible.** La Ltd queda descartada hoy.

Nota: la empresa está **exenta de la tasa anual en el año calendario en que se registra**. El
intento de fetch a la página de tasas de la Autoridad de Corporaciones
([ica.justice.gov.il](https://ica.justice.gov.il/IcaSite/request-type-menu/8/3)) devolvió
`ECONNRESET`. Las cifras de arriba son todas de estudios contables, no oficiales.

### 2.4 Dos socios 50/50

**Una Ltd israelí puede tener dos socios 50/50 sin problema legal.** El problema es fiscal:

- Impuesto corporativo **23%** sobre la utilidad.
- Dividendo a **socio sustancial** (≥10% del control, que es exactamente el caso de un 50/50):
  **30%**. Para socio común: 25%.
- Carga combinada: 23% + 30% × 77% ≈ **46,1%**, más מס יסף si corresponde (5% en 2026, sobre
  ingresos altos; umbral citado ~721.560 ₪ para 2025, **no confirmado para 2026**).

Fuentes: [bizportal](https://www.bizportal.co.il/guides/news/article/20038370),
[Steinmetz Aminach](https://www.cpa.co.il/dividend-tax/),
[Baker Tilly](https://bakertilly.co.il/blog-mas-yasaf-2026.html) — secundarias, consultadas
2026-09-24. Los tramos de impuesto personal 2026 y las tasas de ביטוח לאומי para עצמאי **no las
pude verificar** y no las invento.

**La alternativa: שותפות רשומה (sociedad registrada).** Tiene **transparencia fiscal** por el art. 63
de la פקודת מס הכנסה: la sociedad no es contribuyente, la renta se atribuye a cada socio según su
participación y tributa a nivel personal. **No hay doble imposición.** Se registra ante el
רשם השותפויות. Fuentes: [KLF](https://www.klf.co.il/tax-updates/definition-of-partnership-in-accordance-with-the-income-tax-ordinance-and-the-partnership-ordinance),
[Ampeli](https://www.ampeli-tax.co.il/מיסוי-שותפויות) — secundarias.

**Contrapartida**: la שותפות no da responsabilidad limitada. En la general, los socios responden con
patrimonio personal. Y también paga tasa anual al registrador — **monto no verificado**.

### 2.5 Qué conviene con menos de US$5.000

**Dos oskim separados, sin sociedad.** Sebastian factura marketing; Mariluz factura sus tours como
ya lo hace. El reparto se instrumenta por **contrato privado**, como ya está esbozado en
`propuesta-mariluz-numeros.md` sección 4. Costo: el contador de cada uno (~150–230 ₪/mes cada uno) y
nada más.

La sociedad se evalúa recién cuando haya caja que repartir y responsabilidad que limitar. El disparador
razonable sigue siendo el que ya escribiste: facturación conjunta sostenida arriba de US$5.000/mes
durante tres meses.

---

## 3. IVA y turismo receptivo

### 3.1 Tasa general: 18%

Subió de 17% a **18% el 1 de enero de 2025**. Para 2026 se propuso subirla a 19% y se descartó: el
5 de diciembre de 2025 el gabinete acordó una suba acotada del gasto de defensa en su lugar.
Fuentes: [Sovos](https://sovos.com/regulatory-updates/vat/israel-vat-rate-increase-to-18-from-january-1-2025/),
[Herzog](https://herzoglaw.co.il/en/news-and-insights/vat-updates-for-2025-vat-rate-increase-israel-invoices-reform-and-the-economic-plan-bill/),
[vatcalc](https://www.vatcalc.com/vat/israel-vat-rise-to-19-jan-2026-proposal/), consultadas
2026-09-24. **Tasa vigente al 2026-09-24: 18%.**

Ojo: la propia página oficial de רשות המסים sobre IVA a turistas sigue diciendo "כיום 17%". Está
desactualizada desde 2019. No tomes ese número.

### 3.2 El IVA cero a turistas existe y sigue vigente

Base legal: **סעיף 30(א)(8) לחוק מס ערך מוסף, התשל"ו-1975**, más las תקנות 12(א), 12א(ג) y 12ב del
reglamento de IVA.

**Lista cerrada de servicios con IVA 0%**, según la página oficial de רשות המסים
([hebreo](https://www.gov.il/he/pages/vat-tourists-zero-rate) /
[inglés](https://www.gov.il/en/pages/vat-tourists-zero-rate), publicada 13/03/2019, vigente al
2026-09-24):

1. Alojamiento del turista en hotel, más servicios accesorios prestados **en el hotel donde
   pernocta**: comida y bebida, pileta, lavandería, TV en la habitación, sauna, teléfono,
   instalaciones deportivas, traducción de documentos.
2. Alquiler de vehículo privado para conducción propia del turista.
3. **Transporte de tour (הסעת סיור)** del turista, en vehículo privado o en ómnibus con licencia.
4. Comidas provistas al turista durante un tour en ómnibus o durante navegación.
5. Traslado del turista en embarcación entre puntos de Israel.
6. Traslado del turista en aeronave entre puntos de Israel.
7. Hospitalización del turista.
8. Derecho a participar en una conferencia internacional con al menos **50 turistas**.
9. Uso de espacios de exhibición por residente extranjero.

Nota oficial textual: *"על כל סוג של שירות שמקבל תייר בישראל שאינו מסוג השירותים שפורטו לעיל, יחול
מס בשיעור המלא"* — **todo servicio a un turista que no esté en esta lista paga IVA pleno.**

**Además, el texto de la ley incluye un inciso que la página oficial no lista**:
*"שירותי סוכנות נסיעות שניתנו לתייר"* — **servicios de agencia de viajes prestados a un turista**.
Verificado en el [texto de la ley en Wikisource](https://he.wikisource.org/wiki/חוק_מס_ערך_מוסף) y
en dos estudios contables independientes:
[Steinmetz Aminach](https://cpa.co.il/הטבות-במעמ-לתיירים) y
[Gitit Kaplan](http://gititkaplan.co.il/מעמ-בשיעור-אפס-שירותי-תיירות/), ambos consultados 2026-09-24.
Este último cita la fórmula legal: *"מתן שירות לתייר בידי מי שנותן שירות משירותי סוכנות נסיעות"*.

**Hay divergencia entre la lista de la página oficial y el texto de la ley.** La ley prevalece, pero
es zona gris y justifica un pre-ruling si el modelo depende de eso.

### 3.3 Las condiciones exactas

Las siete condiciones acumulativas de la página oficial:

1. El servicio se presta a un turista que está en Israel con **visa tipo ב/2, ב/3 o ב/4** o permiso
   especial. Queda afuera quien tiene permiso para trabajar por salario en Israel.
2. El prestador tiene **un acuerdo o documento que confirme los detalles de la operación**.
3. El prestador tiene registrado **nombre del turista, domicilio permanente y número de pasaporte**.
4. Se emitió **factura detallando el servicio prestado al turista**.
5. En transporte de tour o alquiler de auto: patente del vehículo y, según el caso, nombre del
   conductor en la factura.
6. En comidas durante tour en ómnibus: patente del ómnibus en la factura al transportista.
7. Se registró en los libros **el precio de la operación, la forma de pago y la moneda**.

**Aclaración sobre la moneda**: la condición 7 exige **registrar** la moneda de pago, **no exige
cobrar en divisas**. No encontré en fuente oficial ninguna exigencia de cobrar en dólares. Si alguien
te lo afirma, pedile la fuente.

Definición legal de "תייר" (art. 1 de la Ley de IVA,
[nevo](https://www.nevo.co.il/law_html/law00/72813.htm)): persona en Israel con permiso de tránsito
o visita, excepto quien tenga permiso de visita para trabajar por salario.

### 3.4 Dos intentos de derogarlo, dos fracasos

- **Plan económico 2025.** Memorando del Ministerio de Finanzas del 29/10/2024:
  *"מוצע לתקן את סעיף 30(א)... כך שפסקה (8) תימחק ולא יחול מע"מ בשיעור אפס על שירותים הניתנים
  לתיירים"*. Fuente oficial:
  [tazkirim.gov.il](https://tazkirim.gov.il/s/law-item/a09KC000000lNqwYAE/?language=iw), consultada
  2026-09-24. **No se convirtió en ley.**
- **Plan económico 2026.** Se volvió a proponer, alcanzando alojamiento, alquiler de autos,
  catering, **guiado (הדרכה)**, servicios de agencias de viaje y turismo de salud. **Rechazado el 4
  de diciembre de 2025**: el ministro de Turismo Haim Katz lo frenó en la negociación presupuestaria
  y quedó un faltante de 1.500 millones ₪ que el Tesoro esperaba recaudar
  ([Calcalist, 4/12/2025](https://www.calcalist.co.il/local_news/article/bjh00d50b11l);
  [circular 70/2025 de Brit Pikuach](https://britcpa.co.il/); consultadas 2026-09-24).

Que el Tesoro tuviera que **volver a proponerlo** para 2026 prueba que el beneficio siguió vigente
todo 2025. Y su rechazo lo mantiene vigente en 2026.

**Advertencia sobre una fuente errónea**: vatcalc.com afirma que la exención a turistas se retiró con
el presupuesto 2025. Es incorrecto y contradice la página oficial vigente y la noticia de Calcalist.

**Riesgo**: lo intentaron dos años seguidos. Es razonable esperar un tercer intento en el plan
económico 2027.

Dato secundario útil: que el tazkir de derogación listara **הדרכה** (guiado) entre los servicios
afectados sugiere que el guiado a turistas hoy goza de tasa cero. Pero **no figura en la lista
oficial** y no encontré fuente que lo confirme directamente. **Zona gris.**

### 3.5 El caso que define tu modelo: la comisión al operador israelí

**Comisión de marketing facturada a un operador israelí: IVA 18% pleno.** Razones:

1. El 30(א)(8) da tasa cero a servicios *"הניתנים לתייר"* — prestados **al turista**. Tu servicio se
   presta a un residente israelí.
2. Las condiciones lo hacen materialmente imposible: te exigen nombre, domicilio y **pasaporte del
   turista** y una factura que detalle el servicio prestado **al turista**. Una factura de comisión a
   una empresa israelí no cumple ninguna.
3. La lista es cerrada y "comisión de marketing" no figura.
4. [BDO Israel](https://www.bdo.co.il/he-il/כתבות-ומאמרים/מיסים/מיסים-עקיפים/אירוויזיון-2019-בישראל-–-תיירות,-אפליקציות,-ומע-מ-שביניהם)
   (consultado 2026-09-24) advierte que si el prestador israelí ofrece intermediación entre una
   empresa extranjera y un tercero israelí, puede aplicar una excepción que exige IVA completo.

**Mitigante importante**: si el operador es osek murshe, **recupera ese IVA como מס תשומות**. Para él
es neutral en caja. Solo es un costo real si el operador estuviera exento. Pero el argumento
"cobramos comisión y pagamos menos IVA" **no existe**.

### 3.6 Si le vendés el paquete directamente al turista

Hay que **desagregar componente por componente**. Alojamiento, transporte de tour y comidas del tour
van a 0% si cumplís las siete condiciones. El resto va a 18%. **No se puede facturar un paquete
global a 0%.** Como criterio análogo, en turismo emisivo cuando no se pueden separar los componentes
la autoridad aplica 50% tasa plena y 50% tasa cero
([Ben Shushan CPA](https://www.bshcpa.co.il/תיירות-יוצאת-היבטי-מיסוי/), consultado 2026-09-24).

### 3.7 Exportación de servicios: סעיף 30(א)(5)

Texto legal: *"מתן שירות לתושב חוץ, למעט שירות ששר האוצר קבע לענין זה"* — servicio a residente
extranjero, con tasa cero.

**Pero las limitaciones son duras y la jurisprudencia restrictiva**
([KLF](https://www.klf.co.il/tax-updates/zero-rate-vat-understanding-section-30-a-5-of-the-value-added-tax-law),
[Ampeli](https://www.ampeli-tax.co.il/vat-at-zero-rate), consultadas 2026-09-24):

- No se considera prestado a un residente extranjero cuando el objeto del acuerdo es prestar el
  servicio **también, en los hechos, a un residente israelí en Israel**.
- **Quién paga no define quién recibe.**
- **תקנה 12א(א)**: no hay tasa cero si hay conexión, aun mínima, con **un bien situado en Israel**.
- **תקנה 12א(ג)**: excluye la tasa cero cuando el objeto es prestar servicio a **otro residente
  extranjero mientras está en Israel**.

**Riesgo concreto**: hacerle marketing a un operador extranjero para vender destinos **en Israel**
choca de frente con 12א(א) y 12א(ג). No es automático. Punto 3 para el contador — y candidato a
pre-ruling ante רשות המסים.

### 3.8 La reforma de facturación que te toca en 2026

**חשבוניות ישראל**: para deducir IVA de una factura sobre cierto monto hace falta un
**número de asignación (מספר הקצאה)** emitido por רשות המסים.

| Período | Umbral |
|---|---|
| 2025 | 20.000 ₪ |
| 2026, primer semestre | **10.000 ₪** |
| Desde el 1/6/2026 | **5.000 ₪** |

Aplica **solo entre oskim murshim**. Facturas a consumidores finales, operaciones exentas y
**operaciones a IVA cero no lo requieren**. Fuentes:
[greeninvoice](https://www.greeninvoice.co.il/magazine/israel-invoice/),
[Horizon](https://horizon.org.il/cfo-outsource/allocation-number-invoice-2026/) — secundarias,
consultadas 2026-09-24.

---

## 4. Qué te exige cada mercado de destino

### 4.1 Unión Europea y España

#### El marco cambió en 2026 pero todavía no se aplica

La **Directiva (UE) 2026/1024, de 29 de abril de 2026**, publicada en el DOUE el 8 de mayo de 2026,
modifica la Directiva 2015/2302. Su art. 3:

> Los Estados miembros adoptarán y publicarán, a más tardar el **29 de septiembre de 2028**, las
> disposiciones necesarias... Aplicarán dichas disposiciones a partir del **29 de marzo de 2029**.

Fuente oficial: [BOE, DOUE-L-2026-80677](https://www.boe.es/buscar/doc.php?id=DOUE-L-2026-80677) y
el [PDF del DOUE](https://www.boe.es/doue/2026/1024/L00001-00025.pdf), consultados 2026-09-24.

**Hoy rige el texto de 2015 tal como está transpuesto en España.** Pero la reforma cambia dos cosas
que hay que tener en el radar: **suprime la figura del "servicio de viaje vinculado"** (art. 1.4.b:
"se suprime el punto 5"; y se suprime el anexo II), llevando esos supuestos a la definición de viaje
combinado, y **sube el umbral del 25% al articulado**. El considerando 5 lo explica: las normas sobre
SVV "han complicado considerablemente el marco legislativo" y "nada atestigua que hayan redundado en
beneficios tangibles para los viajeros". Análisis:
[Garrigues](https://blogturismo.garrigues.com/en/european-union/the-european-union-discontinues-linked-travel-arrangements-and-reorganizes-the-legal-framework-governing-package-travel)
(28/05/2026) y [CMS](https://cms.law/en/int/legal-updates/the-eu-package-travel-directive-is-no-longer-really-about-package-holidays.-it-is-increasingly-about-who-controls-the-customer-journey)
(19/08/2026), consultados 2026-09-24.

#### Cuándo hay "viaje combinado" (art. 3.2, texto vigente)

> La combinación de al menos dos tipos de servicios de viaje a efectos del mismo viaje o vacación, si
> esos servicios:
> a) son combinados por un solo empresario... antes de que se celebre un contrato único por la
> totalidad de los servicios, o
> b) con independencia de la celebración de contratos distintos con diferentes prestadores... esos
> servicios: i) son contratados en un único punto de venta y han sido seleccionados antes de que el
> viajero acepte pagar, ii) son ofrecidos o facturados a un precio a tanto alzado o global,
> iii) son anunciados o vendidos como "viaje combinado" o bajo una denominación similar,
> iv) son combinados después de la celebración de un contrato en virtud del cual el empresario
> permite al viajero elegir entre una selección..., o v) son contratados con distintos empresarios a
> través de procesos de reserva en línea conectados en los que el nombre del viajero, sus datos de
> pago y su dirección de correo electrónico son transmitidos por el empresario con el que se celebra
> el primer contrato a otro..., con el que se celebra un contrato a más tardar **24 horas** después
> de la confirmación de la reserva del primer servicio.

**Corrección a un mito**: el **25% no está en el art. 3.2 de la Directiva de 2015**. El articulado
dice "proporción significativa del valor". El 25% aparece solo en el **considerando 18**. Pero
**España sí lo llevó al articulado**: art. 151.1.b) del TRLGDCU.

#### Ámbito territorial: te alcanza

**Art. 17.1, párrafo segundo, literal**:

> Los organizadores que no estén establecidos en un Estado miembro y que vendan u ofrezcan viajes
> combinados en un Estado miembro, o que **por el medio que sea dirijan actividades de ese tipo a un
> Estado miembro**, estarán obligados a constituir la garantía de conformidad con la legislación de
> ese Estado miembro.

**Considerando 50**: aclara que esto aplica a empresarios no establecidos en un Estado miembro que
dirijan actividades "en la acepción del Reglamento (CE) n.º 593/2008 [Roma I] y del Reglamento (UE)
n.º 1215/2012 [Bruselas I bis]".

**No es opcional ni interpretativo.** Indicios de "dirigir actividades": sitio en español, precios en
euros, mención de España, publicidad dirigida a España. Y el art. 23.1 cierra la salida fácil:

> Si el organizador... declara que actúa exclusivamente como prestador de servicios de viaje, como
> intermediario o en cualquier otra calidad, o que un viaje combinado... no constituye un viaje
> combinado, tal declaración no eximirá a tal organizador o empresario de las obligaciones que les
> impone la presente Directiva.

**La reforma de 2026 mantiene intacta la cláusula extraterritorial** y añade un registro público en
línea de organizadores cubiertos (nuevo art. 17.8).

#### España va más lejos que la Directiva

**Art. 164.1 del TRLGDCU** (RDLeg 1/2007, reescrito por el
[Real Decreto-ley 23/2018](https://www.boe.es/buscar/act.php?id=BOE-A-2018-17769), texto consolidado
verificado vía API del BOE, 2026-09-24), párrafo segundo:

> **Los organizadores y los minoristas no establecidos en un Estado miembro de la Unión Europea** que
> vendan u ofrezcan viajes combinados en España, o que por cualquier medio dirijan dichas actividades
> a España, **estarán también obligados a prestar dicha garantía**.

**Esto es el hallazgo contraintuitivo del bloque europeo.** La Directiva solo obliga al *organizador*
no establecido. **España extiende la obligación al *minorista* no establecido.** Poner al operador
israelí como organizador y quedarte vos como minorista **no te saca del perímetro español**.

Además el art. 165 suma una segunda garantía, de cumplimiento general de obligaciones, reclamable
directamente por el viajero.

#### Qué cuesta la garantía

El RDL 23/2018 **no fija ninguna cifra**: el art. 164.1 remite a "los términos que determine la
Administración competente", es decir, **las comunidades autónomas**.

**Cifra verificada — Andalucía**, Decreto 114/2023 de 23 de mayo
([BOJA 99, 26/05/2023](https://www.juntadeandalucia.es/boja/2023/99/28), consultado 2026-09-24):

- Garantía primer año: **mínimo 100.000 €**. Desde el segundo año: **5% del volumen de negocios** del
  ejercicio anterior, con suelo de 100.000 €.
- Alternativa colectiva: mínimo 50% de la suma de las individuales, con fondo global mínimo de
  2.500.000 €.
- Seguro de responsabilidad civil: **900.000 €** (300.000 € por daños corporales, materiales y
  perjuicios económicos).
- Mismas cifras para empresas de servicios de viaje vinculados.

**Caveat**: las cifras salieron consistentes en dos lecturas de la página del BOJA, pero **no hay
transcripción literal confirmada del articulado**. Verificar en el PDF del decreto antes de usarlas
para decidir. **Los importes de Madrid, Cataluña, Valencia, Baleares y Canarias no los verifiqué.**

**100.000 € son ~33 veces tu capital disponible.** No es una opción hoy.

Y hay un problema práctico sin resolver en las fuentes: al no estar establecida en España, no existe
una "comunidad autónoma de establecimiento" natural ante la cual constituir la garantía. **Zona gris
administrativa real.**

#### ¿El white label evita la obligación?

**Art. 20 de la Directiva, literal** ("Obligaciones específicas del minorista cuando el organizador
esté establecido fuera del Espacio Económico Europeo"):

> Sin perjuicio de lo dispuesto en el artículo 13, apartado 1, párrafo segundo, cuando el organizador
> esté establecido fuera del Espacio Económico Europeo, **el minorista establecido en un Estado
> miembro estará sujeto a las obligaciones impuestas a los organizadores en los capítulos IV y V,
> salvo que el minorista pruebe que el organizador cumple** con lo dispuesto en dichos capítulos.

Las tres ramas del caso:

| Rama | Situación | Resultado |
|---|---|---|
| **A** | VisitIsrael combina y vende paquete directo al consumidor español | Sos **organizador no establecido** → obligado a garantía española (art. 17.1 §2 Directiva + art. 164.1 §2 TRLGDCU). El art. 20 no aplica: no hay minorista en la UE |
| **B** | El operador israelí es organizador; VisitIsrael intermedia; ambos fuera de la UE | El art. 20 **no se activa** (exige minorista establecido en un Estado miembro). Pero el art. 164.1 §2 TRLGDCU **te alcanza igual como minorista no establecido**. No te salvás en España |
| **C** | Venta a través de una agencia establecida en España | El art. 20 se activa en pleno: **la agencia española asume las obligaciones del organizador**, salvo que pruebe que el israelí cumple. Le carga responsabilidad por la ejecución, reducción de precio e indemnización, asistencia, repatriación y garantía propia dimensionada sobre ese volumen |

**La rama C tiene una lectura comercial que conviene entender**: la excepción del art. 20 ("salvo que
el minorista pruebe que el organizador cumple") convierte el **certificado de garantía de insolvencia
del operador israelí** en la llave que abre el canal de distribución europeo. Sin ese papel, una
agencia española que te distribuya tiene que asumir riesgo de organizador sobre una operación que no
controla, en un destino al que no viaja, con un proveedor fuera del EEE. O te cobra caro, o te dice
que no.

**Dato adicional sobre la responsabilidad del minorista español**: la **Ley 4/2022, de 25 de febrero**
cambió el art. 161.1 del TRLGDCU. Ya no hay solidaridad automática entre organizador y minorista;
cada uno responde "en función de las obligaciones que les correspondan por su ámbito de gestión".
**Pero** el minorista que no gestiona diligentemente una reclamación pasa a responder solidariamente
por el ámbito del organizador, **y la carga de la prueba de la diligencia es suya**.

#### ¿Y si solo hay links de afiliado y no cobrás nada?

**Ahí sí quedás afuera, pero el margen es más estrecho de lo que parece.**

**Considerando 12 de la Directiva** (la disposición que te exime), literal:

> Los servicios de viaje vinculados en línea deben distinguirse asimismo de sitios web a los que se
> accede mediante un enlace cuya finalidad no es la celebración de un contrato con el viajero, y de
> los enlaces a través de los cuales simplemente se informa a los viajeros sobre otros servicios de
> viaje de modo general... **o si se utilizan "cookies" o metadatos para insertar publicidad en
> sitios web**.

**Pero el considerando 13 menciona expresamente el modelo de afiliación**:

> Tal facilitación suele basarse en una **relación comercial remunerada** entre el empresario que
> facilita la contratación de servicios de viaje adicionales y el otro empresario, sea cual sea el
> método de cálculo de tal remuneración, que puede basarse, por ejemplo, en el **número de clics o en
> el volumen de ventas**.

Es decir: cobrar por clic o por venta — el modelo exacto de GetYourGuide y Booking — es el **indicio
típico de la "facilitación"**. Que no le cobres al viajero **no es el criterio determinante**.

El [informe COM(2019) 270 final de la Comisión Europea](https://commission.europa.eu/document/download/5cc24923-6f06-48fb-9da9-96b57b06f1a9_en?filename=com_2019_270_f1_report_from_commission_en.pdf)
(21/06/2019, consultado 2026-09-24) aclara dos cosas:

> The definition requires that the first trader transmit to the second trader the specific traveller's
> personal data, i.e. the traveller's name, payment details and email address.

> ...the traveller must book the second travel service within 24 hours of the booking of the first
> travel service. **Beyond this time-limit, the different travel services are simply stand-alone
> travel services.**

Y reconoce que el concepto sigue sin estar claro: los stakeholders señalaron "the lack of clarity
regarding the meaning of 'facilitation in a targeted manner'". La Comisión no propuso cambiar la
definición en 2019.

**Dónde está la línea, en concreto:**

**Queda afuera** (publicidad y afiliación pura): contenido editorial con enlaces genéricos, sin
preselección del producto; que el viajero salga a un sitio de terceros y ahí busque, elija y pague por
su cuenta; que **no transmitas nombre, email ni datos de pago** (un parámetro `aff_id` en la URL no es
transmisión de datos personales); publicidad por cookies.

**Zona de riesgo** (servicio de viaje vinculado): confirmar una primera reserva y acto seguido
invitar de manera dirigida a contratar un servicio adicional que se cierre en menos de 24 horas; deep
links preseleccionados con fechas y producto tras una primera reserva; cualquier mecánica de
"completá tu viaje".

**Viaje combinado pleno**: transmitir nombre + datos de pago + email y que el contrato se cierre en
menos de 24 horas. **Y, mucho antes de eso**, combinar dos o más servicios y venderlos bajo contrato
único o precio global (art. 3.2.a).

**El factor decisivo no es cobrar o no cobrar. Es, en este orden:**

1. ¿Combinás los servicios? → paquete.
2. ¿Precio a tanto alzado o global? → paquete.
3. ¿Se anuncia como "viaje combinado" o denominación similar? → paquete. **Cuidado con el marketing**:
   "paquete", "tour todo incluido", "escapada completa" pueden activar este inciso solos.
4. ¿Único punto de venta con selección previa al pago? → paquete.
5. Recién si nada de eso pasa, se analiza afiliación.

### 4.2 Estados Unidos

No hay ley federal de seller of travel. Hay leyes estaduales, y **dos de las importantes alcanzan
expresamente a vendedores de afuera**.

#### California

[Seller of Travel Program del Attorney General](https://oag.ca.gov/travel) (consultado 2026-09-24).
Business & Professions Code §§17550 y ss.

- **Alcance**: un seller of travel se considera que hace negocios en California **si solicita
  compradores potenciales ubicados en el estado**, o solicita negocios desde ubicaciones en el
  estado, **sin importar la ubicación geográfica del comprador, incluidas personas ubicadas fuera de
  California o de los Estados Unidos**. Cubre empresas sin oficina en California (§17550.20).
- **Costo de registro**: **US$100 por ubicación**, a presentar no menos de 10 días antes de empezar a
  hacer negocios en el estado.
- **Cuenta fiduciaria**: §17550.15 exige depositar el **100% de las sumas recibidas** en una trust
  account, con excepciones acotadas en §17550.16 (entre ellas, agentes registrados de ARC, y sellers
  con 3+ años de actividad que reenvían los fondos a proveedores que cumplen).
- **Travel Consumer Restitution Fund**: **no te alcanza**. La definición de "participant"
  ([tcrcinfo.org](https://www.tcrcinfo.org/resources/statute), consultado 2026-09-24) es
  "a registered seller of travel **with its principal place of business in California**". Un vendedor
  israelí no es participante. **Pero** §17550.25 obliga a los no participantes que hacen negocios con
  personas en California a declararlo **"clear and conspicuous... both orally and in writing"**.
  Los assessments del TCRF (hasta US$35/año de operación y hasta US$200 de restitución por
  ubicación) no te aplican.

#### Florida

[FDACS Sellers of Travel](https://www.fdacs.gov/Business-Services/Sellers-of-Travel) (consultado
2026-09-24).

- **Alcance, literal**: "any **resident or nonresident** person, firm, corporation or business entity
  that offers for sale... prearranged travel or tourist-related services... through vacation or tour
  packages". **Cubre expresamente a no residentes.**
- **Registro anual**: **US$300**. Vendedores de vacation certificates: +US$100. Agentes de venta
  independientes: US$50 cada uno. No reembolsables.
- **Fianza**: hasta **US$25.000** de surety bond (hasta US$50.000 para vacation certificates).
- **Exención**: contrato con ARC por 3+ años bajo propiedad y control consistentes (5+ años para
  vacation certificates). Igual hay que obtener el statement of exemption del FDACS.

**Florida es el estado más caro del paquete**: US$300/año más una fianza de US$25.000, que en la
práctica significa pagar una prima anual a una compañía de caución. **No verifiqué el costo de esa
prima.**

#### Washington

[Department of Licensing](https://dol.wa.gov/professional-licenses/sellers-travel/get-your-license-sellers-travel),
RCW 19.138 (consultados 2026-09-24).

- Existe una categoría específica de **"out-of-state seller of travel"**. A los solicitantes de fuera
  del estado se les pide prueba de registro válido en su estado de origen.
- **La fianza solo se exige si retenés fondos de servicios de viaje retail por más de 5 días
  hábiles.** Escala según ingreso bruto del año anterior proveniente de residentes de Washington:
  menos de US$199.999 → US$10.000; US$200.000–499.999 → US$20.000; US$500.000–749.999 → US$30.000;
  US$750.000–999.999 → US$40.000; US$1.000.000+ → US$50.000.
- **El monto exacto de la tasa de licencia no lo pude obtener**: la página remite a un enlace de fees
  que no mostró importes.

**Ese carve-out de los 5 días hábiles es relevante para el diseño del modelo**: si no retenés dinero
del cliente, no hay fianza.

#### Hawaii e Iowa

- **Hawaii**: HRS 468L. Hay que registrarse antes de vender o publicitar servicios de viaje en
  Hawaii. Tasa: **US$215** si se solicita en año par, **US$146** en año impar
  ([DCCA Hawaii](https://cca.hawaii.gov/pvl/programs/travel/), consultado 2026-09-24).
- **Iowa**: **ya no aplica.** El capítulo 9D del Iowa Code, que exigía registro y fianza ante el
  Secretary of State, **fue derogado en 2020 por la House File 2627**, con efecto 1/7/2020. Fuente
  secundaria consultada 2026-09-24; no verifiqué el texto de la HF 2627 en la fuente legislativa
  oficial.

#### Enforcement contra empresas extranjeras

**No lo investigué y no lo afirmo.** Lo que sí es verificable es que el texto de California y Florida
te alcanza por escrito, y que el costo de cumplir en los dos estados juntos (US$400/año de tasas) es
trivial frente al costo de la fianza de Florida y frente al riesgo de operar en infracción declarada.

### 4.3 LatAm

#### Argentina

**Ley 18.829 de Agentes de Viajes** y su **Decreto Reglamentario 2182/72**.

**Artículo 1, ámbito de aplicación** (texto verificado vía búsqueda sobre
[infoleg](https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/27128/norma.htm) y
[argentina.gob.ar](https://www.argentina.gob.ar/normativa/nacional/ley-18829-27128/texto),
consultados 2026-09-24):

> Quedan sujetas a las disposiciones de esta Ley todas las personas físicas o jurídicas que
> desarrollen, **en el territorio nacional**, con o sin fines de lucro, en forma permanente,
> transitoria o accidental, [las siguientes actividades]...

Las actividades incluyen intermediación en reserva de transporte y alojamiento en el país o en el
exterior, organización de viajes y excursiones, y recepción o asistencia de turistas.

**Lectura**: el criterio es **territorial**. Una empresa israelí que vende por internet desde Israel
no desarrolla la actividad en territorio argentino. **Argumento razonable para quedar fuera del
legajo EVT — pero es interpretación mía del artículo, no un pronunciamiento de la autoridad.**
No encontré criterio oficial sobre venta online desde el exterior.

**Fondo de garantía**: el texto de la ley habla de hasta $100.000 para Empresas de Viajes y Turismo,
$50.000 para Agencias de Turismo y $25.000 para Agencias de Pasajes en CABA y ciudades de más de
500.000 habitantes. **Son pesos de 1970 y esas cifras no tienen ningún sentido hoy.** Los montos
vigentes se fijan por resoluciones posteriores (Resolución 166/2005, Resolución 204/2006 y
siguientes) y **no los verifiqué**. Renovación anual entre el 15 de marzo de cada año y el 15 de
marzo del siguiente, con presentación antes del último día hábil de febrero.

**Dato que sí importa**: el art. 32 del Decreto 2182/72 establece que las empresas del sector no
pueden operar ni pagar comisiones a agencias sin licencia. Es decir: el castigo práctico no es una
multa, es quedar fuera del circuito de proveedores argentinos.

#### México

El **Registro Nacional de Turismo** de SECTUR ([rnt.sectur.gob.mx](https://rnt.sectur.gob.mx/)):
**hay información oficial contradictoria** sobre si es obligatorio o voluntario — algunas páginas
gubernamentales lo describen como "catálogo público gratuito, obligatorio e indispensable" y otras
como registro voluntario. **No lo pude resolver** y no encontré nada sobre aplicación a prestadores
extranjeros sin establecimiento en México.

#### Colombia

El **Registro Nacional de Turismo** ([rnt.confecamaras.co](https://rnt.confecamaras.co/),
[mincit.gov.co](https://www.mincit.gov.co/)) es **obligatorio** para prestadores de servicios
turísticos que operan en Colombia, con actualización anual. Desde 2021 **todas las personas
naturales o jurídicas, nacionales o extranjeras, con o sin domicilio en el país**, que sean
prestadores de servicios turísticos, son contribuyentes de la Contribución Parafiscal. Y la ley
previó reglamentar la ejecución de sanciones administrativas **cuando el sancionado no tiene
domicilio en Colombia pero opera una plataforma de servicios turísticos prestados o disfrutados en
Colombia**. **Colombia es, de los tres, el que más explícitamente contempla al prestador extranjero.**
Fuentes consultadas 2026-09-24; no verifiqué el articulado concreto de la Ley 300/1996 ni de la
Ley 2068/2020.

**Salvedad general de LatAm**: esta sección es la más floja del informe. Verifiqué el artículo 1 de
la ley argentina y poco más. Los montos de garantía argentinos vigentes, el estatus del RNT mexicano
y el articulado colombiano quedaron sin confirmar.

---

## 5. Responsabilidad y seguros

### 5.1 Quién responde si algo sale mal

Depende de dónde esté el cliente, y la respuesta no es tranquilizadora:

- **En Israel**: responde quien contrató con el cliente. Si el operador le facturó al cliente, responde
  el operador. Si le facturaste vos, respondés vos, más el deber de información del art. 12ג.
- **En España/UE**: el art. 23.1 de la Directiva dice que declararse "intermediario" **no te exime**.
  Si hay viaje combinado dirigido a España, el art. 164.1 del TRLGDCU te obliga a garantía aunque seas
  minorista no establecido. Y por Roma I art. 6 y Bruselas I bis, el consumidor español puede
  demandarte **en sus propios tribunales aplicando derecho español**; una cláusula de ley israelí y
  jurisdicción Tel Aviv no lo desactiva, porque los derechos de la Directiva son irrenunciables
  (arts. 23.2 y 23.3).
- **En EE. UU.**: si estás registrado como seller of travel, las obligaciones de trust account y
  disclosure son tuyas.

**El punto incómodo**: aunque el operador cobre y facture, **el cliente ve la marca VisitIsrael**.
En jurisdicciones de consumo de la UE y EE. UU. eso puede alcanzarte igual. Y genera contracargos
por "no reconozco el cargo" cuando el comprobante viene de otra razón social — que el operador te va
a descontar.

### 5.2 Lo que el seguro E&O sí y no cubre

Esto es lo más importante de esta sección y suele entenderse mal.

| Escenario | ¿Lo cubre el E&O estándar? |
|---|---|
| Describiste mal el tour, reservaste mal la fecha, prometiste algo no incluido | **Sí.** Es el núcleo del E&O |
| El operador quebró, no prestó el servicio o no reembolsó, y el cliente te reclama a vos | **No por defecto.** Requiere endoso de *vendor insolvency / vendor default*, que "rarely [is] part of E&O policies by default" |
| El cliente se lastimó durante el tour | **No.** Eso es responsabilidad civil general, y debe cubrirlo el operador |

Fuente de las exclusiones: [guía de E&O de Mize](https://mize.tech/blog/a-complete-guide-to-errors-and-omissions-insurance-for-travel-agents/)
(consultada 2026-09-24), que cita expresamente "Supplier insolvency, unless added as an endorsement".

**Consecuencia de diseño**: el E&O **no es tu protección principal** contra el riesgo del white label.
Tu protección principal es contractual.

### 5.3 Costos

**En EE. UU.** (referencia, probablemente no accesible para una entidad israelí):
[Insureon](https://www.insureon.com/professional-services-business-insurance/travel-agents/cost)
(consultado 2026-09-24) publica una **mediana de US$38/mes = US$451/año** para límites de US$1M por
siniestro / US$1M agregado con deducible de US$500. Responsabilidad civil general: US$29/mes.
El rango de mercado que circula es US$500–2.500/año. Berkshire Hathaway Travel Protection y
HostAgencyReviews **no publican precios**; Hiscox devolvió **HTTP 403**.

**¿Aseguran a una entidad israelí?** **No verificado en ningún sentido.** El único programa con
lenguaje prometedor es [Aon Travel Professionals](https://www.aontravpro.com/Insurance-Program)
(consultado 2026-09-24), que ofrece "**worldwide protection** for qualifying travel agencies, tour
operators, meeting planners and independent contractors" con límites de hasta US$5M/US$5M. Pero
"worldwide protection" puede referirse al **ámbito de cobertura** y no al **domicilio del asegurado**:
la página no lo desambigua. Es una llamada gratis que conviene hacer (800-797-4514).

**En Israel** (ביטוח אחריות מקצועית):

- [Agudat Morei HaDerech, la asociación de guías](https://itga.org.il/professional-insurance/)
  (tarifas 2026, consultadas 2026-09-24), con Orly Insurance & Finance:
  RC Terceros 1.000.000 ₪ / RC Profesional 400.000 ₪ → **910 ₪/año**; 2.000.000/800.000 → **955 ₪/año**;
  3.500.000/800.000 → **1.590 ₪/año**; 4.000.000/1.200.000 → **1.980 ₪/año**. Y una opción para
  **empresas de guías** con facturación hasta 4.000.000 ₪: 2.000.000/800.000 → **12.000 ₪/año**.
- [Adifim, corredor](https://adifim.co.il/professional-liability-insurance-cost/) (consultado
  2026-09-24): precio base ~**3.500 ₪** para límite de 500.000 ₪, ~**6.500 ₪** para 1.000.000 ₪.
  Es un benchmark genérico de servicios, **no específico de turismo**.

**Lectura**: las opciones baratas de la asociación de guías (910–1.980 ₪/año ≈ US$300–660) son para
**guías individuales** — sirven para Mariluz, difícilmente para una empresa de marketing. La opción
de empresa (12.000 ₪ ≈ US$4.000) se comería el 80% del capital. El benchmark realista para una empresa
israelí de servicios es 3.500–6.500 ₪/año ≈ **US$1.150–2.150**.

### 5.4 Lo que sí hay que hacer, y cuesta cerca de cero

**Exigir figurar como *additional insured* en la póliza del operador**, no solo pedir un certificado.

La distinción es la que importa: "An additional insured has been added to the underlying insurance
policy **by endorsement**... A check mark on the certificate is not enough — the policy must include
the endorsement". Si el cliente se lastima y demanda a VisitIsrael porque es la marca que vio, sin el
endoso te defendés solo con tu patrimonio; con el endoso, **la aseguradora del operador asume tu
defensa y tu indemnización**.

Que sea estándar del sector está documentado (el [manual de gestión de riesgos de NTA/Berkely
Travel](https://ntaonline.com/wp-content/uploads/2016/09/Risk-Management-Booklet.pdf), consultado
2026-09-24, exige certificados de transportistas, chárteres, embarcaciones, outfitters y guías).
**Que el endoso sea gratis o casi, no lo pude verificar con ninguna fuente que publique precios.**
Pedilo por escrito al operador antes de asumirlo.

**Checklist contractual mínimo con el operador**, costo ≈ US$0:

1. Certificado de seguro vigente **más copia del endoso de additional insured**.
2. Cláusula de indemnidad del operador hacia VisitIsrael.
3. Obligación del operador de usar solo guías licenciados (art. 9ה).
4. Notificación obligatoria si cancela o no renueva la póliza.
5. Método de atribución de clientes definido por escrito (es la causa número uno de conflicto en
   estos acuerdos).

---

## 6. Cobros

### 6.1 Stripe no existe como opción

[stripe.com/global](https://stripe.com/global) (consultado 2026-09-24): Israel **no figura** en la
lista de países soportados, ni como disponible ni en preview. `stripe.com/il/pricing` devuelve **404**.
Los artículos sobre "cómo abrir Stripe en Israel" se refieren a constituir una entidad en un país
soportado (típicamente una LLC de EE. UU.), con su costo contable y su exposición fiscal. **Con
US$5.000 de capital, eso es desproporcionado.**

Dato lateral útil: la [lista de restricted businesses de Stripe](https://stripe.com/legal/restricted-businesses)
(consultada 2026-09-24) prohíbe aerolíneas comerciales y cruceros y clasifica **"travel reservation
services and clubs"** como restringido, sujeto a due diligence adicional. Define el estándar que el
resto del mercado sigue.

### 6.2 Comparación, cliente LatAm, tour de US$1.500

| Canal | Tarifa efectiva | Costo sobre US$1.500 | ¿Sirve? |
|---|---|---|---|
| **Payoneer** | hasta **3,99% + US$0,49** | ≈ US$60 | Sí. Acepta tarjetas de las tres regiones. Cuota anual US$29,95 solo si recibís menos de US$6.000 en 12 meses |
| **Grow (ex-Meshulam)** | 0,75% + **3,5% recargo tarjeta de turista** = **4,25%** (plan Light: 1% + 3,5% = 4,5%) | ≈ US$64 | Sí. Abono 59–69 ₪/mes (Light: 29 ₪/mes). Único israelí con tarifario público |
| **PayPal Israel** | 3,40% + 2,00% internacional + 2,5% FX = **≈7,9%** | ≈ US$119 | Sí, pero caro |
| Wise Business / transferencia | ~0,5% | ~US$8 | **No procesa tarjetas.** Inviable como checkout de consumidor |
| Stripe | — | — | **No opera en Israel** |

Fuentes: [Payoneer pricing](https://www.payoneer.com/pricing/),
[Grow tarifas](https://grow.business/fees/),
[PayPal Israel merchant fees](https://www.paypal.com/il/webapps/mpp/merchant-fees?locale.x=en_IL),
[Wise business receive](https://wise.com/us/pricing/business/receive) — todas consultadas 2026-09-24.

Detalle de PayPal: recargo internacional **+1,00%** para EE. UU., Canadá y Europa, **+2,00%** para el
resto (o sea LatAm), más 2,5% de conversión. Para EE. UU. y España el efectivo es ≈6,9%. Contracargo
30 ₪ (60 ₪ en alto volumen).

Detalle de Grow: el recargo de **3,5% por tarjeta de turista** se suma al 0,75%. Como el 100% de tus
clientes son extranjeros, tu tarifa real es 4,25–4,5%, más 0,5 ₪ de mínimo por transacción y 2,5 ₪ si
usás 3DS.

**Tranzila, Cardcom y PayPlus no publican precios.** Tranzila dice ofrecer "la comisión más baja de
Israel" sin dar cifra; la página de tarifario de Cardcom devuelve **404**. Circulan cifras de
PayPlus (~1,8% local, ~2,8% internacional, alta ~200 ₪, abono 50–60 ₪/mes) que **no pude confirmar en
ninguna fuente primaria: no las uses para decidir**. Una tabla comparativa de blog personal daba para
Grow cifras (1.500–2.000 ₪ de alta, 150–200 ₪/mes, 2,3–2,5%) que **contradicen frontalmente el
tarifario oficial de Grow**; prevalece el oficial.

### 6.3 El riesgo subestimado: la rolling reserve

Los paquetes de viaje están clasificados como rubro de mayor riesgo. Las reservas típicas que aplican
los procesadores van de **5% a 15% de las ventas brutas retenidas por 90 a 180 días**; específicas de
travel, de 0% a 10%. Fuentes secundarias agregadas (chargeback.io, chargebacks911, corefy,
secureglobalpay), consultadas 2026-09-24. **No verificado en fuente primaria de PayPal ni Payoneer.**

**Por qué importa**: si te aplican 10% a 180 días sobre tickets de US$1.500, veinte ventas te dejan
**US$3.000 inmovilizados medio año** — más del 60% de tu capital. Israel como destino, con su factor
de riesgo geopolítico, razonablemente empeora el perfil ante cualquier procesador (esto último es
inferencia, no dato de fuente).

**Preguntá la reserva antes de integrar, no después.** Y tené política de reembolso explícita,
visible y efectivamente cumplida, descripción precisa de cada tour y descriptor de tarjeta
reconocible.

### 6.4 Que cobre el operador y te liquide

**Ventajas reales:**

- Cero costo de alta de pasarela, cero abono, cero riesgo de rolling reserve, cero contracargos, cero
  PCI-DSS.
- No tenés dinero de clientes en tu poder → el art. 12א israelí no tiene objeto sobre vos, y en
  Washington no se dispara la fianza (carve-out de los 5 días hábiles).
- Para la liquidación mensual, Wise Business (US$31 de alta única, recepción doméstica gratuita en
  USD y EUR) es la herramienta correcta y barata.

**Ventaja que NO existe:** la fiscal. Como está en 3.5, la comisión a un operador israelí lleva IVA
18%, no cero. Facturarle al turista directo podría ser **mejor** fiscalmente, no peor.

**Ventaja que NO existe:** la regulatoria israelí. No estás evitando una licencia, porque no hay
licencia.

**Y no te saca de España.** El art. 164.1 §2 del TRLGDCU alcanza también al minorista no establecido.

**Riesgos:**

| Riesgo | Descripción |
|---|---|
| Dependencia | El operador controla cliente, cobro y dato. Puede cambiarte la comisión o prescindir de vos. No estás construyendo un activo, estás construyendo el suyo |
| Cobranza | Pasás de cobrar por adelantado del consumidor a ser acreedor comercial de **una sola empresa**. Con US$5.000 de capital, dos meses de mora te funden |
| Disonancia de marca | El cliente compra "VisitIsrael" y recibe comprobante de otra razón social. Aumenta los contracargos por "no reconozco el cargo" |
| Responsabilidad | No desaparece. Seguís siendo la marca que el cliente percibe como vendedora |
| Cero data de pago | Sin ser merchant no tenés datos de transacción para optimizar conversión ni LTV |

### 6.5 Obligación que te toca igual: cancelación a distancia

Si vendés online desde Israel, la **חוק הגנת הצרכן** te obliga: derecho de cancelación de **14 días**
desde el acuerdo, con un tope de **cancelación de 100 ₪ o 5% del precio, el menor de los dos**, y
reembolso dentro de los 14 días del aviso. Para servicios de hospedaje, vacaciones y turismo hay regla
específica: la cancelación debe hacerse al menos **7 días hábiles** antes de la fecha del servicio; la
Enmienda 58 (2019) limitó el derecho cuando los servicios se prestan **íntegramente fuera de Israel
por un proveedor de fuera de Israel** — **no es tu caso**, porque tus servicios se prestan en Israel.
Fuentes: [Kol Zchut](https://www.kolzchut.org.il/) (la página devolvió **403**, datos vía resumen de
búsqueda), [Emun HaTzibur](https://www.emun.org/cancellation-guide/cancellation-distant-sale/),
consultadas 2026-09-24. **Es dato de fuente secundaria: verificalo antes de escribir tus términos.**

---

## 7. Recomendación

### Qué montar ahora

**Dos oskim separados, sin sociedad. Modelo de afiliación y derivación, sin vender paquetes bajo la
marca VisitIsrael.**

| Ítem | Costo estimado |
|---|---|
| Sebastian: alta como **osek patur**, rubro **marketing/publicidad** (no "consultoría", no "הדרכה") | Alta gratuita; contador ~150–230 ₪/mes = **US$600–920/año** |
| Mariluz: sigue como está, con su licencia de guía vigente y su seguro de la asociación | **910–1.980 ₪/año** (~US$300–660) a su cargo |
| Contrato privado entre los dos (el de `propuesta-mariluz-numeros.md` §4) | US$0, o unos cientos si lo revisa un abogado |
| Contrato con el operador, con additional insured e indemnidad | US$0 más el tiempo de negociarlo |
| Cobros: nada. El operador cobra y liquida; Mariluz cobra sus tours | US$0 |
| Wise Business, para recibir liquidaciones | **US$31** de alta única |
| **Total año 1** | **~US$650–1.000**, más los seguros de Mariluz |

Sobran más de US$4.000 de los US$5.000, que es exactamente donde tienen que estar: en pauta y
producción de contenido, que es lo que mueve la aguja según tus propios números.

### Qué NO hace falta todavía

- **Ltd israelí.** 19.000–34.000 ₪/año de compliance (US$6.300–11.300) más doble imposición efectiva
  de ~46%. Supera el capital disponible por sí sola.
- **Licencia de agencia israelí.** No existe.
- **Garantía de insolvencia española.** 100.000 € mínimos. Solo se dispara si vendés viaje combinado
  dirigido a España.
- **Registro de seller of travel en EE. UU.** Solo si vendés. US$100 California, US$300 Florida,
  más fianza de US$25.000 en Florida.
- **E&O propio.** Mientras no seas el vendedor de registro y tengas el additional insured del
  operador, no aporta lo suficiente para justificar US$1.150–2.150/año sobre un capital de US$5.000.
- **Legajo EVT argentino.** El art. 1 de la Ley 18.829 es territorial.
- **Pasarela de pago.** Mientras cobre el operador.

### Cuál es el primer momento en que sí va a hacer falta

Hay cuatro disparadores. **El primero que se cumpla, cambia el régimen:**

1. **Combinás dos o más servicios y los vendés a precio global bajo la marca VisitIsrael.** Ahí sos
   organizador de viaje combinado. Si el comprador está en la UE, se dispara la garantía de
   insolvencia. **Este es el disparador más cercano y el más fácil de activar sin darse cuenta**:
   alcanza con publicar una página que diga "paquete de 8 días, US$X, incluye hotel, traslados y
   guía".
2. **Empezás a cobrarle vos al cliente.** Ahí se te aplican el art. 12א israelí (garantía del dinero
   de clientes), la trust account de California si vendés ahí, y la fianza de Washington si retenés
   fondos más de 5 días hábiles.
3. **Vendés de forma sostenida a residentes de California o Florida.** Ambos estados te alcanzan
   por texto expreso. El registro es barato; la fianza de Florida no.
4. **Facturación conjunta arriba de US$5.000/mes durante tres meses**, o el osek patur roza los
   122.833 ₪/año. Ahí se evalúa osek murshe, y recién más adelante una שותפות o una Ltd.

**El orden natural de escalada**: afiliación pura (hoy) → derivación con comisión facturada al
operador (cuando haya volumen) → venta propia con estructura, garantías y registros (cuando el
negocio lo pague).

### Las tres cosas para consultar con un profesional israelí

Cuando llegues al disparador 1 o 2, media hora con cada uno de estos resuelve lo que este informe no
puede:

1. **Abogado especializado en derecho turístico israelí**: ¿el modelo de marketing con asesoramiento
   al viajero cae en el inciso (5) de "שירותי סוכנות נסיעות" y activa el art. 12א? Es el punto donde
   no encontré ni dictamen ni jurisprudencia, y es el que define toda la exposición regulatoria.
2. **Contador israelí con experiencia en turismo**: cómo describir el rubro para no caer en las
   exclusiones del osek patur (תקנה 13 y 6א); y si conviene pedir un **pre-ruling** a רשות המסים sobre
   el tratamiento de la comisión y sobre el 30(א)(5) para servicios de marketing a clientes
   extranjeros vinculados a actividad en Israel.
3. **Corredor de seguros israelí**: cotización de ביטוח אחריות מקצועית para el rubro concreto, y
   revisión de la póliza del operador para confirmar que el endoso de *additional insured* está
   emitido y no es solo una tilde en un certificado.

Y una cuarta, si alguna vez apuntás en serio a España: **abogado español de derecho de consumo**,
para resolver ante qué comunidad autónoma constituiría la garantía una empresa no establecida. Es una
zona gris que ninguna fuente que consulté resuelve.

---

## 8. Qué cargó y qué no

### Fuentes oficiales que cargaron

- **nevo.co.il** — texto de la Ley de Servicios de Turismo, reglamento de guías, reglamento de
  información veraz, Ley de IVA.
- **he.wikisource.org** — textos consolidados de la ley de turismo, el reglamento de agencias de 2000
  y la Ley de IVA.
- **gov.il, solo los PDF de `/BlobFolder/`** — reglamento de guías de 1967, נוהל רישוי 2025, plan
  económico 2026.
- **tazkirim.gov.il** — memorando de derogación del IVA cero (leído con navegador; el fetch directo
  falló por certificado).
- **library.mevaker.gov.il** — informe del Contralor del Estado 1846.
- **boe.es** — PDF del DOUE de ambas directivas, RDL 23/2018, y texto consolidado del TRLGDCU vía la
  API de datos abiertos.
- **commission.europa.eu** — informe COM(2019) 270.
- **juntadeandalucia.es/boja** — Decreto 114/2023.
- **oag.ca.gov**, **leginfo.legislature.ca.gov**, **fdacs.gov**, **dol.wa.gov**, **cca.hawaii.gov**,
  **tcrcinfo.org**.
- **argentina.gob.ar** e **infoleg.gob.ar**.
- **stripe.com**, **paypal.com/il**, **payoneer.com**, **wise.com**, **grow.business**.

### Fuentes oficiales que NO cargaron

- **Todas las páginas HTML de gov.il: HTTP 403 sistemático.** Incluye el registro de guías, la página
  del Ministerio de Turismo, la página de IVA cero a turistas y las páginas de trámite y de tasas.
  Lo que hay de gov.il en este informe viene de sus PDF, que sí cargan.
- **EUR-Lex: contenido vacío** en seis intentos, en HTML y en PDF, para la Directiva 2015/2302 y para
  el informe COM(2021) 90. Todo el texto de las directivas viene del PDF del DOUE espejado en boe.es,
  que es auténtico pero es fuente-espejo.
- **data.gov.il: 403** en los datasets de guías y de tour-operator.
- **kolzchut.org.il: 403.**
- **ica.justice.gov.il (tasas de registro de empresas): ECONNRESET.** Las cifras de constitución y
  tasa anual son todas de estudios contables, no oficiales.
- **Enmienda 4 de 2002 en fs.knesset.gov.il**: el PDF existe pero es un escaneo sin capa de texto.
- **hiscox.com: 403.** **cardcom.solutions/מחירון: 404.**

### Fuentes que usé y descarto o marco como poco fiables

- **tourism-law.co.il** — acertó en la fecha de abolición de la licencia (1/1/2002), pero da montos de
  garantía (US$125.000 / 50.000 / 20.000) que contradicen el texto del reglamento en Wikisource
  (125.000 / 30.000 / 10.000). En cualquier caso son cifras derogadas.
- **vatcalc.com** — afirma que la exención de IVA a turistas se retiró con el presupuesto 2025.
  **Es incorrecto.**
- Una tabla comparativa de pasarelas israelíes de un blog personal contradice el tarifario oficial de
  Grow. Prevalece el oficial.

---

## 9. Preguntas abiertas

Las ordeno por cuánto cambian la decisión.

1. **¿El marketing con asesoramiento al viajero activa el art. 12א israelí?** No hay dictamen ni
   jurisprudencia. Es el punto que define si el modelo "solo marketing" es realmente limpio en Israel.
2. **¿Se dictaron alguna vez los reglamentos de הבטחת כספי לקוחות?** No los encontré, y el Contralor
   sugiere que no. Si existieran, cambiaría el análisis de arriba.
3. **¿El IVA cero a turistas sobrevive al plan económico 2027?** Lo intentaron en 2025 y en 2026.
4. **¿Un tour guiado a turistas tiene IVA cero?** No está en la lista oficial, pero el tazkir de
   derogación lo mencionaba entre los afectados. Zona gris.
5. **¿Aon u otro asegurador de E&O acepta un asegurado domiciliado en Israel?** Es una llamada.
6. **¿Cuánto cuesta realmente el endoso de additional insured?** Ninguna fuente publica precio.
   Pedirlo por escrito al operador.
7. **¿Qué rolling reserve aplicarían Payoneer o Grow a un vendedor de tours a Israel?** Hay que
   preguntarlo en el alta, antes de integrar.
8. **¿Ante qué comunidad autónoma constituiría la garantía una empresa no establecida en España?**
   Ninguna fuente lo resuelve.
9. **¿Cuáles son los montos vigentes del fondo de garantía EVT argentino?** Los de la ley son pesos
   de 1970.
10. **¿El RNT mexicano es obligatorio o voluntario?** Hay páginas gubernamentales que dicen las dos
    cosas.
11. **¿Los tramos de impuesto personal israelíes 2026 y las tasas de ביטוח לאומי para עצמאי?** No los
    pude verificar. Relevante para dimensionar el reparto con Mariluz, no para el marco legal.
12. **¿Qué obligaciones fiscales argentinas le quedan a Sebastian?** El informe asume residencia
    fiscal israelí exclusiva. Si hay algún vínculo remanente con ARCA, no está cubierto acá.
