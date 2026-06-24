"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  MapPin,
  Briefcase,
  DollarSign,
  User,
  Mail,
  Phone,
  PiggyBank,
  Check,
  Award,
  ShieldCheck,
  Bookmark,
  PlayCircle,
  Clock,
  FileText,
  Download,
  HelpCircle,
  CalendarCheck
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { TestimonialSection } from "../components/TestimonialSection";

import { 
  EASE_OUT, 
  VIEWPORT_LOOSE, 
  staggerContainer, 
  fadeInUp, 
  motionCardHover, 
  motionCardShadow 
} from "@/lib/motion";

const premiumFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } }
};

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#EA580C] shrink-0">
    <path d="M12 2c0 0-4.5 4.5-4.5 8.5C7.5 13.5 9.5 15 12 15s4.5-1.5 4.5-4.5C16.5 6.5 12 2 12 2zm0 18c3.5 0 6-2.5 6-6 0-1.5-.5-3-1.5-4.5-1.5 2-3.5 3-4.5 4s-1.5 2-1.5 3c0 2 1.5 3.5 3 3.5z" />
  </svg>
);

const MIDDLE_FINANCE_REDIRECT_URL = "https://app.middle.finance/ref/6aa0e26a-6c61-46a6-abd9-dd3b1183d67b";



export default function MortgageMatePage() {
  const [step, setStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [loanPurpose, setLoanPurpose] = useState("");
  const [timeline, setTimeline] = useState("");
  const [savings, setSavings] = useState("");
  const [employment, setEmployment] = useState("");
  const [income, setIncome] = useState("");
  const [debts, setDebts] = useState("");
  const [state, setState] = useState("NSW");
  
  // Contact Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const totalSteps = 7;

  const handleNext = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    setSubmitting(true);

    const payload = {
      type: "mortgage_mate",
      name: fullName,
      email: email,
      phone: phone,
      savings: savings || "N/A",
      income: `Income: ${income}, Emp: ${employment}`,
      state: state,
      details: JSON.stringify({
        loanPurpose,
        timeline,
        debts
      })
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFormSubmitted(true);
        window.setTimeout(() => {
          window.location.href = MIDDLE_FINANCE_REDIRECT_URL;
        }, 1200);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = () => {
    if (step === 1) return loanPurpose !== "" && timeline !== "";
    if (step === 2) return savings !== "";
    if (step === 3) return employment !== "";
    if (step === 4) return income !== "";
    if (step === 5) return debts !== "";
    if (step === 6) return state !== "";
    if (step === 7) return fullName.trim() !== "" && email.trim() !== "" && phone.trim() !== "";
    return true;
  };

  const australianStates = ["NSW", "VIC", "QLD", "WA", "SA", "ACT/NT/TAS"];

  const proofStats = [
    { label: "Client Rating", value: "4.9/5" },
    { label: "Client Families", value: "1,200+" },
    { label: "Lender Panel", value: "40+" }
  ];

  const strategySteps = [
    {
      icon: FileText,
      title: "1. Complete Assessment",
      desc: "Answer the same key questions a broker needs before checking lender fit."
    },
    {
      icon: CalendarCheck,
      title: "2. Strategy Call",
      desc: "Aakash reviews your goal, deposit, income and timing before giving next-step guidance."
    },
    {
      icon: ShieldCheck,
      title: "3. Middle Finance Fact Find",
      desc: "After this lead form, you are redirected to securely complete the detailed application."
    }
  ];

  const leadFaqs = [
    {
      q: "Is the Mortgage Mate assessment free?",
      a: "Yes. The first assessment and strategy call are free. Mortgage Xperts is paid by the lender if your loan settles."
    },
    {
      q: "Why do I need to give my details first?",
      a: "Your contact details let the broker connect your answers with the secure fact-find and follow up with lender-specific guidance."
    },
    {
      q: "What happens after I submit the form?",
      a: "Your enquiry is saved for Mortgage Xperts, then you are redirected to Middle Finance to complete the detailed fact-find."
    },
    {
      q: "Can first-home buyers, investors and refinancers all use this?",
      a: "Yes. The questions adapt around your goal so Aakash can assess the most relevant lending strategy."
    }
  ];

  const flyerCards = [
    {
      title: "First Home Buyers",
      tag: "Start Here",
      href: "/first-home-guide",
      image: "/images/First Home Buyers.png",
      accent: "from-blue-600 to-sky-500",
      summary: "Deposit, grants, lender options and pre-approval guidance in one simple path.",
      points: ["Low deposit options", "Grant checks", "Pre-approval plan"]
    },
    {
      title: "Refinance Review",
      tag: "Save Smarter",
      href: "/refinancing-guide",
      image: "/images/Refinancing.png",
      accent: "from-emerald-600 to-teal-500",
      summary: "Check whether your current loan is still competitive before rates move again.",
      points: ["Rate comparison", "Cashflow review", "Switching costs"]
    },
    {
      title: "Investment Loans",
      tag: "Grow Wealth",
      href: "/property-investment-guide",
      image: "/images/Investment Loans.png",
      accent: "from-violet-600 to-indigo-500",
      summary: "Structure your next property purchase with borrowing power and strategy in mind.",
      points: ["Equity strategy", "Rental income", "Portfolio planning"]
    },
    {
      title: "Self-Employed Loans",
      tag: "Alt Doc Ready",
      href: "/self-employed-home-loans",
      image: "/images/Self-Employed Loans.png",
      accent: "from-amber-500 to-orange-500",
      summary: "Turn business income into a lender-ready application without the guesswork.",
      points: ["ABN scenarios", "Alt-doc options", "Income packaging"]
    }
  ];



  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-inter">
      <SiteHeader isSticky={true} />

      {/* Main Profile & Multi-step Section */}
      <main id="lead-form" className="flex-1 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Bio Block */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={premiumFadeUp}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/50 rounded-full px-3 py-1">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[10px] font-extrabold text-[#2563EB] uppercase tracking-widest">Meet Your Mortgage Mate</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-[#0B1F3A] text-[28px] sm:text-[34px] md:text-[40px] font-extrabold leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Aakash KC – The <span className="bg-gradient-to-r from-[#2563EB] to-indigo-600 bg-clip-text text-transparent">Mortgage Mate</span>
              </h1>
              <p className="text-slate-500 text-[13.5px] font-semibold leading-relaxed">
                Start with a free strategy call and assessment, then complete the secure Middle Finance fact-find after your lead profile is saved.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {proofStats.map((stat) => (
                <div key={stat.label} className="bg-white border border-slate-200 rounded-xl px-3 py-3 text-center shadow-sm">
                  <div className="text-[#0B1F3A] text-[17px] font-extrabold leading-none">{stat.value}</div>
                  <div className="text-slate-400 text-[9px] font-extrabold uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#0B1F3A] shadow-xl shadow-blue-950/10">
              <div className="relative h-[250px]">
                <Image src="/images/aakash_new.png" fill alt="Aakash KC mortgage strategy video" className="object-cover object-top opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/35 to-transparent" />
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center text-white"
                  aria-label="Play Mortgage Mate introduction video"
                >
                  <span className="w-16 h-16 rounded-full bg-white/95 text-[#2563EB] flex items-center justify-center shadow-2xl shadow-blue-950/30 transition-transform hover:scale-105">
                    <PlayCircle className="w-9 h-9" />
                  </span>
                </button>
                <div className="absolute left-4 right-4 bottom-4">
                  <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/15 rounded-full px-3 py-1 mb-2">
                    <Clock className="w-3 h-3 text-sky-200" />
                    <span className="text-[10px] text-sky-100 font-extrabold uppercase tracking-wider">2 min explainer</span>
                  </div>
                  <h2 className="text-white text-[20px] font-extrabold leading-tight">
                    Watch how the free assessment works before you submit.
                  </h2>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-md shadow-slate-100/50 relative overflow-hidden">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-slate-150 shrink-0">
                  <Image src="/images/aakash_new.png" fill alt="Aakash KC" className="object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-slate-900 text-[15px] font-bold">Aakash KC</h3>
                  <p className="text-[#2563EB] text-[11.5px] font-semibold">Principal Mortgage Advisor</p>
                  
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10.5px] text-slate-500 font-bold">4.9/5 from 1,200+ clients</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3 text-slate-600 text-[12.5px] leading-relaxed">
                <p>
                  👋 Hi! Finding the right home loan doesn&apos;t have to feel like navigating a maze. As your licensed mortgage broker, I leverage one of Australia&apos;s leading lending networks to make financing simple and stress-free.
                </p>
                <p className="text-[#0B1F3A] font-bold">
                  The best part? My service is 100% free. We get paid by the lenders, not by you.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-[10.5px] text-slate-600 font-semibold">MFAA Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-[10.5px] text-slate-600 font-semibold">40+ Lenders Panel</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Multi-Step Form */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={premiumFadeUp}
            className="lg:col-span-7"
          >
            <div className="bg-white border-2 border-blue-500/20 rounded-2xl p-5 sm:p-6 shadow-xl shadow-blue-500/5 relative">
              
              {formSubmitted ? (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={premiumFadeUp}
                  className="text-center py-10 px-4 space-y-5"
                >
                  <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mx-auto text-emerald-500 shadow-sm">
                    <CheckCircle className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-[#0B1F3A] text-xl font-bold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Assessment Profile Created!
                    </h2>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                      Thanks, <strong className="text-slate-800 font-bold">{fullName}</strong>. Your lead has been saved. Redirecting you to the secure Middle Finance fact-find now.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href={MIDDLE_FINANCE_REDIRECT_URL}
                      className="inline-flex items-center gap-1.5 bg-[#0B1F3A] text-white hover:bg-slate-800 text-[11px] font-bold uppercase px-5 py-3 rounded-xl transition-all"
                    >
                      Continue to Middle Finance <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div>
                      <span className="text-[9px] text-[#2563EB] font-extrabold uppercase tracking-widest block">Strategy Call & Assessment</span>
                      <h2 className="text-[#0B1F3A] text-base font-extrabold tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        Start Your Mortgage Profile
                      </h2>
                    </div>
                    <div className="text-[11px] text-[#2563EB] font-bold bg-blue-50 border border-blue-100/30 px-2.5 py-0.5 rounded-md">
                      Step {step} of {totalSteps}
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                  </div>

                  <div className="min-h-[220px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* STEP 1: Loan Purpose & Settle Timeline */}
                        {step === 1 && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">1. What is your primary financing goal?</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {[
                                  { value: "purchase", label: "Buy a First Home" },
                                  { value: "refinance", label: "Refinance Smarter" },
                                  { value: "invest", label: "Property Investment" },
                                  { value: "land", label: "House & Land Package" },
                                  { value: "commercial", label: "Commercial Finance" }
                                ].map((obj) => (
                                  <button
                                    type="button"
                                    key={obj.value}
                                    onClick={() => setLoanPurpose(obj.value)}
                                    className={`p-2.5 rounded-xl border text-[12.5px] font-bold text-left transition-all ${
                                      loanPurpose === obj.value
                                        ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-55"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{obj.label}</span>
                                      {loanPurpose === obj.value && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {loanPurpose && (
                              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">2. When are you looking to purchase/settle?</label>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { value: "Immediately", label: "Immediately" },
                                    { value: "1-3 Months", label: "1-3 Months" },
                                    { value: "3-6 Months", label: "3-6 Months" },
                                    { value: "6+ Months", label: "6+ Months" }
                                  ].map((obj) => (
                                    <button
                                      type="button"
                                      key={obj.value}
                                      onClick={() => setTimeline(obj.value)}
                                      className={`p-2 rounded-xl border text-[12px] font-bold text-left transition-all ${
                                        timeline === obj.value
                                          ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-55"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span>{obj.label}</span>
                                        {timeline === obj.value && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {/* STEP 2: Savings */}
                        {step === 2 && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Current Savings / Deposit Available:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { value: "Less than $10,000", label: "Less than $10k" },
                                { value: "$10,000 - $30,000", label: "$10k - $30k" },
                                { value: "$30,000 - $50,000", label: "$30k - $50k" },
                                { value: "$50,000 - $100,000", label: "$50k - $100k" },
                                { value: "$100,000+", label: "$100k+" }
                              ].map((obj) => (
                                <button
                                  type="button"
                                  key={obj.value}
                                  onClick={() => setSavings(obj.value)}
                                  className={`p-3 rounded-xl border text-[12.5px] font-bold text-left flex items-center justify-between transition-all ${
                                    savings === obj.value
                                      ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-55"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <PiggyBank className="w-4 h-4 text-slate-400" />
                                    <span>{obj.label}</span>
                                  </div>
                                  {savings === obj.value && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* STEP 3: Employment */}
                        {step === 3 && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Your Current Employment Status:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { value: "Full-Time PAYG", label: "Full-Time PAYG" },
                                { value: "Part-Time PAYG", label: "Part-Time PAYG" },
                                { value: "Self-Employed / Business Owner", label: "Self-Employed" },
                                { value: "Casual / Contract Worker", label: "Casual / Contractor" },
                                { value: "Other Structure / Unemployed", label: "Other / Unemployed" }
                              ].map((obj) => (
                                <button
                                  type="button"
                                  key={obj.value}
                                  onClick={() => setEmployment(obj.value)}
                                  className={`p-3 rounded-xl border text-[12.5px] font-bold text-left flex items-center justify-between transition-all ${
                                    employment === obj.value
                                      ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-55"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-slate-400" />
                                    <span>{obj.label}</span>
                                  </div>
                                  {employment === obj.value && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* STEP 4: Income */}
                        {step === 4 && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Annual Household Income (Gross):</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { value: "Under $50,000", label: "Under $50k" },
                                { value: "$50,000 - $80,000", label: "$50k - $80k" },
                                { value: "$80,000 - $120,000", label: "$80k - $120k" },
                                { value: "$120,000 - $180,000", label: "$120k - $180k" },
                                { value: "$180,000+", label: "$180k+" }
                              ].map((obj) => (
                                <button
                                  type="button"
                                  key={obj.value}
                                  onClick={() => setIncome(obj.value)}
                                  className={`p-3 rounded-xl border text-[12.5px] font-bold text-left flex items-center justify-between transition-all ${
                                    income === obj.value
                                      ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-55"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-slate-400" />
                                    <span>{obj.label}</span>
                                  </div>
                                  {income === obj.value && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* STEP 5: Debts & Liabilities */}
                        {step === 5 && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Do you have active loans, credit cards or student debt?</label>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                { value: "No major active liabilities", label: "No major debts" },
                                { value: "Credit Cards (Under $5,000 limit)", label: "Credit Cards (Under $5,000 limit)" },
                                { value: "Credit Cards (Over $5,000 limit)", label: "Credit Cards (Over $5,000 limit)" },
                                { value: "Active Car or Personal Loans", label: "Active Car or Personal Loans" },
                                { value: "HECS / HELP Student Debt", label: "HECS / HELP Student Debt" }
                              ].map((obj) => (
                                <button
                                  type="button"
                                  key={obj.value}
                                  onClick={() => setDebts(obj.value)}
                                  className={`p-2.5 rounded-xl border text-[12.5px] font-bold text-left flex items-center justify-between transition-all ${
                                    debts === obj.value
                                      ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-55"
                                  }`}
                                >
                                  <span>{obj.label}</span>
                                  {debts === obj.value && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* STEP 6: State */}
                        {step === 6 && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Which state are you buying property in?</label>
                            <div className="grid grid-cols-3 gap-2">
                              {australianStates.map((st) => (
                                <button
                                  type="button"
                                  key={st}
                                  onClick={() => setState(st)}
                                  className={`p-3.5 rounded-xl border text-[13px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                                    state === st
                                      ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-55"
                                  }`}
                                >
                                  <MapPin className="w-4.5 h-4.5" />
                                  <span>{st}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* STEP 7: Contact Info */}
                        {step === 7 && (
                          <div className="space-y-3.5">
                            <div className="bg-blue-50/30 border border-blue-100/60 p-3.5 rounded-xl flex gap-3">
                              <Bookmark className="w-4.5 h-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                              <div className="text-[11px] text-slate-600 font-medium leading-relaxed">
                                Perfect! We have matched lending strategies for <strong className="text-slate-800 font-bold">{state}</strong>. Provide your details below so Aakash can compile your pre-approval analysis.
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Full Name:</label>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                  <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-[12.5px] text-slate-800 focus:outline-none focus:border-blue-500 transition-all font-semibold"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Email Address:</label>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                  <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-[12.5px] text-slate-800 focus:outline-none focus:border-blue-500 transition-all font-semibold"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Phone Number:</label>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                  <input
                                    type="tel"
                                    placeholder="0400 000 000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-[12.5px] text-slate-800 focus:outline-none focus:border-blue-500 transition-all font-semibold"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6 gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 1}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        step === 1
                          ? "opacity-30 text-slate-350 cursor-not-allowed border border-transparent"
                          : "text-slate-600 hover:bg-slate-55 border border-slate-200"
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>

                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all shadow-sm ${
                          isStepValid()
                            ? "bg-[#2563EB] hover:bg-[#1d4ed8] text-white hover:scale-[1.01]"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isStepValid() || submitting}
                        className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-all shadow-sm ${
                          isStepValid() && !submitting
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-[1.01]"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {submitting ? "Submitting..." : "Submit Profile"} <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Strategy Call & Assessment */}
      <section className="bg-white py-12 md:py-16 border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-4">
                <CalendarCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="text-[10px] text-[#2563EB] font-extrabold uppercase tracking-widest">Proven Lead Flow</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[26px] md:text-[34px] font-extrabold leading-tight">
                Strategy call first. Full application after trust is built.
              </h2>
              <p className="text-slate-500 text-[14px] leading-relaxed mt-3 font-medium">
                The page now asks for only the details needed to qualify the enquiry, then moves serious clients into the Middle Finance fact-find.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {strategySteps.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 text-[#2563EB] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[#0B1F3A] text-[15px] font-extrabold leading-tight">{item.title}</h3>
                    <p className="text-slate-500 text-[12.5px] leading-relaxed mt-2 font-medium">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Mate Flyer Stack */}
      <section className="bg-[#0B1F3A] py-14 md:py-18 overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span className="text-[10px] font-extrabold text-sky-100 uppercase tracking-widest">Choose Your Mortgage Mate Path</span>
              </div>
              <h2 className="text-white text-[28px] sm:text-[34px] md:text-[42px] font-extrabold leading-tight tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Free loan guides built to turn visitors into qualified leads.
              </h2>
              <p className="text-blue-100/80 text-[14px] md:text-[15px] leading-relaxed mt-3 max-w-2xl font-medium">
                Pick the situation that fits you best, then complete the quick Mortgage Mate assessment so Aakash can match the right lending strategy.
              </p>
            </div>

            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0B1F3A] hover:bg-sky-50 px-5 py-3 rounded-xl text-[12px] font-extrabold uppercase tracking-wide shadow-lg shadow-blue-950/20 transition-all w-full sm:w-auto"
            >
              Start Free Assessment <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_LOOSE}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5"
          >
            {flyerCards.map((flyer, idx) => (
              <motion.div
                key={flyer.title}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className={`group relative min-h-[430px] rounded-2xl overflow-hidden bg-white shadow-2xl shadow-blue-950/25 border border-white/10 ${idx % 2 === 1 ? "xl:mt-8" : ""}`}
              >
                <Link href={flyer.href} className="absolute inset-0 z-20" aria-label={`Read ${flyer.title} guide`} />
                <div className={`h-2 bg-gradient-to-r ${flyer.accent}`} />
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <Image
                    src={flyer.image}
                    alt={flyer.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/65 via-transparent to-transparent" />
                  <div className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 bg-white text-[#0B1F3A] rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                    <Star className="w-3 h-3 text-[#2563EB] fill-[#2563EB]" />
                    {flyer.tag}
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="text-[#0B1F3A] text-[19px] font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {flyer.title}
                    </h3>
                    <p className="text-slate-500 text-[12.5px] leading-relaxed font-medium mt-2">
                      {flyer.summary}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {flyer.points.map((point) => (
                      <div key={point} className="flex items-center gap-2 text-[11.5px] text-slate-700 font-bold">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-2 flex items-center justify-between text-[#2563EB] text-[12px] font-extrabold uppercase tracking-wide">
                    View flyer
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LENDER PANEL MARQUEE SECTION ── */}
      {/* Download Guide & FAQs */}
      <section className="bg-slate-50 py-14 md:py-18 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40">
              <div className="relative h-64 bg-blue-50">
                <Image src="/images/family_couch_laptop.png" fill alt="Free mortgage guide" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/75 via-[#0B1F3A]/10 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5">
                  <div className="inline-flex items-center gap-1.5 bg-white text-[#2563EB] rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                    <Download className="w-3 h-3" />
                    Free Download Guide
                  </div>
                  <h2 className="text-white text-[24px] font-extrabold leading-tight">
                    Home loan readiness guide for buyers, refinancers and investors.
                  </h2>
                </div>
              </div>
              <div className="p-5">
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                  Use the guide to understand deposit, borrowing power, documents and lender-fit basics. For a personalised version, complete the assessment above.
                </p>
                <a
                  href="#lead-form"
                  className="mt-5 inline-flex items-center justify-center gap-2 w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-xl text-[12px] font-extrabold uppercase tracking-wide transition-all"
                >
                  Get My Personal Assessment <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 mb-4 shadow-sm">
                <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="text-[10px] text-[#2563EB] font-extrabold uppercase tracking-widest">Mortgage Mate FAQs</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[26px] md:text-[34px] font-extrabold leading-tight mb-5">
                Questions people ask before giving their details.
              </h2>
              <div className="space-y-3">
                {leadFaqs.map((faq) => (
                  <details key={faq.q} className="group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-[#0B1F3A] text-[14px] font-extrabold">
                      <span>{faq.q}</span>
                      <span className="w-7 h-7 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center text-base shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-slate-500 text-[12.5px] leading-relaxed mt-3 font-medium">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-b border-slate-100 py-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="shrink-0 md:border-r border-slate-200 pr-6 border-b md:border-b-0 pb-3 md:pb-0 w-full md:w-auto text-center md:text-left flex md:block justify-center bg-white z-10">
              <p className="text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider">
                OUR PANEL OF 40+ LEADING LENDERS
              </p>
            </div>

            {/* Marquee Row */}
            <div className="flex-1 overflow-hidden relative flex items-center h-[50px] w-full" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <div className="flex w-max animate-marquee items-center gap-10 hover:pause">
                {[
                  { src: "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png", scale: "scale-[1.1]" },
                  { src: "/images/brands/westpac-logo-png_seeklogo-152472-1.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/anz-2-logo-png-transparent-1.png", scale: "scale-[1.2]" },
                  { src: "/images/brands/ING_Group_N.V._Logo.svg-1.png", scale: "scale-95" },
                  { src: "/images/brands/St_George_Bank_logo-1-scaled.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/Bankwest_new_logo-1.png", scale: "scale-[1.2]" },
                  { src: "/images/brands/Suncorp-Bank-Logo-1-scaled.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/images-3-1.png", scale: "scale-95" },
                  { src: "/images/brands/adelaide-bank-vector-logo-11574265916rvuvsw06fg-1.png", scale: "scale-[1.5]" },
                  { src: "/images/brands/firstmac-limited-logo-vector-1.png", scale: "scale-100" }
                ].map((brand, i) => (
                  <div key={i} className="relative h-8 w-[100px] shrink-0 flex items-center justify-center">
                    <div className={`relative h-full w-full ${brand.scale}`}>
                      <Image src={brand.src} alt="Lender Logo" fill className="object-contain" sizes="100px" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership Badge */}
            <div className="shrink-0 flex items-center gap-2.5 bg-[#FDFBF7] border border-[#EBE6DD] rounded-xl px-3 py-1.5 shadow-sm">
              <FlameIcon />
              <span className="text-[#0B1F3A] font-bold text-[11.5px] tracking-wide whitespace-nowrap">St.George Flame Broker</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS & INDUSTRY RECOGNITION ── */}
      <section className="py-16 md:py-20 bg-[#EDF1F9]/40 border-t border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center flex flex-col items-center">
          {/* Top Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_LOOSE}
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4 shadow-sm"
          >
            <Star className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB]" />
            <span className="text-[#2563EB] text-[11px] font-extrabold tracking-widest uppercase">
              Award-Winning Excellence
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_LOOSE}
            variants={fadeInUp}
            className="text-[28px] sm:text-[34px] md:text-[42px] font-extrabold text-[#0B1F3A] leading-tight font-montserrat"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Proven Track Record. <br />
            <span className="text-[#2563EB]">Recognised For Excellence.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_LOOSE}
            variants={fadeInUp}
            className="text-slate-500 text-[14.5px] mt-3 max-w-2xl mx-0 lg:mx-auto leading-relaxed font-inter font-medium"
          >
            We take pride in our commitment to excellence, customer satisfaction, and building elite bank partnerships. Here are our recent achievements and industry recognitions.
          </motion.p>

          {/* Grid Layout for Awards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-12 w-full"
          >
            {[
              {
                img: "/images/2.png",
                title: "Quality Business Awards",
                subtitle: "2026 Winner",
                desc: "Quality Rating Over 95%",
              },
              {
                img: "/images/3.png",
                title: "Quality Business Awards",
                subtitle: "2026 Winner",
                desc: "Gold Medalist",
              },
              {
                img: "/images/4.png",
                title: "Achievement Award",
                subtitle: "2026 Honor",
                desc: "Wreath of Excellence",
              },
              {
                img: "/images/5.png",
                title: "Best Self-Employed Broker",
                subtitle: "Australia 2026",
                desc: "Specialist Mortgage Broker",
              },
              {
                img: "/images/7.png",
                title: "Quality Business Awards",
                subtitle: "2026 Winner",
                desc: "Gold Medalist",
              },
            ].map((award, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ ...motionCardHover, boxShadow: motionCardShadow }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 group last:col-span-2 md:last:col-span-1 lg:last:col-span-1"
              >
                {/* Image Container */}
                <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105 self-center">
                  <Image
                    src={award.img}
                    alt={award.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 120px, 176px"
                  />
                </div>
                
                {/* Text Details */}
                <div className="w-full">
                  <h3 className="text-[#0B1F3A] font-extrabold text-[12px] sm:text-[14px] leading-tight mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    {award.title}
                  </h3>
                  <div className="text-[#2563EB] font-bold text-[11px] sm:text-[11.5px] mb-1">
                    {award.subtitle}
                  </div>
                  <p className="text-slate-550 text-[10.5px] font-semibold leading-snug">
                    {award.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS ── */}
      <TestimonialSection 
        badgeText="Client Success"
        titleText={<>Loved by <span className="text-[#2563EB]">1,200+ Australian Families</span></>}
        subtitleText="Read first-hand experiences from our mortgage clients who successfully purchased their dream home or investment properties."
        backgroundClass="bg-white"
      />

      <SiteFooter />
    </div>
  );
}
