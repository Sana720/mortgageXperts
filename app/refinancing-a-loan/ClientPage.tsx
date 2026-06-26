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
  CreditCard,
  ShieldAlert,
  UserCheck,
  Scale,
  Coins,
  Landmark
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { TestimonialSection } from "../components/TestimonialSection";
import { BlogSection } from "../components/BlogSection";
import {
  EASE_OUT,
  motionCardHover,
  motionCardShadow
} from "@/lib/motion";

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
      ease: [0.16, 1, 0.3, 1] as const
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



// ==========================================
// CONFIGURABLE BRAND THEME COLOR CONFIG (Purple/Violet - Matches Slide 4)
// ==========================================


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
  const badgeText = pageHeroSettings?.hero_badge || "Smart Refinance Strategies";
  const titleText = pageHeroSettings?.hero_title || "Refinancing a Loan";
  const subtextText = pageHeroSettings?.hero_subtext || "Refinancing your home loan is one of the smartest ways to save money, lower your repayments, or get better features from your mortgage.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/refinance_family_clean.png";
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Book Free Consultation";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#contact";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Try Savings Calculator";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "#calculator-section";

  // ── STATE VARIABLES FOR INTERACTIVE UX ──
  const [activeNav, setActiveNav] = useState("overview");
  const [navSticky, setNavSticky] = useState(false);
  const navSentinelRef = useRef<HTMLDivElement>(null);

  // Dynamic Scroll Progress state for Roadmap Steps
  const roadmapSectionRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [mobileActiveStepIndex, setMobileActiveStepIndex] = useState(0);

  // Refinance Savings Calculator State
  const [loanBalance, setLoanBalance] = useState(600000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [newRate, setNewRate] = useState(5.8);
  const [remainingTerm, setRemainingTerm] = useState(25);
  const [switchCosts, setSwitchCosts] = useState(1500);
  const [calcTab, setCalcTab] = useState<"inputs" | "results">("inputs");

  // Lead Funnel Modal State
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);

  // General callback form state
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, label: "Current home loan is more than 2 years old", checked: true },
    { id: 2, label: "Your property has increased in value (equity > 20%)", checked: true },
    { id: 3, label: "Stable income and employment for past 12 months", checked: false },
    { id: 4, label: "Clean credit history (no missed card or loan payments)", checked: false },
    { id: 5, label: "Documents ready: last 3 payslips and 6 months mortgage statements", checked: false }
  ]);

  const toggleChecklist = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };
  const checklistProgress = Math.round((checklist.filter(item => item.checked).length / checklist.length) * 100);



  // FAQs Accordion State
  const [activeFaqTab, setActiveFaqTab] = useState<"refinance" | "buying">("refinance");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate Refinance Savings
  const rCurrent = currentRate / 12 / 100;
  const rNew = newRate / 12 / 100;
  const nMonths = remainingTerm * 12;

  // Monthly repayment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const currentRepayment = loanBalance * (rCurrent * Math.pow(1 + rCurrent, nMonths)) / (Math.pow(1 + rCurrent, nMonths) - 1) || 0;
  const newRepayment = loanBalance * (rNew * Math.pow(1 + rNew, nMonths)) / (Math.pow(1 + rNew, nMonths) - 1) || 0;
  
  const monthlySavings = Math.max(0, currentRepayment - newRepayment);
  const annualSavings = monthlySavings * 12;
  const fiveYearSavings = (annualSavings * 5) - switchCosts;
  const breakEvenMonths = monthlySavings > 0 ? Math.round((switchCosts / monthlySavings) * 10) / 10 : 0;

  // Sticky Navigation Spy
  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky nav bar exactly when it scrolled past the hero section (500px scroll)
      if (window.scrollY > 500) {
        setNavSticky(true);
      } else {
        setNavSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run immediately to capture correct initial load state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy Roadmap effect
  useEffect(() => {
    const handleScroll = () => {
      const el = roadmapSectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolledIntoSection = -rect.top;
      const scrollableRun = sectionHeight - viewportHeight;
      if (scrollableRun <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolledIntoSection / scrollableRun));
      const idx = Math.min(3, Math.floor(progress * 4)); // 4 steps (0 to 3)
      setActiveStepIndex(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sticky Navigation Spy
  useEffect(() => {
    const sectionIds = [
      "overview",
      "why-refinance",
      "calculator-section",
      "roadmap",
      "costs",
      "mistakes",
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

  const whyRefinanceCards = [
    {
      title: "Lower Interest Rates",
      desc: "Reduce your repayments and interest charges by securing a lower interest rate than your current lender offers.",
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "Better Loan Features",
      desc: "Switch to a loan with useful features like an offset account, redraw facility, or flexible repayments.",
      icon: ShieldCheck,
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      title: "Debt Consolidation",
      desc: "Consolidate higher-interest debts (like car loans or credit cards) into your mortgage for lower, simple repayments.",
      icon: Wallet,
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Unlock Home Equity",
      desc: "Access the equity built up in your home to finance renovations, invest in property, or secure capital.",
      icon: HomeIcon,
      color: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "Change Loan Type",
      desc: "Move from a fixed interest rate to a variable rate, or vice versa, depending on your changing financial outlook.",
      icon: Clock,
      color: "bg-rose-50 text-rose-600 border-rose-100"
    }
  ];

  const roadmapSteps = [
    {
      title: "Research Loan Options",
      phase: "Phase 1: Market Analysis",
      tagline: "We scan 40+ lenders to find a better deal",
      desc: "We analyze your current loan structure and compare it against our direct network of 40+ lenders. We locate lower interest rates, cash back offers, and favorable policies tailored to your scenario.",
      highlightsRow: [{ label: "Compare 40+ Lenders" }, { label: "Identify Cash Back Deals" }, { label: "Custom Cost Audit" }],
      evaluate: [
        { label: "Current Rate Buffer", icon: Percent, color: "bg-purple-50 text-purple-600" },
        { label: "Property Valuation", icon: HomeIcon, color: "bg-blue-50 text-blue-600" }
      ],
      img: "/images/hero_slide_4_purple.png",
      floatingText: "Scanning Market..."
    },
    {
      title: "Choose Your Loan",
      phase: "Phase 2: Product Matching",
      tagline: "Select features like offset accounts & redraws",
      desc: "We present a shortlist of recommendations. We don't just look at the lowest rate — we weigh ongoing fees, break costs, and features like offset accounts so you make a smart, informed choice.",
      highlightsRow: [{ label: "Offset & Redraw Check" }, { label: "Break Fee Evaluation" }, { label: "Tailored Structures" }],
      evaluate: [
        { label: "LVR Calculations", icon: Calculator, color: "bg-emerald-50 text-emerald-600" },
        { label: "Account Setup Fees", icon: CreditCard, color: "bg-amber-50 text-amber-600" }
      ],
      img: "/images/hero_slide_2_green.png",
      floatingText: "Shortlisting Deals..."
    },
    {
      title: "Paperwork and Process",
      phase: "Phase 3: Smooth Transition",
      tagline: "We manage the transition from your old bank",
      desc: "Our brokers handle the entire application process, including getting your property valued and managing the discharge paperwork with your current lender. We keep things completely stress-free.",
      highlightsRow: [{ label: "Discharge Form Handled" }, { label: "Lender Negotiations" }, { label: "Fast Tracking Application" }],
      evaluate: [
        { label: "Lender Buffers", icon: ShieldCheck, color: "bg-indigo-50 text-indigo-600" },
        { label: "Title Registration", icon: Landmark, color: "bg-rose-50 text-rose-600" }
      ],
      img: "/images/hero_slide_5_rose.png",
      floatingText: "Handling Paperwork..."
    },
    {
      title: "Start Saving",
      phase: "Phase 4: Settlement",
      tagline: "Repayments drop and cash flow increases",
      desc: "Settlement completes. Your new loan officially begins, your old loan is discharged, and you start saving interest and repayments immediately. Use your extra cash to pay off principal faster!",
      highlightsRow: [{ label: "Lower Repayments Live" }, { label: "Equity Released" }, { label: "Interest Charges Cut" }],
      evaluate: [
        { label: "Savings Realized", icon: Coins, color: "bg-emerald-50 text-emerald-600" },
        { label: "Broker Review", icon: UserCheck, color: "bg-purple-50 text-purple-600" }
      ],
      img: "/images/hero_slide_3_yellow.png",
      floatingText: "Savings Activated!"
    }
  ];

  const costsBreakdown = [
    {
      title: "Old Lender Exit Fees",
      amount: "$350 - $450",
      tag: "Discharge Fee",
      desc: "Standard administrative cost charged by your current bank to release your mortgage deed at settlement.",
      highlight: false
    },
    {
      title: "New Application Fees",
      amount: "$0 - $600",
      tag: "Setup Fee",
      desc: "Lender administrative charges to establish your new mortgage. Often waived during special broker promotions.",
      highlight: false
    },
    {
      title: "Government Registration",
      amount: "$300 - $400",
      tag: "State Rego Fees",
      desc: "State land registry fees to register your new mortgage and deregister your previous lender's mortgage title.",
      highlight: true
    },
    {
      title: "Valuation Fees",
      amount: "$0 - $300",
      tag: "Property Valuation",
      desc: "Charged by a lender to verify your property's value. We negotiate with lenders to get this service completely free.",
      highlight: false
    },
    {
      title: "Settlement/Legal Fees",
      amount: "$300 - $600",
      tag: "Conveyancer Costs",
      desc: "Legal conveyancer or bank settlement agent fees to facilitate the electronic swap of funds between banks.",
      highlight: false
    }
  ];

  const commonMistakes = [
    {
      title: "Focusing Only on Interest Rate",
      desc: "Ignoring application fees, exit fees, or the loss of crucial loan features (like offset accounts) that could wipe out rate savings.",
      icon: Percent,
      color: "bg-red-50 text-red-500"
    },
    {
      title: "Short-Term Savings Trap",
      desc: "Switching loans for a tiny rate reduction that takes years to break even compared to the upfront switching costs.",
      icon: Clock,
      color: "bg-orange-50 text-orange-500"
    },
    {
      title: "Lenders Mortgage Insurance (LMI)",
      desc: "Refinancing when you have less than 20% equity (LVR > 80%), which could trigger LMI charges and wipe out your savings completely.",
      icon: ShieldAlert,
      color: "bg-pink-50 text-pink-500"
    },
    {
      title: "Skipping a Mortgage Broker",
      desc: "Applying directly to one bank and missing out on unadvertised, negotiated broker rates from other competitive lenders.",
      icon: Scale,
      color: "bg-purple-50 text-purple-500"
    }
  ];

  const faqGroupData = {
    refinance: [
      {
        q: "How much does it cost to refinance a home loan?",
        a: "Refinancing typically costs between $1,000 and $2,000 upfront. This covers exit fees from your current lender (around $350), new loan application fees ($0-$600), valuation fees, and government mortgage registration charges (around $300-$400). However, many lenders offer cash back deals (up to $2,000 - $4,000) that completely cover these costs, and we negotiate to waive setup fees wherever possible."
      },
      {
        q: "What is Lenders Mortgage Insurance (LMI) in refinancing?",
        a: "If you refinance and borrow more than 80% of your property's current value (LVR > 80%), you will generally have to pay Lenders Mortgage Insurance (LMI) again, even if you paid it on your original loan. This is because LMI is non-transferable. We calculate your current property value and equity buffer beforehand to ensure you avoid paying LMI when you switch lenders."
      },
      {
        q: "How long does the refinancing process take?",
        a: "From application submission to settlement, refinancing typically takes between 2 to 6 weeks. The timeline depends heavily on lender processing speeds and how fast your current lender handles the mortgage discharge. We manage all the follow-ups and discharge requests on your behalf to keep the process moving quickly."
      },
      {
        q: "What documents do I need to refinance?",
        a: "Lenders will evaluate your refinancing application similarly to a new purchase. You will need 2-3 recent payslips, group certificates (or tax returns if self-employed), 3-6 months of statements for your current home loan (proving clean payment history), and credit card or personal loan statements."
      }
    ],
    buying: [
      {
        q: "How much deposit do I need to buy my first home?",
        a: "While a 20% deposit is standard to avoid Lenders Mortgage Insurance (LMI), first-home buyers can secure a loan with as little as a 5% deposit. Under the Australian First Home Guarantee scheme, you can buy with a 5% deposit and the government guarantees the remaining 15%, letting you skip LMI completely. We'll help you check your scheme eligibility."
      },
      {
        q: "What government assistance is available for first-home buyers?",
        a: "First-home buyers in Australia can access several incentives, including the First Home Owner Grant (FHOG) for building/buying new homes, Stamp Duty Concessions (which can save you up to $30,000 depending on your state and purchase price), and the Home Guarantee Scheme (which lets you purchase with a 5% deposit and no LMI)."
      },
      {
        q: "Do I need pre-approval before buying?",
        a: "Yes. Getting pre-approval gives you a clear budget and allows you to make offers with confidence. It is typically valid for 90 days and proves to sellers that you are a serious buyer with financing backing. We fast-track your pre-approval across multiple lenders."
      },
      {
        q: "Can I buy with a partner or family member?",
        a: "Absolutely. Buying co-ownership is a common strategy to pool resources and increase borrowing capacity. Joint applicants are evaluated together on servicing, and there are even guarantor options where family members can use their own home equity to secure your deposit."
      }
    ]
  };



  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none">
      
      <SiteHeader isSticky={false} settings={settings} />

      {/* ── HERO SECTION ── */}
      <section id="overview" className="relative overflow-hidden bg-white pt-2.5 pb-8 lg:pt-[10px] lg:pb-8 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
        {/* Subtle dot-matrix and glow decorations */}
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#7C3AED 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-purple-50 opacity-40 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 85% 90% at 62% 52%, #F3E8FF 0%, #E9D5FF 42%, #FAF5FF 62%, transparent 82%)"
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
            <Link href="/" className="hover:text-[#7C3AED] transition-colors">Home</Link>
            <span className="text-slate-300 font-normal">&gt;</span>
            <span className="text-slate-400">Home Loans</span>
            <span className="text-slate-300 font-normal">&gt;</span>
            <span className="text-purple-700 font-bold">Refinance Your Loan</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN: Texts & Badges */}
            <motion.div initial="hidden" animate="visible" variants={premiumStagger} className="flex flex-col justify-center z-10">

              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-purple-50 border-purple-200/50 text-purple-800 w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className="w-14 h-[3px] bg-[#7C3AED] mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-5 max-w-xl">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #F3E8FF 0%, #E9D5FF 40%, #FAF5FF 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                {(!btn1Link || btn1Link === "#" || btn1Link === "#contact" || btn1Link === "#callback") ? (
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-purple-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap cursor-pointer border-0"
                  >
                    {btn1Text} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={btn1Link}
                    className="inline-flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-purple-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap"
                  >
                    {btn1Text} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <a
                  href={btn2Link}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("calculator-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#7C3AED] text-purple-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-[#7C3AED] hover:text-white text-center w-full sm:w-auto whitespace-nowrap"
                >
                  {btn2Text}
                </a>
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
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700 shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5 text-purple-600" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {["Lower Rate", "Cashback Deals", "Debt Consolidation"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
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

      {/* Sentinel to trigger Sticky Navigation bar */}
      <div ref={navSentinelRef} className="h-0 w-full" />

      {/* ── STATIC IN-PAGE NAVIGATION ── */}
      <div className={`relative bg-transparent mt-[-36px] pb-12 z-20 transition-all duration-300 ${
        navSticky ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 flex justify-center">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-[30px] p-2 shadow-[0_15px_40px_rgba(11,31,58,0.06)] flex items-center justify-start w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollbarWidth: "none" }}>
            <div className="flex items-center gap-1.5 md:gap-2.5 px-2 w-max mx-auto shrink-0">
              {[
                { id: "overview", label: "Overview", icon: HomeIcon },
                { id: "why-refinance", label: "Why Refinance", icon: FileText },
                { id: "calculator-section", label: "Savings Calculator", icon: Calculator },
                { id: "roadmap", label: "Roadmap", icon: Calendar },
                { id: "costs", label: "Costs", icon: Percent },
                { id: "mistakes", label: "Mistakes to Avoid", icon: ShieldAlert },
                { id: "faqs", label: "FAQs", icon: HelpCircle },
                { id: "contact", label: "Get Started", icon: ArrowRight }
              ].map(({ id, label, icon: IconComponent }) => {
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
                        ? "bg-gradient-to-br from-[#1E1145] to-[#7C3AED] text-white shadow-[0_4px_12px_rgba(124,58,237,0.25)] font-bold"
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
                  {[
                    { id: "overview", label: "Overview", icon: HomeIcon },
                    { id: "why-refinance", label: "Why Refinance", icon: FileText },
                    { id: "calculator-section", label: "Savings Calculator", icon: Calculator },
                    { id: "roadmap", label: "Roadmap", icon: Calendar },
                    { id: "costs", label: "Costs", icon: Percent },
                    { id: "mistakes", label: "Mistakes to Avoid", icon: ShieldAlert },
                    { id: "faqs", label: "FAQs", icon: HelpCircle },
                    { id: "contact", label: "Get Started", icon: ArrowRight }
                  ].map(({ id, label, icon: IconComponent }) => {
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
                            ? "bg-gradient-to-br from-[#1E1145] to-[#7C3AED] text-white shadow-[0_4px_12px_rgba(124,58,237,0.25)] font-bold"
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

      {/* ── SECTION 3: STORY / OVERVIEW SECTION ── */}
      <section id="overview" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Soft decorative elements */}
        <div className="absolute top-6 right-6 w-36 h-36 opacity-15 pointer-events-none" style={{ backgroundImage: "radial-gradient(#7C3AED 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Story texts */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={premiumStagger}
              className="lg:col-span-5 flex flex-col w-full"
            >
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-[#F5F3FF] border border-[#7C3AED]/15 rounded-full px-3.5 py-1.5 mb-4 w-fit shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span className="text-[#7C3AED] text-[10.5px] font-extrabold tracking-widest uppercase">
                  FINANCIAL SMART-MOVE
                </span>
              </motion.div>

              <h2
                className="text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold text-[#0B1F3A] leading-[1.1] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Upgrade to a Better Deal. <br />
                <span className="text-[#7C3AED]">Without Moving House.</span>
              </h2>

              <motion.div variants={premiumFadeUp} className="w-12 h-[3px] bg-[#7C3AED] mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14.5px] leading-relaxed mb-6">
                {pageContent || "Refinancing your home loan is like upgrading your car or utility bill to a better rate without changing address. If your mortgage is more than two years old, or your financial position has changed, you could be paying a large interest premium to your bank. Here's how we help you switch lenders to save."}
              </motion.p>

              <motion.div variants={premiumFadeUp} className="flex items-center gap-2.5 mb-6">
                <div className="w-5 h-5 rounded-full bg-[#F5F3FF] flex items-center justify-center shrink-0 shadow-sm text-[#7C3AED]">
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                <span className="text-[#0B1F3A] font-extrabold text-[14.5px]">We negotiate with banks on your behalf.</span>
              </motion.div>

              {/* Navy-to-purple gradient stats card */}
              <motion.div
                variants={premiumFadeUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(124,58,237,0.15)" }}
                className="bg-gradient-to-br from-[#0B1F3A] to-[#2E1065] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg border border-white/5 flex items-center justify-between gap-6 group transition-all duration-300 w-full"
              >
                <div className="absolute right-[-40px] top-[-40px] w-48 h-48 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-400/15 transition-colors duration-500" />
                
                <div className="flex flex-col flex-1 z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center shrink-0 bg-white/5 text-white">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[26px] font-extrabold leading-none text-white tracking-tight">40+</div>
                      <div className="text-[14px] font-bold text-white mt-1">Lenders Audited</div>
                      <div className="text-[11px] text-purple-200 mt-0.5 font-bold">Unlocking wholesale rates</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-white/10">
                    <div className="flex -space-x-2 shrink-0">
                      <div className="w-7 h-7 rounded-full border-2 border-[#0B1F3A] overflow-hidden bg-slate-200 relative">
                        <Image src="/images/avatar_client_1.png" fill className="object-cover" alt="User Avatar" />
                      </div>
                      <div className="w-7 h-7 rounded-full border-2 border-[#0B1F3A] overflow-hidden bg-slate-300 relative">
                        <Image src="/images/avatar_client_2.png" fill className="object-cover" alt="User Avatar" />
                      </div>
                      <div className="w-7 h-7 rounded-full border-2 border-[#0B1F3A] overflow-hidden bg-slate-400 relative">
                        <Image src="/images/avatar_client_3.png" fill className="object-cover" alt="User Avatar" />
                      </div>
                    </div>
                    <span className="text-[11.5px] text-slate-200 font-bold">Hundreds of Nepalese families helped</span>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Right Column: Problem pain point Cards */}
            <div className="lg:col-span-7 flex flex-col w-full relative">
              <div className="hidden sm:block absolute left-[20px] top-[40px] bottom-[40px] w-0 border-l-2 border-dashed border-slate-200/80 pointer-events-none" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={premiumStagger}
                className="flex flex-col gap-6 w-full relative"
              >
                {[
                  {
                    title: "Paying Too Much Interest?",
                    desc: "Lenders offer new clients promotional discounts while leaving existing loyal clients on higher standard variable rates (the 'loyalty tax').",
                    num: "01",
                    icon: Percent,
                    colorClass: "bg-red-50 text-red-500",
                    href: "#calculator-section"
                  },
                  {
                    title: "Missing Modern Loan Features?",
                    desc: "Older home loans often lack offset accounts or redraw facilities that let you pay off principal faster with your extra savings.",
                    num: "02",
                    icon: CreditCard,
                    colorClass: "bg-purple-50 text-purple-600",
                    href: "#why-refinance"
                  },
                  {
                    title: "Struggling with Multiple High-Interest Debts?",
                    desc: "Paying off credit cards, car loans, and your mortgage separately increases monthly outflows. Debt consolidation merges them into one low rate.",
                    num: "03",
                    icon: Wallet,
                    colorClass: "bg-blue-50 text-blue-600",
                    href: "#why-refinance"
                  },
                  {
                    title: "Need Cash to Renovate or Invest?",
                    desc: "Unlocking accumulated equity in your home provides the cash required for renovations or a deposit on an investment property.",
                    num: "04",
                    icon: Coins,
                    colorClass: "bg-emerald-50 text-emerald-600",
                    href: "#why-refinance"
                  }
                ].map((pain, idx) => {
                  const IconComp = pain.icon;
                  return (
                    <div key={idx} className="relative w-full flex items-center">
                      
                      {/* Timeline node bubble */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 + idx * 0.08 }}
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center font-bold text-[13px] text-[#7C3AED] z-10 shadow-sm"
                      >
                        {pain.num}
                      </motion.div>

                      {/* Content Card */}
                      <motion.a
                        href={pain.href}
                        onClick={(e) => {
                          const target = document.querySelector(pain.href);
                          if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        variants={premiumFadeUp}
                        whileHover={{ x: 6, scale: 1.005, boxShadow: "0 20px 30px rgba(124,58,237,0.03)", borderColor: "#E2E8F0" }}
                        className="ml-0 sm:ml-14 bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-5.5 flex items-center justify-between gap-3.5 sm:gap-5 transition-all duration-300 group cursor-pointer shadow-[0_4px_25px_rgba(15,23,42,0.015)] flex-1"
                      >
                        <div className="flex items-start gap-3.5 sm:gap-4.5">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${pain.colorClass} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                            <IconComp className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2px]" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-[#0B1F3A] text-[14px] sm:text-[15px] font-extrabold leading-tight font-montserrat tracking-tight group-hover:text-[#7C3AED] transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                              <span className="sm:hidden text-[#7C3AED] font-black mr-1">{pain.num}. </span>{pain.title}
                            </h3>
                            <p className="text-slate-500 text-[12px] sm:text-[12.5px] mt-1.5 leading-relaxed">
                              {pain.desc}
                            </p>
                          </div>
                        </div>

                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-55 border border-slate-200/60 flex items-center justify-center shrink-0 group-hover:bg-[#7C3AED] group-hover:text-white group-hover:border-[#7C3AED] text-[#7C3AED] shadow-sm transition-all duration-300">
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      </motion.a>
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY REFINANCE DETAILS GRID ── */}
      <section id="why-refinance" className="py-16 md:py-20 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#F5F3FF] border border-[#7C3AED]/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#7C3AED]">Core Benefits</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-extrabold leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Why Do Homeowners Choose To Refinance?
            </h2>
            <p className="text-slate-500 text-[14.5px] leading-relaxed max-w-xl mx-auto">
              Refinancing can save you thousands over the life of your loan. We help you compare your current loan with better options from a range of lenders so you can make an informed choice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whyRefinanceCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, boxShadow: "0 20px 30px rgba(124,58,237,0.06)" }}
                  className="bg-white border border-slate-200 rounded-3xl p-6.5 shadow-sm transition-all duration-300 flex flex-col gap-4 text-left border-slate-100"
                >
                  <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shrink-0 shadow-sm border`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-[#0B1F3A] text-[16px] font-bold leading-snug mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-[13.5px] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 5: SAVINGS CALCULATOR SECTION ── */}
      <section id="calculator-section" className="py-14 md:py-20 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5F3FF] rounded-full blur-[100px] opacity-70 pointer-events-none" />
        <div className="absolute left-[-200px] bottom-[-200px] w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-[33%_67%] gap-8 lg:gap-12 items-center">
            
            {/* Left Texts */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-[#7C3AED]/15 rounded-full px-4 py-2 mb-6">
                <Calculator className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-[#7C3AED] text-[10px] font-bold tracking-widest uppercase">
                  Savings Calculator
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                How Much Can You <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]">Save by Refinancing?</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-lg">
                Let&apos;s look at a quick example: A home loan of $600,000 with an interest rate of 6.5%. If you refinance to a lower rate of 5.8%, you could save around $2,500 to $3,000 per year in interest alone. Over five years, that&apos;s more than $12,000 saved, just by switching to a better deal.
              </p>
              
              {/* Info checklist box */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 max-w-md shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0 border border-purple-100">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Small rate cuts make a big difference</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">Even a minor 0.5% rate drop saves thousands in ongoing interest charges and speeds up repayment.</p>
                  </div>
                </div>
                <hr className="border-slate-100" />
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Use savings to pay off principal</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">Redirecting your monthly interest savings into your loan balance can shave years off your loan term.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Refinance Calculator Widget */}
            <div className="relative w-full">
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(124,58,237,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-[54%_46%]">
                
                {/* Calculator Inputs Column */}
                <div className={`p-4 sm:p-6 space-y-3.5 ${calcTab === "inputs" ? "block" : "hidden md:block"}`}>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-1">
                    <h3 className="text-[#0B1F3A] text-xs font-black uppercase tracking-wider">
                      Savings Audit
                    </h3>
                    <span className="flex items-center gap-1 text-[8.5px] bg-emerald-50 text-emerald-600 font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-100">
                      Live Calculator
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Input 1: Loan Balance */}
                    <div className="group space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                        <span>Current Loan Balance</span>
                        <span className="text-[#7C3AED] font-extrabold">${loanBalance.toLocaleString()}</span>
                      </div>
                      <div className="relative rounded-lg border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-1 focus-within:ring-[#7C3AED] transition-all bg-slate-50/50 px-2.5 py-1 flex items-center shadow-sm">
                        <span className="text-slate-400 text-xs mr-1 font-bold">$</span>
                        <input
                          type="number"
                          value={loanBalance}
                          onChange={(e) => setLoanBalance(Math.max(0, Number(e.target.value)))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-xs font-bold"
                        />
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={2000000}
                        step={10000}
                        value={loanBalance}
                        onChange={(e) => setLoanBalance(Number(e.target.value))}
                        className="w-full h-1 rounded-full accent-[#7C3AED] bg-slate-100 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Input 2: Current Interest Rate */}
                      <div className="group space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                          <span>Current Rate</span>
                          <span className="text-[#7C3AED]">{currentRate}%</span>
                        </div>
                        <div className="relative rounded-lg border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-1 focus-within:ring-[#7C3AED] transition-all bg-slate-50/50 px-2.5 py-1 flex items-center shadow-sm">
                          <input
                            type="number"
                            step="0.05"
                            value={currentRate}
                            onChange={(e) => setCurrentRate(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-xs font-bold"
                          />
                          <span className="text-slate-400 text-xs ml-1 font-extrabold">%</span>
                        </div>
                        <input
                          type="range"
                          min={2.0}
                          max={10.0}
                          step={0.05}
                          value={currentRate}
                          onChange={(e) => setCurrentRate(Number(e.target.value))}
                          className="w-full h-1 rounded-full accent-[#7C3AED] bg-slate-100 cursor-pointer"
                        />
                      </div>

                      {/* Input 3: New Interest Rate */}
                      <div className="group space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                          <span>New Rate</span>
                          <span className="text-[#7C3AED]">{newRate}%</span>
                        </div>
                        <div className="relative rounded-lg border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-1 focus-within:ring-[#7C3AED] transition-all bg-slate-50/50 px-2.5 py-1 flex items-center shadow-sm">
                          <input
                            type="number"
                            step="0.05"
                            value={newRate}
                            onChange={(e) => setNewRate(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-xs font-bold"
                          />
                          <span className="text-slate-400 text-xs ml-1 font-extrabold">%</span>
                        </div>
                        <input
                          type="range"
                          min={2.0}
                          max={10.0}
                          step={0.05}
                          value={newRate}
                          onChange={(e) => setNewRate(Number(e.target.value))}
                          className="w-full h-1 rounded-full accent-[#7C3AED] bg-slate-100 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Input 4: Remaining Loan Term */}
                      <div className="group space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">Loan Term (Years)</span>
                        <div className="relative rounded-lg border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-1 focus-within:ring-[#7C3AED] transition-all bg-slate-50/50 px-2.5 py-1 flex items-center shadow-sm h-[32px]">
                          <select
                            value={remainingTerm}
                            onChange={(e) => setRemainingTerm(Number(e.target.value))}
                            className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-xs font-bold cursor-pointer"
                          >
                            {[10, 15, 20, 25, 30].map(yr => (
                              <option key={yr} value={yr}>{yr} Years</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Input 5: Switching Costs */}
                      <div className="group space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                          <span>Switch Costs</span>
                          <span className="text-slate-600 font-bold">${switchCosts}</span>
                        </div>
                        <div className="relative rounded-lg border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-1 focus-within:ring-[#7C3AED] transition-all bg-slate-50/50 px-2.5 py-1 flex items-center shadow-sm">
                          <span className="text-slate-400 text-xs mr-1 font-bold">$</span>
                          <input
                            type="number"
                            value={switchCosts}
                            onChange={(e) => setSwitchCosts(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-xs font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only CTA to swap views */}
                  <button
                    type="button"
                    onClick={() => setCalcTab("results")}
                    className="md:hidden w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase py-2.5 px-4 rounded-lg text-center flex items-center justify-center gap-1 shadow-md mt-3"
                  >
                    <span>View Calculations</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Calculator Results Summary Column */}
                <div className={`bg-gradient-to-br from-[#0B1F3A] to-[#2E1065] text-white p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden ${calcTab === "results" ? "block" : "hidden md:block"}`}>
                  <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] bg-purple-500/20 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="space-y-3.5 relative z-10">
                    <div>
                      <span className="text-[9px] text-purple-200 font-black tracking-widest uppercase block mb-0.5">
                        Assessed Monthly Savings
                      </span>
                      <div className="text-[22px] sm:text-[26px] font-black text-white leading-none tracking-tight font-montserrat">
                        ${Math.round(monthlySavings).toLocaleString()}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[8.5px] bg-white/10 text-purple-100 font-bold uppercase px-2 py-0.5 rounded-full border border-white/10 mt-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        Save ${Math.round(annualSavings).toLocaleString()} / year
                      </span>
                    </div>

                    <hr className="border-white/10" />

                    {/* Compare repayments */}
                    <div>
                      <h4 className="text-[9px] text-purple-200 font-black tracking-widest uppercase mb-1.5">Repayment Comparison</h4>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Current Monthly:</span>
                          <span className="font-semibold text-white">${Math.round(currentRepayment).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>New Monthly:</span>
                          <span className="font-semibold text-white">${Math.round(newRepayment).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Long term savings */}
                    <div>
                      <h4 className="text-[9px] text-purple-200 font-black tracking-widest uppercase mb-1.5">Net Financial Savings</h4>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>5-Year Net Savings:</span>
                          <strong className="text-emerald-400 font-black">${Math.round(fiveYearSavings).toLocaleString()}</strong>
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Break-Even Period:</span>
                          <span className="font-semibold text-white">{breakEvenMonths} Months</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-4 space-y-2 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setLeadSubmitted(false);
                        setIsLeadModalOpen(true);
                      }}
                      className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11.5px] font-black uppercase py-2.5 px-4 rounded-lg text-center flex items-center justify-center gap-1.5 shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <span>Unlock Negotiated Rates</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setCalcTab("inputs");
                      }}
                      className="md:hidden w-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase py-2 px-3 rounded-lg text-center flex items-center justify-center gap-1 border border-white/10 transition-all duration-300 mt-1"
                    >
                      <span>← Adjust Details</span>
                    </button>

                    <p className="text-[8px] text-purple-200/50 text-center leading-tight pt-0.5">
                      *Estimates only. Bank fees apply.
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: HOW REFINANCING WORKS (ROADMAP SECTION) ── */}
      <div id="roadmap">
        
        {/* DESKTOP VERSION: STICKY DYNAMIC SCROLL REVEAL (lg and up) */}
        <section 
          ref={roadmapSectionRef} 
          className="hidden lg:block relative bg-slate-50/50 border-b border-slate-100" 
          style={{ minHeight: "450vh" }}
        >
          <div className="sticky w-full flex items-center" style={{ zIndex: 5, top: "80px", height: "calc(100vh - 80px)", padding: "40px 0" }}>
            
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/40 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" style={{ zIndex: 1 }}>

              {/* LEFT: Heading + Large Step Tracker */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-[#F5F3FF] border border-[#7C3AED]/15 rounded-full px-4 py-2 mb-5 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-[#7C3AED] text-[11px] font-black tracking-widest uppercase">
                    The Process Timeline
                  </span>
                </div>

                <h2 className="text-[#0B1F3A] text-[26px] sm:text-[34px] lg:text-[40px] font-extrabold leading-[1.05] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Four Steps To Refinance <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]">Your Home Loan</span>
                </h2>
                
                <p className="text-slate-500 text-[14.5px] leading-relaxed mb-8 max-w-md">
                  Scroll down to watch our step-by-step refinancing process unfold. We manage everything between your old bank and new lender.
                </p>

                {/* STEP TRACKER PROGRESS */}
                <div className="relative">
                  <div
                    className="absolute pointer-events-none"
                    style={{ left: "21px", top: "22px", bottom: "22px", width: "2px" }}
                  >
                    <div className="absolute inset-0 bg-[#E2E8F0]" />
                    <div
                      className="absolute top-0 left-0 w-full transition-all duration-500"
                      style={{
                        height: `${(activeStepIndex / 3) * 100}%`,
                        background: "linear-gradient(to bottom, #7C3AED, #10B981, #EC4899, #F59E0B)"
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    {roadmapSteps.map((step, idx) => {
                      const isActive = activeStepIndex === idx;
                      const isPast = activeStepIndex > idx;

                      const colors = [
                        { accent: "#7C3AED", lightBg: "#F5F3FF", border: "#DDD6FE" },
                        { accent: "#7C3AED", lightBg: "#F5F3FF", border: "#DDD6FE" },
                        { accent: "#7C3AED", lightBg: "#F5F3FF", border: "#DDD6FE" },
                        { accent: "#7C3AED", lightBg: "#F5F3FF", border: "#DDD6FE" }
                      ][idx];

                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3.5 py-2.5 px-3 rounded-xl transition-all duration-500"
                          style={{
                            background: isActive ? colors.lightBg : "transparent",
                            border: `1px solid ${isActive ? colors.border : "transparent"}`,
                            boxShadow: isActive ? "0 10px 25px -5px rgba(11,31,58,0.05)" : "none",
                            opacity: isActive || isPast ? 1 : 0.35,
                            transform: isActive ? "translateX(4px)" : "translateX(0)",
                          }}
                        >
                          <div
                            className="shrink-0 flex items-center justify-center rounded-xl transition-all duration-500"
                            style={{
                              width: "44px",
                              height: "44px",
                              background: isActive ? colors.accent : isPast ? colors.lightBg : "#F8FAFC",
                              border: `2px solid ${isActive ? colors.accent : isPast ? colors.border : "#E2E8F0"}`,
                              color: isActive ? "#ffffff" : isPast ? colors.accent : "#94A3B8",
                            }}
                          >
                            {/* Render step index inside instead of icon */}
                            <span className="text-[14px] font-black">{idx + 1}</span>
                          </div>

                          <div className="flex flex-col min-w-0 flex-1">
                            <span
                              className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                              style={{ color: isActive ? colors.accent : isPast ? colors.accent : "#94A3B8" }}
                            >
                              Step {idx + 1}
                            </span>
                            <span
                              className="text-[14px] leading-tight font-bold"
                              style={{
                                color: isActive ? "#0B1F3A" : isPast ? "#475569" : "#94A3B8",
                                fontFamily: "var(--font-montserrat), sans-serif",
                              }}
                            >
                              {step.title}
                            </span>
                            {isActive && (
                              <span className="text-[11.5px] text-slate-500 font-normal leading-tight mt-0.5">
                                {step.tagline}
                              </span>
                            )}
                          </div>

                          {isActive && (
                            <div
                              className="ml-auto shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ background: colors.accent }}
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          {isPast && !isActive && (
                            <div className="ml-auto shrink-0">
                              <CheckCircle2 style={{ width: "18px", height: "18px", color: colors.accent }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT: Animated Card Panel */}
              <div className="w-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStepIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_rgba(11,31,58,0.08)] flex flex-col"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="px-6 pt-5 pb-4" style={{ background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
                      <span
                        className="inline-block text-[9px] tracking-widest font-black uppercase px-2.5 py-1 rounded-full mb-2.5 border bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]"
                      >
                        {roadmapSteps[activeStepIndex].phase}
                      </span>
                      <h3
                        className="text-[20px] sm:text-[22px] font-extrabold text-[#0B1F3A] leading-snug mb-1.5"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        {roadmapSteps[activeStepIndex].title}
                      </h3>
                      <p className="text-slate-500 text-[12.5px] leading-relaxed">
                        {roadmapSteps[activeStepIndex].desc}
                      </p>
                    </div>

                    <div className="grid grid-cols-2">
                      {/* Highlights */}
                      <div className="px-5 py-4 border-r border-slate-100">
                        <h4 className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2.5">Highlights</h4>
                        <div className="space-y-2">
                          {roadmapSteps[activeStepIndex].highlightsRow.map((h, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-emerald-500 stroke-[3px]" />
                              </div>
                              <span className="text-[#0B1F3A] text-[12px] font-semibold leading-tight">{h.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Evaluates */}
                      <div className="px-5 py-4">
                        <h4 className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2.5">We Evaluate</h4>
                        <div className="space-y-2">
                          {roadmapSteps[activeStepIndex].evaluate.map((ev, i) => {
                            const EvalIcon = ev.icon;
                            return (
                              <div key={i} className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-lg ${ev.color} flex items-center justify-center shrink-0`}>
                                  <EvalIcon className="w-3 h-3" />
                                </div>
                                <span className="text-[#0B1F3A] text-[12px] font-semibold leading-tight">{ev.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Image visual strip */}
                    <div className="relative h-44 md:h-48 w-full overflow-hidden" style={{ borderTop: "1px solid #F1F5F9" }}>
                      <Image
                        src={roadmapSteps[activeStepIndex].img}
                        alt={roadmapSteps[activeStepIndex].title}
                        fill
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-md">
                        <div className="w-6 h-6 rounded-full bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED]">
                          <HomeIcon className="w-3 h-3" />
                        </div>
                        <span className="text-[#0B1F3A] text-[10.5px] font-bold">{roadmapSteps[activeStepIndex].floatingText}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* MOBILE VERSION: VERTICAL ROADMAP ACCORDION */}
        <section className="lg:hidden py-14 px-6 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden">
          <div className="max-w-md mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#F5F3FF] border border-[#7C3AED]/15 rounded-full px-3.5 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span className="text-[#7C3AED] text-[9.5px] font-black tracking-widest uppercase">
                The Process Timeline
              </span>
            </div>

            <h2 className="text-[#0B1F3A] text-[22px] font-extrabold leading-tight mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Four Steps To Refinance <span className="text-[#7C3AED]">Your Loan</span>
            </h2>
            
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Tap each step to view the processing actions, highlights, and guidelines.
            </p>

            <div className="space-y-3">
              {roadmapSteps.map((step, idx) => {
                const isMobileActive = mobileActiveStepIndex === idx;
                const colors = [
                  { accent: "#7C3AED", lightBg: "#F5F3FF", border: "#DDD6FE" },
                  { accent: "#7C3AED", lightBg: "#F5F3FF", border: "#DDD6FE" },
                  { accent: "#7C3AED", lightBg: "#F5F3FF", border: "#DDD6FE" },
                  { accent: "#7C3AED", lightBg: "#F5F3FF", border: "#DDD6FE" }
                ][idx];

                return (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => setMobileActiveStepIndex(idx)}
                      className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-slate-50 focus:outline-none"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-black text-sm"
                        style={{
                          background: isMobileActive ? colors.accent : colors.lightBg,
                          border: `1.5px solid ${isMobileActive ? colors.accent : colors.border}`,
                          color: isMobileActive ? "#ffffff" : colors.accent
                        }}
                      >
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[8.5px] font-black uppercase tracking-wider block mb-0.5" style={{ color: colors.accent }}>
                          Step {idx + 1} • {step.phase}
                        </span>
                        <h3 className="text-slate-800 text-[13.5px] font-bold leading-none">{step.title}</h3>
                      </div>

                      <div className={`transition-transform duration-300 ${isMobileActive ? "rotate-90 text-[#7C3AED]" : "rotate-0 text-slate-400"}`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>

                    {isMobileActive && (
                      <div className="border-t border-slate-100 bg-slate-50/30">
                        <div className="p-4 space-y-4">
                          <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Highlights</span>
                              <div className="space-y-1.5">
                                {step.highlightsRow.map((h, i) => (
                                  <div key={i} className="flex items-center gap-1.5">
                                    <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                    <span className="text-slate-700 text-[10.5px] font-semibold truncate leading-none">{h.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">We Evaluate</span>
                              <div className="space-y-1.5">
                                {step.evaluate.map((ev, i) => {
                                  const EvalIcon = ev.icon;
                                  return (
                                    <div key={i} className="flex items-center gap-1.5">
                                      <div className={`w-3.5 h-3.5 rounded ${ev.color} flex items-center justify-center shrink-0`}>
                                        <EvalIcon className="w-2 h-2 text-current" />
                                      </div>
                                      <span className="text-slate-700 text-[10.5px] font-semibold truncate leading-none">{ev.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ── SECTION 7: COSTS OF REFINANCING ── */}
      <section id="costs" className="py-14 md:py-20 bg-slate-50 border-b border-slate-100 relative">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#0B1F3A 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-[#7C3AED]/15 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[#7C3AED] text-[10px] font-bold tracking-widest uppercase">Upfront Costs</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              What Does It Cost To Refinance?
            </h2>
            <p className="text-slate-500 text-[14px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
              Refinancing can come with some setup and settlement costs. We work with you to work out the total costs upfront and compare them against your repayments savings to make sure it is a profitable move.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {costsBreakdown.map((cost, idx) => (
              <div
                key={idx}
                className={`rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  cost.highlight
                    ? "bg-gradient-to-b from-[#7C3AED] to-[#5B21B6] text-white shadow-lg lg:-mt-4 lg:mb-4 ring-4 ring-purple-500/10 z-10"
                    : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md shadow-sm"
                }`}
              >
                {cost.highlight && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                )}

                <div className="relative z-10">
                  <span className={`text-[10.5px] font-black uppercase tracking-[0.15em] block mb-3 ${cost.highlight ? 'text-purple-200' : 'text-slate-400'}`}>
                    {cost.title}
                  </span>
                  <div className={`text-[22px] sm:text-[25px] font-black mb-3 leading-none ${cost.highlight ? 'text-white' : 'text-[#0B1F3A]'}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    {cost.amount}
                  </div>
                  <span className={`inline-block text-[9.5px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-6 ${
                    cost.highlight 
                      ? "bg-white/20 text-white backdrop-blur-sm border border-white/20" 
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                    {cost.tag}
                  </span>
                  <p className={`text-[13px] leading-relaxed ${cost.highlight ? 'text-purple-50' : 'text-slate-500'}`}>
                    {cost.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 8: COMMON MISTAKES TO AVOID ── */}
      <section id="mistakes" className="py-16 md:py-20 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#F5F3FF] border border-[#7C3AED]/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#7C3AED]">Broker Insights</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-extrabold leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Common Refinancing Mistakes To Avoid
            </h2>
            <p className="text-slate-500 text-[14.5px] leading-relaxed max-w-xl mx-auto">
              Refinancing can save you thousands – but only if you avoid these common traps. We help you look at the full picture, not just the advertised interest rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {commonMistakes.map((mistake, idx) => {
              const Icon = mistake.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-100 hover:border-[#7C3AED]/35 rounded-3xl p-6.5 flex gap-4.5 text-left transition-all duration-300"
                >
                  <div className={`w-11 h-11 rounded-2xl ${mistake.color} flex items-center justify-center shrink-0 shadow-sm border`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0B1F3A] text-[15.5px] font-extrabold mb-1.5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {mistake.title}
                    </h3>
                    <p className="text-slate-500 text-[13.5px] leading-relaxed">
                      {mistake.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 9: CLIENT TESTIMONIALS (DYNAMIC) ── */}
      <TestimonialSection
        badgeText="Client Stories"
        titleText={<>Loved By Hundreds of <span className="text-[#7C3AED]">Refinance Clients</span></>}
        subtitleText="Read how we have helped Australian homeowners save thousands of dollars in interest repayments and fees."
        backgroundClass="bg-slate-50"
      />

      {/* ── SECTION 10: INTERACTIVE REFINANCE READINESS CHECKLIST ── */}
      <section className="py-14 md:py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5F3FF] rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F5F3FF] shadow-sm border border-[#7C3AED]/15 rounded-full px-4 py-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-[#7C3AED] text-[10px] font-bold tracking-widest uppercase">Readiness Audit</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Refinance Readiness <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]">Checklist</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-lg">
                Are you financially ready to switch lenders and secure a better deal? Tap the checklist options below to assess your current refinancing readiness.
              </p>
              
              {/* Progress Card */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 max-w-sm shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 28}`} strokeDashoffset={`${2 * Math.PI * 28 * (1 - checklistProgress / 100)}`} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-[#7C3AED]">{checklistProgress}%</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-extrabold text-[#0B1F3A]">Readiness score</div>
                    <div className="text-[12.5px] text-slate-500 mt-1">{checklist.filter(i => i.checked).length} of {checklist.length} audit steps checked</div>
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
                      ? "bg-[#F5F3FF] border-[#7C3AED]/30 shadow-[0_4px_20px_rgba(124,58,237,0.06)]"
                      : "bg-white border-slate-200 hover:border-[#7C3AED]/30 shadow-sm"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                    item.checked ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-sm" : "border-slate-300 bg-white"
                  }`}>
                    {item.checked && <Check className="w-4 h-4" strokeWidth={3} />}
                  </div>
                  <span className={`text-[13.5px] font-semibold flex-1 text-left ${
                    item.checked ? "text-[#7C3AED] line-through decoration-purple-200" : "text-slate-700"
                  }`}>{item.label}</span>
                  <div className={`text-[11px] font-black px-2 py-1 rounded-full shrink-0 ${
                    item.checked ? "bg-[#7C3AED]/15 text-[#7C3AED]" : "bg-slate-100 text-slate-400"
                  }`}>{String(i+1).padStart(2,'0')}</div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 11: FAQs ACCORDION ── */}
      <section id="faqs" className="py-14 md:py-20 bg-slate-50 border-b border-slate-100 relative">
        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#F5F3FF] border border-[#7C3AED]/20 rounded-full px-4 py-2 mb-4 mx-auto">
              <HelpCircle className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#7C3AED]">FAQs</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Frequently Asked Queries
            </h2>
            
            {/* Category tabs */}
            <div className="flex justify-center gap-2 mt-4 bg-white rounded-2xl p-2 border border-slate-200 w-fit mx-auto shadow-sm">
              {[
                { key: "refinance", label: "Refinancing FAQs" },
                { key: "buying", label: "First Home Buyer FAQs" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveFaqTab(tab.key as "refinance" | "buying"); setOpenFaq(0); }}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                    activeFaqTab === tab.key
                      ? "bg-[#7C3AED] text-white shadow-sm"
                      : "text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {faqGroupData[activeFaqTab].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#7C3AED]/35 bg-white shadow-[0_4px_20px_rgba(124,58,237,0.06)]" : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                }`}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none">
                    <span className={`text-[14.5px] sm:text-[15px] font-bold transition-colors ${isOpen ? "text-[#7C3AED]" : "text-[#0B1F3A]"}`}>{faq.q}</span>
                    <div className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                      isOpen ? "border-[#7C3AED]/30 bg-[#F5F3FF] text-[#7C3AED]" : "border-slate-200 text-slate-400"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[13.5px] text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 12: RESOURCE HUB GUIDES & DYNAMIC BLOGS ── */}
      <BlogSection
        badgeText="Client Stories & Guides"
        titlePart1="Refinance Insights"
        titlePart2="& Success Stories"
        subtitleText="Learn how refinancing works, see real client outcomes, and get expert tips to lower your home loan costs."
        accentColor="#7C3AED"
        accentTextClass="text-[#7C3AED]"
        accentBgClass="bg-[#7C3AED]"
        darkTheme={true}
      />

      {/* ── SECTION 13: ENQUIRY CALLBACK FORM ── */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-6 left-6 w-32 h-32 opacity-10" style={{ backgroundImage: "radial-gradient(#7C3AED 1px, transparent 1px)", backgroundSize: "8px 8px" }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            
            {/* Left Texts */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-[#F5F3FF] border border-[#7C3AED]/15 rounded-full px-3.5 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span className="text-[#7C3AED] text-[10px] font-bold tracking-widest uppercase">
                  CALLBACK AUDIT
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Request a <span className="text-[#7C3AED]">Savings Callback</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed mb-6">
                Fill out your details below and a senior finance expert will contact you within 2 business hours. We&apos;ll look at your current rates, calculate genuine potential savings, and identify banks offering cash back deals.
              </p>
              <div className="space-y-4">
                {[
                  "No pressure or sales tactics guaranteed",
                  "Detailed comparison report of 40+ lenders",
                  "Identify setup and break costs upfront"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center text-[12.5px] sm:text-[13px] font-semibold text-slate-700">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#7C3AED] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
                <div className="absolute top-6 right-6 w-20 h-20 opacity-15" style={{ backgroundImage: "radial-gradient(#7C3AED 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />

                {!callbackSubmitted ? (
                  <>
                    <h3 className="text-[#0B1F3A] text-[17px] font-extrabold mb-6 relative z-10 text-left" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Get Your Free Refinance Savings Audit
                    </h3>
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const payload = {
                          type: 'refinance',
                          name: `${formData.get('name')} ${formData.get('surname')}`,
                          phone: formData.get('phone'),
                          email: formData.get('email'),
                          message: formData.get('message'),
                          savings: String(loanBalance),
                          income: String(annualSavings)
                        };
                        
                        try {
                          await fetch('/api/enquiry', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                          });
                        } catch (error) {
                          console.error('Failed to submit callback enquiry:', error);
                        }

                        setCallbackSubmitted(true);
                      }} 
                      className="space-y-5 relative z-10 text-left"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">First Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="John"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Surname Name</label>
                          <input
                            type="text"
                            name="surname"
                            placeholder="Doe"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="john@example.com.au"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="0450 000 000"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Your Message / Current Interest Rate</label>
                        <textarea
                          name="message"
                          placeholder="e.g. Currently on 6.45% variable with CBA. Looking to consolidate my credit card and get a better rate."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner h-24"
                        />
                      </div>

                      {/* Disclaimer Checkbox */}
                      <div className="flex items-start gap-2.5 pt-1.5">
                        <input
                          type="checkbox"
                          required
                          defaultChecked
                          className="mt-0.5 rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED]"
                        />
                        <span className="text-[10px] leading-relaxed text-slate-500 font-medium">
                          By clicking &lsquo;Submit Enquiry&rsquo;, you agree to our Privacy Collection Notice and consent to being contacted by one of Mortgage Xpert&apos;s brokers.
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-[13.5px] py-4 transition-all cursor-pointer shadow-md shadow-purple-100"
                      >
                        Submit Enquiry <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="py-6 text-center space-y-5 relative z-10">
                    <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                    
                    <div className="space-y-2">
                      <h4 className="text-[#0B1F3A] text-[22px] font-extrabold tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        Thank You!
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-medium">
                        Your refinancing savings request has been submitted. Home Loan Expert <strong className="font-bold text-[#0B1F3A]">Aakash KC</strong> will call you back within 2 business hours.
                      </p>
                    </div>

                    {/* Aakash Bio Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 text-left shadow-sm max-w-md mx-auto space-y-4">
                      <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-slate-100 shrink-0">
                          <Image src="/images/aakash_new.png" fill alt="Aakash KC" className="object-cover object-top" />
                        </div>
                        <div>
                          <div className="text-[14px] font-extrabold text-[#0B1F3A]">Aakash KC</div>
                          <div className="text-[11px] text-[#7C3AED] font-bold">Principal Home Loan Expert</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">About Aakash</span>
                        <p className="text-slate-600 text-[11.5px] leading-relaxed italic">
                          &ldquo;Aakash founded Mortgage Xperts to support the community in Australia with professional, transparent home loan advice. Having helped over 500+ families refinance and secure rates, he is dedicated to maximizing your financial freedom.&rdquo;
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/mortgage-mate"
                          className="w-full text-center bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-[11.5px] font-black uppercase py-3 rounded-xl transition-all block"
                        >
                          Check Full Profile & Reviews
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 14: FREE STRATEGY CALL BANNER ── */}
      <section className="relative overflow-hidden py-14 md:py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1E1145] to-[#0B1F3A]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[700px] h-[700px] bg-[#7C3AED]/20 rounded-full blur-[120px] opacity-70" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] bg-[#C084FC]/15 rounded-full blur-[120px] opacity-50" />
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <HomeIcon className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-purple-300">Free Strategy Call</span>
          </div>
          <h2 className="text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Ready to Unlock Better Interest Rates <br />
            and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-violet-400">Save Annually?</span>
          </h2>
          <p className="text-white/75 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
            Book a free, 100% obligation-free refinancing strategy audit. We&apos;ll outline your interest savings, exit fees, and find cash back offers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button type="button" onClick={openModal} className="cursor-pointer border-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#4C1D95] px-10 py-4.5 text-[15px] font-extrabold text-white transition-all duration-300 shadow-lg hover:scale-[1.02] whitespace-nowrap">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:0450240757" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-10 py-4 text-[15px] font-extrabold text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300 whitespace-nowrap">
              Speak With An Expert
            </a>
          </div>
        </div>
      </section>

      {/* Safety space */}
      <div className="h-10" />

      {/* ── FOOTER ── */}
      <SiteFooter settings={settings} />

      {/* ── LEAD FUNNEL MODAL (CALCULATOR CTA ACTIONS) ── */}
      <AnimatePresence>
        {isLeadModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLeadModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-[480px] overflow-hidden z-10 flex flex-col text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors z-20 focus:outline-none"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED] shrink-0">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#0B1F3A] text-[16px] font-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Refinance Savings Audit Report
                  </h3>
                  <span className="text-[11.5px] text-slate-500 font-medium">
                    Est. Monthly Savings: <strong className="text-[#7C3AED] font-bold">${Math.round(monthlySavings).toLocaleString()}</strong>
                  </span>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6">
                {!leadSubmitted ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!leadName || !leadEmail || !leadPhone) return;
                      
                      try {
                        await fetch('/api/enquiry', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            type: 'refinance-calculator',
                            name: leadName,
                            email: leadEmail,
                            phone: leadPhone,
                            savings: String(loanBalance),
                            income: String(annualSavings)
                          })
                        });
                      } catch (error) {
                        console.error('Failed to submit calculator lead:', error);
                      }
                      
                      setLeadSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="john@example.com.au"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="0450 000 000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    {/* Checkbox agreement */}
                    <div className="flex items-start gap-2.5 pt-1.5">
                      <input
                        type="checkbox"
                        required
                        defaultChecked
                        className="mt-0.5 rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED]"
                      />
                      <span className="text-[10px] leading-relaxed text-slate-500 font-medium">
                        I agree to receive my customized interest savings report. I understand this does not impact my credit score.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-[13.5px] py-4 transition-all cursor-pointer shadow-md shadow-purple-100 mt-4"
                    >
                      <span>Unlock Audit Report</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </form>
                ) : showFullReport ? (
                  <div className="py-2 text-left space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
                      <div>
                        <h4 className="text-[#0B1F3A] text-[15px] font-black uppercase tracking-tight font-montserrat">
                          Savings Assessment Audit
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Prepared for: <span className="font-bold text-slate-600">{leadName}</span>
                        </p>
                      </div>
                      <span className="text-[9px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 rounded px-2 py-0.5">
                        Generated
                      </span>
                    </div>

                    {/* Numbers Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Savings</span>
                        <span className="text-[#7C3AED] text-[18px] sm:text-[20px] font-black tracking-tight block">
                          ${Math.round(monthlySavings).toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">5-Year Net Saved</span>
                        <span className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black tracking-tight block">
                          ${Math.round(fiveYearSavings).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-[11px] bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-slate-600">
                      <div className="font-extrabold text-[9.5px] uppercase text-slate-400 mb-1">Calculations Summary</div>
                      <div>Loan Balance: <strong className="text-slate-800">${loanBalance.toLocaleString()}</strong></div>
                      <div>Current Rate: <strong className="text-slate-800">{currentRate}% p.a.</strong></div>
                      <div>New Target Rate: <strong className="text-slate-800">{newRate}% p.a.</strong></div>
                      <div>Loan Term: <strong className="text-slate-800">{remainingTerm} Years</strong></div>
                      <div>Switching Costs: <strong className="text-slate-800">${switchCosts.toLocaleString()}</strong></div>
                      <div>Break-Even: <strong className="text-slate-800">{breakEvenMonths} Months</strong></div>
                    </div>

                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-3.5 space-y-1">
                      <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#7C3AED]">Broker Recommendations</div>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed font-medium">
                        Based on your current rate of <strong className="text-slate-800">{currentRate}%</strong> and target rate of <strong className="text-slate-800">{newRate}%</strong>, you can save <strong className="text-emerald-600 font-bold">${Math.round(annualSavings).toLocaleString()}</strong> annually. We recommend validating this with Aakash to identify banks currently offering cashback rebates ($2,000+) to offset switching costs entirely.
                      </p>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="flex-1 text-center border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10.5px] font-black uppercase py-2.5 rounded-xl transition-all"
                      >
                        Print Report
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFullReport(false)}
                        className="flex-1 text-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10.5px] font-black uppercase py-2.5 rounded-xl transition-all"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-5 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 mx-auto shadow-sm">
                      <Check className="w-6 h-6 stroke-[3px]" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h4 className="text-[#0B1F3A] text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        Audit Report Prepared!
                      </h4>
                      <p className="text-slate-600 text-[12.5px] leading-relaxed max-w-sm mx-auto">
                        Your custom refinance savings assessment has been calculated and sent to <strong className="text-[#0B1F3A] font-semibold">{leadEmail}</strong>.
                      </p>
                      <p className="text-slate-500 text-[12px] leading-relaxed max-w-sm mx-auto">
                        Principal expert <strong className="font-bold text-[#0B1F3A]">Aakash KC</strong> will contact you shortly on <strong className="text-slate-800 font-bold">{leadPhone}</strong> to review interest rate products and cash back details.
                      </p>
                    </div>

                    {/* Aakash Bio Card */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200/50 p-4 text-left shadow-sm max-w-sm mx-auto space-y-3.5">
                      <div className="flex items-center gap-3 pb-2.5 border-b border-slate-200/60">
                        <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-slate-200/40 shrink-0">
                          <Image src="/images/aakash_new.png" fill alt="Aakash KC" className="object-cover object-top" />
                        </div>
                        <div>
                          <div className="text-[13px] font-extrabold text-[#0B1F3A]">Aakash KC</div>
                          <div className="text-[10px] text-[#7C3AED] font-bold">Principal Home Loan Expert</div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-400 block">About Aakash</span>
                        <p className="text-slate-600 text-[11px] leading-relaxed italic">
                          &ldquo;Aakash KC is the founder of Mortgage Xperts. He guides the Nepalese community in Australia to find tailored lending structures, negotiate lower interest rates, and skip LMI fees.&rdquo;
                        </p>
                      </div>

                      <div className="pt-1.5 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowFullReport(true)}
                          className="flex-1 text-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10.5px] font-black uppercase py-2.5 rounded-xl transition-all"
                        >
                          View Report
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsLeadModalOpen(false);
                            setTimeout(() => {
                              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }}
                          className="flex-1 text-center border border-slate-200 hover:bg-slate-55 text-slate-700 text-[10.5px] font-bold uppercase py-2.5 rounded-xl transition-all"
                        >
                          Request Callback
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
