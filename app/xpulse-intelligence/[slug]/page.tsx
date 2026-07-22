/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { getPostBySlug, BlogPost } from '@/app/lib/blogData';
import { notFound } from 'next/navigation';
import { executeQuery } from '@/lib/db';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let post: any = undefined;
  try {
    const rows = await executeQuery<any[]>('SELECT * FROM blogs WHERE slug = ?', [slug]);
    if (rows && rows.length > 0) {
      const row = rows[0];
      post = {
        title: row.title,
        excerpt: row.excerpt,
      };
    }
  } catch (err) {
    console.error('Failed to fetch blog metadata from DB:', err);
  }

  if (!post) {
    post = getPostBySlug(slug);
  }
  
  if (!post) {
    return {
      title: 'Post Not Found | Mortgage Xperts',
    };
  }

  return {
    title: `${post.title} | XPULSE Intelligence`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let post: BlogPost | undefined = undefined;
  try {
    const rows = await executeQuery<any[]>('SELECT * FROM blogs WHERE slug = ?', [slug]);
    if (rows && rows.length > 0) {
      const row = rows[0];
      post = {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        author: "Aakash KC",
        date: new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        category: row.category === 'News & Insights' ? 'News & Insights' : 'Blog',
        image: row.coverImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      };
    }
  } catch (err) {
    console.error('Failed to fetch blog post from DB:', err);
  }

  if (!post) {
    post = getPostBySlug(slug);
  }

  if (!post) {
    notFound();
  }

  return <ClientPage post={post} />;
}
