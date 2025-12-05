'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown, Plus, Minus, Clock, ShoppingCart, CreditCard, Receipt, User, LogOut } from 'lucide-react';
import { CurrencyPair } from '../../types/trading';
import { cn } from '../../libs/utils';
import { Switch } from '../ReusableUI/switch';
import SwitchTimeMenu from './SwitchTimeMenu';
import InvestmentMenu from './InvestmentMenu';
import PendingTradeModal from './PendingTradeModal';


interface TradingPanelProps {
  activePair: CurrencyPair;
  onTrade: (direction: 'up' | 'down', amount: number, time: number) => void;
  balance: number;
  isLiveAccount: boolean;
  onTradeZone?: (zone: 'up' | 'down' | null) => void;
}

export default function TradingPanel({
  activePair,
  onTrade,
  balance,
  isLiveAccount,
   onTradeZone,
}: TradingPanelProps) {
   const [investment, setInvestment] = useState(1);
  const [tradeTime, setTradeTime] = useState(60);
  const [isPendingTrade, setIsPendingTrade] = useState(false);
  const [payout] = useState(1.87);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [showInvestmentMenu, setShowInvestmentMenu] = useState(false);

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

  const adjustTime = (delta: number) => {
    setTradeTime(prev => Math.max(30, Math.min(14400, prev + delta)));
  };

  const adjustInvestment = (delta: number) => {
    setInvestment(prev => Math.max(1, prev + delta));
  };

  const calculatedPayout = (investment * payout).toFixed(2);

  const handleUpClick = () => {
    onTradeZone?.('up');
    onTrade('up', investment, tradeTime);
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

  const accountMenuItems = [
    { id: 'deposit', label: 'Deposit', icon: Plus },
    { id: 'withdrawal', label: 'Withdrawal', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'trades', label: 'Trades', icon: ArrowUp },
    { id: 'account', label: 'Account', icon: User },
  ];


  return (
    <aside className="w-[130px] md:w-[235px] bg-[#2b3040] flex flex-col h-full rounded-lg">
      <div className="border-border">
        <div className="relative">

          {showAccountMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
              {accountMenuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                  onClick={() => setShowAccountMenu(false)}
                >
                  <item.icon size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{item.label}</span>
                </button>
              ))}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-destructive/10 transition-colors text-left border-t border-border"
                onClick={() => setShowAccountMenu(false)}
              >
                <LogOut size={16} className="text-destructive" />
                <span className="text-sm text-destructive">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activePair.flag}</span>
            <span className="font-bold text-white">{activePair.name}</span>
          </div>
          <span className={cn(
            'text-sm font-bold',
            activePair.performance >= 50 ? 'text-success' : 'text-[#757885]'
          )}>
            {activePair.performance}%
          </span>
        </div>

        {/* <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
          <span className="text-primary font-bold pr-2"><Clock size={12} /></span>
          <span className="text-[10px] text-primary font-bold">PENDING TRADE</span>
          </div>
           <button 
              onClick={() => setIsPendingTrade(!isPendingTrade)}
              className={`w-10 h-5 rounded-full transition-colors relative ${isPendingTrade ? 'bg-primary' : 'bg-[#3a4050]'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isPendingTrade ? 'right-0.5' : 'left-0.5'}`}></span>
            </button>
        </div> */}
         <div className="flex items-center justify-between">
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
      </div>

      {/* <div className="p-4 border-b border-border">
        
        <div className="relative w-full">
          <label className="absolute -top-3 left-3 px-1 text-[12px] text-gray-400 font-semibold">
            Time
          </label>
          <div className=" flex items-center justify-between w-full p-3 bg-[#444b5d] border border-[#ffffff1a] rounded text-sm text-white focus:outline-none">
            <button
              onClick={() => adjustTime(-30)}
              className="p-1 rounded hover:bg-accent transition-colors"
            >
              <Minus size={16} />
            </button>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span className="font-mono text-lg">{formatTime(tradeTime)}</span>
            </div>
            <button
              onClick={() => adjustTime(30)}
              className="p-1 rounded hover:bg-accent transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <label className="absolute -bottom-2 left-12 px-1 text-[10px] text-primary font-bold ">
           SWITCH TIME
          </label>
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Investment</span>
          <span className="text-xs text-primary cursor-pointer hover:underline">SWITCH</span>
        </div>
        <div className="flex items-center justify-between bg-secondary rounded-lg p-2">
          <button
            onClick={() => adjustInvestment(-1)}
            className="p-1 rounded hover:bg-accent transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-mono text-lg">{investment} $</span>
          <button
            onClick={() => adjustInvestment(1)}
            className="p-1 rounded hover:bg-accent transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div> */}
        <div className="p-3 border-b border-[#2a3040]">
          <div className="relative">
            <label className="absolute -top-1 left-3 px-1 text-[10px] text-gray-500 bg-[#1e2433] z-10">
              Time
            </label>
            <div className="flex items-center justify-between bg-[#2a3040] border border-[#3a4050] rounded-lg p-2 mt-1">
              <button 
                onClick={() => adjustTime(-30)}
                className="w-7 h-7 rounded-full bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
              >
                <Minus size={12} />
              </button>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-gray-400" />
                <span className="font-mono text-white text-sm">{formatTime(tradeTime)}</span>
              </div>
              <button 
                onClick={() => adjustTime(30)}
                className="w-7 h-7 rounded-full bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
            <button 
              onClick={() => setShowTimeMenu(!showTimeMenu)}
              className="text-primary text-[10px] font-semibold mt-1 ml-3 hover:underline"
            >
              SWITCH TIME
            </button>
            <SwitchTimeMenu
              isOpen={showTimeMenu}
              onClose={() => setShowTimeMenu(false)}
              currentTime={tradeTime}
              onSelectTime={setTradeTime}
            />
          </div>
        </div>

        {/* Investment */}
        <div className="p-3 border-b border-[#2a3040]">
          <div className="relative">
            <label className="absolute -top-1 left-3 px-1 text-[10px] text-gray-500 bg-[#1e2433] z-10">
              Investment
            </label>
            <div className="flex items-center justify-between bg-[#2a3040] border border-[#3a4050] rounded-lg p-2 mt-1">
              <button 
                onClick={() => adjustInvestment(-1)}
                className="w-7 h-7 rounded-full bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="font-mono text-white text-sm">{investment} $</span>
              <button 
                onClick={() => adjustInvestment(1)}
                className="w-7 h-7 rounded-full bg-[#3a4050] flex items-center justify-center text-gray-300 hover:bg-[#4a5060] transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
            <button 
              onClick={() => setShowInvestmentMenu(!showInvestmentMenu)}
              className="text-primary text-[10px] font-semibold mt-1 ml-3 hover:underline"
            >
              SWITCH
            </button>
            <InvestmentMenu
              isOpen={showInvestmentMenu}
              onClose={() => setShowInvestmentMenu(false)}
              currentInvestment={investment}
              onSelectInvestment={setInvestment}
            />
          </div>
        </div>

      {/* <div className="p-4 space-y-3">
        <button
          onClick={() => onTrade('up', investment, tradeTime)}
          className="w-full py-4 px-6 rounded-lg bg-success hover:bg-success/90 text-success-foreground font-semibold text-lg flex items-center justify-between transition-colors"
        >
          <span>Up</span>
          <ArrowUp size={20} />
        </button>

        <div className="text-center text-sm text-muted-foreground">
          Your payout: <span className="text-foreground font-mono">{calculatedPayout} $</span>
        </div>

        <button
          onClick={() => onTrade('down', investment, tradeTime)}
          className="w-full py-4 px-6 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold text-lg flex items-center justify-between transition-colors"
        >
          <span>Down</span>
          <ArrowDown size={20} />
        </button>
      </div>

      <div className="flex-1 border-t border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Trades</span>
            <span className="text-xs bg-secondary px-2 py-0.5 rounded">0</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-accent transition-colors">
              <Clock size={14} className="text-muted-foreground" />
            </button>
            <span className="text-xs text-muted-foreground">0</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <ShoppingCart size={24} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            You don't have a trade history yet. You can open a trade using the form above.
          </p>
        </div>
      </div> */}
      {/* Trade Buttons */}
        <div className="p-3 space-y-2">
          <button 
            onClick={handleUpClick}
            className="w-full py-3 px-4 rounded-lg bg-success hover:bg-success/90 text-white font-semibold text-base flex items-center justify-between transition-colors"
          >
            <span>Up</span>
            <ArrowUp size={18} />
          </button>
          
          <div className="text-center text-xs text-gray-400">
            Your payout: <span className="text-white font-mono">{calculatedPayout} $</span>
          </div>

          <button 
            onClick={handleDownClick}
            className="w-full py-3 px-4 rounded-lg bg-destructive hover:bg-destructive/90 text-white font-semibold text-base flex items-center justify-between transition-colors"
          >
            <span>Down</span>
            <ArrowDown size={18} />
          </button>
        </div>

        {/* Trades Section */}
        <div className="flex-1 border-t border-[#2a3040]">
          <div className="flex items-center justify-between p-3 border-b border-[#2a3040]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white">Trades</span>
              <span className="text-[10px] bg-[#2a3040] px-2 py-0.5 rounded text-gray-400">0</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-[#2a3040] transition-colors">
                <Clock size={12} className="text-gray-400" />
              </button>
              <span className="text-[10px] text-gray-400">0</span>
            </div>
          </div>

          {/* Trade History Item Example */}
          <div className="p-3 text-[10px] text-gray-500">
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
            
            {/* Mini chart */}
            <div className="h-16 mt-2 flex items-end justify-around">
              {[20, 35, 25, 40, 30, 45, 35, 50, 40, 55].map((h, i) => (
                <div key={i} className="w-1 bg-primary/50 rounded-t" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>
     

      {/* Pending Trade Modal */}
      <PendingTradeModal
        isOpen={isPendingTrade}
        onClose={() => setIsPendingTrade(false)}
        currentQuote={activePair.currentPrice}
        onTrade={handlePendingTrade}
      />
      </aside>
  );
}
