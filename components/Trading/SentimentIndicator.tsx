"use client";
import { Plus } from 'lucide-react';

interface SentimentIndicatorProps {
  buyPercentage: number;
  onPlusClick: () => void;
  showPairSelector: boolean;
  children?: React.ReactNode;
}

const SentimentIndicator = ({ 
  buyPercentage, 
  onPlusClick, 
  showPairSelector,
  children 
}: SentimentIndicatorProps) => {

  const sellPercentage = 100 - buyPercentage;

  return (
    <div className="relative flex flex-col h-full py-2 items-center">

      {/* Plus → Close button */}
      <button
        onClick={onPlusClick}
        className="w-10 h-10 mb-2 rounded-sm bg-primary text-[#ffffff] hover:bg-primary/90 transition-all flex items-center justify-center"
      >
        <Plus
          size={22}
          className={`
            transition-transform duration-300
            ${showPairSelector ? "rotate-45" : "rotate-0"}
          `}
        />
      </button>

      {showPairSelector && children && (
        <div className="absolute top-12 left-0 z-50">
          {children}
        </div>
      )}

      <div className="text-[10px] font-semibold text-success mb-1 text-center">
        {buyPercentage}%
      </div>

      <div className="flex-1 w-[5px] bg-secondary rounded-full overflow-hidden flex flex-col-reverse">
        <div 
          className="w-full bg-success transition-all duration-500"
          style={{ height: `${buyPercentage}%` }}
        />
        <div 
          className="w-full bg-destructive transition-all duration-500"
          style={{ height: `${sellPercentage}%` }}
        />
      </div>
      
      <div className="text-[10px] font-semibold text-destructive mt-1 text-center">
        {sellPercentage}%
      </div>
    </div>
  );
};

export default SentimentIndicator;
