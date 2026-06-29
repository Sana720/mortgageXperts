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
  HelpCircle,
  Coins,
  Scale,
  Printer,
  CheckCircle2
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

export default function ClientPage({
  settings = {},
  pageHeroSettings,
  defaultState = "ACT",
  pageContent
}: {
  settings?: Record<string, string>;
  pageHeroSettings?: PageHeroSettings;
  defaultState?: string;
  pageContent?: string;
}) {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Inputs
  const [stateCode, setStateCode] = useState<string>(defaultState);
  const [propertyValue, setPropertyValue] = useState<number>(500000);
  const [propertyType, setPropertyType] = useState<"owner" | "investment">("owner");
  const [propertyStatus, setPropertyStatus] = useState<"established" | "new">("established");
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState<boolean>(false);
  const [totalIncome, setTotalIncome] = useState<number>(120000);
  const [dependentsCount, setDependentsCount] = useState<number>(0);
  const [isPensioner, setIsPensioner] = useState<boolean>(false);

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
    const P = propertyValue;
    const isInvestment = propertyType === "investment";
    let baseDuty = 0;
    let firstHomeIncomeThreshold = 0;
    let firstHomeConcession = 0;
    let pensionerConcession = 0;
    let mortgageRegistrationFee = 0;
    let transferFee = 0;
    let fhog = 0;

    if (stateCode === "NSW") {
      // NSW Standard Transfer Duty Calculation 2025/2026
      if (P <= 17000) {
        baseDuty = Math.max(20, P * 0.0125);
      } else if (P <= 37000) {
        baseDuty = 212 + Math.ceil((P - 17000) / 100) * 1.5;
      } else if (P <= 99000) {
        baseDuty = 512 + Math.ceil((P - 37000) / 100) * 1.75;
      } else if (P <= 372000) {
        baseDuty = 1597 + Math.ceil((P - 99000) / 100) * 3.5;
      } else if (P <= 1240000) {
        baseDuty = 11152 + Math.ceil((P - 372000) / 100) * 4.5;
      } else if (P <= 3721000) {
        baseDuty = 50212 + Math.ceil((P - 1240000) / 100) * 5.5;
      } else {
        baseDuty = 186667 + Math.ceil((P - 3721000) / 100) * 7.0;
      }

      baseDuty = Math.ceil(baseDuty);

      // NSW First Home Buyers Assistance Scheme (FHBAS)
      if (isFirstHomeBuyer && !isInvestment) {
        if (P <= 800000) {
          firstHomeConcession = baseDuty;
        } else if (P <= 1000000) {
          firstHomeConcession = baseDuty * (1 - (P - 800000) / 200000);
        }
      }

      // NSW First Home Owner Grant (New Home Only)
      if (isFirstHomeBuyer && propertyStatus === "new" && P <= 600000) {
        fhog = 10000;
      }

      mortgageRegistrationFee = 175.70;
      transferFee = 175.70;

    } else if (stateCode === "VIC") {
      // Victoria Standard / PPR Rates 2025/2026
      if (isInvestment || P > 550000) {
        if (P <= 25000) baseDuty = P * 0.014;
        else if (P <= 130000) baseDuty = 350 + (P - 25000) * 0.024;
        else if (P <= 960000) baseDuty = 2870 + (P - 130000) * 0.06;
        else if (P <= 2000000) baseDuty = P * 0.055;
        else baseDuty = 110000 + (P - 2000000) * 0.065;
      } else {
        // PPR Rate
        if (P <= 25000) baseDuty = P * 0.014;
        else if (P <= 130000) baseDuty = 350 + (P - 25000) * 0.024;
        else if (P <= 440000) baseDuty = 2870 + (P - 130000) * 0.05;
        else baseDuty = 18370 + (P - 440000) * 0.06;
      }

      baseDuty = Math.ceil(baseDuty);

      // VIC First Home Buyer Concession
      if (isFirstHomeBuyer && !isInvestment) {
        if (P <= 600000) {
          firstHomeConcession = baseDuty;
        } else if (P <= 750000) {
          firstHomeConcession = baseDuty * ((750000 - P) / 150000);
        }
      }

      // VIC First Home Owner Grant
      if (isFirstHomeBuyer && propertyStatus === "new" && P <= 750000) {
        fhog = 10000;
      }

      mortgageRegistrationFee = 130.00;
      transferFee = 130.00;

    } else if (stateCode === "QLD") {
      // Queensland Transfer Duty Rates (Effective Post-May 2025 Reforms)
      if (isInvestment) {
        if (P <= 5000) baseDuty = 0;
        else if (P <= 75000) baseDuty = (P - 5000) * 0.015;
        else if (P <= 540000) baseDuty = 1050 + (P - 75000) * 0.035;
        else if (P <= 1000000) baseDuty = 17325 + (P - 540000) * 0.045;
        else baseDuty = 38025 + (P - 1000000) * 0.0575;
      } else {
        // Home concession
        if (P <= 350000) baseDuty = P * 0.01;
        else if (P <= 540000) baseDuty = 3500 + (P - 350000) * 0.035;
        else if (P <= 1000000) baseDuty = 10150 + (P - 540000) * 0.045;
        else baseDuty = 30850 + (P - 1000000) * 0.0575;
      }

      baseDuty = Math.ceil(baseDuty);

      // QLD First Home Concession
      if (isFirstHomeBuyer && !isInvestment) {
        if (propertyStatus === "new") {
          // Full exemption for new homes with no cap
          firstHomeConcession = baseDuty;
        } else {
          // Established home
          if (P <= 700000) {
            firstHomeConcession = baseDuty;
          } else if (P < 800000) {
            firstHomeConcession = ((800000 - P) / 100000) * 17350;
          }
        }
      }

      // QLD First Home Owner Grant
      if (isFirstHomeBuyer && propertyStatus === "new" && P <= 750000) {
        fhog = 30000;
      }

      mortgageRegistrationFee = 224.00;
      transferFee = 224.00;

    } else if (stateCode === "WA") {
      // WA Standard Rates (Updated May 2026 Caps)
      if (P <= 120000) baseDuty = P * 0.019;
      else if (P <= 150000) baseDuty = 2280 + (P - 120000) * 0.0285;
      else if (P <= 360000) baseDuty = 3135 + (P - 150000) * 0.038;
      else if (P <= 725000) baseDuty = 11115 + (P - 360000) * 0.0475;
      else baseDuty = 28453 + (P - 725000) * 0.0515;

      baseDuty = Math.ceil(baseDuty);

      // WA First Home Owner Rate of duty
      if (isFirstHomeBuyer && !isInvestment) {
        let fhorDuty = baseDuty;
        if (P <= 600000) {
          fhorDuty = 0;
        } else if (P <= 800000) {
          fhorDuty = Math.ceil((P - 600000) / 100) * 13.63;
        }
        firstHomeConcession = Math.max(0, baseDuty - fhorDuty);
      }

      // WA First Home Owner Grant
      if (isFirstHomeBuyer && propertyStatus === "new" && P <= 800000) {
        fhog = 10000;
      }

      mortgageRegistrationFee = 203.00;
      transferFee = 203.00;

    } else if (stateCode === "SA") {
      // SA Stamp Duty Scale
      if (P <= 12000) baseDuty = P * 0.01;
      else if (P <= 30000) baseDuty = 120 + (P - 12000) * 0.02;
      else if (P <= 50000) baseDuty = 480 + (P - 30000) * 0.03;
      else if (P <= 100000) baseDuty = 1080 + (P - 50000) * 0.035;
      else if (P <= 200000) baseDuty = 2830 + (P - 100000) * 0.04;
      else if (P <= 250000) baseDuty = 6830 + (P - 200000) * 0.0425;
      else if (P <= 300000) baseDuty = 8955 + (P - 250000) * 0.0475;
      else if (P <= 500000) baseDuty = 11330 + (P - 300000) * 0.05;
      else baseDuty = 21330 + (P - 500000) * 0.055;

      baseDuty = Math.ceil(baseDuty);

      // SA First Home Buyer Concession (New Homes Only, No Price Cap)
      if (isFirstHomeBuyer && !isInvestment && propertyStatus === "new") {
        firstHomeConcession = baseDuty;
      }

      // SA First Home Owner Grant
      if (isFirstHomeBuyer && propertyStatus === "new" && P <= 650000) {
        fhog = 15000;
      }

      mortgageRegistrationFee = 187.00;
      transferFee = 400.00;

    } else if (stateCode === "TAS") {
      // Tasmania Conveyance Rates
      if (P <= 3000) baseDuty = 50;
      else if (P <= 25000) baseDuty = 50 + (P - 3000) * 0.0175;
      else if (P <= 75000) baseDuty = 435 + (P - 25000) * 0.0225;
      else if (P <= 200000) baseDuty = 1560 + (P - 75000) * 0.035;
      else if (P <= 375000) baseDuty = 5935 + (P - 200000) * 0.04;
      else if (P <= 725000) baseDuty = 12935 + (P - 375000) * 0.0425;
      else baseDuty = 27810 + (P - 725000) * 0.045;

      baseDuty = Math.ceil(baseDuty);

      // TAS First Home Buyer Concession (Established Homes up to $750k)
      if (isFirstHomeBuyer && !isInvestment && propertyStatus === "established" && P <= 750000) {
        firstHomeConcession = baseDuty;
      }

      // TAS First Home Owner Grant
      if (isFirstHomeBuyer && propertyStatus === "new" && P <= 750000) {
        fhog = 10000;
      }

      mortgageRegistrationFee = 163.00;
      transferFee = 240.00;

    } else if (stateCode === "NT") {
      // Northern Territory Formula Scale
      if (P <= 525000) {
        const V = P / 1000;
        baseDuty = (0.06571441 * V * V) + 15 * V;
      } else if (P <= 3000000) {
        baseDuty = P * 0.0495;
      } else if (P <= 5000000) {
        baseDuty = P * 0.0575;
      } else {
        baseDuty = P * 0.0595;
      }

      baseDuty = Math.ceil(baseDuty);

      // NT FHB Concession (House & Land single contract / new builds)
      if (isFirstHomeBuyer && !isInvestment && propertyStatus === "new") {
        firstHomeConcession = baseDuty;
      }

      // NT HomeGrown Territory Grant
      if (isFirstHomeBuyer && propertyStatus === "new") {
        fhog = 50000;
      }

      mortgageRegistrationFee = 165.00;
      transferFee = 165.00;

    } else {
      // Standard ACT Stamp Duty Calculation
      if (isInvestment) {
        if (P <= 200000) {
          baseDuty = P * 0.012;
        } else if (P <= 260000) {
          baseDuty = 2400 + (P - 200000) * 0.022;
        } else {
          if (P <= 300000) {
            baseDuty = 728 + (P - 260000) * 0.022;
          } else if (P <= 500000) {
            baseDuty = 1608 + (P - 300000) * 0.034;
          } else if (P <= 750000) {
            baseDuty = 8408 + (P - 500000) * 0.0432;
          } else if (P <= 1000000) {
            baseDuty = 19208 + (P - 750000) * 0.059;
          } else if (P <= 1455000) {
            baseDuty = 33958 + (P - 1000000) * 0.064;
          } else {
            baseDuty = 66057 + (P - 1455000) * 0.0454;
          }
          baseDuty += 2992;
        }
      } else {
        // Owner Occupier
        if (P <= 260000) {
          baseDuty = P * 0.0028;
        } else if (P <= 300000) {
          baseDuty = 728 + (P - 260000) * 0.022;
        } else if (P <= 500000) {
          baseDuty = 1608 + (P - 300000) * 0.034;
        } else if (P <= 750000) {
          baseDuty = 8408 + (P - 500000) * 0.0432;
        } else if (P <= 1000000) {
          baseDuty = 19208 + (P - 750000) * 0.059;
        } else if (P <= 1455000) {
          baseDuty = 33958 + (P - 1000000) * 0.064;
        } else {
          baseDuty = 66057 + (P - 1455000) * 0.0454;
        }
      }

      baseDuty = Math.ceil(baseDuty);

      // ACT First Home Buyer Concession
      const capKids = Math.min(5, dependentsCount);
      firstHomeIncomeThreshold = 250000 + capKids * 4600;

      if (isFirstHomeBuyer && !isInvestment && totalIncome <= firstHomeIncomeThreshold) {
        firstHomeConcession = baseDuty;
      }

      // ACT Pensioner Concession
      if (isPensioner && !isInvestment) {
        if (P <= 1000000) {
          pensionerConcession = baseDuty;
        } else {
          pensionerConcession = Math.min(baseDuty, 35238);
        }
      }

      mortgageRegistrationFee = 178.00;
      transferFee = 479.00;
      fhog = 0.00;
    }

    const selectedConcession = Math.max(firstHomeConcession, pensionerConcession);
    const finalStampDuty = Math.max(0, baseDuty - selectedConcession);
    const totalFees = finalStampDuty + mortgageRegistrationFee + transferFee;

    return {
      baseDuty,
      firstHomeIncomeThreshold,
      firstHomeConcession,
      pensionerConcession,
      selectedConcession,
      finalStampDuty,
      mortgageRegistrationFee,
      transferFee,
      fhog,
      totalFees
    };
  }, [propertyValue, propertyType, propertyStatus, isFirstHomeBuyer, totalIncome, dependentsCount, isPensioner, stateCode]);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadEmail || !calcLeadPhone) return;

    setCalcLeadSubmitting(true);
    try {
      const payload = {
        type: "stamp-duty-calculator",
        name: calcLeadName,
        email: calcLeadEmail,
        phone: calcLeadPhone,
        message: `Stamp Duty Calculator. State: ${stateCode}, Property Value: $${propertyValue}, Property Type: ${propertyType}, First Home Buyer: ${isFirstHomeBuyer ? "Yes" : "No"}, Pensioner Concession: ${isPensioner ? "Yes" : "No"}, Base Duty: $${results.baseDuty}, Discount Applied: $${results.selectedConcession}, Final Stamp Duty: $${results.finalStampDuty}, Total Fees: $${results.totalFees}`
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
        type: "stamp-duty-guide",
        name: guideName,
        email: guideEmail,
        phone: guidePhone,
        message: `Requested guide: Stamp Duty Concessions & Fees Guide (${stateCode})`
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
        type: "stamp-duty-callback",
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
      pdf.save(`Mortgage_Xperts_Stamp_Duty_Report_${new Date().toLocaleDateString("en-AU").replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const faqs = [
    {
      q: "How much deposit do I need to buy my first home?",
      a: "Typically, you’ll need between 5% and 20% of the property’s purchase price as a deposit. Many lenders prefer a 20% deposit to avoid extra costs like Lenders Mortgage Insurance (LMI), but some government assistance programs allow you to buy with as little as 5%. These schemes are designed to help first-home buyers enter the property market sooner by reducing upfront costs."
    },
    {
      q: "What is Lenders Mortgage Insurance (LMI)?",
      a: "Lenders Mortgage Insurance (LMI) is a one-off insurance policy that protects the lender if you borrow more than 80% of the property’s value and then default on the loan. It doesn’t protect you, the borrower, but rather reduces the lender’s risk. LMI costs vary depending on the size of the loan and deposit. Some government programs can help eligible buyers avoid paying LMI, so it’s worth checking if you qualify."
    },
    {
      q: "What government assistance is available for first-home buyers?",
      a: "There are a range of grants, special schemes, and stamp duty concessions available depending on your state or territory. These programs can significantly reduce the upfront costs of buying a home. We can help you understand which assistance you might qualify for, guide you through the application process, and ensure you get the maximum benefit available to you."
    },
    {
      q: "Do I need pre-approval before buying?",
      a: "Pre-approval is highly recommended because it shows sellers you’re a serious buyer and helps you understand your borrowing capacity before you start shopping for a property. It speeds up the buying process once you find a home you want to purchase, as the lender has already assessed your financial situation."
    },
    {
      q: "Can I buy with a partner or family member?",
      a: "Yes, buying jointly with a partner or family member can increase your borrowing power and make it easier to afford a property. However, it’s important to have clear agreements about ownership shares, financial responsibilities, and what happens if one party wants to sell or leaves the arrangement. Consulting a legal professional before purchasing together is a good idea."
    }
  ];

  const defaultHeroSettings = {
    hero_badge: "Government Fees Modeler",
    hero_title: `${stateCode} Stamp Duty Calculator`,
    hero_subtext: (() => {
      if (stateCode === "ACT") return "Model purchasing fees, registration duties, transfer costs, and government concessions. Check if you qualify for the 100% First Home Buyer concession in ACT.";
      if (stateCode === "NSW") return "Model transfer duty fees, registration costs, and grants in New South Wales. Check if you qualify for the FHBAS exemption up to $800,000.";
      if (stateCode === "VIC") return "Model Victorian land transfer duty, mortgage registration costs, and concessions. Check if you qualify for the exemption up to $600,000.";
      if (stateCode === "QLD") return "Model Queensland transfer duty, transfer fees, and concessions. Check if you qualify for the first home concession up to $700,000.";
      if (stateCode === "WA") return "Model Western Australia transfer duty, mortgage fees, and FHOR concessions. Check if you qualify for the exemption up to $600,000.";
      if (stateCode === "SA") return "Model South Australian conveyance duty, transfer fees, and concessions. Check if you qualify for the 100% new home exemption.";
      if (stateCode === "TAS") return "Model Tasmanian property transfer duty, registration fees, and concessions. Check if you qualify for the established home exemption up to $750,000.";
      if (stateCode === "NT") return "Model Northern Territory stamp duty, registration fees, and HomeGrown grants. Check if you qualify for the new build exemption.";
      return "Model purchasing fees, registration duties, transfer costs, and government concessions.";
    })(),
    hero_image: "/images/hero.png",
    hero_btn1_text: "Start Calculations",
    hero_btn1_link: "#calculator-tool",
    hero_btn2_text: "Talk to a Broker",
    hero_btn2_link: "#enquiry-form"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter select-none" style={{ overflowX: "clip" }}>
      {/* HEADER */}
      <SiteHeader isSticky={true} settings={settings} />

      {/* HERO SECTION */}
      <SubPageHero
        pageTitle={`${stateCode} Stamp Duty Calculator`}
        themeColor="orange"
        pageHeroSettings={pageHeroSettings || defaultHeroSettings}
      />

      {/* MAIN CALCULATOR SECTION */}
      <section id="calculator-tool" className="py-12 lg:py-24 bg-white relative scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context / Content */}
            <div className="lg:col-span-6 space-y-6 no-print order-2 lg:order-1">
              <span className="text-xs font-extrabold tracking-wider uppercase text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100/50 w-fit">
                Exemptions & Scale Rates
              </span>
              <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.1] font-montserrat">
                Plan Your Property Purchase & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Exemptions in {stateCode}</span>
              </h2>
              <div className="w-12 h-[3px] bg-orange-600 rounded-full" />
              <p className="text-slate-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-xl font-medium font-inter">
                {pageContent || `Stamp duty (transfer duty tax) on ${stateCode} properties is calculated on standard government brackets. Concessions exist to help first home buyers purchase homes with up to 100% discounts on transfer duty.`}
              </p>

              <div className="space-y-4 pt-4">
                {/* Point 1 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-orange-50/50 to-amber-50/10 hover:from-orange-50 hover:to-amber-50/30 border border-orange-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/40 shadow-sm">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">{stateCode} Concessions Checked</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                      {stateCode === "ACT" && "Automatically models combined buyer income limits and dependents to check for full first home exemptions."}
                      {stateCode === "NSW" && "Automatically models the NSW First Home Buyers Assistance Scheme (FHBAS) concessions and exemptions."}
                      {stateCode === "VIC" && "Automatically models Victorian First Home Buyer duty exemptions and concessions."}
                      {stateCode === "QLD" && "Automatically models the Queensland First Home Concessions with zero-duty exemptions."}
                      {stateCode === "WA" && "Automatically models the Western Australia First Home Owner Rate of duty concessions."}
                      {stateCode === "SA" && "Automatically models the South Australian stamp duty relief for new home purchases."}
                      {stateCode === "TAS" && "Automatically models the Tasmanian first home buyer stamp duty exemptions."}
                      {stateCode === "NT" && "Automatically models the Northern Territory HomeGrown grants and transfer duty exemptions."}
                    </p>
                  </div>
                </motion.div>

                {/* Point 2 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/10 hover:from-blue-50 hover:to-indigo-50/30 border border-blue-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/40 shadow-sm">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">Transfer & Registration Fees</h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                      {stateCode === "ACT" && "Includes flat ACT transfer fees ($479.00) and mortgage registration fees ($178.00) for a precise total."}
                      {stateCode === "NSW" && "Includes flat NSW transfer fees ($175.70) and mortgage registration fees ($175.70) for a precise total."}
                      {stateCode === "VIC" && "Includes Victorian transfer fees and mortgage registration fees ($130.00 each) for a precise total."}
                      {stateCode === "QLD" && "Includes Queensland transfer fees and mortgage registration fees ($224.00 each) for a precise total."}
                      {stateCode === "WA" && "Includes WA transfer fees and mortgage registration fees ($203.00 each) for a precise total."}
                      {stateCode === "SA" && "Includes SA transfer fees ($400.00) and mortgage registration fees ($187.00) for a precise total."}
                      {stateCode === "TAS" && "Includes Tasmanian transfer fees ($240.00) and mortgage registration fees ($163.00) for a precise total."}
                      {stateCode === "NT" && "Includes NT transfer fees ($165.00) and mortgage registration fees ($165.00) for a precise total."}
                    </p>
                  </div>
                </motion.div>

                {/* Point 3 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 items-start p-4 bg-gradient-to-br from-orange-50/20 to-amber-50/10 hover:from-orange-50 border border-orange-100/40 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/40 shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-black text-[#0B1F3A] font-montserrat">
                      {stateCode === "ACT" ? "Pensioner Concessions Included" : "First Home Owner Grant (FHOG)"}
                    </h4>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                      {stateCode === "ACT" && "Applies flat pensioner discounts or full exemptions for eligible properties up to $1,000,000+."}
                      {stateCode === "NSW" && "Checks if you are eligible for the $10,000 NSW first home buyer grant for new properties under $600,000."}
                      {stateCode === "VIC" && "Checks if you are eligible for the $10,000 Victorian first home buyer grant for new properties under $750,000."}
                      {stateCode === "QLD" && "Checks if you are eligible for the $30,000 Queensland first home owner grant for new properties under $750,000."}
                      {stateCode === "WA" && "Checks if you are eligible for the $10,000 WA first home owner grant for new properties under $800,000."}
                      {stateCode === "SA" && "Checks if you are eligible for the $15,000 SA first home buyer grant for new properties under $650,005."}
                      {stateCode === "TAS" && "Checks if you are eligible for the $10,000 Tasmanian first home buyer grant for new properties under $750,000."}
                      {stateCode === "NT" && "Checks if you are eligible for the $50,055 NT HomeGrown Territory Grant for new properties."}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Wizard Form */}
            <div className="lg:col-span-6 flex justify-end no-print order-1 lg:order-2">
              <div className="w-full max-w-[530px] bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[540px] transition-all duration-300 relative overflow-hidden">
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full opacity-50 pointer-events-none" />

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1 mb-4">
                  <div 
                    className="h-full bg-orange-600 transition-all duration-500" 
                    style={{ width: `${(currentStep / 2) * 100}%` }}
                  />
                </div>

                {/* STEP 1: Inputs */}
                {currentStep === 1 && (
                  <div className="space-y-4 py-2">
                    {/* State selection */}
                    <div className="space-y-2">
                      <label htmlFor="state-select" className="text-[11px] font-bold text-slate-700 block">State / Territory</label>
                      <select
                        id="state-select"
                        value={stateCode}
                        onChange={(e) => {
                          const val = e.target.value;
                          setStateCode(val);
                          if (val !== "ACT") {
                            setIsPensioner(false);
                          }
                        }}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer"
                      >
                        <option value="ACT">ACT (Australian Capital Territory)</option>
                        <option value="NSW">NSW (New South Wales)</option>
                        <option value="VIC">VIC (Victoria)</option>
                        <option value="QLD">QLD (Queensland)</option>
                        <option value="WA">WA (Western Australia)</option>
                        <option value="SA">SA (South Australia)</option>
                        <option value="TAS">TAS (Tasmania)</option>
                        <option value="NT">NT (Northern Territory)</option>
                      </select>
                    </div>

                    {/* Property Value */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                        <label htmlFor="property-value">Property Value ($)</label>
                        <span className="text-orange-700 font-black text-[13px]">${propertyValue.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm select-none pointer-events-none">$</div>
                        <input
                          type="number"
                          id="property-value"
                          value={propertyValue}
                          onChange={(e) => setPropertyValue(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl pl-8 pr-4 py-3 text-[13.5px] font-extrabold text-[#0B1F3A] focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all"
                        />
                      </div>
                    </div>

                    {/* Property Type (Owner/Investment) */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-700 block">Property Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPropertyType("owner")}
                          className={`py-3 px-4 text-xs font-black rounded-2xl border transition-all cursor-pointer ${propertyType === "owner" ? "bg-orange-50 border-orange-500/50 text-orange-700 shadow-sm" : "bg-slate-50/50 border-slate-200 text-slate-500 hover:text-slate-800"}`}
                        >
                          Owner Occupied
                        </button>
                        <button
                          type="button"
                          onClick={() => setPropertyType("investment")}
                          className={`py-3 px-4 text-xs font-black rounded-2xl border transition-all cursor-pointer ${propertyType === "investment" ? "bg-orange-50 border-orange-500/50 text-orange-700 shadow-sm" : "bg-slate-50/50 border-slate-200 text-slate-500 hover:text-slate-800"}`}
                        >
                          Investment
                        </button>
                      </div>
                    </div>

                    {/* Property Status (Established vs New) */}
                    {stateCode !== "ACT" && (
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-700 block">Property Status</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPropertyStatus("established")}
                            className={`py-3 px-4 text-xs font-black rounded-2xl border transition-all cursor-pointer ${propertyStatus === "established" ? "bg-orange-50 border-orange-500/50 text-orange-700 shadow-sm" : "bg-slate-50/50 border-slate-200 text-slate-500 hover:text-slate-800"}`}
                          >
                            Established Home
                          </button>
                          <button
                            type="button"
                            onClick={() => setPropertyStatus("new")}
                            className={`py-3 px-4 text-xs font-black rounded-2xl border transition-all cursor-pointer ${propertyStatus === "new" ? "bg-orange-50 border-orange-500/50 text-orange-700 shadow-sm" : "bg-slate-50/50 border-slate-200 text-slate-500 hover:text-slate-800"}`}
                          >
                            New Home
                          </button>
                        </div>
                      </div>
                    )}

                    {/* First Home Buyer toggle & Subfields */}
                    <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-slate-700">Are you a First Home Buyer?</span>
                        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => {
                              setIsFirstHomeBuyer(true);
                              setIsPensioner(false); // Can't be both for concessions
                            }}
                            className={`px-3 py-1 text-[11px] font-black rounded-md cursor-pointer ${isFirstHomeBuyer ? "bg-white text-orange-700 shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsFirstHomeBuyer(false)}
                            className={`px-3 py-1 text-[11px] font-black rounded-md cursor-pointer ${!isFirstHomeBuyer ? "bg-white text-orange-700 shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {isFirstHomeBuyer && propertyType === "owner" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-3 pt-2.5 border-t border-slate-200/50"
                        >
                          {stateCode === "ACT" && (
                            <>
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-slate-600">
                                  <label htmlFor="total-income">Combined Purchaser Annual Income ($)</label>
                                  <span className="text-orange-700 font-extrabold">${totalIncome.toLocaleString()}</span>
                                </div>
                                <input
                                  type="number"
                                  id="total-income"
                                  value={totalIncome}
                                  onChange={(e) => setTotalIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[12.5px] font-bold focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label htmlFor="kids-select" className="text-[10px] font-bold text-slate-600 block">Number of Dependent Children</label>
                                <select
                                  id="kids-select"
                                  value={dependentsCount}
                                  onChange={(e) => setDependentsCount(parseInt(e.target.value))}
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[12.5px] font-bold focus:outline-none cursor-pointer"
                                >
                                  <option value={0}>0 Dependents (Income limit: $250,000)</option>
                                  <option value={1}>1 Dependent (Income limit: $254,600)</option>
                                  <option value={2}>2 Dependents (Income limit: $259,200)</option>
                                  <option value={3}>3 Dependents (Income limit: $263,800)</option>
                                  <option value={4}>4 Dependents (Income limit: $268,400)</option>
                                  <option value={5}>5+ Dependents (Income limit: $273,000)</option>
                                </select>
                              </div>
                            </>
                          )}
                          {stateCode === "NSW" && (
                            <div className="text-[11px] text-slate-500 font-bold bg-white/50 border border-slate-200/50 p-3 rounded-xl leading-relaxed">
                              Under NSW FHBAS, eligible first home buyers pay <strong className="text-orange-700">$0 stamp duty</strong> on properties up to $800,000, and a sliding concessional rate up to $1,000,000.
                            </div>
                          )}
                          {stateCode === "VIC" && (
                            <div className="text-[11px] text-slate-500 font-bold bg-white/50 border border-slate-200/50 p-3 rounded-xl leading-relaxed">
                              In Victoria, first home buyers pay <strong className="text-orange-700">$0 stamp duty</strong> on properties up to $600,000, and a sliding concessional rate up to $750,000.
                            </div>
                          )}
                          {stateCode === "QLD" && (
                            <div className="text-[11px] text-slate-500 font-bold bg-white/50 border border-slate-200/50 p-3 rounded-xl leading-relaxed">
                              {propertyStatus === "new" ? (
                                <span>In Queensland, first home buyers purchasing a new build receive a <strong className="text-orange-700">full stamp duty exemption</strong> with no price cap.</span>
                              ) : (
                                <span>In Queensland, first home buyers pay <strong className="text-orange-700">$0 stamp duty</strong> on established homes up to $700,000, and a sliding concession up to $800,000.</span>
                              )}
                            </div>
                          )}
                          {stateCode === "WA" && (
                            <div className="text-[11px] text-slate-500 font-bold bg-white/50 border border-slate-200/50 p-3 rounded-xl leading-relaxed">
                              In Western Australia, eligible first home buyers pay <strong className="text-orange-700">$0 stamp duty</strong> up to $600,000, with concessional rates up to $800,000.
                            </div>
                          )}
                          {stateCode === "SA" && (
                            <div className="text-[11px] text-slate-500 font-bold bg-white/50 border border-slate-200/50 p-3 rounded-xl leading-relaxed">
                              {propertyStatus === "new" ? (
                                <span>South Australia offers a <strong className="text-orange-700">100% stamp duty exemption</strong> for first home buyers of new builds, with no price cap!</span>
                              ) : (
                                <span>Note: South Australia does <strong className="text-orange-700">not</strong> offer stamp duty concessions for established properties.</span>
                              )}
                            </div>
                          )}
                          {stateCode === "TAS" && (
                            <div className="text-[11px] text-slate-500 font-bold bg-white/50 border border-slate-200/50 p-3 rounded-xl leading-relaxed">
                              {propertyStatus === "established" ? (
                                <span>Tasmania offers a <strong className="text-orange-700">100% stamp duty exemption</strong> on established homes up to $750,000.</span>
                              ) : (
                                <span>Note: Tasmania does <strong className="text-orange-700">not</strong> offer stamp duty concessions on new builds (only FHOG).</span>
                              )}
                            </div>
                          )}
                          {stateCode === "NT" && (
                            <div className="text-[11px] text-slate-500 font-bold bg-white/50 border border-slate-200/50 p-3 rounded-xl leading-relaxed">
                              {propertyStatus === "new" ? (
                                <span>In NT, first home buyers of house & land packages under a single contract receive a <strong className="text-orange-700">100% stamp duty exemption</strong>.</span>
                              ) : (
                                <span>Note: NT does <strong className="text-orange-700">not</strong> offer stamp duty concessions on established homes (only grants).</span>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Pensioner Concession toggle - hide in other states */}
                    {stateCode === "ACT" && (
                      <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-700">Eligible Pensioner Concession?</span>
                        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => {
                              setIsPensioner(true);
                              setIsFirstHomeBuyer(false); // Can't be both
                            }}
                            className={`px-3 py-1 text-[11px] font-black rounded-md cursor-pointer ${isPensioner ? "bg-white text-orange-700 shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsPensioner(false)}
                            className={`px-3 py-1 text-[11px] font-black rounded-md cursor-pointer ${!isPensioner ? "bg-white text-orange-700 shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                    {/* Note: Step 2 Lead form merged below */}

                {/* STEP 2: Results Display */}
                {currentStep === 2 && (
                  <div className="space-y-4 py-2">
                    {/* Highlight Card */}
                    <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 text-center shadow-inner">
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-800">Final Stamp Duty Due</span>
                      <div className="text-3xl font-black mt-2 text-orange-600 font-montserrat">
                        ${results.finalStampDuty.toLocaleString()}
                      </div>
                      
                      {results.selectedConcession > 0 && (
                        <p className="text-[11px] text-emerald-600 mt-2.5 font-extrabold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          Concession applied: Saved ${results.selectedConcession.toLocaleString()}!
                        </p>
                      )}
                    </div>

                    {/* Breakdown Fees table */}
                    <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 space-y-2 text-xs font-bold text-slate-500">
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span>Property Purchase Price:</span>
                        <span className="text-slate-800">${propertyValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span>Standard Stamp Duty:</span>
                        <span className="text-slate-800">${results.baseDuty.toLocaleString()}</span>
                      </div>
                      {results.selectedConcession > 0 && (
                        <div className="flex justify-between py-1.5 border-b border-slate-100 text-emerald-600">
                          <span>Government Concession discount:</span>
                          <span>-${results.selectedConcession.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span>Transfer Registration Fee:</span>
                        <span className="text-slate-800">${results.transferFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span>Mortgage Registration Fee:</span>
                        <span className="text-slate-800">${results.mortgageRegistrationFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between py-2.5 text-sm font-black text-slate-800 pt-3 border-t border-slate-200">
                        <span>Total Government Costs:</span>
                        <span className="text-orange-700">${results.totalFees.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
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
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="email"
                              required
                              placeholder="Email"
                              value={calcLeadEmail}
                              onChange={(e) => setCalcLeadEmail(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Phone"
                              value={calcLeadPhone}
                              onChange={(e) => setCalcLeadPhone(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={calcLeadSubmitting}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[12px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/10 transition-colors"
                          >
                            {calcLeadSubmitting ? "Generating..." : "Download Full Report"} <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.97] cursor-pointer w-1/2"
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
                        className="border border-orange-600 text-orange-700 bg-white hover:bg-orange-50 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer w-1/2"
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
                        className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-[13px] py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/10 transition-colors ml-auto"
                      >
                        Calculate Duty & Fees <ArrowRight className="w-4 h-4" />
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
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-800 bg-orange-50 border border-orange-100/60 px-3 py-1 rounded-full inline-block font-bold">
              FAQ
            </span>
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[32px] font-black leading-tight font-montserrat mt-2">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Questions</span>
            </h2>
            <p className="text-slate-500 text-[12.5px] font-medium mt-2">
              Everything you need to know about first home buyer deposits, pre-approvals, and loans.
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
                  <span className="pr-4 font-montserrat">{faq.q}</span>
                  <HelpCircle className={`w-4.5 h-4.5 shrink-0 transition-transform ${openFaqIndex === idx ? "rotate-180 text-orange-600" : "text-slate-400"}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed border-t border-slate-100/80 font-medium">
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
        titleText={<>Loved By Hundreds of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Happy Home Owners</span></>}
        backgroundClass="bg-white"
      />

      {/* ENQUIRY CALLBACK FORM */}
      <section id="enquiry-form" className="py-16 lg:py-24 bg-[#0B1F3A] text-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/25 px-3.5 py-1.5 rounded-full w-fit block font-bold">
                Callback Service
              </span>
              <h2 className="text-white text-[28px] sm:text-[38px] lg:text-[45px] font-black leading-tight font-montserrat">
                Need Help Structuring your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Purchase Costs?</span>
              </h2>
              <div className="w-12 h-[3px] bg-orange-500 rounded-full" />
              <p className="text-slate-350 text-[14px] leading-relaxed max-w-xl">
                Purchasing a home involves several upfront expenses beyond the property deposit. Let our home loan brokers map out your stamp duty obligations, solicitor fees, and lender costs to configure the ideal loan structure.
              </p>
              
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-455 flex items-center justify-center border border-orange-500/20">
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
                    Thank you. We have received your purchase cost enquiry and will contact you within one business hour.
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
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all shadow-inner"
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
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="enq-msg" className="text-[10.5px] font-extrabold text-[#0B1F3A]/70 uppercase tracking-wide block">Message / Scenario Details</label>
                    <textarea
                      id="enq-msg"
                      rows={3}
                      placeholder="Tell us about your home buying budgets or stamp duty exemption questions..."
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[13.5px] py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
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
        <div className="flex justify-between items-center border-b-2 border-orange-600 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-montserrat">MORTGAGE XPERTS</h1>
            <p className="text-[9px] text-slate-555 uppercase tracking-widest font-black">Nepali Mortgage Broker in Australia | Purchasing Specialists</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-1">
              {stateCode} Government Fees &amp; Duty Report
            </span>
            <p className="text-[10px] text-slate-400 font-bold">Generated on {new Date().toLocaleDateString("en-AU")}</p>
          </div>
        </div>

        <div className="bg-orange-50/20 border border-orange-100 rounded-2xl p-6 text-center mb-6">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estimated Stamp Duty Payable</h2>
          <div className="text-4xl font-black text-orange-600 mt-1 font-montserrat">
            ${results.finalStampDuty.toLocaleString()}
          </div>
          {results.selectedConcession > 0 && (
            <p className="text-[10px] text-emerald-600 font-black mt-1">Concession Applied: saved ${results.selectedConcession.toLocaleString()}</p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 border border-slate-200 rounded-xl p-4 bg-slate-50/25">
            <h3 className="text-xs font-black text-[#0B1F3A] border-b border-slate-200 pb-1.5 mb-3 font-montserrat uppercase tracking-wider">Purchase Fee Breakdown</h3>
            <table className="w-full text-[11.5px] font-bold text-slate-500">
              <tbody className="divide-y divide-slate-100">
                <tr className="py-2.5 flex justify-between">
                  <td>Property Value:</td>
                  <td className="text-[#0B1F3A]">${propertyValue.toLocaleString()}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Property Type:</td>
                  <td className="text-[#0B1F3A] uppercase text-[10px]">{propertyType === "owner" ? "Owner Occupied" : "Investment"}</td>
                </tr>
                {stateCode === "NSW" && (
                  <tr className="py-2.5 flex justify-between">
                    <td>Property Status:</td>
                    <td className="text-[#0B1F3A] uppercase text-[10px]">{propertyStatus === "established" ? "Established Home" : "New Home"}</td>
                  </tr>
                )}
                <tr className="py-2.5 flex justify-between">
                  <td>Standard Duty (Before concessions):</td>
                  <td className="text-[#0B1F3A]">${results.baseDuty.toLocaleString()}</td>
                </tr>
                {results.selectedConcession > 0 && (
                  <tr className="py-2.5 flex justify-between text-emerald-600">
                    <td>Government Discount Concession:</td>
                    <td>-${results.selectedConcession.toLocaleString()}</td>
                  </tr>
                )}
                {results.fhog > 0 && (
                  <tr className="py-2.5 flex justify-between text-emerald-600">
                    <td>First Home Owner Grant (FHOG):</td>
                    <td>+${results.fhog.toLocaleString()} (Not deducted from duty)</td>
                  </tr>
                )}
                <tr className="py-2.5 flex justify-between">
                  <td>Transfer Registration Fee:</td>
                  <td className="text-[#0B1F3A]">${results.transferFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr className="py-2.5 flex justify-between">
                  <td>Mortgage Registration Fee:</td>
                  <td className="text-[#0B1F3A]">${results.mortgageRegistrationFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr className="py-3.5 flex justify-between text-sm font-black text-[#0B1F3A] border-t border-slate-350/50 pt-3">
                  <td>Total Estimated Government Fees:</td>
                  <td className="text-orange-700">${results.totalFees.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 text-[10px] text-slate-500 leading-relaxed">
          <p className="font-bold mb-1 uppercase tracking-wider text-[#0B1F3A]">Disclaimer &amp; Important Notice:</p>
          This calculation is an estimate only based on information provided by the user. True government fees, stamp duties, transfer registries, concessions, and grants are determined by the {stateCode === "ACT" ? "ACT Revenue Office" : stateCode === "NSW" ? "Revenue NSW" : stateCode === "VIC" ? "State Revenue Office (VIC)" : stateCode === "QLD" ? "Queensland Revenue Office (QRO)" : stateCode === "WA" ? "RevenueWA" : stateCode === "SA" ? "RevenueSA" : stateCode === "TAS" ? "State Revenue Office (TAS)" : "Territory Revenue Office (NT)"} at settlement. Lender fees, insurance premiums, legal conveyancing, or other charges are not included in these figures. Consult Mortgage Xperts before entering into any purchase agreements.
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter settings={settings} />
    </div>
  );
}
