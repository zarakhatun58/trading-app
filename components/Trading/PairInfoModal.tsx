import { X, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

interface PairInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairName: string;
  pairFlag?: string;
  percentage: number;
  currentPrice: number;
}

const PairInfoModal = ({
  isOpen,
  onClose,
  pairName,
  pairFlag = '🇨🇭🇯🇵',
  percentage,
  currentPrice
}: PairInfoModalProps) => {
  if (!isOpen) return null;
const [activeMiniTab, setActiveMiniTab] = useState("5min");

  const tradingSchedule = [
    { date: '9 December', day: 'Tuesday', time: '02:00 - 20:00' },
    { date: '10 December', day: 'Wednesday', time: '02:00 - 20:00' },
    { date: '11 December', day: 'Thursday', time: '02:00 - 20:00' },
    { date: '12 December', day: 'Friday', time: '02:00 - 20:00' },
    { date: '13 December', day: 'Saturday', time: 'Market Closed' },
    { date: '14 December', day: 'Sunday', time: 'Market Closed' },
    { date: '15 December', day: 'Monday', time: '02:00 - 20:00' },
  ];
  

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[600px] bg-[#1a1f2e] rounded-lg shadow-2xl border border-[#2a3040]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a3040]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{pairFlag}</span>
            <span className="font-semibold text-white text-lg">{pairName}</span>
            <span className="text-success font-semibold">{percentage}%</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-success font-semibold">Open Now</span>
              <span className="text-gray-400">/ Closes today at 20:00</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#2a3040] transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Price Now</div>
              <div className="font-semibold text-white">{currentPrice.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Session Change</div>
              <div className="font-semibold text-success">+0.06%</div>
            </div>
          </div>

          {/* Trade Button */}
          <div className="flex justify-end mb-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors">
              Trade Now
              <TrendingUp size={16} />
            </button>
          </div>

          {/* Sentiment Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-semibold text-white">Sell</div>
                <div className="text-[10px] text-gray-400">Traders' Sentiment</div>
              </div>
              <div className="flex-1 mx-4">
                <div className="h-2 rounded-full bg-[#2a3040] overflow-hidden flex">
                  <div className="h-full bg-success" style={{ width: '64%' }} />
                  <div className="h-full bg-destructive" style={{ width: '36%' }} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-success font-semibold">64%</span>
                <span className="text-destructive font-semibold">36%</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-[10px] text-gray-400 mb-1">Minimum investment</div>
              <div className="text-sm font-semibold text-primary">₹100</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 mb-1">Profit - 1 min</div>
              <div className="text-sm font-semibold text-success">63%</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 mb-1">Profit - 5+ min</div>
              <div className="text-sm font-semibold text-success">88%</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 mb-1">Expiry time</div>
              <div className="text-sm font-semibold text-white">1 min - 4 hour</div>
            </div>
          </div>

          {/* Chart and Schedule */}
          <div className="grid grid-cols-2 gap-4">
            {/* Mini Chart */}
            {/* Mini Chart */}
<div className="bg-[#0f1114] rounded-lg p-3">
  <div className="flex items-center gap-4 mb-2">
    <button
      onClick={() => setActiveMiniTab("5min")}
      className={`text-xs pb-1 font-semibold border-b-2 ${
        activeMiniTab === "5min"
          ? "text-white border-primary"
          : "text-gray-400 border-transparent"
      }`}
    >
      5 min change
    </button>

    <button
      onClick={() => setActiveMiniTab("60min")}
      className={`text-xs pb-1 font-semibold border-b-2 ${
        activeMiniTab === "60min"
          ? "text-white border-primary"
          : "text-gray-400 border-transparent"
      }`}
    >
      60 min change
    </button>

    <button
      onClick={() => setActiveMiniTab("1day")}
      className={`text-xs pb-1 font-semibold border-b-2 ${
        activeMiniTab === "1day"
          ? "text-white border-primary"
          : "text-gray-400 border-transparent"
      }`}
    >
      1 day change
    </button>
  </div>

  {/* ---------- TAB CONTENT ---------- */}

  {activeMiniTab === "5min" && (
    <>
      <div className="text-success text-lg font-semibold mb-2">+0.12%</div>
      <div className="h-20 flex items-end gap-0.5">
        {Array.from({ length: 40 }).map((_, i) => {
          const height = 10 + Math.random() * 60;
          const isPositive = Math.random() > 0.5;
          return (
            <div
              key={i}
              className={`w-1 ${isPositive ? "bg-success/50" : "bg-destructive/50"}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-400">
        <span>1 month change <span className="text-success">+1.34%</span></span>
        <span>1 year change <span className="text-success">+13.19%</span></span>
        <span>YTD change <span className="text-success">+11.47%</span></span>
      </div>
    </>
  )}

  {activeMiniTab === "60min" && (
    <>
      <div className="text-destructive text-lg font-semibold mb-2">-0.23%</div>
      <div className="h-20 flex items-end gap-0.5">
        {Array.from({ length: 40 }).map((_, i) => {
          const height = 20 + Math.random() * 50;
          const isPositive = Math.random() > 0.3;
          return (
            <div
              key={i}
              className={`w-1 ${isPositive ? "bg-success/50" : "bg-destructive/50"}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-400">
        <span>1 month change <span className="text-destructive">-0.55%</span></span>
        <span>1 year change <span className="text-success">+8.03%</span></span>
        <span>YTD change <span className="text-success">+6.14%</span></span>
      </div>
    </>
  )}

  {activeMiniTab === "1day" && (
    <>
      <div className="text-success text-lg font-semibold mb-2">+1.02%</div>
      <div className="h-20 flex items-end gap-0.5">
        {Array.from({ length: 40 }).map((_, i) => {
          const height = 30 + Math.random() * 40;
          const isPositive = Math.random() > 0.4;
          return (
            <div
              key={i}
              className={`w-1 ${isPositive ? "bg-success/50" : "bg-destructive/50"}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-400">
        <span>1 month change <span className="text-success">+2.44%</span></span>
        <span>1 year change <span className="text-success">+15.92%</span></span>
        <span>YTD change <span className="text-success">+12.36%</span></span>
      </div>
    </>
  )}
</div>


            {/* Trading Schedule */}
            <div className="bg-[#0f1114] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-sm font-semibold text-white">Trading Schedule</span>
              </div>
              <div className="space-y-1">
                <div className="grid grid-cols-3 text-[10px] text-gray-500 pb-1 border-b border-[#2a3040]">
                  <span>Date</span>
                  <span>Weekday</span>
                  <span>Trading Time</span>
                </div>
                  <div >
                {tradingSchedule.map((item, i) => (
                  <div key={i} className="grid grid-cols-3 text-[10px] py-1">
                    <span className="text-gray-400">{item.date}</span>
                    <span className="text-gray-300">{item.day}</span>
                    <span className={item.time === 'Market Closed' ? 'text-destructive font-semibold' : 'text-primary'}>
                      {item.time}
                    </span>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PairInfoModal;