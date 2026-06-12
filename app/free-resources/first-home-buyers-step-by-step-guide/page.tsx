import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'First Home Buyers Step by Step Guide | Mortgage Xperts',
  description: 'A free, step-by-step checklist to help you navigate your first property purchase.',
};

export default function FreeResource1Page() {
  return <ClientPage />;
}
