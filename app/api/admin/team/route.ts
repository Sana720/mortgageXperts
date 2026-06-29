import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import crypto from 'crypto';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === 'authenticated';
}

export async function GET() {
  try {
    const rows = await executeQuery('SELECT * FROM team_members ORDER BY orderIndex ASC, createdAt DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, role, email, phone, bio, image, orderIndex, branch } = await request.json();
    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO team_members (id, name, role, email, phone, bio, image, orderIndex, branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, role, email || '', phone || '', bio || '', image || '/images/aakash_new.png', orderIndex || 0, branch || null]
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Failed to create team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, name, role, email, phone, bio, image, orderIndex, branch } = await request.json();
    if (!id || !name || !role) {
      return NextResponse.json({ error: 'ID, name and role are required' }, { status: 400 });
    }

    await executeQuery(
      'UPDATE team_members SET name = ?, role = ?, email = ?, phone = ?, bio = ?, image = ?, orderIndex = ?, branch = ? WHERE id = ?',
      [name, role, email || '', phone || '', bio || '', image || '', orderIndex || 0, branch || null, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Team member ID is required' }, { status: 400 });
    }

    await executeQuery('DELETE FROM team_members WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
