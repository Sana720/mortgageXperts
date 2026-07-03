"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface CalcResults {
  monthly: number;
  weekly: number;
  fortnightly: number;
  interestOnly: number;
  totalInterest: number;
  totalPayments: number;
  interestSaved: number;
  yearsSaved: number;
  monthsSaved: number;
  balanceSch: number[];
  balanceExt: number[];
}

function calculate(
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  lumpSum: number,
  extraPayment: number,
  extraFreq: string
): CalcResults {
  const r = interestRate / 100 / 12;
  const n = loanTerm * 12;

  const monthlyBase =
    r > 0
      ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : loanAmount / n;

  const monthly = monthlyBase;
  const weekly = (monthlyBase * 12) / 52;
  const fortnightly = (monthlyBase * 12) / 26;
  const interestOnly = loanAmount * r;

  // Extra monthly equivalent
  let extraMo = 0;
  if (extraFreq === "Weekly") extraMo = (extraPayment * 52) / 12;
  else if (extraFreq === "Fortnightly") extraMo = (extraPayment * 26) / 12;
  else extraMo = extraPayment;

  // Scheduled simulation
  let balSch = loanAmount;
  let totIntSch = 0;
  let totPaySch = 0;
  const balanceSch: number[] = [loanAmount];
  for (let m = 1; m <= n; m++) {
    const interest = balSch * r;
    const principal = Math.min(balSch, monthlyBase - interest);
    balSch -= principal;
    totIntSch += interest;
    totPaySch += principal + interest;
    if (m % 12 === 0 || m === n) balanceSch.push(Math.max(0, balSch));
  }

  // Extra simulation
  let balExt = Math.max(0, loanAmount - lumpSum);
  let totIntExt = 0;
  let totPayExt = lumpSum;
  let extMonths = n;
  const balanceExt: number[] = [Math.max(0, loanAmount - lumpSum)];
  for (let m = 1; m <= n; m++) {
    if (balExt <= 0) {
      if (m % 12 === 0) balanceExt.push(0);
      continue;
    }
    extMonths = m;
    const interest = balExt * r;
    const principal = Math.min(balExt, monthlyBase + extraMo - interest);
    balExt -= principal;
    totIntExt += interest;
    totPayExt += principal + interest;
    if (m % 12 === 0 || m === n) balanceExt.push(Math.max(0, balExt));
  }
  while (balanceExt.length < balanceSch.length) balanceExt.push(0);

  const monthsSavedTotal = Math.max(0, n - extMonths);

  return {
    monthly,
    weekly,
    fortnightly,
    interestOnly,
    totalInterest: totIntSch,
    totalPayments: totPaySch,
    interestSaved: Math.max(0, totIntSch - totIntExt),
    yearsSaved: Math.floor(monthsSavedTotal / 12),
    monthsSaved: monthsSavedTotal % 12,
    balanceSch,
    balanceExt,
  };
}

export function RepaymentCalculatorSection() {
  const [loanAmount, setLoanAmount] = useState(750000);
  const [interestRate, setInterestRate] = useState(6.19);
  const [loanTerm, setLoanTerm] = useState(30);
  const [lumpSum, setLumpSum] = useState(0);
  const [extraPayment, setExtraPayment] = useState(0);
  const [extraFreq, setExtraFreq] = useState("Monthly");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const results = useMemo(
    () => calculate(loanAmount, interestRate, loanTerm, lumpSum, extraPayment, extraFreq),
    [loanAmount, interestRate, loanTerm, lumpSum, extraPayment, extraFreq]
  );

  const fmt = (n: number) =>
    "$" + Math.round(n).toLocaleString("en-AU");

  // SVG chart
  const chart = useMemo(() => {
    const W = 560, H = 200, PL = 48, PR = 16, PT = 16, PB = 28;
    const sch = results.balanceSch;
    const ext = results.balanceExt;
    const cnt = sch.length;
    const maxV = loanAmount;
    const gx = (i: number) => PL + (i / (cnt - 1)) * (W - PL - PR);
    const gy = (v: number) => H - PB - (v / maxV) * (H - PB - PT);

    const schPts = sch.map((v, i) => `${gx(i)},${gy(v)}`).join(" L ");
    const extPts = ext.map((v, i) => `${gx(i)},${gy(v)}`).join(" L ");
    const schArea = `M ${gx(0)},${H - PB} L ${schPts} L ${gx(cnt - 1)},${H - PB} Z`;
    const extArea = `M ${gx(0)},${H - PB} L ${extPts} L ${gx(cnt - 1)},${H - PB} Z`;

    return { W, H, PL, PR, PT, PB, gx, gy, cnt, schPts, extPts, schArea, extArea, sch, ext };
  }, [results, loanAmount]);

  const handleSvgMouse = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * chart.W;
    let idx = Math.round(((x - chart.PL) / (chart.W - chart.PL - chart.PR)) * (chart.cnt - 1));
    idx = Math.max(0, Math.min(chart.cnt - 1, idx));
    setHoveredIdx(idx);
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] font-bold text-[#0B1F3A] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm";

  return (
    <section className="bg-white py-16 md:py-20 relative overflow-hidden border-b border-slate-100">
      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-extrabold text-blue-800 uppercase tracking-widest">
              Repayment Calculator
            </span>
          </div>
          <h2
            className="text-[#0B1F3A] text-[28px] sm:text-[36px] font-extrabold leading-tight"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Estimate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Mortgage Repayments</span>
          </h2>
          <p className="text-slate-500 text-[14px] mt-2 max-w-xl mx-auto font-medium">
            See weekly, fortnightly and monthly figures instantly. Discover how
            extra repayments can save you thousands in interest and years off your term.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── LEFT: Inputs ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-5"
          >
            <h3 className="text-[#0B1F3A] font-extrabold text-[15px] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" /> Loan Details
            </h3>

            {/* Loan Amount */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <label>Loan Amount</label>
                <span className="text-blue-600">{fmt(loanAmount)}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">$</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(0, +e.target.value))}
                  className={inputClass + " pl-8"}
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <label>Interest Rate (% p.a.)</label>
                <span className="text-blue-600">{interestRate}%</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, +e.target.value))}
                  className={inputClass + " pr-8"}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <label>Loan Term</label>
                <span className="text-blue-600">{loanTerm} years</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                value={loanTerm}
                onChange={(e) => setLoanTerm(+e.target.value)}
                className="w-full h-2 rounded-full bg-slate-200 accent-[#2563EB] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                <span>5 yr</span><span>20 yr</span><span>40 yr</span>
              </div>
            </div>

            {/* Extra Repayments */}
            <div className="border-t border-slate-200 pt-4 space-y-4">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Extra Repayments
              </p>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600">Lump Sum ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">$</span>
                  <input
                    type="number"
                    value={lumpSum}
                    onChange={(e) => setLumpSum(Math.max(0, +e.target.value))}
                    className={inputClass + " pl-8"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600">Extra Payment ($)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">$</span>
                    <input
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(Math.max(0, +e.target.value))}
                      className={inputClass + " pl-8"}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600">Frequency</label>
                  <select
                    value={extraFreq}
                    onChange={(e) => setExtraFreq(e.target.value)}
                    className={inputClass + " cursor-pointer appearance-none bg-white"}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Fortnightly">Fortnightly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={() => { setLoanAmount(750000); setInterestRate(6.19); setLoanTerm(30); setLumpSum(0); setExtraPayment(0); setExtraFreq("Monthly"); }}
              className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset to defaults
            </button>
          </motion.div>

          {/* ── RIGHT: Results ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 space-y-4"
          >
            {/* Repayment frequency cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Weekly", value: results.weekly, accent: "bg-blue-50 border-blue-100 text-blue-600" },
                { label: "Fortnightly", value: results.fortnightly, accent: "bg-indigo-50 border-indigo-100 text-indigo-600" },
                { label: "Monthly", value: results.monthly, accent: "bg-sky-50 border-sky-100 text-sky-700", highlight: true },
                { label: "Interest Only", value: results.interestOnly, accent: "bg-violet-50 border-violet-100 text-violet-600" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`border rounded-2xl p-4 text-center ${item.accent} ${item.highlight ? "ring-2 ring-blue-500/20" : ""}`}
                >
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">{item.label}</div>
                  <div className="text-[16px] font-black">
                    {fmt(item.value)}<span className="text-[10px] font-bold opacity-60">/mo</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Repayments</div>
                <div className="text-[20px] font-black text-[#0B1F3A]">{fmt(results.totalPayments)}</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Interest</div>
                <div className="text-[20px] font-black text-blue-600">{fmt(results.totalInterest)}</div>
              </div>
            </div>

            {/* Savings banner */}
            {(lumpSum > 0 || extraPayment > 0) && results.interestSaved > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-emerald-700 font-extrabold text-[13px]">
                    Your extra repayments save {fmt(results.interestSaved)} in interest
                  </p>
                  <p className="text-emerald-600 text-[11px] font-medium">
                    Loan paid off {results.yearsSaved > 0 ? `${results.yearsSaved}y ` : ""}{results.monthsSaved > 0 ? `${results.monthsSaved}m ` : ""}earlier
                  </p>
                </div>
              </div>
            )}

            {/* SVG Chart */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider mb-3">
                <span className="text-slate-600">Balance Over Time</span>
                <div className="flex gap-3">
                  <span className="text-slate-400">● Scheduled</span>
                  <span className="text-[#2563EB]">● With Extra</span>
                </div>
              </div>
              <div className="relative w-full">
                <svg
                  width={chart.W}
                  height={chart.H}
                  viewBox={`0 0 ${chart.W} ${chart.H}`}
                  className="w-full h-auto cursor-crosshair select-none overflow-visible"
                  onMouseMove={handleSvgMouse}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <defs>
                    <linearGradient id="mmSchGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="mmExtGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((r) => {
                    const y = chart.PT + r * (chart.H - chart.PT - chart.PB);
                    const v = (1 - r) * loanAmount;
                    return (
                      <g key={r} opacity="0.15">
                        <line x1={chart.PL} y1={y} x2={chart.W - chart.PR} y2={y} stroke="#0B1F3A" strokeWidth="0.5" strokeDasharray="3,3" />
                        <text x={chart.PL - 6} y={y + 3} textAnchor="end" fontSize="8" fill="#0B1F3A" fontWeight="600">
                          ${Math.round(v / 1000)}k
                        </text>
                      </g>
                    );
                  })}

                  {/* X-axis */}
                  {Array.from({ length: Math.ceil(loanTerm / 5) + 1 }).map((_, i) => {
                    const yr = i * 5;
                    if (yr > loanTerm) return null;
                    const idx = Math.round((yr / loanTerm) * (chart.cnt - 1));
                    return (
                      <text key={yr} x={chart.gx(idx)} y={chart.H - 6} textAnchor="middle" fontSize="8" fill="#64748B" fontWeight="600">
                        Yr {yr}
                      </text>
                    );
                  })}

                  <path d={chart.schArea} fill="url(#mmSchGrad)" />
                  <path d={chart.extArea} fill="url(#mmExtGrad)" />
                  <path d={`M ${chart.schPts}`} fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  <path d={`M ${chart.extPts}`} fill="none" stroke="#2563EB" strokeWidth="2.0" strokeLinecap="round" />

                  {hoveredIdx !== null && (
                    <g>
                      <line x1={chart.gx(hoveredIdx)} y1={chart.PT} x2={chart.gx(hoveredIdx)} y2={chart.H - chart.PB} stroke="#94A3B8" strokeWidth="1" strokeDasharray="4,4" />
                      <circle cx={chart.gx(hoveredIdx)} cy={chart.gy(chart.sch[hoveredIdx])} r="4" fill="#94A3B8" stroke="#fff" strokeWidth="1.5" />
                      <circle cx={chart.gx(hoveredIdx)} cy={chart.gy(chart.ext[hoveredIdx])} r="5" fill="#2563EB" stroke="#fff" strokeWidth="2" />
                    </g>
                  )}
                </svg>

                {hoveredIdx !== null && (
                  <div
                    className="absolute top-4 bg-[#0B1F3A] border border-slate-700 rounded-xl p-2.5 text-left pointer-events-none z-10 shadow-xl min-w-[148px]"
                    style={{
                      left: `${Math.min(Math.max(5, (chart.gx(hoveredIdx) / chart.W) * 100), 75)}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      Year {hoveredIdx} Balance
                    </div>
                    <div className="text-[10px] flex justify-between gap-3 text-slate-300 font-bold">
                      <span>Scheduled:</span>
                      <span className="text-white">{fmt(chart.sch[hoveredIdx])}</span>
                    </div>
                    {(lumpSum > 0 || extraPayment > 0) && (
                      <div className="text-[10px] flex justify-between gap-3 text-sky-400 font-bold">
                        <span>With Extra:</span>
                        <span>{fmt(chart.ext[hoveredIdx])}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/mortgage-mate/assessment"
                className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold text-[12px] uppercase tracking-wider py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                Get Expert Advice <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/loan-repayment-calculator"
                className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[#0B1F3A] font-extrabold text-[12px] uppercase tracking-wider py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                Full Calculator <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
