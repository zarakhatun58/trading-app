"use client";
import { useState } from 'react';
import { Pencil, BarChart3, Clock, X } from 'lucide-react';

interface ChartToolbarProps {
  onDrawingClick: () => void;
  onChartTypeChange: (type: string) => void;
  currentChartType: string;
  currentTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const chartTypes = [
  { id: 'area', label: 'Area', icon: '📈' },
  { id: 'candles', label: 'Candles', icon: '🕯️' },
  { id: 'bars', label: 'Bars', icon: '📊' },
  { id: 'heiken', label: 'Heiken Ashi', icon: '🎯' },
];

const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '1d'];

export const ChartToolbar = ({
  onDrawingClick,
  onChartTypeChange,
  currentChartType,
  currentTimeframe,
  onTimeframeChange,
}: ChartToolbarProps) => {
  const [showChartTypes, setShowChartTypes] = useState(false);
  const [showTimeframes, setShowTimeframes] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
      <button
        onClick={onDrawingClick}
        className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur border border-border flex items-center justify-center hover:bg-accent transition-colors"
        title="Drawing Tools"
      >
        <Pencil size={18} className="text-foreground" />
      </button>
      <div className="relative">
        <button
          onClick={() => {
            setShowChartTypes(!showChartTypes);
            setShowTimeframes(false);
          }}
          className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur border border-border flex items-center justify-center hover:bg-accent transition-colors"
          title="Chart Type"
        >
          <BarChart3 size={18} className="text-foreground" />
        </button>

        {showChartTypes && (
          <div className="absolute left-12 bottom-0 bg-card border border-border rounded-lg shadow-xl min-w-[160px] overflow-hidden">
            <div className="p-2 border-b border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Chart Type</span>
              <button
                onClick={() => setShowChartTypes(false)}
                className="p-1 hover:bg-accent rounded"
              >
                <X size={12} />
              </button>
            </div>
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  onChartTypeChange(type.id);
                  setShowChartTypes(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-accent transition-colors ${
                  currentChartType === type.id ? 'bg-primary/20 text-primary' : 'text-foreground'
                }`}
              >
                <span className="text-base">{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => {
            setShowTimeframes(!showTimeframes);
            setShowChartTypes(false);
          }}
          className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur border border-border flex items-center justify-center hover:bg-accent transition-colors text-xs font-mono font-semibold"
          title="Timeframe"
        >
          {currentTimeframe}
        </button>

        {showTimeframes && (
          <div className="absolute left-12 bottom-0 bg-card border border-border rounded-lg shadow-xl min-w-[80px] overflow-hidden">
            <div className="p-2 border-b border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Time</span>
              <button
                onClick={() => setShowTimeframes(false)}
                className="p-1 hover:bg-accent rounded"
              >
                <X size={12} />
              </button>
            </div>
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  onTimeframeChange(tf);
                  setShowTimeframes(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm font-mono hover:bg-accent transition-colors ${
                  currentTimeframe === tf ? 'bg-primary/20 text-primary' : 'text-foreground'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur border border-border flex items-center justify-center hover:bg-destructive/20 hover:border-destructive/50 transition-colors"
        title="Delete Tools"
      >
        <X size={18} className="text-muted-foreground" />
      </button>
    </div>
  );
};
export default ChartToolbar;
