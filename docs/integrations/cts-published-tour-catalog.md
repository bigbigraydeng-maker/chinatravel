# CTS published tour catalog

ME Tour Management is the source of truth for CTS product records. Editing a tour changes the working copy; the public website changes only after an authorized user publishes that catalog version.

## Code contract

`src/lib/data/published-tour-catalog.ts` contains `PUBLISHED_TOUR_CATALOG_CONTRACT`. Code, not session notes, records the ME data relationship:

- The fields read from each published tour and departure.
- `recordCoverage`, which maps tour identity/status, offer/content, metadata/relationships, and departures linked by `tour_id` to the public route groups.
- The public route groups that display or consume those fields.
- `consumerFiles`, the website files that directly read the shared catalog adapter.

The association key is `(destination, tier, slug)`, which resolves to `/tours/{destination}/{tier}/{slug}`. Departure rows arrive attached to the ME `tour_id`; only future `open` and `limited` departure statuses are projected into `departure_dates`, while their price overrides become `departure_pricing`. Cancelled, closed, sold-out-status and past departures are omitted. A tour marked inactive or sold out remains in its published record but is excluded from sale lists and departure schedules. The website uses the published catalog version as a whole, so a publish updates membership, order, managed content and availability together.

`src/lib/data/__tests__/published-tour-catalog-contract.test.ts` checks that every direct reader is listed, that coverage accounts for every contracted field, and that public code does not read the legacy static tour array directly. `src/lib/data/__tests__/departure-schedule.test.ts` and `src/lib/data/__tests__/destination-hubs.test.ts` verify that schedule rows and city hubs derive from the current published records, including new records matching managed city or itinerary data. Add any new direct reader and route to this contract in the same change.

The route groups in `PUBLISHED_TOUR_CATALOG_CONTRACT.surfaces` are the public locations: home and China tour listings, search, destination/city hubs, product detail and print pages, campaign/spotlight pages, trip tools, enquiries, agency pages, guide and play related cards, metadata/schema, and sitemap. `consumerFiles` names the concrete source files. Product cards and linked tour references resolve the live `(destination, tier, slug)` record; city hubs and departure schedules also derive their rows from live tour fields instead of maintaining a separate date/name list.

All server-rendered product cards, detail pages, departure schedules, structured data, enquiry defaults, search, and tour APIs must use `getPublishedTours` or one of its filtered helpers. The `DestinationGuide` server wrapper also supplies the latest records to guide related tour cards. Editorial product facts placed in destination-hub copy use the same published tour records for names, durations and prices. Do not import the static fallback array in a public route.

## Required deployment configuration

Configure these values before deploying the website integration:

| Service | Variable | Value |
| --- | --- | --- |
| CTS website | `ME_CTS_TOUR_CATALOG_URL` | ME `/api/public/tour-catalog/<CTS_CLIENT_ID>` endpoint |
| CTS website | `ME_CTS_TOUR_CATALOG_API_KEY` | ME client key scoped for `read:all`, belonging to the same CTS client |
| CTS website | `CTS_TOUR_CATALOG_REVALIDATE_SECRET` | Strong shared secret, matching the ME value |
| CTS website | `CTS_TOUR_CATALOG_CLIENT_ID` | CTS client UUID used by the endpoint and callback |
| Magic Engine | `CTS_TOUR_CATALOG_REVALIDATE_URL` | `https://www.ctstours.co.nz/api/revalidate` |
| Magic Engine | `CTS_TOUR_CATALOG_REVALIDATE_SECRET` | Same secret configured on the CTS website |
| Magic Engine | `CTS_TOUR_CATALOG_CLIENT_ID` | Same CTS client UUID |

The website reads only the published snapshot through the authenticated, client-bound endpoint. A valid ME publish calls the website revalidation endpoint. The shared fetch is also revalidated every 15 seconds. A production website with missing or failed feed configuration returns no catalog products rather than presenting an old static catalog as current. Local development can use the static fallback before the feed is configured.

## Verify after release

1. In ME, edit a tour or departure, save it, and publish the catalog.
2. Confirm the ME publish result reports the website refresh status.
3. Confirm the website feed version changed and its product/departure fields match the published snapshot.
4. Check the route groups in `PUBLISHED_TOUR_CATALOG_CONTRACT`, including list, detail, campaign/guide, search, schema/sitemap, and enquiry positions.
5. For a cancelled departure, verify the departure is absent from detail-page summaries, schedules, campaign CTAs, structured data, and enquiry defaults while still-open departures remain.
