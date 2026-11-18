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
    accent: "#10A3EB",
    from: "from-[#10A3EB]",
    to: "to-[#38BDF8]",
    bgLight: "bg-[#EAF3FF]",
    borderLight: "border-[#10A3EB]/15",
    textAccent: "text-[#10A3EB]",
    bgAccent: "bg-[#10A3EB]",
    glowBg: "bg-blue-50/40",
    badge: "bg-blue-50 text-sky-600 border-sky-200"
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
  subtext = "From your initial strategy consultation to settlement and key collection, we guide you through every milestone with complete transparency.",
  colorTheme = "blue"
}: RoadmapSectionProps) {
  const [mobileActiveStepIndex, setMobileActiveStepIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const t = THEMES[colorTheme] || THEMES.blue;

  const roadmapSteps = [
    {
      num: "01",
      img: "/images/doctor_hero.png",
      phase: "PHASE 01",
      title: "Strategic Call",
      tagline: "Build a roadmap",
      desc: "Connect for a brief strategy session where we discuss your home-ownership goals, timeline, income, and how to structure your path forward.",
      highlight: "Tailored strategic timeline.",
      floatingText: "Strategy First. Clear Guidance.",
      accentClass: "from-[#10A3EB] to-[#0e92d3]",
      glowColor: "rgba(16,163,235,0.12)",
      bgGradient: "from-[#0A2540] to-[#004899]",
      icon: Users,
      colorClass: "bg-sky-50 text-[#10A3EB]",
      highlightsRow: [
        { label: "1-on-1 Consultation" },
        { label: "Goal Setting" },
        { label: "Timeline Review" },
        { label: "Clear Next Steps" }
      ],
      evaluate: [
        { label: "Financial Goals", icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
        { label: "Borrowing Target", icon: Wallet, color: "bg-rose-50 text-rose-600" },
        { label: "Initial Budget", icon: Coins, color: "bg-amber-50 text-amber-600" },
        { label: "Deposit Strategy", icon: PiggyBank, color: "bg-blue-50 text-blue-600" }
      ]
    },
    {
      num: "02",
      img: "/images/step_1.png",
      phase: "PHASE 02",
      title: "Borrowing Power",
      tagline: "Know your limit",
      desc: "We analyze your income, expenses, and existing debts to calculate your exact borrowing limits across 40+ Australian lenders.",
      highlight: "Overcomes HECS debt parameters.",
      floatingText: "Know Your Limit. Buy With Confidence.",
      accentClass: "from-[#10B981] to-[#059669]",
      glowColor: "rgba(16,185,129,0.12)",
      bgGradient: "from-[#0A2540] to-[#004899]",
      icon: Calculator,
      colorClass: "bg-emerald-50 text-emerald-600",
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
      num: "03",
      img: "/images/step_2.png",
      phase: "PHASE 03",
      title: "Deposit Planning",
      tagline: "Leverage schemes",
      desc: "Explore government 5% schemes to waive expensive Lenders Mortgage Insurance (LMI) and buy with a lower upfront deposit.",
      highlight: "Save up to $15,000+ in fees.",
      floatingText: "Minimize Upfront Cost. Save Up to $25k.",
      accentClass: "from-[#8B5CF6] to-[#7C3AED]",
      glowColor: "rgba(139,92,246,0.12)",
      bgGradient: "from-[#062F24] to-[#094E3A]",
      icon: PiggyBank,
      colorClass: "bg-purple-50 text-purple-600",
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
      num: "04",
      img: "/images/step_3.png",
      phase: "PHASE 04",
      title: "Find Property",
      tagline: "Shop with budget",
      desc: "With a pre-approved budget in hand, search for your ideal home confidently. We provide complimentary property reports.",
      highlight: "Free property data validation.",
      floatingText: "Shop Confidently. Lock in Pre-Approval.",
      accentClass: "from-[#F59E0B] to-[#D97706]",
      glowColor: "rgba(245,158,11,0.12)",
      bgGradient: "from-[#1F1A3A] to-[#3B1547]",
      icon: Search,
      colorClass: "bg-amber-50 text-amber-600",
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
      num: "05",
      img: "/images/step_4.png",
      phase: "PHASE 05",
      title: "Loan Approval",
      tagline: "Formal confirmation",
      desc: "We package and submit your loan application to your chosen lender, managing communications until formal approval is secured.",
      highlight: "Fast-tracked expert channel submission.",
      floatingText: "Stress-Free Processing. Fast-Tracked.",
      accentClass: "from-[#EC4899] to-[#DB2777]",
      glowColor: "rgba(236,72,153,0.12)",
      bgGradient: "from-[#3B1E0A] to-[#542103]",
      icon: ShieldCheck,
      colorClass: "bg-pink-50 text-pink-600",
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
      num: "06",
      img: "/images/step_5.png",
      phase: "PHASE 06",
      title: "Settlement",
      tagline: "Collect your keys",
      desc: "Your solicitor coordinates with the lender to transfer funds to the vendor. The property is officially yours—keys in hand!",
      highlight: "Celebrate your home-ownership!",
      floatingText: "Keys Transferred. Welcome Home!",
      accentClass: "from-[#14B8A6] to-[#0D9488]",
      glowColor: "rgba(20,184,166,0.12)",
      bgGradient: "from-[#3D0A25] to-[#540733]",
      icon: Gift,
      colorClass: "bg-teal-50 text-teal-600",
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
      Your Home Loan Journey -{" "}
      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${t.from} ${t.to}`}>
        Six Simple Steps
      </span>
    </>
  );

  return (
    <section id="roadmap" className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden">
      {/* Background glow blur */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] ${t.glowBg} rounded-full blur-3xl`} />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full z-10">
        {/* Single Section Header */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <div className={`inline-flex items-center gap-2 ${t.bgLight} border ${t.borderLight} rounded-full px-4 py-2 mb-4 w-fit`}>
            <span className={`w-2 h-2 rounded-full ${t.bgAccent}`} />
            <span className={`${t.textAccent} text-[11px] font-black tracking-widest uppercase`}>
              {badge}
            </span>
          </div>

          <h2 className="text-[#0B1F3A] text-[26px] sm:text-[34px] lg:text-[40px] font-extrabold leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            {defaultTitle}
          </h2>

          <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
            {subtext}
          </p>
        </div>

        {/* DESKTOP VERSION: Interactive Step Tracker & Dynamic Detail Card (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT Column: Step Navigation List */}
          <div className="lg:col-span-5 relative">
            <div
              className="absolute pointer-events-none"
              style={{ left: "28px", top: "24px", bottom: "24px", width: "2px" }}
            >
              <div className="absolute inset-0 bg-[#E2E8F0]" />
              <div
                className="absolute top-0 left-0 w-full transition-all duration-500"
                style={{
                  height: `${(activeStepIndex / 5) * 100}%`,
                  background: `linear-gradient(to bottom, ${t.accent}, #10B981, #8B5CF6, #F59E0B, #EC4899, #14B8A6)`
                }}
              />
            </div>

            <div className="space-y-2 relative z-10">
              {roadmapSteps.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const isPast = activeStepIndex > idx;
                const StepIcon = step.icon;

                const colors = [
                  { accent: t.accent, lightBg: t.bgLight, border: t.borderLight },
                  { accent: "#10B981", lightBg: "#ECFDF5", border: "#A7F3D0" },
                  { accent: "#8B5CF6", lightBg: "#EDE9FE", border: "#DDD6FE" },
                  { accent: "#F59E0B", lightBg: "#FFFBEB", border: "#FDE68A" },
                  { accent: "#EC4899", lightBg: "#FDF2F8", border: "#FBCFE8" },
                  { accent: "#14B8A6", lightBg: "#E6FDFB", border: "#B2F5EA" }
                ][idx];

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className="w-full text-left flex items-center gap-3.5 py-3 px-3.5 rounded-2xl transition-all duration-300 cursor-pointer focus:outline-none"
                    style={{
                      background: isActive ? colors.lightBg : "rgba(255, 255, 255, 0.7)",
                      border: `1.5px solid ${isActive ? colors.border : "transparent"}`,
                      boxShadow: isActive ? "0 10px 25px -5px rgba(11,31,58,0.06), 0 8px 10px -6px rgba(11,31,58,0.04)" : "none",
                      opacity: isActive || isPast ? 1 : 0.5,
                      transform: isActive ? "translateX(6px)" : "translateX(0)"
                    }}
                  >
                    <div
                      className="shrink-0 flex items-center justify-center rounded-xl transition-all duration-300"
                      style={{
                        width: "44px",
                        height: "44px",
                        background: isActive ? colors.accent : isPast ? colors.lightBg : "#F8FAFC",
                        border: `2px solid ${isActive ? colors.accent : isPast ? colors.border : "#E2E8F0"}`,
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
                        Step {idx + 1} • {step.phase}
                      </span>
                      <span
                        className="text-[14.5px] leading-tight font-bold"
                        style={{
                          color: isActive ? "#0B1F3A" : isPast ? "#334155" : "#94A3B8",
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
                        className="ml-auto shrink-0 w-6 h-6 rounded-full flex items-center justify-center shadow-xs"
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
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT Column: Animated Dashboard Card */}
          <div className="lg:col-span-7 w-full flex flex-col justify-start sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_rgba(11,31,58,0.08)] flex flex-col bg-white"
              >
                <div className="px-7 pt-6 pb-5 bg-slate-50/80 border-b border-slate-100 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-block text-[9.5px] tracking-widest font-black uppercase px-3 py-1 rounded-full border ${t.badge}`}>
                      {roadmapSteps[activeStepIndex].phase}
                    </span>
                    <span className="text-slate-400 text-xs font-semibold">
                      Step {activeStepIndex + 1} of 6
                    </span>
                  </div>
                  <h3
                    className="text-[22px] sm:text-[24px] font-extrabold text-[#0B1F3A] leading-snug mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {roadmapSteps[activeStepIndex].title}
                  </h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">
                    {roadmapSteps[activeStepIndex].desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white">
                  {/* Highlights */}
                  <div className="px-6 py-5">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Key Highlights</h4>
                    <div className="space-y-2.5">
                      {roadmapSteps[activeStepIndex].highlightsRow.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3px]" />
                          </div>
                          <span className="text-[#0B1F3A] text-[12.5px] font-semibold leading-tight">{h.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What we evaluate */}
                  <div className="px-6 py-5">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">We Evaluate</h4>
                    <div className="space-y-2.5">
                      {roadmapSteps[activeStepIndex].evaluate.map((ev, i) => {
                        const EvalIcon = ev.icon;
                        return (
                          <div key={i} className="flex items-center gap-2.5">
                            <div className={`w-5 h-5 rounded-lg ${ev.color} flex items-center justify-center shrink-0`}>
                              <EvalIcon className="w-3 h-3" />
                            </div>
                            <span className="text-[#0B1F3A] text-[12.5px] font-semibold leading-tight">{ev.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="relative h-48 md:h-56 w-full overflow-hidden border-t border-slate-100">
                  <Image
                    src={roadmapSteps[activeStepIndex].img}
                    alt={roadmapSteps[activeStepIndex].title}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-md">
                      <div className={`w-6 h-6 rounded-full ${t.bgLight} flex items-center justify-center ${t.textAccent}`}>
                        <HomeIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[#0B1F3A] text-[11px] font-bold">{roadmapSteps[activeStepIndex].floatingText}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                        disabled={activeStepIndex === 0}
                        className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer"
                        aria-label="Previous step"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveStepIndex((prev) => Math.min(5, prev + 1))}
                        disabled={activeStepIndex === 5}
                        className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer"
                        aria-label="Next step"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE VERSION: VERTICAL ACCORDION TIMELINE (Under lg) */}
        <div className="lg:hidden space-y-3 max-w-xl mx-auto">
          {roadmapSteps.map((step, idx) => {
            const isMobileActive = mobileActiveStepIndex === idx;
            const StepIcon = step.icon;
            const colors = [
              { accent: t.accent, lightBg: t.bgLight, border: "rgba(0,0,0,0.1)" },
              { accent: "#10B981", lightBg: "#ECFDF5", border: "#A7F3D0" },
              { accent: "#8B5CF6", lightBg: "#EDE9FE", border: "#DDD6FE" },
              { accent: "#F59E0B", lightBg: "#FFFBEB", border: "#FDE68A" },
              { accent: "#EC4899", lightBg: "#FDF2F8", border: "#FBCFE8" },
              { accent: "#14B8A6", lightBg: "#E6FDFB", border: "#B2F5EA" }
            ][idx];

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setMobileActiveStepIndex(isMobileActive ? -1 : idx)}
                  className="w-full flex items-center gap-3.5 p-4 text-left transition-colors hover:bg-slate-50/50 focus:outline-none cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      background: isMobileActive ? colors.accent : colors.lightBg,
                      border: `1.5px solid ${isMobileActive ? colors.accent : colors.border}`,
                      color: isMobileActive ? "#ffffff" : colors.accent
                    }}
                  >
                    <StepIcon style={{ width: "18px", height: "18px", strokeWidth: 2.2 }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[9px] font-black uppercase tracking-wider block mb-0.5"
                      style={{ color: colors.accent }}
                    >
                      Step {idx + 1} • {step.phase}
                    </span>
                    <h3 className="text-slate-800 text-[14px] font-bold leading-none">{step.title}</h3>
                  </div>

                  <div className={`transition-transform duration-300 ${isMobileActive ? `rotate-90 ${t.textAccent}` : "rotate-0 text-slate-400"}`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {isMobileActive && (
                  <div className="border-t border-slate-100 bg-slate-50/30">
                    <div className="p-4 space-y-4">
                      <p className="text-slate-600 text-[12.5px] leading-relaxed">
                        {step.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                          <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest block mb-2">Highlights</span>
                          <div className="space-y-1.5">
                            {step.highlightsRow.map((h, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                <span className="text-slate-700 text-[11px] font-semibold truncate leading-none">{h.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                          <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest block mb-2">We Evaluate</span>
                          <div className="space-y-1.5">
                            {step.evaluate.map((ev, i) => {
                              const EvalIcon = ev.icon;
                              return (
                                <div key={i} className="flex items-center gap-1.5">
                                  <div className={`w-3.5 h-3.5 rounded ${ev.color} flex items-center justify-center shrink-0`}>
                                    <EvalIcon className="w-2 h-2 text-current" />
                                  </div>
                                  <span className="text-slate-700 text-[11px] font-semibold truncate leading-none">{ev.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center gap-2 shadow-xs">
                        <div className={`w-6 h-6 rounded-full ${t.bgLight} flex items-center justify-center ${t.textAccent} shrink-0`}>
                          <HomeIcon className="w-3 h-3" />
                        </div>
                        <span className="text-slate-700 text-[10.5px] font-bold">{step.floatingText}</span>
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
  );
}
