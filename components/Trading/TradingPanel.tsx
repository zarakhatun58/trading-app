'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown, Plus, Minus, Clock, ShoppingCart, CreditCard, Receipt, User, LogOut, ArrowRightLeft, TrendingDown, TrendingUp, ArrowUpCircle, ArrowDownCircle, ChevronUp, ChevronDown, DollarSign, PoundSterling, DollarSignIcon } from 'lucide-react';
import { CurrencyPair, Trade } from '../../types/trading';
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
  trades?: Trade[];
  onSellTrade?: (tradeId: string) => void;
}

export default function TradingPanel({
  activePair,
  onTrade,
  balance,
  isLiveAccount,
  onTradeZone,
  trades = [],
  onSellTrade
}: TradingPanelProps) {
  const [investment, setInvestment] = useState(100);
  const [tradeTime, setTradeTime] = useState(60);
  const [isPendingTrade, setIsPendingTrade] = useState(false);
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
    onTrade('up', investment, tradeTime);

  };

  const handleDownClick = () => {
    onTradeZone?.('down');
    const lastTrade = pendingTrades[pendingTrades.length - 1];
    if (lastTrade) {
      onSellTrade?.(lastTrade.id);
    }
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
  const groupedTrades = pendingTrades.reduce((acc, trade) => {
    const date = new Date(trade.timestamp).toLocaleDateString('en-US', { day: 'numeric', month: 'long' }).toUpperCase();
    if (!acc[date]) acc[date] = [];
    acc[date].push(trade);
    return acc;
  }, {} as Record<string, Trade[]>);

  return (
    <aside className="w-[150px] md:w-[220px]  rounded-lg flex flex-col h-full mr-2">
      <div className='rounded-lg bg-[#2b3040] px-4 py-2 mb-2'>
        <div className="">
          <div className="relative">

            {showAccountMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                {accountMenuItems.map((item) => (
                  <button
                    key={item.id}
                    className=" btn-press w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
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

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {/* <span className="text-2xl">{activePair.flag}</span> */}
              <span className='relative flex flex-row'><PoundSterling size={14} className="text-green-500 font-bold rounded-full bg-[#ffffff] p-2" /> <DollarSignIcon size={12} className="text-green-500 rounded-full bg-[#ffffff] p-2 ml-[-4px]" /></span>
              <span className="font-bold text-white text-[14px]">{activePair.name}</span>
            </div>
            <span className={cn(
              'text-sm font-bold',
              activePair.performance >= 50 ? 'text-success' : 'text-[#757885]'
            )}>
              {activePair.performance}%
            </span>
          </div>

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
        <div className="py-3 border-b border-[#2a3040]">
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[11px] text-[#8b93a7] bg-[#2b3040] z-10 font-bold">
              Time
            </label>
            <div className="
      flex items-center justify-between
      bg-[#2a3040]
      border border-[#3a4050]
      rounded-lg
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
        {/* Investment */}
        <div className="py-3 border-b border-[#2a3040] mb-2">
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#2b3040] z-10 font-bold">
              Investment
            </label>
            <div className="flex items-center justify-between bg-[#2a3040] border border-[#3a4050] rounded-lg p-3 mt-1">
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
        <div className="space-y-2 mb-2">
          <button
            onClick={handleUpClick}
            onMouseEnter={() => setUpHovered(true)}
            onMouseLeave={() => setUpHovered(false)}
            className="btn-press relative w-full py-2 px-4 rounded-lg bg-success hover:bg-success/90 text-white font-semibold text-base flex items-center justify-between transition-colors"
          >
            <span>Up</span>
            <div className="w-7 h-7 rounded-full bg-[#57c78b] flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
          </button>
          <div>
            <div className="text-left text-[12px] text-[#ffffff] w-full">
              Your payout: <span className="text-white font-bold float-right">{calculatedPayout} $</span>
            </div>
            {isPercentMode && (
              <div className="text-left text-[12px] text-[#989c99] ">
                Investment :
                <span className="text-[#989c99] font-bold float-right">{investment}</span>
              </div>
            )}
          </div>
          <button
            onClick={handleDownClick}
            onMouseEnter={() => setDownHovered(true)}
            onMouseLeave={() => setDownHovered(false)}
            className="btn-press w-full py-2 px-4 rounded-lg bg-destructive hover:bg-destructive/90 text-white font-semibold text-base flex items-center justify-between transition-colors"
          >
            <span>Down</span>
            <div className="w-7 h-7 rounded-full bg-[#ff9186] flex items-center justify-center">
              <TrendingDown size={16} className="text-white" />
            </div>
          </button>
        </div>
      </div>


      {/* Trades Section */}
      <div className='bg-[#2b3040] rounded-lg'>
        <div className={`flex-1  border border-[#2a3040] bg-[#2b3040] rounded-lg
    overflow-hidden transition-all duration-500
    ${isCollapsed ? "max-h-[80px]" : "max-h-[125px]"}
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
            <p className="text-[10px] text-gray-500 leading-relaxed">
              {activeTradesTab === 'trades'
                ? "You don't have a trade history yet. You can open a trade using the form above."
                : "Order list is empty. Create a pending trade using the form above."}
            </p>
          </div>

        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex justify-center py-1.5 md:py-2 text-gray-400 hover:text-white transition border-t border-[#2a3040]"
        >
          <ChevronDown size={16} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
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
