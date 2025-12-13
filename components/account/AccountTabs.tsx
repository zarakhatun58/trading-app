'use client';

import { cn } from '../../libs/utils';

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

const AccountTabs=({ activeTab, onTabChange }: AccountTabsProps)=> {
  return (
    <div className="flex items-center gap-1 bg-card border-b border-border px-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors rounded-t-lg',
            activeTab === tab.id
              ? 'bg-secondary text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}


export default AccountTabs;