'use client';

import React from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import { SubPageHero } from '@/app/components/SubPageHero';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Newspaper } from 'lucide-react';
import { getPostsByCategory } from '@/app/lib/blogData';

export default function NewsInsightsClient() {
  const posts = getPostsByCategory('News & Insights');

  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} />

      <SubPageHero
        pageTitle="The Xperts News & Insights"
        themeColor="blue"
        pageHeroSettings={{
          hero_badge: "Company News",
          hero_title: "The Xperts News & Insights",
          hero_subtext: "Stay up to date with the latest announcements, policy changes, and company news from Mortgage Xperts.",
          hero_image: "/images/hero.png"
        }}
      />

      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="flex flex-col items-center mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 mb-6">
            <Newspaper className="w-4 h-4 text-[#2563EB]" />
            <span className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider">Latest News</span>
          </div>
          <h2 
            className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A] mb-6"
            style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
          >
            Stay informed with our updates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-[#2563EB] uppercase tracking-wider shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 text-[13px] text-slate-500 font-medium mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-[#2563EB]" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1.5 text-[#2563EB]" />
                    {post.author}
                  </div>
                </div>
                <h3 
                  className="text-[22px] font-bold text-[#0B1F3A] mb-4 group-hover:text-[#2563EB] transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-[15px] text-slate-600 mb-8 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[14px] text-[#2563EB] font-bold hover:text-blue-800 transition-colors"
                >
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-[16px] font-medium">No news articles found. Check back later!</p>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
