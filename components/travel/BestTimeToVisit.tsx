/**
 * <BestTimeToVisit> — months + season highlights.
 *
 * Phase 1 ships the contract; Phase 2 plugs in region-specific data.
 * Hebrew month names available via the optional `monthLocale` prop.
 */
import { Card } from '@/components/ui/Card';

const MONTH_LABELS = {
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  he: [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ],
} as const;

export interface SeasonHighlight {
  season: string;
  monthsIndex: ReadonlyArray<number>; // 0..11
  highlights: string;
}

export interface BestTimeToVisitProps {
  /** Months that are particularly recommended (0-indexed). */
  months: ReadonlyArray<number>;
  seasonHighlights: ReadonlyArray<SeasonHighlight>;
  monthLocale?: 'he' | 'en';
}

export function BestTimeToVisit({
  months,
  seasonHighlights,
  monthLocale = 'en',
}: BestTimeToVisitProps) {
  const labels = MONTH_LABELS[monthLocale];
  return (
    <Card
      as="section"
      data-component="best-time-to-visit"
      aria-label="Best time to visit"
      className="flex flex-col gap-4"
    >
      <header>
        <h2 className="text-2xl font-bold text-[var(--color-ink)]">
          Best time to visit
        </h2>
      </header>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
        {labels.map((label, idx) => {
          const isRecommended = months.includes(idx);
          return (
            <span
              key={label}
              className={
                isRecommended
                  ? 'rounded bg-[var(--color-success)] px-2 py-1 text-center text-xs font-semibold text-[var(--color-surface-elevated)]'
                  : 'rounded bg-[var(--color-surface)] px-2 py-1 text-center text-xs text-[var(--color-ink-muted)]'
              }
            >
              {label}
            </span>
          );
        })}
      </div>
      <ul className="flex flex-col gap-2">
        {seasonHighlights.map((s) => (
          <li
            key={s.season}
            className="border-t border-[var(--color-border)] pt-2 text-sm"
          >
            <strong className="text-[var(--color-ink)]">{s.season}</strong>
            <p className="text-[var(--color-ink-muted)]">{s.highlights}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
