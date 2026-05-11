/**
 * Smoke tests for the 7 UI primitives (FND-03 + I18N-03).
 *
 * Each primitive must:
 *   - Render without `console.error` in both `dir="ltr"` and `dir="rtl"`
 *   - Use only logical / non-directional Tailwind utilities (no `ml-`,
 *     `pl-`, `text-left`, `border-l`, `rounded-l`, etc.)
 *   - Reference colors via semantic tokens (`var(--color-…)`) — never
 *     raw hex
 *   - Forward native HTML attributes (extends ButtonHTMLAttributes etc.)
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';

// Wrap children in a directional <div>; jsdom does not inherit `dir`
// from <html> on rendered fragments unless explicitly wrapped.
function renderWithDir(ui: ReactNode, dir: 'ltr' | 'rtl') {
  return render(<div dir={dir}>{ui}</div>);
}

let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
  cleanup();
});

describe('UI primitives — render in both LTR and RTL without console errors', () => {
  it('<Button> primary/md renders with logical utilities + token-based bg', () => {
    renderWithDir(<Button>Click</Button>, 'ltr');
    const btn = screen.getByRole('button', { name: 'Click' });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toMatch(/var\(--button-bg-primary\)/);
    expect(btn.getAttribute('type')).toBe('button');
  });

  it('<Button> supports onClick + disabled + type="submit"', () => {
    const onClick = vi.fn();
    renderWithDir(
      <Button onClick={onClick} type="submit" disabled>
        Save
      </Button>,
      'ltr',
    );
    const btn = screen.getByRole('button', { name: 'Save' });
    expect(btn).toBeDisabled();
    expect(btn.getAttribute('type')).toBe('submit');
  });

  it.each(['primary', 'secondary', 'ghost'] as const)(
    '<Button variant="%s"> renders in RTL',
    (variant) => {
      renderWithDir(<Button variant={variant}>Hi</Button>, 'rtl');
      expect(screen.getByRole('button', { name: 'Hi' })).toBeInTheDocument();
    },
  );

  it('<Card> renders with token-based bg + border, supports `as` prop', () => {
    renderWithDir(
      <Card as="article" data-testid="card">
        Hello
      </Card>,
      'rtl',
    );
    const card = screen.getByTestId('card');
    expect(card.tagName).toBe('ARTICLE');
    expect(card.className).toMatch(/var\(--card-bg\)/);
    expect(card.className).toMatch(/var\(--card-border\)/);
  });

  it.each(['neutral', 'success', 'warning', 'danger'] as const)(
    '<Tag variant="%s"> renders in RTL',
    (variant) => {
      renderWithDir(
        <Tag variant={variant} data-testid={`tag-${variant}`}>
          {variant}
        </Tag>,
        'rtl',
      );
      expect(screen.getByTestId(`tag-${variant}`)).toBeInTheDocument();
    },
  );

  it.each(['neutral', 'success', 'warning', 'danger'] as const)(
    '<Badge variant="%s"> renders in LTR',
    (variant) => {
      renderWithDir(
        <Badge variant={variant} data-testid={`badge-${variant}`}>
          {variant === 'neutral' ? 3 : '!'}
        </Badge>,
        'ltr',
      );
      expect(screen.getByTestId(`badge-${variant}`)).toBeInTheDocument();
    },
  );

  it('<Section> defaults to <section> element; `as="article"` overrides', () => {
    const { rerender } = renderWithDir(
      <Section data-testid="sec">x</Section>,
      'ltr',
    );
    expect(screen.getByTestId('sec').tagName).toBe('SECTION');
    rerender(
      <div dir="ltr">
        <Section as="article" data-testid="sec">
          x
        </Section>
      </div>,
    );
    expect(screen.getByTestId('sec').tagName).toBe('ARTICLE');
  });

  it('<Container size="lg"> applies mx-auto + max-width', () => {
    renderWithDir(
      <Container size="lg" data-testid="ctn">
        body
      </Container>,
      'rtl',
    );
    const ctn = screen.getByTestId('ctn');
    expect(ctn.className).toMatch(/mx-auto/);
    expect(ctn.className).toMatch(/max-w-screen-lg/);
  });

  it('<Grid cols=3 gap="lg"> applies responsive grid-cols + gap utilities', () => {
    renderWithDir(
      <Grid cols={3} gap="lg" data-testid="grid">
        <div>a</div>
        <div>b</div>
      </Grid>,
      'ltr',
    );
    const grid = screen.getByTestId('grid');
    expect(grid.className).toMatch(/grid-cols-1/);
    expect(grid.className).toMatch(/sm:grid-cols-2/);
    expect(grid.className).toMatch(/lg:grid-cols-3/);
    expect(grid.className).toMatch(/gap-6/);
  });
});

describe('UI primitives — AST/text scan: no physical directional utilities, no raw hex', () => {
  const primitiveFiles = [
    'components/ui/Button.tsx',
    'components/ui/Card.tsx',
    'components/ui/Tag.tsx',
    'components/ui/Badge.tsx',
    'components/ui/Section.tsx',
    'components/ui/Container.tsx',
    'components/ui/Grid.tsx',
  ];

  // Mirrors the ESLint Rule-4 regex in eslint.config.js (without the
  // \d? trailing — we want to catch any occurrence, even keyword form).
  // Looks for these tokens INSIDE classNames/string literals only —
  // matching whole-word boundaries with a leading non-letter and a
  // trailing digit/letter range.
  const physicalPatterns: Array<{ pattern: RegExp; name: string }> = [
    { pattern: /\bml-\d/, name: 'ml-' },
    { pattern: /\bmr-\d/, name: 'mr-' },
    { pattern: /\bpl-\d/, name: 'pl-' },
    { pattern: /\bpr-\d/, name: 'pr-' },
    { pattern: /\btext-left\b/, name: 'text-left' },
    { pattern: /\btext-right\b/, name: 'text-right' },
    { pattern: /\bborder-l\b/, name: 'border-l' },
    { pattern: /\bborder-r\b/, name: 'border-r' },
    { pattern: /\brounded-l\b/, name: 'rounded-l' },
    { pattern: /\brounded-r\b/, name: 'rounded-r' },
    { pattern: /\bleft-\d/, name: 'left-' },
    { pattern: /\bright-\d/, name: 'right-' },
  ];

  // bg-[#abc] / text-[#fff] etc.
  const rawHexInClass = /\[#[0-9a-fA-F]{3,8}\]/;
  // style={{ color: '#fff' }} variants — looks for "'#fff'" / '"#fff"'
  const rawHexInStyle = /['"]#[0-9a-fA-F]{3,8}['"]/;

  it.each(primitiveFiles)(
    '%s contains no physical directional utility',
    (file) => {
      const content = readFileSync(join(process.cwd(), file), 'utf8');
      for (const { pattern, name } of physicalPatterns) {
        expect(
          pattern.test(content),
          `${file} contains banned physical utility "${name}"`,
        ).toBe(false);
      }
    },
  );

  it.each(primitiveFiles)('%s contains no raw hex in className', (file) => {
    const content = readFileSync(join(process.cwd(), file), 'utf8');
    expect(
      rawHexInClass.test(content),
      `${file} contains arbitrary-hex class like bg-[#abc]`,
    ).toBe(false);
    expect(
      rawHexInStyle.test(content),
      `${file} contains raw hex inside a quoted style string`,
    ).toBe(false);
  });
});
