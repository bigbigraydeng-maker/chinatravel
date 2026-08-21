# CTS WhatsApp + Messenger Webhook Setup Guide

## 系统架构图

```
客户发消息
   │
   ├─ WhatsApp Business ──→ Meta Cloud API ──→ POST /api/webhooks/whatsapp
   │                                                   │
   └─ Facebook Messenger ──→ Meta Cloud API ──→ POST /api/webhooks/messenger
                                                        │
                                          ┌─────────────▼──────────────┐
                                          │    自动回复引擎 (CRM lib)    │
                                          │  匹配关键词 → 发送回复消息    │
                                          └─────────────┬──────────────┘
                                                        │
                                          ┌─────────────▼──────────────┐
                                          │    Supabase CRM 数据库      │
                                          │  crm_contacts (联系人)       │
                                          │  crm_conversations (会话)    │
                                          │  crm_messages (消息记录)     │
                                          └─────────────┬──────────────┘
                                                        │
                                          ┌─────────────▼──────────────┐
                                          │  /admin/crm (CRM管理后台)   │
                                          │  列表 + 看板 + 对话历史       │
                                          └────────────────────────────┘
```

---

## Step 1: 申请 Meta App（WhatsApp + Messenger 共用）

1. 访问 https://developers.facebook.com
2. 创建新 App → **Business** 类型
3. 添加产品：
   - **WhatsApp** → 进入 API Setup
   - **Messenger** → 进入 Settings

---

## Step 2: WhatsApp Business Cloud API 配置

### 获取凭证（在 Meta for Developers）

| 变量名 | 哪里找 |
|--------|--------|
| `WHATSAPP_ACCESS_TOKEN` | App → WhatsApp → API Setup → Temporary token（测试用）或 System User Token（生产用） |
| `WHATSAPP_PHONE_NUMBER_ID` | App → WhatsApp → API Setup → Phone Number ID |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | 自己随机设置，如 `cts-wa-verify-abc123` |

### 配置 Webhook

1. App → WhatsApp → Configuration → Webhook
2. Callback URL: `https://www.ctstours.co.nz/api/webhooks/whatsapp`
3. Verify Token: 填写你的 `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
4. Subscribe 字段勾选：`messages`
5. 点击 **Verify and Save**

### 测试

```bash
# 发送测试消息给你的 WhatsApp Business 号码
# 系统应该在2秒内自动回复欢迎消息
```

---

## Step 3: Messenger 配置

### 获取凭证

| 变量名 | 哪里找 |
|--------|--------|
| `MESSENGER_PAGE_ACCESS_TOKEN` | App → Messenger → Settings → Access Tokens → Generate Token（选择你的Facebook Page） |
| `MESSENGER_WEBHOOK_VERIFY_TOKEN` | 自己随机设置，如 `cts-msg-verify-xyz789` |

### 配置 Webhook

1. App → Messenger → Settings → Webhooks
2. Callback URL: `https://www.ctstours.co.nz/api/webhooks/messenger`
3. Verify Token: 填写你的 `MESSENGER_WEBHOOK_VERIFY_TOKEN`
4. Subscribe 字段勾选：`messages`, `messaging_postbacks`
5. 点击 **Verify and Save**
6. 在 "Add Subscriptions" 选择你的 Facebook Page

---

## Step 4: Supabase 数据库迁移

在 Supabase Dashboard → SQL Editor 执行：

```sql
-- 文件路径: supabase/migrations/20260618_create_crm_tables.sql
-- 复制该文件内容并执行
```

或通过 Supabase CLI：
```bash
supabase db push
```

---

## Step 5: 在 Render 配置环境变量

在 Render Dashboard → Environment 添加：

```
WHATSAPP_ACCESS_TOKEN=EAAxxxxxx...
WHATSAPP_PHONE_NUMBER_ID=1234567890123
WHATSAPP_WEBHOOK_VERIFY_TOKEN=cts-wa-verify-secret

MESSENGER_PAGE_ACCESS_TOKEN=EAAxxxxxx...
MESSENGER_WEBHOOK_VERIFY_TOKEN=cts-msg-verify-secret
```

---

## Step 6: 访问 CRM 后台

URL: `https://www.ctstours.co.nz/admin/crm`

- 使用 `ADMIN_SECRET_KEY` 登录
- 查看所有 WhatsApp + Messenger 来的 leads
- 切换 Table / Pipeline 视图
- 点击 lead 查看完整对话历史
- 手动发送消息

---

## 自动回复模板

系统内置7个模板（存储在 Supabase `crm_auto_replies` 表）：

| 模板 | 触发关键词 |
|------|-----------|
| 欢迎消息 | hi, hello, hey, kia ora, enquiry... |
| 行程/价格 | tour, price, cost, 2026, package... |
| 免签信息 | visa, passport, nz passport... |
| 定制行程 | tailor, custom, private, bespoke... |
| 联系顾问 | call, phone, speak, consultant... |
| 北京相关 | beijing, great wall, forbidden city... |
| 通用回复 | （所有其他消息的默认回复） |

如需修改模板，直接在 Supabase Dashboard 的 `crm_auto_replies` 表编辑即可。

---

## 生产部署检查清单

- [ ] Meta App 已创建，App Review 通过（发送给非测试用户需要审核）
- [ ] WhatsApp Business Account 已连接
- [ ] Facebook Page 已连接 Messenger
- [ ] 所有环境变量在 Render 已配置
- [ ] Supabase 迁移已执行（4个 CRM 表创建完成）
- [ ] Webhook 验证通过（两个端点都有 ✅）
- [ ] 测试消息：发 "hi" 给 WhatsApp Business 号 → 收到自动回复
- [ ] 测试消息：发 "hi" 给 Facebook Page → 收到自动回复
- [ ] CRM 后台可以看到这两条 leads

---

## WhatsApp 24小时窗口规则

Meta 规定：用户主动发消息后，你有 **24小时** 可以自由回复。
超过24小时后，必须使用审核过的 **Message Template** 才能主动发起消息。

CTS 建议：在24小时窗口内完成人工跟进，或让客户填写网站表单。
