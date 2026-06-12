"use client";

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
  Home as HomeIcon,
  Globe,
  Ban
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { TestimonialSection } from "../components/TestimonialSection";

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

export function ClientPage({ settings = {}, pageHeroSettings }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings }) {
  const [navSticky, setNavSticky] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const navSentinelRef = useRef<HTMLDivElement>(null);

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

  // Live Calculator State
  const [purchasePrice, setPurchasePrice] = useState(850000);
  const [depositSaved, setDepositSaved] = useState(250000);
  const [residencyStatus, setResidencyStatus] = useState<"expat" | "temporary-visa" | "foreign-citizen">("temporary-visa");
  const [incomeSource, setIncomeSource] = useState<"aud" | "foreign">("aud");

  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [calcSubmitting, setCalcSubmitting] = useState(false);

  // Calculator Logic
  const loanRequired = Math.max(0, purchasePrice - depositSaved);
  const lvrValue = Math.round((loanRequired / purchasePrice) * 100);

  const minRequiredDepositPct = residencyStatus === "expat" ? 10 : residencyStatus === "temporary-visa" ? 20 : 30;
  const isDepositSufficient = depositSaved >= (purchasePrice * minRequiredDepositPct) / 100;

  const estimatedFirbFee = (() => {
    if (residencyStatus === "expat") return 0;
    if (purchasePrice <= 1000000) return 14100;
    if (purchasePrice <= 2000000) return 28200;
    return 42300;
  })();

  const currentInterestRate = settings.interest_rate ? parseFloat(settings.interest_rate) : 6.19;
  const applicableRate = residencyStatus === "foreign-citizen" ? currentInterestRate + 0.85 : currentInterestRate + 0.25;

  const getMonthlyRepayment = (amount: number, rate: number) => {
    const r = rate / 100 / 12;
    const n = 30 * 12;
    if (r === 0) return amount / n;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const monthlyRepayment = getMonthlyRepayment(loanRequired, applicableRate);

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
      "mechanics",
      "benefits-risks",
      "eligibility",
      "foreign-ban",
      "steps",
      "calculator-section",
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
        type: "visa-callback",
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
          type: "visa-calculator",
          name: calcLeadName,
          email: calcLeadEmail,
          phone: calcLeadPhone,
          savings: String(estimatedFirbFee),
          income: residencyStatus,
          message: `Visa/Non-Resident Borrowing Calculation. Residency: ${residencyStatus}, Income currency: ${incomeSource}, Deposit: $${depositSaved}, Purchase Price: $${purchasePrice}, LVR: ${lvrValue}%, Required Deposit %: ${minRequiredDepositPct}%, Deposit Sufficient: ${isDepositSufficient ? "Yes" : "No"}, FIRB Fee: $${estimatedFirbFee}, Monthly Repay: $${Math.round(monthlyRepayment)}`
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
    { id: "mechanics", label: "How It Works", icon: Landmark },
    { id: "benefits-risks", label: "Benefits & Risks", icon: Sparkles },
    { id: "eligibility", label: "Eligible Visas", icon: UserCheck },
    { id: "foreign-ban", label: "Foreign Ban Notice", icon: Ban },
    { id: "steps", label: "Application Steps", icon: Clock },
    { id: "calculator-section", label: "Calculator", icon: Calculator },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "contact", label: "Enquire Now", icon: ArrowRight }
  ];

  const badgeText = pageHeroSettings?.hero_badge || "International & Expat Mortgages";
  const titleText = pageHeroSettings?.hero_title || "Non-Resident Home Loans & Visa Mortgages";
  const subtextText = pageHeroSettings?.hero_subtext || "If you’re a foreign citizen living outside Australia or holding a temporary visa, buying property here can be a challenge. Non-resident home loans, however, make it possible to enter the Australian property market, even if you’re not an Australian citizen or permanent resident.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/visa_hero.png";
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Check Visa Eligibility";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#calculator-section";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Book Free Consultation";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "#contact";

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* ── HEADER ── */}
      <SiteHeader isSticky={false} settings={settings} />

      {/* ── EDITORIAL HERO SECTION ── */}
      <section id="overview" className="relative overflow-hidden bg-white pt-2.5 pb-8 lg:pt-[10px] lg:pb-8 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#d97706 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-amber-50 opacity-40 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 85% 90% at 62% 52%, #FEF3C7 0%, #FDE68A 42%, #F8FAFC 62%, transparent 82%)"
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
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 bg-white border border-slate-200/60 rounded-full px-4 py-2 w-fit mb-6 text-[11.5px] font-bold text-slate-500 shadow-sm">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-slate-400">Home Loans</span>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-amber-600 font-bold">Non-Resident Home Loans</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">
            {/* Left Column Text & Badges */}
            <motion.div initial="hidden" animate="visible" variants={premiumStagger} className="flex flex-col justify-center z-10">
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-amber-50 border-amber-250/50 text-amber-855 w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className="w-14 h-[3px] bg-amber-500 mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-5 max-w-xl">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #FEF3C7 0%, #FDE68A 40%, #F8FAFC 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                <a
                  href={btn1Link}
                  className="inline-flex items-center justify-center gap-2 bg-amber-550 hover:bg-amber-600 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-amber-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap"
                >
                  {btn1Text} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={btn2Link}
                  className="inline-flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-amber-600 hover:text-white text-center w-full sm:w-auto whitespace-nowrap"
                >
                  {btn2Text}
                </a>
              </motion.div>

              {/* Trust Reviews Badge Row */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-6 mt-6 pt-5 border-t border-slate-100/80 max-w-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                    <GoogleIcon />
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <div className="text-[11px] text-slate-500 font-bold mt-0.5">
                      Global Lending Accreditation
                    </div>
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
                  className="bg-white/95 border border-slate-200/80 rounded-3xl p-5 shadow-[0_20px_40px_rgba(11,31,58,0.1)] flex flex-col gap-3.5 w-[200px]"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5 text-amber-600" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {["FIRB Navigation Guides", "Foreign Currencies accepted", "Expat Policy experts"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
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
                        ? "bg-gradient-to-br from-amber-550 to-yellow-500 text-white shadow-[0_4px_12px_rgba(217,119,6,0.22)] font-bold"
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
                            ? "bg-gradient-to-br from-amber-550 to-yellow-500 text-white shadow-[0_4px_12px_rgba(217,119,6,0.22)] font-bold"
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

      {/* ── SECTION 1: OVERVIEW ── */}
      <section id="overview" className="py-16 md:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2">
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">Global Access</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                What Exactly Is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Non-Resident Home Loan?</span>
              </h2>
              <p className="text-slate-550 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                A non-resident home loan is designed for people living overseas or those who don’t hold Australian citizenship or permanent residency. This includes foreign nationals, temporary visa holders, and Australians living abroad. Since lenders view non-residents as higher-risk borrowers, they apply stricter criteria, including more documentation and often larger deposits than regular home loans.
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-amber-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Foreign Income Accepted</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-amber-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Temp Visas Covered</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#FEF3C7] opacity-35 rounded-bl-full pointer-events-none" />
              <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                How Do They Work?
              </h3>
              <p className="text-slate-550 text-[12.5px] leading-relaxed">
                Non-resident loans function similarly to regular mortgages — you can enjoy features like redraw facilities, offset accounts, and flexible repayments. Loan terms can extend up to 30 years, typically with a minimum loan amount of $100,000.
              </p>
              
              <div className="space-y-3 pt-2 text-[12.5px] text-slate-600">
                <div className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>Foreign Investment Review Board (FIRB) approval (for most non-citizens)</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>Larger deposit requirements (usually 30–40%)</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>Lenders adjust foreign income to AUD and factor currency haircuts</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: BENEFITS & CONSIDERATIONS ── */}
      <section id="benefits-risks" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#0B1F3A 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-amber-100 shadow-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Weighing Options</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Benefits and Considerations
            </h2>
            <p className="text-slate-500 text-[14.5px] leading-relaxed">
              Understand both sides of securing a mortgage in Australia from overseas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Benefits */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-[#0B1F3A] text-[18px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Benefits
                </h3>
              </div>
              <ul className="space-y-4 pt-2">
                {[
                  "Potential to borrow up to 95% of the property value for some non-residents",
                  "Specialised loans that accept foreign income and offer interest-only options",
                  "Opportunity to invest in Australia’s stable property market and benefit from long-term growth"
                ].map((feat, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-[13px] text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Considerations */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-[#0B1F3A] text-[18px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Considerations
                </h3>
              </div>
              <ul className="space-y-4 pt-2">
                {[
                  "FIRB approval adds extra steps, cost, and time",
                  "Limited lender options available to non-residents",
                  "Documenting foreign income and assets can be complicated",
                  "Deposit requirements are typically higher than for residents"
                ].map((feat, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-[13px] text-slate-600">
                    <AlertCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHO CAN QUALIFY (ELIGIBLE VISAS & REQUIREMENTS) ── */}
      <section id="eligibility" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-4">
              <UserCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Eligible Categories</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Who Can Qualify for a Non-Resident Home Loan?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Eligible Groups */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-[#0B1F3A] text-[18px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Eligible Groups
              </h3>
              <ul className="space-y-3 pt-2">
                {[
                  "Australian citizens living overseas (expats)",
                  "Permanent residents and New Zealand citizens abroad",
                  "Temporary visa holders (such as 457, 482, 485, 820, 309 visas)",
                  "Foreign citizens living overseas"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-[13px] text-slate-600 font-medium">
                    <div className="w-5.5 h-5.5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ✓
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Basic Requirements */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-[#0B1F3A] text-[18px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Basic Requirements
              </h3>
              <ul className="space-y-3 pt-2">
                {[
                  "Minimum age 18 years & Valid passport/visa/ID",
                  "Proof of stable income (USD, GBP, EUR, AUD, etc.)",
                  "Clean credit history & FIRB approval where required",
                  "Deposits usually between 30% and 40%",
                  "Property located in Category 1 or 2 postcode areas"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-[13px] text-slate-600 font-medium">
                    <div className="w-5.5 h-5.5 rounded-full bg-slate-50 border border-slate-250 text-slate-500 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TEMPORARY FOREIGN BUYER BAN ── */}
      <section id="foreign-ban" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto">
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-100 rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/20 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-inner">
                  <Ban className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">Government Regulation</span>
                  <h3 className="text-[#0B1F3A] text-[18px] sm:text-[22px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Critical Notice: Temporary Foreign Buyer Ban (April 2025 – March 2027)
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-[13.5px] leading-relaxed mb-8">
                The Australian Government has introduced a two-year ban on foreign persons purchasing established (previously owned) residential properties. This ban applies from 1 April 2025 to 31 March 2027 and aims to improve housing affordability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-amber-100/80">
                {/* Column 1 */}
                <div className="space-y-4">
                  <h4 className="text-[14px] font-extrabold text-[#0B1F3A]">Allowed purchases during this period:</h4>
                  <ul className="space-y-3.5">
                    {["Newly built properties (never sold or occupied)", "Vacant land for new builds (with approval)"].map((feat, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs leading-relaxed text-slate-500">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <h4 className="text-[14px] font-extrabold text-[#0B1F3A]">Exemptions include:</h4>
                  <ul className="space-y-3.5">
                    {[
                      "Australian citizens (including expats) & Permanent residents",
                      "New Zealand citizens & Spouses of citizens/PR holders",
                      "Investments that demonstrably increase housing supply",
                      "Note: Temporary residents still require FIRB approval"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs leading-relaxed text-slate-500">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: STEPS TO APPLY ── */}
      <section id="steps" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-amber-100 rounded-full px-4 py-2 mb-4">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Application Steps</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              How to Get Started: Applying for a Non-Resident Home Loan
            </h2>
            <p className="text-slate-500 text-[14.5px] leading-relaxed">
              Buying property in Australia as a Nepali non-resident or temporary visa holder can be complex, but the process becomes much simpler with the right guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                title: "1. Speak to a Specialist",
                desc: "Choose a Nepali mortgage broker in Australia who understands non-resident lending requirements and can guide you step by step."
              },
              {
                title: "2. Assess Capacity",
                desc: "Your broker will evaluate your financial situation to determine how much you can borrow and which loan options are available."
              },
              {
                title: "3. Prepare Documents",
                desc: "Common requirements include: Passport and visa details, proof of income, and evidence of deposit savings."
              },
              {
                title: "4. FIRB Approval",
                desc: "For non-residents, approval from the Foreign Investment Review Board (FIRB) may be necessary. Your broker will guide you through this."
              },
              {
                title: "5. Submit & Comm",
                desc: "Your broker manages the application and communicates with lenders on your behalf, increasing approval chances and reducing stress."
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white hover:bg-slate-50 p-6 rounded-2xl border border-slate-200/80 transition-colors flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-extrabold text-xs mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="text-[#0B1F3A] font-extrabold text-[14px] mb-2">{card.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: READY TO BUY (HOW WE HELP) ── */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Mortgage Xperts Guidance</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Ready to Buy Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">in Australia?</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] leading-relaxed">
                Whether you’re planning to move to Australia or invest in property from overseas, Mortgage Xperts ensures your home-buying journey is simple, clear, and stress-free.
              </p>
              
              <ul className="space-y-3.5 pt-2">
                {[
                  "Explain lender requirements in simple language",
                  "Compare loan options suitable for non-residents",
                  "Help maximise your borrowing power while minimising costs",
                  "Assist with all documentation and loan applications"
                ].map((feat, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-[13px] text-slate-600 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 sm:p-8 space-y-6">
              <h4 className="text-[#0B1F3A] font-extrabold text-[16px]">Expat &amp; Temporary Resident Support</h4>
              <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed">
                Connect with our accredited multi-lingual brokers today. We verify your visa class policies, review overseas credit criteria, and ensure FIRB submissions are filed correctly.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-1.5 w-full rounded-xl bg-gradient-to-r from-amber-550 to-yellow-500 hover:from-amber-600 hover:to-yellow-550 text-white text-[13.5px] font-bold py-3.5 shadow-lg shadow-amber-500/10 transition-colors cursor-pointer"
              >
                Connect with an Expat Broker
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 7: LIVE VISA CALCULATOR ── */}
      <section id="calculator-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[33%_67%] gap-8 lg:gap-12 items-center">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-6">
                <Calculator className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-705 text-[10px] font-bold tracking-widest uppercase">Lending Modeler</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Expat &amp; Visa Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Deposit Modeler</span>
              </h2>
              <p className="text-slate-550 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-6">
                Calculate your required LVR deposit threshold and estimate potential FIRB fees based on visa residency status.
              </p>

              <div className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-4 max-w-md shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Foreign Income Conversions</h4>
                    <p className="text-slate-500 text-[12.5px] leading-relaxed">Banks typically apply a 20% haircut to foreign incomes for security margin.</p>
                  </div>
                </div>

                <hr className="border-slate-200" />

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">FIRB Submission Tracking</h4>
                    <p className="text-slate-500 text-[12.5px] leading-relaxed">We coordinate directly with legal counsel to manage FIRB documentation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Calculator Widget */}
            <div className="relative w-full">
              <div className="bg-white border border-slate-200/80 rounded-[24px] shadow-xl shadow-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-[54%_46%]">
                
                {/* Inputs (54%) */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-1">
                    <span className="text-slate-900 text-xs font-black uppercase tracking-wider">1. Financial Inputs</span>
                    <span className="text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold uppercase">Inputs</span>
                  </div>

                  {/* Visa Status Select */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Visa / Residency Status</label>
                    <select
                      value={residencyStatus}
                      onChange={(e) => setResidencyStatus(e.target.value as "expat" | "temporary-visa" | "foreign-citizen")}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-amber-500"
                    >
                      <option value="expat">Australian Expat (Living Abroad)</option>
                      <option value="temporary-visa">Temporary Visa Holder (482, 485, etc.)</option>
                      <option value="foreign-citizen">Foreign Citizen (Living Abroad)</option>
                    </select>
                  </div>

                  {/* Income Source Select */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Primary Income Source</label>
                    <select
                      value={incomeSource}
                      onChange={(e) => setIncomeSource(e.target.value as "aud" | "foreign")}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-amber-500"
                    >
                      <option value="aud">Australian Dollars (AUD)</option>
                      <option value="foreign">Foreign Currency (USD, GBP, EUR, etc.)</option>
                    </select>
                  </div>

                  {/* Saved Deposit */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Saved Deposit Savings</span>
                      <span className="text-slate-900 font-black text-[13px]">${depositSaved.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={600000}
                      step={10000}
                      value={depositSaved}
                      onChange={(e) => setDepositSaved(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$50,000</span>
                      <span>$600,000</span>
                    </div>
                  </div>

                  {/* Purchase Price */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Estimated Purchase Price</span>
                      <span className="text-slate-900 font-black text-[13px]">${purchasePrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={300000}
                      max={1800000}
                      step={20000}
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$300,000</span>
                      <span>$1.8M</span>
                    </div>
                  </div>
                </div>

                {/* Outputs (46%) */}
                <div className="bg-gradient-to-b from-[#0B1F3A] to-[#040C1A] text-white p-4 sm:p-6 flex flex-col justify-between relative">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Lending Results</span>
                      <span className="text-[9px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">LVR: {lvrValue}%</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">EST. FIRB APPLICATION FEE</span>
                      <div className="space-y-1">
                        <span className="text-[24px] sm:text-[30px] font-black text-amber-400 leading-none">
                          {estimatedFirbFee > 0 ? `$${estimatedFirbFee.toLocaleString()}` : "Fee Waived"}
                        </span>
                        <span className="text-[10px] text-amber-300 font-extrabold uppercase block tracking-wider">
                          {residencyStatus === "expat" ? "✓ Citizen Expat Exemption" : "FIRB Approval Required"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">Deposit Validation</span>
                      {isDepositSufficient ? (
                        <span className="text-[13px] font-bold text-emerald-400 leading-none block">
                          ✓ Saved Deposit Meets Min. {minRequiredDepositPct}% Rule
                        </span>
                      ) : (
                        <span className="text-[13px] font-bold text-rose-400 leading-none block">
                          Deposit Below Min. {minRequiredDepositPct}% Target
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">Est. Monthly Repayments</span>
                      <span className="text-[22px] font-black text-white leading-none">${Math.round(monthlyRepayment).toLocaleString()}/mo</span>
                      <span className="text-[9px] text-white/60 block mt-1">
                        calculated at {applicableRate.toFixed(2)}% interest rate margin
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    {!calcSubmitted ? (
                      <form onSubmit={handleCalcLeadSubmit} className="space-y-2">
                        <div className="grid grid-cols-2 gap-1.5">
                          <input
                            type="text"
                            required
                            placeholder="Name"
                            value={calcLeadName}
                            onChange={(e) => setCalcLeadName(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Phone"
                            value={calcLeadPhone}
                            onChange={(e) => setCalcLeadPhone(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10"
                          />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={calcLeadEmail}
                          onChange={(e) => setCalcLeadEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10"
                        />
                        <button
                          type="submit"
                          disabled={calcSubmitting}
                          className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-amber-550 to-yellow-500 hover:from-amber-600 hover:to-yellow-550 text-white font-bold text-[12px] py-2.5 transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                        >
                          {calcSubmitting ? "Submitting..." : "Get Detailed Lenders Report"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 text-center space-y-1">
                        <CheckCircle2 className="w-6 h-6 text-amber-400 mx-auto" />
                        <h4 className="text-[13px] font-extrabold text-amber-400">Calculation Saved!</h4>
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

      {/* ── SECTION 8: FAQS ACCORDION ── */}
      <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-705">FAQ Helpdesk</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">We Have Answers</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-sm">
                Everything you need to know about the home loan process for expats and foreign non-residents.
              </p>

              {/* Specialist Contact Card */}
              <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-550 to-yellow-500" />
                <h4 className="text-[16px] font-extrabold text-[#0B1F3A]">Buying property from abroad?</h4>
                <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed">
                  We provide end-to-end support for digital ID verification, overseas contract notarisation, and coordinating with Australian legal conveyancers.
                </p>
                
                {/* Specialists Avatars */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2.5">
                    {[
                      { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80", alt: "Expat Specialist 1" },
                      { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80", alt: "Expat Specialist 2" },
                      { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&h=100&q=80", alt: "Expat Specialist 3" }
                    ].map((avatar, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-[11.5px] text-slate-500 font-medium">
                    Talk to our <span className="font-bold text-[#0B1F3A]">expat lending desk</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-550 to-yellow-500 hover:from-amber-600 hover:to-yellow-550 text-white text-[13px] font-bold px-6 py-3 shadow-lg shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Consult a Specialist
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Accordion */}
            <div className="space-y-3.5">
              {[
                {
                  q: "How much deposit do I need to buy my first home?",
                  a: "For permanent residents and citizens, a 5% to 20% deposit is normal. However, foreign citizen non-residents generally need a 30% to 40% deposit to qualify under bank policies."
                },
                {
                  q: "What is Lenders Mortgage Insurance (LMI)?",
                  a: "LMI protects the lender if the borrower defaults. It applies to loans with LVRs over 80%. For foreign citizen non-residents, LVR is typically capped at 70% or 80%, meaning LMI is bypassed but a larger deposit is required."
                },
                {
                  q: "What government assistance is available for first-home buyers?",
                  a: "Temporary resident visa holders and foreign citizens are usually not eligible for first home owner grants or stamp duty concessions, which are restricted to citizens and permanent residents."
                },
                {
                  q: "Do I need pre-approval before buying?",
                  a: "Yes. Given the complexity of FIRB rules and bank income haircutting policy, securing pre-approval before inspecting properties is highly recommended."
                },
                {
                  q: "Can I buy with a partner or family member?",
                  a: "Yes. Joint applications are accepted. If one partner is a permanent resident or citizen, the loan requirements and stamp duty surcharges may be significantly lower."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-[#0B1F3A] text-[13.5px] sm:text-[14.5px] hover:text-[#d97706] transition-colors"
                  >
                    <span className="pr-4 leading-tight">{faq.q}</span>
                    <div className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/60 transition-transform ${openFaqIndex === idx ? "rotate-180 text-[#d97706]" : ""}`}>
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

      {/* ── SECTION 10: CLIENT TESTIMONIALS (DYNAMIC) ── */}
      <TestimonialSection badgeText="Google Reviews" />

      {/* ── SECTION 11: ENQUIRY CALLBACK FORM ── */}
      <section id="contact" className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            
            {/* Context */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-amber-100 rounded-full px-4 py-2">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Get in Touch</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Enquire About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Non-Resident Home Loans</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                Connect with our accredited multi-lingual mortgage brokers to check your non-resident and temporary resident visa options.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "No cost or obligation consultations",
                  "Access to specialist non-resident lenders",
                  "FIRB guidance and document preparation support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className="text-[13px] text-slate-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Box */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
              {!enquirySubmitted ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0400 000 000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your query or question here..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    By clicking &apos;Submit Enquiry&apos;, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert&apos;s accredited brokers.
                  </p>

                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {submittingEnquiry ? "Submitting..." : "Submit Enquiry"}
                    <ArrowRight className="w-4 h-4" />
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

      {/* ── SECTION 12: RELATED TOPICS ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <h3 className="text-[#0B1F3A] text-xs font-black uppercase tracking-widest mb-8">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Understanding FIRB Approval for Foreign Property Buyers in Australia",
                desc: "Explore details on application costs, wait times, and step-by-step registration instructions."
              },
              {
                title: "How Temporary Visa Holders Can Secure a Home Loan in Australia",
                desc: "Check which visa categories (482, 485, etc.) qualify for standard LVR rates."
              },
              {
                title: "Understanding FIRB Approval: What Non-Residents Need to Know",
                desc: "Find which properties are exempt and what requirements apply when purchasing residential land."
              },
              {
                title: "How to Prove Foreign Income When Applying for an Australian Home Loan",
                desc: "Check currency conversion calculations, payslip requirements, and translation guidelines."
              },
              {
                title: "What Is FIRB Approval and Why Is It Important for Buyers?",
                desc: "Learn details on regulatory compliance, legal fines, and the role of the Australian Taxation Office."
              },
              {
                title: "Australian Home Loan Options for Expats Living Abroad",
                desc: "Specific credit structures for Australian citizens or permanent residents earning overseas income."
              }
            ].map((topic, idx) => (
              <div key={idx} className="bg-slate-50 hover:bg-slate-100/50 p-6 rounded-2xl border border-slate-200 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-widest block mb-2">Non Resident Home Loans</span>
                  <h4 className="text-[#0B1F3A] font-bold text-[14px] leading-snug mb-2">{topic.title}</h4>
                  <p className="text-slate-550 text-xs leading-relaxed">{topic.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-150 flex items-center justify-between text-[11px] font-bold text-amber-600">
                  <span>Explore topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <SiteFooter settings={settings} />
    </div>
  );
}
