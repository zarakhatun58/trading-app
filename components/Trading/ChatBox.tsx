import { useState } from 'react';
import { X, Send, Paperclip, Smile } from 'lucide-react';

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

 const ChatBox = ({ isOpen, onClose }: ChatBoxProps) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[380px] max-w-[95vw]">
      <div className="bg-[#1a1f2e] border border-[#2a3040] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
   
        <div className="flex items-center justify-between p-4 bg-[#0f1114] border-b border-[#2a3040]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Live Support</h3>
              <span className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                Online
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#2a3040] transition-colors text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <div className="bg-[#2a3040] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                <p className="text-white text-sm">Hello! How can I help you today?</p>
                <span className="text-xs text-gray-500 mt-1 block">12:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#0f1114] border-t border-[#2a3040]">
          <div className="flex items-center gap-2 bg-[#1a1f2e] border border-[#2a3040] rounded-xl px-3 py-2">
            <button className="p-2 rounded-lg hover:bg-[#2a3040] transition-colors text-gray-400 hover:text-white">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-gray-500"
            />
            <button className="p-2 rounded-lg hover:bg-[#2a3040] transition-colors text-gray-400 hover:text-white">
              <Smile size={18} />
            </button>
            <button className="p-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-white">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ChatBox;