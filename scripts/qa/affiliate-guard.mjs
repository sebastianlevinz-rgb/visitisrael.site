/**
 * Affiliate guard — checks the HTML people actually receive, not the code.
 *
 * The previous site shipped `aid=BOOKING_AID` on 2,018 pages for two months: the
 * code looked fine, every test passed, nothing warned. This guard reads the built
 * (or deployed) HTML and enforces the two loud modes of src/config/affiliates.ts:
 *
 *   - Placeholder IDs (`aid=BOOKING_AID`, `partner_id=GYG_PARTNER_ID`, …) → FAIL,
 *     in every mode. A fake ID is never acceptable.
 *   - pre-approval mode  → print "MODO PRE-AFILIADO — N links sin monetizar".
 *   - production mode    → FAIL if any partner link lacks its affiliate param.
 *
 * Usage:
 *   node scripts/qa/affiliate-guard.mjs                    # scan ./dist
 *   node scripts/qa/affiliate-guard.mjs --dist path/to/dist
 *   node scripts/qa/affiliate-guard.mjs --url https://visitisrael.site [--pages /,/jerusalem]
 *   node scripts/qa/affiliate-guard.mjs --mode production  # default: PUBLIC_AFFILIATE_MODE
 *
 * Also runs inside the Astro build via the integration in astro.config.mjs.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Every placeholder name the old config used as a fake ID. */
export const PLACEHOLDER_TOKENS = [
  'BOOKING_AID',
  'GYG_PARTNER_ID',
  'VIATOR_ID',
  'CIVITATIS_AID',
  'SKYSCANNER_MARKER',
  'RENTALCARS_AID',
  'SAFETYWING_REF',
  'STAY22_AID',
  'AIRALO_REF',
  'HOSTELWORLD_AID',
  'ABRAHAM_TOURS_ID',
  'TOURRADAR_AID',
  'WELCOMEPICKUPS_REF',
  'KIWITAXI_MARKER',
  'DISCOVERCARS_AID',
  'TIQETS_PARTNER',
  'AMAZON_ASSOCIATE_TAG',
  'INSUREMYTRIP_AID',
  'SQUAREMOUTH_AID',
];

/** Partner host → the query param that carries our affiliate ID. */
export const PARTNER_RULES = [
  { partner: 'booking', host: /(^|\.)booking\.com$/, param: 'aid' },
  { partner: 'getyourguide', host: /(^|\.)getyourguide\.[a-z.]+$/, param: 'partner_id' },
  { partner: 'viator', host: /(^|\.)viator\.com$/, param: 'pid' },
  { partner: 'civitatis', host: /(^|\.)civitatis\.com$/, param: 'aid' },
  { partner: 'abraham', host: /(^|\.)abrahamtours\.com$/, param: 'ref' },
  { partner: 'skyscanner', host: /(^|\.)skyscanner\.[a-z.]+$/, param: 'associateid' },
  { partner: 'rentalcars', host: /(^|\.)rentalcars\.com$/, param: 'affiliateCode' },
  { partner: 'safetywing', host: /(^|\.)safetywing\.com$/, param: 'referenceID' },
  { partner: 'stay22', host: /(^|\.)stay22\.com$/, param: 'aid', pathId: /^\/embed\/(?!gm\b)[^/]+/ },
  { partner: 'airalo', host: /(^|\.)airalo\.com$/, param: 'ref' },
  { partner: 'hostelworld', host: /(^|\.)hostelworld\.com$/, param: 'aid' },
  { partner: 'tourradar', host: /(^|\.)tourradar\.com$/, param: 'a_aid' },
  { partner: 'welcomepickups', host: /(^|\.)welcomepickups\.com$/, param: 'ref' },
  { partner: 'kiwitaxi', host: /(^|\.)kiwitaxi\.[a-z.]+$/, param: 'marker' },
  { partner: 'discovercars', host: /(^|\.)discovercars\.com$/, param: 'a_aid' },
  { partner: 'tiqets', host: /(^|\.)tiqets\.com$/, param: 'partner' },
  { partner: 'insuremytrip', host: /(^|\.)insuremytrip\.com$/, param: 'affiliateID' },
  { partner: 'squaremouth', host: /(^|\.)squaremouth\.com$/, param: 'affiliateID' },
  { partner: 'amazon', host: /(^|\.)amazon\.[a-z.]+$/, param: 'tag' },
];

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#38;/g, '&').replace(/&quot;/g, '"').replace(/&#x2F;/gi, '/');

/**
 * Analyse one HTML document.
 * @param {string} html
 * @returns {{ placeholders: string[], links: { href: string, partner: string, monetized: boolean }[] }}
 */
export function analyzeHtml(html) {
  const placeholders = [];
  const links = [];
  const attr = /\b(?:href|src)\s*=\s*"([^"]*)"/gi;
  let m;
  while ((m = attr.exec(html))) {
    const raw = decode(m[1]);
    for (const token of PLACEHOLDER_TOKENS) {
      if (raw.includes(token)) placeholders.push(`${token} in ${raw.slice(0, 160)}`);
    }
    if (!/^https?:\/\//i.test(raw)) continue;
    let url;
    try {
      url = new URL(raw);
    } catch {
      continue;
    }
    const rule = PARTNER_RULES.find((r) => r.host.test(url.hostname.toLowerCase()));
    if (!rule) continue;
    const value = url.searchParams.get(rule.param) ?? '';
    const monetized = value.trim().length > 0 || Boolean(rule.pathId && rule.pathId.test(url.pathname));
    links.push({ href: raw, partner: rule.partner, monetized });
  }
  return { placeholders, links };
}

/** Recursively list the .html files under a directory. */
export function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

/**
 * Aggregate a set of documents into a guard report.
 * @param {{ name: string, html: string }[]} docs
 * @param {'pre' | 'production'} mode
 */
export function buildReport(docs, mode) {
  const placeholders = [];
  const unmonetized = [];
  let partnerLinks = 0;
  const byPartner = {};
  for (const { name, html } of docs) {
    const r = analyzeHtml(html);
    for (const p of r.placeholders) placeholders.push(`${name}: ${p}`);
    for (const l of r.links) {
      partnerLinks++;
      if (!l.monetized) {
        unmonetized.push(`${name}: ${l.href}`);
        byPartner[l.partner] = (byPartner[l.partner] ?? 0) + 1;
      }
    }
  }
  const errors = [];
  if (placeholders.length > 0) {
    errors.push(`${placeholders.length} ID(s) de relleno servidos (ej. aid=BOOKING_AID). Nunca se publica un ID falso.`);
  }
  if (mode === 'production' && unmonetized.length > 0) {
    errors.push(`modo producción con ${unmonetized.length} link(s) de partner sin ID de afiliado.`);
  }
  return { mode, pages: docs.length, partnerLinks, unmonetized, byPartner, placeholders, errors, ok: errors.length === 0 };
}

/** Human-readable summary lines for a report. */
export function formatReport(report) {
  const lines = [];
  if (report.mode === 'pre') {
    const breakdown = Object.entries(report.byPartner)
      .sort((a, b) => b[1] - a[1])
      .map(([p, n]) => `${p} ${n}`)
      .join(', ');
    lines.push(
      `MODO PRE-AFILIADO — ${report.unmonetized.length} links sin monetizar` +
        ` (de ${report.partnerLinks} links a partners en ${report.pages} páginas)` +
        (breakdown ? `: ${breakdown}` : ''),
    );
  } else {
    lines.push(
      `MODO PRODUCCIÓN — ${report.partnerLinks - report.unmonetized.length}/${report.partnerLinks} links a partners con ID de afiliado`,
    );
  }
  for (const e of report.errors) lines.push(`FALLA: ${e}`);
  for (const p of report.placeholders.slice(0, 10)) lines.push(`  · ${p}`);
  if (report.mode === 'production') for (const u of report.unmonetized.slice(0, 10)) lines.push(`  · ${u}`);
  return lines;
}

/** Scan a built dist directory. */
export function scanDist(distDir, mode) {
  const docs = htmlFiles(distDir).map((f) => ({ name: f.slice(distDir.length).replace(/\\/g, '/'), html: readFileSync(f, 'utf8') }));
  return buildReport(docs, mode);
}

async function main() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const mode = (get('--mode') ?? process.env.PUBLIC_AFFILIATE_MODE) === 'production' ? 'production' : 'pre';
  let report;
  const url = get('--url');
  if (url) {
    const pages = (get('--pages') ?? '/').split(',').map((p) => p.trim()).filter(Boolean);
    const docs = [];
    for (const page of pages) {
      const target = new URL(page, url).toString();
      const res = await fetch(target, { headers: { 'user-agent': 'visitisrael-affiliate-guard' } });
      if (!res.ok) {
        console.error(`FALLA: ${target} respondió ${res.status}`);
        process.exit(1);
      }
      docs.push({ name: target, html: await res.text() });
    }
    report = buildReport(docs, mode);
  } else {
    report = scanDist(get('--dist') ?? 'dist', mode);
  }
  for (const line of formatReport(report)) (report.ok ? console.log : console.error)(line);
  process.exit(report.ok ? 0 : 1);
}

// Run only when executed directly (not when imported by astro.config.mjs).
const self = fileURLToPath(import.meta.url).toLowerCase();
if (process.argv[1] && resolve(process.argv[1]).toLowerCase() === self) main();
