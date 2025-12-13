'use client';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '../../libs/utils';

type TimeFilter = 'today' | 'yesterday' | 'week' | 'month';

const pieData = [
  { name: 'BRL/USD', value: 36, color: '#22c55e' },
  { name: 'USD/INR', value: 19, color: '#3b82f6' },
  { name: 'USD/BDT', value: 18, color: '#f97316' },
  { name: 'USD/PKR', value: 14, color: '#ef4444' },
  { name: 'CAD/CHF', value: 13, color: '#eab308' },
];

const lineData = Array.from({ length: 30 }, (_, i) => ({
  date: `${13 + i}. Nov`,
  value: 0,
}));

export function AnalyticsTab() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');

  return (
    <div className="p-6 animate-fade-in">
      {/* User Info Bar */}
      <div className="trading-card flex items-center gap-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div>
            <p className="text-sm text-primary">jkhatun258@gmail.com</p>
            <p className="text-xs text-muted-foreground">ID: 71230591 ✓</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Location</p>
            <p className="font-medium">India</p>
          </div>
          <div>
            <p className="text-muted-foreground">In the account</p>
            <p className="font-medium text-success">$0.00</p>
          </div>
          <div>
            <p className="text-muted-foreground">In the demo</p>
            <p className="font-medium text-warning">$10,000.00</p>
          </div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="flex items-center justify-end gap-2 mb-6">
        {(['today', 'yesterday', 'week', 'month'] as TimeFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={cn(
              "px-3 py-1.5 text-sm rounded transition-colors capitalize",
              timeFilter === filter
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - General Data */}
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="trading-card">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">General data</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center mb-2">
                  <span className="text-lg font-bold">0</span>
                </div>
                <p className="text-xs text-muted-foreground">Trades count</p>
              </div>
              
              <div>
                <p className="text-2xl font-bold">0 $</p>
                <p className="text-xs text-muted-foreground">Trades profit</p>
              </div>
              
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center mb-2">
                  <span className="text-xs font-bold">0%</span>
                </div>
                <p className="text-xs text-muted-foreground">Profitable trades</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xl font-bold">0 $</p>
                <p className="text-xs text-muted-foreground">Average profit</p>
              </div>
              <div>
                <p className="text-xl font-bold">0 $</p>
                <p className="text-xs text-muted-foreground">Net turnover</p>
              </div>
              <div>
                <p className="text-xl font-bold">0 $</p>
                <p className="text-xs text-muted-foreground">Hedged trades</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xl font-bold">0 $</p>
                <p className="text-xs text-muted-foreground">Min trade amount</p>
              </div>
              <div>
                <p className="text-xl font-bold">0 $</p>
                <p className="text-xs text-muted-foreground">Max trade amount</p>
              </div>
              <div>
                <p className="text-xl font-bold">0 $</p>
                <p className="text-xs text-muted-foreground">Max trade profit</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded bg-destructive" />
                <span className="text-xs">78.0</span>
                <div className="w-3 h-3 rounded bg-success" />
                <span className="text-xs">D:16</span>
                <span className="text-xs text-muted-foreground">e1%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden flex">
                <div className="h-full bg-destructive" style={{ width: '50%' }} />
                <div className="h-full bg-success" style={{ width: '30%' }} />
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="trading-card">
            <h3 className="text-sm font-medium text-success mb-4">Top 5 most profitable instruments among traders</h3>
            
            <div className="flex items-center gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                    <span>{item.name.split('/').join('_')}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Charts */}
        <div className="space-y-6">
          {/* Statistics of profitable trades */}
          <div className="trading-card">
            <h3 className="text-sm font-medium mb-4">Statistics of profitable trades</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Percentage of profitable trades */}
          <div className="trading-card">
            <h3 className="text-sm font-medium mb-4">Percentage % of profitable trades</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="trading-card">
              <h3 className="text-sm font-medium mb-4">Statistics Profit & Loss by instruments</h3>
              <div className="py-8 text-center text-muted-foreground">
                No data
              </div>
            </div>
            
            <div className="trading-card border-destructive/30">
              <h3 className="text-sm font-medium text-destructive mb-4">Distribution of trades by instruments, %</h3>
              <div className="py-8 text-center text-muted-foreground">
                No data
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
