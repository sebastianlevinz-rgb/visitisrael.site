/**
 * <Button> — CVA-typed primitive.
 *
 * Variants:
 *   - variant: primary | secondary | ghost
 *   - size:    sm | md | lg
 *
 * Tokens consumed (all from @theme via app/globals.css):
 *   --button-bg-primary, --button-text-primary, --color-primary,
 *   --color-primary-hover, --color-ink, --color-surface-elevated,
 *   --color-border.
 *
 * RTL-safety: zero physical directional utilities. Padding uses Tailwind's
 * `px-*` (logical-equivalent in v4 → padding-inline). Focus ring uses
 * `:focus-visible` for keyboard-only outline.
 *
 * Extends native ButtonHTMLAttributes — `onClick`, `disabled`, `type`,
 * `aria-*`, etc. all pass through.
 *
 * Reference: RESEARCH §1.3 + tailwind-design-system skill §Pattern 1.
 */
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  // Base styles — logical utilities only; tokens via var(--…); focus-visible
  // ring picks up currentColor so it inherits the variant's contrast.
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-md font-medium whitespace-nowrap',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--color-primary)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--button-bg-primary)] text-[var(--button-text-primary)]',
          'hover:bg-[var(--color-primary-hover)]',
        ],
        secondary: [
          'bg-[var(--color-surface-elevated)] text-[var(--color-ink)]',
          'border border-[var(--color-border)]',
          'hover:bg-[var(--color-surface)]',
        ],
        ghost: [
          'bg-transparent text-[var(--color-primary)]',
          'hover:bg-[var(--color-surface)]',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
