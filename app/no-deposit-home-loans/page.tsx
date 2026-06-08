import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "No Deposit Home Loans | Mortgage Xperts",
  description:
    "Discover how to buy a home in Australia with no deposit using family guarantor loans or government schemes.",
  alternates: {
    canonical: "https://mortgagexperts.com.au/no-deposit-home-loans-in-australia",
  },
};

export default function Page() {
  redirect("/no-deposit-home-loans-in-australia");
}
