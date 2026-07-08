"use client";

import React, { useState } from "react";
import { Shield, Lock, FileText, CheckCircle, Mail, Phone, Calendar } from "lucide-react";
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
  const h1Heading = pageHeroSettings?.h1_heading || "TERMS & CONDITIONS";
  const subHeading = pageHeroSettings?.sub_heading || "Please read these terms and conditions carefully before using our services.";
  const heroImage = pageHeroSettings?.hero_image || "/images/hero.png";

  const [activeSection, setActiveSection] = useState("agreement");

  const sections = [
    { id: "agreement", label: "1. Agreement to Terms" },
    { id: "services", label: "2. Services Offered" },
    { id: "eligibility", label: "3. User Eligibility" },
    { id: "accuracy", label: "4. Information Accuracy" },
    { id: "intellectual-property", label: "5. Intellectual Property" },
    { id: "limitation-liability", label: "6. Limitation of Liability" },
    { id: "governing-law", label: "7. Governing Law" },
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
        pageTitle="Terms & Conditions"
        themeColor="blue"
        layoutType="clean"
        pageHeroSettings={{
          hero_badge: "Legal Terms",
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
              <FileText className="w-4 h-4 text-[#10A3EB]" />
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
            {/* Agreement to Terms */}
            <section id="agreement" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">1</span>
                Agreement to Terms
              </h2>
              <div className="space-y-3">
                <p>
                  Welcome to the website of <strong>Mortgage Xperts</strong>. By accessing or using this website, submitting enquiry forms, or utilizing any of our mortgage broking services, you agree to comply with and be bound by these Terms and Conditions.
                </p>
                <p>
                  If you do not agree to these terms, please do not use our website or services. We reserve the right to amend, change, or update these terms at any time without notice. Your continued use of the website following any changes constitutes acceptance of those changes.
                </p>
              </div>
            </section>

            {/* Services Offered */}
            <section id="services" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">2</span>
                Services Offered
              </h2>
              <div className="space-y-3">
                <p>
                  Mortgage Xperts provides credit assistance and mortgage broking services. We help clients find, compare, and apply for home loans, investment loans, commercial financing, and other credit products offered by our panel of third-party lenders.
                </p>
                <p>
                  Our services are subject to lender criteria. We do not guarantee that any lender will approve credit or issue a loan. Approval is subject to the lender's final assessment, valuation of security property, and formal offer of finance.
                </p>
              </div>
            </section>

            {/* User Eligibility */}
            <section id="eligibility" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">3</span>
                User Eligibility
              </h2>
              <div className="space-y-3">
                <p>
                  To use our mortgage broking services, you must:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Be at least 18 years of age.</li>
                  <li>Have the legal capacity to enter into binding agreements.</li>
                  <li>Provide complete and accurate information as requested during assessment.</li>
                </ul>
              </div>
            </section>

            {/* Information Accuracy */}
            <section id="accuracy" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">4</span>
                Information Accuracy
              </h2>
              <div className="space-y-3">
                <p>
                  You agree that all information you provide to us (such as income, liabilities, employment, and citizenship details) is true, complete, and correct. Under Australian credit law, providing false or misleading information is a serious offence and could result in rejection of applications or legal action by lenders.
                </p>
                <p>
                  While we strive to verify details, we rely on the information provided by you to perform assessments and matching.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual-property" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">5</span>
                Intellectual Property
              </h2>
              <div className="space-y-3">
                <p>
                  All content on this website, including text, graphics, logos, images, software, design systems, and calculators, is the property of Mortgage Xperts or its licensors and is protected by Australian and international copyright laws.
                </p>
                <p>
                  You may view and print content from this site for your personal, non-commercial use only. You must not copy, reproduce, republish, distribute, or modify any materials without our express written consent.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="limitation-liability" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">6</span>
                Limitation of Liability
              </h2>
              <div className="space-y-3">
                <p>
                  To the maximum extent permitted by law, Mortgage Xperts, its directors, employees, and agents are not liable for any direct, indirect, incidental, or consequential loss or damage arising out of your use of our website, tools (including borrowing calculators), or broker services.
                </p>
                <p>
                  Calculators and estimators provided on this site are for illustrative purposes and do not represent formal pre-approvals or binding offers. Actual borrowing capacities and interest rates vary.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section id="governing-law" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">7</span>
                Governing Law
              </h2>
              <div className="space-y-3">
                <p>
                  These Terms and Conditions are governed by and construed in accordance with the laws of New South Wales, Australia. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts of New South Wales.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-[14px] text-slate-500">
                  Should you have any questions or require clarification about these Terms, please contact us at <a href={`mailto:${settings?.support_email || "mortgage@mortgagexperts.com.au"}`} className="text-[#2563EB] hover:underline font-bold">{settings?.support_email || "mortgage@mortgagexperts.com.au"}</a>.
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      <SiteFooter settings={settings} />
    </div>
  );
}
