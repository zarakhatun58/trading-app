import { useState } from 'react';
import { Pin, ChevronDown, Plus, Minus, ArrowUp, ArrowDown } from 'lucide-react';
import TradePairSelector from '../TradePairSelector';
import { CurrencyPair } from '../../../types/trading';


interface SelectedTradeBoxProps {
  pair: CurrencyPair;
  pairs: CurrencyPair[];
  onSelectPair: (pairId: string) => void;
  onTrade: (direction: 'up' | 'down') => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

 const MobileTradePairSelector = ({
  pair,
  pairs,
  onSelectPair,
  onTrade,
  isPinned,
  onTogglePin
}: SelectedTradeBoxProps) => {
  const [showPairSelector, setShowPairSelector] = useState(false);
  const [isPendingTrade, setIsPendingTrade] = useState(false);
  const [tradeTime, setTradeTime] = useState(60);
  const [investment, setInvestment] = useState(1);
  const [isPercentMode, setIsPercentMode] = useState(true);

  const formatTime = (seconds: number) => {
    if (seconds >= 3600) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:00`;
  };

  return (
    <div className="bg-[#1a1f2e] border border-[#2a3040] rounded-xl p-4 w-[260px] relative">
      {/* Header with pair info, pin and dropdown */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{pair.flag}</span>
          <span className="font-semibold text-white text-sm">{pair.name}</span>
          <span className="text-xs text-gray-400">{pair.performance}%</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onTogglePin}
            className={`p-1.5 rounded hover:bg-[#2a3040] transition-colors ${isPinned ? 'text-primary' : 'text-gray-400'}`}
            title={isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin size={14} className={isPinned ? 'fill-current' : ''} />
          </button>
          <button
            onClick={() => setShowPairSelector(!showPairSelector)}
            className="p-1.5 rounded hover:bg-[#2a3040] transition-colors text-gray-400"
            title="Change pair"
          >
            <ChevronDown size={14} className={showPairSelector ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>

      {/* Pair Selector Dropdown */}
      {showPairSelector && (
        <div className="absolute top-14 left-0 z-50">
          <TradePairSelector
            isOpen={showPairSelector}
            onClose={() => setShowPairSelector(false)}
            pairs={pairs}
            selectedPairs={[pair.id]}
            onSelectPair={(pairId) => {
              onSelectPair(pairId);
              setShowPairSelector(false);
            }}
          />
        </div>
      )}

      {/* Pending Trade Toggle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="text-[10px] text-primary font-semibold">PENDING TRADE</span>
        </div>
        <button 
          onClick={() => setIsPendingTrade(!isPendingTrade)}
          className={`w-10 h-5 rounded-full transition-colors relative ${isPendingTrade ? 'bg-primary' : 'bg-[#3a4050]'}`}
        >
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isPendingTrade ? 'right-0.5' : 'left-0.5'}`}></span>
        </button>
      </div>

      {/* Time */}
      <div className="mb-3">
        <div className="relative">
          <label className="absolute -top-1 left-3 px-1 text-[10px] text-gray-500 bg-[#1a1f2e] z-10">
            Time
          </label>
          <div className="flex items-center justify-between bg-[#2a3040] border border-[#3a4050] rounded-lg p-2 mt-1">
            <button 
              onClick={() => setTradeTime(prev => Math.max(5, prev - 30))}
              className="w-6 h-6 rounded-full bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
            >
              <Minus size={10} />
            </button>
            <span className="font-mono text-white text-sm">{formatTime(tradeTime)}</span>
            <button 
              onClick={() => setTradeTime(prev => Math.min(14400, prev + 30))}
              className="w-6 h-6 rounded-full bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
            >
              <Plus size={10} />
            </button>
          </div>
          <button className="text-primary text-[10px] font-semibold mt-1 ml-3 hover:underline">
            SWITCH TIME
          </button>
        </div>
      </div>

      {/* Investment */}
      <div className="mb-3">
        <div className="relative">
          <label className="absolute -top-1 left-3 px-1 text-[10px] text-gray-500 bg-[#1a1f2e] z-10">
            Investment
          </label>
          <div className="flex items-center justify-between bg-[#2a3040] border border-[#3a4050] rounded-lg p-2 mt-1">
            <button 
              onClick={() => setInvestment(prev => Math.max(1, prev - 1))}
              className="w-6 h-6 rounded-full bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
            >
              <Minus size={10} />
            </button>
            <span className="font-mono text-white text-sm">
              {isPercentMode ? `${investment} %` : `${investment} ₹`}
            </span>
            <button 
              onClick={() => setInvestment(prev => prev + 1)}
              className="w-6 h-6 rounded-full bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
            >
              <Plus size={10} />
            </button>
          </div>
          <button 
            onClick={() => setIsPercentMode(!isPercentMode)}
            className="text-primary text-[10px] font-semibold mt-1 ml-3 hover:underline"
          >
            SWITCH
          </button>
        </div>
      </div>

      {/* Trade Buttons - Stacked */}
      <div className="space-y-2">
        <button 
          onClick={() => onTrade('up')}
          className="w-full h-12 bg-success hover:bg-success/90 rounded-lg flex items-center justify-between px-4 transition-colors"
        >
          <span className="text-white font-semibold">Up</span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowUp size={14} className="text-white" />
          </div>
        </button>

        {/* Payout */}
        <div className="text-center py-1">
          <span className="text-xs text-gray-400">Your payout: </span>
          <span className="text-xs font-semibold text-white">15000.00 ₹</span>
        </div>
        <div className="text-center pb-2">
          <span className="text-[10px] text-gray-500">Investment: 10,000.00 ₹</span>
        </div>

        <button 
          onClick={() => onTrade('down')}
          className="w-full h-12 bg-destructive hover:bg-destructive/90 rounded-lg flex items-center justify-between px-4 transition-colors"
        >
          <span className="text-white font-semibold">Down</span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowDown size={14} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};



export default MobileTradePairSelector;