import { HelpCircle, User, Shield, CreditCard, Wallet, Trophy } from 'lucide-react';
import { cn } from '../../libs/utils';


interface FAQCategory {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

const categories: FAQCategory[] = [
  { id: 'general', name: 'General', count: 11, icon: <HelpCircle size={24} /> },
  { id: 'account', name: 'Account', count: 4, icon: <User size={24} /> },
  { id: 'verification', name: 'Verification', count: 5, icon: <Shield size={24} /> },
  { id: 'payment', name: 'Payment', count: 4, icon: <CreditCard size={24} /> },
  { id: 'payouts', name: 'Payouts', count: 5, icon: <Wallet size={24} /> },
  { id: 'tournaments', name: 'Tournaments', count: 6, icon: <Trophy size={24} /> },
];

interface FAQCategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FAQCategoryTabs = ({ activeCategory, onCategoryChange }: FAQCategoryTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex flex-col items-center p-3 md:p-4 rounded-lg border transition-all min-w-[80px] md:min-w-[100px]",
            activeCategory === category.id
              ? "bg-card border-primary text-foreground"
              : "bg-card/50 border-border text-muted-foreground hover:bg-card hover:border-muted"
          )}
        >
          <div className={cn(
            "mb-2",
            activeCategory === category.id ? "text-foreground" : "text-muted-foreground"
          )}>
            {category.icon}
          </div>
          <span className="text-xs md:text-sm font-medium">{category.name}</span>
          <span className="text-[10px] text-muted-foreground">{category.count} questions</span>
        </button>
      ))}
    </div>
  );
};

export default FAQCategoryTabs;
