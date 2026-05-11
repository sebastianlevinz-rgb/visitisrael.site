/**
 * Hostelworld affiliate helper.
 *
 * Public URL: https://www.hostelworld.com/hostels/{city}
 * AID-tagged: appends `affiliateID={NEXT_PUBLIC_HOSTELWORLD_AID}` (Partnerize pattern).
 */
import { z } from 'zod';

const Opts = z.object({
  city: z.string().min(1, 'city required'),
});

export type HostelworldLinkOpts = z.infer<typeof Opts>;

export function hostelworldLink(opts: HostelworldLinkOpts): string {
  const parsed = Opts.parse(opts);
  const citySlug = encodeURIComponent(
    parsed.city.toLowerCase().replace(/\s+/g, '-'),
  );
  const url = new URL(`https://www.hostelworld.com/hostels/${citySlug}`);

  const aid = process.env.NEXT_PUBLIC_HOSTELWORLD_AID;
  if (aid) url.searchParams.set('affiliateID', aid);
  return url.toString();
}
