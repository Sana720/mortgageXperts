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
  Plus,
  Minus
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

  // Document Checklist State
  const [checklist, setChecklist] = useState([
    { id: "id_proof", label: "Primary ID (Driver's Licence or Passport)", checked: false },
    { id: "payslips", label: "2-3 Most Recent Consecutive Payslips", checked: false },
    { id: "employment_contract", label: "Current Employment Contract (showing permanent status)", checked: false },
    { id: "salary_evidence", label: "Salary Credits evidenced in Bank Statements (3 months)", checked: false },
    { id: "hecs_debt", label: "HECS-HELP statement (if applicable)", checked: false },
    { id: "lmi_waiver_proof", label: "Registered Nurse (AHPRA) registration confirmation", checked: false }
  ]);

  const toggleChecklist = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checklistProgress = Math.round(
    (checklist.filter(item => item.checked).length / checklist.length) * 100
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
  const [grossSalary, setGrossSalary] = useState(85000);
  const [allowances, setAllowances] = useState(15000); // Shift allowances / overtime
  const [depositSaved, setDepositSaved] = useState(35000);
  const [purchasePrice, setPurchasePrice] = useState(550000);
  
  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [calcSubmitting, setCalcSubmitting] = useState(false);

  // Calculator Logic
  const assessedIncome = grossSalary + allowances;
  const loanRequired = Math.max(0, purchasePrice - depositSaved);
  const lvrValue = Math.round((loanRequired / purchasePrice) * 100);

  // Standard LMI is typically around 2.2% of loan value when LVR is between 80% and 90%
  // And 3.8% of loan value when LVR is between 90% and 95%.
  const estimatedStandardLmi = (() => {
    if (lvrValue <= 80) return 0;
    if (lvrValue <= 90) return Math.round(loanRequired * 0.022);
    if (lvrValue <= 95) return Math.round(loanRequired * 0.038);
    return Math.round(loanRequired * 0.048);
  })();

  const isLmiWaived = lvrValue <= 90; // Nurse LMI Waiver policy (up to 90% LVR)
  const savedLmiAmount = isLmiWaived ? estimatedStandardLmi : 0;

  const currentInterestRate = settings.interest_rate ? parseFloat(settings.interest_rate) : 6.19;
  const nurseDiscountedRate = Math.max(5.19, currentInterestRate - 0.25); // Nurse discount

  const getMonthlyRepayment = (amount: number, rate: number) => {
    const r = rate / 100 / 12;
    const n = 30 * 12;
    if (r === 0) return amount / n;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const monthlyRepaymentStandard = getMonthlyRepayment(loanRequired + (!isLmiWaived ? estimatedStandardLmi : 0), currentInterestRate);
  const monthlyRepaymentNurse = getMonthlyRepayment(loanRequired, nurseDiscountedRate);

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
      "deposit-requirements",
      "grants",
      "calculator-section",
      "checklist-section",
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
        type: "nurses-callback",
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
          type: "nurses-calculator",
          name: calcLeadName,
          email: calcLeadEmail,
          phone: calcLeadPhone,
          savings: String(savedLmiAmount),
          income: String(assessedIncome),
          message: `Nurses Borrowing Calculation. Gross Salary: $${grossSalary}, Allowances: $${allowances}, Deposit: $${depositSaved}, Purchase Price: $${purchasePrice}, LVR: ${lvrValue}%, Saved LMI: $${savedLmiAmount}, Nurse Monthly Repay: $${Math.round(monthlyRepaymentNurse)}`
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
    { id: "deposit-requirements", label: "Deposit Needs", icon: Wallet },
    { id: "grants", label: "Govt Grants", icon: Landmark },
    { id: "calculator-section", label: "Calculator", icon: Calculator },
    { id: "checklist-section", label: "Required Docs", icon: FileText },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "contact", label: "Enquire Now", icon: ArrowRight }
  ];

  const badgeText = pageHeroSettings?.hero_badge || "Healthcare Professionals";
  const titleText = pageHeroSettings?.hero_title || "Specialist Home Loans for Nurses & Midwives";
  const subtextText = pageHeroSettings?.hero_subtext || "Nurses provide vital care and support to communities, and many lenders recognise this by offering special home loan benefits tailored to healthcare professionals.";
  const imageSrc = "/images/hero_slide_2_green.png";
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
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#10B981 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-50 opacity-40 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 85% 90% at 62% 52%, #ECFDF5 0%, #D1FAE5 42%, #F8FAFC 62%, transparent 82%)"
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
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-slate-400">Home Loans</span>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-emerald-600 font-bold">Nurses Home Loans</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">
            {/* Left Column Text & Badges */}
            <motion.div initial="hidden" animate="visible" variants={premiumStagger} className="flex flex-col justify-center z-10">
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-emerald-50 border-emerald-250/50 text-emerald-800 w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className="w-14 h-[3px] bg-emerald-600 mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-555 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-5 max-w-xl">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #ECFDF5 0%, #D1FAE5 40%, #F8FAFC 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                <a
                  href={btn1Link}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-emerald-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap"
                >
                  {btn1Text} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={btn2Link}
                  className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-emerald-600 hover:text-white text-center w-full sm:w-auto whitespace-nowrap"
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
                  className="bg-white/95 border border-slate-200/80 rounded-3xl p-5 shadow-[0_20px_40px_rgba(11,31,58,0.1)] flex flex-col gap-3.5 w-[190px]"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {["LMI Waiver Approved", "Special Rate Cut", "Fast-Track Approval"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
                        ? "bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.22)] font-bold"
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
                            ? "bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.22)] font-bold"
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

      {/* ── SECTION 2: BENEFITS OF HOME LOANS FOR NURSES ── */}
      <section id="benefits" className="py-16 md:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700">Special Benefits</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Benefits of Home Loans <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">for Nurses</span>
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Many lenders offer home loan discounts and perks specifically to nurses, due to the steady income and job security their profession provides. These benefits make it easier and more affordable to buy your home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Percent,
                title: "Lower interest rates",
                desc: "Some lenders offer reduced interest rates to nurses, which can save you thousands over the life of your loan."
              },
              {
                icon: ShieldCheck,
                title: "Waived or reduced LMI",
                desc: "LMI is usually charged when your deposit is less than 20%. As a nurse, you may qualify to avoid this extra cost even with a smaller deposit."
              },
              {
                icon: Calendar,
                title: "Flexible repayment options",
                desc: "Lenders may allow you to make extra repayments without penalties, helping you pay off your loan faster."
              },
              {
                icon: Clock,
                title: "Quick loan approvals",
                desc: "Recognising your stable employment, lenders may fast-track your application to keep things simple."
              }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, boxShadow: "0 20px 30px rgba(16,185,129,0.06)" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-slate-200/80 rounded-[28px] p-6.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50 shadow-sm">
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

      {/* ── SECTION 3: EXCLUSIVE DISCOUNTS & LMI WAIVERS ── */}
      <section id="lmi-waivers" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#0B1F3A 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-emerald-100 rounded-full px-4 py-2 mb-4">
              <Star className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700">Waiver Schemes</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Exclusive Discounts &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Waived LMI Offers</span>
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Lenders understand that nurses are essential workers, and some offer exclusive discounts or waive LMI fees altogether.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-600" />
              <h3 className="text-[#0B1F3A] text-[18px] font-black mb-4">Waived LMI up to 90% LVR</h3>
              <p className="text-slate-550 text-[13.5px] leading-relaxed">
                If you have a deposit of 10% (instead of the standard 20%), you might still avoid paying LMI altogether, saving you thousands in upfront bank fees.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500" />
              <h3 className="text-[#0B1F3A] text-[18px] font-black mb-4">Public Hospital Interest Rate Cuts</h3>
              <p className="text-slate-555 text-[13.5px] leading-relaxed">
                Interest rate cuts or special medical staff packages apply if you are employed in a public hospital, health service provider, or registered nursing clinic.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: DEPOSIT REQUIREMENTS ── */}
      <section id="deposit-requirements" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2">
                <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700">Deposits Explained</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Deposit Requirements <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">for Nurses</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                Most home loans require a deposit of at least 20% of the property price. However, nurses often have access to loans with smaller deposits, sometimes as low as 5%. This means you can enter the property market sooner without waiting years to save a large deposit.
              </p>
              
              {/* Premium Styled Callout/Alert */}
              <div className="bg-emerald-50/40 border border-emerald-100/60 rounded-[24px] p-5 flex items-start gap-4 mt-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                  <AlertCircle className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-extrabold text-[#0B1F3A]">Flexible Policy Application</h4>
                  <p className="text-slate-600 text-[12.5px] leading-relaxed mt-0.5">
                    Nurses may be eligible for LMI waivers through specialized medical lending packages, or through government-backed schemes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card Panel */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-100/20 opacity-30 rounded-bl-full pointer-events-none" />
              <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Typical Nurse Deposit Scenarios
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "20% Deposit (Standard)",
                    desc: "Requires standard deposit. LMI waived automatically for all applicants."
                  },
                  {
                    title: "10% Deposit (Healthcare Specialist)",
                    desc: "No LMI charged under specific Medical professional guidelines."
                  },
                  {
                    title: "5% Deposit (Government Scheme)",
                    desc: "LMI waived under the First Home Guarantee scheme for eligible healthcare workers."
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-start bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:border-emerald-500/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-emerald-100/50">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-[#0B1F3A] font-extrabold text-[14.5px]">{item.title}</h4>
                      <p className="text-slate-500 text-[12.5px] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: GOVERNMENT GRANTS & SCHEMES ── */}
      <section id="grants" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-emerald-100 rounded-full px-4 py-2 mb-4">
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700">Government Support</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Using Government Grants <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">&amp; Schemes</span>
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              In addition to lender benefits, you may be eligible for government grants and schemes designed to support first-home buyers and essential workers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "First Home Owner Grant (FHOG)",
                desc: "A cash grant to help with the purchase of your first home, which varies by state."
              },
              {
                title: "Stamp Duty Concessions or Exemptions",
                desc: "Some states offer reduced or waived stamp duty fees for eligible first-time buyers."
              },
              {
                title: "Home Guarantee Schemes",
                desc: "These allow you to buy with a deposit as low as 5% without paying LMI by providing a government guarantee on your loan."
              }
            ].map((grant, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-[#0B1F3A] text-[16px] font-black mb-3">{grant.title}</h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed">{grant.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                  <span>Learn eligibility</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: NURSES SPECIALIST CALCULATOR ── */}
      <section id="calculator-section" className="py-16 md:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[33%_67%] gap-8 lg:gap-12 items-center">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6">
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 text-[10px] font-bold tracking-widest uppercase">Specialist Modeler</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Nurses LMI &amp; Rate <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Savings Estimator</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-6">
                Calculate how much you can borrow as a nurse or midwife, including interest rate discounts and Lenders Mortgage Insurance waivers.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 max-w-md shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Nurse LMI Waiver</h4>
                    <p className="text-slate-555 text-[12.5px] leading-relaxed">Save up to $25,000 in Lenders Mortgage Insurance with a deposit as low as 10%.</p>
                  </div>
                </div>

                <hr className="border-slate-200" />

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Specialist Rate Cuts</h4>
                    <p className="text-slate-555 text-[12.5px] leading-relaxed">Many lenders offer exclusive discount margins for healthcare professionals.</p>
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
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold uppercase">Inputs</span>
                  </div>

                  {/* Gross Salary */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Gross Annual Salary</span>
                      <span className="text-slate-900 font-black text-[13px]">${grossSalary.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={40000}
                      max={200000}
                      step={5000}
                      value={grossSalary}
                      onChange={(e) => setGrossSalary(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$40,000</span>
                      <span>$200,000</span>
                    </div>
                  </div>

                  {/* Overtime & Allowances */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Overtime &amp; Penalities (Annual)</span>
                      <span className="text-slate-900 font-black text-[13px]">${allowances.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={60000}
                      step={2500}
                      value={allowances}
                      onChange={(e) => setAllowances(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$0</span>
                      <span>$60,000</span>
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
                      max={200000}
                      step={5000}
                      value={depositSaved}
                      onChange={(e) => setDepositSaved(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$10,000</span>
                      <span>$200,000</span>
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
                      min={200000}
                      max={1200000}
                      step={10000}
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$200,000</span>
                      <span>$1.2M</span>
                    </div>
                  </div>
                </div>

                {/* Outputs (46%) */}
                <div className="bg-gradient-to-b from-[#0B1F3A] to-[#040C1A] text-white p-4 sm:p-6 flex flex-col justify-between relative">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Lending Results</span>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">LVR: {lvrValue}%</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">LMI SAVED AMOUNT</span>
                      {isLmiWaived ? (
                        <div className="space-y-1">
                          <span className="text-[24px] sm:text-[30px] font-black text-emerald-400 leading-none">
                            ${savedLmiAmount.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-emerald-300 font-extrabold uppercase block tracking-wider">
                            ✓ 100% LMI Waiver Approved
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-[20px] font-bold text-rose-400 leading-none">
                            LMI Applicable
                          </span>
                          <span className="text-[10px] text-white/60 block leading-tight">
                            LVR exceeds 90% waiver threshold. LMI fee: ${estimatedStandardLmi.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">Est. Monthly Repayments</span>
                      <span className="text-[22px] font-black text-white leading-none">${Math.round(monthlyRepaymentNurse).toLocaleString()}/mo</span>
                      <span className="text-[9px] text-white/60 block mt-1">
                        at discounted {nurseDiscountedRate.toFixed(2)}% rate (standard is ${Math.round(monthlyRepaymentStandard).toLocaleString()})
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
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 focus:bg-white/10"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Phone"
                            value={calcLeadPhone}
                            onChange={(e) => setCalcLeadPhone(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 focus:bg-white/10"
                          />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={calcLeadEmail}
                          onChange={(e) => setCalcLeadEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 focus:bg-white/10"
                        />
                        <button
                          type="submit"
                          disabled={calcSubmitting}
                          className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-650 text-white font-bold text-[12px] py-2.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
                        >
                          {calcSubmitting ? "Submitting..." : "Get Detailed Lenders Report"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 text-center space-y-1">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                        <h4 className="text-[13px] font-extrabold text-emerald-400">Calculation Saved!</h4>
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

      {/* ── SECTION 7: CHECKLIST DOCUMENT AUDIT ── */}
      <section id="checklist-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700">Document Audit</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Home Loan Documentation <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">for Nurses</span>
              </h2>
              <p className="text-slate-505 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-8">
                To access exclusive rate cuts and LMI waivers, lenders will require proof of your qualifications and registration. Track your readiness using our checklist below.
              </p>

              {/* Progress Card */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 max-w-sm shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 28}`} strokeDashoffset={`${2 * Math.PI * 28 * (1 - checklistProgress / 100)}`} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-emerald-700">{checklistProgress}%</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-extrabold text-[#0B1F3A]">Documents Ready</div>
                    <div className="text-[12.5px] text-slate-555 mt-1">{checklist.filter(i => i.checked).length} of {checklist.length} audit steps checked</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Checklist Box */}
            <div className="space-y-3">
              {checklist.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5 ${
                    item.checked
                      ? "bg-emerald-50/30 border-emerald-250/30 shadow-[0_4px_20px_rgba(16,185,129,0.03)]"
                      : "bg-white border-slate-200 hover:border-emerald-500/30 shadow-sm"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                    item.checked ? "bg-emerald-600 border-emerald-600 text-white shadow-sm" : "border-slate-300 bg-white"
                  }`}>
                    {item.checked && <Check className="w-4 h-4" strokeWidth={3} />}
                  </div>
                  <span className={`text-[13.5px] font-semibold flex-1 text-left ${
                    item.checked ? "text-emerald-800 line-through decoration-emerald-200" : "text-slate-700"
                  }`}>{item.label}</span>
                  <div className={`text-[11px] font-black px-2 py-1 rounded-full shrink-0 ${
                    item.checked ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                  }`}>{String(i+1).padStart(2,'0')}</div>
                </button>
              ))}
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
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700">FAQ Helpdesk</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">We Have Answers</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-sm">
                Everything you need to know about the home loan process for nurses and medical staff.
              </p>

              {/* Premium Specialist Contact Card */}
              <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-500" />
                <h4 className="text-[16px] font-extrabold text-[#0B1F3A]">Have a unique shift structure?</h4>
                <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed">
                  Different lenders assess shift allowances, overtime, and casual contracts differently. Our specialists can review your payslips to maximize assessed income.
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-[11.5px] text-slate-500 font-medium">
                    Talk to our <span className="font-bold text-[#0B1F3A]">essential worker specialists</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-650 text-white text-[13px] font-bold px-6 py-3 shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-[#0B1F3A] text-[13.5px] sm:text-[14.5px] hover:text-[#10B981] transition-colors"
                  >
                    <span className="pr-4 leading-tight">{faq.q}</span>
                    <div className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/60 transition-transform ${openFaqIndex === idx ? "rotate-180 text-[#10B981]" : ""}`}>
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

      {/* ── SECTION 9: CLIENT TESTIMONIALS (DYNAMIC) ── */}
      <TestimonialSection badgeText="Google Reviews" />

      {/* ── SECTION 10: ENQUIRY CALLBACK FORM ── */}
      <section id="contact" className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            
            {/* Context */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-emerald-100 rounded-full px-4 py-2">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700">Get in Touch</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Enquire About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Nurses Home Loans</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                Fill in your details below and a specialized essential worker home loan specialist will reach out to discuss your options.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "No cost or obligation consultations",
                  "Access to LMI waivers and rate cuts",
                  "Friendly guidance through government schemes"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className="text-[13px] text-slate-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Box */}
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-10 shadow-xl shadow-slate-100 relative">
              {!enquirySubmitted ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+61 400 000 000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your query or question here..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    By clicking &apos;Submit Enquiry&apos;, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert&apos;s accredited brokers.
                  </p>

                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-650 text-white font-extrabold text-[13.5px] py-3.5 transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
                  >
                    {submittingEnquiry ? "Submitting..." : "Submit Enquiry"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-[#0B1F3A] text-[20px] font-black">Enquiry Submitted!</h3>
                  <p className="text-slate-555 text-[13.5px] leading-relaxed max-w-sm mx-auto">
                    Thank you. We have received your query and a healthcare specialist broker will contact you shortly.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 11: RELATED TOPICS ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <h3 className="text-[#0B1F3A] text-xs font-black uppercase tracking-widest mb-8">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "First Home Guarantee (FHBG) for Nurses",
                desc: "Buy a home with just 5% deposit and pay $0 LMI via government guarantee schemes."
              },
              {
                title: "Guarantor Loans: Can Family Help Nurses Get into the Market?",
                desc: "Learn how family equity support can bypass deposits and upfront costs entirely."
              },
              {
                title: "LMI Waiver for Health Professionals Explained",
                desc: "Everything you need to know about lender policies and AHPRA registration rules."
              },
              {
                title: "Fixed vs Variable Loans for Nurses",
                desc: "Find out if fixing your mortgage interest rate or leaving it floating is right for your budget."
              },
              {
                title: "Budgeting Tips for Nurses Buying Their First Home",
                desc: "Effective strategies to manage shift pay, save deposits faster, and buy your home."
              },
              {
                title: "Understanding Loan Pre-Approval",
                desc: "Get pre-approved confidently before bidding or negotiating on properties."
              }
            ].map((topic, idx) => (
              <div key={idx} className="bg-slate-50 hover:bg-slate-100/50 p-6 rounded-2xl border border-slate-200 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest block mb-2">Home Loan For Nurses</span>
                  <h4 className="text-[#0B1F3A] font-bold text-[14px] leading-snug mb-2">{topic.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{topic.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-150 flex items-center justify-between text-[11px] font-bold text-emerald-600">
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
