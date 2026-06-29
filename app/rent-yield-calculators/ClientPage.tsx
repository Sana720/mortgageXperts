"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  User,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  CheckCircle2,
  HelpCircle,
  Percent,
  Home,
  Printer
} from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SubPageHero } from "../components/SubPageHero";
import { RoadmapGuideCard } from "../components/RoadmapGuideCard";
import { TestimonialSection } from "../components/TestimonialSection";
import { EASE_OUT } from "@/lib/motion";

export interface PageHeroSettings {
  hero_badge?: string;
  hero_title?: string;
  hero_subtext?: string;
  hero_image?: string;
  hero_btn1_text?: string;
  hero_btn1_link?: string;
  hero_btn2_text?: string;
  hero_btn2_link?: string;
}

export default function ClientPage({ settings = {}, pageHeroSettings, pageContent }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string }) {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Inputs
  const [purchasePrice, setPurchasePrice] = useState<number>(500000);
  const [weeklyRent, setWeeklyRent] = useState<number>(450);

  // Expense Mode: 'simple' | 'detailed'
  const [expenseMode, setExpenseMode] = useState<'simple' | 'detailed'>('simple');
  const [simpleExpenses, setSimpleExpenses] = useState<number>(5000);

  // Detailed Expenses
  const [councilRates, setCouncilRates] = useState<number>(1500);
  const [waterRates, setWaterRates] = useState<number>(800);
  const [strataLevies, setStrataLevies] = useState<number>(2000);
  const [managementFees, setManagementFees] = useState<number>(1800);
  const [insurance, setInsurance] = useState<number>(1200);
  const [maintenance, setMaintenance] = useState<number>(1000);
  const [otherExpenses, setOtherExpenses] = useState<number>(500);

  // Step 2: Lead capture
  const [calcLeadName, setCalcLeadName] = useState("");
  const [calcLeadEmail, setCalcLeadEmail] = useState("");
  const [calcLeadPhone, setCalcLeadPhone] = useState("");
  const [calcLeadSubmitting, setCalcLeadSubmitting] = useState(false);

  // Guide request
  const [guideName, setGuideName] = useState("");
  const [guideEmail, setGuideEmail] = useState("");
  const [guidePhone, setGuidePhone] = useState("");
  const [guideSubmitting, setGuideSubmitting] = useState(false);
  const [guideSubmitted, setGuideSubmitted] = useState(false);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // General Enquiry States
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryMsg, setEnquiryMsg] = useState("");
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Calculations Engine
  const results = useMemo(() => {
    const annualRent = weeklyRent * 52;

    const annualExpenses = expenseMode === 'simple'
      ? simpleExpenses
      : (councilRates + waterRates + strataLevies + managementFees + insurance + maintenance + otherExpenses);

    const grossYield = purchasePrice > 0 ? (annualRent / purchasePrice) * 100 : 0;
    const netYield = purchasePrice > 0 ? ((annualRent - annualExpenses) / purchasePrice) * 100 : 0;
    const netCashflow = annualRent - annualExpenses;

    return {
      annualRent,
      annualExpenses,
      grossYield,
      netYield,
      netCashflow
    };
  }, [purchasePrice, weeklyRent, expenseMode, simpleExpenses, councilRates, waterRates, strataLevies, managementFees, insurance, maintenance, otherExpenses]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "rent-yield-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Rental Yield Calculator. Purchase Price: $${purchasePrice}, Weekly Rent: $${weeklyRent}, Expenses Mode: ${expenseMode}, Annual Expenses: $${results.annualExpenses}, Gross Yield: ${results.grossYield.toFixed(2)}%, Net Yield: ${results.netYield.toFixed(2)}%`
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Failed to submit lead:", error);
    } finally {
      setCalcLeadSubmitting(false);
    }
  };

  // Guide request handler
  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideName || !guideEmail || !guidePhone) return;

    setGuideSubmitting(true);
    try {
      const payload = {
        type: "rent-yield-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: "Requested guide: Rental Yield & Investment Guide"
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setGuideSubmitted(true);
    } catch (error) {
      console.error("Failed to submit guide request:", error);
    } finally {
      setGuideSubmitting(false);
    }
  };

  // General enquiry handler
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail || !enquiryPhone) return;

    setEnquirySubmitting(true);
    try {
      const payload = {
        type: "rent-yield-callback",
        name: enquiryName,
        email: enquiryEmail,
        phone: enquiryPhone,
        message: enquiryMsg
      };

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setEnquirySubmitted(true);
    } catch (error) {
      console.error("Failed to submit callback enquiry:", error);
    } finally {
      setEnquirySubmitting(false);
    }
  };

  // PDF downloader
  const downloadReportPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("printable-report-area");
      if (!element) return;

      element.style.setProperty("display", "block", "important");
      element.style.setProperty("position", "absolute", "important");
      element.style.setProperty("left", "0px", "important");
      element.style.setProperty("top", "-9999px", "important");
      element.style.setProperty("width", "800px", "important");
      element.style.setProperty("background-color", "#FFFFFF", "important");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF"
      });

      element.style.removeProperty("display");
      element.style.removeProperty("position");
      element.style.removeProperty("left");
      element.style.removeProperty("top");
      element.style.removeProperty("width");
      element.style.removeProperty("background-color");

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const width = pdfWidth - margin * 2;
      const ratio = canvas.width > 0 ? canvas.height / canvas.width : 1.414;
      const height = width * ratio;

      pdf.addImage(imgData, "JPEG", margin, margin, width, height);
      pdf.save(`Mortgage_Xperts_Rental_Yield_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const defaultHeroSettings = {
    hero_badge: "Property Investment Planner",
    hero_title: "Rental Yield Calculator",
    hero_subtext: "Calculate your property's gross and net rental yield to assess its investment performance. Make informed buying and portfolio decisions with ease.",
    hero_image: "/images/hero.png",
    hero_btn1_text: "Start Calculator",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to an Expert",
    hero_btn2_link: "#enquiry-form"
  };

  const faqs = [
    {
      q: "What is rental yield and why is it important for property investors?",
      a: "Rental yield measures the annual return on investment generated by a property's rental income, expressed as a percentage of the property value. It helps investors compare different properties, assess their cash flow potential, and determine whether a property will be positive or negative cash flow."
    },
    {
      q: "What is the difference between Gross Rental Yield and Net Rental Yield?",
      a: "Gross rental yield calculates your returns before any expenses are deducted. Net rental yield takes into account all ongoing property expenses (such as rates, water, strata, landlord insurance, property management fees, and maintenance) to show your true annual return."
    },
    {
      q: "What is considered a 'good' rental yield in Australia?",
      a: "Generally, a rental yield between 4% and 6% is considered good for residential properties in metropolitan areas. Yields can be lower in premium suburbs with high capital growth potential (e.g., 2% to 3.5%) and higher in regional towns or mining centers (e.g., 7% to 10%+), which often carry different risk profiles."
    },
    {
      q: "What expenses should I include in the net rental yield calculation?",
      a: "You should include council rates, water rates, body corporate/strata levies, property management fees (usually 6% to 9% of rent), landlord insurance, building insurance, expected repairs/maintenance (typically 1% of property value per year), and land tax if applicable."
    },
    {
      q: "Does rental yield include mortgage interest payments?",
      a: "No, standard net rental yield calculations do not include interest repayments because financing costs vary greatly from investor to investor based on deposit size, interest rates, and loan structures. To calculate your actual net cash flow after mortgage costs, you would subtract your annual interest payments from your net rental income."
    }
  ];

  // Maximum value for yield chart scaling (usually 10% is a good upper bound, or the actual gross yield + 2)
  const maxChartYield = Math.max(10, results.grossYield + 2);

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero
        pageTitle="Rent Yield Calculator"
        themeColor="teal"
        pageHeroSettings={pageHeroSettings || defaultHeroSettings}
      />

      {/* MAIN CALCULATOR SECTION */}
      <section id="calculator-tool" className="py-12 lg:py-24 bg-white relative scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print order-2 lg:order-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-800 bg-teal-50 border border-teal-100/60 px-3.5 py-1.5 rounded-full w-fit block shadow-sm font-bold">
                Calculations & Insights
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Maximise Your Yield & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Understand Your Rental Returns</span>
              </h2>
              <div className="w-12 h-[3px] bg-teal-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium">
                {pageContent || "Rental yield is a key metric used by smart property investors to evaluate the cash flow performance of real estate. Use this calculator to compare gross and net yields for any Australian property."}
              </p>

              <div className="space-y-4 pt-4">
                {/* Point 1 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-teal-50/50 to-emerald-50/10 hover:from-teal-50 hover:to-emerald-50/30 border border-teal-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200/40 shadow-sm">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Gross Rental Yield</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Calculates simple cash flow yield based on total rent before any deductions or expenses.</p>
                  </div>
                </motion.div>

                {/* Point 2 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/10 hover:from-blue-50 hover:to-indigo-50/30 border border-blue-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/40 shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Net Yield Breakdown</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Deducts annual property expenses to display your true, bottom-line rate of return.</p>
                  </div>
                </motion.div>

                {/* Point 3 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/10 hover:from-indigo-50 hover:to-purple-50/30 border border-indigo-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200/40 shadow-sm">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Investment Comparison</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Enables quick comparison between different prospective properties for optimal asset selection.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form */}
            <div className="lg:col-span-6 flex justify-end no-print order-1 lg:order-2">
              <div className="w-full max-w-[520px] bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[530px] transition-all duration-300 relative overflow-hidden">
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full opacity-50 pointer-events-none" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-teal-600 transition-all duration-500" 
                    style={{ width: `${(currentStep / 2) * 100}%` }}
                  />
                </div>

                {/* STEP 1: Inputs */}
                {currentStep === 1 && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="purchase-price">Property Purchase Price ($)</label>
                        <span className="text-teal-700 font-black text-[13px]">${purchasePrice.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="purchase-price"
                          value={purchasePrice}
                          onChange={(e) => setPurchasePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="weekly-rent">Weekly Rental Income ($)</label>
                        <span className="text-teal-700 font-black text-[13px]">${weeklyRent.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="weekly-rent"
                          value={weeklyRent}
                          onChange={(e) => setWeeklyRent(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                        />
                      </div>
                    </div>

                    {/* Expense tabs */}
                    <div className="space-y-2 pt-1">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label>Expenses Assessment</label>
                        <span className="text-teal-700 font-black text-[13px]">
                          ${results.annualExpenses.toLocaleString()} / year
                        </span>
                      </div>

                      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setExpenseMode('simple')}
                          className={`py-1.5 text-xs font-bold rounded-lg transition-all ${expenseMode === 'simple' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          Simple Total
                        </button>
                        <button
                          type="button"
                          onClick={() => setExpenseMode('detailed')}
                          className={`py-1.5 text-xs font-bold rounded-lg transition-all ${expenseMode === 'detailed' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          Detailed Items
                        </button>
                      </div>

                      {expenseMode === 'simple' ? (
                        <div className="space-y-1 relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                          <input
                            type="number"
                            placeholder="Annual Expenses"
                            value={simpleExpenses}
                            onChange={(e) => setSimpleExpenses(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-2.5 text-[13px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-teal-500 transition-all"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto p-1 border border-slate-150 rounded-xl bg-white/50">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Council Rates ($/yr)</label>
                            <input
                              type="number"
                              value={councilRates}
                              onChange={(e) => setCouncilRates(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#0B1F3A] focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Water Rates ($/yr)</label>
                            <input
                              type="number"
                              value={waterRates}
                              onChange={(e) => setWaterRates(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#0B1F3A] focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Strata Levies ($/yr)</label>
                            <input
                              type="number"
                              value={strataLevies}
                              onChange={(e) => setStrataLevies(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#0B1F3A] focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Management Fee ($/yr)</label>
                            <input
                              type="number"
                              value={managementFees}
                              onChange={(e) => setManagementFees(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#0B1F3A] focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Insurance ($/yr)</label>
                            <input
                              type="number"
                              value={insurance}
                              onChange={(e) => setInsurance(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#0B1F3A] focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Maintenance ($/yr)</label>
                            <input
                              type="number"
                              value={maintenance}
                              onChange={(e) => setMaintenance(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#0B1F3A] focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Other Expenses ($/yr)</label>
                            <input
                              type="number"
                              value={otherExpenses}
                              onChange={(e) => setOtherExpenses(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-full bg-white border border-slate-200 shadow-sm rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#0B1F3A] focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Note: Step 2 Lead form merged below */}

                {/* STEP 2: Results Display */}
                {currentStep === 2 && (
                  <div className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-teal-800">Gross Rental Yield</span>
                        <div className="text-2xl sm:text-3xl font-black mt-1 text-teal-600">
                          {results.grossYield.toFixed(2)}%
                        </div>
                        <p className="text-[9.5px] text-slate-400 mt-1 font-bold">Annual Rent: ${results.annualRent.toLocaleString()}</p>
                      </div>

                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Net Rental Yield</span>
                        <div className="text-2xl sm:text-3xl font-black mt-1 text-emerald-600">
                          {results.netYield.toFixed(2)}%
                        </div>
                        <p className="text-[9.5px] text-slate-400 mt-1 font-bold">Net Cashflow: ${results.netCashflow.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Comparative Yield Bar Chart */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Yield Comparison Chart</h4>
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {/* Gross Yield Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Gross Rental Yield</span>
                            <span>{results.grossYield.toFixed(2)}%</span>
                          </div>
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (results.grossYield / maxChartYield) * 100)}%` }}
                              transition={{ duration: 0.8, ease: EASE_OUT }}
                              className="h-full bg-teal-600 rounded-full"
                            />
                          </div>
                        </div>

                        {/* Net Yield Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Net Rental Yield</span>
                            <span>{results.netYield.toFixed(2)}%</span>
                          </div>
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (results.netYield / maxChartYield) * 100)}%` }}
                              transition={{ duration: 0.8, ease: EASE_OUT }}
                              className="h-full bg-emerald-600 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Optional Lead Form for full report */}
                    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3 mt-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">📄 Get Full PDF Report — Enter Details</p>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleLeadSubmit(e);
                      }} className="space-y-2">
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={calcLeadName}
                          onChange={(e) => setCalcLeadName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-teal-500"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="email"
                            required
                            placeholder="Email"
                            value={calcLeadEmail}
                            onChange={(e) => setCalcLeadEmail(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-teal-500"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Phone"
                            value={calcLeadPhone}
                            onChange={(e) => setCalcLeadPhone(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={calcLeadSubmitting}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[12px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-500/10 transition-colors"
                        >
                          {calcLeadSubmitting ? "Generating..." : "Download Full Report"} <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer w-1/2"
                      >
                        <Printer className="w-4 h-4 shrink-0" />
                        <span>Print Report</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep(1);
                          setCalcLeadName("");
                          setCalcLeadEmail("");
                          setCalcLeadPhone("");
                        }}
                        className="border border-teal-600 text-teal-700 bg-white hover:bg-teal-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer w-1/2"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                )}

                {/* BOTTOM BUTTON BAR FOR STEP 1 */}
                {currentStep < 2 && (
                  <div className="flex justify-between items-center gap-3 border-t border-slate-100 pt-4 mt-4">
                    {currentStep === 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-500/10 transition-colors ml-auto"
                      >
                        Calculate Yield <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GUIDE DOWNLOAD CARD */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <RoadmapGuideCard />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-800 bg-teal-50 border border-teal-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Questions</span>
            </h2>
            <p className="text-slate-500 text-[12.5px] font-medium mt-2">
              Everything you need to know about calculating and understanding rental yields.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-6 py-4.5 text-left font-bold text-slate-800 text-[13.5px] sm:text-[14.5px] hover:bg-slate-50/50 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <HelpCircle className={`w-4 h-4 shrink-0 transition-transform ${openFaqIndex === idx ? "rotate-180 text-teal-600" : "text-slate-400"}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed border-t border-slate-100/80">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection
        badgeText="Google Reviews"
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Happy Property Investors</span></>}
        backgroundClass="bg-white"
      />

      {/* ENQUIRY CALLBACK FORM */}
      <section id="enquiry-form" className="py-16 lg:py-24 bg-[#0B1F3A] text-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/25 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Callback Service
              </span>
              <h2 className="text-white text-[28px] sm:text-[38px] lg:text-[45px] font-black leading-tight font-montserrat">
                Need Professional Advice on <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Investment Loans?</span>
              </h2>
              <div className="w-12 h-[3px] bg-teal-500 rounded-full" />
              <p className="text-slate-300 text-[14px] leading-relaxed max-w-xl">
                Structuring an investment loan requires careful planning of borrowing limits, interest-only terms, and offset accounts. Submit a callback request and one of our bilingual mortgage experts will guide you to secure the best loan strategy.
              </p>
              
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-350">Direct Consultation Hotline</h4>
                  <p className="text-sm font-black text-white mt-0.5">0450 240 757</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 text-slate-800">
              {enquirySubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black font-montserrat text-[#0B1F3A]">Callback Request Received</h3>
                  <p className="text-xs text-slate-505 leading-relaxed max-w-xs mx-auto">
                    Thank you. We have received your property investment loan enquiry and will contact you within one business hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="enq-name" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block">Your Full Name*</label>
                    <input
                      type="text"
                      id="enq-name"
                      required
                      placeholder="Jane Smith"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="enq-email" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block">Email Address*</label>
                      <input
                        type="email"
                        id="enq-email"
                        required
                        placeholder="jane@example.com"
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="enq-phone" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block">Mobile Number*</label>
                      <input
                        type="tel"
                        id="enq-phone"
                        required
                        placeholder=""
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="enq-msg" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block">Message / Scenario Details</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your investment targets..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
                  >
                    {enquirySubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hidden printable report area */}
      <div id="printable-report-area" className="p-8 font-inter text-slate-800 bg-white hidden" style={{ width: "800px" }}>
        <div className="flex justify-between items-center border-b-2 border-teal-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Investment Loan Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-teal-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              Rental Yield Report
            </span>
            <p className="text-[10px] text-slate-400 font-bold">Generated on {new Date().toLocaleDateString("en-AU")}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-6 bg-teal-50/20 border border-teal-100 rounded-2xl p-6 text-center">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Rental Yield</h2>
            <div className="text-4xl font-black text-teal-600 mt-1">
              {results.grossYield.toFixed(2)}%
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-1">Annual Rental Income: ${results.annualRent.toLocaleString()}</p>
          </div>

          <div className="col-span-6 bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 text-center">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Net Rental Yield</h2>
            <div className="text-4xl font-black text-emerald-600 mt-1">
              {results.netYield.toFixed(2)}%
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-1">Annual Net Cashflow: ${results.netCashflow.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Property Details</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-500">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2 flex justify-between">
                  <td>Property Purchase Price:</td>
                  <td className="text-[#0B1F3A]">${purchasePrice.toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Weekly Rental Income:</td>
                  <td className="text-[#0B1F3A]">${weeklyRent.toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Gross Annual Rental Income:</td>
                  <td className="text-[#0B1F3A]">${results.annualRent.toLocaleString()}</td>
                </tr>
                <tr className="py-2 flex justify-between">
                  <td>Total Annual Expenses:</td>
                  <td className="text-[#0B1F3A]">${results.annualExpenses.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-6 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Expenses Breakdown</h3>
            {expenseMode === 'simple' ? (
              <table className="w-full text-[11.5px] font-bold text-slate-500">
                <tbody>
                  <tr className="py-2 flex justify-between">
                    <td>Estimated Annual Expenses (Simple):</td>
                    <td className="text-[#0B1F3A]">${simpleExpenses.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="w-full text-[11.5px] font-bold text-slate-500">
                <tbody className="divide-y divide-slate-100">
                  <tr className="py-2 flex justify-between">
                    <td>Council Rates:</td>
                    <td className="text-[#0B1F3A]">${councilRates.toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Water Rates:</td>
                    <td className="text-[#0B1F3A]">${waterRates.toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Strata Body Corporate:</td>
                    <td className="text-[#0B1F3A]">${strataLevies.toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Management Fee:</td>
                    <td className="text-[#0B1F3A]">${managementFees.toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Landlord &amp; Building Insurance:</td>
                    <td className="text-[#0B1F3A]">${insurance.toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Estimated Maintenance:</td>
                    <td className="text-[#0B1F3A]">${maintenance.toLocaleString()}</td>
                  </tr>
                  <tr className="py-2 flex justify-between">
                    <td>Other Expenses:</td>
                    <td className="text-[#0B1F3A]">${otherExpenses.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 text-[10px] text-slate-500 leading-relaxed">
          <p className="font-bold mb-1 uppercase tracking-wider text-[#0B1F3A]">Disclaimer &amp; Important Notice:</p>
          This Rental Yield Report is an estimation only and is based on information provided by the user. True rental income and operating expenses may fluctuate due to market conditions, vacancy rates, tenant performance, and changes in management or council fees. Mortgage interest costs, tax deductions, and depreciation benefits are not factored into these figures. Contact Mortgage Xperts for professional investment borrowing and structuring advice.
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter settings={settings} />
    </div>
  );
}
