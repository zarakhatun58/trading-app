"use client";
import { HelpCircle, MoreHorizontal, TrendingUp, Trophy, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";


export default function MobileBottomNav({
  onMoreClick,
}: {
  onMoreClick: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const MOBILE_PRIMARY_ITEMS = [
  { key: 'TRADE', icon: <TrendingUp size={20} />, label: 'Trade', route: '/trading' },
  { key: 'SUPPORT', icon: <HelpCircle size={20} />, label: 'Support', route: '/support' },
  { key: 'ACCOUNT', icon: <User size={20} />, label: 'Account', route: '/account?tab=account' },
  { key: 'TOURNAMENT', icon: <Trophy size={20} />, label: 'Tournament', route: '/account/tournaments' },
];


  return (
    <div
      className="
        md:hidden
        fixed bottom-0 left-0 right-0
        h-[60px]
        bg-[#101729]
        border-t border-[#2a3040]
        z-50
        flex items-center justify-around
      "
    >
      {MOBILE_PRIMARY_ITEMS.map(item => {
        const active = pathname.startsWith(item.route.split('?')[0]);

        return (
          <button
            key={item.key}
            onClick={() => router.push(item.route)}
            className={`flex flex-col items-center text-[10px]
              ${active ? 'text-primary' : 'text-gray-400'}
            `}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        );
      })}

      {/* MORE BUTTON (EXTREME RIGHT) */}
      <button
        onClick={onMoreClick}
        className="flex flex-col items-center text-gray-400 text-[10px]"
      >
        <MoreHorizontal size={22} />
        <span className="mt-1">More</span>
      </button>
    </div>
  );
}
