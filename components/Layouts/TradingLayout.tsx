'use client';

import { useState } from 'react';
import TradingSidebar from '../Trading/TradingSidebar';
import TopBar from '../Trading/TopBar';

export default function TradingLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarCollapsedToIcons, setSidebarCollapsedToIcons] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [balance] = useState(10000);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {!isFullscreen && (
        <TradingSidebar
          isExpanded={sidebarExpanded}
          onToggleExpand={() => setSidebarExpanded(v => !v)}
          onSettingsClick={() => {}}
          onSocialClick={() => {}}
          onCollapseToIcons={() => setSidebarCollapsedToIcons(v => !v)}
          isCollapsedToIcons={sidebarCollapsedToIcons}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
        />
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          balance={balance}
          initialIsLive={false}
          hideBalance={hideBalance}
          onToggleHideBalance={() => setHideBalance(v => !v)}
        />

        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
