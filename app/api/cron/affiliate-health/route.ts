import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { HEALTH_CHECK_TARGETS } from '@/lib/affiliate/health-targets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface AffiliateAvailability {
  partner: string;
  available: boolean;
  helperPath?: string;
  testUrl?: string;
}

interface HealthResult {
  partner: string;
  status: number | 'unreachable';
  durationMs: number;
  checkedAt: string;
}

async function checkPartner(
  partner: string,
  testUrl: string,
): Promise<HealthResult> {
  const startedAt = Date.now();
  try {
    const res = await fetch(testUrl, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent':
          'visitisrael.site/health-check (+https://visitisrael.site)',
      },
    });
    return {
      partner,
      status: res.status,
      durationMs: Date.now() - startedAt,
      checkedAt: new Date().toISOString(),
    };
  } catch {
    return {
      partner,
      status: 'unreachable',
      durationMs: Date.now() - startedAt,
      checkedAt: new Date().toISOString(),
    };
  }
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get('authorization');
  if (cronSecret && auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const availabilityPath = path.join(
    process.cwd(),
    'data',
    'affiliate-availability.json',
  );
  const raw = await fs.readFile(availabilityPath, 'utf8');
  const availability: AffiliateAvailability[] = JSON.parse(raw);

  const checks: Promise<HealthResult>[] = [];
  for (const entry of availability) {
    if (!entry.available) continue;
    const url = entry.testUrl ?? HEALTH_CHECK_TARGETS[entry.partner];
    if (!url) continue;
    checks.push(checkPartner(entry.partner, url));
  }
  const results = await Promise.all(checks);

  const reportPath = path.join(process.cwd(), 'data', 'affiliate-health.json');
  const report = {
    generatedAt: new Date().toISOString(),
    cron: 'weekly Monday 06:00 UTC',
    results,
    failures: results.filter(
      (r) =>
        r.status === 'unreachable' ||
        (typeof r.status === 'number' && r.status >= 400),
    ),
  };
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  return NextResponse.json(report);
}
