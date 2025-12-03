"use client";

import { Plus, X } from "lucide-react";
import { CurrencyPair } from "../../src/types/trading";
import { cn } from "../../src/libs/utils";

interface CurrencyTabsProps {
  pairs: CurrencyPair[];
  activePair: string;
  onSelectPair: (id: string) => void;
}

const CurrencyTabs=({ pairs, activePair, onSelectPair }: CurrencyTabsProps)=> {
  return (
    <div className="flex items-center gap-2 p-2 overflow-x-auto">
    
      <button
        className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <Plus className="w-5 h-5" />
      </button>

      {pairs.map((pair) => (
        <button
          key={pair.id}
          onClick={() => onSelectPair(pair.id)}
          className={cn(
            "currency-tab flex items-center gap-3 min-w-[140px] relative group px-3 py-2 rounded-lg border",
            activePair === pair.id && "currency-tab-active border-primary bg-primary/10"
          )}
        >
          <span className="text-xl">{pair.flag}</span>

          <div className="text-left">
            <div className="text-sm font-medium">{pair.name}</div>

            <div
              className={cn(
                "text-xs font-mono",
                pair.performance >= 50 ? "text-success" : "text-destructive"
              )}
            >
              {pair.performance}%
            </div>
          </div>

          {activePair === pair.id && (
            <>
              <div
                className={cn(
                  "w-2 h-2 rounded-full ml-auto",
                  pair.performance >= 50 ? "bg-success" : "bg-destructive"
                )}
              />
              <button
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

export default CurrencyTabs;
