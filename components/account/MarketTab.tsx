'use client';

import { Shield, Gift, Percent, Package, Clock, HelpCircle } from 'lucide-react';

const promoCards = [
  { icon: Shield, title: 'Risk Free', color: 'bg-emerald-500' },
  { icon: Gift, title: 'Cashback', color: 'bg-teal-500' },
  { icon: Package, title: 'Deposit Bonus', color: 'bg-orange-500' },
  { icon: Percent, title: 'Percentage of turnover', color: 'bg-amber-500' },
  { icon: Gift, title: 'Balance Bonus', color: 'bg-blue-500' },
  { icon: Package, title: 'Cancel X points', color: 'bg-purple-500' },
];

export default function MarketTab() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promoCards.map((card, i) => (
        <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between mb-4">
            <div className="flex gap-3">
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-xs text-slate-400">0 PROMO CODES AVAILABLE</p>
              </div>
            </div>
            <HelpCircle size={18} className="text-slate-400" />
          </div>

          <div className="text-center py-8 text-slate-400">
            <Package className="mx-auto mb-2" size={32} />
            No promo code history yet
          </div>

          <div className="flex justify-between border-t border-slate-800 pt-4">
            <button className="text-sm flex gap-2 text-slate-400">
              <Clock size={14} /> Show history
            </button>
            <button className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded text-sm">
              Enter promo code
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
