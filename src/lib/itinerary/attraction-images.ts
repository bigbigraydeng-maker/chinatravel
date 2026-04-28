/**
 * 景点图片映射表（OP 行程生成器专用）
 *
 * 用途：Word/PDF 行程书生成时，按 attraction id 取一张代表性图片插入文档。
 * 优先级：
 *   1. 此处的 ATTRACTION_IMAGES[id] —— 精挑细选的代表图
 *   2. fallback 到 engine.ts 里的 attraction.image
 *   3. 都没有 → 不插图（不影响文档生成）
 *
 * 替换图片的步骤（参考 CLAUDE.md「图片管理工作流」）：
 *   1) 去 unsplash.com 搜索景点英文名（如 "milford sound new zealand"）
 *   2) 找到满意的图片，从 URL 复制 photo ID（如 photo-1518611012118-696072aa579a）
 *   3) 替换下方的 URL，保留 ?w=900&q=80 参数（宽度足够清晰且文件不大）
 *
 * 图片宽度建议 800-1200px，下载到 Buffer 后嵌入 Word 时会缩放到约 300×200。
 */

export const ATTRACTION_IMAGES: Record<string, string> = {
  // === 奥克兰 Auckland ===
  'sky-tower':
    'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=900&q=80',
  'auckland-harbour':
    'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=900&q=80',
  'mount-eden':
    'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=900&q=80',
  'waitangi-treaty':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',

  // === 罗托鲁阿 Rotorua ===
  'te-puia':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',
  'polynesian-spa':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',
  'redwoods-forest':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',
  'luge-skyline':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',
  'agrodome-farm':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',

  // === 皇后镇 Queenstown ===
  'milford-sound':
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=900&q=80',
  'arrow-town':
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=900&q=80',
  'gibbston-wine':
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=900&q=80',
  'dart-river-jet':
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=900&q=80',
  'glenorchy-walk':
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=900&q=80',

  // === 陶波 Taupo ===
  'huka-falls':
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=900&q=80',
  'taupo-lake':
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=900&q=80',

  // === 怀托摩 Waitomo ===
  'glowworm-caves':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',

  // === 霍比特村 Hobbiton ===
  'hobbiton-movie-set':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',
  'blue-spring':
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80',
}

/** 取景点图片 URL（优先用映射表，没有则 fallback） */
export function getAttractionImageUrl(
  attractionId: string,
  fallback?: string
): string | undefined {
  return ATTRACTION_IMAGES[attractionId] || fallback || undefined
}

/**
 * 封面 hero 图（行程方案册的大气封面图）
 *
 * 默认使用一张代表性新西兰风景照（来自 Unsplash CDN）。
 * 替换步骤：
 *   1) 在 unsplash.com 搜 "new zealand landscape" / "milford sound" / "queenstown" / "lake tekapo"
 *   2) 找一张大气、横幅比例（横向 16:9 或更宽）的图
 *   3) 复制 photo ID 替换下方 URL，保留 ?w=1400&q=85 参数
 *
 * 在 Word 里会渲染成 660 × 280 px 的横幅，覆盖封面页顶部约 1/3 高度。
 */
export const NZ_COVER_IMAGE_URL =
  'https://images.unsplash.com/photo-1469521669194-babb45599def?w=1400&q=85'
// 备选（你可以挑一个换上）：
// Milford Sound:   https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400&q=85
// Lake Tekapo:     https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1400&q=85
// Queenstown:      https://images.unsplash.com/photo-1589802829985-817e51171b92?w=1400&q=85
// Mount Cook:      https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=85
