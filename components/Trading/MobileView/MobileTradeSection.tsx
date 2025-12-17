import { useState } from "react";
import { CurrencyPair, Trade } from "../../../types/trading";
import { ArrowRightLeft, Clock, ShoppingCart, X } from "lucide-react";

interface TradingPanelProps {
  activePair: CurrencyPair;
  onTrade: (direction: 'up' | 'down', amount: number, time: number) => void;
  balance: number;
  isLiveAccount: boolean;
  onTradeZone?: (zone: 'up' | 'down' | null) => void;
  trades?: Trade[];
  onSellTrade?: (tradeId: string) => void;
}

const MobileTradeSection = ({
  activePair,
  trades = [],
}: TradingPanelProps) => {
  const pendingTrades = trades.filter(t => t.status === "pending");
  const [activeTradesTab, setActiveTradesTab] =
    useState<"trades" | "orders">("trades");
  const [open, setOpen] = useState(false);
  const [isAbsoluteTimeMode, setIsAbsoluteTimeMode] = useState(false);
  const tradeCount = pendingTrades.length;
  const orderCount = 0;
  const [tradeTime, setTradeTime] = useState(60);
  const formatTime = (seconds: number) => {
    if (isAbsoluteTimeMode) {
      // Show as absolute time (e.g., 10:43)
      const now = new Date();
      const futureTime = new Date(now.getTime() + seconds * 1000);
      return `${futureTime.getHours().toString().padStart(2, '0')}:${futureTime.getMinutes().toString().padStart(2, '0')}`;
    }
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
    <>
      <button
        onClick={() => setOpen(true)}
        className="
    md:hidden
    fixed
   left-4
    top-24
    z-40
   bg-card/90
    w-11 h-11
    rounded-lg
    flex items-center justify-center
    absolute
  "
      >
        {/* MAIN TRADE ICON */}
        <ArrowRightLeft size={18} className="text-white" />

        {/* CLOSE ICON INSIDE BUTTON */}
        {open && (
          <span
            onClick={(e) => {
              e.stopPropagation(); // IMPORTANT
              setOpen(false);
            }}
            className="
        absolute
        top-1
        right-1
        w-4 h-4
        rounded-full
        bg-blue-500
        flex items-center justify-center
      "
          >
            <X size={10} className="text-white" />
          </span>
        )}
      </button>

      <div
        className={`
           md:hidden
    fixed left-0 bottom-8 z-50
    w-full h-[50vh]
    bg-[#2b3040]
    border-t border-[#2a3040]
    rounded-t-2xl
    transform transition-transform duration-300 ease-out
    ${open ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="bg-[#2b3040] rounded-lg">
          <div className={`flex-1  border border-[#2a3040] bg-[#2b3040] rounded-lg
    overflow-hidden transition-all duration-500
    
  `}>
            <div className="flex items-center justify-between border-b border-[#2a3040]">
              <button
                onClick={() => setActiveTradesTab('trades')}
                className={`flex items-center gap-2 p-2 rounded-lg 
    ${activeTradesTab === 'trades'
                    ? 'text-white border-t-2 border-[#3b82f6]'
                    : 'text-gray-500 border-t-2 border-transparent'
                  }`}
              >
                <ArrowRightLeft size={14} />
                <span className="text-xs font-medium">Trades</span>
                <span className="text-[10px] bg-[#2a3040] px-2 py-0.5 rounded">{tradeCount}</span>
              </button>

              <button
                onClick={() => setActiveTradesTab('orders')}
                className={`flex items-center gap-2 p-2 rounded-lg 
    ${activeTradesTab === 'orders'
                    ? 'text-white border-t-2 border-[#3b82f6]'
                    : 'text-gray-500 border-t-2 border-transparent'
                  }`}
              >
                <Clock size={14} />
                <span className="text-xs font-medium">Orders</span>
                <span className="text-[10px] bg-[#2a3040] px-2 py-0.5 rounded">{orderCount}</span>
              </button>
            </div>
            {/* Trade History Item Example */}
            {activeTradesTab === "trades" && (
              <div className="p-2 text-[10px] text-gray-500">
                <div className="mb-2">5 DECEMBER <span className="bg-[#2a3040] px-1 rounded">0</span></div>
                <div className="flex items-center justify-between py-2 border-b border-[#2a3040]">
                  <div className="flex items-center gap-2">
                    <span>{activePair.flag}</span>
                    <span className="text-white text-xs">{activePair.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400">{formatTime(tradeTime)}</div>
                    <div className="text-success text-xs">0.00 $</div>
                  </div>
                </div>

                <div className="h-16 mt-2 flex items-end justify-around">
                  {[20, 35, 25, 40, 30, 45, 35, 50, 40, 55].map((h, i) => (
                    <div key={i} className="w-1 bg-primary/50 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#2a3040] flex items-center justify-center mb-3">
                <ShoppingCart size={20} className="text-gray-500" />
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed flex-1 overflow-y-auto">
                {activeTradesTab === 'trades'
                  ? "You don't have a trade history yet. You can open a trade using the form above."
                  : "Order list is empty. Create a pending trade using the form above."}
              </p>
            </div>

          </div>
          {/* <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex justify-center py-1.5 md:py-2 text-gray-400 hover:text-white transition border-t border-[#2a3040]"
        >
          <ChevronDown size={16} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button> */}
        </div>

        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="w-full py-2 border-t border-[#2a3040] text-gray-400"
        >
          <X size={12} />
        </button>
      </div>
    </>
  );
};





export default MobileTradeSection;