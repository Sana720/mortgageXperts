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
  AlertCircle,
  FileText,
  Users,
  Clock,
  Star,
  Check,
  Wallet,
  Coins,
  Landmark,
  Printer,
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

interface ScheduledRepaymentsResult {
  monthlyRepayment: number;
  weeklyRepayment: number;
  fortnightlyRepayment: number;
  interestOnlyRepayment: number;
  totalInterest: number;
  totalPayments: number;
  years: number;
  balanceHistory: number[];
}

interface ExtraRepaymentsResult {
  totalInterest: number;
  totalPayments: number;
  years: number;
  balanceHistory: number[];
  interestSaved: number;
  yearsSaved: number;
  monthsSaved: number;
}

interface CalculatorResults {
  scheduled: ScheduledRepaymentsResult;
  extra: ExtraRepaymentsResult;
}

// Premium Framer Motion presets
const premiumStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const premiumFadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

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

const getAvatarStyle = (name: string) => {
  const char = name.trim().charAt(0).toUpperCase() || "M";
  const colors = [
    "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#FF9800", "#FF5722", "#795548", "#607D8B"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  return {
    bg: colors[colorIndex],
    letter: char
  };
};

function GoogleReviewCard({ name, role, text }: { name: string; role: string; text: string }) {
  const avatarInfo = getAvatarStyle(name);
  return (
    <div className="w-[310px] sm:w-[360px] shrink-0 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mx-3 flex flex-col gap-3.5 text-left select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-inner uppercase"
            style={{ backgroundColor: avatarInfo.bg }}
          >
            {avatarInfo.letter}
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#0B1F3A] leading-tight">{name}</h4>
            <span className="text-[10px] text-slate-500 font-medium">{role}</span>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-[12px] text-slate-500 leading-relaxed italic line-clamp-5">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

export function ClientPage({ settings = {}, pageHeroSettings }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings }) {
  // Step form state: 1 = Loan Details, 2 = Extras & Fees, 3 = Property Report Form, 4 = Results Dashboard
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Calculator Form State
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [interestRate, setInterestRate] = useState<number>(6.0);
  const [loanTerm, setLoanTerm] = useState<number>(2);
  const [lumpSum, setLumpSum] = useState<number>(0);
  const [extraPayment, setExtraPayment] = useState<number>(0);
  const [extraFrequency, setExtraFrequency] = useState<string>("Monthly");
  const [annualFee, setAnnualFee] = useState<number>(0);
  const [monthlyFee, setMonthlyFee] = useState<number>(0);

  // Integrated Calculator Lead Form State
  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcLeadAddress, setCalcLeadAddress] = useState("");
  const [calcLeadSubmitting, setCalcLeadSubmitting] = useState(false);

  // Math simulation output
  const [results, setResults] = useState<CalculatorResults | null>(null);

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

  // Property Report Lead Form Modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportName, setReportName] = useState("");
  const [reportEmail, setReportEmail] = useState("");
  const [reportPhone, setReportPhone] = useState("");
  const [reportAddress, setReportAddress] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Custom visual state
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Dynamic calculations
  const calculateRepayments = () => {
    const rateFraction = interestRate / 100;
    const r_m = rateFraction / 12;
    const n_m = loanTerm * 12;

    // Monthly scheduled P&I base repayment
    const monthlyRepaymentBase = r_m > 0
      ? (loanAmount * r_m * Math.pow(1 + r_m, n_m)) / (Math.pow(1 + r_m, n_m) - 1)
      : loanAmount / n_m;

    // Include fees
    const monthlyRepayment = monthlyRepaymentBase + monthlyFee + (annualFee / 12);
    const weeklyRepayment = (monthlyRepaymentBase * 12) / 52 + (monthlyFee * 12 / 52) + (annualFee / 52);
    const fortnightlyRepayment = (monthlyRepaymentBase * 12) / 26 + (monthlyFee * 12 / 26) + (annualFee / 26);
    const interestOnlyRepayment = (loanAmount * r_m) + monthlyFee + (annualFee / 12);

    // Convert extra payments to monthly equivalents
    let extraMonthlyEquivalent = 0;
    if (extraFrequency === "Weekly") {
      extraMonthlyEquivalent = (extraPayment * 52) / 12;
    } else if (extraFrequency === "Fortnightly") {
      extraMonthlyEquivalent = (extraPayment * 26) / 12;
    } else {
      extraMonthlyEquivalent = extraPayment;
    }

    // ── Scheduled Path Simulation ──
    let balSch = loanAmount;
    let totalInterestSch = 0;
    let totalPaymentsSch = 0;
    const schHistory: number[] = [loanAmount];

    for (let m = 1; m <= n_m; m++) {
      const interest = balSch * r_m;
      const principalPaid = Math.min(balSch, monthlyRepaymentBase - interest);
      balSch -= principalPaid;
      totalInterestSch += interest;
      totalPaymentsSch += (principalPaid + interest);

      if (m % 12 === 0) {
        totalPaymentsSch += annualFee;
      }
      totalPaymentsSch += monthlyFee;

      if (m % 12 === 0 || m === n_m) {
        schHistory.push(Math.max(0, balSch));
      }
    }

    // ── Extra Repayments Path Simulation ──
    let balExt = Math.max(0, loanAmount - lumpSum);
    let totalInterestExt = 0;
    let totalPaymentsExt = lumpSum;
    let extMonths = 0;
    const extHistory: number[] = [Math.max(0, loanAmount - lumpSum)];

    for (let m = 1; m <= n_m; m++) {
      if (balExt <= 0) {
        if (m % 12 === 0) {
          extHistory.push(0);
        }
        continue;
      }

      extMonths = m;
      const interest = balExt * r_m;
      const rawPayment = monthlyRepaymentBase + extraMonthlyEquivalent;
      const principalPaid = Math.min(balExt, rawPayment - interest);
      balExt -= principalPaid;
      totalInterestExt += interest;
      totalPaymentsExt += (principalPaid + interest);

      if (m % 12 === 0) {
        totalPaymentsExt += annualFee;
      }
      totalPaymentsExt += monthlyFee;

      if (m % 12 === 0 || m === n_m) {
        extHistory.push(Math.max(0, balExt));
      }
    }

    // Align histories
    while (extHistory.length < schHistory.length) {
      extHistory.push(0);
    }

    const monthsSaved = Math.max(0, n_m - extMonths);
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remMonthsSaved = monthsSaved % 12;
    const interestSaved = Math.max(0, totalInterestSch - totalInterestExt);

    setResults({
      scheduled: {
        monthlyRepayment,
        weeklyRepayment,
        fortnightlyRepayment,
        interestOnlyRepayment,
        totalInterest: totalInterestSch,
        totalPayments: totalPaymentsSch,
        years: loanTerm,
        balanceHistory: schHistory
      },
      extra: {
        totalInterest: totalInterestExt,
        totalPayments: totalPaymentsExt,
        years: extMonths / 12,
        balanceHistory: extHistory,
        interestSaved,
        yearsSaved,
        monthsSaved: remMonthsSaved
      }
    });
  };

  // Run calculation on load
  useEffect(() => {
    calculateRepayments();
  }, []);

  const handleReset = () => {
    setLoanAmount(800000);
    setInterestRate(6.0);
    setLoanTerm(2);
    setLumpSum(0);
    setExtraPayment(0);
    setExtraFrequency("Monthly");
    setAnnualFee(0);
    setMonthlyFee(0);
    setCurrentStep(1);
    setTimeout(() => {
      calculateRepayments();
    }, 50);
  };

  // Form Submissions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuideSubmitting(true);
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "loan-repayment-guide",
          name: guideName,
          email: guideEmail,
          phone: guidePhone,
          message: "Request for Loan Repayment Guide"
        })
      });
      setGuideSubmitted(true);
    } catch (error) {
      console.error("Failed to request guide:", error);
    } finally {
      setGuideSubmitting(false);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingEnquiry(true);
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "repayment-enquiry",
          name: `${formData.name} ${formData.surname}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });
      setEnquirySubmitted(true);
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitting(true);
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "property-report",
          name: reportName,
          email: reportEmail,
          phone: reportPhone,
          message: `Request for Free Property Report for address: ${reportAddress}`
        })
      });
      setReportSubmitted(true);
    } catch (error) {
      console.error("Failed to request property report:", error);
    } finally {
      setReportSubmitting(false);
    }
  };

  const handleCalcLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalcLeadSubmitting(true);
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "property-report-calculator",
          name: calcLeadName,
          email: calcLeadEmail,
          phone: calcLeadPhone,
          message: `Request for Free Property Report for address: ${calcLeadAddress} (generated via Repayments Calculator)`
        })
      });
    } catch (error) {
      console.error("Failed to submit calculator lead:", error);
    } finally {
      setCalcLeadSubmitting(false);
      calculateRepayments();
      setCurrentStep(4);
    }
  };

  // Chart Interaction Handlers
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!results || !chartPaths.count) return;
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

  // PDF Export Logic
  const downloadReportPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");
      
      const element = document.getElementById("printable-report-area");
      if (!element) return;
      
      // Setup printable element offscreen for rendering
      element.style.setProperty("display", "block", "important");
      element.style.setProperty("position", "absolute", "important");
      element.style.setProperty("left", "0px", "important");
      element.style.setProperty("top", "-9999px", "important");
      element.style.setProperty("width", "800px", "important");
      element.style.setProperty("background-color", "#FFFFFF", "important");
      
      const canvas = await html2canvas(element, {
        scale: 2, // Double resolution for crisp PDF
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF"
      });
      
      // Reset DOM element styles
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
      pdf.save(`Mortgage_Repayments_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // SVG Chart points calculation
  const chartPaths = useMemo(() => {
    const width = 600;
    const height = 280;
    const padLeft = 55;
    const padRight = 25;
    const padTop = 25;
    const padBottom = 35;
    
    if (!results) {
      return {
        schPath: "",
        extPath: "",
        schAreaPath: "",
        extAreaPath: "",
        width,
        height,
        padLeft,
        padRight,
        padTop,
        padBottom,
        getX: (_idx: number) => 0,
        getY: (_val: number) => 0,
        count: 0
      };
    }
    
    const historySch = results.scheduled.balanceHistory;
    const historyExt = results.extra.balanceHistory;
    const maxVal = loanAmount;
    const count = historySch.length;

    const getX = (idx: number) => padLeft + (idx / (count - 1)) * (width - padLeft - padRight);
    const getY = (val: number) => height - padBottom - (val / maxVal) * (height - padBottom - padTop);

    const schPoints = [];
    const extPoints = [];
    for (let i = 0; i < count; i++) {
      schPoints.push(`${getX(i)},${getY(historySch[i])}`);
      extPoints.push(`${getX(i)},${getY(historyExt[i])}`);
    }

    const schAreaPoints = [
      `${getX(0)},${height - padBottom}`,
      ...schPoints,
      `${getX(count - 1)},${height - padBottom}`
    ];
    const extAreaPoints = [
      `${getX(0)},${height - padBottom}`,
      ...extPoints,
      `${getX(count - 1)},${height - padBottom}`
    ];

    return {
      schPath: `M ${schPoints.join(" L ")}`,
      extPath: `M ${extPoints.join(" L ")}`,
      schAreaPath: `M ${schAreaPoints.join(" L ")} Z`,
      extAreaPath: `M ${extAreaPoints.join(" L ")} Z`,
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
  }, [results, loanAmount]);

  const testimonials = [
    { name: "Sudeep P.", role: "Perth WA | Investment Portfolio", text: "I was looking to expand my property portfolio and buy my fourth investment property in Queensland, but the process felt complex. Aakash at Mortgage Xperts, a trusted Nepali mortgage broker in Australia, guided me through every step, helping me secure the best investment loan and save thousands in interest. His expert advice, professionalism, and personalised support made the process smooth and stress-free." },
    { name: "Reecha M.", role: "Baldivis, WA | First Home Buyer", text: "As a first-time home buyer, I was nervous about saving for a deposit - until I found Aakash at Mortgage Xperts, a trusted Nepali mortgage broker Australia-wide. With their expert guidance, I was able to secure a home loan with just a 5% deposit. The process was smooth, and I now have complete peace of mind. I highly recommend Mortgage Xperts to any Nepali Australian looking to buy a home anywhere in Australia." },
    { name: "Manish Parajuli", role: "Wollert Melbourne | First Home & Investor", text: "Aakash, a best Nepali mortgage broker in Australia, and the team at Mortgage Xperts helped me refinance my investment property portfolio and saved me thousands in interest. Their expert knowledge of home loans, refinancing, and the Australian property market is outstanding. They go the extra mile to provide personalised guidance." },
    { name: "Sandeep & Priya", role: "Ellenbrook | First Home Buyer | Guarantee Scheme", text: "We had some challenges with our credit history, so we weren’t sure how we could get a home loan. Aakash, a trusted Nepali mortgage broker at Mortgage Xperts, was incredibly helpful. He explained everything in simple terms, guided us through the process, and helped us get approved for our first home." },
    { name: "Amrita R.", role: "Sydney NSW | Successful Investor", text: "I wanted to expand my property portfolio, but navigating investment loans in Australia felt complicated. Aakash at Mortgage Xperts provided expert guidance on investment finance and helped me secure the best possible loan for my situation. Their personalised approach saved me thousands in interest." },
    { name: "Arnold Santiago", role: "Wembley WA | Nurse Home Buyer", text: "As a nurse looking to buy my first home in Melbourne, I thought I’d need to save a huge deposit and pay Lenders Mortgage Insurance (LMI). Then I found Aakash at Mortgage Xperts. With his expert guidance, I was able to secure a home loan with just a 10% deposit and no LMI. What amazed me even more is that he helped me explore investment opportunities at the same time." },
    { name: "Sarah L.", role: "Brisbane QLD | First Home - Construction Loan", text: "Buying a house and land package in Brisbane felt overwhelming, and I didn’t know where to start with my first home loan. Aakash at Mortgage Xperts guided me through every step, explained all my options, and helped me secure the best loan for my situation. His expert knowledge of home loans made the process stress-free." },
    { name: "David K.", role: "Adelaide SA | First Home Buyer", text: "As a first-time buyer in Adelaide, I was worried about making mistakes. Thanks to Aakash and Mortgage Xperts, the process was smooth and stress-free. I got a great loan and complete peace of mind. If you’re a Nepali Australian looking for a trusted mortgage broker in Adelaide, now is the time to contact Mortgage Xperts." },
    { name: "Emma W.", role: "Hobart TAS | First Home Buyer", text: "Buying my first home in Hobart felt overwhelming, but Aakash at Mortgage Xperts, a trusted Nepali mortgage broker Australia, made the entire process simple and stress-free. His expert guidance and personalised support helped me secure the right home loan with confidence." },
    { name: "Sakuntala Pradhan", role: "Canberra ACT", text: "I was nervous about buying my first home in Canberra, but Aakash at Mortgage Xperts, a trusted Nepali mortgage broker Australia, gave me the confidence I needed. He guided me through every step, found the best home loan for my situation, and explained everything in plain English." },
    { name: "Olivia M.", role: "Darwin NT | First Home Buyers", text: "Getting my first home loan in Darwin felt complicated, but Aakash at Mortgage Xperts, a trusted Nepali mortgage broker Australia, made the entire process clear and easy. With his expert guidance, I secured the right home loan and felt confident every step of the way." },
    { name: "Rupa Acharya", role: "Kellyville, NSW | Investment Property Loan", text: "I can’t recommend Aakash enough! As a trusted Nepali mortgage broker Australia, he was knowledgeable, approachable, and incredibly responsive throughout the entire loan process in Sydney. He went above and beyond to ensure everything went smoothly, provided excellent advice, and was always available." },
    { name: "Santosh B Thapa", role: "Wellard WA | Refinance | Investment Loans", text: "Our mortgage broker, Aakash at Mortgage Xperts, was absolutely wonderful to work with. As a trusted Nepali mortgage broker Australia, he carefully listened to our needs, explained everything clearly, and guided us through each step with patience and professionalism in Perth." },
    { name: "Amit P.", role: "Canberra ACT | Designation", text: "Aakash at Mortgage Xperts has been an absolute lifesaver. As a trusted Nepali mortgage broker Australia, he took the time to walk us through everything, answered all our questions with patience, and ensured we understood each step of the home loan process in Melbourne." },
    { name: "Roshan K.", role: "Queensland | First Home Buyers", text: "Aakash at Mortgage Xperts made buying my first home in Queensland completely stress-free. As a trusted Nepali mortgage broker in Australia, he patiently guided me through every step, answered all my questions, and helped me secure the best possible home loan." }
  ];

  const defaultHeroSettings = {
    hero_badge: "Mortgage Repayment Calculator",
    hero_title: "Understand Your Repayments",
    hero_subtext: "Estimate your weekly, fortnightly, or monthly home loan repayments. See how interest accumulates and discover how extra repayments could help you save thousands and pay off your mortgage sooner.",
    hero_image: "/images/repayment_hero.png",
    hero_btn1_text: "Start Calculating",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to an Expert",
    hero_btn2_link: "#enquiry-form"
  };

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
      <SubPageHero pageTitle="Loan Repayment Calculator" pageHeroSettings={pageHeroSettings || defaultHeroSettings} />

      {/* CALCULATOR TOOL SECTION (Redesigned with Content on Left, Compact Form on Right) */}
      <section id="calculator-tool" className="py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative border-b border-slate-100 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute right-[-10%] top-[10%] w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-[-5%] bottom-[15%] w-[350px] h-[350px] bg-indigo-500/40 opacity-10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Rich Mortgage Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Plan Your Repayments & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Save Years in Interest</span>
              </h2>
              <div className="w-12 h-[3px] bg-blue-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                Determining your scheduled mortgage obligations and structuring extra contributions correctly is crucial to reducing interest expense. Our compact tool evaluates your variables in three distinct phases.
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Choose Payment Frequency</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Align repayments with weekly, fortnightly, or monthly cycles to match your personal cashflow.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Simulate Extra Contributions</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Model single lump sum inputs or recurring extra payments to find out how quickly you can pay off the mortgage.</p>
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
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Incorporate Real Mortgage Fees</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Account for annual and monthly lender account servicing fees to display the overall actual financial commitments.</p>
                  </div>
                </motion.div>
              </div>
            </div>
 
            {/* Right Column: Compact 4-Step Wizard Calculator (Results inside Step 4) */}
            <div className="lg:col-span-6 flex justify-end no-print">
              <div className="w-full max-w-[500px] bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col transition-all duration-300 relative overflow-hidden">
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full opacity-50 pointer-events-none" />
 
                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 ease-out" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
 
                {/* Header Step indicators */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-black text-white transition-all ${currentStep >= 3 ? 'bg-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.3)]' : 'bg-blue-600 shadow-[0_2px_8px_rgba(37,99,235,0.3)]'}`}>
                      {currentStep >= 3 ? "✓" : currentStep}
                    </span>
                    <h3 className="text-[13px] font-bold text-slate-700 font-montserrat">
                      {currentStep === 1 && "Step 1: Core Parameters"}
                      {currentStep === 2 && "Step 2: Extras & Fees"}
                      {currentStep >= 3 && "Repayment Results"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{currentStep < 3 ? `Step ${currentStep} of 2` : "Results"}</span>
                </div>
 
                {/* Wizard Body content */}
                <div className="flex-1 flex flex-col">
                  
                  {/* Step 1: Core Parameters */}
                  {currentStep === 1 && (
                    <div className="space-y-4 py-2">
                      {/* Loan Amount */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="loan-amount">Loan Amount ($)</label>
                          <span className="text-blue-600 font-black text-[13.5px]">${loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="loan-amount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                          />
                        </div>
                      </div>
 
                      {/* Interest Rate */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="interest-rate">Interest Rate (% p.a.)</label>
                          <span className="text-blue-600 font-black text-[13.5px]">{interestRate}%</span>
                        </div>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">%</div>
                          <input
                            type="number"
                            id="interest-rate"
                            step="0.01"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-4 pr-8 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                          />
                        </div>
                      </div>
 
                      {/* Loan Term */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="loan-term">Loan Term (Years)</label>
                          <span className="text-blue-600 font-black text-[13.5px]">{loanTerm} Years</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            id="loan-term"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Math.max(1, Math.min(40, Number(e.target.value))))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}
 
                  {/* Step 2: Extras & Fees */}
                  {currentStep === 2 && (
                    <div className="space-y-3.5 py-2">
                      {/* Lump Sum */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                          <label htmlFor="lump-sum">Lump Sum Payment ($)</label>
                          <span className="text-blue-600 font-black text-[13.5px]">${lumpSum.toLocaleString()}</span>
                        </div>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            id="lump-sum"
                            value={lumpSum}
                            onChange={(e) => setLumpSum(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                          />
                        </div>
                      </div>
 
                      {/* Extra Payments & Frequency */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label htmlFor="extra-payment" className="text-[11px] font-bold text-slate-700 block">Extra Payments ($)</label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs select-none pointer-events-none">$</div>
                            <input
                              type="number"
                              id="extra-payment"
                              value={extraPayment}
                              onChange={(e) => setExtraPayment(Math.max(0, Number(e.target.value)))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="extra-frequency" className="text-[11px] font-bold text-slate-700 block">Frequency</label>
                          <select
                            id="extra-frequency"
                            value={extraFrequency}
                            onChange={(e) => setExtraFrequency(e.target.value)}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer"
                          >
                            <option value="Weekly">Weekly</option>
                            <option value="Fortnightly">Fortnightly</option>
                            <option value="Monthly">Monthly</option>
                          </select>
                        </div>
                      </div>
 
                      {/* Fees */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label htmlFor="annual-fee" className="text-[11px] font-bold text-slate-700">Annual Fees ($)</label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs select-none pointer-events-none">$</div>
                            <input
                              type="number"
                              id="annual-fee"
                              value={annualFee}
                              onChange={(e) => setAnnualFee(Math.max(0, Number(e.target.value)))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="monthly-fee" className="text-[11px] font-bold text-slate-700">Monthly Fees ($)</label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs select-none pointer-events-none">$</div>
                            <input
                              type="number"
                              id="monthly-fee"
                              value={monthlyFee}
                              onChange={(e) => setMonthlyFee(Math.max(0, Number(e.target.value)))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
 
                  {/* Note: Step 3 merged with Results */}
 
                  {/* Step 3: Calculation Results Dashboard */}
                  {currentStep >= 3 && results && (
                    <div className="space-y-3.5 py-1">
                      {/* Repayment values list */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-blue-150 rounded-xl p-2.5 text-center transition-all duration-300">
                          <span className="text-[8.5px] font-black uppercase text-slate-400 tracking-wider">Weekly</span>
                          <div className="text-[14.5px] font-black text-[#0B1F3A] mt-0.5">
                            ${Math.round(results.scheduled.weeklyRepayment).toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-blue-150 rounded-xl p-2.5 text-center transition-all duration-300">
                          <span className="text-[8.5px] font-black uppercase text-slate-400 tracking-wider">Fortnightly</span>
                          <div className="text-[14.5px] font-black text-[#0B1F3A] mt-0.5">
                            ${Math.round(results.scheduled.fortnightlyRepayment).toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center transition-all duration-300">
                          <span className="text-[8.5px] font-black uppercase text-slate-400 tracking-wider">Monthly</span>
                          <div className="text-[14.5px] font-black text-blue-600 mt-0.5">
                            ${Math.round(results.scheduled.monthlyRepayment).toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-indigo-200 rounded-xl p-2.5 text-center transition-all duration-300">
                          <span className="text-[8.5px] font-black uppercase text-slate-400 tracking-wider">Interest Only</span>
                          <div className="text-[14.5px] font-black text-indigo-600 mt-0.5">
                            ${Math.round(results.scheduled.interestOnlyRepayment).toLocaleString()}
                          </div>
                        </div>
                      </div>
 
                      {/* Cumulative summary totals */}
                      <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] border border-blue-900/20 rounded-xl p-3.5 text-white flex justify-between gap-3 text-left shadow-md">
                        <div>
                          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Total Repayments</span>
                          <div className="text-[15px] font-black text-white mt-0.5">
                            ${Math.round(results.scheduled.totalPayments).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Total Interest</span>
                          <div className="text-[15px] font-black text-blue-300 mt-0.5">
                            ${Math.round(results.scheduled.totalInterest).toLocaleString()}
                          </div>
                        </div>
                      </div>
 
                      {/* Savings summary */}
                      {(lumpSum > 0 || extraPayment > 0) && (
                        <div className="bg-emerald-50 border border-emerald-100/70 rounded-xl p-2.5 flex items-start gap-2.5 text-left">
                          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <p className="text-[10.5px] text-emerald-800 leading-normal">
                            Strategy saves <span className="font-extrabold">${Math.round(results.extra.interestSaved).toLocaleString()}</span> interest and cuts term by <span className="font-extrabold">{results.extra.yearsSaved}y {results.extra.monthsSaved > 0 && `${results.extra.monthsSaved}m`}</span>.
                          </p>
                        </div>
                      )}
                       {/* SVG Amortization Curves */}
                      <div className="border border-slate-200/80 rounded-xl p-3 space-y-1.5 bg-slate-50/50 relative">
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="text-slate-700">Remaining Balance Curves</span>
                          <div className="flex gap-2">
                            <span className="text-slate-450">● Scheduled</span>
                            <span className="text-blue-600 font-extrabold">● With Extra</span>
                          </div>
                        </div>
                        <div className="w-full relative">
                          <svg 
                            width={chartPaths.width}
                            height={chartPaths.height}
                            viewBox={`0 0 ${chartPaths.width} ${chartPaths.height}`} 
                            className="w-full h-auto overflow-visible select-none cursor-crosshair"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                          >
                            <defs>
                              <linearGradient id="schGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.0" />
                              </linearGradient>
                              <linearGradient id="extGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            
                            {/* Grid Y lines */}
                            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                              const y = chartPaths.padTop + ratio * (chartPaths.height - chartPaths.padTop - chartPaths.padBottom);
                              const val = (1 - ratio) * loanAmount;
                              return (
                                <g key={ratio} className="opacity-20">
                                  <line 
                                    x1={chartPaths.padLeft} 
                                    y1={y} 
                                    x2={chartPaths.width - chartPaths.padRight} 
                                    y2={y} 
                                    stroke="#64748B" 
                                    strokeWidth="0.5" 
                                    strokeDasharray="3,3" 
                                  />
                                  <text 
                                    x={chartPaths.padLeft - 8} 
                                    y={y + 3} 
                                    textAnchor="end" 
                                    className="fill-slate-550 font-bold text-[8px]"
                                  >
                                    ${Math.round(val / 1000)}k
                                  </text>
                                </g>
                              );
                            })}
                            
                            {/* X-axis labels */}
                            {Array.from({ length: Math.ceil(loanTerm / 5) + 1 }).map((_, idx) => {
                              const yr = idx * 5;
                              if (yr > loanTerm) return null;
                              const valIdx = Math.round((yr / loanTerm) * (chartPaths.count - 1));
                              return (
                                <text 
                                  key={yr} 
                                  x={chartPaths.getX(valIdx)} 
                                  y={chartPaths.height - 10} 
                                  textAnchor="middle" 
                                  className="fill-slate-400 font-bold text-[8px]"
                                >
                                  Yr {yr}
                                </text>
                              );
                            })}
                            
                            {/* Gradients */}
                            <path d={chartPaths.schAreaPath} fill="url(#schGrad)" />
                            <path d={chartPaths.extAreaPath} fill="url(#extGrad)" />
                            
                            {/* Line paths */}
                            <path d={chartPaths.schPath} fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                            <path d={chartPaths.extPath} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                            
                            {/* Hover highlights */}
                            {hoveredYear !== null && results && (
                              <g>
                                <line 
                                  x1={chartPaths.getX(hoveredYear)} 
                                  y1={chartPaths.padTop} 
                                  x2={chartPaths.getX(hoveredYear)} 
                                  y2={chartPaths.height - chartPaths.padBottom} 
                                  stroke="#64748B" 
                                  strokeWidth="1" 
                                  strokeDasharray="4,4" 
                                />
                                <circle 
                                  cx={chartPaths.getX(hoveredYear)} 
                                  cy={chartPaths.getY(results.scheduled.balanceHistory[hoveredYear])} 
                                  r="5" 
                                  fill="#94A3B8" 
                                  stroke="#FFF" 
                                  strokeWidth="1.5" 
                                />
                                <circle 
                                  cx={chartPaths.getX(hoveredYear)} 
                                  cy={chartPaths.getY(results.extra.balanceHistory[hoveredYear])} 
                                  r="6" 
                                  fill="#2563EB" 
                                  stroke="#FFF" 
                                  strokeWidth="2" 
                                />
                              </g>
                            )}
                          </svg>
                          
                          {/* Hover Tooltip Div */}
                          {hoveredYear !== null && results && (
                            <div 
                              className="absolute bg-slate-900/95 backdrop-blur-sm text-white p-2.5 rounded-xl border border-slate-700/50 shadow-xl text-left pointer-events-none transition-all duration-75 z-10 space-y-1 w-[160px]"
                              style={{
                                left: `${Math.min(
                                  Math.max(
                                    10,
                                    (chartPaths.getX(hoveredYear) / chartPaths.width) * 100
                                  ),
                                  90
                                )}%`,
                                top: "15px",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Year {hoveredYear} Balance</div>
                              <div className="text-[10px] font-bold flex justify-between">
                                <span className="text-slate-300">Scheduled:</span>
                                <span className="font-extrabold text-slate-100">${Math.round(results.scheduled.balanceHistory[hoveredYear]).toLocaleString()}</span>
                              </div>
                              {(lumpSum > 0 || extraPayment > 0) && (
                                <div className="text-[10px] font-bold flex justify-between">
                                  <span className="text-blue-300">With Extra:</span>
                                  <span className="font-extrabold text-blue-400">${Math.round(results.extra.balanceHistory[hoveredYear]).toLocaleString()}</span>
                                </div>
                              )}
                              {(lumpSum > 0 || extraPayment > 0) && results.scheduled.balanceHistory[hoveredYear] > results.extra.balanceHistory[hoveredYear] && (
                                <div className="text-[9px] font-bold text-emerald-400 border-t border-slate-800 pt-1 mt-1 flex justify-between">
                                  <span>Saved:</span>
                                  <span>${Math.round(results.scheduled.balanceHistory[hoveredYear] - results.extra.balanceHistory[hoveredYear]).toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100">
                        <button
                          type="button"
                          disabled={isGeneratingPdf}
                          onClick={downloadReportPDF}
                          className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-[11px] py-2 px-3.5 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5" /> {isGeneratingPdf ? "Generating..." : "PDF Report"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="inline-flex items-center gap-1 border border-slate-200 text-slate-700 font-bold text-[11px] py-2 px-3 rounded-lg cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Edit Inputs
                        </button>
                        <Link
                          href="#enquiry-form"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] py-2 px-4.5 rounded-lg text-center font-montserrat"
                        >
                          Talk Broker
                        </Link>
                      </div>
                      {/* Optional Lead Form for full report */}
                      {currentStep === 3 && (
                        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3 mt-4">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">📄 Get Full PDF Report — Enter Details</p>
                          <form onSubmit={(e) => {
                            handleCalcLeadSubmit(e);
                          }} className="space-y-2">
                            <input
                              type="text"
                              id="calc-lead-name"
                              required
                              placeholder="Full Name*"
                              value={calcLeadName}
                              onChange={(e) => setCalcLeadName(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="email"
                                id="calc-lead-email"
                                required
                                placeholder="Email*"
                                value={calcLeadEmail}
                                onChange={(e) => setCalcLeadEmail(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                              />
                              <input
                                type="tel"
                                id="calc-lead-phone"
                                required
                                placeholder="Phone*"
                                value={calcLeadPhone}
                                onChange={(e) => setCalcLeadPhone(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={calcLeadSubmitting}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[12px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 transition-colors"
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
                            className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer"
                          >
                            <Printer className="w-4 h-4 shrink-0" />
                            <span>Print Report</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={handleReset}
                            className="border border-blue-600 text-blue-700 bg-white hover:bg-blue-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                          >
                            Start Over
                          </button>
                        </div>
                      )}
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
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          Next: Extras & Fees <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {currentStep === 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            calculateRepayments();
                            setCurrentStep(3);
                          }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/15 transition-colors"
                        >
                          Calculate Repayments <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <p className="text-[9.5px] text-slate-400 leading-relaxed pt-2.5 border-t border-slate-100 mt-2">
                    Disclaimer: This is an estimate only. Calculations depend on interest compounds and lender variables. Consult a specialist for formal analysis.
                  </p>
                )}
 
              </div>
            </div>

          </div>
          {/* ── PRINT-ONLY RESULTS VIEW (Isolates calculator data specifically for print) ── */}
      {results && (
        <div id="printable-report-area" className="p-8 font-inter text-slate-800 bg-white" style={{ width: "800px" }}>
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-blue-600 pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
              <p className="text-[9px] text-slate-550 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Home Loan Specialists</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
                Repayment Report
              </span>
              <p className="text-[10px] text-slate-400 font-bold">Generated: {new Date().toLocaleDateString("en-AU")}</p>
            </div>
          </div>

          {/* Key Metrics Dashboard */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Loan Amount</span>
              <div className="text-sm font-black text-[#0B1F3A] mt-0.5">${loanAmount.toLocaleString()}</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Interest Rate</span>
              <div className="text-sm font-black text-[#0B1F3A] mt-0.5">{interestRate}% p.a.</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Monthly Repayment</span>
              <div className="text-sm font-black text-blue-600 mt-0.5">${Math.round(results.scheduled.monthlyRepayment).toLocaleString()}</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-3 bg-emerald-50 border-emerald-100 text-center">
              <span className="text-[9px] font-black uppercase text-emerald-600 tracking-wider">Interest Saved</span>
              <div className="text-sm font-black text-emerald-700 mt-0.5">
                ${(lumpSum > 0 || extraPayment > 0) ? Math.round(results.extra.interestSaved).toLocaleString() : "0"}
              </div>
            </div>
          </div>

          {/* Two-Column Grid: Details vs Graph */}
          <div className="grid grid-cols-12 gap-6 mb-6 items-start">
            {/* Input & Output Parameters Table */}
            <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
              <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Scenario Parameters</h3>
              <table className="w-full text-[11px] font-bold text-slate-600">
                <tbody className="divide-y divide-slate-100">
                  <tr className="py-2 flex justify-between">
                    <td>Loan Term:</td>
                    <td className="text-[#0B1F3A] font-black">{loanTerm} Years</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Payment Frequency:</td>
                    <td className="text-[#0B1F3A] font-black">Monthly</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Lump Sum Payment:</td>
                    <td className="text-[#0B1F3A] font-black">${lumpSum.toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Extra Payments:</td>
                    <td className="text-[#0B1F3A] font-black">${extraPayment.toLocaleString()} ({extraFrequency})</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Weekly Repayment:</td>
                    <td className="text-[#0B1F3A] font-black">${Math.round(results.scheduled.weeklyRepayment).toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Fortnightly Repayment:</td>
                    <td className="text-[#0B1F3A] font-black">${Math.round(results.scheduled.fortnightlyRepayment).toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Interest Only Repayment:</td>
                    <td className="text-[#0B1F3A] font-black">${Math.round(results.scheduled.interestOnlyRepayment).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Static PDF Graph */}
            <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25 text-center">
              <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-2.5 font-montserrat uppercase tracking-wider">Amortization Projection</h3>
              <div className="w-full flex justify-center">
                <svg 
                  width="330" 
                  height="160" 
                  viewBox={`0 0 ${chartPaths.width} ${chartPaths.height}`} 
                  className="overflow-visible select-none"
                >
                  <defs>
                    <linearGradient id="pdfSchGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="pdfExtGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  {[0, 0.5, 1].map((ratio) => {
                    const y = chartPaths.padTop + ratio * (chartPaths.height - chartPaths.padTop - chartPaths.padBottom);
                    const val = (1 - ratio) * loanAmount;
                    return (
                      <g key={ratio} className="opacity-25">
                        <line x1={chartPaths.padLeft} y1={y} x2={chartPaths.width - chartPaths.padRight} y2={y} stroke="#64748B" strokeWidth="0.8" strokeDasharray="3,3" />
                        <text x={chartPaths.padLeft - 8} y={y + 3} textAnchor="end" className="fill-slate-550 font-bold text-[10px]">${Math.round(val / 1000)}k</text>
                      </g>
                    );
                  })}
                  {/* X labels */}
                  {[0, 15, 30].map((yr) => {
                    if (yr > loanTerm) return null;
                    const valIdx = Math.round((yr / loanTerm) * (chartPaths.count - 1));
                    return (
                      <text key={yr} x={chartPaths.getX(valIdx)} y={chartPaths.height - 8} textAnchor="middle" className="fill-slate-400 font-bold text-[9px]">Yr {yr}</text>
                    );
                  })}
                  
                  {/* Gradients */}
                  <path d={chartPaths.schAreaPath} fill="url(#pdfSchGrad)" />
                  <path d={chartPaths.extAreaPath} fill="url(#pdfExtGrad)" />
                  
                  {/* Line paths */}
                  <path d={chartPaths.schPath} fill="none" stroke="#CBD5E1" strokeWidth="2.5" />
                  <path d={chartPaths.extPath} fill="none" stroke="#2563EB" strokeWidth="3" />
                </svg>
              </div>
              <div className="flex justify-center gap-4 text-[9px] font-black text-slate-500 mt-2">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-350 rounded-full inline-block"></span> Scheduled Repayments</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span> With Extra Repayments</span>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
            <table className="w-full border-collapse text-left text-[11px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-[#0B1F3A] font-bold font-montserrat uppercase tracking-wider">
                  <th className="p-3">Calculation Scenario</th>
                  <th className="p-3 text-right">Total Payments</th>
                  <th className="p-3 text-right">Total Interest Paid</th>
                  <th className="p-3 text-right">Actual Term</th>
                  <th className="p-3 text-right text-emerald-700">Total Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600 font-semibold">
                <tr>
                  <td className="p-3 font-extrabold text-[#0B1F3A]">Standard Scheduled Repayments</td>
                  <td className="p-3 text-right">${Math.round(results.scheduled.totalPayments).toLocaleString()}</td>
                  <td className="p-3 text-right">${Math.round(results.scheduled.totalInterest).toLocaleString()}</td>
                  <td className="p-3 text-right">{results.scheduled.years} Years</td>
                  <td className="p-3 text-right text-slate-400">-</td>
                </tr>
                <tr className="bg-blue-50/10">
                  <td className="p-3 font-extrabold text-blue-600">With Extra & Lump Sums</td>
                  <td className="p-3 text-right">${Math.round(results.extra.totalPayments).toLocaleString()}</td>
                  <td className="p-3 text-right">${Math.round(results.extra.totalInterest).toLocaleString()}</td>
                  <td className="p-3 text-right">{(results.extra.years).toFixed(1)} Years</td>
                  <td className="p-3 text-right text-emerald-600 font-extrabold">
                    ${Math.round(results.extra.interestSaved).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Strategy Summary Statement */}
          {(lumpSum > 0 || extraPayment > 0) && (
            <div className="bg-emerald-50 border border-emerald-250 rounded-xl p-3.5 mb-6">
              <h4 className="text-[11px] font-black text-emerald-800 uppercase tracking-wider mb-0.5">Strategy Outcome</h4>
              <p className="text-[11px] text-emerald-900 leading-normal font-bold">
                By making a lump sum of <span className="font-extrabold">${lumpSum.toLocaleString()}</span> and ongoing extra contributions of <span className="font-extrabold">${extraPayment.toLocaleString()} per {extraFrequency.toLowerCase().replace("ly", "")}</span>, you will pay off your mortgage <span className="text-emerald-950 underline font-black">{results.extra.yearsSaved} years {results.extra.monthsSaved > 0 && `and ${results.extra.monthsSaved} months`} sooner</span> and save <span className="text-emerald-950 underline font-black">${Math.round(results.extra.interestSaved).toLocaleString()}</span> in total interest expense.
              </p>
            </div>
          )}

          {/* Contact Details & Signature Banner */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/10 grid grid-cols-2 gap-4 items-center mb-6">
            <div>
              <h4 className="text-[11px] font-black text-[#0B1F3A] uppercase tracking-wider">Ready to review your home loan options?</h4>
              <p className="text-[9.5px] text-slate-550 leading-relaxed mt-0.5 font-bold">
                Our mortgage brokerage offers 100% free and zero-obligation consultations to compare interest rates across 30+ lenders in Australia.
              </p>
            </div>
            <div className="text-[10px] text-slate-700 font-bold border-l border-slate-200 pl-4 space-y-1">
              <div><strong className="text-[#0B1F3A]">Mortgage Xperts Team</strong></div>
              <div>Web: <span className="text-blue-600">www.mortgagexperts.com.au</span></div>
              <div>Nepal-Australia Home Loan Specialists</div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-slate-200 pt-4 text-center text-[8.5px] text-slate-400 leading-normal font-medium font-bold">
            Disclaimer: This report is a general illustration based on standard compound interest calculations and input variables. Actual repayment amounts, fees, and parameters will vary depending on your specific loan product, interest rate changes, and individual financial eligibility. Mortgage Xperts suggests consulting with our qualified brokers before acting on this information.
          </div>
        </div>
      )}
        </div>
      </section>

      {/* ROADMAP / GUIDE DOWNLOAD SECTION (py-5 lg:py-10 viewport-fitting logic) */}
      <section className="py-5 lg:py-10 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit block">
                Guide Download
              </span>
              <h2 className="text-[#0B1F3A] text-[24px] sm:text-[30px] font-black leading-tight font-montserrat">
                Your roadmap to smarter mortgage repayments
              </h2>
              <p className="text-slate-500 text-[13.5px] leading-relaxed">
                Learn how to cut years off your mortgage and save thousands in interest with our simple repayment strategies. Our guide breaks down loan structures, payment frequency tricks, offset accounts, and redraw setups.
              </p>

              <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 flex items-start gap-3.5 max-w-md">
                <FileText className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13.5px] font-black text-[#0B1F3A]">Loan Repayment Guide</h4>
                  <p className="text-slate-500 text-[11.5px] leading-relaxed mt-0.5">
                    Find our checklist to maximize your chances of securing a loan, choosing the right structures, and applying our repayment templates.
                  </p>
                </div>
              </div>
            </div>

            {/* Guide Request Form */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 text-[#0B1F3A]">
              {!guideSubmitted ? (
                <form onSubmit={handleGuideSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="guide-name">Full Name*</label>
                    <input
                      type="text"
                      id="guide-name"
                      required
                      value={guideName}
                      onChange={(e) => setGuideName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="guide-email">Email Address*</label>
                    <input
                      type="email"
                      id="guide-email"
                      required
                      value={guideEmail}
                      onChange={(e) => setGuideEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="guide-phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="guide-phone"
                      required
                      value={guidePhone}
                      onChange={(e) => setGuidePhone(e.target.value)}
                      placeholder="e.g. 0400 123 456"
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={guideSubmitting}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
                  >
                    {guideSubmitting ? "Sending..." : "Get the Guide"}
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto rounded-full">
                    ✓
                  </div>
                  <h3 className="text-[#0B1F3A] text-[18px] font-black">Thank you!</h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed max-w-sm mx-auto">
                    Your Loan Repayment Guide request was successful. Check your inbox shortly.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION (py-5 lg:py-10 viewport-fitting logic) */}
      <section className="py-5 lg:py-10 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit block">
                FAQ Helpdesk
              </span>
              <h2 className="text-[#0B1F3A] text-[24px] sm:text-[30px] font-black leading-tight mt-3 mb-2 font-montserrat">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Questions</span>
              </h2>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Here are the answers to the most common queries regarding deposit guidelines, Lenders Mortgage Insurance, and co-borrowing in Australia.
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  q: "How much deposit do I need to buy my first home?",
                  a: "Typically, you need a minimum of 5% of the property purchase price as a deposit, plus extra to cover costs like stamp duty, legal fees, and loan setup fees. Some government schemes allow you to buy with 5% deposit without paying LMI, otherwise if deposit is below 20% LMI usually applies."
                },
                {
                  q: "What is Lenders Mortgage Insurance (LMI)?",
                  a: "Lenders Mortgage Insurance (LMI) is a one-off premium charged by lenders if you borrow more than 80% of the property value. It protects the lender in the event that you default on your home loan, not the borrower."
                },
                {
                  q: "What government assistance is available for first-home buyers?",
                  a: "Available government schemes in Australia include the First Home Guarantee (FHBG) which allows buying with a 5% deposit and no LMI, state-based First Home Owner Grants (FHOG) for new builds, and stamp duty concessions or exemptions."
                },
                {
                  q: "Do I need pre-approval before buying?",
                  a: "Yes, obtaining a home loan pre-approval is highly recommended. It gives you a clear idea of your budget, helps you narrow down property searches, and makes you a stronger bidder at auctions and private negotiations."
                },
                {
                  q: "Can I buy with a partner or family member?",
                  a: "Yes, you can apply for a joint home loan with a partner, family member, or co-buyer. This allows you to combine your incomes and savings, which often boosts your borrowing capacity and speeds up the saving phase."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-[#0B1F3A] text-[13px] sm:text-[14px] hover:text-[#2563EB] transition-colors"
                  >
                    <span className="pr-4 leading-tight">{faq.q}</span>
                    <div className={`w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 transition-transform ${openFaqIndex === idx ? "rotate-180 text-[#2563EB]" : ""}`}>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${openFaqIndex === idx ? "max-h-[300px] border-t border-slate-100" : "max-h-0"}`}>
                    <p className="p-4 text-slate-550 text-[12px] sm:text-[12.5px] leading-relaxed bg-slate-50/20 font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM SECTION (py-5 lg:py-10 viewport-fitting logic) */}
      <section id="enquiry-form" className="py-5 lg:py-10 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit block">
                Get In Touch
              </span>
              <h2 className="text-[#0B1F3A] text-[24px] sm:text-[30px] font-black leading-tight font-montserrat">
                Ready to take the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">next step?</span>
              </h2>
              <p className="text-slate-550 text-[13px] sm:text-[13.5px] leading-relaxed">
                Connect with our expert team today to explore your borrowing power, look at personalized interest rates, and secure formal loan approvals.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-[11.5px] text-slate-500 font-bold">
                  All consultations are <span className="text-[#0B1F3A]">100% free and zero-obligation</span>
                </div>
              </div>
            </div>

            {/* Main enquiry form card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 text-[#0B1F3A]">
              {!enquirySubmitted ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="first-name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="first-name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="last-name">Surname</label>
                      <input
                        type="text"
                        name="surname"
                        id="last-name"
                        required
                        value={formData.surname}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="enquiry-email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="enquiry-email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="enquiry-phone">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        id="enquiry-phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0400 000 000"
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="enquiry-message">Your Message</label>
                    <textarea
                      name="message"
                      id="enquiry-message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your query or question here..."
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    By clicking ‘Submit Enquiry’, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert’s brokers.
                  </p>

                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
                  >
                    {submittingEnquiry ? "Submitting..." : "Submit Enquiry"}
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto rounded-full">
                    ✓
                  </div>
                  <h3 className="text-[#0B1F3A] text-[20px] font-black">Enquiry Submitted!</h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed max-w-sm mx-auto">
                    Thank you. We have received your query and a specialist broker will contact you shortly.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <TestimonialSection
        badgeText="Google Reviews"
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Happy Clients</span></>}
        backgroundClass="bg-slate-50 border-y border-slate-100"
      />

      {/* GET YOUR FREE PROPERTY REPORT CTA SECTION */}
      <section className="py-8 lg:py-12 bg-gradient-to-br from-slate-900 to-[#071324] text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-10 top-5 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-black tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full inline-block">
              Free Property Insights
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-black font-montserrat leading-tight text-white">
              Get Your Free Property Report
            </h2>
            <p className="text-slate-300 text-[13.5px] sm:text-[14px] leading-relaxed">
              Planning to buy or refinance? Access comprehensive property valuations, recent sales history, suburb statistics, and local market trends instantly.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-[13.5px] py-3.5 px-8 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Request Property Report <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY REPORT MODAL */}
      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReportModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[20px] font-black text-[#0B1F3A] font-montserrat">Free Property Report</h3>
                  <p className="text-xs text-slate-500 mt-1">Provide details below to receive your local market valuation report.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-[14px] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!reportSubmitted ? (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="report-name">Full Name*</label>
                    <input
                      type="text"
                      id="report-name"
                      required
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="report-email">Email Address*</label>
                    <input
                      type="email"
                      id="report-email"
                      required
                      value={reportEmail}
                      onChange={(e) => setReportEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="report-phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="report-phone"
                      required
                      value={reportPhone}
                      onChange={(e) => setReportPhone(e.target.value)}
                      placeholder="e.g. 0400 123 456"
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="report-address">Property Address*</label>
                    <input
                      type="text"
                      id="report-address"
                      required
                      value={reportAddress}
                      onChange={(e) => setReportAddress(e.target.value)}
                      placeholder="e.g. 123 Example St, Sydney NSW 2000"
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    By requesting this report, you consent to being contacted by one of our accredited brokers to confirm details and deliver the report files.
                  </p>

                  <button
                    type="submit"
                    disabled={reportSubmitting}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
                  >
                    {reportSubmitting ? "Generating Report..." : "Submit Request"}
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto rounded-full">
                    ✓
                  </div>
                  <h3 className="text-[#0B1F3A] text-[20px] font-black">Request Received!</h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed max-w-sm mx-auto">
                    Thank you. We have received your property report request. A broker will compile the report and email it to you shortly.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <SiteFooter settings={settings} />
    </div>
  );
}
