/**
 * <Ltr> — wraps inline content in `<bdo dir="ltr">` so phone numbers,
 * dates, prices, URLs, and other LTR-strict strings render correctly
 * inside Hebrew (RTL) paragraphs.
 *
 * Per hebrew-rtl-best-practices/SKILL.md §"Common pitfalls": agents often
 * let phone numbers inherit RTL and they appear reversed. <Ltr> isolates.
 *
 * Usage:
 *   <p>התקשרו: <Ltr>+972-2-555-0123</Ltr></p>
 */
import type { HTMLAttributes, ReactNode } from 'react';

export interface LtrProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Ltr({ children, ...rest }: LtrProps) {
  return (
    <bdo dir="ltr" {...rest}>
      {children}
    </bdo>
  );
}
