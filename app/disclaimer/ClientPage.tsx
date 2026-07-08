"use client";

import React, { useState } from "react";
import { Shield, AlertTriangle, FileText, CheckCircle, Mail, Phone, Calendar } from "lucide-react";
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
  const h1Heading = pageHeroSettings?.h1_heading || "DISCLAIMER";
  const subHeading = pageHeroSettings?.sub_heading || "Important information regarding the content, calculators, and advice on this website.";
  const heroImage = pageHeroSettings?.hero_image || "/images/hero.png";

  const [activeSection, setActiveSection] = useState("general-info");

  const sections = [
    { id: "general-info", label: "1. General Information Only" },
    { id: "calculators", label: "2. Calculator Accuracy" },
    { id: "third-party", label: "3. Third Party Links" },
    { id: "no-guarantees", label: "4. No Guarantees of Approval" },
    { id: "limitation", label: "5. Limitation of Liability" },
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
        pageTitle="Disclaimer"
        themeColor="blue"
        layoutType="clean"
        pageHeroSettings={{
          hero_badge: "Legal Disclaimer",
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
              <AlertTriangle className="w-4 h-4 text-[#10A3EB]" />
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
            {/* General Information Only */}
            <section id="general-info" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">1</span>
                General Information Only
              </h2>
              <div className="space-y-3">
                <p>
                  The information provided on the <strong>Mortgage Xperts</strong> website is of a general nature only. It has been prepared without taking into account your individual objectives, financial situation, or specific needs.
                </p>
                <p>
                  Content on this website does not constitute formal financial, investment, legal, or tax advice. Before making any decisions or acting on any information presented on this site, you should consult with a qualified professional (such as a licensed financial planner, solicitor, or accountant) to verify if it is suitable for your circumstances.
                </p>
              </div>
            </section>

            {/* Calculator Accuracy */}
            <section id="calculators" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">2</span>
                Calculator Accuracy
              </h2>
              <div className="space-y-3">
                <p>
                  All calculators, estimators, and tools available on this website (such as the Borrowing Power, Stamp Duty, and Repayment Calculators) are provided for illustrative purposes only. They are designed to give you a rough estimate and are not a representation, guarantee, or offer of finance from us or any lender.
                </p>
                <p>
                  Calculations are based on the interest rates, fees, parameters, and assumptions entered by you or preset as defaults. Actual borrowing capacities, repayments, and fees vary based on final lender assessment, credit scores, verification of documents, and prevailing interest rates.
                </p>
              </div>
            </section>

            {/* Third Party Links */}
            <section id="third-party" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">3</span>
                Third Party Links
              </h2>
              <div className="space-y-3">
                <p>
                  This website may contain links to external websites, services, or tools operated by third parties. These links are provided for your convenience only. We have no control over the content, security, accuracy, or privacy policies of external sites.
                </p>
                <p>
                  The inclusion of a link does not imply endorsement, sponsorship, or recommendation of the third party or their products. We accept no responsibility or liability for any losses or damages arising from your interaction with third-party sites.
                </p>
              </div>
            </section>

            {/* No Guarantees of Approval */}
            <section id="no-guarantees" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">4</span>
                No Guarantees of Approval
              </h2>
              <div className="space-y-3">
                <p>
                  Mortgage Xperts is a mortgage broker and does not issue credit. We assist you in matching with and applying for credit products. 
                </p>
                <p>
                  All applications are subject to final lender credit approval, property valuation, satisfying credit policies, and formal offer of finance. We make no guarantee that any application submitted will be approved by a bank or lender.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="limitation" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">5</span>
                Limitation of Liability
              </h2>
              <div className="space-y-3">
                <p>
                  While we make every effort to ensure the information on this website is accurate, current, and reliable, Mortgage Xperts does not warrant or guarantee the completeness or accuracy of any information.
                </p>
                <p>
                  To the extent permitted by law, Mortgage Xperts and its employees exclude all liability for any loss, damage, or expense (including direct, indirect, special, or consequential loss) incurred by any person relying on the information or tools provided on this website.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-[14px] text-slate-500">
                  Should you have any questions or require clarification about this disclaimer, please contact us at <a href={`mailto:${settings?.support_email || "mortgage@mortgagexperts.com.au"}`} className="text-[#2563EB] hover:underline font-bold">{settings?.support_email || "mortgage@mortgagexperts.com.au"}</a>.
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
