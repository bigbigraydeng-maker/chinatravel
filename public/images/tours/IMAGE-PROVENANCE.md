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
| `yunnan-rice-terraces.jpg` | "Farmer in rice terrace from Mu Cang Chai **Vietnam** come back to home" | **Still mislabelled.** Currently the hero of the Yunnan travel guide, alt-texted "Yunnan rice terraces". Needs a genuine Yunnan frame — not fixed here. |
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
