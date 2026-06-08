# Wave 3 — Lookalike 受众 + Meta Pixel 验证 + Publer 排期

> **目标**：Token 到位后，把 Wave 1/2 内容真正推上线
> **依赖**：META_SYSTEM_USER_TOKEN_CTS 配 Render (PM 跑 SOP)
> **预计耗时**：2-3 小时（含 Lookalike 上传 + Pixel 验证 + Publer 28 篇 organic 排期）

---

## ⏪ Step 0: 前置依赖检查

新窗口 Claude 启动 Wave 3 前必须确认：

| 依赖项 | 验证方法 | 状态 |
|---|---|---|
| **META_SYSTEM_USER_TOKEN_CTS 配 Render** | 问 PM / 看 ME 后台调用 Meta API 是否 401 | ⚠️ 待 PM 跑 SOP |
| **Meta Ad Account active**: `act_2202695063810470` | Meta Business Settings → Ad Accounts | ✅ PM 已确认 |
| **CTS FB Page active**: https://www.facebook.com/CTSTOURS/ | 浏览器访问 | ✅ |
| **Publer integration active** | ME 后台 lib/publer/ + 验证 PM Publer 账号 link CTS Page | ⚠️ 检查 |

依赖未通过 → 停手等 PM。

---

## 🎯 Step 1: Meta Pixel 健康验证

### Pixel ID 拿到（从 CTS BM 业务资产组里 Pixels 标签）

### 验证 form_submit conversion event

```
打开 https://www.facebook.com/events_manager2/
→ 选 CTS Pixel
→ Overview tab 看过去 7 天 events
→ 找 form_submit / lead / contact event
→ 如果 0 events: 跑 Test Events 工具去 ctstours.co.nz 提一个表单测试
→ 如果还是 0: 网站埋 Pixel 代码可能不完整，找 PM 协助
```

### conversion event 标为 ACTIVE conversion goal

```
events_manager → Pixel → Conversion → Aggregated Event Measurement
→ 把 form_submit 放进 top 8 conversion events 优先级
```

---

## 👥 Step 2: Lookalike 受众建立

### 数据源：CTS 历史客户名单

**R1 红线**：客户名单是 PII，不允许新窗口 Claude 直接访问。
- PM 自己导出 CRM / Mailchimp / Resend 等系统的历史客户邮箱 + 电话（哈希前的原始数据）
- PM 上传到 Meta Audience tool（Meta 自己哈希）

### Lookalike 配置

```
Meta Audiences → Create Audience → Custom Audience → Customer List
- Upload: CTS 历史客户 (过去 2 年)
- Match rate target: > 60%

→ 然后基于 Custom Audience 建 Lookalike
→ Country: New Zealand
→ Audience size: 
  - 1% (~ 50k people) - top match
  - 2-3% (~ 100-150k) - broader reach
  - 5% (~ 250k) - largest

→ Total 3 个 Lookalike 受众建好
```

### Lookalike 使用策略

- **Campaign A Best of China**: 1% LAL + Custom Audience（retargeting 历史客户）
- **Campaign B Tale of Two Cities**: 1% LAL + 关键词兴趣 (China travel)
- **Campaign C Shanghai & Surroundings**: 1-3% LAL + 关键词兴趣 (Asia travel)

---

## 📅 Step 3: Publer 排期 — Wave 1 28 篇 organic post

### Publer 不需要 Meta System User Token

Publer 自己有 OAuth flow，PM 之前应该已连 CTS FB Page。验证：
```
打开 https://publer.io/ → Workspaces → 看 CTS Workspace
→ 验证 FB Page CTSTOURS 已 link
→ 验证 IG 账号已 link (如果有)
```

### 排期表

| 日期 | 时段 (NZST) | Post | Pillar |
|---|---|---|---|
| 2026-06-15 Sun | 09:00 | W1-D1 #01 5 cities | destination |
| 2026-06-16 Mon | 18:00 | W1-D2 #02 15 vs 10 days | educational |
| 2026-06-17 Tue | 12:00 | W1-D3 #03 since 1928 | heritage |
| ... | ... | ... | ... |

（4 周 28 篇，由 W1-W4 spec 决定具体）

### Publer 上传节奏

不要一次 28 篇全上 — 分周上：
- W1 Friday: 上 W1 7 篇 (PM 已 review)
- W2 Friday: 上 W2 7 篇
- ...

---

## 🚀 Step 4: 6/15 启动

### Best of China 立即启动 (master_brief promotional 9/3 出发距今最近)

```
Meta Ads Manager → Campaign A → Status: ACTIVE
- Daily budget: NZD 30
- Optimization: form_submit
- Start: 立即 (PM 决定具体日，建议 R1 audit 通过后立即)
```

### Oct 两团 6/15 转 ACTIVE

```
Meta Ads Manager → Campaign B + C → Status: ACTIVE
- Daily budget: NZD 15 each
- Optimization: form_submit
- Start: 2026-06-15
```

---

## 📊 Step 5: 第一周监控

PM 每天 5 分钟 check：

| 指标 | Campaign A 健康 | Campaign B/C 健康 |
|---|---|---|
| Impressions/day | ≥ 1000 | ≥ 500 each |
| CTR | ≥ 1.5% | ≥ 1% |
| CPM | NZD 5-15 | NZD 5-20 |
| CPC | NZD 0.50-2.00 | NZD 0.50-2.50 |
| Form fills | ≥ 1/day after day 3 | ≥ 0.5/day after day 5 |
| CPA | ≤ NZD 100 | ≤ NZD 150 |

任何指标连续 3 天红线 → 暂停 + 复盘。

---

## ⚠️ R1 红线 (Wave 3 specific)

- **不允许新窗口 Claude 访问 CTS 客户 PII** — Lookalike 上传由 PM 自己做
- **不允许编 Pixel events 数据** — Pixel manager 截图说话
- **不允许假 ACTIVE Campaign**（绝对不要在 PM 不知道时调 Meta API 把 Campaign 转 ACTIVE）

---

## ✅ 提交 PM 的汇报模板

```markdown
# Wave 3 完成

## 完成
- Pixel 验证: ✅/❌ (form_submit events past 7 days = X)
- Lookalike 3 个建好: ✅ (1% / 2% / 5%)
- Publer W1 7 篇排期完成: ✅
- 6/15 Campaign 启动:
  - Campaign A Best of China: ACTIVE (start 2026-06-XX)
  - Campaign B Tale of Two Cities: ACTIVE (2026-06-15)
  - Campaign C Shanghai & Surroundings: ACTIVE (2026-06-15)

## 待 PM 决策
- [ ] Best of China 立即启动日: PM 拍板 XX
- [ ] 日预算分配是否调整
- [ ] Pixel 0 events 是否要先修 (如适用)

## 待跟踪
- 第一周每日监控 dashboard
- W2 7 篇 organic 上 Publer (6/22-6/28)
```
