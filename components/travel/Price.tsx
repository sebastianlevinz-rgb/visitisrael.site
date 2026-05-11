/**
 * <Price> — STATIC multi-currency price display.
 *
 * Phase 1 ships static (props-driven) ILS+USD+EUR. NO runtime FX
 * conversion service. Daily-cached FX rates land in Phase 6 (DEP-04 cron);
 * Phase 1 just exposes the contract.
 *
 * RTL-safety: each currency value wraps in <Ltr> so digits + currency
 * symbol render in document-order regardless of HE/EN page direction.
 */
import { Ltr } from '@/components/layout/Ltr';
import { cn } from '@/lib/cn';

export interface PriceProps {
  /** Required — ILS is the source of truth at build time. */
  ils: number;
  usd?: number;
  eur?: number;
  /** "from $50" vs "$50": prefix label. */
  prefix?: string;
  className?: string;
}

export function Price({ ils, usd, eur, prefix, className }: PriceProps) {
  return (
    <span
      data-component="price"
      className={cn(
        'inline-flex flex-wrap items-baseline gap-2 text-base',
        className,
      )}
    >
      {prefix ? (
        <span className="text-[var(--color-ink-muted)]">{prefix}</span>
      ) : null}
      <Ltr>
        <span className="font-semibold text-[var(--color-ink)]">
          ₪{ils.toLocaleString('en-US')}
        </span>
      </Ltr>
      {usd !== undefined ? (
        <span className="text-[var(--color-ink-muted)]">
          /{' '}
          <Ltr>
            <span>${usd.toLocaleString('en-US')}</span>
          </Ltr>
        </span>
      ) : null}
      {eur !== undefined ? (
        <span className="text-[var(--color-ink-muted)]">
          /{' '}
          <Ltr>
            <span>€{eur.toLocaleString('en-US')}</span>
          </Ltr>
        </span>
      ) : null}
    </span>
  );
  // TODO(Phase 6 DEP-04): build-time FX update cron to refresh
  // USD+EUR from a cached daily rate.
}
