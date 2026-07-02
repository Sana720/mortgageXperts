'use client';

import React from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import { SubPageHero } from '@/app/components/SubPageHero';
import { TestimonialSection } from '@/app/components/TestimonialSection';
import { Download, CheckCircle2 } from 'lucide-react';
import { PageHeroSettings } from '@/lib/pageLoader';

interface ClientPageProps {
  settings?: Record<string, string>;
  pageHeroSettings?: PageHeroSettings;
  pageContent?: string;
}

export default function FirstHomeGuideClient({ settings = {}, pageHeroSettings, pageContent }: ClientPageProps) {
  const finalHeroSettings = pageHeroSettings || {
    hero_badge: "Free Resource",
    hero_title: "First Home Buyers Guide",
    hero_subtext: "Everything you need to know about buying your first property in Australia, from saving a deposit to settlement.",
    hero_image: "/images/hero.png",
    hero_btn1_text: "Download Guide",
    hero_btn1_link: "/assets/first-home-buyers-guide.pdf",
    hero_btn2_text: "Free Strategy Call",
    hero_btn2_link: "/best-nepali-investment-mortgage-broker-perth"
  };

  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} settings={settings} />

      <SubPageHero
        pageTitle="First Home Buyers Guide"
        themeColor="teal"
        pageHeroSettings={finalHeroSettings}
      />

      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="space-y-6">
            <h2 
              className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
              style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
            >
              Master the property market
            </h2>
            
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed mb-8">
              {pageContent || "Buying your first home is an exciting milestone, but the process can often feel overwhelming. Our comprehensive guide breaks down every step into simple, actionable advice."}
            </p>

            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full opacity-50 pointer-events-none" />
              
              <h3 
                className="text-[22px] font-bold text-[#0B1F3A] mb-6 relative z-10"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                What you'll learn:
              </h3>
              
              <ul className="space-y-5 mb-8 relative z-10">
                {[
                  "How much deposit you actually need in 2024",
                  "Understanding government grants and schemes",
                  "The hidden costs of buying property",
                  "How to get pre-approval fast",
                  "Negotiation tips for first-timers"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] sm:text-[16px] text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={finalHeroSettings.hero_btn1_link || "/assets/first-home-buyers-guide.pdf"} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-bold text-[15px] transition-all duration-300 shadow-lg shadow-teal-500/20 relative z-10"
              >
                <Download className="w-5 h-5 mr-2" />
                {finalHeroSettings.hero_btn1_text || "Download PDF Guide Now"}
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-[650px]">
            <img
              src="/images/family_couch_laptop.png"
              alt="Family reading guide"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 to-transparent flex flex-col justify-end p-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                <p className="text-[18px] font-bold mb-2">100% Free Resource</p>
                <p className="text-white/80 text-[14px]">No email required. Instant access.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <TestimonialSection />

      <SiteFooter settings={settings} />
    </div>
  );
}
