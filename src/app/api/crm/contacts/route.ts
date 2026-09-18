import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminApi } from '@/lib/auth/admin';
import { listContacts, createContactFromForm } from '@/lib/crm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!verifyAdminApi()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const status = searchParams.get('status') as string | undefined;
  const source = searchParams.get('source') as string | undefined;
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const result = await listContacts({ status: status as any, source: source as any, limit, offset });
    return NextResponse.json(result);
  } catch (err) {
    console.error('[CRM contacts GET]', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdminApi()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const contact = await createContactFromForm(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (err) {
    console.error('[CRM contacts POST]', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
