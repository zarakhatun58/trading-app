'use client';

import { useState, useEffect, useCallback } from 'react';

import { currencyPairs, generateCandleData } from '../data/mockData';
import { CandleData, CurrencyPair } from '../types/trading';
import { toast } from '../hooks/useToasts';
import dynamic from "next/dynamic";
import { TradingSidebar } from '../components/Trading/TradingSidebar';

const ChartToolbar = dynamic(() => import('../components/Trading/ChartToolbar'), { ssr: false });
const CandlestickChart = dynamic(() => import('../components/Trading/CandlestickChart'), { ssr: false });
const TradingPanel = dynamic(() => import('../components/Trading/TradingPanel'), { ssr: false });
const DrawingSidebar = dynamic(() => import('../components/Trading/DrawingSidebar'), { ssr: false });
const IndicatorsPanel = dynamic(() => import('../components/Trading/IndicatorsPanel'), { ssr: false });
const TopBar = dynamic(() => import('../components/Trading/TopBar'), { ssr: false });
const CurrencyTabs = dynamic(() => import('../components/Trading/CurrencyTabs'), { ssr: false });


const TradingPage = () => {
    const [activePairId, setActivePairId] = useState('eur-chf');
    const [showIndicators, setShowIndicators] = useState(false);
    const [showDrawingSidebar, setShowDrawingSidebar] = useState(false);
    const [chartType, setChartType] = useState('candles');
    const [timeframe, setTimeframe] = useState('1m');
    const [candleData, setCandleData] = useState<CandleData[]>([]);
    const [balance, setBalance] = useState(0.00);
    const [pairs, setPairs] = useState<CurrencyPair[]>(currencyPairs);

    const activePair = pairs.find(p => p.id === activePairId) || pairs[0];

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

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <div className="hidden md:block">
                <TradingSidebar />
            </div>
            <DrawingSidebar
                isOpen={showDrawingSidebar}
                onClose={() => setShowDrawingSidebar(false)}
            />
            <IndicatorsPanel
                isOpen={showIndicators}
                onClose={() => setShowIndicators(false)}
            />
            <div className="flex-1 flex flex-col min-w-0">
                <TopBar balance={balance} isLiveAccount={false} />

                <CurrencyTabs
                    pairs={pairs}
                    activePair={activePairId}
                    onSelectPair={setActivePairId}
                />

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
