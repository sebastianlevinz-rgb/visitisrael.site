/**
 * <PhotoGallery> — next/image-based image grid with srcset emission.
 *
 * IMG-03 contract: srcset widths 320 / 640 / 1024 / 1600 — emitted
 * automatically by `next/image` based on `next.config.ts.images.deviceSizes`
 * (already set in plan 03). The `sizes` prop is REQUIRED to give the
 * browser layout hints; without it, `next/image` would default to `100vw`
 * and over-fetch on grid layouts.
 *
 * Each image goes through `getCredit(src)` (plan 03) so any unledgered
 * image throws at render time AND at the CI gate.
 */
import Image from 'next/image';
import { getCredit } from '@/lib/photo-credits';
import { Grid } from '@/components/ui/Grid';

export interface PhotoGalleryImage {
  src: string;
  alt: string;
}

export interface PhotoGalleryProps {
  images: ReadonlyArray<PhotoGalleryImage>;
  /** Required — feeds the browser srcset selection (per IMG-03). */
  sizes: string;
}

export function PhotoGallery({ images, sizes }: PhotoGalleryProps) {
  return (
    <Grid cols={3} gap="md" data-component="photo-gallery">
      {images.map((img) => {
        const credit = getCredit(img.src);
        return (
          <figure
            key={img.src}
            className="relative overflow-hidden rounded-md border border-[var(--color-border)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={credit.width}
              height={credit.height}
              sizes={sizes}
              className="h-auto w-full"
            />
            <figcaption className="bg-[var(--color-surface)] px-2 py-1 text-xs text-[var(--color-ink-muted)]">
              {credit.author} ({credit.license})
            </figcaption>
          </figure>
        );
      })}
    </Grid>
  );
}
