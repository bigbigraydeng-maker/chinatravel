# PDF 导出功能问题诊断

## 问题描述
用户在 `/itinerary-generator` 页面尝试导出 PDF 时，收到 HTTP 500 错误。按钮显示"导出中..."后无法完成，最终显示"PDF 导出失败，请重试"。

## 问题状态
**已诊断，未部署**

## 根本原因分析

### 症状
- 所有 PDF 导出请求返回 HTTP 500
- 错误消息模糊，无具体诊断信息
- 用户无法下载任何目的地的 PDF

### 根本原因
**目的地映射不完整** - PDF 导出代码存在的两个关键问题：

1. **变量名称与实际功能不符**
   - 变量名：`NZ_DESTINATION_IMAGES`（暗示仅新西兰）
   - 实际用途：支持全球 13 个目的地
   - 代码位置：`src/app/api/itinerary/export-pdf/route.ts` 第 16-23 行

2. **目的地覆盖不完整**
   - ✅ 已定义：6 个新西兰目的地（auckland, rotorua, queenstown, hobbiton, waitomo, taupo）
   - ❌ 缺失：7 个中国目的地（beijing, xian, shanghai, chengdu, guilin, zhangjiajie, yunnan）
   - 系统支持：13 个目的地总计

### 失败流程
```
用户选择 destination="beijing" 
  ↓
API 收到请求，调用 generatePDFBuffer()
  ↓
loadAndAddImage() 尝试获取图片 URL
  ↓
DESTINATION_IMAGES["beijing"] = undefined ❌
  ↓
fetch(undefined) 抛出错误
  ↓
错误在 catch 块捕获
  ↓
返回 HTTP 500 + "PDF 生成失败"
```

## 代码位置

| 文件 | 行号 | 问题 |
|------|------|------|
| `src/app/api/itinerary/export-pdf/route.ts` | 16-23 | 目的地列表不完整 |
| `src/app/api/itinerary/export-pdf/route.ts` | 152 | 使用了错误的变量名 |

## 相关架构

**前端流程：**
```
页面: /itinerary-generator (page.tsx)
  ↓
表单: ItineraryForm.tsx → 支持 13 个目的地
  ↓
API 调用: /api/itinerary/generate → 生成行程
  ↓
组件: ItineraryActions.tsx → "下载精美 PDF" 按钮
  ↓
API 调用: /api/itinerary/export-pdf → ❌ 仅支持 6 个目的地
```

**后端组件：**
- `ItineraryGenerator.generate()` - 支持全部 13 个目的地的行程生成
- PDF 导出 API - ❌ 仅支持新西兰目的地

## 修复方案

### 需要做的
1. 将 `NZ_DESTINATION_IMAGES` 重命名为 `DESTINATION_IMAGES`
2. 为 7 个中国目的地添加 Unsplash CDN 图片 URL
3. 更新所有对旧变量名的引用

### 修复影响范围
- **文件修改数：** 1 个文件
- **变更行数：** ~20 行（添加目的地定义）
- **向后兼容性：** ✅ 完全兼容（仅扩展功能，不改变 API）
- **部署风险：** ⬜ 低（纯数据添加）

## 验证要点

修复后应该验证：
1. ✅ 中国目的地 PDF 导出成功（HTTP 200）
2. ✅ 新西兰目的地 PDF 导出仍正常
3. ✅ PDF 文件可以打开
4. ✅ PDF 包含正确的图片和文本
5. ✅ 中文文本显示无乱码

## 相关文件清单

| 文件 | 用途 | 是否需修改 |
|------|------|----------|
| `src/app/api/itinerary/export-pdf/route.ts` | PDF 导出 API | ✅ 需要 |
| `src/app/api/itinerary/generate/route.ts` | 行程生成 API | ❌ 无需 |
| `src/components/admin/ItineraryForm.tsx` | 目的地选择表单 | ❌ 无需 |
| `src/components/admin/ItineraryActions.tsx` | PDF 导出按钮 | ❌ 无需 |
| `src/lib/itinerary/engine.ts` | 行程生成逻辑 | ❌ 无需 |

## 下一步
- 修复 `src/app/api/itinerary/export-pdf/route.ts`
- 测试所有 13 个目的地
- 提交 PR
- 部署到生产环境
