import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Step By Step Home Buying Process | Mortgage Xperts',
  description: 'Understand the entire home buying process from start to finish with our free guide.',
};

export default function FreeResource2Page() {
  return <ClientPage />;
}
