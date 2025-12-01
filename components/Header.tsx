import Link from 'next/link';
import React, { useState } from 'react';

export default function Header(){
   const [openLang, setOpenLang] = useState(false);
  return (
    <header className="w-full bg-[#0f172a] text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-xl font-bold">
          <i className="fa-solid fa-house pr-4"></i>
         QUOTEX
        </div>
        <nav className="flex gap-8 text-sm">
          <Link href="/demo" className="hover:text-gray-300 font-semibold">Demo Account</Link>
          <Link href="/about" className="hover:text-gray-300 font-semibold">About Us</Link>
          <Link href="/faq" className="hover:text-gray-300 font-semibold">FAQ</Link>
          <Link href="/blog" className="hover:text-gray-300 font-semibold">Blog</Link>
        </nav>
        <div className="flex items-center gap-6 text-sm">

         <button className="px-4 py-2 border rounded font-semibold">Log in</button>
        <button className="px-4 py-2 bg-green-600 rounded font-semibold">Sign up</button>
          <div className="relative">
            <button
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center gap-1 hover:text-gray-300 font-semibold"
            >
              <i className="fa-solid fa-globe"></i>
              EN <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>

            {openLang && (
              <div className="absolute right-0 mt-2 w-28 bg-gray-800 border border-gray-700 rounded shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">EN</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">ES</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">FR</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">DE</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">AR</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">HI</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
