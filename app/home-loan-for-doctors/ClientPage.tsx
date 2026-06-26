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
  const { openModal } = useOnboardingModal();
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
  const [grossSalary, setGrossSalary] = useState(160000);
  const [practiceProfits, setPracticeProfits] = useState(40000); // ABN or private consulting
  const [depositSaved, setDepositSaved] = useState(90000);
  const [purchasePrice, setPurchasePrice] = useState(900000);
  const [isMedicalRegistered, setIsMedicalRegistered] = useState(true);

  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [calcSubmitting, setCalcSubmitting] = useState(false);

  // Calculator Logic
  const assessedIncome = grossSalary + practiceProfits;
  const loanRequired = Math.max(0, purchasePrice - depositSaved);
  const lvrValue = Math.round((loanRequired / purchasePrice) * 100);

  // Standard LMI
  const estimatedStandardLmi = (() => {
    if (lvrValue <= 80) return 0;
    if (lvrValue <= 90) return Math.round(loanRequired * 0.026);
    if (lvrValue <= 95) return Math.round(loanRequired * 0.043);
    return Math.round(loanRequired * 0.055);
  })();

  // Doctors LMI Waiver: Typically LVR up to 90% or 95% if registered with medical board and income is >= $120k
  const isLmiWaived = lvrValue <= 95 && assessedIncome >= 120000 && isMedicalRegistered;
  const savedLmiAmount = isLmiWaived ? estimatedStandardLmi : 0;

  const currentInterestRate = settings.interest_rate ? parseFloat(settings.interest_rate) : 6.19;
  const doctorDiscountedRate = Math.max(5.19, currentInterestRate - 0.40); // Medical professional discount

  const getMonthlyRepayment = (amount: number, rate: number) => {
    const r = rate / 100 / 12;
    const n = 30 * 12;
    if (r === 0) return amount / n;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const monthlyRepaymentStandard = getMonthlyRepayment(loanRequired + (!isLmiWaived ? estimatedStandardLmi : 0), currentInterestRate);
  const monthlyRepaymentDoctor = getMonthlyRepayment(loanRequired, doctorDiscountedRate);

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
      "benefits",
      "lmi-waivers",
      "borrowing-capacity",
      "deposit-features",
      "broker-support",
      "documentation",
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
        type: "doctors-callback",
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
          type: "doctors-calculator",
          name: calcLeadName,
          email: calcLeadEmail,
          phone: calcLeadPhone,
          savings: String(savedLmiAmount),
          income: String(assessedIncome),
          message: `Doctors Borrowing Calculation. Gross Salary: $${grossSalary}, Practice Profits: $${practiceProfits}, Deposit: $${depositSaved}, Purchase Price: $${purchasePrice}, Medical Registered: ${isMedicalRegistered ? "Yes" : "No"}, LVR: ${lvrValue}%, Saved LMI: $${savedLmiAmount}, Doctor Monthly Repay: $${Math.round(monthlyRepaymentDoctor)}`
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
    { id: "benefits", label: "Benefits", icon: Sparkles },
    { id: "lmi-waivers", label: "LMI Waivers", icon: Percent },
    { id: "borrowing-capacity", label: "Borrowing Power", icon: TrendingUp },
    { id: "deposit-features", label: "Loan Features", icon: Wallet },
    { id: "broker-support", label: "Broker Help", icon: Users },
    { id: "documentation", label: "Required Docs", icon: FileText },
    { id: "calculator-section", label: "Calculator", icon: Calculator },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "contact", label: "Enquire Now", icon: ArrowRight }
  ];

  const badgeText = pageHeroSettings?.hero_badge || "Doctors & Medical Specialists";
  const titleText = pageHeroSettings?.hero_title || "Specialist Home Loans for Doctors & Surgeons";
  const subtextText = pageHeroSettings?.hero_subtext || "Doctors and medical professionals, whether you’re a full-time salaried doctor, a casual medical practitioner, or self-employed running your own practice under an Australian Business Number (ABN), often have access to special home loan benefits.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/doctor_hero.png";
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
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#0ea5e9 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-sky-50 opacity-40 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 85% 90% at 62% 52%, #F0F9FF 0%, #E0F2FE 42%, #F8FAFC 62%, transparent 82%)"
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
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-slate-400">Home Loans</span>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-sky-600 font-bold">Doctors Home Loans</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">
            {/* Left Column Text & Badges */}
            <motion.div initial="hidden" animate="visible" variants={premiumStagger} className="flex flex-col justify-center z-10">
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-sky-50 border-sky-250/50 text-sky-800 w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 shrink-0" />
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className="w-14 h-[3px] bg-sky-500 mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-5 max-w-xl">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #F0F9FF 0%, #E0F2FE 40%, #F8FAFC 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                {(!btn1Link || btn1Link === "#" || btn1Link === "#contact" || btn1Link === "#callback") ? (
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-sky-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap cursor-pointer border-0"
                  >
                    {btn1Text} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={btn1Link}
                    className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-sky-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap"
                  >
                    {btn1Text} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {(btn2Link === "#contact" || btn2Link === "#callback") ? (
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 border-2 border-sky-600 text-sky-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-sky-600 hover:text-white text-center w-full sm:w-auto whitespace-nowrap cursor-pointer border-0 bg-transparent"
                  >
                    {btn2Text}
                  </button>
                ) : (
                  <a
                    href={btn2Link}
                    onClick={(e) => {
                      if (btn2Link.startsWith("#")) {
                        e.preventDefault();
                        document.getElementById(btn2Link.substring(1))?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 border-2 border-sky-600 text-sky-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-sky-600 hover:text-white text-center w-full sm:w-auto whitespace-nowrap"
                  >
                    {btn2Text}
                  </a>
                )}
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
                      Accredited Medical Brokerage
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
                  <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-700 shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5 text-sky-600" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {["LMI Waiver Approved", "Special Medical Rate Cuts", "High Borrowing Capacity"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
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
                        ? "bg-gradient-to-br from-sky-600 to-teal-500 text-white shadow-[0_4px_12px_rgba(14,165,233,0.22)] font-bold"
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
                            ? "bg-gradient-to-br from-sky-600 to-teal-500 text-white shadow-[0_4px_12px_rgba(14,165,233,0.22)] font-bold"
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
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-sky-700 text-[10px] font-bold tracking-widest uppercase">Premium Medical Lending</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Home Loans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">Doctors &amp; Medical Professionals</span>
              </h2>
              <p className="text-slate-550 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                Doctors and medical professionals, whether you’re a full-time salaried doctor, a casual medical practitioner, or self-employed running your own practice under an Australian Business Number (ABN), often have access to special home loan benefits. Lenders recognise the stable income, high earning potential, and lower risk profile of medical careers and provide tailored home loan options to reflect this.
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-sky-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">ABN / Practice Structures Assessed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-sky-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Specialist Rate Discounts</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#E0F2FE] opacity-30 rounded-bl-full pointer-events-none" />
              <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Why Doctors Benefit
              </h3>
              <p className="text-slate-550 text-[12.5px] leading-relaxed">
                Lenders view doctors as highly responsible borrowers due to stable, high-earning incomes, solid financial knowledge, and low historical default rates.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  "Waived or reduced Lenders Mortgage Insurance (LMI)",
                  "Lower interest rates or exclusive discounts",
                  "Higher borrowing limits and more flexible lending criteria"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-[12.5px] text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: BENEFITS OF HOME LOANS ── */}
      <section id="benefits" className="py-16 md:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-sky-700">Special Benefits</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Benefits of Home Loans <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">for Doctors</span>
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Medical careers represent the lowest risk class for Australian banks. Enjoy these premium loan package enhancements:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Percent,
                title: "Lower interest rates",
                desc: "Get access to exclusive rate discounts normally closed to general retail applicants."
              },
              {
                icon: ShieldCheck,
                title: "Waived or reduced LMI",
                desc: "Save up to $15,000+ upfront by skipping mortgage insurance even with a low 5% or 10% deposit."
              },
              {
                icon: TrendingUp,
                title: "Higher borrowing limits",
                desc: "Expand your capacity limit based on your professional medical earnings profile."
              },
              {
                icon: Calendar,
                title: "Flexible repayment options",
                desc: "Links to full dynamic offset accounts and zero penalties for early payouts."
              }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, boxShadow: "0 20px 30px rgba(14,165,233,0.06)" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-slate-200/80 rounded-[28px] p-6.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100/50 shadow-sm">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-[#0B1F3A] text-[16px] font-extrabold mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {benefit.title}
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: LMI WAIVERS FOR DOCTORS ── */}
      <section id="lmi-waivers" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#0B1F3A 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-sky-100 rounded-full px-4 py-2">
                <Star className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-sky-700">LMI Waiver Offers</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                LMI Waiver Offers <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">for Doctors</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] leading-relaxed">
                Lenders Mortgage Insurance (LMI) is a one-off insurance premium required if your deposit is below 20% of the property price. Many lenders waive LMI for doctors who meet criteria like being registered with a recognised medical board, having a stable income, and earning over $120,000 per year.
              </p>
            </div>

            {/* Savings Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-sky-500" />
              <h3 className="text-[#0B1F3A] text-[18px] font-black mb-4">Upfront Savings Example</h3>
              <p className="text-slate-550 text-[13.5px] leading-relaxed mb-4">
                If you&apos;re buying a $700,000 home with a 5% deposit ($35,000), an LMI waiver could save you between $10,000 and $15,000 or more in upfront fees.
              </p>
              <div className="text-xs font-black text-sky-700 bg-sky-50 rounded-xl p-3 inline-block">
                ✓ Typically saves doctors $12,500 – $22,000 on average properties
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: BORROWING CAPACITY ── */}
      <section id="borrowing-capacity" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-2">
                <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-sky-700">Lending Thresholds</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Higher Borrowing Capacity <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">for Doctors</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] leading-relaxed">
                Thanks to your earning potential and financial stability, doctors often qualify to borrow more than the average homebuyer. Lenders assess your borrowing capacity by reviewing salary/contract earnings, considering contract length, and factoring in living expenses and credit history.
              </p>
            </div>

            {/* ABN Self-Employed Doctors Graphic */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-28 h-28 bg-sky-100/20 opacity-30 rounded-bl-full pointer-events-none" />
              <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                ABN &amp; Self-Employed Doctors
              </h3>
              <p className="text-slate-500 text-[12.5px] leading-relaxed">
                If you’re self-employed or work under an ABN, lenders will usually require extra financial documents such as tax returns and profit and loss statements, but they often offer more flexible assessments for medical professionals.
              </p>
              
              <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex gap-4 items-start shadow-inner">
                <div className="w-6 h-6 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  i
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#0B1F3A]">Flexible Income Policy</h4>
                  <p className="text-slate-550 text-[11px] leading-relaxed mt-0.5">
                    We know how to calculate private patient dividends, training hospital overtime margins, and specialist contractor invoicing correctly for credit committees.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: DEPOSIT REQUIREMENTS & FEATURES ── */}
      <section id="deposit-features" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-sky-100 rounded-full px-4 py-2 mb-4">
              <Wallet className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-sky-700">Flexible Structures</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Deposit Requirements &amp; Flexible Loan Features
            </h2>
            <p className="text-slate-500 text-[14.5px] leading-relaxed">
              While standard home loans generally require a 20% deposit, doctors may be able to buy with as little as 5–10% deposit thanks to LMI waivers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Offset Accounts",
                desc: "Link your transaction accounts to reduce interest charges on your outstanding loan balance."
              },
              {
                title: "Redraw Facilities",
                desc: "Easily withdraw extra repayments you have previously made if you need cash flow."
              },
              {
                title: "Extra Repayments",
                desc: "Pay down principal faster without incurring early repayment or exit penalties."
              },
              {
                title: "Split Loans",
                desc: "Divide your borrowing into part-fixed and part-variable to hedge against rate shifts."
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-[28px] p-6.5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h4 className="text-[#0B1F3A] font-extrabold text-[15px] mb-2">{item.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: BROKER HELP ── */}
      <section id="broker-support" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 mb-4">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-sky-700">Specialist Brokerage</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              How a Mortgage Broker Can Help Doctors Secure Better Deals
            </h2>
            <p className="text-slate-500 text-[14.5px] leading-relaxed">
              Medical professional lending guidelines are complex and vary greatly across lenders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                title: "Exclusive Rates",
                desc: "Identify banks offering unpublished interest rate cuts for doctors."
              },
              {
                title: "LMI Exemptions",
                desc: "Navigate custom 90% and 95% LVR waived LMI schemes."
              },
              {
                title: "Clean Document Prep",
                desc: "Gather complex income records for PAYG, ABN, and practice structures."
              },
              {
                title: "Government Grants",
                desc: "Apply for first home owner grants and state incentives smoothly."
              },
              {
                title: "Priority Underwriting",
                desc: "Fast-track your validation process with direct access panels."
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-slate-50 hover:bg-slate-100/50 p-6 rounded-2xl border border-slate-200 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-extrabold text-xs mb-4">
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

      {/* ── SECTION 7: DOCUMENTATION REQUIREMENTS ── */}
      <section id="documentation" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-sky-100 rounded-full px-4 py-2 mb-4">
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-sky-700">Checklist Guide</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Documentation Requirements for Doctors
            </h2>
            <p className="text-slate-500 text-[14.5px] leading-relaxed">
              Having the right documents sorted avoids processing delays. Here is what you will need to prepare:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Employed/Casual Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Employed or Casual Doctors
                </h3>
                <span className="inline-flex text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded">
                  Salaried / Hospital Staff
                </span>
              </div>
              <ul className="space-y-3.5 pt-2">
                {[
                  "Recent payslips (typically last 3 months)",
                  "Latest tax returns (1–2 years)",
                  "Employment contracts or hospital confirmation letters",
                  "Current AHPRA registration certificate"
                ].map((feat, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-[13px] text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Self-Employed / ABN Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Self-Employed &amp; ABN Holders
                </h3>
                <span className="inline-flex text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-100 rounded">
                  Practice Owners / Private Consultants
                </span>
              </div>
              <ul className="space-y-3.5 pt-2">
                {[
                  "Business financial statements (P&L, balance sheets)",
                  "Tax returns for the last 2 years (Business & Personal)",
                  "Recent Business Activity Statements (BAS)",
                  "Lender-mapped bank statements (last 6 months)",
                  "Proof of active medical board registration"
                ].map((feat, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-[13px] text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: LIVE DOCTORS CALCULATOR ── */}
      <section id="calculator-section" className="py-16 md:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[33%_67%] gap-8 lg:gap-12 items-center">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 mb-6">
                <Calculator className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-sky-700 text-[10px] font-bold tracking-widest uppercase">Specialist Modeler</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Doctors LMI &amp; Rate <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">Savings Estimator</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-6">
                Calculate your borrowing capacity, waived Lenders Mortgage Insurance, and rate cuts with medical professional discounts.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 max-w-md shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Medical LMI Waiver</h4>
                    <p className="text-slate-500 text-[12.5px] leading-relaxed">Save up to $20,000+ in upfront bank fees with LVR thresholds up to 95%.</p>
                  </div>
                </div>

                <hr className="border-slate-200" />

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Specialist Rate Cuts</h4>
                    <p className="text-slate-500 text-[12.5px] leading-relaxed">Get lower interest rates mapped directly to medical registration holders.</p>
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
                    <span className="text-[9px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full font-bold uppercase">Inputs</span>
                  </div>

                  {/* Medical Board Switch */}
                  <div className="flex items-center justify-between bg-sky-50/50 border border-sky-100/50 p-2.5 rounded-xl">
                    <span className="text-xs font-bold text-slate-700">Are you AHPRA Registered?</span>
                    <button
                      type="button"
                      onClick={() => setIsMedicalRegistered(!isMedicalRegistered)}
                      className={`relative inline-flex h-5.5 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isMedicalRegistered ? "bg-sky-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isMedicalRegistered ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Gross Salary */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Gross Annual Salary (PAYG)</span>
                      <span className="text-slate-900 font-black text-[13px]">${grossSalary.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={60000}
                      max={350000}
                      step={10000}
                      value={grossSalary}
                      onChange={(e) => setGrossSalary(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$60,000</span>
                      <span>$350,000</span>
                    </div>
                  </div>

                  {/* Practice / Private consulting profits */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>ABN / Private Consulting Profits</span>
                      <span className="text-slate-900 font-black text-[13px]">${practiceProfits.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={250000}
                      step={10000}
                      value={practiceProfits}
                      onChange={(e) => setPracticeProfits(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$0</span>
                      <span>$250,005</span>
                    </div>
                  </div>

                  {/* Deposit Saved */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Saved Deposit</span>
                      <span className="text-slate-900 font-black text-[13px]">${depositSaved.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={350000}
                      step={5000}
                      value={depositSaved}
                      onChange={(e) => setDepositSaved(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$10,000</span>
                      <span>$350,000</span>
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
                      max={2200000}
                      step={20000}
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$300,000</span>
                      <span>$2.2M</span>
                    </div>
                  </div>
                </div>

                {/* Outputs (46%) */}
                <div className="bg-gradient-to-b from-[#0B1F3A] to-[#040C1A] text-white p-4 sm:p-6 flex flex-col justify-between relative">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">Lending Results</span>
                      <span className="text-[9px] bg-sky-500/10 text-sky-300 border border-sky-500/20 px-2 py-0.5 rounded-full font-bold">LVR: {lvrValue}%</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">LMI SAVED AMOUNT</span>
                      {isLmiWaived ? (
                        <div className="space-y-1">
                          <span className="text-[24px] sm:text-[30px] font-black text-sky-400 leading-none">
                            ${savedLmiAmount.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-sky-300 font-extrabold uppercase block tracking-wider">
                            ✓ Medical LMI Waiver Approved
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-[20px] font-bold text-rose-400 leading-none">
                            LMI Applicable
                          </span>
                          <span className="text-[10px] text-white/60 block leading-tight">
                            Requires {lvrValue <= 95 ? "AHPRA Registration & $120k+ Income" : "LVR <= 95%"} for waiver. LMI fee: ${estimatedStandardLmi.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">Est. Monthly Repayments</span>
                      <span className="text-[22px] font-black text-white leading-none">${Math.round(monthlyRepaymentDoctor).toLocaleString()}/mo</span>
                      <span className="text-[9px] text-white/60 block mt-1">
                        at discounted {doctorDiscountedRate.toFixed(2)}% rate (standard is ${Math.round(monthlyRepaymentStandard).toLocaleString()})
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
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-sky-500 focus:bg-white/10"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Phone"
                            value={calcLeadPhone}
                            onChange={(e) => setCalcLeadPhone(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-sky-500 focus:bg-white/10"
                          />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={calcLeadEmail}
                          onChange={(e) => setCalcLeadEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-sky-500 focus:bg-white/10"
                        />
                        <button
                          type="submit"
                          disabled={calcSubmitting}
                          className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-700 hover:to-teal-600 text-white font-bold text-[12px] py-2.5 transition-all cursor-pointer shadow-lg shadow-sky-500/10"
                        >
                          {calcSubmitting ? "Submitting..." : "Get Detailed Lenders Report"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <div className="bg-sky-950/40 border border-sky-500/30 rounded-xl p-4 text-center space-y-1">
                        <CheckCircle2 className="w-6 h-6 text-sky-400 mx-auto" />
                        <h4 className="text-[13px] font-extrabold text-sky-400">Calculation Saved!</h4>
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

      {/* ── SECTION 9: FAQS ACCORDION ── */}
      <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-sky-705">FAQ Helpdesk</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">We Have Answers</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-sm">
                Everything you need to know about the home loan process for doctors and medical practitioners.
              </p>

              {/* Specialist Contact Card */}
              <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 to-teal-500" />
                <h4 className="text-[16px] font-extrabold text-[#0B1F3A]">Confused by complex income models?</h4>
                <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed">
                  We frequently work with registrars, surgeons, and locum contractors who have multiple complex income streams. Let us handle the mapping for you.
                </p>
                
                {/* Specialists Avatars */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2.5">
                    {[
                      { src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&h=100&q=80", alt: "Doctor Specialist 1" },
                      { src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&h=100&q=80", alt: "Doctor Specialist 2" },
                      { src: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=100&h=100&q=80", alt: "Doctor Specialist 3" }
                    ].map((avatar, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shrink-0">
                        
                        <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-[11.5px] text-slate-500 font-medium">
                    Talk to our <span className="font-bold text-[#0B1F3A]">specialist medical brokers</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="button" onClick={openModal} className="cursor-pointer border-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-700 hover:to-teal-600 text-white text-[13px] font-bold px-6 py-3 shadow-lg shadow-sky-500/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
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
                  a: "Typically, standard buyers need 20% to avoid LMI. However, doctors can secure home loans with a deposit as low as 5% to 10% with 100% waived Lenders Mortgage Insurance."
                },
                {
                  q: "What is Lenders Mortgage Insurance (LMI)?",
                  a: "LMI is a premium that protects the bank if a borrower defaults. For medical practitioners, most lenders waive this fee entirely up to 90% or 95% LVR due to their career security."
                },
                {
                  q: "What government assistance is available for first-home buyers?",
                  a: "Available assistance includes the First Home Guarantee (to buy with 5% deposit and skip LMI via government guarantee), stamp duty concessions, and new home construction grants."
                },
                {
                  q: "Do I need pre-approval before buying?",
                  a: "Yes. Getting pre-approved clarifies your buying power, locks in your rate packages, and allows you to submit binding offers at auctions."
                },
                {
                  q: "Can I buy with a partner or family member?",
                  a: "Yes. Combined incomes help increase your total borrowing power. As long as one applicant holds AHPRA registration and meets the policy guidelines, the LMI waiver benefits can still apply."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-[#0B1F3A] text-[13.5px] sm:text-[14.5px] hover:text-[#0ea5e9] transition-colors"
                  >
                    <span className="pr-4 leading-tight">{faq.q}</span>
                    <div className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/60 transition-transform ${openFaqIndex === idx ? "rotate-180 text-[#0ea5e9]" : ""}`}>
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
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-sky-100 rounded-full px-4 py-2">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-sky-700">Get in Touch</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Enquire About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">Doctor Home Loans</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                Connect with our medical home loan brokers to verify your LMI waiver status and compare special discounted interest rates.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "No cost or obligation consultations",
                  "Access to exclusive lender rate margins",
                  "Help gathering and submitting required papers"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    By clicking &apos;Submit Enquiry&apos;, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert&apos;s accredited brokers.
                  </p>

                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer flex items-center justify-center gap-1.5"
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
                title: "Investment Property Loans for Doctors",
                desc: "Explore professional medical structures designed to expand your wealth portfolio with tax-efficient investment finance."
              },
              {
                title: "Using a Mortgage Broker for Professional Home Loan Packages",
                desc: "Discover how our specialist medical panels negotiate customized home loans with rate cuts directly."
              },
              {
                title: "Understanding Professional Income Verification for Doctors",
                desc: "Learn how locum contracts, training stipends, and shift-allowance models are calculated by lenders."
              },
              {
                title: "Impact of Medical Residency & Training Contracts on Eligibility",
                desc: "Navigating short-term hospital rotations and residency placements without compromising approval speed."
              },
              {
                title: "Loan Features Tailored for Doctors: Interest-Only & Repayments",
                desc: "Maximize cash flow using interest-only facilities during residency, combined with flexible redraw access."
              }
            ].map((topic, idx) => (
              <div key={idx} className="bg-slate-50 hover:bg-slate-100/50 p-6 rounded-2xl border border-slate-200 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-sky-600 font-extrabold uppercase tracking-widest block mb-2">Home Loan For Doctors</span>
                  <h4 className="text-[#0B1F3A] font-bold text-[14px] leading-snug mb-2">{topic.title}</h4>
                  <p className="text-slate-550 text-xs leading-relaxed">{topic.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-150 flex items-center justify-between text-[11px] font-bold text-sky-600">
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
