import { ChevronDown, CreditCard, HelpCircle, Shield, Trophy, User, Wallet } from "lucide-react";
import { cn } from "../../../libs/utils";
import { useState } from "react";
import { FAQCategory } from "../FAQCategoryTabs";

interface MobileCategoryAccordionProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}
export const categories: FAQCategory[] = [
    { id: 'general', name: 'General', count: 11, icon: <HelpCircle size={30} /> },
    { id: 'account', name: 'Account', count: 4, icon: <User size={30} /> },
    { id: 'verification', name: 'Verification', count: 5, icon: <Shield size={30} /> },
    { id: 'payment', name: 'Payment', count: 4, icon: <CreditCard size={30} /> },
    { id: 'payouts', name: 'Payouts', count: 5, icon: <Wallet size={30} /> },
    { id: 'tournaments', name: 'Tournaments', count: 6, icon: <Trophy size={30} /> },
];
const MobileCategoryAccordion = ({
    activeCategory,
    onCategoryChange,
}: MobileCategoryAccordionProps) => {
    const [open, setOpen] = useState(false);

    const activeItem = categories.find(c => c.id === activeCategory);
    return (
        <div className="relative px-1 pb-4 border-b border-[#2a3040]">

            {/* ACTIVE ROW */}
           <button
  onClick={() => setOpen(v => !v)}
  className="flex items-center w-full bg-[#101729]
  border border-[rgba(53,58,77,0.1)] rounded-lg px-4 py-3"
>
  {/* LEFT SIDE (ICON + TEXT) */}
  <div className="flex items-center gap-3 flex-1">
    {activeItem?.icon}

    <div className="flex flex-col text-left">
      <span className="text-[18px] font-bold text-white leading-tight">
        {activeItem?.name}
      </span>
      <span className="text-[12px] text-muted-foreground">
        {activeItem?.count} questions
      </span>
    </div>
  </div>

  {/* RIGHT ARROW */}
  <ChevronDown
    size={18}
    className={cn(
      "ml-auto transition-transform text-white",
      open && "rotate-180"
    )}
  />
</button>


            {/* DROPDOWN LIST */}
            {open && (
                <div className="absolute left-0 right-0 mt-2 z-50 
        bg-[#353a4d] border border-[#2a3040] rounded-lg overflow-hidden">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => {
                                onCategoryChange(category.id);
                                setOpen(false);
                            }}
                            className={cn(
                                "flex items-center gap-3 w-full px-4 py-3 text-left text-sm",
                                activeCategory === category.id
                                    ? "bg-[#101729] text-[#ffffff]"
                                    : "text-muted-foreground hover:bg-[#1a2035]"
                            )}
                        >
                            {category.icon}
                            <span>{category.name}</span>
                            <span className="text-[10px] text-muted-foreground">
                                {category.count} questions
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


export default MobileCategoryAccordion;