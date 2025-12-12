import { ArrowUp, ArrowDown, X, Flag, IndianRupee, BarChart3, PoundSterling, DollarSignIcon, TrendingUp, TrendingDown } from "lucide-react";
import { currencyPairs } from "../../data/mockData";
import { cn } from "../../libs/utils";
import { CurrencyPair } from "../../types/trading";
import { useState } from "react";
import WhatIsItModal from "./WhatIsItModal";

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
        const minutes = Math.floor(Math.random() * 10) + 1; // 1–10
        return `00:${String(minutes).padStart(2, "0")}`;
    }

    return (
        <div className="relative pb-2">

            {/* MAIN MODAL */}
            <div
                className="fixed right-[234px] top-[63px] w-[246px] h-[480px]
       bg-[#101729] border border-[#2a3040] rounded-sm shadow-xl 
        p-3 animate-slideLeft z-50"
            >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-1">
                    <div className="flex flex-col">
                        <span className="text-[18px] text-white font-semibold">Trading Signal</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-white transition"
                    >
                        <X size={18} />
                    </button>
                </div>
                <button className="mb-4 flex float-right justify-end"  onClick={() => setShowWhatIsIt(prev => !prev)}>
                    <span className="text-[12px] text-primary ">What is it?</span>
                </button>
                <WhatIsItModal
                    isOpen={showWhatIsIt}
                    onClose={() => setShowWhatIsIt(false)}
                />
                <div
                    data-scroll
                    className="absolute overflow-y-auto h-[380px] mb-4 mt-3 w-[93%] "
                >
                    {/* CURRENT SIGNALS */}
                    {currencyPairs.slice(0, 12).map((item) => {
                        const isUp = item.currentPrice > item.previousPrice;
                        const duration = getRandomDuration(); // dynamic duration

                        return (
                            <div
                                key={item.id}
                                className="flex flex-col justify-between px-2 py-2 cursor-pointer transition"
                            >
                                <div className="flex flex-col justify-between cursor-pointer rounded-md hover:bg-[#2a3040] p-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex flex-row">
                                                <PoundSterling
                                                    size={20}
                                                    className="text-green-500 rounded-full bg-white p-2"
                                                />
                                                <DollarSignIcon
                                                    size={20}
                                                    className="text-green-500 rounded-full bg-white p-2 ml-[-10px]"
                                                />
                                            </span>
                                            <span className="font-bold text-white text-[14px]">
                                                {item.name}
                                            </span>
                                        </div>

                                        {/* Trend Icon */}
                                        <p className="text-[10px] text-gray-400">
                                            {isUp ? (
                                                <TrendingUp size={20} className="text-green-400" />
                                            ) : (
                                                <TrendingDown size={20} className="text-red-400" />
                                            )}
                                        </p>
                                    </div>

                                    {/* Duration + Time */}
                                    <div className="flex flex-row justify-between">
                                        <p className="text-gray-400 text-[9px] font-semibold">
                                            Duration: <span>{duration}</span>
                                        </p>
                                        <p className="text-[9px] text-gray-400">
                                            {new Date().toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* PAST SIGNALS TITLE */}
                    <h2 className="text-[12px] text-center text-white mt-2 mb-2">
                        Past Signals
                    </h2>

                    {/* PAST SIGNALS LIST */}
                    {currencyPairs.slice(0, 12).map((item) => {
                        const isUp = item.currentPrice > item.previousPrice;
                        const duration = getRandomDuration();

                        return (
                            <div
                                key={item.id}
                                className="flex flex-col justify-between px-2 py-2 mb-2 bg-black rounded-md hover:bg-[#2a3040] transition p-2 mr-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex flex-row">
                                            <PoundSterling
                                                size={20}
                                                className="text-green-500 rounded-full bg-white p-2"
                                            />
                                            <DollarSignIcon
                                                size={20}
                                                className="text-green-500 rounded-full bg-white p-2 ml-[-10px]"
                                            />
                                        </span>
                                        <span className="font-bold text-white text-[14px]">{item.name}</span>
                                    </div>

                                    <p className="text-[10px] text-gray-400">
                                        {isUp ? (
                                            <TrendingUp size={20} className="text-green-400" />
                                        ) : (
                                            <TrendingDown size={20} className="text-red-400" />
                                        )}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="text-gray-400 text-[9px] font-semibold">
                                        Duration: <span>{duration}</span>
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

        </div>
    );
};

export default SignalTradeModal;