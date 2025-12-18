import React, { useState } from 'react';
import TradingSidebar from '../components/Trading/TradingSidebar';
import TopBar from '../components/Trading/TopBar';
import { TournamentsTab } from '../components/account/TournamentsTab';
import MobileBottomNav from '../components/Trading/MobileView/MobileBottomNav';

const tournaments = () => {
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
            {/* MAIN CONTENT */}
            <div className="mx-auto ">
            <TournamentsTab/>
            </div>

          </div>
        </div>
      </div>
     <MobileBottomNav onMoreClick={() => setIsMoreOpen(true)} />
    </div>
    );
};

export default tournaments;