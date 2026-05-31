"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Shield,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Percent,
  Calculator,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Users,
  MapPin,
  Clock,
  Briefcase,
  Star,
  Check,
  PiggyBank,
  Wallet,
  Gift,
  Heart,
  Plus,
  Minus,
  Home as HomeIcon,
  CreditCard,
  Search,
  ShieldAlert,
  UserCheck,
  Scale,
  Coins,
  Landmark,
  Key
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  VIEWPORT,
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

// ── Premium inline SVG icons (match finalized design style) ───
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const IconBarChart = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="18" y="3" width="4" height="18" rx="1" />
    <rect x="10" y="8" width="4" height="13" rx="1" />
    <rect x="2" y="13" width="4" height="8" rx="1" />
  </svg>
);

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

const FacebookIcon = () => (
  <svg className="w-5.5 h-5.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// ==========================================
// CONFIGURABLE BRAND THEME COLOR CONFIG
// ==========================================
const theme = {
  primary: "#2563EB",            // Royal Blue (Matches Home Page Primary)
  textPrimary: "text-[#2563EB]",
  bgPrimary: "bg-[#2563EB]",
  bgHover: "hover:bg-[#1d4ed8]",
  bgLightWash: "bg-[#EEF4FF]",
  borderPrimary: "border-[#2563EB]",
  shadowColor: "shadow-blue-500/20",
  accentLabel: "FIRST HOME BUYER EXPERTS"
};

export function ClientPage() {
  // ── STATE VARIABLES FOR INTERACTIVE UX ──
  const [activeStep, setActiveStep] = useState(0);
  const [activeNav, setActiveNav] = useState("overview");
  const [navSticky, setNavSticky] = useState(false);
  const navSentinelRef = useRef<HTMLDivElement>(null);

  // Dynamic Scroll Progress state for Section 4 Sticky Steps
  // Uses window scroll listener with getBoundingClientRect for reliable sticky tracking
  const roadmapSectionRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = roadmapSectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;
      // How far we've scrolled INTO the section past the sticky point
      // rect.top is negative once we've scrolled past the section start
      const scrolledIntoSection = -rect.top;
      // Total scrollable runway = section height minus one viewport
      const scrollableRun = sectionHeight - viewportHeight;
      if (scrollableRun <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolledIntoSection / scrollableRun));
      // Map 0→1 progress to steps 0→4
      const idx = Math.min(4, Math.floor(progress * 5));
      setActiveStepIndex(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // NavSticky IntersectionObserver — triggers fixed sub-nav when sentinel leaves viewport
  useEffect(() => {
    if (!navSentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(navSentinelRef.current);
    return () => observer.disconnect();
  }, []);

  // Borrowing Capacity Widget State
  const [monthlyIncome, setMonthlyIncome] = useState(8000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [existingSavings, setExistingSavings] = useState(60000);
  const [monthlyDebt, setMonthlyDebt] = useState(500);

  // Deposit Strategy State
  const [activeDepositTab, setActiveDepositTab] = useState<"five" | "twenty">("five");

  // Government Grants State (Expandable card indices)
  const [expandedGrant, setExpandedGrant] = useState<number | null>(null);

  // Loan Comparison State
  const [activeLoanType, setActiveLoanType] = useState<"variable" | "fixed" | "split">("variable");

  // Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 0, label: "Deposit Saved (Min 5% of target property value)", checked: true },
    { id: 1, label: "Credit File Reviewed (No current defaults or late listings)", checked: false },
    { id: 2, label: "Pre-Approval Secured (Confirms spending budget)", checked: false },
    { id: 3, label: "Grants & Concessions Checked (FHOG / Stamp Duty status)", checked: false },
    { id: 4, label: "Legal Support Organised (Solicitor or Conveyancer selected)", checked: false }
  ]);

  // Grouped FAQs Accordion State
  const [activeFaqTab, setActiveFaqTab] = useState<"buying" | "loans" | "grants">("buying");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic Borrowing Calculation
  const borrowingCapacity = (() => {
    const netIncome = Math.max(0, monthlyIncome - monthlyExpenses - monthlyDebt);
    const calculatedCapacity = netIncome * 145 + existingSavings * 0.8;
    return Math.min(2500000, Math.max(150000, Math.round(calculatedCapacity)));
  })();

  // Dynamic Checklist Progress
  const checklistProgress = Math.round(
    (checklist.filter((item) => item.checked).length / checklist.length) * 100
  );

  const toggleChecklist = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Sticky Navigation Spy
  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky nav bar exactly when it touches the top of the viewport (610px scroll)
      if (window.scrollY > 610) {
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

  useEffect(() => {
    const sectionIds = [
      "overview",
      "introduction",
      "roadmap",
      "borrowing",
      "deposit",
      "costs",
      "grants",
      "loans",
      "founder",
      "checklist",
      "faqs",
      "guides",
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

  // ── DATA FOR COMPONENT SECTIONS ──
  const roadmapSteps = [
    {
      num: "01",
      phase: "PHASE 01",
      title: "Borrowing Power",
      tagline: "Know your limit",
      desc: "We analyze your income, expenses, and existing debts to calculate your exact borrowing limits across 40+ Australian lenders.",
      highlight: "Overcomes HECS debt parameters.",
      floatingText: "Know Your Limit. Buy With Confidence.",
      accentClass: "from-[#2563EB] to-[#1D4ED8]",
      glowColor: "rgba(37,99,235,0.12)",
      bgGradient: "from-[#0A2540] to-[#004899]",
      icon: Calculator,
      colorClass: "bg-blue-50 text-blue-600",
      highlightsRow: [
        { label: "Personalised Assessment" },
        { label: "40+ Lenders Compared" },
        { label: "Quick & Accurate" },
        { label: "100% Secure" }
      ],
      evaluate: [
        { label: "Income & Earnings", icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
        { label: "Monthly Expenses", icon: Wallet, color: "bg-rose-50 text-rose-600" },
        { label: "Existing Debts & Loans", icon: CreditCard, color: "bg-amber-50 text-amber-600" },
        { label: "Savings & Deposit", icon: PiggyBank, color: "bg-blue-50 text-blue-600" }
      ]
    },
    {
      num: "02",
      phase: "PHASE 02",
      title: "Deposit Planning",
      tagline: "Leverage schemes",
      desc: "Explore government 5% schemes to waive expensive Lenders Mortgage Insurance (LMI) and buy with a lower upfront deposit.",
      highlight: "Save up to $15,000+ in fees.",
      floatingText: "Minimize Upfront Cost. Save Up to $25k.",
      accentClass: "from-[#10B981] to-[#059669]",
      glowColor: "rgba(16,185,129,0.12)",
      bgGradient: "from-[#062F24] to-[#094E3A]",
      icon: PiggyBank,
      colorClass: "bg-emerald-50 text-emerald-600",
      highlightsRow: [
        { label: "LMI Waiver Analysis" },
        { label: "Grant Matching" },
        { label: "Equity Setup" },
        { label: "Feasibility Review" }
      ],
      evaluate: [
        { label: "First Home Guarantee", icon: ShieldCheck, color: "bg-blue-50 text-blue-600" },
        { label: "Stamp Duty Exemptions", icon: Percent, color: "bg-purple-50 text-purple-600" },
        { label: "Family Guarantees", icon: Users, color: "bg-amber-50 text-amber-600" },
        { label: "LMI Bank Thresholds", icon: AlertCircle, color: "bg-rose-50 text-rose-600" }
      ]
    },
    {
      num: "03",
      phase: "PHASE 03",
      title: "Find Property",
      tagline: "Shop with budget",
      desc: "With a pre-approved budget in hand, search for your ideal home confidently. We provide complimentary property reports.",
      highlight: "Free property data validation.",
      floatingText: "Shop Confidently. Lock in Pre-Approval.",
      accentClass: "from-[#8B5CF6] to-[#7C3AED]",
      glowColor: "rgba(139,92,246,0.12)",
      bgGradient: "from-[#1F1A3A] to-[#3B1547]",
      icon: Search,
      colorClass: "bg-purple-50 text-purple-600",
      highlightsRow: [
        { label: "Pre-Approved Status" },
        { label: "Complimentary Valuation" },
        { label: "Contract Legal Prep" },
        { label: "Negotiating Power" }
      ],
      evaluate: [
        { label: "Property Suitability", icon: HomeIcon, color: "bg-emerald-50 text-emerald-600" },
        { label: "Lender Security Rules", icon: ShieldAlert, color: "bg-rose-50 text-rose-600" },
        { label: "Growth Potential", icon: TrendingUp, color: "bg-blue-50 text-blue-600" },
        { label: "Offer Compliance", icon: FileText, color: "bg-amber-50 text-amber-600" }
      ]
    },
    {
      num: "04",
      phase: "PHASE 04",
      title: "Loan Approval",
      tagline: "Formal confirmation",
      desc: "We package and submit your loan application to your chosen lender, managing communications until formal approval is secured.",
      highlight: "Fast-tracked broker channel submission.",
      floatingText: "Stress-Free Processing. Fast-Tracked.",
      accentClass: "from-[#F59E0B] to-[#D97706]",
      glowColor: "rgba(245,158,11,0.12)",
      bgGradient: "from-[#3B1E0A] to-[#542103]",
      icon: ShieldCheck,
      colorClass: "bg-amber-50 text-amber-600",
      highlightsRow: [
        { label: "Compliance Review" },
        { label: "Fast Submission" },
        { label: "Assessment Liaison" },
        { label: "Formal Signoff" }
      ],
      evaluate: [
        { label: "Lender Credit Checks", icon: UserCheck, color: "bg-blue-50 text-blue-600" },
        { label: "Security Valuations", icon: MapPin, color: "bg-emerald-50 text-emerald-600" },
        { label: "Employment Checks", icon: Briefcase, color: "bg-indigo-50 text-indigo-600" },
        { label: "Formal Commitment", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" }
      ]
    },
    {
      num: "05",
      phase: "PHASE 05",
      title: "Settlement",
      tagline: "Collect your keys",
      desc: "Your solicitor coordinates with the lender to transfer funds to the vendor. The property is officially yours—keys in hand!",
      highlight: "Celebrate your home-ownership!",
      floatingText: "Keys Transferred. Welcome Home!",
      accentClass: "from-[#EC4899] to-[#DB2777]",
      glowColor: "rgba(236,72,153,0.12)",
      bgGradient: "from-[#3D0A25] to-[#540733]",
      icon: Gift,
      colorClass: "bg-pink-50 text-pink-600",
      highlightsRow: [
        { label: "Legal Alignment" },
        { label: "Fund Clearance" },
        { label: "Title Insurance" },
        { label: "Key Handover" }
      ],
      evaluate: [
        { label: "Conveyancing Checks", icon: Scale, color: "bg-indigo-50 text-indigo-600" },
        { label: "Final Bank Drawdown", icon: Coins, color: "bg-amber-50 text-amber-600" },
        { label: "Title Transfer", icon: Landmark, color: "bg-purple-50 text-purple-600" },
        { label: "Key Collection", icon: Key, color: "bg-emerald-50 text-emerald-600" }
      ]
    }
  ];

  const costsBreakdown = [
    { title: "Target Deposit", amount: "$35,000", tag: "Typically 5% to 10%", desc: "The core cash deposit required by the bank to secure your mortgage structure.", highlight: true, bgClass: "bg-[#2563EB]/5 border-[#2563EB]/15" },
    { title: "Stamp Duty Concessions", amount: "$0", tag: "State Dependent", desc: "First home buyers are often fully exempt from stamp duty up to certain purchase price caps.", highlight: false, bgClass: "bg-emerald-50/50 border-emerald-100" },
    { title: "Legal & Conveyancing", amount: "$1,500", tag: "Estimated Average", desc: "Covers contract reviews, title checks, transfer paperwork, and legal representation.", highlight: false, bgClass: "bg-slate-50 border-slate-200" },
    { title: "Building & Pest Checks", amount: "$650", tag: "Upfront Cost", desc: "Ensures the property does not suffer from structural deficiencies or active termite activity.", highlight: false, bgClass: "bg-slate-50 border-slate-200" },
    { title: "Government Transfer Fees", amount: "$450", tag: "Fixed Cost", desc: "Lender and state charges associated with registering the new mortgage title.", highlight: false, bgClass: "bg-slate-50 border-slate-200" }
  ];

  const governmentGrants = [
    {
      title: "First Home Guarantee (FHBG)",
      summary: "Purchase with just a 5% deposit without paying LMI.",
      desc: "The federal government acts as an equity guarantor for the remaining 15% of your deposit. This allows first-time buyers to bypass Lenders Mortgage Insurance (LMI), saving up to $15,000 to $25,000 in upfront structural bank fees."
    },
    {
      title: "Stamp Duty Exemptions",
      summary: "Pay zero stamp duty depending on state thresholds.",
      desc: "State governments provide substantial relief by waiving or heavily discounting land transfer duties for first home buyers. Caps vary (e.g. up to $800k in NSW or $750k in VIC) providing a direct cash benefit at settlement."
    },
    {
      title: "First Home Owner Grant (FHOG)",
      summary: "Get a one-off tax-free cash payment for building/new homes.",
      desc: "A national state-funded cash injection (typically $10,000 to $15,000) specifically rewarded to buyers building a brand-new home or purchasing an eligible newly built property that has never been occupied."
    }
  ];

  const loanComparisonData = {
    variable: {
      title: "Variable Interest Rate",
      tag: "Maximum Flexibility",
      pros: ["Access to offset accounts and redraw facilities", "No limits on making unlimited extra repayments", "Easy to refinance or switch structures if needed"],
      cons: ["Interest rate and monthly payment fluctuates with RBA decisions", "Harder to plan a long-term household budget"]
    },
    fixed: {
      title: "Fixed Interest Rate",
      tag: "Budget Certainty",
      pros: ["Guaranteed fixed repayments for 1 to 5 years", "Complete protection against interest rate hikes", "Perfect for strict household budget planning"],
      cons: ["Strict penalties if you refinance or sell during the fixed term", "Limited capacity to put extra savings into an offset account"]
    },
    split: {
      title: "Split Loan Structure",
      tag: "The Best of Both Worlds",
      pros: ["Fix a portion (e.g. 60%) for payment safety", "Keep the remaining portion variable to use offset accounts", "Minimizes interest rate risk while maintaining flexibilities"],
      cons: ["Slightly more complex loan set up and structuring parameters", "May attract minor double account management fees"]
    }
  };

  const faqGroupData = {
    buying: [
      { q: "How much deposit do I actually need to buy in Australia?", a: "With government schemes like the First Home Guarantee, you can secure a home with as little as a 5% deposit. Traditional purchases without government backing generally require 10% to 20% to avoid paying Lenders Mortgage Insurance." },
      { q: "What is Lenders Mortgage Insurance (LMI)?", a: "LMI is an upfront insurance fee charged by banks if your deposit is less than 20%. It protects the bank, not you, in case of default. We specialize in structuring loans that waive or avoid this fee entirely." },
      { q: "What other hidden upfront costs should I budget for?", a: "You should prepare for conveyancer/solicitor fees ($1,000-$2,000), building/pest checks ($600-$800), and registration costs ($400). Thankfully, stamp duty is often exempt for first home buyers." }
    ],
    loans: [
      { q: "How do banks calculate my borrowing power?", a: "Lenders evaluate your net income, tax, existing debts (credit cards, HECS, personal loans), family dependents, and living expenses using their specific buffer calculators. Different banks can vary by up to $100,000 in what they offer." },
      { q: "Should I choose fixed, variable, or split rate?", a: "This depends entirely on your need for certainty. If you want budget peace of mind, choose Fixed. If you want features like offset accounts, choose Variable. Most of our clients prefer a Split setup for balanced safety." },
      { q: "Is HECS debt going to stop me from getting pre-approved?", a: "No. HECS debt does reduce your overall borrowing power because it affects your monthly net take-home salary, but it absolutely does not prevent approval. We'll guide you to the lenders with the friendliest HECS policies." }
    ],
    grants: [
      { q: "How do I apply for the First Home Guarantee?", a: "This scheme has limited annual allocations and can only be secured through authorized lenders. As your brokers, we reserve your spot and handle the entire scheme submission on your behalf." },
      { q: "Can I get the First Home Owner Grant for established homes?", a: "No. The FHOG is strictly reserved for newly constructed properties, off-the-plan builds, or cases where you build a brand-new home. Established homes are eligible for stamp duty concessions instead." },
      { q: "What are the income limits for government guarantees?", a: "For the First Home Guarantee, singles must earn less than $125,000 per year, and couples must earn less than $200,000 per year, as verified by your ATO Notice of Assessment." }
    ]
  };

  const relatedGuides = [
    { title: "First Home Buyer Survival Guide", cat: "GUIDES", desc: "A comprehensive checklist covering budgets, grants, and lender reviews for first-time buyers.", img: "/images/First Home Buyers.png" },
    { title: "Waiving LMI: The Ultimate Strategy", cat: "FINANCE", desc: "Learn how to bypass expensive bank fees using federal schemes and medical waivers.", img: "/images/Refinancing.png" },
    { title: "Understanding Stamp Duty Concessions", cat: "COMPLIANCE", desc: "State-by-state thresholds and eligibility checklists to maximize transaction savings.", img: "/images/Investment Loans.png" },
    { title: "How HECS Affects Borrowing Power", cat: "STRATEGY", desc: "A technical breakdown on how student debts affect bank servicing buffers and how to fix it.", img: "/images/Healthcare Professionals.png" },
    { title: "Refinancing Your First Mortgage", cat: "REFINANCE", desc: "How to safely switch out of your first home loan to unlock massive interest breaks.", img: "/images/Self-Employed Loans.png" },
    { title: "Building a Brand New Home: Steps", cat: "CONSTRUCTION", desc: "A breakdown of construction progress payments, builder contracts, and grants.", img: "/images/Construction Loans.png" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter" style={{ overflowX: "clip" }}>
      {/* ── SHARED HEADER ── */}
      <SiteHeader />

      {/* ── SECTION 1: EDITORIAL HERO ── */}
      <section id="overview" className="relative overflow-hidden bg-white pt-2.5 pb-8 lg:pt-[10px] lg:pb-8 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
        {/* Homepage inspired dot-matrix and light wash patterns */}
        <div className="absolute top-10 right-10 w-44 h-44 opacity-25 pointer-events-none" style={{ backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#EEF4FF] opacity-40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full">
          
          {/* SEO Friendly Breadcrumbs (Matches graphic separators exactly) */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 bg-white border border-slate-200/60 rounded-full px-4 py-2 w-fit mb-6 text-[11.5px] font-bold text-slate-500 shadow-sm">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <Link href="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className="text-slate-400">Home Loans</span>
            <span className="text-slate-350 font-normal">&gt;</span>
            <span className={`${theme.textPrimary} font-bold`}>Buying a First Home</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden" animate="visible"
              variants={premiumStagger}
              className="flex flex-col justify-center z-10"
            >
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 bg-[#EAF3FF] border-[#2563EB]/15 text-[#2563EB] w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] shrink-0" />
                <span>First Home Buyer Specialists</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Your First Home Doesn&apos;t <br className="hidden sm:inline" />
                Need To Feel <span className="text-[#2563EB]">Complicated.</span>
              </motion.h1>

              <motion.div variants={premiumFadeUp} className={`w-14 h-[3px] ${theme.bgPrimary} mb-5 rounded-full`} />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-5 max-w-xl font-inter">
                Securing your first home is a momentous milestone. We match you to the right lender policies, calculate your genuine limits, and unlock stamp duty concessions to make the process completely stress-free.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                <Link
                  href="#contact"
                  className={`inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-blue-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap`}
                >
                  Book Free Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#borrowing"
                  className={`inline-flex items-center justify-center gap-2 border-2 border-[#2563EB] text-[#2563EB] bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-[#2563EB] hover:text-white group/sec text-center w-full sm:w-auto whitespace-nowrap`}
                >
                  <Calculator className="w-4 h-4 text-current transition-colors" />
                  Calculate Borrowing Power
                </Link>
              </motion.div>

              {/* Trust Reviews Badge Row */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-6 mt-3.5 pt-3 border-t border-slate-100/80 max-w-lg">
                {/* Google reviews */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                    <GoogleIcon />
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
                      ))}
                    </div>
                    <div className="text-[11.5px] text-slate-500 font-bold mt-0.5">4.9/5 from 1,200+ reviews</div>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="w-px h-8 bg-slate-200/80 hidden sm:block" />

                {/* Facebook reviews */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                    <FacebookIcon />
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
                      ))}
                    </div>
                    <div className="text-[11.5px] text-slate-500 font-bold mt-0.5">5.0/5 from 950+ reviews</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Premium Image with Floating badge & Glow Effects */}
            <div
              className="relative flex items-center justify-center lg:justify-end translate-y-4 lg:translate-y-8"
            >
              {/* Circular light-blue wash background shape with gradient & scale animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="absolute w-[82%] aspect-square bg-gradient-to-br from-[#EAF3FF] to-[#F4F9FF] rounded-full blur-none -z-10 shadow-inner"
              />

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="relative w-full max-w-[540px]"
              >
                <Image
                  src="/images/first_home_family.png"
                  alt="Happy First Home Buying Family"
                  width={560}
                  height={440}
                  priority
                  className="w-full h-auto block object-contain mix-blend-multiply scale-[1.04] relative z-10"
                />
                
                {/* Overlaid Premium Glassmorphic Floating Checklist Badge with Continuous vertical drift */}
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -6, 0]
                  }}
                  transition={{
                    opacity: { duration: 0.55, delay: 0.45 },
                    x: { duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }
                  }}
                  className="absolute left-[-16px] lg:left-[-48px] top-[15%] bg-white/95 border border-slate-200/80 rounded-3xl p-5 shadow-[0_20px_40px_rgba(11,31,58,0.1)] flex flex-col gap-3.5 z-20 w-[190px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EAF3FF] flex items-center justify-center text-[#2563EB] shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5 text-[#2563EB]" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      "Deposit Strategy",
                      "Government Grants",
                      "Borrowing Power"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
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

      {/* ── SECTION 2: STATIC IN-PAGE NAVIGATION (Always sits under hero, cross-faded to prevent overlapping) ── */}
      <div className={`relative bg-transparent mt-[-36px] pb-12 z-20 transition-all duration-300 ${
        navSticky ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 flex justify-center">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-[30px] p-2 shadow-[0_15px_40px_rgba(11,31,58,0.06)] flex items-center justify-start w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollbarWidth: "none" }}>
            <div className="flex items-center gap-1.5 md:gap-2.5 px-2 w-max mx-auto shrink-0">
              {[
                { id: "overview", label: "Overview", icon: HomeIcon },
                { id: "introduction", label: "Story", icon: FileText },
                { id: "roadmap", label: "Roadmap", icon: Calendar },
                { id: "borrowing", label: "Borrowing", icon: Calculator },
                { id: "deposit", label: "Deposit Strategy", icon: PiggyBank },
                { id: "costs", label: "Costs", icon: Percent },
                { id: "grants", label: "Grants", icon: Sparkles },
                { id: "loans", label: "Loans", icon: ShieldCheck },
                { id: "founder", label: "Trust Aakash", icon: User },
                { id: "checklist", label: "Checklist", icon: CheckCircle2 },
                { id: "faqs", label: "FAQs", icon: HelpCircle },
                { id: "guides", label: "Guides", icon: FileText },
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
                        ? "bg-gradient-to-br from-[#0A2540] to-[#004899] text-white shadow-[0_4px_12px_rgba(0,72,153,0.22)] font-bold"
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

      {/* ── SECTION 2B: VIEWPORT FIXED STICKY NAVIGATION (Desktop-top / Mobile-bottom responsive sticking) ── */}
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
                    { id: "introduction", label: "Story", icon: FileText },
                    { id: "roadmap", label: "Roadmap", icon: Calendar },
                    { id: "borrowing", label: "Borrowing", icon: Calculator },
                    { id: "deposit", label: "Deposit Strategy", icon: PiggyBank },
                    { id: "costs", label: "Costs", icon: Percent },
                    { id: "grants", label: "Grants", icon: Sparkles },
                    { id: "loans", label: "Loans", icon: ShieldCheck },
                    { id: "founder", label: "Trust Aakash", icon: User },
                    { id: "checklist", label: "Checklist", icon: CheckCircle2 },
                    { id: "faqs", label: "FAQs", icon: HelpCircle },
                    { id: "guides", label: "Guides", icon: FileText },
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
                            ? "bg-gradient-to-br from-[#0A2540] to-[#004899] text-white shadow-[0_4px_12px_rgba(0,72,153,0.22)] font-bold"
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

      {/* ── SECTION 3: INTRODUCTION STORY SECTION ── */}
      <section id="introduction" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Soft dot pattern in top right */}
        <div className="absolute top-6 right-6 w-36 h-36 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#2563EB 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
        {/* Soft radial glow in bottom left */}
        <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Story text (col-span-5) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={premiumStagger}
              className="lg:col-span-5 flex flex-col w-full"
            >
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4 w-fit shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span className="text-[#2563EB] text-[10.5px] font-extrabold tracking-widest uppercase">
                  REALITY CHECK
                </span>
              </motion.div>

              <motion.h2 
                variants={premiumFadeUp}
                className="text-[28px] sm:text-[34px] md:text-[42px] font-extrabold text-[#0B1F3A] leading-tight font-montserrat mb-4" 
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Exciting Until The <br />
                <span className="text-[#2563EB]">Paperwork Starts.</span>
              </motion.h2>

              <motion.div variants={premiumFadeUp} className="w-12 h-[3px] bg-[#2563EB] mb-5 rounded-full" />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed mb-6 font-inter font-normal">
                For many Australians, buying a first home is a dream that quickly becomes overwhelming. Once you start dealing with complex terms, restrictive lender buffers, and dense regulatory requirements, it is easy to get lost.
              </motion.p>

              <motion.div variants={premiumFadeUp} className="flex items-center gap-2.5 mb-8">
                <div className="w-5 h-5 rounded-full bg-[#EAF3FF] flex items-center justify-center shrink-0 shadow-sm text-[#2563EB]">
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                <span className="text-[#0B1F3A] font-extrabold text-[14.5px]">We will walk you through everything.</span>
              </motion.div>

              {/* Deep Rich Navy-to-Blue Gradient Card */}
              <motion.div 
                variants={premiumFadeUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(11,31,58,0.15)" }}
                className="bg-gradient-to-br from-[#06152B] to-[#0A3366] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg border border-white/5 flex items-center justify-between gap-6 group transition-all duration-300 w-full"
              >
                {/* Background decorative shine glow */}
                <div className="absolute right-[-40px] top-[-40px] w-48 h-48 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/15 transition-colors duration-500" />
                
                <div className="flex flex-col flex-1 z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center shrink-0 bg-white/5 text-white bg-white/5">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[26px] font-extrabold leading-none text-white tracking-tight">40+</div>
                      <div className="text-[14px] font-bold text-white mt-1">Lenders Network</div>
                      <div className="text-[11px] text-[#A5B4FC] mt-0.5 font-bold">Direct network access</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-white/10">
                    {/* Rounded avatars overlapping */}
                    <div className="flex -space-x-2 shrink-0">
                      <div className="w-7 h-7 rounded-full border-2 border-[#082245] overflow-hidden bg-slate-200 relative">
                        <Image src="/images/aakash_new.png" fill className="object-cover" alt="User Avatar" />
                      </div>
                      <div className="w-7 h-7 rounded-full border-2 border-[#082245] overflow-hidden bg-slate-300 relative">
                        <Image src="/images/aakash_new.png" fill className="object-cover" alt="User Avatar" />
                      </div>
                      <div className="w-7 h-7 rounded-full border-2 border-[#082245] overflow-hidden bg-slate-400 relative">
                        <Image src="/images/aakash_new.png" fill className="object-cover" alt="User Avatar" />
                      </div>
                    </div>
                    <span className="text-[11.5px] text-slate-200 font-bold">Trusted by 1,200+ Australians</span>
                  </div>
                </div>

                {/* 3D Neoclassical Bank Building Custom SVG with Slow Bobbing Motion */}
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative shrink-0 w-20 h-20 flex items-center justify-center z-10"
                >
                  <svg className="w-20 h-20 drop-shadow-[0_8px_16px_rgba(37,99,235,0.35)]" viewBox="0 0 100 100" fill="none">
                    <path d="M10 80h80v8H10z" fill="url(#bankGradBase)" />
                    <path d="M15 72h70v8H15z" fill="url(#bankGradBase)" opacity="0.9" />
                    <path d="M24 36h6v36h-6zM40 36h6v36h-6zM56 36h6v36h-6zM72 36h6v36h-6z" fill="url(#bankGradCol)" />
                    <path d="M18 28h64v8H18z" fill="url(#bankGradBase)" />
                    <path d="M14 28L50 8l36 20H14z" fill="url(#bankGradPed)" />
                    <path d="M50 11L18 28h64L50 11z" fill="#000" opacity="0.08" />
                    <defs>
                      <linearGradient id="bankGradBase" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                      <linearGradient id="bankGradCol" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                      <linearGradient id="bankGradPed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-[-2px] right-[-2px] w-6.5 h-6.5 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] border border-[#0A3366] shadow-[0_4px_10px_rgba(37,99,235,0.4)] flex items-center justify-center text-white z-20">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column: Unified Timeline & problem-solving Cards (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col w-full relative">
              
              {/* Vertical Dashed Timeline Line */}
              <div className="absolute left-[20px] top-[40px] bottom-[40px] w-0 border-l-2 border-dashed border-slate-200/80 pointer-events-none" />

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={premiumStagger}
                className="flex flex-col gap-6 w-full relative"
              >
                {[
                  { 
                    title: "Unsure How Much You Can Borrow?", 
                    desc: "Every lender treats HECS, casual income, and living buffers differently. You could easily under-estimate your genuine capability.",
                    num: "01",
                    icon: AlertCircle,
                    colorClass: "bg-red-50 text-red-500",
                    href: "#borrowing"
                  },
                  { 
                    title: "Worried About Deposit Requirements?", 
                    desc: "Saving 20% feels impossible in today's housing market. We unlock 5% options that avoid double Lenders Mortgage Insurance fees.",
                    num: "02",
                    icon: Wallet,
                    colorClass: "bg-orange-50 text-orange-500",
                    href: "#deposit"
                  },
                  { 
                    title: "Confused By Grants and Schemes?", 
                    desc: "With stamp duty concessions, First Home Guarantees, and builder grants changing constantly, missing out can cost you up to $25,000.",
                    num: "03",
                    icon: Gift,
                    colorClass: "bg-pink-50 text-pink-500",
                    href: "#grants"
                  },
                  { 
                    title: "Struggling with Interest Rate Comparisons?", 
                    desc: "Comparing fixed vs variable interest rates and complex offset structures can be daunting. We find the absolute lowest rates tailored to your profile.",
                    num: "04",
                    icon: Calculator,
                    colorClass: "bg-emerald-50 text-emerald-600",
                    href: "#rates"
                  }
                ].map((pain, idx) => {
                  const IconComp = pain.icon;
                  return (
                    <div key={idx} className="relative w-full flex items-center">
                      
                      {/* Timeline Node Bubble - Mathematically Perfect Centering & Energetic Spring Popup */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 + idx * 0.08 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-[13px] text-[#2563EB] z-10 shadow-sm select-none"
                      >
                        {pain.num}
                      </motion.div>

                      {/* The Actual Problem Card */}
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
                        whileHover={{ x: 6, scale: 1.005, boxShadow: "0 20px 30px rgba(11,31,58,0.04)", borderColor: "#E2E8F0" }}
                        className="ml-14 bg-white border border-slate-100 rounded-3xl p-5.5 flex items-center justify-between gap-5 transition-all duration-300 group cursor-pointer shadow-[0_4px_25px_rgba(15,23,42,0.015)] flex-1"
                      >
                        <div className="flex items-start gap-4.5">
                          {/* Left Side Icon inside premium color wash */}
                          <div className={`w-12 h-12 rounded-full ${pain.colorClass} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                            <IconComp className="w-5.5 h-5.5 stroke-[2.2px]" />
                          </div>

                          {/* Center Content */}
                          <div className="flex-1">
                            <h3 className="text-[#0B1F3A] text-[14px] sm:text-[15px] font-extrabold leading-tight font-montserrat tracking-tight group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                              {pain.title}
                            </h3>
                            <p className="text-slate-500 text-[12px] sm:text-[12.5px] mt-1.5 leading-relaxed font-inter font-normal max-w-xl">
                              {pain.desc}
                            </p>
                          </div>
                        </div>

                        {/* Right Side: Arrow Navigation Button */}
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] text-[#2563EB] shadow-sm transition-all duration-300">
                          <ArrowRight className="w-4 h-4" />
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

      {/* ── SECTION 4: HOME BUYING ROADMAP (STICKY DYNAMIC SCROLL REVEAL) ── */}
      {/* NOTE: NO overflow-hidden on this section - it WILL break position:sticky */}
      <section id="roadmap" ref={roadmapSectionRef} className="relative bg-white border-b border-slate-100" style={{ minHeight: "550vh" }}>

        {/* Sticky Wrapper — top-[136px] accounts for site header (80px) + sub-nav (56px) */}
        <div className="sticky w-full flex" style={{ zIndex: 5, top: "136px", height: "calc(100vh - 136px)", alignItems: "stretch", padding: "16px 0" }}>
          
          {/* Subtle background glow — pointer-events-none so it doesn't break sticky */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" style={{ zIndex: 1, gridTemplateRows: "1fr", height: "100%" }}>

            {/* ── LEFT: Heading + Large Beautiful Step Tracker ── */}
            <div className="flex flex-col">
              {/* Label */}
              <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-4 py-2 mb-5 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span className="text-[#2563EB] text-[11px] font-black tracking-widest uppercase">
                  The Roadmap to Ownership
                </span>
              </div>

              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0B1F3A] leading-[1.15] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Five Steps To Your{" "}
                <span className="text-[#2563EB]">First Home Keys</span>
              </h2>

              <p className="text-slate-500 text-[13px] leading-relaxed mb-5 max-w-sm">
                Scroll down — watch each step light up as we guide you through the journey.
              </p>

              {/* ── LARGE STEP TRACKER ── */}
              <div className="relative">
                {/* Vertical connector line running behind icons */}
                <div
                  className="absolute pointer-events-none"
                  style={{ left: "21px", top: "36px", bottom: "36px", width: "2px", background: "#E2E8F0" }}
                />
                {/* Filled progress line */}
                <div
                  className="absolute pointer-events-none transition-all duration-500"
                  style={{
                    left: "21px",
                    top: "36px",
                    width: "2px",
                    height: `${(activeStepIndex / 4) * 100}%`,
                    background: "linear-gradient(to bottom, #2563EB, #10B981, #8B5CF6, #F59E0B, #EC4899)"
                  }}
                />

                <div className="space-y-1">
                  {roadmapSteps.map((step, idx) => {
                    const isActive = activeStepIndex === idx;
                    const isPast = activeStepIndex > idx;
                    const StepIcon = step.icon;

                    const colors = [
                      { accent: "#2563EB", lightBg: "#EAF3FF", border: "#BFDBFE" },
                      { accent: "#10B981", lightBg: "#ECFDF5", border: "#A7F3D0" },
                      { accent: "#8B5CF6", lightBg: "#EDE9FE", border: "#DDD6FE" },
                      { accent: "#F59E0B", lightBg: "#FFFBEB", border: "#FDE68A" },
                      { accent: "#EC4899", lightBg: "#FDF2F8", border: "#FBCFE8" },
                    ][idx];

                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3.5 py-2.5 px-3 rounded-xl transition-all duration-500"
                        style={{
                          background: isActive ? colors.lightBg : "transparent",
                          opacity: isActive || isPast ? 1 : 0.35,
                          transform: isActive ? "translateX(4px)" : "translateX(0)",
                        }}
                      >
                        {/* Icon circle — compact */}
                        <div
                          className="shrink-0 flex items-center justify-center rounded-xl transition-all duration-500"
                          style={{
                            width: "44px",
                            height: "44px",
                            background: isActive ? colors.accent : isPast ? colors.lightBg : "#F8FAFC",
                            border: `2px solid ${isActive ? colors.accent : isPast ? colors.border : "#E2E8F0"}`,
                            boxShadow: isActive ? `0 6px 16px ${colors.accent}28` : "none",
                            color: isActive ? "#ffffff" : isPast ? colors.accent : "#94A3B8",
                          }}
                        >
                          <StepIcon style={{ width: "18px", height: "18px", strokeWidth: 2.2 }} />
                        </div>

                        {/* Text */}
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

                        {/* Status icon */}
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

            {/* ── RIGHT: Animated Dashboard Card — fills exact column height ── */}
            <div className="w-full flex flex-col" style={{ minHeight: 0, height: "100%" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl overflow-hidden border border-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.05)] flex flex-col"
                  style={{ background: "#FFFFFF", height: "100%" }}
                >
                  {/* Card top: step info — compact padding */}
                  <div className="px-6 pt-5 pb-4" style={{ background: "#F8FAFC", borderBottom: "1px solid #F1F5F9", flexShrink: 0 }}>
                    <span
                      className="inline-block text-[9px] tracking-widest font-black uppercase px-2.5 py-1 rounded-full mb-2.5 border"
                      style={{
                        background: "#EAF3FF",
                        color: "#2563EB",
                        borderColor: "#BFDBFE",
                      }}
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

                  {/* Card middle: two columns — compact */}
                  <div className="grid grid-cols-2" style={{ flexShrink: 0 }}>
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

                    {/* What we evaluate */}
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

                  {/* Photo strip — flex-1 min-h-0 fills ALL remaining card height */}
                  <div className="relative flex-1 min-h-0 overflow-hidden" style={{ borderTop: "1px solid #F1F5F9" }}>
                    <Image
                      src="/images/family_couch_laptop.png"
                      alt="Happy First Home Buyers"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-md">
                      <div className="w-6 h-6 rounded-full bg-[#EAF3FF] flex items-center justify-center text-[#2563EB]">
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

      {/* ── SECTION 5: BORROWING POWER (LIVE CALCULATOR WIDGET WITH DYNAMIC GLOW) ── */}
      <section id="borrowing" className="py-16 md:py-20 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Fintech light wash behind widget */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#EEF4FF] rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4">
                <Calculator className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                  BORROWING CAPACITY
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                How Much Can I <span className="text-[#2563EB]">Actually Borrow?</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-6">
                Banks don&apos;t just look at your gross wage. They apply assessment interest rate buffers, living expense indices (HEM), and deduct existing monthly debts to determine your borrowing limit.
              </p>
              
              {/* Glass card list */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_8px_30px_rgba(15,23,42,0.02)] space-y-4 max-w-md">
                <div className="flex gap-4 items-start">
                  <div className={`w-9 h-9 rounded-xl ${theme.bgLightWash} ${theme.textPrimary} flex items-center justify-center shrink-0 border border-[#D8E7FF]`}>
                    <Percent className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14.5px] font-bold leading-tight">Lender Policy Differentials</h4>
                    <p className="text-slate-500 text-[12px] mt-1 leading-snug">Bank buffers vary widely. Choosing the right bank policies can elevate your borrowing limit by up to $80k.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Widget Card (Homepage premium calculator style) */}
            <div>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(11,31,58,0.08)] p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-[#0B1F3A] text-[15.5px] font-black uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Capacity Estimator
                  </h3>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 font-extrabold uppercase px-2.5 py-1 rounded-md border border-emerald-100">
                    Live Calculator
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Slider 1 */}
                  <div>
                    <div className="flex justify-between text-[11.5px] text-slate-500 font-bold mb-1.5">
                      <span>Monthly Household Income (Net)</span>
                      <span className={`${theme.textPrimary} font-black text-[13px]`}>${monthlyIncome.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={3000}
                      max={25000}
                      step={250}
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full accent-[#2563EB] bg-slate-100 cursor-pointer"
                    />
                  </div>

                  {/* Slider 2 */}
                  <div>
                    <div className="flex justify-between text-[11.5px] text-slate-500 font-bold mb-1.5">
                      <span>Monthly Living Expenses</span>
                      <span className="text-slate-700 font-black text-[13px]">${monthlyExpenses.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={12000}
                      step={100}
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full accent-slate-655 bg-slate-100 cursor-pointer"
                    />
                  </div>

                  {/* Slider 3 */}
                  <div>
                    <div className="flex justify-between text-[11.5px] text-slate-500 font-bold mb-1.5">
                      <span>Existing Cash Savings</span>
                      <span className={`${theme.textPrimary} font-black text-[13px]`}>${existingSavings.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={300000}
                      step={5000}
                      value={existingSavings}
                      onChange={(e) => setExistingSavings(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full accent-[#2563EB] bg-slate-100 cursor-pointer"
                    />
                  </div>

                  {/* Slider 4 */}
                  <div>
                    <div className="flex justify-between text-[11.5px] text-slate-500 font-bold mb-1.5">
                      <span>Other Monthly Debts (HECS / Car / Cards)</span>
                      <span className="text-red-500 font-black text-[13px]">${monthlyDebt.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={4000}
                      step={50}
                      value={monthlyDebt}
                      onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full accent-red-500 bg-slate-100 cursor-pointer"
                    />
                  </div>

                  {/* Estimated Output Card (Gradients and Glow rings) */}
                  <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-6 text-center mt-6 relative overflow-hidden">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      ESTIMATED BORROWING CAPACITY
                    </span>
                    <div className="text-[28px] sm:text-[36px] font-black text-[#0B1F3A] tracking-tight leading-none my-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      ${borrowingCapacity.toLocaleString()}
                    </div>
                    <div className="text-[10.5px] text-slate-400 mt-1.5 max-w-[320px] mx-auto leading-relaxed">
                      Includes standard 80% LVR buffers. Specific bank policy structures can significantly increase this limit.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: DEPOSIT STRATEGY SECTION (EDITORIAL TWIN LAYOUT) ── */}
      <section id="deposit" className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4">
                <TrendingUp className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                  DEPOSIT STRATEGY
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                20% Deposit <span className="text-slate-350 font-normal">vs</span> <span className="text-[#2563EB]">5% Deposit</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-6">
                Is it smarter to wait years to save 20% to avoid Lenders Mortgage Insurance, or buy immediately with a 5% deposit using government schemes? Let&apos;s evaluate the trade-offs.
              </p>
              
              {/* Twin tab toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveDepositTab("five")}
                  className={`px-5 py-3 rounded-xl text-[12.5px] font-bold border transition-all ${
                    activeDepositTab === "five"
                      ? `${theme.bgPrimary} ${theme.borderPrimary} text-white shadow-md shadow-blue-500/10`
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  5% Guarantee Scheme
                </button>
                <button
                  onClick={() => setActiveDepositTab("twenty")}
                  className={`px-5 py-3 rounded-xl text-[12.5px] font-bold border transition-all ${
                    activeDepositTab === "twenty"
                      ? "bg-slate-800 border-slate-800 text-white shadow-md"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Traditional 20% Deposit
                </button>
              </div>
            </div>

            {/* Right: Premium detail card panel with horizontal slide */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 relative min-h-[300px] flex flex-col justify-center shadow-inner">
              <AnimatePresence mode="wait">
                {activeDepositTab === "five" ? (
                  <motion.div
                    key="five"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="text-[#0B1F3A] text-[18px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      5% Deposit Scheme Advantages
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      Leveraging government incentives allows you to purchase immediately, bypassing rising house price inflation while saving substantial LMI costs.
                    </p>
                    <div className="space-y-3 pt-2">
                      {[
                        "Purchase 1 to 3 years faster than waiting for a full 20%",
                        "Avoid paying $15,000+ in Lenders Mortgage Insurance fees",
                        "Retain remaining cash reserves for unexpected property costs",
                        "Full access to competitive prime lender interest rates"
                      ].map((adv, idx) => (
                        <div key={idx} className="flex gap-3 items-start text-[12.5px] font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{adv}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="twenty"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="text-[#0B1F3A] text-[18px] font-black" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      20% Deposit Advantages
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      Ideal for structured wealth positions, a larger deposit lowers overall monthly repayments and provides immediate equity buffer cushions.
                    </p>
                    <div className="space-y-3 pt-2">
                      {[
                        "No government guarantee limits or strict scheme allocations",
                        "Lower ongoing monthly mortgage interest repayments",
                        "Smaller loan-to-value ratio results in lowest lender rates",
                        "Zero risk of paying Lenders Mortgage Insurance (LMI) fee"
                      ].map((adv, idx) => (
                        <div key={idx} className="flex gap-3 items-start text-[12.5px] font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                          <span>{adv}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 7: BUYING COSTS BREAKDOWN (PRICING CARD STRUCTURES) ── */}
      <section id="costs" className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4">
              <span className={`w-1.5 h-1.5 rounded-full ${theme.bgPrimary}`} />
              <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                FINANCIAL COSTS
              </span>
            </div>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              The Genuine Upfront <span className="text-[#2563EB]">Costs of Buying</span>
            </h2>
            <p className="text-slate-500 text-[13.5px] sm:text-[14.5px]">
              Avoid transaction surprises. Here is the realistic cash requirement needed at settlement, assuming a standard $700,000 first property cap.
            </p>
          </div>

          {/* Pricing style cost cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {costsBreakdown.map((cost, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className={`rounded-2xl p-5 border flex flex-col justify-between shadow-sm bg-white transition-all ${
                  cost.highlight
                    ? `${theme.borderPrimary} ring-4 ring-blue-500/5 scale-[1.03] z-10 shadow-[0_12px_30px_rgba(37,99,235,0.08)]`
                    : "border-slate-200"
                }`}
              >
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    {cost.title}
                  </span>
                  <div className={`text-[25px] font-black ${cost.highlight ? theme.textPrimary : "text-[#0B1F3A]"} mb-1`}>
                    {cost.amount}
                  </div>
                  <span className="inline-block text-[9px] font-black uppercase px-2.5 py-0.5 rounded bg-slate-100 text-slate-500 mb-4">
                    {cost.tag}
                  </span>
                  <p className="text-slate-500 text-[11.5px] leading-relaxed">
                    {cost.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 8: GOVERNMENT GRANTS EXPANDABLE CARD GRID ── */}
      <section id="grants" className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4">
              <span className={`w-1.5 h-1.5 rounded-full ${theme.bgPrimary}`} />
              <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                GOVERNMENT ASSISTANCE
              </span>
            </div>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Unlock Available <span className="text-[#2563EB]">Government Support</span>
            </h2>
            <p className="text-slate-500 text-[13.5px] sm:text-[14.5px]">
              Don&apos;t leave cash on the table. Click each grant to check eligibility guidelines and maximum caps.
            </p>
          </div>

          {/* Grid Container (homepage inspired shadow cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {governmentGrants.map((grant, idx) => {
              const isExpanded = expandedGrant === idx;
              return (
                <motion.div
                  key={idx}
                  onClick={() => setExpandedGrant(isExpanded ? null : idx)}
                  whileHover={{ y: -2 }}
                  className={`bg-white border rounded-2xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isExpanded
                      ? "border-[#2563EB] shadow-[0_15px_30px_rgba(37,99,235,0.06)] ring-2 ring-blue-500/5"
                      : "border-slate-150 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-3.5">
                      <h3 className="text-[#0B1F3A] text-[16px] font-black leading-snug" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        {grant.title}
                      </h3>
                      <div className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 transition-transform ${isExpanded ? "rotate-180 bg-[#EEF4FF] border-[#2563EB] text-[#2563EB]" : "bg-white"}`}>
                        <ChevronDown className="w-4.5 h-4.5" />
                      </div>
                    </div>
                    <p className="text-slate-500 text-[12.5px] leading-relaxed">
                      {grant.summary}
                    </p>
                    
                    {/* Expandable Panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE_OUT }}
                          className="overflow-hidden mt-4 pt-4 border-t border-slate-100"
                        >
                          <p className="text-slate-500 text-[12.5px] leading-relaxed">
                            {grant.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <span className={`text-[12px] font-extrabold flex items-center gap-0.5 mt-6 transition-all ${isExpanded ? "text-slate-400" : theme.textPrimary}`}>
                    {isExpanded ? "Show Less" : "Verify My Eligibility"} <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 9: CHOOSING THE RIGHT LOAN (DYNAMIC SELECTOR) ── */}
      <section id="loans" className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.bgPrimary}`} />
                <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                  MORTGAGE TYPE COMPARISON
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Choosing The <span className="text-[#2563EB]">Right Loan Product</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-6">
                Should you secure a fixed rate for payment security, keep it fully variable for flexible offset accounts, or select a customized split mortgage loan? Click to compare details.
              </p>
              
              <div className="flex flex-col gap-3">
                {[
                  { key: "variable", label: "Variable Rate Mortgage", icon: IconHome },
                  { key: "fixed", label: "Fixed Rate Mortgage", icon: IconRefresh },
                  { key: "split", label: "Split Loan Structure", icon: IconBarChart }
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = activeLoanType === type.key;
                  return (
                    <button
                      key={type.key}
                      onClick={() => setActiveLoanType(type.key as any)}
                      className={`text-left p-4 rounded-xl border font-bold text-[13.5px] transition-all flex justify-between items-center ${
                        isSelected
                          ? `${theme.bgPrimary} ${theme.borderPrimary} text-white shadow-md shadow-blue-500/10`
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${isSelected ? "bg-white/10 border-white/20 text-white" : "bg-blue-50 border-blue-100 text-[#2563EB]"}`}>
                          <Icon />
                        </div>
                        <span>{type.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-400"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Dynamic Product Card Content (Glass card with deep shadow) */}
            <div className="bg-white border border-slate-100 shadow-[0_20px_50px_rgba(11,31,58,0.08)] rounded-3xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLoanType}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="inline-block text-[9.5px] font-black tracking-wider uppercase px-2.5 py-1 rounded bg-[#EEF4FF] text-[#2563EB] mb-2 border border-blue-100">
                      {loanComparisonData[activeLoanType].tag}
                    </span>
                    <h3 className="text-[#0B1F3A] text-[20px] font-black mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {loanComparisonData[activeLoanType].title}
                    </h3>
                  </div>

                  {/* Pros */}
                  <div>
                    <h4 className="text-[#0B1F3A] text-[12.5px] font-black uppercase tracking-wider mb-2">The Advantages</h4>
                    <div className="space-y-2">
                      {loanComparisonData[activeLoanType].pros.map((pro, i) => (
                        <div key={i} className="flex gap-2.5 items-start text-[12.5px] font-semibold text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cons */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-red-500 text-[12.5px] font-black uppercase tracking-wider mb-2">The Trade-Offs</h4>
                    <div className="space-y-2">
                      {loanComparisonData[activeLoanType].cons.map((con, i) => (
                        <div key={i} className="flex gap-2.5 items-start text-[12.5px] font-semibold text-slate-500">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 10: FOUNDER SECTION (DARK NAVY EDITORIAL BLOCK) ── */}
      <section id="founder" className="relative overflow-hidden bg-[#001a4d] py-20 text-white">
        {/* Diagonal high-end light wash to highlight text */}
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, transparent 42%, rgba(59,130,246,0.12) 52%, rgba(147,197,253,0.06) 58%, transparent 70%)",
          }}
        />
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center">
            
            {/* Founder Portrait with white glow drops */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#091526]">
                <Image
                  src="/images/aakash_new.png"
                  alt="Aakash KC - Founder &amp; Leading Mortgage Mate"
                  fill
                  className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Editorial Story */}
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-1.5 w-fit">
                <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white uppercase">
                  DIRECT TRUST ADVICE
                </span>
              </div>

              <h2
                className="text-[34px] sm:text-[42px] font-black leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <span className="text-white">Helping First Buyers Navigate</span>
                <br />
                <span className="text-[#38BDF8]">With Confidence.</span>
              </h2>

              <p className="text-[14px] sm:text-[15.5px] text-white/85 leading-relaxed">
                Led by Aakash KC (The Mortgage Mate), we represent a premier Nepali-led brokerage firm that works for you, not the banks. With over hundreds of 5-star reviews across Australia, we prioritize your long-term wealth, walking with you from saving structures to settlement keys.
              </p>

              <div className="border-t border-white/15 pt-6 mt-2 flex items-center gap-4">
                <div>
                  <div className="text-[15.5px] font-black text-white">Aakash KC</div>
                  <div className="text-[12px] text-slate-400 mt-0.5">Founder &amp; Principal Mortgage Broker</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 11: INTERACTIVE CHECKLIST WIDGET ── */}
      <section id="checklist" className="py-16 md:py-20 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                  LIVE READINESS CHECK
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                First Home Buyer <span className="text-[#2563EB]">Readiness Checklist</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed mb-6">
                Are you legally and financially ready to apply for pre-approval? Click on the checklist parameters on the right to measure your readiness percentage.
              </p>
              
              {/* Dynamic progress gauge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm">
                <div className="flex justify-between text-[12px] font-bold text-slate-600 mb-2">
                  <span>Your Application Progress</span>
                  <span className={`${theme.textPrimary}`}>{checklistProgress}% Complete</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`${theme.bgPrimary} h-full transition-all duration-300`}
                    style={{ width: `${checklistProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Live Checklist Container */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-8 space-y-3">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 bg-white hover:border-[#2563EB] ${
                    item.checked ? "border-[#2563EB]/40 ring-1 ring-blue-500/5 shadow-[0_2px_12px_rgba(37,99,235,0.02)]" : "border-slate-200"
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 ${
                    item.checked ? "bg-[#2563EB] border-[#2563EB] text-white" : "border-slate-300 text-transparent"
                  }`}>
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className={`text-[12.5px] font-semibold ${
                    item.checked ? "text-[#0B1F3A] line-through decoration-slate-300" : "text-slate-600"
                  }`}>{item.label}</span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 12: GROUPED ACCORDION FAQs ── */}
      <section id="faqs" className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[800px] mx-auto px-6">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4 mx-auto">
              <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                QUESTIONS &amp; ANSWERS
              </span>
            </div>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-black leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Frequently Asked <span className="text-[#2563EB]">Queries</span>
            </h2>
            
            {/* Category tabs */}
            <div className="flex justify-center gap-2 mt-5">
              {[
                { key: "buying", label: "Buying" },
                { key: "loans", label: "Loans" },
                { key: "grants", label: "Grants" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveFaqTab(tab.key as any);
                    setOpenFaq(null);
                  }}
                  className={`px-4.5 py-2.5 rounded-xl text-[12px] font-bold border transition-all ${
                    activeFaqTab === tab.key
                      ? `${theme.bgPrimary} ${theme.borderPrimary} text-white shadow-sm`
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List (homepage visual tabs style) */}
          <div className="space-y-3.5">
            {faqGroupData[activeFaqTab].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-slate-100 shadow-[0_4px_16px_rgba(15,23,42,0.04)] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none"
                  >
                    <span className="text-[14.5px] sm:text-[15px] font-extrabold text-[#0B1F3A]">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${isOpen ? "border-[#2563EB] bg-[#EEF4FF] text-[#2563EB]" : "border-slate-200 text-slate-500"}`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-[13px] sm:text-[14px] text-slate-500 leading-relaxed border-t border-slate-50 pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 13: RELATED GUIDES (EDITORIAL RESOURCE GRID) ── */}
      <section id="guides" className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4">
              <span className={`w-1.5 h-1.5 rounded-full ${theme.bgPrimary}`} />
              <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                EDUCATIONAL PORTAL
              </span>
            </div>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Explore Our <span className="text-[#2563EB]">Mortgage Resource Hub</span>
            </h2>
            <p className="text-slate-500 text-[13.5px] sm:text-[14.5px]">
              Learn exactly how to prepare your finance application and avoid major broker pitfalls with our premium guides.
            </p>
          </div>

          {/* 6 Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedGuides.map((guide, i) => (
              <motion.article
                key={i}
                whileHover={{ ...motionCardHover, boxShadow: "0 20px 40px rgba(11,31,58,0.06)" }}
                className="group rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 w-full overflow-hidden">
                    <Image
                      src={guide.img}
                      alt={guide.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2.5">
                    <span className="text-[9.5px] font-extrabold tracking-wider uppercase text-slate-400">
                      {guide.cat}
                    </span>
                    <h3 className="text-[#0B1F3A] text-[15.5px] font-black leading-snug group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {guide.title}
                    </h3>
                    <p className="text-slate-500 text-[12.5px] leading-snug">
                      {guide.desc}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link href="#contact" className={`text-[12px] font-extrabold flex items-center gap-1 hover:underline ${theme.textPrimary}`}>
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 14: STRATEGIC CONSULTATION CTA (DARK NAVY GLOW) ── */}
      <section className="relative overflow-hidden bg-[#001a4d] py-16 text-white border-b border-white/5">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, transparent 42%, rgba(59,130,246,0.1) 52%, rgba(147,197,253,0.05) 58%, transparent 70%)",
          }}
        />
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 flex-1">
            <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[20px] sm:text-[22px] font-black text-white leading-snug" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Ready to Take the First Step <br className="hidden sm:block" />Toward <span className="text-[#38BDF8]">Home Ownership?</span>
              </p>
              <p className="text-[12.5px] text-white/75 mt-1 max-w-xl">
                Book a free, completely obligation-free strategy call to outline your state grant applications and lender approvals.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0 justify-center">
            <Link
              href="#contact"
              className={`inline-flex items-center justify-center gap-2 rounded-xl ${theme.bgPrimary} ${theme.bgHover} px-7 py-3.5 text-[13px] font-bold text-white transition-colors shadow-lg shadow-blue-500/10 whitespace-nowrap`}
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:0450240757"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-transparent px-7 py-3.5 text-[13px] font-bold text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Speak With A Broker
            </a>
          </div>

        </div>
      </section>

      {/* ── SECTION 15: ENQUIRY FORM SECTION (UNCLUTTERED & HIGH CONVERSION) ── */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        {/* Abstract background dot pattern */}
        <div className="absolute top-6 left-6 w-32 h-32 opacity-15" style={{ backgroundImage: "radial-gradient(#2563EB 1px, transparent 1px)", backgroundSize: "8px 8px" }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
            
            {/* Side content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-3.5 py-1.5 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.bgPrimary}`} />
                <span className={`${theme.textPrimary} text-[10px] font-black tracking-widest uppercase`}>
                  STRATEGY CALLBACK
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Request A <span className="text-[#2563EB]">Callback Strategy Call</span>
              </h2>
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed mb-6">
                Fill out your details below and a first home advisor will contact you within 2 business hours. We&apos;ll explain borrowing capacity calculations, low-deposit schemes, and answer any grant eligibility questions.
              </p>
              <div className="space-y-4">
                {[
                  "No pressure or sales tactics guaranteed",
                  "Review calculations and state requirements together",
                  "Learn what lenders are right for you"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center text-[12.5px] sm:text-[13px] font-semibold text-slate-700">
                    <ShieldCheck className={`w-4.5 h-4.5 ${theme.textPrimary} shrink-0`} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Enquiry Form (Homepage visual styled inputs) */}
            <div>
              <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm relative">
                <div className="absolute top-6 right-6 w-20 h-20 opacity-15" style={{ backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />

                <h3 className="text-[#0B1F3A] text-[20px] font-extrabold mb-6 relative z-10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Secure Your Strategic Callback
                </h3>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] shadow-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="0450 000 000"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com.au"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] shadow-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">State</label>
                      <select className="w-full rounded-xl border border-slate-200 bg-white py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] font-semibold text-slate-700 shadow-sm">
                        <option>New South Wales (NSW)</option>
                        <option>Victoria (VIC)</option>
                        <option>Queensland (QLD)</option>
                        <option>Western Australia (WA)</option>
                        <option>South Australia (SA)</option>
                        <option>ACT / Tasmania / NT</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">What is your current savings position?</label>
                    <select className="w-full rounded-xl border border-slate-200 bg-white py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] font-semibold text-slate-700 shadow-sm">
                      <option>Under $20,000</option>
                      <option>$20,000 - $50,000</option>
                      <option>$50,000 - $100,000</option>
                      <option>Over $100,000</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className={`w-full ${theme.bgPrimary} ${theme.bgHover} text-white font-bold py-4 rounded-xl text-[13.5px] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-100`}
                  >
                    Submit Booking Request <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center mt-3">
                    We guard your privacy with top-tier security standards.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mobile safety spacer to prevent bottom sticky nav overlapping footer copyrights */}
      <div className="h-20 md:hidden" />

      {/* ── SHARED FOOTER ── */}
      <SiteFooter />
    </div>
  );
}
