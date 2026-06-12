import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { getPostBySlug } from '@/app/lib/blogData';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Mortgage Xperts',
    };
  }

  return {
    title: `${post.title} | Mortgage Xperts Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <ClientPage post={post} />;
}
