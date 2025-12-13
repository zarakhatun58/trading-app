import { useState } from "react";

interface DailyLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

const DailyLimitModal = ({ isOpen, onClose, balance }: DailyLimitModalProps) => {
  const [limit, setLimit] = useState('');

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed bg-[#2b3040] z-40" onClick={onClose} />

      <div className="fixed z-50 inset-0 flex items-center justify-center p-4">
        <div className="bg-[#2b3040] w-full max-w-md rounded-lg p-5 space-y-4">

          <h2 className="text-white font-semibold text-lg">
            Daily limit
          </h2>

          <p className="text-sm text-slate-400">
            A daily trading limit can help you reduce financial risks.
            The limit is not spent if you trade for profit.
            The limit can be changed or deleted at any time.
          </p>

          <div className="relative w-full">
             <label className="bg-[#2b3040] absolute -top-2 left-3 px-1 text-[10px] text-gray-400 ">
                Limit amount
            </label>
            <input
              type="number"
              placeholder="Enter the amount"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
                className="bg-[#2b3040] w-full p-3 border border-[#ffffff1a] rounded text-sm text-white focus:outline-none"
            />
        </div>

          <div className="text-xs text-slate-400">
            The current balance of your Live account – <span className="text-white">${balance.toFixed(2)}</span>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-300 bg-red-400 hover:bg-slate-800 rounded"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                console.log('Saved limit:', limit);
                onClose();
              }}
              className="px-4 py-2 text-sm bg-green-400 hover:bg-iprimary rounded text-white"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default DailyLimitModal;
