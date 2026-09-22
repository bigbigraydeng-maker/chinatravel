# Tour image provenance

Filenames in this folder are **not** evidence of what a photo shows. Several were named
after the tour they were bought for, not after the place in the frame, and at least three
reached live pages with a caption that contradicted the picture.

Before using any file here in a caption, alt text, ad, or brochure, read the photographer's
own description embedded in the file:

```bash
sips -g description -g artist -g copyright public/images/tours/<file>.jpg
```

If that comes back empty, open the image and look at it. Do not caption from the filename.

## Known subjects (from embedded EXIF/IPTC, 2026-09-22 audit)

| File | Photographer's own description | Note |
|---|---|---|
| `dujiangyan-irrigation-system.jpg` | "DuJianYan, an irrigation system built in Sichuan province, China, in 256 BC." | Was named `guilin-river-valley.jpg`. No karst anywhere in the frame. Renamed 2026-09-22. |
| `yunnan-terraced-fields-pavilion.jpg` | "terraced fields at yunnan china" | Was named `guilin-mist.jpg` and alt-texted "Li River near Guilin" on two live pages. Renamed 2026-09-22. |
| `mu-cang-chai-vietnam-terraces.jpg` | "Farmer in rice terrace from Mu Cang Chai **Vietnam** come back to home" | Was named `yunnan-rice-terraces.jpg` and was the hero of the Yunnan travel guide, alt-texted "Yunnan rice terraces", plus four Yunnan sub-guide galleries, the travel-tools hero/OG card, a blog hero and the Colorful Yunnan tour gallery. Renamed 2026-09-22; no longer referenced by any page. It is a genuine Mu Cang Chai frame, so it is usable on Vietnam product — never on China. |
| `yuanyang-rice-terraces.jpg` | "Flooded Hani rice terraces at sunset, Yuanyang, Honghe Hani and Yi Autonomous Prefecture, Yunnan, China. Unsplash photo id v09ak64o7bs." | Added 2026-09-22 as the genuine replacement. Description above was written into the file by us, not by the photographer — see **Yuanyang frame provenance** below for the evidence it rests on. |
| `yunnan-village.jpg` | *(none — no embedded description, artist or copyright)* | **Name unverified and probably wrong.** The frame is a Jiangnan-style canal town at dusk — tiled roofs, a multi-tier riverside tower, a thatched stilt hut over still water — not a Naxi, Bai or Tibetan village. No page references it; only the two `optimized/` manifests do. Do not use it as a Yunnan stand-in without re-identifying it first. |
| `china-pagoda-night.jpg` | "Jiaxiu Tower, a landmark building in Guiyang City, Guizhou Province" | Name is generic, no false claim, but it is Guizhou — not a stand-in for Chongqing or Chengdu. |
| `shanghai-yuyuan-night.jpg` | "March 2004" | Subject unverified from metadata. |

## Verified Guilin frames

Use one of these when a page needs Guilin — all three are unmistakable Li River karst:

- `li-river-karst-boats.jpg` — bamboo rafts on the Li River
- `yangshuo-karst-aerial.jpg` — aerial over the Li River at Yangshuo
- `Li-River-1.jpeg` — cruise boats between karst peaks

A licensed iStock alternative (Standard Licence, id 1200092739, "View of the Karst mountains
in Guilin region of South China, close to Xingping village, Li River") is on file in
`Dropbox/MagicLab_Studio/CTS/website/` — see `CREDITS.md` there.

## Verified Yunnan frames

Use one of these when a page needs Yunnan:

- `yuanyang-rice-terraces.jpg` — flooded Hani terraces at sunset, Yuanyang (the UNESCO terraces)
- `yunnan-terraced-fields-pavilion.jpg` — cliff pavilion above terraces in cloud; photographer's own
  description says Yunnan, but the terraces are a minor part of the frame
- `shangri-la-monastery.jpg` — Songzanlin Monastery, Shangri-La; description names Yunnan explicitly
- `shangri-la-monastery-lake.jpg` — same monastery across the water

`yunnan-village.jpg` is **not** on this list; see the table above.

### Yuanyang frame provenance

`yuanyang-rice-terraces.jpg` is Unsplash photo `v09ak64o7bs` by Sandra Mosconi
(https://unsplash.com/photos/v09ak64o7bs), Unsplash License — free for commercial use, no
attribution required. Downloaded original 3841×2160; stored here resized to 2560×1440, q88,
with the description/artist/copyright above written into its EXIF so the `sips` command at the
top of this file returns the truth for it too.

Unsplash strips camera EXIF on download, so there is no GPS to check. The identification rests on:

1. the location the photographer set on the photo page — "Yuanyang, Honghe Hani and Yi
   Autonomous Prefecture, Yunnan, China";
2. the frame itself — flooded mirror terraces with iron-red water and a Hani stone hut, which is
   the Yuanyang dry-season signature and does not occur in the Vietnamese or Philippine terraces
   this kind of photo is usually confused with;
3. camera reported on the page (Nikon D3100) and the photographer's wider portfolio, which is an
   individual's travel work rather than a stock library.

That is photographer-declared provenance, not proof. It is the same class of evidence as the
embedded IPTC descriptions this file relies on elsewhere.

The licensed alternatives on file in `Dropbox/MagicLab_Studio/CTS/website/` (see `CREDITS.md`
there) do **not** include a Yuanyang or any other Yunnan terrace frame — the one Yunnan image
there, iStock 2236564894, is Songzanlin Monastery. Nothing was bought for this fix.
