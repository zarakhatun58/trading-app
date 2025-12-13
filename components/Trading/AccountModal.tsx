import { Eye, EyeOff, Menu, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import ExchangeModal from './ExchangeModal';
import DailyLimitModal from './DailyLimitModal';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  id?: string | number;
  currency?: string;
  liveBalance?: number;
  balance?: number;
  isLive: boolean;
  onToggleLive: (isLive: boolean) => void;
  hideBalance?: boolean;
  onToggleHideBalance?: () => void;
}

const AccountModal = ({
  isOpen,
  onClose,
  email = 'demo@qxbroker.com',
  id = '71910310',
  currency = 'INR',
  liveBalance = 0,
  balance = 1000000,
  isLive,
  onToggleLive,
  hideBalance = false,
  onToggleHideBalance,
}: AccountModalProps) => {
  if (!isOpen) return null;
const [showLimitModal, setShowLimitModal] = useState(false);
 const [showExchangeModal, setShowExchangeModal] = useState(false)
  const [demoBalance, setDemoBalance] = useState(1000000);
  const fmt = (n?: number) => {
    const num = typeof n === 'number' ? n : 0;
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const maskValue = (value: string) => {
    if (hideBalance) {
      return '* '.repeat(6).trim();
    }
    return value;
  };

const handleRefreshDemo = () => {
  setDemoBalance(1000000); 
};
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full right-0 mt-2 z-50" role="dialog" aria-label="Account menu">
        <div className="flex justify-end pr-6">
          <div className="w-3 h-3 transform rotate-45 bg-[#0f1114] border-t border-l border-gray-700 -mt-1.5"></div>
        </div>

        <div className="bg-[#000000] rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row p-2">
          {/* Left Content */}
          <div className="w-full md:w-[250px] p-3 bg-[#1c1f2d] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 bg-[#282a38] p-2 rounded-sm w-[170px]">
                <div className="w-8 h-8 flex items-center justify-center text-white font-bold">
                  <Menu />
                </div>
                <div className='flex flex-col items-start'>
                  <div className="text-[10px] text-slate-400 ">
                    STANDARD:
                  </div>
                  <span className="font-bold text-white text-[10px]">+0% profit</span>
                </div>
              </div>
              <button className="p-4 rounded-sm hover:bg-slate-900 bg-[#282a38]"
                title={hideBalance ? "Show balance" : "Hide balance"}
                onClick={onToggleHideBalance}
              >

                {hideBalance ? (
                  <EyeOff className="w-4 h-4 text-slate-300" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-300" />
                )}
              </button>
            </div>

            <div className="mb-2">
              <div className="text-sm font-semibold text-white">{maskValue(email)}</div>
              <div className="text-xs text-slate-500">ID: {maskValue(String(id))}</div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs text-slate-400">Currency:</div>
              <div className="text-xs font-semibold bg-slate-700 px-2 py-1 rounded">{currency}</div>
              <button className="text-xs text-sky-400 px-2 py-1 rounded hover:bg-slate-800"
                onClick={() => setShowExchangeModal(true)}>CHANGE</button>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-3 bg-[#0b0d10] p-2 rounded border border-transparent hover:border-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="acct"
                  checked={isLive}
                  onChange={() => onToggleLive(true)}
                  className="mt-1 accent-primary"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Live Account</div>
                  <div className="text-xs text-slate-500">{hideBalance ? '******' : `₹${fmt(liveBalance)}`}</div>
                  <div className="text-xs text-slate-500 mt-1">The daily limit is not set</div>
                  <div className="text-[10px] text-sky-400 mt-1 cursor-pointer hover:underline" onClick={() => setShowLimitModal(true)}>SET LIMIT</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 bg-[#0b0d10] p-2 rounded border-2 ${!isLive ? 'border-indigo-800' : 'border-transparent'} cursor-pointer`}>
                <input
                  type="radio"
                  name="acct"
                  checked={!isLive}
                  onChange={() => onToggleLive(false)}
                  className="mt-1 accent-primary"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Demo Account</div>
                  <div className="text-xs text-white font-bold mt-1">${fmt(balance)}</div>
                  <button  onClick={handleRefreshDemo} className="text-xs text-slate-400 mt-1 flex items-center gap-2 hover:text-white ">
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                </div>
              </label>
            </div>
          </div>

          {/* Right Menu */}
          <div className="w-full md:w-[150px] p-5 bg-[#000000] ">
            <ul className="space-y-1">
              {['Deposit', 'Withdrawal', 'Transactions', 'Trades', 'Account'].map((item) => (
                <li key={item}>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-900 transition-colors text-white text-sm">
                    {item}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-800 space-y-1">
                {isLive ? (
                  /* LIVE ACCOUNT → LOGOUT */
                  <button
                    className="w-full text-left px-3 py-2 rounded 
                 hover:bg-red-900/30 transition-colors 
                 text-red-400 text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  /* DEMO ACCOUNT → SIGN IN / SIGN UP */
                  <>
                    <button
                      className="w-full text-left px-3 py-2 rounded 
                   hover:bg-slate-900 transition-colors 
                   text-white text-sm"
                    >
                      Sign In
                    </button>

                    <button
                      className="w-full text-left px-3 py-2 rounded 
                   hover:bg-indigo-900/30 transition-colors 
                   text-primary text-sm"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </li>

            </ul>
          </div>
        </div>
      </div>
      {/* Exchange Modal */}
      <ExchangeModal
        isOpen={showExchangeModal}
        onClose={() => setShowExchangeModal(false)}
        currentCurrency={currency}
      />
      <DailyLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        balance={liveBalance}
      />

    </>
  );
};


export default AccountModal;