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
    service: "nurses-midwives",
    accentColor: "#0D9488",
    badgeBg: "bg-[#E6FBF7] border-[#0D9488]/15 text-[#0D9488]",
    btnClass: "bg-[#0D9488] hover:bg-[#0f766e] text-white shadow-teal-200",
    borderBtnClass: "border-[#0D9488] text-[#0D9488] hover:bg-[#E6FBF7]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #CCFBF1 0%, #E6FBF7 42%, #F2FDFB 62%, transparent 82%)",
    statIconBg: "bg-[#0D9488]",
    statPillBg: "bg-[#E6FBF7] border-[#99F6E4] text-[#0D9488]",
    cardTitle: "Zero LMI Waiver",
    cardDesc: "Specialist LMI waiver policies tailored for nurses & midwives.",
    cardIcon: Heart,
  },
  {
    id: 2,
    service: "doctors-dentists",
    accentColor: "#2563EB",
    badgeBg: "bg-[#EAF3FF] border-[#2563EB]/15 text-[#2563EB]",
    btnClass: "bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-blue-200",
    borderBtnClass: "border-[#2563EB] text-[#2563EB] hover:bg-[#EAF3FF]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #D4E9FF 0%, #E8F4FF 42%, #F4F9FF 62%, transparent 82%)",
    statIconBg: "bg-[#2563EB]",
    statPillBg: "bg-[#EAF3FF] border-[#D0E5FF] text-[#2563EB]",
    cardTitle: "Medical Privileges",
    cardDesc: "Exclusive medical policies & commercial interest rate discounts.",
    cardIcon: HomeIcon,
  },
  {
    id: 3,
    service: "allied-health",
    accentColor: "#059669",
    badgeBg: "bg-[#ECFDF5] border-[#059669]/15 text-[#059669]",
    btnClass: "bg-[#059669] hover:bg-[#047857] text-white shadow-emerald-200",
    borderBtnClass: "border-[#059669] text-[#059669] hover:bg-[#ECFDF5]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #D1FAE5 0%, #ECFDF5 42%, #F0FDF4 62%, transparent 82%)",
    statIconBg: "bg-[#059669]",
    statPillBg: "bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]",
    cardTitle: "Allied Health Policies",
    cardDesc: "Full overtime & allowance recognition with leading lenders.",
    cardIcon: BarChart3,
  },
  {
    id: 4,
    service: "aged-care",
    accentColor: "#7C3AED",
    badgeBg: "bg-[#F3E8FF] border-[#7C3AED]/15 text-[#7C3AED]",
    btnClass: "bg-[#7C3AED] hover:bg-[#6d28d9] text-white shadow-purple-200",
    borderBtnClass: "border-[#7C3AED] text-[#7C3AED] hover:bg-[#F3E8FF]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #F3E8FF 0%, #FAF5FF 42%, #FDFBFF 62%, transparent 82%)",
    statIconBg: "bg-[#7C3AED]",
    statPillBg: "bg-[#F3E8FF] border-[#E9D5FF] text-[#7C3AED]",
    cardTitle: "Aged Care Lending",
    cardDesc: "Maximise borrowing capacity with salary packaging & shift rates.",
    cardIcon: Clock,
  },
  {
    id: 5,
    service: "nurses",
    accentColor: "#E11D48",
    badgeBg: "bg-[#FFE4E6] border-[#E11D48]/15 text-[#E11D48]",
    btnClass: "bg-[#E11D48] hover:bg-[#be123c] text-white shadow-rose-200",
    borderBtnClass: "border-[#E11D48] text-[#E11D48] hover:bg-[#FFE4E6]",
    blobGradient:
      "radial-gradient(ellipse 85% 90% at 62% 52%, #FFE4E6 0%, #FFF5F5 42%, #FFFBFB 62%, transparent 82%)",
    statIconBg: "bg-[#E11D48]",
    statPillBg: "bg-[#FFE4E6] border-[#FECDD3] text-[#E11D48]",
    cardTitle: "Dedicated Guidance",
    cardDesc: "Personalised lending support across all Australian states.",
    cardIcon: User,
  },
];

/** Fallback copy when DB row is missing a field (first load / partial admin save). */
const SLIDE_CONTENT_FALLBACKS: Pick<
  HeroSlide,
  "badge" | "title" | "subtext" | "image" | "btnText1" | "btnLink1" | "btnText2" | "btnLink2"
>[] = [
  {
    badge: "Nurses and Mid Wives",
    title: "Specialist Home Loans for Nurses & Midwives",
    subtext:
      "Enjoy up to 90–95% LVR with zero Lenders Mortgage Insurance (LMI) and discounted interest rates tailored for nurses and midwives across Australia.",
    image: "/images/Healthcare Professionals.png",
    btnText1: "Explore Nurse Loans",
    btnLink1: "/home-loan-for-nurses",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
  {
    badge: "Doctors and Dentists",
    title: "Exclusive Mortgage Benefits for Doctors & Dentists",
    subtext:
      "Access up to 95% LVR with zero LMI, elevated borrowing caps, and commercial rate discounts designed specifically for medical doctors, dentists, and specialists.",
    image: "/images/doctor_hero.png",
    btnText1: "Explore Doctor Loans",
    btnLink1: "/home-loan-for-doctors",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
  {
    badge: "Allied Health Professionals",
    title: "Tailored Home Loans for Allied Health Professionals",
    subtext:
      "Exclusive lending policies and waived LMI benefits for physiotherapists, pharmacists, optometrists, occupational therapists, and healthcare clinicians.",
    image: "/images/hero_slide_2_green.png",
    btnText1: "Explore Allied Health",
    btnLink1: "/home-loan-for-nurses",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
  {
    badge: "Aged Care Workers",
    title: "Flexible Home Loans for Dedicated Aged Care Workers",
    subtext:
      "We understand your shifts, overtime, and salary packaging arrangements. We help aged care professionals secure the competitive home loan they deserve.",
    image: "/images/diverse_professional_clients.png",
    btnText1: "Explore Aged Care Loans",
    btnLink1: "/nepali-mortgage-broker-in-australia",
    btnText2: "Free Strategy Call",
    btnLink2: "#callback",
  },
  {
    badge: "Nurses",
    title: "Empowering Healthcare Professionals Nationwide",
    subtext:
      "Personalised home loan guidance from The Mortgage Mate, helping Australian healthcare workers buy their first home, refinance, or invest.",
    image: "/images/Healthcare Professionals.png",
    btnText1: "Get Started",
    btnLink1: "/home-loan-for-nurses",
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
