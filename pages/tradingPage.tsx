'use client';

import { useState, useEffect, useCallback } from 'react';

import { currencyPairs, generateCandleData } from '../data/mockData';
import { CandleData, CurrencyPair, Trade } from '../types/trading';
import { toast } from '../hooks/useToasts';
import dynamic from "next/dynamic";
import SettingsPanel from '../components/Trading/SettingsPanel';
import SocialModal from '../components/Trading/SocialModal';
import TradePairSelector from '../components/Trading/TradePairSelector';
import SentimentIndicator from '../components/Trading/SentimentIndicator';
import { Pin, Plus, X,ChevronDown } from 'lucide-react';

const ChartToolbar = dynamic(() => import('../components/Trading/ChartToolbar'), { ssr: false });
const CandlestickChart = dynamic(() => import('../components/Trading/CandlestickChart'), { ssr: false });
const TradingPanel = dynamic(() => import('../components/Trading/TradingPanel'), { ssr: false });
const DrawingSidebar = dynamic(() => import('../components/Trading/DrawingSidebar'), { ssr: false });
const IndicatorsPanel = dynamic(() => import('../components/Trading/IndicatorsPanel'), { ssr: false });
const TopBar = dynamic(() => import('../components/Trading/TopBar'), { ssr: false });
const CurrencyTabs = dynamic(() => import('../components/Trading/CurrencyTabs'), { ssr: false });
const TradingSidebar = dynamic(() => import('../components/Trading/TradingSidebar'), { ssr: false });




const TradingPage = () => {
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
const [balance, setBalance] = useState(1000000);
  const [pairs, setPairs] = useState<CurrencyPair[]>(currencyPairs);
  const [selectedPairIds, setSelectedPairIds] = useState<string[]>(['eur-chf']);
  const [pinnedPairIds, setPinnedPairIds] = useState<string[]>([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarCollapsedToIcons, setSidebarCollapsedToIcons] = useState(false);
  const [sentimentBuy, setSentimentBuy] = useState(77);
  const [tradeZone, setTradeZone] = useState<'up' | 'down' | null>(null);
  const activePair = pairs.find(p => p.id === activePairId) || pairs[0];
  const selectedPairs = pairs.filter(p => selectedPairIds.includes(p.id));
  const [hideBalance, setHideBalance] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    setCandleData(generateCandleData(30));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandleData(prev => {
        if (prev.length === 0) return prev;

        const lastCandle = prev[prev.length - 1];
        const newClose = lastCandle.close + (Math.random() - 0.5) * 0.0002;
        const newCandle: CandleData = {
          ...lastCandle,
          close: Number(newClose.toFixed(5)),
          high: Math.max(lastCandle.high, newClose),
          low: Math.min(lastCandle.low, newClose),
        };

        return [...prev.slice(0, -1), newCandle];
      });

      setPairs(prev => prev.map(pair => ({
        ...pair,
        previousPrice: pair.currentPrice,
        currentPrice: pair.currentPrice + (Math.random() - 0.5) * 0.0005,
      })));

      setSentimentBuy(prev => {
        const change = Math.random() - 0.5;
        return Math.max(20, Math.min(80, prev + change));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

 const handleTrade = useCallback((direction: 'up' | 'down', amount: number, time: number) => {
    if (balance < amount) {
      toast({
        title: "Insufficient Balance",
        description: "Please deposit funds to continue trading.",
        // variant: "destructive",
      });
      return;
    }
  

   const newTrade: Trade = {
      id: Date.now().toString(),
      pair: activePair.name,
      direction,
      amount,
      entryPrice: activePair.currentPrice,
      payout: amount * 1.88,
      timestamp: new Date(),
      status: 'pending',
    };

    setTrades(prev => [...prev, newTrade]);
    setBalance(prev => prev - amount);

    toast({
      title: `Trade opened with price: ${activePair.currentPrice.toFixed(3)} ${activePair.name}`,
      description: (
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-xs ${direction === 'up' ? 'bg-success text-white' : 'bg-destructive text-white'}`}>
            {direction === 'up' ? '↑' : '↓'}
          </span>
        </div>
      ),
    });
  }, [balance, activePair]);
   const handleSellTrade = useCallback((tradeId: string) => {
    const trade = trades.find(t => t.id === tradeId);
    if (trade) {
      setBalance(prev => prev + trade.amount);
      setTrades(prev => prev.filter(t => t.id !== tradeId));
      toast({
        title: "Trade sold",
        description: `${trade.pair} trade closed`,
      });
    }
  }, [trades]);
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
      <div className="flex h-screen bg-background overflow-hidden">

        {/* LEFT SIDEBAR */}
        <div className="hidden md:block">
          <TradingSidebar
            isExpanded={sidebarExpanded}
            onToggleExpand={() => setSidebarExpanded(!sidebarExpanded)}
            onSettingsClick={() => setShowSettings(true)}
            onSocialClick={() => setShowSocialModal(true)}
            onCollapseToIcons={() => setSidebarCollapsedToIcons(!sidebarCollapsedToIcons)}
            isCollapsedToIcons={sidebarCollapsedToIcons}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* TOPBAR — NOT FULL WIDTH — STARTS AFTER SIDEBAR */}
          <TopBar balance={balance} initialIsLive={false} hideBalance={hideBalance} onToggleHideBalance={() => setHideBalance(!hideBalance)} />

          {/* CONTENT AREA */}
          <div className="flex flex-1 overflow-hidden pl-4">

            {/* SENTIMENT INDICATOR */}
            <div className="hidden md:flex mr-2">
              <SentimentIndicator
                buyPercentage={Math.round(sentimentBuy)}
                onPlusClick={() => setShowPairSelector(!showPairSelector)}
                showPairSelector={showPairSelector}
              >
                <TradePairSelector
                  isOpen={showPairSelector}
                  onClose={() => setShowPairSelector(false)}
                  pairs={pairs}
                  selectedPairs={selectedPairIds}
                  onSelectPair={handleSelectPair}
                />
              </SentimentIndicator>
            </div>

            {/* CHART + TABS */}
            <div className="flex flex-col flex-1 min-w-0">

              {/* CURRENCY TABS */}
              <div className=" flex items-center bg-[#0f1114] border-b border-[#2a3040] px-2 py-1 overflow-x-auto gap-2 min-h-[50px]">
            {selectedPairs.map((pair) => {
              const isActive = pair.id === activePairId;
              const isPinned = pinnedPairIds.includes(pair.id);
              const priceChange = pair.currentPrice - pair.previousPrice;
              
              return (
                <div
                  key={pair.id}
                  className={`absolute flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-all shrink-0 ${
                    isActive 
                      ? 'bg-[#1a1f2e] border border-primary' 
                      : 'bg-[#1a1f2e]/50 border border-[#2a3040] hover:bg-[#1a1f2e]'
                  }`}
                >
                  {/* Close button */}
                  {selectedPairIds.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePairFromTabs(pair.id);
                      }}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black flex items-center justify-center text-white hover:bg-destructive transition-colors z-10"
                    >
                      <X size={8} />
                    </button>
                  )}
                  
                  <button
                    onClick={() => setActivePairId(pair.id)}
                    className="flex items-center gap-2"
                  >
                    <span className="text-base">{pair.flag}</span>
                    <div>
                      <div className="text-[11px] font-bold text-white whitespace-nowrap">{pair.name}</div>
                      <div className={`text-[10px] font-bold ${priceChange >= 0 ? 'text-success' : 'text-destructive'}`}>
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
                    className={`p-0.5 rounded transition-colors ${isPinned ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Pin size={12} className={isPinned ? 'fill-primary' : ''} />
                  </button>
                  
                  {/* Pair Selector Dropdown */}
                  {showTabPairSelector === pair.id && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                      <TradePairSelector 
                        isOpen={true}
                        onClose={() => setShowTabPairSelector(null)}
                        pairs={pairs}
                        selectedPairs={selectedPairIds}
                        onSelectPair={handleSelectPair}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

              {/* CHART AREA */}
              <div className="flex-1 relative">
                <CandlestickChart
                  data={candleData}
                  currentPrice={activePair.currentPrice}
                  chartType={chartType as 'area' | 'candles' | 'bars' | 'heiken'}
                  tradeZone={tradeZone}
                  onOpenDrawing={() => setShowDrawingSidebar(true)}
                  onOpenIndicators={() => setShowIndicators(true)}
                  pairName={activePair.name}
                  pairFlag={activePair.flag}
                  pairPercentage={activePair.performance}
              trades={trades}
              onSellTrade={handleSellTrade}
                />
                {/* CHART TOOLBAR */}
                <ChartToolbar
                  onOpenIndicators={() => setShowIndicators(true)}
                  onDrawingClick={() => setShowDrawingSidebar(true)}
                  onChartTypeChange={setChartType}
                  currentChartType={chartType}
                  currentTimeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                />
              </div>

            </div>

            {/* RIGHT TRADING PANEL */}
            <TradingPanel
              activePair={activePair}
              onTrade={handleTrade}
              balance={balance}
              isLiveAccount={false}
              onTradeZone={setTradeZone}
              trades={trades}
              onSellTrade={handleSellTrade}
            />

          </div>
        </div>
      </div>

      {/* MODALS */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <SocialModal isOpen={showSocialModal} onClose={() => setShowSocialModal(false)} />
      <DrawingSidebar isOpen={showDrawingSidebar} onClose={() => setShowDrawingSidebar(false)} />
      <IndicatorsPanel isOpen={showIndicators} onClose={() => setShowIndicators(false)} />
    </div>
  );
};


export default TradingPage;
