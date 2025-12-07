export interface CurrencyPair {
  id: string;
  name: string;
  symbol: string;
  flag: string;
  performance: number;
  currentPrice: number;
  previousPrice: number;
  category?: 'CURRENCIES' | 'CRYPTO' | 'COMMODITIES' | 'STOCKS';
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Trade {
  id: string;
  pair: string;
  direction: 'up' | 'down';
  amount: number;
  entryPrice: number;
  exitPrice?: number;
  payout: number;
  timestamp: Date;
  status: 'pending' | 'won' | 'lost';
}

export interface UserAccount {
  balance: number;
  isLiveAccount: boolean;
}
