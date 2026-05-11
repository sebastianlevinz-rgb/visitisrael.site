/**
 * <Icon> — generic SVG icon wrapper.
 *
 * Optional `directional` prop adds `rtl:rotate-180` so chevron / arrow
 * icons mirror automatically when an ancestor sets `dir="rtl"`.
 *
 * Logical CSS does not handle SVG path geometry, so `rtl:` variant IS
 * the correct escape hatch here (per hebrew-rtl-best-practices SKILL.md
 * §"Step 6": "Icons with directional meaning -- mirror them").
 */
import type { SVGAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Set `true` for chevrons/arrows that should mirror in RTL. */
  directional?: boolean;
  /** Accessible name; when omitted, sets `aria-hidden`. */
  label?: string;
  children?: ReactNode;
}

export function Icon({
  directional = false,
  label,
  className,
  children,
  ...rest
}: IconProps) {
  const ariaProps = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'inline-block size-4',
        directional ? 'rtl:rotate-180' : undefined,
        className,
      )}
      {...ariaProps}
      {...rest}
    >
      {children}
    </svg>
  );
}
