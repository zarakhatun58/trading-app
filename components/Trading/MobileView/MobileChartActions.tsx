"use client";

import { TimerReset, CircuitBoard, Signal } from "lucide-react";
import { CurrencyPair, Trade } from "../../../types/trading";
import { useState } from "react";

interface TradingPanelProps {
  activePair: CurrencyPair;
  onTrade: (direction: 'up' | 'down', amount: number, time: number) => void;
  balance: number;
  isLiveAccount: boolean;
  onTradeZone?: (zone: 'up' | 'down' | null) => void;
  trades?: Trade[];
  onSellTrade?: (tradeId: string) => void;
}

export default function MobileChartActions({
 activePair,
  onTrade,
  balance,
  isLiveAccount,
  onTradeZone,
  trades = [],
  onSellTrade
}: TradingPanelProps) {
   const [tradeTime, setTradeTime] = useState(60);
    const [isPendingTrade, setIsPendingTrade] = useState(false);
    const [isSignalTrade, setIsSignalTrade] = useState(false);
    const [isLeaderBoardOpen, setIsLeaderBoardOpen] = useState(false);
    const handlePendingTrade = (direction: 'up' | 'down', amount: number, type: 'quote' | 'time', value: string, period: string) => {
    onTradeZone?.(direction);
    onTrade(direction, amount, tradeTime);
    setIsPendingTrade(false);
  };
  const handleLeaderBoard = (direction: 'up' | 'down', amount: number, type: 'quote' | 'time', value: string, period: string) => {
    onTradeZone?.(direction);
    onTrade(direction, amount, tradeTime);
    setIsLeaderBoardOpen(false);
  };
  const handleSignalTrade = (direction: 'up' | 'down', amount: number, type: 'quote' | 'time', value: string, period: string) => {
    onTradeZone?.(direction);
    onTrade(direction, amount, tradeTime);
    setIsSignalTrade(false);
  };
  return (
    <div
      className="
        md:hidden
        absolute
        top-2
        right-2
        z-50
        flex gap-2
      "
    >
      
          <div
            onClick={() => setIsPendingTrade(!isPendingTrade)}
            className="
      btn-press flex flex-col items-center justify-center
      rounded-sm bg-[#3a4050] hover:bg-[#4a5060] transition font-semibold text-sidebar-foreground
      w-[60px] h-[38px]
      sm:w-[70px] sm:h-[38px]
    "
          >
            <TimerReset className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="text-[6px] sm:text-[8px] text-white leading-tight pt-1">
              Pending Trade
            </span>
          </div>

          {/* Leader Board */}
          <div
            onClick={() => setIsLeaderBoardOpen(!isLeaderBoardOpen)}
            className="
      btn-press flex flex-col items-center justify-center
      rounded-sm bg-[#3a4050] hover:bg-[#4a5060] transition font-semibold text-sidebar-foreground
      w-[60px] h-[38px]
      sm:w-[70px] sm:h-[38px]
    "
          >
            <CircuitBoard className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="text-[6px] sm:text-[8px] text-white leading-tight pt-1">
              Leader Board
            </span>
          </div>
          <div
            onClick={() => setIsSignalTrade(!isSignalTrade)}
            className="
      btn-press flex flex-col items-center justify-center
      rounded-sm bg-[#3a4050] hover:bg-[#4a5060] transition font-semibold text-sidebar-foreground
      w-[56px] h-[38px]
      sm:w-[70px] sm:h-[38px]
    "
          >
            <Signal className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="text-[6px] sm:text-[8px] text-white leading-tight pt-1">
              Trading Signal
            </span>
          </div>

        </div>
   
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        btn-press
        w-[46px] h-[38px]
        bg-[#3a4050] hover:bg-[#4a5060]
        rounded-sm
        flex flex-col items-center justify-center
      "
    >
      <Icon size={16} className="text-white" />
      <span className="text-[6px] text-white mt-0.5">{label}</span>
    </button>
  );
}
