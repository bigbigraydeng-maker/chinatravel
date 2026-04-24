# CTS 图片管家 (Image Manager) — 功能规格

**版本**: v1.0 — MVP
**创建日期**: 2026-04-23
**目标实施者**: Claude Code CLI (superpowers)
**预计工作量**: MVP 1-2 天；完整版 3-5 天

---

## 一、背景与痛点

当前 CTS 网站图片管理分散在多处：

- **Supabase Storage** (tour-images, guide-images, migrated/ buckets) 存实际文件
- **tours.ts / guides.ts** 存文件 URL 引用
- **Airtable CTS T061 April Social** 存 social 帖子的 `Image_URL` 字段
- **src/public/** 少量本地图片（credentials-tia.png 等）

**操作者痛点**：
1. 看到 Unsplash 好图或自拍好图，要走 Supabase Studio 上传 → 复制 URL → 找到对应 tours.ts 行/Airtable 记录 → 手动粘贴。这个流程**太长、易出错、没记录**
2. 不知道 bucket 里哪些图**被用了**、哪些**是孤儿**
3. 无法快速**预览 + 搜索**已上传的图
4. 无法**批量上传**或**拖拽替换**

**目标**：在 CTS 网站后台建一个 `/admin/image-manager` 页面，把上传-管理-绑定闭环在一个 UI 里。

---

## 二、功能范围

### MVP (Phase 1) — 必须做

1. **上传区**
   - 支持**拖拽 + 多选**上传
   - 上传前选择**目标 bucket + 文件夹路径**（例：`tour-images / destinations/`）
   - 自动生成规范文件名：
     - 优先保留原名（若符合 kebab-case）
     - 冲突时自动追加时间戳后缀
   - 上传进度条，成功后返回 Supabase 公开 URL
   - **一键复制 URL** 到剪贴板

2. **浏览区**
   - Grid 展示所有图（默认分页 40 张/页）
   - Bucket + 路径作为 tab / 面包屑
   - 缩略图 hover 显示：文件名、尺寸、上传日期、URL
   - 点击大图预览（lightbox）
   - 搜索框：按文件名模糊搜索

3. **图片操作**
   - 复制 URL（支持多种格式：直链、Next/Image `src`、Markdown）
   - 删除（带二次确认）
   - 重命名
   - 移动到其他文件夹/bucket

### Phase 2 — 核心增值（上线后 1 周内补）

4. **Airtable 社媒绑定**
   - 选中一张图 → 点「绑定到 Airtable 记录」→ 弹窗显示 Airtable 里待匹配的记录（Status=draft/ready 且 Image_URL 为空或 Unsplash 的）
   - 选中记录 → 自动把该图的 Supabase URL 写入该记录的 `Image_URL` 字段
   - 操作日志可见

5. **使用情况追踪**
   - 每张图显示「被 X 个地方引用」
   - 点击查看引用位置：`tours.ts:L123`、`Airtable rec3SuO6RKK8Wb1jg` 等
   - 孤儿图片视图：筛选出没被任何地方引用的图

### Phase 3 — 进阶（可选）

6. **AI 辅助**
   - 上传时自动 AI 描述（Claude Vision API）
   - 按关键词搜索（比如搜 "forbidden city"，返回所有包含该场景的图）
7. **批量操作**：批量压缩、批量重命名、批量移动
8. **版本历史**：替换图片时保留旧版本

---

## 三、技术架构

### 3.1 前端页面

**路由**: `/admin/image-manager`

**权限保护**: 复用现有 `MARKETING_PLAN_ACCESS_KEY` 模式
- `src/middleware.ts` 或页面顶部校验 Cookie
- 未登录重定向到 `/admin/login`（新建简单登录页）

**主组件结构**:
```
src/app/admin/image-manager/
  ├── page.tsx              # 主页面
  ├── login/page.tsx        # 登录页（可与 marketing/campaign/login 共用）
  └── components/
      ├── UploadDropzone.tsx    # 拖拽上传区
      ├── ImageGrid.tsx         # 图片网格
      ├── ImageCard.tsx         # 单张图卡片
      ├── ImageLightbox.tsx     # 预览弹窗
      ├── BucketPicker.tsx      # bucket + 路径选择
      └── AirtableBindModal.tsx # Phase 2: 绑定 Airtable 弹窗
```

**依赖库**:
- `react-dropzone` — 拖拽上传
- `@supabase/supabase-js` — Supabase 客户端（列文件、生成 URL）
- `lucide-react` — 图标（已在项目中）
- `yet-another-react-lightbox` 或自己实现 — 大图预览

### 3.2 后端 API

**路径**: `src/app/api/admin/images/`

| Endpoint | Method | 用途 |
|---|---|---|
| `/api/admin/images/upload` | POST | 接收 multipart/form-data，上传到 Supabase |
| `/api/admin/images/list` | GET | 列出指定 bucket + 路径下的所有文件（分页、搜索） |
| `/api/admin/images/delete` | DELETE | 删除文件 |
| `/api/admin/images/rename` | POST | 重命名文件（Supabase 用 move 实现） |
| `/api/admin/images/move` | POST | 移动文件 |
| `/api/admin/images/bind-airtable` | POST | Phase 2: 更新 Airtable 记录的 Image_URL |

**重要**：所有 API 必须校验 Cookie，未授权返回 401。

### 3.3 Supabase 配置

**需要的 env vars**:
```
NEXT_PUBLIC_SUPABASE_URL=https://qbturrydultenhlfmdcm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...           # 已有
SUPABASE_SERVICE_ROLE_KEY=...               # 新增：用于后端 API 的管理操作
AIRTABLE_API_KEY=...                        # 新增：Phase 2 用
AIRTABLE_BASE_ID=appEqUz46L20wy3JX
```

**Bucket 结构**（保持现状，不改现有文件）:
```
tour-images/           # 现有
  ├── destinations/    # 建议：按目的地分类
  ├── tours/           # 建议：按具体路线
  └── (root level)     # 现有散落的图

guide-images/          # 现有
  └── {destination}/hero/  # 现有结构

migrated/              # 现有
  ├── site/
  └── unsplash/

site-images/           # 新建：用于 credentials、团队照
social-images/         # 新建：用于社媒帖子
```

**RLS 策略**：所有管理操作走后端 API（用 Service Role Key），前端 anon key 仅用于 `getPublicUrl`。

### 3.4 Airtable 集成（Phase 2）

- 使用 Airtable API（REST）调用
- 关键字段：`fldcgAAHe28mdEa5P` (Image_URL)
- 筛选条件：`Status != 'published'` AND `Image_URL` contains 'unsplash' OR empty

---

## 四、UI 草图（文字描述）

### 主页面布局

```
+-------------------------------------------+
| CTS 图片管家           [用户] [退出]       |
+-------------------------------------------+
| [📁 tour-images▼] [> destinations▼]       |  ← bucket + 路径导航
| [🔍 搜索文件名...]                         |
+-------------------------------------------+
| ⬇️ 拖拽文件到此处上传 / 或点击选择          |  ← 上传区（折叠）
+-------------------------------------------+
| [图1][图2][图3][图4][图5]                 |
| [图6][图7][图8][图9][图10]                |  ← Grid 4 列 或 5 列
| ...                                       |
+-------------------------------------------+
| 共 142 张 · 第 1/4 页 · [< 上一页] [下一页 >] |
+-------------------------------------------+
```

### 单张图 hover 效果

```
┌────────────────┐
│   [预览图]      │
│                │
├────────────────┤
│ silk-road.jpg  │  ← 文件名
│ 1200×800 · 89KB│  ← 尺寸/大小
│ [📋 复制 URL]   │  ← hover 时浮出
│ [✏️ 重命名][🗑️] │
└────────────────┘
```

### 上传流程

1. 拖拽 N 张图到上传区
2. 右侧弹出 sidebar：
   - 每张图预览 + 文件名编辑框 + 目标路径选择
   - 批量操作：「全部重命名为 prefix-{序号}」
3. 点「确认上传」→ 显示上传进度
4. 完成后 Grid 刷新，新图高亮 3 秒

---

## 五、实施步骤（给 Claude Code CLI）

1. **搭骨架**
   - 创建 `src/app/admin/image-manager/page.tsx`（带登录校验）
   - 创建 5 个 API routes（`upload`、`list`、`delete`、`rename`、`move`）
   - 添加 `SUPABASE_SERVICE_ROLE_KEY` 到 `.env.local` 示例和 Render 配置

2. **UI 组件**（按 MVP 优先级）
   - UploadDropzone → ImageGrid → ImageCard → BucketPicker → ImageLightbox
   - 每个组件用 Tailwind，配色遵循 CLAUDE.md 里的 warm/primary token

3. **测试**
   - 上传不同格式（jpg/png/webp/gif）
   - 上传大文件（>5MB）验证进度条
   - 删除后 Grid 同步更新
   - 重命名后 URL 自动失效处理

4. **Phase 2 Airtable 集成**（单独 PR）

---

## 六、验收标准

### MVP 验收
- [ ] 能从本地拖 5 张图到页面，上传到指定 bucket/folder，全部成功
- [ ] Grid 能正确显示 tour-images 下的所有图（>100 张不卡）
- [ ] 搜索 "silk" 能筛出所有文件名含 silk 的图
- [ ] 点复制 URL，能粘贴到浏览器打开，图片可见
- [ ] 删除一张图，Grid 即时消失，Supabase Studio 里也真删了
- [ ] 重命名后，旧 URL 失效，新 URL 有效
- [ ] 未登录访问 `/admin/image-manager` 重定向到登录页
- [ ] 登录后刷新页面，不会被踢出

### Phase 2 验收
- [ ] 能把一张图绑定到 Airtable 某条记录，Airtable 的 `Image_URL` 即时更新
- [ ] 绑定前弹窗显示所有待绑定记录，默认按 Date 升序

---

## 七、非目标（不在此 Spec 范围内）

- 图片编辑（裁剪、滤镜）→ 让 Zhong 用 Photoshop/Figma
- 批量压缩 → 未来版本
- CDN 配置 → Supabase 已自带
- AI 自动描述 → Phase 3

---

## 八、参考

- 现有 Supabase URL 模式: `https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/{path}`
- Airtable Base ID: `appEqUz46L20wy3JX`
- Airtable Table ID (社媒): `tblrAqd8d8aFG7qQI`
- Airtable Field (Image_URL): `fldcgAAHe28mdEa5P`
- 类似成熟产品参考：Cloudinary Dashboard、Uploadcare、Imgix

---

**End of Spec**
