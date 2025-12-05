interface InvestmentMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentInvestment: number;
  onSelectInvestment: (amount: number) => void;
}

const investmentOptions = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000];

 const InvestmentMenu = ({ isOpen, onClose, currentInvestment, onSelectInvestment }: InvestmentMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1f2e] border border-[#2a3040] rounded-lg overflow-hidden z-50 shadow-xl">
      <div className="grid grid-cols-3 gap-1 p-2 max-h-[200px] overflow-y-auto">
        {investmentOptions.map((amount) => (
          <button
            key={amount}
            onClick={() => {
              onSelectInvestment(amount);
              onClose();
            }}
            className={`py-2 px-2 rounded text-xs font-medium transition-colors ${
              currentInvestment === amount
                ? 'bg-primary text-white'
                : 'bg-[#2a3040] text-gray-300 hover:bg-[#3a4050]'
            }`}
          >
            {amount} $
          </button>
        ))}
      </div>
    </div>
  );
};


export default InvestmentMenu;