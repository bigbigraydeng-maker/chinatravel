/**
 * Meta dataset (pixel) IDs the site feeds.
 *
 * BOTH must stay initialised — they are owned by different Meta entities and
 * neither one alone covers both jobs:
 *
 *  - META_PIXEL_OWNED — "CTS Tours 数据", owned by the CTStours business
 *    portfolio (987861407149105). This is the client-owned asset and holds the
 *    site's event history since 2026-04-22. Keep it: CTS owns their own data.
 *
 *  - META_PIXEL_ADS — "cts Newsletter", the only CTS dataset visible to the ad
 *    account that actually runs the campaigns (2775766642787274). That account
 *    belongs to no business portfolio, so META_PIXEL_OWNED cannot be shared
 *    into it — Meta only lets a dataset connect to ad accounts inside its
 *    owning portfolio. Feeding this second dataset from the browser is the only
 *    way the live campaigns can attribute website enquiries, optimise for them,
 *    and build website-behaviour audiences.
 *
 * The site fired META_PIXEL_ADS from 2026-04-22 until commit 0179a42
 * (2026-05-05) swapped it for META_PIXEL_OWNED. That swap is why the ad account
 * saw zero website events for the following three months. Do not "tidy" this
 * back down to a single init.
 *
 * WHY THIS LIVES IN ITS OWN MODULE (not in TrackingScripts.tsx)
 * ------------------------------------------------------------
 * layout.tsx is a Server Component and needs these IDs for the no-JS <noscript>
 * fallback. TrackingScripts.tsx is 'use client', and a Server Component that
 * imports a plain value from a client module receives a client-reference proxy
 * instead of the value — it renders as "[object Object]" in the URL. Keeping
 * the constants in this neutral module lets both sides import the real strings.
 */
export const META_PIXEL_OWNED = '1441880990459874';
export const META_PIXEL_ADS = '1824094338280968';

/** Every dataset the browser pixel initialises, in init order. */
export const META_PIXEL_IDS = [META_PIXEL_OWNED, META_PIXEL_ADS] as const;
