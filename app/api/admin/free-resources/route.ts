/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import crypto from 'crypto';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const rows = await executeQuery<any[]>('SELECT * FROM free_resources WHERE id = ?', [id]);
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
      }
      return NextResponse.json(rows[0]);
    }

    const rows = await executeQuery<any[]>('SELECT * FROM free_resources ORDER BY orderIndex ASC');
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Failed to fetch free resources:', error);
    return NextResponse.json({ error: 'Failed to fetch free resources' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, image, pdfUrl, detailsUrl, badge, orderIndex } = body;

    if (!title || !description || !image || !pdfUrl) {
      return NextResponse.json({ error: 'Missing required fields (title, description, image, pdfUrl)' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO free_resources (id, title, description, image, pdfUrl, detailsUrl, badge, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        title,
        description,
        image,
        pdfUrl,
        detailsUrl || '',
        badge || 'Guide',
        orderIndex || 0
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('Failed to create free resource:', error);
    return NextResponse.json({ error: 'Failed to create free resource' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, description, image, pdfUrl, detailsUrl, badge, orderIndex } = body;

    if (!id || !title || !description || !image || !pdfUrl) {
      return NextResponse.json({ error: 'Missing required fields (id, title, description, image, pdfUrl)' }, { status: 400 });
    }

    await executeQuery(
      'UPDATE free_resources SET title = ?, description = ?, image = ?, pdfUrl = ?, detailsUrl = ?, badge = ?, orderIndex = ? WHERE id = ?',
      [
        title,
        description,
        image,
        pdfUrl,
        detailsUrl || '',
        badge || 'Guide',
        orderIndex || 0,
        id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to update free resource:', error);
    return NextResponse.json({ error: 'Failed to update free resource' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    await executeQuery('DELETE FROM free_resources WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete free resource:', error);
    return NextResponse.json({ error: 'Failed to delete free resource' }, { status: 500 });
  }
}
