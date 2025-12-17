"use client";

import { useState, useRef, useEffect } from 'react';
import { Bell, MessageCircle, User, Plus, ChevronDown, ChevronUp, PlaneTakeoff, GraduationCap, Hexagon } from 'lucide-react';
import NotificationModal from './NotificationModal';
import OnlineUsersModal from './OnlineUsersModal';
import AccountModal from './AccountModal';
import ChatBox from './ChatBox';
import DepositModal from '../Deposit/DepositModal';


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
  balance = 100,
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
  const [openDeposit, setOpenDeposit] = useState(false);

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
  //  const displayBalance = hideBalance ? '******' : `$${fmt(isLive ? 10000000 : 10000000)}`;
  return (
    <header className="h-14 bg-[#101729] flex items-center justify-between pl-2 sm:pl-4 pr-2 pb-2 pt-4 ">

      <div className="flex items-center gap-3 ">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center ">
            <span className="text-white font-bold text-lg"><Hexagon size={22} className="text-[#ffffff]" /></span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline text-white">RexOption</span>
        </div>
        <span className="text-[14px] text-[#595b65] pl-3 ml-1 hidden md:inline font-bold hidden sm:inline">
          WEB TRADING PLATFORM
        </span>
      </div>

      {/* <div  className={`xl2:hidden
              bg-[#27a663] rounded-full py-2 px-2 text-[12px] 
             flex items-center gap-2 h-[40px]`}>

        <PlaneTakeoff className="w-5" />
        <span className="pr-2 text-white">
          Get a <strong className="text-[14px]">70% bonus</strong> on first deposit
        </span>
        <span className="bg-[#4c5470] text-white px-2 py-1 rounded-full text-[14px] font-bold">70%</span>
      </div> */}

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
              btn-press
              bg-[#2a3040]
    relative sm:p-2 p-1.5 rounded-sm transition-colors
    hover:bg-[#2a3040]
    ${activeIndex === 0 ? "bg-success" : ""}
  `}
          >
            <Bell size={20} className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold rounded-full
          flex items-center justify-center
          text-[9px] h-3 min-w-3 px-0.5
          sm:text-[10px] sm:h-4 sm:min-w-4 sm:px-1">
                {notifications}
              </span>
            )}
          </button>
          <NotificationModal isOpen={showNotifications} onClose={() => {
            setShowNotifications(false);
            setActiveIndex(null);
          }} />
        </div>
        <button
          onClick={() => {
            const nextchat = !showChat;
            setShowChat(nextchat);
            if (nextchat) setActiveIndex(1);
            else setActiveIndex(null);
          }}
          className={` btn-press bg-[#2a3040] relative rounded-sm transition-colors hover:bg-[#2a3040]
    p-1.5
    sm:p-2

    ${activeIndex === 1 ? "bg-success" : ""}
  `}
        >
          <MessageCircle size={20} className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white font-bold rounded-full
        flex items-center justify-center
        text-[9px] h-3 min-w-3 px-0.5
        sm:text-[10px] sm:h-4 sm:min-w-4 sm:px-1">
              {unreadMessages}
            </span>
          )}
        </button>

        {/* <div ref={onlineUsersRef} className="relative hidden sm:inline">
          <button
            onClick={() => setShowOnlineUsers(!showOnlineUsers)}
            className=" btn-press bg-[#2a3040] relative rounded-sm transition-colors hover:bg-[#2a3040]
      p-1.5
      sm:p-2"
          >
            <User size={20} className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            {onlineUsers > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white font-bold rounded-full
          flex items-center justify-center
          text-[9px] h-3 min-w-3 px-0.5
          sm:text-[10px] sm:h-4 sm:min-w-4 sm:px-1">
                {onlineUsers > 999 ? '9k+' : onlineUsers}
              </span>
            )}
          </button>
          <OnlineUsersModal
            isOpen={showOnlineUsers}
            onClose={() => setShowOnlineUsers(false)}
            onlineCount={onlineUsers}
          />
        </div> */}

        <div ref={accountRef} className="relative">
          <button
            onClick={() => {
              const next = !showAccountMenu;
              setShowAccountMenu(next);
              setActiveIndex(next ? 2 : null);
            }}
            className="
      btn-press flex items-center rounded-sm
      bg-[#1a1f2e] hover:bg-[#2a3040] transition-colors
      border border-[#2a3040]
      gap-1 px-2 py-1
      sm:gap-2 sm:px-3 sm:py-2 ml-1 sm:ml-1
    "
          >
            <GraduationCap className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <div className="flex flex-col items-start leading-tight">
              <span
                className={`
          font-bold rounded
          text-[9px] sm:text-[8px]
          ${isLive ? 'text-success' : 'text-orange-400'}
        `}
              >
                <span className="sm:hidden text-[6px]">
                  {isLive ? 'LIVE ACCOUNT' : 'DEMO ACCOUNT'}
                </span>
                <span className="hidden sm:inline">
                  {isLive ? 'LIVE ACCOUNT' : 'DEMO ACCOUNT'}
                </span>
              </span>

              <span className="font-semibold text-white text-[8px] sm:text-[10px]">
                {displayBalance}
              </span>
            </div>
            {showAccountMenu ? (
              <ChevronUp className="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
            ) : (
              <ChevronDown className="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
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


        <div className="sm:flex gap-2">
          <button onClick={() => setOpenDeposit(true)} className="btn-press
      flex items-center gap-1
      bg-success hover:bg-success/90 text-white font-semibold transition-colors
      rounded-sm
      px-1 py-2 text-[11px]
      sm:px-4 sm:py-2 sm:text-sm">
            <Plus size={16} />
            Deposit
          </button>
          <button className=" hidden sm:flex
      py-2 px-4 rounded-sm
      bg-[#2a3040] hover:bg-[#3a4050]
      text-white font-medium text-sm
      border border-[#3a4050]
      btn-press">
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
      <DepositModal isOpen={openDeposit} onClose={() => setOpenDeposit(false)} />
    </header>
  );
};

export default TopBar;