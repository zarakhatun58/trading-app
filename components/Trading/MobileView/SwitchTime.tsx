import { useState } from "react";

interface SwitchTimeMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentTime: number;
  onSelectTime: (seconds: number) => void;
  isSwitchMode?: boolean;
}

const durationOptions = [
  { label: '00:05', value: 5 },
  { label: '00:10', value: 10 },
  { label: '00:15', value: 15 },
  { label: '00:30', value: 30 },
  { label: '01:00', value: 60 },
  { label: '02:00', value: 120 },
  { label: '05:00', value: 300 },
  { label: '10:00', value: 600 },
  { label: '15:00', value: 900 },
  { label: '30:00', value: 1800 },
  { label: '01:00', value: 3600 },
  { label: '02:00', value: 7200 },
  { label: '04:00', value: 14400 },
];
const generateAbsoluteTimeOptions = () => {
  const now = new Date();
  const options = [];
  
  for (let i = 0; i < 12; i++) {
    const time = new Date(now.getTime() + (i + 1) * 60000 * 5); // Every 5 minutes
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    options.push({
      label: `${hours}:${minutes}`,
      value: (i + 1) * 300 // seconds from now
    });
  }
  
  return options;
};

 const SwitchTime = ({ isOpen, onClose, currentTime, onSelectTime, isSwitchMode = false }: SwitchTimeMenuProps) => {
  const [isAbsoluteMode, setIsAbsoluteMode] = useState(isSwitchMode);
  
  if (!isOpen) return null;

  const options = isAbsoluteMode ? generateAbsoluteTimeOptions() : durationOptions;
  return (
    <>
    
      <div
        className="
          z-50
          bg-[#1a1f2e]
          border border-[#2a3040]
          rounded-lg
          shadow-xl
          w-[220px]
         absolute bottom-10 left-4 right-0 
        "
      >
        <div className="grid grid-cols-3 gap-1 p-2 max-h-[180px] overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelectTime(option.value);
                onClose();
              }}
              className={`py-2 px-2 rounded text-[8px] font-medium transition-colors
                ${
                  currentTime === option.value
                    ? "bg-success text-white"
                    : "bg-[#2a3040] text-gray-300 hover:bg-[#3a4050]"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}



export default SwitchTime;