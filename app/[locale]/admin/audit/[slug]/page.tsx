/**
 * /admin/audit/[slug] — per-page drill-down.
 *
 * Reads `data/audit-results.json` and surfaces the issues for one page,
 * grouped by rule + severity.
 *
 * Like the index, this is a pure view — no child_process spawning.
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import { type Locale } from '@/i18n-config';

export const metadata: Metadata = {
  title: 'Audit Drill-down',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface Issue {
  rule: string;
  severity: 'critical' | 'major' | 'minor' | 'info';
  message: string;
  match?: string;
}

interface PageResult {
  slug: string;
  lang: 'he' | 'en';
  profile: string;
  score: number;
  issues: Issue[];
  blocking: Issue[];
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

interface DrillDownProps {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams: Promise<{ l?: 'he' | 'en' }>;
}

export default async function AuditDrillDown({
  params,
  searchParams,
}: DrillDownProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;
  const sp = await searchParams;
  const lang = sp.l ?? 'he';
  const results = await loadResults();
  const decodedSlug = decodeURIComponent(slug);
  const entry =
    results.find((r) => (r.slug || 'index') === decodedSlug && r.lang === lang) ??
    null;

  return (
    <main id="main-content" className="mx-auto max-w-4xl p-6">
      <p>
        <Link href={`/${locale}/admin/audit`}>← Back to audit index</Link>
      </p>
      <h1 className="mt-2 text-2xl font-bold">
        {decodedSlug} ({lang})
      </h1>
      {entry === null ? (
        <p className="mt-2">No entry for slug=&quot;{decodedSlug}&quot; lang={lang} in latest audit results.</p>
      ) : (
        <>
          <p className="mt-2">
            Profile: <strong>{entry.profile}</strong> — Score:{' '}
            <strong>{entry.score}</strong> — Issues:{' '}
            <strong>{entry.issues.length}</strong> (blocking:{' '}
            {entry.blocking.length})
          </p>
          <table className="mt-4 w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-start">Rule</th>
                <th className="p-2 text-start">Severity</th>
                <th className="p-2 text-start">Message</th>
              </tr>
            </thead>
            <tbody>
              {entry.issues.map((iss, i) => (
                <tr key={`${iss.rule}-${i}`} className="border-b">
                  <td className="p-2">{iss.rule}</td>
                  <td className="p-2">{iss.severity}</td>
                  <td className="p-2">{iss.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
}
