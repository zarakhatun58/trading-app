'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  HelpCircle,
  User,
  Trophy,
  Volume2,
  Settings,
  Grid3X3,
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
  Maximize,
  Minimize,
  Receipt,
  Send,
  Facebook,
  Instagram,
  VolumeX,
  Share2,
  BarChart3,
} from 'lucide-react';
import { cn } from '../../libs/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ReusableUI/tooltip';
import { usePathname, useRouter } from 'next/navigation';

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
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
}



const expandedMenuItems = [
  { icon: <Wallet size={18} />, label: 'Deposit' },
  { icon: <ArrowDownCircle size={18} />, label: 'Withdrawal' },
  { icon: <Receipt size={18} />, label: 'Transaction', },
  { icon: <LineChart size={18} />, label: 'Trades' },
  { icon: <User size={18} />, label: 'Account' },


];

const expandedBottomItems = [
  { icon: <Info size={16} />, label: 'About us' },
  { icon: <HelpCircle size={16} />, label: 'Support' },
];
const SIDEBAR_ROUTES: Record<string, string> = {
  TRADE: '/trading',
  ACCOUNT: '/account/account',
  ANALYTICS: '/account/analytics',
  'TOURNA-MENTS': '/account/tournaments',
  SUPPORT: '/support',
  'JOIN US': '/join-us',
};


const TradingSidebar = ({
  isExpanded,
  onToggleExpand,
  onSettingsClick,
  onSocialClick,
  onCollapseToIcons,
  isFullscreen,
  isCollapsedToIcons,
  setIsFullscreen
}: TradingSidebarProps) => {
 const router = useRouter();
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    {
      icon: <TrendingUp size={24} />,
      label: 'TRADE',
      onClick: () => router.push('/trading'),
      active: pathname === '/trading',
    },
    
    {
      icon: <User size={24} />,
      label: 'ACCOUNT',
       onClick: () => router.push('/account?tab=account'),
  active: pathname.startsWith('/account'),
    },
    {
      icon: <Trophy size={24} />, label: 'TOURNA-MENTS',
      badge: 4,
      onClick: () => router.push('/account/tournaments'),
      active: pathname.includes('tournaments'),
    },
    
    // { icon: <MoreHorizontal size={18} />, label: 'MORE' },
    {
      icon: <Activity size={24} />, label: 'ANALYTICS',
      onClick: () => router.push('/account/analytics'),
      active: pathname.includes('analytics'),
    },
    { icon: <BarChart3 size={24} />, label: 'MARKET' },
    {
      icon: <HelpCircle size={24} />,
      label: 'SUPPORT',
      onClick: () => router.push('/support'),
      active: pathname.startsWith('/support'),
    },
   

  ];
  const [isMuted, setIsMuted] = useState(false);
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
                'px-2  py-3 rounded-sm transition-all duration-200 hover:bg-sidebar-accent cursor-pointer text-sidebar-foreground hover:text-sidebar-accent-foreground relative',
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


        <div className="my-4 p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30">
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
        </button>

        <button className="mt-2 w-10 h-10 rounded-lg bg-green text-primary-foreground flex items-center justify-center text-xs font-semibold hover:bg-primary/90 transition-colors">
          Help
        </button>
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
          className="p-3 mb-1 rounded-sm text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        >
          {isExpanded ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>


      <nav className="flex-1 flex flex-col gap-2 px-1 ">
        {sidebarItems.map((item, index) => {
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
              <div
                className={cn(
                  "flex items-center font-bold",
                  isExpanded ? "gap-2" : "flex-col gap-1"
                )}
              >
                {item.icon}
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
              
            </button>
          );
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
 
      {isExpanded && (
        <div data-scroll className="px-2 py-4 border-t border-sidebar-border overflow-y-auto ">
          <div className="text-xs text-muted-foreground mb-2 px-4">jkhatun258@gmail.com</div>
          {expandedMenuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mt-4 pt-4 border-t border-sidebar-border">
            {expandedBottomItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-4 py-2 text-xs text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
              >
                {item.icon}
                <span className='text-xs'>{item.label}</span>
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-2 text-xs text-destructive hover:bg-sidebar-accent rounded-lg transition-colors">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      {!isExpanded && (
        <div className="pb-2 ">
          <div className='flex flex-col mb-2 p-1'>
            <div className='flex flex-row text-gray-400 justify-between mb-2'>
              {isFullscreen ? (
                <Minimize size={16} className="cursor-pointer" onClick={() => setIsFullscreen(false)} />
              ) : (
                <Maximize size={16} className="cursor-pointer" onClick={() => setIsFullscreen(true)} />
              )}
              <History size={16} /></div>
            <div className='flex flex-row text-gray-400 justify-between mb-4'>
              <Settings size={16} className="cursor-pointer" onClick={onSettingsClick} />
              {isMuted ? (
                <VolumeX
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIsMuted(false)}
                />
              ) : (
                <Volume2
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIsMuted(true)}
                />
              )}
            </div>
            <div className='border border-[#2a3040] h-[47px] w-full p-2 rounded-sm'>
              <span className='flex flex-row'><Share2 size={14} className='w-[20px] h-[20px] text-gray-400' />
                <Send size={20} /></span>
              <Instagram size={12} className='flex felx-row justify-center items-center ml-2' />
            </div>
          </div>
          <button className={cn(
            "rounded-sm bg-green-500 text-[#ffffff] w-[44px] text-[10px] flex items-center justify-center font-semibold hover:bg-primary/90 transition-colors",
            isExpanded ? "w-full p-1" : "w-[44px] h-[40px] mx-auto"
          )}>
            Help
          </button>
        </div>
       
      )}

     
    </aside>
  );
};
export default TradingSidebar;