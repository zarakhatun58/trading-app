'use client';
import { AlertCircle, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ReusableUI/button';

const faqItems = [
  'How to withdraw money from the account?',
  'How long does it take to withdraw funds?',
  'What is the minimum withdrawal amount?',
  'Is there any fee for depositing or withdrawing funds from the account?',
  'Do I need to provide any documents to make a withdrawal?',
  'What is account verification?',
  'How to understand that I need to go through account verification?',
  'How long does the verification process take?',
  'How do I know that I successfully passed verification?',
];

const recentRequests = [
  { id: '105237056', date: '12.12.2025 05:04:57', status: 'Failed', method: 'Binance Pay', amount: '+100.00 $' },
];

export function WithdrawalTab() {
  return (
    <div className="p-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Account:</h3>
          
          <div className="trading-card space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">In the account:</p>
              <p className="text-xl font-bold">0.00 $</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Available for withdrawal:</p>
              <p className="text-xl font-bold">0.00 $</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Commission:</p>
              <p className="text-xl font-bold">0.00 $</p>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="trading-card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium">Some of your latest requests:</h4>
              <Button size="sm" className="text-primary">
                All financial history <ChevronRight size={16} />
              </Button>
            </div>
            
            {recentRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between py-2 text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{req.id}</span>
                  <span className="text-muted-foreground">{req.date}</span>
                  <span className="flex items-center gap-1 text-destructive">
                    <AlertCircle size={14} />
                    {req.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{req.method}</span>
                  <span className="text-success">{req.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Withdrawal:</h3>
          
          <div className="trading-card">
            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg border border-warning/30">
              <AlertCircle className="text-warning shrink-0 mt-0.5" size={18} />
              <div className="text-sm">
                <p>You can withdraw money from your balance to your bank card or electronic purse you used for depositing. You can request withdrawal any time. Your withdrawal requests are processed in 3 business days.</p>
                <button className="text-primary hover:underline mt-2">Make a deposit</button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">FAQ:</h3>
            <Button  size="sm" className="text-primary">
              Check out full FAQ <ExternalLink size={14} />
            </Button>
          </div>
          
          <div className="trading-card space-y-1">
            {faqItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              >
                <ChevronDown size={14} className="shrink-0" />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
