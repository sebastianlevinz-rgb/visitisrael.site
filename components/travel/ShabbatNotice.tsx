/**
 * <ShabbatNotice> — STATIC informational notice.
 *
 * Phase 1 ships the STATIC, props-driven variant per CONTEXT.md
 * "Deferred Ideas" → "ShabbatNotice runtime widget". A future Phase 6
 * upgrade (tracked as DIF-V2-01 in REQUIREMENTS) wires Hebcal API for
 * weekly auto-updates. Today: no fetch, no client directive.
 *
 * Server Component — runs in RSC only. No `'use client'`.
 */
import { Card } from '@/components/ui/Card';
import { Ltr } from '@/components/layout/Ltr';

export interface ShabbatNoticeProps {
  /** Approximate closing time, e.g. "Fri 18:00". */
  closesAt: string;
  /** Approximate reopening time, e.g. "Sat 19:30". */
  reopensAt: string;
  /** Optional extra notes (kosher restaurant info, etc.). */
  notes?: string;
}

export function ShabbatNotice({
  closesAt,
  reopensAt,
  notes,
}: ShabbatNoticeProps) {
  return (
    <Card
      as="aside"
      variant="default"
      role="note"
      aria-label="Shabbat notice"
      data-component="shabbat-notice"
      className="border-s-4 border-s-[var(--color-warning)]"
    >
      <h3 className="text-lg font-semibold text-[var(--color-ink)]">
        Shabbat hours
      </h3>
      <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
        Many businesses close from <Ltr>{closesAt}</Ltr> and reopen{' '}
        <Ltr>{reopensAt}</Ltr>. Public transport is significantly reduced; plan
        accordingly.
      </p>
      {notes ? (
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{notes}</p>
      ) : null}
    </Card>
  );
}
