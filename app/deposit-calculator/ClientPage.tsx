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

export default function ClientPage({ settings = {}, pageHeroSettings }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings }) {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Step 1: Savings details
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [regularContribution, setRegularContribution] = useState<number>(100);
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");

  // Step 2: Rate & Term details
  const [interestRate, setInterestRate] = useState<number>(5.0);
  const [savingsTerm, setSavingsTerm] = useState<number>(10);

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
    // Frequency conversion
    let periodsPerYear = 12;
    if (contributionFrequency === "weekly") periodsPerYear = 52;
    else if (contributionFrequency === "fortnightly") periodsPerYear = 26;
    else if (contributionFrequency === "annually") periodsPerYear = 1;

    const ratePerPeriod = (interestRate / 100) / periodsPerYear;
    const totalPeriods = savingsTerm * periodsPerYear;

    let totalValue = initialDeposit;
    let totalContributions = initialDeposit;

    if (totalPeriods > 0) {
      if (ratePerPeriod === 0) {
        totalValue = initialDeposit + (regularContribution * totalPeriods);
      } else {
        const initialPart = initialDeposit * Math.pow(1 + ratePerPeriod, totalPeriods);
        const regularPart = regularContribution * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
        totalValue = initialPart + regularPart;
      }
      totalContributions = initialDeposit + (regularContribution * totalPeriods);
    }

    const totalInterest = Math.max(0, totalValue - totalContributions);

    // Calculate year-by-year projections for the chart/table
    const projections = [];
    for (let yr = 1; yr <= savingsTerm; yr++) {
      const periods = yr * periodsPerYear;
      let yrValue = initialDeposit;
      if (ratePerPeriod === 0) {
        yrValue = initialDeposit + (regularContribution * periods);
      } else {
        const initialPart = initialDeposit * Math.pow(1 + ratePerPeriod, periods);
        const regularPart = regularContribution * ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod);
        yrValue = initialPart + regularPart;
      }
      const yrContributions = initialDeposit + (regularContribution * periods);
      const yrInterest = Math.max(0, yrValue - yrContributions);

      projections.push({
        year: yr,
        contributions: Math.round(yrContributions),
        interest: Math.round(yrInterest),
        total: Math.round(yrValue)
      });
    }

    return {
      totalValue,
      totalContributions,
      totalInterest,
      projections
    };
  }, [initialDeposit, regularContribution, contributionFrequency, interestRate, savingsTerm]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "deposit-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Deposit Calculator submission. Initial Deposit: $${initialDeposit}, Regular Contribution: $${regularContribution} (${contributionFrequency}), Interest Rate: ${interestRate}%, Term: ${savingsTerm} years, Projected Savings: $${results.totalValue.toFixed(2)}, Contributions: $${results.totalContributions.toFixed(2)}, Interest: $${results.totalInterest.toFixed(2)}`
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
      setCurrentStep(4);
    }
  };

  // Guide request handler
  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideName || !guideEmail || !guidePhone) return;

    setGuideSubmitting(true);
    try {
      const payload = {
        type: "deposit-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Saving for Your Home Deposit"
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
        type: "deposit-callback",
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
      pdf.save(`Mortgage_Deposit_Savings_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Savings Goal Planner",
    hero_title: "Deposit Calculator",
    hero_subtext: "Track your deposit growth timeline, compound interest earnings, and total savings. Plan your home buying journey with premium mortgage insights.",
    hero_image: "/images/hero.png",
    hero_btn1_text: "Start Calculator",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to a Broker",
    hero_btn2_link: "#enquiry-form"
  };

  const faqs = [
    {
      q: "How much deposit do I need to buy a home in Australia?",
      a: "Generally, you need between 5% and 20% of the property purchase price. A 20% deposit is ideal as it allows you to avoid paying Lenders Mortgage Insurance (LMI). However, many lenders accept a 5% deposit for first home buyers, especially under schemes like the Home Guarantee Scheme."
    },
    {
      q: "What is Lenders Mortgage Insurance (LMI) and how can I avoid it?",
      a: "Lenders Mortgage Insurance (LMI) is a fee charged by banks if your deposit is less than 20% of the property value. It protects the lender in case you default on the loan. You can avoid LMI by saving a 20% deposit, securing a family guarantor, or qualifying for government grants/guarantee programs."
    },
    {
      q: "Can I use a gift from parents as part of my deposit?",
      a: "Yes, most Australian lenders allow gifted deposits from immediate family members. However, the bank will require a signed Gift Letter or Statutory Declaration confirming that the money is a non-repayable gift. Lenders also like to see some 'genuine savings' saved progressively over 3 months."
    },
    {
      q: "What is the difference between genuine savings and non-genuine savings?",
      a: "Genuine savings are funds that you have saved progressively in a bank account for at least 3 months, or held in shares/super. Non-genuine savings are one-off lump sums such as tax refunds, inheritances, gifts, or sale of assets. Many banks require at least 5% of the property value to come from genuine savings."
    },
    {
      q: "How does the First Home Super Saver (FHSS) scheme work?",
      a: "The FHSS scheme allows first home buyers to make voluntary super contributions (both concessional and non-concessional) up to $15,000 per financial year (up to a lifetime total of $50,000) and then withdraw those funds plus associated earnings to pay for their first home deposit, benefiting from lower super tax rates."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero
        pageTitle="Deposit Calculator"
        themeColor="green"
        pageHeroSettings={pageHeroSettings || defaultHeroSettings}
      />

      {/* CALCULATOR TOOL SECTION (Redesigned with Content on Left, Compact Form on Right) */}
      <section id="calculator-tool" className="py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Plan Your Savings & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Reach Your Deposit Target Faster</span>
              </h2>
              <div className="w-12 h-[3px] bg-emerald-600 rounded-full" />
              <p className="text-slate-550 text-[14.2px] leading-relaxed max-w-xl font-medium">
                Calculate how compound interest and regular savings grow your home deposit over time. Build a realistic plan to unlock home ownership and compare savings frequencies.
              </p>

              <div className="space-y-4 pt-4">
                {/* Point 1 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-emerald-50/50 to-teal-50/10 hover:from-emerald-50 hover:to-teal-50/30 border border-emerald-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/40 shadow-sm">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Lump Sum Growth</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">See how your starting savings base compounds with interest earnings over your target timeframe.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Regular Contribution Power</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Add weekly, fortnightly, or monthly savings plans and analyze their cumulative impact.</p>
                  </div>
                </motion.div>

                {/* Point 3 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-[#FAF5FF] to-purple-50/10 hover:from-[#F3E8FF] hover:to-purple-50/30 border border-purple-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/40 shadow-sm">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Deposit Milestones</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Identify when you will reach the 5%, 10%, and 20% thresholds for your desired property values.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form */}
            <div className="lg:col-span-6 flex justify-end no-print">
              <div className="w-full max-w-[500px] bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col transition-all duration-300 relative overflow-hidden">
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full opacity-50 pointer-events-none" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-emerald-600 transition-all duration-500" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>

                {/* STEP 1: Savings Inputs */}
                {currentStep === 1 && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-700">
                        <label htmlFor="initial-deposit">Initial Deposit Amount ($)</label>
                        <span className="text-emerald-700 font-black text-[13.5px]">${initialDeposit.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="initial-deposit"
                          value={initialDeposit}
                          onChange={(e) => setInitialDeposit(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-700">
                        <label htmlFor="regular-contribution">Regular Savings Amount ($)</label>
                        <span className="text-emerald-700 font-black text-[13.5px]">${regularContribution.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="regular-contribution"
                          value={regularContribution}
                          onChange={(e) => setRegularContribution(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="frequency" className="text-[11.5px] font-bold text-slate-700">Savings Frequency</label>
                      <select
                        id="frequency"
                        value={contributionFrequency}
                        onChange={(e) => setContributionFrequency(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all appearance-none cursor-pointer"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="fortnightly">Fortnightly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 2: Rate & Term */}
                {currentStep === 2 && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-700">
                        <label htmlFor="interest-rate">Annual Interest Rate (%)</label>
                        <span className="text-emerald-700 font-black text-[13.5px]">{interestRate.toFixed(2)}%</span>
                      </div>
                      <div className="relative">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">%</div>
                        <input
                          type="number"
                          id="interest-rate"
                          step="0.01"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-4 pr-8 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-700">
                        <label htmlFor="savings-term">Savings Term (Years)</label>
                        <span className="text-emerald-700 font-black text-[13.5px]">{savingsTerm} Years</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          id="savings-term"
                          value={savingsTerm}
                          onChange={(e) => setSavingsTerm(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Results Display (Optional Lead form merged at bottom) */}
                {currentStep >= 3 && (
                  <div className="space-y-4 py-2">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Projected Deposit Savings</span>
                      <div className="text-2.5xl sm:text-3xl font-black mt-1 text-emerald-600">
                        ${Math.round(results.totalValue).toLocaleString()}
                      </div>
                      <p className="text-[10.5px] text-slate-400 mt-1 font-bold">At the end of {savingsTerm} years</p>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Growth Breakdown</h4>
                      <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between py-1 border-b border-slate-100 text-xs font-semibold text-slate-600">
                          <span>Total Contributions:</span>
                          <span className="text-[#0B1F3A] font-black">${Math.round(results.totalContributions).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 text-xs font-semibold text-slate-600">
                          <span>Total Interest Earned:</span>
                          <span className="text-[#0B1F3A] font-black text-emerald-600">${Math.round(results.totalInterest).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Yearly Projection Mini-Table */}
                    <div className="space-y-1 max-h-[100px] overflow-y-auto border border-slate-200 rounded-lg p-2 text-[11px] text-slate-500 bg-white">
                      <div className="grid grid-cols-3 font-bold border-b border-slate-100 pb-1">
                        <span>Year</span>
                        <span>Contributions</span>
                        <span className="text-right">Balance</span>
                      </div>
                      {results.projections.map((yr) => (
                        <div key={yr.year} className="grid grid-cols-3 py-0.5 border-b border-slate-50">
                          <span>Year {yr.year}</span>
                          <span>${yr.contributions.toLocaleString()}</span>
                          <span className="text-right font-black text-[#0B1F3A]">${yr.total.toLocaleString()}</span>
                        </div>
                      ))}
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
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="email"
                              required
                              placeholder="Email"
                              value={calcLeadEmail}
                              onChange={(e) => setCalcLeadEmail(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Phone"
                              value={calcLeadPhone}
                              onChange={(e) => setCalcLeadPhone(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={calcLeadSubmitting}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[12px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10 transition-colors"
                          >
                            {calcLeadSubmitting ? "Generating..." : "Download Full Report"} <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    )}

                    {/* After form submission options */}
                    {currentStep === 4 && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
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
                          className="border border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                        >
                          Start Over
                        </button>
                      </div>
                    )}
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
 
                    {currentStep === 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10 transition-colors ml-auto"
                      >
                        Next Step <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {currentStep === 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep(3);
                        }}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10 transition-colors ml-auto"
                      >
                        Calculate Savings <ArrowRight className="w-4 h-4" />
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
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Guide Download
              </span>
              <h2 className="text-white text-[24px] sm:text-[30px] font-black leading-tight font-montserrat">
                Learn how to save for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">home loan deposit faster</span>
              </h2>
              <p className="text-slate-350 text-[13.5px] leading-relaxed">
                Unlock proven strategies to accelerate your deposit savings plan, take advantage of first home buyer schemes, and structure your funds to qualify for bank approval.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-355">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>FHSS (First Home Super Saver) scheme details</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-355">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>How banks define and verify genuine savings</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs font-semibold text-slate-355">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>Minimizing deposit requirements through Guarantors</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[28px] p-6.5 shadow-xl border border-slate-100 max-w-md lg:ml-auto w-full text-slate-800">
              {guideSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-md font-bold font-montserrat text-[#0B1F3A]">Thank you!</h3>
                  <p className="text-xs text-slate-505 leading-relaxed">Your guide has been sent to your email. One of our home loan specialists will follow up with you shortly.</p>
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
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white text-slate-800 placeholder-slate-400 transition-all shadow-inner"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={guideEmail}
                      onChange={(e) => setGuideEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white text-slate-800 placeholder-slate-400 transition-all shadow-inner"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={guidePhone}
                      onChange={(e) => setGuidePhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white text-slate-800 placeholder-slate-400 transition-all shadow-inner"
                    />
                  </div>
                  <p className="text-[9.5px] text-slate-400 leading-relaxed">
                    By clicking ‘Get the guide’, you acknowledge our <Link href="/privacy-collection-notice" className="text-emerald-500 underline hover:text-emerald-400">Privacy Collection Notice</Link> and consent to being contacted by a Mortgage Xperts broker.
                  </p>
                  <button
                    type="submit"
                    disabled={guideSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer mt-2"
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
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Questions</span>
            </h2>
            <p className="text-slate-550 text-[12.5px] font-medium mt-2">
              Everything you need to know about house deposits and home loan requirements in Australia.
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
                  <HelpCircle className={`w-4 h-4 shrink-0 transition-transform ${openFaqIndex === idx ? "rotate-180 text-emerald-600" : "text-slate-400"}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[12.5px] sm:text-[13px] text-slate-550 leading-relaxed border-t border-slate-100/80">
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
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Happy Clients</span></>}
        backgroundClass="bg-white"
      />

      {/* ENQUIRY CALLBACK FORM */}
      <section id="enquiry-form" className="py-16 lg:py-24 bg-[#0B1F3A] text-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-450 bg-[#10B981]/10 border border-[#10B981]/25 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Callback Service
              </span>
              <h2 className="text-white text-[28px] sm:text-[38px] lg:text-[45px] font-black leading-tight font-montserrat">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Secure Your Home Loan?</span>
              </h2>
              <div className="w-12 h-[3px] bg-emerald-500 rounded-full" />
              <p className="text-slate-300 text-[14.2px] leading-relaxed max-w-xl">
                Saving a deposit is only the first step. Let our expert mortgage brokers find government grants, first home schemes, and competitive interest rates tailored to your financial situation.
              </p>
              
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
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
                    Thank you. We have received your savings enquiry and will contact you within one business hour.
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
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="enq-msg" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Message / Scenario Details</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your home deposit goal..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
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
        <div className="flex justify-between items-center border-b-2 border-emerald-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Home Loan Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              Deposit Savings Report
            </span>
            <p className="text-[10px] text-slate-400 font-bold">Generated on {new Date().toLocaleDateString("en-AU")}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 text-center">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Projected Total Savings</h2>
            <div className="text-4xl font-black text-emerald-600 mt-1">
              ${Math.round(results.totalValue).toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-1">Target Savings Period: {savingsTerm} Years</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Savings Parameters</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-600">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>Initial Deposit:</td>
                  <td className="text-[#0B1F3A]">${initialDeposit.toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Regular Contribution:</td>
                  <td className="text-[#0B1F3A]">${regularContribution.toLocaleString()} ({contributionFrequency})</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Annual Interest Rate:</td>
                  <td className="text-[#0B1F3A]">{interestRate.toFixed(2)}%</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Savings Term:</td>
                  <td className="text-[#0B1F3A]">{savingsTerm} Years</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Growth Breakdown</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-600">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>Total Cash Contributions:</td>
                  <td className="text-[#0B1F3A]">${Math.round(results.totalContributions).toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Total Interest Earned:</td>
                  <td className="text-[#0B1F3A] text-emerald-600">${Math.round(results.totalInterest).toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Ending Value:</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.totalValue).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 text-[10px] text-slate-500 leading-relaxed">
          <p className="font-bold mb-1 uppercase tracking-wider text-[#0B1F3A]">Disclaimer &amp; Important Notice:</p>
          This report is a hypothetical estimation based on compound interest formula assumptions and regular contributions. Real-world savings accounts may fluctuate in interest rate percentages and fee structures. Mortgage borrowing criteria varies; speak with Mortgage Xperts for official pre-approval assessments.
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter settings={settings} />
    </div>
  );
}
