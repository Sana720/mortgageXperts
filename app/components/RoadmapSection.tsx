"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calculator,
  PiggyBank,
  Search,
  ShieldCheck,
  Gift,
  ChevronRight,
  Check,
  Home as HomeIcon,
  CheckCircle2,
  TrendingUp,
  Wallet,
  CreditCard,
  Users,
  Percent,
  MapPin,
  Briefcase,
  Scale,
  Landmark,
  Key,
  ShieldAlert,
  UserCheck,
  AlertCircle,
  FileText,
  Coins
} from "lucide-react";

interface RoadmapSectionProps {
  badge?: string;
  title?: React.ReactNode;
  subtext?: string;
  colorTheme?: "blue" | "green" | "teal" | "rose" | "purple" | "amber" | "emerald" | "sky";
}

const THEMES = {
  blue: {
    accent: "#2563EB",
    from: "from-[#2563EB]",
    to: "to-[#38BDF8]",
    bgLight: "bg-[#EAF3FF]",
    borderLight: "border-[#2563EB]/15",
    textAccent: "text-[#2563EB]",
    bgAccent: "bg-[#2563EB]",
    glowBg: "bg-blue-50/40",
    badge: "bg-blue-50 text-blue-600 border-blue-200"
  },
  green: {
    accent: "#16A34A",
    from: "from-[#16A34A]",
    to: "to-[#34D399]",
    bgLight: "bg-[#F0FDF4]",
    borderLight: "border-[#16A34A]/15",
    textAccent: "text-[#16A34A]",
    bgAccent: "bg-[#16A34A]",
    glowBg: "bg-green-50/40",
    badge: "bg-green-50 text-green-700 border-green-200"
  },
  teal: {
    accent: "#0D9488",
    from: "from-[#0D9488]",
    to: "to-[#2DD4BF]",
    bgLight: "bg-[#F0FDFA]",
    borderLight: "border-[#0D9488]/15",
    textAccent: "text-[#0D9488]",
    bgAccent: "bg-[#0D9488]",
    glowBg: "bg-teal-50/40",
    badge: "bg-teal-50 text-teal-700 border-teal-200"
  },
  rose: {
    accent: "#E11D48",
    from: "from-[#E11D48]",
    to: "to-[#FB7185]",
    bgLight: "bg-[#FFF1F2]",
    borderLight: "border-[#E11D48]/15",
    textAccent: "text-[#E11D48]",
    bgAccent: "bg-[#E11D48]",
    glowBg: "bg-rose-50/40",
    badge: "bg-rose-50 text-rose-700 border-rose-200"
  },
  purple: {
    accent: "#7C3AED",
    from: "from-[#7C3AED]",
    to: "to-[#A78BFA]",
    bgLight: "bg-[#F5F3FF]",
    borderLight: "border-[#7C3AED]/15",
    textAccent: "text-[#7C3AED]",
    bgAccent: "bg-[#7C3AED]",
    glowBg: "bg-purple-50/40",
    badge: "bg-purple-50 text-purple-700 border-purple-200"
  },
  amber: {
    accent: "#D97706",
    from: "from-[#D97706]",
    to: "to-[#FBBF24]",
    bgLight: "bg-[#FFFBEB]",
    borderLight: "border-[#D97706]/15",
    textAccent: "text-[#D97706]",
    bgAccent: "bg-[#D97706]",
    glowBg: "bg-amber-50/40",
    badge: "bg-amber-50 text-amber-700 border-amber-200"
  },
  emerald: {
    accent: "#059669",
    from: "from-[#059669]",
    to: "to-[#34D399]",
    bgLight: "bg-[#ECFDF5]",
    borderLight: "border-[#059669]/15",
    textAccent: "text-[#059669]",
    bgAccent: "bg-[#059669]",
    glowBg: "bg-emerald-50/40",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  sky: {
    accent: "#0284C7",
    from: "from-[#0284C7]",
    to: "to-[#0EA5E9]",
    bgLight: "bg-[#F0F9FF]",
    borderLight: "border-[#0284C7]/15",
    textAccent: "text-[#0284C7]",
    bgAccent: "bg-[#0284C7]",
    glowBg: "bg-sky-50/40",
    badge: "bg-sky-50 text-sky-700 border-sky-200"
  }
};

export function RoadmapSection({
  badge = "The Roadmap to Ownership",
  title,
  subtext = "Scroll down — watch each step light up as we guide you through the process, providing full policy transparency at every milestone.",
  colorTheme = "blue"
}: RoadmapSectionProps) {
  const [mobileActiveStepIndex, setMobileActiveStepIndex] = useState(0);
  const roadmapSectionRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const t = THEMES[colorTheme] || THEMES.blue;

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
      const idx = Math.min(4, Math.floor(progress * 5));
      setActiveStepIndex(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const roadmapSteps = [
    {
      num: "01",
      img: "/images/step_1.png",
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
      img: "/images/step_2.png",
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
      img: "/images/step_3.png",
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
      img: "/images/step_4.png",
      phase: "PHASE 04",
      title: "Loan Approval",
      tagline: "Formal confirmation",
      desc: "We package and submit your loan application to your chosen lender, managing communications until formal approval is secured.",
      highlight: "Fast-tracked expert channel submission.",
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
      img: "/images/step_5.png",
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

  const defaultTitle = title || (
    <>
      Five Steps To Your <span className={`text-transparent bg-clip-text bg-gradient-to-r ${t.from} ${t.to}`}>First Home Keys</span>
    </>
  );

  return (
    <div id="roadmap">
      {/* DESKTOP VERSION: STICKY DYNAMIC SCROLL REVEAL (lg and up) */}
      <section
        ref={roadmapSectionRef}
        className="hidden lg:block relative bg-slate-50/50 border-b border-slate-100"
        style={{ minHeight: "550vh" }}
      >
        <div className="sticky w-full flex items-center" style={{ zIndex: 5, top: "64px", height: "calc(100vh - 64px)", padding: "40px 0" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] ${t.glowBg} rounded-full blur-3xl`} />
          </div>

          <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" style={{ zIndex: 1 }}>
            {/* LEFT Column */}
            <div className="flex flex-col justify-center">
              <div className={`inline-flex items-center gap-2 ${t.bgLight} border ${t.borderLight} rounded-full px-4 py-2 mb-5 w-fit`}>
                <span className={`w-2 h-2 rounded-full ${t.bgAccent}`} />
                <span className={`${t.textAccent} text-[11px] font-black tracking-widest uppercase`}>
                  {badge}
                </span>
              </div>

              <h2 className="text-[#0B1F3A] text-[26px] sm:text-[34px] lg:text-[40px] font-extrabold leading-[1.05] mb-5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                {defaultTitle}
              </h2>
              
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-lg">
                {subtext}
              </p>

              {/* STEP TRACKER */}
              <div className="relative">
                <div
                  className="absolute pointer-events-none"
                  style={{ left: "21px", top: "22px", bottom: "22px", width: "2px" }}
                >
                  <div className="absolute inset-0 bg-[#E2E8F0]" />
                  <div
                    className="absolute top-0 left-0 w-full transition-all duration-500"
                    style={{
                      height: `${(activeStepIndex / 4) * 100}%`,
                      background: `linear-gradient(to bottom, ${t.accent}, #10B981, #8B5CF6, #F59E0B, #EC4899)`
                    }}
                  />
                </div>

                <div className="space-y-1">
                  {roadmapSteps.map((step, idx) => {
                    const isActive = activeStepIndex === idx;
                    const isPast = activeStepIndex > idx;
                    const StepIcon = step.icon;

                    const colors = [
                      { accent: t.accent, lightBg: t.bgLight, border: "rgba(0,0,0,0.1)" },
                      { accent: "#10B981", lightBg: "#ECFDF5", border: "#A7F3D0" },
                      { accent: "#8B5CF6", lightBg: "#EDE9FE", border: "#DDD6FE" },
                      { accent: "#F59E0B", lightBg: "#FFFBEB", border: "#FDE68A" },
                      { accent: "#EC4899", lightBg: "#FDF2F8", border: "#FBCFE8" }
                    ][idx];

                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3.5 py-2.5 px-3 rounded-xl transition-all duration-500"
                        style={{
                          background: isActive ? colors.lightBg : "transparent",
                          border: `1px solid ${isActive ? (idx === 0 ? "rgba(0,0,0,0.06)" : colors.border) : "transparent"}`,
                          boxShadow: isActive ? "0 10px 25px -5px rgba(11,31,58,0.05), 0 8px 10px -6px rgba(11,31,58,0.05)" : "none",
                          opacity: isActive || isPast ? 1 : 0.35,
                          transform: isActive ? "translateX(4px)" : "translateX(0)"
                        }}
                      >
                        <div
                          className="shrink-0 flex items-center justify-center rounded-xl transition-all duration-500"
                          style={{
                            width: "44px",
                            height: "44px",
                            background: isActive ? colors.accent : isPast ? colors.lightBg : "#F8FAFC",
                            border: `2px solid ${isActive ? colors.accent : isPast ? (idx === 0 ? "rgba(0,0,0,0.1)" : colors.border) : "#E2E8F0"}`,
                            boxShadow: isActive ? `0 6px 16px ${colors.accent}28` : "none",
                            color: isActive ? "#ffffff" : isPast ? colors.accent : "#94A3B8"
                          }}
                        >
                          <StepIcon style={{ width: "18px", height: "18px", strokeWidth: 2.2 }} />
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
                              fontFamily: "var(--font-montserrat), sans-serif"
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

            {/* RIGHT Column: Animated Dashboard Card */}
            <div className="w-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_rgba(11,31,58,0.08)] flex flex-col bg-white"
                >
                  <div className="px-6 pt-5 pb-4 bg-slate-50 border-b border-slate-100 flex-shrink-0">
                    <span className={`inline-block text-[9px] tracking-widest font-black uppercase px-2.5 py-1 rounded-full mb-2.5 border ${t.badge}`}>
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

                  <div className="grid grid-cols-2 flex-shrink-0">
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

                  <div className="relative h-44 md:h-48 w-full overflow-hidden border-t border-slate-100">
                    <Image
                      src={roadmapSteps[activeStepIndex].img}
                      alt={roadmapSteps[activeStepIndex].title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-md">
                      <div className={`w-6 h-6 rounded-full ${t.bgLight} flex items-center justify-center ${t.textAccent}`}>
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

      {/* MOBILE VERSION: VERTICAL ACCORDION TIMELINE (Under lg) */}
      <section className="lg:hidden py-14 px-6 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-md mx-auto relative z-10">
          <div className={`inline-flex items-center gap-2 ${t.bgLight} border ${t.borderLight} rounded-full px-3.5 py-1.5 mb-4`}>
            <span className={`w-1.5 h-1.5 rounded-full ${t.bgAccent}`} />
            <span className={`${t.textAccent} text-[9.5px] font-black tracking-widest uppercase`}>
              {badge}
            </span>
          </div>

          <h2 className="text-[#0B1F3A] text-[22px] font-extrabold leading-tight mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            {defaultTitle}
          </h2>
          
          <p className="text-slate-500 text-xs leading-relaxed mb-6">
            Tap each step to view the processing actions, highlight lists, and lender checklist guidelines.
          </p>

          <div className="space-y-3">
            {roadmapSteps.map((step, idx) => {
              const isMobileActive = mobileActiveStepIndex === idx;
              const StepIcon = step.icon;
              const colors = [
                { accent: t.accent, lightBg: t.bgLight, border: "rgba(0,0,0,0.1)" },
                { accent: "#10B981", lightBg: "#ECFDF5", border: "#A7F3D0" },
                { accent: "#8B5CF6", lightBg: "#EDE9FE", border: "#DDD6FE" },
                { accent: "#F59E0B", lightBg: "#FFFBEB", border: "#FDE68A" },
                { accent: "#EC4899", lightBg: "#FDF2F8", border: "#FBCFE8" }
              ][idx];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setMobileActiveStepIndex(idx)}
                    className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-slate-50/50 focus:outline-none"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        background: isMobileActive ? colors.accent : colors.lightBg,
                        border: `1.5px solid ${isMobileActive ? colors.accent : colors.border}`,
                        color: isMobileActive ? "#ffffff" : colors.accent
                      }}
                    >
                      <StepIcon className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[8.5px] font-black uppercase tracking-wider block mb-0.5"
                        style={{ color: colors.accent }}
                      >
                        Step {idx + 1} • {step.phase}
                      </span>
                      <h3 className="text-slate-800 text-[13.5px] font-bold leading-none">{step.title}</h3>
                    </div>

                    <div className={`transition-transform duration-300 ${isMobileActive ? `rotate-90 ${t.textAccent}` : "rotate-0 text-slate-400"}`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>

                  {isMobileActive && (
                    <div className="border-t border-slate-100 bg-slate-50/30">
                      <div className="p-4 space-y-4">
                        <p className="text-slate-500 text-xs leading-relaxed">
                          {step.desc}
                        </p>

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

                        <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center gap-2 shadow-sm">
                          <div className={`w-5 h-5 rounded-full ${t.bgLight} flex items-center justify-center ${t.textAccent} shrink-0`}>
                            <HomeIcon className="w-2.5 h-2.5" />
                          </div>
                          <span className="text-slate-700 text-[10px] font-bold">{step.floatingText}</span>
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
  );
}
