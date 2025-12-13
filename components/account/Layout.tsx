'use client';

import React, { useState } from 'react';
import TradingSidebar from '../Trading/TradingSidebar';
import TopBar from '../Trading/TopBar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [sidebarCollapsedToIcons, setSidebarCollapsedToIcons] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  return (
    <div className="flex h-screen bg-[#1b2230] overflow-hidden text-white">
      {/* Sidebar */}
      <TradingSidebar
        isExpanded={sidebarExpanded}
        onToggleExpand={() => setSidebarExpanded((v) => !v)}
        onSettingsClick={() => setShowSettings(true)}
        onSocialClick={() => setShowSocialModal(true)}
        onCollapseToIcons={() =>
          setSidebarCollapsedToIcons((v) => !v)
        }
        isCollapsedToIcons={sidebarCollapsedToIcons}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
