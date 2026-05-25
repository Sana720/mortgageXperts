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
  title: "MORTGAGE XPERTS | Smarter Home Loan Solutions for Australians",
  description: "Expert guidance. Better choices. Stronger outcomes. We simplify the home loan journey and help you make confident financial decisions across Australia.",
  keywords: ["Mortgage Australia", "Home Loans", "Mortgage Brokers", "Refinance", "Australian Home Loans", "Mortgage Experts"],
  authors: [{ name: "Mortgage Xperts" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
  openGraph: {
    title: "MORTGAGE XPERTS | Smarter Home Loan Solutions for Australians",
    description: "Expert guidance. Better choices. Stronger outcomes. We simplify the home loan journey and help you make confident financial decisions.",
    url: "https://mortgagexperts.com.au",
    siteName: "Mortgage Xperts",
    locale: "en_AU",
    type: "website",
  },
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
