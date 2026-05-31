"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Percent,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Calendar,
  PiggyBank,
  Home,
  Users,
  Award,
  Star
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { VIEWPORT, EASE_OUT } from "@/lib/motion";

export default function BuyingAFirstHome() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      title: "Deposit & Planning",
      desc: "Work out your budget, check your savings, and explore first home owner grants available in your state.",
      highlight: "Save up to $10k+ in government assistance."
    },
    {
      num: "02",
      title: "Get Pre-Approval",
      desc: "Our brokers compare loans from 40+ lenders to secure a pre-approval so you can shop with complete confidence.",
      highlight: "Shop with peace of mind."
    },
    {
      num: "03",
      title: "Property Search",
      desc: "Find your dream home within your pre-approved budget. We help evaluate terms and conditions.",
      highlight: "Avoid buying a lemon."
    },
    {
      num: "04",
      title: "Making an Offer",
      desc: "Get fast contract reviews, perform building inspections, and formalise your mortgage application.",
      highlight: "We guide you step-by-step."
    },
    {
      num: "05",
      title: "Settlement & Key Handover",
      desc: "Lender transfers funds to the vendor. You pay the remaining balance, complete legal work, and collect your keys!",
      highlight: "Celebrate your brand new home!"
    }
  ];

  const benefits = [
    {
      icon: Sparkles,
      title: "First Home Owner Grant",
      desc: "Access government grants (up to $10,000-$30,000 depending on state) for buying or building a brand new property.",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      icon: Percent,
      title: "Stamp Duty Concessions",
      desc: "Save thousands of dollars with full or partial stamp duty exemptions designed specifically for first-time buyers.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      icon: PiggyBank,
      title: "Low Deposit Schemes",
      desc: "Secure your home with as little as a 5% deposit without paying expensive Lenders Mortgage Insurance (LMI).",
      color: "bg-amber-50 text-amber-600 border-amber-100"
    }
  ];

  const faqs = [
    {
      q: "How much deposit do I need to buy my first home?",
      a: "Typically, lenders look for a 10% to 20% deposit. However, with government schemes like the First Home Guarantee, you can purchase with as little as a 5% deposit without paying Lenders Mortgage Insurance (LMI). We can help check your eligibility."
    },
    {
      q: "What is a First Home Owner Grant (FHOG)?",
      a: "The FHOG is a national scheme funded by state governments. It offers a one-off tax-free cash grant (generally around $10,000 to $15,000) for first home buyers purchasing or building a new residential property as their principal place of residence."
    },
    {
      q: "What other upfront costs should I prepare for?",
      a: "Beyond your deposit, you should budget for building and pest inspections ($400â€“$800), conveyancing/legal fees ($1,000â€“$2,000), mortgage registration and transfer fees, and home insurance. Many first home buyers are exempt from stamp duty depending on the purchase price."
    },
    {
      q: "How does pre-approval work and how long does it last?",
      a: "A pre-approval is an initial assessment from a lender confirming how much they are willing to lend you based on your income, savings, and credit history. It generally lasts for 90 days and gives you a clear budget when negotiating with sellers."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      {/* Shared Modular Header */}
      <SiteHeader />

      {/* â”€â”€ HERO SECTION â”€â”€ */}
      <section className="relative overflow-hidden bg-white pt-8 pb-0 text-slate-800">

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 w-fit mb-5 text-[11.5px] font-medium text-slate-500">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <Link href="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-400">Home Loans</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-[#2563EB] font-semibold">Buying a First Home</span>
          </div>

          {/* Main two-column grid: 45% left content, 55% right image */}
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6 lg:gap-8 items-stretch">

            {/* â”€â”€ LEFT COLUMN â”€â”€ */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="flex flex-col justify-center pb-8 lg:pb-10"
            >
              {/* FIRST HOME LOANS label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#2563EB] text-[11px] font-extrabold tracking-[0.18em] uppercase">FIRST HOME LOANS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
              </div>

              {/* Main heading */}
              <h1
                className="font-extrabold leading-[1.1] tracking-tight text-[#0B1F3A] text-[32px] sm:text-[44px] lg:text-[52px]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Buying Your
                <br />
                <span className="text-[#2563EB]">First Home</span>
              </h1>

              {/* Blue underline */}
              <div className="w-12 h-[3px] rounded-full bg-[#2563EB] mt-3 mb-4" />

              {/* Description */}
              <p className="text-slate-500 text-[13.5px] sm:text-[14px] leading-[1.65] mb-5 max-w-[420px]">
                Buying your first home is an exciting milestone, but it can also feel overwhelming if you&apos;ve never done it before.
              </p>

              {/* 3 Feature Badges */}
              <div className="flex gap-2.5 mb-5 flex-wrap sm:flex-nowrap">
                {[
                  { Icon: Home, title: "Low Deposit", sub: "Options Available" },
                  { Icon: Users, title: "Expert Guidance", sub: "Every Step of the Way" },
                  { Icon: ShieldCheck, title: "Access to 40+", sub: "Leading Lenders" },
                ].map(({ Icon, title, sub }) => (
                  <div key={title} className="flex-1 min-w-[120px] bg-white border border-slate-200 rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="text-[11.5px] font-black text-[#0B1F3A] leading-none">{title}</div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5 leading-none">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA + Reviews Row */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#consultation"
                  className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] px-6 py-3.5 rounded-full shadow-md shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  Get a FREE Assessment <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Google */}
                <div className="flex items-center gap-1.5">
                  <svg width="17" height="17" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <div>
                    <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-[#FBBC05] text-[#FBBC05]" />)}</div>
                    <div className="text-[9.5px] font-bold text-slate-600 mt-0.5">4.9/5 <span className="font-normal text-slate-400">from 1,200+ reviews</span></div>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-center gap-1.5">
                  <svg width="17" height="17" viewBox="0 0 24 24" className="fill-[#1877F2]">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                  <div>
                    <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-[#FBBC05] text-[#FBBC05]" />)}</div>
                    <div className="text-[9.5px] font-bold text-slate-600 mt-0.5">5.0/5 <span className="font-normal text-slate-400">from 950+ reviews</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* ── RIGHT COLUMN: IMAGE ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
              className="relative flex items-center justify-center lg:items-end lg:justify-end mt-8 lg:mt-0"
            >
              {/* Borderless raw image container */}
              <div className="relative w-full max-w-[540px]">
                <Image
                  src="/images/first_home_family.png"
                  alt="Happy first home buying family with ambient brand elements"
                  width={560}
                  height={440}
                  priority
                  className="w-full h-auto block object-contain"
                />

                {/* Floating "First Home" badge — overlaid directly on the image */}
                <div className="absolute right-4 top-1/3 -translate-y-1/2 bg-white border border-slate-100 rounded-2xl py-2.5 px-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] flex flex-col items-center gap-1 z-20 w-[110px]">
                  <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white shadow-md">
                    <Home className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-black text-[#0B1F3A] leading-tight">First Home</div>
                    <div className="text-[8.5px] text-slate-500 font-medium leading-tight mt-0.5">Your Journey Starts Here!</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* â”€â”€ STATS BAR â”€â”€ sits below both columns, full width */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 bg-white border border-slate-200 rounded-2xl mt-6 mb-0 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] divide-x divide-slate-200">
            {[
              { Icon: Users, value: "500+", label: "First Home Buyers Helped" },
              { Icon: Home, value: "$250M+", label: "In Loans Settled" },
              {
                IconSvg: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                value: "40+", label: "Lenders to Choose From"
              },
              { Icon: Award, value: "10+ Years", label: "Industry Experience" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4 first:rounded-l-2xl last:rounded-r-2xl">
                <div className="w-10 h-10 rounded-full bg-[#EEF4FF] border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
                  {"Icon" in stat && stat.Icon ? <stat.Icon className="w-5 h-5" /> : stat.IconSvg}
                </div>
                <div>
                  <div className="text-[18px] sm:text-[20px] font-black text-[#0B1F3A] leading-none">{stat.value}</div>
                  <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide mt-1 leading-none">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CORE FIRST HOME BENEFITS ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-[#2563EB] text-[10px] font-extrabold tracking-widest uppercase">
                GOVERNMENT GRANTS & INCENTIVES
              </span>
            </div>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-black leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              How You Save as a <span className="text-[#2563EB]">First Home Buyer</span>
            </h2>
            <p className="text-slate-500 text-[13.5px] sm:text-[14.5px]">
              The Australian government provides multiple incentive schemes to help first home buyers step into their property sooner. Here is what you can leverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${benefit.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[#0B1F3A] text-[18px] font-extrabold mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {benefit.title}
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed mb-6">
                      {benefit.desc}
                    </p>
                  </div>
                  <Link href="#consultation" className="text-[#2563EB] text-[12px] font-extrabold flex items-center gap-1 hover:underline">
                    Check Eligibility <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€ INTERACTIVE TIMELINE / STEPS SECTION â”€â”€ */}
      <section id="timeline" className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual Step Indicators */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit mb-4">
                <BookOpen className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[#2563EB] text-[10px] font-extrabold tracking-widest uppercase">
                  ROADMAP TO OWNERSHIP
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-black leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                The First Home <br className="hidden sm:block" />Buyer&apos;s <span className="text-[#2563EB]">Journey</span>
              </h2>
              <p className="text-slate-500 text-[13.5px] leading-relaxed mb-8">
                Buying a home consists of five key phases. Click on each milestone to see what needs to be prepared and how we support you.
              </p>

              {/* Steps selection list */}
              <div className="flex flex-col gap-3">
                {steps.map((step, idx) => (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      activeStep === idx 
                        ? "bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-md" 
                        : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className={`text-[15px] font-black w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      activeStep === idx ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      {step.num}
                    </span>
                    <span className="font-extrabold text-[13.5px] tracking-wide">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Step Detail Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-gradient-to-br from-[#0B1F3A] to-[#081324] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
                >
                  {/* Watermark Big Number */}
                  <span className="absolute -bottom-8 -right-8 text-[140px] font-black text-white/5 select-none leading-none">
                    {steps[activeStep].num}
                  </span>

                  <div className="relative z-10">
                    <span className="text-blue-400 font-extrabold text-[11px] uppercase tracking-widest block mb-2">
                      PHASE {steps[activeStep].num}
                    </span>
                    <h3 className="text-white text-[24px] sm:text-[28px] font-bold mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-slate-300 text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-xl">
                      {steps[activeStep].desc}
                    </p>

                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2.5 text-blue-300 text-[12px] font-semibold mb-8">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span>{steps[activeStep].highlight}</span>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11.5px] text-slate-400 font-medium">Free checklist available</span>
                      </div>
                      <Link href="#consultation" className="text-white bg-[#2563EB] hover:bg-[#1d4ed8] text-[12.5px] font-bold py-2.5 px-6 rounded-full inline-flex items-center gap-1 transition-all">
                        Talk to a Broker <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€ CONSULTATION BOOKING / FORM SECTION â”€â”€ */}
      <section id="consultation" className="py-20 lg:py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit mb-4">
                <Calendar className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[#2563EB] text-[10px] font-extrabold tracking-widest uppercase">
                  BOOK FREE APPOINTMENT
                </span>
              </div>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-black leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Ready to Secure Your <span className="text-[#2563EB]">First Home?</span>
              </h2>
              <p className="text-slate-500 text-[13.5px] sm:text-[14.5px] leading-relaxed mb-6">
                Our first home buyer consultations are <strong>100% free</strong> with absolute <strong>zero obligation</strong>. We assess your grant eligibility, calculate borrowing power, and design a customized roadmap for your home purchase.
              </p>

              <div className="space-y-4">
                {[
                  "Assess eligibility for low-deposit 5% home schemes",
                  "Formulate clear savings strategies & state grant options",
                  "Pre-approval preparation with 40+ leading Australian banks",
                  "Ongoing strategy call support from start to final key handover"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-slate-700">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg">
                <h3 className="text-[#0B1F3A] text-[20px] font-extrabold mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Schedule Your Free Strategy Call
                </h3>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="0450 000 000"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com.au"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">State</label>
                      <select className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700">
                        <option>New South Wales (NSW)</option>
                        <option>Victoria (VIC)</option>
                        <option>Queensland (QLD)</option>
                        <option>Western Australia (WA)</option>
                        <option>South Australia (SA)</option>
                        <option>ACT / Tasmania / Northern Territory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Estimated Deposit Saved</label>
                    <select className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 px-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700">
                      <option>Less than $20,000</option>
                      <option>$20,000 - $50,000</option>
                      <option>$50,000 - $100,000</option>
                      <option>More than $100,000</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-4 rounded-xl text-[13.5px] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-100"
                  >
                    Submit Booking Request <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center mt-3">
                    We guard your privacy with top-tier security standards.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€ CURATED FAQ SECTION â”€â”€ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit mb-4 mx-auto">
              <HelpCircle className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[#2563EB] text-[10px] font-extrabold tracking-widest uppercase">
                QUESTIONS & ANSWERS
              </span>
            </div>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[34px] font-black leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              First Home Buyer <span className="text-[#2563EB]">FAQs</span>
            </h2>
            <p className="text-slate-500 text-[13.5px]">
              Find fast answers to the most common queries first-time buyers have about deposits, grants, and home loans.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#0B1F3A] text-[14.5px] sm:text-[15px] focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100/50">
                      <p className="text-slate-500 text-[13px] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shared Modular Footer */}
      <SiteFooter />
    </div>
  );
}
