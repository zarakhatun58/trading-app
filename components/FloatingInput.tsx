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
          w-full p-3 bg-[#444b5d] 
          border border-[#ffffff1a] 
          rounded text-sm text-white
          focus:outline-none focus:border-gray-500
        "
            />
        </div>
    );
};

export default FloatingInput;