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
  TrendingDown,
  Percent
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
  // Wizard Steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Step 1: Current Loan Details
  const [currentLoanBalance, setCurrentLoanBalance] = useState<number>(400000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(6.0);
  const [currentLoanTerm, setCurrentLoanTerm] = useState<number>(25);

  // Step 2: New Loan & Refinancing Costs
  const [newInterestRate, setNewInterestRate] = useState<number>(5.5);
  const [newLoanTerm, setNewLoanTerm] = useState<number>(25);
  const [refinancingCosts, setRefinancingCosts] = useState<number>(1500);

  // Step 3: Lead Capture Form
  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcLeadSubmitting, setCalcLeadSubmitting] = useState(false);

  // Guide request states
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

  // Repayment calculator PMT logic
  const calculatePMT = (principal: number, annualRate: number, termYears: number): number => {
    const monthlyRate = annualRate / 12 / 100;
    const totalPayments = termYears * 12;

    if (totalPayments <= 0) return 0;
    if (monthlyRate === 0) return principal / totalPayments;

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  };

  // Calculations Engine
  const results = useMemo(() => {
    const currentPMT = calculatePMT(currentLoanBalance, currentInterestRate, currentLoanTerm);
    const newPMT = calculatePMT(currentLoanBalance, newInterestRate, newLoanTerm);
    const monthlySavings = currentPMT - newPMT;

    // Break-even period (months)
    let breakEvenMonths = 0;
    let breakEvenText = "";
    let breakEvenStatus: "immediate" | "never" | "calculated" = "calculated";

    if (monthlySavings > 0) {
      breakEvenMonths = refinancingCosts / monthlySavings;
      breakEvenText = `${Math.round(breakEvenMonths)} Months`;
      breakEvenStatus = "calculated";
    } else if (refinancingCosts > 0) {
      breakEvenMonths = Infinity;
      breakEvenText = "Never (No Savings)";
      breakEvenStatus = "never";
    } else {
      breakEvenMonths = 0;
      breakEvenText = "Immediate (No Costs)";
      breakEvenStatus = "immediate";
    }

    // Total Interest Saved over the new loan term
    const totalInterestSaved = monthlySavings * newLoanTerm * 12;

    return {
      currentPMT,
      newPMT,
      monthlySavings,
      breakEvenMonths,
      breakEvenText,
      breakEvenStatus,
      totalInterestSaved: Math.max(0, totalInterestSaved)
    };
  }, [
    currentLoanBalance,
    currentInterestRate,
    currentLoanTerm,
    newInterestRate,
    newLoanTerm,
    refinancingCosts
  ]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "refinance-feasibility-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Refinancing Feasibility Calculator submission. Balance: $${currentLoanBalance}, Current Rate: ${currentInterestRate}%, Current Term: ${currentLoanTerm}y, New Rate: ${newInterestRate}%, New Term: ${newLoanTerm}y, Fees: $${refinancingCosts}, Monthly Savings: $${results.monthlySavings.toFixed(2)}, Break-even: ${results.breakEvenText}, Total Savings: $${results.totalInterestSaved.toFixed(2)}`
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

  // Guide download handler
  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideName || !guideEmail || !guidePhone) return;

    setGuideSubmitting(true);
    try {
      const payload = {
        type: "refinance-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Refinancing Feasibility Guide"
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

  // General Enquiry handler
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail || !enquiryPhone) return;

    setEnquirySubmitting(true);
    try {
      const payload = {
        type: "refinance-callback",
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

  // PDF report downloader
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
      pdf.save(`Mortgage_Refinance_Feasibility_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Mortgage Refinancing Audit",
    hero_title: "Refinancing Feasibility Calculator",
    hero_subtext: "Determine if switching home loans makes financial sense. Compare interest rates, calculate upfront exit/setup costs, and evaluate your break-even period.",
    hero_image: "/images/Refinancing.png",
    hero_btn1_text: "Test Feasibility",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to a Refinance Expert",
    hero_btn2_link: "#enquiry-form"
  };

  const faqs = [
    {
      q: "How does refinancing save me money?",
      a: "Refinancing saves money by securing a lower interest rate, which reduces either your monthly repayment or the total interest paid over the life of the loan. It can also help you switch from a variable to a fixed rate for stability, or merge multiple debts to lower total monthly repayments."
    },
    {
      q: "What upfront fees should I expect when refinancing?",
      a: "Common refinancing fees include exit/discharge fees from your current bank (usually $350), new bank application fees ($0-$600), property valuation fees ($0-$300), and state government mortgage registration/discharge registration fees (about $350 total). We often negotiate to waive the new bank fees or find cashback deals that cover them."
    },
    {
      q: "What is a break-even period in refinancing?",
      a: "The break-even period is the number of months it takes for your monthly interest savings to pay back the upfront costs of refinancing. For example, if refinancing costs $1,500 and you save $150 per month, your break-even period is 10 months. Any savings after 10 months represent pure profit."
    },
    {
      q: "Can I refinance if my property value has dropped?",
      a: "Yes, but if your remaining loan balance is more than 80% of the new property valuation, you may need to pay Lenders Mortgage Insurance (LMI). If the property has negative equity (loan balance is greater than the property value), refinancing can be very difficult. Our brokers can evaluate your options."
    },
    {
      q: "How often can or should I refinance?",
      a: "There is no legal limit to how often you can refinance, but doing so too frequently (e.g. every year) can hurt your credit score and incur unnecessary fees. It is generally recommended to review your home loan rate every 2 years or when the cash rate changes significantly."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero pageTitle="Refinancing Feasibility Calculator" themeColor="violet" pageHeroSettings={pageHeroSettings || defaultHeroSettings} />

      {/* CALCULATOR TOOL SECTION (Structured like Loan Repayment, Styled in Violet) */}
      <section id="calculator-tool" className="py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative border-b border-slate-100 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute right-[-10%] top-[10%] w-[450px] h-[450px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-[-5%] bottom-[15%] w-[350px] h-[350px] bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Rich Mortgage Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print">
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-800 bg-violet-50 border border-violet-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Compare Rates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Find Your Refinancing Savings</span>
              </h2>
              <div className="w-12 h-[3px] bg-violet-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                Refinancing should save you more than it costs. Our calculator compares your current mortgage repayments with a lower interest rate, subtracting upfront setup costs to define your break-even period.
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Repayment Savings</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Computes your direct drop in monthly repayment amount and interest portions.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Break-Even Period</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Identifies exactly how many months it will take for your monthly savings to offset refinancing costs.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Net Interest Savings</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Projects long-term compounding interest savings over the entire duration of the new loan.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form (Structured like Repayment / Borrowing) */}
            <div className="lg:col-span-6 flex justify-end no-print">
              <div className="w-full max-w-[500px] bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col transition-all duration-300 relative overflow-hidden">
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-bl-full opacity-50 pointer-events-none" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500 ease-out" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>

                {/* Header Step indicators */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-black text-white bg-violet-600">
                      {currentStep >= 3 ? "✓" : currentStep}
                    </span>
                    <h3 className="text-[13px] font-bold text-slate-700 font-montserrat">
                      {currentStep === 1 && "Step 1: Current Loan"}
                      {currentStep === 2 && "Step 2: New Loan Details"}
                      {currentStep >= 3 && "Feasibility Summary"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {currentStep < 3 ? `Step ${currentStep} of 2` : "Results"}
                  </span>
                </div>

                {/* Wizard Body content */}
                <div className="flex-1 flex flex-col">
                  
                  {/* Step 1: Current Loan Details */}
                  {currentStep === 1 && (
                    <div className="space-y-4 py-2">
                      {/* Current Loan Balance */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="loan-balance">Current Loan Balance ($)</label>
                          <span className="text-violet-600 font-black text-[13.5px]">${currentLoanBalance.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="loan-balance"
                            required
                            value={currentLoanBalance}
                            onChange={(e) => setCurrentLoanBalance(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all"
                          />
                        </div>
                      </div>

                      {/* Current Interest Rate */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="current-rate">Current Interest Rate (% p.a.)</label>
                          <span className="text-violet-600 font-black text-[13.5px]">{currentInterestRate}%</span>
                        </div>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">%</div>
                          <input
                            type="number"
                            id="current-rate"
                            step="0.01"
                            required
                            value={currentInterestRate}
                            onChange={(e) => setCurrentInterestRate(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-4 pr-8 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all"
                          />
                        </div>
                      </div>

                      {/* Remaining Loan Term */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="current-term">Remaining Loan Term (Years)</label>
                          <span className="text-violet-600 font-black text-[13.5px]">{currentLoanTerm} Years</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            id="current-term"
                            required
                            value={currentLoanTerm}
                            onChange={(e) => setCurrentLoanTerm(Math.max(1, Math.min(45, Number(e.target.value))))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: New Loan Details */}
                  {currentStep === 2 && (
                    <div className="space-y-4 py-2">
                      {/* New Interest Rate */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="new-rate">New Interest Rate (% p.a.)</label>
                          <span className="text-violet-600 font-black text-[13.5px]">{newInterestRate}%</span>
                        </div>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">%</div>
                          <input
                            type="number"
                            id="new-rate"
                            step="0.01"
                            required
                            value={newInterestRate}
                            onChange={(e) => setNewInterestRate(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-4 pr-8 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all"
                          />
                        </div>
                      </div>

                      {/* New Loan Term */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="new-term">New Loan Term (Years)</label>
                          <span className="text-violet-600 font-black text-[13.5px]">{newLoanTerm} Years</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            id="new-term"
                            required
                            value={newLoanTerm}
                            onChange={(e) => setNewLoanTerm(Math.max(1, Math.min(45, Number(e.target.value))))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all"
                          />
                        </div>
                      </div>

                      {/* Refinancing Costs */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="refinance-cost">Estimated Refinancing Costs ($)</label>
                          <span className="text-violet-600 font-black text-[13.5px]">${refinancingCosts.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="refinance-cost"
                            required
                            value={refinancingCosts}
                            onChange={(e) => setRefinancingCosts(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Calculations Summary Display + Optional Lead */}
                  {currentStep >= 3 && (
                    <div className="space-y-4 py-2">
                      <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-violet-800">Calculated Net Outcomes</span>
                        <div className={`text-2.5xl sm:text-3xl font-black mt-1 ${results.monthlySavings > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {results.monthlySavings > 0 ? `+$${Math.round(results.monthlySavings).toLocaleString()}/mo` : `$${Math.round(results.monthlySavings).toLocaleString()}/mo`}
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-relaxed">
                          Break-even Period: <strong className="text-slate-700 font-extrabold">{results.breakEvenText}</strong>
                        </p>
                      </div>

                      {/* Repayment visual comparison bars */}
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monthly Repayment Comparison</h4>
                        <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {/* Current Repayment */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-bold text-slate-600">
                              <span>Current Repayment ({currentInterestRate}%)</span>
                              <span className="font-black">${Math.round(results.currentPMT).toLocaleString()}/mo</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-slate-400 rounded-full" style={{ width: "100%" }} />
                            </div>
                          </div>

                          {/* New Repayment */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-bold text-slate-600">
                              <span>New Repayment ({newInterestRate}%)</span>
                              <span className="text-violet-700 font-black">${Math.round(results.newPMT).toLocaleString()}/mo</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-violet-600 rounded-full transition-all duration-500" 
                                style={{ width: `${Math.min(100, (results.newPMT / results.currentPMT) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Net Benefit parameters */}
                      <div className="space-y-1.5 text-[12px] font-semibold text-slate-500">
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span>Total Upfront Fees:</span>
                          <span className="text-slate-800 font-black">${refinancingCosts.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span>Total Interest Saved (over {newLoanTerm}y):</span>
                          <span className="text-emerald-600 font-black">${Math.round(results.totalInterestSaved).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Optional Lead Form for full report */}
                      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">📄 Get Full PDF Audit — Enter Details</p>
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            handleLeadSubmit(e);
                          }} className="space-y-2">
                            <input
                              type="text"
                              id="lead-name"
                              required
                              placeholder="Full Name*"
                              value={calcLeadName}
                              onChange={(e) => setCalcLeadName(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-violet-500"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="email"
                                id="lead-email"
                                required
                                placeholder="Email*"
                                value={calcLeadEmail}
                                onChange={(e) => setCalcLeadEmail(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-violet-500"
                              />
                              <input
                                type="tel"
                                id="lead-phone"
                                required
                                placeholder="Phone*"
                                value={calcLeadPhone}
                                onChange={(e) => setCalcLeadPhone(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-violet-500"
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={calcLeadSubmitting}
                              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-[12px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-violet-500/10 transition-colors"
                            >
                              {calcLeadSubmitting ? "Generating..." : "Download Refinance Audit"} <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        </div>

                      {/* Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="flex items-center justify-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
                        >
                          <FileText className="w-4 h-4 shrink-0" />
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
                          className="border border-violet-600 text-violet-700 bg-white hover:bg-violet-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
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
                          className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          Next: New Loan <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {currentStep === 2 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-violet-500/10 transition-colors"
                        >
                          Calculate Feasibility <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                {(currentStep === 3 || currentStep === 4) && (
                  <p className="text-[9.5px] text-slate-400 leading-relaxed pt-2.5 border-t border-slate-100 mt-2">
                    Disclaimer: This estimate is an illustration. Upfront costs, exit fees, and bank approvals fluctuate. Consult a broker before locking in refinancing.
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
              Whether you&apos;re buying your first home, refinancing, or building a portfolio, our comprehensive guides break down every step into simple, actionable advice.
            </p>

            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 pointer-events-none`} />
              
              <h3 
                className="text-[22px] font-bold text-[#0B1F3A] mb-6 relative z-10"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                What you&apos;ll learn:
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
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-800 bg-violet-50 border border-violet-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Refinancing Feasibility Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Questions</span>
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

      {/* ENQUIRY FORM SECTION (Violet theme) */}
      <section id="enquiry-form" className="py-16 md:py-24 bg-gradient-to-br from-[#081324] via-[#0B1F3A] to-[#081324] text-white relative overflow-hidden">
        <div className="absolute right-[-10%] top-[20%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#38BDF8] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full w-fit block">
                Connect with an Expert
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black leading-tight font-montserrat">
                Ready to review your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">refinancing options?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Our brokers compare policies and search for home loan rates across 30+ lenders to secure you a better deal and potentially waive setup fees.
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
                    Thank you. A refinance broker from Mortgage Xperts will call you shortly to discuss your home loan health checks.
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
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enq-msg" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Your Message (Optional)</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your home loan rates..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
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
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Happy Clients</span></>}
        backgroundClass="bg-white"
      />

      {/* FOOTER */}
      <SiteFooter settings={settings} />

      {/* PRINT-ONLY AREA */}
      <div id="printable-report-area" className="p-8 font-inter text-slate-800 bg-white hidden" style={{ width: "800px" }}>
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-violet-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Home Loan Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-violet-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              Refinance Feasibility Audit
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

        {/* Feasibility outcomes */}
        <div className="bg-violet-50 border border-violet-200 rounded-3xl p-8 text-center mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-violet-800">Calculated Net Repayment Savings</span>
          <div className={`text-3xl font-black mt-2 ${results.monthlySavings > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
            {results.monthlySavings > 0 ? `+$${Math.round(results.monthlySavings).toLocaleString()} / Month` : `$${Math.round(results.monthlySavings).toLocaleString()} / Month`}
          </div>
          <p className="text-[11.5px] text-slate-500 mt-2 font-medium max-w-md mx-auto">
            Break-even Timeline: <strong className="text-slate-700 font-black">{results.breakEvenText}</strong>
          </p>
        </div>

        {/* Detailed parameters */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Feasibility Details</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-600">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2.5 flex justify-between">
                  <td>Current Loan Balance:</td>
                  <td className="text-[#0B1F3A] font-black">${currentLoanBalance.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Current Interest Rate:</td>
                  <td className="text-[#0B1F3A] font-black">{currentInterestRate}% p.a.</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Remaining Term:</td>
                  <td className="text-[#0B1F3A] font-black">{currentLoanTerm} Years</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Current Monthly Repayment:</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.currentPMT).toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>New Interest Rate:</td>
                  <td className="text-[#0B1F3A] font-black">{newInterestRate}% p.a.</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>New Loan Term:</td>
                  <td className="text-[#0B1F3A] font-black">{newLoanTerm} Years</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>New Monthly Repayment:</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.newPMT).toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Refinancing Upfront Fees:</td>
                  <td className="text-[#0B1F3A] font-black">${refinancingCosts.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between bg-violet-50/20 px-1">
                  <td className="text-violet-800 font-black">Net Total Interest Saved (over new term):</td>
                  <td className="text-emerald-600 font-black">${Math.round(results.totalInterestSaved).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-200 pt-4 text-center text-[8.5px] text-slate-400 leading-normal font-semibold">
          Disclaimer: This refinance feasibility report is an illustration based on self-reported inputs and formula parameters. It does not constitute a formal refinance credit offer or mortgage discharge contract. Bank eligibility criteria, credit histories, property valuations, and changing bank interest parameters will affect final outcomes. Mortgage Xperts offers free broker audits to source lower interest rates.
        </div>
      </div>
    </div>
  );
}
