"use client";

import { useState, useRef, useEffect } from 'react';
import { Bell, MessageCircle, User, Plus, ChevronDown, ChevronUp, PlaneTakeoff, GraduationCap, Hexagon } from 'lucide-react';
import NotificationModal from './NotificationModal';
import OnlineUsersModal from './OnlineUsersModal';
import AccountModal from './AccountModal';
import ChatBox from './ChatBox';


interface TopBarProps {
  email?: string;
  id?: string | number;
  currency?: string;
  liveBalance?: number;
  balance?: number;
  initialIsLive?: boolean;
   hideBalance?: boolean;
  onToggleHideBalance?: () => void;
}

const TopBar = ({
  email = 'demo@qxbroker.com',
  id = '71910310',
  currency = 'USD',
  liveBalance = 0,
  balance = 1000000,
  initialIsLive = false,
  hideBalance = false,
  onToggleHideBalance,
}: TopBarProps) => {
  const [notifications] = useState(3);
  const [unreadMessages] = useState(5);
  const [onlineUsers] = useState(12847);
  const [isLive, setIsLive] = useState(initialIsLive);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const onlineUsersRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (onlineUsersRef.current && !onlineUsersRef.current.contains(e.target as Node)) {
        setShowOnlineUsers(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fmt = (n?: number) => {
    const num = typeof n === 'number' ? n : 0;
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
 const displayBalance = hideBalance ? '******' : `$${fmt(isLive ? liveBalance : balance)}`;
  return (
    <header className="h-14 bg-[#101729] flex items-center justify-between pl-4 pr-2 pb-2 pt-4 mb-2">

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg"><Hexagon size={22} className="text-[#ffffff]" /></span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline text-white">RexOption</span>
        </div>
        <span className="text-[14px] text-[#595b65] pl-3 ml-1 hidden md:inline font-bold">
          WEB TRADING PLATFORM
        </span>
      </div>

     <div  className={`xl2:hidden
              bg-[#27a663] rounded-full py-2 px-2 text-[12px] 
             flex items-center gap-2 h-[40px]`}>

        <PlaneTakeoff className="w-5" />
        <span className="pr-2 text-white">
          Get a <strong className="text-[14px]">70% bonus</strong> on first deposit
        </span>
        <span className="bg-[#4c5470] text-white px-2 py-1 rounded-full text-[14px] font-bold">70%</span>
      </div>

      <div className="flex items-center gap-2">
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => {
              const next = !showNotifications;
              setShowNotifications(next);
              if (next) setActiveIndex(0);
              else setActiveIndex(null);
            }}
            className={`
    relative p-2 rounded-sm transition-colors
    hover:bg-[#2a3040]
    ${activeIndex === 0 ? "bg-success" : ""}
  `}
          >
            <Bell size={20} className="text-[#ffffff]" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                {notifications}
              </span>
            )}
          </button>
          <NotificationModal isOpen={showNotifications} onClose={() => {
            setShowNotifications(false);
            setActiveIndex(null);
          }} />
        </div>

        {/* Chat */}
        <button
          onClick={() => {
            const nextchat = !showChat;
            setShowChat(nextchat);
            if (nextchat) setActiveIndex(1);
            else setActiveIndex(null);
          }}
          className={`
    relative p-2 rounded-sm transition-colors
    hover:bg-[#2a3040]
    ${activeIndex === 1 ? "bg-success" : ""}
  `}
        >
          <MessageCircle size={20} className="text-[#ffffff]" />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
              {unreadMessages}
            </span>
          )}
        </button>

        <div ref={onlineUsersRef} className="relative">
          <button
            onClick={() => setShowOnlineUsers(!showOnlineUsers)}
            className="relative p-2 rounded-lg hover:bg-[#2a3040] transition-colors"
          >
            <User size={20} className="text-gray-400" />
            {onlineUsers > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                {onlineUsers > 999 ? '9k+' : onlineUsers}
              </span>
            )}
          </button>
          <OnlineUsersModal
            isOpen={showOnlineUsers}
            onClose={() => setShowOnlineUsers(false)}
            onlineCount={onlineUsers}
          />
        </div>

        <div ref={accountRef} className="relative">
          <button
            onClick={() => {
              const next = !showAccountMenu;
              setShowAccountMenu(next);
              if (next) setActiveIndex(2);
              else setActiveIndex(null);
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm bg-[#1a1f2e] hover:bg-[#2a3040] transition-colors border border-[#2a3040] "
          >
            <GraduationCap className="w-5 h-5 text-gray-400" />
            <div className="flex flex-col items-start">
              <span className={`text-[8px] font-bold rounded ${isLive ? ' text-success' : ' text-orange-400'} `}>
                {isLive ? 'LIVE ACCOUNT' : 'DEMO ACCOUNT'}
              </span>
              <span className="font-semibold text-white text-[12px]">{displayBalance}</span>
            </div>
            {showAccountMenu ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <AccountModal
            isOpen={showAccountMenu}
            onClose={() => setShowAccountMenu(false)}
            email={email}
            id={id}
            currency={currency}
            liveBalance={liveBalance}
            balance={balance}
            isLive={isLive}
             onToggleLive={setIsLive}
            hideBalance={hideBalance}
            onToggleHideBalance={onToggleHideBalance}
          />
        </div>

        <div className="hidden sm:flex gap-2">
          <button className="py-2 px-4 rounded-sm bg-success hover:bg-success/90 text-white font-semibold text-sm transition-colors flex items-center gap-1">
            <Plus size={16} />
            Deposit
          </button>
          <button className="py-2 px-4 rounded-sm bg-[#2a3040] hover:bg-[#3a4050] text-white font-medium text-sm transition-colors border border-[#3a4050]">
            Withdrawal
          </button>
        </div>
      </div>

      <ChatBox isOpen={showChat}
        onClose={() => {
          setShowChat(false);
          setActiveIndex(null);
        }}
      />
    </header>
  );
};

export default TopBar;