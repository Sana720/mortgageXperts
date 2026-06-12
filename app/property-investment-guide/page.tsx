import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Property Investment Guide | Mortgage Xperts',
  description: 'Download our comprehensive Property Investment Guide and learn how to build wealth through real estate in Australia.',
};

export default function PropertyInvestmentGuidePage() {
  return <ClientPage />;
}
