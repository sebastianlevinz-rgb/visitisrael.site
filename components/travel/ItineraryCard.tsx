/**
 * <ItineraryCard> — multi-day itinerary summary.
 *
 * Renders a <Card> with a day-by-day breakdown. Phase 2 hooks this up to
 * region MDX (frontmatter `itinerary: { days: [...] }`); plan 05 ships
 * the contract.
 */
import { Card } from '@/components/ui/Card';

export interface ItineraryDay {
  /** Day number (1-indexed). */
  day: number;
  title: string;
  summary: string;
}

export interface ItineraryCardProps {
  title: string;
  summary?: string;
  days: ReadonlyArray<ItineraryDay>;
}

export function ItineraryCard({ title, summary, days }: ItineraryCardProps) {
  return (
    <Card
      variant="elevated"
      as="article"
      data-component="itinerary-card"
      className="flex flex-col gap-3"
    >
      <header>
        <h2 className="text-2xl font-bold text-[var(--color-ink)]">{title}</h2>
        {summary ? (
          <p className="mt-1 text-[var(--color-ink-muted)]">{summary}</p>
        ) : null}
      </header>
      <ol className="flex flex-col gap-3">
        {days.map((d) => (
          <li
            key={d.day}
            className="border-t border-[var(--color-border)] pt-3"
          >
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              <span className="me-2 inline-block rounded bg-[var(--color-primary)] px-2 py-0.5 text-sm text-[var(--button-text-primary)]">
                {d.day}
              </span>
              {d.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
              {d.summary}
            </p>
          </li>
        ))}
      </ol>
    </Card>
  );
}
