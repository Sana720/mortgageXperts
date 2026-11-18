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

  const canonicalUrl = `https://mortgagexperts.com.au/our-team/${resolvedParams.slug}`;
  return {
    title: `${member.name} - ${member.role} | Mortgage Xperts`,
    description: member.bio,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${member.name} - ${member.role}`,
      description: member.bio,
      url: canonicalUrl,
      type: 'profile',
      images: member.image ? [{ url: member.image, width: 800, height: 800, alt: member.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${member.name} - ${member.role}`,
      description: member.bio,
      images: member.image ? [member.image] : [],
    },
  };
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const member = await getMemberBySlug(resolvedParams.slug);

  if (!member) {
    notFound();
  }

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.image || '',
    worksFor: {
      '@type': 'FinancialService',
      name: 'Mortgage Xperts'
    },
    url: `https://mortgagexperts.com.au/our-team/${resolvedParams.slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <ClientPage member={member} />
    </>
  );
}
