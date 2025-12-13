
'use client';
import { useState } from 'react';
import { Clock, Info } from 'lucide-react';
import { cn } from '../../libs/utils';
import { Button } from '../../components/ReusableUI/button';

type TournamentStatus = 'active' | 'completed';

interface Tournament {
  id: string;
  name: string;
  prizePool: number;
  entryFee: number;
  duration: string;
  status: 'ACTIVE NOW' | 'UNTIL START' | 'FINISHED';
  daysUntilStart?: number;
  image?: string;
}

const activeTournaments: Tournament[] = [
  { id: '1', name: 'Trader of the Year 2025', prizePool: 300000, entryFee: 50, duration: '1 month', status: 'ACTIVE NOW' },
  { id: '2', name: 'Weekend Battle', prizePool: 5000, entryFee: 1, duration: '2 days', status: 'ACTIVE NOW' },
  { id: '3', name: 'Crazy Wednesday', prizePool: 7500, entryFee: 10, duration: '1 day', status: 'UNTIL START', daysUntilStart: 3 },
  { id: '4', name: 'Free Friday', prizePool: 1000, entryFee: 0, duration: '1 day', status: 'UNTIL START', daysUntilStart: 5 },
  { id: '5', name: 'Weekend Battle', prizePool: 5000, entryFee: 1, duration: '2 days', status: 'UNTIL START', daysUntilStart: 6 },
];

const completedTournaments: Tournament[] = [
  { id: '6', name: 'Free Friday', prizePool: 1000, entryFee: 0, duration: '1 day', status: 'FINISHED' },
  { id: '7', name: 'Crazy Wednesday', prizePool: 7500, entryFee: 10, duration: '1 day', status: 'FINISHED' },
  { id: '8', name: 'Weekend Battle', prizePool: 5000, entryFee: 1, duration: '2 days', status: 'FINISHED' },
  { id: '9', name: 'Free Friday', prizePool: 1000, entryFee: 0, duration: '1 day', status: 'FINISHED' },
  { id: '10', name: 'Crazy Wednesday', prizePool: 7500, entryFee: 10, duration: '1 day', status: 'FINISHED' },
  { id: '11', name: 'Weekend Battle', prizePool: 5000, entryFee: 1, duration: '2 days', status: 'FINISHED' },
];

export function TournamentsTab() {
  const [activeSubTab, setActiveSubTab] = useState<TournamentStatus>('active');
  const tournaments = activeSubTab === 'active' ? activeTournaments : completedTournaments;

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Tournaments</h2>
        
        {/* Sub Tabs */}
        <div className="flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveSubTab('active')}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeSubTab === 'active'
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            ACTIVE
            <span className="w-5 h-5 rounded-full bg-success text-success-foreground text-xs flex items-center justify-center">
              5
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('completed')}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors",
              activeSubTab === 'completed'
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            COMPLETED
          </button>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted-foreground">
          {activeSubTab === 'active' ? `Available for participation (${tournaments.length})` : 'Completed tournaments'}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Tournament Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="trading-card overflow-hidden relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-br from-chart-blue/30 to-transparent rounded-full blur-2xl" />
            </div>

            <div className="relative">
              {/* Status Badge */}
              <div className="mb-4">
                {tournament.status === 'ACTIVE NOW' ? (
                  <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded">
                    ACTIVE NOW
                  </span>
                ) : tournament.status === 'UNTIL START' ? (
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded flex items-center gap-1 w-fit">
                    <Clock size={12} />
                    UNTIL START: {tournament.daysUntilStart} DAYS
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded">
                    FINISHED
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">{tournament.name}</h3>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">PRIZE POOL</p>
                  <p className="text-xl font-bold text-success">{tournament.prizePool.toLocaleString()} $</p>
                </div>
              </div>

              {/* Details */}
              <div className="flex items-center gap-6 mb-4 text-sm">
                <div>
                  <span className="font-semibold">{tournament.entryFee} $</span>
                  <span className="text-muted-foreground ml-1">Entry fee</span>
                </div>
                <div>
                  <span className="font-semibold">{tournament.duration}</span>
                  <span className="text-muted-foreground ml-1">Duration</span>
                </div>
              </div>

              {/* Action Button */}
              <Button variant="secondary" className="w-full">
                Details <Info size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
