"use client";

import React, { useState } from "react";
import { Shield, BookOpen, FileText, CheckCircle, Mail, Phone, Calendar } from "lucide-react";
import { SubPageHero } from "@/app/components/SubPageHero";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";

interface ClientPageProps {
  settings?: Record<string, string>;
  pageHeroSettings?: {
    h1_heading?: string;
    sub_heading?: string;
    hero_image?: string;
  };
}

export function ClientPage({ settings, pageHeroSettings }: ClientPageProps) {
  const h1Heading = pageHeroSettings?.h1_heading || "CREDIT GUIDE";
  const subHeading = pageHeroSettings?.sub_heading || "Learn about our licensing, credit obligations, and client support processes.";
  const heroImage = pageHeroSettings?.hero_image || "/images/hero.png";

  const [activeSection, setActiveSection] = useState("about");

  const sections = [
    { id: "about", label: "1. About Our License" },
    { id: "suitability", label: "2. Credit Suitability" },
    { id: "lenders", label: "3. Our Lender Panel" },
    { id: "commissions", label: "4. Commission Disclosures" },
    { id: "disputes", label: "5. Dispute Resolution" },
  ];

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} settings={settings} />
      <SubPageHero
        pageTitle="Credit Guide"
        themeColor="blue"
        layoutType="clean"
        pageHeroSettings={{
          hero_badge: "Credit Disclosures",
          hero_title: h1Heading,
          hero_subtext: subHeading,
          hero_image: heroImage,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Side Navigation Menu (Sticky) */}
          <aside className="hidden lg:block sticky top-28 bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <h3 className="text-[14px] font-bold text-[#0B1F3A] uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#10A3EB]" />
              Sections
            </h3>
            <nav className="flex flex-col gap-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleScrollTo(sec.id)}
                  className={`text-left text-[13px] font-bold py-2.5 px-3 rounded-lg transition-all ${
                    activeSection === sec.id
                      ? "bg-[#EAF3FF] text-[#2563EB]"
                      : "text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-50"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </nav>
            <div className="mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Last Updated: July 2026</span>
              </div>
            </div>
          </aside>

          {/* Policy Document Content */}
          <article className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.03)] space-y-10 text-[15px] sm:text-[16px] text-slate-650 leading-relaxed font-inter">
            {/* About Our License */}
            <section id="about" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">1</span>
                About Our License
              </h2>
              <div className="space-y-3">
                <p>
                  This Credit Guide provides important information about the credit services offered by <strong>Mortgage Xperts</strong>. Under the <em>National Consumer Credit Protection Act 2009 (NCCP Act)</em>, we are required to provide this guide to you before giving credit assistance.
                </p>
                <div className="bg-[#EAF3FF] border border-blue-100 rounded-2xl p-6 my-4 space-y-2 text-[14px] sm:text-[15px]">
                  <p className="font-bold text-[#0B1F3A]">Licence & Corporate Details:</p>
                  <ul className="space-y-1.5 text-slate-600">
                    <li><strong className="text-[#0B1F3A]">Entity Name:</strong> MUMA Groups Pty Ltd - ACN 668 612 468 trading as Mortgage Xperts</li>
                    <li><strong className="text-[#0B1F3A]">Australian Credit Licence (ACL) Number:</strong> 384704</li>
                    <li><strong className="text-[#0B1F3A]">Registered Address:</strong> 57 Anomia Road, JINDALEE, WA 6036</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Credit Suitability Assessment */}
            <section id="suitability" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">2</span>
                Credit Suitability Assessment
              </h2>
              <div className="space-y-3">
                <p>
                  Before recommending or assisting you with any credit contract, we have a legal obligation to conduct a credit assessment to ensure the loan is not unsuitable for you. A loan is deemed unsuitable if:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>You cannot meet the financial repayments, or can only meet them with substantial hardship.</li>
                  <li>The loan does not meet your personal requirements or financial objectives.</li>
                </ul>
                <p className="mt-3">
                  To complete this assessment, we will make reasonable inquiries regarding your financial situation, income, liabilities, expenses, and specific objectives, and take steps to verify this details.
                </p>
                <p className="mt-3 font-semibold text-[#0B1F3A]">
                  You may request a copy of this Credit Assessment at any time within 7 years of us providing credit assistance.
                </p>
              </div>
            </section>

            {/* Our Lender Panel */}
            <section id="lenders" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">3</span>
                Our Lender Panel
              </h2>
              <div className="space-y-3">
                <p>
                  We source credit products from a diverse panel of over <strong>40+ major banks and non-bank lenders</strong> to ensure you receive a competitive option tailored to your needs. This panel includes major institutions such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Australia and New Zealand Banking Group (ANZ)</li>
                  <li>Commonwealth Bank of Australia (CBA)</li>
                  <li>National Australia Bank (NAB)</li>
                  <li>Westpac Banking Corporation</li>
                  <li>ING, Macquarie Bank, St. George, Bankwest, Suncorp, and other leading lenders.</li>
                </ul>
                <p className="mt-3">
                  We are not tied to any single lender and act independently to evaluate which products align with your best interests.
                </p>
              </div>
            </section>

            {/* Commission Disclosures */}
            <section id="commissions" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">4</span>
                Commission Disclosures
              </h2>
              <div className="space-y-3">
                <p>
                  Our services are provided at no direct cost to you. Instead, we are paid a commission by the lender you choose when your loan settles.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Upfront Commission:</strong> A percentage of the total loan balance paid by the bank upon successful settlement.</li>
                  <li><strong>Trail Commission:</strong> An ongoing monthly fee paid by the lender based on your remaining loan balance for the life of the loan.</li>
                </ul>
                <p className="mt-3">
                  These commissions are paid by the lenders out of their own funds and do not increase the cost of your loan or your interest rate. Full details of the exact commission amounts will be disclosed to you in writing via a Credit Proposal Disclosure before you submit a loan application.
                </p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section id="disputes" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">5</span>
                Dispute Resolution
              </h2>
              <div className="space-y-3">
                <p>
                  We aim to provide premium services to all clients. However, if you are dissatisfied with our service or have a complaint, we have an Internal Dispute Resolution (IDR) process to resolve issues quickly.
                </p>
                <p>
                  Please submit complaints in writing to our Complaints Officer via <a href={`mailto:${settings?.support_email || "mortgage@mortgagexperts.com.au"}`} className="text-[#2563EB] hover:underline font-bold">{settings?.support_email || "mortgage@mortgagexperts.com.au"}</a>. We will acknowledge your complaint within 24 hours and investigate it fully.
                </p>
                <p className="mt-3">
                  If you are not satisfied with our response or if we fail to resolve it within 30 days, you can refer the matter to our independent External Dispute Resolution (EDR) scheme:
                </p>
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 mt-4 space-y-3 text-[14px]">
                  <p className="font-bold text-[#0B1F3A]">Australian Financial Complaints Authority (AFCA):</p>
                  <ul className="space-y-1 text-slate-600">
                    <li><strong>Phone:</strong> 1800 931 678</li>
                    <li><strong>Email:</strong> info@afca.org.au</li>
                    <li><strong>Website:</strong> <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline font-bold">www.afca.org.au</a></li>
                    <li><strong>Postal Address:</strong> GPO Box 3, Melbourne VIC 3001</li>
                  </ul>
                </div>
                <p className="text-[12px] text-slate-400 mt-4">
                  AFCA provides free, independent, and fair dispute resolution services for consumers.
                </p>
              </div>
            </section>
          </article>
        </div>
      </div>

      <SiteFooter settings={settings} />
    </div>
  );
}
