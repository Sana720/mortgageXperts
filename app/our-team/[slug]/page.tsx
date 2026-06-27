import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { notFound } from 'next/navigation';
import { executeQuery } from '@/lib/db';

async function getMemberBySlug(slug: string) {
  const members = await executeQuery('SELECT * FROM team_members ORDER BY orderIndex ASC, createdAt DESC');
  const allMembers = members.map((m: { name: string; [key: string]: unknown }) => ({
    ...m,
    slug: m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    expertise: []
  }));
  return allMembers.find((m: { slug: string; [key: string]: unknown }) => m.slug === slug);
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const member = await getMemberBySlug(resolvedParams.slug);
  
  if (!member) {
    return {
      title: 'Broker Not Found | Mortgage Xperts',
    };
  }

  return {
    title: `${member.name} - ${member.role} | Mortgage Xperts`,
    description: member.bio,
  };
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const member = await getMemberBySlug(resolvedParams.slug);

  if (!member) {
    notFound();
  }

  return <ClientPage member={member} />;
}
