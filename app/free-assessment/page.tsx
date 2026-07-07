import React from "react";
import ClientPage from "./ClientPage";
import { executeQuery } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Mate | Mortgage Xperts",
  description: "Get a customized mortgage strategy from Aakash KC and find your best loan options.",
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
