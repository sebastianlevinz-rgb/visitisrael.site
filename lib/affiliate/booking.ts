/**
 * Booking.com affiliate helper.
 *
 * Public URL: https://www.booking.com/searchresults.html?ss={destination}
 * AID-tagged: appends `aid={NEXT_PUBLIC_BOOKING_AID}` + optional `label`
 *
 * Codemod-ready: when an AID arrives, set `NEXT_PUBLIC_BOOKING_AID=...` in
 * `.env.local`; helper begins emitting AID-tagged URLs automatically. No
 * code change needed at call sites.
 */
import { z } from 'zod';

const Opts = z.object({
  destination: z.string().min(1, 'destination required'),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  label: z.string().optional(),
});

export type BookingLinkOpts = z.infer<typeof Opts>;

export function bookingLink(opts: BookingLinkOpts): string {
  const parsed = Opts.parse(opts);
  const url = new URL('https://www.booking.com/searchresults.html');
  url.searchParams.set('ss', parsed.destination);
  if (parsed.checkin) url.searchParams.set('checkin', parsed.checkin);
  if (parsed.checkout) url.searchParams.set('checkout', parsed.checkout);

  const aid = process.env.NEXT_PUBLIC_BOOKING_AID;
  if (aid) {
    url.searchParams.set('aid', aid);
    if (parsed.label) url.searchParams.set('label', parsed.label);
  }
  return url.toString();
}
