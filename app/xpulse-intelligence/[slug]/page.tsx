/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { getPostBySlug, blogPosts, BlogPost } from '@/app/lib/blogData';
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

  let dbBlogs: any[] = [];
  try {
    dbBlogs = await executeQuery<any[]>('SELECT * FROM blogs WHERE published = 1 ORDER BY createdAt DESC');
  } catch (err) {
    console.error('Failed to fetch blogs from DB:', err);
  }

  const mappedDbBlogs: BlogPost[] = dbBlogs.map(row => ({
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    content: row.content || "",
    author: "Aakash KC",
    date: new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: row.category === 'News & Insights' ? 'News & Insights' : 'Blog',
    image: row.coverImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }));

  const allBlogsMap = new Map<string, BlogPost>();
  blogPosts.forEach(post => {
    allBlogsMap.set(post.slug, post);
  });
  mappedDbBlogs.forEach(post => {
    allBlogsMap.set(post.slug, post);
  });

  const allPosts = Array.from(allBlogsMap.values());
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <ClientPage post={post} allPosts={allPosts} />;
}
