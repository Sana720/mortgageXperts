"use client";

import React, { useState, useMemo } from "react";
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
  CheckCircle2, Download,
  Calculator,
  AlertCircle,
  HelpCircle,
  Calendar,
  Printer
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

export default function ClientPage({ settings = {}, pageHeroSettings, pageContent }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string }) {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Step 1: Standard Loan details
  const [loanAmount, setLoanAmount] = useState<number>(400000);
  const [frequency, setFrequency] = useState<"weekly" | "fortnightly" | "monthly">("monthly");
  const [loanTerm, setLoanTerm] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(6.00);

  // Step 2: Extra Repayment details
  const [extraAmount, setExtraAmount] = useState<number>(200);
  const [startAfter, setStartAfter] = useState<number>(0);

  // Step 3: Lead capture
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
    const pYear = frequency === "weekly" ? 52 : frequency === "fortnightly" ? 26 : 12;
    const r = interestRate / 100 / pYear;
    const totalPeriodsStd = loanTerm * pYear;

    // Standard period repayment (PMT)
    let standardRepayment = 0;
    if (totalPeriodsStd > 0) {
      if (r === 0) {
        standardRepayment = loanAmount / totalPeriodsStd;
      } else {
        standardRepayment = loanAmount * (r * Math.pow(1 + r, totalPeriodsStd)) / (Math.pow(1 + r, totalPeriodsStd) - 1);
      }
    }

    // 1. Run Standard Amortization Schedule
    let balanceStd = loanAmount;
    let totalInterestPaidStd = 0;
    let standardPeriodsCount = 0;
    const maxSafetyPeriods = 20000;

    for (let i = 0; i < maxSafetyPeriods; i++) {
      if (balanceStd <= 0) break;
      const interestCharge = balanceStd * r;
      const payment = Math.min(balanceStd + interestCharge, standardRepayment);
      totalInterestPaidStd += interestCharge;
      balanceStd = balanceStd + interestCharge - payment;
      standardPeriodsCount++;
    }

    // 2. Run Extra Repayment Amortization Schedule
    let balanceExtra = loanAmount;
    let totalInterestPaidExtra = 0;
    let extraPeriodsCount = 0;

    for (let i = 0; i < maxSafetyPeriods; i++) {
      if (balanceExtra <= 0) break;
      
      const currentYear = extraPeriodsCount / pYear;
      const appliedExtra = currentYear >= startAfter ? extraAmount : 0;
      const targetRepayment = standardRepayment + appliedExtra;

      const interestCharge = balanceExtra * r;
      const payment = Math.min(balanceExtra + interestCharge, targetRepayment);
      totalInterestPaidExtra += interestCharge;
      balanceExtra = balanceExtra + interestCharge - payment;
      extraPeriodsCount++;
    }

    // Difference outputs
    const totalInterestSaved = Math.max(0, totalInterestPaidStd - totalInterestPaidExtra);
    const periodsSaved = Math.max(0, standardPeriodsCount - extraPeriodsCount);

    // Format times into Years and Months
    const formatPeriods = (periods: number): { years: number; months: number; text: string } => {
      let years = Math.floor(periods / pYear);
      let months = Math.round((periods % pYear) / pYear * 12);
      if (months === 12) {
        years += 1;
        months = 0;
      }

      let text = "";
      if (years > 0 && months > 0) {
        text = `${years} Year${years > 1 ? "s" : ""}, ${months} Month${months > 1 ? "s" : ""}`;
      } else if (years > 0) {
        text = `${years} Year${years > 1 ? "s" : ""}`;
      } else if (months > 0) {
        text = `${months} Month${months > 1 ? "s" : ""}`;
      } else {
        text = "0 Months";
      }

      return { years, months, text };
    };

    const timeSaved = formatPeriods(periodsSaved);
    const newLoanTerm = formatPeriods(extraPeriodsCount);

    return {
      standardRepayment,
      totalInterestPaidStd,
      totalInterestPaidExtra,
      totalInterestSaved,
      periodsSaved,
      timeSaved,
      newLoanTerm,
      standardPeriodsCount,
      extraPeriodsCount
    };
  }, [loanAmount, frequency, loanTerm, interestRate, extraAmount, startAfter]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "extra-repayment-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Extra Repayments Calculator submission. Loan Amount: $${loanAmount}, Frequency: ${frequency}, Term: ${loanTerm}y, Rate: ${interestRate}%, Extra contribution: $${extraAmount}/${frequency} (starts after ${startAfter}y), Interest Saved: $${results.totalInterestSaved.toFixed(2)}, Time Saved: ${results.timeSaved.text}`
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
        type: "extra-repayment-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Extra Repayment Guide"
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
        type: "extra-repayment-callback",
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
      pdf.save(`Mortgage_Extra_Repayment_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Pay Off Your Loan Early",
    hero_title: "Extra Repayment Calculator",
    hero_subtext: "Calculate standard repayments versus additional payments. Discover how weekly, fortnightly, or monthly extra amounts can slash years off your home loan term and save thousands in compounding interest.",
    hero_image: "/images/hero.png",
    hero_btn1_text: "Calculate Savings",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Consult a Mortgage Broker",
    hero_btn2_link: "#enquiry-form"
  };

  const faqs = [
    {
      q: "How do extra repayments save interest?",
      a: "Because mortgage interest is calculated daily on your remaining loan balance, any extra repayments directly reduce the principal amount. When the principal drops faster, the daily interest charge decreases, creating a compounding savings effect over the lifetime of the loan."
    },
    {
      q: "Is fortnightly frequency better than monthly?",
      a: "Yes. Making half-payments fortnightly means you pay 26 half-payments a year, which equals 13 full monthly repayments (one extra month of repayment per year). Additionally, paying more frequently reduces the daily balance quicker, which compiles additional interest savings."
    },
    {
      q: "Are there limits on extra repayments?",
      a: "Variable rate home loans typically allow unlimited extra repayments with no fees. Fixed rate home loans, however, often place strict caps on extra repayments (usually $10,000 to $20,000 per year) and charge exit/break costs if you exceed them. Always verify with your broker before committing to large lump sums on fixed loans."
    },
    {
      q: "Can I withdraw extra repayments if needed?",
      a: "Yes, if your home loan product includes a redraw facility. A redraw facility allows you to withdraw any additional principal payments you've made above the standard minimum repayment, which gives you liquidity while still lowering your interest charges in the meantime."
    },
    {
      q: "What is an offset account and is it different from extra repayments?",
      a: "An offset account is a separate savings or transaction account linked to your home loan. The balance in this account offsets the loan balance for interest calculations. It offers the exact same interest savings as paying extra repayments directly, but keeps your savings fully accessible as cash rather than locking it inside the loan structure."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero pageTitle="Extra Repayment Calculator" themeColor="teal" pageHeroSettings={pageHeroSettings || defaultHeroSettings} />

      {/* CALCULATOR TOOL SECTION (Structured like Loan Repayment, Styled in Teal) */}
      <section id="calculator-tool" className="py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative border-b border-slate-100 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute right-[-10%] top-[10%] w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-[-5%] bottom-[15%] w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Rich Mortgage Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-800 bg-teal-50 border border-teal-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Accelerate Your Mortgage & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Pay Off Your Home Loan Faster</span>
              </h2>
              <div className="w-12 h-[3px] bg-teal-600 rounded-full" />
              <p className="text-slate-550 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                {pageContent || "Mortgage interest compounding can be tackled by paying extra amounts weekly, fortnightly, or monthly. Input your current terms and see how much interest and time you will save."}
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Years Shaved Off</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Projects exactly how many years and months you will shave off the loan term.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Compounding Interest Saved</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Calculates total dollar savings on daily compounding interest charges.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">New Amortization Timeline</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Computes your new mortgage payoff date based on frequency and start-after delays.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form (Structured like Repayment / Borrowing) */}
            <div className="lg:col-span-6 flex justify-end no-print">
              <div className="w-full max-w-[500px] bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col transition-all duration-300 relative overflow-hidden">
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full opacity-50 pointer-events-none" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-all duration-500 ease-out" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>

                {/* Header Step indicators */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-black text-white bg-teal-600">
                      {currentStep === 3 ? "✓" : currentStep}
                    </span>
                    <h3 className="text-[13px] font-bold text-slate-700 font-montserrat">
                      {currentStep === 1 && "Step 1: Loan & Rate Details"}
                      {currentStep === 2 && "Step 2: Extra Repayment Details"}
                      {currentStep === 3 && "Step 3: Savings Summary"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step {currentStep} of 3</span>
                </div>

                {/* Wizard Body content */}
                <div className="flex-1 flex flex-col justify-center">
                  
                  {/* Step 1: Loan & Rate Details */}
                  {currentStep === 1 && (
                    <div className="space-y-4 py-2">
                      {/* Loan Amount */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="loan-amount">Outstanding Loan Amount ($)</label>
                          <span className="text-teal-700 font-black text-[13.5px]">${loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="loan-amount"
                            required
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                          />
                        </div>
                      </div>

                      {/* Repayment Frequency */}
                      <div className="space-y-2">
                        <label htmlFor="frequency" className="text-[11px] font-bold text-slate-700 block">Repayment Frequency</label>
                        <select
                          id="frequency"
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value as "weekly" | "fortnightly" | "monthly")}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all appearance-none cursor-pointer"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="fortnightly">Fortnightly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>

                      {/* Loan Term Remaining */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                            <label htmlFor="loan-term">Remaining Term (Years)</label>
                          </div>
                          <input
                            type="number"
                            id="loan-term"
                            required
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Math.max(1, Math.min(45, Number(e.target.value))))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                            <label htmlFor="interest-rate">Interest Rate (% p.a.)</label>
                          </div>
                          <div className="relative">
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">%</div>
                            <input
                              type="number"
                              id="interest-rate"
                              step="0.01"
                              required
                              value={interestRate}
                              onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-4 pr-8 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Extra Repayment Details */}
                  {currentStep === 2 && (
                    <div className="space-y-4 py-2">
                      {/* Extra Contribution Per Payment */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="extra-amount">Extra Contribution Per Payment ($)</label>
                          <span className="text-teal-700 font-black text-[13.5px]">${extraAmount.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="extra-amount"
                            required
                            value={extraAmount}
                            onChange={(e) => setExtraAmount(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold italic">This amount is added to each {frequency} standard payment.</p>
                      </div>

                      {/* Extra Contribution Starts After (Years) */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="start-after">Extra Starts After (Years)</label>
                          <span className="text-teal-700 font-black text-[13.5px]">{startAfter} Years</span>
                        </div>
                        <input
                          type="number"
                          id="start-after"
                          required
                          value={startAfter}
                          onChange={(e) => setStartAfter(Math.max(0, Math.min(loanTerm - 1, Number(e.target.value))))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                        />
                        <p className="text-[10px] text-slate-400 font-semibold italic">Delay extra payments if you need to build other liquid offsets first.</p>
                      </div>
                    </div>
                  )}                {/* Note: Step 3 Lead form merged below */}

                  {/* Step 3: Calculations Summary Display */}
                  {currentStep >= 3 && (
                    <div className="space-y-4 py-2">
                      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-teal-800">Projected Mortgage Savings</span>
                        <div className="text-2.5xl sm:text-3xl font-black mt-1 text-emerald-600">
                          {results.timeSaved.text} Saved
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-relaxed">
                          Interest Saved: <strong className="text-slate-700 font-extrabold">${Math.round(results.totalInterestSaved).toLocaleString()}</strong>
                        </p>
                      </div>

                      {/* Repayment visual comparison bars */}
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Interest Paid Comparison</h4>
                        <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {/* Standard schedule */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-bold text-slate-600">
                              <span>Standard Interest Paid:</span>
                              <span className="font-black">${Math.round(results.totalInterestPaidStd).toLocaleString()}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-slate-400 rounded-full" style={{ width: "100%" }} />
                            </div>
                          </div>

                          {/* Extra schedule */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-bold text-slate-600">
                              <span>Interest Paid with Extra:</span>
                              <span className="text-teal-700 font-black">${Math.round(results.totalInterestPaidExtra).toLocaleString()}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-teal-600 rounded-full transition-all duration-500" 
                                style={{ width: `${Math.min(100, (results.totalInterestPaidExtra / results.totalInterestPaidStd) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Net parameters */}
                      <div className="space-y-1.5 text-[12px] font-semibold text-slate-500">
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span>Standard {frequency} Repayment:</span>
                          <span className="text-slate-800 font-black">${Math.round(results.standardRepayment).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span>New Loan Payoff Term:</span>
                          <span className="text-teal-700 font-black">{results.newLoanTerm.text}</span>
                        </div>
                      </div>

                      {/* Optional Lead Form for full report */}
                      {currentStep === 3 && (
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
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-teal-500"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="email"
                                required
                                placeholder="Email"
                                value={calcLeadEmail}
                                onChange={(e) => setCalcLeadEmail(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-teal-500"
                              />
                              <input
                                type="tel"
                                required
                                placeholder="Phone"
                                value={calcLeadPhone}
                                onChange={(e) => setCalcLeadPhone(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-teal-500"
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={calcLeadSubmitting}
                              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[12px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-500/10 transition-colors"
                            >
                              {calcLeadSubmitting ? "Generating..." : "Download Full Report"} <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        </div>
                      )}

                      {/* CTAs */}
                      <div className="grid grid-cols-2 gap-3 pt-2 mt-4">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
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
                          className="border border-teal-600 text-teal-700 bg-white hover:bg-teal-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                        >
                          Start Over
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer buttons for steps navigation */}
                {currentStep < 3 && (
                  <div className="space-y-3 pt-4 border-t border-slate-100 mt-4">
                    <div className="flex gap-3">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13px] px-4 py-3 rounded-full transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                      )}
                      {currentStep === 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          Next: Extra Contributions <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {currentStep === 2 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-500/10 transition-colors"
                        >
                          Calculate Savings <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                {(currentStep === 3 || currentStep === 4) && (
                  <p className="text-[9.5px] text-slate-400 leading-relaxed pt-2.5 border-t border-slate-100 mt-2">
                    Disclaimer: This estimate is an illustration. Upfront parameters are projections. Lenders compound interest daily. Consult a broker before locking in offsets.
                  </p>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ROADMAP / GUIDE DOWNLOAD SECTION */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="space-y-6">
            <h2 
              className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
              style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
            >
              Master the property market
            </h2>
            
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed mb-8">
              Whether you're buying your first home, refinancing, or building a portfolio, our comprehensive guides break down every step into simple, actionable advice.
            </p>

            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 pointer-events-none`} />
              
              <h3 
                className="text-[22px] font-bold text-[#0B1F3A] mb-6 relative z-10"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                What you'll learn:
              </h3>
              
              <ul className="space-y-5 mb-8 relative z-10">
                {[
                  "How much deposit you actually need in 2024",
                  "Understanding government grants and schemes",
                  "The hidden costs of buying property",
                  "How to get pre-approval fast",
                  "Negotiation tips for first-timers"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-6 h-6 text-blue-600 shrink-0 mt-0.5`} />
                    <span className="text-[15px] sm:text-[16px] text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="/free-resources/first-home-buyers-step-by-step-guide" 
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-[15px] transition-all duration-300 shadow-lg shadow-blue-500/20 relative z-10`}
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF Guide Now
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-[650px]">
            <img
              src="/images/family_couch_laptop.png"
              alt="Family reading guide"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 to-transparent flex flex-col justify-end p-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                <p className="text-[18px] font-bold mb-2">100% Free Resource</p>
                <p className="text-white/80 text-[14px]">No email required. Instant access.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* FAQS / ACCORDION SECTION */}
      <section className="py-12 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-800 bg-teal-50 border border-teal-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Extra Repayments Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] to-teal-500">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
                  >
                    <span className="font-extrabold text-[#0B1F3A] text-[13.5px] sm:text-[14.5px] pr-4 font-montserrat">
                      {faq.q}
                    </span>
                    <span className={`text-slate-400 text-xs transition-transform duration-250 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4.5 pt-0.5 text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed border-t border-slate-100 font-semibold">
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

      {/* ENQUIRY FORM SECTION (Teal theme) */}
      <section id="enquiry-form" className="py-16 md:py-24 bg-gradient-to-br from-[#081324] via-[#0B1F3A] to-[#081324] text-white relative overflow-hidden">
        <div className="absolute right-[-10%] top-[20%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#38BDF8] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full w-fit block">
                Connect with an Expert
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black leading-tight font-montserrat">
                Ready to review your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">offset & redraw setups?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Our brokers compare offset policies across 30+ lenders to configure your home loan for maximum interest reduction.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 text-slate-800">
              {enquirySubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-[#0B1F3A]">Enquiry Submitted Successfully</h3>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                    Thank you. An expert broker from Mortgage Xperts will call you shortly to outline interest-saving redraw structures.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="enq-name" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Your Full Name*</label>
                    <input
                      type="text"
                      id="enq-name"
                      placeholder="Jane Doe"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="enq-email" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Email Address*</label>
                      <input
                        type="email"
                        id="enq-email"
                        placeholder="jane@example.com"
                        required
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="enq-phone" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Phone Number*</label>
                      <input
                        type="tel"
                        id="enq-phone"
                        placeholder="0400 000 000"
                        required
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enq-msg" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Your Message (Optional)</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your home loan targets..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
                  >
                    {enquirySubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection
        badgeText="Google Reviews"
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Happy Clients</span></>}
        backgroundClass="bg-white"
      />

      {/* FOOTER */}
      <SiteFooter settings={settings} />

      {/* PRINT-ONLY AREA */}
      <div id="printable-report-area" className="p-8 font-inter text-slate-800 bg-white hidden" style={{ width: "800px" }}>
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-teal-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Home Loan Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-teal-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              Extra Repayments Savings Audit
            </span>
            <p className="text-[10px] text-slate-400 font-bold">Generated: {new Date().toLocaleDateString("en-AU")}</p>
          </div>
        </div>

        {/* Client Profile */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-200/60">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Client Profile</h2>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block">Full Name</span>
              <span className="font-bold text-slate-800">{calcLeadName || "Valued Client"}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Email Address</span>
              <span className="font-bold text-slate-800">{calcLeadEmail || "Not Provided"}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Phone Number</span>
              <span className="font-bold text-slate-800">{calcLeadPhone || "Not Provided"}</span>
            </div>
          </div>
        </div>

        {/* Savings outcomes */}
        <div className="bg-teal-50 border border-teal-200 rounded-3xl p-8 text-center mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-teal-800">Compounding Interest Saved</span>
          <div className="text-3xl font-black mt-2 text-emerald-600">
            ${Math.round(results.totalInterestSaved).toLocaleString()} Saved
          </div>
          <p className="text-[11.5px] text-slate-500 mt-2 font-medium max-w-md mx-auto">
            Time Shaved Off Mortgage: <strong className="text-slate-700 font-black">{results.timeSaved.text}</strong>
          </p>
        </div>

        {/* Detailed parameters */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Repayments Analysis</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-600">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2.5 flex justify-between">
                  <td>Outstanding Loan Amount:</td>
                  <td className="text-[#0B1F3A] font-black">${loanAmount.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Remaining Term (Years):</td>
                  <td className="text-[#0B1F3A] font-black">{loanTerm} Years</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Interest Rate:</td>
                  <td className="text-[#0B1F3A] font-black">{interestRate}% p.a.</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Repayment Frequency:</td>
                  <td className="text-[#0B1F3A] font-black capitalize">{frequency}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Standard Repayment (PMT):</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.standardRepayment).toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Extra Payment Contribution:</td>
                  <td className="text-[#0B1F3A] font-black">${extraAmount.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Extra Start Delay:</td>
                  <td className="text-[#0B1F3A] font-black">{startAfter} Years</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>New Payoff Term:</td>
                  <td className="text-[#0B1F3A] font-black">{results.newLoanTerm.text}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Total Standard Interest Paid:</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.totalInterestPaidStd).toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Total Interest Paid with Extra:</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.totalInterestPaidExtra).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-200 pt-4 text-center text-[8.5px] text-slate-400 leading-normal font-semibold">
          Disclaimer: This extra repayments savings report is an illustration based on self-reported inputs and compounding formulas. It does not constitute a formal contract or bank credit policy. Exit costs, variable rates, inflation parameters, and specific lender rules will affect final outcomes. Mortgage Xperts offers free broker consultations to review offset suitability.
        </div>
      </div>
    </div>
  );
}
