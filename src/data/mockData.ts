import { CurrencyPair, CandleData } from '../types/trading';

export const currencyPairs: CurrencyPair[] = [
  { id: 'aud-jpy', name: 'AUD/JPY', symbol: 'AUDJPY', flag: '🇦🇺', performance: 77, currentPrice: 97.234, previousPrice: 97.189 },
  { id: 'gbp-jpy', name: 'GBP/JPY', symbol: 'GBPJPY', flag: '🇬🇧', performance: 55, currentPrice: 188.456, previousPrice: 188.501 },
  { id: 'cad-jpy', name: 'CAD/JPY', symbol: 'CADJPY', flag: '🇨🇦', performance: 75, currentPrice: 109.123, previousPrice: 109.089 },
  { id: 'eur-chf', name: 'EUR/CHF', symbol: 'EURCHF', flag: '🇪🇺', performance: 45, currentPrice: 0.93360, previousPrice: 0.93371 },
  { id: 'aud-cad', name: 'AUD/CAD', symbol: 'AUDCAD', flag: '🇦🇺', performance: 65, currentPrice: 0.89234, previousPrice: 0.89198 },
];

export const generateCandleData = (count: number = 30): CandleData[] => {
  const data: CandleData[] = [];
  let basePrice = 0.9336;
  const now = new Date();
  
  for (let i = count; i > 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const volatility = 0.0003;
    const open = basePrice;
    const change = (Math.random() - 0.5) * volatility * 2;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;
    
    data.push({
      time: timeStr,
      open: Number(open.toFixed(5)),
      high: Number(high.toFixed(5)),
      low: Number(low.toFixed(5)),
      close: Number(close.toFixed(5)),
    });
    
    basePrice = close;
  }
  
  return data;
};

export const indicators = [
  { category: 'TREND INDICATORS', items: ['Alligator', 'Bollinger Bands', 'Envelopes', 'Fractal', 'Ichimoku Cloud', 'Keltner channel', 'Donchian channel', 'Supertrend', 'Moving Average', 'Parabolic SAR', 'Zig Zag'] },
  { category: 'OSCILLATORS', items: ['ADX', 'Aroon', 'Awesome Oscillator', 'Bears power', 'Bulls power', 'CCI', 'MACD', 'RSI', 'Stochastic'] },
];
