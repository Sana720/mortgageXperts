"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Star,
  TrendingUp,
  Home,
  Users,
  Award,
  Building2,
  Calculator,
  Clock,
  Shield,
} from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { TestimonialSection } from "../../components/TestimonialSection";

export interface CityData {
  city: string;
  state: string;
  stateShort: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  accentLight: string;
  accentDark: string;
  medianHousePrice: string;
  avgLoanSize: string;
  approvalRate: string;
  clientsHelped: string;
  marketInsight: string;
  marketDetail: string;
  suburbs: string[];
  localTips: { title: string; desc: string }[];
  teamLead: { name: string; title: string; image: string; bio: string };
  uniqueAdvantages: { iconKey: string; title: string; desc: string }[];
  nearbyAreas: string[];
  officeAddress: string;
  officePhone: string;
}

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

// Icon key resolver for serializable data from server component
const ICON_MAP: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
};


export interface PageHeroSettings {
  page_path?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  hero_badge?: string;
  hero_title?: string;
  hero_subtext?: string;
  hero_image?: string;
  hero_btn1_text?: string;
  hero_btn1_link?: string;
  hero_btn2_text?: string;
  hero_btn2_link?: string;
  slides?: string;
}

export default function BranchClientPage({ cityData, settings = {}, pageHeroSettings, pageContent, dbTeamLead }: { cityData: CityData; settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string; dbTeamLead?: { name: string; role: string; image: string; bio: string; phone: string } | null }) {
  // Use DB team lead (admin-editable) if available, otherwise fall back to static city data
  const effectiveTeamLead: { name: string; title: string; image: string; bio: string; phone?: string } = dbTeamLead
    ? { name: dbTeamLead.name, title: dbTeamLead.role, image: dbTeamLead.image, bio: dbTeamLead.bio, phone: dbTeamLead.phone }
    : cityData.teamLead;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const badgeText = pageHeroSettings?.hero_badge || `${cityData.city}, ${cityData.stateShort}`;
  const titleText = pageHeroSettings?.hero_title || `Home Loans in ${cityData.city}`;
  const subtextText = pageHeroSettings?.hero_subtext || pageContent || cityData.description;
  const imageSrc = pageHeroSettings?.hero_image || cityData.heroImage;
  const btn1Text = pageHeroSettings?.hero_btn1_text || "Book Free Consultation";
  const btn1Link = pageHeroSettings?.hero_btn1_link || "#enquiry";
  const btn2Text = pageHeroSettings?.hero_btn2_text || "Check Borrowing Power";
  const btn2Link = pageHeroSettings?.hero_btn2_link || "/borrowing-power-calculator";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: `branch-${cityData.slug}-enquiry`,
          name,
          email,
          phone,
          message: message || `Branch enquiry from ${cityData.city} page`,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter" style={{ overflowX: "clip" }}>
      <SiteHeader isSticky={true} settings={settings} />

      {/* ── HERO ── */}
      <section
        id="overview"
        className="relative overflow-hidden bg-white pt-5 pb-10 lg:pt-10 lg:pb-16 text-slate-800 border-b border-slate-100 min-h-[580px] lg:min-h-[640px] flex flex-col justify-center"
      >
        {/* Homepage inspired dot-matrix and light wash patterns */}
        <div className="absolute top-10 right-10 w-44 h-44 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(${cityData.accentColor} 1.5px, transparent 1.5px)`, backgroundSize: "8px 8px" }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 opacity-40 rounded-full blur-3xl pointer-events-none" style={{ background: cityData.accentLight }} />

        {/* Slide Background (Desktop) - Edge-to-edge full height cover */}
        <div className="absolute top-0 right-0 h-full z-[1] hidden lg:block" style={{ width: "52%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 85% 90% at 62% 52%, ${cityData.accentLight} 0%, ${cityData.accentColor}15 42%, #F8FAFC 62%, transparent 82%)`
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "multiply"
            }}
          />
          <div
            className="absolute inset-y-0 left-0 w-48"
            style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.7) 50%, transparent 100%)" }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-slate-50 border border-slate-200/60 rounded-2xl sm:rounded-full px-3 sm:px-4 py-1.5 sm:py-2 w-fit mb-8 text-[10.5px] sm:text-[11.5px] font-bold text-slate-500 shadow-xs">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-slate-355 font-normal">&gt;</span>
            <span className="text-slate-400">Our Branches</span>
            <span className="text-slate-355 font-normal">&gt;</span>
            <span className="font-bold" style={{ color: cityData.accentColor }}>{cityData.city}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (Text & CTAs) */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT }}
              className="lg:col-span-6 flex flex-col gap-5"
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-1.5 border rounded-full px-3.5 py-1.5 w-fit shadow-xs font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px]"
                style={{ background: cityData.accentLight, borderColor: `${cityData.accentColor}30`, color: cityData.accentColor }}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{badgeText}</span>
              </div>

              {/* Title */}
              <h1
                className="text-[28px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0B1F3A]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {titleText}
                {!pageHeroSettings?.hero_title && (
                  <>
                    <br />
                    <span className="text-slate-500 text-[20px] sm:text-[28px] font-semibold block mt-1">{cityData.tagline}</span>
                  </>
                )}
              </h1>

              {/* Subtext */}
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
                {subtextText}
              </p>

              {/* Mobile Hero Image */}
              <div className="relative lg:hidden -mx-6 md:-mx-10 my-2">
                <div
                  className="relative h-64 sm:h-72 w-full"
                  style={{ background: `radial-gradient(ellipse 80% 85% at 55% 50%, ${cityData.accentLight} 0%, ${cityData.accentColor}20 40%, #F8FAFC 65%, transparent 85%)` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url('${imageSrc}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                      backgroundRepeat: "no-repeat",
                      mixBlendMode: "multiply",
                    }}
                  />
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={btn1Link}
                  className="inline-flex items-center justify-center gap-2 text-white font-bold text-[13.5px] sm:text-[14px] py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto whitespace-nowrap"
                  style={{ background: cityData.accentColor, boxShadow: `0 10px 15px -3px ${cityData.accentColor}30` }}
                >
                  {btn1Text} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={btn2Link}
                  className="inline-flex items-center justify-center gap-2 border-2 bg-white font-bold text-[13.5px] sm:text-[14px] py-3 px-7 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group/sec text-center w-full sm:w-auto whitespace-nowrap"
                  style={{ borderColor: cityData.accentColor, color: cityData.accentColor }}
                >
                  <Calculator className="w-4 h-4 text-current" />
                  {btn2Text}
                </Link>
              </div>

              {/* Trust reviews */}
              <div className="flex items-center gap-3 pt-1 border-t border-slate-100 max-w-md">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-500 text-[12.5px] font-semibold">
                  Trusted by hundreds of {cityData.city} families
                </span>
              </div>
            </motion.div>

            {/* Right Column (Stats Grid Floating on Background Image) */}
            <div className="lg:col-span-6 relative z-10 hidden lg:block">
              <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">
                {[
                  { label: "Clients Helped", value: cityData.clientsHelped, icon: <Users className="w-5 h-5" /> },
                  { label: "Approval Rate", value: cityData.approvalRate, icon: <CheckCircle2 className="w-5 h-5" /> },
                  { label: "Avg Loan Size", value: cityData.avgLoanSize, icon: <Home className="w-5 h-5" /> },
                  { label: "Median House Price", value: cityData.medianHousePrice, icon: <Building2 className="w-5 h-5" /> },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE_OUT }}
                    className="rounded-2xl p-5 border backdrop-blur-md bg-white/75 border-slate-200/60 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: cityData.accentLight, color: cityData.accentColor }}
                    >
                      {stat.icon}
                    </div>
                    <div
                      className="text-[26px] font-bold leading-none mb-1"
                      style={{ color: cityData.accentColor }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-slate-550 text-[11.5px] font-bold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Stats Grid (renders under the left col content on mobile) */}
            <div className="lg:hidden block mt-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Clients Helped", value: cityData.clientsHelped, icon: <Users className="w-5 h-5" /> },
                  { label: "Approval Rate", value: cityData.approvalRate, icon: <CheckCircle2 className="w-5 h-5" /> },
                  { label: "Avg Loan Size", value: cityData.avgLoanSize, icon: <Home className="w-5 h-5" /> },
                  { label: "Median House Price", value: cityData.medianHousePrice, icon: <Building2 className="w-5 h-5" /> },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-5 border bg-slate-50 border-slate-100 shadow-sm"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: cityData.accentLight, color: cityData.accentColor }}
                    >
                      {stat.icon}
                    </div>
                    <div
                      className="text-[22px] font-bold leading-none mb-1"
                      style={{ color: cityData.accentColor }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-slate-400 text-[11px] font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── LOCAL MARKET INSIGHT ── */}
      <section className="py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full w-fit block border"
                style={{ color: cityData.accentColor, background: cityData.accentLight, borderColor: `${cityData.accentColor}30` }}
              >
                {cityData.city} Property Market
              </span>
              <h2
                className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                {cityData.marketInsight}
              </h2>
              <p className="text-slate-500 text-[14.5px] leading-relaxed">{cityData.marketDetail}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {cityData.localTips.map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[13px] font-bold"
                      style={{ background: cityData.accentLight, color: cityData.accentColor }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0B1F3A]">{tip.title}</h4>
                      <p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suburbs Coverage */}
            <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-4 h-4" style={{ color: cityData.accentColor }} />
                <h3 className="text-[14px] font-bold text-[#0B1F3A]">Suburbs We Serve in {cityData.city}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cityData.suburbs.map((suburb) => (
                  <span
                    key={suburb}
                    className="text-[12px] font-semibold px-3 py-1.5 rounded-full border transition-all hover:scale-[1.02]"
                    style={{ background: cityData.accentLight, color: cityData.accentColor, borderColor: `${cityData.accentColor}25` }}
                  >
                    {suburb}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="text-[12.5px] text-slate-500 leading-relaxed">
                  Don&apos;t see your suburb? We work with clients across all of{" "}
                  <strong className="text-[#0B1F3A]">{cityData.city}</strong> and surrounds.{" "}
                  <Link href="#enquiry" style={{ color: cityData.accentColor }} className="font-bold hover:underline">
                    Get in touch →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US IN CITY ── */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full w-fit inline-block border mb-4"
              style={{ color: cityData.accentColor, background: cityData.accentLight, borderColor: `${cityData.accentColor}30` }}
            >
              Why Mortgage Xperts {cityData.city}
            </span>
            <h2
              className="text-[28px] sm:text-[36px] font-bold text-[#0B1F3A] leading-tight"
              style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
            >
              The Local Advantage That Gets You Approved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cityData.uniqueAdvantages.map((adv, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: cityData.accentLight, color: cityData.accentColor }}
                >
                  {ICON_MAP[adv.iconKey] ?? <Shield className="w-5 h-5" />}
                </div>
                <h3 className="text-[15px] font-bold text-[#0B1F3A] mb-2">{adv.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM LEAD ── */}
      <section className="py-14 border-b border-slate-100" style={{ background: `linear-gradient(135deg, #081324 0%, #0B1F3A 100%)` }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full w-fit block border"
                style={{ color: cityData.accentColor, background: `${cityData.accentColor}15`, borderColor: `${cityData.accentColor}30` }}
              >
                Your {cityData.city} Broker
              </span>
              <h2
                className="text-[28px] sm:text-[36px] font-bold leading-tight text-white"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Meet {effectiveTeamLead.name}
              </h2>
              <p className="text-[15px] font-bold" style={{ color: cityData.accentColor }}>
                {effectiveTeamLead.title}
              </p>
              <p className="text-white/70 text-[14.5px] leading-relaxed">{effectiveTeamLead.bio}</p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="#enquiry"
                  className="inline-flex items-center gap-2 font-bold text-[13px] py-3 px-6 rounded-full text-white transition-all hover:scale-[1.03]"
                  style={{ background: cityData.accentColor }}
                >
                  Book with {effectiveTeamLead.name.split(" ")[0]} <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${(effectiveTeamLead.phone || cityData.officePhone).replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 font-bold text-[13px] py-3 px-6 rounded-full border border-white/25 text-white hover:bg-white/10 transition-all"
                >
                  <Phone className="w-4 h-4" /> {effectiveTeamLead.phone || cityData.officePhone}
                </a>
              </div>

              {/* Office Info */}
              <div
                className="flex items-start gap-3 p-4 rounded-2xl border mt-2"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
              >
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: cityData.accentColor }} />
                <div>
                  <p className="text-[12px] font-bold text-white/60 uppercase tracking-wider mb-0.5">Office Address</p>
                  <p className="text-[13.5px] font-semibold text-white">{cityData.officeAddress}</p>
                </div>
              </div>
            </div>

            {/* Accreditation / Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Award className="w-5 h-5" />, title: "FBAA Accredited", desc: "Member of Finance Brokers Association of Australasia" },
                { icon: <Shield className="w-5 h-5" />, title: "ASIC Licensed", desc: "Australian Credit Licence — fully regulated broker" },
                { icon: <TrendingUp className="w-5 h-5" />, title: "40+ Lenders", desc: `Access to 40+ lenders for ${cityData.city} borrowers` },
                { icon: <Clock className="w-5 h-5" />, title: "Fast Pre-Approvals", desc: "Same-day assessment and 48hr pre-approval turnaround" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${cityData.accentColor}22`, color: cityData.accentColor }}
                  >
                    {badge.icon}
                  </div>
                  <h4 className="text-[13px] font-bold text-white mb-1">{badge.title}</h4>
                  <p className="text-[11.5px] text-white/55 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE LINKS (quick links to all calculators) ── */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <h2
            className="text-[22px] font-bold text-[#0B1F3A] mb-6 text-center"
            style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
          >
            Tools & Resources for {cityData.city} Buyers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: "Borrowing Power Calculator", href: "/borrowing-power-calculator" },
              { name: "Loan Repayment Calculator", href: "/loan-repayment-calculator" },
              { name: "Stamp Duty Calculator", href: `/stamp-duty-calculator/stamp-duty-in-${cityData.stateShort.toLowerCase()}` },
              { name: "Refinancing Feasibility", href: "/refinancing-feasibility" },
              { name: "Deposit Calculator", href: "/deposit-calculator" },
              { name: "LMI Calculator", href: "/lmi-calculator" },
              { name: "First Home Buyer Guide", href: "/nepali-mortgage-broker-in-australia" },
              { name: "Book Consultation", href: "#enquiry" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 p-3.5 bg-white rounded-xl border border-slate-100 text-[12.5px] font-semibold text-[#0B1F3A] hover:border-opacity-60 transition-all hover:shadow-sm"
                style={{ "--hover-border": cityData.accentColor } as React.CSSProperties}
              >
                <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: cityData.accentColor }} />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / ENQUIRY FORM ── */}
      <section
        id="enquiry"
        className="py-16 md:py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #081324 0%, #0B1F3A 55%, ${cityData.accentDark}55 100%)` }}
      >
        <div className="absolute right-[-5%] top-[15%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: cityData.accentColor }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full w-fit block border"
                style={{ color: cityData.accentColor, background: `${cityData.accentColor}15`, borderColor: `${cityData.accentColor}30` }}
              >
                Get in Touch — {cityData.city}
              </span>
              <h2
                className="text-[30px] sm:text-[40px] font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Ready to Buy in{" "}
                <span style={{ color: cityData.accentColor }}>{cityData.city}?</span>
              </h2>
              <p className="text-white/70 text-[15px] leading-relaxed max-w-md">
                Our {cityData.city} team is ready to help you find the right loan from 40+ lenders.
                No fees, no obligation — just expert advice tailored to {cityData.city}&apos;s market.
              </p>

              <div className="space-y-3 pt-3">
                <a
                  href={`tel:${cityData.officePhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${cityData.accentColor}25` }}>
                    <Phone className="w-4 h-4" style={{ color: cityData.accentColor }} />
                  </div>
                  <span className="text-[14px] font-semibold">{cityData.officePhone}</span>
                </a>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${cityData.accentColor}25` }}>
                    <MapPin className="w-4 h-4" style={{ color: cityData.accentColor }} />
                  </div>
                  <span className="text-[14px] font-semibold">{cityData.officeAddress}</span>
                </div>
                <a
                  href="mailto:mortgage@mortgagexperts.com.au"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${cityData.accentColor}25` }}>
                    <Mail className="w-4 h-4" style={{ color: cityData.accentColor }} />
                  </div>
                  <span className="text-[14px] font-semibold">mortgage@mortgagexperts.com.au</span>
                </a>
              </div>

              {/* Nearby Areas */}
              <div className="pt-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Also Serving</p>
                <div className="flex flex-wrap gap-2">
                  {cityData.nearbyAreas.map((area) => (
                    <span
                      key={area}
                      className="text-[11.5px] font-semibold px-2.5 py-1 rounded-full border border-white/15 text-white/60"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: `${cityData.accentColor}20`, border: `1px solid ${cityData.accentColor}40` }}
                  >
                    <CheckCircle2 className="w-7 h-7" style={{ color: cityData.accentColor }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A]">Enquiry Received!</h3>
                  <p className="text-slate-500 text-[13.5px] max-w-sm mx-auto leading-relaxed">
                    Our {cityData.city} team will call you within 2 business hours to discuss your home loan needs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10.5px] font-bold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">
                      Your Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10.5px] font-bold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder=""
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-[#0B1F3A]/70 uppercase tracking-wide block mb-1.5">
                      What are you looking to do? (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`e.g. Buy first home in ${cityData.city}, refinance my current loan...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-bold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 hover:opacity-95"
                    style={{ background: cityData.accentColor, color: "#fff" }}
                  >
                    {submitting ? "Sending..." : `Book Free Consultation in ${cityData.city}`}
                  </button>
                  <p className="text-[10.5px] text-slate-400 text-center mt-2">
                    No fees. No obligation. Response within 2 business hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection
        badgeText="Google Reviews"
        titleText={
          <>
            Loved By Hundreds of{" "}
            <span style={{ color: cityData.accentColor }}>{cityData.city} Clients</span>
          </>
        }
        backgroundClass="bg-white"
      />

      <SiteFooter settings={settings} />
    </div>
  );
}
