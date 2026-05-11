/**
 * <Card> — CVA-typed primitive.
 *
 * Variants:
 *   - variant: default | elevated | interactive
 *
 * Tokens consumed: --card-bg, --card-border, --color-surface-elevated.
 * RTL-safety: zero physical directional utilities.
 *
 * `as` prop allows semantic override (article / section / div).
 */
import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const cardVariants = cva(
  [
    'rounded-lg border',
    'bg-[var(--card-bg)] border-[var(--card-border)]',
    'text-[var(--color-ink)]',
    'p-6',
  ],
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-md',
        interactive: 'shadow-sm transition-shadow hover:shadow-lg',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  as?: ElementType;
  children?: ReactNode;
}

export function Card({
  className,
  variant,
  as: Component = 'div',
  children,
  ...rest
}: CardProps) {
  return (
    <Component className={cn(cardVariants({ variant }), className)} {...rest}>
      {children}
    </Component>
  );
}

export { cardVariants };
