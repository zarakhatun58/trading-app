import { useEffect, useState } from 'react';
import { X, Plus, Minus, ArrowUp, ArrowDown, Clock } from 'lucide-react';
import HowDoesModal from './HowDoesModal';

interface PendingTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuote: number;
  onTrade: (direction: 'up' | 'down', amount: number, type: 'quote' | 'time', value: string, period: string) => void;
}

const periods = ['M1', 'M2', 'M5', 'M15', 'M30', 'M45', 'H1', 'H2', 'H4'];
// Duration time options
const durationTimeOptions = [
  { label: '00:05', value: '00:05' },
  { label: '00:10', value: '00:10' },
  { label: '00:15', value: '00:15' },
  { label: '00:30', value: '00:30' },
  { label: '01:00', value: '01:00' },
  { label: '02:00', value: '02:00' },
  { label: '05:00', value: '05:00' },
  { label: '10:00', value: '10:00' },
  { label: '15:00', value: '15:00' },
  { label: '30:00', value: '30:00' },
  { label: '01:00', value: '01:00' },
  { label: '02:00', value: '02:00' },
  { label: '04:00', value: '04:00' },
];

// Generate absolute time options
const generateAbsoluteTimeOptions = () => {
  const now = new Date();
  const options = [];

  for (let i = 0; i < 12; i++) {
    const time = new Date(now.getTime() + (i + 1) * 60000 * 5);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    options.push({
      label: `${hours}:${minutes}`,
      value: `${hours}:${minutes}`
    });
  }

  return options;
};
function getCurrentDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day}/${month} ${hours}:${minutes}:${seconds}`;
}
const PendingTradeModal = ({ isOpen, onClose, currentQuote, onTrade }: PendingTradeModalProps) => {
  const [activeTab, setActiveTab] = useState<'quote' | 'time'>('quote');
  const [quoteValue, setQuoteValue] = useState(currentQuote.toFixed(3));
  const [timeValue, setTimeValue] = useState(getCurrentDateTime());
  const [period, setPeriod] = useState('M1');
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const [investment, setInvestment] = useState(100);
  const [isAbsoluteTimeMode, setIsAbsoluteTimeMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentDateTime());
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);


  const adjustInvestment = (delta: number) => {
    setInvestment(prev => Math.max(1, prev + delta));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const now = getCurrentDateTime();
      setCurrentTime(now);

      if (!isAbsoluteTimeMode) {
        setTimeValue(now);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;
  const absoluteTimeOptions = generateAbsoluteTimeOptions();
  const timeOptions = isAbsoluteTimeMode ? absoluteTimeOptions : durationTimeOptions
  return (
    <div className="fixed right-[230px] top-[100px] z-50">
      <div className="bg-[#191919] rounded-lg border border-[#2a3040] shadow-2xl w-[180px] overflow-hidden p-4">
        {/* Tabs */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab('quote')}
            className={`flex-1 py-1 rounded-sm text-[10px] font-semibold transition-colors ${activeTab === 'quote'
              ? 'bg-[#2a3040] text-white'
              : 'bg-[#1a1f2e] text-gray-400 hover:text-gray-300'
              }`}
          >
            QUOTE
          </button>
          <button
            onClick={() => setActiveTab('time')}
            className={`flex-1 py-1 rounded-sm text-[10px] font-semibold transition-colors ${activeTab === 'time'
              ? 'bg-primary text-white'
              : 'bg-[#1a1f2e] text-gray-400 hover:text-gray-300'
              }`}
          >
            TIME
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'quote' ? (
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#191919]">
                Quote:
              </label>
              <input
                type="text"
                value={quoteValue}
                onChange={(e) => setQuoteValue(e.target.value)}
                className="w-full py-2 px-3 bg-[#191919] border border-[#3a4050] rounded-sm text-white text-[14px] focus:outline-none focus:border-primary"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current quote: {currentQuote.toFixed(3)}
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#191919]">
                Time:
              </label>
              <input
                type="text"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="w-full py-2 px-3 bg-[#191919] border border-[#2a3040] rounded-sm text-white text-[12px] focus:outline-none focus:border-primary"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current time: {currentTime}
              </div>
            </div>
          )}

          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#191919] z-10">
              Period:
            </label>
            <button
              onClick={() => setShowPeriodMenu(!showPeriodMenu)}
              className="w-full p-3 bg-[#191919] border border-[#2a3040] rounded-sm text-[12px] text-white font-semibold text-left focus:outline-none focus:border-primary"
            >
              {period}
            </button>

            {showPeriodMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#191919] border border-[#2a3040] rounded-sm overflow-hidden z-50 shadow-xl">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPeriod(p);
                        setShowPeriodMenu(false);
                      }}
                      className={`py-2 px-3 rounded text-[10px] transition-colors ${period === p
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
            <label className="absolute -top-2 left-3 px-1 text-[10px] text-gray-500 bg-[#191919] z-10">
              Investment
            </label>
            <div className="flex items-center justify-between bg-[#191919] border border-[#2a3040] rounded-sm p-2">
              <button
                onClick={() => adjustInvestment(-10)}
                className="w-6 h-6 rounded-full bg-[#2a3040] flex items-center justify-center text-gray-300 hover:bg-[#3a4050] transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="font-mono text-[14px] text-white">{investment} ₹</span>
              <button
                onClick={() => adjustInvestment(10)}
                className="w-6 h-6 rounded-full bg-[#2a3040] flex items-center justify-center text-gray-300 hover:bg-[#3a4050] transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            <button className="absolute -bottom-2 left-12 px-1 text-[10px] text-primary font-bold bg-[#191919]">
              SWITCH
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onTrade('up', investment, activeTab, activeTab === 'quote' ? quoteValue : timeValue, period)}
              className="w-full py-1 px-2 rounded-sm text-[14px] bg-success hover:bg-success/90 text-white font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Up</span>
              </div>
              <ArrowUp size={16} />
            </button>

            <button
              onClick={() => onTrade('down', investment, activeTab, activeTab === 'quote' ? quoteValue : timeValue, period)}
              className="w-full py-1 px-2 rounded-sm bg-destructive hover:bg-destructive/90 text-white font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Put</span>
              </div>
              <ArrowDown size={18} />
            </button>
          </div>
          <button
            onClick={() => setShowHowItWorks(true)}
            className="w-full text-primary text-[10px] font-semibold hover:underline"
          >
            HOW IT WORKS?
          </button>
        </div>
      </div>
      <HowDoesModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </div>
  );
};


export default PendingTradeModal;