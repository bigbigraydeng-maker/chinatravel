'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin';
  const err = searchParams.get('error');

  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Login failed');
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="rounded-xl border border-warm-200 bg-white p-8 shadow-sm">
      <h1 className="font-serif text-2xl font-semibold text-accent">Admin sign-in</h1>
      <p className="mt-2 text-sm text-warm-700">
        Enter the admin key configured as <code className="rounded bg-warm-100 px-1">ADMIN_SECRET_KEY</code> on the server.
      </p>
      {err === 'config' && (
        <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
          Admin is not configured: set <code>ADMIN_SECRET_KEY</code> (and{' '}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> for storage APIs) in the environment.
        </p>
      )}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-warm-900">Admin key</label>
          <input
            type="password"
            autoComplete="off"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="mt-1 w-full rounded border border-warm-300 px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        {message && <p className="text-sm text-red-700">{message}</p>}
      </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<p className="text-sm text-warm-600">Loading…</p>}>
      <LoginForm />
    </Suspense>
  );
}
