"use client";
import { useOnboardingModal } from "@/app/components/OnboardingModalContext";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Heart,
  User,
  MapPin,
  Calendar,
  PiggyBank,
  Shield,
  Home as HomeIcon
} from "lucide-react";
import { Stagger, StaggerItem, EASE_OUT, motionCardHover, motionCardShadow } from "@/lib/motion";

interface DBBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  published: number;
}

interface BlogSectionProps {
  badgeText?: string;
  titlePart1?: string;
  titlePart2?: string;
  subtitleText?: string;
  accentColor?: string; // e.g. "#7C3AED" (Purple) or "#2563EB" (Blue)
  accentTextClass?: string; // e.g. "text-[#7C3AED]"
  accentBgClass?: string; // e.g. "bg-[#7C3AED]"
  darkTheme?: boolean;
}

export function BlogSection({
  badgeText = "Real Stories. Real Impact.",
  titlePart1 = "Success Stories",
  titlePart2 = "& Expert Guides",
  subtitleText = "Behind every loan is a life goal. Discover expert advice, client journeys, and smart mortgage strategies.",
  accentColor = "#7C3AED",
  accentTextClass = "text-[#7C3AED]",
  accentBgClass = "bg-[#7C3AED]",
  darkTheme = true
}: BlogSectionProps) {
  const { openModal } = useOnboardingModal();
  const [blogs, setBlogs] = useState<DBBlog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/admin/blogs");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setBlogs(data.filter((b: DBBlog) => b.published === 1));
          }
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    }
    fetchBlogs();
  }, []);

  const defaultFeatured = {
    id: "default-f",
    title: "From Renting To Their First Home In 11 Months",
    slug: "from-renting-to-first-home",
    excerpt: "From struggling with renting in Brisbane's competitive market to holding the keys to their first home — see how the right guidance and lending strategy made it possible within a single calendar year.",
    coverImage: "/images/villa.png",
    category: "Featured Story"
  };

  const defaultRefinance = {
    id: "default-r",
    title: "How Refinancing Saved $18,000 In Repayments",
    slug: "how-refinancing-saved-18k",
    excerpt: "A growing family was stuck on a higher rate. We restructured their loan, unlocked better pricing and put thousands back in their pocket — without the stress.",
    coverImage: "/images/family_refinance.png",
    category: "Refinance Story"
  };

  const defaultHealthcare = {
    id: "default-h",
    title: "Doctor Buys First Home With Zero LMI",
    slug: "doctor-buys-first-home-zero-lmi",
    excerpt: "A junior doctor with HECS debt thought LMI was unavoidable. We matched them to the right lender, waived LMI entirely and got them into their first home 6 months earlier than expected.",
    coverImage: "/images/Healthcare Professionals.png",
    category: "Healthcare Professional"
  };

  const featured = blogs.find(b => b.category === "Featured Story") || blogs[0] || defaultFeatured;
  const remaining = blogs.filter(b => b.id !== featured.id);
  const refinance = remaining.find(b => b.category === "Refinance Story") || remaining[0] || defaultRefinance;
  const remaining2 = remaining.filter(b => b.id !== refinance.id);
  const healthcare = remaining2.find(b => b.category === "Healthcare Professional") || remaining2[0] || defaultHealthcare;

  const featuredMeta = featured.slug === "from-renting-to-first-home" ? [
    { icon: <User className={`w-4 h-4 ${accentTextClass}`} />, bold: "Jess & Mark", sub: "First Home Buyers" },
    { icon: <MapPin className={`w-4 h-4 ${accentTextClass}`} />, bold: "Brisbane, QLD", sub: "Location" },
    { icon: <Calendar className={`w-4 h-4 ${accentTextClass}`} />, bold: "11 Months", sub: "To Settlement" }
  ] : [
    { icon: <User className={`w-4 h-4 ${accentTextClass}`} />, bold: "Verified Client", sub: "Client Type" },
    { icon: <MapPin className={`w-4 h-4 ${accentTextClass}`} />, bold: "Australia", sub: "Location" },
    { icon: <Calendar className={`w-4 h-4 ${accentTextClass}`} />, bold: "Success Story", sub: "Outcome" }
  ];

  const refinanceOverlay = refinance.slug === "how-refinancing-saved-18k" ? {
    icon: <PiggyBank className="w-4 h-4" />,
    bold: "Smarter Loan",
    sub: "Better Savings"
  } : {
    icon: <PiggyBank className="w-4 h-4" />,
    bold: "Refinanced",
    sub: "Savings Secured"
  };

  const healthcareOverlay = healthcare.slug === "doctor-buys-first-home-zero-lmi" ? {
    icon: <Shield className="w-4 h-4" />,
    bold: "Approved Fast",
    sub: "Junior Doctor"
  } : {
    icon: <Shield className="w-4 h-4" />,
    bold: "LMI Waived",
    sub: "Fast Approval"
  };

  const sectionBg = darkTheme ? "bg-[#0B1226]" : "bg-slate-50";
  const borderClass = darkTheme ? "border-white/10" : "border-slate-200/80";
  const headingText = darkTheme ? "text-white" : "text-[#0B1F3A]";
  const subtextTextClass = darkTheme ? "text-slate-300" : "text-slate-500";

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 ${sectionBg} border-b ${borderClass}`}>
      {/* Light wash gradient background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at top right, ${accentColor}18, transparent 55%)`
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Top: Header and Featured Post */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-10 lg:mb-12">
          
          {/* Left Column Header */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <div className={`inline-flex items-center gap-2 rounded-full border ${darkTheme ? "border-white/35 text-white" : "border-slate-300 text-slate-700"} px-4 py-2 w-fit`}>
              <Heart className="w-3.5 h-3.5 shrink-0" fill="currentColor" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase">
                {badgeText}
              </span>
            </div>
            
            <h2
              className={`text-[34px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.08] tracking-tight ${headingText}`}
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <span>{titlePart1}</span>
              <br />
              <span style={{ color: accentColor }}>{titlePart2}</span>
            </h2>
            
            <p className={`text-[15px] ${subtextTextClass} leading-relaxed max-w-md`}>
              {subtitleText}
            </p>
            
            <div>
              <Link href="/blog" className={`inline-flex items-center gap-2 rounded-xl border ${darkTheme ? "border-white/90 text-white hover:bg-white/10" : "border-slate-300 text-slate-700 hover:bg-slate-100"} bg-transparent px-5 py-3 text-[13px] font-bold transition-colors`}>
                <FileText className="w-4 h-4 shrink-0" />
                Explore Resource Hub
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Column Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            whileHover={{ boxShadow: "0 24px 56px rgba(0,0,0,0.18)", transition: { duration: 0.4, ease: EASE_OUT } }}
            className={`lg:col-span-7 rounded-[24px] bg-white overflow-hidden border ${borderClass} shadow-lg`}
          >
            <div className="flex flex-col sm:flex-row min-h-[300px] sm:min-h-[320px] text-left">
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-center sm:max-w-[58%]">
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide mb-3 ${darkTheme ? "bg-slate-100 text-slate-800" : "bg-slate-100 text-slate-800"}`}>
                  {featured.category}
                </span>
                <h3
                  className="text-[22px] sm:text-[24px] font-extrabold text-[#0B1F3A] leading-snug mb-3 hover:text-blue-600 transition-colors"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h3>
                <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mb-5">
                  {featured.excerpt}
                </p>
                
                {/* Meta details */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                  {featuredMeta.map((row, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                      <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                        {row.icon}
                      </div>
                      <div className="text-[11px] sm:text-[12px] font-extrabold text-[#0B1F3A] leading-tight">{row.bold}</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight">{row.sub}</div>
                    </div>
                  ))}
                </div>
                
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-1.5 text-[13px] font-bold hover:underline w-fit" style={{ color: accentColor }}>
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Cover Image */}
              <div className="relative min-h-[220px] sm:min-h-0 sm:w-[42%] shrink-0">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.92) 18%, rgba(255,255,255,0.35) 42%, transparent 72%)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Story Cards */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10 text-left">
          
          {/* Card 1: Refinance Story */}
          <StaggerItem
            className="rounded-[24px] bg-white overflow-hidden border border-slate-100 flex flex-col sm:flex-row min-h-[260px] shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex-1 p-6 sm:p-7 flex flex-col justify-center sm:max-w-[56%]">
              <span className="inline-flex w-fit rounded-full bg-[#ECFDF5] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 mb-3 border border-emerald-100">
                {refinance.category}
              </span>
              <h3
                className="text-[19px] sm:text-[21px] font-extrabold text-[#0B1F3A] leading-snug mb-3 hover:text-emerald-600 transition-colors"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <Link href={`/blog/${refinance.slug}`}>{refinance.title}</Link>
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-4 flex-1">
                {refinance.excerpt}
              </p>
              <Link href={`/blog/${refinance.slug}`} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-600 hover:underline w-fit">
                Read full details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="relative min-h-[200px] sm:min-h-0 sm:w-[44%] shrink-0">
              <Image
                src={refinance.coverImage}
                alt={refinance.title}
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.92) 15%, rgba(255,255,255,0.25) 45%, transparent 75%)",
                }}
              />
              
              <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-md px-3.5 py-2.5 flex items-start gap-2.5 max-w-[160px]">
                <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                  {refinanceOverlay.icon}
                </div>
                <div>
                  <div className="text-[11.5px] font-extrabold text-[#0B1F3A] leading-tight">{refinanceOverlay.bold}</div>
                  <div className="text-[9.5px] text-slate-500 font-medium mt-0.5">{refinanceOverlay.sub}</div>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Healthcare/First Home */}
          <StaggerItem
            className="rounded-[24px] bg-white overflow-hidden border border-slate-100 flex flex-col sm:flex-row min-h-[260px] shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex-1 p-6 sm:p-7 flex flex-col justify-center sm:max-w-[56%]">
              <span className="inline-flex w-fit rounded-full bg-[#F0FDFA] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-700 mb-3 border border-teal-100">
                {healthcare.category}
              </span>
              <h3
                className="text-[19px] sm:text-[21px] font-extrabold text-[#0B1F3A] leading-snug mb-3 hover:text-teal-600 transition-colors"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <Link href={`/blog/${healthcare.slug}`}>{healthcare.title}</Link>
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-4 flex-1">
                {healthcare.excerpt}
              </p>
              <Link href={`/blog/${healthcare.slug}`} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-teal-600 hover:underline w-fit">
                Read full details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="relative min-h-[220px] sm:min-h-0 sm:w-[44%] shrink-0">
              <Image
                src={healthcare.coverImage}
                alt={healthcare.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.92) 15%, rgba(255,255,255,0.25) 45%, transparent 75%)",
                }}
              />
              
              <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-md px-3.5 py-2.5 flex items-start gap-2.5 max-w-[160px]">
                <div className="w-8 h-8 rounded-full bg-[#F0FDFA] flex items-center justify-center shrink-0 text-teal-600 border border-teal-100">
                  {healthcareOverlay.icon}
                </div>
                <div>
                  <div className="text-[11.5px] font-extrabold text-[#0B1F3A] leading-tight">{healthcareOverlay.bold}</div>
                  <div className="text-[9.5px] text-slate-500 font-medium mt-0.5">{healthcareOverlay.sub}</div>
                </div>
              </div>
            </div>
          </StaggerItem>

        </Stagger>

        {/* Bottom CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className={`rounded-3xl border ${borderClass} ${darkTheme ? "bg-white/5" : "bg-white"} backdrop-blur-md px-6 py-6 sm:px-8 sm:py-7 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm`}
        >
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 lg:gap-6 flex-1">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg text-white" style={{ backgroundColor: accentColor }}>
              <HomeIcon className="w-6 h-6" />
            </div>
            <div>
              <p
                className={`text-[18px] sm:text-[20px] font-extrabold ${darkTheme ? "text-white" : "text-[#0B1F3A]"} leading-snug`}
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Your home goals are unique.{" "}
                <span style={{ color: accentColor }}>Your strategy</span> should be too.
              </p>
              <p className={`text-[12.5px] ${darkTheme ? "text-slate-400" : "text-slate-550"} mt-1 font-medium`}>
                Connect with our expert team to review your goals with premium mortgage planning.
              </p>
            </div>
          </div>
          
          <button type="button" onClick={openModal} className="cursor-pointer border-0 text-white font-extrabold text-[13.5px] px-8 py-3.5 rounded-2xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
            style={{ backgroundColor: accentColor }}>
            Start Your Plan
          </button>
        </motion.div>

      </div>
    </section>
  );
}
