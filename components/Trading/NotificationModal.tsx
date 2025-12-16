import { X } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* RIGHT SLIDE PANEL */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full
          w-full sm:w-[400px]
          bg-[#1a1f2e]
          border-l border-[#2a3040]
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a3040]">
          <h3 className="text-white font-semibold text-base">
            Notifications
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            aria-label="Close notifications"
          >
            ✕
          </button>
        </div>

        {/* ACTION */}
        <div className="flex justify-end px-4 py-2 border-b border-[#2a3040]">
          <button className="text-primary text-xs hover:underline">
            MARK ALL AS READ
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex items-center justify-center h-[calc(100vh-140px)]">
          <p className="text-gray-500 text-sm">
            No notifications
          </p>
        </div>
      </div>
    </>
  );
};



export default NotificationModal;