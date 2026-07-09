/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import crypto from 'crypto';

export async function GET() {
  try {
    const rows = await executeQuery<any[]>('SELECT * FROM blog_categories ORDER BY name ASC');
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const trimmedName = name.trim();

    // Check if category already exists
    const existing = await executeQuery<any[]>(
      'SELECT id FROM blog_categories WHERE name = ?',
      [trimmedName]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO blog_categories (id, name) VALUES (?, ?)',
      [id, trimmedName]
    );

    return NextResponse.json({ success: true, id, name: trimmedName });
  } catch (error: any) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name } = body;

    if (!id || !name || !name.trim()) {
      return NextResponse.json({ error: 'Missing category id or name' }, { status: 400 });
    }

    const trimmedName = name.trim();

    // 1. Fetch old name
    const rows = await executeQuery<any[]>(
      'SELECT name FROM blog_categories WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const oldName = rows[0].name;

    // Prevent renaming standard default categories to keep system robust
    if (['Blog', 'News & Insights'].includes(oldName)) {
      return NextResponse.json({ error: 'Default categories cannot be renamed' }, { status: 400 });
    }

    // 2. Update category table
    await executeQuery(
      'UPDATE blog_categories SET name = ? WHERE id = ?',
      [trimmedName, id]
    );

    // 3. Cascade updates to blogs table
    await executeQuery(
      'UPDATE blogs SET category = ? WHERE category = ?',
      [trimmedName, oldName]
    );

    return NextResponse.json({ success: true, id, name: trimmedName });
  } catch (error: any) {
    console.error('Failed to update category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing category id' }, { status: 400 });
    }

    // 1. Fetch name
    const rows = await executeQuery<any[]>(
      'SELECT name FROM blog_categories WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const oldName = rows[0].name;

    if (['Blog', 'News & Insights'].includes(oldName)) {
      return NextResponse.json({ error: 'Default categories cannot be deleted' }, { status: 400 });
    }

    // 2. Delete category
    await executeQuery(
      'DELETE FROM blog_categories WHERE id = ?',
      [id]
    );

    // 3. Reset associated blogs' categories to 'Blog'
    await executeQuery(
      'UPDATE blogs SET category = "Blog" WHERE category = ?',
      [oldName]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
