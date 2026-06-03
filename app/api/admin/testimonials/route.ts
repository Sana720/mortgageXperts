/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import crypto from 'crypto';

export async function GET() {
  try {
    const rows = await executeQuery('SELECT * FROM testimonials ORDER BY createdAt DESC');
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Failed to fetch testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, role, rating, content, avatar } = body;

    if (!name || !role || !content) {
      return NextResponse.json({ error: 'Missing required fields (name, role, content)' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO testimonials (id, name, role, rating, content, avatar) VALUES (?, ?, ?, ?, ?, ?)',
      [
        id,
        name,
        role,
        rating || 5,
        content,
        avatar || '/images/aakash_new.png'
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('Failed to create testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, role, rating, content, avatar } = body;

    if (!id || !name || !role || !content) {
      return NextResponse.json({ error: 'Missing required fields (id, name, role, content)' }, { status: 400 });
    }

    await executeQuery(
      'UPDATE testimonials SET name = ?, role = ?, rating = ?, content = ?, avatar = ? WHERE id = ?',
      [
        name,
        role,
        rating || 5,
        content,
        avatar || '/images/aakash_new.png',
        id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to update testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
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

    await executeQuery('DELETE FROM testimonials WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
