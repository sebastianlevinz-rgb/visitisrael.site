/**
 * scripts/seo/competitors.mjs → data/seo/competitors.json
 *
 * Para cada dominio competidor (lista abajo), en el idioma/mercado que le corresponde:
 *   - dataforseo_labs/google/domain_rank_overview/live → organicKeywords (total), etv.
 *   - dataforseo_labs/google/ranked_keywords/live (limit 300, orden por volumen) con filtros
 *     de la API (máx. 8 condiciones por llamada, por eso van dos llamadas: lugares grandes y
 *     lugares chicos) + filtro local con la lista completa de temas de Israel.
 *   - topKeywords: top 30 por volumen con posición y URL.
 *   - gapKeywords: volumen ≥ 100, competidor en top 10 y nosotros ausentes (según
 *     data/seo/keywords.json: ourRankings + posiciones SERP). Cada una trae suggestedPage
 *     (ruta nuestra existente por tema) o needsNewPage: true. NO se crean páginas: solo se listan.
 *
 * Lee data/seo/keywords.json (correr antes scripts/seo/keywords.mjs). Caché y presupuesto en
 * api-client.mjs. Re-ejecutable e idempotente.
 *
 *   node scripts/seo/competitors.mjs [--force]
 */
import { readFileSync } from 'node:fs';
import { readJson, writeJson } from './lib.mjs';
import { BudgetError, createTracker, dfsPost, firstItems, firstResult, spentByScript } from './api-client.mjs';

const SCRIPT = 'competitors.mjs';
const OUR_DOMAIN = 'visitisrael.site';
const GAP_MIN_VOLUME = 100;
const GAP_MAX_PER_DOMAIN = 150;
const TOP_KEYWORDS = 30;

const targets = JSON.parse(readFileSync(new URL('./targets.json', import.meta.url), 'utf8'));
const LOC = targets.locationByLocale;

/** Competidores y el mercado en el que se los mide. lonelyplanet.com es solo referencia. */
const DOMAINS = [
  { domain: 'touristisrael.com', locale: 'en' },
  { domain: 'backpackisrael.com', locale: 'en' },
  { domain: 'secrettelaviv.com', locale: 'en' },
  { domain: 'funinjerusalem.com', locale: 'en' },
  { domain: 'viajeroscallejeros.com', locale: 'es' },
  { domain: 'losviajesdedomi.com', locale: 'es' },
  { domain: 'kommwirmachendaseinfach.de', locale: 'de' },
  { domain: 'sommertage.com', locale: 'de' },
  { domain: 'routard.com', locale: 'fr' },
  { domain: 'lonelyplanet.com', locale: 'en', reference: true },
];

/**
 * Términos para el filtro `like` de la API (máx. 8 por llamada). Dos juegos por idioma.
 * Se usan fragmentos para cubrir variantes (jerusal → jerusalén/jerusalem; rusalem → jérusalem).
 */
const API_TERMS = {
  en: [
    ['israel', 'jerusalem', 'tel aviv', 'dead sea', 'masada', 'eilat', 'galilee', 'haifa'],
    ['negev', 'petra', 'bethlehem', 'nazareth', 'jaffa', 'caesarea', 'akko', 'acre'],
  ],
  es: [
    ['israel', 'jerusal', 'tel aviv', 'mar muerto', 'masada', 'eilat', 'galilea', 'haifa'],
    ['neguev', 'petra', 'belén', 'nazaret', 'jaffa', 'cesarea', 'acre', 'tiberíades'],
  ],
  fr: [
    ['isra', 'rusalem', 'tel aviv', 'mer morte', 'massada', 'eilat', 'galil', 'tibériade'],
    ['néguev', 'pétra', 'bethléem', 'nazareth', 'jaffa', 'césarée', 'acre', 'haïfa'],
  ],
  de: [
    ['israel', 'jerusalem', 'tel aviv', 'totes meer', 'masada', 'eilat', 'galil', 'haifa'],
    ['negev', 'petra', 'bethlehem', 'nazareth', 'jaffa', 'caesarea', 'akko', 'genezareth'],
  ],
};

/** Filtro local: la keyword tiene que tocar algún tema de Israel (lista del brief + variantes). */
const TOPIC_RE = /israel|isra[eë]l|jerusal|j[ée]rusalem|tel aviv|dead sea|mar muerto|mer morte|totes meer|masada|massada|eilat|galil|galiläa|tib[eé]r|genezareth|haifa|ha[iï]fa|negev|neguev|n[eé]guev|petra|p[eé]tra|bethlehem|bel[eé]n|bethl[eé]em|nazaret|jaffa|caesarea|cesarea|c[eé]sar[eé]e|akko|\bacre\b|ein bokek|mitzpe|ramon/i;

/* ------------------------------------------------------------------ helpers */

const norm = (s) => String(s ?? '').toLowerCase().trim().replace(/\s+/g, ' ');

function localePath(locale, path) {
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Sugiere la página nuestra existente que debería cubrir una keyword, por tema.
 * Devuelve la ruta base (sin idioma) o null si no hay página existente para el tema.
 */
export function suggestPage(keyword) {
  const k = norm(keyword);
  const has = (re) => re.test(k);

  const place = {
    jerusalem: /jerusal|j[ée]rusalem|yerushalayim|western wall|holy sepulch|mahane yehuda|mount of olives|ירושל/,
    telAviv: /tel aviv|jaffa|jafa|carmel market|shuk hacarmel|mercado carmel|march[eé] carmel|carmel markt|levinsky|תל אביב|יפו|שוק הכרמל/,
    deadSea: /dead sea|mar muerto|mer morte|totes meer|ein bokek|ים המלח|עין בוקק/,
    galilee: /galil|tib[eé]r|genezareth|nazaret|golan|safed|tzfat|capernaum|cafarna|kapernaum|mount tabor|mt tabor|tabor israel|כנרת|נצרת|גליל/,
    eilat: /eilat|red sea|mar rojo|mer rouge|rotes meer|אילת/,
    haifa: /haifa|ha[iï]fa|akko|\bacre\b|caesarea|cesarea|c[eé]sar[eé]e|mount carmel|mt carmel|carmel forest|monte carmelo|mont carmel|karmel|קיסריה|חיפה|עכו|הכרמל/,
    negev: /negev|neguev|n[eé]guev|mitzpe|ramon|beer ?sheva|beerscheba|נגב|מצפה רמון/,
    masada: /masada|massada|מצדה/,
    bethlehem: /bethlehem|bel[eé]n|bethl[eé]em|בית לחם/,
    petra: /petra|p[eé]tra|פטרה/,
    israel: /israel|isra[eë]l|ישראל|בארץ/,
  };
  const topic = {
    hotel: /hotel|hôtel|hoteles|übernacht|unterkunft|where to stay|donde (alojarse|dormir)|dónde (alojarse|dormir)|où dormir|où loger|resort|hostel|hostal|airbnb|accommodation|alojamiento|hébergement|מלון|מלונות|איפה לישון|צימר/,
    tour: /\btours?\b|excursi|visite|visita guiada|führung|ausflug|ausflüge|day trip|tagesausfl|סיור|טיול יום|walking|guided|guidée|guiado|circuit|rundreise|pauschal|package|paquete|organizado|organisé|מאורגן|חבילות/,
    food: /food|gastron|culinar|kulinar|comida|comer|manger|essen|market|mercado|marché|markt|restaurant|אוכל|שוק/,
    visa: /visa|visum|\beta\b|eta-il|passport|pasaporte|passeport|entry requirement|einreise|formalit|requisitos|ויזה|אשרה|כניסה לישראל/,
    safe: /\bsafe|safety|seguro|seguridad|sûr|sécurité|sicher|danger|peligro|reisewarnung|בטוח|ביטחון/,
    car: /car rental|rent a car|rental car|mietwagen|auto mieten|alquiler de coche|alquilar (un )?coche|location de voiture|louer une voiture|driving|conducir|conduire|autofahren|השכרת רכב|נהיגה/,
    time: /best time|when to|weather|clima|climat|wetter|reisezeit|época|epoca|période|periode|temporada|season|saison|month|monat|mois|\bmes\b|meses|temperatur|מזג אוויר|מתי כדאי|עונה/,
    itinerary: /itinerar|itinéraire|reiseroute|reiseplan|\broute\b|\bruta\b|days in|d[ií]as en|jours en|tage in|\bweek\b|semana|semaine|woche|מסלול|ימים ב/,
    first: /first time|primera vez|première fois|erste(s|n)? mal|zum ersten mal|tips|consejos|conseils|reisetipps|travel guide|guía de viaje|guide de voyage|reiseführer|planning|planificar|planear|organiser|planen|פעם ראשונה|טיפים|תכנון/,
    things: /things to do|what to do|que ver|qué ver|que hacer|qué hacer|que faire|que visiter|sehenswürdigkeiten|was tun|was machen|attraction|atracci|visiter|besuchen|מה לעשות|אטרקציות|לראות/,
  };

  // 1. Alojamiento por destino
  if (has(topic.hotel)) {
    if (has(place.jerusalem)) return '/best-hotels-jerusalem';
    if (has(place.telAviv)) return '/best-hotels-tel-aviv';
    if (has(place.deadSea)) return '/dead-sea-hotels-guide';
    if (has(place.eilat)) return '/eilat-hotels-guide';
    return null;
  }
  // 2. Comida en Tel Aviv
  if (has(topic.food) && has(place.telAviv)) return '/tel-aviv-food-tours';
  // 3. Tours y excursiones
  if (has(topic.tour)) {
    if (has(place.bethlehem)) return '/jerusalem-bethlehem-day-trip';
    if (has(place.petra)) return '/petra-from-israel';
    if (has(place.galilee)) return '/nazareth-sea-of-galilee-day-trip';
    if (has(place.haifa)) return '/caesarea-haifa-akko-day-trip';
    if (has(place.masada) || has(place.deadSea)) return '/dead-sea-tours-compared';
    if (has(place.jerusalem)) return '/jerusalem-tours-compared';
    if (has(place.telAviv)) return '/day-trips-from-tel-aviv';
    if (has(place.israel)) return '/israel-tour-packages';
    return null;
  }
  // 4. Temas prácticos a nivel país
  if (has(place.masada)) return '/masada-visitor-guide';
  if (has(place.petra) && has(place.israel)) return '/petra-from-israel';
  if (has(place.bethlehem)) return '/jerusalem-bethlehem-day-trip';
  if (has(topic.visa)) return '/visa-information';
  if (has(topic.safe)) return '/is-israel-safe';
  if (has(topic.car)) return '/car-rental-israel';
  if (has(topic.time)) return '/best-time-to-visit-israel';
  if (has(topic.itinerary) && has(place.israel)) {
    if (/\b10\b|\bdiez\b|\bdix\b|\bzehn\b|עשרה/.test(k)) return '/itineraries/10-days-in-israel';
    if (/\b7\b|\bsiete\b|\bsept\b|\bsieben\b|week|semana|semaine|woche|שבוע/.test(k)) return '/itineraries/7-days-in-israel';
    return '/itineraries';
  }
  // 5. Regiones (con o sin "qué ver")
  if (has(place.jerusalem)) return '/jerusalem';
  if (has(place.telAviv)) return '/tel-aviv';
  if (has(place.deadSea)) return '/dead-sea';
  if (has(place.eilat)) return '/eilat';
  if (has(place.galilee)) return '/galilee';
  if (has(place.haifa)) return '/haifa';
  if (has(place.negev)) return '/negev';
  // 6. Israel genérico
  if (has(place.israel)) {
    if (has(topic.first)) return '/first-time-in-israel';
    if (has(topic.things)) return '/plan-your-trip';
    return '/';
  }
  return null;
}

/* ------------------------------------------------------------------ API */

function likeFilters(terms) {
  const out = [];
  terms.forEach((t, i) => {
    if (i) out.push('or');
    out.push(['keyword_data.keyword', 'like', `%${t}%`]);
  });
  return out;
}

async function fetchDomain(tracker, entry, errors) {
  const { domain, locale } = entry;
  const { location_code, language_code } = LOC[locale];

  // Totales del dominio (sin filtros)
  const ovResp = await dfsPost(tracker, 'dataforseo_labs/google/domain_rank_overview/live', [
    { target: domain, location_code, language_code },
  ]);
  const ovTask = ovResp.tasks[0];
  const ov = firstItems(ovResp)[0]?.metrics?.organic ?? null;
  if (ovTask && ovTask.status_code !== 20000) {
    errors.push({ step: 'domain_rank_overview', domain, message: `${ovTask.status_code} ${ovTask.status_message}` });
  }

  // Keywords rankeadas, dos juegos de filtros
  const seen = new Map();
  let filteredTotal = 0;
  for (const terms of API_TERMS[locale]) {
    const resp = await dfsPost(tracker, 'dataforseo_labs/google/ranked_keywords/live', [
      {
        target: domain,
        location_code,
        language_code,
        limit: 300,
        order_by: ['keyword_data.keyword_info.search_volume,desc'],
        filters: likeFilters(terms),
      },
    ]);
    const task = resp.tasks[0];
    if (task && task.status_code !== 20000) {
      errors.push({ step: 'ranked_keywords', domain, message: `${task.status_code} ${task.status_message}` });
      continue;
    }
    filteredTotal += firstResult(resp)[0]?.total_count ?? 0;
    for (const it of firstItems(resp)) {
      const kw = norm(it.keyword_data?.keyword);
      if (!kw || seen.has(kw) || !TOPIC_RE.test(kw)) continue;
      const serp = it.ranked_serp_element?.serp_item ?? {};
      seen.set(kw, {
        keyword: kw,
        volume: it.keyword_data?.keyword_info?.search_volume ?? null,
        cpc: it.keyword_data?.keyword_info?.cpc ?? null,
        difficulty: it.keyword_data?.keyword_properties?.keyword_difficulty ?? null,
        intent: it.keyword_data?.search_intent_info?.main_intent ?? null,
        position: serp.rank_absolute ?? serp.rank_group ?? null,
        rankGroup: serp.rank_group ?? null,
        url: serp.url ?? null,
        etv: serp.etv ?? null,
      });
    }
  }
  const keywords = [...seen.values()].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0));
  console.log(`${domain} [${locale}]: organic ${ov?.count ?? '?'}, etv ${ov?.etv != null ? Math.round(ov.etv) : '?'}, filtradas ${keywords.length} (total con filtro API ${filteredTotal})`);
  return { ov, keywords, filteredTotal };
}

/* ------------------------------------------------------------------ main */

async function main() {
  const tracker = createTracker(SCRIPT);
  const errors = [];
  const kwData = readJson('keywords');
  if (!kwData) {
    console.error('Falta data/seo/keywords.json: correr antes node scripts/seo/keywords.mjs');
    process.exit(1);
  }

  // Dónde aparecemos: Labs (ourRankings) + SERP real de las primarias (pages.position)
  const ourKeywords = new Set();
  for (const r of kwData.ourRankings ?? []) ourKeywords.add(`${r.locale}|${norm(r.keyword)}`);
  for (const p of kwData.pages ?? []) if (p.position != null) ourKeywords.add(`${p.locale}|${norm(p.keyword)}`);
  const ourTargets = new Map((kwData.pages ?? []).map((p) => [`${p.locale}|${norm(p.keyword)}`, p.path]));

  const domains = [];
  let budgetHit = false;
  for (const entry of DOMAINS) {
    let data;
    try {
      data = await fetchDomain(tracker, entry, errors);
    } catch (err) {
      if (!(err instanceof BudgetError)) throw err;
      budgetHit = true;
      errors.push({ step: 'budget', domain: entry.domain, message: err.message });
      console.error(err.message);
      break;
    }
    const { ov, keywords, filteredTotal } = data;
    const gap = [];
    for (const k of keywords) {
      if ((k.volume ?? 0) < GAP_MIN_VOLUME) continue;
      if (k.rankGroup == null || k.rankGroup > 10) continue;
      const key = `${entry.locale}|${k.keyword}`;
      if (ourKeywords.has(key)) continue;
      const base = suggestPage(k.keyword);
      gap.push({
        keyword: k.keyword,
        volume: k.volume,
        difficulty: k.difficulty,
        intent: k.intent,
        competitorPosition: k.rankGroup,
        competitorUrl: k.url,
        suggestedPage: base ? localePath(entry.locale, base) : null,
        needsNewPage: !base,
        isOurTarget: ourTargets.has(key),
      });
    }
    gap.sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0));
    domains.push({
      domain: entry.domain,
      locale: entry.locale,
      reference: Boolean(entry.reference),
      location_code: LOC[entry.locale].location_code,
      language_code: LOC[entry.locale].language_code,
      organicKeywords: ov?.count ?? null,
      etv: ov?.etv != null ? Math.round(ov.etv) : null,
      israelKeywordsMatched: filteredTotal,
      topKeywords: keywords.slice(0, TOP_KEYWORDS).map(({ keyword, volume, difficulty, intent, position, url }) => ({
        keyword, volume, difficulty, intent, position, url,
      })),
      gapKeywords: gap.slice(0, GAP_MAX_PER_DOMAIN),
      gapTotal: gap.length,
    });
  }

  const r4 = (n) => Math.round(n * 10000) / 10000;
  const out = {
    costUsd: r4(spentByScript(SCRIPT) + tracker.state.usd),
    costUsdRun: r4(tracker.state.usd),
    costUsdAllSeoScripts: r4(tracker.totalUsd()),
    apiCalls: tracker.state.calls,
    cachedCalls: tracker.state.cachedCalls,
    basedOnKeywordsGeneratedAt: kwData.generatedAt ?? null,
    gapRule: `volumen ≥ ${GAP_MIN_VOLUME}, competidor en top 10, ${OUR_DOMAIN} ausente en Labs y en el SERP de nuestras primarias`,
    errors: [...errors, ...tracker.state.errors.map((e) => ({ step: e.endpoint, code: e.code, message: e.message }))],
    domains,
  };
  const file = writeJson('competitors', out);
  tracker.flush();

  const allGaps = domains.flatMap((d) => d.gapKeywords.map((g) => ({ ...g, domain: d.domain })));
  console.log(`\nEscrito ${file}`);
  console.log(`Costo de esta corrida: US$${out.costUsdRun} (este script acumulado US$${out.costUsd}; todos los scripts SEO US$${out.costUsdAllSeoScripts}); llamadas ${out.apiCalls}, caché ${out.cachedCalls}`);
  console.log(`Dominios: ${domains.length}/${DOMAINS.length}${budgetHit ? ' (cortado por presupuesto)' : ''}; gap keywords: ${allGaps.length} (${allGaps.filter((g) => g.needsNewPage).length} sin página existente); errores: ${out.errors.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
