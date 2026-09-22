# The public catalogue generator

Builds `public/brochures/CTS-Tours-2026-2027-Brochure.pdf` — the 34-page A4
catalogue the website serves and the welcome email links to.

```bash
python3 scripts/catalogue/build.py
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -dDetectDuplicateImages=true \
   -sOutputFile=public/brochures/CTS-Tours-2026-2027-Brochure.pdf \
   CTS-Tours-2026-2027-Brochure-v4.pdf   # whatever build.py just wrote
```

Needs Python with Pillow, and Google Chrome (set `CHROME_PATH` if it is
somewhere unusual). Chrome does the page layout and the PDF export, same
reason `scripts/brochure/render.js` does — the browser is the most reliable
renderer we have and the HTML stays editable. Ghostscript brings 11 MB down to
6.6 MB. Do not push it further with an explicit `-dColorImageResolution`: at
130 dpi it saves about 1 MB and corrupts the colour profiles, which then throw
`read ICCBased color space profile error` in every reader that checks.

**Not the same thing as `scripts/brochure/`.** That one makes a bespoke
picture book for a single tailor-made client, from a per-client JSON file.
This one makes the single public catalogue that goes to everybody.

## Why this exists

Until 22 September 2026 this catalogue had **no source file anywhere** — every
revision replaced the binary PDF and the copy only survived inside it. The
2026-08 revision carried three claims that could not be sourced, and they
stayed in front of customers because nobody could diff a PDF:

- two customer testimonials under names that appear nowhere on the site or on
  the Google Business profile;
- "Sunrise at the Great Wall (Mutianyu section)" on three pages, when the
  itinerary says *"Morning tour to the Great Wall at the Mutianyu section"* —
  the same wording that `src/lib/data/home-testimonials.ts` records as having
  come from a batch of fabricated reviews;
- group sizes of "Max 12" and "12–20", against the site's max 18 / max 16.

So: change `data.py`, re-run, commit the new PDF. Never hand-edit the PDF.

## How to change something

`data.py` holds every word and number, with a source tag on each block:

| Tag | Means |
| --- | --- |
| `W` | quotable on the live site — the URL is in the comment |
| `W*` | arithmetic on two site numbers (departure date + duration = return date) |
| `PM` | the product owner confirmed it; the site does not say it |
| `DFS` | a live DataForSEO query on the date recorded |

**A price, date, inclusion or itinerary line may only come from that tour's own
page on ctstours.co.nz, checked the day you change it.** Not from memory, not
from the previous PDF, not from a research doc — the Chengdu and Guangzhou
shopping stops in the 2026-09 research pack were both wrong (one was a
substring match on a hotel called *Jinling*), and only re-reading the itinerary
caught it.

Two rules that are easy to trip over:

- **`1928` never appears alone.** Every mention pairs with "Auckland 2000" or
  "25 years in NZ". The build has no check for this; grep the output.
- **Testimonial attributions use the customer's own wording** ("tale of two
  cities", not "A Tale of Two Cities"), matching the rule in
  `src/lib/data/home-testimonials.ts`.

The Google rating is not hardcoded prose — it reads the same numbers as
`src/lib/data/google-rating.ts`, and `COMPANY["rating_checked"]` records when
they were last verified against the Google Business profile. Re-verify before
publishing; do not carry the old value forward.

## Photo pages

Each departure is followed by a full-page mosaic, defined in `MOSAICS` in
`data.py`. Two rules, and they are the whole point of the page:

1. **A tile may only show a place that tour's own itinerary visits**, and the
   caption may say no more than the itinerary says.
2. **Where two tours differ, the photo must differ.** Golden China walks the
   wall at Juyongguan; the Christmas departures and Legacy of China go to
   Mutianyu. The stock library's wall photos are Mutianyu, so Golden China gets
   a CTS group photo captioned without a section. Shanghai & Surroundings goes
   to Xinshi, not Wuzhen — the Wuzhen photos belong to the "Shanghai & Wuzhen"
   stopover route and nowhere else.

Silk Road has no photo page. Of the nine places its itinerary names, only Xi'an
has a usable image. `MOSAIC_MISSING` in `data.py` lists what is missing for it
and for three other tours; fill those gaps and the pages can grow.

Tile geometry is computed from the tile count (`p_mosaic`), and the grid uses
explicit `1fr` rows plus `min-height: 0` so it fills the page exactly. Without
the `min-height: 0` the tiles' own content props the grid open and the bottom
row prints over the footer.

## Images

`IMAGES` in `build.py` maps a key to a repo-relative path and, where the
licence demands it, a credit. Keys beginning `s:` are registered automatically
from `assets/CREDITS.json`, so a stock image physically cannot reach a page
without its attribution travelling with it.

`assets/` holds the Creative Commons stock the photo pages use, copied in from
the CTS Spotlight library at 1000px. **Its `_excluded` block records every file
that was looked at and rejected, with the reason** — two carried a
photographer's watermark burned into the frame, one was a portrait of an
identifiable private individual rather than a place, three were scraped as Tang
Paradise but labelled Tang Dynasty Ever-Bright City (different Xi'an sites, and
the itinerary names the second), and one was on Commons as CC0 with a
pxfuel.com link as its only credited author. Read that block before adding
anything back: the library's own label table does not show any of this, and
neither does a filename. Anything from `public/blog/sourced/` or
`scripts/brochure/assets/` is Creative Commons and **must** carry its credit
from the matching `CREDITS.json` — the back cover prints the credit for every
CC image the build actually used, and only those. `public/images/tours/` and
`public/blog/group-*.jpg` are CTS's own; the `group-*` ones are real customers
on real departures and beat stock photography wherever a page can take one.

## Two image sets

`assets-istock/` is the paid set — iStock Standard Licence, bought for the
website and reused here. **These need no attribution**, which is most of what
paying for them buys, so they are registered with no credit and never reach the
back cover. `LICENCES.json` records photographer, official iStock title, asset
id and licence anyway, so provenance stays in the repo; the ledger of record is
`Dropbox/MagicLab_Studio/CTS/website/CREDITS.md` and the invoice sits under
`by-client/01_CTS_Tours/bundles/INV-020_Website/supporting/`.

Three of the 25 were deliberately left out, with the reason in `_not_used`: a
Shangri-la monastery that no itinerary here visits, a Great Wall aerial in which
the wall is a thread across a ridge, and Shanghai fireworks — both Christmas
itineraries spend New Year's Eve in **Xi'an**, so fireworks over Pudong would
imply an event these tours do not attend there.

`assets/` is the Creative Commons set, which still covers what the paid set does
not: the Summer Palace, hutongs, the Xi'an city wall and Bell Tower, West Lake,
Leifeng Pagoda, the tea terraces, Ciqikou, yum cha. Every one of those **is**
credited on the back cover.

Prefer the paid set where both have a frame. It is sharper, it carries no
attribution, and it shortened the back-cover credit block by more than half.

## Sourcing record

`SOURCES-2026-09-22.md` is the line-by-line record for the 2026-09-22 revision:
what each claim says, where it came from, and what was removed for being
unverifiable. Write a new one for each revision rather than editing that file.
