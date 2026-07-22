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
import { RoadmapSection } from "../components/RoadmapSection";
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
  const badgeText = pageHeroSettings?.hero_badge || "Strategic Property Investment";
  const titleText = pageHeroSettings?.hero_title || "Investing in Property";
  const subtextText = pageHeroSettings?.hero_subtext || "Property investment can be a powerful way to build long-term wealth, but it’s not something you should rush into without a plan. As your mortgage broker, I’ll help you understand the market, review your financial position, and find the right strategy for your goals.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/hero_slide_3_yellow.png";
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Strategy Consultation";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#contact";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Try Yield Calculator";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "#calculator-section";

  // ── STATE VARIABLES FOR INTERACTIVE UX ──
  const [activeNav, setActiveNav] = useState("overview");
  const [navSticky, setNavSticky] = useState(false);
  const navSentinelRef = useRef<HTMLDivElement>(null);

  // Dynamic Scroll Progress state for Roadmap Steps
  
  
  

  // Rental Yield & Cash Flow Calculator State
  const [purchasePrice, setPurchasePrice] = useState(750000);
  const [lvr, setLvr] = useState(80);
  const [interestRate, setInterestRate] = useState(6.19);
  const [weeklyRent, setWeeklyRent] = useState(680);
  const [annualExpenses, setAnnualExpenses] = useState(4500);
  const [repaymentType, setRepaymentType] = useState<"IO" | "PI">("IO");
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
    { id: 1, label: "You have usable equity in an existing property or a 10-20% cash deposit saved", checked: true },
    { id: 2, label: "Stable employment history and verifiable income for the past 12-24 months", checked: true },
    { id: 3, label: "A healthy credit rating with no recent defaults or missed payments", checked: false },
    { id: 4, label: "Clear investment goal in mind (e.g. high cash flow vs long-term capital growth)", checked: false },
    { id: 5, label: "Budgeted buffer funds set aside for vacancy periods, property repairs, and interest rate changes", checked: false }
  ]);

  const toggleChecklist = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };
  const checklistProgress = Math.round((checklist.filter(item => item.checked).length / checklist.length) * 100);

  // FAQs Accordion State
  const [activeFaqTab, setActiveFaqTab] = useState<"investing" | "loans">("investing");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ── CALCULATIONS ──
  const loanAmount = Math.round(purchasePrice * (lvr / 100));
  const depositRequired = Math.max(0, purchasePrice - loanAmount);
  
  // Monthly repayment calculation
  const r = (interestRate / 100) / 12;
  const n = 30 * 12; // 30 years standard
  const monthlyRepayment = repaymentType === "IO" 
    ? (loanAmount * r) 
    : (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1) || 0;

  const annualRentalIncome = weeklyRent * 52;
  const annualRepayments = monthlyRepayment * 12;
  const annualTotalOutgoings = annualRepayments + annualExpenses;
  
  const annualNetCashFlow = annualRentalIncome - annualTotalOutgoings;
  const monthlyNetCashFlow = annualNetCashFlow / 12;
  
  const grossYield = (annualRentalIncome / purchasePrice) * 100;
  const netYield = ((annualRentalIncome - annualExpenses) / purchasePrice) * 100;

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
      "why-invest",
      "roadmap",
      "calculator-section",
      "property-types",
      "tax-benefits",
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

  const whyInvestCards = [
    {
      title: "Capital Growth",
      desc: "Historically, property values in major Australian cities have experienced strong long-term capital growth, helping build significant equity.",
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-700 border-amber-100"
    },
    {
      title: "Rental Income",
      desc: "Tenants provide a regular cash flow stream, helping you offset interest costs and make regular mortgage repayments.",
      icon: Coins,
      color: "bg-blue-50 text-blue-700 border-blue-100"
    },
    {
      title: "Tax Benefits",
      desc: "Access negative gearing advantages, offset expenses against your income, and claim building depreciation to lower your tax liability.",
      icon: Percent,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      title: "Leverage Equity",
      desc: "Use the equity generated by your own home or existing portfolio as a deposit to purchase further investments without cash.",
      icon: HomeIcon,
      color: "bg-purple-50 text-purple-700 border-purple-100"
    }
  ];

  const propertyTypes = [
    {
      title: "Houses",
      pros: ["Higher capital growth potential", "No body corporate / strata fees", "Land value appreciation"],
      cons: ["Higher purchase price", "More maintenance responsibility", "Lower rental yield average"],
      icon: HomeIcon,
      accent: "border-amber-200 bg-amber-50/20 text-amber-700"
    },
    {
      title: "Apartments / Units",
      pros: ["Affordable entry-level price", "Strong rental demand", "Lower external maintenance costs"],
      cons: ["Strata/Body Corporate levies", "Limited renovation control", "Slower capital growth than houses"],
      icon: Users,
      accent: "border-blue-200 bg-blue-50/20 text-blue-700"
    },
    {
      title: "Townhouses",
      pros: ["Balance of space and affordability", "Moderate capital growth", "Appealing to families & renters"],
      cons: ["Some strata management costs", "Smaller outdoor land sizes", "Moderate purchase budgets required"],
      icon: Landmark,
      accent: "border-emerald-200 bg-emerald-50/20 text-emerald-700"
    },
    {
      title: "New Builds vs Established",
      pros: ["Maximised tax depreciation benefits", "Government grants & developer warranties", "Lower immediate repair costs"],
      cons: ["Premium pricing upfront", "Risk of construction delays", "Often located in developing suburbs"],
      icon: ShieldCheck,
      accent: "border-purple-200 bg-purple-50/20 text-purple-700"
    }
  ];

  const taxBenefits = [
    {
      title: "Tax Deductions for Investment Properties",
      desc: "Most expenses related to running your investment property, including loan interest, management fees, council rates, insurance, and maintenance, can be claimed as tax deductions."
    },
    {
      title: "No Deduction for Owner-Occupied Homes",
      desc: "Unlike investment loans, the interest paid on owner-occupied residential home loans cannot be claimed as tax deductions, although it provides absolute lifestyle stability."
    },
    {
      title: "Capital Gains Tax (CGT) Discounts",
      desc: "When you sell an investment property, you are subject to CGT on the profit. However, if you hold the property for more than 12 months, you qualify for a substantial 50% CGT discount."
    },
    {
      title: "Negative Gearing Advantage",
      desc: "If your total property outgoings (interest + expenses) exceed your rental income, you make a taxable loss. This loss can offset your personal taxable income, lowering your overall tax bill."
    },
    {
      title: "Record Keeping & Compliance",
      desc: "It is crucial to preserve all tax receipts, property agent annual statements, and utility bills. A Quantity Surveyor depreciation schedule helps claim thousands extra annually."
    }
  ];

  

  const faqGroupData = {
    investing: [
      {
        q: "How much deposit do I need to buy an investment property?",
        a: "Typically, lenders require a deposit of 10% to 20% of the property's purchase price. While you can secure investment finance with a smaller 10% deposit, borrowing above 80% LVR triggers Lenders Mortgage Insurance (LMI), which increases costs. Having a 20% deposit avoids LMI and unlocks competitive rates. You can often fund this deposit entirely using the equity in your current home."
      },
      {
        q: "What is the difference between positive and negative gearing?",
        a: "A property is negatively geared when the rental income is lower than the costs of holding the property (mortgage interest, rates, insurance, maintenance). This loss can offset your taxable salary income to reduce tax. A property is positively geared when the rent exceeds your total outgoings, providing direct cash flow income, which is taxable."
      },
      {
        q: "Can I use the equity in my current home as a deposit?",
        a: "Absolutely! This is the most common way homeowners expand their portfolios. If your current home has increased in value and your mortgage has decreased, we can refinance your existing loan to release equity. This equity acts as the deposit and covers buying costs (like stamp duty) for the investment, meaning you don't need cash."
      }
    ],
    loans: [
      {
        q: "Are investment loan interest rates higher than owner-occupied rates?",
        a: "Yes, investment interest rates are generally 0.25% to 0.75% higher than owner-occupied rates. Lenders view investment loans as slightly higher risk. However, the interest charged on an investment property loan is usually 100% tax-deductible, helping to offset the higher rate."
      },
      {
        q: "Should I choose an Interest-Only or Principal & Interest repayment loan?",
        a: "Many property investors choose Interest-Only repayments. This keeps the monthly outgoings lower, maximizing cash flow and tax deductions, since only interest is tax-deductible. If your goal is to pay down debt and build equity, a Principal & Interest structure is preferred. We will help structure this based on your tax position."
      },
      {
        q: "What purchase fees should I budget for besides the deposit?",
        a: "You need to account for stamp duty (usually 3.5% to 5% of purchase price depending on the state), legal conveyancing fees ($1,200 - $2,500), pest/building inspections ($500 - $800), loan setup fees ($0 - $600), and landlord insurance ($1,000 - $1,500 annually)."
      }
    ]
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: HomeIcon },
    { id: "why-invest", label: "Why Invest", icon: Coins },
    { id: "roadmap", label: "Roadmap", icon: Calendar },
    { id: "calculator-section", label: "Yield Calculator", icon: Calculator },
    { id: "property-types", label: "Property Types", icon: Landmark },
    { id: "tax-benefits", label: "Tax Benefits", icon: Percent },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "contact", label: "Enquire", icon: Clock }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none">
      
      {/* ── HEADER ── */}
      <SiteHeader isSticky={false} settings={settings} />

      {/* ── HERO SECTION ── */}
      <section id="overview" className="relative overflow-hidden bg-white pt-2.5 pb-8 lg:pt-[10px] lg:pb-8 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
        {/* Subtle dot-matrix and glow decorations */}
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D97706 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-amber-50 opacity-40 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 85% 90% at 62% 52%, #FEF9C3 0%, #FEF3C7 42%, #FFFBEB 62%, transparent 82%)"
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
            <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
            <span className="text-slate-300 font-normal">&gt;</span>
            <span className="text-slate-400">Home Loans</span>
            <span className="text-slate-300 font-normal">&gt;</span>
            <span className="text-amber-700 font-bold">Property Investment</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN: Texts & Badges */}
            <motion.div initial="hidden" animate="visible" variants={premiumStagger} className="flex flex-col justify-center z-10">

              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-amber-50 border-amber-200/50 text-amber-800 w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className="w-14 h-[3px] bg-[#D97706] mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-5 max-w-xl">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #FEF9C3 0%, #FEF3C7 40%, #FFFBEB 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                <a
                  href={btn1Link}
                  onClick={(e) => handleBtnClick(e, btn1Text, btn1Link)}
                  className="inline-flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-amber-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap cursor-pointer"
                >
                  {btn1Text} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={btn2Link}
                  onClick={(e) => handleBtnClick(e, btn2Text, btn2Link)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#D97706] text-amber-700 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-[#D97706] hover:text-white text-center w-full sm:w-auto whitespace-nowrap cursor-pointer bg-transparent"
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
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5 text-amber-600" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {["Maximize Equity", "Tax Efficient", "40+ Prime Lenders"].map((item) => (
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
                        ? "bg-gradient-to-br from-amber-600 to-yellow-500 text-white shadow-[0_4px_12px_rgba(217,119,6,0.22)] font-bold"
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
                            ? "bg-gradient-to-br from-amber-600 to-yellow-500 text-white shadow-[0_4px_12px_rgba(217,119,6,0.22)] font-bold"
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
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">Overview</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Build Long-Term Wealth Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Property Investment</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                {pageSections?.[0] || pageContent || `Investing in property is one of the most effective ways for Australians to grow their wealth over time. When structured properly, a property portfolio provides double-sided growth: long-term asset value appreciation alongside consistent rental cash flows.`}
              </p>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                However, entering the market successfully requires a detailed lending strategy. Factors such as borrowing capacities, tax depreciation, gearing outcomes, and lender rate structures will determine your net return. At Mortgage Xperts, we specialize in building flexible debt structures tailored specifically for property investors.
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-amber-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Offset Account Setup</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-amber-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Interest-Only Loan Structuring</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-amber-700" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">Equity Release Options</span>
                </div>
              </div>
            </div>

            {/* Right Graphics */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-yellow-100 rounded-[32px] blur-2xl opacity-30 transform -rotate-3 scale-95" />
              <div className="relative bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(234,179,8,0.06)] space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-[13px] font-extrabold text-[#0B1F3A]">Portfolio Architecture</div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Strategic lending</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase">Lending Network</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#FFFDF6] border border-amber-100 rounded-2xl p-4.5">
                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Gross Yield Target</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[24px] font-black text-[#0B1F3A]">4.5% - 6.5%</span>
                      <span className="text-[11px] text-slate-400 font-bold">average returns</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5">
                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">depreciation deductions</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[24px] font-black text-slate-800">$10,000+</span>
                      <span className="text-[11px] text-slate-400 font-bold">claimable annually</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHY INVEST IN PROPERTY ── */}
      <section id="why-invest" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-4">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Investment Rationale</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Why Do Australians Choose <span className="text-[#CA8A04]">Property Investments</span>?
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              {pageSections?.[1] || `Unlike volatile shares, real estate is a tangible asset class providing double-value security: value growth along with rental income.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyInvestCards.map((card, idx) => {
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

          {/* Core Requirements checklist cards */}
          <div className="mt-14 bg-white border border-slate-200/60 rounded-[32px] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="lg:border-r border-slate-100 lg:pr-6">
              <div className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest mb-2">Requirement 01</div>
              <h4 className="text-[15px] font-extrabold text-[#0B1F3A] mb-2">Clear Financial Plan</h4>
              <p className="text-slate-400 text-[12.5px] leading-relaxed">Know how much you can borrow, the deposit required, and how repayments fit into your budget.</p>
            </div>
            <div className="lg:border-r border-slate-100 lg:px-6">
              <div className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest mb-2">Requirement 02</div>
              <h4 className="text-[15px] font-extrabold text-[#0B1F3A] mb-2">The Right Strategy</h4>
              <p className="text-slate-400 text-[12.5px] leading-relaxed">Decide whether your goal is long-term growth, short-term cash flow, or maximizing tax benefits.</p>
            </div>
            <div className="lg:border-r border-slate-100 lg:px-6">
              <div className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest mb-2">Requirement 03</div>
              <h4 className="text-[15px] font-extrabold text-[#0B1F3A] mb-2">Market Understanding</h4>
              <p className="text-slate-400 text-[12.5px] leading-relaxed">Location, demand, and property type all have a major impact on your returns.</p>
            </div>
            <div className="lg:pl-6">
              <div className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest mb-2">Requirement 04</div>
              <h4 className="text-[15px] font-extrabold text-[#0B1F3A] mb-2">Risk Management</h4>
              <p className="text-slate-400 text-[12.5px] leading-relaxed">Interest rate changes, vacancies, and maintenance costs can affect your cash flow.</p>
            </div>
          </div>

        </div>
      </section>

      <RoadmapSection colorTheme="amber" />

      <section id="calculator-section" className="py-16 md:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-50 rounded-full blur-[120px] opacity-30 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-4">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Financial Modeling</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Rental Yield &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Cash Flow Calculator</span>
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              {pageSections?.[3] || `Model your rental yields, deposits, interest repayments, and monthly cash flow to evaluate property feasibility.`}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-[24px] shadow-xl shadow-slate-100 overflow-hidden max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[54%_46%]">
            
            {/* Input fields */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-1">
                <span className="text-slate-900 text-xs font-black uppercase tracking-wider">1. Enter Property Assumptions</span>
                <span className="text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold uppercase">Inputs</span>
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
                  max={2500000}
                  step={10000}
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                  <span>$200,000</span>
                  <span>$2.5M</span>
                </div>
              </div>

              {/* LVR */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Loan-to-Value Ratio (LVR)</span>
                  <span className="text-slate-900 font-black text-[13px]">{lvr}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={95}
                  step={5}
                  value={lvr}
                  onChange={(e) => setLvr(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                  <span>20% (Low risk)</span>
                  <span>95% (High LMI)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Interest Rate */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400">Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="15"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full border border-slate-200 bg-slate-50 rounded-lg py-1.5 px-2.5 text-xs font-extrabold focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                {/* Weekly Rent */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400">Expected Weekly Rent ($)</label>
                  <input
                    type="number"
                    step="10"
                    min="100"
                    max="5000"
                    value={weeklyRent}
                    onChange={(e) => setWeeklyRent(Number(e.target.value))}
                    className="w-full border border-slate-200 bg-slate-50 rounded-lg py-1.5 px-2.5 text-xs font-extrabold focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Annual Expenses */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Annual Expenses (Rates, Ins, Mgmt, etc.)</span>
                  <span className="text-slate-900 font-black text-[13px]">${annualExpenses.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={100}
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                  <span>$1,000</span>
                  <span>$20,000</span>
                </div>
              </div>

              {/* Repayment Type Toggle */}
              <div className="space-y-1.5">
                <label className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400">Repayment Type</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-lg p-0.5 border border-slate-200/50">
                  <button
                    type="button"
                    onClick={() => setRepaymentType("IO")}
                    className={`py-1.5 px-2 text-[10.5px] font-black rounded-md transition-all ${
                      repaymentType === "IO" ? "bg-white text-amber-700 shadow-sm border border-slate-200/50" : "text-slate-400 hover:text-slate-800"
                    }`}
                  >
                    Interest Only (IO)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRepaymentType("PI")}
                    className={`py-1.5 px-2 text-[10.5px] font-black rounded-md transition-all ${
                      repaymentType === "PI" ? "bg-white text-amber-700 shadow-sm border border-slate-200/50" : "text-slate-400 hover:text-slate-800"
                    }`}
                  >
                    Principal &amp; Interest (P&amp;I)
                  </button>
                </div>
              </div>

            </div>

            {/* Output dashboard */}
            <div className="bg-slate-900 text-white p-4 sm:p-6 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider">2. Net Modeling</span>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    annualNetCashFlow >= 0 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}>
                    {annualNetCashFlow >= 0 ? "Positive Cashflow" : "Negatively Geared"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Yield Outputs */}
                  <div>
                    <div className="text-[9px] text-white/50 font-bold uppercase tracking-widest mb-0.5">Gross Rental Yield</div>
                    <div className="text-[22px] font-black text-amber-400">{grossYield.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-white/50 font-bold uppercase tracking-widest mb-0.5">Net Rental Yield</div>
                    <div className="text-[22px] font-black text-yellow-300">{netYield.toFixed(2)}%</div>
                  </div>
                </div>

                {/* Detailed Numbers */}
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-white/60 font-semibold">Estimated Loan Amount:</span>
                    <span className="text-white font-extrabold">${loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-white/60 font-semibold">Deposit Required ({100-lvr}%):</span>
                    <span className="text-white font-extrabold">${depositRequired.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-white/60 font-semibold">Monthly Repayments:</span>
                    <span className="text-amber-400 font-extrabold">${Math.round(monthlyRepayment).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-white/60 font-semibold">Annual Expenses:</span>
                    <span className="text-white font-extrabold">${annualExpenses.toLocaleString()}</span>
                  </div>
                  
                  {/* Net Cash Flow result box */}
                  <div className={`mt-3 rounded-xl p-3 border ${
                    annualNetCashFlow >= 0 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20"
                  }`}>
                    <div className="text-[9px] text-white/50 font-bold uppercase tracking-widest mb-0.5">
                      Estimated Cash Flow ({annualNetCashFlow >= 0 ? 'Surplus' : 'Deficit'})
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className={`text-[16px] font-black ${annualNetCashFlow >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {annualNetCashFlow >= 0 ? "+" : ""}${Math.round(monthlyNetCashFlow).toLocaleString()}<span className="text-[10px] font-normal text-white/60"> / mo</span>
                      </span>
                      <span className="text-[10px] text-white/60 font-semibold">
                        ${Math.round(annualNetCashFlow).toLocaleString()} / year
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-[12px] py-2.5 shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
                >
                  Request Full Yield Audit Report
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 4: TYPES OF INVESTMENT PROPERTIES ── */}
      <section id="property-types" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-4">
              <Landmark className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Property Categories</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Choosing the Right <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Property Type</span>
            </h2>
            <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              {pageSections?.[2] || `Not all investment assets perform similarly. Your choice depends directly on your borrowing capability and capital strategy.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {propertyTypes.map((type, idx) => {
              const IconComp = type.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/60 rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${type.accent}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-[#0B1F3A] text-[18px] font-extrabold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {type.title}
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="text-[10.5px] font-extrabold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                        <span>Key Advantages (Pros)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {type.pros.map((pro, pidx) => (
                          <li key={pidx} className="flex items-start gap-2 text-[12.5px] text-slate-500 font-semibold">
                            <span className="text-emerald-500 font-black mt-0.5">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-[10.5px] font-extrabold text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-rose-500" />
                        <span>Main Considerations (Cons)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {type.cons.map((con, cidx) => (
                          <li key={cidx} className="flex items-start gap-2 text-[12.5px] text-slate-400 font-medium">
                            <span className="text-rose-400 font-black mt-0.5">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 5: TAX IMPLICATIONS AND BENEFITS ── */}
      <section id="tax-benefits" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            
            {/* Left Texts */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-6">
                <Percent className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Tax Deductions</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Understanding the <span className="text-[#CA8A04]">Tax Rules &amp; Offsets</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-6">
                Lending structures have major tax effects. When you invest in real estate, the interest charged on the loan and the costs of running the property are typically deductible from your salary, reducing your yearly income tax bill.
              </p>
              <div className="bg-white border border-slate-200 rounded-[24px] p-5.5 space-y-4 shadow-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-extrabold text-[#0B1F3A]">Negative Gearing Benefit</h4>
                    <p className="text-slate-400 text-[12.5px] mt-0.5 leading-relaxed">
                      Offset property losses directly against your personal income to lower your overall tax assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right List */}
            <div className="space-y-4">
              {taxBenefits.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5 mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 text-[11px] font-black flex items-center justify-center shrink-0 border border-amber-100">
                      {idx + 1}
                    </span>
                    <h3 className="text-[#0B1F3A] text-[14.5px] font-extrabold">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-[12.5px] leading-relaxed pl-9">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: RENTAL YIELD & CASH FLOW CALCULATOR ── */}
      

      {/* ── SECTION 7: ROADMAP STEPS ── */}
      

      {/* ── SECTION 8: CLIENT READINESS CHECKS ── */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-50/30 rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">Readiness Audit</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Property Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Readiness Audit</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-lg">
                {pageSections?.[4] || `Are you financially positioned to start building or expanding your property portfolio? Review the requirements below and assess your current investment readiness.`}
              </p>
              
              {/* Progress Card */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 max-w-sm shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 28}`} strokeDashoffset={`${2 * Math.PI * 28 * (1 - checklistProgress / 100)}`} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-amber-700">{checklistProgress}%</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-extrabold text-[#0B1F3A]">Readiness Score</div>
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
                      ? "bg-amber-50/30 border-amber-250/30 shadow-[0_4px_20px_rgba(234,179,8,0.03)]"
                      : "bg-white border-slate-200 hover:border-amber-500/30 shadow-sm"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                    item.checked ? "bg-amber-600 border-amber-600 text-white shadow-sm" : "border-slate-300 bg-white"
                  }`}>
                    {item.checked && <Check className="w-4 h-4" strokeWidth={3} />}
                  </div>
                  <span className={`text-[13.5px] font-semibold flex-1 text-left ${
                    item.checked ? "text-amber-800 line-through decoration-amber-200" : "text-slate-700"
                  }`}>{item.label}</span>
                  <div className={`text-[11px] font-black px-2 py-1 rounded-full shrink-0 ${
                    item.checked ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"
                  }`}>{String(i+1).padStart(2,'0')}</div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 9: CLIENT TESTIMONIALS (DYNAMIC) ── */}
      <TestimonialSection
        badgeText="Client Stories"
        titleText={<>Loved By Hundreds of <span className="text-[#CA8A04]">Property Investors</span></>}
        subtitleText="Read how we have helped property investors unlock equity, build portfolios, and secure optimized rates."
        backgroundClass="bg-slate-50"
      />

      {/* ── SECTION 10: FAQs ACCORDION ── */}
      <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-4 mx-auto">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">FAQs</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Frequently Asked Queries
            </h2>
            
            {/* Category tabs */}
            <div className="flex justify-center gap-2 mt-4 bg-white rounded-2xl p-2 border border-slate-200 w-fit mx-auto shadow-sm">
              {[
                { key: "investing", label: "Property Investment FAQs" },
                { key: "loans", label: "Investment Loan FAQs" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveFaqTab(tab.key as "investing" | "loans"); setOpenFaq(0); }}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                    activeFaqTab === tab.key
                      ? "bg-amber-600 text-white shadow-sm"
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
                  isOpen ? "border-amber-500/35 bg-white shadow-[0_4px_20px_rgba(234,179,8,0.03)]" : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                }`}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none">
                    <span className={`text-[14.5px] sm:text-[15px] font-bold transition-colors ${isOpen ? "text-amber-700" : "text-[#0B1F3A]"}`}>{faq.q}</span>
                    <div className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                      isOpen ? "border-amber-500/30 bg-amber-50 text-amber-600" : "border-slate-200 text-slate-400"
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

      {/* ── SECTION 11: RESOURCE HUB GUIDES & DYNAMIC BLOGS ── */}
      <BlogSection
        badgeText="Property Guides & Insights"
        titlePart1="Property Investment"
        titlePart2="Tips & Industry News"
        subtitleText="Learn gearing models, stamp duty guidelines, equity strategies, and market timing tips from our dynamic property blog."
        accentColor="#D97706"
        accentTextClass="text-amber-600"
        accentBgClass="bg-amber-600"
        darkTheme={true}
      />

      {/* ── SECTION 12: ENQUIRY CALLBACK FORM ── */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-6 left-6 w-32 h-32 opacity-10" style={{ backgroundImage: "radial-gradient(#CA8A04 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
        <div className="absolute bottom-6 right-6 w-32 h-32 opacity-10" style={{ backgroundImage: "radial-gradient(#CA8A04 1px, transparent 1px)", backgroundSize: "8px 8px" }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
            
            {/* Text description */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-2">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">Quick Response</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Request an Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Strategy Session</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                {pageSections?.[5] || `Connect with our brokers to review your borrowing potential, structure your loan, and set up your investment portfolio path.`}
              </p>
              
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4.5 h-4.5 text-amber-600" />
                  </div>
                  <p className="text-[12.5px] text-slate-500 font-semibold">100% Free consultation session with no obligations.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Star className="w-4.5 h-4.5 text-amber-600" fill="currentColor" />
                  </div>
                  <p className="text-[12.5px] text-slate-500 font-semibold">Custom interest rate negotiations across 40+ lenders.</p>
                </div>
              </div>
            </div>

            {/* Form Box */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-50 rounded-full blur-[80px] opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

              {!callbackSubmitted ? (
                <>
                  <h3 className="text-[#0B1F3A] text-[17px] font-extrabold mb-6 relative z-10 text-left" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Get Your Free Property Strategy Session
                  </h3>
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const payload = {
                        type: 'investment',
                        name: `${formData.get('name')} ${formData.get('surname')}`,
                        phone: formData.get('phone'),
                        email: formData.get('email'),
                        message: formData.get('message'),
                        savings: String(depositRequired),
                        income: String(annualNetCashFlow)
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Last Name</label>
                        <input
                          type="text"
                          name="surname"
                          placeholder="Doe"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
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
                          placeholder="johndoe@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder=""
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Brief Message (Optional)</label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Tell us about your property goals (first home, multi-property portfolio, equity release, etc.)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner leading-relaxed"
                      />
                    </div>

                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                      By submitting this form, you authorize Mortgage Xperts to call or email you to discuss your options. You agree to our Privacy Policy and Terms.
                    </p>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-[13.5px] py-4 transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                    >
                      Book Free Assessment Strategy Session
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 space-y-4 relative z-10">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                  <h3 className="text-[#0B1F3A] text-[22px] font-extrabold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Thank You! Session Requested.
                  </h3>
                  <p className="text-slate-500 text-[14px] max-w-sm mx-auto leading-relaxed font-medium">
                    We have received your callback request. An expert property broker will contact you within 2-4 business hours to evaluate your strategy.
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 13: FREE STRATEGY CALL BANNER ── */}
      <section className="bg-slate-950 py-16 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-amber-500 text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
              No Obligation Strategy
            </span>
            <h2 className="text-white text-[22px] sm:text-[30px] lg:text-[34px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Ready to Accelerate Your <span className="text-amber-400">Property Investment Journey</span>?
            </h2>
            <p className="text-slate-450 text-[13.5px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
              {pageSections?.[6] || `We look past generic rates to structure your loans for optimal tax outcomes, maximum equity leverage, and minimal deposit costs.`}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 items-stretch sm:items-center">
            <a
              href="tel:0450240757"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-950 font-bold text-[13.5px] px-6 py-4 hover:bg-slate-100 transition-colors shadow-lg text-center"
            >
              Call 0450 240 757
            </a>
            <button type="button" onClick={openModal} className="cursor-pointer border-0 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-[13.5px] px-6 py-4 hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/10 text-center">
              Book Strategy Session
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <SiteFooter settings={settings} />

      {/* ── LEADER REPORT DOWNLOAD MODAL ── */}
      <AnimatePresence>
        {isLeadModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
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
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-white rounded-[28px] shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              {/* Form Header */}
              <div className="bg-[#FFFDF6] border-b border-amber-100 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0B1F3A] text-[15px] font-extrabold">Generate Report</h3>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Rental Yield Audit</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsLeadModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-all"
                >
                  ✕
                </button>
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
                            type: 'investment-calculator',
                            name: leadName,
                            email: leadEmail,
                            phone: leadPhone,
                            savings: String(depositRequired),
                            income: String(annualNetCashFlow)
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder=""
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                      Your information is protected. We will email you the calculated yield report and coordinate with a senior broker to review your lending scenarios.
                    </p>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-[13.5px] py-4 transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                    >
                      Generate My Yield Report
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                    <h4 className="text-[#0B1F3A] text-[18px] font-extrabold">Report Ready &amp; Sent!</h4>
                    <p className="text-slate-500 text-[13.5px] leading-relaxed max-w-xs mx-auto font-medium">
                      Your detailed Property Yield Report has been emailed to you. A portfolio specialist will follow up to review your lending capacity shortly.
                    </p>
                    
                    <div className="border-t border-slate-100 pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowFullReport(true);
                          setIsLeadModalOpen(false);
                        }}
                        className="w-full py-3 bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
                      >
                        View Full Calculations Report
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── SHOW FULL CALCULATIONS REPORT (Interactive Slide-down details) ── */}
      <AnimatePresence>
        {showFullReport && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullReport(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              <div className="bg-[#FFFDF6] border-b border-amber-100 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0B1F3A] text-[15px] font-extrabold">Detailed Calculation Report</h3>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Lending &amp; Cash Flow Analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFullReport(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs font-semibold text-slate-600">
                <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 space-y-2 text-[#0B1F3A]">
                  <div className="flex justify-between font-bold">
                    <span>Property Value:</span>
                    <span>${purchasePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Borrowing Amount ({lvr}% LVR):</span>
                    <span>${loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Self-Funded Deposit ({100-lvr}%):</span>
                    <span>${depositRequired.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 border-b border-slate-100 pb-3">
                  <div className="flex justify-between">
                    <span>Gross Rental Yield:</span>
                    <span className="text-amber-700 font-black">{grossYield.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Rental Yield (after expenses):</span>
                    <span className="text-amber-700 font-black">{netYield.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="space-y-2 border-b border-slate-100 pb-3">
                  <div className="flex justify-between">
                    <span>Annual Rental Income:</span>
                    <span className="text-slate-800 font-extrabold">${annualRentalIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Mortgage Repayments:</span>
                    <span className="text-slate-800 font-extrabold">${Math.round(annualRepayments).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assumed Annual Expenses:</span>
                    <span className="text-slate-800 font-extrabold">${annualExpenses.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3">
                  <span className="font-bold text-[#0B1F3A]">Net Cash Flow Surplus/Deficit:</span>
                  <span className={`text-[14px] font-black ${annualNetCashFlow >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                    ${Math.round(annualNetCashFlow).toLocaleString()} / yr
                  </span>
                </div>

                <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3">
                  <span className="font-bold text-[#0B1F3A]">Status:</span>
                  <span className={`font-black ${annualNetCashFlow >= 0 ? "text-emerald-600" : "text-amber-700"}`}>
                    {annualNetCashFlow >= 0 ? "Positive Cashflow (Positively Geared)" : "Negative Cashflow (Negatively Geared)"}
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowFullReport(false);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 bg-[#0B1F3A] hover:bg-slate-800 text-white font-bold rounded-xl transition-all text-center"
                  >
                    Discuss This Scenario With A Broker
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
