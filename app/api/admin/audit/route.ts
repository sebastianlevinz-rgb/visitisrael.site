/**
 * /api/admin/audit — JSON API for the audit dashboard.
 *
 * Reads `data/audit-results.json` and returns it as JSON. Gated by the
 * basic-auth middleware (matched via /api/admin/* pattern).
 *
 * No subprocess spawning — Vercel-runtime-safe.
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  const path = resolve(process.cwd(), 'data/audit-results.json');
  if (!existsSync(path)) {
    return NextResponse.json([], { status: 200 });
  }
  try {
    const data = await readFile(path, 'utf8');
    return new NextResponse(data, {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 },
    );
  }
}
