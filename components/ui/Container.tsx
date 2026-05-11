/**
 * <Container> — max-width centering wrapper.
 *
 * Variants:
 *   - size: sm | md | lg | xl | full
 *
 * Uses `mx-auto` + `px-*`. In Tailwind v4 the `px-*` shorthand expands to
 * `padding-inline` (logical), so this is RTL-safe; ESLint's physical-util
 * rule only fires on `pl-/pr-/ml-/mr-`, not `px-/mx-/py-/my-`.
 */
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const containerVariants = cva('mx-auto w-full px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      full: 'max-w-full',
    },
  },
  defaultVariants: { size: 'xl' },
});

export interface ContainerProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children?: ReactNode;
}

export function Container({
  className,
  size,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...rest}>
      {children}
    </div>
  );
}

export { containerVariants };
