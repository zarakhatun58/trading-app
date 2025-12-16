"use client";

import {
  ArrowDownCircle,
  HelpCircle,
  Info,
  LineChart,
  LogOut,
  Receipt,
  User,
  Wallet,
} from "lucide-react";

export function MobileMoreSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const expandedMenuItems = [
    { icon: <Wallet size={18} />, label: "Deposit" },
    { icon: <ArrowDownCircle size={18} />, label: "Withdrawal" },
    { icon: <Receipt size={18} />, label: "Transaction" },
    { icon: <LineChart size={18} />, label: "Trades" },
    { icon: <User size={18} />, label: "Account" },
  ];

  const expandedBottomItems = [
    { icon: <Info size={16} />, label: "About us" },
    { icon: <HelpCircle size={16} />, label: "Support" },
  ];

  return (
    <div
      className={`
        fixed inset-0 z-50
        transition-opacity duration-300
        ${open ? "bg-black/50 opacity-100" : "pointer-events-none opacity-0"}
      `}
      onClick={onClose}
    >
      {/* Drawer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          absolute top-0 right-0 h-full w-[280px]
          bg-[#101729]
          shadow-xl
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a3040]">
          <h3 className="text-white text-sm font-semibold">More</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <div className="p-2 overflow-y-auto">
          {[...expandedMenuItems, ...expandedBottomItems].map((item, i) => (
            <button
              key={i}
              className="
                w-full flex items-center gap-3
                px-3 py-3 text-sm
                text-gray-300 hover:bg-[#2a3040]
                rounded-md transition
              "
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <button className="w-full flex items-center gap-3 px-3 py-3 text-sm text-red-400 hover:bg-[#2a3040] rounded-md">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
