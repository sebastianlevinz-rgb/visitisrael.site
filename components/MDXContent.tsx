/**
 * <MDXContent> — runtime evaluator for Velite's compiled MDX function-body.
 *
 * Velite's `s.mdx()` schema compiles MDX → JS function body string. To
 * render it, we evaluate that body with `react/jsx-runtime` injected so
 * the produced `MDXContent` component is callable. Components map passes
 * MDX JSX (`<AffiliateCard ...>`) through to our real React components.
 *
 * RSC-safe: the Function-constructor evaluation runs at server render
 * time. The `code` parameter is the trusted build output of Velite, NOT
 * user input — so this isn't an `eval` vulnerability.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as runtime from 'react/jsx-runtime';
import type { ComponentType, ReactElement } from 'react';

import { AffiliateCard } from '@/components/travel/AffiliateCard';
import { ShabbatNotice } from '@/components/travel/ShabbatNotice';
import { WhereToStay } from '@/components/travel/WhereToStay';
import { TransportInfo } from '@/components/travel/TransportInfo';
import { BestTimeToVisit } from '@/components/travel/BestTimeToVisit';
import { Price } from '@/components/travel/Price';
import { Ltr } from '@/components/layout/Ltr';

/**
 * The component map exposed to MDX bodies. Add new entries here when
 * a new content composite needs to be available inside `.mdx` files.
 */
export const mdxComponents: Record<string, ComponentType<any>> = {
  AffiliateCard,
  ShabbatNotice,
  WhereToStay,
  TransportInfo,
  BestTimeToVisit,
  Price,
  Ltr,
};

interface MDXContentProps {
  /** Velite-compiled MDX function-body. */
  code: string;
  /** Optional component overrides — merged on top of `mdxComponents`. */
  components?: Record<string, ComponentType<any>>;
}

/**
 * Evaluate the compiled MDX function-body and invoke the resulting
 * component with the merged components map. Returns the produced
 * React element directly so we do NOT create a new component type
 * during render (Argentina-lesson-aware: stable identity matters for
 * RSC caching + react-hooks/static-components).
 *
 * The `code` parameter is Velite's trusted build output, NOT user input,
 * so the Function-constructor evaluation is not an eval-injection
 * vulnerability.
 */
function renderMdx(
  code: string,
  components: Record<string, ComponentType<any>>,
): ReactElement {
  const fn = new Function(code);
  const mod = fn({ ...runtime }) as {
    default: (props: {
      components?: Record<string, ComponentType<any>>;
    }) => ReactElement;
  };
  return mod.default({ components });
}

export function MDXContent({
  code,
  components,
}: MDXContentProps): ReactElement {
  const merged = { ...mdxComponents, ...(components ?? {}) };
  return renderMdx(code, merged);
}
