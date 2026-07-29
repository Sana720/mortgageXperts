"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useOnboardingModal } from "./OnboardingModalContext";

interface MarketOverviewSectionProps {
  city: string;
  state: string;
  accentColor?: string;
  accentLight?: string;
}

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

export function MarketOverviewSection({
  city = "Adelaide",
  state = "South Australia",
  accentColor = "#2563EB",
  accentLight = "#EFF6FF",
}: MarketOverviewSectionProps) {
  const { openModal } = useOnboardingModal();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Location Badge */}
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full inline-block border bg-white shadow-sm"
              style={{
                color: "#0B1F3A",
                borderColor: "#CBD5E1",
              }}
            >
              Home Loan {city}
            </span>

            {/* Main Heading */}
            <h2 className="text-[#0B1F3A] text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-[1.15] tracking-tight">
              Navigating the {city} <br />
              <span style={{ color: accentColor }}>Home Loan Market</span>
            </h2>

            {/* Paragraph Content */}
            <div className="space-y-5 text-slate-600 text-[15px] sm:text-[15.5px] leading-relaxed pt-2">
              <p>
                Securing property in {state} demands a tailored approach to finance. Elements such as your borrowing limits, upfront savings, career type, and ongoing lifestyle costs heavily influence the specific interest rates and lending policies available to your household.
              </p>
              <p>
                Mortgage Xperts delivers specialized mortgage strategies for first-time buyers, seasoned investors, residential upgraders, self-employed business owners, and healthcare professionals throughout {city} and regional {state}. Instead of restricting your choices to a single bank&apos;s rigid lending guidelines, our {city} team unlocks competitive financing options by analyzing products across a diverse network of more than 40 premier Australian banks and non-bank lenders.
              </p>
              <p>
                We pay close attention to industry-specific benefits, such as maximizing complex shift or overtime incomes and securing Lenders Mortgage Insurance (LMI) waivers for eligible medical and corporate professionals. Whether your goal is to purchase an existing family home in {city}&apos;s outer corridors, optimize your cash flow through refinancing, acquire a strategic investment unit, or fund a brand-new house and land package, our expert advisors manage the entire lending process from your very first consultation until the keys are in your hand at settlement.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Exact Uploaded Graphic Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="lg:col-span-5 flex justify-center"
          >
            <div
              onClick={openModal}
              className="relative w-full max-w-[480px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
            >
              <Image
                src="/images/planning_to_buy_card.jpg"
                alt={`Planning to buy your next home? Start with clarity - Mortgage Xperts ${city}`}
                width={1024}
                height={1024}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
