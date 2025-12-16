import { useState } from 'react';
import { X, Send, Paperclip, Smile } from 'lucide-react';

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBox = ({ isOpen, onClose }: ChatBoxProps) => {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP (ONLY FOR VERY SMALL SCREENS) */}
      <div
        className="fixed inset-0 z-40 bg-black/40 sm:hidden"
        onClick={onClose}
      />

      {/* CHAT BOX */}
      <div
        className="
          fixed z-50
          right-3
          top-1/2 + -translate-y-1/2
          w-[92vw] max-w-[320px]
          h-[420px]
          sm:w-[320px] sm:h-[440px]
          bg-[#1a1f2e]
          border border-[#2a3040]
          rounded-xl
          shadow-2xl
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#0f1114] border-b border-[#2a3040] rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <div>
              <h3 className="text-white text-xs font-semibold">
                Live Support
              </h3>
              <span className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Online
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#2a3040] text-gray-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-3 overflow-y-auto text-xs">
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">S</span>
            </div>
            <div className="bg-[#2a3040] rounded-xl rounded-tl-none px-3 py-2 max-w-[85%]">
              <p className="text-white text-xs">
                Hello! How can I help you today?
              </p>
              <span className="text-[10px] text-gray-500 mt-1 block">
                12:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* INPUT */}
        <div className="p-2 bg-[#0f1114] border-t border-[#2a3040] rounded-b-xl">
          <div className="flex items-center gap-1 bg-[#1a1f2e] border border-[#2a3040] rounded-lg px-2 py-1">
            <button className="p-1 text-gray-400 hover:text-white">
              <Paperclip size={14} />
            </button>

            <input
              type="text"
              placeholder="Type..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="
                flex-1 bg-transparent outline-none
                text-white text-xs
                placeholder:text-gray-500
              "
            />

            <button className="p-1 text-gray-400 hover:text-white">
              <Smile size={14} />
            </button>

            <button className="p-1 bg-primary text-white rounded">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};




export default ChatBox;