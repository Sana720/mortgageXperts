/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import crypto from 'crypto';

const SEED_TESTIMONIALS = [
  {
    name: "John Smith",
    role: "2 weeks ago",
    content: "Mortgage Xperts made buying our first home an absolute breeze. Highly recommend their services to anyone looking for a loan!",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=F0F5FF&color=2563EB&bold=true"
  },
  {
    name: "Sarah Jenkins",
    role: "1 month ago",
    content: "Professional, fast, and reliable. They explained everything clearly and got us an amazing interest rate on our refinance.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=F0F5FF&color=2563EB&bold=true"
  },
  {
    name: "Raj Patel",
    role: "3 months ago",
    content: "As a self-employed business owner, getting a loan is tough. Kunal and the team sorted it out without any stress. 5 stars!",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Raj+Patel&background=F0F5FF&color=2563EB&bold=true"
  },
  {
    name: "Emily Clark",
    role: "2 months ago",
    content: "The team at Mortgage Xperts is phenomenal. They went above and beyond to help us secure our dream home in Brisbane.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Emily+Clark&background=F0F5FF&color=2563EB&bold=true"
  },
  {
    name: "David O'Connor",
    role: "4 weeks ago",
    content: "Great communication throughout the entire process. We always knew what was happening with our application.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=David+O%27Connor&background=F0F5FF&color=2563EB&bold=true"
  },
  {
    name: "Anita Rai",
    role: "1 week ago",
    content: "Highly recommend! They are the best Nepali mortgage brokers in Australia. Very trustworthy and efficient.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Anita+Rai&background=F0F5FF&color=2563EB&bold=true"
  },
  {
    name: "Michael Chen",
    role: "3 months ago",
    content: "Refinancing was so easy with Mortgage Xperts. We are saving thousands every year now. Thank you team!",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=F0F5FF&color=2563EB&bold=true"
  },
  {
    name: "Sophie Taylor",
    role: "2 months ago",
    content: "Extremely knowledgeable brokers who actually care about their clients. I felt supported every step of the way.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sophie+Taylor&background=F0F5FF&color=2563EB&bold=true"
  }
];

async function seedTestimonials() {
  for (const t of SEED_TESTIMONIALS) {
    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO testimonials (id, name, role, rating, content, avatar) VALUES (?, ?, ?, ?, ?, ?)',
      [id, t.name, t.role, t.rating, t.content, t.avatar]
    );
  }
}

export async function GET() {
  try {
    const countResult = await executeQuery<any[]>('SELECT COUNT(*) as count FROM testimonials');
    const count = countResult[0]?.count || 0;
    if (count === 0) {
      await seedTestimonials();
    }
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
