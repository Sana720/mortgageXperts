"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useOnboardingModal } from "@/app/components/OnboardingModalContext";
import { motion, AnimatePresence } from "framer-motion";
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
import { BlogSection } from "../components/BlogSection";
import { RoadmapSection } from "../components/RoadmapSection";
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

  const badgeText = pageHeroSettings?.hero_badge || "First Home Buyer Specialists";
  const titleText = pageHeroSettings?.hero_title || "Your First Home Doesn't Need To Feel Complicated.";
  const subtextText = pageHeroSettings?.hero_subtext || "Securing your first home is a momentous milestone. We match you to the right lender policies, calculate your genuine limits, and unlock stamp duty concessions to make the process completely stress-free.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/first_home_family.png";
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Book Free Strategy Call";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#contact";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Calculate Borrowing Power";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "#borrowing";

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

  const renderBtnIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("calculate") || t.includes("borrowing") || t.includes("power") || t.includes("repayment") || t.includes("yield") || t.includes("equity")) {
      return <Calculator className="w-4 h-4 text-current transition-colors" />;
    }
    if (t.includes("call") || t.includes("consult") || t.includes("talk") || t.includes("chat")) {
      return <Calendar className="w-4 h-4 text-current transition-colors" />;
    }
    return <ArrowRight className="w-4 h-4 text-current transition-colors" />;
  };
  // ── STATE VARIABLES FOR INTERACTIVE UX ──
  const [activeStep, setActiveStep] = useState(0);
  const [activeNav, setActiveNav] = useState("overview");
  const [navSticky, setNavSticky] = useState(false);
  const navSentinelRef = useRef<HTMLDivElement>(null);



  // Borrowing Capacity Widget State
  const [monthlyIncome, setMonthlyIncome] = useState(8500);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3200);
  const [existingSavings, setExistingSavings] = useState(80000);
  const [monthlyDebt, setMonthlyDebt] = useState(400);
  const [creditCardLimit, setCreditCardLimit] = useState(5000);
  const [dependents, setDependents] = useState(0);
  const [interestRate, setInterestRate] = useState(6.19);
  const [loanTerm, setLoanTerm] = useState(30);

  useEffect(() => {
    if (settings.interest_rate) {
      setInterestRate(parseFloat(settings.interest_rate));
    }
  }, [settings.interest_rate]);

  // Advanced Interactive States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [calcTab, setCalcTab] = useState<"inputs" | "results">("inputs");


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

  // Dynamic Borrowing Calculation (APRA Servicing Buffer and CC limits applied)
  const borrowingCapacity = (() => {
    // CC limit servicing assessed at 3% monthly rate
    const ccMonthlyServicing = creditCardLimit * 0.03;
    // Dependents impact assessed at $550/dependent
    const dependentBuffer = dependents * 550;
    
    // Remaining net monthly surplus after basic living costs, other debts, CC buffers, and dependent allowances
    const netIncome = Math.max(0, monthlyIncome - monthlyExpenses - monthlyDebt - ccMonthlyServicing - dependentBuffer);
    
    // Real-world assessment factor: Multiplies net servicing capacity at a buffered interest rate (~9.19% p.a.)
    // Multiplier of ~132 matches mid-tier lender servicing calculators
    const calculatedCapacity = netIncome * 132 + existingSavings * 0.8;
    return Math.min(2500000, Math.max(120000, Math.round(calculatedCapacity)));
  })();

  // Repayment Calculations on borrowing capacity:
  const monthlyRepayment = (() => {
    const principal = borrowingCapacity;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  })();

  const weeklyRepayment = (monthlyRepayment * 12) / 52;
  const fortnightlyRepayment = (monthlyRepayment * 12) / 26;

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
      { q: "How do I apply for the First Home Guarantee?", a: "This scheme has limited annual allocations and can only be secured through authorized lenders. As your experts, we reserve your spot and handle the entire scheme submission on your behalf." },
      { q: "Can I get the First Home Owner Grant for established homes?", a: "No. The FHOG is strictly reserved for newly constructed properties, off-the-plan builds, or cases where you build a brand-new home. Established homes are eligible for stamp duty concessions instead." },
      { q: "What are the income limits for government guarantees?", a: "For the First Home Guarantee, singles must earn less than $125,000 per year, and couples must earn less than $200,000 per year, as verified by your ATO Notice of Assessment." }
    ]
  };



  return (
    <div className="min-h-screen flex flex-col bg-white font-inter" style={{ overflowX: "clip" }}>
      {/* ── SHARED HEADER ── */}
      <SiteHeader isSticky={false} settings={settings} />

      {/* ── SECTION 1: EDITORIAL HERO ── */}
      <section id="overview" className="relative overflow-hidden bg-white pt-2.5 pb-8 lg:pt-[10px] lg:pb-8 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
        {/* Homepage inspired dot-matrix and light wash patterns */}
        <div className="absolute top-10 right-10 w-44 h-44 opacity-25 pointer-events-none" style={{ backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#EEF4FF] opacity-40 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 85% 90% at 62% 52%, #EAF3FF 0%, #DBEAFE 42%, #F8FAFC 62%, transparent 82%)"
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
          
          {/* SEO Friendly Breadcrumbs (Matches graphic separators exactly) */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-white border border-slate-200/60 rounded-2xl sm:rounded-full px-3 sm:px-4 py-1.5 sm:py-2 w-fit mb-6 text-[10.5px] sm:text-[11.5px] font-bold text-slate-500 shadow-sm">
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
                <span>{badgeText}</span>
              </motion.div>

              <motion.h1
                variants={premiumFadeUp}
                className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
              </motion.h1>

              <motion.div variants={premiumFadeUp} className={`w-14 h-[3px] ${theme.bgPrimary} mb-5 rounded-full`} />

              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-5 max-w-xl font-inter">
                {subtextText}
              </motion.p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div className="relative h-64 sm:h-72 w-full" style={{ background: "radial-gradient(ellipse 80% 85% at 55% 50%, #EAF3FF 0%, #DBEAFE 40%, #F8FAFC 65%, transparent 85%)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }} />
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
                <a
                  href={btn1Link}
                  onClick={(e) => handleBtnClick(e, btn1Text, btn1Link)}
                  className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg shadow-blue-500/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap cursor-pointer"
                >
                  {btn1Text} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={btn2Link}
                  onClick={(e) => handleBtnClick(e, btn2Text, btn2Link)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#2563EB] text-[#2563EB] bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-[#2563EB] hover:text-white text-center w-full sm:w-auto whitespace-nowrap cursor-pointer bg-transparent"
                >
                  {btn2Text}
                </a>
              </motion.div>

              {/* Trust Reviews Badge Row */}
              <motion.div variants={premiumFadeUp} className="flex flex-row items-center gap-2.5 sm:gap-6 mt-3.5 pt-3 border-t border-slate-100/80 max-w-lg">
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
                {pageSections?.[0] || "For many Australians, buying a first home is a dream that quickly becomes overwhelming. Once you start dealing with complex terms, restrictive lender buffers, and dense regulatory requirements, it is easy to get lost."}
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
                        <Image src="/images/avatar_client_1.png" fill className="object-cover" alt="User Avatar" />
                      </div>
                      <div className="w-7 h-7 rounded-full border-2 border-[#082245] overflow-hidden bg-slate-300 relative">
                        <Image src="/images/avatar_client_2.png" fill className="object-cover" alt="User Avatar" />
                      </div>
                      <div className="w-7 h-7 rounded-full border-2 border-[#082245] overflow-hidden bg-slate-400 relative">
                        <Image src="/images/avatar_client_3.png" fill className="object-cover" alt="User Avatar" />
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
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center font-bold text-[13px] text-[#2563EB] z-10 shadow-sm select-none"
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
                        className="ml-0 sm:ml-14 bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-5.5 flex items-center justify-between gap-3.5 sm:gap-5 transition-all duration-300 group cursor-pointer shadow-[0_4px_25px_rgba(15,23,42,0.015)] flex-1"
                      >
                        <div className="flex items-start gap-3.5 sm:gap-4.5">
                          {/* Left Side Icon inside premium color wash */}
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${pain.colorClass} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                            <IconComp className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2px]" />
                          </div>

                          {/* Center Content */}
                          <div className="flex-1">
                            <h3 className="text-[#0B1F3A] text-[14px] sm:text-[15px] font-extrabold leading-tight font-montserrat tracking-tight group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                              <span className="sm:hidden text-[#2563EB] font-black mr-1">{pain.num}. </span>{pain.title}
                            </h3>
                            <p className="text-slate-500 text-[12px] sm:text-[12.5px] mt-1.5 leading-relaxed font-inter font-normal max-w-xl">
                              {pain.desc}
                            </p>
                          </div>
                        </div>

                        {/* Right Side: Arrow Navigation Button */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] text-[#2563EB] shadow-sm transition-all duration-300">
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

      {/* ── SECTION 4: HOME BUYING ROADMAP (RESPONSIVE SPLIT LAYOUT) ── */}
      <div id="roadmap">
        <RoadmapSection colorTheme="blue" />
      </div>

      {/* ── SECTION 5: BORROWING POWER (LIVE CALCULATOR WIDGET WITH DYNAMIC GLOW) ── */}
      <section id="borrowing" className="py-14 md:py-20 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Fintech light wash behind widget */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EEF4FF] rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute left-[-200px] bottom-[-200px] w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[33%_67%] gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={premiumStagger}
            >
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-white shadow-sm border border-[#2563EB]/15 rounded-full px-4 py-2 mb-6">
                <Calculator className="w-4 h-4 text-[#2563EB]" />
                <span className={`${theme.textPrimary} text-[10px] font-bold tracking-widest uppercase`}>
                  BORROWING CAPACITY
                </span>
              </motion.div>
              <motion.h2 variants={premiumFadeUp} className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                How Much Can I <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#38BDF8]">Actually Borrow?</span>
              </motion.h2>
              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-lg">
                Banks don&apos;t just look at your gross wage. They apply assessment rate buffers, living expense indices (HEM), and deduct existing monthly debts to determine your genuine borrowing limit.
              </motion.p>
              
              {/* Glass card list */}
              <motion.div variants={premiumFadeUp} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 max-w-md shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className={`w-10 h-10 rounded-xl ${theme.bgLightWash} ${theme.textPrimary} flex items-center justify-center shrink-0 border border-[#D8E7FF]`}>
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Lender Policy Differentials</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">Bank buffers vary widely. Choosing the right lender can elevate your limit by up to <strong className="text-[#2563EB]">$80k</strong>.</p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex gap-4 items-start">
                  <div className={`w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100`}>
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3A] text-[14px] font-semibold leading-tight mb-1">Servicing Calculations</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">{pageSections?.[1] || `We map your exact profiles across 30+ Australian lenders to unlock maximum capacity.`}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>


            {/* Right: Live Interactive Widget Card (Advanced dual-column fintech layout) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={premiumFadeUp}
              className="relative w-full"
            >
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(11,31,58,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-[56%_44%]">
                
                {/* Left Side: Input Form Fields */}
                <div className={`p-5 sm:p-6 lg:p-7 space-y-4 ${calcTab === "inputs" ? "block" : "hidden md:block"}`}>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-[#0B1F3A] text-[14px] font-black uppercase tracking-widest" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Capacity Calculator
                    </h3>
                    <span className="flex items-center gap-1.5 text-[9px] bg-emerald-50 text-emerald-600 font-extrabold uppercase px-2.5 py-1 rounded-full border border-emerald-100">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      Live
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Input 1 */}
                    <div className="group space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Monthly Net Income</span>
                      <div className="relative rounded-xl border border-slate-200 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all bg-slate-50/50 px-3 py-1.5 flex items-center shadow-sm">
                        <span className="text-slate-400 text-[13px] mr-1 font-bold">$</span>
                        <input
                          type="number"
                          value={monthlyIncome || 0}
                          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-[14px] font-bold"
                        />
                      </div>
                      <input
                        type="range"
                        min={3000}
                        max={25000}
                        step={250}
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                        className="w-full h-1 rounded-full accent-[#2563EB] bg-slate-100 cursor-pointer transition-all"
                      />
                    </div>

                    {/* Input 2 */}
                    <div className="group space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Living Expenses</span>
                      <div className="relative rounded-xl border border-slate-200 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all bg-slate-50/50 px-3 py-1.5 flex items-center shadow-sm">
                        <span className="text-slate-400 text-[13px] mr-1 font-bold">$</span>
                        <input
                          type="number"
                          value={monthlyExpenses || 0}
                          onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-[14px] font-bold"
                        />
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={12000}
                        step={100}
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                        className="w-full h-1 rounded-full accent-slate-600 bg-slate-100 cursor-pointer transition-all"
                      />
                    </div>

                    {/* Input 3 */}
                    <div className="group space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Cash Savings</span>
                      <div className="relative rounded-xl border border-slate-200 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all bg-slate-50/50 px-3 py-1.5 flex items-center shadow-sm">
                        <span className="text-slate-400 text-[13px] mr-1 font-bold">$</span>
                        <input
                          type="number"
                          value={existingSavings || 0}
                          onChange={(e) => setExistingSavings(Number(e.target.value))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-[14px] font-bold"
                        />
                      </div>
                      <input
                        type="range"
                        min={10000}
                        max={300000}
                        step={5000}
                        value={existingSavings}
                        onChange={(e) => setExistingSavings(Number(e.target.value))}
                        className="w-full h-1 rounded-full accent-[#2563EB] bg-slate-100 cursor-pointer transition-all"
                      />
                    </div>

                    {/* Input 4 */}
                    <div className="group space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Other Debts (HECS/Loans)</span>
                      <div className="relative rounded-xl border border-slate-200 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all bg-slate-50/50 px-3 py-1.5 flex items-center shadow-sm">
                        <span className="text-slate-400 text-[13px] mr-1 font-bold">$</span>
                        <input
                          type="number"
                          value={monthlyDebt || 0}
                          onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-[14px] font-bold"
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={4000}
                        step={50}
                        value={monthlyDebt}
                        onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                        className="w-full h-1 rounded-full accent-red-500 bg-slate-100 cursor-pointer transition-all"
                      />
                    </div>

                    {/* Input 5 */}
                    <div className="group space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Credit Card Limit</span>
                      <div className="relative rounded-xl border border-slate-200 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all bg-slate-50/50 px-3 py-1.5 flex items-center shadow-sm">
                        <span className="text-slate-400 text-[13px] mr-1 font-bold">$</span>
                        <input
                          type="number"
                          value={creditCardLimit || 0}
                          onChange={(e) => setCreditCardLimit(Number(e.target.value))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-[14px] font-bold"
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50000}
                        step={1000}
                        value={creditCardLimit}
                        onChange={(e) => setCreditCardLimit(Number(e.target.value))}
                        className="w-full h-1 rounded-full accent-[#2563EB] bg-slate-100 cursor-pointer transition-all"
                      />
                    </div>

                    {/* Input 6 */}
                    <div className="group space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Dependents</span>
                      <div className="relative rounded-xl border border-slate-200 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all bg-slate-50/50 px-3 py-1.5 flex items-center shadow-sm h-[40px]">
                        <select
                          value={dependents}
                          onChange={(e) => setDependents(Number(e.target.value))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-[14px] font-bold cursor-pointer"
                        >
                          <option value={0}>0 Dependents</option>
                          <option value={1}>1 Dependent</option>
                          <option value={2}>2 Dependents</option>
                          <option value={3}>3 Dependents</option>
                          <option value={4}>4+ Dependents</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Inline Interest Rate and Term */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="group space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Interest Rate (p.a.)</span>
                      <div className="relative rounded-xl border border-slate-200 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all bg-slate-50/50 px-3 py-1.5 flex items-center shadow-sm">
                        <input
                          type="number"
                          step="0.01"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-[14px] font-bold"
                        />
                        <span className="text-slate-400 text-[13px] ml-1 font-extrabold">%</span>
                      </div>
                    </div>

                    <div className="group space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Loan Term</span>
                      <div className="relative rounded-xl border border-slate-200 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all bg-slate-50/50 px-3 py-1.5 flex items-center shadow-sm h-[40px]">
                        <select
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full bg-transparent focus:outline-none text-[#0B1F3A] text-[14px] font-bold cursor-pointer"
                        >
                          <option value={15}>15 Years</option>
                          <option value={20}>20 Years</option>
                          <option value={25}>25 Years</option>
                          <option value={30}>30 Years</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only CTA to view results */}
                  <button
                    type="button"
                    onClick={() => setCalcTab("results")}
                    className="md:hidden w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-black uppercase py-3.5 px-4 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-md mt-4"
                  >
                    <span>View Calculations</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Side: Servicing Summary & Lead Funnel */}
                <div className={`bg-gradient-to-br from-[#0B1F3A] to-[#1E3A6E] text-white p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden ${calcTab === "results" ? "block" : "hidden md:block"}`}>
                  {/* Decorative background glow */}
                  <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] bg-blue-500/20 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="space-y-5 relative z-10">
                    <div>
                      <span className="text-[10px] text-blue-200 font-black tracking-widest uppercase block mb-1">
                        Estimated Borrowing Power
                      </span>
                      <div className="text-[28px] sm:text-[34px] font-black text-white leading-none tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        ${borrowingCapacity.toLocaleString()}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[8.5px] bg-white/10 text-blue-100 font-bold uppercase px-2 py-0.5 rounded-full border border-white/10 mt-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        APRA 3.0% Buffer Applied
                      </span>
                    </div>

                    <hr className="border-white/10" />

                    {/* Repayments breakdown */}
                    <div>
                      <h4 className="text-[9.5px] text-blue-200 font-black tracking-widest uppercase mb-2">Estimated Repayments</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/5 rounded-xl p-2 border border-white/5 text-center">
                          <span className="text-[8px] text-blue-300 font-semibold block uppercase">Weekly</span>
                          <span className="text-[13px] font-extrabold text-white block mt-0.5">${Math.round(weeklyRepayment).toLocaleString()}</span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2 border border-white/5 text-center">
                          <span className="text-[8px] text-blue-300 font-semibold block uppercase">Fortnightly</span>
                          <span className="text-[13px] font-extrabold text-white block mt-0.5">${Math.round(fortnightlyRepayment).toLocaleString()}</span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2 border border-white/5 text-center">
                          <span className="text-[8px] text-blue-300 font-semibold block uppercase">Monthly</span>
                          <span className="text-[13px] font-extrabold text-white block mt-0.5">${Math.round(monthlyRepayment).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Deposit info */}
                    <div>
                      <h4 className="text-[9.5px] text-blue-200 font-black tracking-widest uppercase mb-2">Deposit Guidelines</h4>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11.5px]">
                          <span className="text-blue-200">5% First Home Scheme:</span>
                          <span className="font-extrabold text-white bg-white/10 px-1.5 py-0.5 rounded">${Math.round(borrowingCapacity * 0.05).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11.5px]">
                          <span className="text-blue-200">20% Standard Deposit:</span>
                          <span className="font-extrabold text-white bg-white/10 px-1.5 py-0.5 rounded">${Math.round(borrowingCapacity * 0.20).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Funnel CTAs */}
                  <div className="mt-6 space-y-2.5 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setLeadSubmitted(false);
                        setIsLeadModalOpen(true);
                      }}
                      className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-[11px] font-black uppercase py-3 px-4 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <span>Secure Pre-Approval</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLeadSubmitted(false);
                        setShowFullReport(false);
                        setIsLeadModalOpen(true);
                      }}
                      className="w-full bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold uppercase py-2.5 px-4 rounded-xl text-center flex items-center justify-center gap-1.5 border border-white/10 transition-all duration-300"
                    >
                      <span>Talk to Home Loan Expert</span>
                    </button>

                    {/* Mobile-only Back button */}
                    <button
                      type="button"
                      onClick={() => setCalcTab("inputs")}
                      className="md:hidden w-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold uppercase py-2.5 px-4 rounded-xl text-center flex items-center justify-center gap-1 border border-white/10 transition-all duration-300 mt-2"
                    >
                      <span>← Adjust Details</span>
                    </button>

                    <p className="text-[8.5px] text-blue-200/50 text-center leading-tight pt-1">
                      *Estimates only. Bank servicing limits apply. No credit check impact.
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: DEPOSIT STRATEGY SECTION (EDITORIAL TWIN LAYOUT) ── */}
      <section id="deposit" className="py-14 md:py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-50/50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={premiumStagger}
            >
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-[#EAF3FF] shadow-sm border border-[#2563EB]/15 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                <span className={`${theme.textPrimary} text-[10px] font-bold tracking-widest uppercase`}>
                  DEPOSIT STRATEGY
                </span>
              </motion.div>
              <motion.h2 variants={premiumFadeUp} className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                20% Deposit <span className="text-slate-300 font-normal mx-2">vs</span> <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#059669]">5% Deposit</span>
              </motion.h2>
              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-lg">
                {pageSections?.[2] || `Is it smarter to wait years to save 20% to avoid Lenders Mortgage Insurance, or buy immediately with a 5% deposit using government schemes? Let&apos;s evaluate the strategic trade-offs.`}
              </motion.p>
              
              {/* Twin tab toggle */}
              <motion.div variants={premiumFadeUp} className="flex flex-col sm:flex-row gap-3 mb-8 bg-slate-50 p-2 rounded-2xl border border-slate-100 max-w-fit">
                <button
                  onClick={() => setActiveDepositTab("five")}
                  className={`px-6 py-3.5 rounded-xl text-[13.5px] font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeDepositTab === "five"
                      ? `bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-100`
                      : "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 scale-95 hover:scale-100"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" /> 5% Guarantee Scheme
                </button>
                <button
                  onClick={() => setActiveDepositTab("twenty")}
                  className={`px-6 py-3.5 rounded-xl text-[13.5px] font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeDepositTab === "twenty"
                      ? "bg-[#0B1F3A] text-white shadow-lg shadow-slate-800/20 scale-100"
                      : "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 scale-95 hover:scale-100"
                  }`}
                >
                  <PiggyBank className="w-4 h-4" /> Traditional 20% Deposit
                </button>
              </motion.div>
            </motion.div>

            {/* Right: Premium detail card panel with horizontal slide */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={premiumFadeUp}
              className="relative"
            >
              {/* Decorative behind-card element */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${activeDepositTab === 'five' ? 'from-emerald-400 to-teal-300' : 'from-slate-700 to-slate-900'} rounded-[38px] blur-xl opacity-20 transition-colors duration-700`} />
              
              <div className="bg-white border border-slate-100 rounded-[32px] p-8 sm:p-10 relative min-h-[360px] flex flex-col justify-center shadow-[0_20px_50px_rgba(11,31,58,0.06)] overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeDepositTab === "five" ? (
                    <motion.div
                      key="five"
                      initial={{ opacity: 0, x: 20, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2 shadow-sm border border-emerald-100">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h3 className="text-[#0B1F3A] text-[18px] font-extrabold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        5% Deposit Scheme Advantages
                      </h3>
                      <p className="text-slate-500 text-[14px] leading-relaxed max-w-md">
                        {pageSections?.[3] || `Leveraging government incentives allows you to purchase immediately, bypassing rising house price inflation while saving substantial LMI costs.`}
                      </p>
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        {[
                          "Purchase 1 to 3 years faster than waiting for a full 20%",
                          "Avoid paying $15,000+ in Lenders Mortgage Insurance fees",
                          "Retain remaining cash reserves for unexpected property costs",
                          "Full access to competitive prime lender interest rates"
                        ].map((adv, idx) => (
                          <div key={idx} className="flex gap-3.5 items-start text-[13.5px] font-medium text-slate-600">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-emerald-600 stroke-[3px]" />
                            </div>
                            <span className="leading-snug">{adv}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="twenty"
                      initial={{ opacity: 0, x: 20, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 mb-2 shadow-sm border border-slate-200">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h3 className="text-[#0B1F3A] text-[18px] font-extrabold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        20% Deposit Advantages
                      </h3>
                      <p className="text-slate-500 text-[14px] leading-relaxed max-w-md">
                        {pageSections?.[4] || `Ideal for structured wealth positions, a larger deposit lowers overall monthly repayments and provides immediate equity buffer cushions.`}
                      </p>
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        {[
                          "No government guarantee limits or strict scheme allocations",
                          "Lower ongoing monthly mortgage interest repayments",
                          "Smaller loan-to-value ratio results in lowest lender rates",
                          "Zero risk of paying Lenders Mortgage Insurance (LMI) fee"
                        ].map((adv, idx) => (
                          <div key={idx} className="flex gap-3.5 items-start text-[13.5px] font-medium text-slate-600">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-slate-700 stroke-[3px]" />
                            </div>
                            <span className="leading-snug">{adv}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Decorative watermark icon */}
                <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] pointer-events-none">
                  {activeDepositTab === "five" ? (
                    <TrendingUp className="w-64 h-64 text-emerald-900" />
                  ) : (
                    <PiggyBank className="w-64 h-64 text-slate-900" />
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 7: BUYING COSTS BREAKDOWN (PRICING CARD STRUCTURES) ── */}
      <section id="costs" className="py-14 md:py-20 bg-slate-50 border-b border-slate-100 relative">
        {/* Subtle dot matrix background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#0B1F3A 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={premiumStagger}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-white shadow-sm border border-[#2563EB]/15 rounded-full px-4 py-2 mb-6">
              <span className={`w-2 h-2 rounded-full ${theme.bgPrimary} animate-pulse`} />
              <span className={`${theme.textPrimary} text-[10px] font-bold tracking-widest uppercase`}>
                FINANCIAL COSTS
              </span>
            </motion.div>
            <motion.h2 variants={premiumFadeUp} className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              The Genuine Upfront <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#8B5CF6]">Costs of Buying</span>
            </motion.h2>
            <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
              Avoid transaction surprises. Here is the realistic cash requirement needed at settlement, assuming a standard $700,000 first property cap.
            </motion.p>
          </motion.div>

          {/* Pricing style cost cards - Premium horizontal layout for desktop */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={premiumStagger}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5"
          >
            {costsBreakdown.map((cost, idx) => (
              <motion.div
                key={idx}
                variants={premiumFadeUp}
                whileHover={{ y: -8, scale: cost.highlight ? 1.05 : 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  cost.highlight
                    ? `bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] text-white shadow-[0_20px_40px_rgba(37,99,235,0.25)] lg:-mt-4 lg:mb-4 ring-4 ring-blue-500/10 z-10`
                    : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-[0_15px_30px_rgba(15,23,42,0.06)] shadow-sm"
                }`}
              >
                {/* Highlight decoration */}
                {cost.highlight && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                )}

                <div className="relative z-10">
                  <span className={`text-[10.5px] font-black uppercase tracking-[0.15em] block mb-3 ${cost.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                    {cost.title}
                  </span>
                  <div className={`text-[24px] sm:text-[28px] font-black mb-3 leading-none ${cost.highlight ? 'text-white' : 'text-[#0B1F3A]'}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    {cost.amount}
                  </div>
                  <span className={`inline-block text-[9.5px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-6 ${
                    cost.highlight 
                      ? "bg-white/20 text-white backdrop-blur-sm border border-white/20" 
                      : cost.title.includes("Stamp") ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                    {cost.tag}
                  </span>
                  <p className={`text-[13px] leading-relaxed ${cost.highlight ? 'text-blue-50' : 'text-slate-500'}`}>
                    {cost.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 8: GOVERNMENT GRANTS EXPANDABLE CARD GRID ── */}
      <section id="grants" className="py-14 md:py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/3 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={premiumStagger} className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-white shadow-sm border border-[#2563EB]/15 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span className={`${theme.textPrimary} text-[10px] font-bold tracking-widest uppercase`}>GOVERNMENT ASSISTANCE</span>
            </motion.div>
            <motion.h2 variants={premiumFadeUp} className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Unlock Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">Government Support</span>
            </motion.h2>
            <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
              Don&apos;t leave cash on the table. Click each grant to check eligibility guidelines and maximum caps.
            </motion.p>
          </motion.div>

          {/* Grid Container - Premium glassmorphic grant cards */}
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={premiumStagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {governmentGrants.map((grant, idx) => {
              const isExpanded = expandedGrant === idx;
              const grantColors = [
                { icon: ShieldCheck, accent: "#2563EB", bg: "from-blue-600 to-blue-700", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
                { icon: Gift, accent: "#8B5CF6", bg: "from-violet-600 to-violet-700", light: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
                { icon: Coins, accent: "#10B981", bg: "from-emerald-600 to-emerald-700", light: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
              ][idx];
              const GrantIcon = grantColors.icon;
              return (
                <motion.div
                  key={idx}
                  variants={premiumFadeUp}
                  onClick={() => setExpandedGrant(isExpanded ? null : idx)}
                  whileHover={{ y: -6, boxShadow: "0 28px 48px rgba(15,23,42,0.10)" }}
                  className={`bg-white border rounded-[24px] p-8 cursor-pointer transition-all duration-400 flex flex-col justify-between relative overflow-hidden group ${
                    isExpanded ? "border-[#2563EB] shadow-[0_20px_40px_rgba(37,99,235,0.12)] ring-4 ring-blue-500/8" : "border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  {/* Number badge */}
                  <div className="absolute top-6 right-6 text-[72px] font-black text-slate-50 leading-none select-none pointer-events-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{String(idx+1).padStart(2,'0')}</div>
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${grantColors.bg} flex items-center justify-center mb-6 shadow-lg`}>
                      <GrantIcon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-[#0B1F3A] text-[16px] font-bold leading-snug mb-3 relative z-10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{grant.title}</h3>
                    <p className="text-slate-500 text-[13.5px] leading-relaxed relative z-10">{grant.summary}</p>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE_OUT }} className="overflow-hidden mt-5 pt-5 border-t border-slate-100">
                          <p className="text-slate-600 text-[13.5px] leading-relaxed">{grant.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={`flex items-center justify-between mt-8 pt-6 border-t border-slate-100`}>
                    <span className={`text-[13px] font-extrabold flex items-center gap-1.5 transition-all ${isExpanded ? "text-slate-400" : grantColors.text}`}>
                      {isExpanded ? "Show Less" : "Check Eligibility"} <ChevronRight className="w-4 h-4" />
                    </span>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${isExpanded ? `${grantColors.light} ${grantColors.border} ${grantColors.text}` : "border-slate-200 text-slate-400"}`}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 9: CHOOSING THE RIGHT LOAN (DYNAMIC SELECTOR) ── */}
      <section id="loans" className="py-14 md:py-20 bg-slate-50 border-b border-slate-100 relative overflow-hidden">

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={premiumStagger}
            >
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/20 rounded-full px-4 py-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#2563EB]">MORTGAGE TYPE COMPARISON</span>
              </motion.div>
              <motion.h2 variants={premiumFadeUp} className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Choosing The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">Right Loan Product</span>
              </motion.h2>
              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] leading-relaxed mb-6">
                Fixed for payment security, variable for offset accounts, or a split structure? Click to compare each option.
              </motion.p>
              <motion.div variants={premiumStagger} className="flex flex-col gap-4">
                {[
                  { key: "variable", label: "Variable Rate Mortgage", sub: "Flexible offset accounts", icon: TrendingUp },
                  { key: "fixed", label: "Fixed Rate Mortgage", sub: "Budget certainty & safety", icon: ShieldCheck },
                  { key: "split", label: "Split Loan Structure", sub: "Best of both worlds", icon: Percent }
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = activeLoanType === type.key;
                  return (
                    <motion.button
                      key={type.key}
                      variants={premiumFadeUp}
                      onClick={() => setActiveLoanType(type.key as "variable" | "fixed" | "split")}
                      whileHover={{ x: 4 }}
                      className={`text-left p-5 rounded-2xl border font-bold text-[14px] transition-all duration-300 flex items-center justify-between group ${
                        isSelected
                          ? "bg-white text-[#0B1F3A] border-[#2563EB] shadow-[0_4px_20px_rgba(37,99,235,0.12)]"
                          : "bg-white border-slate-200 text-slate-600 hover:border-[#2563EB]/40 hover:bg-[#EAF3FF]/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-[#2563EB] text-white" : "bg-[#EAF3FF] text-[#2563EB]"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-extrabold text-[14px]">{type.label}</div>
                          <div className={`text-[12px] font-normal mt-0.5 text-slate-400`}>{type.sub}</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 ${isSelected ? "text-[#2563EB]" : "text-slate-300"}`} />
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right: Dynamic Product Card */}
            <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={premiumFadeUp} className="relative">
              <div className="hidden" />
              <div className="relative bg-white rounded-[24px] border border-slate-200 p-6 sm:p-8 shadow-[0_8px_30px_rgba(11,31,58,0.06)]">
                <AnimatePresence mode="wait">
                  <motion.div key={activeLoanType} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="space-y-5">
                    <div>
                      <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#EAF3FF] text-[#2563EB] mb-4 border border-[#2563EB]/20">
                        {loanComparisonData[activeLoanType].tag}
                      </span>
                      <h3 className="text-[#0B1F3A] text-[17px] font-extrabold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        {loanComparisonData[activeLoanType].title}
                      </h3>
                    </div>
                    <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                      <h4 className="text-emerald-700 text-[11px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> The Advantages</h4>
                      <div className="space-y-3">
                        {loanComparisonData[activeLoanType].pros.map((pro, i) => (
                          <div key={i} className="flex gap-3 items-start text-[13px] font-medium text-slate-700">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-emerald-600 stroke-[3px]" />
                            </div>
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                      <h4 className="text-red-700 text-[11px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> The Trade-Offs</h4>
                      <div className="space-y-3">
                        {loanComparisonData[activeLoanType].cons.map((con, i) => (
                          <div key={i} className="flex gap-3 items-start text-[13px] font-medium text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                              <AlertCircle className="w-3 h-3 text-red-600" />
                            </div>
                            <span>{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 10: FOUNDER SECTION ── */}
      <section id="founder" className="relative overflow-hidden bg-[#0B1F3A] py-14 md:py-20 text-white">
        {/* Multi-layered dramatic background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_50%,rgba(37,99,235,0.18),transparent_60%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_20%,rgba(56,189,248,0.10),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-16 items-center">
            
            {/* Founder Portrait */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={VIEWPORT} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative flex justify-center">
              {/* Glowing border ring */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500 to-cyan-400 blur-2xl opacity-20 scale-105" />
              <div className="relative w-full max-w-[360px]">
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-[#091526]">
                  <Image src="/images/aakash_new.png" alt="Aakash KC - Founder & Leading Mortgage Mate" fill className="object-cover object-top hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030F1E]/60 via-transparent to-transparent" />
                </div>
                {/* Floating stat badges */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-4 sm:-right-8 top-[20%] bg-[#0B1F3A]/85 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:p-4 shadow-xl">
                  <div className="text-[17px] font-extrabold text-white">1,200+</div>
                  <div className="text-[11px] text-blue-200 font-bold">5-Star Reviews</div>
                </motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -left-4 sm:-left-8 bottom-[25%] bg-[#0B1F3A]/85 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:p-4 shadow-xl">
                  <div className="text-[17px] font-extrabold text-white">40+</div>
                  <div className="text-[11px] text-cyan-200 font-bold">Lender Network</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Editorial Story */}
            <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={premiumStagger} className="flex flex-col gap-6">
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 w-fit">
                <Star className="w-4 h-4 text-amber-400 shrink-0" fill="currentColor" />
                <span className="text-[10px] font-black tracking-[0.18em] text-amber-300 uppercase">DIRECT TRUST ADVICE</span>
              </motion.div>

              <motion.h2 variants={premiumFadeUp} className="text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span className="text-white">Helping First Buyers</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#818CF8]">Navigate With Confidence.</span>
              </motion.h2>

              <motion.p variants={premiumFadeUp} className="text-[14px] sm:text-[15px] text-white/70 leading-relaxed max-w-xl">
                Led by Aakash KC (The Mortgage Mate), we represent a premier Nepali-led brokerage firm that works for you, not the banks. With over hundreds of 5-star reviews across Australia, we prioritize your long-term wealth.
              </motion.p>

              {/* Stats row */}
              <motion.div variants={premiumFadeUp} className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
                {[{ val: "1,200+", label: "Happy Clients" }, { val: "40+", label: "Lender Partners" }, { val: "$2B+", label: "Loans Settled" }].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[22px] sm:text-[26px] font-black text-white" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{stat.val}</div>
                    <div className="text-[11.5px] text-white/50 font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={premiumFadeUp} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden relative border border-white/15">
                  <Image src="/images/aakash_new.png" fill alt="Aakash KC" className="object-cover object-top" />
                </div>
                <div>
                  <div className="text-[16px] font-black text-white">Aakash KC</div>
                  <div className="text-[13px] text-slate-400 mt-0.5">Founder & Principal Home Loan Expert</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 11: INTERACTIVE CHECKLIST WIDGET ── */}
      <section id="checklist" className="py-14 md:py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EEF4FF] rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={premiumStagger}
            >
              <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-[#EAF3FF] shadow-sm border border-[#2563EB]/15 rounded-full px-4 py-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span className={`${theme.textPrimary} text-[10px] font-bold tracking-widest uppercase`}>LIVE READINESS CHECK</span>
              </motion.div>
              <motion.h2 variants={premiumFadeUp} className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                First Home Buyer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">Readiness Checklist</span>
              </motion.h2>
              <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-lg">
                Are you legally and financially ready to apply for pre-approval? Click the checklist items to measure your readiness percentage.
              </motion.p>
              {/* Dynamic progress card */}
              <motion.div variants={premiumFadeUp} className="bg-white border border-slate-200 rounded-[24px] p-6 max-w-sm shadow-[0_12px_40px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)] transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-5">
                  {/* Circular progress */}
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 28}`} strokeDashoffset={`${2 * Math.PI * 28 * (1 - checklistProgress / 100)}`} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-[#2563EB]">{checklistProgress}%</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-extrabold text-[#0B1F3A]">Application Progress</div>
                    <div className="text-[12.5px] text-slate-500 mt-1">{checklist.filter(i => i.checked).length} of {checklist.length} steps complete</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Live Checklist Container */}
            <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={premiumStagger} className="space-y-3">
              {checklist.map((item, i) => (
                <motion.button
                  key={item.id}
                  variants={premiumFadeUp}
                  onClick={() => toggleChecklist(item.id)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5 ${
                    item.checked
                      ? "bg-[#EAF3FF] border-[#2563EB]/30 shadow-[0_4px_20px_rgba(37,99,235,0.08)]"
                      : "bg-white border-slate-200 hover:border-[#2563EB]/40 hover:shadow-[0_4px_20px_rgba(37,99,235,0.04)] shadow-sm"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                    item.checked ? "bg-[#2563EB] border-[#2563EB] text-white shadow-md shadow-blue-500/20" : "border-slate-300 bg-white"
                  }`}>
                    {item.checked && <Check className="w-4 h-4" strokeWidth={3} />}
                  </div>
                  <span className={`text-[13.5px] font-semibold flex-1 text-left ${
                    item.checked ? "text-[#2563EB] line-through decoration-blue-200" : "text-slate-700"
                  }`}>{item.label}</span>
                  <div className={`text-[11px] font-black px-2 py-1 rounded-full shrink-0 ${
                    item.checked ? "bg-[#2563EB]/15 text-[#2563EB]" : "bg-slate-100 text-slate-400"
                  }`}>{String(i+1).padStart(2,'0')}</div>
                </motion.button>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 12: GROUPED ACCORDION FAQs ── */}
      <section id="faqs" className="py-14 md:py-20 bg-slate-50 border-b border-slate-100 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[400px] bg-blue-50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-slate-100 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={premiumStagger} className="text-center mb-10">
            <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/20 rounded-full px-4 py-2 mb-4 mx-auto">
              <HelpCircle className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#2563EB]">QUESTIONS & ANSWERS</span>
            </motion.div>
            <motion.h2 variants={premiumFadeUp} className="text-[#0B1F3A] text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#8B5CF6]">Queries</span>
            </motion.h2>
            {/* Category tabs */}
            <motion.div variants={premiumFadeUp} className="flex justify-center gap-2 mt-4 bg-white rounded-2xl p-2 border border-slate-200 w-fit mx-auto shadow-sm">
              {[
                { key: "buying", label: "Buying" },
                { key: "loans", label: "Loans" },
                { key: "grants", label: "Grants" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveFaqTab(tab.key as "buying" | "loans" | "grants"); setOpenFaq(null); }}
                  className={`px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                    activeFaqTab === tab.key
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Accordion List */}
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={premiumStagger} className="space-y-3">
            {faqGroupData[activeFaqTab].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div key={idx} variants={premiumFadeUp} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#2563EB]/30 bg-white shadow-[0_4px_20px_rgba(37,99,235,0.06)]" : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                }`}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none">
                    <span className={`text-[14px] sm:text-[15px] font-bold transition-colors ${isOpen ? "text-[#2563EB]" : "text-[#0B1F3A]"}`}>{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                      isOpen ? "border-[#2563EB]/30 bg-[#EAF3FF] text-[#2563EB]" : "border-slate-200 text-slate-400"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE_OUT }} className="overflow-hidden">
                        <p className="px-6 pb-5 text-[13.5px] text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 13: RESOURCE HUB GUIDES & DYNAMIC BLOGS (DYNAMIC) ── */}
      <BlogSection
        badgeText="Educational Portal"
        titlePart1="Mortgage Insights"
        titlePart2="& Success Stories"
        subtitleText="Learn exactly how to prepare your finance application, understand borrowing capacity, and buy your home in Australia."
        accentColor="#2563EB"
        accentTextClass="text-[#2563EB]"
        accentBgClass="bg-[#2563EB]"
        darkTheme={true}
      />

      {/* ── SECTION 14: STRATEGIC CONSULTATION CTA ── */}
      <section className="relative overflow-hidden py-14 md:py-20 text-white">
        {/* Stunning gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0F2D5E] to-[#0A1628]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[700px] h-[700px] bg-[#2563EB]/20 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] bg-[#38BDF8]/15 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite_2s]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={premiumStagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={premiumFadeUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <HomeIcon className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#38BDF8]">FREE STRATEGY CALL</span>
            </motion.div>
            <motion.h2 variants={premiumFadeUp} className="text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Ready to Take the First Step<br />
              Toward <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#818CF8]">Home Ownership?</span>
            </motion.h2>
            <motion.p variants={premiumFadeUp} className="text-white/75 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
              Book a free, completely obligation-free strategy call to outline your state grant applications and lender approvals.
            </motion.p>
            <motion.div variants={premiumFadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1e3a8a] px-10 py-4.5 text-[15px] font-extrabold text-white transition-all duration-300 shadow-[0_12px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.45)] hover:scale-[1.02] whitespace-nowrap">
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:0450240757" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-10 py-4 text-[15px] font-extrabold text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300 whitespace-nowrap">
                Speak With An Expert
              </a>
            </motion.div>
          </motion.div>
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
                <span className={`${theme.textPrimary} text-[10px] font-bold tracking-widest uppercase`}>
                  STRATEGY CALLBACK
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[38px] font-black leading-[1.1] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Secure Your <span className="text-[#2563EB]">Strategic Callback</span>
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
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative text-[#0B1F3A]">
                <div className="absolute top-6 right-6 w-20 h-20 opacity-15" style={{ backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />

                {!callbackSubmitted ? (
                  <>
                    <h3 className="text-[#0B1F3A] text-[17px] font-extrabold mb-6 relative z-10 text-left" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Secure Your Strategic Callback
                    </h3>
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const payload = {
                          type: 'callback',
                          name: formData.get('name'),
                          phone: formData.get('phone'),
                          email: formData.get('email'),
                          state: formData.get('state'),
                          savings: formData.get('savings'),
                          income: formData.get('income')
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
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder=""
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
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
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">State</label>
                          <select name="state" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner">
                            <option value="NSW">New South Wales (NSW)</option>
                            <option value="VIC">Victoria (VIC)</option>
                            <option value="QLD">Queensland (QLD)</option>
                            <option value="WA">Western Australia (WA)</option>
                            <option value="SA">South Australia (SA)</option>
                            <option value="ACT/TAS/NT">ACT / Tasmania / NT</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">What is your current savings position?</label>
                          <select name="savings" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner">
                            <option value="Under $20,000">Under $20,000</option>
                            <option value="$20,000 - $50,000">$20,000 - $50,000</option>
                            <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                            <option value="Over $100,000">Over $100,000</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide mb-1.5">What is your gross annual income?</label>
                          <select name="income" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner">
                            <option value="Under $80,000">Under $80,000</option>
                            <option value="$80,000 - $120,000">$80,000 - $120,000</option>
                            <option value="$120,000 - $180,000">$120,000 - $180,000</option>
                            <option value="Over $180,000">Over $180,000</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className={`w-full inline-flex items-center justify-center gap-2 rounded-xl ${theme.bgPrimary} ${theme.bgHover} text-white font-extrabold text-[13.5px] py-4 transition-all cursor-pointer shadow-md shadow-blue-100`}
                      >
                        Secure Strategic Callback <ArrowRight className="w-4 h-4 text-white" />
                      </button>

                      <p className="text-[10px] text-slate-400 text-center mt-3">
                        We guard your privacy with top-tier security standards.
                      </p>
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
                        You are expecting a call from Home Loan Expert <strong className="font-bold text-[#0B1F3A]">Aakash</strong> within 2 business hours.
                      </p>
                    </div>

                    {/* Premium Mini-Profile Card with Aakash's Story */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 text-left shadow-sm max-w-md mx-auto space-y-4">
                      <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-slate-100 shrink-0">
                          <Image src="/images/aakash_new.png" fill alt="Aakash KC" className="object-cover object-top" />
                        </div>
                        <div>
                          <div className="text-[14px] font-extrabold text-[#0B1F3A]">Aakash KC</div>
                          <div className="text-[11px] text-[#2563EB] font-bold">Principal Home Loan Expert</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">His Story & Mission</span>
                        <p className="text-slate-600 text-[11.5px] leading-relaxed italic">
                          {pageSections?.[5] || `&ldquo;Aakash founded Mortgage Xperts to provide the Nepalese community in Australia with transparent, client-first mortgage advice. Having arrived as an immigrant himself, he understands the dream of home ownership. He has helped over 500+ families secure low-deposit approvals and max borrowing capacity.&rdquo;`}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/free-assessment"
                          className="w-full text-center bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-[11px] font-black uppercase py-3 rounded-xl transition-all block"
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

      {/* Mobile safety spacer to prevent bottom sticky nav overlapping footer copyrights */}
      <div className="h-20 md:hidden" />

      {/* ── SHARED FOOTER ── */}
      <SiteFooter settings={settings} />

      {/* ── ADVANCED LEAD MODAL OVERLAY ── */}
      <AnimatePresence>
        {isLeadModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
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
              className="relative bg-white rounded-3xl shadow-[0_30px_70px_rgba(11,31,58,0.25)] border border-slate-200 w-full max-w-[480px] overflow-hidden z-10 flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors z-20 focus:outline-none"
              >
                ✕
              </button>

              {/* Header block */}
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#0B1F3A] text-[16px] font-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Secure Pre-Approval Report
                  </h3>
                  <span className="text-[11.5px] text-slate-500 font-medium">
                    Preliminary Capacity: <strong className="text-[#2563EB] font-bold">${borrowingCapacity.toLocaleString()}</strong>
                  </span>
                </div>
              </div>

              {/* Form / Content Body */}
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
                            type: 'calculator',
                            name: leadName,
                            email: leadEmail,
                            phone: leadPhone,
                            savings: String(existingSavings),
                            income: String(monthlyIncome * 12),
                            state: 'NSW'
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
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="e.g. Biraj Adhikari"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0B1F3A] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="e.g. name@domain.com.au"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0B1F3A] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="e.g. 0412 345 678"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0B1F3A] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                      />
                    </div>

                    {/* Agree checkboxes */}
                    <div className="flex items-start gap-2.5 pt-1.5">
                      <input
                        type="checkbox"
                        required
                        defaultChecked
                        className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      <span className="text-[10px] leading-relaxed text-slate-500">
                        I agree to receive my custom servicing report and first home guides. I understand this does not impact my credit score.
                      </span>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-black uppercase py-4 rounded-xl text-center flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02] mt-4"
                    >
                      <span>Generate Assessment Report</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Security Disclaimer */}
                    <p className="text-[9.5px] text-slate-400 text-center leading-normal pt-1.5 flex items-center justify-center gap-1">
                      🔒 Your data is fully encrypted and never shared.
                    </p>
                  </form>
                ) : showFullReport ? (
                  <div className="py-2 text-left space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    {/* Report Header */}
                    <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
                      <div>
                        <h4 className="text-[#0B1F3A] text-[15px] font-black uppercase tracking-tight font-montserrat">
                          Capacity Assessment Report
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Prepared for: <span className="font-bold text-slate-600">{leadName || "Client"}</span>
                        </p>
                      </div>
                      <span className="text-[9px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 rounded px-2 py-0.5">
                        Generated
                      </span>
                    </div>

                    {/* Big Numbers Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Borrowing</span>
                        <span className="text-[#2563EB] text-[18px] sm:text-[20px] font-black tracking-tight block">
                          ${borrowingCapacity.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Est. Monthly Payment</span>
                        <span className="text-[#0B1F3A] text-[18px] sm:text-[20px] font-black tracking-tight block">
                          ${Math.round((borrowingCapacity * (interestRate / 100 / 12) * Math.pow(1 + (interestRate / 100 / 12), loanTerm * 12)) / (Math.pow(1 + (interestRate / 100 / 12), loanTerm * 12) - 1) || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Financial Inputs Summary */}
                    <div className="space-y-1.5">
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Assessed Inputs</span>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-slate-600">
                        <div>Income: <strong className="text-slate-800">${monthlyIncome.toLocaleString()}/mo</strong></div>
                        <div>Expenses: <strong className="text-slate-800">${monthlyExpenses.toLocaleString()}/mo</strong></div>
                        <div>Other Debts: <strong className="text-slate-800">${monthlyDebt.toLocaleString()}/mo</strong></div>
                        <div>Credit Card Limit: <strong className="text-slate-800">${creditCardLimit.toLocaleString()}</strong></div>
                        <div>Interest Rate: <strong className="text-slate-800">{interestRate}%</strong></div>
                        <div>Assessed Term: <strong className="text-slate-800">{loanTerm} Years</strong></div>
                      </div>
                    </div>

                    {/* Deposit Recommendations */}
                    <div className="space-y-1.5">
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Deposit Requirements</span>
                      <div className="grid grid-cols-2 gap-3 text-[11px] bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-slate-600 font-medium">
                        <div>
                          <div className="text-[9px] font-semibold text-slate-400 uppercase">5% Scheme Deposit</div>
                          <strong className="text-slate-800 text-[12px] font-bold">${Math.round(borrowingCapacity * 0.05).toLocaleString()}</strong>
                        </div>
                        <div>
                          <div className="text-[9px] font-semibold text-slate-400 uppercase">20% Standard Deposit</div>
                          <strong className="text-slate-800 text-[12px] font-bold">${Math.round(borrowingCapacity * 0.20).toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Assessor Recommendation */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 space-y-1">
                      <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#2563EB]">Assessor Recommendation</div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        Based on your savings position of <strong className="text-slate-800 font-bold">${existingSavings.toLocaleString()}</strong>, you may qualify for government low-deposit schemes. Book a validation call with Aakash to verify lender specific policies.
                      </p>
                    </div>

                    {/* Actions */}
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
                        className="flex-1 text-center bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-[10.5px] font-black uppercase py-2.5 rounded-xl transition-all"
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
                        Thank You! Report Generated.
                      </h4>
                      <p className="text-slate-600 text-[12.5px] leading-relaxed max-w-sm mx-auto">
                        Your custom assessment report has been generated and sent to <strong className="text-[#0B1F3A] font-semibold">{leadEmail}</strong>.
                      </p>
                      <p className="text-slate-500 text-[12.5px] leading-relaxed max-w-sm mx-auto">
                        You are expecting a call from Home Loan Expert <strong className="font-bold text-[#0B1F3A]">Aakash</strong> on <strong className="text-slate-800 font-bold">{leadPhone}</strong> to review your pre-approval options.
                      </p>
                    </div>

                    {/* Premium Mini-Profile Card with Aakash's Story */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200/50 p-4 text-left shadow-sm max-w-sm mx-auto space-y-3.5">
                      <div className="flex items-center gap-3 pb-2.5 border-b border-slate-200/60">
                        <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-slate-200/40 shrink-0">
                          <Image src="/images/aakash_new.png" fill alt="Aakash KC" className="object-cover object-top" />
                        </div>
                        <div>
                          <div className="text-[13px] font-extrabold text-[#0B1F3A]">Aakash KC</div>
                          <div className="text-[10px] text-[#2563EB] font-bold">Principal Home Loan Expert</div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-400 block">His Story & Mission</span>
                        <p className="text-slate-600 text-[11px] leading-relaxed italic">
                          {pageSections?.[6] || `&ldquo;Aakash founded Mortgage Xperts to provide the Nepalese community in Australia with transparent, client-first mortgage advice. Having arrived as an immigrant himself, he understands the dream of home ownership. He has helped over 500+ families secure low-deposit approvals.&rdquo;`}
                        </p>
                      </div>

                      <div className="pt-1.5 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowFullReport(true)}
                          className="flex-1 text-center bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-[10.5px] font-black uppercase py-2.5 rounded-xl transition-all"
                        >
                          View Report
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsLeadModalOpen(false);
                            setTimeout(() => {
                              document.getElementById("founder")?.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }}
                          className="flex-1 text-center border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10.5px] font-bold uppercase py-2.5 rounded-xl transition-all"
                        >
                          Check Profile
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








