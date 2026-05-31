"use client";

import React from "react";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomeLoanForNurses() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-br from-[#081324] via-[#0B1F3A] to-[#122b50] text-white">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Sparkles className="w-4.5 h-4.5 text-[#38BDF8] animate-pulse" />
            <span className="text-[#38BDF8] text-[10px] font-extrabold tracking-widest uppercase">
              Home Loans for Nurses
            </span>
          </div>

          <h1 className="text-[36px] sm:text-[48px] font-black leading-tight mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Special LMI Waivers &amp; Benefits for Nursing Professionals
          </h1>

          <p className="text-slate-300 text-[14.5px] sm:text-[16px] leading-relaxed max-w-lg mb-8">
            This premium landing page is currently being prepared. We are finalizing LMI waiver eligibility guidelines for frontline healthcare professionals.
          </p>

          <div className="flex gap-4">
            <Link href="/" className="bg-[#2563EB] text-white font-bold text-[13px] py-3.5 px-8 rounded-full flex items-center justify-center gap-1.5 hover:bg-[#1d4ed8] transition-colors">
              Return Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
