"use client";

import { TimerReset, TrendingUp, Trophy } from "lucide-react";

export default function MobileBottomSidebar({
  onSelect,
  activeId,
}: {
  onSelect: (id: string) => void;
  activeId: string;
}) {
  return (
    <div
      className="
        md:hidden
        fixed bottom-0 left-0 right-0
        h-[56px]
        bg-[#101729]
        border-t border-[#2a3040]
        z-50
        flex justify-around items-center
      "
    >
      {[
        { id: "trade", icon: <TrendingUp size={20} />, label: "Trade" },
        { id: "pending", icon: <TimerReset size={20} />, label: "Pending" },
        { id: "leaderboard", icon: <Trophy size={20} />, label: "Board" },
      ].map(item => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className="
            flex flex-col items-center justify-center
            text-gray-300 hover:text-white
          "
        >
          {item.icon}
          <span className="text-[10px] mt-0.5">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
