import { CurrencyPair, CandleData } from '../types/trading';

export const currencyPairs: CurrencyPair[] = [
  { id: 'aud-jpy', name: 'AUD/JPY', symbol: 'AUDJPY', flag: '🇦🇺', performance: 77, currentPrice: 97.234, previousPrice: 97.189, category: 'CURRENCIES' },
  { id: 'gbp-jpy', name: 'GBP/JPY', symbol: 'GBPJPY', flag: '🇬🇧', performance: 55, currentPrice: 188.456, previousPrice: 188.501, category: 'CURRENCIES' },
  { id: 'cad-jpy', name: 'CAD/JPY', symbol: 'CADJPY', flag: '🇨🇦', performance: 75, currentPrice: 109.123, previousPrice: 109.089, category: 'CURRENCIES' },
  { id: 'eur-chf', name: 'EUR/CHF', symbol: 'EURCHF', flag: '🇪🇺', performance: 45, currentPrice: 0.93360, previousPrice: 0.93371, category: 'CURRENCIES' },
  { id: 'aud-cad', name: 'AUD/CAD', symbol: 'AUDCAD', flag: '🇦🇺', performance: 65, currentPrice: 0.89234, previousPrice: 0.89198, category: 'CURRENCIES' },
  { id: 'usd-bdt', name: 'USD/BDT...', symbol: 'USDBDT', flag: '🇺🇸', performance: 77, currentPrice: 119.85, previousPrice: 119.81, category: 'CURRENCIES' },
  { id: 'nzd-jpy', name: 'NZD/JPY...', symbol: 'NZDJPY', flag: '🇳🇿', performance: 77, currentPrice: 89.234, previousPrice: 89.198, category: 'CURRENCIES' },
  { id: 'aud-usd', name: 'AUD/USD', symbol: 'AUDUSD', flag: '🇦🇺', performance: 83, currentPrice: 0.6789, previousPrice: 0.6781, category: 'CURRENCIES' },
  { id: 'aud-usd-2', name: 'AUD/USD...', symbol: 'AUDUSD2', flag: '🇦🇺', performance: 91, currentPrice: 0.6791, previousPrice: 0.6785, category: 'CURRENCIES' },
  { id: 'gbp-usd', name: 'GBP/USD', symbol: 'GBPUSD', flag: '🇬🇧', performance: 86, currentPrice: 1.2789, previousPrice: 1.2781, category: 'CURRENCIES' },
  // Crypto pairs
  { id: 'btc-usd', name: 'Bitcoin (OTC)', symbol: 'BTCUSD', flag: '₿', performance: 92, currentPrice: 68234.50, previousPrice: 68100.25, category: 'CRYPTO' },
  { id: 'eth-usd', name: 'Ethereum (OTC)', symbol: 'ETHUSD', flag: '⟠', performance: 92, currentPrice: 3456.78, previousPrice: 3412.34, category: 'CRYPTO' },
  { id: 'axie', name: 'Axie Infinity (OTC)', symbol: 'AXSOTC', flag: '🇺🇸', performance: 93, currentPrice: 8.45, previousPrice: 8.01, category: 'CRYPTO' },
  { id: 'avax', name: 'Avalanche (OTC)', symbol: 'AVAXOTC', flag: '🇺🇸', performance: 92, currentPrice: 42.56, previousPrice: 41.92, category: 'CRYPTO' },
  { id: 'beam', name: 'Beam (OTC)', symbol: 'BEAMOTC', flag: '🏴󠁤󠁥󠁢󠁹󠁿', performance: 92, currentPrice: 0.0234, previousPrice: 0.0102, category: 'CRYPTO' },
  { id: 'doge', name: 'Dogecoin (OTC)', symbol: 'DOGEOTC', flag: '🐕', performance: 92, currentPrice: 0.1234, previousPrice: 0.1192, category: 'CRYPTO' },
  { id: 'etc', name: 'Ethereum Classic (OTC)', symbol: 'ETCOTC', flag: '🇺🇸', performance: 92, currentPrice: 28.45, previousPrice: 28.46, category: 'CRYPTO' },
  { id: 'floki', name: 'Floki (OTC)', symbol: 'FLOKIOTC', flag: '🇺🇸', performance: 92, currentPrice: 0.00019, previousPrice: 0.00020, category: 'CRYPTO' },
  { id: 'ada', name: 'Cardano (OTC)', symbol: 'ADAOTC', flag: '🇺🇸', performance: 79, currentPrice: 0.4234, previousPrice: 0.4198, category: 'CRYPTO' },
  // Commodities
  { id: 'gold', name: 'Gold (OTC)', symbol: 'XAUUSD', flag: '🥇', performance: 88, currentPrice: 2034.50, previousPrice: 2028.75, category: 'COMMODITIES' },
  { id: 'silver', name: 'Silver (OTC)', symbol: 'XAGUSD', flag: '🥈', performance: 85, currentPrice: 24.56, previousPrice: 24.32, category: 'COMMODITIES' },
  { id: 'oil', name: 'Crude Oil (OTC)', symbol: 'WTIUSD', flag: '🛢️', performance: 82, currentPrice: 78.45, previousPrice: 77.98, category: 'COMMODITIES' },
  // Stocks
  { id: 'aapl', name: 'Apple Inc', symbol: 'AAPL', flag: '🍎', performance: 90, currentPrice: 189.45, previousPrice: 188.92, category: 'STOCKS' },
  { id: 'tsla', name: 'Tesla Inc', symbol: 'TSLA', flag: '⚡', performance: 87, currentPrice: 234.56, previousPrice: 232.18, category: 'STOCKS' },
  { id: 'googl', name: 'Alphabet Inc', symbol: 'GOOGL', flag: '🔍', performance: 91, currentPrice: 141.23, previousPrice: 140.89, category: 'STOCKS' },
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