"use client";

import { useEffect, useState } from "react";
import { cn } from "../../../libs/utils";

export default function MobileTradePanel({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  const [expanded, setExpanded] = useState(false);
useEffect(() => {
  if (expanded) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => {
    document.body.style.overflow = '';
  };
}, [expanded]);

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* PANEL */}
      <div
        className={cn(
          "fixed left-0 right-0 md:hidden",
          "bg-[#101729] border-t border-[#2a3040]",
          "transition-transform duration-300 ease-out",
          expanded ? "translate-y-0" : "translate-y-[70%]"
        )}
        style={{
          bottom: "60px", // sits above bottom nav
          zIndex: 60,
          maxHeight: "70vh",
          minHeight: "220px",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* DRAG HANDLE */}
        <div
          className="flex justify-center py-2 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="h-1 w-10 bg-gray-500 rounded-full" />
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto px-3 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}
