import type { Tour } from '@/lib/data/tours';

/** Resolve tour facts embedded in editorial and metadata copy from current records. */
export function resolvePublishedTourCopyTokens(text: string, tours: readonly Tour[]): string {
  return text.replace(/\[\[TOUR_(PRICE|NAME|DURATION):(signature|discovery|stopover):([a-z0-9-]+)\]\]/g,
    (_match, field: 'PRICE' | 'NAME' | 'DURATION', tier: Tour['tier'], slug: string) => {
      const tour = tours.find((item) => item.destination === 'china' && item.tier === tier && item.slug === slug);
      if (field === 'PRICE') return tour?.price.replace(/^From/i, 'from') ?? 'ask CTS for current pricing';
      if (field === 'NAME') return tour?.name ?? 'the current tour';
      return tour?.duration ?? 'the current duration shown on the tour page';
    });
}
