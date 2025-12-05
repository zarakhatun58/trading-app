interface SwitchTimeMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentTime: number;
  onSelectTime: (seconds: number) => void;
}

const timeOptions = [
  { label: '01:00', value: 60 },
  { label: '02:00', value: 120 },
  { label: '03:00', value: 180 },
  { label: '04:00', value: 240 },
  { label: '05:00', value: 300 },
  { label: '10:00', value: 600 },
  { label: '15:00', value: 900 },
  { label: '30:00', value: 1800 },
  { label: '45:00', value: 2700 },
  { label: '01:00:00', value: 3600 },
  { label: '02:00:00', value: 7200 },
  { label: '03:00:00', value: 10800 },
  { label: '04:00:00', value: 14400 },
];

 const SwitchTimeMenu = ({ isOpen, onClose, currentTime, onSelectTime }: SwitchTimeMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1f2e] border border-[#2a3040] rounded-lg overflow-hidden z-50 shadow-xl">
      <div className="grid grid-cols-3 gap-1 p-2 max-h-[200px] overflow-y-auto">
        {timeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onSelectTime(option.value);
              onClose();
            }}
            className={`py-2 px-2 rounded text-xs font-medium transition-colors ${
              currentTime === option.value
                ? 'bg-success text-white'
                : 'bg-[#2a3040] text-gray-300 hover:bg-[#3a4050]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};


export default SwitchTimeMenu;