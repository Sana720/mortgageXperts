"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Calculator, ArrowRight, Star } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

// Premium inline SVG icons
const GoogleIcon = () => (
  <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
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

const FacebookIcon = () => (
  <svg className="w-5.5 h-5.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const premiumStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const premiumFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE_OUT
    }
  }
};

interface SubPageHeroProps {
  pageTitle: string;
  themeColor?: "blue" | "green" | "violet" | "teal" | "orange" | "rose";
  pageHeroSettings?: {
    hero_badge?: string;
    hero_title?: string;
    hero_subtext?: string;
    hero_image?: string;
    hero_btn1_text?: string;
    hero_btn1_link?: string;
    hero_btn2_text?: string;
    hero_btn2_link?: string;
  } | null;
}

export function SubPageHero({ pageTitle, themeColor = "blue", pageHeroSettings }: SubPageHeroProps) {
  const badgeText = pageHeroSettings?.hero_badge || "Premium Mortgage Experts";
  const titleText = pageHeroSettings?.hero_title || pageTitle;
  const subtextText = pageHeroSettings?.hero_subtext || "We help you unlock better interest rates, calculate your borrowing limits, and secure your finance with a completely stress-free experience.";
  const imageSrc = pageHeroSettings?.hero_image || "/images/hero.png";
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Get Started";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#calculator";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Free Strategy Call";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "#callback";

  const isGreen = themeColor === "green";
  const isViolet = themeColor === "violet";
  const isTeal = themeColor === "teal";
  const isOrange = themeColor === "orange";
  const isRose = themeColor === "rose";

  // Theme variable selections
  const dotColor = isGreen ? "#10B981" : isViolet ? "#8B5CF6" : isTeal ? "#0D9488" : isOrange ? "#EA580C" : isRose ? "#F43F5E" : "#2563EB";
  const bgBlurClass = isGreen ? "bg-emerald-50" : isViolet ? "bg-violet-50" : isTeal ? "bg-teal-50" : isOrange ? "bg-orange-50" : isRose ? "bg-rose-50" : "bg-[#EEF4FF]";
  const navActiveColorClass = isGreen ? "text-emerald-700" : isViolet ? "text-violet-700" : isTeal ? "text-teal-700" : isOrange ? "text-orange-700" : isRose ? "text-rose-700" : "text-[#2563EB]";
  const hoverLinkColorClass = isGreen ? "hover:text-emerald-600" : isViolet ? "hover:text-violet-600" : isTeal ? "hover:text-teal-600" : isOrange ? "hover:text-orange-600" : isRose ? "hover:text-rose-600" : "hover:text-[#2563EB]";
  const badgeClass = isGreen 
    ? "bg-emerald-50 border-emerald-500/15 text-emerald-700" 
    : isViolet 
      ? "bg-violet-50 border-violet-500/15 text-violet-700" 
      : isTeal 
        ? "bg-teal-50 border-teal-500/15 text-teal-700"
        : isOrange
          ? "bg-orange-50 border-orange-500/15 text-orange-700"
          : isRose
            ? "bg-rose-50 border-rose-500/15 text-rose-700"
            : "bg-[#EAF3FF] border-[#2563EB]/15 text-[#2563EB]";
  const badgeIconClass = isGreen ? "text-emerald-600" : isViolet ? "text-violet-600" : isTeal ? "text-teal-600" : isOrange ? "text-orange-600" : isRose ? "text-rose-600" : "text-[#2563EB]";
  const lineClass = isGreen ? "bg-emerald-600" : isViolet ? "bg-violet-600" : isTeal ? "bg-teal-600" : isOrange ? "bg-orange-600" : isRose ? "bg-rose-600" : "bg-[#2563EB]";
  const btn1Class = isGreen
    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/15"
    : isViolet
      ? "bg-violet-600 hover:bg-violet-700 shadow-violet-500/15"
      : isTeal
        ? "bg-teal-600 hover:bg-teal-700 shadow-teal-500/15"
        : isOrange
          ? "bg-orange-600 hover:bg-orange-700 shadow-orange-500/15"
          : isRose
            ? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/15"
            : "bg-[#2563EB] hover:bg-[#1d4ed8] shadow-blue-500/15";
  const btn2Class = isGreen
    ? "border-emerald-600 text-emerald-700 hover:bg-emerald-600"
    : isViolet
      ? "border-violet-600 text-violet-700 hover:bg-violet-600"
      : isTeal
        ? "border-teal-600 text-teal-700 hover:bg-teal-600"
        : isOrange
          ? "border-orange-600 text-orange-700 hover:bg-orange-600"
          : isRose
            ? "border-rose-600 text-rose-700 hover:bg-rose-600"
            : "border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]";

  const blurShapeGrad = isGreen 
    ? "from-emerald-50 to-teal-50/30" 
    : isViolet 
      ? "from-violet-50 to-fuchsia-50/30" 
      : isTeal
        ? "from-teal-50 to-emerald-50/30"
        : isOrange
          ? "from-orange-50 to-amber-50/30"
          : isRose
            ? "from-rose-50 to-pink-50/30"
            : "from-[#EAF3FF] to-[#F4F9FF]";

  return (
    <section id="overview" className="relative overflow-hidden bg-white pt-8 pb-12 lg:pt-14 lg:pb-16 text-slate-800 border-b border-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-start">
      {/* Background shapes */}
      <div className="absolute top-10 right-10 w-44 h-44 opacity-25 pointer-events-none" style={{ backgroundImage: `radial-gradient(${dotColor} 1.5px, transparent 1.5px)`, backgroundSize: "8px 8px" }} />
      <div className={`absolute -left-10 -bottom-10 w-48 h-48 ${bgBlurClass} opacity-40 rounded-full blur-3xl pointer-events-none`} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full">
        {/* SEO Friendly Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 bg-white border border-slate-200/60 rounded-full px-4 py-2 w-fit mb-6 text-[11.5px] font-bold text-slate-500 shadow-sm">
          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <Link href="/" className={`${hoverLinkColorClass} transition-colors`}>Home</Link>
          <span className="text-slate-350 font-normal">&gt;</span>
          <span className="text-slate-400">Home Loans</span>
          <span className="text-slate-350 font-normal">&gt;</span>
          <span className={`${navActiveColorClass} font-bold`}>{pageTitle}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 items-start pt-2">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={premiumStagger}
            className="flex flex-col justify-center z-10"
          >
            <motion.div variants={premiumFadeUp} className={`inline-flex items-center gap-1.5 sm:gap-2 border rounded-full px-3.5 py-1.5 ${badgeClass} w-fit mb-4 shadow-sm font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px] transition-all duration-300`}>
              <Shield className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${badgeIconClass} shrink-0`} />
              <span>{badgeText}</span>
            </motion.div>

            <motion.h1
              variants={premiumFadeUp}
              className="text-[25px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A] mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {titleText}
            </motion.h1>

            <motion.div variants={premiumFadeUp} className={`w-14 h-[3px] ${lineClass} mb-5 rounded-full`} />

            <motion.p variants={premiumFadeUp} className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-5 max-w-xl font-inter">
              {subtextText}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-4">
              <Link
                href={btn1Link}
                className={`inline-flex items-center justify-center gap-2 ${btn1Class} text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap`}
              >
                {btn1Text} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={btn2Link}
                className={`inline-flex items-center justify-center gap-2 border-2 ${btn2Class} bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:text-white group/sec text-center w-full sm:w-auto whitespace-nowrap`}
              >
                <Calculator className="w-4 h-4 text-current transition-colors" />
                {btn2Text}
              </Link>
            </motion.div>

            {/* Trust Reviews Badge Row */}
            <motion.div variants={premiumFadeUp} className="flex flex-wrap items-center gap-6 mt-3.5 pt-3 border-t border-slate-100/80 max-w-lg">
              {/* Google reviews */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                  <GoogleIcon />
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
                    ))}
                  </div>
                  <div className="text-[11.5px] text-slate-500 font-bold mt-0.5">4.9/5 from 1,200+ reviews</div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-px h-8 bg-slate-200/80 hidden sm:block" />

              {/* Facebook reviews */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 shrink-0 shadow-sm">
                  <FacebookIcon />
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
                    ))}
                  </div>
                  <div className="text-[11.5px] text-slate-500 font-bold mt-0.5">5.0/5 from 950+ reviews</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Image with Floating badge & Glow Effects */}
          <div className="relative flex items-center justify-center lg:justify-end translate-y-4 lg:translate-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
              className={`absolute w-[82%] aspect-square bg-gradient-to-br ${blurShapeGrad} rounded-full blur-none -z-10 shadow-inner`}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 }}
              className="relative w-full max-w-[540px]"
            >
              <Image
                src={imageSrc}
                alt={titleText}
                width={560}
                height={440}
                priority
                className="w-full h-auto block object-contain mix-blend-multiply scale-[1.04] relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
