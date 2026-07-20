import React from "react";
import ClientPage from "./ClientPage";
import { executeQuery } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Mortgage Assessment | Top Mortgage Broker in Australia",
  description: "Get a free mortgage assessment from Australia's trusted mortgage experts. Specializing in tailored home loan strategies, with dedicated services for the Nepalese community across Sydney, Melbourne, and Australia.",
  keywords: "mortgage broker Australia, best home loan broker, Nepali mortgage broker Australia, free mortgage assessment, refinance home loan, Nepalese mortgage experts Sydney, home loan strategy",
  openGraph: {
    title: "Free Mortgage Assessment | Mortgage Xperts",
    description: "Get a customized mortgage strategy from Australia's trusted mortgage experts. Explore your borrowing options securely today.",
    type: "website",
  }
};

export default async function MortgageMateServerPage() {
  let videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Default fallback
  try {
    const rows = await executeQuery("SELECT value FROM global_settings WHERE `key` = 'mortgage_mate_video_url'");
    if (Array.isArray(rows) && rows.length > 0 && rows[0].value) {
      videoUrl = rows[0].value;
    }
  } catch (err) {
    console.error("Error fetching mortgage mate video URL:", err);
  }

  return <ClientPage videoUrl={videoUrl} />;
}
