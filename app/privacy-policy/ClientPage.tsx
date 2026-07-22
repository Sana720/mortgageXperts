"use client";

import React, { useState } from "react";
import { Shield, Lock, Eye, FileText, CheckCircle, Mail, Phone, Calendar } from "lucide-react";
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
  const h1Heading = pageHeroSettings?.h1_heading || "PRIVACY POLICY";
  const subHeading = pageHeroSettings?.sub_heading || "How we collect, manage, and protect your personal information.";
  const heroImage = pageHeroSettings?.hero_image || "/images/hero.png";

  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "1. Introduction" },
    { id: "collection", label: "2. Information We Collect" },
    { id: "use-of-info", label: "3. How We Use Information" },
    { id: "disclosure", label: "4. Disclosure of Information" },
    { id: "security", label: "5. Security & Storage" },
    { id: "access", label: "6. Access & Correction" },
    { id: "complaints", label: "7. Complaints & Contact" },
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
        pageTitle="Privacy Policy"
        themeColor="blue"
        layoutType="clean"
        pageHeroSettings={{
          hero_badge: "Privacy & Data Protection",
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
              <Shield className="w-4 h-4 text-[#10A3EB]" />
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
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>SSL Encrypted Data</span>
              </div>
            </div>
          </aside>

          {/* Policy Document Content */}
          <article className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.03)] space-y-10 text-[15px] sm:text-[16px] text-slate-650 leading-relaxed font-inter">
            {/* Introduction */}
            <section id="introduction" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">1</span>
                Introduction
              </h2>
              <div className="space-y-3">
                <p>
                  At <strong>Mortgage Xperts</strong> (referred to as "we", "us", or "our"), your privacy is our top priority. We are committed to protecting and maintaining the privacy of your personal and financial information in accordance with the <em>Australian Privacy Principles</em> (APPs) established under the <em>Privacy Act 1988 (Cth)</em>.
                </p>
                <p>
                  This Privacy Policy details how we collect, hold, use, and disclose personal information when you utilize our website, speak with our mortgage brokers, or apply for credit products. By engaging with our services, you consent to the collection and use of your information as described in this policy.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section id="collection" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">2</span>
                Information We Collect
              </h2>
              <div className="space-y-3">
                <p>
                  To assist you in securing a home loan or financial product, we collect personal and financial information essential for assessing your creditworthiness and submitting applications to lenders. This information includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Identity Details:</strong> Full name, date of birth, gender, nationality, and contact details (address, phone number, email).</li>
                  <li><strong>Government Identifiers:</strong> Driver's licence, passport, Medicare details, and tax file numbers (where required).</li>
                  <li><strong>Financial Information:</strong> Income details, employment history, tax returns, bank statements, asset portfolios, debts, expenses, and credit history.</li>
                  <li><strong>Credit-Related Info:</strong> Credit scores, current loans, repayment histories, and default records.</li>
                  <li><strong>Digital Data:</strong> IP addresses, browser types, and cookies collected during your visits to our website.</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section id="use-of-info" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">3</span>
                How We Use Information
              </h2>
              <div className="space-y-3">
                <p>
                  We collect, hold, and use your personal information to provide you with mortgage broking and financial advisory services. Specifically, we use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Verify your identity and run preliminary credit assessments.</li>
                  <li>Identify loan products from our panel of 40+ lenders that suit your goals.</li>
                  <li>Assist in preparing and submitting credit applications to selected banks or lenders.</li>
                  <li>Manage our relationship with you, including resolving queries or requests.</li>
                  <li>Comply with regulatory obligations under the <em>National Consumer Credit Protection Act 2009 (Cth)</em> and anti-money laundering laws.</li>
                  <li>Send you market insights, newsletters, or promotional information (you can opt-out at any time).</li>
                </ul>
              </div>
            </section>

            {/* Disclosure of Information */}
            <section id="disclosure" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">4</span>
                Disclosure of Information
              </h2>
              <div className="space-y-3">
                <p>
                  To provide our services, we may need to share your personal information with third parties. We will only disclose your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Lenders, banks, and financial institutions to secure loan approvals.</li>
                  <li>Credit reporting agencies (CRAs) to retrieve your credit score.</li>
                  <li>Aggregators and broker groups associated with Mortgage Xperts.</li>
                  <li>Professional advisers (such as accountants, solicitors, or conveyancers) as instructed by you.</li>
                  <li>Government authorities, law enforcement bodies, or dispute resolution schemes where required by law.</li>
                </ul>
                <p className="mt-3">
                  We take reasonable steps to ensure that any third-party recipient protects your privacy and handles your data securely.
                </p>
              </div>
            </section>

            {/* Security & Storage */}
            <section id="security" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">5</span>
                Security & Storage
              </h2>
              <div className="space-y-3">
                <p>
                  Your information is stored in secure physical filing systems and protected electronic databases. We employ advanced administrative, physical, and technological security controls to safeguard your data from misuse, loss, unauthorized access, or modification.
                </p>
                <p>
                  These measures include multi-factor authentication, SSL encryption, firewalls, secure file hosting platforms, and restricting data access only to authorized personnel. When your personal information is no longer required, we securely destroy or de-identify it.
                </p>
              </div>
            </section>

            {/* Access & Correction */}
            <section id="access" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">6</span>
                Access & Correction
              </h2>
              <div className="space-y-3">
                <p>
                  You have the right to request access to the personal information we hold about you. You can also request corrections if you believe the information is inaccurate, out of date, or incomplete.
                </p>
                <p>
                  We will process your request promptly. In some circumstances, legal or administrative reasons may prevent us from providing access (e.g. if access would violate the privacy of others). If that occurs, we will provide you with a written explanation.
                </p>
              </div>
            </section>

            {/* Complaints & Contact */}
            <section id="complaints" className="space-y-4">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B1F3A] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-[14px] font-bold shrink-0">7</span>
                Complaints & Contact
              </h2>
              <div className="space-y-3">
                <p>
                  If you have any questions about this Privacy Policy, wish to update your details, or want to make a complaint regarding a breach of the Australian Privacy Principles, please contact our Privacy Officer:
                </p>
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 font-bold uppercase">Email Address</div>
                      <a href={`mailto:${settings?.support_email || "mortgage@mortgagexperts.com.au"}`} className="text-[14px] font-extrabold text-[#2563EB] hover:underline">
                        {settings?.support_email || "mortgage@mortgagexperts.com.au"}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 font-bold uppercase">Phone Number</div>
                      <a href={`tel:${(settings?.header_phone || "0450240757").replace(/\s+/g, "")}`} className="text-[14px] font-extrabold text-[#2563EB] hover:underline">
                        {settings?.header_phone || "0450 240 757"}
                      </a>
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  We will investigate your complaint and respond in writing within 30 days. If you are not satisfied with our resolution, you can lodge a complaint with the <em>Office of the Australian Information Commissioner</em> (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline font-bold">www.oaic.gov.au</a>.
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
