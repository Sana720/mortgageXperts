import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Our Team | Leading Nepali Mortgage Broker in Australia',
  description: 'Meet the expert mortgage brokers at Mortgage Xperts. Led by Aakash KC, we help first-home buyers, investors, and refinancers secure the best home loans.',
};

export default function NepaliMortgageBrokerAustraliaPage() {
  return <ClientPage />;
}
