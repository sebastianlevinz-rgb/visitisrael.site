/**
 * Borrador de paquetes para que Mariluz revise en /mariluz/paquetes.
 *
 * Fuente: relevamiento del 2026-09-22 de seis catálogos (Tourist Israel, Bein Harim,
 * Abraham Tours, Civitatis, GetYourGuide, Viator) más `gestion/auditoria/cobertura-afiliados.md`
 * (2026-09-16) y `gestion/negocio/benchmarks.md`. Los precios son los que cada catálogo publica
 * para tours de grupo; los de tour privado que aparecen son también publicados (Bein Harim y
 * Tourist Israel los muestran "per group") y se citan solo como referencia. Nada de esto es un
 * precio de Mari: eso lo completa ella.
 *
 * Cómo se leyó cada catálogo: Tourist Israel por curl (precio en `data-bp`, USD); Bein Harim por
 * WebFetch de sus páginas de categoría (USD); Abraham por WebFetch (ILS); Civitatis por WebFetch
 * (USD); GetYourGuide y Viator por navegador (bloquean el fetch; GYG en USD, Viator en ILS).
 */

export const FECHA_RELEVAMIENTO = '22-09-2026';

export type Catalogo = { sigla: string; nombre: string; url: string; moneda: string; como: string };

export const CATALOGOS: Catalogo[] = [
  { sigla: 'TI', nombre: 'Tourist Israel', url: 'touristisrael.com/type/day-tours', moneda: 'US$', como: '39 tours de día y 46 paquetes leídos con precio' },
  { sigla: 'BH', nombre: 'Bein Harim', url: 'beinharimtours.com (categorías)', moneda: 'US$', como: 'Jerusalén, Mar Muerto, Galilea, Belén, Tel Aviv, Petra, cristianos, judíos y paquetes' },
  { sigla: 'AB', nombre: 'Abraham Tours', url: 'abrahamtours.com/tours', moneda: 'ILS', como: 'lista completa; varios sin precio en el listado' },
  { sigla: 'CV', nombre: 'Civitatis', url: 'civitatis.com/es/israel', moneda: 'US$', como: 'página país en español' },
  { sigla: 'GYG', nombre: 'GetYourGuide', url: 'getyourguide.com/israel-l169033', moneda: 'US$', como: 'primera página (25 de 387 resultados)' },
  { sigla: 'VI', nombre: 'Viator', url: 'viator.com/Israel/d919-ttd', moneda: 'ILS', como: 'primera página (20 de 500+ resultados)' },
];

export type Frecuencia = {
  tour: string;
  /** Siglas de los catálogos donde aparece, vistos el día del relevamiento. */
  en: string[];
  /** Catálogos donde consta por el relevamiento anterior (2026-09-16), no en la primera página de hoy. */
  segunAuditoria?: string[];
  duracion: string;
  salida: string;
  rango: string;
  nota?: string;
};

export const FRECUENCIA: Frecuencia[] = [
  {
    tour: 'Jerusalén Ciudad Vieja, día completo',
    en: ['TI', 'BH', 'AB', 'CV', 'GYG', 'VI'],
    duracion: '8–10 h (versión a pie: 4 h)',
    salida: 'Jerusalén; desde Tel Aviv con recogida',
    rango: 'US$69–95 por persona (TI 69, BH 75, CV 75, GYG 95 desde Tel Aviv; AB 170 ILS). A pie 4 h: GYG US$57, Viator ₪181–234.',
  },
  {
    tour: 'Masada, Ein Gedi y Mar Muerto (con versión amanecer)',
    en: ['TI', 'BH', 'AB', 'CV', 'GYG', 'VI'],
    duracion: '10–12 h',
    salida: 'Jerusalén o Tel Aviv',
    rango: 'US$85–125 por persona (TI 89, BH 85–115, CV 111–120, GYG 89–125, AB 320–350 ILS, Viator ₪337–374).',
    nota: 'Es el primer producto de Israel en GetYourGuide, Viator y Civitatis.',
  },
  {
    tour: 'Jerusalén + Belén (o Belén solo, medio día)',
    en: ['TI', 'BH', 'AB', 'CV', 'GYG', 'VI'],
    duracion: 'Combinado 9–10 h; Belén solo 4–5 h',
    salida: 'Jerusalén o Tel Aviv',
    rango: 'Combinado US$99–121 (TI 99 con Mar Muerto, BH 106, CV 106–121, GYG 121). Belén solo: BH 75, GYG 75, AB 220 ILS, Viator ₪234.',
    nota: 'En Belén todos los operadores cambian de guía y vehículo en el puesto de control.',
  },
  {
    tour: 'Nazaret + Mar de Galilea',
    en: ['TI', 'BH', 'AB', 'CV', 'GYG', 'VI'],
    duracion: '11–12 h',
    salida: 'Jerusalén o Tel Aviv',
    rango: 'US$94–108 por persona (TI 99, BH 98, CV 94–100, GYG 98–108, AB 360–390 ILS, Viator ₪308).',
  },
  {
    tour: 'Cesarea + Haifa + Acre (+ Rosh Hanikra)',
    en: ['TI', 'BH', 'CV', 'GYG', 'VI'],
    duracion: '10–11 h',
    salida: 'Tel Aviv; desde Jerusalén con recogida',
    rango: 'US$95–120 por persona (TI 99, BH 95, CV 99–120, GYG 99, Viator ₪308). Abraham no lo tiene.',
  },
  {
    tour: 'Tel Aviv + Jaffa (con mercado Carmel)',
    en: ['TI', 'BH', 'AB'],
    segunAuditoria: ['CV', 'GYG', 'VI'],
    duracion: '4–7 h',
    salida: 'Tel Aviv',
    rango: 'US$39–89 por persona (TI 89 día completo, Jaffa 49; BH a pie 89, Jaffa 39; AB free tour de Jaffa, bici 150 ILS). Civitatis Tel Aviv US$29–49 según relevamiento del 16-09.',
    nota: 'GetYourGuide (172 resultados) y Viator (200+) tienen página de Tel Aviv; hoy no se leyó precio ahí.',
  },
  {
    tour: 'Petra desde Eilat (1 día) o desde Tel Aviv/Jerusalén (1–3 días)',
    en: ['TI', 'BH', 'AB', 'CV', 'GYG', 'VI'],
    duracion: '1 día desde Eilat (12 h); 2–4 días desde el centro',
    salida: 'Eilat; Tel Aviv/Jerusalén',
    rango: '1 día desde Eilat: TI US$219, CV US$199, Viator ₪982. Desde Tel Aviv/Jerusalén: TI 299 (1 día), CV 299–499, AB 1.500–2.300 ILS (2–3 días), BH 482–795 (2–4 días), GYG 588 con vuelo.',
    nota: 'No está entre los paquetes de abajo: dentro de Jordania guía un guía jordano. Ver preguntas para Mari.',
  },
  {
    tour: 'Néguev / Mitzpe Ramón / Timna',
    en: ['TI', 'GYG', 'VI'],
    duracion: '2–4 h en jeep; día completo privado',
    salida: 'Eilat, Mitzpe Ramón; Tel Aviv (privado)',
    rango: 'Jeep 2–4 h: GYG Timna US$86, Viator Timna ₪305, cráter Ramón ₪982 por grupo. Día completo privado: TI US$1.399 por grupo.',
    nota: 'Casi todo es jeep local, no tour con guía. Bein Harim, Abraham y Civitatis no lo ofrecen.',
  },
  {
    tour: 'Golán',
    en: ['TI', 'BH', 'GYG'],
    duracion: '11–12 h',
    salida: 'Tel Aviv o Jerusalén',
    rango: 'US$128 por persona (TI 128, BH 128). GYG: 14 resultados en la región (16-09), sin precio leído hoy.',
  },
  {
    tour: 'Tours cristianos temáticos (Jerusalén de Jesús, Galilea cristiana)',
    en: ['TI', 'BH', 'AB', 'GYG'],
    duracion: 'Día completo',
    salida: 'Jerusalén o Tel Aviv',
    rango: 'US$59–105 por persona (TI Christian Jerusalem 99, Christian Galilee 59; BH Jesus Tour 89, Christian Galilee 105). AB: Jesus Trail 5 días 2.800 ILS. GYG: filtro "Catholic history".',
    nota: 'Todos en inglés y en bus de grupo. En español: sin producto específico visto.',
  },
  {
    tour: 'Herencia judía',
    en: ['TI', 'BH', 'AB', 'GYG', 'VI'],
    duracion: 'Paquetes 3–9 días; sueltos 1,5 h–1 día',
    salida: 'Tel Aviv / Jerusalén',
    rango: 'Paquetes: BH 3–9 días US$589–2.165; TI 7–9 días US$1.345–1.674 (privado 9 días 4.493). Sueltos: BH Galilea judía privada US$1.099 por grupo; Viator caminata de Cábala en Safed ₪140; AB "Meet the Ultra-Orthodox".',
  },
  {
    tour: 'Food tour (Carmel, Levinsky, Mahane Yehuda)',
    en: ['TI', 'BH', 'AB', 'GYG'],
    duracion: '3–4 h',
    salida: 'Tel Aviv (Carmel, Levinsky); Jerusalén (Mahane Yehuda)',
    rango: 'US$49 por persona (TI Carmel tasting 49, BH Carmel food 49); AB Carmel y Levinsky 259 ILS. Mahane Yehuda: solo dentro del privado "Hidden Gems" de TI (US$1.100 por grupo). GYG: filtro "Markets".',
  },
  {
    tour: 'Multidía 7 y 10 días (con hotel y bus)',
    en: ['TI', 'BH', 'AB', 'CV'],
    segunAuditoria: ['GYG', 'VI'],
    duracion: '5–10 días',
    salida: 'Ben Gurion / Tel Aviv',
    rango: '7 días: TI US$1.211–1.319, BH 1.409–1.429. 10 días: TI 1.728, BH 2.079. AB 5 días 1.200 ILS, 7 días con Jordania 2.700 ILS. CV 5 días US$964. Privado (TI, 8–13 días): US$4.493–8.969 por persona.',
  },
  {
    tour: 'Shabat / cena de Shabat',
    en: ['TI', 'AB'],
    duracion: 'Tarde-noche',
    salida: 'Tel Aviv (TI), Jerusalén (AB)',
    rango: 'TI "Tel Aviv Shabbat Dinner Experience" US$1.239 por grupo (privado). AB "Jerusalem Shabbat Experience": sin precio en el listado.',
    nota: 'Solo 2 de 6: hueco para un producto en español.',
  },
  {
    tour: 'Fiestas con guía (Navidad, Domingo de Ramos, Sucot, Pésaj)',
    en: ['BH', 'AB'],
    duracion: 'Tarde-noche o día',
    salida: 'Jerusalén / Tel Aviv',
    rango: 'BH Nochebuena Jerusalén + misa de medianoche en Belén US$125; BH procesión de Domingo de Ramos US$99; AB Nochebuena en Belén 340–370 ILS. Sucot, Pésaj, Rosh Hashaná: sin producto en ninguno de los 6.',
    nota: 'Hueco claro: nadie vende las fiestas judías con guía.',
  },
];

export type Parada = { lugar: string; tiempo: string };

export type Paquete = {
  id: string;
  nombre: string;
  tipo: 'clasico' | 'diferencial';
  /** Por qué está en la lista: frecuencia o diferencial. */
  porQue: string;
  duracion: string;
  salida: string;
  recorrido: Parada[];
  paraQuien: string;
  incluye: string[];
  noIncluye: string[];
  mejorEpoca: string;
  diasAEvitar: string;
  idiomas: string;
  notas: string[];
  referencia: {
    grupal: string;
    privadoPublicado?: string;
    fuentes: string;
  };
};

export const PAQUETES: Paquete[] = [
  {
    id: 'jerusalen-ciudad-vieja',
    nombre: 'Jerusalén, Ciudad Vieja: día completo',
    tipo: 'clasico',
    porQue: 'Está en los 6 catálogos. Es el tour que toda primera visita compra.',
    duracion: '8–9 h a pie. Desde Tel Aviv, sumar 1 h por tramo.',
    salida: 'Jerusalén (hotel o Puerta de Jaffa). Opción con recogida en Tel Aviv.',
    recorrido: [
      { lugar: 'Monte de los Olivos, mirador de la ciudad', tiempo: '≈ 30 min' },
      { lugar: 'Getsemaní e Iglesia de Todas las Naciones', tiempo: '≈ 30 min' },
      { lugar: 'Puerta de Jaffa y Barrio Armenio', tiempo: '≈ 20 min' },
      { lugar: 'Barrio Judío: Cardo, sinagoga Hurva, mirador al Muro', tiempo: '≈ 45 min' },
      { lugar: 'Muro Occidental', tiempo: '≈ 45 min' },
      { lugar: 'Vía Dolorosa y Basílica del Santo Sepulcro', tiempo: '≈ 1 h 30' },
      { lugar: 'Almuerzo en el Barrio Cristiano o en el bazar', tiempo: '≈ 1 h' },
      { lugar: 'Monte Sion: Cenáculo, Tumba de David, Dormición', tiempo: '≈ 45 min' },
      { lugar: 'Opcional, solo por la mañana: Explanada de las Mezquitas / Monte del Templo (horario restringido, cerrado viernes y sábado)', tiempo: '≈ 45 min' },
    ],
    paraQuien: 'Primera visita, familias, cruceristas, cualquier religión o ninguna.',
    incluye: ['Guía licenciada todo el día', 'Recorrido a pie por los cuatro barrios'],
    noIncluye: ['Entradas de pago (Torre de David, túneles del Muro, Ciudad de David: son extras)', 'Transporte', 'Comida'],
    mejorEpoca: 'Todo el año. Ideal marzo–mayo y octubre–noviembre. En julio y agosto, empezar temprano.',
    diasAEvitar: 'Shabat (viernes tarde a sábado noche): Barrio Judío y Muro sin fotos ni comercio; la Explanada de las Mezquitas cierra viernes, sábado y fiestas musulmanas; tardes de Ramadán con restricciones.',
    idiomas: 'Español, inglés, hebreo.',
    notas: ['Hombros y rodillas cubiertos en los lugares santos.', 'Calzado cerrado: la piedra pulida resbala.', 'Los hombres cubren la cabeza en el Muro (hay kipá prestada).', 'Muchos escalones; hay que avisar si alguien camina con dificultad.'],
    referencia: {
      grupal: 'US$69–95 por persona en bus de grupo; versión a pie de 4 h desde US$57.',
      privadoPublicado: 'Bein Harim "Jerusalem and Dead Sea Private Tour" US$999 por grupo; Tourist Israel "Private Mount of Olives & Temple Mount" US$1.239 por grupo.',
      fuentes: 'Tourist Israel US$69; Bein Harim US$75; Civitatis US$75; GetYourGuide US$95 (desde Tel Aviv) y US$57 (a pie 4 h); Abraham 170 ILS; Viator ₪181–234. Leídos el 22-09-2026.',
    },
  },
  {
    id: 'masada-mar-muerto',
    nombre: 'Masada, Ein Gedi y Mar Muerto (con opción amanecer)',
    tipo: 'clasico',
    porQue: 'Está en los 6 catálogos y es el primer producto de Israel en GetYourGuide, Viator y Civitatis.',
    duracion: '10–12 h. Versión amanecer: salida 3:30–4:00 desde Jerusalén.',
    salida: 'Jerusalén (≈ 1 h 15 hasta Masada) o Tel Aviv (≈ 2 h).',
    recorrido: [
      { lugar: 'Bajada por el desierto de Judea; vista de Qumrán y del nivel del mar', tiempo: '≈ 1 h 15 de ruta' },
      { lugar: 'Masada: subida en teleférico (o por el Sendero de la Serpiente al amanecer), palacios de Herodes, historia del asedio', tiempo: '≈ 2 h' },
      { lugar: 'Ein Gedi: Nahal David hasta la cascada', tiempo: '≈ 1 h 30' },
      { lugar: 'Almuerzo (kibutz Ein Gedi o Ein Bokek)', tiempo: '≈ 45 min' },
      { lugar: 'Mar Muerto: flotación y barro en Ein Bokek o Kalia', tiempo: '≈ 1 h 30' },
      { lugar: 'Regreso', tiempo: '≈ 1 h 15–2 h' },
    ],
    paraQuien: 'Todos. La subida a pie al amanecer es para gente en forma.',
    incluye: ['Guía licenciada todo el día'],
    noIncluye: ['Entradas: Masada (parque nacional) y teleférico, Ein Gedi (parque nacional), playa con vestuarios', 'Transporte', 'Comida'],
    mejorEpoca: 'Octubre a abril. En verano hace más de 40 °C: solo versión amanecer y Ein Gedi temprano. En invierno, riesgo de crecidas repentinas en Ein Gedi (se cierra el sendero).',
    diasAEvitar: 'Los parques abren en Shabat, pero conviene evitar fiestas (Sucot, Pésaj): parques llenos y ruta lenta.',
    idiomas: 'Español, inglés, hebreo.',
    notas: ['Sombrero, protector solar, 2–3 litros de agua por persona.', 'Calzado de trekking si se sube a pie; ojotas para la playa.', 'Traje de baño y toalla; no afeitarse ese día (el agua arde en la piel lastimada).', 'No meter la cabeza en el agua del Mar Muerto.'],
    referencia: {
      grupal: 'US$85–125 por persona en bus de grupo; el amanecer cuesta lo mismo en Tourist Israel.',
      privadoPublicado: 'Bein Harim US$1.059 (Masada, Qumrán, Mar Muerto) y US$1.259 (amanecer desde Tel Aviv) por grupo; Tourist Israel US$1.219 por grupo.',
      fuentes: 'Tourist Israel US$89 (estándar y amanecer); Bein Harim US$85–115; Civitatis US$111–120; GetYourGuide US$89–125; Abraham 320 ILS (350 amanecer); Viator ₪337–374. Leídos el 22-09-2026.',
    },
  },
  {
    id: 'jerusalen-belen',
    nombre: 'Jerusalén y Belén en un día',
    tipo: 'clasico',
    porQue: 'Belén aparece en los 6 catálogos, combinada con Jerusalén o sola de medio día. Es el tercer tipo de tour más ofertado.',
    duracion: '9–10 h.',
    salida: 'Jerusalén; opción con recogida en Tel Aviv.',
    recorrido: [
      { lugar: 'Monte de los Olivos, mirador', tiempo: '≈ 30 min' },
      { lugar: 'Ciudad Vieja: Muro Occidental, Vía Dolorosa, Santo Sepulcro', tiempo: '≈ 3 h' },
      { lugar: 'Almuerzo', tiempo: '≈ 45 min' },
      { lugar: 'Traslado al puesto de control y cambio a guía y vehículo locales (así lo hacen todos los operadores)', tiempo: '≈ 30 min' },
      { lugar: 'Belén: Basílica de la Natividad y Gruta', tiempo: '≈ 1 h' },
      { lugar: 'Plaza del Pesebre, Gruta de la Leche, Campo de los Pastores', tiempo: '≈ 45 min' },
      { lugar: 'Regreso a Jerusalén', tiempo: '≈ 30 min' },
    ],
    paraQuien: 'Peregrinos y primera visita que quiere ver Belén sin perder un día entero.',
    incluye: ['Guía licenciada en Jerusalén', 'Coordinación del tramo de Belén'],
    noIncluye: ['Guía y vehículo locales en Belén (a definir: ¿lo cotiza Mari o lo paga el viajero aparte?)', 'Entradas', 'Transporte', 'Comida'],
    mejorEpoca: 'Todo el año. Navidad: 24–25 de diciembre (latina), 6–7 de enero (ortodoxa), 18–19 de enero (armenia): demanda alta y calles cerradas.',
    diasAEvitar: 'Shabat en Jerusalén. Domingo a la mañana la Gruta de la Natividad se restringe por las misas. Viernes de Ramadán.',
    idiomas: 'Español, inglés, hebreo. En Belén, el guía local habitualmente en inglés o español.',
    notas: ['Pasaporte obligatorio para el cruce.', 'Ropa cubierta en la Basílica.', 'La fila para la Gruta puede pasar de 1 h en temporada.'],
    referencia: {
      grupal: 'Combinado US$99–121 por persona; Belén sola (medio día) US$75.',
      fuentes: 'Tourist Israel US$99 (Jerusalén, Belén y Mar Muerto); Bein Harim US$106 (combinado) y US$75 (Belén sola); Civitatis US$106–121; GetYourGuide US$121 (desde Tel Aviv) y US$75 (medio día); Abraham 220 ILS (desde Jerusalén); Viator ₪234 (medio día). Leídos el 22-09-2026.',
    },
  },
  {
    id: 'nazaret-galilea',
    nombre: 'Nazaret y Mar de Galilea',
    tipo: 'clasico',
    porQue: 'Está en los 6 catálogos. Es el día cristiano por excelencia fuera de Jerusalén.',
    duracion: '11–12 h (≈ 2 h de ruta por tramo).',
    salida: 'Jerusalén o Tel Aviv. Mejor con noche en Tiberíades si el grupo lo permite.',
    recorrido: [
      { lugar: 'Nazaret: Basílica de la Anunciación e Iglesia de San José', tiempo: '≈ 1 h 15' },
      { lugar: 'Caná (parada corta, opcional)', tiempo: '≈ 20 min' },
      { lugar: 'Monte de las Bienaventuranzas', tiempo: '≈ 40 min' },
      { lugar: 'Tabgha (multiplicación de los panes y Primado de Pedro)', tiempo: '≈ 30 min' },
      { lugar: 'Cafarnaúm: sinagoga y casa de Pedro', tiempo: '≈ 45 min' },
      { lugar: 'Almuerzo en Tiberíades o en un kibutz (pescado de San Pedro)', tiempo: '≈ 1 h' },
      { lugar: 'Yardenit, río Jordán (bautismo opcional)', tiempo: '≈ 40 min' },
      { lugar: 'Regreso con vista del monte Tabor', tiempo: '≈ 2 h' },
    ],
    paraQuien: 'Peregrinos, grupos parroquiales, interés bíblico. También familias en la versión con barco por el lago.',
    incluye: ['Guía licenciada todo el día'],
    noIncluye: ['Entradas (Cafarnaúm, Bienaventuranzas y Tabgha cobran entrada o piden donación)', 'Barco por el lago (opcional)', 'Túnica para el bautismo en Yardenit', 'Transporte', 'Comida'],
    mejorEpoca: 'Octubre a mayo. Febrero–abril es verde. En verano el lago pasa de 35 °C.',
    diasAEvitar: 'Domingo: en Nazaret muchos comercios cierran (sábado sí abre). Las iglesias cierran al mediodía (12–14 h): hay que ordenar las paradas.',
    idiomas: 'Español, inglés, hebreo.',
    notas: ['Ropa cubierta en las iglesias.', 'Día largo: salir 7:00.', 'Versión de 2 días con noche en Tiberíades: la venden Bein Harim y Tourist Israel a US$339–359.'],
    referencia: {
      grupal: 'US$94–108 por persona en bus de grupo.',
      privadoPublicado: 'Bein Harim "Nazareth and Sea of Galilee Private Tour" US$1.239 por grupo.',
      fuentes: 'Tourist Israel US$99; Bein Harim US$98; Civitatis US$94–100; GetYourGuide US$98–108; Abraham 360–390 ILS; Viator ₪308. Leídos el 22-09-2026.',
    },
  },
  {
    id: 'costa-norte',
    nombre: 'Costa norte: Cesarea, Haifa y Acre',
    tipo: 'clasico',
    porQue: 'Está en 5 de 6 catálogos (Abraham no lo tiene). Es el segundo día clásico desde Tel Aviv.',
    duracion: '10–11 h. Con Rosh Hanikra, sumar 1 h 30.',
    salida: 'Tel Aviv (Cesarea a ≈ 45 min). Desde Jerusalén, sumar 1 h.',
    recorrido: [
      { lugar: 'Cesarea, parque nacional: teatro, hipódromo, puerto de Herodes, acueducto', tiempo: '≈ 1 h 30' },
      { lugar: 'Haifa: Jardines Bahá’ís desde el mirador Louis (las terrazas interiores solo con visita guiada de 12:00; cerradas los miércoles)', tiempo: '≈ 45 min' },
      { lugar: 'Almuerzo en Acre (hummus o pescado en el puerto)', tiempo: '≈ 1 h' },
      { lugar: 'Acre: salas de los Hospitalarios, túnel de los Templarios, bazar, murallas y puerto', tiempo: '≈ 2 h' },
      { lugar: 'Opcional: grutas de Rosh Hanikra en teleférico', tiempo: '≈ 1 h + 40 min de ruta' },
      { lugar: 'Regreso', tiempo: '≈ 1 h 30' },
    ],
    paraQuien: 'Segunda visita, historia (romanos, cruzados, otomanos), gente que quiere mar y menos religión.',
    incluye: ['Guía licenciada todo el día'],
    noIncluye: ['Entradas: Cesarea (parque nacional), complejo de los Cruzados en Acre, teleférico de Rosh Hanikra', 'Transporte', 'Comida'],
    mejorEpoca: 'Todo el año. La costa en verano es húmeda; primavera y otoño son ideales.',
    diasAEvitar: 'Miércoles (Jardines Bahá’ís cerrados) y fiestas bahá’ís. En Shabat abren Cesarea y Acre, pero Haifa está reducida.',
    idiomas: 'Español, inglés, hebreo.',
    notas: ['Mucho a pie en Acre; sombrero.', 'Comer en Acre y no en Haifa: se aprovecha mejor el día.'],
    referencia: {
      grupal: 'US$95–120 por persona en bus de grupo.',
      privadoPublicado: 'Tourist Israel "Private Caesarea, Haifa & Akko Day Tour" US$1.219 por grupo; Bein Harim "Caesarea and Tel Aviv Private" US$1.189–1.339 por grupo desde puerto.',
      fuentes: 'Tourist Israel US$99; Bein Harim US$95 (Cesarea, Acre y Rosh Hanikra); Civitatis US$99–120; GetYourGuide US$99; Viator ₪308. Abraham: no lo ofrece. Leídos el 22-09-2026.',
    },
  },
  {
    id: 'tel-aviv-jaffa',
    nombre: 'Tel Aviv y Jaffa, con el mercado Carmel',
    tipo: 'clasico',
    porQue: 'Lo venden Tourist Israel, Bein Harim y Abraham; GetYourGuide, Viator y Civitatis tienen página de Tel Aviv con decenas de tours (relevamiento del 16-09). Es el primer día de casi todo viaje.',
    duracion: '6–7 h. Versión corta de Jaffa: 3 h.',
    salida: 'Tel Aviv (reloj de Jaffa o hotel).',
    recorrido: [
      { lugar: 'Jaffa antigua: puerto, torre del reloj, mercado de pulgas, Kikar Kedumim', tiempo: '≈ 2 h' },
      { lugar: 'Neve Tzedek (primer barrio fuera de Jaffa)', tiempo: '≈ 45 min' },
      { lugar: 'Bulevar Rothschild y la Ciudad Blanca (Bauhaus)', tiempo: '≈ 45 min' },
      { lugar: 'Mercado Carmel con degustaciones', tiempo: '≈ 1 h 15' },
      { lugar: 'Opcional: feria de Nahalat Binyamin (martes y viernes) o paseo marítimo', tiempo: '≈ 30 min' },
    ],
    paraQuien: 'Primer día del viaje, familias, cruceristas, quien quiere comida y ciudad.',
    incluye: ['Guía licenciada'],
    noIncluye: ['Degustaciones y comida', 'Transporte (se hace a pie; taxi entre Jaffa y Carmel si el grupo lo pide)'],
    mejorEpoca: 'Todo el año; en verano, húmedo: empezar temprano.',
    diasAEvitar: 'Sábado: Carmel y el mercado de pulgas cierran. Viernes cierran temprano (≈ 15 h).',
    idiomas: 'Español, inglés, hebreo.',
    notas: ['Calzado cómodo; sin código de vestimenta.', 'Las degustaciones se pueden incluir en el precio o pagar cada uno: decidir.'],
    referencia: {
      grupal: 'US$39–89 por persona: día completo US$89, Jaffa medio día US$39–49, food tour de Carmel US$49.',
      privadoPublicado: 'Bein Harim "Private Tour of Tel Aviv and Old Jaffa" US$999 por grupo.',
      fuentes: 'Tourist Israel US$89 (Tel Aviv, Jaffa y Carmel), US$49 (Jaffa), US$49 (Carmel tasting); Bein Harim US$89 (a pie), US$39 (Jaffa), US$49 (Carmel food tour); Abraham: Carmel y Levinsky 259 ILS, Jaffa free tour. Civitatis Tel Aviv US$29–49 (relevamiento 16-09-2026). Leídos el 22-09-2026.',
    },
  },
  {
    id: 'israel-7-dias',
    nombre: 'Israel esencial en 7 días (guía privada, sin hotel)',
    tipo: 'clasico',
    porQue: 'Los paquetes de 7 y 10 días están en Tourist Israel, Bein Harim, Abraham y Civitatis, y son lo que compra el viaje familiar o parroquial. Acá va la versión con guía privada; el hotel y el bus los decide Mari.',
    duracion: '7 días / 6 noches.',
    salida: 'Aeropuerto Ben Gurion o Tel Aviv.',
    recorrido: [
      { lugar: 'Día 1: Tel Aviv y Jaffa', tiempo: 'medio día' },
      { lugar: 'Día 2: Cesarea, Haifa y Acre; noche en Galilea', tiempo: 'día completo' },
      { lugar: 'Día 3: Nazaret, Mar de Galilea, Cafarnaúm; noche en Galilea', tiempo: 'día completo' },
      { lugar: 'Día 4: Golán breve o Bet Shean, río Jordán, bajada a Jerusalén', tiempo: 'día completo' },
      { lugar: 'Día 5: Jerusalén, Ciudad Vieja', tiempo: 'día completo' },
      { lugar: 'Día 6: Masada, Ein Gedi y Mar Muerto', tiempo: 'día completo' },
      { lugar: 'Día 7: Jerusalén nueva: Yad Vashem, Museo de Israel, Mahane Yehuda; o Belén', tiempo: 'día completo' },
    ],
    paraQuien: 'Primer viaje, familias, grupos chicos de comunidad o parroquia, viajeros de Argentina, México, Colombia o España que quieren todo en español.',
    incluye: ['Guía licenciada los 7 días'],
    noIncluye: ['Hoteles (los operadores los venden con hotel 3–4 estrellas y bus: por eso su precio)', 'Entradas', 'Comidas', 'Transporte'],
    mejorEpoca: 'Marzo–mayo y septiembre–noviembre. En Pésaj y Sucot los hoteles duplican precio.',
    diasAEvitar: 'Armar el orden para que Shabat caiga en Jerusalén (día 5) o en el Mar Muerto (día 6), no en Tel Aviv ni en Galilea.',
    idiomas: 'Español, inglés, hebreo.',
    notas: ['Un día de descanso o playa a mitad de semana ayuda con mayores y chicos.', 'El orden se invierte si el vuelo llega de noche a Tel Aviv.'],
    referencia: {
      grupal: '7 días con hotel y bus de grupo: US$1.211–1.429 por persona. 10 días: US$1.728–2.079.',
      privadoPublicado: 'Tourist Israel, paquetes privados de 8 a 13 días con hotel: US$4.493–8.969 por persona.',
      fuentes: 'Tourist Israel 7 días US$1.211–1.319 (Highlights, Classic, Christian), 10 días US$1.728; Bein Harim 7 días US$1.409–1.429, 10 días US$2.079; Abraham 5 días 1.200 ILS, 7 días Israel y Jordania 2.700 ILS; Civitatis 5 días US$964. Leídos el 22-09-2026.',
    },
  },
  {
    id: 'jerusalen-peregrinos',
    nombre: 'Jerusalén para peregrinos, en español',
    tipo: 'diferencial',
    porQue: 'Los tours cristianos están en 4 catálogos, todos en inglés y en bus de 30–50 personas. Un día de peregrinación en español, privado y a ritmo propio, no lo vende nadie de los seis.',
    duracion: '8–9 h. Versión de 2 días con Belén.',
    salida: 'Jerusalén (Monte de los Olivos).',
    recorrido: [
      { lugar: 'Monte de los Olivos bajando a pie: Ascensión, Pater Noster, Dominus Flevit', tiempo: '≈ 1 h' },
      { lugar: 'Getsemaní', tiempo: '≈ 30 min' },
      { lugar: 'Santa Ana y piscina de Betesda', tiempo: '≈ 30 min' },
      { lugar: 'Vía Dolorosa, las 14 estaciones', tiempo: '≈ 1 h 15' },
      { lugar: 'Basílica del Santo Sepulcro', tiempo: '≈ 1 h' },
      { lugar: 'Almuerzo', tiempo: '≈ 45 min' },
      { lugar: 'Monte Sion: Cenáculo, Dormición, San Pedro in Gallicantu', tiempo: '≈ 1 h 15' },
      { lugar: 'Opcional: misa en español (Casa Nova, Notre Dame o parroquia; coordina Mari)', tiempo: '≈ 45 min' },
    ],
    paraQuien: 'Grupos parroquiales y familias hispanohablantes; adultos mayores que necesitan ritmo pausado; quien quiere tiempo para rezar y no solo ver.',
    incluye: ['Guía licenciada en español todo el día', 'Tiempo de oración en cada sitio'],
    noIncluye: ['Entradas o donaciones (Gallicantu, Dominus Flevit)', 'Transporte', 'Comida', 'Misa: se coordina, no se cobra'],
    mejorEpoca: 'Cuaresma y Semana Santa (2027: 21–28 de marzo latina; Fuego Santo ortodoxo 1 de mayo), Adviento. Evitar julio y agosto con mayores.',
    diasAEvitar: 'Domingo por la mañana: templos con misa. Viernes a las 15 h hay procesión franciscana en la Vía Dolorosa: es un plus, conviene incluirla.',
    idiomas: 'Español. (Igual sale en inglés o hebreo.)',
    notas: ['Se baja el Monte de los Olivos, no se sube.', 'Silla de ruedas: muy difícil en la Ciudad Vieja; avisar.', 'Sombrero, agua, ropa cubierta.'],
    referencia: {
      grupal: 'Tours cristianos de grupo, en inglés: US$59–105 por persona. Paquete cristiano de 7 días con hotel: US$1.319 por persona.',
      privadoPublicado: 'Tourist Israel, paquete católico privado de 8 días con hotel: US$4.498 por persona.',
      fuentes: 'Bein Harim "Christian Jerusalem Jesus Tour" US$89 y "Christian Galilee" US$105; Tourist Israel "Christian Jerusalem" US$99, "Christian Galilee" US$59, "7 Day Christian Holy Land" US$1.319. En español: Bein Harim dice ofrecer español en sus tours de grupo; no hay producto de peregrinación en español en ninguno de los seis. Leídos el 22-09-2026.',
    },
  },
  {
    id: 'shabat-jerusalen',
    nombre: 'Shabat en Jerusalén',
    tipo: 'diferencial',
    porQue: 'Solo 2 de 6 lo tienen: Tourist Israel una cena de Shabat en Tel Aviv (privada, US$1.239 por grupo) y Abraham una "Shabbat Experience" en Jerusalén sin precio. Es lo que una guía que vive ahí puede hacer y un operador no.',
    duracion: 'Viernes de 13:00 al fin de la cena (≈ 6–7 h). Opcional: sábado por la mañana, 3 h.',
    salida: 'Jerusalén (Mahane Yehuda).',
    recorrido: [
      { lugar: 'Mahane Yehuda en la hora pico previa al cierre; compras para la cena', tiempo: '≈ 1 h 15' },
      { lugar: 'Nahlaot: callejones y sinagogas de barrio', tiempo: '≈ 30 min' },
      { lugar: 'Pausa en el hotel', tiempo: '≈ 1 h 30' },
      { lugar: 'Mea Shearim, paseo respetuoso por el borde del barrio (sin fotos, ropa cubierta)', tiempo: '≈ 30 min' },
      { lugar: 'Sirena de Shabat y bajada al Muro Occidental: recepción del Shabat, cantos', tiempo: '≈ 1 h' },
      { lugar: 'Caminata por el Barrio Judío iluminado hasta el hotel', tiempo: '≈ 30 min' },
      { lugar: 'Cena de Shabat: con familia anfitriona o en el hotel (define Mari)', tiempo: '≈ 2 h' },
      { lugar: 'Sábado opcional: Ciudad Vieja en silencio de Shabat y Museo de Israel (abre sábado)', tiempo: '≈ 3 h' },
    ],
    paraQuien: 'Judíos de la diáspora, cristianos con interés, cualquiera que quiera vivirlo y no mirarlo. Grupos chicos.',
    incluye: ['Guía licenciada', 'Explicación de qué pasa y por qué en cada momento'],
    noIncluye: ['Cena (se cotiza aparte según la opción)', 'Transporte: no hay transporte público en Shabat; todo a pie, o taxi antes del ocaso'],
    mejorEpoca: 'Todo el año. En invierno el Shabat entra 16:00–16:30 (día corto); en verano 19:00–19:30.',
    diasAEvitar: 'Cuando una fiesta cae en viernes o sábado la dinámica cambia; Tishá beAv.',
    idiomas: 'Español, inglés, hebreo.',
    notas: ['Desde el ocaso: sin fotos ni celular en el Muro y en Mea Shearim.', 'Hombros y rodillas cubiertos; hombres con kipá en el Muro.', 'No hay comercio abierto: comer antes o cena reservada.'],
    referencia: {
      grupal: 'Sin producto de grupo en los 6 catálogos.',
      privadoPublicado: 'Tourist Israel "Tel Aviv Shabbat Dinner Experience" US$1.239 por grupo.',
      fuentes: 'Tourist Israel (Tel Aviv, privado) US$1.239; Abraham "Jerusalem Shabbat Experience" sin precio en el listado. Bein Harim, Civitatis, GetYourGuide y Viator: nada en la primera página. Leídos el 22-09-2026.',
    },
  },
  {
    id: 'fiestas-jerusalen',
    nombre: 'Fiestas con guía: Semana Santa, Pésaj, Sucot',
    tipo: 'diferencial',
    porQue: 'Nadie de los seis vende Sucot, Pésaj o Rosh Hashaná con guía. Solo hay Nochebuena en Belén (Bein Harim, Abraham) y Domingo de Ramos (Bein Harim). El calendario de fiestas es el aporte de Mari en la propuesta.',
    duracion: '1 día por fiesta, o 2–3 días para cubrir la fiesta entera.',
    salida: 'Jerusalén.',
    recorrido: [
      { lugar: 'Semana Santa latina (2027: 21–28 de marzo): Domingo de Ramos, procesión desde Betfagé; Jueves Santo en el Cenáculo; Viernes Santo, Vía Crucis franciscano a las 11:00; Domingo de Pascua', tiempo: '1 día por fecha' },
      { lugar: 'Semana Santa ortodoxa (Fuego Santo 1 de mayo de 2027): acceso muy restringido; solo desde afuera', tiempo: '1 día' },
      { lugar: 'Pésaj (2027: 21–28 de abril): Birkat Kohanim en el Muro (Jol Hamoed, mañana); Jerusalén sin pan; parques y museos llenos', tiempo: '1–2 días' },
      { lugar: 'Sucot (2026: 25 sep–2 oct; 2027: 15–22 oct): Birkat Kohanim; sucot en Mea Shearim y Nahlaot; Marcha de Jerusalén; Fiesta de los Tabernáculos de la ICEJ', tiempo: '1–2 días' },
      { lugar: 'Navidad en Belén (24–25 dic latina; 6–7 ene ortodoxa; 18–19 ene armenia)', tiempo: 'tarde-noche' },
    ],
    paraQuien: 'Quien viaja en esas fechas y quiere un guía que entienda la fiesta; grupos de comunidad o parroquia que vienen justo por eso.',
    incluye: ['Guía licenciada', 'Programa armado sobre el calendario real de ese año'],
    noIncluye: ['Entradas', 'Transporte (en Yom Tov no hay transporte público)', 'Comida'],
    mejorEpoca: 'Las fechas de cada fiesta; ventana crítica 2027: 21 de abril a 2 de mayo (Pésaj + Semana Santa ortodoxa + Ridván). Hoteles al doble: reservar 6 meses antes.',
    diasAEvitar: 'El día de fiesta propio (Yom Tov) cierra todo como Shabat: primer día de Sucot y Sheminí Atzeret; primer y séptimo día de Pésaj. Se trabaja en los días intermedios (Jol Hamoed).',
    idiomas: 'Español, inglés, hebreo.',
    notas: ['Multitudes: grupos chicos y puntos de encuentro claros.', 'En 2026 el Santo Sepulcro estuvo cerrado al público en Semana Santa (benchmarks §5): confirmar con el Patriarcado cada año.', 'Hay que decidir si esto es un paquete o una versión de fecha de los otros.'],
    referencia: {
      grupal: 'Solo Navidad y Domingo de Ramos tienen producto publicado: US$99–125 por persona.',
      fuentes: 'Bein Harim "Christmas Eve in Israel: Jerusalem & Midnight Mass in Bethlehem" US$125 y "Jerusalem Palm Sunday Procession Tour" US$99; Abraham "Bethlehem Christmas Eve Tour" 340–370 ILS. Sucot, Pésaj, Rosh Hashaná: sin producto en ninguno de los seis. Leídos el 22-09-2026.',
    },
  },
];

/** Campos vacíos que Mari completa en cada paquete (se imprimen como líneas de formulario). */
export const CAMPOS_MARI: string[] = [
  'Precio privado por grupo (US$ o ILS)',
  'Precio por persona, si lo cobrás así',
  'Tamaño máximo del grupo',
  'Transporte: ¿vehículo propio, chofer, minibús? ¿Lo cotizás vos?',
  'Qué entradas incluye',
  'Notas de Mari',
];

export const PREGUNTAS_MARI: string[] = [
  '¿Cuál es tu tarifa privada por día y por medio día? ¿En dólares o en shékels? ¿Cambia según cuántas personas son?',
  '¿Tenés vehículo con permiso de turismo o trabajás con chofer o minibús? ¿Con quién? ¿Cómo lo cotizás: incluido o aparte?',
  '¿Máximo de personas por tour a pie y con vehículo?',
  '¿Todos los tours los hacés en español, inglés y hebreo? ¿Alguno solo en un idioma?',
  '¿Qué días no trabajás? ¿Hacés el viernes a la noche del paquete de Shabat?',
  'De esta lista, ¿cuáles no hacés o no querés hacer? (Belén, Golán, Petra, Néguev, amanecer en Masada…)',
  '¿Qué tours agregarías que acá no están? (Yad Vashem, Ciudad de David, Golán, Néguev, Tel Aviv de noche, Safed…)',
  '¿Qué incluís siempre (entradas, agua, auriculares) y qué cobrás aparte? ¿Cómo cobrás: seña, efectivo, transferencia?',
];
