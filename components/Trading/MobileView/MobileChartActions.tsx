"use client";

import { TimerReset, CircuitBoard, Signal, MoreVertical } from "lucide-react";
import { CurrencyPair, Trade } from "../../../types/trading";
import { useState } from "react";
import PendingTradeModal from "../PendingTradeModal";
import LeaderBoardModal from "../LeaderBoardModal";
import SignalTradeModal from "../SignalTradeModal";

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
const [isMoreOpen, setIsMoreOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
    {!isModalOpen && (
      <div className="md:hidden fixed top-36 left-4 z-50">
        <button
          onClick={() => setIsMoreOpen(prev => !prev)}
          className="
           absolute w-9 h-9
            flex items-center justify-center
            rounded-full
          bg-card/90
            transition
          "
        >
          <MoreVertical className="w-4 h-4 text-white" />
        </button>
      </div>
    )}
      {/* === ACTION COLUMN === */}
      {isMoreOpen && (
        <div className="
      absolute top-40 left-2 mt-2
      flex flex-col gap-2
      z-50
    ">

          <div
            onClick={() => setIsPendingTrade(!isPendingTrade)}
            className="
       bg-card/90
    w-11 h-11
    rounded-lg
    flex items-center justify-center
      rounded-sm bg-card/90 
    "
          >
            <TimerReset size={18} />
            {/* <span className="text-[6px] sm:text-[8px] text-white leading-tight pt-1">
            Pending Trade
          </span> */}
          </div>

          {/* Leader Board */}
          <div
            onClick={() => setIsLeaderBoardOpen(!isLeaderBoardOpen)}
            className="
     bg-card/90
    w-11 h-11
    rounded-lg
    flex items-center justify-center
      rounded-sm bg-card/90 
    "
          >
            <CircuitBoard className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            {/* <span className="text-[6px] sm:text-[8px] text-white leading-tight pt-1">
            Leader Board
          </span> */}
          </div>
          <div
            onClick={() => setIsSignalTrade(!isSignalTrade)}
            className="
    bg-card/90
    w-11 h-11
    rounded-lg
    flex items-center justify-center
      rounded-sm bg-card/90 
    "
          >
            <Signal className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            {/* <span className="text-[6px] sm:text-[8px] text-white leading-tight pt-1">
            Trading Signal
          </span> */}
          </div>

        </div>
      )}
      <PendingTradeModal
        isOpen={isPendingTrade}
        onClose={() => setIsPendingTrade(false)}
        currentQuote={activePair.currentPrice}
        onTrade={handlePendingTrade}
      />
      <LeaderBoardModal
        isOpen={isLeaderBoardOpen}
        onClose={() => setIsLeaderBoardOpen(false)}
        onTrade={handleLeaderBoard}
      />
      <SignalTradeModal
        isOpen={isSignalTrade}
        onClose={() => setIsSignalTrade(false)}
        onTrade={handleSignalTrade} activePair={activePair}
      />
    </>
  );
}


