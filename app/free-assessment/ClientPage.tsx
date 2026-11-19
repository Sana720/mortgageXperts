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

import { useOnboardingModal } from "@/app/components/OnboardingModalContext";

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
  const { openModal } = useOnboardingModal();
  const router = useRouter();
  const [step, setStep] = useState(0);

  const proofStats = [
    { label: "Client Rating", value: "4.9/5" },
    { label: "Client Families", value: "500+" },
    { label: "Lender Panel", value: "40+" }
  ];

  const strategySteps = [
    {
      icon: FileText,
      title: "1. Borrowing Power Assessment",
      desc: "Analyze your borrowing potential in minutes using our intelligent mortgage matching tool."
    },
    {
      icon: CalendarCheck,
      title: "2. Strategic Consultation",
      desc: "Receive personalized, face-to-face guidance from our mortgage experts to maps out your home ownership roadmap."
    },
    {
      icon: ShieldCheck,
      title: "3. Tailored Lender Solutions",
      desc: "Get matched with optimal home loan solutions customized specifically for your scenario."
    }
  ];

  const leadFaqs = [
    {
      q: "Who will assist me with my home loan?",
      a: "I’m Aakash K C, Founder and Principal Broker of Mortgage Xperts, also known as The Mortgage Mate. I personally help clients understand their home loan options, compare suitable lenders and navigate the lending process, from initial assessment through to settlement."
    },
    {
      q: "Is the Mortgage Xperts service free?",
      a: "Yes. Mortgage Xperts provides mortgage broking services at no cost to you, including your initial assessment, lender comparisons, loan application assistance and ongoing support. We are generally paid a commission by the lender when your loan settles. Any applicable fees or costs associated with your loan will be explained before you proceed."
    },
    {
      q: "Why do I need to provide my contact details?",
      a: "Your contact details allow us to connect your enquiry with your assessment, clarify any information required and contact you with personalised guidance. We handle your personal information in accordance with our Privacy Policy."
    },
    {
      q: "What happens after I submit the assessment?",
      a: "Once you submit your assessment, your enquiry is received by Mortgage Xperts. You may then be directed to our secure finance platform to complete your financial profile. We review the information provided and contact you to discuss suitable home loan options and the next steps."
    },
    {
      q: "Who will review my information?",
      a: "Your assessment will be personally reviewed by Aakash K C, Founder and Principal Broker of Mortgage Xperts. Where necessary, information may also be processed through our authorised technology and lending partners to assist with your assessment and loan application, subject to applicable privacy and consent requirements."
    },
    {
      q: "Can first home buyers, investors and refinancers use this service?",
      a: "Absolutely. Mortgage Xperts assists first home buyers, existing homeowners, property investors, healthcare professionals and self-employed borrowers. Whether you are purchasing a property, refinancing an existing mortgage, building a home or exploring your borrowing capacity, our assessment can help you understand your available options."
    },
    {
      q: "Am I obligated to proceed?",
      a: "No. Your assessment is free and comes with no obligation to proceed. You can review your options, ask questions and decide whether to move forward when you are ready."
    }
  ];

  const flyerCards = [
    {
      title: "Health Professionals",
      tag: "LMI Waiver",
      image: "/images/Healthcare Professionals.png",
      accent: "from-emerald-600 to-teal-500",
      summary: "Up to 95% LVR with zero LMI and discounted rates tailored for medical practitioners and healthcare staff.",
      points: ["LMI waiver up to 95%", "Discounted rates", "Fast approvals"]
    },
    {
      title: "First Home Buyers",
      tag: "Start Here",
      image: "/images/first_home_family_modern.png",
      accent: "from-blue-600 to-sky-500",
      summary: "Deposit, grants, lender options and pre-approval guidance in one simple path.",
      points: ["Low deposit options", "Grant checks", "Pre-approval plan"]
    },
    {
      title: "Smart Investors",
      tag: "Grow Wealth",
      image: "/images/sleek_modern_home_keys.png",
      accent: "from-violet-600 to-indigo-500",
      summary: "Structure your next property purchase with borrowing power and strategy in mind.",
      points: ["Equity strategy", "Rental income", "Portfolio planning"]
    },
    {
      title: "Refinancing",
      tag: "Save Smarter",
      image: "/images/refinance_family_clean.png",
      accent: "from-rose-600 to-pink-500",
      summary: "Check whether your current loan is still competitive before rates move again.",
      points: ["Rate comparison", "Cashflow review", "Switching costs"]
    }
  ];



  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <SiteHeader isSticky={true} noNavigation={true} hidePhone={true} />

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
                    Complete your profile today to receive a personalised response from us <span className="text-[#10A3EB]">within 24 hours</span>.
                  </h1>
                  <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed max-w-xl">
                    Explore your borrowing options securely. <span className="font-bold text-slate-800">This assessment will not create an enquiry or impact your credit file.</span>
                  </p>
                </div>

                <div className="flex flex-row items-center gap-3 sm:gap-5 pt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/free-assessment/assessment")}
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
                      <span className="text-[11px] sm:text-[13px] text-slate-700 font-extrabold mt-0.5">60 seconds</span>
                    </div>
                  </div>
                </div>

                {/* Rating Badges Section */}
                <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-5 border-t border-slate-200 max-w-md">
                  {/* Google Reviews */}
                  <div className="flex flex-col items-start gap-1 pr-1.5 sm:pr-4 border-r border-slate-200">
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
                      <strong className="text-slate-800 font-bold">5.0</strong> out of 100+ reviews - Google Reviews
                    </p>
                  </div>

                  {/* Facebook */}
                  <div className="flex flex-col items-start gap-1 pl-1.5 sm:pl-2">
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
                      <strong className="text-slate-800 font-bold">5.0</strong> out of 15+ reviews. Facebook
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
                    <div className="text-[#0B1F3A] text-[13.5px] font-black">500+</div>
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
                    <span className="text-[10px] text-slate-600 font-bold">FBAA Member</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="w-4.5 h-4.5 rounded-full bg-blue-50 flex items-center justify-center text-[#10A3EB] shrink-0">
                      <Award className="w-3 h-3 text-[#10A3EB]" />
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold">Credit Representative</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Strategy Call & Assessment / Video Integration */}
      <section className="bg-white py-12 md:py-16 border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mobile First: Video Element */}
            <div className="order-first lg:order-last w-full flex flex-col items-center gap-6">
              <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
                <iframe
                  src={videoUrl}
                  title="Mortgage Xperts Overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                />
              </div>
              <button
                type="button"
                onClick={openModal}
                className="bg-[#10A3EB] hover:bg-[#0e92d3] text-white font-extrabold uppercase text-[12px] sm:text-[13px] tracking-wider py-4 px-8 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                BOOK FREE CONSULTATION <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Content Side */}
            <div className="text-left w-full">
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-3 py-1 mb-4">
                <CalendarCheck className="w-3.5 h-3.5 text-[#10A3EB]" />
                <span className="text-[10px] text-[#10A3EB] font-extrabold uppercase tracking-widest">Strategy Call</span>
              </div>
              <h2 className="text-[#0B1F3A] text-[26px] md:text-[34px] font-extrabold leading-tight">
                Unlock your borrowing potential. Tailored solutions built around you.
              </h2>
              <p className="text-slate-500 text-[14px] leading-relaxed mt-3 font-medium mb-8">
                Discover your maximum borrowing capacity in real-time, schedule a strategy consultation, and access custom lender selections suited for your specific property goals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategySteps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm h-full flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-white border border-sky-100 text-[#10A3EB] flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-[#0B1F3A] text-[15px] font-extrabold leading-tight">{item.title}</h3>
                      </div>
                      <p className="text-slate-500 text-[12.5px] leading-relaxed mt-2 font-medium">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
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
                <span className="text-[10px] font-extrabold text-sky-100 uppercase tracking-widest">Choose Your Mortgage Mate Path – Trusted Home Loan Experts</span>
              </div>
              <h2 className="text-white text-[28px] sm:text-[34px] md:text-[42px] font-extrabold leading-tight tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Tailored Home Loan Strategies for Your Unique Journey.
              </h2>
              <p className="text-blue-100/80 text-[14px] md:text-[15px] leading-relaxed mt-3 max-w-2xl font-medium">
                Select the scenario that best matches your goals, then complete our quick assessment so expert can match you with the right lending strategy.
              </p>
            </div>

            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 bg-[#10A3EB] hover:bg-[#0e92d3] text-white px-5 py-3 rounded-xl text-[12px] font-extrabold uppercase tracking-wide shadow-lg shadow-blue-950/20 transition-all w-full sm:w-auto cursor-pointer"
            >
              Start Free Assessment <ArrowRight className="w-4 h-4" />
            </button>
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
                onClick={openModal}
                className={`group relative min-h-[430px] rounded-2xl overflow-hidden bg-white shadow-2xl shadow-blue-950/25 border border-white/10 cursor-pointer ${idx % 2 === 1 ? "xl:mt-8" : ""}`}
              >
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
                    <Star className="w-3 h-3 text-[#F97316] fill-[#F97316]" />
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

                  <div className="mt-auto pt-2 flex items-center justify-between text-[#10A3EB] text-[12px] font-extrabold uppercase tracking-wide">
                    Learn more
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
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 mb-4 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-[#10A3EB]" />
              <span className="text-[10px] text-[#10A3EB] font-extrabold uppercase tracking-widest">Mortgage Mate FAQs</span>
            </div>
            <h2 className="text-[#0B1F3A] text-[26px] md:text-[34px] font-extrabold leading-tight mb-5">
              Questions people ask before giving their details.
            </h2>
            <div className="space-y-3">
              {leadFaqs.map((faq) => (
                <details key={faq.q} className="group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-[#0B1F3A] text-[14px] font-extrabold">
                    <span>{faq.q}</span>
                    <span className="w-7 h-7 rounded-full bg-sky-50 text-[#10A3EB] flex items-center justify-center text-base shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mt-3 font-medium">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/50 border-t border-b border-slate-100 py-10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-8">
          {/* Logo Marquee Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="shrink-0 md:border-r border-slate-200 pr-6 w-full md:w-auto text-center md:text-left flex md:block justify-center bg-transparent z-10">
              <p className="text-[11px] font-black text-[#0B1F3A] uppercase tracking-wider">
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
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS ── */}
      <TestimonialSection singleRow={true} />

      <SiteFooter noNavigation={true} />
    </div>
  );
}
