"use client";
import { useOnboardingModal } from "@/app/components/OnboardingModalContext";

import React, { useState, useEffect, useRef } from "react";
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
  ShieldAlert,
  Sparkles,
  Building,
  Briefcase,
  UserCheck,
  Sparkle,
  Home as HomeIcon
} from "lucide-react";
import { RoadmapSection } from "../components/RoadmapSection";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { TestimonialSection } from "../components/TestimonialSection";
import { EASE_OUT } from "@/lib/motion";

const GoogleIcon = () => (
  <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
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

export function ClientPage({ settings = {}, pageHeroSettings, pageContent, pageSections }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string; pageSections?: string[] }) {
  const { openModal } = useOnboardingModal();

  const handleBtnClick = (e: React.MouseEvent, text: string, link: string) => {
    const textLower = text.toLowerCase();
    const isModalTrigger =
      !link ||
      link === "#" ||
      link === "#contact" ||
      link === "#callback" ||
      link === "#onboarding" ||
      (!link.startsWith("#") && (
        textLower.includes("book") ||
        textLower.includes("call") ||
        textLower.includes("consult") ||
        textLower.includes("apply")
      ));

    if (isModalTrigger) {
      e.preventDefault();
      openModal();
    } else if (link.startsWith("#")) {
      e.preventDefault();
      const targetId = link.substring(1);
      let el = document.getElementById(targetId);
      if (!el && (targetId.includes("calc") || targetId.includes("borrow") || targetId.includes("option") || targetId.includes("eligibility"))) {
        el = document.getElementById("calculator") || 
             document.getElementById("calculator-section") || 
             document.getElementById("borrowing") || 
             document.getElementById("borrowing-capacity") ||
             document.getElementById("options") ||
             document.getElementById("eligibility") ||
             document.getElementById("calculator-tool");
      }
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const [navSticky, setNavSticky] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const navSentinelRef = useRef<HTMLDivElement>(null);

  // Document Checklist State
  const [docChecklist, setDocChecklist] = useState([
    { id: "tax_personal", label: "Personal Tax Returns (last 1–2 years)", checked: false },
    { id: "tax_business", label: "Business Tax Returns & Financials (last 1–2 years)", checked: false },
    { id: "notice_assessment", label: "ATO Notice of Assessments (last 1–2 years)", checked: false },
    { id: "profit_loss", label: "Up-to-date Profit & Loss (P&L) Statement", checked: false },
    { id: "bank_statements", label: "Business Bank Statements (last 6 months)", checked: false },
    { id: "abn_reg", label: "Active ABN (registered minimum 1–2 years)", checked: false },
    { id: "gst_status", label: "GST Registration evidence (if applicable)", checked: false }
  ]);

  const toggleChecklist = (id: string) => {
    setDocChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checklistProgress = Math.round(
    (docChecklist.filter(item => item.checked).length / docChecklist.length) * 100
  );

  // Lead / Enquiry Form States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Calculator State
  const [profitYear1, setProfitYear1] = useState(85000);
  const [profitYear2, setProfitYear2] = useState(98000);
  const [calcMethod, setCalcMethod] = useState<"avg" | "latest">("avg");
  const [addBacks, setAddBacks] = useState(12000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [monthlyCommitments, setMonthlyCommitments] = useState(1800);

  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [calcSubmitting, setCalcSubmitting] = useState(false);

  // Calculator Logic
  const assessedIncome = (() => {
    const baseIncome = calcMethod === "avg" 
      ? (profitYear1 + profitYear2) / 2 
      : profitYear2;
    return baseIncome + addBacks + (otherIncome * 12);
  })();

  // Borrowing Capacity assessment: assessed net monthly income after tax/commitments multiplied by factor
  const estimatedBorrowing = (() => {
    const grossMonthly = assessedIncome / 12;
    const estimatedTaxMonthly = (assessedIncome * 0.22) / 12;
    const netMonthlySurplus = Math.max(0, grossMonthly - estimatedTaxMonthly - monthlyCommitments);
    const factor = 125; 
    const calculated = netMonthlySurplus * factor;
    return Math.min(2500000, Math.max(120000, Math.round(calculated)));
  })();

  const currentInterestRate = settings.interest_rate ? parseFloat(settings.interest_rate) : 6.19;
  const lowDocInterestRate = currentInterestRate + 0.8; // Low Doc premium rate

  const getMonthlyRepayment = (amount: number, rate: number) => {
    const r = rate / 100 / 12;
    const n = 30 * 12; 
    if (r === 0) return amount / n;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const monthlyRepaymentFullDoc = getMonthlyRepayment(estimatedBorrowing, currentInterestRate);
  const monthlyRepaymentLowDoc = getMonthlyRepayment(estimatedBorrowing, lowDocInterestRate);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sticky Navigation Spy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setNavSticky(true);
      } else {
        setNavSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sticky Navigation Spy active items
  useEffect(() => {
    const sectionIds = [
      "overview",
      "how-it-works",
      "roadmap",
      "calculator-section",
      "documents",
      "low-doc-vs-full-doc",
      "approval-tips",
      "faqs",
      "contact"
    ];
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveNav(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingEnquiry(true);
    try {
      const payload = {
        type: "self-employed-callback",
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        status: "new"
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

  const handleCalcLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalcSubmitting(true);
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "self-employed-calculator",
          name: calcLeadName,
          email: calcLeadEmail,
          phone: calcLeadPhone,
          savings: String(addBacks),
          income: String(assessedIncome),
          message: `Self-Employed Borrowing Calculation. Assessed Income: $${Math.round(assessedIncome)}, Est Borrowing Power: $${estimatedBorrowing}, Calculation method: ${calcMethod}, Year 1 profit: $${profitYear1}, Year 2 profit: $${profitYear2}`
        })
      });
      setCalcSubmitted(true);
    } catch (error) {
      console.error("Failed to submit calculator lead:", error);
    } finally {
      setCalcSubmitting(false);
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: HomeIcon },
    { id: "how-it-works", label: "How It Works", icon: Sparkles },
    { id: "roadmap", label: "Roadmap", icon: Calendar },
    { id: "calculator-section", label: "Borrowing Estimator", icon: Calculator },
    { id: "documents", label: "Documents Checklist", icon: FileText },
    { id: "low-doc-vs-full-doc", label: "Low-Doc vs Full-Doc", icon: Percent },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "contact", label: "Enquire Now", icon: ArrowRight }
  ];

  const badgeText = pageHeroSettings?.hero_badge || "Self-Employed Loan Specialists";
  const titleText = pageHeroSettings?.hero_title || "Flexible Home Loans for Business Owners";
  const subtextText = pageHeroSettings?.hero_subtext || "Getting a home loan can be a bit different if you're self-employed, but with the right preparation, it's definitely possible to secure the finance you need.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/self_employed_hero.png";
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Check Eligibility";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#calculator-section";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Book Free Consultation";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "#contact";

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* ── HEADER ── */}
      <SiteHeader isSticky={false} settings={settings} />

      {/* ── EDITORIAL HERO SECTION ── */}
      <section id="overview" className="relative overflow-hidden bg-white pt-2.5 pb-8 lg:pt-[10px] lg:pb-8 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E11D48 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-rose-50 opacity-40 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 85% 90% at 62% 52%, #FFF1F2 0%, #FFE4E6 42%, #F8FAFC 62%, transparent 82%)"
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "multiply"
            }}
          />
          <div
            className="absolute inset-y-0 left-0 w-48"
            style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.7) 50%, transparent 100%)" }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-white border border-slate-200/60 rounded-2xl sm:rounded-full px-3 sm:px-4 py-1.5 sm:py-2 w-fit mb-6 text-[10.5px] sm:text-[11.5px] font-bold text-slate-500 shadow-sm">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-slate-400">Home Loans</span>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-rose-600 font-bold">Self-Employed Loans</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">
            {/* Left Column Text & Badges */}
            <motion.div initial="hidden" animate="visible" variants={premiumStagger} className="flex flex-col justify-center z-10">
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-rose-50 border-rose-200/50 text-rose-800 w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 shrink-0" />
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className="w-14 h-[3px] bg-rose-600 mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-5 max-w-xl">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #FFF1F2 0%, #FFE4E6 40%, #F8FAFC 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                <a
                  href={btn1Link}
                  onClick={(e) => handleBtnClick(e, btn1Text, btn1Link)}
                  className="inline-flex items-center justify-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-rose-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap cursor-pointer"
                >
                  {btn1Text} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={btn2Link}
                  onClick={(e) => handleBtnClick(e, btn2Text, btn2Link)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-rose-600 text-rose-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-rose-600 hover:text-white text-center w-full sm:w-auto whitespace-nowrap cursor-pointer bg-transparent"
                >
                  {btn2Text}
                </a>
              </motion.div>

              {/* Trust Reviews Badge Row */}
              <motion.div variants={premiumFadeUp} className="flex flex-row items-center gap-2.5 sm:gap-6 mt-3.5 pt-3 border-t border-slate-100/80 max-w-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                    <div className="scale-[0.75] sm:scale-100"><GoogleIcon /></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />)}
                    </div>
                    <div className="text-[9.5px] sm:text-[11.5px] text-slate-500 font-bold mt-0.5">4.9/5 from 760+ reviews</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-200/80 hidden sm:block" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                    <div className="scale-[0.75] sm:scale-100"><svg className="w-5.5 h-5.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />)}
                    </div>
                    <div className="text-[9.5px] sm:text-[11.5px] text-slate-500 font-bold mt-0.5">5/5 from 230+ reviews</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Glassmorphic checklist badge only */}
            <div className="relative hidden lg:block h-full min-h-[440px]">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="absolute left-8 lg:left-[15%] top-[25%] z-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/95 border border-slate-200/80 rounded-3xl p-5 shadow-[0_20px_40px_rgba(11,31,58,0.1)] flex flex-col gap-3.5 w-[190px]"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-700 shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5 text-rose-600" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {["Alt-Doc Lending", "Easy Income Add-Backs", "Low-Doc 80% LVR"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                        <span className="text-[12px] font-bold text-[#0B1F3A] leading-none">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY SUB-NAVIGATION Sentinel ── */}
      <div ref={navSentinelRef} className="h-0 w-full" />

      {/* ── STATIC IN-PAGE NAVIGATION (PILL BAR) ── */}
      <div className={`relative bg-transparent mt-[-36px] pb-12 z-20 transition-all duration-300 ${
        navSticky ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 flex justify-center">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-[30px] p-2 shadow-[0_15px_40px_rgba(11,31,58,0.06)] flex items-center justify-start w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollbarWidth: "none" }}>
            <div className="flex items-center gap-1.5 md:gap-2.5 px-2 w-max mx-auto shrink-0">
              {navItems.map(({ id, label, icon: IconComponent }) => {
                const isActive = activeNav === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      setActiveNav(id);
                    }}
                    className={`transition-all duration-300 shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] ${
                      isActive
                        ? "bg-gradient-to-br from-rose-600 to-pink-500 text-white shadow-[0_4px_12px_rgba(225,29,72,0.22)] font-bold"
                        : "text-slate-500 hover:text-[#0B1F3A] font-semibold hover:bg-slate-50"
                    }`}
                  >
                    <IconComponent className={`w-[16px] h-[16px] shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span className="whitespace-nowrap">{label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── VIEWPORT FIXED STICKY NAVIGATION (PILL BAR) ── */}
      <AnimatePresence>
        {navSticky && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed z-45 w-full bg-white/95 backdrop-blur-md md:top-0 md:bottom-auto bottom-0 left-0 md:border-b md:border-t-0 border-t border-slate-200 py-3 shadow-[0_15px_40px_rgba(11,31,58,0.06)] md:shadow-md shadow-[0_-10px_30px_rgba(11,31,58,0.08)] flex justify-center"
          >
            <div className="w-full max-w-[1440px] px-4 md:px-10 lg:px-16 flex justify-center">
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-[30px] p-2 shadow-inner flex items-center justify-start w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollbarWidth: "none" }}>
                <div className="flex items-center gap-1.5 md:gap-2.5 px-2 w-max mx-auto shrink-0">
                  {navItems.map(({ id, label, icon: IconComponent }) => {
                    const isActive = activeNav === id;
                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                          setActiveNav(id);
                        }}
                        className={`transition-all duration-300 shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] ${
                          isActive
                            ? "bg-gradient-to-br from-rose-600 to-pink-500 text-white shadow-[0_4px_12px_rgba(225,29,72,0.22)] font-bold"
                            : "text-slate-500 hover:text-[#0B1F3A] font-semibold hover:bg-slate-50"
                        }`}
                      >
                        <IconComponent className={`w-[16px] h-[16px] shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span className="whitespace-nowrap">{label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION 2: OVERVIEW ── */}
      <section id="overview" className="py-16 md:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-rose-700 text-[10px] font-bold tracking-widest uppercase">Start Owning Sooner</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Getting a Home Loan When <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">You’re Self-Employed</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                {pageSections?.[0] || pageContent || `Getting a home loan can be a bit different if you’re self-employed, but with the right preparation, it’s definitely possible to secure the finance you need. Understanding what lenders require and how they assess your income will help you approach the process confidently.`}
              </p>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                While traditional banks make it look complicated, our specialized brokers understand how business structures work. We represent your true income by identifying legitimate add-backs, utilizing one-year tax return policies, or selecting alt-doc options so you get the same premium interest rates as salaried employees.
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-rose-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">1 Year Financials Accepted</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-rose-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Alt-Doc &amp; BAS Options</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#FFE4E6] opacity-35 rounded-bl-full pointer-events-none" />
              <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                How We Make the Difference
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Income Optimisation",
                    desc: "We analyze your accounts to add back non-cash business items like depreciation, one-off start-up costs, and director's super contributions to boost your assessed income."
                  },
                  {
                    title: "Policy Matching",
                    desc: "Some banks average your last two years of income; others look only at the most recent, higher year. We guide you to the lender matching your specific income trend."
                  },
                  {
                    title: "Streamlined Applications",
                    desc: "We compile professional finance packets that give underwriters instant confidence, resulting in faster approval turnaround times."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-[#0B1F3A]">{item.title}</h4>
                      <p className="text-slate-550 text-[12px] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS / INCOME ASSESSMENT ── */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2 mb-4">
              <Sparkle className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-rose-700">Income Assessment</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              How Home Loans Work for the Self-Employed
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              When you’re self-employed, lenders look a bit closer at your financial situation because your income might not be as predictable as someone with a regular salary. They want to see that your business is stable and that you have enough income to comfortably repay the loan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Business Stability Assessment",
                desc: "Lenders look for an active ABN registered for at least 1 to 2 years, proving operational continuity. They evaluate the longevity and sustainability of your business niche.",
                icon: Building
              },
              {
                title: "Income Verification & Averaging",
                desc: "Traditional verification relies on your personal tax returns and business financials. Lenders review these to verify stable earnings history.",
                icon: Coins
              },
              {
                title: "Alternative Documentation Options",
                desc: "If tax returns aren't up to date, we leverage alternative documentation pathways (low-doc loans) using BAS statements, business bank statements, or accountant declarations.",
                icon: FileText
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner">
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[#0B1F3A] text-[16px] font-bold">{step.title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RoadmapSection colorTheme="rose" />

      <section id="calculator-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute left-[-200px] bottom-[-200px] w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[33%_67%] gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Info & Context */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-rose-100 rounded-full px-4 py-2 mb-6">
                <Calculator className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-rose-700 text-[10px] font-bold tracking-widest uppercase">Financial Modeler</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Self-Employed <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Borrowing Capacity</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-6 max-w-lg">
                Lenders usually assess your income over the past 1–2 years by reviewing your tax returns and financial documents. They may also consider your business cash flow and expenses to understand how much you can afford to repay.
              </p>

              {/* Glass Card List */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 max-w-md shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Income Assessment</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">Most lenders average the net profit from the last two financial years to calculate borrowing power.</p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Add-Backs &amp; Write-Offs</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">Depreciation, one-off equipment write-offs, and super contributions can be added back to boost borrowing power.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Widget (54% / 46%) */}
            <div className="relative w-full">
              <div className="bg-white border border-slate-200/80 rounded-[24px] shadow-xl shadow-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-[54%_46%]">
                
                {/* Inputs (54%) */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-1">
                    <span className="text-slate-900 text-xs font-black uppercase tracking-wider">1. Business Financials</span>
                    <span className="text-[9px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full font-bold uppercase">Inputs</span>
                  </div>

                  {/* Year 1 Net Profit */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Year 1 Net Profit (Before Tax)</span>
                      <span className="text-slate-900 font-black text-[13px]">${profitYear1.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={40000}
                      max={350000}
                      step={5000}
                      value={profitYear1}
                      onChange={(e) => setProfitYear1(Number(e.target.value))}
                      className="w-full accent-rose-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$40,000</span>
                      <span>$350,000</span>
                    </div>
                  </div>

                  {/* Year 2 Net Profit */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Year 2 Net Profit (Before Tax)</span>
                      <span className="text-slate-900 font-black text-[13px]">${profitYear2.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={40000}
                      max={350000}
                      step={5000}
                      value={profitYear2}
                      onChange={(e) => setProfitYear2(Number(e.target.value))}
                      className="w-full accent-rose-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$40,000</span>
                      <span>$350,000</span>
                    </div>
                  </div>

                  {/* Policy Switcher */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assessment Method</div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcMethod("avg")}
                        className={`py-1.5 px-3 rounded-lg border text-center text-xs font-semibold transition-all ${
                          calcMethod === "avg"
                            ? "bg-rose-50 border-rose-500 text-rose-700"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        Average 2 Years
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcMethod("latest")}
                        className={`py-1.5 px-3 rounded-lg border text-center text-xs font-semibold transition-all ${
                          calcMethod === "latest"
                            ? "bg-rose-50 border-rose-500 text-rose-700"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        Most Recent Year
                      </button>
                    </div>
                  </div>

                  {/* Add-Backs & Depreciation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Add-Backs &amp; Depreciation</span>
                      <span className="text-slate-900 font-black text-[13px]">${addBacks.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={120000}
                      step={2500}
                      value={addBacks}
                      onChange={(e) => setAddBacks(Number(e.target.value))}
                      className="w-full accent-rose-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Monthly Expenses */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Other Debts &amp; Expenses</span>
                      <span className="text-slate-900 font-black text-[13px]">${monthlyCommitments.toLocaleString()}/mo</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={10000}
                      step={250}
                      value={monthlyCommitments}
                      onChange={(e) => setMonthlyCommitments(Number(e.target.value))}
                      className="w-full accent-rose-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                  </div>
                </div>

                {/* Outputs & Form (46%) */}
                <div className="bg-slate-900 p-4 sm:p-6 flex flex-col justify-between text-white relative">
                  <div className="absolute inset-0 bg-[radial-gradient(#E11D48_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="text-white/70 text-xs font-bold uppercase tracking-wider">2. Borrowing Estimates</span>
                      <span className="text-[9px] text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full font-bold uppercase border border-rose-500/20">Analysis</span>
                    </div>

                    <div className="space-y-3.5">
                      {/* Estimated Borrowing Capacity */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-0.5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500 rounded-full blur-[30px] opacity-20 pointer-events-none" />
                        <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Est. Borrowing Power</span>
                        <div className="text-[26px] font-black leading-none tracking-tight text-white mt-0.5">
                          ${estimatedBorrowing.toLocaleString()}
                        </div>
                      </div>

                      {/* Repayments side-by-side */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                          <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block mb-0.5">Full-Doc Rate</span>
                          <span className="text-[12.5px] font-extrabold text-white">${Math.round(monthlyRepaymentFullDoc).toLocaleString()}/mo</span>
                          <span className="text-[9px] font-semibold text-rose-400 block mt-0.5">{currentInterestRate}% p.a.</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                          <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block mb-0.5">Low-Doc Rate</span>
                          <span className="text-[12.5px] font-extrabold text-white">${Math.round(monthlyRepaymentLowDoc).toLocaleString()}/mo</span>
                          <span className="text-[9px] font-semibold text-amber-400 block mt-0.5">{lowDocInterestRate.toFixed(2)}% p.a.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inline Lead Capture Form */}
                  <div className="relative z-10 mt-4 pt-4 border-t border-white/10">
                    {!calcSubmitted ? (
                      <form onSubmit={handleCalcLeadSubmit} className="space-y-2.5">
                        <p className="text-[10px] text-white/60 font-semibold leading-snug">
                          Save calculation &amp; get a matching lender report:
                        </p>
                        <div className="grid grid-cols-1 gap-1.5">
                          <input
                            type="text"
                            placeholder="Name"
                            required
                            value={calcLeadName}
                            onChange={(e) => setCalcLeadName(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-rose-500 focus:bg-white/10"
                          />
                          <div className="grid grid-cols-2 gap-1.5">
                            <input
                              type="email"
                              placeholder="Email"
                              required
                              value={calcLeadEmail}
                              onChange={(e) => setCalcLeadEmail(e.target.value)}
                              className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-rose-500 focus:bg-white/10"
                            />
                            <input
                              type="tel"
                              placeholder="Phone"
                              required
                              value={calcLeadPhone}
                              onChange={(e) => setCalcLeadPhone(e.target.value)}
                              className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-rose-500 focus:bg-white/10"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={calcSubmitting}
                          className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-[12px] py-2.5 transition-all cursor-pointer shadow-lg shadow-rose-500/10"
                        >
                          {calcSubmitting ? "Submitting..." : "Get Detailed Lenders Report"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-4 text-center space-y-1">
                        <CheckCircle2 className="w-6 h-6 text-rose-400 mx-auto" />
                        <h4 className="text-[13px] font-extrabold text-rose-400">Calculation Saved!</h4>
                        <p className="text-[10px] text-white/70 leading-relaxed">
                          We will review your calculation and contact you to complete the application.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: REQUIRED DOCUMENTS CHECKLIST ── */}
      <section id="documents" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Content + Interactive Checklist */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-rose-700 text-[10px] font-bold tracking-widest uppercase">Required Documents</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                What Lenders Need to See
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                To prove your income and financial position, lenders usually ask for:
              </p>

              {/* Progress Bar Container */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>Document Readiness</span>
                  <span className={`font-black ${checklistProgress === 100 ? "text-rose-600 animate-pulse" : "text-slate-700"}`}>
                    {checklistProgress}% Complete
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-600 rounded-full transition-all duration-500"
                    style={{ width: `${checklistProgress}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="grid grid-cols-1 gap-2.5">
                {docChecklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                      item.checked
                        ? "bg-rose-50/50 border-[#E11D48]/30 text-slate-700 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-500"
                    }`}
                  >
                    <span className="text-[13px] font-semibold pr-4 leading-tight">{item.label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      item.checked
                        ? "bg-[#E11D48] border-[#E11D48] text-white"
                        : "border-slate-300 bg-white"
                    }`}>
                      {item.checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Key Details Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Why Documents Matter
              </h3>
              <p className="text-slate-500 text-[13.5px] sm:text-[14.5px] leading-relaxed">
                Personal and business tax returns for the last 1–2 years, profit and loss statements, bank statements, evidence of business registration and licenses, details of any debts or expenses related to your business. Providing these documents helps lenders understand your income and the health of your business.
              </p>
              <div className="bg-white rounded-2xl p-5 border border-slate-100 flex gap-4">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0B1F3A]">Verification Confidence</h4>
                  <p className="text-slate-600 text-[12px] leading-relaxed mt-1">
                    Having your business accounts fully organized speeds up pre-approvals and ensures underwriters apply regular prime rates.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: LOW-DOC VS FULL-DOC COMPARISON ── */}
      <section id="low-doc-vs-full-doc" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2 mb-4">
              <Percent className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-rose-700">Loan Types Explained</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Low-Doc vs Full-Doc Loans Explained
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              We can help you decide which option is best for your situation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Full-Doc Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Full-Doc Loans
                    </h3>
                    <span className="inline-flex text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded">
                      Standard Verification
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Check className="w-5.5 h-5.5" strokeWidth={2.5} />
                  </div>
                </div>
                <p className="text-slate-500 text-[13px] sm:text-[13.5px] leading-relaxed">
                  Full-Doc Loans require all the usual documents such as tax returns, financial statements, and bank statements. These loans usually have better interest rates and terms.
                </p>
                <ul className="space-y-3 pt-2">
                  {[
                    "Get access to the lowest market interest rates",
                    "No lender restrictions on borrowing up to 90% LVR",
                    "Flexible offset account & credit facilities",
                    "Simplified assessment if profit trends upwards"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-[12.5px] text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Low-Doc Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Low-Doc Loans
                    </h3>
                    <span className="inline-flex text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded">
                      Alternative Docs
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                    <AlertCircle className="w-5.5 h-5.5" />
                  </div>
                </div>
                <p className="text-slate-500 text-[13px] sm:text-[13.5px] leading-relaxed">
                  Low-Doc Loans require less documentation but may come with higher interest rates and fees because lenders take on more risk. These loans are often used by self-employed people who can’t provide full financial documentation.
                </p>
                <ul className="space-y-3 pt-2">
                  {[
                    "Verify income using last 6 months of BAS",
                    "Verify income using accountant letter declarations",
                    "Or verify with 6 months business bank statements",
                    "LVR capped at 80% with most lenders"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-[12.5px] text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: LIVE INTERACTIVE CALCULATOR (COMPACT STYLED) ── */}
      
      
      

      {/* ── SECTION 7: TIPS FOR APPROVAL ── */}
      <section id="approval-tips" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative">
        {/* Subtle dot matrix background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#0B1F3A 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-rose-100 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-rose-700">Expert Tips</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Tips to Improve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Chances of Approval</span>
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Applying for a self-employed mortgage doesn’t have to be stressful. Follow these critical guidelines to maximize your approval success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              {
                tag: "Tip 01",
                title: "Organised Finances",
                pill: "Essential Step",
                desc: "Keep your business finances well organised, separated from personal transactions, and up to date.",
                highlight: true
              },
              {
                tag: "Tip 02",
                title: "Accurate Records",
                pill: "Clean Tax Filing",
                desc: "Maintain clear, up-to-date and accurate tax, BAS, and invoice statements.",
                highlight: false
              },
              {
                tag: "Tip 03",
                title: "Avoid Cash Spikes",
                pill: "Stable Activity",
                desc: "Avoid large unexplained deposits or sudden withdrawals in your bank accounts.",
                highlight: false
              },
              {
                tag: "Tip 04",
                title: "Reduce Debts",
                pill: "Lower Liabilities",
                desc: "Pay down credit cards, personal loans, and liabilities to boost your borrowing capacity.",
                highlight: false
              },
              {
                tag: "Tip 05",
                title: "Specialist Broker",
                pill: "Expert Guidance",
                desc: "Work with a mortgage broker who understands self-employed and low-doc policies.",
                highlight: false
              }
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                variants={premiumFadeUp}
                whileHover={{ y: -8, scale: tip.highlight ? 1.05 : 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  tip.highlight
                    ? `bg-gradient-to-b from-rose-600 to-rose-700 text-white shadow-[0_20px_40px_rgba(225,29,72,0.25)] lg:-mt-4 lg:mb-4 ring-4 ring-rose-500/10 z-10`
                    : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-[0_15px_30px_rgba(15,23,42,0.06)] shadow-sm"
                }`}
              >
                {tip.highlight && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                )}

                <div className="relative z-10">
                  <span className={`text-[10.5px] font-black uppercase tracking-[0.15em] block mb-3 ${tip.highlight ? 'text-rose-200' : 'text-slate-400'}`}>
                    {tip.tag}
                  </span>
                  <div className={`text-[18px] font-black mb-3 leading-tight ${tip.highlight ? 'text-white' : 'text-[#0B1F3A]'}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    {tip.title}
                  </div>
                  <span className={`inline-block text-[9.5px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-6 ${
                    tip.highlight
                      ? "bg-white/20 text-white backdrop-blur-sm border border-white/20"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}>
                    {tip.pill}
                  </span>
                  <p className={`text-[13px] leading-relaxed ${tip.highlight ? 'text-rose-50' : 'text-slate-500'}`}>
                    {tip.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: DYNAMIC TESTIMONIALS SLIDER ── */}
      <TestimonialSection badgeText="Google Reviews" />

      {/* ── SECTION 9: FAQs ACCORDION ── */}
      <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-rose-700">FAQ Helpdesk</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">We Have Answers</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-sm">
                Everything you need to know about the self-employed home loan process.
              </p>

              {/* Premium Specialist Contact Card */}
              <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
                <h4 className="text-[16px] font-extrabold text-[#0B1F3A]">Have a unique business structure?</h4>
                <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed">
                  {pageSections?.[1] || `Self-employed lending policies vary dramatically between banks. Our specialists can review your trust, company, or sole trader structure and match you with the right lender.`}
                </p>
                
                {/* Specialists Avatars */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2.5">
                    {[
                      { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80", alt: "Specialist 1" },
                      { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80", alt: "Specialist 2" },
                      { src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80", alt: "Specialist 3" }
                    ].map((avatar, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shrink-0">
                        
                        <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-[11.5px] text-slate-500 font-medium">
                    Talk to our <span className="font-bold text-[#0B1F3A]">low-doc credit specialists</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="button" onClick={openModal} className="cursor-pointer border-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-[13px] font-bold px-6 py-3 shadow-lg shadow-rose-500/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                    Consult a Specialist
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column Accordion */}
            <div className="space-y-3.5">
              {[
                {
                  q: "How much deposit do I need to buy my first home?",
                  a: "Typically, lenders look for a 5% to 20% deposit. With government schemes like the First Home Guarantee, you can purchase with only 5% deposit and waive Lenders Mortgage Insurance (LMI). Guarantor options are also available which can reduce cash deposit to 0%."
                },
                {
                  q: "What is Lenders Mortgage Insurance (LMI)?",
                  a: "LMI is an insurance policy that protects the lender (not you) if you default on your home loan. It is typically required if you borrow more than 80% of the property value. Certain schemes or professional packages can waive LMI entirely."
                },
                {
                  q: "What government assistance is available for first-home buyers?",
                  a: "First-home buyers in Australia can access the First Home Guarantee (FHBG) to purchase with a 5% deposit without LMI, stamp duty exemptions/concessions, and the First Home Owner Grant (FHOG) which provides a cash sum for purchasing or building new homes."
                },
                {
                  q: "Do I need pre-approval before buying?",
                  a: "Yes, securing a home loan pre-approval is highly recommended. It clarifies your purchasing budget, allows you to negotiate confidently, and ensures you don't face sudden lending issues during contract signings."
                },
                {
                  q: "Can I buy with a partner or family member?",
                  a: "Absolutely. Joint applications are common and allow you to combine incomes, which increases overall borrowing power. Lenders assess joint applications based on combined income, savings, and credit liabilities."
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

      {/* ── SECTION 10: ENQUIRY CONTACT FORM ── */}
      <section id="contact" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2">
                <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-rose-700 text-[10px] font-bold tracking-widest uppercase">Start Your Journey</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight animate-fade-in" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Get Pre-Approved for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Self-Employed Loan</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                Send us your enquiry today. A specialized self-employed lending expert will review your business structure and outline your borrowing options within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#0B1F3A]">Quick Turnaround</h4>
                    <p className="text-slate-500 text-[11.5px]">We analyze details and return feedback within 1 business day.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#0B1F3A]">Multi-Lender Access</h4>
                    <p className="text-slate-500 text-[11.5px]">Compare policies across major banks and non-conforming commercial lenders.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Enquiry Form Panel */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
              {!enquirySubmitted ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Enquiry Form
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="firstName">Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5" htmlFor="lastName">Surname</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
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
                        placeholder="+61 400 000 000"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all shadow-inner"
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
                  <h3 className="text-[#0B1F3A] text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Enquiry Submitted Successfully!
                  </h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed max-w-sm mx-auto">
                    Thank you for contacting Mortgage Xperts. One of our specialist brokers will review your self-employed details and reach out within 24 hours.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <SiteFooter settings={settings} />
    </div>
  );
}
