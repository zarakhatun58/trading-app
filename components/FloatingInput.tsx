import React from 'react';

const FloatingInput = ({ label, type = "text" }) => {
    return (
        <div className="relative w-full">
            <label className="absolute -top-3 left-3 px-1 text-[14px] text-gray-500">
                {label}
            </label>
            <input
                type={type}
                className="
          w-full p-3 bg-[#1e293b] 
          border border-gray-700 
          rounded text-sm text-white
          focus:outline-none focus:border-gray-500
        "
            />
        </div>
    );
};

export default FloatingInput;