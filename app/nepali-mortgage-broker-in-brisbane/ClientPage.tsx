"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Shield, Target, Users, CheckCircle, MapPin, Mail, Phone, Clock } from "lucide-react";
import { SubPageHero } from "@/app/components/SubPageHero";
import { TestimonialSection } from "@/app/components/TestimonialSection";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";

interface ClientPageProps {
  settings?: Record<string, string>;
}

export function ClientPage({ settings }: ClientPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          message,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contact enquiry:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F0F4FA] min-h-screen font-sans flex flex-col">
      <SiteHeader isSticky={false} settings={settings} />
      <SubPageHero
        pageTitle="Why Use Mortgage Xperts?"
        themeColor="blue"
        layoutType="clean"
        pageHeroSettings={{
          hero_badge: "Nepali Mortgage Broker in Brisbane",
          hero_title: "Why Use Mortgage Xperts?",
          hero_subtext: "At Mortgage Xperts – Australia, we are committed to helping individuals and families secure the right home loan with confidence, clarity, and expert guidance.",
          hero_image: "/images/hero.png",
        }}
      />

      {/* SECTION 1: Who We Are */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-[600px] order-2 lg:order-1">
            <Image
              src="/images/first_home_family_modern.png"
              alt="Family looking at laptop"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000b1e]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center gap-4 mb-2">
                  <Shield className="w-8 h-8 text-[#2563EB]" />
                  <h3 className="text-[18px] font-bold text-[#0B1F3A]">Trusted Advice</h3>
                </div>
                <p className="text-[14px] text-slate-600">
                  We speak your language - both culturally and literally - making every step easier, clearer, and more comfortable.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200">
              <Users className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider">Our Difference</span>
            </div>
            
            <h2 
              className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
              style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
            >
              Why Hundreds of Families Choose Mortgage Xperts.
            </h2>
            
            <div className="space-y-5 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              <p>
                Navigating the Australian property market doesn't have to be overwhelming. As a premier Nepali mortgage broker, we bridge the gap between complex banking policies and your property dreams.
              </p>
              <p>
                We do not just find you a loan; we structure your finance for long-term success, ensuring you secure the best possible deal with zero stress and absolute clarity.
              </p>
              <p>
                From bilingual support to fierce negotiation with over 40+ major banks and specialist lenders, we ensure your financial interests always come first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: What We Do */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-[12px] font-bold text-amber-700 uppercase tracking-wider">Value Proposition</span>
              </div>
              
              <h2 
                className="text-[28px] sm:text-[36px] font-bold leading-tight text-[#0B1F3A]"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Zero Hidden Fees. Complete Transparency.
              </h2>
              
              <div className="space-y-5 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
                <div>
                  <strong className="text-[#0B1F3A] block mb-1">✔ Unbiased Advice</strong>
                  We work for you, not the lenders. We rigorously compare thousands of home loan products to present you with the top options for your specific scenario.
                </div>
                <div>
                  <strong className="text-[#0B1F3A] block mb-1">✔ 100% Free Service</strong>
                  Our comprehensive broker service is completely free to you. We are paid a fully disclosed commission by the lender you choose, meaning no out-of-pocket costs.
                </div>
                <div>
                  <strong className="text-[#0B1F3A] block mb-1">✔ Lifelong Partnership</strong>
                  Our job doesn't end at settlement. We proactively monitor your loan, offering regular rate reviews to ensure you are always on the most competitive deal.
                </div>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "No Hidden Charges.",
                  "Trusted & Experienced."
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="text-[14px] font-bold text-[#0B1F3A] leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-[700px]">
              <Image
                src="/images/mortgage_broker_handshake.png"
                alt="Happy couple looking at keys"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0B1F3A]/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Lenders Marquee */}
      <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-6">
          <h3 className="text-center text-[14px] font-bold text-slate-400 uppercase tracking-widest">
            Over 40+ Lending Partners
          </h3>
          <p className="text-center text-slate-500 text-sm mt-2">At Mortgage Experts, we will compare thousands of mortgages to find the right one for you</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center space-x-12 px-6 group-hover:pause">
            {[
              "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png",
              "/images/brands/westpac-logo-png_seeklogo-152472-1.png",
              "/images/brands/anz-2-logo-png-transparent-1.png",
              "/images/brands/ING_Group_N.V._Logo.svg-1.png",
              "/images/brands/png-transparent-nab-national-australia-bank-logo-thumbnail-1.png",
              "/images/brands/westpac-logo-png_seeklogo-152472-1.png",
              "/images/brands/anz-2-logo-png-transparent-1.png",
              "/images/brands/ING_Group_N.V._Logo.svg-1.png"
            ].map((src, i) => (
              <div key={i} className="relative w-[120px] h-[40px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all flex-shrink-0">
                <Image src={src} alt="Lender Logo" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proper Contact Section */}
      <section className="py-20 md:py-28 relative bg-[#F0F4FA] overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-blue-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-rose-200/30 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Company Details (Left) */}
            <div className="space-y-8">
              <div>
                <h2 
                  className="text-[32px] sm:text-[42px] font-bold leading-tight text-[#0B1F3A] mb-4"
                  style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
                >
                  Let’s Build Your Future Together
                </h2>
                <p className="text-[16px] sm:text-[18px] text-slate-600 leading-relaxed max-w-md">
                  At Mortgage Xperts – Australia, we’re not just brokers — we’re partners in your property journey. Your dream of owning a home in Australia is possible, and we’re here to make it happen. Contact us today for your free assessment.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B1F3A]">Head Office</h4>
                    <p className="text-[14px] text-slate-600 mt-1">{settings?.footer_address || "Level 20, 1 Market St, Sydney NSW 2000"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B1F3A]">Phone Number</h4>
                    <a href={`tel:${(settings?.header_phone || "0450 240 757").replace(/\s+/g, "")}`} className="text-[14px] text-slate-600 mt-1 hover:text-[#2563EB] transition-colors">
                      {settings?.header_phone || "0450 240 757"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B1F3A]">Email Address</h4>
                    <a href={`mailto:${settings?.support_email || "mortgage@mortgagexperts.com.au"}`} className="text-[14px] text-slate-600 mt-1 hover:text-[#2563EB] transition-colors break-all">
                      {settings?.support_email || "mortgage@mortgagexperts.com.au"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B1F3A]">Business Hours</h4>
                    <p className="text-[14px] text-slate-600 mt-1">Mon - Fri: 8:00 AM - 6:00 PM AEST<br/>Sat - Sun: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form (Right) */}
            <div className="w-full bg-white rounded-3xl shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-100 p-6 sm:p-10">
              <h3 className="text-[24px] font-bold text-[#0B1F3A] mb-6">Send us a message</h3>
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1F3A]">Enquiry Received!</h3>
                  <p className="text-slate-500 text-[15px] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. One of our expert brokers will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-slate-700">First Name</label>
                      <input 
                        type="text" 
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={submitting}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" 
                        placeholder="John" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-slate-700">Last Name</label>
                      <input 
                        type="text" 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={submitting}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={submitting}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-700">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={submitting}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px]" 
                      placeholder="0400 000 000" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-700">How can we help?</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={submitting}
                      className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[14px] resize-none" 
                      placeholder="Tell us about your property goals..." 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl font-bold text-[14px] transition-all shadow-md shadow-blue-200 mt-2 disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </div>
  );
}
