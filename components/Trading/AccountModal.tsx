"use client";

import { Eye, EyeOff, Menu, RefreshCw } from "lucide-react";
import { useState } from "react";
import ExchangeModal from "./ExchangeModal";
import DailyLimitModal from "./DailyLimitModal";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  id?: string | number;
  currency?: string;
  liveBalance?: number;
  balance?: number;
  isLive: boolean;
  onToggleLive: (isLive: boolean) => void;
  hideBalance?: boolean;
  onToggleHideBalance?: () => void;
}

const AccountModal = ({
  isOpen,
  onClose,
  email = "demo@qxbroker.com",
  id = "71910310",
  currency = "INR",
  liveBalance = 0,
  balance = 1000000,
  isLive,
  onToggleLive,
  hideBalance = false,
  onToggleHideBalance,
}: AccountModalProps) => {
  if (!isOpen) return null;

  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [demoBalance, setDemoBalance] = useState(1000000);

  const fmt = (n?: number) => {
    const num = typeof n === "number" ? n : 0;
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const maskValue = (value: string) => (hideBalance ? "* ".repeat(6).trim() : value);

  const handleRefreshDemo = () => setDemoBalance(1000000);

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="
          w-full
          sm:max-w-sm
          md:max-w-md
          lg:max-w-lg
          h-[100dvh]
          bg-black
          flex
          flex-col
          overflow-hidden
        ">
          {/* HEADER */}
          <div className="flex items-center justify-between p-3 border-b border-gray-800">
            <span className="text-white text-sm font-semibold">
              Account
            </span>

            <button
              onClick={onToggleHideBalance}
              className="p-2 rounded bg-[#1c1f2d]"
            >
              {hideBalance ? (
                <EyeOff size={16} className="text-gray-300" />
              ) : (
                <Eye size={16} className="text-gray-300" />
              )}
            </button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">

            {/* ACCOUNT INFO – 2 COLUMNS */}
            <div className="grid grid-cols-2 gap-3 text-[11px] sm:text-sm bg-[#1c1f2d] p-3 rounded">
              <div>
                <div className="text-gray-400">Email</div>
                <div className="text-white truncate">
                  {maskValue(email)}
                </div>
              </div>

              <div>
                <div className="text-gray-400">ID</div>
                <div className="text-white">
                 {maskValue(String(id))}
                </div>
              </div>

              <div>
                <div className="text-gray-400">Currency</div>
                <div className="text-white">{currency}</div>
              </div>

              <button  onClick={() => setShowExchangeModal(true)} className="text-primary text-xs self-end">
                Change
              </button>
            </div>

            {/* ACCOUNT SELECTION */}
            <div className="grid grid-cols-1 gap-3">

              {/* LIVE ACCOUNT */}
              <label className="grid grid-cols-[auto_1fr] gap-3 p-3 bg-[#0b0d10] rounded text-xs sm:text-sm">
                <input
                  type="radio"
                  checked={isLive}
                  onChange={() => onToggleLive(true)}
                  className="accent-primary mt-1"
                />
                <div>
                  <div className="text-white font-semibold">
                    Live Account
                  </div>
                  <div className="text-gray-400">
                    ₹{hideBalance ? "******" : fmt(liveBalance)}
                  </div>
                </div>
              </label>

              {/* DEMO ACCOUNT */}
              <label className="grid grid-cols-[auto_1fr] gap-3 p-3 bg-[#0b0d10] rounded text-xs sm:text-sm">
                <input
                  type="radio"
                  checked={!isLive}
                  onChange={() => onToggleLive(false)}
                  className="accent-primary mt-1"
                />
                <div>
                  <div className="text-white font-semibold">
                    Demo Account
                  </div>
                  <div className="text-white font-bold">
                    ₹{fmt(balance)}
                  </div>

                  <button
                    onClick={() => setDemoBalance(1000000)}
                    className="flex items-center gap-1 text-gray-400 text-xs mt-1"
                  >
                    <RefreshCw size={12} />
                    Refresh
                  </button>
                </div>
              </label>
            </div>

            {/* MENU – 2 COLUMNS */}
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {["Deposit", "Withdraw", "Trades", "Transactions", "Account"].map(
                (item) => (
                  <button
                    key={item}
                    className="py-2 rounded bg-[#1c1f2d] text-white hover:bg-slate-900"
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            {/* AUTH */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-800">
              <button className="py-2 rounded bg-red-900/30 text-red-400 text-xs">
                Logout
              </button>
              <button className="py-2 rounded bg-indigo-900/30 text-primary text-xs">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>{/* Exchange Modal */}
      <ExchangeModal
        isOpen={showExchangeModal}
        onClose={() => setShowExchangeModal(false)}
        currentCurrency={currency}
      />
      <DailyLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        balance={liveBalance}
      />
    </>
  );
};

export default AccountModal;
