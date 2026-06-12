export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  bio: string;
  expertise: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    slug: "aakash-kc",
    name: "Aakash KC",
    role: "The Mortgage Mate | Founder & Principal Broker",
    image: "/images/aakash_new.png",
    email: "aakash@mortgagexperts.com.au",
    phone: "0450 240 757",
    bio: "As the founder of Mortgage Xperts and widely known as 'The Mortgage Mate', Aakash brings years of dedicated experience to the Australian mortgage industry. With a passion for empowering the Nepali community and all Australians, he has helped hundreds of clients secure their dream homes, build robust investment portfolios, and navigate the complexities of lending with clarity and confidence.",
    expertise: ["First Home Buyers", "Investment Property", "Refinancing", "Complex Lending Solutions"]
  },
  {
    id: "2",
    slug: "rakesh-shrestha",
    name: "Rakesh Shrestha",
    role: "Senior Mortgage Broker",
    image: "https://ui-avatars.com/api/?name=Rakesh+Shrestha&background=042052&color=fff&size=512",
    email: "rakesh@mortgagexperts.com.au",
    phone: "1300 000 000",
    bio: "Rakesh is a highly skilled Senior Mortgage Broker known for his analytical approach and deep understanding of the property market. He specializes in helping both first-time buyers and seasoned investors structure their loans for maximum benefit, ensuring long-term financial success and stability.",
    expertise: ["First Home Buyers", "Wealth Creation", "Loan Structuring"]
  },
  {
    id: "3",
    slug: "susmita-g-c",
    name: "Susmita G C",
    role: "Mortgage Broker",
    image: "https://ui-avatars.com/api/?name=Susmita+GC&background=17aae4&color=fff&size=512",
    email: "susmita@mortgagexperts.com.au",
    phone: "1300 000 000",
    bio: "Susmita is dedicated to providing exceptional service and tailored mortgage solutions. With a keen eye for detail and a warm, approachable demeanor, she simplifies the often overwhelming process of securing a home loan, making her clients feel supported every step of the way.",
    expertise: ["Home Loans", "Refinancing", "First Home Guarantee Scheme"]
  },
  {
    id: "4",
    slug: "utsav-khadka",
    name: "Utsav Khadka",
    role: "Mortgage Broker",
    image: "https://ui-avatars.com/api/?name=Utsav+Khadka&background=2563eb&color=fff&size=512",
    email: "utsav@mortgagexperts.com.au",
    phone: "1300 000 000",
    bio: "Utsav is a passionate Mortgage Broker who thrives on helping individuals and families achieve their property goals. Whether it's finding the most competitive interest rate or guiding clients through their first property purchase, Utsav's commitment to excellence ensures a seamless experience.",
    expertise: ["First Home Buyers", "Pre-Approvals", "Construction Loans"]
  }
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find(member => member.slug === slug);
}
