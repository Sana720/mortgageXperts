$file = "c:\Users\kunal\Desktop\MORTGAGE-XPERTS\app\page.tsx"
$lines = Get-Content $file -Encoding UTF8

# Keep lines 0-79 (before graph), then inject new graph, then lines 214-643 (middle), then inject new section, then closing
$before = $lines[0..79]
$middle = $lines[214..643]

$newGraph = @'
// -- Refinancing Graph (GREEN curve, matching reference design) ----------------
function RefGraph() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 2200;
      const animate = (now: number) => {
        const raw = (now - start) / duration;
        const p = Math.min(1 - Math.pow(1 - raw, 3), 1);
        setProgress(p);
        if (raw < 1) rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }, 400);
    return () => { clearTimeout(timeout); cancelAnimationFrame(rafRef.current); };
  }, []);

  const W = 195, H = 85;
  const barW = 18, gap = 10, startX = 6;
  const barH = 52;

  // Green curve: starts high (same as bars), descends month by month
  const curvePts: [number, number][] = [
    [startX + 0 * (barW + gap) + barW / 2, H - barH + 2],
    [startX + 1 * (barW + gap) + barW / 2, H - barH + 9],
    [startX + 2 * (barW + gap) + barW / 2, H - barH + 19],
    [startX + 3 * (barW + gap) + barW / 2, H - barH + 31],
    [startX + 4 * (barW + gap) + barW / 2, H - barH + 42],
    [startX + 5 * (barW + gap) + barW / 2, H - barH + 50],
  ];

  const curvePath = curvePts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt[0]} ${pt[1]}`;
    const prev = curvePts[i - 1];
    const cpx = (prev[0] + pt[0]) / 2;
    return `${acc} C ${cpx} ${prev[1]}, ${cpx} ${pt[1]}, ${pt[0]} ${pt[1]}`;
  }, '');

  const totalLen = 260;
  const drawn = totalLen * progress;
  const lastIdx = Math.min(Math.floor(progress * (curvePts.length - 0.01)), curvePts.length - 1);
  const lastPt = curvePts[lastIdx];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-lg p-3.5" style={{ width: 220 }}>
      <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest mb-0.5">Monthly Repayment</div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-[22px] font-black text-[#0B1F3A] leading-none">$1,243</span>
        <span className="mb-0.5 text-[10px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-md">- $320 Saved</span>
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
        {/* Green soft fill */}
        {progress > 0.05 && (
          <path
            d={`${curvePath} L ${lastPt[0]} ${H} L ${curvePts[0][0]} ${H} Z`}
            fill="#DCFCE7" opacity={0.45 * progress}
          />
        )}
        {/* Grey bars */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i}
            x={startX + i * (barW + gap)} y={H - barH + i * 2}
            width={barW} height={barH - i * 2} rx={3} fill="#E2E8F0"
          />
        ))}
        {/* Animated green curve */}
        <path
          d={curvePath} fill="none" stroke="#16A34A" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={totalLen} strokeDashoffset={totalLen - drawn}
        />
        {/* Endpoint dot */}
        {progress > 0.88 && (
          <>
            <circle cx={lastPt[0]} cy={lastPt[1]} r={6} fill="#16A34A" opacity={0.2} />
            <circle cx={lastPt[0]} cy={lastPt[1]} r={3.5} fill="#16A34A" />
          </>
        )}
      </svg>
    </div>
  );
}
'@

$newSection = @'
      {/* -- FIND THE RIGHT LOAN PATH SECTION -- */}
      <section className="py-14" style={{ background: "#EDF1F9" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <Settings className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-semibold text-[#2563EB]">Solutions Designed Around</span>
            </div>
            <h2
              className="text-[34px] md:text-[42px] font-extrabold text-[#0B1F3A] leading-tight"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Find The Right Loan Path
              <br /><span className="text-[#2563EB]">For Your Goals.</span>
            </h2>
            <p className="text-slate-500 text-[15px] mt-3 max-w-xl mx-auto leading-relaxed">
              Whether you&apos;re buying your first home, investing, refinancing or building,{" "}
              we&apos;ll help you find the right loan with confidence.
            </p>
          </div>

          {/* TOP ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

            {/* Card 1 - First Home Buyers */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[270px]">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EBF5FF] flex items-center justify-center mb-3 text-[#2563EB]">
                    <IconHome />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#0B1F3A] mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    First Home Buyers
                  </h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4 max-w-[240px]">
                    Step-by-step guidance to help you buy your first home with confidence and secure the best possible start.
                  </p>
                  {[
                    ["Understand grants & schemes", "We help you access government grants you may be eligible for."],
                    ["Borrow with confidence", "We explain your borrowing capacity in simple, clear terms."],
                  ].map(([title, sub]) => (
                    <div key={title} className="flex items-start gap-2 mb-2.5">
                      <div className="w-5 h-5 rounded bg-[#EBF5FF] flex items-center justify-center shrink-0 mt-0.5">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                          <rect x="4" y="3" width="16" height="18" rx="2" /><line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="12" y2="16" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#0B1F3A]">{title}</div>
                        <div className="text-[11px] text-slate-400 leading-snug">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="#" className="mt-2 inline-flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#2563EB] hover:text-white transition-all w-fit">
                  Explore First Home Loans <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="w-[210px] shrink-0 relative flex items-center justify-center overflow-hidden">
                <div className="absolute w-52 h-52 rounded-full" style={{ background: "#DDE9F8", right: "-24px", top: "50%", transform: "translateY(-50%)" }} />
                <div className="relative z-10 w-full h-full">
                  <Image src="/images/villa.png" alt="First Home" fill className="object-contain object-center" />
                </div>
              </div>
            </div>

            {/* Card 2 - Refinancing */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[270px]">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EBF5FF] flex items-center justify-center mb-3 text-[#2563EB]">
                    <IconRefresh />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#0B1F3A] mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Refinancing
                  </h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4 max-w-[240px]">
                    Lower your rate, reduce repayments and save thousands over the life of your loan.
                  </p>
                  <div className="space-y-2">
                    {["Lower interest rates", "Reduce monthly repayments"].map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="text-[13px] text-slate-600">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="#" className="mt-5 inline-flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#2563EB] hover:text-white transition-all w-fit">
                  Explore Refinance Options <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="w-[260px] shrink-0 flex items-center justify-center p-4">
                <RefGraph />
              </div>
            </div>

          </div>

          {/* BOTTOM ROW - 4 small cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Investment Loans - Purple */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px]">
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center mb-1.5 text-[#7C3AED]">
                    <IconBarChart />
                  </div>
                  <div className="w-7 h-0.5 bg-[#7C3AED] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Investment Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Grow your wealth with smart investment loan strategies designed for long-term success.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#7C3AED] text-[10px] font-semibold border border-[#7C3AED] px-2.5 py-1.5 rounded-full hover:bg-[#7C3AED] hover:text-white transition-all w-fit whitespace-nowrap">
                  Explore Investment Loans <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              <div className="w-[90px] shrink-0 relative overflow-hidden flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full" style={{ background: "#EDE9FE", right: "-12px", top: "50%", transform: "translateY(-50%)" }} />
                <div className="relative z-10 w-full h-full">
                  <Image src="/images/villa.png" alt="Investment" fill className="object-contain object-center" />
                </div>
              </div>
            </div>

            {/* Low Deposit Loans - Amber */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px]">
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center mb-1.5 text-[#D97706]">
                    <IconWallet />
                  </div>
                  <div className="w-7 h-0.5 bg-[#D97706] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Low Deposit Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Get into your home sooner with low deposit solutions and flexible options.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#D97706] text-[10px] font-semibold border border-[#D97706] px-2.5 py-1.5 rounded-full hover:bg-[#D97706] hover:text-white transition-all w-fit whitespace-nowrap">
                  Explore Low Deposit Loans <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              <div className="w-[90px] shrink-0 relative overflow-hidden flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full" style={{ background: "#FEF3C7", right: "-12px", top: "50%", transform: "translateY(-50%)" }} />
                <div className="relative z-10 w-full h-full">
                  <Image src="/images/villa.png" alt="Low Deposit" fill className="object-contain object-center" />
                </div>
              </div>
            </div>

            {/* Self-Employed Loans - Blue */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px]">
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EBF5FF] flex items-center justify-center mb-1.5 text-[#2563EB]">
                    <IconUser />
                  </div>
                  <div className="w-7 h-0.5 bg-[#2563EB] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Self-Employed Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Flexible loans for business owners and self-employed Australians.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#2563EB] text-[10px] font-semibold border border-[#2563EB] px-2.5 py-1.5 rounded-full hover:bg-[#2563EB] hover:text-white transition-all w-fit whitespace-nowrap">
                  Explore Self-Employed Loans <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              <div className="w-[90px] shrink-0 relative overflow-hidden flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full" style={{ background: "#DBEAFE", right: "-12px", top: "50%", transform: "translateY(-50%)" }} />
                <div className="relative z-10 w-full h-full">
                  <Image src="/images/villa.png" alt="Self Employed" fill className="object-contain object-center" />
                </div>
              </div>
            </div>

            {/* Construction Loans - Orange */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-row items-stretch min-h-[190px]">
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] flex items-center justify-center mb-1.5 text-[#EA580C]">
                    <IconHammer />
                  </div>
                  <div className="w-7 h-0.5 bg-[#EA580C] mb-2 rounded-full" />
                  <h3 className="text-[13.5px] font-extrabold text-[#0B1F3A] mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Construction Loans</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Build your dream home with tailored construction loan solutions.</p>
                </div>
                <Link href="#" className="mt-3 inline-flex items-center gap-1 text-[#EA580C] text-[10px] font-semibold border border-[#EA580C] px-2.5 py-1.5 rounded-full hover:bg-[#EA580C] hover:text-white transition-all w-fit whitespace-nowrap">
                  Explore Construction Loans <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              <div className="w-[90px] shrink-0 relative overflow-hidden flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full" style={{ background: "#FFEDD5", right: "-12px", top: "50%", transform: "translateY(-50%)" }} />
                <div className="relative z-10 w-full h-full">
                  <Image src="/images/villa.png" alt="Construction" fill className="object-contain object-center" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-5 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#EBF5FF] flex items-center justify-center shrink-0 text-[#2563EB]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-[#0B1F3A] text-[15px]">Not sure which loan is right for you?</div>
                <div className="text-slate-500 text-[13px]">Our mortgage experts are here to help you every step of the way.</div>
              </div>
            </div>
            <Link href="#" className="bg-[#2563EB] text-white font-bold text-[13px] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#1d4ed8] transition-all shadow-sm whitespace-nowrap shrink-0">
              Talk To An Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
'@

$newContent = ($before -join "`r`n") + "`r`n" + $newGraph + "`r`n" + ($middle -join "`r`n") + "`r`n" + $newSection

Set-Content -Path $file -Value $newContent -Encoding UTF8 -NoNewline
$count = (Get-Content $file -Encoding UTF8).Count
Write-Host "Done. New line count: $count"
