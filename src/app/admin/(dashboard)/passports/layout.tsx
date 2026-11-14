import type { Metadata } from 'next';
import PassportShell from '@/components/admin/passports/PassportShell';

export const metadata: Metadata = { title: '护照管理 · CTS Admin', robots: { index: false, follow: false } };

export default function PassportsLayout({ children }: { children: React.ReactNode }) {
  return <PassportShell>{children}</PassportShell>;
}
