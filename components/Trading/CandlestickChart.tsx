"use client";

import { useEffect, useRef, useState } from "react";
import { CandleData, Trade } from "../../types/trading";
import { BarChart3, Bell, Info, Minus, Pen, Plus, X } from "lucide-react";
import PairInfoModal from "./PairInfoModal";


interface CandlestickChartProps {
  data: CandleData[];
  currentPrice: number;
  chartType: 'area' | 'candles' | 'bars' | 'heiken';
  tradeStartTime?: Date;
  tradeEndTime?: Date;
  tradeZone?: 'up' | 'down' | null;
  onOpenDrawing?: () => void;
  onOpenIndicators?: () => void;
  pairName?: string;
  pairFlag?: string;
  pairPercentage?: number;
  trades?: Trade[];
  onSellTrade?: (tradeId: string) => void;
}

interface OHLCData {
  open: number;
  high: number;
  low: number;
  close: number;
  time: string;
}

interface Notification {
  id: string;
  price: number;
  timestamp: Date;
}

 const CandlestickChart = ({ 
  data, 
  currentPrice,
  chartType,
  tradeStartTime,
  tradeEndTime,
  tradeZone,
  onOpenDrawing,
  onOpenIndicators,
  pairName = 'CHF/JPY',
  pairFlag = '🇨🇭🇯🇵',
  pairPercentage = 63,
  trades = [],
  onSellTrade
}: CandlestickChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCandle, setHoveredCandle] = useState<OHLCData | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [crosshairPrice, setCrosshairPrice] = useState(0);
  const [crosshairTime, setCrosshairTime] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hoveredNotificationId, setHoveredNotificationId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [timeframe, setTimeframe] = useState('1m');
  const [showPairInfo, setShowPairInfo] = useState(false);
  const [hoveredTradeId, setHoveredTradeId] = useState<string | null>(null);

  // Chart padding - keep crosshair within these bounds
  const padding = { top: 40, right: 80, bottom: 40, left: 60 };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Convert to Heiken Ashi data
  const calculateHeikenAshi = (candles: CandleData[]): CandleData[] => {
    if (candles.length === 0) return [];
    
    const heikenData: CandleData[] = [];
    
    for (let i = 0; i < candles.length; i++) {
      const current = candles[i];
      const prev = i > 0 ? heikenData[i - 1] : current;
      
      const haClose = (current.open + current.high + current.low + current.close) / 4;
      const haOpen = i === 0 ? (current.open + current.close) / 2 : (prev.open + prev.close) / 2;
      const haHigh = Math.max(current.high, haOpen, haClose);
      const haLow = Math.min(current.low, haOpen, haClose);
      
      heikenData.push({
        time: current.time,
        open: haOpen,
        high: haHigh,
        low: haLow,
        close: haClose,
      });
    }
    
    return heikenData;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { width, height } = dimensions;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate price at cursor
    const chartData = chartType === 'heiken' ? calculateHeikenAshi(data) : data;
    const prices = chartData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices) - 0.0002;
    const maxPrice = Math.max(...prices) + 0.0002;
    const priceRange = maxPrice - minPrice;

    // Only show crosshair within chart area
    if (x >= padding.left && x <= width - padding.right && y >= padding.top && y <= height - padding.bottom) {
      setShowCrosshair(true);
      setHoverPosition({ x, y });

      // Calculate price at Y position
      const priceAtY = maxPrice - ((y - padding.top) / chartHeight) * priceRange;
      setCrosshairPrice(priceAtY);

      // Calculate time at X position
      const candleIndex = Math.floor(((x - padding.left) / chartWidth) * chartData.length);
      if (candleIndex >= 0 && candleIndex < chartData.length) {
        setCrosshairTime(chartData[candleIndex].time);
        setHoveredCandle({
          open: chartData[candleIndex].open,
          high: chartData[candleIndex].high,
          low: chartData[candleIndex].low,
          close: chartData[candleIndex].close,
          time: chartData[candleIndex].time
        });
      }
    } else {
      setShowCrosshair(false);
    }
  };

  const handleMouseLeave = () => {
    setShowCrosshair(false);
  };

  const addNotification = () => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      price: crosshairPrice,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => {
      const newZoom = Math.max(20, Math.min(200, prev + delta));
      return newZoom;
    });
  };

  // Calculate visible candles based on zoom
  const getVisibleCandles = () => {
    const baseCount = 30;
    const visibleCount = Math.round(baseCount * (100 / zoom));
    return Math.max(10, Math.min(data.length, visibleCount));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.fillStyle = 'hsl(222, 47%, 11%)';
    ctx.fillRect(0, 0, width, height);

    // Use Heiken Ashi data if selected, and apply zoom
    const fullChartData = chartType === 'heiken' ? calculateHeikenAshi(data) : data;
    const visibleCount = getVisibleCandles();
    const chartData = fullChartData.slice(-visibleCount);

    // Calculate price range
    const prices = chartData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices) - 0.0002;
    const maxPrice = Math.max(...prices) + 0.0002;
    const priceRange = maxPrice - minPrice;

    // Helper functions
    const priceToY = (price: number) => {
      return padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
    };

    const indexToX = (index: number) => {
      return padding.left + (index / (chartData.length - 1)) * chartWidth;
    };

    // Draw vertical grid lines
    ctx.strokeStyle = 'hsl(217, 33%, 17%)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    
    const verticalSteps = 10;
    for (let i = 0; i <= verticalSteps; i++) {
      const x = padding.left + (chartWidth / verticalSteps) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();
    }

    // Draw horizontal grid lines
    const priceSteps = 8;
    for (let i = 0; i <= priceSteps; i++) {
      const price = minPrice + (priceRange / priceSteps) * i;
      const y = priceToY(price);
      
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Price labels
      ctx.fillStyle = 'hsl(215, 20%, 55%)';
      ctx.font = '11px JetBrains Mono';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(5), width - 10, y + 4);
    }

    // Time labels
    ctx.textAlign = 'center';
    const timeStep = Math.ceil(chartData.length / 8);
    for (let i = 0; i < chartData.length; i += timeStep) {
      const x = indexToX(i);
      ctx.fillStyle = 'hsl(215, 20%, 55%)';
      ctx.fillText(chartData[i].time, x, height - 10);
    }

    // Draw chart based on type
    if (chartType === 'area') {
      ctx.beginPath();
      ctx.moveTo(indexToX(0), priceToY(chartData[0].close));
      
      for (let i = 1; i < chartData.length; i++) {
        ctx.lineTo(indexToX(i), priceToY(chartData[i].close));
      }
      
      ctx.strokeStyle = 'hsl(142, 71%, 45%)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.lineTo(indexToX(chartData.length - 1), height - padding.bottom);
      ctx.lineTo(indexToX(0), height - padding.bottom);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, 'hsla(142, 71%, 45%, 0.3)');
      gradient.addColorStop(1, 'hsla(142, 71%, 45%, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
    } else if (chartType === 'bars') {
      const barWidth = Math.max(2, (chartWidth / chartData.length) * 0.5);
      
      chartData.forEach((candle, index) => {
        const x = indexToX(index);
        const isGreen = candle.close >= candle.open;
        const color = isGreen ? 'hsl(142, 71%, 45%)' : 'hsl(0, 84%, 60%)';
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(x, priceToY(candle.high));
        ctx.lineTo(x, priceToY(candle.low));
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x - barWidth, priceToY(candle.open));
        ctx.lineTo(x, priceToY(candle.open));
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x, priceToY(candle.close));
        ctx.lineTo(x + barWidth, priceToY(candle.close));
        ctx.stroke();
      });
      
    } else {
      const candleWidth = Math.max(4, (chartWidth / chartData.length) * 0.7);

      chartData.forEach((candle, index) => {
        const x = indexToX(index);
        const isGreen = candle.close >= candle.open;
        
        ctx.strokeStyle = isGreen ? 'hsl(142, 71%, 45%)' : 'hsl(0, 84%, 60%)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, priceToY(candle.high));
        ctx.lineTo(x, priceToY(candle.low));
        ctx.stroke();

        ctx.fillStyle = isGreen ? 'hsl(142, 71%, 45%)' : 'hsl(0, 84%, 60%)';
        const bodyTop = priceToY(Math.max(candle.open, candle.close));
        const bodyBottom = priceToY(Math.min(candle.open, candle.close));
        const bodyHeight = Math.max(1, bodyBottom - bodyTop);
        
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
      });
    }

    // Draw trade zone (green above or red below current price)
    if (tradeZone) {
      const currentY = priceToY(currentPrice);
      if (tradeZone === 'up') {
        const gradient = ctx.createLinearGradient(0, padding.top, 0, currentY);
        gradient.addColorStop(0, 'hsla(142, 71%, 45%, 0.3)');
        gradient.addColorStop(1, 'hsla(142, 71%, 45%, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fillRect(padding.left, padding.top, chartWidth, currentY - padding.top);
      } else if (tradeZone === 'down') {
        const gradient = ctx.createLinearGradient(0, currentY, 0, height - padding.bottom);
        gradient.addColorStop(0, 'hsla(0, 84%, 60%, 0.05)');
        gradient.addColorStop(1, 'hsla(0, 84%, 60%, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fillRect(padding.left, currentY, chartWidth, height - padding.bottom - currentY);
      }
    }

    // Draw current price line
    const currentY = priceToY(currentPrice);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'hsl(199, 89%, 48%)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, currentY);
    ctx.lineTo(width - padding.right, currentY);
    ctx.stroke();

    // Current price badge
    ctx.setLineDash([]);
    ctx.fillStyle = 'hsl(199, 89%, 48%)';
    const badgeWidth = 70;
    const badgeHeight = 20;
    ctx.fillRect(width - padding.right, currentY - badgeHeight / 2, badgeWidth, badgeHeight);
    
    ctx.fillStyle = 'hsl(222, 47%, 11%)';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.textAlign = 'left';
    ctx.fillText(currentPrice.toFixed(5), width - padding.right + 5, currentY + 4);

    // Trade markers
    if (tradeStartTime) {
      const startX = indexToX(chartData.length - 5);
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'hsl(215, 20%, 45%)';
      ctx.beginPath();
      ctx.moveTo(startX, padding.top);
      ctx.lineTo(startX, height - padding.bottom);
      ctx.stroke();
      
      ctx.fillStyle = 'hsl(215, 20%, 65%)';
      ctx.font = '10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Beginning of trade', startX, padding.top - 10);
    }

    if (tradeEndTime) {
      const endX = indexToX(chartData.length - 2);
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'hsl(215, 20%, 45%)';
      ctx.beginPath();
      ctx.moveTo(endX, padding.top);
      ctx.lineTo(endX, height - padding.bottom);
      ctx.stroke();
      
      ctx.fillStyle = 'hsl(215, 20%, 65%)';
      ctx.textAlign = 'center';
      ctx.fillText('End of trade', endX, padding.top - 10);
    }

    // Draw notification lines on chart
    ctx.setLineDash([4, 4]);
    notifications.forEach(notification => {
      const notificationY = priceToY(notification.price);
      if (notificationY >= padding.top && notificationY <= height - padding.bottom) {
        ctx.strokeStyle = 'hsl(45, 100%, 50%)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding.left, notificationY);
        ctx.lineTo(width - padding.right, notificationY);
        ctx.stroke();
      }
    });

  }, [data, dimensions, currentPrice, chartType, tradeStartTime, tradeEndTime, tradeZone, zoom, notifications]);

  // Calculate crosshair boundaries within chart area only
  const crosshairTop = padding.top;
  const crosshairBottom = dimensions.height - padding.bottom;
  const crosshairLeft = padding.left;
  const crosshairRight = dimensions.width - padding.right;

  // Clamp crosshair position strictly within chart bounds
  const clampedX = Math.max(crosshairLeft, Math.min(crosshairRight, hoverPosition.x));
  const clampedY = Math.max(crosshairTop, Math.min(crosshairBottom, hoverPosition.y));

  // Check if hovering near a notification
  const isNearNotification = notifications.some(n => {
    const chartData = chartType === 'heiken' ? calculateHeikenAshi(data) : data;
    const prices = chartData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices) - 0.0002;
    const maxPrice = Math.max(...prices) + 0.0002;
    const priceRange = maxPrice - minPrice;
    const chartHeight = dimensions.height - padding.top - padding.bottom;
    const notificationY = padding.top + chartHeight - ((n.price - minPrice) / priceRange) * chartHeight;
    return Math.abs(clampedY - notificationY) < 15;
  });

  const nearestNotification = notifications.find(n => {
    const chartData = chartType === 'heiken' ? calculateHeikenAshi(data) : data;
    const prices = chartData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices) - 0.0002;
    const maxPrice = Math.max(...prices) + 0.0002;
    const priceRange = maxPrice - minPrice;
    const chartHeight = dimensions.height - padding.top - padding.bottom;
    const notificationY = padding.top + chartHeight - ((n.price - minPrice) / priceRange) * chartHeight;
    return Math.abs(clampedY - notificationY) < 15;
  });

  return (
    <div ref={containerRef} className="relative flex-1 h-full min-h-[300px] md:min-h-[400px] overflow-hidden">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Crosshair Lines - Strictly contained within chart area */}
      {showCrosshair && (
        <>
          {/* Vertical line */}
          <div 
            className="absolute pointer-events-none"
            style={{ 
              left: clampedX,
              top: crosshairTop,
              height: crosshairBottom - crosshairTop,
              width: '1px',
              background: 'rgba(255, 255, 255, 0.7)'
            }}
          />
          {/* Horizontal line - stops at chart right edge */}
          <div 
            className="absolute pointer-events-none"
            style={{ 
              top: clampedY,
              left: crosshairLeft,
              width: crosshairRight - crosshairLeft,
              height: '1px',
              background: 'rgba(255, 255, 255, 0.7)'
            }}
          />
          {/* Time label at bottom */}
          <div 
            className="absolute bg-[#2a3040] text-white text-xs px-2 py-1 rounded pointer-events-none"
            style={{ 
              left: Math.max(crosshairLeft, Math.min(crosshairRight - 60, clampedX - 30)),
              top: crosshairBottom + 4,
            }}
          >
            {crosshairTime}
          </div>
          {/* Price label with notification icon - positioned at right edge of chart area */}
          <div 
            className="absolute flex items-center gap-1 pointer-events-auto"
            style={{ 
              left: crosshairRight - 90,
              top: Math.max(crosshairTop, Math.min(crosshairBottom - 20, clampedY - 10)),
            }}
          >
            {isNearNotification && nearestNotification ? (
              <button 
                onClick={() => removeNotification(nearestNotification.id)}
                className="p-1 bg-destructive rounded hover:bg-destructive/80 transition-colors"
              >
                <X size={12} className="text-white" />
              </button>
            ) : (
              <button 
                onClick={addNotification}
                className="p-1 bg-[#2a3040] rounded hover:bg-[#3a4050] transition-colors"
              >
                <Bell size={12} className="text-gray-300" />
              </button>
            )}
            <span className="bg-[#2a3040] text-white text-xs px-2 py-1 rounded">
              {crosshairPrice.toFixed(5)}
            </span>
          </div>
        </>
      )}

      {/* Pair Info Button */}
      <button
  onClick={() => setShowPairInfo(true)}
  className="
    absolute
    left-3 md:left-4
    top-10 md:top-12
    flex items-center gap-1.5 md:gap-2
    px-2 md:px-3
    py-1 md:py-1.5
    rounded-full
    bg-primary/20 text-primary
    text-[10px] md:text-sm
    hover:bg-primary/30
    transition-colors
  "
>
  <Info size={12} className="w-3 h-3 md:w-3.5 md:h-3.5" />

  {/* Hide text on very small screens */}
  <span className="font-medium hidden sm:inline text-[9px] md:text-sm">
    PAIR INFO
  </span>
</button>


      {/* Time Display */}
      <div className="absolute left-10 md:left-4 top-2 md:top-4 flex items-center gap-2 text-success text-xs md:text-sm">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="font-mono text-[#ffffff] text-[10px]">{new Date().toLocaleTimeString()} <span className="text-gray-500">UTC</span></span>
      </div>

      {/* OHLC Display - Bottom Left */}
      {showCrosshair && hoveredCandle && (
        <div className="absolute left-14 md:left-16 bottom-2 md:bottom-4 bg-[#1a1f2e]/95 border border-[#2a3040] rounded-lg p-2 z-20">
          <div className="flex flex-col gap-1 text-[10px] md:text-xs font-mono">
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Open:</span>
              <span className="text-white">{hoveredCandle.open.toFixed(5)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Close:</span>
              <span className="text-white">{hoveredCandle.close.toFixed(5)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">High:</span>
              <span className="text-success">{hoveredCandle.high.toFixed(5)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Low:</span>
              <span className="text-destructive">{hoveredCandle.low.toFixed(5)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Active Trade Lines on Chart */}
      {trades.filter(t => t.status === 'pending').map((trade) => {
        const chartData = chartType === 'heiken' ? calculateHeikenAshi(data) : data;
        if (chartData.length === 0) return null;
        const prices = chartData.flatMap(d => [d.high, d.low]);
        const minPrice = Math.min(...prices) - 0.0002;
        const maxPrice = Math.max(...prices) + 0.0002;
        const priceRange = maxPrice - minPrice;
        const chartHeight = dimensions.height - padding.top - padding.bottom;
        const tradeY = padding.top + chartHeight - ((trade.entryPrice - minPrice) / priceRange) * chartHeight;
        
        if (tradeY < padding.top || tradeY > dimensions.height - padding.bottom) return null;
        
        return (
          <div
            key={trade.id}
            className="absolute left-0 right-0 pointer-events-auto"
            style={{ top: tradeY }}
            onMouseEnter={() => setHoveredTradeId(trade.id)}
            onMouseLeave={() => setHoveredTradeId(null)}
          >
            {/* Trade line */}
            <div 
              className={`absolute left-[60px] right-[80px] h-[2px] ${trade.direction === 'up' ? 'bg-success' : 'bg-destructive'}`}
              style={{ boxShadow: '0 0 4px rgba(0,0,0,0.5)' }}
            />
            
            {/* Trade info box */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded ${trade.direction === 'up' ? 'bg-success' : 'bg-destructive'} text-white text-xs shadow-lg`}
            >
              <span className="font-mono">{trade.amount} ₹</span>
              {hoveredTradeId === trade.id && (
                <button 
                  onClick={() => onSellTrade?.(trade.id)}
                  className="px-2 py-0.5 bg-black/30 rounded text-[10px] hover:bg-black/50 transition-colors"
                >
                  Sell the trade
                </button>
              )}
            </div>
            
            {/* Entry price label */}
            <div 
              className={`absolute right-[10px] -translate-y-1/2 px-2 py-1 rounded text-xs font-mono text-white ${trade.direction === 'up' ? 'bg-success' : 'bg-destructive'}`}
            >
              {trade.entryPrice.toFixed(3)}
            </div>
          </div>
        );
      })}

      {/* Notifications Stack - Bottom Left */}
      <div className="absolute left-2 md:left-4 bottom-2 md:bottom-4 flex flex-col gap-2 z-30 max-w-[120px] md:max-w-xs">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className="bg-[#1a1f2e] border border-[#2a3040] rounded-lg p-2 md:p-3 flex items-center gap-2 md:gap-3 animate-slide-in shadow-xl"
            onMouseEnter={() => setHoveredNotificationId(notification.id)}
            onMouseLeave={() => setHoveredNotificationId(null)}
          >
            {hoveredNotificationId === notification.id ? (
              <button 
                onClick={() => removeNotification(notification.id)}
                className="p-1 bg-destructive rounded hover:bg-destructive/80 transition-colors"
              >
                <X size={12} className="text-white" />
              </button>
            ) : (
              <Bell size={14} className="text-primary shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-gray-400">Price Alert</div>
              <div className="text-xs md:text-sm font-mono text-white truncate">{notification.price.toFixed(5)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Zoom Controls - Bottom Center */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-4 flex items-center gap-2 md:gap-3 bg-[#1a1f2e]/80 rounded-lg px-2 md:px-3 py-1 md:py-1.5">
        <button 
          onClick={() => handleZoom(-10)}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <Minus size={12} className="md:w-[14px] md:h-[14px]" />
        </button>
        <button 
          onClick={() => handleZoom(10)}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <Plus size={12} className="md:w-[14px] md:h-[14px]" />
        </button>
      </div>

      {/* Pair Info Modal */}
      <PairInfoModal
        isOpen={showPairInfo}
        onClose={() => setShowPairInfo(false)}
        pairName={pairName}
        pairFlag={pairFlag}
        percentage={pairPercentage}
        currentPrice={currentPrice}
      />
    </div>
  );
};



export default CandlestickChart;
