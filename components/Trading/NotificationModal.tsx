import { X } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className=" absolute top-full mt-2 z-50
  left-1/2 -translate-x-1/2
  w-[200px]
  sm:w-[320px]
  md:w-[250px]">
        <div data-scroll className="bg-[#1a1f2e] border border-[#2a3040] rounded-sm shadow-2xl overflow-hidden h-[150px]">
          <div className="flex items-center justify-between p-4 border-b border-[#2a3040]">
            <h3 className="text-white font-semibold text-[12px] md:text-[10px]">
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
            <button className="text-primary text-[10px] hover:underline">
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
      </div>
    </>
  );
};



export default NotificationModal;