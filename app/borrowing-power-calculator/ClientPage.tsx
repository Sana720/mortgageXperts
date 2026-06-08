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
  CheckCircle2,
  Calculator,
  AlertCircle,
  HelpCircle,
  Building,
  UserCheck
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

  // Step 1: Household & Income States
  const [householdSize, setHouseholdSize] = useState<number>(1);
  const [monthlySalary, setMonthlySalary] = useState<number>(8333);
  const [otherIncome, setOtherIncome] = useState<number>(0);

  // Step 2: Expense Details States
  const [livingExpenses, setLivingExpenses] = useState<number>(2000);
  const [loanRepayments, setLoanRepayments] = useState<number>(0);
  const [creditCardLimit, setCreditCardLimit] = useState<number>(5000);
  const [otherDebts, setOtherDebts] = useState<number>(0);

  // Step 3: Loan Details States
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);

  // Step 4: Personal Details (Lead Capture)
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

  // Calculation engine matching live site exactly
  const results = useMemo(() => {
    // 1. Adjusted Living Expenses based on household size multiplier
    let multiplier = 1.0;
    if (householdSize === 2) multiplier = 1.4;
    else if (householdSize === 3) multiplier = 1.6;
    else if (householdSize === 4) multiplier = 1.8;

    const adjustedLivingExpenses = livingExpenses * multiplier;

    // 2. Total monthly income
    const totalMonthlyIncome = monthlySalary + otherIncome;

    // 3. Credit Card commitment (3% of limit)
    const creditCardCommitment = creditCardLimit * 0.03;

    // 4. Total monthly expenses
    const totalMonthlyExpenses = adjustedLivingExpenses + loanRepayments + otherDebts + creditCardCommitment;

    // 5. Net monthly surplus
    const netMonthly = totalMonthlyIncome - totalMonthlyExpenses;

    // 6. Borrowing Capacity PV calculation
    let borrowingPower = 0;
    if (netMonthly > 0 && loanTerm > 0) {
      if (interestRate === 0) {
        borrowingPower = netMonthly * (loanTerm * 12);
      } else {
        const monthlyRate = interestRate / 12 / 100;
        const totalMonths = loanTerm * 12;
        borrowingPower = netMonthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)));
      }
    }

    const lowerBound = Math.round((borrowingPower * 0.95) / 1000) * 1000;
    const upperBound = Math.round((borrowingPower * 1.05) / 1000) * 1000;

    return {
      adjustedLivingExpenses,
      totalMonthlyIncome,
      creditCardCommitment,
      totalMonthlyExpenses,
      netMonthly,
      borrowingPower: Math.max(0, Math.round(borrowingPower)),
      lowerBound: Math.max(0, lowerBound),
      upperBound: Math.max(0, upperBound)
    };
  }, [
    householdSize,
    monthlySalary,
    otherIncome,
    livingExpenses,
    loanRepayments,
    creditCardLimit,
    otherDebts,
    loanTerm,
    interestRate
  ]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "borrowing-power-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Borrowing Power Calculator submission. Household Option: ${householdSize}, Monthly Salary: $${monthlySalary}, Other Income: $${otherIncome}, Living Expenses: $${livingExpenses}, CC Limit: $${creditCardLimit}, Other Repayments: $${loanRepayments}, Other Debts: $${otherDebts}, Term: ${loanTerm} years, Interest Rate: ${interestRate}%, Estimated Borrowing Range: $${results.lowerBound.toLocaleString()} - $${results.upperBound.toLocaleString()}`
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
      setCurrentStep(5);
    }
  };

  // Guide download handler
  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideName || !guideEmail || !guidePhone) return;

    setGuideSubmitting(true);
    try {
      const payload = {
        type: "borrowing-power-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Unlocking Your Borrowing Power"
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
        type: "borrowing-power-callback",
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
      pdf.save(`Mortgage_Borrowing_Power_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Borrowing Capacity Assessment",
    hero_title: "How Much Can I Borrow?",
    hero_subtext: "Find out your estimated borrowing capacity and loan range. Use our interactive estimator to evaluate your property search goals.",
    hero_image: "/images/borrowing_hero.png",
    hero_btn1_text: "Estimate Now",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to an Expert",
    hero_btn2_link: "#enquiry-form"
  };

  const faqs = [
    {
      q: "How do banks calculate my borrowing power?",
      a: "Banks assess your net take-home pay (after tax) and subtract your living expenses and credit commitments. They apply a serviceability assessment interest rate, which includes a buffer of 3.00% over the product rate, to ensure you can afford repayments if interest rates rise. The remaining monthly surplus determines the loan amount you can service."
    },
    {
      q: "What is the APRA interest rate buffer?",
      a: "The Australian Prudential Regulation Authority (APRA) requires lenders to assess your ability to repay a home loan at an interest rate that is at least 3.00% higher than the actual interest rate on the loan product. This safety margin protects borrowers against future interest rate hikes."
    },
    {
      q: "How do credit card limits affect my borrowing limit?",
      a: "Banks do not look at your outstanding credit card balance; they assess the total credit limit. Lenders typically assume a monthly repayment of 3% of your combined credit card limits. A $10,000 credit card limit reduces your monthly assessable surplus by $300, which can lower your borrowing capacity by $30,000 to $45,000."
    },
    {
      q: "Can I borrow with a low deposit?",
      a: "Yes. Many lenders offer home loans with deposits as low as 5% or 10%. However, borrowing more than 80% of the property value usually triggers Lenders Mortgage Insurance (LMI) charges. Eligible first-home buyers can also look into federal government schemes to buy with a 5% deposit and waive LMI entirely."
    },
    {
      q: "Does pre-approval guarantee I can borrow the estimated amount?",
      a: "No. A pre-approval is an initial assessment subject to formal validation. Lenders will verify your payslips, bank statements, and debts, and perform a credit check. The property you purchase must also meet the bank's valuation criteria before formal approval is granted."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero pageTitle="Borrowing Power Calculator" themeColor="green" pageHeroSettings={pageHeroSettings || defaultHeroSettings} />

      {/* CALCULATOR TOOL SECTION (Structured like Loan Repayment, Styled in Emerald) */}
      <section id="calculator-tool" className="py-8 lg:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute right-[-10%] top-[10%] w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-[-5%] bottom-[15%] w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Rich Mortgage Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Plan Your Property Budget & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Estimate Your Borrowing Capacity</span>
              </h2>
              <div className="w-12 h-[3px] bg-emerald-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                Determining your borrowing range is crucial before inspecting properties. Our estimator evaluates income, living expenses, and debts to approximate the amount you can borrow.
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Household Assessment</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Adjusts baseline expenses according to your household composition to mimic bank serviceability tests.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Credit Limits Assessed</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Accounts for total credit card limits as active ongoing liabilities based on standard banking guidelines.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">APRA Buffer Applied</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Incorporates interest rate serviceability margins directly into the annuity calculation formulas.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form (Exactly structured like Loan Repayment) */}
            <div className="lg:col-span-6 flex justify-end no-print">
              <div className="w-full max-w-[500px] bg-gradient-to-b from-white via-white to-slate-50/50 border border-slate-200/60 rounded-[32px] p-8 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.08)] hover:shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12)] flex flex-col justify-between min-h-[510px] transition-all duration-300 relative overflow-hidden">
                
                {/* Top decorative gradient bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-555 transition-all duration-500 ease-out" 
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>

                {/* Header Step indicators */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-black text-white transition-all ${currentStep === 4 ? 'bg-emerald-600' : 'bg-emerald-600'}`}>
                      {currentStep === 4 ? "✓" : currentStep}
                    </span>
                    <h3 className="text-[13px] font-bold text-slate-700 font-montserrat">
                      {currentStep === 1 && "Step 1: Household & Income"}
                      {currentStep === 2 && "Step 2: Expenses Details"}
                      {currentStep === 3 && "Step 3: Loan Details"}
                      {currentStep === 4 && "Step 4: Borrowing Range"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step {currentStep} of 4</span>
                </div>

                {/* Wizard Body content */}
                <div className="flex-1 flex flex-col justify-center">
                  
                  {/* Step 1: Household & Income Details */}
                  {currentStep === 1 && (
                    <div className="space-y-4 py-2">
                      {/* Household composition */}
                      <div className="space-y-2">
                        <label htmlFor="household-size" className="text-[11px] font-bold text-slate-700">Household Size</label>
                        <select
                          id="household-size"
                          value={householdSize}
                          onChange={(e) => setHouseholdSize(Number(e.target.value))}
                          className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all appearance-none cursor-pointer"
                        >
                          <option value={1}>Just Me</option>
                          <option value={2}>Me & a Partner</option>
                          <option value={3}>Me, Partner & 1 Child</option>
                          <option value={4}>Me, Partner & 2 or more Children</option>
                        </select>
                      </div>

                      {/* Monthly pre-tax salary */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="monthly-salary">Monthly Salary (before tax, $)</label>
                          <span className="text-emerald-700 font-black text-[13.5px]">${monthlySalary.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="monthly-salary"
                            value={monthlySalary}
                            onChange={(e) => setMonthlySalary(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                          />
                        </div>
                      </div>

                      {/* Other monthly income */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="other-income">Other Monthly Income ($)</label>
                          <span className="text-emerald-700 font-black text-[13.5px]">${otherIncome.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="other-income"
                            value={otherIncome}
                            onChange={(e) => setOtherIncome(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Expense Details */}
                  {currentStep === 2 && (
                    <div className="space-y-3.5 py-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="living-expenses">Monthly Living Expenses ($)</label>
                          <span className="text-emerald-700 font-black text-[13.5px]">${livingExpenses.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="living-expenses"
                            value={livingExpenses}
                            onChange={(e) => setLivingExpenses(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="loan-payments">Existing Loan Repayments (Monthly, $)</label>
                          <span className="text-emerald-700 font-black text-[13.5px]">${loanRepayments.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="loan-payments"
                            value={loanRepayments}
                            onChange={(e) => setLoanRepayments(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-700">
                            <label htmlFor="cc-limit">Credit Card Limits ($)</label>
                          </div>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs select-none pointer-events-none">$</div>
                            <input
                              type="number"
                              id="cc-limit"
                              value={creditCardLimit}
                              onChange={(e) => setCreditCardLimit(Math.max(0, Number(e.target.value)))}
                              className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-700">
                            <label htmlFor="other-debts">Other Debts (Monthly, $)</label>
                          </div>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs select-none pointer-events-none">$</div>
                            <input
                              type="number"
                              id="other-debts"
                              value={otherDebts}
                              onChange={(e) => setOtherDebts(Math.max(0, Number(e.target.value)))}
                              className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Loan Details */}
                  {currentStep === 3 && (
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="loan-term">Desired Loan Term (Years)</label>
                          <span className="text-emerald-700 font-black text-[13.5px]">{loanTerm} Years</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            id="loan-term"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Math.max(1, Math.min(45, Number(e.target.value))))}
                            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="interest-rate">Interest Rate (% p.a.)</label>
                          <span className="text-emerald-700 font-black text-[13.5px]">{interestRate}%</span>
                        </div>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">%</div>
                          <input
                            type="number"
                            id="interest-rate"
                            step="0.01"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl pl-4 pr-8 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Lead collection & Submission */}
                  {currentStep === 4 && (
                    <div className="space-y-4 py-2">
                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Estimated Borrowing Capacity Range</span>
                        <div className="text-2.5xl sm:text-3xl font-black text-emerald-700 mt-1">
                          ${results.lowerBound.toLocaleString()} - ${results.upperBound.toLocaleString()}
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1.5 leading-relaxed">
                          Enter your details below to unlock your custom report and verify calculation serviceability.
                        </p>
                      </div>

                      <form onSubmit={handleLeadSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label htmlFor="lead-name" className="text-[9px] font-black uppercase tracking-wider text-slate-400">Full Name*</label>
                          <input
                            type="text"
                            id="lead-name"
                            required
                            placeholder="Enter your name"
                            value={calcLeadName}
                            onChange={(e) => setCalcLeadName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[12.5px] font-bold text-slate-850 focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label htmlFor="lead-email" className="text-[9px] font-black uppercase tracking-wider text-slate-400">Email Address*</label>
                            <input
                              type="email"
                              id="lead-email"
                              required
                              placeholder="Enter email"
                              value={calcLeadEmail}
                              onChange={(e) => setCalcLeadEmail(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[12.5px] font-bold text-slate-850 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="lead-phone" className="text-[9px] font-black uppercase tracking-wider text-slate-400">Phone Number*</label>
                            <input
                              type="tel"
                              id="lead-phone"
                              required
                              placeholder="Phone"
                              value={calcLeadPhone}
                              onChange={(e) => setCalcLeadPhone(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[12.5px] font-bold text-slate-850 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={calcLeadSubmitting}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[13px] py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10 transition-colors mt-2"
                        >
                          {calcLeadSubmitting ? "Generating..." : "Download Full Capacity Report"} <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Step 5: Calculations Displayed (Only after Lead Captured) */}
                  {currentStep === 5 && (
                    <div className="space-y-4 py-2">
                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Your Assessed Capacity</span>
                        <div className="text-2.5xl sm:text-3xl font-black text-emerald-700 mt-1">
                          ${results.lowerBound.toLocaleString()} - ${results.upperBound.toLocaleString()}
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1.5 leading-relaxed">
                          This estimate uses standard compound mortgage present value over {loanTerm} years.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-[12px] py-1 border-b border-slate-50 font-bold text-slate-650">
                          <span>Total Monthly Income:</span>
                          <span className="text-slate-850 font-black">${Math.round(results.totalMonthlyIncome).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[12px] py-1 border-b border-slate-50 font-bold text-slate-650">
                          <span>Adjusted Expenses & CC Commitments:</span>
                          <span className="text-slate-850 font-black">${Math.round(results.totalMonthlyExpenses).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[12px] py-1 font-bold text-slate-650">
                          <span className="text-emerald-850 font-black">Assessable Monthly Surplus:</span>
                          <span className="text-emerald-700 font-extrabold">${Math.round(Math.max(0, results.netMonthly)).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          onClick={downloadReportPDF}
                          disabled={isGeneratingPdf}
                          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
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
                          className="border border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                        >
                          Start Over
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer buttons for steps navigation */}
                {currentStep < 4 && (
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
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          Next: Expenses <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {currentStep === 2 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          Next: Loan Details <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {currentStep === 3 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(4)}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10 transition-colors"
                        >
                          Next: Calculate Range <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                {(currentStep === 4 || currentStep === 5) && (
                  <p className="text-[9.5px] text-slate-400 leading-relaxed pt-2.5 border-t border-slate-100 mt-2">
                    Disclaimer: This is an estimate only. Capacity depends on compounding and lender approval parameters. Consult an expert for official pre-approvals.
                  </p>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ROADMAP / GUIDE DOWNLOAD SECTION (Emerald version) */}
      <section className="py-5 lg:py-10 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full w-fit block font-bold">
                Guide Download
              </span>
              <h2 className="text-[#0B1F3A] text-[24px] sm:text-[30px] font-black leading-tight font-montserrat">
                Your roadmap to maximizing borrowing power
              </h2>
              <p className="text-slate-500 text-[13.5px] leading-relaxed">
                Learn how to restructure debts, decrease credit cards, and optimize income variables to maximize what you can borrow from Australian banks.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3.5 max-w-md">
                <FileText className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13.5px] font-black text-[#0B1F3A]">Unlocking Borrowing Capacity</h4>
                  <p className="text-slate-500 text-[11.5px] leading-relaxed mt-0.5">
                    Our checklists list direct variables that banks examine. Use our guide to prepare your PAYG/Self-Employed profiles before submission.
                  </p>
                </div>
              </div>
            </div>

            {/* Guide Request Form */}
            <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-5 sm:p-6 shadow-sm">
              {!guideSubmitted ? (
                <form onSubmit={handleGuideSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400" htmlFor="guide-name">Full Name*</label>
                    <input
                      type="text"
                      id="guide-name"
                      required
                      value={guideName}
                      onChange={(e) => setGuideName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400" htmlFor="guide-email">Email Address*</label>
                    <input
                      type="email"
                      id="guide-email"
                      required
                      value={guideEmail}
                      onChange={(e) => setGuideEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400" htmlFor="guide-phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="guide-phone"
                      required
                      value={guidePhone}
                      onChange={(e) => setGuidePhone(e.target.value)}
                      placeholder="e.g. 0400 123 456"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors font-bold"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={guideSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-750 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer mt-2"
                  >
                    {guideSubmitting ? "Submitting..." : "Get the Guide"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-[14.5px] font-black text-[#0B1F3A]">Guide Successfully Requested!</h4>
                  <p className="text-[12px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Check your email. We&apos;ve sent a download link for &quot;Unlocking Your Borrowing Power&quot; straight to your inbox.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FAQS / ACCORDION SECTION */}
      <section className="py-12 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Borrowing Capacity Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Questions</span>
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

      {/* ENQUIRY FORM SECTION (Exactly matching footer callout style) */}
      <section id="enquiry-form" className="py-16 md:py-24 bg-gradient-to-br from-[#081324] via-[#0B1F3A] to-[#081324] text-white relative overflow-hidden">
        <div className="absolute right-[-10%] top-[20%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#38BDF8] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full w-fit block">
                Connect with an Expert
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black leading-tight font-montserrat">
                Ready to Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Home Loan Pre-Approval?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Our team at Mortgage Xperts compares borrowing policies across 30+ lenders in Australia to match you with the highest borrowing limit and lowest rates.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8">
              {enquirySubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold font-montserrat">Enquiry Submitted Successfully</h3>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                    Thank you. An investment loan strategist from Mortgage Xperts will call you shortly to discuss your borrowing options.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="enq-name" className="text-[10.5px] font-bold text-slate-350 tracking-wide uppercase">Your Full Name</label>
                    <input
                      type="text"
                      id="enq-name"
                      placeholder="Jane Doe"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="enq-email" className="text-[10.5px] font-bold text-slate-350 tracking-wide uppercase">Email Address</label>
                      <input
                        type="email"
                        id="enq-email"
                        placeholder="jane@example.com"
                        required
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="enq-phone" className="text-[10.5px] font-bold text-slate-350 tracking-wide uppercase">Phone Number</label>
                      <input
                        type="tel"
                        id="enq-phone"
                        placeholder="0400 000 000"
                        required
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enq-msg" className="text-[10.5px] font-bold text-slate-350 tracking-wide uppercase">Your Message (Optional)</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your property goals..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white/10 text-white placeholder-slate-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0B1F3A] font-extrabold text-[13px] py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98] mt-2"
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
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Happy Clients</span></>}
        backgroundClass="bg-white"
      />

      {/* FOOTER */}
      <SiteFooter settings={settings} />

      {/* PRINT-ONLY AREA */}
      <div id="printable-report-area" className="p-8 font-inter text-slate-850 bg-white hidden" style={{ width: "800px" }}>
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-emerald-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Home Loan Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              Borrowing Assessment
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

        {/* Capacity dashboard */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">Estimated Borrowing Capacity Range</span>
          <div className="text-3xl font-black text-emerald-700 mt-2">
            ${results.lowerBound.toLocaleString()} - ${results.upperBound.toLocaleString()}
          </div>
          <p className="text-[11.5px] text-slate-500 mt-2 font-medium max-w-md mx-auto">
            Calculated over a {loanTerm}-year term at an assessed interest rate of {interestRate}% p.a.
          </p>
        </div>

        {/* Detailed parameters */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Assessment Parameters</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-650">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2.5 flex justify-between">
                  <td>Household Composition:</td>
                  <td className="text-[#0B1F3A] font-black">
                    {householdSize === 1 && "Just Me"}
                    {householdSize === 2 && "Me & a Partner"}
                    {householdSize === 3 && "Me, Partner & 1 Child"}
                    {householdSize === 4 && "Me, Partner & 2+ Children"}
                  </td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Monthly Pre-tax Salary:</td>
                  <td className="text-[#0B1F3A] font-black">${monthlySalary.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Other Monthly Income:</td>
                  <td className="text-[#0B1F3A] font-black">${otherIncome.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Total Monthly Gross Income:</td>
                  <td className="text-[#0B1F3A] font-black">${results.totalMonthlyIncome.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Monthly Living Expenses:</td>
                  <td className="text-[#0B1F3A] font-black">${livingExpenses.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Adjusted Living Expenses (Size Multiplier applied):</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.adjustedLivingExpenses).toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Credit Card Limits:</td>
                  <td className="text-[#0B1F3A] font-black">${creditCardLimit.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Assessed CC Monthly Commitment (3%):</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.creditCardCommitment).toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Other Loan Repayments & Monthly Debts:</td>
                  <td className="text-[#0B1F3A] font-black">${(loanRepayments + otherDebts).toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Total Assessed Monthly Expenses:</td>
                  <td className="text-[#0B1F3A] font-black">${Math.round(results.totalMonthlyExpenses).toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between bg-emerald-50/20 px-1">
                  <td className="text-emerald-850 font-black">Net Monthly Surplus (Capacity baseline):</td>
                  <td className="text-emerald-700 font-black">${Math.round(Math.max(0, results.netMonthly)).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-200 pt-4 text-center text-[8.5px] text-slate-400 leading-normal font-semibold">
          Disclaimer: This capacity report is an illustration based on self-reported inputs and formula parameters. It does not constitute a formal loan pre-approval or credit offer. Bank eligibility, credit histories, documentation checks, and changing policy rates will affect final assessment outcomes. Mortgage Xperts offers free broker strategies to compare lender limits.
        </div>
      </div>
    </div>
  );
}
