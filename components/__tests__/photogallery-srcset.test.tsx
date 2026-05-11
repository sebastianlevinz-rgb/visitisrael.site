/**
 * PhotoGallery — IMG-03 srcset contract.
 *
 * `next/image` emits srcset widths derived from `next.config.ts.images.deviceSizes`
 * which is `[320, 640, 1024, 1600]` (set in plan 03). This test exercises
 * two contract layers:
 *
 *   1. PhotoGallery passes the `sizes` prop through to `next/image`
 *      (without `sizes`, next/image defaults to 100vw and over-fetches).
 *   2. next.config.ts retains the locked deviceSizes [320,640,1024,1600]
 *      so the auto-srcset emission stays aligned.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

vi.mock('@/lib/photo-credits', () => ({
  getCredit: (src: string) => ({
    src,
    author: 'A',
    license: 'CC-BY-4.0',
    sourceUrl: 'https://example.com',
    region: 'jerusalem',
    width: 1600,
    height: 900,
    subjectType: 'cityscape',
  }),
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, sizes, width, height } = props as {
      src: string;
      alt: string;
      sizes?: string;
      width?: number;
      height?: number;
    };
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        data-sizes={sizes}
        data-width={width}
        data-height={height}
      />
    );
  },
}));

import { PhotoGallery } from '@/components/travel/PhotoGallery';

afterEach(() => cleanup());

describe('PhotoGallery — IMG-03 srcset contract', () => {
  it('forwards `sizes` prop to next/image', () => {
    const sizes = '(max-width: 768px) 100vw, 50vw';
    render(
      <PhotoGallery
        sizes={sizes}
        images={[
          { src: '/images/a.jpg', alt: 'A' },
          { src: '/images/b.jpg', alt: 'B' },
        ]}
      />,
    );
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(2);
    for (const img of imgs) {
      expect(img.getAttribute('data-sizes')).toBe(sizes);
    }
  });

  it('next.config.ts retains locked deviceSizes [320, 640, 1024, 1600]', () => {
    const cfg = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
    expect(cfg).toMatch(/deviceSizes:\s*\[320,\s*640,\s*1024,\s*1600\]/);
  });
});
