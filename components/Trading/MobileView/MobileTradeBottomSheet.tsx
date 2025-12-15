'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown, Plus, Minus, Clock, ShoppingCart, CreditCard, Receipt, User, LogOut, ArrowRightLeft, TrendingDown, TrendingUp, ArrowUpCircle, ArrowDownCircle, ChevronUp, ChevronDown, DollarSign, PoundSterling, DollarSignIcon, Settings, TimerReset, Signal, CircuitBoard } from 'lucide-react';
import { CurrencyPair, Trade } from '../../../types/trading';
import { cn } from '../../../libs/utils';
import { Switch } from '../../ReusableUI/switch';
import SwitchTimeMenu from '../SwitchTimeMenu';
import InvestmentMenu from '../InvestmentMenu';
import PendingTradeModal from '../PendingTradeModal';
import LeaderBoardModal from '../LeaderBoardModal';
import SignalTradeModal from '../SignalTradeModal';
import WhatIsItModal from '../WhatIsItModal';


interface TradingPanelProps {
  activePair: CurrencyPair;
  onTrade: (direction: 'up' | 'down', amount: number, time: number) => void;
  balance: number;
  isLiveAccount: boolean;
  onTradeZone?: (zone: 'up' | 'down' | null) => void;
  trades?: Trade[];
  onSellTrade?: (tradeId: string) => void;
}
export default function MobileTradeBottomSheet({
  activePair,
  onTrade,
  balance,
  isLiveAccount,
  onTradeZone,
  trades = [],
  onSellTrade
}: TradingPanelProps) {
      const [expanded, setExpanded] = useState(false);
  const [investment, setInvestment] = useState(100);
  const [tradeTime, setTradeTime] = useState(60);
  const [isPendingTrade, setIsPendingTrade] = useState(false);
  const [isSignalTrade, setIsSignalTrade] = useState(false);
  const [isLeaderBoardOpen, setIsLeaderBoardOpen] = useState(false);
  const [isTradeSignal, setIsTradeSignal] = useState(false);
  const [payout] = useState(1.88);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [showInvestmentMenu, setShowInvestmentMenu] = useState(false);
  const [isAbsoluteTimeMode, setIsAbsoluteTimeMode] = useState(false);
  const [isPercentMode, setIsPercentMode] = useState(false);
  const [activeTradesTab, setActiveTradesTab] = useState<'trades' | 'orders'>('trades');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [upHovered, setUpHovered] = useState(false);
  const [downHovered, setDownHovered] = useState(false);
  const [showWhatIsIt, setShowWhatIsIt] = useState(false);
  const pendingTrades = trades.filter(t => t.status === 'pending');
  const tradeCount = pendingTrades.length;
  const orderCount = 0;

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

  const adjustTime = (delta: number) => {
    setTradeTime(prev => Math.max(5, Math.min(14400, prev + delta)));
  };

  const adjustInvestment = (delta: number) => {
    if (isPercentMode) {
      setInvestment(prev => Math.max(1, Math.min(100, prev + delta)));
    } else {
      setInvestment(prev => Math.max(1, prev + delta));
    }
  };

  const calculatedPayout = isPercentMode
    ? ((balance * (investment / 100)) * payout).toFixed(2)
    : (investment * payout).toFixed(2);

  const displayInvestment = isPercentMode
    ? `${investment} %`
    : `${investment} ₹`;

  const toggleTimeMode = () => {
    setIsAbsoluteTimeMode(!isAbsoluteTimeMode);
    setShowTimeMenu(true);
  };

  const toggleInvestmentMode = () => {
    setIsPercentMode(!isPercentMode);
    setInvestment(isPercentMode ? 100 : 1);
  };

  const handleUpClick = () => {
    onTradeZone?.('up');
    onTrade('up', investment, tradeTime)

  };

  const handleDownClick = () => {
    onTradeZone?.('down');
    onTrade('down', investment, tradeTime);
  };


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
  const handleWhatIs = (direction: 'up' | 'down', amount: number, type: 'quote' | 'time', value: string, period: string) => {
    onTradeZone?.(direction);
    onTrade(direction, amount, tradeTime);
    setShowWhatIsIt(false);
  };

  const accountMenuItems = [
    { id: 'deposit', label: 'Deposit', icon: Plus },
    { id: 'withdrawal', label: 'Withdrawal', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'trades', label: 'Trades', icon: ArrowUp },
    { id: 'account', label: 'Account', icon: User },
  ];
  const groupedTrades = pendingTrades.reduce((acc, trade) => {
    const date = new Date(trade.timestamp).toLocaleDateString('en-US', { day: 'numeric', month: 'long' }).toUpperCase();
    if (!acc[date]) acc[date] = [];
    acc[date].push(trade);
    return acc;
  }, {} as Record<string, Trade[]>);



  return (
    <div
      className={cn(
        'fixed bottom-[60px] left-0 right-0 z-50 md:hidden',
        'bg-[#2b3040] border-t border-[#2a3040]',
        'transition-transform duration-300',
        expanded ? 'translate-y-0' : 'translate-y-[60%]'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* HANDLE */}
      <div
        className="flex justify-center py-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-10 h-1.5 bg-[#4a5060] rounded-full" />
      </div>

      <div className="px-3 pb-3 space-y-3">
        {/* TIME + INVESTMENT */}
        <div className="grid grid-cols-2 gap-2">
          <div className="py-3 border-b border-[#2a3040]">
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 text-[11px] text-[#8b93a7] bg-[#2b3040] z-10 font-bold">
                Time
              </label>
              <div className="
      flex items-center justify-between
      bg-[#2a3040]
      border border-[#3a4050]
      rounded-sm
      px-3 py-3 mt-1
    ">
                <button
                  onClick={() => adjustTime(-30)}
                  className="
          w-7 h-7 rounded-sm
          bg-[#3a4050] 
          flex items-center justify-center 
          text-gray-300 
          hover:bg-[#4a5060] 
          transition font-bold btn-press
        "
                >
                  <Minus size={16} className='font-bold' />
                </button>

                {/* Time Display */}
                <div className="flex items-center gap-1">
                  <Clock size={15} className="text-gray-400" />
                  <button
                    onClick={() => setShowTimeMenu(!showTimeMenu)}
                    className="flex items-center gap-1"
                  >
                    <span className="font-mono text-white text-sm">{formatTime(tradeTime)}</span>
                  </button>
                </div>

                {/* Plus */}
                <button
                  onClick={() => adjustTime(30)}
                  className="
          w-7 h-7 rounded-sm
          bg-[#3a4050] 
          flex items-center justify-center 
          text-gray-300 
          hover:bg-[#4a5060] 
          transition btn-press
        "
                >
                  <Plus size={16} className='font-bold' />
                </button>
              </div>

              {/* SWITCH TIME Link — Exact Look */}
              <button
                onClick={toggleTimeMode}
                className="absolute -bottom-2 left-[32%] px-1 text-[10px] text-primary font-bold bg-[#2b3040]"
              >
                SWITCH TIME
              </button>

              {/* Dropdown */}
              <SwitchTimeMenu
                isOpen={showTimeMenu}
                onClose={() => setShowTimeMenu(false)}
                currentTime={tradeTime}
                onSelectTime={setTradeTime}
                isSwitchMode={isAbsoluteTimeMode}
              />
            </div>
          </div>
          <div className="py-3 border-b border-[#2a3040] mb-2">
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#2b3040] z-10 font-bold">
                Investment
              </label>
              <div className="flex items-center justify-between bg-[#2a3040] border border-[#3a4050] rounded-sm p-3 mt-1">
                <button
                  onClick={() => adjustInvestment(isPercentMode ? -1 : -10)}
                  className="btn-press w-7 h-7 rounded-sm bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
                >
                  <Minus size={16} className='font-bold' />
                </button>

                <button
                  onClick={() => setShowInvestmentMenu(!showInvestmentMenu)}
                  className="font-mono text-white text-sm"
                >
                  {displayInvestment}
                </button>
                <button
                  onClick={() => adjustInvestment(isPercentMode ? 1 : 10)}
                  className="btn-press w-7 h-7 rounded-sm bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
                >
                  <Plus size={16} className='font-bold' />
                </button>
              </div>
              <button
                onClick={toggleInvestmentMode}
                className="absolute -bottom-2 left-[38%] px-1 text-[10px] text-primary font-bold bg-[#2b3040]"
              >
                SWITCH
              </button>
              <InvestmentMenu
                isOpen={showInvestmentMenu}
                onClose={() => setShowInvestmentMenu(false)}
                currentInvestment={investment}
                onSelectInvestment={setInvestment}
                isPercentMode={isPercentMode}
              />
            </div>
          </div>
        </div>

        {/* PAYOUT */}
        <div>
              <div className="text-left text-[12px] text-[#ffffff] w-full">
                Your payout: <span className="text-white font-bold float-right">{calculatedPayout} $</span>
              </div>
              {isPercentMode && (
                <div className="text-left text-[12px] text-[#989c99] ">
                  Investment :
                  <span className="text-[#989c99] font-bold float-right">{investment}$</span>
                </div>
              )}
            </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-2">
           <button
              onClick={handleDownClick}
              onMouseEnter={() => setDownHovered(true)}
              onMouseLeave={() => setDownHovered(false)}
              className="btn-press w-full py-2 px-4 rounded-sm bg-destructive hover:bg-destructive/90 text-white font-semibold text-base flex items-center justify-between transition-colors"
            >
              <span>Down</span>
              <div className="w-7 h-7 rounded-full bg-[#ff9186] flex items-center justify-center">
                <TrendingDown size={16} className="text-white" />
              </div>
            </button>
          <button
              onClick={handleUpClick}
              onMouseEnter={() => setUpHovered(true)}
              onMouseLeave={() => setUpHovered(false)}
              className="btn-press relative w-full py-2 px-4 rounded-sm bg-success hover:bg-success/90 text-white font-semibold text-base flex items-center justify-between transition-colors"
            >
              <span>Up</span>
              <div className="w-7 h-7 rounded-full bg-[#57c78b] flex items-center justify-center">
                <TrendingUp size={16} className="text-white" />
              </div>
            </button>
        </div>
      </div>
    </div>
  );
}
