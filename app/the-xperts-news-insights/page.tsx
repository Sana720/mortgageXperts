/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import ClientPage from './ClientPage';

import { executeQuery } from '@/lib/db';
import { blogPosts, BlogPost } from '@/app/lib/blogData';

export const metadata: Metadata = {
  title: 'The Xperts News & Insights | Mortgage Xperts',
  description: 'Stay updated with the latest news, announcements, and insights from the team at Mortgage Xperts.',
};

export default async function NewsInsightsPage() {
  let dbBlogs: any[] = [];
  try {
    dbBlogs = await executeQuery<any[]>('SELECT * FROM blogs WHERE published = 1 ORDER BY createdAt DESC');
  } catch (err) {
    console.error('Failed to fetch blogs from DB:', err);
  }

  const mappedDbBlogs: BlogPost[] = dbBlogs.map(row => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
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

  const combinedBlogs = Array.from(allBlogsMap.values());

  return <ClientPage initialPosts={combinedBlogs} />;
}
