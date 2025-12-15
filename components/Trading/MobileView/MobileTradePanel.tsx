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
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* panel */}
      <div
         className={cn(
    'fixed left-0 right-0 md:hidden',
    'bg-[#101729] sm:bg-[#2b3040] border-t border-[#2a3040]',
    'transition-transform duration-300',
    expanded ? 'translate-y-0' : 'translate-y-[75%]'
  )}
  style={{
    bottom: '60px',
    zIndex: 60, 
    paddingBottom: 'env(safe-area-inset-bottom)',
  }}
      >
        {/* drag handle */}
        <div className="h-1 w-10 bg-gray-500 rounded-full mx-auto my-2" />

        {children}
      </div>
    </div>
  );
}
