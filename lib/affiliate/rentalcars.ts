/**
 * Rentalcars.com affiliate helper.
 *
 * Public URL: https://www.rentalcars.com/
 * AID-tagged: via Awin link-generator pattern — appends `affiliateCode`.
 */
import { z } from 'zod';

const Opts = z.object({
  pickupLocation: z.string().min(1, 'pickupLocation required'),
  dropoffLocation: z.string().optional(),
});

export type RentalcarsLinkOpts = z.infer<typeof Opts>;

export function rentalcarsLink(opts: RentalcarsLinkOpts): string {
  const parsed = Opts.parse(opts);
  const url = new URL('https://www.rentalcars.com/SearchResults.do');
  url.searchParams.set('pickupLocation', parsed.pickupLocation);
  if (parsed.dropoffLocation) {
    url.searchParams.set('dropoffLocation', parsed.dropoffLocation);
  }

  const aid = process.env.NEXT_PUBLIC_RENTALCARS_AID;
  if (aid) url.searchParams.set('affiliateCode', aid);
  return url.toString();
}
