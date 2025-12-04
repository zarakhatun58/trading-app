'use client';

import { useState, useEffect, useCallback } from 'react';

import { currencyPairs, generateCandleData } from '../data/mockData';
import { CandleData, CurrencyPair } from '../types/trading';
import { toast } from '../hooks/useToasts';
import dynamic from "next/dynamic";
import SettingsPanel from '../components/Trading/SettingsPanel';
import SocialModal from '../components/Trading/SocialModal';
import TradePairSelector from '../components/Trading/TradePairSelector';
import SentimentIndicator from '../components/Trading/SentimentIndicator';

const ChartToolbar = dynamic(() => import('../components/Trading/ChartToolbar'), { ssr: false });
const CandlestickChart = dynamic(() => import('../components/Trading/CandlestickChart'), { ssr: false });
const TradingPanel = dynamic(() => import('../components/Trading/TradingPanel'), { ssr: false });
const DrawingSidebar = dynamic(() => import('../components/Trading/DrawingSidebar'), { ssr: false });
const IndicatorsPanel = dynamic(() => import('../components/Trading/IndicatorsPanel'), { ssr: false });
const TopBar = dynamic(() => import('../components/Trading/TopBar'), { ssr: false });
const CurrencyTabs = dynamic(() => import('../components/Trading/CurrencyTabs'), { ssr: false });
const TradingSidebar = dynamic(() => import('../components/Trading/TradingSidebar'), { ssr: false });

import { Plus, X } from 'lucide-react';


const TradingPage = () => {
    const [activePairId, setActivePairId] = useState('eur-chf');
  const [showIndicators, setShowIndicators] = useState(false);
  const [showDrawingSidebar, setShowDrawingSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showPairSelector, setShowPairSelector] = useState(false);
  const [chartType, setChartType] = useState('candles');
  const [timeframe, setTimeframe] = useState('1m');
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [balance, setBalance] = useState(0.00);
  const [pairs, setPairs] = useState<CurrencyPair[]>(currencyPairs);
  const [selectedPairIds, setSelectedPairIds] = useState<string[]>(['eur-chf']);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarCollapsedToIcons, setSidebarCollapsedToIcons] = useState(false);
  const [sentimentBuy, setSentimentBuy] = useState(77);

  const activePair = pairs.find(p => p.id === activePairId) || pairs[0];
  const selectedPairs = pairs.filter(p => selectedPairIds.includes(p.id));

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

    toast({
      title: `Trade Opened: ${direction.toUpperCase()}`,
      description: `${activePair.name} - $${amount} for ${time}s`,
    });
  }, [balance, activePair]);

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
    }
  };

  const removePairFromTabs = (pairId: string) => {
    if (selectedPairIds.length > 1) {
      setSelectedPairIds(prev => prev.filter(id => id !== pairId));
      if (activePairId === pairId) {
        setActivePairId(selectedPairIds.find(id => id !== pairId) || selectedPairIds[0]);
      }
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
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

      <SettingsPanel 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      <SocialModal 
        isOpen={showSocialModal} 
        onClose={() => setShowSocialModal(false)} 
      />


      <DrawingSidebar 
        isOpen={showDrawingSidebar} 
        onClose={() => setShowDrawingSidebar(false)} 
      />

      <IndicatorsPanel 
        isOpen={showIndicators} 
        onClose={() => setShowIndicators(false)} 
      />

      <div className="hidden md:flex h-screen">
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

      <div className="flex-1 flex flex-col min-w-0">
       <TopBar balance={balance} isLiveAccount={false} />
        <div className="flex items-center bg-card border-b border-border">
          <div className="flex-1 flex items-center gap-2 px-2 overflow-x-auto">
            {selectedPairs.map((pair) => {
              const isActive = pair.id === activePairId;
              const priceChange = pair.currentPrice - pair.previousPrice;
              
              return (
                <div
                  key={pair.id}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-secondary border border-primary' 
                      : 'bg-secondary/50 border border-border hover:bg-secondary'
                  }`}
                >
                  <button
                    onClick={() => setActivePairId(pair.id)}
                    className="flex items-center gap-2"
                  >
                    <span className="text-lg">{pair.flag}</span>
                    <div>
                      <div className="text-sm font-medium text-foreground">{pair.name}</div>
                      <div className={`text-xs ${priceChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {pair.performance}%
                      </div>
                    </div>
                  </button>
                  
                  {selectedPairIds.length > 1 && (
                    <button
                      onClick={() => removePairFromTabs(pair.id)}
                      className="ml-1 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex relative">
          <CandlestickChart 
            data={candleData}
            currentPrice={activePair.currentPrice}
            chartType={chartType as 'area' | 'candles' | 'bars' | 'heiken'}
          />
          
          <ChartToolbar
            onDrawingClick={() => setShowDrawingSidebar(true)}
            onChartTypeChange={setChartType}
            currentChartType={chartType}
            currentTimeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>
      </div>

      <TradingPanel 
        activePair={activePair}
        onTrade={handleTrade}
        balance={balance}
        isLiveAccount={false}
      />
    </div>
  );
};


export default TradingPage;
