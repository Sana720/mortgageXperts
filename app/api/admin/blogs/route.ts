/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import crypto from 'crypto';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (id) {
      const rows = await executeQuery('SELECT * FROM blogs WHERE id = ?', [id]);
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(rows[0]);
    }

    if (slug) {
      const rows = await executeQuery('SELECT * FROM blogs WHERE slug = ?', [slug]);
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(rows[0]);
    }

    // Default: fetch all
    const rows = await executeQuery('SELECT * FROM blogs ORDER BY createdAt DESC');
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, category, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields (title, slug, content)' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO blogs (id, title, slug, excerpt, content, coverImage, category, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        title,
        slug,
        excerpt || '',
        content,
        coverImage || '/images/logo.png',
        category || 'General',
        published ? 1 : 0
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('Failed to create blog:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'A blog with this URL slug already exists.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, slug, excerpt, content, coverImage, category, published } = body;

    if (!id || !title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields (id, title, slug, content)' }, { status: 400 });
    }

    await executeQuery(
      'UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, coverImage = ?, category = ?, published = ? WHERE id = ?',
      [
        title,
        slug,
        excerpt || '',
        content,
        coverImage || '/images/logo.png',
        category || 'General',
        published ? 1 : 0,
        id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to update blog:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'A blog with this URL slug already exists.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
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

    await executeQuery('DELETE FROM blogs WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
