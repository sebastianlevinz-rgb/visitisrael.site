/**
 * <AffiliateCard> — STUB awaiting plan 06 helper wiring.
 *
 * Plan 05 ships the COMPONENT CONTRACT + DOM-order proof (AFF-06):
 *   - `<AffiliateDisclosure>` renders BEFORE the affiliate `<a>` in the
 *     DOM, on every instance.
 *   - The `<a href>` is intentionally `#TODO-PLAN-06`. Plan 06 swaps it
 *     for `bookingLink({...})` / `civitatisLink({...})` / etc.
 *
 * TODO(plan 06): swap href for partner helper invocation.
 */
import type { ReactNode } from 'react';
import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { cn } from '@/lib/cn';

export type PartnerId =
  | 'booking'
  | 'civitatis'
  | 'viator'
  | 'getYourGuide'
  | 'rentalcars'
  | 'safetyWing'
  | 'skyscanner'
  | 'hostelworld'
  | 'discoverCars';

export interface AffiliateCardProps {
  partner: PartnerId;
  destination: string;
  productId?: string;
  label?: string;
  children?: ReactNode;
  className?: string;
}

export async function AffiliateCard({
  partner,
  destination,
  productId,
  label,
  children,
  className,
}: AffiliateCardProps): Promise<React.ReactElement> {
  // STUB: plan 06 replaces the href with `partnerLink({partner, destination, productId})`.
  // Until then we point at a fragment so the link is inert at runtime.
  const stubHref = '#TODO-PLAN-06';

  const displayLabel =
    label ?? `${partner}: ${destination}${productId ? ` (${productId})` : ''}`;

  // Resolve the async disclosure component inline so the returned tree is
  // fully synchronous from the caller's perspective. Keeps the RSC contract
  // intact AND lets non-RSC consumers (tests, future story renderers)
  // see a flat tree without nested unresolved promises.
  const disclosure = await AffiliateDisclosure({});

  return (
    <div
      className={cn('flex flex-col gap-3', className)}
      data-component="affiliate-card"
      data-partner={partner}
    >
      {/* AFF-06: disclosure MUST DOM-precede the affiliate <a>. */}
      {disclosure}
      <Card variant="interactive">
        <a
          href={stubHref}
          rel="sponsored nofollow noopener"
          target="_blank"
          data-affiliate-link
          className="block text-[var(--color-primary)] hover:underline"
        >
          {displayLabel}
        </a>
        {children}
      </Card>
    </div>
  );
}
