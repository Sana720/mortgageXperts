'use client';

import React from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import { SubPageHero } from '@/app/components/SubPageHero';
import { TestimonialSection } from '@/app/components/TestimonialSection';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, Users } from 'lucide-react';
import { teamMembers } from '@/app/lib/teamData';

export default function NepaliMortgageBrokerAustraliaClient() {
  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} />
      
      <SubPageHero
        pageTitle="Our Team"
        themeColor="blue"
        pageHeroSettings={{
          hero_badge: "Expert Mortgage Brokers",
          hero_title: "Australia's Trusted Nepali Mortgage Brokers.",
          hero_subtext: "Our dedicated team of professionals is committed to helping you secure the best home loan, refinance smarter, and invest with confidence.",
          hero_image: "/images/hero.png"
        }}
      />

      {/* Team Grid Section */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="flex flex-col items-center mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 mb-6">
            <Users className="w-4 h-4 text-[#2563EB]" />
            <span className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider">Meet the Experts</span>
          </div>
          <h2 
            className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A] mb-6"
            style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
          >
            Dedicated to your financial success
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              {/* Card Header Background */}
              <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#1d4ed8]">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full pointer-events-none" />
              </div>
              
              {/* Card Body */}
              <div className="relative p-6 md:p-8 pt-16 flex flex-col flex-grow">
                {/* Overlapping Avatar */}
                <div className="absolute -top-12 left-6 md:left-8 w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-white z-10 group-hover:scale-105 transition-transform duration-300">
                  {member.image.includes('ui-avatars') ? (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[#2563EB] font-bold text-2xl" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
                      {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                  ) : (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <h3 
                  className="text-[20px] font-bold text-[#0B1F3A] mb-1"
                  style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
                >
                  {member.name}
                </h3>
                <p className="text-[14px] text-[#2563EB] font-bold mb-5">{member.role}</p>
                
                <div className="space-y-3 mb-8 flex-grow">
                  <a href={`mailto:${member.email}`} className="flex items-center text-[14px] text-slate-600 hover:text-[#2563EB] transition-colors break-all">
                    <Mail className="w-4 h-4 mr-2.5 text-[#2563EB] shrink-0" />
                    {member.email}
                  </a>
                  <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="flex items-center text-[14px] text-slate-600 hover:text-[#2563EB] transition-colors">
                    <Phone className="w-4 h-4 mr-2.5 text-[#2563EB] shrink-0" />
                    {member.phone}
                  </a>
                </div>
                
                <Link 
                  href={`/our-team/${member.slug}`}
                  className="inline-flex items-center justify-center w-full bg-slate-50 text-[#0B1F3A] hover:bg-[#2563EB] hover:text-white px-4 py-3 rounded-xl font-bold text-[14px] transition-all duration-300 border border-slate-200 hover:border-[#2563EB]"
                >
                  View Profile
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection settings={{}} />

      {/* Lenders Marquee */}
      <section className="py-12 bg-white border-y border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-8 text-center">
          <p className="text-[12px] font-bold text-slate-400 tracking-wider uppercase">Trusted by 40+ Australian Lenders</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center space-x-12 px-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={`marquee-1-${i}`} className="w-32 h-12 bg-slate-100 rounded-lg flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <span className="text-slate-400 font-bold text-[14px]">LENDER {i}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center space-x-12 px-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={`marquee-2-${i}`} className="w-32 h-12 bg-slate-100 rounded-lg flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <span className="text-slate-400 font-bold text-[14px]">LENDER {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
