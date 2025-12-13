'use client';

import TopBar from "./TopBar";
import TradingSidebar from "./TradingSidebar";


export default function TradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* <TradingSidebar /> */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <TopBar /> */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
