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

  // Global tel input sanitiser and length restrictor
  React.useEffect(() => {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.tagName === "INPUT" && target.type === "tel") {
        const val = target.value;
        const digitsOnly = val.replace(/\D/g, "");
        const limited = digitsOnly.slice(0, 10);
        if (val !== limited) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value"
          )?.set;
          nativeInputValueSetter?.call(target, limited);
          target.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLInputElement;
      if (target && target.tagName === "INPUT" && target.type === "tel") {
        const allowedKeys = [
          "Backspace",
          "Delete",
          "Tab",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
          "Enter",
          "Escape"
        ];
        
        if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
          return;
        }

        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
          return;
        }

        const digitsOnly = target.value.replace(/\D/g, "");
        if (digitsOnly.length >= 10) {
          const hasSelection = (target.selectionStart !== null && target.selectionEnd !== null && target.selectionEnd - target.selectionStart > 0);
          if (!hasSelection) {
            e.preventDefault();
          }
        }
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLInputElement;
      if (target && target.tagName === "INPUT" && target.type === "tel") {
        e.preventDefault();
        const pasteData = e.clipboardData?.getData("text") || "";
        const digitsOnly = pasteData.replace(/\D/g, "");
        
        const selectionStart = target.selectionStart ?? 0;
        const selectionEnd = target.selectionEnd ?? 0;
        const beforeSelection = target.value.substring(0, selectionStart).replace(/\D/g, "");
        const afterSelection = target.value.substring(selectionEnd).replace(/\D/g, "");
        
        const combined = beforeSelection + digitsOnly + afterSelection;
        const limited = combined.slice(0, 10);
        
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(target, limited);
        target.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    document.addEventListener("input", handleInput, true);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("paste", handlePaste, true);
    
    return () => {
      document.removeEventListener("input", handleInput, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("paste", handlePaste, true);
    };
  }, []);

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
              <div className="max-h-[90vh] overflow-y-auto no-scrollbar">
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
