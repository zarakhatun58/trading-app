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
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  if (!isOpen) return null;

  const categories: Category[] = ['CURRENCIES', 'CRYPTO', 'COMMODITIES', 'STOCKS'];

  // Filter pairs by category and search
  const filteredPairs = pairs.filter(pair => {
    const matchesCategory = pair.category === category || !pair.category && category === 'CURRENCIES';
    const matchesSearch = pair.name.toLowerCase().includes(search.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || favorites.includes(pair.id);
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  const toggleFavorite = (e: React.MouseEvent, pairId: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(pairId) 
        ? prev.filter(id => id !== pairId)
        : [...prev, pairId]
    );
  };

  return (
    <div className="bg-[#0f1114] border border-[#2a3040] rounded-lg w-[500px] shadow-2xl max-h-[600px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 ">
        <h2 className="text-base font-semibold text-white">Select trade pair</h2>
        <button
          onClick={onClose}
          className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#2a3040] transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2.5 text-xs font-medium transition-colors ${
              category === cat 
                ? 'bg-[#2a3040] text-white' 
                : 'text-gray-500 hover:text-white hover:bg-[#1a1f2e]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="p-3 flex items-center gap-3 ">
        <button 
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
            showFavoritesOnly ? 'bg-amber-500/20 text-amber-400' : 'bg-[#2a3040] text-gray-400'
          }`}
        >
          <Star size={12} className={showFavoritesOnly ? 'fill-amber-400' : ''} />
          <span>{favorites.length}</span>
        </button>
        
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#2a3040] border border-[#3a4050] rounded pl-9 pr-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[32px_1fr_100px_80px_80px] gap-2 px-4 py-2 text-xs text-gray-500 border-b border-[#2a3040]">
        <div></div>
        <div className=" pb-1">Name</div>
        <div className="text-center pb-1">24h changing</div>
        <div className="text-center  pb-1">Profit 1+ min ▼</div>
        <div className="text-center">5+ min</div>
      </div>

      {/* Pairs List */}
      <div className="max-h-[380px] overflow-y-auto">
        {filteredPairs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No pairs found matching your criteria
          </div>
        ) : (
          filteredPairs.map((pair) => {
            const change = ((pair.currentPrice - pair.previousPrice) / pair.previousPrice * 100);
            const isSelected = selectedPairs.includes(pair.id);
            const isFavorite = favorites.includes(pair.id);

            return (
              <button
                key={pair.id}
                onClick={() => onSelectPair(pair.id)}
                className={`w-full grid grid-cols-[32px_1fr_100px_80px_80px] gap-2 px-4 py-3 text-sm hover:bg-[#1a1f2e] transition-colors items-center ${
                  isSelected ? 'bg-primary/10' : ''
                }`}
              >
                <button
                  onClick={(e) => toggleFavorite(e, pair.id)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <Star 
                    size={14} 
                    className={isFavorite ? 'fill-amber-400 text-amber-400 border-b border-[#2a3040]' : 'text-gray-600 hover:text-gray-400 border-b border-[#2a3040]'} 
                  />
                </button>

                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-full bg-[#2a3040] flex items-center justify-center text-sm">
                    {pair.flag || '🌐'}
                  </div>
                  <span className="text-white font-medium">{pair.name}</span>
                </div>

                <div className={`flex items-center gap-1 justify-center ${
                  change >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span className="font-mono">{change >= 0 ? '+' : ''}{change.toFixed(2)}%</span>
                </div>

                <div className="text-success text-center font-mono">{pair.performance}%</div>
                <div className="text-white text-center font-mono">{Math.max(pair.performance - 5, 78)}%</div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TradePairSelector;
