'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/image-manager', label: '图片管家' },
  { href: '/admin/images', label: 'Images (table)' },
  { href: '/admin/images/upload', label: 'Upload' },
  { href: '/admin/images/analyze', label: 'Analyze' },
  { href: '/admin/tour-parser', label: '行程解析' },
];

/** 标题跟着当前模块走 —— dashboard 根页面不该顶着 "Image management" */
function sectionTitle(pathname: string | null): string {
  if (pathname?.startsWith('/admin/image')) return 'Image management';
  if (pathname?.startsWith('/admin/tour-parser')) return 'Tour parser';
  return 'CTS operations';
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-warm-200 bg-accent text-white">
      <div className="container mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary/90">CTS Admin</p>
          <h1 className="font-serif text-xl font-semibold">{sectionTitle(pathname)}</h1>
        </div>
        <nav className="flex flex-wrap gap-2">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== '/admin' && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? 'bg-primary text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            type="button"
            className="rounded-md px-3 py-2 text-sm font-medium bg-white/10 hover:bg-white/20"
            onClick={async () => {
              await fetch('/api/admin/auth', { method: 'DELETE', credentials: 'include' });
              window.location.href = '/admin/login';
            }}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
