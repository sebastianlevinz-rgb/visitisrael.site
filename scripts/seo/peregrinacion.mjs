/**
 * scripts/seo/peregrinacion.mjs → data/seo/peregrinacion.json
 *
 * Estudio de keywords de turismo religioso cristiano / peregrinación a Tierra Santa.
 * Seis mercados: EN (EE. UU.), ES (España, México, Argentina), PT (Brasil), IT (Italia),
 * FR (Francia). Para cada keyword: volumen (Google Ads), dificultad (Labs bulk KD) e
 * intención (Labs search_intent). Después, SERP top 10 real de las 12 keywords con más
 * volumen (serp/google/organic/live/regular, depth 10).
 *
 * Usa el cliente compartido (caché en data/seo/cache/, costo acumulado en
 * data/seo/costs.json). Tope propio de esta corrida: US$3.
 *
 *   node scripts/seo/peregrinacion.mjs [--force]
 *
 * No imprime ni escribe claves.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DATA_DIR } from './lib.mjs';
import { BudgetError, createTracker, dfsPost, firstItems, spentByScript } from './api-client.mjs';

const SCRIPT = 'peregrinacion.mjs';
/** Tope propio de esta corrida, en USD. */
const RUN_BUDGET_USD = 3;
const SERP_TOP_N = 12;
const SERP_CONCURRENCY = 4;

/** Mercados: clave → { location_code, language_code, label }. */
const MARKETS = {
  'en-US': { location_code: 2840, language_code: 'en', label: 'EE. UU.' },
  'es-ES': { location_code: 2724, language_code: 'es', label: 'España' },
  'es-MX': { location_code: 2484, language_code: 'es', label: 'México' },
  'es-AR': { location_code: 2032, language_code: 'es', label: 'Argentina' },
  'pt-BR': { location_code: 2076, language_code: 'pt', label: 'Brasil' },
  'it-IT': { location_code: 2380, language_code: 'it', label: 'Italia' },
  'fr-FR': { location_code: 2250, language_code: 'fr', label: 'Francia' },
  'de-DE': { location_code: 2276, language_code: 'de', label: 'Alemania' },
};

const EN = [
  'holy land tour',
  'holy land tours',
  'christian tours israel',
  'pilgrimage to israel',
  'holy land pilgrimage',
  'catholic pilgrimage to the holy land',
  'holy land tour packages',
  'holy land tours from usa',
  'holy land tour cost',
  'best holy land tours',
  'israel bible tour',
  'walk where jesus walked',
  'church of the holy sepulchre',
  'via dolorosa',
  'garden tomb',
  'mount of olives jerusalem',
  'garden of gethsemane',
  'jerusalem christian sites',
  'church of the nativity bethlehem',
  'nazareth basilica',
  'sea of galilee christian sites',
  'mount of beatitudes',
  'capernaum israel',
  'baptism site jordan river',
  'yardenit baptismal site',
  'qasr el yahud',
  'mount tabor israel',
  'ein karem',
  'emmaus israel',
  'holy fire jerusalem',
  'easter in jerusalem',
  'christmas in bethlehem',
];

const ES = [
  'viaje a tierra santa',
  'peregrinacion a tierra santa',
  'peregrinacion a israel',
  'tierra santa',
  'tour tierra santa',
  'viajes a tierra santa precios',
  'lugares santos de jerusalen',
  'santo sepulcro',
  'via dolorosa',
  'iglesia de la natividad belen',
  'basilica de la anunciacion nazaret',
  'monte de los olivos',
  'getsemani',
  'mar de galilea',
  'belen israel',
  'semana santa en jerusalen',
  'que ver en tierra santa',
  'viaje a israel desde españa',
];

const PT = [
  'viagem a terra santa',
  'peregrinacao israel',
  'terra santa',
  'excursao terra santa',
  'santo sepulcro jerusalem',
  'via dolorosa jerusalem',
  'igreja da natividade belem',
  'basilica da anunciacao nazare',
  'mar da galileia',
  'viagem israel preco',
];

const IT = [
  'pellegrinaggio terra santa',
  'viaggio in terra santa',
  'terra santa',
  'santo sepolcro gerusalemme',
  'via dolorosa',
  'basilica della nativita betlemme',
  'basilica dell annunciazione nazareth',
  'lago di tiberiade',
  'monte degli ulivi',
  'pellegrinaggio gerusalemme',
];

const FR = [
  'pelerinage terre sainte',
  'voyage terre sainte',
  'terre sainte',
  'saint sepulcre jerusalem',
  'via dolorosa',
  'basilique de la nativite bethleem',
  'basilique de l annonciation nazareth',
  'lac de tiberiade',
  'mont des oliviers',
  'pelerinage israel',
];

/** Alemán (agregado el 2026-09-23: el primer relevamiento lo dejó sin medir). */
const DE = [
  'heiliges land reise',
  'pilgerreise israel',
  'pilgerreise heiliges land',
  'israel rundreise christlich',
  'grabeskirche jerusalem',
  'via dolorosa jerusalem',
  'gartengrab jerusalem',
  'oelberg jerusalem',
  'garten gethsemane',
  'geburtskirche bethlehem',
  'verkuendigungsbasilika nazareth',
  'see genezareth christliche staetten',
  'berg der seligpreisungen',
  'taufstelle jordan',
  'kapernaum',
  'heiliges land',
  'jerusalem christliche staetten',
  'israel pilgerreise katholisch',
];

/** Mercado → lista de keywords. */
const KEYWORDS_BY_MARKET = {
  'en-US': EN,
  'es-ES': ES,
  'es-MX': ES,
  'es-AR': ES,
  'pt-BR': PT,
  'it-IT': IT,
  'fr-FR': FR,
  'de-DE': DE,
};

/**
 * SERP extra, además de las 12 de más volumen: las keywords de intención comercial
 * ("tour", "peregrinación", "viaje") de cada idioma, que tienen poco volumen pero son
 * las que deciden si vale la pena una página de producto. Se marcan con `extra: true`.
 */
const EXTRA_SERPS = [
  { keyword: 'holy land tour', market: 'en-US' },
  { keyword: 'christian tours israel', market: 'en-US' },
  { keyword: 'garden tomb', market: 'en-US' },
  { keyword: 'mount of beatitudes', market: 'en-US' },
  { keyword: 'viaje a tierra santa', market: 'es-ES' },
  { keyword: 'pellegrinaggio terra santa', market: 'it-IT' },
  { keyword: 'pelerinage terre sainte', market: 'fr-FR' },
  { keyword: 'viagem a terra santa', market: 'pt-BR' },
];

/**
 * Controles de homonimia y de agregación de variantes. Varias keywords de volumen alto no
 * son lo que parecen: "tierra santa" en Argentina es un parque temático de Buenos Aires,
 * "terra santa" en Brasil es un municipio de Pará, "getsemani" en México compite con un
 * barrio de Cartagena, y Google Ads agrega variantes cercanas ("mount tabor israel" devuelve
 * el volumen de "mount tabor", que incluye el parque de Portland). Sin estos controles, el
 * dataset lleva a crear páginas para demanda que no existe.
 */
const CONTROLS = [
  { market: 'en-US', keywords: ['mount tabor', 'mount tabor oregon', 'mount tabor portland', 'mount of olives', 'holy sepulchre', 'holy sepulcher'] },
  { market: 'es-AR', keywords: ['tierra santa buenos aires', 'parque tierra santa', 'tierra santa israel'] },
  { market: 'pt-BR', keywords: ['terra santa para', 'terra santa israel', 'terra santa turismo'] },
  { market: 'es-MX', keywords: ['getsemani cartagena', 'huerto de getsemani', 'getsemani israel'] },
];

const norm = (s) => String(s ?? '').toLowerCase().trim().replace(/\s+/g, ' ');
const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/** Corta la corrida si ya gastamos el tope propio. */
function assertRunBudget(tracker) {
  if (tracker.state.usd >= RUN_BUDGET_USD) {
    throw new BudgetError(`Tope propio de la corrida alcanzado: US$${tracker.state.usd.toFixed(4)}`);
  }
}

async function fetchMetrics(tracker, errors) {
  /** @type {any[]} */
  const rows = [];
  for (const [market, cfg] of Object.entries(MARKETS)) {
    const keywords = [...new Set(KEYWORDS_BY_MARKET[market].map(norm))];
    const { location_code, language_code } = cfg;

    const vol = new Map();
    const kd = new Map();
    const intent = new Map();

    assertRunBudget(tracker);
    const volResp = await dfsPost(tracker, 'keywords_data/google_ads/search_volume/live', [
      { keywords, location_code, language_code, search_partners: false },
    ]);
    for (const it of firstItems(volResp).length ? firstItems(volResp) : resultRows(volResp)) {
      if (!it?.keyword) continue;
      vol.set(norm(it.keyword), {
        volume: it.search_volume ?? null,
        cpc: it.cpc ?? null,
        competition: it.competition ?? null,
        competitionIndex: it.competition_index ?? null,
        monthly: Array.isArray(it.monthly_searches) ? it.monthly_searches.slice(0, 12) : null,
      });
    }
    if (vol.size === 0) errors.push({ step: 'search_volume', market, message: 'sin filas' });

    assertRunBudget(tracker);
    const kdResp = await dfsPost(tracker, 'dataforseo_labs/google/bulk_keyword_difficulty/live', [
      { keywords, location_code, language_code },
    ]);
    for (const it of firstItems(kdResp)) kd.set(norm(it.keyword), it.keyword_difficulty ?? null);

    assertRunBudget(tracker);
    const intResp = await dfsPost(tracker, 'dataforseo_labs/google/search_intent/live', [
      { keywords, language_code },
    ]);
    for (const it of firstItems(intResp)) {
      intent.set(norm(it.keyword), {
        main: it.keyword_intent?.label ?? null,
        probability: it.keyword_intent?.probability ?? null,
        secondary: (it.secondary_keyword_intents ?? []).map((s) => s.label),
      });
    }

    for (const kw of keywords) {
      const v = vol.get(kw) ?? {};
      rows.push({
        keyword: kw,
        market,
        locationCode: location_code,
        languageCode: language_code,
        marketLabel: cfg.label,
        volume: v.volume ?? null,
        cpc: v.cpc ?? null,
        competition: v.competition ?? null,
        competitionIndex: v.competitionIndex ?? null,
        monthlySearches: v.monthly ?? null,
        difficulty: kd.get(kw) ?? null,
        intent: intent.get(kw) ?? null,
      });
    }
    console.log(`${market}: ${keywords.length} keywords, costo acumulado US$${tracker.state.usd.toFixed(4)}`);
  }
  return rows;
}

async function fetchControls(tracker, errors) {
  const out = [];
  for (const c of CONTROLS) {
    const cfg = MARKETS[c.market];
    try {
      assertRunBudget(tracker);
    } catch (err) {
      errors.push({ step: 'controls', market: c.market, message: String(err.message) });
      break;
    }
    const resp = await dfsPost(tracker, 'keywords_data/google_ads/search_volume/live', [
      { keywords: c.keywords.map(norm), location_code: cfg.location_code, language_code: cfg.language_code, search_partners: false },
    ]);
    for (const r of resultRows(resp)) {
      out.push({ keyword: norm(r.keyword), market: c.market, marketLabel: cfg.label, volume: r.search_volume ?? null });
    }
  }
  return out;
}

/** Google Ads search_volume devuelve el array en result, no en result[0].items. */
function resultRows(resp) {
  const t = resp?.tasks?.find((x) => x?.status_code === 20000);
  return Array.isArray(t?.result) ? t.result : [];
}

async function fetchSerps(tracker, picks, errors) {
  const out = [];
  const queue = [...picks];
  const worker = async () => {
    while (queue.length) {
      const p = queue.shift();
      try {
        assertRunBudget(tracker);
      } catch (err) {
        errors.push({ step: 'serp', keyword: p.keyword, message: String(err.message) });
        return;
      }
      const resp = await dfsPost(tracker, 'serp/google/organic/live/regular', [
        {
          keyword: p.keyword,
          location_code: p.locationCode,
          language_code: p.languageCode,
          depth: 10,
          device: 'desktop',
          os: 'windows',
        },
      ]);
      const t = resp.tasks.find((x) => x?.status_code === 20000);
      const result = t?.result?.[0];
      if (!result) {
        errors.push({ step: 'serp', keyword: p.keyword, market: p.market, message: 'sin resultado' });
        continue;
      }
      const items = Array.isArray(result.items) ? result.items : [];
      const organic = items.filter((it) => it.type === 'organic');
      out.push({
        keyword: p.keyword,
        market: p.market,
        volume: p.volume,
        extra: p.extra === true,
        features: [...new Set((result.item_types ?? []).filter((x) => x !== 'organic'))],
        top10: organic.slice(0, 10).map((it) => ({
          position: it.rank_group ?? it.rank_absolute,
          domain: (it.domain ?? domainOf(it.url) ?? '').replace(/^www\./, ''),
          url: it.url,
          title: it.title ?? null,
        })),
      });
    }
  };
  await Promise.all(Array.from({ length: SERP_CONCURRENCY }, worker));
  return out.sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0));
}

async function main() {
  const tracker = createTracker(SCRIPT);
  const errors = [];
  let keywords = [];
  let controls = [];
  let serps = [];
  try {
    keywords = await fetchMetrics(tracker, errors);
    controls = await fetchControls(tracker, errors);
    const picks = [...keywords]
      .filter((k) => (k.volume ?? 0) > 0)
      .sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0))
      .filter((k, i, arr) => arr.findIndex((x) => x.keyword === k.keyword) === i)
      .slice(0, SERP_TOP_N);
    console.log('SERP para:', picks.map((p) => `${p.keyword} (${p.market}, ${p.volume})`).join(' | '));
    const extras = EXTRA_SERPS.map((e) => {
      const row = keywords.find((k) => k.keyword === norm(e.keyword) && k.market === e.market);
      return row ? { ...row, extra: true } : null;
    }).filter((e) => e && !picks.some((p) => p.keyword === e.keyword && p.market === e.market));
    serps = await fetchSerps(tracker, [...picks, ...extras], errors);
  } catch (err) {
    if (err instanceof BudgetError) {
      errors.push({ step: 'budget', message: String(err.message) });
      console.error('Corte por presupuesto:', err.message);
    } else {
      throw err;
    }
  } finally {
    tracker.flush();
  }

  // costUsd = lo que costó generar este dataset en total (todas las corridas del script,
  // incluida la sonda de homónimos que corrió con otro nombre antes de integrarse acá);
  // re-correr desde caché no lo baja a cero. `flush()` ya corrió, así que no se suma aparte.
  const payload = {
    generatedAt: new Date().toISOString(),
    costUsd: Math.round((spentByScript(SCRIPT) + spentByScript('peregrinacion-probe.mjs')) * 10000) / 10000,
    costUsdThisRun: Math.round(tracker.state.usd * 10000) / 10000,
    budgetUsd: RUN_BUDGET_USD,
    calls: tracker.state.calls,
    cachedCalls: tracker.state.cachedCalls,
    markets: MARKETS,
    keywords,
    controls,
    serps,
    errors: [...errors, ...tracker.state.errors.map((e) => ({ step: e.endpoint, code: e.code, message: e.message }))],
  };
  writeFileSync(join(DATA_DIR, 'peregrinacion.json'), JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(
    `OK: ${keywords.length} filas de keyword, ${serps.length} SERPs, costo de esta corrida US$${payload.costUsd.toFixed(4)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
