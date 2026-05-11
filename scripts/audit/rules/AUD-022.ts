/**
 * AUD-022 — Hardcoded USD adjacent to ILS in body text.
 *
 * Detection: if the rendered page contains "$" or "USD" near "ILS" / "₪"
 * without using the `<Price>` component (which renders all 3 currencies
 * via STATIC props per plan 05), flag for review.
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-022',
  severity: 'minor',
  description: 'Hardcoded USD adjacent to ILS — use <Price> component.',
  scan(_html, $) {
    const bodyText = $('body').text();
    // Both currencies present?
    const hasIls = /(?:ILS|₪)/.test(bodyText);
    const hasUsd = /(?:USD|\$\d)/.test(bodyText);
    if (!hasIls || !hasUsd) return [];
    // Is there a <Price> component rendering them?
    const hasPriceComponent = $('[data-component="price"]').length > 0;
    if (hasPriceComponent) return [];
    return [
      {
        rule: 'AUD-022',
        severity: 'minor' as const,
        message:
          'Page mixes ILS + USD in body text but no <Price data-component> wrapper. Use the Price component for currency rendering.',
      },
    ];
  },
};

export default rule;
