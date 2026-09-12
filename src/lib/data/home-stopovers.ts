/**
 * Homepage "China Stopovers" picks — the stopover-tier tours featured on the
 * homepage. Real tour data (name, price, duration, image) comes from
 * `getTourBySlug('china', 'stopover', slug)`; this just curates which three
 * to feature and their short highlight tag.
 *
 * Reorder or replace entries when marketing priorities change.
 */
export type HomeStopoverRef = {
  slug: string;
  /** Short highlights line shown under the destination name, e.g. "Great Wall · Forbidden City · Imperial Beijing". */
  highlights: string;
};

export const HOME_STOPOVER_TOURS: HomeStopoverRef[] = [
  { slug: 'beijing', highlights: 'Great Wall · Forbidden City · Imperial Beijing' },
  { slug: 'shanghai', highlights: 'The Bund · Yu Garden · Shanghai nightlife' },
  { slug: 'shanghai-suzhou', highlights: 'Shanghai · Water towns · Classical gardens' },
];
