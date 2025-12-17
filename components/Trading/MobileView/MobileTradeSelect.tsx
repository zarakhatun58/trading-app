import { ChevronDown, DollarSignIcon, Pin, PoundSterling, X } from 'lucide-react';
import React, { useState } from 'react';
import { CandleData, CurrencyPair } from '../../../types/trading';
import { currencyPairs } from '../../../data/mockData';
import TradePairSelector from '../TradePairSelector';
import PairSelectorTrade from './PairSelectorTrade';

const MobileTradeSelect = () => {
    const [activePairId, setActivePairId] = useState('eur-chf');
    const [showIndicators, setShowIndicators] = useState(false);
    const [showDrawingSidebar, setShowDrawingSidebar] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(false);
    const [showPairSelector, setShowPairSelector] = useState(false);
    const [showTabPairSelector, setShowTabPairSelector] = useState<string | null>(null);
    const [chartType, setChartType] = useState('candles');
    const [timeframe, setTimeframe] = useState('1m');
    const [candleData, setCandleData] = useState<CandleData[]>([]);
    const [balance, setBalance] = useState(10000);
    const [pairs, setPairs] = useState<CurrencyPair[]>(currencyPairs);
    const [selectedPairIds, setSelectedPairIds] = useState<string[]>(['eur-chf']);
    const [pinnedPairIds, setPinnedPairIds] = useState<string[]>([]);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [sidebarCollapsedToIcons, setSidebarCollapsedToIcons] = useState(false);
    const [sentimentBuy, setSentimentBuy] = useState(77);
    const [tradeZone, setTradeZone] = useState<'up' | 'down' | null>(null);
    const activePair = pairs.find(p => p.id === activePairId) || pairs[0];
    const selectedPairs = pairs.filter(p => selectedPairIds.includes(p.id));

    const handleSelectPair = (pairId: string) => {
        if (selectedPairIds.includes(pairId)) {
            if (selectedPairIds.length > 1) {
                setSelectedPairIds(prev => prev.filter(id => id !== pairId));
                if (activePairId === pairId) {
                    setActivePairId(selectedPairIds.find(id => id !== pairId) || selectedPairIds[0]);
                }
            }
        } else {
            setSelectedPairIds(prev => [...prev, pairId]);
            setActivePairId(pairId);
        }
        setShowPairSelector(false);
        setShowTabPairSelector(null);
    };

    const removePairFromTabs = (pairId: string) => {
        if (selectedPairIds.length > 1) {
            setSelectedPairIds(prev => prev.filter(id => id !== pairId));
            setPinnedPairIds(prev => prev.filter(id => id !== pairId));
            if (activePairId === pairId) {
                setActivePairId(selectedPairIds.find(id => id !== pairId) || selectedPairIds[0]);
            }
        }
    };

    const togglePinPair = (pairId: string) => {
        setPinnedPairIds(prev =>
            prev.includes(pairId)
                ? prev.filter(id => id !== pairId)
                : [...prev, pairId]
        );
    };
    return (
        <div>
            <div className="md:hidden
    fixed
    bottom-[170px]
    left-0
    w-auto
    z-40
    flex items-center
    bg-[#101729]
    overflow-x-auto
    gap-1
    px-1
    pb-1">
                {selectedPairs.map((pair) => {
                    const isActive = pair.id === activePairId;
                    const isPinned = pinnedPairIds.includes(pair.id);
                    const priceChange = pair.currentPrice - pair.previousPrice;

                    return (
                        <div
                            key={pair.id}
                            className={`shrink-0 flex items-center
          rounded cursor-pointer transition-all
          gap-1 px-1.5 py-2
          sm:gap-2 sm:px-2 sm:py-1 mb-1
w-auto
          ${isActive
                                    ? 'bg-[#1a1f2e] border border-none'
                                    : 'bg-[#1a1f2e]/50 border border-[#2a3040] hover:bg-[#1a1f2e]'
                                }
        `}
                        >
                            {/* Close button */}
                            {selectedPairIds.length > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removePairFromTabs(pair.id);
                                    }}
                                    className="absolute -top-1 -right-1
              rounded-full bg-black text-white z-10
              flex items-center justify-center
              w-3 h-3
              sm:w-4 sm:h-4"
                                >
                                    <X size={8} className='w-2 h-2 sm:w-2.5 sm:h-2.5' />
                                </button>
                            )}

                            <button
                                onClick={() => setActivePairId(pair.id)}
                                className="flex flex-row items-center gap-2 sm:gap-2"
                            >
                                <span className='pb-2 flex flex-row'><PoundSterling size={10} className="text-green-500 font-bold rounded-full bg-[#ffffff] p-1 sm:p-2" /> <DollarSignIcon size={9} className="text-green-500 rounded-full bg-[#ffffff]  p-1 sm:p-2 -ml-1" /></span>
                                {/* <span className="text-base">{pair.flag}</span> */}
                                <div className='flex flex-row justify-between w-'>
                                    <div className="text-[9px] sm:text-[11px] font-bold text-white whitespace-nowrap">{pair.name}</div>
                                    <div className={`text-[10px] pl-2 font-bold ${priceChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                                        {pair.performance}%
                                    </div>
                                </div>
                            </button>

                            {/* Dropdown arrow for pair selector */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTabPairSelector(showTabPairSelector === pair.id ? null : pair.id);
                                }}
                                className="p-0.5 hover:bg-[#3a4050] rounded transition-colors"
                            >
                                <ChevronDown size={12} className="text-gray-400" />
                            </button>

                            {/* Pin button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePinPair(pair.id);
                                }}
                                className={`p-0.5 rounded transition-all duration-300 ${isPinned ? "text-primary" : "text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                <Pin
                                    size={12}
                                    className={`
      transition-all duration-300 
      ${isPinned ? "rotate-0" : "rotate-45"}
      ${isPinned ? "fill-primary" : ""}
    `}
                                />
                            </button>
                            {/* MOBILE FULL SCREEN PAIR SELECTOR */}
                            {showTabPairSelector && (
                                <div className="md:hidden fixed inset-0 z-[100]">
                                    {/* backdrop */}
                                    <div
                                        className="absolute inset-0 bg-black/60"
                                        onClick={() => setShowTabPairSelector(null)}
                                    />

                                    {/* full screen panel (bottom space reserved) */}
                                    <div
                                        className="
        fixed top-0 left-0 right-0
        bottom-[230px]
        bg-[#0f1114]
        border-t border-[#2a3040]
        flex flex-col
      "
                                    >
                                        {/* header */}
                                        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a3040]">
                                            <h2 className="text-sm font-semibold text-white">
                                                Select trade pair
                                            </h2>

                                            <button
                                                onClick={() => setShowTabPairSelector(null)}
                                                className="p-1 rounded hover:bg-[#2a3040]"
                                            >
                                                <X size={18} className="text-gray-400" />
                                            </button>
                                        </div>

                                        {/* content */}
                                        <div className="flex-1 overflow-y-auto">
                                            <PairSelectorTrade
                                                isOpen={true}
                                                onClose={() => setShowTabPairSelector(null)}
                                                pairs={pairs}
                                                selectedPairs={selectedPairIds}
                                                onSelectPair={handleSelectPair}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileTradeSelect;