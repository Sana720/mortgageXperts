"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Coins,
  TrendingUp,
  Landmark,
  Shield,
  Star,
  User,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Calculator,
  AlertCircle,
  HelpCircle,
  Calendar
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

  // Step 1: YTD Details
  const [startDate, setStartDate] = useState("2025-07-01");
  const [endDate, setEndDate] = useState("2026-06-09");
  const [ytdIncome, setYtdIncome] = useState<number>(45000);

  // Set dates dynamically on client load to avoid hydration mismatches
  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed
    let defaultStart = `${currentYear - 1}-07-01`;
    if (currentMonth >= 6) {
      defaultStart = `${currentYear}-07-01`;
    }
    setStartDate(defaultStart);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setEndDate(`${yyyy}-${mm}-${dd}`);
  }, []);

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
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Fallback if invalid dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return {
        daysCounted: 1,
        annualizedIncome: 0,
        weeklyEquivalent: 0,
        fortnightlyEquivalent: 0,
        monthlyEquivalent: 0
      };
    }

    const diffTime = end.getTime() - start.getTime();
    // Inclusive count of days
    const daysCounted = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);

    const annualizedIncome = daysCounted > 0 ? (ytdIncome / daysCounted) * 365 : 0;
    const weeklyEquivalent = annualizedIncome / 52;
    const fortnightlyEquivalent = annualizedIncome / 26;
    const monthlyEquivalent = annualizedIncome / 12;

    return {
      daysCounted,
      annualizedIncome,
      weeklyEquivalent,
      fortnightlyEquivalent,
      monthlyEquivalent
    };
  }, [startDate, endDate, ytdIncome]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "ytd-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `YTD Calculator submission. Start Date: ${startDate}, End Date: ${endDate}, Days: ${results.daysCounted}, YTD Income: $${ytdIncome}, Projected Annualised Income: $${results.annualizedIncome.toFixed(2)}`
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
        type: "ytd-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: YTD Income Guide"
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
        type: "ytd-callback",
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
      pdf.save(`Mortgage_YTD_Income_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Income Annualisation",
    hero_title: "Year-To-Date (YTD) Calculator",
    hero_subtext: "Easily project your annualised gross income based on your YTD payslip earnings. Crucial for self-employed, casual, and contract workers looking to buy a property in Australia.",
    hero_image: "/images/hero.png",
    hero_btn1_text: "Start Calculator",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to a Broker",
    hero_btn2_link: "#enquiry-form"
  };

  const faqs = [
    {
      q: "What is a YTD Calculator and how does it help with home loans?",
      a: "A YTD (Year-to-Date) calculator takes your accumulated gross earnings from a specific start date (usually the beginning of the financial year on July 1st) to your latest payslip end date. It annualises this income to estimate your yearly earnings, which is the baseline Australian lenders use to calculate your borrowing power."
    },
    {
      q: "Why do lenders annualise income for casual or contract workers?",
      a: "Casual, part-time, and contract workers often have varying pay week-to-week. Lenders cannot rely on a single week's pay. Instead, they look at your YTD gross income on your latest payslip and calculate the average weekly or monthly rate over the entire financial year to determine stable, sustainable income."
    },
    {
      q: "What start date should I use for the YTD calculation?",
      a: "For the majority of Australian payslips, YTD calculations start on July 1st, which marks the beginning of the Australian financial year. If you started your current employment after July 1st, you must use your actual start date as the Start Date for the calculator to ensure accuracy."
    },
    {
      q: "Does YTD include bonuses, commission, and overtime?",
      a: "YTD figures on payslips typically bundle base salary, overtime, commissions, and bonuses. However, lenders vary on how they treat these variable components. Many lenders only shade variable income at 80% or exclude it if you don't have a 2-year history. Speak to our brokers to find out how specific banks will assess your payslip."
    },
    {
      q: "How many days are counted in a YTD calculation?",
      a: "The calculator counts every calendar day between the YTD start date and the end date of the pay period, inclusive of both the start and end days. For example, July 1st to September 30th represents exactly 92 days of earnings."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero
        pageTitle="YTD Income Calculator"
        themeColor="orange"
        pageHeroSettings={pageHeroSettings || defaultHeroSettings}
      />

      {/* MAIN CALCULATOR SECTION */}
      <section id="calculator-tool" className="py-12 lg:py-24 bg-white relative scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-700 bg-orange-50 border border-orange-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Project Your Earnings & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Understand Your Loan Assessment</span>
              </h2>
              <div className="w-12 h-[3px] bg-orange-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                Annualising Year-to-Date (YTD) income is the standard method used by Australian banks to assess casual, part-time, and self-employed applicants. Use this tool to predict your lender-assessable income.
              </p>

              <div className="space-y-4 pt-4">
                {/* Point 1 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/10 hover:from-blue-50 hover:to-indigo-50/30 border border-blue-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/40 shadow-sm">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Income Annualisation</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Projects your total annual gross income based on YTD earnings and days elapsed in the financial year.</p>
                  </div>
                </motion.div>

                {/* Point 2 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-emerald-50/50 to-teal-50/10 hover:from-emerald-50 hover:to-teal-50/30 border border-emerald-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/40 shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Pay Cycle Equivalents</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Breaks down your annualized earnings into weekly, fortnightly, and monthly equivalents for simple budgeting.</p>
                  </div>
                </motion.div>

                {/* Point 3 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/10 hover:from-indigo-50 hover:to-purple-50/30 border border-indigo-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200/40 shadow-sm">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Lender Serviceability</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Provides a standard baseline figure commonly used by Australian banks to assess borrowing capacity.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form */}
            <div className="lg:col-span-6 flex justify-end no-print">
              <div className="w-full max-w-[500px] bg-gradient-to-b from-white via-white to-slate-50/50 border border-slate-200/60 rounded-[32px] p-8 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.08)] hover:shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12)] flex flex-col justify-between min-h-[510px] transition-all duration-300 relative overflow-hidden">
                
                {/* Top decorative gradient bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-orange-600 transition-all duration-500" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>

                {/* STEP 1: Payslip inputs */}
                {currentStep === 1 && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="start-date">YTD Start Date</label>
                        <span className="text-orange-700 font-black text-[13px]">{startDate}</span>
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="date"
                          id="start-date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="end-date">Latest Pay Period End Date</label>
                        <span className="text-orange-700 font-black text-[13px]">{endDate}</span>
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="date"
                          id="end-date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="ytd-income">Total YTD Gross Income ($)</label>
                        <span className="text-orange-700 font-black text-[13px]">${ytdIncome.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="ytd-income"
                          value={ytdIncome}
                          onChange={(e) => setYtdIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Lead details */}
                {currentStep === 2 && (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 py-2">
                    <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 text-center">
                      <h4 className="text-[#0B1F3A] font-extrabold text-[13px] font-montserrat">Unlock YTD Income Calculation</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Enter your details to generate your projected annual income report and download it as a PDF.</p>
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-500"
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-500"
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <button type="submit" className="hidden" id="wizard-lead-submit-btn" />
                  </form>
                )}

                {/* STEP 3: Results Display */}
                {currentStep === 3 && (
                  <div className="space-y-4 py-2">
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-800">Estimated Annualised Income</span>
                      <div className="text-2.5xl sm:text-3xl font-black mt-1 text-emerald-600">
                        ${Math.round(results.annualizedIncome).toLocaleString()}
                      </div>
                      <p className="text-[10.5px] text-slate-400 mt-1 font-bold">Based on {results.daysCounted} calendar days counted</p>
                    </div>

                    {/* Pay cycle breakdowns */}
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pay Cycle Equivalents</h4>
                      <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between py-1 border-b border-slate-100 text-xs font-semibold text-slate-600">
                          <span>Weekly Equivalent:</span>
                          <span className="text-[#0B1F3A] font-black">${Math.round(results.weeklyEquivalent).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 text-xs font-semibold text-slate-600">
                          <span>Fortnightly Equivalent:</span>
                          <span className="text-[#0B1F3A] font-black">${Math.round(results.fortnightlyEquivalent).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 text-xs font-semibold text-slate-600">
                          <span>Monthly Equivalent:</span>
                          <span className="text-[#0B1F3A] font-black">${Math.round(results.monthlyEquivalent).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={downloadReportPDF}
                        disabled={isGeneratingPdf}
                        className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
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
                        className="border border-orange-600 text-orange-700 bg-white hover:bg-orange-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
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
                        className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/10 transition-colors ml-auto"
                      >
                        Next: Project Income <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const btn = document.getElementById("wizard-lead-submit-btn");
                          if (btn) btn.click();
                        }}
                        disabled={calcLeadSubmitting}
                        className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/10 transition-colors ml-auto"
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
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Guide Download
              </span>
              <h2 className="text-white text-[24px] sm:text-[30px] font-black leading-tight font-montserrat">
                Simplify your finances with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Year to Date Guide</span>
              </h2>
              <p className="text-slate-350 text-[13.5px] leading-relaxed">
                Get your comprehensive guide to tracking year-to-date income and expenses, ensuring you stay on track with your financial goals and optimize your home loan application.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-4.5 h-4.5 text-orange-500 shrink-0" />
                  <span>Maximize borrowing power using YTD optimization</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-4.5 h-4.5 text-orange-500 shrink-0" />
                  <span>How banks treat bonuses, overtime, and allowances</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-4.5 h-4.5 text-orange-500 shrink-0" />
                  <span>Self-employed YTD profit and loss checklists</span>
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
                  <p className="text-xs text-slate-300 leading-relaxed">Your guide has been sent to your email. One of our home loan specialists will follow up with you shortly.</p>
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={guideEmail}
                      onChange={(e) => setGuideEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={guidePhone}
                      onChange={(e) => setGuidePhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                    />
                  </div>
                  <p className="text-[9.5px] text-slate-400 leading-relaxed">
                    By clicking ‘Get the guide’, you acknowledge our <Link href="/privacy-collection-notice" className="text-orange-500 underline hover:text-orange-400">Privacy Collection Notice</Link> and consent to being contacted by a Mortgage Xperts broker.
                  </p>
                  <button
                    type="submit"
                    disabled={guideSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer mt-2"
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
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-800 bg-orange-50 border border-orange-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Questions</span>
            </h2>
            <p className="text-slate-500 text-[12.5px] font-medium mt-2">
              Everything you need to know about Year to Date (YTD) calculations for home loans.
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
                  <HelpCircle className={`w-4 h-4 shrink-0 transition-transform ${openFaqIndex === idx ? "rotate-180 text-orange-600" : "text-slate-400"}`} />
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
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Happy Clients</span></>}
        backgroundClass="bg-white"
      />

      {/* ENQUIRY CALLBACK FORM */}
      <section id="enquiry-form" className="py-16 lg:py-24 bg-[#0B1F3A] text-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-450 bg-orange-500/10 border border-orange-500/25 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Callback Service
              </span>
              <h2 className="text-white text-[28px] sm:text-[38px] lg:text-[45px] font-black leading-tight font-montserrat">
                Need Help with Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Payslip &amp; YTD Income?</span>
              </h2>
              <div className="w-12 h-[3px] bg-orange-500 rounded-full" />
              <p className="text-slate-300 text-[14px] leading-relaxed max-w-xl">
                Payslips and lender borrowing criteria can be complex to navigate on your own. Submit a callback request and one of our expert brokers will review your payslip YTD, determine your true borrowing capacity, and match you with the right bank policy.
              </p>
              
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
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
                    Thank you. We have received your payslip review enquiry and will contact you within one business hour.
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-orange-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-orange-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-orange-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="enq-msg" className="text-[11px] font-bold text-slate-300">Message / Scenario Details</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your property goals..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-orange-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[13px] py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/10 active:scale-[0.98] mt-2"
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
        <div className="flex justify-between items-center border-b-2 border-orange-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Home Loan Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              YTD Income Report
            </span>
            <p className="text-[10px] text-slate-400 font-bold">Generated on {new Date().toLocaleDateString("en-AU")}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 bg-orange-50/20 border border-orange-100 rounded-2xl p-6 text-center">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Projected Annualised Income</h2>
            <div className="text-4xl font-black text-emerald-600 mt-1">
              ${Math.round(results.annualizedIncome).toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-1">Based on {results.daysCounted} calendar days counted in the YTD period</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Payslip Details</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-500">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>YTD Start Date:</td>
                  <td className="text-[#0B1F3A]">{startDate}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Latest Pay Period End Date:</td>
                  <td className="text-[#0B1F3A]">{endDate}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Days Elapsed in Period:</td>
                  <td className="text-[#0B1F3A]">{results.daysCounted} Days</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Total YTD Gross Income:</td>
                  <td className="text-[#0B1F3A]">${ytdIncome.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Equivalent Earnings</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-500">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>Weekly Pay Cycle Equivalent:</td>
                  <td className="text-[#0B1F3A]">${Math.round(results.weeklyEquivalent).toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Fortnightly Pay Cycle Equivalent:</td>
                  <td className="text-[#0B1F3A]">${Math.round(results.fortnightlyEquivalent).toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Monthly Pay Cycle Equivalent:</td>
                  <td className="text-[#0B1F3A]">${Math.round(results.monthlyEquivalent).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[10px] text-slate-500 leading-relaxed">
          <p className="font-bold mb-1 uppercase tracking-wider text-[#0B1F3A]">Disclaimer &amp; Important Notice:</p>
          This YTD Income Annualisation Report is an estimation only. Lenders have individual policies regarding variable income components (overtime, commissions, bonuses) and shading margins. This does not constitute an offer of credit or financial pre-approval. Contact Mortgage Xperts for a verified bank serviceability assessment.
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter settings={settings} />
    </div>
  );
}
