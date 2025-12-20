'use client';

import { useState } from 'react';
import { cn } from '../../libs/utils';
import { ChevronDown } from 'lucide-react';

export type AccountTab =
  | 'withdrawal'
  | 'transactions'
  | 'trades'
  | 'account'
  | 'market'
  | 'tournaments'
  | 'analytics';

interface AccountTabsProps {
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
}

const tabs: { id: AccountTab; label: string }[] = [
  { id: 'withdrawal', label: 'Withdrawal' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'trades', label: 'Trades' },
  { id: 'account', label: 'Account' },
  { id: 'market', label: 'Market' },
  { id: 'tournaments', label: 'Tournaments' },
  { id: 'analytics', label: 'Analytics' },
];

const AccountTabs = ({ activeTab, onTabChange }: AccountTabsProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLabel = tabs.find(t => t.id === activeTab)?.label;

  return (
    <div className="relative">

      {/* ================= DESKTOP TABS ================= */}
      <div className="hidden md:flex items-center gap-1 bg-[#2b3040] max-w-[38rem] rounded-sm"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-2 py-2 text-[14px] font-medium whitespace-nowrap rounded-sm transition-colors',
              activeTab === tab.id
                ? 'bg-secondary text-foreground rounded-sm m-1'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
 {/* RIGHT INFO TEXT  */}
           {activeTab === 'account' && (
  <div className="hidden md:flex absolute right-0 top-0 text-right text-sm text-muted-foreground flex-row">
    <div className="h-8">
      <p className="mb-1">My current currency</p>
      <div className="text-white font-semibold text-[14px]">
        $ USD{' '}
        <button className="text-[8px] bg-primary px-2 rounded-sm text-white">
          CHANGE
        </button>
      </div>
    </div>

    <div className="h-8 pl-8">
      <p className="mb-1">Available for withdrawal</p>
      <div className="text-white font-semibold text-[14px]">0.00 $</div>
    </div>

    <div className="h-8 pl-8">
      <p className="mb-1">In the account</p>
      <div className="text-white font-semibold text-[14px]">0.00 $</div>
    </div>
  </div>
)}

{activeTab === 'withdrawal' && (
  <div className="hidden md:flex absolute right-0 top-0 text-right text-sm text-muted-foreground flex-row">
    <div className="h-8 pl-8">
      <p className="mb-1">Available for withdrawal</p>
      <div className="text-white font-semibold text-[14px]">0.00 $</div>
    </div>

    <div className="h-8 pl-8">
      <p className="mb-1">In the account</p>
      <div className="text-white font-semibold text-[14px]">0.00 $</div>
    </div>
  </div>
)}
      {/* ================= MOBILE ACCORDION ================= */}
      <div className="md:hidden px-4 mt-3">
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="flex items-center justify-between w-full
            bg-[#101729] border border-[rgba(53,58,77,0.1)]
            rounded-lg px-4 py-3 text-white"
        >
          <span className="font-medium">{activeLabel}</span>
          <ChevronDown
            size={18}
            className={cn(
              'transition-transform',
              mobileOpen && 'rotate-180'
            )}
          />
        </button>

        {mobileOpen && (
          <div className="absolute z-50 mt-2 w-[calc(100%-2rem)]
            bg-[#101729] border border-[rgba(53,58,77,0.1)]
            rounded-lg overflow-hidden"
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setMobileOpen(false);
                }}
                className={cn(
                  'w-full text-left px-4 py-3 text-sm hover:bg-[#2b3040]',
                  activeTab === tab.id
                    ? 'bg-[#2b3040] text-white'
                    : 'text-muted-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AccountTabs;
