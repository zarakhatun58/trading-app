"use client";

import { X, ChevronRight, Trash2 } from "lucide-react";
import { indicators } from "../../src/data/mockData";
import { useState } from "react";
import { cn } from "../../src/libs/utils";

interface IndicatorsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

 const IndicatorsPanel = ({ isOpen, onClose }: IndicatorsPanelProps) => {
  const [activeIndicator, setActiveIndicator] = useState("Envelopes");

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col animate-slide-up">
      
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Indicators</h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-accent transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {indicators.map((category) => (
          <div key={category.category}>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground tracking-wider">
              {category.category}
            </div>

            {category.items.map((item) => (
              <button
                key={item}
                onClick={() => setActiveIndicator(item)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent transition-colors",
                  activeIndicator === item && "bg-primary/20 text-primary"
                )}
              >
                <span>{item}</span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        ))}
      </div>
      <button className="flex items-center justify-center gap-2 p-4 text-destructive hover:bg-destructive/10 transition-colors border-t border-border">
        <Trash2 size={16} />
        <span className="text-sm font-medium">Delete all</span>
      </button>
    </div>
  );
};

export default IndicatorsPanel ;
