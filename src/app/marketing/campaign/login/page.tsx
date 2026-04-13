'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const rawNext = searchParams.get('next');
  const nextPath =
    rawNext &&
    !rawNext.includes('..') &&
    (rawNext.startsWith('/marketing/campaign') || rawNext === '/campaign/social')
      ? rawNext
      : '/marketing/campaign';
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/marketing/campaign-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || '登录失败');
        return;
      }
      window.location.assign(nextPath);
    } catch {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-warm-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-warm-200 bg-white p-8 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">CTS Tours</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-accent">营销统筹看板</h1>
        <p className="mt-2 text-sm text-gray-600">请输入访问密码后继续。</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="mp-password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <input
              id="mp-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-warm-200 px-3 py-2 text-accent shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95 disabled:opacity-60"
          >
            {loading ? '验证中…' : '进入看板'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-primary underline-offset-2 hover:underline">
            返回网站首页
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function MarketingPlanLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-warm-50 flex items-center justify-center">
          <p className="text-gray-600">加载中…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
