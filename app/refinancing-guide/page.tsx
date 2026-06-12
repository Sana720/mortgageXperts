import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Refinancing Guide | Mortgage Xperts',
  description: 'Download our comprehensive Refinancing Guide to learn how to save money on your home loan, lower your interest rate, and access equity.',
};

export default function RefinancingGuidePage() {
  return <ClientPage />;
}
