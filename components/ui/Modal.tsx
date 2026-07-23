"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "lg",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div
        className={cn(
          "relative w-full rounded-3xl border border-white/10 bg-stone-950 p-6 sm:p-8 shadow-2xl text-white transition-all animate-in zoom-in-95 duration-200 z-10 max-h-[90vh] flex flex-col",
          widthClasses[maxWidth]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>{title}</h3>
            {subtitle && <p className="text-xs text-stone-400 mt-1 font-medium">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 text-white">{children}</div>
      </div>
    </div>
  );
}
