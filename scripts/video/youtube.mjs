/**
 * Relevamiento de YouTube para el research de contenido en video (gestion/negocio/contenido-video.md).
 *
 * - DataForSEO SERP YouTube: serp/youtube/organic/live/advanced (una task por request, depth 20)
 *   y serp/youtube/video_info/live/advanced para likes/comentarios de los mejores.
 * - Reusa el cliente con caché y registro de costos de scripts/seo/api-client.mjs; el tope propio
 *   de esta corrida es US$3 (BUDGET_VIDEO_USD), aparte del tope global del cliente.
 * - Escribe data/video/youtube.json. Nunca imprime keys.
 *
 * Uso:  node scripts/video/youtube.mjs            # todas las consultas (caché: gratis si ya corrió)
 *       node scripts/video/youtube.mjs --probe    # una sola consulta para ver costo y forma de la respuesta
 *       node scripts/video/youtube.mjs --info     # además pide video_info para los 15 con más vistas
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createTracker, dfsPost, firstItems, BudgetError } from '../seo/api-client.mjs';
import { ROOT } from '../seo/lib.mjs';

const OUT_DIR = join(ROOT, 'data', 'video');
const OUT_FILE = join(OUT_DIR, 'youtube.json');
const BUDGET_VIDEO_USD = 3;
const PROBE = process.argv.includes('--probe');
const WITH_INFO = process.argv.includes('--info');
const SCRIPT = 'video/youtube.mjs';

/** location_code 2840 = EE. UU., 2724 = España, 2032 = Argentina. */
const QUERIES = [
  // Inglés, EE. UU.
  { keyword: 'israel travel vlog', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel travel guide 2026', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'things to do in jerusalem', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'jerusalem old city walk', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'tel aviv vlog', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'dead sea float', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'masada sunrise', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel food tour', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'is israel safe to travel', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'first time in israel tips', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'jerusalem shabbat', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel itinerary 7 days', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'petra from israel', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel 2026', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel travel cost', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'jerusalem walking tour 4k', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'tel aviv street food', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel with kids', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'holy land tour', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'tel aviv nightlife', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel budget travel', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'jerusalem 4k walk', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel travel 2025', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'jerusalem mistakes tourists', location_code: 2840, language_code: 'en', market: 'en-US' },
  // Inglés, segunda tanda (23-09): grandes canales y documentales, para el ranking EN.
  { keyword: 'israel travel documentary', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'israel 4k', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'drew binsky israel', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'yes theory israel', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'best ever food review show israel', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'jerusalem travel', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'tel aviv travel', location_code: 2840, language_code: 'en', market: 'en-US' },
  { keyword: 'dead sea israel', location_code: 2840, language_code: 'en', market: 'en-US' },
  // Español, España
  { keyword: 'viaje a israel', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'que ver en jerusalen', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'israel vlog español', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'tierra santa peregrinacion', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'viajar a israel es seguro', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'comida israelí', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'mar muerto israel', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'masada', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'jerusalén ciudad vieja', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'tel aviv que hacer', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'israel con niños', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'que ver en israel', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'jerusalen vlog', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'israel turismo', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'israel viaje 2026', location_code: 2724, language_code: 'es', market: 'es-ES' },
  { keyword: 'cuanto cuesta viajar a israel', location_code: 2724, language_code: 'es', market: 'es-ES' },
  // Español, México (mercado hispano más grande de YouTube)
  { keyword: 'viaje a israel', location_code: 2484, language_code: 'es', market: 'es-MX' },
  { keyword: 'tierra santa peregrinacion', location_code: 2484, language_code: 'es', market: 'es-MX' },
  // Español, Argentina
  { keyword: 'viaje a israel', location_code: 2032, language_code: 'es', market: 'es-AR' },
  { keyword: 'israel vlog', location_code: 2032, language_code: 'es', market: 'es-AR' },
  { keyword: 'que ver en israel', location_code: 2032, language_code: 'es', market: 'es-AR' },
  { keyword: 'tierra santa', location_code: 2032, language_code: 'es', market: 'es-AR' },
];

const MS_MONTH = 30.44 * 24 * 3600 * 1000;

function pickVideo(item) {
  return {
    rank: item.rank_absolute ?? item.rank_group ?? null,
    type: item.type,
    videoId: item.video_id ?? null,
    title: item.title ?? null,
    channel: item.channel_name ?? null,
    channelId: item.channel_id ?? null,
    channelUrl: item.channel_url ?? null,
    views: item.views_count ?? null,
    publishedAt: item.timestamp ?? null,
    publishedText: item.publication_date ?? null,
    duration: item.duration_time ?? null,
    durationSec: item.duration_time_seconds ?? null,
    isShorts: Boolean(item.is_shorts),
    isLive: Boolean(item.is_live),
    url: item.url ?? null,
    thumbnail: item.thumbnail_url ?? null,
    description: item.description ? String(item.description).slice(0, 300) : null,
    badges: item.badges ?? null,
  };
}

function monthsSince(iso) {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.max(0.5, (Date.now() - t) / MS_MONTH);
}

/**
 * DataForSEO solo convierte a timestamp el texto relativo en inglés ("3 years ago"). Para los
 * mercados en español ("hace 3 años", "hace 2 meses") lo estimamos acá. Precisión: la del texto
 * (años enteros para videos viejos). Devuelve ISO o null.
 */
function parseRelativeEs(text) {
  if (!text) return null;
  const m = String(text).toLowerCase().match(/hace\s+(\d+)\s+(año|años|mes|meses|semana|semanas|día|días|dia|dias|hora|horas)/);
  if (!m) return null;
  const n = Number(m[1]);
  const unit = m[2];
  const ms = unit.startsWith('año') ? n * 365.25 * 86400e3
    : unit.startsWith('mes') ? n * MS_MONTH
    : unit.startsWith('semana') ? n * 7 * 86400e3
    : unit.startsWith('d') ? n * 86400e3
    : n * 3600e3;
  return new Date(Date.now() - ms).toISOString();
}

/**
 * Clasificación gruesa por título/canal para separar lo turístico de lo que no lo es (música,
 * noticias, política, religión doctrinal). Heurística: se revisa a mano en el informe.
 */
const OFF_TOPIC = [
  /\b(official video|video oficial|audio|videoclip|full album|lyric|karaoke|live at|concert|eurovision|song contest)\b/i,
  /\b(netanyahu|erdogan|hamas|houthi|idf|soldier|soldados|bombardment|gaza|unga|elections|news flash|daily news|on the hour|i24|iltv|dw español|azteca noticias|middle east eye|trt world|al mayadeen|times of india|times now)\b/i,
  /\b(campos de concentración|niños palestinos|hu3rf4n0s|c4nc3r|prophec|yeshua|high priest|bible predicted|sealed room|megaproyectos|inundar)\b/i,
  /\b(la cancion del pirata|mi nombre será leyenda|holandés errante|hoy vivo por ti|mejor morir en pie|tierra zanta|alpha blondy|kalidia|batallas de roma|asedio)\b/i,
];
function isTravelRelevant(v) {
  const hay = `${v.title ?? ''} | ${v.channel ?? ''}`;
  return !OFF_TOPIC.some((re) => re.test(hay));
}

async function main() {
  const tracker = createTracker(SCRIPT);
  const guard = () => {
    if (tracker.state.usd >= BUDGET_VIDEO_USD) throw new BudgetError('Tope propio de video alcanzado: US$' + tracker.state.usd.toFixed(4));
  };

  const queries = PROBE ? QUERIES.slice(0, 1) : QUERIES;
  const perQuery = [];
  const costByCall = [];

  for (const q of queries) {
    guard();
    const task = {
      keyword: q.keyword,
      location_code: q.location_code,
      language_code: q.language_code,
      block_depth: 1, // YouTube no acepta depth; un bloque = 20 resultados
      device: 'desktop',
      os: 'windows',
    };
    const resp = await dfsPost(tracker, 'serp/youtube/organic/live/advanced', [task]);
    costByCall.push({ keyword: q.keyword, market: q.market, cost: resp.cost, cached: resp.cached, ok: resp.ok, code: resp.code });
    const items = firstItems(resp);
    if (PROBE) {
      console.log('probe status', resp.ok, resp.code, resp.message, 'cost', resp.cost, 'cached', resp.cached);
      console.log('items', items.length, 'types', [...new Set(items.map((i) => i.type))]);
      console.log(JSON.stringify(items[0], null, 2).slice(0, 2500));
    }
    const videos = items.filter((i) => i.type === 'youtube_video').map(pickVideo);
    for (const v of videos) {
      if (!v.publishedAt && v.publishedText) {
        const est = parseRelativeEs(v.publishedText);
        if (est) {
          v.publishedAt = est;
          v.publishedAtEstimated = true;
        }
      }
      v.travelRelevant = isTravelRelevant(v);
      const m = monthsSince(v.publishedAt);
      v.monthsSincePublish = m ? Math.round(m * 10) / 10 : null;
      v.viewsPerMonth = m && typeof v.views === 'number' ? Math.round(v.views / m) : null;
    }
    perQuery.push({
      keyword: q.keyword,
      market: q.market,
      locationCode: q.location_code,
      languageCode: q.language_code,
      ok: resp.ok,
      statusCode: resp.code,
      resultCount: videos.length,
      videos,
    });
    console.log(`${q.market.padEnd(5)} ${q.keyword.padEnd(30)} ${videos.length} videos  cost ${resp.cost.toFixed(4)}${resp.cached ? ' (cache)' : ''}`);
  }

  // Dedupe por videoId con todas las consultas en las que aparece.
  const byId = new Map();
  for (const pq of perQuery) {
    for (const v of pq.videos) {
      if (!v.videoId) continue;
      const cur = byId.get(v.videoId);
      if (cur) {
        cur.queries.push({ keyword: pq.keyword, market: pq.market, rank: v.rank });
      } else {
        byId.set(v.videoId, { ...v, queries: [{ keyword: pq.keyword, market: pq.market, rank: v.rank }] });
      }
    }
  }
  const unique = [...byId.values()];
  const withViews = unique.filter((v) => typeof v.views === 'number');
  const topByViews = [...withViews].sort((a, b) => b.views - a.views).slice(0, 30);
  const topByVelocity = [...withViews].filter((v) => v.viewsPerMonth).sort((a, b) => b.viewsPerMonth - a.viewsPerMonth).slice(0, 30);
  const travel = withViews.filter((v) => v.travelRelevant && !v.isShorts);
  const topTravelByViews = [...travel].sort((a, b) => b.views - a.views).slice(0, 30);
  const topTravelByVelocity = [...travel].filter((v) => v.viewsPerMonth).sort((a, b) => b.viewsPerMonth - a.viewsPerMonth).slice(0, 30);
  const topTravelByViewsEs = [...travel].filter((v) => v.queries.some((q) => q.market.startsWith('es'))).sort((a, b) => b.views - a.views).slice(0, 20);
  const topTravelByViewsEn = [...travel].filter((v) => v.queries.some((q) => q.market === 'en-US')).sort((a, b) => b.views - a.views).slice(0, 20);

  // Canales
  const channels = new Map();
  for (const v of unique) {
    if (!v.channel) continue;
    const c = channels.get(v.channel) ?? { channel: v.channel, channelUrl: v.channelUrl, videos: 0, totalViews: 0, markets: new Set() };
    c.videos++;
    c.totalViews += typeof v.views === 'number' ? v.views : 0;
    for (const q of v.queries) c.markets.add(q.market);
    channels.set(v.channel, c);
  }
  const topChannels = [...channels.values()]
    .map((c) => ({ ...c, markets: [...c.markets] }))
    .sort((a, b) => b.videos - a.videos || b.totalViews - a.totalViews)
    .slice(0, 40);

  // Duración por tramo, para los 30 con más vistas y para todo el set (sin shorts)
  const buckets = (list) => {
    const out = { 'shorts(<1m)': 0, '1-4m': 0, '4-8m': 0, '8-15m': 0, '15-30m': 0, '30-60m': 0, '60m+': 0, unknown: 0 };
    for (const v of list) {
      const s = v.durationSec;
      if (typeof s !== 'number') out.unknown++;
      else if (s < 60) out['shorts(<1m)']++;
      else if (s < 240) out['1-4m']++;
      else if (s < 480) out['4-8m']++;
      else if (s < 900) out['8-15m']++;
      else if (s < 1800) out['15-30m']++;
      else if (s < 3600) out['30-60m']++;
      else out['60m+']++;
    }
    return out;
  };
  const median = (arr) => {
    const a = arr.filter((n) => typeof n === 'number').sort((x, y) => x - y);
    if (!a.length) return null;
    return a[Math.floor(a.length / 2)];
  };

  // Formatos por regex sobre título (heurística; se revisa a mano en el informe)
  const FORMATS = {
    'walk tour / 4K / sin narración': /\b(walk(ing)?( tour)?|4k|walk through|caminando|paseo)\b/i,
    'lista "X things / cosas"': /\b(\d+|ten|top)\s+(things|places|tips|mistakes|reasons|cosas|lugares|consejos|errores|razones)\b/i,
    'vlog / primera vez': /\b(vlog|first time|primera vez|my first|first impressions)\b/i,
    'costos / precios': /\b(cost|costs|expensive|cheap|budget|price|prices|cuánto cuesta|cuanto cuesta|precio|presupuesto)\b/i,
    'comida': /\b(food|eat|eating|street food|hummus|falafel|shawarma|comida|comer|gastronom)/i,
    'seguridad': /\b(safe|safety|dangerous|seguro|peligroso|seguridad)\b/i,
    'itinerario / guía': /\b(itinerary|guide|guía|itinerario|days? in|días en)\b/i,
    'religioso / peregrinación': /\b(holy land|pilgrim|tierra santa|peregrin|jesus|jesús|biblical|bíblic|santo sepulcro|holy sepulchre|western wall|muro)/i,
    'documental / historia': /\b(history|historia|documentary|documental|explained|why|por qué|porque)\b/i,
  };
  const formatCounts = {};
  for (const [name, re] of Object.entries(FORMATS)) {
    const matched = unique.filter((v) => v.title && re.test(v.title));
    formatCounts[name] = {
      videos: matched.length,
      totalViews: matched.reduce((a, v) => a + (typeof v.views === 'number' ? v.views : 0), 0),
      medianViews: median(matched.map((v) => v.views)),
      examples: matched.sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 3).map((v) => ({ title: v.title, views: v.views, url: v.url })),
    };
  }

  // Por mercado
  const byMarket = {};
  for (const pq of perQuery) {
    const m = byMarket[pq.market] ?? { queries: 0, videos: 0, medianViews: null, views: [] };
    m.queries++;
    m.videos += pq.videos.length;
    for (const v of pq.videos) if (typeof v.views === 'number') m.views.push(v.views);
    byMarket[pq.market] = m;
  }
  for (const m of Object.values(byMarket)) {
    m.medianViews = median(m.views);
    m.p75Views = m.views.length ? [...m.views].sort((a, b) => a - b)[Math.floor(m.views.length * 0.75)] : null;
    m.maxViews = m.views.length ? Math.max(...m.views) : null;
    delete m.views;
  }

  // video_info para los 15 con más vistas
  let videoInfo = [];
  if (WITH_INFO && !PROBE) {
    for (const v of topByViews.slice(0, 15)) {
      guard();
      const resp = await dfsPost(tracker, 'serp/youtube/video_info/live/advanced', [
        { video_id: v.videoId, location_code: 2840, language_code: 'en' },
      ]);
      costByCall.push({ videoInfo: v.videoId, cost: resp.cost, cached: resp.cached, ok: resp.ok, code: resp.code });
      const item = firstItems(resp).find((i) => i.type === 'youtube_video_info') ?? firstItems(resp)[0] ?? null;
      videoInfo.push({
        videoId: v.videoId,
        title: v.title,
        channel: v.channel,
        url: v.url,
        ok: resp.ok,
        views: item?.views_count ?? null,
        likes: item?.likes_count ?? null,
        comments: item?.comments_count ?? null,
        subscribers: item?.channel_subscribers_count ?? null,
        publishedAt: item?.timestamp ?? null,
        durationSec: item?.duration_time_seconds ?? null,
        category: item?.category ?? null,
        keywords: Array.isArray(item?.keywords) ? item.keywords.slice(0, 15) : null,
      });
      console.log(`info ${v.videoId} likes ${item?.likes_count ?? '-'} comments ${item?.comments_count ?? '-'} cost ${resp.cost.toFixed(4)}${resp.cached ? ' (cache)' : ''}`);
    }
  }

  const out = {
    generatedAt: new Date().toISOString(),
    source: 'DataForSEO serp/youtube/organic/live/advanced (depth 20) + serp/youtube/video_info/live/advanced',
    note: 'views = vistas que YouTube mostraba en el SERP el día de la corrida; viewsPerMonth = views / meses desde publicación (mín. 0,5). Shorts marcados con isShorts.',
    costUsdRun: Math.round(tracker.state.usd * 10000) / 10000,
    apiCalls: tracker.state.calls,
    cachedCalls: tracker.state.cachedCalls,
    errors: tracker.state.errors,
    queries: perQuery,
    uniqueVideos: unique.length,
    byMarket,
    topByViews,
    topByVelocity,
    topTravelByViews,
    topTravelByVelocity,
    topTravelByViewsEn,
    topTravelByViewsEs,
    topChannels,
    durationBuckets: { top30ByViews: buckets(topByViews), top30TravelByViews: buckets(topTravelByViews), allUnique: buckets(unique) },
    medianDurationSecTop30: median(topByViews.map((v) => v.durationSec)),
    medianDurationSecTop30Travel: median(topTravelByViews.map((v) => v.durationSec)),
    medianDurationSecAll: median(unique.filter((v) => !v.isShorts).map((v) => v.durationSec)),
    formats: formatCounts,
    videoInfo,
    costByCall,
  };

  if (!PROBE) {
    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n', 'utf8');
    console.log('escrito', OUT_FILE);
  }
  tracker.flush();
  console.log(`costo de esta corrida US$${tracker.state.usd.toFixed(4)} en ${tracker.state.calls} llamadas (${tracker.state.cachedCalls} de caché); errores ${tracker.state.errors.length}`);
  if (tracker.state.errors.length) console.log(JSON.stringify(tracker.state.errors.slice(0, 5), null, 2));
}

main().catch((err) => {
  console.error(err instanceof BudgetError ? 'PRESUPUESTO: ' + err.message : err);
  process.exit(1);
});
