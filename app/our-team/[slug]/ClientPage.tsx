'use client';

import React from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { SiteFooter } from '@/app/components/SiteFooter';
import { SubPageHero } from '@/app/components/SubPageHero';
import { TestimonialSection } from '@/app/components/TestimonialSection';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { TeamMember } from '@/app/lib/teamData';

export default function TeamMemberClient({ member }: { member: TeamMember }) {
  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} />

      <SubPageHero
        pageTitle={member.name}
        themeColor="blue"
        pageHeroSettings={{
          hero_badge: "Team Profile",
          hero_title: member.name,
          hero_subtext: member.role,
          hero_image: "/images/hero.png",
          hero_btn1_text: "Book a Consultation",
          hero_btn1_link: "/best-nepali-investment-mortgage-broker-perth",
          hero_btn2_text: "Contact Directly",
          hero_btn2_link: `mailto:${member.email}`
        }}
      />

      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <Link href="/nepali-mortgage-broker-australia" className="inline-flex items-center text-[14px] text-slate-500 hover:text-[#2563EB] font-bold mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Team
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Image & Quick Contact Section */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200 flex flex-col">
            <div className="relative h-[400px] lg:h-[500px] w-full bg-slate-100 flex items-center justify-center">
              {member.image.includes('ui-avatars') ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] to-[#1d4ed8] flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20 backdrop-blur-md shadow-xl">
                    <span className="text-6xl font-light text-white tracking-widest" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
                      {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                </div>
              ) : (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              )}
            </div>
            
            <div className="p-8">
              <h3 
                className="text-[24px] font-bold text-[#0B1F3A] mb-2"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Contact {member.name.split(' ')[0]}
              </h3>
              
              <div className="space-y-4 mt-6">
                <a href={`mailto:${member.email}`} className="flex items-center p-4 bg-[#F0F4FA] rounded-2xl text-[15px] text-[#0B1F3A] font-bold hover:bg-blue-100 hover:text-[#2563EB] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                    <Mail className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  {member.email}
                </a>
                <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="flex items-center p-4 bg-[#F0F4FA] rounded-2xl text-[15px] text-[#0B1F3A] font-bold hover:bg-blue-100 hover:text-[#2563EB] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                    <Phone className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  {member.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 mb-4">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider">About Me</span>
              </div>
              
              <h2 
                className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A] mb-6"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Get to know {member.name.split(' ')[0]}
              </h2>
              
              <div className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed whitespace-pre-line">
                {member.bio}
              </div>
            </div>

            <div>
              <h3 
                className="text-[24px] font-bold text-[#0B1F3A] mb-6"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Areas of Expertise
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {member.expertise.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="text-[15px] text-slate-700 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <TestimonialSection settings={{}} />

      <SiteFooter />
    </div>
  );
}
