"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  Check,
  Clock,
  X
} from "lucide-react";
import Image from "next/image";

const MIDDLE_FINANCE_REDIRECT_URL = "https://app.middle.finance/ref/6aa0e26a-6c61-46a6-abd9-dd3b1183d67b";

interface MortgageMateFormProps {
  onClose?: () => void;
  compact?: boolean;
  initialStep?: number;
}

export function MortgageMateForm({ onClose, compact = false, initialStep = 0 }: MortgageMateFormProps) {
  const [step, setStep] = useState(initialStep); // Starts at initialStep (defaults to 0)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dashboardProgress, setDashboardProgress] = useState(0);

  // Form State - Phase 1: Personal Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  // Form State - Phase 2: Property & Financial Details
  const [loanPurpose, setLoanPurpose] = useState("");
  const [propertyWorth, setPropertyWorth] = useState(""); // price / value / combined cost
  const [loanAmount, setLoanAmount] = useState("");
  const [depositFunds, setDepositFunds] = useState("");
  const [amountOfSavings, setAmountOfSavings] = useState("");
  const [creditHistory, setCreditHistory] = useState("");
  const [comments, setComments] = useState("");
  const [state, setState] = useState("NSW"); // default state option

  const totalSteps = 11;

  // Dashboard redirect and progress timer
  useEffect(() => {
    if (formSubmitted) {
      const interval = setInterval(() => {
        setDashboardProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1.2;
        });
      }, 50);

      const timeout = setTimeout(() => {
        window.location.href = MIDDLE_FINANCE_REDIRECT_URL;
      }, 5500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [formSubmitted]);

  const handleNext = () => {
    if (step === 8) {
      if (depositFunds === "YES" || depositFunds === "YES_AND_GUARANTOR") {
        setStep(9);
      } else {
        setStep(10);
      }
    } else if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 10) {
      if (depositFunds === "YES" || depositFunds === "YES_AND_GUARANTOR") {
        setStep(9);
      } else {
        setStep(8);
      }
    } else if (step === 1 && initialStep === 1 && onClose) {
      onClose();
    } else if (step > 0) {
      setStep((prev) => prev - 1);
    }
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
      savings: amountOfSavings || depositFunds || "N/A",
      income: `Borrow: ${loanAmount}, Worth: ${propertyWorth}, Goal: ${loanPurpose}`,
      state: state || "NSW",
      details: JSON.stringify({
        contactMethod,
        creditHistory,
        comments
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
    if (step === 0) return true;
    if (step === 1) return fullName.trim().length > 0;
    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return phone.trim().length >= 8 && emailRegex.test(email.trim());
    }
    if (step === 3) return contactMethod !== "";
    if (step === 4) return true; // Interstitial
    if (step === 5) return loanPurpose !== "";
    if (step === 6) return propertyWorth.trim().length > 0;
    if (step === 7) return loanAmount.trim().length > 0;
    if (step === 8) return depositFunds !== "";
    if (step === 9) return amountOfSavings.trim().length > 0;
    if (step === 10) return creditHistory !== "";
    if (step === 11) return true; // comments are optional
    return true;
  };

  if (formSubmitted) {
    return (
      <div className="w-full space-y-6 text-left p-2">
        {/* Top Progress bar & Header */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600 animate-ping" />
              <span className="text-[14px] text-[#0B1F3A] font-bold">
                Just a moment while we set up your dashboard...
              </span>
            </div>
            <span className="text-[12px] text-[#2563EB] font-extrabold uppercase tracking-wider">
              {Math.min(100, Math.round(dashboardProgress))}% Completed
            </span>
          </div>
          <div className="w-full bg-blue-100/60 h-2 rounded-full overflow-hidden mt-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-75"
              style={{ width: `${dashboardProgress}%` }}
            />
          </div>
        </div>

        {/* Three Columns Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* COLUMN 1: Your Journey */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-[#0B1F3A] text-[17px] font-extrabold pb-3 border-b border-slate-100">
              Your Journey
            </h3>
            
            <div className="mt-6 space-y-7 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-105">
              {/* Step 1 */}
              <div className="relative pl-9">
                <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-emerald-50 border border-emerald-250 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-emerald-600 text-[14px] font-extrabold">Enquiry Submitted</h4>
                  <p className="text-slate-505 text-[12px] leading-relaxed mt-1 font-medium">
                    We&apos;ve successfully received your enquiry. Our system is now processing your details.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative pl-9">
                <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-slate-900 text-[14px] font-extrabold">FactFind Completion</h4>
                    <span className="bg-blue-100 text-[#2563EB] text-[9.5px] font-extrabold uppercase px-1.5 py-0.5 rounded">
                      Current Stage
                    </span>
                  </div>
                  <p className="text-slate-500 text-[12px] leading-relaxed mt-1 font-medium">
                    Your next step is to complete and submit your FactFind form. This helps Aakash understand your needs and prepare lender fit options.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative pl-9">
                <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center shadow-sm">
                  <span className="text-[11px] font-extrabold">3</span>
                </div>
                <div>
                  <h4 className="text-slate-400 text-[14px] font-bold">Lender Recommendation Ready</h4>
                  <p className="text-slate-400 text-[12px] leading-relaxed mt-1 font-medium">
                    Your broker has finalised their review and matched you with a suitable lender. You can now view their choice and continue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Your Enquiry Details */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[360px] text-left">
            <div>
              <h3 className="text-[#0B1F3A] text-[17px] font-extrabold pb-3 border-b border-slate-100">
                Your Enquiry Details
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <span className="text-slate-400 text-[9.5px] font-extrabold uppercase tracking-wide block">Estimated Price</span>
                  <span className="text-[#0B1F3A] text-[15px] font-extrabold mt-1 block truncate">
                    {propertyWorth ? `$${propertyWorth}` : "$750,000"}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <span className="text-slate-400 text-[9.5px] font-extrabold uppercase tracking-wide block">Loan Target</span>
                  <span className="text-[#0B1F3A] text-[14px] font-extrabold mt-1 block truncate">
                    {loanAmount ? `$${loanAmount}` : "$600,000"}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <span className="text-slate-400 text-[9.5px] font-extrabold uppercase tracking-wide block">Savings/Deposit</span>
                  <span className="text-[#0B1F3A] text-[14px] font-extrabold mt-1 block truncate">
                    {amountOfSavings ? `$${amountOfSavings}` : depositFunds || "$150,000"}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <span className="text-slate-400 text-[9.5px] font-extrabold uppercase tracking-wide block">Credit Rating</span>
                  <span className="text-[#0B1F3A] text-[14px] font-extrabold mt-1 block truncate capitalize">
                    {creditHistory === "ITS_PERFECT" ? "Perfect" :
                     creditHistory === "ALL_DEBT_PAID" ? "Late Payments" :
                     creditHistory === "MINOR_DEFAULT" ? "Minor Default" : "Less than perfect"}
                  </span>
                </div>
              </div>
            </div>

            {/* FactFind Interstitial Card */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 mt-6">
              <span className="text-[#0B1F3A] text-[13.5px] font-bold block">
                Preparing your FactFind form...
              </span>
              <span className="text-slate-505 text-[11px] font-semibold mt-1 block">
                You&apos;ll be able to continue in just a moment.
              </span>
              <a
                href={MIDDLE_FINANCE_REDIRECT_URL}
                className="w-full bg-[#EA580C] hover:bg-[#c2410c] text-white flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider mt-4 shadow-md transition-colors"
              >
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Almost There
              </a>
            </div>
          </div>

          {/* COLUMN 3: Dedicated Broker */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[360px] text-left">
            <div>
              <h3 className="text-[#0B1F3A] text-[17px] font-extrabold pb-3 border-b border-slate-100">
                Your Dedicated Broker
              </h3>

              <div className="flex items-center gap-4 mt-5">
                <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-slate-100 shrink-0">
                  <Image src="/images/aakash_new.png" fill alt="Aakash KC" className="object-cover object-top" />
                </div>
                <div>
                  <h4 className="text-slate-900 text-[15px] font-extrabold">Aakash KC</h4>
                  <p className="text-[#2563EB] text-[12px] font-bold">Principal Mortgage Advisor</p>
                </div>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mt-5">
                <div className="flex items-center justify-between text-[12px] font-bold text-[#2563EB]">
                  <span>Updating details...</span>
                  <span>{Math.min(95, Math.round(dashboardProgress * 0.95))}%</span>
                </div>
                <div className="w-full bg-blue-100 h-1.5 rounded-full overflow-hidden mt-2.5">
                  <div 
                    className="bg-[#2563EB] h-full rounded-full transition-all duration-75" 
                    style={{ width: `${Math.min(95, dashboardProgress * 0.95)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Skeleton blocks */}
            <div className="space-y-3 mt-6 pt-4 border-t border-slate-100">
              <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse" />
              <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
              <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border-0 rounded-2xl ${compact ? "p-4 sm:p-5" : "p-5 sm:p-6"} flex flex-col justify-between h-full min-h-[440px] relative text-left`}>
      {onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer z-20"
          aria-label="Close form popup"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {step === 0 ? (
        <div className="flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <h2 className="text-[#0B1F3A] text-xl sm:text-2xl font-extrabold tracking-tight leading-snug font-montserrat">
              Complete the form and get a reply from us <span className="text-[#10A3EB]">within 24 hours</span>.
            </h2>
            <p className="text-slate-500 text-[12.5px] font-semibold leading-relaxed">
              The information provided is for assessment purposes only. <span className="font-extrabold text-slate-800">No enquiry is made on your credit file.</span>
            </p>
          </div>

          <div className="space-y-4 my-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto bg-[#10A3EB] hover:bg-[#0e92d3] text-white font-extrabold uppercase text-[13px] tracking-wider py-3.5 px-8 rounded-full flex items-center justify-center gap-2 shadow-md shadow-sky-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
              >
                LET&apos;S START <ArrowRight className="w-4 h-4" />
              </button>

              <div className="bg-slate-50 border border-slate-100 text-slate-500 font-extrabold text-[9.5px] tracking-wide uppercase px-4 py-3 rounded-full inline-flex items-center gap-1.5 shrink-0 shadow-sm">
                <Clock className="w-4 h-4 text-[#10A3EB]" />
                <span>COMPLETION / 2 minutes</span>
              </div>
            </div>
          </div>

          {/* Google, Facebook, ProductReview, Trustpilot ratings */}
          <div className="grid grid-cols-4 gap-1.5 pt-4 border-t border-slate-100 mt-auto">
            {/* ProductReview */}
            <div className="text-center pr-0.5 border-r border-slate-100">
              <div className="flex justify-center mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#34A853]">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 2.223.725 4.28 1.956 5.945L3.02 21.02a.5.5 0 00.686.686l3.075-.936A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                </svg>
              </div>
              <div className="flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-[10px] font-bold text-slate-500 mt-1 leading-tight">
                <span className="text-slate-800">4.9</span>/5
              </div>
              <div className="text-[7px] text-slate-400 font-black uppercase tracking-wide leading-none mt-0.5">
                ProductReview
              </div>
            </div>

            {/* Trustpilot */}
            <div className="text-center pr-0.5 border-r border-slate-100">
              <div className="flex justify-center mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#00B67A]">
                  <path d="M12 2L14.78 8.08L21.36 8.87L16.48 13.33L17.9 19.82L12 16.48L6.1 19.82L7.52 13.33L2.64 8.87L9.22 8.08L12 2Z" />
                </svg>
              </div>
              <div className="flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-[10px] font-bold text-slate-500 mt-1 leading-tight">
                <span className="text-slate-800">4.9</span>/5
              </div>
              <div className="text-[7px] text-slate-400 font-black uppercase tracking-wide leading-none mt-0.5">
                Trustpilot
              </div>
            </div>

            {/* Facebook */}
            <div className="text-center pr-0.5 border-r border-slate-100">
              <div className="flex justify-center mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#1877F2]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-[10px] font-bold text-slate-500 mt-1 leading-tight">
                <span className="text-slate-800">4.8</span>/5
              </div>
              <div className="text-[7px] text-slate-400 font-black uppercase tracking-wide leading-none mt-0.5">
                Facebook
              </div>
            </div>

            {/* Google */}
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
              </div>
              <div className="flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-[10px] font-bold text-slate-500 mt-1 leading-tight">
                <span className="text-slate-800">4.8</span>/5
              </div>
              <div className="text-[7px] text-slate-400 font-black uppercase tracking-wide leading-none mt-0.5">
                Google
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <span className="text-[9px] text-[#10A3EB] font-extrabold uppercase tracking-widest block">
                  {step <= 3 ? "Phase 1: Personal Details" : "Phase 2: Property details"}
                </span>
                <h2 className="text-[#0B1F3A] text-sm font-extrabold tracking-tight">
                  {step <= 3 ? `Onboarding Question ${step} of 3` : `Property Question ${step - 3} of 8`}
                </h2>
              </div>
              <div className="text-[10px] text-[#10A3EB] font-bold bg-blue-50 border border-blue-100/30 px-2.5 py-0.5 rounded-md">
                Step {step} of {totalSteps}
              </div>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-5">
              <div 
                className="bg-[#10A3EB] h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>

            <div className="min-h-[240px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* STEP 1: Full Name */}
                  {step === 1 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">What is your full name?</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Contact Details */}
                  {step === 2 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">Please provide your mobile number and email address.</label>
                      <div className="space-y-3">
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                            required
                            autoFocus
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Best Contact Method */}
                  {step === 3 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">What is the best way to contact you?</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: "PHONE", label: "Phone Call (Voice)" },
                          { value: "TEXT", label: "Text Message (SMS)" }
                        ].map((obj) => (
                          <button
                            type="button"
                            key={obj.value}
                            onClick={() => {
                              setContactMethod(obj.value);
                              setStep(4);
                            }}
                            className={`w-full rounded-2xl border-0 py-3 px-6 text-center font-bold text-[13.5px] transition-all duration-300 cursor-pointer ${
                              contactMethod === obj.value
                                ? "bg-sky-50 text-[#10A3EB] shadow-[0_4px_12px_rgba(16,163,235,0.12)] ring-2 ring-[#10A3EB] scale-[1.01]"
                                : "bg-white text-slate-700 shadow-[0_4px_12px_rgba(148,163,184,0.08)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(148,163,184,0.16)]"
                            }`}
                          >
                            {obj.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Interstitial Intermission */}
                  {step === 4 && (
                    <div className="space-y-3 text-center py-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-2 border border-emerald-100 shadow-sm">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h3 className="text-[#0B1F3A] text-[16px] font-extrabold">Personal Details Saved!</h3>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed max-w-md mx-auto">
                        Great! Now, let&apos;s proceed to gather details about the property so Aakash can match you with the right lender structures.
                      </p>
                    </div>
                  )}

                  {/* STEP 5: Planning Goal */}
                  {step === 5 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">What are you planning to do?</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: "BUY_A_PROPERTY", label: "Buy a property" },
                          { value: "REFINANCE_A_LOAN", label: "Refinance a loan" },
                          { value: "BUILD_A_HOUSE", label: "Build a house" },
                          { value: "ITS_COMPLICATED", label: "It's complicated" }
                        ].map((obj) => (
                          <button
                            type="button"
                            key={obj.value}
                            onClick={() => {
                              setLoanPurpose(obj.value);
                              setStep(6);
                            }}
                            className={`w-full rounded-2xl border-0 py-3 px-6 text-center font-bold text-[13.5px] transition-all duration-300 cursor-pointer ${
                              loanPurpose === obj.value
                                ? "bg-sky-50 text-[#10A3EB] shadow-[0_4px_12px_rgba(16,163,235,0.12)] ring-2 ring-[#10A3EB] scale-[1.01]"
                                : "bg-white text-slate-700 shadow-[0_4px_12px_rgba(148,163,184,0.08)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(148,163,184,0.16)]"
                            }`}
                          >
                            {obj.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 6: Valuation/Purchase Price */}
                  {step === 6 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">
                        {loanPurpose === "REFINANCE_A_LOAN" ? "How much is your property worth?" :
                         loanPurpose === "BUILD_A_HOUSE" ? "What is the combined cost of your house and land?" :
                         "What is the price of the property?"}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. 750,000"
                          value={propertyWorth}
                          onChange={(e) => setPropertyWorth(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 7: Loan Target */}
                  {step === 7 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">How much were you looking to borrow?</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. 600,000"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 8: Funds Assessment */}
                  {step === 8 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">Do you have the funds required for a deposit?</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: "YES", label: "Yes" },
                          { value: "YES_AND_GUARANTOR", label: "Yes and I have a guarantor too" },
                          { value: "NO_BUT_GUARANTOR", label: "No but I have a guarantor" },
                          { value: "NO", label: "No" }
                        ].map((obj) => (
                          <button
                            type="button"
                            key={obj.value}
                            onClick={() => {
                              setDepositFunds(obj.value);
                              if (obj.value === "YES" || obj.value === "YES_AND_GUARANTOR") {
                                setStep(9);
                              } else {
                                setStep(10);
                              }
                            }}
                            className={`w-full rounded-2xl border-0 py-3 px-6 text-center font-bold text-[13.5px] transition-all duration-300 cursor-pointer ${
                              depositFunds === obj.value
                                ? "bg-sky-50 text-[#10A3EB] shadow-[0_4px_12px_rgba(16,163,235,0.12)] ring-2 ring-[#10A3EB] scale-[1.01]"
                                : "bg-white text-slate-700 shadow-[0_4px_12px_rgba(148,163,184,0.08)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(148,163,184,0.16)]"
                            }`}
                          >
                            {obj.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 9: Savings Breakdown (Conditional) */}
                  {step === 9 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">How much deposit do you have?</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. 80,000"
                          value={amountOfSavings}
                          onChange={(e) => setAmountOfSavings(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 10: Credit Assessment */}
                  {step === 10 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">How would you describe your credit history?</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: "ITS_PERFECT", label: "It's perfect" },
                          { value: "ALL_DEBT_PAID", label: "All debts paid but with late payments" },
                          { value: "MINOR_DEFAULT", label: "I have a minor default" },
                          { value: "LESS_THAN_PERFECT", label: "Let's just say it's less than perfect" }
                        ].map((obj) => (
                          <button
                            type="button"
                            key={obj.value}
                            onClick={() => {
                              setCreditHistory(obj.value);
                              setStep(11);
                            }}
                            className={`w-full rounded-2xl border-0 py-3 px-6 text-center font-bold text-[13.5px] transition-all duration-300 cursor-pointer ${
                              creditHistory === obj.value
                                ? "bg-sky-50 text-[#10A3EB] shadow-[0_4px_12px_rgba(16,163,235,0.12)] ring-2 ring-[#10A3EB] scale-[1.01]"
                                : "bg-white text-slate-700 shadow-[0_4px_12px_rgba(148,163,184,0.08)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(148,163,184,0.16)]"
                            }`}
                          >
                            {obj.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 11: Comments & Submit */}
                  {step === 11 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">Which state are you buying property in?</label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {["NSW", "VIC", "QLD", "WA", "SA", "ACT/NT/TAS"].map((st) => (
                            <button
                              type="button"
                              key={st}
                              onClick={() => setState(st)}
                              className={`p-2.5 rounded-2xl border-0 text-[12.5px] font-bold flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
                                state === st
                                  ? "bg-sky-50 text-[#10A3EB] shadow-[0_4px_12px_rgba(16,163,235,0.12)] ring-2 ring-[#10A3EB]"
                                  : "bg-white text-slate-700 shadow-[0_4px_12px_rgba(148,163,184,0.08)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(148,163,184,0.16)]"
                              }`}
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{st}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">Feel free to share any comments or information before we proceed, or simply submit the form.</label>
                        <textarea
                          placeholder="Type your comments or questions here..."
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-4 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs min-h-[100px]"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6 gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-55 border border-slate-200 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                  isStepValid()
                    ? "bg-[#10A3EB] hover:bg-[#0e92d3] text-white hover:scale-[1.01]"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {step === 4 ? "Proceed to Property Details" : "Next Question"} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || submitting}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                  isStepValid() && !submitting
                    ? "bg-[#10A3EB] hover:bg-[#0e92d3] text-white hover:scale-[1.01]"
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
  );
}
