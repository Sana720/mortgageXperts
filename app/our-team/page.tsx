import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { executeQuery } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Our Team | Leading Nepali Mortgage Broker in Australia',
  description: 'Meet the expert mortgage brokers at Mortgage Xperts. Led by Aakash KC, we help first-home buyers, investors, and refinancers secure the best home loans.',
};

export default async function OurTeamPage() {
  const members = await executeQuery('SELECT * FROM team_members ORDER BY orderIndex ASC, createdAt DESC');
  const teamMembers = members.map((m: { name: string; [key: string]: unknown }) => ({
    ...m,
    slug: m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }));
  return <ClientPage initialTeamMembers={teamMembers} />;
}
