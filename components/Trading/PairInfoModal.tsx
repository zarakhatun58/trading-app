"use client";

import { X, TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";

interface PairInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairName: string;
  pairFlag?: string;
  percentage: number;
  currentPrice: number;
}

const PairInfoModal = ({
  isOpen,
  onClose,
  pairName,
  pairFlag = "🇨🇭🇯🇵",
  percentage,
  currentPrice,
}: PairInfoModalProps) => {
  const [activeMiniTab, setActiveMiniTab] = useState("5min");
  if (!isOpen) return null;

  const tradingSchedule = [
    { date: "9 Dec", day: "Tue", time: "02:00 - 20:00" },
    { date: "10 Dec", day: "Wed", time: "02:00 - 20:00" },
    { date: "11 Dec", day: "Thu", time: "02:00 - 20:00" },
    { date: "12 Dec", day: "Fri", time: "02:00 - 20:00" },
    { date: "13 Dec", day: "Sat", time: "Market Closed" },
  ];

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          fixed z-50
          inset-x-0 bottom-0 md:inset-1/2
          md:-translate-x-1/2 md:-translate-y-1/2
          w-full md:max-w-[600px]
          bg-[#1a1f2e]
          border border-[#2a3040]
          rounded-t-xl md:rounded-xl
          max-h-[85vh]
          overflow-y-auto
        "
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 p-4 border-b border-[#2a3040]">
          <div className="flex items-center gap-2">
            <span className="text-xl">{pairFlag}</span>
            <div>
              <div className="text-white font-semibold text-sm">
                {pairName}
              </div>
              <div className="text-success text-xs font-semibold">
                {percentage}%
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#2a3040]"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-4">
          {/* PRICE INFO */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[11px] text-gray-400">Price Now</div>
              <div className="text-white font-semibold">
                {currentPrice.toFixed(3)}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-gray-400">Session Change</div>
              <div className="text-success font-semibold">+0.06%</div>
            </div>
          </div>

          {/* TRADE BUTTON */}
          <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md flex items-center justify-center gap-2 font-semibold">
            Trade Now <TrendingUp size={16} />
          </button>

          {/* STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              ["Min Invest", "₹100"],
              ["Profit 1m", "63%"],
              ["Profit 5m+", "88%"],
              ["Expiry", "1m – 4h"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] text-gray-400">{label}</div>
                <div className="text-sm font-semibold text-white">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* MINI CHART */}
          <div className="bg-[#0f1114] rounded-lg p-3">
            <div className="flex gap-4 mb-2">
              {["5min", "60min", "1day"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveMiniTab(t)}
                  className={`text-xs pb-1 border-b-2 ${
                    activeMiniTab === t
                      ? "text-white border-primary"
                      : "text-gray-400 border-transparent"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="text-success text-lg font-semibold mb-2">
              +0.12%
            </div>

            <div className="h-20 flex items-end gap-0.5">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-success/50"
                  style={{ height: `${20 + Math.random() * 60}%` }}
                />
              ))}
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="bg-[#0f1114] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-sm font-semibold text-white">
                Trading Schedule
              </span>
            </div>

            <div className="space-y-1 text-[10px]">
              {tradingSchedule.map((d, i) => (
                <div key={i} className="grid grid-cols-3">
                  <span className="text-gray-400">{d.date}</span>
                  <span className="text-gray-300">{d.day}</span>
                  <span
                    className={
                      d.time === "Market Closed"
                        ? "text-destructive font-semibold"
                        : "text-primary"
                    }
                  >
                    {d.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PairInfoModal;
