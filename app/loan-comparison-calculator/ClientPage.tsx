"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Percent,
  Calculator,
  Calendar,
  CheckCircle2,
  FileText,
  Users,
  Clock,
  Star,
  Printer,
  Check,
  Wallet,
  Coins,
  Landmark,
  Sparkles,
  Download,
  RotateCcw,
  MessageSquare,
  ArrowLeft,
  ChevronDown
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SubPageHero } from "../components/SubPageHero";
import { TestimonialSection } from "../components/TestimonialSection";
import { PageHeroSettings } from "@/lib/pageLoader";

interface AmortizationYear {
  year: number;
  principal: number;
  interest: number;
  totalPaid: number;
  balance: number;
}

interface LoanResult {
  repaymentAmount: number;
  totalInterest: number;
  totalPayments: number;
  yearlyHistory: AmortizationYear[];
  balanceHistory: number[];
}

interface ComparisonResults {
  loan1: LoanResult;
  loan2: LoanResult;
  interestSaved: number;
  paymentsSaved: number;
  cheaperLoan: "Loan 1" | "Loan 2" | "Equal";
}

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export default function ClientPage({ settings = {}, pageHeroSettings }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings }) {
  // Step form state: 1 = Enter Details, 2 = Results Dashboard
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Loan 1 inputs
  const [loan1Amount, setLoan1Amount] = useState<number>(450000);
  const [loan1Rate, setLoan1Rate] = useState<number>(6.15);
  const [loan1Term, setLoan1Term] = useState<number>(30);
  const [loan1Frequency, setLoan1Frequency] = useState<string>("Monthly");

  // Loan 2 inputs
  const [loan2Amount, setLoan2Amount] = useState<number>(450000);
  const [loan2Rate, setLoan2Rate] = useState<number>(5.99);
  const [loan2Term, setLoan2Term] = useState<number>(30);
  const [loan2Frequency, setLoan2Frequency] = useState<string>("Monthly");

  // Lead Form States
  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcLeadSubmitting, setCalcLeadSubmitting] = useState(false);

  // Guide request form
  const [guideName, setGuideName] = useState("");
  const [guideEmail, setGuideEmail] = useState("");
  const [guidePhone, setGuidePhone] = useState("");
  const [guideSubmitting, setGuideSubmitting] = useState(false);
  const [guideSubmitted, setGuideSubmitted] = useState(false);

  // Main Enquiry Form
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active tab for Amortization table comparison
  const [activeTableTab, setActiveTableTab] = useState<"Loan 1" | "Loan 2">("Loan 1");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Calculation engine helper
  const calculateSingleLoan = (amount: number, rate: number, term: number, frequencyStr: string): LoanResult => {
    const rateFraction = rate / 100;
    let freq = 12;
    if (frequencyStr === "Weekly") freq = 52;
    if (frequencyStr === "Fortnightly") freq = 26;

    const r_m = rateFraction / 12;
    const n_m = term * 12;

    // Base monthly repayment
    const monthlyRepaymentBase = r_m > 0
      ? (amount * r_m * Math.pow(1 + r_m, n_m)) / (Math.pow(1 + r_m, n_m) - 1)
      : amount / n_m;

    // Determine repayment amount for the chosen frequency
    let repaymentAmount = monthlyRepaymentBase;
    if (frequencyStr === "Weekly") {
      repaymentAmount = (monthlyRepaymentBase * 12) / 52;
    } else if (frequencyStr === "Fortnightly") {
      repaymentAmount = (monthlyRepaymentBase * 12) / 26;
    }

    // Run periods simulation
    const totalPeriods = term * freq;
    const r_p = rateFraction / freq;
    let balance = amount;
    let accumulatedInterest = 0;
    let accumulatedPrincipal = 0;
    let totalPaid = 0;

    const yearlyHistory: AmortizationYear[] = [];
    const balanceHistory: number[] = [amount];

    let currentYearInterest = 0;
    let currentYearPrincipal = 0;
    let currentYearTotal = 0;

    for (let p = 1; p <= totalPeriods; p++) {
      if (balance <= 0) {
        if (p % freq === 0) {
          yearlyHistory.push({
            year: p / freq,
            principal: currentYearPrincipal,
            interest: currentYearInterest,
            totalPaid: currentYearTotal,
            balance: 0
          });
          balanceHistory.push(0);
          currentYearInterest = 0;
          currentYearPrincipal = 0;
          currentYearTotal = 0;
        }
        continue;
      }

      const interestPayment = balance * r_p;
      const principalPayment = Math.min(balance, repaymentAmount - interestPayment);
      const totalPeriodPaid = principalPayment + interestPayment;

      balance -= principalPayment;
      accumulatedInterest += interestPayment;
      accumulatedPrincipal += principalPayment;
      totalPaid += totalPeriodPaid;

      currentYearInterest += interestPayment;
      currentYearPrincipal += principalPayment;
      currentYearTotal += totalPeriodPaid;

      if (p % freq === 0) {
        yearlyHistory.push({
          year: p / freq,
          principal: currentYearPrincipal,
          interest: currentYearInterest,
          totalPaid: currentYearTotal,
          balance: Math.max(0, balance)
        });
        balanceHistory.push(Math.max(0, balance));
        currentYearInterest = 0;
        currentYearPrincipal = 0;
        currentYearTotal = 0;
      }
    }

    return {
      repaymentAmount,
      totalInterest: accumulatedInterest,
      totalPayments: totalPaid,
      yearlyHistory,
      balanceHistory
    };
  };

  // Memoized comparison results
  const results = useMemo<ComparisonResults>(() => {
    const loan1 = calculateSingleLoan(loan1Amount, loan1Rate, loan1Term, loan1Frequency);
    const loan2 = calculateSingleLoan(loan2Amount, loan2Rate, loan2Term, loan2Frequency);

    const paymentsSaved = loan1.totalPayments - loan2.totalPayments;
    const interestSaved = loan1.totalInterest - loan2.totalInterest;

    let cheaperLoan: "Loan 1" | "Loan 2" | "Equal" = "Equal";
    if (loan1.totalPayments > loan2.totalPayments) {
      cheaperLoan = "Loan 2";
    } else if (loan2.totalPayments > loan1.totalPayments) {
      cheaperLoan = "Loan 1";
    }

    return {
      loan1,
      loan2,
      interestSaved,
      paymentsSaved,
      cheaperLoan
    };
  }, [loan1Amount, loan1Rate, loan1Term, loan1Frequency, loan2Amount, loan2Rate, loan2Term, loan2Frequency]);

  // Form Submissions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalcLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "comparison-calculator-lead",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Loan Comparison Submission:
Loan 1: $${loan1Amount} @ ${loan1Rate}% for ${loan1Term} years (${loan1Frequency})
Loan 2: $${loan2Amount} @ ${loan2Rate}% for ${loan2Term} years (${loan2Frequency})
Cheaper option: ${results.cheaperLoan} with $${Math.abs(results.paymentsSaved).toFixed(2)} total savings.`
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Failed to submit comparison lead:", error);
    } finally {
      setCalcLeadSubmitting(false);
    }
  };

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideName || !guideEmail || !guidePhone) return;

    setGuideSubmitting(true);
    try {
      const payload = {
        type: "comparison-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Home Loan Comparison Guide"
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

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setSubmittingEnquiry(true);
    try {
      const payload = {
        type: "comparison-callback",
        name: `${formData.name} ${formData.surname}`.trim(),
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setEnquirySubmitted(true);
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  // PDF Export Logic
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
      pdf.save(`Loan_Comparison_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleReset = () => {
    setLoan1Amount(450000);
    setLoan1Rate(6.15);
    setLoan1Term(30);
    setLoan1Frequency("Monthly");
    setLoan2Amount(450000);
    setLoan2Rate(5.99);
    setLoan2Term(30);
    setLoan2Frequency("Monthly");
    setCurrentStep(1);
    setHoveredYear(null);
  };

  // SVG Chart points calculation
  const chartPaths = useMemo(() => {
    const width = 600;
    const height = 280;
    const padLeft = 60;
    const padRight = 30;
    const padTop = 25;
    const padBottom = 35;

    const hist1 = results.loan1.balanceHistory;
    const hist2 = results.loan2.balanceHistory;
    const maxVal = Math.max(loan1Amount, loan2Amount);
    const count = Math.max(hist1.length, hist2.length);

    const getX = (idx: number) => padLeft + (idx / (count - 1)) * (width - padLeft - padRight);
    const getY = (val: number) => height - padBottom - (val / maxVal) * (height - padBottom - padTop);

    const points1 = [];
    const points2 = [];

    for (let i = 0; i < count; i++) {
      const val1 = i < hist1.length ? hist1[i] : 0;
      const val2 = i < hist2.length ? hist2[i] : 0;
      points1.push(`${getX(i)},${getY(val1)}`);
      points2.push(`${getX(i)},${getY(val2)}`);
    }

    const areaPoints1 = [
      `${getX(0)},${height - padBottom}`,
      ...points1,
      `${getX(count - 1)},${height - padBottom}`
    ];
    const areaPoints2 = [
      `${getX(0)},${height - padBottom}`,
      ...points2,
      `${getX(count - 1)},${height - padBottom}`
    ];

    return {
      path1: `M ${points1.join(" L ")}`,
      path2: `M ${points2.join(" L ")}`,
      areaPath1: `M ${areaPoints1.join(" L ")} Z`,
      areaPath2: `M ${areaPoints2.join(" L ")} Z`,
      width,
      height,
      padLeft,
      padRight,
      padTop,
      padBottom,
      getX,
      getY,
      count
    };
  }, [results, loan1Amount, loan2Amount]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!chartPaths.count) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * chartPaths.width;

    const startX = chartPaths.padLeft;
    const endX = chartPaths.width - chartPaths.padRight;
    const chartWidth = endX - startX;

    let idx = Math.round(((svgX - startX) / chartWidth) * (chartPaths.count - 1));
    if (idx < 0) idx = 0;
    if (idx >= chartPaths.count) idx = chartPaths.count - 1;

    setHoveredYear(idx);
  };

  const handleMouseLeave = () => {
    setHoveredYear(null);
  };

  const defaultHeroSettings = {
    hero_badge: "Compare Home Loans",
    hero_title: "Loan Comparison Calculator",
    hero_subtext: "Compare interest rates, repayment options, and long-term costs side-by-side. Discover the cheapest mortgage structure to pay off your loan sooner and save thousands.",
    hero_image: "/images/repayment_hero.png",
    hero_btn1_text: "Start Comparing",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Enquire Now",
    hero_btn2_link: "#contact"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* CSS Injected for PDF and Print layout */}
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

      <SiteHeader isSticky={true} settings={settings} />

      <SubPageHero pageTitle="Loan Comparison Calculator" themeColor="rose" pageHeroSettings={pageHeroSettings || defaultHeroSettings} />

      {/* CALCULATOR TOOL SECTION */}
      <section id="calculator-tool" className="py-8 lg:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute right-[-10%] top-[10%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-[-5%] bottom-[15%] w-[350px] h-[350px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6 no-print">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-100/60 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Home Loan Analysis
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Compare Mortgages <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-[#F43F5E]">Side-by-Side</span>
              </h2>
              <div className="w-12 h-[3px] bg-[#E11D48] rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                Evaluating different interest rates, loan terms, and repayment frequencies enables you to pick the best home loan product. Analyze Loan 1 and Loan 2 directly to review payment differences and total interest savings.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-indigo-50/50 to-indigo-100/10 border border-indigo-100/40 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200/40 shadow-sm font-bold">1</div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-[#0B1F3A]">Configure Loan Details</h4>
                    <p className="text-slate-500 text-[12px] leading-relaxed mt-0.5">Input the principal amount, interest rate, and term for both options.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-orange-50/50 to-orange-100/10 border border-orange-100/40 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/40 shadow-sm font-bold">2</div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-[#0B1F3A]">Compare Repayment Costs</h4>
                    <p className="text-slate-500 text-[12px] leading-relaxed mt-0.5">Review the visual charts, monthly difference, and total interest accumulated.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Tool Column */}
            <div className="lg:col-span-7">
              <div className="w-full bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col transition-all duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full opacity-50 pointer-events-none`} />
                
                {currentStep === 1 && (
                  <form onSubmit={handleCalcLeadSubmit} className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black font-montserrat">
                        Enter Loan Details
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                        <Sparkles className="w-3.5 h-3.5" />
                        Step 1 of 2
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
                      {/* Divider for screens larger than md */}
                      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-slate-100 transform -translate-x-1/2" />

                      {/* Loan 1 Form Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <h4 className="font-bold text-[14px] text-indigo-700 font-montserrat">Loan Option 1</h4>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11.5px] font-bold text-slate-500">Loan Amount ($)</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12.5px] font-extrabold text-slate-400">$</span>
                            <input
                              type="number"
                              required
                              value={loan1Amount}
                              onChange={(e) => setLoan1Amount(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-xl pl-7 pr-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11.5px] font-bold text-slate-500">Interest Rate (%)</label>
                          <div className="relative">
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12.5px] font-extrabold text-slate-400">%</span>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={loan1Rate}
                              onChange={(e) => setLoan1Rate(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11.5px] font-bold text-slate-500">Loan Term (Years)</label>
                          <input
                            type="number"
                            required
                            value={loan1Term}
                            onChange={(e) => setLoan1Term(Math.max(1, Math.min(50, parseInt(e.target.value) || 0)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11.5px] font-bold text-slate-500">Repayment Frequency</label>
                          <div className="relative">
                            <select
                              value={loan1Frequency}
                              onChange={(e) => setLoan1Frequency(e.target.value)}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
                            >
                              <option>Monthly</option>
                              <option>Fortnightly</option>
                              <option>Weekly</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Loan 2 Form Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-600 shrink-0" />
                          <h4 className="font-bold text-[14px] text-orange-700 font-montserrat">Loan Option 2</h4>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11.5px] font-bold text-slate-500">Loan Amount ($)</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12.5px] font-extrabold text-slate-400">$</span>
                            <input
                              type="number"
                              required
                              value={loan2Amount}
                              onChange={(e) => setLoan2Amount(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-xl pl-7 pr-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-orange-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11.5px] font-bold text-slate-500">Interest Rate (%)</label>
                          <div className="relative">
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12.5px] font-extrabold text-slate-400">%</span>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={loan2Rate}
                              onChange={(e) => setLoan2Rate(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-orange-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11.5px] font-bold text-slate-500">Loan Term (Years)</label>
                          <input
                            type="number"
                            required
                            value={loan2Term}
                            onChange={(e) => setLoan2Term(Math.max(1, Math.min(50, parseInt(e.target.value) || 0)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-orange-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11.5px] font-bold text-slate-500">Repayment Frequency</label>
                          <div className="relative">
                            <select
                              value={loan2Frequency}
                              onChange={(e) => setLoan2Frequency(e.target.value)}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                            >
                              <option>Monthly</option>
                              <option>Fortnightly</option>
                              <option>Weekly</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM BUTTON BAR FOR STEP 1 */}
                    <div className="flex justify-between items-center gap-3 border-t border-slate-100 pt-4 mt-6">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentStep(2);
                        }}
                        className="flex-1 bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/10 transition-colors ml-auto"
                      >
                        Calculate & Compare <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleReset}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black font-montserrat">
                          Comparison Results
                        </h3>
                      </div>
                    </div>

                    {/* Summary savings callout */}
                    {results.cheaperLoan !== "Equal" ? (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3 shadow-sm animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/40">
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                        <div>
                          <h4 className="text-[13.5px] font-bold text-emerald-800">
                            {results.cheaperLoan} is the cheaper option!
                          </h4>
                          <p className="text-emerald-700/80 text-[11.5px] leading-relaxed mt-0.5">
                            By selecting {results.cheaperLoan}, you save{" "}
                            <span className="font-extrabold text-emerald-900">
                              ${Math.abs(results.paymentsSaved).toLocaleString("en-AU", { maximumFractionDigits: 2 })}
                            </span>{" "}
                            in total repayments, and{" "}
                            <span className="font-extrabold text-emerald-900">
                              ${Math.abs(results.interestSaved).toLocaleString("en-AU", { maximumFractionDigits: 2 })}
                            </span>{" "}
                            in interest expense over the loan life.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-slate-500/10 text-slate-600 flex items-center justify-center shrink-0">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-[13.5px] font-bold text-slate-800">Loans are completely equal</h4>
                          <p className="text-slate-600 text-[11.5px] leading-relaxed mt-0.5">
                            Both options resulted in the exact same interest payments and repayment schedule.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Side-by-side core grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Loan 1 Card */}
                      <div className="border border-indigo-100 bg-indigo-50/10 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-indigo-100/50">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                            <span className="text-[13px] font-black uppercase text-indigo-700 tracking-wider font-montserrat">Loan 1</span>
                          </div>
                          <span className="text-[11px] font-bold text-indigo-600/80 bg-indigo-100/30 px-2 py-0.5 rounded">
                            {loan1Rate}% @ {loan1Term} yrs
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Repayment Amount</span>
                            <span className="text-[20px] font-black text-[#0B1F3A]">
                              ${results.loan1.repaymentAmount.toLocaleString("en-AU", { maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-[10.5px] text-slate-500 font-semibold ml-1">/{loan1Frequency.toLowerCase()}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-indigo-100/30">
                            <div>
                              <span className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider block">Total Interest</span>
                              <span className="text-[13.5px] font-bold text-[#0B1F3A]">
                                ${results.loan1.totalInterest.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider block">Total Payments</span>
                              <span className="text-[13.5px] font-bold text-[#0B1F3A]">
                                ${results.loan1.totalPayments.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Loan 2 Card */}
                      <div className="border border-orange-100 bg-orange-50/10 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-orange-100/50">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                            <span className="text-[13px] font-black uppercase text-orange-700 tracking-wider font-montserrat">Loan 2</span>
                          </div>
                          <span className="text-[11px] font-bold text-orange-600/80 bg-orange-100/30 px-2 py-0.5 rounded">
                            {loan2Rate}% @ {loan2Term} yrs
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Repayment Amount</span>
                            <span className="text-[20px] font-black text-[#0B1F3A]">
                              ${results.loan2.repaymentAmount.toLocaleString("en-AU", { maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-[10.5px] text-slate-500 font-semibold ml-1">/{loan2Frequency.toLowerCase()}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-orange-100/30">
                            <div>
                              <span className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider block">Total Interest</span>
                              <span className="text-[13.5px] font-bold text-[#0B1F3A]">
                                ${results.loan2.totalInterest.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider block">Total Payments</span>
                              <span className="text-[13.5px] font-bold text-[#0B1F3A]">
                                ${results.loan2.totalPayments.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Chart */}
                    <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/50 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[14px] font-black text-[#0B1F3A] font-montserrat">
                          Balance History Comparison
                        </h4>
                        <div className="flex items-center gap-3.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700">
                            <span className="w-2.5 h-1 bg-indigo-600 rounded" />
                            Loan 1
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-700">
                            <span className="w-2.5 h-1 bg-orange-600 rounded" />
                            Loan 2
                          </div>
                        </div>
                      </div>

                      {/* SVG Chart Drawing */}
                      <div className="relative">
                        <svg
                          viewBox={`0 0 ${chartPaths.width} ${chartPaths.height}`}
                          className="w-full h-auto overflow-visible"
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                        >
                          {/* Y-axis gridlines */}
                          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                            const val = Math.max(loan1Amount, loan2Amount) * ratio;
                            const y = chartPaths.getY(val);
                            return (
                              <g key={idx} className="opacity-30">
                                <line
                                  x1={chartPaths.padLeft}
                                  y1={y}
                                  x2={chartPaths.width - chartPaths.padRight}
                                  y2={y}
                                  stroke="#94A3B8"
                                  strokeWidth={1}
                                  strokeDasharray="4 4"
                                />
                                <text
                                  x={chartPaths.padLeft - 8}
                                  y={y + 3}
                                  textAnchor="end"
                                  className="text-[10px] font-bold fill-slate-400"
                                >
                                  ${(val / 1000).toFixed(0)}k
                                </text>
                              </g>
                            );
                          })}

                          {/* X-axis labels (Years) */}
                          {Array.from({ length: 6 }).map((_, idx) => {
                            const yearIndex = Math.round(((chartPaths.count - 1) / 5) * idx);
                            const x = chartPaths.getX(yearIndex);
                            return (
                              <text
                                key={idx}
                                x={x}
                                y={chartPaths.height - 10}
                                textAnchor="middle"
                                className="text-[10px] font-bold fill-slate-400"
                              >
                                Yr {yearIndex}
                              </text>
                            );
                          })}

                          {/* Shaded Areas */}
                          <path
                            d={chartPaths.areaPath1}
                            fill="url(#indigoGrad)"
                            className="transition-all duration-300"
                          />
                          <path
                            d={chartPaths.areaPath2}
                            fill="url(#orangeGrad)"
                            className="transition-all duration-300"
                          />

                          {/* Line Paths */}
                          <path
                            d={chartPaths.path1}
                            fill="none"
                            stroke="#4F46E5"
                            strokeWidth={3}
                            className="transition-all duration-300"
                          />
                          <path
                            d={chartPaths.path2}
                            fill="none"
                            stroke="#EA580C"
                            strokeWidth={3}
                            className="transition-all duration-300"
                          />

                          {/* Gradient Definitions */}
                          <defs>
                            <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.08" />
                              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.08" />
                              <stop offset="100%" stopColor="#EA580C" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Hover Tooltip line */}
                          {hoveredYear !== null && (
                            <g>
                              <line
                                x1={chartPaths.getX(hoveredYear)}
                                y1={chartPaths.padTop}
                                x2={chartPaths.getX(hoveredYear)}
                                y2={chartPaths.height - chartPaths.padBottom}
                                stroke="#64748B"
                                strokeWidth={1.5}
                                strokeDasharray="3 3"
                              />
                              <circle
                                cx={chartPaths.getX(hoveredYear)}
                                cy={chartPaths.getY(
                                  hoveredYear < results.loan1.balanceHistory.length
                                    ? results.loan1.balanceHistory[hoveredYear]
                                    : 0
                                )}
                                r={5}
                                fill="#4F46E5"
                                stroke="#FFFFFF"
                                strokeWidth={2}
                              />
                              <circle
                                cx={chartPaths.getX(hoveredYear)}
                                cy={chartPaths.getY(
                                  hoveredYear < results.loan2.balanceHistory.length
                                    ? results.loan2.balanceHistory[hoveredYear]
                                    : 0
                                )}
                                r={5}
                                fill="#EA580C"
                                stroke="#FFFFFF"
                                strokeWidth={2}
                              />
                            </g>
                          )}
                        </svg>

                        {/* HTML Tooltip inside SVG Area */}
                        {hoveredYear !== null && (
                          <div
                            className="absolute bg-slate-900 text-white rounded-xl p-3 shadow-xl text-left border border-slate-800 space-y-1 z-30 pointer-events-none text-xs"
                            style={{
                              left: `${(chartPaths.getX(hoveredYear) / chartPaths.width) * 100}%`,
                              top: "10%",
                              transform: hoveredYear > chartPaths.count / 2 ? "translateX(-110%)" : "translateX(10px)"
                            }}
                          >
                            <div className="font-extrabold border-b border-slate-800 pb-1 text-slate-300">
                              Year {hoveredYear}
                            </div>
                            <div className="flex items-center gap-1.5 justify-between">
                              <span className="text-indigo-400 font-bold">Loan 1:</span>
                              <span className="font-black">
                                $
                                {(hoveredYear < results.loan1.balanceHistory.length
                                  ? results.loan1.balanceHistory[hoveredYear]
                                  : 0
                                ).toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 justify-between">
                              <span className="text-orange-400 font-bold">Loan 2:</span>
                              <span className="font-black">
                                $
                                {(hoveredYear < results.loan2.balanceHistory.length
                                  ? results.loan2.balanceHistory[hoveredYear]
                                  : 0
                                ).toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Amortization Table Tabbed Layout */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-1">
                        <h4 className="text-[14px] font-black text-[#0B1F3A] font-montserrat">
                          Amortization Table
                        </h4>
                        <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200/50">
                          {(["Loan 1", "Loan 2"] as const).map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setActiveTableTab(tab)}
                              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                                activeTableTab === tab
                                  ? "bg-white text-[#0B1F3A] shadow"
                                  : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              {tab} Schedule
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="max-h-[300px] overflow-y-auto border border-slate-200 rounded-2xl bg-white shadow-inner">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold sticky top-0 z-10">
                              <th className="p-3">Year</th>
                              <th className="p-3">Principal</th>
                              <th className="p-3">Interest</th>
                              <th className="p-3">Total Paid</th>
                              <th className="p-3">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            {(activeTableTab === "Loan 1" ? results.loan1 : results.loan2).yearlyHistory.map((row) => (
                              <tr key={row.year} className="hover:bg-slate-50/50">
                                <td className="p-3 font-bold text-[#0B1F3A]">Year {row.year}</td>
                                <td className="p-3">${row.principal.toLocaleString("en-AU", { maximumFractionDigits: 0 })}</td>
                                <td className="p-3">${row.interest.toLocaleString("en-AU", { maximumFractionDigits: 0 })}</td>
                                <td className="p-3">${row.totalPaid.toLocaleString("en-AU", { maximumFractionDigits: 0 })}</td>
                                <td className="p-3 font-bold text-slate-900">${row.balance.toLocaleString("en-AU", { maximumFractionDigits: 0 })}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Optional Lead Form for full report */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mt-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">📄 Get Full PDF Report — Enter Details</p>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleCalcLeadSubmit(e);
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

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const element = document.getElementById("printable-report-area");
                          if (element) {
                            window.print();
                          }
                        }}
                        className="flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer w-1/2"
                      >
                        <Printer className="w-4 h-4 shrink-0" />
                        <span>Print Report</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="border border-rose-600 text-rose-700 bg-white hover:bg-rose-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer w-1/2 flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-4 h-4 shrink-0" />
                        <span>Start Over</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRINT-ONLY COMPACT COMPARISON REPORT */}
      <div id="printable-report-area" className="p-10 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Home Loan Comparison Report</h1>
            <p className="text-sm text-slate-500">Prepared by Mortgage Xperts</p>
          </div>
          <span className="text-xs text-slate-400">Date Generated: {new Date().toLocaleDateString("en-AU")}</span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border p-4 rounded-xl">
            <h3 className="font-bold text-indigo-700 pb-2 border-b">Loan Option 1</h3>
            <div className="space-y-1.5 text-sm pt-2">
              <div>Amount: <span className="font-bold">${loan1Amount.toLocaleString("en-AU")}</span></div>
              <div>Interest Rate: <span className="font-bold">{loan1Rate}%</span></div>
              <div>Term: <span className="font-bold">{loan1Term} Years</span></div>
              <div>Repayment Amount: <span className="font-bold">${results.loan1.repaymentAmount.toFixed(2)} ({loan1Frequency})</span></div>
              <div>Total Interest Paid: <span className="font-bold">${results.loan1.totalInterest.toLocaleString("en-AU", { maximumFractionDigits: 0 })}</span></div>
              <div>Total Payments: <span className="font-bold">${results.loan1.totalPayments.toLocaleString("en-AU", { maximumFractionDigits: 0 })}</span></div>
            </div>
          </div>

          <div className="border p-4 rounded-xl">
            <h3 className="font-bold text-orange-700 pb-2 border-b">Loan Option 2</h3>
            <div className="space-y-1.5 text-sm pt-2">
              <div>Amount: <span className="font-bold">${loan2Amount.toLocaleString("en-AU")}</span></div>
              <div>Interest Rate: <span className="font-bold">{loan2Rate}%</span></div>
              <div>Term: <span className="font-bold">{loan2Term} Years</span></div>
              <div>Repayment Amount: <span className="font-bold">${results.loan2.repaymentAmount.toFixed(2)} ({loan2Frequency})</span></div>
              <div>Total Interest Paid: <span className="font-bold">${results.loan2.totalInterest.toLocaleString("en-AU", { maximumFractionDigits: 0 })}</span></div>
              <div>Total Payments: <span className="font-bold">${results.loan2.totalPayments.toLocaleString("en-AU", { maximumFractionDigits: 0 })}</span></div>
            </div>
          </div>
        </div>

        <div className="border p-5 rounded-xl bg-slate-50">
          <h3 className="font-bold text-slate-900">Summary Savings</h3>
          {results.cheaperLoan !== "Equal" ? (
            <p className="text-sm text-slate-700 leading-relaxed mt-1">
              Selecting <span className="font-bold">{results.cheaperLoan}</span> reduces total payments by <span className="font-bold">${Math.abs(results.paymentsSaved).toLocaleString("en-AU", { maximumFractionDigits: 2 })}</span> and saves you <span className="font-bold">${Math.abs(results.interestSaved).toLocaleString("en-AU", { maximumFractionDigits: 2 })}</span> in interest charges over {loan1Term} years.
            </p>
          ) : (
            <p className="text-sm text-slate-700 leading-relaxed mt-1">Both loan products result in identical repayment schedules.</p>
          )}
        </div>

        <div className="text-center text-[10px] text-slate-400 pt-10 border-t">
          Disclaimer: Calculations are estimates only. Lending criteria, fees, and government policies apply. Contact our brokers to verify specific products.
        </div>
      </div>

      {/* MID-PAGE CONTEXT ENQUIRY SECTION */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2">
                <Landmark className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-rose-700">Guide to Comparing Loans</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight font-montserrat">
                Find the Perfect Loan with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">Comparison Guide</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed">
                Comparing home loans goes beyond looking at the headline interest rate. Discover the key factors to consider, such as hidden offset account benefits, introductory rates, comparison rates, and annual package fees that can impact your true mortgage cost.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Understanding standard vs comparison interest rates",
                  "Evaluating standard redraw options and fee-free offsets",
                  "Finding the right loan features to fit your individual goals",
                  "Checking eligibility for government home buyer schemes"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className="text-[13px] text-slate-700 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-500 to-pink-500" />
              
              {!guideSubmitted ? (
                <form onSubmit={handleGuideSubmit} className="space-y-4">
                  <h3 className="text-[#0B1F3A] text-[18px] font-black font-montserrat">Download the Comparison Guide</h3>
                  <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed">
                    Submit your email address to immediately receive our free home loan guide. By submitting, you consent to being contacted by our mortgage experts.
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={guideName}
                        onChange={(e) => setGuideName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john.doe@example.com"
                        value={guideEmail}
                        onChange={(e) => setGuideEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="0400 000 000"
                        value={guidePhone}
                        onChange={(e) => setGuidePhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={guideSubmitting}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {guideSubmitting ? "Sending..." : "Download Guide"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto rounded-full border border-emerald-100">
                    ✓
                  </div>
                  <h3 className="text-[#0B1F3A] text-[20px] font-black font-montserrat">
                    Guide Requested Successfully!
                  </h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed max-w-sm mx-auto">
                    We have sent the Home Loan Comparison Guide to your inbox. Check your email details shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialSection badgeText="Google Reviews" />

      {/* FAQs SECTION */}
      <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-rose-700">FAQ Helpdesk</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4 font-montserrat">
                Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">We Have Answers</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-sm">
                Everything you need to know about comparing home loans and saving on repayments.
              </p>

              <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
                <h4 className="text-[16px] font-extrabold text-[#0B1F3A]">Want to compare specific lender products?</h4>
                <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed">
                  Different banks offer varying interest rates, offset structures, and fees. Our experienced mortgage brokers compare products across 30+ lenders to locate the best home loan for your financial setup.
                </p>
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-[13px] font-bold px-6 py-3 shadow-lg shadow-rose-500/10 transition-all duration-300"
                  >
                    Talk to a Broker
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Accordion */}
            <div className="space-y-3.5">
              {[
                {
                  q: "What is the difference between standard and comparison interest rates?",
                  a: "The standard rate is the base interest rate applied to your loan balance. The comparison rate is a statutory rate that factors in standard upfront and ongoing fees (like package fees) in addition to the base interest, giving a more accurate representation of the true annual cost."
                },
                {
                  q: "How does payment frequency impact my total interest paid?",
                  a: "Making weekly or fortnightly repayments can reduce your total interest cost. Because interest is calculated daily, making more frequent payments reduces the principal balance faster. Additionally, choosing accelerated fortnightly payments results in paying the equivalent of one extra monthly repayment each year."
                },
                {
                  q: "Is it better to choose a basic loan or a package loan with an offset account?",
                  a: "A basic loan offers lower interest rates with fewer features, which is great if you don't save excess cash. A package loan usually has an annual fee but provides a 100% offset account, which allows your savings to directly reduce the loan balance subject to daily interest calculation."
                },
                {
                  q: "Can I refinance to a cheaper loan rate instantly?",
                  a: "Yes, you can refinance to switch lenders or products to secure a cheaper rate. However, you should evaluate exit fees, discharge costs, and application fees against the monthly savings to ensure refinancing is financially feasible."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-[#0B1F3A] text-[13.5px] sm:text-[14.5px] hover:text-[#E11D48] transition-colors"
                  >
                    <span className="pr-4 leading-tight">{faq.q}</span>
                    <div className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/60 transition-transform ${openFaqIndex === idx ? "rotate-180 text-[#E11D48]" : ""}`}>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                  <div className={`transition-all duration-350 overflow-hidden ${openFaqIndex === idx ? "max-h-[300px] border-t border-slate-100" : "max-h-0"}`}>
                    <p className="p-5 text-slate-500 text-[12.5px] sm:text-[13px] leading-relaxed bg-slate-50/30">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ENQUIRY CONTACT FORM SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2">
                <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-rose-700 text-[10px] font-bold tracking-widest uppercase">Start Your Assessment</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight font-montserrat">
                Let Us Help You Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 font-black">Lenders & Products</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed font-medium">
                Send us your enquiry details today. Our specialized mortgage brokers will review your comparison options and guide you toward the most cost-effective solution within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#0B1F3A]">Quick Turnaround</h4>
                    <p className="text-slate-500 text-[11.5px]">Our brokers deliver comprehensive comparison reports in 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#0B1F3A]">Direct Verification</h4>
                    <p className="text-slate-500 text-[11.5px]">We compare products from 30+ major and non-conforming lenders.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
              {!enquirySubmitted ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black font-montserrat">
                    Enquiry Form
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="surname">Surname</label>
                      <input
                        type="text"
                        id="surname"
                        name="surname"
                        required
                        placeholder="Doe"
                        value={formData.surname}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="0400 000 000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      placeholder="Type your query or question here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    By clicking &apos;Submit Enquiry&apos;, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert&apos;s brokers.
                  </p>

                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submittingEnquiry ? "Submitting..." : "Submit Enquiry"} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto rounded-full border border-emerald-100">
                    ✓
                  </div>
                  <h3 className="text-[#0B1F3A] text-[20px] font-black font-montserrat">
                    Enquiry Submitted Successfully!
                  </h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed max-w-sm mx-auto">
                    Thank you for contacting Mortgage Xperts. One of our specialists will review your details and reach out within 24 hours.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </div>
  );
}
