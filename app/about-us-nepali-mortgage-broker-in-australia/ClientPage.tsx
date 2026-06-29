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
  pageHeroSettings?: {
    h1_heading?: string;
    sub_heading?: string;
    hero_image?: string;
  };
}

export function ClientPage({ settings, pageHeroSettings }: ClientPageProps) {
  const contentObj = settings?.aboutus_content ? JSON.parse(settings.aboutus_content) : {};
  const heroImage = pageHeroSettings?.hero_image || "/images/hero.png";
  const h1Heading = pageHeroSettings?.h1_heading || "ABOUT OUR COMPANY";
  const subHeading = pageHeroSettings?.sub_heading || "Our Company Been Working Successfully For Your Dream Home";

  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} settings={settings} />
      <SubPageHero
        pageTitle="About Us"
        themeColor="blue"
        layoutType="clean"
        pageHeroSettings={{
          hero_badge: "About Us",
          hero_title: h1Heading,
          hero_subtext: subHeading,
          hero_image: heroImage,
        }}
      />

      {/* SECTION 1: Image Left, Text Right */}
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
                  <h3 className="text-[18px] font-bold text-[#0B1F3A]">{contentObj.sec1_badge || "Trusted Advice"}</h3>
                </div>
                <p className="text-[14px] text-slate-600">
                  {contentObj.sec1_badge_desc || "We are fully licensed and compliant, acting in your best interest always."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200">
              <Users className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider">{contentObj.sec1_approach_badge || "Our Approach"}</span>
            </div>
            
            <h2 
              className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
              style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
            >
              {contentObj.sec1_title || "Making your property journey straightforward."}
            </h2>
            
            <div className="space-y-5 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              <p>
                {contentObj.sec1_p1 || "At Mortgage Xperts, we understand that entering the property market can feel overwhelming. Whether you're buying your first home or expanding your investment portfolio, we're here to guide you through every step with clear, honest advice and practical support."}
              </p>
              <p>
                {contentObj.sec1_p2 || "Our goal is to make the home loan process as straightforward as possible. We take the time to understand your unique situation, explain your options in plain language, and coordinate with lenders so you don't have to worry about the details."}
              </p>
              <p>
                As a fully licensed and compliant mortgage broker, we are committed to acting in your best interest - always. We believe in building long-term relationships and providing advice that adapts as your circumstances change, helping you make confident decisions now and in the future.
              </p>
              <p>
                At Mortgage Xperts, you're not just another client. We're invested in your journey and proud to help you achieve your property goals with integrity and professionalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Text Left, Image Right */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-[12px] font-bold text-amber-700 uppercase tracking-wider">{contentObj.sec2_badge || "Your Lifelong Partner"}</span>
              </div>
              
              <h2 
                className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                {contentObj.sec2_title || "Tailored solutions for your unique situation."}
              </h2>
              
              <div className="space-y-5 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
                <p>
                  {contentObj.sec2_p1 || "Whether you're buying your first home, adding a third investment property, consolidating debt, refinancing for a better rate, or accessing the equity in your property for any purpose, we make the process straightforward and manageable."} We know financial solutions aren't one-size-fits-all, so with our wide network of lenders and loan products, we can find the right fit for your unique situation — including for those who don't fit the usual lending criteria.
                </p>
                <p>
                  When you work with Mortgage Xperts, we handle all communication with lenders on your behalf, saving you the frustration that often comes with dealing directly with financial institutions. More importantly, we're here to fight for the best possible rate for you.
                </p>
                <p>
                  Because we're not tied to any one lender, we can objectively assess what you're eligible to borrow, simplify your options, take care of all the paperwork, and guide you through every step – from application right through to settlement, and beyond. At Mortgage Xperts, you're a client for life, not just during the loan process.
                </p>
                <p>
                  We're paid a fully disclosed commission by lenders, so there are no hidden fees when you work with us. Our business thrives on referrals from satisfied clients, which speaks to the high level of service and trust we deliver.
                </p>
                <p>
                  We take the time to understand your financial situation, goals, and what you want to achieve. From there, we carefully select the loan products best suited to you from a panel of over 40+ major banks and lenders, ensuring you get the right solution tailored to your needs.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "No Hidden Fees",
                  "40+ Major Banks & Lenders",
                  "Paperwork Handled",
                  "Client For Life"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-[14px] font-bold text-[#0B1F3A]">{feature}</span>
                  </div>
                ))}
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

      <TestimonialSection />

      {/* Lenders Marquee */}
      <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-6">
          <h3 className="text-center text-[14px] font-bold text-slate-400 uppercase tracking-widest">
            40+ Lenders
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
                  Book a free consultation today and let's discuss how we can help you achieve your property goals. Our experts are ready to assist you.
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
                  <input type="tel" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" placeholder="" />
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
