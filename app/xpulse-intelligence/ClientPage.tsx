'use client';

import React, { useState, useMemo } from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import { SubPageHero } from '@/app/components/SubPageHero';
import Link from 'next/link';
import { ArrowRight, Search, Mail, CheckCircle2, ChevronRight } from 'lucide-react';
import { getPostsByCategory, BlogPost } from '@/app/lib/blogData';

interface XPulseClientProps {
  initialPosts?: BlogPost[];
}

// Laxmi Home Loans categories exact mapping
const LAXMI_CATEGORIES = [
  'First Home Loans',
  'Land & Construction',
  'Refinance',
  'Investment',
  'Debt Consolidation',
  'SMSF',
  'Getting PR Soon',
  'Gov Schemes & Supports',
  'Property Locations',
  'News updates',
  'Videos & Awards',
  'Success Stories'
];

export default function XPulseClient({ initialPosts }: XPulseClientProps) {
  const rawPosts = initialPosts || getPostsByCategory('Blog');

  const [activeTab, setActiveTab] = useState('First Home Loans');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Helper to dynamically tag posts based on content/title keywords
  const getSubCategory = (post: BlogPost): string => {
    const text = (post.title + ' ' + post.excerpt + ' ' + post.content).toLowerCase();
    if (text.includes('land') || text.includes('build') || text.includes('construction')) return 'Land & Construction';
    if (text.includes('refinance') || text.includes('repayment') || text.includes('saving')) return 'Refinance';
    if (text.includes('invest') || text.includes('rental') || text.includes('yield')) return 'Investment';
    if (text.includes('debt') || text.includes('consolidation')) return 'Debt Consolidation';
    if (text.includes('smsf') || text.includes('super')) return 'SMSF';
    if (text.includes('pr') || text.includes('visa') || text.includes('resident')) return 'Getting PR Soon';
    if (text.includes('scheme') || text.includes('gov') || text.includes('guarantee') || text.includes('grant')) return 'Gov Schemes & Supports';
    if (text.includes('perth') || text.includes('brisbane') || text.includes('sydney') || text.includes('melbourne') || text.includes('location')) return 'Property Locations';
    if (text.includes('news') || text.includes('update') || text.includes('rba')) return 'News updates';
    if (text.includes('video') || text.includes('award') || text.includes('story')) return 'Videos & Awards';
    return 'First Home Loans';
  };

  const enhancedPosts = useMemo(() => {
    return rawPosts.map(post => ({
      ...post,
      subCategory: getSubCategory(post)
    }));
  }, [rawPosts]);

  const filteredPosts = useMemo(() => {
    return enhancedPosts.filter(post => {
      const matchesTab = searchQuery.trim() !== '' || post.subCategory === activeTab || activeTab === 'First Home Loans';
      const matchesSearch = 
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [enhancedPosts, activeTab, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} />

      <SubPageHero
        pageTitle="Mortgage Xperts Blog"
        themeColor="blue"
        layoutType="clean"
        pageHeroSettings={{
          hero_badge: "Home Loan Tips & Property Insights",
          hero_title: "Mortgage Xperts Blog",
          hero_subtext: "Explore expert home loan tips, first home buyer guides and property insights from Mortgage Xperts to help you enter the market with confidence.",
          hero_image: "/images/hero.png"
        }}
      />

      <main className="py-12 md:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        
        {/* Category Tabs Header - Replicating Laxmi Home Loans Horizontal Navigation */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200/80 mb-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <h2 
                className="text-[20px] font-bold text-[#0B1F3A]"
                style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
              >
                Browse Insights by Category
              </h2>
              <p className="text-[13px] text-slate-500">Filter articles tailored to your home loan journey</p>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-[14px] rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Laxmi-style Tab List */}
          <div className="flex flex-wrap gap-2">
            {LAXMI_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat && searchQuery === '';
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0B1F3A] text-white shadow-sm'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Heading matching Laxmi style: "First Home Loans With Mortgage Xperts" */}
        <div className="text-center mb-10">
          <span className="text-blue-600 text-[13px] font-bold tracking-wider uppercase block mb-1">
            {searchQuery ? 'Search Results' : activeTab}
          </span>
          <h2 
            className="text-[26px] md:text-[34px] font-extrabold text-[#0B1F3A]"
            style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
          >
            {searchQuery ? `Articles for "${searchQuery}"` : `${activeTab} With Mortgage Xperts`}
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Article Grid Layout - Replicating Elementor Classic Post Card from Laxmi site */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Thumbnail */}
              <Link href={`/xpulse-intelligence/${post.slug}`} className="relative block h-52 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0B1F3A]/90 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-sm">
                  {post.subCategory}
                </span>
              </Link>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Post Meta Data */}
                <div className="flex items-center space-x-3 text-[12px] text-slate-500 mb-3">
                  <span className="font-semibold text-slate-700">{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 
                  className="text-[18px] font-bold text-[#0B1F3A] mb-3 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2"
                  style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
                >
                  <Link href={`/xpulse-intelligence/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-[14px] text-slate-600 mb-6 flex-grow leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Link (Laxmi style) */}
                <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
                  <Link
                    href={`/xpulse-intelligence/${post.slug}`}
                    className="inline-flex items-center text-[13px] text-blue-600 font-bold hover:text-[#0B1F3A] transition-colors"
                  >
                    Read More
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto shadow-sm">
            <p className="text-[#0B1F3A] text-[18px] font-bold mb-2">No posts available in this section</p>
            <p className="text-slate-500 text-[14px]">Select another category above or search for different keywords.</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 bg-[#0B1F3A] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-md">
          <div className="max-w-2xl relative z-10">
            <span className="text-sky-400 text-[12px] font-bold uppercase tracking-wider block mb-2">
              Stay Informed
            </span>
            <h3 
              className="text-[24px] sm:text-[30px] font-bold mb-3"
              style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
            >
              Subscribe for Australian Property & Loan Updates
            </h3>
            <p className="text-slate-300 text-[14px] sm:text-[15px] mb-6 leading-relaxed">
              Get the latest interest rate changes, government scheme updates, and home buyer tips straight to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 p-3.5 rounded-xl text-[14px]">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-[14px] bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 font-bold text-[14px] rounded-xl transition-all shadow-md flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
