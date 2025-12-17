interface InvestmentMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentInvestment: number;
  onSelectInvestment: (amount: number) => void;
  isPercentMode?: boolean;
}

const investmentOptions = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000];
const percentOptions = [1, 2, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100];
 const MobileInvest = ({ 
  isOpen, 
  onClose, 
  currentInvestment, 
  onSelectInvestment,
  isPercentMode = false 
}: InvestmentMenuProps) => {
  if (!isOpen) return null;
  const options = isPercentMode ? percentOptions : investmentOptions;
  const suffix = isPercentMode ? '%' : '$';
  return (
    <div className="absolute bottom-10 left-4 right-0 mt-1 bg-[#1a1f2e] border border-[#2a3040] rounded-lg overflow-hidden z-50 shadow-xl">
      <div className="grid grid-cols-3 gap-1 p-2 max-h-[200px] overflow-y-auto">
        {options.map((amount) => (
          <button
            key={amount}
            onClick={() => {
              onSelectInvestment(amount);
              onClose();
            }}
            className={`py-2 px-2 rounded text-[8px] font-medium transition-colors ${
              currentInvestment === amount
                ? 'bg-primary text-white'
                : 'bg-[#2a3040] text-gray-300 hover:bg-[#3a4050]'
            }`}
          >
           {amount} {suffix}
          </button>
        ))}
      </div>
    </div>
  );
};


export default MobileInvest;