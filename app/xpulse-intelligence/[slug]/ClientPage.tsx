'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Copy, Check, ChevronRight } from 'lucide-react';
import { BlogPost, blogPosts } from '@/app/lib/blogData';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.14 4.162 4.183-1.095z"/>
  </svg>
);

export default function BlogPostClient({ post, allPosts }: { post: BlogPost; allPosts?: BlogPost[] }) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  React.useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Compute related posts (excluding current post)
  const postsPool = allPosts && allPosts.length > 0 ? allPosts : blogPosts;
  const relatedPosts = postsPool
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  const shareTitle = encodeURIComponent(post.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${encodeURIComponent(currentUrl)}`
  };

  const handleCopy = () => {
    if (currentUrl && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} />

      <article id="article" className="w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] min-h-[calc(100vh-80px)]">
          
          {/* Left Column - Sticky Cover Image */}
          <div className="relative h-[40vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-[80px] bg-slate-100 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Right Column - Article Body */}
          <div className="py-10 md:py-16 px-6 sm:px-10 lg:px-16 bg-white overflow-y-auto">
            
            <Link href="/blog" className="inline-flex items-center text-[13px] text-blue-600 hover:text-[#0B1F3A] font-bold mb-8 transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Blog & Insights
            </Link>

            <header className="mb-10 space-y-5">
              <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-blue-50 text-blue-700">
                {post.category}
              </span>
              
              <h1 
                className="text-[#0B1F3A] text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold leading-[1.15] tracking-tight"
                style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
              >
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-[17px] text-slate-600 font-medium leading-relaxed border-l-4 border-blue-600 pl-4 italic bg-slate-50 py-3 rounded-r-lg">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] text-slate-500 font-semibold border-t border-b border-slate-100 py-4 mt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1.5 text-blue-600" />
                    <span className="text-[#0B1F3A]">{post.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-blue-600" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Content Body */}
            <div 
              className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-extrabold prose-headings:text-[#0B1F3A] prose-headings:tracking-tight
                prose-h2:text-[26px] prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-[#0B1F3A]
                prose-h3:text-[20px] prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-800
                prose-p:text-[16px] prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-6
                prose-a:text-blue-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-ul:mt-2 prose-ul:mb-6 prose-li:text-[16px] prose-li:text-slate-600 prose-li:leading-relaxed
                prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50/60 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-slate-700
                prose-strong:font-bold prose-strong:text-[#0B1F3A]"
              style={{ '--tw-prose-headings': 'var(--font-montserrat, sans-serif)' } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Social Share Section */}
            <footer id="share" className="mt-14 pt-8 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                <span className="text-[14px] text-[#0B1F3A] font-bold uppercase tracking-wider">
                  Share Article:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a 
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all"
                    title="Share on Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 hover:bg-black hover:text-white transition-all"
                    title="Share on X"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all"
                    title="Share on LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                    title="Share on WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={handleCopy}
                    className="h-10 px-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-1.5 text-[13px] font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>
            </footer>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-blue-600 text-[12px] font-bold uppercase tracking-wider block">Recommended</span>
                    <h2 
                      className="text-[24px] font-extrabold text-[#0B1F3A]"
                      style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
                    >
                      Related Articles
                    </h2>
                  </div>
                  <Link 
                    href="/blog" 
                    className="text-[13px] font-bold text-blue-600 hover:text-[#0B1F3A] inline-flex items-center"
                  >
                    View All <ChevronRight className="w-4 h-4 ml-0.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(item => (
                    <article 
                      key={item.id || item.slug}
                      className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group"
                    >
                      <Link href={`/xpulse-intelligence/${item.slug}`} className="block h-36 overflow-hidden bg-slate-200">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="p-4 flex flex-col flex-grow">
                        <span className="text-[11px] font-semibold text-slate-500 mb-1">{item.date}</span>
                        <h3 
                          className="text-[15px] font-bold text-[#0B1F3A] mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
                          style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
                        >
                          <Link href={`/xpulse-intelligence/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h3>
                        <Link
                          href={`/xpulse-intelligence/${item.slug}`}
                          className="mt-auto pt-3 text-[12px] font-bold text-blue-600 inline-flex items-center group-hover:translate-x-0.5 transition-transform"
                        >
                          Read Article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
