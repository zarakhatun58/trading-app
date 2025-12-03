'use client';

import React from 'react';
import { 
  TrendingUp, 
  HelpCircle, 
  User, 
  Trophy, 
  BarChart3, 
  MoreHorizontal,
  Volume2,
  Settings,
  Grid3X3,
  Expand
} from 'lucide-react';
import { cn } from '../../src/libs/utils';

interface SidebarItem {
  icon: React.ReactNode;
  label?: string;
  active?: boolean;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { icon: <TrendingUp size={20} />, label: 'TRADE', active: true },
  { icon: <HelpCircle size={20} />, label: 'SUPPORT' },
  { icon: <User size={20} />, label: 'ACCOUNT' },
  { icon: <Trophy size={20} />, label: 'TOURNA-MENTS', badge: 4 },
  { icon: <BarChart3 size={20} />, label: 'MARKET' },
  { icon: <MoreHorizontal size={20} />, label: 'MORE' },
];

const bottomItems: SidebarItem[] = [
  { icon: <Grid3X3 size={18} /> },
  { icon: <Expand size={18} /> },
  { icon: <Settings size={18} /> },
  { icon: <Volume2 size={18} /> },
];

export const TradingSidebar: React.FC = () => {
  return (
    <aside className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 h-screen">
      
      <div className="mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <TrendingUp className="text-primary-foreground" size={24} />
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              'flex flex-col items-center justify-center p-2 rounded-lg transition-colors',
              item.active ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground relative'
            )}
          >
            {item.icon}
            {item.label && (
              <span className="text-[10px] font-medium text-center leading-tight mt-1">
                {item.label}
              </span>
            )}
            {item.badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-semibold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="my-4 p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex flex-col items-center">
        <Trophy className="text-amber-400" size={20} />
        <span className="text-[8px] text-amber-400 font-bold">2025</span>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        {bottomItems.map((item, index) => (
          <button
            key={index}
            className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
          >
            {item.icon}
          </button>
        ))}
      </div>

      <button className="mt-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold hover:bg-primary/90 transition-colors">
        Help
      </button>
    </aside>
  );
};
