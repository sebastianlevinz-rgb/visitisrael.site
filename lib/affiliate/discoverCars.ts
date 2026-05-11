/**
 * DiscoverCars affiliate helper.
 *
 * Public URL: https://www.discovercars.com/israel
 * AID-tagged: appends `a_aid={NEXT_PUBLIC_DISCOVERCARS_AID}` (365-day cookie).
 */
import { z } from 'zod';

const Opts = z.object({
  city: z.string().min(1, 'city required'),
});

export type DiscoverCarsLinkOpts = z.infer<typeof Opts>;

export function discoverCarsLink(opts: DiscoverCarsLinkOpts): string {
  const parsed = Opts.parse(opts);
  const citySlug = encodeURIComponent(
    parsed.city.toLowerCase().replace(/\s+/g, '-'),
  );
  const url = new URL(`https://www.discovercars.com/${citySlug}`);

  const aid = process.env.NEXT_PUBLIC_DISCOVERCARS_AID;
  if (aid) url.searchParams.set('a_aid', aid);
  return url.toString();
}
