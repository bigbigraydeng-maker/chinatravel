# Supabase Storage 设置指南

## ✅ 已完成
- ✅ 96张图片已优化，压缩率65%（从201MB → 70MB）
- ✅ 修复损坏的shanghai hero.jpg文件
- ✅ 生成了迁移清单（optimized/migration-manifest.json）

## 🚀 Phase 2: Supabase Storage 配置步骤

### 步骤1：创建存储桶（Storage Buckets）

打开 [Supabase Dashboard](https://app.supabase.com) → 选择 ChinaTravel 项目

#### 1.1 创建 `tour-images` bucket
- 点击 "Storage" → "New bucket"
- 名称：`tour-images`
- 访问：`Public` （必须选择Public，以允许未认证用户读取）
- 文件大小限制：50MB
- 点击 "Create bucket"

#### 1.2 创建 `guide-images` bucket
- 重复上述过程
- 名称：`guide-images`
- 其他配置相同

#### 1.3 创建 `credential-images` bucket（可选）
- 用于存储证书/徽章图片
- 配置同上

### 步骤2：配置 RLS（Row Level Security）策略

在 Supabase Dashboard 中执行以下 SQL（SQL Editor）：

```sql
-- 允许所有人读取 tour-images 和 guide-images
CREATE POLICY "public_read_tour_images" ON storage.objects
FOR SELECT
USING (bucket_id = 'tour-images');

CREATE POLICY "public_read_guide_images" ON storage.objects
FOR SELECT
USING (bucket_id = 'guide-images');

-- 允许所有人读取 credential-images
CREATE POLICY "public_read_credential_images" ON storage.objects
FOR SELECT
USING (bucket_id = 'credential-images');

-- 管理员写入策略（暂时允许所有人，后续可限制）
-- 注：需要在应用中检查user权限
CREATE POLICY "admin_insert_tour_images" ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'tour-images');

CREATE POLICY "admin_insert_guide_images" ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'guide-images');

CREATE POLICY "admin_insert_credential_images" ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'credential-images');

-- 删除策略
CREATE POLICY "admin_delete_tour_images" ON storage.objects
FOR DELETE
USING (bucket_id = 'tour-images');

CREATE POLICY "admin_delete_guide_images" ON storage.objects
FOR DELETE
USING (bucket_id = 'guide-images');

CREATE POLICY "admin_delete_credential_images" ON storage.objects
FOR DELETE
USING (bucket_id = 'credential-images');
```

### 步骤3：上传优化后的图片

使用提供的迁移脚本：

```bash
# 首先确保有 SUPABASE_URL 和 SUPABASE_ANON_KEY 环境变量
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_ANON_KEY="your-anon-key"

# 运行迁移脚本
npx ts-node scripts/migrate-to-supabase.ts
```

脚本将：
1. 读取 `optimized/` 目录中的所有图片
2. 按目录分类上传到对应的bucket
3. 生成URL映射表
4. 生成迁移报告

### 步骤4：验证上传

脚本完成后，验证图片已上传：

```bash
# 获取 Supabase URL（从仪表板）
# 访问以下URL检查图片是否可访问
https://[supabase-project-id].supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.webp
```

## 📋 文件夹映射

| 源目录 | 目标Bucket | 说明 |
|--------|-----------|------|
| `public/images/tours/` | `tour-images` | 旅游图片 |
| `public/images/guides/` | `guide-images` | 指南图片 |
| `public/images/credentials/` | `credential-images` | 证书/徽章 |
| `public/images/` (根目录) | `tour-images` | 根目录图片 |

## 🔗 URL 转换规则

上传后，图片URL将变为：

```
原始：/images/tours/chengdu-pandas.jpg
优化后：https://[project-id].supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.webp
```

代码中使用新URL后，可以删除本地的 `public/images` 目录（保留logo等核心资产）。

## ✅ 检查清单

- [ ] 创建了 `tour-images` bucket
- [ ] 创建了 `guide-images` bucket
- [ ] 创建了 `credential-images` bucket
- [ ] 配置了RLS策略
- [ ] 成功上传了所有优化后的图片
- [ ] 验证了URL可访问
- [ ] 更新了代码中的图片引用
- [ ] 测试了响应式加载

## 📞 故障排除

### 错误："bucket already exists"
- 说明bucket已存在，跳过创建步骤，进行到配置RLS

### 错误："permission denied"
- 检查是否配置了RLS策略
- 验证策略中的bucket_id是否正确

### 无法上传文件
- 检查文件大小（< 50MB限制）
- 验证bucket名称拼写正确
- 检查Supabase API密钥是否有效

---

**下一步**：Phase 3 - 代码集成和URL引用更新
