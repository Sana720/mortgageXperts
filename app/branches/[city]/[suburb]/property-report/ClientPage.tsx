"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  TrendingUp, 
  Download, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Layers,
  Calculator,
  CheckCircle,
  Building,
  ArrowRight,
  Star
} from "lucide-react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { TestimonialSection } from "@/app/components/TestimonialSection";
import { useOnboardingModal } from "@/app/components/OnboardingModalContext";
import { CityData } from "../../ClientPage";

interface SuburbReportClientPageProps {
  cityData: CityData;
  suburbName: string;
  settings: Record<string, string>;
}

export default function SuburbReportClientPage({
  cityData,
  suburbName,
  settings,
}: SuburbReportClientPageProps) {
  const { openModal } = useOnboardingModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic estimate estimates based on city standard
  const getSubInfo = () => {
    switch (cityData.slug) {
      case "sydney":
        return { price: "$1,380,000", rent: "$850/wk", yield: "3.2%", vacancy: "1.2%" };
      case "melbourne":
        return { price: "$920,000", rent: "$620/wk", yield: "3.5%", vacancy: "1.4%" };
      case "brisbane":
        return { price: "$840,000", rent: "$580/wk", yield: "4.2%", vacancy: "0.9%" };
      case "perth":
        return { price: "$680,000", rent: "$550/wk", yield: "5.4%", vacancy: "0.6%" };
      case "adelaide":
        return { price: "$720,000", rent: "$530/wk", yield: "4.8%", vacancy: "0.7%" };
      case "canberra":
        return { price: "$950,000", rent: "$690/wk", yield: "3.9%", vacancy: "1.5%" };
      case "hobart":
        return { price: "$640,000", rent: "$490/wk", yield: "4.5%", vacancy: "1.1%" };
      case "darwin":
        return { price: "$590,000", rent: "$510/wk", yield: "5.8%", vacancy: "1.3%" };
      default:
        return { price: "$750,000", rent: "$550/wk", yield: "4.5%", vacancy: "1.0%" };
    }
  };

  const info = getSubInfo();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      <SiteHeader settings={settings} />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#0B1F3A] text-white">
        <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-15 pointer-events-none" style={{ background: cityData.accentColor }} />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Link 
                href={`/branches/${cityData.slug}/${suburbName.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to {suburbName} Profile
              </Link>

              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest bg-white/10 border-white/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Free Suburb Report
              </div>

              <h1 
                className="text-white text-[36px] sm:text-[48px] lg:text-[56px] font-black leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Get Your Free <span style={{ color: cityData.accentColor }}>{suburbName}</span> Property Report
              </h1>

              <p className="text-white/70 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-xl">
                Access local property values, historic capital growth rates, comparable sales, and rental market analytics for <strong>{suburbName}</strong>. Delivered instantly to your inbox.
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Recent Comparable Sales",
                  "Estimated Property Valuations",
                  "Rental Yield & Vacancy Trends",
                  "Local Suburb Growth & Demographics",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-[13px] text-white/80">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 text-white font-bold text-[14px] py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto cursor-pointer border-0"
                  style={{ background: cityData.accentColor }}
                >
                  Download Free {suburbName} Report <Download className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-white/50">
                  Takes less than 60 seconds • Delivered to email
                </div>
              </div>
            </div>

            {/* Right Column: PDF mockup */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-8 max-w-sm w-full shadow-2xl flex flex-col justify-between space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-2 text-left">
                  <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Suburb Overview</span>
                  <h3 className="text-xl font-bold text-white">{suburbName} Profile</h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="text-[9px] text-white/40 uppercase font-bold">Median House</div>
                      <div className="text-sm font-bold mt-0.5 text-white">{info.price}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="text-[9px] text-white/40 uppercase font-bold">Rental Yield</div>
                      <div className="text-sm font-bold mt-0.5 text-white">{info.yield}</div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-bold text-white/40 uppercase">
                  <span>100% Free PDF</span>
                  <span className="text-emerald-400">Available Now</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── REPORT CONTENT PREVIEW ── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full inline-block text-slate-500 mb-3">What's Inside</span>
            <h2 className="text-[#0B1F3A] text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
              Detailed Insights for {suburbName}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Make smart property decisions with comprehensive local market data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center" style={{ background: cityData.accentLight, color: cityData.accentColor }}>
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">1. Median Valuations</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Understand the current price trends in {suburbName} with median pricing for houses and units to pitch your offer accurately.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center" style={{ background: cityData.accentLight, color: cityData.accentColor }}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">2. Capital Growth &amp; Yields</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Track historical 1-year and 5-year growth alongside rental yields ({info.yield}) to build your investment cashflow models.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center" style={{ background: cityData.accentLight, color: cityData.accentColor }}>
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">3. Demographics &amp; Stock</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Analyze local vacancy rates ({info.vacancy}), demographic profiles, and average days on market to gauge buyer competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs SECTION ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 max-w-3xl">
          <h2 className="text-[#0B1F3A] text-2xl font-bold mb-8 text-center" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `How long does it take to receive the ${suburbName} report?`,
                a: "Your report is processed instantly and sent to your email address within 60 seconds of submitting your request."
              },
              {
                q: "Is there any cost or commitment?",
                a: "No. The property report is 100% free with zero obligation. We offer this report to assist home buyers and investors in their research phase."
              },
              {
                q: "Where does this data come from?",
                a: "We aggregate statistics from reputable property data networks, including CoreLogic, realestate.com.au, and government land registries."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-[#0B1F3A] text-[14px]"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 text-lg">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-500 text-[13px] leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialSection badgeText="Loved by local buyers" />

      {/* ── GET IN TOUCH Banner Card (Lead Gen) ── */}
      <section className="py-16 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none" style={{ background: cityData.accentColor }} />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 text-center max-w-2xl mx-auto space-y-6">
          <span 
            className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border"
            style={{ color: cityData.accentColor, background: `${cityData.accentColor}15`, borderColor: `${cityData.accentColor}30` }}
          >
            Request Report
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
            Ready to secure a property report in <span style={{ color: cityData.accentColor }}>{suburbName}?</span>
          </h2>
          <p className="text-white/70 text-[14px] leading-relaxed">
            Download your free comprehensive report to gain the upper hand at your next open inspection or auction.
          </p>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 text-white font-bold text-[14px] py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-0"
            style={{ background: cityData.accentColor }}
          >
            Start Free Consultation <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </div>
  );
}
