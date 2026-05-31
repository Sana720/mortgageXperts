"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
  Shield,
  Lock,
  MessageCircle,
  Home as HomeIcon,
  Calculator,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem, Reveal, VIEWPORT, EASE_OUT } from "@/lib/motion";

// Helper components
function FooterNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-1.5 text-[12.5px] text-slate-300 hover:text-white transition-colors leading-snug">
      <ChevronRight className="w-3.5 h-3.5 text-[#2563EB] shrink-0" strokeWidth={2.5} />
      <span>{children}</span>
    </Link>
  );
}

function FooterColumnCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#38BDF8] hover:underline mt-3">
      {children}
      <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  );
}

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

export function SiteFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  return (
    <div className="bg-[#F0F4FA] w-full">
      {/* Pre-footer contact card */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-4 pb-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="bg-white rounded-2xl border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.08)] px-5 py-5 sm:px-8 sm:py-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-full bg-[#EAF3FF] border border-[#D8E7FF] flex items-center justify-center shrink-0">
              <HomeIcon className="w-6 h-6 text-[#2563EB]" />
            </div>
            <p
              className="text-[18px] sm:text-[20px] lg:text-[22px] font-extrabold text-[#0B1F3A] leading-snug"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Specialists in <span className="text-[#2563EB]">Healthcare</span> &amp; <span className="text-[#2563EB]">Investment</span> lending across Australia.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-0">
              <div className="flex items-start gap-3 sm:px-6 lg:border-l lg:border-slate-200">
                <MessageCircle className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Speak to an Expert</div>
                  <a href="tel:0450240757" className="text-[16px] font-extrabold text-[#2563EB] hover:underline">
                    0450 240 757
                  </a>
                  <div className="text-[11px] text-slate-400 mt-0.5">Mon - Fri 8am - 6pm AEST</div>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:px-6 sm:border-l sm:border-slate-200">
                <Mail className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Email Us</div>
                  <a href="mailto:mortgage@mortgagexperts.com.au" className="text-[14px] sm:text-[15px] font-extrabold text-[#2563EB] hover:underline break-all">
                    mortgage@mortgagexperts.com.au
                  </a>
                  <div className="text-[11px] text-slate-400 mt-0.5">We reply within 24 hours</div>
                </div>
              </div>
            </div>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-white font-bold text-[13px] px-6 py-3.5 hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-200 whitespace-nowrap lg:ml-6"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main footer */}
      <footer className="bg-[#000b1e] rounded-t-[28px] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-12 md:pt-14 pb-8">
          <Stagger className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
            {/* Brand column */}
            <StaggerItem className="lg:col-span-3">
              <Link href="/" className="inline-block mb-5">
                <Image
                  src="/images/footer-logo.png"
                  alt="Mortgage Xperts"
                  width={200}
                  height={56}
                  className="h-11 sm:h-12 w-auto object-contain object-left"
                />
              </Link>
              <p className="text-[13px] text-slate-400 leading-relaxed mb-6 max-w-xs">
                We simplify the home loan journey and help Australians achieve their property goals with confidence and clarity.
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <a href="tel:0450240757" className="flex items-center gap-2.5 text-[13px] text-slate-300 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
                    0450 240 757
                  </a>
                </li>
                <li>
                  <a href="mailto:mortgage@mortgagexperts.com.au" className="flex items-center gap-2.5 text-[13px] text-slate-300 hover:text-white transition-colors break-all">
                    <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                    mortgage@mortgagexperts.com.au
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-[13px] text-slate-300">
                  <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>Level 20, 1 Market St, Sydney NSW 2000</span>
                </li>
              </ul>
              <div className="flex items-center gap-2.5">
                {[
                  { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/MortgageXperts.au/", hoverClass: "hover:bg-[#1877F2]" },
                  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/mortgagexperts.au/#", hoverClass: "hover:bg-[#E4405F]" },
                  { Icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@mortgagexperts.au?_t=ZS-90VgVATQ560&_r=1", hoverClass: "hover:bg-[#FE2C55]" },
                  { Icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@mortgagexpertsau", hoverClass: "hover:bg-[#FF0000]" },
                ].map(({ Icon, label, href, hoverClass }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-9 h-9 rounded-full bg-[#0a1628] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 ${hoverClass}`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </StaggerItem>

            {/* Nav columns */}
            <StaggerItem className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <HomeIcon className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">Home Loans</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="/nepali-mortgage-broker-in-australia">Buying a First Home</FooterNavLink>
                  <FooterNavLink href="/refinancing-a-loan">Refinancing a Loan</FooterNavLink>
                  <FooterNavLink href="/investing-in-property">Investing in Property</FooterNavLink>
                  <FooterNavLink href="/home-guarantee-scheme">Home Guarantee Scheme</FooterNavLink>
                  <FooterNavLink href="/no-deposit-home-loans">No Deposit Home Loans</FooterNavLink>
                </div>
                <FooterColumnCta href="/nepali-mortgage-broker-in-australia">Explore solutions</FooterColumnCta>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">Calculators &amp; Tools</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">Borrowing Power</FooterNavLink>
                  <FooterNavLink href="#">Repayment</FooterNavLink>
                  <FooterNavLink href="#">Stamp Duty</FooterNavLink>
                  <FooterNavLink href="#">Loan Comparison</FooterNavLink>
                  <FooterNavLink href="#">Refinance</FooterNavLink>
                </div>
                <FooterColumnCta href="#">View all tools</FooterColumnCta>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">Resources</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">Home Loan Guides</FooterNavLink>
                  <FooterNavLink href="#">FAQs</FooterNavLink>
                  <FooterNavLink href="#">Knowledge Hub</FooterNavLink>
                  <FooterNavLink href="#">Market Insights</FooterNavLink>
                  <FooterNavLink href="#">Blog</FooterNavLink>
                </div>
                <FooterColumnCta href="#">Explore resources</FooterColumnCta>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">Locations</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">NSW</FooterNavLink>
                  <FooterNavLink href="#">Victoria</FooterNavLink>
                  <FooterNavLink href="#">QLD</FooterNavLink>
                  <FooterNavLink href="#">SA</FooterNavLink>
                  <FooterNavLink href="#">WA</FooterNavLink>
                </div>
                <FooterColumnCta href="#">View all locations</FooterColumnCta>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-[13px] font-extrabold text-white">About Us</h4>
                </div>
                <div className="flex flex-col gap-2.5">
                  <FooterNavLink href="#">About Mortgage Xperts</FooterNavLink>
                  <FooterNavLink href="#">Our Lenders</FooterNavLink>
                  <FooterNavLink href="#">Reviews</FooterNavLink>
                  <FooterNavLink href="#">Careers</FooterNavLink>
                  <FooterNavLink href="#">Contact Us</FooterNavLink>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Newsletter */}
          <Reveal direction="up" className="rounded-2xl border border-white/10 bg-[#0a1628]/80 p-5 sm:p-6 mb-10">
            <div className="flex flex-col xl:flex-row xl:items-center gap-6">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2563EB] border-2 border-[#0a1628]" />
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
                  Stay ahead with the latest{" "}
                  <span className="text-white font-bold">mortgage insights.</span> News, rate updates and expert tips delivered straight to your inbox.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 xl:max-w-[480px] shrink-0 w-full xl:w-auto">
                <div className="relative flex-1 min-w-[220px]">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-white/20 bg-[#000b1e] py-3.5 pl-11 pr-[120px] text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                  />
                  <button
                    type="button"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-[#2563EB] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#1d4ed8] transition-colors inline-flex items-center gap-1"
                  >
                    Subscribe
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-[11px] text-slate-400 xl:shrink-0">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Shield className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  No spam. Ever. Unsubscribe anytime.
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Lock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  Your privacy is our priority.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Legal bar */}
          <Reveal delay={0.08} direction="fade" className="border-t border-white/10 pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-[11px] sm:text-[12px] text-slate-400">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
              <span>© 2026 Mortgage Xperts. All Rights Reserved.</span>
              <span className="hidden sm:inline text-white/20">·</span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {["Privacy Policy", "Terms & Conditions", "Credit Guide", "Disclaimer"].map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    {i > 0 && <span className="text-white/20 hidden sm:inline">·</span>}
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 shrink-0">
              <svg className="w-4 h-4 text-[#2563EB] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C8.5 2 5.5 4 4 7c-1.2 2.2-1 5 .5 7.2.8 1.1 2 2.5 3.5 4.3.9 1.1 1.8 2.2 2.5 3.2.4.6.9 1.3 1 1.3s.6-.7 1-1.3c.7-1 1.6-2.1 2.5-3.2 1.5-1.8 2.7-3.2 3.5-4.3 1.5-2.2 1.7-5 .5-7.2C18.5 4 15.5 2 12 2zm0 5.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
              </svg>
              <span>Australian Credit Licence 00000</span>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
