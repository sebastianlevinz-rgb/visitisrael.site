/**
 * JsonLd RSC component tests — renders <script type="application/ld+json">
 * with JSON.stringify(schema) as innerHTML.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import type { WithContext, TouristDestination } from 'schema-dts';

import { JsonLd } from '@/components/JsonLd';

describe('<JsonLd>', () => {
  it('renders a <script type="application/ld+json"> tag', () => {
    const schema: WithContext<TouristDestination> = {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: 'Jerusalem',
    };
    const { container } = render(<JsonLd schema={schema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it('innerHTML is JSON.stringify(schema)', () => {
    const schema: WithContext<TouristDestination> = {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: 'Jerusalem',
      inLanguage: 'en',
    };
    const { container } = render(<JsonLd schema={schema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.innerHTML).toBe(JSON.stringify(schema));
  });
});
