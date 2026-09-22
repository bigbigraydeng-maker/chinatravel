#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build the CTS Tours 2026-27 China brochure (A4 PDF).

  python3 build.py [--out brochure.pdf] [--html-only]

Same approach as chinatravel's scripts/brochure/render.js: build one self
contained HTML file, let headless Chrome do the page layout and the PDF
export. Images are downscaled through Pillow first — the originals total
~40 MB and would push the PDF past what a client mailbox accepts.

Content lives in data.py, with a source tag on every factual claim.
"""

import argparse
import base64
import io
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

import data as D

REPO = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent

CHROME_CANDIDATES = [
    os.environ.get("CHROME_PATH"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
]

MAX_WIDTH = 1150
JPEG_QUALITY = 68

# key -> (repo-relative path, credit or None)
# Credit is required for every Creative Commons image; the licence demands
# attribution and this document goes to customers. Images from
# public/images/tours and public/blog/group-* are CTS's own library.
IMAGES = {
    "great-wall-cloud-sea":  ("public/images/tours/great-wall-cloud-sea.jpg", None),
    "great-wall-green":      ("public/images/tours/great-wall-green.jpg", None),
    "great-wall-mist":       ("public/images/tours/great-wall-mist.jpg", None),
    "group-great-wall-cts":  ("public/blog/group-great-wall-cts.jpg", None),
    "baker":                 ("public/images/baker-gu-portrait-optimized.jpg", None),
    "forbidden-city-aerial": ("public/images/tours/forbidden-city-aerial.jpg", None),
    "beijing-temple":        ("public/images/tours/beijing-temple.jpg", None),
    "xian-terracotta":       ("public/images/tours/xian-terracotta.jpg", None),
    "xian-terracotta-2":     ("public/images/tours/xian-terracotta-2.jpg", None),
    "shanghai-skyline":      ("public/images/tours/shanghai-skyline.jpg", None),
    "shanghai-night-red":    ("public/images/tours/shanghai-night-red.jpg", None),
    "shanghai-yuyuan-night": ("public/images/tours/shanghai-yuyuan-night.jpg", None),
    "china-pagoda-night":    ("public/images/tours/china-pagoda-night.jpg", None),
    "suzhou-canal":          ("public/images/tours/suzhou-canal.jpg", None),
    "yangshuo-karst-aerial": ("public/images/tours/yangshuo-karst-aerial.jpg", None),
    "li-river-karst-boats":  ("public/images/tours/li-river-karst-boats.jpg", None),
    "li-river-rafts":        ("public/images/tours/Li-River-1.jpeg", None),
    # NOT public/images/tours/guilin-river-valley.jpg — despite the name it shows
    # no karst at all (a hazy river town, a cliffside pavilion and a weir; it
    # looks like Dujiangyan). It is live on the site under guides/guilin/, which
    # is worth someone's attention, but it is not Guilin and not usable here.
    "panda-base-climbing": (
        "public/blog/sourced/chengdu-panda-base-pandas-climbing.jpg",
        ("Chengdu Research Base of Giant Panda Breeding", "Jimmyshjj", "CC BY-SA 4.0"),
    ),
    "silk-road-hero":        ("public/campaigns/silk-road-hero.jpg", None),
    "chengdu-pandas":        ("public/images/tours/chengdu-pandas.jpg", None),
    "group-lake-deck":       ("public/blog/group-lake-deck-beijing.jpg", None),
    "group-shopping":        ("public/blog/group-shopping-street-china.jpg", None),
    "group-market":          ("public/blog/group-market-street-china.jpg", None),
    "group-bullet-train":    ("public/blog/group-bullet-train-cts-sign.jpg", None),
    "shanghai-night-blue":   ("public/images/tours/shanghai-night-blue.jpg", None),
    "guilin-mist":           ("public/images/tours/guilin-mist.jpg", None),
    "group-walking-lane":    ("public/blog/group-walking-shanghai-lane.jpg", None),
    "group-ancient-gate":    ("public/blog/group-ancient-gate-night.jpg", None),
    "wuzhen-canal":          ("public/images/tours/wuzhen-canal.jpg", None),
    "leshan-buddha":         ("public/images/tours/leshan-buddha-statue.jpg", None),
    "beihai-park": (
        "scripts/brochure/assets/beihai-park.jpg",
        ("Beihai Park Beijing", "Bjoertvedt", "CC BY-SA 4.0"),
    ),
    "tiananmen-square": (
        "scripts/brochure/assets/tiananmen-square.jpg",
        ("Tian'anmen, Beijing", "Francesco Bini", "CC BY-SA 4.0"),
    ),
    "dali-three-pagodas": (
        "public/blog/sourced/dali-three-pagodas.jpg",
        ("Three Pagodas, Dali", "CEphoto, Uwe Aranas", "CC BY-SA 3.0"),
    ),
    "logo":                  ("public/logo.png", None),

    "tang-everbright-city": (
        "scripts/brochure/assets/tang-everbright-city.jpg",
        ("Tang Dynasty Ever-Bright City, Xi'an", "源義信", "CC BY-SA 4.0"),
    ),
    "ciqikou": (
        "scripts/brochure/assets/ciqikou.jpg",
        ("Ciqikou old town, Chongqing", "Nyx Ning", "CC BY-SA 3.0"),
    ),
    "hangzhou-west-lake-broken-bridge": (
        "public/blog/sourced/hangzhou-west-lake-broken-bridge.jpg",
        ("West Lake, Hangzhou", "Jakub Hałun", "CC BY-SA 4.0"),
    ),
    "hangzhou-west-lake-autumn": (
        "public/blog/sourced/hangzhou-west-lake-autumn.jpg",
        ("West Lake in autumn, Hangzhou", "源義信", "CC BY 4.0"),
    ),
    "chongqing-hongyadong": (
        "public/blog/sourced/chongqing-hongyadong-stilt-complex.jpg",
        ("Hongyadong, Chongqing", "xiquinhosilva", "CC BY 2.0"),
    ),
    "xian-muslim-quarter": (
        "public/blog/sourced/xian-muslim-quarter-night-market.jpg",
        ("Muslim Quarter night market, Xi'an", "chensiyuan", "CC BY-SA 4.0"),
    ),
}

# The photo pages draw on scripts/catalogue/assets — Creative Commons stock,
# copied in with its provenance. Registering it from CREDITS.json rather than by
# hand means an image can never reach the page without its credit: the back
# cover prints a line for every CC image the build actually used.
_ASSET_CREDITS = json.loads(
    (Path(__file__).resolve().parent / "assets" / "CREDITS.json").read_text(encoding="utf8")
)
for _k, _v in _ASSET_CREDITS["images"].items():
    IMAGES[f"s:{_k}"] = (
        f"scripts/catalogue/assets/{_k}.jpg",
        (_v["label_en"], _v["author"], _v["license"]),
    )

# The paid iStock set. Registered with no credit on purpose: a Standard Licence
# does not require attribution, which is most of what paying for them buys. Their
# provenance lives in assets-istock/LICENCES.json and in the ledger at
# Dropbox/MagicLab_Studio/CTS/website/CREDITS.md, not on the back cover.
_ISTOCK = json.loads(
    (Path(__file__).resolve().parent / "assets-istock" / "LICENCES.json").read_text(encoding="utf8")
)
for _k in _ISTOCK["images"]:
    IMAGES[f"i:{_k}"] = (f"scripts/catalogue/assets-istock/{_k}.jpg", None)

_used = set()
# filled in by _prepare(), read off the actual pixels rather than trusted from a
# filename: the coarse shape, and the true width/height ratio the photo pages
# lay themselves out from
_SHAPE: dict = {}
_ASPECT: dict = {}


def img(key: str) -> str:
    """Return a data URI for the image, and record that it was used so the
    credits block on the back cover only lists images that made the cut."""
    if key not in IMAGES:
        raise SystemExit(f'Unknown image key "{key}" — add it to IMAGES.')
    _used.add(key)
    return _DATA_URIS[key]


def _prepare() -> dict:
    out = {}
    for key, (rel, _credit) in IMAGES.items():
        src = REPO / rel
        if not src.exists():
            raise SystemExit(f'Image "{key}" points at a missing file: {rel}')
        im = Image.open(src)
        if key == "logo":
            im = im.convert("RGBA")
            buf = io.BytesIO()
            im.thumbnail((600, 600), Image.LANCZOS)
            im.save(buf, "PNG", optimize=True)
            mime = "image/png"
        else:
            im = im.convert("RGB")
            _SHAPE[key] = "portrait" if im.height > im.width * 1.1 else "landscape"
            _ASPECT[key] = im.width / im.height
            if im.width > MAX_WIDTH:
                h = round(im.height * MAX_WIDTH / im.width)
                im = im.resize((MAX_WIDTH, h), Image.LANCZOS)
            buf = io.BytesIO()
            im.save(buf, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
            mime = "image/jpeg"
        out[key] = f"data:{mime};base64," + base64.b64encode(buf.getvalue()).decode()
    return out


_DATA_URIS: dict = {}


# ---------------------------------------------------------------- CSS ----

CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --crimson: %(crimson)s;
  --gold: %(gold)s;
  --ink: %(ink)s;
  --muted: %(muted)s;
  --surface: %(surface)s;
  --line: %(line)s;
}
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--ink);
  font-size: 10.1pt;
  line-height: 1.58;
  background: #fff;
}
.page {
  position: relative;
  width: 210mm; height: 297mm;
  overflow: hidden;
  page-break-after: always;
  background: #fff;
}
.page:last-child { page-break-after: auto; }
.page { display: flex; flex-direction: column; }
.pad { padding: 16mm 16mm 23mm 16mm; flex: 1; display: flex; flex-direction: column; }
.tail { margin-top: auto; flex: 0 0 auto; }

h1, h2, h3, .serif { font-family: Georgia, "Times New Roman", serif; font-weight: 700; }

.eyebrow {
  font-size: 6.6pt; letter-spacing: .26em; text-transform: uppercase;
  color: var(--crimson); font-weight: 700;
}
.eyebrow.gold { color: var(--gold); }
.eyebrow.mute { color: var(--muted); }

h2.title { font-size: 31pt; line-height: 1.1; margin: 4mm 0 3mm; letter-spacing: -.01em; }
h2.title .accent { color: var(--crimson); }
.lede { font-size: 11pt; color: var(--muted); line-height: 1.6; max-width: 150mm; }

.foot {
  position: absolute; left: 16mm; right: 16mm; bottom: 10mm;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 6.4pt; letter-spacing: .22em; text-transform: uppercase;
  color: #9A9187; border-top: .4pt solid var(--line); padding-top: 3mm;
}

/* --- cover ------------------------------------------------------- */
.cover { background: #1a1815; }
.cover img.bg { position: absolute; inset: 0; width: 100%%; height: 100%%; object-fit: cover; }
.cover .scrim {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(20,18,16,.55) 0%%, rgba(20,18,16,.05) 32%%,
              rgba(20,18,16,.55) 62%%, rgba(20,18,16,.93) 100%%);
}
.cover .logo-band {
  position: absolute; top: 14mm; left: 14mm;
  background: #fff; padding: 3mm 5mm; border-radius: 1.5mm;
}
.cover .logo-band img { height: 9mm; display: block; }
.cover .copy { position: absolute; left: 14mm; right: 14mm; bottom: 16mm; color: #fff; }
.cover h1 { font-size: 40pt; line-height: 1.03; letter-spacing: -.015em; }
.cover h1 .gold { color: var(--gold); }
.cover .sub { margin-top: 5mm; font-size: 10.4pt; line-height: 1.6; max-width: 130mm; color: #F3EDE5; }
.cover .rule { width: 22mm; height: 1.4mm; background: var(--gold); margin: 6mm 0 5mm; }
.cover .base {
  margin-top: 7mm; padding-top: 3.5mm; border-top: .5pt solid rgba(255,255,255,.3);
  display: flex; justify-content: space-between;
  font-size: 6.4pt; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.75);
}

/* --- hero band (tour pages) --------------------------------------- */
.hero { position: relative; height: 74mm; flex: 0 0 auto; overflow: hidden; background: #1a1815; }
.hero img { position: absolute; inset: 0; width: 100%%; height: 100%%; object-fit: cover; }
.hero .scrim {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(20,18,16,.62) 0%%, rgba(20,18,16,.10) 34%%, rgba(20,18,16,.72) 72%%, rgba(20,18,16,.96) 100%%);
}
.hero .flag {
  position: absolute; top: 0; left: 0;
  background: var(--gold); color: #2A2009;
  font-size: 6.4pt; letter-spacing: .2em; text-transform: uppercase; font-weight: 700;
  padding: 2.6mm 6mm 2.6mm 16mm;
}
.hero .cap { position: absolute; left: 16mm; right: 16mm; bottom: 7mm; color: #fff; }
.hero .cap .eyebrow { color: rgba(255,255,255,.72); }
.hero .cap h2 { font-size: 24pt; line-height: 1.08; margin: 2mm 0 2mm; }
.hero .cap .meta { font-size: 8.8pt; color: rgba(255,255,255,.88); line-height: 1.5; }
.hero .cap .meta b { color: var(--gold); font-weight: 600; }

/* --- stat strip --------------------------------------------------- */
.stats { display: flex; gap: 3mm; margin: 7mm 16mm 0 16mm; flex: 0 0 auto; }
.stat { flex: 1; background: var(--surface); border-top: 1.4mm solid var(--gold); padding: 3.5mm 4mm 4mm; }
.stat .k { font-size: 6.2pt; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }
.stat .v { font-family: Georgia, serif; font-size: 14pt; font-weight: 700; margin-top: 1.5mm; line-height: 1.1; }
.stat .v small { font-size: 8.5pt; }
.stat .d { font-size: 7.6pt; color: var(--muted); margin-top: 1.5mm; line-height: 1.35; }

/* --- two column body ---------------------------------------------- */
.cols { display: flex; gap: 9mm; margin: 8mm 16mm 0 16mm; }
.col-main { flex: 1.35; }
.col-side { flex: 1; }
.sect { font-size: 6.6pt; letter-spacing: .2em; text-transform: uppercase; color: var(--crimson);
        font-weight: 700; margin-bottom: 3mm; }
.sect.mt { margin-top: 6mm; }
ol.hl { list-style: none; counter-reset: h; }
ol.hl li { counter-increment: h; position: relative; padding-left: 7mm; margin-bottom: 2.8mm; line-height: 1.5; }
ol.hl li::before {
  content: counter(h); position: absolute; left: 0; top: .2mm;
  font-family: Georgia, serif; font-size: 8pt; color: var(--gold); font-weight: 700;
}
ul.tick { list-style: none; }
ul.tick li { position: relative; padding-left: 4.8mm; margin-bottom: 2.6mm; line-height: 1.5; }
ul.tick li::before {
  content: ""; position: absolute; left: 0; top: 1.5mm;
  width: 1.7mm; height: 1.7mm; border-radius: 50%%; background: var(--crimson);
}
ul.tick.grey li::before { background: #C3BAAE; }

.note {
  margin: 7mm 16mm 0 16mm; padding-top: 3.5mm; border-top: .4pt solid var(--line);
  display: flex; justify-content: space-between; align-items: center; gap: 6mm;
}
.note .t { font-size: 8pt; color: var(--muted); }
.pill {
  background: var(--crimson); color: #fff; font-size: 7.4pt; font-weight: 700;
  padding: 2.4mm 5mm; border-radius: 1mm; white-space: nowrap;
}

/* --- generic cards ------------------------------------------------- */
.grid2 { display: flex; flex-wrap: wrap; gap: 5mm; }
.grid2 > * { width: calc(50%% - 2.5mm); }
.grid3 { display: flex; flex-wrap: wrap; gap: 4mm; }
.grid3 > * { width: calc(33.333%% - 2.667mm); }
.card { background: var(--surface); border: .4pt solid var(--line); padding: 6mm; }
.card h3 { font-size: 12.5pt; margin-bottom: 2mm; }
.card .k { font-size: 6.2pt; letter-spacing: .2em; text-transform: uppercase; color: var(--crimson); font-weight: 700; }
.card p { font-size: 9.2pt; color: var(--muted); line-height: 1.5; }

.city { display: flex; gap: 7mm; margin-bottom: 9mm; align-items: center; }
.city img { width: 58mm; height: 44mm; object-fit: cover; flex: 0 0 auto; }
.city .n { font-family: Georgia, serif; font-size: 7.5pt; color: var(--gold); font-weight: 700; letter-spacing: .14em; }
.city h3 { font-size: 16pt; margin: 1mm 0 2mm; }
.city p { font-size: 9.4pt; color: var(--muted); line-height: 1.5; }
.city .see { margin-top: 2.5mm; font-size: 7.2pt; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
.city .see b { color: var(--ink); font-weight: 600; }

/* --- comparison table ---------------------------------------------- */
table.cmp { width: 100%%; border-collapse: collapse; font-size: 8.2pt; }
table.cmp th, table.cmp td { padding: 2.9mm 2.4mm; text-align: left; vertical-align: top;
  border-bottom: .4pt solid var(--line); line-height: 1.35; }
table.cmp thead th { background: var(--surface); font-family: Georgia, serif; font-size: 8.2pt;
  border-bottom: 1pt solid var(--gold); }
table.cmp thead th small { display: block; font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: 400; font-size: 6.6pt; color: var(--muted); letter-spacing: .08em;
  text-transform: uppercase; margin-top: .8mm; }
table.cmp tbody th { width: 26mm; font-size: 6.4pt; letter-spacing: .14em; text-transform: uppercase;
  color: var(--muted); font-weight: 700; }
table.cmp td.price { font-family: Georgia, serif; font-size: 9.4pt; font-weight: 700; color: var(--crimson); }

/* --- stopover table ------------------------------------------------- */
table.so { width: 100%%; border-collapse: collapse; font-size: 9.4pt; }
table.so td { padding: 3.6mm 2mm; border-bottom: .4pt solid var(--line); }
table.so td.d { width: 16mm; font-family: Georgia, serif; color: var(--gold); font-weight: 700; }
table.so td.p { width: 24mm; text-align: right; font-family: Georgia, serif; font-weight: 700; }

/* --- steps ---------------------------------------------------------- */
.step { display: flex; gap: 6mm; margin-bottom: 9mm; align-items: flex-start; }
.step .num { font-family: Georgia, serif; font-size: 26pt; color: var(--gold); line-height: 1;
  width: 12mm; flex: 0 0 auto; }
.step h3 { font-size: 13.5pt; margin-bottom: 1.5mm; }
.step p { font-size: 9.8pt; color: var(--muted); line-height: 1.5; }

.callout { background: var(--crimson); color: #fff; padding: 7mm; }
.callout h3 { font-size: 16.5pt; color: #fff; margin-bottom: 2.5mm; }
.callout p { font-size: 9.6pt; color: rgba(255,255,255,.9); line-height: 1.55; }

.quote { border-left: 1.2mm solid var(--gold); padding-left: 5mm; margin-bottom: 5mm; }
.quote p { font-family: Georgia, serif; font-size: 9.8pt; font-style: italic; line-height: 1.55; }
.quote .who { font-size: 7.2pt; letter-spacing: .12em; text-transform: uppercase;
  color: var(--muted); margin-top: 2mm; }

.big-num { font-family: Georgia, serif; font-size: 34pt; color: var(--crimson); line-height: 1; }

/* --- photo page ------------------------------------------------------ */
.photo-head { padding: 13mm 16mm 6mm; flex: 0 0 auto; }
.photo-head h2 { font-size: 20pt; line-height: 1.12; margin: 2mm 0 2mm; }
.photo-head .meta { font-size: 8.4pt; color: var(--muted); line-height: 1.45; }
/* A staggered wall, not a uniform grid. Row heights differ and each tile's
   width is proportional to that photograph's own aspect ratio, so portraits
   stay tall and landscapes stay wide and almost nothing is cropped — a fixed
   grid had to crop every frame to one shape, which hit the portraits hardest.
   `fr` rows mean the wall still fills exactly the space left on the page, and
   p_mosaic picks the row breaks so the natural heights already nearly match it,
   leaving a scale factor close to 1. object-fit: cover absorbs that remainder. */
.mosaic {
  flex: 1; min-height: 0; overflow: hidden;
  display: grid; gap: 2.4mm; margin: 0 16mm 16mm 16mm;
}
.mrow { display: flex; gap: 2.4mm; min-height: 0; }
.tile { position: relative; overflow: hidden; background: #efe9df; min-width: 0; }
.tile img { width: 100%%; height: 100%%; object-fit: cover; display: block; }
.tile .cap {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 7mm 3mm 2.4mm;
  background: linear-gradient(180deg, rgba(20,18,16,0) 0%%, rgba(20,18,16,.78) 70%%);
  color: #fff; font-size: 6.8pt; letter-spacing: .06em; line-height: 1.3;
}

/* --- back cover ------------------------------------------------------ */
.back { background: #1a1815; color: #fff; }
.back img.bg { position: absolute; inset: 0; width: 100%%; height: 100%%; object-fit: cover; opacity: .6; }
.back .scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,18,16,.55) 0%%, rgba(20,18,16,.82) 55%%, rgba(20,18,16,.96) 100%%); }
.back .inner { position: absolute; inset: 0; padding: 20mm 16mm 14mm; display: flex; flex-direction: column; }
.back h1 { font-size: 30pt; line-height: 1.1; }
.back h1 .gold { color: var(--gold); }
.contact { display: flex; flex-wrap: wrap; gap: 8mm 10mm; margin-top: 10mm; }
.contact > div { width: calc(50%% - 5mm); }
.contact .k { font-size: 6.4pt; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); }
.contact .v { font-family: Georgia, serif; font-size: 12.5pt; margin-top: 1.5mm; }
.contact .s { font-size: 7.6pt; color: rgba(255,255,255,.65); margin-top: 1mm; }
.credits { margin-top: auto; padding-top: 5mm; border-top: .5pt solid rgba(255,255,255,.22);
  font-size: 6.2pt; color: rgba(255,255,255,.58); line-height: 1.5; }
"""


# ------------------------------------------------------------- helpers ---

def page(inner: str, cls: str = "") -> str:
    return f'<section class="page {cls}">{inner}</section>'


# Page numbers are stamped after the pages are assembled. They used to be
# hand-written into every foot() call, which meant inserting a page silently
# renumbered nothing and the printed numbers drifted from reality.
PAGENO = "\u0000PAGENO\u0000"


def foot(left: str, _num=None) -> str:
    return f'<div class="foot"><span>{left}</span><span>{PAGENO}</span></div>'


# The wall is 178mm wide inside the margins and has roughly this much height
# left once the heading and the footer have taken theirs. Only the ratio of
# natural to available height matters — the `fr` rows fill whatever is actually
# there — so an estimate a few mm out just shifts the scale factor slightly.
MOSAIC_W_MM = 178.0
MOSAIC_H_MM = 232.0
MOSAIC_GAP_MM = 2.4


def _row_height(aspects: list[float]) -> float:
    """Height at which a row of these photographs fills the width uncropped."""
    return (MOSAIC_W_MM - MOSAIC_GAP_MM * (len(aspects) - 1)) / sum(aspects)


# How far the wall's natural height may miss the page before we refuse to ship
# it. Rows always span the full width, so nothing is ever cropped horizontally;
# this is the uniform vertical trim, and at 6% it is not visible. The previous
# layout cropped every frame to one fixed shape, which mangled the portraits.
MOSAIC_MAX_TRIM = 0.06
# A row may be a wide band or a tall single frame, but not a sliver; and no tile
# may get so narrow that its caption cannot sit under it. Without the width
# floor the search happily produced a 20mm-wide tile to make the arithmetic work.
MOSAIC_MIN_ROW_MM = 28.0
MOSAIC_MAX_ROW_MM = 135.0
MOSAIC_MIN_TILE_MM = 30.0


def _mosaic_rows(aspects: list[float], label: str) -> list[list[float]]:
    """Break the tiles into rows of differing height, keeping them in order.

    Each row spans the full width with every tile's width proportional to its
    own aspect ratio, so a portrait stays tall and a landscape stays wide. The
    row heights that follow from that rarely add up to the page exactly, so the
    partition is chosen to make them add up as closely as possible; what is left
    is a uniform vertical scale.

    Raises when no partition gets inside MOSAIC_MAX_TRIM. That is deliberate:
    the fix is to add or drop one photograph on that page, which changes the
    search space completely, and a build that quietly shipped a 12% crop instead
    is exactly what this layout exists to stop.
    """
    n = len(aspects)
    best, best_cost = None, float("inf")

    def walk(start: int, rows: list[list[float]]) -> None:
        nonlocal best, best_cost
        if start == n:
            if not 2 <= len(rows) <= 6:
                return
            heights = [_row_height(r) for r in rows]
            total = sum(heights) + MOSAIC_GAP_MM * (len(rows) - 1)
            scale = MOSAIC_H_MM / total
            if not all(MOSAIC_MIN_ROW_MM <= h * scale <= MOSAIC_MAX_ROW_MM for h in heights):
                return
            if min(_row_height(r) * a * scale for r in rows for a in r) < MOSAIC_MIN_TILE_MM:
                return
            # fit first, then a mild preference for rows of similar height
            cost = abs(total - MOSAIC_H_MM) * 4 + 0.5 * (max(heights) - min(heights))
            if cost < best_cost:
                best, best_cost = [list(r) for r in rows], cost
            return
        for take in range(1, 6):   # at most five tiles abreast
            if start + take > n:
                break
            rows.append(aspects[start:start + take])
            walk(start + take, rows)
            rows.pop()

    walk(0, [])
    if best is None:
        raise SystemExit(
            f'No workable photo-wall layout for "{label}" ({n} tiles). '
            "Add or drop one photograph on that page — its itinerary will have "
            "another place worth showing — rather than letting the wall crop to fit."
        )
    total = sum(_row_height(r) for r in best) + MOSAIC_GAP_MM * (len(best) - 1)
    trim = abs(1 - MOSAIC_H_MM / total)
    if trim > MOSAIC_MAX_TRIM:
        raise SystemExit(
            f'"{label}" ({n} tiles) cannot fill the page within '
            f"{MOSAIC_MAX_TRIM:.0%} — closest is {trim:.1%}. Add or drop one "
            "photograph on that page; the partitions available change entirely "
            "with the count."
        )
    return best


def _mosaic_fr(plan: list[list[float]]) -> str:
    """Row track sizes as `fr`, in proportion to each row's uncropped height."""
    return " ".join(f"{_row_height(r):.3f}fr" for r in plan)


def p_mosaic(t) -> str:
    """A full-page photo mosaic for one departure.

    Every tile is a place that tour's own itinerary visits; the caption says no
    more than the itinerary does. Tiles are sized from the image's real pixel
    shape, so a portrait never gets letterboxed into a landscape slot.
    """
    entries = D.MOSAICS[t["key"]]
    aspects = [_ASPECT[k] for k, _ in entries]
    plan = _mosaic_rows(aspects, t["name"].replace("&amp;", "&"))

    tiles, i = [], 0
    for row in plan:
        cells = []
        for _ in row:
            key, caption = entries[i]
            cells.append(
                f'<figure class="tile" style="flex: {_ASPECT[key]:.4f}">'
                f'<img src="{img(key)}" alt="">'
                f'<figcaption class="cap">{caption}</figcaption></figure>'
            )
            i += 1
        tiles.append(f'<div class="mrow">{"".join(cells)}</div>')
    return page(f'''
      <div class="photo-head">
        <div class="eyebrow">{t['collection']} &middot; in pictures</div>
        <h2>{t['name']}</h2>
        <div class="meta">{t['cities']}</div>
      </div>
      <div class="mosaic" style="grid-template-rows: {_mosaic_fr(plan)}">{''.join(tiles)}</div>
      {foot(t['name'].replace('&amp;', '&') + " &middot; in pictures")}''')


def stat(k, v, d="") -> str:
    return (f'<div class="stat"><div class="k">{k}</div><div class="v">{v}</div>'
            f'<div class="d">{d}</div></div>')


# ------------------------------------------------------------ the pages --

def p_cover(n_dep: int, from_price: str, from_stop: str) -> str:
    c = D.COMPANY
    return page(f'''
      <img class="bg" src="{img('great-wall-cloud-sea')}" alt="">
      <div class="scrim"></div>
      <div class="logo-band"><img src="{img('logo')}" alt="CTS Tours"></div>
      <div class="copy">
        <div class="eyebrow gold">China · Featured departures</div>
        <div class="rule"></div>
        <h1>Kiwi journeys to<br><span class="gold">China</span><br>2026 &rarr; 2027</h1>
        <p class="sub">{n_dep} confirmed small-group departures across late 2026 and 2027,
          plus 14 short China stopovers. Escorted from New Zealand.
          Tours priced from NZ${from_price}pp; stopovers from NZ${from_stop}pp.</p>
        <div class="base">
          <span>Est. Auckland {c['founded_nz']} &middot; CTS Group founded {c['founded_group']}</span>
          <span>{c['web']}</span>
        </div>
      </div>''', "cover")


def p_about() -> str:
    c = D.COMPANY
    quotes = "".join(
        f'<div class="quote"><p>&ldquo;{r["quote"]}&rdquo;</p>'
        f'<div class="who">{r["who"]} &middot; {r["trip"]}</div></div>'
        for r in D.REVIEWS[:2])
    return page(f'''
      <div class="hero" style="height:60mm">
        <img src="{img('group-great-wall-cts')}" alt="">
        <div class="scrim"></div>
        <div class="cap">
          <div class="eyebrow">A word from CTS Tours</div>
          <h2>The Kiwi<br>China specialist.</h2>
        </div>
      </div>
      <div class="pad" style="padding-top:8mm">
        <p class="lede">CTS Tours New Zealand was established in Auckland in {c['founded_nz']}
          by {c['founder']} &mdash; the New Zealand arm of the China Travel Service Group,
          founded in {c['founded_group']}. {c['years_nz']} years on we look after
          {c['travellers']} Kiwi travellers to China every year. We design and operate every
          China holiday package in-house, with our own ground operations in China rather than
          reselling a third party&rsquo;s tour.</p>
        <div class="stats" style="margin:8mm 0 0 0">
          {stat("Global heritage", c['founded_group'],
                "CTS parent network operating in China since " + c['founded_group'])}
          {stat("Years in Auckland", c['years_nz'],
                "Kiwi-led NZ operations since " + c['founded_nz'])}
          {stat("Travellers a year", c['travellers'], "Kiwi travellers to China")}
          {stat("Google rating", c['rating'] + "&#9733;",
                c['reviews'] + " verified reviews &middot; checked " + c['rating_checked'])}
        </div>
        <div class="cols" style="margin:9mm 0 0 0">
          <div class="col-main">
            <div class="sect">Real words from CTS travellers</div>
            {quotes}
            <p style="font-size:7.2pt;color:var(--muted)">Every review above is public on the
              CTS Tours Google Business profile and quoted word for word.</p>
          </div>
          <div class="col-side">
            <div class="sect">Group size</div>
            <ul class="tick">
              <li><b>China Discovery &mdash; max 18 travellers.</b> A genuine small group,
                  not a 30-plus coach tour.</li>
              <li><b>China Signature &mdash; max 16 travellers.</b></li>
            </ul>
            <div class="sect mt">Accredited &amp; bonded</div>
            <ul class="tick grey">
              <li>TAANZ member &mdash; client funds held in a TAANZ-bonded trust account</li>
              <li>IATA-accredited</li>
              <li>Recognised by Qualmark</li>
              <li>Member of the Tourism Export Council of New Zealand</li>
              <li>Member of Tourism Industry Aotearoa</li>
              <li>Member of the Auckland Business Chamber</li>
            </ul>
          </div>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 2)}''')


def p_baker() -> str:
    c = D.COMPANY
    return page(f'''
      <div class="pad">
        <div class="eyebrow">A personal note</div>
        <h2 class="title">Welcome &mdash; let me plan<br>your <span class="accent">China trip.</span></h2>
        <div class="cols" style="margin:8mm 0 0 0">
          <div class="col-side" style="flex:0 0 52mm">
            <img src="{img('baker')}" style="width:52mm;height:66mm;object-fit:cover" alt="">
            <div class="eyebrow mute" style="margin-top:4mm">Your China specialist</div>
            <div style="font-family:Georgia,serif;font-size:14pt;font-weight:700;margin-top:1.5mm">Baker Gu</div>
            <div style="font-size:7.8pt;color:var(--muted)">China Travel Specialist &middot; 20+ years</div>
          </div>
          <div class="col-main">
            <p style="font-size:10pt;line-height:1.65">I&rsquo;ve spent over 20 years designing
              premium China tours &mdash; from Beijing&rsquo;s Forbidden City and Shanghai&rsquo;s
              Bund to the Silk Road and the karst country around Guilin. Every tour in this
              brochure I&rsquo;ve personally helped shape.</p>
            <p style="font-size:10pt;line-height:1.65;margin-top:4mm">When you call CTS, you&rsquo;ll
              speak to a real China specialist &mdash; most likely me. No call centres, no overseas
              hand-off. Just honest advice from someone who has spent two decades designing China
              trips for Kiwi travellers.</p>
            <p style="font-size:10pt;line-height:1.65;margin-top:4mm">Eleven departures is a lot to
              choose between. Give me a call on <b>{c['phone_word']}</b> and I&rsquo;ll give you a
              no-pressure recommendation based on your dates, your pace, and what you most want
              to see.</p>
            <div class="grid2" style="margin-top:8mm">
              <div class="card"><div class="k">Call</div>
                <div style="font-family:Georgia,serif;font-size:13pt;font-weight:700;margin:1.5mm 0">{c['phone_word']}</div>
                <p>{c['phone_num']}</p></div>
              <div class="card"><div class="k">Email</div>
                <div style="font-family:Georgia,serif;font-size:11pt;font-weight:700;margin:1.5mm 0">{c['email']}</div>
                <p>Same-day reply Mon&ndash;Fri</p></div>
              <div class="card"><div class="k">Visit</div>
                <div style="font-family:Georgia,serif;font-size:11pt;font-weight:700;margin:1.5mm 0">{c['address_l1']}</div>
                <p>{c['address_l2']}</p></div>
              <div class="card"><div class="k">Online</div>
                <div style="font-family:Georgia,serif;font-size:11pt;font-weight:700;margin:1.5mm 0">{c['web']}</div>
                <p>24/7 enquiry form</p></div>
            </div>
          </div>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 3)}''')


def p_visa_window() -> str:
    return page(f'''
      <div class="hero" style="height:64mm">
        <img src="{img('forbidden-city-aerial')}" alt="">
        <div class="scrim"></div>
        <div class="cap">
          <div class="eyebrow">Why China &middot; why now</div>
          <h2>The window<br>is open.</h2>
        </div>
      </div>
      <div class="pad" style="padding-top:8mm">
        <p class="lede">New Zealand passport holders can walk straight through Chinese immigration
          &mdash; no visa, no forms, no queue at the embassy. <b>The current policy runs through
          31 December 2026.</b></p>
        <div class="grid3" style="margin-top:8mm">
          <div class="card"><div class="k">Current policy</div>
            <h3 style="margin-top:2mm">30 days<br>visa-free</h3>
            <p>For NZ passport holders, valid through 31 December 2026.</p></div>
          <div class="card"><div class="k">What&rsquo;s covered</div>
            <p style="margin-top:2mm">Tourism, business, family visits and transit.
              Unlimited entries. No application forms needed.</p></div>
          <div class="card"><div class="k">What to bring</div>
            <p style="margin-top:2mm">NZ passport with blank pages, return flight,
              and proof of accommodation &mdash; your CTS tour confirmation is enough.</p></div>
        </div>
        <div class="callout" style="margin-top:8mm">
          <h3>Travelling in 2027? Read this one line.</h3>
          <p>The visa-free arrangement published on our website is valid <b>through
            31 December 2026</b>. Every 2027 departure in this brochure sits beyond that date, and
            <b>entry requirements for 2027 travel will be whatever policy applies at the time you
            travel</b> &mdash; not what is printed here. We track this for every booked traveller and
            will tell you well before departure if a visa becomes necessary. CTS provides full visa
            assistance either way, so a policy change does not put your trip at risk.</p>
        </div>
        <div class="tail" style="padding-top:9mm">
          <div class="sect">Best time to travel</div>
          <div style="display:flex;gap:7mm;align-items:center">
            <p class="lede" style="font-size:9.8pt;flex:1">Autumn (September&ndash;October) and
              spring (April&ndash;May) both give you cool, clear days across northern China.
              November stays crisp and quiet; March is when Hangzhou&rsquo;s West Lake starts to
              bloom; late May opens up the Silk Road and the Tibetan plateau. Every departure in
              this brochure sits in one of those two windows.</p>
            <img src="{img('guilin-mist')}" style="width:62mm;height:42mm;object-fit:cover" alt="">
          </div>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 4)}''')


CITY_A = [
    ("01", "Beijing 北京", "beijing-temple",
     "An unparalleled gateway to Chinese civilisation &mdash; imperial grandeur that feels planned "
     "for you, contemporary energy that just happens. The Forbidden City is the world&rsquo;s "
     "largest imperial palace complex.",
     "Forbidden City &middot; Great Wall &middot; Temple of Heaven"),
    ("02", "Xi'an 西安", "xian-terracotta",
     "Capital of thirteen dynasties, and the eastern end of the Silk Road. The star turn is the "
     "Terracotta Army. The city walls are still walkable end to end.",
     "Terracotta Army &middot; City Wall &middot; Muslim Quarter"),
    ("03", "Shanghai 上海", "shanghai-skyline",
     "Asia&rsquo;s most cosmopolitan city &mdash; skyscrapers alongside a colonial waterfront, "
     "upscale dining next to laneway caf&eacute;s. The Bund&rsquo;s evening light show still stops "
     "people in their tracks.",
     "The Bund &middot; Yu Garden &middot; Nanjing Road"),
]

CITY_B = [
    ("04", "Hangzhou 杭州", "hangzhou-west-lake-autumn",
     "A landscape aestheticised by human hands for a thousand years. Walking the Su Causeway "
     "around West Lake before the crowds is a Chinese poem you get to stand inside.",
     "West Lake &middot; Su Causeway &middot; Longjing tea village"),
    ("05", "Chongqing 重庆", "chongqing-hongyadong",
     "A vertical mountain city that stacks streets and skyscrapers across so many levels that GPS "
     "gives up. The signature draw is a Chongqing hotpot &mdash; bolder, more molten m&aacute;l&agrave; "
     "than Chengdu next door.",
     "Hongyadong &middot; Ciqikou old town &middot; Liziba monorail"),
]


def _city_block(rows) -> str:
    return "".join(f'''
      <div class="city">
        <img src="{img(key)}" alt="">
        <div>
          <div class="n">{n}</div>
          <h3>{name}</h3>
          <p>{body}</p>
          <div class="see">See &rarr; <b>{see}</b></div>
        </div>
      </div>''' for n, name, key, body, see in rows)


def p_cities_a() -> str:
    return page(f'''
      <div class="pad">
        <div class="eyebrow">The cities</div>
        <h2 class="title">Five cities,<br>five <span class="accent">Chinas.</span></h2>
        <p class="lede">Every CTS itinerary weaves together several very different Chinas.
          Here&rsquo;s how to think about the ones you&rsquo;ll actually walk through.</p>
        <div style="margin-top:10mm">{_city_block(CITY_A)}</div>
        <div class="tail card">
          <div class="k">Continued overleaf</div>
          <p style="margin-top:2mm">Hangzhou and Chongqing &mdash; the two cities Kiwis quietly
            rave about back home &mdash; plus the landscapes the 2027 Signature journeys reach.</p>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 5)}''')


def p_cities_b() -> str:
    return page(f'''
      <div class="pad">
        <div class="eyebrow">The cities &middot; continued</div>
        <h2 class="title">Beyond the<br>big <span class="accent">three.</span></h2>
        <p class="lede">Two cities that turn a China trip into something Kiwis quietly rave about
          back home &mdash; and, new for 2027, the landscapes further out.</p>
        <div style="margin-top:8mm">{_city_block(CITY_B)}</div>
        <div class="card tail">
          <div class="k">New in the 2027 programme</div>
          <p style="margin-top:2mm">Four Signature journeys reach well past the classic five:
            <b>Guilin, Yangshuo and Zhangjiajie</b> for karst and sandstone country;
            <b>Dali and Kunming</b> in Yunnan; <b>Lhasa</b> and the Potala Palace;
            the <b>Three Gorges</b> by river cruise; and the whole Silk Road corridor west from
            Xi&rsquo;an to <b>Dunhuang, Turpan and Urumqi</b>.</p>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 6)}''')


def p_how_to_choose(disc, sig, pg) -> str:
    dmin = min(int(t["price"].replace(",", "")) for t in disc)
    smin = min(int(t["price"].replace(",", "")) for t in sig)
    return page(f'''
      <div class="pad">
        <div class="eyebrow">How this brochure works</div>
        <h2 class="title">Four ways to<br>travel with <span class="accent">CTS.</span></h2>
        <p class="lede">Eleven escorted departures, fourteen short stopovers, and a tailor-made
          desk if none of them is quite your trip. Here is the quickest way to narrow it down.</p>
        <div class="grid2" style="margin-top:9mm">
          <div class="card">
            <div class="k">Pages {pg["disc"]} &middot; {len(disc)} departures</div>
            <h3 style="margin-top:2mm">China Discovery</h3>
            <p>The classic routes, 10 to 16 days, four-star hotels, maximum 18 travellers.
              This is where most first trips to China start. From <b>NZ${dmin:,}pp</b>.</p>
          </div>
          <div class="card">
            <div class="k">Pages {pg["sig"]} &middot; {len(sig)} departures</div>
            <h3 style="margin-top:2mm">China Signature</h3>
            <p>Longer and further &mdash; 16 to 27 days, four and five-star hotels, river cruises,
              first-class rail, maximum 16 travellers. From <b>NZ${smin:,}pp</b>.</p>
          </div>
          <div class="card">
            <div class="k">Page {pg["stopover"]} &middot; 14 routes</div>
            <h3 style="margin-top:2mm">China Stopover</h3>
            <p>Two to five days in one Chinese city, built to slot into a flight you are already
              taking to Europe, Japan or Korea. From <b>NZ$875pp</b>, land package.</p>
          </div>
          <div class="card">
            <div class="k">Page {pg["tailor"]}</div>
            <h3 style="margin-top:2mm">Tailor-made</h3>
            <p>Your dates, your pace, your interests. A specialist shapes the route with you
              before anything is booked. No obligation.</p>
          </div>
        </div>
        <div class="callout tail">
          <h3>Still deciding? Start with the date, not the itinerary.</h3>
          <p>If you want to go this year, there are three departures left &mdash; Golden China in
            November and the two Christmas groups in December. If you are planning ahead, March 2027
            is spring in the north and has four departures; May 2027 is the long-journey window,
            when the Silk Road, Tibet and Yunnan open up. Turn to pages {pg["compare"]} to compare
            them side by side.</p>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 7)}''')


def p_tour(t, dep_no: int) -> str:
    hl = "".join(f"<li>{h}</li>" for h in t["highlights"])
    inc = "".join(f"<li>{x}</li>" for x in t["included"])
    exc = "".join(f"<li>{x}</li>" for x in t["excluded"])
    return page(f'''
      <div class="hero">
        <img src="{img(t['image'])}" alt="">
        <div class="scrim"></div>
        <div class="flag">{t['flag']}</div>
        <div class="cap">
          <div class="eyebrow">Departure {dep_no:02d} &middot; {t['collection']}</div>
          <h2>{t['name']}</h2>
          <div class="meta">{t['days']} days &middot; Departs <b>{t['depart']}</b>
            &middot; Returns <b>{t['returns']}</b><br>{t['cities']}</div>
        </div>
      </div>
      <div class="stats">
        {stat("From", f"NZ${t['price']}", "per person, twin share")}
        {stat("Group size", t['group'], "escorted from New Zealand")}
        {stat("Meals", t['meals'], t['meals_detail'])}
        {stat("Hotels", t['hotels'], t['hotels_detail'])}
      </div>
      <div class="cols">
        <div class="col-main">
          <div class="sect">{t['list_title']}</div>
          <ol class="hl">{hl}</ol>
        </div>
        <div class="col-side">
          <div class="sect">Fully included</div>
          <ul class="tick">{inc}</ul>
          <div class="sect mt">Not included</div>
          <ul class="tick grey">{exc}</ul>
        </div>
      </div>
      <div class="note">
        <div class="t">{t['footnote']}</div>
        <div class="pill">ctstours.co.nz{t['url']}</div>
      </div>
      {foot(f"Departure {dep_no:02d} &middot; {t['name'].replace('&amp;', '&')}")}''')


def _cmp_table(tours, rows) -> str:
    head = "".join(
        f'<th>{t["name"]}<small>{t["days"]} days &middot; {t["short"]}</small></th>'
        for t in tours)
    body = ""
    for label, fn, cls in rows:
        cells = "".join(f'<td class="{cls}">{fn(t)}</td>' for t in tours)
        body += f"<tr><th>{label}</th>{cells}</tr>"
    return f'<table class="cmp"><thead><tr><th></th>{head}</tr></thead><tbody>{body}</tbody></table>'


CMP_ROWS = [
    ("Departs", lambda t: t["depart"], ""),
    ("Returns", lambda t: t["returns"], ""),
    ("Duration", lambda t: f'{t["days"]} days', ""),
    ("Cities", lambda t: t["cities"], ""),
    ("Meals", lambda t: f'{t["meals"]}<br><span style="color:#8A8177">{t["meals_detail"]}</span>', ""),
    ("Hotels", lambda t: f'{t["hotels"]} &middot; {t["hotels_detail"]}', ""),
    ("Group size", lambda t: t["group"], ""),
    ("From price", lambda t: f'NZ${t["price"]}pp', "price"),
    ("Single supp.", lambda t: f'NZ${t["single"]}', ""),
]


def p_compare_discovery(disc) -> str:
    return page(f'''
      <div class="pad">
        <div class="eyebrow">The choice &middot; China Discovery</div>
        <h2 class="title">Six departures,<br>side by <span class="accent">side.</span></h2>
        <p class="lede">One decision helps most: are you going for late 2026, or the spring window
          in March 2027? Compare in one glance.</p>
        <div style="margin-top:8mm">{_cmp_table(disc, CMP_ROWS)}</div>
        <div class="tail">
          <p style="font-size:8.4pt;color:var(--muted)">Best of China runs twice in 2027 &mdash;
            11 March and 13 May &mdash; at the same price, so the March column covers both.
            All prices are per person, twin share, in New Zealand dollars, and were checked
            against ctstours.co.nz on 22 September 2026.</p>
          <div style="display:flex;gap:4mm;margin-top:7mm">
            <img src="{img('group-walking-lane')}" style="width:33.33%;height:31mm;object-fit:cover" alt="">
            <img src="{img('group-ancient-gate')}" style="width:33.33%;height:31mm;object-fit:cover" alt="">
            <img src="{img('group-market')}" style="width:33.33%;height:31mm;object-fit:cover" alt="">
          </div>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 18)}''')


def p_compare_signature(sig) -> str:
    return page(f'''
      <div class="pad">
        <div class="eyebrow">The choice &middot; China Signature</div>
        <h2 class="title">Longer journeys,<br>side by <span class="accent">side.</span></h2>
        <p class="lede">Four China Signature departures in 2027, all capped at 16 travellers, all with
          first-class rail between regions.</p>
        <div style="margin-top:8mm">{_cmp_table(sig, CMP_ROWS)}</div>
        <div class="callout tail">
          <h3>Not sure which one?</h3>
          <p>Reply to any CTS email or call the Auckland office, and Baker or the team will walk
            you through it. We&rsquo;ll ask about timing, group preferences, and any dietary or
            mobility considerations &mdash; then match you to the right departure.
            <b>{D.COMPANY['phone_word']} &middot; {D.COMPANY['email']}</b></p>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 19)}''')


def p_stopover() -> str:
    rows = "".join(
        f'<tr><td class="d">{d} days</td><td>{name}</td><td class="p">NZ${p}</td></tr>'
        for name, d, p in D.STOPOVERS)
    return page(f'''
      <div class="hero" style="height:56mm">
        <img src="{img('shanghai-yuyuan-night')}" alt="">
        <div class="scrim"></div>
        <div class="flag">14 routes &middot; from NZ$875pp</div>
        <div class="cap">
          <div class="eyebrow">China Stopover</div>
          <h2>Turn the transit<br>into the trip.</h2>
        </div>
      </div>
      <div class="pad" style="padding-top:7mm">
        <p class="lede">Flying to Europe, Japan or Korea? Break the journey for two to five days in
          one Chinese city &mdash; hotel, guide, transfers and admissions arranged, so you step off
          the plane and straight into it.</p>
        <div class="cols" style="margin:7mm 0 0 0">
          <div class="col-main">{rows and f'<table class="so">{rows}</table>'}</div>
          <div class="col-side">
            <div class="sect">Typically included</div>
            <ul class="tick">
              <li>4-star hotel accommodation, twin share</li>
              <li>Meals as specified in the itinerary</li>
              <li>English-speaking guide</li>
              <li>Land transfers</li>
              <li>Admission to scheduled attractions</li>
            </ul>
            <div class="callout" style="margin-top:6mm;padding:5mm">
              <h3 style="font-size:11.5pt">Are flights included?</h3>
              <p>&ldquo;{D.STOPOVER_DISCLAIMER}&rdquo;</p>
              <p style="margin-top:3mm;font-size:8pt"><b>In plain terms:</b> most stopover routes are
                a land package and the international airfare is arranged separately. Check the
                Included and Not Included list on the route you want, or ask us and we&rsquo;ll
                price the flights with it.</p>
            </div>
          </div>
        </div>
      </div>
      {foot("China Stopover &middot; 14 routes", 20)}''')


def p_tailor() -> str:
    T = D.TAILOR
    steps = "".join(
        f'<div class="step"><div class="num">{i}</div><div><h3>{h}</h3><p>{b}</p></div></div>'
        for i, (h, b) in enumerate(T["steps"], 1))
    return page(f'''
      <div class="hero" style="height:68mm">
        <img src="{img('guilin-mist')}" alt="">
        <div class="scrim"></div>
        <div class="cap">
          <div class="eyebrow">Tailor-made China</div>
          <h2>{T['headline']}</h2>
          <div class="meta">{T['sub']}</div>
        </div>
      </div>
      <div class="pad" style="padding-top:8mm">
        <p class="lede">{T['tagline']} If none of the eleven departures in this brochure is quite
          your trip &mdash; different dates, a slower pace, a family group, a city we haven&rsquo;t
          listed &mdash; we build it from scratch with you.</p>
        <div class="cols" style="margin:9mm 0 0 0">
          <div class="col-main">
            <div class="sect">How it works</div>
            {steps}
          </div>
          <div class="col-side">
            <div class="callout">
              <h3>{T['promise']}</h3>
              <p>Start planning at <b>ctstours.co.nz/tailor-made</b> or call
                <b>{D.COMPANY['phone_word']}</b>. You talk to a China specialist, not a form.</p>
            </div>
            <div class="card" style="margin-top:7mm">
              <div class="k">Recent tailor-made trips</div>
              <p style="margin-top:2mm">Family groups, 25-day private itineraries, Yunnan and
                Zhangjiajie combinations, and shorter trips built around a business visit.
                Ask us what is possible on your dates.</p>
            </div>
          </div>
        </div>
      </div>
      {foot("Tailor-made China", 21)}''')


def p_shopping() -> str:
    return page(f'''
      <div class="hero" style="height:68mm">
        <img src="{img('group-shopping')}" alt="">
        <div class="scrim"></div>
        <div class="flag">No compulsory shopping stops</div>
        <div class="cap">
          <div class="eyebrow">Shopping</div>
          <h2>Your shopping<br>time is yours.</h2>
        </div>
      </div>
      <div class="pad" style="padding-top:8mm">
        <p class="lede"><b>No compulsory shopping stops &mdash; your shopping time is yours.</b>
          If you have travelled to China on a cheap group tour before, you will know the pattern:
          three hours you did not ask for in a jade showroom. That is not how CTS builds an
          itinerary.</p>
        <div class="cols" style="margin:8mm 0 0 0">
          <div class="col-main">
            <div class="sect">Where our itineraries actually put you</div>
            <ul class="tick">
              <li><b>Shanghai</b> &mdash; Nanjing Road and the Yu Garden bazaar sit in the
                itinerary on Golden China and Best of China, and the following day on Golden China
                is Shanghai at your own pace.</li>
              <li><b>Xi&rsquo;an</b> &mdash; Huimin Street in the Muslim Quarter,
                lined with street food stalls and artisan shops, on both Christmas
                departures, Best of China and A Tale of Two Cities.</li>
              <li><b>Beijing</b> &mdash; the Silk Market, after the hutong pedi-cab tour on
                Best of China and A Tale of Two Cities.</li>
              <li><b>Chongqing</b> &mdash; Ciqikou old town, on both Christmas departures.</li>
              <li><b>Guangzhou</b> &mdash; free shopping time before the transfer to the airport
                on the Auckland Christmas departure.</li>
            </ul>
            <p style="margin-top:5mm;font-size:8.6pt;color:var(--muted)">Where an itinerary does
              include a silk, jade or pearl workshop &mdash; and several do &mdash; it is named in
              the day-by-day schedule on ctstours.co.nz, so you can read it before you book rather
              than discover it on the coach.</p>
          </div>
          <div class="col-side">
            <img src="{img('xian-muslim-quarter')}" style="width:100%;height:62mm;object-fit:cover" alt="">
            <img src="{img('ciqikou')}" style="width:100%;height:62mm;object-fit:cover;margin-top:5mm" alt="">
          </div>
        </div>
      </div>
      {foot("Shopping &middot; CTS Tours", 22)}''')


TIPS = [
    ("Mobile payment is the default.",
     "Download Alipay or WeChat Pay before you fly &mdash; both now support international "
     "NZ-issued cards. In the big cities almost every transaction is a QR code. Rural areas and "
     "smaller shops still prefer cash, so carry some RMB too."),
    ("Google won&rsquo;t work. Baidu will.",
     "Google Maps is unreliable inside China. Use Baidu Maps or Gaode Maps for navigation. For "
     "menu translation, download Pleco &mdash; it works fully offline and reads menus through "
     "the camera."),
    ("Set up a VPN before you leave.",
     "Instagram, Facebook, WhatsApp, YouTube and Gmail all face restrictions. Install and test a "
     "VPN on your phone before you leave New Zealand &mdash; or embrace the digital break."),
    ("Basic Mandarin goes a long way.",
     "N&#464; h&#462;o (hello), xi&egrave;xie (thank you) and du&#333;sh&#462;o qi&aacute;n "
     "(how much) is 90% of the effort. Locals genuinely appreciate the try, and it turns "
     "transactions into small conversations."),
    ("Tell your bank you&rsquo;re going.",
     "New Zealand card fraud systems can block a first Chinese ATM withdrawal automatically. "
     "A quick call to your bank ahead of time avoids getting locked out on day one."),
]


def p_tips() -> str:
    items = "".join(f'''
      <div style="display:flex;gap:6mm;margin-bottom:9mm">
        <div style="font-family:Georgia,serif;font-size:17pt;color:var(--gold);font-weight:700;
             width:11mm;flex:0 0 auto">{i:02d}</div>
        <div><h3 style="font-size:12.5pt;margin-bottom:1.8mm">{h}</h3>
             <p style="font-size:9.6pt;color:var(--muted);line-height:1.58">{b}</p></div>
      </div>''' for i, (h, b) in enumerate(TIPS, 1))
    return page(f'''
      <div class="pad">
        <div class="eyebrow">Before you go &middot; first time to China</div>
        <h2 class="title">Five things<br>Kiwis get <span class="accent">wrong.</span></h2>
        <p class="lede">China moves fast, especially in the cities. A few things to sort before
          you fly.</p>
        <div style="margin-top:9mm">{items}</div>
        <div class="card tail">
          <div class="k">One thing you do not need to sort</div>
          <p style="margin-top:2mm">Your CTS guide handles tickets, queues, transfers and the
            language at every stop on the itinerary. These five are simply the things that sit
            outside a guide&rsquo;s reach &mdash; your phone, your bank and your own free
            afternoons.</p>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 23)}''')


def p_booking() -> str:
    c = D.COMPANY
    return page(f'''
      <div class="hero" style="height:52mm">
        <img src="{img('group-bullet-train')}" alt="">
        <div class="scrim"></div>
        <div class="cap">
          <div class="eyebrow">Visa &amp; booking</div>
          <h2>Straight through<br>the gate.</h2>
        </div>
      </div>
      <div class="pad" style="padding-top:8mm">
        <div style="display:flex;gap:8mm;align-items:flex-start">
          <div class="big-num">30</div>
          <div>
            <div style="font-family:Georgia,serif;font-size:12.5pt;font-weight:700">
              Days visa-free for NZ passport holders</div>
            <p style="font-size:8.8pt;color:var(--muted);margin-top:1.5mm">Valid through
              31 December 2026. Tourism, business, family, transit. Unlimited entries. No
              application forms. <b style="color:var(--crimson)">For 2027 departures, entry
              requirements will be whatever policy applies at the time you travel &mdash; we
              confirm this with you before departure and assist with a visa if one is needed.</b></p>
          </div>
        </div>
        <div class="cols" style="margin:9mm 0 0 0">
          <div class="col-main">
            <div class="sect">What to bring at immigration</div>
            <ul class="tick">
              <li>NZ passport with blank pages for stamps</li>
              <li>Return flight dated within the permitted stay</li>
              <li>Proof of accommodation &mdash; your CTS tour confirmation is enough</li>
              <li>Sufficient funds (credit cards plus some cash)</li>
            </ul>
            <div class="sect mt">When you still need a visa</div>
            <ul class="tick grey">
              <li>Working in China &rarr; Z-Visa</li>
              <li>Study or internship &rarr; X-Visa</li>
              <li>Staying longer than the visa-free allowance &rarr; L-Visa</li>
              <li>Long-term residence &rarr; consult the Embassy</li>
            </ul>
          </div>
          <div class="col-side">
            <div class="card">
              <div class="k">How to book</div>
              <h3 style="margin-top:2mm">Deposit NZ$500pp to hold</h3>
              <p>Reply to any CTS email and Baker or the team will confirm availability, walk you
                through the small print, and hold your room. Amendments to dates or travellers are
                free up to 60 days before departure.</p>
            </div>
            <div class="card" style="margin-top:5mm">
              <div class="k">Your money is protected</div>
              <p style="margin-top:2mm">CTS Tours is a TAANZ member and all client funds sit in a
                <b>TAANZ-bonded trust account</b>. Card payments are processed through PCI-DSS
                compliant gateways.</p>
            </div>
            <div class="card" style="margin-top:5mm">
              <div class="k">Talk it through</div>
              <div style="font-family:Georgia,serif;font-size:12pt;font-weight:700;margin-top:2mm">
                {c['phone_word']}</div>
              <p>{c['email']}</p>
            </div>
          </div>
        </div>
      </div>
      {foot("CTS Tours &middot; China 2026-27", 24)}''')


def p_back() -> str:
    c = D.COMPANY
    credits = [IMAGES[k][1] for k in sorted(_used) if IMAGES[k][1]]
    cred_txt = " &nbsp;·&nbsp; ".join(f"{what} — {who}, {lic}" for what, who, lic in credits)
    return page(f'''
      <img class="bg" src="{img('shanghai-night-blue')}" alt="">
      <div class="scrim"></div>
      <div class="inner">
        <div class="eyebrow gold">CTS Tours &middot; Auckland</div>
        <h1 style="margin-top:5mm">Kiwi journeys<br>to China,<br><span class="gold">done properly.</span></h1>
        <div class="contact">
          <div><div class="k">Phone</div><div class="v">{c['phone_word']}</div>
               <div class="s">{c['phone_num']} &middot; Mon&ndash;Fri</div></div>
          <div><div class="k">Email</div><div class="v">{c['email']}</div>
               <div class="s">Same-day reply</div></div>
          <div><div class="k">Web</div><div class="v">{c['web']}</div>
               <div class="s">24/7 enquiry form</div></div>
          <div><div class="k">Visit</div><div class="v">{c['address_l1']}</div>
               <div class="s">{c['address_l2']}</div></div>
        </div>
        <div class="credits">
          <div style="letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);
               margin-bottom:2mm">Established Auckland {c['founded_nz']} &middot; CTS Group founded
               {c['founded_group']} &middot; TAANZ-bonded trust account</div>
          Prices, dates and inclusions in this brochure were checked against ctstours.co.nz on
          22 September 2026 and are per person in New Zealand dollars, twin share, subject to
          availability. Google rating {c['rating']}&#9733; from {c['reviews']} verified reviews,
          checked {c['rating_checked']}.<br>
          Photography: {cred_txt}. Remaining images &copy; CTS Tours.
        </div>
      </div>''', "back")


# ---------------------------------------------------------------- main ---

def build_html() -> str:
    disc = [t for t in D.TOURS if t["collection"] == "China Discovery"]
    sig = [t for t in D.TOURS if t["collection"] == "China Signature"]
    assert disc and sig, "product-line names in data.py no longer match"

    # 11 departures: Best of China runs twice (11 Mar and 13 May 2027).
    n_dep = len(D.TOURS) + 1
    from_price = min(D.TOURS, key=lambda t: int(t["price"].replace(",", "")))["price"]
    from_stop = min(D.STOPOVERS, key=lambda s: int(s[2].replace(",", "")))[2]

    # Cross-references are computed, not typed: the photo pages shift every
    # number after page 7, and a wrong "turn to page" is the kind of thing
    # nobody notices until a customer does.
    def _span(tours):
        return sum(1 + (1 if t["key"] in D.MOSAICS else 0) for t in tours)

    disc_from = 8
    disc_to = disc_from + _span(disc) - 1
    sig_from = disc_to + 1
    sig_to = sig_from + _span(sig) - 1
    cmp_from = sig_to + 1
    pg = {
        "disc": f"{disc_from}&ndash;{disc_to}",
        "sig": f"{sig_from}&ndash;{sig_to}",
        "compare": f"{cmp_from}&ndash;{cmp_from + 1}",
        "stopover": cmp_from + 2,
        "tailor": cmp_from + 3,
    }

    pages = [
        p_cover(n_dep, from_price, from_stop),
        p_about(),
        p_baker(),
        p_visa_window(),
        p_cities_a(),
        p_cities_b(),
        p_how_to_choose(disc, sig, pg),
    ]
    # Each departure is followed by its own photo page, except Silk Road —
    # see MOSAIC_MISSING in data.py for why it does not have one.
    for i, t in enumerate(D.TOURS):
        pages.append(p_tour(t, i + 1))
        if t["key"] in D.MOSAICS:
            pages.append(p_mosaic(t))
    pages += [
        p_compare_discovery(disc),
        p_compare_signature(sig),
        p_stopover(),
        p_tailor(),
        p_shopping(),
        p_tips(),
        p_booking(),
        p_back(),          # must stay last — it prints the credits for images used
    ]
    css = CSS % D.BRAND
    body = "".join(pages)

    # Stamp the page numbers last, in document order, so inserting or removing a
    # page can never leave a stale number behind.
    # The cover carries no footer, so the first stamped page is page 2 — count
    # document position, not the number of footers, or every number is one low.
    n = 1

    def _stamp(_m):
        nonlocal n
        n += 1
        return f"{n:02d}"

    body, stamped = re.subn(re.escape(PAGENO), _stamp, body)
    assert stamped == body.count('<section class="page') - 2, (
        f"stamped {stamped} page numbers across "
        f"{body.count(chr(60) + 'section class=' + chr(34) + 'page')} pages "
        "— the cover and back cover carry no number, every other page must"
    )
    return ("<!doctype html><html lang=\"en-NZ\"><head><meta charset=\"utf-8\">"
            "<title>CTS Tours · Kiwi journeys to China 2026–2027</title>"
            f"<style>{css}</style></head><body>{body}</body></html>")


def find_chrome() -> str:
    for c in CHROME_CANDIDATES:
        if c and Path(c).exists():
            return c
    raise SystemExit("Google Chrome not found — set CHROME_PATH.")


def main() -> None:
    global _DATA_URIS
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(HERE / "CTS-Tours-2026-2027-Brochure-v4.pdf"))
    ap.add_argument("--html-only", action="store_true")
    args = ap.parse_args()

    _DATA_URIS = _prepare()
    html = build_html()

    work = Path(tempfile.mkdtemp(prefix="cts-brochure-"))
    # The HTML is 6+ MB of inlined images — it stays in the scratch dir so a
    # build never leaves a stray artifact in the working tree.
    html_path = work / "brochure.html"
    html_path.write_text(html, encoding="utf-8")

    n_pages = html.count('<section class="page')
    print(f"{n_pages} pages · HTML {len(html)/1024/1024:.1f} MB → {html_path}")
    if args.html_only:
        return

    out = Path(args.out).resolve()
    subprocess.run([
        find_chrome(), "--headless", "--disable-gpu", "--no-pdf-header-footer",
        f"--print-to-pdf={out}", "--virtual-time-budget=40000",
        f"file://{html_path}",
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"{out}  ({out.stat().st_size/1024/1024:.1f} MB)")


if __name__ == "__main__":
    main()
