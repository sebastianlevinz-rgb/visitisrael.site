/**
 * <RegionHero> — region/page hero with eager image loading.
 *
 * IMG-04 contract: `priority` + `fetchpriority="high"` so the LCP-relevant
 * hero image is requested in the document head's preload step rather than
 * after layout. Plan 03's photo-credits CI gate ensures the image is
 * ledgered + ≥1200px wide. First applied in Phase 2 region canonicals;
 * Phase 1 ships the component contract.
 */
import Image from 'next/image';
import { getCredit } from '@/lib/photo-credits';

export interface RegionHeroProps {
  /** Path of the hero image (must be in data/photo-credits.json). */
  imageSrc: string;
  /** Required — visible page title rendered inside the hero. */
  title: string;
  subtitle?: string;
  /** Alt text override — defaults to `${title} hero image` if absent. */
  alt?: string;
}

export function RegionHero({
  imageSrc,
  title,
  subtitle,
  alt,
}: RegionHeroProps) {
  const credit = getCredit(imageSrc);
  const altText = alt ?? `${title} hero image`;

  return (
    <section
      data-component="region-hero"
      className="relative h-[60vh] min-h-96 w-full overflow-hidden"
    >
      <Image
        src={imageSrc}
        alt={altText}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      {/* Hero overlay — token-driven, RTL-neutral */}
      <div
        className="absolute inset-0 bg-[var(--hero-overlay)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold text-[var(--color-surface-elevated)] drop-shadow-md sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-lg text-[var(--color-surface-elevated)] drop-shadow-md sm:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
      <p className="absolute end-2 bottom-2 rounded bg-[var(--hero-overlay)] px-2 py-1 text-xs text-[var(--color-surface-elevated)]">
        © {credit.author} ({credit.license})
      </p>
    </section>
  );
}
