"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function RoadmapGuideCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setSubmitting(true);
    try {
      const payload = {
        type: "roadmap-guide",
        name,
        email,
        phone,
        message: "Requested guide: Your Roadmap to Smarter Mortgage Repayments"
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit guide request:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#e9f6fc] border border-[#bae4f5] rounded-3xl p-6 lg:p-10 w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Side: Text & Form */}
        <div className="lg:col-span-7 space-y-4">
          <div className="max-w-[600px]">
            <h2 className="text-[26px] md:text-[32px] font-extrabold text-[#2ba8df] leading-[1.2] tracking-tight">
              Your roadmap to smarter<br className="hidden md:block" /> mortgage repayments
            </h2>
            <p className="text-[#3a4f66] mt-3 text-[14px] md:text-[15px] leading-relaxed font-medium">
              Learn how to cut years off your mortgage and save thousands in interest with our simple repayment strategies.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white/80 rounded-2xl p-6 text-center border border-sky-100 max-w-[450px]">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Guide Sent!</h3>
              <p className="text-xs text-slate-600 mt-1.5">Check your email inbox for your roadmap guide.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-1 max-w-[420px]">
              <div className="space-y-1">
                <label className="block text-[12.5px] font-black text-slate-800">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2ba8df] focus:ring-1 focus:ring-[#2ba8df] transition-all shadow-sm"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-[12.5px] font-black text-slate-800">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2ba8df] focus:ring-1 focus:ring-[#2ba8df] transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[12.5px] font-black text-slate-800">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0400 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2ba8df] focus:ring-1 focus:ring-[#2ba8df] transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-[180px] bg-[#f27a22] hover:bg-[#d96817] text-white font-black text-[14px] py-3 px-5 rounded-full transition-all shadow-md mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Get the Guide"}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Image */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center pr-0 lg:pr-6">
          <div className="relative w-full max-w-[280px] aspect-[1/1.25] lg:-rotate-2 transition-transform duration-500 ease-in-out hover:rotate-0">
            {/* 
              Using the uploaded roadmap.png image
            */}
            <Image
              src="/images/roadmap.png"
              alt="Your Roadmap to Smarter Mortgage Repayments"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
