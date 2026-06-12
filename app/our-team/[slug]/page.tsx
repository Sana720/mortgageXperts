import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { getTeamMemberBySlug } from '@/app/lib/teamData';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const member = getTeamMemberBySlug(resolvedParams.slug);
  
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
  const member = getTeamMemberBySlug(resolvedParams.slug);

  if (!member) {
    notFound();
  }

  return <ClientPage member={member} />;
}
