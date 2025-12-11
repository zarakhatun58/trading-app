"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, X, Flag, IndianRupee } from "lucide-react";
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
    if (!isOpen) return null; // ✅ IMPORTANT

    const [hoverUser, setHoverUser] = useState<any>(null);

    return (
        <div className="relative">

            {/* MAIN MODAL */}
            <div
                className="fixed right-[234px] top-[63px] w-[228px] h-[480px]
       bg-[#101729] border border-[#2a3040] rounded-sm shadow-xl 
        p-3  animate-slideLeft z-50"
            >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex flex-col">
                        <span className="text-[18px] text-white font-semibold">Leader Board</span>
                        <span className="text-[12px] text-[#595b65]">of the Day</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-white transition"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div>
                    <span >How does this rating work?</span>
                </div>
                <div className="bg-[#2a3040] p-2 rounded-sm transition-colors
    hover:bg-[#2a3040] mb-1">
                    <div className="flex flex-row justify-between item-center border border-b-[#595b65] mb-1 pb-1">
                        <div className="flex">
                            <div className="rounded-full w-[20px] h-[20px] bg-[#ffffff] p-1">
                                <svg width="13" height="13" viewBox="0 0 640 480">
                                    <rect width="640" height="160" fill="#ff9933" />
                                    <rect y="160" width="640" height="160" fill="#ffffff" />
                                    <rect y="320" width="640" height="160" fill="#128807" />
                                    <circle cx="320" cy="240" r="50" stroke="#000080" strokeWidth="5" fill="none" />
                                </svg>
                            </div>
                            <span className="text-[14px] pl-2">#71910310</span>
                        </div>
                        <div>
                            <span className="text-green-400 text-[14px] font-bold">$0.00</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-[10px] text-gray-400 mr-2">Your Position:</span><span className="text-[10px]">66072</span>
                    </div>
                </div>
                <div data-scroll className="overflow-y-auto h-[320px]">
                    {/* ITEMS */}
                    {currencyPairs.slice(0, 12).map((item) => {
                        const isUp = item.currentPrice > item.previousPrice;
                        const duration = Math.floor(Math.random() * 10) + 1;

                        return (
                            <div
                                key={item.id}
                                className=" flex items-center justify-between px-2 py-2 
              rounded-md hover:bg-[#2a3040] cursor-pointer transition"
                                onMouseEnter={() => setHoverUser({ ...item, duration })}
                                onMouseLeave={() => setHoverUser(null)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{item.flag}</span>

                                    <div>
                                        <p className="text-xs text-white">{item.name}</p>
                                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                            #{item.symbol}
                                            {isUp ? (
                                                <ArrowUp size={10} className="text-green-400" />
                                            ) : (
                                                <ArrowDown size={10} className="text-red-400" />
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col text-right">
                                    <p className="text-green-400 text-xs font-semibold">
                                        ${item.currentPrice}
                                    </p>
                                    <p className="text-[9px] text-gray-400">
                                        {new Date().toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* HOVER MODAL */}
            {hoverUser && (
                <div
                    className="fixed right-[455pxpx] top-[200px] w-[200px]
          bg-[#1c1c1c] border border-[#2a3040] rounded-sm shadow-lg
          p-4 animate-fade z-50"
                >
                    <h3 className="text-white text-sm font-semibold mb-1">
                        {hoverUser.name}
                    </h3>

                    <p className="text-gray-300 text-xs mb-2">ID: #{hoverUser.symbol}</p>

                    <div className="text-xs text-white space-y-1">
                        <p>
                            Current Price:{" "}
                            <span className="text-green-400">${hoverUser.currentPrice}</span>
                        </p>
                        <p>
                            Previous:{" "}
                            <span className="text-gray-400">${hoverUser.previousPrice}</span>
                        </p>
                        <p>
                            Performance:{" "}
                            <span className="text-yellow-400">{hoverUser.performance}%</span>
                        </p>

                        <p className="mt-2 text-[10px] text-blue-300">
                            Duration: {hoverUser.duration} min
                        </p>
                        <p className="text-[10px] text-purple-300">
                            Updated: {new Date().toLocaleTimeString()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderBoardModal;
