import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get('page_path');

  try {
    if (pagePath) {
      const rows = await executeQuery('SELECT * FROM page_content WHERE page_path = ?', [pagePath]);
      if (rows && rows.length > 0) {
        return NextResponse.json({ content: rows[0].content });
      } else {
        return NextResponse.json({ content: '' });
      }
    } else {
      return NextResponse.json({ error: 'page_path is required' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Failed to fetch page content:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { page_path, content } = body;

    if (!page_path) {
      return NextResponse.json({ error: 'page_path is required' }, { status: 400 });
    }

    await executeQuery(
      `INSERT INTO page_content (page_path, content)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content)`,
      [page_path, content || '']
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to save page content:', error);
    return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
  }
}
