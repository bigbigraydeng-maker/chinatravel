# -*- coding: utf-8 -*-
"""
CTS Tours 2026-27 China brochure — content.

EVERY factual claim here carries a source tag, checked on 2026-09-22 against
www.ctstours.co.nz. Tags:
  W  = verifiable on the live website (url given)
  W* = arithmetic on two website numbers (departure date + duration, or price
       difference) — no new fact introduced
  PM = product owner confirmed (Ray Deng, 2026-09-22)
  DFS= DataForSEO live query, 2026-09-22

Nothing goes in this file from memory or from the previous brochure PDF.
"""

SITE = "https://www.ctstours.co.nz"

BRAND = {
    "crimson": "#B61E2E",
    "gold": "#D6A756",
    "ink": "#23201C",
    "muted": "#5A554F",
    "surface": "#FBF7F0",
    "line": "#E6DFD4",
}

# --- Company facts -------------------------------------------------------
# W /about: "a group founded in 1928", "established in Auckland in 2000",
#           "Founded in NZ in 2000 by Lisa Li, MNZM", "1,200+ Kiwi travellers
#           per year", "Max 16 (Signature)", "TAANZ-bonded, IATA-accredited",
#           "Own ground operations in China (not subcontracted)"
# DFS Google Business cid 15893702765970614450 → 4.4 / 12 reviews
COMPANY = {
    "founded_group": "1928",
    "founded_nz": "2000",
    "years_nz": "25",
    "founder": "Lisa Li, MNZM",
    "travellers": "1,200+",
    "rating": "4.4",
    "reviews": "12",
    "rating_checked": "22 September 2026",
    "phone_word": "0800 CTS 888",
    "phone_num": "0800 287 888",
    "email": "info@ctstours.co.nz",
    "address_l1": "2F CTS House",
    "address_l2": "175 Queen Street, Auckland CBD",
    "web": "ctstours.co.nz",
}

# W homepage — "Every review below is public on our Google Business profile,
# quoted word for word." Copied verbatim from that section; cross-checked against
# chinatravel repo src/lib/data/home-testimonials.ts, which is the canonical copy.
# That file's rule applies here too: the tour label is the customer's OWN wording
# ("tale of two cities", "Tale of 2 Cities") and must not be tidied up.
REVIEWS = [
    {
        "quote": "The china journey was well-organized, I actually enjoyed all the "
                 "moments without worrying about anything. Highly recommend the tour "
                 "of tale of two cities china",
        "who": "Maryam Absh",
        "trip": "tale of two cities · July 2026",
    },
    {
        "quote": "Just came back from a tour of Xinjiang and a stopover in Xian. We "
                 "had a fantastic time, the culture and scenery in Xinjiang is "
                 "stunning and the tour was led by an experienced guide with "
                 "excellent English. Highly recommended.",
        "who": "Murray Middendorf",
        "trip": "Xinjiang · June 2026",
    },
    {
        "quote": "We were kept really busy with informative guides and just so much "
                 "to see. Amazed all dietry requirements of group met. A group tour "
                 "that exceeded all expectation.",
        "who": "Colin Wright",
        "trip": "Tale of 2 Cities · June 2026",
    },
]

# --- Tours ---------------------------------------------------------------
# Each tour's every field is quoted or arithmetically derived from its own
# page on ctstours.co.nz, fetched 2026-09-22.
#
# `collection` must be one of the three product-line names the site actually
# uses — China Discovery / China Signature / China Stopover (src/lib/data/tours.ts,
# where tour names read "China Signature — Silk Road"). Do not reintroduce
# "…Collection"; that was a brochure invention and matched nothing on the site.

TOURS = [
    {
        "key": "golden-china",
        "short": "Nov 2026",
        "collection": "China Discovery",
        "name": "Golden China",
        "flag": "LAST-MINUTE · NOV 2026 · FILLING FAST",
        "days": 12,
        "depart": "Auckland 16 Nov 2026",
        "returns": "27 Nov 2026",  # W* 16 Nov + 12 days
        "cities": "Beijing · Xi'an · Shanghai",
        "price": "4,999",
        "single": "690",
        "group": "Max 18",
        "meals": "26 included",
        "meals_detail": "9 B · 7 L · 10 D",
        "hotels": "4★",
        "hotels_detail": "9 nights across 3 properties",
        "image": "i:great-wall",
        "list_title": "DAY BY DAY",
        "highlights": [
            "Depart Auckland MU780 22:00",
            "Arrive Shanghai · connect Beijing · Temple of Heaven · Qianmen Street · Beijing Duck dinner",
            "Tiananmen Square · Forbidden City · Beihai Park",
            "Great Wall at Juyongguan · Olympic Park",
            "Hutong pedi-cab tour with family visit · Summer Palace",
            "Free morning · train G655 to Xi'an (08:26–14:20)",
            "Terracotta Warriors · Bronze Chariot · dumpling dinner with Tang Dynasty performances",
            "Old City Wall · Big Wild Goose Pagoda · fly to Shanghai",
            "Zhujiajiao water town · Huangpu River evening cruise",
            "Yu Garden · Shanghai Museum · The Bund · Nanjing Road",
            "Free time · Xintiandi · Tianzifang · depart 00:10",
            "Arrive Auckland 16:25",
        ],
        "included": [
            "International &amp; domestic flights",
            "4-star accommodation (9 nights)",
            "Meals per itinerary",
            "English-speaking guide",
            "Land transportation and admission fees",
            "2nd-class high-speed train Beijing → Xi'an",
        ],
        "excluded": [
            "Travel insurance",
            "Personal expenses",
            "Meals not listed · transport during free time",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$690 · solo total NZ$5,689",
        "url": "/tours/china/discovery/golden-china",
    },
    {
        "key": "christmas-akl",
        "short": "Dec 2026",
        "collection": "China Discovery",
        "name": "Christmas &amp; New Year in China",
        "flag": "PEAK SEASON · BOOKS OUT EARLY",
        "days": 16,
        "depart": "Auckland 22 Dec 2026",
        "returns": "6 Jan 2027",  # W* 22 Dec + 16 days
        "cities": "Shanghai · Beijing · Xi'an · Chongqing · Guangzhou",
        "price": "7,188",
        "single": "968",
        "group": "Max 18",
        "meals": "33 included",
        "meals_detail": "12 B · 9 L · 12 D",
        "hotels": "4★",
        "hotels_detail": "13 nights across 5 properties",
        "image": "i:shanghai-christmas",
        "list_title": "HIGHLIGHTS ACROSS 16 DAYS",
        "highlights": [
            "Christmas Eve in Shanghai — the Xintiandi Shikumen Christmas lighting ceremony",
            "Bund Source German Christmas Market — European wooden stalls, mulled wine, gingerbread, double-decker carousel",
            "Christmas morning in Zhujiajiao, an ancient water town on Shanghai's outskirts",
            "<b>Morning tour to the Great Wall at the Mutianyu section</b>",
            "Forbidden City · Tian'anmen Square · Summer Palace",
            "Beijing hutong pedi-cab tour and Beijing Duck welcome banquet",
            "New Year's Eve at Xi'an's Tang Dynasty Ever-Bright City — performances, float parades and festive crowds",
            "Terracotta Warriors with Circle Vision Movie and Bronze Chariot · Xi'an City Wall",
            "Chongqing — Ciqikou · Liziba · Kuixing Tower · Jiefangbei · Eye in the Clouds",
            "Cantonese Yum Cha finale in Guangzhou",
        ],
        "included": [
            "International and domestic airfares",
            "4-star accommodation (13 nights)",
            "Specified meals",
            "Private airport transfers and sightseeing transport",
            "English-speaking local guides",
            "Entrance fees · 2nd-class train tickets · NYE event",
        ],
        "excluded": [
            "China visa (if applicable)",
            "Travel insurance",
            "Personal expenses",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$968 · reserve well ahead — this departure fills earliest",
        "url": "/tours/china/discovery/china-icons-collection",
    },
    {
        "key": "christmas-chc",
        "short": "Dec 2026",
        "collection": "China Discovery",
        "name": "Christmas &amp; New Year — Christchurch",
        "flag": "SOUTH ISLAND DEPARTURE · NZ$1,000 LESS",
        "days": 15,
        "depart": "Christchurch 22 Dec 2026",
        "returns": "5 Jan 2027",  # W* 22 Dec + 15 days
        "cities": "Christchurch · Guangzhou · Shanghai · Beijing · Xi'an · Chongqing",
        "price": "6,188",
        "single": "968",
        "group": "Max 18",
        "meals": "33 included",
        "meals_detail": "12 B · 9 L · 12 D",
        "hotels": "4★",
        "hotels_detail": "12 nights across 4 properties",
        "image": "tang-everbright-city",
        "list_title": "WHY THE CHRISTCHURCH VERSION",
        "highlights": [
            "<b>A direct South Island departure — fly ex-Christchurch via Guangzhou, no Auckland transfer required.</b>",
            "CZ618 Christchurch–Guangzhou, 22:30/05:20+1. This direct service resumed post-pandemic, operated by China Southern Airlines — celebrating its 70th anniversary in 2026.",
            "Same Christmas Eve in Shanghai — Xintiandi Shikumen lighting ceremony and the Bund Source German Christmas Market.",
            "Same morning tour to the Great Wall at the Mutianyu section.",
            "Same New Year's Eve at Xi'an's Tang Dynasty Ever-Bright City.",
            "One day shorter than the Auckland departure (15 days vs 16) and NZ$1,000 less per person.",
            "Return flights: CZ3533 Guangzhou–Shanghai · CZ3426 Chongqing–Guangzhou · CZ617 Guangzhou–Christchurch.",
        ],
        "included": [
            "International and domestic airfares",
            "Accommodation (12 nights across 4 properties)",
            "Specified meals",
            "Private transfers and sightseeing transport",
            "English-speaking guides",
            "Entrance fees · 2nd-class train tickets",
        ],
        "excluded": [
            "China visa (if applicable)",
            "Travel insurance",
            "Personal expenses",
            "Guide and driver tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$968 · solo total NZ$7,156",
        "url": "/tours/china/discovery/china-icons-collection-christchurch",
    },
    {
        "key": "best-of-china",
        "short": "Mar &amp; May 2027",
        "collection": "China Discovery",
        "name": "Best of China",
        "flag": "TWO 2027 DEPARTURES · BEST VALUE 15-DAY",
        "days": 15,
        "depart": "Auckland 11 Mar 2027 &amp; 13 May 2027",
        "returns": "25 Mar 2027 / 27 May 2027",  # W* departure + 15 days
        "cities": "Beijing · Xi'an · Hangzhou · Tongxiang (Puyuan) · Shanghai",
        "price": "4,080",
        "single": "800",
        "group": "Max 18",
        "meals": "22 included",
        "meals_detail": "12 B · 9 L · 1 D",
        "hotels": "12 nights",
        "hotels_detail": "across 5 properties",
        "image": "hangzhou-west-lake-broken-bridge",
        "list_title": "HIGHLIGHTS ACROSS 15 DAYS",
        "highlights": [
            "Temple of Heaven · Tian'anmen Square · Forbidden City · Beihai Park",
            "Great Wall · jade carving factory · Olympic Park",
            "Hutong pedi-cab tour with family visit · Silk Market",
            "High-speed train G89 Beijing → Xi'an",
            "Terracotta Warriors with Circle Vision Movie and Bronze Chariot",
            "Xi'an City Wall · Big Wild Goose Pagoda · Small Wild Goose Pagoda Museum · Huimin Street",
            "Puyuan Fashion Ancient Town, Tongxiang",
            "West Lake boat tour · Leifeng Pagoda",
            "G20 Hangzhou Expo Center · Longjing tea tasting · Qinghefang Ancient Street",
            "Yu Garden · The Bund · Nanjing Road · Lujiazui skyline",
        ],
        "included": [
            "International and domestic airfares",
            "Hotel accommodation (12 nights, 5 properties)",
            "English-speaking tour guide",
            "Entrance fees and specified meals",
            "Land transfers",
        ],
        "excluded": [
            "Travel insurance",
            "Personal expenses",
            "Unlisted meals · transport during free time",
            "Optional tours (acrobatic show, Tang Palace show)",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$800 · solo total NZ$4,880",
        "url": "/tours/china/discovery/essentials",
    },
    {
        "key": "two-cities",
        "short": "Mar 2027",
        "collection": "China Discovery",
        "name": "A Tale of Two Cities",
        "flag": "LOWEST ENTRY PRICE · FIRST TRIP TO CHINA",
        "days": 10,
        "depart": "Auckland 18 Mar 2027",
        "returns": "27 Mar 2027",  # W* 18 Mar + 10 days
        "cities": "Beijing · Xi'an",
        "price": "3,480",
        "single": "395",
        "group": "Max 18",
        "meals": "12 included",
        "meals_detail": "7 B · 5 L",
        "hotels": "4★",
        "hotels_detail": "7 nights",
        "image": "i:imperial-lion",
        "list_title": "DAY BY DAY",
        "highlights": [
            "Depart Auckland · flight to Beijing",
            "Temple of Heaven · tea factory visit",
            "Tian'anmen Square · Forbidden City · Beihai Park · silk factory",
            "Great Wall · jade carving factory · Olympic Park (Bird's Nest, Water Cube)",
            "Hutong pedi-cab tour with family visit · Silk Market",
            "Free morning · high-speed train G89 to Xi'an (15:00–19:12)",
            "Terracotta Warriors · Circle Vision Movie · Bronze Chariot exhibition",
            "Xi'an City Wall · Big Wild Goose Pagoda",
            "Small Wild Goose Pagoda Museum · Huimin Street (Muslim Quarter) · flight to Beijing",
            "Return flight to Auckland",
        ],
        "included": [
            "International and domestic airfares",
            "4-star hotel accommodation (7 nights)",
            "English-speaking tour guide",
            "Entrance fees as specified",
            "12 meals (7 breakfasts, 5 lunches)",
            "Land transfers",
        ],
        "excluded": [
            "Travel insurance",
            "Personal expenses",
            "Meals not listed",
            "Transport during free time",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$395 for a private room — the smallest single supplement in this brochure",
        "url": "/tours/china/discovery/beijing-xian",
    },
    {
        "key": "shanghai-surroundings",
        "short": "Mar 2027",
        "collection": "China Discovery",
        "name": "Shanghai &amp; Surroundings",
        "flag": "GARDENS, CANALS AND WEST LAKE",
        "days": 10,
        "depart": "Auckland 25 Mar 2027",
        "returns": "3 Apr 2027",  # W* 25 Mar + 10 days
        "cities": "Shanghai · Suzhou · Wuxi · Xinshi Ancient Town · Hangzhou",
        "price": "3,399",
        "single": "400",
        "group": "Max 18",
        "meals": "13 included",
        "meals_detail": "7 B · 5 L · 1 D",
        "hotels": "7 nights",
        "hotels_detail": "hotel accommodation",
        "image": "i:suzhou",
        "list_title": "DAY BY DAY",
        "highlights": [
            "Auckland to Shanghai",
            "Suzhou — Master of the Nets Garden · Panmen · Shantang Street",
            "Wuxi — silk factory · Three Kingdoms City · Purple Sand Museum",
            "Wuxi — Li Garden · Pearl Exhibition Centre · local market",
            "Xinshi — Hanfu photos and afternoon tea",
            "Hangzhou — West Lake · Su Causeway · Leifeng Pagoda",
            "Hangzhou to Shanghai — G20 Expo Centre · Six Harmonies Pagoda · Longjing tea",
            "Shanghai — The Bund · City God Temple · Art Exhibition Centre · Nanjing Road",
            "Free time · optional Maglev trip · Shanghai departure",
            "Arrive Auckland",
        ],
        "included": [
            "International and domestic airfares",
            "7 nights hotel accommodation",
            "English-speaking guide",
            "Entrance fees and specified meals",
            "Land transfers",
        ],
        "excluded": [
            "Travel insurance",
            "Personal expenses",
            "Meals not listed",
            "Optional activities (acrobatics, Maglev)",
            "Transport during free time",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$400 · solo total NZ$3,799 — the lowest tour price in this brochure",
        "url": "/tours/china/discovery/shanghai-surroundings",
    },
    {
        "key": "natural-china",
        "short": "Mar 2027",
        "collection": "China Signature",
        "name": "Natural China",
        "flag": "SIGNATURE · LANDSCAPES AND KARST COUNTRY",
        "days": 16,
        "depart": "Auckland 15 Mar 2027",
        "returns": "30 Mar 2027",
        "cities": "Shanghai · Guilin · Yangshuo · Chengdu · Leshan · Fenghuang · Zhangjiajie · Wulingyuan · Zhujiajiao",
        "price": "8,150",
        "single": "1,355",
        "group": "Max 16",
        "meals": "29 included",
        "meals_detail": "13 B · 9 L · 7 D",
        "hotels": "4–5★",
        "hotels_detail": "13 nights",
        "image": "i:zhangjiajie",
        "list_title": "WHERE THIS ONE GOES",
        "highlights": [
            "Guilin and Yangshuo — the karst river country on the back of the 20-yuan note",
            "Chengdu — giant pandas and the teahouse pace of Sichuan",
            "Leshan — the Giant Buddha carved into the cliff at the river junction",
            "Fenghuang Ancient Town — stilt houses over the Tuojiang River",
            "Zhangjiajie and Wulingyuan — the sandstone pillar forest, a UNESCO World Heritage site",
            "Zhujiajiao — the water town on Shanghai's outskirts",
            "Travel between regions by domestic flights and First Class high-speed rail",
        ],
        "included": [
            "Return international airfares from Auckland",
            "Domestic airfares within China",
            "4–5 star hotel accommodation (13 nights)",
            "English-speaking tour guide",
            "Entrance fees and meals as specified",
            "Land transport including high-speed trains (First Class)",
        ],
        "excluded": [
            "Travel insurance",
            "Personal expenses",
            "Transport and guide services during free time",
            "Meals not listed in itinerary",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$1,355 · maximum 16 travellers",
        "url": "/tours/china/signature/landscapes",
    },
    {
        "key": "panorama",
        "short": "May 2027",
        "collection": "China Signature",
        "name": "China Panorama",
        "flag": "27 DAYS · THE LONGEST JOURNEY WE RUN",
        "days": 27,
        "depart": "Auckland 8 May 2027",
        "returns": "3 Jun 2027",
        "cities": "Beijing · Xi'an · Yichang · Chongqing · Chengdu · Dali · Kunming · Guilin · Yangshuo · Hangzhou · Suzhou · Shanghai",
        "price": "10,899",
        "single": "2,555",
        "group": "Max 16",
        "meals": "50 included",
        "meals_detail": "23 B · 17 L · 10 D",
        "hotels": "4–5★",
        "hotels_detail": "24 nights + Victoria Yangtze cruise",
        "image": "i:yangtze-sunset",
        "list_title": "TWELVE CITIES IN ONE JOURNEY",
        "highlights": [
            "Beijing — the Great Wall and the Forbidden City",
            "Xi'an — the Terracotta Warriors",
            "A four-day Yangtze River cruise through the Three Gorges aboard the 5-star Victoria fleet",
            "Chengdu — giant pandas",
            "Dali and Kunming — Yunnan's lake country and the Stone Forest",
            "Guilin and a Li River cruise down to Yangshuo",
            "Hangzhou — West Lake",
            "Suzhou — the classical gardens",
            "Shanghai — The Bund and the Huangpu River",
        ],
        "included": [
            "Return international airfares from Auckland",
            "Domestic China airfares",
            "4–5 star accommodation (24 nights)",
            "Victoria Yangtze River cruise (5-star)",
            "English-speaking guide",
            "Entrance fees and specified meals",
            "High-speed trains (First Class)",
        ],
        "excluded": [
            "Travel insurance",
            "Personal expenses",
            "Transport during free time",
            "Meals not listed",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$2,555 · maximum 16 travellers · also departs 16 Oct 2027",
        "url": "/tours/china/signature/grand-tour",
    },
    {
        "key": "silk-road",
        "short": "May 2027",
        "collection": "China Signature",
        "name": "Silk Road",
        "flag": "XI'AN TO URUMQI · 18 DAYS OVERLAND",
        "days": 18,
        "depart": "Auckland 13 May 2027",
        "returns": "30 May 2027",
        "cities": "Xi'an · Lanzhou · Wuwei · Zhangye · Jiayuguan · Dunhuang · Turpan · Urumqi",
        "price": "7,999",
        "single": "1,488",
        "group": "Max 16",
        "meals": "38 included",
        "meals_detail": "15 B · 11 L · 12 D",
        "hotels": "4–5★",
        "hotels_detail": "15 nights",
        "image": "silk-road-hero",
        "list_title": "THE ROUTE, WEST FROM XI'AN",
        "highlights": [
            "Xi'an — the Terracotta Warriors, and the eastern end of the Silk Road",
            "Lanzhou — the Bingling Temple grottoes",
            "Wuwei and Zhangye — the Hexi Corridor",
            "Jiayuguan — the western gate of the Great Wall",
            "Dunhuang — two full days",
            "Turpan — the desert oasis basin",
            "Urumqi and Heavenly Lake",
            "Return via Shanghai to New Zealand",
        ],
        "included": [
            "International and domestic airfares",
            "4–5 star hotel accommodation (15 nights)",
            "English-speaking tour guide",
            "Entrance fees and meals as specified in the itinerary",
            "Land transport",
        ],
        "excluded": [
            "China visa fee (if required)",
            "Travel insurance",
            "Personal expenses",
            "Transport and guide services during free time",
            "Meals not listed in itinerary",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$1,488 · maximum 16 travellers · also departs 21 Oct 2027",
        "url": "/tours/china/signature/silk-road",
    },
    {
        "key": "legacy",
        "short": "May 2027",
        "collection": "China Signature",
        "name": "Legacy of China",
        "flag": "5-STAR · INCLUDES LHASA AND THE THREE GORGES",
        "days": 17,
        "depart": "Auckland 28 May 2027",
        "returns": "13 Jun 2027",
        "cities": "Beijing · Xi'an · Lhasa · Chengdu · Chongqing · Shanghai",
        "price": "9,999",
        "single": "2,410",
        "group": "Max 16",
        "meals": "31 included",
        "meals_detail": "14 B · 7 L · 10 D",
        "hotels": "5★",
        "hotels_detail": "14 nights across 6 properties",
        "image": "i:qutang",
        "list_title": "HIGHLIGHTS ACROSS 17 DAYS",
        "highlights": [
            "Beijing — Forbidden City · the Great Wall at Mutianyu · Temple of Heaven · Summer Palace",
            "Xi'an — Terracotta Warriors · Muslim Quarter · dumpling banquet with Tang Dynasty dance · Ancient City Wall",
            "<b>Lhasa — Jokhang Temple · Barkhor Street · Sera Monastery · Potala Palace · Norbulingka</b>",
            "Chengdu — giant pandas",
            "A three-night Yangtze River cruise through the Three Gorges",
            "The Three Gorges Dam and Yichang",
            "Shanghai — Yu Garden · silk factory · The Bund · Huangpu River night cruise",
        ],
        "included": [
            "International and domestic airfares",
            "5-star hotel accommodation (14 nights)",
            "English-speaking tour guide",
            "Entrance fees and specified meals",
            "Land transport including first-class high-speed trains",
        ],
        "excluded": [
            "Travel insurance",
            "Personal expenses",
            "Transport during free time",
            "Meals not listed in itinerary",
            "Tips (suggested NZ$10 pp/day)",
        ],
        "footnote": "Single supplement NZ$2,410 · maximum 16 travellers",
        "url": "/tours/china/signature/imperial-heritage",
    },
]

# W /tours/china/stopover — list page, 2026-09-22
STOPOVERS = [
    ("Shanghai Express", 2, "875"),
    ("Xi'an", 3, "945"),
    ("Shanghai", 3, "1,060"),
    ("Guilin", 3, "1,099"),
    ("Shanghai &amp; Suzhou", 3, "1,356"),
    ("Chengdu", 3, "1,359"),
    ("Guangzhou", 3, "1,399"),
    ("Beijing Express", 3, "1,450"),
    ("Zhangjiajie", 3, "1,899"),
    ("Guilin &amp; Surrounds", 4, "1,310"),
    ("Huangshan", 4, "1,635"),
    ("Shanghai &amp; Wuzhen", 4, "1,760"),
    ("Guangzhou &amp; Shenzhen", 4, "2,340"),
    ("Beijing", 5, "2,120"),
]

# W /tours/china/stopover — quoted verbatim
STOPOVER_DISCLAIMER = (
    "Do not assume they are. Check the Included and Not Included sections on the "
    "individual tour page. International airfare, through-ticketing and connection "
    "changes are confirmed separately unless a product explicitly states otherwise."
)

# W /tailor-made — headline, steps and taglines quoted verbatim
TAILOR = {
    "headline": "A journey designed around you",
    "tagline": "Tailor-made China. Your kind of journey.",
    "sub": "Your dates. Your pace. Your interests.",
    "steps": [
        ("Tell us your ideas",
         "A few details are enough to begin. Tell us what matters most to you."),
        ("Shape it together",
         "Your specialist helps refine the route, pace, hotels and budget."),
        ("Confirm your journey",
         "Review your proposal, inclusions and availability before booking."),
    ],
    "promise": "No obligation. A real specialist, from the first conversation.",
    "cta": "Start planning my trip",
}

# Photography credits — every Creative Commons image used in this brochure.
# Sourced from chinatravel repo: scripts/brochure/assets/CREDITS.json and
# public/blog/sourced/CREDITS.json.
CC_CREDITS = [
    ("Tang Dynasty Ever-Bright City, Xi'an", "源義信", "CC BY-SA 4.0"),
    ("West Lake, Hangzhou", "Jakub Hałun", "CC BY-SA 4.0"),
    ("Hongyadong, Chongqing", "xiquinhosilva", "CC BY 2.0"),
    ("Muslim Quarter night market, Xi'an", "chensiyuan", "CC BY-SA 4.0"),
    ("Ciqikou old town, Chongqing", "Nyx Ning", "CC BY-SA 3.0"),
    ("Humble Administrator's Garden, Suzhou", "Jakub Hałun", "CC BY-SA 4.0"),
    ("Chengdu Research Base of Giant Panda Breeding", "Jimmyshjj", "CC BY-SA 4.0"),
]

# --- Photo pages ---------------------------------------------------------
# One mosaic page per departure. A tile may ONLY show a place that tour's own
# itinerary visits, and the caption may only say what the itinerary says.
#
# Two traps this list is built around, both the same shape as the "sunrise at
# the Great Wall" error:
#   * Golden China walks the Great Wall at JUYONGGUAN; the Christmas departures
#     and Legacy of China go to MUTIANYU. The stock library's wall photos are
#     Mutianyu, so Golden China gets a CTS group photo captioned without a
#     section instead.
#   * public/images/great-wall-cts-1.jpg and -2.jpg are NOT used here. They are
#     phone snaps of one customer holding a CTS sign with the wall barely
#     visible behind foliage — as a tile captioned "The Great Wall" they show a
#     stranger's face at full size and almost no wall.
#   * China Panorama ALSO walks the wall at Juyongguan, not Mutianyu — caught by
#     the Jev caption audit after it had already been missed here once.
#   * Shanghai & Surroundings goes to XINSHI, not Wuzhen. The Wuzhen photos
#     belong to the "Shanghai & Wuzhen" stopover route and nowhere else.
#
# Keys starting "i:" are the paid iStock set (scripts/catalogue/assets-istock,
# no attribution required); "s:" is the Creative Commons set (scripts/catalogue/
# assets, credited on the back cover); the rest are repo images.
MOSAICS = {
    "golden-china": [
        ("i:forbidden-city", "Forbidden City, Beijing"),
        ("i:temple-of-heaven", "Temple of Heaven, Beijing"),
        ("group-great-wall-cts", "CTS travellers on the Great Wall"),
        ("s:beijing-summerpalace_2", "Summer Palace, Beijing"),
        ("i:terracotta", "Terracotta Warriors, Xi'an"),
        ("s:xian-citywall_0", "Xi'an City Wall"),
        ("i:zhujiajiao", "Zhujiajiao water town"),
        ("i:shanghai-skyline", "The Bund, Shanghai"),
        ("i:shanghai-shopping", "Nanjing Road, Shanghai"),
    ],
    "christmas-akl": [
        ("i:shanghai-christmas", "Christmas in Shanghai"),
        ("s:shanghai-xintiandi_1", "Xintiandi, Shanghai"),
        ("s:shanghai-pearl_1", "Oriental Pearl Tower, Shanghai"),
        ("s:shanghai-zhujiajiao_2", "Zhujiajiao, Christmas morning"),
        ("s:beijing-greatwall_1", "The Great Wall at Mutianyu"),
        ("s:beijing-forbiddencitysnow_0", "Forbidden City in winter"),
        ("s:xian-terracotta_1", "Terracotta Warriors, Xi'an"),
        ("i:hongyadong", "Hongyadong, Chongqing"),
        ("i:liziba", "Liziba monorail station, Chongqing"),
        ("s:guangzhou-yumcha_2", "Yum cha, Guangzhou"),
    ],
    "christmas-chc": [
        ("s:shanghai-yugarden_1", "Yu Garden, Shanghai"),
        ("s:shanghai-bund_1", "The Bund, Shanghai"),
        ("s:beijing-greatwall_2", "The Great Wall at Mutianyu"),
        ("s:beijing-summerpalace_0", "Summer Palace, Beijing"),
        ("s:beijing-hutong_1", "Hutong lanes, Beijing"),
        ("s:xian-citywall_2", "Xi'an City Wall"),
        ("s:xian-belltower_0", "Bell Tower, Xi'an"),
        ("s:chongqing-ciqikou_0", "Ciqikou old town, Chongqing"),
        ("i:chongqing-night", "Chongqing by night"),
        ("s:beijing-forbiddencity_0", "Forbidden City, Beijing"),
    ],
    "best-of-china": [
        ("s:beijing-templeofheaven_2", "Temple of Heaven, Beijing"),
        ("s:beijing-forbiddencity_1", "Forbidden City, Beijing"),
        ("i:great-wall", "The Great Wall"),
        ("s:beijing-olympicpark_2", "Olympic Park, Beijing"),
        ("s:xian-terracotta_2", "Terracotta Warriors, Xi'an"),
        ("s:xian-goosepagoda_0", "Big Wild Goose Pagoda, Xi'an"),
        ("s:hangzhou-westlake_0", "West Lake, Hangzhou"),
        ("s:hangzhou-leifeng_1", "Leifeng Pagoda, Hangzhou"),
        ("s:hangzhou-longjing_1", "Meijiawu Longjing tea plantation, Hangzhou"),
        ("i:shanghai-night", "Lujiazui skyline, Shanghai"),
    ],
    "two-cities": [
        ("i:temple-of-heaven", "Temple of Heaven, Beijing"),
        ("i:imperial-lion", "Forbidden City, Beijing"),
        ("i:great-wall-pano", "The Great Wall"),
        ("s:beijing-olympicpark_0", "Olympic Park, Beijing"),
        ("s:beijing-hutong_0", "Hutong lanes, Beijing"),
        ("i:terracotta", "Terracotta Warriors, Xi'an"),
        ("s:xian-citywall_2", "Xi'an City Wall"),
        ("s:xian-goosepagoda_1", "Big Wild Goose Pagoda, Xi'an"),
        ("s:xian-foodstreet_0", "Huimin Street, Xi'an"),
        ("beihai-park", "Beihai Park, Beijing"),
    ],
    "shanghai-surroundings": [
        ("i:shanghai-skyline", "The Bund, Shanghai"),
        ("i:shanghai-shopping", "Nanjing Road, Shanghai"),
        ("s:shanghai-yugarden_0", "City God Temple quarter, Shanghai"),
        ("i:suzhou", "Suzhou"),
        ("s:hangzhou-westlake_1", "West Lake and the Su Causeway, Hangzhou"),
        ("s:hangzhou-leifeng_1", "Leifeng Pagoda, Hangzhou"),
        ("s:hangzhou-longjing_1", "Meijiawu Longjing tea, Hangzhou"),
    ],
    "natural-china": [
        ("i:li-river", "The Li River at Guilin"),
        ("guilin-mist", "Guilin"),
        ("li-river-rafts", "Rafts on the Li River"),
        ("yangshuo-karst-aerial", "Yangshuo"),
        ("i:panda", "Giant pandas, Chengdu"),
        ("leshan-buddha", "Leshan Giant Buddha"),
        ("i:zhangjiajie", "Zhangjiajie"),
        ("s:shanghai-zhujiajiao_1", "Zhujiajiao water town"),
    ],
    "panorama": [
        ("i:great-wall", "The Great Wall"),
        ("i:forbidden-city", "Forbidden City, Beijing"),
        ("i:terracotta", "Terracotta Warriors, Xi'an"),
        ("i:yangtze-cruise", "Aboard the Yangtze cruise"),
        ("s:chongqing-gorges_1", "The Three Gorges, Yangtze River"),
        ("i:panda", "Giant pandas, Chengdu"),
        ("dali-three-pagodas", "Three Pagodas, Dali"),
        ("i:li-river", "Li River cruise to Yangshuo"),
        ("yangshuo-karst-aerial", "Yangshuo"),
        ("i:suzhou", "Suzhou"),
        ("i:shanghai-night", "Shanghai by night"),
    ],
    "legacy": [
        ("i:forbidden-city", "Forbidden City, Beijing"),
        ("s:beijing-greatwall_1", "The Great Wall at Mutianyu"),
        ("i:temple-of-heaven", "Temple of Heaven, Beijing"),
        ("s:beijing-summerpalace_2", "Summer Palace, Beijing"),
        ("i:terracotta", "Terracotta Warriors, Xi'an"),
        ("s:xian-foodstreet_2", "Muslim Quarter, Xi'an"),
        ("i:panda", "Giant pandas, Chengdu"),
        ("i:yangtze-cruise", "Yangtze River cruise"),
        ("i:qutang", "The Three Gorges"),
        ("i:yangtze-sunset", "Sunset on the Yangtze"),
        ("i:shanghai-skyline", "The Bund, Shanghai"),
    ],
}

# Silk Road has no photo page. Of the nine places its itinerary names, only
# Xi'an has a usable image: Bingling Temple, the Zhangye Danxia landforms,
# Jiayuguan, the Mogao Caves, the Flaming Mountains and Heavenly Lake are all
# missing from every library we hold, and the two files named silk-road-*.jpg
# show unidentifiable desert wall. A page built from those would either repeat
# Xi'an six times or caption a picture as somewhere it is not.
MOSAIC_MISSING = {
    "silk-road": [
        "Bingling Temple, Lanzhou", "Zhangye Danxia landforms", "Jiayuguan fort",
        "Mogao Caves, Dunhuang", "Flaming Mountains, Turpan",
        "Heavenly Lake, Urumqi",
    ],
    "natural-china": ["Zhangjiajie / Wulingyuan", "Fenghuang Ancient Town"],
    "legacy": ["Potala Palace and Lhasa"],
    "panorama": ["Stone Forest, Kunming"],
}
