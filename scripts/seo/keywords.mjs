/**
 * scripts/seo/keywords.mjs → data/seo/keywords.json
 *
 * Para cada página objetivo de scripts/seo/targets.json (30 páginas × 5 idiomas):
 *   1. Volumen, CPC, competencia (Google Ads) + dificultad (Labs bulk KD) + intención
 *      (Labs search_intent). Si Google Ads no está habilitado → keyword_overview para primarias.
 *   2. Nuestras posiciones (Labs ranked_keywords, target visitisrael.site) por idioma.
 *   3. SERP top 10 real por keyword primaria (serp/google/organic/live/regular).
 *   4. Benchmark de contenido de los que rankean (Firecrawl) para primarias EN y ES.
 *
 * Re-ejecutable e idempotente: las respuestas se cachean en data/seo/cache/ (--force las ignora).
 * El gasto se acumula en data/seo/costs.json y corta al llegar al tope (api-client.mjs).
 *
 *   node scripts/seo/keywords.mjs [--force] [--skip-firecrawl]
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, ROOT, parseHtml, readJson, wordCount, writeJson } from './lib.mjs';
import {
  BudgetError,
  createTracker,
  dfsPost,
  firecrawlScrape,
  firstItems,
  firstResult,
  spentByScript,
} from './api-client.mjs';

const SCRIPT = 'keywords.mjs';
const OUR_DOMAIN = 'visitisrael.site';
const SKIP_FIRECRAWL = process.argv.includes('--skip-firecrawl');
const LOCALE_ORDER = ['en', 'es', 'fr', 'de', 'he'];
/** Dominios que no cuentan como competidor editorial en el benchmark de contenido. */
const MARKETPLACES = [
  'getyourguide', 'viator', 'tripadvisor', 'booking.com', 'civitatis', 'expedia', 'youtube',
  'reddit', 'wikipedia', 'hotels.com', 'airbnb', 'kayak', 'trivago', 'agoda', 'klook',
  'facebook', 'instagram', 'tiktok', 'pinterest', 'google.', 'amazon', 'wikivoyage', 'wikitravel',
];

const targets = JSON.parse(readFileSync(new URL('./targets.json', import.meta.url), 'utf8'));
const LOC = targets.locationByLocale;

/* ------------------------------------------------------------------ helpers */

const norm = (s) => String(s ?? '').toLowerCase().trim().replace(/\s+/g, ' ');
const stripAccents = (s) => norm(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};
const isOurs = (urlOrDomain) => (urlOrDomain ?? '').includes(OUR_DOMAIN);
const isMarketplace = (domain) => MARKETPLACES.some((m) => domain.includes(m));

/** Mapa keyword normalizada → valor, con fallback sin acentos. */
class KwMap {
  constructor() {
    this.exact = new Map();
    this.loose = new Map();
  }
  set(kw, value) {
    this.exact.set(norm(kw), value);
    this.loose.set(stripAccents(kw), value);
  }
  get(kw) {
    return this.exact.get(norm(kw)) ?? this.loose.get(stripAccents(kw));
  }
}

function localePath(locale, path) {
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** Lista plana de páginas objetivo: 30 × 5. */
function buildTargets() {
  const out = [];
  for (const page of targets.pages) {
    for (const locale of LOCALE_ORDER) {
      const kw = page.keywords[locale];
      if (!kw) continue;
      out.push({
        path: localePath(locale, page.path),
        basePath: page.path,
        slug: page.slug,
        collection: page.collection,
        locale,
        primary: norm(kw.primary),
        secondary: (kw.secondary ?? []).map(norm),
      });
    }
  }
  return out;
}

/* ------------------------------------------------------------------ nuestras palabras */

function ourWordCount(t) {
  const distFile = join(DIST, ...t.path.split('/').filter(Boolean), 'index.html');
  if (existsSync(distFile)) {
    const root = parseHtml(readFileSync(distFile, 'utf8'));
    const main = root.querySelector('main') ?? root.querySelector('article') ?? root.querySelector('body');
    if (main) {
      for (const el of main.querySelectorAll('nav, header, footer, aside, script, style, noscript, form, [data-affiliate-card]')) {
        el.remove();
      }
      return wordCount(main.text);
    }
  }
  if (!['regions', 'guides', 'itineraries'].includes(t.collection)) return null;
  const dir = t.locale === 'en' ? t.collection : `${t.collection}/${t.locale}`;
  const md = join(ROOT, 'src', 'content', dir, `${t.slug}.md`);
  if (!existsSync(md)) return null;
  const body = readFileSync(md, 'utf8').replace(/^---[\s\S]*?\n---\s*/, '');
  return wordCount(body.replace(/[#*_>`[\]()!-]/g, ' '));
}

/* ------------------------------------------------------------------ paso 1 */

async function fetchMetrics(tracker, pagesByLocale, errors) {
  /** @type {Record<string, { kd: KwMap, vol: KwMap, intent: KwMap }>} */
  const metrics = {};
  for (const locale of LOCALE_ORDER) {
    const pages = pagesByLocale[locale];
    if (!pages?.length) continue;
    const { location_code, language_code } = LOC[locale];
    const keywords = [...new Set(pages.flatMap((p) => [p.primary, ...p.secondary]))];
    const primaries = [...new Set(pages.map((p) => p.primary))];
    const m = { kd: new KwMap(), vol: new KwMap(), intent: new KwMap() };
    metrics[locale] = m;

    // 1a. Dificultad (Labs bulk KD)
    const kdResp = await dfsPost(tracker, 'dataforseo_labs/google/bulk_keyword_difficulty/live', [
      { keywords, location_code, language_code },
    ]);
    for (const it of firstItems(kdResp)) m.kd.set(it.keyword, it.keyword_difficulty ?? null);
    console.log(`[${locale}] KD: ${firstItems(kdResp).length}/${keywords.length} keywords (cost ${kdResp.cost})`);

    // 1b. Volumen + CPC + competencia (Google Ads). Hebreo: Google Ads usa "iw" (verificado: "he" da 40501).
    let volumeOk = false;
    const langCandidates = locale === 'he' ? ['iw', 'he'] : [language_code];
    for (const lang of langCandidates) {
      const volResp = await dfsPost(tracker, 'keywords_data/google_ads/search_volume/live', [
        { keywords, location_code, language_code: lang, search_partners: false },
      ]);
      const task = volResp.tasks[0];
      if (task?.status_code === 20000) {
        for (const it of firstResult(volResp)) {
          m.vol.set(it.keyword, {
            volume: it.search_volume ?? null,
            cpc: it.cpc ?? null,
            competition: it.competition ?? null,
            competitionIndex: it.competition_index ?? null,
          });
        }
        volumeOk = true;
        // Si un código de idioma anterior falló (he → iw), ese error ya no es relevante.
        tracker.state.errors = tracker.state.errors.filter(
          (e) => !(e.endpoint === 'keywords_data/google_ads/search_volume/live' && e.code === 40501),
        );
        console.log(`[${locale}] Google Ads volumen: ${firstResult(volResp).length} keywords (cost ${volResp.cost})`);
        break;
      }
      console.log(`[${locale}] Google Ads (${lang}) falló: ${task?.status_code ?? volResp.code} ${task?.status_message ?? volResp.message}`);
    }

    // 1c. Fallback: keyword_overview solo para primarias (volumen + KD + intent).
    if (!volumeOk) {
      errors.push({ step: 'search_volume', locale, message: 'Google Ads no disponible; se usó keyword_overview para primarias' });
      const ovResp = await dfsPost(tracker, 'dataforseo_labs/google/keyword_overview/live', [
        { keywords: primaries, location_code, language_code },
      ]);
      for (const it of firstItems(ovResp)) {
        m.vol.set(it.keyword, {
          volume: it.keyword_info?.search_volume ?? null,
          cpc: it.keyword_info?.cpc ?? null,
          competition: it.keyword_info?.competition_level ?? null,
          competitionIndex: it.keyword_info?.competition ?? null,
        });
        if (it.keyword_properties?.keyword_difficulty != null && m.kd.get(it.keyword) == null) {
          m.kd.set(it.keyword, it.keyword_properties.keyword_difficulty);
        }
        if (it.search_intent_info?.main_intent) m.intent.set(it.keyword, it.search_intent_info.main_intent);
      }
      console.log(`[${locale}] keyword_overview: ${firstItems(ovResp).length} primarias (cost ${ovResp.cost})`);
    }

    // 1d. Intención (Labs search_intent; sin location). Si no está soportado el idioma, se registra.
    if (m.intent.exact.size === 0) {
      const intResp = await dfsPost(tracker, 'dataforseo_labs/google/search_intent/live', [
        { keywords, language_code },
      ]);
      const items = firstItems(intResp);
      for (const it of items) m.intent.set(it.keyword, it.keyword_intent?.label ?? null);
      if (!items.length) {
        errors.push({ step: 'search_intent', locale, message: `sin intención (${intResp.tasks[0]?.status_message ?? intResp.message})` });
      }
      console.log(`[${locale}] intent: ${items.length} keywords (cost ${intResp.cost})`);
    }
  }
  return metrics;
}

/* ------------------------------------------------------------------ paso 2 */

async function fetchOurRankings(tracker, errors) {
  const ourRankings = [];
  for (const locale of LOCALE_ORDER) {
    const { location_code, language_code } = LOC[locale];
    const resp = await dfsPost(tracker, 'dataforseo_labs/google/ranked_keywords/live', [
      {
        target: OUR_DOMAIN,
        location_code,
        language_code,
        limit: 500,
        order_by: ['ranked_serp_element.serp_item.rank_absolute,asc'],
      },
    ]);
    const items = firstItems(resp);
    const task = resp.tasks[0];
    if (task && task.status_code !== 20000) {
      errors.push({ step: 'ranked_keywords', locale, message: `${task.status_code} ${task.status_message}` });
    }
    for (const it of items) {
      const serp = it.ranked_serp_element?.serp_item ?? {};
      ourRankings.push({
        keyword: it.keyword_data?.keyword ?? '',
        position: serp.rank_absolute ?? serp.rank_group ?? null,
        url: serp.url ?? null,
        volume: it.keyword_data?.keyword_info?.search_volume ?? null,
        locale,
      });
    }
    console.log(`[${locale}] ranked_keywords visitisrael.site: ${items.length} (total ${firstResult(resp)[0]?.total_count ?? 0}, cost ${resp.cost})`);
  }
  return ourRankings;
}

/* ------------------------------------------------------------------ paso 3 */

/** El endpoint live acepta UNA task por request; se paraleliza con un pool chico. */
const SERP_CONCURRENCY = 5;

async function fetchSerps(tracker, pages) {
  /** @type {Map<string, { top10: any[], features: string[], ourPosition: number|null, ourUrl: string|null }>} */
  const byKey = new Map();
  let ok = 0;
  let cached = 0;
  let cost = 0;
  const queue = [...pages];

  const worker = async () => {
    while (queue.length) {
      const p = queue.shift();
      const task = {
        keyword: p.primary,
        location_code: LOC[p.locale].location_code,
        language_code: LOC[p.locale].language_code,
        depth: 10,
        device: 'desktop',
        os: 'windows',
      };
      const resp = await dfsPost(tracker, 'serp/google/organic/live/regular', [task]);
      cost += resp.cost;
      if (resp.cached) cached++;
      const t = resp.tasks.find((x) => x?.status_code === 20000);
      const result = t?.result?.[0];
      if (!result) continue;
      ok++;
      const items = Array.isArray(result.items) ? result.items : [];
      const organic = items.filter((it) => it.type === 'organic');
      const top10 = organic.slice(0, 10).map((it) => ({
        url: it.url,
        domain: (it.domain ?? domainOf(it.url) ?? '').replace(/^www\./, ''),
        position: it.rank_group ?? it.rank_absolute,
        title: it.title ?? null,
      }));
      const ours = items.find((it) => isOurs(it.domain) || isOurs(it.url));
      const features = [...new Set((result.item_types ?? []).filter((x) => x !== 'organic'))];
      byKey.set(`${p.locale}|${p.primary}`, {
        top10,
        features,
        ourPosition: ours ? ours.rank_absolute ?? ours.rank_group ?? null : null,
        ourUrl: ours?.url ?? null,
      });
    }
  };

  await Promise.all(Array.from({ length: SERP_CONCURRENCY }, worker));
  console.log(`SERP: ${ok}/${pages.length} ok, ${cached} de caché, costo ${cost.toFixed(4)}`);
  return byKey;
}

/* ------------------------------------------------------------------ paso 4 */

function analyseMarkdown(md, title) {
  const text = md ?? '';
  const h2Count = (text.match(/^##\s+/gm) ?? []).length;
  const imageCount = (text.match(/!\[/g) ?? []).length;
  const hasFaq = /\b(faq|faqs|frequently asked|preguntas frecuentes|questions fréquentes|häufige fragen|שאלות נפוצות)\b/i.test(text)
    || (text.match(/^#{2,4}\s.*\?\s*$/gm) ?? []).length >= 3;
  const hasPrices = /[$€₪£]\s?\d|\d\s?(usd|eur|nis|ils|shekel|sheqel|euros?|dólares|dollars|€|\$)\b/i.test(text);
  const yearInTitle = /\b20\d{2}\b/.test(title ?? '');
  return { wordCount: wordCount(text.replace(/[#*_>`[\]()!|-]/g, ' ')), h2Count, imageCount, hasFaq, hasPrices, yearInTitle };
}

async function benchmarkContent(tracker, pages, serps, errors) {
  /** @type {Map<string, any>} url → análisis */
  const analysed = new Map();
  const candidates = pages
    .filter((p) => p.locale === 'en' || p.locale === 'es')
    .sort((a, b) => (a.locale === b.locale ? (b.volume ?? 0) - (a.volume ?? 0) : a.locale === 'en' ? -1 : 1));

  for (const p of candidates) {
    const serp = serps.get(`${p.locale}|${p.primary}`);
    if (!serp) continue;
    const editorial = serp.top10.filter((r) => !isMarketplace(r.domain) && !isOurs(r.domain)).slice(0, 3);
    const top = [];
    for (const r of editorial) {
      let a = analysed.get(r.url);
      if (!a) {
        if (tracker.remainingScrapes() <= 0) break;
        const res = await firecrawlScrape(tracker, r.url);
        if (res.skipped) break;
        a = res.ok ? { ok: true, ...analyseMarkdown(res.markdown, r.title || res.title) } : { ok: false, reason: res.reason ?? `HTTP ${res.status}` };
        analysed.set(r.url, a);
      }
      if (a.ok) {
        top.push({ url: r.url, domain: r.domain, position: r.position, ...a, ok: undefined });
      } else {
        top.push({ url: r.url, domain: r.domain, position: r.position, wordCount: null, h2Count: null, hasFaq: null, hasPrices: null, yearInTitle: /\b20\d{2}\b/.test(r.title ?? ''), scrapeError: a.reason });
      }
    }
    p.topCompetitors = top.map((t) => {
      const { ok, ...rest } = t;
      return rest;
    });
    const words = top.filter((t) => t.wordCount != null).map((t) => t.wordCount);
    p.avgTopWords = words.length ? Math.round(words.reduce((a, b) => a + b, 0) / words.length) : null;
    if (tracker.remainingScrapes() <= 0) {
      errors.push({ step: 'firecrawl', message: 'tope de scrapes alcanzado; el resto de páginas queda sin benchmark' });
      break;
    }
  }
  console.log(`Firecrawl: ${tracker.state.firecrawlScrapes} scrapes nuevos, ${analysed.size} URLs analizadas`);
}

/* ------------------------------------------------------------------ main */

async function main() {
  const tracker = createTracker(SCRIPT);
  const errors = [];
  const pages = buildTargets();
  const pagesByLocale = Object.fromEntries(LOCALE_ORDER.map((l) => [l, pages.filter((p) => p.locale === l)]));
  console.log(`${pages.length} páginas objetivo. Gastado antes: US$${tracker.state.spentBefore.toFixed(4)}; scrapes previos: ${tracker.state.firecrawlBefore}`);

  let ourRankings = [];
  let serps = new Map();
  let metrics = {};
  let budgetHit = false;

  try {
    metrics = await fetchMetrics(tracker, pagesByLocale, errors);
    ourRankings = await fetchOurRankings(tracker, errors);
    serps = await fetchSerps(tracker, pages);
  } catch (err) {
    if (!(err instanceof BudgetError)) throw err;
    budgetHit = true;
    errors.push({ step: 'budget', message: err.message });
    console.error(err.message);
  }

  // Enriquecer páginas con métricas + posiciones + SERP
  const rankingIndex = new Map();
  for (const r of ourRankings) rankingIndex.set(`${r.locale}|${norm(r.keyword)}`, r);

  for (const p of pages) {
    const m = metrics[p.locale];
    const vol = m?.vol.get(p.primary);
    p.volume = vol?.volume ?? null;
    p.cpc = vol?.cpc ?? null;
    p.competition = vol?.competition ?? null;
    p.difficulty = m?.kd.get(p.primary) ?? null;
    p.intent = m?.intent.get(p.primary) ?? null;
    p.secondaryMetrics = p.secondary.map((kw) => ({
      keyword: kw,
      volume: m?.vol.get(kw)?.volume ?? null,
      difficulty: m?.kd.get(kw) ?? null,
    }));
    const serp = serps.get(`${p.locale}|${p.primary}`);
    const labs = rankingIndex.get(`${p.locale}|${p.primary}`);
    p.position = serp?.ourPosition ?? labs?.position ?? null;
    p.rankingUrl = serp?.ourUrl ?? labs?.url ?? null;
    p.serpFeatures = serp?.features ?? [];
    p.serpTop10 = serp?.top10 ?? [];
    p.topCompetitors = [];
    p.avgTopWords = null;
    p.ourWords = ourWordCount(p);
  }

  if (!budgetHit && !SKIP_FIRECRAWL && serps.size) {
    try {
      await benchmarkContent(tracker, pages, serps, errors);
    } catch (err) {
      errors.push({ step: 'firecrawl', message: String(err?.message ?? err) });
      console.error('Firecrawl:', err?.message ?? err);
    }
  }

  // Preservar benchmark previo si esta corrida no lo hizo (p. ej. --skip-firecrawl)
  const previous = readJson('keywords');
  if (previous?.pages) {
    const prevByPath = new Map(previous.pages.map((x) => [x.path, x]));
    for (const p of pages) {
      const prev = prevByPath.get(p.path);
      if (prev && !p.topCompetitors?.length && prev.topCompetitors?.length) {
        p.topCompetitors = prev.topCompetitors;
        p.avgTopWords = prev.avgTopWords;
      }
    }
  }

  const r4 = (n) => Math.round(n * 10000) / 10000;
  const out = {
    locationByLocale: LOC,
    /** Costo acumulado de todas las corridas de este script (lo que costó el dato). */
    costUsd: r4(spentByScript(SCRIPT) + tracker.state.usd),
    costUsdRun: r4(tracker.state.usd),
    costUsdAllSeoScripts: r4(tracker.totalUsd()),
    apiCalls: tracker.state.calls,
    cachedCalls: tracker.state.cachedCalls,
    firecrawlScrapes: tracker.state.firecrawlScrapes,
    errors: [...errors, ...tracker.state.errors.map((e) => ({ step: e.endpoint, code: e.code, message: e.message }))],
    pages: pages.map((p) => ({
      path: p.path,
      locale: p.locale,
      keyword: p.primary,
      secondary: p.secondaryMetrics,
      volume: p.volume,
      difficulty: p.difficulty,
      cpc: p.cpc,
      competition: p.competition,
      intent: p.intent,
      position: p.position,
      rankingUrl: p.rankingUrl,
      serpFeatures: p.serpFeatures,
      serpTop10: p.serpTop10,
      topCompetitors: p.topCompetitors,
      avgTopWords: p.avgTopWords,
      ourWords: p.ourWords,
    })),
    ourRankings,
  };
  const file = writeJson('keywords', out);
  tracker.flush();

  const withVolume = out.pages.filter((p) => p.volume != null && p.volume > 0).length;
  console.log(`\nEscrito ${file}`);
  console.log(`Costo de esta corrida: US$${out.costUsdRun} (este script acumulado US$${out.costUsd}; todos los scripts SEO US$${out.costUsdAllSeoScripts}); llamadas ${out.apiCalls}, caché ${out.cachedCalls}`);
  console.log(`Páginas con volumen: ${withVolume}/${out.pages.length}; nuestras keywords en Labs: ${ourRankings.length}; errores: ${out.errors.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
