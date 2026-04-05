#!/usr/bin/env python3
import os
from pathlib import Path

guides = [
    'beijing-travel-guide', 'xian-travel-guide', 'shanghai-travel-guide',
    'chengdu-travel-guide', 'guilin-travel-guide', 'zhangjiajie-travel-guide',
    'yunnan-travel-guide', 'lijiang-travel-guide', 'dali-travel-guide',
    'kunming-travel-guide', 'shangri-la-travel-guide', 'great-wall-travel-guide',
    'forbidden-city-travel-guide', 'terracotta-warriors-travel-guide',
    'yangshuo-travel-guide', 'li-river-cruise-guide', 'hangzhou-travel-guide',
    'suzhou-travel-guide', 'chongqing-travel-guide', 'leshan-buddha-travel-guide',
    'tianmen-mountain-travel-guide',
]

base_path = Path('src/app')

for slug in guides:
    page_dir = base_path / slug
    page_dir.mkdir(parents=True, exist_ok=True)
    
    page_file = page_dir / 'page.tsx'
    content = f"""import {{ Metadata }} from 'next';
import DestinationGuide from '@/components/seo/DestinationGuide';
import SchemaMarkup from '@/components/SchemaMarkup';
import {{ getGuideBySlug }} from '@/lib/data/guides';

const slug = '{slug}';

export const metadata: Metadata = {{
  title: 'Travel Guide | ChinaTravel',
  description: 'Comprehensive travel guide with attractions, practical information, and insider tips.',
  openGraph: {{
    type: 'website',
    url: '/{slug}',
  }},
  alternates: {{ canonical: '/{slug}' }},
}};

export default function GuidePage() {{
  const guide = getGuideBySlug('{slug}');
  
  if (!guide) {{
    return <div className="text-center py-20">Guide not found</div>;
  }}
  
  const schema = [{{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    image: guide.ogImage,
    datePublished: guide.datePublished,
    author: {{ '@type': 'Organization', name: 'CTS Tours' }},
  }}];
  
  return (
    <>
      <SchemaMarkup data={{schema}} />
      <DestinationGuide guide={{guide}} />
    </>
  );
}}
"""
    
    with open(page_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {slug}")

print(f"\n🎉 Generated {len(guides)} pages!")
