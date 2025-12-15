"use client";

import { X, ChevronRight } from "lucide-react";
import { useState } from "react";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const indiaFlag = <span className="text-lg">🇮🇳</span>;

const categories = [
  {
    id: "popular",
    title: "Popular",
    methods: 8,
    icons: ["UPI", "BNB", "USDT"],
    payments: [
      { name: "UPI", min: 10 },
      { name: "USDT (BEP-20)", min: 10 },
      { name: "USDT (TRC-20)", min: 10 },
      { name: "USDT (Polygon)", min: 10 },
      { name: "USDT (ERC-20)", min: 10 },
      { name: "USDC (BEP-20)", min: 10 },
      { name: "Binance Pay", min: 10 },
      { name: "Ethereum (ETH)", min: 10 },
    ],
  },
  {
    id: "epayments",
    title: "E-Payments",
    methods: 1,
    icons: ["UPI"],
    payments: [{ name: "UPI", min: 10 }],
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    methods: 21,
    icons: ["BTC", "ETH", "LTC"],
    payments: [
      { name: "Bitcoin (BTC)", min: 10 },
      { name: "Ethereum (ETH)", min: 10 },
      { name: "Litecoin (LTC)", min: 10 },
    ],
  },
];

const DepositModal = ({ isOpen, onClose }: DepositModalProps) => {
  const [activeCategory, setActiveCategory] = useState("popular");

  if (!isOpen) return null;

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-6">
      <div className="
        bg-[#1f2430] w-full h-full md:h-auto
        md:max-w-5xl rounded-none md:rounded-xl
        flex flex-col overflow-hidden
      ">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-[#2a3040]">
          <h2 className="text-white text-base md:text-lg font-semibold">
            Deposit
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col md:grid md:grid-cols-12 flex-1 overflow-hidden">

          {/* MOBILE CATEGORY TABS */}
          <div className="md:hidden flex gap-2 px-4 py-3 overflow-x-auto border-b border-[#2a3040]">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap
                  ${activeCategory === cat.id
                    ? "bg-green-600 text-white"
                    : "bg-[#161922] text-gray-400"}
                `}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* DESKTOP LEFT SIDEBAR */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 p-4 space-y-3 overflow-y-auto">
            {categories.map(cat => {
              const active = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    border rounded-lg p-4 cursor-pointer transition
                    ${active
                      ? "bg-green-600/25 border-green-500"
                      : "bg-[#161922] border-[#2a3040]"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border ${active ? "bg-green-500 border-green-500" : "border-gray-400"}`} />
                    <div>
                      <p className={`text-sm font-semibold ${active ? "text-white" : "text-gray-300"}`}>
                        {cat.title}
                      </p>
                      <p className="text-xs text-gray-400">{cat.methods} methods</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-2">
                    {cat.icons.map(ic => (
                      <div
                        key={ic}
                        className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-[10px] text-white"
                      >
                        {ic}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT PAYMENTS */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 p-4 overflow-y-auto">

            <div className="flex items-center gap-2 mb-4 text-white">
              {indiaFlag}
              <h3 className="text-sm font-semibold">
                {currentCategory?.title} ({currentCategory?.payments.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCategory?.payments.map(m => (
                <button
                  key={m.name}
                  className="
                    bg-[#161922] border border-[#2a3040]
                    rounded-lg px-4 py-3
                    flex items-center justify-between
                    hover:bg-[#1c1f28] transition
                  "
                >
                  <div className="text-left">
                    <p className="text-sm text-white">{m.name}</p>
                    <p className="text-xs text-gray-400">Min. ${m.min}.00</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
