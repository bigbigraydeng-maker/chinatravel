#!/usr/bin/env python3
"""
CTS 1928 表述合规修正 —— Angela 邮件 2026-08-27 拍板。

真相（两个必须分立的事实）：
- CTS Tours NZ 成立于 2000（Auckland）
- China Travel Service Group 成立于 1928

违规：把 1928 直接挂在 NZ 公司头上（"NZ specialists since 1928"、"98 years"、"nearly a century" 都算）
合规：两条事实分开陈述，或只提其一

这个脚本做**明确无歧义的字符串替换**——所有替换目标都是精确匹配的完整短语，不做正则模式匹配。
少数需要重写句子结构的地方留给人工。
"""

import os
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SRC = REPO / 'src'

# 每条 (旧, 新)。顺序重要：长的先替换，避免子串抢占。
REPLACEMENTS = [
    # ─── 严重违规：直接把 1928 扣在 NZ / Auckland 头上 ─────────────────────
    (
        "Licensed NZ specialists since 1928",
        "Licensed NZ specialists — Auckland since 2000, backed by CTS (founded 1928)",
    ),
    (
        "NZ's China travel specialist since 1928",
        "NZ's China travel specialist — Auckland since 2000, backed by CTS (founded 1928)",
    ),
    (
        "New Zealand's China travel specialists since 1928.",
        "New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928).",
    ),
    (
        "New Zealand's China travel specialists since 1928",
        "New Zealand's Kiwi-led China travel specialists — Auckland since 2000, backed by China Travel Service (founded 1928)",
    ),
    (
        "China travel specialists since 1928",
        "China travel specialists — Auckland since 2000, backed by CTS (founded 1928)",
    ),
    (
        "China specialists since 1928",
        "China specialists — Auckland since 2000, backed by CTS (founded 1928)",
    ),
    # 老 blog / GEO 变体
    (
        "operating since 1928",
        "operating from Auckland since 2000 as the New Zealand arm of China Travel Service (founded 1928)",
    ),
    (
        "TAANZ-bonded since 1928",
        "TAANZ-bonded — CTS Tours NZ operating in Auckland since 2000, backed by China Travel Service (founded 1928)",
    ),
    (
        "TAANZ member since 1928",
        "TAANZ member — CTS Tours NZ, Auckland since 2000; parent group China Travel Service founded 1928",
    ),
    (
        "we have been here since 1928",
        "we have been running Kiwi-led China tours from Auckland since 2000, backed by China Travel Service (founded 1928)",
    ),
    (
        "bringing Kiwi travellers to China since 1928",
        "bringing Kiwi travellers to China from our Auckland office since 2000, backed by China Travel Service (founded 1928)",
    ),
    (
        "taking Kiwis to China since 1928",
        "taking Kiwis to China from our Auckland office since 2000, backed by China Travel Service (founded 1928)",
    ),
    (
        "hand-crafted for Kiwi travellers since 1928",
        "hand-crafted for Kiwi travellers from our Auckland office since 2000, backed by China Travel Service (founded 1928)",
    ),
    (
        "taking New Zealand travellers to China. Trust & reliability.",
        "taking New Zealand travellers to China from our Auckland office. Trust & reliability.",
    ),
    (
        "Since 1928, taking New Zealand travellers to China.",
        "Kiwi-led from Auckland since 2000, backed by China Travel Service (founded 1928). Taking New Zealand travellers to China.",
    ),
    (
        "Since 1928, we've been crafting unforgettable journeys.",
        "CTS Tours NZ has been crafting Kiwi-led China journeys from Auckland since 2000, backed by China Travel Service (founded 1928).",
    ),
    (
        "Specialists Since 1928",
        "Backed by CTS · Founded 1928",
    ),
    (
        "Trusted Since 1928",
        "Backed by CTS · Founded 1928",
    ),
    (
        "TRUSTED SINCE 1928",
        "BACKED BY CTS · FOUNDED 1928",
    ),
    (
        "CTS Tours - Since 1928",
        "CTS Tours",
    ),
    # 顶层 metadata title 变体
    (
        "China Tours from New Zealand | CTS Tours - Since 1928",
        "China Tours from New Zealand | CTS Tours",
    ),
    (
        "About CTS Tours | China Travel Specialists since 1928",
        "About CTS Tours | Kiwi-Led China Travel Specialists (Auckland since 2000)",
    ),
    (
        "China Travel Specialists Since 1928",
        "China Travel Specialists — Kiwi-Led from Auckland",
    ),
    (
        "China Travel Specialists — Since 1928",
        "CTS Tours NZ — Auckland since 2000 · Backed by CTS (founded 1928)",
    ),
    # OG image alt
    (
        "CTS Tours — China Travel Specialists for New Zealanders since 1928",
        "CTS Tours NZ — Kiwi-Led China Travel Specialists (Auckland since 2000, backed by CTS founded 1928)",
    ),

    # ─── "98 years" / "nearly a century" ────────────────────────────────
    (
        "'98 years (est. 1928)'",
        "'25 years (NZ established 2000)'",
    ),
    (
        "'1928 — 98 years'",
        "'CTS Group founded 1928; CTS Tours NZ established 2000 (25 years)'",
    ),
    (
        "1928 — 98 years",
        "CTS Group founded 1928; CTS Tours NZ established 2000 (25 years)",
    ),
    (
        "Established 1928 — 98 years operating China tours from New Zealand",
        "CTS Tours NZ established 2000 — 25 years of Kiwi-led China tour operation from Auckland; parent group China Travel Service founded 1928",
    ),
    (
        "Founded 1928 — 98 years of China tour expertise from New Zealand",
        "CTS Tours NZ founded 2000 — 25 years of Kiwi-led China tour expertise from Auckland; parent group China Travel Service founded 1928",
    ),
    (
        "98 Years Heritage",
        "Backed by CTS · Founded 1928",
    ),
    (
        "98 years heritage",
        "Backed by CTS · Founded 1928",
    ),
    (
        "98 years of expertise",
        "25 years of Kiwi-led NZ operations, drawing on CTS Group experience since 1928",
    ),
    (
        "98 years of China travel knowledge",
        "25 years of Kiwi-led NZ operations, drawing on CTS Group experience since 1928",
    ),
    (
        "98 years of one job, done one way",
        "25 years of one job, done one way from Auckland — as the NZ arm of CTS (founded 1928)",
    ),
    (
        "ninety-eight years of one job, done one way",
        "25 years of one job, done one way from Auckland — as the NZ arm of CTS (founded 1928)",
    ),
    (
        "Ninety-eight years of one job, done one way.",
        "25 years of one job, done one way from Auckland — as the NZ arm of CTS (founded 1928).",
    ),
    (
        "with 98 years of expertise and local ground presence",
        "with 25 years of Kiwi-led NZ operations plus CTS Group experience since 1928 and local ground presence",
    ),
    (
        "As specialists with 98 years of experience",
        "As Kiwi-led specialists with 25 years of NZ operations, drawing on CTS Group experience since 1928",
    ),
    (
        "since 1928 (98 years)",
        "since 2000 in NZ (25 years); parent CTS Group since 1928",
    ),
    (
        "98 years. 1,200+ Kiwi travellers.",
        "25 years in NZ · 1,200+ Kiwi travellers.",
    ),
    (
        "98 Years Experience",
        "Backed by CTS · Founded 1928",
    ),
    (
        "98 years operating China tours from New Zealand",
        "25 years operating Kiwi-led China tours from Auckland; parent group CTS founded 1928",
    ),
    (
        "98 years",  # 兜底，最短的字面
        "25 years in NZ (parent CTS since 1928)",
    ),

    (
        "Nearly a century of on-the-ground expertise",
        "Backed by CTS — China's travel brand since 1928 — with 25 years of Kiwi-led NZ operations",
    ),
    (
        "nearly a century of on-the-ground expertise",
        "backed by CTS — China's travel brand since 1928 — with 25 years of Kiwi-led NZ operations",
    ),
    (
        "That's nearly a century of trust and expertise.",
        "That's 25 years of Kiwi-led NZ operations, drawing on China Travel Service Group experience since 1928.",
    ),
    (
        "For nearly a century we have crafted",
        "For 25 years CTS Tours NZ has crafted (parent CTS Group in the industry since 1928)",
    ),
    (
        "we have run China tours for nearly a century",
        "we have run Kiwi-led China tours from Auckland for 25 years, backed by CTS Group (founded 1928)",
    ),
    (
        "Almost 100 years of China travel experience",
        "25 years of Kiwi-led NZ operations, drawing on CTS Group experience since 1928",
    ),
    (
        "nearly 100 years of heritage",
        "CTS Tours NZ has 25 years in Auckland, drawing on CTS Group experience since 1928",
    ),
    (
        "Our roots in China-outbound travel span nearly 100 years.",
        "Our parent group, China Travel Service, has been in the industry since 1928 (nearly 100 years).",
    ),
    (
        "With nearly a century of experience in the travel industry",
        "With 25 years of Kiwi-led NZ operations and China Travel Service Group experience since 1928",
    ),
    (
        "our roots trace back to the China Travel Service Group, founded in 1928",
        "our parent group, China Travel Service, was founded in 1928; our New Zealand company was established in Auckland in 2000",
    ),
    (
        "Century of Excellence Since 1928",
        "Backed by CTS · Founded 1928",
    ),
    (
        "Our roots trace back to the China Travel Service Group, founded in 1928",
        "Our parent group, China Travel Service, was founded in 1928; our New Zealand company was established in Auckland in 2000",
    ),
]


def main() -> int:
    changed_files = []
    for path in sorted(SRC.rglob('*')):
        if not path.is_file():
            continue
        if path.suffix not in ('.ts', '.tsx'):
            continue
        if '.test.' in path.name or path.parts[-2:][0] == '__tests__':
            continue
        text = path.read_text(encoding='utf-8')
        original = text
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding='utf-8')
            changed_files.append(path.relative_to(REPO))

    print(f'Changed {len(changed_files)} files')
    for f in changed_files:
        print(f'  {f}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
