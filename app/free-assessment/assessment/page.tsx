"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, CheckCircle, Star } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { MortgageMateForm } from "../../components/MortgageMateForm";

export default function MortgageMateAssessmentPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    router.push("/free-assessment");
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#FAF6F0] via-[#F5EFE6] to-[#EAE0D1] flex flex-col font-inter relative">
      {/* Decorative Premium Glowing Orbs (Layered correctly with z-0) */}
      <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#F59E0B]/20 blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[15%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#D97706]/15 blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[35%] left-[30%] w-[400px] h-[400px] rounded-full bg-[#2563EB]/8 blur-[110px] pointer-events-none z-0" />

      {/* Original website header (Layered on top with z-10) */}
      <div className="relative z-10">
        <SiteHeader isSticky={true} />
      </div>

      <main className={`relative z-10 flex-1 flex flex-col justify-center py-8 sm:py-12 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 ${isSubmitted ? "py-10" : "min-h-[calc(100vh-80px)]"}`}>
        <div className={isSubmitted ? "w-full" : "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-2"}>
            
            {/* LEFT COLUMN: The Form inside a beautiful white card container */}
            <div className={isSubmitted ? "w-full" : "lg:col-span-7 flex flex-col justify-center"}>
              <div className={isSubmitted ? "w-full overflow-visible" : "bg-white rounded-3xl shadow-[0_15px_40px_rgba(11,31,58,0.06)] border border-slate-100/80 p-6 sm:p-10 flex flex-col justify-between"}>
                <MortgageMateForm 
                  onClose={handleClose} 
                  compact={!isSubmitted} 
                  initialStep={1} 
                  onSubmitted={setIsSubmitted} 
                  showCloseButton={false}
                  transparent={true}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Relevant Info (Trust, Details, Aakash credentials, etc.) */}
            {!isSubmitted && (
              <div className="lg:col-span-5 hidden lg:flex flex-col justify-start space-y-5 pt-2">
                
                {/* Trust Badge */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 p-5 shadow-sm space-y-3.5">
                  <h3 className="text-[#0B1F3A] text-sm font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    <Sparkles className="w-4 h-4 text-[#2563EB]" />
                    <span>Why Complete this Assessment?</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span><strong>100% Free Strategy Call</strong>: No cost to review your target loan and verify home buying scenarios.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span><strong>No Credit Score Impact</strong>: We run options and verify scenarios without affecting your file.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span><strong>Market-Wide Search</strong>: We check over 40+ lending options to find the perfect package.</span>
                    </li>
                  </ul>
                </div>

                {/* Expert Card */}
                <div className="bg-gradient-to-br from-[#0B1F3A] to-[#061427] rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
                  {/* Background decorative glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#2563EB]/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-slate-800">
                      <Image 
                        src="/images/aakash_new.png" 
                        alt="Aakash KC" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[14px]">Aakash KC</h4>
                      <p className="text-[11px] text-slate-300">Principal Mortgage Broker</p>
                      <p className="text-[11px] text-[#38BDF8] font-bold mt-0.5">Mortgage Xperts Australia</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 mt-3 leading-relaxed italic">
                    &ldquo;We speak your language - both culturally and literally. Our mission is to make home ownership straightforward and stress-free for the Nepali community in Australia.&rdquo;
                  </p>
                </div>

                {/* Client Review */}
                <div className="bg-[#FAF6F0]/90 backdrop-blur-md border border-amber-100 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
                    ))}
                  </div>
                  <p className="text-[11.5px] text-slate-600 italic leading-relaxed">
                    &ldquo;Aakash and the team made our first home purchase a breeze. Honest advice and outstanding communication at every step!&rdquo;
                  </p>
                  <div className="text-[11px] font-bold text-[#0B1F3A]">— Dinesh & Sarita, Sydney</div>
                </div>

              </div>
            )}

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
