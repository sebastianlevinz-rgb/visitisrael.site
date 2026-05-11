/**
 * Viator affiliate helper.
 *
 * Public URL: https://www.viator.com/Israel/d919-ttd  (d919 = Israel destination)
 * AID-tagged: appends `pid={NEXT_PUBLIC_VIATOR_PID}` (and optional mcid).
 *
 * For specific product pages, pass `productCode` (e.g., '12345P1').
 */
import { z } from 'zod';

const Opts = z.object({
  destinationCode: z.string().min(1, 'destinationCode required'),
  productId: z.string().optional(),
});

export type ViatorLinkOpts = z.infer<typeof Opts>;

export function viatorLink(opts: ViatorLinkOpts): string {
  const parsed = Opts.parse(opts);
  // Israel default destination = d919; consumer can override (e.g., d6053 for Jerusalem).
  const path = parsed.productId
    ? `/tours/Israel/${encodeURIComponent(parsed.destinationCode)}/${encodeURIComponent(parsed.productId)}`
    : `/${encodeURIComponent(parsed.destinationCode)}-ttd`;
  const url = new URL(`https://www.viator.com${path}`);

  const pid = process.env.NEXT_PUBLIC_VIATOR_PID;
  const mcid = process.env.NEXT_PUBLIC_VIATOR_MCID;
  if (pid) url.searchParams.set('pid', pid);
  if (mcid) url.searchParams.set('mcid', mcid);
  return url.toString();
}
