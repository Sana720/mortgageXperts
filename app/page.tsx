"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Search,
  Phone,
  ArrowRight,
  Shield,
  Star,
  TrendingUp,
  Percent,
  Home as HomeIcon,
  ChevronDown,
  RefreshCw,
  Building2,
  Briefcase,
  HardHat,
  PiggyBank,
  CheckCircle2,
  Settings,
} from "lucide-react";

// â”€â”€ Premium inline SVG icons (match finalized design style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const IconBarChart = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="18" y="3" width="4" height="18" rx="1" />
    <rect x="10" y="8" width="4" height="13" rx="1" />
    <rect x="2" y="13" width="4" height="8" rx="1" />
  </svg>
);
const IconWallet = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
    <path d="M16 12h5v4h-5a2 2 0 0 1 0-4z" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M16 11l2 2 4-4" />
  </svg>
);
const IconHammer = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 12-8.5 8.5a2.121 2.121 0 1 1-3-3L12 9" />
    <path d="M17.64 15 22 10.64" />
    <path d="m20.91 11.7-1.25-1.25c.037-.055.07-.112.1-.171l1.069-2.137c.27-.541.153-1.19-.289-1.607l-2.43-2.242a1.308 1.308 0 0 0-1.65-.116l-2.137 1.069c-.06.03-.117.062-.172.1L13 4.09" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconShieldCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// -- Refinancing Graph (GREEN curve, matching reference design) ----------------
function RefGraph() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 2200;
      const animate = (now: number) => {
        const raw = (now - start) / duration;
        const p = Math.min(1 - Math.pow(1 - raw, 3), 1);
        setProgress(p);
        if (raw < 1) rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }, 400);
    return () => { clearTimeout(timeout); cancelAnimationFrame(rafRef.current); };
  }, []);

  const W = 195, H = 85;
  const barW = 18, gap = 10, startX = 6;
  const barH = 52;

  // Green curve: starts high (same as bars), descends month by month
  const curvePts: [number, number][] = [
    [startX + 0 * (barW + gap) + barW / 2, H - barH + 2],
    [startX + 1 * (barW + gap) + barW / 2, H - barH + 9],
    [startX + 2 * (barW + gap) + barW / 2, H - barH + 19],
    [startX + 3 * (barW + gap) + barW / 2, H - barH + 31],
    [startX + 4 * (barW + gap) + barW / 2, H - barH + 42],
    [startX + 5 * (barW + gap) + barW / 2, H - barH + 50],
  ];

  const curvePath = curvePts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt[0]} ${pt[1]}`;
    const prev = curvePts[i - 1];
    const cpx = (prev[0] + pt[0]) / 2;
    return `${acc} C ${cpx} ${prev[1]}, ${cpx} ${pt[1]}, ${pt[0]} ${pt[1]}`;
  }, '');

  const totalLen = 260;
  const drawn = totalLen * progress;
  const lastIdx = Math.min(Math.floor(progress * (curvePts.length - 0.01)), curvePts.length - 1);
  const lastPt = curvePts[lastIdx];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-lg p-3.5" style={{ width: 220 }}>
      <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest mb-0.5">Monthly Repayment</div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-[22px] font-black text-[#0B1F3A] leading-none">$1,243</span>
        <span className="mb-0.5 text-[10px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-md">- $320 Saved</span>
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
        {/* Green soft fill */}
        {progress > 0.05 && (
          <path
            d={`${curvePath} L ${lastPt[0]} ${H} L ${curvePts[0][0]} ${H} Z`}
            fill="#DCFCE7" opacity={0.45 * progress}
          />
        )}
        {/* Grey bars */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i}
            x={startX + i * (barW + gap)} y={H - barH + i * 2}
            width={barW} height={barH - i * 2} rx={3} fill="#E2E8F0"
          />
        ))}
        {/* Animated green curve */}
        <path
          d={curvePath} fill="none" stroke="#16A34A" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={totalLen} strokeDashoffset={totalLen - drawn}
        />
        {/* Endpoint dot */}
        {progress > 0.88 && (
          <>
            <circle cx={lastPt[0]} cy={lastPt[1]} r={6} fill="#16A34A" opacity={0.2} />
            <circle cx={lastPt[0]} cy={lastPt[1]} r={3.5} fill="#16A34A" />
          </>
        )}
      </svg>
    </div>
  );
}

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-1.15-1.02-1.92-2.48-2.18-3.99-.02.72-.01 1.44-.02 2.15-.05 4.18.06 8.39-.06 12.57-.15 2.1-1.04 4.17-2.73 5.48-1.74 1.4-4.17 1.93-6.38 1.62-2.3-.23-4.52-1.53-5.69-3.56-1.3-2.17-1.41-5-.36-7.17 1.01-2.19 3.25-3.8 5.67-4.01v4.2c-1.2.14-2.45.89-2.99 2.02-.63 1.27-.47 2.97.45 4.02.82.97 2.16 1.36 3.39 1.08 1.25-.23 2.37-1.3 2.58-2.58.17-1.63.1-3.28.12-4.93V.02z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.12h4.03a12.06 12.06 0 0 0 3.51-8.74z" />
    <path fill="#34A853" d="M12 24a11.59 11.59 0 0 0 8.05-2.91l-4.03-3.12a7.22 7.22 0 0 1-10.02-3.83H1.85v3.23A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M6 14.14a7.11 7.11 0 0 1 0-4.28V6.63H1.85a12 12 0 0 0 0 10.74L6 14.14z" />
    <path fill="#EA4335" d="M12 4.75a6.48 6.48 0 0 1 4.59 1.77L19.78 3.3A11.83 11.83 0 0 0 12 0 12 0 0 0 1.85 6.63L6 9.86A7.2 7.2 0 0 1 12 4.75z" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">

      {/* â”€â”€ TOP BAR â”€â”€ */}
      <div className="bg-[#0B1F3A] text-white/85 text-[11.5px] font-medium">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <span className="hidden sm:inline">Locations: NSW | VIC | QLD | SA | WA | TAS | ACT | NT</span>
              <span className="sm:hidden text-[10.5px]">NSW | VIC | QLD | SAâ€¦</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 border-l border-white/10 pl-5">
              <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <a href="mailto:mail@mortgagexperts.com.au" className="hover:text-[#38BDF8] transition-colors">
                mail@mortgagexperts.com.au
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <a href="#" className="hover:text-white transition-colors"><FacebookIcon /></a>
            <a href="#" className="hover:text-white transition-colors"><InstagramIcon /></a>
            <a href="#" className="hover:text-white transition-colors"><TikTokIcon /></a>
            <a href="#" className="hover:text-white transition-colors"><YoutubeIcon /></a>
          </div>
        </div>
      </div>

      {/* â”€â”€ MAIN HEADER â”€â”€ */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-3 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Mortgage Xperts Logo"
              width={180}
              height={56}
              priority
              className="object-contain h-14 w-auto"
            />
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold text-[#0B1F3A]">
            <Link href="/" className="text-[#2563EB] border-b-2 border-[#2563EB] pb-0.5">Home</Link>
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
              Calculators <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
              Guides <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
              Home Loans <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>
            <Link href="#" className="hover:text-[#2563EB] transition-colors">About Us</Link>
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
              Resources <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>
            <Link href="#" className="hover:text-[#2563EB] transition-colors">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="hidden md:flex items-center text-[#0B1F3A] hover:text-[#2563EB] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-1.5 text-[13.5px]">
              <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span className="text-slate-500 font-medium">Call:</span>
              <span className="font-bold text-[#0B1F3A]">0450 240 757</span>
            </div>
            <Link
              href="#"
              className="bg-[#2563EB] text-white text-[13px] font-bold py-2.5 px-5 rounded-full flex items-center gap-1.5 hover:bg-[#1d4ed8] transition-all duration-300 shadow-md shadow-blue-200 whitespace-nowrap"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden flex flex-col gap-1.5 p-1">
            <span className="w-5 h-0.5 bg-[#0B1F3A] block" />
            <span className="w-5 h-0.5 bg-[#0B1F3A] block" />
            <span className="w-5 h-0.5 bg-[#0B1F3A] block" />
          </button>
        </div>
      </header>

      {/* â”€â”€ HERO SECTION â”€â”€ */}
      <section
        className="relative bg-white overflow-hidden"
        style={{ minHeight: "660px" }}
      >
        {/* Hero image â€” right 52%, with blue blob behind it */}
        <div
          className="absolute top-0 right-0 h-full z-[1] hidden lg:block"
          style={{
            width: "52%",
          }}
        >
          {/* Light blue radial blob â€” only on the right side */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 90% at 62% 52%, #D4E9FF 0%, #E8F4FF 42%, #F4F9FF 62%, transparent 82%)",
            }}
          />
          {/* Actual hero photo on top of the blob */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/hero.png')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* White fade on left edge â€” blends photo into white left section */}
          <div
            className="absolute inset-y-0 left-0 w-48"
            style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.7) 50%, transparent 100%)" }}
          />
        </div>

        {/* Mobile hero image strip */}
        <div
          className="relative w-full h-56 sm:h-72 lg:hidden"
          style={{
            backgroundImage: "url('/images/hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 15%",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Content container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT: Text + CTAs + Trust Bar */}
          <div className="lg:col-span-6 flex flex-col gap-5">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EAF3FF] border border-[#2563EB]/15 rounded-full px-4 py-2 w-fit">
              <Shield className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span className="text-[11px] font-bold tracking-widest text-[#2563EB] uppercase">
                Trusted Mortgage Experts Across Australia
              </span>
            </div>

            {/* H1 */}
            <h1
              className="text-[40px] sm:text-[48px] lg:text-[54px] font-extrabold leading-[1.1] tracking-tight text-[#0B1F3A]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Smarter Home{" "}
              <br className="hidden sm:block" />
              Loan Solutions{" "}
              <br className="hidden sm:block" />
              For <span className="text-[#2563EB]">Australians.</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-md">
              Expert guidance. Better choices. Stronger outcomes.{" "}
              <br className="hidden sm:block" />
              We simplify the home loan journey and help you make{" "}
              <br className="hidden sm:block" />
              confident financial decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="#"
                className="bg-[#2563EB] text-white font-bold text-[14px] py-3.5 px-7 rounded-full inline-flex items-center justify-center gap-2 hover:bg-[#1d4ed8] transition-all duration-300 shadow-lg shadow-blue-200"
              >
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="border border-slate-300 text-[#0B1F3A] font-bold text-[14px] py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2 hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-300 bg-white"
              >
                <span className="w-6 h-6 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Explore Home Loan Guides
              </Link>
            </div>

            {/* Trust Proof Bar */}
            <div className="flex flex-wrap gap-6 items-center pt-5 mt-1 border-t border-slate-100">

              {/* Happy Clients */}
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
                  ].map((src, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-100 shrink-0">
                      <img src={src} alt={`Client ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0B1F3A] leading-none">15,000+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Happy Clients</div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-slate-200" />

              {/* Google Reviews */}
              <div className="flex items-center gap-2">
                <GoogleIcon />
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">4.9/5 From 1200+ Reviews</div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-slate-200" />

              {/* 40+ Lenders */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#EAF3FF] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0B1F3A] leading-none">40+ Lenders</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Working For You</div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Floating cards (visible on lg+) */}
          <div className="hidden lg:block lg:col-span-6 relative h-[500px]">

            {/* Card 1 â€“ Loans Approved (top right) */}
            <div className="absolute top-10 right-2 w-[210px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4 flex items-start gap-3 z-20">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[10.5px] text-slate-400 font-semibold uppercase tracking-wide">Loans Approved</div>
                <div className="text-[22px] font-black text-[#0B1F3A] leading-none mt-0.5">$2.4B+</div>
                <div className="text-[10.5px] text-slate-400 font-medium mt-1">Since 2010</div>
              </div>
            </div>

            {/* Card 2 â€“ Approval Rate (middle right) */}
            <div className="absolute top-[52%] right-0 w-[210px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4 flex items-start gap-3 z-20">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0">
                <Percent className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[10.5px] text-slate-400 font-semibold uppercase tracking-wide">Average Approval Rate</div>
                <div className="text-[22px] font-black text-[#0B1F3A] leading-none mt-0.5">98%</div>
                <div className="text-[10.5px] text-slate-400 font-medium mt-1">Helping More Australians</div>
              </div>
            </div>

            {/* Card 3 â€“ Tailored Solutions (bottom center) */}
            <div className="absolute bottom-8 left-4 right-12 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex items-stretch z-20" style={{ height: "72px" }}>
              {/* Text side with padding */}
              <div className="flex items-center gap-3 px-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0">
                  <HomeIcon className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[13px] text-[#0B1F3A] leading-none">Tailored Solutions</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                    Custom loan strategies<br />designed around your goals.
                  </div>
                </div>
              </div>
              {/* Villa image â€” no padding, fills full height flush to right edge */}
              <div className="relative w-24 shrink-0">
                <Image src="/images/villa.png" alt="Property" fill className="object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€ LENDER PANEL (separate from hero, below it) â”€â”€ */}
      <section className="bg-white border-t border-slate-100 py-4 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-3.5 px-5 flex items-center gap-4">

          {/* Label */}
          <div className="shrink-0 border-r border-slate-200 pr-5 mr-1">
            <p className="text-[11.5px] font-bold text-[#0B1F3A] uppercase tracking-wide leading-tight max-w-[110px]">
              Our Panel of 40+<br />Leading Lenders
            </p>
          </div>

          {/* Logos row */}
          <div className="flex-1 flex items-center justify-between gap-3 overflow-hidden">

            {/* nab */}
            <div className="flex items-center gap-0.5 shrink-0">
              <span className="font-extrabold text-[15px] text-black lowercase tracking-tighter leading-none">nab</span>
              <span className="w-2.5 h-2.5 bg-[#D2143A] rounded-[3px] rotate-12 ml-0.5 shrink-0 inline-block" />
            </div>

            {/* Westpac */}
            <div className="flex items-center shrink-0">
              <span className="font-black text-xl text-[#DA1B2B] tracking-tighter leading-none">W</span>
              <span className="font-bold text-[11px] text-[#DA1B2B] tracking-tight lowercase leading-none">estpac</span>
            </div>

            {/* ANZ */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="flex flex-col gap-0.5">
                <span className="w-3 h-[2px] bg-[#007DBA] rounded block" />
                <span className="w-4 h-[2px] bg-[#007DBA] rounded block" />
                <span className="w-2.5 h-[2px] bg-[#007DBA] rounded block" />
              </div>
              <span className="font-black text-sm text-[#007DBA] tracking-tight">ANZ</span>
            </div>

            {/* Commonwealth Bank */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-4 h-4 bg-[#FFCC00] rotate-45 flex items-center justify-center rounded-[2px]">
                <div className="w-2 h-2 bg-black rotate-45 rounded-[1px]" />
              </div>
              <span className="text-[9px] font-bold text-slate-800 tracking-tight leading-tight max-w-[52px]">Commonwealth Bank</span>
            </div>

            {/* ING */}
            <div className="flex items-center gap-0.5 shrink-0">
              <span className="font-black text-[13px] text-[#000066] tracking-tighter">ING</span>
              <span className="w-2 h-2 bg-[#FF6600] rounded-full ml-0.5" />
            </div>

            {/* st.george */}
            <div className="flex items-center gap-0.5 shrink-0">
              <span className="font-bold text-[11.5px] text-[#008751] tracking-tight">st.george</span>
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
            </div>

            {/* bankwest */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-3.5 h-3.5 bg-[#FF7900] rounded-full flex items-center justify-center">
                <span className="text-[6px] text-white font-extrabold">W</span>
              </div>
              <span className="font-bold text-[11px] text-slate-700 tracking-tight">bankwest</span>
            </div>

            {/* Suncorp */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#009639] bg-[#FFC72C]" />
              <span className="font-black text-[9.5px] text-slate-800 tracking-widest uppercase">SUNCORP</span>
            </div>

            {/* Macquarie */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <div className="w-1 h-[2px] bg-slate-900 rounded" />
              </div>
              <span className="font-extrabold text-[8.5px] text-slate-900 tracking-widest uppercase">MACQUARIE</span>
            </div>

          </div>

          {/* View all */}
          <div className="shrink-0 border-l border-slate-200 pl-4 ml-1">
            <Link href="#" className="text-[#2563EB] text-[12px] font-bold flex items-center gap-1 hover:underline whitespace-nowrap">
              View all lenders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
        </div>
      </section>

      {/* â”€â”€ FIND THE RIGHT LOAN PATH SECTION â”€â”€ */}
      {/* -- FIND THE RIGHT LOAN PATH SECTION -- */}
      <section className="py-14" style={{ background: "#EDF1F9" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <Settings className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-semibold text-[#2563EB]">Solutions Designed Around</span>
            </div>
            <h2
              className="text-[34px] md:text-[42px] font-extrabold text-[#0B1F3A] leading-tight"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Find The Right Loan Path
              <br /><span className="text-[#2563EB]">For Your Goals.</span>
            </h2>
            <p className="text-slate-500 text-[15px] mt-3 max-w-xl mx-auto leading-relaxed">
              Whether you&apos;re buying your first home, investing, refinancing or building,{" "}
              we&apos;ll help you find the right loan with confidence.
            </p>
          </div>

          {/* TOP ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

            {/* Card 1 - First Home Buyers */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[270px]">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EBF5FF] flex items-center justify-center mb-3 text-[#2563EB]">
                    <IconHome />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#0B1F3A] mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    First Home Buyers
                  </h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4 max-w-[240px]">
                    Step-by-step guidance to help you buy your first home with confidence and secure the best possible start.
                  </p>
                  {[
                    ["Understand grants & schemes", "We help you access government grants you may be eligible for."],
                    ["Borrow with confidence", "We explain your borrowing capacity in simple, clear terms."],
                  ].map(([title, sub]) => (
                    <div key={title} className="flex items-start gap-2 mb-2.5">
                      <div className="w-5 h-5 rounded bg-[#EBF5FF] flex items-center justify-center shrink-0 mt-0.5">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                          <rect x="4" y="3" width="16" height="18" rx="2" /><line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="12" y2="16" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#0B1F3A]">{title}</div>
                        <div className="text-[11px] text-slate-400 leading-snug">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="#" className="mt-2 inline-flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#2563EB] hover:text-white transition-all w-fit">
                  Explore First Home Loans <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, left half visible, right half clips off card edge */}
              <div className="w-[210px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/villa.png"
                  alt="First Home"
                  fill
                  style={{ objectFit: "cover", objectPosition: "left center" }}
                />
              </div>
            </div>

            {/* Card 2 - Refinancing */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[270px]">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EBF5FF] flex items-center justify-center mb-3 text-[#2563EB]">
                    <IconRefresh />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#0B1F3A] mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Refinancing
                  </h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4 max-w-[240px]">
                    Lower your rate, reduce repayments and save thousands over the life of your loan.
                  </p>
                  <div className="space-y-2">
                    {["Lower interest rates", "Reduce monthly repayments"].map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="text-[13px] text-slate-600">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="#" className="mt-5 inline-flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#2563EB] hover:text-white transition-all w-fit">
                  Explore Refinance Options <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="w-[260px] shrink-0 flex items-center justify-center p-4">
                <RefGraph />
              </div>
            </div>

          </div>

          {/* BOTTOM ROW - 4 small cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Investment Loans - Purple */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px]">
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center mb-1.5 text-[#7C3AED]">
                    <IconBarChart />
                  </div>
                  <div className="w-7 h-0.5 bg-[#7C3AED] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Investment Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Grow your wealth with smart investment loan strategies designed for long-term success.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#7C3AED] text-[10px] font-semibold border border-[#7C3AED] px-2.5 py-1.5 rounded-full hover:bg-[#7C3AED] hover:text-white transition-all w-fit whitespace-nowrap">
                  Explore Investment Loans <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, left half visible */}
              <div className="w-[90px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/villa.png"
                  alt="Investment"
                  fill
                  style={{ objectFit: "cover", objectPosition: "left center" }}
                />
              </div>
            </div>

            {/* Low Deposit Loans - Amber */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px]">
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center mb-1.5 text-[#D97706]">
                    <IconWallet />
                  </div>
                  <div className="w-7 h-0.5 bg-[#D97706] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Low Deposit Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Get into your home sooner with low deposit solutions and flexible options.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#D97706] text-[10px] font-semibold border border-[#D97706] px-2.5 py-1.5 rounded-full hover:bg-[#D97706] hover:text-white transition-all w-fit whitespace-nowrap">
                  Explore Low Deposit Loans <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, left half visible */}
              <div className="w-[90px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/villa.png"
                  alt="Low Deposit"
                  fill
                  style={{ objectFit: "cover", objectPosition: "left center" }}
                />
              </div>
            </div>

            {/* Self-Employed Loans - Blue */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px]">
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EBF5FF] flex items-center justify-center mb-1.5 text-[#2563EB]">
                    <IconUser />
                  </div>
                  <div className="w-7 h-0.5 bg-[#2563EB] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Self-Employed Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Flexible loans for business owners and self-employed Australians.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#2563EB] text-[10px] font-semibold border border-[#2563EB] px-2.5 py-1.5 rounded-full hover:bg-[#2563EB] hover:text-white transition-all w-fit whitespace-nowrap">
                  Explore Self-Employed Loans <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, left half visible */}
              <div className="w-[90px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/villa.png"
                  alt="Self Employed"
                  fill
                  style={{ objectFit: "cover", objectPosition: "left center" }}
                />
              </div>
            </div>

            {/* Construction Loans - Orange */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px]">
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] flex items-center justify-center mb-1.5 text-[#EA580C]">
                    <IconHammer />
                  </div>
                  <div className="w-7 h-0.5 bg-[#EA580C] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Construction Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Build your dream home with tailored construction loan solutions.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#EA580C] text-[10px] font-semibold border border-[#EA580C] px-2.5 py-1.5 rounded-full hover:bg-[#EA580C] hover:text-white transition-all w-fit whitespace-nowrap">
                  Explore Construction Loans <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              {/* Right image: 1:1 PNG, left half visible */}
              <div className="w-[90px] shrink-0 relative overflow-hidden">
                <Image
                  src="/images/villa.png"
                  alt="Construction"
                  fill
                  style={{ objectFit: "cover", objectPosition: "left center" }}
                />
              </div>
            </div>

          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-5 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#EBF5FF] flex items-center justify-center shrink-0 text-[#2563EB]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-[#0B1F3A] text-[15px]">Not sure which loan is right for you?</div>
                <div className="text-slate-500 text-[13px]">Our mortgage experts are here to help you every step of the way.</div>
              </div>
            </div>
            <Link href="#" className="bg-[#2563EB] text-white font-bold text-[13px] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#1d4ed8] transition-all shadow-sm whitespace-nowrap shrink-0">
              Talk To An Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}