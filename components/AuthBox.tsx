import React, { useState } from 'react';
import FloatingInput from './FloatingInput';

const AuthBox = () => {
    const [tab, setTab] = useState<"login" | "register">("login");

    return (
        <div className="flex justify-center mt-20 px-4 mb-12">
            <div className="bg-[#1e293b] p-8 rounded-lg w-full max-w-md shadow-xl">
                <div className="flex mb-6">
                    <button
                        onClick={() => setTab("login")}
                        className={`w-1/2 py-2 ${tab === "login" ? "bg-gray-700" : "bg-gray-800"
                            }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setTab("register")}
                        className={`w-1/2 py-2 ${tab === "register" ? "bg-gray-700" : "bg-gray-800"
                            }`}
                    >
                        Registration
                    </button>
                </div>
                {/* <div className='border-b border-gray-300 p-4'></div> */}
                {tab === "login" && (
                    <div className="flex flex-col gap-4">
                        <FloatingInput label="Email" type="email" />
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
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-[#1e293b] px-1 text-[14px] text-gray-400 ">
                                Country / Region of residence
                            </label>

                            <select className="w-full p-3 bg-[#1e293b] border border-gray-700 rounded text-gray-300">
                                <option>Select</option>
                                <option>India</option>
                                <option>USA</option>
                                <option>UK</option>
                            </select>
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-[#1e293b] px-1 text-[14px] text-gray-400 ">
                                Currency
                            </label>

                            <select className="w-full p-3 bg-[#1e293b] border border-gray-700 rounded text-gray-300">
                                <option>USD</option>
                                <option>INR</option>
                                <option>EUR</option>
                            </select>
                        </div>

                        <FloatingInput label="Email" type="email" />
                        <FloatingInput label="Password" type="password" />
                        <label className="flex items-start gap-2 text-sm text-gray-300">
                            <input type="checkbox" className="mt-1" />
                           <div> I confirm that I am 18 years old or older and accept<br/>
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
    );
}


export default AuthBox;