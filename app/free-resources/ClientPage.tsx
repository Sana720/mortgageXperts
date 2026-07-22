"use client";

import React from "react";
import Link from "next/link";
import { Download, FileText, ArrowRight, BookOpen, CheckCircle, Sparkles } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

interface ResourceItem {
  title: string;
  description: string;
  image: string;
  pdfUrl: string;
  detailsUrl: string;
  badge: string;
}

export function ClientPage({ settings = {}, initialResources = [] }: { settings?: Record<string, string>; initialResources?: ResourceItem[] }) {
  const resources: ResourceItem[] = initialResources.length > 0 ? initialResources : [
    {
      title: "First Home Buyers Checklist",
      description: "Your step-by-step roadmap to buying your first home in Australia, covering budget goals, deposit targets, pre-approval, and cooling-off guidelines.",
      image: "/images/first_home_guide_mockup.png",
      pdfUrl: "/assets/first-home-buyers-step-by-step-guide.pdf",
      detailsUrl: "/free-resources/first-home-buyers-step-by-step-guide",
      badge: "Checklist"
    },
    {
      title: "Home Buying Process Flowchart",
      description: "A complete visual timeline outlining contract clauses, conveyancing tasks, valuation steps, and what happens between unconditional approval and settlement day.",
      image: "/images/process_flowchart_mockup.png",
      pdfUrl: "/assets/step-by-step-home-buying-process.pdf",
      detailsUrl: "/free-resources/step-by-step-home-buying-process",
      badge: "Process Flowchart"
    },
    {
      title: "Refinance Repayment Savings Guide",
      description: "Review your home loan interest rates, calculate potential repayment savings, and understand exactly how to secure lower rates from Australian lenders.",
      image: "/images/refinance_guide_mockup.png",
      pdfUrl: "https://s3-ap-southeast-2.amazonaws.com/mortgagexperts/sample-report.pdf", // Mock PDF
      detailsUrl: "/refinancing-a-loan",
      badge: "Repayment Guide"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans antialiased text-slate-800" style={{ overflowX: "clip" }}>
      <SiteHeader isSticky={true} settings={settings} />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#0E2A4E] to-[#071629] text-white pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 border-blue-500/20 text-[#38BDF8]">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free Guides & Checklists
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white font-montserrat">
            Free Home Buying & Mortgage Resources
          </h1>
          <p className="text-slate-350 text-[14px] sm:text-[15.5px] leading-relaxed font-medium">
            Download our expert visual checklists, process flowcharts, and refinancing guides to simplify your property journey. <strong>No registration or contact forms required.</strong>
          </p>
        </div>
      </section>

      {/* Grid of Resources */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {resources.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
              
              {/* Image Mockup Preview */}
              <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain rounded-2xl group-hover:scale-[1.01] transition-transform duration-500"
                />
                <span className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-xs text-white text-[9.5px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow text-left justify-between">
                <div className="space-y-3">
                  <h3 className="text-[20px] font-extrabold text-[#0B1F3A] group-hover:text-[#2563EB] transition-colors leading-snug font-montserrat">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-8 space-y-3 shrink-0">
                  {/* Direct Download Button (No Form) */}
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-white bg-[#2563EB] hover:bg-[#1d4ed8] font-bold text-[13.5px] py-3.5 px-6 rounded-full w-full shadow-md shadow-blue-500/10 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download Free Guide
                  </a>

                  {/* Read Page Details */}
                  <Link
                    href={item.detailsUrl}
                    className="inline-flex items-center justify-center gap-1.5 text-slate-600 hover:text-[#2563EB] font-bold text-xs py-2 rounded-full w-full transition-colors"
                  >
                    <span>View Guide Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Speaks to Aakash Banner */}
      <section className="py-14 md:py-16 bg-[#0B1F3A] relative overflow-hidden text-center text-white">
        <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none bg-blue-500" />
        <div className="max-w-2xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold font-montserrat">Need a custom lending strategy?</h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
            Book a complimentary strategy call with Aakash KC to analyze your borrowing limits and design your pathway to approval.
          </p>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                // Trigger onboarding modal
                const btn = document.querySelector('[data-onboarding-trigger]');
                if (btn) (btn as HTMLButtonElement).click();
              }
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[14px] py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Schedule Free Consultation <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </div>
  );
}
