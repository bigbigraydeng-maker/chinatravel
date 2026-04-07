---
name: Blog Content Generator for ChinaTravel
description: 为 ChinaTravel 生成多渠道博客内容（博客 + 社交媒体版本）
maxUses: unlimited
slashCommand: /gen-blog
context: chinatravel
---

# 博客内容生成器

自动为 ChinaTravel 博客生成完整的多平台内容。

## 输入参数

以 JSON 格式提供以下参数：

```json
{
  "topic": "China Visa Guide for New Zealanders",
  "keywords": ["visa", "China", "New Zealand", "travel tips"],
  "category": "travel-tips",
  "audience": "New Zealand travellers",
  "tone": "professional",
  "language": "English",
  "relatedGuides": ["beijing-travel-guide", "shanghai-travel-guide"],
  "relatedTours": ["china-signature"]
}
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| topic | string | ✅ | 博客主题 |
| keywords | string[] | ✅ | 3-5 个关键词（用于 SEO） |
| category | string | ✅ | 分类：travel-tips / experience / destination / culture |
| audience | string | ✅ | 目标受众描述 |
| tone | string | ✅ | 语气：professional / friendly / casual |
| language | string | ✅ | 语言：English / Chinese |
| relatedGuides | string[] | ❌ | 相关导览页面 slugs（最多 3 个） |
| relatedTours | string[] | ❌ | 相关旅游产品 slugs（最多 2 个） |

## 输出格式

生成完整的多渠道内容包，包含以下部分：

### 1. 博客文章

返回 JSON 结构：

```json
{
  "blog": {
    "title": "China Visa Guide for New Zealand Travellers",
    "slug": "china-visa-guide-nz-travellers",
    "content": "# 完整的 Markdown 博客内容 (1800-3000 字)\n\n## 目录\n- 签证类型\n- ...\n\n## 签证类型\n详细内容...",
    "metadata": {
      "description": "160 字的 SEO 描述",
      "keywords": ["visa", "China", "New Zealand", "travel tips", "application"],
      "category": "travel-tips",
      "readTime": "12 min"
    },
    "internalLinks": [
      { "text": "Best Time to Visit China", "slug": "best-time-to-visit-china" },
      { "text": "Beijing Travel Guide", "slug": "beijing-travel-guide" }
    ]
  }
}
```

### 2. LinkedIn 版本

- 格式：长文职业版本（800-1000 字）
- 语气：权威、数据驱动、教育性
- 开头：引人入胜的数据或观点
- 中段：3-4 个核心要点（bullet list）
- 结尾：CTA（"Read full guide: [link]"）
- Hashtags：3-5 个相关标签

### 3. 小红书版本

- 格式：生活分享版（300-500 字）
- 语气：热情、实用、emoji 密集
- 结构：
  - 开头：吸引眼球的观点或问题
  - 要点：3-5 个实用贴士（emoji 标号）
  - 结尾：CTA（"了解更多 👇"）
  - Hashtags：3-5 个
- Emoji 使用：自然、不过度

### 4. 微博版本

- 格式：短分享版（100-200 字）
- 语气：新闻体、话题化
- 结构：
  - 首句：新闻导语
  - 要点：1-2 个核心信息
  - Hashtags：3-5 个（#中国旅游 #签证指南 等）

## Root JSON shape for `/blog/staging` import

Paste into the staging panel as one object:

```json
{
  "blog": { "...": "..." },
  "linkedin": "...",
  "xiaohongshu": "...",
  "weibo": "..."
}
```

## 具体要求

### 博客文章

- 长度：1800-3000 字
- 结构：H1 一次；3-5 个 H2；每段 300-500 字；可选 H3
- 数据支持、step-by-step、新西兰旅客视角（NZD、Auckland 等）
- SEO：Title 含主关键词；meta description ≤160 字；关键词自然分布

### 社交媒体版本

- LinkedIn：权威、详细、CTA 清晰
- 小红书：生活化、emoji、分享感
- 微博：简洁、话题化
- 统一提及 CTS Tours / ChinaTravel 品牌

## 质量检查清单

- [ ] 内容原创（非复制粘贴）
- [ ] 数据准确（引用可验证来源）
- [ ] 长度符合要求
- [ ] 语法正确、避免无意义中英混用
- [ ] 内链相关性强
- [ ] 各平台版本适配特点
- [ ] Hashtags 相关

## 发布流程

1. Claude 生成内容 → JSON 输出
2. 用户复制 JSON → `/blog/staging` 面板 **Import** 框解析
3. 审核、编辑、改状态
4. 生产合并：`blogs.ts` / CMS（API 占位见 `POST /api/blog-staging-publish`）

## 注意事项

- SEO：每篇博客为独立 SEO 资产
- 内链：博客 → 导览 → 产品
- 品牌：CTS Tours 专业、可信
- 本地化：面向新西兰旅客

## 后期扩展

- 中文输出与批量生成
- Staging API 自动同步
- 社交媒体自动发布集成
