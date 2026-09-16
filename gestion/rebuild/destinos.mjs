/**
 * Regla única de destino para las URLs dadas de baja en el rebuild v3.
 * La usan:
 *   - redirects.mjs  → mapa de redirects 301 en vercel.json
 *   - fix-links.mjs  → links internos del contenido que apuntaban a páginas borradas
 *
 * targetFor(path sin prefijo de idioma) → { to: path EN, specific: boolean }
 *   specific = true  → hay una página nueva que cubre esa intención
 *   specific = false → no hay equivalente: cae al fallback genérico (/first-time-in-israel).
 *                      Sirve para un redirect (mejor que un 404), no para un link en el texto.
 */
export const KEPT_REGIONS = ['jerusalem', 'tel-aviv', 'dead-sea', 'galilee', 'eilat', 'negev', 'haifa'];
export const MERGED_REGIONS = { akko: 'haifa', caesarea: 'haifa', golan: 'galilee', nazareth: 'galilee' };

const has = (slug, re) => re.test(slug);

function cityOf(s) {
  if (has(s, /jerusalem|bethlehem|jericho|old-city|western-wall|mount-of-olives|yad-vashem/)) return '/jerusalem';
  if (has(s, /tel-aviv|jaffa|neve-tzedek|carmel-market/)) return '/tel-aviv';
  if (has(s, /dead-sea|masada|ein-gedi|ein-bokek|qumran/)) return '/dead-sea';
  if (has(s, /eilat|red-sea|timna|petra|aqaba/)) return '/eilat';
  if (has(s, /negev|mitzpe|ramon|beersheba|be-er-sheva|beer-sheva|arava|arad|sde-boker|avdat/)) return '/negev';
  if (has(s, /galilee|nazareth|tiberias|golan|safed|tzfat|kinneret|capernaum|jordan-river|hermon/)) return '/galilee';
  if (has(s, /haifa|akko|acre|caesarea|carmel|bahai|zichron|netanya|rosh-hanikra/)) return '/haifa';
  return null;
}

const specific = (to) => ({ to, specific: true });

export function targetFor(rest) {
  const segs = rest.split('/').filter(Boolean);
  const first = segs[0] ?? '';

  // Páginas internas que nunca debieron ser públicas.
  if (['dashboard', 'pitch', 'competitors', 'content-library'].includes(first)) return { to: '/', specific: false };

  // Dónde dormir por ciudad → guía de hoteles de esa ciudad.
  if (first === 'where-to-stay') {
    const city = segs[1] ?? '';
    if (city === 'jerusalem') return specific('/best-hotels-jerusalem');
    if (city === 'tel-aviv') return specific('/best-hotels-tel-aviv');
    if (city === 'dead-sea') return specific('/dead-sea-hotels-guide');
    return { to: '/first-time-in-israel', specific: false };
  }

  // Rutas de transporte punto a punto: no hay equivalente.
  if (first === 'transport') return { to: '/first-time-in-israel', specific: false };

  // Itinerarios dados de baja → el más parecido.
  if (first === 'itineraries' && segs[1]) {
    const it = segs[1];
    if (it === '3-days-in-jerusalem') return specific('/jerusalem');
    if (it === '2-days-in-tel-aviv') return specific('/tel-aviv');
    if (it === '5-days-in-israel') return specific('/itineraries/7-days-in-israel');
    if (it === '14-days-in-israel') return specific('/itineraries/10-days-in-israel');
  }

  // Regiones y sus atracciones.
  if (KEPT_REGIONS.includes(first)) return specific(`/${first}`);
  if (MERGED_REGIONS[first]) return specific(`/${MERGED_REGIONS[first]}`);

  // Guías y herramientas (un solo segmento): por intención.
  const s = first;
  if (has(s, /visa|(^|-)eta(-|$)|passport|border|customs|entry-requirement|working-holiday|immigration/)) return specific('/visa-information');
  if (has(s, /safe|safety|security|emergency|scam/)) return specific('/is-israel-safe');
  if (has(s, /hotel|hostel|accommodation|where-to-stay|airbnb|guesthouse|resort|zimmer/)) {
    if (has(s, /tel-aviv|jaffa/)) return specific('/best-hotels-tel-aviv');
    if (has(s, /jerusalem/)) return specific('/best-hotels-jerusalem');
    if (has(s, /dead-sea|ein-bokek/)) return specific('/dead-sea-hotels-guide');
    return specific(cityOf(s) ?? '/best-hotels-jerusalem');
  }
  if (has(s, /tour|day-trip|excursion|guided|shore/)) {
    if (has(s, /dead-sea|masada|ein-gedi/)) return specific('/dead-sea-tours-compared');
    if (has(s, /tel-aviv|jaffa|caesarea|haifa|cruise|shore/)) return specific('/day-trips-from-tel-aviv');
    return specific('/jerusalem-tours-compared');
  }
  if (has(s, /car-|-car|driving|drive|road-trip|rental|parking|(^|-)ev(-|$)|motorhome|scenic/)) return specific('/car-rental-israel');
  if (has(s, /january|february|march|april|may|june|july|august|september|october|november|december|season|weather|when-to|best-time|festival|holiday|passover|purim|rosh-hashanah|sukkot|hanukkah|shavuot|yom-|easter|christmas|ramadan|tu-bishvat|lag-baomer|golden-hour|shabbat-calendar|shabbat-countdown|wildflower|bloom/)) {
    return specific(cityOf(s) ?? '/best-time-to-visit-israel');
  }
  if (has(s, /itinerary|days-in|day-in|(^|-)\d+-day|how-many-days|effective-days|trip-length|build-your-trip/)) return specific('/itineraries/7-days-in-israel');

  const city = cityOf(s);
  return city ? specific(city) : { to: '/first-time-in-israel', specific: false };
}
