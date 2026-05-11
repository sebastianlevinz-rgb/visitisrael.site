/**
 * <Badge> — small inline indicator (numeric counts, status dots).
 *
 * Variants:
 *   - variant: neutral | success | warning | danger
 *
 * Smaller than <Tag>; intended for counts / inline indicators rather
 * than category labels.
 */
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-full px-2 py-0.5 text-xs font-semibold',
    'min-w-5',
  ],
  {
    variants: {
      variant: {
        neutral: 'bg-[var(--color-surface)] text-[var(--color-ink-muted)]',
        success:
          'bg-[var(--color-success)] text-[var(--color-surface-elevated)]',
        warning:
          'bg-[var(--color-warning)] text-[var(--color-surface-elevated)]',
        danger: 'bg-[var(--color-danger)] text-[var(--color-surface-elevated)]',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children?: ReactNode;
}

export function Badge({ className, variant, children, ...rest }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...rest}>
      {children}
    </span>
  );
}

export { badgeVariants };
