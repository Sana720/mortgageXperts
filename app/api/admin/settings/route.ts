/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const rows = await executeQuery('SELECT `key`, `value` FROM global_settings');
    const settings: Record<string, string> = {};
    rows.forEach((row: any) => {
      settings[row.key] = row.value;
    });
    return NextResponse.json({ settings });
  } catch (error: any) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Database connection or query failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    for (const [key, value] of Object.entries(body)) {
      if (typeof key === 'string' && typeof value === 'string') {
        await executeQuery(
          'INSERT INTO global_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)',
          [key, value]
        );
      }
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to save settings:', error);
    return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
  }
}
