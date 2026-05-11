/**
 * GetYourGuide affiliate helper.
 *
 * Public URL: https://www.getyourguide.com/israel-l169033/  (l169033 = Israel)
 * AID-tagged: appends `partner_id={NEXT_PUBLIC_GYG_PARTNER_ID}`.
 */
import { z } from 'zod';

const Opts = z.object({
  locationCode: z.string().min(1, 'locationCode required'),
  productId: z.string().optional(),
});

export type GetYourGuideLinkOpts = z.infer<typeof Opts>;

export function getYourGuideLink(opts: GetYourGuideLinkOpts): string {
  const parsed = Opts.parse(opts);
  const path = parsed.productId
    ? `/${encodeURIComponent(parsed.locationCode)}/${encodeURIComponent(parsed.productId)}`
    : `/${encodeURIComponent(parsed.locationCode)}/`;
  const url = new URL(`https://www.getyourguide.com${path}`);

  const partnerId = process.env.NEXT_PUBLIC_GYG_PARTNER_ID;
  if (partnerId) url.searchParams.set('partner_id', partnerId);
  return url.toString();
}
