"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;
const VIEWPORT = { once: true, margin: "-80px" };

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#EA580C] shrink-0">
    <path d="M12 2c0 0-4.5 4.5-4.5 8.5C7.5 13.5 9.5 15 12 15s4.5-1.5 4.5-4.5C16.5 6.5 12 2 12 2zm0 18c3.5 0 6-2.5 6-6 0-1.5-.5-3-1.5-4.5-1.5 2-3.5 3-4.5 4s-1.5 2-1.5 3c0 2 1.5 3.5 3 3.5z" />
  </svg>
);

export function LenderPanelSection() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4.5 relative overflow-hidden"
        >
          {/* Top Row: Lender Logos */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Label */}
            <div className="shrink-0 md:border-r border-slate-200 pr-6 md:mr-4 border-b md:border-b-0 pb-3 md:pb-0 w-full md:w-auto text-center md:text-left flex md:block justify-center z-10 bg-white">
              <p className="text-[11.5px] font-bold text-[#0B1F3A] uppercase tracking-wide whitespace-nowrap">
                OUR PANEL OF 40+ LEADING LENDERS
              </p>
            </div>

            {/* Logos row Marquee */}
            <div className="flex-1 overflow-hidden relative flex items-center h-[60px] w-full my-4 md:my-0" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
              <div className="flex w-max animate-marquee items-center hover:pause">
                {[
                  { src: "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png", scale: "scale-[1.2]" },
                  { src: "/images/brands/westpac-logo-png_seeklogo-152472-1.png", scale: "scale-[1.6]" },
                  { src: "/images/brands/anz-2-logo-png-transparent-1.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/ING_Group_N.V._Logo.svg-1.png", scale: "scale-100" },
                  { src: "/images/brands/St_George_Bank_logo-1-scaled.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/Bankwest_new_logo-1.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/Suncorp-Bank-Logo-1-scaled.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/images-3-1.png", scale: "scale-100" },
                  { src: "/images/brands/adelaide-bank-vector-logo-11574265916rvuvsw06fg-1.png", scale: "scale-[1.7]" },
                  { src: "/images/brands/firstmac-limited-logo-vector-1.png", scale: "scale-105" },
                  { src: "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png", scale: "scale-[1.2]" },
                  { src: "/images/brands/westpac-logo-png_seeklogo-152472-1.png", scale: "scale-[1.6]" },
                  { src: "/images/brands/anz-2-logo-png-transparent-1.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/ING_Group_N.V._Logo.svg-1.png", scale: "scale-100" },
                  { src: "/images/brands/St_George_Bank_logo-1-scaled.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/Bankwest_new_logo-1.png", scale: "scale-[1.3]" },
                  { src: "/images/brands/Suncorp-Bank-Logo-1-scaled.png", scale: "scale-[1.4]" },
                  { src: "/images/brands/images-3-1.png", scale: "scale-100" },
                  { src: "/images/brands/adelaide-bank-vector-logo-11574265916rvuvsw06fg-1.png", scale: "scale-[1.7]" },
                  { src: "/images/brands/firstmac-limited-logo-vector-1.png", scale: "scale-105" }
                ].map((brand, i) => (
                  <div key={i} className="relative h-10 w-[120px] shrink-0 mr-12 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105">
                    <div className={`relative h-full w-full ${brand.scale}`}>
                      <Image src={brand.src} alt="Lender Logo" fill className="object-contain" sizes="120px" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View all */}
            <div className="shrink-0 md:border-l border-slate-200 md:pl-5 md:ml-2 w-full md:w-auto text-center border-t md:border-t-0 pt-3 md:pt-0 z-10 bg-white">
              <Link href="#" className="text-[#2563EB] text-[12px] font-bold inline-flex items-center gap-1 hover:underline whitespace-nowrap">
                View all lenders <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Partnership Badges */}
          <div className="border-t border-slate-200/60 pt-6">
            <div className="text-center md:text-left mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#10A3EB]" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10A3EB]">Credibility & Accreditations</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "St.George Flame Broker", desc: "Top-tier lending privileges", color: "bg-red-500" },
                { title: "Westpac Platinum Broker", desc: "Elite priority channel", color: "bg-red-600" },
                { title: "CBA Elite Partner", desc: "Premium priority access", color: "bg-yellow-400" }
              ].map((badge, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center gap-3 p-3.5 rounded-xl border border-slate-100/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.02)]"
                >
                  <div className="relative shrink-0 flex items-center justify-center">
                    {idx === 0 ? (
                      <FlameIcon />
                    ) : (
                      <span className={`w-2.5 h-2.5 rounded-full ${badge.color}`} />
                    )}
                  </div>
                  <div className="flex flex-col text-center items-center">
                    <span className="text-[#0B1F3A] font-extrabold text-[12px] leading-snug">{badge.title}</span>
                    <span className="text-slate-400 text-[10px] font-medium leading-none mt-0.5">{badge.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
