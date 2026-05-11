/**
 * <AffiliateCard> — wired to real affiliate helpers (plan 06).
 *
 * Replaces the plan-05 STUB (which used `href="#TODO-PLAN-06"` as a grep
 * sentinel). Now dispatches by `partner` prop to the correct helper in
 * `lib/affiliate/{partner}.ts`.
 *
 * AFF-06 contract preserved: `<AffiliateDisclosure>` DOM-precedes the
 * affiliate `<a>` on every instance (verified via compareDocumentPosition
 * in affiliatecard.test.tsx).
 *
 * Conflict D handling: Klook + GoCity helpers throw `NoIsraelInventoryError`.
 * AffiliateCard catches that error AND short-circuits at availability check
 * (`affiliateAvailability(partner) === 'absent'` → render null). Either
 * path renders a safe fallback; neither crashes the page.
 */
import type { ReactNode } from 'react';
import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
import { cn } from '@/lib/cn';
import {
  bookingLink,
  civitatisLink,
  viatorLink,
  getYourGuideLink,
  rentalcarsLink,
  safetyWingLink,
  skyscannerLink,
  hostelworldLink,
  discoverCarsLink,
  klookLink,
  goCityLink,
  affiliateAvailability,
  NoIsraelInventoryError,
} from '@/lib/affiliate';

export type PartnerId =
  | 'booking'
  | 'civitatis'
  | 'viator'
  | 'getYourGuide'
  | 'rentalcars'
  | 'safetyWing'
  | 'skyscanner'
  | 'hostelworld'
  | 'discoverCars'
  | 'klook'
  | 'goCity';

export interface AffiliateCardProps {
  partner: PartnerId;
  destination: string;
  productId?: string;
  label?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Dispatches to the correct helper based on `partner`.
 *
 * Switch is exhaustive over the 11 PartnerId members. Klook + GoCity
 * helpers throw NoIsraelInventoryError — the caller catches it.
 */
function resolveHref(
  partner: PartnerId,
  destination: string,
  productId: string | undefined,
  label: string | undefined,
): string {
  switch (partner) {
    case 'booking':
      return bookingLink({ destination, ...(label ? { label } : {}) });
    case 'civitatis':
      return civitatisLink({
        city: destination,
        ...(productId ? { productId } : {}),
      });
    case 'viator':
      return viatorLink({
        destinationCode: destination,
        ...(productId ? { productId } : {}),
      });
    case 'getYourGuide':
      return getYourGuideLink({
        locationCode: destination,
        ...(productId ? { productId } : {}),
      });
    case 'rentalcars':
      return rentalcarsLink({ pickupLocation: destination });
    case 'safetyWing':
      return safetyWingLink({
        destination,
        ...(label ? { label } : {}),
      });
    case 'skyscanner':
      return skyscannerLink({ origin: 'ANYWHERE', destination });
    case 'hostelworld':
      return hostelworldLink({ city: destination });
    case 'discoverCars':
      return discoverCarsLink({ city: destination });
    case 'klook':
      return klookLink();
    case 'goCity':
      return goCityLink();
  }
}

export async function AffiliateCard({
  partner,
  destination,
  productId,
  label,
  children,
  className,
}: AffiliateCardProps): Promise<React.ReactElement | null> {
  // Conflict D — absent partners render null. This catches Klook + GoCity
  // BEFORE any helper invocation, so the NoIsraelInventoryError throw is the
  // explicit second line of defense (not the first).
  if (affiliateAvailability(partner) === 'absent') {
    return null;
  }

  let href: string;
  try {
    href = resolveHref(partner, destination, productId, label);
  } catch (err) {
    // Defense in depth: if availability JSON ever drifts and an 'absent'
    // partner slips through, the stub still throws and we render null.
    if (err instanceof NoIsraelInventoryError) return null;
    throw err;
  }

  const displayLabel =
    label ?? `${partner}: ${destination}${productId ? ` (${productId})` : ''}`;

  // Resolve the async disclosure component inline so the returned tree is
  // fully synchronous from the caller's perspective (AFF-06 DOM-order
  // contract from plan 05 preserved).
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
          href={href}
          rel="sponsored nofollow noopener"
          target="_blank"
          data-affiliate-link
          data-aff-disclosed="true"
          className="block text-[var(--color-primary)] hover:underline"
        >
          {displayLabel}
        </a>
        {children}
      </Card>
    </div>
  );
}
