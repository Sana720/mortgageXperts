"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  Search,
  Phone,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  X
} from "lucide-react";

// Social Icons SVGs
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

export function SiteHeader({ isSticky = true, settings = {} }: { isSticky?: boolean; settings?: Record<string, string> }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHomeLoansOpen, setIsMobileHomeLoansOpen] = useState(false);
  const [isMobileXpertsRangeOpen, setIsMobileXpertsRangeOpen] = useState(false);
  const [isMobileCalculatorsOpen, setIsMobileCalculatorsOpen] = useState(false);
  const [isMobileStampDutyOpen, setIsMobileStampDutyOpen] = useState(false);
  const [isMobileAboutUsOpen, setIsMobileAboutUsOpen] = useState(false);

  const phoneVal = settings.header_phone || "0450 240 757";
  const emailVal = settings.support_email || "mortgage@mortgagexperts.com.au";
  const logoVal = settings.logo_url || "/images/logo.png";
  const fbVal = settings.facebook_url || "https://www.facebook.com/MortgageXperts.au/";
  const igVal = settings.instagram_url || "https://www.instagram.com/mortgagexperts.au/#";
  const ttVal = settings.tiktok_url || "https://www.tiktok.com/@mortgagexperts.au?_t=ZS-90VgVATQ560&_r=1";
  const ytVal = settings.youtube_url || "https://www.youtube.com/@mortgagexpertsau";

  const homeLoanMenu = [
    { name: "Buying a First Home", href: "/nepali-mortgage-broker-in-australia" },
    { name: "Refinancing a Loan", href: "/refinancing-a-loan" },
    { name: "Investing in Property", href: "/investing-in-property-nepali-mortgage-broker" },
    { name: "Home Guarantee Scheme", href: "/home-guarantee-scheme" },
    { name: "No Deposit Home Loans", href: "/no-deposit-home-loans" },
    { name: "Self-Employed Home Loans", href: "/self-employed-home-loans" },
    { name: "Home Loan for Nurses", href: "/home-loan-for-nurses" },
    { name: "Home Loan for Accountants", href: "/home-loan-for-accountants" },
    { name: "Home Loan for Doctors", href: "/home-loan-for-doctors" },
    { name: "Visa & Non-Resident Home Loans", href: "/home-loan-with-visas" },
  ];

  const branchesMenu = [
    { name: "Mortgage Xperts — Adelaide", href: "/branches/adelaide", state: "SA" },
    { name: "Mortgage Xperts — Brisbane", href: "/branches/brisbane", state: "QLD" },
    { name: "Mortgage Xperts — Melbourne", href: "/branches/melbourne", state: "VIC" },
    { name: "Mortgage Xperts — Perth", href: "/branches/perth", state: "WA" },
    { name: "Mortgage Xperts — Sydney", href: "/branches/sydney", state: "NSW" },
  ];

  const stampDutyStates = [
    { name: "Stamp Duty in ACT", href: "/stamp-duty-calculator" },
    { name: "Stamp Duty in NSW", href: "/stamp-duty-calculator/stamp-duty-in-nsw" },
    { name: "Stamp Duty in VIC", href: "/stamp-duty-calculator/stamp-duty-in-vic" },
    { name: "Stamp Duty in QLD", href: "/stamp-duty-calculator/stamp-duty-in-qld" },
    { name: "Stamp Duty in WA", href: "/stamp-duty-calculator/stamp-duty-in-wa" },
    { name: "Stamp Duty in SA", href: "/stamp-duty-calculator/stamp-duty-in-sa" },
    { name: "Stamp Duty in TAS", href: "/stamp-duty-calculator/stamp-duty-in-tas" },
    { name: "Stamp Duty in NT", href: "/stamp-duty-calculator/stamp-duty-in-nt" },
  ];

  const calculatorsMenu = [
    { name: "Loan Repayment Calculator", href: "/loan-repayment-calculator" },
    { name: "Borrowing Power Calculator", href: "/borrowing-power-calculator" },
    { 
      name: "Stamp Duty Calculator", 
      href: "/stamp-duty-calculator", 
      submenu: stampDutyStates 
    },
    { name: "Refinancing Feasibility", href: "/refinancing-feasibility" },
    { name: "Extra Repayment Calculator", href: "/extra-repayment-calculator" },
    { name: "Year-To-Date Calculator", href: "/ytd-calculator" },
    { name: "Deposit Calculator", href: "/deposit-calculator" },
    { name: "LMI Calculator", href: "/lmi-calculator" },
    { name: "Loan Comparison Calculator", href: "/loan-comparison-calculator" },
    { name: "Rent Yield Calculator", href: "/rent-yield-calculators" },
    { name: "Equity Calculator", href: "/equity-calculator" },
    { name: "Cash Rate Change Calculator", href: "/cash-rate-change-calculator" },
  ];

  const aboutUsMenu = [
    { name: "Why Use Mortgage Xperts ?", href: "/nepali-mortgage-broker-in-brisbane" },
    { name: "What We Do", href: "/best-nepali-mortgage-broker-australia" },
    { name: "Who We Help", href: "/top-nepali-mortgage-broker-in-australia" },
    { name: "Our Team", href: "/nepali-mortgage-broker-australia" },
  ];

  const freeResourcesMenu = [
    { name: "First Home Buyers Step by Step Guide", href: "/free-resources/first-home-buyers-step-by-step-guide" },
    { name: "Step By Step Home Buying Process", href: "/free-resources/step-by-step-home-buying-process" },
  ];

  const resourcesMenu = [
    { name: "The Xperts News & Insights", href: "/the-xperts-news-insights" },
    { name: "Blog", href: "/blog" },
    { name: "First Home Guide", href: "/first-home-guide" },
    { name: "Refinancing Guide", href: "/refinancing-guide" },
    { name: "Property Investment Guide", href: "/property-investment-guide" },
    { 
      name: "Free Resources", 
      href: "#", 
      submenu: freeResourcesMenu 
    },
  ];

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className="hidden xl:block bg-gradient-to-r from-[#081324] via-[#0B1F3A] to-[#081324] border-b border-white/5 text-slate-300 text-[11.5px] font-medium font-inter">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 group cursor-default">
              <div className="w-5 h-5 rounded-full bg-[#38BDF8]/10 flex items-center justify-center group-hover:bg-[#38BDF8]/20 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              </div>
              <span className="hidden sm:inline tracking-wide">Locations: NSW | VIC | QLD | SA | WA | TAS | ACT | NT</span>
              <span className="sm:hidden text-[10.5px]">Locations: NSW | VIC | QLD | SA...</span>
            </div>
            <div className="hidden md:flex items-center gap-2.5 border-l border-white/10 pl-6 group">
              <div className="w-5 h-5 rounded-full bg-[#38BDF8]/10 flex items-center justify-center group-hover:bg-[#38BDF8]/20 transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
              </div>
              <a href={`mailto:${emailVal}`} className="hover:text-white transition-colors tracking-wide">
                {emailVal}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <a href={fbVal} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#1877F2] text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <FacebookIcon />
            </a>
            <a href={igVal} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#E4405F] text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <InstagramIcon />
            </a>
            <a href={ttVal} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#FE2C55] text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <TikTokIcon />
            </a>
            <a href={ytVal} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#FF0000] text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header className={`bg-white border-b border-slate-100 z-50 shadow-sm ${isSticky ? "sticky top-0" : "relative"}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-2 lg:py-3 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src={logoVal}
              alt="Mortgage Xperts Logo"
              width={180}
              height={56}
              priority
              className="object-contain h-11 xl:h-14 w-auto"
            />
          </Link>

          {/* Center Navigation */}
          <nav className="hidden xl:flex items-center gap-4 xl:gap-5 2xl:gap-7 text-[13px] 2xl:text-[13.5px] font-semibold text-[#0B1F3A] whitespace-nowrap shrink-0">
            
            {/* Home Dropdown */}
            <div className="relative group py-2">
              <Link href="/" className="flex items-center gap-1 hover:text-[#2563EB] transition-colors pb-0.5 focus:outline-none whitespace-nowrap">
                Home <ChevronDown className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 pt-2.5 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-slate-100 rounded-xl shadow-xl py-2 max-h-[400px] overflow-y-auto">
                  {homeLoanMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Calculators Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors focus:outline-none whitespace-nowrap">
                Calculators <ChevronDown className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2.5 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-slate-100 rounded-xl shadow-xl py-2">
                  {calculatorsMenu.map((item) => {
                    if (item.submenu) {
                      return (
                        <div key={item.name} className="relative group/sub">
                          <button className="w-full flex items-center justify-between px-4 py-2 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold text-left">
                            <span>{item.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-[#2563EB]" />
                          </button>
                          <div className="absolute left-full top-0 pl-1 w-64 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                            <div className="bg-white border border-slate-100 rounded-xl shadow-xl py-2">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors focus:outline-none whitespace-nowrap">
                Resources <ChevronDown className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2.5 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-slate-100 rounded-xl shadow-xl py-2">
                  {resourcesMenu.map((item) => {
                    if (item.submenu) {
                      return (
                        <div key={item.name} className="relative group/sub">
                          <button className="w-full flex items-center justify-between px-4 py-2 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold text-left">
                            <span>{item.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-[#2563EB]" />
                          </button>
                          <div className="absolute left-full top-0 pl-1 w-64 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                            <div className="bg-white border border-slate-100 rounded-xl shadow-xl py-2">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mortgage Mate (Direct Link) */}
            <Link href="/mortgage-mate" className="hover:text-[#2563EB] transition-colors pb-0.5 whitespace-nowrap">Mortgage Mate</Link>

            {/* About Us Dropdown */}
            <div className="relative group py-2">
              <Link href="/about-us-nepali-mortgage-broker-in-australia" className="flex items-center gap-1 hover:text-[#2563EB] transition-colors pb-0.5 focus:outline-none whitespace-nowrap">
                About Us <ChevronDown className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 pt-2.5 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-slate-100 rounded-xl shadow-xl py-2 max-h-[400px] overflow-y-auto">
                  {aboutUsMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact (Direct Link) */}
            <Link href="/best-nepali-investment-mortgage-broker-perth" className="hover:text-[#2563EB] transition-colors pb-0.5 whitespace-nowrap">Contact</Link>

            {/* Our Branches Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 text-[#2563EB] hover:text-[#1d4ed8] transition-colors focus:outline-none font-bold whitespace-nowrap">
                Our Branches <ChevronDown className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full right-0 pt-2.5 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-slate-100 rounded-xl shadow-xl py-2 overflow-hidden">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Locations Across Australia</span>
                  </div>
                  {branchesMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-2.5 text-[13px] text-[#0B1F3A] hover:bg-blue-50/70 hover:text-[#2563EB] transition-all font-semibold group/item"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] font-black text-slate-400 group-hover/item:text-[#2563EB] transition-colors">{item.state}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <button className="hidden xl:flex items-center text-[#0B1F3A] hover:text-[#2563EB] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden xl:flex items-center gap-1.5 text-[13.5px]">
              <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span className="text-slate-500 font-medium">Call:</span>
              <span className="font-bold text-[#0B1F3A]">{phoneVal}</span>
            </div>
            {/* Desktop Button */}
            <Link
              href="/#contact"
              className="hidden xl:flex bg-[#2563EB] text-white text-[13px] font-bold py-2.5 px-5 rounded-full items-center gap-1.5 hover:bg-[#1d4ed8] transition-all duration-300 shadow-md shadow-blue-200 whitespace-nowrap"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            {/* Mobile Quick Action Buttons (Replacing single Let's Talk button with 2 Stunning Circular Icons) */}
            <div className="flex xl:hidden items-center gap-3">
              {/* Call Icon Button */}
              <a
                href={`tel:${phoneVal.replace(/\s+/g, "")}`}
                className="w-10 h-10 rounded-full border-2 border-[#0EA5E9] bg-[#F0F9FF] flex items-center justify-center text-[#0EA5E9] hover:bg-[#E0F2FE] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                aria-label="Call Us"
              >
                <Phone className="w-4.5 h-4.5" strokeWidth={2.5} />
              </a>
              {/* Email Icon Button */}
              <a
                href={`mailto:${emailVal}`}
                className="w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center text-white hover:bg-[#E05E00] hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-orange-500/20"
                aria-label="Email Us"
              >
                <Mail className="w-4.5 h-4.5" strokeWidth={2.5} />
              </a>
            </div>
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden flex flex-col gap-1.5 p-2 z-50 relative focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span className={`w-5.5 h-0.5 block transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2 bg-[#0B1F3A]" : "bg-[#0EA5E9] xl:bg-[#0B1F3A]"}`} />
              <span className={`w-5.5 h-0.5 block transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "bg-[#0EA5E9] xl:bg-[#0B1F3A]"}`} />
              <span className={`w-5.5 h-0.5 block transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-[#0B1F3A]" : "bg-[#0EA5E9] xl:bg-[#0B1F3A]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Off-Canvas) Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="xl:hidden fixed inset-0 bg-[#0B1F3A]/60 backdrop-blur-sm z-50"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="xl:hidden fixed inset-y-0 right-0 w-[300px] sm:w-[340px] bg-white z-50 shadow-2xl flex flex-col p-6 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 shrink-0">
                <div className="relative h-9 w-32">
                  <Image src="/images/logo.png" alt="Mortgage Xperts Logo" fill className="object-contain object-left" />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#0B1F3A] transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col gap-4 font-semibold text-[#0B1F3A] text-[15px]">
                {/* Home Dropdown/Block */}
                <div className="border-b border-slate-50 pb-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between w-full">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors">
                      Home
                    </Link>
                    <button
                      onClick={() => setIsMobileHomeLoansOpen(!isMobileHomeLoansOpen)}
                      className="p-1 focus:outline-none"
                      aria-label="Toggle Home Submenu"
                    >
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isMobileHomeLoansOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {isMobileHomeLoansOpen && (
                    <div className="pl-3 flex flex-col gap-2.5 text-[13.5px] font-medium text-slate-600 mt-1 max-h-[200px] overflow-y-auto animate-fadeIn">
                      {homeLoanMenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="hover:text-[#2563EB] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Calculators Dropdown/Block */}
                <div className="border-b border-slate-50 pb-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={() => setIsMobileCalculatorsOpen(!isMobileCalculatorsOpen)}
                      className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block focus:outline-none"
                    >
                      Calculators
                    </button>
                    <button
                      onClick={() => setIsMobileCalculatorsOpen(!isMobileCalculatorsOpen)}
                      className="p-1 focus:outline-none"
                      aria-label="Toggle Calculators Submenu"
                    >
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isMobileCalculatorsOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {isMobileCalculatorsOpen && (
                    <div className="pl-2 flex flex-col gap-2.5 text-[13.5px] font-medium text-slate-600 mt-1 max-h-[300px] overflow-y-auto">
                      {calculatorsMenu.map((item) => {
                        if (item.submenu) {
                          return (
                            <div key={item.name} className="flex flex-col gap-1.5 pl-1">
                              <div className="flex items-center justify-between w-full">
                                <button
                                  onClick={() => setIsMobileStampDutyOpen(!isMobileStampDutyOpen)}
                                  className="hover:text-[#2563EB] transition-colors cursor-pointer text-left font-semibold text-[13.5px]"
                                >
                                  {item.name}
                                </button>
                                <button
                                  onClick={() => setIsMobileStampDutyOpen(!isMobileStampDutyOpen)}
                                  className="p-1 focus:outline-none"
                                  aria-label="Toggle Stamp Duty Submenu"
                                >
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isMobileStampDutyOpen ? "rotate-180" : ""}`} />
                                </button>
                              </div>
                              {isMobileStampDutyOpen && (
                                <div className="pl-3 flex flex-col gap-2 text-[12.5px] text-slate-500 mt-1 max-h-[200px] overflow-y-auto">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="hover:text-[#2563EB] transition-colors py-1 font-semibold"
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-[#2563EB] transition-colors pl-1 font-semibold"
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Resources Dropdown/Block */}
                <div className="border-b border-slate-50 pb-2 flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Resources</span>
                  <div className="pl-2 flex flex-col gap-2.5 text-[13.5px] font-medium text-slate-600">
                    <Link href="/#guides" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors">
                      Mortgage Resource Hub
                    </Link>
                    <Link href="/home-guarantee-scheme" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors">
                      Home Guarantee Scheme
                    </Link>
                  </div>
                </div>

                {/* Mortgage Mate */}
                <Link href="/mortgage-mate" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors pb-2 border-b border-slate-50">
                  Mortgage Mate
                </Link>

                {/* About Us Dropdown/Block */}
                <div className="border-b border-slate-50 pb-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between w-full">
                    <Link href="/about-us-nepali-mortgage-broker-in-australia" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors">
                      About Us
                    </Link>
                    <button
                      onClick={() => setIsMobileAboutUsOpen(!isMobileAboutUsOpen)}
                      className="p-1 focus:outline-none"
                      aria-label="Toggle About Us Submenu"
                    >
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isMobileAboutUsOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {isMobileAboutUsOpen && (
                    <div className="pl-3 flex flex-col gap-2.5 text-[13.5px] font-medium text-slate-600 mt-1 max-h-[200px] overflow-y-auto animate-fadeIn">
                      {aboutUsMenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="hover:text-[#2563EB] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/best-nepali-investment-mortgage-broker-perth" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#2563EB] transition-colors pb-2 border-b border-slate-50">
                  Contact
                </Link>

                {/* Our Branches Dropdown/Block */}
                <div className="border-b border-slate-50 pb-2 flex flex-col gap-1.5">
                  <button
                    onClick={() => setIsMobileXpertsRangeOpen(!isMobileXpertsRangeOpen)}
                    className="flex items-center justify-between w-full text-left focus:outline-none"
                  >
                    <span className="text-[10px] text-[#2563EB] font-bold uppercase tracking-wider block">Our Branches</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isMobileXpertsRangeOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isMobileXpertsRangeOpen && (
                    <div className="pl-2 flex flex-col gap-2 text-[13.5px] font-medium text-slate-600 mt-1">
                      {branchesMenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between hover:text-[#2563EB] transition-colors py-0.5"
                        >
                          <span>{item.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 ml-2">{item.state}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Section: Contact & Socials */}
              <div className="mt-auto pt-6 border-t border-slate-100 shrink-0 flex flex-col gap-4">
                <div className="flex flex-col gap-2.5">
                  <a href={`tel:${phoneVal.replace(/\s+/g, "")}`} className="flex items-center gap-2 text-[13px] font-semibold text-slate-600 hover:text-[#2563EB] transition-colors">
                    <Phone className="w-4 h-4 text-[#2563EB] shrink-0" /> {phoneVal}
                  </a>
                  <a href={`mailto:${emailVal}`} className="flex items-center gap-2 text-[13px] font-semibold text-slate-600 hover:text-[#2563EB] transition-colors break-all">
                    <Mail className="w-4 h-4 text-[#2563EB] shrink-0" /> {emailVal}
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  {[
                    { Icon: FacebookIcon, label: "Facebook", href: fbVal, hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]/20" },
                    { Icon: InstagramIcon, label: "Instagram", href: igVal, hoverClass: "hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]/20" },
                    { Icon: TikTokIcon, label: "TikTok", href: ttVal, hoverClass: "hover:bg-[#FE2C55] hover:text-white hover:border-[#FE2C55]/20" },
                    { Icon: YoutubeIcon, label: "YouTube", href: ytVal, hoverClass: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]/20" },
                  ].map(({ Icon, label, href, hoverClass }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-8 h-8 rounded-full bg-slate-55 border border-slate-200 flex items-center justify-center text-slate-500 transition-all duration-300 ${hoverClass}`}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>

                {/* Consultation Button */}
                <Link
                  key="cta"
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-[#2563EB] text-white text-[13.5px] font-bold py-3 px-5 rounded-full flex items-center justify-center gap-1.5 hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-100 text-center"
                >
                  Book Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
