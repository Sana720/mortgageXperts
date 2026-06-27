"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { MortgageMateForm } from "../components/MortgageMateForm";

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



export default function MortgageMatePage({ videoUrl }: { videoUrl: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);

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
      title: "3. Middle Finance Profile",
      desc: "After this lead form, you are redirected to securely complete your detailed financial profile."
    }
  ];

  const leadFaqs = [
    {
      q: "Is the Mortgage Mate assessment free?",
      a: "Yes. The first assessment and strategy call are free. Mortgage Xperts is paid by the lender if your loan settles."
    },
    {
      q: "Why do I need to give my details first?",
      a: "Your contact details let the broker connect your answers with the secure financial profile and follow up with lender-specific guidance."
    },
    {
      q: "What happens after I submit the form?",
      a: "Your enquiry is saved for Mortgage Xperts, then you are redirected to Middle Finance to complete your detailed financial profile."
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
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <SiteHeader isSticky={true} />

      {/* Main Profile & Multi-step Section */}
      <main id="lead-form" className="flex-1 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-8 lg:py-0 lg:h-[calc(100vh-120px)] lg:min-h-[620px] lg:max-h-[850px] flex items-center w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* LEFT COLUMN: Hero content (if step === 0) or form content (if step >= 1) */}
          <div className="lg:col-span-7">
            {step === 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={premiumFadeUp}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/50 rounded-full px-3.5 py-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#10A3EB]" />
                  <span className="text-[10px] font-extrabold text-[#10A3EB] uppercase tracking-widest">Strategy Call & Assessment</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-[#0B1F3A] text-[25px] sm:text-[40px] lg:text-[46px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Complete the form and get a reply from us <span className="text-[#10A3EB]">within 24 hours</span>.
                  </h1>
                  <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed max-w-xl">
                    The information provided is for assessment purposes only. <span className="font-bold text-slate-800">No enquiry is made on your credit file.</span>
                  </p>
                </div>

                <div className="flex flex-row items-center gap-3 sm:gap-5 pt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/mortgage-mate/assessment")}
                    className="bg-[#10A3EB] hover:bg-[#0e92d3] text-white font-extrabold uppercase text-[11px] sm:text-[13.5px] tracking-wider py-3 px-5 sm:py-4 sm:px-8 rounded-full flex items-center justify-center gap-2 shadow-md shadow-sky-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    LET&apos;S START <ArrowRight className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                  </button>

                  <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 border border-slate-200/50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-sm whitespace-nowrap shrink-0">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-500 shrink-0">
                      <Clock className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] sm:text-[9px] text-slate-400 font-extrabold tracking-wider uppercase leading-none">COMPLETION</span>
                      <span className="text-[11px] sm:text-[13px] text-slate-700 font-extrabold mt-0.5">2 minutes</span>
                    </div>
                  </div>
                </div>

                {/* Rating Badges Section */}
                <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-5 border-t border-slate-200 max-w-xl">
                  {/* ProductReview */}
                  <div className="flex flex-col items-start gap-1 pr-1.5 sm:pr-4 border-r border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#34A853]/10 flex items-center justify-center text-[#34A853] shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 2.223.725 4.28 1.956 5.945L3.02 21.02a.5.5 0 00.686.686l3.075-.936A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                        </svg>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-[#FBBF24] fill-[#FBBF24]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-[11.5px] text-slate-500 font-medium leading-tight mt-1">
                      <strong className="text-slate-800 font-bold">4.9</strong> out of 2,000+ reviews
                    </p>
                  </div>

                  {/* Facebook */}
                  <div className="flex flex-col items-start gap-1 px-1 sm:px-2 border-r border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-[#FBBF24] fill-[#FBBF24]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-[11.5px] text-slate-500 font-medium leading-tight mt-1">
                      <strong className="text-slate-800 font-bold">4.8</strong> out of 430+ reviews
                    </p>
                  </div>

                  {/* Google */}
                  <div className="flex flex-col items-start gap-1 pl-1.5 sm:pl-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-[#FBBF24] fill-[#FBBF24]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-[11.5px] text-slate-500 font-medium leading-tight mt-1">
                      <strong className="text-slate-800 font-bold">4.8</strong> out of 1,000+ reviews
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <MortgageMateForm initialStep={1} onClose={() => setStep(0)} compact={false} />
            )}
          </div>

          {/* RIGHT COLUMN: Akash KC Portrait (Background) & Bio Details Card (Overlapping Left) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={premiumFadeUp}
            className="lg:col-span-5 relative w-full flex flex-col items-center gap-6 lg:gap-0 lg:h-[440px] lg:flex-row lg:items-center lg:justify-start select-none"
          >
            {/* Portrait of Aakash */}
            <div className="relative w-[260px] sm:w-[280px] h-[340px] lg:absolute lg:right-0 lg:bottom-0 lg:top-0 lg:w-[320px] lg:h-full z-0 overflow-hidden rounded-3xl lg:rounded-none transition-all duration-300">
              <Image 
                src="/images/aakash_new.png" 
                fill
                alt="Aakash KC - Principal Mortgage Advisor" 
                className="object-cover object-top select-none pointer-events-none" 
                priority
              />
              {/* Soft gradient masks to blend the portrait with the background (desktop only) */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Info Card (Left-aligned) */}
            <div className="relative w-[285px] sm:w-[315px] lg:w-[330px] bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xl shadow-blue-950/10 z-10 lg:absolute lg:left-[-30px] xl:left-[-50px] lg:top-1/2 lg:-translate-y-1/2">
              {/* Licensed Advisor & Rating Badges row */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 bg-[#0B1F3A] border border-white/10 rounded-full px-2.5 py-0.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] text-white font-extrabold uppercase tracking-wider">Licensed Advisor</span>
                </div>

                <div className="inline-flex items-center gap-1 bg-[#10A3EB] rounded-full px-2.5 py-0.5 shadow-sm">
                  <Star className="w-2.5 h-2.5 text-yellow-300 fill-yellow-300" />
                  <span className="text-[8px] text-white font-extrabold tracking-wider">4.9/5 Rated</span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="space-y-3 text-left">
                <div>
                  <h3 className="text-[#0B1F3A] text-[17px] font-black leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Aakash KC
                  </h3>
                  <p className="text-[#10A3EB] text-[11px] font-bold">Principal Mortgage Advisor & Founder</p>
                </div>

                <p className="text-slate-500 text-[11px] leading-relaxed italic font-medium">
                  &ldquo;I guide first home buyers and investors across Australia to find tailored lending structures, negotiate lower interest rates, and skip LMI fees—completely free.&rdquo;
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
                  <div>
                    <div className="text-[#0B1F3A] text-[13.5px] font-black">4.9/5</div>
                    <div className="text-slate-400 text-[7.5px] font-extrabold uppercase tracking-wider mt-0.5">Rating</div>
                  </div>
                  <div className="border-x border-slate-100">
                    <div className="text-[#0B1F3A] text-[13.5px] font-black">1,200+</div>
                    <div className="text-slate-400 text-[7.5px] font-extrabold uppercase tracking-wider mt-0.5">Families</div>
                  </div>
                  <div>
                    <div className="text-[#0B1F3A] text-[13.5px] font-black">40+</div>
                    <div className="text-slate-400 text-[7.5px] font-extrabold uppercase tracking-wider mt-0.5">Lenders</div>
                  </div>
                </div>

                {/* Badges footer */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4.5 h-4.5 rounded-full bg-blue-50 flex items-center justify-center text-[#10A3EB] shrink-0">
                      <ShieldCheck className="w-3 h-3 text-[#10A3EB]" />
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold">MFAA Member</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <div className="w-4.5 h-4.5 rounded-full bg-blue-50 flex items-center justify-center text-[#10A3EB] shrink-0">
                      <Award className="w-3 h-3 text-[#10A3EB]" />
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold">Credit Licensee</span>
                  </div>
                </div>
              </div>
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
                The page now asks for only the details needed to qualify the enquiry, then moves serious clients into the Middle Finance secure profile.
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

      {/* Video Trust Section */}
      <section className="bg-slate-50 py-16 lg:py-24 border-y border-slate-100">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-1.5 mb-6">
            <PlayCircle className="w-4 h-4 text-[#2563EB]" />
            <span className="text-[11px] text-[#2563EB] font-extrabold uppercase tracking-widest">Why Choose Us</span>
          </div>
          <h2 className="text-[#0B1F3A] text-[28px] md:text-[38px] font-extrabold leading-tight mb-6">
            Hear directly from our founder, <span className="text-[#2563EB]">Aakash KC</span>
          </h2>
          <p className="text-slate-500 text-[15px] max-w-2xl mx-auto leading-relaxed font-medium mb-10">
            At Mortgage Xperts, we believe in complete transparency. Watch this quick overview to see exactly how we can help you structure your loan to maximize savings and protect your family&apos;s financial future.
          </p>
          <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src={videoUrl}
              title="Mortgage Xperts Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
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
