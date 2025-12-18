'use client';
import { HelpCircle, User, Shield, CreditCard, Wallet, Trophy } from 'lucide-react';
import { cn } from '../../libs/utils';
import MobileCategoryAccordion from './MobileView/MobileCategoryAccordion';


export interface FAQCategory {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

export const categories: FAQCategory[] = [
  { id: 'general', name: 'General', count: 11, icon: <HelpCircle size={30} /> },
  { id: 'account', name: 'Account', count: 4, icon: <User size={30} /> },
  { id: 'verification', name: 'Verification', count: 5, icon: <Shield size={30} /> },
  { id: 'payment', name: 'Payment', count: 4, icon: <CreditCard size={30} /> },
  { id: 'payouts', name: 'Payouts', count: 5, icon: <Wallet size={30} /> },
  { id: 'tournaments', name: 'Tournaments', count: 6, icon: <Trophy size={30} /> },
];

interface FAQCategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FAQCategoryTabs = ({ activeCategory, onCategoryChange }: FAQCategoryTabsProps) => {
  return (
     <>
      {/* ✅ MOBILE ACCORDION */}
      <div className="md:hidden">
        <MobileCategoryAccordion
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* ✅ DESKTOP TABS */}
    <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 pb-4 border-b border-[#2a3040]">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex flex-col items-center p-3 md:p-4 rounded-lg transition-all min-w-[80px] md:min-w-[120px]",
              isActive
                ? "bg-white text-[#353A4D] border border-[rgba(53,58,77,0.1)] shadow-sm"
                : "bg-card/50 text-muted-foreground border border-border hover:bg-card hover:border-muted"
            )}
          >
            <div
              className={cn(
                "mb-2",
                isActive ? "text-[#353A4D]" : "text-muted-foreground"
              )}
            >
              {category.icon}
            </div>

            <span
              className={cn(
                "text-xs md:text-sm font-medium",
                isActive ? "text-[#353A4D]" : ""
              )}
            >
              {category.name}
            </span>

            <span className="text-[10px] text-muted-foreground">
              {category.count} questions
            </span>
          </button>
        );
      })}
    </div>
    </>
  );
};

export default FAQCategoryTabs;
