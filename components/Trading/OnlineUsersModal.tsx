interface OnlineUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onlineCount: number;
}

const OnlineUsersModal = ({ isOpen, onClose, onlineCount }: OnlineUsersModalProps) => {
  if (!isOpen) return null;

  const users = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: ['John D.', 'Maria S.', 'Alex K.', 'Sarah M.', 'David L.', 'Emma R.', 'James W.', 'Linda P.', 'Robert T.', 'Anna B.', 'Michael H.', 'Sophie G.'][i],
    country: ['🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇯🇵', '🇨🇦', '🇦🇺', '🇮🇹', '🇪🇸', '🇧🇷', '🇮🇳', '🇷🇺'][i],
    trading: ['EUR/USD', 'GBP/JPY', 'USD/CHF', 'BTC/USD', 'EUR/GBP', 'AUD/USD', 'NZD/JPY', 'USD/CAD', 'EUR/JPY', 'GBP/USD', 'USD/JPY', 'ETH/USD'][i],
    status: Math.random() > 0.3 ? 'active' : 'idle',
  }));

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full right-0 mt-2 z-50 w-[350px] max-w-[90vw]">
        <div className="bg-[#1a1f2e] border border-[#2a3040] rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#2a3040]">
            <h3 className="text-white font-semibold">Online Traders</h3>
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              {onlineCount.toLocaleString()} online
            </span>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {users.map((user) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-3 hover:bg-[#2a3040]/50 transition-colors border-b border-[#2a3040]/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#1a1f2e] ${user.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium flex items-center gap-1">
                      {user.country} {user.name}
                    </div>
                    <div className="text-gray-500 text-xs">Trading {user.trading}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-[#0f1114] border-t border-[#2a3040]">
            <p className="text-center text-xs text-gray-500">
              Join thousands of traders worldwide
            </p>
          </div>
        </div>
      </div>
    </>
  );
};


export default OnlineUsersModal;