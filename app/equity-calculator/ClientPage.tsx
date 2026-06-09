"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  User,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  CheckCircle2,
  HelpCircle,
  Home,
  DollarSign,
  Info
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SubPageHero } from "../components/SubPageHero";
import { TestimonialSection } from "../components/TestimonialSection";
import { EASE_OUT } from "@/lib/motion";

export interface PageHeroSettings {
  hero_badge?: string;
  hero_title?: string;
  hero_subtext?: string;
  hero_image?: string;
  hero_btn1_text?: string;
  hero_btn1_link?: string;
  hero_btn2_text?: string;
  hero_btn2_link?: string;
}

export default function ClientPage({ settings = {}, pageHeroSettings }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings }) {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Inputs
  const [propertyValue, setPropertyValue] = useState<number>(800000);
  const [mortgageBalance, setMortgageBalance] = useState<number>(450000);
  const [lvrLimit, setLvrLimit] = useState<number>(80);

  // Step 2: Lead capture
  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcLeadSubmitting, setCalcLeadSubmitting] = useState(false);

  // Guide request
  const [guideName, setGuideName] = useState("");
  const [guideEmail, setGuideEmail] = useState("");
  const [guidePhone, setGuidePhone] = useState("");
  const [guideSubmitting, setGuideSubmitting] = useState(false);
  const [guideSubmitted, setGuideSubmitted] = useState(false);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // General Enquiry States
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryMsg, setEnquiryMsg] = useState("");
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Calculations Engine
  const results = useMemo(() => {
    const totalEquity = Math.max(0, propertyValue - mortgageBalance);
    const maxLending = propertyValue * (lvrLimit / 100);
    const usableEquity = Math.max(0, maxLending - mortgageBalance);
    
    // Leverage calculations
    // Investment property: usable equity cover deposit (20%) + stamp duty & buying costs (5%) = 25% total
    const potentialInvestmentValue = usableEquity / 0.25;

    // Percentages for stacked bar chart
    const mortgagePct = propertyValue > 0 ? (mortgageBalance / propertyValue) * 100 : 0;
    const usableEquityPct = propertyValue > 0 ? (usableEquity / propertyValue) * 100 : 0;
    
    // Remaining buffer is the property value above max lending (which is 100 - LVR limit)
    const capBufferPct = 100 - lvrLimit;
    
    // Locked equity is total equity minus usable equity (which is the property value within the LVR cap that can't be borrowed against)
    const lockedEquityPct = Math.max(0, lvrLimit - mortgagePct - usableEquityPct);

    return {
      totalEquity,
      maxLending,
      usableEquity,
      potentialInvestmentValue,
      mortgagePct,
      usableEquityPct,
      lockedEquityPct,
      capBufferPct
    };
  }, [propertyValue, mortgageBalance, lvrLimit]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "equity-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Equity Calculator. Property Value: $${propertyValue}, Loan Balance: $${mortgageBalance}, LVR Limit: ${lvrLimit}%, Total Equity: $${results.totalEquity}, Usable Equity: $${results.usableEquity}, Potential Investment Purchase: $${results.potentialInvestmentValue}`
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Failed to submit lead:", error);
    } finally {
      setCalcLeadSubmitting(false);
      setCurrentStep(3);
    }
  };

  // Guide request handler
  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideName || !guideEmail || !guidePhone) return;

    setGuideSubmitting(true);
    try {
      const payload = {
        type: "equity-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Home Equity & Leveraging Guide"
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setGuideSubmitted(true);
    } catch (error) {
      console.error("Failed to submit guide request:", error);
    } finally {
      setGuideSubmitting(false);
    }
  };

  // General enquiry handler
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail || !enquiryPhone) return;

    setEnquirySubmitting(true);
    try {
      const payload = {
        type: "equity-callback",
        name: enquiryName,
        email: enquiryEmail,
        phone: enquiryPhone,
        message: enquiryMsg
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setEnquirySubmitted(true);
    } catch (error) {
      console.error("Failed to submit callback enquiry:", error);
    } finally {
      setEnquirySubmitting(false);
    }
  };

  // PDF downloader
  const downloadReportPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("printable-report-area");
      if (!element) return;

      element.style.setProperty("display", "block", "important");
      element.style.setProperty("position", "absolute", "important");
      element.style.setProperty("left", "0px", "important");
      element.style.setProperty("top", "-9999px", "important");
      element.style.setProperty("width", "800px", "important");
      element.style.setProperty("background-color", "#FFFFFF", "important");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF"
      });

      element.style.removeProperty("display");
      element.style.removeProperty("position");
      element.style.removeProperty("left");
      element.style.removeProperty("top");
      element.style.removeProperty("width");
      element.style.removeProperty("background-color");

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const width = pdfWidth - margin * 2;
      const ratio = canvas.width > 0 ? canvas.height / canvas.width : 1.414;
      const height = width * ratio;

      pdf.addImage(imgData, "JPEG", margin, margin, width, height);
      pdf.save(`Mortgage_Xperts_Home_Equity_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Home Equity Specialist",
    hero_title: "Home Equity Calculator",
    hero_subtext: "Estimate your property's total equity and usable equity. Discover how you can leverage your home's value to purchase an investment property, renovate, or consolidate debt.",
    hero_image: "/images/hero.png",
    hero_btn1_text: "Start Calculator",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to an Expert",
    hero_btn2_link: "#enquiry-form"
  };

  const faqs = [
    {
      q: "What is home equity?",
      a: "Home equity is the difference between the current market value of your property and the remaining balance on your mortgage. For example, if your home is worth $800,000 and you owe $450,000 on your loan, your total home equity is $350,000."
    },
    {
      q: "What is usable equity and how does it differ from total equity?",
      a: "Total equity is your full ownership value, but lenders will not let you borrow against 100% of your property's value. Usable equity is the amount of equity you can actually access without selling. Lenders typically limit your total borrowing (existing loan + equity release) to 80% of the property value (or up to 90%-95% with Lenders Mortgage Insurance)."
    },
    {
      q: "How can I access the usable equity in my property?",
      a: "You can access your usable equity by requesting a cash out or top-up with your current lender, or by refinancing your mortgage to another bank. The lender will perform an upfront valuation of your property to confirm its current market value before approving the equity release."
    },
    {
      q: "What are the most common ways to use home equity?",
      a: "Property investors frequently use usable equity to fund deposits and acquisition costs for investment properties. Other common uses include financing home renovations, consolidating high-interest debts (like credit cards or car loans) into your lower-rate mortgage, or buying shares."
    },
    {
      q: "Do I need cash to buy an investment property if I use equity?",
      a: "No. If you have sufficient usable equity, you can borrow the entire 20% deposit and stamp duty costs against your current property, and the remaining 80% against the new investment property. This allows you to build your portfolio with zero cash out of pocket."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero
        pageTitle="Home Equity Calculator"
        themeColor="violet"
        pageHeroSettings={pageHeroSettings || defaultHeroSettings}
      />

      {/* MAIN CALCULATOR SECTION */}
      <section id="calculator-tool" className="py-12 lg:py-24 bg-white relative scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print">
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-800 bg-violet-50 border border-violet-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Leverage Your Home Value & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Accelerate Wealth Creation</span>
              </h2>
              <div className="w-12 h-[3px] bg-violet-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium font-inter">
                Your home is one of your greatest assets. Over time, principal repayments and market growth build equity. Use this calculator to figure out your usable equity to buy an investment property, renovate, or consolidate debts.
              </p>

              <div className="space-y-4 pt-4">
                {/* Point 1 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-violet-50/50 to-fuchsia-50/10 hover:from-violet-50 hover:to-fuchsia-50/30 border border-violet-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-100/70 text-violet-600 flex items-center justify-center shrink-0 border border-violet-200/40 shadow-sm">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Calculate Usable Equity</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Instantly determine the equity you can borrow against without crossing the bank's LVR limits.</p>
                  </div>
                </motion.div>

                {/* Point 2 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/10 hover:from-blue-50 hover:to-indigo-50/30 border border-blue-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/40 shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Leverage for Investment</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">See the potential purchase price of an investment property using only your home equity as deposit.</p>
                  </div>
                </motion.div>

                {/* Point 3 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-[#EAF3FF]/50 to-slate-50 hover:from-[#EAF3FF] hover:to-slate-100/80 border border-blue-100/30 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#2563EB]/10 shadow-sm">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Consolidation & Renovations</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Free up funds to renovate your home or bundle high-interest debt into your low-rate home loan.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form */}
            <div className="lg:col-span-6 flex justify-end no-print">
              <div className="w-full max-w-[520px] bg-gradient-to-b from-white via-white to-slate-50/50 border border-slate-200/60 rounded-[32px] p-8 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.08)] hover:shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12)] flex flex-col justify-between min-h-[530px] transition-all duration-300 relative overflow-hidden">
                
                {/* Top decorative gradient bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-500" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-violet-600 transition-all duration-500" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>

                {/* STEP 1: Inputs */}
                {currentStep === 1 && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="property-value">Estimated Property Value ($)</label>
                        <span className="text-violet-700 font-black text-[13px]">${propertyValue.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="property-value"
                          value={propertyValue}
                          onChange={(e) => setPropertyValue(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all"
                        />
                      </div>
                      <input
                        type="range"
                        min="100000"
                        max="3000000"
                        step="10000"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-violet-600 mt-1"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="mortgage-balance">Current Mortgage Balance ($)</label>
                        <span className="text-violet-700 font-black text-[13px]">${mortgageBalance.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="mortgage-balance"
                          value={mortgageBalance}
                          onChange={(e) => setMortgageBalance(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all"
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={Math.max(2000000, propertyValue)}
                        step="10000"
                        value={mortgageBalance}
                        onChange={(e) => setMortgageBalance(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-violet-600 mt-1"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label>Lending LVR Limit</label>
                        <span className="text-violet-600 font-black text-[13px]">{lvrLimit}% LVR</span>
                      </div>
                      <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setLvrLimit(80)}
                          className={`py-1.5 text-xs font-bold rounded-lg transition-all ${lvrLimit === 80 ? 'bg-white text-violet-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          80% (Standard)
                        </button>
                        <button
                          type="button"
                          onClick={() => setLvrLimit(90)}
                          className={`py-1.5 text-xs font-bold rounded-lg transition-all ${lvrLimit === 90 ? 'bg-white text-violet-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          90% (With LMI)
                        </button>
                        <button
                          type="button"
                          onClick={() => setLvrLimit(95)}
                          className={`py-1.5 text-xs font-bold rounded-lg transition-all ${lvrLimit === 95 ? 'bg-white text-violet-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          95% (Max)
                        </button>
                      </div>
                      <div className="flex items-start gap-2 bg-violet-50/30 border border-violet-100/60 p-3 rounded-xl mt-1.5">
                        <Info className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                        <p className="text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                          {lvrLimit === 80 
                            ? "80% LVR avoids Lenders Mortgage Insurance (LMI) and guarantees the best interest rates with all lenders." 
                            : lvrLimit === 90 
                              ? "90% LVR allows you to unlock more equity, but you may have to pay Lenders Mortgage Insurance (LMI)."
                              : "95% LVR maximizes your borrowing capability. Only supported by select specialist lenders."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Lead details */}
                {currentStep === 2 && (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 py-2">
                    <div className="bg-violet-50/50 border border-violet-100 rounded-2xl p-4 text-center">
                      <h4 className="text-[#0B1F3A] font-extrabold text-[13px] font-montserrat">Unlock Usable Equity Report</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Enter your details to generate your comprehensive usability report and calculate investment purchasing power.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="calc-name" className="text-[11px] font-bold text-slate-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          id="calc-name"
                          required
                          placeholder="Your Name"
                          value={calcLeadName}
                          onChange={(e) => setCalcLeadName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="calc-email" className="text-[11px] font-bold text-slate-700">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          id="calc-email"
                          required
                          placeholder="your.email@example.com"
                          value={calcLeadEmail}
                          onChange={(e) => setCalcLeadEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="calc-phone" className="text-[11px] font-bold text-slate-700">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          id="calc-phone"
                          required
                          placeholder="04XX XXX XXX"
                          value={calcLeadPhone}
                          onChange={(e) => setCalcLeadPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>

                    <button type="submit" className="hidden" id="wizard-lead-submit-btn" />
                  </form>
                )}

                {/* STEP 3: Results Display */}
                {currentStep === 3 && (
                  <div className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-violet-50/50 border border-violet-100 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-violet-800">Total Equity</span>
                        <div className="text-2xl sm:text-3xl font-black mt-1 text-violet-600">
                          ${results.totalEquity.toLocaleString()}
                        </div>
                        <p className="text-[9px] text-slate-450 mt-1 font-bold">Property Value: ${propertyValue.toLocaleString()}</p>
                      </div>

                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Usable Equity</span>
                        <div className="text-2xl sm:text-3xl font-black mt-1 text-emerald-600">
                          ${results.usableEquity.toLocaleString()}
                        </div>
                        <p className="text-[9px] text-slate-450 mt-1 font-bold">LVR Cap ({lvrLimit}%): ${(propertyValue * (lvrLimit / 100)).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Stacked Equity Visualization Chart */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Property Value Breakdown</h4>
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {/* Stacked Bar */}
                        <div className="w-full h-4 bg-slate-200 rounded-full flex overflow-hidden shadow-inner">
                          {/* Mortgage Bar */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${results.mortgagePct}%` }}
                            transition={{ duration: 0.8, ease: EASE_OUT }}
                            className="h-full bg-slate-400 hover:opacity-95 transition-opacity"
                            title={`Mortgage: ${results.mortgagePct.toFixed(1)}%`}
                          />
                          {/* Usable Equity Bar */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${results.usableEquityPct}%` }}
                            transition={{ duration: 0.8, ease: EASE_OUT }}
                            className="h-full bg-emerald-500 hover:opacity-95 transition-opacity"
                            title={`Usable Equity: ${results.usableEquityPct.toFixed(1)}%`}
                          />
                          {/* Locked Equity (within LVR limit but not borrowing usable) */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${results.lockedEquityPct}%` }}
                            transition={{ duration: 0.8, ease: EASE_OUT }}
                            className="h-full bg-violet-400 hover:opacity-95 transition-opacity"
                            title={`Locked Equity: ${results.lockedEquityPct.toFixed(1)}%`}
                          />
                          {/* Remaining LVR Buffer */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${results.capBufferPct}%` }}
                            transition={{ duration: 0.8, ease: EASE_OUT }}
                            className="h-full bg-slate-200 hover:opacity-95 transition-opacity"
                            title={`Unavailable Cap: ${results.capBufferPct.toFixed(1)}%`}
                          />
                        </div>

                        {/* Legends */}
                        <div className="grid grid-cols-2 gap-2 text-[10.5px] font-semibold text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                            <span>Mortgage Owed (${mortgageBalance.toLocaleString()})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>Usable Equity (${results.usableEquity.toLocaleString()})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shrink-0" />
                            <span>Locked Equity (${Math.max(0, results.totalEquity - results.usableEquity).toLocaleString()})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300 shrink-0" />
                            <span>Cap Buffer (${(propertyValue * (results.capBufferPct / 100)).toLocaleString()})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Purchasing power indicator */}
                    {results.usableEquity > 0 && (
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Investment Buying Capability</h5>
                          <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1 font-semibold">
                            You could buy an investment property worth up to <span className="text-emerald-700 font-extrabold">${Math.round(results.potentialInvestmentValue).toLocaleString()}</span> using only your usable equity as deposit and purchasing costs (25% cover), requiring <span className="text-[#0B1F3A] font-extrabold">$0 cash savings</span> out of pocket.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={downloadReportPDF}
                        disabled={isGeneratingPdf}
                        className="flex items-center justify-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
                      >
                        <FileText className="w-4 h-4 shrink-0" />
                        <span>{isGeneratingPdf ? "Generating..." : "Print Report"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep(1);
                          setCalcLeadName("");
                          setCalcLeadEmail("");
                          setCalcLeadPhone("");
                        }}
                        className="border border-violet-600 text-violet-700 bg-white hover:bg-violet-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                )}

                {/* BOTTOM BUTTON BAR FOR STEP 1 & 2 */}
                {currentStep < 3 && (
                  <div className="flex justify-between items-center gap-3 border-t border-slate-100 pt-4 mt-4">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 font-bold text-xs cursor-pointer py-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    )}

                    {currentStep === 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-violet-500/10 transition-colors ml-auto animate-fade-in"
                      >
                        Next: Calculate Usable Equity <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const btn = document.getElementById("wizard-lead-submit-btn");
                          if (btn) btn.click();
                        }}
                        disabled={calcLeadSubmitting}
                        className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-violet-500/10 transition-colors ml-auto"
                      >
                        {calcLeadSubmitting ? "Generating Report..." : "Generate Annual Report"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GUIDE DOWNLOAD CARD */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0B1F3A] via-[#102A4F] to-[#0B1F3A] text-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Guide Download
              </span>
              <h2 className="text-white text-[24px] sm:text-[30px] font-black leading-tight font-montserrat">
                Grow your portfolio with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">Home Equity Guide</span>
              </h2>
              <p className="text-slate-350 text-[13.5px] leading-relaxed">
                Unlock our comprehensive guide to unlocking usable equity, understand refinancing costs, and explore leveraging mechanisms to grow your asset wealth.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-4.5 h-4.5 text-violet-500 shrink-0" />
                  <span>Step-by-step cash-out & top-up process</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-4.5 h-4.5 text-violet-500 shrink-0" />
                  <span>How to structure dual property loans using equity</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-4.5 h-4.5 text-violet-500 shrink-0" />
                  <span>Tax deductibility rules for borrowed equity</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md lg:ml-auto w-full">
              {guideSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/25">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-md font-bold font-montserrat">Thank you!</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">Your guide has been sent to your email. One of our home equity lending specialists will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleGuideSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={guideName}
                      onChange={(e) => setGuideName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={guideEmail}
                      onChange={(e) => setGuideEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={guidePhone}
                      onChange={(e) => setGuidePhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                    />
                  </div>
                  <p className="text-[9.5px] text-slate-400 leading-relaxed">
                    By clicking ‘Get the guide’, you acknowledge our <Link href="/privacy-collection-notice" className="text-violet-500 underline hover:text-violet-405">Privacy Collection Notice</Link> and consent to being contacted by a Mortgage Xperts broker.
                  </p>
                  <button
                    type="submit"
                    disabled={guideSubmitting}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer mt-2"
                  >
                    {guideSubmitting ? "Submitting..." : "Get the Guide"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-800 bg-violet-50 border border-violet-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Questions</span>
            </h2>
            <p className="text-slate-500 text-[12.5px] font-medium mt-2">
              Everything you need to know about home equity, usable limits, and leveraging property.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-6 py-4.5 text-left font-bold text-slate-800 text-[13.5px] sm:text-[14.5px] hover:bg-slate-50/50 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <HelpCircle className={`w-4 h-4 shrink-0 transition-transform ${openFaqIndex === idx ? "rotate-180 text-violet-600" : "text-slate-400"}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed border-t border-slate-100/80">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection
        badgeText="Google Reviews"
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Happy Home Owners</span></>}
        backgroundClass="bg-white"
      />

      {/* ENQUIRY CALLBACK FORM */}
      <section id="enquiry-form" className="py-16 lg:py-24 bg-[#0B1F3A] text-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/25 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Callback Service
              </span>
              <h2 className="text-white text-[28px] sm:text-[38px] lg:text-[45px] font-black leading-tight font-montserrat">
                Need Professional Help to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">Unlock Your Equity?</span>
              </h2>
              <div className="w-12 h-[3px] bg-violet-500 rounded-full" />
              <p className="text-slate-300 text-[14px] leading-relaxed max-w-xl">
                Unlocking equity requires careful valuation checks, loan restructuring, and choosing the right lender policy. Submit a callback request and one of our bilingual mortgage brokers will guide you through the cash-out or top-up process.
              </p>
              
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-350">Direct Consultation Hotline</h4>
                  <p className="text-sm font-black text-white mt-0.5">0450 240 757</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl w-full">
              {enquirySubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/25">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black font-montserrat">Callback Request Received</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                    Thank you. We have received your home equity enquiry and will contact you within one business hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="enq-name" className="text-[11px] font-bold text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      id="enq-name"
                      required
                      placeholder="Enter name"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-violet-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="enq-email" className="text-[11px] font-bold text-slate-300">Email Address</label>
                      <input
                        type="email"
                        id="enq-email"
                        required
                        placeholder="Enter email"
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-violet-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="enq-phone" className="text-[11px] font-bold text-slate-300">Mobile Number</label>
                      <input
                        type="tel"
                        id="enq-phone"
                        required
                        placeholder="Enter phone"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-violet-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="enq-msg" className="text-[11px] font-bold text-slate-300">Message / Scenario Details</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your home loan goals..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-violet-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-[13px] py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-violet-500/10 active:scale-[0.98] mt-2"
                  >
                    {enquirySubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hidden printable report area */}
      <div id="printable-report-area" className="p-8 font-inter text-slate-800 bg-white hidden" style={{ width: "800px" }}>
        <div className="flex justify-between items-center border-b-2 border-violet-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Home Equity Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-violet-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              Home Equity Report
            </span>
            <p className="text-[10px] text-slate-400 font-bold">Generated on {new Date().toLocaleDateString("en-AU")}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-6 bg-violet-50/20 border border-violet-100 rounded-2xl p-6 text-center">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Home Equity</h2>
            <div className="text-4xl font-black text-violet-600 mt-1">
              ${results.totalEquity.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-1">Estimated Value: ${propertyValue.toLocaleString()}</p>
          </div>

          <div className="col-span-6 bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 text-center">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Usable Equity</h2>
            <div className="text-4xl font-black text-emerald-600 mt-1">
              ${results.usableEquity.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-1">LVR Lending Cap ({lvrLimit}%): ${results.maxLending.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Property & Loan Summary</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-500">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>Estimated Property Value:</td>
                  <td className="text-[#0B1F3A]">${propertyValue.toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Outstanding Mortgage Balance:</td>
                  <td className="text-[#0B1F3A]">${mortgageBalance.toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>LVR Lending Cap Ratio:</td>
                  <td className="text-[#0B1F3A]">{lvrLimit}%</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Max lending Capability:</td>
                  <td className="text-[#0B1F3A]">${results.maxLending.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Potential Leverage Scenarios</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-500">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>Renovation / Improvements:</td>
                  <td className="text-[#0B1F3A]">${results.usableEquity.toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Max Investment Property:</td>
                  <td className="text-[#0B1F3A]">${Math.round(results.potentialInvestmentValue).toLocaleString()}*</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Debt Consolidation Capacity:</td>
                  <td className="text-[#0B1F3A]">${results.usableEquity.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[8.5px] text-slate-400 mt-2 font-medium">*Assumes 20% deposit cover + 5% stamp duty & acquisition costs.</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[10px] text-slate-500 leading-relaxed">
          <p className="font-bold mb-1 uppercase tracking-wider text-[#0B1F3A]">Disclaimer &amp; Important Notice:</p>
          This Home Equity Report is an estimation only and is based on information provided by the user. Property valuation estimates and actual borrowing capacity depend on formal valuations, lender policies, credit checks, and proof of income/servicing capability. Accessing equity will increase your total loan balance and interest repayments. Contact Mortgage Xperts for certified borrowing limits and custom structuring strategies.
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter settings={settings} />
    </div>
  );
}
