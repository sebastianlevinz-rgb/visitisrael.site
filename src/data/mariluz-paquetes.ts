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
 *
 * Segunda tanda, 2026-09-23: sección de peregrinación cristiana. Salió de que Mariluz dijo que
 * muchos de sus clientes son cristianos que vienen a ver Jerusalén y las iglesias. Se releyeron
 * las páginas cristianas de Bein Harim (categoría y paquetes de 4, 6, 7 y 8 días), la categoría
 * de Tierra Santa de Tourist Israel con sus 15 paquetes, Civitatis Jerusalén y Abraham, más tres
 * operadores de peregrinación de fuera de Israel (206 Tours, Pilgrim Tours, Catholic Journeys)
 * para ver el estándar del itinerario de 7–10 días. Los precios son los que cada uno publica;
 * donde no publican, se dice que no publican.
 */

export const FECHA_RELEVAMIENTO = '22-09-2026';

/** Segunda tanda: el relevamiento cristiano de los paquetes de peregrinación. */
export const FECHA_RELEVAMIENTO_CRISTIANO = '23-09-2026';

export type Catalogo = { sigla: string; nombre: string; url: string; moneda: string; como: string };

export const CATALOGOS: Catalogo[] = [
  { sigla: 'TI', nombre: 'Tourist Israel', url: 'touristisrael.com/type/day-tours', moneda: 'US$', como: '39 tours de día y 46 paquetes leídos con precio' },
  { sigla: 'BH', nombre: 'Bein Harim', url: 'beinharimtours.com (categorías)', moneda: 'US$', como: 'Jerusalén, Mar Muerto, Galilea, Belén, Tel Aviv, Petra, cristianos, judíos y paquetes' },
  { sigla: 'AB', nombre: 'Abraham Tours', url: 'abrahamtours.com/tours', moneda: 'ILS', como: 'lista completa; varios sin precio en el listado' },
  { sigla: 'CV', nombre: 'Civitatis', url: 'civitatis.com/es/israel', moneda: 'US$', como: 'página país en español' },
  { sigla: 'GYG', nombre: 'GetYourGuide', url: 'getyourguide.com/israel-l169033', moneda: 'US$', como: 'primera página (25 de 387 resultados)' },
  { sigla: 'VI', nombre: 'Viator', url: 'viator.com/Israel/d919-ttd', moneda: 'ILS', como: 'primera página (20 de 500+ resultados)' },
];

/**
 * Operadores de peregrinación de fuera de Israel. No entran en la cuenta de "X de 6": son otro
 * negocio (venden el viaje entero desde el país de origen, con capellán y aéreo) y se releen
 * para saber cómo es el itinerario estándar de 7–10 días que después contrata un guía local.
 */
export type Operador = { nombre: string; url: string; que: string };

export const OPERADORES_PEREGRINACION: Operador[] = [
  {
    nombre: '206 Tours',
    url: '206tours.com',
    que: 'Católico, desde 1985. Peregrinaciones de 10 días con sacerdote capellán y misa diaria; recluta capellanes para sus salidas. No publica el precio en la página del itinerario: solo el depósito de US$500.',
  },
  {
    nombre: 'Pilgrim Tours',
    url: 'pilgrimtours.com',
    que: 'Protestante. "Best of Israel" de 10 días: US$2.679 por persona solo tierra en 2026 y US$2.129–2.779 en 2027, más US$125 de propinas, sin vuelos. Incluye el Garden Tomb y el sitio del bautismo en el Jordán; no hay misa diaria.',
  },
  {
    nombre: 'Catholic Journeys',
    url: 'catholicjourneys.com',
    que: 'Católico, con sacerdote en plantilla. Cuatro itinerarios de Tierra Santa con capellán y misa diaria. No publica precios en la página de destino.',
  },
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
  {
    tour: 'Jerusalén de Jesús: Monte de los Olivos, Vía Dolorosa, Santo Sepulcro',
    en: ['TI', 'BH', 'AB', 'CV'],
    duracion: 'Día completo; hay versión de medio día',
    salida: 'Jerusalén',
    rango: 'US$45–99 por persona. BH "Christian Jerusalem Jesus Tour" 89 (martes y viernes) y "Mount of Olives, Temple Mount, Dome of the Rock" 89 (miércoles); BH Jerusalén día completo 75 y medio día 50; CV "Tour por el Monte de los Olivos" 45 y "Jerusalén al completo" 75. AB "Mount of Olives Tour" y "Holy City Tour Jerusalem": sin precio en el listado de hoy.',
    nota: 'Tourist Israel no lo vende suelto: lo pone como día fijo ("Christian Jerusalem day tour") en sus nueve paquetes cristianos. Leído el 23-09-2026.',
  },
  {
    tour: 'Belén, Jericó y el sitio del bautismo (Qasr el Yahud)',
    en: ['TI', 'BH', 'CV'],
    duracion: 'Día completo 8–9 h; Belén sola 4–5 h',
    salida: 'Jerusalén',
    rango: 'US$75–125 por persona. BH "Bethlehem & Church of the Nativity" 75, "Bethlehem and Jericho" 125 (con Qasr al-Yahud), "Jericho, Dead Sea and the Jordan River" 116; CV "Excursión a Belén" desde 75, "Belén y Jericó" 125, "Excursión a Jericó" 116.',
    nota: 'El sitio del bautismo no se vende solo en ninguno de los 6: siempre va colgado de Jericó, del Mar Muerto o del día de Galilea. Leído el 23-09-2026.',
  },
  {
    tour: 'Galilea cristiana: Bienaventuranzas, Tabgha, Cafarnaúm, Magdala, barco',
    en: ['TI', 'BH'],
    segunAuditoria: ['AB', 'CV', 'GYG', 'VI'],
    duracion: '10–12 h',
    salida: 'Tel Aviv, Jerusalén o Haifa (puerto)',
    rango: 'BH "Christian Galilee Tour" US$105 desde Tel Aviv, 115 desde Jerusalén y 125 desde Herzliya, solo los jueves, con Magdala, Ginosar, Bienaventuranzas y Caná, sin paseo en barco. BH "Nazareth and Sea of Galilee" 98 y 120 desde el puerto de Haifa. TI lo pone como día fijo de sus paquetes (Cafarnaúm, Tabgha, Yardenit, Nazaret).',
    nota: 'La versión genérica (Nazaret + Mar de Galilea) está en los 6 y ya cubre Anunciación, Cafarnaúm, Tabgha y Yardenit. La versión temática cristiana, con Magdala y Caná, solo en 2. Leído el 23-09-2026.',
  },
  {
    tour: 'Paquete cristiano de varios días con hotel (3 a 13 días)',
    en: ['TI', 'BH', 'AB'],
    duracion: '3–13 días',
    salida: 'Ben Gurion, Tel Aviv o Jerusalén',
    rango: 'TI: 3 días US$568, 4 días 841, 5 días 1.027, 6 días 1.099, 7 días 1.319, 8 días 1.542, 9 días 1.599, 10 días con Jordania 2.923, 13 días con Jordania 3.536. BH, según categoría de hotel (turista / primera / superior / lujo): 4 días 849–1.359, 6 días 1.349–2.199, 7 días 1.459–2.479, 8 días 1.629–2.819. AB: Jesus Trail a pie, 5 días.',
    nota: 'Los cuatro días que se repiten en todos: Galilea (Nazaret, Cafarnaúm, Tabgha), Belén con Jericó y Qasr el Yahud, Ciudad Vieja, y "en los pasos de Jesús". El quinto, siempre, es Masada y el Mar Muerto, que de cristiano no tiene nada. Leído el 23-09-2026.',
  },
  {
    tour: 'Peregrinación separada por confesión (católica o protestante)',
    en: ['TI'],
    duracion: '8–11 días, privado',
    salida: 'Tel Aviv',
    rango: 'TI: 8 días católico US$4.498 por persona, 10 días católico 6.265, 10 días católico con Jordania 5.143, 9 días protestante 6.046, 11 días protestante con Jordania 7.429.',
    nota: 'Es el único de los 6 que separa el producto por confesión. Fuera de Israel es el formato normal: 206 Tours y Catholic Journeys con capellán y misa diaria, Pilgrim Tours con Garden Tomb y bautismo en el Jordán (US$2.129–2.779 en 2027, solo tierra). Leído el 23-09-2026.',
  },
  {
    tour: 'Semana Santa en Jerusalén con guía',
    en: ['BH'],
    duracion: 'Un día por fecha',
    salida: 'Jerusalén',
    rango: 'BH "Jerusalem Palm Sunday Procession Tour" US$99, los domingos. Jueves Santo, Viernes Santo, Vigilia y Pascua: sin producto en ninguno de los 6.',
    nota: 'Los operadores de peregrinación venden la semana entera, con meses de anticipación y con capellán propio. En 2027 la Pascua latina cae el 28 de marzo y la ortodoxa el 2 de mayo: son dos semanas distintas. Leído el 23-09-2026.',
  },
];

export type Parada = { lugar: string; tiempo: string };

export type Paquete = {
  id: string;
  nombre: string;
  tipo: 'clasico' | 'diferencial' | 'peregrinacion';
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

  // ── Peregrinación cristiana (relevamiento del 23-09-2026) ────────────────────────────────
  {
    id: 'jerusalen-de-jesus',
    nombre: 'Jerusalén de Jesús, en un día',
    tipo: 'peregrinacion',
    porQue: 'Es el día que repiten todos. Bein Harim lo vende suelto ("Christian Jerusalem Jesus Tour", US$89, martes y viernes) y Tourist Israel lo pone como día fijo en sus nueve paquetes cristianos. Ojo: se pisa con el paquete 8 (Jerusalén para peregrinos). Mari: decidí si son dos productos o uno solo.',
    duracion: '8–9 h a pie, bajando el Monte de los Olivos. Versión de medio día (4 h): Vía Dolorosa y Santo Sepulcro.',
    salida: 'Jerusalén, arriba del Monte de los Olivos (se sube en taxi o minibús hasta el mirador).',
    recorrido: [
      { lugar: 'Mirador del Monte de los Olivos: la ciudad entera, el valle de Cedrón, el cementerio', tiempo: '≈ 20 min' },
      { lugar: 'Capilla de la Ascensión y Pater Noster', tiempo: '≈ 40 min' },
      { lugar: 'Dominus Flevit, bajando a pie', tiempo: '≈ 20 min' },
      { lugar: 'Getsemaní: los olivos viejos e Iglesia de Todas las Naciones', tiempo: '≈ 40 min' },
      { lugar: 'Tumba de María y subida a la Puerta de los Leones', tiempo: '≈ 30 min' },
      { lugar: 'Santa Ana y piscina de Betesda', tiempo: '≈ 30 min' },
      { lugar: 'Vía Dolorosa, estaciones I a IX', tiempo: '≈ 1 h' },
      { lugar: 'Basílica del Santo Sepulcro: Gólgota, Piedra de la Unción, Edículo', tiempo: '≈ 1 h 15' },
      { lugar: 'Almuerzo en el Barrio Cristiano', tiempo: '≈ 45 min' },
      { lugar: 'Monte Sion: Cenáculo, Dormición, San Pedro in Gallicantu', tiempo: '≈ 1 h 15' },
    ],
    paraQuien: 'Peregrinos de cualquier confesión cristiana, grupos parroquiales, y quien tiene un solo día en Jerusalén y quiere los sitios de la Pasión. Se camina mucho y hay escaleras.',
    incluye: ['Guía licenciada en español todo el día', 'Orden de las paradas armado sobre el horario real de cierre de cada iglesia', 'Tiempo de silencio o de oración en Getsemaní y en el Santo Sepulcro'],
    noIncluye: ['Entradas y donaciones (Gallicantu, Dominus Flevit, Ascensión)', 'Subida en vehículo al Monte de los Olivos', 'Transporte', 'Comida', 'Misa o culto: se coordina con la parroquia; la guía no lo oficia'],
    mejorEpoca: 'Todo el año; mejor marzo–mayo y octubre–noviembre. Cuaresma y Adviento son los meses de más peregrinos.',
    diasAEvitar: 'Domingo a la mañana: las iglesias están con misa y el Santo Sepulcro se llena. Viernes a las 15:00 hay procesión franciscana por la Vía Dolorosa: es un plus, conviene incluirla.',
    idiomas: 'Español, inglés, hebreo.',
    notas: [
      'Vestimenta: hombros y rodillas cubiertos en todas las iglesias. En verano, llevar un pañuelo o una camisa liviana para ponerse encima.',
      'Casi todas las iglesias cierran al mediodía, más o menos de 12:00 a 14:00. El Santo Sepulcro no cierra, pero esa es su peor hora.',
      'La guía no oficia ni interpreta teología: acompaña, explica historia y arqueología y coordina la logística. La misa, el culto o la lectura los lleva el sacerdote, el pastor o el responsable del grupo.',
      'Se baja el Monte de los Olivos, no se sube: son 45 minutos de pendiente y adoquín.',
      'Silla de ruedas: la Ciudad Vieja es muy difícil. Hay que avisar antes para armar otro orden.',
    ],
    referencia: {
      grupal: 'US$45–99 por persona, en bus de grupo y en inglés.',
      fuentes: 'Bein Harim "Christian Jerusalem Jesus Tour" US$89 (martes y viernes) y "Mount of Olives, Temple Mount, Dome of the Rock" US$89 (miércoles); Bein Harim Jerusalén día completo US$75 y medio día US$50; Civitatis "Tour por el Monte de los Olivos" US$45 y "Visita guiada por Jerusalén al completo" desde US$75; Tourist Israel lo incluye como día fijo ("Christian Jerusalem day tour") en sus paquetes cristianos; Abraham tiene "Mount of Olives Tour" y "Holy City Tour Jerusalem", sin precio en el listado de hoy. Leídos el 23-09-2026.',
    },
  },
  {
    id: 'belen-natividad',
    nombre: 'Belén y la Natividad',
    tipo: 'peregrinacion',
    porQue: 'Belén está en los seis catálogos, sola de medio día o pegada a Jerusalén y a Jericó. Es el segundo sitio que pide todo peregrino cristiano y el que más explicación logística necesita.',
    duracion: 'Medio día 4–5 h. Día completo 8–9 h sumando Jericó y el sitio del bautismo.',
    salida: 'Jerusalén. Desde Tel Aviv, sumar 1 h por tramo.',
    recorrido: [
      { lugar: 'Salida de Jerusalén y llegada al puesto de control', tiempo: '≈ 30 min' },
      { lugar: 'Cambio a guía y vehículo locales: Belén está bajo administración de la Autoridad Palestina y las licencias de guía israelíes no valen del otro lado, así que todos los operadores hacen el mismo cambio en el control', tiempo: '≈ 20 min' },
      { lugar: 'Campo de los Pastores, en Beit Sahour', tiempo: '≈ 30 min' },
      { lugar: 'Plaza del Pesebre', tiempo: '≈ 15 min' },
      { lugar: 'Basílica de la Natividad: Puerta de la Humildad, la nave y la Gruta', tiempo: '≈ 1 h 15' },
      { lugar: 'Santa Catalina y las grutas de San Jerónimo', tiempo: '≈ 30 min' },
      { lugar: 'Gruta de la Leche', tiempo: '≈ 20 min' },
      { lugar: 'Almuerzo y tiempo en los talleres de madera de olivo', tiempo: '≈ 1 h' },
      { lugar: 'Opcional, día completo: Jericó, Monte de la Tentación en teleférico y Qasr el Yahud', tiempo: '≈ 3 h' },
      { lugar: 'Regreso a Jerusalén y control de salida', tiempo: '≈ 40 min' },
    ],
    paraQuien: 'Todo peregrino cristiano, y también turistas sin interés religioso que quieren ver la Natividad. En Adviento y Navidad, con reserva muy anticipada.',
    incluye: ['Guía licenciada en español hasta el puesto de control', 'Coordinación del guía y el vehículo locales del otro lado', 'Horario armado para esquivar la fila de la Gruta'],
    noIncluye: ['Guía y vehículo locales en Belén (a definir: ¿lo cotiza Mari o lo paga el viajero aparte?)', 'Entradas y donaciones', 'Transporte', 'Comida', 'Misa en la Natividad o en el Campo de los Pastores: la reserva la hace la parroquia o el operador, no la guía'],
    mejorEpoca: 'Todo el año. Navidad: 24–25 de diciembre (latina), 6–7 de enero (ortodoxa), 18–19 de enero (armenia), con demanda alta y calles cortadas.',
    diasAEvitar: 'Domingo a la mañana: la Gruta se restringe por las misas. Viernes de Ramadán: el tránsito se complica. En las tres Navidades la Plaza del Pesebre está cortada y se entra a pie.',
    idiomas: 'Español, inglés y hebreo de este lado. Del lado de Belén, el guía local suele trabajar en árabe, inglés o español.',
    notas: [
      'Pasaporte obligatorio para el cruce, a la ida y a la vuelta. Sin pasaporte no se entra ni se sale.',
      'El control puede demorar. En temporada alta conviene dejar 45 minutos de colchón antes de cualquier cosa con hora fija.',
      'Ropa cubierta en la Basílica. La Puerta de la Humildad obliga a agacharse: avisarlo antes evita golpes.',
      'La fila para bajar a la Gruta puede pasar la hora. Primera hora de la mañana o última de la tarde es cuando menos hay.',
      'Preguntar en qué moneda cobran los talleres y los comercios: conviene llevar efectivo chico.',
      'La guía no oficia ni interpreta teología: acompaña, explica historia y arqueología y coordina la logística.',
    ],
    referencia: {
      grupal: 'Medio día US$75 por persona; con Jericó, US$125; combinado con Jerusalén, US$106–121.',
      fuentes: 'Bein Harim "Bethlehem & Church of the Nativity Day Tour" US$75 (todos los días), "Bethlehem and Jericho Tour" US$125 (lunes, miércoles y sábado) y "Jerusalem and Bethlehem Tour" US$106; Civitatis "Excursión a Belén" desde US$75, "Belén y Jericó" US$125, "Visita guiada por Jerusalén + Belén" desde US$106 y "Belén y Jerusalén para cruceros" desde US$120; Tourist Israel pone "Bethlehem, Jericho and Jordan River" como día fijo de sus paquetes cristianos; Abraham vende Belén desde Jerusalén, desde Tel Aviv y en versión privada, sin precio en el listado de hoy. Leídos el 23-09-2026.',
    },
  },
  {
    id: 'galilea-cristiana',
    nombre: 'Galilea cristiana en un día',
    tipo: 'peregrinacion',
    porQue: 'La versión genérica (Nazaret y Mar de Galilea) está en los seis catálogos; la versión temática, con Magdala, Caná y barco, solo en dos. Es el día que un grupo parroquial pide entero y que el bus de 40 personas hace a las corridas.',
    duracion: '11–12 h desde Jerusalén o Tel Aviv (≈ 2 h de ruta por tramo). Con noche en Tiberíades o Nazaret, se hace en dos días sin apuro.',
    salida: 'Jerusalén o Tel Aviv. Mejor, dormir la noche anterior en Galilea y arrancar desde ahí.',
    recorrido: [
      { lugar: 'Nazaret: Basílica de la Anunciación, la Gruta y los mosaicos que mandó cada país', tiempo: '≈ 1 h 15' },
      { lugar: 'Iglesia de San José y el pozo de María', tiempo: '≈ 30 min' },
      { lugar: 'Caná: la iglesia del Matrimonio; los grupos de casados suelen renovar votos ahí', tiempo: '≈ 30 min' },
      { lugar: 'Monte de las Bienaventuranzas: iglesia octogonal y jardín con vista al lago', tiempo: '≈ 45 min' },
      { lugar: 'Tabgha: Multiplicación de los panes y los peces, y Primado de Pedro', tiempo: '≈ 45 min' },
      { lugar: 'Cafarnaúm: la sinagoga blanca y la casa de Pedro', tiempo: '≈ 45 min' },
      { lugar: 'Almuerzo en Tiberíades o en un kibutz (pescado de San Pedro)', tiempo: '≈ 1 h' },
      { lugar: 'Barco de madera por el Mar de Galilea, de Ginosar a Cafarnaúm o ida y vuelta', tiempo: '≈ 45 min' },
      { lugar: 'Opcional: Magdala (sinagoga del siglo I y capilla Duc in Altum) o Yardenit', tiempo: '≈ 45 min' },
      { lugar: 'Regreso pasando por el monte Tabor', tiempo: '≈ 2 h' },
    ],
    paraQuien: 'Grupos parroquiales, grupos de estudio bíblico y familias. El barco lo disfrutan también los chicos y los que no vienen por religión.',
    incluye: ['Guía licenciada en español todo el día', 'Orden armado sobre el cierre del mediodía de cada santuario', 'Reserva del barco y de Magdala, si el grupo los pide'],
    noIncluye: ['Entradas y donaciones: Cafarnaúm, Bienaventuranzas, Tabgha, Magdala', 'Barco por el lago', 'Túnica y certificado si alguien se bautiza en Yardenit', 'Transporte', 'Comida', 'Misa o culto en los santuarios: se reservan con anticipación y la reserva la hace la parroquia o el operador'],
    mejorEpoca: 'Octubre a mayo. De febrero a abril Galilea está verde y con flor. En julio y agosto el lago pasa de 35 °C y hay humedad.',
    diasAEvitar: 'Las iglesias cierran de 12:00 a 14:00: si se llega tarde a Nazaret, se pierde la Anunciación. Domingo: en Nazaret muchos comercios cierran (el sábado sí abren).',
    idiomas: 'Español, inglés, hebreo.',
    notas: [
      'Día largo: salir 7:00 o dormir en Galilea. Dos noches en Tiberíades o Nazaret cambian el viaje.',
      'Vestimenta cubierta en todos los santuarios; hay control en la puerta de la Anunciación.',
      'El cierre del mediodía manda: el almuerzo se arma alrededor de eso y no al revés.',
      'El barco y Magdala se reservan; el resto no hace falta, salvo en Semana Santa.',
      'La guía no oficia ni interpreta teología: acompaña, explica historia y arqueología y coordina la logística.',
    ],
    referencia: {
      grupal: 'US$94–120 por persona en bus de grupo.',
      privadoPublicado: 'Bein Harim "Nazareth and Sea of Galilee Private Tour" US$1.239 por grupo (relevamiento del 22-09-2026).',
      fuentes: 'Bein Harim "Christian Galilee Tour" US$105 desde Tel Aviv, US$115 desde Jerusalén y US$125 desde Herzliya, solo los jueves, con Magdala, Ginosar, Bienaventuranzas y Caná, y sin paseo en barco; Bein Harim "Nazareth and Sea of Galilee Tour" US$98 (con Cafarnaúm, Tabgha y Yardenit) y US$120 desde el puerto de Haifa; Civitatis "Excursión a Nazaret, Tiberíades y Galilea" desde US$94 (Tel Aviv) y US$100 (Jerusalén); Tourist Israel lo pone como día fijo de sus paquetes cristianos (Cafarnaúm, Tabgha, Yardenit, Nazaret); Abraham vende Galilea de grupo y privada, sin precio en el listado de hoy. Leídos el 23-09-2026.',
    },
  },
  {
    id: 'jordan-bautismo',
    nombre: 'Bautismo en el Jordán, con Jericó o el Mar Muerto',
    tipo: 'peregrinacion',
    porQue: 'Ninguno de los seis lo vende como producto propio: Yardenit y Qasr el Yahud van siempre colgados del día de Galilea o del de Belén y Jericó, con veinte minutos de parada. Un grupo que viene a bautizarse necesita tiempo, vestuario y un horario reservado.',
    duracion: 'Día completo 8–9 h. Medio día 5 h si es solo Qasr el Yahud y el Mar Muerto.',
    salida: 'Jerusalén (Qasr el Yahud a ≈ 50 min) o Tiberíades (Yardenit a ≈ 20 min).',
    recorrido: [
      { lugar: 'Bajada por el desierto de Judea: Posada del Buen Samaritano y el cartel del nivel del mar', tiempo: '≈ 45 min' },
      { lugar: 'Qasr el Yahud, sobre el Jordán: el sitio tradicional del bautismo de Jesús, con vestuarios, escalera al agua y plataforma', tiempo: '≈ 1 h 30' },
      { lugar: 'Jericó: el tel, el sicomoro de Zaqueo y el Monte de la Tentación en teleférico', tiempo: '≈ 2 h' },
      { lugar: 'Almuerzo en Jericó o en el kibutz del Mar Muerto', tiempo: '≈ 1 h' },
      { lugar: 'Opción A: Mar Muerto, flotación y barro en Kalia o Ein Bokek', tiempo: '≈ 1 h 30' },
      { lugar: 'Opción B: Qumrán, donde aparecieron los rollos', tiempo: '≈ 1 h' },
      { lugar: 'Alternativa del norte: Yardenit, a la salida del Mar de Galilea, con túnicas, vestuarios y certificado', tiempo: '≈ 1 h 30' },
      { lugar: 'Regreso', tiempo: '≈ 1 h' },
    ],
    paraQuien: 'Grupos que vienen con un bautismo o una renovación de promesas bautismales ya programada, sobre todo evangélicos y protestantes. También quien quiere el Jordán sin el apuro del bus.',
    incluye: ['Guía licenciada en español', 'Coordinación del horario con el sitio: los dos tienen hora de cierre y se llenan con los buses de la mañana'],
    noIncluye: ['Túnica, toalla, vestuario y certificado (Yardenit los alquila y los vende)', 'Entradas: teleférico del Monte de la Tentación, Qumrán, playa del Mar Muerto', 'Transporte', 'Comida', 'El bautismo en sí: lo oficia el pastor o el sacerdote del grupo; la guía coordina lugar y hora, nada más'],
    mejorEpoca: 'Octubre a abril. En verano el valle del Jordán pasa de 40 °C.',
    diasAEvitar: 'Qasr el Yahud se llena de buses entre las 9:00 y las 11:00: ir temprano o después de las 14:00. En Epifanía (enero, con dos fechas según el calendario) hay ceremonias de las iglesias y mucha gente: confirmar las fechas cada año.',
    idiomas: 'Español, inglés, hebreo.',
    notas: [
      'Son dos sitios distintos y conviene explicarlo antes: Qasr el Yahud, cerca de Jericó, es el tradicional del bautismo de Jesús; Yardenit, a la salida del Mar de Galilea, es un sitio preparado para bautismos, con instalaciones. Muchos itinerarios pasan por los dos.',
      'Confirmar el día anterior que el sitio esté abierto y preguntar por el estado del agua: el nivel y la limpieza del río cambian.',
      'Llevar ropa de cambio, toalla y ojotas: el fondo tiene barro.',
      'Hombros y rodillas cubiertos fuera del agua.',
      'La guía no oficia ni interpreta teología: acompaña, explica historia y arqueología y coordina la logística.',
    ],
    referencia: {
      grupal: 'No hay producto suelto. El precio publicado es el del día combinado: US$116–125 por persona.',
      fuentes: 'Bein Harim "Jericho, Dead Sea and the Jordan River Tour" US$116 (jueves) y "Bethlehem and Jericho Tour" US$125, que incluye Qasr al-Yahud; Civitatis "Excursión a Jericó" US$116 y "Belén y Jericó" US$125; Tourist Israel pone Qasr al Yahud en el día de Belén y Jericó, y Yardenit en el día de Galilea, en todos sus paquetes cristianos; Bein Harim pone Yardenit en "Nazareth and Sea of Galilee" (US$98) y Qasr el Yahud en el día 4 de sus paquetes de 4, 6, 7 y 8 días; Pilgrim Tours incluye el sitio del bautismo en el día 5 de su paquete de 10 días. Leídos el 23-09-2026.',
    },
  },
  {
    id: 'semana-santa-jerusalen',
    nombre: 'Semana Santa en Jerusalén, día por día',
    tipo: 'peregrinacion',
    porQue: 'De los seis, solo Bein Harim vende un día suelto de la semana: la procesión del Domingo de Ramos, US$99. Los operadores de peregrinación arman la semana entera con meses de anticipación y con capellán propio. Lo que falta es una guía local que conozca el calendario real de cada año.',
    duracion: 'Un día por fecha, o la semana entera.',
    salida: 'Jerusalén.',
    recorrido: [
      { lugar: 'Domingo de Ramos: misa temprano en el Santo Sepulcro y, a la tarde, la procesión con palmas desde Betfagé, bajando el Monte de los Olivos hasta Santa Ana', tiempo: 'tarde entera' },
      { lugar: 'Lunes a miércoles santos: los días buenos para los sitios que el resto de la semana están imposibles (Ein Karem, Betania, Monte Sion)', tiempo: 'día completo' },
      { lugar: 'Jueves Santo: Cenáculo en el Monte Sion y, a la tarde, Getsemaní', tiempo: 'medio día' },
      { lugar: 'Viernes Santo: Vía Crucis franciscano por la Vía Dolorosa a media mañana; hay que tomar posición temprano', tiempo: 'mañana' },
      { lugar: 'Sábado Santo y Vigilia Pascual en el Santo Sepulcro: acceso limitado y control policial', tiempo: 'noche' },
      { lugar: 'Domingo de Pascua latina', tiempo: 'mañana' },
      { lugar: 'Calendario ortodoxo, que cae en otra fecha: en 2027 la Pascua latina es el 28 de marzo y la ortodoxa el 2 de mayo. El Sábado del Fuego Santo (1 de mayo de 2027) el Santo Sepulcro se cierra con cupo y la Ciudad Vieja se corta: se ve desde afuera', tiempo: 'día' },
    ],
    paraQuien: 'Grupos parroquiales y familias que viajan justo esa semana; quien ya conoce Jerusalén y vuelve por las ceremonias.',
    incluye: ['Guía licenciada en español', 'Programa armado sobre el calendario real de ese año: las fechas se mueven y los dos calendarios casi nunca coinciden', 'Puntos de encuentro y hora de posicionamiento para cada procesión'],
    noIncluye: ['Acceso a las celebraciones: lo maneja cada custodia o patriarcado, no la guía', 'Entradas', 'Transporte', 'Comida', 'Alojamiento: en Semana Santa hay que reservar con seis a nueve meses'],
    mejorEpoca: 'Las fechas propias. 2027: Domingo de Ramos latino el 21 de marzo y Pascua latina el 28 de marzo; Domingo de Ramos ortodoxo el 25 de abril y Pascua ortodoxa el 2 de mayo.',
    diasAEvitar: 'No hay días a evitar: hay horas. El Santo Sepulcro entre las 10:00 y las 14:00 del Viernes Santo es inmanejable con un grupo grande o con mayores. En 2027, Pésaj (21–28 de abril) se superpone con la semana ortodoxa: la ciudad está el doble de llena.',
    idiomas: 'Español, inglés, hebreo.',
    notas: [
      'La guía no oficia ni interpreta teología: acompaña, explica qué está pasando, quién lo celebra y por qué, y resuelve la logística. Las celebraciones las llevan las iglesias.',
      'Los horarios los publican cada año la Custodia de Tierra Santa y los patriarcados, y se confirman semanas antes, no meses. No se puede vender un horario fijo con un año de anticipación.',
      'Grupos chicos y un punto de reencuentro fijo: con esa cantidad de gente, un grupo grande se parte.',
      'En 2026 el Santo Sepulcro estuvo cerrado al público en Semana Santa: confirmar el estado con el Patriarcado antes de vender la fecha.',
      'Vestimenta cubierta, siempre, y más esa semana.',
    ],
    referencia: {
      grupal: 'Único producto publicado de la semana: US$99 por persona, la procesión del Domingo de Ramos.',
      fuentes: 'Bein Harim "Jerusalem Palm Sunday Procession Tour" US$99 (domingos) y "Christmas Eve in Israel: Jerusalem & Midnight Mass in Bethlehem" US$125. Tourist Israel, Abraham, Civitatis, GetYourGuide y Viator: sin producto de Semana Santa visto. 206 Tours vende la semana como peregrinación con capellán y no publica el precio en la página del itinerario. Leídos el 23-09-2026.',
    },
  },
  {
    id: 'peregrinacion-7-dias',
    nombre: 'Peregrinación de 7 días con guía privada',
    tipo: 'peregrinacion',
    porQue: 'Es el estándar del nicho. Bein Harim lo vende en 4, 6, 7 y 8 días (US$849–2.819 con hotel) y Tourist Israel en 3, 4, 5, 6, 7, 8, 9, 10 y 13 días (US$568–3.536). Los días que se repiten en todos son los mismos cuatro: Galilea, Belén con Jericó y el Jordán, Ciudad Vieja, y "en los pasos de Jesús". Acá va la versión con guía privada en español; el hotel y el bus los decide Mari.',
    duracion: '7 días / 6 noches: Galilea 2–3 días, Jerusalén 3–4.',
    salida: 'Ben Gurion o Tel Aviv. El orden se invierte si el vuelo llega de noche.',
    recorrido: [
      { lugar: 'Día 1: llegada y traslado; noche en Tel Aviv o en Nazaret. Si queda tiempo, Jaffa y la iglesia de San Pedro', tiempo: 'medio día' },
      { lugar: 'Día 2: subida por la costa, Cesarea Marítima y el monte Carmelo; Nazaret, Anunciación y San José; noche en Galilea', tiempo: 'día completo' },
      { lugar: 'Día 3: Galilea cristiana: Bienaventuranzas, Tabgha, Cafarnaúm, Magdala y barco por el lago; noche en Galilea', tiempo: 'día completo' },
      { lugar: 'Día 4: monte Tabor, Caná y Yardenit; bajada por el valle del Jordán a Jerusalén', tiempo: 'día completo' },
      { lugar: 'Día 5: Jerusalén, el día de la Pasión: Monte de los Olivos, Getsemaní, Vía Dolorosa, Santo Sepulcro, Monte Sion', tiempo: 'día completo' },
      { lugar: 'Día 6: Belén y Jericó, con Qasr el Yahud y el Monte de la Tentación', tiempo: 'día completo' },
      { lugar: 'Día 7: Ciudad Vieja completa (Muro, Cardo, los cuatro barrios) o Ein Karem y Emaús; salida', tiempo: 'día completo' },
      { lugar: 'Si el grupo suma días: Masada, Ein Gedi y el Mar Muerto, que todos los operadores meten aunque de cristiano no tenga nada', tiempo: '1 día' },
    ],
    paraQuien: 'Grupos parroquiales, comunidades y familias hispanohablantes de Argentina, México, Colombia o España: el grupo que hoy compra el paquete en inglés y en bus de 40 personas porque no encuentra otra cosa.',
    incluye: ['Guía licenciada en español los 7 días', 'Orden armado según el calendario del grupo: fiestas, Shabat y el cierre del mediodía de las iglesias', 'Coordinación con las parroquias o los santuarios donde el grupo vaya a celebrar'],
    noIncluye: ['Hoteles: los operadores los venden con hotel y bus, por eso su precio incluye todo', 'Bus y chofer', 'Entradas y donaciones', 'Comidas', 'El tramo de Belén, que se cotiza con guía local', 'Misas o cultos: los lleva el capellán del grupo y la reserva la hace la parroquia o el operador'],
    mejorEpoca: 'Marzo–mayo y septiembre–noviembre. Cuaresma, Semana Santa y Adviento son la temporada del nicho, y son las fechas más caras y más llenas.',
    diasAEvitar: 'Armar el orden para que el Shabat caiga en Jerusalén o en Galilea, no en un día de ruta larga. En Pésaj y Sucot los hoteles duplican precio.',
    idiomas: 'Español, inglés, hebreo.',
    notas: [
      'Galilea 2–3 noches y Jerusalén 3–4 es lo que hacen todos: mover el hotel una sola vez ahorra medio día de bus.',
      'Pilgrim Tours, en su paquete de 10 días, agrega Dan, Cesarea de Filipo, Betsaida, Corazín y el monte Arbel. Si el grupo es de estudio bíblico, esos son los sitios que van a pedir.',
      'Las iglesias cierran de 12:00 a 14:00: el almuerzo se arma alrededor de eso, no al revés.',
      'La guía no oficia ni interpreta teología: acompaña, explica historia y arqueología y coordina la logística.',
      'Vestimenta cubierta todos los días y calzado cerrado: es una semana entera de piedra y escalón.',
    ],
    referencia: {
      grupal: 'Con hotel, bus y guía, en inglés: 7 días US$1.319 (Tourist Israel) y US$1.459–2.479 (Bein Harim, según categoría de hotel).',
      privadoPublicado: 'Tourist Israel, paquetes privados con hotel: 8 días católico US$4.498 por persona, 9 días protestante US$6.046, 10 días católico US$6.265, 10 días católico con Jordania US$5.143, 11 días protestante con Jordania US$7.429.',
      fuentes: 'Bein Harim, paquetes cristianos (turista / primera / superior / lujo): 4 días US$849 / 969 / 1.100 / 1.359; 6 días 1.349 / 1.549 / 1.767 / 2.199; 7 días 1.459 / 1.699 / 1.960 / 2.479; 8 días 1.629 / 1.909 / 2.214 / 2.819. Tourist Israel: 3 días US$568, 4 días 841, 5 días 1.027, 6 días 1.099, 7 días 1.319, 8 días 1.542, 9 días 1.599, 10 días con Jordania 2.923, 13 días con Jordania 3.536. Pilgrim Tours "Best of Israel" 10 días, solo tierra: US$2.679 en 2026 y US$2.129–2.779 en 2027, más US$125 de propinas y sin vuelos. Leídos el 23-09-2026.',
    },
  },
  {
    id: 'grupos-evangelicos',
    nombre: 'Grupos protestantes y evangélicos',
    tipo: 'peregrinacion',
    porQue: 'Tourist Israel es el único de los seis que separa el producto por confesión: tiene un paquete privado protestante de 9 días (US$6.046) y otro de 11 con Jordania (US$7.429). El itinerario cambia de verdad: entra el Garden Tomb, el bautismo en el Jordán pesa mucho más y no hay misa diaria.',
    duracion: '7–10 días. También sale como día suelto en Jerusalén.',
    salida: 'Tel Aviv o Galilea.',
    recorrido: [
      { lugar: 'Galilea: Cafarnaúm, Bienaventuranzas, Tabgha, Magdala y barco por el lago, con tiempo de lectura a bordo', tiempo: '2 días' },
      { lugar: 'Bautismo o renovación de promesas en el Jordán: Yardenit al norte, Qasr el Yahud al sur', tiempo: 'medio día' },
      { lugar: 'Bet Shean, Meguido y el monte Carmelo, que es lo que pide el grupo de estudio bíblico', tiempo: '1 día' },
      { lugar: 'Jerusalén: Monte de los Olivos, Getsemaní, Vía Dolorosa y Santo Sepulcro', tiempo: '1 día' },
      { lugar: 'Garden Tomb: jardín, tumba excavada y salas de grupo; es el sitio de referencia del mundo protestante para la sepultura y la resurrección', tiempo: '≈ 1 h 30' },
      { lugar: 'Ciudad de David, túnel de Ezequías y las excavaciones del muro sur', tiempo: 'medio día' },
      { lugar: 'Belén, Jericó y el Monte de la Tentación', tiempo: '1 día' },
      { lugar: 'Masada, Ein Gedi, Qumrán y el Mar Muerto', tiempo: '1 día' },
    ],
    paraQuien: 'Grupos evangélicos, bautistas, pentecostales y protestantes en general, con su pastor; grupos de estudio bíblico.',
    incluye: ['Guía licenciada en español', 'Tiempos largos de lectura y de canto en cada sitio, que es lo que este grupo pide y el bus de 40 no da', 'Coordinación del turno en el Garden Tomb y del horario en el sitio del bautismo'],
    noIncluye: ['Entradas y donaciones', 'El bautismo y el culto: los lleva el pastor; la guía coordina lugar, hora y logística', 'Transporte', 'Comidas', 'Alojamiento'],
    mejorEpoca: 'Marzo–mayo y septiembre–noviembre. En Sucot llegan muchos grupos evangélicos por la Fiesta de los Tabernáculos de la ICEJ y la Marcha de Jerusalén.',
    diasAEvitar: 'Confirmar siempre el horario y el cupo del Garden Tomb y del sitio del bautismo antes de armar el día: los dos manejan reserva de grupos y el jardín es chico. El Shabat, para los traslados largos.',
    idiomas: 'Español, inglés, hebreo.',
    notas: [
      'No hay misa diaria: el ritmo lo marca el pastor, con lectura, canto y oración en cada sitio. Hay que reservarle tiempo en el itinerario, no encajarlo entre dos paradas.',
      'Este grupo pide más Antiguo Testamento que el católico: Meguido, Bet Shean, Dan, Cesarea de Filipo, Siló. Pilgrim Tours los mete todos en su paquete de 10 días.',
      'El Garden Tomb y el Santo Sepulcro no compiten en el itinerario: se visitan los dos y se explica qué sostiene cada tradición, sin tomar partido.',
      'La guía no oficia ni interpreta teología: acompaña, explica historia y arqueología y coordina la logística.',
      'Ropa cubierta en las iglesias; en el Garden Tomb no hay código estricto, pero conviene el mismo criterio.',
    ],
    referencia: {
      grupal: 'Paquetes cristianos de grupo, en inglés y con hotel: US$568–1.629 según los días. Sin producto protestante de grupo en ninguno de los seis.',
      privadoPublicado: 'Tourist Israel "9 Day Israel Protestant Private Tour Package" US$6.046 por persona y "11 Day Israel & Jordan Protestant Private Tour Package" US$7.429 por persona.',
      fuentes: 'Tourist Israel, paquetes protestantes privados, con Yardenit, Qasr el Yahud, Meguido y el Garden Tomb en el itinerario publicado; Pilgrim Tours "Best of Israel" 10 días, con Garden Tomb y comunión en el jardín, US$2.679 solo tierra en 2026 y US$2.129–2.779 en 2027; Bein Harim, Abraham, Civitatis, GetYourGuide y Viator no separan por confesión. Leídos el 23-09-2026.',
    },
  },
  {
    id: 'grupos-catolicos',
    nombre: 'Grupos católicos, con misa diaria',
    tipo: 'peregrinacion',
    porQue: 'Es el formato del nicho fuera de Israel: 206 Tours, Pilgrim Tours y Catholic Journeys venden la peregrinación con sacerdote capellán, y los dos católicos anuncian misa diaria. Tourist Israel es el único de los seis con algo equivalente: paquetes privados católicos de 8 y 10 días (US$4.498 y US$6.265).',
    duracion: '8–10 días.',
    salida: 'Tel Aviv, con noches en Galilea, Belén o Jerusalén.',
    recorrido: [
      { lugar: 'Jaffa, iglesia de San Pedro; monte Carmelo y la cueva de Elías', tiempo: 'medio día' },
      { lugar: 'Nazaret: Anunciación y San José, con misa en la Gruta; Caná, donde los matrimonios renuevan votos', tiempo: '1 día' },
      { lugar: 'Mar de Galilea: Bienaventuranzas, Tabgha, Cafarnaúm, Magdala y barco', tiempo: '1 día' },
      { lugar: 'Monte Tabor, Basílica de la Transfiguración', tiempo: 'medio día' },
      { lugar: 'Jericó, Monte de la Tentación y renovación de las promesas bautismales en el Jordán', tiempo: 'medio día' },
      { lugar: 'Ein Karem: San Juan Bautista y la Visitación', tiempo: 'medio día' },
      { lugar: 'Belén: Campo de los Pastores, Natividad y Santa Catalina', tiempo: '1 día' },
      { lugar: 'Monte de los Olivos, Getsemaní, Monte Sion y el Cenáculo', tiempo: '1 día' },
      { lugar: 'Emaús y Betania', tiempo: 'medio día' },
      { lugar: 'Vía Crucis muy temprano por la Vía Dolorosa y misa en el Santo Sepulcro; después Santa Ana y Betesda', tiempo: '1 día' },
    ],
    paraQuien: 'Grupos parroquiales y diocesanos que viajan con su sacerdote; peregrinaciones organizadas por una agencia católica de LatAm o España que necesita guía local en español.',
    incluye: ['Guía licenciada en español', 'Itinerario armado alrededor del horario de misa que la parroquia haya reservado', 'Coordinación con las casas de peregrinos (Notre Dame, Casa Nova y similares) si el grupo se aloja ahí'],
    noIncluye: ['La reserva de la misa y el capellán: los pone la parroquia o el operador. Los santuarios asignan capilla y horario con meses de anticipación', 'Entradas y donaciones', 'Transporte', 'Comidas', 'Alojamiento'],
    mejorEpoca: 'Cuaresma, Semana Santa, mayo y octubre. Adviento y Navidad para Belén.',
    diasAEvitar: 'Sin reserva no hay misa, por mucho que el grupo la quiera ese día: las capillas de los santuarios se piden con meses. El Santo Sepulcro asigna horarios muy temprano, antes del desayuno.',
    idiomas: 'Español, inglés, hebreo.',
    notas: [
      'La guía no oficia ni interpreta teología: acompaña, explica historia y arqueología, y coordina horarios, capillas y traslados. La misa la celebra el sacerdote que viaja con el grupo.',
      '206 Tours, que es de los grandes del nicho, dice organizar misa diaria y busca sacerdotes capellanes para sus salidas: el capellán sale del operador o de la parroquia, nunca del guía local. Conviene decirlo por escrito antes de cerrar.',
      'Ein Karem y Emaús son medio día cada uno y casi nadie los vende sueltos: son el diferencial de una peregrinación larga. Si Mari quiere un producto corto extra, ahí está.',
      '206 Tours aloja en Notre Dame of Jerusalem Center, que tiene capilla propia: ese es el motivo, y es un dato útil a la hora de recomendar hotel.',
      'Vestimenta cubierta todos los días; hay control en la puerta de varios santuarios.',
    ],
    referencia: {
      grupal: 'Sin producto católico de grupo en los seis catálogos: lo más cercano es el paquete cristiano genérico, US$568–1.629.',
      privadoPublicado: 'Tourist Israel "8 Day Catholic Holy Land Private Tour Package" US$4.498 por persona, "10 Day Israel Catholic Holy Land Private Tour Package" US$6.265 y "10 Day Catholic Holy Land Israel and Jordan Private Tour Package" US$5.143.',
      fuentes: 'Tourist Israel, precios publicados en su categoría de paquetes de Tierra Santa. 206 Tours: peregrinación católica de 10 días con capellán y misa diaria (Nazaret, Caná, Tabor, Jordán, Ein Karem, Belén, Monte Sion, Emaús, Betania y misa en el Santo Sepulcro), alojada en Notre Dame of Jerusalem Center; no publica el precio en la página del itinerario, solo el depósito de US$500. Catholic Journeys anuncia capellán sacerdote y misa diaria en cuatro itinerarios y tampoco publica precio. Bein Harim, Abraham, Civitatis, GetYourGuide y Viator no separan por confesión. Leídos el 23-09-2026.',
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
  '¿Acompañás grupos que vienen con su propio capellán, sacerdote o pastor? ¿Cómo se reparte el día entre la misa o el culto y el recorrido? ¿Te reservan ellos la capilla o lo terminás coordinando vos?',
  '¿Trabajás con parroquias, diócesis o agencias de LatAm y España? ¿Con cuáles? ¿Los grupos te llegan por ellas o te buscan directo?',
  '¿Hacés la ruta de Galilea de varios días, con alojamiento en Nazaret o Tiberíades? ¿O preferís bajar a dormir a Jerusalén o Tel Aviv? ¿Con qué hoteles o casas de peregrinos trabajás?',
];
