"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  HelpCircle,
  PiggyBank,
  Check,
  Award,
  ShieldCheck,
  Bookmark,
  Shield,
  ThumbsUp
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const EASE_OUT = [0.16, 1, 0.3, 1];
const premiumFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } }
};

const VIEWPORT_LOOSE = { once: true, margin: "-120px" };
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const motionCardHover = {
  y: -5,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};
const motionCardShadow = "0 18px 42px rgba(15, 23, 42, 0.08)";

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#EA580C] shrink-0">
    <path d="M12 2c0 0-4.5 4.5-4.5 8.5C7.5 13.5 9.5 15 12 15s4.5-1.5 4.5-4.5C16.5 6.5 12 2 12 2zm0 18c3.5 0 6-2.5 6-6 0-1.5-.5-3-1.5-4.5-1.5 2-3.5 3-4.5 4s-1.5 2-1.5 3c0 2 1.5 3.5 3 3.5z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
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

function GoogleReviewCard({ name, date, text }: { name: string; date: string; text: string }) {
  return (
    <div className="w-[300px] sm:w-[350px] shrink-0 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mx-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] font-extrabold text-base">
            {name.charAt(0)}
          </div>
          <div>
            <h4 className="text-[13.5px] font-bold text-[#0B1F3A] leading-tight">{name}</h4>
            <span className="text-[11px] text-slate-500 font-medium">{date}</span>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-[12.5px] text-slate-650 leading-relaxed italic">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

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

  const reviews1 = [
    { name: "John Smith", date: "2 weeks ago", text: "Mortgage Xperts made buying our first home an absolute breeze. Highly recommend Aakash and the team to anyone looking for a loan!" },
    { name: "Sarah Jenkins", date: "1 month ago", text: "Professional, fast, and reliable. They explained everything clearly and got us an amazing interest rate on our refinance." },
    { name: "Raj Patel", date: "3 months ago", text: "As a self-employed business owner, getting a loan is tough. Aakash sorted it out without any stress. 5 stars!" },
    { name: "Emily Clark", date: "2 months ago", text: "Aakash is phenomenal. They went above and beyond to help us secure our dream home in Brisbane." }
  ];

  const reviews2 = [
    { name: "David O'Connor", date: "4 weeks ago", text: "Great communication throughout the entire process. We always knew what was happening with our application." },
    { name: "Anita Rai", date: "1 week ago", text: "Highly recommend! They are the best Nepali mortgage brokers in Australia. Very trustworthy and efficient." },
    { name: "Michael Chen", date: "3 months ago", text: "Refinancing was so easy with Mortgage Xperts. We are saving thousands every year now. Thank you Aakash!" },
    { name: "Sophie Taylor", date: "2 months ago", text: "Extremely knowledgeable brokers who actually care about their clients. I felt supported every step of the way." }
  ];

  const row1 = [...reviews1, ...reviews1];
  const row2 = [...reviews2, ...reviews2];

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-inter">
      <SiteHeader isSticky={true} />

      {/* Main Profile & Multi-step Section */}
      <main className="flex-1 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-12 w-full">
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
                Licensed Broker (CRN 549925) powered by Mortgage Xperts. Providing bilingual, expert home loan guidance.
              </p>
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
                  variants={premiumFadeIn}
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
                      Thanks, <strong className="text-slate-800 font-bold">{fullName}</strong>. Your 7-step mortgage profile has been loaded. Aakash will review your details and reach out shortly.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 bg-[#0B1F3A] text-white hover:bg-slate-800 text-[11px] font-bold uppercase px-5 py-3 rounded-xl transition-all"
                    >
                      Return to Homepage <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div>
                      <span className="text-[9px] text-[#2563EB] font-extrabold uppercase tracking-widest block">Qualification Checklist</span>
                      <h2 className="text-[#0B1F3A] text-base font-extrabold tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        Pre-Approval Qualification
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

      {/* ── LENDER PANEL MARQUEE SECTION ── */}
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
      <section className="py-12 md:py-16 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100/60 rounded-full px-3 py-1 mb-3">
            <ThumbsUp className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[10px] font-extrabold text-[#2563EB] uppercase tracking-widest">Client Success</span>
          </div>
          <h2 className="text-[#0B1F3A] text-2xl sm:text-3xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Loved by <span className="text-[#2563EB]">1,200+ Australian Families</span>
          </h2>
        </div>

        {/* Marquee Testimonials Rows */}
        <div className="space-y-4">
          <div className="flex overflow-hidden relative" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
            <div className="flex w-max animate-marquee hover:pause">
              {row1.map((rev, i) => (
                <GoogleReviewCard key={`r1-${i}`} {...rev} />
              ))}
            </div>
          </div>
          <div className="flex overflow-hidden relative" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
            <div className="flex w-max animate-marquee-reverse hover:pause">
              {row2.map((rev, i) => (
                <GoogleReviewCard key={`r2-${i}`} {...rev} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
