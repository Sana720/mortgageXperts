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
  Percent,
  Coins,
  RotateCcw,
  TrendingDown,
  Printer
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SubPageHero } from "../components/SubPageHero";
import { RoadmapGuideCard } from "../components/RoadmapGuideCard";
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

const faqs = [
  {
    q: "How does the RBA cash rate affect my mortgage?",
    a: "When the RBA changes the official cash rate, banks usually adjust their variable home loan interest rates in response. A rate hike increases your minimum monthly repayments, while a rate cut can reduce them."
  },
  {
    q: "How quickly do lenders pass on rate changes?",
    a: "Most lenders pass on rate increases within days, meaning your next repayment cycle may be affected. Rate cuts sometimes take slightly longer to be passed on to customers."
  },
  {
    q: "Should I fix my interest rate to avoid hikes?",
    a: "Fixing your rate provides certainty for your repayments over a set period (usually 1-5 years). However, if rates drop, you won't benefit from the lower rate. It's best to speak with a broker to assess your personal situation."
  },
  {
    q: "How can a broker help me during rate changes?",
    a: "A broker can review your current loan against hundreds of options to see if you can get a better rate elsewhere. We can negotiate with your current lender on your behalf or help you refinance to a more competitive loan."
  }
];

export default function ClientPage({
  settings = {},
  pageHeroSettings,
  pageContent
}: {
  settings?: Record<string, string>;
  pageHeroSettings?: PageHeroSettings;
  pageContent?: string;
}) {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Inputs
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(6.00);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [changeSign, setChangeSign] = useState<"+" | "-">("+");
  const [rateChange, setRateChange] = useState<number>(0.25);

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
    const P = loanAmount;
    const n = loanTerm * 12;

    // Standard P&I Repayment Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const calculateRepayment = (annualRate: number) => {
      if (annualRate <= 0) return n > 0 ? P / n : 0;
      const r = annualRate / 12 / 100;
      const pow = Math.pow(1 + r, n);
      return P * (r * pow) / (pow - 1);
    };

    const oldRepayment = calculateRepayment(interestRate);

    // Calculate new rate
    const changeVal = changeSign === "+" ? rateChange : -rateChange;
    const newRate = Math.max(0, interestRate + changeVal);
    const newRepayment = calculateRepayment(newRate);

    const repaymentChange = Math.abs(newRepayment - oldRepayment);
    const repaymentChangeRounded = Math.round(repaymentChange);

    return {
      oldRepayment,
      newRate,
      newRepayment,
      repaymentChange,
      repaymentChangeRounded
    };
  }, [loanAmount, interestRate, loanTerm, changeSign, rateChange]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "cash-rate-change-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Cash Rate Change Calculator. Loan Amount: $${loanAmount}, Term: ${loanTerm} years, Current Rate: ${interestRate}%, RBA Change: ${changeSign}${rateChange}%, Old Repayment: $${results.oldRepayment.toFixed(2)}, New Repayment: $${results.newRepayment.toFixed(2)}, Repayment Change: $${results.repaymentChangeRounded}/mo`
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
    }
  };

  // Guide request handler
  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideName || !guideEmail || !guidePhone) return;

    setGuideSubmitting(true);
    try {
      const payload = {
        type: "cash-rate-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Cash Rate Change & Mortgage Survival Guide"
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
        type: "cash-rate-callback",
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
      pdf.save(`Mortgage_Xperts_Rate_Change_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Rate Change Impact Modeler",
    hero_title: "Cash Rate Change Calculator",
    hero_subtext: "Instantly calculate how shifts in the RBA cash rate or changes by your lender will affect your monthly mortgage repayments. Plan ahead and manage your budget with confidence.",
    hero_image: "/images/hero.png",
    hero_btn1_text: "Calculate Impact",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to a Broker",
    hero_btn2_link: "#enquiry-form"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero
        pageTitle="Cash Rate Change Calculator"
        themeColor="rose"
        pageHeroSettings={pageHeroSettings || defaultHeroSettings}
      />

      {/* MAIN CALCULATOR SECTION */}
      <section id="calculator-tool" className="py-12 lg:py-24 bg-white relative scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print order-2 lg:order-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-800 bg-rose-50 border border-rose-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Understand the Impact of <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">RBA Interest Rate Decisions</span>
              </h2>
              <div className="w-12 h-[3px] bg-rose-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                {pageContent || "Whenever the Reserve Bank of Australia (RBA) adjusts the official cash rate, lenders typically pass this change onto variable rate home loans. Use this calculator to model how much your repayment will rise or fall."}
              </p>

              <div className="space-y-4 pt-4">
                {/* Point 1 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-rose-50/50 to-pink-50/10 hover:from-rose-50 hover:to-pink-50/30 border border-rose-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100/70 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/40 shadow-sm">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Sensitivity Modeling</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Model rate increases (+) or rate cuts (-) of 0.25%, 0.50% or custom values to see repayment variations.</p>
                  </div>
                </motion.div>

                {/* Point 2 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/10 hover:from-blue-50 hover:to-indigo-50/30 border border-blue-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/40 shadow-sm">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Budget Planning</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Calculate exact changes to your monthly cash outflow to ensure your household budget stays resilient.</p>
                  </div>
                </motion.div>

                {/* Point 3 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0] hover:from-[#FFF0F0] border border-rose-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100/70 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/40 shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Lender Rate Comparison</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Identify if switching to a lower base interest rate will offset the impacts of rate hikes.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form */}
            <div className="lg:col-span-6 flex justify-end no-print order-1 lg:order-2">
              <div className="w-full max-w-[520px] bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[530px] transition-all duration-300 relative overflow-hidden">
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full opacity-50 pointer-events-none" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-rose-600 transition-all duration-500" 
                    style={{ width: `${(currentStep / 2) * 100}%` }}
                  />
                </div>

                {/* STEP 1: Inputs */}
                {currentStep === 1 && (
                  <div className="space-y-4 py-2">
                    {/* Loan Amount */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="loan-amount">Loan Amount ($)</label>
                        <span className="text-rose-700 font-black text-[13px]">${loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="loan-amount"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all"
                        />
                      </div>
                    </div>

                    {/* Current Interest Rate */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="interest-rate">Current Interest Rate (% p.a.)</label>
                        <span className="text-rose-700 font-black text-[13px]">{interestRate.toFixed(2)}%</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          id="interest-rate"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all"
                        />
                      </div>
                    </div>

                    {/* Loan Term */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="loan-term">Loan Term (Years)</label>
                        <span className="text-rose-700 font-black text-[13px]">{loanTerm} Years</span>
                      </div>
                      <input
                        type="number"
                        id="loan-term"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Math.max(1, Math.min(45, parseInt(e.target.value) || 0)))}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all"
                      />
                    </div>

                    {/* Cash Rate Change */}
                    <div className="space-y-2">
                      <label htmlFor="rate-change" className="text-[11px] font-bold text-slate-700 block">RBA Cash Rate Change (%)</label>
                      <div className="flex gap-2">
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          <button
                            type="button"
                            onClick={() => setChangeSign("+")}
                            className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${changeSign === "+" ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                          >
                            + Rise
                          </button>
                          <button
                            type="button"
                            onClick={() => setChangeSign("-")}
                            className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${changeSign === "-" ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                          >
                            - Cut
                          </button>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          id="rate-change"
                          value={rateChange}
                          onChange={(e) => setRateChange(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="flex-1 bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-rose-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}
                    {/* Note: Step 2 Lead form merged below */}

                {/* STEP 2: Results Display */}
                {currentStep === 2 && (
                  <div className="space-y-4 py-2">
                    {/* Headline message */}
                    <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 text-center shadow-inner">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-800">Monthly Repayment Change</span>
                      <div className="text-3xl font-black mt-2 text-rose-600 flex items-center justify-center gap-1 font-montserrat">
                        {changeSign === "+" ? <TrendingUp className="w-7 h-7 text-rose-600" /> : <TrendingDown className="w-7 h-7 text-emerald-600" />}
                        ${results.repaymentChangeRounded.toLocaleString()}
                      </div>
                      <p className="text-[11.5px] text-slate-600 mt-2 font-bold leading-relaxed max-w-sm mx-auto">
                        A rate change of {changeSign}{rateChange}% will {changeSign === "+" ? "increase" : "decrease"} your monthly repayments by ${results.repaymentChangeRounded} per month.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Old Repayment</span>
                        <div className="text-xl font-black mt-1 text-[#0B1F3A]">
                          ${results.oldRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 font-bold">Rate: {interestRate.toFixed(2)}%</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">New Repayment</span>
                        <div className="text-xl font-black mt-1 text-[#0B1F3A]">
                          ${results.newRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 font-bold">Rate: {results.newRate.toFixed(2)}%</p>
                      </div>
                    </div>

                    {/* Visual Comparison Chart */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Repayment Adjustment Chart</h4>
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {/* Old Repayment Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Current Monthly Repayments</span>
                            <span>${Math.round(results.oldRepayment).toLocaleString()}</span>
                          </div>
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "90%" }}
                              transition={{ duration: 0.8, ease: EASE_OUT }}
                              className="h-full bg-slate-400 rounded-full"
                            />
                          </div>
                        </div>

                        {/* New Repayment Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Projected Monthly Repayments</span>
                            <span>${Math.round(results.newRepayment).toLocaleString()}</span>
                          </div>
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(results.newRepayment / results.oldRepayment) * 90}%` }}
                              transition={{ duration: 0.8, ease: EASE_OUT }}
                              className={`h-full rounded-full ${changeSign === "+" ? "bg-rose-600" : "bg-emerald-600"}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                                {/* Optional Lead Form for full report */}
                    {currentStep === 2 && (
                      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3 mt-4">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">📄 Get Full PDF Report — Enter Details</p>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          handleLeadSubmit(e);
                        }} className="space-y-2">
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={calcLeadName}
                            onChange={(e) => setCalcLeadName(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-rose-500"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="email"
                              required
                              placeholder="Email"
                              value={calcLeadEmail}
                              onChange={(e) => setCalcLeadEmail(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-rose-500"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Phone"
                              value={calcLeadPhone}
                              onChange={(e) => setCalcLeadPhone(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-rose-500"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={calcLeadSubmitting}
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[12px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/10 transition-colors"
                          >
                            {calcLeadSubmitting ? "Generating..." : "Download Full Report"} <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer w-1/2"
                      >
                        <Printer className="w-4 h-4 shrink-0" />
                        <span>Print Report</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep(1);
                          setCalcLeadName("");
                          setCalcLeadEmail("");
                          setCalcLeadPhone("");
                        }}
                        className="border border-rose-600 text-rose-700 bg-white hover:bg-rose-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer w-1/2"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                )}

                {/* BOTTOM BUTTON BAR FOR STEP 1 */}
                {currentStep < 2 && (
                  <div className="flex justify-between items-center gap-3 border-t border-slate-100 pt-4 mt-4">
                    {currentStep === 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/10 transition-colors ml-auto"
                      >
                        Calculate Repayments <ArrowRight className="w-4 h-4" />
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
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <RoadmapGuideCard />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-800 bg-rose-50 border border-rose-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">Questions</span>
            </h2>
            <p className="text-slate-500 text-[12.5px] font-medium mt-2">
              Everything you need to know about first home buyer deposits, pre-approvals, and loans.
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
                  <span className="pr-4 font-montserrat">{faq.q}</span>
                  <HelpCircle className={`w-4.5 h-4.5 shrink-0 transition-transform ${openFaqIndex === idx ? "rotate-180 text-rose-600" : "text-slate-400"}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed border-t border-slate-100/80 font-medium">
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
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">Happy Home Owners</span></>}
        backgroundClass="bg-white"
      />

      {/* ENQUIRY CALLBACK FORM */}
      <section id="enquiry-form" className="py-16 lg:py-24 bg-[#0B1F3A] text-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/25 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Callback Service
              </span>
              <h2 className="text-white text-[28px] sm:text-[38px] lg:text-[45px] font-black leading-tight font-montserrat">
                Need Help Finding a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">Lower Interest Rate?</span>
              </h2>
              <div className="w-12 h-[3px] bg-rose-500 rounded-full" />
              <p className="text-slate-350 text-[14px] leading-relaxed max-w-xl">
                Refinancing or renegotiating with your bank is the easiest way to combat RBA rate increases. Submit your scenario, and we will audit your loan against 30+ lenders to locate stamp duty concessions, cashback rewards, or lower rates.
              </p>
              
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-455 flex items-center justify-center border border-rose-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-350">Direct Consultation Hotline</h4>
                  <p className="text-sm font-black text-white mt-0.5">0450 240 757</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 text-slate-800">
              {enquirySubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black font-montserrat text-[#0B1F3A]">Callback Request Received</h3>
                  <p className="text-xs text-slate-505 leading-relaxed max-w-xs mx-auto">
                    Thank you. We have received your home loan rate enquiry and will contact you within one business hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="enq-name" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Your Full Name*</label>
                    <input
                      type="text"
                      id="enq-name"
                      required
                      placeholder="Jane Smith"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="enq-email" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Email Address*</label>
                      <input
                        type="email"
                        id="enq-email"
                        required
                        placeholder="jane@example.com"
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="enq-phone" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Mobile Number*</label>
                      <input
                        type="tel"
                        id="enq-phone"
                        required
                        placeholder="0400 000 000"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="enq-msg" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Message / Scenario Details</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your home loan interest rates or refinance goals..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
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
        <div className="flex justify-between items-center border-b-2 border-rose-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Refinance Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              Interest Rate Change Assessment
            </span>
            <p className="text-[10px] text-slate-400 font-bold">Generated on {new Date().toLocaleDateString("en-AU")}</p>
          </div>
        </div>

        <div className="bg-rose-50/20 border border-rose-100 rounded-2xl p-6 text-center mb-6">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estimated Monthly Repayment Change</h2>
          <div className="text-4xl font-black text-rose-600 mt-1">
            ${results.repaymentChangeRounded.toLocaleString()} / month
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-1">Projected {changeSign === "+" ? "Increase" : "Decrease"} based on RBA {changeSign}{rateChange}% change</p>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Current Loan Details</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-500">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>Loan Amount:</td>
                  <td className="text-[#0B1F3A]">${loanAmount.toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Current Interest Rate:</td>
                  <td className="text-[#0B1F3A]">{interestRate.toFixed(2)}%</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Loan Term:</td>
                  <td className="text-[#0B1F3A]">{loanTerm} Years</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Current Monthly Repayment:</td>
                  <td className="text-[#0B1F3A]">${results.oldRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Projected Scenario</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-500">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>RBA Interest Rate Change:</td>
                  <td className="text-[#0B1F3A]">{changeSign}{rateChange.toFixed(2)}%</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>New Interest Rate:</td>
                  <td className="text-[#0B1F3A]">{results.newRate.toFixed(2)}%</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>New Monthly Repayment:</td>
                  <td className="text-[#0B1F3A]">${results.newRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Difference:</td>
                  <td className="text-[#0B1F3A]">${results.repaymentChangeRounded.toLocaleString()} / month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 text-[10px] text-slate-500 leading-relaxed">
          <p className="font-bold mb-1 uppercase tracking-wider text-[#0B1F3A]">Disclaimer &amp; Important Notice:</p>
          This rate change calculation is an estimate only and is based on information provided by the user. True interest rate changes, interest rates, and fee adjustments are at the discretion of individual lenders and may vary based on product features, compounding frequency, and loan terms. Taxes, insurance premiums, and other charges are not factored into these figures. Contact Mortgage Xperts for professional home loan advice.
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter settings={settings} />
    </div>
  );
}
