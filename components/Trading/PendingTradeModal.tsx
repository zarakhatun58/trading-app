"use client";

import { useEffect, useState } from "react";
import { X, Plus, Minus, ArrowUp, ArrowDown, Clock } from "lucide-react";
import HowDoesModal from "./HowDoesModal";
import { durationTimeOptions } from "../../data/mockData";

interface PendingTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuote: number;
  onTrade: (
    direction: "up" | "down",
    amount: number,
    type: "quote" | "time",
    value: string,
    period: string
  ) => void;
}

const periods = ["M1", "M2", "M5", "M15", "M30", "M45", "H1", "H2", "H4"];

const generateAbsoluteTimeOptions = () => {
  const now = new Date();
  const options = [];
  for (let i = 0; i < 12; i++) {
    const time = new Date(now.getTime() + (i + 1) * 60000 * 5);
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    options.push({ label: `${hours}:${minutes}`, value: `${hours}:${minutes}` });
  }
  return options;
};

function getCurrentDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${day}/${month} ${hours}:${minutes}:${seconds}`;
}

const PendingTradeModal = ({ isOpen, onClose, currentQuote, onTrade }: PendingTradeModalProps) => {
  const [activeTab, setActiveTab] = useState<"quote" | "time">("quote");
  const [quoteValue, setQuoteValue] = useState(currentQuote.toFixed(3));
  const [timeValue, setTimeValue] = useState(getCurrentDateTime());
  const [period, setPeriod] = useState("M1");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const [investment, setInvestment] = useState(100);
  const [isAbsoluteTimeMode, setIsAbsoluteTimeMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentDateTime());
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const adjustInvestment = (delta: number) => {
    setInvestment((prev) => Math.max(1, prev + delta));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = getCurrentDateTime();
      setCurrentTime(now);
      if (!isAbsoluteTimeMode) setTimeValue(now);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const absoluteTimeOptions = generateAbsoluteTimeOptions();
  const timeOptions = isAbsoluteTimeMode ? absoluteTimeOptions : durationTimeOptions;

  return (
    <div className="fixed
    top-[64px]
    z-50
    right-0 md:right-[237px]">
      <div className="bg-[#101729]
      rounded-sm
      border border-[#2a3040]
      shadow-2xl
      overflow-hidden

      w-[180px] h-auto
      px-3 py-2

      md:w-[241px]
      md:px-4 md:py-[13px]">
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition z-50"
        >
          <X size={18} />
        </button> */}

        {/* TABS */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("quote")}
            className={`flex-1 py-1 rounded-sm text-[10px] font-semibold transition-colors ${activeTab === "quote"
                ? 'bg-[#2a3040] text-white' : 'bg-[#1a1f2e] text-gray-400 hover:text-gray-300'
              }`}
          >
            QUOTE
          </button>
          <button
            onClick={() => setActiveTab("time")}
            className={`flex-1 py-1 rounded-sm text-[10px] font-semibold transition-colors ${activeTab === "time"
                ? "bg-primary text-white"
                : "bg-[#1a1f2e] text-gray-400 hover:text-gray-300"
              }`}
          >
            TIME
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {activeTab === "quote" ? (
            <div className="relative h-[30px]">
               <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#101729]">
                 Quote: </label>
             <input type="text" value={quoteValue} onChange={(e) => setQuoteValue(e.target.value)} 
             className="w-full py-2 px-3 bg-[#101729] border border-[#3a4050] rounded-sm text-white text-[12px] focus:outline-none focus:border-primary" />
              <div className="text-xs text-gray-500 mt-1">
                Current quote: {currentQuote.toFixed(3)}
              </div>
            </div>
          ) : (
            <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#101729] z-10">
                Time:
              </label>
              <input
                type="text"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="w-full py-2 px-3 bg-[#101729] border border-[#2a3040] rounded-sm text-white text-[12px] focus:outline-none focus:border-primary"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current time: {currentTime}
              </div>
            </div>
          )}

          {/* PERIOD SELECT */}
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#101729] z-10">
              Period:
            </label>
            <button
              onClick={() => setShowPeriodMenu(!showPeriodMenu)}
              className="w-full py-2 px-3 bg-[#101729] border border-[#2a3040] rounded-sm text-[12px] text-white font-semibold text-left focus:outline-none focus:border-primary"
            >
              {period}
            </button>
            {showPeriodMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#191919] border border-[#2a3040] rounded-sm overflow-hidden z-50 shadow-xl">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPeriod(p);
                        setShowPeriodMenu(false);
                      }}
                      className={`py-2 px-3 rounded text-[10px] transition-colors ${period === p
                          ? "bg-primary text-white"
                          : "bg-[#2a3040] text-gray-300 hover:bg-[#3a4050]"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* INVESTMENT */}
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[10px] text-gray-500 bg-[#101729] z-10">
              Investment
            </label>
            <div className="flex items-center justify-between bg-[#101729] border border-[#2a3040] rounded-sm p-2">
              <button
                onClick={() => adjustInvestment(-10)}
                className="w-6 h-6 rounded-sm bg-[#2a3040] flex items-center justify-center text-gray-300 hover:bg-[#3a4050] transition"
              >
                <Minus size={14} />
              </button>
              <span className="font-mono text-[14px] text-white">{investment} ₹</span>
              <button
                onClick={() => adjustInvestment(10)}
                className="w-6 h-6 rounded-sm bg-[#2a3040] flex items-center justify-center text-gray-300 hover:bg-[#3a4050] transition"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* TRADE BUTTONS */}
          <div className="space-y-3">
            <button
              onClick={() =>
                onTrade(
                  "up",
                  investment,
                  activeTab,
                  activeTab === "quote" ? quoteValue : timeValue,
                  period
                )
              }
              className="btn-press w-full py-2 px-2 rounded-sm text-[14px] bg-success hover:bg-success/90 text-white font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Up</span>
              </div>
              <ArrowUp size={16} />
            </button>

            <button
              onClick={() =>
                onTrade(
                  "down",
                  investment,
                  activeTab,
                  activeTab === "quote" ? quoteValue : timeValue,
                  period
                )
              }
              className="btn-press w-full py-2 px-2 rounded-sm bg-destructive hover:bg-destructive/90 text-white font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Put</span>
              </div>
              <ArrowDown size={18} />
            </button>
          </div>

          {/* HOW IT WORKS */}
          <button
            onClick={() => setShowHowItWorks(true)}
            className="w-full text-primary text-[10px] font-semibold hover:underline"
          >
            HOW IT WORKS?
          </button>
        </div>
      </div>

      {/* HOW IT WORKS MODAL */}
      <HowDoesModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </div>
  );
};

export default PendingTradeModal;
