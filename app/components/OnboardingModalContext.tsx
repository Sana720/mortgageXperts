"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MortgageMateForm } from "./MortgageMateForm";

interface OnboardingModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const OnboardingModalContext = createContext<OnboardingModalContextType | undefined>(undefined);

export function OnboardingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // NOTE: Global click delegation has been REMOVED to prevent every button
  // from triggering the consultation modal. Components should explicitly call
  // openModal() via the useOnboardingModal() hook when they want to show the form.

  return (
    <OnboardingModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-transparent"
              onClick={closeModal}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white w-full max-w-[850px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(11,31,58,0.15)] z-10"
            >
              <div className="max-h-[90vh] overflow-y-auto">
                <MortgageMateForm onClose={closeModal} compact={true} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </OnboardingModalContext.Provider>
  );
}

export function useOnboardingModal() {
  const context = useContext(OnboardingModalContext);
  if (!context) {
    throw new Error("useOnboardingModal must be used within an OnboardingModalProvider");
  }
  return context;
}
