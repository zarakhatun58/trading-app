
"use client";
import { X, Sun, Moon, Sparkles, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('(UTC+00:00)');
  const [theme, setTheme] = useState('full-night');
  const [gridOpacity, setGridOpacity] = useState(8);
  const [autoScrolling, setAutoScrolling] = useState(true);
  const [oneClickTrade, setOneClickTrade] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(true);
  const [shortOrderLabel, setShortOrderLabel] = useState(false);

  if (!isOpen) return null;

  const themes = [
    { id: 'light', label: 'Light Mode', icon: <Sun size={18} className="text-amber-400" /> },
    { id: 'twilight', label: 'Twilight', icon: <Sparkles size={18} className="text-amber-500" /> },
    { id: 'full-night', label: 'Full Night', icon: <Moon size={18} className="text-primary" /> },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-card border-r border-border z-50 flex flex-col">
 
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Settings</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div data-scroll className="flex-1 overflow-y-auto p-4 space-y-6">

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Portuguese">Portuguese</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="(UTC+00:00)">(UTC+00:00)</option>
            <option value="(UTC+05:30)">(UTC+05:30) India</option>
            <option value="(UTC-05:00)">(UTC-05:00) EST</option>
            <option value="(UTC-08:00)">(UTC-08:00) PST</option>
            <option value="(UTC+01:00)">(UTC+01:00) CET</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-xs text-muted-foreground uppercase">Template</label>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                theme === t.id
                  ? 'bg-primary/20 border-primary'
                  : 'bg-secondary border-border hover:bg-secondary/80'
              }`}
            >
              <div className="flex items-center gap-3">
                {t.icon}
                <span className="text-foreground">{t.label}</span>
              </div>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${
                theme === t.id ? 'bg-primary' : 'bg-muted'
              }`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-all ${
                  theme === t.id ? 'right-1' : 'left-1'
                }`} />
              </div>
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <label className="text-xs text-muted-foreground uppercase">Platform</label>
      
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Grid's opacity</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGridOpacity(Math.max(0, gridOpacity - 1))}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 bg-secondary rounded-lg px-4 py-2 text-center text-foreground">
                {gridOpacity}
              </div>
              <button
                onClick={() => setGridOpacity(Math.min(10, gridOpacity + 1))}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          {[
            { id: 'autoScrolling', label: 'Auto-scrolling', desc: 'Automatic graphic scrolling', value: autoScrolling, setter: setAutoScrolling },
            { id: 'oneClickTrade', label: '1-click trade', desc: 'Open trades without confirmation', value: oneClickTrade, setter: setOneClickTrade },
            { id: 'performanceMode', label: 'Performance Mode', desc: 'Use optimized rendering for chart and candles', value: performanceMode, setter: setPerformanceMode },
            { id: 'shortOrderLabel', label: 'Short order label', desc: 'Use short order element mode', value: shortOrderLabel, setter: setShortOrderLabel },
          ].map((option) => (
            <div key={option.id} className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={option.value}
                    onChange={(e) => option.setter(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-secondary accent-primary"
                  />
                  <span className="text-sm text-foreground">{option.label}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 ml-6">{option.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default SettingsPanel;