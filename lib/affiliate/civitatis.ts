/**
 * Civitatis affiliate helper.
 *
 * Public URL: https://www.civitatis.com/en/{city}/
 * AID-tagged: appends `aid={NEXT_PUBLIC_CIVITATIS_AID}`
 *
 * Israel routes confirmed (STACK §3): jerusalem, tel-aviv, eilat, etc.
 */
import { z } from 'zod';

const Opts = z.object({
  city: z.string().min(1, 'city required'),
  productId: z.string().optional(),
});

export type CivitatisLinkOpts = z.infer<typeof Opts>;

export function civitatisLink(opts: CivitatisLinkOpts): string {
  const parsed = Opts.parse(opts);
  // Normalise city for URL path: lowercase + spaces → hyphens.
  const citySlug = encodeURIComponent(
    parsed.city.toLowerCase().replace(/\s+/g, '-'),
  );
  const base = parsed.productId
    ? `https://www.civitatis.com/en/${citySlug}/${encodeURIComponent(parsed.productId)}/`
    : `https://www.civitatis.com/en/${citySlug}/`;
  const url = new URL(base);

  const aid = process.env.NEXT_PUBLIC_CIVITATIS_AID;
  if (aid) url.searchParams.set('aid', aid);
  return url.toString();
}
