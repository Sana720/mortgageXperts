"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Search,
  Phone,
  ArrowRight,
  Shield,
  Star,
  TrendingUp,
  Percent,
  Home as HomeIcon,
  ChevronDown,
  Building2,
  PiggyBank,
  Settings,
  Heart,
  FileText,
  User,
  Calendar,
  HelpCircle,
  MessageCircle,
  Plus,
  Minus,
  Clock,
  BarChart3,
  BookOpen,
  ChevronRight,
  Lock,
  Calculator,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  VIEWPORT,
  VIEWPORT_LOOSE,
  EASE_OUT,
  motionCardHover,
  motionCardShadow,
  Stagger,
  StaggerItem,
  Reveal,
} from "@/lib/motion";

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
const IconWallet = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
    <path d="M16 12h5v4h-5a2 2 0 0 1 0-4z" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M16 11l2 2 4-4" />
  </svg>
);
const IconHammer = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 12-8.5 8.5a2.121 2.121 0 1 1-3-3L12 9" />
    <path d="M17.64 15 22 10.64" />
    <path d="m20.91 11.7-1.25-1.25c.037-.055.07-.112.1-.171l1.069-2.137c.27-.541.153-1.19-.289-1.607l-2.43-2.242a1.308 1.308 0 0 0-1.65-.116l-2.137 1.069c-.06.03-.117.062-.172.1L13 4.09" />
  </svg>
);



const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-1.15-1.02-1.92-2.48-2.18-3.99-.02.72-.01 1.44-.02 2.15-.05 4.18.06 8.39-.06 12.57-.15 2.1-1.04 4.17-2.73 5.48-1.74 1.4-4.17 1.93-6.38 1.62-2.3-.23-4.52-1.53-5.69-3.56-1.3-2.17-1.41-5-.36-7.17 1.01-2.19 3.25-3.8 5.67-4.01v4.2c-1.2.14-2.45.89-2.99 2.02-.63 1.27-.47 2.97.45 4.02.82.97 2.16 1.36 3.39 1.08 1.25-.23 2.37-1.3 2.58-2.58.17-1.63.1-3.28.12-4.93V.02z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function FooterNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-1.5 text-[12.5px] text-slate-300 hover:text-white transition-colors leading-snug">
      <ChevronRight className="w-3 h-3 text-[#2563EB] shrink-0" strokeWidth={2.5} />
      <span>{children}</span>
    </Link>
  );
}

function FooterColumnCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#38BDF8] hover:underline mt-3">
      {children}
      <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  );
}

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.12h4.03a12.06 12.06 0 0 0 3.51-8.74z" />
    <path fill="#34A853" d="M12 24a11.59 11.59 0 0 0 8.05-2.91l-4.03-3.12a7.22 7.22 0 0 1-10.02-3.83H1.85v3.23A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M6 14.14a7.11 7.11 0 0 1 0-4.28V6.63H1.85a12 12 0 0 0 0 10.74L6 14.14z" />
    <path fill="#EA4335" d="M12 4.75a6.48 6.48 0 0 1 4.59 1.77L19.78 3.3A11.83 11.83 0 0 0 12 0 12 0 0 0 1.85 6.63L6 9.86A7.2 7.2 0 0 1 12 4.75z" />
  </svg>
);

type SmartToolItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  iconColorClass?: string;
  iconBgClass?: string;
};

function SmartToolCard({ tool }: { tool: SmartToolItem }) {
  const iconColor = tool.iconColorClass || 'text-[#1D63F1]';
  const iconBg = tool.iconBgClass || 'border-[#E1EDFF] bg-[#F3F8FF]';

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="group flex items-start gap-3.5 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
    >
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconColor} ${iconBg}`}>
        {tool.icon}
      </div>
      <div className="min-w-0">
        <div className="text-[14px] font-extrabold text-[#0B1F3A] leading-tight">{tool.title}</div>
        <div className="text-[12px] text-slate-500 leading-snug mt-1">{tool.desc}</div>
      </div>
      <ArrowRight className={`w-4 h-4 ml-auto mt-1 shrink-0 group-hover:translate-x-0.5 transition-transform ${iconColor}`} />
    </motion.div>
  );
}

type ProcessStepItem = {
  num: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

function ProcessStepCard({ step }: { step: ProcessStepItem }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="flex flex-col items-center text-center px-2"
    >
      <div className="w-[68px] h-[68px] rounded-full border border-[#E2ECFF] bg-white shadow-[0_6px_20px_rgba(37,99,235,0.08)] text-[#1D63F1] flex items-center justify-center relative mb-3">
        {step.icon}
        <div className="absolute -left-1 -bottom-1 w-5 h-5 rounded-full bg-[#1D63F1] text-white text-[10px] font-black flex items-center justify-center">
          {step.num}
        </div>
      </div>
      <div className="text-[14px] font-extrabold text-[#0B1F3A] leading-tight">{step.title}</div>
      <div className="text-[12px] text-slate-500 leading-snug mt-1.5 max-w-[160px]">{step.desc}</div>
    </motion.div>
  );
}

// ── SMART TOOLS + PROCESS SECTION ────────────────────────────────────────────
function SmartToolsSection() {
  const [loanAmount, setLoanAmount] = useState(600000);
  const [interestRate, setInterestRate] = useState(5.49);
  const [loanTerm, setLoanTerm] = useState(30);

  const monthlyPayment = (() => {
    const principal = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  })();

  const tools: SmartToolItem[] = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /><line x1="8" y1="17" x2="12" y2="17" /></svg>,
      title: "Repayment Calculator", desc: "Estimate your monthly repayments in seconds.",
      iconColorClass: "text-[#2563EB]", iconBgClass: "bg-blue-50 border-blue-100"
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 3.5 3.5" /><path d="M11 8v3l2 2" /></svg>,
      title: "Borrowing Power Calculator", desc: "Find out how much you can borrow.",
      iconColorClass: "text-[#8B5CF6]", iconBgClass: "bg-violet-50 border-violet-100"
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 6v6l4 2" /></svg>,
      title: "Stamp Duty Calculator", desc: "Estimate your stamp duty costs.",
      iconColorClass: "text-[#059669]", iconBgClass: "bg-emerald-50 border-emerald-100"
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
      title: "Extra Repayment Calculator", desc: "See how extra payments could save you more.",
      iconColorClass: "text-[#D97706]", iconBgClass: "bg-amber-50 border-amber-100"
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><rect x="3" y="3" width="8" height="18" rx="1" /><rect x="13" y="3" width="8" height="18" rx="1" /></svg>,
      title: "Compare Loans", desc: "Compare loan features, rates and fees side by side.",
      iconColorClass: "text-[#db2777]", iconBgClass: "bg-pink-50 border-pink-100"
    },
  ];

  const steps: ProcessStepItem[] = [
    { num: 1, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>, title: "Book a Consultation", desc: "Tell us your goals in a quick, obligation-free chat." },
    { num: 2, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 3.5 3.5" /><path d="M8 11h6M11 8v6" /></svg>, title: "We Research & Compare", desc: "We compare 40+ lenders to find your best options." },
    { num: 3, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" /><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>, title: "We Recommend", desc: "Get expert advice and a clear recommendation." },
    { num: 4, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>, title: "We Handle the Paperwork", desc: "We manage the process from start to settlement." },
    { num: 5, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg>, title: "You Move Forward", desc: "Settle with confidence and focus on what is next." },
  ];

  return (
    <section className="bg-white py-14 md:py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* TOP HERO ROW */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 mb-6 relative w-full pt-4">
          {/* Left: Text */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VIEWPORT}
            variants={staggerContainer}
            className="w-full lg:w-[38%] flex flex-col gap-3 z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-[#F0F5FF] text-[#2563EB] rounded-full px-3 py-1 w-fit">
              <TrendingUp className="w-3 h-3" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Smart Tools</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-[34px] md:text-[46px] font-extrabold leading-[1.05] text-[#0B1F3A]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Powerful Tools.<br />
              <span className="text-[#2563EB]">Smarter</span> Decisions.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed max-w-[360px]">
              Use our easy-to-use tools and calculators to explore your options, estimate costs and plan your next move with confidence.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-2">
              <Link href="#" className="bg-[#2563EB] text-white font-bold text-[13px] py-3.5 px-7 rounded-lg inline-flex items-center gap-2 hover:bg-[#1d4ed8] transition-all shadow-md hover:scale-[1.02]">
                Explore All Tools <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Calculator + Image Area */}
          <div className="w-full lg:w-[62%] relative flex justify-end items-center h-[380px] sm:h-[420px] lg:h-[480px] mt-8 lg:mt-0">
            {/* The abstract background blob */}
            <div className="absolute inset-0 right-0 w-[105%] lg:w-[110%] bg-[#F0F6FF] rounded-[30px] -z-10" style={{ right: "-5%" }}>
              <div className="absolute top-6 right-8 w-32 h-32 opacity-30" style={{ backgroundImage: "radial-gradient(#2563EB 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white opacity-50 rounded-full blur-2xl" />
            </div>

            {/* The House Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="relative w-full lg:w-[95%] h-full z-0 ml-auto"
            >
              <Image src="/images/smart_tools_house.png" alt="Home" fill className="object-contain object-bottom md:object-right-bottom mix-blend-multiply scale-[1.12] origin-bottom lg:origin-bottom-right" />
            </motion.div>

            {/* The Compact Calculator Card (overlapping on the left) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
              className="absolute left-0 lg:left-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(11,31,58,0.15)] border border-slate-100 p-5 w-[260px] sm:w-[290px] z-10"
            >
              <div className="text-[14px] font-bold text-[#0B1F3A] mb-4">Repayment Calculator</div>

              <div className="space-y-3.5">
                {/* Loan Amount */}
                <div>
                  <div className="text-[10px] text-slate-400 font-medium mb-0.5">Home Loan Amount</div>
                  <div className="text-[18px] font-black text-[#2563EB] mb-1">${loanAmount.toLocaleString()}</div>
                  <input type="range" min={100000} max={2000000} step={10000} value={loanAmount}
                    onChange={e => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#2563EB] h-1.5 rounded-full"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1"><span>$100K</span><span>$2M</span></div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="text-[10px] text-slate-400 font-medium mb-0.5">Interest Rate (p.a.)</div>
                  <div className="text-[18px] font-black text-[#2563EB] mb-1">{interestRate.toFixed(2)}%</div>
                  <input type="range" min={2} max={12} step={0.01} value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#2563EB] h-1.5 rounded-full"
                  />
                </div>

                {/* Loan Term */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="text-[10px] text-slate-400 font-medium">Loan Term</div>
                  <div className="relative w-28">
                    <select value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-md px-3 py-1.5 text-[12px] font-semibold text-[#2563EB] appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]/20">
                      {[10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} years</option>)}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Result Box */}
                <div className="bg-[#F4F9FF] rounded-lg p-3 border border-[#EBF5FF] mt-2">
                  <div className="text-[10px] text-slate-400 font-medium mb-0.5">Estimated Repayment</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[24px] font-black text-[#0B1F3A]">${Math.round(monthlyPayment).toLocaleString()}</span>
                    <span className="text-[11px] text-slate-500 font-medium">/month</span>
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
                    Principal &amp; Interest
                    <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" /></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.3, duration: 0.55, ease: EASE_OUT }}
              className="absolute bottom-6 right-0 lg:-right-4 bg-white rounded-xl shadow-[0_15px_30px_rgba(11,31,58,0.06)] border border-slate-100 p-4 hidden lg:flex items-center gap-3 w-[200px] z-20"
            >
              <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-semibold mb-0.5">Save up to</div>
                <div className="text-[16px] font-black text-[#0B1F3A] leading-none mb-1">$12,000+</div>
                <div className="text-[9px] text-slate-400 leading-tight">over the life of your loan<br />with the right strategy.</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* TOOL CARDS ROW */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2.5 md:p-3"
        >
          <Stagger className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {tools.map((tool) => (
              <div key={tool.title} className="flex-1 p-1">
                <SmartToolCard tool={tool} />
              </div>
            ))}
          </Stagger>
          <div className="border-t border-slate-100 mt-2 pt-3 px-3 flex justify-end">
            <Link href="#" className="text-[#2563EB] text-[12px] font-bold inline-flex items-center gap-1 hover:underline">
              View all tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* PROCESS BLOCK INSIDE SAME SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          className="mt-5 bg-white rounded-2xl border border-slate-200 p-5 md:p-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#F4F8FF] border border-[#D8E7FF] rounded-full px-3 py-1.5 mb-3">
              <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center">
                <span className="text-[9px] text-white font-bold">5</span>
              </div>
              <span className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wide">Our Simple Process</span>
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold text-[#0B1F3A] leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              A Clear Process. Every Step of the Way.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[34px] left-[8%] right-[8%] h-px border-t-2 border-dashed border-[#2563EB]/25" />
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {steps.map((step) => (
                <ProcessStepCard key={step.num} step={step} />
              ))}
            </Stagger>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── SUCCESS STORIES / BLOG SECTION ───────────────────────────────────────────
function SuccessStoriesSection() {
  return (
    <section className="relative overflow-hidden bg-[#001a4d] py-16 md:py-20">
      {/* Diagonal light wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 42%, rgba(59,130,246,0.12) 52%, rgba(147,197,253,0.06) 58%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Top: header + featured */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-10 lg:mb-12">
          {/* Header left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2 w-fit"
            >
              <Heart className="w-3.5 h-3.5 text-white shrink-0" fill="currentColor" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white uppercase">
                Real Stories. Real Impact.
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-[34px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.08] tracking-tight"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <span className="text-white">Real Australians.</span>
              <br />
              <span className="text-[#38BDF8]">Real Outcomes.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[15px] text-white/85 leading-relaxed max-w-md">
              Behind every home loan is a life goal. We&apos;re here to make the journey simpler, the decisions clearer and the outcomes stronger.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/90 bg-transparent px-5 py-3 text-[13px] font-bold text-white hover:bg-white/10 transition-colors"
              >
                <FileText className="w-4 h-4 shrink-0" />
                View More Success Stories
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Featured card right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            whileHover={{ boxShadow: "0 24px 56px rgba(0,0,0,0.28)", transition: { duration: 0.4, ease: EASE_OUT } }}
            className="lg:col-span-7 rounded-[18px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden border border-white/10"
          >
            <div className="flex flex-col sm:flex-row min-h-[300px] sm:min-h-[320px]">
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-center sm:max-w-[58%]">
                <span className="inline-flex w-fit rounded-full bg-[#E8F2FF] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1e40af] mb-3">
                  Featured Story
                </span>
                <h3
                  className="text-[22px] sm:text-[24px] font-extrabold text-[#0B1F3A] leading-snug mb-3"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  From Renting To Their First Home In{" "}
                  <span className="text-[#2563EB]">11 Months</span>
                </h3>
                <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mb-5">
                  From struggling with renting in Brisbane&apos;s competitive market to holding the keys to their first home — see how the right guidance and lending strategy made it possible within a single calendar year.
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                  {[
                    {
                      icon: <User className="w-4 h-4 text-[#2563EB]" />,
                      bold: "Jess & Mark",
                      sub: "First Home Buyers",
                    },
                    {
                      icon: <MapPin className="w-4 h-4 text-[#2563EB]" />,
                      bold: "Brisbane, QLD",
                      sub: "Location",
                    },
                    {
                      icon: <Calendar className="w-4 h-4 text-[#2563EB]" />,
                      bold: "11 Months",
                      sub: "To Settlement",
                    },
                  ].map((row) => (
                    <div key={row.bold} className="flex flex-col items-center text-center gap-1.5">
                      <div className="w-9 h-9 rounded-full bg-[#EAF3FF] flex items-center justify-center shrink-0">
                        {row.icon}
                      </div>
                      <div className="text-[11px] sm:text-[12px] font-extrabold text-[#0B1F3A] leading-tight">{row.bold}</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight">{row.sub}</div>
                    </div>
                  ))}
                </div>
                <Link href="#" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#2563EB] hover:underline w-fit">
                  Read their journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative min-h-[220px] sm:min-h-0 sm:w-[42%] shrink-0">
                <Image
                  src="/images/villa.png"
                  alt="Modern home"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.92) 18%, rgba(255,255,255,0.35) 42%, transparent 72%)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Two story cards */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {/* Refinance */}
          <motion.article
            variants={staggerItem}
            whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
            className="rounded-[18px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.2)] overflow-hidden border border-white/10 flex flex-col sm:flex-row min-h-[260px]"
          >
            <div className="flex-1 p-6 sm:p-7 flex flex-col justify-center sm:max-w-[56%]">
              <span className="inline-flex w-fit rounded-full bg-[#DCFCE7] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#166534] mb-3">
                Refinance Story
              </span>
              <h3
                className="text-[19px] sm:text-[21px] font-extrabold text-[#0B1F3A] leading-snug mb-3"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                How Refinancing Saved <span className="text-[#16A34A]">$18,000</span> In Repayments
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-4 flex-1">
                A growing family was stuck on a higher rate. We restructured their loan, unlocked better pricing and put thousands back in their pocket — without the stress.
              </p>
              <Link href="#" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#16A34A] hover:underline w-fit">
                Read their story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative min-h-[200px] sm:min-h-0 sm:w-[44%] shrink-0">
              <Image
                src="/images/family_refinance.png"
                alt="Family refinancing success"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.9) 15%, rgba(255,255,255,0.25) 45%, transparent 75%)",
                }}
              />
              <div className="absolute bottom-4 right-4 z-10 bg-white rounded-xl border border-slate-100 shadow-lg px-3 py-2.5 flex items-start gap-2.5 max-w-[160px]">
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0 text-[#16A34A]">
                  <PiggyBank className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-extrabold text-[#0B1F3A] leading-tight">Smarter Loan</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Better Savings</div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Healthcare Professional Story */}
          <motion.article
            variants={staggerItem}
            whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
            className="rounded-[18px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.2)] overflow-hidden border border-white/10 flex flex-col sm:flex-row min-h-[260px]"
          >
            <div className="flex-1 p-6 sm:p-7 flex flex-col justify-center sm:max-w-[56%]">
              <span className="inline-flex w-fit rounded-full bg-[#CCFBF1] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0D9488] mb-3">
                Healthcare Professional
              </span>
              <h3
                className="text-[19px] sm:text-[21px] font-extrabold text-[#0B1F3A] leading-snug mb-3"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Doctor Buys First Home With <span className="text-[#0D9488]">Zero LMI</span>
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-4 flex-1">
                A junior doctor with HECS debt thought LMI was unavoidable. We matched them to the right lender, waived LMI entirely and got them into their first home 6 months earlier than expected.
              </p>
              <Link href="#" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0D9488] hover:underline w-fit">
                Read their story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative min-h-[220px] sm:min-h-0 sm:w-[44%] shrink-0">
              <Image
                src="/images/Healthcare Professionals.png"
                alt="Doctor buys first home success"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.9) 15%, rgba(255,255,255,0.25) 45%, transparent 75%)",
                }}
              />
              <div className="absolute bottom-4 right-4 z-10 bg-white rounded-xl border border-slate-100 shadow-lg px-3 py-2.5 flex items-start gap-2.5 max-w-[160px]">
                <div className="w-8 h-8 rounded-full bg-[#CCFBF1] flex items-center justify-center shrink-0 text-[#0D9488]">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-extrabold text-[#0B1F3A] leading-tight">Approved Fast</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Junior Doctor</div>
                </div>
              </div>
            </div>
          </motion.article>
        </Stagger>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="rounded-2xl border border-white/15 bg-[#0a2a66]/55 backdrop-blur-md px-5 py-5 sm:px-8 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 lg:gap-6 flex-1">
            <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p
                className="text-[18px] sm:text-[20px] font-extrabold text-white leading-snug"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Your home goals are unique.{" "}
                <span className="text-[#7DD3FC]">Your journey</span> should be too.
              </p>
              <p className="text-[13px] text-white/75 mt-1.5 max-w-xl">
                Whether you&apos;re buying, refinancing or investing, we&apos;re here to guide you every step of the way.
              </p>
            </div>
          </div>
          <Link
            href="#"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-[13px] font-bold text-white hover:bg-[#1d4ed8] transition-colors shadow-md whitespace-nowrap"
          >
            Let&apos;s Talk About Your Goals
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ + CTA SECTION ─────────────────────────────────────────────────────────
const FAQ_TABS = [
  { id: "first-home", label: "First Home Buyers", icon: HomeIcon },
  { id: "refinancing", label: "Refinancing", icon: Clock },
  { id: "investment", label: "Investment Loans", icon: BarChart3 },
  { id: "healthcare", label: "Healthcare Professionals", icon: Heart },
  { id: "self-employed", label: "Self-Employed", icon: User },
] as const;

const FAQ_CONTENT: Record<
  (typeof FAQ_TABS)[number]["id"],
  { question: string; answer: string }[]
> = {
  "first-home": [
    {
      question: "How much deposit do I need for my first home?",
      answer:
        "Most lenders look for a minimum of 5–20% deposit depending on your situation, loan type and whether you qualify for government schemes. We'll assess your borrowing power and explain exactly what you need.",
    },
    {
      question: "What government schemes are available?",
      answer:
        "Options may include the First Home Guarantee, regional first home buyer support and stamp duty concessions depending on your state. We'll check your eligibility and factor schemes into your strategy.",
    },
    {
      question: "Can I get a home loan with HECS debt?",
      answer:
        "Yes — HECS/HELP debt is factored into your servicing assessment but doesn't automatically stop you from borrowing. We work with lenders who understand how study debt affects your application.",
    },
    {
      question: "How long does the home loan process take?",
      answer:
        "From pre-approval to settlement, timelines typically range from 4–12 weeks depending on your situation, property type and lender. We keep you informed at every milestone.",
    },
    {
      question: "What costs should I budget for?",
      answer:
        "Beyond your deposit, budget for stamp duty, conveyancing, building and pest inspections, lender fees and moving costs. We'll give you a clear breakdown so there are no surprises.",
    },
  ],
  refinancing: [
    {
      question: "When is the right time to refinance?",
      answer:
        "If your rate is no longer competitive, your goals have changed, or you want to consolidate debt or access equity, refinancing may save you money. We'll compare your current loan against the market.",
    },
    {
      question: "Will refinancing cost me money?",
      answer:
        "There can be discharge fees, application fees or break costs on fixed rates. We weigh these against potential savings so you can decide with confidence.",
    },
    {
      question: "Can I refinance if my property value has changed?",
      answer:
        "Yes. An updated valuation can improve your loan-to-value ratio and unlock better rates or equity access. We coordinate valuations with your chosen lender.",
    },
    {
      question: "How long does refinancing take?",
      answer:
        "Many refinance applications settle within 2–6 weeks, depending on lender workload and documentation. We manage paperwork to keep things moving.",
    },
    {
      question: "Can I switch lenders without changing my loan amount?",
      answer:
        "Absolutely. You can refinance to a new lender for a better rate or features while keeping a similar loan balance and term structure.",
    },
  ],
  investment: [
    {
      question: "How much can I borrow for an investment property?",
      answer:
        "Investment borrowing depends on rental income, your existing debts, deposit and lender policy. We model scenarios across multiple lenders to find your capacity.",
    },
    {
      question: "Do I need a larger deposit for investment loans?",
      answer:
        "Many investment loans require 10–20% deposit plus funds for costs. Some lenders accept lower deposits in specific cases — we'll match you to the right policy.",
    },
    {
      question: "What is negative gearing?",
      answer:
        "When property expenses exceed rental income, the loss may be offset against your taxable income (subject to tax advice). We help structure loans; speak to your accountant for tax guidance.",
    },
    {
      question: "Can I use equity from my home to invest?",
      answer:
        "Yes. Equity release through refinancing or a line of credit is a common strategy. We'll assess risk, servicing and lender requirements before you proceed.",
    },
    {
      question: "Which loan features matter for investors?",
      answer:
        "Offset accounts, interest-only periods, flexible repayments and portability can all matter. We compare products based on your investment strategy.",
    },
  ],
  "self-employed": [
    {
      question: "Can self-employed borrowers get a home loan?",
      answer:
        "Yes. Lenders assess tax returns, business financials, BAS statements or bank statements depending on your structure. We specialise in documenting your income clearly.",
    },
    {
      question: "How many years of financials do I need?",
      answer:
        "Most lenders want 1–2 years of financial history, though some accept less with strong bank statement evidence. We'll identify lenders suited to your trading history.",
    },
    {
      question: "What if my income varies year to year?",
      answer:
        "Lenders often average income over two years or use the lower figure. We present your application in the best light while staying fully compliant.",
    },
    {
      question: "Can I borrow as a company or trust?",
      answer:
        "Some lenders offer loans to companies, trusts or SMSFs with specific criteria. We'll explain structures and refer you to specialists where needed.",
    },
    {
      question: "Do I need a larger deposit if I'm self-employed?",
      answer:
        "Not always. Deposit requirements depend on income evidence, credit profile and lender policy — not employment type alone.",
    },
  ],
  healthcare: [
    {
      question: "Do healthcare professionals get special loan benefits?",
      answer:
        "Yes. Many lenders offer exclusive benefits to doctors, nurses, dentists and allied health professionals — including waived LMI on up to 90–95% LVR, discounted interest rates and faster approvals. We match you to the right policy.",
    },
    {
      question: "Which healthcare professionals qualify for LMI waivers?",
      answer:
        "Eligible professions typically include medical doctors (GPs and specialists), dentists, pharmacists, optometrists, veterinarians, physiotherapists and registered nurses. Requirements vary by lender — we'll confirm your eligibility upfront.",
    },
    {
      question: "Can I borrow with HECS/HELP debt as a healthcare professional?",
      answer:
        "Yes. HECS debt is factored into your assessment but healthcare professionals are still strong candidates. We work with lenders who understand the income trajectory of healthcare careers and use your genuine earning capacity.",
    },
    {
      question: "Can I borrow more as a healthcare professional?",
      answer:
        "Your stable, high income and career trajectory can support a higher borrowing capacity. We'll model your full borrowing power across multiple lenders and present your case to maximise your approval amount.",
    },
    {
      question: "Can I use my healthcare income to invest in property?",
      answer:
        "Absolutely. Healthcare professionals are well-positioned to build investment portfolios. We structure both your home loan and investment loans to maximise your tax efficiency and long-term wealth creation.",
    },
  ],
};

function FaqCtaSection() {
  const [activeTab, setActiveTab] = useState<(typeof FAQ_TABS)[number]["id"]>("first-home");
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = FAQ_CONTENT[activeTab];
  const filteredFaqs = searchQuery.trim()
    ? faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : faqs;

  const displayFaqs = filteredFaqs.length > 0 ? filteredFaqs : faqs;

  return (
    <section className="bg-[#F0F4FA] py-16 md:py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* FAQ block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-12 lg:mb-14">
          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerContainer}
            className="lg:col-span-5 relative"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-[#EAF3FF] border border-[#2563EB]/15 px-4 py-1.5 mb-4"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-bold tracking-widest text-[#2563EB] uppercase">FAQs</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-[34px] sm:text-[40px] font-extrabold leading-[1.08] text-[#0B1F3A] mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Questions,{" "}
              <span className="text-[#2563EB]">Answered Clearly.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[15px] text-slate-500 leading-relaxed mb-6 max-w-md">
              Find quick answers to the most common questions about home loans, refinancing and property finance — all in one place.
            </motion.p>
            <motion.div variants={fadeInUp} className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your question..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-[14px] text-[#0B1F3A] placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className="rounded-2xl border border-[#D8E7FF] bg-[#F4F9FF] p-5 flex items-start gap-4 max-w-md">
                <div className="w-11 h-11 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[15px] font-extrabold text-[#0B1F3A]">Still have questions?</div>
                  <div className="text-[13px] text-slate-500 mt-1">Our mortgage experts are ready to help.</div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 mt-2.5 text-[13px] font-bold text-[#2563EB] hover:underline"
                  >
                    Contact us
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div
                className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 w-20 h-20 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)",
                  backgroundSize: "8px 8px",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Right column: tabs + accordion */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <div className="flex flex-row overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-2 border-b border-slate-200 pb-px mb-4 whitespace-nowrap">
              {FAQ_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setExpandedIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 text-[12px] sm:text-[13px] font-semibold whitespace-nowrap border-b-2 transition-colors -mb-px ${isActive
                      ? "text-[#2563EB] border-[#2563EB]"
                      : "text-slate-500 border-transparent hover:text-slate-600"
                      }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#2563EB]" : "text-slate-400"}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE_OUT } }}
                variants={staggerContainer}
                className="flex flex-col gap-3"
              >
                {displayFaqs.map((item, index) => {
                  const isOpen = expandedIndex === index;
                  return (
                    <motion.div
                      key={item.question}
                      variants={staggerItem}
                      layout
                      className="rounded-xl bg-white border border-slate-100 shadow-[0_4px_16px_rgba(15,23,42,0.04)] overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedIndex(isOpen ? -1 : index)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="text-[14px] sm:text-[15px] font-extrabold text-[#0B1F3A] pr-2">
                          {item.question}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: EASE_OUT }}
                          className="shrink-0 w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500"
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
                            transition={{ duration: 0.35, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-4 text-[13px] sm:text-[14px] text-slate-500 leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Premium Dream home CTA banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerContainer}
          className="relative rounded-[24px] overflow-hidden min-h-[320px] sm:min-h-[360px] flex flex-col sm:flex-row shadow-[0_24px_50px_rgba(11,31,58,0.15)] bg-[#071324] group"
        >
          {/* Subtle background glow */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-[#2563EB] opacity-[0.15] blur-[100px] pointer-events-none" />

          {/* Left Content Area */}
          <motion.div variants={fadeInLeft} className="relative z-20 flex flex-col justify-center px-8 py-10 sm:px-12 sm:w-[55%] lg:w-[50%] shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6 backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[10px] sm:text-[11px] font-extrabold text-white tracking-[0.15em] uppercase">Your Next Chapter</span>
            </div>

            <h3
              className="text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold text-white leading-[1.1] mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Ready to take the next step towards your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2563EB]">dream home?</span>
            </h3>

            <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed mb-8 max-w-[420px]">
              Let&apos;s chat about your goals and create a smart, tailored strategy that gets you the keys sooner. No jargon, just clear guidance.
            </p>

            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 w-fit rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-6 py-3.5 text-[14px] font-bold text-white hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Right Image Area */}
          <motion.div variants={fadeInRight} className="relative flex-1 min-h-[260px] sm:min-h-0 w-full">
            {/* Image container with smooth gradient mask */}
            <div className="absolute inset-0 w-full h-full" style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)" }}>
              <Image
                src="/images/cta-couple.png"
                alt="Happy family in new home"
                fill
                className="object-cover object-[center_20%] sm:object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>

            {/* Floating Glass UI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              animate={{ y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.35, duration: 0.5, ease: EASE_OUT },
                y: { delay: 1.2, duration: 6, repeat: Infinity, ease: EASE_OUT },
              }}
              className="absolute bottom-8 right-8 z-20 bg-[#0B1F3A]/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hidden lg:flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full border border-[#0B1F3A] bg-gradient-to-br from-[#38BDF8] to-[#2563EB] flex items-center justify-center overflow-hidden z-30">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="w-7 h-7 rounded-full border border-[#0B1F3A] bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center overflow-hidden z-20">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="w-7 h-7 rounded-full border border-[#0B1F3A] bg-slate-200 flex items-center justify-center overflow-hidden z-10">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
                <div>
                  <div className="text-white text-[11px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#FBBF24]" fill="currentColor" />
                    4.9/5 Rating
                  </div>
                  <div className="text-white/70 text-[9px] mt-0.5">From 1,200+ happy clients</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── PRE-FOOTER BAR + SITE FOOTER ─────────────────────────────────────────────
function SiteFooterSection() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  return (
    <div className="bg-[#F0F4FA]">
      {/* Pre-footer contact card */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-4 pb-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="bg-white rounded-2xl border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.08)] px-5 py-5 sm:px-8 sm:py-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-full bg-[#EAF3FF] border border-[#D8E7FF] flex items-center justify-center shrink-0">
              <HomeIcon className="w-6 h-6 text-[#2563EB]" />
            </div>
            <p
              className="text-[18px] sm:text-[20px] lg:text-[22px] font-extrabold text-[#0B1F3A] leading-snug"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Specialists in <span className="text-[#2563EB]">Healthcare</span> &amp; <span className="text-[#2563EB]">Investment</span> lending across Australia.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-0">
              <div className="flex items-start gap-3 sm:px-6 lg:border-l lg:border-slate-200">
                <MessageCircle className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Speak to an Expert</div>
                  <a href="tel:0450240757" className="text-[16px] font-extrabold text-[#2563EB] hover:underline">
                    0450 240 757
                  </a>
                  <div className="text-[11px] text-slate-400 mt-0.5">Mon - Fri 8am - 6pm AEST</div>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:px-6 sm:border-l sm:border-slate-200">
                <Mail className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Email Us</div>
                  <a href="mailto:mortgage@mortgagexperts.com.au" className="text-[14px] sm:text-[15px] font-extrabold text-[#2563EB] hover:underline break-all">
                    mortgage@mortgagexperts.com.au
                  </a>
                  <div className="text-[11px] text-slate-400 mt-0.5">We reply within 24 hours</div>
                </div>
              </div>
            </div>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-white font-bold text-[13px] px-6 py-3.5 hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-200 whitespace-nowrap lg:ml-6"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main footer */}
      <footer className="bg-[#000b1e] rounded-t-[28px] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-12 md:pt-14 pb-8">
          <Stagger className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
            {/* Brand column */}
            <StaggerItem className="lg:col-span-3">
              <Link href="/" className="inline-block mb-5">
                <Image
                  src="/images/footer-logo.png"
                  alt="Mortgage Xperts"
                  width={200}
                  height={56}
                  className="h-11 sm:h-12 w-auto object-contain object-left"
                />
              </Link>
              <p className="text-[13px] text-slate-400 leading-relaxed mb-6 max-w-xs">
                We simplify the home loan journey and help Australians achieve their property goals with confidence and clarity.
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <a href="tel:0450240757" className="flex items-center gap-2.5 text-[13px] text-slate-300 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
                    0450 240 757
                  </a>
                </li>
                <li>
                  <a href="mailto:mortgage@mortgagexperts.com.au" className="flex items-center gap-2.5 text-[13px] text-slate-300 hover:text-white transition-colors break-all">
                    <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                    mortgage@mortgagexperts.com.au
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-[13px] text-slate-300">
                  <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>Level 20, 1 Market St, Sydney NSW 2000</span>
                </li>
              </ul>
              <div className="flex items-center gap-2.5">
                {[
                  { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/MortgageXperts.au/", hoverClass: "hover:bg-[#1877F2]" },
                  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/mortgagexperts.au/#", hoverClass: "hover:bg-[#E4405F]" },
                  { Icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@mortgagexperts.au?_t=ZS-90VgVATQ560&_r=1", hoverClass: "hover:bg-[#FE2C55]" },
                  { Icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@mortgagexpertsau", hoverClass: "hover:bg-[#FF0000]" },
                ].map(({ Icon, label, href, hoverClass }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-9 h-9 rounded-full bg-[#0a1628] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 ${hoverClass}`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </StaggerItem>

            {/* Nav columns */}
            <StaggerItem className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <HomeIcon className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">Home Loan Solutions</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">Healthcare Professionals</FooterNavLink>
                  <FooterNavLink href="#">Investment Loans</FooterNavLink>
                  <FooterNavLink href="#">First Home Buyers</FooterNavLink>
                  <FooterNavLink href="#">Refinancing</FooterNavLink>
                  <FooterNavLink href="#">Self-Employed Loans</FooterNavLink>
                </div>
                <FooterColumnCta href="#">Explore solutions</FooterColumnCta>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">Calculators &amp; Tools</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">Borrowing Power</FooterNavLink>
                  <FooterNavLink href="#">Repayment</FooterNavLink>
                  <FooterNavLink href="#">Stamp Duty</FooterNavLink>
                  <FooterNavLink href="#">Loan Comparison</FooterNavLink>
                  <FooterNavLink href="#">Refinance</FooterNavLink>
                </div>
                <FooterColumnCta href="#">View all tools</FooterColumnCta>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">Resources</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">Home Loan Guides</FooterNavLink>
                  <FooterNavLink href="#">FAQs</FooterNavLink>
                  <FooterNavLink href="#">Knowledge Hub</FooterNavLink>
                  <FooterNavLink href="#">Market Insights</FooterNavLink>
                  <FooterNavLink href="#">Blog</FooterNavLink>
                </div>
                <FooterColumnCta href="#">Explore resources</FooterColumnCta>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">Locations</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">NSW</FooterNavLink>
                  <FooterNavLink href="#">Victoria</FooterNavLink>
                  <FooterNavLink href="#">QLD</FooterNavLink>
                  <FooterNavLink href="#">SA</FooterNavLink>
                  <FooterNavLink href="#">WA</FooterNavLink>
                </div>
                <FooterColumnCta href="#">View all locations</FooterColumnCta>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">About Us</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">About Mortgage Xperts</FooterNavLink>
                  <FooterNavLink href="#">Our Lenders</FooterNavLink>
                  <FooterNavLink href="#">Reviews</FooterNavLink>
                  <FooterNavLink href="#">Careers</FooterNavLink>
                  <FooterNavLink href="#">Contact Us</FooterNavLink>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Newsletter */}
          <Reveal direction="up" className="rounded-2xl border border-white/10 bg-[#0a1628]/80 p-5 sm:p-6 mb-10">
            <div className="flex flex-col xl:flex-row xl:items-center gap-6">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2563EB] border-2 border-[#0a1628]" />
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
                  Stay ahead with the latest{" "}
                  <span className="text-white font-bold">mortgage insights.</span> News, rate updates and expert tips delivered straight to your inbox.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 xl:max-w-[480px] shrink-0 w-full xl:w-auto">
                <div className="relative flex-1 min-w-[220px]">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-white/20 bg-[#000b1e] py-3.5 pl-11 pr-[120px] text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                  />
                  <button
                    type="button"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-[#2563EB] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#1d4ed8] transition-colors inline-flex items-center gap-1"
                  >
                    Subscribe
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-[11px] text-slate-400 xl:shrink-0">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Shield className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  No spam. Ever. Unsubscribe anytime.
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Lock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  Your privacy is our priority.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Legal bar */}
          <Reveal delay={0.08} direction="fade" className="border-t border-white/10 pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-[11px] sm:text-[12px] text-slate-400">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
              <span>© 2026 Mortgage Xperts. All Rights Reserved.</span>
              <span className="hidden sm:inline text-white/20">·</span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {["Privacy Policy", "Terms & Conditions", "Credit Guide", "Disclaimer"].map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    {i > 0 && <span className="text-white/20 hidden sm:inline">·</span>}
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 shrink-0">
              <svg className="w-4 h-4 text-[#2563EB] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C8.5 2 5.5 4 4 7c-1.2 2.2-1 5 .5 7.2.8 1.1 2 2.5 3.5 4.3.9 1.1 1.8 2.2 2.5 3.2.4.6.9 1.3 1 1.3s.6-.7 1-1.3c.7-1 1.6-2.1 2.5-3.2 1.5-1.8 2.7-3.2 3.5-4.3 1.5-2.2 1.7-5 .5-7.2C18.5 4 15.5 2 12 2zm0 5.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
              </svg>
              <span>Australian Credit Licence 00000</span>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}

// ── HERO SLIDER COMPONENT ──
const SLIDER_DATA = [
  {
    id: 1,
    service: "first-home",
    badge: "First Home Buyer Specialists",
    title: "Your Journey to Your First Home, Simplified",
    subtext: "Secure your first home with expert guidance, government grants assistance, and access to low-deposit options from 40+ leading lenders.",
    image: "/images/hero.png",
    accentColor: "#2563EB", // Blue
    badgeBg: "bg-[#EAF3FF] border-[#2563EB]/15 text-[#2563EB]",
    btnClass: "bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-blue-200",
    borderBtnClass: "border-[#2563EB] text-[#2563EB] hover:bg-[#EAF3FF]",
    blobGradient: "radial-gradient(ellipse 85% 90% at 62% 52%, #D4E9FF 0%, #E8F4FF 42%, #F4F9FF 62%, transparent 82%)",
    statIconBg: "bg-[#2563EB]",
    statPillBg: "bg-[#EAF3FF] border-[#D0E5FF] text-[#2563EB]",
    cardTitle: "Tailored Solutions",
    cardDesc: "Custom loan strategies designed around your goals.",
    cardIcon: HomeIcon,
  },
  {
    id: 2,
    service: "healthcare",
    badge: "Specialist Lenders for Medical & Health Professionals",
    title: "Exclusive Mortgage Benefits for Health Professionals",
    subtext: "Get up to 95% LVR with zero Lenders Mortgage Insurance (LMI) and discounted interest rates tailored for medical practitioners and healthcare staff.",
    image: "/images/hero_slide_2_green.png",
    accentColor: "#0D9488", // Teal/Green
    badgeBg: "bg-[#E6FBF7] border-[#0D9488]/15 text-[#0D9488]",
    btnClass: "bg-[#0D9488] hover:bg-[#0f766e] text-white shadow-teal-200",
    borderBtnClass: "border-[#0D9488] text-[#0D9488] hover:bg-[#E6FBF7]",
    blobGradient: "radial-gradient(ellipse 85% 90% at 62% 52%, #CCFBF1 0%, #E6FBF7 42%, #F2FDFB 62%, transparent 82%)",
    statIconBg: "bg-[#0D9488]",
    statPillBg: "bg-[#E6FBF7] border-[#99F6E4] text-[#0D9488]",
    cardTitle: "Zero LMI Waiver",
    cardDesc: "Exclusive medical policy benefits for doctor loans.",
    cardIcon: Heart,
  },
  {
    id: 3,
    service: "investment",
    badge: "Strategic Lending for Property Investors",
    title: "Build and Scale Your Property Portfolio",
    subtext: "Maximize your borrowing power, optimize loan structures, and leverage equity to grow your long-term property investment wealth.",
    image: "/images/hero_slide_3_yellow.png",
    accentColor: "#D97706", // Yellow/Amber
    badgeBg: "bg-[#FEF3C7] border-[#D97706]/15 text-[#D97706]",
    btnClass: "bg-[#D97706] hover:bg-[#b45309] text-white shadow-amber-200",
    borderBtnClass: "border-[#D97706] text-[#D97706] hover:bg-[#FEF3C7]",
    blobGradient: "radial-gradient(ellipse 85% 90% at 62% 52%, #FEF3C7 0%, #FFFBEB 42%, #FFFDF5 62%, transparent 82%)",
    statIconBg: "bg-[#D97706]",
    statPillBg: "bg-[#FEF3C7] border-[#FDE68A] text-[#D97706]",
    cardTitle: "Portfolio Strategy",
    cardDesc: "Multi-lender setups to optimize borrowing capacity.",
    cardIcon: BarChart3,
  },
  {
    id: 4,
    service: "refinancing",
    badge: "Smart Refinance Strategies",
    title: "Refinance and Save Thousands Annually",
    subtext: "Switch to a lower rate, consolidate high-interest debts, or unlock equity for renovations with our streamlined mortgage refinance process.",
    image: "/images/hero_slide_4_purple.png",
    accentColor: "#7C3AED", // Purple
    badgeBg: "bg-[#F3E8FF] border-[#7C3AED]/15 text-[#7C3AED]",
    btnClass: "bg-[#7C3AED] hover:bg-[#6d28d9] text-white shadow-purple-200",
    borderBtnClass: "border-[#7C3AED] text-[#7C3AED] hover:bg-[#F3E8FF]",
    blobGradient: "radial-gradient(ellipse 85% 90% at 62% 52%, #F3E8FF 0%, #FAF5FF 42%, #FDFBFF 62%, transparent 82%)",
    statIconBg: "bg-[#7C3AED]",
    statPillBg: "bg-[#F3E8FF] border-[#E9D5FF] text-[#7C3AED]",
    cardTitle: "Lower Rate Search",
    cardDesc: "Active rate negotiations to beat your current lender.",
    cardIcon: Clock,
  },
  {
    id: 5,
    service: "self-employed",
    badge: "Low-Doc & Self-Employed Mortgage Experts",
    title: "Flexible Home Loans for Business Owners",
    subtext: "No up-to-date tax returns? We specialize in alt-doc and low-doc lending solutions to secure the home loan you deserve using alternative proof of income.",
    image: "/images/hero_slide_5_rose.png",
    accentColor: "#E11D48", // Rose
    badgeBg: "bg-[#FFE4E6] border-[#E11D48]/15 text-[#E11D48]",
    btnClass: "bg-[#E11D48] hover:bg-[#be123c] text-white shadow-rose-200",
    borderBtnClass: "border-[#E11D48] text-[#E11D48] hover:bg-[#FFE4E6]",
    blobGradient: "radial-gradient(ellipse 85% 90% at 62% 52%, #FFE4E6 0%, #FFF5F5 42%, #FFFBFB 62%, transparent 82%)",
    statIconBg: "bg-[#E11D48]",
    statPillBg: "bg-[#FFE4E6] border-[#FECDD3] text-[#E11D48]",
    cardTitle: "Alt-Doc Solutions",
    cardDesc: "Custom cash flow assessment using BAS or bank statements.",
    cardIcon: User,
  },
];

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDER_DATA.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDER_DATA.length) % SLIDER_DATA.length);
  };

  // Start autoplay timer
  useEffect(() => {
    if (isAutoplay) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // 5 seconds per slide
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoplay]);

  const active = SLIDER_DATA[currentSlide];
  const CardIcon = active.cardIcon;

  return (
    <section
      className="relative bg-white overflow-hidden select-none"
      style={{ minHeight: "680px" }}
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* ── Slide Background Blob (Desktop) ── */}
      <div
        className="absolute top-0 right-0 h-full z-[1] hidden lg:block transition-all duration-1000 ease-in-out"
        style={{
          width: "52%",
        }}
      >
        {/* Dynamic Light Colored Radial Blob */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            background: active.blobGradient,
          }}
        />
        {/* Slide Photo overlay with smooth crossfade and mix-blend-mode for cutout styling */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${active.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "multiply",
            }}
          />
        </AnimatePresence>

        {/* White fade on left edge — blends photo into white left section */}
        <div
          className="absolute inset-y-0 left-0 w-48"
          style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.7) 50%, transparent 100%)" }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-5 pb-8 sm:py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* LEFT: Text + CTAs + Trust Bar */}
        <div className="lg:col-span-6 flex flex-col gap-3.5 sm:gap-5 min-h-[480px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
                exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
              }}
              className="flex flex-col gap-3.5 sm:gap-5"
            >
              {/* Service Category Badge */}
              <div className={`inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 w-fit shadow-sm font-bold tracking-wider uppercase text-[9.5px] sm:text-[11px] transition-all duration-300 ${active.badgeBg}`}>
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{active.badge}</span>
              </div>

              {/* Service specific Title */}
              <h1
                className="text-[25px] sm:text-[40px] lg:text-[46px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {active.id === 1 ? (
                  <>
                    Mortgage Solutions for <br />
                    <span style={{ color: active.accentColor }}>First Home Buyers</span>
                  </>
                ) : active.id === 2 ? (
                  <>
                    Mortgage Solutions for <br />
                    <span style={{ color: active.accentColor }}>Health Professionals</span>
                  </>
                ) : active.id === 3 ? (
                  <>
                    Property Finance &amp; <br />
                    <span style={{ color: active.accentColor }}>Investment Loans</span>
                  </>
                ) : active.id === 4 ? (
                  <>
                    Smarter Refinancing &amp; <br />
                    <span style={{ color: active.accentColor }}>Repayment Savings</span>
                  </>
                ) : (
                  <>
                    Home Loans for <br />
                    <span style={{ color: active.accentColor }}>Self-Employed Borrowers</span>
                  </>
                )}
              </h1>

              {/* Subtext */}
              <p className="text-slate-500 text-[13.5px] sm:text-[15px] leading-relaxed max-w-lg">
                {active.subtext}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
                <Link
                  href="#"
                  className={`font-bold text-[13.5px] sm:text-[14px] py-3 sm:py-3.5 px-6 sm:px-7 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto ${active.btnClass}`}
                >
                  Book Free Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className={`border-2 font-bold text-[13.5px] sm:text-[14px] py-3 sm:py-3.5 px-5 sm:px-6 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto ${active.borderBtnClass}`}
                >
                  <Calculator className="w-4 h-4" /> Calculate Borrowing Power
                </Link>
              </div>

              {/* Trust Bar — checkmark pills */}
              <div className="grid grid-cols-2 gap-2 pt-4 mt-1 border-t border-slate-100 sm:flex sm:flex-wrap">
                {[
                  { full: "Australia-Wide Service", short: "Australia-Wide" },
                  { full: "40+ Lenders", short: "40+ Lenders" },
                  { full: "First Home Buyers & Investors", short: "Buyers & Investors" },
                  { full: "Strategic Lending Solutions", short: "Strategic Solutions" },
                ].map((item) => (
                  <span
                    key={item.full}
                    className={`inline-flex items-center gap-1.5 border text-[10.5px] sm:text-[11.5px] font-semibold px-2.5 py-1.5 rounded-full justify-center whitespace-nowrap transition-colors duration-500 ${active.statPillBg}`}
                  >
                    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7" /></svg>
                    <span className="sm:hidden">{item.short}</span>
                    <span className="hidden sm:inline">{item.full}</span>
                  </span>
                ))}
              </div>

              {/* Google rating strip (Google rating + $2.4B approved shown in ALL slides) */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <GoogleIcon />
                  <div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">4.9 · 1,200+ Reviews</div>
                  </div>
                </div>
                <div className="w-px h-7 bg-slate-200 hidden sm:block" />
                <div className="text-[11.5px] text-slate-500 font-medium hidden sm:block">$2.4B+ Loans Approved Since 2010</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Slide Image Card (stacked below content on mobile, hidden on desktop) */}
        <div
          className="relative w-full h-56 sm:h-64 lg:hidden rounded-2xl overflow-hidden border border-slate-100 mt-2 transition-all duration-1000"
          style={{
            background: active.blobGradient,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${active.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
                mixBlendMode: "multiply",
              }}
            />
          </AnimatePresence>
        </div>

        {/* RIGHT: Floating cards (visible on lg+) */}
        <div className="hidden lg:block lg:col-span-6 relative h-[500px]">
          {/* Card 1 – Loans Approved (top right) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: EASE_OUT }}
            whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
            className="absolute top-10 right-2 w-[210px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4 flex items-start gap-3 z-20 transition-shadow duration-300"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white transition-colors duration-500 ${active.statIconBg}`}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10.5px] text-slate-400 font-semibold uppercase tracking-wide">Loans Approved</div>
              <div className="text-[22px] font-black text-[#0B1F3A] leading-none mt-0.5">$2.4B+</div>
              <div className="text-[10.5px] text-slate-400 font-medium mt-1">Since 2010</div>
            </div>
          </motion.div>

          {/* Card 2 – Approval Rate (middle right) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: EASE_OUT }}
            whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
            className="absolute top-[52%] right-0 w-[210px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4 flex items-start gap-3 z-20 transition-shadow duration-300"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white transition-colors duration-500 ${active.statIconBg}`}>
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10.5px] text-slate-400 font-semibold uppercase tracking-wide">Average Approval</div>
              <div className="text-[22px] font-black text-[#0B1F3A] leading-none mt-0.5">98%</div>
              <div className="text-[10.5px] text-slate-400 font-medium mt-1">Helping More Australians</div>
            </div>
          </motion.div>

          {/* Card 3 – Tailored Solutions (bottom center) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
              className="absolute bottom-8 left-4 right-12 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex items-stretch z-20 transition-shadow duration-300"
              style={{ height: "76px" }}
            >
              {/* Text side with padding */}
              <div className="flex items-center gap-3 px-3.5 flex-1 min-w-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white transition-colors duration-500 ${active.statIconBg}`}>
                  {React.createElement(CardIcon, { className: "w-4.5 h-4.5" })}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[13px] text-[#0B1F3A] leading-none">{active.cardTitle}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                    {active.cardDesc}
                  </div>
                </div>
              </div>
              {/* Service picture on right */}
              <div className="relative w-24 shrink-0 bg-slate-50 border-l border-slate-100">
                <Image
                  src={active.image}
                  alt="Service Detail"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ── Dots Navigation Indicator ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-2">
        {SLIDER_DATA.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none"
            style={{
              backgroundColor: currentSlide === index ? active.accentColor : "#E2E8F0",
              width: currentSlide === index ? "24px" : "10px"
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* ── Slide Left / Right Arrows (Desktop hover) ── */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 hover:bg-white border border-slate-200/50 flex items-center justify-center text-slate-600 hover:text-[#0B1F3A] opacity-0 hover:opacity-100 focus:opacity-100 lg:group-hover:opacity-100 transition-all duration-300 shadow-md"
        aria-label="Previous Slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 hover:bg-white border border-slate-200/50 flex items-center justify-center text-slate-600 hover:text-[#0B1F3A] opacity-0 hover:opacity-100 focus:opacity-100 lg:group-hover:opacity-100 transition-all duration-300 shadow-md"
        aria-label="Next Slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </section>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show sticky CTA after scrolling past the hero (400px) but hide it when reaching near the footer
      const isPastHero = scrollPosition > 400;
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 450;

      if (isPastHero && !isNearBottom) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">

      {/* ── TOP BAR ── */}
      <div className="hidden lg:block bg-gradient-to-r from-[#081324] via-[#0B1F3A] to-[#081324] border-b border-white/5 text-slate-300 text-[11.5px] font-medium font-inter">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 group cursor-default">
              <div className="w-5 h-5 rounded-full bg-[#38BDF8]/10 flex items-center justify-center group-hover:bg-[#38BDF8]/20 transition-colors">
                <MapPin className="w-3 h-3 text-[#38BDF8]" />
              </div>
              <span className="hidden sm:inline tracking-wide">Locations: NSW | VIC | QLD | SA | WA | TAS | ACT | NT</span>
              <span className="sm:hidden text-[10.5px]">Locations: NSW | VIC | QLD | SA...</span>
            </div>
            <div className="hidden md:flex items-center gap-2.5 border-l border-white/10 pl-6 group">
              <div className="w-5 h-5 rounded-full bg-[#38BDF8]/10 flex items-center justify-center group-hover:bg-[#38BDF8]/20 transition-colors">
                <Mail className="w-3 h-3 text-[#38BDF8]" />
              </div>
              <a href="mailto:mortgage@mortgagexperts.com.au" className="hover:text-white transition-colors tracking-wide">
                mortgage@mortgagexperts.com.au
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <a href="https://www.facebook.com/MortgageXperts.au/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#1877F2] text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/mortgagexperts.au/#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#E4405F] text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <InstagramIcon />
            </a>
            <a href="https://www.tiktok.com/@mortgagexperts.au?_t=ZS-90VgVATQ560&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#FE2C55] text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <TikTokIcon />
            </a>
            <a href="https://www.youtube.com/@mortgagexpertsau" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#FF0000] text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-2 lg:py-3 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Mortgage Xperts Logo"
              width={180}
              height={56}
              priority
              className="object-contain h-11 lg:h-14 w-auto"
            />
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold text-[#0B1F3A]">
            <Link href="/" className="text-[#2563EB] border-b-2 border-[#2563EB] pb-0.5">Home</Link>
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
              Calculators <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
              Guides <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
              Home Loans <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>
            <Link href="#" className="hover:text-[#2563EB] transition-colors">About Us</Link>
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
              Resources <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>
            <Link href="#" className="hover:text-[#2563EB] transition-colors">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <button className="hidden md:flex items-center text-[#0B1F3A] hover:text-[#2563EB] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-1.5 text-[13.5px]">
              <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span className="text-slate-500 font-medium">Call:</span>
              <span className="font-bold text-[#0B1F3A]">0450 240 757</span>
            </div>
            {/* Desktop Button */}
            <Link
              href="#"
              className="hidden sm:flex bg-[#2563EB] text-white text-[13px] font-bold py-2.5 px-5 rounded-full items-center gap-1.5 hover:bg-[#1d4ed8] transition-all duration-300 shadow-md shadow-blue-200 whitespace-nowrap"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            {/* Mobile Button */}
            <Link
              href="#"
              className="flex sm:hidden bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-[11px] font-black py-2 px-3.5 rounded-lg items-center gap-1.5 hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-300 border border-blue-400/20 whitespace-nowrap"
            >
              Let&apos;s Talk <ArrowRight className="w-3 h-3" />
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 z-50 relative focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`w-5 h-0.5 bg-[#0B1F3A] block transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-[#0B1F3A] block transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-[#0B1F3A] block transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Off-Canvas) Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-[#0B1F3A]/60 backdrop-blur-sm z-50"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="lg:hidden fixed inset-y-0 right-0 w-[300px] sm:w-[340px] bg-white z-50 shadow-2xl flex flex-col p-6 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 shrink-0">
                <div className="relative h-9 w-32">
                  <Image src="/images/logo.png" alt="Mortgage Xperts Logo" fill className="object-contain object-left" />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#0B1F3A] transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col gap-4 font-semibold text-[#0B1F3A] text-[15px]">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors pb-2 border-b border-slate-50">
                  Home
                </Link>

                {/* Calculators Dropdown/Block */}
                <div className="border-b border-slate-50 pb-2 flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Calculators</span>
                  <div className="pl-2 flex flex-col gap-2.5 text-[13.5px] font-medium text-slate-600">
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors">
                      Borrowing Power Calculator
                    </Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors">
                      Mortgage Repayment Calculator
                    </Link>
                  </div>
                </div>

                {/* Guides Dropdown/Block */}
                <div className="border-b border-slate-50 pb-2 flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Guides</span>
                  <div className="pl-2 flex flex-col gap-2.5 text-[13.5px] font-medium text-slate-600">
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors">
                      First Home Buyer Guide
                    </Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors">
                      Refinancing Guide
                    </Link>
                  </div>
                </div>

                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors pb-2 border-b border-slate-50">
                  About Us
                </Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors pb-2 border-b border-slate-50">
                  Contact
                </Link>
              </div>

              {/* Bottom Section: Contact & Socials */}
              <div className="mt-auto pt-6 border-t border-slate-100 shrink-0 flex flex-col gap-4">
                <div className="flex flex-col gap-2.5">
                  <a href="tel:0450240757" className="flex items-center gap-2 text-[13px] font-semibold text-slate-600 hover:text-[#2563EB] transition-colors">
                    <Phone className="w-4 h-4 text-[#2563EB] shrink-0" /> 0450 240 757
                  </a>
                  <a href="mailto:mortgage@mortgagexperts.com.au" className="flex items-center gap-2 text-[13px] font-semibold text-slate-600 hover:text-[#2563EB] transition-colors break-all">
                    <Mail className="w-4 h-4 text-[#2563EB] shrink-0" /> mortgage@mortgagexperts.com.au
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  {[
                    { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/MortgageXperts.au/", hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]/20" },
                    { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/mortgagexperts.au/#", hoverClass: "hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]/20" },
                    { Icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@mortgagexperts.au?_t=ZS-90VgVATQ560&_r=1", hoverClass: "hover:bg-[#FE2C55] hover:text-white hover:border-[#FE2C55]/20" },
                    { Icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@mortgagexpertsau", hoverClass: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]/20" },
                  ].map(({ Icon, label, href, hoverClass }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-8 h-8 rounded-full bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-500 transition-all duration-300 ${hoverClass}`}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>

                {/* Consultation Button */}
                <Link
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-[#2563EB] text-white text-[13.5px] font-bold py-3 px-5 rounded-full flex items-center justify-center gap-1.5 hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-100 text-center"
                >
                  Book Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── HERO SLIDER SECTION ── */}
      <HeroSlider />

      {/* ── LENDER PANEL ── */}
      <section className="bg-white border-t border-slate-100 py-4">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm py-4 px-5 flex flex-col md:flex-row items-center relative overflow-hidden"
          >

            {/* Label */}
            <div className="shrink-0 md:border-r border-slate-200 pr-6 md:mr-4 border-b md:border-b-0 pb-3 md:pb-0 w-full md:w-auto text-center md:text-left flex md:block justify-center z-10 bg-white">
              <p className="text-[11.5px] font-bold text-[#0B1F3A] uppercase tracking-wide whitespace-nowrap">
                OUR PANEL OF 40+ LEADING LENDERS
              </p>
            </div>

            {/* Logos row Marquee */}
            <div className="flex-1 overflow-hidden relative flex items-center h-[60px] w-full my-4 md:my-0" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
              <div className="flex w-max animate-marquee items-center hover:pause">
                {[
                  { src: "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png", scale: "scale-[1.2]" },
                  { src: "/images/brands/westpac-logo-png_seeklogo-152472-1.png", scale: "scale-[1.6]" },
                  { src: "/images/brands/anz-2-logo-png-transparent-1.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/ING_Group_N.V._Logo.svg-1.png", scale: "scale-100" },
                  { src: "/images/brands/St_George_Bank_logo-1-scaled.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/Bankwest_new_logo-1.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/Suncorp-Bank-Logo-1-scaled.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/images-3-1.png", scale: "scale-100" },
                  { src: "/images/brands/adelaide-bank-vector-logo-11574265916rvuvsw06fg-1.png", scale: "scale-[1.7]" },
                  { src: "/images/brands/firstmac-limited-logo-vector-1.png", scale: "scale-105" },
                  { src: "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png", scale: "scale-[1.2]" },
                  { src: "/images/brands/westpac-logo-png_seeklogo-152472-1.png", scale: "scale-[1.6]" },
                  { src: "/images/brands/anz-2-logo-png-transparent-1.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/ING_Group_N.V._Logo.svg-1.png", scale: "scale-100" },
                  { src: "/images/brands/St_George_Bank_logo-1-scaled.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/Bankwest_new_logo-1.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/Suncorp-Bank-Logo-1-scaled.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/images-3-1.png", scale: "scale-100" },
                  { src: "/images/brands/adelaide-bank-vector-logo-11574265916rvuvsw06fg-1.png", scale: "scale-[1.7]" },
                  { src: "/images/brands/firstmac-limited-logo-vector-1.png", scale: "scale-105" }
                ].map((brand, i) => (
                  <div key={i} className={`relative h-10 w-[120px] shrink-0 mr-12 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105`}>
                    <div className={`relative h-full w-full ${brand.scale}`}>
                      <Image src={brand.src} alt="Lender Logo" fill className="object-contain" sizes="120px" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View all */}
            <div className="shrink-0 md:border-l border-slate-200 md:pl-5 md:ml-2 w-full md:w-auto text-center border-t md:border-t-0 pt-3 md:pt-0 z-10 bg-white">
              <Link href="#" className="text-[#2563EB] text-[12px] font-bold inline-flex items-center gap-1 hover:underline whitespace-nowrap">
                View all lenders <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── FIND THE RIGHT LOAN PATH SECTION ── */}
      <section className="py-16 md:py-20" style={{ background: "#EDF1F9" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_LOOSE}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <Settings className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-semibold text-[#2563EB]">Solutions Designed Around You</span>
            </div>
            <h2
              className="text-[34px] md:text-[42px] font-extrabold text-[#0B1F3A] leading-tight"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Find The Right Loan Path
              <br /><span className="text-[#2563EB]">For Your Goals.</span>
            </h2>
            <p className="text-slate-500 text-[15px] mt-3 max-w-xl mx-auto leading-relaxed">
              From healthcare professionals to property investors — we specialise in finding the right loan for your unique situation, nationwide.
            </p>
          </motion.div>

          {/* TOP ROW */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          >

            {/* Card 1 - First Home Buyers */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch md:min-h-[270px] transition-shadow duration-300"
            >
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EBF5FF] flex items-center justify-center mb-3 text-[#2563EB]">
                    <IconHome />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#0B1F3A] mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    First Home Buyers
                  </h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4 max-w-[240px]">
                    Step-by-step guidance to help you buy your first home with confidence and secure the best possible start.
                  </p>
                  {[
                    ["Understand grants & schemes", "We help you access government grants you may be eligible for."],
                    ["Borrow with confidence", "We explain your borrowing capacity in simple, clear terms."],
                  ].map(([title, sub]) => (
                    <div key={title} className="flex items-start gap-2 mb-2.5">
                      <div className="w-5 h-5 rounded bg-[#EBF5FF] flex items-center justify-center shrink-0 mt-0.5">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                          <rect x="4" y="3" width="16" height="18" rx="2" /><line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="12" y2="16" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#0B1F3A]">{title}</div>
                        <div className="text-[11px] text-slate-400 leading-snug">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="#" className="mt-4 inline-flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#2563EB] hover:text-white transition-all w-fit hover:scale-102 active:scale-98">
                  Explore First Home Loans <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, 75% width visible, 100% height taken */}
              <div className="w-full h-48 md:w-[203px] md:h-auto shrink-0 relative overflow-hidden">
                <Image
                  src="/images/First Home Buyers.png"
                  alt="First Home"
                  fill
                  className="object-cover object-left"
                />
              </div>
            </motion.div>

            {/* Card 2 - Refinancing */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch md:min-h-[270px] transition-shadow duration-300"
            >
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-3 text-[#16A34A]">
                    <IconRefresh />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#0B1F3A] mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Refinancing
                  </h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4 max-w-[240px]">
                    Lower your rate, reduce repayments and save thousands over the life of your loan.
                  </p>
                  <div className="space-y-2">
                    {["Lower interest rates", "Reduce monthly repayments"].map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="text-[13px] text-slate-600">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="#" className="mt-5 inline-flex items-center gap-1.5 border border-[#16A34A] text-[#16A34A] text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#16A34A] hover:text-white transition-all w-fit hover:scale-102 active:scale-98">
                  Explore Refinance Options <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, 75% width visible, 100% height taken */}
              <div className="w-full h-48 md:w-[203px] md:h-auto shrink-0 relative overflow-hidden bg-white">
                <Image
                  src="/images/Refinancing.png"
                  alt="Refinancing"
                  fill
                  className="object-cover object-left"
                />
              </div>
            </motion.div>

          </motion.div>

          {/* BOTTOM ROW - 4 small cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >

            {/* Investment Loans - Purple */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px] transition-shadow duration-300"
            >
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center mb-1.5 text-[#7C3AED]">
                    <IconBarChart />
                  </div>
                  <div className="w-7 h-0.5 bg-[#7C3AED] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Investment Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Grow your wealth with smart investment loan strategies.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#7C3AED] text-[10px] font-semibold border border-[#7C3AED] px-2.5 py-1.5 rounded-full hover:bg-[#7C3AED] hover:text-white transition-all w-fit whitespace-nowrap hover:scale-102 active:scale-98">
                  Explore <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, 75% width visible, 100% height taken */}
              <div className="w-[143px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/Investment Loans.png"
                  alt="Investment"
                  fill
                  className="object-cover object-left"
                />
              </div>
            </motion.div>

            {/* Healthcare Professionals - Teal */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px] transition-shadow duration-300"
            >
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] flex items-center justify-center mb-1.5 text-[#0D9488]">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="w-7 h-0.5 bg-[#0D9488] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Healthcare Professionals</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Exclusive lending privileges for doctors, nurses &amp; allied health.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#0D9488] text-[10px] font-semibold border border-[#0D9488] px-2.5 py-1.5 rounded-full hover:bg-[#0D9488] hover:text-white transition-all w-fit whitespace-nowrap hover:scale-102 active:scale-98">
                  Explore <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, 75% width visible, 100% height taken */}
              <div className="w-[143px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/Healthcare Professionals.png"
                  alt="Healthcare Professionals"
                  fill
                  className="object-cover object-left"
                />
              </div>
            </motion.div>

            {/* Self-Employed Loans - Blue */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px] transition-shadow duration-300"
            >
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EBF5FF] flex items-center justify-center mb-1.5 text-[#2563EB]">
                    <IconUser />
                  </div>
                  <div className="w-7 h-0.5 bg-[#2563EB] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Self-Employed Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Flexible loans for self-employed Australians.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#2563EB] text-[10px] font-semibold border border-[#2563EB] px-2.5 py-1.5 rounded-full hover:bg-[#2563EB] hover:text-white transition-all w-fit whitespace-nowrap hover:scale-102 active:scale-98">
                  Explore <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, 75% width visible, 100% height taken */}
              <div className="w-[143px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/Self-Employed Loans.png"
                  alt="Self Employed"
                  fill
                  className="object-cover object-left"
                />
              </div>
            </motion.div>

            {/* Construction Loans - Orange */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px] transition-shadow duration-300"
            >
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] flex items-center justify-center mb-1.5 text-[#EA580C]">
                    <IconHammer />
                  </div>
                  <div className="w-7 h-0.5 bg-[#EA580C] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Construction Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Build your dream home with construction solutions.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#EA580C] text-[10px] font-semibold border border-[#EA580C] px-2.5 py-1.5 rounded-full hover:bg-[#EA580C] hover:text-white transition-all w-fit whitespace-nowrap hover:scale-102 active:scale-98">
                  Explore <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, 75% width visible, 100% height taken */}
              <div className="w-[143px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/Construction Loans.png"
                  alt="Construction"
                  fill
                  className="object-cover object-left"
                />
              </div>
            </motion.div>

          </motion.div>

          {/* Bottom CTA Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
            className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
              <div className="w-11 h-11 rounded-full bg-[#EBF5FF] flex items-center justify-center shrink-0 text-[#2563EB]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-[#0B1F3A] text-[15px]">Not sure which loan is right for you?</div>
                <div className="text-slate-500 text-[13px]">Our mortgage experts are here to help you every step of the way.</div>
              </div>
            </div>
            <Link href="#" className="bg-[#2563EB] text-white font-bold text-[13px] px-6 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#1d4ed8] transition-all shadow-sm whitespace-nowrap shrink-0 hover:scale-102 active:scale-98">
              Talk To An Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>


      {/* ── SMART TOOLS SECTION ── */}
      <SmartToolsSection />

      {/* ── WHY CHOOSE US SECTION ── */}
      <WhyChooseUsSection />

      {/* ── TESTIMONIALS ── */}
      <TestimonialSection />

      {/* ── SUCCESS STORIES / BLOG ── */}
      <SuccessStoriesSection />

      {/* ── FAQ + CTA ── */}
      <FaqCtaSection />

      {/* ── PRE-FOOTER + FOOTER ── */}
      <SiteFooterSection />

      {/* Sticky Mobile CTA Bar */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-slate-200/80 px-4 py-3.5 z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex gap-2.5"
          >
            <Link
              href="#"
              className="flex-1 bg-[#2563EB] text-white font-bold text-[12.5px] py-3 rounded-full flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 text-center"
            >
              Book Strategy Call <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="#"
              className="flex-1 border border-[#2563EB] text-[#2563EB] bg-white font-bold text-[12.5px] py-3 rounded-full flex items-center justify-center gap-1.5 text-center"
            >
              <Calculator className="w-3.5 h-3.5" /> Borrowing Power
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function WhyChooseUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    { city: "Sydney", title: "Mortgage Broker in Sydney", desc: "Expert mortgage broker in Sydney helping health professionals, first home buyers and property investors secure the right home loan with tailored lending strategies.", img: "/images/sydney_real.png" },
    { city: "Adelaide", title: "Mortgage Broker in Adelaide", desc: "Mortgage Xperts serves health professionals and investors in Adelaide with expert home loan and refinancing solutions. Personalised guidance to navigate Australia's complex mortgage market.", img: "/images/adelaide_real.png" },
    { city: "Melbourne", title: "Mortgage Broker in Melbourne", desc: "Trusted mortgage broker in Melbourne helping doctors, nurses, allied health professionals and property investors get personalised home loan solutions, refinancing advice and investment finance.", img: "/images/melbourne_real.png" },
    { city: "Brisbane", title: "Mortgage Broker in Brisbane", desc: "Mortgage Xperts Brisbane specialises in home loans, refinancing, and investment finance for health professionals and property investors, backed by hundreds of satisfied clients.", img: "/images/brisbane_real.png" },
  ];

  return (
    <section className="bg-slate-50 relative py-16 lg:py-24 overflow-hidden border-y border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 flex flex-col">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="w-full lg:w-[60%]"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-[#2563EB] text-[10px] font-extrabold tracking-widest uppercase">
                Australia-Wide Mortgage Specialists
              </span>
            </div>
            <h2 className="text-[#0B1F3A] text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Why Choose <br className="hidden lg:block" />Mortgage <span className="text-[#2563EB]">Xperts?</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="w-full lg:w-[40%] flex flex-col items-start lg:items-end"
          >
            <p className="text-slate-500 text-[13px] sm:text-[14px] leading-relaxed mb-6 lg:text-right max-w-md">
              We deliver <span className="text-[#0B1F3A] font-semibold">personalised lending strategies</span> for health professionals and property investors across Australia. Whether you&apos;re purchasing your first home or building a portfolio, we have you covered.
            </p>
            <Link href="#" className="relative group/btn inline-flex items-center justify-center gap-2 w-fit rounded-xl bg-[#2563EB] px-6 py-3.5 text-[13px] font-bold text-white shadow-md hover:shadow-lg hover:bg-[#1d4ed8] transition-all duration-300 hover:-translate-y-0.5">
              Book Free Strategy Call <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Desktop Interactive Accordion */}
        <div className="hidden lg:flex w-full h-[450px] gap-3">
          {cards.map((card, idx) => {
            const isActive = activeIndex === idx;
            return (
              <motion.div
                key={card.city}
                onHoverStart={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                layout
                initial={false}
                animate={{ flex: isActive ? 3.5 : 1 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group bg-slate-200 shadow-sm border border-slate-200/60"
              >
                {/* Background Image - Clean, vibrant, visible */}
                <Image src={card.img} fill alt={card.city} className={`object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-100' : 'scale-105 opacity-90'}`} />
                {/* Subtle gradient only at bottom so white text is readable */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-70'}`} />

                {/* Content Container */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Inactive State - Vertical Text */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 p-6 flex flex-col items-center justify-end pb-8 ${isActive ? 'pointer-events-none' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/30">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3
                      style={{ writingMode: 'vertical-rl' }}
                      className="text-white font-bold text-[18px] tracking-widest uppercase rotate-180 drop-shadow-md"
                    >
                      {card.city}
                    </h3>
                  </motion.div>

                  {/* Active State - Full Content */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
                    transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
                    className={`flex flex-col justify-end h-full ${!isActive ? 'pointer-events-none' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2563EB] mb-4 shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold text-[24px] mb-2 leading-tight drop-shadow-md">{card.title}</h3>
                    <p className="text-white/95 text-[13px] leading-relaxed max-w-md mb-5 drop-shadow-md">{card.desc}</p>
                    <div className="inline-flex items-center gap-1.5 text-white font-bold text-[13px] hover:opacity-80 transition-opacity">
                      Explore {card.city} Options <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile Vertical Stack */}
        <Stagger className="flex lg:hidden flex-col gap-4">
          {cards.map((card) => (
            <motion.div
              key={card.city}
              variants={staggerItem}
              className="relative rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 p-6 min-h-[280px]"
            >
              <Image src={card.img} fill alt={card.city} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 pt-16">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2563EB] mb-4 shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-[22px] mb-2 leading-tight drop-shadow-md">{card.title}</h3>
                <p className="text-white/95 text-[13px] leading-relaxed mb-5 drop-shadow-md">{card.desc}</p>
                <div className="inline-flex items-center gap-1.5 text-white font-bold text-[13px]">
                  Explore {card.city} Options <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>

      </div>
    </section>
  );
}

function GoogleReviewCard({ name, date, text }: { name: string, date: string, text: string }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: motionCardShadow }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="w-[320px] sm:w-[380px] shrink-0 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mx-3 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] font-extrabold text-lg">
            {name.charAt(0)}
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#0B1F3A] leading-tight">{name}</h4>
            <span className="text-[12px] text-slate-500 font-medium">{date}</span>
          </div>
        </div>
        <svg width="24" height="24" viewBox="0 0 48 48" className="shrink-0">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
      </div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <svg key={i} className="w-4 h-4 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-[14px] text-slate-600 leading-relaxed">
        &quot;{text}&quot;
      </p>
    </motion.div>
  )
}

function TestimonialSection() {
  const reviews1 = [
    { name: "John Smith", date: "2 weeks ago", text: "Mortgage Xperts made buying our first home an absolute breeze. Highly recommend their services to anyone looking for a loan!" },
    { name: "Sarah Jenkins", date: "1 month ago", text: "Professional, fast, and reliable. They explained everything clearly and got us an amazing interest rate on our refinance." },
    { name: "Raj Patel", date: "3 months ago", text: "As a self-employed business owner, getting a loan is tough. Kunal and the team sorted it out without any stress. 5 stars!" },
    { name: "Emily Clark", date: "2 months ago", text: "The team at Mortgage Xperts is phenomenal. They went above and beyond to help us secure our dream home in Brisbane." }
  ];

  const reviews2 = [
    { name: "David O'Connor", date: "4 weeks ago", text: "Great communication throughout the entire process. We always knew what was happening with our application." },
    { name: "Anita Rai", date: "1 week ago", text: "Highly recommend! They are the best Nepali mortgage brokers in Australia. Very trustworthy and efficient." },
    { name: "Michael Chen", date: "3 months ago", text: "Refinancing was so easy with Mortgage Xperts. We are saving thousands every year now. Thank you team!" },
    { name: "Sophie Taylor", date: "2 months ago", text: "Extremely knowledgeable brokers who actually care about their clients. I felt supported every step of the way." }
  ];

  const row1 = [...reviews1, ...reviews1, ...reviews1];
  const row2 = [...reviews2, ...reviews2, ...reviews2];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden border-b border-slate-100">
      <Stagger className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-12 text-center flex flex-col items-center">
        <StaggerItem>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit mb-4 mx-auto">
            <span className="text-[#2563EB] text-[10px] font-extrabold tracking-widest uppercase">
              Google Reviews
            </span>
          </div>
        </StaggerItem>
        <StaggerItem>
          <h2 className="text-[#0B1F3A] text-[32px] sm:text-[40px] font-black leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Loved By Hundreds of <span className="text-[#2563EB]">Happy Clients</span>
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="text-slate-500 text-[15px] max-w-2xl mx-auto">
            Don&apos;t just take our word for it. See what our clients have to say about their experience with Mortgage Xperts.
          </p>
        </StaggerItem>
      </Stagger>

      {/* Marquee Row 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_LOOSE}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="flex w-max animate-marquee hover:[animation-play-state:paused] mb-6"
      >
        {row1.map((rev, i) => <GoogleReviewCard key={`r1-${i}`} {...rev} />)}
      </motion.div>

      {/* Marquee Row 2 (Reverse) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_LOOSE}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
        className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]"
      >
        {row2.map((rev, i) => <GoogleReviewCard key={`r2-${i}`} {...rev} />)}
      </motion.div>
    </section>
  )
}