"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, ChevronDown, HelpCircle, ArrowLeft, ArrowRight,
  ShieldCheck, LineChart, Home, Users, Download, FileText,
  Star, Phone, CheckCircle2, Award, Clock, Shield, GraduationCap,
  Sparkles, Coffee, Train, Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { useOnboardingModal } from "../../../components/OnboardingModalContext";
import { SuburbData } from "../data";
import { TestimonialSection } from "../../../components/TestimonialSection";

export function ClientPage({ suburb, settings = {} }: { suburb: SuburbData; settings?: Record<string, string> }) {
  const { openModal } = useOnboardingModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Parse median price to set initial state for calculator
  const defaultPrice = parseInt(suburb.medianHousePrice.replace(/[^0-9]/g, "")) || 650000;
  
  // Interactive Repayment Calculator state
  const [purchasePrice, setPurchasePrice] = useState(defaultPrice);
  const [interestRate, setInterestRate] = useState(6.1);
  const [loanTerm, setLoanTerm] = useState(30);
  const [depositPercent, setDepositPercent] = useState(20);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [weeklyRepayment, setWeeklyRepayment] = useState(0);

  useEffect(() => {
    const depositAmount = purchasePrice * (depositPercent / 100);
    const loanAmount = purchasePrice - depositAmount;
    const r = (interestRate / 100) / 12;
    const n = loanTerm * 12;
    
    let repayment = 0;
    if (r > 0) {
      repayment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      repayment = loanAmount / n;
    }
    
    setMonthlyRepayment(Math.round(repayment));
    setWeeklyRepayment(Math.round((repayment * 12) / 52));
  }, [purchasePrice, interestRate, loanTerm, depositPercent]);

  // State-specific grants copy
  const getGrantsInfo = (state: string) => {
    const st = state.toUpperCase();
    if (st === "WA") {
      return {
        title: "WA First Home Buyer Grants & Concessions",
        grant: "First Home Owner Grant (FHOG) of $10,000 for purchasing or building a brand new home up to $750,000 (south of the 26th parallel).",
        stampDuty: "FHB Stamp Duty exemption on established or new homes up to $450,000, with concessional rates applying up to $600,000."
      };
    }
    if (st === "VIC") {
      return {
        title: "VIC First Home Buyer Grants & Concessions",
        grant: "First Home Owner Grant of $10,000 for brand new homes valued up to $750,000.",
        stampDuty: "Full stamp duty exemption for first home buyers on new or established properties up to $600,000, and a sliding concession up to $750,000."
      };
    }
    if (st === "NSW") {
      return {
        title: "NSW First Home Buyer Grants & Concessions",
        grant: "First Home Owner Grant (New Homes) of $10,000 for newly built properties up to $750,000.",
        stampDuty: "First Home Buyers Assistance Scheme (FHBAS) offers a full exemption from transfer duty on homes valued up to $800,000 and a concession up to $1,000,000."
      };
    }
    if (st === "QLD") {
      return {
        title: "QLD First Home Buyer Grants & Concessions",
        grant: "First Home Owner Grant of $15,000 (often boosted to $30,000) for purchasing or building a brand new home up to $750,000.",
        stampDuty: "First Home Concession offers a full stamp duty exemption up to $700,000, with a sliding scale concession up to $800,000."
      };
    }
    if (st === "SA") {
      return {
        title: "SA First Home Buyer Grants & Concessions",
        grant: "First Home Owner Grant of up to $15,000 for building or buying a new home.",
        stampDuty: "Full stamp duty waiver for first home buyers buying or building a new home (no price cap as of recent updates)."
      };
    }
    return {
      title: `${st} First Home Buyer Grants & Concessions`,
      grant: "First Home Owner Grant (FHOG) of $10,000 for newly built properties or contract builds (subject to regional price thresholds).",
      stampDuty: "Full stamp duty exemption or substantial concessions are available for eligible first home buyers (thresholds vary by property value)."
    };
  };

  const grantsInfo = getGrantsInfo(suburb.state);

  const faqs = [
    {
      q: `Is ${suburb.name} a good place to buy a home?`,
      a: `${suburb.name} represents a highly desirable suburb in ${suburb.state} with a median house price of ${suburb.medianHousePrice}. The market is currently categorized as a "${suburb.marketTrend}". With its robust local infrastructure, community parks, and close proximity to amenities, it is an excellent location for both families looking for lifestyle stability and buyers looking for solid capital potential.`
    },
    {
      q: `What is the median house and unit price in ${suburb.name}?`,
      a: `In ${suburb.name}, the current median house price stands at ${suburb.medianHousePrice}. For units and townhouses, the median price is ${suburb.medianUnitPrice}. Pricing fluctuates depending on the property's size, proximity to transport, and land size.`
    },
    {
      q: `Is ${suburb.name} suitable for property investors?`,
      a: `Yes, ${suburb.name} offers highly attractive fundamentals for property investors. The vacancy rate is currently a tight ${suburb.vacancyRate}, indicating extremely strong rental demand. The median rental yield is ${suburb.rentalYieldHouse} for houses and ${suburb.rentalYieldUnit} for units, with weekly rents sitting at ${suburb.weeklyRentHouse} (houses) and ${suburb.weeklyRentUnit} (units) respectively.`
    },
    {
      q: `Can I get a home loan or refinance in ${suburb.name} with no broker fees?`,
      a: `Absolutely! Our mortgage brokerage services for ${suburb.name} are 100% free to you. We compare 40+ leading Australian lenders to secure the lowest rates and structure your loan to optimize your borrowing capacity, and the lenders pay us after settlement.`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-800" style={{ overflowX: "clip" }}>
      <SiteHeader isSticky={true} settings={settings} />

      {/* ── HERO SECTION (Optimized for Suburb Search Keywords) ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#0E2A4E] to-[#071629] text-white pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link 
              href="/resources/property-reports" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-355 hover:text-white transition-colors bg-white/5 border border-white/10 rounded-full px-4 py-1.5 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Suburb Directory
            </Link>

            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-[11px] font-bold text-slate-330 shadow-sm">
              <Link href="/" className="hover:text-[#38BDF8] transition-colors">Home</Link>
              <span className="text-white/30 font-normal">&gt;</span>
              <Link href="/resources/property-reports" className="hover:text-[#38BDF8] transition-colors">Property Reports</Link>
              <span className="text-white/30 font-normal">&gt;</span>
              <span className="text-[#38BDF8] font-bold">{suburb.name}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: SEO Headline & Intro */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 border-blue-500/20 text-[#38BDF8]">
                <MapPin className="w-3.5 h-3.5" /> Servicing {suburb.name}, {suburb.state} {suburb.postcode}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white font-montserrat">
                Mortgage Broker & Home Loans in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-blue-400">{suburb.name}</span>
              </h1>
              <p className="text-slate-300 text-[14px] sm:text-[15.5px] leading-relaxed max-w-2xl font-medium">
                Looking for the best home loan rates or a trusted Nepali mortgage broker in <strong>{suburb.name}</strong>? We compare 40+ lenders, manage the entire application process, and ensure you maximize your borrowing power—with zero broker fees.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={openModal}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] sm:text-[14px] py-4 px-8 rounded-full shadow-lg shadow-blue-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Book Free Strategy Call
                </button>
                {/* Direct Download Button (form-free) */}
                <a
                  href="https://s3-ap-southeast-2.amazonaws.com/mortgagexperts/sample-report.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-slate-700 bg-white border border-slate-200 font-bold text-[13.5px] sm:text-[14px] py-4 px-8 rounded-full shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" /> Download Suburb Report (Free)
                </a>
              </div>
            </div>

            {/* Right: Key Stats Box */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-lg font-bold mb-6 pb-2.5 border-b border-white/10 text-slate-200 font-montserrat flex items-center gap-2">
                <LineChart className="w-5 h-5 text-[#38BDF8]" /> {suburb.name} Market Stats
              </h3>
              <div className="space-y-4.5 font-medium">
                {[
                  { label: "Median House Price", value: suburb.medianHousePrice, highlight: true },
                  { label: "Median Unit Price", value: suburb.medianUnitPrice, highlight: false },
                  { label: "12-Month Growth", value: suburb.growth1Yr, highlight: false, textClass: suburb.growth1Yr.startsWith("+") ? "text-emerald-400" : "text-red-400" },
                  { label: "Rental Yield (House)", value: suburb.rentalYieldHouse, highlight: false },
                  { label: "Vacancy Rate", value: suburb.vacancyRate, highlight: false, textClass: "text-amber-400" },
                  { label: "Population", value: suburb.population, highlight: false }
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[13.5px]">
                    <span className="text-slate-400">{stat.label}</span>
                    <span className={`font-black ${stat.highlight ? "text-[#38BDF8] text-[16px] sm:text-[18px]" : stat.textClass || "text-white"}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: ABOUT THE SUBURB ── */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border border-blue-150 bg-blue-50/50 text-[#2563EB]">
                Suburb Overview
              </span>
              <h2 className="text-[#0B1F3A] text-2xl sm:text-4xl font-extrabold leading-tight font-montserrat">
                Living in <span className="text-[#2563EB]">{suburb.name}</span>
              </h2>
              <p className="text-slate-650 text-[14.5px] leading-relaxed">
                {suburb.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1F3A] text-[15px]">Cafes & Lifestyle</h4>
                    <p className="text-slate-500 text-[12.5px] mt-0.5">Vibrant local shopping, parks, and dining options.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1F3A] text-[15px]">Transport Links</h4>
                    <p className="text-slate-500 text-[12.5px] mt-0.5">Reliable access routes and public transport services.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1F3A] text-[15px]">Schools & Parks</h4>
                    <p className="text-slate-500 text-[12.5px] mt-0.5">Highly regarded education hubs and family-friendly zones.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1F3A] text-[15px]">Demographics</h4>
                    <p className="text-slate-500 text-[12.5px] mt-0.5">A stable, welcoming community with diverse populations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Suburb Feature Graphic Card */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-sky-500/5 rounded-3xl blur-3xl pointer-events-none" />
              <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
                  <span className="font-bold text-[14px] text-[#0B1F3A] uppercase tracking-wider">Property Report Overview</span>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{suburb.name}_Profile.pdf</span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-slate-650 text-xs sm:text-[13px] leading-relaxed">
                    This free suburb report provides key property data including local sales histories, zoning guidelines, and comparative values to make home purchasing in <strong>{suburb.name}</strong> easier.
                  </p>
                  
                  {/* Mock PDF booklet page stack preview */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-blue-400 transition-colors group cursor-pointer">
                    <div className="w-12 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-[#2563EB] border border-blue-100 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-grow text-left">
                      <h4 className="text-sm font-extrabold text-[#0B1F3A] group-hover:text-[#2563EB] transition-colors">{suburb.name} Suburb Profile</h4>
                      <p className="text-slate-450 text-[11px] mt-0.5">Valuations, yields, and growth trends report</p>
                    </div>
                    {/* Direct download */}
                    <a
                      href="https://s3-ap-southeast-2.amazonaws.com/mortgagexperts/sample-report.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="https://s3-ap-southeast-2.amazonaws.com/mortgagexperts/sample-report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs py-3.5 px-6 rounded-full shadow-md transition-all hover:scale-[1.01]"
                  >
                    <Download className="w-4 h-4" /> Download Suburb Report Instantly (No Form)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: MORTGAGE & HOME BUYING INFORMATION ── */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border border-blue-150 bg-blue-50/50 text-[#2563EB] mb-4">
              Local Financing
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1F3A] mb-4 font-montserrat">
              Home Loans & Grants in {suburb.name}
            </h2>
            <p className="text-slate-500 text-sm">
              Review current state first home buyer concessions, check repayments, or speak to us about custom structuring.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-stretch">
            {/* Repayments Calculator */}
            <div className="bg-white border border-[#DCE7F5] rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 font-montserrat">Interactive Loan Calculator</h3>
                <p className="text-slate-400 text-xs mb-6">Estimate repayments for properties in {suburb.name}.</p>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
                      <span>Purchase Price</span>
                      <span className="text-[#0B1F3A]">${purchasePrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={defaultPrice * 0.5}
                      max={defaultPrice * 2.0}
                      step={10000}
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Interest Rate (p.a.)</label>
                      <input
                        type="number"
                        step={0.1}
                        min={1}
                        max={15}
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value) || 6.1)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-blue-500 bg-slate-55"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Deposit (%)</label>
                      <input
                        type="number"
                        min={5}
                        max={95}
                        value={depositPercent}
                        onChange={(e) => setDepositPercent(parseInt(e.target.value) || 20)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-blue-500 bg-slate-55"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 bg-slate-50/50 rounded-2xl p-4 border border-slate-100 mt-6 text-left">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Weekly Repayments</div>
                    <div className="text-xl sm:text-2xl font-black text-[#2563EB] mt-1 font-montserrat">${weeklyRepayment.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monthly Repayments</div>
                    <div className="text-xl sm:text-2xl font-black text-[#0B1F3A] mt-1 font-montserrat">${monthlyRepayment.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold mt-4 text-center">
                Calculated based on a loan of ${(purchasePrice - (purchasePrice * (depositPercent / 100))).toLocaleString()} ({depositPercent}% Deposit).
              </div>
            </div>

            {/* Grants & Concessions column */}
            <div className="flex flex-col gap-6 text-left">
              <div className="bg-[#0B1F3A] text-white rounded-[32px] p-6 md:p-8 shadow-md flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold mb-4 pb-2 border-b border-white/10 text-[#38BDF8] flex items-center gap-2 font-montserrat">
                    <ShieldCheck className="w-5 h-5 shrink-0" /> {grantsInfo.title}
                  </h3>
                  <div className="flex flex-col gap-4 text-xs sm:text-[13px] leading-relaxed text-slate-300">
                    <div>
                      <div className="font-bold text-white mb-1">First Home Owner Grant (FHOG):</div>
                      <p>{grantsInfo.grant}</p>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Stamp Duty Relief:</div>
                      <p>{grantsInfo.stampDuty}</p>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-bold mt-6 border-t border-white/10 pt-3">
                  * Rules and limits apply. Check official State Revenue Office pages for exact details.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: INTRODUCTION TO AAKASH (Nepali Mortgage Broker) ── */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-10 pointer-events-none bg-blue-600" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
                <img 
                  src="/images/aakash_new.png" 
                  alt="Aakash KC - Nepali Mortgage Broker" 
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <div className="text-lg font-bold">Aakash K C</div>
                  <div className="text-xs text-white/80">Founder &amp; Principal Mortgage Broker</div>
                </div>
              </div>
            </div>

            {/* Right: Bio & Services */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border border-blue-150 bg-blue-50/50 text-[#2563EB]">
                Your Nepali Mortgage Broker
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-extrabold leading-tight font-montserrat">
                Meet Aakash K C <br />
                <span className="text-slate-500 font-normal text-lg sm:text-xl">Proudly Servicing {suburb.name}</span>
              </h2>
              <div className="space-y-4 text-slate-655 text-[14px] sm:text-[14.5px] leading-relaxed font-medium">
                <p>
                  As the founder of <strong>Mortgage Xperts</strong>, Aakash specializes in helping Nepali first-home buyers and property investors secure flexible, low-rate home loans. Servicing <strong>{suburb.name}</strong>, Aakash guides you through Australia's bank policies with clear advice in <strong>English, Nepali, and Hindi</strong>.
                </p>
                <p>
                  Having personal experience building a <strong>$5.3M property portfolio in just 3 years</strong>, Aakash understands how to structure loans to optimize deductions, prepare for future investments, and negotiate rate discounts with major banks.
                </p>
              </div>
              <div className="pt-2">
                <button 
                  type="button" 
                  onClick={openModal}
                  className="inline-flex items-center gap-2 font-bold text-[13.5px] py-3.5 px-6 rounded-full text-white transition-all hover:scale-[1.03] cursor-pointer border-0 bg-[#2563EB]"
                >
                  Book Strategy Call with Aakash <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: REASONS TO CHOOSE MORTGAGE XPERTS ── */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border border-blue-150 bg-blue-50/50 text-[#2563EB] mb-4">
              Our Advantages
            </span>
            <h2 className="text-[#0B1F3A] text-2xl sm:text-4xl font-extrabold leading-tight font-montserrat">
              Why Choose Mortgage Xperts?
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              We manage the paperwork, comparison, and rate negotiations, completely free of charge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { icon: Shield, title: "Zero Broker Fees", desc: "No hidden charges or advice fees. We are paid entirely by the lender you choose." },
              { icon: Award, title: "40+ Lender Panel", desc: "We compare rates, loan terms, and features across Australia's leading banks and non-banks." },
              { icon: Users, title: "Nepali & Multilingual", desc: "Bilingual support in English, Nepali, and Hindi to keep communication simple and transparent." },
              { icon: Clock, title: "Fast Pre-Approvals", desc: "Digital systems and direct lender access to secure pre-approval status quickly." }
            ].map((adv, idx) => (
              <div key={idx} className="bg-white border border-[#DCE7F5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563EB] mb-5">
                  <adv.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] mb-2 font-montserrat">{adv.title}</h3>
                <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection badgeText="Google Reviews" />

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1F3A] mb-4 font-montserrat">
              FAQs about Home Loans in {suburb.name}
            </h2>
            <p className="text-slate-500 text-sm">
              Useful answers regarding property purchases and mortgage broking services in {suburb.name}.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-[#DCE7F5] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm text-left">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#2563EB] shrink-0" />
                      <span className="text-[14.5px] sm:text-base font-bold text-slate-800 group-hover:text-[#2563EB] transition-colors">{faq.q}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#2563EB]" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-slate-100 text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GLOBAL CTA ── */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#0B1F3A] to-[#071629] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 font-montserrat">
            Buying property in {suburb.name}?
          </h2>
          <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Get professional advice with absolutely zero broker fees. We manage the paperwork, comparison, and negotiations to secure the right mortgage for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={openModal}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] sm:text-[14px] py-4 px-8 rounded-full shadow-lg shadow-blue-500/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer w-full sm:w-auto"
            >
              Book a Free Consultation
            </button>
            <Link
              href="/best-nepali-investment-mortgage-broker-perth"
              className="inline-flex items-center justify-center gap-1.5 border-2 border-white/20 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full transition-all duration-300 hover:bg-white hover:text-slate-900 cursor-pointer w-full sm:w-auto text-center"
            >
              Contact Mortgage Xperts
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </div>
  );
}
