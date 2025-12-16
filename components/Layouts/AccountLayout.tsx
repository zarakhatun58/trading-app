// components/layouts/AccountLayout.tsx
'use client';

import { useState } from 'react';
import TradingSidebar from '../../components/Trading/TradingSidebar';
import TopBar from '../../components/Trading/TopBar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [sidebarCollapsedToIcons, setSidebarCollapsedToIcons] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [balance] = useState(10000);

  return (
    <div className="flex h-screen bg-[#1b2230] overflow-hidden text-white">
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

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          balance={balance}
          initialIsLive={false}
          hideBalance={hideBalance}
          onToggleHideBalance={() => setHideBalance(v => !v)}
        />

        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
