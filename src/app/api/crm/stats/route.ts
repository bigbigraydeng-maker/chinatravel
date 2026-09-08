import { NextResponse } from 'next/server';
import { verifyAdminApi } from '@/lib/auth/admin';
import { getCrmStats } from '@/lib/crm';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!verifyAdminApi()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = await getCrmStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error('[CRM stats]', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
