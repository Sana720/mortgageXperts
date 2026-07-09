'use client';

import React, { useState, useMemo } from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import { SubPageHero } from '@/app/components/SubPageHero';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Newspaper, Search, Clock, Mail, CheckCircle2 } from 'lucide-react';
import { getPostsByCategory, BlogPost } from '@/app/lib/blogData';

interface BlogClientProps {
  initialPosts?: BlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  // Use posts from props (which includes DB blogs + default blogs) or fallback to static default blogs
  const rawPosts = initialPosts || getPostsByCategory('Blog');

  // State for search and category filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Helper to dynamically tag posts based on content/title keywords
  const getSubCategory = (post: BlogPost): string => {
    const text = (post.title + ' ' + post.excerpt + ' ' + post.content).toLowerCase();
    if (text.includes('rba') || text.includes('rate') || text.includes('cash') || text.includes('market')) {
      return 'Market Updates';
    }
    if (text.includes('first') || text.includes('buyer') || text.includes('home') || text.includes('buy')) {
      return 'Buying a Home';
    }
    if (text.includes('refinance') || text.includes('repayment') || text.includes('saving')) {
      return 'Refinancing';
    }
    if (text.includes('invest') || text.includes('rental') || text.includes('yield') || text.includes('wealth')) {
      return 'Property Investment';
    }
    return 'General';
  };

  // Approximate reading time
  const getReadingTime = (content: string): string => {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  // Enhance posts with subcategories and reading times
  const enhancedPosts = useMemo(() => {
    return rawPosts.map(post => ({
      ...post,
      subCategory: getSubCategory(post),
      readingTime: getReadingTime(post.content)
    }));
  }, [rawPosts]);

  // List of unique categories for filters
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    enhancedPosts.forEach(post => {
      if (post.subCategory) {
        cats.add(post.subCategory);
      }
    });
    return Array.from(cats);
  }, [enhancedPosts]);

  // Filter posts based on tab and search query
  const filteredPosts = useMemo(() => {
    return enhancedPosts.filter(post => {
      const matchesTab = activeTab === 'All' || post.subCategory === activeTab;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [enhancedPosts, activeTab, searchQuery]);

  // Separate the featured post (only when no active search/filter, grab the latest one)
  const showFeatured = activeTab === 'All' && searchQuery === '' && filteredPosts.length > 0;
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const remainingPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="bg-[#F4F7FC] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} />

      <SubPageHero
        pageTitle="Blog"
        themeColor="rose"
        layoutType="clean"
        pageHeroSettings={{
          hero_badge: "Property Insights",
          hero_title: "Mortgage Xperts Blog",
          hero_subtext: "Expert advice, property market trends, and practical tips to help you navigate the Australian real estate landscape.",
          hero_image: "/images/hero.png"
        }}
      />

      <section className="py-12 md:py-20 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full flex-grow">
        
        {/* Search and Filters Section */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center mb-12 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          {/* Dynamic Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300 ${
                  activeTab === cat
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px] lg:w-80">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-[14px] transition-all"
            />
          </div>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100/60 border border-rose-200/50 mb-6">
              <Newspaper className="w-4 h-4 text-rose-600" />
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">Featured Article</span>
            </div>
            <article className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-2xl transition-all duration-500 group grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-100 min-h-[300px]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 left-6 bg-rose-600 text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {featuredPost.subCategory}
                </div>
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 text-[13px] text-slate-500 font-medium mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-rose-500" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-rose-500" />
                    {featuredPost.readingTime}
                  </div>
                </div>
                <h2
                  className="text-[26px] sm:text-[34px] font-bold text-[#0B1F3A] mb-4 group-hover:text-rose-600 transition-colors leading-tight"
                  style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
                >
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-[16px] text-slate-600 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mr-3 text-rose-600 font-bold text-[14px]">
                      {featuredPost.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[14px] font-bold text-[#0B1F3A]">{featuredPost.author}</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-[14px] text-rose-600 font-bold hover:text-rose-800 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Read Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* List Grid Title */}
        {filteredPosts.length > 0 && (
          <h3 
            className="text-[20px] font-bold text-[#0B1F3A] mb-8"
            style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
          >
            {showFeatured ? 'More Articles' : 'Search & Filter Results'} ({filteredPosts.length})
          </h3>
        )}

        {/* Regular Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[11px] font-bold text-rose-600 uppercase tracking-wider shadow-sm">
                  {post.subCategory}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 text-[13px] text-slate-500 font-medium mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-rose-500" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-rose-500" />
                    {post.readingTime}
                  </div>
                </div>
                <h3
                  className="text-[20px] font-bold text-[#0B1F3A] mb-4 group-hover:text-rose-600 transition-colors leading-snug line-clamp-2"
                  style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-[14px] text-slate-600 mb-6 flex-grow leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                  <span className="text-[13px] font-semibold text-slate-700">By {post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[13px] text-rose-600 font-bold hover:text-rose-800 transition-colors"
                  >
                    Read
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-800 text-[18px] font-semibold mb-2">No matching articles found</p>
            <p className="text-slate-500 text-[14px]">Try adjusting your search keywords or switching category filters.</p>
          </div>
        )}

        {/* Premium Newsletter CTA */}
        <div className="mt-24 bg-gradient-to-br from-[#0B1F3A] to-[#1E3A60] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Newspaper className="w-80 h-80 transform translate-x-12 translate-y-12" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-[12px] font-bold text-rose-400 uppercase tracking-widest block mb-3">Newsletter Subscription</span>
            <h3 
              className="text-[24px] sm:text-[32px] font-bold mb-4"
              style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
            >
              Get Expert Mortgage Tips Directly to Your Inbox
            </h3>
            <p className="text-slate-300 text-[15px] sm:text-[16px] mb-8 leading-relaxed">
              Stay ahead of the Australian property market. Join our community to receive fortnightly insights, interest rate alerts, and first home buyer checklists.
            </p>
            
            {subscribed ? (
              <div className="flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/30 p-4 rounded-xl max-w-md">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <p className="text-[15px] font-semibold text-emerald-100">Thank you! You have successfully subscribed.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white/20 text-[14px] text-white placeholder-slate-400 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-[14px] font-bold rounded-xl shadow-md shadow-rose-600/20 transition-all text-white flex-shrink-0"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>

      </section>

      <SiteFooter />
    </div>
  );
}
