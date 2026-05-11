/**
 * `cn()` — class-name merger combining clsx + tailwind-merge.
 *
 * Used by every component in the design system to compose CVA variant
 * classes with caller-supplied `className` overrides without producing
 * duplicate-utility conflicts (e.g. `ps-4 ps-6` becomes `ps-6`).
 *
 * Pattern referenced by tailwind-design-system skill §"Utility Functions".
 */
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs));
}
