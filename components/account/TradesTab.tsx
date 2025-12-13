'use client';
import { Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../libs/utils';

type TradesSubTab = 'history' | 'pending';

export function TradesTab() {
  const [subTab, setSubTab] = useState<TradesSubTab>('history');
  const [dateRange] = useState('13.12.2024 - 13.12.2025');
  const [accountType] = useState('Live Account');

  return (
    <div className="p-6 animate-fade-in">
      {/* Sub Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setSubTab('history')}
          className={cn(
            "pb-2 text-sm font-medium border-b-2 transition-colors",
            subTab === 'history'
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Trade history
        </button>
        <button
          onClick={() => setSubTab('pending')}
          className={cn(
            "pb-2 text-sm font-medium border-b-2 transition-colors",
            subTab === 'pending'
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Pending trades
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="trading-card flex items-center gap-2 px-3 py-2">
          <Calendar size={16} className="text-muted-foreground" />
          <span className="text-sm">Date Range:</span>
          <span className="text-sm text-success">{dateRange}</span>
        </div>
        
        <div className="trading-card flex items-center gap-2 px-3 py-2">
          <span className="text-sm text-muted-foreground">Account Type:</span>
          <span className="text-sm">{accountType}</span>
          <ChevronDown size={16} className="text-muted-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="trading-card py-24 text-center">
        <p className="text-lg font-medium text-muted-foreground">No data to display</p>
        <p className="text-sm text-muted-foreground mt-1">You don't have a trade history yet.</p>
      </div>
    </div>
  );
}
