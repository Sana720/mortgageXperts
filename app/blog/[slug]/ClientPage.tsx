'use client';

import React from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { BlogPost } from '@/app/lib/blogData';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} />

      <article id="article" className="w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] min-h-[calc(100vh-80px)]">
          {/* Left Column - Sticky Image */}
          <div className="relative h-[40vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-[80px] bg-slate-100">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {/* Optional Overlay if text needs to be on image, but we leave it clean per the reference */}
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
          </div>

          {/* Right Column - Article Content */}
          <div className="py-12 md:py-20 px-8 md:px-16 lg:px-24 bg-white overflow-y-auto">
            
            <Link href={post.category === "Blog" ? "/blog" : "/the-xperts-news-insights"} className="inline-flex items-center text-[13px] text-slate-500 hover:text-[#2563EB] font-bold mb-8 transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to {post.category === "Blog" ? "Blog" : "News & Insights"}
            </Link>

            <header className="mb-10 space-y-6">
              <span className={`inline-block px-3 py-1 text-[11px] font-black uppercase tracking-widest rounded-full ${post.category === "Blog" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"}`}>
                {post.category}
              </span>
              
              <h1 className="text-[#0B1F3A] text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-[1.1] font-montserrat tracking-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-[18px] text-slate-500 font-medium leading-relaxed border-l-4 border-[#2563EB] pl-4 italic">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-[13px] text-slate-500 font-bold border-t border-b border-slate-100 py-4 mt-8">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-[#2563EB]" />
                  <span className="text-[#0B1F3A]">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#2563EB]" />
                  <span>{post.date}</span>
                </div>
              </div>
            </header>

            <div 
              className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-black prose-headings:text-[#0B1F3A] prose-headings:tracking-tight
                prose-h1:text-[36px] prose-h1:mt-12 prose-h1:mb-6 prose-h1:font-montserrat
                prose-h2:text-[28px] prose-h2:mt-12 prose-h2:mb-5 prose-h2:font-montserrat prose-h2:text-[#0B1F3A]
                prose-h3:text-[22px] prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-montserrat prose-h3:text-slate-800
                prose-h4:text-[18px] prose-h4:mt-6 prose-h4:mb-3 prose-h4:font-montserrat
                prose-p:text-[16px] prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-6
                prose-a:text-[#2563EB] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-ul:mt-2 prose-ul:mb-6 prose-li:text-[16px] prose-li:text-slate-600 prose-li:leading-relaxed
                prose-blockquote:border-l-[#2563EB] prose-blockquote:bg-blue-50/50 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-slate-700 prose-blockquote:font-medium
                prose-strong:font-black prose-strong:text-[#0B1F3A]"
              style={{ '--tw-prose-headings': 'var(--font-montserrat, sans-serif)' } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer id="share" className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <span className="text-[14px] text-[#0B1F3A] font-bold uppercase tracking-wider">Share this article:</span>
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white transition-colors hover:border-transparent">
                      <FacebookIcon className="w-4 h-4 fill-current" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-colors hover:border-transparent">
                      <TwitterIcon className="w-4 h-4 fill-current" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-[#0A66C2] hover:text-white transition-colors hover:border-transparent">
                      <LinkedinIcon className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </footer>

          </div>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
