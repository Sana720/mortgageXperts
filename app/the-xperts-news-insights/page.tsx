import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'The Xperts News & Insights | Mortgage Xperts',
  description: 'Stay updated with the latest news, announcements, and insights from the team at Mortgage Xperts.',
};

export default function NewsInsightsPage() {
  return <ClientPage />;
}
