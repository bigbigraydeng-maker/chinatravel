# The public catalogue generator

Builds `public/brochures/CTS-Tours-2026-2027-Brochure.pdf` — the 25-page A4
catalogue the website serves and the welcome email links to.

```bash
python3 scripts/catalogue/build.py
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -dDetectDuplicateImages=true \
   -sOutputFile=public/brochures/CTS-Tours-2026-2027-Brochure.pdf \
   CTS-Tours-2026-2027-Brochure-v4.pdf
```

Needs Python with Pillow, and Google Chrome (set `CHROME_PATH` if it is
somewhere unusual). Chrome does the page layout and the PDF export, same
reason `scripts/brochure/render.js` does — the browser is the most reliable
renderer we have and the HTML stays editable. Ghostscript brings 5.5 MB down
to 3.7 MB, which is what actually sends by email.

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

## Images

`IMAGES` in `build.py` maps a key to a repo-relative path and, where the
licence demands it, a credit. Anything from `public/blog/sourced/` or
`scripts/brochure/assets/` is Creative Commons and **must** carry its credit
from the matching `CREDITS.json` — the back cover prints the credit for every
CC image the build actually used, and only those. `public/images/tours/` and
`public/blog/group-*.jpg` are CTS's own; the `group-*` ones are real customers
on real departures and beat stock photography wherever a page can take one.

## Sourcing record

`SOURCES-2026-09-22.md` is the line-by-line record for the 2026-09-22 revision:
what each claim says, where it came from, and what was removed for being
unverifiable. Write a new one for each revision rather than editing that file.
