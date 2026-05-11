/**
 * <TransportInfo> — airport + transport options + optional affiliate cards.
 *
 * Phase 1 ships the contract; Phase 2 fills affiliate slots with
 * Skyscanner (flights) and RentalCars / DiscoverCars (ground) instances.
 */
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

export interface TransportOption {
  mode: string;
  description: string;
  durationMinutes?: number;
}

export interface TransportInfoProps {
  airport: { code: string; name: string };
  transportOptions: ReadonlyArray<TransportOption>;
  /** Slot for <AffiliateCard> (Skyscanner / RentalCars) — wired in Phase 2. */
  affiliateCards?: ReactNode;
}

export function TransportInfo({
  airport,
  transportOptions,
  affiliateCards,
}: TransportInfoProps) {
  return (
    <Card
      as="section"
      data-component="transport-info"
      aria-label="Transport information"
      className="flex flex-col gap-4"
    >
      <header>
        <h2 className="text-2xl font-bold text-[var(--color-ink)]">
          Getting there
        </h2>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Nearest airport: <strong>{airport.code}</strong> — {airport.name}
        </p>
      </header>
      <ul className="flex flex-col gap-2">
        {transportOptions.map((opt) => (
          <li
            key={opt.mode}
            className="border-t border-[var(--color-border)] pt-2 text-sm"
          >
            <strong className="text-[var(--color-ink)]">{opt.mode}</strong>
            {opt.durationMinutes !== undefined ? (
              <span className="text-[var(--color-ink-muted)]">
                {' '}
                — ~{opt.durationMinutes} min
              </span>
            ) : null}
            <p className="text-[var(--color-ink-muted)]">{opt.description}</p>
          </li>
        ))}
      </ul>
      {affiliateCards ? (
        <div className="flex flex-col gap-3">{affiliateCards}</div>
      ) : null}
    </Card>
  );
}
