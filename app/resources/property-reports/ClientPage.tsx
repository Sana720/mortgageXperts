"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, ChevronDown, HelpCircle, ArrowRight,
  ShieldCheck, LineChart, Home, Users, Download, FileText, X
} from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { useOnboardingModal } from "../../components/OnboardingModalContext";
import { featuredSuburbsList } from "./data";

// Popular suburb suggestions per state
const SUBURB_SUGGESTIONS: Record<string, string[]> = {
  WA:  ["Canning Vale", "Baldivis", "Joondalup", "Rockingham", "Mandurah", "Fremantle", "Subiaco", "Cottesloe", "Victoria Park", "Applecross"],
  VIC: ["Box Hill", "Richmond", "South Yarra", "Hawthorn", "St Kilda", "Fitzroy", "Doncaster", "Glen Waverley", "Frankston", "Werribee"],
  NSW: ["Surry Hills", "Newtown", "Parramatta", "Manly", "Cronulla", "Baulkham Hills", "Castle Hill", "Ryde", "Hornsby", "Penrith"],
  QLD: ["Fortitude Valley", "New Farm", "Paddington", "Chermside", "Capalaba", "Redcliffe", "Ipswich", "Springfield", "Robina", "Broadbeach"],
  SA:  ["Glenelg", "Burnside", "Norwood", "Unley", "Prospect", "Modbury", "Salisbury", "Marion", "Morphett Vale", "Mount Barker"],
  TAS: ["Sandy Bay", "Launceston", "Devonport", "Burnie", "Hobart", "New Town", "Moonah", "Glenorchy", "Kingston", "Rosny"],
  ACT: ["Braddon", "Dickson", "Belconnen", "Tuggeranong", "Woden", "Gungahlin", "Fyshwick", "Kingston", "Barton", "Forrest"],
  NT:  ["Darwin City", "Palmerston", "Alice Springs", "Nightcliff", "Casuarina", "Fannie Bay", "Coconut Grove", "Rapid Creek", "Stuart Park", "Millner"],
};

export function ClientPage({ settings = {} }: { settings?: Record<string, string> }) {
  const router = useRouter();
  const { openModal } = useOnboardingModal();
  const [suburbSearch, setSuburbSearch] = useState("");
  const [selectedState, setSelectedState] = useState("WA");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchError, setSearchError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filtered = suburbSearch.trim().length === 0
    ? SUBURB_SUGGESTIONS[selectedState] || []
    : (SUBURB_SUGGESTIONS[selectedState] || []).filter(s =>
        s.toLowerCase().includes(suburbSearch.toLowerCase())
      );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        inputRef.current && !inputRef.current.contains(e.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navigateTo = (suburb: string, state: string) => {
    const slug =
      suburb.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-") +
      "-" + state.toLowerCase();
    router.push(`/resources/property-reports/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suburbSearch.trim()) { setSearchError("Please enter a suburb name."); return; }
    setSearchError("");
    setShowSuggestions(false);
    navigateTo(suburbSearch, selectedState);
  };

  const faqs = [
    { q: "What is included in a free Suburb Property Report?", a: "Our free reports cover median house & unit prices, rental yields, 12-month growth trends, vacancy rates, population demographics, and historical capital growth metrics." },
    { q: "Where does the market data come from?", a: "We consolidate data from Australia's leading property databases including CoreLogic and local government registries, ensuring accurate and up-to-date valuations." },
    { q: "Can I request reports for multiple suburbs?", a: "Yes! You can search for and generate property reports for as many Australian suburbs as you need — with no limit on searches." },
    { q: "How can these insights help me secure a mortgage?", a: "Understanding a suburb's price points helps narrow your borrowing requirements. Reports tie directly into our loan calculators to estimate borrowing capacity and required deposit." },
  ];

  const features = [
    { icon: Home,       title: "Estimated Values",   desc: "Median valuations for houses & units with historic price history." },
    { icon: LineChart,  title: "Rental Snapshots",   desc: "Weekly rents, rental yields, and vacancy rates for investors." },
    { icon: Users,      title: "Demographics",       desc: "Population trends, household makeup, and local demographics." },
    { icon: ShieldCheck,title: "Comparable Sales",   desc: "Recent comparable sales to assess local market valuations." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-inter" style={{ overflowX: "clip" }}>
      <SiteHeader isSticky={true} settings={settings} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#0E2A4E] to-[#071629] text-white min-h-[calc(100vh-120px)] flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-14 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-3.5 py-1 w-fit mb-6 text-[11px] font-semibold text-white/60">
            <Link href="/" className="hover:text-[#38BDF8] transition-colors">Home</Link>
            <span className="text-white/30">&gt;</span>
            <span className="text-white/50">Resources</span>
            <span className="text-white/30">&gt;</span>
            <span className="text-[#38BDF8]">Property Reports</span>
          </nav>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: headline + sub */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] rounded-full text-[10.5px] font-bold uppercase tracking-wider mb-4">
                <MapPin className="w-3 h-3" /> Free Suburb Reports
              </span>
              <h1 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.15] font-montserrat mb-4">
                Suburb{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-blue-400">
                  Property Reports
                </span>{" "}
                for Every Australian Suburb
              </h1>
              <p className="text-slate-300 text-[13.5px] md:text-[14.5px] leading-relaxed max-w-lg mb-6">
                Instant access to median prices, rental yields, vacancy rates, and market trends.
                Empower your buying or investing decisions with official data.
              </p>


            </div>

            {/* Right: Search card */}
            <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Search Any Australian Suburb
              </p>

              <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3">
                {/* State selector */}
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => { setSelectedState(e.target.value); setSuburbSearch(""); }}
                    className="w-full bg-slate-50 text-[#0B1F3A] rounded-xl px-4 py-3 text-[13px] font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer appearance-none"
                  >
                    {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map(st => (
                      <option key={st} value={st}>{st} — {
                        { NSW: "New South Wales", VIC: "Victoria", QLD: "Queensland", WA: "Western Australia", SA: "South Australia", TAS: "Tasmania", ACT: "ACT", NT: "Northern Territory" }[st]
                      }</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4" />
                </div>

                {/* Suburb input + suggestions */}
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={`e.g. ${SUBURB_SUGGESTIONS[selectedState]?.[0] ?? "Suburb name"}...`}
                    value={suburbSearch}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => { setSuburbSearch(e.target.value); setSearchError(""); setShowSuggestions(true); }}
                    className="w-full bg-slate-50 text-[#0B1F3A] rounded-xl pl-10 pr-9 py-3 text-[13px] font-semibold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] placeholder-slate-400"
                  />
                  {suburbSearch && (
                    <button type="button" onClick={() => { setSuburbSearch(""); setShowSuggestions(true); inputRef.current?.focus(); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Autocomplete dropdown */}
                  <AnimatePresence>
                    {showSuggestions && filtered.length > 0 && (
                      <motion.div
                        ref={suggestionsRef}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden max-h-[200px] overflow-y-auto"
                      >
                        {!suburbSearch && (
                          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                            Popular in {selectedState}
                          </div>
                        )}
                        {filtered.map(s => (
                          <button
                            key={s}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => { setSuburbSearch(s); setShowSuggestions(false); navigateTo(s, selectedState); }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold text-[#0B1F3A] hover:bg-blue-50 hover:text-[#2563EB] transition-colors text-left"
                          >
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {s}
                            <span className="ml-auto text-[10.5px] font-bold text-slate-400">{selectedState}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {searchError && <p className="text-red-500 text-xs font-bold -mt-1">{searchError}</p>}

                <button
                  type="submit"
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                >
                  <Search className="w-4 h-4 shrink-0" /> View Suburb Report
                </button>
              </form>

              {/* Quick links */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 mb-2.5">Popular right now</p>
                <div className="flex flex-wrap gap-2">
                  {featuredSuburbsList.map(s => (
                    <Link
                      key={s.slug}
                      href={`/resources/property-reports/${s.slug}`}
                      className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#2563EB] bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-full px-2.5 py-1 transition-colors"
                    >
                      <MapPin className="w-2.5 h-2.5" />{s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0B1F3A] mb-3 font-montserrat">
              What's Inside Your Suburb Report?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Comprehensive data from official sources to understand local suburb movements and price points.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2563EB] mb-4 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[14.5px] font-bold text-[#0B1F3A] mb-1.5 font-montserrat">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SUBURBS ── */}
      <section className="py-14 md:py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl md:text-3xl font-extrabold text-[#0B1F3A] mb-2 font-montserrat">Featured Suburbs</h2>
              <p className="text-slate-500 text-sm max-w-md">Trending profiles with outstanding yields, growth stats, and demographics.</p>
            </div>
            <button onClick={openModal} className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors uppercase tracking-wider cursor-pointer">
              Request Custom Suburb <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSuburbsList.map((sub, idx) => (
              <Link
                key={idx}
                href={`/resources/property-reports/${sub.slug}`}
                className="bg-white border border-[#DCE7F5] rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <MapPin className="w-2.5 h-2.5 text-[#2563EB]" /> {sub.slug.split("-").pop()?.toUpperCase()}
                    </span>
                    <span className="text-emerald-600 text-[11px] font-black bg-emerald-50 px-2.5 py-1 rounded-full">{sub.growth} Growth</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0B1F3A] mb-2 group-hover:text-[#2563EB] transition-colors font-montserrat">{sub.name}</h3>
                  <div className="w-6 h-[2px] bg-[#38BDF8] mb-3 rounded-full" />
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Median Price</div>
                      <div className="text-[14px] font-extrabold text-slate-800 mt-0.5">{sub.price}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Rental Yield</div>
                      <div className="text-[14px] font-extrabold text-slate-800 mt-0.5">{sub.yield}</div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[12px] font-bold text-slate-500 group-hover:text-[#2563EB] transition-colors">
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE REPORT CTA ── */}
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="bg-gradient-to-br from-[#0B1F3A] to-[#071629] rounded-[28px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }} />
            <div className="relative z-10 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-[#38BDF8] rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 border border-blue-500/20">
                <FileText className="w-3 h-3" /> Sample Report PDF
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold mb-2 leading-tight font-montserrat">Want to see a sample property report?</h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-lg">Download a fully annotated sample PDF with transactions, pricing heatmaps, and demographics.</p>
            </div>
            <button onClick={openModal} className="relative z-10 bg-white hover:bg-slate-100 text-[#0B1F3A] font-bold text-[13px] py-3.5 px-7 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 cursor-pointer shrink-0">
              <Download className="w-4 h-4" /> Download Sample Report
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-14 md:py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0B1F3A] mb-3 font-montserrat">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm">Quick answers about our property profiles and suburb data reports.</p>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-[#DCE7F5] rounded-xl overflow-hidden shadow-sm">
                  <button onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0" />
                      <span className="text-[13.5px] font-bold text-slate-800 group-hover:text-[#2563EB] transition-colors">{faq.q}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#2563EB]" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}>
                        <div className="px-5 pb-5 border-t border-slate-100 text-[13px] text-slate-500 leading-relaxed pt-4">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GLOBAL CTA ── */}
      <section className="py-14 md:py-16 bg-gradient-to-r from-[#0B1F3A] to-[#071629] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <h2 className="text-xl md:text-3xl font-extrabold mb-3 font-montserrat">Need Expert Financial Advice?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-7 leading-relaxed">Connect with a professional mortgage broker to review your options and secure pre-approval.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={openModal} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[13.5px] py-3.5 px-7 rounded-full shadow-lg shadow-blue-500/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              Book a Free Consultation
            </button>
            <Link href="/best-nepali-investment-mortgage-broker-perth" className="inline-flex items-center justify-center gap-1.5 border-2 border-white/20 text-white font-bold text-[13.5px] py-3 px-7 rounded-full transition-all duration-300 hover:bg-white hover:text-slate-900">
              Contact Mortgage Xperts
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </div>
  );
}
