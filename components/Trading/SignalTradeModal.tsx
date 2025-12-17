"use client";

import { useState } from "react";
import { X, PoundSterling, DollarSignIcon, TrendingUp, TrendingDown } from "lucide-react";
import { currencyPairs } from "../../data/mockData";
import WhatIsItModal from "./WhatIsItModal";
import { CurrencyPair } from "../../types/trading";

interface SignalTradeProps {
  isOpen: boolean;
  onClose: () => void;
  activePair: CurrencyPair;
  onTrade: (
    direction: "up" | "down",
    amount: number,
    type: "quote" | "time",
    value: string,
    period: string
  ) => void;
}

const SignalTradeModal = ({ isOpen, onClose, onTrade, activePair }: SignalTradeProps) => {
  if (!isOpen) return null;

  const [showWhatIsIt, setShowWhatIsIt] = useState(false);

  function getRandomDuration() {
    const minutes = Math.floor(Math.random() * 10) + 1;
    return `00:${String(minutes).padStart(2, "0")}`;
  }

  return (
   <div className="relative pb-2">
      {/* BACKDROP */}
      <div className="fixed
    right-0 top-[63px]
    w-[70vw]
    h-[400px]
    bg-[#101729]
    border border-[#2a3040]
    rounded-sm shadow-xl p-3
    z-50

    flex flex-col
    overflow-hidden

    md:right-[234px]
    md:w-[246px]
    md:h-[480px]

    animate-slideLeft" >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-lg text-white font-semibold">Trading Signal</span>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        {/* What is it */}
        <button
          className="mb-4 flex justify-end text-xs text-primary"
          onClick={() => setShowWhatIsIt(prev => !prev)}
        >
          What is it?
        </button>
        <WhatIsItModal
          isOpen={showWhatIsIt}
          onClose={() => setShowWhatIsIt(false)}
        />

        {/* CONTENT */}
        <div data-scroll className="bsolute overflow-y-auto pb-8 mt-3 w-[93%]
    h-[275px]
    md:h-[300px] ">
          {/* CURRENT SIGNALS */}
          {currencyPairs.slice(0, 12).map(item => {
            const isUp = item.currentPrice > item.previousPrice;
            const duration = getRandomDuration();
            return (
              <div
                key={item.id}
                className="flex flex-col px-2 py-2 cursor-pointer rounded-md hover:bg-[#2a3040] transition mb-2"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <PoundSterling size={20} className="text-green-500 rounded-full bg-white p-2" />
                    <DollarSignIcon size={20} className="text-green-500 rounded-full bg-white p-2 -ml-2" />
                    <span className="font-bold text-white text-sm">{item.name}</span>
                  </div>
                  {isUp ? (
                    <TrendingUp size={20} className="text-green-400" />
                  ) : (
                    <TrendingDown size={20} className="text-red-400" />
                  )}
                </div>
                <div className="flex justify-between text-gray-400 text-xs">
                  <span>Duration: {duration}</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            );
          })}

          {/* PAST SIGNALS */}
          <h2 className="text-center text-white text-sm mt-2 mb-2">Past Signals</h2>
          {currencyPairs.slice(0, 12).map(item => {
            const isUp = item.currentPrice > item.previousPrice;
            const duration = getRandomDuration();
            return (
              <div
                key={item.id}
                className="flex flex-col px-2 py-2 mb-2 bg-black rounded-md hover:bg-[#2a3040] transition"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <PoundSterling size={20} className="text-green-500 rounded-full bg-white p-2" />
                    <DollarSignIcon size={20} className="text-green-500 rounded-full bg-white p-2 -ml-2" />
                    <span className="font-bold text-white text-sm">{item.name}</span>
                  </div>
                  {isUp ? (
                    <TrendingUp size={20} className="text-green-400" />
                  ) : (
                    <TrendingDown size={20} className="text-red-400" />
                  )}
                </div>
                <div className="flex justify-between text-gray-400 text-xs">
                  <span>Duration: {duration}</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SignalTradeModal;
