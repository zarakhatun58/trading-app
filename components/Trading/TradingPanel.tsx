'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown, Plus, Minus, Clock, ShoppingCart, CreditCard, Receipt, User, LogOut } from 'lucide-react';
import { CurrencyPair } from '../../src/types/trading';
import { cn } from '../../src/libs/utils';
import { Switch } from '../ReusableUI/switch';


interface TradingPanelProps {
  activePair: CurrencyPair;
  onTrade: (direction: 'up' | 'down', amount: number, time: number) => void;
  balance: number;
  isLiveAccount: boolean;
}

export default function TradingPanel({
  activePair,
  onTrade,
  balance,
  isLiveAccount,
}: TradingPanelProps) {
  const [investment, setInvestment] = useState(1);
  const [tradeTime, setTradeTime] = useState(60);
  const [isPendingTrade, setIsPendingTrade] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const payout = 1.87;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:00`;
  };

  const adjustTime = (delta: number) => {
    setTradeTime(prev => Math.max(30, Math.min(300, prev + delta)));
  };

  const adjustInvestment = (delta: number) => {
    setInvestment(prev => Math.max(1, prev + delta));
  };

  const calculatedPayout = (investment * payout).toFixed(2);

  const accountMenuItems = [
    { id: 'deposit', label: 'Deposit', icon: Plus },
    { id: 'withdrawal', label: 'Withdrawal', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'trades', label: 'Trades', icon: ArrowUp },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
     <aside className="w-72 lg:w-80 bg-card border-l border-border flex flex-col h-full">
      <div className="p-3 border-b border-border">
        <div className="relative">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                isLiveAccount ? 'bg-success/20 text-success' : 'bg-cyan-500/20 text-cyan-400'
              }`}>
                {isLiveAccount ? 'LIVE ACCOUNT' : 'DEMO'}
              </span>
            </div>
            <span className="font-mono font-semibold text-foreground">${balance.toFixed(2)}</span>
          </button>

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

        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-2.5 px-3 rounded-lg bg-success hover:bg-success/90 text-success-foreground font-semibold text-sm transition-colors flex items-center justify-center gap-1">
            <Plus size={16} />
            Deposit
          </button>
          <button className="flex-1 py-2.5 px-3 rounded-lg bg-secondary hover:bg-accent text-foreground font-medium text-sm transition-colors border border-border">
            Withdrawal
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activePair.flag}</span>
            <span className="font-semibold">{activePair.name}</span>
          </div>
          <span className={cn(
            'text-sm font-mono',
            activePair.performance >= 50 ? 'text-success' : 'text-destructive'
          )}>
            {activePair.performance}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">PENDING TRADE</span>
          <Switch
            checked={isPendingTrade}
            onCheckedChange={setIsPendingTrade}
          />
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Time</span>
          <span className="text-xs text-primary cursor-pointer hover:underline">SWITCH TIME</span>
        </div>
        <div className="flex items-center justify-between bg-secondary rounded-lg p-2">
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
      </div>

      <div className="p-4 space-y-3">
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
      </div>
    </aside>
  );
}
