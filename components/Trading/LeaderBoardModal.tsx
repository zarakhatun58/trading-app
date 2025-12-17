"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, X, BarChart3, User } from "lucide-react";
import { currencyPairs } from "../../data/mockData";

interface LeaderBoardProps {
  isOpen: boolean;
  onClose: () => void;
  onTrade: (
    direction: "up" | "down",
    amount: number,
    type: "quote" | "time",
    value: string,
    period: string
  ) => void;
}

const LeaderBoardModal = ({ isOpen, onClose, onTrade }: LeaderBoardProps) => {
  const [hoverUser, setHoverUser] = useState<any>(null);

  if (!isOpen) return null;

  return (
    <div className="relative pb-2 ">
      {/* BACKDROP */}
      <div className=" fixed
    right-0 top-[63px]
    w-[70vw] h-[400px]
    bg-[#101729]
    border border-[#2a3040]
    rounded-sm shadow-xl p-3
    z-50

    md:right-[234px]
    md:w-[246px]
    md:h-[480px]

    animate-slideLeft" >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <span className="text-lg text-white font-semibold">Leader Board</span>
            <span className="text-xs text-[#595b65]">of the Day</span>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        {/* Your Position */}
        <div className="bg-[#2a3040] p-2 rounded-sm mb-2">
          <div className="flex justify-between items-center border-b border-b-[#595b65] pb-1 mb-1">
            <div className="flex items-center gap-2">
              <div className="rounded-full w-6 h-6 bg-white p-1 flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 640 480">
                  <rect width="640" height="160" fill="#ff9933" />
                  <rect y="160" width="640" height="160" fill="#ffffff" />
                  <rect y="320" width="640" height="160" fill="#128807" />
                  <circle cx="320" cy="240" r="50" stroke="#000080" strokeWidth="5" fill="none" />
                </svg>
              </div>
              <span className="text-sm text-white">#71910310</span>
            </div>
            <span className="text-green-400 font-bold text-sm">$0.00</span>
          </div>
          <div className="text-xs text-gray-400">
            Your Position: <span className="text-white">66072</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-primary/20 text-primary p-2 rounded-sm flex items-center mb-2 text-xs">
          <BarChart3 size={16} />
          <span className="ml-2 font-semibold">How does this rating work?</span>
        </div>

        {/* Leaderboard List */}
        <div data-scroll className="absolute overflow-y-auto pb-8 mt-3 w-[93%]
    h-[175px]
    md:h-[280px]">
          {currencyPairs.slice(0, 12).map((item) => {
            const duration = Math.floor(Math.random() * 10) + 1;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-[#2a3040] cursor-pointer transition"
                onMouseEnter={() => setHoverUser({ ...item, duration })}
                onMouseLeave={() => setHoverUser(null)}
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-5 h-5 bg-yellow-300 flex items-center justify-center">
                    <span className="text-[8px] font-bold">{item.rank}</span>
                  </div>
                  <div className="relative flex items-center">
                    <User
                      size={20}
                      className="text-green-500 rounded-full bg-white p-1 ml-[-6px]"
                    />
                  </div>
                  <p className="text-xs text-white">{item.name}</p>
                </div>
                <p className="text-green-400 text-xs font-semibold">${item.currentPrice}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* HOVER MODAL (adjusts for mobile) */}
      {hoverUser && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 md:right-[450px] w-full max-w-xs md:w-[300px] bg-[#2a3040] border border-[#2a3040] rounded-md shadow-lg p-4 animate-fade z-50">
          <div className="flex items-center gap-4 mb-4">
            <User className="rounded-full w-10 h-10 p-2 border border-white" />
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">{hoverUser.country}</span>
              <span className="text-white font-medium">{hoverUser.name}</span>
            </div>
          </div>

          <div className="text-white space-y-4 text-xs">
            <div className="flex justify-between border-b border-b-[#595b65] pb-2">
              <div className="flex flex-col">
                <span className="font-bold">{hoverUser.tradeCount}54</span>
                <span>Trade Counts</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{hoverUser.tradeCount}96</span>
                <span>Profitable Trades</span>
              </div>
            </div>

            <div className="flex justify-between border-b border-b-[#595b65] pb-2">
              <div className="flex flex-col">
                <span className="font-bold">{hoverUser.tradeCount}0</span>
                <span>Trade Profit</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{hoverUser.tradeCount}0</span>
                <span>Average Profit</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="font-bold">${hoverUser.previousPrice}</span>
                <span>Min Trade Amount</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">${hoverUser.currentPrice}</span>
                <span>Max Trade Amount</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoardModal;
