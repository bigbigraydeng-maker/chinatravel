import { NextResponse } from 'next/server';

/**
 * Placeholder: production would validate auth, write blogs.ts / DB, revalidate.
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        'Publish API not implemented. Merge posts via PR or Supabase sync. Client panel updates local state only.',
    },
    { status: 501 }
  );
}
