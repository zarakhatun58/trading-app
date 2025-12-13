"use client";

import { X, ChevronRight } from "lucide-react";
import { useState } from "react";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const indiaFlag = (
  <span className="text-xl">🇮🇳</span>
);

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
      { name: "Ethereum (ETH)", min: 10 }
    ]
  },
  {
    id: "epayments",
    title: "E-Payments",
    methods: 1,
    icons: ["UPI"],
    payments: [{ name: "UPI", min: 10 }]
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    methods: 21,
    icons: ["BTC", "ETH", "LTC"],
    payments: [
      { name: "Bitcoin (BTC)", min: 10 },
      { name: "Ethereum (ETH)", min: 10 },
      { name: "Litecoin (LTC)", min: 10 }
    ]
  }
];

const paymentMethods = [
  { name: "UPI", icon: "UPI", min: 10 },
  { name: "USDT (BEP-20)", icon: "USDT", min: 10 },
  { name: "USDT (TRC-20)", icon: "USDT", min: 10 },
  { name: "USDT (Polygon)", icon: "USDT", min: 10 },
  { name: "USDT (ERC-20)", icon: "USDT", min: 10 },
  { name: "USDC (BEP-20)", icon: "USDC", min: 10 },
  { name: "Binance Pay", icon: "BNB", min: 10 },
  { name: "Ethereum (ETH)", icon: "ETH", min: 10 },
];
const DepositModal=({ isOpen, onClose }: DepositModalProps)=> {
  if (!isOpen) return null;
const [activeCategory, setActiveCategory] = useState("popular");

  if (!isOpen) return null;

  const currentCategory = categories.find((c) => c.id === activeCategory);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="w-full max-w-5xl bg-[#1f2430] rounded-xl shadow-xl overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a3040]">
          <h2 className="text-white text-lg font-semibold">Deposit</h2>

          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-12 h-full">

          {/* LEFT CATEGORIES */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 p-4 space-y-3">

            {categories.map((cat) => {
              const active = activeCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition
                  ${active ? "bg-green-600/25 border-green-500" : "bg-[#161922] border-[#2a3040]"}`}
                >
                  {/* Radio circle */}
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border mr-3 
                      ${active ? "border-green-500 bg-green-500" : "border-gray-400"}`}
                    />
                    <div>
                      <p className={`font-semibold text-sm ${active ? "text-white" : "text-gray-300"}`}>
                        {cat.title}
                      </p>
                      <p className="text-xs text-gray-400">{cat.methods} methods</p>
                    </div>
                  </div>

                  {/* Icons */}
                  <div className="flex gap-1 mt-2">
                    {cat.icons.map((ic) => (
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

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 p-4">

            <div className="flex items-center gap-2 text-white mb-4">
              {indiaFlag}
              <h3 className="text-sm font-semibold">
                {currentCategory?.title} ({currentCategory?.payments.length})
              </h3>
            </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

              {currentCategory?.payments.map((m) => (
                <div
                  key={m.name}
                  className="bg-[#ffffff] border border-[#2a3040] rounded-lg py-3 px-4 flex items-center justify-between hover:bg-[#1c1f28] cursor-pointer transition"
                >
                  <div>
                    <p className="text-gray-400 text-sm">{m.name}</p>
                    <p className="text-xs text-gray-400">Min. ${m.min}.00</p>
                  </div>

                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DepositModal;