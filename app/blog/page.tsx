import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Blog | Mortgage Xperts',
  description: 'Read the latest news, tips, and insights on the Australian property market from our expert mortgage brokers.',
};

export default function BlogPage() {
  return <ClientPage />;
}
