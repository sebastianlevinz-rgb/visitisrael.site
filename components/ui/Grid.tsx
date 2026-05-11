/**
 * <Grid> — responsive grid primitive.
 *
 * Variants:
 *   - cols: 1 | 2 | 3 | 4 (mobile-first ramp; each variant adds breakpoints)
 *   - gap:  none | sm | md | lg | xl
 *
 * RTL-safety: CSS Grid + the standard `gap-*` utility flips inline-axis
 * automatically with `dir="rtl"` on an ancestor; no physical
 * directional utilities are involved.
 */
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: {
    cols: 3,
    gap: 'md',
  },
});

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
  children?: ReactNode;
}

export function Grid({ className, cols, gap, children, ...rest }: GridProps) {
  return (
    <div className={cn(gridVariants({ cols, gap }), className)} {...rest}>
      {children}
    </div>
  );
}

export { gridVariants };
