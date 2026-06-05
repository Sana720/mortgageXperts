/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import crypto from 'crypto';

const SEED_BLOGS = [
  {
    title: "From Renting To Their First Home In 11 Months",
    slug: "from-renting-to-first-home",
    excerpt: "From struggling with renting in Brisbane's competitive market to holding the keys to their first home — see how the right guidance and lending strategy made it possible within a single calendar year.",
    content: "Jess and Mark were tired of Brisbane's competitive rental market, where rent prices kept rising and lease renewals were never guaranteed. They wanted stability, but their savings felt too small to enter the property market. That's when they contacted Mortgage Xperts.\n\nWe sat down and mapped out a clear, step-by-step path to homeownership. By auditing their expenses, setting a realistic savings target, and finding a lender that offered competitive terms for first-home buyers, we helped them transition from renting to owning their very first home in just 11 months.",
    coverImage: "/images/villa.png",
    category: "Featured Story",
    published: 1
  },
  {
    title: "How Refinancing Saved $18,000 In Repayments",
    slug: "how-refinancing-saved-18k",
    excerpt: "A growing family was stuck on a higher rate. We restructured their loan, unlocked better pricing and put thousands back in their pocket — without the stress.",
    content: "A growing family in Sydney was feeling the pressure of rising interest rates on their home loan. They had been with the same lender for four years and were stuck on a rate that was no longer competitive.\n\nOur team conducted a comprehensive home loan review. We negotiated with their existing lender and compared options across 40+ other banks. Ultimately, we restructured their loan, secured a much lower variable rate, and saved them over $18,000 in annual repayments, giving them crucial breathing room.",
    coverImage: "/images/family_refinance.png",
    category: "Refinance Story",
    published: 1
  },
  {
    title: "Doctor Buys First Home With Zero LMI",
    slug: "doctor-buys-first-home-zero-lmi",
    excerpt: "A junior doctor with HECS debt thought LMI was unavoidable. We matched them to the right lender, waived LMI entirely and got them into their first home 6 months earlier than expected.",
    content: "As a junior doctor working long hours in a public hospital, securing a home loan felt overwhelming, especially with significant HECS debt. They assumed they would have to save a full 20% deposit to avoid paying thousands in Lenders Mortgage Insurance (LMI).\n\nFortunately, Australian lenders offer special waivers for medical professionals. We matched the doctor with a lender offering zero LMI for healthcare practitioners on a 10% deposit. This allowed them to buy their dream apartment in Melbourne six months sooner than planned, saving over $15,000 in LMI costs.",
    coverImage: "/images/Healthcare Professionals.png",
    category: "Healthcare Professional",
    published: 1
  }
];

async function seedBlogs() {
  for (const b of SEED_BLOGS) {
    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO blogs (id, title, slug, excerpt, content, coverImage, category, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, b.title, b.slug, b.excerpt, b.content, b.coverImage, b.category, b.published]
    );
  }
}

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
    const countResult = await executeQuery<any[]>('SELECT COUNT(*) as count FROM blogs');
    const count = countResult[0]?.count || 0;
    if (count === 0) {
      await seedBlogs();
    }

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
