'use client';

import React from 'react';
import Image from 'next/image';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import { SubPageHero } from '@/app/components/SubPageHero';
import { TestimonialSection } from '@/app/components/TestimonialSection';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, Users } from 'lucide-react';

interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  email: string;
  phone: string;
  slug: string;
  image: string;
}

export default function OurTeamClient({ initialTeamMembers = [] }: { initialTeamMembers?: TeamMember[] }) {
  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} />
      
      <SubPageHero
        pageTitle="Our Team"
        themeColor="blue"
        layoutType="clean"
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit mb-4 mx-auto select-none">
            <Users className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[#2563EB] text-[10px] font-extrabold tracking-widest uppercase">Meet the Experts</span>
          </div>
          <h2 
            className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-black leading-tight mb-4"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Dedicated to your <span className="text-[#2563EB]">financial success</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {initialTeamMembers.map((member) => (
            <div 
              key={member.id as string} 
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
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[#2563EB] font-bold text-2xl" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
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
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
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
      <TestimonialSection />

      {/* Lenders Marquee */}
      <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-6">
          <h3 className="text-center text-[14px] font-bold text-slate-400 uppercase tracking-widest">
            Over 40+ Lending Partners
          </h3>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center space-x-12 px-6 group-hover:pause">
            {[
              "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png",
              "/images/brands/westpac-logo-png_seeklogo-152472-1.png",
              "/images/brands/anz-2-logo-png-transparent-1.png",
              "/images/brands/ING_Group_N.V._Logo.svg-1.png",
              "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png",
              "/images/brands/westpac-logo-png_seeklogo-152472-1.png",
              "/images/brands/anz-2-logo-png-transparent-1.png",
              "/images/brands/ING_Group_N.V._Logo.svg-1.png"
            ].map((src, i) => (
              <div key={i} className="relative w-[120px] h-[40px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all flex-shrink-0">
                <Image src={src} alt="Lender Logo" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
