import type { LucideIcon } from "lucide-react";
import { Home as HomeIcon, Heart, BarChart3, Clock, User } from "lucide-react";

/** Content fields stored in page_meta_hero.slides (JSON) — editable in admin. */
export interface HeroSlideDbRecord {
  id?: number;
  service?: string;
  badge?: string;
  title?: string;
  subtext?: string;
  image?: string;
  btnText1?: string;
  btnLink1?: string;
  btnText2?: string;
  btnLink2?: string;
}

/** Full slide used by the homepage hero — DB content + static presentation defaults. */
export interface HeroSlide extends HeroSlideDbRecord {
  id: number;
  service: string;
  badge: string;
  title: string;
  subtext: string;
  image: string;
  btnText1: string;
  btnLink1: string;
  btnText2: string;
  btnLink2: string;
  accentColor: string;
  badgeBg: string;
  btnClass: string;
  borderBtnClass: string;
  blobGradient: string;
  statIconBg: string;
  statPillBg: string;
  cardTitle: string;
  cardDesc: string;
  cardIcon: LucideIcon;
}

/** Visual-only defaults — not stored in DB. Content comes from page_meta_hero.slides. */
const SLIDE_STYLE_DEFAULTS: Omit<
  HeroSlide,
  "badge" | "title" | "subtext" | "image" | "btnText1" | "btnLink1" | "btnText2" | "btnLink2"
>[] = [
  {
    id: 1,
    service: "first-home",
    accentColor: "#2563EB",
    badgeBg: "bg-[#EAF3FF] border-[#2563EB]/15 text-[#2563EB]",
    btnClass: "bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-blue-200",
    borderBtnClass: "border-[#2563EB] text-[#2563EB] hover:bg-[#EAF3FF]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #D4E9FF 0%, #E8F4FF 42%, #F4F9FF 62%, transparent 82%)",
    statIconBg: "bg-[#2563EB]",
    statPillBg: "bg-[#EAF3FF] border-[#D0E5FF] text-[#2563EB]",
    cardTitle: "Tailored Solutions",
    cardDesc: "Custom loan strategies designed around your goals.",
    cardIcon: HomeIcon,
  },
  {
    id: 2,
    service: "healthcare",
    accentColor: "#0D9488",
    badgeBg: "bg-[#E6FBF7] border-[#0D9488]/15 text-[#0D9488]",
    btnClass: "bg-[#0D9488] hover:bg-[#0f766e] text-white shadow-teal-200",
    borderBtnClass: "border-[#0D9488] text-[#0D9488] hover:bg-[#E6FBF7]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #CCFBF1 0%, #E6FBF7 42%, #F2FDFB 62%, transparent 82%)",
    statIconBg: "bg-[#0D9488]",
    statPillBg: "bg-[#E6FBF7] border-[#99F6E4] text-[#0D9488]",
    cardTitle: "Zero LMI Waiver",
    cardDesc: "Exclusive medical policy benefits for doctor loans.",
    cardIcon: Heart,
  },
  {
    id: 3,
    service: "investment",
    accentColor: "#D97706",
    badgeBg: "bg-[#FEF3C7] border-[#D97706]/15 text-[#D97706]",
    btnClass: "bg-[#D97706] hover:bg-[#b45309] text-white shadow-amber-200",
    borderBtnClass: "border-[#D97706] text-[#D97706] hover:bg-[#FEF3C7]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #FEF3C7 0%, #FFFBEB 42%, #FFFDF5 62%, transparent 82%)",
    statIconBg: "bg-[#D97706]",
    statPillBg: "bg-[#FEF3C7] border-[#FDE68A] text-[#D97706]",
    cardTitle: "Portfolio Strategy",
    cardDesc: "Multi-lender setups to optimize borrowing capacity.",
    cardIcon: BarChart3,
  },
  {
    id: 4,
    service: "refinancing",
    accentColor: "#7C3AED",
    badgeBg: "bg-[#F3E8FF] border-[#7C3AED]/15 text-[#7C3AED]",
    btnClass: "bg-[#7C3AED] hover:bg-[#6d28d9] text-white shadow-purple-200",
    borderBtnClass: "border-[#7C3AED] text-[#7C3AED] hover:bg-[#F3E8FF]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #F3E8FF 0%, #FAF5FF 42%, #FDFBFF 62%, transparent 82%)",
    statIconBg: "bg-[#7C3AED]",
    statPillBg: "bg-[#F3E8FF] border-[#E9D5FF] text-[#7C3AED]",
    cardTitle: "Lower Rate Search",
    cardDesc: "Active rate negotiations to beat your current lender.",
    cardIcon: Clock,
  },
  {
    id: 5,
    service: "self-employed",
    accentColor: "#E11D48",
    badgeBg: "bg-[#FFE4E6] border-[#E11D48]/15 text-[#E11D48]",
    btnClass: "bg-[#E11D48] hover:bg-[#be123c] text-white shadow-rose-200",
    borderBtnClass: "border-[#E11D48] text-[#E11D48] hover:bg-[#FFE4E6]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #FFE4E6 0%, #FFF5F5 42%, #FFFBFB 62%, transparent 82%)",
    statIconBg: "bg-[#E11D48]",
    statPillBg: "bg-[#FFE4E6] border-[#FECDD3] text-[#E11D48]",
    cardTitle: "Alt-Doc Solutions",
    cardDesc: "Custom cash flow assessment using BAS or bank statements.",
    cardIcon: User,
  },
];

/** Fallback copy when DB row is missing a field (first load / partial admin save). */
const SLIDE_CONTENT_FALLBACKS: Pick<
  HeroSlide,
  "badge" | "title" | "subtext" | "image" | "btnText1" | "btnLink1" | "btnText2" | "btnLink2"
>[] = [
  {
    badge: "First Home Buyer Specialists",
    title: "Your Journey to Your First Home, Simplified",
    subtext:
      "Secure your first home with expert guidance, government grants assistance, and access to low-deposit options from 40+ leading lenders.",
    image: "/images/hero.png",
    btnText1: "Get Started",
    btnLink1: "/nepali-mortgage-broker-in-australia",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
  {
    badge: "Specialist Lenders for Medical & Health Professionals",
    title: "Exclusive Mortgage Benefits for Health Professionals",
    subtext:
      "Get up to 95% LVR with zero Lenders Mortgage Insurance (LMI) and discounted interest rates tailored for medical practitioners and healthcare staff.",
    image: "/images/hero_slide_2_green.png",
    btnText1: "Get Started",
    btnLink1: "/home-loan-for-doctors",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
  {
    badge: "Strategic Lending for Property Investors",
    title: "Build and Scale Your Property Portfolio",
    subtext:
      "Maximize your borrowing power, optimize loan structures, and leverage equity to grow your long-term property investment wealth.",
    image: "/images/hero_slide_3_yellow.png",
    btnText1: "Get Started",
    btnLink1: "/investing-in-property-nepali-mortgage-broker",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
  {
    badge: "Smart Refinance Strategies",
    title: "Refinance and Save Thousands Annually",
    subtext:
      "Switch to a lower rate, consolidate high-interest debts, or unlock equity for renovations with our streamlined mortgage refinance process.",
    image: "/images/hero_slide_4_purple.png",
    btnText1: "Get Started",
    btnLink1: "/refinancing-a-loan",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
  {
    badge: "Low-Doc & Self-Employed Mortgage Experts",
    title: "Flexible Home Loans for Business Owners",
    subtext:
      "No up-to-date tax returns? We specialize in alt-doc and low-doc lending solutions to secure the home loan you deserve using alternative proof of income.",
    image: "/images/hero_slide_5_rose.png",
    btnText1: "Get Started",
    btnLink1: "/self-employed-home-loans",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
];

export function isHeroModalLink(link?: string): boolean {
  if (!link) return false;
  const lower = link.toLowerCase();
  return (
    link === "#" ||
    lower.includes("modal") ||
    lower.includes("contact") ||
    lower.includes("strategy") ||
    lower.includes("book") ||
    lower.includes("talk") ||
    lower.includes("callback")
  );
}

/**
 * Merge DB slide JSON (page_meta_hero.slides) with static styling defaults.
 * DB values win for all editable content including btnLink1 / btnLink2.
 */
export function mergeHeroSlides(slidesJson?: string | null): HeroSlide[] {
  let dbSlides: HeroSlideDbRecord[] = [];

  if (slidesJson) {
    try {
      const parsed = JSON.parse(slidesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dbSlides = parsed;
      }
    } catch {
      // Invalid JSON — fall through to style defaults + content fallbacks
    }
  }

  const source = dbSlides.length > 0 ? dbSlides : SLIDE_CONTENT_FALLBACKS;

  return source.map((item, idx) => {
    const style = SLIDE_STYLE_DEFAULTS[idx] || SLIDE_STYLE_DEFAULTS[0];
    const fallback = SLIDE_CONTENT_FALLBACKS[idx] || SLIDE_CONTENT_FALLBACKS[0];

    return {
      ...style,
      service: (item as HeroSlideDbRecord).service || style.service,
      badge: item.badge || fallback.badge,
      title: item.title || fallback.title,
      subtext: item.subtext || fallback.subtext,
      image: item.image || fallback.image,
      btnText1: item.btnText1 || fallback.btnText1,
      btnLink1: item.btnLink1 || fallback.btnLink1,
      btnText2: item.btnText2 || fallback.btnText2,
      btnLink2: item.btnLink2 || fallback.btnLink2,
    };
  });
}
