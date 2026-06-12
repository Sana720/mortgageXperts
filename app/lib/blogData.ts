export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'Blog' | 'News & Insights';
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "navigating-interest-rate-changes-in-2026",
    title: "Navigating Interest Rate Changes in 2026",
    excerpt: "Understand how the latest RBA announcements impact your home loan and what you can do to prepare.",
    content: `
      <h2>The Changing Landscape of Interest Rates</h2>
      <p>With the Reserve Bank of Australia (RBA) making recent adjustments to the cash rate, many homeowners and prospective buyers are wondering how this will impact their borrowing power and monthly repayments.</p>
      <p>Whether you're locked into a fixed rate that is soon expiring or you're currently on a variable rate, it's crucial to understand your options. Refinancing might be a viable strategy to secure a lower rate or consolidate debt.</p>
      <h3>What Should You Do?</h3>
      <ul>
        <li><strong>Review your current rate:</strong> Compare it against the market average.</li>
        <li><strong>Speak to a broker:</strong> We can negotiate with your current lender on your behalf.</li>
        <li><strong>Consider fixing:</strong> If stability is what you need, fixing a portion of your loan might be the right move.</li>
      </ul>
      <p>Contact Mortgage Xperts today to get a free home loan health check and see if you could be saving money.</p>
    `,
    author: "Aakash KC",
    date: "May 15, 2026",
    category: "News & Insights",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "2",
    slug: "first-home-buyer-tips",
    title: "Essential Tips for First Home Buyers",
    excerpt: "Everything you need to know before you start attending open homes and making offers.",
    content: `
      <h2>Taking the First Step</h2>
      <p>Buying your first home is incredibly exciting, but the process can also feel overwhelming. From saving a deposit to understanding government grants, there are many moving parts.</p>
      <h3>Top Tips for Success</h3>
      <ol>
        <li><strong>Get Pre-Approved:</strong> Never go house hunting without knowing exactly what you can afford.</li>
        <li><strong>Understand the Hidden Costs:</strong> Factor in stamp duty, conveyancing fees, and building inspections.</li>
        <li><strong>Check Grant Eligibility:</strong> You might be eligible for the First Home Guarantee Scheme, which allows you to buy with just a 5% deposit and avoid LMI.</li>
      </ol>
      <p>At Mortgage Xperts, we specialize in helping Nepali Australians navigate the first home buyer journey.</p>
    `,
    author: "Susmita G C",
    date: "April 22, 2026",
    category: "Blog",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "3",
    slug: "maximizing-property-investment-returns",
    title: "Maximizing Your Property Investment Returns",
    excerpt: "Strategies to increase rental yield and capitalize on capital growth in the Australian market.",
    content: `
      <h2>Building Wealth Through Property</h2>
      <p>Property investment remains one of the most reliable ways to build long-term wealth in Australia. However, simply buying a property isn't enough; you need a solid strategy.</p>
      <h3>Key Investment Strategies</h3>
      <ul>
        <li><strong>Location, Location, Location:</strong> Invest in areas with strong infrastructure growth and low vacancy rates.</li>
        <li><strong>Leverage Equity:</strong> Use the equity in your existing home to fund the deposit for your next investment.</li>
        <li><strong>Tax Benefits:</strong> Understand negative gearing and depreciation to maximize your tax returns.</li>
      </ul>
      <p>Speak to our investment specialists to structure your loans correctly and protect your assets.</p>
    `,
    author: "Rakesh Shrestha",
    date: "June 02, 2026",
    category: "Blog",
    image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

export function getPostsByCategory(category: 'Blog' | 'News & Insights'): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
