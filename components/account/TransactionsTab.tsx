'use client';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ReusableUI/button';

interface Transaction {
  id: string;
  date: string;
  status: 'Success' | 'Failed' | 'Pending';
  type: string;
  paymentSystem: string;
  amount: string;
}

const transactions: Transaction[] = [
  {
    id: '105237056',
    date: '12/12/2025, 05:04:57',
    status: 'Failed',
    type: 'Deposit',
    paymentSystem: 'Binance Pay',
    amount: '+$100.00',
  },
];

export function TransactionsTab() {
  return (
    <div className="p-6 animate-fade-in">
      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <Button  size="sm" disabled>
          <ChevronLeft size={16} />
          Prev
        </Button>
        <span className="text-sm text-muted-foreground">1/1</span>
        <Button size="sm" disabled>
          Next
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Table */}
      <div className="trading-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Order</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Date and time</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Transaction type</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Payment system</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="py-3 px-4 text-sm">{tx.id}</td>
                <td className="py-3 px-4 text-sm text-success">{tx.date}</td>
                <td className="py-3 px-4">
                  <span className={`flex items-center gap-1 text-sm ${
                    tx.status === 'Failed' ? 'text-destructive' : 
                    tx.status === 'Success' ? 'text-success' : 'text-warning'
                  }`}>
                    <AlertCircle size={14} />
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{tx.type}</td>
                <td className="py-3 px-4 text-sm">{tx.paymentSystem}</td>
                <td className="py-3 px-4 text-sm text-right text-success">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No transactions to display
          </div>
        )}
      </div>
    </div>
  );
}
