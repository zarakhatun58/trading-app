import { X, Check, ArrowRight, PoundSterling } from 'lucide-react';
import { useState } from 'react';

interface ExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: string;
}

const currencies = [
  { code: 'EUR', symbol: '€', flag: '🇪🇺' },
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', symbol: 'C$', flag: '🇨🇦' },
];

const ExchangeModal = ({
  isOpen,
  onClose,
  currentCurrency
}: ExchangeModalProps) => {
  const [myCurrency] = useState(currentCurrency);
  const [newCurrency, setNewCurrency] = useState('EUR');
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
      />

      {/* MODAL WRAPPER */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* MODAL */}
        <div
          className="
            w-full max-w-[720px]
            max-h-[90vh]
            bg-[#2b3040]
            rounded-xl
            shadow-2xl
            flex flex-col
            overflow-hidden
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b border-[#3a4050]">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Exchange Form
            </h2>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#3a4050] transition"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* BODY (SCROLLABLE) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Currency Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* My Currency */}
              <div className="relative">
                <label className="absolute -top-2 left-3 px-1 text-xs text-gray-400 bg-[#2b3040]">
                  My Currency
                </label>
                <div className="border border-[#3a4050] rounded-lg p-3 flex items-center gap-3">
                  <PoundSterling size={16} className="text-green-500 bg-white rounded-full p-1" />
                  <span className="text-white text-sm">{myCurrency}</span>
                </div>
              </div>

              {/* New Currency */}
              <div className="relative">
                <label className="absolute -top-2 left-3 px-1 text-xs text-gray-400 bg-[#2b3040]">
                  New Currency
                </label>

                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full border border-[#3a4050] rounded-lg p-3 flex justify-between items-center hover:border-primary"
                >
                  <span className="text-white text-sm">{newCurrency}</span>
                  <span className={`text-gray-400 transition ${showDropdown ? 'rotate-180' : ''}`}>⌄</span>
                </button>

                {showDropdown && (
                  <div className="absolute z-30 mt-1 w-full max-h-[180px] overflow-y-auto bg-[#2b3040] rounded-lg border border-[#3a4050]">
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setNewCurrency(c.code);
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-[#3a4050]"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Exchange Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">
                  You are exchanging
                </div>
                <div className="text-lg font-bold text-white">
                  0.00 {myCurrency}
                </div>
              </div>

              <ArrowRight className="text-gray-400 hidden md:block" />

              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">
                  You will receive
                </div>
                <div className="text-lg font-bold text-white">
                  0.00 {newCurrency}
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-400 mb-6">
              Exchange Fee: 3% • 113.97 {myCurrency} = 1 {newCurrency}
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="py-3 bg-success text-white rounded-lg font-semibold hover:bg-success/90">
                Yes, proceed
              </button>
              <button
                onClick={onClose}
                className="py-3 bg-[#3a4050] text-white rounded-lg hover:bg-[#4a5060]"
              >
                No, go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ExchangeModal;