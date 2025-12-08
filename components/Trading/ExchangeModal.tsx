import { X, Check, ArrowRight } from 'lucide-react';
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

  const exchangeRate = 113.97;
  const exchangeFee = 3;

  const currentCurrencyData = currencies.find(c => c.code === myCurrency) || { code: 'INR', symbol: '₹', flag: '🇮🇳' };
  const newCurrencyData = currencies.find(c => c.code === newCurrency) || currencies[0];

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[700px] bg-[#1a1f2e] rounded-xl shadow-2xl border border-[#2a3040]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a3040]">
          <h2 className="text-xl font-semibold text-white">Exchange Form</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#2a3040] transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* My Currency */}
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 text-xs text-gray-500 bg-[#1a1f2e] z-10">
                My Currency:
              </label>
              <div className="bg-[#0f1114] border border-[#2a3040] rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">{currentCurrencyData.flag}</span>
                <span className="text-lg font-semibold text-white">{myCurrency}</span>
              </div>
            </div>

            {/* New Currency */}
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 text-xs text-gray-500 bg-[#1a1f2e] z-10">
                New Currency:
              </label>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full bg-[#0f1114] border border-[#2a3040] rounded-lg p-4 flex items-center justify-between gap-3 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{newCurrencyData.flag}</span>
                  <span className="text-lg font-semibold text-white">{newCurrency}</span>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0f1114] border border-[#2a3040] rounded-lg overflow-hidden z-20 shadow-xl">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setNewCurrency(currency.code);
                        setShowDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2a3040] transition-colors ${newCurrency === currency.code ? 'bg-[#2a3040]' : ''}`}
                    >
                      <span className="text-xl">{currency.flag}</span>
                      <span className="text-white font-medium">{currency.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Exchange Display */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">You are exchanging:</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-white">0.00 {myCurrency}</span>
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">₹</span>
                </div>
              </div>
            </div>

            <ArrowRight size={24} className="text-gray-500" />

            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">You will receive:</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{newCurrencyData.symbol}</span>
                </div>
                <span className="text-2xl font-bold text-white">0.00 {newCurrency}</span>
              </div>
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="text-center text-sm text-gray-400 mb-8">
            Exchange Fee: {exchangeFee}%. {exchangeRate.toFixed(2)} {myCurrency} = 1 {newCurrency}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-4 bg-success hover:bg-success/90 text-white font-semibold rounded-lg transition-colors">
              <Check size={18} />
              Yes, proceed
            </button>
            <button 
              onClick={onClose}
              className="py-4 bg-[#2a3040] hover:bg-[#3a4050] text-white font-semibold rounded-lg transition-colors"
            >
              No, go back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExchangeModal;