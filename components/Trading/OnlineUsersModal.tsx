interface OnlineUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onlineCount: number;
}

const OnlineUsersModal = ({ isOpen, onClose, onlineCount }: OnlineUsersModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* SLIDE PANEL */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full
          w-full sm:w-[360px]
          bg-[#1a1f2e]
          border-l border-[#2a3040]
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a3040]">
          <h3 className="text-white font-semibold">Online Traders</h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* ONLINE COUNT */}
        <div className="px-4 py-2 flex items-center gap-2 text-green-400 text-sm border-b border-[#2a3040]">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {onlineCount.toLocaleString()} online
        </div>

        {/* USERS LIST */}
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 hover:bg-[#2a3040]/50 transition border-b border-[#2a3040]/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  U
                </div>
                <div>
                  <div className="text-white text-sm">Trader {i + 1}</div>
                  <div className="text-xs text-gray-500">Trading EUR/USD</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-3 border-t border-[#2a3040] text-center text-xs text-gray-500">
          Join thousands of traders worldwide
        </div>
      </div>
    </>
  );
};



export default OnlineUsersModal;