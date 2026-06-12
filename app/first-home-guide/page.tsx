import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'First Home Guide | Mortgage Xperts',
  description: 'Download our comprehensive First Home Guide and learn everything you need to know about buying your first property in Australia.',
};

export default function FirstHomeGuidePage() {
  return <ClientPage />;
}
