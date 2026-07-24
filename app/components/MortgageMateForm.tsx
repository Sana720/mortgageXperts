"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  X,
  Sparkles,
  ShieldCheck,
  Award
} from "lucide-react";
import Image from "next/image";

const MIDDLE_FINANCE_REDIRECT_URL = "https://app.middle.finance/ref/6aa0e26a-6c61-46a6-abd9-dd3b1183d67b";

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const ProductReviewIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 text-[#0284C7]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

interface MortgageMateFormProps {
  onClose?: () => void;
  compact?: boolean;
  initialStep?: number;
  onSubmitted?: (submitted: boolean) => void;
  showCloseButton?: boolean;
  transparent?: boolean;
}

export function MortgageMateForm({ 
  onClose, 
  compact = false, 
  initialStep = 0, 
  onSubmitted,
  showCloseButton = true,
  transparent = false
}: MortgageMateFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(initialStep); // Starts at initialStep (defaults to 0)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dashboardProgress, setDashboardProgress] = useState(0);

  // Form State - Phase 1: Personal Details
  const [numApplicants, setNumApplicants] = useState<"single" | "joint" | "">("joint");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Applicant 2 Details
  const [app2Name, setApp2Name] = useState("");
  const [app2Email, setApp2Email] = useState("");
  const [app2Phone, setApp2Phone] = useState("");

  const [employmentStatus, setEmploymentStatus] = useState<string[]>(["FULL_TIME"]);

  // Form State - Phase 2: Property & Financial Details
  const [loanPurpose, setLoanPurpose] = useState("BUY_A_PROPERTY");
  const [propertyWorth, setPropertyWorth] = useState(""); // price / value / combined cost
  const [loanAmount, setLoanAmount] = useState("");
  const [depositFunds, setDepositFunds] = useState("YES");
  const [amountOfSavings, setAmountOfSavings] = useState("");
  const [creditHistory, setCreditHistory] = useState("ITS_PERFECT");
  const [comments, setComments] = useState("");
  const [state, setState] = useState<string | null>("WA"); // WA auto-selected by default

  const totalSteps = 12;
  const hasInlineButton = true;

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

      return () => {
        clearInterval(interval);
      };
    }
  }, [formSubmitted]);

  useEffect(() => {
    if (formSubmitted && onSubmitted) {
      onSubmitted(true);
    }
  }, [formSubmitted, onSubmitted]);

  const handlePhoneChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, "");
    const limited = digitsOnly.slice(0, 10);
    setPhone(limited);
  };

  const handleApp2PhoneChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, "");
    const limited = digitsOnly.slice(0, 10);
    setApp2Phone(limited);
  };

  const handleCurrencyChange = (val: string, setter: (v: string) => void) => {
    const digits = val.replace(/\D/g, "");
    const formatted = digits ? Number(digits).toLocaleString("en-AU") : "";
    setter(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isStepValid()) {
        if (step < totalSteps) handleNext();
        else handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  const submitPartialDetails = async () => {
    if (!fullName || !email || !phone) return;
    if (numApplicants === "joint" && (!app2Name || !app2Email || !app2Phone)) return;

    const payload = {
      type: "mortgage_mate",
      name: numApplicants === "joint" ? `${fullName} & ${app2Name} (Partial)` : `${fullName} (Partial)`,
      email: numApplicants === "joint" ? `${email} / ${app2Email}` : email,
      phone: numApplicants === "joint" ? `${phone} / ${app2Phone}` : phone,
      savings: "Partial Submission",
      income: "Partial Submission",
      state: state || null,
      details: JSON.stringify({
        numApplicants,
        partial: true,
        applicant1: { name: fullName, email, phone },
        applicant2: numApplicants === "joint" ? { name: app2Name, email: app2Email, phone: app2Phone } : null
      })
    };

    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Failed to submit partial details:", err);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (numApplicants === "single") {
        submitPartialDetails();
        setStep(4);
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      submitPartialDetails();
      setStep(4);
    } else if (step === 9) {
      if (depositFunds === "YES" || depositFunds === "YES_AND_GUARANTOR") {
        setStep(10);
      } else {
        setStep(11);
      }
    } else if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 11) {
      if (depositFunds === "YES" || depositFunds === "YES_AND_GUARANTOR") {
        setStep(10);
      } else {
        setStep(9);
      }
    } else if (step === 4) {
      if (numApplicants === "single") {
        setStep(2);
      } else {
        setStep(3);
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
    if (numApplicants === "joint" && (!app2Name || !app2Email || !app2Phone)) return;
    setSubmitting(true);

    const payload = {
      type: "mortgage_mate",
      name: numApplicants === "joint" ? `${fullName} & ${app2Name}` : fullName,
      email: numApplicants === "joint" ? `${email} / ${app2Email}` : email,
      phone: numApplicants === "joint" ? `${phone} / ${app2Phone}` : phone,
      savings: amountOfSavings || depositFunds || "N/A",
      income: `Borrow: ${loanAmount}, Worth: ${propertyWorth}, Goal: ${loanPurpose}`,
      state: state || "NSW",
      details: JSON.stringify({
        numApplicants,
        employmentStatus: employmentStatus.join(", "),
        creditHistory,
        comments,
        applicant1: { name: fullName, email, phone },
        applicant2: numApplicants === "joint" ? { name: app2Name, email: app2Email, phone: app2Phone } : null
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (step === 0) return true;
    if (step === 1) return numApplicants !== "";
    if (step === 2) {
      const isPhoneValid = phone.replace(/\D/g, "").length === 10;
      return fullName.trim().length > 0 && isPhoneValid && emailRegex.test(email.trim());
    }
    if (step === 3) {
      const isPhoneValid = app2Phone.replace(/\D/g, "").length === 10;
      return app2Name.trim().length > 0 && isPhoneValid && emailRegex.test(app2Email.trim());
    }
    if (step === 4) return employmentStatus.length > 0;
    if (step === 5) return true; // Interstitial
    if (step === 6) return loanPurpose !== "";
    if (step === 7) {
      const numericVal = Number(propertyWorth.replace(/\D/g, ""));
      return !isNaN(numericVal) && numericVal > 0;
    }
    if (step === 8) {
      const numericVal = Number(loanAmount.replace(/\D/g, ""));
      return !isNaN(numericVal) && numericVal > 0;
    }
    if (step === 9) return depositFunds !== "";
    if (step === 10) {
      const numericVal = Number(amountOfSavings.replace(/\D/g, ""));
      return !isNaN(numericVal) && numericVal > 0;
    }
    if (step === 11) return creditHistory !== "";
    if (step === 12) return true; // comments are optional
    return true;
  };

  const getHelpfulHint = (currentStep: number) => {
    switch (currentStep) {
      case 1: return "Knowing if this is a single or joint application is crucial for assessing borrowing capacity.";
      case 2: return "We will send the tailored strategy and assessment summary directly to you.";
      case 3: return "Second applicant details help us calculate joint income and assessment rates.";
      case 4: return "Please select all that apply to you and, if applicable, your partner.";
      case 6: return "Knowing your goal helps us filter down to the most relevant lending structures.";
      case 7: return loanPurpose === "REFINANCE_A_LOAN" 
        ? "This helps us calculate your Loan-to-Value Ratio (LVR) to unlock better interest rates." 
        : "This helps us estimate your required deposit and stamp duty costs.";
      case 8: return "We need this to estimate your monthly repayments and borrowing capacity.";
      case 9: return "Understanding your deposit source helps us determine if you qualify for LMI waivers or grants.";
      case 10: return "A clear view of your savings helps us negotiate the best possible rate discounts.";
      case 11: return "Different lenders have different policies. This helps us match you with the right one.";
      case 12: return "Any extra context helps Mortgage Xperts provide a more accurate and comprehensive strategy.";
      default: return "";
    }
  };

  if (formSubmitted) {
    return (
      <div className="w-full space-y-6 text-left p-2">
        {/* Top Progress bar & Header */}
        <div className={`border rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 ${dashboardProgress >= 100 ? "bg-emerald-50/80 border-emerald-100" : "bg-blue-50/80 border-blue-100"}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              {dashboardProgress >= 100 ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-[#2563EB] animate-ping" />
              )}
              <span className="text-[14.5px] text-[#0B1F3A] font-extrabold">
                {dashboardProgress >= 100 
                  ? "Your Mortgage Mate Dashboard is ready! Please proceed below."
                  : "Just a moment while we set up your dashboard..."}
              </span>
            </div>
            <span className={`text-[12px] font-extrabold uppercase tracking-wider ${dashboardProgress >= 100 ? "text-emerald-600" : "text-[#2563EB]"}`}>
              {dashboardProgress >= 100 ? "100% Ready" : `${Math.min(99, Math.round(dashboardProgress))}% Completed`}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
            <div 
              className={`h-full rounded-full transition-all duration-75 ${dashboardProgress >= 100 ? "bg-emerald-600" : "bg-gradient-to-r from-blue-500 to-indigo-600"}`}
              style={{ width: `${dashboardProgress}%` }}
            />
          </div>
        </div>

        {/* Three Columns Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* COLUMN 1: Your Journey */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] text-left">
            <h3 className="text-[#0B1F3A] text-[17px] font-extrabold pb-3 border-b border-slate-100">
              Your Journey
            </h3>
            
            <div className="mt-6 space-y-7 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {/* Step 1 */}
              <div className="relative pl-9">
                <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-emerald-600 text-[14px] font-extrabold">Enquiry Submitted</h4>
                  <p className="text-slate-500 text-[12px] leading-relaxed mt-1 font-medium">
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
                    <h4 className="text-slate-900 text-[14px] font-extrabold">Financial Profile Completion</h4>
                    <span className="bg-blue-100 text-[#2563EB] text-[9.5px] font-extrabold uppercase px-1.5 py-0.5 rounded">
                      Current Stage
                    </span>
                  </div>
                  <p className="text-slate-500 text-[12px] leading-relaxed mt-1 font-medium">
                    Your next step is to complete and submit your Financial Profile. This helps Aakash understand your needs and prepare lender fit options.
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
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[360px] text-left">
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

            {/* Financial Profile Interstitial Card */}
            <div className={`border rounded-xl p-5 mt-6 transition-all duration-500 ${dashboardProgress >= 100 ? "bg-emerald-50/60 border-emerald-100" : "bg-blue-50/60 border-blue-100"}`}>
              {dashboardProgress >= 100 ? (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#0B1F3A] text-[14px] font-extrabold block">
                      Assessment Verified &amp; Ready!
                    </span>
                    <span className="bg-red-100 text-[#EA580C] text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0">
                      Urgent Approval
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] font-medium mt-1.5 leading-relaxed">
                    Click the button below to connect with our lending panel and sync details;
                  </p>
                  <a
                    href={MIDDLE_FINANCE_REDIRECT_URL}
                    className="w-full bg-[#EA580C] hover:bg-[#c2410c] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider mt-4 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                  >
                    FACT FIND
                  </a>
                </>
              ) : (
                <>
                  <span className="text-[#0B1F3A] text-[13.5px] font-bold block">
                    Preparing your secure profile...
                  </span>
                  <span className="text-slate-500 text-[11px] font-semibold mt-1 block">
                    You&apos;ll be able to continue in just a moment.
                  </span>
                  <button
                    disabled
                    className="w-full bg-slate-100 text-slate-400 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider mt-4 cursor-not-allowed"
                  >
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-400 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Almost There
                  </button>
                </>
              )}
            </div>
          </div>

          {/* COLUMN 3: Dedicated Broker */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[360px] text-left">
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

              {dashboardProgress >= 100 ? (
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 mt-5">
                  <div className="flex items-center justify-between text-[12px] font-bold text-emerald-600">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4.5 h-4.5" strokeWidth={3} />
                      Broker Notified!
                    </span>
                    <span>100%</span>
                  </div>
                </div>
              ) : (
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
              )}
            </div>

            {/* Broker contact / message */}
            {dashboardProgress >= 100 ? (
              <div className="space-y-3 mt-6 pt-4 border-t border-slate-100 text-left text-xs font-semibold text-slate-650">
                <p className="leading-relaxed">
                  Aakash has been notified of your assessment details and will reach out to you within 1 business day.
                </p>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 font-bold text-slate-800 text-[11px]">
                  <div>📞 Mobile: <a href="tel:0450240757" className="text-[#2563EB] hover:underline font-bold">0450 240 757</a></div>
                  <div>✉️ Email: <a href="mailto:mortgage@mortgagexperts.com.au" className="text-[#2563EB] hover:underline font-bold font-montserrat">mortgage@mortgagexperts.com.au</a></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 mt-6 pt-4 border-t border-slate-100">
                <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse" />
                <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
                <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${transparent ? "bg-transparent" : "bg-white border border-slate-100 rounded-3xl shadow-[0_25px_60px_-15px_rgba(11,31,58,0.06)]"} ${compact ? "p-4 sm:p-6" : "p-5 sm:p-8 md:p-10"} flex flex-col ${step === 0 ? "justify-center" : "justify-between"} h-full min-h-[440px] relative text-left`}>
      {onClose && showCloseButton && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-650 transition-colors cursor-pointer z-20"
          aria-label="Close form popup"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {step === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
          {/* LEFT COLUMN: Hero content (Title, sub-text, button, ratings) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Premium Tag */}
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/50 rounded-full px-3 py-1">
                <Sparkles className="w-3 h-3 text-[#10A3EB]" />
                <span className="text-[9px] font-extrabold text-[#10A3EB] uppercase tracking-widest">Strategy Call & Assessment</span>
              </div>

              {/* Title & Paragraph */}
              <h2 className="text-[#0B1F3A] text-xl sm:text-2xl font-extrabold tracking-tight leading-snug font-montserrat">
                Complete your profile today to receive a personalised response from us <span className="text-[#10A3EB]">within 24 hours</span>.
              </h2>
              <p className="text-slate-500 text-[12.5px] font-medium leading-relaxed">
                Explore your borrowing options securely. <span className="font-bold text-slate-800">This assessment will not create an enquiry or impact your credit file.</span>
              </p>
            </div>

            {/* Mini advisor badge on mobile only */}
            <div className="flex md:hidden items-center gap-2 bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5 shadow-sm">
              <div className="w-9 h-9 rounded-xl overflow-hidden relative border border-slate-200 shrink-0">
                <Image src="/images/aakash_new.png" fill alt="Aakash KC" className="object-cover object-top" />
              </div>
              <div className="text-left">
                <h4 className="text-[#0B1F3A] text-xs font-bold leading-none">Aakash KC</h4>
                <p className="text-[#10A3EB] text-[9.5px] font-bold mt-0.5">Principal Advisor & FBAA Member</p>
              </div>
            </div>

            {/* Let's Start & Completion badge */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                }}
                className="w-full sm:w-auto bg-[#10A3EB] hover:bg-[#0e92d3] text-white font-extrabold uppercase text-[12px] tracking-wider py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-md shadow-sky-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
              >
                LET&apos;S START <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/50 px-3 py-2 rounded-xl shadow-sm whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-[#10A3EB]" />
                <div className="flex flex-col text-left">
                  <span className="text-[7.5px] text-slate-400 font-extrabold tracking-wider uppercase leading-none">COMPLETION</span>
                  <span className="text-[11px] text-slate-700 font-extrabold mt-0.5">60 seconds</span>
                </div>
              </div>
            </div>

            {/* Rating Badges Section */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
              {/* ProductReview */}
              <div className="flex flex-col items-start gap-1 pr-2 border-r border-slate-100">
                <div className="flex items-center gap-1">
                  <ProductReviewIcon />
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider leading-none">Product Review</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-[#FBBF24] fill-[#FBBF24]" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-550 font-semibold leading-tight mt-0.5">
                  <strong className="text-slate-800 font-bold">4.9</strong>/5 (230+ Reviews)
                </p>
              </div>

              {/* Facebook */}
              <div className="flex flex-col items-start gap-1 px-2 border-r border-slate-100">
                <div className="flex items-center gap-1">
                  <FacebookIcon />
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider leading-none">Facebook</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-[#FBBF24] fill-[#FBBF24]" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-550 font-semibold leading-tight mt-0.5">
                  <strong className="text-slate-800 font-bold">5.0</strong>/5 (230+ Reviews)
                </p>
              </div>

              {/* Google */}
              <div className="flex flex-col items-start gap-1 pl-2">
                <div className="flex items-center gap-1">
                  <GoogleIcon />
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider leading-none">Google</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-[#FBBF24] fill-[#FBBF24]" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-550 font-semibold leading-tight mt-0.5">
                  <strong className="text-slate-800 font-bold">4.9</strong>/5 (760+ Reviews)
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Akash KC Portrait & Bio Details Card (Overlapping) */}
          <div className="hidden md:flex md:col-span-5 relative h-[360px] items-center justify-start select-none">
            {/* Portrait of Aakash */}
            <div className="absolute right-0 bottom-0 top-0 w-[210px] h-full z-0 overflow-hidden rounded-2xl transition-all duration-300">
              <Image 
                src="/images/aakash_new.png" 
                fill
                alt="Aakash KC - Principal Mortgage Advisor" 
                className="object-cover object-top select-none pointer-events-none" 
                priority
              />
              {/* Soft gradient masks to blend the portrait with the background */}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Info Card (Left-aligned) */}
            <div className="absolute left-0 bottom-0 w-[220px] lg:w-[230px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xl shadow-blue-950/10 z-10">
              {/* Licensed Advisor & Rating Badges row */}
              <div className="flex items-center justify-between gap-1 mb-2.5">
                <div className="inline-flex items-center gap-1 bg-[#0B1F3A] border border-white/10 rounded-full px-1.5 py-0.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[6.5px] text-white font-extrabold uppercase tracking-wider">Licensed Advisor</span>
                </div>

                <div className="inline-flex items-center gap-0.5 bg-[#10A3EB] rounded-full px-1.5 py-0.5 shadow-sm">
                  <Star className="w-2 h-2 text-yellow-300 fill-yellow-300" />
                  <span className="text-[6.5px] text-white font-extrabold tracking-wider">4.9/5 Rated</span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="space-y-2 text-left">
                <div>
                  <h3 className="text-[#0B1F3A] text-[13px] font-black leading-tight font-montserrat">
                    Aakash KC
                  </h3>
                  <p className="text-[#10A3EB] text-[9px] font-bold">Principal Mortgage Advisor</p>
                </div>

                <p className="text-slate-500 text-[8.5px] leading-relaxed italic font-medium">
                  &ldquo;I guide first home buyers and investors to find tailored structures and skip LMI fees.&rdquo;
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-1 py-1.5 border-y border-slate-100 text-center">
                  <div>
                    <div className="text-[#0B1F3A] text-[10.5px] font-black">4.9/5</div>
                    <div className="text-slate-400 text-[6.5px] font-extrabold uppercase tracking-wider mt-0.5">Rating</div>
                  </div>
                  <div className="border-x border-slate-100">
                    <div className="text-[#0B1F3A] text-[10.5px] font-black">1,200+</div>
                    <div className="text-slate-400 text-[6.5px] font-extrabold uppercase tracking-wider mt-0.5">Families</div>
                  </div>
                  <div>
                    <div className="text-[#0B1F3A] text-[10.5px] font-black">40+</div>
                    <div className="text-slate-400 text-[6.5px] font-extrabold uppercase tracking-wider mt-0.5">Lenders</div>
                  </div>
                </div>

                {/* Badges footer */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#10A3EB]" />
                    <span className="text-[8px] text-slate-500 font-bold">FBAA Member</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Award className="w-2.5 h-2.5 text-[#10A3EB]" />
                    <span className="text-[8px] text-slate-500 font-bold">Credit Licensee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="mb-4 sm:mb-5">
              <div className="flex items-center justify-between mb-1.5 sm:mb-2 pr-8">
                <span className="text-[9.5px] sm:text-[10px] text-[#10A3EB] font-extrabold uppercase tracking-widest block shrink-0 mr-2">
                  {step <= 4 ? "Phase 1: Personal Details" : "Phase 2: Property Details"}
                </span>
                <div className="text-[9.5px] sm:text-[10px] text-[#10A3EB] font-bold bg-blue-50 border border-blue-100/30 px-2.5 py-1 rounded-md shrink-0">
                  Step {step} of {totalSteps}
                </div>
              </div>
              
              <h2 className="text-[#0B1F3A] text-[17px] sm:text-[20px] font-extrabold tracking-tight leading-tight pr-8">
                {step === 5 ? "Property Details" : step <= 4 ? `Onboarding Question ${step === 1 ? 1 : step === 2 ? 2 : step === 3 ? 3 : (numApplicants === "joint" ? 4 : 3)} of ${numApplicants === "joint" ? 4 : 3}` : `Property Question ${step - 5} of 7`}
              </h2>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6 sm:mb-8">
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
                  className="space-y-4 max-w-[680px] mx-auto w-full"
                >
                  {/* STEP 1: Number of Applicants */}
                  {step === 1 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">How many applicants are there?</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: "joint", label: "Joint Applicants (2 Applicants)" },
                          { value: "single", label: "Single Applicant" }
                        ].map((obj) => (
                          <button
                            type="button"
                            key={obj.value}
                            onClick={() => {
                              setNumApplicants(obj.value as "single" | "joint");
                            }}
                            className={`w-full rounded-2xl border-0 py-3.5 px-6 text-center font-bold text-[13.5px] transition-all duration-300 cursor-pointer ${
                              numApplicants === obj.value
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

                  {/* STEP 2: Applicant 1 Contact Details */}
                  {step === 2 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">
                        {numApplicants === "joint" ? "Please provide details for the First Applicant." : "Please provide your contact details."}
                      </label>
                      <div className="space-y-3">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                            required
                            autoFocus
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input type="tel"
                            placeholder="04XX XXX XXX"
                            value={phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                            required
                          />
                        </div>
                        {phone.trim().length > 0 && phone.replace(/\D/g, "").length !== 10 && (
                          <p className="text-rose-500 text-[10px] font-bold mt-1">Please enter a valid 10-digit phone number.</p>
                        )}
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                            required
                          />
                        </div>
                        {email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && (
                          <p className="text-rose-500 text-[10px] font-bold mt-1">Please enter a valid email address.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Applicant 2 Contact Details */}
                  {step === 3 && numApplicants === "joint" && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">Please provide details for the Second Applicant.</label>
                      <div className="space-y-3">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input type="text"
                            placeholder="Full name"
                            value={app2Name}
                            onChange={(e) => setApp2Name(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                            required
                            autoFocus
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input type="tel"
                            placeholder="04XX XXX XXX"
                            value={app2Phone}
                            onChange={(e) => handleApp2PhoneChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                            required
                          />
                        </div>
                        {app2Phone.trim().length > 0 && app2Phone.replace(/\D/g, "").length !== 10 && (
                          <p className="text-rose-500 text-[10px] font-bold mt-1">Please enter a valid 10-digit phone number.</p>
                        )}
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input type="email"
                            placeholder="example@email.com"
                            value={app2Email}
                            onChange={(e) => setApp2Email(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                            required
                          />
                        </div>
                        {app2Email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(app2Email.trim()) && (
                          <p className="text-rose-500 text-[10px] font-bold mt-1">Please enter a valid email address.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Employment Status */}
                  {step === 4 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">What best describes your employment status?</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: "FULL_TIME", label: "Full-time" },
                          { value: "PART_TIME", label: "Part-time" },
                          { value: "CASUAL", label: "Casual" }
                        ].map((obj) => (
                          <button
                            type="button"
                            key={obj.value}
                            onClick={() => {
                              setEmploymentStatus(prev =>
                                prev.includes(obj.value)
                                  ? prev.filter(v => v !== obj.value)
                                  : [...prev, obj.value]
                              );
                            }}
                            className={`w-full rounded-2xl border-0 py-3.5 px-6 text-center font-bold text-[13.5px] transition-all duration-300 cursor-pointer ${
                              employmentStatus.includes(obj.value)
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

                  {/* STEP 5: Interstitial Intermission */}
                  {step === 5 && (
                    <div className="space-y-3 text-center py-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-2 border border-emerald-100 shadow-sm">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h3 className="text-[#0B1F3A] text-[16px] font-extrabold">Personal Details Saved!</h3>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed max-w-md mx-auto mb-2">
                        Great! Now, let&apos;s proceed to gather details about the property so Aakash can match you with the right lender structures.
                      </p>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full bg-[#10A3EB] hover:bg-[#0e92d3] text-white flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                      >
                        Proceed to Property Details <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* STEP 6: Planning Goal */}
                  {step === 6 && (
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

                  {/* STEP 7: Valuation/Purchase Price */}
                  {step === 7 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">
                        {loanPurpose === "REFINANCE_A_LOAN" ? "How much is your property worth?" :
                         loanPurpose === "BUILD_A_HOUSE" ? "What is the combined cost of your house and land?" :
                         "What is the price of the property?"}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input type="text"
                          inputMode="numeric"
                          placeholder="750,000"
                          value={propertyWorth}
                          onChange={(e) => handleCurrencyChange(e.target.value, setPropertyWorth)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 8: Loan Target */}
                  {step === 8 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">How much were you looking to borrow?</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input type="text"
                          inputMode="numeric"
                          placeholder="600,000"
                          value={loanAmount}
                          onChange={(e) => handleCurrencyChange(e.target.value, setLoanAmount)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 9: Funds Assessment */}
                  {step === 9 && (
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

                  {/* STEP 10: Savings Breakdown (Conditional) */}
                  {step === 10 && (
                    <div className="space-y-3">
                      <label className="text-[13.5px] font-extrabold text-[#0B1F3A] block">How much deposit do you have?</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input type="text"
                          inputMode="numeric"
                          placeholder="80,000"
                          value={amountOfSavings}
                          onChange={(e) => handleCurrencyChange(e.target.value, setAmountOfSavings)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 11: Credit Assessment */}
                  {step === 11 && (
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

                  {/* STEP 12: Comments & Submit */}
                  {step === 12 && (
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
                          onKeyDown={handleKeyDown}
                          className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-4 text-[16px] md:text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#10A3EB] focus:ring-1 focus:ring-[#10A3EB] transition-all font-semibold shadow-xs min-h-[100px]"
                        />
                      </div>

                    </div>
                  )}

                  {/* Helpful Hint Box (Just below the field) */}
                  {step > 0 && step !== 5 && getHelpfulHint(step) !== "" && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-[#10A3EB]/30 shadow-sm animate-fade-in">
                      <div className="bg-[#10A3EB] px-3 py-1.5 flex items-center gap-1.5 relative">
                        <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#10A3EB] rotate-45 transform" />
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white text-[11px] font-extrabold uppercase tracking-wide">Helpful hint:</span>
                      </div>
                      <div className="bg-sky-50/50 p-3.5 pt-4 text-[12.5px] text-slate-700 font-medium">
                        {getHelpfulHint(step)}
                      </div>
                    </div>
                  )}

                  {/* Unified Inline Next Button */}
                  {step !== 5 && step !== 12 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className={`w-full flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer mt-4 ${
                        isStepValid()
                          ? "bg-[#10A3EB] hover:bg-[#0e92d3] text-white hover:scale-[1.01]"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Next Question <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Unified Inline Submit Button */}
                  {step === 12 && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isStepValid() || submitting}
                      className={`w-full flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer mt-4 ${
                        isStepValid() && !submitting
                          ? "bg-[#10A3EB] hover:bg-[#0e92d3] text-white hover:scale-[1.01]"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {submitting ? "Submitting..." : "Submit Profile"} <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-slate-100 mt-6 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center gap-1.5 px-5 py-3 sm:py-2.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer order-2 sm:order-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {!hasInlineButton && (
              step < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`flex items-center justify-center gap-1.5 px-6 py-3.5 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer order-1 sm:order-2 ${
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
                  className={`flex items-center justify-center gap-1.5 px-6 py-3.5 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer order-1 sm:order-2 ${
                    isStepValid() && !submitting
                      ? "bg-[#10A3EB] hover:bg-[#0e92d3] text-white hover:scale-[1.01]"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {submitting ? "Submitting..." : "Submit Profile"} <Check className="w-3.5 h-3.5" />
                </button>
              )
            )}
          </div>

          {/* Helpful Hint & Legal Consent Footer */}
          {step > 0 && step !== 4 && (
            <div className="mt-6 space-y-5 border-t border-slate-100 pt-5 pb-2">
              

              {/* Legal Text */}
              <div className="text-[9.5px] leading-[1.6] text-slate-400 font-medium">
                <p className="mb-2">
                  By providing your contact information, you consent to Mortgage Xperts contacting you at the provided email and phone number to discuss your home loan journey. This may include phone calls, SMS messages, or automated emails. You also acknowledge and agree to our terms of service and privacy policy.
                </p>
                <p>
                  We&apos;re here to simplify your property goals. If you are unable to complete the form, we may securely save your contact details and follow up to assist you. Consent is not required to use our services.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
