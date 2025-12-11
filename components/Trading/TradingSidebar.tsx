'use client';

import React, { useState } from 'react';
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
  Expand,
  ChevronLeft,
  X,
  Menu,
  Wallet,
  ArrowDownCircle,
  History,
  LineChart,
  Info,
  LogOut,
  Users,
  ChevronDown,
  Activity,
  Settings2,
  DollarSign,
  Signal,
  Unplug,
  HelpCircleIcon,
} from 'lucide-react';
import { cn } from '../../libs/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ReusableUI/tooltip';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  open?: boolean;
  onClick?: () => void;
}

interface TradingSidebarProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSettingsClick: () => void;
  onSocialClick: () => void;
  onCollapseToIcons: () => void;
  isCollapsedToIcons: boolean;
}

const sidebarItems: SidebarItem[] = [
  { icon: <TrendingUp size={18} />, label: 'TRADE', active: true },
  { icon: <HelpCircle size={18} />, label: 'SUPPORT' },
  { icon: <User size={18} />, label: 'ACCOUNT' },
  { icon: <Trophy size={18} />, label: 'TOURNA-MENTS', badge: 4 },
  { icon: <BarChart3 size={18} />, label: 'MARKET' },
  // { icon: <MoreHorizontal size={18} />, label: 'MORE' },
  { icon: <Activity size={18} />, label: 'ANALYTICS' },
  { icon: <Unplug size={18} />, label: 'TOP' },
  { icon: <Signal size={18} />, label: 'SIGNAL' },
  { icon: <DollarSign size={18} />, label: 'MARKET' },
  { icon: <Users size={18} />, label: 'JOIN US' },
  { icon: <HelpCircleIcon size={18} />, label: 'HELP' },
  { icon: <Settings size={18} />, label: 'SETTINGS', onClick: () => console.log("Settings clicked!") }


];

const expandedMenuItems = [
  { icon: <Wallet size={18} />, label: 'Deposit' },
  { icon: <ArrowDownCircle size={18} />, label: 'Withdrawal' },
  { icon: <History size={18} />, label: 'Transactions' },
  { icon: <LineChart size={18} />, label: 'Trades' },
  { icon: <User size={18} />, label: 'Account' },
];

const expandedBottomItems = [
  { icon: <Info size={16} />, label: 'About us' },
  { icon: <HelpCircle size={16} />, label: 'Support' },
];

const TradingSidebar = ({
  isExpanded,
  onToggleExpand,
  onSettingsClick,
  onSocialClick,
  onCollapseToIcons,
  isCollapsedToIcons,
}: TradingSidebarProps) => {
  if (isCollapsedToIcons) {
    return (
      <aside className="w-14 bg-[#101729] flex flex-col items-center py-2 h-screen">

        <button
          onClick={onToggleExpand}
          className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors mb-4"
        >
          <Menu size={18} />
        </button>


        <nav className="flex-1 flex flex-col gap-1">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                'p-2 rounded-sm transition-all duration-200 hover:bg-sidebar-accent cursor-pointer text-sidebar-foreground hover:text-sidebar-accent-foreground relative',
                item.active && 'bg-sidebar-accent text-primary'
              )}
            >
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[8px] rounded-full flex items-center justify-center font-semibold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>


        {/* <div className="my-4 p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30">
          <Trophy className="text-amber-400" size={16} />
        </div>


        <div className="flex flex-col gap-2 mt-auto">
          <button className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
            <Grid3X3 size={16} />
          </button>
          <button
            onClick={onCollapseToIcons}
            className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
          >
            <Settings size={16} />
          </button>
          <button className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
            <Volume2 size={16} />
          </button>
        </div>

        <button
          onClick={onSocialClick}
          className="mt-4 p-2 rounded-lg bg-success/20 border border-success/30 text-success hover:bg-success/30 transition-colors"
        >
          <Users size={16} />
        </button> */}

        {/* <button className="mt-2 w-10 h-10 rounded-lg bg-green text-primary-foreground flex items-center justify-center text-xs font-semibold hover:bg-primary/90 transition-colors">
          Help
        </button> */}
      </aside>
    );
  }

  return (
    <aside className={cn(
      "bg-[#101729] flex flex-col h-screen transition-all duration-300 pl-2",
      isExpanded ? "w-[200px]" : "w-[60px]"
    )}>

      <div className="pt-4 pl-1">
        <button
          onClick={onToggleExpand}
          className="p-3 rounded-sm text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        >
          {isExpanded ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>


      <nav className="flex-1 flex flex-col gap-1 px-1 ">
        {sidebarItems.map((item, index) => {

          // --- BUTTON ELEMENT ---
          const ButtonContent = (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                "sidebar-item w-full flex items-center rounded-sm transition-colors",
                item.active ? "bg-primary text-white" : "bg-[#2a3040] text-sidebar-foreground",
                "hover:bg-primary hover:text-white",
                isExpanded ? "flex-row px-2 py-2 gap-2" : "flex-col px-1 py-2 gap-1"
              )}
            >
              {/* LEFT SIDE: Icon + Label */}
              <div
                className={cn(
                  "flex items-center",
                  isExpanded ? "gap-2" : "flex-col gap-1"
                )}
              >
                {item.icon}
                {/* BADGE */}
                {item.badge && (
                  <span
                    className={cn(
                      "flex items-center justify-center font-semibold",
                      "w-4 h-4 rounded-full text-[8px] bg-primary text-primary-foreground",
                      isExpanded ? "ml-auto" : "absolute -top-1 -right-1"
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {isExpanded && (
                  <span className="text-[10px] font-medium whitespace-nowrap">
                    {item.label.replace("-", "")}
                  </span>
                )}
              </div>

              {/* RIGHT SIDE: Chevron (when expanded) */}
              {isExpanded && (
                <ChevronDown
                  size={16}
                  className={cn(
                    "ml-auto text-muted-foreground transition-transform duration-300",
                    item.label === "" ? "rotate-180" : "rotate-0"
                  )}
                />
              )}
            </button>
          );



          // --- SHOW TOOLTIP WHEN COLLAPSED ---
          if (!isExpanded) {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>{ButtonContent}</TooltipTrigger>
                <TooltipContent side="right" className="px-2 py-1 text-[8px]">
                  {item.label.replace("-", "")}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={index}>{ButtonContent}</div>;
        })}
      </nav>


      {/* {isExpanded && (
        <div className="px-2 py-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground mb-2 px-4">jkhatun258@gmail.com</div>
          {expandedMenuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mt-4 pt-4 border-t border-sidebar-border">
            {expandedBottomItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-sidebar-accent rounded-lg transition-colors">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )} */}

      {/* {!isExpanded && (
        <div className="mx-auto my-4 p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30">
          <Trophy className="text-amber-400" size={20} />
          <span className="text-[8px] text-amber-400 font-bold">2025</span>
        </div>
      )} */}

      {/* <div className={cn(
        "flex gap-2 mt-auto p-4",
        isExpanded ? "flex-row justify-center" : "flex-col items-center"
      )}>
        <button className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
          <Grid3X3 size={18} />
        </button>
        <button
          onClick={onCollapseToIcons}
          className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Settings size={18} />
        </button>
        <button className="p-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
          <Volume2 size={18} />
        </button>
      </div> */}

      {/* <div className="px-4 pb-2">
        <button
          onClick={onSocialClick}
          className={cn(
            "rounded-lg bg-success/20 border border-success/30 text-success hover:bg-success/30 transition-colors flex items-center justify-center gap-2",
            isExpanded ? "w-full py-2 px-4" : "w-full p-2"
          )}
        >
          <Users size={18} />
          {isExpanded && <span className="text-sm font-medium">JOIN US</span>}
        </button>
      </div> */}

      {/* <div className="px-4 pb-4">
        <button className={cn(
          "rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold hover:bg-primary/90 transition-colors",
          isExpanded ? "w-full py-3" : "w-12 h-12 mx-auto"
        )}>
          Help
        </button>
      </div> */}
    </aside>
  );
};
export default TradingSidebar;