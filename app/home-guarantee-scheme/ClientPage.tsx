"use client";
import { useOnboardingModal } from "@/app/components/OnboardingModalContext";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Plus,
  Minus,
  Home as HomeIcon,
  Coins,
  Landmark,
  ShieldAlert,
  Sparkles,
  MapPin,
  Search,
  CheckCircle,
  Building
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { TestimonialSection } from "../components/TestimonialSection";
import { BlogSection } from "../components/BlogSection";
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

export function ClientPage({ settings = {}, pageHeroSettings, pageContent }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string }) {
  const { openModal } = useOnboardingModal();
  const [navSticky, setNavSticky] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const navSentinelRef = useRef<HTMLDivElement>(null);

  // Eligibility Checklist State
  const [eligibilityChecklist, setEligibilityChecklist] = useState([
    { id: "age", label: "Be 18 years or older", checked: false },
    { id: "citizenship", label: "Be an Australian citizen or permanent resident", checked: false },
    { id: "medicare", label: "Hold a valid Medicare card", checked: false },
    { id: "firsthome", label: "First-home buyer (or haven't owned in the last 10 years)", checked: false },
    { id: "deposit", label: "Have a minimum 5% deposit (genuine savings)", checked: false },
    { id: "occupancy", label: "Intend to live in the home as primary residence", checked: false },
    { id: "loantype", label: "Loan with principal-and-interest repayments", checked: false }
  ]);

  const toggleChecklist = (id: string) => {
    setEligibilityChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const eligibilityProgress = Math.round(
    (eligibilityChecklist.filter(item => item.checked).length / eligibilityChecklist.length) * 100
  );

  // Property Price Caps Filter State
  const [selectedStateFilter, setSelectedStateFilter] = useState("ALL");
  const [priceCapsSearch, setPriceCapsSearch] = useState("");

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
  const [purchasePrice, setPurchasePrice] = useState(700000);
  const [depositPct, setDepositPct] = useState(5);
  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [calcSubmitting, setCalcSubmitting] = useState(false);

  // Calculator Math
  const depositAmount = Math.round(purchasePrice * (depositPct / 100));
  const loanAmount = purchasePrice - depositAmount;
  const lvr = 100 - depositPct;

  // LMI Estimation formula (without scheme)
  const calculateLmiEstimate = (price: number, depositPercent: number) => {
    const loan = price * (1 - depositPercent / 100);
    const targetLvr = 100 - depositPercent;
    if (targetLvr <= 80) return 0;
    if (targetLvr <= 85) return Math.round(loan * 0.012);
    if (targetLvr <= 90) return Math.round(loan * 0.024);
    return Math.round(loan * 0.042);
  };
  const estimatedLmiSaved = calculateLmiEstimate(purchasePrice, depositPct);
  const guaranteedPortion = Math.max(0, Math.round(purchasePrice * (0.20 - depositPct / 100)));

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
      "eligibility",
      "changes",
      "calculator-section",
      "price-caps",
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
        type: "home-guarantee-scheme-callback",
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
          type: "home-guarantee-scheme-calculator",
          name: calcLeadName,
          email: calcLeadEmail,
          phone: calcLeadPhone,
          savings: String(depositAmount),
          income: String(purchasePrice),
          message: `LMI Savings Calculation. Price: $${purchasePrice}, Deposit: $${depositAmount} (${depositPct}%), Estimated LMI Saved: $${estimatedLmiSaved}`
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
    { id: "benefits", label: "Scheme Benefits", icon: Sparkles },
    { id: "eligibility", label: "Eligibility Checklist", icon: CheckCircle2 },
    { id: "changes", label: "Oct 2025 Updates", icon: Calendar },
    { id: "calculator-section", label: "LMI Savings Calc", icon: Calculator },
    { id: "price-caps", label: "Property Price Caps", icon: Landmark },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "contact", label: "Enquire Now", icon: ArrowRight }
  ];

  // Price Caps Raw Data
  const priceCapsData = [
    { state: "NSW", region: "Sydney & major regional", current: 900000, updated: 1500000 },
    { state: "NSW", region: "Rest of NSW", current: 750000, updated: 800000 },
    { state: "VIC", region: "Melbourne & Geelong", current: 800000, updated: 950000 },
    { state: "VIC", region: "Rest of VIC", current: 650000, updated: 650000 },
    { state: "QLD", region: "Brisbane, Gold Coast, Sunshine Coast", current: 700000, updated: 1000000 },
    { state: "QLD", region: "Rest of QLD", current: 550000, updated: 700000 },
    { state: "WA", region: "Perth", current: 600000, updated: 850000 },
    { state: "WA", region: "Rest of WA", current: 450000, updated: 600000 },
    { state: "SA", region: "Adelaide", current: 600000, updated: 900000 },
    { state: "SA", region: "Rest of SA", current: 450000, updated: 500000 },
    { state: "TAS", region: "Hobart", current: 600000, updated: 700000 },
    { state: "TAS", region: "Rest of TAS", current: 450000, updated: 550000 },
    { state: "ACT", region: "Australian Capital Territory", current: 750000, updated: 1000000 },
    { state: "NT", region: "Northern Territory", current: 600000, updated: 600000 },
    { state: "OTHER", region: "Jervis Bay, Norfolk Island", current: 550000, updated: 550000 },
    { state: "OTHER", region: "Christmas Island & Cocos Islands", current: 400000, updated: 400000 }
  ];

  const filteredPriceCaps = priceCapsData.filter(item => {
    const matchesState = selectedStateFilter === "ALL" || item.state === selectedStateFilter;
    const matchesSearch = item.region.toLowerCase().includes(priceCapsSearch.toLowerCase()) || item.state.toLowerCase().includes(priceCapsSearch.toLowerCase());
    return matchesState && matchesSearch;
  });

  const faqs = [
    {
      q: "How much deposit do I need to buy my first home?",
      a: "Typically, you need at least a 20% deposit to buy a home without paying Lenders Mortgage Insurance (LMI). However, under the First Home Guarantee Scheme, you can buy a home with a deposit as low as 5%, and the government will guarantee the remaining 15% to help you avoid LMI entirely."
    },
    {
      q: "What is Lenders Mortgage Insurance (LMI)?",
      a: "LMI is an insurance policy that protects the lender (not you) if you default on your home loan. Lenders usually charge this fee if you borrow more than 80% of the property's value. It can add tens of thousands of dollars to your home buying costs, which is why avoiding it through the Home Guarantee Scheme is a massive advantage."
    },
    {
      q: "What government assistance is available for first-home buyers?",
      a: "In addition to the First Home Guarantee (FHBG) under the Home Guarantee Scheme, first-home buyers may also access the First Home Owner Grant (FHOG) for newly built properties, as well as stamp duty exemptions or concessions depending on the state or territory you are purchasing in. We can help you check your eligibility for all available schemes."
    },
    {
      q: "Do I need pre-approval before buying?",
      a: "Yes, it is highly recommended to secure a pre-approval (especially conditional on scheme allocation). Places on the Home Guarantee Scheme must be formally reserved through a participating lender. Having pre-approval ensures you understand your exact budget and can secure a scheme place as soon as you find your property."
    },
    {
      q: "Can I buy with a partner or family member?",
      a: "Yes! Originally, the scheme was only available to single applicants or married/de facto couples. However, from 1 October 2025, rules are simplified to allow joint applications from siblings, friends, or other relatives together, making it much easier to enter the market."
    }
  ];

  // Dynamic texts from hero settings
  const badgeText = pageHeroSettings?.hero_badge || "Government Scheme Experts";
  const titleText = pageHeroSettings?.hero_title || "Access the First Home Guarantee Scheme";
  const subtextText = pageHeroSettings?.hero_subtext || "Secure your first home with only a 5% deposit and skip the Lenders Mortgage Insurance. We guide you through the application and eligibility checks.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/hero_slide_2_green.png";
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Check Eligibility";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#eligibility";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Calculate Savings";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "#calculator-section";

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none">
      
      {/* ── HEADER ── */}
      <SiteHeader isSticky={false} settings={settings} />

      {/* ── HERO SECTION ── */}
      <section id="overview" className="relative overflow-hidden bg-white pt-2.5 pb-8 lg:pt-[10px] lg:pb-8 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
        {/* Subtle dot-matrix and glow decorations */}
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#16A34A 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-green-50 opacity-40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 bg-white border border-slate-200/60 rounded-full px-4 py-2 w-fit mb-6 text-[11.5px] font-bold text-slate-500 shadow-sm">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
            <span className="text-slate-300 font-normal">&gt;</span>
            <span className="text-slate-400">Government assistance</span>
            <span className="text-slate-300 font-normal">&gt;</span>
            <span className="text-green-700 font-bold">Home Guarantee Scheme</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN: Texts & Badges */}
            <motion.div initial="hidden" animate="visible" variants={premiumStagger} className="flex flex-col justify-center z-10">

              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-green-50 border-green-200/50 text-green-800 w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 shrink-0" />
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className="w-14 h-[3px] bg-green-600 mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-5 max-w-xl">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #D1FAE5 0%, #A7F3D0 40%, #F0FDF4 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                {(!btn1Link || btn1Link === "#" || btn1Link === "#contact" || btn1Link === "#callback") ? (
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-green-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap cursor-pointer border-0"
                  >
                    {btn1Text} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={btn1Link}
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-green-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap"
                  >
                    {btn1Text} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {(btn2Link === "#contact" || btn2Link === "#callback") ? (
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-green-600 hover:text-white text-center w-full sm:w-auto whitespace-nowrap cursor-pointer border-0 bg-transparent"
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
                    className="inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-green-600 hover:text-white text-center w-full sm:w-auto whitespace-nowrap"
                  >
                    {btn2Text}
                  </a>
                )}
              </motion.div>

              {/* Trust Reviews Badge Row */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-6 mt-3.5 pt-3 border-t border-slate-100/80 max-w-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                    <GoogleIcon />
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />)}
                    </div>
                    <div className="text-[11.5px] text-slate-500 font-bold mt-0.5">4.9/5 from 1,200+ reviews</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-200/80 hidden sm:block" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                    <svg className="w-5.5 h-5.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />)}
                    </div>
                    <div className="text-[11.5px] text-slate-500 font-bold mt-0.5">5.0/5 from 950+ reviews</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: Premium Image with Floating Badge */}
            <div className="relative hidden lg:flex items-center justify-center lg:justify-end translate-y-4 lg:translate-y-8">
              {/* Circular light-green wash background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="absolute w-[82%] aspect-square bg-gradient-to-br from-[#D1FAE5] to-[#F0FDF4] rounded-full blur-none -z-10 shadow-inner"
              />
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="relative w-full max-w-[540px]"
              >
                <Image
                  src={imageSrc}
                  alt="Home Guarantee Scheme Expert"
                  width={560}
                  height={440}
                  priority
                  className="w-full h-auto block object-contain mix-blend-multiply scale-[1.04] relative z-10"
                />
                {/* Floating glassmorphic checklist badge */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  className="absolute left-2 lg:left-[-24px] top-[15%] z-20"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white/95 border border-slate-200/80 rounded-3xl p-5 shadow-[0_20px_40px_rgba(11,31,58,0.1)] flex flex-col gap-3.5 w-[190px]"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-700 shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex flex-col gap-3">
                      {["5% Deposit Only", "Zero LMI Fees", "Government Backed"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                          <span className="text-[12px] font-bold text-[#0B1F3A] leading-none">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STICKY SUB-NAVIGATION Sentinel ── */}
      <div ref={navSentinelRef} className="h-0 w-full" />

      {/* ── STATIC IN-PAGE NAVIGATION ── */}
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
                        ? "bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-[0_4px_12px_rgba(34,197,94,0.22)] font-bold"
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

      {/* ── VIEWPORT FIXED STICKY NAVIGATION ── */}
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
                            ? "bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-[0_4px_12px_rgba(34,197,94,0.22)] font-bold"
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
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700 text-[10px] font-bold tracking-widest uppercase">Let&apos;s Make Buying a Home Easier!</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Own Your First Home Sooner with Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">5% Deposit</span> — No LMI Required
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                Buying a home can be tricky and sometimes you need a lot of money saved up to start. The Home Guarantee Scheme is like a helpful friend that lets you buy a home sooner by making the deposit smaller.
              </p>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                {pageContent || "If saving for a 20% deposit has felt like a never-ending struggle, you’re not alone. That’s why the First Home Guarantee (FHBG), backed by the Australian Government and administered by Housing Australia, could be your breakthrough into the property market. Under the guarantee, the government steps in to guarantee the difference between your 5% deposit and the standard 20% deposit."}
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Save $10,000+ on LMI Costs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Government-Backed Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Buy Sooner with 5% Deposit</span>
                </div>
              </div>
            </div>

            {/* Right Graphics */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-emerald-100 rounded-[32px] blur-2xl opacity-30 transform -rotate-3 scale-95" />
              <div className="relative bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(16,185,129,0.06)] space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-[13px] font-extrabold text-[#0B1F3A]">Housing Australia</div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Government Scheme</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full uppercase">Accredited Broker</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#F0FDF4] border border-green-100 rounded-2xl p-4.5">
                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Standard LMI Saved</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[24px] font-black text-[#0B1F3A]">$10k - $30k+</span>
                      <span className="text-[11px] text-slate-400 font-bold">depending on loan size</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5">
                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Deposit Needed</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[24px] font-black text-slate-800">Only 5%</span>
                      <span className="text-[11px] text-slate-400 font-bold">instead of standard 20%</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: SCHEME BENEFITS ── */}
      <section id="benefits" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">Scheme Benefits</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              What&apos;s the Big Benefit of the FHBG?
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Skip years of renting and saving. Leverage the government guarantee to purchase your home safely and cost-effectively today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Buy with 5% Deposit",
                desc: "Buy your first home sooner without waiting to save a full 20% deposit. Only 5% of genuine savings required.",
                icon: Wallet,
                color: "bg-green-50 text-green-700 border-green-100"
              },
              {
                title: "Zero LMI Fees",
                desc: "Save anywhere from $10,000 to $30,000+ by avoiding Lenders Mortgage Insurance entirely under the scheme.",
                icon: Percent,
                color: "bg-blue-50 text-blue-700 border-blue-100"
              },
              {
                title: "Save on Upfront Costs",
                desc: "Keep more cash in your bank to cover legal fees, stamp duty, moving expenses, or home furnishing.",
                icon: Coins,
                color: "bg-amber-50 text-amber-700 border-amber-100"
              },
              {
                title: "Premium Interest Rates",
                desc: "Access competitive home loan rates as if you had already saved a full 20% deposit yourself.",
                icon: TrendingUp,
                color: "bg-purple-50 text-purple-700 border-purple-100"
              }
            ].map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/60 rounded-[28px] p-6.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center border mb-6`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-[#0B1F3A] text-[17px] font-extrabold mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-[13.5px] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-green-50/50 border border-green-100/70 rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="text-[15px] font-extrabold text-[#0B1F3A]">Did you know?</h4>
                <p className="text-slate-600 text-[13px] mt-0.5 leading-relaxed">
                  Lenders Mortgage Insurance (LMI) can cost anywhere from $10,000 to $30,000+, depending on your loan size. With the First Home Guarantee, that money stays back in your pocket.
                </p>
              </div>
            </div>
            <button type="button" onClick={openModal} className="cursor-pointer border-0 rounded-xl bg-[#0B1F3A] text-white hover:bg-slate-800 text-[13px] font-extrabold px-6 py-3 transition-colors shrink-0">
              Get Free Assessment
            </button>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: ELIGIBILITY CHECKLIST ── */}
      <section id="eligibility" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            
            {/* Left Column: Heading & Progress */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700 text-[10px] font-bold tracking-widest uppercase">Self-Assessment</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Who Can Apply? <span className="text-[#16A34A]">Check Your Eligibility</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                If you&apos;re a first-home buyer (or haven&apos;t owned a residential property in the last 10 years in Australia), this scheme could help you get into the market sooner. Use our interactive checklist to see if you meet the core criteria.
              </p>

              {/* Progress Bar Container */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>Eligibility Check-in</span>
                  <span className={`font-black ${eligibilityProgress === 100 ? "text-green-600 animate-pulse" : "text-slate-700"}`}>
                    {eligibilityProgress}% Complete
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${eligibilityProgress}%` }}
                  />
                </div>
                <p className="text-[11.5px] text-slate-400 font-semibold leading-relaxed">
                  {eligibilityProgress === 100 
                    ? "🎉 Congratulations! You meet the self-assessed eligibility criteria! Contact our brokers to verify and submit your scheme application."
                    : "Tick the boxes on the right that apply to you to check your potential eligibility for the First Home Guarantee."
                  }
                </p>
              </div>
            </div>

            {/* Right Column: Checkboxes */}
            <div className="space-y-3.5">
              {eligibilityChecklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-full text-left flex items-start gap-4 p-4.5 rounded-2xl border transition-all duration-300 ${
                    item.checked 
                      ? "bg-[#F0FDF4] border-green-200 shadow-sm" 
                      : "bg-white border-slate-200/70 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-5.5 h-5.5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    item.checked 
                      ? "bg-green-600 border-green-600 text-white" 
                      : "border-slate-300 hover:border-slate-400"
                  }`}>
                    {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-[13.5px] font-semibold transition-colors ${
                    item.checked ? "text-[#0B1F3A]" : "text-slate-500"
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: OCTOBER 2025 UPDATES ── */}
      <section id="changes" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2 mb-4">
              <Calendar className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">Scheme Evolution</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              What&apos;s Changing from <span className="text-green-700">1 October 2025</span>?
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Big improvements are coming that make the First Home Guarantee scheme even more accessible for first-home buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Unlimited Places & No Waiting Lists",
                desc: "Lenders will no longer face tight annual slot caps. This eliminates the stress of missing out on allocations during high-demand spring buying seasons.",
                tag: "Availability"
              },
              {
                title: "No Personal Income Caps",
                desc: "Previously capped at $125k for singles and $200k for couples. These caps are abolished from Oct 2025, enabling buyers with stronger salaries to purchase.",
                tag: "Income Limits"
              },
              {
                title: "Joint Application Expansion",
                desc: "You don't have to be a couple. Siblings, cousins, friends, or parents can now formally combine deposits and incomes under the guarantee.",
                tag: "Applicants"
              },
              {
                title: "Higher Property Price Caps",
                desc: "Caps are being lifted across capital cities and regional locations (e.g., Sydney cap is increasing to $1.5 Million) to align with actual market property values.",
                tag: "Price Limits"
              },
              {
                title: "Simplified Regional Access",
                desc: "Rules surrounding how long a buyer must have resided in a regional area prior to purchase are simplified, making it easier for regional tree-changers to qualify.",
                tag: "Location"
              },
              {
                title: "Genuine Savings Exclusions",
                desc: "While you still need a 5% deposit, the scheme accommodates flexible definitions, such as rental history verification, under specific conditions.",
                tag: "Genuine Savings"
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/60 rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-3 bg-green-50 px-2.5 py-1 rounded-full w-fit">
                    {card.tag}
                  </div>
                  <h3 className="text-[#0B1F3A] text-[15.5px] font-extrabold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 6: LMI SAVINGS & FHBG CALCULATOR ── */}
      <section id="calculator-section" className="py-16 md:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-50 rounded-full blur-[120px] opacity-30 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2 mb-4">
              <Calculator className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">Financial Modeling</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              LMI Savings &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">First Home Guarantee Calculator</span>
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Calculate your required deposit and see how much Lenders Mortgage Insurance (LMI) you avoid paying under the scheme.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-[24px] shadow-xl shadow-slate-100 overflow-hidden max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[54%_46%]">
            
            {/* Input fields */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-1">
                <span className="text-slate-900 text-xs font-black uppercase tracking-wider">1. Enter Loan Assumptions</span>
                <span className="text-[9px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-bold uppercase">Inputs</span>
              </div>

              {/* Purchase Price */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Property Purchase Price</span>
                  <span className="text-slate-900 font-black text-[13px]">${purchasePrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={2000000}
                  step={10000}
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full accent-green-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                  <span>$200,000</span>
                  <span>$2.0M</span>
                </div>
              </div>

              {/* Deposit % */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Your Deposit %</span>
                  <span className="text-slate-900 font-black text-[13px]">{depositPct}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={19}
                  step={1}
                  value={depositPct}
                  onChange={(e) => setDepositPct(Number(e.target.value))}
                  className="w-full accent-green-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                  <span>5% (Scheme Min)</span>
                  <span>19% (Under 20% limit)</span>
                </div>
              </div>

              {/* Summary outputs details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Your Deposit</span>
                  <span className="text-[14px] font-extrabold text-[#0B1F3A]">${depositAmount.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Loan Amount</span>
                  <span className="text-[14px] font-extrabold text-[#0B1F3A]">${loanAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Visual Breakdown comparison */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Guarantee Visual Breakdown</div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-[#0B1F3A]">
                    <span>Your Contribution ({depositPct}%)</span>
                    <span>${depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-green-500 h-full" style={{ width: `${depositPct * 5}%` }} />
                    <div className="bg-yellow-400 h-full animate-pulse" style={{ width: `${(20 - depositPct) * 5}%` }} />
                    <div className="bg-slate-300 h-full" style={{ width: `${80 * 5}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-semibold text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Deposit ({depositPct}%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span>Govt Guaranteed ({20 - depositPct}%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span>Standard Loan (80%)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Results display & Call to action */}
            <div className="bg-slate-900 p-4 sm:p-6 flex flex-col justify-between text-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(#22C55E_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-white/70 text-xs font-bold uppercase tracking-wider">2. Calculation Results</span>
                  <span className="text-[9px] text-green-400 bg-green-950/80 px-2 py-0.5 rounded-full font-bold uppercase border border-green-500/20">Saved</span>
                </div>

                <div className="space-y-3.5">
                  
                  {/* Big Savings Block */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-0.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 rounded-full blur-[30px] opacity-20 pointer-events-none" />
                    <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">estimated lmi saved under scheme</span>
                    <div className="text-[28px] font-black leading-none tracking-tight text-white mt-0.5">
                      ${estimatedLmiSaved.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-white/50 font-semibold pt-0.5">
                      Without the scheme, you would pay this amount in Lenders Mortgage Insurance fees.
                    </div>
                  </div>

                  {/* Guaranteed Portion details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block mb-0.5">Government Guarantee</span>
                      <span className="text-[12.5px] font-extrabold text-white">${guaranteedPortion.toLocaleString()}</span>
                      <span className="text-[9px] font-bold text-white/50 block">({20 - depositPct}%)</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block mb-0.5">Estimated Loan-to-Value</span>
                      <span className="text-[12.5px] font-extrabold text-white">{lvr}% LVR</span>
                      <span className="text-[9px] font-bold text-green-400 block mt-0.5">No LMI Premium</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Lead Capture form inside calculator */}
              <div className="relative z-10 mt-4 pt-4 border-t border-white/10">
                {!calcSubmitted ? (
                  <form onSubmit={handleCalcLeadSubmit} className="space-y-2.5">
                    <p className="text-[10px] text-white/60 font-semibold leading-snug">
                      Save calculation &amp; get scheme eligibility details:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        value={calcLeadName}
                        onChange={(e) => setCalcLeadName(e.target.value)}
                        className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-green-500 focus:bg-white/10"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={calcLeadEmail}
                        onChange={(e) => setCalcLeadEmail(e.target.value)}
                        className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-green-500 focus:bg-white/10"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        required
                        value={calcLeadPhone}
                        onChange={(e) => setCalcLeadPhone(e.target.value)}
                        className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-green-500 focus:bg-white/10"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={calcSubmitting}
                      className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-[12px] py-2.5 transition-all cursor-pointer shadow-lg shadow-green-500/10"
                    >
                      {calcSubmitting ? "Submitting..." : "Email My Calculation Report"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <div className="bg-green-950/40 border border-green-500/30 rounded-xl p-4 text-center space-y-1">
                    <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                    <h4 className="text-[13px] font-extrabold text-green-400">Calculation Saved!</h4>
                    <p className="text-[10px] text-white/70 leading-relaxed">
                      We have received your request. One of our credit experts will review the calculation and contact you to complete the application.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 7: STAMP DUTY / TABLES ── */}
      <section id="price-caps" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Column: Context details */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2">
                <Landmark className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700 text-[10px] font-bold tracking-widest uppercase">Caps and Savings</span>
              </div>
              
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Updated Property Price Caps &amp; <span className="text-[#16A34A]">Estimated LMI Savings</span>
              </h2>
              
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                Property price caps apply under the First Home Guarantee depending on which state or territory, and whether in a metro/regional centre or rural area. Only properties under these caps qualify.
              </p>

              {/* State Filter Selector */}
              <div className="space-y-3.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Filter Price Caps by State</div>
                <div className="flex flex-wrap gap-2">
                  {["ALL", "NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((state) => (
                    <button
                      key={state}
                      onClick={() => setSelectedStateFilter(state)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        selectedStateFilter === state
                          ? "bg-green-600 border-green-600 text-white shadow-sm"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
                
                {/* Simple Search bar */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search regional caps (e.g. Melbourne, Perth...)"
                    value={priceCapsSearch}
                    onChange={(e) => setPriceCapsSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:border-green-500 shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Tables */}
            <div className="space-y-8">
              
              {/* Table 1: LMI Savings */}
              <div className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5.5 text-white">
                  <h3 className="text-[15.5px] font-extrabold">LMI Savings Under FHBG (Estimated)</h3>
                  <p className="text-white/60 text-[11px] mt-0.5 font-semibold">How much you could save on the standard 95% LVR loan</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="py-4 px-6">Property Value</th>
                        <th className="py-4 px-6">Loan Amount (95% LVR)</th>
                        <th className="py-4 px-6 text-green-700">LMI Saved (Estimated)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                      <tr>
                        <td className="py-4 px-6 font-extrabold text-[#0B1F3A]">$1,500,000</td>
                        <td className="py-4 px-6">$1,425,000</td>
                        <td className="py-4 px-6 text-green-700 font-extrabold">$63,523</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-extrabold text-[#0B1F3A]">$1,000,000</td>
                        <td className="py-4 px-6">$950,000</td>
                        <td className="py-4 px-6 text-green-700 font-extrabold">$34,290</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-extrabold text-[#0B1F3A]">$850,000</td>
                        <td className="py-4 px-6">$807,500</td>
                        <td className="py-4 px-6 text-green-700 font-extrabold">$27,821</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-extrabold text-[#0B1F3A]">$750,000</td>
                        <td className="py-4 px-6">$712,500</td>
                        <td className="py-4 px-6 text-green-700 font-extrabold">$24,166</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2: Property Price Caps */}
              <div className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-green-950 to-green-900 p-5.5 text-white">
                  <h3 className="text-[15.5px] font-extrabold">Price Caps (Effective 1 October 2025)</h3>
                  <p className="text-white/60 text-[11px] mt-0.5 font-semibold">Government-specified purchase limits per region</p>
                </div>
                <div className="overflow-x-auto max-h-[460px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider sticky top-0 z-10">
                        <th className="py-3 px-6 bg-slate-50">State</th>
                        <th className="py-3 px-6 bg-slate-50">Region</th>
                        <th className="py-3 px-6 bg-slate-50">Current Cap</th>
                        <th className="py-3 px-6 bg-slate-50 text-green-800">New Cap (Oct 2025)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                      {filteredPriceCaps.length > 0 ? (
                        filteredPriceCaps.map((cap, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                            <td className="py-3 px-6">
                              <span className="px-2 py-0.5 text-[10px] font-black rounded bg-slate-100 text-slate-600">
                                {cap.state}
                              </span>
                            </td>
                            <td className="py-3 px-6 font-semibold text-[#0B1F3A]">{cap.region}</td>
                            <td className="py-3 px-6 text-slate-400 font-semibold">${cap.current.toLocaleString()}</td>
                            <td className="py-3 px-6 text-green-700 font-black">${cap.updated.toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-400 font-semibold">
                            No property caps found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: DYNAMIC TESTIMONIALS ── */}
      <TestimonialSection />

      {/* ── SECTION 9: DYNAMIC BLOGS ── */}
      <BlogSection
        badgeText="Real Stories. Real Impact."
        titlePart1="Success Stories"
        titlePart2="& Government Scheme Guides"
        subtitleText="Find out how other Australian buyers have bypassed LMI fees and saved thousands on their deposits."
        accentColor="#22C55E"
        accentTextClass="text-green-500"
        accentBgClass="bg-green-500"
        darkTheme={true}
      />

      {/* ── SECTION 10: FAQS ACCORDION ── */}
      <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-green-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">FAQ Helpdesk</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Frequently Asked <span className="text-[#16A34A]">Questions</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                Here are quick answers to common questions about the Home Guarantee Scheme, Lenders Mortgage Insurance, and buying your first home in Australia.
              </p>
              <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 space-y-4">
                <h4 className="text-[15px] font-extrabold text-[#0B1F3A]">Need personal advice?</h4>
                <p className="text-slate-400 text-[12.5px] leading-relaxed">
                  Every borrower’s financial situation is unique. Our accredited Housing Australia scheme brokers can sit down with you to review your position and process the application.
                </p>
                <button type="button" onClick={openModal} className="cursor-pointer border-0 inline-flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] hover:bg-slate-800 text-white text-[12.5px] font-bold px-5 py-3 transition-colors cursor-pointer">
                  Consult a Specialist
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-extrabold text-[#0B1F3A] hover:bg-slate-50/50 transition-colors"
                    >
                      <span className="text-[14px] sm:text-[15px] leading-snug">{faq.q}</span>
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? "bg-green-50 border-green-200 text-green-700 rotate-180" : "border-slate-200 text-slate-400"
                      }`}>
                        <svg className="w-3 h-3 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                        >
                          <div className="p-5.5 pt-0 border-t border-slate-100 text-slate-500 text-[13.5px] leading-relaxed">
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

      {/* ── SECTION 11: ENQUIRY CALLBACK FORM ── */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-6 left-6 w-32 h-32 opacity-10" style={{ backgroundImage: "radial-gradient(#22C55E 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
        <div className="absolute bottom-6 right-6 w-32 h-32 opacity-10" style={{ backgroundImage: "radial-gradient(#22C55E 1px, transparent 1px)", backgroundSize: "8px 8px" }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2">
                <Clock className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700 text-[10px] font-bold tracking-widest uppercase">Quick Response</span>
              </div>
              
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Ready to Apply? <span className="text-[#16A34A]">Get in Touch Today</span>
              </h2>
              
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                Submit your query below. Our accredited Housing Australia scheme brokers will check your eligibility, secure your spot, and help you search for competitive loan options.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shrink-0 border border-green-100">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#0B1F3A]">Direct Scheme Submission</h4>
                    <p className="text-slate-400 text-xs font-medium">We upload your details directly to participating lenders.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shrink-0 border border-green-100">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#0B1F3A]">100% Free Service</h4>
                    <p className="text-slate-400 text-xs font-medium">No broker service fees for first home scheme applications.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card Column */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-[60px] opacity-20 pointer-events-none" />
              
              {!enquirySubmitted ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-5 relative z-10 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Last Name / Surname</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+61"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Your Message / Query</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Type your query or question here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    By clicking ‘Submit Enquiry’, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert’s brokers.
                  </p>

                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-[13.5px] py-4 transition-all cursor-pointer shadow-md"
                  >
                    {submittingEnquiry ? "Submitting..." : "Submit Enquiry"}
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              ) : (
                <div className="bg-white rounded-3xl p-8 text-center space-y-4 relative z-10">
                  <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
                  <h3 className="text-[#0B1F3A] text-[22px] font-extrabold">Enquiry Submitted!</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed max-w-md mx-auto font-medium">
                    Thank you for contacting Mortgage Xperts. One of our scheme specialists will review your eligibility profile and get in touch shortly to assist you.
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
