# White label — vender tours con marca VisitIsrael sobre la licencia de un operador

**Fecha**: 2026-09-24. **Para**: Sebastian. **Método**: lectura directa de las páginas de cada
programa (curl con UA de Chrome cuando WebFetch dio 403, navegador para lo que es SPA), más
búsqueda web para lo que no está en la fuente primaria. **Toda cifra lleva fuente y fecha de
consulta. Lo que el operador no publica se dice "no publica" y no se estima.**

**Contexto de decisión** (confirmado por Sebastian el 2026-09-24): residente en Israel, capital
de hasta US$5.000, vende a LatAm hispano, España/UE y EE. UU./Canadá. Modelo elegido: **frente de
marca de una licencia ajena** — vender tours y paquetes con la marca VisitIsrael, operados por un
operador israelí ya licenciado. Mariluz es guía licenciada y seguiría guiando sus propios días.

**Lo que este documento no repite**: las comisiones de afiliados ya verificadas están en
`benchmarks.md` §2; los precios publicados de los operadores, en `peregrinacion-cristiana.md` §1;
el mapa competitivo, en `competidores.md`.

---

## 0. Las ocho cosas que cambian la decisión

1. **Casi ningún operador publica su comisión de agente.** Bein Harim dice "comisión generosa" y
   "tasa impresionante y rentable"; Tourist Israel dice "competitive commissions"; Sar-El ofrece
   "white label" sin número; Abraham Tours no publica ni la de afiliado. **En todo el relevamiento
   hay exactamente dos números publicados: el 15% de afiliado de Bein Harim y el 10% de agente de
   206 Tours.** Cualquier tabla que compare "afiliado vs. white label" con un número de agente
   israelí concreto está inventando ese número. Acá se usan escenarios etiquetados como supuestos,
   anclados a la banda de canal que sí tiene fuente (`benchmarks.md` §4: agentes 10–15%, concierges
   15–20%, OTAs 20–30%, mayoristas/DMC 25–30%).
2. **El 15% de afiliado de Bein Harim está en el techo de la banda de agente.** Si la banda de
   industria para un canal de demanda tipo agente es 10–15%, el programa de afiliados de Bein
   Harim ya paga el máximo de esa banda, sin contrato, sin cobrar, sin responsabilidad — y el único
   número de agente publicado en el nicho (206 Tours) es **10%, menor**. **La ventaja del white
   label no está en el porcentaje: está en el ticket, en el dueño del cliente y en poder poner
   precio propio.**
3. **El salto económico real no es de modelo, es de producto.** Una reserva de día a US$75 al 15%
   deja US$11,25. Un paquete cristiano de 8 días a US$1.629 al mismo 15% deja US$244,35. Es 22
   veces más por la misma venta y el mismo esfuerzo de contenido. Vender paquetes como afiliado
   rinde más que vender días como agente.
4. **Israel no exige licencia de agencia de viajes: fue derogada. Pero la ley de 1976 sí obliga a
   todo "prestador de servicios de agencia de viajes" a asegurar los fondos de sus clientes**, y su
   definición incluye textualmente "organización y venta de un tour a Israel". No hay fuente oficial
   que aclare si un revendedor sin licencia queda dentro. **La variable que decide es quién cobra**,
   y la pregunta es para un abogado israelí, antes de montar el cobro (§1.10).
5. **Hay un operador israelí que publica la palabra: Sar-El Tours.** "Our travel providers can
   access a 'white label' service for their clients", con sistema B2B en inglés, alemán, **español,
   portugués** e italiano, y cotización neta sobre itinerarios. No publica comisión, no pide
   licencia. Es el match literal del modelo que eligió Sebastian (§1.8).
6. **Marca propia con cobro propio también existe fuera de Israel, en dos lugares**: la **Merchant
   API de Viator** (el partner es merchant of record, atiende al cliente y Viator no le escribe
   nunca; exige calificación y **un depósito cuyo monto no se publica**) y el **Marketplace de
   Bókun** (el revendedor monta un motor de reservas en su propio sitio, cobra al cliente y el
   operador le factura). Todo lo demás —GetYourGuide agentes, Viator agentes, Civitatis agencias,
   el iFrame de Bein Harim— es reserva en el sitio del otro con tu link. Y **Civitatis agencias
   está cerrado sin licencia**: el alta exige tildar "Confirmo que soy una agencia de viajes
   legalmente registrada".
7. **El white label te pone del lado malo de todos los riesgos a la vez**: sos principal (tu marca,
   tu precio, tus condiciones), probablemente merchant of record (tus chargebacks y tus
   reembolsos), probablemente dentro de la definición israelí de prestador de servicios de agencia,
   y posiblemente sujeto a registro de *seller of travel* en California, Florida, Hawaii y
   Washington si le vendés a peregrinos de EE. UU. —esos regímenes son **extraterritoriales**—,
   todo eso **sin control operativo sobre el tour**. Y con precedentes documentados de proveedores
   que cambian la comisión con un mes de aviso en plena temporada (§6).
8. **La demanda que hace falta es chica para consultas y enorme para afiliación pura.** Con un
   1% de visita→consulta (supuesto conservador), 10 consultas por mes salen de 1.000 visitas.
   Con el modelo de afiliado puro del `benchmarks.md` §3 (3% de clic, 1,5% de conversión), 10
   reservas por mes necesitan ~22.000 visitas. Es la diferencia entre un negocio de consultas y un
   negocio de tráfico.

---

## 1. Los programas, uno por uno

Todo consultado el **2026-09-24**. "No publica" quiere decir que se leyó la página y no hay cifra.

### 1.1 Bein Harim — tres programas distintos, solo uno con número público

Fuente: `beinharimtours.com/partner-with-us/` y su versión en español
`beinharimtours.com/es/partner-with-us/`, ambas leídas el 2026-09-24.

La página se titula **"Become a Bein Harim Distribution Partner"** y dice textualmente: "We offer
3 options, including affiliates partnership through the ShareASale platform, a direct affiliation
program, and a program for Travel Agents."

| Programa | Comisión | Cookie | Pago | Alta |
|---|---|---|---|---|
| **Afiliado directo** | **15%** | **90 días** | "monthly payout with no hidden fees"; panel propio de partners | Formulario: `form.jotform.com/200213467931449` |
| **Afiliado ShareASale** | **15%** ("15% share on each booking") | **90 días** | "Auto deposit" vía ShareASale | Merchant ID **48735** |
| **Agente de viajes ("Be our agent")** | **No publica.** Textual: "Generous commission - We offer an impressive and profitable commission rate for all our tours" | No aplica | No publica | **No hay alta pública**: "To join our affiliate program or to our list of travel agents, please contact us". La versión ES publica el mail: `marketing@beinharim.co.il`; la EN, `marketing@beinharimtours.com` |

**Qué es cada cosa, que era la pregunta:**

- **Afiliado** = link de tracking. El cliente reserva en beinharimtours.com, Bein Harim cobra,
  Bein Harim atiende, vos cobrás 15% al mes siguiente. Cero riesgo, cero control, cero cliente.
- **Plataforma B2B** = lo que Bein Harim le da al agente: "Our B2B online platform - Manage your
  bookings and see real-time reports on your sales and commissions". Es un **back-office de
  reservas y comisiones**, no un motor de venta con tu marca. Vive en
  `agents.beinharimtours.com/login`, que es una SPA vacía sin sesión: no se pudo verificar qué hay
  adentro ni si tiene alta propia.
- **API** = "an API solution for online travel companies that desire a more integrated and
  user-friendly platform into their own website". Es la única frase de todo el relevamiento
  israelí que se acerca a marca propia, y es ambigua: "integrada en tu propio sitio" puede ser
  desde un checkout tuyo hasta un widget. **No hay documentación pública de la API** (`/api/`,
  `/b2b/`, `/travel-agents/`, `/white-label/` devuelven 404). Hay que preguntarlo.
- **iFrame** = "Allows you to implement our tours into your website, easily and quickly". Esto
  **no** es marca propia: es el sitio de ellos embebido en una página tuya.

**Requisitos**: la página **no menciona licencia de agencia, IATA, volumen mínimo ni ningún
requisito** para ninguno de los tres programas. Para el de agentes, el filtro es que te contesten
el mail.

**Idiomas**: la página de partners existe en EN, ES, DE y FR — el único operador israelí del
relevamiento que le habla al agente hispanohablante en su idioma.

### 1.2 Abraham Tours — solo afiliados, y sin número

Fuente: `abrahamtours.com/affiliate/`, leída el 2026-09-24. Probé además `/travel-agents/`,
`/agents/`, `/b2b/`, `/partners/` y `/groups/`: **los cinco devuelven 404**. No tienen canal de
agente publicado.

- Nombre real del programa: **"Abraham Tlalim Tours Digital Network" / "Digital Partners Program"**.
- **Comisión: no publica.** Ni en la página ni en el "Digital Partner Agreement" completo que está
  publicado ahí mismo. La palabra "commission" aparece cuatro veces y ninguna con un número.
- **Tecnología**: tracking y liquidación vía **TourCMS** (te crean usuario y contraseña ahí).
  Links de tracking por tour y **API para embeber tours en tu sitio**.
- **Pago**, textual del acuerdo:
  - Mínimo para cobrar: **1.500 ILS en Israel** (transferencia o PayPal); 1.000 ILS fuera de
    Israel por PayPal, 2.000 ILS para transferencia.
  - Frecuencia: **net 30** — "payouts will be conducted based on net 30 days".
  - Y el detalle que importa: **"Payouts will be made according to… confirmed departure date and
    not that of the booking date"**. O sea, una reserva de octubre para Pésaj 2027 se cobra en
    mayo de 2027.
- **Marca propia**: no se menciona. "white label" y "net rate" no aparecen en la página.

**Lectura**: para un residente en Israel, el mínimo de 1.500 ILS (~US$400 al cambio del día, no
verificado) antes del primer cobro, más net 30 desde la fecha de salida, convierte a Abraham en el
peor flujo de caja de los tres. Y sin comisión publicada no se puede ni comparar.

### 1.3 Tourist Israel — sí tiene B2B, no tiene afiliados, no publica nada

Fuente: `touristisrael.com/travel-agents/` y `touristisrael.com/agents/`, leídas el 2026-09-24
(WebFetch da 403; se leyó por curl con UA de Chrome).

Son dos páginas distintas y el link del footer confunde:

- **`/travel-agents/`** ("Israel Travel Agent") es institucional: **ellos** son el agente. "Tourist
  Israel is an Israel travel agent offering services to visitors to Israel from around the world.
  Since 2008, we have served over 500,000 visitors."
- **`/agents/`** ("Travel Agents (B2B)") es el programa. Textual: "We at Tourist Israel are pleased
  to work with travel agents from around the world… **we offer competitive commissions that
  acknowledge the value you bring**". **No publica el porcentaje.**

Lo que sí publica:
- Soporte 24/7 **en inglés, hebreo y español** — relevante para el canal LatAm.
- "Technology-focused approach, letting you be in control of your trip through our site" — o sea,
  reserva en el sitio de ellos.
- Servicios DMC completos: grupos entrantes, incentivos, conferencias.
- El formulario de `/israel-dmc/` pide **tipo de empresa** (Tour Operator / Travel Agency / DMC /
  Luxury Travel Advisor / Other) y **"estimated number of Israel requests per year"** (1 / 2-5 /
  6-10 / 11-50 / 50+). Es el único operador que filtra explícitamente por volumen esperado, aunque
  no lo publique como requisito.

**No tienen programa de afiliados**: `/affiliate/`, `/affiliates/` y `/partners/` dan 404. Ya
estaba en `competidores.md` §2.1 ("0 afiliados; venden directo"): se confirma.

**Marca propia**: no publica nada.

### 1.4 GetYourGuide — el programa de agentes existe y es mejor los primeros 60 días

| Programa | Comisión | Requisitos | Marca propia | Pago |
|---|---|---|---|---|
| **Partner Program (afiliados)** | **8% base** por reserva; cookie 30 días (`benchmarks.md` §2) | "No fees or commitments" | No. Deep links y widgets que llevan a GYG | Transferencia o PayPal, liquidación mensual; se gana cuando la actividad se realiza. Umbral mínimo: no verificado |
| **Travel Agent Program** | **hasta 16% los primeros 60 días, después 8% base** | Alta gratis: mail, contraseña, marcar "I am a Travel Agent", nombre de la organización, moneda, 2FA. **No pide licencia, CIF ni volumen mínimo.** Hay un artículo oficial titulado "Easy commission payouts: no IATA or CLIA needed" | No. Se reserva en un portal de GYG para agentes | Mensual; en cuentas de agencia "commissions go to the main agency's bank account" |
| **Partner API / canal OTA** | **No publica** | "create a partner account and gain access"; onboarding comercial | No documentado | No publica |

Fuentes: `partner.getyourguide.support/hc/en-us/articles/32733738291869-How-to-Become-a-Travel-Agent-Join-GetYourGuide-s-Partner-Network`
(leída 2026-09-24, verificada textualmente: "earn up to 16% commission on bookings for your first
60 days. After this introductory period, you continue to benefit from a solid 8% base commission");
`partner.getyourguide.support/hc/en-us/articles/13981068165917-Our-partner-program`;
`api.getyourguide.com`.

**Aclaración necesaria**: **"GetYourGuide for Business" no existe como página oficial.** Lo único
que hay es una nota de PhocusWire sobre una unidad B2B/SaaS interna. No lo uses como programa.

**Lectura**: el 16% de los primeros 60 días es un gancho de captación, no un modelo. En régimen, el
canal agente de GYG paga lo mismo que el de afiliado (8%) — la mitad que Bein Harim directo.

### 1.5 Viator — el único con white label documentado, y con depósito

| Programa | Comisión | Requisitos | Marca propia | Pago |
|---|---|---|---|---|
| **Affiliate Program** | 8% (promo 10% hasta 2026-01-31, `benchmarks.md` §2); cookie 30 días | Preaprobación; sitios en inglés | No | PayPal semanal sin mínimo |
| **Travel Agent Program** | **8% en todo producto Viator** | Las páginas oficiales **no publican requisito de acreditación**. La afirmación de que no hace falta IATA/CLIA circula en blogs, **no en Viator** | **No.** Hay que reservar en `travelagents.viator.com`: "In order to receive commission, you must book on travelagents.viator.com" | Banco **mensual** con umbral de **US$50**, o **PayPal semanal sin umbral**. Se paga después de realizada la actividad |
| **Affiliate API** | No publica | — | No: "Traffic is redirected to Viator to complete transaction" | — |
| **Merchant API** | **No publica** | "all applicants will be evaluated and qualified by Viator" + **depósito previo** ("The deposit amount will be based on your likely sales"; **monto no publicado**) | **Sí.** "you are the merchant of record, you own the customer and the entire customer experience"; "You'll manage customer support – we will never contact or market to your customers"; "Partner can markup or discount pricing" | El partner cobra al cliente |

Fuentes: `agentcenter.viator.com/join-today/`, `agentcenter.viator.com/resources/commission-and-payments/`,
`partnerresources.viator.com/travel-commerce/merchant/`, `docs.viator.com/partner-api/`, leídas 2026-09-24.

**Lectura**: la Merchant API es, en el papel, exactamente el modelo que Sebastian eligió —
inventario de 300.000 productos, precio propio, cobro propio, cliente propio, marca propia. El
problema es el depósito sin monto publicado y la calificación previa: con US$5.000 de capital total
no se puede planificar contra un número que no existe. **Es la pregunta a hacer, no el plan.**

### 1.6 Civitatis — 10% a agencias, pero pide licencia

| | Agencias | Afiliados |
|---|---|---|
| Comisión | **10% sobre el PVP**, "se descontará en el mismo momento de hacer el pago de la reserva"; free tours **1 € por asistente mayor de 12 años** | **8–10% "en función del importe de ventas mensual"**; free tours 1 € |
| Tarifa neta | **"No existen tarifas netas especiales para agentes de viajes"** — el descuento es la comisión | No aplica |
| Cómo se paga | Al Wallet de la agencia, **el día 15 del mes siguiente a la realización de la actividad**. Opción "pago neto" (pagás con descuento) o "PVP" (pagás completo y cobrás después). Hay "pago aplazado" en productos reembolsables: se cobra 10 días antes de la actividad | Transferencia o PayPal, el mes posterior a la realización. Cookie 30 días |
| Requisitos | **"Confirmo que soy una agencia de viajes legalmente registrada"**. Validan la información antes de activar. Volumen mínimo: no publica | "Debes contar con una página web o blog que trate de viajes"; el sitio debe estar activo |
| Marca propia | No publica | No publica |

Fuentes: `civitatis.com/es/agencias` y `civitatis.com/es/afiliados` (leídas 2026-09-24);
`civitatis.zendesk.com/hc/es/articles/30742228339741` y `/36162068921885` (centro de ayuda B2B).

**Trampa operativa publicada por ellos**: "Si reservas sin estar identificado, Civitatis no puede
garantizar la aplicación del descuento ni abonar la comisión correspondiente."

**Lectura**: el canal agencias de Civitatis es mejor que el de afiliados (10% fijo contra 8–10% por
volumen, y cobrás el descuento en el acto en vez de esperar al mes siguiente de la realización),
pero **hoy está cerrado**: hace falta una agencia legalmente registrada. Es la razón número uno para
mirar seriamente si conviene registrar una sociedad en Israel, y la respuesta a esa pregunta no está
en este documento (ver §7, lo no verificado).

### 1.7 Bókun (Tripadvisor) — el mecanismo técnico del white label, sin comisión publicada

Fuentes: `bokun.io/marketplace`, `bokun.io/pricing`, `docs.bokun.io/en/articles/177` y
`docs.bokun.io/docs/marketplace-pro/marketplace/...` (ambos "Last updated on June 11, 2026"), leídas 2026-09-24.

**Bókun no publica ningún porcentaje de comisión de marketplace. Ninguno.** Lo que publica es el
mecanismo: el proveedor manda una propuesta de contrato donde lista qué productos, a qué precios y
**"the commission they'll receive for selling your products"**. Se puede fijar comisión distinta por
producto y por categoría de ticket. Cualquier "20–30% típico" que circule viene de blogs, no de Bókun.

Lo relevante para este modelo, textual:
- **Marca propia**: "The reseller can then book your products through their Bókun account or **set
  up an online booking engine on their website with your products**."
- **Cobro**: "The reseller is then responsible for charging the customer and the supplier needs to
  invoice him"; "the reseller invoices are created outside Bókun and funds are transferred outside
  Bókun". **Vos cobrás, el operador te factura, la plata no pasa por Bókun.**
- **Requisitos**: "Only suppliers can create contract terms… resellers can go directly to the
  marketplace and request suppliers to send them their contract terms." **No pide licencia ni
  acreditación.** La barrera es comercial: cada operador te acepta uno por uno.
- **Costo de la plataforma** (esto sí tiene número): FREE US$0/mes **sin acceso al Marketplace**;
  START **US$49/mes + 1,5%** por reserva; PLUS US$149/mes + 1,25%; PREMIUM US$499/mes + 1%. "0%
  Bókun fees on Viator and offline bookings". La tarifa de Bókun es **adicional** a la comisión que
  se pacte con el operador, no la reemplaza.
- Aclaración que publica Bókun: los contratos del Marketplace **no** son el camino para conectarse
  a Viator, GetYourGuide o Expedia Local Expert — esas son integraciones OTA aparte.

### 1.8 Los otros operadores: uno publica "white label" y dos ya no existen

**Sar-El Tours — el único operador israelí que usa la palabra.** `sarel.group/sarel-online`, leído
el 2026-09-24, textual:

> "We have launched a new **B2B online service** for our travel providers around the world. This
> service is available in several languages including **English, German, Spanish, Portuguese and
> Italian**." … "Our travel providers can access a **'white label' service** for their clients.
> This new project provides all necessary services for groups and FITs to Israel, including
> tailor-made tours, hotels, car rentals, daily tours, etc. **If you are a Travel Agent, please
> contact us about our online service.**"

Operan desde 1993, subsidiaria Conexion Travel, y declaran cuentas como Emirates Holidays y Dnata
Travel Group. En su marca cristiana `sareltours.com/about`: "31 years of experience, more than
1,000,000 satisfied guests", flota propia de buses, y —textual— "We work closely with the Israeli
Ministry of Tourism, the Israeli Union of Hotels". Su invitación a agentes es explícita: "If you
are an **up and coming agency**, we'd love to talk about how we can help bring our 30+ years of
experience … into your service", y para agencias establecidas, "we'd be happy to **quote you on
your itineraries**" — o sea, **modelo de cotización neta**.

**No publican comisión ni tarifa neta, y no piden licencia ni IATA en la página.**

*Un matiz que hay que decir*: `sareltours.com` está posicionada explícitamente como evangélica
("rooted in biblical truths", "local Israeli believers guiding you", "shared Biblical values").
El brazo corporativo `sarel.group` es neutro. Para un sitio con la postura editorial de
`CLAUDE.md`, el partner es Sar-El como operador, no su discurso.

**Otros con canal B2B y sin número publicado**: **Amiel Tours** (`amiel.com`, link a "B2B Online
Booking System" y newsletter de agentes) y **Dekel Tours** (`dekeltours.com/about/agent-to-agent/`,
"Fully commissionable and easy to book… we're happy to have you connect us with your clients so we
can handle all the planning and adjusting (and pay your commission)"). Ninguno publica porcentaje
ni requisitos.

**Dos que ya no están**: `eggedtours.com` **ya no existe** (redirige a `eggedplus.co.il` y devuelve
"la página que buscabas no se encontró"), y **United Tours** (`unitedtours.co.il`) hoy es una
empresa de alquiler de buses y traslados escolares, no un operador receptivo con canal de agentes.
**Keshet Educational Journeys** no publica nada para agentes. **Gil Travel** y **Ayelet Tours** no
se pudieron leer (protección anti-bot y un PDF que no se pudo extraer): **ausencia no verificada**.

### 1.9 Peregrinación: 206 Tours publica 10% y es el único

| Operador | Programa | Comisión | Requisitos |
|---|---|---|---|
| **206 Tours** | Programa de agentes | **"Earn 10% Commission on each Fully Paid Client"**, con la nota "Qualifying Tours: Series Only (Tours 1–408)". Para grupos privados: mínimo 20 peregrinos pagos y **"Email groups@206tours.com with the desired number of free trips and/or commission"** — negociado, no publicado | **No pide IATA, ARC, CLIA ni licencia.** Solo registrarse. Dan cuenta de seguimiento, web propia con su tour, flyer PDF y account manager |
| **Pilgrim Tours** | "Travel Agency Policy" | **No publica el porcentaje.** Excluye cruceros, tours domésticos de EE. UU., Islandia y Costa Rica. No combinable con early booking, descuentos de grupo chico ni tarifas de clero | Ser "a valid travel agency", no hacer rebating, aprobación por solicitud. **No menciona IATA/ARC/CLIA.** Líder de grupo: mínimo recomendado 10 pasajeros, depósito de grupo US$500 |
| **EO / Educational Opportunities** | Host / group leader | **No publica el ratio.** Lo único cuantificado es la beca de clero: **US$300–500** en Holy Land y cruceros, cónyuge US$150–350 | Remite a llamar |
| **Franciscan Pilgrimage Programs** | — | **No se encontró ningún programa publicado.** Varias páginas dan 403 | — |
| **Franciscan Foundation for the Holy Land** (entidad distinta) | Líder de grupo | **"For every 20 paid pilgrims, one religious leader … can earn a free passage"**, excluyendo almuerzo, souvenirs, seguro e incidentales | — |

*206 Tours bloquea bots; la página de agentes se leyó en la copia archivada del **2026-09-16**, así
que el 10% podría haber cambiado.*

**Dos cosas que importan de esta tabla.** La primera: el "1 viaje gratis cada N pasajeros" **es
práctica de industria reconocida** —EO lo dice textual: "it is standard practice for the group
leader … to receive complimentary travel after a minimum number of paying passengers is reached"—
pero **ninguno de los tres grandes publica su ratio**. La segunda, dicha por un operador del
propio rubro (`pilgrimtours.com/do-donot.html`): *"Do not get caught in the 'Travel For Free'
advertisements. All companies allow for similar group leaders benefits, but it should not be the
primary motive for choosing a tour operator."* El beneficio de líder de grupo es commodity.

**Y una cláusula de atribución para copiar** (Pilgrim Tours): *"Commissions are not available for
referrals quoted first by a Pilgrim Agent"* — si el cliente ya habló con el operador, el agente no
cobra. Es exactamente el conflicto que hay que resolver por escrito antes de empezar.

### 1.10 Lo que exige Israel: no hay licencia de agencia, pero sí una obligación

**Hallazgo que cambia el marco: en Israel ya no existe licencia de agencia de viajes. Fue
derogada.** Evidencia, consultada el 2026-09-24:

- Un artículo de la prensa de industria israelí (IAS, 2018-01-28) describe la reforma como
  "ביטול הצורך ברישיון לעיסוק כסוכן נסיעות" — la cancelación de la necesidad de licencia para
  ejercer como agente de viajes.
- En el listado de servicios del **Ministerio de Turismo** (`gov.il`) **no figura ningún servicio
  de licencia o renovación para agencias de viajes**. Sí figuran, y con página propia, los de
  **licencia de מורה דרך (guía)**: renovación e impresión.
- En el texto de la **חוק שירותי תיירות, תשל"ו-1976** (`nevo.co.il/law_html/law00/5115.htm`),
  varias secciones de licenciamiento figuran como "(בוטל)" (derogadas) y varios incisos del art. 2
  como "(נמחקה)".

**Pero hay una obligación que sí sigue vigente y que probablemente alcanza al modelo.** El capítulo
ב'1 (arts. 12א–12ה), introducido por la enmienda 4 de 2002, obliga a todo **"נותן שירותי סוכנות
נסיעות"** (prestador de servicios de agencia de viajes) a **asegurar los fondos de los clientes**
contra su propia insolvencia —por afiliación a un fondo de garantía aprobado o por póliza de
seguro— más obligaciones de divulgación y de reporte al Ministerio. Y la definición legal de
"servicios de agencia de viajes" incluye textualmente **"ארגון ומכירה של סיור לישראל"**:
*organización y venta de un tour a Israel*.

**Traducido**: la licencia no existe, pero **vender un tour a Israel cae dentro de la definición**.
Lo que no hay es una resolución, guía o FAQ del Ministerio que diga si un afiliado o revendedor sin
licencia queda dentro o fuera. **Esa fuente no se encontró y probablemente no existe públicamente.**

La lectura razonable —y se marca como razonamiento, no como fuente— es que **la variable decisiva
es quién cobra**. Si el operador licenciado es el merchant of record (cobra, factura y contrata con
el pasajero) y vos sos referidor, es difícil sostener que estás prestando servicios de agencia. Si
cobrás vos, facturás vos y el cliente contrata con vos bajo tu marca —que es exactamente el white
label— **entrás de lleno en la definición**, con la obligación de asegurar fondos de clientes.
**Es la pregunta para un abogado israelí, y hay que hacerla antes de montar el cobro, no después.**

Dos datos de contexto: los montos de עיצום כספי (sanción administrativa) **no se pudieron
verificar** —tres extracciones del mismo cuerpo legal dieron tres cifras distintas—, y **ITTAA**,
la asociación que administraba el fondo de garantía sectorial, publicó el **2026-04-14** que su
asamblea discutió la **disolución del fondo**. Si el fondo se liquida, la vía práctica de
cumplimiento pasa a ser la póliza de seguro.

Aparte, y esto no es israelí: **cuatro estados de EE. UU. exigen registro de "seller of travel" y
la exigencia es extraterritorial** — "apply to any agency that does business with residents of
those states". Tasas anuales publicadas: **California US$100** por local con cuenta fiduciaria
obligatoria; **Florida US$300** con fianza de US$25.000; **Hawaii US$215/146** con cuenta bancaria
local; **Washington US$222** con fiducia o fianza (Host Agency Reviews, 2025-01-03). **El mercado
de peregrinación que identificó `peregrinacion-cristiana.md` es justamente EE. UU. y Canadá.**

---

## 2. Afiliado contra white label, con números reales

**Los precios son de Bein Harim y están verificados en la página de producto el 2026-09-24**
(los tres días sueltos y los paquetes se releyeron hoy; el "8 días lujo US$2.819" viene de la
lectura del 2026-09-23 en `peregrinacion-cristiana.md` §1.2 y no se reverificó hoy).

Precios leídos hoy, con la aclaración de que Bein Harim cobra distinto según el punto de salida:
Jerusalem Highlights **US$75**; Jerusalén + Belén **US$106** desde Jerusalén (US$121 desde Tel Aviv,
US$141 desde Herzliya); Masada y Mar Muerto **US$115** desde Jerusalén (US$125 Tel Aviv, US$145
Herzliya); Nazaret y Galilea US$98; Cesarea/Acre/Rosh Hanikra US$95. Paquetes: **46 productos**,
de **US$829** ("Israel 4 Day Tour Package") y **US$849** ("Biblical Christian Tour of Israel, 4
Days") hasta **US$2.499** ("Christian Israel and Petra, 12 Days"). El cristiano de 8 días,
**US$1.629**.

### 2.1 Cuánto deja cada venta

Los tres escenarios: **15% es el único dato publicado** (afiliado Bein Harim). **20% y 25% son
supuestos etiquetados**, anclados a la banda de canal de `benchmarks.md` §4 (agentes 10–15%,
OTAs 20–30%, mayoristas/DMC 25–30%). Nadie prometió esos números.

| Producto | Precio | Afiliado 15% (publicado) | Agente 20% (supuesto) | Mayorista 25% (supuesto) |
|---|---:|---:|---:|---:|
| Jerusalem Highlights, 1 día | US$75 | **US$11,25** | US$15,00 | US$18,75 |
| Jerusalén + Belén, 1 día | US$106 | **US$15,90** | US$21,20 | US$26,50 |
| Masada y Mar Muerto, 1 día | US$115 | **US$17,25** | US$23,00 | US$28,75 |
| Biblical Christian, 4 días | US$849 | **US$127,35** | US$169,80 | US$212,25 |
| Christian Holy Land, 8 días | US$1.629 | **US$244,35** | US$325,80 | US$407,25 |
| Christian 8 días, lujo | US$2.819 | **US$422,85** | US$563,80 | US$704,75 |

**La línea de Mariluz**, según lo ya acordado en `propuesta-mariluz-numeros.md` §3:

| Caso | Venta | Se queda el sitio | Por día |
|---|---:|---|---:|
| Tour privado de Mariluz, cliente orgánico | US$450 | comisión de canal 15% | **US$67,50** |
| Tour privado de Mariluz, cliente orgánico | US$500 | comisión de canal 15% | **US$75,00** |
| Tour privado de Mariluz, cliente de pauta | US$450 | comisión de canal 20% | **US$90,00** |
| Tour privado de Mariluz, cliente de pauta | US$500 | comisión de canal 20% | **US$100,00** |
| Tour de otro guía de su red | US$450 | margen 25% repartido 50/50 = 12,5% | **US$56,25** |
| Tour de otro guía de su red | US$500 | margen 25% repartido 50/50 = 12,5% | **US$62,50** |

**Un día de Mariluz a US$450 con 15% deja US$67,50: seis reservas de día suelto de Bein Harim como
afiliado.** Esa comparación ya estaba en `benchmarks.md` §3 contra GetYourGuide (50 reservas); contra
Bein Harim al 15% es menos brutal, pero sigue siendo 6 a 1.

### 2.2 Cuántas ventas por mes para llegar a la meta

| Producto | Modelo | US$500/mes | US$2.000/mes | US$5.000/mes |
|---|---|---:|---:|---:|
| Día US$75 | afiliado 15% | 45 | 178 | 445 |
| Día US$75 | agente 20% (supuesto) | 34 | 134 | 334 |
| Día US$106 | afiliado 15% | 32 | 126 | 315 |
| Día US$106 | agente 20% (supuesto) | 24 | 95 | 236 |
| Día US$115 | afiliado 15% | 29 | 116 | 290 |
| Día US$115 | agente 20% (supuesto) | 22 | 87 | 218 |
| Paquete 4 días US$849 | afiliado 15% | **4** | 16 | 40 |
| Paquete 4 días US$849 | agente 20% (supuesto) | 3 | 12 | 30 |
| Paquete 8 días US$1.629 | afiliado 15% | **3** | **9** | 21 |
| Paquete 8 días US$1.629 | agente 20% (supuesto) | 2 | 7 | 16 |
| Paquete 8 días lujo US$2.819 | afiliado 15% | **2** | **5** | **12** |
| Mariluz US$450, 15% | comisión de canal | 8 días | 30 días | 75 días |
| Mariluz US$500, 20% pauta | comisión de canal | 5 días | 20 días | 50 días |
| Red de guías, venta US$450, 12,5% | margen repartido | 9 días | 36 días | 89 días |

(Todas las cantidades redondeadas hacia arriba: son ventas enteras.)

### 2.3 Qué dice esta tabla en una línea

**Pasar de afiliado a white label sobre el mismo producto sube el ingreso por venta un 33% si se
consigue 20% en vez de 15% — pasar del día suelto al paquete lo sube 22 veces.** El primer
movimiento es de producto, no de modelo. Y el white label solo compensa su costo (contrato, cobro,
responsabilidad, software) cuando se vende paquete, no cuando se venden días a US$11 de comisión.

Los US$5.000 de capital, leídos contra esta tabla: el objetivo realista del primer año no es
"US$5.000 por mes", es **cerrar 2 a 5 paquetes por mes**. Con 5 paquetes de 8 días al 15% son
US$1.220/mes; con 5 al 20% supuesto, US$1.630. Eso, más 10 días de Mariluz, es el escenario
"moderado" de `propuesta-mariluz-numeros.md` y sigue siendo inversión neta durante 12 meses.

---

## 3. Cuánta demanda hace falta

### 3.1 Las tasas que sí están publicadas

| Métrica | Valor | Fuente | Fiabilidad |
|---|---|---|---|
| Conversión media de sitios de **viajes** (visita → lead o venta) | **1,9%** | Ruler Analytics, informe publicado 2026-05-26 (`ruleranalytics.com/blog/insight/conversion-rate-by-industry/`) | **Alta**: 110M+ sesiones, 5M+ conversiones, 13 industrias. **Pero mezcla lead y venta, y son sesiones de anunciantes con campañas trackeadas, no tráfico orgánico de blog** |
| Viajes, por canal | AI Referral 2,8% · Paid Search 2,2% · Directo 1,8% · **Orgánico 1,8%** · Social pago 1,7% · Referral 1,5% · Social orgánico 1,18% · Email 0,6% | ídem | Alta, misma muestra |
| Viajes: dónde entra la conversión | **71,6% formulario / 28,4% llamada** | ídem | Alta |
| Mediana de conversión de **landing pages** de Travel & Hospitality | **4,8%** | Unbounce Conversion Benchmark Report (datos jul-2023 a jul-2024), `unbounce.com/conversion-benchmark-report/travel-hospitality-conversion-rate/` | Alta **para landings dedicadas, no para un sitio de contenido**: 464M visitantes, 41.000+ landings |
| Conversión de T&H, variación interanual | **−6,8%** (móvil −4,1%, desktop −8,0%) | Contentsquare, Q4 2024 → Q4 2025 (`contentsquare.com/guides/travel-hospitality-digital-experience/conversions/`) | Alta (99 mil millones de sesiones) pero **es una variación, no un nivel** |
| Ingreso por visita en T&H | **US$9,42** en Q4 | ídem | Alta |
| Lead → cierre en la llamada (cruceros y hoteles) | **41%** de los leads telefónicos cierran | Invoca Travel Lead Conversion Benchmarks Report, jul-2026 | Media-alta: no publica el tamaño del segmento viajes |
| Visita → **clic en link de afiliado** | "sano desde **3%**", "**6% y más** en el top 25% de los partners de GetYourGuide" | Travelpayouts citando a GYG, artículo del 2022-10-31 | **Baja-media**: sin metodología, tiene 4 años, y **las páginas originales de GYG dan 403 o redirigen**: no se pudo verificar en fuente primaria |
| Clic de afiliado → reserva en tours | **No hay dato publicado citable** | — | Ni GYG ni Viator lo publican. Lo que circula (0,5–1% de Travelpayouts sin fuente; "39,5%" de una ficha comercial de Viator sin definición) no sirve |
| Comisión media por reserva de GYG | **~8 €** (mínima 0,70 €, máxima ~58 €) | petraontheway.com, actualizado 2026-08-20 | Alta como dato real de un blog; **esa autora no publica su CTR ni su conversión** |

### 3.2 Visitas necesarias para 10, 30 y 100 consultas por mes

Una "consulta de tour" acá es un formulario o un WhatsApp, no una reserva. **Solo la fila del 1,9%
tiene fuente; las otras tres son supuestos explícitos** para cubrir el hecho de que un sitio de
contenido convierte peor que la media de anunciantes de viajes que mide Ruler.

| Tasa visita → consulta | 10 consultas/mes | 30 consultas/mes | 100 consultas/mes |
|---|---:|---:|---:|
| **1,9%** (Ruler Analytics, viajes, 2026) | 526 | 1.579 | 5.263 |
| 1,0% (supuesto) | 1.000 | 3.000 | 10.000 |
| 0,5% (supuesto) | 2.000 | 6.000 | 20.000 |
| 0,3% (supuesto, piso) | 3.333 | 10.000 | 33.333 |

**Contra el modelo de afiliado puro** de `benchmarks.md` §3 (3% de las visitas hacen clic, 1,5% de
esos clics reservan): **10 reservas por mes necesitan ~22.000 visitas; 30 reservas, ~67.000; 100
reservas, ~222.000.**

### 3.3 Cruce con lo que ya sabemos

- `benchmarks.md` §1 y `competidores.md` §3: **Bachelor of Travel hizo US$38,56 en agosto de 2025
  con ~4.000 sesiones y 120 posts.** Con la tabla de arriba, esas mismas 4.000 sesiones darían
  **entre 12 y 76 consultas por mes** si el sitio pidiera consultas en vez de mandar clics a un
  afiliado. A 15% sobre un paquete de US$1.629, **una sola consulta cerrada vale US$244**: seis
  años de lo que Bachelor of Travel hizo ese mes.
- **Ese es el argumento completo del modelo.** El mismo tráfico rinde dos órdenes de magnitud más
  si el pedido es "contanos qué querés hacer" en vez de "reservá en GetYourGuide".
- Los competidores de Israel están entre 8K y 105K visitas/mes (`competidores.md` §1): Tourist
  Israel ~105K, funinjerusalem ~26K, Bein Harim 14–42K según cómo se lea SimilarWeb, Abraham ~8K.
  **Con 8.000 visitas al mes —el piso de esa banda— y 1% de conversión a consulta, son 80 consultas
  por mes.** No hace falta ser Tourist Israel.
- La contra, que también está en los datos: el tráfico de Israel cayó 10–29% en agosto 2026, el
  receptivo 2026 va −13,6% (`benchmarks.md` §5), y la industria pone la recuperación en Pésaj 2027.
  Las consultas de 2026 son de un mercado a un tercio de 2019.

**Lo que no se puede decir con estos datos**: cuántas de esas consultas cierran. El único dato de
cierre es el 41% de Invoca, y es de llamadas telefónicas de cruceros y hoteles en EE. UU. No es
nuestro canal ni nuestro producto. **Cualquier proyección de "consultas × tasa de cierre" es un
supuesto, no un pronóstico.**

---

## 4. Casos reales del modelo

Cuatro sitios de contenido que pasaron a vender producto con su marca. Todo consultado el
**2026-09-24**. **Ninguno de los cuatro publica facturación.**

### 4.1 Israel com a Aline — el caso más parecido al nuestro

**Corrección al brief**: no es "Israel con Aline" en español, es **`israelcomaline.com.br`**, en
portugués brasileño. Tiene tres canales de YouTube por idioma: `@israelcomaline` (PT),
`@IsraelconAline` (ES), `@IsraelwithAline` (EN).

**Quién es**, textual de `/quem-somos/`: "moro em Israel há 16 anos", "guia licenciada pelo
Ministério do Turismo", "criadora do canal 'Israel com a Aline' no Youtube com mais de 2.7 milhões
de inscritos". Guió a Ana Hickmann, Rodrigo Faro, Pedro Bial, Carlos Vives.
*(Los 2,7 M son autodeclarados; un perfil más viejo decía 250 mil y hay un directo "celebrando
400k". Con tres canales, la cifra podría ser agregada. No verificado.)*

**El dato que importa**, textual en cada página de viaje: **"Viagem realizada em parceria com
Eretz Tur"**. Eretz Tur Viagens e Turismo Ltda., CNPJ 04.761.481/0001-09, São Paulo, fundada en
2001, CNAE de agencia de viajes y operador turístico. **El sitio de Aline no muestra CNPJ ni
CADASTUR propio. Ella pone marca, audiencia y guía; Eretz Tur pone la licencia y la operación.**
Hasta el kit de bienvenida dice Eretz Tur.

**Es exactamente el modelo "frente de marca de una licencia ajena", funcionando y vendido.**

Precios publicados hoy:

| Viaje | Fechas | Doble | Single |
|---|---|---:|---:|
| Caravana Israel com Aline | 25 may – 4 jun | **US$4.797** / R$24.465 | US$5.875 |
| Caravana Dubai e Israel | 6–15 feb 2026 | **US$2.194** / R$12.199 | US$2.918 |
| Caravana Israel com Aline | 30 ago – 9 sep 2026 | **Agotado** | — |
| Caravana Rodrigo Silva e Aline | 11–22 oct 2026 | **Agotado** | — |

Pago "entrada + 10× sin interés"; cotiza en USD y convierte a reales al cambio del día. Incluye
guía (ella + Ilya Kamha), hoteles con media pensión, ETA-IL, bus, entradas, propinas de guía y
chofer, seguro y radios. **No incluye aéreo.**

**Cronología**: guía licenciada hace ~16–17 años; canal de YouTube arrancado en la pandemia
(~2020); la caravana más vieja listada es de diciembre 2023. **Audiencia primero, producto después:
unos 3 años.** No publica la fecha de la primera caravana ni ingresos; el único indicio de volumen
es que dos de cuatro salidas figuran agotadas y lleva ~6 caravanas en paralelo.

**Y cómo escala**: co-branding con otros creadores que traen su propia audiencia —Rodrigo Silva
(apologista), los pastores Elan y Simone Tebas, "Jorge". Ella pone operación y marca; el partner
pone la gente. Es lo mismo que `benchmarks.md` §6 describía para Sergio & Rhoda y TrovaTrip, pero
hecho sin plataforma intermediaria.

### 4.2 Tourist Israel — once años de contenido antes de operar

**Corrección al brief**: el fundador **no es Joe Yudin** (ese fundó *Touring Israel*, otra empresa).
Es **Ben Julius**.

Cronología, con cita textual de la entrevista de Jason Malki publicada el 2019-10-14
(`medium.com/strtupboost/fantastic-work-culture-with-ben-julius-ceo-of-tourist-israel-...`):

- **Jul 2008 — contenido puro**: "In 2008, I originally started Tourist Israel as a content
  platform as I saw a lack of information for people wanting to visit Israel."
- **2008–2018 (~10 años) — revendiendo operadores de terceros**: "Tourist Israel worked closely
  with a selection of hand-picked operators in Israel, Jordan, and Egypt."
- **Mar 2018 — licencian la plataforma y la marca** para lanzar Tourist Japan: "we have licensed
  our content platform and brand allowing us to support the launch of Tourist Japan… More sites
  are on the way."
- **Oct 2019 — anuncian operadora propia**: "we are now in the process of developing our own
  operation company. Our goal is to be able to manage the content, quality of product and overall
  experience that we sell." En esa fecha eran **20 personas**.
- **2020–2023** — réplica de marca: Tourist Journey, Tourist Italy, Tourist Korea, Tourist Jordan.
  *(Fechas de LinkedIn, que bloquea el fetch: no verificadas en fuente primaria. Los nombres sí
  están en mondarine.com.)*
- **Hoy** (T&C revisados marzo 2026): "The Booked Services are operated and provided by either a
  local third party tourism operator and/or by **TI Tours Ltd** (the 'Operator'), **our
  subsidiary**." La entidad es Dynamic Square Ltd.; los pagos los procesa Tint Tourism Technology
  Ltd., Nicosia, Chipre.

**Tardaron ~11 años de contenido a operación propia declarada, y siguen operando el híbrido.**

Volumen, todo autodeclarado y con una contradicción interna: la home dice "OVER 150,000 PEOPLE
VISIT ISRAEL WITH US EVERY YEAR" y "a team of 150 local experts"; `/about/` dice "650,000 Happy
Guests since 2008"; `/travel-agents/` dice "over 500,000 visitors". **Además, el string de 650.000
aparece idéntico en touristjapan.com: es boilerplate del grupo Mondarine, no una cifra de Tourist
Israel.** LinkedIn declara "51-200 employees" y muestra 24 perfiles: **el "150" no se corrobora**.
No publican ingresos ni número de licencia de agencia israelí.

**La lectura para nosotros**: Tourist Israel es la prueba de que el camino funciona y de que es
largo. Pero también hicieron la primera década **revendiendo operadores de terceros**, que es
exactamente el punto donde estamos parados. No hay que esperar once años para vender; hay que
esperar once años para dejar de depender de otro.

### 4.3 Greece Travel Secrets — ocho años, y la bisagra son los códigos

**Corrección al brief**: los tours hosteados no arrancan en 2027; **la primera salida "Her Odyssey"
es junio 2026** y hay tres productos para 2027.

- **~2018** el sitio ("over the past 8 years" en `/about`), **~2020** el podcast y el grupo privado
  de Facebook ("the largest private Facebook Group and the only Podcast about travelling there").
- Monetización declarada en `/about`: sponsored posts, viajes de prensa, publicidad, más afiliación
  (GetYourGuide, Contiki, Busabout, Intrepid) con disclosure estándar.
- **Consultorías pagas**: "over 350 private Trip Planning Consultations". Precio publicado:
  **US$295 la hora** (full service, con itinerario documentado) y **US$225** por 45 minutos sin
  documentación.
- **Códigos negociados con 16 proveedores** (`/discount-codes-for-greece/`): Cattaxi Atenas 10%,
  Athens Food on Foot 10%, la guía Christina Christaki 10%, Acropolis Treasure Hunt 15%, Basiliko
  Taverna Naxos 10%, Kefalonia Tours, Variety Cruises 10%… Los mismos nombres aparecen en
  `/about/meet-the-greece-travel-secrets-team/` como "Trusted Partners", con dueños nombrados.
  **La página no revela si además cobra comisión ni cómo negoció.**
- **Jun 2026 — producto propio**, y acá está la diferencia con Aline: los T&C dicen "All bookings
  are made with **Greece Travel Secrets (ABN 37844761525)**". **Contrata su propia entidad
  australiana**, no una agencia ajena. Los servicios en tierra los ponen los partners locales.

| Producto | Fechas | Precio p/p | Cupo |
|---|---|---:|---|
| Her Odyssey (primera salida) | 2–11 jun 2026 | **€4.690** | 10 mujeres |
| Her Odyssey 2027 | may y jun 2027 | **€4.990** | 10 mujeres |
| Monasteries & Mamma Mia | 31 may – 8 jun 2027 | **€3.670** doble (+€990 single) | 10 mujeres |
| Cultural Retreat Syros | 24–30 jun 2027 | **€2.781** early bird → €3.090 | 12 |

**~8 años de contenido hasta vender producto propio.** No publica ingresos. Claim de audiencia:
"over 2 million unique users have read her content" (autodeclarado).

### 4.4 Julie Dawn Fox — el caso que eligió NO ser agencia

Es el contraejemplo útil. Textual de `/portugal-itinerary-design-service/`: **"Julie Dawn Fox in
Portugal is not a travel agency."** Y: "my trusted local partner travel agency will take over,
handling deposits, reservations, and all booking logistics on your behalf." **La agencia partner no
está nombrada.** Ella planifica, cobra por planificar, y el cliente le paga a terceros.

- En Portugal desde 2007; blog desde 2010 (copyright "2010-2026"). Colaboró con DK Eyewitness,
  Huffington Post, CNN, AFAR. Premio de blog en 2018. **~15 años de contenido antes de la oferta de
  servicios actual**; no publica el año en que empezó a cobrar consultorías.
- **Códigos negociados**, textual: "I've negotiated special discounts for you with certain local
  tour companies" — Portoalities JULIE5 (5%), Cooltour Oporto **FOX10** (10%), Culinary Backstreets
  **FOX5** (5%), Context Travel JULIEFOX10 (10%). **No revela si además cobra comisión.** En la
  misma página lleva afiliados de Booking, DiscoverCars, GetYourGuide y Viator.
- **Precios**: consulta de planificación **€175** (Zoom de hasta 60 min + resumen + 3 PDF); diseño
  de itinerario **desde €300**, pago por adelantado, hasta 2 semanas y 6 personas. Infoproductos:
  itinerarios **€27**, road trip Lisboa–Porto **€37**, set completo **€64**, tour autoguiado de
  Oporto **€19**, guías temáticas **€9**, kit de planificación **€19**.
- No publica ingresos. El único dato de tráfico ("over 12,000 people each month") sale de un perfil
  de Travel Massive, de terceros y probablemente viejo.

### 4.5 Dos casos que probaron y se volvieron

Son la contra del optimismo y valen tanto como los otros cuatro.

- **Nomadic Matt / The Nomadic Network.** Blog desde 2008; **The Nomadic Network** nace en **2019**
  como comunidad de meetups, no como operadora; los **group tours con su marca arrancan en 2022**;
  en **2023 los pausa** ("I made the difficult decision to pause TNN while I figured out a way to
  keep it going"); en **2024 vende y sale**, traspasando web, infraestructura, lista de mail y redes
  a Lisa Field, una de sus chapter leaders. **Catorce años de contenido para llegar a los tours, y
  dos años para soltarlos.** Volumen publicado: "We also ran 25 tours around Europe, the Middle East,
  and Mexico" (sin período atado a un año). Precios actuales de TNN: **US$2.695–5.495** por 5 a 14
  días, grupos de 6 a 16, depósito de 20–25% y 4 cuotas, cobrado por WeTravel. **No publica
  ingresos**; las cifras de "7 figuras" que circulan no tienen atribución y no sirven.
  Fuente: `nomadicmatt.com/travel-blogs/the-nomadic-network-is-back/`, `thenomadicnetwork.com/tours/`.
- **Adventurous Kate.** Deja su trabajo en 2010, **anuncia su primer tour a fines de 2014 y lo
  ejecuta en marzo de 2015**: el salto más rápido del grupo (4–5 años). **Producto de un tercero**:
  el operador era Leif, de The Runaway Guide — "Leif will handle the major travel logistics; I'm
  helping out with the people", y el cobro iba por la web de él. Precios **US$950** la primera
  salida y **US$1.250** las dos siguientes, con 50% de depósito. Volumen publicado: **12 viajeros**
  en el primero (agotado en una semana), **6** en el segundo; su conclusión fue que el grupo óptimo
  son 8. Admite sobrecostes por encima del presupuesto. **Hoy no vende tours**: volvió a afiliación
  y contenido patrocinado, con un código de descuento (KATE100) en un operador ajeno.
  Fuente: `adventurouskate.com/13-takeaways-from-a-first-time-tour-guide/`.
- **Referencia de industria, por si sirve de plan B**: **TrovaTrip** (fundada 2017, levantó US$15M
  en sep-2022) es el modelo "creador pone marca, tercero opera" en estado puro: "All trips are
  organized and run by a certified tour operator and include a local guide", el host fija precio y
  margen, y la plataforma cobra **10% de service fee + 2,9% de transacción**. Los requisitos de
  audiencia (15.000 seguidores en IG/YouTube o 50.000 en TikTok) ya estaban en `benchmarks.md` §6.

### 4.6 El patrón

| | Tourist Israel | Israel com a Aline | Greece Travel Secrets | Julie Dawn Fox |
|---|---|---|---|---|
| Contenido desde | 2008 | ~2020 (YouTube) | ~2018 | 2010 |
| Vende producto propio desde | 2019–2020 | ≤2023 | 2026 | no vende tours |
| Contenido → venta | ~11 años | **~3 años** | ~8 años | n/a |
| Quién opera | filial propia (TI Tours Ltd) + terceros | **tercero (Eretz Tur, CNPJ brasileño)** | entidad propia (ABN australiano) + proveedores locales | agencia partner sin nombrar |
| Licencia propia | no publicada | **no: la pone Eretz Tur** | sí (ABN) | declara NO ser agencia |
| Ingresos | no publica | no publica | no publica | no publica |

**La escalera es consistente**: contenido → afiliación y ads → consultoría paga o infoproducto →
**códigos negociados con operadores locales** → producto propio de marca. Los códigos son el paso
bisagra: no requieren licencia, no requieren cobrar, y son los que construyen la relación comercial
con el proveedor que después opera tu tour.

**Y el caso que rompe el patrón de plazos es Aline: tres años, no ocho ni once.** La diferencia no
es el sitio, es que ella ya era guía licenciada con audiencia en video y con un operador que puso
la licencia. Esa es la misma combinación que tenemos con Mariluz, con la audiencia todavía por
construir (`benchmarks.md` §6: ~950 seguidores combinados contra 2,7 M declarados de Aline).

---

## 5. Qué software hace falta — y quién cobra la plata

Todo consultado el **2026-09-24**. **La pregunta que ordena esta sección no es cuánto cuesta cada
herramienta: es quién cobra al cliente.**

### 5.1 La distinción que importa

**A) El dinero entra a tu cuenta** (vendés con tu marca y cobrás vos):

1. **Bókun, como reseller**: "the reseller is responsible for charging the customer and the
   supplier needs to invoice him"; "Reseller invoices are created outside Bókun and funds are
   transferred outside Bókun". Es el único modelo explícitamente documentado.
   *Ojo*: "If you are a reseller and do not offer any products, you will not be able to create
   contract terms" — un revendedor sin producto propio no puede proponer los términos, los recibe.
2. **TourCMS como "retail travel agent" con net rates**: "the travel agent is responsible for
   paying for the booking"; "you will distribute the tour at 90 USD and the booking will come into
   TourCMS at 0% commission", y vos vendés al precio que quieras.
   **Y lo mejor: el agent login lo crea el operador dentro de SU cuenta de TourCMS. Vos no pagás
   suscripción. Costo para vos: US$0.**
3. **Tu propio sitio + pasarela israelí + reserva manual con el operador.** Cobrás el 100%, le
   pagás el neto al operador. Lo más barato y lo que menos depende de terceros.

**B) El dinero entra al operador y vos cobrás comisión después**: el iFrame y los links de Bein
Harim, el link de TourCMS de Abraham ("the customer books directly with you and the web affiliate
is not party to the transaction"), el portal de agentes de GetYourGuide, `travelagents.viator.com`,
el checkout de Civitatis, y la red de distribución de FareHarbor (que sí publica: el operador paga
**20% por referral link y 25% por API**, "non-negotiable", comisión transferida el 5.º día hábil
del mes y depositada el 10.º).

**Rezdy queda en (B)**: su marketplace paga comisión, "Earn commission (minimum 13%)" y "We deduct
2% off the commission for holding and transferring your commission to your bank account".

### 5.2 Precios publicados

| Herramienta | Mensualidad | Fee por reserva | Notas |
|---|---|---|---|
| **TourCMS** (`tourcms.com/prices/`) | Small **US$49** (2 usuarios, 2 canales, **30 reservas/mes**) · Standard US$159 · Pro US$329 · Enterprise US$569. Anual = 2 meses gratis | "starting at **1,9%**" en reservas vía API de distribución | **Como agente invitado por el operador: US$0.** `tourcms.com/pricing/` da 404; la URL buena es `/prices/` |
| **Bókun** (`bokun.io/pricing`) | FREE **US$0** · START **US$49** · PLUS US$149 · PREMIUM US$499 | +1,5% / 1,25% / 1% según plan; 0% en reservas de Viator y offline | **El plan FREE no sirve**: no tiene venta online ni Marketplace. El mínimo real es **START US$49**. "Custom booking areas for agents" recién en PLUS. **La página no define qué es una "applicable booking"** |
| **Rezdy** (`rezdy.com/pricing/`) | Foundation US$49 · Accelerate US$99 · Expansion US$249 | 3% online; offline/agente US$1,00 / 0,85 / 0,70 | Prueba de 21 días. Marketplace de >12.000 agentes incluido en los tres |
| **FareHarbor** | **No publica precio público.** La home solo ofrece "Get a demo"; `/pricing/` devuelve error de la propia app | — | Las cifras de "6% por reserva" que circulan salen de **Bókun, que es competidor directo**, y de blogs comparadores. **No son dato oficial** |
| **Checkfront** | **US$99/mes + 3%** online; sin fees offline ni por OTA/API | | Plan único |
| **Peek Pro** | **No publica precio.** "custom, quote-based pricing"; `/pricing` da 404 | | |
| **TrekkSoft** | Starter €49 · Accelerate €149 · Ultimate €249 (anual) | 3% / 2,5% / 2% online; pasarela propia 2,5% + €0,25 en Europa, **3% + €0,25 fuera** | El "€799 de setup" que circula **no está en su página oficial** |

### 5.3 El bloqueo que cambia todo: Stripe no opera en Israel

**Verificado tres veces el 2026-09-24**: `stripe.com/il` devuelve **404**; en `stripe.com/global`
la palabra "Israel" **no aparece ni una vez** (de Medio Oriente solo figuran Emiratos y Chipre); y
el spec de país de la documentación de Stripe lista a Israel con `capabilities: ["transfers"]` y
`tos_types: ["recipient"]`, **sin `card_payments`**. O sea: una plataforma extranjera puede
pagarte por Stripe Connect, pero **no podés cobrar con tarjeta con una cuenta Stripe israelí**.

**Consecuencia directa**: Rezdy lista como pasarelas RezdyPay, Stripe, Square, PayPal,
Authorize.net, Fiserv, Flywire, Trust My Travel y Repayd — **ninguna israelí**. TourCMS lista Nets,
Spreedly, Trust My Travel, Worldpay y Palisis Marketpay — **ninguna israelí**. Bókun documenta
Stripe Connect. **La ruta "cobrás vos con software internacional" se rompe antes de llegar al
precio.** Empuja fuertemente hacia sitio propio + pasarela israelí.

*(Varios blogs afirman que Stripe funciona en Israel. Contradicen las tres fuentes oficiales; lo
que describen en realidad es abrir una LLC en EE. UU., que es otro problema.)*

### 5.4 Pasarelas para un residente en Israel

| Pasarela | Precio publicado | Requisito de empresa |
|---|---|---|
| **Stripe** | — | **No disponible para cobrar con tarjeta desde Israel** (ver arriba) |
| **PayPal Israel** (`paypal.com/il/business/paypal-business-fees`, actualizada 2026-07-06) | **3,40% + 1,20 ILS** doméstico; **+1,00%** cross-border desde EE. UU./Canadá/Europa; **+2,00%** resto del mundo; **2,5%** de conversión de divisa | No lo declara. **No verificado** |
| **Grow** (ex Meshulam; `meshulam.co.il` redirige a `grow.business`; `/fees/`) | Grow: **0,75% + 59 ₪/mes** (anual 708 ₪; mensual sin compromiso 69 ₪), 100 transacciones incluidas, +0,5 ₪ por excedente. Grow Light: 29 ₪/mes y 1%. **Tarjeta de turista: 3,5%.** Amex 3,5%, Diners 1,5%, 3DS +2,5 ₪, anulación 6,90 ₪ | **No publicado. No verificado** |
| **Tranzila** | **No publica precio.** Dice "la comisión más baja de Israel" sin números; pide dos meses de extractos para cotizar. Lo único con número: "starting from NIS 29 per month" para sliká móvil | **Sí**, textual del FAQ: hay que ser חברה בע"מ o **עוסק מורשה** y tener cuenta bancaria israelí. *(Contradicción: mantienen una landing dedicada a עוסק פטור. Hay que preguntar.)* |
| **Cardcom** | **No publica precio.** `cardcom.co.il` redirige a `cardcom.solutions`; `/pricing` da 404 | No verificado |
| **PayPlus** | **No publica precio.** `/pricing` da 404; el alta es una SPA ilegible. Las cifras de blogs **se contradicen entre sí** | No verificado |

**Cálculo propio, no cifra publicada**: un turista de EE. UU. o Europa pagando por PayPal y vos
recibiendo en shekels da aproximadamente **3,40% + 1,00% + 2,5% ≈ 6,9% + 1,20 ₪** antes de IVA.
Contra el 3,5% de tarjeta de turista de Grow, **PayPal cuesta el doble**. Sobre un paquete de
US$1.629 son ~US$112 contra ~US$57.

### 5.5 CRM y WhatsApp

- **WhatsApp Business App**: gratis, confirmado en `whatsappbusiness.com/products/business-app-get-started/`
  ("Available for free on the Google Play Store and Apple App Store"). Trae perfil de empresa,
  saludo automático, mensaje de ausencia, respuestas rápidas, **etiquetas** (sirven de pipeline:
  consulta → cotizada → reservada → perdida), catálogo y difusión. **Hasta 10 dispositivos
  vinculados** ("linking up to 10 devices and agents to your account"). Límite de **256 contactos
  por lista de difusión**, listas ilimitadas *(este último dato sale del índice de búsqueda sobre
  la URL oficial: `faq.whatsapp.com` no renderiza. Parcialmente verificado.)*
- **WhatsApp Business Platform (API)**: desde el 2025-07-01 se cobra por mensaje de plantilla
  entregado; **las conversaciones de servicio son gratis**. Tarifas publicadas para **Israel**
  (del endpoint que alimenta la calculadora oficial de Meta): **marketing US$0,0353**, utility y
  authentication **US$0,0053**, **service US$0**. Israel **no** está en la lista de mercados que
  cambian de tarifario el 2026-10-01. Meta no cobra fee de plataforma; el costo extra lo pone el
  proveedor (BSP).
- **Herramientas** (precios publicados): **Zoho CRM Free US$0 para 3 usuarios** (Standard US$14,
  Professional US$23, Enterprise US$40 por usuario/mes anual); **HubSpot Free US$0 para 2 usuarios**
  (Starter: la página muestra a la vez US$7 y US$20 por seat sin desambiguar; parece promo para
  clientes nuevos); **Chatwoot** self-hosted Community **US$0** (licencia MIT), pero el cloud
  gratuito "Hacker" **es solo live chat, no incluye WhatsApp** (para WhatsApp el mínimo es US$19
  por agente/mes); **Wati** Growth US$59/mes anual (US$69 mensual), 3 usuarios sin poder agregar
  más, y los mensajes se cobran aparte según el rate card de Wati; **respond.io** Starter US$99
  mensual / US$79 anual (US$948/año), contactos ilimitados, sin plan gratis.

**Para una persona sola la app gratis alcanza, y la API no se justifica.** Con un solo operador y
volumen bajo, la API solo suma costo por mensaje (US$0,0353 cada mensaje de marketing a Israel) más
el BSP. Wati a US$708/año son el 14% del capital total.

### 5.6 Qué entra en US$5.000

**Ruta más barata donde cobrás vos — ~US$16/mes:** pedirle al operador un **agent login en su
TourCMS con net rates** (él paga la suscripción) o un **contrato de reseller en su Bókun**; vender
en visitisrael.site a tu precio; cobrar con **Grow (59 ₪/mes + 3,5% de tarjeta de turista)**;
CRM con WhatsApp Business App + Zoho Free. **Software: US$0. Pasarela: ~US$16/mes + 3,5%.**

**Si querés cuenta propia de software de reservas**: Bókun START **US$49/mes + 1,5%** es el mínimo
con marketplace real — **pero antes hay que confirmar con Bókun qué pasarela acepta desde Israel**,
porque su ruta documentada es Stripe.

**Lo que no conviene**: FareHarbor y Peek Pro no publican precio y se venden por demo; con US$5.000
no hay poder de negociación. Rezdy y una cuenta propia de TourCMS cobran mensualidad que no hace
falta si el operador ya tiene sistema.

**Presupuesto anual del stack mínimo**: pasarela ~US$190 + software US$0 + CRM US$0 = **~US$200 al
año**, menos del 5% del capital. Lo que se come los US$5.000 no es el software: es la pauta.

---

## 6. Riesgos del white label

Cada riesgo va con la evidencia que lo respalda. Cuando no hay caso documentado se dice.

### 6.0 Lo que no se encontró, dicho primero

**No existe una guía publicada de contratos white label específica para tours y actividades.** Se
buscó. Lo mejor que hay es leer los contratos reales de las plataformas grandes, que sí son
públicos, y eso es lo que se hizo acá.

**Y no existe un caso documentado y fechado de un proveedor de tours haciendo brand bidding contra
su revendedor o socavándolo en precio directo.** Se buscó en Arival, Skift, PhocusWire, Travel
Weekly y TravelAge West. Lo que aparece son blogs de agencias de marketing con estadísticas sin
fuente, y no se reproducen. **Es un vacío genuino, no un riesgo descartado.** Lo que sí está
documentado es peor y está más abajo.

### 6.1 El operador puede cambiar las condiciones cuando quiera, y está por escrito

**No es hipotético: está en el acuerdo de Abraham Tours, publicado en su propia página** y leído
el 2026-09-24. Cláusula 5, textual:

> "We may modify any of the terms and conditions in this agreement **at any time at our sole
> discretion**. In such event, you will be notified by email. Modifications may include, but are
> not limited to, **changes in the payment procedures and Abraham Group Affiliate Program rules**.
> **If any modification is unacceptable to you, your only option is to end this agreement.**"

Y la cláusula 4: "Either you or we may end this Agreement **at any time, with or without cause**,
by giving the other party written notice."

Más la 3.1: si no hacés los cambios que ellos consideren necesarios en tu sitio, "we reserve the
right to terminate your participation".

**Ese es el contrato estándar del lado débil.** Bein Harim no publica el suyo (el alta es por
JotForm) y Tourist Israel tampoco. **Hay que pedirlo y leerlo antes de construir páginas sobre él.**

Y no es un vicio israelí. Los **Viator Partner Program General Terms** (PDF público, sin fecha de
versión visible) dicen lo mismo en mayúsculas, §12:

> "We may amend any of the terms and conditions contained in this Agreement… **at any time and at
> our sole discretion**. Any changes will be effective upon the posting of such changes… **YOUR
> CONTINUED USE OF ANY SERVICE AFTER VIATOR'S POSTING OF ANY CHANGES WILL CONSTITUTE YOUR
> ACCEPTANCE**."

Cero preaviso. Y §2: "We may terminate or suspend this Agreement or any Service **immediately**…
for any reason at any time." La comisión se define (§20.4) como la tasa que figura "in your Viator
Partner Program Account": **modificable desde el panel**.

**Y hay precedentes con fecha de que efectivamente se usa:**

- **GetYourGuide, junio–julio 2025: subió la comisión de 20% a 30% a un grupo de operadores.**
  Notificó el **2025-06-03**, efectivo el **2025-07-03**: **un mes de preaviso, en plena temporada
  alta.** Los operadores objetaron "the short notice, the timing (in the middle of peak season for
  many), and the lack of opportunity for discussion and negotiation". GYG lo describió como "a
  targeted commission adjustment… a small number of supply partners". (Arival, 2025-06-10,
  actualizado 2025-07-07.)
- **GetYourGuide, agosto 2026: traslada el impuesto digital a los proveedores** en Francia, Italia,
  España, Turquía y Reino Unido, efectivo el **2026-10-01**, anunciado a principios de agosto (~2
  meses). Un operador británico citó 1,8% encima de una comisión que ya era del 25%; en Turquía el
  DST llega a 7%. GYG lo venía absorbiendo desde enero de 2025. (Skift, 2026-08-07.)
- **Viator, agosto 2026: publicó un nuevo acuerdo global de proveedores sin anuncio público**,
  según Skift (2026-08-21), dando a sus "channel partners" (OTAs, aerolíneas, bancos; nombra
  Airbnb, Booking.com, Expedia) autoridad explícita sobre el precio final al consumidor. *(El
  artículo de Skift es de pago y la página de Viator devolvió 403: parcialmente verificado.)*

### 6.2 El operador ya le compite el precio a su propio canal

**Documentado en `peregrinacion-cristiana.md` §1.2 con precios leídos el 2026-09-23**: el
"Jerusalem and Bethlehem Day Trip from Tel Aviv" es el mismo producto de Bein Harim en tres
lugares, a tres precios: **GetYourGuide US$121, Viator ₪376,33, y directo en Bein Harim US$106**.
El operador **subcotiza a sus propios distribuidores en un 12%**.

Para nosotros eso hoy es una ventaja (mandamos al canal más barato y cobramos 15% en vez de 8%).
**En white label se da vuelta**: si armamos un precio propio sobre un neto, el mismo cliente puede
buscar el tour en beinharimtours.com y encontrarlo más barato. **La cláusula de paridad de precio
es lo primero que hay que negociar**, y ningún operador del relevamiento la publica.

### 6.3 Competir contra el propio programa de afiliados del operador — incluido el Estado

Verificado el 2026-09-24: **`itraveljerusalem.com`, el portal oficial de Jerusalén** (Jerusalem
Development Authority + Ministerio de Turismo + Municipalidad, ~90K visitas/mes y DR 56 según
`competidores.md` §1.1) **tiene 12 links con `affiliate_id=1264` de Bein Harim en su home.**

O sea: el mismo inventario que vamos a vender lo está vendiendo, con el mismo programa, un portal
público con autoridad de dominio, presupuesto público y ningún incentivo de precio. No es una
hipótesis de canibalización: es el estado actual del SERP.

### 6.4 El operador es tu competidor de SEO por definición

Bein Harim tiene blog con bylines reales ("By Sarah Mann") y enlaza sus tours desde adentro de los
posts (`competidores.md` §2.6); Tourist Israel tiene 2.000 artículos declarados y ~105K visitas/mes
con 70% orgánico (`competidores.md` §1.3). **Los dos operadores que nos venderían el producto ya
producen el contenido que queremos rankear.** Su ventaja es estructural: son el proveedor, tienen
el precio más bajo, y no pagan comisión a nadie.

Lo único que no tienen, y que sí tenemos: **cinco idiomas**. Tourist Israel es solo inglés; Bein
Harim tiene EN/ES/DE/FR en buena parte del catálogo pero **ninguno de sus paquetes Christian Holy
Land de 7 a 12 días se ofrece en español** (`peregrinacion-cristiana.md` §6.5). Ahí está el hueco
defendible, y es de idioma y de asesoramiento, no de precio.

**Y hay un caso donde el riesgo SEO está escrito en el contrato.** Los Viator Partner Program
General Terms, §3.2: **"You shall make all Travel Product Information non-indexable by search
engines."** Más §3.6, que prohíbe comprar keywords de la marca del proveedor o cualquiera
"strikingly similar", y el "ad hijacking". **La asimetría es total**: el revendedor queda
contractualmente impedido de posicionar sobre el contenido del proveedor, y el proveedor no tiene
ninguna obligación recíproca. Si Bein Harim o Sar-El proponen una cláusula parecida, el sitio
entero pierde el sentido: **es lo primero que hay que leer del acuerdo.**

**Y del lado marketplace, el proveedor te vende publicidad contra vos mismo.** Arival (2024-02-13)
documentó que bajo "Viator Accelerate 2.0" los operadores pagan comisión por encima de la base para
posicionar, con tasas observadas **"set everywhere from 28% to the high 40s"**, y que Viator ofrece
**quitar los avisos de la competencia de tu propia página de listing por entre 42% y hasta 51% de
comisión**. Es opcional, pero define el techo real del margen en ese canal.

### 6.5 El servicio lo ejecuta otro y el reclamo te llega a vos: principal contra agente

En afiliación, el cliente reserva en el sitio del operador y le reclama al operador. **En white
label con cobro propio, el cliente te pagó a vos**: el reclamo, el reembolso, la cancelación por
guerra y la reseña de una estrella son tuyos, y la capacidad de resolverlos no.

**La distinción tiene nombre en la industria.** ABTA la define así: *"An agent brings about a
contract between the customer and the principal, **but they are not party to the contract**"*,
mientras que *"Principals are **contractually bound to customers** to provide travel services"*,
emiten su propia documentación, tienen sus propios términos y **fijan el precio**.

**Los tres marcadores de principal —documentación propia, condiciones propias, precio propio— son
exactamente lo que hace un white label.** Si vendés bajo tu marca, a tu precio y con tus
condiciones, sos el principal, no importa quién maneje el bus. *(Es una lectura aplicando los
criterios de ABTA, no una cita: no se encontró ninguna fuente publicada que trate específicamente
la reventa white label de tours y el estatus de principal.)*

Y la trampa la describió bien un abogado del sector, Rhys Griffiths (Fieldfisher, para ABTA,
2018-12-13): el agente que se vuelve organizador sin darse cuenta queda **"unlikely to be in any
position to exert legal or commercial pressure on a supplier to rectify issues"** — carga la
responsabilidad sin el control operativo.

**En la UE eso está en una directiva.** La guía oficial de la Comisión (Your Europe, actualizada
2025-10-14) sobre la Directiva 2015/2302: los organizadores son "responsible for the proper
performance of all travel services" y deben ofrecer alternativas sin costo si algo falla; en
algunos países "retailers may also be liable in addition to organisers"; y los organizadores
"have the right to seek redress from any third parties who contributed to the event" — el derecho
de repetición que el contrato con el operador tiene que replicar. **Dato que baja el riesgo: un
day tour suelto no es un "paquete"** (hacen falta dos tipos de servicio). **Un paquete de 4 a 12
días con hotel, sí.** La directiva revisada **(UE) 2026/1024** se adoptó el 2026-04-29, entró en
vigor el 2026-05-28, con transposición al 2028-09-29 y aplicación a operadores desde el 2029-03-29;
elimina la categoría de "linked travel arrangements" y amplía qué cuenta como paquete.

**Quién come el chargeback lo define el merchant of record.** Viator §A-4.3 es el modelo de
asignación limpia: "Viator… **will be the merchant of record for all Transactions**… Viator shall
be responsible for all credit card merchant fees and credit card chargebacks". En white label con
cobro propio, **ese sos vos**: tu nombre en el resumen de tarjeta, tus chargebacks, tus reembolsos,
y tu único recurso es contractual contra el operador.

**Y el antecedente de fuerza mayor en este mercado no es hipotético.** `benchmarks.md` §5 ya
documenta que los operadores israelíes reembolsan menos el depósito no reembolsable o posponen sin
costo, que 206 Tours pospuso todas sus peregrinaciones hasta octubre de 2026, y que el espacio
aéreo estuvo cerrado desde el 2026-02-28. A eso se suma, de Calcalist/CTech (2026-06-28): mayo de
2026 cerró con **64.400 turistas, −49% contra mayo de 2025 y −83% contra mayo de 2023**; los
ingresos por turismo extranjero cayeron de US$4.850 M (2023) a US$2.100 M (2025); y —esto importa
para las cláusulas de seguro— el artículo reporta **aseguradoras extranjeras negando cobertura a
turistas con destino Israel**.

**Con el modelo de afiliado, todo eso es una comisión que no se cobra. Con cobro propio, es plata
del cliente en tu cuenta y una cancelación que no decidiste.**

Y hay un antecedente de calidad documentado del lado del canal: la Excursión a Belén de Civitatis
tiene **6,8/10 con 182 opiniones y un desajuste declarado de idioma del guía**
(`peregrinacion-cristiana.md` §6.5). Ese tipo de problema, en white label, lo firmás vos.

### 6.5-bis Dos casos de plataforma que valen como advertencia

- **Airbnb Experiences, mayo–junio 2024**: notificó a ~5.000 operadores que sus listings "does not
  meet our standards", los eliminó el **2024-06-20** y **canceló y reembolsó a los huéspedes con
  reservas posteriores a esa fecha**. Un operador citado por Arival pasó de ~60% de su facturación
  vía Airbnb en 2019 a ~25% en 2024. (Skift 2024-05-18; Arival 2024-07-30.) *(Circula que hubo "30
  días para apelar": ninguna de las dos fuentes lo confirma.)*
- **GetYourGuide Originals, 2018–2022**: tours diseñados por la OTA y ejecutados por operadores
  locales **bajo marca GetYourGuide** —private label puro—, con comisión más alta a cambio de
  posicionamiento preferencial. GYG cerró el programa avisando semanas antes del **2022-11-14**. La
  reacción de los partners, citada por Arival: uno participó solo porque **"if we didn't, someone
  else would"**; otro lo llamó **"a lesson learned"** y dijo que futuras alianzas exigirían "very
  specific conditions and guarantees". Antes, en abril de 2021, GYG había comprado un operador de
  Versalles, y Arival señaló que la estrategia "has raised concerns that, as GetYourGuide focuses
  more on developing its own products, it will give preference to those tours in search results at
  the expense of other operator listings".

**Los dos casos son el mismo aprendizaje**: el dueño de la plataforma o del producto puede cerrar
el canal, y el que puso la marca encima se queda sin nada. Son operadores perdiendo un canal; **un
revendedor white label con un solo proveedor no pierde un canal: pierde todo el producto.**

Contexto de concentración, de Arival (Global Operator Landscape, 4.ª ed., 5.000+ operadores): las
OTAs son el **37%** de las reservas de operadores y el canal directo cayó de **29% en 2024 a 25% en
2025**. *(Cifras reportadas sobre un informe de pago, no verificadas de forma independiente.)*

### 6.6 Dependencia de un solo operador, y de una sola persona

- **Un solo operador**: Bein Harim tiene 46 paquetes y más de 150 tours, y es tentador montar todo
  el sitio sobre ese catálogo. Si cambian la comisión (§6.1), si te sacan del programa, o si
  quiebran —la industria pasó de 3.000 a ~1.000 operadores entre 2019 y 2026, `benchmarks.md` §5—,
  el sitio queda sin producto. **La mitigación es tener dos operadores desde el día uno**, aunque
  el segundo venda menos.
- **Una sola persona**: `benchmarks.md` §7 ya registra el descuento de valuación del 5–25% por
  dependencia de una persona. Con Mariluz como cara del sitio, ese riesgo es el negocio entero.
- **Flujo de caja**: Abraham paga net 30 **desde la fecha de salida**, con mínimo de 1.500 ILS
  estando en Israel. Una venta de octubre para Pésaj 2027 se cobra en mayo de 2027. Bein Harim paga
  mensual, GetYourGuide y Viator también pagan después de realizada la actividad. **Todo el modelo
  de afiliación cobra tarde. El cobro propio es el único que cobra antes que el viaje** — y por eso
  mismo es el que tiene el riesgo de reembolso.

### 6.7 Cláusulas que hay que pedir en el acuerdo

Ninguno de los operadores relevados publica un acuerdo de agente. Esto es una lista de pedidos, no
un resumen de lo que ofrecen. Sale de tres lugares: lo que sí está publicado (§6.1), los contratos
reales de Viator que se leyeron, y las cláusulas que `benchmarks.md` §7 ya identificó para el
acuerdo con Mariluz. **Donde algo es práctica comercial general y no fuente publicada, se dice.**

1. **Comisión o tarifa neta por escrito, con plazo de preaviso.** El contraejemplo a evitar es
   Viator §12 (cambios al publicarse, uso continuado = aceptación) y el precedente de GYG (un mes,
   en temporada). *Práctica general, sin estándar publicado*: tarifas netas fijas por temporada,
   **90–180 días** de preaviso escrito, los cambios no aplican a reservas ya tomadas, derecho de
   terminación si el cambio supera un umbral, y las reservas confirmadas se honran a la tarifa
   vieja hasta la salida.
2. **Paridad de precio, y ojo que la ley juega a favor.** Pedir que el operador no venda al público
   por debajo del precio que te autoriza, o que te iguale el neto si lo hace (§6.2). Y **rechazar
   la paridad amplia**: bajo el reglamento europeo de acuerdos verticales (Reg. UE 2022/720,
   art. 5(1)(d)) la obligación de paridad minorista amplia es una **restricción excluida** de la
   exención por categoría; el TJUE, en el asunto C-264/23 (Booking.com, sept-2024), sostuvo que las
   cláusulas de paridad de Booking **no son restricciones accesorias**; y el art. 5(3) del DMA
   prohíbe paridad amplia y estrecha a los gatekeepers. **Aceptar como mucho paridad estrecha, y
   exigirla recíproca.** *(Que ese marco aplique a un acuerdo bilateral sobre tours de Israel es
   análisis, no conclusión con fuente.)*
3. **Atribución**: una sola herramienta, una ventana definida, y qué pasa con la reserva que empieza
   por tu link y termina por teléfono. El contraejemplo concreto está publicado por Pilgrim Tours:
   *"Commissions are not available for referrals quoted first by a Pilgrim Agent"*.
4. **Quién factura al cliente final y quién es el merchant of record.** Es la diferencia entre el
   modelo (A) y el (B) de §5.1 y define todo el riesgo. El modelo de redacción limpia es Viator
   §A-4.3: una parte nombrada es MoR y **esa misma parte carga expresamente con fees de comercio y
   chargebacks**. *Práctica general*: que quien **no** es MoR deba fondear reembolsos y chargebacks
   al MoR en un plazo fijo. **Si sos MoR comprando a tarifa neta y revendiendo, estás comprando y
   revendiendo, con consecuencias fiscales** (en la UE puede aplicar el régimen TOMS). **El IVA
   israelí y TOMS no se investigaron: es consulta de contador.**
5. **Quién responde ante el cliente** por cancelación, reembolso y fuerza mayor, y con qué plazo.
   El contraejemplo es Viator §11, que en una sola oración protege solo a Viator. Con el antecedente
   de 2026 a la vista, lo que hay que pedir es: **(a)** reembolso back-to-back, con el operador
   devolviendo íntegro y en un plazo más corto que el tuyo con el cliente; **(b)** lista expresa de
   disparadores —guerra, fuego de cohetes, cierre de aeropuerto o espacio aéreo, advertencias
   oficiales de viaje a un umbral nombrado, retiro de capacidad aérea—; **(c)** qué pasa con los
   depósitos ya pagados al operador; **(d)** que la elección entre crédito y reembolso en efectivo
   **la tomes vos, no el operador**; **(e)** protección por insolvencia, porque si el operador
   quiebra vos igual le debés al cliente. **Esta cláusula vale más que el porcentaje.**
6. **Propiedad de los datos del cliente.** Viator lo publica explícitamente para su Merchant API
   ("we will never contact or market to your customers") y su §9.1 es tajante: **"Neither party
   shall send any unsolicited commercial email… to Customers"**. **Ningún operador israelí dice
   nada.** Pedir: vos sos controlador de tus clientes; el operador recibe solo el manifiesto mínimo
   para ejecutar; prohibición expresa de comercializar, solicitar o recontactar a tus clientes
   **que sobreviva a la terminación**; prohibición de mostrar su marca o capturar contactos el día
   del tour; notificación mutua de brechas en 24–72 h. Ojo con un plazo nuevo: la **Enmienda 13 de
   la ley israelí de protección de la privacidad rige desde el 2025-08-14**, amplía "datos
   sensibles", obliga a oficiales de privacidad y da a la autoridad poder de sanción económica.
7. **Seguro y responsabilidad civil.** El modelo de redacción a copiar es Viator §A-9: exige
   responsabilidad civil **y** errores y omisiones, con aseguradora de rating A.M. Best A-VII o
   superior, **sumarte como additional insured**, certificado de seguro, cobertura **primaria**, y
   la aclaración de que el seguro no limita la responsabilidad. **Y lo que hay que rechazar es su
   §7**: tope de responsabilidad de **US$10.000** para ellos, indemnidad **ilimitada** para el
   partner (§5). ABTA recomienda lo contrario: *"There should be a mutual indemnity by which each
   party indemnifies the other against claims caused by the other party's negligence"*, con tope
   referido al valor total del contrato. *(Esa cita de ABTA viene del extracto de su Code of Conduct
   Guidance de jul-2024; el PDF no se pudo decodificar — verificarla antes de usarla.)*
   `benchmarks.md` §7 registra US$500–3.000/año de seguro en EE. UU. y **sin dato para Israel**.
8. **Marca e indexación.** Pedir el inverso del Viator §3.2: derecho expreso a presentar el producto
   bajo **tu** marca, escribir tus propias descripciones e **indexar tus páginas**, más el
   compromiso del operador de no identificarse ante el cliente ni repartir material propio el día
   del tour. **Ese inverso no está en ninguna plantilla publicada**; hay que redactarlo. Y tener
   presente la tensión con §6.5: cuanto más completo el white label, más claramente sos el principal.
9. **Cola post-salida**: qué reservas siguen pagando si el acuerdo termina, con la cookie de 90 días
   corriendo.
10. **No exclusividad de nuestro lado**, para poder tener el segundo operador de §6.6. El default
    del mercado es ese: Viator §A-3.1 concede una licencia "limited, non-transferable,
    non-sublicensable, non-assignable, **non-exclusive**". Si se pide exclusividad del lado del
    operador, atarla a volúmenes mínimos con degradación automática si no se cumplen.

### 6.8 El riesgo que no es contractual: el modelo se abandona

`§4.5`: Nomadic Matt tardó 14 años en llegar a los tours, los pausó en 2023 y los vendió en 2024;
Adventurous Kate lo probó una temporada en 2015 y volvió a afiliación. **Ninguno de los dos
quebró: los dos eligieron no llevarlo.** Operar viajes —aunque los opere otro— es atención al
cliente, cobranza, cupos, cancelaciones y reclamos, y es un trabajo distinto de escribir guías.
Conviene decidirlo sabiendo eso.

---

## 7. Recomendación: con qué dos operadores empezar

### 7.1 Los dos: Bein Harim y Sar-El Tours

**Primero: Bein Harim — el que paga hoy.** No es una recomendación nueva —ya es la acción 1 de
`competidores.md` §4.4 y el partner número uno de `peregrinacion-cristiana.md` §6.5—, pero este
relevamiento le suma tres razones que antes no teníamos:

1. **Es el único operador israelí con comisión publicada, y ese número es el más alto de todo el
   relevamiento: 15% con cookie de 90 días.** GetYourGuide y Viator pagan 8% en régimen; Civitatis
   8–10%; 206 Tours, que es el único otro número público del nicho, paga **10%** a agentes. A 15%,
   el paquete cristiano de 8 días deja **US$244,35** sin firmar contrato, sin cobrar y sin
   responsabilidad.
2. **Tiene los tres escalones del modelo en la misma casa**: afiliado (hoy), agente con plataforma
   B2B (la conversación a abrir), y API/iFrame (el día que haya volumen). Se puede subir de escalón
   sin cambiar de proveedor ni rehacer el contenido.
3. **Le habla al mercado hispano**: su página de partners existe en español y publica un mail de
   contacto de agentes (`marketing@beinharim.co.il`). Y su catálogo cristiano es el más profundo de
   Israel, en EN/ES/DE/FR (`peregrinacion-cristiana.md` §1.2).

**Segundo: Sar-El Tours — el que tiene el modelo.** Este es el cambio respecto de lo que se venía
asumiendo.

1. **Es el único operador israelí que publica la palabra "white label"**, y lo publica exactamente
   para el caso de uso de Sebastian: "Our travel providers can access a 'white label' service for
   their clients… **If you are a Travel Agent, please contact us**".
2. **Su sistema B2B está en inglés, alemán, español, portugués e italiano** — cuatro de los cinco
   idiomas del sitio, y los dos (ES y PT) donde está el hueco de mercado. Ningún otro operador
   israelí ofrece eso.
3. **Trabaja por cotización neta**, que es el mecanismo que permite poner precio propio: "we'd be
   happy to **quote you on your itineraries**".
4. **Invita explícitamente a los chicos**: "If you are an **up and coming agency**, we'd love to
   talk". Es la única puerta del relevamiento que no filtra por volumen.
5. **Y es cobertura real contra §6.6**: opera desde 1993, tiene flota propia de buses, subsidiaria
   (Conexion Travel) y cuentas como Emirates Holidays y Dnata. No compite con nosotros por SEO.

*Advertencia honesta sobre Sar-El*: **no publica comisión ni tarifa neta**, así que la conversación
empieza a ciegas; y su marca `sareltours.com` está posicionada como evangélica ("rooted in biblical
truths", "local Israeli believers guiding you"). El partner es el operador, no su discurso: la
postura editorial de `CLAUDE.md` no cambia.

**Tourist Israel baja al tercer lugar, y hay una razón concreta.** Tiene canal B2B declarado,
soporte 24/7 en español y servicios que Bein Harim no cubre (grupos, MICE, transfers, hoteles,
multi-país). Pero **es nuestro competidor de SEO más grande**: ~105K visitas/mes con 70% de tráfico
orgánico y 2.000 artículos declarados (`competidores.md` §1.3). Asociarse con el operador que ya
rankea por las mismas keywords es el peor caso de §6.4. Además no publica ningún número y su
formulario filtra por consultas de Israel por año, donde hoy la respuesta honesta es "1" o "2-5".
**Queda como tercer contacto, no como uno de los dos.**

### 7.2 Con quiénes NO empezar, y por qué

- **Abraham Tours**: no publica comisión, no tiene canal de agente (cinco URLs de agentes dan 404),
  mínimo de 1.500 ILS para cobrar estando en Israel, net 30 **desde la fecha de salida**, y un
  acuerdo que se puede modificar unilateralmente. Además **prohíbe usar variantes de su marca en tu
  dominio y diseñar un sitio que se le parezca**. Es el peor flujo de caja y el único que no se
  puede comparar. Está en `affiliates.ts`; **que se quede, pero no como apuesta**.
- **Civitatis agencias**: 10% sobre PVP con pago neto instantáneo es mejor que su afiliación, pero
  **exige agencia legalmente registrada**. Queda como afiliado (8–10%) en `/es/` hasta que exista
  una sociedad.
- **Viator Merchant API**: en el papel es el modelo exacto —merchant of record, precio propio,
  cliente propio, 300.000 productos—, pero exige calificación y **un depósito cuyo monto no se
  publica**. Con US$5.000 de capital no se planifica contra un número desconocido. **Es una pregunta
  para hacer, no un plan.**
- **GetYourGuide Travel Agent**: el 16% de los primeros 60 días es un gancho; el régimen es 8%, la
  mitad de Bein Harim. Sirve como complemento de widget para mostrar precio y rating reales
  (`competidores.md` §4.4, acción 3), no como canal de venta.
- **Bókun / Rezdy / FareHarbor con cuenta propia**: no hace falta pagar mensualidad si el operador
  ya tiene sistema, y la ruta de cobro pasa por Stripe, que no opera en Israel (§5.3).

### 7.3 El orden de los pasos

1. **Cargar el ID de afiliado de Bein Harim y empezar a cobrar 15%.** No requiere contrato,
   licencia, cobro ni software. Es la fase 3 del `ROADMAP.md`, ya está en `affiliates.ts` y depende
   solo de Sebastian. **Hasta que un clic registre, nada de lo demás se puede evaluar.**
2. **Mover el contenido del día suelto al paquete.** Es el hallazgo económico de §2: la misma
   comisión sobre un paquete de 8 días deja 22 veces más que sobre un día de Jerusalén. Y el pedido
   deja de ser "reservá" y pasa a ser "contanos qué querés hacer", que es lo que convierte tráfico
   informativo en consultas (§3.3).
3. **Mandar los dos mails el mismo día**: `marketing@beinharim.co.il` y el contacto de Sar-El
   Online. La pregunta, en una línea: *cuál es la comisión de agente o la tarifa neta, si permite
   vender con marca propia y con páginas indexables, y si me mandan el acuerdo.* Sin eso, todo el
   escenario de "20%" de §2 sigue siendo un supuesto. Y al leer el acuerdo, mirar primero los
   puntos 1, 5 y 8 de §6.7: preaviso de cambio de comisión, quién responde por la cancelación, y si
   hay una cláusula de no indexación como la de Viator §3.2 —esa última **invalida el modelo
   entero** y es motivo de no firmar.
4. **Pedir un agent login con net rates en el TourCMS o el Bókun del operador** (§5.1 y §5.6). Es el
   camino de US$0 de software hacia el cobro propio, y no se puede pedir antes de tener la
   conversación del paso 3.
5. **Antes de cobrar un peso**, tres consultas que no son opcionales:
   - **Abogado israelí**: si vender tours a Israel cobrando vos te convierte en "נותן שירותי סוכנות
     נסיעות" y te obliga a asegurar los fondos de clientes (§1.10). La licencia no existe; la
     obligación sí puede existir.
   - **El mismo abogado o un asesor de EE. UU.**: si vender a residentes de California, Florida,
     Hawaii o Washington exige registrarse como *seller of travel* (§1.10). Son regímenes
     extraterritoriales y ese es justamente el mercado de peregrinación.
   - **Por teléfono**: si un עוסק פטור puede abrir cuenta de sliká, y el precio real de Cardcom,
     Tranzila y PayPlus.
6. **Recién después**, Grow como pasarela y el primer paquete con precio propio.

Los pasos 1 y 2 no tienen costo, no tienen riesgo legal y se pueden hacer esta semana. Los pasos 3
a 6 son el modelo de verdad, y ninguno es urgente hasta que el sitio tenga consultas que atender.

### 7.4 La conclusión incómoda

Cruzando §2 con §6: **el white label puro te pone en el peor lugar de todos los riesgos a la vez, a
cambio de entre 5 y 10 puntos de margen que ningún operador israelí se comprometió a darte.** Sos
principal, probablemente merchant of record, probablemente dentro de la definición israelí de
prestador de servicios de agencia, posiblemente sujeto a registro en cuatro estados de EE. UU., sin
control operativo, con un proveedor que puede cambiar las condiciones con un mes de aviso, en un
destino con llegadas 83% por debajo de 2023 y aseguradoras extranjeras negando cobertura.

**El modelo de afiliado al 15% de Bein Harim te deja casi todo eso afuera.** Y la diferencia
económica real, según §2.3, no está entre 15% y 20%: está entre vender un día de US$75 y vender un
paquete de US$1.629.

Por eso el orden de arriba empieza por cargar el ID y mover el contenido al paquete, y deja el
white label como la conversación a abrir en paralelo. **No es tibieza: es que el paso 2 rinde 22
veces más que el paso 4 y no requiere abogado.**

**Y el plazo, con los casos en la mano**: Aline tardó 3 años teniendo la licencia y 2,7 M de
audiencia declarada; Greece Travel Secrets, 8; Tourist Israel, 11. Nosotros tenemos la licencia
(por Mariluz) y no tenemos la audiencia (~950 seguidores combinados, `benchmarks.md` §6). **El
cuello de botella no es el operador ni el software: es la demanda.** Todo este documento describe
un canal que hoy no tiene a quién venderle.

---

## 8. Lo que no se pudo verificar

- **La comisión de agente de Bein Harim, Tourist Israel y Abraham Tours.** Ninguno publica un
  número. Es el dato central del informe y no existe públicamente.
- **Qué hay adentro del portal de agentes de Bein Harim** (`agents.beinharimtours.com` es una SPA
  que no renderiza sin cuenta) y **si su API permite checkout propio** o solo embeber su sitio.
  `/api/`, `/b2b/`, `/travel-agents/` y `/white-label/` devuelven 404.
- **El monto del depósito de la Merchant API de Viator**, y su comisión o tarifa neta.
- **Si Viator exige IATA/CLIA** para el programa de agentes: sus páginas no lo mencionan ni para
  confirmarlo ni para negarlo. La negación circula solo en blogs.
- **El cuerpo del artículo de GetYourGuide "Easy commission payouts: no IATA or CLIA needed"** (solo
  se verificó el título en el índice oficial de la categoría) y su umbral mínimo de pago.
- **Si Civitatis tiene white label para agencias**, y qué documentación concreta pide además de
  "agencia legalmente registrada".
- **Cualquier porcentaje del Marketplace de Bókun**: no publica ninguno. Y **qué es una "applicable
  booking"** en su tarifario, que no está definido en la página.
- **El precio real de FareHarbor y Peek Pro** (se venden por demo) y de **Cardcom, Tranzila y
  PayPlus** (ninguno publica tarifa). Las cifras que circulan de FareHarbor vienen de Bókun, que es
  competidor directo.
- **Si Bókun acepta alguna pasarela israelí.** Su ruta documentada es Stripe, que no opera en Israel.
- **Si un עוסק פטור puede abrir cuenta de sliká** en Israel. Tranzila exige עוסק מורשה o חברה בע"מ
  en su FAQ pero mantiene una landing dedicada a עוסק פטור: contradicción sin resolver.
- **Si un afiliado o revendedor sin licencia cae bajo el art. 12א** de la Ley de Servicios
  Turísticos israelí (obligación de asegurar fondos de clientes). Se verificó que **la licencia de
  agencia fue derogada** y que la definición legal incluye "organización y venta de un tour a
  Israel", pero **no existe resolución, guía ni FAQ del Ministerio que resuelva el caso del
  revendedor**. La lectura de §1.10 ("lo decisivo es quién cobra") es razonamiento, no fuente.
- **Los montos de עיצום כספי (sanción administrativa) de esa ley**: tres extracciones del mismo
  cuerpo legal dieron tres cifras distintas. **No usar ningún número sin confirmarlo.**
- **Si el fondo de garantía sectorial de ITTAA efectivamente se disolvió** después de la asamblea
  del 2026-04-14, y cuál es la vía de cumplimiento vigente hoy.
- **Los requisitos de la Enmienda 13 de la ley israelí de privacidad** en materia de
  controlador/encargado: el análisis completo de IAPP es para miembros; los umbrales de DPO vienen
  de resúmenes de estudios jurídicos, no del estatuto.
- **TOMS, IVA israelí y el tratamiento fiscal de comprar-y-revender contra actuar como agente.** No
  se investigó y **afecta materialmente la decisión de merchant of record**.
- **Los números específicos de la Directiva revisada (UE) 2026/1024** (tope a pagos anticipados,
  plazos de repetición y de reembolso por insolvencia): vienen de resúmenes secundarios
  inaccesibles. Las fechas de adopción, vigencia y transposición sí están verificadas.
- **El texto primario de la Directiva 2015/2302 en EUR-Lex**: los fetch volvieron vacíos. Todo lo
  citado a nivel de artículo viene de la guía de la Comisión, no del estatuto.
- **La comisión de agente de Sar-El, Amiel y Dekel Tours**: los tres tienen canal B2B y ninguno
  publica número. **Y si Gil Travel y Ayelet Tours tienen programa**: sus sitios no se pudieron
  leer (protección anti-bot y un PDF que no se pudo extraer). Ausencia **no verificada**.
- **El 10% de 206 Tours** se leyó en la copia archivada del **2026-09-16**, porque el sitio bloquea
  bots. Puede haber cambiado. Y el claim de "63.000 viajes gratis" no se verificó.
- **El ratio de viaje gratis por N pasajeros de 206 Tours, Pilgrim Tours y EO**: ninguno lo publica.
  El único publicado en el nicho es 1 cada 20 de la Franciscan Foundation for the Holy Land. Lo de
  "US$500 en travel bucks" de EO salió de un snippet y no se leyó en la página.
- **Si Franciscan Pilgrimage Programs tiene programa de agente**: no se encontró nada publicado y
  varias de sus páginas dan 403. No asumir que no existe.
- **Un caso documentado y fechado de brand bidding o socavamiento de precio directo de un proveedor
  de tours contra su revendedor**: se buscó en Arival, Skift, PhocusWire, Travel Weekly y TravelAge
  West y **no se encontró ninguno**. Se reporta como vacío, no como riesgo descartado.
- **Los detalles del acuerdo de proveedores de Viator de agosto 2026**: Skift es de pago y la página
  de Viator dio 403. Que los pagos al operador sigan "anchored to the Net Rate" **no está
  verificado**.
- **La ventana de apelación de 30 días en el caso Airbnb Experiences 2024**: ni Skift ni Arival la
  confirman.
- **La cita de ABTA sobre indemnidad mutua y tope de responsabilidad**: viene del extracto de
  búsqueda de su Code of Conduct Guidance de julio 2024; el PDF no se pudo decodificar.
- **La tasa de conversión de clic de afiliado a reserva en tours**: no hay dato publicado citable.
  Ni GetYourGuide ni Viator lo publican; lo que circula no tiene definición ni metodología.
- **La tasa de cierre de una consulta de tour.** El único dato (41%, Invoca) es de llamadas
  telefónicas de cruceros y hoteles en EE. UU.
- **Las tasas de visita→consulta de 1,0%, 0,5% y 0,3% de §3.2 son supuestos declarados**, no datos.
  El único publicado es el 1,9% de Ruler Analytics, y su muestra son sesiones de anunciantes con
  campañas trackeadas, no tráfico orgánico de un sitio de contenido.
- **Los 2,7 M de suscriptores de Israel com a Aline** (autodeclarado; podría ser agregado de tres
  canales) y **la fecha exacta de su primera caravana**.
- **El volumen y los empleados de Tourist Israel**: sus propias páginas se contradicen (500.000 vs
  650.000 visitantes; "150 local experts" contra 51-200 en LinkedIn con 24 perfiles), y el bloque
  de 650.000 es boilerplate compartido con touristjapan.com. Además, su marketing dice "we operate
  all our own tours" mientras sus T&C dicen "third party tourism operator and/or TI Tours Ltd":
  **hay que creerle a los T&C**.
- **Los ingresos de los seis casos estudiados.** Ninguno publica facturación de tours. La única que
  publica ingresos en todo el conjunto es Never Ending Footsteps (US$10–15k/mes, `benchmarks.md`
  §1), que es precisamente la que **no** vende viajes.
- **El precio "US$2.819" del paquete cristiano de 8 días en categoría lujo** es de la lectura del
  2026-09-23; no se reverificó el 2026-09-24, cuando sí se releyeron los otros cinco productos.
- **Los programas de agente o líder de grupo de los operadores de peregrinación** (206 Tours,
  Pilgrim Tours, EO, Franciscan) y de los otros operadores israelíes (United Tours, Egged, Sar-El,
  Keshet, Amiel, Da'at, Gil Travel, Ayelet): quedaron fuera de este relevamiento.

---

## 9. Fuentes

Todas consultadas el **2026-09-24** salvo indicación.

**Legal y regulatorio**: `nevo.co.il/law_html/law00/5115.htm` y
`he.wikisource.org/wiki/חוק_שירותי_תיירות` (Ley de Servicios Turísticos 1976);
`tourism-law.co.il/sherut4.htm`; `gov.il/he/departments/ministry_of_tourism/...` y sus servicios de
licencia de מורה דרך; `ias.co.il` (2018-01-28, sobre la derogación de la licencia de agente);
`ittaa.org.il` (2026-04-14, disolución del fondo de garantía);
`hostagencyreviews.com/blog/travel-agent-license-seller-of-travel-license` (2025-01-03);
`abta.com/industry-zone/become-a-member/how-your-business-trades`;
`abta.com/news/adding-travel-services-package-does-it-make-you-organiser` (2018-12-13);
`europa.eu/youreurope/business/selling-in-eu/selling-goods-services/package-travel/` (actualizada
2025-10-14); `commission.europa.eu/...` (2026-05-28, Directiva 2026/1024); `blogturismo.garrigues.com`
(2026-05-28); `eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022R0720` (VBER);
`covcompetition.com` (2024-10, TJUE C-264/23); `iapp.org/news/a/israel-marks-a-new-era-in-privacy-law-amendment-13-...`
(2025-08-13); `partners.viator.com/static/docs/Viator-Partner-Program-Terms-en_EN.pdf`.

**Riesgos, casos de industria**: `skift.com/2024/05/18/airbnb-ups-its-experience-delistings-amid-strategy-revamp/`;
`arival.travel/article/airbnb-experiences-and-icons-whats-next/` (2024-07-30);
`arival.travel/getyourguide-to-wind-down-originals` (2022-11-14);
`arival.travel/getyourguide-acquires-versailles-tour-operator/`;
`arival.travel/article/getyourguide-commission-increasing-for-some-operators/` (2025-06-10,
act. 2025-07-07); `skift.com/2026/08/07/getyourguide-to-pass-its-digital-services-tax-bill-on-to-suppliers/`;
`skift.com/2026/08/21/viators-updated-operator-agreement-formalizes-a-power-shift-in-experiences-pricing-scoop/`;
`arival.travel/article/viator-accelerate-2-0-what-it-is-and-why-it-matters/` (2024-02-13);
`arival.travel/article/direct-bookings-dive-otas-rise/`;
`calcalistech.com/ctechnews/article/qjqghaj7t` (2026-06-28).

**Peregrinación y otros operadores israelíes**:
`web.archive.org/web/20260916011154/https://www.206tours.com/cms/agents/` (el sitio vivo bloquea
bots) y `/cms/groups/` (copia del 2026-08-29); `pilgrimtours.com/company/travel-agent.htm`,
`/group-leader.html`, `/do-donot.html`; `eo.travelwithus.com/group-leaders/` y `/why-lead/`;
`ffhl.org/holy-land-pilgrimages/`; `franciscanpilgrimages.com` (varias páginas 403);
`sarel.group/sarel-online` y `sareltours.com/about`; `amiel.com`;
`dekeltours.com/about/agent-to-agent/`; `eggedtours.com` (ya no existe, redirige a
`eggedplus.co.il`); `unitedtours.co.il`; `keshetisrael.co.il`; `giltravel.com` y `ayelet.com` (no
legibles).

**Operadores israelíes**: `beinharimtours.com/partner-with-us/` y `/es/partner-with-us/`;
`beinharimtours.com/tour-packages/` (46 paquetes, 4 páginas), `/masada-and-dead-sea/`,
`/jerusalem-and-bethlehem-tour/`; `agents.beinharimtours.com/login` (SPA, no legible);
`shareasale.com/shareasale.cfm?merchantID=48735`; `abrahamtours.com/affiliate/` (incluye el Digital
Partner Agreement completo); `touristisrael.com/travel-agents/`, `/agents/`, `/israel-dmc/`,
`/terms-conditions/`, `/about/`; `itraveljerusalem.com` (12 ocurrencias de `affiliate_id=1264`).

**Marketplaces**: `partner.getyourguide.com`;
`partner.getyourguide.support/hc/en-us/articles/32733738291869-...` (403 a fetch, leída por
navegador) y `/13981068165917-Our-partner-program`; `api.getyourguide.com`;
`agentcenter.viator.com/join-today/` y `/resources/commission-and-payments/`;
`partnerresources.viator.com/travel-commerce/merchant/`; `docs.viator.com/partner-api/`;
`civitatis.com/es/agencias` y `/es/afiliados`; `civitatis.zendesk.com/hc/es/articles/30742228339741`
y `/36162068921885`; `bokun.io/marketplace`, `/grow/marketplace/`, `/pricing`;
`docs.bokun.io/en/articles/177` y `/docs/marketplace-pro/marketplace/...` (ambos "Last updated on
June 11, 2026").

**Software y pasarelas**: `tourcms.com/prices/` (`/pricing/` da 404),
`tourcms.com/support/setup/travel_agent_overview.php`, `/setup/net_rates.php`,
`/payments/gateways.php`; `rezdy.com/pricing/`, `/resell-other-operators/`, `/payment-gateways/`,
`/channel-manager/`; `fareharbor.com/` y `/scale/distribution-network/operators/` (`/pricing/`
devuelve error de la propia app); `checkfront.com/pricing`; `peekpro.com/` (`/pricing` 404);
`trekksoft.com/en/pricing`; `stripe.com/global` y `stripe.com/il` (404);
`paypal.com/il/business/paypal-business-fees`; `grow.business/fees/` y `/price-offer/`
(`meshulam.co.il` redirige ahí); `tranzila.com/faq.html`; `cardcom.solutions/`; `payplus.co.il/`.

**CRM**: `whatsappbusiness.com/products/business-app-get-started/` y `/business-app-features/`;
`whatsappbusiness.com/products/platform-pricing/` (tarifas de Israel vía el endpoint que alimenta
su calculadora); `developers.facebook.com/docs/whatsapp/pricing/updates-to-pricing`;
`zoho.com/crm/zohocrm-pricing.html`; `hubspot.com/pricing/crm`; `chatwoot.com/pricing/self-hosted-plans`;
`wati.io/pricing/`; `respond.io/pricing`.

**Conversión**: `ruleranalytics.com/blog/insight/conversion-rate-by-industry/` (informe 2026-05-26);
`unbounce.com/conversion-benchmark-report/travel-hospitality-conversion-rate/` (datos jul-2023 a
jul-2024); `contentsquare.com/guides/travel-hospitality-digital-experience/conversions/`;
`invoca.com/reports/the-invoca-travel-lead-conversion-benchmarks-report-2026`;
`travelpayouts.com/blog/tips-from-getyourguides-experts/` (2022-10-31);
`petraontheway.com/en/review-getyourguide-affiliate-program` (actualizado 2026-08-20).

**Casos**: `israelcomaline.com.br/`, `/quem-somos/`, `/viagens-para-israel/`,
`/viagens/caravana-israel-com-aline-2/`, `/viagens/caravana-fevereiro/`; `eretztur.com.br` y
bases de CNPJ brasileñas (fuentes secundarias);
`medium.com/strtupboost/fantastic-work-culture-with-ben-julius-ceo-of-tourist-israel-...`
(2019-10-14, 403 a fetch, leída por navegador); `mondarine.com`;
`linkedin.com/company/tourist-israel`; `greecetravelsecrets.com/about`, `/greece-travel-planner/`,
`/discount-codes-for-greece/`, `/about/meet-the-greece-travel-secrets-team/`,
`/hosted-tours-and-retreats-in-the-greek-islands/`, `/greece-cultural-retreat/`,
`/greece-travel-secrets-tours-and-retreats-terms-and-conditions/`;
`juliedawnfox.com/about-julie-dawn-fox/`, `/trip-planning-consultation/`,
`/portugal-itinerary-design-service/`, `/shop/`, `/best-portugal-travel-deals/`;
`nomadicmatt.com/travel-blogs/the-nomadic-network-is-back/`, `thenomadicnetwork.com/tours/` y
`/faq/`; `adventurouskate.com/13-takeaways-from-a-first-time-tour-guide/`;
`trovatrip.com/about/host-faq`.

**Datos propios reutilizados**: `gestion/negocio/benchmarks.md` §§1, 2, 4, 5, 6 y 7;
`gestion/negocio/propuesta-mariluz-numeros.md` §3; `gestion/auditoria/competidores.md` §§1, 2 y 4;
`gestion/auditoria/peregrinacion-cristiana.md` §§1 y 6.5.

**Tabla de datos para graficar**: `data/negocio/white-label.json`.
