'use client';

import MobileBottomNav from '../Trading/MobileView/MobileBottomNav';
import TopBar from '../Trading/TopBar';
import TradingSidebar from '../Trading/TradingSidebar';
import { useState } from 'react';

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarCollapsedToIcons, setSidebarCollapsedToIcons] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  return (
    <div className="flex h-screen bg-[#1b2230]">
      <div className='hidden md:flex'>
        <TradingSidebar
          isExpanded={sidebarExpanded}
          onToggleExpand={() => setSidebarExpanded(v => !v)}
          onSettingsClick={() => { }}
          onSocialClick={() => { }}
          onCollapseToIcons={() => setSidebarCollapsedToIcons(v => !v)}
          isCollapsedToIcons={sidebarCollapsedToIcons}
          isFullscreen={false}
          setIsFullscreen={() => { }}
        />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          balance={0}
          initialIsLive={false}
          hideBalance={false}
          onToggleHideBalance={() => { }}
        />

        <div className="flex-1 overflow-auto px-2 py-2">
          <div className="relative">

            {/* RIGHT INFO TEXT (IMAGE STYLE) */}
            <div className="hidden md:flex absolute right-0 top-0 text-right text-sm text-muted-foreground flex flex-row">
              <div className='h-8 '>
                Available for withdrawal
                <div className="text-white font-semibold">0.00 $</div>
              </div>
              <div className='h-8 pl-8 '>
                In the account
                <div className="text-white font-semibold">0.00 $</div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="mx-auto ">
              {children}
            </div>

          </div>
        </div>
      </div>
     <MobileBottomNav onMoreClick={() => setIsMoreOpen(true)} />
    </div>
  );
}
