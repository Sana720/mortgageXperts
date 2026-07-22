/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from 'next';
import { executeQuery } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mortgagexperts.com.au';

  // Define static routes
  const staticRoutes = [
    '',
    '/about-us-nepali-mortgage-broker-in-australia',
    '/best-nepali-investment-mortgage-broker-perth',
    '/best-nepali-mortgage-broker-australia',
    '/xpulse-intelligence',
    '/borrowing-power-calculator',
    '/cash-rate-change-calculator',
    '/credit-guide',
    '/deposit-calculator',
    '/disclaimer',
    '/equity-calculator',
    '/extra-repayment-calculator',
    '/first-home-guide',
    '/free-assessment',
    '/free-resources',
    '/free-resources/first-home-buyers-step-by-step-guide',
    '/free-resources/step-by-step-home-buying-process',
    '/home-guarantee-scheme',
    '/home-loan-for-accountants',
    '/home-loan-for-doctors',
    '/home-loan-for-nurses',
    '/home-loan-with-visas',
    '/investing-in-property-nepali-mortgage-broker',
    '/lmi-calculator',
    '/loan-comparison-calculator',
    '/loan-repayment-calculator',
    '/nepali-mortgage-broker-in-australia',
    '/nepali-mortgage-broker-in-brisbane',
    '/no-deposit-home-loans-in-australia',
    '/non-resident-home-loans',
    '/our-team',
    '/privacy-policy',
    '/property-investment-guide',
    '/refinancing-a-loan',
    '/refinancing-feasibility',
    '/refinancing-guide',
    '/rent-yield-calculators',
    '/self-employed-home-loans',
    '/terms-and-conditions',
    '/top-nepali-mortgage-broker-in-australia',
    '/ytd-calculator',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch dynamic blog posts
  try {
    const blogs = await executeQuery<any[]>('SELECT slug, createdAt FROM blogs WHERE published = 1');
    if (Array.isArray(blogs)) {
      blogs.forEach((blog) => {
        sitemapEntries.push({
          url: `${baseUrl}/xpulse-intelligence/${blog.slug}`,
          lastModified: new Date(blog.createdAt || Date.now()),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }
  } catch (err) {
    console.error('Failed to generate dynamic sitemap for blogs:', err);
  }

  // Fetch dynamic team members
  try {
    const members = await executeQuery<any[]>('SELECT name, createdAt FROM team_members');
    if (Array.isArray(members)) {
      members.forEach((m) => {
        const slug = m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        sitemapEntries.push({
          url: `${baseUrl}/our-team/${slug}`,
          lastModified: new Date(m.createdAt || Date.now()),
          changeFrequency: 'monthly',
          priority: 0.5,
        });
      });
    }
  } catch (err) {
    console.error('Failed to generate dynamic sitemap for team members:', err);
  }

  return sitemapEntries;
}
