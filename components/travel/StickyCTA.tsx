/**
 * <StickyCTA> — sticky-positioned call-to-action.
 *
 * Sits at the bottom-end of the viewport (logical `inset-inline-end`) so
 * it appears bottom-right on EN pages and bottom-left on HE pages.
 * Common usage: "Book your trip" button on a region page.
 */
import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export interface StickyCTAProps {
  children: ReactNode;
  href?: string;
  /** Forwarded to the underlying Button. */
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
}

export function StickyCTA({
  children,
  href,
  variant = 'primary',
  size = 'lg',
  className,
}: StickyCTAProps) {
  const positionClasses = 'fixed bottom-4 end-4 z-40 shadow-xl';

  if (href) {
    // For anchor-style CTAs (e.g., booking link) render Button as a link wrapper.
    return (
      <a
        href={href}
        data-component="sticky-cta"
        className={cn(positionClasses, className)}
      >
        <Button variant={variant} size={size} type="button">
          {children}
        </Button>
      </a>
    );
  }

  return (
    <div data-component="sticky-cta" className={cn(positionClasses, className)}>
      <Button variant={variant} size={size} type="button">
        {children}
      </Button>
    </div>
  );
}
