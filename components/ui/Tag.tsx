/**
 * <Tag> — pill-shaped label primitive.
 *
 * Variants:
 *   - variant: neutral | success | warning | danger
 *
 * Tokens consumed: semantic color tokens only — --color-ink-muted,
 * --color-success, --color-warning, --color-danger, --color-surface.
 */
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const tagVariants = cva(
  [
    'inline-flex items-center gap-1',
    'rounded-full px-3 py-1 text-sm font-medium',
    'border',
  ],
  {
    variants: {
      variant: {
        neutral: [
          'bg-[var(--color-surface)] text-[var(--color-ink-muted)]',
          'border-[var(--color-border)]',
        ],
        success: [
          'bg-[var(--color-surface)] text-[var(--color-success)]',
          'border-[var(--color-success)]',
        ],
        warning: [
          'bg-[var(--color-surface)] text-[var(--color-warning)]',
          'border-[var(--color-warning)]',
        ],
        danger: [
          'bg-[var(--color-surface)] text-[var(--color-danger)]',
          'border-[var(--color-danger)]',
        ],
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  children?: ReactNode;
}

export function Tag({ className, variant, children, ...rest }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant }), className)} {...rest}>
      {children}
    </span>
  );
}

export { tagVariants };
