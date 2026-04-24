'use client'

import { useState } from 'react'
import { ItineraryRequest } from '@/lib/itinerary/engine'

interface ItineraryFormProps {
  onSubmit: (request: ItineraryRequest) => Promise<void>
  isLoading?: boolean
}

// 本系统仅支持新西兰本地目的地（OP 行程生成器）
const DESTINATIONS = [
  { value: 'auckland', label: '🇳🇿 奥克兰（北岛）' },
  { value: 'rotorua', label: '🇳🇿 罗托鲁阿（地热）' },
  { value: 'queenstown', label: '🇳🇿 皇后镇（南岛）' },
  { value: 'hobbiton', label: '🇳🇿 霍比特人村' },
  { value: 'waitomo', label: '🇳🇿 怀托摩（萤火虫洞）' },
  { value: 'taupo', label: '🇳🇿 陶波湖' },
]

const CUSTOMER_TYPES = [
  { value: 'reward', label: '奖励旅游（高端豪华）' },
  { value: 'family', label: '家庭旅游（舒适便利）' },
  { value: 'couple', label: '蜜月旅游（浪漫温馨）' },
  { value: 'adventure', label: '冒险旅游（刺激探险）' },
  { value: 'student', label: '学生旅游（经济实惠）' },
]

const PREFERENCES = [
  { value: 'cultural', label: '文化遗产' },
  { value: 'nature', label: '自然风景' },
  { value: 'food', label: '美食体验' },
  { value: 'adventure', label: '冒险活动' },
  { value: 'shopping', label: '购物体验' },
  { value: 'modern', label: '现代风情' },
]

/**
 * OP 表单组件
 */
export default function ItineraryForm({ onSubmit, isLoading = false }: ItineraryFormProps) {
  const [formData, setFormData] = useState<Partial<ItineraryRequest>>({
    customer: {
      name: '',
      email: '',
      phone: '',
      groupSize: 1,
    },
    destination: 'auckland',
    days: 5,
    budget: 50000,
    customerType: 'reward',
    preferences: ['cultural', 'nature'],
  })

  const handleCustomerChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer!,
        [field]: value,
      },
    }))
  }

  const handlePreferenceChange = (preference: string) => {
    setFormData((prev) => {
      const currentPrefs = prev.preferences || []
      const newPrefs = currentPrefs.includes(preference)
        ? currentPrefs.filter((p) => p !== preference)
        : [...currentPrefs, preference]
      return { ...prev, preferences: newPrefs }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 验证表单
    if (
      !formData.customer?.name ||
      !formData.customer?.email ||
      !formData.destination ||
      !formData.days ||
      !formData.budget ||
      !formData.customerType
    ) {
      alert('请填写所有必填字段')
      return
    }

    await onSubmit(formData as ItineraryRequest)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 客户信息 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          客户姓名 *
        </label>
        <input
          type="text"
          value={formData.customer?.name || ''}
          onChange={(e) => handleCustomerChange('name', e.target.value)}
          placeholder="李四"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          邮箱地址 *
        </label>
        <input
          type="email"
          value={formData.customer?.email || ''}
          onChange={(e) => handleCustomerChange('email', e.target.value)}
          placeholder="lisi@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          电话号码
        </label>
        <input
          type="tel"
          value={formData.customer?.phone || ''}
          onChange={(e) => handleCustomerChange('phone', e.target.value)}
          placeholder="+64 20 123 4567"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          人数
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={formData.customer?.groupSize || 1}
          onChange={(e) => handleCustomerChange('groupSize', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* 行程参数 */}
      <div className="border-t border-warm-200 pt-4">
        <h3 className="font-medium text-gray-700 mb-4">行程参数</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            目的地 *
          </label>
          <select
            value={formData.destination || ''}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {DESTINATIONS.map((dest) => (
              <option key={dest.value} value={dest.value}>
                {dest.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            天数 *
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="2"
              max="14"
              value={formData.days || 5}
              onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm font-medium text-primary w-12">
              {formData.days} 天
            </span>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            总预算（元） *
          </label>
          <div className="flex items-center gap-2">
            <span>¥</span>
            <input
              type="number"
              min="10000"
              step="10000"
              value={formData.budget || 50000}
              onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            人均预算：¥ {Math.round((formData.budget || 50000) / (formData.customer?.groupSize || 1))}
          </p>
        </div>
      </div>

      {/* 客户类型 */}
      <div className="border-t border-warm-200 pt-4">
        <h3 className="font-medium text-gray-700 mb-3">客户类型 *</h3>
        <div className="space-y-2">
          {CUSTOMER_TYPES.map((type) => (
            <label key={type.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="customerType"
                value={type.value}
                checked={formData.customerType === type.value}
                onChange={(e) => setFormData({ ...formData, customerType: e.target.value as any })}
                className="w-4 h-4"
              />
              <span className="text-sm">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 偏好 */}
      <div className="border-t border-warm-200 pt-4">
        <h3 className="font-medium text-gray-700 mb-3">旅游偏好</h3>
        <div className="space-y-2">
          {PREFERENCES.map((pref) => (
            <label key={pref.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.preferences?.includes(pref.value) || false}
                onChange={() => handlePreferenceChange(pref.value)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">{pref.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            生成中...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6h-6" />
            </svg>
            生成行程
          </>
        )}
      </button>
    </form>
  )
}
