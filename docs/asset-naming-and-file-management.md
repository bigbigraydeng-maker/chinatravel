# ChinaTravel 素材命名与文件管理规则（T004）

本规范适用于：**站内向 Supabase Storage 上传的文件**、**本地整理后批量入库的源文件**、以及 **社媒/广告裁切导出包**（与 T052、T053 同一套命名逻辑）。技术迁移步骤见仓库根目录 `IMAGE_MIGRATION_GUIDE.md`。

---

## 1. 目的

- 文件名可一眼看出：**用途、产品线、比例/场景**，避免 `IMG_1234.jpg` 类无法追溯的命名。
- 路径与代码约定一致（`src/lib/site-media.ts`），减少上线后 404。
- 与 Unsplash **署名存档**（T053）可一一对应：同一 `photo-id` 或同一导出文件名能在表格里找到 photographer 与链接。

---

## 2. Supabase Storage 分桶

| Bucket | 用途 |
|--------|------|
| `tour-images` | 产品图、迁移后的 Unsplash、`migrated/site` 站点通用素材 |
| `guide-images` | 目的地/景点指南类图片（可按目的地分子目录） |
| `credential-images` | 资质、徽章类（如 TAANZ、IATA） |

**规则：** 新文件放入与内容类型匹配的 bucket；跨页面复用的「全站级」大图可放 `tour-images/migrated/site/`。

---

## 3. `tour-images` 内路径（与代码一致）

代码中的基准见 `src/lib/site-media.ts`：

| 路径前缀 | 含义 | 命名 |
|----------|------|------|
| `migrated/unsplash/` | 从 Unsplash 下载并上传的图 | **`photo-{UnsplashPhotoId}.jpg`**（与 `migratedUnsplash('photo-…')` 一致） |
| `migrated/site/` | 原 `public/` 或团队提供的站点素材 | **小写 kebab-case**，如 `silk-road-wall.jpg`、`credentials-taanz.png` |
| 其他（如各 tour 目录） | 产品专用图 | `{destination}/` 或 `{tour-slug}/` 下再分子目录，见下 |

**Unsplash：** Photo ID 取自作品页 URL（`unsplash.com/photos/<id>`），文件名必须带 `photo-` 前缀且扩展名与上传文件一致（通常为 `.jpg`）。

**自有/实拍：** `地点-主体-类型.jpg`，例如 `guilin-li-river-cruise-hero.jpg`。避免 `image1.jpg`、`final-v2-really.jpg`。

---

## 4. 产品页 / 指南图目录习惯

- **Discovery / Signature 等产品：** 在 bucket 内用 **`{region-or-destination}/{tour-slug}/`** 或数据里已有的目录结构保持一致；**上传脚本须保留相对路径**（不要用仅 `basename` 的方式剥目录）。
- **Guide：** `guide-images` 下建议 **`{destination}/hero/hero.jpg`** 或与 `guides` 数据中的 slug 对齐的子路径，便于运营查找。

---

## 5. 社媒与广告裁切包（对齐 T052）

从同一主图导出多比例时，**不要**只放在无命名文件夹里；建议本地（或网盘）先按下面结构打包，再按需上传或交付设计。

**推荐文件夹结构：**

```text
social-assets/
  {campaign-or-tour-slug}/          # 例：october-2026-tale-of-two-cities
    source/                         # 主图或 PSD（可选）
    export/
      {scene-or-role}__{ratio}__{index}.{ext}
```

**`{ratio}` 取值（小写）：** `1x1` | `4x5` | `9x16`（分别对应约 1:1、4:5、9:16）。

**示例文件名：**

- `hero-temple__9x16__01.jpg`
- `gallery-food__4x5__02.jpg`
- `cta-nz-travellers__1x1__01.jpg`

**规则摘要：**

- 段与段之间用 **双下划线 `__`** 分隔（单下划线可留在 `{scene-or-role}` 内描述词中）。
- `{index}` 为两位序号 `01`、`02`，同场景多版本时递增。
- 扩展名小写：`.jpg` / `.png` / `.webp`（与导出格式一致）。

---

## 6. 署名与侧车文件（对齐 T053）

对每个用于公开传播的 Unsplash 图，在表格或 Obsidian 中至少记录：**photographer 姓名、Unsplash 作品 URL、用途（站 / FB / IG）**。  
可选：在 `social-assets/.../export/` 旁放 **`CREDITS.md`**，列出该文件夹内文件与上述字段，文件名与 §5 一致以便核对。

---

## 7. 规格参考（与 CLAUDE 项目说明一致）

| 用途 | 最小宽度 | 比例 | 说明 |
|------|----------|------|------|
| 站内涵 Hero（桌面） | 1200px | 16:9 为主 | 控制体积，避免过大原图直传 |
| Guide 缩略 | 400px 级 | 1:1 | 按实际上线组件裁剪 |
| 社媒竖版 | — | 9:16 | Reels / Stories 类 |
| 社媒方图 | — | 1:1 | Feed 方图 |

---

## 8. 禁止与注意

- 不要在文件名中使用 **`§`**（站内/部分客户端显示不佳）。
- 避免仅含 **`image`、`photo`、`DSC`** 等无信息文件名。
- **改文件名 = 新文件**：若已写入 `tours.ts` / `guides.ts` 的 URL，改名须同步改代码或做 Storage 内迁移，否则生产 404。

---

## 9. 相关任务与代码

| 项 | 位置 |
|----|------|
| URL 拼接 | `src/lib/site-media.ts` |
| Bucket 分类 | `src/lib/admin/buckets.ts` |
| 营销任务 T052 / T053 | `src/lib/data/marketing-plan-2026.ts` |
| 发帖自检「素材文件名符合 T004」 | `src/lib/data/social-posting-plan-2026.ts` |

---

*文档版本：与仓库 T004 交付同步；更新本页时请在任务 notes 或 PR 中简述变更要点。*
