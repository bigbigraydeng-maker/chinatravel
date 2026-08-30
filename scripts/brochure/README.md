# Client brochure generator

Produces the A4 picture book that goes out alongside a tailor-made itinerary —
a cover, an overview page, one full-bleed opener plus card pages per city, and a
closing page with contact details and photography credits.

First built for the *China Icons Collection* (Ref CTS-2026-0010, Jazz's family,
Nov 2026). The layout is CTS brand chrome: crimson/gold top strip, Georgia
headings, the logo on a white header band on every page.

## Run it

```bash
npm run brochure -- scripts/brochure/data/china-icons-collection.json --out ~/Desktop/brochure.pdf
```

Options:

| Flag | Default | What it does |
| --- | --- | --- |
| `--out <file.pdf>` | `<slug>.pdf` in the current directory | Where to write the PDF |
| `--width <px>` | `1400` | Longest edge each photo is downscaled to before rendering |
| `--html-only` | off | Writes the HTML to a temp file and stops — for tweaking layout |

Needs Google Chrome installed (it does the page layout and PDF export). If it is
somewhere unusual, set `CHROME_PATH`.

A 12-page brochure lands around 4 MB at the default width, which sends by email.
Raise `--width` for print, lower it if a client's mailbox bounces attachments.

## Make a brochure for a new client

Copy `data/china-icons-collection.json`, change the content, run it. The shape:

- `slug`, `ref`, `docTitle`, `preparedFor`, `contactLine` — document identity
- `cover` — hero image key, title, the city strip, and the three meta columns
- `overview` — the intro page; the four-city route strip is generated from `cities`
- `cities[]` — each has `name`, `days`, a `hero` (image / title / caption / body),
  a `glance` list (nights, getting there, onward), and `pages[]`
- `cities[].pages[]` — each page is a list of up to four cards. An image card is
  `{ image, day, title, body }`; a text panel is `{ eyebrow, title, body }` and is
  the tidy way to fill a fourth slot with practical notes rather than leave a hole
- `closing` — the sign-off page
- `images` — every image key, with a repo-relative `src` and, where required, a
  `credit`

Page count follows the data, so adding a city or a card page needs no code change.

## Images

`src` is relative to the repo root, so a brochure can pull from either place:

- `public/…` — photos the website already ships (CTS's own library). Preferred:
  no duplication, and the brochure stays in step with the site.
- `scripts/brochure/assets/…` — photos sourced for brochures and not used on the
  site. Deliberately *not* under `public/`, so they never ship in the web bundle.

Everything in `assets/` came from Wikimedia Commons under a Creative Commons
licence. `assets/CREDITS.json` records photographer, licence, licence URL and
source page for each, mirroring `public/blog/sourced/CREDITS.json`, and the same
attribution is repeated in the data file's `credit` block so it can be printed on
the closing page.

**Adding an image from Commons:** download it, resize to ~1150px wide, drop it in
`assets/`, add an entry to `assets/CREDITS.json`, and add a `credit` block in the
brochure data. `npm test` fails if an `assets/` image has no credit — the licence
requires attribution and this document goes to customers.

## Tests

`scripts/brochure/__tests__/brochure.test.js` runs under the normal `npm test`.
It checks that every image path still resolves, that every page's image key is
declared, that Commons images carry attribution, and that the rendered page count
matches the footer numbering.
