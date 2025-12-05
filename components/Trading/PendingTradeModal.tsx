import { useState } from 'react';
import { X, Plus, Minus, ArrowUp, ArrowDown, Clock } from 'lucide-react';

interface PendingTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuote: number;
  onTrade: (direction: 'up' | 'down', amount: number, type: 'quote' | 'time', value: string, period: string) => void;
}

const periods = ['M1', 'M2', 'M5', 'M15', 'M30', 'M45', 'H1', 'H2', 'H4'];

 const PendingTradeModal = ({ isOpen, onClose, currentQuote, onTrade }: PendingTradeModalProps) => {
  const [activeTab, setActiveTab] = useState<'quote' | 'time'>('quote');
  const [quoteValue, setQuoteValue] = useState(currentQuote.toFixed(3));
  const [timeValue, setTimeValue] = useState('05/12 09:43:00');
  const [period, setPeriod] = useState('M1');
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const [investment, setInvestment] = useState(100);

  if (!isOpen) return null;

  const adjustInvestment = (delta: number) => {
    setInvestment(prev => Math.max(1, prev + delta));
  };

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  return (
    <div className="fixed right-[230px] top-[100px] z-50">
      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a3040] shadow-2xl w-[280px] overflow-hidden">
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('quote')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'quote'
                ? 'bg-[#2a3040] text-white'
                : 'bg-[#1a1f2e] text-gray-400 hover:text-gray-300'
            }`}
          >
            QUOTE
          </button>
          <button
            onClick={() => setActiveTab('time')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'time'
                ? 'bg-primary text-white'
                : 'bg-[#1a1f2e] text-gray-400 hover:text-gray-300'
            }`}
          >
            TIME
          </button>
        </div>

        <div className="p-4 space-y-4">
          {activeTab === 'quote' ? (
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 text-[10px] text-gray-500 bg-[#1a1f2e]">
                Quote:
              </label>
              <input
                type="text"
                value={quoteValue}
                onChange={(e) => setQuoteValue(e.target.value)}
                className="w-full p-3 bg-[#0d1117] border border-[#2a3040] rounded-lg text-white font-mono text-lg focus:outline-none focus:border-primary"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current quote: {currentQuote.toFixed(3)}
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 text-[10px] text-gray-500 bg-[#1a1f2e]">
                Time:
              </label>
              <input
                type="text"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="w-full p-3 bg-[#0d1117] border border-[#2a3040] rounded-lg text-white font-mono text-lg focus:outline-none focus:border-primary"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current time: {currentTime}
              </div>
            </div>
          )}

          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[10px] text-gray-500 bg-[#1a1f2e] z-10">
              Period:
            </label>
            <button
              onClick={() => setShowPeriodMenu(!showPeriodMenu)}
              className="w-full p-3 bg-[#0d1117] border border-[#2a3040] rounded-lg text-white font-semibold text-left focus:outline-none focus:border-primary"
            >
              {period}
            </button>
            
            {showPeriodMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1f2e] border border-[#2a3040] rounded-lg overflow-hidden z-50 shadow-xl">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPeriod(p);
                        setShowPeriodMenu(false);
                      }}
                      className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                        period === p
                          ? 'bg-primary text-white'
                          : 'bg-[#2a3040] text-gray-300 hover:bg-[#3a4050]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[10px] text-gray-500 bg-[#1a1f2e] z-10">
              Investment
            </label>
            <div className="flex items-center justify-between bg-[#0d1117] border border-[#2a3040] rounded-lg p-2">
              <button
                onClick={() => adjustInvestment(-10)}
                className="w-8 h-8 rounded-full bg-[#2a3040] flex items-center justify-center text-gray-300 hover:bg-[#3a4050] transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="font-mono text-lg text-white">{investment} ₹</span>
              <button
                onClick={() => adjustInvestment(10)}
                className="w-8 h-8 rounded-full bg-[#2a3040] flex items-center justify-center text-gray-300 hover:bg-[#3a4050] transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            <button className="text-primary text-xs font-semibold mt-1 hover:underline">
              SWITCH
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onTrade('up', investment, activeTab, activeTab === 'quote' ? quoteValue : timeValue, period)}
              className="w-full py-3 px-4 rounded-lg bg-success hover:bg-success/90 text-white font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Up</span>
              </div>
              <ArrowUp size={18} />
            </button>

            <button
              onClick={() => onTrade('down', investment, activeTab, activeTab === 'quote' ? quoteValue : timeValue, period)}
              className="w-full py-3 px-4 rounded-lg bg-destructive hover:bg-destructive/90 text-white font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Put</span>
              </div>
              <ArrowDown size={18} />
            </button>
          </div>
          <button className="w-full text-primary text-xs font-semibold hover:underline">
            HOW IT WORKS?
          </button>
        </div>
      </div>
    </div>
  );
};


export default PendingTradeModal;