#!/usr/bin/env bash
# Recorte del rebuild v3: de 2.018 páginas a 20 páginas EN (+ traducciones fr/de/es)
# + 5 legales. Todo lo que se borra acá tiene redirect 301 en vercel.json
# (generado por gestion/rebuild/redirects.mjs a partir de urls-viejas.txt).
set -euo pipefail
cd "$(dirname "$0")/../.."

KEEP_REGIONS="jerusalem tel-aviv dead-sea galilee eilat negev haifa"
KEEP_GUIDES="first-time-in-israel visa-information best-time-to-visit-israel is-israel-safe car-rental-israel best-hotels-jerusalem best-hotels-tel-aviv dead-sea-hotels-guide jerusalem-tours-compared dead-sea-tours-compared day-trips-from-tel-aviv"
KEEP_ITINERARIES="7-days-in-israel 10-days-in-israel"

# Comparación por texto (sin expansión de globs: "[...slug].astro" es un nombre, no un patrón).
in_list() { case " $2 " in *" $1 "*) return 0 ;; esac; return 1; }

prune_collection() { # $1 = colección, $2 = lista a conservar
  local coll="$1" keep="$2" n=0
  for f in $(find "src/content/$coll" -type f -name '*.md'); do
    slug="$(basename "$f" .md)"
    if ! in_list "$slug" "$keep"; then git rm -q "$f"; n=$((n+1)); fi
  done
  echo "$coll: $n archivos borrados"
}

prune_collection regions "$KEEP_REGIONS"
prune_collection guides "$KEEP_GUIDES"
prune_collection itineraries "$KEEP_ITINERARIES"

# Atracciones: la colección entera sale (65 EN + 183 traducciones).
git rm -q -r src/content/attractions && echo "attractions: colección borrada"

# Páginas .astro que no forman parte del sitio nuevo.
KEEP_PAGES="index.astro 404.astro plan-your-trip.astro search.astro rss.xml.js [...slug].astro"
n=0
for f in src/pages/*.astro src/pages/*.js; do
  name="$(basename "$f")"
  if ! in_list "$name" "$KEEP_PAGES"; then git rm -q "$f"; n=$((n+1)); fi
done
echo "páginas sueltas (herramientas e internas): $n borradas"

git rm -q -r src/pages/dashboard src/pages/transport src/pages/where-to-stay
git rm -q "src/pages/[region]/[attraction].astro"
for l in fr de es; do git rm -q "src/pages/$l/[region]/[attraction].astro"; done
echo "rutas dashboard, transport, where-to-stay y atracciones: borradas"

# Datos que solo usaban las páginas borradas.
git rm -q src/data/affiliatePrograms.ts src/data/restaurants.ts
echo "datos huérfanos: borrados"

echo "--- quedan ---"
for c in regions guides itineraries legal; do
  printf "%-12s EN=%s fr=%s de=%s es=%s\n" "$c" \
    "$(find src/content/$c -maxdepth 1 -name '*.md' | wc -l)" \
    "$(find src/content/$c/fr -name '*.md' 2>/dev/null | wc -l)" \
    "$(find src/content/$c/de -name '*.md' 2>/dev/null | wc -l)" \
    "$(find src/content/$c/es -name '*.md' 2>/dev/null | wc -l)"
done
