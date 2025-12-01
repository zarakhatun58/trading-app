import React, { useState } from 'react';
import FloatingInput from './FloatingInput';
import { useSearchParams } from "next/navigation";

const AuthBox = () => {
    const searchParams = useSearchParams();
    const defaultTab = (searchParams.get("tab") as "login" | "register") || "login";

    const [tab, setTab] = useState<"login" | "register">(defaultTab);
    return (
        <div className="mt-12 px-4 mx-auto">
            {tab === "login" ? (
                <h3 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold mb-10 text-center">
                    Sign In To Your Account
                </h3>
            ) : (
                <h3 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold mb-10 text-center">
                    Sign Up
                </h3>
            )}

            <div className="flex justify-center mt-2 px-2 sm:px-4 mb-12">
                <div className="bg-[#444b5d] pt-4 pb-8 rounded-lg w-full max-w-md shadow-xl">
                    <div className="flex justify-center mb-6 w-[230px] mx-auto bg-[#ffffff1a] p-2 rounded-[6px]">
                        <button
                            onClick={() => setTab("login")}
                            className={`w-[80px] py-2 rounded-[6px] font-semibold ${tab === "login" ? "bg-[#353a4d]" : "bg-transparent"
                                }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setTab("register")}
                            className={`w-[120px] py-2  rounded-[6px] font-semibold ${tab === "register" ? "bg-[#353a4d]" : "bg-transparent"
                                }`}
                        >
                            Registration
                        </button>
                    </div>
                    <div className="mt-3 mb-10">
                        <div className="w-full h-[1px] bg-[#ffffff1a]"></div>
                    </div>
                    {tab === "login" && (
                        <div className="flex flex-col gap-4 pl-8 pr-8">
                            <div className="relative">
                                <label className="absolute -top-3 left-3 px-1 text-[14px] text-gray-400 ">
                                    Email
                                </label>

                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="
          w-full p-3 bg-[#444b5d] 
          border border-[#ffffff1a] 
          rounded text-sm text-white
          focus:outline-none 
        "
                                />
                            </div>
                            <FloatingInput label="Password" type="password" />
                            <div className="flex items-center justify-between w-full text-sm mt-3">

                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-white">Remember me</span>
                                </label>

                                <a href="#" className="text-blue-600 hover:underline">
                                    Forgot your password?
                                </a>

                            </div>

                            <button className="bg-green-600 py-2 rounded mt-4">Sign in</button>
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-3 text-gray-500 text-sm">Sign in via</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>
                            <button
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                            >
                                <i className="fa-brands fa-google"></i>
                                <span className="text-sm text-white font-semibold">Google</span>
                            </button>
                        </div>
                    )}

                    {tab === "register" && (
                        <div className="flex flex-col gap-4 pl-8 pr-8">
                            <div className="relative">
                                <label className="absolute -top-3 left-3 bg-[#444b5d] px-1 text-[14px] text-gray-400 ">
                                    Country / Region of residence
                                </label>

                                <select className="w-full p-3 bg-[#444b5d] border border-[#ffffff1a] rounded text-gray-300">
                                    <option>
                                        {/* <i className="fa-solid fa-globe"></i>  */}
                                        Search</option>
                                    <option>India</option>
                                    <option>USA</option>
                                    <option>UK</option>
                                </select>
                            </div>

                            <div className="relative">
                                <label className="absolute -top-3 left-3 bg-[#444b5d] px-1 text-[14px] text-gray-400 ">
                                    Currency
                                </label>

                                <select className="w-full p-3 bg-[#444b5d] border border-[#ffffff1a] rounded text-gray-300">
                                    <option>USD</option>
                                    <option>INR</option>
                                    <option>EUR</option>
                                </select>
                            </div>

                            <FloatingInput label="Email" type="email" />
                            <FloatingInput label="Password" type="password" />
                            <label className="flex items-start gap-2 text-sm text-gray-300">
                                <input type="checkbox" className="mt-1" />
                                <div> I confirm that I am 18 years old or older and accept<br />
                                    <a href="#" className="text-blue-300">Service Agreement</a></div>

                            </label>

                            <label className="flex items-start gap-2 text-sm text-gray-300">
                                <input type="checkbox" className="mt-1" />
                                I declare and confirm that I am not a citizen or resident of the US for tax purposes
                            </label>
                            <button className="bg-green-600 py-2 rounded font-semibold mt-2">
                                Registration
                            </button>
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-3 text-gray-500 text-sm">Sign in via</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <button
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                            >
                                <i className="fa-brands fa-google"></i>
                                <span className="text-sm text-white font-semibold">Google</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default AuthBox;