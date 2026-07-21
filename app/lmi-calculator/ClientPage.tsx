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
  Percent,
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

export default function ClientPage({ settings = {}, pageHeroSettings, pageContent, pageSections }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string; pageSections?: string[] }) {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Step 1: Inputs
  const [propertyValue, setPropertyValue] = useState<number>(600000);
  const [loanAmount, setLoanAmount] = useState<number>(480000);

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
    if (!propertyValue || propertyValue <= 0) {
      return { lvr: 0, lmiPremium: 0, lmiStatus: "N/A", deposit: 0, isValid: false };
    }

    const lvr = (loanAmount / propertyValue) * 100;
    const deposit = Math.max(0, propertyValue - loanAmount);
    
    let lmiRate = 0;
    let lmiStatus = "No LMI required";

    if (lvr > 100) {
      return { lvr, lmiPremium: 0, lmiStatus: "LVR exceeds 100%", deposit, isValid: false };
    }

    if (lvr <= 80) {
      lmiRate = 0;
      lmiStatus = "No LMI required (LVR is 80% or less)";
    } else if (lvr <= 90) {
      lmiRate = 1.5;
      lmiStatus = "LMI likely required (LVR is 80.01% - 90%)";
    } else if (lvr <= 95) {
      lmiRate = 2.5;
      lmiStatus = "LMI likely required (LVR is 90.01% - 95%)";
    } else {
      lmiRate = 3.5;
      lmiStatus = "LMI likely required (LVR is 95.01% - 100%)";
    }

    const lmiPremium = loanAmount * (lmiRate / 100);

    return {
      lvr,
      lmiPremium,
      lmiStatus,
      deposit,
      isValid: true
    };
  }, [propertyValue, loanAmount]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "lmi-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `LMI Calculator submission. Property Value: $${propertyValue.toLocaleString()}, Loan Amount: $${loanAmount.toLocaleString()}, Calculated LVR: ${results.lvr.toFixed(2)}%, Estimated LMI: $${results.lmiPremium.toLocaleString()}, LMI Status: ${results.lmiStatus}, Deposit: $${results.deposit.toLocaleString()}`
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
        type: "lmi-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Avoiding or Minimising LMI"
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
        type: "lmi-callback",
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
      pdf.save(`Mortgage_LMI_Calculation_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Mortgage Cost Calculator",
    hero_title: "LMI Calculator",
    hero_subtext: "Lenders Mortgage Insurance protects the lender if you have less than a 20% deposit. Estimate your LMI premium, calculate your LVR, and see how you can avoid or minimize insurance costs.",
    hero_image: "/images/hero.png",
    hero_btn1_text: "Start Calculator",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to a Broker",
    hero_btn2_link: "#enquiry-form"
  };

  const faqs = [
    {
      q: "How much deposit do I need to buy my first home?",
      a: "Typically, you’ll need between 5% and 20% of the property’s purchase price as a deposit. Many lenders prefer a 20% deposit to avoid extra costs like Lenders Mortgage Insurance (LMI), but some government assistance programs allow you to buy with as little as 5%. These schemes are designed to help first-home buyers enter the property market sooner by reducing upfront costs."
    },
    {
      q: "What is Lenders Mortgage Insurance (LMI)?",
      a: "Lenders Mortgage Insurance (LMI) is a one-off insurance policy that protects the lender if you borrow more than 80% of the property’s value and then default on the loan. It doesn’t protect you, the borrower, but rather reduces the lender’s risk. LMI costs vary depending on the size of the loan and deposit. Some government programs can help eligible buyers avoid paying LMI, so it’s worth checking if you qualify."
    },
    {
      q: "What government assistance is available for first-home buyers?",
      a: "There are a range of grants, special schemes, and stamp duty concessions available depending on your state or territory. These programs can significantly reduce the upfront costs of buying a home. We can help you understand which assistance you might qualify for, guide you through the application process, and ensure you get the maximum benefit available to you."
    },
    {
      q: "Do I need pre-approval before buying?",
      a: "Pre-approval is highly recommended because it shows sellers you’re a serious buyer and helps you understand your borrowing capacity before you start shopping for a property. It speeds up the buying process once you find a home you want to purchase, as the lender has already assessed your financial situation."
    },
    {
      q: "Can I buy with a partner or family member?",
      a: "Yes, buying jointly with a partner or family member can increase your borrowing power and make it easier to afford a property. However, it’s important to have clear agreements about ownership shares, financial responsibilities, and what happens if one party wants to sell or leaves the arrangement. Consulting a legal professional before purchasing together is a good idea."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* Print Styling Injected Directly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white !important;
            color: #0F172A !important;
          }
          header, footer, nav, section:not(#calculator-tool), #calculator-tool > div > div:first-child, .no-print {
            display: none !important;
          }
          #calculator-tool {
            padding: 0 !important;
            background: white !important;
            border: none !important;
          }
          #printable-report-area {
            display: block !important;
            visibility: visible !important;
            width: 100%;
          }
          #printable-report-area * {
            visibility: visible !important;
          }
        }
        @media screen {
          #printable-report-area {
            display: none !important;
          }
        }
      `}} />

      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero pageTitle="Lenders Mortgage Insurance (LMI) Calculator" themeColor="violet" pageHeroSettings={pageHeroSettings || defaultHeroSettings} />

      {/* CALCULATOR TOOL SECTION (Redesigned with Content on Left, Compact Form on Right) */}
      <section id="calculator-tool" className="py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative border-b border-slate-100 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute right-[-10%] top-[10%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-[-5%] bottom-[15%] w-[350px] h-[350px] bg-violet-500/40 opacity-10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Rich Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print order-2 lg:order-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Determine LVR & Estimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Lenders Mortgage Insurance</span>
              </h2>
              <div className="w-12 h-[3px] bg-indigo-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                {pageSections?.[0] || pageContent || "Borrowing more than 80% of a property's value generally triggers Lenders Mortgage Insurance (LMI). Use our calculator to evaluate your ratios and projected premiums."}
              </p>
 
              <div className="space-y-4 pt-4">
                {/* Point 1 */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-indigo-50/50 to-violet-50/10 hover:from-indigo-50 hover:to-violet-50/30 border border-indigo-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200/40 shadow-sm">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Loan-to-Value Ratio (LVR)</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Calculate your exact LVR ratio to determine if LMI will be required by your mortgage lender.</p>
                  </div>
                </motion.div>
 
                {/* Point 2 */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-violet-50/50 to-fuchsia-50/10 hover:from-violet-50 hover:to-fuchsia-50/30 border border-violet-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-100/70 text-violet-600 flex items-center justify-center shrink-0 border border-violet-200/40 shadow-sm">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Estimated LMI Cost</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Estimate the upfront LMI premium cost based on standard Australian loan-size and LVR bands.</p>
                  </div>
                </motion.div>
 
                {/* Point 3 */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/10 hover:from-blue-50 hover:to-indigo-50/30 border border-blue-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/40 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Avoiding LMI Techniques</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Learn about LMI waivers for certain professionals, government guarantee schemes, and guarantor options.</p>
                  </div>
                </motion.div>
              </div>
            </div>
 
            {/* Right Column: Compact 3-Step Wizard Calculator */}
            <div className="lg:col-span-6 flex justify-end no-print order-1 lg:order-2">
              <div className="w-full max-w-[500px] bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col transition-all duration-300 relative overflow-hidden">
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-bl-full opacity-50 pointer-events-none" />
 
                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-500 ease-out" 
                    style={{ width: `${(currentStep / 2) * 100}%` }}
                  />
                </div>
 
                {/* Header Step indicators */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-black text-white transition-all ${currentStep >= 2 ? 'bg-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.3)]' : 'bg-indigo-600 shadow-[0_2px_8px_rgba(79,70,229,0.3)]'}`}>
                      {currentStep >= 2 ? "✓" : currentStep}
                    </span>
                    <h3 className="text-[13px] font-bold text-slate-700 font-montserrat">
                      {currentStep === 1 && "Step 1: Core Parameters"}
                      {currentStep >= 2 && "LMI Results"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{currentStep < 2 ? `Step ${currentStep} of 2` : "Results"}</span>
                </div>
 
                {/* Wizard Body content */}
                <div className="flex-1 flex flex-col">
                  
                  {/* Step 1: Core Parameters */}
                  {currentStep === 1 && (
                    <div className="space-y-4 py-2">
                      {/* Property Value */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="property-value">Property Value ($)</label>
                          <span className="text-indigo-600 font-black text-[13.5px]">${propertyValue.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="property-value"
                            value={propertyValue}
                            onChange={(e) => setPropertyValue(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                          />
                        </div>
                      </div>
 
                      {/* Loan Amount */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="loan-amount">Loan Amount ($)</label>
                          <span className="text-indigo-600 font-black text-[13.5px]">${loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="loan-amount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                          />
                        </div>
                      </div>
 
                      {/* Error or validation message if loan > property */}
                      {loanAmount > propertyValue && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-2 items-start">
                          <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-red-700 leading-relaxed font-semibold">
                            Loan amount cannot exceed the property value (LVR must be less than or equal to 100%).
                          </p>
                        </div>
                      )}
                    </div>
                  )}
 
                  {/* Step 2: LMI Results */}
                  {currentStep >= 2 && (
                    <div className="space-y-4 py-1">
                      <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-4 text-center space-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Estimated LMI Cost</span>
                        <div className="text-3xl font-black text-indigo-900 font-montserrat">
                          ${results.lmiPremium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 block">
                          LVR: {results.lvr.toFixed(2)}% | Deposit: ${results.deposit.toLocaleString()}
                        </span>
                      </div>
 
                      {/* Breakdown List */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-500">Property Value</span>
                          <span className="font-extrabold text-[#0B1F3A]">${propertyValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-500">Loan Amount</span>
                          <span className="font-extrabold text-[#0B1F3A]">${loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-500">Estimated LVR</span>
                          <span className={`font-extrabold ${results.lvr > 80 ? 'text-amber-600' : 'text-emerald-600'}`}>{results.lvr.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-500">LMI Status</span>
                          <span className={`font-extrabold text-[11px] ${results.lvr > 80 ? 'text-amber-600' : 'text-emerald-600'}`}>{results.lmiStatus}</span>
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
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="email"
                                required
                                placeholder="Email"
                                value={calcLeadEmail}
                                onChange={(e) => setCalcLeadEmail(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                              />
                              <input
                                type="tel"
                                required
                                placeholder="Phone"
                                value={calcLeadPhone}
                                onChange={(e) => setCalcLeadPhone(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={calcLeadSubmitting}
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[12px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/10 transition-colors"
                            >
                              {calcLeadSubmitting ? "Generating..." : "Download Full Report"} <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        </div>
                      )}

                      {/* After form submission options */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
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
                          className="border border-indigo-600 text-indigo-700 bg-white hover:bg-indigo-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                        >
                          Start Over
                        </button>
                      </div>
                    </div>
                  )}
 
                </div>
                {/* Footer buttons for steps navigation */}
                {currentStep < 2 && (
                  <div className="space-y-3 pt-4 border-t border-slate-100 mt-4">
                    <div className="flex gap-3">
                      {currentStep === 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentStep(2);
                          }}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/15 transition-colors"
                        >
                          Calculate LMI <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINTABLE PDF REPORT CONTAINER */}
      <div id="printable-report-area" className="hidden p-8 bg-white border border-slate-200 max-w-[800px] space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-indigo-600 pb-4">
          <div>
            <h1 className="text-xl font-black text-indigo-900 font-montserrat">MORTGAGE CALCULATOR REPORT</h1>
            <p className="text-[11px] text-slate-500">Premium Calculations & LMI Insights</p>
          </div>
          <div className="text-right">
            <h2 className="text-md font-black text-slate-800">Mortgage Xperts</h2>
            <p className="text-[10px] text-slate-500">Nepali Mortgage Broker Australia</p>
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-slate-50 p-4 rounded-xl grid grid-cols-2 gap-4 text-xs">
          <div>
            <h3 className="font-extrabold text-[#0B1F3A] mb-1">Prepared For:</h3>
            <p className="text-slate-550"><span className="font-bold">Name:</span> {calcLeadName || "Valued Client"}</p>
            <p className="text-slate-550"><span className="font-bold">Email:</span> {calcLeadEmail || "N/A"}</p>
            <p className="text-slate-550"><span className="font-bold">Phone:</span> {calcLeadPhone || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-extrabold text-[#0B1F3A] mb-1">Calculation Details:</h3>
            <p className="text-slate-550"><span className="font-bold">Date:</span> {new Date().toLocaleDateString("en-AU")}</p>
            <p className="text-slate-550">{pageSections?.[1] || `<span className="font-bold">Type:</span> Lenders Mortgage Insurance (LMI) Assessment`}</p>
          </div>
        </div>

        {/* Core Calculation Parameters */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-indigo-900 border-b border-slate-200 pb-1 font-montserrat">Calculator Input Parameters</h3>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100/80 text-[#0B1F3A] font-extrabold">
                <th className="p-2 rounded-l-lg">Parameter</th>
                <th className="p-2 text-right rounded-r-lg">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-2 font-bold text-slate-600">Property Value</td>
                <td className="p-2 text-right font-extrabold text-slate-800">${propertyValue.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-2 font-bold text-slate-600">Loan Amount</td>
                <td className="p-2 text-right font-extrabold text-slate-800">${loanAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calculations Results */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-indigo-900 border-b border-slate-200 pb-1 font-montserrat">Estimated LMI Cost Breakdown</h3>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100/80 text-[#0B1F3A] font-extrabold">
                <th className="p-2 rounded-l-lg">Metric</th>
                <th className="p-2 text-right rounded-r-lg">Calculated Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-2 font-bold text-slate-600">Estimated Loan to Value Ratio (LVR)</td>
                <td className="p-2 text-right font-extrabold text-indigo-600">{results.lvr.toFixed(2)}%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-2 font-bold text-slate-600">Estimated Deposit Contribution</td>
                <td className="p-2 text-right font-extrabold text-slate-800">${results.deposit.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-2 font-bold text-indigo-955 bg-indigo-50/20">Estimated Lenders Mortgage Insurance (LMI) Cost</td>
                <td className="p-2 text-right font-black text-indigo-600 bg-indigo-50/20">${results.lmiPremium.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-2 font-bold text-slate-600">LMI Status</td>
                <td className="p-2 text-right font-extrabold text-slate-800">{results.lmiStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Guidance disclaimer note */}
        <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-150">
          <h4 className="text-[11px] font-black text-[#0B1F3A] uppercase font-montserrat">Next Steps & Professional Guidance</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            This estimation is based on a simplified formula matching typical Australian LMI rates. Actual LMI premiums vary between insurers (Helia, QBE) and specific bank policies. To explore exact premium waivers (e.g. for Doctors, Accountants, or Nepali Australian buyers), or to structure your application using a guarantor to avoid LMI entirely, schedule a free callback with our mortgage brokers.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-4 text-center">
          <p className="text-[10px] text-slate-400 font-semibold">Nepal/Australia Mortgage Specialist | Web: www.mortgagexperts.com.au</p>
        </div>
      </div>

      {/* GUIDE DOWNLOAD CARD */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <RoadmapGuideCard />
        </div>
      </section>
      
      {/* FAQS / ACCORDION SECTION */}
      <section className="py-12 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left FAQ Intro */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                FAQ Helpdesk
              </span>
              <h2 className="text-[#0B1F3A] text-[24px] sm:text-[30px] font-black leading-tight mt-3 mb-2 font-montserrat">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Questions</span>
              </h2>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Here are the answers to the most common queries regarding deposit guidelines, Lenders Mortgage Insurance, and co-borrowing in Australia.
              </p>
            </div>

            {/* Right FAQ Accordion */}
            <div className="lg:col-span-8 space-y-3.5">
              {faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div 
                    key={i}
                    className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full flex justify-between items-center px-5 py-4 text-left font-extrabold text-[13.5px] text-[#0B1F3A] hover:bg-slate-50/50 cursor-pointer font-montserrat"
                    >
                      <span>{faq.q}</span>
                      <span className={`text-[18px] font-bold transition-transform duration-200 ${isOpen ? 'rotate-45 text-indigo-600' : 'text-slate-400'}`}>+</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                        >
                          <div className="px-5 pb-5 pt-1 text-[13px] text-slate-500 leading-relaxed font-medium">
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
        </div>
      </section>

      {/* CALL BACK ENQUIRY FORM */}
      <section id="enquiry-form" className="py-12 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Get In Touch
              </span>
              <h2 className="text-[#0B1F3A] text-[24px] sm:text-[30px] font-black leading-tight font-montserrat">
                Ready to take the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">next step?</span>
              </h2>
              <p className="text-slate-500 text-[13px] sm:text-[13.5px] leading-relaxed">
                Connect with our expert team today to explore your borrowing power, look at personalized interest rates, and secure formal loan approvals.
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-700">Authorised Credit Representative in Australia</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-700">Nepali Mortgage Broker Specialists</span>
                </div>
              </div>
            </div>

            {/* Enquiry Form Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 text-slate-800">
              {!enquirySubmitted ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <h3 className="text-md font-black text-[#0B1F3A] font-montserrat">Request Callback Consultation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Enquiry message (optional)</label>
                    <textarea
                      rows={3}
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      placeholder="Tell us about your property goals..."
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                    By clicking &lsquo;Submit Enquiry&rsquo;, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert&rsquo;s brokers.
                  </p>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white font-extrabold text-[13.5px] py-3.5 transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
                  >
                    {enquirySubmitting ? "Submitting..." : "Submit Enquiry"}
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-[#0B1F3A] text-[18px] font-black font-montserrat">Enquiry Submitted!</h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed max-w-sm mx-auto">
                    Thank you. We have received your query and a specialist broker will contact you shortly.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER SECTION */}
      <TestimonialSection
        badgeText="Google Reviews"
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Happy Clients</span></>}
        backgroundClass="bg-slate-50 border-y border-slate-100"
      />

      {/* FOOTER */}
      <SiteFooter settings={settings} />
    </div>
  );
}
