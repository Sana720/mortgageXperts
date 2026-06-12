"use client";

import React from "react";
import { MapPin, Mail, Phone, Globe, Building2, ChevronRight } from "lucide-react";
import { SubPageHero } from "@/app/components/SubPageHero";
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
        pageTitle="Contact Us"
        themeColor="blue"
        pageHeroSettings={{
          hero_badge: "Get In Touch",
          hero_title: "Contact Us",
          hero_subtext: "We work with 40+ lenders to deliver expert mortgage solutions nationwide. Reach out to us today to start your property journey.",
          hero_image: "/images/hero.png",
        }}
      />

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Office Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 mb-6">
                <Globe className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider">Nationwide Service</span>
              </div>
              
              <h2 
                className="text-[32px] sm:text-[42px] font-bold leading-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Office Location
              </h2>
              <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
                Mortgage Xperts is a trusted Australian mortgage brokerage led by Aakash K C, helping Nepali clients across Australia — from major cities to regional centres including Newcastle, Gold Coast, Sunshine Coast, Hobart, Launceston, and Cairns.
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2 text-[13px] font-bold text-[#0B1F3A]">
                <span className="bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">Perth</span>
                <span className="bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">Sydney</span>
                <span className="bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">Melbourne</span>
                <span className="bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">Adelaide</span>
                <span className="bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">Brisbane</span>
                <span className="bg-blue-600 text-white px-3 py-1.5 rounded-md shadow-sm">Nationwide</span>
              </div>
            </div>

            {/* Office Cards */}
            <div className="space-y-6">
              {/* Perth Office */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-blue-200 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Building2 className="w-7 h-7 text-[#2563EB]" />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-[#0B1F3A]">Perth Australia</h3>
                    <span className="text-[13px] font-bold text-[#2563EB] uppercase tracking-wide">Head Office</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <a href="mailto:mortgage@mortgagexperts.com.au" className="text-[15px] font-medium text-slate-600 hover:text-[#2563EB] transition-colors break-all">
                      mortgage@mortgagexperts.com.au
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <a href="tel:0450240757" className="text-[15px] font-medium text-slate-600 hover:text-[#2563EB] transition-colors">
                      0450 240 757
                    </a>
                  </div>
                </div>
              </div>

              {/* Melbourne Office */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-blue-200 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-50 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-[#0B1F3A]">Melbourne Australia</h3>
                    <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wide">Branch Office</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <a href="mailto:mortgage@mortgagexperts.com.au" className="text-[15px] font-medium text-slate-600 hover:text-[#2563EB] transition-colors break-all">
                      mortgage@mortgagexperts.com.au
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <a href="tel:0450240757" className="text-[15px] font-medium text-slate-600 hover:text-[#2563EB] transition-colors">
                      0450 240 757
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-100 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-blue-600 via-[#38BDF8] to-blue-600"></div>
              
              <div className="mb-8">
                <h3 className="text-[28px] font-bold text-[#0B1F3A] mb-2" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>Contact Us</h3>
                <p className="text-slate-500 text-[15px]">Fill out the form below and one of our expert brokers will get back to you shortly.</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-[#0B1F3A] uppercase tracking-wide">Name</label>
                    <input 
                      type="text" 
                      className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10 transition-all text-[15px] font-medium outline-none" 
                      placeholder="John" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-[#0B1F3A] uppercase tracking-wide">Surname</label>
                    <input 
                      type="text" 
                      className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10 transition-all text-[15px] font-medium outline-none" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#0B1F3A] uppercase tracking-wide">Email</label>
                  <input 
                    type="email" 
                    className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10 transition-all text-[15px] font-medium outline-none" 
                    placeholder="john.doe@example.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#0B1F3A] uppercase tracking-wide">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10 transition-all text-[15px] font-medium outline-none" 
                    placeholder="+61 400 000 000" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#0B1F3A] uppercase tracking-wide">Your Message</label>
                  <textarea 
                    className="w-full h-32 px-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10 transition-all text-[15px] font-medium outline-none resize-none" 
                    placeholder="Type your query or question here..." 
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full h-14 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl font-bold text-[16px] transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group"
                  >
                    Submit <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[12px] text-slate-500 text-center mt-4 leading-relaxed max-w-md mx-auto">
                    By clicking ‘Submit ’, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert’s brokers.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] md:h-[500px] w-full bg-slate-200 relative border-t border-slate-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.6756611328956!2d115.85501861516086!3d-31.95351238122826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bad5293bd573%3A0x863339edc82e0436!2sPerth%20WA!5e0!3m2!1sen!2sau!4v1689654124968!5m2!1sen!2sau" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-multiply"
          title="Mortgage Xperts Office Location"
        />
        
        {/* Overlay gradient to blend map beautifully */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000b1e]/90 via-[#000b1e]/40 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 right-0 py-10 px-6 z-10 text-center pointer-events-none">
          <h3 className="text-white text-[24px] md:text-[32px] font-bold" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>Find Us In Perth</h3>
          <p className="text-blue-200 text-[15px] mt-2">Serving clients nationwide across Australia.</p>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </div>
  );
}
