import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Property Investment Loans | Mortgage Xperts",
  description:
    "Maximize your borrowing capacity and structure your investment loans for long-term wealth creation.",
  alternates: {
    canonical:
      "https://mortgagexperts.com.au/investing-in-property-nepali-mortgage-broker",
  },
};

export default function Page() {
  redirect("/investing-in-property-nepali-mortgage-broker");
}
