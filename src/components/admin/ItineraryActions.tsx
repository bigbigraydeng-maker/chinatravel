'use client'

import { useState } from 'react'
import { GeneratedItinerary } from '@/lib/itinerary/engine'

interface ItineraryActionsProps {
  itinerary: GeneratedItinerary
}

/**
 * 行程操作组件（PDF 导出、邮件发送等）
 */
export default function ItineraryActions({ itinerary }: ItineraryActionsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isExportingDocx, setIsExportingDocx] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [emailStatus, setEmailStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      const response = await fetch('/api/itinerary/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itinerary }),
      })

      if (!response.ok) {
        throw new Error('PDF 导出失败')
      }

      // 下载 PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `itinerary-${itinerary.request.customer.name}-${itinerary.id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('PDF 导出错误:', error)
      alert('PDF 导出失败，请重试')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportDocx = async () => {
    setIsExportingDocx(true)
    try {
      const response = await fetch('/api/itinerary/export-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itinerary }),
      })

      if (!response.ok) {
        throw new Error('Word 导出失败')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `itinerary-${itinerary.request.customer.name}-${itinerary.id}.docx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Word 导出错误:', error)
      alert('Word 导出失败，请重试')
    } finally {
      setIsExportingDocx(false)
    }
  }

  const handleSendEmail = async () => {
    setIsSending(true)
    setEmailStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/itinerary/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itinerary }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || '邮件发送失败')
      }

      setEmailStatus({
        type: 'success',
        message: `✅ 行程已成功发送至 ${itinerary.request.customer.email}`,
      })

      // 3 秒后清除成功提示
      setTimeout(() => {
        setEmailStatus({ type: null, message: '' })
      }, 3000)
    } catch (error) {
      console.error('邮件发送错误:', error)
      setEmailStatus({
        type: 'error',
        message: `❌ ${error instanceof Error ? error.message : '邮件发送失败'}`,
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(itinerary, null, 2))
      alert('✅ 已复制到剪贴板')
    } catch (error) {
      alert('❌ 复制失败')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-warm-200 p-6 space-y-4">
      <h3 className="font-serif font-bold text-lg">导出与分享</h3>

      {/* 状态提示 */}
      {emailStatus.type && (
        <div
          className={`p-3 rounded-lg text-sm ${
            emailStatus.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {emailStatus.message}
        </div>
      )}

      {/* 操作按钮 */}
      <div className="space-y-2">
        {/* Word 导出（推荐：员工编辑草稿） */}
        <button
          onClick={handleExportDocx}
          disabled={isExportingDocx}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isExportingDocx ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              生成中...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              下载 Word 草稿（可编辑）
            </>
          )}
        </button>

        {/* PDF 导出暂时隐藏 —— 中文字体支持需要重做（计划用 HTML→PDF 方案替换 pdfkit） */}
        {/* 保留 handler 备用：handleExportPDF, isExporting */}
        <div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-3">
          💡 <strong>PDF 输出维护中</strong>：当前推荐使用「Word 草稿」编辑后另存为 PDF。
        </div>

        <button
          onClick={handleSendEmail}
          disabled={isSending}
          className="w-full py-3 px-4 bg-secondary hover:bg-secondary/90 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSending ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              发送中...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              邮件发送到客户
            </>
          )}
        </button>

        <button
          onClick={handleCopyJSON}
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          复制 JSON 数据
        </button>
      </div>

      {/* 快速参考 */}
      <div className="border-t border-warm-100 pt-4 text-xs text-gray-600 space-y-1">
        <p><strong>📧 邮件收件人：</strong> {itinerary.request.customer.email}</p>
        <p><strong>⏰ 生成时间：</strong> {new Date(itinerary.createdAt).toLocaleString('zh-CN')}</p>
        <p><strong>🔗 行程 ID：</strong> {itinerary.id}</p>
      </div>
    </div>
  )
}
