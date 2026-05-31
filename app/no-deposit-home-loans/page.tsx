"use client";

import React from "react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export default function NoDepositHomeLoans() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      {/* Shared Modular Header */}
      <SiteHeader />

      <main className="flex-grow">
        {/* Start Fresh Here */}
      </main>

      {/* Shared Modular Footer */}
      <SiteFooter />
    </div>
  );
}
