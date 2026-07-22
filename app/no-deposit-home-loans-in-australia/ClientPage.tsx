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
  Coins,
  Landmark,
  Sparkles,
  Search,
  CheckCircle,
  Info,
  Home as HomeIcon
} from "lucide-react";
import { RoadmapSection } from "../components/RoadmapSection";
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

// ==========================================
// CONFIGURABLE BRAND THEME COLOR CONFIG (Teal - Matches Slide 5)
// ==========================================
const theme = {
  primary: "#0D9488",            // Teal (Distinct premium color)
  textPrimary: "text-[#0D9488]",
  bgPrimary: "bg-[#0D9488]",
  bgHover: "hover:bg-[#0f766e]",
  bgLightWash: "bg-[#F0FDFA]",
  borderPrimary: "border-[#0D9488]",
  shadowColor: "shadow-teal-500/20",
  accentLabel: "LOW DEPOSIT SPECIALISTS"
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

  // Options checklist / eligibility states
  const [checklist, setChecklist] = useState([
    { id: "citizenship", label: "Be an Australian citizen or permanent resident", checked: false },
    { id: "income", label: "Have a stable, verifiable source of income (PAYG or Self-employed)", checked: false },
    { id: "credit", label: "Maintain a good credit score with no active defaults", checked: false },
    { id: "firsthome", label: "First-home buyer (required for government low deposit schemes)", checked: false },
    { id: "guarantor", label: "Have immediate family members who own property in Australia (for 0% deposit option)", checked: false },
    { id: "rent_history", label: "Have 12+ months of continuous rental history (helps with no-deposit loans)", checked: false }
  ]);

  const toggleChecklist = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const progress = Math.round(
    (checklist.filter(item => item.checked).length / checklist.length) * 100
  );

  // Enquiry / Lead form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Interactive Calculator State
  const [purchasePrice, setPurchasePrice] = useState(650000);
  const [selectedScenario, setSelectedScenario] = useState<"guarantor" | "scheme" | "standard">("guarantor");
  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [calcSubmitting, setCalcSubmitting] = useState(false);

  // Calculator Math
  const getScenarioConfig = () => {
    switch (selectedScenario) {
      case "guarantor":
        return { depositPct: 0, lmiPct: 0, badge: "Guarantor Loan", label: "Guarantor Support" };
      case "scheme":
        return { depositPct: 5, lmiPct: 0, badge: "First Home Guarantee", label: "Govt Guarantee" };
      case "standard":
      default:
        return { depositPct: 5, lmiPct: 3.2, badge: "Standard Low Deposit", label: "LMI Premium" };
    }
  };

  const { depositPct, lmiPct } = getScenarioConfig();
  const depositAmount = Math.round(purchasePrice * (depositPct / 100));
  
  // Calculate LMI (if standard, estimate at ~3.2% of loan amount, else 0)
  const estimatedLmi = selectedScenario === "standard" ? Math.round((purchasePrice - depositAmount) * 0.032) : 0;
  const standardLmiEstimateForGuarantorOrScheme = Math.round((purchasePrice - (purchasePrice * 0.05)) * 0.032);
  
  const loanAmount = purchasePrice - depositAmount;

  // FAQ Index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sticky Navigation scroll listener
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

  // Active section spy
  useEffect(() => {
    const sectionIds = [
      "overview",
      "options",
      "roadmap",
      "calculator-section",
      "eligibility",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingEnquiry(true);
    try {
      const payload = {
        type: "no-deposit-home-loans-callback",
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
          type: "no-deposit-home-loans-calculator",
          name: calcLeadName,
          email: calcLeadEmail,
          phone: calcLeadPhone,
          savings: String(depositAmount),
          income: String(purchasePrice),
          message: `No Deposit Scenario calculation. Scenario: ${selectedScenario.toUpperCase()}, Price: $${purchasePrice}, Deposit needed: $${depositAmount} (${depositPct}%), Estimated LMI: $${estimatedLmi}`
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
    { id: "options", label: "Loan Options", icon: Sparkles },
    { id: "roadmap", label: "Roadmap", icon: Calendar },
    { id: "calculator-section", label: "Low/No Deposit Calc", icon: Calculator },
    { id: "eligibility", label: "Eligibility Criteria", icon: CheckCircle2 },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "contact", label: "Enquire Now", icon: ArrowRight }
  ];

  const faqs = [
    {
      q: "Is it really possible to buy a house with zero deposit in Australia?",
      a: "Yes! The most common way to buy a home with zero deposit is through a parent or family guarantor loan. Under this option, your family member uses the equity in their own home to secure your deposit portion, allowing you to borrow up to 100% of the purchase price plus stamp duty, and completely waiving Lenders Mortgage Insurance (LMI)."
    },
    {
      q: "What is a guarantor home loan and who can be one?",
      a: "A guarantor home loan is where an immediate family member (usually parents) guarantees a portion of your home loan (typically 15% to 20%). They do not need to give you cash; instead, the lender places a limited guarantee security against their property's equity. This removes the need for you to save a large deposit and avoids expensive LMI fees."
    },
    {
      q: "What is the First Home Guarantee (FHBG) scheme?",
      a: "The First Home Guarantee is a government scheme that allows eligible first-home buyers to buy a property with a deposit as low as 5% without paying Lenders Mortgage Insurance. The government guarantees the remaining 15% to the lender. It is a fantastic option if you have some savings but not a full 20% deposit."
    },
    {
      q: "Can I use my rental history as genuine savings?",
      a: "Yes, some specialty lenders allow you to use a clean, continuous 12-month rental history as proof of genuine savings. This is highly beneficial if you have saved a 5% deposit but need to prove to the bank that you have the discipline to pay a mortgage."
    },
    {
      q: "What are the hidden costs of low-deposit home loans?",
      a: "If you borrow more than 80% of a property's value without a guarantor or government scheme, you will be hit with Lenders Mortgage Insurance (LMI). LMI is a one-off fee that can add $10,000 to $35,000+ to your loan. Additionally, low deposit loans might attract slightly higher interest rates or stricter lending criteria. We help you compare all options to secure the lowest rates."
    }
  ];

  const badgeText = pageHeroSettings?.hero_badge || "Low Deposit Specialists";
  const titleText = pageHeroSettings?.hero_title || "No Deposit & Low Deposit Home Loan Solutions";
  const subtextText = pageHeroSettings?.hero_subtext || "Stop renting and start owning. Explore family guarantor options, government grants, and low deposit schemes to get into your Australian home sooner.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/no_deposit_hero.png";
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Explore Options";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#options";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Calculate Deposit";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "#calculator-section";

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none">
      
      {/* ── HEADER ── */}
      <SiteHeader isSticky={false} settings={settings} />

      {/* ── HERO SECTION ── */}
      <section id="overview" className="relative overflow-hidden bg-white pt-2.5 pb-8 lg:pt-[10px] lg:pb-8 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
        {/* Subtle dot-matrix and glow decorations */}
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#0D9488 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-teal-50 opacity-40 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 85% 90% at 62% 52%, #F0FDFA 0%, #CCFBF1 42%, #F8FAFC 62%, transparent 82%)"
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
            <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-slate-400">Home Loans</span>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-teal-700 font-bold">No Deposit Home Loans</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN: Texts & Badges */}
            <motion.div initial="hidden" animate="visible" variants={premiumStagger} className="flex flex-col justify-center z-10">

              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-teal-50 border-teal-200/50 text-teal-800 w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 shrink-0" />
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className="w-14 h-[3px] bg-teal-600 mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-5 max-w-xl">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #F0FDFA 0%, #CCFBF1 40%, #F8FAFC 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                <a
                  href={btn1Link}
                  onClick={(e) => handleBtnClick(e, btn1Text, btn1Link)}
                  className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-teal-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap cursor-pointer"
                >
                  {btn1Text} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={btn2Link}
                  onClick={(e) => handleBtnClick(e, btn2Text, btn2Link)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-teal-600 text-teal-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-teal-600 hover:text-white text-center w-full sm:w-auto whitespace-nowrap cursor-pointer bg-transparent"
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

            {/* Right Column: Floating Badge ONLY (Image is in the background) */}
            <div className="relative hidden lg:block h-full min-h-[440px]">
              {/* Overlaid Premium Glassmorphic Floating Checklist Badge */}
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
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5 text-teal-600" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {["No Deposit Required", "Guarantor Options", "First Home Grants"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
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
                        ? "bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-[0_4px_12px_rgba(13,148,136,0.22)] font-bold"
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
                            ? "bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-[0_4px_12px_rgba(13,148,136,0.22)] font-bold"
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
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-teal-700 text-[10px] font-bold tracking-widest uppercase">Start Owning Sooner</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Buying a Property with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Zero or Low Deposit</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                {pageSections?.[0] || pageContent || "Saving for a full 20% deposit in Australia's current market can take years, all while property values and rents continue to rise. Fortunately, you don't necessarily need a massive cash stockpile to purchase your home."}
              </p>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                {pageSections?.[1] || `By utilizing family guarantor loans, First Home Buyer government schemes, and alternative assessment criteria, you can secure a mortgage with a deposit as low as 5%—or even 0% in cash out-of-pocket. Our specialists guide you through all routes to minimize up-front cash requirements and completely waive or reduce Lenders Mortgage Insurance (LMI).`}
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-teal-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">0% Cash Deposit Options</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-teal-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Avoid Costly LMI Fees</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-teal-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Use Rent History as Savings</span>
                </div>
              </div>
            </div>

            {/* Right Graphics */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 to-cyan-100 rounded-[32px] blur-2xl opacity-30 transform -rotate-3 scale-95" />
              <div className="relative bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(13,148,136,0.06)] space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-[13px] font-extrabold text-[#0B1F3A]">Mortgage Xperts</div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Lending Solutions</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full uppercase">5★ Advice</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#F0FDFA] border border-teal-100 rounded-2xl p-4.5">
                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Guarantor Support</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[24px] font-black text-[#0B1F3A]">0% Cash</span>
                      <span className="text-[11px] text-slate-400 font-bold">Deposit Required</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5">
                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">First Home Schemes</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[24px] font-black text-slate-800">Only 5%</span>
                      <span className="text-[11px] text-slate-400 font-bold">deposit + No LMI</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: OPTIONS ── */}
      <section id="options" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-teal-700">Lending Options</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              How to Buy a Home with a Tiny Deposit
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Explore the four primary pathways to homeownership in Australia with low or zero cash saved up-front.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Guarantor Home Loan",
                deposit: "0% Cash Deposit",
                desc: "An immediate family member uses their home equity to guarantee 15-20% of your loan. You borrow up to 100%+ and pay zero LMI fees.",
                icon: Wallet,
                color: "bg-teal-50 text-teal-700 border-teal-100"
              },
              {
                title: "First Home Guarantee",
                deposit: "5% Cash Deposit",
                desc: "A government-backed program where Housing Australia acts as your guarantor. Put down a 5% deposit and skip LMI entirely.",
                icon: Landmark,
                color: "bg-green-50 text-green-700 border-green-100"
              },
              {
                title: "First Home Grants (FHOG)",
                deposit: "$10k - $30k Grants",
                desc: "State-specific grants for buying or building new homes that can be added directly to your deposit pool to reduce cash requirements.",
                icon: Coins,
                color: "bg-amber-50 text-amber-700 border-amber-100"
              },
              {
                title: "95% LVR Specialist Loan",
                deposit: "5% + LMI Premium",
                desc: "Borrow up to 95% of property value. You pay LMI (which can be capitalized into the loan), but you buy with a small 5% cash deposit.",
                icon: Percent,
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
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{card.deposit}</div>
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

          <div className="mt-12 bg-teal-50/50 border border-teal-100/70 rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <h4 className="text-[15px] font-extrabold text-[#0B1F3A]">Rental History Alternative</h4>
                <p className="text-slate-600 text-[13px] mt-0.5 leading-relaxed">
                  {pageSections?.[2] || `Have a great history of paying rent? Some specialty lenders now accept a 12-month lease ledger as alternative proof of genuine savings for 5% deposit loans.`}
                </p>
              </div>
            </div>
            <button type="button" onClick={openModal} className="cursor-pointer border-0 rounded-xl bg-[#0B1F3A] text-white hover:bg-slate-800 text-[13px] font-extrabold px-6 py-3 transition-colors shrink-0">
              Get Free Assessment
            </button>
          </div>

        </div>
      </section>

      <RoadmapSection colorTheme="teal" />

      <section id="calculator-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F0FDFA] rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute left-[-200px] bottom-[-200px] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[33%_67%] gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Info & Context */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-teal-100 rounded-full px-4 py-2 mb-6">
                <Calculator className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-teal-700 text-[10px] font-bold tracking-widest uppercase">Financial Modeler</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Low &amp; No Deposit <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Savings Calculator</span>
              </h2>
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-6 max-w-lg">
                {pageSections?.[3] || `Compare guarantor support, government schemes, and standard loans to calculate cash deposit and LMI savings.`}
              </p>

              {/* Glass Card List */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 max-w-md shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Zero Deposit Strategy</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">{pageSections?.[4] || `Using parental guarantor support allows you to bypass deposit requirements entirely and avoid LMI fees.`}</p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">First Home Guarantee</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">{pageSections?.[5] || `Pay only 5% deposit and get government backing to avoid Lenders Mortgage Insurance.`}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Widget */}
            <div className="relative w-full">
              <div className="bg-white border border-slate-200/80 rounded-[24px] shadow-xl shadow-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-[54%_46%]">
                
                {/* Input Fields */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-1">
                    <span className="text-slate-900 text-xs font-black uppercase tracking-wider">1. Choose Property &amp; Scenario</span>
                    <span className="text-[9px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-bold uppercase">Inputs</span>
                  </div>

                  {/* Scenario selector */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Loan Scenario</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: "guarantor", label: "Guarantor (0% Cash)" },
                        { id: "scheme", label: "Govt Scheme (5% Cash)" },
                        { id: "standard", label: "Standard (5% + LMI)" }
                      ].map(scenario => (
                        <button
                          key={scenario.id}
                          type="button"
                          onClick={() => setSelectedScenario(scenario.id as "guarantor" | "scheme" | "standard")}
                          className={`p-2 rounded-lg border text-center transition-all flex flex-col justify-center items-center ${
                            selectedScenario === scenario.id
                              ? "bg-teal-600 border-teal-600 text-white font-extrabold shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <span className="text-[10px] leading-tight font-semibold">{scenario.label}</span>
                        </button>
                      ))}
                    </div>
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
                      className="w-full accent-teal-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                      <span>$200,000</span>
                      <span>$2.0M</span>
                    </div>
                  </div>

                  {/* Summary outputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-left">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Cash Deposit Required</span>
                      <span className={`text-[14px] font-extrabold ${selectedScenario === "guarantor" ? "text-green-600" : "text-[#0B1F3A]"}`}>
                        ${depositAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-left">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Loan Principal</span>
                      <span className="text-[14px] font-extrabold text-[#0B1F3A]">${loanAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Breakdown details */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">LVR Contribution Visual</div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                      {selectedScenario === "guarantor" ? (
                        <>
                          <div className="bg-teal-500 h-full" style={{ width: "20%" }} />
                          <div className="bg-slate-300 h-full" style={{ width: "80%" }} />
                        </>
                      ) : selectedScenario === "scheme" ? (
                        <>
                          <div className="bg-teal-600 h-full" style={{ width: "5%" }} />
                          <div className="bg-green-400 h-full" style={{ width: "15%" }} />
                          <div className="bg-slate-300 h-full" style={{ width: "80%" }} />
                        </>
                      ) : (
                        <>
                          <div className="bg-teal-600 h-full" style={{ width: "5%" }} />
                          <div className="bg-[#EF4444] h-full" style={{ width: "95%" }} />
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-semibold text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>Your Cash Deposit</span>
                      </div>
                      {selectedScenario === "guarantor" && (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-teal-500" />
                          <span>Guarantor Equity (20%)</span>
                        </div>
                      )}
                      {selectedScenario === "scheme" && (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                          <span>Govt Guarantee (15%)</span>
                        </div>
                      )}
                      {selectedScenario === "standard" && (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                          <span>LMI Premium Charged</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Results display */}
                <div className="bg-slate-900 p-4 sm:p-6 flex flex-col justify-between text-white relative">
                  <div className="absolute inset-0 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="text-white/70 text-xs font-bold uppercase tracking-wider">2. Scenario Analysis</span>
                      <span className="text-[9px] text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded-full font-bold uppercase border border-teal-500/20">Analysis</span>
                    </div>

                    <div className="space-y-3.5">
                      
                      {/* Big Savings Block */}
                      {selectedScenario !== "standard" ? (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-0.5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500 rounded-full blur-[30px] opacity-20 pointer-events-none" />
                          <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest">Estimated LMI Saved</span>
                          <div className="text-[28px] font-black leading-none tracking-tight text-white mt-0.5">
                            ${standardLmiEstimateForGuarantorOrScheme.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-white/50 font-semibold pt-0.5">
                            Skip standard Lenders Mortgage Insurance entirely.
                          </div>
                        </div>
                      ) : (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 space-y-0.5 relative overflow-hidden">
                          <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Capitalised LMI Premium</span>
                          <div className="text-[28px] font-black leading-none tracking-tight text-white mt-0.5">
                            ${estimatedLmi.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-white/50 font-semibold pt-0.5">
                            Fee is added to your home loan balance.
                          </div>
                        </div>
                      )}

                      {/* Details grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                          <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block mb-0.5">Deposit Ratio</span>
                          <span className="text-[12.5px] font-extrabold text-white">{depositPct}% Cash</span>
                          <span className="text-[9px] font-bold text-white/50 block mt-0.5">
                            {selectedScenario === "guarantor" ? "+ 20% Guarantee" : selectedScenario === "scheme" ? "+ 15% Guarantee" : "+ LMI Charge"}
                          </span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-left">
                          <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block mb-0.5">Loan-to-Value (LVR)</span>
                          <span className="text-[12.5px] font-extrabold text-white">{100 - depositPct}% LVR</span>
                          <span className={`text-[9px] font-bold block mt-0.5 ${selectedScenario === "standard" ? "text-red-400" : "text-green-400"}`}>
                            {selectedScenario === "standard" ? "LMI Applies" : "LMI Waived"}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Lead Capture form */}
                  <div className="relative z-10 mt-4 pt-4 border-t border-white/10">
                    {!calcSubmitted ? (
                      <form onSubmit={handleCalcLeadSubmit} className="space-y-2.5">
                        <p className="text-[10px] text-white/60 font-semibold leading-snug">
                          Save calculation &amp; get a matching lender report:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                          <input
                            type="text"
                            placeholder="Name"
                            required
                            value={calcLeadName}
                            onChange={(e) => setCalcLeadName(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-teal-500 focus:bg-white/10"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            value={calcLeadEmail}
                            onChange={(e) => setCalcLeadEmail(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-teal-500 focus:bg-white/10"
                          />
                          <input
                            type="tel"
                            placeholder="Phone"
                            required
                            value={calcLeadPhone}
                            onChange={(e) => setCalcLeadPhone(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-teal-500 focus:bg-white/10"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={calcSubmitting}
                          className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-[12px] py-2.5 transition-all cursor-pointer shadow-lg shadow-teal-500/10"
                        >
                          {calcSubmitting ? "Submitting..." : "Get Detailed Lenders Report"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <div className="bg-teal-950/40 border border-teal-500/30 rounded-xl p-4 text-center space-y-1">
                        <CheckCircle className="w-6 h-6 text-teal-400 mx-auto" />
                        <h4 className="text-[13px] font-extrabold text-teal-400">Calculation Saved!</h4>
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

      {/* ── SECTION 4: ELIGIBILITY ── */}
      <section id="eligibility" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            
            {/* Left Column: Heading & Progress */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-teal-700 text-[10px] font-bold tracking-widest uppercase">Self-Check</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Do You Qualify? <span className="text-[#0D9488]">Evaluate Your Options</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                While a big cash deposit isn&apos;t necessary, lenders will evaluate other factors like your income stability and credit history. Use our interactive checklist to see which conditions you meet.
              </p>

              {/* Progress Bar Container */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>Qualifying Criteria Checklist</span>
                  <span className={`font-black ${progress === 100 ? "text-teal-600 animate-pulse" : "text-slate-700"}`}>
                    {progress}% Complete
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[11.5px] text-slate-400 font-semibold leading-relaxed">
                  {progress === 100 
                    ? "🎉 Awesome! You seem to meet all key checklist items! Connect with our credit brokers to verify details and start your application."
                    : "Tick the boxes on the right to see if you qualify for a low or no deposit home loan."
                  }
                </p>
              </div>
            </div>

            {/* Right Column: Checkboxes */}
            <div className="space-y-3.5">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-full text-left flex items-start gap-4 p-4.5 rounded-2xl border transition-all duration-300 ${
                    item.checked 
                      ? "bg-[#F0FDFA] border-teal-200 shadow-sm" 
                      : "bg-white border-slate-200/70 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-5.5 h-5.5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    item.checked 
                      ? "bg-teal-600 border-teal-600 text-white" 
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

      {/* ── SECTION 5: CALCULATOR ── */}
      
      
      

      {/* ── SECTION 6: FAQS ACCORDION ── */}
      <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-teal-700">FAQ Helpdesk</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Frequently Asked <span className="text-[#0D9488]">Questions</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                {pageSections?.[6] || `Here are quick answers to common questions about guarantor loans, government low-deposit schemes, and using alternative genuine savings.`}
              </p>
              <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 space-y-4">
                <h4 className="text-[15px] font-extrabold text-[#0B1F3A]">Have a unique situation?</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {pageSections?.[7] || `Every borrower’s financial position and parental equity situation are unique. Our accredited mortgage specialists can sit down with you to design a custom lending structure.`}
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
                        isOpen ? "bg-teal-50 border-teal-200 text-teal-700 rotate-180" : "border-slate-200 text-slate-400"
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

      {/* ── SECTION 7: TESTIMONIALS ── */}
      <TestimonialSection />

      {/* ── SECTION 8: BLOGS ── */}
      <BlogSection
        badgeText="Expert Tips"
        titlePart1="Latest Insights"
        titlePart2="& Deposit Saving Guides"
        subtitleText="Find out how other Australian buyers have bypassed LMI fees and saved thousands on their deposits."
        accentColor="#0D9488"
        accentTextClass="text-teal-500"
        accentBgClass="bg-teal-500"
        darkTheme={true}
      />

      {/* ── SECTION 9: ENQUIRY CALLBACK FORM ── */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-6 left-6 w-32 h-32 opacity-10" style={{ backgroundImage: "radial-gradient(#0D9488 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
        <div className="absolute bottom-6 right-6 w-32 h-32 opacity-10" style={{ backgroundImage: "radial-gradient(#0D9488 1px, transparent 1px)", backgroundSize: "8px 8px" }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-2">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-teal-700 text-[10px] font-bold tracking-widest uppercase">Quick Response</span>
              </div>
              
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Ready to Own Your Home? <span className="text-[#0D9488]">Get Started Now</span>
              </h2>
              
              <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                Submit your query below. Our accredited specialists will check your guarantor eligibility, assess scheme options, and compare rates from 40+ lenders.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 shrink-0 border border-teal-100">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#0B1F3A]">Specialist Lending Networks</h4>
                    <p className="text-slate-400 text-xs font-medium">We access niche lenders with flexible credit assessment guidelines.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 shrink-0 border border-teal-100">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#0B1F3A]">100% Free Service</h4>
                    <p className="text-slate-400 text-xs font-medium">No fee to you for organizing loans and guarantor structures.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card Column */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-full blur-[60px] opacity-20 pointer-events-none" />
              
              {!enquirySubmitted ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 relative z-10 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Last Name / Surname</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder=""
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">Your Message / Query</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Type your query or deposit scenario here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    By clicking ‘Submit Enquiry’, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert’s brokers.
                  </p>

                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submittingEnquiry ? "Submitting..." : "Submit Enquiry"}
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto rounded-full border border-emerald-100">
                    ✓
                  </div>
                  <h3 className="text-[#0B1F3A] text-[20px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Enquiry Submitted!
                  </h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed max-w-sm mx-auto">
                    Thank you for contacting Mortgage Xperts. One of our credit experts will review your deposit scenario details and get in touch shortly to assist you.
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
