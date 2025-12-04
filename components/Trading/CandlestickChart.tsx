"use client";

import { useEffect, useRef, useState } from "react";
import { CandleData } from "../../types/trading";
import { Info } from "lucide-react";



interface CandlestickChartProps {
  data: CandleData[];
  currentPrice: number;
  chartType: 'area' | 'candles' | 'bars' | 'heiken';
  tradeStartTime?: Date;
  tradeEndTime?: Date;
}

const CandlestickChart = ({ 
  data, 
  currentPrice,
  chartType,
  tradeStartTime,
  tradeEndTime 
}: CandlestickChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    const padding = { top: 40, right: 80, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    
    ctx.fillStyle = 'hsl(222, 47%, 11%)';
    ctx.fillRect(0, 0, width, height);

    
    const chartData = chartType === 'heiken' ? calculateHeikenAshi(data) : data;

    const prices = chartData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices) - 0.0002;
    const maxPrice = Math.max(...prices) + 0.0002;
    const priceRange = maxPrice - minPrice;

    
    const priceToY = (price: number) => {
      return padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
    };

    const indexToX = (index: number) => {
      return padding.left + (index / (chartData.length - 1)) * chartWidth;
    };

    
    ctx.strokeStyle = 'hsl(217, 33%, 20%)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);

    const priceSteps = 5;
    for (let i = 0; i <= priceSteps; i++) {
      const price = minPrice + (priceRange / priceSteps) * i;
      const y = priceToY(price);
      
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      
      ctx.fillStyle = 'hsl(215, 20%, 65%)';
      ctx.font = '11px JetBrains Mono';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(5), width - 10, y + 4);
    }

    ctx.textAlign = 'center';
    const timeStep = Math.ceil(chartData.length / 8);
    for (let i = 0; i < chartData.length; i += timeStep) {
      const x = indexToX(i);
      ctx.fillStyle = 'hsl(215, 20%, 65%)';
      ctx.fillText(chartData[i].time, x, height - 10);
    }

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
    const currentY = priceToY(currentPrice);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'hsl(199, 89%, 48%)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, currentY);
    ctx.lineTo(width - padding.right, currentY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'hsl(199, 89%, 48%)';
    const badgeWidth = 70;
    const badgeHeight = 20;
    ctx.fillRect(width - padding.right, currentY - badgeHeight / 2, badgeWidth, badgeHeight);
    
    ctx.fillStyle = 'hsl(222, 47%, 11%)';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.textAlign = 'left';
    ctx.fillText(currentPrice.toFixed(5), width - padding.right + 5, currentY + 4);

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

  }, [data, dimensions, currentPrice, chartType, tradeStartTime, tradeEndTime]);

  return (
    <div ref={containerRef} className="relative flex-1 h-full min-h-[400px]">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
      />
      <button className="absolute left-4 top-16 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-[12px]hover:bg-primary/30 transition-colors">
        <Info size={14} />
        <span className="text-[10px]">PAIR INFORMATION</span>
      </button>
      <div className="absolute left-20 top-4 flex items-center gap-2 text-success text-sm">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="font-mono">{new Date().toLocaleTimeString()} UTC</span>
      </div>

      <div className="absolute right-20 bottom-4 flex items-center gap-2 bg-secondary/50 rounded px-2 py-1">
        <button className="text-muted-foreground hover:text-foreground transition-colors">−</button>
        <span className="text-xs text-muted-foreground">81%</span>
        <button className="text-muted-foreground hover:text-foreground transition-colors">+</button>
      </div>
    </div>
  );
};


export default CandlestickChart;
