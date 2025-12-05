"use client";
import { X, Star, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { CurrencyPair } from '../../types/trading';

interface TradePairSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  pairs: CurrencyPair[];
  selectedPairs: string[];
  onSelectPair: (pairId: string) => void;
}

type Category = 'CURRENCIES' | 'CRYPTO' | 'COMMODITIES' | 'STOCKS';

 const TradePairSelector = ({ 
  isOpen, 
  onClose, 
  pairs, 
  selectedPairs,
  onSelectPair 
}: TradePairSelectorProps) => {
  const [category, setCategory] = useState<Category>('CURRENCIES');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  if (!isOpen) return null;

  const categories: Category[] = ['CURRENCIES', 'CRYPTO', 'COMMODITIES', 'STOCKS'];

  const filteredPairs = pairs.filter(pair => 
    pair.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (pairId: string) => {
    setFavorites(prev => 
      prev.includes(pairId) 
        ? prev.filter(id => id !== pairId)
        : [...prev, pairId]
    );
  };

  return (
    <div className="bg-[#2b3040] border border-border rounded-lg w-[600px] shadow-2xl max-h-[500px] overflow-hidden">
   
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Select trade pair</h2>
        <button
          onClick={onClose}
          className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex border-b border-border">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              category === cat 
                ? 'bg-secondary text-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    
      <div className="p-3 flex items-center gap-3 border-b border-border">
        <button className="flex items-center gap-1 px-2 py-1 rounded bg-secondary text-muted-foreground text-xs">
          <Star size={12} />
          <span>{favorites.length}</span>
        </button>
        
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-2 px-4 py-2 text-xs text-muted-foreground border-b border-border">
        <div className="w-6"></div>
        <div>Name</div>
        <div className="text-right">24h changing</div>
        <div className="text-right">Profit 1+ min ▼</div>
        <div className="text-right">5+ min</div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {filteredPairs.map((pair) => {
          const change = ((pair.currentPrice - pair.previousPrice) / pair.previousPrice * 100);
          const isSelected = selectedPairs.includes(pair.id);
          const isFavorite = favorites.includes(pair.id);

          return (
            <button
              key={pair.id}
              onClick={() => onSelectPair(pair.id)}
              className={`w-full grid grid-cols-[auto,1fr,auto,auto,auto] gap-2 px-4 py-3 text-sm hover:bg-secondary/50 transition-colors items-center ${
                isSelected ? 'bg-primary/10' : ''
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(pair.id);
                }}
                className="w-6"
              >
                <Star 
                  size={14} 
                  className={isFavorite ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'} 
                />
              </button>

              <div className="flex items-center gap-2 text-left">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs">
                  {pair.flag || '🌐'}
                </div>
                <span className="text-foreground font-medium">{pair.name}</span>
              </div>

              <div className={`flex items-center gap-1 justify-end ${
                change >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{change >= 0 ? '+' : ''}{change.toFixed(2)}%</span>
              </div>

              <div className="text-foreground text-right">{pair.performance}%</div>
              <div className="text-foreground text-right">{Math.max(pair.performance - 5, 85)}%</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TradePairSelector;
