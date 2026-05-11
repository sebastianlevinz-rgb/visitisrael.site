/**
 * <WhereToStay> — neighborhoods + price range + (optional) affiliate cards.
 *
 * Phase 1 ships the contract; Phase 2 fills in real `AffiliateCard`
 * instances (Booking + Hostelworld) from the region MDX.
 */
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

export interface Neighborhood {
  name: string;
  blurb: string;
}

export interface WhereToStayProps {
  /** Bilingual-aware ILS+USD+EUR range string, e.g. "₪400-1200 / $110-330". */
  priceRange: string;
  neighborhoods: ReadonlyArray<Neighborhood>;
  /** Slot for <AffiliateCard> instances (wired in plan 06 / Phase 2). */
  affiliateCards?: ReactNode;
}

export function WhereToStay({
  priceRange,
  neighborhoods,
  affiliateCards,
}: WhereToStayProps) {
  return (
    <Card
      as="section"
      data-component="where-to-stay"
      aria-label="Where to stay"
      className="flex flex-col gap-4"
    >
      <header>
        <h2 className="text-2xl font-bold text-[var(--color-ink)]">
          Where to stay
        </h2>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Price range: {priceRange}
        </p>
      </header>
      <ul className="flex flex-col gap-2">
        {neighborhoods.map((n) => (
          <li
            key={n.name}
            className="border-t border-[var(--color-border)] pt-2"
          >
            <strong className="text-[var(--color-ink)]">{n.name}</strong>
            <span className="text-[var(--color-ink-muted)]"> — {n.blurb}</span>
          </li>
        ))}
      </ul>
      {affiliateCards ? (
        <div className="flex flex-col gap-3">{affiliateCards}</div>
      ) : null}
    </Card>
  );
}
