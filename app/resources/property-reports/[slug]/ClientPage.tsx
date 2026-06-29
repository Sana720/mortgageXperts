"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  TrendingUp, 
  Download, 
  FileText, 
  ChevronDown, 
  HelpCircle, 
  Percent, 
  ShieldCheck, 
  Layers,
  Calculator,
  ExternalLink,
  CheckCircle,
  Building,
  UserCheck
} from "lucide-react";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { useOnboardingModal } from "../../../components/OnboardingModalContext";
import { SuburbData } from "../data";

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
    // Default fallback
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
      a: `Yes, ${suburb.name} offers highly attractive fundamentals for property investors. The vacancy rate is currently a tight ${suburb.vacancyRate}, indicating extremely strong rental demand. The median rental yield is ${suburb.rentalYieldHouse} for houses and ${suburb.rentalYieldUnit} for units, with median weekly rents sitting at ${suburb.weeklyRentHouse} (houses) and ${suburb.weeklyRentUnit} (units) respectively.`
    },
    {
      q: `Is it a good option for first-home buyers?`,
      a: `${suburb.name} is very popular with first-home buyers, particularly due to the availability of state-specific grants. First-home buyers in ${suburb.state} can benefit from stamp duty exemptions and concessions up to local thresholds, as well as the federal First Home Guarantee Scheme which allows purchase with only a 5% deposit.`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-inter select-none" style={{ overflowX: "clip" }}>
      <SiteHeader isSticky={true} settings={settings} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#0E2A4E] to-[#071629] text-white py-16 md:py-20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full">
          {/* Back button & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link 
              href="/resources/property-reports" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-350 hover:text-white transition-colors bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 shadow-sm"
            >
              <ArrowLeft className="w-4.5 h-4.5" /> Back to Search
            </Link>

            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-[11px] font-bold text-slate-350 shadow-sm">
              <Link href="/" className="hover:text-[#38BDF8] transition-colors">Home</Link>
              <span className="text-white/30 font-normal">&gt;</span>
              <Link href="/resources/property-reports" className="hover:text-[#38BDF8] transition-colors">Property Reports</Link>
              <span className="text-white/30 font-normal">&gt;</span>
              <span className="text-[#38BDF8] font-bold">{suburb.name}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 border rounded-full px-3 py-1 bg-blue-500/10 border-blue-500/20 text-[#38BDF8] w-fit mb-4 text-[10.5px] font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" /> {suburb.name}, {suburb.state} Suburb Profile
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-montserrat">
                Market Report for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-blue-400">{suburb.name}</span> ({suburb.state} {suburb.postcode})
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mb-8 font-medium">
                {suburb.intro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openModal}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] sm:text-[14px] py-4 px-8 rounded-full shadow-lg shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4.5 h-4.5" /> Download Full Property Report
                </button>
                <button
                  onClick={openModal}
                  className="bg-transparent border-2 border-white/20 hover:border-white hover:bg-white hover:text-[#0B1F3A] text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Book a Free Consultation
                </button>
              </div>
            </div>

            {/* Quick Metrics Column */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[30px] p-6 md:p-8 shadow-xl">
              <h3 className="text-base font-bold mb-4 pb-2 border-b border-white/10 text-slate-200 font-montserrat">Key Statistics</h3>
              <div className="flex flex-col gap-4 font-medium">
                {[
                  { label: "Median House Price", value: suburb.medianHousePrice, highlight: true },
                  { label: "Median Unit Price", value: suburb.medianUnitPrice, highlight: false },
                  { label: "12-Month Capital Growth", value: suburb.growth1Yr, highlight: false, textClass: suburb.growth1Yr.startsWith("+") ? "text-emerald-400" : "text-red-400" },
                  { label: "Rental Yield (House)", value: suburb.rentalYieldHouse, highlight: false },
                  { label: "Suburb Population", value: suburb.population, highlight: false }
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{stat.label}</span>
                    <span className={`font-black text-base ${stat.highlight ? "text-[#38BDF8] text-lg" : stat.textClass || "text-white"}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Snapshot Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1F3A] mb-4 font-montserrat">
              Market Snapshot
            </h2>
            <p className="text-slate-500 text-sm">
              Comprehensive real estate market intelligence for property buyers and property investors in {suburb.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* House Price Card */}
            <div className="bg-white border border-[#DCE7F5] rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] mb-4 shadow-sm">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-1 font-montserrat">Median House Value</h3>
                <p className="text-slate-400 text-xs mb-4">Official median sales prices for freestanding houses</p>
                <div className="text-3xl font-black text-[#0B1F3A] mb-1 font-montserrat">{suburb.medianHousePrice}</div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                  {suburb.growth1Yr} Growth (12m)
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Median Rent:</span>
                  <span className="font-extrabold text-slate-800">{suburb.weeklyRentHouse}/wk</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-500 mt-1">
                  <span>Rental Yield:</span>
                  <span className="font-extrabold text-slate-800">{suburb.rentalYieldHouse}</span>
                </div>
              </div>
            </div>

            {/* Unit Price Card */}
            <div className="bg-white border border-[#DCE7F5] rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#38BDF8] mb-4 shadow-sm">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-1 font-montserrat">Median Unit Value</h3>
                <p className="text-slate-400 text-xs mb-4">Official median sales prices for units and townhouses</p>
                <div className="text-3xl font-black text-[#0B1F3A] mb-1 font-montserrat">{suburb.medianUnitPrice}</div>
                <div className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full w-fit">
                  Stable Market
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Median Rent:</span>
                  <span className="font-extrabold text-slate-800">{suburb.weeklyRentUnit}/wk</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-500 mt-1">
                  <span>Rental Yield:</span>
                  <span className="font-extrabold text-slate-800">{suburb.rentalYieldUnit}</span>
                </div>
              </div>
            </div>

            {/* Rental & Vacancy Snapshot Card */}
            <div className="bg-white border border-[#DCE7F5] rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 shadow-sm">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-1 font-montserrat">Rental Vacancy Snapshot</h3>
                <p className="text-slate-400 text-xs mb-4">Vacancy supply rate and general market trend indicators</p>
                <div className="text-3xl font-black text-[#0B1F3A] mb-1 font-montserrat">{suburb.vacancyRate}</div>
                <div className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full w-fit">
                  Extremely Tight Vacancy
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Market Trend:</span>
                  <span className="font-extrabold text-slate-800">{suburb.marketTrend}</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-500 mt-1">
                  <span>Local Population:</span>
                  <span className="font-extrabold text-slate-800">{suburb.population}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Property Report request previewer */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200/40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-[10.5px] font-bold uppercase tracking-wider mb-4 border border-blue-250/30">
                <FileText className="w-3.5 h-3.5 text-[#2563EB]" /> Cotatility Property Report
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1F3A] mb-4 leading-tight font-montserrat">
                Unlock the Full {suburb.name} PDF Report
              </h2>
              <p className="text-slate-500 text-xs sm:text-[14px] leading-relaxed mb-6 font-medium">
                Get an exhaustive, official 12-page PDF document detailing local statistics. This premium report includes recent comparable sales lists, street-by-street pricing maps, school catchments, zoning details, and local development projects.
              </p>
              
              <ul className="flex flex-col gap-3.5 mb-8 text-slate-600 text-xs sm:text-[13.5px] font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0" /> Recent Comparable Sales History
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0" /> Suburb Demographics & Household Structure
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0" /> School Catchment Maps & Infrastructure Plans
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0" /> Historical Capital Growth & Investment Analysis
                </li>
              </ul>

              <button
                onClick={openModal}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] sm:text-[14px] py-4 px-8 rounded-full shadow-lg shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Download className="w-4.5 h-4.5" /> Download PDF Report (Free)
              </button>
            </div>

            {/* Glassmorphic PDF Booklet simulator */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-sky-500/5 rounded-3xl blur-3xl pointer-events-none" />
              <div 
                onClick={openModal}
                className="relative bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl overflow-hidden cursor-pointer group flex flex-col justify-between min-h-[380px]"
              >
                {/* Booklet Top bar decoration */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{suburb.name}_Report_2026.pdf</span>
                </div>

                {/* Booklet Cover Page Preview Simulation */}
                <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                  <div className="w-16 h-20 bg-blue-50 rounded-lg flex items-center justify-center text-[#2563EB] border border-blue-100 shadow-sm mb-4 group-hover:scale-105 transition-transform duration-300">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-[#0B1F3A] uppercase tracking-wide font-montserrat">{suburb.name}</h4>
                  <p className="text-slate-450 text-xs mt-1">Property Value & Market Performance Report</p>
                  
                  {/* Fake Page Turn overlay effect */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-slate-100/50 to-transparent pointer-events-none rounded-br-3xl" />
                  
                  {/* Blurred report snapshot simulation inside */}
                  <div className="w-full mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2.5 opacity-60 filter blur-[1.5px] pointer-events-none select-none">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="h-3 bg-slate-200 rounded w-5/6" />
                  </div>
                </div>

                {/* Unlock banner overlay */}
                <div className="absolute inset-0 bg-[#0B1F3A]/90 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                  <UserCheck className="w-10 h-10 text-[#38BDF8] mb-4" />
                  <h5 className="text-base font-extrabold mb-1.5">Free Verification Required</h5>
                  <p className="text-xs text-slate-300 max-w-xs leading-relaxed mb-5">Click to fill in your contact information and download the full 12-page report instantly.</p>
                  <span className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-black px-5 py-2.5 rounded-full uppercase tracking-wider shadow-md">Unlock Now</span>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-xs font-bold text-slate-400">
                  <span>Page 1 of 12 (Cover Preview)</span>
                  <span className="text-[#2563EB] group-hover:underline">Click to Expand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Insights (Live repayment calculator) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1F3A] mb-4 font-montserrat">
              Mortgage Insights for {suburb.name}
            </h2>
            <p className="text-slate-500 text-sm">
              Calculate loan repayments, estimate your required deposit size, and check local government incentives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-stretch">
            {/* Interactive Calculator Card */}
            <div className="bg-white border border-[#DCE7F5] rounded-[35px] p-6 md:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <Calculator className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="text-lg font-bold text-[#0B1F3A] font-montserrat">Repayment Modeler</h3>
                </div>

                {/* Purchase Price Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-550 uppercase">Property Purchase Price</span>
                    <span className="text-lg font-black text-[#0B1F3A] font-montserrat">${purchasePrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(defaultPrice * 0.5)}
                    max={Math.round(defaultPrice * 2)}
                    step={10000}
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
                    className="w-full accent-[#2563EB] bg-slate-200 rounded-lg appearance-none h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                    <span>Min: ${(Math.round(defaultPrice * 0.5)).toLocaleString()}</span>
                    <span>Median House Value: {suburb.medianHousePrice}</span>
                    <span>Max: ${(Math.round(defaultPrice * 2)).toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Deposit Percentage Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Deposit Size</label>
                    <select
                      value={depositPercent}
                      onChange={(e) => setDepositPercent(parseInt(e.target.value))}
                      className="w-full bg-white text-slate-800 rounded-xl px-3 py-3 text-xs font-bold border border-[#DCE7F5] focus:outline-none focus:ring-1 focus:ring-[#2563EB] cursor-pointer"
                    >
                      <option value={5}>5% Deposit</option>
                      <option value={10}>10% Deposit</option>
                      <option value={12}>12% Deposit</option>
                      <option value={20}>20% Deposit</option>
                      <option value={25}>25% Deposit</option>
                    </select>
                  </div>

                  {/* Interest Rate Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Interest Rate (% p.a.)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step={0.05}
                        min={1}
                        max={15}
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                        className="w-full bg-white text-slate-800 rounded-xl pl-3 pr-8 py-3 text-xs font-bold border border-[#DCE7F5] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                      />
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Loan Term Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Loan Duration</label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                      className="w-full bg-white text-slate-800 rounded-xl px-3 py-3 text-xs font-bold border border-[#DCE7F5] focus:outline-none focus:ring-1 focus:ring-[#2563EB] cursor-pointer"
                    >
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                      <option value={30}>30 Years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Repayments Display */}
              <div className="bg-slate-50 border border-[#DCE7F5]/80 rounded-2xl p-5 mt-4">
                <div className="grid grid-cols-2 gap-4 text-center divide-x divide-[#DCE7F5]">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Weekly Repayments</div>
                    <div className="text-2xl font-black text-[#2563EB] mt-1 font-montserrat">${weeklyRepayment.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monthly Repayments</div>
                    <div className="text-2xl font-black text-[#0B1F3A] mt-1 font-montserrat">${monthlyRepayment.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-center text-[10px] text-slate-400 font-semibold mt-4">
                  Calculated based on a loan of ${(purchasePrice - (purchasePrice * (depositPercent / 100))).toLocaleString()} ({depositPercent}% Deposit: ${(purchasePrice * (depositPercent / 100)).toLocaleString()}).
                </div>
              </div>
            </div>

            {/* Grants, Concessions, & Calculator Links Card */}
            <div className="flex flex-col gap-6">
              {/* Government Grants Information Block */}
              <div className="bg-[#0B1F3A] text-white rounded-[30px] p-6 shadow-md flex-1 flex flex-col justify-between">
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
                  * Eligibility criteria and value limits apply. Check official state revenue office sites for exact guidelines.
                </div>
              </div>

              {/* Internal calculator quicklinks */}
              <div className="bg-white border border-[#DCE7F5] rounded-[30px] p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#0B1F3A] mb-4 font-montserrat">Useful Finance Tools</h3>
                <div className="grid grid-cols-2 gap-3.5 text-xs font-bold text-slate-600">
                  {[
                    { label: "Loan Repayment Calc", href: "/loan-repayment-calculator" },
                    { label: "Borrowing Power Calc", href: "/borrowing-power-calculator" },
                    { label: "LMI Fees Calculator", href: "/lmi-calculator" },
                    { label: "Deposit Calculator", href: "/deposit-calculator" },
                    { label: "Rent Yield Calculator", href: "/rent-yield-calculators" },
                    { label: "Equity Calculator", href: "/equity-calculator" }
                  ].map((calc, idx) => (
                    <Link
                      key={idx}
                      href={calc.href}
                      className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50 hover:text-[#2563EB] rounded-xl border border-[#DCE7F5]/60 transition-colors"
                    >
                      <span>{calc.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Suburb FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1F3A] mb-4 font-montserrat">
              FAQs about {suburb.name}
            </h2>
            <p className="text-slate-500 text-sm">
              Answers to the most common queries regarding property buying and investment statistics in {suburb.name}.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-[#DCE7F5] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#2563EB] shrink-0" />
                      <span className="text-[14.5px] sm:text-base font-bold text-slate-850 group-hover:text-[#2563EB] transition-colors">{faq.q}</span>
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
                        <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-slate-100 text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed font-medium">
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

      {/* Global CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#0B1F3A] to-[#071629] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 font-montserrat">
            Buying property in {suburb.name}?
          </h2>
          <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-medium">
            Get professional guidance, check pre-approval eligibility, and compare multiple lending rates side-by-side with our team of specialists.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={openModal}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] sm:text-[14px] py-4 px-8 rounded-full shadow-lg shadow-blue-500/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              Book a Free Consultation
            </button>
            <Link
              href="/best-nepali-investment-mortgage-broker-perth"
              className="inline-flex items-center justify-center gap-1.5 border-2 border-white/20 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full transition-all duration-300 hover:bg-white hover:text-slate-900 cursor-pointer"
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
