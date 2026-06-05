"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { 
  EASE_OUT, 
  VIEWPORT_LOOSE, 
  motionCardShadow,
  Stagger,
  StaggerItem
} from "@/lib/motion";

// Helper to hash initials avatar colors
const getAvatarStyle = (name: string) => {
  const char = name.trim().charAt(0).toUpperCase() || "G";
  const colors = [
    "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#FFC107", "#FF9800", "#FF5722", "#795548",
    "#607D8B"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  return {
    bg: colors[colorIndex],
    letter: char
  };
};

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
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

function GoogleReviewCard({ name, date, text, avatar }: { name: string; date: string; text: string; avatar?: string }) {
  const avatarInfo = getAvatarStyle(name);
  
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: motionCardShadow }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="w-[310px] sm:w-[360px] shrink-0 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mx-3 flex flex-col gap-3.5 text-left select-none"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {avatar && avatar.startsWith("http") ? (
            <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-inner select-none uppercase"
              style={{ backgroundColor: avatarInfo.bg }}
            >
              {avatarInfo.letter}
            </div>
          )}
          <div>
            <h4 className="text-[13.5px] font-bold text-[#0B1F3A] leading-tight">{name}</h4>
            <span className="text-[11px] text-slate-500 font-medium">{date}</span>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-[12.5px] text-slate-600 leading-relaxed italic">
        &ldquo;{text}&rdquo;
      </p>
    </motion.div>
  );
}

interface DBTestimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
  createdAt?: string;
}

interface TestimonialSectionProps {
  badgeText?: string;
  titleText?: React.ReactNode;
  subtitleText?: string;
  backgroundClass?: string;
}

export function TestimonialSection({
  badgeText = "Google Reviews",
  titleText = <>Loved By Hundreds of <span className="text-[#2563EB]">Happy Clients</span></>,
  subtitleText = "Don't just take our word for it. See what our clients have to say about their experience with Mortgage Xperts.",
  backgroundClass = "bg-slate-50"
}: TestimonialSectionProps) {
  const [dbReviews, setDbReviews] = useState<DBTestimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/admin/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setDbReviews(data);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic testimonials:", err);
      }
    }
    fetchTestimonials();
  }, []);

  const defaultReviews1 = [
    {
      name: "Sudeep P.",
      date: "Perth WA | Investment Portfolio",
      text: "I was looking to expand my property portfolio and buy my fourth investment property in Queensland, but the process felt complex. Aakash at Mortgage Xperts, a trusted Nepali mortgage broker in Australia, guided me through every step, helping me secure the best investment loan and save thousands in interest. His expert advice, professionalism, and personalised support made the process smooth and stress-free. I highly recommend Mortgage Xperts to any Nepali Australians looking to grow their property investments anywhere in Australia."
    },
    {
      name: "Manish Parajuli",
      date: "Wollert Melbourne | First Home & Investor",
      text: "Aakash, a best Nepali mortgage broker in Australia, and the team at Mortgage Xperts helped me refinance my investment property portfolio and saved me thousands in interest. Their expert knowledge of home loans, refinancing, and the Australian property market is outstanding. They go the extra mile to provide personalised guidance. If you’re a Nepali Australian looking for a broker who truly cares and delivers, look no further than Mortgage Xperts."
    },
    {
      name: "Amrita R.",
      date: "Sydney NSW | Successful Investor",
      text: "I wanted to expand my property portfolio, but navigating investment loans in Australia felt complicated. Aakash at Mortgage Xperts provided expert guidance on investment finance and helped me secure the best possible loan for my situation. Their personalised approach saved me thousands in interest, and I highly recommend Mortgage Xperts to any Nepali Australians investing in property across Australia."
    }
  ];

  const defaultReviews2 = [
    {
      name: "Reecha M.",
      date: "Baldivis, WA | First Home Buyer",
      text: "As a first-time home buyer, I was nervous about saving for a deposit - until I found Aakash at Mortgage Xperts, a trusted Nepali mortgage broker Australia-wide. With their expert guidance, I was able to secure a home loan with just a 5% deposit. The process was smooth, and I now have complete peace of mind. I highly recommend Mortgage Xperts to any Nepali Australian looking to buy a home anywhere in Australia."
    },
    {
      name: "Sandeep & Priya",
      date: "Ellenbrook | First Home Buyer | Guarantee Scheme",
      text: "We had some challenges with our credit history, so we weren’t sure how we could get a home loan. Aakash, a trusted Nepali mortgage broker at Mortgage Xperts, was incredibly helpful. He explained everything in simple terms, guided us through the process, and helped us get approved for our first home. We’re forever grateful and highly recommend Mortgage Xperts to any Nepali Australians looking for expert home loan guidance."
    }
  ];

  const parseDbDate = (createdAtStr?: string) => {
    if (!createdAtStr) return "Recent Review";
    try {
      const d = new Date(createdAtStr);
      return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return "Recent Review";
    }
  };

  const formattedReviews = dbReviews.map((r: DBTestimonial) => ({
    name: r.name,
    date: r.role || parseDbDate(r.createdAt),
    text: r.content,
    avatar: r.avatar
  }));

  const reviews1 = formattedReviews.length > 0 
    ? formattedReviews.filter((_, idx) => idx % 2 === 0) 
    : defaultReviews1;
  const reviews2 = formattedReviews.length > 0 
    ? formattedReviews.filter((_, idx) => idx % 2 !== 0) 
    : defaultReviews2;

  const row1 = [...reviews1, ...reviews1, ...reviews1];
  const row2 = [...reviews2, ...reviews2, ...reviews2];

  return (
    <section className={`py-16 md:py-20 overflow-hidden border-y border-slate-100 ${backgroundClass}`}>
      <Stagger className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-12 text-center flex flex-col items-center">
        <StaggerItem>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit mb-4 mx-auto select-none">
            <span className="text-[#2563EB] text-[10px] font-extrabold tracking-widest uppercase">
              {badgeText}
            </span>
          </div>
        </StaggerItem>
        
        <StaggerItem>
          <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-black leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            {titleText}
          </h2>
        </StaggerItem>
        
        <StaggerItem>
          <p className="text-slate-550 text-[14px] sm:text-[14.5px] max-w-2xl mx-auto leading-relaxed">
            {subtitleText}
          </p>
        </StaggerItem>
      </Stagger>

      {/* Marquee Row 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_LOOSE}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="flex overflow-hidden relative"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}
      >
        <div className="flex w-max animate-marquee hover:pause">
          {row1.map((rev, i) => (
            <GoogleReviewCard key={`r1-${i}`} {...rev} />
          ))}
        </div>
      </motion.div>

      {/* Marquee Row 2 (Reverse) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_LOOSE}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
        className="flex overflow-hidden relative mt-4"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}
      >
        <div className="flex w-max animate-marquee-reverse hover:pause">
          {row2.map((rev, i) => (
            <GoogleReviewCard key={`r2-${i}`} {...rev} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
