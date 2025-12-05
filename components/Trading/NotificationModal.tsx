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
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-[400px] max-w-[90vw]">
        <div className="bg-[#1a1f2e] border border-[#2a3040] rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#2a3040]">
            <h3 className="text-white font-semibold">Notifications</h3>
            <button 
              onClick={onClose}
              className="text-primary text-xs hover:underline"
            >
              MARK ALL AS READ
            </button>
          </div>
          
          <div className="p-8 text-center">
            <p className="text-gray-500 text-sm">No notifications</p>
          </div>
        </div>
      </div>
    </>
  );
};


export default NotificationModal;