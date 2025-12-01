import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "login";
  return (
    <header className="w-full bg-[#0f172a] text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* Left Logo */}
        <div className="text-xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-house pr-1"></i>
          QUOTEX
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm">
          <Link href="/demo" className="hover:text-gray-300 font-semibold">Demo Account</Link>
          <Link href="/about" className="hover:text-gray-300 font-semibold">About Us</Link>
          <Link href="/faq" className="hover:text-gray-300 font-semibold">FAQ</Link>
          <Link href="/blog" className="hover:text-gray-300 font-semibold">Blog</Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {/* <button className="px-4 py-2 border rounded font-semibold hover:bg-gray-700">
            Log in
          </button>

          <button className="px-4 py-2 bg-green-600 rounded font-semibold hover:bg-green-700">
            Sign up
          </button> */}
          <Link
            href="/?tab=login"
            className={`px-4 py-2 rounded font-semibold ${currentTab === "login" ? "bg-[#ffffff1a]" : "hover:bg-green-700"
              }`}
          >
            Log in
          </Link>

          <Link
            href="/?tab=register"
            className={`px-4 py-2 rounded font-semibold ${currentTab === "register"
                ? "bg-green-700"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            Sign up
          </Link>


          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center gap-1 hover:text-gray-300 font-semibold"
            >
              <i className="fa-solid fa-globe"></i>
              EN <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>

            {openLang && (
              <div className="absolute right-0 mt-2 w-28 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
                {["EN", "ES", "FR", "DE", "AR", "HI"].map((lang) => (
                  <button
                    key={lang}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden bg-[#0f172a] border-t border-gray-700 px-6 py-4 space-y-4">

          <Link href="/demo" className="block hover:text-gray-300 font-semibold">
            Demo Account
          </Link>
          <Link href="/about" className="block hover:text-gray-300 font-semibold">
            About Us
          </Link>
          <Link href="/faq" className="block hover:text-gray-300 font-semibold">
            FAQ
          </Link>
          <Link href="/blog" className="block hover:text-gray-300 font-semibold">
            Blog
          </Link>

          <div className="flex gap-3 pt-4">
            {/* <button className="px-4 py-2 border rounded font-semibold w-1/2">
              Log in
            </button>
            <button className="px-4 py-2 bg-green-600 rounded font-semibold w-1/2">
              Sign up
            </button> */}
            <Link
              href="/?tab=login"
              className={`px-4 py-2 rounded font-semibold ${currentTab === "login" ? "bg-[#ffffff1a]" : "hover:bg-gray-700"
                }`}
            >
              Log in
            </Link>

            <Link
              href="/?tab=register"
              className={`px-4 py-2 rounded font-semibold ${currentTab === "register"
                ? "bg-green-700"
                : "bg-green-600 hover:bg-green-700"
                }`}
            >
              Sign up
            </Link>

          </div>

          {/* Mobile Language */}
          <div>
            <button
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center gap-2 font-semibold mt-4"
            >
              <i className="fa-solid fa-globe"></i> EN
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>

            {openLang && (
              <div className="mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
                {["EN", "ES", "FR", "DE", "AR", "HI"].map((lang) => (
                  <button
                    key={lang}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
