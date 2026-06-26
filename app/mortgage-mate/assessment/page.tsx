"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { MortgageMateForm } from "../../components/MortgageMateForm";

export default function MortgageMateAssessmentPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    router.push("/mortgage-mate");
  };

  return (
    <div className={`min-h-screen ${isSubmitted ? "overflow-y-auto" : "h-screen overflow-hidden"} bg-gradient-to-br from-[#FAF6F0] via-[#F5EFE6] to-[#EAE0D1] flex flex-col font-inter relative`}>
      {/* Decorative Premium Glowing Orbs (Layered correctly with z-0) */}
      <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#F59E0B]/20 blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[15%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#D97706]/15 blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[35%] left-[30%] w-[400px] h-[400px] rounded-full bg-[#2563EB]/8 blur-[110px] pointer-events-none z-0" />

      {/* Original website header (Layered on top with z-10) */}
      <div className="relative z-10">
        <SiteHeader isSticky={true} />
      </div>

      {/* Full-width focused form area (Layered on top with z-10) */}
      <main className={`relative z-10 flex-1 flex flex-col justify-between p-6 sm:p-10 md:p-14 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 ${isSubmitted ? "" : "h-[calc(100vh-80px)] overflow-hidden"}`}>
        <div className="w-full flex-1 flex flex-col justify-between">
          <MortgageMateForm 
            onClose={handleClose} 
            compact={false} 
            initialStep={1} 
            onSubmitted={setIsSubmitted} 
            showCloseButton={false}
            transparent={true}
          />
        </div>
      </main>

      {/* Render footer only when submitted & scroll is active */}
      {isSubmitted && (
        <div className="relative z-10">
          <SiteFooter />
        </div>
      )}
    </div>
  );
}
