import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TailorMadeEditor from '@/components/admin/TailorMadeEditor';
import { getItinerary } from '@/lib/tailor-made/store';

export const metadata: Metadata = {
  title: '编辑行程单 | CTS Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function TailorMadeEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await getItinerary(id);
  if (!record) notFound();

  return (
    <div className="space-y-4">
      <Link href="/admin/tailor-made" className="text-sm text-gray-500 hover:text-primary">
        ← 返回行程单列表
      </Link>
      <TailorMadeEditor record={record} />
    </div>
  );
}
