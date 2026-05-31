import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mortgagexperts.com.au"),
  title: "Mortgage Xperts - Australia | Leading Nepali Mortgage Brokerage Firm",
  description: "Australia’s top-rated Nepali mortgage experts, helping clients secure better home loans, refinance smarter, and invest with confidence - backed by 5-star reviews and trusted by hundreds of satisfied clients, led by Aakash, The Mortgage Mate.",
  keywords: [
    "Nepali mortgage broker",
    "Nepali mortgage broker Australia",
    "Nepali mortgage broker Sydney",
    "Nepali mortgage broker Melbourne",
    "Nepali mortgage broker Brisbane",
    "Nepali mortgage broker Adelaide",
    "Nepali mortgage broker Perth",
    "Mortgage Xperts",
    "Aakash Mortgage Mate",
    "Aakash K C Mortgage Broker",
    "Nepali home loan broker",
    "Refinance home loan",
    "First home buyer Nepali broker",
    "Best mortgage broker Sydney",
    "Australian mortgage broker"
  ],
  authors: [{ name: "Mortgage Xperts" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://mortgagexperts.com.au/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Mortgage Xperts - Australia | Leading Nepali Mortgage Brokerage Firm",
    description: "Australia’s top-rated Nepali mortgage experts, helping clients secure better home loans, refinance smarter, and invest with confidence - backed by 5-star reviews and trusted by hundreds of satisfied clients, led by Aakash, The Mortgage Mate.",
    url: "https://mortgagexperts.com.au/",
    siteName: "Mortgage Xperts",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Mortgage Xperts Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Xperts - Australia | Leading Nepali Mortgage Brokerage Firm",
    description: "Australia’s top-rated Nepali mortgage experts, helping clients secure better home loans, refinance smarter, and invest with confidence - backed by 5-star reviews and trusted by hundreds of satisfied clients.",
    images: ["/favicon.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
