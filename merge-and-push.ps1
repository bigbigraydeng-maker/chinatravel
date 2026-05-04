#!/usr/bin/env pwsh
# 自动化脚本：完成视频提交的 Git 合并和推送

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CTS Tours - 视频行程路线合并与推送" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 步骤 1：检查当前 Git 状态
Write-Host "`n[1/4] 检查 Git 状态..." -ForegroundColor Yellow
git status

# 步骤 2：确保有最新的远程更改，用 rebase 方式（更干净）
Write-Host "`n[2/4] 从远程拉取最新更改（使用 rebase）..." -ForegroundColor Yellow
git pull --rebase origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ git pull 失败，中止操作" -ForegroundColor Red
    exit 1
}

# 步骤 3：推送本地提交到远程
Write-Host "`n[3/4] 推送到远程仓库..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ git push 失败，中止操作" -ForegroundColor Red
    exit 1
}

# 步骤 4：验证推送成功
Write-Host "`n[4/4] 验证推送成功..." -ForegroundColor Yellow
Write-Host "`n最新 3 条提交：" -ForegroundColor Cyan
git log --oneline -3

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✅ 成功完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "`n📋 接下来的步骤：" -ForegroundColor Cyan
Write-Host "  1. Render 会自动部署（2-3 分钟）"
Write-Host "  2. 访问页面验证：https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities"
Write-Host "  3. 向下滚动到 'Day-by-Day Itinerary' 部分验证视频加载"
Write-Host "  4. 测试视频播放、控制栏、全屏等功能`n"
