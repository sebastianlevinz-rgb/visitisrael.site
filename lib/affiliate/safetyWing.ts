/**
 * SafetyWing nomad-insurance affiliate helper.
 *
 * Public URL: https://safetywing.com/nomad-insurance/
 * AID-tagged: appends `referenceID={NEXT_PUBLIC_SAFETYWING_REF}`.
 *
 * Conventionally also carries a UTM source for attribution.
 */
import { z } from 'zod';

const Opts = z.object({
  destination: z.string().optional(),
  label: z.string().optional(),
});

export type SafetyWingLinkOpts = z.infer<typeof Opts>;

export function safetyWingLink(opts: SafetyWingLinkOpts = {}): string {
  const parsed = Opts.parse(opts);
  const url = new URL('https://safetywing.com/nomad-insurance/');
  if (parsed.destination) {
    url.searchParams.set('destination', parsed.destination);
  }

  const ref = process.env.NEXT_PUBLIC_SAFETYWING_REF;
  if (ref) {
    url.searchParams.set('referenceID', ref);
    if (parsed.label) url.searchParams.set('utm_campaign', parsed.label);
  }
  return url.toString();
}
