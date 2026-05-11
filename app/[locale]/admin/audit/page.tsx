/**
 * /admin/audit — RSC dashboard for the per-page audit results.
 *
 * Reads `data/audit-results.json` (pre-written by `pnpm qa:audit`) via
 * `fs.readFile` and renders a sortable table.
 *
 * CRITICAL (iteration-1 fix): this RSC does NOT spawn `child_process` to
 * run the audit. The Vercel runtime forbids it from inside the RSC render
 * path, and even in local `pnpm start` it's an antipattern. The CLI is a
 * separate build step; the route is a view.
 *
 * FND-04: noindex/nofollow + basic-auth middleware (plan 10 task 3).
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import { type Locale } from '@/i18n-config';

export const metadata: Metadata = {
  title: 'Audit Dashboard',
  robots: { index: false, follow: false },
};

// Re-read the JSON on every request so the dashboard reflects the latest
// `pnpm qa:audit` run without requiring a rebuild.
export const dynamic = 'force-dynamic';

interface Issue {
  rule: string;
  severity: 'critical' | 'major' | 'minor' | 'info';
  message: string;
}

interface PageResult {
  slug: string;
  lang: 'he' | 'en';
  profile: string;
  score: number;
  issues: Issue[];
  blocking: Issue[];
  totalRules: number;
  rulesFired: number;
}

async function loadResults(): Promise<PageResult[]> {
  const path = resolve(process.cwd(), 'data/audit-results.json');
  if (!existsSync(path)) return [];
  try {
    return JSON.parse(await readFile(path, 'utf8')) as PageResult[];
  } catch {
    return [];
  }
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AuditPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  const results = await loadResults();

  return (
    <main id="main-content" className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">Audit Dashboard</h1>
      <p className="mt-2">
        {results.length} page(s) scanned. 34 rules applied per page. Run{' '}
        <code>pnpm qa:audit</code> to regenerate.
      </p>
      <p className="mt-2">
        <Link href={`/${locale}/admin/audit/quality-gate`}>Quality Gate report →</Link>
      </p>
      {results.length === 0 ? (
        <div className="mt-4 rounded border border-dashed p-4">
          <p>
            No audit results yet. Run <code>pnpm build &amp;&amp; pnpm qa:audit</code> to
            populate <code>data/audit-results.json</code>.
          </p>
        </div>
      ) : (
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-start">Slug</th>
              <th className="p-2 text-start">Lang</th>
              <th className="p-2 text-start">Profile</th>
              <th className="p-2 text-start">Score</th>
              <th className="p-2 text-start">Issues</th>
              <th className="p-2 text-start">Blocking</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={`${r.slug}-${r.lang}`} className="border-b">
                <td className="p-2">
                  <Link
                    href={`/${locale}/admin/audit/${encodeURIComponent(r.slug || 'index')}?l=${r.lang}`}
                  >
                    {r.slug || '(root)'}
                  </Link>
                </td>
                <td className="p-2">{r.lang}</td>
                <td className="p-2">{r.profile}</td>
                <td
                  className="p-2"
                  style={{
                    color:
                      r.score < 85
                        ? 'var(--color-danger)'
                        : 'var(--color-ink)',
                  }}
                >
                  {r.score}
                </td>
                <td className="p-2">{r.issues.length}</td>
                <td className="p-2">{r.blocking.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
