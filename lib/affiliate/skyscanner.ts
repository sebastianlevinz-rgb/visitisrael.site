/**
 * Skyscanner affiliate helper.
 *
 * Public URL: https://www.skyscanner.com/transport/flights/{origin}/{destination}/
 * AID-tagged: appends `associateid={NEXT_PUBLIC_SKYSCANNER_AID}` (Impact deeplink pattern).
 *
 * Note: Skyscanner partner program requires ≥5K visitors/mo before AID is
 * issued; until then `NEXT_PUBLIC_SKYSCANNER_AID` is unset and we return the
 * public URL (Travelpayouts AFF-08 aggregator is the documented fallback —
 * see `.env.example` `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER`).
 */
import { z } from 'zod';

const Opts = z.object({
  origin: z.string().min(1, 'origin required'),
  destination: z.string().min(1, 'destination required'),
});

export type SkyscannerLinkOpts = z.infer<typeof Opts>;

export function skyscannerLink(opts: SkyscannerLinkOpts): string {
  const parsed = Opts.parse(opts);
  const url = new URL(
    `https://www.skyscanner.com/transport/flights/${encodeURIComponent(parsed.origin.toLowerCase())}/${encodeURIComponent(parsed.destination.toLowerCase())}/`,
  );

  const aid = process.env.NEXT_PUBLIC_SKYSCANNER_AID;
  if (aid) url.searchParams.set('associateid', aid);
  return url.toString();
}
