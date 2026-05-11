/**
 * <AttractionGrid> — grid of attraction cards.
 *
 * Composes <Grid> + <Card>. Each cell links to the attraction's canonical
 * page; image goes through `getCredit()` for the ledger contract.
 */
import Image from 'next/image';
import { getCredit } from '@/lib/photo-credits';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';

export interface Attraction {
  slug: string;
  /** Canonical href — locale-prefixed. */
  href: string;
  name: string;
  imageSrc: string;
  alt: string;
}

export interface AttractionGridProps {
  attractions: ReadonlyArray<Attraction>;
}

export function AttractionGrid({ attractions }: AttractionGridProps) {
  return (
    <Grid cols={3} gap="lg" data-component="attraction-grid">
      {attractions.map((a) => {
        const credit = getCredit(a.imageSrc);
        return (
          <a
            key={a.slug}
            href={a.href}
            className="block focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Card variant="interactive" className="p-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image
                  src={a.imageSrc}
                  alt={a.alt}
                  width={credit.width}
                  height={credit.height}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="px-4 py-3 text-lg font-semibold text-[var(--color-ink)]">
                {a.name}
              </h3>
            </Card>
          </a>
        );
      })}
    </Grid>
  );
}
