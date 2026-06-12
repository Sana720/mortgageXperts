"use client";

import React from "react";
import Image from "next/image";
import { Shield, Target, Users, CheckCircle, MapPin, Mail, Phone, Clock } from "lucide-react";
import { SubPageHero } from "@/app/components/SubPageHero";
import { TestimonialSection } from "@/app/components/TestimonialSection";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";

interface ClientPageProps {
  settings?: Record<string, string>;
}

export function ClientPage({ settings }: ClientPageProps) {
  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} settings={settings} />
      <SubPageHero
        pageTitle="Who We Help"
        themeColor="blue"
        pageHeroSettings={{
          hero_badge: "Who We Help",
          hero_title: "Who We Help",
          hero_subtext: "Australia’s Trusted Multilingual Mortgage Broker in Melbourne, Sydney, Perth, Brisbane & Nationwide",
          hero_image: "/images/hero.png",
        }}
      />

      {/* SECTION 1: Expert Home Loan Services */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-[600px] order-2 lg:order-1">
            <Image
              src="/images/family_couch_laptop.png"
              alt="Family looking at laptop"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000b1e]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center gap-4 mb-2">
                  <Shield className="w-8 h-8 text-[#2563EB]" />
                  <h3 className="text-[18px] font-bold text-[#0B1F3A]">Trusted Advice</h3>
                </div>
                <p className="text-[14px] text-slate-600">
                  Recognized for excellence and trusted by the multicultural community to achieve home ownership in Australia.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200">
              <Users className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider">Expertise</span>
            </div>
            
            <h2 
              className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
              style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
            >
              Australia’s Trusted Multilingual Mortgage Broker
            </h2>
            
            <div className="space-y-5 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              <p>
                Mortgage Xperts is a trusted Australian mortgage broker, led by Aakash and supported by an expert team, providing personalized home loan solutions for first-home buyers, investors, refinancers, and clients with unique financial situations. With deep knowledge of the home loan market and strong connections with buyers’ agents and conveyancers, we ensure a smooth and efficient loan process.
              </p>
              <p>
                We have proudly helped hundreds of Nepali families and Australian clients across Melbourne, Sydney, Perth, Brisbane, and nationwide, offering expert support in multiple languages including English and Nepali. 
              </p>
              <p>
                Mortgage Xperts works with a wide panel of leading Australian banks and lenders, providing competitive rates and tailored solutions. Recognized for excellence and trusted by the multicultural community, we are committed to helping families and individuals achieve their dream of home ownership in Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Supporting Multicultural Communities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-[12px] font-bold text-amber-700 uppercase tracking-wider">Who We Help</span>
              </div>
              
              <h2 
                className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Supporting Nepali Families and Multicultural Communities Across Australia
              </h2>
              
              <div className="space-y-5 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
                <div>
                  <strong className="text-[#0B1F3A] block mb-1">✔ First-Home Buyers</strong>
                  We specialize in assisting first-home buyers, including many Nepali families and migrants, navigating the challenges of entering the Australian property market for the first time. From understanding eligibility to deposit requirements, we walk you through every step.
                </div>
                <div>
                  <strong className="text-[#0B1F3A] block mb-1">✔ Property Investors</strong>
                  For property investors, we provide tailored strategies to help maximize your returns and secure loans suited to your long-term investment goals.
                </div>
                <div>
                  <strong className="text-[#0B1F3A] block mb-1">✔ Refinancing</strong>
                  We assist clients looking to refinance, whether it’s to reduce interest rates, consolidate debt, or access equity for future investments, ensuring a smooth process that saves you time and money.
                </div>
                <div>
                  <strong className="text-[#0B1F3A] block mb-1">✔ Complex Financial Situations</strong>
                  Beyond standard lending, we help self-employed borrowers, migrants with limited Australian credit history, or anyone whose financial profile doesn’t fit traditional lending criteria.
                </div>
                <div>
                  <strong className="text-[#0B1F3A] block mb-1">✔ Multilingual Support</strong>
                  We understand the unique needs of the Nepali and multicultural communities. We offer support in Nepali, English, Hindi, and Punjabi.
                </div>
              </div>

              <div className="pt-4 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                <p className="text-[14px] font-medium text-[#0B1F3A] leading-relaxed">
                  Whether you are buying your first home, investing in property, refinancing your loan, or navigating a complex financial situation, Mortgage Xperts is committed to helping you achieve your dreams.
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-[700px]">
              <Image
                src="/images/cta-couple.png"
                alt="Happy couple looking at keys"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0B1F3A]/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection settings={settings} />

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

      {/* Proper Contact Section */}
      <section className="py-20 md:py-28 relative bg-[#F0F4FA] overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-blue-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-rose-200/30 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Company Details (Left) */}
            <div className="space-y-8">
              <div>
                <h2 
                  className="text-[32px] sm:text-[42px] font-bold leading-tight text-[#0B1F3A] mb-4"
                  style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
                >
                  Ready to take the next step?
                </h2>
                <p className="text-[16px] sm:text-[18px] text-slate-600 leading-relaxed max-w-md">
                  Book a free consultation today and let&apos;s discuss how we can help you achieve your property goals. Our experts are ready to assist you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B1F3A]">Head Office</h4>
                    <p className="text-[14px] text-slate-600 mt-1">{settings?.footer_address || "Level 20, 1 Market St, Sydney NSW 2000"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B1F3A]">Phone Number</h4>
                    <a href={`tel:${(settings?.header_phone || "0450 240 757").replace(/\s+/g, "")}`} className="text-[14px] text-slate-600 mt-1 hover:text-[#2563EB] transition-colors">
                      {settings?.header_phone || "0450 240 757"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B1F3A]">Email Address</h4>
                    <a href={`mailto:${settings?.support_email || "mortgage@mortgagexperts.com.au"}`} className="text-[14px] text-slate-600 mt-1 hover:text-[#2563EB] transition-colors break-all">
                      {settings?.support_email || "mortgage@mortgagexperts.com.au"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B1F3A]">Business Hours</h4>
                    <p className="text-[14px] text-slate-600 mt-1">Mon - Fri: 8:00 AM - 6:00 PM AEST<br/>Sat - Sun: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form (Right) */}
            <div className="w-full bg-white rounded-3xl shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-100 p-6 sm:p-10">
              <h3 className="text-[24px] font-bold text-[#0B1F3A] mb-6">Send us a message</h3>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-700">First Name</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" placeholder="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-700">Last Name</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-slate-700">Email Address</label>
                  <input type="email" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" placeholder="john@example.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-slate-700">Phone Number</label>
                  <input type="tel" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" placeholder="0400 000 000" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-slate-700">How can we help?</label>
                  <textarea className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px] resize-none" placeholder="Tell us about your property goals..." />
                </div>
                <button type="submit" className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl font-bold text-[14px] transition-all shadow-md shadow-blue-200 mt-2">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </div>
  );
}
