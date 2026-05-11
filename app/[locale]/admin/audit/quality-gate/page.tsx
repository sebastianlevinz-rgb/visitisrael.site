/**
 * /admin/audit/quality-gate — Quality Gate report viewer.
 *
 * CRITICAL (iteration-1 fix): this RSC ONLY reads the pre-written markdown
 * file via `fs.readFile`. It does NOT spawn `pnpm qa:quality-gate` (or any
 * subprocess). The CLI is a separate pre-deploy step (see plan 11 CI
 * workflow); the route surfaces what's already on disk.
 *
 * Vercel runtime forbids `child_process` from RSCs, and even in local
 * `pnpm start` spawning subprocesses from a render path is an antipattern.
 *
 * Behavior:
 *   - if data/quality-gate-failure.md exists → render with status=fail
 *   - else if data/quality-gate-pass.md exists → render with status=pass
 *   - else → render "gate not yet run" empty state
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import { type Locale } from '@/i18n-config';

export const metadata: Metadata = {
  title: 'Quality Gate',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function QualityGatePage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  const passPath = resolve(process.cwd(), 'data/quality-gate-pass.md');
  const failPath = resolve(process.cwd(), 'data/quality-gate-failure.md');

  let status: 'pass' | 'fail' | 'unknown' = 'unknown';
  let body =
    'Quality gate has not been run yet. Execute `pnpm qa:audit && pnpm qa:quality-gate` locally or in CI to populate this report.';

  if (existsSync(failPath)) {
    status = 'fail';
    body = await readFile(failPath, 'utf8');
  } else if (existsSync(passPath)) {
    status = 'pass';
    body = await readFile(passPath, 'utf8');
  }

  return (
    <main id="main-content" className="mx-auto max-w-4xl p-6">
      <p>
        <Link href={`/${locale}/admin/audit`}>← Back to audit index</Link>
      </p>
      <h1 className="mt-2 text-2xl font-bold">
        Quality Gate ({status.toUpperCase()})
      </h1>
      <p className="mt-2">
        The Quality Gate compares the 10 criteria from PROJECT.md / ROADMAP.md
        against the latest <code>data/audit-results.json</code> +{' '}
        <code>data/lighthouse-results.json</code>. CLI:{' '}
        <code>pnpm qa:quality-gate</code>.
      </p>
      <pre className="mt-4 overflow-auto whitespace-pre-wrap rounded border p-4 text-sm">
        {body}
      </pre>
    </main>
  );
}
