import { X } from "lucide-react";
import { CurrencyPair } from "../../types/trading";

interface WhatTradeProps {
    isOpen: boolean;
    onClose: () => void;
    
}

const WhatIsItModal = ({ isOpen, onClose, }: WhatTradeProps) => {
    if (!isOpen) return null;

    return (
        <div className="absolute left-0 right-0 mt-8 z-[999]">
            <div className="w-full bg-[#101729] py-1 px-4 rounded-md shadow-lg">
                
                {/* <div className="flex justify-between items-center mb-3">
                    <h2 className="text-white text-[18px] font-semibold">What is a Trading Signal?</h2>

                    <button onClick={onClose} className="text-gray-300 hover:text-white">
                        <X size={18} />
                    </button>
                </div> */}

                {/* Description */}
                <p className="text-gray-300 text-[13px] leading-5 mb-4">
                    A trading signal is not a direct instruction to trade, but an analyst recommendation. 
                    It should not replace independent market analysis.
                </p>

                <p className="text-gray-300 text-[13px] leading-5 mb-6">
                    You have an average of 10 minutes to take advantage of the trading signal. After this time, 
                    the quotes may change and have an unexpected effect on the trade result.
                </p>

                {/* Continue Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-[14px]"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};


export default WhatIsItModal;