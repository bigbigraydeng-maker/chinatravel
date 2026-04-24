'use client'

import { useState } from 'react'
import { ItineraryRequest, GeneratedItinerary } from '@/lib/itinerary/engine'
import ItineraryForm from '@/components/admin/ItineraryForm'
import ItineraryPreview from '@/components/admin/ItineraryPreview'
import ItineraryActions from '@/components/admin/ItineraryActions'

/**
 * OP 行程生成器主页面
 * 完整的表单 → 生成 → 预览 → 导出流程
 * 已移出 /admin 路由，无需认证
 */
export default function ItineraryGeneratorPage() {
  const [currentItinerary, setCurrentItinerary] = useState<GeneratedItinerary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (request: ItineraryRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      // 调用服务端生成行程
      const response = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || '行程生成失败')
      }

      const itinerary = await response.json()
      setCurrentItinerary(itinerary)
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误')
      console.error('Generation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-50">
      {/* 页头 */}
      <div className="border-b border-warm-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-serif font-bold text-accent">行程生成器</h1>
          <p className="text-gray-600 mt-2">为客户快速生成定制化旅游行程</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">❌ 错误</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* 两栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：表单 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-warm-200 p-6">
              <h2 className="text-lg font-serif font-bold mb-4">客户信息与偏好</h2>
              <ItineraryForm
                onSubmit={handleGenerate}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* 右侧：预览和操作 */}
          <div className="lg:col-span-2">
            {currentItinerary ? (
              <div className="space-y-6">
                {/* 预览 */}
                <ItineraryPreview itinerary={currentItinerary} />

                {/* 操作按钮 */}
                <ItineraryActions itinerary={currentItinerary} />
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-warm-200 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">
                  填写左侧表单生成行程
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  系统将根据客户信息、天数、预算和偏好推荐景点和住宿
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
