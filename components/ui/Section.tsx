/**
 * <Section> — semantic page-section primitive.
 *
 * Default semantic element is `<section>`. `as` prop overrides to
 * `<article>` / `<div>` / `<aside>` / `<main>` etc.
 *
 * Optional `padded` prop applies the design-token vertical padding
 * (--spacing-section). RTL-safe — uses `py-*` only (no inline-direction
 * implication).
 */
import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const sectionVariants = cva('w-full', {
  variants: {
    padded: {
      true: 'py-12',
      false: '',
    },
  },
  defaultVariants: { padded: true },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  as?: ElementType;
  children?: ReactNode;
}

export function Section({
  className,
  padded,
  as: Component = 'section',
  children,
  ...rest
}: SectionProps) {
  return (
    <Component className={cn(sectionVariants({ padded }), className)} {...rest}>
      {children}
    </Component>
  );
}

export { sectionVariants };
