"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Star,
  TrendingUp,
  Home,
  Users,
  Award,
  Clock,
  Shield,
} from "lucide-react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { TestimonialSection } from "@/app/components/TestimonialSection";
import { RoadmapSection } from "@/app/components/RoadmapSection";
import { LenderPanelSection } from "@/app/components/LenderPanelSection";
import { MarketOverviewSection } from "@/app/components/MarketOverviewSection";
import { useOnboardingModal } from "@/app/components/OnboardingModalContext";
import { CityData } from "../ClientPage";

interface SuburbClientPageProps {
  cityData: CityData;
  suburbName: string;
  settings: Record<string, string>;
}

const EASE_OUT = [0.25, 1, 0.5, 1];

export default function SuburbClientPage({
  cityData,
  suburbName,
  settings,
}: SuburbClientPageProps) {
  const { openModal } = useOnboardingModal();

  const phoneVal = settings?.header_phone || "0450 240 757";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      <SiteHeader settings={settings} />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-50 border-b border-slate-100">
        {/* Colorful Glow Blobs */}
        <div 
          className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-15 pointer-events-none"
          style={{ background: cityData.accentColor }}
        />
        <div 
          className="absolute left-[-5%] bottom-[-10%] w-[450px] h-[450px] rounded-full blur-[130px] opacity-10 pointer-events-none"
          style={{ background: "#3B82F6" }}
        />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Suburb-Focused Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* State Badge */}
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest"
                style={{ color: cityData.accentColor, background: cityData.accentLight, borderColor: `${cityData.accentColor}25` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cityData.accentColor }} />
                {suburbName}, {cityData.stateShort}
              </div>

              {/* Dynamic Suburb Title */}
              <h1 
                className="text-[#0B1F3A] text-[36px] sm:text-[48px] lg:text-[56px] font-black leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Mortgage Broker in <span style={{ color: cityData.accentColor }}>{suburbName}</span>
              </h1>

              {/* Description */}
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
                Looking to secure a home loan in <strong>{suburbName}</strong>? Our experienced mortgage brokers understand the {cityData.city} property landscape. We compare 40+ leading Australian banks and lenders to secure a competitive rate and tailors a lending strategy specific to your financial goals.
              </p>

              {/* Rating Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                    <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-[#FBBF24] fill-[#FBBF24]" />
                      ))}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold mt-0.5">4.9/5 (760+ Google Reviews)</div>
                  </div>
                </div>
                <div className="w-px h-6 bg-slate-200 hidden sm:block" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                    <span className="text-[11px] font-extrabold text-blue-600">f</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-[#FBBF24] fill-[#FBBF24]" />
                      ))}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold mt-0.5">5/5 (230+ Facebook Reviews)</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto"
                  style={{ background: cityData.accentColor, boxShadow: `0 10px 15px -3px ${cityData.accentColor}30` }}
                >
                  Book Strategy Call <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/borrowing-power-calculator"
                  className="inline-flex items-center justify-center gap-2 text-slate-700 bg-white border border-slate-200 font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 text-center w-full sm:w-auto"
                >
                  Check Borrowing Power
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Graphic card */}
            <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center lg:justify-end">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] max-w-sm space-y-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563EB]">
                  <Home className="w-6 h-6" style={{ color: cityData.accentColor }} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#0B1F3A]">{suburbName} Lending</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    Compare interest rates, stamp duty exemptions, and low deposit government schemes available for {suburbName} buyers instantly.
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>No Broker Fees</span>
                  <span className="text-blue-600" style={{ color: cityData.accentColor }}>40+ Lenders</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── LENDER PANEL & ACCREDITATIONS SECTION ── */}
      <LenderPanelSection />

      {/* ── MARKET OVERVIEW SECTION ── */}
      <MarketOverviewSection
        city={suburbName}
        state={cityData.state}
        accentColor={cityData.accentColor}
        accentLight={cityData.accentLight}
      />

      {/* ── ROADMAP / PROCESS SECTION ── */}
      <RoadmapSection colorTheme={
        cityData.slug === "melbourne" ? "purple" :
        cityData.slug === "brisbane" ? "amber" :
        cityData.slug === "perth" ? "emerald" :
        cityData.slug === "adelaide" ? "sky" :
        "blue"
      } />

      {/* ── KEY BENEFITS ── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center" style={{ background: cityData.accentLight }}>
                <TrendingUp className="w-5 h-5" style={{ color: cityData.accentColor }} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">Maximize Borrowing Power</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                We navigate lender guidelines specifically for {suburbName} properties to unlock your highest possible borrowing capacity.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center" style={{ background: cityData.accentLight }}>
                <Shield className="w-5 h-5" style={{ color: cityData.accentColor }} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">Government Grants Assistance</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Ensure you claim all eligible state concessions, stamp duty exemptions, and first-home guarantees.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center" style={{ background: cityData.accentLight }}>
                <Clock className="w-5 h-5" style={{ color: cityData.accentColor }} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">Fast Pre-Approvals</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Submit details digitally and get pre-approved quickly so you can bid on your ideal {suburbName} home with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOAN SERVICES IN SUBURB ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span 
              className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border"
              style={{ color: cityData.accentColor, background: cityData.accentLight, borderColor: `${cityData.accentColor}30` }}
            >
              Loan Solutions in {suburbName}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A]" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
              Tailored Home Finance for <span style={{ color: cityData.accentColor }}>{suburbName}</span> Buyers &amp; Owners
            </h2>
            <p className="text-slate-500 text-[14px] leading-relaxed">
              Whether you are buying your first home, upgrading, refinancing or expanding your investment portfolio in {suburbName}, we provide unbiased advice with access to 40+ lenders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "First Home Buyer Loans",
                desc: `Purchase in ${suburbName} with as little as 5% deposit. We assist with ${cityData.stateShort} First Home Owner Grants, Stamp Duty Exemptions & Federal Guarantees.`,
                icon: <Home className="w-5 h-5" />,
              },
              {
                title: "Refinancing & Rate Swaps",
                desc: `Existing ${suburbName} homeowner? Reduce your monthly repayments, access home equity for renovations or cash-out with sharp interest rates.`,
                icon: <TrendingUp className="w-5 h-5" />,
              },
              {
                title: "Investment Property Loans",
                desc: `Build long-term wealth in ${suburbName}. We structure tax-effective investment loans with interest-only options and offset accounts.`,
                icon: <Users className="w-5 h-5" />,
              },
              {
                title: "Doctor, Nurse & Self-Employed",
                desc: `Exclusive 90% LVR No LMI waivers for medical & accounting professionals in ${suburbName}, plus low-doc options for self-employed business owners.`,
                icon: <Award className="w-5 h-5" />,
              },
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: cityData.accentLight, color: cityData.accentColor }}
                >
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A]">{service.title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP BY STEP PROCESS ── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span 
              className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border"
              style={{ color: cityData.accentColor, background: cityData.accentLight, borderColor: `${cityData.accentColor}30` }}
            >
              How It Works
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A]" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
              Simple 4-Step Journey to Your {suburbName} Home Loan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Free Consultation",
                desc: `Discuss your deposit, budget, and goals for ${suburbName} in English, Nepali, or Hindi.`,
              },
              {
                step: "02",
                title: "Lender Comparison",
                desc: `We compare 40+ banks & non-bank lenders to find the sharpest interest rate and fee structure.`,
              },
              {
                step: "03",
                title: "Pre-Approval",
                desc: `Get formal pre-approval ready so you can make offers or bid at auction in ${suburbName} with 100% confidence.`,
              },
              {
                step: "04",
                title: "Settlement & Support",
                desc: `We manage paperwork, conveyancer coordination, and grant payouts through to key handover.`,
              },
            ].map((item, i) => (
              <div key={i} className="relative space-y-3">
                <div 
                  className="text-3xl font-black"
                  style={{ color: cityData.accentColor }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">{item.title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBURB FAQ SECTION ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span 
                className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border"
                style={{ color: cityData.accentColor, background: cityData.accentLight, borderColor: `${cityData.accentColor}30` }}
              >
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
                Frequently Asked Questions for {suburbName} Buyers
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: `Why use a Nepali mortgage broker in ${suburbName}?`,
                  a: `Our team provides bilingual guidance in Nepali and English, helping you navigate the Australian banking system smoothly. We make sure you understand every clause, interest rate option, and grant entitlement without language barriers.`
                },
                {
                  q: `How much deposit do I need to buy a home in ${suburbName}?`,
                  a: `Most lenders prefer a 20% deposit to avoid LMI (Lenders Mortgage Insurance). However, first home buyers in ${suburbName} can buy with as little as 5% deposit through the Home Guarantee Scheme or LMI waiver programs.`
                },
                {
                  q: `Are there stamp duty concessions available for ${suburbName} properties?`,
                  a: `Yes, ${cityData.state} offers specific stamp duty exemptions and concessions for first home buyers based on property purchase price thresholds. Our brokers verify your exact savings during initial assessment.`
                },
                {
                  q: `Do you charge any broker fees for your services in ${suburbName}?`,
                  a: `No, our mortgage broking service is 100% free for clients. We are paid a commission directly by the selected lender after your loan settles.`
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 space-y-2">
                  <h3 className="text-base font-bold text-[#0B1F3A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: cityData.accentColor }} />
                    {faq.q}
                  </h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE PROPERTY REPORT CALLOUT ── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-left">
              <span 
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border text-emerald-600 bg-emerald-50 border-emerald-100"
              >
                Free Resource
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
                Get a Free {suburbName} Property Report
              </h2>
              <p className="text-slate-500 text-[14px] leading-relaxed">
                Access local property values, historic capital growth rates, comparable sales, and rental market analytics for <strong>{suburbName}</strong>. Delivered instantly to your inbox.
              </p>
            </div>
            <Link
              href={`/branches/${cityData.slug}/${suburbName.toLowerCase().replace(/\s+/g, "-")}/property-report`}
              className="inline-flex items-center justify-center gap-2 text-white font-bold text-[14px] py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] shrink-0 w-full md:w-auto text-center"
              style={{ background: cityData.accentColor }}
            >
              Get Free Report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUBURB ACCORDION LIST ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="bg-white rounded-3xl p-7 md:p-10 border border-slate-100 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5" style={{ color: cityData.accentColor }} />
              <h2 className="text-xl font-bold text-[#0B1F3A]">Other Suburbs We Serve in {cityData.city}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cityData.suburbs.map((sub) => (
                <Link
                  key={sub}
                  href={`/nepali-mortgage-broker-${cityData.slug}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[12px] font-semibold px-3 py-2 rounded-xl border border-slate-100 text-center bg-slate-50 hover:bg-white transition-all hover:scale-[1.01]"
                  style={{
                    color: sub.toLowerCase() === suburbName.toLowerCase() ? cityData.accentColor : "#0B1F3A",
                    borderColor: sub.toLowerCase() === suburbName.toLowerCase() ? cityData.accentColor : "#f1f5f9",
                    fontWeight: sub.toLowerCase() === suburbName.toLowerCase() ? "bold" : "600",
                  }}
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/* ── FOUNDER SECTION ── */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Glow Blur */}
        <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-10 pointer-events-none bg-blue-600" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
                <img 
                  src="/images/aakash_new.png" 
                  alt="Aakash KC - Founder of Mortgage Xperts" 
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <div className="text-lg font-bold">Aakash K C</div>
                  <div className="text-xs text-white/80">Founder &amp; Principal Mortgage Broker</div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border border-blue-150 bg-blue-50/50 text-[#2563EB]">
                Trust Our Founder
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
                Aakash K C <br />
                <span className="text-slate-500 font-normal text-lg sm:text-xl">Your Multilingual Mortgage Mate</span>
              </h2>
              <div className="space-y-4 text-slate-650 text-[14px] sm:text-[14.5px] leading-relaxed">
                <p>
                  As the founder and principal mortgage expert at <strong>Mortgage Xperts</strong>, Aakash has spent over a decade assisting first-home buyers, seasoned property investors, and medical professionals across Australia in securing competitive home finance. 
                </p>
                <p>
                  Having personally built a <strong>$5.3M property portfolio over just 3 years</strong>, Aakash doesn&apos;t just advice on mortgages — he lives and breathes property investment. He understands the critical details of loan structuring, cash flow optimization, and multi-lender strategy required to build long-term property wealth.
                </p>
                <p>
                  Leading a multilingual advisory team, Aakash proudly delivers mortgage guidance in <strong>English, Nepali, and Hindi</strong>, simplifying the complex Australian banking ecosystem into clear, actionable strategies for all clients nationwide.
                </p>
              </div>
              <div className="pt-2">
                <button 
                  type="button" 
                  onClick={openModal}
                  className="inline-flex items-center gap-2 font-bold text-[13px] py-3 px-6 rounded-full text-white transition-all hover:scale-[1.03] cursor-pointer border-0"
                  style={{ background: cityData.accentColor }}
                >
                  Book Consultation with Aakash <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <TestimonialSection badgeText="Google Reviews" />

      {/* ── GET IN TOUCH Banner Card (Lead Gen) ── */}
      <section className="py-16 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none" style={{ background: cityData.accentColor }} />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 text-center max-w-2xl mx-auto space-y-6">
          <span 
            className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border"
            style={{ color: cityData.accentColor, background: `${cityData.accentColor}15`, borderColor: `${cityData.accentColor}30` }}
          >
            Get in touch
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
            Ready to secure a home loan in <span style={{ color: cityData.accentColor }}>{suburbName}?</span>
          </h2>
          <p className="text-white/70 text-[14px] leading-relaxed">
            Get professional advice with absolutely zero broker fees. We manage the paperwork, comparison, and negotiations to secure the right mortgage for you.
          </p>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 text-white font-bold text-[14px] py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02]"
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
