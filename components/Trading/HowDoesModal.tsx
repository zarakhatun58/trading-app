import React from "react";
import { AlarmClock, X } from "lucide-react";

interface HowDoesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowDoesModal = ({ isOpen, onClose }: HowDoesModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-[#191919] w-[400px] p-4 rounded-lg border border-[#2a3040] shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-bold text-white mb-3 flex flex-row "> <AlarmClock size={20} className="text-orange-400 mr-4"/>Pending Trade</h2>

        <div data-scroll className="text-[12px] text-gray-300 leading-relaxed space-y-3 max-h-[300px] overflow-y-auto pr-2">

          <p>   
            A pending trade is an order that is activated in the future 
            under pre-set conditions, such as a price level (quote) 
            or a certain time.
          </p>

          <p>
            In the drop-down window you can switch the type of pending trade, 
            as well as set the necessary parameters.
          </p>

          <p>
            As with a regular trade, you determine its duration and the 
            size of the investment. This provides full control over your trades, 
            allowing you to fine-tune the parameters according to your strategy 
            and market forecasts.
          </p>

          <p>
            It is important to choose the time and price levels wisely to 
            maximize the efficiency of your trading and achieve the desired results.
          </p>

          <p className="font-bold text-primary">
            Important!
          </p>

          <p>
            When the required parameters are reached, the trade is opened 
            at the next price update.
          </p>

          <p>
            It means that if you set the opening at the price of 100.00, 
            the platform realizes that the condition has been reached, and 
            the trade will be opened at the next update of the asset price 
            (for example, at 101.00 or 98.00).
          </p>

        </div>
      </div>
    </div>
  );
};

export default HowDoesModal;
