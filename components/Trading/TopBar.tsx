"use client";

import { Bell, ChevronDown, Plus, Wallet } from "lucide-react";
import { Button } from "../ReusableUI/button";

interface TopBarProps {
  balance: number;
  isLiveAccount: boolean;
}

 const TopBar = ({ balance, isLiveAccount }: TopBarProps) => {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">QUOTEX</span>
        </div>
        <span className="text-xs text-muted-foreground border-l border-border pl-3 ml-1 hidden md:inline">
          WEB TRADING PLATFORM
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
          <Bell size={20} className="text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};
export default TopBar;