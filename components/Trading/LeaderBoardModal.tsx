"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, X, Flag, IndianRupee, BarChart3, User } from "lucide-react";
import { currencyPairs } from "../../data/mockData";
import Image from "next/image";

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
        <div className="relative pb-2">

            {/* MAIN MODAL */}
            <div
                className="fixed right-[237px] top-[63px] w-[246px] h-[480px]
       bg-[#101729] border border-[#2a3040] rounded-sm shadow-xl 
        p-3 animate-slideLeft z-50"
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
                <div className="bg-primary/20 text-primary p-2 rounded-sm flex flex-row mb-1">
                    <BarChart3 size={20} /> <span className="ml-2 text-[10px] font-semibold">How does this rating work?</span>
                </div>
                <div data-scroll className="absolute overflow-y-auto h-[275px]">
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
                                    <div className="rounded-full w-[20px] h-[20px] bg-yellow-300 flex items-center justify-center">
                                        <span className="text-[8px] font-bold">{item.rank}</span>
                                    </div>

                                    <span className="relative flex flex-row">
                                        <span
                                            className="w-[20px] h-[20px] text-green-500 rounded-full bg-white p-2 text-[5px]"
                                        >{item.flag}</span>
                                        <User
                                            size={20}
                                            className="text-green-500 rounded-full bg-white p-2 ml-[-10px]"
                                        />
                                    </span>
                                    <div>
                                        <p className="text-xs text-white">{item.name}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col text-right">
                                    <p className="text-green-400 text-xs font-semibold">
                                        ${item.currentPrice}
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
                    className="fixed right-[450px] top-[200px] w-[300px]
          bg-[#2a3040] border border-[#2a3040] rounded-sm shadow-lg
          p-4 animate-fade z-50"
                >
                    <div className="flex flex-row justify-start">
                        <div className=""><User
                            className="rounded-full object-cover w-[40px] h-[40px] border border-[#ffffff] p-2"
                        /></div>
                        <div className="flex flex-col pl-4">
                            <span className="text-gray-400 text-[12px]">{hoverUser.country}</span>
                            <span className="text-gray-200 text-[14px]">{hoverUser.name}</span>
                        </div>
                    </div>

                    <div className="text-white space-y-4 ">
                        <div className="flex flex-row justify-between border border-b-[#595b65] mb-2 pb-2 mt-4">
                            <div className="flex flex-col justify-start ">
                                <span className="text-[16px] font-bold">{hoverUser.tradeCount}54</span>
                                <span className="text-[12px]">Trade Counts</span>
                            </div>
                            <div className="flex flex-col justify-start">
                                <span className="text-[16px] font-bold">{hoverUser.tradeCount}96</span>
                                <span className="text-[12px]">Profitable Trades</span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between border border-b-[#595b65] mb-2 pb-2">
                            <div className="flex flex-col justify-start">
                                <span className="text-[16px] font-bold">{hoverUser.tradeCount}0</span>
                                <span className="text-[12px]">Trade Profit</span>
                            </div>
                            <div className="flex flex-col justify-start">
                                <span className="text-[16px] font-bold">{hoverUser.tradeCount}0</span>
                                <span className="text-[12px]">Avarege Profit</span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mb-2 pb-2">
                            <div className="flex flex-col justify-start">
                                <span className="text-[16px] font-bold">${hoverUser.previousPrice}</span>
                                <span className="text-[12px]">Min Trade Amount</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[16px] font-bold">${hoverUser.currentPrice}</span>
                                <span className="text-[12px]">Max Trade Amount</span>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderBoardModal;
