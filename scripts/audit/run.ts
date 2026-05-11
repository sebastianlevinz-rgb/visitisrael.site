/**
 * scripts/audit/run.ts — audit orchestrator.
 *
 * Walks built HTML in `.next/server/app/**` (the Next.js static build output),
 * applies all 34 rules per page, computes per-page score against the detected
 * profile (plan 07), merges NER suggestions (plan 09), and writes
 * `data/audit-results.json` for the `/admin/audit/` RSC dashboard.
 *
 * Invoked via `pnpm qa:audit` (tsx scripts/audit/run.ts).
 *
 * Phase 1 reality: with no content yet, the walker may find only `/admin/*`
 * playground pages — that's OK. The script exits 0 with an empty-or-minimal
 * results array so the dashboard can render the "no pages yet" empty state.
 *
 * Iteration-1 note: the orchestrator does NOT spawn any subprocess from
 * inside an RSC render path. It's a standalone CLI invoked as a build step.
 */
import { glob } from 'glob';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import * as cheerio from 'cheerio';
import { rules } from './rules';
import type { Issue } from './rules/types';
import { profiles, detectProfile, type ProfileId } from './profiles';
import { computeScore, blockingIssues } from './score';

const REPO_ROOT = process.cwd();
const BUILD_ROOT = resolve(REPO_ROOT, '.next/server/app');
const OUT_JSON = resolve(REPO_ROOT, 'data/audit-results.json');
const OUT_HTML = resolve(REPO_ROOT, 'data/audit-results.html');
const NER_PATH = resolve(REPO_ROOT, 'data/ner-results.json');

interface PageResult {
  slug: string;
  lang: 'he' | 'en';
  profile: ProfileId | 'UNKNOWN';
  score: number;
  issues: Issue[];
  blocking: Issue[];
  totalRules: number;
  rulesFired: number;
}

interface NerMention {
  entity: string;
  class: string;
  suggestedAction: string;
  slug?: string;
  lang?: string;
}

interface NerPage {
  slug: string;
  lang: string;
  mentions?: NerMention[];
}

function inferLang(file: string): 'he' | 'en' {
  // Built files: .next/server/app/{he,en}/<slug>.html for each locale; the
  // root index lands as .next/server/app/{he,en}.html.
  const normalized = file.replace(/\\/g, '/');
  if (
    normalized.includes('/server/app/en/') ||
    normalized.endsWith('/server/app/en.html')
  ) {
    return 'en';
  }
  return 'he';
}

function inferSlug(file: string): string {
  const normalized = file.replace(/\\/g, '/');
  // Strip up to and including server/app/, the leading locale prefix (he|en),
  // and the trailing .html. Root locale pages (server/app/he.html etc.) → 'index'.
  let m = normalized.match(/server\/app\/(?:he|en)\/(.*?)\.html$/);
  if (m) {
    const slug = m[1] || 'index';
    return slug.replace(/\/page$/, '').replace(/^page$/, 'index');
  }
  m = normalized.match(/server\/app\/(?:he|en)\.html$/);
  if (m) return 'index';
  m = normalized.match(/server\/app\/(.*?)\.html$/);
  if (m) {
    const slug = m[1] || 'index';
    return slug.replace(/\/page$/, '').replace(/^page$/, 'index');
  }
  return 'unknown';
}

async function loadNer(): Promise<NerPage[]> {
  if (!existsSync(NER_PATH)) return [];
  try {
    const raw = await readFile(NER_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as NerPage[]) : [];
  } catch {
    return [];
  }
}

function detectProfileSafe(fm: Record<string, unknown>): ProfileId | 'UNKNOWN' {
  try {
    return detectProfile({
      collection: typeof fm['collection'] === 'string' ? (fm['collection'] as string) : '',
      isHub: typeof fm['isHub'] === 'boolean' ? (fm['isHub'] as boolean) : false,
      isUtility:
        typeof fm['isUtility'] === 'boolean' ? (fm['isUtility'] as boolean) : false,
    });
  } catch {
    return 'UNKNOWN';
  }
}

async function run(): Promise<void> {
  if (!existsSync(BUILD_ROOT)) {
    // Greenfield / pre-build state — write empty results + exit 0.
    await ensureDir(OUT_JSON);
    await writeFile(OUT_JSON, '[]\n', 'utf8');
    await writeFile(
      OUT_HTML,
      '<!doctype html><html><body><h1>Audit Results</h1><p>No built output (.next/server/app missing). Run pnpm build first.</p></body></html>\n',
      'utf8',
    );
    console.log(
      'qa:audit: .next/server/app not present — wrote empty data/audit-results.json (run pnpm build first).',
    );
    return;
  }

  const htmlFiles = await glob('**/*.html', {
    cwd: BUILD_ROOT,
    absolute: true,
    nodir: true,
  });

  const ner = await loadNer();
  const results: PageResult[] = [];

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const $ = cheerio.load(html);
    const slug = inferSlug(file);
    const lang = inferLang(file);

    // Velite frontmatter is not loaded here — Phase 1 ships minimal slugs.
    // Phase 2+ will read .velite/{regions,subDestinations,guides,legal}.json
    // to inject `collection` + `parentRegion` + `wordCount`. For now,
    // frontmatter is a stub keyed off slug for the admin/* pages.
    const fm: Record<string, unknown> = {
      slug,
      lang,
      collection: slug.startsWith('admin') ? 'legal' : '',
      isUtility: slug.startsWith('admin'),
    };

    const profileId = detectProfileSafe(fm);
    const spec = profileId === 'UNKNOWN' ? null : profiles[profileId];

    const issues: Issue[] = [];
    for (const rule of rules) {
      try {
        const found = rule.scan(html, $, fm, lang);
        issues.push(...found);
      } catch (e) {
        issues.push({
          rule: rule.id,
          severity: 'critical',
          message: `Rule scan threw: ${(e as Error).message}`,
        });
      }
    }

    // Merge NER suggestions for this page.
    const nerForPage = ner.find((p) => p.slug === slug && p.lang === lang);
    if (nerForPage && Array.isArray(nerForPage.mentions)) {
      for (const m of nerForPage.mentions) {
        if (m.suggestedAction && m.suggestedAction !== 'no-action') {
          issues.push({
            rule: 'NER',
            severity: 'minor',
            message: `${m.entity} (${m.class}): ${m.suggestedAction}`,
          });
        }
      }
    }

    const score = spec ? computeScore(issues, spec) : 0;
    const blocking = spec ? blockingIssues(issues, spec) : [];
    const rulesFired = new Set(
      issues.filter((i) => i.severity !== 'info').map((i) => i.rule),
    ).size;

    results.push({
      slug,
      lang,
      profile: profileId,
      score,
      issues,
      blocking,
      totalRules: rules.length,
      rulesFired,
    });
  }

  results.sort((a, b) => {
    if (a.slug === b.slug) return a.lang.localeCompare(b.lang);
    return a.slug.localeCompare(b.slug);
  });

  await ensureDir(OUT_JSON);
  await writeFile(OUT_JSON, JSON.stringify(results, null, 2) + '\n', 'utf8');
  await writeFile(OUT_HTML, renderHtml(results), 'utf8');

  const totalIssues = results.reduce((acc, r) => acc + r.issues.length, 0);
  console.log(
    `qa:audit: ${results.length} pages scanned, ${totalIssues} issues, ${rules.length} rules applied → data/audit-results.json`,
  );
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHtml(results: PageResult[]): string {
  const rows = results
    .map(
      (r) =>
        `<tr><td>${escape(r.slug)}</td><td>${r.lang}</td><td>${r.profile}</td><td>${r.score}</td><td>${r.issues.length}</td><td>${r.blocking.length}</td></tr>`,
    )
    .join('\n');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Audit Results</title>
<style>body{font-family:system-ui;padding:2rem}table{border-collapse:collapse}th,td{border:1px solid #ccc;padding:.25rem .5rem;text-align:left}</style>
</head><body>
<h1>Audit Results (${results.length} pages)</h1>
<p>34 rules applied. Generated by <code>pnpm qa:audit</code>.</p>
<table><thead><tr><th>Slug</th><th>Lang</th><th>Profile</th><th>Score</th><th>Issues</th><th>Blocking</th></tr></thead><tbody>
${rows}
</tbody></table>
</body></html>
`;
}

run().catch((e) => {
  console.error('qa:audit failed:', e);
  process.exit(1);
});
